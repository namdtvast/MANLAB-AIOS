// Bộ test cho quyết định chuyển trạng thái của M34 — rules.ts là nơi DUY NHẤT quyết định
// "được phép hay không". Mỗi nhóm test dẫn chiếu quy tắc R1–R22 của DacTa M34 và điều khoản
// ETV.P34 (DỰ THẢO, Chờ soát xét) mà nó bảo vệ; ánh xạ AC theo 04_UI/Screens.md mục 3.
import { describe, expect, it } from "vitest";
import {
  detectRealDataPatterns,
  isQualityDue,
  isReviewDue,
  reviewOverdueCycles,
  txActivateDictionary,
  txApproveAI,
  txApproveDataSet,
  txApproveSharing,
  txAssessCorrection,
  txAtttOpinion,
  txConcludeQuality,
  txDisposeDataSet,
  txExecuteSharing,
  txMarkDuplicate,
  txPerformCorrection,
  txRecognizeMaster,
  txRecordMeasurement,
  txResolveFinding,
  txReviewDataSet,
  txRevokeSharing,
  txSubmitDataSet,
  txSubmitSharing,
  validateAICreate,
  validateCorrectionInput,
  validateDataSetInput,
  validateSharingCreate,
  type DataSetForRules,
  type DisposalChecklist,
  type SharingForRules,
  type TxResult,
} from "../rules";

function expectErr(result: TxResult, code: string) {
  expect(result.ok).toBe(false);
  if (result.ok) return;
  expect(result.code).toBe(code);
}

const baseDs = (over: Partial<DataSetForRules> = {}): DataSetForRules => ({
  status: "DRAFT",
  dataGroup: "DO_KY_THUAT",
  ownerId: "u-owner",
  stewardId: "u-steward",
  hasPersonalData: false,
  personalDataLegalRef: null,
  retentionBasis: "ETV.P.F 14.06 dòng 12",
  qualityMetricsNote: "6 chiều, ngưỡng 100% hợp lệ/đầy đủ, kỳ 03 tháng",
  dictionaryRequired: true,
  lineageNote: "Nguồn: thiết bị đo XYZ; quy tắc tính v1.2",
  createdById: "u-steward",
  classification: "NOI_BO",
  ...over,
});

describe("R1/R2/R5 — validateDataSetInput: không có dữ liệu vô chủ (ETV.P34 Phụ lục I.1)", () => {
  const valid = {
    name: "Dữ liệu đo lưu lượng",
    purpose: "Phục vụ kiểm định",
    ownerId: "u1",
    stewardId: "u2",
    classification: "NOI_BO",
    hasPersonalData: false,
    retentionBasis: "ETV.P15",
  };

  it("đủ trường bắt buộc thì qua", () => {
    expect(validateDataSetInput(valid)).toBeNull();
  });

  it("AC1 — thiếu CSHDL hoặc QTDL ⇒ không cho lưu (R1)", () => {
    expect(validateDataSetInput({ ...valid, ownerId: null })).toMatch(/Chủ sở hữu/);
    expect(validateDataSetInput({ ...valid, stewardId: null })).toMatch(/quản trị dữ liệu/);
  });

  it("AC2 — thiếu phân loại / cờ cá nhân / căn cứ thời hạn lưu ⇒ không cho lưu (R2, R5)", () => {
    expect(validateDataSetInput({ ...valid, classification: null })).toMatch(/phân loại/);
    expect(validateDataSetInput({ ...valid, hasPersonalData: null })).toMatch(/dữ liệu cá nhân/);
    expect(validateDataSetInput({ ...valid, retentionBasis: "" })).toMatch(/thời hạn lưu/);
  });

  it("tập chứa dữ liệu cá nhân phải ghi văn bản pháp luật áp dụng (R2 — ETV.P34 §3.2)", () => {
    expect(validateDataSetInput({ ...valid, hasPersonalData: true })).toMatch(/pháp luật/);
    expect(validateDataSetInput({ ...valid, hasPersonalData: true, personalDataLegalRef: "ND 13/2023" })).toBeNull();
  });
});

