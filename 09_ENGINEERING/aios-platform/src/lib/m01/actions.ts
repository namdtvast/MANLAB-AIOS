"use server";

// M01 — Server Actions. Logic quyết định chuyển trạng thái nằm hoàn toàn ở "@/lib/m01/rules" —
// action này chỉ gọi rule rồi ghi DB, không tự quyết định gì thêm (mirror src/lib/m10/actions.ts).
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { M01OppSource, M01Source, M01VerifyResult } from "@/generated/prisma/enums";
import { getActor } from "./actor";
import {
  calcRiskScore,
  deriveRiskLevel,
  txLeaderDecideRisk,
  txReviewOpp,
  txReviewRisk,
  txSubmitEvidenceOpp,
  txSubmitEvidenceRisk,
  txSubmitOpp,
  txSubmitRisk,
  txVerifyOpp,
  txVerifyRisk,
  type M01ActorUser,
  type OppForRules,
  type RiskForRules,
  type TxResult,
} from "./rules";

function riskShape(r: {
  status: string;
  severity: number | null;
  possibility: number | null;
  riskLevel: string | null;
  cause: string | null;
  controlMeasure: string | null;
  evidence: string | null;
  createdById: string;
  assigneeId: string | null;
  verifiedById: string | null;
}): RiskForRules {
  return { ...r, status: r.status as RiskForRules["status"], riskLevel: r.riskLevel as RiskForRules["riskLevel"] };
}

function oppShape(o: {
  status: string;
  proposedAction: string | null;
  evidence: string | null;
  createdById: string;
  assigneeId: string | null;
  verifiedById: string | null;
}): OppForRules {
  return { ...o, status: o.status as OppForRules["status"] };
}

async function logAudit(itemType: "RISK" | "OPPORTUNITY", itemId: string, actor: M01ActorUser, action: string, reason: string | null) {
  await prisma.m01AuditEntry.create({
    data: { itemType, itemId, actorId: actor.id, role: actor.m01Role ?? "—", action, reason },
  });
}

function revalidateM01(type: "risk" | "opportunity", id?: string) {
  revalidatePath("/modules/M01");
  if (id) revalidatePath(`/modules/M01/${type}/${id}`);
}

// ---------- Rủi ro ----------

export async function createRisk(input: { title: string; description: string; source: M01Source }) {
  const actor = await getActor();
  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const r = await tx.m01RiskItem.create({
      data: { code: "PENDING", title: input.title, description: input.description, source: input.source, createdById: actor.id },
    });
    const code = `RR-${year}-${String(r.seq).padStart(4, "0")}`;
    return tx.m01RiskItem.update({ where: { id: r.id }, data: { code } });
  });
  await logAudit("RISK", created.id, actor, "Tạo hồ sơ rủi ro", null);
  revalidateM01("risk");
  return created;
}

export async function editRisk(
  id: string,
  input: Partial<{ title: string; description: string; cause: string; controlMeasure: string; severity: number; possibility: number }>
) {
  await getActor();
  const data: Record<string, unknown> = { ...input };
  if (input.severity != null || input.possibility != null) {
    const cur = await prisma.m01RiskItem.findUniqueOrThrow({ where: { id } });
    const severity = input.severity ?? cur.severity;
    const possibility = input.possibility ?? cur.possibility;
    if (severity != null && possibility != null) {
      const riskScore = calcRiskScore(severity, possibility);
      data.riskScore = riskScore;
      data.riskLevel = deriveRiskLevel(riskScore);
    }
  }
  const updated = await prisma.m01RiskItem.update({ where: { id }, data });
  revalidateM01("risk", id);
  return updated;
}

async function applyRiskTransition(id: string, result: TxResult, actor: M01ActorUser) {
  if (!result.ok) return result;
  const before = await prisma.m01RiskItem.findUniqueOrThrow({ where: { id } });
  await prisma.m01RiskItem.update({ where: { id }, data: { status: result.status, ...result.patch } });
  await logAudit("RISK", id, actor, `${result.action} (${before.status} → ${result.status})`, result.reason);
  revalidateM01("risk", id);
  return result;
}

export async function submitRisk(id: string): Promise<TxResult> {
  const actor = await getActor();
  const r = await prisma.m01RiskItem.findUniqueOrThrow({ where: { id } });
  return applyRiskTransition(id, txSubmitRisk(riskShape(r)), actor);
}

export async function reviewRisk(
  id: string,
  input: { decision: "return" | "approve"; reason?: string; assigneeId?: string; dueDate?: string }
): Promise<TxResult> {
  const actor = await getActor();
  const r = await prisma.m01RiskItem.findUniqueOrThrow({ where: { id } });
  return applyRiskTransition(
    id,
    txReviewRisk(riskShape(r), actor, { ...input, dueDate: input.dueDate ? new Date(input.dueDate) : undefined }),
    actor
  );
}

