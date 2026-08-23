// M03 — state machine thuần hàm, AUTHORITATIVE. Port từ ETV.P03_NhanSu.md (Đã phê duyệt, lần 03)
// mục quy tắc 1–8 — xem 01_Requirement/_work/20260823-xay-moi-m03/spec.md để đối chiếu "Quyết
// định phạm vi" (không có 08_Source nguyên mẫu, giống M01).
import type {
  M03ContractStatus,
  M03ContractType,
  M03RecruitmentStatus,
  M03TrainingResult,
  M03TrainingStatus,
} from "@/generated/prisma/enums";

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

export interface M03ActorUser {
  id: string;
  m03Role: string | null; // LDV / TP / QLCL / QLKT / VANPHONG / NGUOIHUONGDAN
}

// ---------- RecruitmentPlan ----------

export interface RecruitmentForRules {
  status: M03RecruitmentStatus;
  position: string;
  requirement: string;
  createdById: string;
}

export const canApproveRecruitment = (u: M03ActorUser) => u.m03Role === "LDV";
export const canFulfillRecruitment = (u: M03ActorUser) => u.m03Role === "VANPHONG" || u.m03Role === "TP";

export function txSubmitRecruitment(r: RecruitmentForRules): TxResult {
  if (r.status !== "DRAFT") return err("NOT_DRAFT", "Chỉ đề xuất Đang soạn mới gửi duyệt được.");
  if (!r.requirement) return err("MISSING_REQUIRED", "Thiếu yêu cầu tuyển dụng (requirement).");
  return ok("PENDING_APPROVAL", "Gửi duyệt");
}

export function txApproveRecruitment(
  r: RecruitmentForRules,
  u: M03ActorUser,
  { decision, reason }: { decision?: "reject" | "approve"; reason?: string } = {}
): TxResult {
  if (r.status !== "PENDING_APPROVAL") return err("BAD_STATE", "Đề xuất không ở bước Chờ duyệt.");
  if (!canApproveRecruitment(u)) return err("FORBIDDEN", "Chỉ LĐV được phê duyệt đề xuất tuyển dụng.");
  if (decision === "reject") {
    if (!reason) return err("REASON_REQUIRED", "Từ chối bắt buộc nhập lý do.");
    return ok("REJECTED", "Từ chối đề xuất", reason, { approvedById: null });
  }
  return ok("APPROVED", "Phê duyệt đề xuất tuyển dụng", null, { approvedById: u.id });
}

export function txFulfillRecruitment(r: RecruitmentForRules, u: M03ActorUser): TxResult {
  if (r.status !== "APPROVED") return err("BAD_STATE", "Chỉ đề xuất Đã duyệt mới đánh dấu Đã tuyển được.");
  if (!canFulfillRecruitment(u)) return err("FORBIDDEN", "Chỉ Văn phòng/TP được đánh dấu Đã tuyển.");
  return ok("FULFILLED", "Đã tuyển — tạo hồ sơ nhân sự");
}

// ---------- TrainingRecord — gate 6 điều kiện (quy tắc 3 DacTa.md) ----------

export interface TrainingForRules {
  status: M03TrainingStatus;
  c1AttendedAllContent: boolean;
  c2FollowedRules: boolean;
  c3CanPerformWork: boolean;
  c4RecordsComplete: boolean;
  c5AssessmentPassed: boolean;
  c6EvidenceSufficient: boolean;
  evidence: string | null;
}

export const canApproveTraining = (u: M03ActorUser) => u.m03Role === "LDV";

export function allConditionsMet(t: TrainingForRules): boolean {
  return (
    t.c1AttendedAllContent &&
    t.c2FollowedRules &&
    t.c3CanPerformWork &&
    t.c4RecordsComplete &&
    t.c5AssessmentPassed &&
    t.c6EvidenceSufficient
  );
}

export function txSubmitTraining(t: TrainingForRules): TxResult {
  if (t.status !== "DRAFT" && t.status !== "NEEDS_SUPPLEMENT") {
    return err("NOT_DRAFT", "Chỉ hồ sơ Đang soạn/Cần bổ sung mới gửi duyệt được.");
  }
  if (!t.evidence) return err("EVIDENCE_REQUIRED", "Bắt buộc có bằng chứng trước khi gửi duyệt.");
  return ok("PENDING_APPROVAL", "Gửi duyệt kết quả đào tạo");
}

