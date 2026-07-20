---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát (xem §7)
id: ETV.P14
title: "Thủ tục Kiểm soát tài liệu, dữ liệu, thông tin"
type: Thu-tuc
owner: "(cập nhật — chức danh LĐP phụ trách Hệ thống quản lý)"
department: "Toàn Viện"
process: MP14_TaiLieu
capability: CAP-14_TaiLieuHoSo
module: M14_TaiLieu
effective_date: "01/07/2026"
revision: "03"
status: Da-phe-duyet
keywords: [kiểm soát tài liệu, kiểm soát hồ sơ, chữ ký số, ManLab, ISO 17025 §8.3]
related_documents: [ETV.QM, ETV.P15]
iso_clause: ["ISO/IEC 17025:2017 §8.3", "ISO 9001:2015 §7.5", "ISO 17034:2016 §8.3 (có điều kiện)", "ISO/IEC 27001:2022 A.5.9–A.5.18, A.5.37, A.8.13", "ISO/IEC 42001:2023 §7.5"]
legal_basis: ["Nghị định 30/2020/NĐ-CP", "Luật Giao dịch điện tử 20/2023/QH15", "Nghị định 130/2018/NĐ-CP (chờ thay thế theo văn bản hướng dẫn Luật GDĐT 2023)"]
ai_tags: [document-control, digital-signature, rbac]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Vĩnh viễn (bản hiện hành) — xem chi tiết theo loại tại ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: "ETV.P14 lần ban hành 02 (22/4/2023, soát xét 06/01/2024)"
superseded_by: null
---
# THỦ TỤC KIỂM SOÁT TÀI LIỆU, DỮ LIỆU, THÔNG TIN

|                           |                      |
| ------------------------- | -------------------- |
| **Mã số**         | ETV.P 14             |
| **Lần ban hành**  | 03                   |
| **Ngày ban hành** | 01/07/2026           |
| **Biên soạn**     | Nguyễn Văn Đồng  |
| **Soát xét**      | Trần Thị Hoa (01/07/2026)       |
| **Phê duyệt**     | Nguyễn Hoàng Giang (01/07/2026) |

> **Tình trạng bản này: ĐÃ PHÊ DUYỆT** — thiết kế lại toàn diện thay thế lần ban hành 02 (22/4/2023, soát xét 06/01/2024). Bản này có hiệu lực từ ngày 01/07/2026.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi                                                                                                                                                                                                                      | Lần ban hành |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| 22/04/2019 | Ban hành lần thứ nhất                                                                                                                                                                                                                 | 01             |
| 21/05/2020 | Áp dụng chính thức phần mềm quản lý ManLab                                                                                                                                                                                        | 01             |
| 22/04/2023 | Ban hành lần thứ hai                                                                                                                                                                                                                   | 02             |
| 06/01/2024 | Bổ sung văn bản bên ngoài (đến), văn bản nội bộ (đi)                                                                                                                                                                          | 02             |
| 01/07/2026 | Thiết kế lại toàn diện: RACI, metadata AI, đồng bộ trạng thái với ManLab, dẫn chiếu pháp luật/ISO cập nhật; thu hẹp phạm vi — hợp đồng chuyển về các thủ tục chuyên trách (P03 nhân sự, P07 dịch vụ...); bổ sung §IX. Các phụ lục (đăng ký Phụ lục I–VI). Theo phiếu ETV.P.F14.01 ngày 01/07/2026 | 03             |

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

---

## I. MỤC ĐÍCH

Thủ tục này quy định nội dung, trách nhiệm và trình tự kiểm soát tài liệu, dữ liệu và thông tin nhằm đáp ứng yêu cầu Điều 8.3 của ISO/IEC 17025:2017 và Mục 8.3 của Sổ tay chất lượng, bảo đảm mọi tài liệu được nhận diện, xem xét, phê duyệt, cập nhật, phân phối, lưu trữ và kiểm soát thay đổi trong suốt vòng đời của tài liệu. Áp dụng thống nhất trong toàn Viện Kiểm định Công nghệ và Môi trường (ETV), thực hiện qua phần mềm ManLab.

## II. PHẠM VI ÁP DỤNG

Áp dụng cho toàn bộ vòng đời:

**Đề xuất → Soạn thảo → Soát xét → Phê duyệt → Ban hành → Phân phối → Sử dụng → Sửa đổi → Thu hồi → Lưu trữ → Hủy bỏ → Lưu hồ sơ**

