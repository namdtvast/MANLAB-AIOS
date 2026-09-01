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
  kiemTraDoiMoHinh,
  kiemTraGanCongCu,
  nenTangNhanDuocTacTu,
  opStatusTransitions,
  promptTransitions,
  unregisteredTransitions,
  validateDangKyHeThongAI,
  validateTool,
  type DependentRef,
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

  // ETV.P35 §6.1.7 bước 6 / StateMachine.md trạng thái 7: phê duyệt xong CÒN một bước đưa vào vận
  // hành. Thiếu bước này thì ACTIVE là trạng thái không bao giờ tới được, và vòng dò sức khoẻ
  // (checkHealthAction) lọc theo APPROVED+ACTIVE sẽ không bao giờ thấy nền tảng đang vận hành.
  it("đưa vào vận hành chỉ từ Đã phê duyệt, và chuyển sang Hiệu lực", () => {
    expect(approvalTransitions.activate({ approvalStatus: "APPROVED" })).toMatchObject({ ok: true, status: "ACTIVE" });
    for (const from of ["DRAFT", "PENDING_REVIEW", "PENDING_APPROVAL", "RETURNED", "REJECTED", "ACTIVE", "ARCHIVED"] as const)
      expectErr(approvalTransitions.activate({ approvalStatus: from }), "BAD_STATE");
  });

  it("nền tảng đang Hiệu lực vẫn ngừng vận hành được", () => {
    expectErr(approvalTransitions.archive({ approvalStatus: "ACTIVE" }), "REASON_REQUIRED");
    expect(approvalTransitions.archive({ approvalStatus: "ACTIVE" }, { reason: "thay bằng máy chủ mới" })).toMatchObject({
      ok: true,
      status: "ARCHIVED",
    });
  });

  // ETV.P35 Phụ lục II.1 trạng thái 9. Hủy và Hết hiệu lực có tập trạng thái nguồn RỜI NHAU —
  // đây là ranh giới dễ bị gộp lại nhất khi ai đó thấy hai nút "trông giống nhau".
  it("hủy chỉ mở ở các bước chưa phê duyệt", () => {
    for (const from of ["DRAFT", "PENDING_REVIEW", "RETURNED", "PENDING_APPROVAL", "REJECTED"] as const)
      expect(approvalTransitions.cancel({ approvalStatus: from }, { reason: "đăng ký nhầm" })).toMatchObject({ ok: true, status: "CANCELLED" });
    for (const from of ["APPROVED", "ACTIVE", "ARCHIVED", "CANCELLED"] as const)
      expectErr(approvalTransitions.cancel({ approvalStatus: from }, { reason: "đăng ký nhầm" }), "BAD_STATE");
  });

  it("hủy bắt buộc lý do, lý do toàn khoảng trắng không tính", () => {
    expectErr(approvalTransitions.cancel({ approvalStatus: "DRAFT" }), "REASON_REQUIRED");
    expectErr(approvalTransitions.cancel({ approvalStatus: "DRAFT" }, { reason: "   " }), "REASON_REQUIRED");
    expectErr(approvalTransitions.archive({ approvalStatus: "ACTIVE" }, { reason: "  " }), "REASON_REQUIRED");
  });

  // ETV.P35 §6.5.3: chặn cứng, và thủ tục đòi chỉ ra DANH SÁCH đối tượng còn phụ thuộc.
  it("không kết thúc vòng đời khi còn tác tử/công cụ đang hoạt động trỏ tới", () => {
    const dep = {
      reason: "hết hạn hợp đồng",
      activeDependents: [
        { kind: "agent", id: "ag1", code: "AGENT_TROLY_M29" },
        { kind: "tool", id: "tl1", code: "TOOL_KPI" },
      ] as DependentRef[],
    };
    const archived = approvalTransitions.archive({ approvalStatus: "ACTIVE" }, dep);
    expectErr(archived, "DEPENDENTS_ACTIVE");
    // §6.5.3 đòi hệ thống "chỉ ra danh sách đối tượng còn phụ thuộc" — thông báo phải nêu tên thật.
    if (!archived.ok) {
      expect(archived.message).toContain("tác tử AGENT_TROLY_M29");
      expect(archived.message).toContain("công cụ TOOL_KPI");
      // Giao diện dựng liên kết từ đây, nên hai vế câu + id phải đi kèm chứ không chỉ có chuỗi.
      expect(archived.dependents?.refs.map((r) => r.id)).toEqual(["ag1", "tl1"]);
      expect(`${archived.dependents?.truoc}tác tử AGENT_TROLY_M29, công cụ TOOL_KPI${archived.dependents?.sau}`).toBe(archived.message);
    }
    expectErr(approvalTransitions.cancel({ approvalStatus: "DRAFT" }, dep), "DEPENDENTS_ACTIVE");
    // Danh sách rỗng không phải là lý do chặn.
    expect(approvalTransitions.archive({ approvalStatus: "ACTIVE" }, { reason: "hết hạn", activeDependents: [] }).ok).toBe(true);
  });
});

