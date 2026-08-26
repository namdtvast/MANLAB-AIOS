// Mirror src/lib/m33/actor.ts — đọc actor/vai trò M27 của session hiện tại.
// Vai trò toàn cục qua ModuleRoleAssignment: TP / QTHT / ATTT / QLCL / VP / LDV
// (dùng chung vocabulary với M28, M33 — xem actor.ts của M33).
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { M27ActorUser } from "./rules";

const MODULE_CODE = "M27";

export async function getActor(): Promise<M27ActorUser & { name: string | null }> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Chưa đăng nhập.");
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return { id: session.user.id, m27Role: assignment?.role ?? null, name: session.user.name ?? null };
}

export async function getM27Role(): Promise<string | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return assignment?.role ?? null;
}
