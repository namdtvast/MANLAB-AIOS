// Bộ test cho quyết định của M28 — rules.ts là nơi DUY NHẤT quyết định "được phép hay không".
// Mỗi nhóm test dẫn chiếu quy tắc R1–R21 của DacTa M28 mục 5 và điều khoản ETV.P28 (lần BH 02,
// ban hành 26/08/2026) mà nó bảo vệ.
import { describe, expect, it } from "vitest";
import {
  ANNEX_A_CONTROL_COUNT,
  accessPrerequisiteIssue,
  closerRole,
  computeImpact,
  computeRiskScore,
  controlNeedsCapa,
  isAiIndexForbidden,
  isBcpInput,
  isRiskReviewDue,
  isTreatmentOverdue,
  maxTreatmentMonths,
  reportDeadlineHours,
  requiredApprover,
  riskLevel,
  treatmentIssues,
  txAcceptResidual,
  txAdvanceIncident,
  txApproveAccess,
  txApproveRisk,
  txApproveSoA,
  txCloseIncident,
  txExecuteAccess,
  txMarkRiskTreated,
  txReviewRisk,
  txRevokeAccess,
  txSubmitAccess,
  txSubmitRisk,
  txVerifyTreatment,
  validateRiskInput,
  type AccessForRules,
  type IncidentForRules,
  type RiskForRules,
  type TxResult,
} from "../rules";

function expectErr(result: TxResult, code: string) {
  expect(result.ok).toBe(false);
  if (result.ok) return;
  expect(result.code).toBe(code);
}

const LDV = { id: "u-ldv", m28Role: "LDV" };
const ATTT = { id: "u-attt", m28Role: "ATTT" };
const TP = { id: "u-tp", m28Role: "TP" };
const QTHT = { id: "u-qtht", m28Role: "QTHT" };
const QLCL = { id: "u-qlcl", m28Role: "QLCL" };

const baseRisk = (over: Partial<RiskForRules> = {}): RiskForRules => ({
  status: "DRAFT",
  assetRefs: ["TS-2026-001"],
  classification: "HAN_CHE",
  impactC: 4,
  impactI: 3,
  impactA: 2,
  likelihood: 3,
  riskScore: 12,
  treatmentOption: "GIAM_THIEU",
  soaControlRefs: ["A.8.13"],
  ownerId: "u-tp",
  ownerRole: "TP",
  residualScore: null,
  residualAcceptedById: null,
  residualAcceptReason: null,
  createdById: "u-attt",
  treatmentCount: 1,
  unverifiedTreatmentCount: 0,
  ...over,
});

const validRiskInput = {
  title: "Lộ lọt dữ liệu kết quả đo qua thư điện tử",
  threat: "Gửi nhầm người nhận",
  vulnerability: "Chưa bật cảnh báo gửi ra ngoài miền",
  assetRefs: ["TS-2026-001"],
  impactC: 4,
  impactI: 2,
  impactA: 2,
  likelihood: 3,
  ownerRole: "TP" as string | null,
  treatmentOption: "GIAM_THIEU" as const,
  soaControlRefs: ["A.5.14"],
};

describe("R1 — rủi ro phải gắn tài sản CÓ THẬT trong danh mục M27 (ETV.P28 mục 6.3)", () => {
  it("không gắn tài sản nào ⇒ không cho lưu", () => {
    expect(validateRiskInput({ ...validRiskInput, assetRefs: [] }, 0)).toMatch(/ít nhất 01 tài sản/i);
  });

  it("gắn mã tài sản không tồn tại trong M27 ⇒ không cho lưu", () => {
    // Khai 2 mã nhưng danh mục chỉ tìm thấy 1 — chặn, và nêu rõ số tìm thấy.
    expect(
      validateRiskInput({ ...validRiskInput, assetRefs: ["TS-2026-001", "TS-KHONG-CO"] }, 1),
    ).toMatch(/không tồn tại trong danh mục M27/i);
  });

  it("mọi mã đều có thật ⇒ hợp lệ", () => {
    expect(validateRiskInput(validRiskInput, 1)).toBeNull();
  });
});

