import { describe, expect, it, vi } from "vitest";
import { trangHaiNhom } from "../phan-trang";

// Giả lập hai "bảng" trong bộ nhớ: hàm lấy nhận (boQua, lay) đúng như `skip`/`take` của Prisma.
function nguon(ds: string[]) {
  return vi.fn(async (boQua: number, lay: number) => ds.slice(boQua, boQua + lay));
}

const DUNG_DUOC = ["A1", "A2", "A3"];
const CON_LAI = ["B1", "B2", "B3", "B4", "B5"];

describe("trangHaiNhom", () => {
  it("trang 1 lấy hết nhóm ưu tiên rồi mới lấp bằng nhóm sau", async () => {
    const dau = nguon(DUNG_DUOC);
    const sau = nguon(CON_LAI);
    // Trang 4 dòng: 3 dòng nhóm đầu + 1 dòng nhóm sau.
    expect(await trangHaiNhom(DUNG_DUOC.length, dau, sau, 0, 4)).toEqual(["A1", "A2", "A3", "B1"]);
    expect(sau).toHaveBeenCalledWith(0, 1);
  });

  it("trang giữa lấy tiếp nhóm sau đúng chỗ đã dừng, không lặp và không nhảy cóc", async () => {
    const dau = nguon(DUNG_DUOC);
    const sau = nguon(CON_LAI);
    // Trang 2 của cỡ trang 4: đã hiện A1–A3 + B1, giờ phải là B2–B5.
    expect(await trangHaiNhom(DUNG_DUOC.length, dau, sau, 4, 4)).toEqual(["B2", "B3", "B4", "B5"]);
    expect(dau).not.toHaveBeenCalled();
  });

  it("nhóm ưu tiên dài hơn một trang thì trang 1 chỉ có nhóm ưu tiên", async () => {
    const dai = ["A1", "A2", "A3", "A4", "A5"];
    const sau = nguon(CON_LAI);
    expect(await trangHaiNhom(dai.length, nguon(dai), sau, 0, 3)).toEqual(["A1", "A2", "A3"]);
    expect(sau).not.toHaveBeenCalled();
  });

  it("không có bản ghi nào đang dùng được thì trang đúng bằng nhóm sau", async () => {
    const dau = nguon([]);
    expect(await trangHaiNhom(0, dau, nguon(CON_LAI), 0, 3)).toEqual(["B1", "B2", "B3"]);
    expect(dau).not.toHaveBeenCalled();
  });

  it("bảng rỗng trả về mảng rỗng", async () => {
    expect(await trangHaiNhom(0, nguon([]), nguon([]), 0, 10)).toEqual([]);
  });
});
