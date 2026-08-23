import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM14Role } from "@/lib/m14/actor";
import { missingRequiredFields } from "@/lib/m14/rules";
import { DISPOSAL_LABEL, DOC_STATUS_LABEL, DOC_TYPE_LABEL, KNOWLEDGE_CATEGORY_LABEL } from "@/lib/m14/labels";
import { DocActionPanel } from "./ActionPanel";

export default async function M14DocDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [d, m14Role] = await Promise.all([
    prisma.m14Document.findUnique({
      where: { id },
      include: {
        createdBy: true,
        reviewedBy: true,
        approvedBy: true,
        publishedBy: true,
        supersedes: true,
        supersededBy: true,
        suggestions: { orderBy: { createdAt: "asc" }, include: { appliedBy: true } },
      },
    }),
    getM14Role(),
  ]);
  if (!d) notFound();

  const auditEntries = await prisma.m14AuditEntry.findMany({
    where: { itemType: "DOCUMENT", itemId: id },
    orderBy: { ts: "asc" },
    include: { actor: true },
  });

  // Cross-module đọc thật: khiếu nại (M12) đang viện dẫn văn bản bên ngoài này qua externalDocRef —
  // chiều ngược của liên kết M12 → F14.03 có từ Increment 10. Không import code M12.
  const citingComplaints =
    d.docType === "VAN_BAN_BEN_NGOAI"
      ? await prisma.m12Complaint.findMany({ where: { externalDocRef: d.code }, select: { id: true, code: true } })
      : [];

  const missing = missingRequiredFields(d);
  const pendingSuggestions = d.suggestions.filter((s) => !s.appliedAt);

  return (
    <div className="grid max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{d.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">{d.title}</h1>
          <p className="mt-1 text-sm text-ink-2">
            {DOC_TYPE_LABEL[d.docType]} · {DOC_STATUS_LABEL[d.status]}
            {d.disposalType ? ` · ${DISPOSAL_LABEL[d.disposalType]}` : ""}
            {d.publishedAt ? " · Đã ban hành" : ""}
          </p>
        </div>

        {d.status === "NHAP" && missing.length > 0 && (
          <p className="rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-xs text-warn">
            Còn thiếu trường bắt buộc theo ETV.P14 §6.3, chưa gửi soát xét được: {missing.join(", ")}.
          </p>
        )}

        {d.supersededBy && (
          <p className="rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-xs text-warn">
            Văn bản này đã bị thay thế bởi{" "}
            <Link href={`/modules/M14/doc/${d.supersededBy.id}`} className="font-mono underline">
              {d.supersededBy.code}
            </Link>
            {d.status === "DA_PHE_DUYET" ? " nhưng vẫn đang có hiệu lực — LĐP cần thanh lý bản này." : "."}
          </p>
        )}

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Chủ sở hữu · Phòng</dt>
          <dd className="text-ink">
            {d.owner || "—"} · {d.department || "—"}
          </dd>
          <dt className="text-ink-3">Quy trình liên quan</dt>
          <dd className="text-ink">{d.processCode ?? "—"}</dd>
          <dt className="text-ink-3">Lần ban hành · Hiệu lực</dt>
          <dd className="text-ink">
            {d.revision ?? "—"} · {d.effectiveDate ? d.effectiveDate.toLocaleDateString("vi-VN") : "—"}
          </dd>
          <dt className="text-ink-3">Phân loại · Nhóm quyền</dt>
          <dd className="text-ink">
            {d.knowledgeCategory ? KNOWLEDGE_CATEGORY_LABEL[d.knowledgeCategory] : "—"} · {d.permissionGroup ?? "—"}
          </dd>
          <dt className="text-ink-3">Thời hạn lưu (F14.06)</dt>
          <dd className="text-ink">{d.retention ?? "—"}</dd>
          <dt className="text-ink-3">Nơi phát hành/tiếp nhận</dt>
          <dd className="text-ink">{d.sourceOrg ?? "—"}</dd>
          <dt className="text-ink-3">Điều khoản ISO</dt>
          <dd className="text-ink">{d.isoClause.length ? d.isoClause.join(" · ") : "—"}</dd>
          <dt className="text-ink-3">Căn cứ pháp lý</dt>
          <dd className="text-ink">{d.legalBasis.length ? d.legalBasis.join(" · ") : "—"}</dd>
          <dt className="text-ink-3">Thay thế văn bản</dt>
          <dd className="text-ink">
            {d.supersedes ? (
              <Link href={`/modules/M14/doc/${d.supersedes.id}`} className="font-mono text-accent hover:underline">
                {d.supersedes.code}
              </Link>
            ) : (
              "—"
            )}
          </dd>
          <dt className="text-ink-3">Người lập · soát xét · phê duyệt</dt>
          <dd className="text-ink">
            {d.createdBy.name} · {d.reviewedBy?.name ?? "—"} · {d.approvedBy?.name ?? "—"}
          </dd>
          {d.publishedAt && (
            <>
              <dt className="text-ink-3">Ban hành/phân phối (F14.04)</dt>
              <dd className="text-good">
                {d.publishedBy?.name} — {d.distributionNote}
              </dd>
            </>
          )}
        </dl>

        {citingComplaints.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-4">
            <h2 className="mb-2 font-head text-sm font-bold text-ink">Khiếu nại đang viện dẫn văn bản này (← M12)</h2>
            <ul className="flex flex-col gap-1 text-sm">
              {citingComplaints.map((c) => (
                <li key={c.id}>
                  <Link href={`/modules/M12/complaint/${c.id}`} className="font-mono text-xs text-accent hover:underline">
                    {c.code}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {d.suggestions.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-4">
            <h2 className="mb-2 font-head text-sm font-bold text-ink">Gợi ý của AI (← M29) — chỉ gợi ý, không tự ghi</h2>
            <ul className="flex flex-col gap-1 text-sm text-ink-2">
              {d.suggestions.map((s) => (
                <li key={s.id}>
                  <strong className="text-ink">{s.field}</strong>: {s.suggestedValue}{" "}
                  {s.appliedAt ? (
                    <span className="text-good">— đã áp dụng bởi {s.appliedBy?.name}</span>
                  ) : (
                    <span className="text-warn">— chờ người có thẩm quyền áp dụng</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">Nhật ký</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {auditEntries.map((e) => (
              <li key={e.id} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-ink">
                  <span className="text-ink-3">{e.ts.toLocaleString("vi-VN")}</span> · {e.actor.name} ({e.role}) — {e.action}
                </p>
                {e.reason && <p className="mt-1 text-ink-2">Lý do: {e.reason}</p>}
              </li>
            ))}
            {auditEntries.length === 0 && (
              <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có sự kiện nào.</li>
            )}
          </ul>
        </div>
      </div>

      <div>
        <DocActionPanel
          id={d.id}
          status={d.status}
          m14Role={m14Role}
          isPublished={Boolean(d.publishedAt)}
          pendingSuggestions={pendingSuggestions.map((s) => ({
            id: s.id,
            field: s.field,
            suggestedValue: s.suggestedValue,
            rationale: s.rationale,
          }))}
        />
      </div>
    </div>
  );
}
