// Seed: quét trực tiếp 05_MODULE_LIBRARY/ và 04_PROCESS_LIBRARY/ của repo để nạp
// danh sách 38 module vào bảng PlatformModule — một nguồn sự thật duy nhất
// (tên module lấy từ manifest.yaml của MPxx tương ứng), không hardcode 2 nơi.
import "dotenv/config";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { join, relative as relative_ } from "node:path";
import yaml from "js-yaml";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
// Prisma nhập dạng giá trị (không phải `import type`) vì cần Prisma.DbNull để ghi NULL cho cột Json.
import { Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { BO_CAU_HOI, TAT_CA_CA } from "../src/lib/m29/copilot/bo-cau-hoi-vang";
import { parseHdsd, type Hdsd } from "../src/lib/hdsd";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Mật khẩu của các tài khoản demo — KHÔNG viết cứng trong repo. Repo này công khai trên
// GitHub, nên một mật khẩu ghi thẳng ở đây là mật khẩu ai cũng đọc được, dùng chung cho
// khoảng 11 tài khoản, trong đó có một tài khoản quyền ADMIN.
//
//   SEED_DEMO_PASSWORD có đặt → dùng đúng giá trị đó (đội dev thống nhất một mật khẩu).
//   không đặt                 → sinh ngẫu nhiên và in ra một lần ở cuối lần chạy seed.
//
// Mọi upsert tài khoản trong file này đều dùng `update: {}`, nên chạy lại seed KHÔNG đổi
// mật khẩu của tài khoản đã tồn tại — giá trị sinh ngẫu nhiên chỉ áp cho tài khoản mới tạo.
// Đó cũng là lý do chạy seed lần hai không làm hỏng đăng nhập của môi trường đang chạy.
const DEMO_PASSWORD_FROM_ENV = process.env.SEED_DEMO_PASSWORD;
const DEMO_PASSWORD = DEMO_PASSWORD_FROM_ENV ?? randomBytes(12).toString("base64url");

/** In tình trạng mật khẩu demo sau khi seed xong — chỗ duy nhất lộ giá trị sinh ngẫu nhiên. */
function baoCaoMatKhauDemo() {
  if (DEMO_PASSWORD_FROM_ENV) {
    console.log("Tài khoản demo dùng mật khẩu lấy từ biến môi trường SEED_DEMO_PASSWORD.");
  } else {
    console.log(`Mật khẩu tài khoản demo (sinh ngẫu nhiên cho lần chạy này): ${DEMO_PASSWORD}`);
    console.log("Ghi lại ngay — giá trị này không được lưu ở đâu khác. Đặt SEED_DEMO_PASSWORD nếu muốn cố định.");
  }
  console.log("Tài khoản demo chỉ dành cho dev/demo — xoá hoặc đổi mật khẩu trước khi đưa ra môi trường thật.");
}

// aios-platform nằm tại 09_ENGINEERING/aios-platform — lùi 3 cấp để tới gốc repo.
const REPO_ROOT = join(__dirname, "..", "..", "..");
const MODULE_LIB = join(REPO_ROOT, "05_MODULE_LIBRARY");
const PROCESS_LIB = join(REPO_ROOT, "04_PROCESS_LIBRARY");

// Module đã xây thật trong aios-platform (di trú từ 08_Source hoặc xây mới từ DacTa.md — xem
// DEPLOYMENT.md). M01 xây mới từ 05_MODULE_LIBRARY/M01_RuiRo/01_Requirement/DacTa.md (Increment 4).
// M03 xây mới từ 05_MODULE_LIBRARY/M03_NhanSu/01_Requirement/DacTa.md (Increment 5).
// M02 xây mới từ 05_MODULE_LIBRARY/M02_BaoMat/01_Requirement/DacTa.md (Increment 6).
// M04 xây mới từ 05_MODULE_LIBRARY/M04_MoiTruong/01_Requirement/DacTa.md (Increment 7).
// M16 xây mới từ 05_MODULE_LIBRARY/M16_DanhGiaNoiBo/01_Requirement/DacTa.md (Increment 8).
// M17 xây mới từ 05_MODULE_LIBRARY/M17_XemXetLanhDao/01_Requirement/DacTa.md (Increment 9).
// M25 xây mới từ 05_MODULE_LIBRARY/M25_BoiCanh/01_Requirement/DacTa.md (chưa có ETV.P25).
// M27 xây từ ETV.P27 (lần BH 01, ban hành 26/08/2026) — danh mục tài sản thông tin.
const ACTIVE_MODULE_CODES = new Set(["M01", "M02", "M03", "M04", "M10", "M12", "M13", "M14", "M16", "M17", "M21", "M25", "M26", "M27", "M29", "M33", "M34"]);

interface MpManifest {
  name?: string;
  // Mục tiêu cô đọng của thủ tục — chắt từ mục "MỤC ĐÍCH" của chính văn bản ETV.Pxx.
  // MP chưa ban hành thủ tục thì không khai; banner không bịa mục tiêu hộ.
  purpose?: string;
  owner?: string;
  capabilities?: string[];
  module?: string;
  menu_group?: string;
  menu_order?: number;
  standards?: string[];
  legal?: string[];
  // Khối căn cứ pháp lý — xem _meta/SCHEMA.md. MP chưa ban hành thủ tục thì
  // không khai khối này; nền tảng hiển thị "chưa ban hành" thay vì bịa căn cứ.
  document?: {
    doc_id?: string;
    doc_title?: string;
    doc_status?: string;
    doc_version?: string;
    issued_date?: string | Date;
    iso_clauses?: string[];
    controlled_file?: string;
  };
  forms?: string[];
}

interface MpLinks {
  procedure?: string;
  form_files?: string[];
}

// Biểu mẫu hiển thị trên banner căn cứ: mã + tên đọc được + đường dẫn trong repo.
interface FormRef {
  code: string;
  title: string;
  path: string | null;
  // Lần ban hành + ngày ban hành của chính biểu mẫu (khác lần ban hành của thủ tục). Bản xuất
  // PDF in hai giá trị này lên đầu tờ biểu mẫu — nạp sẵn ở đây để lúc chạy không phải đọc file
  // trong repo (đọc filesystem động khiến Next đóng gói cả repo vào bundle deploy).
  revision: string | null;
  effectiveDate: string | null; // giữ nguyên dạng dd/mm/yyyy như trong file gốc
}

// Nhóm menu hợp lệ — đối chiếu với _meta/SCHEMA.md (manlab-aios/process@1.1).
// Module khai nhóm lạ hoặc không khai đều rơi về DEFAULT_MENU_GROUP kèm cảnh báo:
// thà xếp sai nhóm còn hơn biến mất khỏi menu.
const MENU_GROUPS = new Set([
  "DIEU_HANH",
  "NGUON_LUC",
  "KHACH_HANG",
  "KY_THUAT",
  "CHAT_LUONG",
  "DU_LIEU_SO",
  "CONG_NGHE",
]);
const DEFAULT_MENU_GROUP = "CHAT_LUONG";

function findMpDir(num: string): string | null {
  const prefix = `MP${num}_`;
  return readdirSync(PROCESS_LIB).find((d) => d.startsWith(prefix)) ?? null;
}

function loadYaml<T>(path: string): T | null {
  if (!existsSync(path)) return null;
  return yaml.load(readFileSync(path, "utf8")) as T;
}

function findMpManifest(num: string): MpManifest | null {
  const dir = findMpDir(num);
  return dir ? loadYaml<MpManifest>(join(PROCESS_LIB, dir, "manifest.yaml")) : null;
}

function findMpLinks(num: string): MpLinks | null {
  const dir = findMpDir(num);
  return dir ? loadYaml<MpLinks>(join(PROCESS_LIB, dir, "links.yaml")) : null;
}

// links.yaml dùng đường dẫn tương đối tính từ thư mục MPxx (vd "../../03_.../ETV.P01_*.md");
// DB lưu đường dẫn tính từ gốc repo để UI hiển thị và deep-link ra cổng tài liệu.
function repoPath(num: string, relative: string): string {
  const dir = findMpDir(num);
  const full = join(PROCESS_LIB, dir ?? "", relative);
  return relative_(REPO_ROOT, full);
}

// Tên/lần ban hành/ngày ban hành của biểu mẫu lấy từ frontmatter của chính file biểu mẫu —
// không chép vào manifest, tránh hai nguồn sự thật lệch nhau.
function readFrontmatterField(head: string[], field: string): string | null {
  const line = head.find((l) => new RegExp(`^${field}:`).test(l));
  if (!line) return null;
  return line.replace(new RegExp(`^${field}:\\s*`), "").replace(/^"|"$/g, "").trim() || null;
}

function readFormFrontmatter(absPath: string): Pick<FormRef, "title" | "revision" | "effectiveDate"> {
  if (!existsSync(absPath)) return { title: "", revision: null, effectiveDate: null };
  const head = readFileSync(absPath, "utf8").split(/\r?\n/).slice(0, 40);
  const revision = readFrontmatterField(head, "revision");
  return {
    title: readFrontmatterField(head, "title") ?? readFrontmatterField(head, "doc_name") ?? "",
    // revision trong YAML có thể là số (3) hoặc chuỗi ("03") — chuẩn hoá về 2 chữ số.
    revision: revision ? revision.padStart(2, "0") : null,
    effectiveDate: readFrontmatterField(head, "effective_date"),
  };
}

// HDSD của module — 05_MODULE_LIBRARY/Mxx_Slug/04_UI/HDSD.yaml. Chưa soạn thì trả null
// (banner ẩn mục HDSD); soạn sai lược đồ thì DỪNG seed kèm tên file, không nạp hướng dẫn cụt.
function buildHdsd(dirName: string, code: string): Hdsd | null {
  const rel = `05_MODULE_LIBRARY/${dirName}/04_UI/HDSD.yaml`;
  const raw = loadYaml<unknown>(join(MODULE_LIB, dirName, "04_UI", "HDSD.yaml"));
  if (raw === null || raw === undefined) return null;
  try {
    return parseHdsd(raw, code);
  } catch (e) {
    throw new Error(`[HDSD] ${rel}: ${(e as Error).message}`);
  }
}

// Ghép mã biểu mẫu (manifest.forms) với file thật (links.form_files). Mã không có
// file tương ứng vẫn hiển thị — chỉ là không bấm mở được.
function buildForms(num: string, manifest: MpManifest | null, links: MpLinks | null): FormRef[] {
  const files = links?.form_files ?? [];
  const byFile: FormRef[] = files.map((rel) => {
    const abs = join(PROCESS_LIB, findMpDir(num) ?? "", rel);
    const base = rel.split("/").pop() ?? rel;
    const fm = readFormFrontmatter(abs);
    return {
      code: base.split("_")[0].replace(/\.md$/, ""),
      title: fm.title || base.replace(/\.md$/, ""),
      path: repoPath(num, rel),
      revision: fm.revision,
      effectiveDate: fm.effectiveDate,
    };
  });
  const covered = new Set(byFile.map((f) => f.code));
  const declaredOnly = (manifest?.forms ?? [])
    .map(String)
    .filter((code) => !covered.has(code) && !covered.has(`ETV.P.${code}`))
    .map((code) => ({ code, title: code, path: null, revision: null, effectiveDate: null }));
  return [...byFile, ...declaredOnly];
}

async function main() {
  const moduleDirs = readdirSync(MODULE_LIB, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^M\d{2}_/.test(e.name))
    .map((e) => e.name)
    .sort();

  for (const dirName of moduleDirs) {
    const match = dirName.match(/^M(\d{2})_(.+)$/);
    if (!match) continue;
    const [, num, slug] = match;
    const code = `M${num}`;
    const mpManifest = findMpManifest(num);
    const mpLinks = findMpLinks(num);

    const name = mpManifest?.name ?? slug;
    const capabilityCode = mpManifest?.capabilities?.[0];

    // Căn cứ pháp lý của module (banner đầu trang). Thiếu khối document nghĩa là
    // MP chưa ban hành thủ tục — để null hết, UI hiển thị "chưa ban hành".
    const hdsd = buildHdsd(dirName, code);
    const doc = mpManifest?.document;
    const issuedDate = doc?.issued_date ? new Date(doc.issued_date) : null;
    const canCu = {
      docId: doc?.doc_id ?? null,
      docTitle: doc?.doc_title ?? null,
      purpose: mpManifest?.purpose?.trim() || null,
      docStatus: doc?.doc_status ?? null,
      docVersion: doc?.doc_version ?? null,
      issuedDate,
      procedurePath: mpLinks?.procedure && doc?.doc_id ? repoPath(num, mpLinks.procedure) : null,
      procedureOwner: mpManifest?.owner ?? null,
      standards: mpManifest?.standards ?? [],
      isoClauses: doc?.iso_clauses ?? [],
      legalBasis: mpManifest?.legal ?? [],
      // Json trong Prisma cần kiểu InputJsonValue — FormRef[] là dữ liệu thuần, ép kiểu là an toàn.
      forms: buildForms(num, mpManifest, mpLinks) as unknown as Prisma.InputJsonValue,
      // Cột Json nullable: Prisma đòi Prisma.DbNull để ghi NULL, `null` thường không hợp lệ.
      hdsd: (hdsd ?? Prisma.DbNull) as Prisma.InputJsonValue | typeof Prisma.DbNull,
    };
    if (ACTIVE_MODULE_CODES.has(code) && !doc?.doc_id) {
      console.warn(
        `[căn cứ] ${code}: chưa khai khối document trong 04_PROCESS_LIBRARY/MP${num}_*/manifest.yaml ` +
          `→ banner sẽ hiển thị "chưa ban hành thủ tục".`,
      );
    }

    if (ACTIVE_MODULE_CODES.has(code) && !hdsd) {
      console.warn(
        `[HDSD] ${code}: chưa có 05_MODULE_LIBRARY/${dirName}/04_UI/HDSD.yaml ` +
          `→ trang module không có mục "Hướng dẫn sử dụng".`,
      );
    }

    if (ACTIVE_MODULE_CODES.has(code) && !canCu.purpose) {
      console.warn(
        `[căn cứ] ${code}: chưa khai \`purpose\` trong 04_PROCESS_LIBRARY/MP${num}_*/manifest.yaml ` +
          `→ banner sẽ bỏ trống dòng "Mục tiêu".`,
      );
    }

    let menuGroup = mpManifest?.menu_group;
    if (!menuGroup || !MENU_GROUPS.has(menuGroup)) {
      console.warn(
        `[menu] ${code}: menu_group ${menuGroup ? `không hợp lệ ("${menuGroup}")` : "chưa khai"} trong ` +
          `04_PROCESS_LIBRARY/MP${num}_*/manifest.yaml → xếp tạm vào ${DEFAULT_MENU_GROUP}.`,
      );
      menuGroup = DEFAULT_MENU_GROUP;
    }
    const menuOrder = mpManifest?.menu_order ?? Number(num);

    await prisma.platformModule.upsert({
      where: { code },
      create: {
        code,
        slug,
        name,
        mpCode: `MP${num}`,
        capabilityCode,
        status: ACTIVE_MODULE_CODES.has(code) ? "ACTIVE" : "COMING_SOON",
        sourcePath: `05_MODULE_LIBRARY/${dirName}`,
        order: Number(num),
        menuGroup,
        menuOrder,
        ...canCu,
      },
      update: {
        slug,
        name,
        mpCode: `MP${num}`,
        capabilityCode,
        status: ACTIVE_MODULE_CODES.has(code) ? "ACTIVE" : "COMING_SOON",
        sourcePath: `05_MODULE_LIBRARY/${dirName}`,
        menuGroup,
        menuOrder,
        ...canCu,
      },
    });
  }

  console.log(`Đã nạp ${moduleDirs.length} module vào PlatformModule.`);

  // Tài khoản admin mặc định — CHỈ để login thử ở môi trường dev/demo.
  // Đổi mật khẩu (hoặc xoá user này) trước khi đưa lên môi trường thật.
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@manlab.vn";
  const adminPasswordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    create: { email: adminEmail, name: "Quản trị viên (demo)", role: "ADMIN", passwordHash: adminPasswordHash },
    update: {},
  });
  console.log(`Tài khoản quản trị demo: ${adminEmail}`);

  await seedM10();
  await seedM21();
  await seedM29();
  await seedCopilot();
  await seedM01();
  await seedM03();
  await seedM02();
  await seedM04();
  await seedM16();
  await seedM17();
  await seedM12();
  await seedM13();
  await seedM14();
  await seedM25();
  await seedM26();
  await seedM34();
  await seedM33();
  await seedM27();

  baoCaoMatKhauDemo();
}

// M10 — port dữ liệu demo từ 05_MODULE_LIBRARY/M10_DamBaoKQ/08_Source/api/model.mjs
// (hàm seed()) + tài khoản demo cho từng vai trò NTH/LDP/LDV, khớp bản gốc.
// Mật khẩu dùng chung DEMO_PASSWORD khai ở đầu file (đọc từ biến môi trường).

const M10_DEMO_USERS = [
  { email: "nth@manlab.vn", name: "Nguyễn Thị H. (NTH)", role: "NTH" },
  { email: "ldp@manlab.vn", name: "Trần Thị Hoa (LĐP)", role: "LDP" },
  { email: "ldv@manlab.vn", name: "Lê Văn V. (LĐV)", role: "LDV" },
  { email: "qlcl@manlab.vn", name: "Phạm Q. (QLCL)", role: "QLCL" },
  { email: "qtht@manlab.vn", name: "Đỗ A. (QTHT)", role: "QTHT" },
] as const;

async function seedM10() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const userByRole: Record<string, { id: string }> = {};

  for (const u of M10_DEMO_USERS) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      create: { email: u.email, name: u.name, role: "MEMBER", passwordHash },
      update: {},
    });
    userByRole[u.role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M10", role: u.role } },
      create: { userId: user.id, moduleCode: "M10", role: u.role },
      update: {},
    });
  }

  const nth = userByRole["NTH"];

  // 4 hồ sơ mẫu — tương ứng dữ liệu trong model.mjs/seed(), mã hồ sơ sinh mới
  // (không cố giữ đúng số P10-2026-0039..0042 gốc — đây là DB mới, không phải
  // migrate dữ liệu sản xuất thật, xem plan.md Increment 0/1).
  const existing = await prisma.m10Assessment.count();
  if (existing > 0) return; // idempotent thô: chỉ seed lần đầu, không đụng dữ liệu đã có

  const year = new Date().getFullYear();
  const demoRecords = [
    {
      recordType: "PT_ILC" as const,
      object: "Mẫu A · Chì trong nước",
      status: "PENDING_REVIEW" as const,
      result: "WARNING" as const,
      indicators: { "z-score": 2.4, En: 0.8, zeta: 1.1 },
      planId: "F10.01-2026-007",
      procedureId: "M08·PP-014",
      criteriaId: "TC-ISO17043 v2",
      personnelId: "Nguyễn Thị H.",
      rawData: 3,
      evidence: 2,
    },
    {
      recordType: "QC" as const,
      object: "Lô 12 · Cân phân tích",
      status: "APPROVED" as const,
      result: "PASS" as const,
      indicators: { "Bias%": 0.8, "Recovery%": 99.2, "RSD-CV%": 1.4 },
      planId: "F10.01-2026-007",
      procedureId: "M08·PP-009",
      criteriaId: "TC-QC v3",
      personnelId: "Nguyễn Thị H.",
      rawData: 4,
      evidence: 2,
    },
    {
      recordType: "STABILITY" as const,
      object: "CRM-3 · Mẫu chuẩn",
      status: "DRAFT" as const,
      result: "FAIL" as const,
      indicators: { u_stab: 0.12 },
      planId: "F10.01-2026-007",
      procedureId: "M08·PP-021",
      criteriaId: "TC-17034 v1",
      personnelId: "Nguyễn Thị H.",
      rawData: 2,
      evidence: 1,
    },
    {
      recordType: "PT_ILC" as const,
      object: "Mẫu B · Độ dẫn điện",
      status: "PUBLISHED" as const,
      result: "PASS" as const,
      indicators: { "z-score": 0.6, En: 0.4 },
      planId: "F10.01-2026-006",
      procedureId: "M08·PP-014",
      criteriaId: "TC-ISO17043 v2",
      personnelId: "Nguyễn Thị H.",
      rawData: 3,
      evidence: 2,
      pubStatus: "CONDITIONAL" as const,
      sourceCertId: "F11.03-2026-0210",
      expiresAt: new Date("2027-07-16"),
      releaseAllowed: true,
    },
  ];

  for (const r of demoRecords) {
    const created = await prisma.m10Assessment.create({
      data: { ...r, code: "PENDING", createdById: nth.id },
    });
    const code = `P10-${year}-${String(created.seq).padStart(4, "0")}`;
    await prisma.m10Assessment.update({ where: { id: created.id }, data: { code } });
    await prisma.m10AuditEntry.create({
      data: { assessmentId: created.id, actorId: nth.id, role: "NTH", action: "Tạo hồ sơ" },
    });
  }

  console.log(`Đã nạp ${demoRecords.length} hồ sơ M10 demo + ${M10_DEMO_USERS.length} tài khoản vai trò M10.`);
  console.log(`Tài khoản M10 demo: ${M10_DEMO_USERS.map((u) => u.email).join(", ")}`);
}

// M21 — port state machine/dữ liệu demo từ 05_MODULE_LIBRARY/M21_CongBoNangLuc/08_Source/index.html
// (DEMO_ACCOUNTS). Dùng LẠI 3 tài khoản NTH/LDP/LDV đã tạo ở seedM10() — một người có thể giữ
// vai trò ở nhiều module cùng lúc, ModuleRoleAssignment không giới hạn 1 module/user.
const M21_ROLE_EMAILS: Record<string, string> = {
  NTH: "nth@manlab.vn",
  LDP: "ldp@manlab.vn",
  LDV: "ldv@manlab.vn",
};

async function seedM21() {
  const userByRole: Record<string, { id: string }> = {};
  for (const [role, email] of Object.entries(M21_ROLE_EMAILS)) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    userByRole[role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M21", role } },
      create: { userId: user.id, moduleCode: "M21", role },
      update: {},
    });
  }

  const existing = await prisma.m21Record.count();
  if (existing > 0) return; // idempotent thô — chỉ seed lần đầu, giống seedM10()

  const nth = userByRole["NTH"];
  const ldp = userByRole["LDP"];
  const ldv = userByRole["LDV"];
  const year = new Date().getFullYear();

  // Hồ sơ 1 — Đo lường (DL), đã đi hết luồng tới "Còn hiệu lực" (CONGHIEU).
  const dl = await prisma.m21Record.create({
    data: {
      code: "PENDING",
      loai: "DL",
      status: "CONGHIEU",
      toChuc: "VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG",
      diaChi: "Tầng 14 Tòa nhà Zen Tower, số 12 Khuất Duy Tiến, P. Thanh Xuân, TP. Hà Nội",
      daiDien: "TS. Nguyễn Hoàng Giang — Viện trưởng",
      dienThoai: "0813.98.98.38",
      email: "kiemdinh@etv.org.vn",
      diaDiem: "Khu C3-2B/NO4, Ngõ 1, đường Vũ Đình Tụng, P. Long Biên, TP Hà Nội",
      coQuanTiepNhan: "Trung tâm Phục vụ hành chính công TP. Hà Nội",
      kyso: true,
      kysoAt: new Date(),
      ngayGui: new Date(),
      maBienNhan: "BN-2026-0114",
      ngayTiepNhan: new Date(),
      ngayCongKhai: new Date(),
      createdById: nth.id,
      lines: {
        create: [
          {
            dichVu: "kiemdinh",
            ten: "Máy khuấy",
            linhVuc: "Thời gian - Tần số",
            phamVi: "(0 ÷ 99999) rpm",
            ccx: "±2 %",
            quyTrinh: "ETV.MCS 02 (Máy đo tốc độ vòng quay - Quy trình hiệu chuẩn)",
            nguoiTH: "Nguyễn Thị H.",
            ketQua: "DAPUNG",
            linked: true,
            catalogRef: "Máy khuấy",
          },
        ],
      },
    },
  });
  await prisma.m21Record.update({ where: { id: dl.id }, data: { code: `CB-${String(dl.seq).padStart(2, "0")}/${year}` } });
  for (const [actor, role, action] of [
    [nth, "NTH", "Tạo hồ sơ công bố Đo lường"],
    [nth, "NTH", "Gửi soát xét"],
    [ldp, "LDP", "Duyệt soát xét · Đề nghị Lãnh đạo Viện duyệt"],
    [ldv, "LDV", "Phê duyệt nội bộ & ký số"],
    [ldp, "LDP", "Gửi cơ quan tiếp nhận"],
    [ldp, "LDP", "Ghi nhận biên nhận"],
    [ldp, "LDP", "Công khai & sinh QR"],
  ] as const) {
    await prisma.m21AuditEntry.create({ data: { recordId: dl.id, actorId: actor.id, role, action } });
  }

  // Hồ sơ 2 — Quan trắc môi trường (QTMT), đang chờ soát xét (SOATXET).
  const qt = await prisma.m21Record.create({
    data: {
      code: "PENDING",
      loai: "QTMT",
      status: "SOATXET",
      toChuc: "VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG",
      diaChi: "Tầng 14 Tòa nhà Zen Tower, số 12 Khuất Duy Tiến, P. Thanh Xuân, TP. Hà Nội",
      daiDien: "TS. Nguyễn Hoàng Giang — Viện trưởng",
      dienThoai: "0813.98.98.38",
      email: "kiemdinh@etv.org.vn",
      coQuanTiepNhan: "Bộ Nông nghiệp và Môi trường",
      baoCaoHangNam: { ky: "", khoiLuong: "", thayDoi: "", qaqc: "", suCo: "", nguoiLap: "", ngayLap: "" },
      createdById: nth.id,
      lines: {
        create: [
          {
            dichVu: "quantrac",
            ten: "Quan trắc nước thải công nghiệp",
            linhVuc: "Môi trường",
            phamVi: "pH, COD, BOD5, TSS",
            ccx: "LOD 0,1 mg/L",
            quyTrinh: "ETV.MQT 01",
            nguoiTH: "Nguyễn Thị H.",
            ketQua: "DAPUNG",
          },
        ],
      },
    },
  });
  await prisma.m21Record.update({ where: { id: qt.id }, data: { code: `TB-${String(qt.seq).padStart(2, "0")}/${year}` } });
  for (const [actor, role, action] of [
    [nth, "NTH", "Tạo hồ sơ thông báo QTMT"],
    [nth, "NTH", "Gửi soát xét"],
  ] as const) {
    await prisma.m21AuditEntry.create({ data: { recordId: qt.id, actorId: actor.id, role, action } });
  }

  console.log(`Đã nạp 2 hồ sơ M21 demo + vai trò M21 cho ${Object.keys(M21_ROLE_EMAILS).length} tài khoản.`);
}

