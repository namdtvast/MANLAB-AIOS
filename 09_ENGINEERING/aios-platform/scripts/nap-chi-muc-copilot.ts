// Nạp chỉ mục tri thức cho Copilot tra cứu — Increment 3 của
// 05_MODULE_LIBRARY/M29_AI/01_Requirement/_work/20260825-copilot-tra-cuu/plan.md.
//
// NGUYÊN TẮC FAIL-CLOSED (E1 trong q1-anh-xa-muc-bao-mat.md cùng thư mục đặc tả): một tài liệu chỉ vào chỉ mục khi
// khớp một LỚP ĐƯỢC PHÉP ở bảng dưới VÀ nhãn mức bảo mật của chính nó (nếu có) thuộc
// {Công khai, Nội bộ} VÀ trạng thái là Đã phê duyệt (với lớp yêu cầu). Mọi trường hợp còn lại —
// kể cả "chưa gán mức" — đều BỊ BỎ QUA, không có nhánh mặc định cho qua.
//
// Cơ sở: ETV.P29 §5.5 (chỉ mức Công khai/Nội bộ vào chỉ mục AI), ETV.P26 §5.5 (đồng thời phải
// Đã phê duyệt), ETV.P28 §2 (4 mức thống nhất toàn Viện — KHÔNG tạo hệ phân loại riêng cho AI).
//
// Chạy:  npm run nap-chi-muc-copilot
// Nạp lại toàn bộ trong MỘT giao dịch: tài liệu bị hạ mức hoặc hết hiệu lực biến mất khỏi chỉ
// mục ngay trong cùng giao dịch, không để trạng thái nửa vời (E4, AC-13).
import "dotenv/config";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { tachTuChoChiMuc } from "../src/lib/m29/copilot/text";
import { maTaiLieuTuDuongDan } from "../src/lib/m29/copilot/goi-y";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) });

const SCRIPT_DIR = fileURLToPath(new URL(".", import.meta.url));
const REPO_ROOT = join(SCRIPT_DIR, "..", "..", "..");

type Level = "Cong-khai" | "Noi-bo";

interface DocClass {
  code: string;
  label: string;
  /** Đường dẫn tương đối từ gốc repo. */
  roots: string[];
  defaultLevel: Level;
  /** Đòi trạng thái Đã phê duyệt trong frontmatter (lớp tài liệu kiểm soát). */
  requireApproved: boolean;
  /** Lọc thêm theo đường dẫn tương đối — dùng cho lớp chỉ lấy vài file trong cây lớn. */
  accept?: (relPath: string) => boolean;
}

// Bảng lớp tài liệu — ánh xạ §3 của q1-anh-xa-muc-bao-mat.md. Sửa bảng này là quyết định quản
// trị (PT.ATTT + LĐV duyệt), không phải tinh chỉnh kỹ thuật.
const ALLOWED: DocClass[] = [
  { code: "QM", label: "Sổ tay chất lượng", roots: ["03_MANAGEMENT_SYSTEM/01_QM"], defaultLevel: "Noi-bo", requireApproved: true },
  { code: "THU_TUC", label: "Thủ tục ETV.Pxx", roots: ["03_MANAGEMENT_SYSTEM/02_P"], defaultLevel: "Noi-bo", requireApproved: true },
  {
    code: "BIEU_MAU",
    label: "Biểu mẫu gốc chưa điền",
    roots: ["03_MANAGEMENT_SYSTEM/04_F", "06_SHARED_RESOURCES/01_Forms"],
    defaultLevel: "Noi-bo",
    requireApproved: true,
  },
  {
    code: "HUB_MP",
    label: "Hub thủ tục (04_PROCESS_LIBRARY)",
    roots: ["04_PROCESS_LIBRARY"],
    defaultLevel: "Noi-bo",
    requireApproved: false,
    accept: (p) => /^04_PROCESS_LIBRARY\/MP\d\d_[^/]+\/README\.md$/.test(p),
  },
  {
    code: "DAC_TA_MODULE",
    label: "Đặc tả module (05_MODULE_LIBRARY)",
    roots: ["05_MODULE_LIBRARY"],
    defaultLevel: "Noi-bo",
    requireApproved: false,
    accept: (p) => /^05_MODULE_LIBRARY\/M\d\d_[^/]+\/(README\.md|01_Requirement\/DacTa\.md)$/.test(p),
  },
  {
    code: "NANG_LUC",
    label: "Năng lực nghiệp vụ (02_CAPABILITIES)",
    roots: ["02_CAPABILITIES"],
    defaultLevel: "Noi-bo",
    requireApproved: false,
    accept: (p) => /^02_CAPABILITIES\/CAP-\d\d_[^/]+\/README\.md$/.test(p),
  },
  {
    code: "WIKI",
    label: "Tri thức đã biên soạn (08_KNOWLEDGE_GRAPH)",
    roots: ["08_KNOWLEDGE_GRAPH/Wiki", "08_KNOWLEDGE_GRAPH/06_FAQ"],
    defaultLevel: "Noi-bo",
    requireApproved: false,
  },
];

