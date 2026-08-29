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

/**
 * Chuẩn hóa DÀNH RIÊNG cho các cột đưa vào to_tsvector: thay mọi ký tự không phải chữ/số bằng
 * khoảng trắng.
 *
 * VÌ SAO BẮT BUỘC: bộ tách từ 'simple' của Postgres giữ nguyên chuỗi có dấu chấm thành MỘT token
 * — to_tsvector('simple','etv.p13') cho đúng token 'etv.p13'. Trong khi đó phía truy vấn
 * (keywords()) lại cắt theo /[^a-z0-9]+/ nên đi tìm 'etv' và 'p13'. Hai bên tách từ khác nhau ⇒
 * MỌI mã tài liệu đều vô hình với tìm kiếm: đo ngày 29/08/2026, câu "Thủ tục ETV.P13 quy định
 * những gì?" không lấy được đoạn nào của chính ETV.P13 — 6 chỗ trong prompt bị ETV.P18 (giàu chữ
 * "quy"/"định") chiếm hết, và Copilot trả lời "Không tìm thấy căn cứ".
 *
 * Đây chính là điều chú thích đầu file luôn yêu cầu — "hai bên phải chuẩn hóa giống hệt nhau" —
 * nhưng normalize() một mình không đủ, vì phép tách từ nằm ở Postgres chứ không ở JS.
 */
export function tachTuChoChiMuc(text: string): string {
  return normalize(text)
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
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

/**
 * Các mã tài liệu mà CHÍNH CÂU HỎI gọi tên: "Thủ tục ETV.P13 quy định những gì?" → ["ETV.P13"].
 *
 * Dùng cho quy tắc ưu tiên ở retrieval.ts. Cần một quy tắc tường minh vì ts_rank KHÔNG tính độ
 * hiếm của từ (không có IDF): trong truy vấn OR "thu | tuc | etv | p13 | quy | dinh", token duy
 * nhất phân biệt được tài liệu là "p13" lại đóng góp ngang với "quy". Đo ngày 29/08/2026: kể cả
 * khi đã đưa mã tài liệu lên hạng A, các đoạn của ETV.P13 vẫn chỉ đạt 0,0744 so với 0,0947 của
 * ETV.P18 — thua vì ETV.P18 dày chữ "quy"/"định" hơn, chứ không phải vì đúng chủ đề hơn.
 *
 * Người hỏi nêu đích danh mã tài liệu là đang bảo "đọc tài liệu này cho tôi" — đó là mệnh lệnh,
 * không phải một tín hiệu để cộng điểm rồi hy vọng thắng.
 */
export function maTaiLieuTrongCauHoi(question: string): string[] {
  const found = question.toUpperCase().match(/ETV\.(?:P\.F\d{2}\.\d{2}|P\d{2}|QM)/g) ?? [];
  return [...new Set(found)];
}

/**
 * Số hiệu module/thủ tục mà câu hỏi gọi đích danh: "Module M29 số hóa thủ tục nào?" → ["29"].
 * Nhận cả "M29" lẫn "MP29" vì hai bên luôn cùng một con số (quy ước bất biến của repo).
 *
 * Cùng lý do với maTaiLieuTrongCauHoi(): không có quy tắc này thì "Module M29 số hóa thủ tục
 * nào?" trả về ETV.P15, ETV.P11, ETV.P04… — sáu chỗ trong prompt bị các thủ tục giàu chữ
 * "thủ"/"tục"/"số" chiếm hết, còn README của chính M29 và MP29 không lọt vào.
 */
export function maModuleTrongCauHoi(question: string): string[] {
  const found = [...question.toUpperCase().matchAll(/\bMP?(\d{2})\b/g)].map((m) => m[1]);
  return [...new Set(found)];
}