đối với mọi loại văn bản do ETV ban hành hoặc tiếp nhận:

| Nhóm                 | Loại văn bản                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| Hệ thống quản lý  | Sổ tay chất lượng, Thủ tục, Quy trình, Hướng dẫn, Biểu mẫu                              |
| Hành chính          | Quyết định, Công văn, Thông báo, Biên bản, Báo cáo                                       |
| Hồ sơ & chứng chỉ | Hồ sơ (theo ETV.P15), Giấy chứng nhận, chứng chỉ đo lường                                 |
| Văn bản điện tử  | Mọi văn bản trên do ETV số hóa/khởi tạo điện tử qua ManLab                               |
| Văn bản bên ngoài | VBQPPL, QCVN/TCVN/ĐLVN, văn bản của cơ quan công nhận/chỉ định, chứng chỉ đào tạo... |

**Không áp dụng cho:**

- **Hợp đồng** (lao động, thử việc, dịch vụ chuyên môn, giao khoán, kinh tế và phụ lục) — vòng đời hợp đồng được quy định tại các thủ tục chuyên trách: **ETV.P 03** (hợp đồng lao động, thử việc), **ETV.P 07** (hợp đồng dịch vụ khoa học công nghệ, kinh tế với khách hàng) và các thủ tục liên quan. P14 chỉ áp dụng khi các thủ tục đó dẫn chiếu về nguyên tắc kiểm soát văn bản chung (mã hoá, ký số, lưu trữ).
- Dữ liệu đo/kết quả kỹ thuật thô (thuộc MP08–MP11) và hồ sơ nhân sự chi tiết (thuộc MP03).

Các thủ tục nêu trên dẫn chiếu ngược lại P14 cho phần "kiểm soát văn bản" của chúng, tránh trùng lặp.

## III. PHÂN QUYỀN VAI TRÒ VÀ TRÁCH NHIỆM (RACI)

| Bước trong vòng đời                   | NTH         | LĐP          | LĐV          | Văn thư/QLCL |
| ------------------------------------------ | ----------- | ------------- | ------------- | -------------- |
| Đề xuất xây dựng/soát xét văn bản | **R** | C             | I             | I              |
| Thẩm định sự cần thiết               | I           | **R/A** | C             | I              |
| Soạn thảo/sửa đổi                     | **R** | I             | I             | I              |
| Soát xét kỹ thuật                      | C           | **R/A** | I             | I              |
| Phê duyệt ban hành                      | I           | C             | **R/A** | I              |
| Cấp mã số, cập nhật danh mục         | I           | I             | I             | **R/A**  |
| Phân phối, thu hồi bản cũ             | C           | I             | I             | **R/A**  |
| Phổ biến áp dụng                       | **R** | A             | I             | I              |
| Soát xét định kỳ                      | **R** | A             | I             | I              |
| Thanh lý, chuyển "Hết hiệu lực"       | I           | **R/A** | I             | C              |
| Hủy bỏ khỏi hệ thống kiểm soát      | I           | C             | **R/A** | I              |
| Lưu trữ bản gốc                        | I           | I             | I             | **R/A**  |

## IV. TÀI LIỆU TRÍCH DẪN

> Nguyên tắc: **chỉ dẫn chiếu, không chép lại nội dung.** Bản đầy đủ đặt tại `03_MANAGEMENT_SYSTEM/` (chuẩn mực) và `08_KNOWLEDGE_GRAPH/01_Regulations/` (pháp luật).

- Nghị định 30/2020/NĐ-CP — công tác văn thư (thể thức văn bản hành chính, Phụ lục I)
- Luật Giao dịch điện tử 20/2023/QH15 — chữ ký điện tử, giá trị pháp lý văn bản điện tử
- Văn bản hướng dẫn thi hành hiện hành về chữ ký số/dịch vụ tin cậy (thay thế dần Nghị định 130/2018/NĐ-CP khi có hiệu lực)
- ISO 9000:2015, TCVN ISO 9001:2015 §7.5
- ISO/IEC 17025:2017 §8.3
- ISO 17034:2016 §8.3 (áp dụng khi vận hành năng lực sản xuất chất chuẩn — CAP-12)
- ISO/IEC 27001:2022 — kiểm soát A.5.9–A.5.18, A.5.37, A.8.13
- ISO/IEC 42001:2023 §7.5
- `11_COMPLIANCE/01_ISO_Mapping/MP-ISO-mapping.md` — bảng ánh xạ đầy đủ MP ↔ điều khoản

