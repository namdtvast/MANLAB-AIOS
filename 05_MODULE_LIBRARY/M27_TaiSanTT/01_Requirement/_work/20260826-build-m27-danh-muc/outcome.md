# M27_TaiSanTT — OUTCOME (work-id 20260826-build-m27-danh-muc)

**Chế độ**: BUILD · **Tier**: M (thêm model + enum vào schema dùng chung, thêm module vào registry,
state machine 9 trạng thái, gate liên module) — **không** phải Tier L: không đụng authentication,
không đụng tenant isolation, không migration phá huỷ dữ liệu, chỉ **thêm** bảng mới.

## Vì sao làm bây giờ

`ETV.P27` ban hành lần 01 ngày **26/08/2026** — điều kiện mà cả `plan.md` ngày 24/08/2026 lẫn câu
hỏi mở số 3 của M28 đều nêu là chặn. Trước đó đặc tả M27 chủ yếu là `[SUY DẪN]`, xây lên sẽ phải sửa
lại khi thủ tục ban hành khác đi — và thủ tục **đã** khác đi ở ba điểm (xem `../../DacTa.md` đầu
file). Nay luật đã chốt, xây được mà không đoán.

Ràng buộc kéo theo: **R1 của M28 là chặn cứng** — mỗi rủi ro an toàn thông tin phải gắn với ít nhất
một tài sản trong danh mục M27 (`ETV.P28` mục 6.3, `ETV.P27` §6.9.1). Không có danh mục tài sản trên
nền tảng thì M28 không xây được, và SoA của M28 sẽ có kiểm soát ghi "Áp dụng" mà không chứng minh
được kiểm kê tài sản theo ISO/IEC 27001 **A.5.9**.

## WHO

- **TP** (trưởng phòng) — `owner`, chủ sở hữu tài sản: khai báo, phân loại, rà soát định kỳ.
- **QTHT** (quản trị hệ thống) — `custodian`: người quản lý kỹ thuật, ghi nhận kiểm chứng phục hồi.
- **PT.ATTT** — soát xét mức phân loại và mức C–I–A (**≠ người lập**, P27 §6.1.5 bước 3).
- **QLCL** — cấp mã tài sản, kiểm tra trùng lặp, trình LĐV, giữ hồ sơ theo ETV.P15.
- **LĐV** — **phê duyệt** tài sản vào danh mục và phê duyệt bảng quy tắc xử lý.
- **M28 (module kế tiếp)** — người tiêu thụ chính: đọc danh mục làm đầu vào đánh giá rủi ro.
- **Đoàn đánh giá ISO/IEC 27001** — tiêu thụ bằng chứng A.5.9 (kiểm kê), A.5.12 (phân loại),
  A.5.13 (ghi nhãn), A.8.13 (sao lưu).

## WHAT

Danh mục tài sản thông tin chạy được trên `09_ENGINEERING/aios-platform`: khai báo → soát xét →
phê duyệt → đang sử dụng, với **bảng quy tắc xử lý theo mức phân loại hiển thị ngay tại màn hình
tài sản** (P27 §6.3 yêu cầu điều này bằng câu chữ: *người dùng không phải tra cứu sổ tay riêng*).

Phạm vi lần này = **danh mục tài sản** đúng như người dùng yêu cầu, tức increment 1–5 của
`../20260824-dac-ta-m27/plan.md`.

## Ngoài phạm vi lần này (nêu rõ để không đọc nhầm là đã xong)

| Hạng mục | Vì sao hoãn |
|---|---|
| Huỷ dữ liệu (`DisposalRecord`, F27.03) | Sự kiện vòng đời cuối, không chặn M28; tách increment riêng |
| Chia sẻ dữ liệu | **Không thuộc M27** — P27 §6.6 giao ETV.P34 §6.5 / F34.03 |
| Xuất PDF/Excel F27.01, F27.02 | Cần khuôn xuất của nền tảng; không chặn nghiệp vụ nhập liệu |
| Chuyển giao chủ sở hữu tự động ← M03 | Cần luồng thôi việc của M03; lần này chỉ có cờ **Tài sản vô chủ** |
| Khoá cứng quy tắc 10 (bắt buộc `risk_refs` → M28) | P27 §6.9.1 quy định **cảnh báo** cho tới khi M28 vận hành; mốc chuyển do QLCL trình LĐV |

## SUCCESS CRITERIA

1. Module M27 chuyển `ACTIVE`, hiện trong menu nhóm `DU_LIEU_SO`, mở được `/modules/M27`.
2. Khai báo được tài sản và đưa qua đủ chuỗi trạng thái tới **Đang sử dụng**; mọi bước ghi nhật ký.
3. **Tám điều kiện chặn cứng** tại P27 Phụ lục I.1 được thực thi ở tầng server action, không chỉ ở UI.
4. Màn hình chi tiết hiển thị đúng bộ quy tắc xử lý của mức phân loại hiện tại, đọc từ phiên bản
   `ClassificationRule` **đang hiệu lực** — đổi luật không phải sửa mã (NFR spec.md mục 5).
5. Tài sản mức **Mật** không hiện với vai trò không được phép, lọc ngay ở tầng truy vấn.
6. Không tồn tại đường nào xoá bản ghi tài sản, kể cả gọi thẳng server action (AC12).
7. `npm test` xanh với test cho từng điều kiện chặn; `validate_links.py` PASS.

## Rủi ro đã biết của lần BUILD này

| Rủi ro | Giảm nhẹ |
|---|---|
| Enum `Classification` sẽ được M26/M14/M15/M34 dùng lại — đặt sai chỗ thì sau phải sửa nhiều module | Khai báo **một lần** trong `schema.prisma` không mang tiền tố `M27`, đúng NFR spec.md mục 5 |
| `system_ref` trỏ M33 đã ACTIVE ⇒ FK thật; `risk_refs` trỏ M28 chưa xây ⇒ chưa có bảng | FK thật với M33; M28 để tham chiếu mềm + cảnh báo, chuyển FK khi M28 lên |
| Vai trò QTHT/PT.ATTT có thể đã tồn tại sau khi M33 lên nền tảng | RECON khuôn mẫu M33 trước khi thêm vai trò mới — tránh dựng trùng |
