// M29 — Tool Gateway: điểm gọi API nền tảng DUY NHẤT mà Agent được phép dùng. Không route nào
// khác cho phép Agent gọi thẳng API bên ngoài (nguyên tắc kiến trúc #1, DacTa.md). Port 1:1 từ
// 08_Source/api/gateway.mjs — giữ NGUYÊN THỨ TỰ 7 bước kiểm tra của bản gốc, không sắp xếp lại.
import { prisma } from "@/lib/prisma";
import { getAdapter, type ChatMessage } from "./adapters";
import { hasToolPermission } from "./rules";
import { enforceInput, enforceOutput, loadActiveGuardrails } from "./guardrails";
import { buildContextBlock, retrieve, type Passage } from "./copilot/retrieval";
// Câu từ chối và mã Agent nằm ở module thuần để trình chấm đánh giá dùng lại được mà không
// phải kéo theo Prisma. Re-export để nơi gọi cũ không phải đổi đường dẫn nhập.
import { COPILOT_AGENT_CODE, NO_SOURCE_ANSWER } from "./copilot/hang-so";

export { COPILOT_AGENT_CODE, NO_SOURCE_ANSWER };
import type { M29Role } from "./model";

export type GatewayResult =
  | { ok: true; traceId: string; requestId: string; toolCallId: string }
  | { ok: false; code: string; message: string };

const err = (code: string, message: string): GatewayResult => ({ ok: false, code, message });

export async function callTool({
  toolId,
  agentId,
  input,
  user,
}: {
  toolId: string;
  agentId: string | undefined;
  input: unknown;
  user: { id: string; role: M29Role | null };
}): Promise<GatewayResult> {
  // (1) Tool tồn tại.
  const tool = await prisma.aITool.findUnique({ where: { id: toolId } });
  if (!tool) return err("NOT_FOUND", "Không tìm thấy Tool.");

  // (2) Tool Gateway CHỈ nhận lời gọi thay mặt một Agent cụ thể — không cho gọi Tool "trần".
  if (!agentId) return err("AGENT_REQUIRED", "Tool Gateway chỉ nhận lời gọi thay mặt một Agent cụ thể — thiếu agentId.");

  // (3) Agent tồn tại.
  const agent = await prisma.aIAgent.findUnique({ where: { id: agentId } });
  if (!agent) return err("NOT_FOUND", "Không tìm thấy Agent.");

  // (3b) Agent phải đang hoạt động. Bước này BỔ SUNG ở Increment 4 — bản port gốc không xét
  // agent.status nên Agent đã Vô hiệu hóa/Tạm dừng vẫn gọi được Tool. ETV.P29 mục 5.2.3 và 5.7.3
  // yêu cầu tác tử bị tạm dừng thì không được vận hành, nên chặn ngay tại Gateway.
  if (agent.status !== "ACTIVE")
    return err(
      "AGENT_NOT_ACTIVE",
      `Agent "${agent.name}" đang ở trạng thái ${agent.status}${agent.suspendedReason ? ` (lý do: ${agent.suspendedReason})` : ""} — Tool Gateway chặn, không forward tới nền tảng.`
    );

  // (4) Tool không bị DISABLED.
  if (tool.status === "DISABLED") return err("TOOL_DISABLED", "Tool đang bị vô hiệu hóa — Tool Gateway chặn, không forward tới nền tảng.");

  // (5) Tool nằm trong whitelist toolIds của Agent.
  if (!agent.toolIds.includes(toolId)) return err("TOOL_NOT_WHITELISTED", "Tool không nằm trong whitelist của Agent này.");

  // (6) Vai trò đủ quyền theo permissionLevel của Tool.
  if (!hasToolPermission(user.role, tool)) return err("FORBIDDEN", `Vai trò ${user.role ?? "—"} không đủ quyền gọi Tool permissionLevel=${tool.permissionLevel}.`);

  // (7) AIA Gate (ISO/IEC 42001) — Agent chưa có hồ sơ đánh giá tác động AI ĐÃ PHÊ DUYỆT thì
  // không được vận hành, kể cả khi Tool/permission đã hợp lệ.
  const aia = await prisma.aIImpactAssessment.findFirst({ where: { agentId } });
  if (!aia || aia.status !== "APPROVED")
    return err(
      "AIA_NOT_APPROVED",
      `Agent "${agent.name}" chưa có hồ sơ AI Impact Assessment ở trạng thái Đã phê duyệt (hiện tại: ${aia?.status ?? "chưa có hồ sơ"}) — Tool Gateway chặn theo ISO/IEC 42001.`
    );

  const platform = await prisma.aIPlatform.findUnique({ where: { id: tool.platformId } });
  if (!platform) return err("NOT_FOUND", "Không tìm thấy Platform của Tool.");

  const startedAt = Date.now();
  const adapter = getAdapter(platform.adapterType);
  const result = await adapter.call(platform, tool, input);

  const inputTokens = JSON.stringify(input ?? {}).length;
  const outputTokens = JSON.stringify(result.output ?? {}).length;

  const request = await prisma.aIRequest.create({
    data: {
      platformId: platform.id,
      agentId: agent.id,
      modelId: agent.modelId,
      promptVersionId: agent.activePromptVersionId,
      userRef: user.id,
      inputTokens,
      outputTokens,
      latencyMs: Date.now() - startedAt,
      guardrailResult: "PASS",
    },
  });
  const toolCall = await prisma.aIToolCall.create({
    data: {
      requestId: request.id,
      toolId: tool.id,
      input: (input ?? {}) as object,
      output: (result.output ?? undefined) as object | undefined,
      status: result.status < 400 ? "OK" : "ERROR",
      latencyMs: result.latencyMs,
      errorCode: result.errorCode,
    },
  });

  if (result.status >= 400) return err(result.errorCode ?? "TOOL_CALL_FAILED", `Tool trả lỗi HTTP ${result.status}.`);
  return { ok: true, traceId: request.id, requestId: request.id, toolCallId: toolCall.id };
}