// Lớp bị CẤM nạp — liệt kê tường minh để báo cáo nói rõ vì sao bỏ, thay vì im lặng. Đây cũng là
// danh sách để kiểm tra E3 (CI chặn nếu một file trong các lớp này khai mức Công khai/Nội bộ).
export const BLOCKED: { roots: string[]; reason: string }[] = [
  { roots: ["03_MANAGEMENT_SYSTEM/03_M"], reason: "84 SOP chưa rà mức Nội bộ/Hạn chế từng file (Q1 §5 việc #2) — fail-closed" },
  { roots: ["03_MANAGEMENT_SYSTEM/05_R"], reason: "Hồ sơ đã điền — Hạn chế/Mật theo ETV.P02 §4.1" },
  { roots: ["06_SHARED_RESOURCES/06_Customers"], reason: "Dữ liệu khách hàng — ISO/IEC 17025 §4.2" },
  { roots: ["06_SHARED_RESOURCES/08_Personnel"], reason: "Hồ sơ nhân sự — NĐ 13/2023/NĐ-CP" },
  { roots: ["11_COMPLIANCE"], reason: "Bằng chứng, hồ sơ đánh giá, KPH/CAPA — Hạn chế" },
  {
    roots: [
      "08_KNOWLEDGE_GRAPH/00_RAW_DATA",
      "08_KNOWLEDGE_GRAPH/02_ISO",
      "08_KNOWLEDGE_GRAPH/03_DLVN",
      "08_KNOWLEDGE_GRAPH/04_TCVN",
      "08_KNOWLEDGE_GRAPH/14_Technical_References",
    ],
    reason: "Toàn văn tiêu chuẩn có bản quyền — Hạn chế",
  },
  { roots: ["12_RESEARCH"], reason: "Nghiên cứu chưa công bố — Hạn chế (MP27)" },
];

const APPROVED_STATUS = new Set(["Da-phe-duyet", "issued", "Ban-hanh"]);
const VALID_LEVELS = new Set<string>(["Cong-khai", "Noi-bo"]);
const SKIP_DIRS = new Set(["node_modules", ".git", ".next", "docs", "_meta", "Output_Codex"]);

interface Frontmatter {
  title?: string;
  doc_name?: string;
  permission?: string;
  status?: string;
  doc_status?: string;
}

function parseFrontmatter(raw: string): { fm: Frontmatter; body: string } {
  if (!raw.startsWith("---")) return { fm: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { fm: {}, body: raw };
  try {
    const fm = (yaml.load(raw.slice(4, end)) ?? {}) as Frontmatter;
    return { fm, body: raw.slice(end + 4) };
  } catch {
    // Frontmatter hỏng ⇒ coi như không có nhãn ⇒ sẽ bị loại ở bước kiểm mức bảo mật.
    return { fm: {}, body: raw.slice(end + 4) };
  }
}

function walk(dir: string, out: string[] = []): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (SKIP_DIRS.has(name) || name.startsWith(".")) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (name.endsWith(".md")) out.push(full);
  }
  return out;
}

function classOf(relPath: string): DocClass | null {
  for (const c of ALLOWED) {
    if (!c.roots.some((r) => relPath === r || relPath.startsWith(`${r}/`))) continue;
    if (c.accept && !c.accept(relPath)) return null;
    return c;
  }
  return null;
}

function blockedReason(relPath: string): string | null {
  for (const b of BLOCKED) if (b.roots.some((r) => relPath.startsWith(`${r}/`))) return b.reason;
  return null;
}

interface Chunk {
  heading: string;
  content: string;
}

const MAX_CHUNK = 2200;

