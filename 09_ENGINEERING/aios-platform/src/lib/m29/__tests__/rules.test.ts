// Bộ test cho quyết định chuyển trạng thái của M29 — rules.ts là nơi DUY NHẤT quyết định
// "được phép hay không", nên đây là chỗ đáng phủ test nhất của module.
//
// Mỗi nhóm test dẫn chiếu điều khoản ETV.P29 mà nó bảo vệ: khi ai đó sửa rule cho "tiện", test
// hỏng sẽ chỉ thẳng ra điều khoản bị vi phạm, thay vì chỉ báo một hàm đổi hành vi.
import { describe, expect, it } from "vitest";
import {
  aiaTransitions,
  approvalTransitions,
  hasToolPermission,
  incidentTransitions,
  promptTransitions,
  unregisteredTransitions,
  validateTool,
  type IncidentForRules,
  type SightingForRules,
  type TxResult,
} from "../rules";

/** Rút gọn khẳng định: rule từ chối với đúng mã lỗi nào. */
function expectErr(result: TxResult, code: string) {
  expect(result.ok).toBe(false);
  if (result.ok) return; // thu hẹp kiểu union; nhánh này không xảy ra vì khẳng định trên đã đỏ
  expect(result.code).toBe(code);
}

describe("approvalTransitions — vòng đời phê duyệt dùng chung (Platform/Guardrail/Policy)", () => {
  it("gửi soát xét được từ Nháp, Trả lại và Từ chối", () => {
    for (const from of ["DRAFT", "RETURNED", "REJECTED"] as const) {
      const r = approvalTransitions.submit({ approvalStatus: from });
      expect(r).toMatchObject({ ok: true, status: "PENDING_REVIEW" });
    }
  });

  it("không gửi soát xét lại bản đã phê duyệt", () => {
    expectErr(approvalTransitions.submit({ approvalStatus: "APPROVED" }), "NOT_DRAFT");
  });

  it("trả lại khi soát xét bắt buộc có lý do", () => {
    expectErr(approvalTransitions.review({ approvalStatus: "PENDING_REVIEW" }, { decision: "return" }), "REASON_REQUIRED");
    expect(approvalTransitions.review({ approvalStatus: "PENDING_REVIEW" }, { decision: "return", reason: "thiếu căn cứ" })).toMatchObject({
      ok: true,
      status: "RETURNED",
      reason: "thiếu căn cứ",
    });
  });

  it("từ chối phê duyệt bắt buộc có lý do; phê duyệt ghi lại người duyệt", () => {
    expectErr(approvalTransitions.approve({ approvalStatus: "PENDING_APPROVAL" }, { id: "u1" }, { decision: "reject" }), "REASON_REQUIRED");
    expect(approvalTransitions.approve({ approvalStatus: "PENDING_APPROVAL" }, { id: "u1" }, { decision: "approve" })).toMatchObject({
      ok: true,
      status: "APPROVED",
      patch: { approvedBy: "u1" },
    });
  });

  it("chỉ bản Đã phê duyệt mới cho Hết hiệu lực, và bắt buộc lý do", () => {
    expectErr(approvalTransitions.archive({ approvalStatus: "DRAFT" }, { reason: "x" }), "BAD_STATE");
    expectErr(approvalTransitions.archive({ approvalStatus: "APPROVED" }), "REASON_REQUIRED");
    expect(approvalTransitions.archive({ approvalStatus: "APPROVED" }, { reason: "thay bằng bản mới" }).ok).toBe(true);
  });
});

describe("aiaTransitions — hồ sơ đánh giá tác động AI (ISO/IEC 42001, ETV.P29 mục 5.2)", () => {
  it("khởi tạo được từ Chưa đánh giá và từ Cần rà soát lại", () => {
    expect(aiaTransitions.startDraft({ status: "NOT_ASSESSED" }).ok).toBe(true);
    expect(aiaTransitions.startDraft({ status: "REVIEW_REQUIRED" }).ok).toBe(true);
    expectErr(aiaTransitions.startDraft({ status: "APPROVED" }), "BAD_STATE");
  });

  it("đi đúng chuỗi Nháp → Đã soát xét → Đã phê duyệt, không nhảy bước", () => {
    expectErr(aiaTransitions.approve({ status: "DRAFT" }, { id: "u1" }), "BAD_STATE");
    expect(aiaTransitions.submitReview({ status: "DRAFT" }).ok).toBe(true);
    expect(aiaTransitions.approve({ status: "REVIEWED" }, { id: "u1" })).toMatchObject({
      ok: true,
      status: "APPROVED",
      patch: { approvedBy: "u1" },
    });
  });

  it("gắn cờ cần rà soát lại chỉ áp cho bản Đã phê duyệt và bắt buộc lý do", () => {
    expectErr(aiaTransitions.flagReviewRequired({ status: "DRAFT" }, { reason: "x" }), "BAD_STATE");
    expectErr(aiaTransitions.flagReviewRequired({ status: "APPROVED" }), "REASON_REQUIRED");
    expect(aiaTransitions.flagReviewRequired({ status: "APPROVED" }, { reason: "đổi phạm vi dữ liệu" }).ok).toBe(true);
  });
});

