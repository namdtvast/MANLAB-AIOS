# Kết quả chạy checklist soát xét `ETV.P33` (hỗ trợ bước 4, `ETV.P14` §6.6.1)

> ⚠ **Đây là bản kiểm tra do AI chạy trước, không phải kết quả soát xét chính thức.** Theo `ETV.P14`
> §III (RACI), **soát xét kỹ thuật là R/A của LĐP**; **phê duyệt ban hành là R/A của LĐV**. AI không
> phê duyệt, không ký số, không đổi trạng thái tài liệu. File này là tài liệu làm việc để LĐP đối
> chiếu khi ra kết luận Đạt / Không đạt.

| | |
|---|---|
| Văn bản | `ETV.P33` — Thủ tục Quản lý hệ thống thông tin |
| Lần ban hành | 01 (dự thảo đầu tiên) |
| Trạng thái hiện tại | `Cho-soat-xet` |
| Biên soạn | Dương Thành Nam |
| Người soát xét (theo trang bìa) | Đỗ Văn Vinh — Lãnh đạo Phòng |
| Người phê duyệt (theo trang bìa) | Nguyễn Hoàng Giang — Lãnh đạo Viện |
| Ngày chạy checklist | 26/08/2026 |

## 1. Checklist soát xét văn bản

| # | Mục kiểm | Kết quả |
|---|---|---|
| 1 | Loại văn bản xác định đúng (Thủ tục — tài liệu HTQL) | **Đạt** |
| 2 | Mã số đúng quy tắc `ETV.P xx`, không trùng văn bản hiện hành | **Đạt** — `ETV.P 33`, chưa có thủ tục nào mang số 33 |
| 3 | Đủ metadata bắt buộc theo `ETV.P14` §6.3 | **Đạt sau khi sửa** — xem lỗi L1 |
| 4 | Nội dung không mâu thuẫn với văn bản hiện hành cùng phạm vi | **KHÔNG ĐẠT** — xem lỗi L2 |
| 5 | Căn cứ pháp lý/ISO nêu đúng điều khoản | **Đạt** — 10 trích dẫn nội bộ đối chiếu tay, đều trỏ đúng mục có thật |
| 6 | Vai trò/trách nhiệm khớp RACI `ETV.P14` §III | **Đạt** — có đủ NTH/LĐP/LĐV/QLCL, thêm QTHT và PT.ATTT là vai trò chuyên môn của chính thủ tục |
| 7 | Không chép nguyên văn luật/ISO, chỉ dẫn chiếu | **Đạt** |
| 8 | Ngôn ngữ rõ ràng, không để trống mục bắt buộc | **Đạt** — các ô ngày tháng để trống là đúng với trạng thái chờ phê duyệt |
| 9 | Đủ khung chuẩn I–IX của thủ tục ETV | **Đạt** — I Mục đích · II Phạm vi · III Tài liệu viện dẫn · IV Thuật ngữ · V RACI · VI Nội dung · VII Biểu mẫu · VIII Lưu hồ sơ · IX Phụ lục |
| 10 | Biểu mẫu dẫn chiếu đã tồn tại, không tạo trùng | **Đạt** — F33.01–04 có; F28.03, F28.04, F30.02, F35.03, F14.01, F14.06 đều tồn tại và được dùng lại đúng nguyên tắc một nơi duy nhất |
| 11 | Mã số, lần ban hành, ngày ban hành nhất quán giữa thủ tục, biểu mẫu và manifest | **KHÔNG ĐẠT** — xem lỗi L3 |
| 12 | `supersedes` / `superseded_by` đúng | **Đạt** — thủ tục mới, cả hai `null` là đúng |

## 2. Lỗi đã sửa ở mức soạn thảo (không đổi trạng thái, không đổi nội dung yêu cầu)

**L1 — `related_documents` thiếu 05 thủ tục được viện dẫn trong thân văn bản.**
Thân văn bản dẫn `ETV.P08` (§6.3.4), `ETV.P11` (§6.5.3), `ETV.P16` (§5.2), `ETV.P26` (§6.5.4),
`ETV.P32` (§2.3) nhưng khối metadata và §3.3 không liệt kê. Cả 05 thủ tục đều tồn tại trong
`03_MANAGEMENT_SYSTEM/02_P/`. **Đã bổ sung** vào `related_documents` và §3.3, kèm sửa tên gọi cho
khớp `title` thật của từng thủ tục.