export const listTraces = () => prisma.aIRequest.findMany({ orderBy: { createdAt: "desc" }, include: { agent: true, model: true } });

export async function getTrace(id: string) {
  const request = await prisma.aIRequest.findUnique({ where: { id }, include: { agent: true, model: true, promptVersion: true } });
  if (!request) return null;
  const toolCalls = await prisma.aIToolCall.findMany({ where: { requestId: id }, include: { tool: true } });
  return { request, toolCalls };
}

// ---------------------------------------------------------------------------
// chat() — lượt hỏi–đáp của Copilot tra cứu.
//
// Đây là ĐƯỜNG DUY NHẤT được phép gọi mô hình ngôn ngữ. Không route/action nào khác được gọi
// thẳng adapter mô hình: làm vậy là vô hiệu hóa AIA Gate và biến M29 thành sổ sách trang trí
// (spec §1). Kiểm tra AC-08: `grep -rn "AnthropicAdapter" src` chỉ được ra adapters.ts.
//
// Bất biến: MỖI lượt hỏi sinh ĐÚNG MỘT AIRequest — kể cả lượt bị guardrail chặn, lượt vượt hạn
// mức, lượt không tìm thấy căn cứ và lượt lỗi mạng (AC-03). Không có lượt nào đi ngoài sổ.


/**
 * Độ sâu suy luận cho Copilot. Tra cứu tài liệu đã có sẵn trích đoạn là việc nhẹ; "low" giữ độ
 * trễ trong ngưỡng spec §12 và giảm chi phí. Không lấy từ AIModel.temperature: các model Claude
 * hiện hành đã bỏ tham số lấy mẫu (gửi lên là lỗi 400).
 */
const COPILOT_EFFORT = "low" as const;


export interface Citation {
  path: string;
  title: string;
  heading: string;
}

export interface ChatTurnResult {
  ok: boolean;
  /** Mã AIRequest của lượt này. null chỉ khi chính việc ghi trace thất bại. */
  requestId: string | null;
  answer: string;
  citations: Citation[];
  /** null khi thành công; ngược lại là mã từ chối/lỗi để giao diện hiển thị đúng nguyên nhân. */
  code: string | null;
}

