# M33_HeThongTT — Bảng trạng thái

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 6, theo `ETV.P33`
> **Phụ lục II** (dự thảo, Chờ soát xét). Trạng thái chính áp dụng cho `ITAsset`.

Cột **Người đưa vào trạng thái** là người *thực hiện thao tác chuyển bản ghi sang trạng thái đó* —
không phải người đang chờ xử lý tại đó. Đọc nhầm hai nghĩa này là nguồn sai phân quyền phổ biến nhất
khi lập trình state machine.

## `ITAsset` (F33.01)

| STT | Trạng thái | Ý nghĩa | Người đưa vào trạng thái | Chuyển tiếp | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang khai báo | QTHT | Đủ trường bắt buộc theo `asset_class` + đã áp cấu hình an toàn cơ sở → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ kiểm tra cấu hình an toàn, vùng mạng, mức phân loại tối đa | QTHT | PT.ATTT (**≠ người lập**) soát xét: Đạt → Chờ phê duyệt; Không đạt → Không soát xét | Không |
| 3 | Không soát xét | Bị trả lại để sửa | PT.ATTT (≠ người lập) | QTHT sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | PT.ATTT, VP | LĐV phê duyệt: Đạt → Đang vận hành (**chặn** khi vi phạm Phụ lục I.1); Không đạt → Không phê duyệt | Không |
| 5 | Không phê duyệt | Bị trả lại để sửa | LĐV | QTHT sửa → Chờ soát xét | **Có** |
| 6 | Đang vận hành | Đang phục vụ công việc | **LĐV** (phê duyệt); QTHT vận hành sau đó | Bảo trì lớn/sự cố → Tạm ngừng; chấm dứt sử dụng → Ngừng vận hành | Không |
| 7 | Tạm ngừng | Đang bảo trì, sửa chữa; chưa chấm dứt sử dụng | QTHT | Xong → Đang vận hành; không khắc phục được → Ngừng vận hành | **Có** |
| 8 | Ngừng vận hành | Không còn dùng, **chưa thanh lý**, dữ liệu chưa xử lý xong | QTHT | Hết đối tượng phụ thuộc (M35/M27/M05) + đã thu hồi tài khoản và chứng thư số + có bằng chứng xóa dữ liệu an toàn (← M27) + LĐV duyệt → Đã thanh lý | **Có** |
| 9 | Đã thanh lý | Đã thanh lý, chuyển giao — **bản ghi kiểm kê vẫn giữ**, mã không cấp lại | **LĐV** | (kết thúc) | **Có** |
| 10 | Hủy bản ghi | Khai báo sai hoặc trùng, bỏ trước khi phê duyệt | LĐV | (kết thúc) | **Có** |

### Điều kiện chặn cứng khi phê duyệt (`ETV.P33` Phụ lục I.1)

Chủ quản trị và đơn vị sử dụng cụ thể (R1) · mức phân loại và mức trọng yếu · đủ cấu hình an toàn cơ
sở (R3) · mã hóa ổ đĩa với tài sản Hạn chế/Mật · RTO + phương án dự phòng + ≥ 01 rủi ro đã mở với
tài sản trọng yếu Cao · phê duyệt LĐV với BYOD Hạn chế/Mật và tài khoản dùng chung · bản ghi không
chứa bí mật xác thực (R7) · giấy phép sử dụng hợp lệ với phần mềm (R21).

### Cờ cảnh báo — tính khi đọc, không phải trạng thái

**Đến hạn rà soát** · **Đến hạn bảo trì** · **Quá hạn vá lỗi bảo mật** (theo mức nghiêm trọng, mục
4.3) · **Sắp hết hạn bản quyền/bảo hành/EOL** · **Quá hạn phản hồi sự cố** (R18) · **Tài sản phát
hiện chưa kiểm kê quá 30 ngày** (R17) · **Ngoài kế hoạch bảo trì năm** (R19).

## Thực thể phụ (`ETV.P33` Phụ lục II.2)

| Thực thể | Chuỗi trạng thái | Ghi chú |
|---|---|---|
| `MaintenancePlan` | Nháp → Chờ phê duyệt → Đã phê duyệt → Thay thế | LĐV phê duyệt **trước khi bắt đầu năm kế hoạch**; `created_by ≠ approved_by` (R19) |
| `MaintenanceTask` (F33.02) | Kế hoạch → Đang thực hiện → **Chờ nghiệm thu** → Hoàn thành / Quá hạn / Hủy | Không có đường đi thẳng sang Hoàn thành. Ghi nhận đã thực hiện bị **chặn** khi thiếu `change_ref` (R5) hoặc `measurement_impact_ref` với máy tính điều khiển thiết bị đo (R4); nghiệm thu bị **chặn** khi `accepted_by = performed_by` (R15); vá lỗi Nghiêm trọng quá hạn ⇒ cảnh báo LĐV + KPH M13 |
| `SystemAccount` (F33.03) | Đang hoạt động → Tạm khóa → Đã thu hồi | Mọi chuyển trạng thái theo phiếu **F28.04** đã phê duyệt ở M28 (R6); tài khoản không phiếu ⇒ **khóa tạm ngay**, **không được xóa** trước khi PT.ATTT xem xét; biến động nhân sự ⇒ thu hồi **trong ngày làm việc** (R16) |
| `AccountReconciliation` | Đang thực hiện → Đã chốt | Chốt kỳ ⇒ số liệu bất biến, lưu 05 năm; kỳ đặc quyền – dịch vụ phải trình LĐV (R20) |
| `ITIncident` (F33.04) | Mới → Đang xử lý → Chờ bên thứ ba → Đã xử lý → Đã đóng / Hủy | Thẩm quyền kết thúc: QTHT (Đã đóng) · **PT.ATTT** khi có yếu tố ATTT · **LĐV** khi Hủy. Đóng bị **chặn** khi `security_flag = true` mà M28 chưa kết luận, sự cố lặp ≥ 03 lần/90 ngày chưa có `capa_ref`, hoặc thiếu `root_cause` / `asset_back_to_normal` / kết luận bài học kinh nghiệm (R9, R18) |

Mọi nhánh **Hủy**, **Không phê duyệt**, **Không soát xét**, **Quá hạn** bắt buộc ghi lý do.

> Nguyên tắc: thiết bị có thể rời khỏi Viện, **bản ghi kiểm kê thì không** — và không thiết bị nào
> được rời tay Viện khi chưa có bằng chứng dữ liệu trên đó đã được xóa an toàn.
