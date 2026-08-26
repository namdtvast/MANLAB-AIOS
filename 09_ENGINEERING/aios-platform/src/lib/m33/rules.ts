// M33 — gate/state machine thuần hàm, AUTHORITATIVE.
//
// NGUỒN QUY ĐỊNH: Thủ tục ETV.P33 — 03_MANAGEMENT_SYSTEM/02_P/ETV.P33_QuanLyHeThongThongTin.md
// (DỰ THẢO lần BH 01, Chờ soát xét). Diễn giải nghiệp vụ đầy đủ:
// 05_MODULE_LIBRARY/M33_HeThongTT/01_Requirement/DacTa.md mục 5 (quy tắc R1–R22).
// Giá trị định lượng (mốc vá 07/30/90 ngày, SLA sự cố, 30 ngày kiểm kê, chu kỳ đối chiếu)
// là đề xuất của dự thảo — Viện đổi khi phê duyệt theo MP14 thì sửa file này theo
// (DacTa M33 mục 10 "Còn phải chốt trước khi BUILD" điểm 1).
import type {
  M33AssetClass,
  M33AssetStatus,
  M33Criticality,
  M33Impact,
  M33IncidentStatus,
  M33MaintenanceCycle,
  M33MaintenanceType,
  M33Priority,
  M33Severity,
  M33TaskStatus,
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

export interface M33ActorUser {
  id: string;
  m33Role: string | null; // QTHT / ATTT / VP / TP / QLCL / LDV — vai trò toàn cục qua ModuleRoleAssignment
}

// ---------- Danh mục chuẩn suy từ lớp tài sản (DacTa mục 4) ----------

// Thiết bị đầu cuối và máy chủ — diện áp cấu hình an toàn cơ sở (R3 — ETV.P28 mục 5.7.2, ETV.P33 §6.2.3)
export const ENDPOINT_CLASSES: M33AssetClass[] = ["MAY_TRAM", "THIET_BI_DI_DONG", "MAY_TINH_DIEU_KHIEN_DO"];
export const SERVER_CLASSES: M33AssetClass[] = ["MAY_CHU"];

// R19 — tài sản có hệ điều hành/phần mềm nền: bắt buộc thuộc kế hoạch bảo trì năm đã phê duyệt
export const PLAN_REQUIRED_CLASSES: M33AssetClass[] = [
  "MAY_CHU",
  "MAY_TRAM",
  "THIET_BI_DI_DONG",
  "MAY_TINH_DIEU_KHIEN_DO",
  "THIET_BI_MANG",
];

// Mốc hoàn thành vá lỗi bảo mật theo mức nghiêm trọng — ETV.P33 §6.3.3 (mục 4.3 DacTa, đề xuất dự thảo)
export const PATCH_DUE_DAYS: Record<M33Severity, number | null> = {
  NGHIEM_TRONG: 7, // chưa vá được ⇒ biện pháp giảm thiểu tạm thời trong 48 giờ
  CAO: 30,
  TRUNG_BINH: 90,
  THAP: null, // theo chu kỳ bảo trì kế tiếp
};

export const MAINTENANCE_CYCLE_DAYS: Record<M33MaintenanceCycle, number | null> = {
  THANG: 30,
  QUY: 90,
  SAU_THANG: 180,
  NAM: 365,
  THEO_KHUYEN_CAO_HANG: null,
};

// ---------- R7 — không lưu bí mật xác thực (cấm tuyệt đối, chặn ngay khi lưu) ----------
// Kiểm tra mẫu trên trường tự do của ITAsset, SystemAccount, ITIncident (Phụ lục I.1 điều kiện 7).
export function detectSecretPatterns(text: string | null | undefined): string[] {
  if (!text) return [];
  const found: string[] = [];
  if (/(password|passwd|pwd|mật khẩu|mat khau|token|api[_-]?key|secret|private[_-]?key)\s*[:=]\s*\S{4,}/i.test(text))
    found.push("chuỗi dạng khóa/mật khẩu gán giá trị");
  if (/\bAKIA[0-9A-Z]{16}\b/.test(text)) found.push("chuỗi giống khóa truy cập AWS");
  if (/\b[A-Za-z0-9+/]{40,}={0,2}\b/.test(text)) found.push("chuỗi base64 dài bất thường");
  if (/\b[0-9a-f]{32,}\b/i.test(text)) found.push("chuỗi hex dài (giống token/hash bí mật)");
  return found;
}

// ---------- ITAsset — khai báo → soát xét → phê duyệt → vận hành → thanh lý ----------

export interface AssetForRules {
  status: M33AssetStatus;
  assetClass: M33AssetClass;
  userOwnerId: string | null;
  custodianId: string | null;
  criticality: M33Criticality;
  maxClassification: Classification;
  diskEncryption: boolean;
  screenLock: boolean | null;
  antimalware: boolean | null;
  defaultPasswordChanged: boolean | null;
  unusedServicesClosed: boolean | null;
  isPersonalDevice: boolean;
  byodApprovalRef: string | null;
  licenseType: string | null;
  licenseExpiry: Date | null;
  measuringDeviceRef: string | null;
  recoveryTimeObjective: string | null;
  failoverPlan: string | null;
  riskRefs: string[];
  platformRefs: string[];
  infoAssetRefs: string[];
  disposalEvidenceRef: string | null;
  createdById: string;
}

export const EDITABLE_ASSET: M33AssetStatus[] = ["DRAFT", "REVIEW_REJECTED", "APPROVAL_REJECTED"];
export const canEditAsset = (s: M33AssetStatus) => EDITABLE_ASSET.includes(s);

const isEndpoint = (c: M33AssetClass) => ENDPOINT_CLASSES.includes(c);
const isServerOrEndpoint = (c: M33AssetClass) => isEndpoint(c) || SERVER_CLASSES.includes(c);

// R1 + R4 + R7 — điều kiện tối thiểu để bản ghi tồn tại (chặn ngay khi lưu, không đợi phê duyệt)
export function validateAssetInput(input: {
  name: string;
  location: string;
  assetClass: M33AssetClass;
  userOwnerId?: string | null;
  custodianId?: string | null;
  measuringDeviceRef?: string | null;
  freeTexts?: (string | null | undefined)[];
}): string | null {
  if (!input.name.trim()) return "Bắt buộc tên định danh tài sản.";
  if (!input.location.trim()) return "Bắt buộc vị trí vật lý hoặc nhà cung cấp đám mây (ETV.P33 §6.1.1).";
  if (!input.userOwnerId)
    return "Không có hạ tầng vô chủ: bắt buộc người/đơn vị sử dụng (R1 — ETV.P33 Phụ lục I.1 điều kiện 1).";
  if (!input.custodianId)
    return "Không có hạ tầng vô chủ: bắt buộc chủ quản trị kỹ thuật — QTHT (R1 — ETV.P33 Phụ lục I.1 điều kiện 1).";
  if (input.assetClass === "MAY_TINH_DIEU_KHIEN_DO" && !input.measuringDeviceRef?.trim())
    return "Máy tính điều khiển – thu thập dữ liệu bắt buộc trỏ thiết bị đo được phục vụ — M05 (R4).";
  for (const t of input.freeTexts ?? []) {
    const hits = detectSecretPatterns(t);
    if (hits.length > 0)
      return `Cấm tuyệt đối lưu bí mật xác thực trong bản ghi: phát hiện ${hits.join("; ")} — chỉ ghi NƠI LƯU và NGƯỜI CẤP PHÁT (R7 — ETV.P33 Phụ lục I.1 điều kiện 7).`;
  }
  return null;
}

// R3 — cấu hình an toàn cơ sở còn thiếu (ETV.P28 mục 5.7.2; kiểm chứng tại ETV.P33 §6.2.3)
export function baselineIssues(a: AssetForRules): string[] {
  const issues: string[] = [];
  if (isServerOrEndpoint(a.assetClass)) {
    if (!a.defaultPasswordChanged) issues.push("chưa đổi mật khẩu mặc định");
    if (!a.unusedServicesClosed) issues.push("chưa đóng dịch vụ không dùng đến");
  }
  if (isEndpoint(a.assetClass)) {
    if (!a.screenLock) issues.push("chưa bật khóa màn hình tự động");
    if (!a.antimalware) issues.push("chưa có phần mềm phòng chống mã độc đang hoạt động");
  }
  if ((a.maxClassification === "HAN_CHE" || a.maxClassification === "MAT") && !a.diskEncryption)
    issues.push("thiết bị xử lý Hạn chế/Mật chưa mã hóa ổ đĩa");
  return issues;
}

export function txSubmitAsset(a: AssetForRules): TxResult {
  if (!canEditAsset(a.status)) return err("BAD_STATE", "Chỉ bản ghi Nháp/Không soát xét/Không phê duyệt mới gửi soát xét được.");
  const issues = baselineIssues(a);
  if (issues.length > 0)
    return err("BASELINE_REQUIRED", `Chưa áp đủ cấu hình an toàn cơ sở: ${issues.join("; ")} (R3 — ETV.P33 §6.2.3).`);
  return ok("PENDING_REVIEW", "Gửi soát xét");
}

// PT.ATTT soát xét cấu hình an toàn, vùng mạng, mức phân loại tối đa — ≠ người lập (Phụ lục II.1)
export function txReviewAsset(a: AssetForRules, u: M33ActorUser, pass: boolean, reason?: string): TxResult {
  if (a.status !== "PENDING_REVIEW") return err("BAD_STATE", "Bản ghi không ở bước Chờ soát xét.");
  if (u.m33Role !== "ATTT") return err("FORBIDDEN", "Chỉ PT.ATTT soát xét cấu hình an toàn, vùng mạng, mức phân loại (ETV.P33 Phụ lục II.1).");
  if (u.id === a.createdById) return err("SELF_REVIEW", "Người lập không được tự soát xét bản ghi của mình (R13 — ETV.P33 §5.3).");
  if (pass) return ok("PENDING_APPROVAL", "Soát xét đạt", null, { reviewedById: u.id, reviewedAt: new Date() });
  if (!reason?.trim()) return err("REASON_REQUIRED", "Trả lại ở bước soát xét bắt buộc nhập lý do (ETV.P33 Phụ lục II.1).");
  return ok("REVIEW_REJECTED", "Soát xét không đạt", reason, { reviewedById: u.id, reviewedAt: new Date() });
}

// LĐV phê duyệt — chặn theo ETV.P33 Phụ lục I.1 (R1, R3, R21, BYOD, tài sản trọng yếu Cao)
export function txApproveAsset(a: AssetForRules, u: M33ActorUser, pass: boolean, reason?: string): TxResult {
  if (a.status !== "PENDING_APPROVAL") return err("BAD_STATE", "Bản ghi không ở bước Chờ phê duyệt.");
  if (u.m33Role !== "LDV") return err("FORBIDDEN", "Chỉ LĐV phê duyệt đưa tài sản vào vận hành (ETV.P33 Phụ lục II.1).");
  if (u.id === a.createdById) return err("SELF_APPROVE", "Người lập không được tự phê duyệt (R13 — ETV.P33 §5.3).");
  if (!pass) {
    if (!reason?.trim()) return err("REASON_REQUIRED", "Không phê duyệt bắt buộc nhập lý do.");
    return ok("APPROVAL_REJECTED", "LĐV không phê duyệt", reason);
  }
  const issues = baselineIssues(a);
  if (issues.length > 0)
    return err("BASELINE_REQUIRED", `Chặn phê duyệt — thiếu cấu hình an toàn cơ sở: ${issues.join("; ")} (R3 — ETV.P33 Phụ lục I.1).`);
  if (a.criticality === "CAO" && (!a.recoveryTimeObjective?.trim() || !a.failoverPlan?.trim() || a.riskRefs.length === 0))
    return err(
      "CRITICAL_REQUIREMENTS",
      "Tài sản trọng yếu Cao bắt buộc RTO, phương án dự phòng và ≥ 01 rủi ro đã mở ở M01/M28 (ETV.P33 Phụ lục I.1 điều kiện 5).",
    );
  if (a.assetClass === "PHAN_MEM_BAN_QUYEN") {
    if (!a.licenseType?.trim() || !a.licenseExpiry)
      return err("LICENSE_REQUIRED", "Phần mềm bắt buộc giấy phép sử dụng hợp lệ trước khi phê duyệt (R21 — ETV.P33 §6.2.5).");
    if (a.licenseExpiry < new Date())
      return err("LICENSE_EXPIRED", "Giấy phép phần mềm đã hết hiệu lực — không phê duyệt được (R21 — ETV.P33 Phụ lục I.1).");
  }
  if (a.isPersonalDevice && (a.maxClassification === "HAN_CHE" || a.maxClassification === "MAT")) {
    if (!a.byodApprovalRef?.trim() || a.riskRefs.length === 0)
      return err(
        "BYOD_APPROVAL_REQUIRED",
        "Thiết bị cá nhân xử lý Hạn chế/Mật phải có phê duyệt LĐV và rủi ro tương ứng ở M28 (ETV.P33 §6.2.4).",
      );
  }
  return ok("OPERATING", "LĐV phê duyệt — Đang vận hành", null, {
    approvedById: u.id,
    approvedAt: new Date(),
    commissionedAt: new Date(),
  });
}

export function txSuspendAsset(a: AssetForRules, u: M33ActorUser, reason?: string): TxResult {
  if (a.status !== "OPERATING") return err("BAD_STATE", "Chỉ tài sản Đang vận hành mới Tạm ngừng được.");
  if (u.m33Role !== "QTHT") return err("FORBIDDEN", "QTHT thực hiện tạm ngừng khi bảo trì lớn/sự cố (ETV.P33 Phụ lục II.1).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Tạm ngừng bắt buộc nhập lý do.");
  return ok("SUSPENDED", "Tạm ngừng — bảo trì/sửa chữa", reason);
}

export function txResumeAsset(a: AssetForRules, u: M33ActorUser): TxResult {
  if (a.status !== "SUSPENDED") return err("BAD_STATE", "Tài sản không ở trạng thái Tạm ngừng.");
  if (u.m33Role !== "QTHT") return err("FORBIDDEN", "QTHT đưa tài sản trở lại vận hành.");
  return ok("OPERATING", "Trở lại Đang vận hành");
}

// Ngừng vận hành — chặn khi còn đối tượng phụ thuộc: nền tảng M35, dữ liệu M27, thiết bị đo M05 (§6.6.1 bước 2)
export function txRetireAsset(a: AssetForRules, u: M33ActorUser, reason?: string): TxResult {
  if (a.status !== "OPERATING" && a.status !== "SUSPENDED") return err("BAD_STATE", "Chỉ tài sản đang vận hành/tạm ngừng mới ngừng vận hành được.");
  if (u.m33Role !== "QTHT") return err("FORBIDDEN", "QTHT thực hiện ngừng vận hành (ETV.P33 Phụ lục II.1).");
  const deps: string[] = [];
  if (a.platformRefs.length > 0) deps.push(`còn nền tảng số phụ thuộc (M35): ${a.platformRefs.join(", ")}`);
  if (a.infoAssetRefs.length > 0) deps.push(`còn tài sản thông tin đang lưu (M27): ${a.infoAssetRefs.join(", ")}`);
  if (a.measuringDeviceRef?.trim()) deps.push(`còn thiết bị đo được phục vụ (M05): ${a.measuringDeviceRef}`);
  if (deps.length > 0)
    return err("DEPENDENTS_EXIST", `Chặn ngừng vận hành — ${deps.join("; ")}. Xử lý xong thì gỡ tham chiếu rồi thao tác lại (ETV.P33 §6.6.1 bước 2).`);
  if (!reason?.trim()) return err("REASON_REQUIRED", "Ngừng vận hành bắt buộc nhập lý do (ETV.P33 Phụ lục II.1).");
  return ok("RETIRED", "Ngừng vận hành — chưa thanh lý, dữ liệu chưa xử lý xong", reason);
}

// Thanh lý — LĐV; chặn khi thiếu bằng chứng xóa dữ liệu an toàn (← M27) hoặc còn tài khoản hoạt động (R10)
export function txDisposeAsset(a: AssetForRules, u: M33ActorUser, activeAccountCount: number, reason?: string): TxResult {
  if (a.status !== "RETIRED") return err("BAD_STATE", "Thanh lý đi từ trạng thái Ngừng vận hành (ETV.P33 Phụ lục II.1).");
  if (u.m33Role !== "LDV") return err("FORBIDDEN", "Thanh lý/chuyển giao là thẩm quyền LĐV (ETV.P33 Phụ lục II.1).");
  if (!a.disposalEvidenceRef?.trim())
    return err(
      "DISPOSAL_EVIDENCE_REQUIRED",
      "Chặn: thiếu bằng chứng xóa dữ liệu an toàn — biên bản hủy theo ETV.P27. Không thiết bị nào rời tay Viện khi dữ liệu chưa xóa an toàn (R10 — ETV.P28 mục 5.7.2).",
    );
  if (activeAccountCount > 0)
    return err("ACCOUNTS_ACTIVE", `Chặn: còn ${activeAccountCount} tài khoản chưa thu hồi gắn với tài sản (ETV.P33 §6.6.1 bước 4).`);
  if (!reason?.trim()) return err("REASON_REQUIRED", "Thanh lý bắt buộc nhập lý do.");
  return ok("DISPOSED", "Đã thanh lý — bản ghi kiểm kê vẫn giữ, mã không cấp lại (R22)", reason);
}

export function txCancelAsset(a: AssetForRules, u: M33ActorUser, reason?: string): TxResult {
  const preApproval: M33AssetStatus[] = ["DRAFT", "PENDING_REVIEW", "REVIEW_REJECTED", "PENDING_APPROVAL", "APPROVAL_REJECTED"];
  if (!preApproval.includes(a.status))
    return err("LOCKED", "Bản ghi đã phê duyệt không hủy được — tài sản hết dùng đi đường Ngừng vận hành → Thanh lý (ETV.P33 Phụ lục II.1).");
  if (u.m33Role !== "LDV") return err("FORBIDDEN", "Hủy bản ghi khai báo sai/trùng là thẩm quyền LĐV (ETV.P33 Phụ lục II.1).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Hủy bản ghi bắt buộc nhập lý do.");
  return ok("CANCELLED", "Hủy bản ghi (khai báo sai/trùng)", reason);
}

export function txMarkAssetReviewed(a: AssetForRules, u: M33ActorUser, custodianId: string): TxResult {
  if (a.status !== "OPERATING" && a.status !== "SUSPENDED") return err("BAD_STATE", "Chỉ rà soát tài sản đang vận hành/tạm ngừng.");
  if (u.id !== custodianId && u.m33Role !== "QTHT" && u.m33Role !== "VP")
    return err("FORBIDDEN", "Rà soát định kỳ do chủ quản trị (QTHT) hoặc VP thực hiện (ETV.P33 §6.1.4 bước 6).");
  return ok(a.status, "Xác nhận rà soát định kỳ: bản ghi còn đúng và còn cần thiết (R12)", null, { lastReviewedAt: new Date() });
}

export function txIsolateAsset(a: AssetForRules, u: M33ActorUser, reason?: string): TxResult {
  if (u.m33Role !== "QTHT" && u.m33Role !== "ATTT")
    return err("FORBIDDEN", "QTHT/PT.ATTT thực hiện ngắt tài sản khỏi mạng của Viện (ETV.P33 §6.7 bước 3).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Ngắt mạng bắt buộc nêu lý do (không đạt cấu hình an toàn cơ sở…).");
  return ok(a.status, "Ngắt khỏi mạng của Viện cho tới khi khắc phục", reason, { networkIsolated: true });
}

// ---------- Kế hoạch bảo trì năm (R19) ----------

export function txSubmitPlan(p: { status: string; scopeAssetCount: number }): TxResult {
  if (p.status !== "DRAFT") return err("BAD_STATE", "Chỉ kế hoạch Nháp mới trình được.");
  if (p.scopeAssetCount === 0)
    return err("SCOPE_REQUIRED", "Kế hoạch năm phải phủ tài sản có hệ điều hành/phần mềm nền — chưa chọn tài sản nào (R19 — ETV.P33 §6.3.1).");
  return ok("CHO_PHE_DUYET", "Trình LĐV phê duyệt kế hoạch bảo trì năm");
}

export function txApprovePlan(p: { status: string; createdById: string }, u: M33ActorUser, pass: boolean, reason?: string): TxResult {
  if (p.status !== "CHO_PHE_DUYET") return err("BAD_STATE", "Kế hoạch không ở bước Chờ phê duyệt.");
  if (u.m33Role !== "LDV") return err("FORBIDDEN", "Kế hoạch bảo trì năm do LĐV phê duyệt trước khi bắt đầu năm kế hoạch (R19 — ETV.P33 §6.3.1).");
  if (u.id === p.createdById) return err("SELF_APPROVE", "Người lập kế hoạch không được tự phê duyệt (R19).");
  if (pass) return ok("DA_PHE_DUYET", "LĐV phê duyệt kế hoạch bảo trì năm", null, { approvedById: u.id, approvedAt: new Date() });
  if (!reason?.trim()) return err("REASON_REQUIRED", "Không phê duyệt bắt buộc nhập lý do.");
  return ok("DRAFT", "Trả lại kế hoạch để sửa", reason);
}

// ---------- Bảo trì, vá lỗi (R4, R5, R8, R15) ----------

export interface TaskForRules {
  status: M33TaskStatus;
  taskType: M33MaintenanceType;
  severity: M33Severity | null;
  planId: string | null;
  planApproved: boolean; // kế hoạch trỏ tới đang DA_PHE_DUYET
  hasControlComputer: boolean; // trong assets có MAY_TINH_DIEU_KHIEN_DO
  changeRef: string | null;
  impactAssessmentRef: string | null;
  measurementImpactRef: string | null;
  emergencyOrderRef: string | null;
  performedById: string | null;
}

export function validateTaskInput(input: { taskType: M33MaintenanceType; severity?: M33Severity | null; assetCount: number; planId?: string | null }): string | null {
  if (input.assetCount === 0) return "Công việc bảo trì phải gắn với ít nhất 1 tài sản.";
  if (input.taskType === "VA_LOI_BAO_MAT" && !input.severity)
    return "Vá lỗi bảo mật bắt buộc mức nghiêm trọng — quyết định mốc 07/30/90 ngày (ETV.P33 §6.3.3).";
  if (input.taskType === "BAO_TRI_DINH_KY" && !input.planId)
    return "Bảo trì định kỳ phải thuộc kế hoạch bảo trì năm đã được LĐV phê duyệt (R19 — ETV.P33 §6.3.1).";
  return null;
}

export function patchDueAt(severity: M33Severity, from: Date): Date | null {
  const days = PATCH_DUE_DAYS[severity];
  return days === null ? null : new Date(from.getTime() + days * 86_400_000);
}

export function txStartTask(t: TaskForRules, u: M33ActorUser): TxResult {
  if (t.status !== "KE_HOACH") return err("BAD_STATE", "Công việc không ở trạng thái Kế hoạch.");
  if (u.m33Role !== "QTHT") return err("FORBIDDEN", "QTHT thực hiện bảo trì, vá lỗi (ETV.P33 §6.3.2).");
  if (t.taskType === "BAO_TRI_DINH_KY" && !t.planApproved)
    return err("PLAN_NOT_APPROVED", "Kế hoạch bảo trì năm chưa được LĐV phê duyệt — chưa thực hiện được (R19).");
  return ok("DANG_THUC_HIEN", "Bắt đầu thực hiện");
}

// Ghi nhận đã thực hiện → Chờ nghiệm thu. Chặn R4 (máy tính điều khiển thiết bị đo) và R5 (thay đổi qua M30 + đánh giá ATTT).
export function txPerformTask(
  t: TaskForRules,
  u: M33ActorUser,
  input: { result: string; evidenceRef?: string | null; postCheckResult?: string | null },
): TxResult {
  if (t.status !== "DANG_THUC_HIEN") return err("BAD_STATE", "Công việc chưa bắt đầu hoặc đã ghi nhận xong.");
  if (u.m33Role !== "QTHT") return err("FORBIDDEN", "QTHT ghi nhận kết quả thực hiện (ETV.P33 §6.3.2 bước 4).");
  if (t.hasControlComputer) {
    if (!t.changeRef?.trim() || !t.measurementImpactRef?.trim())
      return err(
        "CONTROL_COMPUTER_GATE",
        "Máy tính điều khiển thiết bị đo là vùng đặc biệt: bắt buộc phiếu thay đổi M30 VÀ đánh giá ảnh hưởng hiệu lực kết quả đo M10 TRƯỚC khi áp dụng (R4 — ETV.P28 mục 5.7.3; ETV.P33 §6.3.4).",
      );
    if (!input.postCheckResult?.trim())
      return err(
        "POST_CHECK_REQUIRED",
        "Sau khi áp dụng phải kiểm tra xác nhận hệ thống thu thập dữ liệu hoạt động đúng trước khi dùng lại (ETV.P33 §6.3.4).",
      );
  }
  if (t.changeRef?.trim() && !t.impactAssessmentRef?.trim())
    return err("IMPACT_ASSESSMENT_REQUIRED", "Thay đổi qua M30 bắt buộc kèm đánh giá ảnh hưởng an toàn thông tin trước triển khai (R5 — ETV.P28 mục 5.9).");
  if (t.emergencyOrderRef?.trim() && !t.changeRef?.trim())
    return err(
      "RETRO_CHANGE_REQUIRED",
      "Thay đổi khẩn cấp theo lệnh LĐV vẫn bắt buộc bổ sung phiếu thay đổi hồi tố ở M30 — thiếu là thay đổi âm thầm (ETV.P33 Phụ lục I.2).",
    );
  if (!input.evidenceRef?.trim()) return err("EVIDENCE_REQUIRED", "Bắt buộc bằng chứng: nhật ký công việc, ảnh, kết quả kiểm tra (ETV.P33 §6.3.2).");
  return ok("CHO_NGHIEM_THU", "Ghi nhận đã thực hiện — chờ nghiệm thu", null, {
    performedById: u.id,
    performedAt: new Date(),
    result: input.result,
    evidenceRef: input.evidenceRef,
    postCheckResult: input.postCheckResult ?? null,
  });
}

// R15 — nghiệm thu bởi người KHÁC người thực hiện (TP hoặc QTHT khác); không có đường thẳng sang Hoàn thành
export function txAcceptTask(t: TaskForRules, u: M33ActorUser): TxResult {
  if (t.status !== "CHO_NGHIEM_THU") return err("BAD_STATE", "Công việc chưa ở bước Chờ nghiệm thu.");
  if (u.m33Role !== "TP" && u.m33Role !== "QTHT")
    return err("FORBIDDEN", "Nghiệm thu do TP đơn vị sử dụng hoặc QTHT khác thực hiện (ETV.P33 §6.3.2 bước 5).");
  if (u.id === t.performedById)
    return err("SELF_ACCEPT", "Người nghiệm thu không được là người thực hiện chính công việc đó (R15 — ETV.P33 Phụ lục II.2).");
  return ok("HOAN_THANH", "Nghiệm thu — Hoàn thành", null, { acceptedById: u.id, acceptedAt: new Date() });
}

export function txCancelTask(t: TaskForRules, u: M33ActorUser, reason?: string): TxResult {
  if (t.status === "HOAN_THANH" || t.status === "HUY") return err("BAD_STATE", "Công việc đã kết thúc.");
  if (u.m33Role !== "QTHT" && u.m33Role !== "LDV") return err("FORBIDDEN", "QTHT (hoặc LĐV với vá lỗi Nghiêm trọng) hủy/hoãn công việc.");
  if (t.taskType === "VA_LOI_BAO_MAT" && t.severity === "NGHIEM_TRONG" && u.m33Role !== "LDV")
    return err("LDV_REQUIRED", "Hoãn/hủy vá lỗi mức Nghiêm trọng cần LĐV quyết định (ETV.P33 §6.3.3).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Hủy/hoãn bắt buộc nhập lý do (ETV.P33 Phụ lục II.2).");
  return ok("HUY", "Hủy công việc", reason);
}

// ---------- Tài khoản hệ thống (R6, R7, R16) ----------

export function validateAccountInput(input: {
  loginName: string;
  accountType: string;
  assetId?: string | null;
  platformRef?: string | null;
  accessRequestRef?: string | null;
  secretLocation?: string | null;
  secretIssuer?: string | null;
  holderId?: string | null;
  holderNote?: string | null;
  mfaEnabled: boolean;
  sharedApprovalRef?: string | null;
  freeTexts?: (string | null | undefined)[];
}): string | null {
  if (!input.loginName.trim()) return "Bắt buộc tên đăng nhập.";
  const hasAsset = Boolean(input.assetId);
  const hasPlatform = Boolean(input.platformRef?.trim());
  if (hasAsset === hasPlatform)
    return "Tài khoản tồn tại trên ĐÚNG MỘT nơi: tài sản (M33) hoặc nền tảng (M35) — chọn một trong hai.";
  if (!input.accessRequestRef?.trim())
    return "Không có tài khoản ngoài phiếu: bắt buộc phiếu F28.04 đã phê duyệt ở M28 — QTHT là người thực hiện, không phải người phê duyệt (R6).";
  if (!input.secretLocation?.trim() || !input.secretIssuer?.trim())
    return "Bắt buộc NƠI LƯU bí mật xác thực và NGƯỜI CÓ QUYỀN CẤP PHÁT — tuyệt đối không ghi giá trị (R7 — ETV.P33 §6.4.1).";
  if (input.accountType !== "DICH_VU_HE_THONG" && !input.holderId && !input.holderNote?.trim())
    return "Tài khoản không phải loại dịch vụ – hệ thống bắt buộc người giữ (ETV.P33 §6.4.1).";
  if (input.accountType === "DAC_QUYEN_QUAN_TRI" && !input.mfaEnabled)
    return "Tài khoản đặc quyền – quản trị bắt buộc bật MFA (ETV.P28 mục 5.7.1).";
  if (input.accountType === "DUNG_CHUNG_NGOAI_LE" && !input.sharedApprovalRef?.trim())
    return "Tài khoản dùng chung là ngoại lệ — bắt buộc phê duyệt kèm rủi ro tương ứng (ETV.P33 §6.4.3).";
  for (const t of input.freeTexts ?? []) {
    const hits = detectSecretPatterns(t);
    if (hits.length > 0)
      return `Cấm tuyệt đối lưu bí mật xác thực: phát hiện ${hits.join("; ")} (R7 — ETV.P33 Phụ lục I.1 điều kiện 7).`;
  }
  return null;
}

export function txLockAccount(s: { status: string }, u: M33ActorUser, reason?: string): TxResult {
  if (s.status !== "DANG_HOAT_DONG") return err("BAD_STATE", "Chỉ tài khoản đang hoạt động mới tạm khóa được.");
  if (u.m33Role !== "QTHT" && u.m33Role !== "ATTT") return err("FORBIDDEN", "QTHT/PT.ATTT thực hiện tạm khóa.");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Tạm khóa bắt buộc nêu lý do/phiếu tương ứng.");
  return ok("TAM_KHOA", "Tạm khóa tài khoản", reason);
}

export function txRevokeAccount(s: { status: string }, u: M33ActorUser, reason?: string): TxResult {
  if (s.status === "DA_THU_HOI") return err("BAD_STATE", "Tài khoản đã thu hồi.");
  if (u.m33Role !== "QTHT") return err("FORBIDDEN", "QTHT thực hiện thu hồi theo phiếu M28 (R6).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Thu hồi bắt buộc dẫn phiếu M28/sự kiện nhân sự tương ứng.");
  return ok("DA_THU_HOI", "Thu hồi tài khoản", reason, { revokedAt: new Date() });
}

// §6.4.3 — tài khoản không phiếu: khóa tạm NGAY, không có đường xóa trước khi PT.ATTT xem xét
export function txFlagOrphanAccount(s: { status: string }, u: M33ActorUser): TxResult {
  if (u.m33Role !== "QTHT" && u.m33Role !== "ATTT") return err("FORBIDDEN", "QTHT/PT.ATTT đánh dấu tài khoản bất thường.");
  if (s.status !== "DANG_HOAT_DONG") return err("BAD_STATE", "Tài khoản không ở trạng thái hoạt động.");
  return ok("TAM_KHOA", "Tài khoản bất thường (không phiếu) — khóa tạm ngay, mở sự cố ở M28", "Không có phiếu F28.04 tương ứng (§6.4.3)");
}

// ---------- Kỳ đối chiếu tài khoản (R20) ----------

export function txCloseRecon(
  r: { status: string; scope: string; submittedToLdvAt: Date | null; reviewedById: string | null },
  u: M33ActorUser,
): TxResult {
  if (r.status !== "DANG_THUC_HIEN") return err("BAD_STATE", "Kỳ đối chiếu đã chốt — số liệu bất biến (R20).");
  if (u.m33Role !== "QTHT" && u.m33Role !== "ATTT") return err("FORBIDDEN", "QTHT chốt kỳ, PT.ATTT rà soát kỳ đặc quyền (ETV.P33 §6.4.2).");
  if (r.scope === "DAC_QUYEN_DICH_VU") {
    if (!r.reviewedById) return err("ATTT_REVIEW_REQUIRED", "Kỳ đặc quyền – dịch vụ bắt buộc PT.ATTT rà soát (ETV.P33 §6.4.2 bước 5).");
    if (!r.submittedToLdvAt) return err("LDV_SUBMIT_REQUIRED", "Kỳ đặc quyền – dịch vụ bắt buộc trình LĐV trước khi chốt (R20 — ETV.P28 mục 5.7.1).");
  }
  return ok("DA_CHOT", "Chốt kỳ đối chiếu — số liệu bất biến, lưu 05 năm", null, { closedAt: new Date() });
}

// ---------- Sự cố (R9, R18) ----------

// Mức ưu tiên theo bảng mục 4.6 + ba điều kiện nâng bắt buộc lên Cao (ETV.P33 §6.5.2)
export function computePriority(
  impact: M33Impact,
  flags: { hasCriticalAsset: boolean; platformDown: boolean; measurementAffected: boolean },
): M33Priority {
  if (flags.hasCriticalAsset || flags.platformDown || flags.measurementAffected) return "CAO";
  if (impact === "NGUNG_TOAN_VIEN") return "CAO";
  if (impact === "NGUNG_MOT_PHONG") return "TRUNG_BINH";
  return "THAP";
}

// SLA đề xuất của dự thảo — giờ/ngày làm việc xấp xỉ bằng giờ/ngày lịch, chốt cách tính khi phê duyệt
export function computeIncidentDue(priority: M33Priority, reportedAt: Date): { responseDueAt: Date; resolutionDueAt: Date | null } {
  if (priority === "CAO") return { responseDueAt: reportedAt, resolutionDueAt: null }; // phản hồi NGAY; xử lý theo RTO của tài sản
  if (priority === "TRUNG_BINH")
    return { responseDueAt: new Date(reportedAt.getTime() + 4 * 3_600_000), resolutionDueAt: new Date(reportedAt.getTime() + 2 * 86_400_000) };
  return { responseDueAt: new Date(reportedAt.getTime() + 86_400_000), resolutionDueAt: new Date(reportedAt.getTime() + 5 * 86_400_000) };
}

export interface IncidentForRules {
  status: M33IncidentStatus;
  priority: M33Priority;
  securityFlag: boolean;
  securityIncidentRef: string | null;
  securityConcluded: boolean;
  capaRef: string | null;
  rootCause: string | null;
  resolution: string | null;
  assetBackToNormal: boolean | null;
  lessonRef: string | null;
  noLessonReason: string | null;
}

export function validateIncidentInput(input: { description: string; assetCount: number; securityFlag: boolean; freeTexts?: (string | null | undefined)[] }): string | null {
  if (!input.description.trim()) return "Bắt buộc mô tả sự cố/yêu cầu.";
  if (input.assetCount === 0) return "Phiếu phải gắn với ít nhất 1 tài sản (ETV.P33 §6.5.1).";
  for (const t of input.freeTexts ?? []) {
    const hits = detectSecretPatterns(t);
    if (hits.length > 0) return `Không dán bí mật xác thực vào phiếu sự cố: ${hits.join("; ")} (R7).`;
  }
  return null;
}

export function txRespondIncident(i: IncidentForRules, u: M33ActorUser, escalatedToLdv: boolean): TxResult {
  if (i.status !== "MOI") return err("BAD_STATE", "Phiếu đã được tiếp nhận.");
  if (u.m33Role !== "QTHT") return err("FORBIDDEN", "QTHT tiếp nhận và xử lý sự cố (ETV.P33 §6.5.2).");
  const patch: Record<string, unknown> = { respondedAt: new Date(), assignedToId: u.id };
  if (i.priority === "CAO") {
    if (!escalatedToLdv)
      return err("ESCALATE_REQUIRED", "Sự cố mức Cao phải báo cáo LĐV trong 01 giờ — xác nhận đã báo cáo trước khi tiếp nhận (R18 — ETV.P33 §6.5.2).");
    patch.escalatedToLdvAt = new Date();
  }
  return ok("DANG_XU_LY", "Tiếp nhận — đang xử lý", null, patch);
}

export function txMarkResolved(i: IncidentForRules, u: M33ActorUser): TxResult {
  if (i.status !== "DANG_XU_LY" && i.status !== "CHO_BEN_THU_BA") return err("BAD_STATE", "Phiếu không ở trạng thái đang xử lý.");
  if (u.m33Role !== "QTHT") return err("FORBIDDEN", "QTHT ghi nhận đã xử lý.");
  return ok("DA_XU_LY", "Đã xử lý — chờ đóng");
}

// Đóng phiếu — chặn theo R9/R18 và ETV.P33 §6.5.4
export function txCloseIncident(i: IncidentForRules, u: M33ActorUser, repeatCount90d: number): TxResult {
  if (i.status !== "DA_XU_LY") return err("BAD_STATE", "Phiếu chưa ở trạng thái Đã xử lý.");
  if (i.securityFlag) {
    if (u.m33Role !== "ATTT") return err("FORBIDDEN", "Sự cố có yếu tố an toàn thông tin do PT.ATTT đóng (ETV.P33 Phụ lục II.2).");
    if (!i.securityIncidentRef?.trim() || !i.securityConcluded)
      return err(
        "SECURITY_CONCLUSION_REQUIRED",
        "Chặn đóng: sự cố có dấu hiệu mất an toàn thông tin phải được M28 kết luận trước — M33 không tự kết luận (R9 — ETV.P33 §6.5.3).",
      );
  } else if (u.m33Role !== "QTHT") {
    return err("FORBIDDEN", "QTHT đóng phiếu sự cố thường (ETV.P33 Phụ lục II.2).");
  }
  if (repeatCount90d >= 3 && !i.capaRef?.trim())
    return err("CAPA_REQUIRED", `Sự cố lặp lần thứ ${repeatCount90d} trong 90 ngày trên cùng tài sản — bắt buộc mở KPH theo ETV.P13 trước khi đóng (R9).`);
  if (!i.rootCause?.trim() || !i.resolution?.trim())
    return err("ROOT_CAUSE_REQUIRED", "Đóng phiếu bắt buộc nguyên nhân và biện pháp đã thực hiện (ETV.P33 §6.5.4).");
  if (i.assetBackToNormal !== true)
    return err("BACK_TO_NORMAL_REQUIRED", "Đóng phiếu bắt buộc xác nhận tài sản trở lại hoạt động bình thường (ETV.P33 §6.5.4).");
  if (!i.lessonRef?.trim() && !i.noLessonReason?.trim())
    return err("LESSON_REQUIRED", "Đóng phiếu bắt buộc kết luận CÓ lập bài học kinh nghiệm (← M26) hay KHÔNG kèm lý do (ETV.P33 §6.5.4).");
  return ok("DA_DONG", "Đóng phiếu sự cố");
}

export function txCancelIncident(i: IncidentForRules, u: M33ActorUser, reason?: string): TxResult {
  if (i.status === "DA_DONG" || i.status === "HUY") return err("BAD_STATE", "Phiếu đã kết thúc.");
  if (u.m33Role !== "LDV") return err("FORBIDDEN", "Hủy phiếu là thẩm quyền LĐV (ETV.P33 Phụ lục II.2).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Hủy phiếu bắt buộc nhập lý do.");
  return ok("HUY", "Hủy phiếu", reason);
}

// ---------- Cờ đến hạn — TÍNH KHI ĐỌC, không lưu cột (7 nhóm — ETV.P33 Phụ lục II.1) ----------

export function isReviewDue(reviewCycleMonths: number, lastReviewedAt: Date | null, base: Date, now: Date = new Date()): boolean {
  const from = lastReviewedAt ?? base;
  return (now.getTime() - from.getTime()) / 86_400_000 > reviewCycleMonths * 30.44;
}

export function isMaintenanceDue(cycle: M33MaintenanceCycle, lastMaintainedAt: Date | null, base: Date, now: Date = new Date()): boolean {
  const days = MAINTENANCE_CYCLE_DAYS[cycle];
  if (days === null) return false;
  const from = lastMaintainedAt ?? base;
  return (now.getTime() - from.getTime()) / 86_400_000 > days;
}

// R8 — quá 02 chu kỳ liên tiếp ⇒ cảnh báo LĐV và mở KPH ở M13
export function maintenanceOverdueCycles(cycle: M33MaintenanceCycle, lastMaintainedAt: Date | null, base: Date, now: Date = new Date()): number {
  const days = MAINTENANCE_CYCLE_DAYS[cycle];
  if (days === null) return 0;
  const from = lastMaintainedAt ?? base;
  return Math.floor((now.getTime() - from.getTime()) / 86_400_000 / days);
}

export function isExpiringSoon(date: Date | null, now: Date = new Date(), days = 90): boolean {
  if (!date) return false;
  const diff = (date.getTime() - now.getTime()) / 86_400_000;
  return diff <= days;
}

export function isInventoryOverdue(inventoryDueAt: Date | null, status: M33AssetStatus, now: Date = new Date()): boolean {
  if (!inventoryDueAt) return false;
  const preOperating: M33AssetStatus[] = ["DRAFT", "PENDING_REVIEW", "REVIEW_REJECTED", "PENDING_APPROVAL", "APPROVAL_REJECTED"];
  return preOperating.includes(status) && inventoryDueAt < now;
}
