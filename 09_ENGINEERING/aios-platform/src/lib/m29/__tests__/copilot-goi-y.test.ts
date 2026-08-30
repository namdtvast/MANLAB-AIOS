// Gợi ý câu hỏi sinh từ DỮ LIỆU THẬT, không viết cứng. Test khoá hai điều dễ hỏng:
//   (1) gợi ý tiếp theo chỉ được trỏ tới tài liệu ĐÃ ĐƯỢC DẪN — gợi ý bịa ra một mã thủ tục không
//       tồn tại là đúng thứ cả hệ thống này đang chống;
//   (2) lượt bị từ chối KHÔNG sinh gợi ý — không có căn cứ thì không có gì để đi tiếp.
import { describe, expect, it } from "vitest";
import { GOI_Y_CHUNG, goiYTheoModule, goiYTiepTheo, maModuleTuDuongDan, maTaiLieuTuDuongDan } from "../copilot/goi-y";

describe("maModuleTuDuongDan", () => {
  it("nhận ra module từ trang module và trang con của nó", () => {
    expect(maModuleTuDuongDan("/modules/M13")).toBe("M13");
    expect(maModuleTuDuongDan("/modules/M29/traces")).toBe("M29");
    expect(maModuleTuDuongDan("/modules/M03/incidents/abc")).toBe("M03");
  });

  it("trả null ngoài trang module", () => {
    for (const p of ["/dashboard", "/", "/admin/access-requests", null]) expect(maModuleTuDuongDan(p)).toBeNull();
  });

  it("không nhận nhầm chuỗi giống mã module", () => {
    expect(maModuleTuDuongDan("/modules/M1")).toBeNull();
    expect(maModuleTuDuongDan("/modulesM13")).toBeNull();
  });
});

describe("goiYTheoModule", () => {
  // Chỉ mục thật của Copilot chỉ chứa tài liệu ĐÃ PHÊ DUYỆT — dựng đúng một tập như vậy để test
  // phân biệt được "module khai docId" với "thủ tục đó tra cứu được".
  const trongChiMuc = new Set(["ETV.P13", "ETV.P14"]);

  it("ngoài trang module thì dùng gợi ý chung", () => {
    expect(goiYTheoModule(null, trongChiMuc)).toEqual(GOI_Y_CHUNG);
  });

  it("module có thủ tục đã ban hành: gợi ý bám mã thủ tục và tên thật", () => {
    const g = goiYTheoModule({ code: "M13", name: "Kiểm soát công việc không phù hợp", docId: "ETV.P13" }, trongChiMuc);
    expect(g).toHaveLength(3);
    expect(g[0]).toContain("ETV.P13");
    expect(g[1]).toContain("Kiểm soát công việc không phù hợp");
    expect(g.join(" ")).not.toContain("undefined");
  });

  it("module CHƯA ban hành thủ tục: không bịa ra mã thủ tục", () => {
    const g = goiYTheoModule({ code: "M34", name: "Dữ liệu chủ", docId: null }, trongChiMuc);
    expect(g.join(" ")).not.toMatch(/ETV\.P/);
    expect(g[0]).toContain("M34");
  });

  // Ca đã gây lỗi thật: M29 khai docId = ETV.P29, nhưng ETV.P29 đang ở trạng thái Cho-soat-xet nên
  // script nạp chỉ mục bỏ qua. Gợi ý cũ mời hỏi "Thủ tục ETV.P29 quy định những gì?" và gateway
  // trả về "Không tìm thấy căn cứ trong hệ thống tài liệu của Viện.".
  it("module khai docId nhưng thủ tục KHÔNG có trong chỉ mục: không mời hỏi mã đó", () => {
    const g = goiYTheoModule({ code: "M29", name: "Quản lý hệ thống trí tuệ nhân tạo", docId: "ETV.P29" }, trongChiMuc);
    expect(g.join(" ")).not.toContain("ETV.P29");
    expect(g[0]).toContain("M29");
  });

  it("chỉ mục rỗng thì không gợi ý câu nào bám mã thủ tục", () => {
    const g = goiYTheoModule({ code: "M13", name: "Kiểm soát công việc không phù hợp", docId: "ETV.P13" }, new Set());
    expect(g.join(" ")).not.toMatch(/ETV\.P/);
  });
});

