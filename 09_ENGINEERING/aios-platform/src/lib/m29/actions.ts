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
  AIIncidentKind,
  AIIncidentSeverity,
  AIIncidentStatus,
  AIOpStatus,
  AIPermissionLevel,
  AIPromptStatus,
  AIUnregisteredStatus,
} from "@/generated/prisma/enums";
import { getActor, type M29ActorUser } from "./actor";
import { can } from "./model";
import {
  aiaTransitions,
  approvalTransitions,
  incidentTransitions,
  promptTransitions,
  unregisteredTransitions,
  validateTool,
  type TxResult,
} from "./rules";
import { callTool as gatewayCallTool } from "./gateway";
import { deploymentGate, runCases } from "./evaluation";
import { chuanHoaSoHoSo, kiemTraDatRanhGioi } from "./copilot/ranh-gioi";
import type { AIDataBoundary } from "@/generated/prisma/enums";
import { sweepAiaReview, SUSPEND_REASON_AIA } from "./sweep";
import { ADAPTER_TYPES, getAdapter } from "./adapters";

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
      actorLabel: actor.name ?? "",
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

// platformId là TÙY CHỌN: nhà cung cấp dịch vụ ngoài Viện không cần bản ghi nền tảng riêng. Với
// nhà cung cấp tự vận hành (máy chủ GPU nội bộ) thì bắt buộc phải có, vì apiBaseUrl và trạng thái
// kiểm tra sức khoẻ chỉ nằm ở AIPlatform — xem ETV.GAI 01 §3.6.
export async function createProvider(input: { code: string; name: string; platformId?: string }) {
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
  // getAdapter() rơi về PlaceholderPlatformAdapter khi không nhận ra adapterType — im lặng và
  // đúng cho lời gọi lúc chạy, nhưng ở bước ĐĂNG KÝ thì đó là bẫy: bản ghi trông như đã nối
  // nền tảng mà thực ra mọi lời gọi trả NOT_INTEGRATED. Chặn ngay tại đây, không để lệch âm thầm.
  if (!ADAPTER_TYPES.includes(input.adapterType))
    throw new Error(`Bộ chuyển đổi "${input.adapterType}" không có thật. Chọn một trong: ${ADAPTER_TYPES.join(", ")}.`);
  const rec = await prisma.aIPlatform.create({ data: input });
  await logAudit(actor, "platforms", rec.id, { after: rec, reason: "create" });
  revalidateM29();
  return rec;
}

/**
 * Đặt RANH GIỚI DỮ LIỆU của một nền tảng mô hình — quyết định tài liệu mức nào được gửi tới đó
 * (ETV.P29 §5.5). Đây là chốt an ninh, không phải một thuộc tính mô tả.
 *
 * Quyền đặt ở "governance" chứ KHÔNG ở "platforms": người đăng ký nền tảng (AI_ADMIN có
 * platforms:r, registry:rw) không được tự nới ranh giới dữ liệu của chính nền tảng mình vừa tạo.
 * Chỉ AI_SECURITY_ADMIN và SUPER_ADMIN có governance:rw. Tách vai trò theo tinh thần ETV.P29 §4.8.
 *
 * Ai nới, lúc nào, dẫn hồ sơ nào: ghi ở AIAuditLog.
 */
