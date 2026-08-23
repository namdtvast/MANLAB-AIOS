# M25_BoiCanh — VERIFY (Increment 14, work-id 20260823-dac-ta-m25)

Nền tảng: `09_ENGINEERING/aios-platform` (Next.js 16 + Prisma 7 + PostgreSQL).
Cách verify: thao tác thật trên UI qua trình duyệt với 3 tài khoản demo `nth` (QLCL), `ldp` (TP),
`ldv` (LĐV) — đăng nhập/đăng xuất thật giữa các bước, không giả lập vai trò.

> Ghi chú phương pháp: click chuột theo tọa độ trong pane trình duyệt bị lệch tỉ lệ, nên phần lớn
> thao tác được kích hoạt bằng `element.click()` trên đúng nút của UI — vẫn đi qua handler React
> và server action thật, không gọi tắt vào hàm nghiệp vụ.

## 1. Kiểm tra tĩnh

| Hạng mục | Lệnh | Kết quả |
|---|---|---|
| Schema Prisma hợp lệ | `npx prisma validate` | **PASS** — "The schema at prisma/schema.prisma is valid" |
| Migration | `npx prisma migrate dev --name m25_boi_canh` | **PASS** — tạo + áp dụng `20260823153522_m25_boi_canh` (chỉ THÊM bảng, không phá hủy dữ liệu) |
| TypeScript | `npx tsc --noEmit` | **PASS** — không lỗi |
| ESLint | `npx eslint src/lib/m25 "src/app/(platform)/modules/M25"` | **PASS** — không cảnh báo |
| Seed | `npx tsx prisma/seed.ts` | **PASS** — nạp 2 kỳ + 4 vấn đề + 4 bên quan tâm + vai trò M25 cho 3 tài khoản |
| Link repo | `python3 _meta/validate_links.py` | **PASS** — 377 link · 38 MP · 38 M · 22 CAP · 0 vấn đề |
| `next build` | `npm run build` | **PASS** — "Compiled successfully", sinh tĩnh 39/39 trang, 4 route M25 (`/modules/M25`, `/monitoring`, `/review/[id]`, `/review/new`) đều build được (đã tạm dừng dev server để tránh tranh chấp thư mục `.next`, khởi động lại ngay sau đó) |

## 2. Kiểm tra chức năng trên UI thật

| # | Tiêu chí (spec.md mục 4) | Kết quả | Bằng chứng |
|---|---|---|---|
| AC1 | Tạo kỳ định kỳ/đột xuất; đột xuất thiếu sự kiện phát sinh bị chặn | **PASS** | Chặn: "Kỳ đột xuất bắt buộc ghi rõ sự kiện làm phát sinh (quy tắc 2 DacTa M25)." · Tạo định kỳ thành công → `BC-2026-0003` |
| AC2 | Vấn đề mức Cao chưa liên kết M01 ⇒ chặn gửi soát xét; liên kết xong thì qua | **PASS** | Chặn: "Vấn đề mức tác động Cao phải liên kết ít nhất 1 rủi ro/cơ hội bên M01 (quy tắc 3 DacTa M25): VD-2026-0004 …" · sau khi liên kết `RR-2026-0002` → trạng thái chuyển **Chờ soát xét** |
| AC3 | Bên quan tâm không có mong đợi ⇒ chặn gửi soát xét | **PASS** | Tạo `BQT-2026-0005` không mong đợi → "Mỗi bên quan tâm phải có ít nhất 1 nhu cầu/mong đợi (quy tắc 6 DacTa M25): BQT-2026-0005 — …" |
| AC4 | Nghĩa vụ tuân thủ thiếu căn cứ ⇒ chặn lưu | **PASS** | Chặn: "…phải dẫn chiếu văn bản pháp luật/tiêu chuẩn cụ thể (quy tắc 4 DacTa M25)." · điền "ISO/IEC 17025 §6.2; Bộ luật Lao động 2019" → lưu thành công |
| AC5 | Chỉ TP soát xét; người lập không tự soát xét | **PASS (một phần)** | QLCL bấm soát xét → "Chỉ Trưởng phòng được soát xét kỳ xem xét bối cảnh." · TP soát xét đạt → **Chờ phê duyệt**. Nhánh TP-trùng-người-lập **chưa test** (chỉ có 1 tài khoản TP) |
| AC6 | Chỉ LĐV phê duyệt + bắt buộc kết luận; người lập không tự phê duyệt | **PASS** | TP bấm phê duyệt → "Chỉ Lãnh đạo Viện được phê duyệt…" · LĐV bấm khi trống kết luận → "Phê duyệt bắt buộc nhập kết luận của LĐV." · LĐV tự phê duyệt kỳ do chính mình lập (`BC-2026-0003`) → "Người lập không được tự phê duyệt kỳ của mình (quy tắc 7 DacTa M25)." |
| AC7 | Sau phê duyệt kỳ chỉ đọc; kỳ trước tự Hết hiệu lực + `supersedesId` đúng | **PASS** | `BC-2026-0002` → **Đã phê duyệt**, hiện "Thay thế kỳ BC-2026-0001" · `BC-2026-0001` → **Hết hiệu lực**, "Bị thay thế bởi BC-2026-0002", **0 nút thao tác** trên toàn trang |
| AC8 | Kỳ mới kế thừa đúng mục còn hiệu lực, sinh mã mới | **PASS (một phần)** | `BC-2026-0003` kế thừa 1 vấn đề + 2 bên quan tâm của `BC-2026-0002`, mã mới `VD-2026-0005`, `BQT-2026-0006/0007`, giữ nguyên liên kết M01 (1). Nhánh "không kế thừa mục đã đóng" **chưa test qua UI** (cần một kỳ đã phê duyệt có mục đã đóng) |
| AC9 | Bảng theo dõi đến hạn đúng theo tần suất | **PASS** | Trước khi lùi ngày: 0/0 mục quá hạn. Sau khi lùi `updatedAt` (`VD-2026-0004` 95 ngày/tần suất Tháng; `BQT-2026-0004` 200 ngày/tần suất 6 tháng): hiện đúng 1 vấn đề "94 ngày" + 1 bên quan tâm "199 ngày", các mục cập nhật gần đây không bị liệt kê |
| AC10 | Mọi chuyển trạng thái ghi nhật ký đủ ai/khi nào/trước→sau/lý do | **PASS** | Nhật ký `BC-2026-0002`: lập → liên kết M01 → thêm bên quan tâm → thêm mong đợi (kèm căn cứ) → "Gửi soát xét (DRAFT → PENDING_REVIEW)" → "Soát xét đạt (PENDING_REVIEW → PENDING_APPROVAL)" → "LĐV phê duyệt (PENDING_APPROVAL → APPROVED)"; hủy kỳ `BC-2026-0003` ghi kèm lý do |
| AC11 | M17 cảnh báo mềm khi năm chưa có kỳ bối cảnh được phê duyệt, không chặn | **PASS** | Năm 2026 đã có kỳ duyệt → không hiện cảnh báo. Đổi tạm `periodYear` 2 kỳ sang 2025 → hiện đúng "Năm 2026 chưa có kỳ xem xét bối cảnh nào được phê duyệt (M25)…" và form vẫn lập được. Đã hoàn nguyên dữ liệu ngay sau đó |
| — | Đóng mục bắt buộc lý do (quy tắc 10) | **PASS** | Bấm xác nhận đóng khi trống lý do → "Đóng mục bắt buộc nhập lý do (quy tắc 10 DacTa M25)." · có lý do → `BQT-2026-0007` chuyển **Đã đóng** |
| — | Hủy kỳ (chỉ LĐV, bắt buộc lý do) | **PASS** | `BC-2026-0003`: PENDING_APPROVAL → **Hủy**, nhật ký ghi lý do |

