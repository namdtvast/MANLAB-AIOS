import { describe, expect, it } from "vitest";
import { roleLabel, roleLabelMap, validateParty } from "../crm";

describe("M34 CRM Party–Role", () => {
  it("chặn tổ chức thiếu mã số thuế/định danh", () => {
    expect(validateParty({ partyType: "ORGANIZATION", legalName: "Công ty A", roles: ["CUSTOMER"] })).toContain("mã số thuế");
  });
  it("chặn hồ sơ không có vai trò", () => {
    expect(validateParty({ partyType: "PERSON", legalName: "Nguyễn Văn A", roles: [] })).toContain("vai trò");
  });
  it("chấp nhận một chủ thể có nhiều vai trò", () => {
    expect(validateParty({ partyType: "ORGANIZATION", legalName: "Công ty A", taxId: "0101234567", roles: ["CUSTOMER", "SUPPLIER"] })).toBeNull();
  });
  it("chặn email đầu mối sai định dạng", () => {
    expect(validateParty({ partyType: "PERSON", legalName: "Nguyễn Văn A", roles: ["EXPERT"], contactEmail: "sai-email" })).toContain("Email");
  });
  it("chấp nhận vai trò ngoài danh sách gốc — vai trò là master data, không phải enum", () => {
    expect(validateParty({ partyType: "ORGANIZATION", legalName: "Công ty A", taxId: "0101234567", roles: ["AUDITEE"] })).toBeNull();
  });
});

describe("M34 nhãn vai trò đọc từ danh mục", () => {
  const labels = roleLabelMap([
    { code: "CUSTOMER", nameVi: "Khách hàng" },
    { code: "AUDITEE", nameVi: "Cơ sở được đánh giá" },
  ]);
  it("lấy đúng tên tiếng Việt theo mã", () => {
    expect(roleLabel(labels, "AUDITEE")).toBe("Cơ sở được đánh giá");
  });
  it("mã đã ngừng hiệu lực vẫn hiện được thay vì mất dấu", () => {
    expect(roleLabel(labels, "VAI_TRO_CU")).toBe("VAI_TRO_CU");
  });
});
