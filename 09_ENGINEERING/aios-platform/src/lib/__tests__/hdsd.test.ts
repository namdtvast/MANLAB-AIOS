// Bộ test cho parseHdsd — cổng kiểm tra duy nhất giữa file HDSD.yaml soạn tay trong
// 05_MODULE_LIBRARY và dữ liệu nạp vào PlatformModule.hdsd. Mỗi nhóm test canh một lỗi
// soạn thảo có thật: chép file của module khác, đổi lược đồ, để bước rỗng, trỏ path sang
// module khác. Sai lược đồ phải NÉM LỖI để seed dừng, không nạp hướng dẫn cụt.
import { describe, expect, it } from "vitest";
import { HDSD_SCHEMA, parseHdsd } from "@/lib/hdsd";

const hopLe = {
  schema: HDSD_SCHEMA,
  module: "M25",
  summary: "Xem xét bối cảnh định kỳ hằng năm",
  steps: [
    { role: "QLCL", action: "Lập kỳ xem xét", path: "/modules/M25/review/new", note: "Kỳ đột xuất phải ghi sự kiện." },
    { role: "TP", action: "Soát xét" },
  ],
  tips: ["Người lập không được tự soát xét."],
};

describe("parseHdsd — file hợp lệ", () => {
  it("chuẩn hóa đủ 3 khối summary/steps/tips", () => {
    const h = parseHdsd(hopLe, "M25");
    expect(h.summary).toBe("Xem xét bối cảnh định kỳ hằng năm");
    expect(h.steps).toHaveLength(2);
    expect(h.steps[0]).toEqual({
      role: "QLCL",
      action: "Lập kỳ xem xét",
      path: "/modules/M25/review/new",
      note: "Kỳ đột xuất phải ghi sự kiện.",
    });
    expect(h.tips).toEqual(["Người lập không được tự soát xét."]);
  });

  it("bước thiếu path/note trả về null chứ không undefined (JSON trong DB)", () => {
    const h = parseHdsd(hopLe, "M25");
    expect(h.steps[1].path).toBeNull();
    expect(h.steps[1].note).toBeNull();
  });

  it("thiếu summary/tips vẫn hợp lệ", () => {
    const h = parseHdsd({ schema: HDSD_SCHEMA, module: "M10", steps: [{ role: "NTH", action: "Tạo hồ sơ" }] }, "M10");
    expect(h.summary).toBeNull();
    expect(h.tips).toEqual([]);
  });
});

describe("parseHdsd — chặn lỗi soạn thảo", () => {
  it("sai lược đồ", () => {
    expect(() => parseHdsd({ ...hopLe, schema: "manlab-aios/hdsd@0.9" }, "M25")).toThrow(/schema/);
  });

  it("chép file của module khác mà quên sửa mã module", () => {
    expect(() => parseHdsd(hopLe, "M26")).toThrow(/M26/);
  });

  it("không có bước nào", () => {
    expect(() => parseHdsd({ ...hopLe, steps: [] }, "M25")).toThrow(/steps/);
  });

  it("bước thiếu role hoặc action", () => {
    expect(() => parseHdsd({ ...hopLe, steps: [{ action: "Lập kỳ" }] }, "M25")).toThrow(/role.*bước 1/);
    expect(() => parseHdsd({ ...hopLe, steps: [{ role: "QLCL", action: "  " }] }, "M25")).toThrow(/action.*bước 1/);
  });

  it("path trỏ sang module khác", () => {
    expect(() =>
      parseHdsd({ ...hopLe, steps: [{ role: "QLCL", action: "Lập kỳ", path: "/modules/M01/new" }] }, "M25"),
    ).toThrow(/\/modules\/M25/);
  });

  it("file rỗng hoặc không phải khối khóa–giá trị", () => {
    expect(() => parseHdsd("HDSD", "M25")).toThrow();
    expect(() => parseHdsd([], "M25")).toThrow();
  });
});
