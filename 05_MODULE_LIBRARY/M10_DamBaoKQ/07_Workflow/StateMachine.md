# M10 — Bảng trạng thái & điều kiện chuyển

Vòng đời hồ sơ bảo đảm hiệu lực (`Assessment`). Khớp [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) §3 và [`../03_Database/DataModel.md`](../03_Database/DataModel.md).

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển tiếp | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang lập hồ sơ | Người lập (mọi TK) | Đủ trường bắt buộc + dữ liệu thô/bằng chứng theo `record_type` → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ kiểm tra kỹ thuật | **LĐP** | Đạt → Chờ phê duyệt; Trả lại → Trả lại | — |
| 3 | Trả lại | Bị trả khi soát xét | Người lập | Sửa (tạo phiên bản) → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ người có thẩm quyền | **LĐV** | Phê duyệt → Đã phê duyệt; Từ chối → Từ chối | — |
| 5 | Từ chối | Bị trả khi phê duyệt | Người lập | Sửa (tạo phiên bản) → Chờ soát xét | **Có** |
| 6 | Đã phê duyệt | Đã duyệt nội dung đánh giá | **LĐV** | Công bố (F10.09) → Đã công bố | Không |
| 7 | Đã công bố | Chốt trạng thái P10, khống chế phát hành ở M11 | — | Quá hạn → Hết hiệu lực; Thu hồi → Thu hồi/Hủy | — |
| 8 | Hết hiệu lực | Quá `expires_at` | hệ thống | (kết thúc) — yêu cầu đánh giá/gia hạn | Không |
| 9 | Thu hồi / Hủy | Rút hiệu lực công bố | LĐP/LĐV | (kết thúc) | **Có** |

## Nhánh không đạt (khóa phát hành)

| Điều kiện | Xử lý | Người thao tác |
|---|---|---|
| `result` = CẢNH BÁO | Gắn cờ, chuyển LĐP/LĐV xem xét; có thể yêu cầu KPH | LĐP/LĐV |
| `result` = KHÔNG ĐẠT / `publication_status` = FAIL-BLOCKED | **Khóa phát hành**, bắt buộc mở/liên kết KPH-CAPA (→ M13) | LĐV/QLCL |
| Sau điều tra nguyên nhân | Khôi phục (tạo phiên bản mới) hoặc Thu hồi | LĐV |

## Nguyên tắc
- Tách biệt **tạo — soát xét — phê duyệt**: không ai tự soát xét/tự phê duyệt hồ sơ do mình tạo.
- Không chuyển **Chờ phê duyệt** nếu thiếu trường bắt buộc/dữ liệu thô/bằng chứng theo `record_type`.
- Trạng thái **Trả lại / Từ chối / Thu hồi / Hủy** và kết quả **KHÔNG ĐẠT** bắt buộc `reason`; hệ thống tạo phiên bản chỉnh sửa, giữ bản trước.
- Không được thử lại để có kết quả đạt mà không điều tra nguyên nhân — khóa phát hành cho tới khi có KPH-CAPA.
- Mọi chuyển trạng thái ghi `AuditLog` (append-only); bản đã phê duyệt không ghi đè — sửa phải tạo phiên bản mới.
- `F10.09` là điểm chốt nội bộ, **không** thay thế `F11.03`; sau công bố, trạng thái truyền sang M11 để khống chế nút phát hành.
- AI (← M29) chỉ gắn cờ cảnh báo; **không** tự chuyển trạng thái, không tự kết luận sự phù hợp.
