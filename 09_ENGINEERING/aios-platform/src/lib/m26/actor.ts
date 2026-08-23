// Mirror src/lib/m25/actor.ts — đọc actor/vai trò M26 của session hiện tại.
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { M26ActorUser } from "./rules";

const MODULE_CODE = "M26";

export async function getActor(): Promise<M26ActorUser & { name: string | null }> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Chưa đăng nhập.");
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return { id: session.user.id, m26Role: assignment?.role ?? null, name: session.user.name ?? null };
}

export async function getViewer(): Promise<{ id: string | null; role: string | null }> {
  const session = await auth();
  if (!session?.user?.id) return { id: null, role: null };
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return { id: session.user.id, role: assignment?.role ?? null };
}
