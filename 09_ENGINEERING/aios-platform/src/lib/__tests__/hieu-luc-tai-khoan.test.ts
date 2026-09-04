// Lớp chặn đăng nhập của tài khoản đã bị tạm khóa/thu hồi (ETV.P28 §6.7.1).
// Hàm này quyết định cả việc cấp phiên mới lẫn việc cắt phiên đang mở, nên hai hành vi dễ trôi
// nhất phải có test canh: "chỉ DANG_HOAT_DONG mới được đi tiếp" và "lỗi database thì fail-open".
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const prismaMock = { user: { findUnique: vi.fn() } };
vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));

const { taiKhoanConHieuLuc } = await import("../hieu-luc-tai-khoan");

beforeEach(() => vi.clearAllMocks());
afterEach(() => vi.restoreAllMocks());

describe("hiệu lực đăng nhập theo trạng thái tài khoản", () => {
  it("chỉ tài khoản đang hoạt động mới còn hiệu lực", async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce({ accountStatus: "DANG_HOAT_DONG" });
    await expect(taiKhoanConHieuLuc("u1")).resolves.toBe(true);

    prismaMock.user.findUnique.mockResolvedValueOnce({ accountStatus: "TAM_KHOA" });
    await expect(taiKhoanConHieuLuc("u1")).resolves.toBe(false);

    prismaMock.user.findUnique.mockResolvedValueOnce({ accountStatus: "DA_THU_HOI" });
    await expect(taiKhoanConHieuLuc("u1")).resolves.toBe(false);
  });

  it("không còn bản ghi User ⇒ hết hiệu lực, cookie còn hạn cũng không cứu được", async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(null);
    await expect(taiKhoanConHieuLuc("u-da-xoa")).resolves.toBe(false);
  });

  it("lỗi database ⇒ fail-open có chủ đích, kèm log lỗi", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    prismaMock.user.findUnique.mockRejectedValueOnce(new Error("mất kết nối"));
    await expect(taiKhoanConHieuLuc("u1")).resolves.toBe(true);
    expect(log).toHaveBeenCalled();
  });
});
