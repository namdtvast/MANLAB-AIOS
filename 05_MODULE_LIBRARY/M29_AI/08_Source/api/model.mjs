// AIOS Control Plane — Enum nghiệp vụ & người dùng mô phỏng vai trò (server authoritative)

export const APPROVAL = {
  DRAFT: 'Nháp', PENDING_REVIEW: 'Chờ soát xét', RETURNED: 'Không soát xét',
  PENDING_APPROVAL: 'Chờ phê duyệt', REJECTED: 'Không phê duyệt', APPROVED: 'Đã phê duyệt',
  ARCHIVED: 'Hết hiệu lực/Hủy',
};
export const PROMPT_STATUS = { DRAFT: 'DRAFT', REVIEW: 'REVIEW', APPROVED: 'APPROVED', ACTIVE: 'ACTIVE', ARCHIVED: 'ARCHIVED' };
export const OP_STATUS = { ACTIVE: 'ACTIVE', DISABLED: 'DISABLED', DEPRECATED: 'DEPRECATED' };
export const HEALTH = { HEALTHY: 'HEALTHY', DEGRADED: 'DEGRADED', DOWN: 'DOWN', UNKNOWN: 'UNKNOWN' };
export const PERMISSION_LEVEL = { READ: 'READ', COMPUTE: 'COMPUTE', PROPOSE: 'PROPOSE', EXECUTE: 'EXECUTE' };
export const GUARDRAIL_ACTION = { BLOCK: 'BLOCK', WARN: 'WARN', REQUIRE_CONFIRMATION: 'REQUIRE_CONFIRMATION', REQUIRE_APPROVAL: 'REQUIRE_APPROVAL' };
export const AIA_STATUS = { NOT_ASSESSED: 'NOT_ASSESSED', DRAFT: 'DRAFT', REVIEWED: 'REVIEWED', APPROVED: 'APPROVED', REVIEW_REQUIRED: 'REVIEW_REQUIRED' };

// Thứ tự vai trò dùng để so sánh "tối thiểu cần có" cho permission_level của Tool.
export const ROLE_RANK = { AI_VIEWER: 1, AI_OPERATOR: 2, AI_ADMIN: 3, AI_SECURITY_ADMIN: 3, AI_AUDITOR: 1, SUPER_ADMIN: 9 };
export const TOOL_MIN_ROLE = { READ: 'AI_VIEWER', COMPUTE: 'AI_OPERATOR', PROPOSE: 'AI_ADMIN', EXECUTE: 'AI_ADMIN' };

export const USERS = {
  'U-VIEWER': { id: 'U-VIEWER', name: 'Ngô Viewer', role: 'AI_VIEWER' },
  'U-OPERATOR': { id: 'U-OPERATOR', name: 'Đặng Operator', role: 'AI_OPERATOR' },
  'U-ADMIN': { id: 'U-ADMIN', name: 'Dương Thành Nam', role: 'AI_ADMIN' },
  'U-SECADMIN': { id: 'U-SECADMIN', name: 'Bùi Security', role: 'AI_SECURITY_ADMIN' },
  'U-AUDITOR': { id: 'U-AUDITOR', name: 'Vũ Auditor', role: 'AI_AUDITOR' },
  'U-SUPER': { id: 'U-SUPER', name: 'Super Admin', role: 'SUPER_ADMIN' },
};
export const ROLE_USER = {
  AI_VIEWER: 'U-VIEWER', AI_OPERATOR: 'U-OPERATOR', AI_ADMIN: 'U-ADMIN',
  AI_SECURITY_ADMIN: 'U-SECADMIN', AI_AUDITOR: 'U-AUDITOR', SUPER_ADMIN: 'U-SUPER',
};

export const nowISO = () => new Date().toISOString();
export const genId = (prefix) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
