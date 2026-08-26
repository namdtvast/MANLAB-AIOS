// Bộ test cho quyết định chuyển trạng thái của M33 — rules.ts là nơi DUY NHẤT quyết định
// "được phép hay không". Mỗi nhóm test dẫn chiếu quy tắc R1–R22 của DacTa M33 và điều khoản
// ETV.P33 (DỰ THẢO, Chờ soát xét) mà nó bảo vệ; ánh xạ AC theo 04_UI/Screens.md mục 3.
import { describe, expect, it } from "vitest";
import {
  baselineIssues,
  computeIncidentDue,
  computePriority,
  detectSecretPatterns,
  isInventoryOverdue,
  isMaintenanceDue,
  isReviewDue,
  maintenanceOverdueCycles,
  patchDueAt,
  txAcceptTask,
  txApproveAsset,
  txApprovePlan,
  txCancelTask,
  txCloseIncident,
  txCloseRecon,
  txDisposeAsset,
  txFlagOrphanAccount,
  txPerformTask,
  txRespondIncident,
  txRetireAsset,
  txReviewAsset,
  txSubmitAsset,
  validateAccountInput,
  validateAssetInput,
  type AssetForRules,
  type IncidentForRules,
  type TaskForRules,
  type TxResult,
} from "../rules";

function expectErr(result: TxResult, code: string) {
  expect(result.ok).toBe(false);
  if (result.ok) return;
  expect(result.code).toBe(code);
}

const baseAsset = (over: Partial<AssetForRules> = {}): AssetForRules => ({
  status: "DRAFT",
  assetClass: "MAY_CHU",
  userOwnerId: "u-tp",
  custodianId: "u-qtht",
  criticality: "TRUNG_BINH",
  maxClassification: "NOI_BO",
  diskEncryption: false,
  screenLock: null,
  antimalware: null,
  defaultPasswordChanged: true,
  unusedServicesClosed: true,
  isPersonalDevice: false,
  byodApprovalRef: null,
  licenseType: null,
  licenseExpiry: null,
  measuringDeviceRef: null,
  recoveryTimeObjective: null,
  failoverPlan: null,
  riskRefs: [],
  platformRefs: [],
  infoAssetRefs: [],
  disposalEvidenceRef: null,
  createdById: "u-qtht",
  ...over,
});

describe("R1/R4/R7 — validateAssetInput: không có hạ tầng vô chủ (ETV.P33 Phụ lục I.1)", () => {
  const valid = { name: "Máy chủ dữ liệu đo", location: "Phòng máy chủ tầng 3", assetClass: "MAY_CHU" as const, userOwnerId: "u1", custodianId: "u2" };

  it("AC1 — thiếu custodian hoặc user_owner ⇒ không cho lưu (R1)", () => {
    expect(validateAssetInput({ ...valid, custodianId: null })).toMatch(/chủ quản trị/);
    expect(validateAssetInput({ ...valid, userOwnerId: null })).toMatch(/đơn vị sử dụng/);
    expect(validateAssetInput(valid)).toBeNull();
  });

  it("máy tính điều khiển thiết bị đo bắt buộc trỏ M05 (R4)", () => {
    expect(validateAssetInput({ ...valid, assetClass: "MAY_TINH_DIEU_KHIEN_DO" })).toMatch(/thiết bị đo/);
    expect(validateAssetInput({ ...valid, assetClass: "MAY_TINH_DIEU_KHIEN_DO", measuringDeviceRef: "TB-2025-031" })).toBeNull();
  });

  it("AC11 — dán chuỗi giống mật khẩu/khóa API vào trường tự do ⇒ bị chặn (R7)", () => {
    expect(validateAssetInput({ ...valid, freeTexts: ["password = Abc12345"] })).toMatch(/Cấm tuyệt đối/);
    expect(validateAssetInput({ ...valid, freeTexts: ["AKIAIOSFODNN7EXAMPLE"] })).toMatch(/Cấm tuyệt đối/);
    expect(detectSecretPatterns("ghi chú bình thường về vị trí")).toHaveLength(0);
  });
});

