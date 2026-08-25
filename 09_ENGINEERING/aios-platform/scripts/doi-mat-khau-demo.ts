// Đổi mật khẩu hàng loạt cho các tài khoản demo do seed tạo.
//
// Vì sao cần: trước ngày 25/08/2026, prisma/seed.ts ghi thẳng một mật khẩu dùng chung
// trong mã nguồn của repo công khai. Việc gỡ nó khỏi repo KHÔNG vô hiệu hoá được mật
// khẩu đã nằm trong database — mọi upsert tài khoản trong seed dùng `update: {}` nên
// tài khoản cũ giữ nguyên mật khẩu cũ. Mật khẩu đó phải coi như đã lộ, và mọi môi
// trường từng seed trước mốc trên đều cần chạy script này một lần.
//
// Cách chạy (đặt mật khẩu mới qua biến môi trường, KHÔNG truyền qua tham số dòng lệnh
// để nó không lọt vào lịch sử shell):
//
//   # 1. Xem trước sẽ đụng vào những tài khoản nào — không ghi gì cả:
//   npx tsx scripts/doi-mat-khau-demo.ts
//
//   # 2. Thực hiện thật:
//   NEW_DEMO_PASSWORD='...' npx tsx scripts/doi-mat-khau-demo.ts --yes
//
//   # Giới hạn ở một số tài khoản cụ thể:
//   NEW_DEMO_PASSWORD='...' npx tsx scripts/doi-mat-khau-demo.ts --yes --emails=ldv@manlab.vn,ldp@manlab.vn
//
// Script KHÔNG bao giờ in mật khẩu ra màn hình hay ghi nó xuống file.
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

// Mặc định chỉ đụng tài khoản trong miền của seed. Tài khoản thật tạo sau này ở miền
// khác sẽ không bị động tới; muốn đổi tài khoản thật thì nêu đích danh bằng --emails.
const DOMAIN_DEMO = "@manlab.vn";
const DO_DAI_TOI_THIEU = 12;

// Mật khẩu từng nằm trong mã nguồn — chặn đặt lại đúng giá trị đó.
const MAT_KHAU_DA_LO = "DoiMatKhauNgay!2026";

function docThamSo(ten: string): string | undefined {
  const arg = process.argv.find((a) => a.startsWith(`--${ten}=`));
  return arg?.slice(ten.length + 3);
}

async function main() {
  const thucHien = process.argv.includes("--yes");
  const emailsChiDinh = docThamSo("emails")
    ?.split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const where = emailsChiDinh?.length
    ? { email: { in: emailsChiDinh } }
    : { email: { endsWith: DOMAIN_DEMO } };

  const users = await prisma.user.findMany({
    where,
    select: { id: true, email: true, name: true, role: true },
    orderBy: [{ role: "asc" }, { email: "asc" }],
  });

  if (users.length === 0) {
    console.log("Không có tài khoản nào khớp điều kiện — không làm gì.");
    return;
  }

  console.log(`Sẽ đổi mật khẩu ${users.length} tài khoản:`);
  for (const u of users) {
    console.log(`  ${u.role.padEnd(6)}  ${u.email}${u.name ? `  (${u.name})` : ""}`);
  }

  if (!thucHien) {
    console.log("\nĐây mới là xem trước, chưa ghi gì vào database.");
    console.log("Chạy lại kèm --yes và biến NEW_DEMO_PASSWORD để thực hiện thật.");
    return;
  }

  const matKhauMoi = process.env.NEW_DEMO_PASSWORD;
  if (!matKhauMoi) {
    throw new Error(
      "Thiếu biến môi trường NEW_DEMO_PASSWORD. Đặt qua biến môi trường, không truyền qua tham số dòng lệnh.",
    );
  }
  if (matKhauMoi.length < DO_DAI_TOI_THIEU) {
    throw new Error(`Mật khẩu mới phải dài tối thiểu ${DO_DAI_TOI_THIEU} ký tự.`);
  }
  if (matKhauMoi === MAT_KHAU_DA_LO) {
    throw new Error("Đây đúng là mật khẩu đã lộ công khai trên GitHub — chọn giá trị khác.");
  }

  const passwordHash = await bcrypt.hash(matKhauMoi, 10);
  const ketQua = await prisma.user.updateMany({
    where: { id: { in: users.map((u) => u.id) } },
    data: { passwordHash },
  });

  console.log(`\nĐã đổi mật khẩu cho ${ketQua.count} tài khoản.`);
  console.log("Phiên đăng nhập đang mở KHÔNG bị đăng xuất (session dùng JWT) — muốn cắt");
  console.log("ngay thì đổi AUTH_SECRET rồi khởi động lại app, mọi phiên sẽ mất hiệu lực.");
}

main()
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
