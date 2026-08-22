"use server";

// M29 — Server Actions, port từ CRUD/route handler trong 08_Source/api/server.js sang
// Prisma/Postgres. Logic quyết định chuyển trạng thái nằm hoàn toàn ở "@/lib/m29/rules" — action
// này chỉ gọi rule/gateway rồi ghi DB + audit log, không tự quyết định gì thêm.
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type {
  AIApprovalStatus,
  AIAStatus,
  AIGuardrailAction,
  AIOpStatus,
  AIPermissionLevel,
  AIPromptStatus,
} from "@/generated/prisma/enums";
import { getActor, type M29ActorUser } from "./actor";
import { can } from "./model";
import { aiaTransitions, approvalTransitions, promptTransitions, validateTool, type TxResult } from "./rules";
import { callTool as gatewayCallTool } from "./gateway";
import { deploymentGate, runCases } from "./evaluation";
import { getAdapter } from "./adapters";

function forbidden(): TxResult {
  return { ok: false, code: "FORBIDDEN", message: "Không đủ quyền truy cập tài nguyên này." };
}

async function logAudit(
  actor: M29ActorUser,
  entityType: string,
  entityId: string,
  patch: { field?: string; before?: unknown; after?: unknown; reason?: string | null } = {}
) {
  await prisma.aIAuditLog.create({
    data: {
      actorId: actor.id,
      role: actor.m29Role ?? "—",
      entityType,
      entityId,
      field: patch.field ?? null,
      before: (patch.before ?? undefined) as object | undefined,
      after: (patch.after ?? undefined) as object | undefined,
      reason: patch.reason ?? null,
    },
  });
}

function revalidateM29() {
  revalidatePath("/modules/M29", "layout");
}

// ---------- Registry CRUD đơn giản (Provider/Model/Skill/Tool/Agent) ----------
// Port `simpleCrud()` trong server.js — create/update đều ghi AIAuditLog.

export async function createProvider(input: { code: string; name: string }) {
  const actor = await getActor();
  if (!can(actor.m29Role, "registry", "write")) throw new Error("Không đủ quyền.");
  const rec = await prisma.aIProvider.create({ data: input });
  await logAudit(actor, "providers", rec.id, { after: rec, reason: "create" });
  revalidateM29();
  return rec;
}

export async function createModel(input: {
  providerId: string;
  modelId: string;
  displayName: string;
  purpose?: string;
  temperature?: number;
  maxTokens?: number;
  costPer1kTokens?: number;
}) {
  const actor = await getActor();
  if (!can(actor.m29Role, "registry", "write")) throw new Error("Không đủ quyền.");
  const rec = await prisma.aIModel.create({ data: input });
  await logAudit(actor, "models", rec.id, { after: rec, reason: "create" });
  revalidateM29();
  return rec;
}

export async function createSkill(input: { code: string; name: string; platformScope?: string; riskLevel?: string }) {
  const actor = await getActor();
  if (!can(actor.m29Role, "registry", "write")) throw new Error("Không đủ quyền.");
  const rec = await prisma.aISkill.create({ data: input });
  await logAudit(actor, "skills", rec.id, { after: rec, reason: "create" });
  revalidateM29();
  return rec;
}

export async function createTool(input: {
  platformId: string;
  code: string;
  name: string;
  endpoint: string;
  httpMethod?: string;
  permissionLevel: AIPermissionLevel;
  requireConfirmation?: boolean;
  requireApproval?: boolean;
  riskLevel?: string;
}) {
  const actor = await getActor();
  if (!can(actor.m29Role, "registry", "write")) throw new Error("Không đủ quyền.");
  const check = validateTool({
    permissionLevel: input.permissionLevel,
    requireConfirmation: input.requireConfirmation ?? false,
    requireApproval: input.requireApproval ?? false,
  });
  if (!check.ok) throw new Error(check.message);
  const rec = await prisma.aITool.create({ data: input });
  await logAudit(actor, "tools", rec.id, { after: rec, reason: "create" });
  revalidateM29();
  return rec;
}

export async function setToolStatus(id: string, status: AIOpStatus) {
  const actor = await getActor();
  if (!can(actor.m29Role, "registry", "write")) throw new Error("Không đủ quyền.");
  const before = await prisma.aITool.findUniqueOrThrow({ where: { id } });
  const rec = await prisma.aITool.update({ where: { id }, data: { status } });
  await logAudit(actor, "tools", id, { field: "status", before: before.status, after: status, reason: "update" });
  revalidateM29();
  return rec;
}

