import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM27Role } from "@/lib/m27/actor";
import {
  isDisposalCandidate,
  isOwnerless,
  isRestoreTestDue,
  isReviewDue,
  restoreTestCycleMonths,
  restoreTestOverdueCycles,
} from "@/lib/m27/rules";
import { CLASSIFICATION_LABEL } from "@/lib/m34/labels";

const th =
  "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

function Table({
  title,
  note,
  rows,
  empty,
}: {
  title: string;
  note: string;
  rows: { id: string; code: string; name: string; classification: string; extra: React.ReactNode }[];
  empty: string;
}) {
  return (
    <section>
      <h2 className="font-head text-lg font-semibold text-ink">
        {title} <span className="text-sm font-normal text-ink-3">({rows.length})</span>
      </h2>
      <p className="mt-1 text-xs text-ink-3">{note}</p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tên tài sản</th>
              <th className={th}>Phân loại</th>
              <th className={th}>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0 hover:bg-sunk">
                <td className="px-3 py-2">
                  <Link href={`/modules/M27/asset/${r.id}`} className="font-mono text-xs text-accent hover:underline">
                    {r.code}
                  </Link>
                </td>
                <td className="px-3 py-2 text-ink">{r.name}</td>
                <td className="px-3 py-2 text-ink-2">{CLASSIFICATION_LABEL[r.classification]}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{r.extra}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-sm text-ink-3">
                  {empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default async function M27DuePage() {
  const [assets, role] = await Promise.all([
    prisma.m27InfoAsset.findMany({ orderBy: { code: "asc" }, include: { owner: { select: { name: true } } } }),
    getM27Role(),
  ]);
  const now = new Date();
  const canSeeSecret = role === "LDV" || role === "QLCL" || role === "ATTT";
  const visible = assets.filter((a) => canSeeSecret || a.classification !== "MAT");

  const reviewDue = visible
    .filter((a) => isReviewDue({ ...a, status: a.status }, now))
    .map((a) => ({
      id: a.id,
      code: a.code,
      name: a.name,
      classification: a.classification,
      extra: `Chu kỳ ${a.reviewCycleMonths} tháng · lần gần nhất ${a.lastReviewedAt?.toLocaleDateString("vi-VN") ?? "chưa rà soát"}`,
    }));

  const restoreDue = visible
    .filter((a) => isRestoreTestDue({ ...a, status: a.status }, now))
    .map((a) => {
      const cycles = restoreTestOverdueCycles({ ...a, status: a.status }, now);
      return {
        id: a.id,
        code: a.code,
        name: a.name,
        classification: a.classification,
        extra: (
          <>
            Chu kỳ {restoreTestCycleMonths(a)} tháng · gần nhất{" "}
            {a.lastRestoreTestAt?.toLocaleDateString("vi-VN") ?? "chưa từng kiểm chứng"}
            {cycles >= 2 && <strong className="ml-1 text-crit">— quá {cycles} chu kỳ, phải báo cáo LĐV</strong>}
          </>
        ),
      };
    });

  const disposalDue = visible
    .filter((a) => isDisposalCandidate(a))
    .map((a) => ({
      id: a.id,
      code: a.code,
      name: a.name,
      classification: a.classification,
      extra: `Thời hạn lưu: ${a.retentionPeriod} · căn cứ ${a.retentionBasis}`,
    }));

  const ownerless = visible
    .filter((a) => isOwnerless({ ownerActive: Boolean(a.owner), status: a.status }))
    .map((a) => ({
      id: a.id,
      code: a.code,
      name: a.name,
      classification: a.classification,
      extra: "Chủ sở hữu không còn hiệu lực — phải chuyển giao trước khi hoàn tất thủ tục thôi việc (ETV.P03)",
    }));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium text-ink-3">M27 · Quản trị dữ liệu và tài sản thông tin</p>
        <h1 className="font-head text-2xl font-bold text-ink">Bảng đến hạn</h1>
        <p className="mt-1 text-sm text-ink-2">
          Bốn cảnh báo đều <strong>tính khi đọc</strong> từ dữ liệu bản ghi, không lưu cột riêng — nên không bao giờ
          lệch với thực tế.
        </p>
      </div>

      <Link href="/modules/M27" className="text-xs text-accent hover:underline">
        ← Danh mục tài sản thông tin
      </Link>

      <Table
        title="Đến hạn rà soát định kỳ"
        note="Chu kỳ 12 tháng; còn 06 tháng với tài sản mức Mật hoặc có dữ liệu cá nhân (ETV.P27 §6.8)."
        rows={reviewDue}
        empty="Không có tài sản nào đến hạn rà soát."
      />

      <Table
        title="Quá hạn kiểm chứng phục hồi"
        note="≤ 06 tháng với tài sản Sẵn sàng = Cao, ≤ 12 tháng với tài sản còn lại có sao lưu; bằng chứng F31.03 của ETV.P31 (§6.5.2). Quá 02 chu kỳ phải báo cáo LĐV."
        rows={restoreDue}
        empty="Không có tài sản nào quá hạn kiểm chứng phục hồi."
      />

      <Table
        title="Ngừng sử dụng — cần đối chiếu thời hạn lưu trước khi huỷ"
        note="Chỉ huỷ tài sản đã Ngừng sử dụng VÀ đã hết thời hạn lưu (ETV.P27 §6.7.3). Thời hạn lưu là văn bản theo ETV.P15 nên máy không tự kết luận — QLCL đối chiếu từng dòng."
        rows={disposalDue}
        empty="Không có tài sản nào đang Ngừng sử dụng."
      />

      <Table
        title="Tài sản vô chủ"
        note="Chủ sở hữu đã nghỉ việc hoặc chuyển công tác (ETV.P27 §6.8) — chặn phê duyệt và cảnh báo QLCL, LĐV."
        rows={ownerless}
        empty="Không có tài sản vô chủ."
      />
    </div>
  );
}
