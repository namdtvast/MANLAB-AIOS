// Module THƯỜNG (không "use server") — đọc actor/vai trò M29 của session hiện tại.
// Mirror src/lib/m10/actor.ts và src/lib/m21/actor.ts — lý do tách riêng khỏi actions.ts xem
// ghi chú ở 2 file đó.
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ROLE_RANK, type M29Role } from "./model";

const MODULE_CODE = "M29";
const VALID_ROLES = new Set(Object.keys(ROLE_RANK));

function asM29Role(role: string | undefined): M29Role | null {
  return role && VALID_ROLES.has(role) ? (role as M29Role) : null;
}

export interface M29ActorUser {
  id: string;
  m29Role: M29Role | null;
  name: string | null;
}

export async function getActor(): Promise<M29ActorUser> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Chưa đăng nhập.");
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return { id: session.user.id, m29Role: asM29Role(assignment?.role), name: session.user.name ?? null };
}

export async function getM29Role(): Promise<M29Role | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return asM29Role(assignment?.role);
}