/** Cắt tài liệu theo tiêu đề mục; mục quá dài thì cắt tiếp theo đoạn văn. */
function chunk(body: string): Chunk[] {
  const lines = body.split("\n");
  const sections: Chunk[] = [];
  let heading = "";
  let buf: string[] = [];
  const flush = () => {
    const content = buf.join("\n").trim();
    if (content.length >= 40) sections.push({ heading, content });
    buf = [];
  };
  for (const line of lines) {
    const m = /^(#{1,3})\s+(.*)$/.exec(line);
    if (m) {
      flush();
      heading = m[2].trim();
      continue;
    }
    buf.push(line);
  }
  flush();

  const out: Chunk[] = [];
  for (const s of sections) {
    if (s.content.length <= MAX_CHUNK) {
      out.push(s);
      continue;
    }
    let cur: string[] = [];
    let size = 0;
    for (const para of s.content.split(/\n{2,}/)) {
      if (size + para.length > MAX_CHUNK && cur.length) {
        out.push({ heading: s.heading, content: cur.join("\n\n") });
        cur = [];
        size = 0;
      }
      cur.push(para);
      size += para.length + 2;
    }
    if (cur.length) out.push({ heading: s.heading, content: cur.join("\n\n") });
  }
  return out;
}

interface Row {
  path: string;
  title: string;
  heading: string;
  docClass: string;
  securityLevel: string;
  approvalRef: string;
  ordinal: number;
  content: string;
  searchTitle: string;
  searchText: string;
}

async function main() {
  const files = walk(REPO_ROOT);
  const rows: Row[] = [];
  const skipped = { ngoaiLop: 0, camNap: 0, chuaPheDuyet: 0, mucKhongHopLe: 0 };
  const blockedSamples = new Map<string, number>();
  const docs = new Set<string>();

  for (const full of files) {
    const relPath = relative(REPO_ROOT, full).split(sep).join("/");

    const reason = blockedReason(relPath);
    if (reason) {
      skipped.camNap++;
      blockedSamples.set(reason, (blockedSamples.get(reason) ?? 0) + 1);
      continue;
    }

    const cls = classOf(relPath);
    if (!cls) {
      skipped.ngoaiLop++;
      continue;
    }

    const raw = readFileSync(full, "utf8");
    const { fm, body } = parseFrontmatter(raw);

    // Mức của từng file khi đã gán thì THẮNG mức lớp (q1 §3). Gán sai giá trị ⇒ loại.
    const level = fm.permission?.trim() ? fm.permission.trim() : cls.defaultLevel;
    if (!VALID_LEVELS.has(level)) {
      skipped.mucKhongHopLe++;
      continue;
    }

    // doc_status ưu tiên hơn status khi có cả hai (tài liệu kiểm soát khai doc_status).
    const status = (fm.doc_status ?? fm.status ?? "").trim();
    if (cls.requireApproved && !APPROVED_STATUS.has(status)) {
      skipped.chuaPheDuyet++;
      continue;
    }

    const title =
      fm.doc_name?.trim() ||
      fm.title?.trim() ||
      /^#\s+(.+)$/m.exec(body)?.[1]?.trim() ||
      relPath.split("/").pop()!.replace(/\.md$/, "");

    const chunks = chunk(body);
    if (!chunks.length) continue;
    docs.add(relPath);
    chunks.forEach((c, i) => {
      rows.push({
        path: relPath,
        title,
        heading: c.heading,
        docClass: cls.code,
        securityLevel: level,
        approvalRef: status || "(lớp không yêu cầu phê duyệt)",
        ordinal: i,
        content: c.content,
        // MÃ TÀI LIỆU đứng ĐẦU searchTitle (hạng A) — không phải để đẹp, mà vì ts_rank KHÔNG
        // tính độ hiếm của từ: "p13" và "quy" đóng góp như nhau nếu cùng hạng. Trước khi thêm
        // dòng này, mã tài liệu chỉ nằm rải rác trong thân bài (hạng D, 0.05) — đo ngày
        // 29/08/2026: chỉ 1 trong 13 đoạn của ETV.P13 mang "p13" ở hạng A. Hệ quả là câu hỏi
        // "Thủ tục ETV.P13 quy định những gì?" bị ETV.P18 (giàu "quy"/"định") chiếm trọn 6 chỗ
        // và không đoạn nào của chính ETV.P13 tới được prompt.
        searchTitle: tachTuChoChiMuc(`${maTaiLieuTuDuongDan(relPath) ?? ""} ${title} ${c.heading}`),
        searchText: tachTuChoChiMuc(c.content),
      });
    });
  }

  await prisma.$transaction(async (tx) => {
    await tx.copilotDocChunk.deleteMany({});
    for (let i = 0; i < rows.length; i += 500) await tx.copilotDocChunk.createMany({ data: rows.slice(i, i + 500) });
    // tsvector không khai được qua Prisma Client (kiểu Unsupported) — cập nhật bằng raw SQL
    // TRONG CÙNG giao dịch để không tồn tại khoảnh khắc chỉ mục có dòng nhưng chưa tìm được.
    await tx.$executeRawUnsafe(
      `UPDATE "CopilotDocChunk" SET "tsv" =
         setweight(to_tsvector('simple', "searchTitle"), 'A') ||
         setweight(to_tsvector('simple', "searchText"), 'D')`
    );
  });

  const byClass = new Map<string, number>();
  for (const r of rows) byClass.set(r.docClass, (byClass.get(r.docClass) ?? 0) + 1);

  console.log(`Đã nạp ${rows.length} đoạn từ ${docs.size} tài liệu vào chỉ mục Copilot.`);
  for (const c of ALLOWED) console.log(`  ${c.code.padEnd(14)} ${String(byClass.get(c.code) ?? 0).padStart(5)} đoạn — ${c.label}`);
  console.log("Bỏ qua (fail-closed):");
  console.log(`  ${String(skipped.camNap).padStart(5)} file thuộc lớp CẤM nạp`);
  for (const [reason, n] of blockedSamples) console.log(`        ${String(n).padStart(4)} — ${reason}`);
  console.log(`  ${String(skipped.chuaPheDuyet).padStart(5)} file chưa ở trạng thái Đã phê duyệt`);
  console.log(`  ${String(skipped.mucKhongHopLe).padStart(5)} file có mức bảo mật trống/không hợp lệ`);
  console.log(`  ${String(skipped.ngoaiLop).padStart(5)} file không thuộc lớp nào được phép`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
