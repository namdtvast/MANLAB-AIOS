# M25_BoiCanh — OUTCOME (work-id 20260823-dac-ta-m25)

**Chế độ**: ANALYZE (chỉ đặc tả, không BUILD) · **Tier**: M (nhiều thực thể, có state machine, có
liên thông cross-module M01/M17/M24, sẽ kéo theo thay đổi schema khi BUILD).

## WHO
- **QLCL** — người lập kỳ xem xét bối cảnh, tổng hợp dữ liệu, giữ hồ sơ.
- **TP** (trưởng phòng/phụ trách lĩnh vực) — đề xuất và soát xét vấn đề thuộc lĩnh vực mình.
- **LĐV** — phê duyệt kỳ, kết luận, quyết định với vấn đề mức tác động Cao.
- **Đoàn đánh giá (nội bộ/BoA)** — người tiêu thụ bằng chứng: cần thấy hồ sơ bối cảnh có kỳ, có
  phê duyệt, có truy vết sang rủi ro.

## WHAT
Có một đặc tả đủ để lập trình được cho M25 — số hóa QM §9.2: quản lý **vấn đề bối cảnh nội bộ/bên
ngoài** và **bên quan tâm + nhu cầu, mong đợi**, theo kỳ có phê duyệt, kết nối sang M01/M17/M24.

## WHY
- QM §9.2 (đã ban hành) dẫn chiếu Thủ tục ETV.MP25 nhưng **thủ tục và biểu mẫu chưa tồn tại** →
  hiện Viện không có bằng chứng số hóa cho ISO 9001 §4.1/§4.2; đây là điều khoản đoàn đánh giá
  luôn hỏi đầu tiên.
- M17 (đã xây) yêu cầu 12 nội dung xem xét lãnh đạo, trong đó hoạch định phụ thuộc bối cảnh;
  M01 cần nguồn nhận diện rủi ro có hệ thống. Thiếu M25, hai module này thiếu đầu vào thượng nguồn.

## SUCCESS CRITERIA
1. `01_Requirement/DacTa.md` mô tả đủ: đối tượng dữ liệu + trường bắt buộc, vai trò, danh mục
   chuẩn, quy tắc nghiệp vụ, state machine, đầu ra, liên kết — đủ để BUILD mà không phải đoán thêm.
2. Mọi quy tắc **không** có trong văn bản đã ban hành được đánh dấu `[SUY DẪN]` và gom thành danh
   sách câu hỏi chốt (DacTa mục 10) — không trộn lẫn giả định với quy định.
3. Ranh giới rõ với M01 (không lặp ma trận R = S × P), M13, M26.
4. `python3 _meta/validate_links.py` PASS.

## NGOÀI PHẠM VI lần này
- Không viết mã, không đụng `09_ENGINEERING/aios-platform` (M25 vẫn `COMING_SOON`).
- Không soạn/ban hành `ETV.P25` và biểu mẫu F25.01–F25.03 (việc của MP14, cần LĐV).
- Không sửa M26_TriThuc (cùng CAP-25 nhưng khác phạm vi).
