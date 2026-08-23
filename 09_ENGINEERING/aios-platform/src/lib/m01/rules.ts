// M01 — state machine thuần hàm, AUTHORITATIVE. Port từ ETV.P01_RuiRoCoHoi.md (Đã phê duyệt,
// lần 03) mục 6.1/V/Phụ lục A — xem 01_Requirement/_work/20260823-xay-moi-m01/spec.md để đối
// chiếu "Quyết định phạm vi" #1-#4 (không có 08_Source nguyên mẫu để port 1:1 như M10/M21/M29).
import type { M01RiskLevel, M01Status, M01VerifyResult } from "@/generated/prisma/enums";

export function calcRiskScore(severity: number, possibility: number): number {
  return severity * possibility;
}

export function deriveRiskLevel(riskScore: number): M01RiskLevel {
  if (riskScore >= 16) return "RATCAO";
  if (riskScore >= 9) return "CAO";
  if (riskScore >= 4) return "TRUNGBINH";
  return "THAP";
}

export interface RiskForRules {
  status: M01Status;
  severity: number | null;
  possibility: number | null;
  riskLevel: M01RiskLevel | null;
  cause: string | null;
  controlMeasure: string | null;
  evidence: string | null;
  createdById: string;
  assigneeId: string | null;
  verifiedById: string | null;
}

export interface OppForRules {
  status: M01Status;
  proposedAction: string | null;
  evidence: string | null;
  createdById: string;
  assigneeId: string | null;
  verifiedById: string | null;
}

export interface M01ActorUser {
  id: string;
  m01Role: string | null; // NV / TP_QLCL / LDV
}

export type TxResult =
  | { ok: true; status: M01Status; action: string; reason: string | null; patch: Record<string, unknown> }
  | { ok: false; code: string; message: string };

const ok = (status: M01Status, action: string, reason: string | null = null, patch: Record<string, unknown> = {}): TxResult => ({
  ok: true,
  status,
  action,
  reason,
  patch,
});
const err = (code: string, message: string): TxResult => ({ ok: false, code, message });

// ---------- Rủi ro ----------

export function validateRiskForSubmit(r: RiskForRules): string[] {
  const miss: string[] = [];
  if (!r.cause) miss.push("nguyên nhân (cause)");
  if (!r.controlMeasure) miss.push("biện pháp kiểm soát (control_measure)");
  if (r.severity == null) miss.push("mức độ hậu quả (S)");
  if (r.possibility == null) miss.push("khả năng xảy ra (P)");
  return miss;
}

export const canReviewRisk = (r: RiskForRules, u: M01ActorUser) =>
  u.m01Role === "TP_QLCL" && r.createdById !== u.id;

export const canLeaderDecide = (u: M01ActorUser) => u.m01Role === "LDV";

export const canSubmitEvidence = (r: RiskForRules, u: M01ActorUser) => r.assigneeId === u.id;

export const canVerify = (r: RiskForRules, u: M01ActorUser) =>
  u.m01Role === "TP_QLCL" && r.assigneeId !== u.id;

export function txSubmitRisk(r: RiskForRules): TxResult {
  if (r.status !== "DRAFT") return err("NOT_DRAFT", "Chỉ hồ sơ Đang soạn mới gửi soát xét được.");
  const miss = validateRiskForSubmit(r);
  if (miss.length) return err("MISSING_REQUIRED", "Thiếu: " + miss.join(", "));
  return ok("PENDING_REVIEW", "Gửi soát xét");
}

