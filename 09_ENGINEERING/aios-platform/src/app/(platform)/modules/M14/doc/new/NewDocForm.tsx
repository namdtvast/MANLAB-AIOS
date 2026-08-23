"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createDocument } from "@/lib/m14/actions";
import { DOC_TYPE_LABEL, KNOWLEDGE_CATEGORY_LABEL } from "@/lib/m14/labels";
import type { M14DocType, M14KnowledgeCategory } from "@/generated/prisma/enums";

const DOC_TYPES = Object.keys(DOC_TYPE_LABEL) as M14DocType[];
const CATEGORIES = Object.keys(KNOWLEDGE_CATEGORY_LABEL) as M14KnowledgeCategory[];
const HTQL_TYPES: string[] = ["SO_TAY", "THU_TUC", "QUY_TRINH", "HUONG_DAN", "BIEU_MAU"];

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewDocForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [docType, setDocType] = useState<M14DocType>("QUY_TRINH");
  const [category, setCategory] = useState<M14KnowledgeCategory>("NOI_BO");

  return (
    <form
      className="flex max-w-2xl flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      action={(formData: FormData) => {
        setError(null);
        const g = (k: string) => String(formData.get(k) ?? "") || undefined;
        startTransition(async () => {
          try {
            const created = await createDocument({
              code: String(formData.get("code") ?? ""),
              title: String(formData.get("title") ?? ""),
              docType,
              owner: String(formData.get("owner") ?? ""),
              department: String(formData.get("department") ?? ""),
              processCode: g("processCode"),
              revision: g("revision"),
              effectiveDate: g("effectiveDate"),
              isoClause: g("isoClause"),
              legalBasis: g("legalBasis"),
              keywords: g("keywords"),
              knowledgeCategory: category,
              permissionGroup: g("permissionGroup"),
              retention: g("retention"),
              sourceOrg: g("sourceOrg"),
              supersedesCode: g("supersedesCode"),
            });
            router.push(`/modules/M14/doc/${created.id}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
          }
        });
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        <label className={labelCls}>
          Loại văn bản
          <select value={docType} onChange={(e) => setDocType(e.target.value as M14DocType)} className={fieldCls}>
            {DOC_TYPES.map((t) => (
              <option key={t} value={t}>
                {DOC_TYPE_LABEL[t]}
              </option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Mã số văn bản (§6.2)
          <input name="code" required placeholder="vd ETV.P 14 · ETV.GI 01 · ETV.CV 123/2026" className={fieldCls} />
        </label>
      </div>

      <label className={labelCls}>
        Tên văn bản
        <input name="title" required className={fieldCls} />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className={labelCls}>
          Chủ sở hữu nội dung
          <input name="owner" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Phòng/bộ phận áp dụng
          <input name="department" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Quy trình liên quan (MPxx)
          <input name="processCode" placeholder="vd MP14_TaiLieu" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Lần ban hành
          <input name="revision" placeholder="vd 01" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Ngày có hiệu lực
          <input name="effectiveDate" type="date" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Phân loại thông tin
          <select value={category} onChange={(e) => setCategory(e.target.value as M14KnowledgeCategory)} className={fieldCls}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {KNOWLEDGE_CATEGORY_LABEL[c]}
              </option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Nhóm quyền truy cập (F14.06)
          <input name="permissionGroup" placeholder="vd Noi-bo" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Thời hạn lưu (F14.06)
          <input name="retention" placeholder="vd 36 tháng" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Nơi phát hành/tiếp nhận
          <input name="sourceOrg" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Thay thế văn bản (mã)
          <input name="supersedesCode" placeholder="không bắt buộc" className={fieldCls} />
        </label>
      </div>

      <label className={labelCls}>
        Điều khoản ISO {HTQL_TYPES.includes(docType) ? "(bắt buộc với văn bản HTQL)" : "(nếu có)"} — ngăn cách bằng dấu ;
        <input name="isoClause" placeholder="ISO/IEC 17025:2017 §8.3; ISO 9001:2015 §7.5" className={fieldCls} />
      </label>
      <label className={labelCls}>
        Căn cứ pháp lý — ngăn cách bằng dấu ;
        <input name="legalBasis" placeholder="Nghị định 30/2020/NĐ-CP" className={fieldCls} />
      </label>
      <label className={labelCls}>
        Từ khóa — ngăn cách bằng dấu ;
        <input name="keywords" className={fieldCls} />
      </label>

      <p className="rounded-lg border border-border bg-sunk px-3 py-2 text-xs text-ink-2">
        Văn bản tạo ra ở trạng thái <strong>Nháp</strong>. Khi gửi soát xét, hệ thống kiểm tra đủ trường bắt buộc theo
        loại văn bản (ETV.P14 §6.3) — thiếu trường nào sẽ báo đúng tên trường đó.
      </p>

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang lưu…" : "Tạo bản Nháp"}
      </button>
    </form>
  );
}
