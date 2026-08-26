// Bộ test cho quy tắc yêu cầu cấp tài khoản. Đặc tả:
// _meta/specs/20260824-trang-chu-cong-khai/spec.md (R1–R7).
//
// Ràng buộc đáng giữ nhất ở đây là R1: form công khai không được biến thành đường tạo tài
// khoản. Rule chỉ trả về quyết định "đồng ý cấp / từ chối" — không sinh User, không cấp mật
// khẩu — nên test tập trung vào gate quyền, gate trạng thái và lý do bắt buộc.
import { describe, expect, it } from "vitest";
import {
  PASSWORD_MAX,
  PASSWORD_MIN,
  reviewAccessRequest,
  validateAccessRequest,
} from "../rules";

const VALID = {
  fullName: "Nguyễn Thị H.",
  email: "  NGUYENH@etv.vn ",
  organization: "Phòng Thử nghiệm",
  phone: "0912345678",
  purpose: "Cần lập và trình hồ sơ đảm bảo kết quả thử nghiệm của phòng.",
  password: "MatKhauCuaToi2026",
  passwordConfirm: "MatKhauCuaToi2026",
};

describe("validateAccessRequest", () => {
  it("chuẩn hóa email về chữ thường và cắt khoảng trắng", () => {
    const r = validateAccessRequest(VALID);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.email).toBe("nguyenh@etv.vn");
  });

  it("bắt buộc họ tên, đơn vị và lý do", () => {
    const r = validateAccessRequest({ ...VALID, fullName: " ", organization: "", purpose: "ngắn" });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors.fullName).toBeDefined();
      expect(r.errors.organization).toBeDefined();
      expect(r.errors.purpose).toBeDefined();
    }
  });

  it("từ chối email sai định dạng", () => {
    const r = validateAccessRequest({ ...VALID, email: "khong-phai-email" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.email).toBeDefined();
  });

  it("điện thoại để trống vẫn hợp lệ", () => {
    const r = validateAccessRequest({ ...VALID, phone: "" });
    expect(r.ok).toBe(true);
  });

  it("chặn giá trị vượt giới hạn độ dài", () => {
    const r = validateAccessRequest({ ...VALID, fullName: "a".repeat(200) });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.fullName).toBeDefined();
  });
});

// R7 — mật khẩu do chính người đề nghị đặt. Rule chỉ kiểm, không băm: giá trị trả về vẫn là
// bản rõ để actions.ts băm ngay, nên phải chắc nó đi qua nguyên vẹn (kể cả khoảng trắng).
describe("validateAccessRequest — mật khẩu (R7)", () => {
  it("bắt buộc có mật khẩu và đủ độ dài tối thiểu", () => {
    for (const password of ["", "ngan123"]) {
      const r = validateAccessRequest({ ...VALID, password, passwordConfirm: password });
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.errors.password).toContain(String(PASSWORD_MIN));
    }
  });

  it("chặn mật khẩu vượt trần ký tự", () => {
    const password = `a1${"b".repeat(PASSWORD_MAX)}`;
    const r = validateAccessRequest({ ...VALID, password, passwordConfirm: password });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.password).toBeDefined();
  });

  it("chặn mật khẩu vượt 72 byte dù chưa vượt trần ký tự — bcrypt cắt âm thầm", () => {
    // 30 ký tự tiếng Việt có dấu = 90 byte: dưới PASSWORD_MAX nhưng quá giới hạn của bcrypt.
    const password = `${"ằ".repeat(30)}a1`;
    expect(password.length).toBeLessThanOrEqual(PASSWORD_MAX);
    const r = validateAccessRequest({ ...VALID, password, passwordConfirm: password });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.password).toBeDefined();
  });

  it("đòi có cả chữ và số", () => {
    for (const password of ["matkhaukhongcoso", "123456789012345"]) {
      const r = validateAccessRequest({ ...VALID, password, passwordConfirm: password });
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.errors.password).toBeDefined();
    }
  });

  it("chặn mật khẩu đã lộ công khai trong mã nguồn", () => {
    const password = "DoiMatKhauNgay!2026";
    const r = validateAccessRequest({ ...VALID, password, passwordConfirm: password });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.password).toBeDefined();
  });

  it("chặn mật khẩu chứa tên email của chính mình", () => {
    const password = "Nguyenh2026abcd";
    const r = validateAccessRequest({ ...VALID, password, passwordConfirm: password });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.password).toBeDefined();
  });

  it("nhập lại không khớp thì báo đúng ô nhập lại", () => {
    const r = validateAccessRequest({ ...VALID, passwordConfirm: "MatKhauKhac2026" });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors.password).toBeUndefined();
      expect(r.errors.passwordConfirm).toBeDefined();
    }
  });

  it("không cắt khoảng trắng của mật khẩu — băm phải đúng chuỗi người dùng gõ", () => {
    const password = "  MatKhau2026 co dau cach  ";
    const r = validateAccessRequest({ ...VALID, password, passwordConfirm: password });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.password).toBe(password);
  });
});

describe("reviewAccessRequest", () => {
  const pending = { status: "PENDING" as const };
  const admin = { role: "ADMIN" as const };

  // R6
  it("chặn người không phải Quản trị hệ thống", () => {
    for (const role of ["MEMBER", "VIEWER"] as const) {
      const r = reviewAccessRequest(pending, { role }, "APPROVED", "");
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.code).toBe("FORBIDDEN");
    }
  });

  // R4
  it("chỉ xử lý được yêu cầu đang chờ", () => {
    for (const status of ["APPROVED", "REJECTED"] as const) {
      const r = reviewAccessRequest({ status }, admin, "APPROVED", "");
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.code).toBe("BAD_STATE");
    }
  });

  // R5
  it("từ chối bắt buộc có lý do", () => {
    const r = reviewAccessRequest(pending, admin, "REJECTED", "   ");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("REASON_REQUIRED");
  });

  it("từ chối kèm lý do thì hợp lệ", () => {
    const r = reviewAccessRequest(pending, admin, "REJECTED", "Không thuộc diện được cấp.");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.status).toBe("REJECTED");
      expect(r.reviewNote).toBe("Không thuộc diện được cấp.");
    }
  });

  it("đồng ý cấp không bắt buộc ghi chú", () => {
    const r = reviewAccessRequest(pending, admin, "APPROVED", "");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.status).toBe("APPROVED");
      expect(r.reviewNote).toBeNull();
    }
  });

  it("chặn ghi chú vượt giới hạn độ dài", () => {
    const r = reviewAccessRequest(pending, admin, "APPROVED", "x".repeat(1200));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("NOTE_TOO_LONG");
  });
});
