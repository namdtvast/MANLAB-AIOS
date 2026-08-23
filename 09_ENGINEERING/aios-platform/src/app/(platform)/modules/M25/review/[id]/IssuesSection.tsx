"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { closeContextIssue, createContextIssue, linkIssueToM01, unlinkIssueFromM01 } from "@/lib/m25/actions";
import {
  DIRECTION_LABEL,
  ENTRY_STATUS_LABEL,
  IMPACT_LEVEL_LABEL,
  IMPACT_LEVEL_TONE,
  ISSUE_CATEGORY_LABEL,
  ISSUE_ORIGIN_LABEL,
  MGMT_SYSTEM_LABEL,
  MONITOR_FREQ_LABEL,
  enumOptions,
} from "@/lib/m25/labels";

interface Issue {
  id: string;
  code: string;
  title: string;
  description: string;
  origin: string;
  category: string;
  direction: string;
  impactLevel: string;
  monitoringMethod: string;
  monitoringFrequency: string;
  status: string;
  closeReason: string | null;
  ownerName: string | null;
  objectiveRefs: string[];
  evidenceRefs: string[];
  links: { id: string; label: string }[];
}

interface Props {
  reviewId: string;
  editable: boolean;
  issues: Issue[];
  users: { id: string; name: string; role: string }[];
  m01: { risks: { id: string; code: string; title: string }[]; opportunities: { id: string; code: string; title: string }[] };
}

const fieldCls = "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";
const btn = "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink hover:opacity-90 disabled:opacity-50";
const btnGhost = "cursor-pointer rounded-lg border border-border-strong px-2.5 py-1 text-xs text-ink hover:bg-sunk disabled:opacity-50";
const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

