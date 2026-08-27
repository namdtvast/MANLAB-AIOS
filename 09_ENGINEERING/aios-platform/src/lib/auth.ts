import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { taiKhoanDemoTheoEmail, veHopLe } from "@/lib/doi-tai-khoan";
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
    session: async ({ session, token }) => {
      if (session.user) {
        if (token.sub) session.user.id = token.sub;
        if (token.role) session.user.role = token.role;
      }
      return session;
    },
  },
});
