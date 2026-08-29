import Link from "next/link";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getM29Role } from "@/lib/m29/actor";
import { can } from "@/lib/m29/model";
import { StatCard } from "@/components/StatCard";
import { PhanTrang, chotTrang, locBtnCls, locFieldCls, locLabelCls } from "@/components/PhanTrang";
import { Badge, thCls } from "../ui";

const KICH_THUOC = 10;
const PATH = "/modules/M29/traces";
const NEO = "#nhat-ky";

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

/** Điều kiện lọc ở TẦNG DB, không lọc sau khi lấy: 10 dòng của một trang phải là 10 dòng của đúng nhóm đang xem. */
const WHERE: Record<Nhom, Prisma.AIRequestWhereInput> = {
  dat: { guardrailResult: "PASS" },
  loi: { guardrailResult: { startsWith: "ERROR:" } },
  chan: {
    AND: [{ guardrailResult: { not: "PASS" } }, { guardrailResult: { not: { startsWith: "ERROR:" } } }],
  },
};

/**
 * Đổi ngày `yyyy-mm-dd` của ô lọc thành mốc thời gian.
 *
 * Ô "đến ngày" lấy 00:00 của NGÀY KẾ TIẾP rồi so `lt`, không so `lte` với chính ngày đó —
 * `createdAt` là DateTime nên `lte` mốc 00:00 sẽ cắt mất toàn bộ lượt gọi trong ngày cuối, lỗi âm
 * thầm vì bảng vẫn có dữ liệu, chỉ thiếu đúng một ngày.
 */
