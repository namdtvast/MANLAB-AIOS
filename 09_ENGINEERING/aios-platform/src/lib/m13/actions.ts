"use server";

// M13 — Server Actions. Logic quyết định nằm hoàn toàn ở "@/lib/m13/rules" — action này chỉ gọi
// rule rồi ghi DB, không tự quyết định gì thêm (mirror src/lib/m12/actions.ts).
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { M13Severity, M13SourceType } from "@/generated/prisma/enums";
import { getActor } from "./actor";
import {
  txApproveReplacementReport,
  txAssessSeverity,
  txCloseNcw,
  txCompleteCapPlan,
  txCreateCapPlan,
  txReviewCapPlan,
  type M13ActorUser,
  type NcwForRules,
  type TxResult,
} from "./rules";

async function logAudit(itemType: "NCW" | "CAP", itemId: string, actor: M13ActorUser, action: string, reason: string | null) {
  await prisma.m13AuditEntry.create({
    data: { itemType, itemId, actorId: actor.id, role: actor.m13Role ?? "—", action, reason },
  });
}

function revalidateM13(paths: string[] = []) {
  revalidatePath("/modules/M13");
  for (const p of paths) revalidatePath(p);
}

// Đọc NCW kèm đúng những gì rules cần (số ghi chép, số báo cáo thu hồi, phương án).
async function loadNcwForRules(id: string): Promise<NcwForRules> {
  const n = await prisma.m13NonconformingWork.findUniqueOrThrow({
    where: { id },
    include: { plan: true, _count: { select: { monitoringNotes: true, revokedReports: true } } },
  });
  return {
    status: n.status,
    severity: n.severity,
    monitoringNoteCount: n._count.monitoringNotes,
    revokedReportCount: n._count.revokedReports,
    plan: n.plan ? { status: n.plan.status, assignedToId: n.plan.assignedToId } : null,
  };
}

// ---------- Sổ theo dõi công việc không phù hợp (F13.01) ----------

export async function createNcw(input: {
  sourceType: M13SourceType;
  sourceRef?: string;
  description: string;
  emergencyStop: boolean;
}) {
  const actor = await getActor();
  const year = new Date().getFullYear();

  const created = await prisma.$transaction(async (tx) => {
    const n = await tx.m13NonconformingWork.create({
      data: {
        code: "PENDING",
        sourceType: input.sourceType,
        sourceRef: input.sourceRef,
        description: input.description,
        emergencyStop: input.emergencyStop,
        stoppedWork: input.emergencyStop, // quy tắc 1: dừng ngay khẩn cấp, báo cáo sau
        detectedById: actor.id,
      },
    });
    const code = `KPH-${year}-${String(n.seq).padStart(4, "0")}`;
    return tx.m13NonconformingWork.update({ where: { id: n.id }, data: { code } });
  });

  await logAudit(
    "NCW",
    created.id,
    actor,
    input.emergencyStop
      ? "Ghi nhận công việc không phù hợp — DỪNG NGAY khẩn cấp tại chỗ (quy tắc 1 ETV.P13)"
      : "Ghi nhận công việc không phù hợp vào sổ theo dõi",
    null
  );
  revalidateM13();
  return created;
}

async function applyNcwTransition(id: string, result: TxResult, actor: M13ActorUser) {
  if (!result.ok) return result;
  const before = await prisma.m13NonconformingWork.findUniqueOrThrow({ where: { id } });
  await prisma.m13NonconformingWork.update({ where: { id }, data: { status: result.status as never, ...result.patch } });
  await logAudit("NCW", id, actor, `${result.action} (${before.status} → ${result.status})`, result.reason);
  revalidateM13([`/modules/M13/ncw/${id}`]);
  return result;
}

export async function assessSeverity(id: string, input: { severity: M13Severity; basis: string }): Promise<TxResult> {
  const actor = await getActor();
  const n = await loadNcwForRules(id);
  const result = txAssessSeverity(n, actor, input);
  if (result.ok) result.patch = { ...result.patch, assessedById: actor.id };
  return applyNcwTransition(id, result, actor);
}

export async function closeNcw(id: string): Promise<TxResult> {
  const actor = await getActor();
  const n = await loadNcwForRules(id);
  return applyNcwTransition(id, txCloseNcw(n, actor), actor);
}