interface ChatArgs {
  question: string;
  history: ChatMessage[];
  user: { id: string };
  moduleContext?: string | null;
}

/**
 * Hạn mức chi phí tháng (USD). Là THAM SỐ VẬN HÀNH, không phải nội dung thủ tục: đổi hạn mức
 * không được kéo theo ban hành lại ETV.P29 (Q3 trong spec). Bản ghi AIPolicy trong M29 là hồ sơ
 * quản trị của hạn mức này; con số thực thi đọc từ biến môi trường.
 * Không đặt biến ⇒ không chặn theo chi phí (vẫn còn AIA Gate và guardrail).
 */
function monthlyBudgetUsd(): number | null {
  const raw = process.env.COPILOT_MONTHLY_BUDGET_USD;
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
}

async function costThisMonth(agentId: string): Promise<number> {
  const from = new Date();
  from.setUTCDate(1);
  from.setUTCHours(0, 0, 0, 0);
  const rows = await prisma.aIRequest.findMany({
    where: { agentId, createdAt: { gte: from } },
    select: { inputTokens: true, outputTokens: true, model: { select: { costPer1kTokens: true } } },
  });
  return rows.reduce((sum, r) => sum + ((r.inputTokens + r.outputTokens) / 1000) * (r.model?.costPer1kTokens ?? 0), 0);
}

/** Đoạn nào thật sự được câu trả lời dẫn tới — cơ sở cho guardrail GR-NO-SOURCE. */
function citedPassages(answer: string, passages: Passage[]): Citation[] {
  const cited = passages.filter((p) => answer.includes(p.path));
  const seen = new Set<string>();
  return cited
    .filter((p) => (seen.has(p.path) ? false : (seen.add(p.path), true)))
    .map((p) => ({ path: p.path, title: p.title, heading: p.heading }));
}

