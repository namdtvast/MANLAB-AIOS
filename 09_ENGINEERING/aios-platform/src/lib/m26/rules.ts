// M26 — gate/state machine thuần hàm, AUTHORITATIVE.
//
// NGUỒN: Thủ tục ETV.P26 "Quản lý tri thức tổ chức" (ban hành lần 01, ngày 23/08/2026) —
// 03_MANAGEMENT_SYSTEM/02_P/ETV.P26_QuanLyTriThuc.md — và 05_MODULE_LIBRARY/M26_TriThuc/
// 01_Requirement/DacTa.md mục 5. Mọi quyết định nghiệp vụ gom vào file này để khi thủ tục
// được soát xét lại chỉ phải sửa một chỗ. Server action chỉ gọi rule rồi ghi DB.
import type {
  M26Confidentiality,
  M26Criticality,
  M26ItemStatus,
  M26KnowledgeForm,
  M26LessonStatus,
  M26NeedStatus,
  M26ReviewCycle,
  M26SharingForm,
  M26SharingStatus,
} from "@/generated/prisma/enums";

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

export interface M26ActorUser {
  id: string;
  m26Role: string | null; // QLCL / TP / LDV / QTHT / NV
}

// Tóm tắt chỉ để tìm kiếm — chặn thói quen dán toàn văn tài liệu/tiêu chuẩn vào module
// (quy tắc 1 DacTa M26 / ETV.P26 mục 1.3 và mục 7).
export const SUMMARY_MAX = 2000;

export interface ItemForRules {
  status: M26ItemStatus;
  knowledgeForm: M26KnowledgeForm;
  criticality: M26Criticality;
  confidentiality: M26Confidentiality;
  sourceRef: string | null;
  docId: string | null;
  summary: string;
  createdById: string;
  ownerId: string;
  holderCount: number;
  riskLinkCount: number;
  transferNeedCount: number; // số phiếu nhu cầu chuyển giao đang mở/đã đáp ứng cho mục này
  aiIndexed: boolean;
}

// ---------- Sửa nội dung ----------

const EDITABLE: M26ItemStatus[] = ["DRAFT", "REVIEW_REJECTED", "APPROVAL_REJECTED"];
export const canEditItem = (status: M26ItemStatus) => EDITABLE.includes(status);

export function assertEditable(status: M26ItemStatus): TxResult | null {
  if (canEditItem(status)) return null;
  return err(
    "LOCKED",
    "Mục tri thức đã gửi soát xét/đã phê duyệt là hồ sơ chỉ đọc — muốn thay đổi nội dung phải tạo phiên bản mới (ETV.P26 mục 5.1.8).",
  );
}

// ---------- Validate nội dung mục tri thức ----------

export interface ItemInput {
  title: string;
  knowledgeForm: M26KnowledgeForm;
  summary: string;
  sourceRef?: string | null;
  docId?: string | null;
  holderCount: number;
}

export function validateItemInput(input: ItemInput): string | null {
  if (!input.title.trim()) return "Bắt buộc nhập tên mục tri thức.";
  if (!input.summary.trim()) return "Bắt buộc nhập tóm tắt nội dung.";
  if (input.summary.length > SUMMARY_MAX)
    return `Tóm tắt vượt ${SUMMARY_MAX} ký tự. M26 là sổ đăng ký — ghi tóm tắt và đường dẫn, không chép toàn văn tài liệu (quy tắc 1 DacTa M26).`;

  // Quy tắc 1 + 2: tri thức hiện phải chỉ được ra nội dung thật nằm ở đâu.
  if (input.knowledgeForm === "TRI_THUC_HIEN" && !input.sourceRef?.trim() && !input.docId)
    return "Tri thức hiện bắt buộc có đường dẫn nội dung gốc hoặc mã tài liệu kiểm soát bên M14 (quy tắc 1–2 DacTa M26 / ETV.P26 mục 5.1.2).";

  // Quy tắc 3: tri thức ẩn phải biết ai đang giữ, nếu không thì không quản lý được.
  if (input.knowledgeForm === "TRI_THUC_AN" && input.holderCount < 1)
    return "Tri thức ẩn bắt buộc ghi ít nhất 1 người đang giữ tri thức (quy tắc 3 DacTa M26 / ETV.P26 mục 5.1.2).";

  return null;
}

// ---------- Gửi soát xét ----------

