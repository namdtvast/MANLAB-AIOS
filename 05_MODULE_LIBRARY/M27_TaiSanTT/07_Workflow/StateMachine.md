# M27_TaiSanTT — Bảng trạng thái

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 6. Trạng thái chính
> áp dụng cho `InfoAsset` (tài sản thông tin).

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang khai báo | TP, QT hệ thống | Đủ trường bắt buộc theo `asset_type` (điện tử: `custodian` + `system_ref`) → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ kiểm tra mức phân loại và CIA | Phụ trách ATTT (≠ người lập) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | LĐV | Đạt → Đang sử dụng (**chặn** khi thiếu `owner`; dữ liệu khách hàng bị hạ mức không căn cứ; dữ liệu cá nhân thiếu `legal_basis`; `cia_a = Cao` mà không bật sao lưu); Không đạt → Không phê duyệt | — |
| 5 | Không phê duyệt | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 6 | Đang sử dụng | Có trong danh mục hiệu lực | TP (`owner`) | Ngừng khai thác → Ngừng sử dụng | **Có** |
| 7 | Ngừng sử dụng | Không còn khai thác, **vẫn trong thời hạn lưu** | QLCL, QT hệ thống | Hết thời hạn lưu + `DisposalRecord` Đã thực hiện → Đã hủy | — |
| 8 | Đã hủy | Dữ liệu đã hủy — **bản ghi kiểm kê vẫn giữ** làm bằng chứng | — | (kết thúc) | — |
| 9 | Hủy bản ghi | Khai báo sai/trùng, bỏ trước khi phê duyệt | LĐV | (kết thúc) | **Có** |

Ba cờ tính khi đọc, không phải trạng thái: **Đến hạn rà soát** (`last_reviewed_at` + `review_cycle`),
**Đến hạn kiểm tra khôi phục** (`last_restore_test_at` > 1 năm), **Đến hạn hủy** (Ngừng sử dụng và
đã hết thời hạn lưu).

## Thực thể phụ

| Thực thể | Chuỗi trạng thái | Ghi chú |
|---|---|---|
| `ClassificationRule` | Nháp → Đã phê duyệt → Hết hiệu lực | Chỉ một phiên bản hiệu lực; phê duyệt phiên bản mới ⇒ rà soát lại tài sản bị ảnh hưởng |
| `DataSharing` | Nháp → Chờ phê duyệt → Đã phê duyệt / Từ chối → Đã thu hồi | Phê duyệt bị **chặn** nếu thiếu `disclosure_ref` (dữ liệu khách hàng/cá nhân); hết `valid_until` ⇒ nhắc thu hồi |
| `DisposalRecord` | Nháp → Chờ phê duyệt → Đã phê duyệt → Đã thực hiện / Hủy bỏ | **Phê duyệt trước, thực hiện sau**; người thực hiện ≠ người chứng kiến; bắt buộc bằng chứng |

> Nguyên tắc: dữ liệu có thể bị hủy, **bản ghi kiểm kê thì không** — mất bản ghi là mất bằng chứng
> chứng minh việc hủy đã được phê duyệt và thực hiện đúng cách.