describe("R6 — bản ghi mô tả, không chứa dữ liệu thật (ETV.P34 §6.1.1)", () => {
  it("bắt chuỗi 12 số, số điện thoại, nhiều email", () => {
    expect(detectRealDataPatterns("CCCD 012345678901 của khách")).toHaveLength(1);
    expect(detectRealDataPatterns("gọi 0912345678")).toHaveLength(1);
    expect(detectRealDataPatterns("a@x.com, b@y.com")).toHaveLength(1);
    expect(detectRealDataPatterns("mô tả bình thường")).toHaveLength(0);
  });
});

describe("R3/R20 — gửi soát xét cần từ điển và lineage (ETV.P34 §6.1.2, §6.6)", () => {
  it("AC3 — nhóm bắt buộc từ điển mà chưa có từ điển hiệu lực ⇒ chặn", () => {
    expectErr(txSubmitDataSet(baseDs(), false), "DICTIONARY_REQUIRED");
  });

  it("dữ liệu đo/công bố thiếu mô tả truy xuất nguồn gốc ⇒ chặn (R20)", () => {
    expectErr(txSubmitDataSet(baseDs({ lineageNote: null }), true), "LINEAGE_REQUIRED");
  });

  it("đủ điều kiện ⇒ Chờ soát xét", () => {
    expect(txSubmitDataSet(baseDs(), true)).toMatchObject({ ok: true, status: "PENDING_REVIEW" });
  });

  it("nhóm quản trị không bắt buộc từ điển", () => {
    const r = txSubmitDataSet(baseDs({ dataGroup: "QUAN_TRI", dictionaryRequired: false, lineageNote: null }), false);
    expect(r.ok).toBe(true);
  });
});

describe("Soát xét và phê duyệt — tách vai trò (ETV.P34 §5.3, §6.1.3)", () => {
  const pending = baseDs({ status: "PENDING_REVIEW" });

  it("AC6 — người lập không tự soát xét (QLCL trùng createdBy)", () => {
    expectErr(txReviewDataSet(pending, { id: "u-steward", m34Role: "QLCL" }, true), "SELF_REVIEW");
  });

  it("chỉ QLCL/PT.ATTT được soát xét", () => {
    expectErr(txReviewDataSet(pending, { id: "u9", m34Role: "QTHT" }, true), "FORBIDDEN");
    expect(txReviewDataSet(pending, { id: "u9", m34Role: "ATTT" }, true).ok).toBe(true);
  });

  it("trả lại bắt buộc lý do (Phụ lục II.1)", () => {
    expectErr(txReviewDataSet(pending, { id: "u9", m34Role: "QLCL" }, false), "REASON_REQUIRED");
  });

  it("AC5 — phê duyệt khi thiếu chỉ số chất lượng ⇒ chặn (R4)", () => {
    const r = txApproveDataSet(baseDs({ status: "PENDING_APPROVAL", qualityMetricsNote: null }), { id: "u-owner", m34Role: null }, true);
    expectErr(r, "QUALITY_METRICS_REQUIRED");
  });

  it("chỉ CSHDL của tập được phê duyệt — QLCL cũng không thay được", () => {
    expectErr(txApproveDataSet(baseDs({ status: "PENDING_APPROVAL" }), { id: "u-qlcl", m34Role: "QLCL" }, true), "FORBIDDEN");
    expect(txApproveDataSet(baseDs({ status: "PENDING_APPROVAL" }), { id: "u-owner", m34Role: null }, true)).toMatchObject({
      ok: true,
      status: "ACTIVE",
    });
  });

  it("R7 — QLCL đánh dấu trùng phải chỉ rõ tập gộp vào; bản ghi đã phê duyệt không hủy kiểu trùng", () => {
    expectErr(txMarkDuplicate(pending, { id: "u-qlcl", m34Role: "QLCL" }, "", "trùng DS-01"), "MERGE_TARGET_REQUIRED");
    expectErr(txMarkDuplicate(baseDs({ status: "ACTIVE" }), { id: "u-qlcl", m34Role: "QLCL" }, "ds1", "trùng"), "BAD_STATE");
    expect(txMarkDuplicate(pending, { id: "u-qlcl", m34Role: "QLCL" }, "ds1", "trùng DS-01").ok).toBe(true);
  });
});

