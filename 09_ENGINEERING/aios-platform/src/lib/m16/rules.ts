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

// ===================================================================================
// Increment 13 — hoàn thiện theo DacTa: quy tắc 1 (năng lực), 2 (mốc 2 tuần), 3 (ý kiến
// bảo lưu), 6 (KPH → M13), 7 (LĐP thẩm tra, đóng chương trình / đánh giá bổ sung).
// Xem 01_Requirement/_work/20260823-hoan-thien-m16/spec.md.
// ===================================================================================

// ---------- Quy tắc 1: năng lực đánh giá viên ----------

export type M16QualTypeLite = "ISO_17025" | "DANH_GIA_NOI_BO" | "KINH_NGHIEM_TRUONG_DOAN";

// Điều kiện của DacTa quy tắc 1: đánh giá viên phải đã đào tạo ISO/IEC 17025 + đã đào tạo đánh
// giá nội bộ; trưởng đoàn phải thêm kinh nghiệm đánh giá nội bộ.
export const REQUIRED_MEMBER_QUALS: M16QualTypeLite[] = ["ISO_17025", "DANH_GIA_NOI_BO"];
export const REQUIRED_LEAD_QUALS: M16QualTypeLite[] = ["ISO_17025", "DANH_GIA_NOI_BO", "KINH_NGHIEM_TRUONG_DOAN"];

export const QUAL_SHORT_LABEL: Record<M16QualTypeLite, string> = {
  ISO_17025: "đào tạo ISO/IEC 17025",
  DANH_GIA_NOI_BO: "đào tạo đánh giá nội bộ",
  KINH_NGHIEM_TRUONG_DOAN: "kinh nghiệm đánh giá nội bộ (trưởng đoàn)",
};

// Bằng chứng năng lực = hồ sơ đào tạo thật của M03, không phải cờ tự khai.
export interface TrainingEvidenceForRules {
  employeeId: string;
  result: string | null; // M03TrainingResult — chỉ chấp nhận "DAT"
  status: string; // M03TrainingStatus — chỉ chấp nhận "APPROVED"
}

export function txRecognizeQualification(
  u: M16ActorUser,
  {
    employeeId,
    qualType,
    evidence,
    note,
  }: { employeeId: string; qualType: M16QualTypeLite; evidence: TrainingEvidenceForRules | null; note?: string }
): TxResult {
  if (u.m16Role !== "QLCL") return err("FORBIDDEN", "Chỉ QLCL được công nhận năng lực đánh giá viên (quy tắc 1 ETV.P16).");

  if (qualType === "KINH_NGHIEM_TRUONG_DOAN") {
    if (!note) {
      return err(
        "NOTE_REQUIRED",
        "Kinh nghiệm đánh giá nội bộ không có hồ sơ đào tạo tương ứng trong M03 — bắt buộc ghi rõ căn cứ công nhận."
      );
    }
    return ok("RECOGNIZED", `Công nhận năng lực: ${QUAL_SHORT_LABEL[qualType]}`, note, {});
  }

  if (!evidence) {
    return err("EVIDENCE_REQUIRED", `Bắt buộc chọn hồ sơ đào tạo (M03) làm bằng chứng cho ${QUAL_SHORT_LABEL[qualType]}.`);
  }
  if (evidence.employeeId !== employeeId) {
    return err("EVIDENCE_MISMATCH", "Hồ sơ đào tạo được chọn không thuộc nhân sự này.");
  }
  if (evidence.result !== "DAT" || evidence.status !== "APPROVED") {
    return err(
      "EVIDENCE_NOT_PASSED",
      "Hồ sơ đào tạo chưa được phê duyệt Đạt (M03) — không đủ căn cứ công nhận năng lực đánh giá viên (quy tắc 1 ETV.P16)."
    );
  }
  return ok("RECOGNIZED", `Công nhận năng lực: ${QUAL_SHORT_LABEL[qualType]}`, note ?? null, {});
}

export interface ProgramMemberForRules {
  employeeId: string;
  fullName: string;
  isLead: boolean;
  quals: string[]; // các M16QualType đã được công nhận
}

// Trả về danh sách lý do thiếu năng lực (rỗng = đủ điều kiện).
export function missingQualifications(members: ProgramMemberForRules[]): string[] {
  const problems: string[] = [];
  for (const m of members) {
    const required = m.isLead ? REQUIRED_LEAD_QUALS : REQUIRED_MEMBER_QUALS;
    const missing = required.filter((q) => !m.quals.includes(q));
    if (missing.length > 0) {
      problems.push(`${m.fullName}${m.isLead ? " (trưởng đoàn)" : ""} thiếu: ${missing.map((q) => QUAL_SHORT_LABEL[q]).join(", ")}`);
    }
  }
  return problems;
}

