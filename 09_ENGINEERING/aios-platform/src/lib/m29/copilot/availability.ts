// Có hiển thị khay Copilot hay không. Đọc ở layout nền tảng (server component).
//
// Hai cần gạt độc lập, cố ý:
//   - COPILOT_ENABLED=false  → tắt toàn cục ngay, không cần deploy lại schema (spec §12).
//   - AIAgent.status         → tạm dừng theo đúng cơ chế quản trị M29 (ETV.P29 §5.7.3).
// Chỉ cần một trong hai tắt là khay biến mất. Không có cần gạt thứ ba trong mã giao diện.
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { COPILOT_AGENT_CODE } from "../gateway";

export async function copilotAvailable(): Promise<boolean> {
  if (process.env.COPILOT_ENABLED === "false") return false;
  const session = await auth();
  if (!session?.user?.id) return false;
  const agent = await prisma.aIAgent.findUnique({ where: { code: COPILOT_AGENT_CODE }, select: { status: true } });
  return agent?.status === "ACTIVE";
}