describe("R3 — cấu hình an toàn cơ sở (ETV.P28 mục 5.7.2; ETV.P33 §6.2.3)", () => {
  it("AC3 — thiếu đổi mật khẩu mặc định/đóng dịch vụ ⇒ chặn gửi soát xét", () => {
    expectErr(txSubmitAsset(baseAsset({ defaultPasswordChanged: false })), "BASELINE_REQUIRED");
    expectErr(txSubmitAsset(baseAsset({ unusedServicesClosed: null })), "BASELINE_REQUIRED");
    expect(txSubmitAsset(baseAsset()).ok).toBe(true);
  });

  it("AC2 — thiết bị đầu cuối xử lý Hạn chế mà chưa mã hóa ổ đĩa ⇒ nằm trong danh sách thiếu", () => {
    const issues = baselineIssues(baseAsset({ assetClass: "MAY_TRAM", maxClassification: "HAN_CHE", screenLock: true, antimalware: true }));
    expect(issues.join(" ")).toMatch(/mã hóa ổ đĩa/);
  });

  it("thiết bị đầu cuối cần khóa màn hình + phòng mã độc", () => {
    const issues = baselineIssues(baseAsset({ assetClass: "MAY_TRAM", screenLock: false, antimalware: null }));
    expect(issues.join(" ")).toMatch(/khóa màn hình/);
    expect(issues.join(" ")).toMatch(/mã độc/);
  });
});

describe("Soát xét/phê duyệt tài sản — tách vai trò + Phụ lục I.1", () => {
  const pending = baseAsset({ status: "PENDING_REVIEW" });
  const approval = baseAsset({ status: "PENDING_APPROVAL" });

  it("chỉ PT.ATTT soát xét, ≠ người lập (R13)", () => {
    expectErr(txReviewAsset(pending, { id: "u-qtht", m33Role: "ATTT" }, true), "SELF_REVIEW");
    expectErr(txReviewAsset(pending, { id: "u9", m33Role: "QTHT" }, true), "FORBIDDEN");
    expect(txReviewAsset(pending, { id: "u-attt", m33Role: "ATTT" }, true)).toMatchObject({ ok: true, status: "PENDING_APPROVAL" });
  });

  it("AC6 — trọng yếu Cao thiếu RTO/failover/rủi ro ⇒ chặn phê duyệt (Phụ lục I.1 điều kiện 5)", () => {
    const r = txApproveAsset(approval, { id: "u-ldv", m33Role: "LDV" }, true);
    expect(r.ok).toBe(true); // TRUNG_BINH không cần
    expectErr(txApproveAsset({ ...approval, criticality: "CAO" }, { id: "u-ldv", m33Role: "LDV" }, true), "CRITICAL_REQUIREMENTS");
    expect(
      txApproveAsset(
        { ...approval, criticality: "CAO", recoveryTimeObjective: "4 giờ", failoverPlan: "Chuyển máy chủ dự phòng", riskRefs: ["RR-2026-08"] },
        { id: "u-ldv", m33Role: "LDV" },
        true,
      ).ok,
    ).toBe(true);
  });

  it("AC5 — phần mềm thiếu/hết hạn giấy phép ⇒ chặn phê duyệt (R21)", () => {
    expectErr(txApproveAsset({ ...approval, assetClass: "PHAN_MEM_BAN_QUYEN" }, { id: "u-ldv", m33Role: "LDV" }, true), "LICENSE_REQUIRED");
    expectErr(
      txApproveAsset(
        { ...approval, assetClass: "PHAN_MEM_BAN_QUYEN", licenseType: "Thuê bao", licenseExpiry: new Date(Date.now() - 86_400_000) },
        { id: "u-ldv", m33Role: "LDV" },
        true,
      ),
      "LICENSE_EXPIRED",
    );
  });

  it("AC4 — BYOD xử lý Hạn chế/Mật không có phê duyệt LĐV ⇒ chặn; Nội bộ đủ cấu hình ⇒ cho phép", () => {
    expectErr(
      txApproveAsset({ ...approval, assetClass: "MAY_TRAM", isPersonalDevice: true, maxClassification: "HAN_CHE", diskEncryption: true, screenLock: true, antimalware: true }, { id: "u-ldv", m33Role: "LDV" }, true),
      "BYOD_APPROVAL_REQUIRED",
    );
    expect(
      txApproveAsset(
        { ...approval, assetClass: "MAY_TRAM", isPersonalDevice: true, maxClassification: "NOI_BO", screenLock: true, antimalware: true },
        { id: "u-ldv", m33Role: "LDV" },
        true,
      ).ok,
    ).toBe(true);
  });

  it("chỉ LĐV phê duyệt; ≠ người lập", () => {
    expectErr(txApproveAsset(approval, { id: "u9", m33Role: "QTHT" }, true), "FORBIDDEN");
    expectErr(txApproveAsset(approval, { id: "u-qtht", m33Role: "LDV" }, true), "SELF_APPROVE");
  });
});