export async function datRanhGioiDuLieu(platformId: string, ranhGioi: AIDataBoundary, soHoSo?: string) {
  const actor = await getActor();
  if (!can(actor.m29Role, "governance", "write")) throw new Error("Không đủ quyền đặt ranh giới dữ liệu của nền tảng.");

  const kiem = kiemTraDatRanhGioi(ranhGioi, soHoSo);
  if (!kiem.ok) throw new Error(kiem.loi);

  const truoc = await prisma.aIPlatform.findUniqueOrThrow({ where: { id: platformId } });
  const sau = await prisma.aIPlatform.update({
    where: { id: platformId },
    data: { dataBoundary: ranhGioi, dataBoundaryRef: chuanHoaSoHoSo(ranhGioi, soHoSo) },
  });
  await logAudit(actor, "platforms", platformId, {
    field: "dataBoundary",
    before: { dataBoundary: truoc.dataBoundary, dataBoundaryRef: truoc.dataBoundaryRef },
    after: { dataBoundary: sau.dataBoundary, dataBoundaryRef: sau.dataBoundaryRef },
    reason: `Đặt ranh giới dữ liệu theo ETV.P29 §5.5${sau.dataBoundaryRef ? ` — hồ sơ ${sau.dataBoundaryRef}` : ""}`,
  });
  revalidateM29();
  return sau;
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
  action: "submit" | "review" | "approve" | "activate" | "archive",
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
          : action === "activate"
            ? approvalTransitions.activate(rec)
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

  // Phê duyệt lại AIA → gỡ tạm dừng cho Agent BỊ TẠM DỪNG VÌ AIA QUÁ HẠN. Agent bị tạm dừng vì
  // sự cố (suspendedReason = "INCIDENT:<mã>") KHÔNG tự phục hồi ở đây — phải mở lại thủ công sau
  // khi đóng sự cố, tránh việc phê duyệt một hồ sơ khác vô tình gỡ khống chế sự cố.
  if (action === "approve") {
    const agent = await prisma.aIAgent.findUnique({ where: { id: rec.agentId } });
    if (agent && agent.status === "SUSPENDED" && agent.suspendedReason === SUSPEND_REASON_AIA) {
      await prisma.aIAgent.update({
        where: { id: agent.id },
        data: { status: "ACTIVE", suspendedReason: null, suspendedAt: null },
      });
      await logAudit(actor, "agents", agent.id, {
        field: "status",
        before: "SUSPENDED",
        after: "ACTIVE",
        reason: `Gỡ tạm dừng: hồ sơ AIA ${rec.code} đã được phê duyệt lại (ETV.P29 mục 5.2.3).`,
      });
    }
  }
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
  // Gồm cả ACTIVE ("Hiệu lực"): theo ETV.P35 §6.1.7 bước 6, nền tảng đang vận hành thật nằm ở
  // ACTIVE chứ không phải APPROVED. Lọc riêng APPROVED sẽ bỏ sót đúng những nền tảng cần dò nhất.
  // Cùng cách lọc với loadActiveGuardrails() trong guardrails.ts.
  const platforms = await prisma.aIPlatform.findMany({ where: { approvalStatus: { in: ["APPROVED", "ACTIVE"] } } });
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

  // Sweep AIA quá hạn dùng chung "@/lib/m29/sweep" — nút "Kiểm tra ngay" và cron gọi cùng một
  // đường, để hành vi tạm dừng Agent không phân nhánh theo cách kích hoạt.
  const result = await sweepAiaReview();
  revalidateM29();
  return result;
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

/**
 * Ghi KẾT LUẬN Đạt/Không đạt cho một lượt đánh giá — việc của NGƯỜI, không của phần mềm.
 *
 * ETV.P.F29.03 (cuối phiếu) và ETV.P29 §4.8: trợ lý AI có thể chạy tình huống kiểm thử theo kịch
 * bản nhưng không kết luận Đạt/Không đạt và không phê duyệt phiếu. Vì vậy trình chạy tự động chỉ
 * ghi trạng thái CHO_KET_LUAN; chỉ hàm này — chạy dưới danh nghĩa một tài khoản người dùng có
 * quyền — mới chuyển được sang PASS/FAIL, và bắt buộc dẫn số phiếu F29.03 đã ký.
 *
 * Ai kết luận, lúc nào, dẫn phiếu nào: ghi ở AIAuditLog (không thêm cột vào bảng AI*).
 */
export async function ghiKetLuanDanhGia(runId: string, ketLuan: "PASS" | "FAIL", soPhieuF2903: string) {
  const actor = await getActor();
  if (!can(actor.m29Role, "evaluations", "write")) throw new Error("Không đủ quyền ghi kết luận đánh giá.");
  const soPhieu = soPhieuF2903.trim();
  if (!soPhieu) throw new Error("Phải dẫn số phiếu ETV.P.F29.03 đã ký — kết luận không có hồ sơ là kết luận không có căn cứ.");

  const run = await prisma.aIEvaluationRun.findUniqueOrThrow({ where: { id: runId } });
  if (run.status !== "CHO_KET_LUAN")
    throw new Error(`Lượt đánh giá này đã ở trạng thái ${run.status} — chỉ ghi kết luận cho lượt đang chờ kết luận.`);

  const sau = await prisma.aIEvaluationRun.update({ where: { id: runId }, data: { status: ketLuan } });
  await logAudit(actor, "AIEvaluationRun", runId, {
    field: "status",
    before: { status: run.status },
    after: { status: ketLuan },
    reason: `Kết luận theo phiếu ETV.P.F29.03 số ${soPhieu}`,
  });
  revalidateM29();
  return sau;
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

// ---------- Increment 4 — Phiếu sự cố AI (ETV.P.F29.04) ----------

export async function createIncident(input: {
  severity: AIIncidentSeverity;
  kind: AIIncidentKind;
  agentId?: string;
  platformId?: string;
  traceId?: string;
  occurredAt?: Date;
  description: string;
  containmentAction?: string;
  affectsIssuedResult?: boolean;
  sensitiveDataExposed?: boolean;
}) {
  const actor = await getActor();
  if (!can(actor.m29Role, "incidents", "write")) throw new Error("Không đủ quyền.");

  const year = new Date().getFullYear();
  const seq = (await prisma.aIIncident.count()) + 1;
  const code = `SCAI-${year}-${String(seq).padStart(4, "0")}`;

  const rec = await prisma.aIIncident.create({
    data: {
      code,
      severity: input.severity,
      kind: input.kind,
      agentId: input.agentId || null,
      platformId: input.platformId || null,
      traceId: input.traceId || null,
      occurredAt: input.occurredAt ?? new Date(),
      detectedById: actor.id,
      description: input.description,
      containmentAction: input.containmentAction ?? "",
      affectsIssuedResult: input.affectsIssuedResult ?? false,
      sensitiveDataExposed: input.sensitiveDataExposed ?? false,
    },
  });
  await logAudit(actor, "incidents", rec.id, { after: rec, reason: "create" });

  // Khống chế trước khi điều tra (ETV.P29 mục 5.7.3 bước 1): sự cố Nghiêm trọng gắn Agent thì
  // tạm dừng Agent NGAY trong cùng thao tác, không chờ ai bấm thêm nút nào.
  if (input.severity === "SEVERE" && rec.agentId) {
    const agent = await prisma.aIAgent.findUnique({ where: { id: rec.agentId } });
    if (agent && agent.status === "ACTIVE") {
      await prisma.aIAgent.update({
        where: { id: agent.id },
        data: { status: "SUSPENDED", suspendedReason: `INCIDENT:${rec.code}`, suspendedAt: new Date() },
      });
      await logAudit(actor, "agents", agent.id, {
        field: "status",
        before: "ACTIVE",
        after: "SUSPENDED",
        reason: `Tạm dừng ngay để khống chế sự cố Nghiêm trọng ${rec.code} (ETV.P29 mục 5.7.3).`,
      });
    }
  }
  revalidateM29();
  return rec;
}

export async function incidentAction(
  id: string,
  action: "start" | "submit" | "close" | "cancel",
  extra: { containmentAction?: string; capRef?: string; f28Ref?: string; issuedResultRef?: string; closureNote?: string; reason?: string } = {}
): Promise<TxResult> {
  const actor = await getActor();
  if (!can(actor.m29Role, "incidents", "write")) return forbidden();
  const rec = await prisma.aIIncident.findUniqueOrThrow({ where: { id } });

  const result =
    action === "start"
      ? incidentTransitions.start(rec, extra)
      : action === "submit"
        ? incidentTransitions.submit(rec)
        : action === "close"
          ? incidentTransitions.close(rec, { id: actor.id, role: actor.m29Role }, extra)
          : incidentTransitions.cancel(rec, { role: actor.m29Role }, extra);
  if (!result.ok) return result;

  const before = rec.status;
  await prisma.aIIncident.update({
    where: { id },
    data: {
      status: result.status as AIIncidentStatus,
      ...(result.patch as Record<string, unknown>),
      assessedById: action === "start" ? actor.id : undefined,
    },
  });
  await logAudit(actor, "incidents", id, { field: "status", before, after: result.status, reason: result.reason });
  revalidateM29();
  return result;
}

/** Mở lại Agent bị tạm dừng để khống chế sự cố — thao tác có chủ đích của người có thẩm quyền. */
export async function resumeAgent(agentId: string, reason: string): Promise<TxResult> {
  const actor = await getActor();
  if (!can(actor.m29Role, "registry", "write")) return forbidden();
  if (!reason.trim()) return { ok: false, code: "REASON_REQUIRED", message: "Mở lại tác tử bắt buộc ghi lý do." };
  const agent = await prisma.aIAgent.findUniqueOrThrow({ where: { id: agentId } });
  if (agent.status !== "SUSPENDED") return { ok: false, code: "BAD_STATE", message: "Chỉ tác tử đang Tạm dừng mới mở lại được." };

  await prisma.aIAgent.update({ where: { id: agentId }, data: { status: "ACTIVE", suspendedReason: null, suspendedAt: null } });
  await logAudit(actor, "agents", agentId, { field: "status", before: "SUSPENDED", after: "ACTIVE", reason });
  revalidateM29();
  return { ok: true, status: "ACTIVE", action: "Mở lại tác tử", reason, patch: {} };
}

// ---------- Increment 4 — Hệ thống AI chưa đăng ký (ETV.P29 mục 5.1.7) ----------

const SIGHTING_DUE_DAYS = 15;

export async function createSighting(input: {
  name: string;
  usedBy: string;
  dataExposed?: string;
  sensitiveData?: boolean;
  plannedAction?: string;
  incidentId?: string;
}) {
  const actor = await getActor();
  if (!can(actor.m29Role, "unregistered", "write")) throw new Error("Không đủ quyền.");

  const year = new Date().getFullYear();
  const seq = (await prisma.aIUnregisteredSighting.count()) + 1;
  const code = `UAI-${year}-${String(seq).padStart(3, "0")}`;
  const detectedAt = new Date();

  const rec = await prisma.aIUnregisteredSighting.create({
    data: {
      code,
      name: input.name,
      usedBy: input.usedBy,
      detectedAt,
      detectedById: actor.id,
      dataExposed: input.dataExposed ?? "",
      sensitiveData: input.sensitiveData ?? false,
      plannedAction: input.plannedAction ?? "",
      incidentId: input.incidentId || null,
      dueDate: new Date(detectedAt.getTime() + SIGHTING_DUE_DAYS * 24 * 60 * 60 * 1000),
    },
  });
  await logAudit(actor, "unregistered", rec.id, { after: rec, reason: "create" });
  revalidateM29();
  return rec;
}

export async function linkSightingIncident(id: string, incidentId: string) {
  const actor = await getActor();
  if (!can(actor.m29Role, "unregistered", "write")) throw new Error("Không đủ quyền.");
  const rec = await prisma.aIUnregisteredSighting.update({ where: { id }, data: { incidentId } });
  await logAudit(actor, "unregistered", id, { field: "incidentId", after: incidentId, reason: "Gắn phiếu sự cố" });
  revalidateM29();
  return rec;
}

export async function sightingAction(
  id: string,
  action: "start-registering" | "mark-registered" | "discontinue",
  extra: { registeredAgentId?: string; reason?: string } = {}
): Promise<TxResult> {
  const actor = await getActor();
  if (!can(actor.m29Role, "unregistered", "write")) return forbidden();
  const rec = await prisma.aIUnregisteredSighting.findUniqueOrThrow({ where: { id } });

  const result =
    action === "start-registering"
      ? unregisteredTransitions.startRegistering(rec)
      : action === "mark-registered"
        ? unregisteredTransitions.markRegistered(rec, extra)
        : unregisteredTransitions.discontinue(rec, extra);
  if (!result.ok) return result;

  const before = rec.status;
  await prisma.aIUnregisteredSighting.update({
    where: { id },
    data: { status: result.status as AIUnregisteredStatus, ...(result.patch as Record<string, unknown>) },
  });
  await logAudit(actor, "unregistered", id, { field: "status", before, after: result.status, reason: result.reason });
  revalidateM29();
  return result;
}
