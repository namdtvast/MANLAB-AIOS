"use server";

import { auth, signIn } from "@/lib/auth";
import { duocDoiTaiKhoan, taiKhoanDemoTheoEmail, taoVe, veHetHan } from "@/lib/doi-tai-khoan";

/**
 * Đổi tài khoản đăng nhập tại chỗ. Kiểm phía "nguồn" (phiên hiện tại có được phép đổi không)
 * nằm ở đây; kiểm phía "đích" và kiểm vé nằm ở provider doi-tai-khoan trong src/lib/auth.ts.
 *
 * Mọi trường hợp không hợp lệ đều trả về lặng lẽ: form này chỉ hiện ra khi bộ chuyển đang bật,
 * nên một lượt POST không hợp lệ là dấu hiệu người gọi đang mò, không phải người dùng gõ nhầm.
 */
export async function doiTaiKhoanAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const quayLaiTho = String(formData.get("quayLai") ?? "");
  // Chỉ nhận đường dẫn nội bộ — "//host" và "https://host" đều là chuyển hướng ra ngoài.
  const quayLai =
    quayLaiTho.startsWith("/") && !quayLaiTho.startsWith("//") ? quayLaiTho : "/dashboard";

  const session = await auth();
  if (!(await duocDoiTaiKhoan(session?.user?.id))) return;
  if (session?.user?.email === email) return;
  if (!(await taiKhoanDemoTheoEmail(email))) return;

  const hetHan = veHetHan();
  await signIn("doi-tai-khoan", { email, ve: taoVe(email, hetHan), redirectTo: quayLai });
}