export async function createAgent(input: {
  platformId: string;
  code: string;
  name: string;
  purpose?: string;
  modelId?: string;
  riskLevel?: string;
  owner?: string;
  skillIds?: string[];
  toolIds?: string[];
}) {
  const actor = await getActor();
  if (!can(actor.m29Role, "registry", "write")) throw new Error("Không đủ quyền.");
  const rec = await prisma.aIAgent.create({ data: { ...input, skillIds: input.skillIds ?? [], toolIds: input.toolIds ?? [] } });
  await logAudit(actor, "agents", rec.id, { after: rec, reason: "create" });
  revalidateM29();
  return rec;
}

export async function updateAgentToolsSkills(id: string, input: { skillIds?: string[]; toolIds?: string[] }) {
  const actor = await getActor();
  if (!can(actor.m29Role, "registry", "write")) throw new Error("Không đủ quyền.");
  const before = await prisma.aIAgent.findUniqueOrThrow({ where: { id } });
  const rec = await prisma.aIAgent.update({ where: { id }, data: input });
  await logAudit(actor, "agents", id, { before: { skillIds: before.skillIds, toolIds: before.toolIds }, after: input, reason: "update" });
  revalidateM29();
  return rec;
}

export async function createPlatform(input: { code: string; name: string; baseUrl?: string; apiBaseUrl?: string; environment?: string; adapterType: string; owner?: string }) {
  const actor = await getActor();
  if (!can(actor.m29Role, "platforms", "write")) throw new Error("Không đủ quyền.");
  const rec = await prisma.aIPlatform.create({ data: input });
  await logAudit(actor, "platforms", rec.id, { after: rec, reason: "create" });
  revalidateM29();
  return rec;
}

// ---------- Vòng đời phê duyệt dùng chung (Platform/Guardrail/Policy) ----------

type ApprovalKind = "platform" | "guardrail" | "policy";

async function findApprovable(kind: ApprovalKind, id: string) {
  if (kind === "platform") return prisma.aIPlatform.findUniqueOrThrow({ where: { id } });
  if (kind === "guardrail") return prisma.aIGuardrail.findUniqueOrThrow({ where: { id } });
  return prisma.aIPolicy.findUniqueOrThrow({ where: { id } });
}

async function updateApprovable(kind: ApprovalKind, id: string, data: { approvalStatus: AIApprovalStatus; approvedBy?: string }) {
  if (kind === "platform") return prisma.aIPlatform.update({ where: { id }, data });
  if (kind === "guardrail") return prisma.aIGuardrail.update({ where: { id }, data });
  return prisma.aIPolicy.update({ where: { id }, data });
}

export async function approvalAction(
  kind: ApprovalKind,
  id: string,
  action: "submit" | "review" | "approve" | "archive",
  extra: { decision?: "return" | "approve" | "reject"; reason?: string } = {}
): Promise<TxResult> {
  const actor = await getActor();
  const category = kind === "platform" ? "platforms" : "governance";
  if (!can(actor.m29Role, category, "write")) return forbidden();

  const rec = await findApprovable(kind, id);
  const result =
    action === "submit"
      ? approvalTransitions.submit(rec)
      : action === "review"
        ? approvalTransitions.review(rec, { decision: extra.decision === "return" ? "return" : "approve", reason: extra.reason })
        : action === "approve"
          ? approvalTransitions.approve(rec, actor, { decision: extra.decision === "reject" ? "reject" : "approve", reason: extra.reason })
          : approvalTransitions.archive(rec, extra);
  if (!result.ok) return result;

  const before = rec.approvalStatus;
  await updateApprovable(kind, id, { approvalStatus: result.status as AIApprovalStatus, ...result.patch });
  await logAudit(actor, `${kind}s`, id, { field: "approvalStatus", before, after: result.status, reason: result.reason });
  revalidateM29();
  return result;
}

export async function createGuardrail(input: {
  code: string;
  description: string;
  scope: string;
  scopeRef?: string;
  severity?: string;
  action: AIGuardrailAction;
}) {
  const actor = await getActor();
  if (!can(actor.m29Role, "governance", "write")) throw new Error("Không đủ quyền.");
  const rec = await prisma.aIGuardrail.create({ data: input });
  await logAudit(actor, "guardrails", rec.id, { after: rec, reason: "create" });
  revalidateM29();
  return rec;
}

export async function createPolicy(input: { name: string; owner?: string; approver?: string; reference?: string }) {
  const actor = await getActor();
  if (!can(actor.m29Role, "governance", "write")) throw new Error("Không đủ quyền.");
  const rec = await prisma.aIPolicy.create({ data: input });
  await logAudit(actor, "policies", rec.id, { after: rec, reason: "create" });
  revalidateM29();
  return rec;
}

// ---------- AIA (AI Impact Assessment) ----------

