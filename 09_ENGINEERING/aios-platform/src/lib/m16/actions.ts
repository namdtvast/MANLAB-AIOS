"use server";

// M16 — Server Actions. Logic quyết định nằm hoàn toàn ở "@/lib/m16/rules" — action này chỉ gọi
// rule rồi ghi DB, không tự quyết định gì thêm (mirror src/lib/m01/actions.ts).
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { M16AuditType, M16Conformity } from "@/generated/prisma/enums";
import { getActor } from "./actor";
import {
  canConfirmProgram,
  canCreateFinding,
  canCreateReport,
  computeIsLate,
  txApprovePlan,
  txReviewPlan,
  txSubmitPlan,
  type M16ActorUser,
  type TxResult,
} from "./rules";

async function logAudit(itemType: "PLAN" | "PROGRAM" | "REPORT", itemId: string, actor: M16ActorUser, action: string, reason: string | null) {
  await prisma.m16AuditEntry.create({
    data: { itemType, itemId, actorId: actor.id, role: actor.m16Role ?? "—", action, reason },
  });
}

function revalidateM16(paths: string[] = []) {
  revalidatePath("/modules/M16");
  for (const p of paths) revalidatePath(p);
}

// ---------- AuditPlan ----------

export async function createAuditPlan(input: { type: M16AuditType; year: number; scope: string[]; auditors: string[]; isAdHoc: boolean }) {
  const actor = await getActor();
  const yearNow = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const p = await tx.m16AuditPlan.create({ data: { code: "PENDING", ...input, createdById: actor.id } });
    const code = `KHDG-${yearNow}-${String(p.seq).padStart(4, "0")}`;
    return tx.m16AuditPlan.update({ where: { id: p.id }, data: { code } });
  });
  await logAudit("PLAN", created.id, actor, "Lập kế hoạch đánh giá", null);
  revalidateM16();
  return created;
}

async function applyPlanTransition(id: string, result: TxResult, actor: M16ActorUser) {
  if (!result.ok) return result;
  const before = await prisma.m16AuditPlan.findUniqueOrThrow({ where: { id } });
  await prisma.m16AuditPlan.update({ where: { id }, data: { status: result.status as never, ...result.patch } });
  await logAudit("PLAN", id, actor, `${result.action} (${before.status} → ${result.status})`, result.reason);
  revalidateM16([`/modules/M16/plan/${id}`]);
  return result;
}

export async function submitAuditPlan(id: string): Promise<TxResult> {
  const actor = await getActor();
  const p = await prisma.m16AuditPlan.findUniqueOrThrow({ where: { id } });
  return applyPlanTransition(id, txSubmitPlan(p), actor);
}

export async function reviewAuditPlan(id: string, input: { decision: "return" | "approve"; reason?: string }): Promise<TxResult> {
  const actor = await getActor();
  const p = await prisma.m16AuditPlan.findUniqueOrThrow({ where: { id } });
  return applyPlanTransition(id, txReviewPlan(p, actor, input), actor);
}

export async function approveAuditPlan(id: string, input: { decision: "reject" | "approve"; reason?: string }): Promise<TxResult> {
  const actor = await getActor();
  const p = await prisma.m16AuditPlan.findUniqueOrThrow({ where: { id } });
  return applyPlanTransition(id, txApprovePlan(p, actor, input), actor);
}

// ---------- AuditProgram ----------

export async function createAuditProgram(input: {
  planId: string;
  department: string;
  field: string;
  auditDate: string;
  teamLeadName: string;
  teamMembers: string[];
}) {
  const actor = await getActor();
  const plan = await prisma.m16AuditPlan.findUniqueOrThrow({ where: { id: input.planId } });
  if (plan.status !== "APPROVED") return { ok: false, code: "PLAN_NOT_APPROVED", message: "Chỉ kế hoạch Đã phê duyệt mới lập chương trình được." } as const;

  const yearNow = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const p = await tx.m16AuditProgram.create({
      data: {
        code: "PENDING",
        planId: input.planId,
        department: input.department,
        field: input.field,
        auditDate: new Date(input.auditDate),
        teamLeadName: input.teamLeadName,
        teamMembers: input.teamMembers,
      },
    });
    const code = `CTDG-${yearNow}-${String(p.seq).padStart(4, "0")}`;
    return tx.m16AuditProgram.update({ where: { id: p.id }, data: { code } });
  });
  await logAudit("PROGRAM", created.id, actor, "Lập chương trình đánh giá", null);
  revalidateM16();
  return created;
}

