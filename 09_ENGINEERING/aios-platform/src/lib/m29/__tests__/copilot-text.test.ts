// Chuẩn hóa văn bản dùng CHUNG giữa script nạp chỉ mục và hàm truy hồi. Hai bên lệch nhau thì
// chỉ mục không bao giờ khớp truy vấn, mà lỗi đó không biểu hiện thành exception — chỉ thành
// "Copilot lúc nào cũng nói không tìm thấy". Test khóa lại hành vi chuẩn hóa.
import { describe, expect, it } from "vitest";
import { keywords, maModuleTrongCauHoi, maTaiLieuTrongCauHoi, normalize, tachTuChoChiMuc, tsQuery } from "../copilot/text";

describe("normalize", () => {
  it("bỏ dấu tiếng Việt và hạ chữ thường", () => {
    expect(normalize("Kiểm Định")).toBe("kiem dinh");
    expect(normalize("ĐẢM BẢO giá trị")).toBe("dam bao gia tri");
    expect(normalize("Thủ tục ETV.P13")).toBe("thu tuc etv.p13");
  });

  it("giữ nguyên chuỗi không dấu", () => {
    expect(normalize("ISO/IEC 17025:2017")).toBe("iso/iec 17025:2017");
  });
});

describe("keywords", () => {
  it("bỏ từ nối và từ 1 ký tự, không lặp từ", () => {
    expect(keywords("Thủ tục nào của Viện cho công việc không phù hợp?")).toEqual([
      "thu",
      "tuc",
      "vien",
      "cho",
      "cong",
      "viec",
      "khong",
      "phu",
      "hop",
    ]);
  });

  // Bảo vệ trước lỗi tinh vi nhất của danh sách từ nối: bỏ dấu xong, từ khóa nghiệp vụ trùng mặt
  // chữ với từ nối. Mất một trong các từ này là mất luôn nhóm câu hỏi hay gặp nhất.
  it("KHÔNG loại các từ trùng mặt chữ với từ nối sau khi bỏ dấu", () => {
    for (const w of ["tai", "chung", "chi", "do", "can", "ma", "bao", "ai", "ho", "co", "khong", "ban", "thi"]) {
      expect(keywords(w)).toEqual([w]);
    }
  });

  it("tách được mã tài liệu thành từ tìm được", () => {
    expect(keywords("ETV.P.F01.04")).toEqual(["etv", "f01", "04"]);
  });

  it("câu chỉ toàn từ nối thì không còn từ khóa nào", () => {
    expect(keywords("là của và hoặc theo trong")).toEqual([]);
  });
});

describe("tsQuery", () => {
  it("nối bằng OR — câu hỏi tự nhiên hiếm khi khớp đủ mọi từ", () => {
    expect(tsQuery("kiểm soát tài liệu")).toBe("kiem | soat | tai | lieu");
  });

  it("trả chuỗi rỗng khi không còn từ khóa — nơi gọi phải hiểu là không truy hồi được", () => {
    expect(tsQuery("là của và theo")).toBe("");
    expect(tsQuery("?!")).toBe("");
  });
});

// Hai bộ test dưới khóa lại đúng chỗ đã làm Copilot câm: chỉ mục và truy vấn tách từ khác nhau.
describe("tachTuChoChiMuc", () => {
  it("tách mã tài liệu thành các token mà keywords() sẽ đi tìm", () => {
    // Điều kiện sống còn: to_tsvector('simple') giữ "etv.p13" thành MỘT token, còn keywords()
    // đi tìm "etv" và "p13" riêng lẻ — nên chuỗi đưa vào chỉ mục phải tách sẵn.
    expect(tachTuChoChiMuc("ETV.P13_KhacPhuc")).toBe("etv p13 khacphuc");
    expect(tachTuChoChiMuc("ISO/IEC 17025:2017")).toBe("iso iec 17025 2017");
  });

  it("mọi token sinh ra đều là token mà keywords() có thể sinh ra", () => {
    const trongChiMuc = tachTuChoChiMuc("Thủ tục ETV.P.F29.03 — Phiếu kiểm thử").split(" ");
    for (const t of trongChiMuc) expect(t).toMatch(/^[a-z0-9]+$/);
  });

  it("giữ nguyên phép bỏ dấu của normalize", () => {
    expect(tachTuChoChiMuc("Kiểm định")).toBe(normalize("Kiem dinh"));
  });
});

describe("maTaiLieuTrongCauHoi", () => {
  it("nhận ra thủ tục, sổ tay và biểu mẫu được gọi đích danh", () => {
    expect(maTaiLieuTrongCauHoi("Thủ tục ETV.P13 quy định những gì?")).toEqual(["ETV.P13"]);
    expect(maTaiLieuTrongCauHoi("etv.qm nói gì về chính sách?")).toEqual(["ETV.QM"]);
    expect(maTaiLieuTrongCauHoi("Biểu mẫu ETV.P.F29.03 dùng khi nào?")).toEqual(["ETV.P.F29.03"]);
  });

  it("gộp trùng và giữ được nhiều mã trong một câu", () => {
    expect(maTaiLieuTrongCauHoi("So sánh ETV.P13 với ETV.P14, rồi ETV.P13 lần nữa")).toEqual(["ETV.P13", "ETV.P14"]);
  });

  it("câu hỏi không nêu mã nào thì không bịa ra mã", () => {
    expect(maTaiLieuTrongCauHoi("Phát hiện công việc không phù hợp thì làm thế nào?")).toEqual([]);
    expect(maTaiLieuTrongCauHoi("ETV làm gì?")).toEqual([]);
  });
});

describe("maModuleTrongCauHoi", () => {
  it("nhận cả Mxx lẫn MPxx và gộp về cùng một số", () => {
    expect(maModuleTrongCauHoi("Module M29 số hóa thủ tục nào?")).toEqual(["29"]);
    expect(maModuleTrongCauHoi("MP13 và M13 có gì khác nhau?")).toEqual(["13"]);
  });

  it("không nhận nhầm mã thủ tục hay số đo thành mã module", () => {
    expect(maModuleTrongCauHoi("Thủ tục ETV.P13 quy định những gì?")).toEqual([]);
    expect(maModuleTrongCauHoi("ISO/IEC 17025 yêu cầu gì?")).toEqual([]);
    expect(maModuleTrongCauHoi("Biểu mẫu F13.01 dùng khi nào?")).toEqual([]);
  });
});
