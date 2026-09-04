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

  // Tài khoản bị tạm khóa/thu hồi vẫn còn cookie phiên, nên req.auth vẫn có — thứ phân biệt là
  // cờ biKhoa do session callback đặt (src/lib/auth.ts). Đẩy về /login kèm lý do chung chung,
  // không phân biệt tạm khóa với thu hồi: /login là bề mặt công khai.
  if (req.auth?.user?.biKhoa) {
    if (pathname === "/login") return;
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("loi", "khoa");
    return NextResponse.redirect(loginUrl);
  }

  if (!req.auth && !isPublic) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
