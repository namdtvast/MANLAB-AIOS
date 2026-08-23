// M14 — state machine/gate thuần hàm, AUTHORITATIVE. Port từ ETV.P14_KiemSoatTaiLieu.md (Đã phê
// duyệt, lần 03) + 3 đặc tả sẵn có của module (02_API/API.md, 03_Database/DataModel.md,
// 07_Workflow/StateMachine.md) — bám theo, không định nghĩa lại. Xem
// 01_Requirement/_work/20260823-xay-moi-m14/spec.md để đối chiếu "Quyết định phạm vi".
// Gate bất biến (ISO/IEC 42001 §7.5 + ETV.P14 §6.9): AI Agent KHÔNG BAO GIỜ đổi được trạng thái.
import type { M14DocStatus, M14DocType } from "@/generated/prisma/enums";

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

export interface M14ActorUser {
  id: string;
  m14Role: string | null; // NTH / LDP / LDV / LDV_UYQUYEN / VANTHU / AI_AGENT
}

export interface DocForRules {
  status: M14DocStatus;
  docType: M14DocType;
  title: string;
  owner: string;
  department: string;
  processCode: string | null;
  effectiveDate: Date | null;
  revision: string | null;
  isoClause: string[];
  knowledgeCategory: string | null;
  permissionGroup: string | null;
  retention: string | null;
  sourceOrg: string | null;
  createdById: string;
  publishedAt: Date | null;
}

// Văn bản HTQL — nhóm bắt buộc có điều khoản ISO (ETV.P14 §6.3 "✓ với văn bản HTQL").
const HTQL_TYPES: M14DocType[] = ["SO_TAY", "THU_TUC", "QUY_TRINH", "HUONG_DAN", "BIEU_MAU"];
// Quy tắc 4 DacTa: hai loại này người phê duyệt phải là LĐV chính danh, KHÔNG ủy quyền.
const NO_DELEGATION_TYPES: M14DocType[] = ["SO_TAY", "THU_TUC"];

// Bảng trường bắt buộc dịch thẳng từ ETV.P14 §6.3 — `effectiveDate` bắt buộc từ khi rời Nháp.
export function missingRequiredFields(d: DocForRules): string[] {
  const missing: string[] = [];
  if (!d.title) missing.push("Tên văn bản");
  if (!d.owner) missing.push("Chủ sở hữu nội dung");
  if (!d.department) missing.push("Phòng/bộ phận áp dụng");
  if (!d.revision) missing.push("Lần ban hành");
  if (!d.effectiveDate) missing.push("Ngày có hiệu lực");
  if (!d.knowledgeCategory) missing.push("Phân loại thông tin");
  if (!d.permissionGroup) missing.push("Nhóm quyền truy cập (F14.06)");
  if (!d.retention) missing.push("Thời hạn lưu (F14.06)");
  if (!d.sourceOrg) missing.push("Nơi phát hành/tiếp nhận");
  if (d.docType !== "VAN_BAN_BEN_NGOAI" && !d.processCode) missing.push("Quy trình liên quan (MPxx)");
  if (HTQL_TYPES.includes(d.docType) && d.isoClause.length === 0) missing.push("Điều khoản ISO áp dụng");
  return missing;
}

// Quy tắc mã hóa ETV.P14 §6.2 — chỉ áp cho văn bản nội bộ; văn bản bên ngoài giữ mã của nơi
// phát hành nên không ép định dạng.
const CODE_PATTERNS: RegExp[] = [
  /^ETV\.QM$/, // Sổ tay chất lượng
  /^ETV\.P \d{2}$/, // Thủ tục
  /^ETV\.P\.F \d{2}\.\d{2}$/, // Biểu mẫu của thủ tục
  /^ETV\.M[CTV][A-Z] \d{2}$/, // Quy trình hiệu chuẩn/thử nghiệm/kiểm định
  /^ETV\.G[A-Z] \d{2}$/, // Hướng dẫn
  /^ETV\.(M[CTV][A-Z]|G[A-Z])\.F \d{2}\.\d{2}$/, // Biểu mẫu của quy trình/hướng dẫn
  /^ETV\.(QD|CV|TB|BB|BC) \d{2,4}\/\d{4}$/, // Văn bản hành chính
];

export function isValidInternalCode(code: string): boolean {
  return CODE_PATTERNS.some((re) => re.test(code));
}