describe("R10/R22 — ngừng vận hành và thanh lý (ETV.P33 §6.6)", () => {
  it("AC14 — còn nền tảng/dữ liệu/thiết bị đo phụ thuộc ⇒ chặn ngừng vận hành", () => {
    const a = baseAsset({ status: "OPERATING", platformRefs: ["NT-2026-001"] });
    const r = txRetireAsset(a, { id: "u-qtht", m33Role: "QTHT" }, "hết dùng");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.message).toMatch(/nền tảng số phụ thuộc/);
    expect(txRetireAsset(baseAsset({ status: "OPERATING" }), { id: "u-qtht", m33Role: "QTHT" }, "hết dùng").ok).toBe(true);
  });

  it("AC14 — thanh lý thiếu bằng chứng xóa dữ liệu an toàn ⇒ chặn (R10)", () => {
    const retired = baseAsset({ status: "RETIRED" });
    expectErr(txDisposeAsset(retired, { id: "u-ldv", m33Role: "LDV" }, 0, "x"), "DISPOSAL_EVIDENCE_REQUIRED");
    expectErr(txDisposeAsset({ ...retired, disposalEvidenceRef: "BB-HUY-05 (M27)" }, { id: "u-ldv", m33Role: "LDV" }, 2, "x"), "ACCOUNTS_ACTIVE");
    expect(txDisposeAsset({ ...retired, disposalEvidenceRef: "BB-HUY-05 (M27)" }, { id: "u-ldv", m33Role: "LDV" }, 0, "thanh lý theo QĐ").ok).toBe(true);
  });

  it("thanh lý là thẩm quyền LĐV", () => {
    expectErr(txDisposeAsset(baseAsset({ status: "RETIRED", disposalEvidenceRef: "BB" }), { id: "u-qtht", m33Role: "QTHT" }, 0, "x"), "FORBIDDEN");
  });
});

describe("R19 — kế hoạch bảo trì năm (ETV.P33 §6.3.1)", () => {
  it("LĐV phê duyệt, ≠ người lập; kế hoạch rỗng không trình được", () => {
    expectErr(txApprovePlan({ status: "CHO_PHE_DUYET", createdById: "u-vp" }, { id: "u-vp", m33Role: "LDV" }, true), "SELF_APPROVE");
    expectErr(txApprovePlan({ status: "CHO_PHE_DUYET", createdById: "u-vp" }, { id: "u-qtht", m33Role: "QTHT" }, true), "FORBIDDEN");
    expect(txApprovePlan({ status: "CHO_PHE_DUYET", createdById: "u-vp" }, { id: "u-ldv", m33Role: "LDV" }, true).ok).toBe(true);
  });
});