describe("maTaiLieuTuDuongDan", () => {
  it("rút được mã thủ tục, sổ tay và biểu mẫu", () => {
    expect(maTaiLieuTuDuongDan("03_MANAGEMENT_SYSTEM/02_P/ETV.P13_KhacPhuc.md")).toBe("ETV.P13");
    expect(maTaiLieuTuDuongDan("06_SHARED_RESOURCES/01_Forms/F02_BaoMat/ETV.P.F02.05_ChinhSachBaoMat_Website.md")).toBe("ETV.P.F02.05");
    expect(maTaiLieuTuDuongDan("03_MANAGEMENT_SYSTEM/01_QM/ETV.QM_QuanlyChatluong.md")).toBe("ETV.QM");
  });

  it("trả null với đường dẫn không mang mã tài liệu", () => {
    expect(maTaiLieuTuDuongDan("05_MODULE_LIBRARY/M10_DamBaoKQ/README.md")).toBeNull();
  });
});

describe("goiYTiepTheo", () => {
  const dan = (...p: string[]) => p.map((path) => ({ path }));

  it("sinh gợi ý bám đúng mã tài liệu vừa được dẫn", () => {
    const g = goiYTiepTheo(dan("03_MANAGEMENT_SYSTEM/02_P/ETV.P13_KhacPhuc.md"));
    expect(g.length).toBeGreaterThan(0);
    for (const q of g) expect(q).toContain("ETV.P13");
  });

  // Ranh giới quan trọng nhất: gợi ý KHÔNG được trỏ tới tài liệu chưa hề xuất hiện.
  it("không sinh gợi ý về tài liệu nào khác ngoài nguồn đã dẫn", () => {
    const g = goiYTiepTheo(dan("03_MANAGEMENT_SYSTEM/02_P/ETV.P14_KiemSoatTaiLieu.md"));
    expect(g.join(" ")).not.toContain("ETV.P13");
  });

  it("lượt bị từ chối (không trích dẫn) thì KHÔNG gợi ý gì", () => {
    expect(goiYTiepTheo([])).toEqual([]);
  });

  it("đường dẫn không mang mã tài liệu cũng không sinh gợi ý bịa", () => {
    expect(goiYTiepTheo(dan("05_MODULE_LIBRARY/M10_DamBaoKQ/README.md"))).toEqual([]);
  });

  it("không lặp lại câu người dùng đã hỏi", () => {
    const daHoi = ["ETV.P13 dùng những biểu mẫu nào?"];
    const g = goiYTiepTheo(dan("03_MANAGEMENT_SYSTEM/02_P/ETV.P13_KhacPhuc.md"), daHoi);
    expect(g).not.toContain("ETV.P13 dùng những biểu mẫu nào?");
    expect(g.length).toBeGreaterThan(0);
  });

  it("giới hạn tối đa 3 gợi ý dù có nhiều nguồn", () => {
    const g = goiYTiepTheo(
      dan(
        "03_MANAGEMENT_SYSTEM/02_P/ETV.P13_KhacPhuc.md",
        "03_MANAGEMENT_SYSTEM/02_P/ETV.P14_KiemSoatTaiLieu.md",
        "03_MANAGEMENT_SYSTEM/01_QM/ETV.QM_QuanlyChatluong.md"
      )
    );
    expect(g.length).toBeLessThanOrEqual(3);
  });

  it("gộp trùng khi nhiều đoạn cùng một tài liệu", () => {
    const g = goiYTiepTheo(dan("03_MANAGEMENT_SYSTEM/02_P/ETV.P13_KhacPhuc.md", "03_MANAGEMENT_SYSTEM/02_P/ETV.P13_KhacPhuc.md"));
    expect(new Set(g).size).toBe(g.length);
  });
});
