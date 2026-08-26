// Bộ test cho quyết định của M27 — rules.ts là nơi DUY NHẤT quyết định "được phép hay không".
// Mỗi nhóm test dẫn chiếu điều khoản của ETV.P27 (lần BH 01, ban hành 26/08/2026) mà nó bảo vệ,
// và mã AC theo 05_MODULE_LIBRARY/M27_TaiSanTT/01_Requirement/_work/20260824-dac-ta-m27/spec.md mục 4.
import { describe, expect, it } from "vitest";
import {
  approvalIssues,
  computeReviewCycleMonths,
  isElectronic,
  isOwnerless,
  isRestoreTestDue,
  isReviewDue,
  restoreTestCycleMonths,
  restoreTestOverdueCycles,
  riskLinkWarning,
  txApproveAsset,
  txApproveRuleVersion,
  txCancelAsset,
  txMarkAssetReviewed,
  txRecordRestoreTest,
  txRetireAsset,
  txReviewAsset,
  txSetAiUse,
  txSubmitAsset,
  validateAssetInput,
  type AssetForRules,
  type TxResult,
} from "../rules";

function expectErr(result: TxResult, code: string) {
  expect(result.ok).toBe(false);
  if (result.ok) return;
  expect(result.code).toBe(code);
}

const baseAsset = (over: Partial<AssetForRules> = {}): AssetForRules => ({
  status: "DRAFT",
  assetType: "CSDL_DIEN_TU",
  dataDomain: "KET_QUA_DO",
  classification: "HAN_CHE",
  classificationDowngradeRef: null,
  ciaC: "TRUNG_BINH",
  ciaI: "TRUNG_BINH",
  ciaA: "TRUNG_BINH",
  containsPersonalData: false,
  legalBasis: null,
  ownerId: "u-tp",
  ownerActive: true,
  custodianId: "u-qtht",
  systemRefs: ["HT-2026-0001"],
  retentionPeriod: "10 năm",
  retentionBasis: "ETV.P15",
  backupRequired: false,
  backupFrequency: null,
  aiUseAllowed: false,
  riskRefs: ["RR-ATTT-2026-001"],
  createdById: "u-tp",
  ...over,
});

const LDV = { id: "u-ldv", m27Role: "LDV" };
const ATTT = { id: "u-attt", m27Role: "ATTT" };
const TP = { id: "u-tp", m27Role: "TP" };
const QTHT = { id: "u-qtht", m27Role: "QTHT" };
const QLCL = { id: "u-qlcl", m27Role: "QLCL" };

describe("validateAssetInput — nội dung tối thiểu của bản ghi (ETV.P27 §6.1.1)", () => {
  const valid = {
    name: "CSDL kết quả đo ManLab",
    description: "Dữ liệu thô và phiếu kết quả của phép đo",
    assetType: "CSDL_DIEN_TU" as const,
    ownerId: "u-tp",
    custodianId: "u-qtht",
    systemRefs: ["HT-2026-0001"],
    storageLocation: "Máy chủ CSDL phòng máy tầng 3",
    retentionPeriod: "10 năm",
    retentionBasis: "ETV.P15",
  };

  it("AC1 — thiếu chủ sở hữu ⇒ không cho lưu (Phụ lục I.1 điều kiện 1)", () => {
    expect(validateAssetInput({ ...valid, ownerId: null })).toMatch(/chủ sở hữu/i);
    expect(validateAssetInput(valid)).toBeNull();
  });

  it("AC2 — tài sản điện tử thiếu người quản lý kỹ thuật hoặc hệ thống chứa ⇒ không cho lưu (điều kiện 2)", () => {
    expect(validateAssetInput({ ...valid, custodianId: null })).toMatch(/quản lý kỹ thuật/i);
    expect(validateAssetInput({ ...valid, systemRefs: [] })).toMatch(/hệ thống, thiết bị/i);
  });

  it("hồ sơ giấy KHÔNG bắt buộc người quản lý kỹ thuật — chỉ tài sản điện tử mới bắt buộc", () => {
    expect(
      validateAssetInput({ ...valid, assetType: "HO_SO_GIAY", custodianId: null, systemRefs: [] }),
    ).toBeNull();
    expect(isElectronic("HO_SO_GIAY")).toBe(false);
    expect(isElectronic("CSDL_DIEN_TU")).toBe(true);
  });

  it("thiếu thời hạn lưu hoặc căn cứ thời hạn ⇒ không cho lưu (điều kiện 5)", () => {
    expect(validateAssetInput({ ...valid, retentionPeriod: "  " })).toMatch(/thời hạn lưu/i);
    expect(validateAssetInput({ ...valid, retentionBasis: "" })).toMatch(/căn cứ thời hạn/i);
  });
});