describe("R21 — hủy đủ 4 ràng buộc + 2 chữ ký (ETV.P34 §6.7.2, §5.3)", () => {
  const proposed = (over: Partial<DataSetForRules & DisposalChecklist> = {}): DataSetForRules & DisposalChecklist => ({
    ...baseDs({ status: "DISPOSAL_PROPOSED" }),
    disposalRetentionExpired: true,
    disposalNotBasis: true,
    disposalNoDispute: true,
    disposalNoDependent: true,
    disposalAtttConfirmedById: "u-attt",
    disposalRecordRef: "BB-HUY-2026-01 (M27)",
    ...over,
  });
  const ldv = { id: "u-ldv", m34Role: "LDV" };

  it("AC21 — còn 1 trong 4 ràng buộc chưa thỏa ⇒ chặn, nêu rõ ràng buộc", () => {
    const r = txDisposeDataSet(proposed({ disposalNotBasis: false }), ldv, "hết hạn lưu");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.message).toMatch(/căn cứ của kết quả/);
  });

  it("AC22 — thiếu xác nhận PT.ATTT hoặc biên bản hủy M27 ⇒ chặn", () => {
    expectErr(txDisposeDataSet(proposed({ disposalAtttConfirmedById: null }), ldv, "x"), "ATTT_CONFIRM_REQUIRED");
    expectErr(txDisposeDataSet(proposed({ disposalRecordRef: null }), ldv, "x"), "DISPOSAL_RECORD_REQUIRED");
  });

  it("hủy là thẩm quyền LĐV, không ủy quyền (ETV.P34 §5.1)", () => {
    expectErr(txDisposeDataSet(proposed(), { id: "u-qlcl", m34Role: "QLCL" }, "x"), "FORBIDDEN");
    expect(txDisposeDataSet(proposed(), ldv, "hết hạn lưu, đủ điều kiện")).toMatchObject({ ok: true, status: "DISPOSED" });
  });
});

describe("R3 — từ điển phiên bản 02 trở đi cần phiếu F30.02 (ETV.P34 §6.1.2)", () => {
  it("AC4 — v2 không changeRef ⇒ chặn; v1 thì không cần", () => {
    expectErr(txActivateDictionary({ version: 2, changeRef: null, status: "DRAFT" }), "CHANGE_REF_REQUIRED");
    expect(txActivateDictionary({ version: 1, changeRef: null, status: "DRAFT" }).ok).toBe(true);
    expect(txActivateDictionary({ version: 2, changeRef: "F30.02-2026-015", status: "DRAFT" }).ok).toBe(true);
  });
});

describe("R9/R10 — dữ liệu chủ một nguồn; bảng tra song song (ETV.P34 §6.2)", () => {
  it("AC7 — đã có nguồn công nhận cùng loại ⇒ chặn công nhận nguồn thứ hai", () => {
    expectErr(txRecognizeMaster({ id: "u-ldv", m34Role: "LDV" }, 1), "ONE_SOURCE_ONLY");
    expect(txRecognizeMaster({ id: "u-ldv", m34Role: "LDV" }, 0).ok).toBe(true);
  });

  it("công nhận là thẩm quyền LĐV", () => {
    expectErr(txRecognizeMaster({ id: "u-qlcl", m34Role: "QLCL" }, 0), "FORBIDDEN");
  });

  it("AC8 — bảng tra gây sai lệch thiếu KPH ⇒ không đóng được (R10)", () => {
    const f = { status: "DANG_XU_LY", causedError: true, capaRef: null, stoppedAt: new Date() };
    expectErr(txResolveFinding(f, { id: "u-qlcl", m34Role: "QLCL" }), "CAPA_REQUIRED");
    expect(txResolveFinding({ ...f, capaRef: "KPH-2026-07" }, { id: "u-qlcl", m34Role: "QLCL" }).ok).toBe(true);
  });

  it("chưa ngừng sử dụng ⇒ không đóng được", () => {
    const f = { status: "MOI", causedError: false, capaRef: null, stoppedAt: null };
    expectErr(txResolveFinding(f, { id: "u-qlcl", m34Role: "QLCL" }), "NOT_STOPPED");
  });
});