export function txSubmitForReview(item: ItemForRules): TxResult {
  if (!canEditItem(item.status))
    return err("BAD_STATE", "Chỉ mục ở trạng thái Nháp/Không soát xét/Không phê duyệt mới gửi soát xét được.");
  const invalid = validateItemInput({
    title: "x", // tên đã kiểm khi lưu — ở đây chỉ kiểm các điều kiện phụ thuộc trạng thái
    knowledgeForm: item.knowledgeForm,
    summary: item.summary,
    sourceRef: item.sourceRef,
    docId: item.docId,
    holderCount: item.holderCount,
  });
  if (invalid) return err("INVALID", invalid);
  return ok("PENDING_REVIEW", "Gửi soát xét");
}

// ---------- Soát xét (TP ≠ người lập) ----------

export function txReview(item: ItemForRules, u: M26ActorUser, pass: boolean, reason?: string): TxResult {
  if (item.status !== "PENDING_REVIEW") return err("BAD_STATE", "Mục tri thức không ở bước Chờ soát xét.");
  if (u.m26Role !== "TP") return err("FORBIDDEN", "Chỉ Trưởng phòng/phụ trách lĩnh vực được soát xét mục tri thức (ETV.P26 mục 4.3).");
  if (u.id === item.createdById)
    return err("SELF_REVIEW", "Người lập không được tự soát xét mục của mình (quy tắc 11 DacTa M26 / ETV.P26 mục 5.1.7).");
  if (pass) return ok("PENDING_APPROVAL", "Soát xét đạt", null, { reviewedById: u.id, reviewedAt: new Date() });
  if (!reason?.trim()) return err("REASON_REQUIRED", "Trả lại ở bước soát xét bắt buộc nhập lý do.");
  return ok("REVIEW_REJECTED", "Soát xét không đạt", reason, { reviewedById: u.id, reviewedAt: new Date() });
}

// ---------- Phê duyệt (LĐV — mọi mức trọng yếu) ----------

// ETV.P26 mục 4.1 và 5.1.7: LĐV phê duyệt MỌI mục tri thức, không ủy quyền TP theo mức trọng yếu.
export function txApprove(item: ItemForRules, u: M26ActorUser, pass: boolean, reason?: string): TxResult {
  if (item.status !== "PENDING_APPROVAL") return err("BAD_STATE", "Mục tri thức không ở bước Chờ phê duyệt.");
  if (u.m26Role !== "LDV") return err("FORBIDDEN", "Chỉ Lãnh đạo Viện được phê duyệt mục tri thức (ETV.P26 mục 4.1).");
  if (u.id === item.createdById) return err("SELF_APPROVE", "Người lập không được tự phê duyệt mục của mình (quy tắc 11 DacTa M26).");

  if (pass) {
    // Quy tắc 3 / ETV.P26 mục 5.1.6 — CHẶN CỨNG: không để tri thức trọng yếu nằm ở một người.
    const blocked = tacitSinglePointBlock(item);
    if (blocked) return blocked;
    return ok("APPROVED", "LĐV phê duyệt", null, { approvedById: u.id, approvedAt: new Date() });
  }
  if (!reason?.trim()) return err("REASON_REQUIRED", "Không phê duyệt bắt buộc nhập lý do.");
  return ok("APPROVAL_REJECTED", "LĐV không phê duyệt", reason, { approvedById: null, approvedAt: null });
}

// Điều kiện chặn cứng của ETV.P26 mục 5.1.6 — tách riêng để UI cảnh báo trước khi bấm duyệt.
export function tacitSinglePointBlock(item: ItemForRules): TxResult | null {
  const atRisk = item.knowledgeForm === "TRI_THUC_AN" && item.criticality === "CAO" && item.holderCount <= 1;
  if (!atRisk) return null;
  const missing: string[] = [];
  if (item.riskLinkCount === 0) missing.push("liên kết rủi ro mất tri thức bên M01");
  if (item.transferNeedCount === 0) missing.push("phiếu nhu cầu tri thức chuyển giao (F26.03)");
  if (missing.length === 0) return null;
  return err(
    "TACIT_SINGLE_POINT",
    `Tri thức ẩn mức trọng yếu Cao chỉ có 1 người giữ — phải bổ sung ${missing.join(" và ")} trước khi phê duyệt (ETV.P26 mục 5.1.6, chặn cứng).`,
  );
}

export const TRANSFER_METHODS = ["KEM_CAP", "DAO_TAO_NOI_BO", "VAN_BAN_HOA"] as const;

