// M25 — gate/state machine thuần hàm, AUTHORITATIVE.
//
// NGUỒN QUY ĐỊNH: Thủ tục ETV.MP 25 — 03_MANAGEMENT_SYSTEM/02_P/ETV.P25_QuanLyBoiCanh.md (lần ban
// hành 01, 24/08/2026), soạn theo chính đặc tả này rồi ban hành. Diễn giải nghiệp vụ đầy đủ:
// 05_MODULE_LIBRARY/M25_BoiCanh/01_Requirement/DacTa.md mục 5.
// Chặn cứng theo ETV.P25: mục 5.2.3 (vấn đề mức tác động Cao phải liên kết MP01), mục 5.3.2 (mỗi
// bên quan tâm ≥1 mong đợi), mục 5.3.3 (nghĩa vụ tuân thủ phải dẫn chiếu văn bản cụ thể), mục
// 5.1.5 (kỳ đã phê duyệt bất biến). Sửa quy tắc phải sửa thủ tục trước theo MP14, rồi sửa file này.
import type { M25ReviewStatus } from "@/generated/prisma/enums";

export type TxResult =
  | { ok: true; status: string; action: string; reason: string | null; patch: Record<string, unknown> }
  | { ok: false; code: string; message: string };

const ok = (
  status: string,
  action: string,
  reason: string | null = null,
  patch: Record<string, unknown> = {},
): TxResult => ({ ok: true, status, action, reason, patch });
const err = (code: string, message: string): TxResult => ({ ok: false, code, message });

export interface M25ActorUser {
  id: string;
  m25Role: string | null; // QLCL / TP / LDV
}

export interface ReviewForRules {
  status: M25ReviewStatus;
  cycleType: "DINH_KY" | "DOT_XUAT";
  triggerReason: string | null;
  summary: string | null;
  createdById: string;
}

export interface IssueForRules {
  code: string;
  title: string;
  impactLevel: "THAP" | "TRUNG_BINH" | "CAO";
  status: "CON_HIEU_LUC" | "DA_DONG";
  riskLinkCount: number;
}

export interface PartyForRules {
  code: string;
  name: string;
  status: "CON_HIEU_LUC" | "DA_DONG";
  expectationCount: number;
}

// Kỳ chỉ sửa được khi chưa phê duyệt (quy tắc 8 — bất biến sau phê duyệt).
const EDITABLE: M25ReviewStatus[] = ["DRAFT", "REVIEW_REJECTED", "APPROVAL_REJECTED"];
export const canEditReview = (status: M25ReviewStatus) => EDITABLE.includes(status);

export function assertEditable(status: M25ReviewStatus): TxResult | null {
  if (canEditReview(status)) return null;
  return err("LOCKED", "Kỳ xem xét đã gửi soát xét/đã phê duyệt — không sửa được nội dung (quy tắc 8 DacTa M25).");
}

// ---------- Gửi soát xét ----------

export function txSubmitForReview(r: ReviewForRules, issues: IssueForRules[], parties: PartyForRules[]): TxResult {
  if (!canEditReview(r.status)) return err("BAD_STATE", "Chỉ kỳ Nháp/Không soát xét/Không phê duyệt mới gửi soát xét được.");
  if (!r.summary?.trim()) return err("SUMMARY_REQUIRED", "Bắt buộc tóm tắt biến động bối cảnh so với kỳ trước.");
  if (r.cycleType === "DOT_XUAT" && !r.triggerReason?.trim())
    return err("TRIGGER_REQUIRED", "Kỳ đột xuất bắt buộc ghi rõ sự kiện làm phát sinh (quy tắc 2 DacTa M25).");

  const active = issues.filter((i) => i.status === "CON_HIEU_LUC");
  if (active.length === 0) return err("NO_ISSUE", "Kỳ xem xét phải có ít nhất 1 vấn đề bối cảnh còn hiệu lực.");

  // Quy tắc 3 [SUY DẪN] — chặn cứng: không để vấn đề trọng yếu bị treo.
  const hanging = active.filter((i) => i.impactLevel === "CAO" && i.riskLinkCount === 0);
  if (hanging.length > 0)
    return err(
      "HIGH_IMPACT_UNLINKED",
      `Vấn đề mức tác động Cao phải liên kết ít nhất 1 rủi ro/cơ hội bên M01 (quy tắc 3 DacTa M25): ${hanging
        .map((i) => `${i.code} — ${i.title}`)
        .join("; ")}.`,
    );

  // Quy tắc 6 [SUY DẪN] — bên quan tâm không kèm mong đợi không chứng minh được ISO 9001 §4.2.
  const activeParties = parties.filter((p) => p.status === "CON_HIEU_LUC");
  if (activeParties.length === 0) return err("NO_PARTY", "Kỳ xem xét phải có ít nhất 1 bên quan tâm còn hiệu lực.");
  const empty = activeParties.filter((p) => p.expectationCount === 0);
  if (empty.length > 0)
    return err(
      "PARTY_WITHOUT_EXPECTATION",
      `Mỗi bên quan tâm phải có ít nhất 1 nhu cầu/mong đợi (quy tắc 6 DacTa M25): ${empty
        .map((p) => `${p.code} — ${p.name}`)
        .join("; ")}.`,
    );

  return ok("PENDING_REVIEW", "Gửi soát xét");
}

// ---------- Soát xét (TP) ----------

