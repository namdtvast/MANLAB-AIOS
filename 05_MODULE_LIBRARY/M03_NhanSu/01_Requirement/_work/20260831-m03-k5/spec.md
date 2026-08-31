# M03 — Chốt K5: thẻ kiểm định viên (Tier M)

Khoảng cách K5 tại [`03_Database/DataModel.md`](../../../03_Database/DataModel.md) §4. Tiếp nối increment [`20260831-m03-k2-k3-k4`](../20260831-m03-k2-k3-k4) — chỗ đó đã cố ý để lại phần bằng chứng ủy quyền cho K5.

## Vì sao K5 không chỉ là "thêm 4 cột"

Đối chiếu lại bản kết xuất `vw_tb_qlManLab_NhanSu` ngày 31/08/2026 ở bốn cột thẻ KĐV cho ra bốn con số quyết định thiết kế:

| Phát hiện | Số liệu | Hệ quả thiết kế |
|---|---|---|
| **Thẻ đã hết hạn mà không ai biết** | **11/27** thẻ có ngày hết hạn đã quá hạn tính đến 31/08/2026 | Đây là lý do K5 tồn tại. Gần một nửa số kiểm định viên đang giữ thẻ hết hiệu lực; không có cảnh báo nào nên không ai thấy |
| **Ngày cấp và ngày hết hạn bị nhập đảo** | **5 bản ghi** ghi cấp `2031-03-31`, hết hạn `2026-03-31` — cùng quyết định `475/SKHCN` với 13 thẻ khác ghi đúng chiều | Cần hàm kiểm tra tính hợp lý của cặp ngày, không chỉ lưu hai cột |
| **Số thẻ trùng giữa hai người** | Thẻ `3961` xuất hiện ở 2 nhân sự | Quyết định phạm vi unique (xem dưới) |
| **Thẻ và lĩnh vực gần như phủ nhau nhưng không hoàn toàn** | 26 người có cả hai · 2 chỉ có thẻ · 3 chỉ có lĩnh vực | Liên kết thẻ ↔ lĩnh vực phải **nullable** |

Hạn thẻ quan sát được là **đúng 5 năm** (`2026-03-31` → `2031-03-31`, chênh 1826 ngày).

## OUTCOME

- **WHO** — QLKT (xác nhận năng lực kỹ thuật), Văn phòng (theo dõi hạn thẻ), LĐV (phân công người ký kết quả).
- **WHAT** — mô hình hoá thẻ kiểm định viên như **bằng chứng ủy quyền** cho lĩnh vực kiểm định (K4), kèm logic tính trạng thái hiệu lực.
- **WHY** — [`ETV.P05` §6.2](../../../../../03_MANAGEMENT_SYSTEM/02_P/ETV.P05_ThietBi.md): *"Chỉ kiểm định viên đã được Tổng cục TCĐLCL chứng nhận, cấp thẻ và được ETV phân công mới được sử dụng"* chuẩn đo lường. [`ETV.P11` §6.3](../../../../../03_MANAGEMENT_SYSTEM/02_P/ETV.P11_BaoCao.md): người thực hiện kiểm định để ký GCN *"phải là kiểm định viên đo lường đã được chứng nhận, cấp thẻ"*. Thẻ hết hạn là điều kiện **chặn**, không phải thông tin tham khảo.
- **SUCCESS CRITERIA**
  1. Cả 5 bản ghi có ngày đảo bị hàm kiểm tra bắt được, nêu đúng tên vấn đề.
  2. Phân biệt được 4 trạng thái: còn hiệu lực · sắp hết hạn · đã hết hạn · thiếu ngày hết hạn.
  3. Người mở hồ sơ nhân sự **nhìn thấy** thẻ hết hạn mà không phải tự tính ngày.

## SPEC

### Model `M03InspectorCard`

| Trường | Kiểu | Ghi chú |
|---|---|---|
| `employeeId` | FK | `onDelete: Cascade` |
| `cardNumber` | `String` | Hai định dạng cùng tồn tại: `0186-01` (21 thẻ, cấp theo quyết định của ETV) và số trần 4 chữ số `3961` (7 thẻ, cấp trước đó) — **không chuẩn hoá lại**, giữ nguyên chuỗi gốc |
| `decisionNumber` | `String?` | Số QĐ cấp thẻ. **Không unique** — một quyết định cấp cho nhiều người (`475/SKHCN` cấp 13 thẻ) |
| `issuedAt` | `DateTime?` | |
| `expiresAt` | `DateTime?` | Nullable vì 1 bản ghi có thẻ mà thiếu ngày hết hạn |

**Nhiều thẻ trên một nhân sự** — thẻ hết hạn thì cấp thẻ mới, bản cũ giữ lại làm lịch sử. Thẻ hiện hành = thẻ có `expiresAt` xa nhất, tính bằng `currentInspectorCard()` chứ không lưu cờ, để không phải giữ đồng bộ một trường dẫn xuất.