describe("R14/R15/R16 — đo chất lượng (ETV.P34 §6.4)", () => {
  const q = { status: "DANG_DO", dataGroup: "DO_KY_THUAT" as const, primaryEntererId: "u-enterer", measuredById: "u-qtdl", previousFailed: false };
  const allPass = (["CHINH_XAC", "DAY_DU", "NHAT_QUAN", "KIP_THOI", "DUY_NHAT", "HOP_LE"] as const).map((dimension) => ({
    dimension,
    passed: true as boolean | null,
    value: "100",
  }));

  it("AC9 — người nhập liệu chính không được đo chính dữ liệu mình nhập (R16)", () => {
    expectErr(txRecordMeasurement({ ...q, status: "MOI" }, "u-enterer"), "SELF_MEASURE");
    expect(txRecordMeasurement({ ...q, status: "MOI" }, "u-qtdl").ok).toBe(true);
  });

  it("chưa đo đủ chiều bắt buộc của nhóm ⇒ không chốt được (R14 — §6.4.2)", () => {
    const r = txConcludeQuality(q, { id: "u-qtdl", m34Role: "QTDL" }, allPass.slice(0, 3), { verdictPass: true });
    expectErr(r, "DIMENSIONS_MISSING");
  });

  it("AC12 — dữ liệu đo dưới 100% hợp lệ/đầy đủ ⇒ không được Đạt, Không đạt thì đặt cờ dừng sử dụng (§6.4.3)", () => {
    const rows = allPass.map((r) => (r.dimension === "DAY_DU" ? { ...r, passed: false, value: "99" } : r));
    expectErr(txConcludeQuality(q, { id: "u-qtdl", m34Role: "QTDL" }, rows, { verdictPass: true }), "FLOOR_100_VIOLATED");
    const fail = txConcludeQuality(q, { id: "u-qlcl", m34Role: "QLCL" }, rows, {
      verdictPass: false,
      belowThresholdCase: "MOT_CHIEU_KHONG_ANH_HUONG",
      remediationPlan: "Bổ sung trường thiếu trong 15 ngày làm việc",
    });
    expect(fail).toMatchObject({ ok: true, status: "KHONG_DAT" });
    if (fail.ok) expect(fail.patch.__suspendUse).toBe(true);
  });

  it("AC10 — Không đạt bắt buộc tình huống §6.4.4 + kế hoạch khắc phục (R15)", () => {
    const rows = allPass.map((r) => (r.dimension === "NHAT_QUAN" ? { ...r, passed: false } : r));
    expectErr(txConcludeQuality(q, { id: "u-qlcl", m34Role: "QLCL" }, rows, { verdictPass: false }), "CASE_REQUIRED");
    expectErr(
      txConcludeQuality(q, { id: "u-qlcl", m34Role: "QLCL" }, rows, { verdictPass: false, belowThresholdCase: "MOT_CHIEU_KHONG_ANH_HUONG" }),
      "REMEDIATION_REQUIRED",
    );
  });

  it("AC11 — dưới ngưỡng 02 kỳ liên tiếp thiếu KPH ⇒ không chốt được (R15)", () => {
    const rows = allPass.map((r) => (r.dimension === "NHAT_QUAN" ? { ...r, passed: false } : r));
    const r = txConcludeQuality({ ...q, previousFailed: true }, { id: "u-qlcl", m34Role: "QLCL" }, rows, {
      verdictPass: false,
      belowThresholdCase: "HAI_KY_LIEN_TIEP",
      remediationPlan: "KH khắc phục",
    });
    expectErr(r, "CAPA_REQUIRED");
  });

  it("nhánh Không đạt do QLCL kết luận (Phụ lục II.2)", () => {
    const rows = allPass.map((r) => (r.dimension === "NHAT_QUAN" ? { ...r, passed: false } : r));
    expectErr(
      txConcludeQuality(q, { id: "u-qtdl", m34Role: "QTDL" }, rows, { verdictPass: false, belowThresholdCase: "MOT_CHIEU_KHONG_ANH_HUONG", remediationPlan: "x" }),
      "FORBIDDEN",
    );
  });

  it("kỳ đo đã chốt là hồ sơ bất biến (AC13)", () => {
    expectErr(txRecordMeasurement({ ...q, status: "DAT" }, "u-khac"), "BAD_STATE");
  });
});

