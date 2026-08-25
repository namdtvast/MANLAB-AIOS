// Cấp tài khoản cho một đề nghị đã được duyệt trên trang /admin/access-requests.
//
// Vì sao cần: form công khai và nút "Đồng ý cấp" cố ý KHÔNG tạo tài khoản (quy tắc R1
// trong src/lib/access-request/rules.ts) — chúng chỉ ghi nhận quyết định. Việc cấp
// tài khoản là một hành động quản trị riêng, phải để lại vết và lặp lại được, nên đi
// qua script này chứ không phải một câu SQL gõ tay.
//
// Script KHÔNG bao giờ in mật khẩu ra màn hình hay ghi nó xuống file, và KHÔNG đổi
// mật khẩu của tài khoản đã tồn tại (dùng scripts/doi-mat-khau-demo.ts cho việc đó).
//
// Cách chạy:
//
//   # 1. Xem trước — không ghi gì vào database:
//   npx tsx scripts/cap-tai-khoan.ts --email=nguoidung@donvi.vn --role=MEMBER
//
//   # 2. Thực hiện thật (mật khẩu đặt qua biến môi trường để không lọt vào lịch sử shell):
//   NEW_USER_PASSWORD='...' npx tsx scripts/cap-tai-khoan.ts --email=nguoidung@donvi.vn --role=MEMBER --yes
//
//   # Đổi họ tên hiển thị (mặc định lấy theo tên trong đề nghị):
//   ... --name='Nguyễn Văn A'
//
//   # Cấp theo quyết định ngoài hệ thống, không có đề nghị nào trên trang duyệt:
//   ... --khong-can-de-nghi --ghi-chu='Theo Quyết định số .../QĐ-ETV ngày ...'
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import type { PlatformRole } from "../src/generated/prisma/enums";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

const VAI_TRO_HOP_LE: PlatformRole[] = ["ADMIN", "MEMBER", "VIEWER"];
const DO_DAI_TOI_THIEU = 12;

// Mật khẩu từng nằm trong mã nguồn công khai — chặn đặt lại đúng giá trị đó.
const MAT_KHAU_DA_LO = "DoiMatKhauNgay!2026";

function docThamSo(ten: string): string | undefined {
  const arg = process.argv.find((a) => a.startsWith(`--${ten}=`));
  return arg?.slice(ten.length + 3);
}

async function main() {
  const thucHien = process.argv.includes("--yes");
  const khongCanDeNghi = process.argv.includes("--khong-can-de-nghi");
  const ghiChu = docThamSo("ghi-chu");

  const email = docThamSo("email")?.trim().toLowerCase();
  if (!email) throw new Error("Thiếu --email=... (email của người được cấp tài khoản).");

  const role = (docThamSo("role")?.trim().toUpperCase() ?? "") as PlatformRole;
  if (!VAI_TRO_HOP_LE.includes(role))
    throw new Error(`Thiếu hoặc sai --role=... — chọn một trong: ${VAI_TRO_HOP_LE.join(", ")}.`);

  // Không ghi đè tài khoản sẵn có: cấp lại cho email đã tồn tại thực chất là đổi mật
  // khẩu/vai trò của người khác, phải là một quyết định riêng chứ không phải hệ quả
  // phụ của lệnh "cấp tài khoản".
  const daCo = await prisma.user.findUnique({
    where: { email },
    select: { email: true, name: true, role: true, createdAt: true },
  });
  if (daCo) {
    console.log(`Email ${email} đã có tài khoản từ ${daCo.createdAt.toLocaleString("vi-VN")}:`);
    console.log(`  vai trò ${daCo.role}${daCo.name ? `  (${daCo.name})` : ""}`);
    console.log("\nScript này không đổi mật khẩu hay vai trò của tài khoản sẵn có.");
    console.log("Đổi mật khẩu:  npx tsx scripts/doi-mat-khau-demo.ts --emails=" + email);
    return;
  }

  // Đối chiếu với hàng chờ duyệt: chỉ cấp cho đề nghị đã APPROVED. Cấp cho email chưa
  // qua bước duyệt sẽ vô hiệu hoá chính chỗ kiểm soát mà trang /admin/access-requests dựng lên.
  const deNghi = await prisma.accessRequest.findFirst({
    where: { email, status: "APPROVED" },
    orderBy: { reviewedAt: "desc" },
    select: {
      fullName: true,
      organization: true,
      purpose: true,
      reviewedAt: true,
      reviewedBy: { select: { email: true, name: true } },
    },
  });

  if (!deNghi && !khongCanDeNghi) {
    const dangCho = await prisma.accessRequest.findFirst({
      where: { email, status: "PENDING" },
      select: { createdAt: true },
    });
    console.log(`Không có đề nghị nào đã duyệt cho ${email}.`);
    if (dangCho)
      console.log(
        `Có một đề nghị gửi ${dangCho.createdAt.toLocaleString("vi-VN")} còn ở trạng thái chờ — duyệt tại /admin/access-requests trước.`,
      );
    console.log(
      "Nếu cấp theo quyết định ngoài hệ thống thì chạy lại kèm --khong-can-de-nghi và --ghi-chu='căn cứ...'.",
    );
    process.exitCode = 1;
    return;
  }

  const name = docThamSo("name")?.trim() || deNghi?.fullName || null;

  console.log("Sẽ tạo tài khoản:");
  console.log(`  email     ${email}`);
  console.log(`  họ tên    ${name ?? "(không đặt)"}`);
  console.log(`  vai trò   ${role}`);
  if (deNghi) {
    console.log(`  căn cứ    đề nghị đã duyệt${deNghi.reviewedAt ? ` ngày ${deNghi.reviewedAt.toLocaleString("vi-VN")}` : ""}`);
    console.log(`            đơn vị: ${deNghi.organization}`);
    if (deNghi.reviewedBy)
      console.log(`            người duyệt: ${deNghi.reviewedBy.name ?? deNghi.reviewedBy.email}`);
  } else {
    console.log(`  căn cứ    ngoài hệ thống — ${ghiChu ?? "(chưa nêu, nên ghi bằng --ghi-chu=...)"}`);
  }
  if (role === "ADMIN")
    console.log("\n  ⚠  ADMIN xem và xử lý được toàn bộ yêu cầu cấp tài khoản của hệ thống.");

  if (!thucHien) {
    console.log("\nĐây mới là xem trước, chưa ghi gì vào database.");
    console.log("Chạy lại kèm --yes và biến NEW_USER_PASSWORD để thực hiện thật.");
    return;
  }

  const matKhau = process.env.NEW_USER_PASSWORD;
  if (!matKhau)
    throw new Error(
      "Thiếu biến môi trường NEW_USER_PASSWORD. Đặt qua biến môi trường, không truyền qua tham số dòng lệnh.",
    );
  if (matKhau.length < DO_DAI_TOI_THIEU)
    throw new Error(`Mật khẩu phải dài tối thiểu ${DO_DAI_TOI_THIEU} ký tự.`);
  if (matKhau === MAT_KHAU_DA_LO)
    throw new Error("Đây đúng là mật khẩu đã lộ công khai trên GitHub — chọn giá trị khác.");

  const user = await prisma.user.create({
    data: { email, name, role, passwordHash: await bcrypt.hash(matKhau, 10) },
    select: { id: true },
  });

  console.log(`\nĐã tạo tài khoản ${email} (${role}), id ${user.id}.`);
  console.log("Người dùng đăng nhập tại /login bằng email này và mật khẩu vừa đặt.");
  console.log("Vai trò theo từng module (nếu cần) gán riêng — vai trò nền tảng không thay được việc đó.");
}

main()
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
