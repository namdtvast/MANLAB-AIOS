"use server";

// M17 — Server Actions. Logic quyết định nằm hoàn toàn ở "@/lib/m17/rules" — action này chỉ gọi
// rule rồi ghi DB, không tự quyết định gì thêm (mirror src/lib/m01/actions.ts).
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getActor } from "./actor";
import {
  canRecordConclusion,
  txLdvApprove,
  txRejectPlan,
  txSubmitPlan,
  txTpApprove,
  validateTopicResults,
  type M17ActorUser,
  type TopicResult,
  type TxResult,
} from "./rules";

async function logAudit(itemType: "PLAN" | "MINUTES" | "ACTION", itemId: string, actor: M17ActorUser, action: string, reason: string | null) {
  await prisma.m17AuditEntry.create({
    data: { itemType, itemId, actorId: actor.id, role: actor.m17Role ?? "—", action, reason },
  });
}

function revalidateM17(paths: string[] = []) {
  revalidatePath("/modules/M17");
  for (const p of paths) revalidatePath(p);
}

// Cross-module: đọc thật bảng M16 để tính cảnh báo mềm (quy tắc 1 DacTa "nên cảnh báo",
// KHÔNG chặn) — không import code M16, chỉ query Prisma trực tiếp qua quan hệ đã có sẵn.
export async function hasCompletedAuditThisYear(year: number): Promise<boolean> {
  const count = await prisma.m16AuditReport.count({
    where: { program: { plan: { year, status: "APPROVED" } } },
  });
  return count > 0;
}

// ---------- ReviewPlan ----------

export async function createReviewPlan(input: {
  title: string;
  isAdHoc: boolean;
  plannedDate: string;
  location: string;
  attendees: string[];
  plannedTopics: number[];
}) {
  const actor = await getActor();
  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const p = await tx.m17ReviewPlan.create({
      data: { code: "PENDING", ...input, plannedDate: new Date(input.plannedDate), createdById: actor.id },
    });
    const code = `CTXX-${year}-${String(p.seq).padStart(4, "0")}`;
    return tx.m17ReviewPlan.update({ where: { id: p.id }, data: { code } });
  });
  await logAudit("PLAN", created.id, actor, "Lập chương trình xem xét lãnh đạo", null);
  revalidateM17();
  return created;
}

async function applyPlanTransition(id: string, result: TxResult, actor: M17ActorUser) {
  if (!result.ok) return result;
  const before = await prisma.m17ReviewPlan.findUniqueOrThrow({ where: { id } });
  await prisma.m17ReviewPlan.update({ where: { id }, data: { status: result.status as never, ...result.patch } });
  await logAudit("PLAN", id, actor, `${result.action} (${before.status} → ${result.status})`, result.reason);
  revalidateM17([`/modules/M17/plan/${id}`]);
  return result;
}

export async function submitReviewPlan(id: string): Promise<TxResult> {
  const actor = await getActor();
  const p = await prisma.m17ReviewPlan.findUniqueOrThrow({ where: { id } });
  return applyPlanTransition(id, txSubmitPlan(p), actor);
}

export async function tpApproveReviewPlan(id: string): Promise<TxResult> {
  const actor = await getActor();
  const p = await prisma.m17ReviewPlan.findUniqueOrThrow({ where: { id } });
  return applyPlanTransition(id, txTpApprove(p, actor), actor);
}

export async function ldvApproveReviewPlan(id: string): Promise<TxResult> {
  const actor = await getActor();
  const p = await prisma.m17ReviewPlan.findUniqueOrThrow({ where: { id } });
  return applyPlanTransition(id, txLdvApprove(p, actor), actor);
}

export async function rejectReviewPlan(id: string, reason?: string): Promise<TxResult> {
  const actor = await getActor();
  return applyPlanTransition(id, txRejectPlan(actor, reason), actor);
}

// ---------- ReviewMinutes ----------