**L3 — Biểu mẫu ghi ngày ban hành trong khi chưa được phê duyệt.**
`ETV.P.F 33.01`–`33.04` ghi `effective_date: "25/08/2026"` và trang bìa "Ngày ban hành 25/08/2026`"
trong khi `status: Cho-soat-xet`, còn thủ tục cha `ETV.P33` để trống ngày. Biểu mẫu không thể có
hiệu lực trước thủ tục cha. `04_PROCESS_LIBRARY/MP33_HeThongTT/manifest.yaml` cũng có
`issued_date: 2026-08-25` cạnh `doc_status: Cho-soat-xet`. **Đã trả các ô ngày về trống** và ghi chú
rõ ai điền, điền khi nào — theo đúng cách `MP35_NenTangSo/manifest.yaml` đang làm.

> Lỗi cùng loại tồn tại ở **`ETV.P34`** và `MP34_DuLieuSo/manifest.yaml` (cùng đợt soạn). Không sửa
> trong đợt này vì ngoài phạm vi soát xét P33 — đề nghị xử lý cùng khi soát xét P34.

## 3. Điểm phải do LĐP/LĐV quyết định — AI không tự xử lý

### L2 — Xung đột với `ETV.P28` mục 5.7.2 (mức: **Cao**, chặn phê duyệt)

> **Cập nhật 26/08/2026 — đã chọn phương án A và có dự thảo xử lý.** `ETV.P28` **lần ban hành 02**
> đã được soạn: sửa mục 5.7.2 (thiết bị đầu cuối đăng ký trong danh mục tài sản CNTT của ETV.MP33,
> dữ liệu trên thiết bị theo ETV.MP27), bổ sung 01 dòng vào bảng "Ngoài phạm vi" mục 1.4 và 01 ghi
> chú ranh giới MP27 ↔ MP33. **Yêu cầu kỹ thuật, thẩm quyền và mọi kiểm soát khác không đổi.** Bản
> này đang `Cho-soat-xet`; lần BH 01 vẫn là bản đang áp dụng. Điểm chặn chỉ được gỡ khi **LĐV phê
> duyệt P28 lần BH 02** — khi đó P33 mới đủ điều kiện phê duyệt (xem L4 về thứ tự).

`ETV.P28` **đang có hiệu lực** (`doc_status: issued`, ban hành 24/08/2026) viết thiết bị đầu cuối
"được đăng ký trong danh mục tài sản (ETV.MP27)". `ETV.P33` §2.2 Nguyên tắc 1 chốt cách hiểu **ngược
lại**: thiết bị đăng ký tại P33, dữ liệu trên thiết bị đăng ký tại P27.

Vấn đề không nằm ở chỗ cách hiểu nào hợp lý hơn — cách hiểu của P33 là hợp lý. Vấn đề là **một thủ
tục mới không thể sửa nghĩa của một thủ tục đang có hiệu lực bằng một ghi chú trong chính nó**. Ai
đọc `ETV.P28` đơn lẻ vẫn sẽ hiểu theo câu chữ cũ. `ETV.P14` §6.10 (soát xét định kỳ & xử lý xung
đột) là nơi quy định cách gỡ.

Hai đường xử lý, cần LĐP chọn trước khi trình LĐV:

| Phương án | Nội dung | Hệ quả |
|---|---|---|
| **A (khuyến nghị)** | Hiệu đính `ETV.P28` mục 5.7.2 theo `ETV.P14`, ban hành lại lần BH 02, rồi phê duyệt P33 | Sạch về nguyên tắc một nguồn sự thật; tốn một vòng ban hành lại P28 |
| B | LĐV ra văn bản giải thích, ghi nhận cách hiểu thống nhất, hiệu đính P28 ở kỳ soát xét định kỳ | Phê duyệt P33 được ngay; trong thời gian chờ, hai văn bản vẫn đọc ngược nhau |

### L4 — Trích dẫn `ETV.P35 mục 2.3` phụ thuộc phiên bản chưa được phê duyệt (mức: **Trung bình**)

`ETV.P33` §2.2 dẫn "ETV.P35 mục 2.3". Mục 2.3 chỉ tồn tại ở **lần ban hành 02 của P35, đang
`Cho-soat-xet`**. Bản **đang áp dụng là lần ban hành 01** (24/08/2026), ở đó nội dung tương ứng nằm
ở **§1.4 "Ngoài phạm vi"**. Nếu P33 được phê duyệt trước P35 lần BH 02, P33 sẽ dẫn tới một điều
khoản chưa có hiệu lực.

Đề nghị: **phê duyệt `ETV.P35` lần BH 02 trước hoặc cùng đợt với P33** — P35 lần BH 02 chỉ là đưa về
khung I–IX, "nội dung yêu cầu kỹ thuật và thẩm quyền không thay đổi", nên rủi ro thấp.

