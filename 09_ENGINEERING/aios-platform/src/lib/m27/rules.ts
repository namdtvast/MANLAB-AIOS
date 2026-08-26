// M27 — gate/state machine thuần hàm, AUTHORITATIVE.
// NGUỒN QUY ĐỊNH: Thủ tục ETV.P27 — 03_MANAGEMENT_SYSTEM/02_P/ETV.P27_QuanTriDuLieuTaiSanTT.md
// (lần BH 01, ban hành 26/08/2026). Đặc tả module: 05_MODULE_LIBRARY/M27_TaiSanTT/01_Requirement/DacTa.md
//
// Không chạm DB, không import prisma — mọi quyết định "được phép hay không" nằm ở đây để test được.
// actions.ts chỉ gọi rule rồi ghi DB.
import type {
  Classification,
  M27AssetStatus,
  M27AssetType,
  M27CiaLevel,
  M27DataDomain,
  M27RuleVersionStatus,
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

export interface M27ActorUser {
  id: string;
  m27Role: string | null; // TP / QTHT / ATTT / QLCL / VP / LDV — dùng chung vocabulary với M28, M33
}

// ---------------------------------------------------------------------------
// Danh mục dẫn xuất từ thủ tục
// ---------------------------------------------------------------------------

/// Thứ tự tăng dần của thang phân loại (P27 §6.2). Dùng để so sánh "không thấp hơn mức tối thiểu".
const CLASSIFICATION_ORDER: Record<Classification, number> = {
  CONG_KHAI: 0,
  NOI_BO: 1,
  HAN_CHE: 2,
  MAT: 3,
};

/// Mức phân loại TỐI THIỂU theo nhóm dữ liệu — P27 §6.1.3, bảng trong thủ tục.
export const MIN_CLASSIFICATION: Record<M27DataDomain, Classification> = {
  KHACH_HANG: "HAN_CHE",
  KET_QUA_DO: "HAN_CHE",
  HIEU_CHUAN_CRM: "HAN_CHE",
  NHAN_SU: "MAT",
  TAI_CHINH: "MAT",
  HE_THONG_QUAN_LY: "NOI_BO",
  NGHIEN_CUU: "NOI_BO",
  VAN_HANH_CNTT: "HAN_CHE",
  PHUC_VU_AI: "NOI_BO",
};

/// Loại tài sản ở dạng điện tử — bắt buộc có người quản lý kỹ thuật và hệ thống chứa
/// (P27 §6.1.1 nhóm "Trách nhiệm"/"Vị trí"; Phụ lục I.1 điều kiện 2).
const ELECTRONIC_TYPES: M27AssetType[] = [
  "CSDL_DIEN_TU",
  "TEP_TAI_LIEU",
  "UNG_DUNG_NEN_TANG",
  "VAT_MANG_TIN_ROI",
  "DICH_VU_BEN_THU_BA",
  "DU_LIEU_THIET_BI_DO",
];

export const isElectronic = (t: M27AssetType): boolean => ELECTRONIC_TYPES.includes(t);

/// Mức phân loại được phép đưa vào chỉ mục AI — P27 §6.9.2. Hạn chế và Mật KHÔNG BAO GIỜ.
const AI_ALLOWED_CLASSIFICATIONS: Classification[] = ["CONG_KHAI", "NOI_BO"];

/// Cụm từ chỉ thời hạn lưu vô hạn — dữ liệu cá nhân không được lưu vĩnh viễn nếu không có
/// căn cứ pháp luật (P27 §6.4 điểm 2; Phụ lục I.1 điều kiện 6).
const INFINITE_RETENTION = /vĩnh viễn|vinh vien|không thời hạn|khong thoi han|vô thời hạn/i;

/// Chu kỳ rà soát (tháng) — P27 §6.8: mặc định 12, còn 6 với tài sản Mật hoặc có dữ liệu cá nhân.
export function computeReviewCycleMonths(a: {
  classification: Classification;
  containsPersonalData: boolean;
}): number {
  return a.classification === "MAT" || a.containsPersonalData ? 6 : 12;
}

/// Chu kỳ kiểm chứng phục hồi (tháng) — P27 §6.5.2, áp theo ETV.P31 §6.4.3.
export function restoreTestCycleMonths(a: { ciaA: M27CiaLevel }): number {
  return a.ciaA === "CAO" ? 6 : 12;
}

// ---------------------------------------------------------------------------
// Lát cắt dữ liệu đủ để ra quyết định — KHÔNG phải kiểu Prisma đầy đủ
// ---------------------------------------------------------------------------

export interface AssetForRules {
  status: M27AssetStatus;
  assetType: M27AssetType;
  dataDomain: M27DataDomain;
  classification: Classification;
  classificationDowngradeRef: string | null;
  ciaC: M27CiaLevel;
  ciaI: M27CiaLevel;
  ciaA: M27CiaLevel;
  containsPersonalData: boolean;
  legalBasis: string | null;
  ownerId: string;
  ownerActive: boolean; // chủ sở hữu còn làm việc tại Viện — Phụ lục I.1 điều kiện 1
  custodianId: string | null;
  systemRefs: string[];
  retentionPeriod: string;
  retentionBasis: string;
  backupRequired: boolean;
  backupFrequency: string | null;
  aiUseAllowed: boolean;
  riskRefs: string[];
  createdById: string;
}

const EDITABLE_ASSET: M27AssetStatus[] = ["DRAFT", "REVIEW_REJECTED", "APPROVAL_REJECTED"];

export const canEditAsset = (s: M27AssetStatus): boolean => EDITABLE_ASSET.includes(s);

// ---------------------------------------------------------------------------
// Validate khi lưu (Nháp) — trả chuỗi lỗi tiếng Việt hoặc null
// ---------------------------------------------------------------------------

export function validateAssetInput(input: {
  name: string;
  description: string;
  assetType: M27AssetType;
  ownerId: string | null;
  custodianId: string | null;
  systemRefs: string[];
  storageLocation: string;
  retentionPeriod: string;
  retentionBasis: string;
}): string | null {
  if (!input.name.trim()) return "Thiếu tên tài sản.";
  if (!input.description.trim())
    return "Thiếu mô tả nội dung dữ liệu (ETV.P27 §6.1.1) — mô tả nội dung chứa đựng, KHÔNG chép dữ liệu thật.";
  if (!input.ownerId)
    return "Thiếu chủ sở hữu tài sản. Chủ sở hữu phải là MỘT CÁ NHÂN, không phải tên phòng (ETV.P27 Phụ lục I.1 điều kiện 1).";
  if (!input.storageLocation.trim()) return "Thiếu nơi lưu vật lý hoặc logic (ETV.P27 §6.1.1).";
  if (!input.retentionPeriod.trim()) return "Thiếu thời hạn lưu (ETV.P27 Phụ lục I.1 điều kiện 5).";
  if (!input.retentionBasis.trim())
    return "Thiếu căn cứ thời hạn lưu — ETV.P15, ETV.P.F 14.06 hoặc pháp luật chuyên ngành (điều kiện 5).";
  if (isElectronic(input.assetType)) {
    if (!input.custodianId)
      return "Tài sản ở dạng điện tử bắt buộc có người quản lý kỹ thuật (ETV.P27 Phụ lục I.1 điều kiện 2).";
    if (input.systemRefs.length === 0)
      return "Tài sản ở dạng điện tử bắt buộc ghi hệ thống, thiết bị đang chứa tài sản — mã tài sản ở ETV.P33 (§6.1.1).";
  }
  return null;
}

/// Tám điều kiện chặn cứng trước khi phê duyệt tài sản vào danh mục — P27 Phụ lục I.1.
/// Trả về danh sách vấn đề; rỗng nghĩa là đủ điều kiện phê duyệt.
export function approvalIssues(a: AssetForRules): string[] {
  const issues: string[] = [];

  // 1 — chủ sở hữu là một cá nhân đang làm việc tại Viện
  if (!a.ownerId) issues.push("chưa có chủ sở hữu");
  else if (!a.ownerActive)
    issues.push("chủ sở hữu đã nghỉ việc hoặc chuyển công tác — phải chuyển giao trước (§6.8)");

  // 2 — tài sản điện tử phải có người quản lý kỹ thuật
  if (isElectronic(a.assetType) && !a.custodianId) issues.push("chưa có người quản lý kỹ thuật");

  // 3 — có mức phân loại và ba mức C–I–A: enum không null nên luôn đủ, giữ lại để soi khi đổi schema
  if (!a.classification || !a.ciaC || !a.ciaI || !a.ciaA) issues.push("thiếu mức phân loại hoặc mức C–I–A");

  // 4 — không thấp hơn mức tối thiểu của nhóm dữ liệu, trừ khi có căn cứ công bố (ETV.P02)
  const min = MIN_CLASSIFICATION[a.dataDomain];
  if (CLASSIFICATION_ORDER[a.classification] < CLASSIFICATION_ORDER[min] && !a.classificationDowngradeRef?.trim())
    issues.push(
      `mức phân loại thấp hơn mức tối thiểu của nhóm dữ liệu mà không có căn cứ công bố theo ETV.P02 (§6.1.3)`,
    );

  // 5 — có thời hạn lưu và căn cứ thời hạn
  if (!a.retentionPeriod.trim() || !a.retentionBasis.trim()) issues.push("thiếu thời hạn lưu hoặc căn cứ thời hạn");

  // 6 — dữ liệu cá nhân: căn cứ pháp lý, mục đích xử lý và thời hạn lưu hữu hạn
  if (a.containsPersonalData) {
    if (!a.legalBasis?.trim())
      issues.push("tài sản có dữ liệu cá nhân nhưng thiếu căn cứ pháp lý và mục đích xử lý (NĐ 13/2023, §6.4)");
    if (INFINITE_RETENTION.test(a.retentionPeriod))
      issues.push("dữ liệu cá nhân không được lưu vĩnh viễn nếu không có căn cứ pháp luật (§6.4 điểm 2)");
  }

  // 7 — Sẵn sàng = Cao bắt buộc có sao lưu và tần suất
  if (a.ciaA === "CAO") {
    if (!a.backupRequired) issues.push("tài sản có Sẵn sàng = Cao bắt buộc phải được sao lưu (§6.5.1)");
    else if (!a.backupFrequency) issues.push("thiếu tần suất sao lưu");
  }

  // 8 — bản ghi không chứa dữ liệu thật: máy không kiểm được ngữ nghĩa, người soát xét chịu trách nhiệm.
  //     Cố ý KHÔNG dựng heuristic đoán mò ở đây — đoán sai sẽ chặn nhầm bản ghi hợp lệ.

  return issues;
}

/// Cảnh báo mềm (không chặn) — P27 §6.9.1: tài sản Hạn chế/Mật hoặc có C–I–A = Cao nên đã có
/// rủi ro mở tại ETV.P28/ETV.P01. Chuyển thành chặn phê duyệt khi Module M28 vận hành —
/// mốc chuyển do QLCL trình LĐV quyết định, KHÔNG tự bật trong mã.
export function riskLinkWarning(a: AssetForRules): string | null {
  const needsRisk =
    a.classification === "HAN_CHE" || a.classification === "MAT" || [a.ciaC, a.ciaI, a.ciaA].includes("CAO");
  if (needsRisk && a.riskRefs.length === 0)
    return "Tài sản mức Hạn chế/Mật hoặc có C–I–A = Cao nên có ít nhất 01 rủi ro đã mở tại ETV.P28 hoặc ETV.P01 (§6.9.1).";
  return null;
}

// ---------------------------------------------------------------------------
// Chuyển trạng thái — P27 §6.1.5 và Phụ lục II.1
// ---------------------------------------------------------------------------

export function txSubmitAsset(a: AssetForRules, u: M27ActorUser): TxResult {
  if (!canEditAsset(a.status)) return err("BAD_STATE", "Chỉ gửi soát xét được bản ghi ở Nháp hoặc bị trả lại.");
  if (!a.ownerId)
    return err("OWNER_REQUIRED", "Thiếu chủ sở hữu tài sản (ETV.P27 Phụ lục I.1 điều kiện 1).");
  if (isElectronic(a.assetType) && !a.custodianId)
    return err("CUSTODIAN_REQUIRED", "Tài sản điện tử bắt buộc có người quản lý kỹ thuật (điều kiện 2).");
  if (u.id !== a.createdById && u.m27Role !== "QLCL")
    return err("FORBIDDEN", "Chỉ người lập hoặc QLCL gửi bản ghi đi soát xét (ETV.P27 §6.1.5 bước 3).");
  return ok("PENDING_REVIEW", "Gửi soát xét");
}

export function txReviewAsset(a: AssetForRules, u: M27ActorUser, pass: boolean, reason?: string): TxResult {
  if (a.status !== "PENDING_REVIEW") return err("BAD_STATE", "Bản ghi không ở bước Chờ soát xét.");
  if (u.m27Role !== "ATTT")
    return err("FORBIDDEN", "Chỉ PT.ATTT soát xét mức phân loại và mức C–I–A (ETV.P27 §6.1.5 bước 3).");
  if (u.id === a.createdById)
    return err("SELF_REVIEW", "Người soát xét phải khác người lập (ETV.P27 §5.3, §6.1.5 bước 3).");
  if (!pass) {
    if (!reason?.trim()) return err("REASON_REQUIRED", "Không soát xét bắt buộc nhập lý do (Phụ lục II.1).");
    return ok("REVIEW_REJECTED", "PT.ATTT không soát xét", reason);
  }
  return ok("PENDING_APPROVAL", "PT.ATTT soát xét đạt", null, { reviewedById: u.id, reviewedAt: new Date() });
}

export function txApproveAsset(a: AssetForRules, u: M27ActorUser, pass: boolean, reason?: string): TxResult {
  if (a.status !== "PENDING_APPROVAL") return err("BAD_STATE", "Bản ghi không ở bước Chờ phê duyệt.");
  if (u.m27Role !== "LDV")
    return err("FORBIDDEN", "Chỉ LĐV phê duyệt tài sản vào danh mục (ETV.P27 Phụ lục II.1).");
  if (u.id === a.createdById)
    return err("SELF_APPROVE", "Người lập không được tự phê duyệt (ETV.P27 §5.3).");
  if (!pass) {
    if (!reason?.trim()) return err("REASON_REQUIRED", "Không phê duyệt bắt buộc nhập lý do (Phụ lục II.1).");
    return ok("APPROVAL_REJECTED", "LĐV không phê duyệt", reason);
  }
  const issues = approvalIssues(a);
  if (issues.length > 0)
    return err(
      "APPROVAL_BLOCKED",
      `Chặn phê duyệt — ${issues.join("; ")} (ETV.P27 Phụ lục I.1).`,
    );
  return ok("DANG_SU_DUNG", "LĐV phê duyệt — Đang sử dụng", null, {
    approvedById: u.id,
    approvedAt: new Date(),
    lastReviewedAt: new Date(),
    reviewCycleMonths: computeReviewCycleMonths(a),
  });
}

export function txCancelAsset(a: AssetForRules, u: M27ActorUser, reason?: string): TxResult {
  if (a.status === "DANG_SU_DUNG" || a.status === "NGUNG_SU_DUNG" || a.status === "DA_HUY")
    return err("BAD_STATE", "Chỉ huỷ bản ghi khai báo sai hoặc trùng khi CHƯA phê duyệt (Phụ lục II.1).");
  if (u.m27Role !== "LDV") return err("FORBIDDEN", "Chỉ LĐV huỷ bản ghi (Phụ lục II.1).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Huỷ bản ghi bắt buộc nhập lý do.");
  return ok("CANCELLED", "LĐV huỷ bản ghi", reason);
}

export function txRetireAsset(a: AssetForRules, u: M27ActorUser, reason?: string): TxResult {
  if (a.status !== "DANG_SU_DUNG") return err("BAD_STATE", "Chỉ tài sản Đang sử dụng mới chuyển Ngừng sử dụng.");
  if (u.m27Role !== "TP" && u.m27Role !== "QLCL")
    return err("FORBIDDEN", "Chỉ chủ sở hữu (TP) hoặc QLCL chuyển tài sản sang Ngừng sử dụng (Phụ lục II.1).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Chuyển Ngừng sử dụng bắt buộc nhập lý do (Phụ lục II.1).");
  return ok("NGUNG_SU_DUNG", "Chuyển Ngừng sử dụng", reason);
}

export function txMarkAssetReviewed(a: AssetForRules, u: M27ActorUser): TxResult {
  if (a.status !== "DANG_SU_DUNG") return err("BAD_STATE", "Chỉ ghi nhận rà soát cho tài sản Đang sử dụng.");
  if (u.id !== a.ownerId && u.m27Role !== "QLCL")
    return err("FORBIDDEN", "Chỉ chủ sở hữu tài sản hoặc QLCL ghi nhận rà soát định kỳ (ETV.P27 §6.8).");
  return ok(a.status, "Ghi nhận rà soát định kỳ", null, {
    lastReviewedAt: new Date(),
    reviewCycleMonths: computeReviewCycleMonths(a),
  });
}

/// Ghi nhận kiểm chứng phục hồi. Bằng chứng gốc là F31.03 của ETV.P31 — module này chỉ lưu mốc
/// ngày và tham chiếu. Người thực hiện phục hồi ≠ người xác nhận kết quả (P27 §6.5.2) được cưỡng
/// chế ở ETV.P31; ở đây chặn phần thuộc thẩm quyền M27: chỉ người quản lý kỹ thuật ghi nhận.
export function txRecordRestoreTest(
  a: AssetForRules,
  u: M27ActorUser,
  passed: boolean,
  evidenceRef: string,
): TxResult {
  if (a.status !== "DANG_SU_DUNG") return err("BAD_STATE", "Chỉ ghi nhận cho tài sản Đang sử dụng.");
  if (!a.backupRequired) return err("NO_BACKUP", "Tài sản không thuộc diện phải sao lưu.");
  if (u.m27Role !== "QTHT")
    return err("FORBIDDEN", "Chỉ người quản lý kỹ thuật (QTHT) ghi nhận kiểm chứng phục hồi (ETV.P27 §6.5.2).");
  if (!evidenceRef.trim())
    return err("EVIDENCE_REQUIRED", "Bắt buộc dẫn chiếu bằng chứng kiểm chứng phục hồi — biểu mẫu F31.03 (§6.5.2).");
  if (!passed)
    return err(
      "RESTORE_FAILED",
      "Kiểm chứng phục hồi Không đạt: phải mở KPH theo ETV.P13 trong 03 ngày làm việc và mở sự cố an toàn thông tin theo ETV.P28 (§6.5.2) — không ghi nhận như một lần kiểm chứng đạt.",
    );
  return ok(a.status, "Ghi nhận kiểm chứng phục hồi đạt", null, { lastRestoreTestAt: new Date() });
}

/// Bật/tắt cho phép dùng tài sản làm nguồn cho hệ thống AI — P27 §6.9.2.
/// Ba điều kiện phải thoả ĐỒNG THỜI khi bật; Hạn chế và Mật KHÔNG BAO GIỜ được bật.
export function txSetAiUse(a: AssetForRules, u: M27ActorUser, allowed: boolean): TxResult {
  if (u.m27Role !== "QLCL" && u.m27Role !== "QTHT" && u.m27Role !== "ATTT")
    return err("FORBIDDEN", "Chỉ QLCL, QTHT hoặc PT.ATTT đặt cờ cho phép dùng cho AI (ETV.P27 §6.9.2).");
  if (!allowed) return ok(a.status, "Bỏ cho phép dùng cho AI", null, { aiUseAllowed: false });
  if (a.status !== "DANG_SU_DUNG")
    return err("BAD_STATE", "Chỉ tài sản Đang sử dụng mới được dùng làm nguồn cho hệ thống AI (§6.9.2).");
  if (!AI_ALLOWED_CLASSIFICATIONS.includes(a.classification))
    return err(
      "AI_FORBIDDEN",
      "Dữ liệu mức Hạn chế và Mật KHÔNG BAO GIỜ được đưa vào chỉ mục AI (ETV.P27 §6.9.2; ETV.P28 mục 6.13; ETV.P26 mục 5.5).",
    );
  return ok(a.status, "Cho phép dùng làm nguồn cho hệ thống AI", null, { aiUseAllowed: true });
}

// ---------------------------------------------------------------------------
// Bảng quy tắc xử lý — P27 §6.3, Phụ lục II.2
// ---------------------------------------------------------------------------

export function txApproveRuleVersion(
  v: { status: M27RuleVersionStatus },
  u: M27ActorUser,
  pass: boolean,
  reason?: string,
): TxResult {
  if (v.status !== "PENDING_APPROVAL") return err("BAD_STATE", "Phiên bản không ở bước Chờ phê duyệt.");
  if (u.m27Role !== "LDV") return err("FORBIDDEN", "Chỉ LĐV phê duyệt bảng quy tắc xử lý (ETV.P27 §6.3).");
  if (!pass) {
    if (!reason?.trim()) return err("REASON_REQUIRED", "Không phê duyệt bắt buộc nhập lý do.");
    return ok("DRAFT", "LĐV không phê duyệt — trả về Nháp", reason);
  }
  return ok("DA_PHE_DUYET", "LĐV phê duyệt bảng quy tắc xử lý", null, {
    approvedById: u.id,
    approvedAt: new Date(),
    effectiveFrom: new Date(),
  });
}

// ---------------------------------------------------------------------------
// Cờ tính khi đọc — KHÔNG lưu cột riêng (NFR: derived, thống nhất M04/M17/M25/M26/M33)
// ---------------------------------------------------------------------------

function addMonths(d: Date, months: number): Date {
  const r = new Date(d);
  r.setMonth(r.getMonth() + months);
  return r;
}

/// Đến hạn rà soát định kỳ — P27 §6.8.
export function isReviewDue(
  a: { lastReviewedAt: Date | null; reviewCycleMonths: number; status: M27AssetStatus },
  now: Date = new Date(),
): boolean {
  if (a.status !== "DANG_SU_DUNG") return false;
  if (!a.lastReviewedAt) return true;
  return addMonths(a.lastReviewedAt, a.reviewCycleMonths) <= now;
}

/// Quá hạn kiểm chứng phục hồi — P27 §6.5.2.
export function isRestoreTestDue(
  a: { backupRequired: boolean; lastRestoreTestAt: Date | null; ciaA: M27CiaLevel; status: M27AssetStatus },
  now: Date = new Date(),
): boolean {
  if (a.status !== "DANG_SU_DUNG" || !a.backupRequired) return false;
  if (!a.lastRestoreTestAt) return true;
  return addMonths(a.lastRestoreTestAt, restoreTestCycleMonths(a)) <= now;
}

/// Số chu kỳ đã quá hạn kiểm chứng phục hồi — quá 02 chu kỳ thì cảnh báo LĐV (P27 §6.5.2).
export function restoreTestOverdueCycles(
  a: { backupRequired: boolean; lastRestoreTestAt: Date | null; ciaA: M27CiaLevel; status: M27AssetStatus },
  now: Date = new Date(),
): number {
  if (!isRestoreTestDue(a, now)) return 0;
  if (!a.lastRestoreTestAt) return 1;
  const cycle = restoreTestCycleMonths(a);
  const months =
    (now.getFullYear() - a.lastRestoreTestAt.getFullYear()) * 12 +
    (now.getMonth() - a.lastRestoreTestAt.getMonth());
  return Math.floor(months / cycle);
}

/// Tài sản vô chủ — chủ sở hữu đã nghỉ việc (P27 §6.8, Phụ lục I.2).
export function isOwnerless(a: { ownerActive: boolean; status: M27AssetStatus }): boolean {
  return !a.ownerActive && (a.status === "DANG_SU_DUNG" || a.status === "NGUNG_SU_DUNG");
}

/// Đến hạn huỷ — Ngừng sử dụng và đã hết thời hạn lưu. Thời hạn lưu là chuỗi tự do theo ETV.P15
/// nên KHÔNG suy ra được bằng máy; trả về danh sách để QLCL đối chiếu, không tự kết luận.
export function isDisposalCandidate(a: { status: M27AssetStatus }): boolean {
  return a.status === "NGUNG_SU_DUNG";
}
