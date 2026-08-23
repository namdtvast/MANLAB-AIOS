// Seed: quét trực tiếp 05_MODULE_LIBRARY/ và 04_PROCESS_LIBRARY/ của repo để nạp
// danh sách 38 module vào bảng PlatformModule — một nguồn sự thật duy nhất
// (tên module lấy từ manifest.yaml của MPxx tương ứng), không hardcode 2 nơi.
import "dotenv/config";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

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
const ACTIVE_MODULE_CODES = new Set(["M01", "M02", "M03", "M04", "M10", "M12", "M13", "M14", "M16", "M17", "M21", "M29"]);

interface MpManifest {
  name?: string;
  capabilities?: string[];
  module?: string;
  menu_group?: string;
  menu_order?: number;
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

function findMpManifest(num: string): MpManifest | null {
  const prefix = `MP${num}_`;
  const dir = readdirSync(PROCESS_LIB).find((d) => d.startsWith(prefix));
  if (!dir) return null;
  const manifestPath = join(PROCESS_LIB, dir, "manifest.yaml");
  if (!existsSync(manifestPath)) return null;
  return yaml.load(readFileSync(manifestPath, "utf8")) as MpManifest;
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

    const name = mpManifest?.name ?? slug;
    const capabilityCode = mpManifest?.capabilities?.[0];

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
      },
    });
  }

  console.log(`Đã nạp ${moduleDirs.length} module vào PlatformModule.`);

  // Tài khoản admin mặc định — CHỈ để login thử ở môi trường dev/demo.
  // Đổi mật khẩu (hoặc xoá user này) trước khi đưa lên môi trường thật.
  const adminEmail = "admin@manlab.vn";
  const adminPasswordHash = await bcrypt.hash("DoiMatKhauNgay!2026", 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    create: { email: adminEmail, name: "Quản trị viên (demo)", role: "ADMIN", passwordHash: adminPasswordHash },
    update: {},
  });
  console.log(`Tài khoản demo: ${adminEmail} / DoiMatKhauNgay!2026 (đổi ngay khi triển khai thật)`);

  await seedM10();
  await seedM21();
  await seedM29();
  await seedM01();
  await seedM03();
  await seedM02();
  await seedM04();
  await seedM16();
  await seedM17();
  await seedM12();
  await seedM13();
  await seedM14();
}

// M10 — port dữ liệu demo từ 05_MODULE_LIBRARY/M10_DamBaoKQ/08_Source/api/model.mjs
// (hàm seed()) + tài khoản demo cho từng vai trò NTH/LDP/LDV, khớp bản gốc.
const DEMO_PASSWORD = "DoiMatKhauNgay!2026";

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
  console.log(`Tài khoản M10 demo (mật khẩu chung: ${DEMO_PASSWORD}): ${M10_DEMO_USERS.map((u) => u.email).join(", ")}`);
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
      modelId: "gemini-2.5-flash",
      displayName: "Gemini 2.5 Flash",
      purpose: "Phân tích chỉ số, cảnh báo bất thường",
      temperature: 0.2,
      maxTokens: 2048,
      costPer1kTokens: 0.0003,
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

  console.log(`Đã nạp dữ liệu mẫu M29 (1 Agent đủ đường dây: Platform→Model→Skill→Tool→Prompt→AIA→Evaluation) + vai trò M29 cho ${M29_DEMO_USERS.length} tài khoản.`);
  console.log(`Tài khoản M29 demo (mật khẩu chung: ${DEMO_PASSWORD}): ${M29_DEMO_USERS.map((u) => u.email).join(", ")}`);
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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