describe("approvalIssues — tám điều kiện chặn cứng trước khi phê duyệt (ETV.P27 Phụ lục I.1)", () => {
  it("đủ điều kiện ⇒ không có vấn đề nào", () => {
    expect(approvalIssues(baseAsset())).toEqual([]);
  });

  it("điều kiện 1 — chủ sở hữu đã nghỉ việc ⇒ chặn, nhắc chuyển giao (§6.8)", () => {
    expect(approvalIssues(baseAsset({ ownerActive: false }))[0]).toMatch(/nghỉ việc|chuyển giao/i);
  });

  it("AC3 / điều kiện 4 — hạ mức dưới mức tối thiểu của nhóm dữ liệu mà thiếu căn cứ công bố ⇒ chặn", () => {
    // Dữ liệu khách hàng tối thiểu Hạn chế (§6.1.3) — đặt Nội bộ là hạ mức.
    const downgraded = baseAsset({ dataDomain: "KHACH_HANG", classification: "NOI_BO" });
    expect(approvalIssues(downgraded).join(" ")).toMatch(/thấp hơn mức tối thiểu/i);
    // Có căn cứ công bố theo ETV.P02 ⇒ cho phép.
    expect(approvalIssues({ ...downgraded, classificationDowngradeRef: "CB-2026-004" })).toEqual([]);
  });

  it("điều kiện 4 — đặt mức CAO HƠN mức tối thiểu luôn hợp lệ, không cần căn cứ", () => {
    expect(approvalIssues(baseAsset({ dataDomain: "HE_THONG_QUAN_LY", classification: "MAT" }))).toEqual([]);
  });

  it("điều kiện 4 — nhóm nhân sự và tài chính tối thiểu là Mật (§6.1.3)", () => {
    expect(approvalIssues(baseAsset({ dataDomain: "NHAN_SU", classification: "HAN_CHE" })).join(" ")).toMatch(
      /thấp hơn mức tối thiểu/i,
    );
    expect(approvalIssues(baseAsset({ dataDomain: "TAI_CHINH", classification: "MAT" }))).toEqual([]);
  });

  it("AC4 / điều kiện 6 — dữ liệu cá nhân thiếu căn cứ pháp lý ⇒ chặn (NĐ 13/2023, §6.4)", () => {
    const pd = baseAsset({ containsPersonalData: true, dataDomain: "NHAN_SU", classification: "MAT" });
    expect(approvalIssues(pd).join(" ")).toMatch(/căn cứ pháp lý/i);
    expect(approvalIssues({ ...pd, legalBasis: "Hợp đồng lao động; quản lý nhân sự" })).toEqual([]);
  });

  it("AC4 / điều kiện 6 — dữ liệu cá nhân lưu vĩnh viễn ⇒ chặn (§6.4 điểm 2)", () => {
    const pd = baseAsset({
      containsPersonalData: true,
      dataDomain: "NHAN_SU",
      classification: "MAT",
      legalBasis: "Hợp đồng lao động",
      retentionPeriod: "Vĩnh viễn",
    });
    expect(approvalIssues(pd).join(" ")).toMatch(/vĩnh viễn/i);
  });

  it("AC5 / điều kiện 7 — Sẵn sàng = Cao mà không sao lưu ⇒ chặn (§6.5.1)", () => {
    const high = baseAsset({ ciaA: "CAO", backupRequired: false });
    expect(approvalIssues(high).join(" ")).toMatch(/phải được sao lưu/i);
    expect(approvalIssues({ ...high, backupRequired: true, backupFrequency: null }).join(" ")).toMatch(
      /tần suất sao lưu/i,
    );
    expect(approvalIssues({ ...high, backupRequired: true, backupFrequency: "NGAY" })).toEqual([]);
  });

  it("gộp nhiều vi phạm ⇒ liệt kê đủ, không dừng ở lỗi đầu tiên", () => {
    const bad = baseAsset({ ownerActive: false, ciaA: "CAO", backupRequired: false });
    expect(approvalIssues(bad).length).toBe(2);
  });
});