export async function addMonitoringNote(id: string, note: string): Promise<TxResult> {
  const actor = await getActor();
  if (!note) return { ok: false, code: "NOTE_REQUIRED", message: "Bắt buộc nhập nội dung diễn biến theo dõi." };
  await prisma.m13MonitoringNote.create({ data: { ncwId: id, note, authorId: actor.id } });
  await logAudit("NCW", id, actor, "Ghi chép diễn biến theo dõi (quy tắc 3 ETV.P13)", note);
  revalidateM13([`/modules/M13/ncw/${id}`]);
  return { ok: true, status: "DANG_THEO_DOI", action: "Ghi chép theo dõi", reason: null, patch: {} };
}

export async function revokeReport(id: string, input: { reportRef: string; note?: string }): Promise<TxResult> {
  const actor = await getActor();
  if (!input.reportRef) return { ok: false, code: "REPORT_REF_REQUIRED", message: "Bắt buộc nhập số hiệu báo cáo/GCN thu hồi." };
  await prisma.m13RevokedReport.create({ data: { ncwId: id, reportRef: input.reportRef, note: input.note } });
  await logAudit("NCW", id, actor, `Thu hồi báo cáo/GCN ${input.reportRef} (← M11, quy tắc 4 ETV.P13)`, input.note ?? null);
  revalidateM13([`/modules/M13/ncw/${id}`]);
  return { ok: true, status: "DANG_KHAC_PHUC", action: "Thu hồi báo cáo", reason: null, patch: {} };
}

// ---------- Phương án hành động khắc phục (chỉ mức Nặng) ----------

export async function createCapPlan(
  ncwId: string,
  input: { rootCause: string; actionPlan: string; assignedToId: string }
): Promise<TxResult> {
  const actor = await getActor();
  const n = await loadNcwForRules(ncwId);
  const result = txCreateCapPlan(n, actor, input);
  if (!result.ok) return result;

  await prisma.m13CorrectiveActionPlan.create({
    data: {
      ncwId,
      rootCause: input.rootCause,
      actionPlan: input.actionPlan,
      assignedToId: input.assignedToId,
    },
  });
  await logAudit("NCW", ncwId, actor, result.action, null);
  revalidateM13([`/modules/M13/ncw/${ncwId}`]);
  return result;
}

export async function completeCapPlan(ncwId: string): Promise<TxResult> {
  const actor = await getActor();
  const plan = await prisma.m13CorrectiveActionPlan.findUniqueOrThrow({ where: { ncwId } });
  const result = txCompleteCapPlan(plan, actor);
  if (!result.ok) return result;

  await prisma.m13CorrectiveActionPlan.update({
    where: { ncwId },
    data: { status: result.status as never, completedAt: new Date() },
  });
  await logAudit("CAP", plan.id, actor, `${result.action} (${plan.status} → ${result.status})`, null);
  revalidateM13([`/modules/M13/ncw/${ncwId}`]);
  return result;
}

export async function reviewCapPlan(ncwId: string, input: { passed: boolean; note?: string }): Promise<TxResult> {
  const actor = await getActor();
  const plan = await prisma.m13CorrectiveActionPlan.findUniqueOrThrow({ where: { ncwId } });
  const result = txReviewCapPlan(plan, actor, input);
  if (!result.ok) return result;

  await prisma.m13CorrectiveActionPlan.update({
    where: { ncwId },
    data: {
      status: result.status as never,
      reviewedById: actor.id,
      reviewedAt: new Date(),
      ...result.patch,
    },
  });
  await logAudit("CAP", plan.id, actor, `${result.action} (${plan.status} → ${result.status})`, result.reason);
  revalidateM13([`/modules/M13/ncw/${ncwId}`]);
  return result;
}

export async function approveReplacementReport(ncwId: string, replacementReportRef: string): Promise<TxResult> {
  const actor = await getActor();
  const n = await loadNcwForRules(ncwId);
  const result = txApproveReplacementReport(n, actor, replacementReportRef);
  if (!result.ok) return result;

  const plan = await prisma.m13CorrectiveActionPlan.update({
    where: { ncwId },
    data: {
      replacementReportRef,
      replacementApprovedById: actor.id,
      replacementApprovedAt: new Date(),
    },
  });
  await logAudit("CAP", plan.id, actor, `${result.action} (${replacementReportRef})`, null);
  revalidateM13([`/modules/M13/ncw/${ncwId}`]);
  return result;
}

export async function listAssignableUsers() {
  await getActor();
  const assignments = await prisma.moduleRoleAssignment.findMany({
    where: { moduleCode: "M13", role: { in: ["NHANVIEN", "QLKT"] } },
    include: { user: true },
  });
  return assignments.map((a) => a.user);
}