export function txReviewRisk(
  r: RiskForRules,
  u: M01ActorUser,
  { decision, reason, assigneeId, dueDate }: { decision?: "return" | "approve"; reason?: string; assigneeId?: string; dueDate?: Date } = {}
): TxResult {
  if (r.status !== "PENDING_REVIEW") return err("BAD_STATE", "Hồ sơ không ở bước Đang soát xét.");
  if (!canReviewRisk(r, u)) return err("FORBIDDEN", "Chỉ TP/QLCL (không phải người tạo) được soát xét.");
  if (decision === "return") {
    if (!reason) return err("REASON_REQUIRED", "Trả lại bắt buộc nhập lý do.");
    return ok("DRAFT", "Trả lại khi soát xét", reason, { reviewedById: u.id });
  }
  if (r.riskLevel === "RATCAO") {
    return ok("PENDING_LEADER_APPROVAL", "Soát xét đạt — mức Rất cao, chuyển LĐV quyết định", null, { reviewedById: u.id });
  }
  if (!assigneeId || !dueDate) return err("ASSIGNEE_REQUIRED", "Phê duyệt bắt buộc chọn người phụ trách + thời hạn.");
  return ok(
    "IN_PROGRESS",
    "Soát xét đạt → Đã phê duyệt → Đang xử lý",
    null,
    { reviewedById: u.id, approvedById: u.id, assigneeId, dueDate }
  );
}

export function txLeaderDecideRisk(
  r: RiskForRules,
  u: M01ActorUser,
  { decision, reason, assigneeId, dueDate }: { decision?: "reject" | "approve"; reason?: string; assigneeId?: string; dueDate?: Date } = {}
): TxResult {
  if (r.status !== "PENDING_LEADER_APPROVAL") return err("BAD_STATE", "Hồ sơ không ở bước Chờ LĐV quyết định.");
  if (!canLeaderDecide(u)) return err("FORBIDDEN", "Chỉ LĐV được quyết định ở mức Rủi ro Rất cao.");
  if (decision === "reject") {
    if (!reason) return err("REASON_REQUIRED", "Không phê duyệt bắt buộc nhập lý do.");
    return ok("DRAFT", "LĐV không phê duyệt", reason, { approvedById: null });
  }
  if (!assigneeId || !dueDate) return err("ASSIGNEE_REQUIRED", "Phê duyệt bắt buộc chọn người phụ trách + thời hạn.");
  return ok("IN_PROGRESS", "LĐV phê duyệt (mức Rất cao) → Đang xử lý", null, { approvedById: u.id, assigneeId, dueDate });
}

export function txSubmitEvidenceRisk(r: RiskForRules, u: M01ActorUser, { evidence }: { evidence: string }): TxResult {
  if (r.status !== "IN_PROGRESS") return err("BAD_STATE", "Chỉ hồ sơ Đang xử lý mới nộp bằng chứng được.");
  if (!canSubmitEvidence(r, u)) return err("FORBIDDEN", "Chỉ người phụ trách (assignee) được nộp bằng chứng.");
  if (!evidence) return err("EVIDENCE_REQUIRED", "Bắt buộc nhập bằng chứng thực hiện.");
  return ok("IN_PROGRESS", "Nộp bằng chứng thực hiện", null, { evidence });
}

export function txVerifyRisk(
  r: RiskForRules,
  u: M01ActorUser,
  { result, reason }: { result: M01VerifyResult; reason?: string }
): TxResult {
  if (r.status !== "IN_PROGRESS") return err("BAD_STATE", "Hồ sơ không ở bước Đang xử lý.");
  if (!r.evidence) return err("NO_EVIDENCE", "Chưa có bằng chứng thực hiện để thẩm xét.");
  if (!canVerify(r, u)) return err("FORBIDDEN", "Chỉ TP/QLCL (khác người thực hiện) được thẩm xét.");
  if (result === "CHUA_DAT") {
    if (!reason) return err("REASON_REQUIRED", "Chưa đạt bắt buộc nhập lý do yêu cầu bổ sung.");
    return ok("IN_PROGRESS", "Thẩm xét: Chưa đạt — yêu cầu bổ sung", reason, {
      verifiedById: u.id,
      verifyResult: "CHUA_DAT",
    });
  }
  return ok("DONE", "Thẩm xét: Đạt → Hoàn thành", null, { verifiedById: u.id, verifyResult: "DAT" });
}

// ---------- Cơ hội (state machine rút gọn — không có nhánh LĐV) ----------

