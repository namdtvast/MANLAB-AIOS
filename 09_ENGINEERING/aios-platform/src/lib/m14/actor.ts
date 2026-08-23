// Mirror src/lib/m13/actor.ts — đọc actor/vai trò M14 của session hiện tại.
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { M14ActorUser } from "./rules";

const MODULE_CODE = "M14";

export async function getActor(): Promise<M14ActorUser & { name: string | null }> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Chưa đăng nhập.");
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return { id: session.user.id, m14Role: assignment?.role ?? null, name: session.user.name ?? null };
}

export async function getM14Role(): Promise<string | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return assignment?.role ?? null;
}