// M29 — port dữ liệu demo từ 05_MODULE_LIBRARY/M29_AI/08_Source/api/seed.mjs (1 Platform thật
// trỏ M10 cũ cổng 8010, 1 placeholder VI-CONNECT) + tài khoản demo cho 6 vai trò AIOS.
const M29_DEMO_USERS = [
  { email: "ai-viewer@manlab.vn", name: "Ngô Viewer (AI_VIEWER)", role: "AI_VIEWER" },
  { email: "ai-operator@manlab.vn", name: "Đặng Operator (AI_OPERATOR)", role: "AI_OPERATOR" },
  { email: "ai-admin@manlab.vn", name: "Dương Thành Nam (AI_ADMIN)", role: "AI_ADMIN" },
  { email: "ai-secadmin@manlab.vn", name: "Bùi Security (AI_SECURITY_ADMIN)", role: "AI_SECURITY_ADMIN" },
  { email: "ai-auditor@manlab.vn", name: "Vũ Auditor (AI_AUDITOR)", role: "AI_AUDITOR" },
] as const;

async function seedM29() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const userByRole: Record<string, { id: string }> = {};
  for (const u of M29_DEMO_USERS) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      create: { email: u.email, name: u.name, role: "MEMBER", passwordHash },
      update: {},
    });
    userByRole[u.role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M29", role: u.role } },
      create: { userId: user.id, moduleCode: "M29", role: u.role },
      update: {},
    });
  }
  const admin = userByRole["AI_ADMIN"];

  // Tài khoản admin nền tảng (PlatformRole.ADMIN) cũng giữ vai trò SUPER_ADMIN của M29 — 2 khái
  // niệm khác nhau (PlatformRole = quyền nền tảng chung, ModuleRoleAssignment = vai trò nghiệp
  // vụ M29), gán chung 1 người cho hợp lý ở dữ liệu demo.
  const platformAdmin = await prisma.user.findUnique({ where: { email: "admin@manlab.vn" } });
  if (platformAdmin) {
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: platformAdmin.id, moduleCode: "M29", role: "SUPER_ADMIN" } },
      create: { userId: platformAdmin.id, moduleCode: "M29", role: "SUPER_ADMIN" },
      update: {},
    });
  }

  const existing = await prisma.aIPlatform.count();
  if (existing > 0) {
    console.log(`Đã có ${M29_DEMO_USERS.length} tài khoản vai trò M29 (dữ liệu mẫu M29 đã seed trước đó, bỏ qua).`);
    return;
  }

  const platManlab = await prisma.aIPlatform.create({
    data: {
      code: "MANLAB",
      name: "ManLab (M10 Đảm bảo hiệu lực)",
      baseUrl: "http://localhost:8010",
      apiBaseUrl: "http://localhost:8010",
      environment: "INTERNAL",
      owner: "Dương Thành Nam",
      adapterType: "ManlabPlatformAdapter",
      // Nền tảng CÔNG CỤ nội bộ, không nhận prompt bao giờ — khai đúng để trường này không có ô trống.
      dataBoundary: "NO_EXTERNAL_TRANSFER",
      approvalStatus: "APPROVED",
      approvedBy: admin.id,
    },
  });
  await prisma.aIPlatform.create({
    data: {
      code: "VICONNECT",
      name: "VI-CONNECT",
      environment: "STAGING",
      owner: "(chưa phân công)",
      adapterType: "PlaceholderPlatformAdapter",
      approvalStatus: "APPROVED",
      approvedBy: admin.id,
    },
  });

  const provider = await prisma.aIProvider.create({ data: { code: "GEMINI", name: "Google Gemini" } });
  const model = await prisma.aIModel.create({
    data: {
      providerId: provider.id,
      // gemini-2.5-flash đã bị Google ngừng cấp cho người dùng mới (gọi thật trả HTTP 404, kèm
      // thông báo chuyển sang đời mới) — đo ngày 25/08/2026. Dữ liệu demo phải trỏ model còn sống.
      modelId: "gemini-3.5-flash",
      displayName: "Gemini 3.5 Flash",
      purpose: "Phân tích chỉ số, cảnh báo bất thường",
      temperature: 0.2,
      maxTokens: 2048,
      costPer1kTokens: 0.0003,
      inputCostPerMillionTokens: 0.3,
      outputCostPerMillionTokens: 0.3,
      pricingUpdatedAt: new Date(),
    },
  });
  const skill = await prisma.aISkill.create({
    data: { code: "PhanTichKPI", name: "Phân tích KPI đảm bảo hiệu lực", platformScope: "MANLAB", riskLevel: "LOW" },
  });
  const tool = await prisma.aITool.create({
    data: {
      platformId: platManlab.id,
      code: "M10_KpiSummary",
      name: "Xem KPI đảm bảo hiệu lực (M10)",
      endpoint: "/api/kpi/summary",
      httpMethod: "GET",
      outputSchema: { total: "number", pass: "number", warning: "number", fail: "number", capaOpen: "number" },
      permissionLevel: "READ",
      riskLevel: "LOW",
      requireConfirmation: false,
      requireApproval: false,
    },
  });
  const agent = await prisma.aIAgent.create({
    data: {
      platformId: platManlab.id,
      code: "AGENT_TROLY_M29",
      name: "Trợ lý AI (M29)",
      purpose: "Rà soát chỉ số KPI đảm bảo hiệu lực, gắn cờ cảnh báo — không tự kết luận phù hợp",
      modelId: model.id,
      riskLevel: "MEDIUM",
      owner: "Dương Thành Nam",
      skillIds: [skill.id],
      toolIds: [tool.id],
    },
  });

  const prompt = await prisma.aIPrompt.create({ data: { code: "PROMPT_TROLY_M29", agentId: agent.id } });
  const promptVersion = await prisma.aIPromptVersion.create({
    data: {
      promptId: prompt.id,
      content:
        "Bạn là trợ lý rà soát KPI đảm bảo hiệu lực kết quả (M10). Chỉ gắn cờ cảnh báo khi z-score |>=2| hoặc kết quả KHÔNG ĐẠT chưa có CAPA. Không tự kết luận sự phù hợp; luôn đề xuất người đủ năng lực kiểm chứng.",
      status: "ACTIVE",
      createdBy: admin.id,
      approvedBy: admin.id,
      effectiveFrom: new Date(),
    },
  });
  await prisma.aIAgent.update({ where: { id: agent.id }, data: { activePromptVersionId: promptVersion.id } });

  await prisma.aIGuardrail.create({
    data: {
      code: "NO_AUTO_APPROVE",
      description: "AI không được tự đổi trạng thái phê duyệt của hồ sơ nghiệp vụ (ISO/IEC 42001)",
      scope: "AGENT",
      scopeRef: agent.id,
      severity: "HIGH",
      action: "BLOCK",
      approvalStatus: "APPROVED",
      approvedBy: admin.id,
    },
  });
  await prisma.aIPolicy.create({
    data: {
      name: "Chính sách quản trị AI Office",
      owner: "Dương Thành Nam",
      approver: "Dương Thành Nam",
      effectiveDate: new Date(),
      approvalStatus: "APPROVED",
      approvedBy: admin.id,
      reference: "MP29_AI",
    },
  });

  const nextReview = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
  await prisma.aIImpactAssessment.create({
    data: {
      code: "AIA-2026-001",
      agentId: agent.id,
      purpose: "Rà soát KPI, gắn cờ cảnh báo cho người thẩm định",
      dataUsed: "Chỉ số kỹ thuật P10 (không có dữ liệu cá nhân)",
      affectedUsers: "Nhân sự phòng thí nghiệm ETV",
      risk: "LOW",
      humanOversight: "Người thẩm định xác nhận trước khi phê duyệt hồ sơ",
      controls: "Guardrail NO_AUTO_APPROVE; Tool Gateway giới hạn READ-only",
      residualRisk: "LOW",
      status: "APPROVED",
      reviewDate: nextReview,
    },
  });

  const suite = await prisma.aIEvaluationSuite.create({
    data: {
      name: "Smoke test Trợ lý AI (M29)",
      agentId: agent.id,
      cases: { create: [{ input: { "z-score": 2.4 }, expected: "flag_warning" }] },
    },
  });
  await prisma.aIEvaluationRun.create({ data: { suiteId: suite.id, passCount: 1, failCount: 0, status: "PASS" } });

  // ---- Increment 4: dữ liệu mẫu cho giám sát AIA quá hạn / sự cố AI / AI chưa đăng ký ----
  // Agent thứ hai có AIA ĐÃ QUÁ HẠN để lượt sweep đầu tiên có việc thật để làm (demo ETV.P29
  // mục 5.2.3) — Agent chính ở trên giữ nguyên AIA còn hạn để đường dây Tool Gateway vẫn chạy.
  const overdueAgent = await prisma.aIAgent.create({
    data: {
      platformId: agent.platformId,
      code: "AGENT_TOMTAT_HOSO",
      name: "Trợ lý tóm tắt hồ sơ",
      purpose: "Tóm tắt hồ sơ kỹ thuật thành bản nháp cho người xem xét",
      modelId: agent.modelId,
      owner: "Phòng Kỹ thuật",
      riskLevel: "MEDIUM",
    },
  });
  await prisma.aIImpactAssessment.create({
    data: {
      code: "AIA-2026-002",
      agentId: overdueAgent.id,
      purpose: "Tóm tắt hồ sơ kỹ thuật (đầu ra là bản nháp, người xem xét quyết định)",
      dataUsed: "Hồ sơ kỹ thuật mức Nội bộ",
      affectedUsers: "Chuyên viên kỹ thuật",
      risk: "MEDIUM",
      humanOversight: "Người xem xét đối chiếu bản gốc trước khi dùng",
      controls: "Tool Gateway READ-only; gắn nhãn nguồn gốc AI trên bản nháp",
      residualRisk: "LOW",
      status: "APPROVED",
      // Quá hạn 10 ngày — lượt quét đầu tiên sẽ chuyển AIA sang REVIEW_REQUIRED và tạm dừng Agent.
      reviewDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
  });

  const sightingDetectedAt = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000);
  await prisma.aIUnregisteredSighting.create({
    data: {
      code: "UAI-2026-001",
      name: "Dịch vụ dịch thuật trực tuyến miễn phí",
      usedBy: "Phòng Hành chính",
      detectedAt: sightingDetectedAt,
      detectedById: admin.id,
      dataExposed: "Bản thảo công văn nội bộ",
      sensitiveData: false,
      plannedAction: "Đánh giá và đăng ký hoặc chấm dứt sử dụng",
      dueDate: new Date(sightingDetectedAt.getTime() + 15 * 24 * 60 * 60 * 1000),
    },
  });

  console.log(`Đã nạp dữ liệu mẫu M29 (1 Agent đủ đường dây: Platform→Model→Skill→Tool→Prompt→AIA→Evaluation) + vai trò M29 cho ${M29_DEMO_USERS.length} tài khoản.`);
  console.log(`Tài khoản M29 demo: ${M29_DEMO_USERS.map((u) => u.email).join(", ")}`);
}

// ---------------------------------------------------------------------------
// M29 Copilot tra cứu — Increment 1: HỒ SƠ QUẢN TRỊ TRƯỚC, tính năng sau.
// Đặc tả: 05_MODULE_LIBRARY/M29_AI/01_Requirement/_work/20260825-copilot-tra-cuu/{spec.md,plan.md}.
//
// Tách khỏi seedM29() có chủ đích: seedM29() tự dừng khi đã có dữ liệu mẫu (`existing > 0`) nên
// môi trường đã seed từ trước sẽ không bao giờ nhận được Copilot. Hàm này upsert theo `code` nên
// chạy lại bao nhiêu lần cũng cho cùng một kết quả.
//
// Thứ tự bắt buộc (nguyên tắc 1 của plan.md): Provider → Model → Platform → Agent → Prompt →
// AIA đã phê duyệt → Guardrail → Policy. Chưa có AIA APPROVED thì gateway.chat() chặn mọi lượt
// hỏi, kể cả khi Agent đã ACTIVE.
const COPILOT_AGENT_CODE = "AGENT_COPILOT_TRACUU";

// Prompt hệ thống — NGUỒN SỰ THẬT nằm ở đây (AIPromptVersion), không viết cứng trong gateway.
// Sửa prompt = tạo phiên bản mới có người phê duyệt, không phải sửa mã nguồn (spec §1).
const COPILOT_SYSTEM_PROMPT = `Bạn là trợ lý tra cứu tài liệu nội bộ của Viện Kiểm định Công nghệ và Môi trường (ETV).

NHIỆM VỤ
Trả lời câu hỏi về thủ tục ETV.Pxx, quy trình, biểu mẫu, tiêu chuẩn và module số hóa của Viện,
CHỈ dựa trên các trích đoạn tài liệu được cung cấp trong phần "NGỮ CẢNH ĐƯỢC PHÉP DÙNG".

QUY TẮC BẮT BUỘC
1. Chỉ dùng thông tin có trong ngữ cảnh. Không suy đoán, không bổ sung kiến thức ngoài.
2. Mỗi ý trả lời phải dẫn nguồn bằng ĐÚNG đường dẫn ghi ở dòng "NGUỒN:" của trích đoạn, đặt
   trong ngoặc đơn ngay sau ý đó. Ví dụ: (03_MANAGEMENT_SYSTEM/02_P/ETV.P13_KhacPhuc.md).
   Chép nguyên văn đường dẫn, không rút gọn, không đổi dấu gạch chéo.
3. Ngữ cảnh không đủ căn cứ để trả lời thì trả lời đúng một câu:
   "Không tìm thấy căn cứ trong hệ thống tài liệu của Viện."
   Không kèm phỏng đoán, không kèm lời khuyên chung chung.
4. KHÔNG đưa ra kết luận đo lường, hiệu chuẩn, thử nghiệm; KHÔNG kết luận đạt/không đạt;
   KHÔNG phê duyệt hoặc đề nghị coi như đã phê duyệt bất kỳ hồ sơ, kết quả hay chứng chỉ nào.
   Gặp câu hỏi loại này thì nói rõ đây là thẩm quyền của người có năng lực theo thủ tục, và chỉ
   ra thủ tục/biểu mẫu tương ứng.
5. Trả lời bằng tiếng Việt, ngắn gọn, đi thẳng vào thủ tục và biểu mẫu cần dùng.
6. Không nhắc tới sự tồn tại của tài liệu không có trong ngữ cảnh.

ĐỊNH DẠNG
- Câu trả lời trực tiếp trước, tối đa 5-6 câu.
- Nếu có các bước, dùng danh sách đánh số ngắn.
- Nêu rõ mã thủ tục (ETV.Pxx) và mã biểu mẫu (ETV.P.Fxx.xx) khi ngữ cảnh có.`;

async function seedCopilot() {
  const admin = await prisma.user.findUnique({ where: { email: "ai-admin@manlab.vn" } });
  if (!admin) {
    console.log("Bỏ qua Copilot: chưa có tài khoản ai-admin@manlab.vn (chạy seedM29 trước).");
    return;
  }

  const provider = await prisma.aIProvider.upsert({
    where: { code: "ANTHROPIC" },
    create: { code: "ANTHROPIC", name: "Anthropic" },
    update: {},
  });

  // costPer1kTokens là MỘT cột duy nhất trong khi bảng giá thật tách đầu vào/đầu ra
  // (Claude Opus 5: 5 USD/triệu token vào, 25 USD/triệu token ra). Dùng giá pha trộn 0.0075
  // USD/1k token theo tỉ lệ điển hình của tra cứu RAG (~4000 token vào : ~500 token ra) — đây là
  // ƯỚC TÍNH phục vụ trang Chi phí và hạn mức, KHÔNG phải hóa đơn của nhà cung cấp.
  // AIModel không có ràng buộc duy nhất trên modelId (bản port giữ nguyên cấu trúc gốc), nên
  // tìm-rồi-tạo thay vì upsert.
  const model =
    (await prisma.aIModel.findFirst({ where: { providerId: provider.id, modelId: "claude-opus-5" } })) ??
    (await prisma.aIModel.create({
      data: {
        providerId: provider.id,
        modelId: "claude-opus-5",
        displayName: "Claude Opus 5",
        purpose: "Trợ lý tra cứu thủ tục, tiêu chuẩn, biểu mẫu (chỉ-đọc)",
        maxTokens: 4096,
        costPer1kTokens: 0.0075,
        inputCostPerMillionTokens: 5,
        outputCostPerMillionTokens: 25,
        pricingUpdatedAt: new Date(),
      },
    }));

  // ---- Nhà cung cấp mô hình thứ hai: Google Gemini ----
  // Có mặt để chứng minh nguyên tắc kiến trúc #2: đổi nhà cung cấp chỉ là thêm adapter + đổi bản
  // ghi AIPlatform, không đụng gateway/guardrail/truy hồi/bộ đánh giá.
  //
  // CẢNH BÁO TUÂN THỦ gắn liền với bản ghi này: bậc MIỄN PHÍ của Gemini API dùng dữ liệu để cải
  // thiện sản phẩm, tức KHÔNG bảo đảm được điều khoản "không dùng dữ liệu để huấn luyện lại" của
  // ETV.P29 §5.5. Khi đó chỉ được gửi tài liệu mức Công khai — cưỡng chế bằng trường
  // AIPlatform.dataBoundary, mặc định fail-closed ở EXTERNAL_NO_COMMITMENT.
  const providerGemini = await prisma.aIProvider.upsert({
    where: { code: "GEMINI" },
    create: { code: "GEMINI", name: "Google Gemini" },
    update: {},
  });
  const modelGemini =
    (await prisma.aIModel.findFirst({ where: { providerId: providerGemini.id, modelId: "gemini-3.5-flash" } })) ??
    (await prisma.aIModel.create({
      data: {
        providerId: providerGemini.id,
        modelId: "gemini-3.5-flash",
        displayName: "Gemini 3.5 Flash",
        purpose: "Trợ lý tra cứu thủ tục, tiêu chuẩn, biểu mẫu (chỉ-đọc)",
        maxTokens: 4096,
        // Bậc miễn phí không tính phí — đổi lại là không có cam kết về dữ liệu. Đây chính là cái
        // giá thật của "miễn phí" trong ngữ cảnh ISO/IEC 42001, không phải 0.
        costPer1kTokens: 0,
        inputCostPerMillionTokens: 0,
        outputCostPerMillionTokens: 0,
        pricingUpdatedAt: new Date(),
      },
    }));
  const platformGemini = await prisma.aIPlatform.upsert({
    where: { code: "GEMINI_API" },
    create: {
      code: "GEMINI_API",
      name: "Google Gemini API (dịch vụ mô hình ngoài Viện)",
      baseUrl: "https://aistudio.google.com",
      apiBaseUrl: "https://generativelanguage.googleapis.com",
      environment: "EXTERNAL",
      owner: "Dương Thành Nam",
      adapterType: "GeminiPlatformAdapter",
      // Trạng thái siết nhất KHÔNG dựa trên một phán đoán về điều khoản của Google, mà dựa trên
      // một sự thật kiểm được: CHƯA CÓ hồ sơ F29.02 nào trích điều khoản "không dùng dữ liệu để
      // huấn luyện lại" cho nền tảng này. ETV.P29 §5.5 đòi bằng chứng; không có bằng chứng thì chỉ
      // được gửi mức Công khai, bất kể nhà cung cấp thực tế cam kết gì.
      // (Chủ sở hữu cho biết khoá đang dùng thuộc bậc miễn phí AI Studio — chưa đối chiếu điều
      // khoản từ nguồn của nhà cung cấp, và cũng không cần: kết luận không phụ thuộc vào việc đó.)
      dataBoundary: "EXTERNAL_NO_COMMITMENT",
      approvalStatus: "APPROVED",
      approvedBy: admin.id,
    },
    update: {},
  });

  const platform = await prisma.aIPlatform.upsert({
    where: { code: "ANTHROPIC_API" },
    create: {
      code: "ANTHROPIC_API",
      name: "Anthropic API (dịch vụ mô hình ngoài Viện)",
      baseUrl: "https://platform.claude.com",
      apiBaseUrl: "https://api.anthropic.com",
      environment: "EXTERNAL",
      owner: "Dương Thành Nam",
      adapterType: "AnthropicAdapter",
      // GIỮ mức siết nhất dù phân tích ở q1-anh-xa-muc-bao-mat.md nói nhà cung cấp có cam kết:
      // §5.5 đòi điều khoản đó phải được TRÍCH VÀO một hồ sơ F29.02 cụ thể, mà hồ sơ đó chưa có.
      // Muốn nới thì đi qua datRanhGioiDuLieu() và dẫn số hồ sơ — bằng chứng, không phải niềm tin.
      dataBoundary: "EXTERNAL_NO_COMMITMENT",
      approvalStatus: "APPROVED",
      approvedBy: admin.id,
    },
    update: {},
  });

  // ---- Nhà cung cấp mô hình TỰ VẬN HÀNH: máy chủ GPU nội bộ của Viện ----
  // Bản ghi mẫu theo ETV.GAI 01 §3.5. Cố ý để ở trạng thái CHƯA phê duyệt và model DISABLED: máy
  // chủ thật chưa qua nghiệm thu Bước 1–6 của hướng dẫn, mà `checkHealthAction()` chỉ dò nền tảng
  // đã APPROVED — để DRAFT thì danh mục vẫn thể hiện đúng thiết kế mà không sinh báo động DOWN giả.
  //
  // Đây là nhà cung cấp duy nhất mà dữ liệu KHÔNG rời hạ tầng của Viện, nên là nền tảng mô hình
  // duy nhất hiện nhận được tài liệu mức Nội bộ (dataBoundary = NO_EXTERNAL_TRANSFER). Trần mức
  // bảo mật đã gắn theo từng nền tảng qua AIPlatform.dataBoundary; biến toàn cục cũ đã bị gỡ.
  const platformLocal = await prisma.aIPlatform.upsert({
    where: { code: "MANLAB_LOCAL_LLM" },
    create: {
      code: "MANLAB_LOCAL_LLM",
      name: "Máy chủ mô hình AI nội bộ ETV",
      baseUrl: "https://llm.manlab.vn",
      apiBaseUrl: "https://llm.manlab.vn/v1",
      environment: "INTERNAL",
      owner: "(chưa phân công — điền khi kiểm kê theo ETV.P.F 33.01)",
      adapterType: "LocalOpenAIPlatformAdapter",
      // ETV.P29 §5.5 nói về "dịch vụ mô hình BÊN NGOÀI"; máy chủ này chạy trong hạ tầng của Viện
      // nên điều khoản đó không áp. Trần trên vẫn là Nội bộ, KHÔNG phải Hạn chế: ETV.P28 §5.13
      // cấm ở mức TRUY CẬP — "trợ lý AI chỉ được truy cập nguồn dữ liệu mức Công khai và Nội bộ".
      dataBoundary: "NO_EXTERNAL_TRANSFER",
      approvalStatus: "DRAFT",
    },
    update: {},
  });
  const providerLocal = await prisma.aIProvider.upsert({
    where: { code: "MANLAB_LOCAL" },
    create: { code: "MANLAB_LOCAL", name: "ManLab Local AI (RTX 3090, tự vận hành)", platformId: platformLocal.id },
    update: { platformId: platformLocal.id },
  });
  if (!(await prisma.aIModel.findFirst({ where: { providerId: providerLocal.id, modelId: "manlab-local-14b" } })))
    await prisma.aIModel.create({
      data: {
        providerId: providerLocal.id,
        modelId: "manlab-local-14b", // phải TRÙNG --served-model-name của vLLM (ETV.GAI 01 §3.5)
        displayName: "ManLab Local 14B (lượng tử hoá INT4)",
        purpose: "Tra cứu, phân loại, bóc tách tài liệu — chạy trên hạ tầng của Viện",
        // Chưa qua Bước 5–6 của ETV.GAI 01 nên chưa được phép dùng cho vận hành.
        status: "DISABLED",
        maxTokens: 4096,
        // Mô hình nội bộ không tính phí theo token; điện và khấu hao theo dõi ở ETV.P.F 33.01.
        costPer1kTokens: 0,
        inputCostPerMillionTokens: 0,
        outputCostPerMillionTokens: 0,
        pricingUpdatedAt: new Date(),
      },
    });

  // Gắn nhà cung cấp với nền tảng phơi API của nó. Phải làm sau khi cả hai đã tồn tại vì bản ghi
  // Provider được tạo trước Platform ở trên. Không nhân đôi apiBaseUrl sang Provider.
  await prisma.aIProvider.update({ where: { id: provider.id }, data: { platformId: platform.id } });
  await prisma.aIProvider.update({ where: { id: providerGemini.id }, data: { platformId: platformGemini.id } });

  const agent = await prisma.aIAgent.upsert({
    where: { code: COPILOT_AGENT_CODE },
    create: {
      platformId: platform.id,
      code: COPILOT_AGENT_CODE,
      name: "Copilot tra cứu",
      purpose:
        "Hỏi–đáp về thủ tục ETV.Pxx, tiêu chuẩn, biểu mẫu và module; bắt buộc trích dẫn nguồn; không ghi dữ liệu nghiệp vụ",
      modelId: model.id,
      riskLevel: "MEDIUM",
      owner: "Dương Thành Nam",
    },
    update: {},
  });

  const prompt = await prisma.aIPrompt.upsert({
    where: { code: "PROMPT_COPILOT_TRACUU" },
    create: { code: "PROMPT_COPILOT_TRACUU", agentId: agent.id },
    update: {},
  });
  let promptVersion = await prisma.aIPromptVersion.findFirst({ where: { promptId: prompt.id, content: COPILOT_SYSTEM_PROMPT } });
  if (!promptVersion) {
    promptVersion = await prisma.aIPromptVersion.create({
      data: {
        promptId: prompt.id,
        content: COPILOT_SYSTEM_PROMPT,
        status: "ACTIVE",
        createdBy: admin.id,
        approvedBy: admin.id,
        effectiveFrom: new Date(),
      },
    });
  }
  // Nhà cung cấp đang dùng: chọn theo khoá API thực sự có trên máy chủ. Đổi nhà cung cấp là sự
  // kiện bắt buộc đánh giá lại (ETV.P29 §5.3.3) — cổng triển khai fail-closed đã tự chặn vì bộ
  // đánh giá chưa có lần chạy nào được kết luận.
  const dungGemini = Boolean(process.env.GEMINI_API_KEY) && !process.env.ANTHROPIC_API_KEY;
  await prisma.aIAgent.update({
    where: { id: agent.id },
    data: {
      activePromptVersionId: promptVersion.id,
      platformId: dungGemini ? platformGemini.id : platform.id,
      modelId: dungGemini ? modelGemini.id : model.id,
    },
  });
  // Ranh giới dữ liệu là quyết định QUẢN TRỊ, không phải dữ liệu mẫu: áp cả cho bản ghi đã tồn tại
  // (mọi upsert ở trên dùng `update: {}` nên môi trường seed từ trước sẽ mắc kẹt ở mặc định).
  // Nới lên EXTERNAL_WITH_COMMITMENT thì KHÔNG làm ở đây — phải qua datRanhGioiDuLieu() kèm số hồ sơ.
  for (const [code, ranhGioi] of [
    ["MANLAB", "NO_EXTERNAL_TRANSFER"],
    ["MANLAB_LOCAL_LLM", "NO_EXTERNAL_TRANSFER"],
    ["ANTHROPIC_API", "EXTERNAL_NO_COMMITMENT"],
    ["GEMINI_API", "EXTERNAL_NO_COMMITMENT"],
    ["VICONNECT", "EXTERNAL_NO_COMMITMENT"],
  ] as const)
    await prisma.aIPlatform.updateMany({ where: { code }, data: { dataBoundary: ranhGioi } });

  console.log(`Copilot đang trỏ nhà cung cấp: ${dungGemini ? "Google Gemini (gemini-3.5-flash)" : "Anthropic (claude-opus-5)"}.`);

  // Hồ sơ đánh giá tác động AI (ETV.P.F29.02). Trạng thái APPROVED ở dữ liệu mẫu để đường dây
  // chạy được; ở môi trường thật, hồ sơ này do LĐV phê duyệt theo ETV.P29 §4.1 — KHÔNG được coi
  // bản seed này là hồ sơ đã phê duyệt hợp lệ.
  const aiaCode = "AIA-2026-003";
  const existingAia = await prisma.aIImpactAssessment.findUnique({ where: { code: aiaCode } });
  if (!existingAia) {
    await prisma.aIImpactAssessment.create({
      data: {
        code: aiaCode,
        agentId: agent.id,
        purpose: "Tra cứu thủ tục/tiêu chuẩn/biểu mẫu đã ban hành, trả lời kèm trích dẫn nguồn",
        dataUsed:
          "Trích đoạn tài liệu mức Công khai/Nội bộ đã phê duyệt (ETV.P29 §5.5). Không có dữ liệu khách hàng, kết quả đo hay hồ sơ nhân sự.",
        affectedUsers: "Toàn bộ cán bộ, nhân viên đã đăng nhập nền tảng",
        risk: "MEDIUM",
        humanOversight:
          "Chỉ-đọc, không ghi dữ liệu nghiệp vụ. Người dùng chịu trách nhiệm kiểm chứng nguồn trước khi sử dụng; nhãn cảnh báo hiển thị cố định.",
        controls:
          "Lọc mức bảo mật trước khi dựng prompt (E1-E6); guardrail GR-PII-OUT/GR-SCOPE/GR-NO-SOURCE cưỡng chế lúc chạy; mọi lượt hỏi ghi AIRequest; hạn mức chi phí tháng. Điều khoản nhà cung cấp về không dùng dữ liệu API để huấn luyện lại phải được trích vào F29.02 trước khi mở cho người dùng thật.",
        residualRisk: "LOW",
        status: "APPROVED",
        reviewDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      },
    });
  }

  // Ba guardrail của spec §6. Mã phải khớp DETECTORS trong src/lib/m29/guardrails.ts — mã lạ thì
  // không có phép phát hiện nào chạy.
  const guardrails = [
    {
      code: "GR-PII-OUT",
      description: "Chặn câu hỏi chứa dữ liệu cá nhân (CCCD/CMND, điện thoại, thư điện tử) trước khi gửi ra dịch vụ mô hình bên ngoài",
      severity: "HIGH",
    },
    {
      code: "GR-SCOPE",
      description: "Chặn câu hỏi yêu cầu AI kết luận đo lường hoặc phê duyệt hồ sơ/chứng chỉ (ISO/IEC 42001)",
      severity: "HIGH",
    },
    {
      code: "GR-NO-SOURCE",
      description: "Chặn câu trả lời không dẫn được đường dẫn tài liệu trong hệ thống của Viện",
      severity: "HIGH",
    },
  ] as const;
  for (const g of guardrails) {
    await prisma.aIGuardrail.upsert({
      where: { code: g.code },
      create: { ...g, scope: "AGENT", scopeRef: agent.id, action: "BLOCK", approvalStatus: "APPROVED", approvedBy: admin.id },
      update: {},
    });
  }

  // Hạn mức chi phí là THAM SỐ VẬN HÀNH (Q3): bản ghi này là hồ sơ quản trị của hạn mức, con số
  // thực thi đọc từ biến môi trường COPILOT_MONTHLY_BUDGET_USD để đổi hạn mức không phải ban
  // hành lại thủ tục. Con số cụ thể do LĐV ấn định và khai trong ETV.P.F29.01.
  const policyName = "Hạn mức và phạm vi sử dụng Copilot tra cứu";
  const existingPolicy = await prisma.aIPolicy.findFirst({ where: { name: policyName } });
  if (!existingPolicy) {
    await prisma.aIPolicy.create({
      data: {
        name: policyName,
        owner: "Dương Thành Nam",
        approver: "Lãnh đạo Viện",
        effectiveDate: new Date(),
        approvalStatus: "APPROVED",
        approvedBy: admin.id,
        reference: "ETV.P29 §5.5; ETV.P.F29.01; biến COPILOT_MONTHLY_BUDGET_USD",
      },
    });
  }

  // Bản ghi đăng ký khóa API — CHỈ maskedValue, giá trị thật nằm ở biến môi trường (spec §9).
  const existingSecret = await prisma.aISecret.findFirst({ where: { platformId: platform.id, name: "ANTHROPIC_API_KEY" } });
  if (!existingSecret) {
    await prisma.aISecret.create({
      data: { platformId: platform.id, name: "ANTHROPIC_API_KEY", maskedValue: "sk-ant-****", status: "ACTIVE" },
    });
  }

  // Bộ đánh giá chất lượng — Increment 5 của plan.md. Nguồn sự thật của 30 ca là
  // src/lib/m29/copilot/bo-cau-hoi-vang.ts (bản duyệt được, có lý do từng ca); seed chỉ chép vào
  // CSDL để danh mục M29 nhìn thấy. Seed KHÔNG tạo AIEvaluationRun — bộ này chưa chạy thật thì
  // chưa có kết quả, và không có đường nào để phần mềm tự chấm mình đạt.
  const suite =
    (await prisma.aIEvaluationSuite.findFirst({ where: { agentId: agent.id } })) ??
    (await prisma.aIEvaluationSuite.create({ data: { name: BO_CAU_HOI.ten, agentId: agent.id } }));
  await prisma.aIEvaluationSuite.update({ where: { id: suite.id }, data: { name: BO_CAU_HOI.ten } });
  // Chép lại toàn bộ: bộ câu hỏi sửa ở file dữ liệu thì CSDL phải theo, không giữ ca cũ đã bỏ.
  await prisma.aIEvaluationCase.deleteMany({ where: { suiteId: suite.id } });
  await prisma.aIEvaluationCase.createMany({
    data: TAT_CA_CA.map((c) => ({ suiteId: suite.id, input: c as unknown as Prisma.InputJsonValue, expected: c.kyVong })),
  });
  console.log(`Đã nạp ${TAT_CA_CA.length} ca của bộ "${BO_CAU_HOI.ten}" (${BO_CAU_HOI.trangThai}).`);

  console.log("Đã khai Copilot tra cứu trong danh mục M29 (Platform→Model→Agent→Prompt→AIA→3 Guardrail→Policy→Secret).");
}