// ---------- Rà soát định kỳ ----------

export function txMarkReviewed(item: ItemForRules, u: M26ActorUser): TxResult {
  if (item.status !== "APPROVED") return err("BAD_STATE", "Chỉ mục đã phê duyệt mới ghi nhận rà soát định kỳ.");
  if (u.m26Role !== "TP" && u.m26Role !== "QLCL")
    return err("FORBIDDEN", "Chỉ chủ sở hữu (TP) hoặc QLCL được ghi nhận đã rà soát (ETV.P26 mục 5.1.7 bước 7).");
  if (u.m26Role === "TP" && u.id !== item.ownerId)
    return err("FORBIDDEN", "Chỉ chủ sở hữu của mục tri thức này được ghi nhận đã rà soát.");
  return ok("APPROVED", "Xác nhận đã rà soát định kỳ", null, { lastReviewedAt: new Date() });
}

// ---------- Phiên bản mới ----------

export function txCreateNewVersion(item: ItemForRules, u: M26ActorUser): TxResult {
  if (item.status !== "APPROVED") return err("BAD_STATE", "Chỉ tạo phiên bản mới từ mục đã phê duyệt.");
  if (u.m26Role !== "QLCL" && u.m26Role !== "TP")
    return err("FORBIDDEN", "Chỉ QLCL hoặc Trưởng phòng được tạo phiên bản mới.");
  if (item.docId)
    return err(
      "DOC_CONTROLLED",
      "Mục tri thức là tài liệu kiểm soát — phiên bản do MP14 quyết định, M26 chỉ cập nhật liên kết (quy tắc 2 DacTa M26 / ETV.P26 mục 5.1.8).",
    );
  return ok("DRAFT", "Tạo phiên bản mới");
}

// ---------- Tuyên bố hết hiệu lực ----------

export function txRetire(item: ItemForRules, u: M26ActorUser, reason?: string): TxResult {
  if (item.status !== "APPROVED") return err("BAD_STATE", "Chỉ mục đang có hiệu lực mới tuyên bố hết hiệu lực được.");
  if (u.m26Role !== "LDV" && u.m26Role !== "QLCL")
    return err("FORBIDDEN", "Chỉ Lãnh đạo Viện hoặc QLCL được tuyên bố mục tri thức hết hiệu lực (ETV.P26 mục 6.1).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Tuyên bố hết hiệu lực bắt buộc nhập lý do (ETV.P26 mục 6.1).");
  // Gỡ chỉ mục AI đi kèm trong CÙNG giao dịch — nếu không, trợ lý AI còn trích dẫn tri thức lỗi thời.
  return ok("RETIRED", "Tuyên bố hết hiệu lực", reason, { retiredAt: new Date(), aiIndexed: false });
}

// ---------- Hủy ----------

export function txCancel(item: ItemForRules, u: M26ActorUser, reason?: string): TxResult {
  if (item.status === "APPROVED" || item.status === "RETIRED")
    return err("LOCKED", "Mục đã phê duyệt/hết hiệu lực là hồ sơ bất biến — không hủy được.");
  if (item.status === "CANCELLED") return err("BAD_STATE", "Mục tri thức đã bị hủy.");
  if (u.m26Role !== "LDV") return err("FORBIDDEN", "Chỉ Lãnh đạo Viện được hủy mục tri thức (ETV.P26 mục 6.1).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Hủy mục tri thức bắt buộc nhập lý do.");
  return ok("CANCELLED", "Hủy mục tri thức", reason);
}

// ---------- Chỉ mục trợ lý AI ----------

// Quy tắc 10 / ETV.P26 mục 5.5 — chỉ mục AI nhận đúng {Công khai, Nội bộ} của mục ĐÃ PHÊ DUYỆT.
export const AI_INDEXABLE_CONFIDENTIALITY: M26Confidentiality[] = ["CONG_KHAI", "NOI_BO"];

