"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { M34PartyRoleType, M34PartyType } from "@/generated/prisma/enums";
import { getActor } from "./actor";
import { validateParty } from "./crm";

export interface PartyInput {
  partyType: M34PartyType;
  legalName: string;
  shortName?: string;
  taxId?: string;
  legacyCode?: string;
  address?: string;
  ward?: string;
  province?: string;
  source?: string;
  roles: M34PartyRoleType[];
  contactName?: string;
  contactPosition?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactIsLegalRep?: boolean;
}

const fail = (message: string) => ({ ok: false as const, message });
const refresh = (id?: string) => {
  revalidatePath("/modules/M34/crm");
  if (id) revalidatePath(`/modules/M34/crm/${id}`);
};

export async function findPartyDuplicates(name: string, taxId?: string) {
  const normalizedName = name.trim();
  if (normalizedName.length < 2 && !taxId?.trim()) return [];
  return prisma.m34Party.findMany({
    where: {
      OR: [
        ...(taxId?.trim() ? [{ taxId: { equals: taxId.trim(), mode: "insensitive" as const } }] : []),
        ...(normalizedName ? [{ legalName: { contains: normalizedName, mode: "insensitive" as const } }] : []),
      ],
    },
    take: 8,
    orderBy: { updatedAt: "desc" },
    select: { id: true, code: true, legalName: true, taxId: true, status: true },
  });
}

export async function createParty(input: PartyInput) {
  const actor = await getActor();
  if (!actor.m34Role) return fail("Bạn chưa được gán vai trò M34 để tạo hồ sơ.");
  const invalid = validateParty(input);
  if (invalid) return fail(invalid);
  const exact = await prisma.m34Party.findFirst({ where: { taxId: input.taxId?.trim() || undefined } });
  if (exact && input.taxId?.trim()) return fail(`Mã số thuế đã tồn tại tại ${exact.code} – ${exact.legalName}. Hãy mở hồ sơ hiện có và bổ sung vai trò.`);

  const party = await prisma.$transaction(async (tx) => {
    const draft = await tx.m34Party.create({
      data: {
        code: "PENDING",
        partyType: input.partyType,
        legalName: input.legalName.trim(),
        shortName: input.shortName?.trim() || null,
        taxId: input.taxId?.trim() || null,
        legacyCode: input.legacyCode?.trim() || null,
        address: input.address?.trim() || null,
        ward: input.ward?.trim() || null,
        province: input.province?.trim() || null,
        source: input.source?.trim() || null,
        createdById: actor.id,
        roles: { create: [...new Set(input.roles)].map((roleType) => ({ roleType })) },
        contacts: input.contactName?.trim() ? { create: [{
          fullName: input.contactName.trim(), position: input.contactPosition?.trim() || null,
          email: input.contactEmail?.trim() || null, phone: input.contactPhone?.trim() || null,
          isLegalRep: input.contactIsLegalRep ?? false, isPrimary: true,
        }] } : undefined,
      },
    });
    return tx.m34Party.update({ where: { id: draft.id }, data: { code: `PTY-${new Date().getFullYear()}-${String(draft.seq).padStart(5, "0")}` } });
  });
  refresh(party.id);
  return { ok: true as const, id: party.id };
}

export async function submitParty(id: string) {
  const actor = await getActor();
  const party = await prisma.m34Party.findUniqueOrThrow({ where: { id }, include: { roles: true } });
  if (!["DRAFT", "REVIEW_REJECTED", "APPROVAL_REJECTED"].includes(party.status)) return fail("Hồ sơ không ở trạng thái được gửi soát xét.");
  if (!party.roles.length) return fail("Hồ sơ phải có ít nhất một vai trò.");
  await prisma.m34Party.update({ where: { id }, data: { status: "PENDING_REVIEW", reason: null } });
  refresh(id); void actor;
  return { ok: true as const };
}

export async function reviewParty(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  if (actor.m34Role !== "QLCL" && actor.m34Role !== "ATTT") return fail("Chỉ QLCL hoặc PT.ATTT được soát xét hồ sơ.");
  const party = await prisma.m34Party.findUniqueOrThrow({ where: { id } });
  if (party.status !== "PENDING_REVIEW") return fail("Hồ sơ không ở bước Chờ soát xét.");
  if (party.createdById === actor.id) return fail("Người lập không được tự soát xét.");
  if (!pass && !reason?.trim()) return fail("Trả lại bắt buộc nhập lý do.");
  await prisma.m34Party.update({ where: { id }, data: { status: pass ? "PENDING_APPROVAL" : "REVIEW_REJECTED", reason: pass ? null : reason!.trim(), reviewedById: actor.id, reviewedAt: new Date() } });
  refresh(id); return { ok: true as const };
}

export async function approveParty(id: string, pass: boolean, reason?: string) {
  const actor = await getActor();
  if (actor.m34Role !== "LDV") return fail("Chỉ Lãnh đạo Viện được phê duyệt hồ sơ dữ liệu chủ.");
  const party = await prisma.m34Party.findUniqueOrThrow({ where: { id } });
  if (party.status !== "PENDING_APPROVAL") return fail("Hồ sơ không ở bước Chờ phê duyệt.");
  if (party.createdById === actor.id) return fail("Người lập không được tự phê duyệt.");
  if (!pass && !reason?.trim()) return fail("Không phê duyệt bắt buộc nhập lý do.");
  await prisma.m34Party.update({ where: { id }, data: { status: pass ? "ACTIVE" : "APPROVAL_REJECTED", reason: pass ? null : reason!.trim(), approvedById: actor.id, approvedAt: pass ? new Date() : null } });
  refresh(id); return { ok: true as const };
}
