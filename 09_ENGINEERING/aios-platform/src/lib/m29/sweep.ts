// M29 — quét theo lịch: phát hiện AIA quá hạn rà soát và tạm dừng Agent tương ứng.
// Căn cứ: ETV.P29 mục 5.2.3 ("AIA quá hạn tự chuyển Cần rà soát lại, tác tử tương ứng bị tạm
// dừng cho tới khi rà soát xong") và DacTa.md quy tắc 11 (hệ thống PHÁT HIỆN theo lịch, ghi
// AIAuditLog với actor=SYSTEM — AI không tự kết luận nội dung đánh giá).
//
// Module THƯỜNG (không "use server") để cả Server Action lẫn Route Handler gọi được — cùng lý do
// tách actor.ts khỏi actions.ts.
import { prisma } from "@/lib/prisma";

export const SUSPEND_REASON_AIA = "AIA_OVERDUE";

export interface SweepResult {
  aiaFlagged: number;
  agentsSuspended: number;
  ranAt: Date;
}

/** Ghi audit cho hành động do hệ thống thực hiện — không mượn danh nghĩa một người dùng thật. */
async function logSystemAudit(
  entityType: string,
  entityId: string,
  patch: { field?: string; before?: unknown; after?: unknown; reason?: string }
) {
  await prisma.aIAuditLog.create({
    data: {
      actorId: null,
      actorLabel: "SYSTEM",
      role: "SYSTEM",
      entityType,
      entityId,
      field: patch.field ?? null,
      before: (patch.before ?? undefined) as object | undefined,
      after: (patch.after ?? undefined) as object | undefined,
      reason: patch.reason ?? null,
    },
  });
}

/**
 * Quét AIA quá hạn. Idempotent: AIA đã ở REVIEW_REQUIRED không bị quét lại nên không sinh audit
 * trùng; Agent đã SUSPENDED cũng không bị ghi đè lý do tạm dừng ban đầu.
 */
export async function sweepAiaReview(now: Date = new Date()): Promise<SweepResult> {
  const dueAia = await prisma.aIImpactAssessment.findMany({
    where: { status: "APPROVED", reviewDate: { lt: now } },
    include: { agent: true },
  });

  let agentsSuspended = 0;

  for (const aia of dueAia) {
    await prisma.aIImpactAssessment.update({ where: { id: aia.id }, data: { status: "REVIEW_REQUIRED" } });
    await logSystemAudit("aia", aia.id, {
      field: "status",
      before: "APPROVED",
      after: "REVIEW_REQUIRED",
      reason: `Quá hạn rà soát định kỳ (reviewDate=${aia.reviewDate?.toISOString()}) — hệ thống phát hiện theo lịch, không phải AI tự kết luận nội dung đánh giá.`,
    });

    // Chỉ tạm dừng Agent đang ACTIVE; Agent đã bị tạm dừng vì sự cố giữ nguyên lý do cũ.
    if (aia.agent && aia.agent.status === "ACTIVE") {
      await prisma.aIAgent.update({
        where: { id: aia.agent.id },
        data: { status: "SUSPENDED", suspendedReason: SUSPEND_REASON_AIA, suspendedAt: now },
      });
      await logSystemAudit("agents", aia.agent.id, {
        field: "status",
        before: "ACTIVE",
        after: "SUSPENDED",
        reason: `Tạm dừng do hồ sơ AIA ${aia.code} quá hạn rà soát (ETV.P29 mục 5.2.3).`,
      });
      agentsSuspended += 1;
    }
  }

  return { aiaFlagged: dueAia.length, agentsSuspended, ranAt: now };
}

// Chặn tần suất khi sweep được kích hoạt bởi lượt truy cập trang: giữ trong bộ nhớ tiến trình,
// mất khi khởi động lại — chấp nhận được vì sweep idempotent, chạy lại chỉ tốn 1 truy vấn.
const MIN_INTERVAL_MS = 15 * 60 * 1000;
let lastSweepAt = 0;

/** Gọi được từ Server Component: tự bỏ qua nếu vừa quét trong 15 phút gần đây. */
export async function maybeSweep(): Promise<SweepResult | null> {
  const now = Date.now();
  if (now - lastSweepAt < MIN_INTERVAL_MS) return null;
  lastSweepAt = now;
  try {
    return await sweepAiaReview(new Date(now));
  } catch {
    // Không để lỗi quét nền làm hỏng lượt render trang.
    return null;
  }
}
