import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM27Role } from "@/lib/m27/actor";
import {
  approvalIssues,
  isOwnerless,
  isRestoreTestDue,
  isReviewDue,
  restoreTestCycleMonths,
  riskLinkWarning,
} from "@/lib/m27/rules";
import {
  ASSET_STATUS_LABEL,
  ASSET_STATUS_TONE,
  ASSET_TYPE_LABEL,
  BACKUP_FREQUENCY_LABEL,
  CIA_LABEL,
  DATA_DOMAIN_LABEL,
  DISPOSAL_METHOD_LABEL,
  RULE_ACTION_LABEL,
} from "@/lib/m27/labels";
import { CLASSIFICATION_LABEL } from "@/lib/m34/labels";
import { AssetActionPanel } from "./AssetActionPanel";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border py-2 last:border-0 sm:flex-row sm:gap-4">
      <span className="w-64 shrink-0 text-xs font-medium text-ink-3">{label}</span>
      <span className="text-sm text-ink">{children}</span>
    </div>
  );
}

export default async function M27AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [asset, role, ruleVersion] = await Promise.all([
    prisma.m27InfoAsset.findUnique({
      where: { id },
      include: {
        owner: { select: { name: true } },
        custodian: { select: { name: true } },
        createdBy: { select: { name: true } },
        reviewedBy: { select: { name: true } },
        approvedBy: { select: { name: true } },
      },
    }),
    getM27Role(),
    prisma.m27RuleVersion.findFirst({ where: { status: "DA_PHE_DUYET" }, include: { rules: true } }),
  ]);
  if (!asset) notFound();

  // Tài sản mức Mật chỉ hiện với vai trò được phép (ETV.P27 §6.2).
  const canSeeSecret = role === "LDV" || role === "QLCL" || role === "ATTT";
  if (asset.classification === "MAT" && !canSeeSecret) {
    return (
      <div className="flex flex-col gap-4">
        <Link href="/modules/M27" className="text-xs text-accent hover:underline">
          ← Danh mục tài sản thông tin
        </Link>
        <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">
          Tài sản mức <strong>Mật</strong> chỉ được tiếp cận bởi danh sách cá nhân đích danh do LĐV phê duyệt
          (ETV.P27 §6.2).
        </p>
      </div>
    );
  }

  const audit = await prisma.m27AuditEntry.findMany({
    where: { itemType: "ASSET", itemId: id },
    orderBy: { ts: "desc" },
    include: { actor: { select: { name: true } } },
    take: 50,
  });

  const now = new Date();
  const forRules = { ...asset, ownerActive: Boolean(asset.owner) };
  const issues = approvalIssues(forRules);
  const riskWarn = riskLinkWarning(forRules);
  // Bộ quy tắc áp cho ĐÚNG mức phân loại hiện tại — đọc từ phiên bản đang hiệu lực, không hard-code.
  const applicable = (ruleVersion?.rules ?? []).filter((r) => r.classification === asset.classification);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M27 · Biểu mẫu ETV.P.F 27.01</p>
        <h1 className="font-head text-2xl font-bold text-ink">
          <span className="font-mono text-lg text-ink-2">{asset.code}</span> — {asset.name}
        </h1>
        <p className="mt-1 flex flex-wrap items-center gap-2 text-sm">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[ASSET_STATUS_TONE[asset.status]]}`}
          >
            {ASSET_STATUS_LABEL[asset.status]}
          </span>
          <span className="text-ink-2">
            Mức phân loại: <strong className="text-ink">{CLASSIFICATION_LABEL[asset.classification]}</strong>
          </span>
        </p>
      </div>

      <Link href="/modules/M27" className="text-xs text-accent hover:underline">
        ← Danh mục tài sản thông tin
      </Link>

      {/* Hộp quy tắc xử lý — ETV.P27 §6.3 yêu cầu hiển thị NGAY tại màn hình tài sản,
          "người dùng không phải tra cứu sổ tay riêng". */}
      <section className="rounded-xl border border-border bg-surface p-4">
        <h2 className="font-head text-lg font-semibold text-ink">
          Quy tắc xử lý áp dụng — mức {CLASSIFICATION_LABEL[asset.classification]}
        </h2>
        <p className="mt-1 text-xs text-ink-3">
          Theo bảng quy tắc phiên bản {ruleVersion?.version ?? "—"} đang hiệu lực (ETV.P.F 27.02).{" "}
          <Link href="/modules/M27/rules" className="text-accent hover:underline">
            Xem toàn bảng →
          </Link>
        </p>
        <ul className="mt-3 flex flex-col gap-1.5">
          {applicable.map((r) => (
            <li key={r.id} className="flex flex-wrap items-start gap-2 text-sm">
              <span className="w-52 shrink-0 text-xs font-medium text-ink-3">{RULE_ACTION_LABEL[r.action]}</span>
              {r.isProhibited && (
                <span className="inline-flex items-center rounded-full bg-crit-soft px-2 py-0.5 text-xs font-semibold text-crit">
                  CẤM
                </span>
              )}
              <span className={r.isProhibited ? "text-crit" : "text-ink-2"}>{r.requirement}</span>
            </li>
          ))}
          {applicable.length === 0 && <li className="text-sm text-ink-3">Chưa có bảng quy tắc đang hiệu lực.</li>}
        </ul>
      </section>

      {(issues.length > 0 || riskWarn) && (
        <section className="flex flex-col gap-2">
          {issues.length > 0 && (
            <div className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">
              <strong>Chưa đủ điều kiện phê duyệt</strong> (ETV.P27 Phụ lục I.1): {issues.join("; ")}.
            </div>
          )}
          {riskWarn && (
            <div className="rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-sm text-warn">{riskWarn}</div>
          )}
        </section>
      )}

      <section className="rounded-xl border border-border bg-surface p-4">
        <h2 className="mb-2 font-head text-lg font-semibold text-ink">Thuộc tính quản trị</h2>
        <Row label="Loại tài sản">{ASSET_TYPE_LABEL[asset.assetType]}</Row>
        <Row label="Nhóm dữ liệu nghiệp vụ">{DATA_DOMAIN_LABEL[asset.dataDomain]}</Row>
        <Row label="Mô tả nội dung">{asset.description}</Row>
        <Row label="Mức C–I–A">
          Bảo mật {CIA_LABEL[asset.ciaC]} · Toàn vẹn {CIA_LABEL[asset.ciaI]} · Sẵn sàng {CIA_LABEL[asset.ciaA]}
        </Row>
        <Row label="Chủ sở hữu (cá nhân)">
          {asset.owner?.name ?? "—"}
          {isOwnerless({ ownerActive: Boolean(asset.owner), status: asset.status }) && (
            <span className="ml-2 text-xs text-crit">Tài sản vô chủ</span>
          )}
        </Row>
        <Row label="Người quản lý kỹ thuật">{asset.custodian?.name ?? "—"}</Row>
        <Row label="Nơi lưu">{asset.storageLocation}</Row>
        <Row label="Hệ thống chứa (ETV.P33)">{asset.systemRefs.join(", ") || "—"}</Row>
        <Row label="Tài liệu / hồ sơ liên quan">
          {[asset.docRef && `Tài liệu: ${asset.docRef}`, asset.recordRef && `Hồ sơ: ${asset.recordRef}`]
            .filter(Boolean)
            .join(" · ") || "—"}
        </Row>
        <Row label="Chứa dữ liệu cá nhân">
          {asset.containsPersonalData ? "Có" : "Không"}
          {asset.containsPersonalData && asset.personalDataScope && (
            <span className="block text-xs text-ink-3">{asset.personalDataScope}</span>
          )}
        </Row>
        {asset.containsPersonalData && (
          <Row label="Căn cứ và mục đích xử lý">{asset.legalBasis ?? "— (thiếu, xem cảnh báo trên)"}</Row>
        )}
        <Row label="Thời hạn lưu">
          {asset.retentionPeriod}
          <span className="block text-xs text-ink-3">Căn cứ: {asset.retentionBasis}</span>
        </Row>
        <Row label="Phương pháp huỷ dự kiến">{DISPOSAL_METHOD_LABEL[asset.disposalMethod]}</Row>
        <Row label="Sao lưu">
          {asset.backupRequired
            ? `Có · ${asset.backupFrequency ? BACKUP_FREQUENCY_LABEL[asset.backupFrequency] : "chưa nêu tần suất"}`
            : "Không thuộc diện phải sao lưu"}
        </Row>
        {asset.backupRequired && (
          <Row label="Kiểm chứng phục hồi gần nhất">
            {asset.lastRestoreTestAt?.toLocaleDateString("vi-VN") ?? "Chưa từng kiểm chứng"}
            <span className="block text-xs text-ink-3">
              Chu kỳ {restoreTestCycleMonths(asset)} tháng (ETV.P27 §6.5.2, bằng chứng F31.03)
              {isRestoreTestDue({ ...asset, status: asset.status }, now) && (
                <strong className="ml-1 text-crit">— QUÁ HẠN</strong>
              )}
            </span>
          </Row>
        )}
        <Row label="Chia sẻ ra ngoài Viện">
          {asset.externalSharingAllowed ? "Được phép" : "Không được phép"}
          <span className="block text-xs text-ink-3">
            Luồng phê duyệt từng lần theo ETV.P34 §6.5 (F34.03), kèm phê duyệt công bố ETV.P02 nếu là dữ liệu
            khách hàng hoặc dữ liệu cá nhân.
          </span>
        </Row>
        <Row label="Dùng làm nguồn cho hệ thống AI">
          {asset.aiUseAllowed ? "Được phép" : "Không"}
          <span className="block text-xs text-ink-3">
            Dữ liệu mức Hạn chế và Mật không bao giờ được đưa vào chỉ mục AI (ETV.P27 §6.9.2).
          </span>
        </Row>
        <Row label="Rủi ro liên quan (ETV.P28 / ETV.P01)">{asset.riskRefs.join(", ") || "—"}</Row>
        <Row label="Rà soát định kỳ">
          Chu kỳ {asset.reviewCycleMonths} tháng · lần gần nhất{" "}
          {asset.lastReviewedAt?.toLocaleDateString("vi-VN") ?? "chưa rà soát"}
          {isReviewDue({ ...asset, status: asset.status }, now) && (
            <strong className="ml-1 text-warn">— đến hạn rà soát</strong>
          )}
        </Row>
        <Row label="Vết phê duyệt">
          Lập: {asset.createdBy?.name ?? "—"} · Soát xét: {asset.reviewedBy?.name ?? "—"} · Phê duyệt:{" "}
          {asset.approvedBy?.name ?? "—"}
          {asset.reason && <span className="block text-xs text-crit">Lý do gần nhất: {asset.reason}</span>}
        </Row>
      </section>

      <AssetActionPanel
        id={asset.id}
        status={asset.status}
        role={role}
        backupRequired={asset.backupRequired}
        aiUseAllowed={asset.aiUseAllowed}
      />

      <section>
        <h2 className="font-head text-lg font-semibold text-ink">Nhật ký thao tác</h2>
        <p className="mt-1 text-xs text-ink-3">
          Append-only — ghi ai, khi nào, hành động gì, lý do (ETV.P27 §5.3; lưu hồ sơ theo ETV.P15).
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <tbody>
              {audit.map((e) => (
                <tr key={e.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 text-xs whitespace-nowrap text-ink-3">
                    {e.ts.toLocaleString("vi-VN")}
                  </td>
                  <td className="px-3 py-2 text-xs whitespace-nowrap text-ink-2">
                    {e.actor?.name ?? "—"} ({e.role})
                  </td>
                  <td className="px-3 py-2 text-ink">{e.action}</td>
                  <td className="px-3 py-2 text-xs text-ink-2">{e.reason ?? ""}</td>
                </tr>
              ))}
              {audit.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center text-sm text-ink-3">
                    Chưa có thao tác nào được ghi nhận.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
