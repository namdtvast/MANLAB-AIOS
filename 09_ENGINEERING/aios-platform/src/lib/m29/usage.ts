// M29 — Token/Cost: tổng hợp trực tiếp từ AIRequest. Mỗi request giữ snapshot giá và chi phí tại
// thời điểm gọi, vì thay đổi bảng giá Model không được làm thay đổi báo cáo lịch sử.
import { prisma } from "@/lib/prisma";
import { calculateCost } from "./cost";

const DATE_KEY_VI = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Ho_Chi_Minh",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export interface UsageRow {
  date: string;
  platformId: string | null;
  agentId: string | null;
  modelId: string | null;
  agentName: string;
  modelName: string;
  tokensIn: number;
  tokensOut: number;
  requestCount: number;
  costEstimate: number;
  currency: string;
}

export async function usage(filter: { platformId?: string; agentId?: string; modelId?: string; from?: Date; to?: Date } = {}): Promise<UsageRow[]> {
  const requests = await prisma.aIRequest.findMany({
    where: {
      platformId: filter.platformId,
      agentId: filter.agentId,
      modelId: filter.modelId,
      createdAt: filter.from || filter.to ? { gte: filter.from, lt: filter.to } : undefined,
    },
    include: { model: true, agent: true },
  });

  const byKey = new Map<string, UsageRow>();
  for (const r of requests) {
    const date = DATE_KEY_VI.format(r.createdAt);
    const key = `${date}|${r.platformId}|${r.agentId}|${r.modelId}`;
    let row = byKey.get(key);
    if (!row) {
      row = {
        date,
        platformId: r.platformId,
        agentId: r.agentId,
        modelId: r.modelId,
        agentName: r.agent?.name ?? "Chưa xác định",
        modelName: r.model?.displayName ?? "Chưa xác định",
        tokensIn: 0,
        tokensOut: 0,
        requestCount: 0,
        costEstimate: 0,
        currency: r.costCurrency || r.model?.currency || "USD",
      };
      byKey.set(key, row);
    }
    row.tokensIn += r.inputTokens;
    row.tokensOut += r.outputTokens;
    row.requestCount += 1;
    // Request cũ chưa có snapshot thì tính theo bảng giá hiện tại như phương án chuyển tiếp.
    row.costEstimate += r.estimatedCost > 0
      ? r.estimatedCost
      : calculateCost(r.inputTokens, r.outputTokens, r.model).estimatedCost;
  }
  return Array.from(byKey.values()).sort((a, b) => b.date.localeCompare(a.date));
}

export function currentMonthRange(now = new Date()) {
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return { from, to };
}

export async function totalCost(filter: Parameters<typeof usage>[0] = {}): Promise<number> {
  const rows = await usage(filter);
  return rows.reduce((sum, u) => sum + u.costEstimate, 0);
}
