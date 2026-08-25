# VERIFY — 20260825-vong-doi-hieu-luc-nen-tang

Ngày 25/08/2026. Tier **M** (đổi state machine). Nguồn: soát xét ETV.GAI 01 điểm 2 → truy ra lỗi ở mã, không ở tài liệu.

## Vấn đề tìm được

Soát xét cho rằng `DRAFT → APPROVED → ACTIVE` trong GAI01 là sai mô hình. **Không phải** — `AIApprovalStatus` có `ACTIVE` ("Hiệu lực"), khớp `StateMachine.md` trạng thái 7 và ETV.P35 §6.1.7 bước 6. Nhưng đi kiểm thì phát hiện **phần mềm chưa hiện thực trạng thái đó**, gồm ba lỗ hổng liên đới:

| # | Lỗ hổng | Hệ quả |
|---|---|---|
| 1 | `approvalTransitions` không có chuyển tiếp nào tới `ACTIVE`; giao diện chỉ có submit/review/approve | `ACTIVE` là trạng thái **không bao giờ tới được** qua đường nghiệp vụ — chỉ đặt được bằng seed hoặc sửa thẳng CSDL |
| 2 | `checkHealthAction()` lọc `approvalStatus: "APPROVED"` | Nền tảng chuyển Hiệu lực **rơi khỏi vòng dò sức khoẻ** — làm đúng ETV.P35 bước 6 thì giám sát im lặng ngừng chạy |
| 3 | `archive()` chỉ nhận `APPROVED` | Nền tảng đang Hiệu lực **không ngừng vận hành được** (trái ETV.P35 §6.5) |

`guardrails.ts:145` đã dùng đúng `{ in: ["APPROVED", "ACTIVE"] }` từ trước — nên đây là điểm lệch của `actions.ts`, không phải lựa chọn thiết kế.

## Đã sửa

- `rules.ts`: thêm `activate()` (chỉ từ `APPROVED`); `archive()` nhận cả `APPROVED` và `ACTIVE`.
- `actions.ts`: thêm hành động `activate`; vòng dò sức khoẻ lọc `{ in: ["APPROVED", "ACTIVE"] }`.
- `RegistryActions.tsx`: nút **"Đưa vào vận hành"** hiện khi bản ghi ở `APPROVED`.
- `adapters.ts`: sửa chú thích khẳng định sai rằng nền tảng nội bộ được nhận tài liệu mức Hạn chế — nay dẫn đúng ETV.GAI 01 §3.7 sau soát xét.
- `rules.test.ts`: 2 ca mới.

## Kết quả

| # | Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|---|
| 1 | Bộ test | **PASS** | `npm test` → 13 tệp / **212 ca đạt** (thêm 2 ca so với 210) |
| 2 | Kiểm kiểu + dựng bản phát hành | **PASS** | `npm run build` → "Compiled successfully", TypeScript qua |
| 3 | ESLint | **PASS** | 0 lỗi; 2 cảnh báo có sẵn ở `seed.ts:2524,2532`. Đã dọn thêm 2 cảnh báo do lượt trước để lại ở `adapters-local.test.ts` |
| 4 | **Vòng dò sức khoẻ nhận nền tảng Hiệu lực** | **PASS** | Chạy hai bộ lọc trên CSDL thật, trước/sau khi đưa MANLAB sang `ACTIVE`:<br>`CŨ (APPROVED)` → mất `MANLAB`<br>`MỚI (APPROVED+ACTIVE)` → giữ `MANLAB` |
| 5 | Giao diện hiển thị trạng thái Hiệu lực | **PASS** | Trang `/modules/M29/registry` trên dev server thật: `MANLAB … Hiệu lực`, và nút "Đưa vào vận hành" biến mất đúng ở hàng đó |
| 6 | Nút "Đưa vào vận hành" hiện đúng điều kiện | **PASS** | Hiện ở 4 bản ghi `APPROVED`, không hiện ở bản ghi `DRAFT` (`MANLAB_LOCAL_LLM` vẫn là "Gửi soát xét") |
| 7 | **Bấm nút chạy hết luồng qua giao diện** | **BLOCKED** | Không kích hoạt được click qua công cụ trình duyệt: React đã hydrate (`__reactFiber`/`__reactProps` có mặt, `onClick` là hàm, nút không bị vô hiệu, `elementFromPoint` trả đúng nút), nhưng cả click lẫn phím Enter đều không sinh yêu cầu server action nào — không có bản ghi mạng, không có `AIAuditLog`, không đổi trạng thái. Đã thử khởi động lại dev server, không đổi. Đây là hạn chế của công cụ, **không** kết luận được mã sai hay đúng. |
| 8 | Trạng thái dữ liệu dùng chung | **PASS** | Đã trả `MANLAB` về `APPROVED` sau khi đo, xoá script tạm — môi trường về đúng như trước |

## Điều chưa được kiểm

Mục 7. Logic chuyển tiếp đã được phủ bằng ca test đơn vị (`activate` từ đủ 7 trạng thái nguồn, `archive` từ `ACTIVE`), và tầng hành động chỉ nối `approvalAction("platform", id, "activate")` vào `approvalTransitions.activate` theo đúng khuôn ba hành động đã có. Nhưng **chưa có bằng chứng chạy thật một lượt bấm nút**. Cần một người bấm thử trên trình duyệt trước khi coi phần giao diện là đã nghiệm thu.

## Việc còn lại — không thuộc phạm vi lần này

1. **Trạng thái `CANCELLED`** có trong enum kèm chú thích dẫn ETV.P35 mục 6 trạng thái 9, nhưng cũng **không có chuyển tiếp nào** tới nó — cùng loại lỗi vừa sửa, chưa xử lý.
2. **`actions.ts` chưa có test.** Bộ test hiện chỉ phủ `rules.ts` và các mô-đun logic thuần; tầng hành động (phân quyền, ghi audit, revalidate) chưa có ca nào — đây là lý do lỗi vòng dò sức khoẻ sống sót qua CI.
