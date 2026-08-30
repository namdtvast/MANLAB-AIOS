// Kiểm thử bản xuất biểu mẫu F03.01 — Prisma được giả lập nên không cần Postgres lẫn Chromium.
//
// Bốn thứ dễ hỏng âm thầm mà test này khoá lại:
//   1. Metadata lấy từ danh sách biểu mẫu của module, không viết cứng trong template.
//   2. Biểu mẫu không nằm trong danh sách áp dụng thì phải báo lỗi, không im lặng in tờ thiếu mã.
//   3. Dữ liệu người dùng phải được escape trước khi ghép vào HTML.
//   4. Trường chưa số hoá phải in ra ô trống để điền tay, KHÔNG được biến mất khỏi biểu mẫu.
import { describe, expect, it, vi } from "vitest";
import { formDocument } from "@/lib/forms/layout";
import {
  F03_01_FORM_CODE,
  f0301FileName,
  renderF0301Sheet,
  type F0301Employee,
} from "@/lib/m03/forms/f03-01";

// Đúng hình dạng seed nạp vào PlatformModule.forms từ frontmatter biểu mẫu gốc.
const FORMS_M03 = [
  {
    code: "ETV.P.F03.01",
    title: "Sơ yếu lý lịch",
    path: "06_SHARED_RESOURCES/01_Forms/F03_NhanSu/ETV.P.F03.01_SoYeuLyLich.md",
    revision: "03",
    effectiveDate: "20/07/2026",
  },
  { code: "ETV.P.F03.02", title: "Bản mô tả công việc", path: null, revision: "02", effectiveDate: "01/01/2026" },
];

const prismaMock = { platformModule: { findUnique: vi.fn() } };
vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));

const { getFormMeta } = await import("@/lib/forms/meta");

prismaMock.platformModule.findUnique.mockResolvedValue({ forms: FORMS_M03 });
const meta = await getFormMeta("M03", F03_01_FORM_CODE);

const bich: F0301Employee = {
  code: "NS-2026-0002",
  fullName: "Trần Thị Bích",
  position: "Nhân viên hành chính",
  department: "Văn phòng",
  employmentType: "THUVIEC",
  status: "CHINHTHUC",
  hireDate: new Date("2026-06-01T00:00:00Z"),
  laborContracts: [],
};

describe("getFormMeta", () => {
  it("lấy đúng metadata biểu mẫu từ danh sách biểu mẫu của module", () => {
    expect(meta.code).toBe("ETV.P.F03.01");
    expect(meta.title).toBe("Sơ yếu lý lịch");
    expect(meta.revision).toBe("03");
    expect(meta.effectiveDate).toBe("20/07/2026");
  });

  it("báo lỗi khi biểu mẫu không nằm trong danh sách áp dụng của module", async () => {
    prismaMock.platformModule.findUnique.mockResolvedValueOnce({ forms: FORMS_M03 });
    await expect(getFormMeta("M03", "ETV.P.F99.99")).rejects.toThrow(/không nằm trong danh sách/);
  });

  it("báo lỗi khi module chưa được nạp", async () => {
    prismaMock.platformModule.findUnique.mockResolvedValueOnce(null);
    await expect(getFormMeta("M99", F03_01_FORM_CODE)).rejects.toThrow(/Chưa nạp module/);
  });
});

describe("renderF0301Sheet", () => {
  const html = renderF0301Sheet(bich, meta);

  it("điền các trường đã số hoá", () => {
    expect(html).toContain("Trần Thị Bích");
    expect(html).toContain("NS-2026-0002");
    expect(html).toContain("Nhân viên hành chính");
    expect(html).toContain("01/06/2026"); // ngày tiếp nhận
  });

  it("in đủ 6 mục của biểu mẫu gốc", () => {
    for (const section of [
      "I. Thông tin cá nhân",
      "II. Trình độ",
      "III. Quá trình đào tạo, công tác",
      "IV. Quan hệ gia đình",
      "V. Vị trí công tác tại ETV",
      "VI. Cam kết",
    ]) {
      expect(html).toContain(section);
    }
  });

  it("giữ nguyên các trường chưa số hoá dưới dạng ô trống điền tay", () => {
    for (const label of ["Ngày tháng năm sinh", "Căn cước công dân", "Nguyên quán"]) {
      expect(html).toContain(label);
    }
    expect(html).toContain('class="blank"');
  });

  it("in mã số và ngày ban hành lấy từ metadata, không viết cứng trong template", () => {
    expect(html).toContain(meta.code);
    expect(html).toContain(meta.effectiveDate);
  });

  it("escape dữ liệu người dùng để không chèn được thẻ HTML", () => {
    const hiem = renderF0301Sheet(
      { ...bich, fullName: '<script>alert("x")</script>' },
      meta,
    );
    expect(hiem).not.toContain("<script>alert");
    expect(hiem).toContain("&lt;script&gt;");
  });

  it("chưa có hợp đồng lao động thì để ô trống, có thì in loại và ngày hiệu lực", () => {
    expect(renderF0301Sheet(bich, meta)).toContain("Loại hợp đồng hiện tại");

    const coHopDong = renderF0301Sheet(
      {
        ...bich,
        laborContracts: [
          {
            contractType: "KHONGTHOIHAN",
            status: "ACTIVE",
            effectiveDate: new Date("2026-07-01T00:00:00Z"),
          },
        ],
      },
      meta,
    );
    expect(coHopDong).toContain("Không thời hạn (từ 01/07/2026)");
  });

  it("ưu tiên hợp đồng đang hiệu lực khi nhân sự có nhiều hợp đồng", () => {
    const nhieuHopDong = renderF0301Sheet(
      {
        ...bich,
        laborContracts: [
          { contractType: "THUVIEC", status: "EXPIRED", effectiveDate: new Date("2026-06-01T00:00:00Z") },
          { contractType: "KHONGTHOIHAN", status: "ACTIVE", effectiveDate: new Date("2026-09-01T00:00:00Z") },
        ],
      },
      meta,
    );
    expect(nhieuHopDong).toContain("Không thời hạn (từ 01/09/2026)");
    expect(nhieuHopDong).not.toContain("Thử việc (từ 01/06/2026)");
  });
});

describe("f0301FileName", () => {
  it("bỏ dấu tiếng Việt và giữ mã nhân sự trong tên file", () => {
    expect(f0301FileName(bich, meta)).toBe("F03.01_SoYeuLyLich_NS-2026-0002_TranThiBich.pdf");
  });

  it("xử lý được chữ Đ/đ", () => {
    expect(f0301FileName({ ...bich, fullName: "Đỗ Văn Đức" }, meta)).toContain("DoVanDuc");
  });
});

describe("formDocument", () => {
  it("mỗi nhân sự một tờ riêng, ngắt trang giữa các tờ", () => {
    const doc = formDocument(meta.title, [
      renderF0301Sheet(bich, meta),
      renderF0301Sheet({ ...bich, code: "NS-2026-0003", fullName: "Nguyễn Văn An" }, meta),
    ]);
    expect(doc.match(/class="sheet"/g)).toHaveLength(2);
    expect(doc).toContain("page-break-after: always");
    expect(doc).toContain("Trần Thị Bích");
    expect(doc).toContain("Nguyễn Văn An");
  });
});
