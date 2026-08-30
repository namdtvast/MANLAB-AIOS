# VERIFY — 20260830-vo-hieu-hoa-provider-model-skill

Ngày 30/08/2026. Tier **M**. Nguồn: người dùng nhìn bảng Danh mục ở `/modules/M29/registry` với vai
trò `SUPER_ADMIN` và hỏi "bổ sung chức năng xoá của tài khoản Super Admin?".

## Trả lời câu hỏi trước khi làm

**Không làm nút Xóa** — lượt 28/08 đã kết luận việc này và kết luận đó vẫn đứng:

| Căn cứ | Nội dung |
|---|---|
| ETV.P35 §6.1.8 (dòng 321) | Mã nền tảng đã Hủy/Hết hiệu lực **không được cấp lại** — "nhằm giữ nguyên giá trị truy vết của nhật ký lịch sử". Bản ghi phải ở lại danh mục làm chứng cứ. |
| ETV.P35 Phụ lục II.1 (dòng 515–525) | Vòng đời chỉ có 9 trạng thái, kết thúc ở *Hết hiệu lực* / *Hủy*. Không có trạng thái "Đã xóa". |
| ETV.P29 mục 6.3 (dòng 517 câu cuối) | "Nhật ký suy luận và nhật ký thay đổi cấu hình **chỉ ghi thêm** — không có trạng thái sửa/xóa." |
| DacTa.md M29 quy tắc 2 | `AIAuditLog`, `AIRequest`, `AIToolCall` là append-only — không có API xóa/sửa. |

Thêm rào kỹ thuật: `AIAuditLog` trỏ tới bản ghi bằng `entityId` **dạng chuỗi, không khoá ngoại**,
nên xóa cứng để lại nhật ký trỏ vào hư không; còn `AIRequest → AIModel`, `AIToolCall → AITool`,
`AIAgent → AIPlatform/AIModel` đều mặc định `onDelete: Restrict` — nút "Xóa" sẽ ném lỗi CSDL ngay
khi bản ghi đã từng phát sinh lượt gọi, tức hứa nhiều hơn làm được.

## Vấn đề thật tìm được

Đúng mục 2 phần "Việc còn lại" của lượt 28/08
([`_work/20260828-huy-va-het-hieu-luc-nen-tang/verify.md`](../20260828-huy-va-het-hieu-luc-nen-tang/verify.md)):

| # | Lỗ hổng | Hệ quả |
|---|---|---|
| 1 | `AIProvider`, `AIModel`, `AISkill` **đã có cột `status` (`AIOpStatus`)** từ đầu nhưng giao diện chỉ hiển thị huy hiệu, **không thao tác nào chạm tới** | Bản ghi đăng ký nhầm kẹt vĩnh viễn ở `ACTIVE`; muốn ngừng dùng phải sửa thẳng CSDL — cùng loại lỗi "luật có, đường đi không có" đã sửa hai lần trước cho `ACTIVE` và `CANCELLED` của Platform |
| 2 | Không có chốt phụ thuộc nào cho ba sổ này | Vô hiệu hóa Provider mà Model của nó vẫn `ACTIVE` thì Model trỏ vào một nhà cung cấp đã chết nhưng Agent vẫn gọi được |

## Đã sửa

- `rules.ts`: thêm `opStatusTransitions.disable()/enable()` (chuỗi ETV.P29 mục 6.3 *Đăng ký → Đang
  hiệu lực → Vô hiệu hóa*, bắt buộc lý do khi vô hiệu hóa, không bắt buộc khi kích hoạt lại);
  `DependentRef.kind` thêm `"model"`; `dependentsBlock()` nhận tham số `doiTuong` để câu chặn gọi
  đúng tên sổ thay vì cứng "nền tảng này".
- `actions.ts`: `datTrangThaiVanHanh(kind, id, action, reason)` — chốt `registry:write`, nạp
  `activeOpDependents()` (Provider → Model `ACTIVE`; Model → Agent `ACTIVE`; Skill → Agent `ACTIVE`
  qua `skillIds`), ghi `AIAuditLog` kèm lý do.
- `RegistryActions.tsx`: `OpStatusToggle` (nút + ô nhập lý do tại chỗ + câu chặn có liên kết);
  `DEPENDENT_HREF` thay biểu thức ba ngôi cũ để `model` trỏ về `#model`.
- `page.tsx`: ba bảng Provider/Model/Skill thêm cột **Thao tác** (Model thêm cả cột **Trạng thái**
  vốn chưa hiện), nới `min-w` tương ứng.
- Test: `rules.test.ts` +5 ca (`opStatusTransitions`), `model.test.ts` +1 ca khoá ranh giới
  `registry:write` — 490 → 496 ca.
- Tài liệu: `HDSD.yaml` thêm bước "Vô hiệu hóa bản ghi… danh mục KHÔNG có nút xóa"; `DacTa.md`.

## Đối chiếu trích dẫn (làm tay, công cụ không bắt được "đúng tên sai mục")

| Trích dẫn | Mục thật | Kết luận |
|---|---|---|
| ETV.P35 §6.1.8 — mã không cấp lại | `ETV.P35_QuanLyNenTangSo.md` dòng 319 `#### 6.1.8. Mã nền tảng` | **Đúng** |
| ETV.P35 §6.5.3 — chặn cứng khi còn phụ thuộc | dòng 412 `#### 6.5.3. Điều kiện chặn cứng khi ngừng vận hành` | **Đúng** — dùng lại nguyên câu chặn cũ, chỉ đổi danh từ chủ ngữ |
| ETV.P29 mục 6.3 — Công cụ: Đăng ký → Đang hiệu lực → Vô hiệu hóa | `ETV.P29_QuanLyTriTueNhanTao.md` dòng 515 bảng "Các đối tượng khác" | **Đúng** — Provider/Model/Skill **không** có dòng riêng trong bảng này; lấy chuỗi của Công cụ làm mẫu tương tự, đã ghi rõ lý do trong chú thích `opStatusTransitions` |
| ETV.P29 mục 6.3 câu cuối — mọi nhánh kết thúc ghi lý do | dòng 517 | **Đúng** |