describe("riskLinkWarning — liên kết rủi ro M28 là CẢNH BÁO, chưa phải chặn (ETV.P27 §6.9.1)", () => {
  it("tài sản Hạn chế không có rủi ro ⇒ cảnh báo, nhưng approvalIssues vẫn rỗng", () => {
    const a = baseAsset({ riskRefs: [] });
    expect(riskLinkWarning(a)).toMatch(/ít nhất 01 rủi ro/i);
    expect(approvalIssues(a)).toEqual([]); // chưa chặn — mốc chuyển do QLCL trình LĐV
  });

  it("tài sản Nội bộ, C–I–A không có mức Cao ⇒ không cảnh báo", () => {
    expect(riskLinkWarning(baseAsset({ classification: "NOI_BO", dataDomain: "NGHIEN_CUU", riskRefs: [] }))).toBeNull();
  });

  it("có mức C–I–A = Cao ⇒ cảnh báo kể cả khi mức phân loại thấp", () => {
    expect(
      riskLinkWarning(baseAsset({ classification: "NOI_BO", dataDomain: "NGHIEN_CUU", ciaI: "CAO", riskRefs: [] })),
    ).toMatch(/rủi ro/i);
  });
});

describe("Chuỗi trạng thái và tách vai trò (ETV.P27 §6.1.5, Phụ lục II.1)", () => {
  it("gửi soát xét: thiếu chủ sở hữu hoặc người quản lý kỹ thuật ⇒ chặn", () => {
    expectErr(txSubmitAsset(baseAsset({ ownerId: "" }), TP), "OWNER_REQUIRED");
    expectErr(txSubmitAsset(baseAsset({ custodianId: null }), TP), "CUSTODIAN_REQUIRED");
    expect(txSubmitAsset(baseAsset(), TP)).toMatchObject({ ok: true, status: "PENDING_REVIEW" });
  });

  it("soát xét: chỉ PT.ATTT, và phải khác người lập (§5.3, §6.1.5 bước 3)", () => {
    const pending = baseAsset({ status: "PENDING_REVIEW" });
    expectErr(txReviewAsset(pending, QTHT, true), "FORBIDDEN");
    expectErr(txReviewAsset(baseAsset({ status: "PENDING_REVIEW", createdById: "u-attt" }), ATTT, true), "SELF_REVIEW");
    expect(txReviewAsset(pending, ATTT, true)).toMatchObject({ ok: true, status: "PENDING_APPROVAL" });
  });

  it("không soát xét / không phê duyệt bắt buộc ghi lý do (Phụ lục II.1)", () => {
    expectErr(txReviewAsset(baseAsset({ status: "PENDING_REVIEW" }), ATTT, false), "REASON_REQUIRED");
    expectErr(txApproveAsset(baseAsset({ status: "PENDING_APPROVAL" }), LDV, false), "REASON_REQUIRED");
    expect(txReviewAsset(baseAsset({ status: "PENDING_REVIEW" }), ATTT, false, "Sai mức C–I–A")).toMatchObject({
      ok: true,
      status: "REVIEW_REJECTED",
    });
  });

  it("phê duyệt: chỉ LĐV, khác người lập, và phải qua tám điều kiện chặn", () => {
    const pending = baseAsset({ status: "PENDING_APPROVAL" });
    expectErr(txApproveAsset(pending, ATTT, true), "FORBIDDEN");
    expectErr(
      txApproveAsset(baseAsset({ status: "PENDING_APPROVAL", createdById: "u-ldv" }), LDV, true),
      "SELF_APPROVE",
    );
    expectErr(
      txApproveAsset(baseAsset({ status: "PENDING_APPROVAL", ciaA: "CAO", backupRequired: false }), LDV, true),
      "APPROVAL_BLOCKED",
    );
    expect(txApproveAsset(pending, LDV, true)).toMatchObject({ ok: true, status: "DANG_SU_DUNG" });
  });

  it("phê duyệt xong đặt luôn chu kỳ rà soát và mốc rà soát đầu tiên (§6.8)", () => {
    const r = txApproveAsset(baseAsset({ status: "PENDING_APPROVAL", classification: "MAT", dataDomain: "NHAN_SU" }), LDV, true);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.patch.reviewCycleMonths).toBe(6);
    expect(r.patch.lastReviewedAt).toBeInstanceOf(Date);
  });

  it("huỷ bản ghi chỉ trước khi phê duyệt, chỉ LĐV, bắt buộc lý do (Phụ lục II.1)", () => {
    expectErr(txCancelAsset(baseAsset({ status: "DANG_SU_DUNG" }), LDV, "trùng"), "BAD_STATE");
    expectErr(txCancelAsset(baseAsset(), TP, "trùng"), "FORBIDDEN");
    expectErr(txCancelAsset(baseAsset(), LDV), "REASON_REQUIRED");
    expect(txCancelAsset(baseAsset(), LDV, "Khai báo trùng TS-2026-004")).toMatchObject({ ok: true, status: "CANCELLED" });
  });

  it("chuyển Ngừng sử dụng: chỉ TP hoặc QLCL, bắt buộc lý do", () => {
    const inUse = baseAsset({ status: "DANG_SU_DUNG" });
    expectErr(txRetireAsset(inUse, QTHT, "hết dùng"), "FORBIDDEN");
    expectErr(txRetireAsset(inUse, TP), "REASON_REQUIRED");
    expect(txRetireAsset(inUse, QLCL, "Đã chuyển sang hệ thống mới")).toMatchObject({
      ok: true,
      status: "NGUNG_SU_DUNG",
    });
  });

  it("AC12 — không tồn tại hàm chuyển sang trạng thái 'đã xoá'; kết thúc vòng đời là DA_HUY", () => {
    // Bản ghi kiểm kê giữ vĩnh viễn làm bằng chứng (§6.7.1, Phụ lục I.2 "Cấm tuyệt đối").
    const exported = Object.keys({ txSubmitAsset, txReviewAsset, txApproveAsset, txCancelAsset, txRetireAsset });
    expect(exported.some((n) => /delete|remove|destroy/i.test(n))).toBe(false);
  });
});