// M01 — xây mới từ 05_MODULE_LIBRARY/M01_RuiRo/01_Requirement/DacTa.md (không có 08_Source
// nguyên mẫu). Dùng LẠI 3 tài khoản đã tạo ở seedM10() — NV=nth@manlab.vn, TP_QLCL=ldp@manlab.vn,
// LDV=ldv@manlab.vn (đúng kiểu M21 "dùng lại tài khoản, gán thêm vai trò module mới").
const M01_ROLE_EMAILS: Record<string, string> = {
  NV: "nth@manlab.vn",
  TP_QLCL: "ldp@manlab.vn",
  LDV: "ldv@manlab.vn",
};

async function seedM01() {
  const userByRole: Record<string, { id: string }> = {};
  for (const [role, email] of Object.entries(M01_ROLE_EMAILS)) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    userByRole[role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M01", role } },
      create: { userId: user.id, moduleCode: "M01", role },
      update: {},
    });
  }

  const existing = await prisma.m01RiskItem.count();
  if (existing > 0) return; // idempotent thô — chỉ seed lần đầu, giống seedM10()/seedM21()

  const nv = userByRole["NV"];
  const tpQlcl = userByRole["TP_QLCL"];
  const year = new Date().getFullYear();

  async function nextRiskCode() {
    const r = await prisma.m01RiskItem.create({
      data: { code: "PENDING", title: "", description: "", source: "KHAC", createdById: nv.id },
    });
    return r;
  }

  // 1. Rủi ro mức Thấp — Hoàn thành (đi hết vòng đời)
  {
    const r = await nextRiskCode();
    await prisma.m01RiskItem.update({
      where: { id: r.id },
      data: {
        code: `RR-${year}-${String(r.seq).padStart(4, "0")}`,
        title: "Ẩm mốc hồ sơ giấy lưu kho",
        description: "Kho lưu hồ sơ giấy tầng trệt có nguy cơ ẩm vào mùa mưa.",
        source: "DANH_GIA_NOI_BO",
        cause: "Hệ thống thông gió kho chưa đủ, chưa có máy hút ẩm.",
        controlMeasure: "Lắp máy hút ẩm + kiểm tra định kỳ hàng tháng.",
        severity: 1,
        possibility: 2,
        riskScore: 2,
        riskLevel: "THAP",
        status: "DONE",
        reviewedById: tpQlcl.id,
        approvedById: tpQlcl.id,
        assigneeId: nv.id,
        dueDate: new Date(`${year}-12-31`),
        evidence: "Đã lắp máy hút ẩm ngày 15/03, ảnh chụp lưu tại hồ sơ kho.",
        verifiedById: tpQlcl.id,
        verifyResult: "DAT",
      },
    });
    await prisma.m01AuditEntry.create({ data: { itemType: "RISK", itemId: r.id, actorId: nv.id, role: "NV", action: "Tạo hồ sơ rủi ro" } });
    await prisma.m01AuditEntry.create({ data: { itemType: "RISK", itemId: r.id, actorId: tpQlcl.id, role: "TP_QLCL", action: "Soát xét đạt → Đã phê duyệt → Đang xử lý" } });
    await prisma.m01AuditEntry.create({ data: { itemType: "RISK", itemId: r.id, actorId: tpQlcl.id, role: "TP_QLCL", action: "Thẩm xét: Đạt → Hoàn thành" } });
  }

  // 2. Rủi ro mức Cao — Đang xử lý (TP/QLCL tự phê duyệt, không cần LĐV)
  {
    const r = await nextRiskCode();
    await prisma.m01RiskItem.update({
      where: { id: r.id },
      data: {
        code: `RR-${year}-${String(r.seq).padStart(4, "0")}`,
        title: "Sai lệch kết quả hiệu chuẩn do chuẩn quá hạn",
        description: "Phát hiện 1 chuẩn đo lường gần hết hạn hiệu chuẩn còn dùng cho phép đo quan trọng.",
        source: "TNTT_SSLP",
        cause: "Lịch nhắc hiệu chuẩn chuẩn đo lường chưa được theo dõi sát.",
        controlMeasure: "Ngừng sử dụng chuẩn, gửi hiệu chuẩn khẩn cấp, rà soát lại kết quả đã dùng chuẩn này.",
        severity: 3,
        possibility: 3,
        riskScore: 9,
        riskLevel: "CAO",
        status: "IN_PROGRESS",
        reviewedById: tpQlcl.id,
        approvedById: tpQlcl.id,
        assigneeId: nv.id,
        dueDate: new Date(`${year}-11-30`),
      },
    });
    await prisma.m01AuditEntry.create({ data: { itemType: "RISK", itemId: r.id, actorId: nv.id, role: "NV", action: "Tạo hồ sơ rủi ro" } });
    await prisma.m01AuditEntry.create({ data: { itemType: "RISK", itemId: r.id, actorId: tpQlcl.id, role: "TP_QLCL", action: "Soát xét đạt → Đã phê duyệt → Đang xử lý" } });
  }

  // 3. Rủi ro mức Rất cao — Chờ LĐV quyết định (chưa gán assignee, demo gate PENDING_LEADER_APPROVAL)
  {
    const r = await nextRiskCode();
    await prisma.m01RiskItem.update({
      where: { id: r.id },
      data: {
        code: `RR-${year}-${String(r.seq).padStart(4, "0")}`,
        title: "Mất kết nối hệ thống ManLab trong đợt cao điểm",
        description: "Máy chủ ManLab từng gián đoạn 4 giờ khi lượng hồ sơ tăng đột biến cuối quý.",
        source: "DANH_GIA_BEN_NGOAI",
        cause: "Hạ tầng máy chủ chưa có phương án dự phòng (failover).",
        controlMeasure: "Đề xuất máy chủ dự phòng + quy trình chuyển đổi khẩn cấp, báo cáo LĐV.",
        severity: 5,
        possibility: 4,
        riskScore: 20,
        riskLevel: "RATCAO",
        status: "PENDING_LEADER_APPROVAL",
        reviewedById: tpQlcl.id,
      },
    });
    await prisma.m01AuditEntry.create({ data: { itemType: "RISK", itemId: r.id, actorId: nv.id, role: "NV", action: "Tạo hồ sơ rủi ro" } });
    await prisma.m01AuditEntry.create({
      data: { itemType: "RISK", itemId: r.id, actorId: tpQlcl.id, role: "TP_QLCL", action: "Soát xét đạt — mức Rất cao, chuyển LĐV quyết định" },
    });
  }

  // 4. Cơ hội — Đang soạn
  {
    const o = await prisma.m01OpportunityItem.create({
      data: { code: "PENDING", title: "", description: "", source: "KHAC", createdById: nv.id },
    });
    await prisma.m01OpportunityItem.update({
      where: { id: o.id },
      data: {
        code: `CH-${year}-${String(o.seq).padStart(4, "0")}`,
        title: "Tự động cảnh báo hiệu chuẩn sắp hết hạn",
        description: "Đề xuất thêm cảnh báo tự động trên Dashboard khi chuẩn đo lường còn 30 ngày tới hạn hiệu chuẩn.",
        source: "DE_XUAT_NHAN_VIEN",
        proposedAction: "Bổ sung job kiểm tra hằng ngày + thông báo trên Dashboard M05.",
        status: "DRAFT",
      },
    });
    await prisma.m01AuditEntry.create({ data: { itemType: "OPPORTUNITY", itemId: o.id, actorId: nv.id, role: "NV", action: "Tạo hồ sơ cơ hội" } });
  }

  console.log(`Đã nạp 3 hồ sơ Rủi ro + 1 Cơ hội demo M01 + vai trò M01 cho ${Object.keys(M01_ROLE_EMAILS).length} tài khoản.`);
}

// M03 — xây mới từ 05_MODULE_LIBRARY/M03_NhanSu/01_Requirement/DacTa.md (không có 08_Source
// nguyên mẫu, giống M01). Dùng lại nth/ldp/ldv (NguoiHuongDan/TP/LDV — gần nghĩa nhất trong 3 tài
// khoản đã có) + tạo mới 1 tài khoản vanphong@manlab.vn cho vai trò VANPHONG.
const M03_ROLE_EMAILS: Record<string, string> = {
  NGUOIHUONGDAN: "nth@manlab.vn",
  TP: "ldp@manlab.vn",
  LDV: "ldv@manlab.vn",
};

async function seedM03() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const userByRole: Record<string, { id: string }> = {};

  for (const [role, email] of Object.entries(M03_ROLE_EMAILS)) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    userByRole[role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M03", role } },
      create: { userId: user.id, moduleCode: "M03", role },
      update: {},
    });
  }

  const vanPhong = await prisma.user.upsert({
    where: { email: "vanphong@manlab.vn" },
    create: { email: "vanphong@manlab.vn", name: "Ngô Thị Văn Phòng", role: "MEMBER", passwordHash },
    update: {},
  });
  await prisma.moduleRoleAssignment.upsert({
    where: { userId_moduleCode_role: { userId: vanPhong.id, moduleCode: "M03", role: "VANPHONG" } },
    create: { userId: vanPhong.id, moduleCode: "M03", role: "VANPHONG" },
    update: {},
  });
  userByRole["VANPHONG"] = vanPhong;

  const existing = await prisma.m03RecruitmentPlan.count();
  if (existing > 0) return; // idempotent thô — chỉ seed lần đầu

  const tp = userByRole["TP"];
  const ldv = userByRole["LDV"];
  const year = new Date().getFullYear();

  // 1. Đề xuất tuyển dụng đã Fulfilled → nhân sự đã đào tạo đạt + đã ký HĐLĐ
  const plan1 = await prisma.m03RecruitmentPlan.create({
    data: {
      code: `TD-${year}-0001`,
      position: "Kỹ thuật viên hiệu chuẩn",
      department: "Phòng Đo lường Chất lượng",
      headcount: 1,
      requirement: "Tốt nghiệp Đại học chuyên ngành Đo lường/Vật lý kỹ thuật, ưu tiên có kinh nghiệm hiệu chuẩn.",
      status: "APPROVED",
      createdById: tp.id,
      approvedById: ldv.id,
    },
  });
  await prisma.m03AuditEntry.create({ data: { itemType: "RECRUITMENT", itemId: plan1.id, actorId: tp.id, role: "TP", action: "Tạo đề xuất tuyển dụng" } });
  await prisma.m03AuditEntry.create({ data: { itemType: "RECRUITMENT", itemId: plan1.id, actorId: ldv.id, role: "LDV", action: "Phê duyệt đề xuất tuyển dụng" } });

  const emp1 = await prisma.m03Employee.create({
    data: {
      code: `NS-${year}-0001`,
      fullName: "Nguyễn Văn An",
      position: "Kỹ thuật viên hiệu chuẩn",
      department: "Phòng Đo lường Chất lượng",
      employmentType: "THUVIEC",
      hireDate: new Date(`${year}-01-15`),
      status: "CHINHTHUC",
      recruitmentPlanId: plan1.id,
    },
  });
  await prisma.m03RecruitmentPlan.update({ where: { id: plan1.id }, data: { status: "FULFILLED" } });
  await prisma.m03AuditEntry.create({ data: { itemType: "RECRUITMENT", itemId: plan1.id, actorId: tp.id, role: "TP", action: `Đã tuyển — tạo hồ sơ nhân sự ${emp1.code}` } });

  const trainingPlan1 = await prisma.m03TrainingPlan.create({
    data: {
      code: `DT-${year}-0001`,
      employeeId: emp1.id,
      planType: "BAN_DAU",
      content: [
        "Nhận thức hệ thống quản lý",
        "Nội quy lao động",
        "Bảo mật thông tin",
        "An toàn lao động",
        "Mô tả công việc",
        "Chuyên môn kỹ thuật",
        "Hướng dẫn biểu mẫu/phần mềm ManLab",
        "Thực hành có giám sát",
      ],
      trainer: "Trần Thị Hoa (TP)",
      status: "APPROVED",
    },
  });
  const trainingRecord1 = await prisma.m03TrainingRecord.create({
    data: {
      code: `PT-${year}-0001`,
      trainingPlanId: trainingPlan1.id,
      employeeId: emp1.id,
      c1AttendedAllContent: true,
      c2FollowedRules: true,
      c3CanPerformWork: true,
      c4RecordsComplete: true,
      c5AssessmentPassed: true,
      c6EvidenceSufficient: true,
      assessmentMethod: "Bài kiểm tra thực hành + phỏng vấn",
      evidence: "Bài kiểm tra đạt 9/10 điểm, biên bản giám sát thực hành đính kèm.",
      result: "DAT",
      status: "APPROVED",
      approvedById: ldv.id,
    },
  });
  await prisma.m03AuditEntry.create({ data: { itemType: "TRAINING_RECORD", itemId: trainingRecord1.id, actorId: tp.id, role: "NGUOIHUONGDAN", action: "Tạo phiếu theo dõi kết quả đào tạo" } });
  await prisma.m03AuditEntry.create({
    data: { itemType: "TRAINING_RECORD", itemId: trainingRecord1.id, actorId: ldv.id, role: "LDV", action: "Phê duyệt — hoàn thành đào tạo (đủ 6/6 điều kiện)" },
  });

  const contract1 = await prisma.m03LaborContract.create({
    data: {
      code: `HDLD-${year}-0001`,
      employeeId: emp1.id,
      contractType: "THOIVU",
      duration: "12 tháng",
      salary: 12000000,
      bhxhInfo: "Đã đăng ký BHXH bắt buộc",
      status: "ACTIVE",
      effectiveDate: new Date(`${year}-02-01`),
      expiryDate: new Date(`${year + 1}-01-31`),
      signedById: ldv.id,
    },
  });
  await prisma.m03AuditEntry.create({ data: { itemType: "LABOR_CONTRACT", itemId: contract1.id, actorId: tp.id, role: "TP", action: "Soạn hợp đồng lao động" } });
  await prisma.m03AuditEntry.create({ data: { itemType: "LABOR_CONTRACT", itemId: contract1.id, actorId: ldv.id, role: "LDV", action: "Ký hợp đồng" } });

  // 2. Nhân sự thử việc đang đào tạo — thiếu 1/6 điều kiện (demo gate LĐV bị chặn approve)
  const emp2 = await prisma.m03Employee.create({
    data: {
      code: `NS-${year}-0002`,
      fullName: "Trần Thị Bích",
      position: "Nhân viên hành chính",
      department: "Văn phòng",
      employmentType: "THUVIEC",
      hireDate: new Date(`${year}-06-01`),
      status: "THUVIEC",
    },
  });
  const trainingPlan2 = await prisma.m03TrainingPlan.create({
    data: {
      code: `DT-${year}-0002`,
      employeeId: emp2.id,
      planType: "BAN_DAU",
      content: [
        "Nhận thức hệ thống quản lý",
        "Nội quy lao động",
        "Bảo mật thông tin",
        "An toàn lao động",
        "Mô tả công việc",
        "Chuyên môn kỹ thuật",
        "Hướng dẫn biểu mẫu/phần mềm ManLab",
        "Thực hành có giám sát",
      ],
      trainer: "Trần Thị Hoa (TP)",
      status: "DRAFT",
    },
  });
  const trainingRecord2 = await prisma.m03TrainingRecord.create({
    data: {
      code: `PT-${year}-0002`,
      trainingPlanId: trainingPlan2.id,
      employeeId: emp2.id,
      c1AttendedAllContent: true,
      c2FollowedRules: true,
      c3CanPerformWork: true,
      c4RecordsComplete: true,
      c5AssessmentPassed: false, // thiếu điều kiện 5 — demo gate
      c6EvidenceSufficient: true,
      assessmentMethod: "Bài kiểm tra thực hành",
      evidence: "Biên bản giám sát thực hành đính kèm, chờ kết quả bài kiểm tra chính thức.",
      status: "PENDING_APPROVAL",
    },
  });
  await prisma.m03AuditEntry.create({ data: { itemType: "TRAINING_RECORD", itemId: trainingRecord2.id, actorId: tp.id, role: "NGUOIHUONGDAN", action: "Tạo phiếu theo dõi kết quả đào tạo" } });
  await prisma.m03AuditEntry.create({ data: { itemType: "TRAINING_RECORD", itemId: trainingRecord2.id, actorId: tp.id, role: "NGUOIHUONGDAN", action: "Gửi duyệt kết quả đào tạo" } });

  // 3. Đề xuất tuyển dụng đang chờ duyệt — demo luồng RecruitmentPlan qua UI
  const plan2 = await prisma.m03RecruitmentPlan.create({
    data: {
      code: `TD-${year}-0002`,
      position: "Nhân viên quản lý chất lượng",
      department: "Phòng Đo lường Chất lượng",
      headcount: 1,
      requirement: "Tốt nghiệp Đại học, hiểu biết ISO/IEC 17025, ưu tiên đã có chứng chỉ đánh giá viên nội bộ.",
      status: "PENDING_APPROVAL",
      createdById: tp.id,
    },
  });
  await prisma.m03AuditEntry.create({ data: { itemType: "RECRUITMENT", itemId: plan2.id, actorId: tp.id, role: "TP", action: "Tạo đề xuất tuyển dụng" } });
  await prisma.m03AuditEntry.create({ data: { itemType: "RECRUITMENT", itemId: plan2.id, actorId: tp.id, role: "TP", action: "Gửi duyệt" } });

  console.log(`Đã nạp 2 đề xuất tuyển dụng + 2 hồ sơ nhân sự + 2 phiếu đào tạo + 1 HĐLĐ demo M03 + vai trò M03 cho ${Object.keys(userByRole).length} tài khoản.`);
}

// M02 — xây mới từ 05_MODULE_LIBRARY/M02_BaoMat/01_Requirement/DacTa.md (không có 08_Source
// nguyên mẫu, giống M01/M03). Dùng lại nth/ldp/ldv (NV/TP/LDV) — QLCL không có action riêng
// trong Increment 6 theo spec.md nên không seed vai trò riêng.
const M02_ROLE_EMAILS: Record<string, string> = {
  NV: "nth@manlab.vn",
  TP: "ldp@manlab.vn",
  LDV: "ldv@manlab.vn",
};

