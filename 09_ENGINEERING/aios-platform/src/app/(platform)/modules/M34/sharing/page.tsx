import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { KICH_THUOC_TRANG, PhanTrang, boQua, chotTrang } from "@/components/PhanTrang";
import { SHARING_STATUS_LABEL, SHARING_STATUS_TONE, SHARING_TYPE_LABEL } from "@/lib/m34/labels";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};
const th = "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function M34SharingPage({ searchParams }: { searchParams: Promise<{ trang?: string }> }) {
  const { trang: trangRaw } = await searchParams;
  const now = new Date();
  const [tong, overdue] = await Promise.all([
    prisma.m34SharingRequest.count(),
    prisma.m34SharingRequest.count({ where: { status: "DA_THUC_HIEN", revokeDue: { lt: now } } }),
  ]);
  const trang = chotTrang(trangRaw, tong);
  const sharings = await prisma.m34SharingRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { dataSet: { select: { id: true, code: true } }, requester: { select: { name: true } }, approvedBy: { select: { name: true } } },
    skip: boQua(trang),
    take: KICH_THUOC_TRANG,
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M34 · Khai thác, chia sẻ dữ liệu — F34.03 (ETV.P34 §6.5)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Phiếu khai thác, chia sẻ</h1>
        <p className="mt-1 text-sm text-ink-2">
          Nội bộ vượt quyền — CSHDL duyệt · Ra ngoài Viện — LĐV duyệt, PT.ATTT bắt buộc (R18). Quá hạn chưa thu hồi:{" "}
          <strong className={overdue > 0 ? "text-crit" : "text-ink"}>{overdue}</strong>.
        </p>
      </div>
      <Link href="/modules/M34" className="text-xs text-accent hover:underline">
        ← Danh mục dữ liệu số
      </Link>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[56rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Loại</th>
              <th className={th}>Tập dữ liệu</th>
              <th className={th}>Bên nhận</th>
              <th className={th}>Kênh</th>
              <th className={th}>Hạn sử dụng</th>
              <th className={th}>Phê duyệt</th>
              <th className={th}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {sharings.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-sunk">
                <td className="px-3 py-2 font-mono text-xs text-ink">{s.code}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{SHARING_TYPE_LABEL[s.requestType]}</td>
                <td className="px-3 py-2">
                  <Link href={`/modules/M34/dataset/${s.dataSet.id}`} className="font-mono text-xs text-accent hover:underline">
                    {s.dataSet.code}
                  </Link>
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">{s.recipient ?? "nội bộ"}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{s.channel}</td>
                <td className="px-3 py-2 text-xs text-ink-2">
                  {s.revokeDue ? s.revokeDue.toLocaleDateString("vi-VN") : "—"}
                  {s.status === "DA_THUC_HIEN" && s.revokeDue && s.revokeDue < now && (
                    <span className="ml-1 rounded-full bg-crit-soft px-2 py-0.5 text-xs font-medium text-crit">Quá hạn thu hồi</span>
                  )}
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">{s.approvedBy?.name ?? "—"}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[SHARING_STATUS_TONE[s.status]]}`}>
                    {SHARING_STATUS_LABEL[s.status]}
                  </span>
                </td>
              </tr>
            ))}
            {sharings.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-sm text-ink-3">
                  Chưa có phiếu nào — lập phiếu từ trang chi tiết tập dữ liệu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PhanTrang path="/modules/M34/sharing" trang={trang} tong={tong} donVi="phiếu" />
      </div>
    </div>
  );
}
