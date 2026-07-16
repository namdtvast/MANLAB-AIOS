// M10 API — Enum nghiệp vụ & dữ liệu mẫu (server authoritative)
export const STATUS = {
  DRAFT: 'Nháp', PENDING_REVIEW: 'Chờ soát xét', RETURNED: 'Trả lại',
  PENDING_APPROVAL: 'Chờ phê duyệt', REJECTED: 'Từ chối', APPROVED: 'Đã phê duyệt',
  PUBLISHED: 'Đã công bố', EXPIRED: 'Hết hiệu lực', REVOKED: 'Thu hồi/Hủy',
};
export const RESULT = { PASS: 'ĐẠT', WARNING: 'CẢNH BÁO', FAIL: 'KHÔNG ĐẠT' };
export const PUB_STATUS = {
  PASS: { release: true }, CONDITIONAL: { release: true }, WARNING: { release: true },
  'FAIL-BLOCKED': { release: false }, EXPIRED: { release: false },
};
export const NO_TECH = new Set(['PLAN', 'PUBLICATION']); // record_type không cần trường kỹ thuật

export const USERS = {
  'U-NTH': { id: 'U-NTH', name: 'Nguyễn Thị H.', role: 'NTH' },
  'U-LDP': { id: 'U-LDP', name: 'Trần Thị Hoa', role: 'LDP' },
  'U-LDV': { id: 'U-LDV', name: 'Lê Văn V.', role: 'LDV' },
  'U-QLCL': { id: 'U-QLCL', name: 'Phạm Q.', role: 'QLCL' },
  'U-QTHT': { id: 'U-QTHT', name: 'Đỗ A.', role: 'QTHT' },
};
export const ROLE_USER = { NTH: 'U-NTH', LDP: 'U-LDP', LDV: 'U-LDV', QLCL: 'U-QLCL', QTHT: 'U-QTHT' };

export const nowISO = () => new Date().toISOString();

export function seed() {
  const mk = (id, recordType, object, status, result, indicators, x) => ({
    id, recordType, object, status, result, version: 1, indicators,
    planId: x.planId, procedureId: x.procedureId, personnelId: x.personnelId, criteriaId: x.criteriaId,
    rawData: x.rawData, evidence: x.evidence, capaId: x.capaId ?? null,
    pubStatus: x.pubStatus ?? null, sourceCertId: x.sourceCertId ?? null,
    sourceSnapshotAt: x.sourceCertId ? nowISO() : null,
    releaseAllowed: x.pubStatus ? (PUB_STATUS[x.pubStatus]?.release ?? false) : false,
    expiresAt: x.expiresAt ?? null,
    createdBy: 'U-NTH', reviewedBy: null, approvedBy: null,
    audit: [{ ts: nowISO(), actor: 'U-NTH', role: 'NTH', action: 'Tạo hồ sơ', reason: null }],
  });
  return {
    seq: 43,
    list: [
      mk('P10-2026-0042', 'PT_ILC', 'Mẫu A · Chì trong nước', STATUS.PENDING_REVIEW, RESULT.WARNING,
        { 'z-score': 2.4, En: 0.8, zeta: 1.1 }, { rawData: 3, evidence: 2, criteriaId: 'TC-ISO17043 v2', personnelId: 'Nguyễn Thị H.', planId: 'F10.01-2026-007', procedureId: 'M08·PP-014' }),
      mk('P10-2026-0041', 'QC', 'Lô 12 · Cân phân tích', STATUS.APPROVED, RESULT.PASS,
        { 'Bias%': 0.8, 'Recovery%': 99.2, 'RSD-CV%': 1.4 }, { rawData: 4, evidence: 2, criteriaId: 'TC-QC v3', personnelId: 'Nguyễn Thị H.', planId: 'F10.01-2026-007', procedureId: 'M08·PP-009' }),
      mk('P10-2026-0040', 'STABILITY', 'CRM-3 · Mẫu chuẩn', STATUS.DRAFT, RESULT.FAIL,
        { u_stab: 0.12 }, { rawData: 2, evidence: 1, criteriaId: 'TC-17034 v1', personnelId: 'Nguyễn Thị H.', planId: 'F10.01-2026-007', procedureId: 'M08·PP-021' }),
      mk('P10-2026-0039', 'PT_ILC', 'Mẫu B · Độ dẫn điện', STATUS.PUBLISHED, RESULT.PASS,
        { 'z-score': 0.6, En: 0.4 }, { rawData: 3, evidence: 2, criteriaId: 'TC-ISO17043 v2', personnelId: 'Nguyễn Thị H.', planId: 'F10.01-2026-006', procedureId: 'M08·PP-014', pubStatus: 'CONDITIONAL', sourceCertId: 'F11.03-2026-0210', expiresAt: '2027-07-16' }),
    ],
  };
}
