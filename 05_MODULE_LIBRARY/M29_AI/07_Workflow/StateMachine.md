# M29_AI — Bảng trạng thái

Áp dụng cho mọi entity có vòng đời phê duyệt trong M29_AI: `AIPromptVersion`, `AIGuardrail`,
`AIPolicy`, `AIImpactAssessment` (AIA). Dùng đúng khuôn trạng thái chuẩn của repo — **AI không
bao giờ tự chuyển trạng thái phê duyệt**, người phê duyệt luôn là con người (ràng buộc ISO/IEC
42001, xem `07_AI_OPERATING_SYSTEM/12_Policies`).

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp (DRAFT) | Đang soạn nội dung | Người lập | Đủ trường bắt buộc → Chờ soát xét | Không |
| 2 | Chờ soát xét (REVIEW) | Chờ kiểm tra kỹ thuật | Người soát xét | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ thẩm quyền duyệt | Người phê duyệt | Đạt → Đã phê duyệt (APPROVED); Không đạt → Không phê duyệt | — |
| 5 | Không phê duyệt | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 6 | Đã phê duyệt (APPROVED) | Có hiệu lực nội dung | — | Kích hoạt → Hiệu lực (ACTIVE) | — |
| 7 | Hiệu lực (ACTIVE) | Đang được Agent/Tool Gateway sử dụng | AI_ADMIN | Có bản mới ACTIVE → Lưu trữ (ARCHIVED); Hết hiệu lực/Hủy | — |
| 8 | Lưu trữ / Hết hiệu lực / Hủy (ARCHIVED) | Kết thúc vòng đời bản ghi | người có thẩm quyền | (kết thúc) | **Có** khi Hủy |

## Ghi chú riêng theo entity

- **`AIPromptVersion`**: chỉ 1 version ở trạng thái `ACTIVE` cho mỗi `AIAgent` tại một thời
  điểm. Sửa nội dung Prompt đang `ACTIVE` luôn tạo version mới ở `DRAFT`, không ghi đè
  (quy tắc nghiệp vụ #5 trong [DacTa.md](../01_Requirement/DacTa.md)).
- **`AIImpactAssessment` (AIA)**: dùng thêm trạng thái `NOT_ASSESSED` (mặc định khi Agent mới
  tạo, chưa có AIA) và `REVIEW_REQUIRED` (đến hạn `review_date` hoặc Agent đổi rủi ro/scope) —
  hai trạng thái này nằm ngoài chuỗi 8 bước trên, dùng làm cờ nhắc AI_ADMIN khởi tạo/rà soát AIA.
- **`AIGuardrail`/`AIPolicy`**: `status` sau khi `ACTIVE` có thể bị vô hiệu hóa
  (`DISABLED`, tương đương nhánh Hết hiệu lực) bởi AI_SECURITY_ADMIN, không cần đi lại từ đầu
  nếu chỉ tạm ngưng — chỉ tạo version mới khi đổi nội dung `action`/`severity`.

## Trạng thái vận hành (khác vòng đời phê duyệt)

`AIPlatform` (M35), `AIProvider`, `AIModel`, `AIAgent`, `AITool` dùng `status` vận hành riêng
(`ACTIVE`/`DISABLED`/`DEPRECATED`, hoặc `HEALTHY`/`DEGRADED`/`DOWN`/`UNKNOWN` cho Platform) —
đây là bật/tắt kỹ thuật, không phải quy trình phê duyệt nội dung, nên không dùng bảng trạng
thái 8 bước ở trên.
