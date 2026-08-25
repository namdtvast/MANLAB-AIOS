// Mirror src/lib/m25/actor.ts — đọc actor/vai trò M34 của session hiện tại.
// QLCL/ATTT/LDV/QTDL/QTHT là vai trò toàn cục qua ModuleRoleAssignment; CSHDL (chủ sở hữu
// dữ liệu) là vai trò THEO TẬP — xét bằng ownerId trên từng bản ghi (DacTa M34 mục 10 điểm 2).
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { M34ActorUser } from "./rules";

const MODULE_CODE = "M34";

export async function getActor(): Promise<M34ActorUser & { name: string | null }> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Chưa đăng nhập.");
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return { id: session.user.id, m34Role: assignment?.role ?? null, name: session.user.name ?? null };
}

export async function getM34Role(): Promise<string | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return assignment?.role ?? null;
}
