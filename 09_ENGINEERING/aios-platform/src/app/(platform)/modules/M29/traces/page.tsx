import Link from "next/link";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getM29Role } from "@/lib/m29/actor";
import { can } from "@/lib/m29/model";
import { StatCard } from "@/components/StatCard";
import { Badge, thCls } from "../ui";

const TAKE = 100;

const money = (value: number, currency = "USD") =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
    minimumFractionDigits: value > 0 && value < 0.01 ? 6 : 2,
    maximumFractionDigits: value > 0 && value < 0.01 ? 6 : 2,
  }).format(value);

type Nhom = "dat" | "chan" | "loi";

const NHOM_LABEL: Record<Nhom, string> = {
  dat: "Đạt",
  chan: "Bị chặn",
  loi: "Lỗi gọi mô hình",
};

/**
 * Đọc cột guardrailResult thành nhãn cho người xem.
 *
 * Cột này giữ BỐN dạng chuỗi khác nhau, sinh ra ở ba chỗ trong `chatTurn()` (lib/m29/gateway.ts):
 * "PASS", "BLOCK:<mã guardrail>", "ERROR:<mã lỗi>", và mã trần không tiền tố khi lượt gọi bị từ
 * chối TRƯỚC lúc gọi mô hình (AIA_NOT_APPROVED, QUOTA_EXCEEDED, PROMPT_NOT_APPROVED…) — nhánh
 * `refuse()` mặc định lấy luôn mã lỗi làm guardrailResult. Dạng thứ tư dễ bị bỏ sót nhất, nên
 * nhánh cuối ở đây là nhánh nhận-tất-cả chứ không phải "neutral/không rõ": chặn là chặn, dù chặn
 * vì guardrail hay vì hồ sơ quản trị chưa đủ.
 */
function phanLoai(guardrailResult: string): { nhom: Nhom; nhan: string; tone: string; ma: string } {
  if (guardrailResult === "PASS") return { nhom: "dat", nhan: "Đạt", tone: "good", ma: "" };
  if (guardrailResult.startsWith("ERROR:"))
    return { nhom: "loi", nhan: "Lỗi gọi mô hình", tone: "crit", ma: guardrailResult.slice("ERROR:".length) };
  if (guardrailResult.startsWith("BLOCK:"))
    return { nhom: "chan", nhan: "Guardrail chặn", tone: "warn", ma: guardrailResult.slice("BLOCK:".length) };
  return { nhom: "chan", nhan: "Chặn theo cấu hình", tone: "warn", ma: guardrailResult };
}

/** Điều kiện lọc ở TẦNG DB, không lọc sau khi lấy: `take` 100 phải là 100 dòng của đúng nhóm đang xem. */
const WHERE: Record<Nhom, Prisma.AIRequestWhereInput> = {
  dat: { guardrailResult: "PASS" },
  loi: { guardrailResult: { startsWith: "ERROR:" } },
  chan: {
    AND: [{ guardrailResult: { not: "PASS" } }, { guardrailResult: { not: { startsWith: "ERROR:" } } }],
  },
};

