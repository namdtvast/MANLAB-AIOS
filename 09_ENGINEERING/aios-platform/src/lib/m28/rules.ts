// M28 — gate/state machine thuần hàm, AUTHORITATIVE.
// NGUỒN QUY ĐỊNH: Thủ tục ETV.P28 — 03_MANAGEMENT_SYSTEM/02_P/ETV.P28_QuanLyAnToanThongTin.md
// (lần BH 02, ban hành 26/08/2026). Đặc tả module: 05_MODULE_LIBRARY/M28_ATTT/01_Requirement/DacTa.md
// (quy tắc R1–R21 ở mục 5).
//
// Không chạm DB, không import prisma — mọi quyết định "được phép hay không" nằm ở đây để test được.
// Dữ liệu cần từ module khác (tài sản M27 có tồn tại không) do actions truy vấn rồi TRUYỀN VÀO,
// đúng khuôn txDisposeAsset của M33.
import type {
  Classification,
  M28AccessStatus,
  M28IncidentStatus,
  M28RiskStatus,
  M28Severity,
  M28SoAStatus,
  M28SubjectType,
  M28TreatmentOption,
  M28TreatmentStatus,
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

export interface M28ActorUser {
  id: string;
  m28Role: string | null; // TP / QTHT / ATTT / QLCL / VP / LDV — dùng chung vocabulary với M27, M33
}

// ---------------------------------------------------------------------------
// Chấm điểm rủi ro — P28 mục 6.4.2, 6.4.3
// ---------------------------------------------------------------------------

export type RiskLevel = "THAP" | "TRUNG_BINH" | "CAO" | "RAT_CAO";

/// T = giá trị LỚN NHẤT trong ba chiều C, I, A (R2). Không phải trung bình.
export const computeImpact = (c: number, i: number, a: number): number => Math.max(c, i, a);

/// R = K × T, thang 1–25 (R2).
export const computeRiskScore = (likelihood: number, impact: number): number => likelihood * impact;

/// Bốn ngưỡng của P28 mục 6.4.2.
export function riskLevel(score: number): RiskLevel {
  if (score <= 6) return "THAP";
  if (score <= 12) return "TRUNG_BINH";
  if (score <= 19) return "CAO";
  return "RAT_CAO";
}

/// Hạn hoàn thành tối đa cho hạng mục xử lý, theo mức rủi ro — P28 mục 6.4.3.
/// Mức Thấp được chấp nhận, không bắt buộc hạn.
export function maxTreatmentMonths(level: RiskLevel): number | null {
  switch (level) {
    case "TRUNG_BINH":
      return 12;
    case "CAO":
      return 6;
    case "RAT_CAO":
      return 3;
    default:
      return null;
  }
}

/// Ngưỡng chấp nhận: rủi ro tồn dư TỪ 7 TRỞ LÊN chỉ đóng được khi LĐV chấp nhận bằng văn bản
/// có ghi lý do (P28 mục 6.4.3 — điều kiện chặn cứng, không uỷ quyền).
export const RESIDUAL_APPROVAL_THRESHOLD = 7;

const inRange = (n: number) => Number.isInteger(n) && n >= 1 && n <= 5;

// ---------------------------------------------------------------------------
// Lát cắt dữ liệu đủ để ra quyết định
// ---------------------------------------------------------------------------

export interface RiskForRules {
  status: M28RiskStatus;
  assetRefs: string[];
  classification: Classification;
  impactC: number;
  impactI: number;
  impactA: number;
  likelihood: number;
  riskScore: number;
  treatmentOption: M28TreatmentOption;
  soaControlRefs: string[];
  ownerId: string;
  ownerRole: string | null; // vai trò M28 của chủ sở hữu rủi ro — R3
  residualScore: number | null;
  residualAcceptedById: string | null;
  residualAcceptReason: string | null;
  createdById: string;
  treatmentCount: number;
  unverifiedTreatmentCount: number; // hạng mục chưa xác nhận hiệu lực — R6
}

export interface IncidentForRules {
  status: M28IncidentStatus;
  severity: M28Severity;
  reporterId: string;
  affectsResultValidity: boolean;
  m10Ref: string | null;
  m11Ref: string | null;
  lessonRef: string | null;
  involvesCustomerData: string;
  involvesPersonalData: string;
  notificationCount: number;
  evidencePreserved: string | null;
  recoveryAt: Date | null;
  involvedUserIds: string[]; // người liên quan trực tiếp — R20
}

export interface AccessForRules {
  status: M28AccessStatus;
  subjectType: M28SubjectType;
  ndaRef: string | null;
  awarenessTrainingRef: string | null;
  hasPrivilegedItem: boolean;
  touchesRestrictedOrSecret: boolean;
  requestedById: string;
  approvedById: string | null;
}

const EDITABLE_RISK: M28RiskStatus[] = ["DRAFT", "REVIEW_REJECTED", "APPROVAL_REJECTED"];
export const canEditRisk = (s: M28RiskStatus): boolean => EDITABLE_RISK.includes(s);

// ---------------------------------------------------------------------------
// R1, R2, R3 — validate khi lưu bản ghi rủi ro
// ---------------------------------------------------------------------------

/// `assetsExist` do actions truy vấn danh mục M27 rồi truyền vào: số mã tài sản trong `assetRefs`
/// thực sự CÓ trong danh mục. Rule không tự truy vấn để giữ tính thuần hàm và test được.
export function validateRiskInput(
  input: {
    title: string;
    threat: string;
    vulnerability: string;
    assetRefs: string[];
    impactC: number;
    impactI: number;
    impactA: number;
    likelihood: number;
    ownerRole: string | null;
    treatmentOption: M28TreatmentOption;
    soaControlRefs: string[];
  },
  assetsExist: number,
): string | null {
  if (!input.title.trim()) return "Thiếu tên rủi ro.";
  if (!input.threat.trim()) return "Thiếu mối đe dọa (ETV.P28 mục 6.4.2).";
  if (!input.vulnerability.trim()) return "Thiếu điểm yếu bị khai thác (ETV.P28 mục 6.4.2).";

  // R1 — chặn cứng. ETV.P27 đã ban hành và M27 đã lên nền tảng nên ràng buộc này thực thi được
  // đầy đủ; KHÔNG nới thành nhập tài sản dạng văn bản tự do.
  if (input.assetRefs.length === 0)
    return "Rủi ro phải gắn với ít nhất 01 tài sản thông tin trong danh mục M27 — không gắn được tài sản thì không cho lưu (R1; ETV.P28 mục 6.3).";
  if (assetsExist < input.assetRefs.length)
    return `Có mã tài sản không tồn tại trong danh mục M27 (tìm thấy ${assetsExist}/${input.assetRefs.length}). Rủi ro chỉ được gắn với tài sản đã kiểm kê (R1; ETV.P28 mục 6.3).`;

  // R2 — thang 1–5 cho cả bốn chiều; điểm rủi ro do hệ thống tính, người dùng không sửa tay.
  if (![input.impactC, input.impactI, input.impactA, input.likelihood].every(inRange))
    return "Mức tác động C/I/A và khả năng xảy ra phải là số nguyên từ 1 đến 5 (ETV.P28 mục 6.4.2).";

  // R3 — chủ sở hữu rủi ro là TP hoặc LĐV; KHÔNG giao cho QTHT (ETV.P28 mục 6.4.3).
  if (input.ownerRole !== "TP" && input.ownerRole !== "LDV")
    return "Chủ sở hữu rủi ro phải là Trưởng phòng lĩnh vực hoặc Lãnh đạo Viện; không giao cho Quản trị hệ thống (R3; ETV.P28 mục 6.4.3).";

  // Chọn Giảm thiểu thì phải ánh xạ tới mã kiểm soát trong SoA (ETV.P28 mục 6.5.1).
  if (input.treatmentOption === "GIAM_THIEU" && input.soaControlRefs.length === 0)
    return "Phương án Giảm thiểu bắt buộc ánh xạ tới ít nhất 01 mã kiểm soát trong SoA (ETV.P28 mục 6.5.1).";

  return null;
}

/// R4 — rủi ro từ 7 điểm trở lên phải có hạng mục xử lý; mức Rất cao bắt buộc thêm biện pháp
/// khống chế tạm thời áp dụng NGAY (ETV.P28 mục 6.4.3).
export function treatmentIssues(r: RiskForRules, hasInterimMeasure: boolean): string[] {
  const issues: string[] = [];
  const level = riskLevel(r.riskScore);
  if (r.riskScore >= RESIDUAL_APPROVAL_THRESHOLD && r.treatmentCount === 0)
    issues.push(`rủi ro mức ${level === "RAT_CAO" ? "Rất cao" : level === "CAO" ? "Cao" : "Trung bình"} bắt buộc có ít nhất 01 hạng mục trong Kế hoạch xử lý rủi ro (R4)`);
  if (level === "RAT_CAO" && !hasInterimMeasure)
    issues.push("rủi ro mức Rất cao bắt buộc có biện pháp khống chế tạm thời áp dụng ngay (R4)");
  return issues;
}

// ---------------------------------------------------------------------------
// Chuyển trạng thái rủi ro — P28 Phụ lục II mục 1
// ---------------------------------------------------------------------------

export function txSubmitRisk(r: RiskForRules, u: M28ActorUser): TxResult {
  if (!canEditRisk(r.status)) return err("BAD_STATE", "Chỉ gửi soát xét được bản ghi ở Nháp hoặc bị trả lại.");
  if (r.assetRefs.length === 0)
    return err("ASSET_REQUIRED", "Rủi ro chưa gắn tài sản thông tin trong danh mục M27 (R1; ETV.P28 mục 6.3).");
  if (u.id !== r.createdById && u.m28Role !== "ATTT")
    return err("FORBIDDEN", "Chỉ người lập hoặc PT.ATTT gửi bản ghi đi soát xét.");
  return ok("PENDING_REVIEW", "Gửi soát xét");
}

export function txReviewRisk(r: RiskForRules, u: M28ActorUser, pass: boolean, reason?: string): TxResult {
  if (r.status !== "PENDING_REVIEW") return err("BAD_STATE", "Bản ghi không ở bước Chờ soát xét.");
  if (u.m28Role !== "ATTT" && u.m28Role !== "QLCL")
    return err("FORBIDDEN", "Chỉ PT.ATTT hoặc QLCL soát xét cách chấm điểm rủi ro (ETV.P28 Phụ lục II mục 1).");
  if (u.id === r.createdById)
    return err("SELF_REVIEW", "Người soát xét phải khác người lập (ETV.P28 mục 5.3).");
  if (!pass) {
    if (!reason?.trim()) return err("REASON_REQUIRED", "Không soát xét bắt buộc nhập lý do (Phụ lục II mục 1).");
    return ok("REVIEW_REJECTED", "Không soát xét", reason);
  }
  return ok("PENDING_APPROVAL", "Soát xét đạt", null, { reviewedById: u.id, reviewedAt: new Date() });
}

/// LĐV phê duyệt mức rủi ro và phương án xử lý. Rủi ro từ 7 điểm trở lên đi tiếp sang Đang xử lý;
/// dưới ngưỡng thì chấp nhận luôn (ETV.P28 mục 6.4.3, Phụ lục II mục 1).
export function txApproveRisk(
  r: RiskForRules,
  u: M28ActorUser,
  pass: boolean,
  hasInterimMeasure: boolean,
  reason?: string,
): TxResult {
  if (r.status !== "PENDING_APPROVAL") return err("BAD_STATE", "Bản ghi không ở bước Chờ phê duyệt.");
  if (u.m28Role !== "LDV") return err("FORBIDDEN", "Chỉ LĐV phê duyệt mức rủi ro và phương án xử lý (Phụ lục II mục 1).");
  if (u.id === r.createdById) return err("SELF_APPROVE", "Người lập không được tự phê duyệt (ETV.P28 mục 5.3).");
  if (!pass) {
    if (!reason?.trim()) return err("REASON_REQUIRED", "Không phê duyệt bắt buộc nhập lý do (Phụ lục II mục 1).");
    return ok("APPROVAL_REJECTED", "LĐV không phê duyệt", reason);
  }
  const issues = treatmentIssues(r, hasInterimMeasure);
  if (issues.length > 0)
    return err("TREATMENT_REQUIRED", `Chặn phê duyệt — ${issues.join("; ")} (ETV.P28 mục 6.4.3).`);

  const patch = { approvedById: u.id, approvedAt: new Date(), lastAssessedAt: new Date() };
  if (r.riskScore >= RESIDUAL_APPROVAL_THRESHOLD)
    return ok("DANG_XU_LY", "LĐV phê duyệt — chuyển sang thực hiện Kế hoạch xử lý rủi ro", null, patch);
  return ok("DA_XU_LY", "LĐV phê duyệt — rủi ro mức Thấp, chấp nhận và theo dõi theo chu kỳ", null, patch);
}

/// R6 — chỉ chuyển Đã xử lý khi MỌI hạng mục xử lý đã được PT.ATTT xác nhận hiệu lực.
/// Biện pháp chưa xác nhận hiệu lực thì không được ghi là hoàn thành (ETV.P28 mục 6.5.2).
export function txMarkRiskTreated(r: RiskForRules, u: M28ActorUser): TxResult {
  if (r.status !== "DANG_XU_LY") return err("BAD_STATE", "Chỉ rủi ro Đang xử lý mới chuyển sang Đã xử lý.");
  if (u.m28Role !== "ATTT")
    return err("FORBIDDEN", "Chỉ PT.ATTT xác nhận hiệu lực biện pháp xử lý (ETV.P28 mục 6.5.2).");
  if (r.treatmentCount === 0) return err("TREATMENT_REQUIRED", "Chưa có hạng mục xử lý nào.");
  if (r.unverifiedTreatmentCount > 0)
    return err(
      "UNVERIFIED_TREATMENT",
      `Còn ${r.unverifiedTreatmentCount} hạng mục chưa được xác nhận hiệu lực — biện pháp chưa xác nhận hiệu lực không được ghi là hoàn thành (R6; ETV.P28 mục 6.5.2).`,
    );
  return ok("DA_XU_LY", "PT.ATTT xác nhận đã xử lý và đã kiểm chứng hiệu lực");
}

/// R5 — CHẶN CỨNG. Rủi ro tồn dư ≥ 7 chỉ đóng được khi LĐV chấp nhận bằng văn bản, có ghi lý do.
export function txAcceptResidual(
  r: RiskForRules,
  u: M28ActorUser,
  residualLikelihood: number,
  residualImpact: number,
  reason?: string,
): TxResult {
  if (r.status !== "DA_XU_LY")
    return err("BAD_STATE", "Chỉ chấp nhận rủi ro tồn dư sau khi rủi ro đã ở trạng thái Đã xử lý.");
  if (!inRange(residualLikelihood) || !inRange(residualImpact))
    return err("INVALID", "Khả năng và tác động tồn dư phải là số nguyên từ 1 đến 5.");
  const residual = computeRiskScore(residualLikelihood, residualImpact);
  if (residual >= RESIDUAL_APPROVAL_THRESHOLD) {
    if (u.m28Role !== "LDV")
      return err(
        "LDV_REQUIRED",
        `Rủi ro tồn dư ${residual} điểm (từ ${RESIDUAL_APPROVAL_THRESHOLD} trở lên) chỉ được đóng khi LĐV chấp nhận bằng văn bản — không uỷ quyền cho vai trò khác (R5; ETV.P28 mục 6.4.3).`,
      );
    if (!reason?.trim())
      return err("REASON_REQUIRED", "Chấp nhận rủi ro tồn dư bắt buộc ghi lý do (R5; ETV.P28 mục 6.4.3).");
  }
  if (u.m28Role !== "LDV" && u.m28Role !== "ATTT")
    return err("FORBIDDEN", "Chỉ LĐV hoặc PT.ATTT đóng rủi ro.");
  return ok("CHAP_NHAN_TON_DU", "Chấp nhận rủi ro tồn dư", reason ?? null, {
    residualLikelihood,
    residualImpact,
    residualScore: residual,
    residualAcceptedById: residual >= RESIDUAL_APPROVAL_THRESHOLD ? u.id : null,
    residualAcceptedAt: residual >= RESIDUAL_APPROVAL_THRESHOLD ? new Date() : null,
    residualAcceptReason: reason?.trim() || null,
  });
}

export function txRetireRisk(r: RiskForRules, u: M28ActorUser, reason?: string): TxResult {
  if (r.status === "HET_HIEU_LUC") return err("BAD_STATE", "Rủi ro đã hết hiệu lực.");
  if (u.m28Role !== "LDV") return err("FORBIDDEN", "Chỉ LĐV cho rủi ro hết hiệu lực (Phụ lục II mục 1).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Chuyển Hết hiệu lực bắt buộc ghi lý do.");
  return ok("HET_HIEU_LUC", "LĐV xác nhận rủi ro không còn", reason);
}

// ---------------------------------------------------------------------------
// R6 — hạng mục Kế hoạch xử lý rủi ro
// ---------------------------------------------------------------------------

export function txVerifyTreatment(
  t: { status: M28TreatmentStatus; completedAt: Date | null },
  u: M28ActorUser,
  verificationNote: string,
): TxResult {
  if (t.status === "HOAN_THANH") return err("BAD_STATE", "Hạng mục đã hoàn thành.");
  if (u.m28Role !== "ATTT")
    return err("FORBIDDEN", "Chỉ PT.ATTT xác nhận hiệu lực biện pháp xử lý (R6; ETV.P28 mục 6.5.2).");
  if (!verificationNote.trim())
    return err("EVIDENCE_REQUIRED", "Phải ghi cách xác nhận hiệu lực: kiểm tra kỹ thuật, rà soát hồ sơ hoặc thử nghiệm (ETV.P28 mục 6.5.2).");
  return ok("HOAN_THANH", "PT.ATTT xác nhận hiệu lực biện pháp", null, {
    verifiedById: u.id,
    verifiedAt: new Date(),
    completedAt: t.completedAt ?? new Date(),
    verificationMethod: verificationNote.trim(),
  });
}

// ---------------------------------------------------------------------------
// R7, R8 — Tuyên bố áp dụng (SoA)
// ---------------------------------------------------------------------------

/// R7 — kiểm soát ghi Loại trừ mà thiếu lý do loại trừ thì KHÔNG phê duyệt được SoA.
/// `missingExclusionReason` là số dòng vi phạm, do actions đếm rồi truyền vào.
export function txApproveSoA(
  v: { status: M28SoAStatus; scopeExclusions: string | null },
  u: M28ActorUser,
  pass: boolean,
  missingExclusionReason: number,
  controlCount: number,
  reason?: string,
): TxResult {
  if (v.status !== "PENDING_APPROVAL") return err("BAD_STATE", "Phiên bản SoA không ở bước Chờ phê duyệt.");
  if (u.m28Role !== "LDV")
    return err("FORBIDDEN", "Chỉ LĐV phê duyệt Tuyên bố áp dụng, kể cả việc loại trừ kiểm soát (ETV.P28 mục 6.6).");
  if (!pass) {
    if (!reason?.trim()) return err("REASON_REQUIRED", "Không phê duyệt bắt buộc nhập lý do.");
    return ok("DRAFT", "LĐV không phê duyệt — trả về Nháp", reason);
  }
  // SoA phải liệt kê ĐỦ tập kiểm soát tham chiếu của Phụ lục A (ETV.P28 mục 6.6).
  if (controlCount !== ANNEX_A_CONTROL_COUNT)
    return err(
      "INCOMPLETE_SOA",
      `SoA phải liệt kê đủ ${ANNEX_A_CONTROL_COUNT} kiểm soát của Phụ lục A ISO/IEC 27001:2022, hiện có ${controlCount} (ETV.P28 mục 6.6).`,
    );
  if (missingExclusionReason > 0)
    return err(
      "EXCLUSION_REASON_REQUIRED",
      `${missingExclusionReason} kiểm soát ghi "Loại trừ" mà chưa nêu lý do loại trừ — không phê duyệt (R7; ETV.P28 mục 6.6).`,
    );
  return ok("DA_PHE_DUYET", "LĐV phê duyệt Tuyên bố áp dụng", null, {
    approvedById: u.id,
    approvedAt: new Date(),
    effectiveDate: new Date(),
  });
}

/// Số kiểm soát của Phụ lục A ISO/IEC 27001:2022 — A.5 (37) + A.6 (8) + A.7 (14) + A.8 (34).
export const ANNEX_A_CONTROL_COUNT = 93;

/// R9 — kiểm soát ghi Áp dụng, quá hạn cam kết mà chưa có bằng chứng ⇒ phải lập KPH theo ETV.P13.
/// Cảnh báo mềm: không chặn thao tác, nhưng phải hiện ra để không trôi.
export function controlNeedsCapa(
  c: { applicable: boolean; evidenceRefs: string[]; evidenceDueAt: Date | null },
  now: Date = new Date(),
): boolean {
  if (!c.applicable) return false;
  if (c.evidenceRefs.length > 0) return false;
  return Boolean(c.evidenceDueAt && c.evidenceDueAt <= now);
}

// ---------------------------------------------------------------------------
// Sự cố an toàn thông tin — P28 mục 6.8
// ---------------------------------------------------------------------------

/// Thời hạn báo cáo nội bộ theo mức sự cố — P28 mục 6.8.1. Trả về số giờ; 0 nghĩa là NGAY LẬP TỨC.
export function reportDeadlineHours(s: M28Severity): number {
  switch (s) {
    case "THAP":
      return 24;
    case "TRUNG_BINH":
      return 8;
    default:
      return 0;
  }
}

/// Thẩm quyền đóng sự cố — P28 mục 6.8.2 bước 6: LĐV với mức Cao/Rất cao, PT.ATTT với Thấp/Trung bình.
export const closerRole = (s: M28Severity): "LDV" | "ATTT" =>
  s === "CAO" || s === "RAT_CAO" ? "LDV" : "ATTT";

const INCIDENT_FLOW: Record<M28IncidentStatus, M28IncidentStatus[]> = {
  MOI: ["DANG_KHONG_CHE", "HUY"],
  DANG_KHONG_CHE: ["DANG_DIEU_TRA", "HUY"],
  DANG_DIEU_TRA: ["DANG_KHAC_PHUC", "HUY"],
  DANG_KHAC_PHUC: ["CHO_KET_LUAN"],
  CHO_KET_LUAN: ["DA_DONG"],
  DA_DONG: [],
  HUY: [],
};

export function txAdvanceIncident(
  i: IncidentForRules,
  u: M28ActorUser,
  next: M28IncidentStatus,
  note?: string,
): TxResult {
  if (!INCIDENT_FLOW[i.status].includes(next))
    return err("BAD_STATE", `Không chuyển được từ trạng thái hiện tại sang bước đó (ETV.P28 mục 6.8.2).`);

  if (next === "HUY") {
    if (u.m28Role !== "ATTT")
      return err("FORBIDDEN", "Chỉ PT.ATTT xác định cảnh báo giả và huỷ phiếu sự cố (Phụ lục II mục 2).");
    if (!note?.trim()) return err("REASON_REQUIRED", "Huỷ phiếu sự cố bắt buộc ghi lý do (ETV.P28 mục 6.8.2).");
    return ok("HUY", "PT.ATTT xác định là cảnh báo giả", note);
  }

  if (next === "DANG_KHONG_CHE") {
    if (u.m28Role !== "QTHT" && u.m28Role !== "ATTT")
      return err("FORBIDDEN", "QTHT khống chế theo chỉ đạo của PT.ATTT (ETV.P28 mục 6.8.2 bước 2).");
    if (!note?.trim())
      return err("INVALID", "Ghi rõ biện pháp khống chế đã thực hiện và bằng chứng đã bảo toàn (bước 2).");
    return ok("DANG_KHONG_CHE", "Khống chế sự cố", null, {
      containedAt: new Date(),
      containmentActions: note.trim(),
    });
  }

  if (next === "DANG_DIEU_TRA") {
    if (u.m28Role !== "ATTT" && u.m28Role !== "QTHT")
      return err("FORBIDDEN", "PT.ATTT và QTHT điều tra sự cố (bước 3).");
    if (!i.evidencePreserved?.trim())
      return err(
        "EVIDENCE_REQUIRED",
        "Chưa ghi bằng chứng đã thu thập và nơi lưu — bảo toàn bằng chứng là bắt buộc trước khi điều tra (R10; ETV.P28 mục 6.8.2 bước 2).",
      );
    return ok("DANG_DIEU_TRA", "Điều tra nguyên nhân và phạm vi ảnh hưởng");
  }

  if (next === "DANG_KHAC_PHUC") {
    if (!note?.trim()) return err("INVALID", "Ghi rõ nguyên nhân trực tiếp và phạm vi ảnh hưởng (bước 3).");
    return ok("DANG_KHAC_PHUC", "Khắc phục và khôi phục dịch vụ", null, { directCause: note.trim() });
  }

  if (next === "CHO_KET_LUAN") {
    if (!i.recoveryAt && !note?.trim())
      return err("INVALID", "Ghi mốc khôi phục hoặc nêu rõ tình trạng trước khi chuyển Chờ kết luận (bước 4).");
    return ok("CHO_KET_LUAN", "Chuyển Chờ kết luận", null, { recoveryAt: i.recoveryAt ?? new Date() });
  }

  // next === "DA_DONG"
  return txCloseIncident(i, u, note);
}

/// R14, R15, R20 — ba điều kiện chặn đóng sự cố (ETV.P28 mục 6.8.2 bước 6, Phụ lục I).
export function txCloseIncident(i: IncidentForRules, u: M28ActorUser, note?: string): TxResult {
  if (i.status !== "CHO_KET_LUAN") return err("BAD_STATE", "Sự cố chưa ở bước Chờ kết luận.");

  const required = closerRole(i.severity);
  if (u.m28Role !== required)
    return err(
      "FORBIDDEN",
      required === "LDV"
        ? "Sự cố mức Cao và Rất cao chỉ do LĐV đóng (ETV.P28 mục 6.8.2 bước 6)."
        : "Sự cố mức Thấp và Trung bình do PT.ATTT đóng (ETV.P28 mục 6.8.2 bước 6).",
    );

  // R20 — người liên quan trực tiếp tới sự cố không được là người kết luận và đóng sự cố đó.
  if (i.involvedUserIds.includes(u.id) || u.id === i.reporterId)
    return err(
      "INVOLVED_PARTY",
      "Người liên quan trực tiếp tới sự cố không được kết luận và đóng chính sự cố đó (R20; ETV.P28 mục 5.3).",
    );

  // R14 — ảnh hưởng hiệu lực kết quả đo/chứng chỉ thì phải kích hoạt ETV.P10 và ETV.P11.
  if (i.affectsResultValidity && (!i.m10Ref?.trim() || !i.m11Ref?.trim()))
    return err(
      "M10_M11_REQUIRED",
      "Sự cố ảnh hưởng hiệu lực kết quả đo hoặc chứng chỉ đã phát hành: bắt buộc kích hoạt đồng thời ETV.P10 và ETV.P11 trước khi đóng — module này không tự kết luận về hiệu lực kết quả (R14; ETV.P28 mục 6.8.3).",
    );

  // R15 — sự cố mức Cao trở lên phải có bài học kinh nghiệm (ETV.P26) và hoàn tất nghĩa vụ thông báo.
  if (i.severity === "CAO" || i.severity === "RAT_CAO") {
    if (!i.lessonRef?.trim())
      return err(
        "LESSON_REQUIRED",
        "Sự cố mức Cao trở lên chỉ được đóng khi đã lập phiếu bài học kinh nghiệm theo ETV.P26 (R15; ETV.P28 mục 6.8.2 bước 6).",
      );
    const needsNotification =
      i.involvesCustomerData === "CO" || i.involvesPersonalData === "CO";
    if (needsNotification && i.notificationCount === 0)
      return err(
        "NOTIFICATION_REQUIRED",
        "Sự cố liên quan dữ liệu khách hàng hoặc dữ liệu cá nhân: phải hoàn tất nghĩa vụ thông báo và lưu bằng chứng gửi/nhận trước khi đóng (R15; ETV.P28 mục 6.8.3).",
      );
  }

  if (i.involvesCustomerData === "CHUA_XAC_DINH" || i.involvesPersonalData === "CHUA_XAC_DINH")
    return err(
      "SCOPE_UNDETERMINED",
      "Chưa xác định sự cố có liên quan dữ liệu khách hàng hoặc dữ liệu cá nhân hay không — phải kết luận trước khi đóng vì nó quyết định nghĩa vụ thông báo (ETV.P28 mục 6.8.3).",
    );

  return ok("DA_DONG", "Đóng sự cố", note?.trim() || null, { closedById: u.id, closedAt: new Date() });
}

// ---------------------------------------------------------------------------
// Quyền truy cập — P28 mục 6.7.1
// ---------------------------------------------------------------------------

/// R17 — tài khoản đặc quyền, hệ thống chứa thông tin Hạn chế/Mật, hoặc bên thứ ba là nhà cung cấp
/// CNTT thì người phê duyệt BẮT BUỘC là LĐV; còn lại PT.ATTT phê duyệt được.
export function requiredApprover(a: {
  hasPrivilegedItem: boolean;
  touchesRestrictedOrSecret: boolean;
  subjectType: M28SubjectType;
}): "LDV" | "ATTT" {
  if (a.hasPrivilegedItem || a.touchesRestrictedOrSecret || a.subjectType === "NHA_CUNG_CAP_CNTT") return "LDV";
  return "ATTT";
}

/// R16 — chưa đào tạo nhận thức thì không cấp quyền; bên thứ ba chưa ký cam kết bảo mật thì không cấp.
export function accessPrerequisiteIssue(a: AccessForRules): string | null {
  if (!a.awarenessTrainingRef?.trim())
    return "Chưa có hồ sơ đào tạo nhận thức an toàn thông tin — nhân sự phải được phổ biến Chính sách TRƯỚC KHI được cấp quyền (R16; ETV.P28 mục 6.10).";
  if (a.subjectType !== "NHAN_SU_CHINH_THUC" && !a.ndaRef?.trim())
    return "Bên thứ ba phải ký cam kết bảo mật theo ETV.P02 trước khi được cấp quyền (R16; ETV.P28 mục 6.7.7).";
  return null;
}

export function txSubmitAccess(a: AccessForRules, u: M28ActorUser): TxResult {
  if (a.status !== "DE_NGHI") return err("BAD_STATE", "Phiếu không ở trạng thái Đề nghị.");
  if (u.m28Role !== "TP" && u.m28Role !== "QLCL")
    return err("FORBIDDEN", "Trưởng phòng đề nghị cấp/thay đổi/thu hồi quyền cho nhân sự thuộc phòng (ETV.P28 mục 6.7.1).");
  const issue = accessPrerequisiteIssue(a);
  if (issue) return err("PREREQUISITE", issue);
  return ok("CHO_PHE_DUYET", "Trình phê duyệt quyền truy cập");
}

/// R17, R18 — thẩm quyền theo mức nhạy cảm, và tách ba vai trò đề nghị/phê duyệt/thực hiện.
export function txApproveAccess(a: AccessForRules, u: M28ActorUser, pass: boolean, reason?: string): TxResult {
  if (a.status !== "CHO_PHE_DUYET") return err("BAD_STATE", "Phiếu không ở bước Chờ phê duyệt.");
  if (u.id === a.requestedById)
    return err("SELF_APPROVE", "Người đề nghị không được tự phê duyệt quyền (R18; ETV.P28 mục 5.3).");
  const required = requiredApprover(a);
  if (required === "LDV" && u.m28Role !== "LDV")
    return err(
      "LDV_REQUIRED",
      "Quyền có tài khoản đặc quyền, chạm thông tin mức Hạn chế/Mật, hoặc cấp cho nhà cung cấp CNTT thì bắt buộc LĐV phê duyệt (R17; ETV.P28 mục 6.7.1).",
    );
  if (required === "ATTT" && u.m28Role !== "ATTT" && u.m28Role !== "LDV")
    return err("FORBIDDEN", "PT.ATTT hoặc LĐV phê duyệt quyền truy cập (ETV.P28 mục 6.7.1).");
  if (!pass) {
    if (!reason?.trim()) return err("REASON_REQUIRED", "Từ chối bắt buộc ghi lý do (Phụ lục II mục 2).");
    return ok("TU_CHOI", "Từ chối cấp quyền", reason);
  }
  const issue = accessPrerequisiteIssue(a);
  if (issue) return err("PREREQUISITE", issue);
  return ok("DA_PHE_DUYET", "Phê duyệt quyền truy cập", null, { approvedById: u.id, approvedAt: new Date() });
}

/// R18 — QTHT chỉ THỰC HIỆN thao tác sau khi có phê duyệt hợp lệ, không tự quyết định quyền.
export function txExecuteAccess(a: AccessForRules, u: M28ActorUser, systemLogRef: string): TxResult {
  if (a.status !== "DA_PHE_DUYET")
    return err(
      "NOT_APPROVED",
      "Cấp quyền khi chưa có phiếu đã phê duyệt là vi phạm nghiêm trọng — QTHT phải từ chối thực hiện (ETV.P28 Phụ lục I).",
    );
  if (u.m28Role !== "QTHT")
    return err("FORBIDDEN", "Chỉ Quản trị hệ thống thực hiện thao tác cấp/sửa/thu hồi quyền (ETV.P28 mục 6.7.1).");
  if (u.id === a.approvedById || u.id === a.requestedById)
    return err(
      "SEGREGATION",
      "Người đề nghị ≠ người phê duyệt ≠ người thực hiện; QTHT không được tự phê duyệt quyền của chính mình (R18; ETV.P28 mục 5.3).",
    );
  if (!systemLogRef.trim())
    return err("LOG_REQUIRED", "Phải ghi mã nhật ký hệ thống của thao tác (ETV.P28 mục 6.7.5).");
  return ok("DA_THUC_HIEN", "QTHT thực hiện cấp quyền", null, {
    executedById: u.id,
    executedAt: new Date(),
    systemLogRef: systemLogRef.trim(),
  });
}

/// R19 — thu hồi trong ngày làm việc; là điều kiện bắt buộc để hoàn tất thủ tục thôi việc (ETV.P03).
export function txRevokeAccess(
  a: AccessForRules,
  u: M28ActorUser,
  assetsReturned: boolean,
  reason?: string,
): TxResult {
  if (a.status !== "DA_THUC_HIEN") return err("BAD_STATE", "Chỉ thu hồi quyền đã được thực hiện.");
  if (u.m28Role !== "QTHT" && u.m28Role !== "ATTT" && u.m28Role !== "LDV")
    return err("FORBIDDEN", "QTHT thực hiện thu hồi; PT.ATTT hoặc LĐV có thể yêu cầu (ETV.P28 mục 6.7.1).");
  if (!reason?.trim()) return err("REASON_REQUIRED", "Thu hồi quyền bắt buộc ghi lý do (Phụ lục II mục 2).");
  if (!assetsReturned)
    return err(
      "ASSETS_NOT_RETURNED",
      "Chưa thu hồi thiết bị, thẻ ra vào và USB token chữ ký số — nghiêm cấm cho mượn token chữ ký số (ETV.P28 mục 6.7.4).",
    );
  return ok("DA_THU_HOI", "Thu hồi quyền truy cập", reason, { revokedAt: new Date(), assetsReturned: true });
}

// ---------------------------------------------------------------------------
// Cờ tính khi đọc — R13 và các cảnh báo vận hành
// ---------------------------------------------------------------------------

function addMonths(d: Date, months: number): Date {
  const r = new Date(d);
  r.setMonth(r.getMonth() + months);
  return r;
}

/// R13 — đánh giá rủi ro quá 12 tháng chưa rà soát ⇒ cảnh báo LĐV và đưa vào báo cáo xem xét
/// của lãnh đạo (ETV.P28 mục 6.4.1, Phụ lục I).
export function isRiskReviewDue(
  r: { lastAssessedAt: Date | null; status: M28RiskStatus },
  now: Date = new Date(),
): boolean {
  const active: M28RiskStatus[] = ["DANG_XU_LY", "DA_XU_LY", "CHAP_NHAN_TON_DU"];
  if (!active.includes(r.status)) return false;
  if (!r.lastAssessedAt) return true;
  return addMonths(r.lastAssessedAt, 12) <= now;
}

/// Hạng mục xử lý quá hạn — cảnh báo chủ sở hữu rủi ro; quá 02 lần cảnh báo thì báo cáo LĐV
/// (ETV.P28 mục 6.5.2).
export function isTreatmentOverdue(
  t: { dueAt: Date; status: M28TreatmentStatus },
  now: Date = new Date(),
): boolean {
  return t.status !== "HOAN_THANH" && t.dueAt <= now;
}

/// R12 — tác động tới tính sẵn sàng từ 4 trở lên là đầu vào BẮT BUỘC cho kế hoạch liên tục
/// hoạt động (ETV.P28 mục 6.9; ETV.P31 mục 6.1.4).
export const isBcpInput = (impactA: number): boolean => impactA >= 4;

/// R11 — dữ liệu mức Hạn chế và Mật KHÔNG BAO GIỜ được đưa vào chỉ mục AI. Quy tắc gốc nằm ở
/// ETV.P29 mục 5.5; M27 thực thi ở cấp tài sản. Hàm này để M28 kiểm tra khi ghi nhận vi phạm.
export const isAiIndexForbidden = (c: Classification): boolean => c === "HAN_CHE" || c === "MAT";