export function txSetAiIndex(item: ItemForRules, u: M26ActorUser, enable: boolean): TxResult {
  if (u.m26Role !== "QLCL" && u.m26Role !== "QTHT")
    return err("FORBIDDEN", "Chỉ QLCL hoặc Quản trị hệ thống được thao tác chỉ mục trợ lý AI (ETV.P26 mục 4.5).");
  if (!enable) return ok(item.status, "Gỡ khỏi chỉ mục trợ lý AI", null, { aiIndexed: false });

  if (item.status !== "APPROVED")
    return err("NOT_APPROVED", "Chỉ mục tri thức đã phê duyệt mới được đưa vào chỉ mục trợ lý AI (quy tắc 10 DacTa M26).");
  if (!AI_INDEXABLE_CONFIDENTIALITY.includes(item.confidentiality))
    return err(
      "CONFIDENTIAL_BLOCKED",
      "Tri thức mức Hạn chế/Mật không bao giờ được đưa vào chỉ mục trợ lý AI (ETV.P26 mục 5.5 và mục 7).",
    );
  return ok(item.status, "Đưa vào chỉ mục trợ lý AI", null, { aiIndexed: true });
}

// ---------- Phân quyền theo mức bảo mật ----------

// ETV.P26 mục 5.1.4 và 5.5 nói "chỉ hiển thị cho vai trò được phép" nhưng không liệt kê vai trò —
// cụ thể hóa tại đây [SUY DẪN], kèm ngoại lệ cho chủ sở hữu và người giữ tri thức của chính mục đó.
const VISIBLE_BY_ROLE: Record<string, M26Confidentiality[]> = {
  QLCL: ["CONG_KHAI", "NOI_BO", "HAN_CHE", "MAT"],
  LDV: ["CONG_KHAI", "NOI_BO", "HAN_CHE", "MAT"],
  QTHT: ["CONG_KHAI", "NOI_BO", "HAN_CHE", "MAT"],
  TP: ["CONG_KHAI", "NOI_BO", "HAN_CHE"],
  NV: ["CONG_KHAI", "NOI_BO"],
};

export function visibleConfidentiality(role: string | null): M26Confidentiality[] {
  if (!role) return ["CONG_KHAI"]; // chưa được gán vai trò M26 — chỉ thấy tri thức công khai
  return VISIBLE_BY_ROLE[role] ?? ["CONG_KHAI"];
}

export function canViewItem(
  role: string | null,
  userId: string,
  item: { confidentiality: M26Confidentiality; ownerId: string; holderIds?: string[] },
): boolean {
  if (visibleConfidentiality(role).includes(item.confidentiality)) return true;
  // Ngoại lệ: người chịu trách nhiệm về chính tri thức đó luôn đọc được tri thức của mình.
  return item.ownerId === userId || (item.holderIds ?? []).includes(userId);
}

// Lượt xem mục Hạn chế/Mật phải ghi nhật ký (ISO/IEC 27001 — ETV.P26 mục 5.1.4).
export const needsAccessLog = (c: M26Confidentiality) => c === "HAN_CHE" || c === "MAT";

// ---------- Cờ "đến hạn rà soát" — TÍNH KHI ĐỌC, không lưu cột ----------

// ETV.P26 mục 5.1.5: Cao ≤ 1 năm · Trung bình 2 năm · Thấp theo sự kiện; 6 tháng cho tri thức
// thay đổi nhanh. Mốc tính là lastReviewedAt, thiếu thì lấy approvedAt.
const CYCLE_DAYS: Record<M26ReviewCycle, number | null> = {
  SAU_THANG: 180,
  NAM: 365,
  HAI_NAM: 730,
  THEO_SU_KIEN: null, // không có chu kỳ cố định — không bao giờ tự báo quá hạn
};

export function reviewDueDate(cycle: M26ReviewCycle, from: Date | null): Date | null {
  const days = CYCLE_DAYS[cycle];
  if (days === null || from === null) return null;
  return new Date(from.getTime() + days * 86_400_000);
}

export function isDueForReview(cycle: M26ReviewCycle, from: Date | null, now: Date = new Date()): boolean {
  const due = reviewDueDate(cycle, from);
  return due !== null && now.getTime() > due.getTime();
}

// Quá 2 chu kỳ ⇒ cảnh báo LĐV (ETV.P26 mục 5.1.5).
export function overdueCycles(cycle: M26ReviewCycle, from: Date | null, now: Date = new Date()): number {
  const days = CYCLE_DAYS[cycle];
  if (days === null || from === null) return 0;
  const elapsed = (now.getTime() - from.getTime()) / 86_400_000;
  return Math.floor(elapsed / days);
}

// ---------- Bài học kinh nghiệm ----------

export interface LessonForRules {
  status: M26LessonStatus;
  knowledgeItemId: string | null;
  createdById: string;
}

