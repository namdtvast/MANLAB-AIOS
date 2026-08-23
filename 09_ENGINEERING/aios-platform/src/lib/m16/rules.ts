// M16 — state machine/gate thuần hàm, AUTHORITATIVE. Port từ ETV.P16_DanhGiaNoiBo.md (Đã phê
// duyệt, lần 03) — xem 01_Requirement/_work/20260823-xay-moi-m16/spec.md để đối chiếu "Quyết
// định phạm vi" (không có 08_Source nguyên mẫu, giống M01/M02/M03/M04).
import type { M16PlanStatus } from "@/generated/prisma/enums";

export type TxResult =
  | { ok: true; status: string; action: string; reason: string | null; patch: Record<string, unknown> }
  | { ok: false; code: string; message: string };

const ok = (status: string, action: string, reason: string | null = null, patch: Record<string, unknown> = {}): TxResult => ({
  ok: true,
  status,
  action,
  reason,
  patch,
});
const err = (code: string, message: string): TxResult => ({ ok: false, code, message });

export interface M16ActorUser {
  id: string;
  m16Role: string | null; // QLCL / LDP / LDV / TRUONGDOAN / DANHGIAVIEN / TRUONGBOPHAN
}

// ---------- AuditPlan — gate 2 cấp (mirror M10) ----------

export interface PlanForRules {
  status: M16PlanStatus;
  createdById: string;
}

export const canReviewPlan = (p: PlanForRules, u: M16ActorUser) => u.m16Role === "LDP" && p.createdById !== u.id;
export const canApprovePlan = (u: M16ActorUser) => u.m16Role === "LDV";

export function txSubmitPlan(p: PlanForRules): TxResult {
  if (p.status !== "DRAFT" && p.status !== "REJECTED") return err("NOT_DRAFT", "Chỉ kế hoạch Đang soạn/Từ chối mới gửi xem xét được.");
  return ok("PENDING_REVIEW", "Gửi xem xét");
}

export function txReviewPlan(
  p: PlanForRules,
  u: M16ActorUser,
  { decision, reason }: { decision?: "return" | "approve"; reason?: string } = {}
): TxResult {
  if (p.status !== "PENDING_REVIEW") return err("BAD_STATE", "Kế hoạch không ở bước Chờ xem xét.");
  if (!canReviewPlan(p, u)) return err("FORBIDDEN", "Chỉ LĐP (không phải người tạo) được xem xét kế hoạch.");
  if (decision === "return") {
    if (!reason) return err("REASON_REQUIRED", "Trả lại bắt buộc nhập lý do.");
    return ok("DRAFT", "Trả lại khi xem xét", reason, { reviewedById: u.id });
  }
  return ok("PENDING_APPROVAL", "Xem xét đạt → chờ phê duyệt", null, { reviewedById: u.id });
}

export function txApprovePlan(
  p: PlanForRules,
  u: M16ActorUser,
  { decision, reason }: { decision?: "reject" | "approve"; reason?: string } = {}
): TxResult {
  if (p.status !== "PENDING_APPROVAL") return err("BAD_STATE", "Kế hoạch không ở bước Chờ phê duyệt.");
  if (!canApprovePlan(u)) return err("FORBIDDEN", "Chỉ LĐV được phê duyệt kế hoạch đánh giá.");
  if (decision === "reject") {
    if (!reason) return err("REASON_REQUIRED", "Từ chối bắt buộc nhập lý do.");
    return ok("REJECTED", "Từ chối phê duyệt", reason, { approvedById: null });
  }
  return ok("APPROVED", "Phê duyệt kế hoạch đánh giá", null, { approvedById: u.id });
}

// ---------- AuditProgram — gate thời hạn thông báo (quy tắc 2 DacTa) ----------

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function daysUntil(auditDate: Date, now: Date = new Date()): number {
  return Math.ceil((auditDate.getTime() - now.getTime()) / MS_PER_DAY);
}

export function canConfirmProgram(auditDate: Date, now: Date = new Date()): string | null {
  const days = daysUntil(auditDate, now);
  if (days < 7) {
    return `Ngày đánh giá chỉ còn ${days} ngày — bắt buộc thông báo bộ phận liên quan ít nhất 1 tuần trước (quy tắc 2 ETV.P16).`;
  }
  return null;
}

// ---------- AuditReport — tính isLate (quy tắc 4 DacTa, không chặn) ----------

export function computeIsLate(closingMeetingDate: Date, submittedAt: Date): boolean {
  const days = (submittedAt.getTime() - closingMeetingDate.getTime()) / MS_PER_DAY;
  return days > 7;
}

export const canCreateReport = (u: M16ActorUser) => u.m16Role === "TRUONGDOAN";
export const canCreateFinding = (u: M16ActorUser) => u.m16Role === "DANHGIAVIEN" || u.m16Role === "TRUONGDOAN";
