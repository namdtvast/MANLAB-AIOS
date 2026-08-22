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

// Module đã có 08_Source chạy thật ở thời điểm Increment 0 (xem DEPLOYMENT.md).
const ACTIVE_MODULE_CODES = new Set(["M10", "M21", "M29"]);

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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
