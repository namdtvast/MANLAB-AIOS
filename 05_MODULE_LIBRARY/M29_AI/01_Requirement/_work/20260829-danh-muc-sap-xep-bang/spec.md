# 20260829-danh-muc-sap-xep-bang — Trang Danh mục M29 xếp theo thứ bậc, năm sổ đều thành bảng

Tier **M** (7 file giao diện, không đụng lược đồ DB, không đổi API contract, không đổi phân quyền).
Căn cứ: yêu cầu vận hành trực tiếp — người dùng báo trang Danh mục "đang thấy phức tạp".

## RECON

| Loại | Nội dung |
|---|---|
| [FACT] | Thứ tự mục hiện tại là `Platform → Tool → (lưới 2 cột: Provider, Model) → Skill`. Tiêu đề trang lại ghi `Provider · Model · Skill · Tool · Platform` — **không khớp** thứ tự thật của các mục bên dưới. |
| [FACT] | Chỉ Platform và Tool là bảng. Provider và Model là `<ul>` thẻ xếp chồng; Skill là dải chip tròn không có cột nào. |
| [FACT] | Provider và Model nằm trong `grid sm:grid-cols-2`, nên ở màn hình rộng chúng đứng cạnh nhau — đọc phải nhảy mắt theo hai chiều thay vì một chiều dọc. |
| [FACT] | Quan hệ thật trong `schema.prisma`: `AIProvider.platformId → AIPlatform`, `AIModel.providerId → AIProvider` (bắt buộc), `AITool.platformId → AIPlatform` (bắt buộc). `AISkill.platformScope` là **String tự do**, không phải khoá ngoại. |
| [FACT] | Năm nút mở form dùng chung một lớp `text-ink` — cùng màu với chữ thường của bảng ngay dưới nó. |
| [FACT] | Các form đã có placeholder cho hầu hết ô nhập chữ. Thiếu thật sự: ô `outputRate` của `NewModelForm` không có dòng gợi ý trong khi `inputRate` có. Các ô `<select>` đều đã có option dẫn `— Chọn … —`. |
| [FACT] | Nhãn mức rủi ro (`LOW/MEDIUM/HIGH`) đang khai lặp thành hằng `RISK_LEVELS` cục bộ ở `NewSkillForm.tsx` và `NewToolForm.tsx`; `labels.ts` chưa có. |
| [ASSUMPTION] | "Lớn đến bé" người dùng nói tới là **thứ bậc chứa nhau**, không phải số lượng bản ghi — vì số lượng đổi theo ngày, không dùng làm thứ tự trang được. |

## OUTCOME

**WHO** — Quản trị AI và Quản trị hệ thống vận hành danh mục M29.

**WHAT** — Trang Danh mục xếp năm sổ theo đúng thứ bậc chứa nhau, cả năm hiển thị dạng bảng,
nút mở form phân biệt được bằng màu, và mỗi ô nhập nói rõ nhập gì.

