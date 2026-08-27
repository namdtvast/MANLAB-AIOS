// Bộ chuyển tài khoản trên header là một đường đăng nhập KHÔNG dùng mật khẩu, nên ba lớp
// chặn của nó phải được canh bằng test chứ không chỉ bằng nhận xét trong mã:
//   1. Cần gạt DEMO_ACCOUNT_SWITCH tắt → không có tài khoản nào đổi được, kể cả tài khoản demo.
//   2. Cờ demoAccount → tài khoản người thật không bao giờ là nguồn hay đích của lượt đổi.
//   3. Vé HMAC → email không kèm vé đúng hạn, đúng chữ ký thì provider không cấp phiên.
// Mỗi test dưới đây tương ứng một cách bịt lỗ "ai gọi tới endpoint cũng thành ADMIN".
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const prismaMock = {
  user: { findMany: vi.fn(), findUnique: vi.fn() },
};

vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));

const {
  danhSachTaiKhoanDemo,
  doiTaiKhoanBat,
  duocDoiTaiKhoan,
  taiKhoanDemoTheoEmail,
  taoVe,
  veHetHan,
  veHopLe,
} = await import("../doi-tai-khoan");

const MOI_TRUONG_GOC = { ...process.env };

beforeEach(() => {
  vi.clearAllMocks();
  process.env.AUTH_SECRET = "bi-mat-chi-de-chay-test";
  process.env.DEMO_ACCOUNT_SWITCH = "true";
});

afterEach(() => {
  vi.useRealTimers();
  process.env = { ...MOI_TRUONG_GOC };
});

describe("cần gạt DEMO_ACCOUNT_SWITCH", () => {
  it("mặc định (không đặt biến) là TẮT", () => {
    delete process.env.DEMO_ACCOUNT_SWITCH;
    expect(doiTaiKhoanBat()).toBe(false);
  });

  it('chỉ đúng chữ "true" mới bật — "1"/"yes" không tính', () => {
    process.env.DEMO_ACCOUNT_SWITCH = "1";
    expect(doiTaiKhoanBat()).toBe(false);
    process.env.DEMO_ACCOUNT_SWITCH = "true";
    expect(doiTaiKhoanBat()).toBe(true);
  });

  it("tắt thì không truy vấn database và trả danh sách rỗng", async () => {
    process.env.DEMO_ACCOUNT_SWITCH = "false";
    expect(await danhSachTaiKhoanDemo()).toEqual([]);
    expect(prismaMock.user.findMany).not.toHaveBeenCalled();
  });

  it("tắt thì tài khoản demo cũng không đổi được và không nhận được lượt đổi", async () => {
    process.env.DEMO_ACCOUNT_SWITCH = "false";
    expect(await duocDoiTaiKhoan("u1")).toBe(false);
    expect(await taiKhoanDemoTheoEmail("ldv@manlab.vn")).toBeNull();
    expect(prismaMock.user.findUnique).not.toHaveBeenCalled();
  });
});

describe("cờ demoAccount", () => {
  it("chỉ lấy tài khoản demo vào danh sách", async () => {
    prismaMock.user.findMany.mockResolvedValue([
      { id: "u1", email: "ldv@manlab.vn", name: "Lê Văn V. (LĐV)", role: "MEMBER", moduleRoles: [{ moduleCode: "M10", role: "LDV" }] },
    ]);
    const ds = await danhSachTaiKhoanDemo();
    expect(prismaMock.user.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { demoAccount: true } })
    );
    expect(ds[0].vaiTro).toEqual([{ role: "LDV", moduleCodes: ["M10"] }]);
  });

  it("tài khoản người thật không được phép mở bộ chuyển", async () => {
    prismaMock.user.findUnique.mockResolvedValue({ demoAccount: false });
    expect(await duocDoiTaiKhoan("u-that")).toBe(false);
  });

  it("tài khoản người thật không nhận được lượt đổi dù vé hợp lệ", async () => {
    prismaMock.user.findUnique.mockResolvedValue({ id: "u-that", email: "nguoithat@etv.org.vn", demoAccount: false });
    expect(await taiKhoanDemoTheoEmail("nguoithat@etv.org.vn")).toBeNull();
  });

  it("chưa đăng nhập thì không có gì để đổi", async () => {
    expect(await duocDoiTaiKhoan(undefined)).toBe(false);
  });
});