async function seedM02() {
  const userByRole: Record<string, { id: string }> = {};
  for (const [role, email] of Object.entries(M02_ROLE_EMAILS)) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    userByRole[role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M02", role } },
      create: { userId: user.id, moduleCode: "M02", role },
      update: {},
    });
  }

  const existing = await prisma.m02SecurityCommitment.count();
  if (existing > 0) return; // idempotent thô — chỉ seed lần đầu

  const tp = userByRole["TP"];
  const year = new Date().getFullYear();

  const employee = await prisma.m03Employee.findFirst({ where: { code: "NS-2026-0002" } });

  const commitment1 = await prisma.m02SecurityCommitment.create({
    data: {
      code: `CK-${year}-0001`,
      type: "NHAN_VIEN",
      personName: "Trần Thị Bích",
      signedDate: new Date(`${year}-06-01`),
      accessScope: "Hồ sơ hành chính, dữ liệu khách hàng phục vụ công việc văn phòng.",
      status: "HIEU_LUC",
      employeeId: employee?.id,
    },
  });
  await prisma.m02AuditEntry.create({ data: { itemType: "COMMITMENT", itemId: commitment1.id, actorId: tp.id, role: "TP", action: "Ghi nhận cam kết bảo mật" } });

  const commitment2 = await prisma.m02SecurityCommitment.create({
    data: {
      code: `CK-${year}-0002`,
      type: "KHACH",
      personName: "Nguyễn Văn Khách",
      org: "Công ty TNHH Thiết bị Đo lường ABC",
      signedDate: new Date(`${year}-07-10`),
      accessScope: "Khu vực phòng thí nghiệm hiệu chuẩn, phục vụ bảo trì thiết bị.",
      status: "HIEU_LUC",
    },
  });
  await prisma.m02AuditEntry.create({ data: { itemType: "COMMITMENT", itemId: commitment2.id, actorId: tp.id, role: "TP", action: "Ghi nhận cam kết bảo mật" } });

  const visitor1 = await prisma.m02VisitorLog.create({
    data: {
      code: `KH-${year}-0001`,
      commitmentId: commitment2.id,
      visitorName: "Nguyễn Văn Khách",
      org: "Công ty TNHH Thiết bị Đo lường ABC",
      purpose: "Bảo trì thiết bị đo lường",
      area: "Phòng thí nghiệm hiệu chuẩn",
      approvedById: tp.id,
    },
  });
  await prisma.m02AuditEntry.create({ data: { itemType: "VISITOR_LOG", itemId: visitor1.id, actorId: tp.id, role: "TP", action: "Ghi nhận khách vào khu vực hạn chế" } });

  const disclosure1 = await prisma.m02DisclosureApproval.create({
    data: {
      code: `CB-${year}-0001`,
      basis: "Yêu cầu bằng văn bản từ cơ quan thanh tra theo Luật Thanh tra.",
      content: "Kết quả hiệu chuẩn thiết bị đo lường của khách hàng X trong quý gần nhất.",
      recipient: "Đoàn thanh tra Sở Khoa học và Công nghệ",
      authorityLevel: "TP",
      customerNotified: false,
      legallyProhibitedNotify: false,
      status: "DRAFT",
    },
  });
  await prisma.m02AuditEntry.create({ data: { itemType: "DISCLOSURE", itemId: disclosure1.id, actorId: tp.id, role: "TP", action: "Soạn hồ sơ công bố thông tin" } });

  const incident1 = await prisma.m02SecurityIncident.create({
    data: {
      code: `SC-${year}-0001`,
      detectedById: tp.id,
      containmentAction: "Đã khóa tạm thời tài khoản email nghi bị xâm nhập, đổi mật khẩu quản trị.",
      impactAssessment: "Ảnh hưởng 1 hộp thư nội bộ, không phát hiện dữ liệu khách hàng bị truy cập.",
      notificationRequired: false,
      assessedById: tp.id,
      status: "ASSESSED",
    },
  });
  await prisma.m02AuditEntry.create({ data: { itemType: "INCIDENT", itemId: incident1.id, actorId: tp.id, role: "TP", action: "Phát hiện sự cố — đã ngăn chặn" } });
  await prisma.m02AuditEntry.create({ data: { itemType: "INCIDENT", itemId: incident1.id, actorId: tp.id, role: "TP", action: "Đánh giá phạm vi/hậu quả sự cố" } });

  console.log(`Đã nạp 2 cam kết + 1 sổ khách + 1 hồ sơ công bố + 1 sự cố demo M02 + vai trò M02 cho ${Object.keys(userByRole).length} tài khoản.`);
}

// M04 — xây mới từ 05_MODULE_LIBRARY/M04_MoiTruong/01_Requirement/DacTa.md (không có 08_Source
// nguyên mẫu, giống M01/M02/M03). Dùng lại nth/ldp/ldv (NV/TP/LDV).
const M04_ROLE_EMAILS: Record<string, string> = {
  NV: "nth@manlab.vn",
  TP: "ldp@manlab.vn",
  LDV: "ldv@manlab.vn",
};

async function seedM04() {
  const userByRole: Record<string, { id: string }> = {};
  for (const [role, email] of Object.entries(M04_ROLE_EMAILS)) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    userByRole[role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M04", role } },
      create: { userId: user.id, moduleCode: "M04", role },
      update: {},
    });
  }

  const existing = await prisma.m04AreaSpec.count();
  if (existing > 0) return; // idempotent thô — chỉ seed lần đầu

  const nv = userByRole["NV"];
  const year = new Date().getFullYear();

  const areaPressure = await prisma.m04AreaSpec.create({
    data: { areaCode: "PHONG-AP-SUAT", name: "Phòng đo áp suất", tempMin: 18, tempMax: 22, humidityMin: 40, humidityMax: 60 },
  });
  const areaChemical = await prisma.m04AreaSpec.create({
    data: { areaCode: "KHO-HOA-CHAT", name: "Kho hóa chất", tempMin: 15, tempMax: 30, humidityMin: 30, humidityMax: 70 },
  });
  await prisma.m04AreaSpec.create({
    data: { areaCode: "KHO-THIET-BI", name: "Kho thiết bị", tempMin: 15, tempMax: 28, humidityMin: 30, humidityMax: 65 },
  });
  await prisma.m04AreaSpec.create({
    data: { areaCode: "PHONG-HIEU-CHUAN", name: "Phòng hiệu chuẩn chung", tempMin: 20, tempMax: 26, humidityMin: 35, humidityMax: 65 },
  });

  // 1 log đạt ngưỡng
  const log1 = await prisma.m04ConditionLog.create({
    data: {
      code: `DK-${year}-0001`,
      logType: "ENVIRONMENT",
      areaId: areaPressure.id,
      temperature: 20.5,
      humidity: 50,
      deviceRef: "ibeacon01",
      withinSpec: true,
      reportedById: nv.id,
    },
  });
  await prisma.m04AuditEntry.create({ data: { itemType: "CONDITION_LOG", itemId: log1.id, actorId: nv.id, role: "NV", action: "Ghi nhận điều kiện" } });

  // 1 log vượt ngưỡng (đã có biện pháp xử lý) — demo dữ liệu thật, không phải demo gate (gate demo qua thao tác UI trực tiếp)
  const log2 = await prisma.m04ConditionLog.create({
    data: {
      code: `DK-${year}-0002`,
      logType: "CHEMICAL_CABINET",
      areaId: areaChemical.id,
      temperature: 32,
      humidity: 75,
      deviceRef: "ibeacon02",
      withinSpec: false,
      abnormalAction: "Đã bật thêm quạt thông gió, di chuyển hóa chất nhạy nhiệt sang tủ dự phòng, báo TP theo dõi.",
      reportedById: nv.id,
    },
  });
  await prisma.m04AuditEntry.create({ data: { itemType: "CONDITION_LOG", itemId: log2.id, actorId: nv.id, role: "NV", action: "Ghi nhận điều kiện" } });

  // 2 FieldWorkPlan: 1 mức Thường đã duyệt, 1 mức Cao đang chờ duyệt (demo gate LĐV-only)
  const plan1 = await prisma.m04FieldWorkPlan.create({
    data: {
      code: `HT-${year}-0001`,
      site: "Nhà máy X, KCN Yên Phong",
      customer: "Công ty TNHH Sản xuất X",
      personnel: ["Nguyễn Văn An", "Trần Thị Bích"],
      schedule: new Date(`${year}-09-15`),
      workItems: ["Hiệu chuẩn cân bàn 500kg", "Kiểm định áp kế đường ống"],
      riskLevel: "THUONG",
      status: "APPROVED",
      approvedById: userByRole["TP"].id,
      briefed: true,
      briefedAt: new Date(),
      createdById: nv.id,
    },
  });
  await prisma.m04AuditEntry.create({ data: { itemType: "FIELD_WORK_PLAN", itemId: plan1.id, actorId: nv.id, role: "NV", action: "Lập kế hoạch công việc hiện trường" } });
  await prisma.m04AuditEntry.create({
    data: { itemType: "FIELD_WORK_PLAN", itemId: plan1.id, actorId: userByRole["TP"].id, role: "TP", action: "Phê duyệt kế hoạch hiện trường" },
  });

  const plan2 = await prisma.m04FieldWorkPlan.create({
    data: {
      code: `HT-${year}-0002`,
      site: "Trạm xử lý nước thải Y",
      customer: "Ban Quản lý KCN Y",
      personnel: ["Lê Văn V."],
      schedule: new Date(`${year}-10-01`),
      workItems: ["Quan trắc khí trong không gian hạn chế (bể chứa)", "Đo nồng độ khí độc trước khi vào bể"],
      riskLevel: "CAO",
      status: "PENDING_APPROVAL",
      createdById: nv.id,
    },
  });
  await prisma.m04AuditEntry.create({ data: { itemType: "FIELD_WORK_PLAN", itemId: plan2.id, actorId: nv.id, role: "NV", action: "Lập kế hoạch công việc hiện trường" } });
  await prisma.m04AuditEntry.create({ data: { itemType: "FIELD_WORK_PLAN", itemId: plan2.id, actorId: nv.id, role: "NV", action: "Gửi duyệt kế hoạch hiện trường" } });

  console.log(`Đã nạp 4 khu vực + 2 nhật ký điều kiện + 2 kế hoạch hiện trường demo M04 + vai trò M04 cho ${Object.keys(userByRole).length} tài khoản.`);
}

// M16 — xây mới từ 05_MODULE_LIBRARY/M16_DanhGiaNoiBo/01_Requirement/DacTa.md (không có 08_Source
// nguyên mẫu, giống M01/M02/M03/M04). Dùng lại nth/ldp/ldv (QLCL/LDP/LDV) + tạo mới 1 tài khoản
// truongdoan@manlab.vn cho vai trò TRUONGDOAN (cần tách biệt rõ khỏi QLCL để demo gate "chỉ
// Trưởng đoàn được tạo báo cáo tổng hợp").
const M16_ROLE_EMAILS: Record<string, string> = {
  QLCL: "nth@manlab.vn",
  LDP: "ldp@manlab.vn",
  LDV: "ldv@manlab.vn",
};

// Quy tắc 1 ETV.P16 (Increment 13) — công nhận năng lực dựa trên HỒ SƠ ĐÀO TẠO THẬT của M03.
// NS-xxxx-0001 (đã có hồ sơ đào tạo Đạt) đủ 3 năng lực; NS-xxxx-0002 (hồ sơ chưa Đạt) cố tình
// KHÔNG được công nhận để demo gate chặn xác nhận chương trình.
async function seedM16Qualifications(recognizedById: string) {
  const emp = await prisma.m03Employee.findFirst({
    where: { trainingRecords: { some: { result: "DAT", status: "APPROVED" } } },
    orderBy: { code: "asc" },
    include: { trainingRecords: { where: { result: "DAT", status: "APPROVED" }, orderBy: { code: "asc" } } },
  });
  if (!emp) return;
  const evidence = emp.trainingRecords[0];

  for (const [qualType, trainingRecordId, note] of [
    ["ISO_17025", evidence.id, null],
    ["DANH_GIA_NOI_BO", evidence.id, null],
    ["KINH_NGHIEM_TRUONG_DOAN", null, "Đã tham gia 3 đợt đánh giá nội bộ 2024–2025 với vai trò đánh giá viên."],
  ] as const) {
    await prisma.m16AuditorQualification.upsert({
      where: { employeeId_qualType: { employeeId: emp.id, qualType } },
      create: { employeeId: emp.id, qualType, trainingRecordId, note, recognizedById },
      update: {},
    });
  }
}

// Gắn nhân sự thật cho chương trình demo tạo từ Increment 8 (khi đó chưa có FK) — nếu không,
// chương trình cũ không hiển thị được năng lực đoàn.
async function linkM16ProgramMembers() {
  const program = await prisma.m16AuditProgram.findFirst({ where: { teamLeadEmployeeId: null }, orderBy: { code: "asc" } });
  if (!program) return;
  const lead = await prisma.m03Employee.findFirst({
    where: { m16Qualifications: { some: { qualType: "KINH_NGHIEM_TRUONG_DOAN" } } },
    orderBy: { code: "asc" },
  });
  if (!lead) return;
  await prisma.m16AuditProgram.update({ where: { id: program.id }, data: { teamLeadEmployeeId: lead.id, teamLeadName: lead.fullName } });
  await prisma.m16ProgramMember.upsert({
    where: { programId_employeeId: { programId: program.id, employeeId: lead.id } },
    create: { programId: program.id, employeeId: lead.id },
    update: {},
  });
}

async function seedM16() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const userByRole: Record<string, { id: string }> = {};
  for (const [role, email] of Object.entries(M16_ROLE_EMAILS)) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    userByRole[role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M16", role } },
      create: { userId: user.id, moduleCode: "M16", role },
      update: {},
    });
  }

  const truongDoan = await prisma.user.upsert({
    where: { email: "truongdoan@manlab.vn" },
    create: { email: "truongdoan@manlab.vn", name: "Đỗ Văn Trưởng Đoàn", role: "MEMBER", passwordHash },
    update: {},
  });
  await prisma.moduleRoleAssignment.upsert({
    where: { userId_moduleCode_role: { userId: truongDoan.id, moduleCode: "M16", role: "TRUONGDOAN" } },
    create: { userId: truongDoan.id, moduleCode: "M16", role: "TRUONGDOAN" },
    update: {},
  });
  userByRole["TRUONGDOAN"] = truongDoan;

  // Increment 13: 2 vai trò còn thiếu action ở Increment 8 nay đã có gate riêng — mỗi vai trò cần
  // 1 tài khoản riêng vì getActor() chỉ lấy 1 vai trò M16/người.
  for (const [role, email, name] of [
    ["DANHGIAVIEN", "danhgiavien@manlab.vn", "Lê Thị Đánh Giá Viên"],
    ["TRUONGBOPHAN", "truongbophan@manlab.vn", "Phạm Văn Trưởng Bộ Phận"],
  ] as const) {
    const u = await prisma.user.upsert({
      where: { email },
      create: { email, name, role: "MEMBER", passwordHash },
      update: {},
    });
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: u.id, moduleCode: "M16", role } },
      create: { userId: u.id, moduleCode: "M16", role },
      update: {},
    });
    userByRole[role] = u;
  }

  await seedM16Qualifications(userByRole["QLCL"].id);

  const existing = await prisma.m16AuditPlan.count();
  if (existing > 0) {
    await linkM16ProgramMembers();
    return; // idempotent thô — dữ liệu demo chính chỉ seed lần đầu
  }

  const qlcl = userByRole["QLCL"];
  const ldp = userByRole["LDP"];
  const ldv = userByRole["LDV"];
  const year = new Date().getFullYear();

  // 1. Kế hoạch đã Phê duyệt → chương trình đã Xác nhận → phát hiện + báo cáo
  const plan1 = await prisma.m16AuditPlan.create({
    data: {
      code: `KHDG-${year}-0001`,
      type: "NOI_BO",
      year,
      scope: ["Phòng Đo lường Chất lượng", "Văn phòng"],
      auditors: ["Nguyễn Thị H.", "Đỗ Văn Trưởng Đoàn"],
      isAdHoc: false,
      status: "APPROVED",
      createdById: qlcl.id,
      reviewedById: ldp.id,
      approvedById: ldv.id,
    },
  });
  await prisma.m16AuditEntry.create({ data: { itemType: "PLAN", itemId: plan1.id, actorId: qlcl.id, role: "QLCL", action: "Lập kế hoạch đánh giá" } });
  await prisma.m16AuditEntry.create({ data: { itemType: "PLAN", itemId: plan1.id, actorId: ldp.id, role: "LDP", action: "Xem xét đạt → chờ phê duyệt" } });
  await prisma.m16AuditEntry.create({ data: { itemType: "PLAN", itemId: plan1.id, actorId: ldv.id, role: "LDV", action: "Phê duyệt kế hoạch đánh giá" } });

  const futureAuditDate = new Date();
  futureAuditDate.setDate(futureAuditDate.getDate() + 30);
  const program1 = await prisma.m16AuditProgram.create({
    data: {
      code: `CTDG-${year}-0001`,
      planId: plan1.id,
      department: "Phòng Đo lường Chất lượng",
      field: "Hiệu chuẩn thiết bị áp suất",
      auditDate: futureAuditDate,
      teamLeadName: "Đỗ Văn Trưởng Đoàn",
      teamMembers: ["Nguyễn Thị H."],
      status: "CONFIRMED",
      confirmedAt: new Date(),
    },
  });
  await linkM16ProgramMembers();
  await prisma.m16AuditEntry.create({ data: { itemType: "PROGRAM", itemId: program1.id, actorId: qlcl.id, role: "QLCL", action: "Lập chương trình đánh giá" } });
  await prisma.m16AuditEntry.create({ data: { itemType: "PROGRAM", itemId: program1.id, actorId: qlcl.id, role: "QLCL", action: "Xác nhận chương trình đánh giá (DRAFT → CONFIRMED)" } });

  const finding1 = await prisma.m16AuditFinding.create({
    data: {
      code: `PH-${year}-0001`,
      programId: program1.id,
      clauseRef: "ISO/IEC 17025 §6.2",
      department: "Phòng Đo lường Chất lượng",
      description: "Hồ sơ đào tạo nhân sự đầy đủ, đúng yêu cầu.",
      conformity: "PHU_HOP",
      evidence: "Hồ sơ TrainingRecord M03 đã kiểm tra chéo.",
      auditorSignature: "Nguyễn Thị H.",
    },
  });
  await prisma.m16AuditEntry.create({ data: { itemType: "PROGRAM", itemId: program1.id, actorId: qlcl.id, role: "QLCL", action: `Ghi phát hiện ${finding1.code} (PHU_HOP)` } });

  const finding2 = await prisma.m16AuditFinding.create({
    data: {
      code: `PH-${year}-0002`,
      programId: program1.id,
      clauseRef: "ISO/IEC 17025 §7.5",
      department: "Phòng Đo lường Chất lượng",
      description: "Biên bản đo lường thiếu chữ ký người soát xét ở 2/10 hồ sơ kiểm tra.",
      conformity: "KHONG_PHU_HOP",
      evidence: "Danh sách 2 hồ sơ thiếu chữ ký đính kèm.",
      auditorSignature: "Nguyễn Thị H.",
      capaRef: "CAPA-2026-DEMO (chưa có M13 backend thật)",
    },
  });
  await prisma.m16AuditEntry.create({
    data: { itemType: "PROGRAM", itemId: program1.id, actorId: qlcl.id, role: "QLCL", action: `Ghi phát hiện ${finding2.code} (KHONG_PHU_HOP)` },
  });

  const closingMeetingDate = new Date();
  closingMeetingDate.setDate(closingMeetingDate.getDate() - 2);
  const report1 = await prisma.m16AuditReport.create({
    data: {
      code: `BCDG-${year}-0001`,
      programId: program1.id,
      openingMeetingNotes: "Khai mạc đúng giờ, đủ thành phần tham dự.",
      closingMeetingDate,
      closingConclusion: "Đạt yêu cầu chung, 1 phát hiện Không phù hợp cần khắc phục trong 30 ngày.",
      submittedAt: new Date(),
      isLate: false,
      createdById: truongDoan.id,
    },
  });
  await prisma.m16AuditEntry.create({
    data: { itemType: "PROGRAM", itemId: program1.id, actorId: truongDoan.id, role: "TRUONGDOAN", action: `Đệ trình báo cáo tổng hợp ${report1.code}` },
  });

  // 2. Kế hoạch đang Chờ xem xét — demo luồng duyệt qua UI
  const plan2 = await prisma.m16AuditPlan.create({
    data: {
      code: `KHDG-${year}-0002`,
      type: "BEN_NGOAI",
      year,
      scope: ["Toàn Viện"],
      auditors: ["Tổ chức công nhận BoA"],
      isAdHoc: false,
      status: "PENDING_REVIEW",
      createdById: qlcl.id,
    },
  });
  await prisma.m16AuditEntry.create({ data: { itemType: "PLAN", itemId: plan2.id, actorId: qlcl.id, role: "QLCL", action: "Lập kế hoạch đánh giá" } });
  await prisma.m16AuditEntry.create({ data: { itemType: "PLAN", itemId: plan2.id, actorId: qlcl.id, role: "QLCL", action: "Gửi xem xét" } });

  console.log(
    `Đã nạp 2 kế hoạch + 1 chương trình + 2 phát hiện + 1 báo cáo demo M16 + năng lực đánh giá viên + vai trò M16 cho ${Object.keys(userByRole).length} tài khoản.`
  );
}

// M17 — xây mới từ 05_MODULE_LIBRARY/M17_XemXetLanhDao/01_Requirement/DacTa.md (không có
// 08_Source nguyên mẫu, giống M01/M02/M03/M04/M16). Dùng lại nth/ldp/ldv (QLCL/TP/LDV).
const M17_ROLE_EMAILS: Record<string, string> = {
  QLCL: "nth@manlab.vn",
  TP: "ldp@manlab.vn",
  LDV: "ldv@manlab.vn",
};

const M17_TOPIC_LABELS: Record<number, string> = {
  1: "Sự phù hợp của chính sách và mục tiêu chất lượng",
  2: "Sự phù hợp của các thủ tục",
  3: "Các kết quả đánh giá nội bộ",
  4: "Tình trạng hành động từ các cuộc xem xét trước",
  5: "Kết quả các cuộc đánh giá nội bộ gần nhất",
  6: "Các hành động khắc phục",
  7: "Kết quả đánh giá của tổ chức bên ngoài",
  8: "Kết quả so sánh liên phòng/thử nghiệm thành thạo",
  9: "Khiếu nại, phản hồi khách hàng, phản hồi nhân viên",
  10: "Khuyến nghị cải tiến",
  11: "Vấn đề quan trọng khác (chất lượng, nguồn lực, đào tạo)",
  12: "Mục tiêu năm tiếp theo",
};

async function seedM17() {
  const userByRole: Record<string, { id: string }> = {};
  for (const [role, email] of Object.entries(M17_ROLE_EMAILS)) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    userByRole[role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M17", role } },
      create: { userId: user.id, moduleCode: "M17", role },
      update: {},
    });
  }

  const existing = await prisma.m17ReviewPlan.count();
  if (existing > 0) return; // idempotent thô — chỉ seed lần đầu

  const qlcl = userByRole["QLCL"];
  const tp = userByRole["TP"];
  const ldv = userByRole["LDV"];
  const year = new Date().getFullYear();

  // 1. Chương trình đã Đồng phê duyệt (cả TP + LĐV) → biên bản đủ 12 nội dung + kết luận
  const plan1 = await prisma.m17ReviewPlan.create({
    data: {
      code: `CTXX-${year}-0001`,
      title: `Xem xét lãnh đạo Quý 4/${year}`,
      isAdHoc: false,
      plannedDate: new Date(`${year}-12-15`),
      location: "Phòng họp Viện",
      attendees: ["Lê Văn V. (LĐV)", "Trần Thị Hoa (TP)", "Nguyễn Thị H. (QLCL)"],
      plannedTopics: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      status: "APPROVED",
      createdById: qlcl.id,
      tpApprovedById: tp.id,
      tpApprovedAt: new Date(),
      ldvApprovedById: ldv.id,
      ldvApprovedAt: new Date(),
    },
  });
  await prisma.m17AuditEntry.create({ data: { itemType: "PLAN", itemId: plan1.id, actorId: qlcl.id, role: "QLCL", action: "Lập chương trình xem xét lãnh đạo" } });
  await prisma.m17AuditEntry.create({ data: { itemType: "PLAN", itemId: plan1.id, actorId: tp.id, role: "TP", action: "Trưởng phòng phê duyệt" } });
  await prisma.m17AuditEntry.create({ data: { itemType: "PLAN", itemId: plan1.id, actorId: ldv.id, role: "LDV", action: "LĐV phê duyệt" } });

  const topicResults = Object.entries(M17_TOPIC_LABELS).map(([id, label]) => ({
    topicId: Number(id),
    assessmentResult: `Đạt yêu cầu — ${label.toLowerCase()} được rà soát đầy đủ.`,
  }));
  const minutes1 = await prisma.m17ReviewMinutes.create({
    data: {
      code: `BBXX-${year}-0001`,
      planId: plan1.id,
      meetingDate: new Date(`${year}-12-15`),
      topicResults,
      conclusion: "Hệ thống quản lý vận hành phù hợp, cần bổ sung 1 hành động khắc phục về kiểm soát hồ sơ.",
      recordedById: qlcl.id,
    },
  });
  await prisma.m17AuditEntry.create({ data: { itemType: "MINUTES", itemId: minutes1.id, actorId: qlcl.id, role: "QLCL", action: "Lập biên bản xem xét (đủ 12 nội dung)" } });
  await prisma.m17AuditEntry.create({ data: { itemType: "MINUTES", itemId: minutes1.id, actorId: ldv.id, role: "LDV", action: "LĐV ghi kết luận cuộc họp" } });

  const overdueDate = new Date();
  overdueDate.setDate(overdueDate.getDate() - 5);
  const action1 = await prisma.m17ReviewActionTracking.create({
    data: {
      code: `HDXX-${year}-0001`,
      minutesId: minutes1.id,
      actionDescription: "Rà soát lại quy trình kiểm soát hồ sơ đo lường.",
      startDate: new Date(`${year}-12-16`),
      dueDate: overdueDate, // đã quá hạn — demo derived status
      status: "DANG_THUC_HIEN",
      assignedTo: "Trần Thị Hoa (TP)",
    },
  });
  await prisma.m17AuditEntry.create({ data: { itemType: "MINUTES", itemId: minutes1.id, actorId: qlcl.id, role: "QLCL", action: `Lập theo dõi hành động ${action1.code}` } });

  const action2 = await prisma.m17ReviewActionTracking.create({
    data: {
      code: `HDXX-${year}-0002`,
      minutesId: minutes1.id,
      actionDescription: "Cập nhật mục tiêu chất lượng năm sau.",
      startDate: new Date(`${year}-12-16`),
      dueDate: new Date(`${year + 1}-01-15`),
      status: "HOAN_THANH",
      assignedTo: "Nguyễn Thị H. (QLCL)",
    },
  });
  await prisma.m17AuditEntry.create({ data: { itemType: "MINUTES", itemId: minutes1.id, actorId: qlcl.id, role: "QLCL", action: `Lập theo dõi hành động ${action2.code}` } });

  const capa1 = await prisma.m17CorrectiveActionRequest.create({
    data: {
      code: `F13.01-${year}-0001`,
      minutesId: minutes1.id,
      description: "Khắc phục thiếu sót kiểm soát hồ sơ đo lường theo kết luận xem xét lãnh đạo.",
      createdById: qlcl.id,
    },
  });
  await prisma.m17AuditEntry.create({ data: { itemType: "MINUTES", itemId: minutes1.id, actorId: qlcl.id, role: "QLCL", action: `Lập phiếu yêu cầu khắc phục ${capa1.code} (→ M13)` } });

  // 2. Chương trình mới chỉ có TP duyệt — demo gate đồng phê duyệt còn thiếu LĐV
  const plan2 = await prisma.m17ReviewPlan.create({
    data: {
      code: `CTXX-${year}-0002`,
      title: "Xem xét lãnh đạo đột xuất — thay đổi phạm vi công nhận",
      isAdHoc: true,
      plannedDate: new Date(`${year + 1}-02-01`),
      location: "Phòng họp Viện",
      attendees: ["Lê Văn V. (LĐV)", "Trần Thị Hoa (TP)"],
      plannedTopics: [1, 2, 11, 12],
      status: "PENDING_APPROVAL",
      createdById: qlcl.id,
      tpApprovedById: tp.id,
      tpApprovedAt: new Date(),
    },
  });
  await prisma.m17AuditEntry.create({ data: { itemType: "PLAN", itemId: plan2.id, actorId: qlcl.id, role: "QLCL", action: "Lập chương trình xem xét lãnh đạo" } });
  await prisma.m17AuditEntry.create({ data: { itemType: "PLAN", itemId: plan2.id, actorId: qlcl.id, role: "QLCL", action: "Gửi yêu cầu duyệt" } });
  await prisma.m17AuditEntry.create({ data: { itemType: "PLAN", itemId: plan2.id, actorId: tp.id, role: "TP", action: "Trưởng phòng phê duyệt" } });

  console.log(`Đã nạp 2 chương trình + 1 biên bản + 2 hành động + 1 phiếu CAPA demo M17 + vai trò M17 cho ${Object.keys(userByRole).length} tài khoản.`);
}

