# M14_TaiLieu — Báo cáo VERIFY (Increment 12)

## Build

- `npx prisma migrate dev --name m14_tai_lieu` → **PASS**, migration `20260823134600_m14_tai_lieu`,
  additive.
- `npx prisma generate` → **PASS** (chạy tay ngay sau migrate).
- `npx tsc --noEmit` → **PASS** (lần đầu FAIL 2 lỗi thiếu `createdById` khi tạo `M14AiSuggestion`
  — đã sửa: gợi ý luôn gắn tài khoản AI tạo ra nó).
- `npx eslint src --max-warnings=0` → **PASS**.
- `npx prisma db seed` → **PASS**, nạp 7 văn bản demo + 1 gợi ý AI + vai trò M14 cho 6 tài khoản,
  có tạo mới `pvt@manlab.vn`.

## VERIFY qua Browser — bằng chứng thật (không suy luận)

### 1. Gate ISO/IEC 42001 — AI không đổi được trạng thái (quy tắc 7, ETV.P14 §6.9) — PASS

Đăng nhập **chính tài khoản AI** `ai-operator@manlab.vn` (vai trò `AI_AGENT`), mở `ETV.P 21`
(Nháp), bấm "Gửi soát xét" → chặn đúng bằng lỗi trả về từ server: *"AI chỉ được gợi ý và cảnh
báo, không được tự soát xét, phê duyệt, ký số, thu hồi hay hủy văn bản (ETV.P14 §6.9, ISO/IEC
42001 §7.5)."* Trạng thái vẫn `Nháp`, **nhật ký không phát sinh mục mới**. (Phân biệt rõ với dòng
cảnh báo tĩnh trong panel — đã kiểm tra riêng chuỗi lỗi của `rules.ts`.)

### 2. Gate `MISSING_REQUIRED_FIELD` theo loại văn bản (quy tắc 2) — PASS

Đăng nhập NTH (người lập), bấm "Gửi soát xét" trên `ETV.P 21` → chặn, liệt kê **đúng 7 trường
thiếu**: *Lần ban hành, Ngày có hiệu lực, Phân loại thông tin, Nhóm quyền truy cập (F14.06), Thời
hạn lưu (F14.06), Nơi phát hành/tiếp nhận, Điều khoản ISO áp dụng*. Trạng thái giữ `Nháp`.

### 3. Gợi ý AI phải do người có thẩm quyền áp dụng (§6.9) — PASS

Cùng văn bản, NTH bấm "Áp dụng gợi ý" cho gợi ý `isoClause` do AI tạo → giá trị được ghi vào văn
bản (*ISO/IEC 17025:2017 §7.11 · ISO 9001:2015 §7.5*), gợi ý chuyển "đã áp dụng bởi Nguyễn Thị H.
(NTH)", nhật ký ghi *"Áp dụng gợi ý AI cho trường isoClause"*, và danh sách trường thiếu **giảm
từ 7 xuống 6** — chứng minh AI chỉ đề xuất, người dùng mới là tác nhân ghi dữ liệu.

### 4. Gate `NO_DELEGATION` — Sổ tay/Thủ tục không ủy quyền phê duyệt (quy tắc 4) — PASS, cả 2 nhánh

Trên `ETV.QM` (Sổ tay chất lượng, `CHO_PHE_DUYET`):
- `pvt@manlab.vn` (vai trò `LDV_UYQUYEN`) bấm "Phê duyệt ban hành" → chặn: *"Sổ tay chất lượng và
  Thủ tục bắt buộc do LĐV trực tiếp phê duyệt, không ủy quyền (quy tắc 4, RACI ETV.P14 §V)."*
- `ldv@manlab.vn` (LĐV chính danh) bấm **cùng nút, cùng văn bản** → thành công,
  `CHO_PHE_DUYET → DA_PHE_DUYET`.

### 5. Gate `SELF_REVIEW` ở bước soát xét — PASS

`ETV.MCW 07` do chính LĐP lập, đang `CHO_SOAT_XET`: LĐP bấm "Soát xét đạt" → chặn: *"Người lập
văn bản không được tự soát xét văn bản của chính mình."* Trạng thái giữ `Chờ soát xét`.

### 6. Gate vai trò ban hành + thanh lý (RACI §III, §6.11) — PASS

