# M27_TaiSanTT — OUTCOME (work-id 20260824-dac-ta-m27)

**Chế độ**: ANALYZE (chỉ đặc tả, không BUILD) · **Tier**: M (4 thực thể, có state machine 9 trạng
thái, liên thông cross-module M02/M14/M15/M28/M33/M34/M29, sẽ kéo theo thay đổi schema khi BUILD).

## WHO
- **TP** (trưởng phòng/phụ trách lĩnh vực) — chủ sở hữu tài sản thông tin của lĩnh vực.
- **QT hệ thống** — người quản lý kỹ thuật: lưu trữ, sao lưu, cấp/thu hồi quyền, xóa an toàn.
- **Phụ trách ATTT** — soát xét mức phân loại và mức CIA, nối danh mục với đánh giá rủi ro ISMS.
- **LĐV** — phê duyệt danh mục, bảng quy tắc xử lý, chia sẻ dữ liệu ra ngoài, hủy dữ liệu.
- **QLCL** — giữ danh mục tổng hợp và hồ sơ; theo dõi các mốc đến hạn.
- **Đoàn đánh giá (BoA/ISO 27001)** — người tiêu thụ bằng chứng: có kiểm kê tài sản, có chủ sở hữu,
  có phân loại, có bằng chứng hủy và bằng chứng khôi phục sao lưu.
- **Chủ thể dữ liệu cá nhân** — người được bảo vệ theo Nghị định 13/2023/NĐ-CP.

## WHAT
Có một đặc tả đủ để lập trình được cho M27 — số hóa QM §9.4 và §7.11: **kiểm kê – phân loại – giao
chủ sở hữu – quy tắc xử lý – chia sẻ có phê duyệt – sao lưu có kiểm chứng – hủy có bằng chứng** cho
toàn bộ dữ liệu và tài sản thông tin của Viện.

## WHY
- QM §9.4 (đã ban hành) dẫn chiếu Thủ tục ETV.MP27 nhưng **thủ tục và biểu mẫu chưa tồn tại** →
  Viện chưa có bằng chứng số hóa cho ISO/IEC 27001 A.5.9–A.5.13 (kiểm kê tài sản, chủ sở hữu, phân
  loại, xử lý) — đây là nhóm điều khoản đánh giá viên ISMS kiểm tra đầu tiên.
- ISO/IEC 27001 §8.2 yêu cầu đánh giá rủi ro ATTT **dựa trên tài sản**: không có danh mục tài sản
  thì M28 không có đầu vào, SoA không chứng minh được là đầy đủ.
- **M26 đã tham chiếu thang phân loại "của M02/M27"** nhưng thang đó chưa được định nghĩa ở đâu cả.
  M27 phải là nơi chốt thang này, nếu không mỗi module sẽ tự đặt một thang khác nhau.
- ETV.P02 §6.10 yêu cầu hủy hồ sơ quan trọng phải được phê duyệt và có bằng chứng — hiện chưa có
  công cụ nào ghi nhận việc đó.
- Nghị định 13/2023/NĐ-CP đặt nghĩa vụ với dữ liệu cá nhân: không biết dữ liệu cá nhân đang nằm ở
  đâu thì không thể đáp ứng yêu cầu của chủ thể dữ liệu hay nghĩa vụ thông báo sự cố.

## SUCCESS CRITERIA
1. `01_Requirement/DacTa.md` mô tả đủ: đối tượng dữ liệu + trường bắt buộc, vai trò, danh mục chuẩn,
   quy tắc nghiệp vụ, state machine, đầu ra, liên kết — đủ để BUILD mà không phải đoán thêm.
2. **Thang phân loại thông tin 4 mức được chốt tại M27** và tuyên bố rõ là nguồn chuẩn duy nhất;
   khớp với tên gọi M26 đang dùng (`Công khai · Nội bộ · Hạn chế · Mật`).
3. Mọi quy tắc không có trong văn bản đã ban hành được đánh dấu `[SUY DẪN]` và gom thành 8 câu hỏi
   chốt (DacTa mục 10).
4. Ranh giới rõ với M02, M28, M33, M34, M15, M14, M26, M29, M31 — nêu thành bảng.
5. `python3 _meta/validate_links.py` PASS.

## NGOÀI PHẠM VI lần này
- Không viết mã, không đụng `09_ENGINEERING/aios-platform` (M27 vẫn `COMING_SOON`).
- Không soạn/ban hành `ETV.P27` và biểu mẫu F27.01–F27.05 (việc của MP14, cần LĐV).
- Không sửa M26 (thang phân loại đã tương thích), không sửa M02/M15/M14.
- Không thiết kế kiến trúc sao lưu, mã hóa hay kiểm soát truy cập kỹ thuật — thuộc M28/M33; M27 chỉ
  ghi **yêu cầu** và **bằng chứng đã thực hiện**.
