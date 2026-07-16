// M10 API — Control rules R1–R8 (nguồn xác thực phía server)
import { STATUS, RESULT, PUB_STATUS, NO_TECH } from './model.mjs';

export function validateForSubmit(a) {
  const miss = [];
  if (!NO_TECH.has(a.recordType)) {
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
export const canReview = (a, u) => u.role === 'LDP' && a.createdBy !== u.id;
export const canApprove = (a, u) => u.role === 'LDV' && a.createdBy !== u.id && a.reviewedBy !== u.id;
export const canPublish = (a, u) => u.role === 'LDV';
export const requiresCapa = (a) => a.result === RESULT.FAIL && !a.capaId;

export function derivePubStatus(a) {
  if (a.expiresAt && new Date(a.expiresAt) < new Date()) return 'EXPIRED';
  if (a.result === RESULT.FAIL) return 'FAIL-BLOCKED';
  if (a.result === RESULT.WARNING) return 'WARNING';
  return 'PASS';
}

const ok = (status, action, reason = null, patch = {}) => ({ ok: true, status, action, reason, patch });
const err = (code, message) => ({ ok: false, code, message });

export const T = {
  submit(a) {
    if (![STATUS.DRAFT, STATUS.RETURNED, STATUS.REJECTED].includes(a.status))
      return err('NOT_DRAFT', 'Chỉ hồ sơ Nháp/Trả lại/Từ chối mới gửi được.');
    const miss = validateForSubmit(a);
    if (miss.length) return err('MISSING_REQUIRED', 'Thiếu: ' + miss.join(', '));
    return ok(STATUS.PENDING_REVIEW, 'Gửi soát xét');
  },
  review(a, u, { decision, reason } = {}) {
    if (a.status !== STATUS.PENDING_REVIEW) return err('BAD_STATE', 'Hồ sơ không ở bước Chờ soát xét.');
    if (!canReview(a, u)) return err('SELF_REVIEW_FORBIDDEN', 'Chỉ LĐP (không phải người tạo) được soát xét.');
    if (decision === 'return') {
      if (!reason) return err('REASON_REQUIRED', 'Trả lại bắt buộc nhập lý do.');
      return ok(STATUS.RETURNED, 'Trả lại khi soát xét', reason, { reviewedBy: u.id });
    }
    return ok(STATUS.PENDING_APPROVAL, 'Soát xét đạt → chờ phê duyệt', null, { reviewedBy: u.id });
  },
  approve(a, u, { decision, reason } = {}) {
    if (a.status !== STATUS.PENDING_APPROVAL) return err('BAD_STATE', 'Hồ sơ không ở bước Chờ phê duyệt.');
    if (!canApprove(a, u)) return err('SELF_REVIEW_FORBIDDEN', 'Chỉ LĐV (không phải người tạo/soát xét) được phê duyệt.');
    if (decision === 'reject') {
      if (!reason) return err('REASON_REQUIRED', 'Từ chối bắt buộc nhập lý do.');
      return ok(STATUS.REJECTED, 'Từ chối phê duyệt', reason, { approvedBy: null });
    }
    if (requiresCapa(a)) return err('CAPA_REQUIRED', 'Kết quả KHÔNG ĐẠT: bắt buộc liên kết KPH-CAPA trước khi phê duyệt.');
    return ok(STATUS.APPROVED, 'Phê duyệt', null, { approvedBy: u.id });
  },
  publish(a, u, { pubStatus, expiresAt, sourceCertId } = {}) {
    if (a.status !== STATUS.APPROVED) return err('BAD_STATE', 'Chỉ hồ sơ Đã phê duyệt mới công bố được.');
    if (!canPublish(a, u)) return err('SELF_REVIEW_FORBIDDEN', 'Chỉ LĐV được công bố.');
    const release = PUB_STATUS[pubStatus]?.release ?? false;
    if (!release && requiresCapa(a)) return err('CAPA_REQUIRED', 'FAIL-BLOCKED: cần liên kết CAPA (→ M13).');
    return ok(STATUS.PUBLISHED, `Công bố (${pubStatus})`, null,
      { pubStatus, releaseAllowed: release, expiresAt, sourceCertId, sourceSnapshotAt: new Date().toISOString() });
  },
};
