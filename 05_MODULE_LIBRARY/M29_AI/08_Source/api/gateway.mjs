// AIOS Control Plane — Tool Gateway: điểm gọi API nền tảng DUY NHẤT mà Agent được phép dùng.
// Không route nào khác cho phép Agent gọi thẳng API bên ngoài (nguyên tắc kiến trúc #1, DacTa.md).
import { load, save, findById, nextSeq } from './db.mjs';
import { getAdapter } from './adapters.mjs';
import { hasToolPermission } from './rules.mjs';
import { nowISO, genId, OP_STATUS } from './model.mjs';

const err = (code, message) => ({ ok: false, code, message });

export async function callTool({ toolId, agentId, input, user }) {
  const d = load();
  const tool = findById('tools', toolId);
  if (!tool) return err('NOT_FOUND', 'Không tìm thấy Tool.');
  const agent = agentId ? findById('agents', agentId) : null;
  if (agentId && !agent) return err('NOT_FOUND', 'Không tìm thấy Agent.');

  if (tool.status === OP_STATUS.DISABLED)
    return err('TOOL_DISABLED', 'Tool đang bị vô hiệu hóa — Tool Gateway chặn, không forward tới nền tảng.');
  if (agent && !(agent.toolIds || []).includes(toolId))
    return err('TOOL_NOT_WHITELISTED', 'Tool không nằm trong whitelist của Agent này.');
  if (!hasToolPermission(user.role, tool))
    return err('FORBIDDEN', `Vai trò ${user.role} không đủ quyền gọi Tool permission_level=${tool.permission_level}.`);

  const platform = findById('platforms', tool.platform_id);
  if (!platform) return err('NOT_FOUND', 'Không tìm thấy Platform của Tool.');

  const traceId = genId('TRACE');
  const startedAt = Date.now();
  const adapter = getAdapter(platform.adapter_type);
  const result = await adapter.call(platform, tool, input);

  const inputTokens = JSON.stringify(input || {}).length;
  const outputTokens = JSON.stringify(result.output || {}).length;

  const request = {
    id: traceId, platform_id: platform.id, agent_id: agent?.id || null, model_id: agent?.model_id || null,
    prompt_version_id: agent?.active_prompt_version_id || null, user_ref: user.id,
    input_tokens: inputTokens, output_tokens: outputTokens, latency_ms: Date.now() - startedAt,
    guardrail_result: 'PASS', evaluation_result: null, created_at: nowISO(),
  };
  const toolCall = {
    id: `TC-${nextSeq('toolCall')}`, request_id: traceId, tool_id: tool.id,
    input: input || {}, output: result.output, status: result.status < 400 ? 'OK' : 'ERROR', latency_ms: result.latency_ms, error_code: result.error_code || null,
  };
  d.requests.push(request);
  d.toolCalls.push(toolCall);
  save();

  if (result.status >= 400) return err(result.error_code || 'TOOL_CALL_FAILED', `Tool trả lỗi HTTP ${result.status}.`);
  return { ok: true, traceId, request, toolCall };
}

export const listTraces = () => load().requests;
export function getTrace(id) {
  const request = findById('requests', id);
  if (!request) return null;
  const toolCalls = load().toolCalls.filter((c) => c.request_id === id);
  return { request, toolCalls };
}
