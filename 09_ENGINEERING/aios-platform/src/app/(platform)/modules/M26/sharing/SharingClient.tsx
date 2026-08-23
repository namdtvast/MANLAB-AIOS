"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { cancelSharing, completeSharing, createSharing, type SharingFormInput } from "@/lib/m26/actions";
import { SHARING_FORM_LABEL, enumOptions } from "@/lib/m26/labels";

const fieldCls = "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";
const btnGhost = "cursor-pointer rounded-lg border border-border-strong px-2.5 py-1 text-xs text-ink hover:bg-sunk disabled:opacity-50";

export function NewSharingForm({
  users,
  items,
  trainings,
}: {
  users: { id: string; name: string | null; email: string }[];
  items: { id: string; code: string; title: string }[];
  trainings: { id: string; code: string }[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState("SINH_HOAT_CHUYEN_MON");
  const [itemIds, setItemIds] = useState<string[]>([]);
  const [participantIds, setParticipantIds] = useState<string[]>([]);

  const toggle = (arr: string[], set: (v: string[]) => void, id: string) =>
    set(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);

  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer self-start rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90"
      >
        + Lập hoạt động chia sẻ
      </button>
    );

  return (
    <form
      className="flex max-w-2xl flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        setError(null);
        const payload: SharingFormInput = {
          form: form as SharingFormInput["form"],
          heldAt: String(fd.get("heldAt") ?? ""),
          topic: String(fd.get("topic") ?? ""),
          presenterId: String(fd.get("presenterId") ?? ""),
          itemIds,
          participantIds,
          evidenceTrainingId: String(fd.get("evidenceTrainingId") ?? "") || undefined,
          evidenceRef: String(fd.get("evidenceRef") ?? ""),
          handoverNote: String(fd.get("handoverNote") ?? ""),
        };
        startTransition(async () => {
          const r = await createSharing(payload);
          if (!r.ok) setError(r.message);
          else {
            setOpen(false);
            router.refresh();
          }
        });
      }}
    >
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelCls}>
          Hình thức
          <select value={form} onChange={(e) => setForm(e.target.value)} className={fieldCls}>
            {enumOptions(SHARING_FORM_LABEL).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Thời gian tổ chức
          <input type="date" name="heldAt" required className={fieldCls} />
        </label>
        <label className={labelCls}>
          Người trình bày
          <select name="presenterId" className={fieldCls}>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name ?? u.email}
              </option>
            ))}
          </select>
        </label>
        {form === "DAO_TAO_NOI_BO" && (
          <label className={labelCls}>
            Hồ sơ đào tạo bên M03 (bắt buộc)
            <select name="evidenceTrainingId" className={fieldCls}>
              <option value="">— Chọn hồ sơ đào tạo —</option>
              {trainings.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.code}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <label className={labelCls}>
        Nội dung/chủ đề
        <input name="topic" required className={fieldCls} />
      </label>

      {form === "DAO_TAO_NOI_BO" && (
        <label className={labelCls}>
          Hoặc dẫn chiếu hồ sơ đào tạo dạng chuỗi
          <input name="evidenceRef" className={fieldCls} placeholder="Mã hồ sơ F03.05.x nếu chưa số hóa" />
        </label>
      )}

      {form === "BAN_GIAO_NHAN_SU" && (
        <label className={labelCls}>
          Nội dung bàn giao
          <textarea name="handoverNote" rows={2} className={fieldCls} placeholder="Người bàn giao, người tiếp nhận, tài liệu kèm theo" />
        </label>
      )}

      <fieldset className="flex flex-col gap-2 rounded-lg border border-border p-3">
        <legend className="px-1 text-sm font-medium text-ink">Mục tri thức chia sẻ (chỉ mục đã phê duyệt)</legend>
        <div className="flex flex-col gap-1">
          {items.map((i) => (
            <label key={i.id} className="flex items-center gap-1.5 text-sm text-ink-2">
              <input type="checkbox" checked={itemIds.includes(i.id)} onChange={() => toggle(itemIds, setItemIds, i.id)} />
              <span className="font-mono text-xs">{i.code}</span> {i.title}
            </label>
          ))}
          {items.length === 0 && <p className="text-xs text-ink-3">Chưa có mục tri thức nào ở trạng thái Đã phê duyệt.</p>}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-2 rounded-lg border border-border p-3">
        <legend className="px-1 text-sm font-medium text-ink">Người tham dự</legend>
        <div className="flex flex-wrap gap-2">
          {users.map((u) => (
            <label key={u.id} className="flex items-center gap-1.5 text-sm text-ink-2">
              <input type="checkbox" checked={participantIds.includes(u.id)} onChange={() => toggle(participantIds, setParticipantIds, u.id)} />
              {u.name ?? u.email}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex gap-2">
        <button type="submit" disabled={isPending} className="cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink hover:opacity-90 disabled:opacity-50">
          Lập kế hoạch chia sẻ
        </button>
        <button type="button" onClick={() => setOpen(false)} className="cursor-pointer rounded-lg border border-border-strong px-4 py-2 text-sm text-ink hover:bg-sunk">
          Đóng
        </button>
      </div>
    </form>
  );
}

export function SharingActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [reason, setReason] = useState("");

  const run = (fn: () => Promise<{ ok: boolean; message?: string }>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else router.refresh();
    });
  };

  if (status !== "KE_HOACH") return <span className="text-xs text-ink-3">—</span>;

  return (
    <div className="flex flex-col gap-1.5">
      {error && <p className="max-w-[16rem] text-xs text-crit">{error}</p>}
      <input
        placeholder="Ghi nhận hiệu quả"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-40 rounded-lg border border-border bg-bg px-2 py-1 text-xs text-ink"
      />
      <button className={btnGhost} disabled={isPending} onClick={() => run(() => completeSharing(id, note))}>
        Ghi nhận đã thực hiện
      </button>
      <input
        placeholder="Lý do hủy"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="w-40 rounded-lg border border-border bg-bg px-2 py-1 text-xs text-ink"
      />
      <button className={btnGhost} disabled={isPending} onClick={() => run(() => cancelSharing(id, reason))}>
        Hủy
      </button>
    </div>
  );
}
