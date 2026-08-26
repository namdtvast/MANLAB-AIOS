import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM27Role } from "@/lib/m27/actor";
import { isOwnerless, isRestoreTestDue, isReviewDue } from "@/lib/m27/rules";
import {
  ASSET_STATUS_LABEL,
  ASSET_STATUS_TONE,
  ASSET_TYPE_LABEL,
  CIA_LABEL,
  CIA_TONE,
  DATA_DOMAIN_LABEL,
  M27_ROLE_LABEL,
} from "@/lib/m27/labels";
import { CLASSIFICATION_LABEL, CLASSIFICATION_TONE } from "@/lib/m34/labels";
import { CanCuBanner } from "@/components/CanCuBanner";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

function Badge({ label, tone }: { label: string; tone: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full whitespace-nowrap px-2 py-0.5 text-xs font-medium ${TONE_CLASS[tone] ?? TONE_CLASS.neutral}`}
    >
      {label}
    </span>
  );
}

const th =
  "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function M27ListPage() {
  const [assets, role] = await Promise.all([
    prisma.m27InfoAsset.findMany({
      orderBy: { code: "asc" },
      include: { owner: { select: { name: true } }, custodian: { select: { name: true } } },
    }),
    getM27Role(),
  ]);
  const now = new Date();

  // Tài sản mức Mật chỉ hiện với vai trò được phép tiếp cận (ETV.P27 §6.2: "danh sách cá nhân đích
  // danh do LĐV phê duyệt"). Lọc NGAY ở tầng truy vấn/hiển thị — không hiện tên rồi mới chặn khi bấm.
  const canSeeSecret = role === "LDV" || role === "QLCL" || role === "ATTT";
  const visible = assets.filter((a) => canSeeSecret || a.classification !== "MAT");
  const hiddenCount = assets.length - visible.length;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium text-ink-3">M27 · MP27 · Quản trị dữ liệu và tài sản thông tin</p>
        <h1 className="font-head text-2xl font-bold text-ink">Danh mục tài sản thông tin</h1>
        <p className="mt-1 text-sm text-ink-2">
          Vai trò M27 của bạn:{" "}
          <strong className="text-ink">{role ? (M27_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}</strong>
        </p>
      </div>

      <CanCuBanner moduleCode="M27" />

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/modules/M27/asset/new"
          className="cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
        >
          Khai báo tài sản
        </Link>
        <Link href="/modules/M27/rules" className="text-xs text-accent hover:underline">
          Bảng quy tắc xử lý (F27.02) →
        </Link>
        <Link href="/modules/M27/due" className="text-xs text-accent hover:underline">
          Bảng đến hạn →
        </Link>
        <Link href="/modules/M27/personal-data" className="text-xs text-accent hover:underline">
          Tài sản có dữ liệu cá nhân →
        </Link>
      </div>

      {hiddenCount > 0 && (
        <p className="rounded-lg border border-border bg-sunk px-3 py-2 text-xs text-ink-2">
          {hiddenCount} tài sản mức <strong>Mật</strong> không hiển thị với vai trò hiện tại (ETV.P27 §6.2).
        </p>
      )}

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[72rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tên tài sản</th>
              <th className={th}>Nhóm dữ liệu</th>
              <th className={th}>Phân loại</th>
              <th className={th}>C–I–A</th>
              <th className={th}>Chủ sở hữu</th>
              <th className={th}>Trạng thái</th>
              <th className={th}>Cảnh báo</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((a) => {
              const flags: string[] = [];
              if (isReviewDue({ ...a, status: a.status }, now)) flags.push("Đến hạn rà soát");
              if (isRestoreTestDue({ ...a, status: a.status }, now)) flags.push("Quá hạn kiểm chứng phục hồi");
              if (isOwnerless({ ownerActive: Boolean(a.owner), status: a.status })) flags.push("Tài sản vô chủ");
              if (a.aiUseAllowed) flags.push("Cho phép dùng cho AI");
              return (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link
                      href={`/modules/M27/asset/${a.id}`}
                      className="font-mono text-xs text-accent hover:underline"
                    >
                      {a.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink">
                    {a.name}
                    <span className="block text-xs text-ink-3">{ASSET_TYPE_LABEL[a.assetType]}</span>
                  </td>
                  <td className="px-3 py-2 text-ink-2">{DATA_DOMAIN_LABEL[a.dataDomain]}</td>
                  <td className="px-3 py-2">
                    <Badge
                      label={CLASSIFICATION_LABEL[a.classification]}
                      tone={CLASSIFICATION_TONE[a.classification]}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <span className="flex gap-1">
                      {([a.ciaC, a.ciaI, a.ciaA] as const).map((c, i) => (
                        <Badge key={i} label={`${"CIA"[i]}:${CIA_LABEL[c]}`} tone={CIA_TONE[c]} />
                      ))}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-ink-2">{a.owner?.name ?? "—"}</td>
                  <td className="px-3 py-2">
                    <Badge label={ASSET_STATUS_LABEL[a.status]} tone={ASSET_STATUS_TONE[a.status]} />
                  </td>
                  <td className="px-3 py-2">
                    {flags.length === 0 ? (
                      <span className="text-xs text-ink-3">—</span>
                    ) : (
                      <span className="flex flex-wrap gap-1">
                        {flags.map((f) => (
                          <Badge key={f} label={f} tone={f === "Cho phép dùng cho AI" ? "neutral" : "warn"} />
                        ))}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
            {visible.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-sm text-ink-3">
                  Chưa có tài sản thông tin nào trong danh mục.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