> **Lưu ý phạm vi:** Luật Ban hành văn bản quy phạm pháp luật điều chỉnh **cơ quan nhà nước có thẩm quyền ban hành VBQPPL**. ETV không ban hành VBQPPL, chỉ tiếp nhận và áp dụng (văn bản bên ngoài) — do đó luật này không phải căn cứ ban hành văn bản nội bộ của ETV, chỉ liên quan khi xử lý văn bản bên ngoài tại 6.5.2.

## V. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

Định nghĩa chung ("văn bản", "chữ ký số", "chữ ký điện tử"...) theo ISO 9000:2015 và Luật Giao dịch điện tử 20/2023/QH15 — không nhắc lại tại đây.

| Viết tắt | Ý nghĩa                                                          |
| ---------- | ------------------------------------------------------------------ |
| ETV        | Viện Kiểm định Công nghệ và Môi trường                   |
| LĐV       | Lãnh đạo Viện (cấp trưởng, cấp phó)                       |
| LĐP       | Lãnh đạo Phòng/bộ phận                                       |
| NTH        | Người thực hiện (mọi nhân sự, không phân biệt chức vụ) |
| QLCL       | Quản lý chất lượng                                            |
| P / F      | Thủ tục / Biểu mẫu                                             |
| HTQL       | Hệ thống quản lý                                               |
| ETV.QM     | Sổ tay chất lượng                                              |
| RACI       | Responsible – Accountable – Consulted – Informed                |

> LĐV luôn là **A** cuối cùng đối với Sổ tay chất lượng, Thủ tục và phương pháp thử nội bộ (không ủy quyền).

## VI. NỘI DUNG

### 6.1 Phân loại văn bản & quy tắc mã hoá

Phân loại:

- **Văn bản nội bộ (đi):** Sổ tay chất lượng, Thủ tục, Quy trình/Hướng dẫn, Biểu mẫu, Quyết định, Công văn, Thông báo, Biên bản, Báo cáo.
- **Văn bản bên ngoài (đến):** VBQPPL (Luật/Nghị định/Thông tư/Quyết định/Công văn), QCVN/TCVN/ĐLVN, văn bản của cơ quan công nhận/chỉ định, chứng chỉ/quyết định cấp cho ETV, chứng chỉ đào tạo.
- Danh mục chi tiết từng loại: `ETV.P.F 14.02` (nội bộ), `ETV.P.F 14.03` (bên ngoài) — **không lặp lại danh sách trong thủ tục này.**

### 6.2 Quy tắc mã hoá (giữ nguyên nguyên tắc đã áp dụng từ 2019)

Chữ viết tắt tiếng Anh, các phần cách nhau bằng dấu `.`

| Loại văn bản                                   | Ký hiệu                                        | Ví dụ                         |
| ------------------------------------------------- | ------------------------------------------------ | ------------------------------- |
| Sổ tay chất lượng                             | `ETV.QM`                                       | ETV.QM                          |
| Thủ tục                                         | `ETV.P xx`                                     | ETV.P 01 (Rủi ro và cơ hội) |
| Biểu mẫu của thủ tục                         | `ETV.P.F xx.yy`                                | ETV.P.F 14.01                   |
| Quy trình hiệu chuẩn/thử nghiệm/kiểm định | `ETV.MCa xx` / `ETV.MTa xx` / `ETV.MVa xx` | ETV.MCW 01                      |
| Hướng dẫn                                      | `ETV.Gb xx`                                    | ETV.GI 01                       |
| Biểu mẫu của quy trình/hướng dẫn           | `ETV.MCa.F xx.yy` / `ETV.Gb.F xx.yy`         | ETV.MTP.F 01.01                 |

`a`/`b` = ký hiệu lĩnh vực/phân loại (A-Không khí, W-Nước, M-Khối lượng, F-Lưu lượng, O-Quang, S-Thời gian-Tần số, T-Nhiệt độ, P-Áp suất, E-Điện, H-Độ ẩm...). Danh mục đầy đủ: `ETV.P.F 14.02`.

### 6.3 Metadata chuẩn của văn bản

Mọi văn bản kiểm soát (bản điện tử) **phải** có đủ các trường sau trong ManLab. Đây là **quy định gốc duy nhất** về metadata — Skill AI, module M14 và mọi tài liệu khác chỉ được **dẫn chiếu** bảng này, không định nghĩa lại.

