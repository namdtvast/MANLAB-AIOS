"use server";

// M02 — Server Actions. Logic quyết định nằm hoàn toàn ở "@/lib/m02/rules" — action này chỉ gọi
// rule rồi ghi DB, không tự quyết định gì thêm (mirror src/lib/m01/actions.ts).
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { M02AuthorityLevel, M02CommitmentType } from "@/generated/prisma/enums";
import { getActor } from "./actor";
import { txApproveDisclosure, txAssessIncident, txCloseIncident, txRevokeCommitment, validateVisitorCommitment, type M02ActorUser, type TxResult } from "./rules";

async function logAudit(
  itemType: "COMMITMENT" | "VISITOR_LOG" | "DISCLOSURE" | "INCIDENT",
  itemId: string,
  actor: M02ActorUser,
  action: string,
  reason: string | null
) {
  await prisma.m02AuditEntry.create({
    data: { itemType, itemId, actorId: actor.id, role: actor.m02Role ?? "—", action, reason },
  });
}

function revalidateM02(paths: string[] = []) {
  revalidatePath("/modules/M02");
  for (const p of paths) revalidatePath(p);
}

// ---------- SecurityCommitment ----------

export async function createCommitment(input: {
  type: M02CommitmentType;
  personName: string;
  org?: string;
  signedDate: string;
  accessScope: string;
  employeeId?: string;
}) {
  const actor = await getActor();
  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const c = await tx.m02SecurityCommitment.create({
      data: { code: "PENDING", ...input, signedDate: new Date(input.signedDate) },
    });
    const code = `CK-${year}-${String(c.seq).padStart(4, "0")}`;
    return tx.m02SecurityCommitment.update({ where: { id: c.id }, data: { code } });
  });
  await logAudit("COMMITMENT", created.id, actor, "Ghi nhận cam kết bảo mật", null);
  revalidateM02();
  return created;
}

export async function revokeCommitment(id: string, reason?: string): Promise<TxResult> {
  const actor = await getActor();
  const c = await prisma.m02SecurityCommitment.findUniqueOrThrow({ where: { id } });
  const result = txRevokeCommitment(c, actor);
  if (!result.ok) return result;
  await prisma.m02SecurityCommitment.update({
    where: { id },
    data: { status: "DA_THU_HOI", ...result.patch, revokeReason: reason ?? null },
  });
  await logAudit("COMMITMENT", id, actor, result.action, reason ?? null);
  revalidateM02([`/modules/M02/commitment/${id}`]);
  return result;
}

export async function listActiveCommitments(type?: M02CommitmentType) {
  await getActor();
  return prisma.m02SecurityCommitment.findMany({
    where: { status: "HIEU_LUC", ...(type ? { type } : {}) },
    orderBy: { createdAt: "desc" },
  });
}

export async function listEmployeesForCommitment() {
  await getActor();
  return prisma.m03Employee.findMany({ orderBy: { createdAt: "desc" } });
}

// ---------- VisitorLog ----------

export async function createVisitorLog(input: {
  commitmentId: string;
  visitorName: string;
  org?: string;
  purpose: string;
  area: string;
}) {
  const actor = await getActor();
  const commitment = await prisma.m02SecurityCommitment.findUnique({ where: { id: input.commitmentId } });
  const err = validateVisitorCommitment(commitment);
  if (err) return { ok: false, code: "INVALID_COMMITMENT", message: err } as const;

  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const v = await tx.m02VisitorLog.create({
      data: { code: "PENDING", ...input, approvedById: actor.id },
    });
    const code = `KH-${year}-${String(v.seq).padStart(4, "0")}`;
    return tx.m02VisitorLog.update({ where: { id: v.id }, data: { code } });
  });
  await logAudit("VISITOR_LOG", created.id, actor, "Ghi nhận khách vào khu vực hạn chế", null);
  revalidateM02();
  return created;
}

export async function recordExit(id: string) {
  await getActor();
  const updated = await prisma.m02VisitorLog.update({ where: { id }, data: { exitTime: new Date() } });
  revalidateM02();
  return updated;
}

// ---------- DisclosureApproval ----------

export async function createDisclosure(input: {
  basis: string;
  content: string;
  recipient: string;
  legallyProhibitedNotify: boolean;
  customerNotified: boolean;
  authorityLevel: M02AuthorityLevel;
}) {
  const actor = await getActor();
  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const d = await tx.m02DisclosureApproval.create({ data: { code: "PENDING", ...input } });
    const code = `CB-${year}-${String(d.seq).padStart(4, "0")}`;
    return tx.m02DisclosureApproval.update({ where: { id: d.id }, data: { code } });
  });
  await logAudit("DISCLOSURE", created.id, actor, "Soạn hồ sơ công bố thông tin", null);
  revalidateM02();
  return created;
}

export async function approveDisclosure(id: string): Promise<TxResult> {
  const actor = await getActor();
  const d = await prisma.m02DisclosureApproval.findUniqueOrThrow({ where: { id } });
  const result = txApproveDisclosure(d, actor);
  if (!result.ok) return result;
  await prisma.m02DisclosureApproval.update({ where: { id }, data: { status: "APPROVED", ...result.patch } });
  await logAudit("DISCLOSURE", id, actor, result.action, null);
  revalidateM02([`/modules/M02/disclosure/${id}`]);
  return result;
}

// ---------- SecurityIncident ----------

export async function createIncident(input: { containmentAction: string }) {
  const actor = await getActor();
  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const i = await tx.m02SecurityIncident.create({
      data: { code: "PENDING", containmentAction: input.containmentAction, detectedById: actor.id },
    });
    const code = `SC-${year}-${String(i.seq).padStart(4, "0")}`;
    return tx.m02SecurityIncident.update({ where: { id: i.id }, data: { code } });
  });
  await logAudit("INCIDENT", created.id, actor, "Phát hiện sự cố — đã ngăn chặn", null);
  revalidateM02();
  return created;
}

export async function assessIncident(id: string, input: { impactAssessment: string; notificationRequired: boolean }): Promise<TxResult> {
  const actor = await getActor();
  const inc = await prisma.m02SecurityIncident.findUniqueOrThrow({ where: { id } });
  const result = txAssessIncident(inc, actor, input);
  if (!result.ok) return result;
  await prisma.m02SecurityIncident.update({ where: { id }, data: { status: "ASSESSED", ...result.patch } });
  await logAudit("INCIDENT", id, actor, result.action, null);
  revalidateM02([`/modules/M02/incident/${id}`]);
  return result;
}

export async function closeIncident(id: string, input: { correctiveAction: string }): Promise<TxResult> {
  const actor = await getActor();
  const inc = await prisma.m02SecurityIncident.findUniqueOrThrow({ where: { id } });
  const result = txCloseIncident(inc, actor, input);
  if (!result.ok) return result;
  await prisma.m02SecurityIncident.update({ where: { id }, data: { status: "CLOSED", ...result.patch } });
  await logAudit("INCIDENT", id, actor, result.action, null);
  revalidateM02([`/modules/M02/incident/${id}`]);
  return result;
}