describe("promptTransitions — phiên bản lời nhắc", () => {
  it("chỉ kích hoạt được bản Đã phê duyệt", () => {
    expectErr(promptTransitions.activate({ status: "DRAFT" }), "BAD_STATE");
    expectErr(promptTransitions.activate({ status: "REVIEW" }), "BAD_STATE");
    expect(promptTransitions.activate({ status: "APPROVED" })).toMatchObject({ ok: true, status: "ACTIVE" });
  });
});

describe("validateTool — Tool mức EXECUTE phải có chốt chặn", () => {
  it("EXECUTE mà không xác nhận cũng không phê duyệt thì bị từ chối", () => {
    expectErr(validateTool({ permissionLevel: "EXECUTE", requireConfirmation: false, requireApproval: false }), "EXECUTE_REQUIRES_GUARD");
  });

  it("EXECUTE có một trong hai chốt là hợp lệ", () => {
    expect(validateTool({ permissionLevel: "EXECUTE", requireConfirmation: true, requireApproval: false }).ok).toBe(true);
    expect(validateTool({ permissionLevel: "EXECUTE", requireConfirmation: false, requireApproval: true }).ok).toBe(true);
  });

  it("mức thấp hơn EXECUTE không bị ràng buộc này", () => {
    expect(validateTool({ permissionLevel: "READ", requireConfirmation: false, requireApproval: false }).ok).toBe(true);
  });
});

describe("hasToolPermission — vai trò tối thiểu theo mức quyền của Tool", () => {
  it("người chỉ có quyền xem không gọi được Tool mức COMPUTE trở lên", () => {
    expect(hasToolPermission("AI_VIEWER", { permissionLevel: "READ" })).toBe(true);
    expect(hasToolPermission("AI_VIEWER", { permissionLevel: "COMPUTE" })).toBe(false);
    expect(hasToolPermission("AI_VIEWER", { permissionLevel: "EXECUTE" })).toBe(false);
  });

  it("người vận hành gọi được COMPUTE nhưng không gọi được PROPOSE/EXECUTE", () => {
    expect(hasToolPermission("AI_OPERATOR", { permissionLevel: "COMPUTE" })).toBe(true);
    expect(hasToolPermission("AI_OPERATOR", { permissionLevel: "PROPOSE" })).toBe(false);
  });

  it("kiểm toán viên chỉ ngang quyền người xem — không được nâng quyền nhờ vai trò đọc rộng", () => {
    expect(hasToolPermission("AI_AUDITOR", { permissionLevel: "COMPUTE" })).toBe(false);
  });

  it("không có vai trò M29 thì không gọi được Tool nào", () => {
    expect(hasToolPermission(null, { permissionLevel: "READ" })).toBe(false);
  });
});

// ---------- Increment 4: sự cố AI và AI chưa đăng ký ----------

const incidentBase: IncidentForRules = {
  status: "PENDING_CONFIRMATION",
  severity: "MINOR",
  detectedById: "nguoi-phat-hien",
  containmentAction: "đã ngắt tác tử khỏi luồng thẩm định",
  affectsIssuedResult: false,
  sensitiveDataExposed: false,
};

