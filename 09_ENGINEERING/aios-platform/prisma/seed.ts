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
const ACTIVE_MODULE_CODES = new Set(["M01", "M10", "M21", "M29"]);

interface MpManifest {
  name?: string;
  capabilities?: string[];
  module?: string;
}

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
      },
      update: {
        slug,
        name,
        mpCode: `MP${num}`,
        capabilityCode,
        status: ACTIVE_MODULE_CODES.has(code) ? "ACTIVE" : "COMING_SOON",
        sourcePath: `05_MODULE_LIBRARY/${dirName}`,
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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
