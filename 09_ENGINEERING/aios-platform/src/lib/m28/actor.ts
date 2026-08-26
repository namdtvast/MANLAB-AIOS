// Mirror src/lib/m27/actor.ts — đọc actor/vai trò M28 của session hiện tại.
// Vai trò toàn cục qua ModuleRoleAssignment: TP / QTHT / ATTT / QLCL / VP / LDV
// (dùng chung vocabulary với M27, M33).
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { M28ActorUser } from "./rules";

const MODULE_CODE = "M28";

export async function getActor(): Promise<M28ActorUser & { name: string | null }> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Chưa đăng nhập.");
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return { id: session.user.id, m28Role: assignment?.role ?? null, name: session.user.name ?? null };
}

export async function getM28Role(): Promise<string | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return assignment?.role ?? null;
}

/// Vai trò M28 của một người bất kỳ — dùng để kiểm R3 (chủ sở hữu rủi ro phải là TP hoặc LĐV).
export async function getRoleOf(userId: string): Promise<string | null> {
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId, moduleCode: MODULE_CODE },
  });
  return assignment?.role ?? null;
}
