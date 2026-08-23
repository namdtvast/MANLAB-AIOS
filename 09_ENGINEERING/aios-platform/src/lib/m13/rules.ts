// M13 — state machine/gate thuần hàm, AUTHORITATIVE. Port từ ETV.P13_KhacPhuc.md (Đã phê duyệt,
// lần 03) — xem 01_Requirement/_work/20260823-xay-moi-m13/spec.md để đối chiếu "Quyết định phạm
// vi" (không có 08_Source nguyên mẫu, giống M01/M02/M03/M04/M16/M17/M12). Gate chính: mức Nặng
// không được đóng/tiếp tục công việc cho tới khi QLCL thẩm xét phương án khắc phục ĐẠT —
// không tự mở khóa theo thời hạn hay do người thực hiện tự xác nhận (quy tắc 5).
import type { M13CapStatus, M13NcwStatus, M13Severity } from "@/generated/prisma/enums";

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

export interface M13ActorUser {
  id: string;
  m13Role: string | null; // NHANVIEN / QLCL / QLKT / LDV
}

export interface NcwForRules {
  status: M13NcwStatus;
  severity: M13Severity | null;
  monitoringNoteCount: number;
  revokedReportCount: number;
  plan: { status: M13CapStatus; assignedToId: string } | null;
}

export interface CapForRules {
  status: M13CapStatus;
  assignedToId: string;
}

// Quy tắc 2: chỉ LĐV/QLCL/QLKT được đánh giá mức độ — không có công thức tự động.
export const canAssess = (u: M13ActorUser) => u.m13Role === "LDV" || u.m13Role === "QLCL" || u.m13Role === "QLKT";

// Quy tắc 2 + 4: đánh giá mức độ. Mức Nặng luôn kèm dừng hẳn công việc, không cho chọn khác.
export function txAssessSeverity(
  n: NcwForRules,
  u: M13ActorUser,
  { severity, basis }: { severity: M13Severity; basis: string }
): TxResult {
  if (n.status !== "GHI_NHAN") return err("BAD_STATE", "Chỉ công việc không phù hợp mới ghi nhận mới đánh giá mức độ được.");
  if (!canAssess(u)) return err("FORBIDDEN", "Chỉ LĐV, QLCL hoặc QLKT được đánh giá mức độ không phù hợp (quy tắc 2 ETV.P13).");
  if (!basis) return err("BASIS_REQUIRED", "Bắt buộc ghi căn cứ đánh giá mức độ — đánh giá thủ công, không có công thức tự động.");

  if (severity === "NANG") {
    return ok("DANG_KHAC_PHUC", "Đánh giá mức độ: Nặng — dừng hẳn công việc", basis, {
      severity,
      severityBasis: basis,
      stoppedWork: true,
    });
  }
  return ok("DANG_THEO_DOI", "Đánh giá mức độ: Nhẹ — tiếp tục việc, theo dõi chặt chẽ", basis, {
    severity,
    severityBasis: basis,
  });
}

// Quy tắc 4-5: chỉ QLCL lập phương án hành động khắc phục, chỉ áp dụng cho mức Nặng.
export function txCreateCapPlan(
  n: NcwForRules,
  u: M13ActorUser,
  { rootCause, actionPlan, assignedToId }: { rootCause: string; actionPlan: string; assignedToId: string }
): TxResult {
  if (u.m13Role !== "QLCL") return err("FORBIDDEN", "Chỉ QLCL được lập phương án hành động khắc phục (quy tắc 4 ETV.P13).");
  if (n.severity !== "NANG") return err("NOT_SEVERE", "Chỉ công việc không phù hợp mức Nặng mới phải lập phương án hành động khắc phục.");
  if (n.plan) return err("PLAN_EXISTS", "Công việc không phù hợp này đã có phương án hành động khắc phục.");
  if (!rootCause) return err("ROOT_CAUSE_REQUIRED", "Bắt buộc nêu nguyên nhân gốc.");
  if (!actionPlan) return err("ACTION_PLAN_REQUIRED", "Bắt buộc nêu nội dung phương án khắc phục.");
  if (!assignedToId) return err("ASSIGNEE_REQUIRED", "Bắt buộc phân công cán bộ thực hiện hành động khắc phục.");
  return ok("DANG_THUC_HIEN", "QLCL lập phương án hành động khắc phục và phân công thực hiện", null, {
    rootCause,
    actionPlan,
    assignedToId,
  });
}

// Người được phân công báo hoàn thành — KHÔNG tự mở khóa việc, chỉ chuyển sang chờ thẩm xét.
export function txCompleteCapPlan(p: CapForRules, u: M13ActorUser): TxResult {
  if (p.status !== "DANG_THUC_HIEN") return err("BAD_STATE", "Chỉ phương án đang thực hiện mới báo hoàn thành được.");
  if (p.assignedToId !== u.id) return err("FORBIDDEN", "Chỉ cán bộ được phân công mới báo hoàn thành hành động khắc phục.");
  return ok("CHO_THAM_XET", "Báo hoàn thành hành động khắc phục — chờ QLCL thẩm xét", null, {});
}

