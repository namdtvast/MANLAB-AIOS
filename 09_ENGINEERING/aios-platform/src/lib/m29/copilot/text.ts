// Chuẩn hóa văn bản tiếng Việt cho chỉ mục toàn văn.
//
// Postgres không có cấu hình từ điển tiếng Việt, nên dùng cấu hình 'simple' (tách từ theo khoảng
// trắng, không chia thân từ) trên văn bản ĐÃ BỎ DẤU và hạ chữ thường. Nhờ vậy "kiểm định" khớp
// được cả "Kiểm Định" lẫn "kiem dinh". Đổi lại, không có phép chia thân từ — chấp nhận được vì
// tiếng Việt không biến hình.
//
// Dùng CHUNG giữa script nạp chỉ mục và hàm truy hồi: hai bên phải chuẩn hóa giống hệt nhau,
// nếu lệch thì chỉ mục không bao giờ khớp truy vấn.

/** Bỏ dấu tiếng Việt, hạ chữ thường. "Kiểm định" → "kiem dinh". */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

// Từ nối tiếng Việt. Danh sách cố ý NGẮN: sau khi bỏ dấu, rất nhiều từ nối trùng mặt chữ với từ
// khóa nghiệp vụ — "tài" (tài liệu) ≡ "tại", "chứng" (chứng chỉ) ≡ "chung", "đo" (đo lường) ≡
// "đó", "căn" (căn cứ) ≡ "cần", "mã" ≡ "mà", "báo/bảo" ≡ "bao", "ai" ≡ "AI". Loại nhầm một trong
// số đó làm Copilot mất hẳn khả năng tìm đúng nhóm câu hỏi hay gặp nhất, trong khi giữ lại một
// từ nối chỉ làm loãng nhẹ điểm ts_rank. Khi phân vân thì GIỮ LẠI.
const STOPWORDS = new Set(
  "la cua va hoac den theo trong tren duoi khi neu nay cac nhung se boi nhu gi nao sao minh em hay xin vui long toi".split(
    /\s+/
  )
);

/**
 * Tách câu hỏi thành các từ khóa dùng cho to_tsquery. Chỉ giữ chữ/số, bỏ từ nối, bỏ từ 1 ký tự.
 * Trả về mảng đã chuẩn hóa, không trùng lặp, giữ nguyên thứ tự xuất hiện.
 */
export function keywords(question: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of normalize(question).split(/[^a-z0-9]+/)) {
    if (raw.length < 2 || STOPWORDS.has(raw) || seen.has(raw)) continue;
    seen.add(raw);
    out.push(raw);
  }
  return out;
}

/**
 * Biểu thức to_tsquery dạng OR. Dùng OR (không phải AND) vì câu hỏi tự nhiên chứa nhiều từ không
 * có trong tài liệu — AND gần như luôn trả về rỗng. Xếp hạng ts_rank lo phần chọn đoạn khớp nhất.
 * Trả về chuỗi rỗng khi không còn từ khóa nào đáng tìm.
 */
export function tsQuery(question: string): string {
  return keywords(question).join(" | ");
}