export function txAnalyzeLesson(l: LessonForRules, u: M26ActorUser): TxResult {
  if (l.status !== "MOI") return err("BAD_STATE", "Chỉ phiếu bài học ở trạng thái Mới mới chuyển sang Đang phân tích.");
  if (u.m26Role !== "QLCL" && u.m26Role !== "TP") return err("FORBIDDEN", "Chỉ QLCL hoặc Trưởng phòng được xử lý phiếu bài học.");
  return ok("DANG_PHAN_TICH", "Nhận phân tích bài học kinh nghiệm");
}

export function txSubmitLesson(l: LessonForRules, u: M26ActorUser): TxResult {
  if (l.status !== "DANG_PHAN_TICH") return err("BAD_STATE", "Phiếu bài học chưa ở bước Đang phân tích.");
  if (u.m26Role !== "QLCL" && u.m26Role !== "TP") return err("FORBIDDEN", "Chỉ QLCL hoặc Trưởng phòng được trình phiếu bài học.");
  if (!l.knowledgeItemId)
    return err(
      "ITEM_REQUIRED",
      "Bài học phải gắn với một mục tri thức (tạo mới hoặc cập nhật) trước khi trình phê duyệt (quy tắc 7 DacTa M26 / ETV.P26 mục 5.2.2).",
    );
  return ok("CHO_PHE_DUYET", "Trình phê duyệt bài học");
}

export function txApproveLesson(l: LessonForRules, u: M26ActorUser, pass: boolean, reason?: string): TxResult {
  if (l.status !== "CHO_PHE_DUYET") return err("BAD_STATE", "Phiếu bài học không ở bước Chờ phê duyệt.");
  if (u.m26Role !== "LDV") return err("FORBIDDEN", "Chỉ Lãnh đạo Viện được phê duyệt bài học kinh nghiệm (ETV.P26 mục 5.2.2).");
  if (!pass) {
    if (!reason?.trim()) return err("REASON_REQUIRED", "Trả lại phiếu bài học bắt buộc nhập lý do.");
    return ok("DANG_PHAN_TICH", "Trả lại phiếu bài học", reason);
  }
  if (!l.knowledgeItemId)
    return err("ITEM_REQUIRED", "Bài học chưa gắn mục tri thức — không phê duyệt được (quy tắc 7 DacTa M26).");
  return ok("DA_PHE_DUYET", "LĐV phê duyệt bài học", null, { approvedById: u.id, approvedAt: new Date() });
}

export function txCancelLesson(l: LessonForRules, u: M26ActorUser, reason?: string): TxResult {
  if (l.status === "DA_PHE_DUYET") return err("LOCKED", "Bài học đã phê duyệt là hồ sơ bất biến.");
  if (l.status === "HUY") return err("BAD_STATE", "Phiếu bài học đã bị hủy.");
  if (u.m26Role !== "LDV" && u.m26Role !== "QLCL") return err("FORBIDDEN", "Chỉ LĐV hoặc QLCL được hủy phiếu bài học.");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Hủy phiếu bài học bắt buộc nhập lý do.");
  return ok("HUY", "Hủy phiếu bài học", reason);
}

// ---------- Nhu cầu tri thức ----------

export interface NeedForRules {
  status: M26NeedStatus;
  resultItemId: string | null;
  resultTrainingId: string | null;
  requiredBy: Date;
}

export function txStartNeed(n: NeedForRules, u: M26ActorUser): TxResult {
  if (n.status !== "MO") return err("BAD_STATE", "Chỉ nhu cầu ở trạng thái Mở mới chuyển sang Đang bổ sung.");
  if (u.m26Role !== "QLCL" && u.m26Role !== "TP") return err("FORBIDDEN", "Chỉ QLCL hoặc Trưởng phòng được cập nhật nhu cầu tri thức.");
  return ok("DANG_BO_SUNG", "Bắt đầu bổ sung tri thức");
}

export function txFulfillNeed(n: NeedForRules, u: M26ActorUser): TxResult {
  if (n.status !== "MO" && n.status !== "DANG_BO_SUNG") return err("BAD_STATE", "Nhu cầu đã đóng.");
  if (u.m26Role !== "QLCL" && u.m26Role !== "TP") return err("FORBIDDEN", "Chỉ QLCL hoặc Trưởng phòng được đóng nhu cầu tri thức.");
  if (!n.resultItemId && !n.resultTrainingId)
    return err(
      "RESULT_REQUIRED",
      "Chỉ đóng ở trạng thái Đã đáp ứng khi có kết quả: mục tri thức mới/được cập nhật hoặc hồ sơ đào tạo bên M03 (quy tắc 8 DacTa M26 / ETV.P26 mục 5.3.3).",
    );
  return ok("DA_DAP_UNG", "Đóng nhu cầu — đã đáp ứng", null, { decidedById: u.id, decidedAt: new Date() });
}

