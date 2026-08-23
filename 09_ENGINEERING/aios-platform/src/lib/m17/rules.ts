// M17 — gate/state machine thuần hàm, AUTHORITATIVE. Port từ ETV.P17_XemXetLanhDao.md (Đã phê
// duyệt, lần 03) — xem 01_Requirement/_work/20260823-xay-moi-m17/spec.md để đối chiếu "Quyết
// định phạm vi". Gate chính: ĐỒNG PHÊ DUYỆT (TP + LĐV độc lập, không phân cấp — khác M16).
import type { M17PlanStatus } from "@/generated/prisma/enums";

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

export interface M17ActorUser {
  id: string;
  m17Role: string | null; // QLCL / TP / LDV
}

// ---------- ReviewPlan — gate đồng phê duyệt ----------

export interface PlanForRules {
  status: M17PlanStatus;
  tpApprovedById: string | null;
  ldvApprovedById: string | null;
}

export function txSubmitPlan(p: PlanForRules): TxResult {
  if (p.status !== "DRAFT" && p.status !== "REJECTED") return err("NOT_DRAFT", "Chỉ chương trình Đang soạn/Không duyệt mới gửi duyệt được.");
  return ok("PENDING_APPROVAL", "Gửi yêu cầu duyệt");
}

function nextStatusAfter(bothApproved: boolean): M17PlanStatus {
  return bothApproved ? "APPROVED" : "PENDING_APPROVAL";
}

export function txTpApprove(p: PlanForRules, u: M17ActorUser): TxResult {
  if (p.status !== "PENDING_APPROVAL") return err("BAD_STATE", "Chương trình không ở bước Chờ duyệt.");
  if (u.m17Role !== "TP") return err("FORBIDDEN", "Chỉ Trưởng phòng được duyệt (đồng phê duyệt cùng LĐV).");
  if (p.tpApprovedById) return err("ALREADY_APPROVED", "Trưởng phòng đã duyệt chương trình này rồi.");
  const bothApproved = !!p.ldvApprovedById;
  return ok(nextStatusAfter(bothApproved), "Trưởng phòng phê duyệt", null, { tpApprovedById: u.id, tpApprovedAt: new Date() });
}

export function txLdvApprove(p: PlanForRules, u: M17ActorUser): TxResult {
  if (p.status !== "PENDING_APPROVAL") return err("BAD_STATE", "Chương trình không ở bước Chờ duyệt.");
  if (u.m17Role !== "LDV") return err("FORBIDDEN", "Chỉ Lãnh đạo Viện được duyệt (đồng phê duyệt cùng TP).");
  if (p.ldvApprovedById) return err("ALREADY_APPROVED", "LĐV đã duyệt chương trình này rồi.");
  const bothApproved = !!p.tpApprovedById;
  return ok(nextStatusAfter(bothApproved), "LĐV phê duyệt", null, { ldvApprovedById: u.id, ldvApprovedAt: new Date() });
}

export function txRejectPlan(u: M17ActorUser, reason?: string): TxResult {
  if (u.m17Role !== "TP" && u.m17Role !== "LDV") return err("FORBIDDEN", "Chỉ TP hoặc LĐV được từ chối chương trình.");
  if (!reason) return err("REASON_REQUIRED", "Từ chối bắt buộc nhập lý do.");
  return ok("DRAFT", "Từ chối chương trình", reason, { tpApprovedById: null, tpApprovedAt: null, ldvApprovedById: null, ldvApprovedAt: null });
}

// ---------- ReviewMinutes — gate đủ 12 nội dung ----------

export interface TopicResult {
  topicId: number;
  assessmentResult: string;
}

export function validateTopicResults(topicResults: TopicResult[]): string | null {
  if (topicResults.length !== 12) return `Bắt buộc đủ 12 nội dung theo ISO/IEC 17025 §8.9 — hiện có ${topicResults.length}/12 (quy tắc 4 ETV.P17).`;
  const ids = new Set(topicResults.map((t) => t.topicId));
  if (ids.size !== 12) return "Trùng lặp nội dung — mỗi nội dung (1-12) chỉ được xuất hiện đúng 1 lần.";
  for (let i = 1; i <= 12; i++) {
    if (!ids.has(i)) return `Thiếu nội dung số ${i} trong 12 nội dung bắt buộc.`;
  }
  const empty = topicResults.find((t) => !t.assessmentResult || !t.assessmentResult.trim());
  if (empty) return `Nội dung số ${empty.topicId} chưa có kết quả đánh giá.`;
  return null;
}

export const canRecordConclusion = (u: M17ActorUser) => u.m17Role === "LDV";