// ---------- Quy tắc 2: mốc nhắc 2 tuần — CẢNH BÁO MỀM, không chặn ----------

export function programPreparationWarning(auditDate: Date, now: Date = new Date()): string | null {
  const days = daysUntil(auditDate, now);
  if (days >= 7 && days < 14) {
    return `Ngày đánh giá còn ${days} ngày — nhắc đoàn đánh giá chuẩn bị (quy tắc 2 ETV.P16 khuyến nghị ít nhất 2 tuần).`;
  }
  return null;
}

// ---------- Xác nhận chương trình: gate thời hạn (cũ) + gate năng lực (mới) ----------

export interface ProgramForConfirm {
  status: string;
  auditDate: Date;
  hasLeadEmployee: boolean;
  members: ProgramMemberForRules[];
}

export function txConfirmProgram(p: ProgramForConfirm, u: M16ActorUser, now: Date = new Date()): TxResult {
  if (p.status !== "DRAFT") return err("BAD_STATE", "Chỉ chương trình Đang soạn mới xác nhận được.");
  if (u.m16Role !== "QLCL" && u.m16Role !== "LDP") {
    return err("FORBIDDEN", "Chỉ QLCL hoặc LĐP được xác nhận chương trình đánh giá.");
  }

  const noticeBlock = canConfirmProgram(p.auditDate, now);
  if (noticeBlock) return err("NOTICE_TOO_SHORT", noticeBlock);

  if (!p.hasLeadEmployee) {
    return err(
      "LEAD_NOT_ASSIGNED",
      "Chưa gán trưởng đoàn là nhân sự thật (M03) — không kiểm tra được năng lực theo quy tắc 1 ETV.P16."
    );
  }
  const problems = missingQualifications(p.members);
  if (problems.length > 0) {
    return err(
      "QUALIFICATION_MISSING",
      `Đoàn đánh giá chưa đủ năng lực theo quy tắc 1 ETV.P16 — ${problems.join("; ")}. Công nhận năng lực tại Sổ năng lực đánh giá viên trước khi xác nhận.`
    );
  }
  return ok("CONFIRMED", "Xác nhận chương trình đánh giá", null, { confirmedAt: now });
}

// ---------- Quy tắc 6: Trưởng bộ phận nhận kết quả → đề xuất CAPA qua M13 ----------

export interface FindingForRules {
  conformity: string;
  acknowledgedById: string | null;
  ncwId: string | null;
}

export function txAcknowledgeFinding(f: FindingForRules, u: M16ActorUser): TxResult {
  if (u.m16Role !== "TRUONGBOPHAN") {
    return err("FORBIDDEN", "Chỉ Trưởng bộ phận được đánh giá xác nhận đã nhận kết quả và thông báo tới nhân viên.");
  }
  if (f.conformity !== "KHONG_PHU_HOP") return err("NOT_NONCONFORMITY", "Chỉ phát hiện Không phù hợp mới cần xác nhận nhận kết quả.");
  if (f.acknowledgedById) return err("ALREADY_ACKNOWLEDGED", "Phát hiện này đã được xác nhận nhận kết quả.");
  return ok("ACKNOWLEDGED", "Trưởng bộ phận xác nhận đã nhận kết quả, đã thông báo tới nhân viên", null, {});
}

export function txProposeCorrectiveAction(f: FindingForRules, u: M16ActorUser, { rootCause }: { rootCause: string }): TxResult {
  if (u.m16Role !== "TRUONGBOPHAN") {
    return err("FORBIDDEN", "Chỉ Trưởng bộ phận được đánh giá đề xuất hành động khắc phục (DacTa mục 3 ETV.P16).");
  }
  if (f.conformity !== "KHONG_PHU_HOP") {
    return err("NOT_NONCONFORMITY", "Chỉ phát hiện Không phù hợp mới phải đề xuất hành động khắc phục (quy tắc 6 ETV.P16).");
  }
  if (!f.acknowledgedById) {
    return err(
      "NOT_ACKNOWLEDGED",
      "Phải xác nhận đã nhận kết quả và thông báo tới nhân viên trước khi phân tích nguyên nhân và đề xuất khắc phục."
    );
  }
  if (f.ncwId) return err("NCW_EXISTS", "Phát hiện này đã có hồ sơ công việc không phù hợp bên M13.");
  if (!rootCause) return err("ROOT_CAUSE_REQUIRED", "Bắt buộc nêu phân tích nguyên nhân trước khi chuyển sang M13.");
  return ok("PROPOSED", "Đề xuất hành động khắc phục — mở hồ sơ KPH bên M13", rootCause, {});
}