export async function createReviewMinutes(input: { planId: string; meetingDate: string; topicResults: TopicResult[] }) {
  const actor = await getActor();
  const plan = await prisma.m17ReviewPlan.findUniqueOrThrow({ where: { id: input.planId } });
  if (plan.status !== "APPROVED") return { ok: false, code: "PLAN_NOT_APPROVED", message: "Chỉ chương trình Đã duyệt mới lập biên bản được." } as const;

  const validationError = validateTopicResults(input.topicResults);
  if (validationError) return { ok: false, code: "TOPICS_INCOMPLETE", message: validationError } as const;

  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const m = await tx.m17ReviewMinutes.create({
      data: {
        code: "PENDING",
        planId: input.planId,
        meetingDate: new Date(input.meetingDate),
        topicResults: input.topicResults as unknown as object,
        recordedById: actor.id,
      },
    });
    const code = `BBXX-${year}-${String(m.seq).padStart(4, "0")}`;
    return tx.m17ReviewMinutes.update({ where: { id: m.id }, data: { code } });
  });
  await logAudit("MINUTES", created.id, actor, "Lập biên bản xem xét (đủ 12 nội dung)", null);
  revalidateM17();
  return created;
}

export async function recordConclusion(id: string, conclusion: string) {
  const actor = await getActor();
  if (!canRecordConclusion(actor)) return { ok: false, code: "FORBIDDEN", message: "Chỉ LĐV được ghi kết luận cuộc họp (quy tắc 5 ETV.P17)." } as const;
  if (!conclusion) return { ok: false, code: "CONCLUSION_REQUIRED", message: "Bắt buộc nhập kết luận." } as const;
  await prisma.m17ReviewMinutes.update({ where: { id }, data: { conclusion } });
  await logAudit("MINUTES", id, actor, "LĐV ghi kết luận cuộc họp", null);
  revalidateM17([`/modules/M17/minutes/${id}`]);
  return { ok: true } as const;
}

// ---------- ReviewActionTracking ----------

export async function createActionTracking(input: {
  minutesId: string;
  actionDescription: string;
  startDate: string;
  dueDate: string;
  assignedTo: string;
  capaRef?: string;
}) {
  const actor = await getActor();
  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const a = await tx.m17ReviewActionTracking.create({
      data: {
        code: "PENDING",
        minutesId: input.minutesId,
        actionDescription: input.actionDescription,
        startDate: new Date(input.startDate),
        dueDate: new Date(input.dueDate),
        assignedTo: input.assignedTo,
        capaRef: input.capaRef,
      },
    });
    const code = `HDXX-${year}-${String(a.seq).padStart(4, "0")}`;
    return tx.m17ReviewActionTracking.update({ where: { id: a.id }, data: { code } });
  });
  await logAudit("MINUTES", input.minutesId, actor, `Lập theo dõi hành động ${created.code}`, null);
  revalidateM17([`/modules/M17/minutes/${input.minutesId}`]);
  return created;
}

export async function markActionDone(id: string) {
  await getActor();
  const updated = await prisma.m17ReviewActionTracking.update({ where: { id }, data: { status: "HOAN_THANH" } });
  revalidateM17([`/modules/M17/minutes/${updated.minutesId}`]);
  return updated;
}

// ---------- CorrectiveActionRequest ----------

export async function createCorrectiveActionRequest(input: { minutesId: string; description: string }) {
  const actor = await getActor();
  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const c = await tx.m17CorrectiveActionRequest.create({
      data: { code: "PENDING", minutesId: input.minutesId, description: input.description, createdById: actor.id },
    });
    const code = `F13.01-${year}-${String(c.seq).padStart(4, "0")}`;
    return tx.m17CorrectiveActionRequest.update({ where: { id: c.id }, data: { code } });
  });
  await logAudit("MINUTES", input.minutesId, actor, `Lập phiếu yêu cầu khắc phục ${created.code} (→ M13)`, null);
  revalidateM17([`/modules/M17/minutes/${input.minutesId}`]);
  return created;
}

export async function listApprovedReviewPlans() {
  await getActor();
  return prisma.m17ReviewPlan.findMany({ where: { status: "APPROVED" }, orderBy: { createdAt: "desc" } });
}