export function txWaiveNeed(n: NeedForRules, u: M26ActorUser, reason?: string): TxResult {
  if (n.status === "DA_DAP_UNG" || n.status === "KHONG_THUC_HIEN") return err("BAD_STATE", "Nhu cầu đã đóng.");
  if (u.m26Role !== "LDV")
    return err("FORBIDDEN", "Chỉ Lãnh đạo Viện được quyết định Không thực hiện đối với nhu cầu tri thức (ETV.P26 mục 5.3.3).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Quyết định Không thực hiện bắt buộc nhập lý do.");
  return ok("KHONG_THUC_HIEN", "LĐV quyết định không thực hiện", reason, { decidedById: u.id, decidedAt: new Date() });
}

export const isNeedOverdue = (n: { status: M26NeedStatus; requiredBy: Date }, now: Date = new Date()) =>
  (n.status === "MO" || n.status === "DANG_BO_SUNG") && now.getTime() > n.requiredBy.getTime();

// ---------- Hoạt động chia sẻ ----------

export interface SharingForRules {
  status: M26SharingStatus;
  form: M26SharingForm;
  evidenceTrainingId: string | null;
  evidenceRef: string | null;
  itemCount: number;
  participantCount: number;
  nonApprovedItemCodes: string[]; // mục được chọn nhưng không ở trạng thái Đã phê duyệt
}

export function validateSharingItems(nonApprovedItemCodes: string[]): string | null {
  if (nonApprovedItemCodes.length === 0) return null;
  return `Chỉ được chia sẻ mục tri thức đã phê duyệt (quy tắc 12 DacTa M26 / ETV.P26 mục 5.4.2): ${nonApprovedItemCodes.join(", ")}.`;
}

export function txCompleteSharing(s: SharingForRules, u: M26ActorUser): TxResult {
  if (s.status !== "KE_HOACH") return err("BAD_STATE", "Chỉ hoạt động ở trạng thái Kế hoạch mới ghi nhận đã thực hiện.");
  if (u.m26Role !== "QLCL" && u.m26Role !== "TP") return err("FORBIDDEN", "Chỉ QLCL hoặc Trưởng phòng được ghi nhận hoạt động chia sẻ.");
  if (s.itemCount === 0) return err("NO_ITEM", "Hoạt động chia sẻ phải gắn ít nhất 1 mục tri thức.");
  const invalid = validateSharingItems(s.nonApprovedItemCodes);
  if (invalid) return err("ITEM_NOT_APPROVED", invalid);
  if (s.participantCount === 0) return err("NO_PARTICIPANT", "Bắt buộc ghi danh sách người tham dự.");
  // Quy tắc 12: đào tạo nội bộ có hồ sơ chính thức ở M03 — M26 chỉ trỏ, không lập biểu mẫu trùng.
  if (s.form === "DAO_TAO_NOI_BO" && !s.evidenceTrainingId && !s.evidenceRef?.trim())
    return err(
      "TRAINING_EVIDENCE_REQUIRED",
      "Hình thức Đào tạo nội bộ bắt buộc dẫn chiếu hồ sơ đào tạo bên M03 (F03.05.x) — ETV.P26 mục 5.4.2.",
    );
  return ok("DA_THUC_HIEN", "Ghi nhận hoạt động chia sẻ đã thực hiện");
}

export function txCancelSharing(s: SharingForRules, u: M26ActorUser, reason?: string): TxResult {
  if (s.status !== "KE_HOACH") return err("BAD_STATE", "Chỉ hủy được hoạt động còn ở trạng thái Kế hoạch.");
  if (u.m26Role !== "QLCL" && u.m26Role !== "TP") return err("FORBIDDEN", "Chỉ QLCL hoặc Trưởng phòng được hủy hoạt động chia sẻ.");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Hủy hoạt động chia sẻ bắt buộc nhập lý do.");
  return ok("HUY", "Hủy hoạt động chia sẻ", reason);
}
