"use client";

// Đổi nền tảng + mô hình của tác tử.
//
// Đổi mô hình KHÔNG kèm bật lại tác tử: theo ETV.P29 §5.8 đây là **thay đổi lớn** (lập lại AIA,
// đánh giá chất lượng, LĐV phê duyệt), nên tác tử bị tạm dừng ngay. Việc mở lại là một hành động
// riêng, tách nút, bắt ghi lý do — chỗ để dẫn số phiếu F29.03 đã chạy lại. Gộp hai việc vào một
// nút là biến thủ tục thành hình thức.
//
// Nút mở lại dùng cho MỌI lý do tạm dừng (đổi mô hình, khống chế sự cố). Riêng tạm dừng vì AIA
// quá hạn thì phê duyệt lại AIA đã tự gỡ, không cần bấm ở đây.
//
// Danh sách model đã lọc sẵn theo nền tảng ở phía máy chủ; `doiMoHinhTacTu` vẫn kiểm lại — form
// chỉ là gương.

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { doiMoHinhTacTu, resumeAgent } from "@/lib/m29/actions";
import { suspendReasonLabel } from "@/lib/m29/labels";
import type { M29Role } from "@/lib/m29/model";

const fieldCls = "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

export interface ModelChoice {
  id: string;
  modelId: string;
  displayName: string;
  platformId: string;
  platformCode: string;
  platformName: string;
}

export function ModelPanel({
  agentId,
  hienTai,
  choices,
  m29Role,
}: {
  agentId: string;
  hienTai: { platformCode: string; modelId: string | null; status: string; suspendedReason: string | null };
  choices: ModelChoice[];
  m29Role: M29Role | null;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openResume, setOpenResume] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ tone: "good" | "crit"; text: string } | null>(null);

  const canWrite = m29Role === "AI_ADMIN" || m29Role === "SUPER_ADMIN";
  if (!canWrite) return null;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Nền tảng và mô hình</h2>
        <button type="button" onClick={() => setOpen((v) => !v)} className="cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk">
          {open ? "Đóng" : "Đổi mô hình"}
        </button>
      </div>
      <p className="text-xs text-ink-3">
        Đang chạy: <span className="font-mono text-ink-2">{hienTai.platformCode}</span>
        {hienTai.modelId && <span className="font-mono text-ink-2"> / {hienTai.modelId}</span>}
      </p>

      {message && (
        <p className={`rounded-lg border px-3 py-2 text-sm ${message.tone === "good" ? "border-good/30 bg-good-soft text-good" : "border-crit/30 bg-crit-soft text-crit"}`}>
          {message.text}
        </p>
      )}

      {open && (
        <>
          <p className="rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-xs text-warn">
            Đổi mô hình hoặc nhà cung cấp là <strong>thay đổi lớn</strong> (ETV.P29 §5.8): phải lập lại AIA và đánh giá chất lượng, Lãnh đạo Viện phê
            duyệt. Ngay khi đổi, tác tử <strong>tạm dừng</strong> và hồ sơ AIA đang hiệu lực chuyển về <strong>Cần rà soát lại</strong>.
          </p>

          {choices.length === 0 ? (
            <p className="text-xs text-ink-3">
              Chưa có model nào dùng được: model phải ở trạng thái Hoạt động và thuộc nhà cung cấp đã gắn một nền tảng Đã phê duyệt hoặc Hiệu lực. Khai
              ở trang Danh mục trước.
            </p>
          ) : (
            <form
              className="flex flex-col gap-3"
              action={(formData: FormData) => {
                setMessage(null);
                const chon = choices.find((c) => c.id === String(formData.get("modelId") ?? ""));
                if (!chon) return;
                startTransition(async () => {
                  const r = await doiMoHinhTacTu({
                    agentId,
                    platformId: chon.platformId,
                    modelId: chon.id,
                    lyDo: String(formData.get("lyDo") ?? ""),
                  });
                  if (r.ok) {
                    setMessage({ tone: "good", text: String(r.patch.thongBao) });
                    setOpen(false);
                    router.refresh();
                  } else {
                    setMessage({ tone: "crit", text: r.message });
                  }
                });
              }}
            >
              <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                Nền tảng / model mới
                <select name="modelId" required className={fieldCls} defaultValue="">
                  <option value="" disabled>
                    — Chọn model —
                  </option>
                  {choices.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.platformCode} · {c.displayName} ({c.modelId})
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                Lý do đổi
                <textarea name="lyDo" required minLength={10} rows={2} className={fieldCls} placeholder="vd: Chuyển sang máy chủ mô hình nội bộ để dữ liệu không rời hạ tầng của Viện" />
              </label>

              <button type="submit" disabled={isPending} className={`${btn} self-start`}>
                {isPending ? "Đang đổi…" : "Đổi mô hình và tạm dừng tác tử"}
              </button>
            </form>
          )}
        </>
      )}

      {hienTai.status === "SUSPENDED" && (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <p className="text-xs text-ink-3">
            Tác tử đang <strong className="text-ink-2">Tạm dừng</strong>
            {hienTai.suspendedReason && <> — {suspendReasonLabel(hienTai.suspendedReason)}</>}. Mọi lượt gọi bị chặn cho tới khi mở lại. Phê duyệt lại AIA
            <strong> không</strong> tự mở lại tác tử ở nhánh này: ETV.P29 §5.8 đòi thêm đánh giá chất lượng (F29.03) mà phần mềm không kiểm được.
          </p>
          {!openResume ? (
            <button type="button" onClick={() => setOpenResume(true)} className="cursor-pointer self-start rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk">
              Mở lại tác tử
            </button>
          ) : (
            <form
              className="flex flex-col gap-2"
              action={(formData: FormData) => {
                setMessage(null);
                startTransition(async () => {
                  const r = await resumeAgent(agentId, String(formData.get("lyDoMoLai") ?? ""));
                  if (r.ok) {
                    setMessage({ tone: "good", text: "Đã mở lại tác tử." });
                    setOpenResume(false);
                    router.refresh();
                  } else {
                    setMessage({ tone: "crit", text: r.message });
                  }
                });
              }}
            >
              <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                Lý do mở lại
                <textarea
                  name="lyDoMoLai"
                  required
                  rows={2}
                  className={fieldCls}
                  placeholder="vd: AIA-2026-004 đã phê duyệt, bộ đánh giá chạy lại đạt theo phiếu F29.03 số …"
                />
              </label>
              <button type="submit" disabled={isPending} className={`${btn} self-start`}>
                {isPending ? "Đang mở…" : "Mở lại"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
