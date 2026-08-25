// Chuẩn hóa văn bản dùng CHUNG giữa script nạp chỉ mục và hàm truy hồi. Hai bên lệch nhau thì
// chỉ mục không bao giờ khớp truy vấn, mà lỗi đó không biểu hiện thành exception — chỉ thành
// "Copilot lúc nào cũng nói không tìm thấy". Test khóa lại hành vi chuẩn hóa.
import { describe, expect, it } from "vitest";
import { keywords, normalize, tsQuery } from "../copilot/text";

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
