"use client";

// Ghi kết luận Đạt/Không đạt cho một lượt đánh giá chất lượng (ETV.P.F29.03).
//
// Vì sao màn hình này phải có: `deploymentGate()` chỉ mở khi lượt đánh giá GẦN NHẤT ở trạng thái
// Đạt, mà trạng thái đó chỉ `ghiKetLuanDanhGia()` đặt được — và trước đây hàm ấy không có một nút
// bấm nào gọi tới. Hệ quả: trình chạy đo xong ghi CHO_KET_LUAN, rồi không ai kết luận được bằng
// giao diện, nên không phiên bản lời nhắc mới nào kích hoạt nổi. Cổng kiểm soát đóng vĩnh viễn
// không phải là kiểm soát chặt, mà là kiểm soát hỏng.
//
// Phần mềm KHÔNG gợi ý nên kết luận gì. Nó chỉ bày ra số đo và bắt dẫn số phiếu đã ký; Đạt hay
// Không đạt là chữ ký của người có thẩm quyền (ETV.P29 §4.8).
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ghiKetLuanDanhGia } from "@/lib/m29/actions";
import { EVALUATION_RUN_STATUS_LABEL, EVALUATION_RUN_STATUS_TONE } from "@/lib/m29/labels";

const btn = "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

export interface RunTomTat {
  id: string;
  suiteName: string;
  status: string;
  passCount: number;
  failCount: number;
  createdAt: string;
}

export function EvaluationPanel({ runs, canWrite }: { runs: RunTomTat[]; canWrite: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ tone: "good" | "crit"; text: string } | null>(null);
  const [soPhieu, setSoPhieu] = useState("");
  const [dangMo, setDangMo] = useState<string | null>(null);

  const ghi = (runId: string, ketLuan: "PASS" | "FAIL") => {
    setMessage(null);
    startTransition(async () => {
      const r = await ghiKetLuanDanhGia(runId, ketLuan, soPhieu);
      if (!r.ok) setMessage({ tone: "crit", text: r.message });
      else {
        setMessage({ tone: "good", text: `Đã ghi kết luận ${EVALUATION_RUN_STATUS_LABEL[r.status]} theo phiếu ${soPhieu.trim()}.` });
        setSoPhieu("");
        setDangMo(null);
        router.refresh();
      }
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <h2 className="font-head text-sm font-bold text-ink">Đánh giá chất lượng (ETV.P.F29.03)</h2>
      {/* Nói rõ lượt nào quyết định cổng: người ký cần biết chữ ký của mình mở hay không mở được
          việc kích hoạt cấu hình mới. */}
      <p className="text-xs text-ink-3">
        Cổng triển khai (ETV.P29 mục 5.3.1) chỉ đọc <strong className="text-ink-2">lượt gần nhất</strong>. Chừng nào lượt đó chưa có kết luận Đạt thì không
        kích hoạt được phiên bản lời nhắc mới.
      </p>

      {message && (
        <p className={`rounded-lg px-3 py-2 text-sm ${message.tone === "good" ? "border border-good/30 bg-good-soft text-good" : "border border-crit/30 bg-crit-soft text-crit"}`}>
          {message.text}
        </p>
      )}

      {runs.length === 0 && <p className="text-xs text-ink-3">Chưa chạy lượt đánh giá nào.</p>}

      <div className="flex flex-col gap-2">
        {runs.map((r, i) => (
          <div key={r.id} className="rounded-lg border border-border bg-bg p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[EVALUATION_RUN_STATUS_TONE[r.status] ?? "neutral"]}`}>
                  {EVALUATION_RUN_STATUS_LABEL[r.status] ?? r.status}
                </span>
                <span className="text-sm text-ink">
                  {r.passCount} đạt / {r.failCount} lỗi
                </span>
                {i === 0 && <span className="text-xs text-warn">← lượt quyết định cổng triển khai</span>}
              </span>
              <span className="font-mono text-xs text-ink-3">{r.createdAt}</span>
            </div>
            <p className="mt-1 text-xs text-ink-3">
              {r.suiteName} · <span className="font-mono">{r.id}</span>
            </p>

            {canWrite && r.status === "CHO_KET_LUAN" && (
              <div className="mt-2">
                {dangMo === r.id ? (
                  <div className="flex flex-col gap-2">
                    {/* Cảnh báo đặt ngay trên ô nhập, không nhét xuống chân trang: đây là chỗ người
                        ta sắp ký, và bốn nhóm bắt buộc là thứ hay bị bỏ sót nhất khi chỉ nhìn
                        tổng số câu đạt. */}
                    <p className="rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-xs text-warn">
                      Chỉ ghi Đạt khi phiếu F29.03 đã ký kết luận như vậy. Tổng số câu đạt KHÔNG thay cho điều kiện bắt buộc: chỉ cần một trong bốn nhóm 3, 4, 5, 7
                      dưới ngưỡng thì kết luận chung là Không đạt.
                    </p>
                    <input
                      value={soPhieu}
                      onChange={(e) => setSoPhieu(e.target.value)}
                      placeholder="Số phiếu ETV.P.F29.03 đã ký, ví dụ F29.03/2026-07"
                      className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line"
                    />
                    <div className="flex flex-wrap gap-2">
                      <button className={btn} disabled={isPending || !soPhieu.trim()} onClick={() => ghi(r.id, "PASS")}>
                        Ghi kết luận Đạt
                      </button>
                      <button className={btnGhost} disabled={isPending || !soPhieu.trim()} onClick={() => ghi(r.id, "FAIL")}>
                        Ghi kết luận Không đạt
                      </button>
                      <button className={btnGhost} disabled={isPending} onClick={() => setDangMo(null)}>
                        Hủy
                      </button>
                    </div>
                  </div>
                ) : (
                  <button className={btnGhost} disabled={isPending} onClick={() => setDangMo(r.id)}>
                    Ghi kết luận theo phiếu F29.03
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
