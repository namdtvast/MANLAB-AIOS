# VERIFY — 20260828-huy-va-het-hieu-luc-nen-tang

Ngày 28/08/2026. Tier **M**. Nguồn: người dùng nhìn bảng Platform ở `/modules/M29/registry` với vai
trò `SUPER_ADMIN` và hỏi "không có chức năng Hết hiệu lực hay Hủy hay Xóa?".

## Vấn đề tìm được

Câu hỏi đúng, và trúng đúng chỗ lượt trước đã tự ghi là còn nợ
([`_work/20260825-vong-doi-hieu-luc-nen-tang/verify.md`](../20260825-vong-doi-hieu-luc-nen-tang/verify.md)
mục "Việc còn lại"):

| # | Lỗ hổng | Hệ quả |
|---|---|---|
| 1 | `CANCELLED` có trong enum kèm chú thích dẫn ETV.P35 Phụ lục II trạng thái 9 nhưng **không chuyển tiếp nào** tới nó | Trạng thái không bao giờ tới được — cùng loại lỗi đã sửa cho `ACTIVE` lần trước |
| 2 | `archive()` có trong `rules.ts`/`actions.ts` nhưng **không nút giao diện nào gọi tới** | Ngừng vận hành một nền tảng phải sửa thẳng CSDL |
| 3 | Nhánh Trả lại/Từ chối có luật (kèm lý do) nhưng giao diện chỉ có nút đi thẳng | Không trả lại được hồ sơ sai; `RETURNED`/`REJECTED` là ngõ cụt trên giao diện dù `submit()` nhận cả hai |
| 4 | ETV.P35 §6.5.3 (chặn cứng khi còn tác tử/công cụ trỏ tới) **chưa hiện thực** | Ngừng vận hành được một nền tảng vẫn đang có Agent gọi qua Tool Gateway |
| 5 | ETV.P35 §6.7 (không đăng ký công cụ vào nền tảng chưa phê duyệt/đã kết thúc) **chưa hiện thực** | Sau khi Hết hiệu lực vẫn treo được công cụ mới lên nền tảng đó |

## Đã sửa

- `rules.ts`: thêm `approvalTransitions.cancel()` (chỉ mở từ 5 bước chưa phê duyệt, bắt buộc lý do);
  `archive()` đổi thông báo cho khỏi lẫn với Hủy, kiểm `reason.trim()`; hàm `dependentsBlock()` dùng
  chung cho hai nhánh kết thúc, thông báo **liệt kê tên** đối tượng còn phụ thuộc theo §6.5.3.
- `actions.ts`: `approvalAction` nhận `"cancel"`; nạp `activePlatformDependents()` (Agent + Tool ở
  `status = ACTIVE`) cho hai nhánh kết thúc; `createTool` chặn nền tảng ngoài `APPROVED`/`ACTIVE`.
- `RegistryActions.tsx`: bộ nút đầy đủ theo trạng thái + ô nhập lý do tại chỗ; hai trạng thái kết
  thúc hiện "—".
- `page.tsx`: danh sách nền tảng của form đăng ký công cụ lọc theo `APPROVED`/`ACTIVE`.
- `labels.ts`: `ARCHIVED` đổi `"Hết hiệu lực/Hủy"` → `"Hết hiệu lực"` (nhãn ghép là di sản của thời
  `CANCELLED` chưa tới được).
- `rules.test.ts`: 3 ca mới (34 → 37 ca trong tệp).
- Tài liệu: `StateMachine.md` (tách trạng thái 8/9, thêm mục chặn cứng và mục "không có nút Xóa"),
  `DacTa.md`, `HDSD.yaml` (thêm bước của Lãnh đạo Viện).

## Không làm: nút "Xóa"

ETV.P35 **§6.1.8** quy định mã nền tảng đã Hủy hoặc Hết hiệu lực **không được cấp lại**, "nhằm giữ
nguyên giá trị truy vết của nhật ký lịch sử". Xóa cứng bản ghi làm mã trở lại tự do và cắt đứt vết
kiểm toán — trái ETV.P35 và trái yêu cầu vết kiểm toán của ISO/IEC 42001. Lược đồ cũng đã chặn sẵn
(`AIProvider → AIPlatform` khai `onDelete: Restrict`). **Hủy** là nhánh nghiệp vụ thay cho xóa.

## Đối chiếu trích dẫn (làm tay, công cụ không bắt được "đúng tên sai mục")

| Trích dẫn | Mục thật trong `ETV.P35_QuanLyNenTangSo.md` | Kết luận |
|---|---|---|
| §6.1.8 — mã không cấp lại | dòng 319 `#### 6.1.8. Mã nền tảng` | **Đúng** (bản nháp đầu ghi §6.1.7, đã sửa) |
| §6.5.2 bước 4 — phê duyệt ngừng vận hành, bắt buộc lý do | dòng 401 bảng trình tự, bước 4 LĐV | **Đúng** |
| §6.5.3 — chặn cứng khi còn phụ thuộc | dòng 412 `#### 6.5.3. Điều kiện chặn cứng khi ngừng vận hành` | **Đúng** |
| §6.7 — công cụ không trỏ nền tảng chưa duyệt/đã kết thúc | dòng 427, gạch đầu dòng 2 | **Đúng** |
| Phụ lục II.1 trạng thái 8, 9 | dòng 524–525 | **Đúng** |