function mocNgay(raw: string | undefined, cuoiNgay = false): Date | undefined {
  if (!raw || !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return undefined;
  const d = new Date(`${raw}T00:00:00`);
  if (Number.isNaN(d.getTime())) return undefined;
  if (cuoiNgay) d.setDate(d.getDate() + 1);
  return d;
}

type Loc = { loc?: string; tu?: string; den?: string; tk?: string; nd?: string };

export default async function M29TracesPage({ searchParams }: { searchParams: Promise<Loc & { trang?: string }> }) {
  const role = await getM29Role();
  // Nhật ký gọi AI hiện nguyên văn mã lỗi, tên agent, khối lượng token và chi phí của từng lượt —
  // DacTa.md M29 mục 4 chỉ cấp cho AI_OPERATOR (vận hành), AI_AUDITOR và SUPER_ADMIN. Chốt nằm ở
  // ĐÂY chứ không chỉ ở chỗ ẩn link: URL trang này đoán được và không có API nào chặn thay.
  if (!can(role, "traces")) {
    return <div className="rounded-xl border border-crit/30 bg-crit-soft p-4 text-sm text-crit">Bạn không có quyền xem nhật ký gọi AI.</div>;
  }

  const { loc, tu = "", den = "", tk = "", nd = "", trang: trangRaw } = await searchParams;
  const filter: Nhom | null = loc === "dat" || loc === "chan" || loc === "loi" ? loc : null;
  const tuMoc = mocNgay(tu);
  const denMoc = mocNgay(den, true);
  const timKiem = nd.trim();

  // Bộ lọc của thanh lọc (ngày/tài khoản/nội dung) tách khỏi bộ lọc nhóm kết quả: thẻ chỉ số đếm
  // TRONG phạm vi thanh lọc nhưng KHÔNG chịu ảnh hưởng của nhóm đang xem — nếu không, bấm "Bị chặn"
  // xong ba thẻ kia về 0 và thẻ chỉ số hết tác dụng chuyển nhóm.
  const locChung: Prisma.AIRequestWhereInput = {
    ...(tuMoc || denMoc ? { createdAt: { ...(tuMoc ? { gte: tuMoc } : {}), ...(denMoc ? { lt: denMoc } : {}) } } : {}),
    ...(tk ? { userRef: tk } : {}),
    ...(timKiem
      ? {
          OR: [
            { id: { contains: timKiem, mode: "insensitive" } },
            { guardrailResult: { contains: timKiem, mode: "insensitive" } },
            { agent: { name: { contains: timKiem, mode: "insensitive" } } },
            { model: { displayName: { contains: timKiem, mode: "insensitive" } } },
            { toolCalls: { some: { tool: { name: { contains: timKiem, mode: "insensitive" } } } } },
          ],
        }
      : {}),
  };
  const where: Prisma.AIRequestWhereInput = filter ? { AND: [locChung, WHERE[filter]] } : locChung;

  // Ô chọn tài khoản dựng từ chính nhật ký (GROUP BY ở DB, không tải cả bảng về rồi lọc trùng),
  // nên chỉ hiện những người thực sự đã gọi AI — chọn ra bảng rỗng là không thể xảy ra.
  const [tong, tongHop, nhomUser] = await Promise.all([
    prisma.aIRequest.count({ where }),
    // Đếm trên TOÀN BỘ nhật ký trong phạm vi thanh lọc, không phải trên 10 dòng đang hiện — thẻ chỉ
    // số mà chỉ đếm phần đang xem thì con số đổi theo từng trang và mất hết ý nghĩa theo dõi.
    prisma.aIRequest.groupBy({ by: ["guardrailResult"], where: locChung, _count: { _all: true } }),
    prisma.aIRequest.groupBy({ by: ["userRef"], _count: { _all: true } }),
  ]);

  const users = await prisma.user.findMany({
    where: { id: { in: nhomUser.map((g) => g.userRef) } },
    select: { id: true, name: true, email: true },
  });
  const tenUser = new Map(users.map((u) => [u.id, u.name || u.email]));
  const dsTaiKhoan = nhomUser
    .map((g) => [g.userRef, tenUser.get(g.userRef) || g.userRef] as const)
    .sort((a, b) => a[1].localeCompare(b[1], "vi"));

  const dem: Record<Nhom, number> = { dat: 0, chan: 0, loi: 0 };
  tongHop.forEach((row) => {
    dem[phanLoai(row.guardrailResult).nhom] += row._count._all;
  });
  const tongNhom = dem.dat + dem.chan + dem.loi;

  const trang = chotTrang(trangRaw, tong, KICH_THUOC);
  const requests = await prisma.aIRequest.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (trang - 1) * KICH_THUOC,
    take: KICH_THUOC,
    include: { agent: true, model: true, toolCalls: { include: { tool: true } } },
  });

  const query: Loc = {
    loc: filter ?? undefined,
    tu: tu || undefined,
    den: den || undefined,
    tk: tk || undefined,
    nd: timKiem || undefined,
  };
  const dangLoc = Boolean(query.tu || query.den || query.tk || query.nd);
  // "Bỏ lọc" xoá thanh lọc nhưng GIỮ nhóm kết quả đang xem — hai bộ lọc độc lập nhau, gộp lại thì
  // người đang soi nhóm "Bị chặn" bấm bỏ lọc ngày sẽ bị văng về toàn bộ nhật ký.
  const hrefBoLoc = `${PATH}${filter ? `?loc=${filter}` : ""}${NEO}`;
  // Link của thẻ chỉ số giữ nguyên thanh lọc và chỉ đổi nhóm — bỏ trang hiện tại để luôn về trang 1
  // của nhóm mới; giữ `trang` ở đây sẽ nhảy vào trang 7 của một tập chỉ có 2 trang.
  const hrefNhom = (n: Nhom | null) => {
    const sp = new URLSearchParams();
    Object.entries({ ...query, loc: n ?? undefined }).forEach(([k, v]) => {
      if (v) sp.set(k, v);
    });
    const qs = sp.toString();
    return `${PATH}${qs ? `?${qs}` : ""}${NEO}`;
  };

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
        <StatCard label="Tổng lượt gọi" value={tongNhom.toLocaleString("vi-VN")} href={hrefNhom(null)} linkLabel="Xem tất cả" />
        <StatCard label="Đạt" value={dem.dat.toLocaleString("vi-VN")} tone="good" href={hrefNhom("dat")} linkLabel="Chỉ xem nhóm này" />
        <StatCard label="Bị chặn" value={dem.chan.toLocaleString("vi-VN")} tone={dem.chan > 0 ? "warn" : "ink"} href={hrefNhom("chan")} linkLabel="Chỉ xem nhóm này" />
        <StatCard label="Lỗi gọi mô hình" value={dem.loi.toLocaleString("vi-VN")} tone={dem.loi > 0 ? "crit" : "ink"} href={hrefNhom("loi")} linkLabel="Chỉ xem nhóm này" />
      </div>

      <section id="nhat-ky" className="flex scroll-mt-24 flex-col gap-3">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-head text-sm font-bold text-ink">
              {filter ? `Lượt gọi — ${NHOM_LABEL[filter]}` : "Lượt gọi gần nhất"}
            </h2>
            <p className="text-xs text-ink-3">Mỗi trang {KICH_THUOC} lượt, mới nhất lên đầu. Chi phí là ước tính theo đơn giá chụp tại thời điểm gọi.</p>
          </div>
          {filter && (
            <Link href={hrefNhom(null)} className="text-xs font-medium text-accent hover:underline">
              Bỏ lọc nhóm
            </Link>
          )}
        </div>

        <form
          aria-label="Bộ lọc nhật ký gọi AI"
          className="grid gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-[10rem_10rem_minmax(12rem,1fr)_minmax(12rem,1fr)_auto]"
        >
          {/* Nhóm kết quả đang xem không phải ô nhập nên phải gửi kèm, nếu không bấm Lọc sẽ lặng lẽ bỏ nhóm. */}
          {filter && <input type="hidden" name="loc" value={filter} />}
          <label className={locLabelCls}>
            Từ ngày
            <input type="date" name="tu" defaultValue={tu} className={locFieldCls} />
          </label>
          <label className={locLabelCls}>
            Đến ngày
            <input type="date" name="den" defaultValue={den} className={locFieldCls} />
          </label>
          <label className={locLabelCls}>
            Tài khoản
            <select name="tk" defaultValue={tk} className={locFieldCls}>
              <option value="">Tất cả tài khoản</option>
              {dsTaiKhoan.map(([id, ten]) => (
                <option key={id} value={id}>
                  {ten}
                </option>
              ))}
            </select>
          </label>
          <label className={locLabelCls}>
            Nội dung
            <input name="nd" defaultValue={nd} placeholder="Agent, model, công cụ, mã trace" className={locFieldCls} />
          </label>
          <div className="flex items-end gap-2">
            <button className={locBtnCls}>Lọc</button>
            {dangLoc && (
              <Link href={hrefBoLoc} className="pb-2 text-xs font-medium text-accent hover:underline">
                Bỏ lọc
              </Link>
            )}
          </div>
        </form>

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
                    {filter || dangLoc
                      ? "Không có lượt gọi nào khớp bộ lọc."
                      : "Chưa có Trace nào — gọi thử 1 Tool ở trang chi tiết Agent."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <PhanTrang path={PATH} query={query} neo={NEO} trang={trang} tong={tong} kichThuoc={KICH_THUOC} donVi="lượt gọi" />
        </div>
      </section>

      <div className="flex flex-wrap gap-4 text-sm">
        <Link href="/modules/M29" className="text-accent hover:underline">← Tổng quan M29</Link>
        {can(role, "usage") && <Link href="/modules/M29/usage" className="text-accent hover:underline">Tổng hợp token & chi phí →</Link>}
      </div>
    </div>
  );
}