describe("R4/R5/R15 — bảo trì, vá lỗi (ETV.P33 §6.3)", () => {
  const baseTask = (over: Partial<TaskForRules> = {}): TaskForRules => ({
    status: "DANG_THUC_HIEN",
    taskType: "CAP_NHAT_PHIEN_BAN",
    severity: null,
    planId: null,
    planApproved: false,
    hasControlComputer: false,
    changeRef: null,
    impactAssessmentRef: null,
    measurementImpactRef: null,
    emergencyOrderRef: null,
    performedById: null,
    ...over,
  });
  const qtht = { id: "u-qtht", m33Role: "QTHT" };

  it("AC7 — máy tính điều khiển thiết bị đo thiếu phiếu M30 hoặc đánh giá M10 ⇒ chặn ghi nhận (R4)", () => {
    expectErr(txPerformTask(baseTask({ hasControlComputer: true }), qtht, { result: "THANH_CONG", evidenceRef: "log" }), "CONTROL_COMPUTER_GATE");
    expectErr(
      txPerformTask(baseTask({ hasControlComputer: true, changeRef: "F30.02-11", measurementImpactRef: "M10-2026-09" }), qtht, { result: "THANH_CONG", evidenceRef: "log" }),
      "POST_CHECK_REQUIRED",
    );
    expect(
      txPerformTask(baseTask({ hasControlComputer: true, changeRef: "F30.02-11", impactAssessmentRef: "DGAH-03", measurementImpactRef: "M10-2026-09" }), qtht, {
        result: "THANH_CONG",
        evidenceRef: "log",
        postCheckResult: "Hệ thống thu thập hoạt động đúng",
      }).ok,
    ).toBe(true);
  });

  it("có phiếu thay đổi M30 mà thiếu đánh giá ATTT ⇒ chặn (R5 — ETV.P28 mục 5.9)", () => {
    expectErr(txPerformTask(baseTask({ changeRef: "F30.02-12" }), qtht, { result: "THANH_CONG", evidenceRef: "log" }), "IMPACT_ASSESSMENT_REQUIRED");
  });

  it("lệnh khẩn cấp LĐV KHÔNG miễn phiếu thay đổi hồi tố (Phụ lục I.2)", () => {
    expectErr(txPerformTask(baseTask({ emergencyOrderRef: "Lệnh LĐV 26/08" }), qtht, { result: "THANH_CONG", evidenceRef: "log" }), "RETRO_CHANGE_REQUIRED");
  });

  it("AC8 — người nghiệm thu = người thực hiện ⇒ chặn; không nghiệm thu ⇒ không Hoàn thành (R15)", () => {
    const waiting = baseTask({ status: "CHO_NGHIEM_THU", performedById: "u-qtht" });
    expectErr(txAcceptTask(waiting, { id: "u-qtht", m33Role: "QTHT" }), "SELF_ACCEPT");
    expect(txAcceptTask(waiting, { id: "u-tp", m33Role: "TP" })).toMatchObject({ ok: true, status: "HOAN_THANH" });
    expectErr(txPerformTask(baseTask({ status: "CHO_NGHIEM_THU" }), qtht, { result: "THANH_CONG", evidenceRef: "x" }), "BAD_STATE");
  });

  it("AC19 — mốc vá lỗi Nghiêm trọng 07 ngày; hoãn vá Nghiêm trọng cần LĐV (§6.3.3)", () => {
    const from = new Date("2026-08-01T00:00:00Z");
    expect(patchDueAt("NGHIEM_TRONG", from)!.getTime() - from.getTime()).toBe(7 * 86_400_000);
    expect(patchDueAt("THAP", from)).toBeNull();
    expectErr(txCancelTask(baseTask({ taskType: "VA_LOI_BAO_MAT", severity: "NGHIEM_TRONG" }), qtht, "hoãn"), "LDV_REQUIRED");
    expect(txCancelTask(baseTask({ taskType: "VA_LOI_BAO_MAT", severity: "NGHIEM_TRONG" }), { id: "u-ldv", m33Role: "LDV" }, "hoãn theo QĐ").ok).toBe(true);
  });
});

