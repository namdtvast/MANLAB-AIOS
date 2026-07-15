// M10_DamBaoKQ — Quy tắc nghiệp vụ (control rules R1–R8)
// Nguồn: ../../01_Requirement/DacTa.md §3, ../../02_API/API.md §5, 07_Workflow/StateMachine.md
import { STATUS, RESULT, PUB_STATUS, RECORD_TYPES } from './model.js';

// Lỗi nghiệp vụ tương ứng mã 409 trong API.md §5
export class RuleError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}

// R2 — đủ trường bắt buộc theo record_type trước khi gửi soát xét
export function validateForSubmit(a) {
  const miss = [];
  if (a.recordType !== 'PLAN' && a.recordType !== 'PUBLICATION') {
    if (!a.planId) miss.push('kế hoạch (plan_id)');
    if (!a.procedureId) miss.push('quy trình (procedure_id)');
    if (!a.criteriaId) miss.push('tiêu chí (criteria_id)');
    if (!a.personnelId) miss.push('nhân sự (personnel_id)');
    if (!a.rawData || a.rawData < 1) miss.push('dữ liệu thô (raw_data)');
    if (!a.evidence || a.evidence < 1) miss.push('bằng chứng (evidence)');
    if (!a.result) miss.push('kết quả (result)');
  }
  return miss;
}

// R8 — tách tạo/soát xét/phê duyệt; không tự soát xét/tự phê duyệt hồ sơ mình tạo
export function canReview(a, user) {
  return user.role === 'LDP' && a.createdBy !== user.id;
}
export function canApprove(a, user) {
  return user.role === 'LDV' && a.createdBy !== user.id && a.reviewedBy !== user.id;
}
export function canPublish(a, user) { return user.role === 'LDV'; }

// R4 — kết quả KHÔNG ĐẠT bắt buộc có CAPA trước khi phê duyệt/công bố; khóa phát hành
export function requiresCapa(a) {
  return a.result === RESULT.FAIL && !a.capaId;
}

// Suy ra trạng thái công bố (F10.09) từ kết quả — bảng trạng thái Outputs.md
export function derivePubStatus(a) {
  if (a.expiresAt && new Date(a.expiresAt) < new Date()) return 'EXPIRED';
  if (a.result === RESULT.FAIL) return 'FAIL-BLOCKED';
  if (a.result === RESULT.WARNING) return 'WARNING';
  return 'PASS';
}

// ---- Chuyển trạng thái (transitions) — trả về {ok, code, message} ----
export const T = {
  submit(a, user) {
    if (a.status !== STATUS.DRAFT && a.status !== STATUS.RETURNED && a.status !== STATUS.REJECTED)
      return err('NOT_DRAFT', 'Chỉ hồ sơ ở trạng thái Nháp/Trả lại/Từ chối mới gửi được.');
    const miss = validateForSubmit(a);
    if (miss.length) return err('MISSING_REQUIRED', 'Thiếu: ' + miss.join(', '));
    return ok(STATUS.PENDING_REVIEW, 'Gửi soát xét');
  },
  review(a, user, decision, reason) {
    if (a.status !== STATUS.PENDING_REVIEW) return err('BAD_STATE', 'Hồ sơ không ở bước Chờ soát xét.');
    if (!canReview(a, user)) return err('SELF_REVIEW_FORBIDDEN', 'Chỉ LĐP (không phải người tạo) được soát xét.');
    if (decision === 'return') {
      if (!reason) return err('REASON_REQUIRED', 'Trả lại bắt buộc nhập lý do.');
      return ok(STATUS.RETURNED, 'Trả lại khi soát xét', reason, { reviewedBy: user.id });
    }
    return ok(STATUS.PENDING_APPROVAL, 'Soát xét đạt → chờ phê duyệt', null, { reviewedBy: user.id });
  },
  approve(a, user, decision, reason) {
    if (a.status !== STATUS.PENDING_APPROVAL) return err('BAD_STATE', 'Hồ sơ không ở bước Chờ phê duyệt.');
    if (!canApprove(a, user)) return err('SELF_REVIEW_FORBIDDEN', 'Chỉ LĐV (không phải người tạo/soát xét) được phê duyệt.');
    if (decision === 'reject') {
      if (!reason) return err('REASON_REQUIRED', 'Từ chối bắt buộc nhập lý do.');
      return ok(STATUS.REJECTED, 'Từ chối phê duyệt', reason, { approvedBy: null });
    }
    if (requiresCapa(a)) return err('CAPA_REQUIRED', 'Kết quả KHÔNG ĐẠT: bắt buộc liên kết KPH-CAPA trước khi phê duyệt.');
    return ok(STATUS.APPROVED, 'Phê duyệt', null, { approvedBy: user.id });
  },
  publish(a, user, pubStatus, expiresAt) {
    if (a.status !== STATUS.APPROVED) return err('BAD_STATE', 'Chỉ hồ sơ Đã phê duyệt mới công bố được.');
    if (!canPublish(a, user)) return err('SELF_REVIEW_FORBIDDEN', 'Chỉ LĐV được công bố.');
    const release = PUB_STATUS[pubStatus]?.release ?? false;
    if (!release && requiresCapa(a)) return err('CAPA_REQUIRED', 'FAIL-BLOCKED: cần liên kết CAPA (→ M13).');
    return ok(STATUS.PUBLISHED, `Công bố (${pubStatus})`, null, { pubStatus, releaseAllowed: release, expiresAt });
  },
};

function ok(status, action, reason = null, patch = {}) { return { ok: true, status, action, reason, patch }; }
function err(code, message) { return { ok: false, code, message }; }