describe("incidentTransitions — vòng đời phiếu sự cố AI (ETV.P29 mục 5.7.3, 6.3)", () => {
  it("khống chế trước: chuyển sang Đang xử lý bắt buộc đã ghi biện pháp khống chế", () => {
    const chuaKhongChe = { ...incidentBase, status: "NEW" as const, containmentAction: "" };
    expectErr(incidentTransitions.start(chuaKhongChe), "CONTAINMENT_REQUIRED");
    expectErr(incidentTransitions.start(chuaKhongChe, { containmentAction: "   " }), "CONTAINMENT_REQUIRED");
    expect(incidentTransitions.start(chuaKhongChe, { containmentAction: "đã tạm dừng tác tử" })).toMatchObject({
      ok: true,
      status: "IN_PROGRESS",
      patch: { containmentAction: "đã tạm dừng tác tử" },
    });
  });

  it("không nhảy thẳng từ Mới sang Chờ xác nhận", () => {
    expectErr(incidentTransitions.submit({ ...incidentBase, status: "NEW" }), "BAD_STATE");
    expect(incidentTransitions.submit({ ...incidentBase, status: "IN_PROGRESS" })).toMatchObject({ ok: true, status: "PENDING_CONFIRMATION" });
  });

  it("người phát hiện không được đóng chính sự cố mình phát hiện", () => {
    expectErr(incidentTransitions.close(incidentBase, { id: "nguoi-phat-hien", role: "SUPER_ADMIN" }), "SELF_CLOSE_FORBIDDEN");
  });

  it("sự cố Nghiêm trọng chỉ Lãnh đạo Viện được đóng", () => {
    const severe = { ...incidentBase, severity: "SEVERE" as const };
    expectErr(incidentTransitions.close(severe, { id: "nguoi-khac", role: "AI_ADMIN" }, { capRef: "KPH-2026-01" }), "APPROVER_ROLE_REQUIRED");
    expect(incidentTransitions.close(severe, { id: "nguoi-khac", role: "SUPER_ADMIN" }, { capRef: "KPH-2026-01" }).ok).toBe(true);
  });

  it("mức Nghiêm trọng và Đáng kể bắt buộc mã KPH theo ETV.MP13", () => {
    expectErr(incidentTransitions.close({ ...incidentBase, severity: "SEVERE" }, { id: "u2", role: "SUPER_ADMIN" }), "CAP_REQUIRED");
    expectErr(incidentTransitions.close({ ...incidentBase, severity: "SIGNIFICANT" }, { id: "u2", role: "AI_ADMIN" }), "CAP_REQUIRED");
    // Khoảng trắng không tính là đã nhập.
    expectErr(incidentTransitions.close({ ...incidentBase, severity: "SEVERE" }, { id: "u2", role: "SUPER_ADMIN" }, { capRef: "  " }), "CAP_REQUIRED");
    // Mức Nhẹ thì không đòi KPH.
    expect(incidentTransitions.close(incidentBase, { id: "u2", role: "AI_ADMIN" }).ok).toBe(true);
  });

  it("lộ dữ liệu nhạy cảm bắt buộc số phiếu F28.03 (xử lý đồng thời theo ETV.MP28)", () => {
    const loDuLieu = { ...incidentBase, sensitiveDataExposed: true };
    expectErr(incidentTransitions.close(loDuLieu, { id: "u2", role: "AI_ADMIN" }), "F28_REQUIRED");
    expect(incidentTransitions.close(loDuLieu, { id: "u2", role: "AI_ADMIN" }, { f28Ref: "F28.03-2026-004" })).toMatchObject({
      ok: true,
      patch: { f28Ref: "F28.03-2026-004" },
    });
  });

  it("ảnh hưởng kết quả đã phát hành bắt buộc mã hồ sơ MP10/MP11", () => {
    const anhHuong = { ...incidentBase, affectsIssuedResult: true };
    expectErr(incidentTransitions.close(anhHuong, { id: "u2", role: "AI_ADMIN" }), "ISSUED_RESULT_REF_REQUIRED");
    expect(incidentTransitions.close(anhHuong, { id: "u2", role: "AI_ADMIN" }, { issuedResultRef: "HS-2026-014" }).ok).toBe(true);
  });

  it("đóng phiếu ghi lại người đóng và toàn bộ mã hồ sơ dẫn chiếu", () => {
    const r = incidentTransitions.close(
      { ...incidentBase, severity: "SIGNIFICANT", sensitiveDataExposed: true, affectsIssuedResult: true },
      { id: "nguoi-dong", role: "AI_ADMIN" },
      { capRef: "KPH-2026-01", f28Ref: "F28.03-2026-004", issuedResultRef: "HS-2026-014", closureNote: "đã thu hồi bản nháp" }
    );
    expect(r).toMatchObject({
      ok: true,
      status: "CLOSED",
      patch: { capRef: "KPH-2026-01", f28Ref: "F28.03-2026-004", issuedResultRef: "HS-2026-014", closedById: "nguoi-dong" },
    });
  });

  it("chỉ đóng được phiếu đang ở Chờ xác nhận", () => {
    for (const status of ["NEW", "IN_PROGRESS", "CLOSED", "CANCELLED"] as const) {
      expectErr(incidentTransitions.close({ ...incidentBase, status }, { id: "u2", role: "SUPER_ADMIN" }), "BAD_STATE");
    }
  });

  it("hủy phiếu chỉ Lãnh đạo Viện, bắt buộc lý do, và không hủy được phiếu đã kết thúc", () => {
    expectErr(incidentTransitions.cancel(incidentBase, { role: "AI_ADMIN" }, { reason: "trùng phiếu" }), "APPROVER_ROLE_REQUIRED");
    expectErr(incidentTransitions.cancel(incidentBase, { role: "SUPER_ADMIN" }), "REASON_REQUIRED");
    expectErr(incidentTransitions.cancel({ ...incidentBase, status: "CLOSED" }, { role: "SUPER_ADMIN" }, { reason: "x" }), "BAD_STATE");
    expect(incidentTransitions.cancel(incidentBase, { role: "SUPER_ADMIN" }, { reason: "trùng với SCAI-2026-0002" })).toMatchObject({
      ok: true,
      status: "CANCELLED",
      patch: { cancelReason: "trùng với SCAI-2026-0002" },
    });
  });
});

