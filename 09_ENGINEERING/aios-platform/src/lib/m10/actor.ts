// Module THƯỜNG (không "use server") — đọc actor/vai trò M10 của session hiện
// tại. Tách riêng khỏi actions.ts vì actions.ts là boundary Server Action:
// gọi trực tiếp một export "use server" trong lúc render Server Component đi
// qua RPC boundary không cần thiết và làm mất ngữ cảnh cookie/session (đã gặp
// lỗi "Chưa đăng nhập" dù đã login — do gọi getCurrentM10Role kiểu đó).
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { M10ActorUser } from "./rules";

const MODULE_CODE = "M10";

export async function getActor(): Promise<M10ActorUser & { name: string | null }> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Chưa đăng nhập.");
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return { id: session.user.id, m10Role: assignment?.role ?? null, name: session.user.name ?? null };
}

// Dùng trong Server Component (gọi trực tiếp, không phải Server Action) — trả
// null thay vì throw nếu chưa đăng nhập, vì đây chỉ để hiển thị, không phải
// action cần chặn.
export async function getM10Role(): Promise<string | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return assignment?.role ?? null;
}
