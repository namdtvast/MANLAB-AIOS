import Link from "next/link";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getM29Role } from "@/lib/m29/actor";
import { can } from "@/lib/m29/model";
import { PhanTrang, chotTrang, locBtnCls, locFieldCls, locLabelCls, thCls } from "../ui";

const KICH_THUOC = 10;
const PATH = "/modules/M29/audit";
const NEO = "#nhat-ky";
/** Khoá của dòng do hệ thống ghi (actorId rỗng) trong ô chọn tài khoản. */
const HE_THONG = "SYSTEM";

/**
 * Đổi ngày `yyyy-mm-dd` của ô lọc thành mốc thời gian.
 *
 * Ô "đến ngày" lấy 00:00 của NGÀY KẾ TIẾP rồi so `lt`, không so `lte` với chính ngày đó — `at` là
 * DateTime nên `lte` mốc 00:00 sẽ cắt mất toàn bộ hoạt động trong ngày cuối, lỗi âm thầm vì bảng
 * vẫn có dữ liệu, chỉ thiếu đúng một ngày.
 */
function mocNgay(raw: string | undefined, cuoiNgay = false): Date | undefined {
  if (!raw || !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return undefined;
  const d = new Date(`${raw}T00:00:00`);
  if (Number.isNaN(d.getTime())) return undefined;
  if (cuoiNgay) d.setDate(d.getDate() + 1);
  return d;
}

type Loc = { tu?: string; den?: string; tk?: string; nd?: string };

export default async function M29AuditPage({ searchParams }: { searchParams: Promise<Loc & { trang?: string }> }) {
  const role = await getM29Role();
  // DacTa.md M29 mục 4, cột Audit: chỉ AI_AUDITOR và SUPER_ADMIN được đọc.
  if (!can(role, "audit")) {
    return <div className="rounded-xl border border-crit/30 bg-crit-soft p-4 text-sm text-crit">Bạn không có quyền xem nhật ký thay đổi cấu hình.</div>;
  }

  const { tu = "", den = "", tk = "", nd = "", trang: trangRaw } = await searchParams;
  const tuMoc = mocNgay(tu);
  const denMoc = mocNgay(den, true);
  const timKiem = nd.trim();

  // Lọc ở TẦNG DB, không lọc sau khi lấy: 10 dòng của một trang phải là 10 dòng của đúng tập đã lọc.
  const where: Prisma.AIAuditLogWhereInput = {
    ...(tuMoc || denMoc ? { at: { ...(tuMoc ? { gte: tuMoc } : {}), ...(denMoc ? { lt: denMoc } : {}) } } : {}),
    ...(tk ? (tk === HE_THONG ? { actorId: null } : { actorId: tk }) : {}),
    ...(timKiem
      ? {
          OR: [
            { entityType: { contains: timKiem, mode: "insensitive" } },
            { entityId: { contains: timKiem, mode: "insensitive" } },
            { field: { contains: timKiem, mode: "insensitive" } },
            { reason: { contains: timKiem, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  // Ô chọn tài khoản dựng từ chính nhật ký (GROUP BY ở DB, không tải cả bảng về rồi lọc trùng),
  // nên chỉ hiện những người thực sự đã có thao tác — chọn ra bảng rỗng là không thể xảy ra.
  const [tong, nhomActor] = await Promise.all([
    prisma.aIAuditLog.count({ where }),
    prisma.aIAuditLog.groupBy({ by: ["actorId", "actorLabel"], _count: { _all: true } }),
  ]);

  const users = await prisma.user.findMany({
    where: { id: { in: nhomActor.map((g) => g.actorId).filter((id): id is string => Boolean(id)) } },
    select: { id: true, name: true, email: true },
  });
  const tenUser = new Map(users.map((u) => [u.id, u.name ?? u.email]));
  const tuyChonTk = new Map<string, string>();
  nhomActor.forEach((g) => {
    const key = g.actorId ?? HE_THONG;
    if (!tuyChonTk.has(key)) tuyChonTk.set(key, g.actorId ? (tenUser.get(g.actorId) || g.actorLabel || g.actorId) : g.actorLabel || "Hệ thống");
  });
  const dsTaiKhoan = [...tuyChonTk.entries()].sort((a, b) => a[1].localeCompare(b[1], "vi"));

  const trang = chotTrang(trangRaw, tong, KICH_THUOC);
  const entries = await prisma.aIAuditLog.findMany({
    where,
    orderBy: { at: "desc" },
    skip: (trang - 1) * KICH_THUOC,
    take: KICH_THUOC,
    include: { actor: true },
  });

  const query: Loc = { tu: tu || undefined, den: den || undefined, tk: tk || undefined, nd: timKiem || undefined };
  const dangLoc = Boolean(query.tu || query.den || query.tk || query.nd);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M29 · Audit Log</p>
        <h1 className="font-head text-2xl font-bold text-ink">Nhật ký thay đổi cấu hình</h1>
        <p className="mt-1 max-w-3xl text-sm text-ink-2">Append-only — mọi tạo mới/cập nhật/chuyển trạng thái đều ghi lại ai, khi nào, nội dung.</p>
      </div>

      <form
        id="nhat-ky"
        aria-label="Bộ lọc nhật ký thay đổi cấu hình"
        className="grid scroll-mt-24 gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-[10rem_10rem_minmax(12rem,1fr)_minmax(12rem,1fr)_auto]"
      >
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
          <input name="nd" defaultValue={nd} placeholder="Đối tượng, trường hoặc lý do" className={locFieldCls} />
        </label>
        <div className="flex items-end gap-2">
          <button className={locBtnCls}>Lọc</button>
          {dangLoc && (
            <Link href={`${PATH}${NEO}`} className="pb-2 text-xs font-medium text-accent hover:underline">
              Bỏ lọc
            </Link>
          )}
        </div>
      </form>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[52rem] text-sm">
          <thead>
            <tr>
              <th className={thCls}>Thời điểm</th>
              <th className={thCls}>Tài khoản</th>
              <th className={thCls}>Đối tượng</th>
              <th className={thCls}>Trường</th>
              <th className={thCls}>Nội dung</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-b border-border last:border-0 hover:bg-sunk">
                <td className="px-3 py-2.5 whitespace-nowrap tabular-nums text-ink">{e.at.toLocaleString("vi-VN")}</td>
                <td className="px-3 py-2.5">
                  <span className="block text-ink">{e.actor?.name || e.actorLabel || "SYSTEM"}</span>
                  <span className="block font-mono text-xs text-ink-3">{e.role}</span>
                </td>
                <td className="px-3 py-2.5">
                  <span className="block text-ink">{e.entityType}</span>
                  <span className="block font-mono text-xs text-ink-3">{e.entityId}</span>
                </td>
                <td className="px-3 py-2.5 font-mono text-xs text-ink-2">{e.field ?? "—"}</td>
                <td className="px-3 py-2.5 text-ink-2">{e.reason ?? "—"}</td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-ink-3">
                  {dangLoc ? "Không có thay đổi nào khớp bộ lọc." : "Chưa có audit log nào."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PhanTrang path={PATH} query={query} neo={NEO} trang={trang} tong={tong} kichThuoc={KICH_THUOC} />
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <Link href="/modules/M29" className="text-accent hover:underline">← Tổng quan M29</Link>
      </div>
    </div>
  );
}
