#!/usr/bin/env node
// build.js — Tái tạo bản Word (.docx) của một thủ tục từ file nội dung trong docs/.
// Dùng: node build.js ETV.P14        → xuất ETV.P14_KiemSoatTaiLieu.docx vào thư mục procedures.
//       node build.js ETV.P14 ./out  → xuất vào thư mục ./out.
// Bản nguồn kiểm soát là file .md; script này chỉ dựng bản phát hành .docx theo đúng thể thức ETV.

const fs = require("fs");
const path = require("path");
const L = require("./etv-docx-lib");

const name = process.argv[2];
if (!name) {
  console.error("Thiếu tên tài liệu. Ví dụ: node build.js ETV.P14");
  console.error("Các tài liệu có sẵn:", fs.readdirSync(path.join(__dirname, "docs")).filter(f => f.endsWith(".js")).map(f => f.replace(/\.js$/, "")).join(", "));
  process.exit(1);
}

const docModulePath = path.join(__dirname, "docs", `${name}.js`);
if (!fs.existsSync(docModulePath)) {
  console.error(`Không tìm thấy nội dung: docs/${name}.js`);
  process.exit(1);
}

const { cfg, body } = require(docModulePath);

// Đích mặc định: thư mục procedures của ISO17025. Tên file khớp bản .md nếu có.
const defaultDir = path.resolve(__dirname, "../../03_MANAGEMENT_SYSTEM/03_ISO17025/procedures");
const outDir = process.argv[3] ? path.resolve(process.argv[3]) : defaultDir;
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Suy ra tên file .docx từ bản .md cùng thư mục (nếu có), ngược lại dùng cfg.
let outName = cfg.fileBase;
if (!outName) {
  const md = fs.existsSync(outDir) ? fs.readdirSync(outDir).find(f => f.startsWith(name.replace(/\s/g, "")) && f.endsWith(".md") && !f.includes("PhanTich")) : null;
  outName = md ? md.replace(/\.md$/, "") : `${name.replace(/\s/g, "")}`;
}
const outFile = path.join(outDir, `${outName}.docx`);

L.buildDoc(cfg, body).then(buf => {
  fs.writeFileSync(outFile, buf);
  console.log(`✓ Đã tạo: ${outFile} (${buf.length} bytes)`);
}).catch(e => { console.error("Lỗi khi dựng Word:", e); process.exit(1); });
