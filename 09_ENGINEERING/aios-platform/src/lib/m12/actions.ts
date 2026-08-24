"use server";

// M12 — Server Actions. Logic quyết định nằm hoàn toàn ở "@/lib/m12/rules" — action này chỉ gọi
// rule rồi ghi DB, không tự quyết định gì thêm (mirror src/lib/m01/actions.ts).
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { M12Channel, M12FeedbackCategory, M12FeedbackOrigin } from "@/generated/prisma/enums";
import { ensureLessonFromSource } from "@/lib/m26/hooks";
import { getActor } from "./actor";
import { canEscalate, txAssignComplaint, txCloseComplaint, txRespondComplaint, type M12ActorUser, type TxResult } from "./rules";

async function logAudit(itemType: "COMPLAINT" | "FEEDBACK", itemId: string, actor: M12ActorUser, action: string, reason: string | null) {
  await prisma.m12AuditEntry.create({
    data: { itemType, itemId, actorId: actor.id, role: actor.m12Role ?? "—", action, reason },
  });
}

function revalidateM12(paths: string[] = []) {
  revalidatePath("/modules/M12");
  for (const p of paths) revalidatePath(p);
}

// ---------- Complaint ----------

export async function createComplaint(input: {
  channel: M12Channel;
  content: string;
  relatedCertificateRef?: string;
  resolvedOnSpot: boolean;
  customerSatisfiedOnSpot?: boolean;
  isComplex: boolean;
}) {
  const actor = await getActor();
  const year = new Date().getFullYear();
  const closedOnSpot = input.resolvedOnSpot && input.customerSatisfiedOnSpot === true;

  const created = await prisma.$transaction(async (tx) => {
    const c = await tx.m12Complaint.create({
      data: {
        code: "PENDING",
        channel: input.channel,
        content: input.content,
        relatedCertificateRef: input.relatedCertificateRef,
        resolvedOnSpot: input.resolvedOnSpot,
        customerSatisfiedOnSpot: input.customerSatisfiedOnSpot ?? null,
        isComplex: input.isComplex,
        createdById: actor.id,
        ...(closedOnSpot
          ? { status: "DONG_HO_SO", resolution: "Giải thích trực tiếp ngay khi tiếp nhận — khách hàng đồng ý.", customerSatisfied: true }
          : {}),
      },
    });
    const code = `KN-${year}-${String(c.seq).padStart(4, "0")}`;
    return tx.m12Complaint.update({ where: { id: c.id }, data: { code } });
  });

  await logAudit(
    "COMPLAINT",
    created.id,
    actor,
    closedOnSpot ? "Tiếp nhận khiếu nại — giải thích ngay, khách hài lòng → đóng hồ sơ" : "Tiếp nhận khiếu nại",
    null
  );
  revalidateM12();
  return created;
}

async function applyComplaintTransition(id: string, result: TxResult, actor: M12ActorUser) {
  if (!result.ok) return result;
  const before = await prisma.m12Complaint.findUniqueOrThrow({ where: { id } });
  await prisma.m12Complaint.update({ where: { id }, data: { status: result.status as never, ...result.patch } });
  await logAudit("COMPLAINT", id, actor, `${result.action} (${before.status} → ${result.status})`, result.reason);
  revalidateM12([`/modules/M12/complaint/${id}`]);
  return result;
}

export async function setExternalDocRef(id: string, externalDocRef: string): Promise<TxResult> {
  const actor = await getActor();
  if (!externalDocRef) return { ok: false, code: "EXTERNAL_DOC_REF_REQUIRED", message: "Bắt buộc nhập số hiệu văn bản khiếu nại F14.03." };
  await prisma.m12Complaint.update({ where: { id }, data: { externalDocRef } });
  await logAudit("COMPLAINT", id, actor, `Khởi tạo văn bản khiếu nại chính thức F14.03 (${externalDocRef})`, null);
  revalidateM12([`/modules/M12/complaint/${id}`]);
  return { ok: true, status: "NHAP", action: "Khởi tạo F14.03", reason: null, patch: {} };
}

export async function assignComplaint(id: string, assignedToId: string): Promise<TxResult> {
  const actor = await getActor();
  const c = await prisma.m12Complaint.findUniqueOrThrow({ where: { id } });
  return applyComplaintTransition(id, txAssignComplaint(c, actor, assignedToId), actor);
}

