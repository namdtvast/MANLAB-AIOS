// Kiểm tra toàn bộ file HDSD.yaml trong 05_MODULE_LIBRARY bằng CHÍNH hàm parseHdsd() mà
// prisma/seed.ts dùng — không viết lại luật kiểm tra ở hai nơi.
//
// Vì sao cần: seed là chỗ duy nhất phát hiện HDSD soạn sai lược đồ, mà seed lại đòi có
// Postgres. Script này chạy được trên máy sạch và trong CI (không cần DATABASE_URL), nên
// lỗi soạn thảo bị bắt ngay lúc mở PR thay vì lúc ai đó chạy seed.
//
//   npx tsx scripts/kiem-tra-hdsd.ts
//
// Thoát 0 nếu mọi file hợp lệ, khác 0 nếu có file sai lược đồ.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import { parseHdsd } from "../src/lib/hdsd";

const MODULE_LIB = join(__dirname, "..", "..", "..", "05_MODULE_LIBRARY");

let daKiem = 0;
const loi: string[] = [];

for (const dirName of readdirSync(MODULE_LIB).sort()) {
  const match = dirName.match(/^M(\d{2})_/);
  if (!match) continue;
  const rel = `05_MODULE_LIBRARY/${dirName}/04_UI/HDSD.yaml`;
  const abs = join(MODULE_LIB, dirName, "04_UI", "HDSD.yaml");
  if (!existsSync(abs)) continue;

  daKiem += 1;
  try {
    const hdsd = parseHdsd(yaml.load(readFileSync(abs, "utf8")), `M${match[1]}`);
    console.log(`✓ ${rel} — ${hdsd.steps.length} bước, ${hdsd.tips.length} lưu ý`);
  } catch (e) {
    loi.push(`✗ ${rel}: ${(e as Error).message}`);
  }
}

console.log(`\nĐã kiểm ${daKiem} file HDSD.yaml.`);
if (loi.length > 0) {
  console.error(`\n${loi.length} file sai lược đồ:`);
  for (const l of loi) console.error(l);
  process.exit(1);
}
