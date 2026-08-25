"use server";
// Server action của khay Copilot. Lớp này CHỈ làm 3 việc: xác thực phiên, quản lý hội thoại, và
// gọi gateway.chat(). Mọi kiểm soát nghiệp vụ (AIA Gate, guardrail, hạn mức, trích dẫn) nằm ở
// gateway — không nhân bản ở đây, và cũng không có đường nào bỏ qua gateway.
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { chat, type Citation } from "../gateway";
import type { ChatMessage } from "../adapters";
import type { Prisma } from "@/generated/prisma/client";

/** Số lượt hỏi–đáp cũ gửi kèm làm ngữ cảnh hội thoại. Giữ nhỏ để chi phí mỗi lượt ổn định. */
const HISTORY_TURNS = 3;
const MAX_QUESTION_CHARS = 2000;

export interface AskResult {
  ok: boolean;
  threadId: string | null;
  answer: string;
  citations: Citation[];
  /** null khi thành công; ngược lại là mã từ chối/lỗi (AGENT_NOT_ACTIVE, NO_SOURCE, ...). */
  code: string | null;
}

export async function askCopilot(input: {
  threadId: string | null;
  question: string;
  moduleContext?: string | null;
}): Promise<AskResult> {
  const session = await auth();
  if (!session?.user?.id)
    return { ok: false, threadId: null, answer: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.", citations: [], code: "UNAUTHENTICATED" };

  const question = input.question.trim();
  if (!question) return { ok: false, threadId: input.threadId, answer: "Chưa nhập câu hỏi.", citations: [], code: "EMPTY_QUESTION" };
  if (question.length > MAX_QUESTION_CHARS)
    return {
      ok: false,
      threadId: input.threadId,
      answer: `Câu hỏi quá dài (tối đa ${MAX_QUESTION_CHARS} ký tự).`,
      citations: [],
      code: "QUESTION_TOO_LONG",
    };

  // Người dùng chỉ thao tác trên hội thoại của chính mình (spec §8) — kiểm bằng userId trong
  // điều kiện tìm kiếm, không tin threadId do trình duyệt gửi lên.
  const thread =
    (input.threadId ? await prisma.copilotThread.findFirst({ where: { id: input.threadId, userId: session.user.id } }) : null) ??
    (await prisma.copilotThread.create({ data: { userId: session.user.id, moduleContext: input.moduleContext ?? null } }));

  const previous = await prisma.copilotMessage.findMany({
    where: { threadId: thread.id },
    orderBy: { createdAt: "desc" },
    take: HISTORY_TURNS * 2,
    select: { role: true, content: true },
  });
  const history: ChatMessage[] = previous
    .reverse()
    .map((m) => ({ role: m.role === "assistant" ? ("assistant" as const) : ("user" as const), content: m.content }));

  const result = await chat({ question, history, user: { id: session.user.id } });

  await prisma.copilotMessage.create({ data: { threadId: thread.id, role: "user", content: question } });
  await prisma.copilotMessage.create({
    data: {
      threadId: thread.id,
      role: "assistant",
      content: result.answer,
      // Citation là kiểu riêng nên phải ép sang InputJsonValue của Prisma; hình dạng dữ liệu
      // không đổi ({path, title, heading}).
      citations: result.citations as unknown as Prisma.InputJsonValue,
      requestId: result.requestId,
    },
  });
  await prisma.copilotThread.update({ where: { id: thread.id }, data: { updatedAt: new Date() } });

  return { ok: result.ok, threadId: thread.id, answer: result.answer, citations: result.citations, code: result.code };
}
