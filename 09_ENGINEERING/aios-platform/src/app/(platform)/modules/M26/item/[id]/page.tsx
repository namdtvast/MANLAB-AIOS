import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getViewer } from "@/lib/m26/actor";
import { logItemAccess } from "@/lib/m26/actions";
import {
  canViewItem,
  isDueForReview,
  reviewDueDate,
  tacitSinglePointBlock,
  TRANSFER_METHODS,
} from "@/lib/m26/rules";
import {
  CATEGORY_LABEL,
  CONFIDENTIALITY_LABEL,
  CONFIDENTIALITY_TONE,
  CRITICALITY_LABEL,
  CRITICALITY_TONE,
  ITEM_STATUS_LABEL,
  ITEM_STATUS_TONE,
  KNOWLEDGE_FORM_LABEL,
  NEED_METHOD_LABEL,
  NEED_STATUS_LABEL,
  ORIGIN_LABEL,
  REVIEW_CYCLE_LABEL,
} from "@/lib/m26/labels";
import { Badge, fmtDate, th } from "../../_ui";
import { ItemActionPanel } from "./ItemActionPanel";
import { RiskLinkPanel } from "./RiskLinkPanel";

export default async function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const viewer = await getViewer();

  const item = await prisma.m26KnowledgeItem.findUnique({
    where: { id },
    include: {
      owner: true,
      createdBy: true,
      reviewedBy: true,
      approvedBy: true,
      document: { select: { code: true, title: true, status: true } },
      holders: { include: { user: true } },
      riskLinks: { include: { risk: { select: { id: true, code: true, title: true } } } },
      targetedBy: { include: { responsible: true } },
      lessons: { select: { id: true, code: true, title: true, status: true } },
      supersedes: { select: { id: true, code: true, version: true } },
      supersededBy: { select: { id: true, code: true, version: true } },
    },
  });
  if (!item) notFound();

  // Kiểm tra quyền xem ở SERVER (không chỉ ẩn ở UI) — ETV.P26 mục 5.1.4.
  const allowed = canViewItem(viewer.role, viewer.id ?? "", {
    confidentiality: item.confidentiality,
    ownerId: item.ownerId,
    holderIds: item.holders.map((h) => h.userId),
  });
  if (!allowed) notFound();

  // Lượt xem mục Hạn chế/Mật vào nhật ký (ISO/IEC 27001).
  await logItemAccess(id);

  const audit = await prisma.m26AuditEntry.findMany({
    where: { itemType: "ITEM", itemId: id },
    include: { actor: true },
    orderBy: { ts: "desc" },
    take: 30,
  });

  const risks = await prisma.m01RiskItem.findMany({
    orderBy: { code: "asc" },
    select: { id: true, code: true, title: true },
    take: 100,
  });

  const transferNeedCount = item.targetedBy.filter(
    (n) => (TRANSFER_METHODS as readonly string[]).includes(n.method) && n.status !== "KHONG_THUC_HIEN",
  ).length;

  const block = tacitSinglePointBlock({
    status: item.status,
    knowledgeForm: item.knowledgeForm,
    criticality: item.criticality,
    confidentiality: item.confidentiality,
    sourceRef: item.sourceRef,
    docId: item.docId,
    summary: item.summary,
    createdById: item.createdById,
    ownerId: item.ownerId,
    holderCount: item.holders.length,
    riskLinkCount: item.riskLinks.length,
    transferNeedCount,
    aiIndexed: item.aiIndexed,
  });

  const dueFrom = item.lastReviewedAt ?? item.approvedAt;
  const due = item.status === "APPROVED" && isDueForReview(item.reviewCycle, dueFrom);

  const rows: [string, React.ReactNode][] = [
    ["Nhóm tri thức", CATEGORY_LABEL[item.category]],
    ["Dạng", KNOWLEDGE_FORM_LABEL[item.knowledgeForm]],
    ["Nguồn gốc", ORIGIN_LABEL[item.origin]],
    ["Chủ sở hữu", item.owner.name],
    ["Mức trọng yếu", <Badge key="c" label={CRITICALITY_LABEL[item.criticality]} tone={CRITICALITY_TONE[item.criticality]} />],
    ["Mức bảo mật", <Badge key="s" label={CONFIDENTIALITY_LABEL[item.confidentiality]} tone={CONFIDENTIALITY_TONE[item.confidentiality]} />],
    [
      "Chu kỳ rà soát",
      <span key="r" className={due ? "text-crit" : undefined}>
        {REVIEW_CYCLE_LABEL[item.reviewCycle]} · rà soát gần nhất {fmtDate(dueFrom)} · hạn kế tiếp {fmtDate(reviewDueDate(item.reviewCycle, dueFrom))}
        {due && " — QUÁ HẠN"}
      </span>,
    ],
    ["Chỉ mục trợ lý AI", item.aiIndexed ? "Đang trong chỉ mục" : "Không nằm trong chỉ mục"],
    ["Áp dụng cho", item.appliesTo.length > 0 ? item.appliesTo.join("; ") : "—"],
    ["Nguồn nội dung gốc", item.sourceRef ?? "—"],
    [
      "Tài liệu kiểm soát (M14)",
      item.document ? `${item.document.code} — ${item.document.title}` : "—",
    ],
    ["Người lập", `${item.createdBy.name} · ${fmtDate(item.createdAt)}`],
    ["Người soát xét", item.reviewedBy ? `${item.reviewedBy.name} · ${fmtDate(item.reviewedAt)}` : "—"],
    ["Người phê duyệt", item.approvedBy ? `${item.approvedBy.name} · ${fmtDate(item.approvedAt)}` : "—"],
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/modules/M26" className="text-xs text-accent hover:underline">
          ← Danh mục tri thức
        </Link>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="font-head text-2xl font-bold text-ink">{item.title}</h1>
          <Badge label={ITEM_STATUS_LABEL[item.status]} tone={ITEM_STATUS_TONE[item.status]} />
        </div>
        <p className="mt-1 text-sm text-ink-2">
          <span className="font-mono text-xs">{item.code}</span> · phiên bản {item.version}
          {item.supersedes && (
            <>
              {" "}
              · thay thế{" "}
              <Link href={`/modules/M26/item/${item.supersedes.id}`} className="text-accent hover:underline">
                {item.supersedes.code}
              </Link>
            </>
          )}
          {item.supersededBy && (
            <>
              {" "}
              · bị thay thế bởi{" "}
              <Link href={`/modules/M26/item/${item.supersededBy.id}`} className="text-accent hover:underline">
                {item.supersededBy.code}
              </Link>
            </>
          )}
        </p>
        {item.reason && <p className="mt-2 rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-sm text-warn">Lý do gần nhất: {item.reason}</p>}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col gap-6">
          <section className="rounded-xl border border-border bg-surface p-4">
            <h2 className="font-head text-sm font-bold text-ink">Tóm tắt nội dung</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm text-ink-2">{item.summary}</p>
          </section>

          <section className="overflow-x-auto rounded-xl border border-border bg-surface">
            <table className="w-full text-sm">
              <tbody>
                {rows.map(([k, v]) => (
                  <tr key={k} className="border-b border-border last:border-0">
                    <td className="w-56 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink-3">{k}</td>
                    <td className="px-3 py-2 text-ink-2">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {item.knowledgeForm === "TRI_THUC_AN" && (
            <section className="rounded-xl border border-border bg-surface p-4">
              <h2 className="font-head text-sm font-bold text-ink">Người đang giữ tri thức</h2>
              <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-2">
                {item.holders.map((h) => (
                  <li key={h.id}>
                    {h.user.name} {h.note && <span className="text-ink-3">— {h.note}</span>}
                  </li>
                ))}
                {item.holders.length === 0 && <li className="text-ink-3">Chưa ghi nhận người giữ tri thức.</li>}
              </ul>
              {block && !block.ok && (
                <p className="mt-3 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-xs text-crit">{block.message}</p>
              )}
            </section>
          )}

          <section className="rounded-xl border border-border bg-surface p-4">
            <h2 className="font-head text-sm font-bold text-ink">Rủi ro mất tri thức (M01)</h2>
            <div className="mt-2">
              <RiskLinkPanel
                itemId={item.id}
                links={item.riskLinks.map((l) => ({ riskId: l.riskId, code: l.risk.code, title: l.risk.title }))}
                risks={risks}
              />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-4">
            <h2 className="font-head text-sm font-bold text-ink">Nhu cầu tri thức liên quan</h2>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-2">
              {item.targetedBy.map((n) => (
                <li key={n.id}>
                  <span className="font-mono text-xs text-accent">{n.code}</span> — {NEED_METHOD_LABEL[n.method]} · {NEED_STATUS_LABEL[n.status]} ·
                  phụ trách {n.responsible.name}
                </li>
              ))}
              {item.targetedBy.length === 0 && <li className="text-ink-3">Chưa có phiếu nhu cầu tri thức nào gắn với mục này.</li>}
            </ul>
          </section>

          {item.lessons.length > 0 && (
            <section className="rounded-xl border border-border bg-surface p-4">
              <h2 className="font-head text-sm font-bold text-ink">Bài học kinh nghiệm đã kết tinh</h2>
              <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-2">
                {item.lessons.map((l) => (
                  <li key={l.id}>
                    <Link href={`/modules/M26/lessons/${l.id}`} className="font-mono text-xs text-accent hover:underline">
                      {l.code}
                    </Link>{" "}
                    — {l.title}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="flex flex-col gap-2">
            <h2 className="font-head text-sm font-bold text-ink">Nhật ký</h2>
            <div className="overflow-x-auto rounded-xl border border-border bg-surface">
              <table className="w-full min-w-[40rem] text-sm">
                <thead>
                  <tr>
                    <th className={th}>Thời điểm</th>
                    <th className={th}>Người thực hiện</th>
                    <th className={th}>Hành động</th>
                    <th className={th}>Trước → sau</th>
                    <th className={th}>Lý do</th>
                  </tr>
                </thead>
                <tbody>
                  {audit.map((a) => (
                    <tr key={a.id} className="border-b border-border last:border-0">
                      <td className="px-3 py-2 text-xs text-ink-3">{new Date(a.ts).toLocaleString("vi-VN")}</td>
                      <td className="px-3 py-2 text-xs text-ink-2">
                        {a.actor.name} <span className="text-ink-3">({a.role})</span>
                      </td>
                      <td className="px-3 py-2 text-ink-2">{a.action}</td>
                      <td className="px-3 py-2 text-xs text-ink-3">
                        {a.before || a.after ? `${a.before ?? "—"} → ${a.after ?? "—"}` : "—"}
                      </td>
                      <td className="px-3 py-2 text-xs text-ink-3">{a.reason ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <ItemActionPanel
          id={item.id}
          status={item.status}
          role={viewer.role}
          aiIndexed={item.aiIndexed}
          blockMessage={block && !block.ok ? block.message : null}
        />
      </div>
    </div>
  );
}