describe("R11/R12 — hiệu chỉnh dữ liệu (ETV.P34 §6.3)", () => {
  const c = {
    status: "DANG_XEM_XET" as const,
    publishedImpact: "DA_DUNG_PHAT_HANH" as const,
    validityRef: null,
    validityConclusion: null,
    requestedById: "u-nth",
    ownerId: "u-owner",
  };

  it("R11 — đề nghị bắt buộc giá trị trước/sau + lý do", () => {
    expect(validateCorrectionInput({ recordPointer: "x", oldValue: "", newValue: "2", correctionReason: "y" })).toMatch(/giá trị trước/);
    expect(validateCorrectionInput({ recordPointer: "b1.t2", oldValue: "1", newValue: "2", correctionReason: "nhầm đơn vị" })).toBeNull();
  });

  it("xem xét ảnh hưởng: đã dùng phát hành ⇒ chuyển Chờ kết luận P10-P11 (§6.3.2 bước 3)", () => {
    const r = txAssessCorrection({ ...c, status: "MOI", publishedImpact: null }, { id: "u-steward", m34Role: null }, "u-steward", "DA_DUNG_PHAT_HANH");
    expect(r).toMatchObject({ ok: true, status: "CHO_KET_LUAN_P10_P11" });
  });

  it("AC14 — đã dùng phát hành mà chưa có kết luận ⇒ chặn thực hiện (R12, chặn cứng)", () => {
    const r = txPerformCorrection({ ...c, status: "CHO_KET_LUAN_P10_P11" }, { id: "u-qtdl", m34Role: "QTDL" }, "u-steward", "HC-REC-01");
    expectErr(r, "VALIDITY_REQUIRED");
  });

  it("có kết luận rồi thì thực hiện được, bắt buộc mã bản ghi hiệu chỉnh mới (R11)", () => {
    const withValidity = { ...c, status: "CHO_KET_LUAN_P10_P11" as const, validityRef: "M10-2026-11", validityConclusion: "CON_HIEU_LUC" };
    expectErr(txPerformCorrection(withValidity, { id: "u-qtdl", m34Role: "QTDL" }, "u-steward", ""), "RECORD_ID_REQUIRED");
    expect(txPerformCorrection(withValidity, { id: "u-qtdl", m34Role: "QTDL" }, "u-steward", "HC-REC-01")).toMatchObject({
      ok: true,
      status: "DA_HIEU_CHINH",
    });
  });
});

