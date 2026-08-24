# M33_HeThongTT — Bảng trạng thái

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 6. Trạng thái chính
> áp dụng cho `ITAsset` (cấu phần hạ tầng CNTT).

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang khai báo | QTHT | Đủ trường bắt buộc theo `asset_class` → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ PT.ATTT kiểm tra cấu hình an toàn, vùng mạng, mức phân loại tối đa | PT.ATTT (≠ người lập) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại | QTHT | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | LĐV | Đạt → Đang vận hành (**chặn** khi thiếu chủ quản trị R1, thiếu cấu hình an toàn bắt buộc R3, hoặc vi phạm tách môi trường R5) | — |
| 5 | Không phê duyệt | Bị trả lại | QTHT | Sửa → Chờ soát xét | **Có** |
| 6 | Đang vận hành | Đang phục vụ công việc | QTHT | Bảo trì lớn/sự cố → Tạm ngừng; chấm dứt sử dụng → Ngừng vận hành | **Có** khi Ngừng |
| 7 | Tạm ngừng | Đang bảo trì/sửa chữa | QTHT | Xong → Đang vận hành; không khắc phục được → Ngừng vận hành | **Có** |
| 8 | Ngừng vận hành | Không còn dùng, chưa thanh lý | QTHT, LĐV | Có bằng chứng **xóa dữ liệu an toàn** (← M27) + LĐV duyệt → Đã thanh lý | — |
| 9 | Đã thanh lý | Đã thanh lý/chuyển giao — **bản ghi kiểm kê vẫn giữ** | — | (kết thúc) | — |
| 10 | Hủy bản ghi | Khai báo sai/trùng, bỏ trước khi phê duyệt | LĐV | (kết thúc) | **Có** |

Bốn cờ tính khi đọc, không phải trạng thái: **Đến hạn rà soát** · **Đến hạn bảo trì** · **Quá hạn vá
lỗi bảo mật** (theo mức nghiêm trọng, mục 4.3) · **Sắp hết hạn bản quyền/bảo hành/EOL**.

## Thực thể phụ

| Thực thể | Chuỗi trạng thái | Ghi chú |
|---|---|---|
| `MaintenanceTask` | Kế hoạch → Đang thực hiện → Hoàn thành / Quá hạn / Hủy | Hoàn thành bị **chặn** khi thiếu `change_ref` (R5) hoặc `measurement_impact_ref` với máy tính điều khiển thiết bị đo (R4); vá lỗi Nghiêm trọng quá hạn ⇒ cảnh báo LĐV + KPH M13 |
| `SystemAccount` | Đang hoạt động → Tạm khóa → Đã thu hồi | Mọi chuyển trạng thái phải có phiếu đã phê duyệt ở M28 (R6); tài khoản không phiếu ⇒ khóa tạm + mở sự cố M28 |
| `ITIncident` | Mới → Đang xử lý → Chờ bên thứ ba → Đã xử lý → Đã đóng / Hủy | Đóng bị **chặn** khi `security_flag = true` mà chưa chuyển M28, hoặc sự cố lặp ≥ 3 lần/90 ngày mà chưa có KPH (R9) |

> Nguyên tắc: thiết bị có thể rời khỏi Viện, **bản ghi kiểm kê thì không** — và không thiết bị nào
> được rời tay Viện khi chưa có bằng chứng dữ liệu trên đó đã được xóa an toàn.
