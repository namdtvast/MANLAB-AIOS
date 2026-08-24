import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Bộ test đầu tiên của aios-platform. Phạm vi hiện tại: logic nghiệp vụ M29 ở `src/lib/m29`
// (quyết định chuyển trạng thái, phân quyền, Tool Gateway, vòng quét AIA, cổng triển khai).
// Prisma được giả lập trong từng file test nên KHÔNG cần Postgres để chạy — `npm test` chạy được
// trên máy sạch và trong CI.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/__tests__/**/*.test.ts"],
    globals: false,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
