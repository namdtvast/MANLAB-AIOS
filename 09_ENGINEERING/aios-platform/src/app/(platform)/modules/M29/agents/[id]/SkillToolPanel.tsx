"use client";

// Gán kỹ năng và công cụ cho tác tử.
//
// Hai form tách hẳn nhau vì hai loại thay đổi khác nhau theo ETV.P29 mục 5.8, không phải vì bố
// cục: kỹ năng không cấp quyền hành động nên đổi là xong; whitelist công cụ có thể **nâng mức
// quyền hành động** — thay đổi lớn, bắt lý do, tác tử tạm dừng ngay. Gộp hai việc vào một nút
// "Lưu" là làm mờ đúng chỗ thủ tục đòi phân biệt.
//
// Máy chủ (`kiemTraGanCongCu`) mới là nơi chốt; phần tính mức quyền ở đây chỉ để cảnh báo hiện ra
// LÚC TICK, trước khi bấm lưu — người ta cần biết mình sắp làm gì trước khi làm.

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ganCongCuTacTu, ganKyNangTacTu } from "@/lib/m29/actions";
import { PERMISSION_RANK } from "@/lib/m29/rules";
import { OP_STATUS_LABEL, PERMISSION_LEVEL_LABEL } from "@/lib/m29/labels";
import type { AIOpStatus, AIPermissionLevel } from "@/generated/prisma/enums";

const fieldCls = "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnPhu = "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk";

export interface SkillChoice {
  id: string;
  code: string;
  name: string;
}

export interface ToolChoice {
  id: string;
  code: string;
  name: string;
  endpoint: string;
  platformCode: string;
  status: AIOpStatus;
  permissionLevel: AIPermissionLevel;
}

function Thongbao({ message }: { message: { tone: "good" | "crit"; text: string } | null }) {
  if (!message) return null;
  return (
    <p className={`rounded-lg border px-3 py-2 text-sm ${message.tone === "good" ? "border-good/30 bg-good-soft text-good" : "border-crit/30 bg-crit-soft text-crit"}`}>
      {message.text}
    </p>
  );
}

export function SkillPicker({ agentId, skills, daChon }: { agentId: string; skills: SkillChoice[]; daChon: string[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ tone: "good" | "crit"; text: string } | null>(null);

  return (
    <div className="mt-2 flex flex-col gap-2">
      <button type="button" onClick={() => setOpen((v) => !v)} className={`${btnPhu} self-start`}>
        {open ? "Đóng" : "Sửa kỹ năng"}
      </button>
      <Thongbao message={message} />
      {open &&
        (skills.length === 0 ? (
          <p className="text-xs text-ink-3">Danh mục chưa có kỹ năng nào — khai ở trang Danh mục trước.</p>
        ) : (
          <form
            className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-3"
            action={(formData: FormData) => {
              setMessage(null);
              const chon = formData.getAll("skillIds").map(String);
              startTransition(async () => {
                const r = await ganKyNangTacTu({ agentId, skillIds: chon });
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
            {skills.map((s) => (
              <label key={s.id} className="flex items-start gap-2 text-sm text-ink">
                <input type="checkbox" name="skillIds" value={s.id} defaultChecked={daChon.includes(s.id)} className="mt-0.5" />
                <span>
                  {s.name} <span className="font-mono text-xs text-ink-3">· {s.code}</span>
                </span>
              </label>
            ))}
            <button type="submit" disabled={isPending} className={`${btn} self-start`}>
              {isPending ? "Đang lưu…" : "Lưu kỹ năng"}
            </button>
          </form>
        ))}
    </div>
  );
}

export function ToolPicker({ agentId, tools, daChon }: { agentId: string; tools: ToolChoice[]; daChon: string[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [chon, setChon] = useState<string[]>(daChon);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ tone: "good" | "crit"; text: string } | null>(null);

  const muc = (ids: string[]) => tools.filter((t) => ids.includes(t.id)).reduce((max, t) => Math.max(max, PERMISSION_RANK[t.permissionLevel] ?? 0), 0);
  const mucTruoc = muc(daChon);
  const mucSau = muc(chon);
  const nangQuyen = mucSau > mucTruoc;

  return (
    <div className="mt-2 flex flex-col gap-2">
      <button
        type="button"
        onClick={() => {
          setChon(daChon);
          setOpen((v) => !v);
        }}
        className={`${btnPhu} self-start`}
      >
        {open ? "Đóng" : "Sửa whitelist công cụ"}
      </button>
      <Thongbao message={message} />
      {open &&
        (tools.length === 0 ? (
          <p className="text-xs text-ink-3">Danh mục chưa có công cụ nào — khai ở trang Danh mục trước.</p>
        ) : (
          <form
            className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-3"
            action={(formData: FormData) => {
              setMessage(null);
              startTransition(async () => {
                const r = await ganCongCuTacTu({ agentId, toolIds: chon, lyDo: String(formData.get("lyDo") ?? "") });
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
            {tools.map((t) => {
              // Công cụ Vô hiệu hóa chỉ khoá khi nó CHƯA nằm trong whitelist: đang nằm sẵn thì
              // phải bỏ ra được, khoá cả hai chiều là nhốt người dùng lại.
              const daCo = daChon.includes(t.id);
              const khoa = t.status !== "ACTIVE" && !daCo;
              return (
                <label key={t.id} className={`flex items-start gap-2 text-sm ${khoa ? "text-ink-3" : "text-ink"}`}>
                  <input
                    type="checkbox"
                    disabled={khoa}
                    checked={chon.includes(t.id)}
                    onChange={(e) => setChon((cu) => (e.target.checked ? [...cu, t.id] : cu.filter((id) => id !== t.id)))}
                    className="mt-0.5"
                  />
                  <span>
                    {t.name} <span className="font-mono text-xs text-ink-3">· {t.platformCode}{t.endpoint}</span>
                    <span className="block text-xs text-ink-3">
                      Quyền {PERMISSION_LEVEL_LABEL[t.permissionLevel]} · {OP_STATUS_LABEL[t.status]}
                      {khoa && " — không gán được, cổng sẽ chặn ngay tại bước (4)"}
                    </span>
                  </span>
                </label>
              );
            })}

            {nangQuyen && (
              <div className="flex flex-col gap-2 rounded-lg border border-warn/30 bg-warn-soft px-3 py-2">
                <p className="text-xs text-warn">
                  Lựa chọn này <strong>nâng mức quyền hành động</strong> của tác tử — <strong>thay đổi lớn</strong> theo ETV.P29 mục 5.8: phải lập lại AIA
                  và đánh giá chất lượng, Lãnh đạo Viện phê duyệt. Ngay khi lưu, tác tử <strong>tạm dừng</strong> và hồ sơ AIA đang hiệu lực chuyển về{" "}
                  <strong>Cần rà soát lại</strong>.
                </p>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                  Lý do nâng quyền
                  <textarea
                    name="lyDo"
                    required
                    minLength={10}
                    rows={2}
                    className={fieldCls}
                    placeholder="vd: Bổ sung công cụ tạo bản nháp phiếu KPH theo quyết định … đã phê duyệt"
                  />
                </label>
              </div>
            )}

            <button type="submit" disabled={isPending} className={`${btn} self-start`}>
              {isPending ? "Đang lưu…" : nangQuyen ? "Lưu và tạm dừng tác tử" : "Lưu whitelist"}
            </button>
          </form>
        ))}
    </div>
  );
}
