import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { KICH_THUOC_TRANG, PhanTrang, boQua, chotTrang } from "@/components/PhanTrang";
import { RULE_ACTION_LABEL, RULE_VERSION_STATUS_LABEL, RULE_VERSION_STATUS_TONE } from "@/lib/m27/labels";
import { CLASSIFICATION_LABEL } from "@/lib/m34/labels";
import type { Classification } from "@/generated/prisma/enums";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

const th =
  "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

const COLUMNS: Classification[] = ["CONG_KHAI", "NOI_BO", "HAN_CHE", "MAT"];

export default async function M27RulesPage({ searchParams }: { searchParams: Promise<{ trang?: string }> }) {
  const { trang: trangRaw } = await searchParams;
  // Phiên bản đang hiệu lực tra riêng chứ không dò trong danh sách đang hiện: bảng lịch sử đã phân
  // trang nên phiên bản đó có thể không nằm ở trang đầu.
  const [tong, current] = await Promise.all([
    prisma.m27RuleVersion.count(),
    prisma.m27RuleVersion.findFirst({
      where: { status: "DA_PHE_DUYET" },
      orderBy: { version: "desc" },
      include: { rules: true, approvedBy: { select: { name: true } } },
    }),
  ]);
  const trang = chotTrang(trangRaw, tong);
  const versions = await prisma.m27RuleVersion.findMany({
    orderBy: { version: "desc" },
    include: { approvedBy: { select: { name: true } }, _count: { select: { rules: true } } },
    skip: boQua(trang),
    take: KICH_THUOC_TRANG,
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M27 · Biểu mẫu ETV.P.F 27.02</p>
        <h1 className="font-head text-2xl font-bold text-ink">Bảng quy tắc xử lý theo mức phân loại</h1>
        <p className="mt-1 text-sm text-ink-2">
          Bảng luật có phiên bản, do PT.ATTT và QLCL dự thảo, <strong>LĐV phê duyệt</strong> (ETV.P27 §6.3). Hành
          động đánh dấu <strong>CẤM</strong> bị chặn ở mọi luồng thao tác với tài sản mang mức phân loại tương ứng.
        </p>
      </div>

      <Link href="/modules/M27" className="text-xs text-accent hover:underline">
        ← Danh mục tài sản thông tin
      </Link>

      {!current && (
        <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">
          Chưa có phiên bản bảng quy tắc nào đang hiệu lực.
        </p>
      )}

      {current && (
        <>
          <p className="text-sm text-ink-2">
            Phiên bản đang hiệu lực: <strong className="text-ink">{current.version}</strong> · hiệu lực từ{" "}
            {current.effectiveFrom?.toLocaleDateString("vi-VN") ?? "—"} · LĐV phê duyệt:{" "}
            {current.approvedBy?.name ?? "—"}
          </p>

          <div className="overflow-x-auto rounded-xl border border-border bg-surface">
            <table className="w-full min-w-[64rem] text-sm">
              <thead>
                <tr>
                  <th className={th}>Hành động</th>
                  {COLUMNS.map((c) => (
                    <th key={c} className={th}>
                      {CLASSIFICATION_LABEL[c]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(RULE_ACTION_LABEL).map((action) => (
                  <tr key={action} className="border-b border-border last:border-0">
                    <td className="px-3 py-2 font-medium text-ink">{RULE_ACTION_LABEL[action]}</td>
                    {COLUMNS.map((c) => {
                      const rule = current.rules.find((r) => r.action === action && r.classification === c);
                      if (!rule) return <td key={c} className="px-3 py-2 text-xs text-ink-3">—</td>;
                      return (
                        <td key={c} className="px-3 py-2 align-top text-xs">
                          {rule.isProhibited && (
                            <span className="mb-1 inline-flex items-center rounded-full bg-crit-soft px-2 py-0.5 text-xs font-semibold text-crit">
                              CẤM
                            </span>
                          )}
                          <span className={rule.isProhibited ? "block text-crit" : "block text-ink-2"}>
                            {rule.requirement}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div>
        <h2 className="font-head text-lg font-semibold text-ink">Lịch sử phiên bản</h2>
        <p className="mt-1 text-xs text-ink-3">
          Mỗi lần sửa tạo phiên bản mới, không sửa đè; phiên bản cũ giữ làm bằng chứng (ETV.P27 §6.3).
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className={th}>Phiên bản</th>
                <th className={th}>Trạng thái</th>
                <th className={th}>Hiệu lực từ</th>
                <th className={th}>Số dòng</th>
                <th className={th}>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {versions.map((v) => (
                <tr key={v.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 font-mono text-xs text-ink">{v.version}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[RULE_VERSION_STATUS_TONE[v.status]]}`}
                    >
                      {RULE_VERSION_STATUS_LABEL[v.status]}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-ink-2">{v.effectiveFrom?.toLocaleDateString("vi-VN") ?? "—"}</td>
                  <td className="px-3 py-2 text-ink-2">{v._count.rules}</td>
                  <td className="px-3 py-2 text-xs text-ink-2">{v.note ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <PhanTrang path="/modules/M27/rules" trang={trang} tong={tong} donVi="phiên bản" />
        </div>
      </div>
    </div>
  );
}
