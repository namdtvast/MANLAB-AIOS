// Mirror src/lib/m25/actor.ts — đọc actor/vai trò M33 của session hiện tại.
// Vai trò toàn cục qua ModuleRoleAssignment: QTHT / ATTT / VP / TP / QLCL / LDV
// (dùng chung vocabulary với M27/M28 theo DacTa M33 mục 10 điểm 2).
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { M33ActorUser } from "./rules";

const MODULE_CODE = "M33";

export async function getActor(): Promise<M33ActorUser & { name: string | null }> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Chưa đăng nhập.");
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return { id: session.user.id, m33Role: assignment?.role ?? null, name: session.user.name ?? null };
}

export async function getM33Role(): Promise<string | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return assignment?.role ?? null;
}
