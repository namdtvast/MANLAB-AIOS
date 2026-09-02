// Phần logic thuần của phân trang — tách khỏi `components/PhanTrang.tsx` (nơi giữ giao diện chân
// bảng) để chạy được trong test Node không cần React.

/**
 * Ghép MỘT TRANG từ hai nhóm xếp nối nhau: toàn bộ nhóm ưu tiên đứng trước toàn bộ nhóm còn lại,
 * kể cả khi bảng dài hơn một trang. Dùng để đẩy bản ghi đang dùng được (Hoạt động / Hiệu lực) lên
 * đầu bảng.
 *
 * Vì sao không làm cách nào ngắn hơn:
 * - Cắt trang trước rồi xếp lại mảng vừa lấy: bản ghi Hoạt động nằm ở trang 2 vẫn kẹt ở trang 2.
 * - Tải cả bảng rồi cắt ở trình duyệt: đúng ngay nhưng hỏng dần theo thời gian — xem chú thích
 *   của `PhanTrang`.
 * - Xếp thẳng bằng `orderBy` trên cột trạng thái: thứ tự khi đó là thứ tự KHAI BÁO enum trong
 *   Postgres, không phải thứ tự ta muốn. `AIApprovalStatus` khai ACTIVE ở vị trí thứ 7 nên cách
 *   này cho ra Nháp lên đầu; mà kể cả bảng nào tình cờ khai đúng thì cũng là ràng buộc vô hình,
 *   đổi thứ tự enum là giao diện đổi theo mà không ai thấy.
 *
 * Nên phải hỏi máy chủ đúng cửa sổ cần lấy của từng nhóm — và muốn biết cửa sổ đó thì phải biết
 * trước `soNhomDau`, tức là đếm nhóm ưu tiên bằng một truy vấn `count` riêng.
 *
 * `boQua`/`lay` là `skip`/`take` của cả trang (dùng thẳng `boQua()` và `KICH_THUOC_TRANG`).
 */
export async function trangHaiNhom<T>(
  soNhomDau: number,
  layNhomDau: (boQua: number, lay: number) => Promise<T[]>,
  layNhomSau: (boQua: number, lay: number) => Promise<T[]>,
  boQua: number,
  lay: number,
): Promise<T[]> {
  const conLaiNhomDau = Math.max(0, soNhomDau - boQua);
  const canLayNhomDau = Math.min(lay, conLaiNhomDau);
  const dau = canLayNhomDau > 0 ? await layNhomDau(boQua, canLayNhomDau) : [];

  const thieu = lay - dau.length;
  if (thieu <= 0) return dau;

  // Trang này đã vét hết nhóm đầu; phần còn thiếu lấy tiếp ở nhóm sau, bỏ qua đúng số bản ghi
  // nhóm sau mà các trang trước đã hiển thị.
  const sau = await layNhomSau(Math.max(0, boQua - soNhomDau), thieu);
  return [...dau, ...sau];
}
