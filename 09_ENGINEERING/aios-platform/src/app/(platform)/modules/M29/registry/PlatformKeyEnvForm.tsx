"use client";

// Đặt TÊN biến môi trường chứa khoá API của một nền tảng.
//
// Ô này nhận TÊN BIẾN, không nhận khoá — khoá thật nằm trong `.env` của máy chủ chạy AIOS và
// không bao giờ đi vào cơ sở dữ liệu (cùng lý do bảng AISecret chỉ giữ maskedValue). Có ô này vì
// một bộ chuyển đổi phục vụ được nhiều nền tảng: hai máy chủ tương thích OpenAI, hai khoá khác
// nhau, trước đây buộc dùng chung một biến nên chỉ một máy chủ đăng nhập được.
//
// Mẫu tên bị giới hạn — xem KEY_ENV_PATTERN trong lib/m29/khoa-api.ts. Server kiểm lại, form chỉ
// là gương.

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { datBienKhoaApi } from "@/lib/m29/actions";
import { KEY_ENV_HINT } from "@/lib/m29/khoa-api";

const fieldCls = "w-52 rounded-md border border-border bg-bg px-2 py-1.5 font-mono text-xs text-ink outline-none transition-colors focus:border-accent-line";

export function PlatformKeyEnvForm({ id, apiKeyEnv }: { id: string; apiKeyEnv: string | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ tone: "good" | "crit"; text: string } | null>(null);

  return (
    <form
      className="flex flex-wrap items-center gap-1.5"
      action={(formData: FormData) => {
        setMessage(null);
        startTransition(async () => {
          try {
            await datBienKhoaApi(id, String(formData.get("apiKeyEnv") ?? ""));
            setMessage({ tone: "good", text: "Đã lưu. Bấm Kiểm tra ngay ở trang Tổng quan để dò lại." });
            router.refresh();
          } catch (e) {
            setMessage({ tone: "crit", text: e instanceof Error ? e.message : "Không lưu được." });
          }
        });
      }}
    >
      <input
        name="apiKeyEnv"
        defaultValue={apiKeyEnv ?? ""}
        placeholder="LOCAL_LLM_API_KEY"
        title={KEY_ENV_HINT}
        className={fieldCls}
        aria-label="Tên biến môi trường chứa khoá API"
      />
      <button
        type="submit"
        disabled={isPending}
        className="min-h-8 cursor-pointer rounded-md border border-border-strong px-2.5 py-1 text-xs font-medium text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang lưu…" : "Lưu"}
      </button>
      {message && <span className={`text-xs ${message.tone === "good" ? "text-good" : "text-crit"}`}>{message.text}</span>}
    </form>
  );
}
