import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  // Puppeteer nạp Chromium từ ổ đĩa lúc chạy — gói vào bundle sẽ hỏng đường dẫn thực thi.
  // Xem node_modules/next/dist/docs/01-app/02-guides/package-bundling.md.
  serverExternalPackages: ["puppeteer"],
};

export default nextConfig;