describe("vé HMAC", () => {
  it("vé do server phát ra thì hợp lệ", () => {
    const email = "ldp@manlab.vn";
    expect(veHopLe(email, taoVe(email, veHetHan()))).toBe(true);
  });

  it("vé của email này không dùng được cho email khác", () => {
    const ve = taoVe("nth@manlab.vn", veHetHan());
    expect(veHopLe("admin@manlab.vn", ve)).toBe(false);
  });

  it("hết hạn thì không dùng lại được", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-27T09:00:00.000Z"));
    const ve = taoVe("ldv@manlab.vn", veHetHan());
    vi.setSystemTime(new Date("2026-08-27T09:02:00.000Z"));
    expect(veHopLe("ldv@manlab.vn", ve)).toBe(false);
  });

  it("tự nới hạn trong chuỗi vé không qua được chữ ký", () => {
    const email = "ldv@manlab.vn";
    const [, chuKy] = taoVe(email, veHetHan()).split(".");
    expect(veHopLe(email, `${Date.now() + 3_600_000}.${chuKy}`)).toBe(false);
  });

  it("vé rỗng, sai định dạng hoặc chữ ký khác độ dài đều bị từ chối", () => {
    const email = "ldv@manlab.vn";
    expect(veHopLe(email, "")).toBe(false);
    expect(veHopLe(email, "khong-phai-ve")).toBe(false);
    expect(veHopLe(email, `${Date.now() + 1000}.abcd`)).toBe(false);
  });

  it("đổi AUTH_SECRET làm mọi vé cũ mất hiệu lực", () => {
    const email = "ldv@manlab.vn";
    const ve = taoVe(email, veHetHan());
    process.env.AUTH_SECRET = "bi-mat-khac";
    expect(veHopLe(email, ve)).toBe(false);
  });
});

describe("gom vai trò module", () => {
  it("gom theo mã vai trò, vai trò phủ nhiều module nhất đứng trước", async () => {
    // Đúng hình dạng dữ liệu thật của ldp@manlab.vn: một người mang nhiều mã vai trò khác nhau.
    prismaMock.user.findMany.mockResolvedValue([
      {
        id: "u1",
        email: "ldp@manlab.vn",
        name: "Trần Thị Hoa (LĐP)",
        role: "MEMBER",
        moduleRoles: [
          { moduleCode: "M02", role: "TP" },
          { moduleCode: "M03", role: "TP" },
          { moduleCode: "M10", role: "LDP" },
          { moduleCode: "M14", role: "LDP" },
          { moduleCode: "M12", role: "PHUTRACH" },
          { moduleCode: "M25", role: "TP" },
        ],
      },
    ]);
    const [u] = await danhSachTaiKhoanDemo();
    expect(u.vaiTro).toEqual([
      { role: "TP", moduleCodes: ["M02", "M03", "M25"] },
      { role: "LDP", moduleCodes: ["M10", "M14"] },
      { role: "PHUTRACH", moduleCodes: ["M12"] },
    ]);
  });

  it("tài khoản chưa gán vai trò module nào vẫn vào danh sách", async () => {
    prismaMock.user.findMany.mockResolvedValue([
      { id: "u1", email: "admin@manlab.vn", name: "Quản trị viên (demo)", role: "ADMIN", moduleRoles: [] },
    ]);
    const [u] = await danhSachTaiKhoanDemo();
    expect(u.vaiTro).toEqual([]);
    expect(u.role).toBe("ADMIN");
  });
});
