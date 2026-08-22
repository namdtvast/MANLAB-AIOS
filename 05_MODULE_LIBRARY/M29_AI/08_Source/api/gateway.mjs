// AIOS Control Plane — Tool Gateway: điểm gọi API nền tảng DUY NHẤT mà Agent được phép dùng.
// Không route nào khác cho phép Agent gọi thẳng API bên ngoài (nguyên tắc kiến trúc #1, DacTa.md).
import { load, save, col, findById, nextSeq } from './db.mjs';
import { getAdapter } from './adapters.mjs';
import { hasToolPermission } from './rules.mjs';
import { nowISO, genId, OP_STATUS, AIA_STATUS } from './model.mjs';

const err = (code, message) => ({ ok: false, code, message });

export async function callTool({ toolId, agentId, input, user }) {
  const d = load();
  const tool = findById('tools', toolId);
  if (!tool) return err('NOT_FOUND', 'Không tìm thấy Tool.');
  if (!agentId) return err('AGENT_REQUIRED', 'Tool Gateway chỉ nhận lời gọi thay mặt một Agent cụ thể — thiếu agentId.');
  const agent = findById('agents', agentId);
  if (!agent) return err('NOT_FOUND', 'Không tìm thấy Agent.');

  if (tool.status === OP_STATUS.DISABLED)
    return err('TOOL_DISABLED', 'Tool đang bị vô hiệu hóa — Tool Gateway chặn, không forward tới nền tảng.');
  if (!(agent.toolIds || []).includes(toolId))
    return err('TOOL_NOT_WHITELISTED', 'Tool không nằm trong whitelist của Agent này.');
  if (!hasToolPermission(user.role, tool))
    return err('FORBIDDEN', `Vai trò ${user.role} không đủ quyền gọi Tool permission_level=${tool.permission_level}.`);

  // AIA Gate (Phase 2, ISO/IEC 42001) — Agent chưa có hồ sơ đánh giá tác động AI ĐÃ PHÊ DUYỆT
  // thì không được vận hành, kể cả khi Tool/permission đã hợp lệ.
  const aia = col('aia').find((a) => a.agent_id === agentId);
  if (!aia || aia.status !== AIA_STATUS.APPROVED)
    return err('AIA_NOT_APPROVED', `Agent '${agent.name}' chưa có hồ sơ AI Impact Assessment ở trạng thái Đã phê duyệt (hiện tại: ${aia?.status || 'chưa có hồ sơ'}) — Tool Gateway chặn theo ISO/IEC 42001.`);

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