export function IssuesSection({ reviewId, editable, issues, users, m01 }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [systems, setSystems] = useState<string[]>(["ISO_9001"]);
  const [closing, setClosing] = useState<{ id: string; reason: string } | null>(null);
  const [linking, setLinking] = useState<{ id: string; target: string } | null>(null);

  const run = (fn: () => Promise<{ ok: boolean; message?: string }>, after?: () => void) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else {
        after?.();
        router.refresh();
      }
    });
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Vấn đề bối cảnh ({issues.length})</h2>
        {editable && (
          <button className={btnGhost} onClick={() => setShowForm((s) => !s)}>
            {showForm ? "Đóng biểu mẫu" : "+ Thêm vấn đề"}
          </button>
        )}
      </div>

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {showForm && editable && (
        <form
          className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            run(
              () =>
                createContextIssue({
                  reviewId,
                  origin: String(fd.get("origin")),
                  category: String(fd.get("category")),
                  title: String(fd.get("title")),
                  description: String(fd.get("description")),
                  direction: String(fd.get("direction")),
                  affectedSystems: systems,
                  impactLevel: String(fd.get("impactLevel")),
                  monitoringMethod: String(fd.get("monitoringMethod")),
                  monitoringFrequency: String(fd.get("monitoringFrequency")),
                  ownerId: String(fd.get("ownerId") ?? "") || undefined,
                  objectiveRefs: String(fd.get("objectiveRefs") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
                  evidenceRefs: String(fd.get("evidenceRefs") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
                }),
              () => setShowForm(false),
            );
          }}
        >
          <label className={labelCls}>
            Tên vấn đề
            <input name="title" required className={fieldCls} />
          </label>
          <label className={labelCls}>
            Mô tả
            <textarea name="description" rows={2} required className={fieldCls} />
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className={labelCls}>
              Nguồn gốc
              <select name="origin" className={fieldCls}>
                {enumOptions(ISSUE_ORIGIN_LABEL).map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
            <label className={labelCls}>
              Nhóm vấn đề
              <select name="category" className={fieldCls}>
                {enumOptions(ISSUE_CATEGORY_LABEL).map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
            <label className={labelCls}>
              Chiều tác động
              <select name="direction" className={fieldCls}>
                {enumOptions(DIRECTION_LABEL).map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
            <label className={labelCls}>
              Mức tác động
              <select name="impactLevel" className={fieldCls}>
                {enumOptions(IMPACT_LEVEL_LABEL).map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
            <label className={labelCls}>
              Cách theo dõi
              <input name="monitoringMethod" required className={fieldCls} />
            </label>
            <label className={labelCls}>
              Tần suất theo dõi
              <select name="monitoringFrequency" className={fieldCls}>
                {enumOptions(MONITOR_FREQ_LABEL).map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
            <label className={labelCls}>
              Người theo dõi
              <select name="ownerId" className={fieldCls}>
                <option value="">— chưa gán —</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                ))}
              </select>
            </label>
            <label className={labelCls}>
              Mục tiêu liên quan (→ M24, phân cách dấu phẩy)
              <input name="objectiveRefs" className={fieldCls} />
            </label>
          </div>
          <label className={labelCls}>
            Bằng chứng/nguồn (phân cách dấu phẩy)
            <input name="evidenceRefs" placeholder="vd: NĐ 36/2026, Khiếu nại KN-2026-0002" className={fieldCls} />
          </label>
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-ink">Hệ thống quản lý bị ảnh hưởng</p>
            <div className="flex flex-wrap gap-3">
              {enumOptions(MGMT_SYSTEM_LABEL).map((s) => (
                <label key={s.value} className="flex items-center gap-1.5 text-xs text-ink-2">
                  <input
                    type="checkbox"
                    checked={systems.includes(s.value)}
                    onChange={() => setSystems((x) => (x.includes(s.value) ? x.filter((v) => v !== s.value) : [...x, s.value]))}
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className={btn} disabled={isPending}>
            {isPending ? "Đang lưu…" : "Thêm vấn đề"}
          </button>
        </form>
      )}

      <ul className="flex flex-col gap-2">
        {issues.map((i) => (
          <li key={i.id} className="rounded-xl border border-border bg-surface p-4 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-ink-3">{i.code}</span>
              <strong className="text-ink">{i.title}</strong>
              <span className={`rounded-full whitespace-nowrap px-2 py-0.5 text-xs font-medium ${TONE_CLASS[IMPACT_LEVEL_TONE[i.impactLevel]]}`}>
                Tác động {IMPACT_LEVEL_LABEL[i.impactLevel].toLowerCase()}
              </span>
              {i.status === "DA_DONG" && <span className="rounded-full whitespace-nowrap bg-sunk px-2 py-0.5 text-xs text-ink-2">{ENTRY_STATUS_LABEL[i.status]}</span>}
            </div>
            <p className="mt-1 text-ink-2">{i.description}</p>
            <p className="mt-1 text-xs text-ink-3">
              {ISSUE_ORIGIN_LABEL[i.origin]} · {ISSUE_CATEGORY_LABEL[i.category]} · {DIRECTION_LABEL[i.direction]} · theo dõi{" "}
              {MONITOR_FREQ_LABEL[i.monitoringFrequency].toLowerCase()} ({i.monitoringMethod}) · phụ trách: {i.ownerName ?? "chưa gán"}
            </p>
            {i.evidenceRefs.length > 0 && <p className="mt-1 text-xs text-ink-3">Bằng chứng: {i.evidenceRefs.join("; ")}</p>}
            {i.objectiveRefs.length > 0 && <p className="mt-1 text-xs text-ink-3">Mục tiêu (M24): {i.objectiveRefs.join("; ")}</p>}
            {i.closeReason && <p className="mt-1 text-xs text-ink-3">Lý do đóng: {i.closeReason}</p>}

            <div className="mt-2 flex flex-col gap-1">
              <p className="text-xs font-medium text-ink">Liên kết xử lý bên M01 ({i.links.length})</p>
              {i.links.map((l) => (
                <p key={l.id} className="flex items-center gap-2 text-xs text-ink-2">
                  <span className="font-mono">{l.label}</span>
                  {editable && (
                    <button className={btnGhost} disabled={isPending} onClick={() => run(() => unlinkIssueFromM01(l.id))}>
                      bỏ liên kết
                    </button>
                  )}
                </p>
              ))}
              {i.links.length === 0 && i.impactLevel === "CAO" && (
                <p className="text-xs text-crit">Vấn đề mức Cao bắt buộc có ít nhất 1 liên kết trước khi gửi soát xét (quy tắc 3).</p>
              )}
            </div>

            {editable && i.status === "CON_HIEU_LUC" && (
              <div className="mt-3 flex flex-wrap gap-2">
                {linking?.id === i.id ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <select className={fieldCls} value={linking.target} onChange={(e) => setLinking({ id: i.id, target: e.target.value })}>
                      <option value="">— chọn rủi ro/cơ hội M01 —</option>
                      <optgroup label="Rủi ro">
                        {m01.risks.map((r) => (
                          <option key={r.id} value={`R:${r.id}`}>{r.code} — {r.title}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Cơ hội">
                        {m01.opportunities.map((o) => (
                          <option key={o.id} value={`O:${o.id}`}>{o.code} — {o.title}</option>
                        ))}
                      </optgroup>
                    </select>
                    <button
                      className={btnGhost}
                      disabled={isPending || !linking.target}
                      onClick={() =>
                        run(
                          () =>
                            linkIssueToM01({
                              issueId: i.id,
                              riskId: linking.target.startsWith("R:") ? linking.target.slice(2) : undefined,
                              opportunityId: linking.target.startsWith("O:") ? linking.target.slice(2) : undefined,
                            }),
                          () => setLinking(null),
                        )
                      }
                    >
                      Lưu liên kết
                    </button>
                    <button className={btnGhost} onClick={() => setLinking(null)}>Hủy</button>
                  </div>
                ) : (
                  <button className={btnGhost} onClick={() => setLinking({ id: i.id, target: "" })}>+ Liên kết M01</button>
                )}

                {closing?.id === i.id ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      className={fieldCls}
                      placeholder="Lý do đóng (bắt buộc)"
                      value={closing.reason}
                      onChange={(e) => setClosing({ id: i.id, reason: e.target.value })}
                    />
                    <button className={btnGhost} disabled={isPending} onClick={() => run(() => closeContextIssue(i.id, closing.reason), () => setClosing(null))}>
                      Xác nhận đóng
                    </button>
                    <button className={btnGhost} onClick={() => setClosing(null)}>Hủy</button>
                  </div>
                ) : (
                  <button className={btnGhost} onClick={() => setClosing({ id: i.id, reason: "" })}>Đóng vấn đề</button>
                )}
              </div>
            )}
          </li>
        ))}
        {issues.length === 0 && <li className="rounded-xl border border-border bg-surface p-4 text-sm text-ink-3">Chưa có vấn đề bối cảnh nào.</li>}
      </ul>
    </section>
  );
}