export default async function M29TracesPage({ searchParams }: { searchParams: Promise<{ loc?: string }> }) {
  const role = await getM29Role();
  // Nhật ký gọi AI hiện nguyên văn mã lỗi, tên agent, khối lượng token và chi phí của từng lượt —
  // DacTa.md M29 mục 4 chỉ cấp cho AI_OPERATOR (vận hành), AI_AUDITOR và SUPER_ADMIN. Chốt nằm ở
  // ĐÂY chứ không chỉ ở chỗ ẩn link: URL trang này đoán được và không có API nào chặn thay.
  if (!can(role, "traces")) {
    return <div className="rounded-xl border border-crit/30 bg-crit-soft p-4 text-sm text-crit">Bạn không có quyền xem nhật ký gọi AI.</div>;
  }

  const { loc } = await searchParams;
  const filter: Nhom | null = loc === "dat" || loc === "chan" || loc === "loi" ? loc : null;

  const [requests, tongHop] = await Promise.all([
    prisma.aIRequest.findMany({
      where: filter ? WHERE[filter] : undefined,
      orderBy: { createdAt: "desc" },
      take: TAKE,
      include: { agent: true, model: true, toolCalls: { include: { tool: true } } },
    }),
    // Đếm trên TOÀN BỘ nhật ký, không phải trên 100 dòng đang hiện — thẻ chỉ số mà chỉ đếm phần
    // đang xem thì con số đổi theo bộ lọc và mất hết ý nghĩa theo dõi.
    prisma.aIRequest.groupBy({ by: ["guardrailResult"], _count: { _all: true } }),
  ]);

  const dem: Record<Nhom, number> = { dat: 0, chan: 0, loi: 0 };
  tongHop.forEach((row) => {
    dem[phanLoai(row.guardrailResult).nhom] += row._count._all;
  });
  const tong = dem.dat + dem.chan + dem.loi;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M29 · Trace</p>
        <h1 className="font-head text-2xl font-bold text-ink">Nhật ký gọi AI (Trace)</h1>
        <p className="mt-1 max-w-3xl text-sm text-ink-2">
          Mỗi lượt gọi qua Tool Gateway sinh 1 Trace: Agent → Tool → Platform → kết quả → token/latency. Bấm vào thẻ
          chỉ số để lọc theo kết quả.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Tổng lượt gọi" value={tong.toLocaleString("vi-VN")} href="/modules/M29/traces#nhat-ky" linkLabel="Xem tất cả" />
        <StatCard label="Đạt" value={dem.dat.toLocaleString("vi-VN")} tone="good" href="/modules/M29/traces?loc=dat#nhat-ky" linkLabel="Chỉ xem nhóm này" />
        <StatCard label="Bị chặn" value={dem.chan.toLocaleString("vi-VN")} tone={dem.chan > 0 ? "warn" : "ink"} href="/modules/M29/traces?loc=chan#nhat-ky" linkLabel="Chỉ xem nhóm này" />
        <StatCard label="Lỗi gọi mô hình" value={dem.loi.toLocaleString("vi-VN")} tone={dem.loi > 0 ? "crit" : "ink"} href="/modules/M29/traces?loc=loi#nhat-ky" linkLabel="Chỉ xem nhóm này" />
      </div>

      <section id="nhat-ky" className="flex scroll-mt-24 flex-col gap-2">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-head text-sm font-bold text-ink">
              {filter ? `Lượt gọi — ${NHOM_LABEL[filter]}` : "Lượt gọi gần nhất"}
            </h2>
            <p className="text-xs text-ink-3">Hiển thị tối đa {TAKE} lượt mới nhất, mới nhất lên đầu. Chi phí là ước tính theo đơn giá chụp tại thời điểm gọi.</p>
          </div>
          {filter && (
            <Link href="/modules/M29/traces#nhat-ky" className="text-xs font-medium text-accent hover:underline">
              Bỏ lọc
            </Link>
          )}
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[54rem] text-sm">
            <thead>
              <tr>
                <th className={thCls}>Thời điểm</th>
                <th className={`${thCls} whitespace-nowrap`}>Agent · Model</th>
                <th className={thCls}>Kết quả</th>
                <th className={`${thCls} whitespace-nowrap text-right`}>Token vào</th>
                <th className={`${thCls} whitespace-nowrap text-right`}>Token ra</th>
                <th className={`${thCls} text-right`}>Latency</th>
                <th className={`${thCls} text-right`}>Chi phí</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => {
                const kq = phanLoai(r.guardrailResult);
                return (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-sunk">
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span className="block tabular-nums text-ink">{r.createdAt.toLocaleString("vi-VN")}</span>
                      <span className="block font-mono text-xs text-ink-3">{r.id}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="block text-ink">{r.agent?.name ?? "—"}</span>
                      <span className="block text-xs text-ink-3">{r.model?.displayName ?? "—"}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <Badge label={kq.nhan} tone={kq.tone} />
                      {kq.ma && <span className="mt-1 block font-mono text-xs text-ink-3">{kq.ma}</span>}
                      {r.toolCalls.map((tc) => (
                        <span key={tc.id} className="mt-1 block text-xs whitespace-nowrap text-ink-2">
                          → {tc.tool.name} · <span className={tc.status === "OK" ? "text-good" : "text-crit"}>{tc.status}</span>
                          {tc.errorCode ? ` (${tc.errorCode})` : ""} · {tc.latencyMs} ms
                        </span>
                      ))}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums whitespace-nowrap text-ink">{r.inputTokens.toLocaleString("vi-VN")}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums whitespace-nowrap text-ink">{r.outputTokens.toLocaleString("vi-VN")}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums whitespace-nowrap text-ink">{r.latencyMs.toLocaleString("vi-VN")} ms</td>
                    <td className="px-3 py-2.5 text-right tabular-nums whitespace-nowrap text-ink-2">{money(r.estimatedCost, r.costCurrency)}</td>
                  </tr>
                );
              })}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-ink-3">
                    {filter
                      ? "Không có lượt gọi nào thuộc nhóm này."
                      : "Chưa có Trace nào — gọi thử 1 Tool ở trang chi tiết Agent."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex flex-wrap gap-4 text-sm">
        <Link href="/modules/M29" className="text-accent hover:underline">← Tổng quan M29</Link>
        {can(role, "usage") && <Link href="/modules/M29/usage" className="text-accent hover:underline">Tổng hợp token & chi phí →</Link>}
      </div>
    </div>
  );
}