describe("R6/R7/R16 — tài khoản hệ thống (ETV.P33 §6.4)", () => {
  const valid = {
    loginName: "svc-backup",
    accountType: "DICH_VU_HE_THONG" as const,
    assetId: "asset-1",
    accessRequestRef: "F28.04-2026-021",
    secretLocation: "Két quản trị — phong bì niêm phong số 12",
    secretIssuer: "Đỗ A. (QTHT)",
    mfaEnabled: false,
  };

  it("AC10 — không có phiếu F28.04 đã phê duyệt ⇒ bị chặn (R6)", () => {
    expect(validateAccountInput({ ...valid, accessRequestRef: "" })).toMatch(/phiếu F28.04/);
    expect(validateAccountInput(valid)).toBeNull();
  });

  it("AC11 — trường tự do chứa chuỗi giống bí mật ⇒ bị chặn (R7)", () => {
    expect(validateAccountInput({ ...valid, freeTexts: ["api_key = sk-abcdef123456"] })).toMatch(/Cấm tuyệt đối/);
  });

  it("một trong hai nơi: tài sản hoặc nền tảng; đặc quyền bắt buộc MFA; dùng chung cần phê duyệt", () => {
    expect(validateAccountInput({ ...valid, assetId: null })).toMatch(/ĐÚNG MỘT nơi/);
    expect(validateAccountInput({ ...valid, assetId: "a", platformRef: "NT-1" })).toMatch(/ĐÚNG MỘT nơi/);
    expect(validateAccountInput({ ...valid, accountType: "DAC_QUYEN_QUAN_TRI", holderId: "u1", mfaEnabled: false })).toMatch(/MFA/);
    expect(validateAccountInput({ ...valid, accountType: "DUNG_CHUNG_NGOAI_LE", holderId: "u1" })).toMatch(/ngoại lệ/);
  });

  it("tài khoản không phiếu ⇒ khóa tạm ngay, không có đường xóa (§6.4.3)", () => {
    expect(txFlagOrphanAccount({ status: "DANG_HOAT_DONG" }, { id: "u-attt", m33Role: "ATTT" })).toMatchObject({ ok: true, status: "TAM_KHOA" });
    expectErr(txFlagOrphanAccount({ status: "DANG_HOAT_DONG" }, { id: "u-nth", m33Role: null }), "FORBIDDEN");
  });
});

describe("R20 — kỳ đối chiếu tài khoản (ETV.P33 §6.4.2)", () => {
  it("AC12 — kỳ đã chốt bất biến; kỳ đặc quyền bắt buộc PT.ATTT rà soát + trình LĐV", () => {
    expectErr(txCloseRecon({ status: "DA_CHOT", scope: "TOAN_BO", submittedToLdvAt: null, reviewedById: null }, { id: "u", m33Role: "QTHT" }), "BAD_STATE");
    expectErr(
      txCloseRecon({ status: "DANG_THUC_HIEN", scope: "DAC_QUYEN_DICH_VU", submittedToLdvAt: null, reviewedById: null }, { id: "u", m33Role: "QTHT" }),
      "ATTT_REVIEW_REQUIRED",
    );
    expectErr(
      txCloseRecon({ status: "DANG_THUC_HIEN", scope: "DAC_QUYEN_DICH_VU", submittedToLdvAt: null, reviewedById: "u-attt" }, { id: "u", m33Role: "QTHT" }),
      "LDV_SUBMIT_REQUIRED",
    );
    expect(txCloseRecon({ status: "DANG_THUC_HIEN", scope: "TOAN_BO", submittedToLdvAt: null, reviewedById: null }, { id: "u", m33Role: "QTHT" }).ok).toBe(true);
  });
});