describe("R2 — điểm rủi ro do hệ thống tính (ETV.P28 mục 6.4.2)", () => {
  it("T lấy giá trị LỚN NHẤT trong ba chiều C, I, A — không phải trung bình", () => {
    expect(computeImpact(4, 2, 1)).toBe(4);
    expect(computeImpact(1, 1, 5)).toBe(5);
  });

  it("R = K × T, và bốn ngưỡng đúng biên", () => {
    expect(computeRiskScore(3, 4)).toBe(12);
    expect(riskLevel(6)).toBe("THAP");
    expect(riskLevel(7)).toBe("TRUNG_BINH");
    expect(riskLevel(12)).toBe("TRUNG_BINH");
    expect(riskLevel(13)).toBe("CAO");
    expect(riskLevel(19)).toBe("CAO");
    expect(riskLevel(20)).toBe("RAT_CAO");
    expect(riskLevel(25)).toBe("RAT_CAO");
  });

  it("hạn xử lý theo mức: 12 / 06 / 03 tháng; mức Thấp không bắt buộc hạn (mục 6.4.3)", () => {
    expect(maxTreatmentMonths("TRUNG_BINH")).toBe(12);
    expect(maxTreatmentMonths("CAO")).toBe(6);
    expect(maxTreatmentMonths("RAT_CAO")).toBe(3);
    expect(maxTreatmentMonths("THAP")).toBeNull();
  });

  it("giá trị ngoài thang 1–5 ⇒ không cho lưu", () => {
    expect(validateRiskInput({ ...validRiskInput, likelihood: 6 }, 1)).toMatch(/từ 1 đến 5/i);
    expect(validateRiskInput({ ...validRiskInput, impactC: 0 }, 1)).toMatch(/từ 1 đến 5/i);
  });
});

describe("R3 — chủ sở hữu rủi ro là TP hoặc LĐV, KHÔNG phải QTHT (ETV.P28 mục 6.4.3)", () => {
  it("giao cho QTHT ⇒ chặn", () => {
    expect(validateRiskInput({ ...validRiskInput, ownerRole: "QTHT" }, 1)).toMatch(/không giao cho Quản trị hệ thống/i);
  });

  it("TP và LĐV đều hợp lệ", () => {
    expect(validateRiskInput({ ...validRiskInput, ownerRole: "TP" }, 1)).toBeNull();
    expect(validateRiskInput({ ...validRiskInput, ownerRole: "LDV" }, 1)).toBeNull();
  });

  it("chọn Giảm thiểu mà không ánh xạ kiểm soát SoA ⇒ chặn (mục 6.5.1)", () => {
    expect(validateRiskInput({ ...validRiskInput, soaControlRefs: [] }, 1)).toMatch(/mã kiểm soát trong SoA/i);
  });
});

describe("R4 — rủi ro ≥ 7 điểm bắt buộc có RTP; Rất cao bắt buộc khống chế tạm thời", () => {
  it("mức Trung bình mà chưa có hạng mục xử lý ⇒ chặn phê duyệt", () => {
    const r = baseRisk({ status: "PENDING_APPROVAL", riskScore: 12, treatmentCount: 0 });
    expectErr(txApproveRisk(r, LDV, true, false), "TREATMENT_REQUIRED");
  });

  it("mức Rất cao thiếu biện pháp khống chế tạm thời ⇒ chặn phê duyệt", () => {
    const r = baseRisk({ status: "PENDING_APPROVAL", riskScore: 20, treatmentCount: 1 });
    expect(treatmentIssues(r, false).join(" ")).toMatch(/khống chế tạm thời/i);
    expectErr(txApproveRisk(r, LDV, true, false), "TREATMENT_REQUIRED");
    expect(txApproveRisk(r, LDV, true, true)).toMatchObject({ ok: true, status: "DANG_XU_LY" });
  });

  it("mức Thấp không cần RTP — phê duyệt xong vào thẳng Đã xử lý", () => {
    const r = baseRisk({ status: "PENDING_APPROVAL", riskScore: 4, treatmentCount: 0 });
    expect(txApproveRisk(r, LDV, true, false)).toMatchObject({ ok: true, status: "DA_XU_LY" });
  });
});