| Trường               | Kiểu    | Bắt buộc          | Mô tả                                                                                                                                                                       |
| ---------------------- | -------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                 | string   | ✓                  | Mã số văn bản theo §6.2, duy nhất                                                                                                                                       |
| `title`              | string   | ✓                  | Tên đầy đủ văn bản                                                                                                                                                     |
| `type`               | enum     | ✓                  | Sổ tay / Thủ tục / Quy trình / Hướng dẫn / Biểu mẫu / Quyết định / Công văn / Thông báo / Biên bản / Báo cáo / Giấy chứng nhận / Văn bản bên ngoài |
| `owner`              | string   | ✓                  | Chủ sở hữu nội dung (chức danh)                                                                                                                                          |
| `department`         | string   | ✓                  | Phòng/bộ phận áp dụng                                                                                                                                                    |
| `process`            | ref MPxx | ✓                  | Quy trình liên quan (04_PROCESS_LIBRARY)                                                                                                                                    |
| `effective_date`     | date     | ✓ (trừ Nháp)     | Ngày có hiệu lực                                                                                                                                                          |
| `revision`           | string   | ✓                  | Lần ban hành/soát xét                                                                                                                                                     |
| `status`             | enum     | ✓                  | Theo`M14_TaiLieu/07_Workflow/StateMachine.md` — không tự đặt tên trạng thái khác                                                                                   |
| `keywords`           | string[] | khuyến khích      | Từ khoá tra cứu                                                                                                                                                            |
| `related_documents`  | ref[]    | khuyến khích      | Văn bản liên quan                                                                                                                                                          |
| `iso_clause`         | string[] | ✓ (văn bản HTQL) | Điều khoản ISO áp dụng                                                                                                                                                   |
| `legal_basis`        | string[] | tuỳ                | Căn cứ pháp lý, nếu có                                                                                                                                                  |
| `ai_tags`            | string[] | tuỳ                | Nhãn phục vụ phân loại/tìm kiếm AI                                                                                                                                     |
| `embeddings`         | vector   | hệ thống tự sinh | Phục vụ tìm kiếm ngữ nghĩa (08_KNOWLEDGE_GRAPH/09_Embedding)                                                                                                            |
| `knowledge_category` | enum     | ✓                  | Nội bộ / Công khai / Mật (theo phân loại thông tin ISO/IEC 27001 A.5.12)                                                                                               |
| `permission`         | ref      | ✓                  | Nhóm quyền truy cập — dẫn chiếu`ETV.P.F 14.06`, không lặp bảng phân quyền                                                                                        |
| `retention`          | string   | ✓                  | Thời hạn lưu — dẫn chiếu`ETV.P.F 14.06`, cột "Lưu giữ (tháng)"                                                                                                    |
| `digital_signature`  | ref      | tuỳ                | Người ký số theo thẩm quyền (§11)                                                                                                                                      |
| `source`             | string   | ✓                  | Nơi phát hành/tiếp nhận                                                                                                                                                  |
| `supersedes`         | ref      | tuỳ                | Văn bản mà bản này thay thế                                                                                                                                             |
| `superseded_by`      | ref      | tuỳ                | Văn bản thay thế bản này (điền khi hết hiệu lực)                                                                                                                    |

> Trường `status` dùng đúng 7 giá trị của state machine: **Nháp · Chờ soát xét · Không soát xét · Chờ phê duyệt · Không phê duyệt · Đã phê duyệt · Hết hiệu lực/Hủy**.

### 6.4 Thể thức trình bày

| Nhóm văn bản                                                                        | Thể thức áp dụng                                                                                                                                                                                                                                                                                                                               | Mẫu (template)                                                         |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Quyết định, Công văn, Thông báo, Biên bản, Báo cáo (văn bản hành chính) | **Bắt buộc theo Phụ lục I, Nghị định 30/2020/NĐ-CP**: Quốc hiệu — Tiêu ngữ, tên cơ quan, số/ký hiệu, địa danh — ngày tháng, nơi nhận                                                                                                                                                                                | `07_AI_OPERATING_SYSTEM/01_Skills/S14_KiemSoatTaiLieu/templates/` |
| Sổ tay, Thủ tục, Quy trình, Hướng dẫn, Biểu mẫu (tài liệu HTQL)             | ETV tự quy định (không trái luật): Times New Roman 12, cách dòng single, spacing before 6pt/after 0pt, lề trên/dưới 2cm, trái 2,5cm, phải 2cm, header/footer 1cm; trang đầu có ký mã hiệu, lần/ngày ban hành; từ trang 2 có header (tên tài liệu) và footer (mã số; lần BH; ngày BH; soát xét; trang/tổng số) | `.../templates/thu_tuc.md`, `quy_trinh.md`, `huong_dan.md`        |