// M12_KhieuNai — xây mới từ 01_Requirement/DacTa.md. Dùng LẠI 4 tài khoản đã có
// (nth=Người tiếp nhận, ldp=Cán bộ phụ trách, ldv=LĐV, qlcl@manlab.vn=QLCL — đã tạo sẵn ở
// seedM10() nhưng chưa dùng vai trò QLCL ở module nào trước đó), không tạo tài khoản mới.
const M12_ROLE_EMAILS: Record<string, string> = {
  TIEPNHAN: "nth@manlab.vn",
  PHUTRACH: "ldp@manlab.vn",
  LDV: "ldv@manlab.vn",
  QLCL: "qlcl@manlab.vn",
};

async function seedM12() {
  const userByRole: Record<string, { id: string }> = {};
  for (const [role, email] of Object.entries(M12_ROLE_EMAILS)) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    userByRole[role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M12", role } },
      create: { userId: user.id, moduleCode: "M12", role },
      update: {},
    });
  }

  const existing = await prisma.m12Complaint.count();
  if (existing > 0) return; // idempotent thô — chỉ seed lần đầu

  const tiepNhan = userByRole["TIEPNHAN"];
  const phuTrach = userByRole["PHUTRACH"];
  const ldv = userByRole["LDV"];
  const year = new Date().getFullYear();

  // 1. Giải thích ngay tại chỗ, khách hài lòng → đóng hồ sơ ngay, không cần F14.03 (quy tắc 2).
  const c1 = await prisma.m12Complaint.create({
    data: {
      code: `KN-${year}-0001`,
      channel: "TRUC_TIEP",
      content: "Khách hàng thắc mắc thời gian trả kết quả hiệu chuẩn — đã giải thích quy trình ngay tại quầy tiếp nhận.",
      resolvedOnSpot: true,
      customerSatisfiedOnSpot: true,
      isComplex: false,
      status: "DONG_HO_SO",
      resolution: "Giải thích trực tiếp ngay khi tiếp nhận — khách hàng đồng ý.",
      customerSatisfied: true,
      createdById: tiepNhan.id,
    },
  });
  await prisma.m12AuditEntry.create({ data: { itemType: "COMPLAINT", itemId: c1.id, actorId: tiepNhan.id, role: "TIEPNHAN", action: "Tiếp nhận khiếu nại — giải thích ngay, khách hài lòng → đóng hồ sơ" } });

  // 2. Không giải thích được ngay, CHƯA có F14.03 — demo gate EXTERNAL_DOC_REQUIRED sống qua UI.
  const c2 = await prisma.m12Complaint.create({
    data: {
      code: `KN-${year}-0002`,
      channel: "EMAIL",
      content: "Khách hàng khiếu nại kết quả thử nghiệm mẫu nước không khớp với kỳ vọng, yêu cầu giải trình bằng văn bản.",
      resolvedOnSpot: false,
      isComplex: false,
      status: "NHAP",
      createdById: tiepNhan.id,
    },
  });
  await prisma.m12AuditEntry.create({ data: { itemType: "COMPLAINT", itemId: c2.id, actorId: tiepNhan.id, role: "TIEPNHAN", action: "Tiếp nhận khiếu nại" } });

  // 3. Phức tạp, đã có F14.03, đã phân công, đã trả lời — chờ đóng, demo gate CAPA_REQUIRED sống.
  const c3 = await prisma.m12Complaint.create({
    data: {
      code: `KN-${year}-0003`,
      channel: "VAN_BAN",
      content: "Khách hàng khiếu nại sai sót thông tin hành chính trên GCN đã phát hành, nghi ngờ ảnh hưởng nhiều hồ sơ cùng đợt.",
      relatedCertificateRef: "GCN-2026-0088",
      resolvedOnSpot: false,
      isComplex: true,
      externalDocRef: "F14.03-2026-0004",
      status: "DA_TRA_LOI",
      resolution: "Đã rà soát, xác nhận sai sót do lỗi nhập liệu — đã đính chính và gửi lại GCN cho khách hàng.",
      createdById: tiepNhan.id,
      assignedToId: phuTrach.id,
    },
  });
  await prisma.m12AuditEntry.create({ data: { itemType: "COMPLAINT", itemId: c3.id, actorId: tiepNhan.id, role: "TIEPNHAN", action: "Tiếp nhận khiếu nại" } });
  await prisma.m12AuditEntry.create({ data: { itemType: "COMPLAINT", itemId: c3.id, actorId: ldv.id, role: "LDV", action: "LĐV phân công xử lý (NHAP → DANG_XU_LY)" } });
  await prisma.m12AuditEntry.create({ data: { itemType: "COMPLAINT", itemId: c3.id, actorId: phuTrach.id, role: "PHUTRACH", action: "Trả lời khách hàng (DANG_XU_LY → DA_TRA_LOI)" } });

  // 4. Feedback nội bộ ĐÃ escalate thành khiếu nại (quy tắc 6) — demo trạng thái đã chuyển.
  const escalated = await prisma.m12Complaint.create({
    data: {
      code: `KN-${year}-0004`,
      channel: "VAN_BAN",
      content: "Phản ánh nội bộ về phối hợp giữa 2 phòng ban làm chậm tiến độ trả kết quả — có dấu hiệu ảnh hưởng chất lượng dịch vụ.",
      resolvedOnSpot: false,
      isComplex: false,
      status: "NHAP",
      createdById: tiepNhan.id,
    },
  });
  const f1 = await prisma.m12Feedback.create({
    data: {
      code: `PNGY-${year}-0001`,
      origin: "NOI_BO",
      category: "PHOI_HOP_NOI_BO",
      content: "Phản ánh nội bộ về phối hợp giữa 2 phòng ban làm chậm tiến độ trả kết quả.",
      source: "Khảo sát nội bộ định kỳ",
      createdById: tiepNhan.id,
      escalatedComplaintId: escalated.id,
    },
  });
  await prisma.m12AuditEntry.create({ data: { itemType: "FEEDBACK", itemId: f1.id, actorId: tiepNhan.id, role: "TIEPNHAN", action: "Ghi nhận phàn nàn/góp ý" } });
  await prisma.m12AuditEntry.create({ data: { itemType: "FEEDBACK", itemId: f1.id, actorId: tiepNhan.id, role: "TIEPNHAN", action: `Chuyển thành khiếu nại ${escalated.code} (quy tắc 6 ETV.P12)` } });

  // 5. Feedback khách hàng CHƯA escalate — demo nút "Chuyển thành khiếu nại" còn sống.
  const f2 = await prisma.m12Feedback.create({
    data: {
      code: `PNGY-${year}-0002`,
      origin: "KHACH_HANG",
      category: "THOI_GIAN_XU_LY",
      content: "Khách hàng góp ý nên rút ngắn thời gian trả kết quả kiểm định thiết bị đo lường.",
      source: "Form etv.org.vn/danh-gia-va-phan-nan",
      createdById: tiepNhan.id,
    },
  });
  await prisma.m12AuditEntry.create({ data: { itemType: "FEEDBACK", itemId: f2.id, actorId: tiepNhan.id, role: "TIEPNHAN", action: "Ghi nhận phàn nàn/góp ý" } });

  console.log(`Đã nạp 4 khiếu nại + 2 phàn nàn/góp ý demo M12 + vai trò M12 cho ${Object.keys(userByRole).length} tài khoản.`);
}

// M13 — xây mới từ 05_MODULE_LIBRARY/M13_KhacPhuc/01_Requirement/DacTa.md (không có 08_Source
// nguyên mẫu). Dùng lại nth/qlcl/ldv@manlab.vn + tạo mới qlkt@manlab.vn cho vai trò QLKT (chưa
// từng có trong seed) — cùng cách M03 tạo vanphong@manlab.vn.
const M13_ROLE_EMAILS: Record<string, string> = {
  NHANVIEN: "nth@manlab.vn",
  QLCL: "qlcl@manlab.vn",
  LDV: "ldv@manlab.vn",
};

async function seedM13() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const userByRole: Record<string, { id: string }> = {};
  for (const [role, email] of Object.entries(M13_ROLE_EMAILS)) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    userByRole[role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M13", role } },
      create: { userId: user.id, moduleCode: "M13", role },
      update: {},
    });
  }

  const qlkt = await prisma.user.upsert({
    where: { email: "qlkt@manlab.vn" },
    create: { email: "qlkt@manlab.vn", name: "Hoàng T. (QLKT)", role: "MEMBER", passwordHash },
    update: {},
  });
  await prisma.moduleRoleAssignment.upsert({
    where: { userId_moduleCode_role: { userId: qlkt.id, moduleCode: "M13", role: "QLKT" } },
    create: { userId: qlkt.id, moduleCode: "M13", role: "QLKT" },
    update: {},
  });
  userByRole["QLKT"] = qlkt;

  const existing = await prisma.m13NonconformingWork.count();
  if (existing > 0) return; // idempotent thô — chỉ seed lần đầu

  const nhanVien = userByRole["NHANVIEN"];
  const qlcl = userByRole["QLCL"];
  const ldv = userByRole["LDV"];
  const year = new Date().getFullYear();

  // 1. Mức Nhẹ, CHƯA có ghi chép theo dõi — demo gate MONITORING_REQUIRED sống qua UI.
  const n1 = await prisma.m13NonconformingWork.create({
    data: {
      code: `KPH-${year}-0001`,
      sourceType: "TU_PHAT_HIEN",
      description: "Ghi nhãn mẫu thử nghiệm thiếu ngày tiếp nhận trên 2 mẫu nước — chưa ảnh hưởng kết quả đo.",
      severity: "NHE",
      severityBasis: "Chưa ảnh hưởng kết quả đo, khắc phục được ngay tại chỗ — QLKT đánh giá.",
      assessedById: qlkt.id,
      status: "DANG_THEO_DOI",
      detectedById: nhanVien.id,
    },
  });
  await prisma.m13AuditEntry.create({ data: { itemType: "NCW", itemId: n1.id, actorId: nhanVien.id, role: "NHANVIEN", action: "Ghi nhận công việc không phù hợp vào sổ theo dõi" } });
  await prisma.m13AuditEntry.create({ data: { itemType: "NCW", itemId: n1.id, actorId: qlkt.id, role: "QLKT", action: "Đánh giá mức độ: Nhẹ — tiếp tục việc, theo dõi chặt chẽ (GHI_NHAN → DANG_THEO_DOI)", reason: "Chưa ảnh hưởng kết quả đo, khắc phục được ngay tại chỗ — QLKT đánh giá." } });

  // 2. Mức Nặng, phương án ĐANG CHỜ THẨM XÉT, người thực hiện = QLCL — demo gate SELF_REVIEW
  //    (chính QLCL này không được tự thẩm xét) rồi nhánh thành công khi LĐV/QLCL khác xử lý.
  const n2 = await prisma.m13NonconformingWork.create({
    data: {
      code: `KPH-${year}-0002`,
      sourceType: "IC_VUOT_GIOI_HAN",
      sourceRef: "IC-2026-0042",
      description: "Mẫu kiểm soát nội bộ vượt giới hạn cảnh báo 3σ hai lần liên tiếp trên cân phân tích — nghi ngờ sai lệch hệ thống.",
      severity: "NANG",
      severityBasis: "Ảnh hưởng trực tiếp độ tin cậy kết quả đo của cả đợt — QLCL và QLKT thống nhất mức Nặng.",
      assessedById: qlcl.id,
      status: "DANG_KHAC_PHUC",
      stoppedWork: true,
      detectedById: nhanVien.id,
    },
  });
  const p2 = await prisma.m13CorrectiveActionPlan.create({
    data: {
      ncwId: n2.id,
      rootCause: "Cân phân tích lệch do nền đặt không ổn định sau khi di chuyển thiết bị.",
      actionPlan: "Hiệu chuẩn lại cân, cố định vị trí đặt, chạy lại mẫu IC 5 lần liên tiếp để xác nhận.",
      assignedToId: qlcl.id,
      status: "CHO_THAM_XET",
      completedAt: new Date(),
    },
  });
  await prisma.m13AuditEntry.create({ data: { itemType: "NCW", itemId: n2.id, actorId: nhanVien.id, role: "NHANVIEN", action: "Ghi nhận công việc không phù hợp vào sổ theo dõi" } });
  await prisma.m13AuditEntry.create({ data: { itemType: "NCW", itemId: n2.id, actorId: qlcl.id, role: "QLCL", action: "Đánh giá mức độ: Nặng — dừng hẳn công việc (GHI_NHAN → DANG_KHAC_PHUC)", reason: "Ảnh hưởng trực tiếp độ tin cậy kết quả đo của cả đợt." } });
  await prisma.m13AuditEntry.create({ data: { itemType: "CAP", itemId: p2.id, actorId: qlcl.id, role: "QLCL", action: "Báo hoàn thành hành động khắc phục — chờ QLCL thẩm xét (DANG_THUC_HIEN → CHO_THAM_XET)" } });

  // 3. Mức Nặng, ĐÃ thu hồi báo cáo, phương án CHƯA đạt — demo gate CAP_REVIEW_REQUIRED cả khi
  //    đóng hồ sơ lẫn khi LĐV xin cho phát hành báo cáo thay thế.
  const n3 = await prisma.m13NonconformingWork.create({
    data: {
      code: `KPH-${year}-0003`,
      sourceType: "TU_PHAT_HIEN",
      description: "Phát hiện dùng nhầm phương pháp thử cũ đã hết hiệu lực cho 3 báo cáo đã phát hành.",
      severity: "NANG",
      severityBasis: "Sai phương pháp trên báo cáo đã phát hành — bắt buộc thu hồi, ảnh hưởng khách hàng.",
      assessedById: ldv.id,
      status: "DANG_KHAC_PHUC",
      stoppedWork: true,
      emergencyStop: true,
      detectedById: nhanVien.id,
    },
  });
  await prisma.m13CorrectiveActionPlan.create({
    data: {
      ncwId: n3.id,
      rootCause: "Bản phương pháp cũ chưa được thu khỏi thư mục dùng chung sau khi ban hành bản mới.",
      actionPlan: "Thu hồi 3 báo cáo, đo lại theo phương pháp hiện hành, rà soát toàn bộ thư mục tài liệu kỹ thuật.",
      assignedToId: nhanVien.id,
      status: "DANG_THUC_HIEN",
    },
  });
  for (const ref of ["BC-2026-0155", "BC-2026-0156", "BC-2026-0157"]) {
    await prisma.m13RevokedReport.create({ data: { ncwId: n3.id, reportRef: ref, note: "Sai phương pháp thử — thu hồi theo quy tắc 4 ETV.P13" } });
  }
  await prisma.m13AuditEntry.create({ data: { itemType: "NCW", itemId: n3.id, actorId: nhanVien.id, role: "NHANVIEN", action: "Ghi nhận công việc không phù hợp — DỪNG NGAY khẩn cấp tại chỗ (quy tắc 1 ETV.P13)" } });
  await prisma.m13AuditEntry.create({ data: { itemType: "NCW", itemId: n3.id, actorId: ldv.id, role: "LDV", action: "Đánh giá mức độ: Nặng — dừng hẳn công việc (GHI_NHAN → DANG_KHAC_PHUC)", reason: "Sai phương pháp trên báo cáo đã phát hành — bắt buộc thu hồi." } });

  // 4. Nguồn phát hiện từ khiếu nại M12 — demo liên kết cross-module thật (tra theo mã khiếu nại).
  const complaint = await prisma.m12Complaint.findFirst({ where: { isComplex: true }, orderBy: { seq: "asc" } });
  const n4 = await prisma.m13NonconformingWork.create({
    data: {
      code: `KPH-${year}-0004`,
      sourceType: "KHIEU_NAI",
      sourceRef: complaint?.code ?? null,
      description: "Khiếu nại của khách hàng về sai sót thông tin hành chính trên GCN đã phát hành — nghi ngờ lỗi hệ thống nhập liệu.",
      status: "GHI_NHAN",
      detectedById: nhanVien.id,
    },
  });
  await prisma.m13AuditEntry.create({ data: { itemType: "NCW", itemId: n4.id, actorId: nhanVien.id, role: "NHANVIEN", action: `Ghi nhận công việc không phù hợp từ khiếu nại ${complaint?.code ?? "—"} (← M12)` } });

  console.log(`Đã nạp 4 hồ sơ công việc không phù hợp demo M13 + vai trò M13 cho ${Object.keys(userByRole).length} tài khoản (có tạo mới qlkt@manlab.vn).`);
}

// M14 — xây mới từ 05_MODULE_LIBRARY/M14_TaiLieu (đã có sẵn API.md/DataModel.md/StateMachine.md).
// Dùng lại nth/ldp/ldv/vanphong@manlab.vn + ai-operator@manlab.vn (M29) và tạo mới pvt@manlab.vn
// cho vai trò LDV_UYQUYEN — vai trò chỉ tồn tại để kiểm chứng quy tắc 4 "không ủy quyền".
const M14_ROLE_EMAILS: Record<string, string> = {
  NTH: "nth@manlab.vn",
  LDP: "ldp@manlab.vn",
  LDV: "ldv@manlab.vn",
  VANTHU: "vanphong@manlab.vn",
  AI_AGENT: "ai-operator@manlab.vn",
};

async function seedM14() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const userByRole: Record<string, { id: string }> = {};
  for (const [role, email] of Object.entries(M14_ROLE_EMAILS)) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    userByRole[role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M14", role } },
      create: { userId: user.id, moduleCode: "M14", role },
      update: {},
    });
  }

  const pvt = await prisma.user.upsert({
    where: { email: "pvt@manlab.vn" },
    create: { email: "pvt@manlab.vn", name: "Vũ M. (Phó Viện trưởng — được ủy quyền)", role: "MEMBER", passwordHash },
    update: {},
  });
  await prisma.moduleRoleAssignment.upsert({
    where: { userId_moduleCode_role: { userId: pvt.id, moduleCode: "M14", role: "LDV_UYQUYEN" } },
    create: { userId: pvt.id, moduleCode: "M14", role: "LDV_UYQUYEN" },
    update: {},
  });
  userByRole["LDV_UYQUYEN"] = pvt;

  const existing = await prisma.m14Document.count();
  if (existing > 0) return; // idempotent thô — chỉ seed lần đầu

  const nth = userByRole["NTH"];
  const ldp = userByRole["LDP"];
  const ldv = userByRole["LDV"];
  const vanthu = userByRole["VANTHU"];
  const ai = userByRole["AI_AGENT"];

  // 1. Thủ tục Nháp THIẾU trường bắt buộc — demo gate MISSING_REQUIRED_FIELD sống qua UI.
  const d1 = await prisma.m14Document.create({
    data: {
      code: "ETV.P 21",
      title: "Thủ tục Kiểm soát dữ liệu quan trắc tự động",
      docType: "THU_TUC",
      owner: "LĐP phụ trách Hệ thống quản lý",
      department: "Phòng Đo lường Chất lượng",
      processCode: "MP21_CongBoNangLuc",
      status: "NHAP",
      createdById: nth.id,
      // cố ý thiếu: revision, effectiveDate, knowledgeCategory, permissionGroup, retention,
      // sourceOrg, isoClause
    },
  });
  await prisma.m14AuditEntry.create({ data: { itemType: "DOCUMENT", itemId: d1.id, actorId: nth.id, role: "NTH", action: "Soạn thảo văn bản mới" } });
  const s1 = await prisma.m14AiSuggestion.create({
    data: {
      documentId: d1.id,
      field: "isoClause",
      createdById: ai.id,
      suggestedValue: "ISO/IEC 17025:2017 §7.11; ISO 9001:2015 §7.5",
      rationale: "AI nhận diện nội dung kiểm soát dữ liệu — gợi ý điều khoản tương ứng, chờ người có thẩm quyền xác nhận.",
    },
  });
  await prisma.m14AuditEntry.create({ data: { itemType: "SUGGESTION", itemId: s1.id, actorId: ai.id, role: "AI_AGENT", action: 'AI gợi ý trường "isoClause" — chờ người có thẩm quyền áp dụng' } });

  // 2. Quy trình ĐANG CHỜ SOÁT XÉT do chính LĐP lập — demo gate SELF_REVIEW.
  const d2 = await prisma.m14Document.create({
    data: {
      code: "ETV.MCW 07",
      title: "Quy trình hiệu chuẩn đồng hồ đo nước lạnh cấp C",
      docType: "QUY_TRINH",
      owner: "LĐP phụ trách kỹ thuật",
      department: "Phòng Đo lường Chất lượng",
      processCode: "MP08_PhuongPhap",
      revision: "01",
      effectiveDate: new Date("2026-09-01"),
      isoClause: ["ISO/IEC 17025:2017 §7.2"],
      knowledgeCategory: "NOI_BO",
      permissionGroup: "Noi-bo",
      retention: "36 tháng",
      sourceOrg: "Viện Kiểm định Công nghệ và Môi trường (ETV)",
      status: "CHO_SOAT_XET",
      createdById: ldp.id,
    },
  });
  await prisma.m14AuditEntry.create({ data: { itemType: "DOCUMENT", itemId: d2.id, actorId: ldp.id, role: "LDP", action: "Soạn thảo văn bản mới" } });
  await prisma.m14AuditEntry.create({ data: { itemType: "DOCUMENT", itemId: d2.id, actorId: ldp.id, role: "LDP", action: "Gửi soát xét (NHAP → CHO_SOAT_XET)" } });

  // 3. Sổ tay chất lượng CHỜ PHÊ DUYỆT — demo gate NO_DELEGATION (người được ủy quyền bị chặn).
  const d3 = await prisma.m14Document.create({
    data: {
      code: "ETV.QM",
      title: "Sổ tay chất lượng ETV (lần ban hành 04)",
      docType: "SO_TAY",
      owner: "Lãnh đạo Viện",
      department: "Toàn Viện",
      processCode: "MP14_TaiLieu",
      revision: "04",
      effectiveDate: new Date("2026-10-01"),
      isoClause: ["ISO/IEC 17025:2017 §8.2", "ISO 9001:2015 §4.4"],
      knowledgeCategory: "NOI_BO",
      permissionGroup: "Noi-bo",
      retention: "Vĩnh viễn",
      sourceOrg: "Viện Kiểm định Công nghệ và Môi trường (ETV)",
      status: "CHO_PHE_DUYET",
      createdById: nth.id,
      reviewedById: ldp.id,
    },
  });
  await prisma.m14AuditEntry.create({ data: { itemType: "DOCUMENT", itemId: d3.id, actorId: nth.id, role: "NTH", action: "Soạn thảo văn bản mới" } });
  await prisma.m14AuditEntry.create({ data: { itemType: "DOCUMENT", itemId: d3.id, actorId: nth.id, role: "NTH", action: "Gửi soát xét (NHAP → CHO_SOAT_XET)" } });
  await prisma.m14AuditEntry.create({ data: { itemType: "DOCUMENT", itemId: d3.id, actorId: ldp.id, role: "LDP", action: "LĐP soát xét đạt — trình phê duyệt (CHO_SOAT_XET → CHO_PHE_DUYET)" } });

  // 4. Công văn ĐÃ PHÊ DUYỆT, CHƯA ban hành — demo publish + thanh lý/hủy bỏ.
  const d4 = await prisma.m14Document.create({
    data: {
      code: "ETV.CV 118/2026",
      title: "Công văn hướng dẫn áp dụng biểu mẫu kiểm soát tài liệu mới",
      docType: "CONG_VAN",
      owner: "Văn thư",
      department: "Toàn Viện",
      processCode: "MP14_TaiLieu",
      revision: "01",
      effectiveDate: new Date("2026-08-15"),
      knowledgeCategory: "NOI_BO",
      permissionGroup: "Noi-bo",
      retention: "60 tháng",
      sourceOrg: "Viện Kiểm định Công nghệ và Môi trường (ETV)",
      status: "DA_PHE_DUYET",
      createdById: nth.id,
      reviewedById: ldp.id,
      approvedById: ldv.id,
    },
  });
  await prisma.m14AuditEntry.create({ data: { itemType: "DOCUMENT", itemId: d4.id, actorId: ldv.id, role: "LDV", action: "Phê duyệt ban hành (CHO_PHE_DUYET → DA_PHE_DUYET)" } });

  // 5. Văn bản BÊN NGOÀI (F14.03) — mã khớp externalDocRef của khiếu nại M12 seed sẵn,
  //    demo liên kết cross-module chiều M14 → M12.
  const d5 = await prisma.m14Document.create({
    data: {
      code: "F14.03-2026-0004",
      title: "Văn bản khiếu nại chính thức của khách hàng về sai sót thông tin trên GCN",
      docType: "VAN_BAN_BEN_NGOAI",
      owner: "Văn thư",
      department: "Toàn Viện",
      revision: "01",
      effectiveDate: new Date("2026-08-20"),
      knowledgeCategory: "NOI_BO",
      permissionGroup: "Noi-bo",
      retention: "60 tháng",
      sourceOrg: "Khách hàng (văn bản đến)",
      status: "DA_PHE_DUYET",
      createdById: vanthu.id,
      reviewedById: ldp.id,
      approvedById: ldv.id,
      publishedAt: new Date(),
      publishedById: vanthu.id,
      distributionNote: "Vào sổ văn bản đến, chuyển cán bộ phụ trách xử lý khiếu nại.",
    },
  });
  await prisma.m14AuditEntry.create({ data: { itemType: "DOCUMENT", itemId: d5.id, actorId: vanthu.id, role: "VANTHU", action: "Tiếp nhận văn bản đến, vào sổ F14.03" } });

  // 6. Thủ tục mới THAY THẾ bản cũ — demo cặp nghịch đảo supersedes/superseded_by (quy tắc 6).
  const oldProc = await prisma.m14Document.create({
    data: {
      code: "ETV.P 15",
      title: "Thủ tục Kiểm soát hồ sơ (lần ban hành 02)",
      docType: "THU_TUC",
      owner: "LĐP phụ trách Hệ thống quản lý",
      department: "Toàn Viện",
      processCode: "MP15_HoSo",
      revision: "02",
      effectiveDate: new Date("2023-04-22"),
      isoClause: ["ISO/IEC 17025:2017 §8.4"],
      knowledgeCategory: "NOI_BO",
      permissionGroup: "Noi-bo",
      retention: "Vĩnh viễn",
      sourceOrg: "Viện Kiểm định Công nghệ và Môi trường (ETV)",
      status: "DA_PHE_DUYET",
      createdById: nth.id,
      reviewedById: ldp.id,
      approvedById: ldv.id,
      publishedAt: new Date("2023-04-22"),
      publishedById: vanthu.id,
      distributionNote: "Phân phối bản kiểm soát cho các phòng.",
    },
  });
  const newProc = await prisma.m14Document.create({
    data: {
      code: "ETV.P.F 15.01",
      title: "Biểu mẫu Danh mục hồ sơ chất lượng (bản soát xét 2026)",
      docType: "BIEU_MAU",
      owner: "LĐP phụ trách Hệ thống quản lý",
      department: "Toàn Viện",
      processCode: "MP15_HoSo",
      revision: "03",
      effectiveDate: new Date("2026-08-01"),
      isoClause: ["ISO/IEC 17025:2017 §8.4"],
      knowledgeCategory: "NOI_BO",
      permissionGroup: "Noi-bo",
      retention: "Vĩnh viễn",
      sourceOrg: "Viện Kiểm định Công nghệ và Môi trường (ETV)",
      status: "NHAP",
      createdById: nth.id,
      supersedesId: oldProc.id,
    },
  });
  await prisma.m14AuditEntry.create({ data: { itemType: "DOCUMENT", itemId: newProc.id, actorId: nth.id, role: "NTH", action: `Soạn thảo văn bản mới (thay thế ${oldProc.code})` } });

  console.log(`Đã nạp 7 văn bản demo M14 + 1 gợi ý AI + vai trò M14 cho ${Object.keys(userByRole).length} tài khoản (có tạo mới pvt@manlab.vn).`);
}

