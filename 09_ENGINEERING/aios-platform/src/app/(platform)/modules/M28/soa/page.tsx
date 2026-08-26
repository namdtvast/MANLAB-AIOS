import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM28Role } from "@/lib/m28/actor";
import { ANNEX_A_CONTROL_COUNT, controlNeedsCapa } from "@/lib/m28/rules";
import {
  ANNEX_THEME_LABEL,
  IMPLEMENTATION_STATUS_LABEL,
  IMPLEMENTATION_STATUS_TONE,
  SOA_STATUS_LABEL,
  SOA_STATUS_TONE,
} from "@/lib/m28/labels";
import { SoaActions } from "./SoaActions";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

const th =
  "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function M28SoAPage() {
  const [versions, role] = await Promise.all([
    prisma.m28SoAVersion.findMany({
      orderBy: { version: "desc" },
      include: { controls: { orderBy: { controlCode: "asc" } }, approvedBy: { select: { name: true } } },
    }),
    getM28Role(),
  ]);
  const current = versions.find((v) => v.status === "DA_PHE_DUYET") ?? versions[0];
  const now = new Date();

  if (!current)
    return (
      <div className="flex flex-col gap-4">
        <Link href="/modules/M28" className="text-xs text-accent hover:underline">
          ← Hồ sơ rủi ro an toàn thông tin
        </Link>
        <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">
          Chưa có phiên bản Tuyên bố áp dụng nào. SoA là <strong>tài liệu bắt buộc</strong> của ISMS (ETV.P28 mục 6.6).
        </p>
      </div>
    );

  const applied = current.controls.filter((c) => c.applicable);
  const excluded = current.controls.filter((c) => !c.applicable);
  const missingExclusionReason = excluded.filter((c) => !c.exclusionReason?.trim()).length;
  const withEvidence = applied.filter((c) => c.evidenceRefs.length > 0).length;
  const needCapa = current.controls.filter((c) => controlNeedsCapa(c, now));

  // Nhóm theo bốn chủ đề của Phụ lục A để đọc được, thay vì đổ 93 dòng thành một khối.
  const themes = ["A.5", "A.6", "A.7", "A.8"];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M28 · Biểu mẫu ETV.P.F 28.02</p>
        <h1 className="font-head text-2xl font-bold text-ink">Tuyên bố áp dụng (SoA)</h1>
        <p className="mt-1 text-sm text-ink-2">
          Tài liệu <strong>bắt buộc</strong> của ISMS. Liệt kê đủ {ANNEX_A_CONTROL_COUNT} kiểm soát tham chiếu của Phụ
          lục A ISO/IEC 27001:2022; PT.ATTT lập, QLCL soát xét, <strong>LĐV phê duyệt</strong> (ETV.P28 mục 6.6).
        </p>
      </div>

      <Link href="/modules/M28" className="text-xs text-accent hover:underline">
        ← Hồ sơ rủi ro an toàn thông tin
      </Link>

      <div className="rounded-lg border border-border bg-sunk px-3 py-2 text-xs text-ink-2">
        <strong>Không chép nội dung tiêu chuẩn.</strong> Bảng này chỉ lưu <strong>mã kiểm soát</strong> và cách Viện
        thực thi. Tên và diễn giải đầy đủ của từng kiểm soát tra tại bản ISO/IEC 27001:2022 và 27002:2022 có bản
        quyền, lưu ở kho tri thức (ETV.P26) — chép toàn văn vào biểu mẫu là không chấp nhận (ETV.P28 mục 6.6).
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[SOA_STATUS_TONE[current.status]]}`}
        >
          {SOA_STATUS_LABEL[current.status]}
        </span>
        <span className="text-ink-2">
          Phiên bản <strong className="text-ink">{current.version}</strong>
          {current.effectiveDate && ` · hiệu lực từ ${current.effectiveDate.toLocaleDateString("vi-VN")}`}
          {current.approvedBy && ` · LĐV phê duyệt: ${current.approvedBy.name}`}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-3">Tổng số kiểm soát</p>
          <p className="font-head text-2xl font-bold text-ink">{current.controls.length}</p>
          <p className="text-xs text-ink-2">
            {current.controls.length === ANNEX_A_CONTROL_COUNT ? "đủ Phụ lục A" : `thiếu ${ANNEX_A_CONTROL_COUNT - current.controls.length} dòng`}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-3">Áp dụng</p>
          <p className="font-head text-2xl font-bold text-ink">{applied.length}</p>
          <p className="text-xs text-ink-2">{withEvidence} đã có bằng chứng</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-3">Loại trừ</p>
          <p className="font-head text-2xl font-bold text-ink">{excluded.length}</p>
          <p className={`text-xs ${missingExclusionReason > 0 ? "text-crit" : "text-ink-2"}`}>
            {missingExclusionReason > 0 ? `${missingExclusionReason} chưa nêu lý do` : "đều có lý do"}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-3">Quá hạn bằng chứng</p>
          <p className="font-head text-2xl font-bold text-ink">{needCapa.length}</p>
          <p className="text-xs text-ink-2">phải lập KPH (ETV.P13)</p>
        </div>
      </div>

      {needCapa.length > 0 && (
        <p className="rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-sm text-warn">
          {needCapa.length} kiểm soát ghi &quot;Áp dụng&quot; đã quá hạn cam kết mà chưa có bằng chứng thực hiện —
          phải lập KPH theo ETV.P13 (ETV.P28 mục 6.6): {needCapa.map((c) => c.controlCode).join(", ")}.
        </p>
      )}

      <SoaActions
        id={current.id}
        status={current.status}
        role={role}
        controlCount={current.controls.length}
        missingExclusionReason={missingExclusionReason}
      />

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-lg font-semibold text-ink">Phạm vi ISMS</h2>
        <div className="rounded-xl border border-border bg-surface p-4 text-sm text-ink-2">
          <p>
            <strong className="text-ink">Tổ chức:</strong> {current.scopeOrganization}
          </p>
          <p className="mt-1">
            <strong className="text-ink">Địa điểm:</strong> {current.scopeLocation}
          </p>
          <p className="mt-1">
            <strong className="text-ink">Thông tin:</strong> {current.scopeInformation}
          </p>
          <p className="mt-1">
            <strong className="text-ink">Hệ thống:</strong> {current.scopeSystems}
          </p>
          <p className="mt-1">
            <strong className="text-ink">Giao diện và phụ thuộc:</strong> {current.scopeInterfaces}
          </p>
          <p className="mt-1">
            <strong className="text-ink">Loại trừ khỏi phạm vi:</strong>{" "}
            {current.scopeExclusions ?? "Không loại trừ phần nào."}
          </p>
        </div>
      </section>

      {themes.map((theme) => {
        const rows = current.controls.filter((c) => c.theme === theme);
        return (
          <section key={theme}>
            <h2 className="font-head text-lg font-semibold text-ink">
              {ANNEX_THEME_LABEL[theme]} <span className="text-sm font-normal text-ink-3">({rows.length})</span>
            </h2>
            <div className="mt-2 overflow-x-auto rounded-xl border border-border bg-surface">
              <table className="w-full min-w-[56rem] text-sm">
                <thead>
                  <tr>
                    <th className={th}>Mã</th>
                    <th className={th}>Áp dụng</th>
                    <th className={th}>Lý do áp dụng / loại trừ</th>
                    <th className={th}>Tình trạng</th>
                    <th className={th}>Bằng chứng</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((c) => (
                    <tr key={c.id} className="border-b border-border last:border-0 hover:bg-sunk">
                      <td className="px-3 py-2 font-mono text-xs text-ink">{c.controlCode}</td>
                      <td className="px-3 py-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${c.applicable ? TONE_CLASS.good : TONE_CLASS.neutral}`}
                        >
                          {c.applicable ? "Áp dụng" : "Loại trừ"}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-xs text-ink-2">
                        {c.applicable ? (
                          (c.justification ?? "—")
                        ) : c.exclusionReason?.trim() ? (
                          c.exclusionReason
                        ) : (
                          <span className="text-crit">Thiếu lý do loại trừ — chặn phê duyệt SoA (ETV.P28 mục 6.6)</span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[IMPLEMENTATION_STATUS_TONE[c.implementationStatus]]}`}
                        >
                          {IMPLEMENTATION_STATUS_LABEL[c.implementationStatus]}
                        </span>
                      </td>
                      <td className="px-3 py-2 font-mono text-xs text-ink-2">
                        {c.evidenceRefs.join(", ") || (
                          <span className={controlNeedsCapa(c, now) ? "font-sans text-crit" : "font-sans text-ink-3"}>
                            {controlNeedsCapa(c, now) ? "quá hạn, chưa có" : "—"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}
