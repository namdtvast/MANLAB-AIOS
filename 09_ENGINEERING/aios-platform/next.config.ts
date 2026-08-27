import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// Header bảo mật phát trên MỌI response. Đặt ở tầng ứng dụng chứ không ở nginx/Cloudflare vì
// bản dev, bản build cục bộ và bản trên VPS phải cư xử giống nhau, và vì cấu hình reverse
// proxy/CDN nằm ngoài repo này — không có gì trong PR review nhìn thấy nó khi nó bị đổi.
const SECURITY_HEADERS = [
  // Ép HTTPS cho mọi lần truy cập sau. KHÔNG kèm `preload`: đưa vào danh sách preload của trình
  // duyệt là quyết định cho cả tên miền và gần như không rút lại được — việc của chủ tên miền,
  // không phải hệ quả phụ của một thay đổi cấu hình ứng dụng.
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },

  // Nền tảng không nhúng chính nó vào iframe ở bất kỳ trang nào (đã soát toàn bộ src/), nên chặn
  // hẳn — đóng đường clickjacking lên các nút phê duyệt/ban hành, nơi một cú bấm nhầm tạo ra hồ sơ.
  // Hai header cùng một mục đích: X-Frame-Options cho trình duyệt cũ, frame-ancestors là bản thay
  // thế theo chuẩn. CSP ở đây CỐ Ý chỉ có frame-ancestors — xem ghi chú cuối file.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },

  // Không đoán kiểu nội dung theo phần thân: một tệp đính kèm không thể tự biến thành script vì
  // trình duyệt "đoán" nó là JavaScript.
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Đi sang site khác chỉ lộ origin, không lộ đường dẫn — đường dẫn của nền tảng mang mã hồ sơ
  // và mã module (/modules/M13/ncw/<id>), tự nó đã là thông tin nghiệp vụ.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // Không trang nào dùng camera/micro/định vị/thanh toán/USB (đã soát src/: không có
  // getUserMedia, mediaDevices hay geolocation). Tắt sẵn để một thư viện thêm sau không lặng lẽ xin.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  // Puppeteer nạp Chromium từ ổ đĩa lúc chạy — gói vào bundle sẽ hỏng đường dẫn thực thi.
  // Xem node_modules/next/dist/docs/01-app/02-guides/package-bundling.md.
  serverExternalPackages: ["puppeteer"],
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;

// CHƯA LÀM — CSP đầy đủ (script-src/style-src). Không phải quên, mà là vì nó không cùng cỡ với
// các header trên: nền tảng có script nội tuyến trong src/app/layout.tsx (đặt sẵn chủ đề sáng/tối
// trước khi React hydrate) và style nội tuyến trong M26/print/PrintFrame.tsx, cộng với script
// hydrate do chính Next sinh ra. Siết script-src mà không phát nonce cho cả ba chỗ đó thì trang
// trắng chứ không phải "kém an toàn hơn một chút". Làm đúng cần: phát nonce trong src/proxy.ts,
// đọc lại qua headers() ở layout, truyền xuống PrintFrame, rồi verify bằng bản chạy thật — một
// thay đổi riêng, có preview, không ghép vào đây.