## 3. Lỗi tìm được trong lúc verify và đã sửa

1. **Form bị xóa trắng khi server trả lỗi nghiệp vụ.** React 19 tự reset `<form action={…}>` sau
   khi action chạy xong — kể cả khi kết quả là lỗi — nên người dùng mất toàn bộ nội dung vừa nhập
   mỗi lần vướng gate (M25 có rất nhiều gate: quy tắc 3/4/6). Đã chuyển 4 form của M25 sang
   `onSubmit` + `preventDefault()`; verify lại: thông báo lỗi quy tắc 4 hiện lên **và** nội dung
   đã nhập được giữ nguyên.
2. **Nhật ký chỉ hiện thao tác trên chính kỳ**, không hiện thao tác trên vấn đề/bên quan tâm/mong
   đợi thuộc kỳ (dữ liệu vẫn ghi đủ trong `M25AuditEntry` nhưng không có chỗ xem). Đã sửa trang
   chi tiết để gom vết của cả cây dữ liệu con — đúng tinh thần hồ sơ truy vết cho đoàn đánh giá.

## 4. Điều CHƯA verify (không quy tròn thành hoàn tất)

- Nhánh **Không soát xét** / **Không phê duyệt** (trả lại kèm lý do) — mới verify nhánh đạt.
- **Bỏ liên kết M01**, **xóa mong đợi**, **đóng vấn đề bối cảnh** (đã verify đóng *bên quan tâm*).
- Nhánh TP trùng người lập (`SELF_REVIEW`) — chỉ có 1 tài khoản TP trong seed.
- Nhánh "không kế thừa mục đã đóng" của quy tắc 9.
- Chặn ghi phía server vào kỳ đã phê duyệt: đã có `guardEditable` ở **mọi** action con và UI ẩn
  toàn bộ nút, nhưng chưa dựng request giả để tấn công trực tiếp endpoint.
- Tương thích với đợt làm lại giao diện đang dở của một phiên làm việc song song (sidebar/layout
  đang sửa cùng lúc) — M25 viết theo khuôn giao diện hiện hành của M16/M17.

## 5. Dữ liệu để lại sau khi verify

`BC-2026-0001` Hết hiệu lực · `BC-2026-0002` Đã phê duyệt (kỳ đang hiệu lực, có 2 mục cố ý quá hạn
theo dõi để minh họa màn hình đến hạn) · `BC-2026-0003` Hủy (kỳ dựng để thử gate tách vai trò).
Chạy lại seed trên DB trống sẽ về đúng trạng thái gốc 2 kỳ.
