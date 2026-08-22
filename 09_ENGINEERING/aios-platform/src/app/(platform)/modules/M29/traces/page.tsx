import { prisma } from "@/lib/prisma";

export default async function M29TracesPage() {
  const requests = await prisma.aIRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { agent: true, model: true, toolCalls: { include: { tool: true } } },
  });

  return (
    <div className="flex max-w-5xl flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M29 · Trace</p>
        <h1 className="font-head text-2xl font-bold text-ink">Nhật ký gọi AI (Trace)</h1>
        <p className="mt-1 text-sm text-ink-2">Mỗi lượt gọi qua Tool Gateway sinh 1 Trace: Agent → Tool → Platform → kết quả → token/latency.</p>
      </div>

      <div className="flex flex-col gap-2">
        {requests.map((r) => (
          <div key={r.id} className="rounded-xl border border-border bg-surface p-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs text-ink-3">{r.id}</span>
              <span className="text-xs text-ink-3">{r.createdAt.toLocaleString("vi-VN")}</span>
            </div>
            <p className="mt-1 text-ink">
              {r.agent?.name ?? "—"} · {r.model?.displayName ?? "—"} · {r.inputTokens + r.outputTokens} token · {r.latencyMs}ms
            </p>
            {r.toolCalls.map((tc) => (
              <p key={tc.id} className="mt-1 text-xs text-ink-2">
                → {tc.tool.name}:{" "}
                <span className={tc.status === "OK" ? "text-good" : "text-crit"}>{tc.status}</span>
                {tc.errorCode ? ` (${tc.errorCode})` : ""} · {tc.latencyMs}ms
              </p>
            ))}
          </div>
        ))}
        {requests.length === 0 && <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-ink-3">Chưa có Trace nào — gọi thử 1 Tool ở trang chi tiết Agent.</p>}
      </div>
    </div>
  );
}
