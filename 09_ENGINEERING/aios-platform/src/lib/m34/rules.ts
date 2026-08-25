// M34 — gate/state machine thuần hàm, AUTHORITATIVE.
//
// NGUỒN QUY ĐỊNH: Thủ tục ETV.P34 — 03_MANAGEMENT_SYSTEM/02_P/ETV.P34_QuanLyDuLieuSo.md
// (DỰ THẢO lần BH 01, trạng thái Chờ soát xét, 25/08/2026). Diễn giải nghiệp vụ đầy đủ:
// 05_MODULE_LIBRARY/M34_DuLieuSo/01_Requirement/DacTa.md mục 5 (quy tắc R1–R22).
// Thủ tục CHƯA phê duyệt — giá trị định lượng (kỳ đo, chu kỳ rà soát, 15 ngày khắc phục)
// là đề xuất của dự thảo; Viện đổi khi phê duyệt theo MP14 thì sửa file này theo
// (DacTa M34 mục 10 điểm 1). Sửa quy tắc phải sửa thủ tục/đặc tả trước, rồi sửa file này.
import type {
  M34BelowThresholdCase,
  M34CorrectionStatus,
  M34DataGroup,
  M34DataSetStatus,
  M34PublishedImpact,
  M34QualityDimension,
  M34SharingStatus,
  M34SharingType,
  Classification,
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

export interface M34ActorUser {
  id: string;
  m34Role: string | null; // QLCL / ATTT / LDV / QTDL / QTHT — vai trò toàn cục; CSHDL xét theo ownerId của tập
}

// ---------- Danh mục chuẩn suy từ nhóm dữ liệu (DacTa mục 4) ----------

// R3 — nhóm bắt buộc từ điển dữ liệu (ETV.P34 Phụ lục I.1 điều kiện 3)
export const DICTIONARY_REQUIRED_GROUPS: M34DataGroup[] = ["DO_KY_THUAT", "DU_LIEU_CHU", "CONG_BO"];
export const dictionaryRequired = (g: M34DataGroup) => DICTIONARY_REQUIRED_GROUPS.includes(g);

// R20 — nhóm bắt buộc truy xuất nguồn gốc (ETV.P34 §6.6)
export const LINEAGE_REQUIRED_GROUPS: M34DataGroup[] = ["DO_KY_THUAT", "CONG_BO"];
export const lineageRequired = (g: M34DataGroup) => LINEAGE_REQUIRED_GROUPS.includes(g);

// R14 — kỳ đo tối thiểu theo nhóm, tính bằng ngày (ETV.P34 §6.4.2 — giá trị đề xuất của dự thảo).
// TRI_TUE_NHAN_TAO: đo "trước mỗi lần cập nhật tập dữ liệu" — không có chu kỳ lịch, không tự báo quá hạn.
export const QUALITY_CYCLE_DAYS: Record<M34DataGroup, number | null> = {
  DO_KY_THUAT: 90,
  DU_LIEU_CHU: 180,
  HO_SO_NGHIEP_VU: 180,
  CONG_BO: 180,
  QUAN_TRI: 365,
  HE_THONG_QUAN_LY: 365,
  TRI_TUE_NHAN_TAO: null,
};

// R14 — chiều bắt buộc theo nhóm (ETV.P34 §6.4.2)
export const REQUIRED_DIMENSIONS: Record<M34DataGroup, M34QualityDimension[]> = {
  DO_KY_THUAT: ["CHINH_XAC", "DAY_DU", "NHAT_QUAN", "KIP_THOI", "DUY_NHAT", "HOP_LE"],
  DU_LIEU_CHU: ["DUY_NHAT", "NHAT_QUAN", "DAY_DU"],
  HO_SO_NGHIEP_VU: ["DAY_DU", "KIP_THOI", "HOP_LE"],
  CONG_BO: ["DAY_DU", "KIP_THOI", "HOP_LE"],
  QUAN_TRI: ["DAY_DU", "KIP_THOI"],
  HE_THONG_QUAN_LY: ["DAY_DU", "KIP_THOI"],
  TRI_TUE_NHAN_TAO: ["DAY_DU", "HOP_LE"],
};

// Nhóm chịu sàn 100% ở chiều hợp lệ + đầy đủ (ETV.P34 §6.4.3 — R14)
export const FLOOR_100_GROUPS: M34DataGroup[] = ["DO_KY_THUAT", "CONG_BO"];

// R8 — chu kỳ rà soát: 12 tháng; 06 tháng khi chứa dữ liệu cá nhân (ETV.P34 §6.1.3 bước 5)
export const computeReviewCycle = (hasPersonalData: boolean) => (hasPersonalData ? "THANG_06" : "THANG_12");
const REVIEW_CYCLE_DAYS: Record<string, number> = { THANG_12: 365, THANG_06: 182 };

// ---------- R6 — bản ghi mô tả, không chứa dữ liệu thật ----------
// Bộ mẫu tối thiểu (diễn giải của đặc tả — PT.ATTT xác nhận bộ mẫu đầy đủ khi vận hành,
// DacTa mục 10 điểm 4): CCCD 12 số, điện thoại VN, nhiều địa chỉ email.
export function detectRealDataPatterns(text: string | null | undefined): string[] {
  if (!text) return [];
  const warnings: string[] = [];
  if (/\b\d{12}\b/.test(text)) warnings.push("chuỗi 12 chữ số liền nhau (giống số định danh cá nhân)");
  if (/\b(0|\+84)\d{9,10}\b/.test(text)) warnings.push("chuỗi giống số điện thoại");
  if ((text.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? []).length >= 2) warnings.push("nhiều địa chỉ email (giống danh sách người thật)");
  return warnings;
}

// ---------- DataSet — vòng khai báo → soát xét → phê duyệt ----------

export interface DataSetForRules {
  status: M34DataSetStatus;
  dataGroup: M34DataGroup;
  ownerId: string;
  stewardId: string;
  hasPersonalData: boolean;
  personalDataLegalRef: string | null;
  retentionBasis: string;
  qualityMetricsNote: string | null;
  dictionaryRequired: boolean;
  lineageNote: string | null;
  createdById: string;
  classification: Classification;
}

export const EDITABLE_DATASET: M34DataSetStatus[] = ["DRAFT", "REVIEW_REJECTED", "APPROVAL_REJECTED"];
export const canEditDataSet = (s: M34DataSetStatus) => EDITABLE_DATASET.includes(s);

// R1 + R2 + R5 — điều kiện tối thiểu để một bản ghi tồn tại (chặn ngay khi lưu, ETV.P34 Phụ lục I.1)
export function validateDataSetInput(input: {
  name: string;
  purpose: string;
  ownerId?: string | null;
  stewardId?: string | null;
  classification?: string | null;
  hasPersonalData?: boolean | null;
  personalDataLegalRef?: string | null;
  retentionBasis?: string | null;
}): string | null {
  if (!input.name.trim()) return "Bắt buộc tên gọi tập dữ liệu.";
  if (!input.purpose.trim()) return "Bắt buộc mục đích sử dụng.";
  if (!input.ownerId) return "Không có dữ liệu vô chủ: bắt buộc Chủ sở hữu dữ liệu (R1 — ETV.P34 Phụ lục I.1 điều kiện 1).";
  if (!input.stewardId) return "Không có dữ liệu vô chủ: bắt buộc Người quản trị dữ liệu nghiệp vụ (R1 — ETV.P34 Phụ lục I.1 điều kiện 1).";
  if (!input.classification) return "Bắt buộc mức phân loại thông tin (R2 — ETV.P34 Phụ lục I.1 điều kiện 2).";
  if (input.hasPersonalData === null || input.hasPersonalData === undefined)
    return "Bắt buộc khai có/không chứa dữ liệu cá nhân (R2 — ETV.P34 Phụ lục I.1 điều kiện 2).";
  if (input.hasPersonalData && !input.personalDataLegalRef?.trim())
    return "Tập chứa dữ liệu cá nhân phải ghi văn bản pháp luật đang hiệu lực được áp dụng (R2 — ETV.P34 §3.2).";
  if (!input.retentionBasis?.trim())
    return "Bắt buộc căn cứ thời hạn lưu: ETV.P15, F14.06 hoặc pháp luật chuyên ngành (R5 — ETV.P34 Phụ lục I.1 điều kiện 5).";
  return null;
}

// R3 — gửi soát xét cần từ điển hiệu lực nếu thuộc diện
export function txSubmitDataSet(ds: DataSetForRules, hasActiveDictionary: boolean): TxResult {
  if (!canEditDataSet(ds.status)) return err("BAD_STATE", "Chỉ bản ghi Nháp/Không soát xét/Không phê duyệt mới gửi soát xét được.");
  if (ds.dictionaryRequired && !hasActiveDictionary)
    return err(
      "DICTIONARY_REQUIRED",
      "Dữ liệu đo – kỹ thuật, dữ liệu chủ, dữ liệu công bố bắt buộc có từ điển dữ liệu hiệu lực trước khi trình (R3 — ETV.P34 §6.1.2, Phụ lục I.1 điều kiện 3).",
    );
  if (lineageRequired(ds.dataGroup) && !ds.lineageNote?.trim())
    return err(
      "LINEAGE_REQUIRED",
      "Dữ liệu đo – kỹ thuật và dữ liệu công bố phải mô tả truy xuất nguồn gốc: nguồn phát sinh, các bước biến đổi (R20 — ETV.P34 §6.6).",
    );
  return ok("PENDING_REVIEW", "Gửi soát xét");
}

// Soát xét — QLCL (kiểm trùng) hoặc PT.ATTT (xác nhận phân loại), ≠ người lập (ETV.P34 §6.1.3 bước 2–3)
export function txReviewDataSet(ds: DataSetForRules, u: M34ActorUser, pass: boolean, reason?: string): TxResult {
  if (ds.status !== "PENDING_REVIEW") return err("BAD_STATE", "Bản ghi không ở bước Chờ soát xét.");
  if (u.m34Role !== "QLCL" && u.m34Role !== "ATTT")
    return err("FORBIDDEN", "Chỉ QLCL (kiểm trùng lặp) hoặc PT.ATTT (xác nhận mức phân loại) được soát xét (ETV.P34 §6.1.3).");
  if (u.id === ds.createdById) return err("SELF_REVIEW", "Người lập không được tự soát xét bản ghi của mình (ETV.P34 §5.3).");
  if (pass) return ok("PENDING_APPROVAL", "Soát xét đạt", null, { reviewedById: u.id, reviewedAt: new Date() });
  if (!reason?.trim()) return err("REASON_REQUIRED", "Trả lại ở bước soát xét bắt buộc nhập lý do (ETV.P34 Phụ lục II.1).");
  return ok("REVIEW_REJECTED", "Soát xét không đạt", reason, { reviewedById: u.id, reviewedAt: new Date() });
}

// R7 — trùng thì gộp, không tạo bản ghi mới (ETV.P34 §6.1.3 bước 3)
export function txMarkDuplicate(ds: DataSetForRules, u: M34ActorUser, mergedIntoId: string, reason?: string): TxResult {
  if (u.m34Role !== "QLCL") return err("FORBIDDEN", "Chỉ QLCL được kết luận trùng lặp danh mục (ETV.P34 §6.1.3 bước 3).");
  if (ds.status === "ACTIVE" || ds.status === "ARCHIVED" || ds.status === "DISPOSAL_PROPOSED" || ds.status === "DISPOSED")
    return err("BAD_STATE", "Bản ghi đã phê duyệt — trùng lặp phát hiện muộn xử lý bằng hợp nhất dữ liệu chủ (R15), không hủy bản ghi.");
  if (!mergedIntoId) return err("MERGE_TARGET_REQUIRED", "Phải chỉ rõ gộp vào tập dữ liệu nào (R7 — trùng thì gộp, không tạo mới).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Hủy bản ghi trùng bắt buộc nhập lý do (ETV.P34 Phụ lục II.1).");
  return ok("CANCELLED", "Đánh dấu trùng — gộp vào tập đã có", reason, { mergedIntoId });
}

// R4 — CSHDL phê duyệt; bắt buộc chỉ số chất lượng trước khi Hiệu lực (ETV.P34 Phụ lục I.1 điều kiện 4)
export function txApproveDataSet(ds: DataSetForRules, u: M34ActorUser, pass: boolean, reason?: string): TxResult {
  if (ds.status !== "PENDING_APPROVAL") return err("BAD_STATE", "Bản ghi không ở bước Chờ phê duyệt.");
  if (u.id !== ds.ownerId)
    return err("FORBIDDEN", "Chỉ Chủ sở hữu dữ liệu của tập này được phê duyệt đưa vào danh mục (ETV.P34 §6.1.3 bước 4).");
  if (u.id === ds.createdById) return err("SELF_APPROVE", "Người lập không được tự phê duyệt bản ghi của mình (ETV.P34 §5.3).");
  if (pass) {
    if (!ds.qualityMetricsNote?.trim())
      return err(
        "QUALITY_METRICS_REQUIRED",
        "Tập ở giai đoạn Hoạt động phải có chỉ số chất lượng, ngưỡng và kỳ đo (R4 — ETV.P34 Phụ lục I.1 điều kiện 4).",
      );
    return ok("ACTIVE", "CSHDL phê duyệt — Hiệu lực", null, { approvedById: u.id, approvedAt: new Date() });
  }
  if (!reason?.trim()) return err("REASON_REQUIRED", "Không phê duyệt bắt buộc nhập lý do (ETV.P34 Phụ lục II.1).");
  return ok("APPROVAL_REJECTED", "CSHDL không phê duyệt", reason);
}

// R8 — xác nhận rà soát định kỳ (ETV.P34 §6.1.3 bước 5)
export function txMarkReviewed(ds: DataSetForRules, u: M34ActorUser): TxResult {
  if (ds.status !== "ACTIVE" && ds.status !== "ARCHIVED") return err("BAD_STATE", "Chỉ rà soát tập đang Hiệu lực hoặc Lưu trữ.");
  if (u.id !== ds.ownerId && u.id !== ds.stewardId && u.m34Role !== "QLCL")
    return err("FORBIDDEN", "Rà soát định kỳ do QTDL/CSHDL của tập (hoặc QLCL) thực hiện (ETV.P34 §6.1.3 bước 5).");
  return ok(ds.status, "Xác nhận rà soát định kỳ", null, { lastReviewedAt: new Date() });
}

// ---------- Vòng đời (R21 — ETV.P34 §6.7) ----------

export function txArchiveDataSet(ds: DataSetForRules, u: M34ActorUser, reason?: string): TxResult {
  if (ds.status !== "ACTIVE") return err("BAD_STATE", "Chỉ tập đang Hiệu lực mới chuyển Lưu trữ được.");
  if (u.id !== ds.ownerId && u.m34Role !== "QLCL")
    return err("FORBIDDEN", "Chuyển Lưu trữ do CSHDL hoặc QLCL thực hiện (ETV.P34 Phụ lục II.1).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Chuyển Lưu trữ bắt buộc nhập lý do (ETV.P34 Phụ lục II.1).");
  return ok("ARCHIVED", "Chuyển giai đoạn Lưu trữ — hạn chế quyền ghi", reason, { lifecycleStage: "LUU_TRU" });
}

export function txReactivateDataSet(ds: DataSetForRules, u: M34ActorUser, reason?: string): TxResult {
  if (ds.status !== "ARCHIVED") return err("BAD_STATE", "Chỉ tập đang Lưu trữ mới đưa lại Hiệu lực được.");
  if (u.id !== ds.ownerId && u.m34Role !== "QLCL") return err("FORBIDDEN", "Đưa lại Hiệu lực do CSHDL hoặc QLCL thực hiện.");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Đưa lại Hiệu lực bắt buộc nhập lý do.");
  return ok("ACTIVE", "Đưa lại Hiệu lực — giai đoạn Hoạt động", reason, { lifecycleStage: "HOAT_DONG" });
}

export function txProposeDisposal(ds: DataSetForRules, u: M34ActorUser, reason?: string): TxResult {
  if (ds.status !== "ARCHIVED") return err("BAD_STATE", "Đề nghị hủy đi từ giai đoạn Lưu trữ, sau khi hết thời hạn lưu (ETV.P34 §6.7.1).");
  if (u.m34Role !== "QLCL") return err("FORBIDDEN", "QLCL là người chuyển bản ghi sang Đề nghị hủy (ETV.P34 Phụ lục II.1).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Đề nghị hủy bắt buộc nhập lý do (ETV.P34 Phụ lục II.1).");
  return ok("DISPOSAL_PROPOSED", "Đề nghị hủy — chờ kiểm tra ràng buộc và phê duyệt", reason, { lifecycleStage: "DE_NGHI_HUY" });
}

export interface DisposalChecklist {
  disposalRetentionExpired: boolean;
  disposalNotBasis: boolean;
  disposalNoDispute: boolean;
  disposalNoDependent: boolean;
  disposalAtttConfirmedById: string | null;
  disposalRecordRef: string | null;
}

// Bốn ràng buộc §6.7.2 + hai chữ ký (LĐV + PT.ATTT) + biên bản hủy ← M27 — tất cả chặn cứng (R21)
export function txDisposeDataSet(ds: DataSetForRules & DisposalChecklist, u: M34ActorUser, reason?: string): TxResult {
  if (ds.status !== "DISPOSAL_PROPOSED") return err("BAD_STATE", "Bản ghi chưa ở bước Đề nghị hủy.");
  if (u.m34Role !== "LDV") return err("FORBIDDEN", "Hủy dữ liệu là thẩm quyền LĐV, không ủy quyền (ETV.P34 §5.1).");
  const unmet: string[] = [];
  if (!ds.disposalRetentionExpired) unmet.push("chưa hết thời hạn lưu");
  if (!ds.disposalNotBasis) unmet.push("còn là căn cứ của kết quả, chứng chỉ đang hiệu lực");
  if (!ds.disposalNoDispute) unmet.push("còn khiếu nại, tranh chấp, vụ việc hoặc cuộc đánh giá liên quan");
  if (!ds.disposalNoDependent) unmet.push("còn tập dữ liệu, báo cáo hoặc điểm tích hợp phụ thuộc");
  if (unmet.length > 0)
    return err("DISPOSAL_BLOCKED", `Chặn hủy — chưa thỏa điều kiện ETV.P34 §6.7.2: ${unmet.join("; ")} (R21).`);
  if (!ds.disposalAtttConfirmedById)
    return err("ATTT_CONFIRM_REQUIRED", "Hủy cần chữ ký thứ hai: PT.ATTT xác nhận phương pháp hủy an toàn (ETV.P34 §5.3, R21).");
  if (!ds.disposalRecordRef)
    return err("DISPOSAL_RECORD_REQUIRED", "Thiếu biên bản hủy theo ETV.P27 — việc hủy kỹ thuật thuộc M27, M34 chỉ ghi nhận (R21).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Hủy bắt buộc nhập lý do (ETV.P34 Phụ lục II.1).");
  return ok("DISPOSED", "LĐV phê duyệt hủy — bản ghi danh mục vẫn giữ để truy vết", reason, {});
}

export function txConfirmDisposalMethod(ds: DataSetForRules, u: M34ActorUser): TxResult {
  if (ds.status !== "DISPOSAL_PROPOSED") return err("BAD_STATE", "Chỉ xác nhận phương pháp hủy khi bản ghi ở bước Đề nghị hủy.");
  if (u.m34Role !== "ATTT") return err("FORBIDDEN", "Chỉ PT.ATTT xác nhận phương pháp hủy an toàn (ETV.P34 §5.2).");
  return ok("DISPOSAL_PROPOSED", "PT.ATTT xác nhận phương pháp hủy an toàn", null, { disposalAtttConfirmedById: u.id });
}

export function txCancelDataSet(ds: DataSetForRules, u: M34ActorUser, reason?: string): TxResult {
  const preApproval: M34DataSetStatus[] = ["DRAFT", "PENDING_REVIEW", "REVIEW_REJECTED", "PENDING_APPROVAL", "APPROVAL_REJECTED"];
  if (!preApproval.includes(ds.status))
    return err("LOCKED", "Bản ghi đã phê duyệt không hủy bản ghi được — tập hết dùng thì đi đường Lưu trữ → Đề nghị hủy (ETV.P34 Phụ lục II.1).");
  if (u.m34Role !== "QLCL") return err("FORBIDDEN", "Chỉ QLCL được hủy bản ghi khai báo sai/trùng (ETV.P34 Phụ lục II.1).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Hủy bản ghi bắt buộc nhập lý do.");
  return ok("CANCELLED", "Hủy bản ghi (khai báo sai/trùng)", reason);
}

// ---------- Từ điển dữ liệu (R3) ----------

export function txActivateDictionary(v: { version: number; changeRef: string | null; status: string }): TxResult {
  if (v.status !== "DRAFT") return err("BAD_STATE", "Chỉ phiên bản Nháp mới kích hoạt được.");
  if (v.version >= 2 && !v.changeRef?.trim())
    return err(
      "CHANGE_REF_REQUIRED",
      "Thay đổi từ điển là thay đổi cấu trúc dữ liệu — bắt buộc phiếu F30.02 theo ETV.P30 từ phiên bản 02 (R3 — ETV.P34 §6.1.2).",
    );
  return ok("ACTIVE", `Kích hoạt từ điển phiên bản ${v.version}`);
}

// ---------- Dữ liệu chủ (R9, R10) ----------

export function txRecognizeMaster(u: M34ActorUser, recognizedCountOfType: number): TxResult {
  if (u.m34Role !== "LDV") return err("FORBIDDEN", "Công nhận nguồn sự thật duy nhất là thẩm quyền LĐV, không ủy quyền (ETV.P34 §5.1).");
  if (recognizedCountOfType > 0)
    return err("ONE_SOURCE_ONLY", "Loại dữ liệu chủ này đã có nguồn sự thật đang được công nhận — một loại chỉ một nguồn (R9 — ETV.P34 §6.2.1).");
  return ok("DA_CONG_NHAN", "LĐV công nhận nguồn sự thật duy nhất", null, { recognizedAt: new Date() });
}

export function txRevokeMaster(u: M34ActorUser, reason?: string): TxResult {
  if (u.m34Role !== "LDV") return err("FORBIDDEN", "Thu hồi công nhận là thẩm quyền LĐV (ETV.P34 §5.1).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Thu hồi công nhận bắt buộc nhập lý do.");
  return ok("THU_HOI", "Thu hồi công nhận nguồn sự thật", reason);
}

// R10 — bảng tra song song: đóng bắt buộc đã ngừng dùng; gây sai lệch thì phải có KPH
export function txResolveFinding(f: { status: string; causedError: boolean; capaRef: string | null; stoppedAt: Date | null }, u: M34ActorUser): TxResult {
  if (f.status === "DA_XU_LY") return err("BAD_STATE", "Phát hiện này đã xử lý xong.");
  if (u.m34Role !== "QLCL") return err("FORBIDDEN", "QLCL kết thúc xử lý bảng tra song song (ETV.P34 §6.2.2).");
  if (!f.stoppedAt) return err("NOT_STOPPED", "Phải ngừng sử dụng bảng tra trước khi đóng (R10 — ETV.P34 §6.2.2).");
  if (f.causedError && !f.capaRef?.trim())
    return err("CAPA_REQUIRED", "Bảng tra đã gây sai lệch kết quả/hồ sơ — bắt buộc số KPH theo ETV.P13 trước khi đóng (R10).");
  return ok("DA_XU_LY", "Đóng xử lý bảng tra song song", null, { resolvedAt: new Date() });
}

// ---------- Đo chất lượng (R14, R15, R16) ----------

export interface QualityForRules {
  status: string;
  dataGroup: M34DataGroup;
  primaryEntererId: string | null;
  measuredById: string | null;
  previousFailed: boolean; // kỳ liền trước của tập là KHONG_DAT
}

// R16 — người nhập dữ liệu không kết luận chất lượng chính dữ liệu mình nhập (ETV.P34 §5.3)
export function txRecordMeasurement(q: QualityForRules, measuredById: string): TxResult {
  if (q.status !== "MOI" && q.status !== "DANG_DO") return err("BAD_STATE", "Kỳ đo đã có kết quả — hồ sơ bất biến, không ghi lại được.");
  if (q.primaryEntererId && measuredById === q.primaryEntererId)
    return err("SELF_MEASURE", "Người nhập liệu chính của tập không được đo chất lượng chính dữ liệu mình nhập (R16 — ETV.P34 §5.3).");
  return ok("DANG_DO", "Ghi giá trị đo", null, { measuredById, measuredAt: new Date() });
}

export interface QualityRowInput {
  dimension: M34QualityDimension;
  passed: boolean | null;
  value: string | null;
}

// R14 + R15 — chốt kỳ đo
export function txConcludeQuality(
  q: QualityForRules,
  u: M34ActorUser,
  rows: QualityRowInput[],
  input: {
    verdictPass: boolean;
    belowThresholdCase?: M34BelowThresholdCase | null;
    remediationPlan?: string | null;
    capaRef?: string | null;
    trend?: string | null;
  },
): TxResult {
  if (q.status !== "DANG_DO" && q.status !== "CO_KET_QUA") return err("BAD_STATE", "Kỳ đo chưa ghi giá trị hoặc đã chốt.");
  const required = REQUIRED_DIMENSIONS[q.dataGroup];
  const missing = required.filter((d) => !rows.some((r) => r.dimension === d && r.passed !== null));
  if (missing.length > 0)
    return err("DIMENSIONS_MISSING", `Chưa đo đủ chiều bắt buộc của nhóm dữ liệu này: ${missing.join(", ")} (R14 — ETV.P34 §6.4.2).`);

  // Sàn 100% hợp lệ + đầy đủ với dữ liệu đo/công bố — không chấp nhận Đạt (R14 — ETV.P34 §6.4.3)
  const floorViolated =
    FLOOR_100_GROUPS.includes(q.dataGroup) &&
    rows.some((r) => (r.dimension === "HOP_LE" || r.dimension === "DAY_DU") && r.passed === false);

  if (input.verdictPass) {
    if (floorViolated)
      return err(
        "FLOOR_100_VIOLATED",
        "Dữ liệu đo/dữ liệu công bố dưới 100% ở chiều hợp lệ hoặc đầy đủ — không chấp nhận Đạt, phải dừng sử dụng cho tới khi khắc phục (R14 — ETV.P34 §6.4.3).",
      );
    if (rows.some((r) => r.passed === false))
      return err("HAS_FAILED_DIMENSION", "Còn chiều dưới ngưỡng — không kết luận Đạt được.");
    if (u.id !== q.measuredById && u.m34Role !== "QLCL" && u.m34Role !== "QTDL")
      return err("FORBIDDEN", "QTDL chốt kỳ Đạt (ETV.P34 Phụ lục II.2).");
    return ok("DAT", "Chốt kỳ đo — Đạt", null, { concludedAt: new Date(), trend: input.trend ?? null });
  }

  // Nhánh Không đạt — QLCL kết thúc, quyết định mở KPH (ETV.P34 Phụ lục II.2)
  if (u.m34Role !== "QLCL") return err("FORBIDDEN", "Nhánh Không đạt do QLCL kết luận và quyết định mở KPH (ETV.P34 Phụ lục II.2).");
  if (!input.belowThresholdCase)
    return err("CASE_REQUIRED", "Không đạt bắt buộc chọn tình huống xử lý theo ETV.P34 §6.4.4 (R15).");
  if (!input.remediationPlan?.trim())
    return err("REMEDIATION_REQUIRED", "Không đạt bắt buộc kế hoạch khắc phục trong 15 ngày làm việc (R15 — ETV.P34 §6.4.4).");
  if (q.previousFailed && !input.capaRef?.trim())
    return err("CAPA_REQUIRED", "Dưới ngưỡng 02 kỳ liên tiếp — bắt buộc mở KPH theo ETV.P13 (R15 — ETV.P34 §6.4.4).");
  const patch: Record<string, unknown> = {
    concludedAt: new Date(),
    belowThresholdCase: input.belowThresholdCase,
    remediationPlan: input.remediationPlan,
    remediationDue: new Date(Date.now() + 21 * 86_400_000), // 15 ngày làm việc ≈ 21 ngày lịch (đề xuất dự thảo)
    capaRef: input.capaRef ?? null,
    trend: input.trend ?? null,
  };
  // R14/R15 — cờ dừng sử dụng đặt trên tập khi vi phạm sàn hoặc ảnh hưởng kết quả đã phát hành
  const suspend = floorViolated || input.belowThresholdCase === "ANH_HUONG_KET_QUA_DA_PHAT_HANH";
  return ok("KHONG_DAT", "Chốt kỳ đo — Không đạt", null, { ...patch, __suspendUse: suspend });
}

// ---------- Hiệu chỉnh dữ liệu (R11, R12) ----------

export interface CorrectionForRules {
  status: M34CorrectionStatus;
  publishedImpact: M34PublishedImpact | null;
  validityRef: string | null;
  validityConclusion: string | null;
  requestedById: string;
  ownerId: string; // CSHDL của tập
}

export function validateCorrectionInput(input: { recordPointer: string; oldValue: string; newValue: string; correctionReason: string }): string | null {
  if (!input.recordPointer.trim()) return "Bắt buộc chỉ rõ bản ghi, trường dữ liệu cần hiệu chỉnh.";
  if (!input.oldValue.trim()) return "Bắt buộc giá trị trước — dữ liệu gốc không bị xóa, hồ sơ phải giữ giá trị cũ (R11 — ETV.P34 §6.3.1).";
  if (!input.newValue.trim()) return "Bắt buộc giá trị sau.";
  if (!input.correctionReason.trim()) return "Bắt buộc lý do hiệu chỉnh (R11 — ETV.P34 §6.3.1).";
  return null;
}

// Bước xem xét ảnh hưởng (ETV.P34 §6.3.2 bước 2) — QTDL/CSHDL của tập
export function txAssessCorrection(c: CorrectionForRules, u: M34ActorUser, stewardId: string, publishedImpact: M34PublishedImpact): TxResult {
  if (c.status !== "MOI" && c.status !== "DANG_XEM_XET") return err("BAD_STATE", "Đề nghị không ở bước xem xét ảnh hưởng.");
  if (u.id !== stewardId && u.id !== c.ownerId && u.m34Role !== "QLCL")
    return err("FORBIDDEN", "Xem xét ảnh hưởng do QTDL/CSHDL của tập thực hiện (ETV.P34 §6.3.2 bước 2).");
  if (publishedImpact === "DA_DUNG_PHAT_HANH")
    return ok("CHO_KET_LUAN_P10_P11", "Đã dùng phát hành — chuyển ETV.P10/P11 kết luận hiệu lực trước", null, { publishedImpact });
  return ok("DANG_XEM_XET", "Xem xét ảnh hưởng — chưa dùng phát hành, sẵn sàng thực hiện", null, { publishedImpact });
}

export function txAttachValidity(c: CorrectionForRules, u: M34ActorUser, validityRef: string, conclusion: string): TxResult {
  if (c.status !== "CHO_KET_LUAN_P10_P11") return err("BAD_STATE", "Đề nghị không ở bước chờ kết luận ETV.P10/P11.");
  if (u.m34Role !== "QLCL") return err("FORBIDDEN", "QLCL là đầu mối chuyển và nhận kết luận từ ETV.P10/P11 (ETV.P34 §6.3.2 bước 3).");
  if (!validityRef.trim()) return err("VALIDITY_REF_REQUIRED", "Bắt buộc số hồ sơ kết luận bên M10/M11.");
  if (conclusion !== "CON_HIEU_LUC" && conclusion !== "THU_HOI_PHAT_HANH_LAI") return err("BAD_CONCLUSION", "Kết luận không hợp lệ.");
  return ok("CHO_KET_LUAN_P10_P11", "Ghi kết luận hiệu lực kết quả từ M10/M11", null, {
    validityRef,
    validityConclusion: conclusion,
  });
}

// R12 — chặn cứng: đã dùng phát hành mà chưa có kết luận thì không thực hiện hiệu chỉnh
export function txPerformCorrection(c: CorrectionForRules, u: M34ActorUser, stewardId: string, correctionRecordId: string, capaRef?: string | null): TxResult {
  if (c.status !== "DANG_XEM_XET" && c.status !== "CHO_KET_LUAN_P10_P11")
    return err("BAD_STATE", "Đề nghị chưa qua bước xem xét ảnh hưởng hoặc đã kết thúc.");
  if (u.id !== stewardId && u.m34Role !== "QTDL")
    return err("FORBIDDEN", "QTDL thực hiện hiệu chỉnh bằng bản ghi mới (ETV.P34 §6.3.2 bước 4).");
  if (c.publishedImpact === "DA_DUNG_PHAT_HANH" && (!c.validityRef || !c.validityConclusion))
    return err(
      "VALIDITY_REQUIRED",
      "Chặn: dữ liệu đã dùng phát hành kết quả — phải có kết luận của ETV.P10/P11 trước khi hiệu chỉnh có hiệu lực (R12 — ETV.P34 §6.3.2 bước 3, Phụ lục I.2).",
    );
  if (!correctionRecordId.trim())
    return err("RECORD_ID_REQUIRED", "Bắt buộc mã bản ghi hiệu chỉnh mới — hiệu chỉnh bằng bản ghi mới, giữ nguyên giá trị cũ (R11).");
  return ok("DA_HIEU_CHINH", "Thực hiện hiệu chỉnh — giá trị cũ giữ nguyên trong hồ sơ", null, {
    correctionRecordId,
    performedById: u.id,
    performedAt: new Date(),
    capaRef: capaRef ?? null,
  });
}

export function txRejectCorrection(c: CorrectionForRules, u: M34ActorUser, reason?: string): TxResult {
  if (c.status === "DA_HIEU_CHINH" || c.status === "TU_CHOI") return err("BAD_STATE", "Đề nghị đã kết thúc.");
  const needLdv = c.publishedImpact === "DA_DUNG_PHAT_HANH";
  if (needLdv && u.m34Role !== "LDV")
    return err("FORBIDDEN", "Đề nghị ảnh hưởng kết quả đã phát hành — LĐV quyết định (ETV.P34 Phụ lục II.2).");
  if (!needLdv && u.id !== c.ownerId && u.m34Role !== "LDV")
    return err("FORBIDDEN", "CSHDL của tập (hoặc LĐV) mới được từ chối đề nghị hiệu chỉnh (ETV.P34 Phụ lục II.2).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Từ chối bắt buộc nhập lý do (ETV.P34 Phụ lục II.2).");
  return ok("TU_CHOI", "Từ chối đề nghị hiệu chỉnh", reason);
}

// ---------- Khai thác, chia sẻ (R17, R18, R19) ----------

export interface SharingForRules {
  status: M34SharingStatus;
  requestType: M34SharingType;
  hasPersonalData: boolean; // của tập
  requesterId: string;
  atttOpinionById: string | null;
  approvedById: string | null;
  ownerId: string; // CSHDL của tập
  minScopeLimited: boolean;
  minAnonymized: boolean;
  minAnonymizeNA: string | null;
}

// R18/R19 — loại định kỳ – tự động không đi luồng phiếu; hướng dẫn thiết lập điểm tích hợp M37
export function validateSharingCreate(input: { requestType: M34SharingType; recipient?: string | null; purpose: string; scopeNote: string; channel: string }): string | null {
  if (input.requestType === "DINH_KY_TU_DONG")
    return "Chia sẻ định kỳ, tự động với bên nhận cố định thiết lập thành ĐIỂM TÍCH HỢP theo ETV.P37 — phê duyệt một lần, rà soát theo chu kỳ, không lập phiếu cho từng lần chuyển (ETV.P34 §6.5.2).";
  if (!input.purpose.trim()) return "Bắt buộc mục đích sử dụng.";
  if (!input.scopeNote.trim()) return "Bắt buộc phạm vi dữ liệu: liệt kê trường, khoảng thời gian, số lượng bản ghi (ETV.P34 §6.5.2 bước 1).";
  if (!input.channel.trim()) return "Bắt buộc hình thức, kênh chuyển (ETV.P34 §6.5.2 bước 1).";
  if (input.requestType === "RA_NGOAI_VIEN" && !input.recipient?.trim()) return "Chia sẻ ra ngoài Viện bắt buộc ghi rõ bên nhận.";
  // R19 — bộ mẫu kênh cá nhân/dịch vụ chưa phê duyệt (ETV.P34 §6.5.3 — cấm tuyệt đối)
  const banned = /(gmail\.com|yahoo\.com|zalo|telegram|whatsapp|drive\s*cá\s*nhân|dropbox\s*cá\s*nhân|chatgpt|claude\.ai|gemini)/i;
  if (banned.test(input.channel))
    return "Cấm tuyệt đối chuyển dữ liệu qua kênh cá nhân hoặc dịch vụ chưa được phê duyệt — thư điện tử cá nhân, lưu trữ đám mây cá nhân, ứng dụng nhắn tin cá nhân, dịch vụ AI công cộng (R19 — ETV.P34 §6.5.3).";
  return null;
}

export function txSubmitSharing(s: SharingForRules): TxResult {
  if (s.status !== "DRAFT") return err("BAD_STATE", "Phiếu không ở trạng thái Nháp.");
  if (s.requestType === "RA_NGOAI_VIEN" || s.hasPersonalData)
    return ok("CHO_Y_KIEN_ATTT", "Gửi xin ý kiến PT.ATTT — bắt buộc với chia sẻ ra ngoài và dữ liệu cá nhân");
  return ok("CHO_PHE_DUYET", "Gửi phê duyệt — khai thác nội bộ");
}

export function txAtttOpinion(
  s: SharingForRules,
  u: M34ActorUser,
  accept: boolean,
  input: { note?: string | null; minScopeLimited: boolean; minAnonymized: boolean; minAnonymizeNA?: string | null },
): TxResult {
  if (s.status !== "CHO_Y_KIEN_ATTT") return err("BAD_STATE", "Phiếu không ở bước chờ ý kiến PT.ATTT.");
  if (u.m34Role !== "ATTT") return err("FORBIDDEN", "Chỉ PT.ATTT cho ý kiến về căn cứ và biện pháp giảm thiểu (ETV.P34 §5.2).");
  if (!accept) {
    if (!input.note?.trim()) return err("REASON_REQUIRED", "Không chấp nhận bắt buộc nêu lý do.");
    return ok("TU_CHOI", "PT.ATTT không chấp nhận", input.note);
  }
  // R18 — không giới hạn phạm vi trường, không ẩn danh khi có biện pháp khả thi ⇒ không chấp nhận (Phụ lục I.2)
  if (!input.minScopeLimited)
    return err("MIN_SCOPE_REQUIRED", "Phải giới hạn chia sẻ ở trường cần thiết — thiếu biện pháp giảm thiểu thì không chấp nhận (R18 — ETV.P34 Phụ lục I.2).");
  if (!input.minAnonymized && !input.minAnonymizeNA?.trim())
    return err(
      "MIN_ANON_REQUIRED",
      "Phải ẩn danh/giả danh, hoặc ghi rõ lý do không áp dụng được (R18 — ETV.P34 §6.5.2 bước 3).",
    );
  return ok("CHO_PHE_DUYET", "PT.ATTT chấp nhận kèm biện pháp giảm thiểu", input.note ?? null, {
    atttOpinionById: u.id,
    atttOpinionAt: new Date(),
    atttOpinionNote: input.note ?? null,
    minScopeLimited: input.minScopeLimited,
    minAnonymized: input.minAnonymized,
    minAnonymizeNA: input.minAnonymizeNA ?? null,
  });
}

export function txApproveSharing(s: SharingForRules, u: M34ActorUser, pass: boolean, reason?: string): TxResult {
  if (s.status !== "CHO_PHE_DUYET") return err("BAD_STATE", "Phiếu không ở bước Chờ phê duyệt.");
  if (s.requestType === "RA_NGOAI_VIEN") {
    if (u.m34Role !== "LDV") return err("FORBIDDEN", "Chia sẻ ra ngoài Viện là thẩm quyền LĐV, không ủy quyền (R18 — ETV.P34 §5.1).");
    if (!s.atttOpinionById)
      return err("ATTT_REQUIRED", "Thiếu ý kiến PT.ATTT — điều kiện chặn cứng với chia sẻ ra ngoài (ETV.P34 Phụ lục I.1 điều kiện 6).");
  } else {
    if (u.id !== s.ownerId) return err("FORBIDDEN", "Khai thác nội bộ vượt quyền do CSHDL của tập phê duyệt (R17 — ETV.P34 §6.5.1).");
  }
  if (u.id === s.requesterId) return err("SELF_APPROVE", "Người đề nghị không được tự phê duyệt (ETV.P34 §5.3).");
  if (pass) return ok("DA_PHE_DUYET", "Phê duyệt chia sẻ", null, { approvedById: u.id, approvedAt: new Date() });
  if (!reason?.trim()) return err("REASON_REQUIRED", "Từ chối bắt buộc nhập lý do (ETV.P34 Phụ lục II.2).");
  return ok("TU_CHOI", "Từ chối chia sẻ", reason);
}

export function txExecuteSharing(s: SharingForRules, u: M34ActorUser, logRef?: string | null): TxResult {
  if (s.status !== "DA_PHE_DUYET") return err("BAD_STATE", "Phiếu chưa được phê duyệt.");
  if (u.m34Role !== "QTDL" && u.m34Role !== "QTHT")
    return err("FORBIDDEN", "QTDL/QTHT thực hiện trích xuất, chuyển giao theo phạm vi đã duyệt (ETV.P34 §6.5.2 bước 5).");
  if (u.id === s.approvedById) return err("SELF_EXECUTE", "Người thực hiện trích xuất không được là người phê duyệt (ETV.P34 §5.3).");
  if (!logRef?.trim()) return err("LOG_REQUIRED", "Bắt buộc ghi nhật ký chuyển giao (ETV.P34 §6.5.2 bước 5).");
  return ok("DA_THUC_HIEN", "Đã trích xuất, chuyển giao đúng phạm vi và kênh", null, {
    executedById: u.id,
    executedAt: new Date(),
    logRef,
  });
}

export function txRevokeSharing(s: SharingForRules, u: M34ActorUser, evidenceRef?: string | null): TxResult {
  if (s.status !== "DA_THUC_HIEN") return err("BAD_STATE", "Chỉ thu hồi phiếu đã thực hiện.");
  if (u.id !== s.ownerId && u.m34Role !== "QLCL")
    return err("FORBIDDEN", "CSHDL theo dõi thời hạn và thu hồi (ETV.P34 §6.5.2 bước 6).");
  if (!evidenceRef?.trim())
    return err("EVIDENCE_REQUIRED", "Bắt buộc bằng chứng bên nhận đã xóa hoặc trả lại dữ liệu (R18 — ETV.P34 §6.5.2 bước 6).");
  return ok("DA_THU_HOI", "Đã thu hồi — bên nhận xóa/trả dữ liệu", null, {
    revokeRequestedAt: new Date(),
    revokeEvidenceRef: evidenceRef,
  });
}

// ---------- Dữ liệu cho AI (R22) ----------

// R22 — Hạn chế/Mật không vào hệ thống AI dưới mọi hình thức (ETV.P28 mục 5.13, ETV.P26 mục 5.5 —
// đã ban hành; quy tắc gốc ETV.P29 mục 5.5; ETV.P34 §6.8 + Phụ lục I.2: cấm tuyệt đối).
export function validateAICreate(classification: Classification, aiaRef?: string | null): string | null {
  if (classification === "HAN_CHE" || classification === "MAT")
    return "Cấm tuyệt đối: dữ liệu mức Hạn chế/Mật không được đưa vào hệ thống AI dưới mọi hình thức — không lập chỉ mục, không đưa vào lời nhắc, không truy xuất trực tiếp (R22 — ETV.P34 §6.8; ETV.P28 mục 5.13).";
  if (!aiaRef?.trim()) return "Bắt buộc hồ sơ đánh giá tác động AI theo ETV.P29 (R22 — ETV.P34 §6.8 điều kiện 3).";
  return null;
}

export function txApproveAI(a: { status: string; atttOpinionById: string | null; aiaRef: string }, u: M34ActorUser, pass: boolean, reason?: string): TxResult {
  if (a.status !== "DE_NGHI") return err("BAD_STATE", "Hồ sơ không ở bước Đề nghị.");
  if (u.m34Role !== "LDV") return err("FORBIDDEN", "Cho phép dùng dữ liệu cho hệ thống AI là thẩm quyền LĐV, không ủy quyền (ETV.P34 §5.1).");
  if (pass) {
    if (!a.atttOpinionById) return err("ATTT_REQUIRED", "Thiếu ý kiến PT.ATTT (R22 — ETV.P34 §6.8 điều kiện 2).");
    if (!a.aiaRef?.trim()) return err("AIA_REQUIRED", "Thiếu hồ sơ AIA theo ETV.P29 (R22 — ETV.P34 §6.8 điều kiện 3).");
    return ok("DA_PHE_DUYET", "LĐV phê duyệt dùng dữ liệu cho hệ thống AI", null, { approvedById: u.id, approvedAt: new Date() });
  }
  if (!reason?.trim()) return err("REASON_REQUIRED", "Từ chối bắt buộc nhập lý do.");
  return ok("THU_HOI", "LĐV từ chối", reason);
}

export function txRevokeAI(a: { status: string }, u: M34ActorUser, reason?: string): TxResult {
  if (a.status !== "DA_PHE_DUYET") return err("BAD_STATE", "Chỉ thu hồi hồ sơ đã phê duyệt.");
  if (u.m34Role !== "LDV" && u.m34Role !== "ATTT")
    return err("FORBIDDEN", "LĐV hoặc PT.ATTT thu hồi quyền dùng dữ liệu cho AI (ETV.P34 §6.8).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Thu hồi bắt buộc nhập lý do.");
  return ok("THU_HOI", "Thu hồi — hệ thống AI phải ngừng truy xuất tập này", reason);
}

// ---------- Cờ đến hạn — TÍNH KHI ĐỌC, không lưu cột (ETV.P34 Phụ lục II.1) ----------

export function isReviewDue(reviewCycle: string, lastReviewedAt: Date | null, createdAt: Date, now: Date = new Date()): boolean {
  const days = REVIEW_CYCLE_DAYS[reviewCycle] ?? 365;
  const base = lastReviewedAt ?? createdAt;
  return (now.getTime() - base.getTime()) / 86_400_000 > days;
}

// R8 — số chu kỳ rà soát đã trôi qua; ≥ 2 với tập chứa dữ liệu cá nhân ⇒ báo cáo LĐV
export function reviewOverdueCycles(reviewCycle: string, lastReviewedAt: Date | null, createdAt: Date, now: Date = new Date()): number {
  const days = REVIEW_CYCLE_DAYS[reviewCycle] ?? 365;
  const base = lastReviewedAt ?? createdAt;
  return Math.floor((now.getTime() - base.getTime()) / 86_400_000 / days);
}

export function isQualityDue(dataGroup: M34DataGroup, lastMeasuredAt: Date | null, activeSince: Date, now: Date = new Date()): boolean {
  const days = QUALITY_CYCLE_DAYS[dataGroup];
  if (days === null) return false; // nhóm AI: đo trước mỗi lần cập nhật, không theo lịch
  const base = lastMeasuredAt ?? activeSince;
  return (now.getTime() - base.getTime()) / 86_400_000 > days;
}
