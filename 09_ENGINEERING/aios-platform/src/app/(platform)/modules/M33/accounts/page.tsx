import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { KICH_THUOC_TRANG, PhanTrang, boQua, chotTrang } from "@/components/PhanTrang";
import { getM33Role } from "@/lib/m33/actor";
import { ACCOUNT_STATUS_LABEL, ACCOUNT_STATUS_TONE, ACCOUNT_TYPE_LABEL } from "@/lib/m33/labels";
import { AccountActions, NewAccountForm } from "./AccountActions";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};
const th = "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function M33AccountsPage({ searchParams }: { searchParams: Promise<{ trang?: string }> }) {
  const { trang: trangRaw } = await searchParams;
  const now = new Date();
  // Hàng chờ thu hồi và số quá hạn đếm ở DB trên TOÀN BỘ danh mục — đây là con số điều hành theo
  // R16, đếm trên trang đang xem thì đổi theo trang.
  const [tong, pendingRevocation, overdueRevocation] = await Promise.all([
    prisma.m33SystemAccount.count(),
    prisma.m33SystemAccount.count({ where: { status: { not: "DA_THU_HOI" }, revocationDueAt: { not: null } } }),
    prisma.m33SystemAccount.count({ where: { status: { not: "DA_THU_HOI" }, revocationDueAt: { lt: now } } }),
  ]);
  const trang = chotTrang(trangRaw, tong);
  const [accounts, role, assets, users] = await Promise.all([
    prisma.m33SystemAccount.findMany({
      orderBy: { createdAt: "desc" },
      include: { holder: { select: { name: true } }, asset: { select: { id: true, code: true } } },
      skip: boQua(trang),
      take: KICH_THUOC_TRANG,
    }),
    getM33Role(),
    prisma.m33ITAsset.findMany({ where: { status: { in: ["OPERATING", "SUSPENDED", "RETIRED"] } }, select: { id: true, code: true, name: true }, orderBy: { code: "asc" } }),
    prisma.user.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, email: true } }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M33 · Danh mục tài khoản hệ thống — F33.03 (ETV.P33 §6.4)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Tài khoản hệ thống</h1>
        <p className="mt-1 text-sm text-ink-2">
          M33 giữ danh mục và <strong>thực thi</strong> theo phiếu F28.04 — phê duyệt quyền thuộc M28 (R6). Không lưu bí mật xác thực (R7).
          Hàng chờ thu hồi: <strong>{pendingRevocation}</strong>, quá hạn:{" "}
          <strong className={overdueRevocation > 0 ? "text-crit" : "text-ink"}>{overdueRevocation}</strong> (R16 — trong ngày làm việc).
        </p>
      </div>
      <div className="flex gap-3">
        <Link href="/modules/M33" className="text-xs text-accent hover:underline">
          ← Danh mục hạ tầng
        </Link>
        <Link href="/modules/M33/accounts/reconciliation" className="text-xs text-accent hover:underline">
          Kỳ đối chiếu tài khoản →
        </Link>
      </div>

      <NewAccountForm assets={assets} users={users} />

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[64rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tên đăng nhập</th>
              <th className={th}>Loại</th>
              <th className={th}>Trên</th>
              <th className={th}>Người giữ</th>
              <th className={th}>Phiếu F28.04</th>
              <th className={th}>MFA</th>
              <th className={th}>Nơi lưu bí mật</th>
              <th className={th}>Trạng thái</th>
              <th className={th}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-sunk">
                <td className="px-3 py-2 font-mono text-xs text-ink">{s.code}</td>
                <td className="px-3 py-2 text-ink">{s.loginName}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{ACCOUNT_TYPE_LABEL[s.accountType]}</td>
                <td className="px-3 py-2 text-xs text-ink-2">
                  {s.asset ? (
                    <Link href={`/modules/M33/asset/${s.asset.id}`} className="font-mono text-accent hover:underline">
                      {s.asset.code}
                    </Link>
                  ) : (
                    s.platformRef
                  )}
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">{s.holder?.name ?? s.holderNote ?? "—"}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{s.accessRequestRef}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{s.mfaEnabled ? "✓" : "—"}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{s.secretLocation}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[ACCOUNT_STATUS_TONE[s.status]]}`}>
                    {ACCOUNT_STATUS_LABEL[s.status]}
                  </span>
                  {s.revocationDueAt && s.status !== "DA_THU_HOI" && (
                    <span className={`ml-1 rounded-full px-2 py-0.5 text-xs font-medium ${s.revocationDueAt < now ? "bg-crit-soft text-crit" : "bg-warn-soft text-warn"}`}>
                      Chờ thu hồi {s.revocationDueAt.toLocaleDateString("vi-VN")}
                    </span>
                  )}
                </td>
                <td className="px-3 py-2">
                  <AccountActions id={s.id} status={s.status} role={role} />
                </td>
              </tr>
            ))}
            {accounts.length === 0 && (
              <tr>
                <td colSpan={10} className="px-3 py-6 text-center text-sm text-ink-3">
                  Chưa ghi nhận tài khoản nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PhanTrang path="/modules/M33/accounts" trang={trang} tong={tong} donVi="tài khoản" />
      </div>
    </div>
  );
}