Khi văn bản HTQL được ban hành lại, **lần ban hành** tăng thêm 01. Khi chỉ biểu mẫu được soát xét mà thủ tục/hướng dẫn chưa ban hành lại, footer biểu mẫu chỉ ghi ngày soát xét (không tăng lần ban hành của thủ tục).

### 6.5 Dấu hiệu kiểm soát

| Hình thức              | Còn hiệu lực                                                                  | Hết hiệu lực                                                                                       |
| ------------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Bản giấy               | Đóng dấu**"TÀI LIỆU KIỂM SOÁT"** (hoặc dấu pháp nhân thay thế) | Đóng dấu**"TÀI LIỆU KHÔNG KIỂM SOÁT"** hoặc cắt góc phải, lưu theo quy định hủy |
| Bản điện tử (ManLab) | `status = Đã phê duyệt` (đã công bố)                                   | `status = Hết hiệu lực/Hủy`                                                                     |

Bản giấy có dấu "TÀI LIỆU KIỂM SOÁT" khi được photo cho bất kỳ mục đích nào đều **tự động trở thành văn bản không kiểm soát**. Cung cấp văn bản cho bên liên quan bắt buộc có sự đồng ý của cấp phê duyệt.

### 6.6 Vòng đời văn bản — quy trình thực hiện

### 6.6.1 Văn bản nội bộ (đi)

| Bước                    | Nội dung                                                                                                                                              | Trách nhiệm | Biểu mẫu                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | -------------------------------- |
| 1. Đề xuất             | Lập phiếu đề nghị xây dựng mới/soát xét                                                                                                      | NTH → LĐP   | `ETV.P.F 14.01`                |
| 2. Thẩm định           | LĐP xác định mức độ cần thiết; phân công người soạn thảo, người soát xét, thời hạn                                                | LĐP          | `ETV.P.F 14.01`                |
| 3. Soạn thảo            | Biên soạn/sửa đổi theo phân công (`status: Nháp`)                                                                                            | NTH           | —                               |
| 4. Soát xét             | Chuyển`Chờ soát xét`; góp ý; đạt → `Chờ phê duyệt`, không đạt → `Không soát xét` (bắt buộc nêu lý do, quay lại bước 3) | LĐP          | Bản góp ý (nếu có)          |
| 5. Phê duyệt            | LĐV xem xét →`Đã phê duyệt` hoặc `Không phê duyệt` (bắt buộc lý do)                                                                  | LĐV          | `ETV.P.F 14.01`                |
| 6. Ban hành              | Cấp mã số, lưu bản gốc, cập nhật danh mục                                                                                                     | LĐP/QLCL     | `ETV.P.F 14.02`                |
| 7. Phân phối            | Photo, đóng dấu kiểm soát, giao nhận, thu hồi bản cũ                                                                                          | NTH/QLCL      | `ETV.P.F 14.04`                |
| 8. Công bố              | Phổ biến áp dụng cho nhân sự liên quan                                                                                                          | NTH           | Biên bản phổ biến (nếu có) |
| 9. Lưu bản gốc         | Bản in + bản điện tử                                                                                                                              | QLCL          | Cặp công văn đi              |
| 10. Soát xét định kỳ | Theo chu kỳ tối đa 36 tháng hoặc khi có thay đổi pháp luật/ISO/tổ chức                                                                     | LĐP          | —                               |
| 11. Thanh lý             | Chuyển`Đã phê duyệt` → `Hết hiệu lực`; nếu cần giữ tham khảo, đóng dấu "TÀI LIỆU KHÔNG KIỂM SOÁT"                             | NTH/QLCL      | `ETV.P.F 14.05`                |

### 6.6.2 Văn bản bên ngoài (đến)

