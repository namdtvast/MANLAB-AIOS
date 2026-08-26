import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { RECON_SCOPE_LABEL, RECON_STATUS_LABEL } from "@/lib/m33/labels";
import { ReconActions, ReconRowActions } from "./ReconActions";

export default async function M33ReconciliationPage() {
  const [recons, liveOrphanCandidates] = await Promise.all([
    prisma.m33AccountReconciliation.findMany({ orderBy: { createdAt: "desc" }, include: { performedBy: { select: { name: true } } } }),
    prisma.m33SystemAccount.findMany({
      where: { status: "TAM_KHOA" },
      select: { id: true, code: true, loginName: true },
    }),
  ]);
  const now = new Date();
  const [expiredLive, mfaLive] = await Promise.all([
    prisma.m33SystemAccount.count({ where: { status: "DANG_HOAT_DONG", validUntil: { lt: now } } }),
    prisma.m33SystemAccount.count({ where: { status: "DANG_HOAT_DONG", accountType: "DAC_QUYEN_QUAN_TRI", mfaEnabled: false } }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M33 · Kỳ đối chiếu tài khoản ↔ phiếu F28.04 — hồ sơ bất biến, lưu 05 năm (R20, ETV.P33 §6.4.2)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Kỳ đối chiếu tài khoản</h1>
        <p className="mt-1 text-sm text-ink-2">
          Đối chiếu tức thời: quá hạn hiệu lực <strong className={expiredLive > 0 ? "text-crit" : "text-ink"}>{expiredLive}</strong> · đặc quyền
          thiếu MFA <strong className={mfaLive > 0 ? "text-crit" : "text-ink"}>{mfaLive}</strong> · đang tạm khóa (bất thường):{" "}
          <strong>{liveOrphanCandidates.length}</strong>
        </p>
      </div>
      <Link href="/modules/M33/accounts" className="text-xs text-accent hover:underline">
        ← Tài khoản hệ thống
      </Link>

      <ReconActions />

      <div className="flex flex-col gap-3">
        {recons.map((r) => (
          <section key={r.id} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-ink">
                  <span className="font-mono text-xs">{r.code}</span> · Kỳ {r.period} · {RECON_SCOPE_LABEL[r.scope]}
                </p>
                <p className="text-xs text-ink-2">
                  Không phiếu: {r.orphanAccountIds.length} · Phiếu không tài khoản: {r.orphanRequestRefs.length} · Quá hạn hiệu lực:{" "}
                  {r.expiredAccountIds.length} · Đặc quyền thiếu MFA: {r.mfaMissingIds.length} · Thực hiện: {r.performedBy.name}
                  {r.reviewedById && " · PT.ATTT đã rà soát"}
                  {r.submittedToLdvAt && ` · Trình LĐV ${r.submittedToLdvAt.toLocaleDateString("vi-VN")}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${r.status === "DA_CHOT" ? "bg-good-soft text-good" : "bg-warn-soft text-warn"}`}>
                  {RECON_STATUS_LABEL[r.status]}
                </span>
                <ReconRowActions id={r.id} status={r.status} scope={r.scope} />
              </div>
            </div>
          </section>
        ))}
        {recons.length === 0 && <p className="text-sm text-ink-3">Chưa có kỳ đối chiếu nào.</p>}
      </div>
    </div>
  );
}
