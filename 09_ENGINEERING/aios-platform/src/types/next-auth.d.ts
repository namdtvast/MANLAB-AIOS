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
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: PlatformRole;
  }
}
