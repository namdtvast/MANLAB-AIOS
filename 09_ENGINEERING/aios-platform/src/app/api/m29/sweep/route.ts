// Điểm gọi cho lịch quét bên ngoài (cron/systemd timer/GitHub Action) — ETV.P29 mục 5.2.3 yêu cầu
// việc phát hiện AIA quá hạn diễn ra theo lịch, không phụ thuộc người bấm nút.
//
// Xác thực bằng header `x-m29-sweep-token` khớp biến môi trường `M29_SWEEP_TOKEN`. KHÔNG cấu hình
// biến này thì route trả 503 và không chạy — không bao giờ mở public, vì sweep là thao tác ghi.
import { NextResponse } from "next/server";
import { sweepAiaReview } from "@/lib/m29/sweep";

export async function POST(request: Request) {
  const expected = process.env.M29_SWEEP_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { ok: false, code: "SWEEP_TOKEN_NOT_CONFIGURED", message: "Chưa cấu hình M29_SWEEP_TOKEN — điểm gọi quét theo lịch đang tắt." },
      { status: 503 }
    );
  }
  if (request.headers.get("x-m29-sweep-token") !== expected) {
    return NextResponse.json({ ok: false, code: "UNAUTHORIZED", message: "Token quét không hợp lệ." }, { status: 401 });
  }

  const result = await sweepAiaReview();
  return NextResponse.json({ ok: true, ...result });
}
