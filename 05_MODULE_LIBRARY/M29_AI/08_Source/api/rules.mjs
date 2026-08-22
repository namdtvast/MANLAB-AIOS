// AIOS Control Plane — RBAC matrix + vòng đời phê duyệt chuẩn (nguồn xác thực phía server)
import { APPROVAL, PROMPT_STATUS, AIA_STATUS, PERMISSION_LEVEL, TOOL_MIN_ROLE, ROLE_RANK } from './model.mjs';

// Ma trận RBAC — khớp mục 4 (RBAC) trong DacTa.md của M29_AI.
const PERMS = {
  AI_VIEWER:         { platforms: 'r', registry: 'r', health: 'r' },
  AI_OPERATOR:       { platforms: 'r', registry: 'r', evaluations: 'rw', traces: 'r', usage: 'r', health: 'r' },
  AI_ADMIN:          { platforms: 'r', registry: 'rw', aia: 'rw', governance: 'r', evaluations: 'r', health: 'r' },
  AI_SECURITY_ADMIN: { platforms: 'r', registry: 'r', governance: 'rw', secrets: 'rw', health: 'r' },
  AI_AUDITOR:        { platforms: 'r', registry: 'r', governance: 'r', aia: 'r', audit: 'r', traces: 'r', health: 'r' },
  SUPER_ADMIN:       { platforms: 'rw', registry: 'rw', governance: 'rw', aia: 'rw', evaluations: 'rw', traces: 'r', usage: 'r', secrets: 'rw', audit: 'r', health: 'r' },
};
export function can(role, category, action = 'read') {
  const p = (PERMS[role] || {})[category] || '';
  return action === 'write' ? p.includes('w') : p.length > 0;
}

const ok = (status, action, reason = null, patch = {}) => ({ ok: true, status, action, reason, patch });
const err = (code, message) => ({ ok: false, code, message });

// Vòng đời chuẩn (Nháp→...→Hết hiệu lực/Hủy) — dùng chung cho Platform/Guardrail/Policy.
export const approvalTransitions = {
  submit(entity) {
    if (![APPROVAL.DRAFT, APPROVAL.RETURNED, APPROVAL.REJECTED].includes(entity.approvalStatus))
      return err('NOT_DRAFT', 'Chỉ bản ghi Nháp/Không soát xét/Không phê duyệt mới gửi được.');
    return ok(APPROVAL.PENDING_REVIEW, 'Gửi soát xét');
  },
  review(entity, user, { decision, reason } = {}) {
    if (entity.approvalStatus !== APPROVAL.PENDING_REVIEW) return err('BAD_STATE', 'Không ở bước Chờ soát xét.');
    if (decision === 'return') {
      if (!reason) return err('REASON_REQUIRED', 'Trả lại bắt buộc nhập lý do.');
      return ok(APPROVAL.RETURNED, 'Trả lại khi soát xét', reason);
    }
    return ok(APPROVAL.PENDING_APPROVAL, 'Soát xét đạt → chờ phê duyệt');
  },
  approve(entity, user, { decision, reason } = {}) {
    if (entity.approvalStatus !== APPROVAL.PENDING_APPROVAL) return err('BAD_STATE', 'Không ở bước Chờ phê duyệt.');
    if (decision === 'reject') {
      if (!reason) return err('REASON_REQUIRED', 'Từ chối bắt buộc nhập lý do.');
      return ok(APPROVAL.REJECTED, 'Từ chối phê duyệt', reason);
    }
    return ok(APPROVAL.APPROVED, 'Phê duyệt', null, { approved_by: user.id });
  },
  archive(entity, user, { reason } = {}) {
    if (entity.approvalStatus !== APPROVAL.APPROVED) return err('BAD_STATE', 'Chỉ bản ghi Đã phê duyệt mới Hết hiệu lực/Hủy được.');
    if (!reason) return err('REASON_REQUIRED', 'Hết hiệu lực/Hủy bắt buộc nhập lý do.');
    return ok(APPROVAL.ARCHIVED, 'Hết hiệu lực/Hủy', reason);
  },
};

// AIA dùng bộ trạng thái riêng (NOT_ASSESSED/DRAFT/REVIEWED/APPROVED/REVIEW_REQUIRED).
export const aiaTransitions = {
  startDraft(a) {
    if (![AIA_STATUS.NOT_ASSESSED, AIA_STATUS.REVIEW_REQUIRED].includes(a.status)) return err('BAD_STATE', 'Chỉ khởi tạo từ Chưa đánh giá/Cần rà soát lại.');
    return ok(AIA_STATUS.DRAFT, 'Khởi tạo AIA');
  },
  submitReview(a) {
    if (a.status !== AIA_STATUS.DRAFT) return err('BAD_STATE', 'Chỉ Nháp mới gửi soát xét được.');
    return ok(AIA_STATUS.REVIEWED, 'Đã soát xét');
  },
  approve(a, user) {
    if (a.status !== AIA_STATUS.REVIEWED) return err('BAD_STATE', 'Chỉ AIA Đã soát xét mới phê duyệt được.');
    return ok(AIA_STATUS.APPROVED, 'Phê duyệt AIA', null, { approved_by: user.id });
  },
  flagReviewRequired(a, user, { reason } = {}) {
    if (a.status !== AIA_STATUS.APPROVED) return err('BAD_STATE', 'Chỉ AIA Đã phê duyệt mới gắn cờ cần rà soát lại.');
    if (!reason) return err('REASON_REQUIRED', 'Gắn cờ rà soát lại bắt buộc nhập lý do.');
    return ok(AIA_STATUS.REVIEW_REQUIRED, 'Gắn cờ cần rà soát lại', reason);
  },
};

// Prompt version: chỉ 1 bản ACTIVE / agent; sửa nội dung luôn tạo bản mới (AC-06).
export const promptTransitions = {
  submitReview(v) {
    if (v.status !== PROMPT_STATUS.DRAFT) return err('BAD_STATE', 'Chỉ version Nháp mới gửi soát xét được.');
    return ok(PROMPT_STATUS.REVIEW, 'Gửi soát xét');
  },
  approve(v, user) {
    if (v.status !== PROMPT_STATUS.REVIEW) return err('BAD_STATE', 'Chỉ version đang soát xét mới phê duyệt được.');
    return ok(PROMPT_STATUS.APPROVED, 'Phê duyệt version', null, { approved_by: user.id });
  },
  activate(v) {
    if (v.status !== PROMPT_STATUS.APPROVED) return err('BAD_STATE', 'Chỉ version Đã phê duyệt mới kích hoạt được.');
    return ok(PROMPT_STATUS.ACTIVE, 'Kích hoạt version');
  },
};

// Ràng buộc dữ liệu Tool (mục 5.1 DacTa.md M29_AI).
export function validateTool(t) {
  if (t.permission_level === PERMISSION_LEVEL.EXECUTE && !t.require_confirmation && !t.require_approval)
    return err('EXECUTE_REQUIRES_GUARD', 'Tool permission_level=EXECUTE bắt buộc require_confirmation hoặc require_approval.');
  return { ok: true };
}

// Tool Gateway: user có đủ quyền tối thiểu theo permission_level của Tool không.
export function hasToolPermission(role, tool) {
  const minRole = TOOL_MIN_ROLE[tool.permission_level];
  return (ROLE_RANK[role] || 0) >= (ROLE_RANK[minRole] || 99);
}