describe("Rà soát định kỳ và kiểm chứng phục hồi (ETV.P27 §6.8, §6.5.2)", () => {
  it("chu kỳ rà soát: 12 tháng mặc định, 06 tháng với Mật hoặc có dữ liệu cá nhân (§6.8)", () => {
    expect(computeReviewCycleMonths({ classification: "NOI_BO", containsPersonalData: false })).toBe(12);
    expect(computeReviewCycleMonths({ classification: "MAT", containsPersonalData: false })).toBe(6);
    expect(computeReviewCycleMonths({ classification: "NOI_BO", containsPersonalData: true })).toBe(6);
  });

  it("chu kỳ kiểm chứng phục hồi: 06 tháng khi Sẵn sàng = Cao, 12 tháng còn lại (§6.5.2)", () => {
    expect(restoreTestCycleMonths({ ciaA: "CAO" })).toBe(6);
    expect(restoreTestCycleMonths({ ciaA: "TRUNG_BINH" })).toBe(12);
  });

  it("AC14 — cờ đến hạn tính khi đọc, chỉ áp cho tài sản Đang sử dụng", () => {
    const now = new Date("2026-08-26");
    expect(
      isReviewDue({ lastReviewedAt: new Date("2025-08-01"), reviewCycleMonths: 12, status: "DANG_SU_DUNG" }, now),
    ).toBe(true);
    expect(
      isReviewDue({ lastReviewedAt: new Date("2026-06-01"), reviewCycleMonths: 12, status: "DANG_SU_DUNG" }, now),
    ).toBe(false);
    // Chưa rà soát lần nào ⇒ coi như đến hạn.
    expect(isReviewDue({ lastReviewedAt: null, reviewCycleMonths: 12, status: "DANG_SU_DUNG" }, now)).toBe(true);
    // Ngừng sử dụng thì không còn nằm trong bảng đến hạn rà soát.
    expect(isReviewDue({ lastReviewedAt: null, reviewCycleMonths: 12, status: "NGUNG_SU_DUNG" }, now)).toBe(false);
  });

  it("quá hạn kiểm chứng phục hồi và đếm số chu kỳ quá hạn (§6.5.2 — quá 02 chu kỳ báo LĐV)", () => {
    const now = new Date("2026-08-26");
    const a = { backupRequired: true, ciaA: "CAO" as const, status: "DANG_SU_DUNG" as const };
    expect(isRestoreTestDue({ ...a, lastRestoreTestAt: new Date("2026-07-01") }, now)).toBe(false);
    expect(isRestoreTestDue({ ...a, lastRestoreTestAt: new Date("2025-08-01") }, now)).toBe(true);
    expect(restoreTestOverdueCycles({ ...a, lastRestoreTestAt: new Date("2025-08-01") }, now)).toBe(2);
    // Không thuộc diện sao lưu thì không bao giờ đến hạn.
    expect(isRestoreTestDue({ ...a, backupRequired: false, lastRestoreTestAt: null }, now)).toBe(false);
  });

  it("ghi nhận rà soát: chỉ chủ sở hữu hoặc QLCL, và cập nhật lại chu kỳ theo mức hiện tại", () => {
    const inUse = baseAsset({ status: "DANG_SU_DUNG", classification: "MAT", dataDomain: "NHAN_SU" });
    expectErr(txMarkAssetReviewed(inUse, ATTT), "FORBIDDEN");
    const r = txMarkAssetReviewed(inUse, TP);
    expect(r).toMatchObject({ ok: true });
    if (!r.ok) return;
    expect(r.patch.reviewCycleMonths).toBe(6);
  });

  it("kiểm chứng phục hồi: chỉ QTHT, bắt buộc bằng chứng F31.03, Không đạt ⇒ không ghi nhận đạt", () => {
    const a = baseAsset({ status: "DANG_SU_DUNG", backupRequired: true, backupFrequency: "NGAY" });
    expectErr(txRecordRestoreTest(a, TP, true, "F31.03/2026-08"), "FORBIDDEN");
    expectErr(txRecordRestoreTest(a, QTHT, true, "  "), "EVIDENCE_REQUIRED");
    expectErr(txRecordRestoreTest(a, QTHT, false, "F31.03/2026-08"), "RESTORE_FAILED");
    expectErr(txRecordRestoreTest(baseAsset({ status: "DANG_SU_DUNG" }), QTHT, true, "x"), "NO_BACKUP");
    expect(txRecordRestoreTest(a, QTHT, true, "F31.03/2026-08")).toMatchObject({ ok: true });
  });

  it("tài sản vô chủ — chủ sở hữu đã nghỉ việc mà tài sản còn hiệu lực (§6.8)", () => {
    expect(isOwnerless({ ownerActive: false, status: "DANG_SU_DUNG" })).toBe(true);
    expect(isOwnerless({ ownerActive: false, status: "CANCELLED" })).toBe(false);
    expect(isOwnerless({ ownerActive: true, status: "DANG_SU_DUNG" })).toBe(false);
  });
});