## Kết quả

| # | Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|---|
| 1 | Bộ test | **PASS** | `npm test` → 24 tệp / **496 ca đạt** (490 → 496) |
| 2 | ESLint | **PASS** | `npx eslint src` → không phát sinh dòng nào |
| 3 | `tsc --noEmit` | **PASS** | Chỉ còn lỗi có sẵn `layout.tsx(32,50) LayoutProps` (kiểu do `next build` sinh, không liên quan) |
| 4 | Bắt buộc lý do | **PASS** | Nút "Xác nhận vô hiệu hóa" vô hiệu khi ô rỗng **và** khi chỉ có khoảng trắng; `rules.ts` kiểm lại (`REASON_REQUIRED`, có ca test) |
| 5 | **Chặn Provider → Model** | **PASS** | Vô hiệu hóa `GEMINI` (3 model `ACTIVE`) → từ chối, trạng thái giữ "Hoạt động": "Không vô hiệu hóa được khi còn 3 đối tượng đang hoạt động trỏ tới **nhà cung cấp này** (ETV.P35 §6.5.3): mô hình `gemini-2.5-flash`, mô hình `gemini-3.5-flash`, mô hình `gemini-3.5-flash`"; ba mã là liên kết trỏ `#model`. Lặp lại với `manlab-ai` (1 model) → cùng kết quả |
| 6 | **Chặn Model → Agent** | **PASS** | Vô hiệu hóa model `gemini-2.5-flash` → từ chối: "…trỏ tới **mô hình này** (ETV.P35 §6.5.3): tác tử `AGENT_TROLY_M29`" |
| 7 | **Chặn Skill → Agent** | **PASS** | `TraCuuTaiLieu` → chặn bởi `AGENT_COPILOT_TRACUU`; `PhanTichKPI` → chặn bởi `AGENT_TROLY_M29`; câu chặn gọi đúng "**kỹ năng này**" |
| 8 | Đường thuận Model | **PASS** | `claude-opus-5` và `manlab-ai` (0 agent trỏ tới) → `DISABLED`, nút đổi thành "Kích hoạt lại" |
| 9 | Đường thuận Skill + quay lại | **PASS** | `KiemSoatTaiLieu` → `DISABLED` → bấm "Kích hoạt lại" → `ACTIVE`, không hỏi lý do |
| 10 | Lý do vào nhật ký kiểm toán | **PASS** | `/modules/M29/audit`: `skills \| SUPER_ADMIN \| status \| "Kỹ năng trùng lặp, gộp vào TraCuuTaiLieu"`; dòng kích hoạt lại ghi lý do "—" đúng thiết kế |
| 11 | Cột mới hiển thị đúng | **PASS** | Provider +1 cột **Thao tác**; Model +2 cột **Trạng thái**/**Thao tác** (`manlab-local-14b` sẵn `DISABLED` hiện "Kích hoạt lại"); Skill +1 cột **Thao tác** |
| 12 | Trả môi trường về như cũ | **PASS** | CSDL dev dùng chung: `claude-opus-5`, `manlab-ai` về `ACTIVE`; `manlab-local-14b` giữ `DISABLED` như seed; 4 dòng `AIAuditLog` do lượt đo sinh ra đã xóa (79 → 75) |

## Không kiểm được lần này

- **Chốt phân quyền trên trình duyệt với vai trò khác**: mật khẩu tài khoản demo do
  `SEED_DEMO_PASSWORD` quyết định và không có sẵn, nên không đăng nhập vai trò `AI_SECURITY_ADMIN`
  để xác nhận cột **Thao tác** biến mất. Chốt là `can(role, "registry", "write")` — cùng biểu thức
  đã gác `NewProviderForm`/`NewToolForm` (đã kiểm 3 vai trò ngày 25/08) và nay có ca test riêng
  khoá ranh giới; server action kiểm lại độc lập với giao diện.
- **`actions.ts` vẫn chưa có test** (nợ từ 25/08): `datTrangThaiVanHanh()` và
  `activeOpDependents()` chỉ được kiểm bằng tay trên trình duyệt.

## Việc còn lại — không thuộc phạm vi lần này

1. **`ToolStatusToggle` không hỏi lý do** trong khi ba sổ mới đều bắt buộc. Cùng một trang mà hai
   kiểu ghi nhật ký là không nhất quán, và ETV.P29 mục 6.3 xếp Vô hiệu hóa công cụ vào nhánh kết
   thúc y như ba sổ kia. Đổi hành vi của nút đang chạy nên tách lượt.
2. **Không có bộ lọc "ẩn bản ghi đã kết thúc"** — danh mục vẫn liệt kê cả bản ghi Hết hiệu lực/Hủy/
   Vô hiệu hóa. Đúng về truy vết nhưng khó đọc khi sổ dài.
3. **`AIAgent` chưa có thao tác vô hiệu hóa trên Danh mục** — tác tử đã có đường tạm dừng riêng ở
   trang chi tiết theo ETV.P29 mục 5.7, nên không gộp vào đây.