describe("R5 — rủi ro tồn dư ≥ 7 chỉ LĐV chấp nhận, bắt buộc lý do (ETV.P28 mục 6.4.3)", () => {
  const treated = baseRisk({ status: "DA_XU_LY" });

  it("PT.ATTT đóng rủi ro tồn dư 9 điểm ⇒ chặn, đòi LĐV", () => {
    expectErr(txAcceptResidual(treated, ATTT, 3, 3, "chấp nhận"), "LDV_REQUIRED");
  });

  it("LĐV đóng nhưng không ghi lý do ⇒ chặn", () => {
    expectErr(txAcceptResidual(treated, LDV, 3, 3), "REASON_REQUIRED");
  });

  it("LĐV đóng có lý do ⇒ được, và lưu vết người chấp nhận", () => {
    const r = txAcceptResidual(treated, LDV, 3, 3, "Chi phí xử lý vượt giá trị bảo vệ");
    expect(r).toMatchObject({ ok: true, status: "CHAP_NHAN_TON_DU" });
    if (!r.ok) return;
    expect(r.patch.residualScore).toBe(9);
    expect(r.patch.residualAcceptedById).toBe("u-ldv");
  });

  it("tồn dư DƯỚI ngưỡng (≤ 6) ⇒ PT.ATTT đóng được, không cần văn bản chấp nhận của LĐV", () => {
    const r = txAcceptResidual(treated, ATTT, 2, 3);
    expect(r).toMatchObject({ ok: true, status: "CHAP_NHAN_TON_DU" });
    if (!r.ok) return;
    expect(r.patch.residualScore).toBe(6);
    expect(r.patch.residualAcceptedById).toBeNull();
  });
});

describe("R6 — biện pháp chưa xác nhận hiệu lực không được ghi là hoàn thành (mục 6.5.2)", () => {
  it("còn hạng mục chưa xác nhận ⇒ chặn chuyển Đã xử lý", () => {
    const r = baseRisk({ status: "DANG_XU_LY", treatmentCount: 2, unverifiedTreatmentCount: 1 });
    expectErr(txMarkRiskTreated(r, ATTT), "UNVERIFIED_TREATMENT");
  });

  it("chỉ PT.ATTT xác nhận hiệu lực", () => {
    const r = baseRisk({ status: "DANG_XU_LY" });
    expectErr(txMarkRiskTreated(r, QTHT), "FORBIDDEN");
    expect(txMarkRiskTreated(r, ATTT)).toMatchObject({ ok: true, status: "DA_XU_LY" });
  });

  it("xác nhận hạng mục: chỉ PT.ATTT, và bắt buộc ghi cách xác nhận hiệu lực", () => {
    const t = { status: "DANG_THUC_HIEN" as const, completedAt: null };
    expectErr(txVerifyTreatment(t, QLCL, "đã kiểm tra"), "FORBIDDEN");
    expectErr(txVerifyTreatment(t, ATTT, "   "), "EVIDENCE_REQUIRED");
    expect(txVerifyTreatment(t, ATTT, "Thử nghiệm gửi thư ra ngoài miền, cảnh báo hoạt động")).toMatchObject({
      ok: true,
      status: "HOAN_THANH",
    });
  });
});

describe("R7, R8 — Tuyên bố áp dụng (ETV.P28 mục 6.6)", () => {
  const pending = { status: "PENDING_APPROVAL" as const, scopeExclusions: null };

  it("chỉ LĐV phê duyệt SoA, kể cả việc loại trừ kiểm soát", () => {
    expectErr(txApproveSoA(pending, ATTT, true, 0, ANNEX_A_CONTROL_COUNT), "FORBIDDEN");
  });

  it("R7 — còn kiểm soát Loại trừ chưa nêu lý do ⇒ KHÔNG phê duyệt", () => {
    expectErr(txApproveSoA(pending, LDV, true, 3, ANNEX_A_CONTROL_COUNT), "EXCLUSION_REASON_REQUIRED");
  });

  it("SoA thiếu dòng — không đủ 93 kiểm soát của Phụ lục A ⇒ chặn", () => {
    expectErr(txApproveSoA(pending, LDV, true, 0, 91), "INCOMPLETE_SOA");
  });

  it("đủ 93 dòng và không còn thiếu lý do loại trừ ⇒ phê duyệt được, ghi ngày hiệu lực", () => {
    const r = txApproveSoA(pending, LDV, true, 0, ANNEX_A_CONTROL_COUNT);
    expect(r).toMatchObject({ ok: true, status: "DA_PHE_DUYET" });
    if (!r.ok) return;
    expect(r.patch.effectiveDate).toBeInstanceOf(Date);
  });

  it("R9 — kiểm soát Áp dụng, quá hạn cam kết mà chưa có bằng chứng ⇒ phải lập KPH", () => {
    const now = new Date("2026-08-26");
    expect(
      controlNeedsCapa({ applicable: true, evidenceRefs: [], evidenceDueAt: new Date("2026-07-01") }, now),
    ).toBe(true);
    // Đã có bằng chứng thì thôi.
    expect(
      controlNeedsCapa({ applicable: true, evidenceRefs: ["HS-01"], evidenceDueAt: new Date("2026-07-01") }, now),
    ).toBe(false);
    // Kiểm soát Loại trừ không phát sinh nghĩa vụ bằng chứng.
    expect(
      controlNeedsCapa({ applicable: false, evidenceRefs: [], evidenceDueAt: new Date("2026-07-01") }, now),
    ).toBe(false);
  });
});