// M26 — Quản lý tri thức tổ chức. Nguồn: Thủ tục ETV.P26 (ban hành lần 01, 23/08/2026) +
// 05_MODULE_LIBRARY/M26_TriThuc/01_Requirement/DacTa.md. Dùng lại nth/ldp/ldv/qtht + tạo mới
// ktv@manlab.vn cho vai trò Nhân viên (người giữ tri thức ẩn — cần tách khỏi QLCL/TP để demo
// gate lọc theo mức bảo mật và gate tri thức ẩn trọng yếu).
const M26_ROLE_EMAILS: Record<string, string> = {
  QLCL: "nth@manlab.vn",
  TP: "ldp@manlab.vn",
  LDV: "ldv@manlab.vn",
  QTHT: "qtht@manlab.vn",
  NV: "ktv@manlab.vn",
};

async function seedM26() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  await prisma.user.upsert({
    where: { email: "ktv@manlab.vn" },
    create: { email: "ktv@manlab.vn", name: "Trần V. K. (Kiểm nghiệm viên)", role: "MEMBER", passwordHash },
    update: {},
  });

  const userByRole: Record<string, { id: string }> = {};
  for (const [role, email] of Object.entries(M26_ROLE_EMAILS)) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    userByRole[role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M26", role } },
      create: { userId: user.id, moduleCode: "M26", role },
      update: {},
    });
  }

  if ((await prisma.m26KnowledgeItem.count()) > 0) return; // idempotent thô — chỉ seed lần đầu

  const qlcl = userByRole["QLCL"];
  const tp = userByRole["TP"];
  const ldv = userByRole["LDV"];
  const nv = userByRole["NV"];
  const year = new Date().getFullYear();
  const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000);
  const daysAhead = (n: number) => new Date(Date.now() + n * 86_400_000);

  const audit = (itemType: "ITEM" | "LESSON" | "NEED" | "SHARING", itemId: string, actorId: string, role: string, action: string, before?: string | null, after?: string | null) =>
    prisma.m26AuditEntry.create({ data: { itemType, itemId, actorId, role, action, before: before ?? null, after: after ?? null } });

  // Tài liệu kiểm soát có sẵn ở M14 để minh họa quy tắc 2 (mục tri thức trỏ doc_ref, không tự đánh phiên bản).
  const doc = await prisma.m14Document.findFirst({ where: { status: "DA_PHE_DUYET" }, orderBy: { code: "asc" } });
  // Rủi ro có sẵn ở M01 để minh họa quy tắc 3 (rủi ro mất tri thức trọng yếu).
  const risk = await prisma.m01RiskItem.findFirst({ orderBy: { createdAt: "asc" } });

  // 1. Tri thức hiện, đã phê duyệt, đang nằm trong chỉ mục AI (bảo mật Nội bộ).
  const item1 = await prisma.m26KnowledgeItem.create({
    data: {
      code: `TT-${year}-0001`,
      title: "Quy trình ước lượng độ không đảm bảo đo cho phép đo điện áp một chiều",
      knowledgeForm: "TRI_THUC_HIEN",
      category: "KY_THUAT_DO_LUONG",
      origin: "NOI_BO",
      summary:
        "Cách xác định các nguồn thành phần độ không đảm bảo (chuẩn, độ phân giải, độ lặp lại, ảnh hưởng nhiệt độ), hệ số phủ và cách trình bày kết quả trong giấy chứng nhận hiệu chuẩn.",
      sourceRef: "08_KNOWLEDGE_GRAPH/14_Technical_References/UncertaintyBudget_DCV.md",
      docId: doc?.id ?? null,
      ownerId: tp.id,
      criticality: "TRUNG_BINH",
      confidentiality: "NOI_BO",
      appliesTo: ["ĐLVN 42:2017", "Chuẩn đa năng Fluke 5522A"],
      reviewCycle: "HAI_NAM",
      lastReviewedAt: daysAgo(60),
      aiIndexed: true,
      status: "APPROVED",
      createdById: qlcl.id,
      reviewedById: tp.id,
      reviewedAt: daysAgo(64),
      approvedById: ldv.id,
      approvedAt: daysAgo(62),
    },
  });
  await audit("ITEM", item1.id, qlcl.id, "QLCL", "Lập mục tri thức", null, "DRAFT");
  await audit("ITEM", item1.id, tp.id, "TP", "Soát xét đạt", "PENDING_REVIEW", "PENDING_APPROVAL");
  await audit("ITEM", item1.id, ldv.id, "LDV", "LĐV phê duyệt", "PENDING_APPROVAL", "APPROVED");
  await audit("ITEM", item1.id, qlcl.id, "QLCL", "Bật chỉ mục trợ lý AI", "false", "true");

  // 2. Tri thức ẩn TRỌNG YẾU CAO, chỉ 1 người giữ, chưa có rủi ro M01 và chưa có nhu cầu chuyển giao
  //    ⇒ cố tình để ở Chờ phê duyệt để demo gate chặn cứng (quy tắc 3 / ETV.P26 mục 5.1.6).
  const item2 = await prisma.m26KnowledgeItem.create({
    data: {
      code: `TT-${year}-0002`,
      title: "Kinh nghiệm xử lý mẫu nền phức tạp khi thử nghiệm kim loại nặng trong bùn thải",
      knowledgeForm: "TRI_THUC_AN",
      category: "KY_THUAT_DO_LUONG",
      origin: "NOI_BO",
      summary:
        "Cách nhận biết và xử lý nền mẫu gây nhiễu khi phá mẫu, thứ tự thêm axit, dấu hiệu mất mẫu — hiện chỉ một kiểm nghiệm viên làm thành thạo, chưa văn bản hóa.",
      ownerId: tp.id,
      criticality: "CAO",
      confidentiality: "NOI_BO",
      appliesTo: ["Phá mẫu vi sóng", "ICP-MS"],
      reviewCycle: "NAM",
      status: "PENDING_APPROVAL",
      createdById: qlcl.id,
      reviewedById: tp.id,
      reviewedAt: daysAgo(3),
    },
  });
  await prisma.m26KnowledgeHolder.create({ data: { itemId: item2.id, userId: nv.id, note: "Người duy nhất thực hiện thành thạo" } });
  await audit("ITEM", item2.id, qlcl.id, "QLCL", "Lập mục tri thức", null, "DRAFT");
  await audit("ITEM", item2.id, tp.id, "TP", "Soát xét đạt", "PENDING_REVIEW", "PENDING_APPROVAL");

  // 3. Mục đã phê duyệt nhưng QUÁ HẠN rà soát (chu kỳ 1 năm, rà soát lần cuối 400 ngày trước).
  const item3 = await prisma.m26KnowledgeItem.create({
    data: {
      code: `TT-${year}-0003`,
      title: "Danh mục văn bản pháp luật về đo lường áp dụng cho hoạt động kiểm định",
      knowledgeForm: "TRI_THUC_HIEN",
      category: "PHAP_LY_TIEU_CHUAN",
      origin: "BEN_NGOAI",
      summary: "Tập hợp luật, nghị định, thông tư và ĐLVN đang áp dụng, kèm ghi chú hiệu lực và điều khoản liên quan tới phạm vi chỉ định của Viện.",
      sourceRef: "08_KNOWLEDGE_GRAPH/01_Regulations/",
      ownerId: qlcl.id,
      criticality: "CAO",
      confidentiality: "CONG_KHAI",
      appliesTo: [],
      reviewCycle: "NAM",
      lastReviewedAt: daysAgo(400),
      aiIndexed: true,
      status: "APPROVED",
      createdById: qlcl.id,
      reviewedById: tp.id,
      reviewedAt: daysAgo(402),
      approvedById: ldv.id,
      approvedAt: daysAgo(400),
    },
  });
  await audit("ITEM", item3.id, ldv.id, "LDV", "LĐV phê duyệt", "PENDING_APPROVAL", "APPROVED");

  // 4. Mục mức MẬT — dùng để kiểm tra lọc theo mức bảo mật (AC8) và cấm đưa vào chỉ mục AI (AC7).
  const item4 = await prisma.m26KnowledgeItem.create({
    data: {
      code: `TT-${year}-0004`,
      title: "Cấu hình và khóa an toàn hệ thống ký số nội bộ",
      knowledgeForm: "TRI_THUC_HIEN",
      category: "SO_HOA_DU_LIEU_AI",
      origin: "NOI_BO",
      summary: "Sơ đồ đặt khóa, quy trình cấp phát và thu hồi chứng thư số nội bộ, danh sách người giữ khóa dự phòng.",
      sourceRef: "M15 — hồ sơ an toàn thông tin (lưu nội bộ, không công bố)",
      ownerId: qlcl.id,
      criticality: "CAO",
      confidentiality: "MAT",
      appliesTo: ["Hệ thống ký số nội bộ"],
      reviewCycle: "SAU_THANG",
      lastReviewedAt: daysAgo(20),
      status: "APPROVED",
      createdById: qlcl.id,
      reviewedById: tp.id,
      reviewedAt: daysAgo(24),
      approvedById: ldv.id,
      approvedAt: daysAgo(22),
    },
  });
  await audit("ITEM", item4.id, ldv.id, "LDV", "LĐV phê duyệt", "PENDING_APPROVAL", "APPROVED");

  // 5. Mục nháp do TP lập — dùng để kiểm tra tách vai trò: TP không tự soát xét mục của mình (AC4).
  const item5 = await prisma.m26KnowledgeItem.create({
    data: {
      code: `TT-${year}-0005`,
      title: "Cách xử lý khi thiết bị chuẩn trôi điểm giữa hai kỳ hiệu chuẩn",
      knowledgeForm: "TRI_THUC_HIEN",
      category: "VAN_HANH_THIET_BI",
      origin: "NOI_BO",
      summary: "Dấu hiệu nhận biết trôi điểm, cách kiểm tra trung gian, ngưỡng dừng sử dụng và các bước xử lý kết quả đã phát hành.",
      sourceRef: "08_KNOWLEDGE_GRAPH/15_HDSD_ThietBi/",
      ownerId: tp.id,
      criticality: "TRUNG_BINH",
      confidentiality: "NOI_BO",
      appliesTo: [],
      reviewCycle: "NAM",
      status: "PENDING_REVIEW",
      createdById: tp.id,
    },
  });
  await audit("ITEM", item5.id, tp.id, "TP", "Lập mục tri thức", null, "DRAFT");

  // Bài học kinh nghiệm: 1 mới (chưa phân tích), 1 đã phê duyệt và đã kết tinh thành mục tri thức.
  const ncw = await prisma.m13NonconformingWork.findFirst({ orderBy: { code: "asc" } });
  const lesson1 = await prisma.m26LessonLearned.create({
    data: {
      code: `BH-${year}-0001`,
      title: "Kết quả thử nghiệm bị ảnh hưởng do mẫu lưu sai điều kiện bảo quản",
      sourceType: "KPH_CAPA",
      sourceRef: ncw?.code ?? "KPH-2026-0001",
      m13NcId: ncw?.id ?? null,
      context: "Một lô mẫu được lưu ở tủ không kiểm soát nhiệt độ trong 2 ngày trước khi phân tích, phát hiện khi soát xét hồ sơ.",
      rootCauseRef: ncw?.code ?? null,
      lesson: "Điều kiện bảo quản mẫu phải được kiểm tra và ghi nhận ngay khi tiếp nhận, không đợi tới bước phân tích.",
      recommendedAction: "Bổ sung bước xác nhận điều kiện bảo quản vào phiếu tiếp nhận mẫu và kiểm tra chéo hằng ngày.",
      shareRequired: true,
      status: "MOI",
      createdById: qlcl.id,
    },
  });
  await audit("LESSON", lesson1.id, qlcl.id, "QLCL", "Tạo phiếu bài học từ KPH của M13", null, "MOI");

  const lesson2 = await prisma.m26LessonLearned.create({
    data: {
      code: `BH-${year}-0002`,
      title: "Sai lệch khi hiệu chuẩn do bỏ qua thời gian ổn định nhiệt của chuẩn",
      sourceType: "KET_QUA_NGOAI_KIEM_SOAT",
      sourceRef: "M10 — kết quả so sánh liên phòng ngoài kiểm soát",
      context: "Kết quả kiểm tra trung gian lệch khỏi giới hạn cảnh báo; truy nguyên cho thấy chuẩn chưa đủ thời gian ổn định nhiệt sau vận chuyển.",
      lesson: "Chuẩn sau vận chuyển phải ổn định nhiệt tối thiểu theo hướng dẫn của nhà sản xuất trước khi dùng để hiệu chuẩn.",
      recommendedAction: "Ghi rõ thời gian ổn định nhiệt tối thiểu trong quy trình đo và nhật ký sử dụng thiết bị.",
      knowledgeItemId: item1.id,
      shareRequired: true,
      status: "DA_PHE_DUYET",
      createdById: qlcl.id,
      approvedById: ldv.id,
      approvedAt: daysAgo(30),
    },
  });
  await audit("LESSON", lesson2.id, ldv.id, "LDV", "LĐV phê duyệt bài học", "CHO_PHE_DUYET", "DA_PHE_DUYET");

  // Nhu cầu tri thức: 1 quá hạn còn mở, 1 đã đáp ứng bằng hồ sơ đào tạo M03.
  const need1 = await prisma.m26KnowledgeNeed.create({
    data: {
      code: `NC-${year}-0001`,
      trigger: "MO_RONG_PHAM_VI",
      triggerRef: "Hồ sơ mở rộng phạm vi chỉ định — phép thử kim loại nặng trong bùn thải",
      description: "Thiếu tri thức vận hành phá mẫu vi sóng cho nền mẫu bùn thải; hiện chỉ một người làm được.",
      requiredBy: daysAgo(15), // đã quá hạn — hiện cảnh báo cho LĐV
      method: "KEM_CAP",
      responsibleId: tp.id,
      targetItemId: item2.id, // phiếu chuyển giao cho chính mục tri thức ẩn trọng yếu (ETV.P26 mục 5.1.6)
      status: "DANG_BO_SUNG",
      createdById: qlcl.id,
    },
  });
  await audit("NEED", need1.id, qlcl.id, "QLCL", "Lập phiếu nhu cầu tri thức", null, "MO");

  const training = await prisma.m03TrainingRecord.findFirst({ where: { result: "DAT", status: "APPROVED" }, orderBy: { code: "asc" } });
  const need2 = await prisma.m26KnowledgeNeed.create({
    data: {
      code: `NC-${year}-0002`,
      trigger: "THAY_DOI_PHAP_LUAT",
      triggerRef: "Văn bản pháp luật về đo lường có hiệu lực trong năm",
      description: "Cập nhật tri thức pháp lý cho nhân sự kỹ thuật sau khi văn bản mới có hiệu lực.",
      requiredBy: daysAgo(45),
      method: "DAO_TAO_NOI_BO",
      responsibleId: qlcl.id,
      resultTrainingId: training?.id ?? null,
      resultItemId: training ? null : item3.id, // luôn có đầu ra để đúng quy tắc 8
      status: "DA_DAP_UNG",
      createdById: qlcl.id,
      decidedById: qlcl.id,
      decidedAt: daysAgo(40),
    },
  });
  await audit("NEED", need2.id, qlcl.id, "QLCL", "Đóng nhu cầu — đã đáp ứng", "DANG_BO_SUNG", "DA_DAP_UNG");

  // Hoạt động chia sẻ đã thực hiện, gắn 2 mục tri thức đã phê duyệt.
  const sharing = await prisma.m26SharingEvent.create({
    data: {
      code: `CS-${year}-0001`,
      form: "SINH_HOAT_CHUYEN_MON",
      heldAt: daysAgo(25),
      topic: "Ước lượng độ không đảm bảo đo và bài học từ kết quả ngoài kiểm soát",
      presenterId: tp.id,
      effectivenessNote: "Nhân sự nắm được cách lập bảng thành phần độ không đảm bảo; đề nghị bổ sung ví dụ cho phép đo nhiệt độ.",
      status: "DA_THUC_HIEN",
      createdById: qlcl.id,
      items: { create: [{ itemId: item1.id }, { itemId: item3.id }] },
      participants: { create: [{ userId: qlcl.id }, { userId: nv.id }, { userId: tp.id }] },
    },
  });
  await audit("SHARING", sharing.id, qlcl.id, "QLCL", "Ghi nhận hoạt động chia sẻ đã thực hiện", "KE_HOACH", "DA_THUC_HIEN");

  console.log(
    `Đã nạp 5 mục tri thức (2 đã phê duyệt + 1 quá hạn rà soát + 1 Mật + 1 chờ soát xét), 2 bài học, 2 nhu cầu, 1 hoạt động chia sẻ demo M26 ` +
      `+ vai trò M26 cho ${Object.keys(userByRole).length} tài khoản.`,
  );
  console.log(`Tài khoản M26 demo: ${Object.values(M26_ROLE_EMAILS).join(", ")}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// M25 — xây mới từ 05_MODULE_LIBRARY/M25_BoiCanh/01_Requirement/DacTa.md. CHƯA có Thủ tục
// ETV.P25 (đặc tả suy dẫn từ Sổ tay chất lượng §9.2 + ISO 9001 §4.1/§4.2). Dùng lại
// nth/ldp/ldv (QLCL/TP/LDV) như M16/M17 — không tạo tài khoản mới.
const M25_ROLE_EMAILS: Record<string, string> = {
  QLCL: "nth@manlab.vn",
  TP: "ldp@manlab.vn",
  LDV: "ldv@manlab.vn",
};

async function seedM25() {
  const userByRole: Record<string, { id: string }> = {};
  for (const [role, email] of Object.entries(M25_ROLE_EMAILS)) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    userByRole[role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M25", role } },
      create: { userId: user.id, moduleCode: "M25", role },
      update: {},
    });
  }

  const existing = await prisma.m25ContextReview.count();
  if (existing > 0) return; // idempotent thô — chỉ seed lần đầu

  const qlcl = userByRole["QLCL"];
  const tp = userByRole["TP"];
  const ldv = userByRole["LDV"];
  const year = new Date().getFullYear();
  const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000);

  // 1. Kỳ định kỳ đã phê duyệt — hồ sơ bất biến, dùng làm bằng chứng ISO 9001 §4.1/§4.2
  const review1 = await prisma.m25ContextReview.create({
    data: {
      code: `BC-${year}-0001`,
      cycleType: "DINH_KY",
      periodYear: year,
      scopeSystems: ["ISO_9001", "ISO_17025", "ISO_17034"],
      summary: "Rà soát bối cảnh đầu năm: pháp luật đo lường có thay đổi, nhu cầu kiểm định phương tiện đo tăng, nhân lực kỹ thuật còn mỏng.",
      conclusion: "Thông qua bối cảnh và danh mục bên quan tâm; giao QLCL chuyển 2 vấn đề mức Cao sang M01 theo dõi xử lý.",
      status: "APPROVED",
      createdById: qlcl.id,
      reviewedById: tp.id,
      reviewedAt: daysAgo(200),
      approvedById: ldv.id,
      approvedAt: daysAgo(198),
    },
  });
  for (const [actorId, role, action] of [
    [qlcl.id, "QLCL", "Lập kỳ xem xét bối cảnh"],
    [tp.id, "TP", "Soát xét đạt (DRAFT → PENDING_APPROVAL)"],
    [ldv.id, "LDV", "LĐV phê duyệt (PENDING_APPROVAL → APPROVED)"],
  ] as const) {
    await prisma.m25AuditEntry.create({ data: { itemType: "REVIEW", itemId: review1.id, actorId, role, action } });
  }

  // Vấn đề mức Cao → bắt buộc có liên kết M01 (quy tắc 3). Lấy rủi ro/cơ hội có sẵn của M01 seed.
  const risk = await prisma.m01RiskItem.findFirst({ orderBy: { createdAt: "asc" } });
  const opportunity = await prisma.m01OpportunityItem.findFirst({ orderBy: { createdAt: "asc" } });

  const issue1 = await prisma.m25ContextIssue.create({
    data: {
      code: `VD-${year}-0001`,
      reviewId: review1.id,
      origin: "BEN_NGOAI",
      category: "CHINH_TRI_PHAP_LY",
      title: "Thay đổi văn bản quy phạm pháp luật về đo lường",
      description: "Nghị định mới thay thế quy định cũ về kiểm định phương tiện đo nhóm 2 — ảnh hưởng phạm vi chỉ định và biểu mẫu chứng nhận.",
      direction: "THACH_THUC",
      affectedSystems: ["ISO_9001", "ISO_17025"],
      impactLevel: "CAO",
      monitoringMethod: "Theo dõi công báo và văn bản của cơ quan quản lý; đối chiếu 08_KNOWLEDGE_GRAPH/01_Regulations",
      monitoringFrequency: "QUY",
      ownerId: qlcl.id,
      evidenceRefs: ["NĐ 36/2026/NĐ-CP", "NĐ 22/2026/NĐ-CP"],
      objectiveRefs: ["Cập nhật 100% biểu mẫu chứng nhận trong quý"],
      updatedAt: daysAgo(200), // quá hạn theo dõi (tần suất Quý) — hiện ở màn hình Theo dõi đến hạn
    },
  });
  if (risk) await prisma.m25IssueRiskLink.create({ data: { issueId: issue1.id, riskId: risk.id } });

  const issue2 = await prisma.m25ContextIssue.create({
    data: {
      code: `VD-${year}-0002`,
      reviewId: review1.id,
      origin: "NOI_BO",
      category: "NGUON_LUC_NOI_BO",
      title: "Thiếu kiểm định viên có chứng chỉ ở lĩnh vực áp suất",
      description: "Số lượng kiểm định viên đủ năng lực lĩnh vực áp suất chưa đáp ứng khối lượng công việc dự kiến.",
      direction: "THACH_THUC",
      affectedSystems: ["ISO_17025"],
      impactLevel: "CAO",
      monitoringMethod: "Đối chiếu danh sách nhân sự (M03) với kế hoạch công việc hằng quý",
      monitoringFrequency: "QUY",
      ownerId: tp.id,
      evidenceRefs: ["Kế hoạch đào tạo 2026"],
      updatedAt: daysAgo(10),
    },
  });
  if (opportunity) await prisma.m25IssueRiskLink.create({ data: { issueId: issue2.id, opportunityId: opportunity.id } });

  await prisma.m25ContextIssue.create({
    data: {
      code: `VD-${year}-0003`,
      reviewId: review1.id,
      origin: "BEN_NGOAI",
      category: "CONG_NGHE_SO_AI",
      title: "Khách hàng yêu cầu tra cứu kết quả trực tuyến",
      description: "Xu hướng khách hàng muốn tra cứu chứng chỉ số và tiến độ dịch vụ trên nền tảng số.",
      direction: "CO_HOI",
      affectedSystems: ["ISO_9001", "ISO_42001"],
      impactLevel: "TRUNG_BINH",
      monitoringMethod: "Tổng hợp phản hồi khách hàng (M12) theo quý",
      monitoringFrequency: "SAU_THANG",
      ownerId: qlcl.id,
      updatedAt: daysAgo(20),
    },
  });

  const party1 = await prisma.m25InterestedParty.create({
    data: {
      code: `BQT-${year}-0001`,
      reviewId: review1.id,
      name: "Khách hàng sử dụng dịch vụ kiểm định/hiệu chuẩn",
      group: "KHACH_HANG",
      influenceLevel: "CAO",
      engagementChannel: "Hợp đồng, khảo sát mức độ hài lòng, kênh khiếu nại (M12)",
      monitoringFrequency: "QUY",
      ownerId: qlcl.id,
      updatedAt: daysAgo(200), // quá hạn theo dõi
    },
  });
  await prisma.m25PartyExpectation.createMany({
    data: [
      {
        partyId: party1.id,
        description: "Kết quả kiểm định/hiệu chuẩn chính xác, có giá trị pháp lý, trả đúng hạn cam kết.",
        source: "HOP_DONG",
        isComplianceObligation: true,
        obligationRef: "Luật Đo lường 2011; Thông tư 24/2013/TT-BKHCN",
        responseAction: "Kiểm soát kết quả theo ETV.P10 và ETV.P11; theo dõi tiến độ theo hợp đồng.",
        responseModuleRef: "M10, M11",
        fulfillmentStatus: "DANG_DAP_UNG",
      },
      {
        partyId: party1.id,
        description: "Bảo mật thông tin khách hàng và dữ liệu kết quả.",
        source: "TIEU_CHUAN",
        isComplianceObligation: true,
        obligationRef: "ISO/IEC 17025 §4.2; ISO/IEC 27001",
        responseAction: "Cam kết bảo mật theo ETV.P02; kiểm soát truy cập trên nền tảng số.",
        responseModuleRef: "M02",
        fulfillmentStatus: "DANG_DAP_UNG",
      },
    ],
  });

  const party2 = await prisma.m25InterestedParty.create({
    data: {
      code: `BQT-${year}-0002`,
      reviewId: review1.id,
      name: "Tổ chức công nhận (BoA) và cơ quan chỉ định",
      group: "TO_CHUC_CONG_NHAN",
      influenceLevel: "CAO",
      engagementChannel: "Đánh giá công nhận định kỳ, văn bản chỉ định",
      monitoringFrequency: "NAM",
      ownerId: ldv.id,
      updatedAt: daysAgo(30),
    },
  });
  await prisma.m25PartyExpectation.create({
    data: {
      partyId: party2.id,
      description: "Duy trì năng lực và tuân thủ ISO/IEC 17025, ISO 17034 trong toàn bộ phạm vi được công nhận.",
      source: "DANH_GIA_BEN_NGOAI",
      isComplianceObligation: true,
      obligationRef: "ISO/IEC 17025:2017; ISO 17034:2016",
      responseAction: "Duy trì đánh giá nội bộ hằng năm (M16) và xem xét lãnh đạo (M17); công bố năng lực qua M21.",
      responseModuleRef: "M16, M17, M21",
      fulfillmentStatus: "DANG_DAP_UNG",
    },
  });

  const party3 = await prisma.m25InterestedParty.create({
    data: {
      code: `BQT-${year}-0003`,
      reviewId: review1.id,
      name: "Nhà thầu phụ hiệu chuẩn thiết bị chuẩn",
      group: "NHA_CUNG_CAP",
      influenceLevel: "TRUNG_BINH",
      engagementChannel: "Hợp đồng dịch vụ, đánh giá nhà cung cấp (M06)",
      monitoringFrequency: "NAM",
      ownerId: tp.id,
      impartialityFlag: true, // ISO/IEC 17025 §4.1 — quan hệ có nguy cơ ảnh hưởng tính khách quan
      updatedAt: daysAgo(40),
    },
  });
  await prisma.m25PartyExpectation.create({
    data: {
      partyId: party3.id,
      description: "Duy trì quan hệ hợp đồng ổn định, thanh toán đúng hạn.",
      source: "HOP_DONG",
      isComplianceObligation: false,
      responseAction: "Đánh giá nhà cung cấp định kỳ theo ETV.P06; tách bạch quan hệ thương mại khỏi quyết định kỹ thuật.",
      responseModuleRef: "M06",
      fulfillmentStatus: "DANG_DAP_UNG",
    },
  });

  // 2. Kỳ đột xuất đang soạn — để thao tác thử toàn bộ state machine
  const review2 = await prisma.m25ContextReview.create({
    data: {
      code: `BC-${year}-0002`,
      cycleType: "DOT_XUAT",
      periodYear: year,
      triggerReason: "Mở rộng phạm vi công nhận sang lĩnh vực thử nghiệm môi trường (← M21).",
      scopeSystems: ["ISO_9001", "ISO_17025"],
      summary: "Rà soát lại bối cảnh sau khi mở rộng phạm vi công nhận.",
      status: "DRAFT",
      createdById: qlcl.id,
    },
  });
  await prisma.m25AuditEntry.create({
    data: { itemType: "REVIEW", itemId: review2.id, actorId: qlcl.id, role: "QLCL", action: "Lập kỳ xem xét bối cảnh" },
  });
  const issue4 = await prisma.m25ContextIssue.create({
    data: {
      code: `VD-${year}-0004`,
      reviewId: review2.id,
      origin: "NOI_BO",
      category: "NANG_LUC_KY_THUAT",
      title: "Phạm vi công nhận mở rộng sang thử nghiệm môi trường",
      description: "Cần bổ sung phương pháp, thiết bị và nhân sự cho lĩnh vực mới trước khi nhận việc.",
      direction: "CA_HAI",
      affectedSystems: ["ISO_17025"],
      impactLevel: "CAO", // cố ý CHƯA liên kết M01 — minh họa gate quy tắc 3 chặn gửi soát xét
      monitoringMethod: "Đối chiếu tiến độ chuẩn bị với kế hoạch mở rộng phạm vi",
      monitoringFrequency: "THANG",
      ownerId: tp.id,
    },
  });
  const party4 = await prisma.m25InterestedParty.create({
    data: {
      code: `BQT-${year}-0004`,
      reviewId: review2.id,
      name: "Cơ quan quản lý môi trường địa phương",
      group: "CO_QUAN_QUAN_LY",
      influenceLevel: "CAO",
      engagementChannel: "Văn bản, hội nghị chuyên đề",
      monitoringFrequency: "SAU_THANG",
      ownerId: qlcl.id,
    },
  });
  await prisma.m25PartyExpectation.create({
    data: {
      partyId: party4.id,
      description: "Kết quả quan trắc/thử nghiệm môi trường đáp ứng quy chuẩn kỹ thuật quốc gia.",
      source: "VAN_BAN_PHAP_LUAT",
      isComplianceObligation: true,
      obligationRef: "QCVN về môi trường (08_KNOWLEDGE_GRAPH/01_Regulations)",
      responseAction: "Xác nhận giá trị sử dụng phương pháp theo ETV.P08 trước khi cung cấp dịch vụ.",
      responseModuleRef: "M08",
      fulfillmentStatus: "CHUA_DAP_UNG",
    },
  });

  console.log(
    `Đã nạp 2 kỳ xem xét bối cảnh (1 đã phê duyệt + 1 nháp), ${4} vấn đề bối cảnh, ${4} bên quan tâm demo M25 + vai trò M25 cho ${Object.keys(userByRole).length} tài khoản. ` +
      `(${issue4.code} cố ý để mức Cao chưa liên kết M01 nhằm minh họa gate quy tắc 3.)`,
  );
}

// M34 — Quản lý dữ liệu số. Nguồn: ETV.P34 (DỰ THẢO, Chờ soát xét 25/08/2026) +
// 05_MODULE_LIBRARY/M34_DuLieuSo/01_Requirement/DacTa.md. Vai trò toàn cục M34:
// QLCL/ATTT/LDV/QTDL/QTHT (ModuleRoleAssignment); CSHDL là vai trò THEO TẬP — ownerId
// trên từng bản ghi (DacTa mục 10 điểm 2). Dữ liệu mẫu phủ các nhánh gate chính.
const M34_DEMO_USERS = [
  { email: "qlcl@manlab.vn", name: "Phạm Q. (QLCL)", role: "QLCL" },
  { email: "attt@manlab.vn", name: "Vũ B. (PT.ATTT)", role: "ATTT" },
  { email: "ldv@manlab.vn", name: "Lê Văn V. (LĐV)", role: "LDV" },
  { email: "qtdl@manlab.vn", name: "Ngô D. (QTDL)", role: "QTDL" },
  { email: "qtht@manlab.vn", name: "Đỗ A. (QTHT)", role: "QTHT" },
] as const;

/**
 * Danh mục loại vai trò chủ thể — MASTER DATA, không phải enum.
 * Thêm vai trò mới: thêm một dòng ở đây (hoặc nhập qua giao diện), KHÔNG cần migration.
 * Chuẩn: 09_ENGINEERING/05_Database/MasterData_ChuThe_VaiTro.md mục 4.4.
 */
const M34_PARTY_ROLE_TYPES = [
  { code: "LEAD", nameVi: "Khách hàng tiềm năng", description: "Chưa phát sinh giao dịch, đang trong giai đoạn tiếp cận", sortOrder: 10 },
  { code: "CUSTOMER", nameVi: "Khách hàng", description: "Bên yêu cầu dịch vụ kiểm định, hiệu chuẩn, thử nghiệm, quan trắc", sortOrder: 20 },
  { code: "SUPPLIER", nameVi: "Nhà cung cấp (NCC)", description: "Cung cấp sản phẩm, vật tư, dịch vụ cho Viện", sortOrder: 30 },
  { code: "SUBCONTRACTOR", nameVi: "Nhà thầu phụ (NTP)", description: "Bên ngoài cung cấp theo ISO/IEC 17025 §6.6", sortOrder: 40 },
  { code: "MANUFACTURER", nameVi: "Nhà sản xuất (NSX)", description: "Cơ sở sản xuất đối tượng được đánh giá", sortOrder: 50 },
  { code: "AUDITEE", nameVi: "Cơ sở được đánh giá", description: "Đối tượng của hoạt động đánh giá, giám định, chứng nhận", sortOrder: 60 },
  { code: "PARTNER", nameVi: "Đối tác", description: "Hợp tác chuyên môn hoặc thương mại", sortOrder: 70 },
  { code: "REGULATOR", nameVi: "Cơ quan quản lý", description: "Cơ quan nhà nước có thẩm quyền quản lý hoạt động của Viện", sortOrder: 80 },
  { code: "ACCREDITATION_BODY", nameVi: "Tổ chức công nhận/chứng nhận", description: "BoA, ILAC và tổ chức công nhận khác — khác cơ quan quản lý nhà nước", sortOrder: 90 },
  { code: "EXPERT", nameVi: "Chuyên gia", description: "Chuyên gia, đánh giá viên bên ngoài", sortOrder: 100 },
  { code: "EMPLOYEE", nameVi: "Nhân sự", description: "Nhân sự của Viện, nối với M03", sortOrder: 110 },
  { code: "INTERESTED_PARTY", nameVi: "Bên quan tâm", description: "Bên quan tâm theo ISO 9001 §4.2, nối với M25", sortOrder: 120 },
];

async function seedM34() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  // Idempotent: chạy lại không tạo trùng, không ghi đè tên đã sửa tay trên giao diện.
  for (const rt of M34_PARTY_ROLE_TYPES) {
    await prisma.m34PartyRoleType.upsert({ where: { code: rt.code }, create: rt, update: {} });
  }
  const userByRole: Record<string, { id: string }> = {};

  for (const u of M34_DEMO_USERS) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      create: { email: u.email, name: u.name, role: "MEMBER", passwordHash },
      update: {},
    });
    userByRole[u.role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M34", role: u.role } },
      create: { userId: user.id, moduleCode: "M34", role: u.role },
      update: {},
    });
  }

  // CSHDL demo: Trưởng phòng (ldp@) sở hữu tập; NTH là người nhập liệu chính (gate R16).
  const ldp = await prisma.user.upsert({
    where: { email: "ldp@manlab.vn" },
    create: { email: "ldp@manlab.vn", name: "Trần Thị Hoa (LĐP)", role: "MEMBER", passwordHash },
    update: {},
  });
  const nth = await prisma.user.upsert({
    where: { email: "nth@manlab.vn" },
    create: { email: "nth@manlab.vn", name: "Nguyễn Thị H. (NTH)", role: "MEMBER", passwordHash },
    update: {},
  });

  const existing = await prisma.m34DataSet.count();
  if (existing > 0) return; // idempotent thô: chỉ seed lần đầu

  const qtdl = userByRole["QTDL"];
  const attt = userByRole["ATTT"];
  const ldv = userByRole["LDV"];
  const year = new Date().getFullYear();

  // 1) Tập dữ liệu đo — ACTIVE, đủ từ điển v1, có kỳ đo Đạt; nguồn cho gate sàn 100%.
  const ds1 = await prisma.m34DataSet.create({
    data: {
      code: `DS-${year}-0001`,
      name: "Dữ liệu đo quan trắc khí thải (thô)",
      dataGroup: "DO_KY_THUAT",
      purpose: "Lưu giá trị đo thô từ thiết bị quan trắc phục vụ kiểm định, hiệu chuẩn",
      ownerId: ldp.id,
      stewardId: qtdl.id,
      primaryEntererId: nth.id,
      platformRef: "ManLab (M35: NT-2026-001)",
      infraRef: "HT-2026-014 (máy chủ dữ liệu đo)",
      classification: "NOI_BO",
      hasPersonalData: false,
      qualityMetricsNote: "Cả 6 chiều; sàn 100% hợp lệ + đầy đủ (trường bắt buộc); kỳ đo 03 tháng",
      activeRetention: "05 năm",
      retentionBasis: "ETV.P.F 14.06 — hồ sơ kỹ thuật; pháp luật đo lường chuyên ngành",
      readScope: "Phòng Kiểm định; QLCL",
      writeScope: "Hệ thống thu thập tự động; QTDL hiệu chỉnh theo F34.02",
      externalSharingNote: "Không — trừ yêu cầu cơ quan quản lý, đi phiếu F34.03",
      infoAssetRef: "TS-DL-012 (M27)",
      recordRef: "HS-KT-2026 (M15)",
      dictionaryRequired: true,
      lineageNote: "Nguồn: đầu đo QT-05 → bộ thu → ManLab; quy tắc quy đổi v1.2 (ETV.P08)",
      reviewCycle: "THANG_12",
      status: "ACTIVE",
      lifecycleStage: "HOAT_DONG",
      createdById: qtdl.id,
      reviewedById: attt.id,
      reviewedAt: new Date(`${year}-08-20T03:00:00Z`),
      approvedById: ldp.id,
      approvedAt: new Date(`${year}-08-21T03:00:00Z`),
      lastReviewedAt: new Date(`${year}-08-21T03:00:00Z`),
    },
  });
  const dict1 = await prisma.m34DictionaryVersion.create({
    data: {
      dataSetId: ds1.id,
      version: 1,
      status: "ACTIVE",
      effectiveDate: new Date(`${year}-08-21T03:00:00Z`),
      fields: {
        create: [
          { fieldName: "measured_at", meaning: "Thời điểm đo", dataType: "datetime", required: true, validationRule: "ISO 8601, không tương lai", example: "2026-08-20T10:15:00+07:00" },
          { fieldName: "parameter", meaning: "Thông số đo", dataType: "enum", validDomain: "SO2, NOx, CO, bụi tổng", required: true, example: "SO2" },
          { fieldName: "value", meaning: "Giá trị đo", dataType: "decimal", unit: "mg/Nm3", validDomain: "≥ 0", required: true, validationRule: "Số, 3 chữ số lẻ", example: "125.400" },
          { fieldName: "device_ref", meaning: "Thiết bị đo (M05)", dataType: "string", required: true, validationRule: "Tồn tại trong danh mục thiết bị", example: "TB-2025-031" },
        ],
      },
    },
  });
  void dict1;
  const q1 = await prisma.m34QualityMeasurement.create({
    data: {
      code: `KD-${year}-0001`,
      dataSetId: ds1.id,
      period: `${year}-Q2`,
      status: "DAT",
      trend: "GIU_NGUYEN",
      measuredById: qtdl.id,
      measuredAt: new Date(`${year}-07-01T03:00:00Z`),
      concludedById: qtdl.id,
      concludedAt: new Date(`${year}-07-02T03:00:00Z`),
      rows: {
        create: [
          { dimension: "CHINH_XAC", metric: "Tỷ lệ sai phát hiện qua đối chiếu mẫu", threshold: "≤ 0,5%", value: "0,2%", passed: true },
          { dimension: "DAY_DU", metric: "Trường bắt buộc còn trống", threshold: "100% đủ", value: "100%", passed: true },
          { dimension: "NHAT_QUAN", metric: "Chênh lệch với dữ liệu chủ thiết bị", threshold: "0 bản ghi", value: "0", passed: true },
          { dimension: "KIP_THOI", metric: "Độ trễ thu nhận trung bình", threshold: "≤ 15 phút", value: "4 phút", passed: true },
          { dimension: "DUY_NHAT", metric: "Bản ghi trùng trong kỳ", threshold: "0", value: "0", passed: true },
          { dimension: "HOP_LE", metric: "Vi phạm quy tắc từ điển", threshold: "100% hợp lệ", value: "100%", passed: true },
        ],
      },
    },
  });
  void q1;

  // Hiệu chỉnh đang CHỜ KẾT LUẬN P10/P11 — minh họa chặn cứng R12 (ETV.P34 §6.3.2 bước 3).
  await prisma.m34DataCorrection.create({
    data: {
      code: `HC-${year}-0001`,
      dataSetId: ds1.id,
      recordPointer: `Bản ghi đo 14/08/${year} 09:12, trường value (SO2)`,
      oldValue: "1254.00",
      newValue: "125.40",
      correctionReason: "Nhập sai vị trí dấu thập phân khi nhập tay lúc mất kết nối bộ thu",
      evidenceRef: "Biên bản đối chiếu nhật ký thiết bị QT-05",
      requestedById: nth.id,
      publishedImpact: "DA_DUNG_PHAT_HANH",
      status: "CHO_KET_LUAN_P10_P11",
    },
  });

  // Phiếu chia sẻ ra ngoài đang chờ ý kiến PT.ATTT — minh họa luồng LĐV + ATTT (R18).
  await prisma.m34SharingRequest.create({
    data: {
      code: `CS-${year}-0001`,
      requestType: "RA_NGOAI_VIEN",
      dataSetId: ds1.id,
      hasCustomerData: true,
      requesterId: nth.id,
      recipient: "Sở Tài nguyên và Môi trường (theo yêu cầu bằng văn bản)",
      purpose: "Cung cấp dữ liệu quan trắc phục vụ thanh tra môi trường",
      scopeNote: "Trường measured_at, parameter, value; 01/06–30/06; ~4.300 bản ghi",
      channel: "Cổng trao đổi văn bản điện tử liên thông (mã hóa)",
      useUntil: new Date(`${year}-12-31T00:00:00Z`),
      legalBasis: "Yêu cầu của cơ quan quản lý nhà nước có thẩm quyền",
      revokeDue: new Date(`${year}-12-31T00:00:00Z`),
      status: "CHO_Y_KIEN_ATTT",
    },
  });

  // Đề nghị dùng cho AI đang chờ — đủ AIA, chờ ý kiến ATTT + LĐV (R22).
  await prisma.m34AIDataApproval.create({
    data: {
      code: `DAI-${year}-0001`,
      dataSetId: ds1.id,
      aiPurpose: "DANH_GIA_MO_HINH",
      aiSystemRef: "AGENT_COPILOT_TRACUU (M29)",
      aiaRef: "AIA-2026-03 (F29.02)",
      mitigation: "Chỉ dùng giá trị đo tổng hợp theo ngày; không kèm định danh khách hàng; giới hạn truy xuất chỉ đọc",
      status: "DE_NGHI",
    },
  });

  // 2) Dữ liệu chủ — nguồn sự thật đã được LĐV công nhận + 1 bảng tra song song đang xử lý (R9, R10).
  const ds2 = await prisma.m34DataSet.create({
    data: {
      code: `DS-${year}-0002`,
      name: "Danh mục khách hàng (dữ liệu chủ)",
      dataGroup: "DU_LIEU_CHU",
      purpose: "Nguồn tham chiếu duy nhất về khách hàng cho mọi module nghiệp vụ",
      ownerId: ldp.id,
      stewardId: qtdl.id,
      classification: "HAN_CHE",
      hasPersonalData: true,
      personalDataLegalRef: "Pháp luật hiện hành về bảo vệ dữ liệu cá nhân (QLCL + PT.ATTT rà soát khi áp dụng)",
      qualityMetricsNote: "Duy nhất, nhất quán, đầy đủ; kỳ đo 06 tháng",
      activeRetention: "Theo vòng đời quan hệ khách hàng",
      retentionBasis: "ETV.P15; nghĩa vụ hợp đồng",
      readScope: "Bộ phận dịch vụ khách hàng; kế toán",
      writeScope: "Chỉ tại nguồn — QTDL",
      externalSharingNote: "Không",
      isMasterData: true,
      dictionaryRequired: true,
      reviewCycle: "THANG_06",
      status: "ACTIVE",
      lifecycleStage: "HOAT_DONG",
      createdById: qtdl.id,
      reviewedById: attt.id,
      approvedById: ldp.id,
      approvedAt: new Date(`${year}-08-22T03:00:00Z`),
      lastReviewedAt: new Date(`${year}-08-22T03:00:00Z`),
    },
  });
  await prisma.m34DictionaryVersion.create({
    data: {
      dataSetId: ds2.id,
      version: 1,
      status: "ACTIVE",
      effectiveDate: new Date(`${year}-08-22T03:00:00Z`),
      fields: {
        create: [
          { fieldName: "customer_code", meaning: "Mã khách hàng — không cấp lại", dataType: "string", required: true, validationRule: "KH-\\d{4}-\\d{4}", example: "KH-2026-0102" },
          { fieldName: "legal_name", meaning: "Tên pháp lý", dataType: "string", required: true, example: "Công ty TNHH ABC" },
          { fieldName: "tax_code", meaning: "Mã số thuế", dataType: "string", validDomain: "10 hoặc 13 chữ số", required: true, validationRule: "Duy nhất toàn danh mục", example: "0101234567" },
        ],
      },
    },
  });
  const master = await prisma.m34MasterDataSource.create({
    data: {
      code: `DC-${year}-0001`,
      masterType: "Danh mục khách hàng",
      dataSetId: ds2.id,
      sourceSystem: "ManLab — bảng Customer (một nguồn duy nhất)",
      authorizedEditors: "QTDL (Ngô D.) theo phân quyền M28",
      syncTargets: ["M21 Cổng công bố (đồng bộ tự động — M37)"],
      status: "DA_CONG_NHAN",
      recognizedById: ldv.id,
      recognizedAt: new Date(`${year}-08-23T03:00:00Z`),
    },
  });
  await prisma.m34ParallelLookupFinding.create({
    data: {
      code: `BT-${year}-0001`,
      masterSourceId: master.id,
      description: "Tệp Excel 'DS khach hang 2025.xlsx' trên máy cá nhân phòng dịch vụ",
      usedBy: "Nhân viên hợp đồng phòng Dịch vụ khách hàng",
      usedFor: "Tra mã khách hàng khi lập báo giá",
      diffNote: "17 bản ghi lệch tên pháp lý; 3 mã không tồn tại trong nguồn",
      causedError: false,
      stoppedAt: new Date(`${year}-08-24T03:00:00Z`),
      status: "DANG_XU_LY",
    },
  });

  // 3) Tập chứa dữ liệu cá nhân đang chờ soát xét — minh họa bước QLCL + PT.ATTT (§6.1.3).
  await prisma.m34DataSet.create({
    data: {
      code: `DS-${year}-0003`,
      name: "Hồ sơ đào tạo và năng lực nhân sự (bản số)",
      dataGroup: "QUAN_TRI",
      purpose: "Theo dõi đào tạo, chứng chỉ, phân công năng lực (M03)",
      ownerId: ldp.id,
      stewardId: qtdl.id,
      classification: "NOI_BO",
      hasPersonalData: true,
      personalDataLegalRef: "Pháp luật hiện hành về bảo vệ dữ liệu cá nhân",
      retentionBasis: "ETV.P.F 14.06 — hồ sơ nhân sự",
      dictionaryRequired: false,
      reviewCycle: "THANG_06",
      status: "PENDING_REVIEW",
      createdById: qtdl.id,
    },
  });

  console.log(
    "Đã nạp M34: 3 tập dữ liệu (1 đo — ACTIVE kèm từ điển + kỳ đo Đạt, 1 dữ liệu chủ Hạn chế — đã công nhận nguồn, 1 chờ soát xét), " +
      "1 hiệu chỉnh đang chờ kết luận P10/P11 (minh họa chặn R12), 1 phiếu chia sẻ chờ ý kiến ATTT, 1 đề nghị dữ liệu cho AI, " +
      `1 bảng tra song song đang xử lý + vai trò M34 cho ${Object.keys(userByRole).length} tài khoản (thêm attt@, qtdl@).`,
  );
}

// M33 — Quản lý hệ thống thông tin. Nguồn: ETV.P33 (DỰ THẢO, Chờ soát xét) +
// 05_MODULE_LIBRARY/M33_HeThongTT/01_Requirement/DacTa.md. Vai trò toàn cục:
// QTHT/ATTT/VP/TP/QLCL/LDV. Dữ liệu mẫu phủ các nhánh gate và cờ đến hạn chính.
const M33_DEMO_USERS = [
  { email: "qtht@manlab.vn", name: "Đỗ A. (QTHT)", role: "QTHT" },
  { email: "attt@manlab.vn", name: "Vũ B. (PT.ATTT)", role: "ATTT" },
  { email: "vanphong@manlab.vn", name: "Ngô Thị Văn Phòng", role: "VP" },
  { email: "ldp@manlab.vn", name: "Trần Thị Hoa (LĐP)", role: "TP" },
  { email: "qlcl@manlab.vn", name: "Phạm Q. (QLCL)", role: "QLCL" },
  { email: "ldv@manlab.vn", name: "Lê Văn V. (LĐV)", role: "LDV" },
] as const;

async function seedM33() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const userByRole: Record<string, { id: string }> = {};

  for (const u of M33_DEMO_USERS) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      create: { email: u.email, name: u.name, role: "MEMBER", passwordHash },
      update: {},
    });
    userByRole[u.role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M33", role: u.role } },
      create: { userId: user.id, moduleCode: "M33", role: u.role },
      update: {},
    });
  }

  const existing = await prisma.m33ITAsset.count();
  if (existing > 0) return; // idempotent thô: chỉ seed lần đầu

  const qtht = userByRole["QTHT"];
  const attt = userByRole["ATTT"];
  const vp = userByRole["VP"];
  const tp = userByRole["TP"];
  const ldv = userByRole["LDV"];
  const year = new Date().getFullYear();
  const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000);
  const daysAhead = (n: number) => new Date(Date.now() + n * 86_400_000);

  // 1) Máy chủ ManLab — trọng yếu Cao, đang vận hành, đủ RTO/failover/rủi ro.
  const server = await prisma.m33ITAsset.create({
    data: {
      code: `HT-${year}-0001`,
      name: "Máy chủ nền tảng ManLab",
      assetClass: "MAY_CHU",
      model: "Dell R760",
      serial: "SRV-MANLAB-01",
      networkZone: "QUAN_TRI_VAN_PHONG",
      environment: "VAN_HANH",
      location: "Phòng máy chủ tầng 3",
      userOwnerId: vp.id,
      custodianId: qtht.id,
      criticality: "CAO",
      platformRefs: ["ManLab AIOS (M35: NT-2026-001)"],
      infoAssetRefs: ["TS-DL-012 (M27)", "TS-DL-014 (M27)"],
      maxClassification: "HAN_CHE",
      diskEncryption: true,
      defaultPasswordChanged: true,
      unusedServicesClosed: true,
      osVersion: "Ubuntu Server 24.04 LTS",
      patchLevel: "2026-08 rollup",
      lastPatchedAt: daysAgo(20),
      commissionedAt: daysAgo(400),
      maintenanceCycle: "QUY",
      lastMaintainedAt: daysAgo(30),
      recoveryTimeObjective: "04 giờ",
      failoverPlan: "Chuyển sang máy chủ dự phòng cùng phòng máy (M31)",
      riskRefs: ["RR-2026-08 (M01)"],
      reviewCycleMonths: 12,
      lastReviewedAt: daysAgo(100),
      status: "OPERATING",
      createdById: qtht.id,
      reviewedById: attt.id,
      approvedById: ldv.id,
      approvedAt: daysAgo(395),
    },
  });

  // 2) Máy tính điều khiển thiết bị đo — vùng đặc biệt R4.
  const controlPc = await prisma.m33ITAsset.create({
    data: {
      code: `HT-${year}-0002`,
      name: "Máy tính điều khiển hệ quan trắc khí thải QT-05",
      assetClass: "MAY_TINH_DIEU_KHIEN_DO",
      model: "Dell Precision 3680",
      serial: "PC-QT05-01",
      networkZone: "THIET_BI_DO",
      environment: "VAN_HANH",
      location: "Trạm quan trắc — hiện trường",
      userOwnerId: tp.id,
      custodianId: qtht.id,
      criticality: "CAO",
      measuringDeviceRef: "TB-2025-031 (M05)",
      infoAssetRefs: ["TS-DL-012 (M27)"],
      maxClassification: "NOI_BO",
      diskEncryption: true,
      screenLock: true,
      antimalware: true,
      defaultPasswordChanged: true,
      unusedServicesClosed: true,
      osVersion: "Windows 11 IoT",
      commissionedAt: daysAgo(300),
      maintenanceCycle: "SAU_THANG",
      lastMaintainedAt: daysAgo(200), // quá hạn chu kỳ 180 ngày → cờ Đến hạn bảo trì
      recoveryTimeObjective: "08 giờ",
      failoverPlan: "Máy dự phòng lạnh tại kho thiết bị",
      riskRefs: ["RR-2026-11 (M01)"],
      status: "OPERATING",
      createdById: qtht.id,
      reviewedById: attt.id,
      approvedById: ldv.id,
      approvedAt: daysAgo(295),
      lastReviewedAt: daysAgo(500), // quá 12 tháng → cờ Đến hạn rà soát
    },
  });

  // 3) Laptop BYOD đang chờ soát xét (Nội bộ — được phép khi đủ cấu hình cơ sở).
  await prisma.m33ITAsset.create({
    data: {
      code: `HT-${year}-0003`,
      name: "Laptop cá nhân của kỹ thuật viên hiện trường (BYOD)",
      assetClass: "MAY_TRAM",
      networkZone: "QUAN_TRI_VAN_PHONG",
      environment: "VAN_HANH",
      location: "Di động theo người dùng",
      userOwnerId: tp.id,
      custodianId: qtht.id,
      criticality: "THAP",
      maxClassification: "NOI_BO",
      isPersonalDevice: true,
      diskEncryption: true,
      screenLock: true,
      antimalware: true,
      defaultPasswordChanged: true,
      unusedServicesClosed: true,
      maintenanceCycle: "NAM",
      status: "PENDING_REVIEW",
      createdById: qtht.id,
    },
  });

  // 4) Switch phát hiện chưa kiểm kê — quá 30 ngày, đã ngắt mạng (R17).
  await prisma.m33ITAsset.create({
    data: {
      code: `HT-${year}-0004`,
      name: "Switch không nhãn tại phòng thử nghiệm",
      assetClass: "THIET_BI_MANG",
      networkZone: "THIET_BI_DO",
      environment: "VAN_HANH",
      location: "Phòng thử nghiệm tầng 2",
      userOwnerId: tp.id,
      custodianId: qtht.id,
      criticality: "TRUNG_BINH",
      maxClassification: "NOI_BO",
      defaultPasswordChanged: false, // chưa đạt cấu hình cơ sở → đã ngắt mạng
      unusedServicesClosed: false,
      maintenanceCycle: "NAM",
      discoverySource: "PHAT_HIEN_CHUA_KIEM_KE",
      inventoryDueAt: daysAgo(5), // quá hạn 30 ngày → cờ đỏ
      networkIsolated: true,
      status: "DRAFT",
      createdById: qtht.id,
      reason: "Phát hiện khi kiểm tra hiện trường 26/07 — chưa rõ nguồn gốc",
    },
  });

  // 5) Phần mềm bản quyền sắp hết hạn — cờ cảnh báo (R21).
  await prisma.m33ITAsset.create({
    data: {
      code: `HT-${year}-0005`,
      name: "Phần mềm xử lý số liệu quan trắc EnvDataPro",
      assetClass: "PHAN_MEM_BAN_QUYEN",
      environment: "VAN_HANH",
      location: "Cài trên HT-2026-0002",
      userOwnerId: tp.id,
      custodianId: qtht.id,
      criticality: "TRUNG_BINH",
      maxClassification: "NOI_BO",
      defaultPasswordChanged: true,
      unusedServicesClosed: true,
      licenseType: "Thuê bao năm",
      licenseExpiry: daysAhead(25), // sắp hết hạn → cờ vàng
      maintenanceCycle: "NAM",
      status: "OPERATING",
      createdById: qtht.id,
      reviewedById: attt.id,
      approvedById: ldv.id,
      approvedAt: daysAgo(340),
      commissionedAt: daysAgo(340),
      lastReviewedAt: daysAgo(60),
      lastMaintainedAt: daysAgo(60),
    },
  });

  // Kế hoạch bảo trì năm đã phê duyệt — phủ server + máy điều khiển (R19).
  const plan = await prisma.m33MaintenancePlan.create({
    data: {
      code: `KHBT-${year}-01`,
      year,
      downtimeNeeds: "02 cửa sổ ngừng dịch vụ 4 giờ (quý II, quý IV)",
      resourceNeeds: "QTHT + nhà thầu bảo trì máy chủ",
      status: "DA_PHE_DUYET",
      createdById: vp.id,
      approvedById: ldv.id,
      approvedAt: daysAgo(200),
      scopeAssets: { connect: [{ id: server.id }, { id: controlPc.id }] },
    },
  });

  // Vá lỗi Nghiêm trọng QUÁ HẠN trên máy chủ — cờ đỏ mục (3) báo cáo, cảnh báo LĐV (R8).
  await prisma.m33MaintenanceTask.create({
    data: {
      code: `BT-${year}-0001`,
      taskType: "VA_LOI_BAO_MAT",
      severity: "NGHIEM_TRONG",
      plannedAt: daysAgo(10),
      dueAt: daysAgo(3), // quá hạn mốc 07 ngày
      changeRef: "F30.02-2026-018 (M30)",
      impactAssessmentRef: "DGAH-ATTT-2026-07 (M28)",
      status: "DANG_THUC_HIEN",
      createdById: qtht.id,
      assets: { connect: [{ id: server.id }] },
    },
  });

  // Bảo trì định kỳ CHỜ NGHIỆM THU — minh họa R15 (người nghiệm thu ≠ người thực hiện).
  await prisma.m33MaintenanceTask.create({
    data: {
      code: `BT-${year}-0002`,
      taskType: "BAO_TRI_DINH_KY",
      plannedAt: daysAgo(7),
      dueAt: daysAgo(1),
      planId: plan.id,
      performedById: qtht.id,
      performedAt: daysAgo(1),
      result: "THANH_CONG",
      evidenceRef: "Nhật ký bảo trì 25/08 + ảnh tủ rack",
      userNotifiedAt: daysAgo(2),
      status: "CHO_NGHIEM_THU",
      createdById: qtht.id,
      assets: { connect: [{ id: server.id }] },
    },
  });

  // Tài khoản đặc quyền của QTHT trên máy chủ — đủ phiếu, MFA (R6).
  await prisma.m33SystemAccount.create({
    data: {
      code: `TK-${year}-0001`,
      loginName: "root-manlab",
      accountType: "DAC_QUYEN_QUAN_TRI",
      assetId: server.id,
      holderId: qtht.id,
      accessRequestRef: "F28.04-2026-031 (M28)",
      grantedAt: daysAgo(390),
      secretLocation: "Két quản trị — phong bì niêm phong số 07",
      secretIssuer: "Vũ B. (PT.ATTT)",
      mfaEnabled: true,
    },
  });

  // Tài khoản có biến động nhân sự — QUÁ HẠN thu hồi trong ngày làm việc (R16).
  await prisma.m33SystemAccount.create({
    data: {
      code: `TK-${year}-0002`,
      loginName: "ktv-hientruong-02",
      accountType: "CA_NHAN_DINH_DANH",
      assetId: controlPc.id,
      holderNote: "Kỹ thuật viên hợp đồng đã chấm dứt 25/08",
      accessRequestRef: "F28.04-2026-012 (M28)",
      grantedAt: daysAgo(200),
      secretLocation: "Người dùng tự quản theo chính sách mật khẩu",
      secretIssuer: "Đỗ A. (QTHT)",
      mfaEnabled: false,
      hrEventRef: "M03: chấm dứt HĐ 25/08/2026",
      revocationDueAt: daysAgo(1), // quá hạn → cờ đỏ
    },
  });

  // Kỳ đối chiếu toàn bộ đã chốt (R20).
  await prisma.m33AccountReconciliation.create({
    data: {
      code: `KYDC-${year}-01`,
      period: `${year}-H1`,
      scope: "TOAN_BO",
      orphanAccountIds: [],
      orphanRequestRefs: ["F28.04-2026-009 (chưa thấy tài khoản trên hệ thống)"],
      expiredAccountIds: [],
      mfaMissingIds: [],
      performedById: qtht.id,
      status: "DA_CHOT",
      closedAt: daysAgo(50),
    },
  });

  // Sự cố mức CAO còn MỚI — quá hạn phản hồi (R18).
  await prisma.m33ITIncident.create({
    data: {
      code: `SC-${year}-0001`,
      kind: "SU_CO",
      reportedById: tp.id,
      reportedAt: daysAgo(1),
      description: "Nền tảng ManLab không truy cập được từ mạng nội bộ, nghi lỗi máy chủ",
      impact: "NGUNG_TOAN_VIEN",
      priority: "CAO",
      responseDueAt: daysAgo(1), // phản hồi NGAY — đã quá hạn
      securityFlag: false,
      status: "MOI",
      assets: { connect: [{ id: server.id }] },
    },
  });

  // Sự cố có yếu tố ATTT — đã định tuyến M28, CHƯA kết luận → chặn đóng (R9).
  await prisma.m33ITIncident.create({
    data: {
      code: `SC-${year}-0002`,
      kind: "SU_CO",
      reportedById: qtht.id,
      reportedAt: daysAgo(6),
      description: "Máy tính điều khiển QT-05 có tiến trình lạ kết nối ra ngoài",
      impact: "NGUNG_MOT_PHONG",
      priority: "CAO", // tài sản trọng yếu Cao ⇒ nâng bắt buộc
      responseDueAt: daysAgo(6),
      respondedAt: daysAgo(6),
      escalatedToLdvAt: daysAgo(6),
      securityFlag: true,
      securityIncidentRef: "F28.03-2026-05 (M28)",
      securityConcluded: false,
      measurementImpactRef: "M10-2026-14 — dừng sử dụng kết quả từ 20/08 tới khi kết luận",
      assignedToId: qtht.id,
      rootCause: "Đang chờ M28 phân tích",
      resolution: "Đã cách ly máy, chuyển dự phòng lạnh",
      assetBackToNormal: true,
      noLessonReason: null,
      lessonRef: "BH-2026-09 (M26)",
      status: "DA_XU_LY",
      assets: { connect: [{ id: controlPc.id }] },
    },
  });

  console.log(
    "Đã nạp M33: 5 tài sản (máy chủ Cao, máy điều khiển đo, BYOD chờ soát xét, switch chưa kiểm kê quá hạn — đã ngắt mạng, phần mềm sắp hết bản quyền), " +
      "1 kế hoạch bảo trì năm đã phê duyệt, 2 công việc (vá Nghiêm trọng quá hạn + chờ nghiệm thu R15), 2 tài khoản (1 quá hạn thu hồi R16), " +
      `1 kỳ đối chiếu đã chốt, 2 sự cố (1 quá hạn phản hồi R18 + 1 chờ kết luận M28 R9) + vai trò M33 cho ${Object.keys(userByRole).length} tài khoản.`,
  );
}

// ===========================================================================
// M27 — Quản trị dữ liệu và tài sản thông tin.
// Nguồn: ETV.P27 (lần BH 01, ban hành 26/08/2026) + biểu mẫu ETV.P.F 27.01, F 27.02.
// Vai trò dùng chung vocabulary với M28/M33: TP / QTHT / ATTT / QLCL / LDV.
// ===========================================================================

const M27_DEMO_USERS = [
  { email: "ldp@manlab.vn", name: "Trần Thị Hoa (LĐP)", role: "TP" },
  { email: "qtht@manlab.vn", name: "Đỗ A. (QTHT)", role: "QTHT" },
  { email: "attt@manlab.vn", name: "Vũ B. (PT.ATTT)", role: "ATTT" },
  { email: "qlcl@manlab.vn", name: "Phạm Q. (QLCL)", role: "QLCL" },
  { email: "ldv@manlab.vn", name: "Lê Văn V. (LĐV)", role: "LDV" },
] as const;

/// Ma trận quy tắc xử lý — chép nguyên PHẦN B của biểu mẫu ETV.P.F 27.02.
/// 8 hành động × 4 mức phân loại = 32 dòng. `true` ở cuối nghĩa là CẤM (P27 §6.3).
const M27_RULE_MATRIX: [string, string, string, boolean][] = [
  ["LUU_TRU", "CONG_KHAI", "Nơi lưu do Viện quản lý", false],
  ["LUU_TRU", "NOI_BO", "Hệ thống của Viện; phân quyền theo vai trò", false],
  ["LUU_TRU", "HAN_CHE", "Hệ thống của Viện; phân quyền theo danh sách; ghi nhật ký truy cập", false],
  ["LUU_TRU", "MAT", "Hệ thống của Viện; danh sách cá nhân do LĐV duyệt; mã hoá khi lưu", false],

  ["TRUYEN_GUI", "CONG_KHAI", "Không hạn chế", false],
  ["TRUYEN_GUI", "NOI_BO", "Kênh của Viện", false],
  ["TRUYEN_GUI", "HAN_CHE", "Kênh có bảo vệ; mã hoá khi qua mạng công cộng; mật khẩu gửi qua kênh khác (ETV.P02 §6.8)", false],
  ["TRUYEN_GUI", "MAT", "Như mức Hạn chế, bổ sung xác nhận người nhận trước khi gửi", false],

  ["IN_SAO_CHEP", "CONG_KHAI", "Không hạn chế", false],
  ["IN_SAO_CHEP", "NOI_BO", "Thu hồi bản in khi hết nhu cầu", false],
  ["IN_SAO_CHEP", "HAN_CHE", "Chỉ in khi cần; không để trên bàn khi rời vị trí; huỷ bằng máy huỷ giấy", false],
  ["IN_SAO_CHEP", "MAT", "Ghi nhận số bản in và người giữ; huỷ có chứng kiến", false],

  ["MANG_RA_NGOAI", "CONG_KHAI", "Không hạn chế", false],
  ["MANG_RA_NGOAI", "NOI_BO", "Được phép khi phục vụ công việc", false],
  ["MANG_RA_NGOAI", "HAN_CHE", "Phải được chủ sở hữu đồng ý; thiết bị mã hoá", false],
  ["MANG_RA_NGOAI", "MAT", "CẤM — trừ khi có phê duyệt của LĐV kèm biện pháp bảo vệ", true],

  ["CHIA_SE_BEN_THU_BA", "CONG_KHAI", "Không hạn chế", false],
  ["CHIA_SE_BEN_THU_BA", "NOI_BO", "Chủ sở hữu tài sản phê duyệt", false],
  ["CHIA_SE_BEN_THU_BA", "HAN_CHE", "LĐV phê duyệt (F34.03) + phê duyệt công bố ETV.P02 nếu là dữ liệu khách hàng, dữ liệu cá nhân", false],
  ["CHIA_SE_BEN_THU_BA", "MAT", "Như mức Hạn chế; mặc định không được phép", false],

  ["THIET_BI_CA_NHAN", "CONG_KHAI", "Được phép", false],
  ["THIET_BI_CA_NHAN", "NOI_BO", "Được phép nếu thiết bị đã đăng ký và đủ cấu hình an toàn (ETV.P33)", false],
  ["THIET_BI_CA_NHAN", "HAN_CHE", "Chỉ khi có phê duyệt của LĐV; bắt buộc mã hoá ổ đĩa", false],
  ["THIET_BI_CA_NHAN", "MAT", "CẤM (ETV.P02 §6.8)", true],

  ["CHI_MUC_AI", "CONG_KHAI", "Được phép", false],
  ["CHI_MUC_AI", "NOI_BO", "Được phép khi tài sản được đánh dấu cho phép dùng cho AI", false],
  ["CHI_MUC_AI", "HAN_CHE", "CẤM (ETV.P27 §6.9.2; ETV.P28 mục 6.13; ETV.P26 mục 5.5)", true],
  ["CHI_MUC_AI", "MAT", "CẤM (ETV.P27 §6.9.2; ETV.P28 mục 6.13; ETV.P26 mục 5.5)", true],

  ["HUY", "CONG_KHAI", "Theo thời hạn lưu", false],
  ["HUY", "NOI_BO", "Theo thời hạn lưu; xoá an toàn với dữ liệu điện tử", false],
  ["HUY", "HAN_CHE", "Phê duyệt của LĐV; xoá an toàn; có bằng chứng", false],
  ["HUY", "MAT", "Phê duyệt của LĐV; xoá an toàn hoặc huỷ vật lý; có người chứng kiến", false],
];

async function seedM27() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const userByRole: Record<string, { id: string }> = {};
  for (const u of M27_DEMO_USERS) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      create: { email: u.email, name: u.name, role: "MEMBER", passwordHash },
      update: {},
    });
    userByRole[u.role] = user;
    await prisma.moduleRoleAssignment.upsert({
      where: { userId_moduleCode_role: { userId: user.id, moduleCode: "M27", role: u.role } },
      create: { userId: user.id, moduleCode: "M27", role: u.role },
      update: {},
    });
  }

  const existing = await prisma.m27InfoAsset.count();
  if (existing > 0) return; // idempotent thô: chỉ seed lần đầu

  // Bảng quy tắc xử lý phiên bản 1 — đã được LĐV phê duyệt.
  await prisma.m27RuleVersion.create({
    data: {
      version: 1,
      status: "DA_PHE_DUYET",
      effectiveFrom: new Date("2026-08-26"),
      note: "Ban hành lần đầu cùng ETV.P27 — nội dung theo PHẦN B biểu mẫu ETV.P.F 27.02.",
      approvedById: userByRole.LDV.id,
      approvedAt: new Date("2026-08-26"),
      rules: {
        create: M27_RULE_MATRIX.map(([action, classification, requirement, isProhibited]) => ({
          action: action as never,
          classification: classification as never,
          requirement,
          isProhibited,
        })),
      },
    },
  });

  const thang = (n: number) => {
    const d = new Date();
    d.setMonth(d.getMonth() - n);
    return d;
  };

  // Ba tài sản mẫu, cố ý phủ các tình huống mà bảng "đến hạn" phải bắt được:
  // TS-001 quá hạn kiểm chứng phục hồi · TS-002 đến hạn rà soát · TS-003 bình thường.
  const veted = {
    createdById: userByRole.QLCL.id,
    reviewedById: userByRole.ATTT.id,
    reviewedAt: new Date("2026-08-26"),
    approvedById: userByRole.LDV.id,
    approvedAt: new Date("2026-08-26"),
    status: "DANG_SU_DUNG" as const,
  };

  // 1) Sẵn sàng = Cao ⇒ chu kỳ kiểm chứng phục hồi 06 tháng; đặt 8 tháng trước để QUÁ HẠN.
  await prisma.m27InfoAsset.create({
    data: {
      ...veted,
      code: "TS-2026-001",
      name: "Cơ sở dữ liệu kết quả đo trên ManLab",
      assetType: "CSDL_DIEN_TU",
      dataDomain: "KET_QUA_DO",
      description: "Dữ liệu thô, phiếu kết quả và chứng chỉ của các phép đo đã thực hiện.",
      classification: "HAN_CHE",
      ciaC: "CAO",
      ciaI: "CAO",
      ciaA: "CAO",
      ownerId: userByRole.TP.id,
      custodianId: userByRole.QTHT.id,
      storageLocation: "Máy chủ CSDL — phòng máy chủ tầng 3",
      systemRefs: ["HT-2026-0001"],
      retentionPeriod: "10 năm",
      retentionBasis: "ETV.P15 · ETV.P.F 14.06",
      disposalMethod: "XOA_AN_TOAN",
      backupRequired: true,
      backupFrequency: "NGAY",
      lastRestoreTestAt: thang(8),
      riskRefs: ["RR-ATTT-2026-001"],
      reviewCycleMonths: 12,
      lastReviewedAt: thang(2),
    },
  });

  // 2) Mật + dữ liệu cá nhân ⇒ chu kỳ rà soát 06 tháng; đặt 9 tháng trước để ĐẾN HẠN RÀ SOÁT.
  //    Hồ sơ giấy nên không có người quản lý kỹ thuật và không thuộc diện sao lưu.
  await prisma.m27InfoAsset.create({
    data: {
      ...veted,
      code: "TS-2026-002",
      name: "Hồ sơ nhân sự và bảng lương",
      assetType: "HO_SO_GIAY",
      dataDomain: "NHAN_SU",
      description: "Hồ sơ cán bộ, hợp đồng lao động, bảng lương hằng tháng.",
      classification: "MAT",
      ciaC: "CAO",
      ciaI: "TRUNG_BINH",
      ciaA: "THAP",
      containsPersonalData: true,
      personalDataScope: "Người lao động của Viện; dữ liệu cá nhân cơ bản và dữ liệu nhạy cảm về sức khoẻ.",
      legalBasis:
        "Bộ luật Lao động 45/2019/QH14; hợp đồng lao động — mục đích quản lý nhân sự và chi trả lương.",
      ownerId: userByRole.QLCL.id,
      storageLocation: "Tủ hồ sơ có khoá — phòng Tổ chức hành chính",
      retentionPeriod: "30 năm sau khi chấm dứt hợp đồng",
      retentionBasis: "Pháp luật về lưu trữ · ETV.P15",
      disposalMethod: "CAT_VUN_GIAY",
      riskRefs: ["RR-ATTT-2026-004"],
      reviewCycleMonths: 6,
      lastReviewedAt: thang(9),
    },
  });

  // 3) Nội bộ ⇒ được phép làm nguồn cho hệ thống AI (ETV.P27 §6.9.2).
  await prisma.m27InfoAsset.create({
    data: {
      ...veted,
      code: "TS-2026-003",
      name: "Kho tài liệu hệ thống quản lý chất lượng",
      assetType: "TEP_TAI_LIEU",
      dataDomain: "HE_THONG_QUAN_LY",
      description: "Thủ tục, hướng dẫn, biểu mẫu gốc của hệ thống quản lý.",
      classification: "NOI_BO",
      ciaC: "TRUNG_BINH",
      ciaI: "CAO",
      ciaA: "TRUNG_BINH",
      ownerId: userByRole.QLCL.id,
      custodianId: userByRole.QTHT.id,
      storageLocation: "Thư mục dùng chung \\\\manlab\\qms",
      systemRefs: ["HT-2026-0002"],
      docRef: "ETV.P14",
      retentionPeriod: "Vĩnh viễn (bản hiện hành và các phiên bản)",
      retentionBasis: "ETV.P14 · ETV.P15",
      disposalMethod: "XOA_AN_TOAN",
      backupRequired: true,
      backupFrequency: "TUAN",
      lastRestoreTestAt: thang(3),
      aiUseAllowed: true,
      reviewCycleMonths: 12,
      lastReviewedAt: thang(1),
    },
  });
}