export async function createAia(input: {
  agentId: string;
  purpose: string;
  dataUsed?: string;
  affectedUsers?: string;
  risk?: string;
  humanOversight?: string;
  controls?: string;
  residualRisk?: string;
}) {
  const actor = await getActor();
  if (!can(actor.m29Role, "aia", "write")) throw new Error("Không đủ quyền.");
  const seq = (await prisma.aIImpactAssessment.count()) + 1;
  const code = `AIA-${new Date().getFullYear()}-${String(seq).padStart(3, "0")}`;
  const rec = await prisma.aIImpactAssessment.create({ data: { ...input, code } });
  await logAudit(actor, "aia", rec.id, { after: rec, reason: "create" });
  revalidateM29();
  return rec;
}

export async function aiaAction(
  id: string,
  action: "start-draft" | "submit-review" | "approve" | "flag-review-required",
  extra: { reason?: string } = {}
): Promise<TxResult> {
  const actor = await getActor();
  if (!can(actor.m29Role, "aia", "write")) return forbidden();
  const rec = await prisma.aIImpactAssessment.findUniqueOrThrow({ where: { id } });

  const result =
    action === "start-draft"
      ? aiaTransitions.startDraft(rec)
      : action === "submit-review"
        ? aiaTransitions.submitReview(rec)
        : action === "approve"
          ? aiaTransitions.approve(rec, actor)
          : aiaTransitions.flagReviewRequired(rec, extra);
  if (!result.ok) return result;

  const before = rec.status;
  await prisma.aIImpactAssessment.update({
    where: { id },
    data: { status: result.status as AIAStatus, reviewDate: action === "approve" ? new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) : undefined },
  });
  await logAudit(actor, "aia", id, { field: "status", before, after: result.status, reason: result.reason });
  revalidateM29();
  return result;
}

// ---------- Prompt / PromptVersion ----------

export async function createPromptVersion(agentId: string, content: string) {
  const actor = await getActor();
  if (!can(actor.m29Role, "registry", "write")) throw new Error("Không đủ quyền.");
  let prompt = await prisma.aIPrompt.findFirst({ where: { agentId } });
  if (!prompt) {
    const agent = await prisma.aIAgent.findUniqueOrThrow({ where: { id: agentId } });
    prompt = await prisma.aIPrompt.create({ data: { code: `PROMPT_${agent.code}`, agentId } });
  }
  const version = await prisma.aIPromptVersion.create({ data: { promptId: prompt.id, content, createdBy: actor.id } });
  await logAudit(actor, "promptVersions", version.id, { after: version, reason: "create" });
  revalidateM29();
  return version;
}

export async function promptAction(id: string, action: "submit-review" | "approve" | "activate"): Promise<TxResult> {
  const actor = await getActor();
  if (!can(actor.m29Role, "registry", "write")) return forbidden();
  const version = await prisma.aIPromptVersion.findUniqueOrThrow({ where: { id } });
  const prompt = await prisma.aIPrompt.findUniqueOrThrow({ where: { id: version.promptId } });

  if (action === "activate") {
    const gate = await deploymentGate(prompt.agentId);
    if (!gate.ok) return gate;
  }

  const result =
    action === "submit-review" ? promptTransitions.submitReview(version) : action === "approve" ? promptTransitions.approve(version, actor) : promptTransitions.activate(version);
  if (!result.ok) return result;

  const before = version.status;
  await prisma.aIPromptVersion.update({
    where: { id },
    data: {
      status: result.status as AIPromptStatus,
      approvedBy: action === "approve" ? actor.id : undefined,
      effectiveFrom: action === "activate" ? new Date() : undefined,
    },
  });
  if (action === "activate") {
    // Bản trước đó (nếu có, khác bản vừa kích hoạt) chuyển ARCHIVED — đúng bản gốc server.js
    // (RECON ban đầu bỏ sót bước này, phát hiện khi verify qua Browser thấy 2 version cùng
    // hiện "Đang hiệu lực").
    const agent = await prisma.aIAgent.findUniqueOrThrow({ where: { id: prompt.agentId } });
    if (agent.activePromptVersionId && agent.activePromptVersionId !== id) {
      await prisma.aIPromptVersion.update({ where: { id: agent.activePromptVersionId }, data: { status: "ARCHIVED" } });
    }
    await prisma.aIAgent.update({ where: { id: prompt.agentId }, data: { activePromptVersionId: id } });
  }
  await logAudit(actor, "promptVersions", id, { field: "status", before, after: result.status, reason: result.reason });
  revalidateM29();
  return result;
}

// ---------- Tool Gateway ----------