| Bước             | Nội dung                                                                                                                      | Trách nhiệm | Biểu mẫu            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------- | --------------------- |
| 1. Tiếp nhận     | Đóng dấu đến, ghi sổ ngày giờ (theo Nghị định 30/2020/NĐ-CP)                                                       | Văn thư     | —                    |
| 2. Xử lý         | Khởi tạo bản ghi, cập nhật metadata (§7), gửi soát xét LĐP, gửi phê duyệt LĐV (nếu cần áp dụng chính thức) | NTH/LĐP/LĐV | `ETV.P.F 14.03`     |
| 3. Lưu bản gốc  | Bản in + bản điện tử                                                                                                      | NTH           | Cặp công văn đến |
| 4. Công bố       | Phổ biến áp dụng                                                                                                           | NTH/LĐP/LĐV | —                    |
| 5. Hết hiệu lực | Chuyển`Hết hiệu lực`; đóng dấu "TÀI LIỆU KHÔNG KIỂM SOÁT" nếu giữ tham khảo                                   | NTH           | `ETV.P.F 14.05`     |

### 6.6.3 Văn bản điện tử trên ManLab

Quản lý theo state machine chuẩn tại `05_MODULE_LIBRARY/M14_TaiLieu/07_Workflow/StateMachine.md` (không định nghĩa lại tại đây). Phân quyền theo tài khoản (Super Admin/LĐV/LĐP/Nhân viên/Khách hàng/CTV/Viewer): xem `ETV.P.F 14.06`. Lưu trữ/sao lưu: cloud + NAS theo tài khoản được Ban Lãnh đạo phê duyệt.

### 6.7 Chữ ký số & chữ ký điện tử

Áp dụng theo Luật Giao dịch điện tử 20/2023/QH15 và văn bản hướng dẫn hiện hành (§3) — **không chép lại điều khoản luật tại đây.** Nguyên tắc nội bộ:

Ưu tiên phát hành văn bản điện tử có chữ ký số; chữ ký tay áp dụng khi chưa đủ điều kiện hạ tầng.
Viện trưởng giao văn thư quản lý khóa bí mật con dấu tổ chức; mỗi cá nhân tự chịu trách nhiệm bảo mật khóa bí mật cá nhân, không chuyển giao khi chưa có ủy quyền bằng văn bản.
Chỉ ký số vào văn bản sau khi đã có đủ chữ ký/phê duyệt theo đúng luồng RACI (III); không ký số thay quy trình soát xét/phê duyệt.
Thẩm quyền ký số theo từng loại văn bản cụ thể: xem `ETV.P.F 14.06`.

### 6.8 Phân quyền hệ thống

Phân quyền truy cập theo menu và theo hành động (xem/tạo/sửa/xóa/xuất/đề nghị soát xét/đề nghị phê duyệt/phê duyệt...) cho từng nhóm tài khoản (Super Admin, LĐV, LĐP, Nhân viên, Khách hàng, Cộng tác viên, Viewer) được quy định **đầy đủ và duy nhất** tại `ETV.P.F 14.06` — P14 không lặp lại bảng phân quyền, chỉ dẫn chiếu. Mọi thay đổi phân quyền phải cập nhật `ETV.P.F 14.06` trước, sau đó mới cấu hình trên ManLab.

### 6.9 Vai trò của AI trong kiểm soát tài liệu

ETV sử dụng Claude Skill **`etv-document-governance`** (tại `07_AI_OPERATING_SYSTEM/01_Skills/S14_KiemSoatTaiLieu/`) để hỗ trợ: nhận diện loại văn bản, gợi ý mã số, kiểm tra thể thức, kiểm tra căn cứ pháp lý/ISO, phát hiện xung đột, nhắc soát xét định kỳ, khởi tạo metadata.

**Nguyên tắc bất biến:** AI chỉ **gợi ý và cảnh báo**; không tự quyết định soát xét, phê duyệt, ký số, thu hồi hay hủy văn bản. Mọi triển khai agent AI liên quan phải có hồ sơ đánh giá tác động (AIA) theo **MP29_AI**, đúng nguyên tắc đã quy định tại `07_AI_OPERATING_SYSTEM/01_Skills/README.md` và ISO/IEC 42001 §7.5.

### 6.10 Soát xét định kỳ & xử lý xung đột

