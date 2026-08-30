# VERIFY — 20260830-ly-do-vo-hieu-hoa-tool

Ngày 30/08/2026. Tier **S**. Nguồn: mục 1 phần "Việc còn lại" của lượt sáng cùng ngày
([`_work/20260830-vo-hieu-hoa-provider-model-skill/verify.md`](../20260830-vo-hieu-hoa-provider-model-skill/verify.md)),
người dùng yêu cầu làm nốt.

## Vấn đề

Lượt trước thêm `OpStatusToggle` cho Provider/Model/Skill với ô nhập lý do bắt buộc, nhưng để
nguyên `ToolStatusToggle` cũ — nút bấm phát đổi luôn, không hỏi gì. Hệ quả trên cùng **một trang**:

| | Vô hiệu hóa | Dòng để lại trong nhật ký thay đổi cấu hình |
|---|---|---|
| Provider, Model, Skill | hỏi lý do | lý do thật, vd "Kỹ năng trùng lặp, gộp vào TraCuuTaiLieu" |
| Tool | bấm phát đổi luôn | đúng chữ `"update"` — không cho biết vì sao |

ETV.P29 mục 6.3 xếp Công cụ vào cùng bảng "Các đối tượng khác" với chuỗi *Đăng ký → Đang hiệu lực →
**Vô hiệu hóa***, và câu cuối mục đó đòi lý do cho mọi nhánh kết thúc. Hai dòng `"update"` trong
nhật ký (22/08 và 29/08) là bằng chứng lỗ hổng này đã sinh dữ liệu thật.

## Đã sửa

- `actions.ts`: **bỏ** `setToolStatus()`; `datTrangThaiVanHanh()` nhận thêm `kind: "tool"` (kiểu
  xuất `OpStatusKind`). Một đường ghi trạng thái vận hành cho cả bốn sổ.
- `RegistryActions.tsx`: **bỏ** `ToolStatusToggle`; `OpStatusToggle` nhận `kind: OpStatusKind`.
- `page.tsx`: bảng Tool dùng `<OpStatusToggle kind="tool" …>`, nới `min-w` 36rem → 44rem cho vừa ô
  nhập lý do.
- `HDSD.yaml`: nói rõ cả bốn sổ đều bắt buộc lý do, và **riêng Công cụ không bị chặn phụ thuộc**.

## Quyết định: Công cụ KHÔNG có chốt phụ thuộc

Ba sổ kia bị chặn khi còn bản ghi `ACTIVE` trỏ tới. Công cụ **cố ý không**, dù Agent whitelist nó
qua `toolIds`:

1. **ETV.P29 mục 5.7.3 bước 1** đặt "vô hiệu hóa công cụ liên quan" làm **bước khống chế khẩn cấp**
   khi có sự cố AI, ngang hàng với tạm dừng tác tử. Chặn thao tác này vì "còn tác tử đang dùng" là
   khóa mất đúng cái van cần mở nhất, đúng lúc cần nhất.
2. **Không cần chặn**: Tool Gateway đã từ chối `TOOL_DISABLED` ngay tại cổng
   ([`gateway.ts:55`](../../../../../09_ENGINEERING/aios-platform/src/lib/m29/gateway.ts)), nên tác
   tử whitelist một công cụ đã vô hiệu hóa cũng không gọi được. Chặn thêm ở đây chỉ là rào thừa.

Lý do này ghi ngay trong chú thích `activeOpDependents()` để lần sau không ai "sửa cho nhất quán".

## Đối chiếu trích dẫn (làm tay, công cụ không bắt được "đúng tên sai mục")

| Trích dẫn | Mục thật trong `ETV.P29_QuanLyTriTueNhanTao.md` | Kết luận |
|---|---|---|
| mục 6.3 — Công cụ: Đăng ký → Đang hiệu lực → Vô hiệu hóa | dòng 515, bảng "Các đối tượng khác" | **Đúng** |
| mục 6.3 câu cuối — mọi nhánh kết thúc ghi lý do | dòng 517 | **Đúng** |
| mục 5.7.3 bước 1 — khống chế trước bằng vô hiệu hóa công cụ | dòng 455 `#### 5.7.3. Xử lý`, gạch đầu dòng 1 | **Đúng** (bản nháp đầu ghi 5.7.1, đã sửa — 5.7.1 là mục khác) |

## Kết quả

| # | Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|---|
| 1 | Bộ test | **PASS** | `npm test` → 24 tệp / 496 ca đạt (không đổi — thay đổi nằm ở tầng `actions`/giao diện, tầng `rules` giữ nguyên) |
| 2 | `tsc --noEmit` · `npx eslint src` | **PASS** | không phát sinh dòng nào |
| 3 | `kiem-tra-hdsd` | **PASS** | `M29_AI/04_UI/HDSD.yaml — 11 bước, 1 lưu ý` |
| 4 | Kích hoạt lại không hỏi lý do | **PASS** | Trình duyệt thật: `M10_KpiSummary` `DISABLED → ACTIVE` một nhịp, không hiện ô nhập |
| 5 | Vô hiệu hóa bắt buộc lý do | **PASS** | Ô nhập hiện ra; nút "Xác nhận vô hiệu hóa" vô hiệu khi rỗng **và** khi chỉ có khoảng trắng |
| 6 | Lý do vào nhật ký kiểm toán | **PASS** | `tools \| status \| "ACTIVE" → "DISABLED" \| "Khống chế sự cố F29.04/2026-03 — công cụ trả số liệu sai"` — thay cho chữ `"update"` của hai dòng cũ |
| 7 | Trả môi trường về như cũ | **PASS** | `M10_KpiSummary` về `DISABLED` như trước; 2 dòng `AIAuditLog` của lượt đo đã xóa (79 → 79) |

## Không kiểm được lần này

**Nhánh "công cụ không bị chặn dù tác tử ACTIVE còn whitelist"** chưa chạy được trên dữ liệu thật:
`AGENT_COPILOT_TRACUU` có `toolIds` rỗng, còn `AGENT_TROLY_M29` — tác tử duy nhất whitelist
`M10_KpiSummary` — đang `SUSPENDED` (`MODEL_CHANGED`, do người dùng đổi mô hình lúc 01:47 cùng
ngày). Không dựng dữ liệu giả để ép nhánh này vì CSDL dev đang có người dùng thao tác song song.
Bảo đảm ở mức mã: `activeOpDependents()` trả `[]` ngay dòng đầu khi `kind === "tool"`, không chạy
truy vấn nào — nên không có đường nào sinh ra `DEPENDENTS_ACTIVE` cho công cụ.

`actions.ts` vẫn chưa có test (nợ từ 25/08), nên `datTrangThaiVanHanh()` và `activeOpDependents()`
tiếp tục chỉ được kiểm bằng tay.

## Việc còn lại — không thuộc phạm vi lần này

1. **Không có bộ lọc "ẩn bản ghi đã kết thúc"** — danh mục vẫn liệt kê cả bản ghi Hết hiệu lực/Hủy/
   Vô hiệu hóa. Đúng về truy vết nhưng khó đọc khi sổ dài.
2. **Hai dòng `AIAuditLog` cũ của Tool vẫn mang lý do `"update"`** (22/08, 29/08). Nhật ký là bảng
   chỉ-thêm nên **không sửa** — đây là dấu vết đúng của thời kỳ phần mềm chưa hỏi lý do.