export async function chat({ question, history, user }: ChatArgs): Promise<ChatTurnResult> {
  const agent = await prisma.aIAgent.findUnique({
    where: { code: COPILOT_AGENT_CODE },
    include: { model: true, platform: true },
  });

  // Ghi trace cho MỌI nhánh kết thúc, kể cả nhánh chưa từng chạm tới nhà cung cấp mô hình.
  const trace = async (fields: { guardrailResult: string; inputTokens?: number; outputTokens?: number; latencyMs?: number }) =>
    prisma.aIRequest.create({
      data: {
        platformId: agent?.platformId ?? null,
        agentId: agent?.id ?? null,
        modelId: agent?.modelId ?? null,
        promptVersionId: agent?.activePromptVersionId ?? null,
        userRef: user.id,
        inputTokens: fields.inputTokens ?? 0,
        outputTokens: fields.outputTokens ?? 0,
        latencyMs: fields.latencyMs ?? 0,
        guardrailResult: fields.guardrailResult,
      },
      select: { id: true },
    });

  const refuse = async (code: string, answer: string, guardrailResult = code): Promise<ChatTurnResult> => {
    const r = await trace({ guardrailResult });
    return { ok: false, requestId: r.id, answer, citations: [], code };
  };

  // (1) Agent phải đã được khai trong registry M29.
  if (!agent)
    return refuse(
      "AGENT_NOT_CONFIGURED",
      "Copilot chưa được đăng ký trong danh mục AI của Viện (M29). Liên hệ quản trị AI để khai báo trước khi sử dụng."
    );

  // (2) Agent phải đang hoạt động — cùng ngữ nghĩa bước (3b) của callTool().
  if (agent.status !== "ACTIVE")
    return refuse(
      "AGENT_NOT_ACTIVE",
      `Copilot đang ở trạng thái ${agent.status}${agent.suspendedReason ? ` (lý do: ${agent.suspendedReason})` : ""} — tạm thời không trả lời.`
    );

  // (3) AIA Gate — cùng ngữ nghĩa bước (7) của callTool(). Chưa có hồ sơ đánh giá tác động AI đã
  // phê duyệt thì không lượt hỏi nào rời khỏi hạ tầng của Viện.
  const aia = await prisma.aIImpactAssessment.findFirst({ where: { agentId: agent.id } });
  if (!aia || aia.status !== "APPROVED")
    return refuse(
      "AIA_NOT_APPROVED",
      `Copilot chưa có hồ sơ đánh giá tác động AI ở trạng thái Đã phê duyệt (hiện tại: ${aia?.status ?? "chưa có hồ sơ"}) — bị chặn theo ISO/IEC 42001 và ETV.P29.`
    );

  if (!agent.model) return refuse("MODEL_NOT_CONFIGURED", "Copilot chưa được gán mô hình ngôn ngữ trong danh mục M29.");
  const promptVersion = agent.activePromptVersionId
    ? await prisma.aIPromptVersion.findUnique({ where: { id: agent.activePromptVersionId } })
    : null;
  if (!promptVersion || !["APPROVED", "ACTIVE"].includes(promptVersion.status))
    return refuse("PROMPT_NOT_APPROVED", "Copilot chưa có phiên bản prompt hệ thống đã phê duyệt — không được vận hành.");

  const rails = await loadActiveGuardrails(agent.id);

  // (4) Guardrail đầu vào — chặn TRƯỚC khi gọi API, không phải sau.
  const inputCheck = enforceInput(question, rails);
  if (inputCheck.blocked)
    return refuse("GUARDRAIL_BLOCKED", inputCheck.hits.map((h) => h.reason).join(" "), inputCheck.result);

  // (5) Hạn mức chi phí tháng.
  const budget = monthlyBudgetUsd();
  if (budget !== null && (await costThisMonth(agent.id)) >= budget)
    return refuse("QUOTA_EXCEEDED", `Copilot đã dùng hết hạn mức chi phí tháng (${budget} USD). Liên hệ quản trị AI để xem xét.`);

  // (6) Truy hồi ngữ cảnh. Không có trích đoạn ⇒ từ chối, KHÔNG gọi API, vẫn ghi trace.
  const passages = await retrieve(question);
  if (passages.length === 0) return refuse("NO_SOURCE", NO_SOURCE_ANSWER, "BLOCK:GR-NO-SOURCE");

  // (7) Gọi nhà cung cấp mô hình qua adapter.
  const adapter = getAdapter(agent.platform.adapterType);
  if (!adapter.chat)
    return refuse("ADAPTER_NO_CHAT", `Nền tảng "${agent.platform.name}" không hỗ trợ hội thoại — kiểm tra adapterType trong danh mục M29.`);

  const result = await adapter.chat(agent.platform, {
    modelId: agent.model.modelId,
    system: `${promptVersion.content}\n\n## NGỮ CẢNH ĐƯỢC PHÉP DÙNG\n\n${buildContextBlock(passages)}`,
    messages: [...history, { role: "user", content: question }],
    maxTokens: agent.model.maxTokens ?? 2048,
    effort: COPILOT_EFFORT,
  });

  if (result.errorCode) {
    const r = await trace({
      guardrailResult: `ERROR:${result.errorCode}`,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
      latencyMs: result.latencyMs,
    });
    const message =
      result.errorCode === "NO_API_KEY"
        ? "Copilot chưa được cấu hình khóa API (ANTHROPIC_API_KEY) trên máy chủ."
        : `Không gọi được dịch vụ mô hình (${result.errorCode}). Vui lòng thử lại sau.`;
    return { ok: false, requestId: r.id, answer: message, citations: [], code: result.errorCode };
  }

  // (8) Guardrail đầu ra + ghi trace.
  const citations = citedPassages(result.text, passages);
  const outputCheck = enforceOutput({ text: result.text, citationCount: citations.length }, rails);
  const r = await trace({
    guardrailResult: outputCheck.result,
    inputTokens: result.inputTokens,
    outputTokens: result.outputTokens,
    latencyMs: result.latencyMs,
  });

  if (outputCheck.blocked)
    return { ok: false, requestId: r.id, answer: NO_SOURCE_ANSWER, citations: [], code: "GUARDRAIL_BLOCKED" };

  return { ok: true, requestId: r.id, answer: result.text, citations, code: null };
}