**WHY** — Trang này là cửa vào của bước 1 trong HDSD M29 ("Đăng ký Provider, Model, Skill, Tool và
Platform vào danh mục"). Người vận hành lần đầu không suy ra được thứ tự phải đăng ký: phải có
Platform mới gắn được Provider, phải có Provider mới tạo được Model. Trang đang trình bày ngược
với thứ tự đó, và ba trong năm sổ không có cột nên không đối chiếu được bản ghi.

**SUCCESS CRITERIA**

1. Thứ tự mục và tiêu đề trang khớp nhau, theo thứ bậc chứa nhau: Platform → Provider → Model → Tool → Skill.
2. Cả năm sổ là bảng có tiêu đề cột; không còn `<ul>` thẻ và dải chip.
3. Nút "+ Đăng ký…" khác màu chữ với nội dung bảng.
4. Mỗi ô nhập chữ có placeholder hoặc dòng gợi ý; mỗi `<select>` có option dẫn.
5. `npm test` và `npm run build` PASS.

## SPEC

### Thứ tự và lý do

| # | Sổ | Chứa gì / thuộc ai | Bắt buộc gắn |
|---|---|---|---|
| 1 | **Platform** | Nền tảng — giữ `apiBaseUrl`, khoá API, ranh giới dữ liệu, sức khoẻ | — |
| 2 | **Provider** | Nhà cung cấp mô hình, thuộc một Platform | tùy chọn (dịch vụ ngoài Viện để trống) |
| 3 | **Model** | Mô hình cụ thể, thuộc một Provider | bắt buộc |
| 4 | **Tool** | Công cụ (endpoint) tác tử được gọi, thuộc một Platform | bắt buộc |
| 5 | **Skill** | Kỹ năng — `platformScope` chỉ là nhãn tra cứu, không phải khoá ngoại | không |

Tool đứng sau Model dù cùng gắn Platform: chuỗi Platform → Provider → Model là một mạch phụ thuộc
liên tiếp, cắt Tool vào giữa sẽ đứt mạch. Skill xuống cuối vì nó là sổ duy nhất không có ràng buộc
khoá ngoại nào.

### Giao diện

| Hạng mục | Thay đổi |
|---|---|
| Tiêu đề trang | `Provider · Model · Skill · Tool · Platform` → `Platform · Provider · Model · Tool · Skill`, thêm một câu nói rõ thứ bậc |
| Thanh mục lục | Thêm dải liên kết neo tới 5 mục, kèm số bản ghi từng sổ |
| Mỗi mục | Đánh số 1–5, thêm một câu mô tả sổ đó là gì và phụ thuộc vào sổ nào |
| Provider | `<ul>` thẻ → bảng: Mã · Tên · Nền tảng phơi API · Trạng thái |
| Model | `<ul>` thẻ → bảng: Mã model · Tên hiển thị · Nhà cung cấp · Giá token · Bảng giá |
| Skill | dải chip → bảng: Mã · Tên · Phạm vi nền tảng · Mức rủi ro · Phiên bản · Trạng thái |
| Bố cục | Bỏ `grid sm:grid-cols-2` — năm mục xếp dọc một chiều |
| Nút mở form | `text-ink` → `text-accent` |
| `RISK_LEVEL_LABEL` | Đưa từ hằng cục bộ ở 2 form lên `labels.ts` để bảng Skill/Tool dùng lại |

### Cố ý KHÔNG làm

- Không đổi cột nào của bảng Platform và Tool — hai bảng đó đã đúng, đụng vào là mở rộng phạm vi.
- Không đổi quy tắc nghiệp vụ, phân quyền, hay bất kỳ hành động máy chủ nào. Đây thuần là lớp trình bày.
- Không sửa `HDSD.yaml`: bước 1 của HDSD mô tả *việc* đăng ký, không mô tả thứ tự mục trên trang;
  luồng nghiệp vụ trong `rules.ts` không đổi nên ràng buộc "sửa rules thì sửa HDSD" không kích hoạt.

## Acceptance Criteria

| Mã | Điều kiện | Thao tác | Kỳ vọng |
|---|---|---|---|
| AC-1 | Vai trò có quyền ghi danh mục | mở `/modules/M29/registry` | 5 mục theo đúng thứ tự Platform→Provider→Model→Tool→Skill, đánh số 1–5 |
| AC-2 | Có ≥1 Provider, Model, Skill | như trên | cả ba hiện dạng bảng có `<th>`, không còn `<li>` thẻ hay chip |
| AC-3 | Sổ rỗng | như trên | hiện dòng trống có viền đứt, không phải bảng trắng |
| AC-4 | Bấm liên kết trên thanh mục lục | — | cuộn tới đúng mục tương ứng |
| AC-5 | Vai trò chỉ đọc | mở trang | không thấy nút "+ Đăng ký…" nào, bảng vẫn đủ cột dữ liệu |
