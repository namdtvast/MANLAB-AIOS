import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// /api/m29/sweep là điểm gọi cho lịch quét bên ngoài (cron) — không có session người dùng nên
// phải nằm ngoài chặn đăng nhập; chính route đó tự xác thực bằng header x-m29-sweep-token và
// trả 503 khi chưa cấu hình token, không bao giờ mở public (ETV.P29 mục 5.2.3).
//
// Hai danh sách tách nhau vì "/" phải khớp ĐÚNG: mọi đường dẫn đều bắt đầu bằng "/", đưa nó
// vào nhóm khớp tiền tố là mở toang toàn hệ thống.
const PUBLIC_EXACT = ["/"];
const PUBLIC_PREFIXES = ["/login", "/dang-ky", "/api/auth", "/api/m29/sweep"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isPublic =
    PUBLIC_EXACT.includes(pathname) || PUBLIC_PREFIXES.some((p) => pathname.startsWith(p));

  if (!req.auth && !isPublic) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
