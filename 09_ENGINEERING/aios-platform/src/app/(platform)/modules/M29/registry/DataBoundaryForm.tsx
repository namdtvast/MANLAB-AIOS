"use client";

// Đặt RANH GIỚI DỮ LIỆU của một nền tảng — ETV.P29 §5.5.
//
// Đây là chốt quyết định Copilot được đọc tới mức tài liệu nào: ranh giới siết nhất (ra ngoài,
// không cam kết) chỉ cho gửi tài liệu mức Công khai, nên trợ lý gần như không tra cứu được gì.
// Trước khi có màn hình này, giá trị đó không đặt được lẫn không nhìn thấy trên giao diện — nền
// tảng nào cũng nằm ở mặc định siết nhất và không ai biết vì sao Copilot trả lời "không tìm thấy
// căn cứ".
//
// Quyền: `governance:write` — AI_SECURITY_ADMIN hoặc SUPER_ADMIN. Người đăng ký nền tảng KHÔNG
// tự nới trần được (xem chú thích đầu NewPlatformForm).

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { datRanhGioiDuLieu } from "@/lib/m29/actions";
import { DATA_BOUNDARY_LABEL, SECURITY_LEVEL_LABEL } from "@/lib/m29/labels";
import { mucBaoMatToiDa } from "@/lib/m29/copilot/muc-bao-mat";
import type { AIDataBoundary } from "@/generated/prisma/enums";

const fieldCls = "w-full rounded-md border border-border bg-bg px-2 py-1.5 text-xs text-ink outline-none transition-colors focus:border-accent-line";

const BOUNDARIES: AIDataBoundary[] = ["NO_EXTERNAL_TRANSFER", "EXTERNAL_WITH_COMMITMENT", "EXTERNAL_NO_COMMITMENT"];

export function DataBoundaryForm({ id, hienTai, soHoSo }: { id: string; hienTai: AIDataBoundary; soHoSo: string | null }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [chon, setChon] = useState<AIDataBoundary>(hienTai);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ tone: "good" | "crit"; text: string } | null>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <button
        type="button"
        onClick={() => {
          setChon(hienTai);
          setMessage(null);
          setOpen((v) => !v);
        }}
        className="cursor-pointer self-start rounded-md border border-border-strong px-2 py-1 text-xs font-medium text-ink transition-colors hover:bg-sunk"
        aria-expanded={open}
      >
        {open ? "Đóng" : "Đặt ranh giới"}
      </button>

      {open && (
        <form
          className="flex flex-col gap-2 rounded-lg border border-border bg-bg p-2"
          action={(formData: FormData) => {
            setMessage(null);
            startTransition(async () => {
              try {
                await datRanhGioiDuLieu(id, chon, String(formData.get("soHoSo") ?? ""));
                setMessage({ tone: "good", text: "Đã lưu." });
                setOpen(false);
                router.refresh();
              } catch (e) {
                setMessage({ tone: "crit", text: e instanceof Error ? e.message : "Không lưu được." });
              }
            });
          }}
        >
          <select name="ranhGioi" value={chon} onChange={(e) => setChon(e.target.value as AIDataBoundary)} className={fieldCls}>
            {BOUNDARIES.map((b) => (
              <option key={b} value={b}>
                {DATA_BOUNDARY_LABEL[b]} → trần {SECURITY_LEVEL_LABEL[mucBaoMatToiDa(b)]}
              </option>
            ))}
          </select>

          {/* Số hồ sơ chỉ có nghĩa với trạng thái có cam kết; hai trạng thái kia server tự xoá về
              null, nên không hiện ô để khỏi mời gọi điền một giá trị sẽ bị bỏ. */}
          {chon === "EXTERNAL_WITH_COMMITMENT" && (
            <label className="flex flex-col gap-1 text-xs font-medium text-ink">
              Số hồ sơ ETV.P.F29.02
              <input name="soHoSo" required defaultValue={soHoSo ?? ""} className={fieldCls} placeholder="vd: AIA-2026-004" />
              <span className="font-normal text-ink-3">
                Hồ sơ phải trích điều khoản của nhà cung cấp về việc không dùng dữ liệu để huấn luyện lại — ETV.P29 §5.5 đòi bằng chứng, không đòi niềm
                tin.
              </span>
            </label>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="cursor-pointer self-start rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Đang lưu…" : "Lưu ranh giới"}
          </button>
        </form>
      )}

      {message && <span className={`text-xs ${message.tone === "good" ? "text-good" : "text-crit"}`}>{message.text}</span>}
    </div>
  );
}
