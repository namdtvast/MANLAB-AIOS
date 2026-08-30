// Kiểm thử bản xuất biểu mẫu F03.08 (Danh sách nhân sự) — biểu mẫu TỔNG HỢP, khác F03.01 là
// hồ sơ cá nhân. Prisma giả lập nên không cần Postgres lẫn Chromium.
//
// Bốn thứ test này khoá lại:
//   1. Đủ 11 cột đúng thứ tự biểu mẫu gốc, kể cả cột chưa số hoá (Ngày sinh, Ghi chú).
//   2. Ô tick trạng thái đánh dấu đúng một ô theo dữ liệu, hai ô còn lại để trống.
//   3. Danh sách rỗng vẫn ra biểu mẫu hợp lệ, không vỡ bảng.
//   4. Tài liệu phải là khổ ngang — bảng 11 cột ép vào khổ dọc là không đọc được.
import { describe, expect, it, vi } from "vitest";
import { formDocument } from "@/lib/forms/layout";
import { F03_08_FORM_CODE, f0308FileName, renderF0308Sheet, type F0308Employee } from "@/lib/m03/forms/f03-08";

const FORMS_M03 = [
  {
    code: "ETV.P.F03.08",
    title: "Danh sách nhân sự",
    path: "06_SHARED_RESOURCES/01_Forms/F03_NhanSu/ETV.P.F03.08_DanhSachNhanSu.md",
    revision: "03",
    effectiveDate: "20/07/2026",
  },
];

const prismaMock = { platformModule: { findUnique: vi.fn() } };
vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));

const { getFormMeta } = await import("@/lib/forms/meta");
prismaMock.platformModule.findUnique.mockResolvedValue({ forms: FORMS_M03 });
const meta = await getFormMeta("M03", F03_08_FORM_CODE);

const bich: F0308Employee = {
  code: "NS-2026-0002",
  fullName: "Trần Thị Bích",
  position: "Nhân viên hành chính",
  department: "Văn phòng",
  status: "CHINHTHUC",
  laborContracts: [],
};

const an: F0308Employee = {
  code: "NS-2026-0001",
  fullName: "Nguyễn Văn An",
  position: "Kỹ thuật viên hiệu chuẩn",
  department: "Phòng Đo lường Chất lượng",
  status: "DANGHIVIEC",
  laborContracts: [
    {
      contractType: "THOIVU",
      status: "TERMINATED",
      effectiveDate: new Date("2026-02-01T00:00:00Z"),
      expiryDate: new Date("2027-01-31T00:00:00Z"),
    },
  ],
};

describe("renderF0308Sheet", () => {
  const html = renderF0308Sheet([bich, an], meta);

  it("in đủ 11 cột đúng thứ tự biểu mẫu gốc", () => {
    const headers = [...html.matchAll(/<th[^>]*>([^<]+)<\/th>/g)].map((m) => m[1]);
    expect(headers).toEqual([
      "TT",
      "Mã NV",
      "Họ và tên",
      "Ngày sinh",
      "Bộ phận",
      "Chức vụ",
      "Loại hợp đồng",
      "Ngày bắt đầu HĐ",
      "Ngày kết thúc HĐ",
      "Trạng thái",
      "Ghi chú",
    ]);
  });

  it("đánh số thứ tự và điền dữ liệu từng nhân sự", () => {
    expect(html).toContain("Trần Thị Bích");
    expect(html).toContain("NS-2026-0002");
    expect(html).toContain("Nguyễn Văn An");
    expect(html).toContain('<td class="num">1</td>');
    expect(html).toContain('<td class="num">2</td>');
  });

  it("in loại hợp đồng cùng ngày bắt đầu và ngày kết thúc", () => {
    expect(html).toContain("Có thời hạn");
    expect(html).toContain("01/02/2026");
    expect(html).toContain("31/01/2027");
  });

  it("tick đúng một ô trạng thái, hai ô còn lại để trống", () => {
    const chinhThuc = renderF0308Sheet([bich], meta);
    expect(chinhThuc).toContain("☑ Chính thức");
    expect(chinhThuc).toContain("☐ Thử việc");
    expect(chinhThuc).toContain("☐ Đã nghỉ");

    const daNghi = renderF0308Sheet([an], meta);
    expect(daNghi).toContain("☑ Đã nghỉ");
    expect(daNghi).toContain("☐ Chính thức");
  });

  it("giữ nguyên cột chưa số hoá và ghi rõ ở chân biểu mẫu", () => {
    expect(html).toContain("Ngày sinh");
    expect(html).toContain("Ghi chú");
    expect(html).toContain("chưa được số hoá");
  });

  it("danh sách rỗng vẫn ra biểu mẫu hợp lệ", () => {
    const rong = renderF0308Sheet([], meta);
    expect(rong).toContain("Không có nhân sự nào trong danh sách");
    expect(rong).toContain(meta.code);
  });

  it("escape dữ liệu người dùng để không chèn được thẻ HTML", () => {
    const hiem = renderF0308Sheet([{ ...bich, fullName: '<script>alert("x")</script>' }], meta);
    expect(hiem).not.toContain("<script>alert");
    expect(hiem).toContain("&lt;script&gt;");
  });

  it("in mã số và ngày ban hành lấy từ metadata, không viết cứng trong template", () => {
    expect(html).toContain(meta.code);
    expect(html).toContain(meta.effectiveDate);
  });
});

describe("f0308FileName", () => {
  it("ghi số lượng nhân sự vào tên file", () => {
    expect(f0308FileName(3, meta)).toBe("F03.08_DanhSachNhanSu_3NhanSu.pdf");
  });
});

describe("khổ giấy", () => {
  it("F03.08 phải là khổ ngang — bảng 11 cột không đọc được ở khổ dọc", () => {
    const doc = formDocument(meta.title, [renderF0308Sheet([bich], meta)], { landscape: true });
    expect(doc).toContain("size: A4 landscape");
    expect(doc).not.toContain("size: A4 portrait");
  });

  it("mặc định vẫn là khổ dọc (F03.01 và các biểu mẫu hồ sơ khác)", () => {
    expect(formDocument("x", ["<p>y</p>"])).toContain("size: A4 portrait");
  });

  it("đầu bảng lặp lại mỗi trang khi danh sách tràn sang trang sau", () => {
    const doc = formDocument(meta.title, [renderF0308Sheet([bich], meta)], { landscape: true });
    expect(doc).toContain("table.list thead { display: table-header-group; }");
  });
});