describe("R17/R18/R19 — khai thác, chia sẻ (ETV.P34 §6.5)", () => {
  const baseSharing = (over: Partial<SharingForRules> = {}): SharingForRules => ({
    status: "CHO_PHE_DUYET",
    requestType: "RA_NGOAI_VIEN",
    hasPersonalData: false,
    requesterId: "u-nth",
    atttOpinionById: "u-attt",
    approvedById: null,
    ownerId: "u-owner",
    minScopeLimited: true,
    minAnonymized: true,
    minAnonymizeNA: null,
    ...over,
  });

  it("loại định kỳ – tự động không đi luồng phiếu — hướng dẫn điểm tích hợp M37 (§6.5.2)", () => {
    expect(validateSharingCreate({ requestType: "DINH_KY_TU_DONG", purpose: "x", scopeNote: "y", channel: "API" })).toMatch(/ĐIỂM TÍCH HỢP/);
  });

  it("R19 — kênh cá nhân/dịch vụ AI công cộng bị từ chối ngay khi lập phiếu (§6.5.3)", () => {
    expect(validateSharingCreate({ requestType: "RA_NGOAI_VIEN", recipient: "Sở KHCN", purpose: "x", scopeNote: "y", channel: "gửi qua gmail.com cá nhân" })).toMatch(/Cấm tuyệt đối/);
    expect(validateSharingCreate({ requestType: "RA_NGOAI_VIEN", recipient: "Sở KHCN", purpose: "x", scopeNote: "y", channel: "dán vào ChatGPT để tóm tắt" })).toMatch(/Cấm tuyệt đối/);
  });

  it("ra ngoài Viện / có dữ liệu cá nhân ⇒ bắt buộc qua PT.ATTT trước", () => {
    expect(txSubmitSharing(baseSharing({ status: "DRAFT" }))).toMatchObject({ ok: true, status: "CHO_Y_KIEN_ATTT" });
    expect(txSubmitSharing(baseSharing({ status: "DRAFT", requestType: "NOI_BO_VUOT_QUYEN" }))).toMatchObject({ ok: true, status: "CHO_PHE_DUYET" });
    expect(txSubmitSharing(baseSharing({ status: "DRAFT", requestType: "NOI_BO_VUOT_QUYEN", hasPersonalData: true }))).toMatchObject({
      ok: true,
      status: "CHO_Y_KIEN_ATTT",
    });
  });

  it("PT.ATTT chấp nhận mà không giới hạn trường / không ẩn danh (không lý do) ⇒ chặn (R18 — Phụ lục I.2)", () => {
    const s = baseSharing({ status: "CHO_Y_KIEN_ATTT" });
    const attt = { id: "u-attt", m34Role: "ATTT" };
    expectErr(txAtttOpinion(s, attt, true, { minScopeLimited: false, minAnonymized: true }), "MIN_SCOPE_REQUIRED");
    expectErr(txAtttOpinion(s, attt, true, { minScopeLimited: true, minAnonymized: false }), "MIN_ANON_REQUIRED");
    expect(txAtttOpinion(s, attt, true, { minScopeLimited: true, minAnonymized: false, minAnonymizeNA: "dữ liệu tổng hợp, không định danh" }).ok).toBe(true);
  });

  it("AC16 — chia sẻ ra ngoài thiếu ý kiến PT.ATTT ⇒ LĐV không phê duyệt được (Phụ lục I.1 điều kiện 6)", () => {
    expectErr(txApproveSharing(baseSharing({ atttOpinionById: null }), { id: "u-ldv", m34Role: "LDV" }, true), "ATTT_REQUIRED");
  });

  it("ra ngoài Viện là thẩm quyền LĐV; nội bộ là CSHDL của tập (R17/R18)", () => {
    expectErr(txApproveSharing(baseSharing(), { id: "u-owner", m34Role: null }, true), "FORBIDDEN");
    expect(txApproveSharing(baseSharing(), { id: "u-ldv", m34Role: "LDV" }, true).ok).toBe(true);
    expectErr(txApproveSharing(baseSharing({ requestType: "NOI_BO_VUOT_QUYEN" }), { id: "u-khac", m34Role: "QLCL" }, true), "FORBIDDEN");
    expect(txApproveSharing(baseSharing({ requestType: "NOI_BO_VUOT_QUYEN" }), { id: "u-owner", m34Role: null }, true).ok).toBe(true);
  });

  it("AC17 — người thực hiện trích xuất ≠ người phê duyệt (§5.3)", () => {
    const s = baseSharing({ status: "DA_PHE_DUYET", approvedById: "u-ldv" });
    expectErr(txExecuteSharing(s, { id: "u-ldv", m34Role: "QTHT" }, "log-01"), "SELF_EXECUTE");
    expectErr(txExecuteSharing(s, { id: "u-qtht", m34Role: "QTHT" }, ""), "LOG_REQUIRED");
    expect(txExecuteSharing(s, { id: "u-qtht", m34Role: "QTHT" }, "log-01").ok).toBe(true);
  });

  it("AC18 — thu hồi bắt buộc bằng chứng bên nhận đã xóa/trả (§6.5.2 bước 6)", () => {
    const s = baseSharing({ status: "DA_THUC_HIEN" });
    expectErr(txRevokeSharing(s, { id: "u-owner", m34Role: null }, ""), "EVIDENCE_REQUIRED");
    expect(txRevokeSharing(s, { id: "u-owner", m34Role: null }, "email xác nhận đã xóa 26/08").ok).toBe(true);
  });
});