describe("Sự cố an toàn thông tin — phân mức và thẩm quyền (ETV.P28 mục 6.8)", () => {
  const baseIncident = (over: Partial<IncidentForRules> = {}): IncidentForRules => ({
    status: "CHO_KET_LUAN",
    severity: "TRUNG_BINH",
    reporterId: "u-nv",
    affectsResultValidity: false,
    m10Ref: null,
    m11Ref: null,
    lessonRef: null,
    involvesCustomerData: "KHONG",
    involvesPersonalData: "KHONG",
    notificationCount: 0,
    evidencePreserved: "Ảnh màn hình, nhật ký máy chủ thư",
    recoveryAt: new Date("2026-08-20"),
    involvedUserIds: ["u-nv"],
    ...over,
  });

  it("thời hạn báo cáo nội bộ theo mức (mục 6.8.1)", () => {
    expect(reportDeadlineHours("THAP")).toBe(24);
    expect(reportDeadlineHours("TRUNG_BINH")).toBe(8);
    expect(reportDeadlineHours("CAO")).toBe(0); // ngay lập tức
    expect(reportDeadlineHours("RAT_CAO")).toBe(0);
  });

  it("thẩm quyền đóng: LĐV với Cao/Rất cao, PT.ATTT với Thấp/Trung bình (mục 6.8.2 bước 6)", () => {
    expect(closerRole("THAP")).toBe("ATTT");
    expect(closerRole("TRUNG_BINH")).toBe("ATTT");
    expect(closerRole("CAO")).toBe("LDV");
    expect(closerRole("RAT_CAO")).toBe("LDV");
    expectErr(txCloseIncident(baseIncident({ severity: "CAO" }), ATTT), "FORBIDDEN");
  });

  it("R20 — người liên quan trực tiếp không được đóng chính sự cố đó", () => {
    const i = baseIncident({ reporterId: ATTT.id, involvedUserIds: [ATTT.id] });
    expectErr(txCloseIncident(i, ATTT), "INVOLVED_PARTY");
  });

  it("R14 — ảnh hưởng hiệu lực kết quả mà thiếu ETV.P10/P11 ⇒ chặn đóng", () => {
    const i = baseIncident({ affectsResultValidity: true });
    expectErr(txCloseIncident(i, ATTT), "M10_M11_REQUIRED");
    expect(txCloseIncident({ ...i, m10Ref: "M10-2026-07", m11Ref: "M11-2026-03" }, ATTT)).toMatchObject({
      ok: true,
      status: "DA_DONG",
    });
  });

  it("R15 — sự cố mức Cao đóng mà chưa có bài học kinh nghiệm ⇒ chặn", () => {
    const i = baseIncident({ severity: "CAO" });
    expectErr(txCloseIncident(i, LDV), "LESSON_REQUIRED");
  });

  it("R15 — sự cố mức Cao liên quan dữ liệu cá nhân mà chưa thông báo ⇒ chặn", () => {
    const i = baseIncident({
      severity: "CAO",
      lessonRef: "BH-2026-02",
      involvesPersonalData: "CO",
      notificationCount: 0,
    });
    expectErr(txCloseIncident(i, LDV), "NOTIFICATION_REQUIRED");
    expect(txCloseIncident({ ...i, notificationCount: 1 }, LDV)).toMatchObject({ ok: true, status: "DA_DONG" });
  });

  it("chưa kết luận có liên quan dữ liệu khách hàng/cá nhân hay không ⇒ chặn đóng", () => {
    // Vì chính điều này quyết định nghĩa vụ thông báo theo mục 6.8.3.
    expectErr(txCloseIncident(baseIncident({ involvesCustomerData: "CHUA_XAC_DINH" }), ATTT), "SCOPE_UNDETERMINED");
  });

  it("trình tự 6 bước không nhảy cóc (mục 6.8.2)", () => {
    const moi = baseIncident({ status: "MOI" });
    expectErr(txAdvanceIncident(moi, ATTT, "DANG_KHAC_PHUC"), "BAD_STATE");
    expect(txAdvanceIncident(moi, QTHT, "DANG_KHONG_CHE", "Khoá tài khoản, cô lập máy")).toMatchObject({
      ok: true,
      status: "DANG_KHONG_CHE",
    });
  });

  it("R10 — chưa ghi bằng chứng đã bảo toàn ⇒ không cho chuyển sang điều tra", () => {
    const i = baseIncident({ status: "DANG_KHONG_CHE", evidencePreserved: null });
    expectErr(txAdvanceIncident(i, ATTT, "DANG_DIEU_TRA"), "EVIDENCE_REQUIRED");
  });

  it("huỷ phiếu vì cảnh báo giả: chỉ PT.ATTT và bắt buộc lý do", () => {
    const moi = baseIncident({ status: "MOI" });
    expectErr(txAdvanceIncident(moi, QTHT, "HUY", "giả"), "FORBIDDEN");
    expectErr(txAdvanceIncident(moi, ATTT, "HUY"), "REASON_REQUIRED");
    expect(txAdvanceIncident(moi, ATTT, "HUY", "Cảnh báo giả từ hệ thống giám sát")).toMatchObject({
      ok: true,
      status: "HUY",
    });
  });
});

