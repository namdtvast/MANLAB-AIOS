// AIOS Control Plane — Token/Cost: tổng hợp trực tiếp từ AIRequest (Trace), không lưu trùng
// bảng riêng để tránh lệch dữ liệu — hợp lý ở quy mô JSON-file-store Phase 1.
import { load } from './db.mjs';

const COST_PER_1K_TOKENS = { 'MODEL-GEMINI-FLASH': 0.0003 };

export function usage({ platformId, agentId, modelId } = {}) {
  const reqs = load().requests.filter((r) =>
    (!platformId || r.platform_id === platformId) &&
    (!agentId || r.agent_id === agentId) &&
    (!modelId || r.model_id === modelId));
  const byDate = {};
  for (const r of reqs) {
    const date = r.created_at.slice(0, 10);
    const key = `${date}|${r.platform_id}|${r.agent_id}|${r.model_id}`;
    if (!byDate[key]) byDate[key] = { date, platform_id: r.platform_id, agent_id: r.agent_id, model_id: r.model_id, tokens_in: 0, tokens_out: 0, cost_estimate: 0 };
    byDate[key].tokens_in += r.input_tokens;
    byDate[key].tokens_out += r.output_tokens;
    const rate = COST_PER_1K_TOKENS[r.model_id] || 0;
    byDate[key].cost_estimate += ((r.input_tokens + r.output_tokens) / 1000) * rate;
  }
  return Object.values(byDate).sort((a, b) => b.date.localeCompare(a.date));
}

export function costs(filter) {
  return usage(filter).reduce((sum, u) => sum + u.cost_estimate, 0);
}
