# SPEC — 20260828-huy-va-het-hieu-luc-nen-tang

## 1. State machine bản ghi nền tảng (`AIPlatform.approvalStatus`)

Bám đúng ETV.P35 Phụ lục II.1. Cột "Lý do" là bắt buộc nhập, cột "Chặn phụ thuộc" là ràng buộc
§6.5.3.

| Từ | Thao tác | Tới | Lý do | Chặn phụ thuộc |
|---|---|---|---|---|
| DRAFT, RETURNED, REJECTED | Gửi soát xét | PENDING_REVIEW | — | — |
| PENDING_REVIEW | Soát xét đạt | PENDING_APPROVAL | — | — |
| PENDING_REVIEW | Trả lại | RETURNED | **Có** | — |
| PENDING_APPROVAL | Phê duyệt | APPROVED | — | — |
| PENDING_APPROVAL | Từ chối | REJECTED | **Có** | — |
| APPROVED | Đưa vào vận hành | ACTIVE | — | — |
| APPROVED, ACTIVE | Hết hiệu lực | ARCHIVED | **Có** | **Có** |
| DRAFT, PENDING_REVIEW, RETURNED, PENDING_APPROVAL, REJECTED | Hủy | CANCELLED | **Có** | **Có** |
| ARCHIVED, CANCELLED | (kết thúc — không thao tác nào) | | | |

Bốn hàng đầu và hàng "Đưa vào vận hành" đã có trong `rules.ts`; phần mới là **Hủy**, **chặn phụ
thuộc**, và đường ra giao diện cho những hàng đã có luật mà chưa có nút.

### Vì sao Hủy tách khỏi Hết hiệu lực
Hai nhánh khác nhau ở tập trạng thái nguồn, không phải hai tên gọi của một việc: Phụ lục II.1
trạng thái 9 định nghĩa Hủy là "bỏ bản ghi **trước khi phê duyệt**", còn trạng thái 8 (Hết hiệu
lực) là "đã ngừng vận hành hoặc bị thay thế" — đi qua phiếu F35.04 theo §6.5.2. Gộp một nút sẽ
làm mất phân biệt "chưa từng vận hành" với "đã vận hành rồi dừng" trong nhật ký, đúng thứ mà đoàn
đánh giá đọc.

### Chặn phụ thuộc (§6.5.3)
Đối tượng phụ thuộc = `AIAgent` và `AITool` có `platformId` trỏ tới nền tảng và `status = ACTIVE`.
Khi danh sách khác rỗng, thao tác bị **từ chối** với mã lỗi `DEPENDENTS_ACTIVE` và thông báo liệt
kê mã từng đối tượng (§6.5.3: "Hệ thống ManLab từ chối thao tác và chỉ ra danh sách đối tượng còn
phụ thuộc"). Áp cho cả nhánh Hủy: §6.7 cấm tác tử/công cụ trỏ tới nền tảng "đã Hủy", nên để một
công cụ đang chạy rơi vào trạng thái đó là tự tạo vi phạm.

Agent `SUSPENDED` **không** tính là phụ thuộc đang hoạt động — đó là agent đã bị khống chế, không
gọi được qua Tool Gateway (`AGENT_NOT_ACTIVE`).

## 2. Ràng buộc đăng ký công cụ mới (ETV.P35 §6.7)

`createTool` từ chối khi nền tảng đích không ở `APPROVED`/`ACTIVE`. Danh sách nền tảng trong form
đăng ký công cụ cũng chỉ liệt kê nền tảng ở hai trạng thái này. Không có bước này thì ngay sau khi
Hết hiệu lực một nền tảng vẫn đăng ký được công cụ mới lên nó — dựng lại đúng thứ vừa gỡ.

## 3. Giao diện — cột "Thao tác" bảng Platform

Chỉ hiện với vai trò có `platforms: write` (hiện là `SUPER_ADMIN` = LĐV, giữ nguyên).

| Trạng thái | Nút |
|---|---|
| Nháp / Không soát xét / Không phê duyệt | `Gửi soát xét` · `Hủy` |
| Chờ soát xét | `Soát xét đạt` · `Trả lại` · `Hủy` |
| Chờ phê duyệt | `Phê duyệt` · `Từ chối` · `Hủy` |
| Đã phê duyệt | `Đưa vào vận hành` · `Hết hiệu lực` |
| Hiệu lực | `Hết hiệu lực` |
| Hết hiệu lực / Hủy | (không nút — hiện dấu "—") |

Nút cần lý do mở một ô nhập ngay trong ô bảng: nhãn việc đang làm + `<textarea>` + `Xác nhận` /
`Bỏ qua`. Nút `Xác nhận` bị vô hiệu khi lý do rỗng — chặn ở giao diện, nhưng `rules.ts` vẫn kiểm
lại (`REASON_REQUIRED`), giao diện không phải nơi giữ luật.

Nút xóa: **không có**. Xem "WHAT NOT" trong [outcome.md](outcome.md).

## 4. Nhãn

`APPROVAL_STATUS_LABEL.ARCHIVED` đổi từ `"Hết hiệu lực/Hủy"` → `"Hết hiệu lực"`. Nhãn ghép cũ là
di sản của thời `CANCELLED` chưa tới được: nay hai trạng thái đều tới được, để nguyên sẽ có hai
huy hiệu cùng nói "Hủy".

## 5. Acceptance criteria

| # | Tiêu chí | Cách kiểm |
|---|---|---|
| AC1 | `cancel()` chỉ mở từ 5 trạng thái chưa phê duyệt, chặn `APPROVED`/`ACTIVE`/`ARCHIVED`/`CANCELLED` | test đơn vị |
| AC2 | `cancel()` và `archive()` từ chối khi thiếu lý do (`REASON_REQUIRED`), kể cả lý do toàn khoảng trắng | test đơn vị |
| AC3 | `archive()`/`cancel()` từ chối khi có phụ thuộc đang hoạt động, thông báo nêu tên đối tượng | test đơn vị |
| AC4 | `createTool` từ chối nền tảng `DRAFT`/`ARCHIVED`/`CANCELLED` | test đơn vị / thử trên CSDL thật |
| AC5 | Bảng Platform hiện đúng bộ nút theo trạng thái, ô nhập lý do hoạt động | trình duyệt thật |
| AC6 | Lý do được ghi vào `AIAuditLog` | truy vấn CSDL sau khi bấm |

## 6. NFR
Không đổi lược đồ CSDL, không migration. Không đổi ma trận RBAC. Không đổi API công khai.
