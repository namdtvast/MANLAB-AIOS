// Đổi tài khoản đăng nhập ngay trên header, không phải Đăng xuất rồi Đăng nhập lại.
//
// Vì sao làm theo kiểu "đổi người" chứ không phải "đổi quyền của người đang đăng nhập":
// mọi quy tắc nghiệp vụ trên nền tảng đều đọc quyền từ chính con người đang đăng nhập —
// PlatformRole nằm ở bản ghi User, còn vai trò module (NTH/LĐP/LĐV/QLCL/QTHT/…) nằm ở
// ModuleRoleAssignment gắn với userId (xem src/lib/mXX/actor.ts). Sửa vai trò của tài khoản
// đang đăng nhập sẽ ghi đè dữ liệu phân quyền thật và vẫn không tái hiện được tình huống
// "người khác thao tác". Đổi hẳn sang tài khoản của người mang vai trò đó thì không quy tắc
// nào phải sửa, và đúng nguyên tắc "một người một tài khoản định danh riêng" của ETV.P28 §6.7.1.
//
// Ba lớp chặn, phải qua cả ba mới đổi được:
//   1. Cần gạt DEMO_ACCOUNT_SWITCH="true" — mặc định TẮT, môi trường thật không cần đặt gì.
//   2. Cả tài khoản đang đăng nhập lẫn tài khoản đích đều phải có User.demoAccount = true.
//      Cột này chỉ do prisma/seed.ts đặt, nên tài khoản người thật không bao giờ là đích.
//   3. Vé HMAC ký bằng AUTH_SECRET, hạn 60 giây, do server action phát sau khi đã kiểm tra
//      phiên hiện tại. Không có vé thì endpoint đăng nhập của provider vô dụng với người lạ —
//      đây là chỗ bịt lỗ "đăng nhập không cần mật khẩu" mà một bộ chuyển tài khoản dễ tạo ra.
import { createHmac, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/prisma";
import type { PlatformRole } from "@/generated/prisma/enums";

/** Hạn dùng của vé đổi tài khoản. Đủ cho một lượt bấm, không đủ để đem đi dùng lại. */
const VE_HAN_MS = 60_000;

export function doiTaiKhoanBat(): boolean {
  return process.env.DEMO_ACCOUNT_SWITCH === "true";
}

export interface TaiKhoanDemo {
  id: string;
  email: string;
  name: string | null;
  role: PlatformRole;
  /**
   * Vai trò module đã gán, GOM THEO MÃ VAI TRÒ chứ không liệt kê từng module. Lý do: người
   * mang một vai trò thường mang đúng vai trò đó ở gần như mọi module (ldv@ có LDV ở 17
   * module), nên liệt kê "M01·LDV, M02·LDV, …" chỉ là 17 lần nhắc lại một thông tin. Cái
   * người dùng cần thấy khi chọn tài khoản là "đây là LĐV", không phải danh sách module.
   */
  vaiTro: { role: string; moduleCodes: string[] }[];
}

/**
 * Danh sách tài khoản có thể chuyển sang. Nguồn sự thật là database (cột demoAccount +
 * bảng ModuleRoleAssignment), KHÔNG phải một danh sách viết cứng ở giao diện — thêm tài
 * khoản demo mới trong seed là nó tự có mặt ở đây.
 */
export async function danhSachTaiKhoanDemo(): Promise<TaiKhoanDemo[]> {
  if (!doiTaiKhoanBat()) return [];
  const users = await prisma.user.findMany({
    where: { demoAccount: true },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      moduleRoles: { select: { moduleCode: true, role: true }, orderBy: { moduleCode: "asc" } },
    },
    orderBy: [{ role: "asc" }, { email: "asc" }],
  });
  return users.map(({ moduleRoles, ...u }) => {
    const theoVaiTro = new Map<string, string[]>();
    for (const { role, moduleCode } of moduleRoles) {
      const ds = theoVaiTro.get(role);
      if (ds) ds.push(moduleCode);
      else theoVaiTro.set(role, [moduleCode]);
    }
    return {
      ...u,
      // Vai trò phủ nhiều module nhất đứng trước — đó là vai trò "chính" của người này.
      vaiTro: [...theoVaiTro.entries()]
        .map(([role, moduleCodes]) => ({ role, moduleCodes }))
        .sort((a, b) => b.moduleCodes.length - a.moduleCodes.length || a.role.localeCompare(b.role)),
    };
  });
}

/** Tài khoản đang đăng nhập có được phép dùng bộ chuyển không (điều kiện 1 + 2 vế "nguồn"). */
export async function duocDoiTaiKhoan(userId: string | undefined): Promise<boolean> {
  if (!doiTaiKhoanBat() || !userId) return false;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { demoAccount: true } });
  return user?.demoAccount === true;
}

function kySo(payload: string): string {
  // AUTH_SECRET là bí mật bắt buộc của NextAuth, luôn có ở mọi môi trường chạy được nền tảng.
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("Thiếu AUTH_SECRET — không ký được vé đổi tài khoản.");
  return createHmac("sha256", secret).update(payload).digest("hex");
}

/** Phát vé cho một lượt đổi sang `email`. Chỉ gọi sau khi đã kiểm tra phiên hiện tại. */
export function taoVe(email: string, hetHan: number): string {
  return `${hetHan}.${kySo(`${email}|${hetHan}`)}`;
}

export function veHetHan(): number {
  return Date.now() + VE_HAN_MS;
}

/** Kiểm vé ở phía provider. Trả về false cho mọi trường hợp sai, không phân biệt lý do. */
export function veHopLe(email: string, ve: string): boolean {
  const [hanStr, chuKy] = ve.split(".");
  const hetHan = Number(hanStr);
  if (!Number.isFinite(hetHan) || !chuKy) return false;
  if (Date.now() > hetHan) return false;
  const mong = Buffer.from(kySo(`${email}|${hetHan}`), "hex");
  const thuc = Buffer.from(chuKy, "hex");
  if (mong.length !== thuc.length) return false;
  return timingSafeEqual(mong, thuc);
}

/**
 * Tài khoản đích có nhận lượt đổi không (điều kiện 1 + 2 vế "đích"). Dùng ở provider, nơi
 * KHÔNG được tin bất cứ thứ gì đến từ trình duyệt ngoài chữ ký của vé.
 */
export async function taiKhoanDemoTheoEmail(email: string) {
  if (!doiTaiKhoanBat()) return null;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user?.demoAccount) return null;
  return user;
}
