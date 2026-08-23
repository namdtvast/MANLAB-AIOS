// Mirror src/lib/m10/actor.ts — đọc actor/vai trò M01 của session hiện tại. Tách riêng khỏi
// actions.ts vì actions.ts là boundary Server Action (xem lý do đầy đủ ở m10/actor.ts).
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { M01ActorUser } from "./rules";

const MODULE_CODE = "M01";

export async function getActor(): Promise<M01ActorUser & { name: string | null }> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Chưa đăng nhập.");
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return { id: session.user.id, m01Role: assignment?.role ?? null, name: session.user.name ?? null };
}

// Dùng trong Server Component (gọi trực tiếp, không phải Server Action) — trả null thay vì
// throw nếu chưa đăng nhập, vì đây chỉ để hiển thị, không phải action cần chặn.
export async function getM01Role(): Promise<string | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  const assignment = await prisma.moduleRoleAssignment.findFirst({
    where: { userId: session.user.id, moduleCode: MODULE_CODE },
  });
  return assignment?.role ?? null;
}