// Quy tắc 5 — gate tách vai trò: chỉ QLCL thẩm xét, và người thẩm xét không được là người thực
// hiện phương án đó (xem "Quyết định phạm vi" #2 trong spec.md).
export function txReviewCapPlan(
  p: CapForRules,
  u: M13ActorUser,
  { passed, note }: { passed: boolean; note?: string }
): TxResult {
  if (p.status !== "CHO_THAM_XET") return err("BAD_STATE", "Chỉ phương án đang chờ thẩm xét mới thẩm xét được.");
  if (u.m13Role !== "QLCL") return err("FORBIDDEN", "Chỉ QLCL được thẩm xét hành động khắc phục (quy tắc 5 ETV.P13).");
  if (p.assignedToId === u.id) {
    return err("SELF_REVIEW", "Người thực hiện hành động khắc phục không được tự thẩm xét phương án của chính mình.");
  }
  if (passed) return ok("DAT", "QLCL thẩm xét ĐẠT — cho phép tiếp tục công việc", note ?? null, { reviewNote: note ?? null });
  if (!note) return err("NOTE_REQUIRED", "Bắt buộc nêu lý do khi thẩm xét KHÔNG ĐẠT.");
  return ok("DANG_THUC_HIEN", "QLCL thẩm xét KHÔNG ĐẠT — trả lại thực hiện tiếp", note, { reviewNote: note });
}

// Quy tắc 3 + 5: đóng hồ sơ KPH.
// - mức Nặng: bắt buộc phương án đã được thẩm xét ĐẠT (không tự mở khóa);
// - mức Nhẹ: bắt buộc đã có ghi chép theo dõi diễn biến, không đóng hồ sơ ngay.
export function txCloseNcw(n: NcwForRules, u: M13ActorUser): TxResult {
  if (n.status !== "DANG_THEO_DOI" && n.status !== "DANG_KHAC_PHUC") {
    return err("BAD_STATE", "Chỉ hồ sơ đang theo dõi hoặc đang khắc phục mới đóng được.");
  }
  if (!canAssess(u)) return err("FORBIDDEN", "Chỉ LĐV, QLCL hoặc QLKT được đóng hồ sơ công việc không phù hợp.");

  if (n.severity === "NANG") {
    if (!n.plan || n.plan.status !== "DAT") {
      return err(
        "CAP_REVIEW_REQUIRED",
        "Công việc không phù hợp mức Nặng — bắt buộc QLCL thẩm xét hành động khắc phục ĐẠT mới được đóng hồ sơ và cho tiếp tục công việc (quy tắc 5 ETV.P13)."
      );
    }
    return ok("DA_KHAC_PHUC", "Đóng hồ sơ — hành động khắc phục đã được thẩm xét đạt, cho tiếp tục công việc", null, {
      stoppedWork: false,
    });
  }

  if (n.monitoringNoteCount === 0) {
    return err(
      "MONITORING_REQUIRED",
      "Công việc không phù hợp mức Nhẹ — bắt buộc ghi chép diễn biến theo dõi vào sổ trước khi đóng hồ sơ (quy tắc 3 ETV.P13)."
    );
  }
  return ok("DA_KHAC_PHUC", "Đóng hồ sơ — mức Nhẹ, đã theo dõi và ghi chép đầy đủ diễn biến", null, {});
}

// Quy tắc 6: chỉ LĐV cho phát hành báo cáo thay thế báo cáo đã thu hồi — không tự động phát hành
// lại dù phương án khắc phục đã hoàn thành.
export function txApproveReplacementReport(
  n: NcwForRules,
  u: M13ActorUser,
  replacementReportRef: string
): TxResult {
  if (u.m13Role !== "LDV") return err("FORBIDDEN", "Chỉ LĐV được cho phát hành báo cáo thay thế (quy tắc 6 ETV.P13).");
  if (n.revokedReportCount === 0) return err("NO_REVOKED_REPORT", "Chưa có báo cáo/GCN nào bị thu hồi trong hồ sơ này.");
  if (!n.plan || n.plan.status !== "DAT") {
    return err(
      "CAP_REVIEW_REQUIRED",
      "Bắt buộc hành động khắc phục đã được QLCL thẩm xét ĐẠT trước khi LĐV cho phát hành báo cáo thay thế (quy tắc 6 ETV.P13)."
    );
  }
  if (!replacementReportRef) return err("REPLACEMENT_REF_REQUIRED", "Bắt buộc nhập số hiệu báo cáo thay thế.");
  return ok("DAT", "LĐV cho phát hành báo cáo thay thế", null, { replacementReportRef });
}
