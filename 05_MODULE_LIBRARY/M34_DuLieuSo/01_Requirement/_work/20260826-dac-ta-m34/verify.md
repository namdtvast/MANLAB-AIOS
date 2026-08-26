# M34 — Verify đợt đặc tả 26/08/2026

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| `validate_links.py` | **PASS** | `Đã kiểm tra 562 link · 46 MP · 38 M · 22 CAP. Vấn đề: 0` |
| `validate_citations.py --chan` | **PASS** | `Đã kiểm 422 trích dẫn điều khoản · 48 thủ tục. Trích dẫn hỏng: 0 điều khoản / 0 chỗ dẫn` |
| Đối chiếu tay trích dẫn `ETV.P34` | **PASS** | Xem bảng dưới |
| Đối chiếu tay trích dẫn thủ tục khác | **PASS** | Xem bảng dưới |
| Đủ 8 file đặc tả | **PASS** | DacTa · API · DataModel · Screens (mới) · Outputs · Dashboard (mới) · StateMachine · README |
| BUILD mã nguồn | **NOT RUN** | Chủ đích — chờ `ETV.P34` được phê duyệt theo MP14 (DacTa mục 10 điểm 1) |

## Đối chiếu tay trích dẫn — vì sao phải làm

Hai giới hạn đã biết của `validate_citations.py`: (1) không bắt trích dẫn khi mã thủ tục nằm trong
dấu nháy ngược — đa số trích dẫn của bộ đặc tả này viết dạng `` `ETV.P34` §x.y `` nên nằm ngoài tầm
kiểm; (2) không bắt "mục có thật nhưng sai mục". Vì vậy toàn bộ trích dẫn được đối chiếu tay trên
toàn văn thủ tục trong cùng phiên làm việc.

## Trích dẫn nội bộ `ETV.P34` (grep toàn bộ 8 file)

Các mục được dẫn: §2.1 · §2.2 · §2.3 · §3.2 · §5.1 · §5.2 · §5.3 · §6.1.1 · §6.1.2 · §6.1.3 (bước
2/3/5) · §6.2.1 · §6.2.2 · §6.3 · §6.3.1 · §6.3.2 (bước 3) · §6.3.3 · §6.4 · §6.4.1 · §6.4.2 ·
§6.4.3 · §6.4.4 · §6.5 · §6.5.1 · §6.5.2 · §6.5.3 · §6.6 · §6.7 · §6.7.1 · §6.7.2 · §6.7.3 · §6.8
· §6.9 · mục VII · mục VIII · Phụ lục I.1 (điều kiện 1–7) · Phụ lục I.2 · Phụ lục II.1 · Phụ lục
II.2 — **tất cả tồn tại** trong `ETV.P34_QuanLyDuLieuSo.md` (bản dự thảo 25/08/2026, 525 dòng) và
được dẫn **đúng nội dung mục** (đối chiếu khi viết từng quy tắc).

## Trích dẫn đích danh sang thủ tục khác

| Trích dẫn | Tiêu đề mục thật trong file gốc | Khớp ngữ nghĩa |
|---|---|---|
| `ETV.P26` mục 5.5 | "Khai thác tri thức và chỉ mục trợ lý AI" | ✓ — cấm Hạn chế/Mật vào chỉ mục AI |
| `ETV.P28` mục 6.7.5 | "Nhật ký và giám sát" | ✓ — nơi lưu nhật ký không sửa được |
| `ETV.P28` mục 6.7.9 | "Làm việc từ xa và hiện trường" | ✓ — có đúng câu "không lưu trữ lâu dài trên thiết bị cá nhân" |
| `ETV.P28` mục 6.13 | "An toàn thông tin đối với hệ thống trí tuệ nhân tạo" | ✓ — nguồn quy tắc HC/Mật không vào AI |
| `ETV.P29` mục 5.5 | "Dữ liệu cấp cho hệ thống AI" | ✓ — quy tắc gốc, M34 không quy định lại |
| `ETV.P35` mục 2.3 | "Ngoài phạm vi" | ✓ — nơi giao ranh giới dữ liệu số cho ETV.P34 |
| QM §10.3 / §7.11 | "QUẢN LÝ DỮ LIỆU SỐ" / "KIỂM SOÁT DỮ LIỆU VÀ QUẢN LÝ THÔNG TIN" | ✓ |

## Ghi chú số liệu

- `ETV.P34` Phụ lục I.1 có **7** điều kiện chặn cứng; Phụ lục I.2 có **14** tình huống (spec.md
  bản đầu ghi nhầm 16, đã sửa).
- Số trích dẫn được CI kiểm tăng 420 → **422** sau đợt này (2 trích dẫn dạng không nháy ngược mới).