describe("AC15 — dữ liệu cho AI: Hạn chế và Mật KHÔNG BAO GIỜ (ETV.P27 §6.9.2)", () => {
  const inUse = (c: AssetForRules["classification"]) =>
    baseAsset({ status: "DANG_SU_DUNG", classification: c, dataDomain: "PHUC_VU_AI" });

  it("bật cho Hạn chế hoặc Mật ⇒ cấm tuyệt đối", () => {
    expectErr(txSetAiUse(inUse("HAN_CHE"), QLCL, true), "AI_FORBIDDEN");
    expectErr(txSetAiUse(inUse("MAT"), QLCL, true), "AI_FORBIDDEN");
  });

  it("bật cho Công khai hoặc Nội bộ khi Đang sử dụng ⇒ được phép", () => {
    expect(txSetAiUse(inUse("CONG_KHAI"), QLCL, true)).toMatchObject({ ok: true });
    expect(txSetAiUse(inUse("NOI_BO"), QTHT, true)).toMatchObject({ ok: true });
  });

  it("tài sản chưa Đang sử dụng ⇒ chặn, kể cả mức Công khai (ba điều kiện phải thoả đồng thời)", () => {
    expectErr(txSetAiUse(baseAsset({ classification: "CONG_KHAI" }), QLCL, true), "BAD_STATE");
  });

  it("TẮT cờ luôn được phép, kể cả khi tài sản đã ở mức Mật — để gỡ vi phạm ngay", () => {
    expect(txSetAiUse(inUse("MAT"), QLCL, false)).toMatchObject({ ok: true });
  });

  it("vai trò không có thẩm quyền ⇒ chặn", () => {
    expectErr(txSetAiUse(inUse("NOI_BO"), TP, true), "FORBIDDEN");
  });
});

describe("AC7 — bảng quy tắc xử lý: chỉ LĐV phê duyệt (ETV.P27 §6.3, Phụ lục II.2)", () => {
  it("chỉ LĐV, đúng trạng thái, không phê duyệt thì bắt buộc lý do", () => {
    expectErr(txApproveRuleVersion({ status: "DRAFT" }, LDV, true), "BAD_STATE");
    expectErr(txApproveRuleVersion({ status: "PENDING_APPROVAL" }, QLCL, true), "FORBIDDEN");
    expectErr(txApproveRuleVersion({ status: "PENDING_APPROVAL" }, LDV, false), "REASON_REQUIRED");
    expect(txApproveRuleVersion({ status: "PENDING_APPROVAL" }, LDV, true)).toMatchObject({
      ok: true,
      status: "DA_PHE_DUYET",
    });
  });
});
