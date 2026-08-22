// M29 — Tool Gateway: điểm gọi API nền tảng DUY NHẤT mà Agent được phép dùng. Không route nào
// khác cho phép Agent gọi thẳng API bên ngoài (nguyên tắc kiến trúc #1, DacTa.md). Port 1:1 từ
// 08_Source/api/gateway.mjs — giữ NGUYÊN THỨ TỰ 7 bước kiểm tra của bản gốc, không sắp xếp lại.
import { prisma } from "@/lib/prisma";
import { getAdapter } from "./adapters";
import { hasToolPermission } from "./rules";
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
