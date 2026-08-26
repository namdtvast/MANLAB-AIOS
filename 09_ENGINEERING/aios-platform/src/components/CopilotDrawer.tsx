"use client";
// Khay Copilot tra cứu — gắn ở layout nền tảng nên có mặt ở mọi trang module.
//
// Lỗi khu trú (spec §12): mọi lời gọi đều nằm trong try/catch và mọi nhánh từ chối của gateway
// đều trả về một tin nhắn bình thường. Copilot hỏng hoặc hết hạn mức KHÔNG được làm hỏng trang
// người dùng đang mở — vì vậy component này không ném lỗi ra ngoài và không chặn render.
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { askCopilot } from "@/lib/m29/copilot/actions";
import { goiYTheoModule, goiYTiepTheo, maModuleTuDuongDan, type ModuleGoiY } from "@/lib/m29/copilot/goi-y";

interface Citation {
  path: string;
  title: string;
  heading: string;
}

interface Msg {
  role: "user" | "assistant";
  content: string;
  citations: Citation[];
  /** Câu trả lời bị từ chối/chặn — hiển thị khác câu trả lời thường để không gây hiểu nhầm. */
  refused?: boolean;
}

// Cổng tài liệu để mở file gốc trong repo — dùng lại đúng biến của CanCuBanner.
const DOCS_PORTAL = process.env.NEXT_PUBLIC_DOCS_PORTAL_URL ?? "https://namdtvast.github.io/MANLAB-AIOS/";
const portalHref = (repoPath: string) => `${DOCS_PORTAL.replace(/\/$/, "")}/#/p/${repoPath}`;

/** Tách đường dẫn repo trong câu trả lời thành liên kết mở được. */
function renderAnswer(text: string) {
  const parts = text.split(/(\(?[0-9]{2}_[A-Za-z_]+\/[^\s()]+\.md\)?)/g);
  return parts.map((part, i) => {
    const m = /^\(?([0-9]{2}_[A-Za-z_]+\/[^\s()]+\.md)\)?$/.exec(part);
    if (!m) return <span key={i}>{part}</span>;
    return (
      <a
        key={i}
        href={portalHref(m[1])}
        target="_blank"
        rel="noreferrer"
        className="text-accent underline decoration-accent-line underline-offset-2"
      >
        {m[1].split("/").pop()}
      </a>
    );
  });
}

function ChipGoiY({ text, onPick, disabled }: { text: string; onPick: (t: string) => void; disabled: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onPick(text)}
      className="block w-full cursor-pointer rounded-lg border border-border bg-sunk px-3 py-2 text-left text-xs text-ink-2 transition-colors hover:border-border-strong hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
    >
      {text}
    </button>
  );
}

