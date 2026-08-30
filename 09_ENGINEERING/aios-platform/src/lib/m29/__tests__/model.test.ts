// Ma trận phân quyền M29. Đây là bảng dễ bị sửa "cho tiện" nhất khi thêm trang mới, nên test
// khóa lại đúng những ranh giới mà ETV.P29 mục 4 và DacTa.md mục 4 đặt ra.
import { describe, expect, it } from "vitest";
import { can, PERMS, type M29Role, type PermCategory } from "../model";

const ALL_ROLES = Object.keys(PERMS) as M29Role[];

describe("can — nguyên tắc chung", () => {
  it("không có vai trò M29 thì không đọc được gì", () => {
    const categories: PermCategory[] = ["platforms", "registry", "aia", "governance", "incidents", "unregistered", "audit"];
    for (const c of categories) {
      expect(can(null, c)).toBe(false);
      expect(can(null, c, "write")).toBe(false);
    }
  });

  it("quyền ghi luôn kéo theo quyền đọc, không có vai trò nào ghi được mà không đọc được", () => {
    for (const role of ALL_ROLES) {
      for (const c of Object.keys(PERMS[role]) as PermCategory[]) {
        if (can(role, c, "write")) expect(can(role, c)).toBe(true);
      }
    }
  });
});

describe("Ranh giới không được phép nới", () => {
  it("kiểm toán viên chỉ đọc — không ghi được bất cứ nhóm nào", () => {
    for (const c of Object.keys(PERMS.AI_AUDITOR) as PermCategory[]) {
      expect(can("AI_AUDITOR", c, "write")).toBe(false);
    }
  });

  it("chỉ quản trị an toàn thông tin và quản trị cấp cao chạm được kho bí mật", () => {
    for (const role of ALL_ROLES) {
      const duocPhep = role === "AI_SECURITY_ADMIN" || role === "SUPER_ADMIN";
      expect(can(role, "secrets")).toBe(duocPhep);
      expect(can(role, "secrets", "write")).toBe(duocPhep);
    }
  });

  it("chỉ quản trị an toàn thông tin và quản trị cấp cao sửa được rào chắn/chính sách", () => {
    for (const role of ALL_ROLES) {
      const duocPhep = role === "AI_SECURITY_ADMIN" || role === "SUPER_ADMIN";
      expect(can(role, "governance", "write")).toBe(duocPhep);
    }
  });

  // Vô hiệu hóa/kích hoạt lại bản ghi Provider/Model/Skill đi qua đúng chốt này — nới `registry`
  // cho một vai trò khác là mở luôn đường gỡ bản ghi khỏi danh mục.
  it("chỉ quản trị AI và quản trị cấp cao sửa được danh mục", () => {
    for (const role of ALL_ROLES) {
      const duocPhep = role === "AI_ADMIN" || role === "SUPER_ADMIN";
      expect(can(role, "registry", "write")).toBe(duocPhep);
    }
  });

  it("người xem không ghi được gì", () => {
    for (const c of Object.keys(PERMS.AI_VIEWER) as PermCategory[]) {
      expect(can("AI_VIEWER", c, "write")).toBe(false);
    }
  });

  it("nhật ký kiểm toán không ai ghi được qua ma trận quyền — append-only", () => {
    for (const role of ALL_ROLES) {
      expect(can(role, "audit", "write")).toBe(false);
    }
  });
});

describe("Nhóm quyền thêm ở Increment 4", () => {
  it("người vận hành lập và xử lý được sự cố AI", () => {
    expect(can("AI_OPERATOR", "incidents", "write")).toBe(true);
  });

  it("người xem chỉ đọc được sự cố, không lập được", () => {
    expect(can("AI_VIEWER", "incidents")).toBe(true);
    expect(can("AI_VIEWER", "incidents", "write")).toBe(false);
  });

  it("sổ AI chưa đăng ký: quản trị ghi được, người vận hành chỉ đọc, người xem không thấy", () => {
    expect(can("AI_ADMIN", "unregistered", "write")).toBe(true);
    expect(can("AI_SECURITY_ADMIN", "unregistered", "write")).toBe(true);
    expect(can("AI_OPERATOR", "unregistered")).toBe(true);
    expect(can("AI_OPERATOR", "unregistered", "write")).toBe(false);
    expect(can("AI_VIEWER", "unregistered")).toBe(false);
  });
});