Đây là rủi ro có tính hệ thống, không riêng P33: **khi một thủ tục được đánh số lại ở bản dự thảo,
mọi trích dẫn trỏ tới nó âm thầm đổi nghĩa**, và `_meta/validate_citations.py` đối chiếu với **bản
trên đĩa** (có thể chưa được phê duyệt) chứ không phải bản đang có hiệu lực.

### L5 — Hai lược đồ metadata song song trong tầng 03 (mức: **Thấp**, không chặn P33)

Trong 49 file thủ tục tại `03_MANAGEMENT_SYSTEM/02_P/`:

| Lược đồ | Số file | Ví dụ |
|---|---|---|
| Theo `ETV.P14` §6.3 — `id`, `title`, `status: Cho-soat-xet\|Da-phe-duyet\|Nhap` | 40 | ETV.P33, P34, P35 |
| Lược đồ khác — `doc_id`, `doc_name`, `doc_status: issued`, `responsibility:` | 07 | **ETV.P28**, P19, P24, P25, P26, P29, P43 |
| **Không có trường trạng thái nào** | 02 | ETV.P41 (Điều lệ tổ chức), ETV.P42 (Phụ lục I Nội quy mẫu) |

Trong nhóm 07 có **`ETV.P28`**, chính thủ tục mà P33 dựa vào. Hệ quả: không thể lọc "thủ tục nào
đang có hiệu lực" bằng một truy vấn duy nhất, và `ETV.P28` ghi mã số trang bìa là `ETV.MP 28` trong
khi `ETV.P14` §6.2 quy định `ETV.P xx`.

Không chặn việc phê duyệt P33. Đề nghị đưa vào kỳ soát xét `ETV.P14` như một việc riêng.

## 4. Kết luận đề xuất cho LĐP

**Chưa đủ điều kiện chuyển `Chờ phê duyệt`** — vướng **L2**, là mâu thuẫn với một thủ tục đang có
hiệu lực, thuộc đúng mục 4 của checklist soát xét. L1 và L3 đã khắc phục; L4 xử lý được bằng cách
xếp thứ tự phê duyệt; L5 không chặn.

Sau khi LĐP chọn phương án cho L2 và L4, văn bản đủ điều kiện trình LĐV.

## 5. Nội dung điền sẵn cho `ETV.P.F 14.01`

Để LĐP/LĐV nhập vào ManLab hoặc bản in — **không lưu bản đã điền trong repo** theo ghi chú tại
`03_MANAGEMENT_SYSTEM/05_R/README.md` (hồ sơ lưu trên ManLab, không lưu tại đây).

| Trường | Nội dung |
|---|---|
| Mã văn bản đề nghị | `ETV.P 33` |
| Tên văn bản | Thủ tục Quản lý hệ thống thông tin |
| Loại văn bản | ☑ Thủ tục |
| Loại đề nghị | ☑ Xây dựng mới |
| Người đề nghị | Dương Thành Nam |
| Ngày đề nghị | *(LĐP điền)* |
| Lý do đề nghị | Hiện thực hóa Sổ tay chất lượng §10.2 và quy trình MP33; giữ bằng chứng thực hiện các kiểm soát kỹ thuật mà `ETV.P28` mục 5.7 đặt ra và phạm vi mà `ETV.P35` giao cho ETV.P33 — hiện chưa có thủ tục nào đảm nhận |
| Người soạn thảo | Dương Thành Nam |
| Người soát xét | Đỗ Văn Vinh — LĐP |
| Kết quả soát xét | *(LĐP quyết định — xem mục 4)* |
| Kết quả phê duyệt | *(LĐV quyết định; nếu Đã phê duyệt: điền Lần BH 01 và ngày ban hành)* |

## 6. Việc phải làm sau khi LĐV phê duyệt (không tự động)

1. Đổi `status: Cho-soat-xet` → `Da-phe-duyet` và điền `effective_date` trong `ETV.P33`.
2. Điền ngày ban hành ở trang bìa và dòng đầu bảng **NHỮNG THAY ĐỔI ĐÃ CÓ**.
3. Làm tương tự cho `ETV.P.F 33.01`–`33.04` (đã trả ô ngày về trống ở đợt này).
4. Cập nhật `04_PROCESS_LIBRARY/MP33_HeThongTT/manifest.yaml`: `doc_status` và `issued_date`.
5. Cập nhật danh mục văn bản nội bộ `ETV.P.F 14.02`; phân phối theo `ETV.P.F 14.04` (`ETV.P14`
   §6.6.1 bước 6–7).
6. Cập nhật đặc tả module: `05_MODULE_LIBRARY/M33_HeThongTT/` hiện ghi thủ tục ở trạng thái "dự
   thảo, Chờ soát xét" ở nhiều chỗ — đổi khi thủ tục có hiệu lực, và khi đó mới nên bắt đầu BUILD.