const sightingBase: SightingForRules = { status: "REGISTERING", sensitiveData: false, incidentId: null };

describe("unregisteredTransitions — hệ thống AI chưa đăng ký (ETV.P29 mục 5.1.7)", () => {
  it("đóng bằng Đã đăng ký bắt buộc trỏ tới một Agent thật trong danh mục", () => {
    expectErr(unregisteredTransitions.markRegistered(sightingBase, {}), "AGENT_REQUIRED");
    expect(unregisteredTransitions.markRegistered(sightingBase, { registeredAgentId: "agent-1" })).toMatchObject({
      ok: true,
      status: "REGISTERED",
      patch: { registeredAgentId: "agent-1" },
    });
  });

  it("chấm dứt sử dụng bắt buộc ghi lý do", () => {
    expectErr(unregisteredTransitions.discontinue(sightingBase), "REASON_REQUIRED");
    expectErr(unregisteredTransitions.discontinue(sightingBase, { reason: "  " }), "REASON_REQUIRED");
    expect(unregisteredTransitions.discontinue(sightingBase, { reason: "đã có công cụ nội bộ thay thế" }).ok).toBe(true);
  });

  it("dính dữ liệu nhạy cảm thì KHÔNG đóng được ở cả hai nhánh khi chưa gắn phiếu sự cố", () => {
    const nhayCam = { ...sightingBase, sensitiveData: true };
    expectErr(unregisteredTransitions.markRegistered(nhayCam, { registeredAgentId: "agent-1" }), "INCIDENT_REQUIRED");
    expectErr(unregisteredTransitions.discontinue(nhayCam, { reason: "dừng dùng" }), "INCIDENT_REQUIRED");
  });

  it("gắn phiếu sự cố rồi thì đóng được", () => {
    const daGanPhieu = { ...sightingBase, sensitiveData: true, incidentId: "sc-1" };
    expect(unregisteredTransitions.markRegistered(daGanPhieu, { registeredAgentId: "agent-1" }).ok).toBe(true);
    expect(unregisteredTransitions.discontinue(daGanPhieu, { reason: "dừng dùng" }).ok).toBe(true);
  });

  it("bản ghi đã kết thúc thì không mở lại bằng các chuyển trạng thái này", () => {
    for (const status of ["REGISTERED", "DISCONTINUED"] as const) {
      expectErr(unregisteredTransitions.markRegistered({ ...sightingBase, status }, { registeredAgentId: "a" }), "BAD_STATE");
      expectErr(unregisteredTransitions.discontinue({ ...sightingBase, status }, { reason: "x" }), "BAD_STATE");
    }
  });

  it("chỉ bắt đầu hoàn thiện đăng ký từ trạng thái Mới phát hiện", () => {
    expect(unregisteredTransitions.startRegistering({ ...sightingBase, status: "OPEN" })).toMatchObject({ ok: true, status: "REGISTERING" });
    expectErr(unregisteredTransitions.startRegistering(sightingBase), "BAD_STATE");
  });
});
