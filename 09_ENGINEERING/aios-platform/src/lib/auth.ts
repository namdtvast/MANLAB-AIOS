import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { taiKhoanDemoTheoEmail, veHopLe } from "@/lib/doi-tai-khoan";
// Tài khoản bị tạm khóa/thu hồi trong sổ F33.03 của M33 thì không đăng nhập được và phiên đang mở
// bị cắt ngay ở request kế tiếp — ETV.P28 §6.7.1 đòi thu hồi trong ngày làm việc, mà một phiên JWT
// sống tới 30 ngày thì "đã thu hồi" chỉ là chữ trong sổ.
import { taiKhoanConHieuLuc } from "@/lib/hieu-luc-tai-khoan";
import type { PlatformRole } from "@/generated/prisma/enums";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mật khẩu", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        // Kiểm sau mật khẩu, không trước: trả lời khác nhau trước khi biết mật khẩu đúng là nói
        // cho người lạ biết email nào có tài khoản và tài khoản nào đang bị khóa.
        if (user.accountStatus !== "DANG_HOAT_DONG") return null;

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
    // Đổi tài khoản ngay trên header, không qua Đăng xuất/Đăng nhập (src/lib/doi-tai-khoan.ts).
    // KHÔNG nhận mật khẩu — thứ nó nhận là một VÉ ký bằng AUTH_SECRET, hạn 60 giây, chỉ server
    // action doiTaiKhoanAction() phát ra và chỉ phát sau khi đã xác minh phiên hiện tại. Thiếu
    // lớp vé này thì provider chính là một endpoint đăng nhập không cần mật khẩu cho ai gọi tới.
    Credentials({
      id: "doi-tai-khoan",
      name: "Đổi tài khoản demo",
      credentials: { email: { type: "text" }, ve: { type: "text" } },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const ve = credentials?.ve as string | undefined;
        if (!email || !ve) return null;
        if (!veHopLe(email, ve)) return null;

        // Kiểm lại tài khoản đích ở đây chứ không chỉ ở server action: vé chứng minh lượt đổi
        // do nền tảng phát ra, còn cờ demoAccount mới là thứ quyết định tài khoản nào được nhập vai.
        const user = await taiKhoanDemoTheoEmail(email);
        if (!user) return null;
        // Bộ chuyển tài khoản phải chịu đúng lớp chặn của đăng nhập thường, nếu không nó là
        // đường vòng quanh chính lớp chặn này.
        if (user.accountStatus !== "DANG_HOAT_DONG") return null;

        console.warn(
          `[doi-tai-khoan] ${new Date().toISOString()} — nhập vai tài khoản demo ${user.email} (${user.role}).`
        );
        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = (user as { role?: PlatformRole }).role;
      return token;
    },
    // Chỗ duy nhất mọi lần auth() đều đi qua — trang, layout, server action, proxy. Kiểm hiệu lực
    // tài khoản ở đây thay vì gọi thêm ở hơn hai mươi file actor.ts; giá là một truy vấn theo khóa
    // chính mỗi lần auth().
    session: async ({ session, token }) => {
      if (!session.user) return session;
      if (token.sub && !(await taiKhoanConHieuLuc(token.sub))) {
        // Không gán id/role: getActor() của mọi module thấy phiên không có id thì ném "Chưa đăng
        // nhập", nên tab đang mở cũng không ghi được dữ liệu nữa. Cờ biKhoa để proxy.ts đẩy về
        // /login thay vì để người dùng đứng trước một trang trống không hiểu vì sao.
        session.user.biKhoa = true;
        return session;
      }
      if (token.sub) session.user.id = token.sub;
      if (token.role) session.user.role = token.role;
      return session;
    },
  },
});
