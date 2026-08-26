# M33_HeThongTT — OUTCOME (work-id 20260824-dac-ta-m33)

**Chế độ**: ANALYZE (chỉ đặc tả, không BUILD) · **Tier**: M (4 thực thể, state machine 10 trạng
thái, liên thông cross-module M05/M10/M13/M27/M28/M30/M31/M35, sẽ kéo theo thay đổi schema khi BUILD).

## WHO
- **QTHT** (quản trị hệ thống thông tin, thuộc Văn phòng) — người kiểm kê, vận hành, bảo trì hạ tầng
  và **thực thi** cấp/thu hồi tài khoản theo phiếu của M28.
- **PT.ATTT** — soát xét cấu hình an toàn, phân vùng mạng, mức phân loại tối đa của thiết bị.
- **TP và nhân viên** — người sử dụng thiết bị, người báo sự cố.
- **LĐV** — phê duyệt danh mục, kế hoạch bảo trì, thanh lý, các ngoại lệ (BYOD, tài khoản dùng chung).
- **Đoàn đánh giá (ISO/IEC 27001, BoA)** — người tiêu thụ bằng chứng: kiểm kê tài sản A.5.9, cấu
  hình an toàn A.8.9, vá lỗi A.8.8, tách môi trường A.8.31, xóa dữ liệu trước thanh lý A.7.14.

## WHAT
Có một đặc tả đủ để lập trình được cho M33 — số hóa QM §10.2: **kiểm kê – vận hành – bảo trì – kiểm
soát tài khoản kỹ thuật – xử lý sự cố** đối với hạ tầng CNTT (máy chủ, mạng, thiết bị đầu cuối, phần
mềm, dịch vụ thuê ngoài), đúng phạm vi mà ETV.P35 lần BH 01 mục 1.4 đã giao cho ETV.MP33
(lần BH 02 trên đĩa đánh số lại thành mục 2.3).

## WHY
- QM §10.2 dẫn chiếu Thủ tục ETV.MP33 nhưng **thủ tục và biểu mẫu chưa tồn tại**.
- `ETV.P28` (đã ban hành) đặt ra một loạt **kiểm soát kỹ thuật bắt buộc** tại mục 5.7 — mã hóa ổ
  đĩa, chống mã độc, vá lỗi theo mức nghiêm trọng, phân vùng mạng, tách môi trường, xóa dữ liệu
  trước thanh lý — nhưng **không có module nào đang giữ bằng chứng thực hiện**. Không có M33 thì
  SoA của M28 có kiểm soát "Áp dụng" mà không chứng minh được.
- `ETV.P35` (đã ban hành) mục 1.4 giao rõ hạ tầng, máy chủ, mạng, thiết bị đầu cuối và tài khoản
  người dùng cho **ETV.MP33** — nghĩa là M35 đang trỏ xuống một module chưa có nội dung.
- Rủi ro đặc thù của Viện: **máy tính điều khiển và thu thập dữ liệu của thiết bị đo**. ETV.P28
  mục 6.7.3 buộc mọi thay đổi trên nhóm này phải qua MP30 và phải đánh giá ảnh hưởng tới hiệu lực
  kết quả đo (MP10). Không có nơi ghi nhận, ràng buộc này chỉ tồn tại trên giấy.

## SUCCESS CRITERIA
1. `01_Requirement/DacTa.md` mô tả đủ: đối tượng dữ liệu + trường bắt buộc, vai trò, danh mục chuẩn,
   quy tắc nghiệp vụ, state machine, đầu ra, liên kết — đủ để BUILD mà không phải đoán thêm.
2. Mọi kiểm soát dẫn từ `ETV.P28`/`ETV.P35` được **áp dụng nguyên** và ghi rõ là đã ban hành; phần
   suy dẫn đánh dấu `[SUY DẪN]` và gom thành 8 câu hỏi chốt.
3. **Không chồng lấn**: M33 (thiết bị/hệ thống) ↔ M27 (dữ liệu) ↔ M28 (phê duyệt quyền, rủi ro) ↔
   M35 (nền tảng số) ↔ M30 (thay đổi) — nêu thành bảng, kèm nêu rõ điểm vênh giữa `ETV.P28` 5.7.2 và
   `ETV.P35` 1.4 về thiết bị đầu cuối để LĐV chốt.
4. `python3 _meta/validate_links.py` PASS.

## NGOÀI PHẠM VI lần này
- Không viết mã, không đụng `09_ENGINEERING/aios-platform` (M33 vẫn `COMING_SOON`).
- Không soạn/ban hành `ETV.P33` và biểu mẫu F33.01–F33.04 (việc của MP14, cần LĐV).
- Không sửa M27, M28, M35 — chỉ nêu điểm cần chốt; nếu LĐV chọn cách hiểu khác ở câu hỏi 2 thì mới
  sửa đồng bộ.
- Không thiết kế công cụ giám sát kỹ thuật, không định nghĩa cấu hình an toàn cơ sở chi tiết
  (baseline) cho từng loại thiết bị — việc kỹ thuật của QTHT, M33 chỉ giữ bằng chứng tuân thủ.