export function txReview(r: ReviewForRules, u: M25ActorUser, pass: boolean, reason?: string): TxResult {
  if (r.status !== "PENDING_REVIEW") return err("BAD_STATE", "Kỳ xem xét không ở bước Chờ soát xét.");
  if (u.m25Role !== "TP") return err("FORBIDDEN", "Chỉ Trưởng phòng được soát xét kỳ xem xét bối cảnh.");
  // Tách vai trò: người soát xét không được trùng người lập (quy tắc 7).
  if (u.id === r.createdById) return err("SELF_REVIEW", "Người lập không được tự soát xét kỳ của mình (quy tắc 7 DacTa M25).");
  if (pass) return ok("PENDING_APPROVAL", "Soát xét đạt", null, { reviewedById: u.id, reviewedAt: new Date() });
  if (!reason?.trim()) return err("REASON_REQUIRED", "Trả lại ở bước soát xét bắt buộc nhập lý do.");
  return ok("REVIEW_REJECTED", "Soát xét không đạt", reason, { reviewedById: u.id, reviewedAt: new Date() });
}

// ---------- Phê duyệt (LĐV) ----------

export function txApprove(r: ReviewForRules, u: M25ActorUser, pass: boolean, conclusion?: string, reason?: string): TxResult {
  if (r.status !== "PENDING_APPROVAL") return err("BAD_STATE", "Kỳ xem xét không ở bước Chờ phê duyệt.");
  if (u.m25Role !== "LDV") return err("FORBIDDEN", "Chỉ Lãnh đạo Viện được phê duyệt kỳ xem xét bối cảnh (quy tắc 7 DacTa M25).");
  if (u.id === r.createdById) return err("SELF_APPROVE", "Người lập không được tự phê duyệt kỳ của mình (quy tắc 7 DacTa M25).");
  if (pass) {
    if (!conclusion?.trim()) return err("CONCLUSION_REQUIRED", "Phê duyệt bắt buộc nhập kết luận của LĐV.");
    return ok("APPROVED", "LĐV phê duyệt", null, { approvedById: u.id, approvedAt: new Date(), conclusion });
  }
  if (!reason?.trim()) return err("REASON_REQUIRED", "Không phê duyệt bắt buộc nhập lý do.");
  return ok("APPROVAL_REJECTED", "LĐV không phê duyệt", reason, { approvedById: null, approvedAt: null });
}

// ---------- Hủy kỳ ----------

export function txCancel(r: ReviewForRules, u: M25ActorUser, reason?: string): TxResult {
  if (r.status === "APPROVED" || r.status === "SUPERSEDED")
    return err("LOCKED", "Kỳ đã phê duyệt là hồ sơ bất biến — không hủy được (quy tắc 8 DacTa M25).");
  if (r.status === "CANCELLED") return err("BAD_STATE", "Kỳ đã bị hủy.");
  if (u.m25Role !== "LDV") return err("FORBIDDEN", "Chỉ Lãnh đạo Viện được hủy kỳ xem xét.");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Hủy kỳ bắt buộc nhập lý do.");
  return ok("CANCELLED", "Hủy kỳ xem xét", reason);
}

// ---------- Kiểm tra dữ liệu con ----------

// Quy tắc 4 [SUY DẪN] — nghĩa vụ tuân thủ phải có căn cứ cụ thể, không chấp nhận "chung chung".
export function validateExpectation(input: { isComplianceObligation: boolean; obligationRef?: string | null; description: string; responseAction: string }): string | null {
  if (!input.description.trim()) return "Bắt buộc mô tả nhu cầu/mong đợi.";
  if (!input.responseAction.trim()) return "Bắt buộc mô tả cách Viện đáp ứng.";
  if (input.isComplianceObligation && !input.obligationRef?.trim())
    return "Mong đợi được chấp nhận thành nghĩa vụ tuân thủ phải dẫn chiếu văn bản pháp luật/tiêu chuẩn cụ thể (quy tắc 4 DacTa M25).";
  return null;
}

// Một liên kết chỉ trỏ tới đúng 1 đối tượng M01 (rủi ro HOẶC cơ hội).
export function validateRiskLink(input: { riskId?: string | null; opportunityId?: string | null }): string | null {
  const n = (input.riskId ? 1 : 0) + (input.opportunityId ? 1 : 0);
  if (n !== 1) return "Liên kết phải trỏ tới đúng 1 rủi ro hoặc 1 cơ hội bên M01.";
  return null;
}

// Quy tắc 10 — đóng một mục bắt buộc có lý do.
export function validateClose(reason?: string): string | null {
  if (!reason?.trim()) return "Đóng mục bắt buộc nhập lý do (quy tắc 10 DacTa M25).";
  return null;
}

// ---------- Đến hạn xem xét — TÍNH KHI ĐỌC, không lưu cột trạng thái ----------

const FREQ_DAYS: Record<string, number | null> = {
  THANG: 30,
  QUY: 90,
  SAU_THANG: 180,
  NAM: 365,
  THEO_SU_KIEN: null, // không có chu kỳ cố định — không bao giờ tự báo quá hạn
};

export function isDueForMonitoring(freq: string, lastUpdatedAt: Date, now: Date = new Date()): boolean {
  const days = FREQ_DAYS[freq];
  if (days === null || days === undefined) return false;
  const elapsed = (now.getTime() - lastUpdatedAt.getTime()) / 86_400_000;
  return elapsed > days;
}

export function daysSince(lastUpdatedAt: Date, now: Date = new Date()): number {
  return Math.floor((now.getTime() - lastUpdatedAt.getTime()) / 86_400_000);
}
