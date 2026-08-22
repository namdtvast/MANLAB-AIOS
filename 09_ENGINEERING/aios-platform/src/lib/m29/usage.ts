// M29 — Token/Cost: tổng hợp trực tiếp từ AIRequest, không lưu trùng bảng riêng (đúng nguyên
// tắc bản gốc 08_Source/api/usage.mjs — "hợp lý ở quy mô... để tránh lệch dữ liệu").
// Khác 1 điểm so với bản gốc: costPer1kTokens đọc từ AIModel.costPer1kTokens (cột DB) thay vì
// hằng số COST_PER_1K_TOKENS hardcode trong code — cùng giá trị demo (0.0003 cho Gemini Flash),
// chỉ chuyển chỗ lưu để không phải sửa code khi thêm model mới.
import { prisma } from "@/lib/prisma";

export interface UsageRow {
  date: string;
  platformId: string | null;
  agentId: string | null;
  modelId: string | null;
  tokensIn: number;
  tokensOut: number;
  costEstimate: number;
}

export async function usage(filter: { platformId?: string; agentId?: string; modelId?: string } = {}): Promise<UsageRow[]> {
  const requests = await prisma.aIRequest.findMany({
    where: {
      platformId: filter.platformId,
      agentId: filter.agentId,
      modelId: filter.modelId,
    },
    include: { model: true },
  });

  const byKey = new Map<string, UsageRow>();
  for (const r of requests) {
    const date = r.createdAt.toISOString().slice(0, 10);
    const key = `${date}|${r.platformId}|${r.agentId}|${r.modelId}`;
    let row = byKey.get(key);
    if (!row) {
      row = { date, platformId: r.platformId, agentId: r.agentId, modelId: r.modelId, tokensIn: 0, tokensOut: 0, costEstimate: 0 };
      byKey.set(key, row);
    }
    row.tokensIn += r.inputTokens;
    row.tokensOut += r.outputTokens;
    const rate = r.model?.costPer1kTokens ?? 0;
    row.costEstimate += ((r.inputTokens + r.outputTokens) / 1000) * rate;
  }
  return Array.from(byKey.values()).sort((a, b) => b.date.localeCompare(a.date));
}

export async function totalCost(filter: Parameters<typeof usage>[0] = {}): Promise<number> {
  const rows = await usage(filter);
  return rows.reduce((sum, u) => sum + u.costEstimate, 0);
}
