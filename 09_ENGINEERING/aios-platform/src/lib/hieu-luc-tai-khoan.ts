// Hiệu lực đăng nhập của một tài khoản — tách khỏi src/lib/auth.ts để canh được bằng test.
//
// Nguồn quyết định là sổ tài khoản hệ thống F33.03 của M33 (ETV.P33 §6.4): khóa/thu hồi ở đó ghi
// vào User.accountStatus trong cùng transaction. Ở đây chỉ đọc kết quả.
// Đặc tả: _meta/specs/20260904-thu-hoi-tai-khoan/spec.md
import { prisma } from "@/lib/prisma";

export async function taiKhoanConHieuLuc(userId: string): Promise<boolean> {
  try {
    const u = await prisma.user.findUnique({ where: { id: userId }, select: { accountStatus: true } });
    // Không tìm thấy tài khoản ⇒ không còn hiệu lực: phiên cũ của một User đã bị xoá khỏi database
    // không được phép sống tiếp chỉ vì cookie còn hạn.
    return u?.accountStatus === "DANG_HOAT_DONG";
  } catch (e) {
    // Fail-open CÓ CHỦ ĐÍCH: mất kết nối database thì mọi trang đã hỏng sẵn, không có lý do biến
    // sự cố hạ tầng thành một lượt đăng xuất toàn Viện. Đổi lại phải kêu to trong log.
    console.error("[auth] Không kiểm được hiệu lực tài khoản, tạm coi là còn hiệu lực:", e);
    return true;
  }
}
