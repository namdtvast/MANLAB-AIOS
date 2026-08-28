// Nhãn lỗi sức khoẻ nền tảng. Bộ test này giữ đúng một điều: ba tình huống hỏng khác nhau phải
// đọc ra ba câu khác nhau. Trước khi có healthErrorLabel(), giao diện chỉ hiện "Ngừng hoạt động"
// cho cả thiếu khoá, khoá sai lẫn máy chủ tắt — ba ca cần ba cách xử lý trái ngược nhau.
import { describe, expect, it } from "vitest";
import { healthErrorLabel } from "../labels";

describe("healthErrorLabel", () => {
  it("không có lỗi thì không có gì để hiện", () => {
    expect(healthErrorLabel(null)).toBeNull();
    expect(healthErrorLabel("")).toBeNull();
  });

  it("thiếu khoá thì nêu ĐÚNG TÊN biến môi trường còn thiếu", () => {
    expect(healthErrorLabel("NO_API_KEY:LOCAL_LLM_API_KEY_Q3")).toContain("LOCAL_LLM_API_KEY_Q3");
  });

  it("phân biệt khoá bị từ chối với máy chủ trả lỗi khác", () => {
    expect(healthErrorLabel("HTTP 401")).toContain("từ chối khoá API");
    expect(healthErrorLabel("HTTP 403")).toContain("từ chối khoá API");
    expect(healthErrorLabel("HTTP 500")).toBe("Máy chủ trả lỗi HTTP 500.");
  });

  it("lỗi mạng của fetch nói được thành câu, không để nguyên 'TypeError'", () => {
    expect(healthErrorLabel("TypeError: fetch failed")).toContain("Không kết nối được tới máy chủ");
  });

  it("mã chưa có nhãn thì trả nguyên văn, không nuốt mất thông tin", () => {
    expect(healthErrorLabel("PROVIDER_LENGTH")).toBe("PROVIDER_LENGTH");
  });
});