export async function callToolAction(input: { toolId: string; agentId: string; input: unknown }) {
  const actor = await getActor();
  if (!can(actor.m29Role, "traces", "read") && !can(actor.m29Role, "registry", "read")) throw new Error("Không đủ quyền xem/gọi Tool.");
  const result = await gatewayCallTool({ toolId: input.toolId, agentId: input.agentId, input: input.input, user: { id: actor.id, role: actor.m29Role } });
  revalidateM29();
  return result;
}

// ---------- Health / AIA review sweep (kích hoạt thủ công qua nút — xem spec.md #5) ----------

export async function checkHealthAction() {
  const actor = await getActor();
  if (!can(actor.m29Role, "health", "read")) throw new Error("Không đủ quyền.");
  const platforms = await prisma.aIPlatform.findMany({ where: { approvalStatus: "APPROVED" } });
  for (const platform of platforms) {
    const adapter = getAdapter(platform.adapterType);
    const r = await adapter.health(platform);
    await prisma.aIPlatform.update({
      where: { id: platform.id },
      data: {
        health: r.ok ? "HEALTHY" : r.error === "NOT_INTEGRATED" ? "UNKNOWN" : "DOWN",
        lastError: r.error,
        lastHealthCheckAt: new Date(),
      },
    });
  }

  const now = new Date();
  const dueAia = await prisma.aIImpactAssessment.findMany({ where: { status: "APPROVED", reviewDate: { lt: now } } });
  for (const aia of dueAia) {
    await prisma.aIImpactAssessment.update({ where: { id: aia.id }, data: { status: "REVIEW_REQUIRED" } });
    await logAudit(actor, "aia", aia.id, {
      field: "status",
      before: "APPROVED",
      after: "REVIEW_REQUIRED",
      reason: `Quá hạn rà soát định kỳ (reviewDate=${aia.reviewDate?.toISOString()}) — phát hiện thủ công qua nút "Kiểm tra ngay", không phải AI tự kết luận.`,
    });
  }
  revalidateM29();
}

// ---------- Evaluation ----------

export async function createEvaluationSuite(agentId: string, name: string, cases: { input: unknown; expected: string }[]) {
  const actor = await getActor();
  if (!can(actor.m29Role, "evaluations", "write")) throw new Error("Không đủ quyền.");
  const suite = await prisma.aIEvaluationSuite.create({
    data: { agentId, name, cases: { create: cases.map((c) => ({ input: c.input as object, expected: c.expected })) } },
  });
  revalidateM29();
  return suite;
}

export async function runEvaluationSuite(suiteId: string) {
  const actor = await getActor();
  if (!can(actor.m29Role, "evaluations", "write")) throw new Error("Không đủ quyền.");
  const suite = await prisma.aIEvaluationSuite.findUniqueOrThrow({ where: { id: suiteId }, include: { cases: true } });
  const result = runCases(suite.cases.map((c) => ({ id: c.id, expected: c.expected, input: c.input })));
  const run = await prisma.aIEvaluationRun.create({
    data: { suiteId, passCount: result.passCount, failCount: result.failCount, status: result.status },
  });
  revalidateM29();
  return { run, results: result.results };
}

// ---------- Secrets — chỉ nhận rồi mask ngay, KHÔNG lưu giá trị thật (spec.md #3) ----------

function maskValue(value: string) {
  return "****" + value.slice(-4);
}

export async function createSecret(input: { platformId: string; name: string; value: string }) {
  const actor = await getActor();
  if (!can(actor.m29Role, "secrets", "write")) throw new Error("Không đủ quyền.");
  const rec = await prisma.aISecret.create({ data: { platformId: input.platformId, name: input.name, maskedValue: maskValue(input.value) } });
  await logAudit(actor, "secrets", rec.id, { after: { ...rec, maskedValue: rec.maskedValue }, reason: "create" });
  revalidateM29();
  return rec;
}

export async function rotateSecret(id: string, value: string) {
  const actor = await getActor();
  if (!can(actor.m29Role, "secrets", "write")) throw new Error("Không đủ quyền.");
  const rec = await prisma.aISecret.update({ where: { id }, data: { maskedValue: maskValue(value), lastRotated: new Date() } });
  await logAudit(actor, "secrets", id, { reason: "rotate" });
  revalidateM29();
  return rec;
}

export async function disableSecret(id: string) {
  const actor = await getActor();
  if (!can(actor.m29Role, "secrets", "write")) throw new Error("Không đủ quyền.");
  const rec = await prisma.aISecret.update({ where: { id }, data: { status: "DISABLED" } });
  await logAudit(actor, "secrets", id, { field: "status", after: "DISABLED", reason: "disable" });
  revalidateM29();
  return rec;
}
