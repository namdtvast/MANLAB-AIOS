"use server";

// M04 — Server Actions. Logic quyết định nằm hoàn toàn ở "@/lib/m04/rules" — action này chỉ gọi
// rule rồi ghi DB, không tự quyết định gì thêm (mirror src/lib/m01/actions.ts).
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { M04LogType, M04RiskLevel } from "@/generated/prisma/enums";
import { getActor } from "./actor";
import { computeWithinSpec, txApprovePlan, txMarkBriefed, txSubmitPlan, validateConditionLog, type M04ActorUser, type TxResult } from "./rules";

async function logAudit(
  itemType: "CONDITION_LOG" | "FIELD_WORK_PLAN",
  itemId: string,
  actor: M04ActorUser,
  action: string,
  reason: string | null
) {
  await prisma.m04AuditEntry.create({
    data: { itemType, itemId, actorId: actor.id, role: actor.m04Role ?? "—", action, reason },
  });
}

function revalidateM04(paths: string[] = []) {
  revalidatePath("/modules/M04");
  for (const p of paths) revalidatePath(p);
}

// ---------- M04AreaSpec ----------

export async function listAreaSpecs() {
  await getActor();
  return prisma.m04AreaSpec.findMany({ orderBy: { name: "asc" } });
}

// ---------- M04ConditionLog ----------

export async function createConditionLog(input: {
  logType: M04LogType;
  areaId: string;
  temperature: number;
  humidity: number;
  deviceRef?: string;
  abnormalAction?: string;
}) {
  const actor = await getActor();
  const area = await prisma.m04AreaSpec.findUnique({ where: { id: input.areaId } });
  if (!area) return { ok: false, code: "AREA_NOT_FOUND", message: "Không tìm thấy khu vực." } as const;

  const withinSpec = computeWithinSpec(area, input.temperature, input.humidity);
  const err = validateConditionLog(withinSpec, input.abnormalAction);
  if (err) return { ok: false, code: "ABNORMAL_ACTION_REQUIRED", message: err } as const;

  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const log = await tx.m04ConditionLog.create({
      data: {
        code: "PENDING",
        logType: input.logType,
        areaId: input.areaId,
        temperature: input.temperature,
        humidity: input.humidity,
        deviceRef: input.deviceRef,
        abnormalAction: input.abnormalAction,
        withinSpec,
        reportedById: actor.id,
      },
    });
    const code = `DK-${year}-${String(log.seq).padStart(4, "0")}`;
    return tx.m04ConditionLog.update({ where: { id: log.id }, data: { code } });
  });
  await logAudit("CONDITION_LOG", created.id, actor, "Ghi nhận điều kiện", null);
  revalidateM04();
  return created;
}

// ---------- M04FieldWorkPlan ----------

export async function createFieldWorkPlan(input: {
  site: string;
  customer: string;
  personnel: string[];
  schedule: string;
  workItems: string[];
  riskLevel: M04RiskLevel;
}) {
  const actor = await getActor();
  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const p = await tx.m04FieldWorkPlan.create({
      data: { code: "PENDING", ...input, schedule: new Date(input.schedule), createdById: actor.id },
    });
    const code = `HT-${year}-${String(p.seq).padStart(4, "0")}`;
    return tx.m04FieldWorkPlan.update({ where: { id: p.id }, data: { code } });
  });
  await logAudit("FIELD_WORK_PLAN", created.id, actor, "Lập kế hoạch công việc hiện trường", null);
  revalidateM04();
  return created;
}

async function applyPlanTransition(id: string, result: TxResult, actor: M04ActorUser) {
  if (!result.ok) return result;
  const before = await prisma.m04FieldWorkPlan.findUniqueOrThrow({ where: { id } });
  await prisma.m04FieldWorkPlan.update({ where: { id }, data: { status: result.status as never, ...result.patch } });
  await logAudit("FIELD_WORK_PLAN", id, actor, `${result.action} (${before.status} → ${result.status})`, result.reason);
  revalidateM04([`/modules/M04/plan/${id}`]);
  return result;
}

export async function submitFieldWorkPlan(id: string): Promise<TxResult> {
  const actor = await getActor();
  const p = await prisma.m04FieldWorkPlan.findUniqueOrThrow({ where: { id } });
  return applyPlanTransition(id, txSubmitPlan(p), actor);
}

export async function approveFieldWorkPlan(id: string, input: { decision: "reject" | "approve"; reason?: string }): Promise<TxResult> {
  const actor = await getActor();
  const p = await prisma.m04FieldWorkPlan.findUniqueOrThrow({ where: { id } });
  return applyPlanTransition(id, txApprovePlan(p, actor, input), actor);
}

export async function markPlanBriefed(id: string): Promise<TxResult> {
  const actor = await getActor();
  const p = await prisma.m04FieldWorkPlan.findUniqueOrThrow({ where: { id } });
  return applyPlanTransition(id, txMarkBriefed(p), actor);
}