export function validateCode(code: string, docType: M14DocType): TxResult {
  if (!code) return err("CODE_REQUIRED", "Bắt buộc nhập mã số văn bản.");
  if (docType === "VAN_BAN_BEN_NGOAI") return ok("NHAP", "Mã hợp lệ");
  if (!isValidInternalCode(code)) {
    return err(
      "INVALID_CODE_FORMAT",
      `Mã "${code}" không đúng quy tắc mã hóa ETV.P14 §6.2 (vd: ETV.QM · ETV.P 14 · ETV.P.F 14.01 · ETV.MCW 01 · ETV.GI 01 · ETV.CV 123/2026).`
    );
  }
  return ok("NHAP", "Mã hợp lệ");
}

// Gate bất biến ISO/IEC 42001 + ETV.P14 §6.9 — gọi ở MỌI transition, không có ngoại lệ.
export function assertNotAiActor(u: M14ActorUser): TxResult | null {
  if (u.m14Role === "AI_AGENT") {
    return err(
      "AI_CANNOT_TRANSITION",
      "AI chỉ được gợi ý và cảnh báo, không được tự soát xét, phê duyệt, ký số, thu hồi hay hủy văn bản (ETV.P14 §6.9, ISO/IEC 42001 §7.5)."
    );
  }
  return null;
}

// Quy tắc 2: chặn rời Nháp khi thiếu trường bắt buộc theo loại văn bản.
export function txSubmitReview(d: DocForRules, u: M14ActorUser): TxResult {
  const aiBlocked = assertNotAiActor(u);
  if (aiBlocked) return aiBlocked;
  if (d.status !== "NHAP" && d.status !== "KHONG_SOAT_XET" && d.status !== "KHONG_PHE_DUYET") {
    return err("NOT_DRAFT", "Chỉ văn bản ở Nháp / Không soát xét / Không phê duyệt mới gửi soát xét được.");
  }
  if (d.createdById !== u.id) return err("PERMISSION_DENIED", "Chỉ người lập văn bản mới gửi soát xét.");
  const missing = missingRequiredFields(d);
  if (missing.length > 0) {
    return err("MISSING_REQUIRED_FIELD", `Thiếu trường bắt buộc theo ETV.P14 §6.3: ${missing.join(", ")}.`);
  }
  return ok("CHO_SOAT_XET", "Gửi soát xét");
}

// RACI §III + tách vai trò: chỉ LĐP soát xét, và không được soát xét văn bản do chính mình lập.
export function txReview(d: DocForRules, u: M14ActorUser, { passed, reason }: { passed: boolean; reason?: string }): TxResult {
  const aiBlocked = assertNotAiActor(u);
  if (aiBlocked) return aiBlocked;
  if (d.status !== "CHO_SOAT_XET") return err("BAD_STATE", "Chỉ văn bản đang Chờ soát xét mới soát xét được.");
  if (u.m14Role !== "LDP") return err("PERMISSION_DENIED", "Chỉ LĐP được soát xét kỹ thuật (RACI ETV.P14 §III).");
  if (d.createdById === u.id) return err("SELF_REVIEW", "Người lập văn bản không được tự soát xét văn bản của chính mình.");
  if (passed) return ok("CHO_PHE_DUYET", "LĐP soát xét đạt — trình phê duyệt");
  if (!reason) return err("REASON_REQUIRED", "Bắt buộc nêu lý do khi không soát xét (StateMachine M14).");
  return ok("KHONG_SOAT_XET", "LĐP không soát xét — trả lại người lập", reason, { reviewNote: reason });
}

// Quy tắc 4: Sổ tay/Thủ tục chỉ LĐV chính danh phê duyệt, không ủy quyền.
export function txApprove(d: DocForRules, u: M14ActorUser, { passed, reason }: { passed: boolean; reason?: string }): TxResult {
  const aiBlocked = assertNotAiActor(u);
  if (aiBlocked) return aiBlocked;
  if (d.status !== "CHO_PHE_DUYET") return err("BAD_STATE", "Chỉ văn bản đang Chờ phê duyệt mới phê duyệt được.");
  if (u.m14Role !== "LDV" && u.m14Role !== "LDV_UYQUYEN") {
    return err("PERMISSION_DENIED", "Chỉ LĐV (hoặc người được ủy quyền) được phê duyệt ban hành.");
  }
  if (NO_DELEGATION_TYPES.includes(d.docType) && u.m14Role !== "LDV") {
    return err(
      "NO_DELEGATION",
      "Sổ tay chất lượng và Thủ tục bắt buộc do LĐV trực tiếp phê duyệt, không ủy quyền (quy tắc 4, RACI ETV.P14 §V)."
    );
  }
  if (passed) return ok("DA_PHE_DUYET", "Phê duyệt ban hành");
  if (!reason) return err("REASON_REQUIRED", "Bắt buộc nêu lý do khi không phê duyệt (StateMachine M14).");
  return ok("KHONG_PHE_DUYET", "Không phê duyệt — trả lại người lập", reason, { reviewNote: reason });
}

