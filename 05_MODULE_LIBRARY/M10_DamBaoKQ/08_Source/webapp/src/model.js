// M10_DamBaoKQ — Mô hình dữ liệu & hằng số nghiệp vụ
// Nguồn: ../../01_Requirement/DacTa.md, ../../03_Database/DataModel.md

export const RECORD_TYPES = {
  PLAN:            { label: 'PLAN — Kế hoạch (F10.01)',            form: 'F10.01', indicators: [] },
  QC:              { label: 'QC — Kiểm soát chất lượng (F10.02)',  form: 'F10.02', indicators: ['Bias%', 'Recovery%', 'RSD-CV%'] },
  PROFICIENCY:     { label: 'PROFICIENCY — Tay nghề (F10.03)',     form: 'F10.03', indicators: ['z-score', 'En'] },
  PT_ILC:          { label: 'PT_ILC — So sánh liên phòng (F10.04)', form: 'F10.04', indicators: ['z-score', 'En', 'zeta'] },
  HOMOGENEITY:     { label: 'HOMOGENEITY — Đồng nhất (F10.05)',    form: 'F10.05', indicators: ['u_hom'] },
  STABILITY:       { label: 'STABILITY — Ổn định (F10.06)',        form: 'F10.06', indicators: ['u_stab'] },
  CHARACTERIZATION:{ label: 'CHARACTERIZATION — Đặc trưng RM/CRM (F10.07)', form: 'F10.07', indicators: ['U_CRM', 'k'] },
  TOOL_AI:         { label: 'TOOL_AI — Xác nhận công cụ số (F10.08)', form: 'F10.08', indicators: [] },
  PUBLICATION:     { label: 'PUBLICATION — Công bố nội bộ (F10.09)', form: 'F10.09', indicators: [] },
};

// Trạng thái vòng đời — khớp 07_Workflow/StateMachine.md
export const STATUS = {
  DRAFT:        'Nháp',
  PENDING_REVIEW:  'Chờ soát xét',
  RETURNED:     'Trả lại',
  PENDING_APPROVAL: 'Chờ phê duyệt',
  REJECTED:     'Từ chối',
  APPROVED:     'Đã phê duyệt',
  PUBLISHED:    'Đã công bố',
  EXPIRED:      'Hết hiệu lực',
  REVOKED:      'Thu hồi/Hủy',
};

export const RESULT = { PASS: 'ĐẠT', WARNING: 'CẢNH BÁO', FAIL: 'KHÔNG ĐẠT' };

export const PUB_STATUS = {
  PASS:          { label: 'PASS',          release: true,  tone: 'good' },
  CONDITIONAL:   { label: 'CONDITIONAL',   release: true,  tone: 'accent' },
  WARNING:       { label: 'WARNING',       release: true,  tone: 'warn' },
  'FAIL-BLOCKED':{ label: 'FAIL-BLOCKED',  release: false, tone: 'crit' },
  EXPIRED:       { label: 'EXPIRED',       release: false, tone: 'neutral' },
};

// Vai trò — khớp DacTa §4
export const ROLES = {
  NTH:  'Người thực hiện (mọi tài khoản)',
  LDP:  'Lãnh đạo phòng — soát xét',
  LDV:  'Lãnh đạo Viện — phê duyệt/công bố',
  QLCL: 'Quản lý chất lượng',
  QTHT: 'Quản trị hệ thống / ATTT',
};

export const USERS = {
  NTH:  { id: 'U-NTH', name: 'Nguyễn Thị H.', role: 'NTH' },
  LDP:  { id: 'U-LDP', name: 'Trần Thị Hoa',  role: 'LDP' },
  LDV:  { id: 'U-LDV', name: 'Lê Văn V.',     role: 'LDV' },
  QLCL: { id: 'U-QLCL', name: 'Phạm Q.',      role: 'QLCL' },
  QTHT: { id: 'U-QTHT', name: 'Đỗ A.',        role: 'QTHT' },
};

let _seq = 43;
export function nextId() {
  return `P10-2026-${String(_seq++).padStart(4, '0')}`;
}

export function nowISO() { return new Date().toISOString(); }

export function fmtTime(iso) {
  const d = new Date(iso);
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

// Dữ liệu mẫu ban đầu (khớp mock hi-fi)
export function seed() {
  return [
    mk('P10-2026-0042', 'PT_ILC', 'Mẫu A · Chì trong nước', STATUS.PENDING_REVIEW, RESULT.WARNING,
       { 'z-score': 2.4, En: 0.8, zeta: 1.1 }, { rawData: 3, evidence: 2, criteriaId: 'TC-ISO17043 v2', personnelId: 'Nguyễn Thị H.', planId: 'F10.01-2026-007', procedureId: 'M08·PP-014', capaId: null }),
    mk('P10-2026-0041', 'QC', 'Lô 12 · Cân phân tích', STATUS.APPROVED, RESULT.PASS,
       { 'Bias%': 0.8, 'Recovery%': 99.2, 'RSD-CV%': 1.4 }, { rawData: 4, evidence: 2, criteriaId: 'TC-QC v3', personnelId: 'Nguyễn Thị H.', planId: 'F10.01-2026-007', procedureId: 'M08·PP-009', capaId: null }),
    mk('P10-2026-0040', 'STABILITY', 'CRM-3 · Mẫu chuẩn', STATUS.DRAFT, RESULT.FAIL,
       { u_stab: 0.12 }, { rawData: 2, evidence: 1, criteriaId: 'TC-17034 v1', personnelId: 'Nguyễn Thị H.', planId: 'F10.01-2026-007', procedureId: 'M08·PP-021', capaId: null }),
    mk('P10-2026-0039', 'PT_ILC', 'Mẫu B · Độ dẫn điện', STATUS.PUBLISHED, RESULT.PASS,
       { 'z-score': 0.6, En: 0.4 }, { rawData: 3, evidence: 2, criteriaId: 'TC-ISO17043 v2', personnelId: 'Nguyễn Thị H.', planId: 'F10.01-2026-006', procedureId: 'M08·PP-014', capaId: null, pubStatus: 'CONDITIONAL', sourceCertId: 'F11.03-2026-0210', expiresAt: '2027-07-16' }),
  ];
}

function mk(id, recordType, object, status, result, indicators, extra) {
  return {
    id, recordType, object, status, result, version: 1,
    indicators,
    planId: extra.planId, procedureId: extra.procedureId, personnelId: extra.personnelId,
    criteriaId: extra.criteriaId, rawData: extra.rawData, evidence: extra.evidence,
    capaId: extra.capaId ?? null,
    pubStatus: extra.pubStatus ?? null, sourceCertId: extra.sourceCertId ?? null,
    sourceSnapshotAt: extra.sourceCertId ? nowISO() : null,
    releaseAllowed: extra.pubStatus ? (PUB_STATUS[extra.pubStatus]?.release ?? false) : false,
    expiresAt: extra.expiresAt ?? null,
    createdBy: 'U-NTH', reviewedBy: null, approvedBy: null,
    audit: [{ ts: nowISO(), actor: 'U-NTH', role: 'NTH', action: 'Tạo hồ sơ', reason: null }],
  };
}
