"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createItem, updateItem, type ItemFormInput } from "@/lib/m26/actions";
import {
  CATEGORY_LABEL,
  CONFIDENTIALITY_LABEL,
  CRITICALITY_LABEL,
  KNOWLEDGE_FORM_LABEL,
  ORIGIN_LABEL,
  REVIEW_CYCLE_LABEL,
  enumOptions,
} from "@/lib/m26/labels";
import { SUMMARY_MAX } from "@/lib/m26/rules";

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export interface ItemFormDefaults extends Partial<ItemFormInput> {
  id?: string;
}

export function ItemForm({
  users,
  documents,
  defaults,
}: {
  users: { id: string; name: string | null; email: string }[];
  documents: { id: string; code: string; title: string }[];
  defaults?: ItemFormDefaults;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [knowledgeForm, setKnowledgeForm] = useState(defaults?.knowledgeForm ?? "TRI_THUC_HIEN");
  const [summary, setSummary] = useState(defaults?.summary ?? "");
  const [holderIds, setHolderIds] = useState<string[]>(defaults?.holderIds ?? []);
  const [appliesTo, setAppliesTo] = useState((defaults?.appliesTo ?? []).join("; "));

  const toggleHolder = (id: string) => setHolderIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <form
      className="flex max-w-2xl flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        setError(null);
        const payload: ItemFormInput = {
          title: String(fd.get("title") ?? ""),
          knowledgeForm: knowledgeForm as ItemFormInput["knowledgeForm"],
          category: String(fd.get("category")) as ItemFormInput["category"],
          origin: String(fd.get("origin")) as ItemFormInput["origin"],
          summary,
          sourceRef: String(fd.get("sourceRef") ?? ""),
          docId: String(fd.get("docId") ?? ""),
          ownerId: String(fd.get("ownerId") ?? ""),
          criticality: String(fd.get("criticality")) as ItemFormInput["criticality"],
          confidentiality: String(fd.get("confidentiality")) as ItemFormInput["confidentiality"],
          appliesTo: appliesTo.split(";").map((s) => s.trim()).filter(Boolean),
          reviewCycle: String(fd.get("reviewCycle")) as ItemFormInput["reviewCycle"],
          holderIds,
        };
        startTransition(async () => {
          const r = defaults?.id ? await updateItem(defaults.id, payload) : await createItem(payload);
          if (!r.ok) setError(r.message);
          else if (defaults?.id) {
            router.push(`/modules/M26/item/${defaults.id}`);
            router.refresh();
          } else if ("id" in r) router.push(`/modules/M26/item/${r.id}`);
        });
      }}
    >
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <label className={labelCls}>
        Tên mục tri thức
        <input name="title" defaultValue={defaults?.title ?? ""} required className={fieldCls} placeholder="Đủ nghĩa khi đứng một mình" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelCls}>
          Dạng tri thức
          <select
            name="knowledgeForm"
            value={knowledgeForm}
            onChange={(e) => setKnowledgeForm(e.target.value as ItemFormInput["knowledgeForm"])}
            className={fieldCls}
          >
            {enumOptions(KNOWLEDGE_FORM_LABEL).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Nhóm tri thức
          <select name="category" defaultValue={defaults?.category ?? "KY_THUAT_DO_LUONG"} className={fieldCls}>
            {enumOptions(CATEGORY_LABEL).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Nguồn gốc
          <select name="origin" defaultValue={defaults?.origin ?? "NOI_BO"} className={fieldCls}>
            {enumOptions(ORIGIN_LABEL).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Chủ sở hữu (TP phụ trách)
          <select name="ownerId" defaultValue={defaults?.ownerId ?? users[0]?.id} className={fieldCls}>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name ?? u.email}
              </option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Mức trọng yếu
          <select name="criticality" defaultValue={defaults?.criticality ?? "TRUNG_BINH"} className={fieldCls}>
            {enumOptions(CRITICALITY_LABEL).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Mức bảo mật
          <select name="confidentiality" defaultValue={defaults?.confidentiality ?? "NOI_BO"} className={fieldCls}>
            {enumOptions(CONFIDENTIALITY_LABEL).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Chu kỳ rà soát
          <select name="reviewCycle" defaultValue={defaults?.reviewCycle ?? "NAM"} className={fieldCls}>
            {enumOptions(REVIEW_CYCLE_LABEL).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span className="text-xs font-normal text-ink-3">Mặc định ETV.P26 mục 5.1.5: Cao ≤ 1 năm · Trung bình 2 năm · Thấp theo sự kiện.</span>
        </label>
      </div>

      <label className={labelCls}>
        Tóm tắt nội dung ({summary.length}/{SUMMARY_MAX})
        <textarea
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className={fieldCls}
          placeholder="Tóm tắt đủ để tìm kiếm — KHÔNG chép toàn văn tài liệu/tiêu chuẩn vào đây (quy tắc 1)."
        />
      </label>

      <label className={labelCls}>
        Đường dẫn nội dung gốc
        <input
          name="sourceRef"
          defaultValue={defaults?.sourceRef ?? ""}
          className={fieldCls}
          placeholder="vd 08_KNOWLEDGE_GRAPH/14_Technical_References/..., hồ sơ M15, HDSD thiết bị M05"
        />
      </label>

      <label className={labelCls}>
        Tài liệu kiểm soát bên M14 (nếu tri thức là tài liệu đã ban hành)
        <select name="docId" defaultValue={defaults?.docId ?? ""} className={fieldCls}>
          <option value="">— Không gắn tài liệu kiểm soát —</option>
          {documents.map((d) => (
            <option key={d.id} value={d.id}>
              {d.code} — {d.title}
            </option>
          ))}
        </select>
        <span className="text-xs font-normal text-ink-3">
          Tri thức hiện bắt buộc có ít nhất một trong hai: đường dẫn nội dung gốc hoặc tài liệu kiểm soát (quy tắc 1–2).
        </span>
      </label>

      {knowledgeForm === "TRI_THUC_AN" && (
        <fieldset className="flex flex-col gap-2 rounded-lg border border-border p-3">
          <legend className="px-1 text-sm font-medium text-ink">Người đang giữ tri thức (bắt buộc ≥ 1)</legend>
          <div className="flex flex-wrap gap-2">
            {users.map((u) => (
              <label key={u.id} className="flex items-center gap-1.5 text-sm text-ink-2">
                <input type="checkbox" checked={holderIds.includes(u.id)} onChange={() => toggleHolder(u.id)} />
                {u.name ?? u.email}
              </label>
            ))}
          </div>
          <p className="text-xs text-ink-3">
            Tri thức ẩn mức trọng yếu Cao mà chỉ 1 người giữ sẽ bị <strong>chặn phê duyệt</strong> tới khi có liên kết rủi ro bên M01 và
            phiếu nhu cầu chuyển giao (ETV.P26 mục 5.1.6).
          </p>
        </fieldset>
      )}

      <label className={labelCls}>
        Áp dụng cho (phương pháp/thiết bị/dịch vụ — ngăn cách bằng dấu chấm phẩy)
        <input value={appliesTo} onChange={(e) => setAppliesTo(e.target.value)} className={fieldCls} placeholder="ĐLVN 42:2017; Fluke 5522A" />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {defaults?.id ? "Lưu thay đổi" : "Tạo mục tri thức (Nháp)"}
      </button>
    </form>
  );
}