export async function leaderDecideRisk(
  id: string,
  input: { decision: "reject" | "approve"; reason?: string; assigneeId?: string; dueDate?: string }
): Promise<TxResult> {
  const actor = await getActor();
  const r = await prisma.m01RiskItem.findUniqueOrThrow({ where: { id } });
  return applyRiskTransition(
    id,
    txLeaderDecideRisk(riskShape(r), actor, { ...input, dueDate: input.dueDate ? new Date(input.dueDate) : undefined }),
    actor
  );
}

export async function submitEvidenceRisk(id: string, evidence: string): Promise<TxResult> {
  const actor = await getActor();
  const r = await prisma.m01RiskItem.findUniqueOrThrow({ where: { id } });
  return applyRiskTransition(id, txSubmitEvidenceRisk(riskShape(r), actor, { evidence }), actor);
}

export async function verifyRisk(id: string, input: { result: M01VerifyResult; reason?: string }): Promise<TxResult> {
  const actor = await getActor();
  const r = await prisma.m01RiskItem.findUniqueOrThrow({ where: { id } });
  return applyRiskTransition(id, txVerifyRisk(riskShape(r), actor, input), actor);
}

// ---------- Cơ hội ----------

export async function createOpportunity(input: { title: string; description: string; source: M01OppSource }) {
  const actor = await getActor();
  const year = new Date().getFullYear();
  const created = await prisma.$transaction(async (tx) => {
    const o = await tx.m01OpportunityItem.create({
      data: { code: "PENDING", title: input.title, description: input.description, source: input.source, createdById: actor.id },
    });
    const code = `CH-${year}-${String(o.seq).padStart(4, "0")}`;
    return tx.m01OpportunityItem.update({ where: { id: o.id }, data: { code } });
  });
  await logAudit("OPPORTUNITY", created.id, actor, "Tạo hồ sơ cơ hội", null);
  revalidateM01("opportunity");
  return created;
}

export async function editOpportunity(id: string, input: Partial<{ title: string; description: string; proposedAction: string }>) {
  await getActor();
  const updated = await prisma.m01OpportunityItem.update({ where: { id }, data: input });
  revalidateM01("opportunity", id);
  return updated;
}

async function applyOppTransition(id: string, result: TxResult, actor: M01ActorUser) {
  if (!result.ok) return result;
  const before = await prisma.m01OpportunityItem.findUniqueOrThrow({ where: { id } });
  await prisma.m01OpportunityItem.update({ where: { id }, data: { status: result.status, ...result.patch } });
  await logAudit("OPPORTUNITY", id, actor, `${result.action} (${before.status} → ${result.status})`, result.reason);
  revalidateM01("opportunity", id);
  return result;
}

export async function submitOpportunity(id: string): Promise<TxResult> {
  const actor = await getActor();
  const o = await prisma.m01OpportunityItem.findUniqueOrThrow({ where: { id } });
  return applyOppTransition(id, txSubmitOpp(oppShape(o)), actor);
}

export async function reviewOpportunity(
  id: string,
  input: { decision: "return" | "approve"; reason?: string; assigneeId?: string; dueDate?: string }
): Promise<TxResult> {
  const actor = await getActor();
  const o = await prisma.m01OpportunityItem.findUniqueOrThrow({ where: { id } });
  return applyOppTransition(
    id,
    txReviewOpp(oppShape(o), actor, { ...input, dueDate: input.dueDate ? new Date(input.dueDate) : undefined }),
    actor
  );
}

export async function submitEvidenceOpportunity(id: string, evidence: string): Promise<TxResult> {
  const actor = await getActor();
  const o = await prisma.m01OpportunityItem.findUniqueOrThrow({ where: { id } });
  return applyOppTransition(id, txSubmitEvidenceOpp(oppShape(o), actor, { evidence }), actor);
}

export async function verifyOpportunity(id: string, input: { result: M01VerifyResult; reason?: string }): Promise<TxResult> {
  const actor = await getActor();
  const o = await prisma.m01OpportunityItem.findUniqueOrThrow({ where: { id } });
  return applyOppTransition(id, txVerifyOpp(oppShape(o), actor, input), actor);
}

// ---------- Danh sách người dùng cho select "người phụ trách" ----------

export async function listAssignableUsers() {
  await getActor();
  const assignments = await prisma.moduleRoleAssignment.findMany({
    where: { moduleCode: "M01" },
    include: { user: true },
  });
  const seen = new Set<string>();
  return assignments
    .filter((a) => (seen.has(a.userId) ? false : (seen.add(a.userId), true)))
    .map((a) => ({ id: a.userId, name: a.user.name ?? a.user.email }));
}
