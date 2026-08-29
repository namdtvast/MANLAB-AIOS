import Link from "next/link";

// Chân bảng dùng chung cho MỌI trang danh sách của platform: đếm số dòng đang xem trên tổng số,
// nút lùi/tiến trang. Tách khỏi M29/ui.tsx khi trải bộ này ra các module còn lại — mỗi trang tự
// truyền đường dẫn và bộ lọc đang áp, phần còn lại giống hệt nhau nên không chép lại ở từng trang.

/** Số dòng mỗi trang, thống nhất toàn platform. Đổi ở đây là đổi cho tất cả các bảng. */
export const KICH_THUOC_TRANG = 10;

/** Ô nhập/chọn của thanh lọc — để các trang danh sách nhìn giống nhau. */
export const locFieldCls =
  "mt-1 w-full rounded-lg border border-border-strong bg-canvas px-3 py-2 text-sm font-normal text-ink outline-none transition-colors focus:border-accent-line";

export const locLabelCls = "text-xs font-medium text-ink-2";

export const locBtnCls =
  "min-h-11 self-end rounded-lg border border-border-strong px-4 py-2 text-sm font-semibold text-ink hover:bg-sunk";

const navCls = "rounded-lg border border-border-strong px-3 py-1.5 font-medium text-ink hover:bg-sunk";
const navTatCls = "rounded-lg border border-border px-3 py-1.5 font-medium text-ink-3 opacity-60";

/**
 * Phân trang phía MÁY CHỦ: mỗi lần bấm là một lượt truy vấn `skip/take` mới, không phải cắt lát
 * mảng đã tải. Danh sách nghiệp vụ chỉ dài thêm theo thời gian nên tải cả bảng rồi phân trang ở
 * trình duyệt là cách hỏng chậm, không hỏng ngay.
 *
 * `query` là toàn bộ bộ lọc đang áp; link trang phải mang theo, nếu không bấm sang trang 2 sẽ
 * lặng lẽ xem trang 2 của tập KHÔNG lọc. Trang 1 cố tình không ghi `trang=1` vào URL để URL sạch
 * và trùng với URL người dùng vào lần đầu.
 *
 * `tenTham` cho phép nhiều bảng trên cùng một trang dùng tham số trang riêng (`trang`, `trang2`…);
 * bảng nào chuyển trang thì chỉ bảng đó đổi, các bảng còn lại giữ nguyên chỗ đang đọc.
 */
export function PhanTrang({
  path,
  query = {},
  neo = "",
  trang,
  tong,
  kichThuoc = KICH_THUOC_TRANG,
  tenTham = "trang",
  donVi = "dòng",
}: {
  path: string;
  query?: Record<string, string | undefined>;
  neo?: string;
  trang: number;
  tong: number;
  kichThuoc?: number;
  tenTham?: string;
  donVi?: string;
}) {
  const soTrang = Math.max(1, Math.ceil(tong / kichThuoc));
  const tuDong = tong === 0 ? 0 : (trang - 1) * kichThuoc + 1;
  const denDong = Math.min(trang * kichThuoc, tong);

  const href = (t: number) => {
    const sp = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v) sp.set(k, v);
    });
    if (t > 1) sp.set(tenTham, String(t));
    else sp.delete(tenTham);
    const qs = sp.toString();
    return `${path}${qs ? `?${qs}` : ""}${neo}`;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-3 py-2.5 text-xs text-ink-2">
      <p className="tabular-nums">
        {tong === 0 ? (
          `Không có ${donVi} nào.`
        ) : (
          <>
            Đang xem <span className="font-semibold text-ink">{tuDong.toLocaleString("vi-VN")}</span>–
            <span className="font-semibold text-ink">{denDong.toLocaleString("vi-VN")}</span> trên tổng{" "}
            <span className="font-semibold text-ink">{tong.toLocaleString("vi-VN")}</span> {donVi}
          </>
        )}
      </p>
      <div className="flex items-center gap-2">
        {trang > 1 ? (
          <Link href={href(trang - 1)} className={navCls}>
            ← Trang trước
          </Link>
        ) : (
          <span className={navTatCls}>← Trang trước</span>
        )}
        <span className="tabular-nums">
          Trang {trang}/{soTrang}
        </span>
        {trang < soTrang ? (
          <Link href={href(trang + 1)} className={navCls}>
            Trang sau →
          </Link>
        ) : (
          <span className={navTatCls}>Trang sau →</span>
        )}
      </div>
    </div>
  );
}

/** Đọc số trang từ URL và kẹp vào [1, số trang thật] — `?trang=99` trên tập 3 trang phải về trang 3, không phải bảng rỗng. */
export function chotTrang(raw: string | undefined, tong: number, kichThuoc = KICH_THUOC_TRANG) {
  const soTrang = Math.max(1, Math.ceil(tong / kichThuoc));
  const n = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(n) ? Math.min(Math.max(n, 1), soTrang) : 1;
}

/** Vị trí bắt đầu của trang — dùng thẳng cho `skip` của Prisma. */
export function boQua(trang: number, kichThuoc = KICH_THUOC_TRANG) {
  return (trang - 1) * kichThuoc;
}
