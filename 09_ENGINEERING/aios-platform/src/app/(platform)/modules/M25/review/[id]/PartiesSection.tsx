"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { closeInterestedParty, createInterestedParty, createPartyExpectation, deletePartyExpectation } from "@/lib/m25/actions";
import {
  ENTRY_STATUS_LABEL,
  EXPECTATION_SOURCE_LABEL,
  FULFILLMENT_STATUS_LABEL,
  INFLUENCE_LEVEL_LABEL,
  MONITOR_FREQ_LABEL,
  PARTY_GROUP_LABEL,
  enumOptions,
} from "@/lib/m25/labels";

interface Expectation {
  id: string;
  description: string;
  source: string;
  isComplianceObligation: boolean;
  obligationRef: string | null;
  responseAction: string;
  responseModuleRef: string | null;
  fulfillmentStatus: string;
}

interface Party {
  id: string;
  code: string;
  name: string;
  group: string;
  influenceLevel: string;
  engagementChannel: string;
  monitoringFrequency: string;
  impartialityFlag: boolean;
  status: string;
  closeReason: string | null;
  ownerName: string | null;
  expectations: Expectation[];
}

const fieldCls = "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";
const btn = "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink hover:opacity-90 disabled:opacity-50";
const btnGhost = "cursor-pointer rounded-lg border border-border-strong px-2.5 py-1 text-xs text-ink hover:bg-sunk disabled:opacity-50";