export async function respondComplaint(id: string, resolution: string): Promise<TxResult> {
  const actor = await getActor();
  const c = await prisma.m12Complaint.findUniqueOrThrow({ where: { id } });
  return applyComplaintTransition(id, txRespondComplaint(c, actor, resolution), actor);
}

export async function closeComplaint(id: string, input: { customerSatisfied: boolean; reason?: string }): Promise<TxResult> {
  const actor = await getActor();
  const c = await prisma.m12Complaint.findUniqueOrThrow({ where: { id } });
  const result = await applyComplaintTransition(id, txCloseComplaint(c, actor, input), actor);

  // Hook mềm sang M26 (quy tắc 6 DacTa M26 / ETV.P26 mục 5.2.1). Chỉ khiếu nại CÓ CƠ SỞ mới sinh
  // bài học: đã dẫn tới hành động khắc phục (capaRef), hoặc thuộc nhóm phức tạp/ảnh hưởng lớn,
  // hoặc phải dừng giải quyết vì khách không chấp nhận. Cảnh báo mềm — không chặn M12.
  const grounded = Boolean(c.capaRef) || c.isComplex || !input.customerSatisfied;
  if (result.ok && grounded) {
    await ensureLessonFromSource({
      sourceType: "KHIEU_NAI",
      sourceRef: c.code,
      title: `Bài học từ khiếu nại ${c.code}`,
      context: c.content,
      createdById: actor.id,
      rootCauseRef: c.capaRef ?? null,
    });
  }

  return result;
}

export async function setCapaRef(id: string, capaRef: string): Promise<TxResult> {
  const actor = await getActor();
  if (!capaRef) return { ok: false, code: "CAPA_REF_REQUIRED", message: "Bắt buộc nhập số hiệu phiếu yêu cầu khắc phục." };
  await prisma.m12Complaint.update({ where: { id }, data: { capaRef } });
  await logAudit("COMPLAINT", id, actor, `Liên kết hành động khắc phục (${capaRef}, → M13)`, null);
  revalidateM12([`/modules/M12/complaint/${id}`]);
  return { ok: true, status: "DA_TRA_LOI", action: "Liên kết CAPA", reason: null, patch: {} };
}

export async function listAssignableUsers() {
  await getActor();
  const assignments = await prisma.moduleRoleAssignment.findMany({
    where: { moduleCode: "M12", role: "PHUTRACH" },
    include: { user: true },
  });
  return assignments.map((a) => a.user);
}

// ---------- Feedback ----------

export async function createFeedback(input: {
  origin: M12FeedbackOrigin;
  category: M12FeedbackCategory;
  content: string;
  source?: string;
}) {
  const actor = await getActor();
  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const f = await tx.m12Feedback.create({ data: { code: "PENDING", ...input, createdById: actor.id } });
    const code = `PNGY-${year}-${String(f.seq).padStart(4, "0")}`;
    return tx.m12Feedback.update({ where: { id: f.id }, data: { code } });
  });
  await logAudit("FEEDBACK", created.id, actor, "Ghi nhận phàn nàn/góp ý", null);
  revalidateM12();
  return created;
}

export async function escalateFeedback(id: string): Promise<TxResult> {
  const actor = await getActor();
  const f = await prisma.m12Feedback.findUniqueOrThrow({ where: { id } });
  if (!canEscalate(f)) return { ok: false, code: "ALREADY_ESCALATED", message: "Phàn nàn/góp ý này đã được chuyển thành khiếu nại rồi." };

  const year = new Date().getFullYear();
  const complaint = await prisma.$transaction(async (tx) => {
    const c = await tx.m12Complaint.create({
      data: { code: "PENDING", channel: "VAN_BAN", content: f.content, resolvedOnSpot: false, isComplex: false, createdById: actor.id },
    });
    const code = `KN-${year}-${String(c.seq).padStart(4, "0")}`;
    const updated = await tx.m12Complaint.update({ where: { id: c.id }, data: { code } });
    await tx.m12Feedback.update({ where: { id }, data: { escalatedComplaintId: updated.id } });
    return updated;
  });

  await logAudit("FEEDBACK", id, actor, `Chuyển thành khiếu nại ${complaint.code} (quy tắc 6 ETV.P12)`, null);
  revalidateM12([`/modules/M12/complaint/${complaint.id}`]);
  return { ok: true, status: "NHAP", action: "Chuyển thành khiếu nại", reason: null, patch: {} };
}
