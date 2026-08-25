# M34_DuLieuSo — Đầu ra

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 7. Thủ tục nguồn:
> `ETV.P34` (dự thảo, Chờ soát xét).

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| F34.01 — Danh mục dữ liệu số và từ điển dữ liệu | PDF/Excel | 4 phần: danh mục tập dữ liệu · từ điển theo phiên bản · dữ liệu chủ và nguồn sự thật duy nhất · chuyển giai đoạn vòng đời |
| F34.02 — Phiếu đo chất lượng và hiệu chỉnh dữ liệu | PDF | Phần A kỳ đo sáu chiều (kèm xu hướng so kỳ trước); phần B hồ sơ hiệu chỉnh với giá trị trước/sau |
| F34.03 — Phiếu yêu cầu khai thác, chia sẻ dữ liệu | PDF | Đủ 5 mục của biểu mẫu: loại yêu cầu · nội dung · ý kiến giảm thiểu · phê duyệt · thực hiện và thu hồi |
| Quyết định công nhận dữ liệu chủ và nguồn sự thật duy nhất | PDF | LĐV ký; lưu **vĩnh viễn** trên ManLab |
| Bảng đến hạn (5 nhóm) | Màn hình | Rà soát · đo chất lượng · chuyển vòng đời · thu hồi chia sẻ · dữ liệu cá nhân quá chu kỳ — tính khi đọc |
| Trích xuất truy xuất nguồn gốc một giá trị dữ liệu | Màn hình/PDF | Nguồn phát sinh → biến đổi → ghi nhận/hiệu chỉnh → nơi đã sử dụng (R20; nền cho M36) |
| **Báo cáo tình hình dữ liệu số 06 tháng/lần** | PDF | `ETV.P34` §6.9 — đủ 7 nội dung, xem bên dưới |
| Trích xuất cho M17 | Dữ liệu/PDF | Đầu vào xem xét của lãnh đạo (`ETV.P17`) |
| Danh sách tập dữ liệu đã phê duyệt cấp cho hệ thống AI | Dữ liệu | Cho M29 và PT.ATTT giám sát phạm vi truy xuất (R22) |

**Báo cáo 06 tháng/lần** (`ETV.P34` §6.9; lập thêm trước mỗi cuộc họp xem xét lãnh đạo) đủ bảy nội
dung: (1) tổng số tập theo nhóm, mức phân loại, giai đoạn vòng đời; (2) kết quả đo chất lượng theo
chiều, tỷ lệ đạt ngưỡng; (3) tập dưới ngưỡng và tình trạng khắc phục; (4) số lần hiệu chỉnh, trường
hợp ảnh hưởng kết quả đã phát hành; (5) chia sẻ ra ngoài đã phê duyệt, tình trạng thu hồi; (6) bảng
tra song song và dữ liệu chuyển ra kênh chưa duyệt phát hiện trong kỳ; (7) tập đến hạn rà soát, đến
hạn chuyển giai đoạn vòng đời.

**Biểu mẫu mượn — không lập trùng** (`ETV.P34` mục VII): biên bản hủy dữ liệu, hồ sơ sao lưu —
`ETV.P27` · phiếu quyền truy cập — **F28.04** (`ETV.P28`) · phiếu thay đổi cấu trúc — **F30.02**
(`ETV.P30`) · hồ sơ điểm tích hợp — `ETV.P37` · phiếu KPH — `ETV.P13`.

**Thời hạn lưu hồ sơ** (`ETV.P34` mục VIII; cơ chế theo `ETV.P15`, chi tiết `ETV.P.F 14.06`): danh
mục và từ điển — **vĩnh viễn** · phiếu đo và hiệu chỉnh — **05 năm** · phiếu khai thác, chia sẻ và
hồ sơ phê duyệt ra ngoài kèm bằng chứng thu hồi — **10 năm** · hồ sơ hiệu chỉnh ảnh hưởng kết quả
đã phát hành — theo thời hạn hồ sơ kỹ thuật tương ứng · quyết định công nhận dữ liệu chủ — **vĩnh
viễn** · hồ sơ dữ liệu cho AI — theo `ETV.P29` · biên bản hủy — theo `ETV.P27` · báo cáo — theo
`ETV.P17`.

## Hỗ trợ AI (← M29, có kiểm soát)

AI được *phát hiện* dữ liệu trùng/thiếu/bất thường, *nhắc* đến hạn rà soát – đo chất lượng – thu
hồi chia sẻ, *gợi ý* ánh xạ và chuẩn hóa giá trị, *soạn dự thảo* từ điển dữ liệu và báo cáo 06
tháng. AI **không** tự sửa dữ liệu vận hành, **không** phê duyệt khai thác/chia sẻ, **không** kết
luận chất lượng, **không** tự hủy dữ liệu (`ETV.P34` §5.3; hồ sơ AIA theo MP29).