## Kết quả

| # | Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|---|
| 1 | Bộ test | **PASS** | `npm test` → 23 tệp / **458 ca đạt** (455 → 458) |
| 2 | Dựng bản phát hành | **PASS** | `npm run build` → "Compiled successfully" |
| 3 | ESLint | **PASS** | `npx eslint src` → không phát sinh dòng nào |
| 4 | `validate_links.py` | **PASS** | "564 link · 46 MP · 38 M · 22 CAP. Vấn đề: 0" |
| 5 | `validate_citations.py` | **PASS** | "836 trích dẫn · 48 thủ tục. Trích dẫn hỏng: 0" |
| 6 | Bộ nút đúng theo trạng thái | **PASS** | Trình duyệt thật, chạy hết một vòng trên `MANLAB_LOCAL_LLM`:<br>`Nháp → Gửi soát xét \| Hủy` · `Chờ soát xét → Soát xét đạt \| Trả lại \| Hủy` · `Không soát xét → Gửi soát xét \| Hủy` · `Chờ phê duyệt → Phê duyệt \| Từ chối \| Hủy` · `Không phê duyệt → Gửi soát xét \| Hủy` |
| 7 | **Chặn cứng §6.5.3** | **PASS** | Bấm "Hết hiệu lực" trên `MANLAB` (1 agent + 1 tool đang `ACTIVE`) → bị từ chối, trạng thái giữ nguyên "Đã phê duyệt", thông báo: "Không chuyển sang Hết hiệu lực được khi còn 2 đối tượng đang hoạt động trỏ tới nền tảng này (ETV.P35 §6.5.3): tác tử `AGENT_TROLY_M29`, công cụ `M10_KpiSummary`" |
| 8 | Hết hiệu lực đường thuận | **PASS** | `VICONNECT` (Hiệu lực, 0 phụ thuộc) → `ARCHIVED`, hàng chuyển sang hiện "—" |
| 9 | Hủy đường thuận | **PASS** | `MANLAB_LOCAL_LLM` (Nháp) → `CANCELLED` |
| 10 | Bắt buộc lý do | **PASS** | Nút "Xác nhận" vô hiệu khi ô rỗng **và** khi chỉ có khoảng trắng; `rules.ts` vẫn kiểm lại (`REASON_REQUIRED`, có ca test) |
| 11 | Lý do vào nhật ký kiểm toán | **PASS** | `AIAuditLog`: `platforms \| SUPER_ADMIN \| approvalStatus \| "ACTIVE" → "ARCHIVED" \| F35.04/2026-02 — nhà cung cấp chấm dứt dịch vụ` |
| 12 | **Chặn §6.7 phía máy chủ** | **PASS** | Tiêm thêm `<option>` nền tảng Nháp vào `select` rồi gửi form (mô phỏng client vượt rào bộ lọc giao diện) → server từ chối: "Nền tảng MANLAB_LOCAL_LLM đang ở trạng thái Nháp — chỉ nền tảng Đã phê duyệt hoặc Hiệu lực mới nhận công cụ mới (ETV.P35 §6.7)"; không bản ghi `AITool` nào được tạo |
| 13 | Bộ lọc §6.7 trên giao diện | **PASS** | Danh sách nền tảng trong form đăng ký công cụ chỉ còn `ANTHROPIC_API`, `GEMINI_API`, `MANLAB` — vắng nền tảng Nháp và nền tảng đã kết thúc |
| 14 | Trả môi trường về như cũ | **PASS** | CSDL dev dùng chung: 5 nền tảng về đúng trạng thái ban đầu (`APPROVED/ACTIVE/APPROVED/DRAFT/ACTIVE`); 5 dòng `AIAuditLog` do lượt đo sinh ra đã xóa, chỉ còn 2 dòng có từ 25/08 |

Mục 7 của lượt trước (**BLOCKED**: "không kích hoạt được click qua công cụ trình duyệt") **nay đã
gỡ**: server action kích hoạt được bình thường bằng `element.click()` sau khi đặt giá trị qua native
setter — cả 9 lượt bấm ở mục 6–9 và 12 đều đi tới máy chủ và ghi nhật ký.

## Việc còn lại — không thuộc phạm vi lần này

1. **`actions.ts` vẫn chưa có test** (nợ từ lượt 25/08): phân quyền, ghi audit, hàm
   `activePlatformDependents()` mới thêm đều chỉ được kiểm bằng tay trên trình duyệt.
2. **`AIProvider`, `AIModel`, `AISkill` chưa có thao tác nào trên giao diện** — ba danh mục này dùng
   `status` vận hành (`AIOpStatus`), không phải vòng đời phê duyệt, và hiện chỉ hiển thị đọc; muốn
   ngừng dùng một model phải sửa CSDL. Cùng loại lỗ hổng "luật có, đường đi không có", nhưng khác
   thủ tục nên tách lượt.
3. **Guardrail/Policy dùng chung `approvalAction`** nên đã có sẵn `cancel`, song hai đối tượng này
   chưa có trang giao diện nào.