describe("R9/R18 — sự cố (ETV.P33 §6.5)", () => {
  const baseIncident = (over: Partial<IncidentForRules> = {}): IncidentForRules => ({
    status: "DA_XU_LY",
    priority: "THAP",
    securityFlag: false,
    securityIncidentRef: null,
    securityConcluded: false,
    capaRef: null,
    rootCause: "Nguồn hỏng",
    resolution: "Thay nguồn",
    assetBackToNormal: true,
    lessonRef: null,
    noLessonReason: "Sự cố đơn lẻ, không có bài học tái sử dụng",
    ...over,
  });

  it("mức ưu tiên: 3 điều kiện nâng bắt buộc lên Cao (§6.5.2, mục 4.6)", () => {
    expect(computePriority("KHONG_ANH_HUONG", { hasCriticalAsset: true, platformDown: false, measurementAffected: false })).toBe("CAO");
    expect(computePriority("NGUNG_TOAN_VIEN", { hasCriticalAsset: false, platformDown: false, measurementAffected: false })).toBe("CAO");
    expect(computePriority("NGUNG_MOT_PHONG", { hasCriticalAsset: false, platformDown: false, measurementAffected: false })).toBe("TRUNG_BINH");
    expect(computePriority("ANH_HUONG_MOT_NGUOI", { hasCriticalAsset: false, platformDown: false, measurementAffected: false })).toBe("THAP");
  });

  it("AC18 — sự cố Cao: phản hồi NGAY + bắt buộc xác nhận đã báo LĐV khi tiếp nhận (R18)", () => {
    const dues = computeIncidentDue("CAO", new Date("2026-08-26T08:00:00Z"));
    expect(dues.responseDueAt.toISOString()).toBe("2026-08-26T08:00:00.000Z");
    expectErr(txRespondIncident(baseIncident({ status: "MOI", priority: "CAO" }), { id: "u-qtht", m33Role: "QTHT" }, false), "ESCALATE_REQUIRED");
    expect(txRespondIncident(baseIncident({ status: "MOI", priority: "CAO" }), { id: "u-qtht", m33Role: "QTHT" }, true).ok).toBe(true);
  });

  it("AC15 — securityFlag chưa có kết luận M28 ⇒ không đóng được (R9)", () => {
    const i = baseIncident({ securityFlag: true, securityIncidentRef: "F28.03-2026-04", securityConcluded: false });
    expectErr(txCloseIncident(i, { id: "u-attt", m33Role: "ATTT" }, 1), "SECURITY_CONCLUSION_REQUIRED");
    expect(txCloseIncident({ ...i, securityConcluded: true }, { id: "u-attt", m33Role: "ATTT" }, 1).ok).toBe(true);
    expectErr(txCloseIncident(i, { id: "u-qtht", m33Role: "QTHT" }, 1), "FORBIDDEN"); // ATTT đóng khi có yếu tố ATTT
  });

  it("AC16 — đóng thiếu root_cause/back_to_normal/kết luận bài học ⇒ chặn (§6.5.4)", () => {
    expectErr(txCloseIncident(baseIncident({ rootCause: null }), { id: "u-qtht", m33Role: "QTHT" }, 1), "ROOT_CAUSE_REQUIRED");
    expectErr(txCloseIncident(baseIncident({ assetBackToNormal: null }), { id: "u-qtht", m33Role: "QTHT" }, 1), "BACK_TO_NORMAL_REQUIRED");
    expectErr(txCloseIncident(baseIncident({ noLessonReason: null }), { id: "u-qtht", m33Role: "QTHT" }, 1), "LESSON_REQUIRED");
    expect(txCloseIncident(baseIncident(), { id: "u-qtht", m33Role: "QTHT" }, 1).ok).toBe(true);
  });

  it("AC17 — sự cố thứ 3 trong 90 ngày thiếu KPH ⇒ không đóng được (R9)", () => {
    expectErr(txCloseIncident(baseIncident(), { id: "u-qtht", m33Role: "QTHT" }, 3), "CAPA_REQUIRED");
    expect(txCloseIncident(baseIncident({ capaRef: "KPH-2026-11" }), { id: "u-qtht", m33Role: "QTHT" }, 3).ok).toBe(true);
  });
});

describe("Cờ đến hạn — tính khi đọc (7 nhóm, ETV.P33 Phụ lục II.1)", () => {
  const d = (daysAgo: number) => new Date(Date.now() - daysAgo * 86_400_000);

  it("rà soát 12 tháng; bảo trì theo chu kỳ; quá 2 chu kỳ để mở KPH (R8, R12)", () => {
    expect(isReviewDue(12, d(400), d(800))).toBe(true);
    expect(isReviewDue(12, d(100), d(800))).toBe(false);
    expect(isMaintenanceDue("QUY", d(100), d(400))).toBe(true);
    expect(isMaintenanceDue("THEO_KHUYEN_CAO_HANG", d(999), d(1000))).toBe(false);
    expect(maintenanceOverdueCycles("QUY", d(200), d(400))).toBeGreaterThanOrEqual(2);
  });

  it("AC20 — tài sản phát hiện chưa kiểm kê quá 30 ngày chưa vào vận hành (R17)", () => {
    expect(isInventoryOverdue(d(1), "DRAFT")).toBe(true);
    expect(isInventoryOverdue(d(-10), "DRAFT")).toBe(false);
    expect(isInventoryOverdue(d(1), "OPERATING")).toBe(false);
  });
});
