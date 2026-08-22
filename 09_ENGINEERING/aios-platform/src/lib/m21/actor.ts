// Module THƯỜNG (không "use server") — đọc actor/vai trò M21 của session hiện tại.
// Tách riêng khỏi actions.ts vì actions.ts là boundary Server Action — xem lý do tương tự
// trong src/lib/m10/actor.ts (gọi "use server" export trong lúc render Server Component đi
// qua RPC boundary không cần thiết, làm mất ngữ cảnh cookie/session).
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { M21ActorUser, M21Role } from "./rules";

const MODULE_CODE = "M21";
const VALID_ROLES = new Set(["NTH", "LDP", "LDV"]);

function asM21Role(role: string | undefined): M21Role | null {
  return role && VALID_ROLES.has(role) ? (role as M21Role) : null;
}

export async function getActor(): Promise<M21ActorUser & { name: string | null }> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Chưa đăng nhập.");
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return { id: session.user.id, m21Role: asM21Role(assignment?.role), name: session.user.name ?? null };
}

// Dùng trong Server Component (gọi trực tiếp, không phải Server Action) — trả null thay vì
// throw nếu chưa đăng nhập, vì đây chỉ để hiển thị, không phải action cần chặn.
export async function getM21Role(): Promise<M21Role | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return asM21Role(assignment?.role);
}