describe("Quyền truy cập — R16, R17, R18, R19 (ETV.P28 mục 6.7.1)", () => {
  const baseAccess = (over: Partial<AccessForRules> = {}): AccessForRules => ({
    status: "DE_NGHI",
    subjectType: "NHAN_SU_CHINH_THUC",
    ndaRef: null,
    awarenessTrainingRef: "DT-2026-08",
    hasPrivilegedItem: false,
    touchesRestrictedOrSecret: false,
    requestedById: "u-tp",
    approvedById: null,
    ...over,
  });

  it("R16 — chưa đào tạo nhận thức ⇒ chặn cấp quyền", () => {
    const a = baseAccess({ awarenessTrainingRef: null });
    expect(accessPrerequisiteIssue(a)).toMatch(/đào tạo nhận thức/i);
    expectErr(txSubmitAccess(a, TP), "PREREQUISITE");
  });

  it("R16 — bên thứ ba chưa ký cam kết bảo mật ⇒ chặn", () => {
    const a = baseAccess({ subjectType: "NHA_CUNG_CAP_CNTT", ndaRef: null });
    expect(accessPrerequisiteIssue(a)).toMatch(/cam kết bảo mật/i);
  });

  it("R17 — tài khoản đặc quyền, mức Hạn chế/Mật, hoặc nhà cung cấp CNTT ⇒ bắt buộc LĐV duyệt", () => {
    expect(requiredApprover({ hasPrivilegedItem: true, touchesRestrictedOrSecret: false, subjectType: "NHAN_SU_CHINH_THUC" })).toBe("LDV");
    expect(requiredApprover({ hasPrivilegedItem: false, touchesRestrictedOrSecret: true, subjectType: "NHAN_SU_CHINH_THUC" })).toBe("LDV");
    expect(requiredApprover({ hasPrivilegedItem: false, touchesRestrictedOrSecret: false, subjectType: "NHA_CUNG_CAP_CNTT" })).toBe("LDV");
    expect(requiredApprover({ hasPrivilegedItem: false, touchesRestrictedOrSecret: false, subjectType: "NHAN_SU_CHINH_THUC" })).toBe("ATTT");

    const privileged = baseAccess({ status: "CHO_PHE_DUYET", hasPrivilegedItem: true });
    expectErr(txApproveAccess(privileged, ATTT, true), "LDV_REQUIRED");
    expect(txApproveAccess(privileged, LDV, true)).toMatchObject({ ok: true, status: "DA_PHE_DUYET" });
  });

  it("R18 — người đề nghị không tự phê duyệt", () => {
    const a = baseAccess({ status: "CHO_PHE_DUYET", requestedById: ATTT.id });
    expectErr(txApproveAccess(a, ATTT, true), "SELF_APPROVE");
  });

  it("R18 — QTHT chỉ THỰC HIỆN sau khi có phê duyệt hợp lệ, và không trùng người duyệt", () => {
    const chuaDuyet = baseAccess({ status: "CHO_PHE_DUYET" });
    expectErr(txExecuteAccess(chuaDuyet, QTHT, "LOG-1"), "NOT_APPROVED");

    const daDuyet = baseAccess({ status: "DA_PHE_DUYET", approvedById: "u-ldv" });
    expectErr(txExecuteAccess(daDuyet, ATTT, "LOG-1"), "FORBIDDEN");
    expectErr(txExecuteAccess(daDuyet, QTHT, "  "), "LOG_REQUIRED");
    expect(txExecuteAccess(daDuyet, QTHT, "LOG-2026-0912")).toMatchObject({ ok: true, status: "DA_THUC_HIEN" });

    // QTHT vừa là người duyệt vừa là người thực hiện ⇒ chặn.
    const tuDuyet = baseAccess({ status: "DA_PHE_DUYET", approvedById: QTHT.id });
    expectErr(txExecuteAccess(tuDuyet, QTHT, "LOG-3"), "SEGREGATION");
  });

  it("R19 — thu hồi phải ghi lý do VÀ xác nhận đã thu hồi thiết bị, token chữ ký số", () => {
    const a = baseAccess({ status: "DA_THUC_HIEN" });
    expectErr(txRevokeAccess(a, QTHT, true), "REASON_REQUIRED");
    expectErr(txRevokeAccess(a, QTHT, false, "Nghỉ việc"), "ASSETS_NOT_RETURNED");
    expect(txRevokeAccess(a, QTHT, true, "Nghỉ việc từ 30/08/2026")).toMatchObject({
      ok: true,
      status: "DA_THU_HOI",
    });
  });
});