// ---------- Quy tắc 3: ý kiến bảo lưu (không phải biểu quyết) ----------

export const canRecordDissent = (u: M16ActorUser) => u.m16Role === "DANHGIAVIEN" || u.m16Role === "TRUONGDOAN";

export function txRecordDissent(u: M16ActorUser, { opinionBy, opinion }: { opinionBy: string; opinion: string }): TxResult {
  if (!canRecordDissent(u)) {
    return err("FORBIDDEN", "Chỉ thành viên đoàn đánh giá (Đánh giá viên/Trưởng đoàn) được ghi ý kiến bảo lưu.");
  }
  if (!opinionBy) return err("NAME_REQUIRED", "Bắt buộc ghi tên người nêu ý kiến bảo lưu.");
  if (!opinion) return err("OPINION_REQUIRED", "Bắt buộc ghi nội dung ý kiến bảo lưu.");
  // Kết luận trưởng đoàn KHÔNG thay đổi — ý kiến chỉ được lưu kèm (quy tắc 3 ETV.P16).
  return ok("RECORDED", `Ghi ý kiến bảo lưu của ${opinionBy}`, null, {});
}

// ---------- Quy tắc 7: LĐP thẩm tra → đóng chương trình / đề xuất đánh giá bổ sung ----------

export interface FindingClosureView {
  code: string;
  conformity: string;
  ncwStatus: string | null; // M13NcwStatus của hồ sơ liên kết, null = chưa chuyển M13
}

export interface ProgramForClosure {
  status: string;
  reportCount: number;
  findings: FindingClosureView[];
}

export function txCloseProgram(p: ProgramForClosure, u: M16ActorUser, { note }: { note?: string } = {}): TxResult {
  if (u.m16Role !== "LDP") {
    return err("FORBIDDEN", "Chỉ LĐP được đóng chương trình đánh giá sau khi thẩm tra hành động khắc phục (quy tắc 7 ETV.P16).");
  }
  if (p.status !== "CONFIRMED") return err("BAD_STATE", "Chỉ chương trình Đã xác nhận mới đóng được.");
  if (p.reportCount === 0) return err("NO_REPORT", "Chưa có báo cáo tổng hợp — không đóng chương trình đánh giá được.");

  const nonconformities = p.findings.filter((f) => f.conformity === "KHONG_PHU_HOP");
  const notLinked = nonconformities.filter((f) => !f.ncwStatus);
  if (notLinked.length > 0) {
    return err(
      "CAPA_NOT_LINKED",
      `Phát hiện Không phù hợp chưa chuyển sang M13: ${notLinked.map((f) => f.code).join(", ")} — quy tắc 6 ETV.P16 bắt buộc mọi KPH phải dẫn tới hành động khắc phục.`
    );
  }
  const notResolved = nonconformities.filter((f) => f.ncwStatus !== "DA_KHAC_PHUC");
  if (notResolved.length > 0) {
    return err(
      "CAPA_NOT_RESOLVED",
      `Hồ sơ khắc phục bên M13 chưa hoàn tất cho: ${notResolved.map((f) => f.code).join(", ")} — LĐP chỉ đóng chương trình khi đã thẩm tra kết quả thực hiện (quy tắc 7 ETV.P16).`
    );
  }
  return ok("CLOSED", "LĐP thẩm tra đạt — đóng chương trình đánh giá", note ?? null, {});
}

export const canProposeFollowUp = (u: M16ActorUser) => u.m16Role === "LDP" || u.m16Role === "QLCL";

export function txProposeFollowUpAudit(u: M16ActorUser, { reason }: { reason: string }): TxResult {
  if (!canProposeFollowUp(u)) {
    return err("FORBIDDEN", "Chỉ LĐP hoặc QLCL được đề xuất đánh giá bổ sung (quy tắc 7 ETV.P16).");
  }
  if (!reason) return err("REASON_REQUIRED", "Bắt buộc nêu lý do chưa đủ tin cậy để đề xuất đánh giá bổ sung.");
  return ok("DRAFT", "Đề xuất đánh giá bổ sung — tạo kế hoạch đột xuất", reason, {});
}