### Phạm vi unique — `@@unique([employeeId, cardNumber])`, KHÔNG unique toàn cục

Số thẻ `3961` đang trùng ở hai nhân sự. Về nguyên tắc số thẻ do TĐC cấp phải duy nhất, nên unique toàn cục là ràng buộc "đúng" — nhưng nó sẽ **chặn toàn bộ 145 bản ghi** vì một dòng sai mà ở đây chưa xác định được dòng nào sai.

Chọn: unique trong phạm vi một nhân sự (chặn nhập trùng thẻ cho cùng người), cộng với hàm `duplicateCardNumbers()` báo cáo trùng lặp chéo. Đánh đổi được ghi nhận rõ: **ràng buộc này không tự chặn được trùng số thẻ giữa hai người** — nó chỉ làm cho lỗi đó hiện ra thay vì chặn di trú. Khi Văn phòng làm sạch xong, nâng lên unique toàn cục là một migration nhỏ.

### Liên kết tới lĩnh vực (K4)

`M03EmployeeField.cardId String?` — thẻ làm bằng chứng cho lĩnh vực đó.

**Nullable, không bắt buộc**, vì dữ liệu thật có 3 người được gán lĩnh vực mà chưa có thẻ. Bắt buộc FK sẽ hoặc chặn di trú 3 người đó, hoặc buộc bịa ra thẻ giả cho họ.

### Logic — `src/lib/m03/rules.ts` (thuần hàm, theo đúng mẫu `isReviewDue`/`isMaintenanceDue` của M33/M34)

| Hàm | Trả về |
|---|---|
| `inspectorCardState(card, now?, expiringSoonDays?)` | `VALID` · `EXPIRING_SOON` · `EXPIRED` · `NO_EXPIRY` |
| `currentInspectorCard(cards)` | Thẻ có `expiresAt` xa nhất; thẻ thiếu ngày xếp sau |
| `validateInspectorCard(card)` | Danh sách vấn đề: thiếu số thẻ · thiếu ngày hết hạn · **ngày cấp ≥ ngày hết hạn** |
| `duplicateCardNumbers(cards)` | Các số thẻ dùng cho nhiều nhân sự |
| `canPerformInspection(cards, now?)` | Có thẻ còn hiệu lực không — hiện thực điều kiện chặn của `ETV.P05` §6.2 |

**`expiringSoonDays` mặc định 90 — con số này chưa có căn cứ trong thủ tục.** `ETV.P05` §6.2 và `ETV.P11` §6.3 quy định thẻ hết hạn thì không được thực hiện, nhưng **không** quy định phải cảnh báo trước bao lâu. 90 ngày là tham số đặt sẵn để có cảnh báo, không phải quy định của Viện — đề nghị LĐP chốt con số thật; đổi chỉ là sửa một hằng số.

### Giao diện — chỉ hiển thị, không thêm thao tác

Thêm một mục **"Năng lực kiểm định"** vào trang hồ sơ nhân sự: lĩnh vực được ủy quyền (K4 hiện chưa hiện ở đâu cả) + thẻ hiện hành + huy hiệu trạng thái hạn thẻ.

Chỉ đọc, không nút bấm, không đổi phân quyền, không thêm bước nghiệp vụ → **`HDSD.yaml` chỉ thêm một dòng `tips`**, không thêm `steps`.

Không có mục này thì hàm cảnh báo hết hạn là mã chết — dữ liệu vào được CSDL nhưng không ai nhìn thấy, tức đúng nguyên trạng đang có trên ManLab.

### Ngoài phạm vi

- **Không** chặn ký kết quả ở M10/M11 — `canPerformInspection()` là hàm để hai module đó gọi khi tới lượt chúng; nối dây thuộc increment của chính chúng.
- **Không** sửa `f03-08.ts` (vẫn 11 cột, biểu mẫu 17 cột còn là dự thảo `status: Nhap`).
- **Không** làm sạch dữ liệu ManLab — 5 bản ghi ngày đảo, 1 thẻ trùng, 1 số QĐ ghi `test1` là việc của Văn phòng trên ManLab.

## Acceptance Criteria

| # | Tiêu chí | Cách kiểm |
|---|---|---|
| AC1 | Schema hợp lệ, client sinh được | `prisma validate` · `prisma generate` |
| AC2 | Migration chỉ toàn lệnh cộng thêm | Đọc SQL |
| AC3 | 5 ca ngày đảo bị bắt | Test `validateInspectorCard` |
| AC4 | 4 trạng thái phân biệt đúng, kể cả ở ranh giới đúng ngày hết hạn | Test `inspectorCardState` |
| AC5 | Thẻ hiện hành chọn đúng khi có nhiều thẻ | Test `currentInspectorCard` |
| AC6 | Không hồi quy | `npm test` ≥ 504 test cũ vẫn xanh |
| AC7 | HDSD hợp lệ | `npm run kiem-tra-hdsd` |
| AC8 | Cấu trúc repo nguyên vẹn | `python3 _meta/validate_links.py` |