describe("opStatusTransitions — vòng đời vận hành Provider/Model/Skill (ETV.P29 mục 6.3)", () => {
  it("vô hiệu hóa được bản ghi đang Hoạt động, kèm lý do", () => {
    const r = opStatusTransitions.disable({ status: "ACTIVE" }, { reason: "đăng ký nhầm, không dùng nữa" });
    expect(r).toMatchObject({ ok: true, status: "DISABLED", reason: "đăng ký nhầm, không dùng nữa" });
  });

  // ETV.P29 mục 6.3 câu cuối: mọi nhánh kết thúc bắt buộc ghi lý do. Khoảng trắng không phải lý do.
  it("không vô hiệu hóa được khi bỏ trống lý do", () => {
    expectErr(opStatusTransitions.disable({ status: "ACTIVE" }), "REASON_REQUIRED");
    expectErr(opStatusTransitions.disable({ status: "ACTIVE" }, { reason: "   " }), "REASON_REQUIRED");
  });

  it("không vô hiệu hóa lại bản ghi đã hết hoạt động", () => {
    for (const from of ["DISABLED", "DEPRECATED", "SUSPENDED"] as const)
      expectErr(opStatusTransitions.disable({ status: from }, { reason: "x" }), "BAD_STATE");
  });

  // Cùng tinh thần chặn cứng ETV.P35 §6.5.3: không rút một mắt xích khi mắt sau còn đang chạy.
  it("không vô hiệu hóa được khi còn bản ghi đang hoạt động trỏ tới", () => {
    const r = opStatusTransitions.disable(
      { status: "ACTIVE" },
      {
        reason: "ngừng hợp đồng",
        doiTuong: "nhà cung cấp này",
        activeDependents: [{ kind: "model", id: "md1", code: "gemini-2.5-flash" }] as DependentRef[],
      }
    );
    expectErr(r, "DEPENDENTS_ACTIVE");
    if (!r.ok) {
      expect(r.message).toContain("mô hình gemini-2.5-flash");
      expect(r.message).toContain("nhà cung cấp này");
      expect(r.dependents?.refs.map((d) => d.id)).toEqual(["md1"]);
      expect(`${r.dependents?.truoc}mô hình gemini-2.5-flash${r.dependents?.sau}`).toBe(r.message);
    }
    // Danh sách rỗng không phải là lý do chặn.
    expect(opStatusTransitions.disable({ status: "ACTIVE" }, { reason: "x", activeDependents: [] }).ok).toBe(true);
  });

  it("kích hoạt lại được từ mọi trạng thái không Hoạt động, và không cần lý do", () => {
    for (const from of ["DISABLED", "DEPRECATED", "SUSPENDED"] as const)
      expect(opStatusTransitions.enable({ status: from })).toMatchObject({ ok: true, status: "ACTIVE" });
    expectErr(opStatusTransitions.enable({ status: "ACTIVE" }), "BAD_STATE");
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

// ---------- Đổi mô hình của tác tử (ETV.P29 §5.8) ----------
describe("kiemTraDoiMoHinh", () => {
  const AGENT = { platformId: "pf-cu", modelId: "md-cu" };
  const PF = { id: "pf-moi", code: "MANLAB_AI_Q3", approvalStatus: "ACTIVE" as const };
  const MD = { id: "md-moi", modelId: "manlab-ai", status: "ACTIVE" as const, providerCode: "MANLAB_AI", providerPlatformId: "pf-moi" };
  const LY_DO = "Chuyển sang máy chủ nội bộ để dữ liệu không rời hạ tầng của Viện";

  it("đủ điều kiện thì cho đổi VÀ tác tử về trạng thái tạm dừng", () => {
    const r = kiemTraDoiMoHinh({ lyDo: LY_DO, agent: AGENT, platform: PF, model: MD });
    expect(r.ok).toBe(true);
    // Tạm dừng là một phần của quy tắc, không phải tùy chọn: AIA hiện có mô tả hệ thống AI cũ.
    if (r.ok) expect(r.status).toBe("SUSPENDED");
  });

  it("bắt buộc ghi lý do — đây là thay đổi lớn phải truy được", () => {
    const r = kiemTraDoiMoHinh({ lyDo: "  ", agent: AGENT, platform: PF, model: MD });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("REASON_REQUIRED");
  });

  it("nền tảng chưa phê duyệt thì không nhận được lưu lượng", () => {
    const r = kiemTraDoiMoHinh({ lyDo: LY_DO, agent: AGENT, platform: { ...PF, approvalStatus: "DRAFT" }, model: MD });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("PLATFORM_NOT_APPROVED");
  });

  it("model đang vô hiệu hóa thì không dùng cho vận hành", () => {
    const r = kiemTraDoiMoHinh({ lyDo: LY_DO, agent: AGENT, platform: PF, model: { ...MD, status: "DISABLED" } });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("MODEL_DISABLED");
  });

  it("chặn ghép model của nhà cung cấp này với nền tảng khác", () => {
    const r = kiemTraDoiMoHinh({ lyDo: LY_DO, agent: AGENT, platform: PF, model: { ...MD, providerPlatformId: "pf-khac" } });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("MODEL_PLATFORM_MISMATCH");

    const r2 = kiemTraDoiMoHinh({ lyDo: LY_DO, agent: AGENT, platform: PF, model: { ...MD, providerPlatformId: null } });
    expect(r2.ok).toBe(false);
    if (!r2.ok) expect(r2.code).toBe("PROVIDER_NO_PLATFORM");
  });

  it("đổi sang đúng thứ đang chạy thì không phải một thay đổi", () => {
    const r = kiemTraDoiMoHinh({ lyDo: LY_DO, agent: { platformId: "pf-moi", modelId: "md-moi" }, platform: PF, model: MD });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("NO_CHANGE");
  });
});

// ---------- Gán công cụ cho tác tử (ETV.P29 mục 5.8, 5.4.1) ----------
describe("kiemTraGanCongCu", () => {
  const doc = { id: "t-doc", name: "Xem KPI", status: "ACTIVE" as const, permissionLevel: "READ" as const };
  const tinh = { id: "t-tinh", name: "Tính z-score", status: "ACTIVE" as const, permissionLevel: "COMPUTE" as const };
  const thucThi = { id: "t-thuchien", name: "Ghi phiếu KPH", status: "ACTIVE" as const, permissionLevel: "EXECUTE" as const };
  const LY_DO = "Bổ sung công cụ ghi phiếu KPH theo quyết định đã phê duyệt";

  it("thêm công cụ mức cao hơn là thay đổi lớn: bắt lý do và tạm dừng tác tử", () => {
    const r = kiemTraGanCongCu({ lyDo: LY_DO, truoc: [doc], sau: [doc, thucThi] });
    expect(r.ok).toBe(true);
    // Tạm dừng nằm trong quy tắc, không phải tùy chọn của người bấm — ETV.P29 mục 5.8.
    if (r.ok) {
      expect(r.status).toBe("SUSPENDED");
      expect(r.patch.nangQuyen).toBe(true);
    }
  });

  it("nâng quyền mà không ghi lý do thì không cho", () => {
    const r = kiemTraGanCongCu({ lyDo: "vì cần", truoc: [doc], sau: [doc, thucThi] });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("REASON_REQUIRED");
  });

  it("whitelist rỗng thêm công cụ đầu tiên cũng là nâng quyền", () => {
    const r = kiemTraGanCongCu({ lyDo: LY_DO, truoc: [], sau: [doc] });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.patch.nangQuyen).toBe(true);
  });

  it("bỏ bớt công cụ là thay đổi nhỏ: không lý do, không tạm dừng", () => {
    const r = kiemTraGanCongCu({ lyDo: "", truoc: [doc, thucThi], sau: [doc] });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.status).toBe("UNCHANGED");
      expect(r.patch.nangQuyen).toBe(false);
    }
  });

  it("thêm công cụ mức không cao hơn trần đang có là thay đổi nhỏ", () => {
    const r = kiemTraGanCongCu({ lyDo: "", truoc: [thucThi], sau: [thucThi, tinh] });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.patch.nangQuyen).toBe(false);
  });

  it("không gán được công cụ đang vô hiệu hóa", () => {
    const r = kiemTraGanCongCu({ lyDo: LY_DO, truoc: [doc], sau: [doc, { ...tinh, status: "DISABLED" }] });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("TOOL_NOT_ACTIVE");
  });

  it("công cụ đã nằm sẵn trong whitelist rồi bị vô hiệu hóa thì vẫn bỏ ra được", () => {
    const hong = { ...tinh, status: "DISABLED" as const };
    const r = kiemTraGanCongCu({ lyDo: "", truoc: [doc, hong], sau: [doc] });
    expect(r.ok).toBe(true);
  });

  it("chọn lại đúng danh sách đang có thì không phải một thay đổi", () => {
    const r = kiemTraGanCongCu({ lyDo: "", truoc: [doc, tinh], sau: [tinh, doc] });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("NO_CHANGE");
  });
});

