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

// ---------- InspectorCard (K5) — hiệu lực thẻ kiểm định viên ----------
//
// ETV.P05 §6.2 và ETV.P11 §6.3: chỉ kiểm định viên "đã được chứng nhận, cấp thẻ" mới được sử dụng
// chuẩn đo lường và ký GCN kiểm định. Thẻ hết hạn vì vậy là điều kiện CHẶN, không phải thông tin
// tham khảo. Đối chiếu dữ liệu ManLab 31/08/2026: 11/27 thẻ đã hết hạn mà không có cảnh báo nào.

export type InspectorCardState = "VALID" | "EXPIRING_SOON" | "EXPIRED" | "NO_EXPIRY";

export interface InspectorCardForRules {
  cardNumber: string;
  issuedAt: Date | null;
  expiresAt: Date | null;
}

/**
 * Số ngày trước hạn thì bắt đầu cảnh báo.
 *
 * CHƯA CÓ CĂN CỨ TRONG THỦ TỤC: ETV.P05 §6.2 và ETV.P11 §6.3 quy định thẻ hết hạn thì không được
 * thực hiện, nhưng không quy định cảnh báo trước bao lâu. 90 là tham số đặt sẵn để có cảnh báo,
 * không phải quy định của Viện — chờ LĐP chốt con số thật.
 */
export const INSPECTOR_CARD_EXPIRING_SOON_DAYS = 90;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Thẻ hết hạn ĐÚNG vào ngày mốc thì tính là đã hết hạn — mốc là thời điểm hết hiệu lực, không
 * phải ngày cuối còn hiệu lực. Chọn chặt hơn vì đây là điều kiện chặn.
 */
export function inspectorCardState(
  card: Pick<InspectorCardForRules, "expiresAt">,
  now: Date = new Date(),
  expiringSoonDays: number = INSPECTOR_CARD_EXPIRING_SOON_DAYS
): InspectorCardState {
  if (!card.expiresAt) return "NO_EXPIRY";
  const remainingMs = card.expiresAt.getTime() - now.getTime();
  if (remainingMs <= 0) return "EXPIRED";
  if (remainingMs <= expiringSoonDays * DAY_MS) return "EXPIRING_SOON";
  return "VALID";
}

/** Thẻ hiện hành = thẻ có hạn xa nhất. Thẻ thiếu ngày hết hạn xếp sau, chỉ dùng khi không còn gì khác. */
export function currentInspectorCard<T extends Pick<InspectorCardForRules, "expiresAt">>(cards: T[]): T | null {
  if (cards.length === 0) return null;
  const withExpiry = cards.filter((c) => c.expiresAt);
  if (withExpiry.length === 0) return cards[0];
  return withExpiry.reduce((a, b) => (b.expiresAt!.getTime() > a.expiresAt!.getTime() ? b : a));
}

/**
 * Vấn đề dữ liệu của một thẻ. Bắt đúng ba lớp lỗi đã tìm thấy trong dữ liệu thật ngày 31/08/2026:
 * thiếu số thẻ, thiếu ngày hết hạn (1 bản ghi), và ngày cấp ≥ ngày hết hạn (5 bản ghi ghi cấp
 * 2031-03-31 / hết hạn 2026-03-31 — hai ngày bị nhập đảo).
 */
export function validateInspectorCard(card: InspectorCardForRules): string[] {
  const problems: string[] = [];
  if (!card.cardNumber.trim()) problems.push("thiếu số thẻ kiểm định viên");
  if (!card.expiresAt) problems.push("thiếu ngày hết hạn thẻ");
  if (card.issuedAt && card.expiresAt && card.issuedAt.getTime() >= card.expiresAt.getTime()) {
    problems.push("ngày cấp không được bằng hoặc sau ngày hết hạn (kiểm tra xem hai ngày có bị nhập đảo không)");
  }
  return problems;
}

/**
 * Số thẻ đang dùng cho nhiều nhân sự khác nhau. Ràng buộc @@unique của bảng chỉ chặn trùng trong
 * phạm vi MỘT nhân sự, nên trùng chéo phải phát hiện bằng hàm này — xem chú thích trong schema.
 */
export function duplicateCardNumbers(cards: { employeeId: string; cardNumber: string }[]): string[] {
  const owners = new Map<string, Set<string>>();
  for (const c of cards) {
    const set = owners.get(c.cardNumber) ?? new Set<string>();
    set.add(c.employeeId);
    owners.set(c.cardNumber, set);
  }
  return [...owners.entries()].filter(([, ids]) => ids.size > 1).map(([num]) => num);
}

/**
 * Điều kiện chặn của ETV.P05 §6.2 — có được thực hiện kiểm định và ký kết quả không.
 * Thẻ sắp hết hạn vẫn còn hiệu lực nên vẫn cho; chỉ EXPIRED và NO_EXPIRY là không.
 *
 * M03 chỉ CUNG CẤP vị ngữ này; việc chặn thật sự nằm ở M10/M11 khi hai module đó gọi tới.
 */
export function canPerformInspection(
  cards: Pick<InspectorCardForRules, "expiresAt">[],
  now: Date = new Date()
): boolean {
  const card = currentInspectorCard(cards);
  if (!card) return false;
  const state = inspectorCardState(card, now);
  return state === "VALID" || state === "EXPIRING_SOON";
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