export function txApproveTraining(
  t: TrainingForRules,
  u: M03ActorUser,
  { decision, reason }: { decision?: "reject" | "approve"; reason?: string } = {}
): TxResult {
  if (t.status !== "PENDING_APPROVAL") return err("BAD_STATE", "Hồ sơ không ở bước Chờ duyệt.");
  if (!canApproveTraining(u)) return err("FORBIDDEN", "Chỉ LĐV được phê duyệt kết quả đào tạo.");
  if (decision === "reject") {
    if (!reason) return err("REASON_REQUIRED", "Yêu cầu bổ sung bắt buộc nhập lý do.");
    return ok("NEEDS_SUPPLEMENT", "Yêu cầu đào tạo bổ sung", reason, { result: "BO_SUNG" });
  }
  // Gate cứng ở server — không cho approve nếu thiếu bất kỳ 1/6 điều kiện, kể cả khi decision=approve.
  if (!allConditionsMet(t)) {
    return err(
      "CONDITIONS_NOT_MET",
      "Thiếu ít nhất 1/6 điều kiện hoàn thành đào tạo (quy tắc 3 ETV.P03) — không thể phê duyệt Đạt."
    );
  }
  return ok("APPROVED", "Phê duyệt — hoàn thành đào tạo (đủ 6/6 điều kiện)", null, {
    approvedById: u.id,
    result: "DAT",
  });
}

// ---------- LaborContract / ServiceContract (dùng chung logic qua tham số) ----------

export interface ContractForRules {
  status: M03ContractStatus;
  expiryDate: Date | null;
}

export const canSignContract = (u: M03ActorUser) => u.m03Role === "LDV";

export function txSignContract(
  c: ContractForRules,
  u: M03ActorUser,
  { effectiveDate }: { effectiveDate?: Date } = {}
): TxResult {
  if (c.status !== "DRAFT" && c.status !== "PENDING_SIGN") {
    return err("NOT_DRAFT", "Chỉ hợp đồng Đang soạn/Chờ ký mới ký được.");
  }
  if (!canSignContract(u)) return err("FORBIDDEN", "Chỉ LĐV được ký hợp đồng.");
  if (!effectiveDate) return err("EFFECTIVE_DATE_REQUIRED", "Bắt buộc chọn ngày hiệu lực.");
  return ok("ACTIVE", "Ký hợp đồng", null, { signedById: u.id, effectiveDate });
}

export function txRenewContract(
  c: ContractForRules,
  u: M03ActorUser,
  { newExpiryDate, previousSnapshot }: { newExpiryDate?: Date; previousSnapshot?: Record<string, unknown> } = {}
): TxResult {
  if (c.status !== "ACTIVE") return err("BAD_STATE", "Chỉ hợp đồng Đang hiệu lực mới gia hạn được.");
  if (!canSignContract(u)) return err("FORBIDDEN", "Chỉ LĐV được gia hạn hợp đồng.");
  if (!newExpiryDate) return err("EXPIRY_DATE_REQUIRED", "Bắt buộc chọn hạn mới.");
  return ok("ACTIVE", "Gia hạn hợp đồng", null, {
    expiryDate: newExpiryDate,
    _appendSnapshot: previousSnapshot ?? null,
  });
}

export function txTerminateContract(c: ContractForRules, u: M03ActorUser, { reason }: { reason?: string } = {}): TxResult {
  if (c.status !== "ACTIVE") return err("BAD_STATE", "Chỉ hợp đồng Đang hiệu lực mới chấm dứt được.");
  if (!canSignContract(u)) return err("FORBIDDEN", "Chỉ LĐV được chấm dứt hợp đồng.");
  if (!reason) return err("REASON_REQUIRED", "Chấm dứt hợp đồng bắt buộc nhập lý do.");
  return ok("TERMINATED", "Chấm dứt hợp đồng", reason);
}

export function isContractType(t: unknown): t is M03ContractType {
  return typeof t === "string" && ["THOIVU", "KHONGTHOIHAN", "THUVIEC", "THUCTAP"].includes(t);
}

// ---------- ContractTermination — bắt buộc thu hồi bảo mật trước khi hoàn tất ----------

export function validateTermination({
  reason,
  securityRevoked,
}: {
  reason: string;
  securityRevoked: boolean;
}): string[] {
  const miss: string[] = [];
  if (!reason) miss.push("lý do chấm dứt");
  if (!securityRevoked) miss.push("thu hồi quyền truy cập bảo mật (phối hợp M02)");
  return miss;
}

export type { M03TrainingResult };