export function PartiesSection({
  reviewId,
  editable,
  parties,
  users,
}: {
  reviewId: string;
  editable: boolean;
  parties: Party[];
  users: { id: string; name: string; role: string }[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [impartial, setImpartial] = useState(false);
  const [expFor, setExpFor] = useState<string | null>(null);
  const [isObligation, setIsObligation] = useState(false);
  const [closing, setClosing] = useState<{ id: string; reason: string } | null>(null);

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
        <h2 className="font-head text-sm font-bold text-ink">Bên quan tâm ({parties.length})</h2>
        {editable && (
          <button className={btnGhost} onClick={() => setShowForm((s) => !s)}>
            {showForm ? "Đóng biểu mẫu" : "+ Thêm bên quan tâm"}
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
                createInterestedParty({
                  reviewId,
                  name: String(fd.get("name")),
                  group: String(fd.get("group")),
                  influenceLevel: String(fd.get("influenceLevel")),
                  engagementChannel: String(fd.get("engagementChannel")),
                  monitoringFrequency: String(fd.get("monitoringFrequency")),
                  ownerId: String(fd.get("ownerId") ?? "") || undefined,
                  impartialityFlag: impartial,
                }),
              () => {
                setShowForm(false);
                setImpartial(false);
              },
            );
          }}
        >
          <label className={labelCls}>
            Tên bên quan tâm
            <input name="name" required className={fieldCls} />
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className={labelCls}>
              Nhóm
              <select name="group" className={fieldCls}>
                {enumOptions(PARTY_GROUP_LABEL).map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
            <label className={labelCls}>
              Mức ảnh hưởng
              <select name="influenceLevel" className={fieldCls}>
                {enumOptions(INFLUENCE_LEVEL_LABEL).map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
            <label className={labelCls}>
              Kênh trao đổi
              <input name="engagementChannel" required className={fieldCls} />
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
              Đầu mối phụ trách
              <select name="ownerId" className={fieldCls}>
                <option value="">— chưa gán —</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                ))}
              </select>
            </label>
          </div>
          <label className="flex items-start gap-2 text-xs text-ink-2">
            <input type="checkbox" checked={impartial} onChange={(e) => setImpartial(e.target.checked)} className="mt-0.5" />
            <span>Quan hệ có nguy cơ ảnh hưởng tính khách quan (ISO/IEC 17025 §4.1) — cần mở rủi ro tương ứng ở M01 (quy tắc 5).</span>
          </label>
          <button type="submit" className={btn} disabled={isPending}>
            {isPending ? "Đang lưu…" : "Thêm bên quan tâm"}
          </button>
        </form>
      )}

      <ul className="flex flex-col gap-2">
        {parties.map((p) => (
          <li key={p.id} className="rounded-xl border border-border bg-surface p-4 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-ink-3">{p.code}</span>
              <strong className="text-ink">{p.name}</strong>
              <span className="rounded-full bg-sunk px-2 py-0.5 text-xs text-ink-2">{PARTY_GROUP_LABEL[p.group]}</span>
              {p.impartialityFlag && (
                <span className="rounded-full bg-warn-soft px-2 py-0.5 text-xs font-medium text-warn">Ảnh hưởng tính khách quan</span>
              )}
              {p.status === "DA_DONG" && <span className="rounded-full bg-sunk px-2 py-0.5 text-xs text-ink-2">{ENTRY_STATUS_LABEL[p.status]}</span>}
            </div>
            <p className="mt-1 text-xs text-ink-3">
              Ảnh hưởng {INFLUENCE_LEVEL_LABEL[p.influenceLevel].toLowerCase()} · kênh: {p.engagementChannel} · theo dõi{" "}
              {MONITOR_FREQ_LABEL[p.monitoringFrequency].toLowerCase()} · đầu mối: {p.ownerName ?? "chưa gán"}
            </p>
            {p.closeReason && <p className="mt-1 text-xs text-ink-3">Lý do đóng: {p.closeReason}</p>}

            <div className="mt-2 flex flex-col gap-1.5">
              <p className="text-xs font-medium text-ink">Nhu cầu và mong đợi ({p.expectations.length})</p>
              {p.expectations.map((e) => (
                <div key={e.id} className="rounded-lg border border-border bg-bg p-2.5 text-xs">
                  <p className="text-ink">{e.description}</p>
                  <p className="mt-1 text-ink-3">
                    Nguồn: {EXPECTATION_SOURCE_LABEL[e.source]} · {FULFILLMENT_STATUS_LABEL[e.fulfillmentStatus]}
                    {e.isComplianceObligation && ` · Nghĩa vụ tuân thủ: ${e.obligationRef}`}
                    {e.responseModuleRef && ` · Theo dõi tại: ${e.responseModuleRef}`}
                  </p>
                  <p className="mt-1 text-ink-2">Đáp ứng: {e.responseAction}</p>
                  {editable && (
                    <button className={`${btnGhost} mt-1.5`} disabled={isPending} onClick={() => run(() => deletePartyExpectation(e.id))}>
                      xóa
                    </button>
                  )}
                </div>
              ))}
              {p.expectations.length === 0 && (
                <p className="text-xs text-crit">Bên quan tâm phải có ít nhất 1 nhu cầu/mong đợi trước khi gửi soát xét (quy tắc 6).</p>
              )}
            </div>

            {editable && p.status === "CON_HIEU_LUC" && (
              <div className="mt-3 flex flex-col gap-2">
                {expFor === p.id ? (
                  <form
                    className="flex flex-col gap-2 rounded-lg border border-border bg-bg p-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      run(
                        () =>
                          createPartyExpectation({
                            partyId: p.id,
                            description: String(fd.get("description")),
                            source: String(fd.get("source")),
                            isComplianceObligation: isObligation,
                            obligationRef: String(fd.get("obligationRef") ?? ""),
                            responseAction: String(fd.get("responseAction")),
                            responseModuleRef: String(fd.get("responseModuleRef") ?? ""),
                            fulfillmentStatus: String(fd.get("fulfillmentStatus")),
                          }),
                        () => {
                          setExpFor(null);
                          setIsObligation(false);
                        },
                      );
                    }}
                  >
                    <label className={labelCls}>
                      Nhu cầu/mong đợi
                      <textarea name="description" rows={2} required className={fieldCls} />
                    </label>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <label className={labelCls}>
                        Nguồn
                        <select name="source" className={fieldCls}>
                          {enumOptions(EXPECTATION_SOURCE_LABEL).map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </label>
                      <label className={labelCls}>
                        Mức độ đáp ứng
                        <select name="fulfillmentStatus" className={fieldCls}>
                          {enumOptions(FULFILLMENT_STATUS_LABEL).map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <label className={labelCls}>
                      Cách Viện đáp ứng
                      <input name="responseAction" required className={fieldCls} />
                    </label>
                    <label className={labelCls}>
                      Theo dõi tại module (tùy chọn)
                      <input name="responseModuleRef" placeholder="vd: M01, M13, M24" className={fieldCls} />
                    </label>
                    <label className="flex items-start gap-2 text-xs text-ink-2">
                      <input type="checkbox" checked={isObligation} onChange={(e) => setIsObligation(e.target.checked)} className="mt-0.5" />
                      <span>Chấp nhận thành nghĩa vụ tuân thủ (bắt buộc dẫn chiếu văn bản — quy tắc 4)</span>
                    </label>
                    {isObligation && (
                      <label className={labelCls}>
                        Căn cứ pháp luật/tiêu chuẩn
                        <input name="obligationRef" placeholder="vd: Luật Đo lường 2011 §17; ISO/IEC 17025 §7.8" className={fieldCls} />
                      </label>
                    )}
                    <div className="flex gap-2">
                      <button type="submit" className={btnGhost} disabled={isPending}>Lưu mong đợi</button>
                      <button type="button" className={btnGhost} onClick={() => setExpFor(null)}>Hủy</button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    <button className={btnGhost} onClick={() => setExpFor(p.id)}>+ Thêm mong đợi</button>
                    {closing?.id === p.id ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          className={fieldCls}
                          placeholder="Lý do đóng (bắt buộc)"
                          value={closing.reason}
                          onChange={(e) => setClosing({ id: p.id, reason: e.target.value })}
                        />
                        <button className={btnGhost} disabled={isPending} onClick={() => run(() => closeInterestedParty(p.id, closing.reason), () => setClosing(null))}>
                          Xác nhận đóng
                        </button>
                        <button className={btnGhost} onClick={() => setClosing(null)}>Hủy</button>
                      </div>
                    ) : (
                      <button className={btnGhost} onClick={() => setClosing({ id: p.id, reason: "" })}>Đóng bên quan tâm</button>
                    )}
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
        {parties.length === 0 && <li className="rounded-xl border border-border bg-surface p-4 text-sm text-ink-3">Chưa có bên quan tâm nào.</li>}
      </ul>
    </section>
  );
}
