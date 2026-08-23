# M27_TaiSanTT — Đầu ra

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 7.

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| F27.01 — Danh mục tài sản thông tin | PDF/Excel | Kiểm kê theo nhóm dữ liệu, mức phân loại, chủ sở hữu, CIA, thời hạn lưu |
| F27.02 — Bảng quy tắc xử lý theo mức phân loại | PDF | Bảng luật đã phê duyệt (phiên bản hiện hành) |
| F27.03 — Phiếu đề nghị và phê duyệt chia sẻ dữ liệu | PDF | Bên nhận, mục đích, căn cứ, thời hạn, phê duyệt LĐV |
| F27.04 — Biên bản hủy dữ liệu và vật mang tin | PDF | Phương pháp hủy, người thực hiện, người chứng kiến, bằng chứng |
| F27.05 — Phiếu kiểm tra khôi phục dữ liệu sao lưu | PDF | Tài sản, ngày kiểm tra, kết quả, người thực hiện |
| Danh mục tài sản phục vụ đánh giá rủi ro ATTT (M28) | Dữ liệu/PDF | Lọc theo mức phân loại và CIA |
| Bảng đến hạn rà soát · đến hạn kiểm tra khôi phục · đến hạn hủy | Màn hình | Tính khi đọc |
| Bảng tài sản có dữ liệu cá nhân | Màn hình/PDF | Phục vụ nghĩa vụ theo Nghị định 13/2023/NĐ-CP |
| Trích xuất tình hình quản trị dữ liệu cho M17 | Dữ liệu/PDF | Tài sản mới, tài sản đã hủy, sự việc chia sẻ, kết quả kiểm tra khôi phục trong kỳ |

> **Năm biểu mẫu F27.01–F27.05 chưa được ban hành** (không có trong `06_SHARED_RESOURCES/01_Forms/`)
> — phải soạn và ban hành theo MP14 trước khi bản xuất được dùng làm hồ sơ chính thức. Việc công bố
> thông tin khách hàng ra bên thứ ba vẫn dùng luồng phê duyệt của **ETV.P02**, không lập biểu mẫu trùng.

## Hỗ trợ AI (← M29, có kiểm soát)

AI được phép *gợi ý* mức phân loại từ mô tả tài sản, *phát hiện* dữ liệu chưa được kiểm kê hoặc
thiếu chủ sở hữu, *nhắc* tài sản đến hạn rà soát/kiểm tra khôi phục/hủy. AI **không** tự phân loại
chính thức, **không** phê duyệt chia sẻ, **không** phê duyệt hoặc thực hiện hủy dữ liệu
(ISO/IEC 42001; ETV.P29).

Chiều ngược lại: dữ liệu chỉ được dùng làm nguồn cho hệ thống AI khi tài sản có `ai_use_allowed =
true`, đang sử dụng và **không** ở mức **Mật**.