describe("Cờ tính khi đọc — R11, R12, R13", () => {
  it("R12 — tác động tới tính sẵn sàng ≥ 4 là đầu vào bắt buộc của ETV.P31", () => {
    expect(isBcpInput(4)).toBe(true);
    expect(isBcpInput(5)).toBe(true);
    expect(isBcpInput(3)).toBe(false);
  });

  it("R13 — đánh giá rủi ro quá 12 tháng chưa rà soát ⇒ cảnh báo", () => {
    const now = new Date("2026-08-26");
    expect(isRiskReviewDue({ lastAssessedAt: new Date("2025-06-01"), status: "DANG_XU_LY" }, now)).toBe(true);
    expect(isRiskReviewDue({ lastAssessedAt: new Date("2026-06-01"), status: "DANG_XU_LY" }, now)).toBe(false);
    expect(isRiskReviewDue({ lastAssessedAt: null, status: "DA_XU_LY" }, now)).toBe(true);
    // Bản nháp và bản hết hiệu lực không nằm trong danh sách rà soát.
    expect(isRiskReviewDue({ lastAssessedAt: null, status: "DRAFT" }, now)).toBe(false);
    expect(isRiskReviewDue({ lastAssessedAt: null, status: "HET_HIEU_LUC" }, now)).toBe(false);
  });

  it("hạng mục xử lý quá hạn (mục 6.5.2)", () => {
    const now = new Date("2026-08-26");
    expect(isTreatmentOverdue({ dueAt: new Date("2026-07-01"), status: "DANG_THUC_HIEN" }, now)).toBe(true);
    expect(isTreatmentOverdue({ dueAt: new Date("2026-07-01"), status: "HOAN_THANH" }, now)).toBe(false);
    expect(isTreatmentOverdue({ dueAt: new Date("2026-12-01"), status: "MO" }, now)).toBe(false);
  });

  it("R11 — Hạn chế và Mật không bao giờ vào chỉ mục AI", () => {
    expect(isAiIndexForbidden("HAN_CHE")).toBe(true);
    expect(isAiIndexForbidden("MAT")).toBe(true);
    expect(isAiIndexForbidden("NOI_BO")).toBe(false);
    expect(isAiIndexForbidden("CONG_KHAI")).toBe(false);
  });
});

describe("Tách vai trò xuyên suốt (ETV.P28 mục 5.3)", () => {
  it("người lập không tự soát xét, không tự phê duyệt", () => {
    expectErr(txReviewRisk(baseRisk({ status: "PENDING_REVIEW", createdById: ATTT.id }), ATTT, true), "SELF_REVIEW");
    expectErr(txApproveRisk(baseRisk({ status: "PENDING_APPROVAL", createdById: LDV.id }), LDV, true, true), "SELF_APPROVE");
  });

  it("gửi soát xét khi chưa gắn tài sản ⇒ chặn (R1 lần nữa ở tầng chuyển trạng thái)", () => {
    expectErr(txSubmitRisk(baseRisk({ assetRefs: [] }), ATTT), "ASSET_REQUIRED");
  });
});