describe("validateDangKyHeThongAI — đăng ký hệ thống AI vào danh mục (ETV.P29 mục 5.1.3)", () => {
  it("dữ liệu cá nhân buộc mức tác động Cao", () => {
    expectErr(validateDangKyHeThongAI({ riskLevel: "MEDIUM", personalData: true, reviewCycle: "ONE_YEAR" }), "PERSONAL_DATA_REQUIRES_HIGH");
    expectErr(validateDangKyHeThongAI({ riskLevel: "LOW", personalData: true, reviewCycle: "SIX_MONTHS" }), "PERSONAL_DATA_REQUIRES_HIGH");
    expect(validateDangKyHeThongAI({ riskLevel: "HIGH", personalData: true, reviewCycle: "SIX_MONTHS" }).ok).toBe(true);
  });

  it("mức Cao chỉ chấp nhận chu kỳ rà soát ≤ 06 tháng", () => {
    for (const cycle of ["ONE_YEAR", "BY_EVENT"] as const)
      expectErr(validateDangKyHeThongAI({ riskLevel: "HIGH", personalData: false, reviewCycle: cycle }), "REVIEW_CYCLE_TOO_SPARSE");
    expect(validateDangKyHeThongAI({ riskLevel: "HIGH", personalData: false, reviewCycle: "SIX_MONTHS" }).ok).toBe(true);
  });

  it("mức Trung bình chấp nhận ≤ 01 năm, không chấp nhận theo sự kiện", () => {
    expectErr(validateDangKyHeThongAI({ riskLevel: "MEDIUM", personalData: false, reviewCycle: "BY_EVENT" }), "REVIEW_CYCLE_TOO_SPARSE");
    for (const cycle of ["SIX_MONTHS", "ONE_YEAR"] as const)
      expect(validateDangKyHeThongAI({ riskLevel: "MEDIUM", personalData: false, reviewCycle: cycle }).ok).toBe(true);
  });

  it("mức Thấp chấp nhận mọi chu kỳ — theo sự kiện là mức ĐÚNG của mức Thấp, không phải mức thiếu", () => {
    for (const cycle of ["SIX_MONTHS", "ONE_YEAR", "BY_EVENT"] as const)
      expect(validateDangKyHeThongAI({ riskLevel: "LOW", personalData: false, reviewCycle: cycle }).ok).toBe(true);
  });

  it("không tự sửa mức tác động cho khớp — chỉ từ chối (mục 4.8)", () => {
    const r = validateDangKyHeThongAI({ riskLevel: "MEDIUM", personalData: true, reviewCycle: "ONE_YEAR" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.message).toContain("sửa mức tác động");
  });
});

describe("nenTangNhanDuocTacTu — nền tảng phải đang hiệu lực (ETV.P29 mục 5.1.1)", () => {
  it("chỉ nhận nền tảng Đã phê duyệt hoặc Hiệu lực", () => {
    expect(nenTangNhanDuocTacTu({ approvalStatus: "APPROVED" })).toBe(true);
    expect(nenTangNhanDuocTacTu({ approvalStatus: "ACTIVE" })).toBe(true);
  });

  it("từ chối nền tảng chưa qua phê duyệt hoặc đã kết thúc vòng đời", () => {
    for (const st of ["DRAFT", "PENDING_REVIEW", "RETURNED", "PENDING_APPROVAL", "REJECTED", "ARCHIVED", "CANCELLED"] as const)
      expect(nenTangNhanDuocTacTu({ approvalStatus: st })).toBe(false);
  });
});