export function CopilotDrawer({ modules }: { modules: ModuleGoiY[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [isPending, startTransition] = useTransition();
  const endRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  // Đóng khi bấm ra ngoài khay hoặc bấm Esc.
  //
  // CỐ Ý KHÔNG dùng mouseleave: người dùng chỉ cần đưa chuột ra ngoài để đọc trang là khay đóng,
  // mất luôn câu đang gõ dở. Bấm-ra-ngoài là hành vi có chủ đích, đúng thói quen của mọi hộp thoại.
  // Trạng thái hội thoại giữ nguyên khi đóng — mở lại vẫn thấy đủ lượt hỏi cũ.
  useEffect(() => {
    if (!open) return;
    const ngoaiKhay = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    const phimEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", ngoaiKhay);
    document.addEventListener("keydown", phimEsc);
    return () => {
      document.removeEventListener("mousedown", ngoaiKhay);
      document.removeEventListener("keydown", phimEsc);
    };
  }, [open]);

  const maModule = maModuleTuDuongDan(pathname);
  const moduleHienTai = maModule ? (modules.find((m) => m.code === maModule) ?? null) : null;
  const goiYMoDau = goiYTheoModule(moduleHienTai);

  // Gợi ý tiếp theo sinh từ nguồn mà câu trả lời CUỐI CÙNG đã dẫn — chỉ hiện khi không đang chờ.
  const cuoi = messages[messages.length - 1];
  const daHoi = messages.filter((m) => m.role === "user").map((m) => m.content);
  const goiYTiep = !isPending && cuoi?.role === "assistant" && !cuoi.refused ? goiYTiepTheo(cuoi.citations, daHoi) : [];

  const send = (text: string) => {
    const question = text.trim();
    if (!question || isPending) return;
    setDraft("");
    setMessages((m) => [...m, { role: "user", content: question, citations: [] }]);
    startTransition(async () => {
      try {
        const r = await askCopilot({ threadId, question, moduleContext: maModule });
        setThreadId(r.threadId);
        setMessages((m) => [...m, { role: "assistant", content: r.answer, citations: r.citations, refused: !r.ok }]);
      } catch {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Không kết nối được tới Copilot. Trang đang mở không bị ảnh hưởng.", citations: [], refused: true },
        ]);
      }
    });
  };

  if (!open)
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Copilot tra cứu thủ tục, tiêu chuẩn, biểu mẫu"
        className="fixed bottom-5 right-5 z-30 flex cursor-pointer items-center gap-2 rounded-full border border-accent-line bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink shadow-lg transition-transform hover:scale-105"
      >
        <svg aria-hidden viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-4 w-4">
          <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h9A2.5 2.5 0 0 1 17 6.5v5a2.5 2.5 0 0 1-2.5 2.5H9l-4 3v-3h-.5A1.5 1.5 0 0 1 3 13Z" strokeLinejoin="round" />
        </svg>
        Copilot
      </button>
    );

  return (
    // Nền dùng bg-surface — đúng token dành cho panel/thẻ nổi, nên khay tách bạch khỏi vùng nội
    // dung chính (vốn là bg-bg) thay vì chỉ dựa vào viền + đổ bóng. Hệ quả bắt buộc: mọi phần tử
    // BÊN TRONG khay phải lùi xuống bg-sunk — nếu để bg-surface thì chúng trùng nền khay và biến
    // mất (bong bóng trả lời, chip gợi ý, ô nhập).
    <aside
      ref={panelRef}
      className="fixed bottom-0 right-0 z-30 flex h-[min(38rem,100dvh)] w-full flex-col border-l border-t border-border bg-surface shadow-2xl sm:bottom-4 sm:right-4 sm:h-[min(38rem,calc(100dvh-2rem))] sm:w-[24rem] sm:rounded-xl sm:border"
    >
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">Copilot tra cứu</p>
          <p className="truncate text-[11px] text-ink-3">
            Chỉ đọc tài liệu đã ban hành · {moduleHienTai ? `${moduleHienTai.code} · ${moduleHienTai.name}` : "M29"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Đóng Copilot"
          className="shrink-0 cursor-pointer rounded-lg border border-border px-2 py-1 text-sm text-ink-2 transition-colors hover:border-border-strong hover:text-ink"
        >
          ✕
        </button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-xs text-ink-2">
              {moduleHienTai
                ? `Hỏi về ${moduleHienTai.name}${moduleHienTai.docId ? ` (${moduleHienTai.docId})` : ""}, biểu mẫu hoặc module khác. Câu trả lời luôn kèm đường dẫn tài liệu gốc.`
                : "Hỏi về thủ tục ETV.Pxx, biểu mẫu, tiêu chuẩn hoặc module. Câu trả lời luôn kèm đường dẫn tài liệu gốc."}
            </p>
            {goiYMoDau.map((g) => (
              <ChipGoiY key={g} text={g} onPick={send} disabled={isPending} />
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] rounded-xl rounded-br-sm bg-accent-soft px-3 py-2 text-sm text-ink"
                  : `max-w-full rounded-xl rounded-bl-sm border px-3 py-2 text-sm ${m.refused ? "border-warn-soft bg-warn-soft text-ink" : "border-border bg-sunk text-ink"}`
              }
            >
              <p className="whitespace-pre-wrap">{m.role === "assistant" ? renderAnswer(m.content) : m.content}</p>
              {m.citations.length > 0 && (
                <ul className="mt-2 space-y-1 border-t border-border pt-2">
                  {m.citations.map((c) => (
                    <li key={c.path} className="text-[11px] leading-snug">
                      <a href={portalHref(c.path)} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                        {c.title}
                        {c.heading ? ` › ${c.heading}` : ""}
                      </a>
                      <span className="block text-ink-3">{c.path}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}

        {goiYTiep.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <p className="text-[11px] text-ink-3">Hỏi tiếp:</p>
            {goiYTiep.map((g) => (
              <ChipGoiY key={g} text={g} onPick={send} disabled={isPending} />
            ))}
          </div>
        )}

        {isPending && <p className="text-xs text-ink-3">Đang tra cứu…</p>}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
        className="border-t border-border p-3"
      >
        <div className="flex items-end gap-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(draft);
              }
            }}
            rows={2}
            placeholder="Hỏi về thủ tục, biểu mẫu, tiêu chuẩn…"
            className="min-h-[2.5rem] flex-1 resize-none rounded-lg border border-border bg-sunk px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-3 focus:border-border-strong"
          />
          <button
            type="submit"
            disabled={isPending || !draft.trim()}
            className="cursor-pointer rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            Gửi
          </button>
        </div>
        {/* Nhãn bắt buộc theo spec §2.5 — hiển thị cố định, không phụ thuộc nội dung câu trả lời. */}
        <p className="mt-2 text-[10px] leading-snug text-ink-3">
          Nội dung do AI tạo — người dùng chịu trách nhiệm kiểm chứng trước khi sử dụng. Mọi lượt hỏi được ghi nhật ký trong M29.
        </p>
      </form>
    </aside>
  );
}
