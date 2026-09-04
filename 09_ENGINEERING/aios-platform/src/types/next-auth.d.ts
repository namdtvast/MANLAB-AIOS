import type { PlatformRole } from "@/generated/prisma/enums";
import type { DefaultSession } from "@auth/core/types";

// next-auth/next-auth.d.ts và @auth/core/types.d.ts chỉ re-export các interface này
// (`export type { Session } from "@auth/core/types"`) — declaration merging phải augment
// đúng module khai báo gốc (@auth/core/...), augment "next-auth"/"next-auth/jwt" sẽ không
// gộp được vào interface thật.
declare module "@auth/core/types" {
  interface Session {
    user: {
      role: PlatformRole;
      /**
       * Tài khoản đã bị tạm khóa/thu hồi trong sổ F33.03 (M33). Khi cờ này bật thì `id` và `role`
       * CỐ Ý không được gán — mọi thứ đọc quyền từ phiên sẽ coi như chưa đăng nhập. Xem
       * src/lib/auth.ts và _meta/specs/20260904-thu-hoi-tai-khoan/spec.md.
       */
      biKhoa?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: PlatformRole;
  }
}