Toàn bộ văn bản HTQL (Sổ tay, Thủ tục, Quy trình, Hướng dẫn) được soát xét định kỳ **tối đa 36 tháng/lần**, độc lập với soát xét phát sinh theo nhu cầu (6.5.1 bước 10).
Khi phát hiện hai văn bản có phạm vi trùng lặp hoặc nội dung mâu thuẫn (do AI cảnh báo hoặc do NTH phát hiện), LĐP phụ trách phải lập phiếu soát xét hợp nhất trong vòng 15 ngày làm việc.
Khi văn bản bên ngoài dẫn chiếu (Luật/Nghị định/TCVN...) được thay thế, LĐP rà soát và cập nhật `legal_basis`/`iso_clause` của văn bản nội bộ liên quan trong vòng 30 ngày kể từ ngày văn bản mới có hiệu lực.

### 6.11 Thanh lý, hủy bỏ, lưu trữ

- **Thanh lý** = chuyển trạng thái sang `Hết hiệu lực` (văn bản vẫn được lưu, có thể giữ tham khảo với dấu "TÀI LIỆU KHÔNG KIỂM SOÁT").
- **Hủy bỏ** = loại văn bản khỏi phạm vi kiểm soát (xoá bản lưu hành, giữ lại bản lưu trữ tối thiểu theo `ETV.P.F 14.06`); chỉ LĐV quyết định, bắt buộc nêu lý do (`ETV.P.F 14.05`).
- **Lưu trữ**: bản gốc (in + điện tử) theo `ETV.P 15 — Thủ tục kiểm soát hồ sơ`; thời hạn theo `ETV.P.F 14.06`.

## VII. BIỂU MẪU ÁP DỤNG

| Mã               | Tên                                                          |
| ----------------- | ------------------------------------------------------------- |
| `ETV.P.F 14.01` | Phiếu đề nghị soát xét, sửa đổi, ban hành văn bản |
| `ETV.P.F 14.02` | Danh mục văn bản nội bộ                                  |
| `ETV.P.F 14.03` | Danh mục văn bản bên ngoài                               |
| `ETV.P.F 14.04` | Phiếu giao nhận văn bản                                   |
| `ETV.P.F 14.05` | Phiếu đề nghị thanh lý/hủy văn bản, hồ sơ           |
| `ETV.P.F 14.06` | Danh mục phân quyền tài khoản & thời hạn lưu          |

Bản trắng của toàn bộ biểu mẫu: `06_SHARED_RESOURCES/01_Forms/`.

## VIII. LƯU HỒ SƠ

Toàn bộ hồ sơ phát sinh từ thủ tục này được ghi chép đầy đủ và lưu trữ theo **ETV.P 15 — Thủ tục kiểm soát hồ sơ**.

## IX. CÁC PHỤ LỤC

Các phụ lục dưới đây là tài liệu bổ trợ, chi tiết hoá các quy tắc đã nêu tại §VI. Chúng được **vận hành hoá và duy trì** trong skill kiểm soát tài liệu (`07_AI_OPERATING_SYSTEM/01_Skills/S14_KiemSoatTaiLieu/knowledge/`), không chép nguyên văn luật/ISO mà chỉ dẫn chiếu điều khoản. Khi có mâu thuẫn, nội dung thân thủ tục (§I–VIII) được **ưu tiên áp dụng**; phụ lục được cập nhật đồng bộ khi thủ tục soát xét.

| Phụ lục | Nội dung | Nguồn |
| --------- | ---------- | ------- |
| **Phụ lục I** | Căn cứ pháp luật áp dụng (chi tiết điều khoản) | `knowledge/01_phap_luat.md` |
| **Phụ lục II** | Điều khoản ISO áp dụng | `knowledge/02_iso.md` |
| **Phụ lục III** | Quy tắc mã hoá & phân loại văn bản | `knowledge/03_ma_hoa_van_ban.md` |
| **Phụ lục IV** | Lược đồ metadata chuẩn của văn bản | `knowledge/04_metadata_schema.md` |
| **Phụ lục V** | Vòng đời & bảng trạng thái văn bản | `knowledge/05_vong_doi_van_ban.md` |
| **Phụ lục VI** | Quy tắc chữ ký số & chữ ký điện tử | `knowledge/07_ky_so.md` |

> Các phụ lục trên là tài liệu tham chiếu kỹ thuật; việc bổ sung, sửa đổi phụ lục không làm thay đổi hiệu lực thân thủ tục nhưng phải được ghi nhận tại bảng "Những thay đổi đã có" khi soát xét.

---

*Thủ tục Kiểm soát tài liệu, dữ liệu, thông tin — ETV.P 14 — Lần BH: 03 — Trang tài liệu điện tử, không áp dụng đánh số trang thủ công (bản in xuất từ ManLab tự sinh header/footer theo §8).*
