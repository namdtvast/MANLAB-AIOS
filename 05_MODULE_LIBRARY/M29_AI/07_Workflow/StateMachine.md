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
| 8 | Hết hiệu lực (ARCHIVED) | Đã ngừng vận hành hoặc bị thay thế — chỉ mở từ Đã phê duyệt/Hiệu lực | người có thẩm quyền | (kết thúc) | **Có** |
| 9 | Hủy (CANCELLED) | Bỏ bản ghi **trước khi phê duyệt** — chỉ mở từ trạng thái 1–5 | người có thẩm quyền | (kết thúc) | **Có** |

### Hai nhánh kết thúc và chuyện không có nút "Xóa"

Trạng thái 8 và 9 **không** phải hai tên gọi của một việc: `ARCHIVED` chỉ mở từ `APPROVED`/`ACTIVE`
(đã vận hành rồi dừng, đi qua phiếu `ETV.P.F 35.04` theo ETV.P35 §6.5.2), `CANCELLED` chỉ mở từ 5
bước chưa phê duyệt (ETV.P35 Phụ lục II.1 trạng thái 9). Gộp lại thì nhật ký mất phân biệt "chưa
từng vận hành" với "đã vận hành rồi dừng".

Bản ghi nền tảng **không có thao tác xóa**, kể cả bản ghi Nháp lập nhầm: ETV.P35 §6.1.8 cấm cấp lại
mã nền tảng đã Hủy/Hết hiệu lực "nhằm giữ nguyên giá trị truy vết của nhật ký lịch sử" — xóa cứng
làm mã trở lại tự do và cắt đứt vết kiểm toán. **Hủy** là nhánh nghiệp vụ thay cho xóa.

**Chặn cứng khi kết thúc vòng đời** (ETV.P35 §6.5.3): cả hai nhánh bị từ chối (`DEPENDENTS_ACTIVE`)
khi còn `AIAgent` hoặc `AITool` ở `status = ACTIVE` trỏ tới nền tảng; thông báo liệt kê mã từng đối
tượng. Agent `SUSPENDED` không tính — đã bị Tool Gateway chặn (`AGENT_NOT_ACTIVE`).

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

## Increment 4 — sự cố AI, AI chưa đăng ký, tạm dừng tác tử

**Phiếu sự cố AI (`AIIncident`)** — ETV.P29 mục 6.3:

`NEW` → `IN_PROGRESS` (bắt buộc có biện pháp khống chế) → `PENDING_CONFIRMATION` → `CLOSED`.
Nhánh `CANCELLED` mở từ mọi trạng thái chưa kết thúc, chỉ SUPER_ADMIN và bắt buộc lý do.
Điều kiện đóng: người phát hiện không tự đóng · `SEVERE` chỉ SUPER_ADMIN · `SEVERE`/`SIGNIFICANT`
bắt buộc mã KPH (MP13) · lộ dữ liệu nhạy cảm bắt buộc số phiếu F28.03 · ảnh hưởng kết quả đã phát
hành bắt buộc mã hồ sơ MP10/MP11.

**Hệ thống AI chưa đăng ký (`AIUnregisteredSighting`)** — ETV.P29 mục 5.1.7:

`OPEN` → `REGISTERING` → `REGISTERED` (bắt buộc trỏ Agent thật) hoặc `DISCONTINUED` (bắt buộc lý
do). Bản ghi có `sensitive_data = true` không đóng được ở cả hai nhánh khi chưa gắn phiếu sự cố.

**Trạng thái `SUSPENDED` của `AIAgent`** — không phải vòng đời phê duyệt, mà là khống chế vận hành:

| Nguyên nhân | Ai/cái gì đặt | Gỡ thế nào |
|---|---|---|
| `AIA_OVERDUE` | Hệ thống quét theo lịch khi AIA quá `review_date` (actor = SYSTEM) | Tự gỡ khi AIA được phê duyệt lại |
| `INCIDENT:<mã>` | Lập phiếu sự cố mức Nghiêm trọng có gắn Agent | Người có thẩm quyền mở lại có chủ đích, bắt buộc ghi lý do |

Tool Gateway chặn mọi lời gọi thay mặt Agent không ở `ACTIVE` (mã lỗi `AGENT_NOT_ACTIVE`) — bước
kiểm tra này bổ sung ở Increment 4, đặt ngay sau bước xác thực Agent tồn tại.
