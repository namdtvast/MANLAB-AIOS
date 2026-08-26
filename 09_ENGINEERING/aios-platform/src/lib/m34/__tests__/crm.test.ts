import { describe, expect, it } from "vitest";
import { validateParty } from "../crm";

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
});