Trên `ETV.CV 118/2026` (`DA_PHE_DUYET`, chưa ban hành), đăng nhập LĐP:
- Bấm "Ban hành & phân phối" → chặn: *"Chỉ Văn thư/QLCL được ban hành, cập nhật danh mục và phân
  phối (RACI ETV.P14 §III)."*
- Bấm "LĐP thanh lý" kèm lý do → thành công: `DA_PHE_DUYET → HET_HIEU_LUC_HUY`, hiển thị
  *"Thanh lý (giữ lưu tham khảo)"* — phân biệt đúng với hủy bỏ theo §6.11.

### 7. Cross-module M14 → M12 — PASS

Văn bản bên ngoài `F14.03-2026-0004` hiển thị khối *"Khiếu nại đang viện dẫn văn bản này (← M12)"*
với link sống tới `KN-2026-0003` — query thẳng bảng `M12Complaint` theo `externalDocRef`, không
import code M12, không sửa gì thuộc M12. Đây là chiều ngược của liên kết M12 → F14.03 tạo ở
Increment 10.

## Sự cố gặp phải + cách xử lý

- **Dev server cũ (PID 84214) còn chạy ngoài quản lý của preview** → `preview_start` báo "Another
  next dev server is already running". Xử lý: `kill` PID rồi start lại; hai PID còn lại trên cổng
  3000 chỉ là tiến trình trình duyệt giữ kết nối, không phải server.
- `read_page` trả viewport lệch với ảnh chụp thật (579×361 vs 800×499) — lặp lại sự cố của
  Increment 10-11. Xử lý như đã ghi: `form_input` theo ref, bấm submit theo toạ độ lấy từ ảnh chụp.
- `tsc` bắt lỗi thiếu `createdById` ở `M14AiSuggestion` — sửa bằng cách gắn actor tạo gợi ý, đúng
  ý đồ truy vết "gợi ý này do tài khoản AI nào sinh ra".

## Regression

```
$ python3 _meta/validate_links.py
Đã kiểm tra 377 link · 38 MP · 38 M · 22 CAP. Vấn đề: 0
```
PASS.

## Điều CHƯA verify (báo cáo rõ, không quy tròn thành "hoàn tất")

- **Chưa test qua UI**: gate `INVALID_CODE_FORMAT` và trùng mã (`code` UNIQUE) khi tạo văn bản
  mới; nhánh "Không soát xét"/"Không phê duyệt" + `REASON_REQUIRED`; `txPublish` nhánh thành công
  (chưa đăng nhập `vanphong@manlab.vn` để ban hành thật) và `ALREADY_PUBLISHED`; `txDiscard`
  (LĐV hủy bỏ) cả 2 nhánh; `ALREADY_APPLIED` của gợi ý AI.
- **Chưa test** luồng tạo văn bản mới qua form (`createDocument`) — bao gồm kiểm tra định dạng mã
  và tra cứu văn bản bị thay thế theo mã.
- **Chưa test** cảnh báo mềm `supersededBy` hiển thị trên bản cũ `ETV.P 15` (đã seed quan hệ
  nhưng chưa mở trang để xác nhận bằng mắt).
- **5 "Quyết định phạm vi"** trong spec.md (vai trò `LDV_UYQUYEN` do bản triển khai đặt ra; gate
  `SELF_REVIEW`; supersedes không tự thanh lý bản cũ; `publish` là hành động chứ không phải trạng
  thái; `permissionGroup`/`retention` lưu chuỗi thay vì FK tới F14.06) — **chưa được LĐV xác nhận**.
- **Nợ kỹ thuật đã biết**: `DataModel.md` yêu cầu `permission_id`/`retention_id` là FK tới bản ghi
  trong `ETV.P.F 14.06`; biểu mẫu này **chưa số hóa** nên hiện lưu chuỗi tự do — chưa đạt ràng
  buộc "không cho nhập tự do" của DataModel.md.

## Kết luận

Gate quan trọng nhất của increment — **AI không bao giờ tự chuyển trạng thái văn bản**, verify
bằng chính tài khoản AI thao tác trên UI thật — hoạt động đúng, kèm chứng minh chiều ngược lại
(gợi ý của AI chỉ vào hệ thống khi người có thẩm quyền bấm áp dụng). Gate không ủy quyền phê duyệt
Sổ tay/Thủ tục verify được cả nhánh chặn lẫn nhánh thành công trên cùng một văn bản. Danh sách
chưa verify ở trên là thật, không quy tròn.