describe("R22 — dữ liệu cho hệ thống AI (ETV.P34 §6.8; ETV.P28 mục 5.13)", () => {
  it("AC19 — tập Hạn chế/Mật bị từ chối ngay, cấm tuyệt đối", () => {
    expect(validateAICreate("HAN_CHE", "AIA-01")).toMatch(/Cấm tuyệt đối/);
    expect(validateAICreate("MAT", "AIA-01")).toMatch(/Cấm tuyệt đối/);
    expect(validateAICreate("NOI_BO", "AIA-01")).toBeNull();
  });

  it("AC20 — thiếu AIA hoặc thiếu ý kiến PT.ATTT ⇒ LĐV không phê duyệt được", () => {
    expect(validateAICreate("NOI_BO", "")).toMatch(/đánh giá tác động AI/);
    expectErr(txApproveAI({ status: "DE_NGHI", atttOpinionById: null, aiaRef: "AIA-01" }, { id: "u-ldv", m34Role: "LDV" }, true), "ATTT_REQUIRED");
    expect(txApproveAI({ status: "DE_NGHI", atttOpinionById: "u-attt", aiaRef: "AIA-01" }, { id: "u-ldv", m34Role: "LDV" }, true).ok).toBe(true);
  });

  it("phê duyệt là thẩm quyền LĐV, không ủy quyền (§5.1)", () => {
    expectErr(txApproveAI({ status: "DE_NGHI", atttOpinionById: "u-attt", aiaRef: "A" }, { id: "u-attt", m34Role: "ATTT" }, true), "FORBIDDEN");
  });
});

describe("Cờ đến hạn — tính khi đọc (ETV.P34 Phụ lục II.1)", () => {
  const d = (daysAgo: number) => new Date(Date.now() - daysAgo * 86_400_000);

  it("AC23 — rà soát 06 tháng với dữ liệu cá nhân; quá 02 chu kỳ để báo LĐV (R8)", () => {
    expect(isReviewDue("THANG_06", d(200), d(400))).toBe(true);
    expect(isReviewDue("THANG_06", d(100), d(400))).toBe(false);
    expect(reviewOverdueCycles("THANG_06", d(400), d(500))).toBeGreaterThanOrEqual(2);
    expect(reviewOverdueCycles("THANG_12", d(200), d(400))).toBe(0);
  });

  it("kỳ đo theo nhóm: đo–kỹ thuật 90 ngày; nhóm AI không theo lịch (§6.4.2)", () => {
    expect(isQualityDue("DO_KY_THUAT", d(100), d(400))).toBe(true);
    expect(isQualityDue("DO_KY_THUAT", d(30), d(400))).toBe(false);
    expect(isQualityDue("TRI_TUE_NHAN_TAO", d(999), d(1000))).toBe(false);
  });
});
