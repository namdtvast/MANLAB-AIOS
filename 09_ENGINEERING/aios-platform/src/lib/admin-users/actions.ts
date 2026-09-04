"use server";

// Phân quyền người dùng — Server Actions. Quyết định "được phép hay không" nằm hoàn toàn ở
// "@/lib/admin-users/rules"; file này chỉ đọc dữ liệu cần cho rule, gọi rule, rồi ghi.
// Đặc tả: _meta/specs/20260904-admin-users-phan-quyen/spec.md
//
// Không có action nào SỬA hay XÓA PlatformAccessAudit — đó là thứ kỳ rà soát quyền của
// ETV.P28 §6.7.1 đọc, và một lịch sử sửa được thì không còn là bằng chứng.
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { PlatformRole } from "@/generated/prisma/enums";
import {
  capVaiTroModule,
  doiVaiTroNenTang as ruleDoiVaiTroNenTang,
  thuHoiVaiTroModule,
  type Actor,
  type PhieuQuyen,
} from "./rules";

const fail = (code: string, message: string) => ({ ok: false as const, code, message });

async function getActor(): Promise<Actor | null> {
  const session = await auth();
  if (!session?.user?.id || !session.user.role) return null;
  return { id: session.user.id, role: session.user.role };
}

function revalidate(userId: string) {
  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
}

async function docPhieu(accessRequestId: string | null): Promise<PhieuQuyen | null> {
  if (!accessRequestId) return null;
  return prisma.m28AccessRequest.findUnique({
    where: { id: accessRequestId },
    select: { id: true, subjectId: true, status: true },
  });
}

export async function capVaiTro(input: {
  subjectId: string;
  moduleCode: string;
  role: string;
  accessRequestId: string;
}) {
  const actor = await getActor();
  if (!actor) return fail("FORBIDDEN", "Chưa đăng nhập.");

  const [phieu, daCo] = await Promise.all([
    docPhieu(input.accessRequestId || null),
    prisma.moduleRoleAssignment.count({
      where: { userId: input.subjectId, moduleCode: input.moduleCode, role: input.role },
    }),
  ]);

  const r = capVaiTroModule({
    actor,
    subjectId: input.subjectId,
    moduleCode: input.moduleCode,
    role: input.role,
    phieu,
    daCo: daCo > 0,
  });
  if (!r.ok) return r;

  // Quyền và vết ghi cùng transaction: một quyền được cấp mà không có dòng lịch sử tương ứng
  // là đúng thứ kỳ rà soát không phát hiện ra được.
  await prisma.$transaction(async (tx) => {
    await tx.moduleRoleAssignment.create({
      data: {
        userId: input.subjectId,
        moduleCode: input.moduleCode,
        role: input.role,
        accessRequestId: phieu!.id,
        grantedById: actor.id,
      },
    });
    await tx.platformAccessAudit.create({
      data: {
        actorId: actor.id,
        subjectId: input.subjectId,
        action: "CAP_VAI_TRO_MODULE",
        moduleCode: input.moduleCode,
        role: input.role,
        accessRequestId: phieu!.id,
      },
    });
  });

  revalidate(input.subjectId);
  return { ok: true as const };
}

export async function thuHoiVaiTro(assignmentId: string, note: string) {
  const actor = await getActor();
  if (!actor) return fail("FORBIDDEN", "Chưa đăng nhập.");

  const gan = await prisma.moduleRoleAssignment.findUnique({
    where: { id: assignmentId },
    select: { userId: true, moduleCode: true, role: true, accessRequestId: true },
  });
  if (!gan) return fail("NOT_FOUND", "Không tìm thấy vai trò cần thu hồi.");

  const r = thuHoiVaiTroModule({ actor, subjectId: gan.userId, note });
  if (!r.ok) return r;

  await prisma.$transaction(async (tx) => {
    // Xóa dòng quyền, giữ lịch sử ở bảng riêng — lý do chọn cách này thay vì cột trạng thái:
    // spec §2.3 (hơn 20 file actor.ts đọc bảng quyền không kèm điều kiện lọc).
    await tx.moduleRoleAssignment.delete({ where: { id: assignmentId } });
    await tx.platformAccessAudit.create({
      data: {
        actorId: actor.id,
        subjectId: gan.userId,
        action: "THU_HOI_VAI_TRO_MODULE",
        moduleCode: gan.moduleCode,
        role: gan.role,
        accessRequestId: gan.accessRequestId,
        note: note.trim(),
      },
    });
  });

  revalidate(gan.userId);
  return { ok: true as const };
}

export async function doiVaiTroNenTang(input: {
  subjectId: string;
  roleMoi: PlatformRole;
  accessRequestId: string;
}) {
  const actor = await getActor();
  if (!actor) return fail("FORBIDDEN", "Chưa đăng nhập.");

  const subject = await prisma.user.findUnique({
    where: { id: input.subjectId },
    select: { role: true },
  });
  if (!subject) return fail("NOT_FOUND", "Không tìm thấy người dùng.");

  const [phieu, soAdminConHieuLuc] = await Promise.all([
    docPhieu(input.accessRequestId || null),
    // Đếm ADMIN CÒN HIỆU LỰC ĐĂNG NHẬP, không phải mọi ADMIN: một quản trị viên đã bị thu hồi
    // tài khoản (accountStatus ≠ DANG_HOAT_DONG) thì không đăng nhập được, đếm vào đây sẽ cho
    // phép hạ nốt người cuối cùng thật sự dùng được.
    prisma.user.count({ where: { role: "ADMIN", accountStatus: "DANG_HOAT_DONG" } }),
  ]);

  const r = ruleDoiVaiTroNenTang({
    actor,
    subjectId: input.subjectId,
    subjectRole: subject.role,
    roleMoi: input.roleMoi,
    phieu,
    soAdminConHieuLuc,
  });
  if (!r.ok) return r;

  await prisma.$transaction(async (tx) => {
    await tx.user.update({ where: { id: input.subjectId }, data: { role: input.roleMoi } });
    await tx.platformAccessAudit.create({
      data: {
        actorId: actor.id,
        subjectId: input.subjectId,
        action: "DOI_VAI_TRO_NEN_TANG",
        role: input.roleMoi,
        previousRole: subject.role,
        accessRequestId: phieu!.id,
      },
    });
  });

  revalidate(input.subjectId);
  return { ok: true as const };
}