export function validateOppForSubmit(o: OppForRules): string[] {
  const miss: string[] = [];
  if (!o.proposedAction) miss.push("biện pháp đề xuất (proposed_action)");
  return miss;
}

export const canReviewOpp = (o: OppForRules, u: M01ActorUser) =>
  u.m01Role === "TP_QLCL" && o.createdById !== u.id;

export const canSubmitEvidenceOpp = (o: OppForRules, u: M01ActorUser) => o.assigneeId === u.id;

export const canVerifyOpp = (o: OppForRules, u: M01ActorUser) =>
  u.m01Role === "TP_QLCL" && o.assigneeId !== u.id;

export function txSubmitOpp(o: OppForRules): TxResult {
  if (o.status !== "DRAFT") return err("NOT_DRAFT", "Chỉ hồ sơ Đang soạn mới gửi soát xét được.");
  const miss = validateOppForSubmit(o);
  if (miss.length) return err("MISSING_REQUIRED", "Thiếu: " + miss.join(", "));
  return ok("PENDING_REVIEW", "Gửi soát xét");
}

export function txReviewOpp(
  o: OppForRules,
  u: M01ActorUser,
  { decision, reason, assigneeId, dueDate }: { decision?: "return" | "approve"; reason?: string; assigneeId?: string; dueDate?: Date } = {}
): TxResult {
  if (o.status !== "PENDING_REVIEW") return err("BAD_STATE", "Hồ sơ không ở bước Đang soát xét.");
  if (!canReviewOpp(o, u)) return err("FORBIDDEN", "Chỉ TP/QLCL (không phải người tạo) được soát xét.");
  if (decision === "return") {
    if (!reason) return err("REASON_REQUIRED", "Trả lại bắt buộc nhập lý do.");
    return ok("DRAFT", "Trả lại khi soát xét", reason, { reviewedById: u.id });
  }
  if (!assigneeId || !dueDate) return err("ASSIGNEE_REQUIRED", "Phê duyệt bắt buộc chọn người phụ trách + thời hạn.");
  return ok("IN_PROGRESS", "Soát xét đạt → Đã phê duyệt → Đang xử lý", null, { reviewedById: u.id, approvedById: u.id, assigneeId, dueDate });
}

export function txSubmitEvidenceOpp(o: OppForRules, u: M01ActorUser, { evidence }: { evidence: string }): TxResult {
  if (o.status !== "IN_PROGRESS") return err("BAD_STATE", "Chỉ hồ sơ Đang xử lý mới nộp bằng chứng được.");
  if (!canSubmitEvidenceOpp(o, u)) return err("FORBIDDEN", "Chỉ người phụ trách (assignee) được nộp bằng chứng.");
  if (!evidence) return err("EVIDENCE_REQUIRED", "Bắt buộc nhập bằng chứng thực hiện.");
  return ok("IN_PROGRESS", "Nộp bằng chứng thực hiện", null, { evidence });
}

export function txVerifyOpp(
  o: OppForRules,
  u: M01ActorUser,
  { result, reason }: { result: M01VerifyResult; reason?: string }
): TxResult {
  if (o.status !== "IN_PROGRESS") return err("BAD_STATE", "Hồ sơ không ở bước Đang xử lý.");
  if (!o.evidence) return err("NO_EVIDENCE", "Chưa có bằng chứng thực hiện để thẩm xét.");
  if (!canVerifyOpp(o, u)) return err("FORBIDDEN", "Chỉ TP/QLCL (khác người thực hiện) được thẩm xét.");
  if (result === "CHUA_DAT") {
    if (!reason) return err("REASON_REQUIRED", "Chưa đạt bắt buộc nhập lý do yêu cầu bổ sung.");
    return ok("IN_PROGRESS", "Thẩm xét: Chưa đạt — yêu cầu bổ sung", reason, {
      verifiedById: u.id,
      verifyResult: "CHUA_DAT",
    });
  }
  return ok("DONE", "Thẩm xét: Đạt → Hoàn thành", null, { verifiedById: u.id, verifyResult: "DAT" });
}