export async function confirmAuditProgram(id: string): Promise<TxResult> {
  const actor = await getActor();
  const p = await prisma.m16AuditProgram.findUniqueOrThrow({ where: { id } });
  if (p.status !== "DRAFT") return { ok: false, code: "BAD_STATE", message: "Chỉ chương trình Đang soạn mới xác nhận được." };
  const blockMsg = canConfirmProgram(p.auditDate);
  if (blockMsg) return { ok: false, code: "NOTICE_TOO_SHORT", message: blockMsg };
  await prisma.m16AuditProgram.update({ where: { id }, data: { status: "CONFIRMED", confirmedAt: new Date() } });
  await logAudit("PROGRAM", id, actor, "Xác nhận chương trình đánh giá (DRAFT → CONFIRMED)", null);
  revalidateM16([`/modules/M16/program/${id}`]);
  return { ok: true, status: "CONFIRMED", action: "Xác nhận", reason: null, patch: {} };
}

// ---------- AuditFinding ----------

export async function createAuditFinding(input: {
  programId: string;
  clauseRef: string;
  department: string;
  description: string;
  conformity: M16Conformity;
  evidence?: string;
  auditorSignature: string;
  capaRef?: string;
}) {
  const actor = await getActor();
  if (!canCreateFinding(actor)) return { ok: false, code: "FORBIDDEN", message: "Chỉ Đánh giá viên/Trưởng đoàn được ghi phát hiện." } as const;

  const yearNow = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const f = await tx.m16AuditFinding.create({ data: { code: "PENDING", ...input } });
    const code = `PH-${yearNow}-${String(f.seq).padStart(4, "0")}`;
    return tx.m16AuditFinding.update({ where: { id: f.id }, data: { code } });
  });
  await logAudit("PROGRAM", input.programId, actor, `Ghi phát hiện ${created.code} (${input.conformity})`, null);
  revalidateM16([`/modules/M16/program/${input.programId}`]);
  return created;
}

// ---------- AuditReport ----------

export async function createAuditReport(input: {
  programId: string;
  openingMeetingNotes?: string;
  closingMeetingDate: string;
  closingConclusion: string;
}) {
  const actor = await getActor();
  if (!canCreateReport(actor)) return { ok: false, code: "FORBIDDEN", message: "Chỉ Trưởng đoàn đánh giá được tạo báo cáo tổng hợp." } as const;

  const submittedAt = new Date();
  const closingMeetingDate = new Date(input.closingMeetingDate);
  const isLate = computeIsLate(closingMeetingDate, submittedAt);

  const yearNow = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m16AuditReport.create({
      data: {
        code: "PENDING",
        programId: input.programId,
        openingMeetingNotes: input.openingMeetingNotes,
        closingMeetingDate,
        closingConclusion: input.closingConclusion,
        submittedAt,
        isLate,
        createdById: actor.id,
      },
    });
    const code = `BCDG-${yearNow}-${String(r.seq).padStart(4, "0")}`;
    return tx.m16AuditReport.update({ where: { id: r.id }, data: { code } });
  });
  await logAudit("PROGRAM", input.programId, actor, `Đệ trình báo cáo tổng hợp ${created.code}${isLate ? " — TRỄ HẠN" : ""}`, null);
  revalidateM16([`/modules/M16/program/${input.programId}`]);
  return created;
}

export async function listApprovedPlans() {
  await getActor();
  return prisma.m16AuditPlan.findMany({ where: { status: "APPROVED" }, orderBy: { createdAt: "desc" } });
}