// §6.6.1 bước 6-7: Văn thư/QLCL cấp mã, cập nhật danh mục, phân phối. Không đổi status —
// StateMachine.md chỉ có 7 trạng thái, "đã ban hành" là thuộc tính của Đã phê duyệt.
export function txPublish(d: DocForRules, u: M14ActorUser, distributionNote: string): TxResult {
  const aiBlocked = assertNotAiActor(u);
  if (aiBlocked) return aiBlocked;
  if (d.status !== "DA_PHE_DUYET") return err("BAD_STATE", "Chỉ văn bản Đã phê duyệt mới ban hành/phân phối được.");
  if (u.m14Role !== "VANTHU") return err("PERMISSION_DENIED", "Chỉ Văn thư/QLCL được ban hành, cập nhật danh mục và phân phối (RACI ETV.P14 §III).");
  if (d.publishedAt) return err("ALREADY_PUBLISHED", "Văn bản này đã được ban hành/phân phối rồi.");
  if (!distributionNote) return err("DISTRIBUTION_NOTE_REQUIRED", "Bắt buộc ghi nội dung giao nhận (ETV.P.F 14.04).");
  return ok("DA_PHE_DUYET", "Ban hành — cập nhật danh mục, phân phối", null, { distributionNote });
}

// §6.11 + quy tắc 5: Thanh lý (LĐP) — văn bản vẫn được lưu, có thể giữ tham khảo.
export function txRetire(d: DocForRules, u: M14ActorUser, reason: string): TxResult {
  const aiBlocked = assertNotAiActor(u);
  if (aiBlocked) return aiBlocked;
  if (d.status !== "DA_PHE_DUYET") return err("BAD_STATE", "Chỉ văn bản Đã phê duyệt mới thanh lý được.");
  if (u.m14Role !== "LDP") return err("PERMISSION_DENIED", "Chỉ LĐP quyết định thanh lý, chuyển Hết hiệu lực (RACI ETV.P14 §III).");
  if (!reason) return err("REASON_REQUIRED", "Bắt buộc nêu lý do thanh lý (ETV.P.F 14.05).");
  return ok("HET_HIEU_LUC_HUY", "Thanh lý — chuyển Hết hiệu lực, giữ bản lưu tham khảo", reason, { disposalType: "THANH_LY" });
}

// §6.11 + quy tắc 5: Hủy bỏ (chỉ LĐV) — loại khỏi phạm vi kiểm soát, khác hẳn thanh lý.
export function txDiscard(d: DocForRules, u: M14ActorUser, reason: string): TxResult {
  const aiBlocked = assertNotAiActor(u);
  if (aiBlocked) return aiBlocked;
  if (d.status !== "DA_PHE_DUYET") return err("BAD_STATE", "Chỉ văn bản Đã phê duyệt mới hủy bỏ được.");
  if (u.m14Role !== "LDV") return err("PERMISSION_DENIED", "Chỉ LĐV quyết định hủy bỏ khỏi hệ thống kiểm soát (ETV.P14 §6.11).");
  if (!reason) return err("REASON_REQUIRED", "Bắt buộc nêu lý do hủy bỏ (ETV.P.F 14.05).");
  return ok("HET_HIEU_LUC_HUY", "Hủy bỏ khỏi phạm vi kiểm soát", reason, { disposalType: "HUY_BO" });
}

// Quy tắc 7: gợi ý AI chỉ có hiệu lực khi người có thẩm quyền áp dụng — AI không tự ghi.
export function canApplySuggestion(u: M14ActorUser): boolean {
  return u.m14Role === "NTH" || u.m14Role === "LDP" || u.m14Role === "LDV" || u.m14Role === "VANTHU";
}
