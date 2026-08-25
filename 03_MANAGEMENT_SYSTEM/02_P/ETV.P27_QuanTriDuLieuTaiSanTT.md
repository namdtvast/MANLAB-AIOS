---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát (ETV.P14 §6.3)
id: ETV.P27
title: "Thủ tục Quản trị dữ liệu và tài sản thông tin"
type: Thu-tuc
owner: "Phụ trách Quản lý chất lượng (QLCL)"
department: "Toàn Viện"
process: MP27_TaiSanTT
capability: [CAP-28_ATTT]
module: M27_TaiSanTT
effective_date: ""
revision: "01"
status: Cho-soat-xet
keywords: [tài sản thông tin, kiểm kê tài sản, phân loại thông tin, chủ sở hữu tài sản, sao lưu, hủy dữ liệu, ISO/IEC 27001 A.5.9, A.5.12]
related_documents: [ETV.QM, ETV.P01, ETV.P02, ETV.P03, ETV.P13, ETV.P14, ETV.P15, ETV.P17, ETV.P26, ETV.P28, ETV.P29, ETV.P31, ETV.P33, ETV.P34, ETV.P35, ETV.P37]
iso_clause: ["ISO 9001:2015 §7.5", "ISO/IEC 17025:2017 §4.2, §7.11", "ISO 17034:2016 §7.4", "ISO/IEC 27001:2022 §8.2, A.5.9–A.5.14, A.5.33, A.7.10, A.8.10, A.8.13", "ISO/IEC 42001:2023 §7.4"]
legal_basis: ["Luật Giao dịch điện tử 20/2023/QH15", "Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân (theo dẫn chiếu tại ETV.P02 §6.9)", "Pháp luật hiện hành về an toàn thông tin mạng"]
ai_tags: [asset-inventory, classification, backup, disposal]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Vĩnh viễn (bản hiện hành) — xem chi tiết theo loại tại ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: null
superseded_by: null
---
# THỦ TỤC QUẢN TRỊ DỮ LIỆU VÀ TÀI SẢN THÔNG TIN

**Procedure For Data And Information Asset Governance**

|                   |                                          |
| ----------------- | ---------------------------------------- |
| **Mã số**         | ETV.P 27                                 |
| **Lần ban hành**  | 01                                       |
| **Ngày ban hành** | ..../..../........                       |
| **Biên soạn**     | Dương Thành Nam — ..../..../........     |
| **Soát xét**      | Đỗ Văn Vinh — Lãnh đạo Phòng, ..../..../........ |
| **Phê duyệt**     | Nguyễn Hoàng Giang — Lãnh đạo Viện, ..../..../........ |

> **Tình trạng bản này: CHỜ SOÁT XÉT** — dự thảo lần đầu, chưa có hiệu lực. Bản này chỉ được áp dụng sau khi Lãnh đạo Viện phê duyệt và chuyển trạng thái **Đã phê duyệt** theo ETV.P14.

> **Chú ý:** Tài liệu nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện Kiểm định Công nghệ và Môi trường.

> **Ghi chú soạn thảo.** Dự thảo lấy đặc tả module `M27_TaiSanTT/01_Requirement/DacTa.md` làm đầu vào và **chốt** các điểm đặc tả để ngỏ: thang phân loại 4 mức (§6.2), ranh giới với ETV.P34 (§2.3), chu kỳ kiểm chứng phục hồi (§6.5.2), thẩm quyền phê duyệt chia sẻ (§6.6), xử lý dữ liệu cá nhân (§6.4), lộ trình kiểm kê kỳ đầu (§6.1.6). **Khác đặc tả ở bộ biểu mẫu:** đặc tả đề xuất 05 biểu mẫu F27.01–F27.05, thủ tục này chỉ lập **03** — luồng chia sẻ dữ liệu dùng `F34.03` của ETV.P34, phiếu kiểm chứng phục hồi dùng `F31.03` của ETV.P31, tránh lập biểu mẫu trùng chức năng (nguyên tắc một nơi duy nhất, ETV.P14). Các **giá trị định lượng** là **đề xuất**, cần Viện xác nhận trước khi ban hành.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi | Lần ban hành |
| ---------- | ------------------- | -------------- |
| ..../..../........ | Ban hành lần thứ nhất. Thủ tục mới, hiện thực hoá Sổ tay chất lượng §9.4 và quy trình MP27; xác lập **thang phân loại thông tin chuẩn của Viện** mà ETV.P28 mục 5.3 và các thủ tục khác dẫn chiếu | 01 |

---

## I. MỤC ĐÍCH

Thủ tục này quy định nội dung, trách nhiệm và trình tự **kiểm kê, phân loại, giao chủ sở hữu, bảo vệ theo mức phân loại, sao lưu, lưu giữ và huỷ** dữ liệu cùng tài sản thông tin của Viện ETV, nhằm đáp ứng yêu cầu Điều 4.2 và 7.11 của ISO/IEC 17025:2017, Điều 7.4 của ISO 17034:2016, Điều 7.5 của ISO 9001:2015, các kiểm soát A.5.9–A.5.14, A.5.33, A.7.10, A.8.10, A.8.13 của ISO/IEC 27001:2022 và Mục 9.4 của Sổ tay chất lượng. Cụ thể để:

1. Bảo đảm **không có tài sản thông tin vô chủ** — mỗi tài sản có một **cá nhân** chịu trách nhiệm, không phải "phòng nào đó".
2. Xác lập **thang phân loại thông tin duy nhất của Viện** (Công khai · Nội bộ · Hạn chế · Mật) và **bảng quy tắc xử lý bắt buộc** theo từng mức — để mọi thủ tục, module khác dẫn chiếu thay vì tự định nghĩa.
3. Bảo đảm dữ liệu khách hàng và dữ liệu kết quả đo được bảo vệ ở mức tương xứng với nghĩa vụ bảo mật của Viện (ISO/IEC 17025 §4.2).
4. Bảo đảm **sao lưu chỉ được coi là biện pháp có hiệu lực khi đã được chứng minh bằng kiểm chứng phục hồi** — bản sao lưu chưa từng phục hồi thử không phải phương án bảo vệ.
5. Bảo đảm dữ liệu **được huỷ đúng cách, đúng thời điểm, có phê duyệt trước và bằng chứng sau**; bản ghi kiểm kê không bao giờ bị xoá.
6. Bảo đảm dữ liệu cá nhân được xử lý có **căn cứ pháp lý, mục đích và thời hạn lưu hữu hạn**.
7. Cung cấp **danh mục tài sản thông tin** làm đầu vào bắt buộc cho đánh giá rủi ro an toàn thông tin (ETV.P28) và cho kế hoạch duy trì liên tục hoạt động (ETV.P31).

Áp dụng thống nhất trong toàn Viện ETV, thực hiện qua phần mềm ManLab (Module M27 – Quản trị dữ liệu và tài sản thông tin).

---

## II. PHẠM VI ÁP DỤNG

### 2.1. Đối tượng áp dụng

Áp dụng cho toàn bộ đơn vị, phòng ban, cá nhân thuộc Viện ETV và cho **mọi tài sản thông tin** của Viện, bất kể ở dạng điện tử hay giấy:

| TT | Loại tài sản | Ví dụ |
|---|---|---|
| 1 | Cơ sở dữ liệu, tập dữ liệu điện tử | Cơ sở dữ liệu ManLab, tập dữ liệu đo |
| 2 | Tệp tài liệu điện tử | Thư mục dùng chung, tài liệu trên nền tảng |
| 3 | **Hồ sơ giấy** | Hồ sơ khách hàng, sổ theo dõi, phiếu kết quả bản in |
| 4 | Ứng dụng, nền tảng chứa dữ liệu | ManLab, cổng dịch vụ khách hàng (đăng ký tại ETV.P35) |
| 5 | Vật mang tin rời | Ổ cứng ngoài, USB, băng từ, đĩa quang |
| 6 | Dữ liệu trên dịch vụ bên thứ ba | Thư điện tử, lưu trữ đám mây, dịch vụ do nhà cung cấp vận hành |
| 7 | Dữ liệu đo trực tiếp từ thiết bị | Dữ liệu thô trên máy tính điều khiển thiết bị đo (thiết bị kiểm kê tại ETV.P33) |
| 8 | Bản sao lưu | Bản sao lưu của các tài sản nêu trên, kể cả bản lưu tại bên thứ ba |

Dữ liệu được quản lý thống nhất trên phần mềm ManLab (Module M27 – Quản trị dữ liệu và tài sản thông tin).

### 2.2. Nguyên tắc áp dụng

**Nguyên tắc 1 — Kiểm kê, không sao chép.** Danh mục tài sản thông tin là **bản kiểm kê**, không phải kho dữ liệu. Bản ghi chỉ lưu **thuộc tính quản trị và đường dẫn** tới nơi dữ liệu thật nằm: hệ thống, thiết bị (ETV.P33), nền tảng (ETV.P35), tài liệu (ETV.P14), hồ sơ (ETV.P15). **Nghiêm cấm** chép nội dung dữ liệu thật vào bản ghi kiểm kê.

**Nguyên tắc 2 — Một thang phân loại duy nhất.** Thang phân loại tại §6.2 do thủ tục này sở hữu; ETV.P02, ETV.P14, ETV.P15, ETV.P26, ETV.P28, ETV.P33, ETV.P34, ETV.P35 **kế thừa nguyên tên gọi và ý nghĩa**, không định nghĩa thang riêng. Thay đổi thang phải ban hành phiên bản mới của bảng quy tắc xử lý và rà soát lại toàn bộ tài sản bị ảnh hưởng.

**Nguyên tắc 3 — Sao lưu chưa phục hồi thử thì chưa phải sao lưu.** Bản sao lưu chỉ được ghi nhận là biện pháp kiểm soát có hiệu lực khi đã có **kiểm chứng phục hồi đạt** trong chu kỳ quy định (ISO/IEC 27001 A.8.13).

**Nguyên tắc 4 — Thời hạn lưu không đặt hai nơi.** Tài sản là **hồ sơ** → thời hạn theo ETV.P15; là **tài liệu kiểm soát** → theo ETV.P14 và `ETV.P.F 14.06`. Thủ tục này chỉ tự đặt thời hạn cho dữ liệu không thuộc hai loại trên (cơ sở dữ liệu vận hành, bản sao lưu, nhật ký hệ thống).

### 2.3. Ngoài phạm vi

Thủ tục này **không** thay thế và **không** trùng lặp với:

| Nội dung | Thuộc thủ tục |
|---|---|
| **Chất lượng dữ liệu**, từ điển dữ liệu, dữ liệu chủ, hiệu chỉnh dữ liệu, truy xuất nguồn gốc | ETV.P34 – Quản lý dữ liệu số |
| Chính sách an toàn thông tin, đánh giá rủi ro, SoA, **phê duyệt quyền truy cập**, sự cố an toàn thông tin | ETV.P28 – Quản lý an toàn thông tin |
| Nghĩa vụ bảo mật với khách hàng, cam kết bảo mật, phê duyệt **công bố thông tin khách hàng** | ETV.P02 – Bảo mật |
| Kiểm kê **thiết bị, hệ thống, phần mềm**; xoá dữ liệu trước thanh lý thiết bị | ETV.P33 – Quản lý hệ thống thông tin |
| Đăng ký, đánh giá và ngừng vận hành nền tảng số | ETV.P35 – Quản lý nền tảng số |
| **Kiểm chứng phục hồi** theo kịch bản gián đoạn, RTO/RPO, diễn tập | ETV.P31 – Quản lý tính liên tục hoạt động |
| Nhận dạng, lưu giữ, bảo quản, thời hạn lưu và thanh lý **hồ sơ** | ETV.P15 – Kiểm soát hồ sơ |
| Vòng đời, phiên bản, hiệu lực của **tài liệu kiểm soát** | ETV.P14 – Kiểm soát tài liệu |
| Điểm tích hợp, hợp đồng dữ liệu giữa các hệ thống | ETV.P37 – Tích hợp dữ liệu |
| Đánh giá tác động và kiểm soát hệ thống trí tuệ nhân tạo | ETV.P29 – Quản lý hệ thống trí tuệ nhân tạo |
| Tri thức tổ chức, bài học kinh nghiệm | ETV.P26 – Quản lý tri thức tổ chức |
| Nhận diện, đánh giá, xử lý rủi ro | ETV.P01 – Rủi ro và cơ hội |
| Sự không phù hợp và hành động khắc phục | ETV.P13 – Khắc phục, cải tiến |

> **Phân biệt cốt lõi:** **ETV.P27** trả lời *"Viện có những tài sản thông tin nào, ai chịu trách nhiệm, mức bảo vệ nào, sao lưu và huỷ ra sao"*; ETV.P34 trả lời *"dữ liệu đó có đúng không, ai được dùng, dùng thế nào"*; ETV.P28 trả lời *"rủi ro nào và bảo vệ bằng biện pháp gì"*; ETV.P33 trả lời *"nằm trên thiết bị nào"*; ETV.P15 trả lời *"hồ sơ lưu bao lâu, ở đâu"*.

---

## III. TÀI LIỆU VIỆN DẪN

> Nguyên tắc: **chỉ dẫn chiếu, không chép lại nội dung.** Bản đầy đủ đặt tại `03_MANAGEMENT_SYSTEM/` (chuẩn mực) và `08_KNOWLEDGE_GRAPH/01_Regulations/` (pháp luật). QLCL rà soát hiệu lực và văn bản thay thế trước mỗi lần ban hành lại.

### 3.1. Tiêu chuẩn

- ISO 9001:2015 §7.5 (Thông tin dạng văn bản)
- ISO/IEC 17025:2017 §4.2 (Bảo mật); §7.11 (Kiểm soát dữ liệu và quản lý thông tin)
- ISO 17034:2016 §7.4 (Kiểm soát dữ liệu)
- ISO/IEC 27001:2022 §8.2; A.5.9 (Kiểm kê tài sản); A.5.10 (Sử dụng chấp nhận được); A.5.11 (Trả lại tài sản); A.5.12 (Phân loại thông tin); A.5.13 (Gắn nhãn thông tin); A.5.14 (Truyền nhận thông tin); A.5.33 (Bảo vệ hồ sơ); A.7.10 (Phương tiện lưu trữ); A.8.10 (Xoá thông tin); A.8.13 (Sao lưu thông tin)
- ISO/IEC 42001:2023 §7.4 — dữ liệu dùng cho hệ thống AI
- `11_COMPLIANCE/01_ISO_Mapping/MP-ISO-mapping.md` — bảng ánh xạ đầy đủ MP ↔ điều khoản

### 3.2. Văn bản pháp luật

- **Nghị định 13/2023/NĐ-CP** về bảo vệ dữ liệu cá nhân — căn cứ, mục đích, thời hạn xử lý và nghĩa vụ thông báo (dẫn chiếu thống nhất với ETV.P02 §6.9; QLCL rà soát văn bản sửa đổi, thay thế trước mỗi lần ban hành lại)
- Luật Giao dịch điện tử số 20/2023/QH15 — giá trị pháp lý của thông điệp dữ liệu
- Pháp luật hiện hành về **an toàn thông tin mạng**
- Quy định pháp luật chuyên ngành về **lưu giữ hồ sơ đo lường, thử nghiệm** — thời hạn lưu không được ngắn hơn mức pháp luật yêu cầu

### 3.3. Văn bản nội bộ Viện ETV

- Sổ tay quản lý chất lượng (ETV.QM) §9.4 và §7.11
- ETV.P01 – Quản lý rủi ro và cơ hội · ETV.P02 – Bảo mật · ETV.P03 – Quản lý nhân sự · ETV.P13 – Khắc phục, cải tiến
- ETV.P14 – Kiểm soát tài liệu · ETV.P15 – Kiểm soát hồ sơ · ETV.P17 – Xem xét của lãnh đạo · ETV.P26 – Quản lý tri thức tổ chức
- ETV.P28 – Quản lý an toàn thông tin · ETV.P29 – Quản lý hệ thống trí tuệ nhân tạo · ETV.P31 – Quản lý tính liên tục hoạt động
- ETV.P33 – Quản lý hệ thống thông tin · ETV.P34 – Quản lý dữ liệu số · ETV.P35 – Quản lý nền tảng số · ETV.P37 – Tích hợp dữ liệu

---

## IV. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 4.1. Thuật ngữ và định nghĩa

Định nghĩa chung ("thông tin", "tài sản", "hồ sơ") theo ISO 9000:2015 và ISO/IEC 27000 — không nhắc lại tại đây. Các thuật ngữ riêng của thủ tục này:

| Thuật ngữ | Định nghĩa |
|---|---|
| **Tài sản thông tin** | Thông tin, dữ liệu hoặc vật mang tin có giá trị đối với Viện, được kiểm kê thành **một bản ghi** trong danh mục, có chủ sở hữu và mức phân loại xác định |
| **Chủ sở hữu tài sản** (owner) | **Một cá nhân** — thường là Lãnh đạo Phòng hoặc người phụ trách lĩnh vực — chịu trách nhiệm về việc tài sản tồn tại, được phân loại đúng, được sử dụng đúng mục đích và được rà soát định kỳ |
| **Người quản lý kỹ thuật** (custodian) | Người vận hành nơi tài sản được lưu; thực hiện sao lưu, kiểm chứng phục hồi, cấp quyền theo phê duyệt và xoá dữ liệu an toàn |
| **Mức phân loại thông tin** | Một trong bốn mức **Công khai · Nội bộ · Hạn chế · Mật** (§6.2), quyết định mức kiểm soát tối thiểu về truy cập, truyền nhận, lưu trữ, sao lưu và huỷ |
| **Bảng quy tắc xử lý** | Bảng luật có phiên bản, quy định với mỗi cặp *(mức phân loại × hành động)* yêu cầu bắt buộc hoặc điều cấm (§6.3) |
| **Mức yêu cầu C–I–A** | Mức yêu cầu về **Bảo mật** (Confidentiality), **Toàn vẹn** (Integrity), **Sẵn sàng** (Availability) của tài sản, theo ba bậc Thấp · Trung bình · Cao; là đầu vào của đánh giá rủi ro tại ETV.P28 |
| **Sao lưu** | Bản sao dữ liệu được tạo và lưu tách biệt nhằm khôi phục khi dữ liệu gốc bị mất, hỏng hoặc không truy cập được |
| **Kiểm chứng phục hồi** | Việc phục hồi thật một bản sao lưu vào môi trường kiểm thử và xác nhận dữ liệu **đọc được, đúng và đủ**; kiểm tra "sao lưu chạy thành công" **không** phải kiểm chứng phục hồi (định nghĩa thống nhất với ETV.P31) |
| **Vật mang tin** | Phương tiện vật lý chứa dữ liệu: ổ cứng, USB, băng từ, đĩa quang, giấy |
| **Xoá an toàn** | Việc xoá dữ liệu điện tử bằng phương pháp không khôi phục được bằng công cụ thông thường (ghi đè theo chuẩn, huỷ khoá mã hoá) |
| **Huỷ dữ liệu** | Việc chấm dứt sự tồn tại của dữ liệu hoặc vật mang tin khi hết thời hạn lưu, có phê duyệt trước và bằng chứng sau |
| **Chia sẻ dữ liệu ra ngoài** | Việc cung cấp dữ liệu cho tổ chức, cá nhân ngoài Viện — luồng phê duyệt thực hiện theo ETV.P34 §6.5 và ETV.P02 |

### 4.2. Chữ viết tắt

| Chữ viết tắt | Ý nghĩa |
|---|---|
| ETV | Viện Kiểm định Công nghệ và Môi trường |
| HTQL | Hệ thống quản lý |
| LĐV | Lãnh đạo Viện |
| LĐP / TP | Lãnh đạo Phòng / Trưởng phòng, người phụ trách lĩnh vực |
| NTH | Người thực hiện (mọi nhân sự, không phân biệt chức vụ) |
| QLCL | Phụ trách Quản lý chất lượng |
| QTHT | Quản trị hệ thống |
| PT.ATTT | Người phụ trách an toàn thông tin |
| C–I–A | Bảo mật – Toàn vẹn – Sẵn sàng |
| KPH | Sự không phù hợp và hành động khắc phục (theo ETV.P13) |
| ManLab | Nền tảng số hợp nhất của Viện (ManLab AIOS) |
| RACI | Responsible – Accountable – Consulted – Informed |

---

## V. VAI TRÒ VÀ TRÁCH NHIỆM (RACI)

### 5.1. Ma trận RACI

| Bước trong vòng đời tài sản thông tin | NTH | TP *(chủ sở hữu)* | QTHT *(quản lý kỹ thuật)* | PT.ATTT | QLCL | LĐV |
|---|---|---|---|---|---|---|
| Khai báo tài sản vào danh mục (F27.01) | C | **R** | **R** | I | C | I |
| Gán **mức phân loại** và mức C–I–A | I | **R** | C | **A** | C | I |
| Soát xét phân loại và mức C–I–A | I | C | I | **R/A** | C | I |
| Phê duyệt tài sản vào danh mục | I | C | I | C | C | **R/A** |
| Ban hành **bảng quy tắc xử lý** (F27.02) | I | C | C | **R** | **R** | **A** |
| Xác định thời hạn lưu và nhu cầu sao lưu | I | **R/A** | C | C | C | I |
| Thực hiện sao lưu theo tần suất đã duyệt | I | A | **R/A** | C | I | I |
| Thực hiện **kiểm chứng phục hồi** | I | I | **R** | C | C | I |
| **Xác nhận kết quả** kiểm chứng phục hồi *(≠ người thực hiện)* | I | I | I | **R** | **R/A** | I |
| Đề nghị chia sẻ dữ liệu ra ngoài | **R** | **R** | C | C | C | I |
| Phê duyệt chia sẻ dữ liệu ra ngoài | I | C | I | **R** *(ý kiến)* | C | **R/A** |
| Rà soát định kỳ tài sản | C | **R/A** | C | C | **R** | I |
| Chuyển giao chủ sở hữu khi biến động nhân sự | I | **R** | C | I | **A** | I |
| Đề nghị huỷ dữ liệu (F27.03) | I | **R** | C | C | **R** | I |
| **Phê duyệt huỷ** dữ liệu | I | C | I | **R** *(phương pháp huỷ)* | C | **R/A** |
| Thực hiện huỷ; chứng kiến huỷ *(hai người khác nhau)* | **R** | C | **R** | C | **A** | I |
| Cung cấp danh mục làm đầu vào đánh giá rủi ro ATTT | I | C | C | **R** | **R/A** | I |
| Duyệt tài sản được dùng làm nguồn cho hệ thống AI | I | **R** | C | **R** | C | **A** |
| Tổng hợp báo cáo phục vụ xem xét của lãnh đạo | I | C | C | C | **R/A** | I |

> LĐV luôn là **A** cuối cùng đối với **bảng quy tắc xử lý**, **chia sẻ dữ liệu ra ngoài**, **huỷ dữ liệu** và **cho phép dùng dữ liệu cho hệ thống AI** — không uỷ quyền.

### 5.2. Trách nhiệm cụ thể

**Lãnh đạo Viện (LĐV):** Phê duyệt danh mục tài sản thông tin và bảng quy tắc xử lý theo mức phân loại; phê duyệt việc chia sẻ dữ liệu ra ngoài Viện và việc huỷ dữ liệu; phê duyệt danh sách cá nhân được tiếp cận tài sản mức **Mật**; phê duyệt việc dùng tài sản làm nguồn cho hệ thống trí tuệ nhân tạo; xem xét tình hình tài sản thông tin trong cuộc họp xem xét của lãnh đạo (ETV.P17).

**Lãnh đạo Phòng — chủ sở hữu tài sản (TP):** Khai báo và duy trì bản ghi tài sản thuộc phạm vi phụ trách; **gán mức phân loại** và mức C–I–A; xác định thời hạn lưu và nhu cầu sao lưu; rà soát định kỳ; đề nghị chia sẻ, đề nghị huỷ; bàn giao trách nhiệm khi chuyển công tác. Chủ sở hữu là **một cá nhân**, không ghi tên phòng.

**Quản trị hệ thống (QTHT):** Thực hiện sao lưu đúng tần suất đã phê duyệt; thực hiện **kiểm chứng phục hồi** và lưu bằng chứng; thực hiện cấp, thu hồi quyền truy cập theo phê duyệt của ETV.P28; thực hiện **xoá an toàn** và huỷ vật mang tin theo phiếu đã phê duyệt; **không** tự quyết định mức phân loại, không tự quyết định huỷ.

**Người phụ trách an toàn thông tin (PT.ATTT):** Soát xét mức phân loại và mức C–I–A của tài sản; chủ trì dự thảo bảng quy tắc xử lý; **xác nhận kết quả kiểm chứng phục hồi** (khi không phải người thực hiện); cho ý kiến bắt buộc về phương pháp huỷ và về mọi yêu cầu chia sẻ dữ liệu ra ngoài; đối chiếu danh mục tài sản với đánh giá rủi ro theo ETV.P28.

**Phụ trách Quản lý chất lượng (QLCL):** Quản trị danh mục tổng hợp; theo dõi tài sản **đến hạn rà soát**, **quá hạn kiểm chứng phục hồi**, **đến hạn huỷ** và báo cáo LĐV; kiểm tra tính đầy đủ hồ sơ trước khi trình phê duyệt; mở KPH theo ETV.P13 khi phát hiện tài sản vô chủ kéo dài, sao lưu chưa kiểm chứng hoặc huỷ sai quy định; lưu hồ sơ theo ETV.P15.

**Người thực hiện (NTH):** Sử dụng dữ liệu đúng **quy tắc xử lý theo mức phân loại**; báo cho chủ sở hữu khi phát hiện tài sản chưa kiểm kê, phân loại sai hoặc dữ liệu bị lộ; trả lại tài sản, vật mang tin và bàn giao dữ liệu khi chấm dứt công việc (ISO/IEC 27001 A.5.11).

### 5.3. Nguyên tắc tách vai trò và giới hạn của AI

- Người lập bản ghi ≠ người soát xét (PT.ATTT hoặc TP khác) ≠ người phê duyệt (LĐV).
- Người **thực hiện kiểm chứng phục hồi ≠ người xác nhận kết quả** (thống nhất với ETV.P31 §6.4.3).
- Người **thực hiện huỷ ≠ người chứng kiến huỷ**.
- Chủ sở hữu tài sản không đồng thời là người phê duyệt việc huỷ tài sản đó.
- Trợ lý AI được phép **phát hiện** tài sản chưa kiểm kê, **gợi ý** mức phân loại, **nhắc** hạn rà soát, hạn kiểm chứng phục hồi và hạn huỷ, **soạn dự thảo** biên bản và báo cáo. Trợ lý AI **không** gán mức phân loại chính thức, **không** phê duyệt chia sẻ hoặc huỷ dữ liệu, **không** tự thực hiện xoá dữ liệu và **không** tự đưa dữ liệu vào chỉ mục AI (ISO/IEC 42001; ETV.P29).

---

## VI. NỘI DUNG / QUY TRÌNH THỰC HIỆN

### 6.1. Danh mục tài sản thông tin (Biểu mẫu F27.01)

#### 6.1.1. Nội dung tối thiểu của một bản ghi

| Nhóm | Trường bắt buộc |
|---|---|
| Nhận dạng | Mã tài sản; tên gọi; loại tài sản (§2.1); nhóm dữ liệu nghiệp vụ (§6.1.3); mô tả nội dung — **không chép dữ liệu thật** |
| Trách nhiệm | **Chủ sở hữu** (một cá nhân); **người quản lý kỹ thuật** (bắt buộc khi tài sản ở dạng điện tử) |
| Vị trí | Nơi lưu vật lý hoặc logic; hệ thống, thiết bị chứa tài sản (ETV.P33); nền tảng (ETV.P35) |
| Phân loại | **Mức phân loại thông tin** (§6.2); mức **C–I–A**; có chứa **dữ liệu cá nhân** hay không |
| Dữ liệu cá nhân | Căn cứ pháp lý và mục đích xử lý (bắt buộc khi có dữ liệu cá nhân — §6.4) |
| Lưu giữ | Thời hạn lưu và **căn cứ thời hạn** (ETV.P15 · `ETV.P.F 14.06` · pháp luật chuyên ngành); phương pháp huỷ dự kiến |
| Sao lưu | Có yêu cầu sao lưu hay không; tần suất; **ngày kiểm chứng phục hồi gần nhất** |
| Khai thác | Được phép chia sẻ ra ngoài hay không; được phép dùng làm nguồn cho hệ thống AI hay không |
| Liên kết | Hồ sơ (ETV.P15); tài liệu (ETV.P14); tập dữ liệu số tương ứng (ETV.P34); rủi ro (ETV.P28, ETV.P01) |

#### 6.1.2. Mã tài sản

Mã do QLCL cấp, **duy nhất toàn hệ thống**, dạng `TS-<năm>-<số thứ tự>`, cấp một lần và không thay đổi. Mã của tài sản đã huỷ **không được cấp lại**.

#### 6.1.3. Nhóm dữ liệu nghiệp vụ và mức phân loại tối thiểu

| Nhóm dữ liệu | Ví dụ tại Viện | Mức phân loại **tối thiểu** |
|---|---|---|
| Dữ liệu khách hàng | Thông tin liên hệ, yêu cầu dịch vụ, hợp đồng | **Hạn chế** |
| Dữ liệu kết quả đo, thử nghiệm, kiểm định | Dữ liệu thô, phiếu kết quả, chứng chỉ | **Hạn chế** |
| Dữ liệu hiệu chuẩn và mẫu chuẩn | Hồ sơ hiệu chuẩn, dữ liệu sản xuất chất chuẩn | Hạn chế |
| Dữ liệu nhân sự | Hồ sơ nhân sự, lương thưởng | **Mật** |
| Dữ liệu tài chính, hợp đồng | Báo giá, thanh toán | **Mật** |
| Dữ liệu hệ thống quản lý | Tài liệu, hồ sơ ISO, đánh giá nội bộ | Nội bộ |
| Dữ liệu nghiên cứu | Đề tài, dữ liệu thử nghiệm R&D | Nội bộ |
| Dữ liệu vận hành công nghệ thông tin | Nhật ký hệ thống, cấu hình, bản sao lưu | Hạn chế |
| Dữ liệu phục vụ trí tuệ nhân tạo | Tập dữ liệu ngữ cảnh, chỉ mục ngữ nghĩa | Nội bộ — chỉ nhận dữ liệu Công khai/Nội bộ (§6.9.2) |

**Hạ mức phân loại** thấp hơn mức tối thiểu chỉ được thực hiện khi có phê duyệt công bố theo **ETV.P02** hoặc khi pháp luật bắt buộc công bố; thiếu căn cứ → **chặn thao tác hạ mức**.

#### 6.1.4. Mức yêu cầu C–I–A

Mỗi tài sản được gán ba mức Thấp · Trung bình · Cao cho **Bảo mật**, **Toàn vẹn**, **Sẵn sàng**. Đây là **đầu vào bắt buộc** của đánh giá rủi ro an toàn thông tin (ETV.P28) và của phân tích tác động nghiệp vụ (ETV.P31). Tài sản có **Sẵn sàng = Cao** bắt buộc phải có sao lưu (§6.5).

#### 6.1.5. Trình tự đưa tài sản vào danh mục

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | Khai báo bản ghi (trạng thái **Nháp**) với đủ trường bắt buộc theo loại tài sản | TP, QTHT | `ETV.P.F 27.01` |
| 2 | Gán mức phân loại và mức C–I–A; xác định thời hạn lưu, nhu cầu sao lưu | TP *(chủ sở hữu)* | `ETV.P.F 27.01` |
| 3 | Soát xét mức phân loại, mức C–I–A và tính hợp lý của thời hạn lưu. Đạt → Chờ phê duyệt; Không đạt → **Không soát xét** (bắt buộc ghi lý do) | PT.ATTT (≠ người lập) | `ETV.P.F 27.01` |
| 4 | Kiểm tra tính đầy đủ, trùng lặp; trình LĐV | QLCL | `ETV.P.F 27.01` |
| 5 | Phê duyệt → **Đang sử dụng**; không đạt → **Không phê duyệt** (bắt buộc ghi lý do). Hệ thống chặn phê duyệt khi vi phạm điều kiện tại Phụ lục I.1 | **LĐV** | `ETV.P.F 27.01` |
| 6 | Rà soát định kỳ theo chu kỳ (§6.8) | TP, QLCL | `ETV.P.F 27.01` |

#### 6.1.6. Lộ trình kiểm kê kỳ đầu

| Đợt | Phạm vi | Thời hạn hoàn thành |
|---|---|---|
| Đợt 1 | **Dữ liệu khách hàng** và **dữ liệu kết quả đo, thử nghiệm, kiểm định** (nhóm rủi ro cao nhất), kể cả hồ sơ giấy | **90 ngày** |
| Đợt 2 | Dữ liệu nhân sự, tài chính, hệ thống quản lý, vận hành công nghệ thông tin, nghiên cứu, dữ liệu phục vụ AI | **180 ngày** |

Tài sản phát hiện đang sử dụng mà **chưa kiểm kê** được xử lý theo §6.10.

### 6.2. Thang phân loại thông tin — nguồn chuẩn của Viện

Viện áp dụng **thống nhất bốn mức**. Đây là **định nghĩa gốc** mà ETV.P28 mục 5.3 và các thủ tục khác dẫn chiếu:

| Mức | Ai được tiếp cận | Hệ quả chính |
|---|---|---|
| **Công khai** | Không giới hạn | Được công bố ra ngoài; vẫn phải kiểm soát **tính toàn vẹn** (ai được sửa, ai được công bố) |
| **Nội bộ** | Toàn bộ người lao động của Viện | Không phát tán ra ngoài khi chưa có phê duyệt |
| **Hạn chế** | Nhóm, vai trò được chỉ định | Chia sẻ ra ngoài bắt buộc có phê duyệt; **ghi nhật ký truy cập**; mã hoá khi truyền qua mạng công cộng |
| **Mật** | **Danh sách cá nhân đích danh** do LĐV phê duyệt | Cấm lưu trên thiết bị cá nhân và dịch vụ đám mây cá nhân (ETV.P02 §6.8); **không** đưa vào chỉ mục AI; huỷ có chứng kiến |

Việc **thay đổi thang** (thêm, bớt, đổi tên mức) chỉ thực hiện bằng ban hành lại thủ tục này theo ETV.P14, kèm phiên bản mới của bảng quy tắc xử lý và kế hoạch rà soát toàn bộ tài sản bị ảnh hưởng.

### 6.3. Bảng quy tắc xử lý theo mức phân loại (Biểu mẫu F27.02)

Bảng quy tắc là **bảng luật có phiên bản**, do PT.ATTT và QLCL dự thảo, **LĐV phê duyệt**. Mỗi dòng là một cặp *(mức phân loại × hành động)* kèm yêu cầu bắt buộc hoặc điều cấm.

Các hành động tối thiểu phải có trong bảng: **Lưu trữ · Truyền, gửi · In ấn, sao chép · Mang ra ngoài Viện · Chia sẻ với bên thứ ba · Lưu trên thiết bị cá nhân · Đưa vào chỉ mục AI · Huỷ**.

Yêu cầu vận hành:

- Bảng quy tắc hiện hành phải được **hiển thị ngay tại màn hình tài sản** trên ManLab — người dùng không phải tra cứu sổ tay riêng.
- Hành động bị đánh dấu **cấm** với một mức phân loại thì bị **chặn ở mọi luồng thao tác** liên quan tới tài sản mang mức đó.
- Khi ban hành phiên bản mới, phiên bản cũ chuyển **Hết hiệu lực**; các quy tắc đang áp dụng cho tài sản được cập nhật đồng bộ.

### 6.4. Dữ liệu cá nhân

Tài sản có chứa dữ liệu cá nhân bắt buộc phải ghi:

1. **Căn cứ pháp lý và mục đích xử lý** — theo Nghị định 13/2023/NĐ-CP và dẫn chiếu tại ETV.P02 §6.9;
2. **Thời hạn lưu hữu hạn** — không được ghi "vĩnh viễn" nếu không có căn cứ pháp luật;
3. Phạm vi chủ thể dữ liệu và loại dữ liệu cá nhân (cơ bản hay nhạy cảm);
4. Biện pháp bảo vệ tương ứng mức phân loại và mức C–I–A.

Danh sách tài sản có dữ liệu cá nhân được QLCL tổng hợp riêng để phục vụ nghĩa vụ pháp lý và cung cấp cho ETV.P28 khi đánh giá rủi ro. Yêu cầu xoá dữ liệu của chủ thể dữ liệu (khi pháp luật quy định) được xử lý như một trường hợp huỷ theo §6.7, kèm căn cứ.

### 6.5. Sao lưu và kiểm chứng phục hồi

#### 6.5.1. Yêu cầu sao lưu

Tài sản có **Sẵn sàng = Cao** bắt buộc phải được sao lưu. Bản ghi phải ghi rõ tần suất sao lưu; tần suất phải đáp ứng **mục tiêu điểm khôi phục (RPO)** đã xác định tại ETV.P31 cho quá trình sử dụng tài sản đó. Bản sao lưu **cũng là một tài sản thông tin** và mang **cùng mức phân loại** với dữ liệu gốc — phải được bảo vệ tương ứng.

#### 6.5.2. Kiểm chứng phục hồi

Chu kỳ và cách thực hiện áp dụng theo **ETV.P31 §6.4.3** — thủ tục này **không** quy định lại:

| Nhóm tài sản | Chu kỳ kiểm chứng phục hồi | Biểu mẫu |
|---|---|---|
| Dữ liệu của quá trình **Trọng yếu cao** (ETV.P31) hoặc tài sản có **Sẵn sàng = Cao** | **≤ 06 tháng** | `F 31.03` |
| Dữ liệu còn lại có sao lưu | **≤ 12 tháng** | `F 31.03` |

Người **thực hiện** phục hồi ≠ người **xác nhận** kết quả. Kết quả **Không đạt** → mở KPH theo ETV.P13 trong **03 ngày làm việc** và mở sự cố an toàn thông tin theo ETV.P28.

Bản ghi tài sản ghi **ngày kiểm chứng phục hồi gần nhất**; quá hạn → cảnh báo người quản lý kỹ thuật, quá **02 chu kỳ** → cảnh báo LĐV. **Sao lưu chưa từng kiểm chứng phục hồi không được viện dẫn làm biện pháp kiểm soát có hiệu lực** cho ETV.P28 (SoA) và ETV.P31.

### 6.6. Chia sẻ dữ liệu ra ngoài Viện

Thủ tục này quyết định ở **cấp tài sản**: tài sản có được phép chia sẻ ra ngoài hay không, và với điều kiện gì theo bảng quy tắc xử lý. Tài sản mức **Hạn chế** và **Mật** mặc định **không được phép** chia sẻ.

**Luồng phê duyệt từng lần** thực hiện theo **ETV.P34 §6.5 (biểu mẫu F34.03)** — không lập biểu mẫu riêng ở thủ tục này. Bổ sung ràng buộc bắt buộc:

- Dữ liệu liên quan **khách hàng** hoặc **dữ liệu cá nhân** phải có thêm phê duyệt công bố theo **ETV.P02**; thiếu → chặn phê duyệt chia sẻ.
- Thẩm quyền: **LĐV** phê duyệt mọi trường hợp chia sẻ tài sản mức **Hạn chế, Mật**; chủ sở hữu tài sản phê duyệt với tài sản mức **Nội bộ**; tài sản mức **Công khai** không cần phiếu.
- Chia sẻ phải có **thời hạn**; hết hạn, người quản lý kỹ thuật thu hồi quyền truy cập và ghi nhận bằng chứng bên nhận đã xoá hoặc trả lại dữ liệu.

### 6.7. Lưu giữ và huỷ dữ liệu (Biểu mẫu F27.03)

#### 6.7.1. Nguyên tắc

**Phê duyệt trước, bằng chứng sau.** Chỉ huỷ tài sản đã ở trạng thái **Ngừng sử dụng** và **đã hết thời hạn lưu**. Bản ghi kiểm kê **không bao giờ bị xoá** — tài sản chuyển trạng thái **Đã huỷ** và giữ lại biên bản làm bằng chứng.

#### 6.7.2. Trình tự thực hiện

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | Lập phiếu đề nghị huỷ: tài sản, lý do, phương pháp huỷ dự kiến, ngày dự kiến | TP *(chủ sở hữu)*, QLCL | `ETV.P.F 27.03` |
| 2 | Kiểm tra **điều kiện huỷ** tại §6.7.3 | QLCL | `ETV.P.F 27.03` |
| 3 | Xác nhận **phương pháp huỷ** phù hợp mức phân loại | PT.ATTT | `ETV.P.F 27.03` |
| 4 | **Phê duyệt huỷ** (bắt buộc ghi lý do) | **LĐV** | `ETV.P.F 27.03` |
| 5 | Thực hiện huỷ; **người chứng kiến khác người thực hiện**; thu thập bằng chứng (ảnh, nhật ký xoá, biên bản của bên thứ ba) | QTHT, NTH được phân công + người chứng kiến | `ETV.P.F 27.03` |
| 6 | Xử lý **bản sao lưu** và bản sao ở bên thứ ba của tài sản bị huỷ | QTHT | `ETV.P.F 27.03` |
| 7 | Chuyển bản ghi sang **Đã huỷ**; lưu hồ sơ theo ETV.P15 | QLCL | `ETV.P.F 27.01` |

#### 6.7.3. Điều kiện trước khi huỷ

Không được huỷ khi: chưa hết thời hạn lưu theo ETV.P15, `ETV.P.F 14.06` hoặc pháp luật chuyên ngành · tài sản còn là căn cứ của kết quả, chứng chỉ đang còn hiệu lực · còn khiếu nại, tranh chấp, vụ việc hoặc cuộc đánh giá đang xử lý liên quan · còn tài sản, tập dữ liệu hoặc điểm tích hợp khác phụ thuộc mà chưa xử lý.

#### 6.7.4. Phương pháp huỷ

Hồ sơ giấy huỷ bằng phương pháp không khôi phục được nội dung (cắt vụn) · dữ liệu điện tử **xoá an toàn** (ghi đè theo chuẩn) hoặc **huỷ khoá mã hoá** · vật mang tin huỷ vật lý khi không thể xoá an toàn · dữ liệu ở bên thứ ba: yêu cầu xoá và **lấy bằng chứng xoá** bằng văn bản (ETV.P02 §6.10).

### 6.8. Rà soát định kỳ và chuyển giao chủ sở hữu

Chu kỳ rà soát mặc định **12 tháng/lần**; tài sản mức **Mật** hoặc có **dữ liệu cá nhân**: **06 tháng/lần**. Nội dung rà soát: tài sản còn tồn tại và còn cần thiết không · mức phân loại và C–I–A còn đúng không · chủ sở hữu còn làm việc tại Viện không · thời hạn lưu và nhu cầu sao lưu còn phù hợp không · đã đến hạn chuyển **Ngừng sử dụng** hoặc **huỷ** chưa.

**Chuyển giao chủ sở hữu** là bắt buộc khi người đang giữ vai trò nghỉ việc hoặc chuyển công tác; việc chuyển giao phải hoàn tất **trước khi** hoàn thành thủ tục thôi việc theo ETV.P03. Tài sản có chủ sở hữu đã nghỉ việc bị gắn cờ **Tài sản vô chủ** và cảnh báo tới QLCL, LĐV.

Hệ thống, thiết bị chứa tài sản bị ngừng vận hành tại ETV.P33 → tài sản tự gắn cờ cần rà soát.

### 6.9. Quan hệ với đánh giá rủi ro và với hệ thống trí tuệ nhân tạo

#### 6.9.1. Đầu vào cho đánh giá rủi ro an toàn thông tin

Danh mục tài sản là **đầu vào bắt buộc** của ETV.P28: mỗi rủi ro trong F28.01 phải gắn với ít nhất **01 tài sản** có trong danh mục — chiều ràng buộc này đã là **chặn cứng** theo ETV.P28 mục 5.3.

Chiều ngược lại: tài sản có mức phân loại **Hạn chế**, **Mật** hoặc có bất kỳ mức C–I–A = **Cao** phải có ít nhất **01 rủi ro đã mở** tại ETV.P28 hoặc ETV.P01. Trong giai đoạn đầu áp dụng, đây là **cảnh báo**; chuyển thành **chặn phê duyệt** kể từ khi Module M28 vận hành trên nền tảng — mốc chuyển do QLCL trình LĐV quyết định và ghi vào biên bản xem xét của lãnh đạo.

#### 6.9.2. Dữ liệu dùng cho hệ thống trí tuệ nhân tạo

Tài sản chỉ được dùng làm nguồn cho hệ thống trí tuệ nhân tạo khi đồng thời: được đánh dấu **cho phép dùng cho AI** · ở trạng thái **Đang sử dụng** · mức phân loại thuộc **Công khai** hoặc **Nội bộ**.

Dữ liệu mức **Hạn chế** và **Mật** **không bao giờ** được đưa vào chỉ mục AI. Phát hiện vi phạm phải **gỡ ngay**, mở sự cố an toàn thông tin theo ETV.P28 và lập KPH theo ETV.P13. Mọi hệ thống AI sử dụng tài sản phải được liệt kê và liên kết sang hồ sơ tương ứng của ETV.P29; điều kiện sử dụng chi tiết theo ETV.P34 §6.8.

### 6.10. Tài sản chưa kiểm kê

Tài sản thông tin đang được sử dụng cho công việc của Viện mà **chưa có bản ghi kiểm kê** được coi là **không phù hợp**. Khi phát hiện:

1. QLCL lập bản ghi ở trạng thái Nháp và xác định chủ sở hữu.
2. Nếu tài sản cần thiết → đưa vào trình tự tại §6.1.5 trong thời hạn **30 ngày**.
3. Nếu tài sản chứa dữ liệu mức **Hạn chế/Mật** hoặc **dữ liệu cá nhân** và đang được lưu ngoài phạm vi cho phép (thiết bị cá nhân, dịch vụ cá nhân) → **ngừng sử dụng ngay**, thu hồi hoặc xoá, lập KPH theo ETV.P13 và xử lý sự cố theo ETV.P28.

### 6.11. Báo cáo và soát xét

QLCL tổng hợp **06 tháng/lần** và trước mỗi cuộc họp xem xét của lãnh đạo (ETV.P17): tổng số tài sản theo loại, nhóm dữ liệu, mức phân loại và mức C–I–A; tài sản mới kiểm kê, tài sản đã huỷ trong kỳ; tài sản **đến hạn/quá hạn rà soát**; tài sản **quá hạn kiểm chứng phục hồi**; tài sản **vô chủ** và tình trạng chuyển giao; danh sách tài sản có dữ liệu cá nhân; trường hợp tài sản chưa kiểm kê phát hiện trong kỳ; tình trạng phiên bản bảng quy tắc xử lý.

Thủ tục này được soát xét định kỳ theo ETV.P14 §6.10, hoặc đột xuất khi có thay đổi về pháp luật bảo vệ dữ liệu cá nhân hoặc thay đổi lớn về kiến trúc dữ liệu của Viện.

---

## VII. BIỂU MẪU ÁP DỤNG

| Mã biểu mẫu | Tên biểu mẫu | Nơi lưu bản gốc |
|---|---|---|
| **ETV.P.F 27.01** | Danh mục tài sản thông tin | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 27.02** | Bảng quy tắc xử lý theo mức phân loại | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 27.03** | Phiếu đề nghị và biên bản huỷ dữ liệu, vật mang tin | `06_SHARED_RESOURCES/01_Forms/` |

Luồng **chia sẻ dữ liệu ra ngoài** dùng biểu mẫu **F34.03** của ETV.P34 kèm phê duyệt công bố theo ETV.P02; **kiểm chứng phục hồi** dùng biểu mẫu **F31.03** của ETV.P31; phiếu quyền truy cập dùng **F28.04** của ETV.P28; phiếu sự cố an toàn thông tin dùng **F28.03**; phiếu hành động khắc phục dùng biểu mẫu của ETV.P13 — **không** lập biểu mẫu mới ở thủ tục này (nguyên tắc một nơi duy nhất, ETV.P14).

---

## VIII. LƯU HỒ SƠ

Việc lập, lưu giữ, bảo quản, tra cứu, phân quyền truy cập và thanh lý hồ sơ thực hiện theo **ETV.P15 – Kiểm soát hồ sơ**; thời hạn lưu và phân quyền chi tiết theo **ETV.P.F 14.06 (Danh mục phân quyền và thời hạn lưu)**. Thủ tục này **không** quy định lại cơ chế lưu trữ, chỉ đăng ký các hồ sơ phát sinh và thời hạn đề xuất để cập nhật vào danh mục đó.

| Hồ sơ | Người lưu | Thời hạn lưu đề xuất |
|---|---|---|
| Danh mục tài sản thông tin (F27.01) và các phiên bản | QLCL | Vĩnh viễn trên ManLab |
| Bảng quy tắc xử lý theo mức phân loại (F27.02), mọi phiên bản | QLCL | Vĩnh viễn trên ManLab |
| Phiếu đề nghị và biên bản huỷ dữ liệu, vật mang tin (F27.03) kèm bằng chứng | QLCL | **10 năm** |
| Hồ sơ chuyển giao chủ sở hữu tài sản | QLCL | 05 năm |
| Danh sách tài sản có dữ liệu cá nhân và căn cứ xử lý | QLCL, sao gửi PT.ATTT | Theo thời hạn xử lý dữ liệu + 05 năm |
| Hồ sơ phê duyệt danh sách cá nhân tiếp cận tài sản mức Mật | LĐV, sao gửi QLCL | 10 năm |
| Bằng chứng kiểm chứng phục hồi | Theo ETV.P31 | Theo ETV.P31 |
| Hồ sơ chia sẻ dữ liệu ra ngoài | Theo ETV.P34, ETV.P02 | Theo ETV.P34 |
| Báo cáo tình hình tài sản thông tin phục vụ xem xét của lãnh đạo | QLCL | Theo ETV.P17 |

---

## IX. CÁC PHỤ LỤC

### Phụ lục I — Ma trận kiểm soát rủi ro và điều kiện chặn cứng

*(Dẫn chiếu từ §6.1.5, §6.2, §6.3, §6.4, §6.5, §6.6, §6.7, §6.9, §6.10. Hệ thống ManLab thực thi các điều kiện này bằng ràng buộc kỹ thuật.)*

**I.1. Điều kiện chặn cứng trước khi phê duyệt tài sản vào danh mục**

| TT | Điều kiện | Áp dụng cho |
|---|---|---|
| 1 | Có **chủ sở hữu là một cá nhân** đang làm việc tại Viện | Mọi tài sản |
| 2 | Có **người quản lý kỹ thuật** | Tài sản ở dạng điện tử |
| 3 | Có **mức phân loại** và ba mức **C–I–A** | Mọi tài sản |
| 4 | Mức phân loại **không thấp hơn mức tối thiểu** của nhóm dữ liệu (§6.1.3), trừ khi có phê duyệt công bố theo ETV.P02 | Mọi tài sản |
| 5 | Có **thời hạn lưu và căn cứ thời hạn** | Mọi tài sản |
| 6 | Có **căn cứ pháp lý, mục đích xử lý** và thời hạn lưu **hữu hạn** | Tài sản chứa dữ liệu cá nhân |
| 7 | Có **yêu cầu sao lưu và tần suất** | Tài sản có Sẵn sàng = Cao |
| 8 | Bản ghi **không chứa nội dung dữ liệu thật** | Mọi tài sản |

**I.2. Các tình huống bị chặn hoặc phải xử lý bắt buộc**

| Tình huống | Xử lý |
|---|---|
| Tài sản **không có chủ sở hữu** hoặc chủ sở hữu đã nghỉ việc | **Chặn phê duyệt**; gắn cờ **Tài sản vô chủ**, cảnh báo QLCL và LĐV |
| **Hạ mức phân loại** dữ liệu khách hàng, dữ liệu kết quả đo mà thiếu phê duyệt công bố (ETV.P02) hoặc căn cứ pháp luật | **Chặn thao tác** |
| Thực hiện hành động bị đánh dấu **cấm** trong bảng quy tắc xử lý với mức phân loại tương ứng | **Chặn ở mọi luồng thao tác** |
| Lưu tài sản mức **Mật** trên thiết bị cá nhân hoặc dịch vụ đám mây cá nhân | **Cấm tuyệt đối** (ETV.P02 §6.8); xử lý theo ETV.P28 và ETV.P13 |
| Đưa dữ liệu mức **Hạn chế** hoặc **Mật** vào chỉ mục AI | **Cấm tuyệt đối**; gỡ ngay, mở sự cố ETV.P28 và KPH ETV.P13 |
| Tài sản có **Sẵn sàng = Cao** mà **không có sao lưu** | **Chặn phê duyệt** |
| **Sao lưu chưa từng kiểm chứng phục hồi** được viện dẫn làm biện pháp kiểm soát có hiệu lực | **Không chấp nhận** (ETV.P31; ISO/IEC 27001 A.8.13) |
| Người thực hiện kiểm chứng phục hồi đồng thời **xác nhận kết quả** | **Chặn cứng** |
| Kiểm chứng phục hồi **Không đạt** mà không mở KPH trong 03 ngày làm việc | Cảnh báo LĐV; xử lý theo ETV.P31, ETV.P28 |
| Quá hạn kiểm chứng phục hồi **02 chu kỳ** liên tiếp | Cảnh báo LĐV; đưa vào báo cáo xem xét của lãnh đạo |
| Chia sẻ tài sản mức **Hạn chế/Mật** ra ngoài mà thiếu phê duyệt của LĐV, hoặc thiếu phê duyệt công bố theo ETV.P02 với dữ liệu khách hàng, dữ liệu cá nhân | **Chặn phê duyệt** |
| **Huỷ dữ liệu** khi chưa hết thời hạn lưu, còn là căn cứ của kết quả còn hiệu lực, hoặc còn vụ việc liên quan | **Chặn thao tác** (§6.7.3) |
| Huỷ dữ liệu mà **chưa có phê duyệt của LĐV trước khi thực hiện** | **Cấm tuyệt đối**; xử lý theo ETV.P13 |
| Người **thực hiện huỷ đồng thời là người chứng kiến** | **Chặn cứng** |
| Huỷ xong mà **thiếu bằng chứng** (ảnh, nhật ký xoá, biên bản bên thứ ba) | **Chặn chuyển trạng thái Đã huỷ** |
| **Xoá bản ghi kiểm kê** của tài sản đã huỷ | **Cấm tuyệt đối** — bản ghi giữ vĩnh viễn làm bằng chứng |
| Tài sản mức **Hạn chế/Mật** hoặc có C–I–A = Cao **không có rủi ro đã mở** tại ETV.P28/ETV.P01 | Cảnh báo; **chặn phê duyệt** kể từ khi Module M28 vận hành trên nền tảng (§6.9.1) |
| Tài sản mức Mật hoặc có dữ liệu cá nhân **quá 06 tháng chưa rà soát** | Cảnh báo chủ sở hữu; quá 02 chu kỳ → báo cáo LĐV |
| Tài sản chưa kiểm kê chứa dữ liệu **Hạn chế/Mật** lưu ngoài phạm vi cho phép | **Ngừng sử dụng ngay** + KPH ETV.P13 + sự cố ETV.P28 |
| Trợ lý AI gán mức phân loại chính thức, phê duyệt chia sẻ, phê duyệt huỷ hoặc tự xoá dữ liệu | **Cấm tuyệt đối** |

### Phụ lục II — Bảng trạng thái và thẩm quyền thao tác

*(Dẫn chiếu từ §6.1.5, §6.3, §6.7)*

**II.1. Tài sản thông tin (F27.01)**

| STT | Trạng thái | Ý nghĩa | Người thao tác | Bắt buộc lý do |
|---|---|---|---|---|
| 1 | Nháp | Đang khai báo | TP, QTHT | Không |
| 2 | Chờ soát xét | Chờ kiểm tra mức phân loại và mức C–I–A | Người lập | Không |
| 3 | Không soát xét | Bị trả lại để sửa | PT.ATTT (≠ người lập) | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | QLCL | Không |
| 5 | Không phê duyệt | Bị trả lại để sửa | LĐV | **Có** |
| 6 | Đang sử dụng | Có trong danh mục hiệu lực | LĐV (phê duyệt) · TP (duy trì) | Không |
| 7 | Ngừng sử dụng | Không còn khai thác, **vẫn trong thời hạn lưu** | TP, QLCL | **Có** |
| 8 | Đã huỷ | Dữ liệu đã bị huỷ; **bản ghi kiểm kê vẫn giữ** làm bằng chứng | QLCL (sau khi F27.03 đã thực hiện) | **Có** |
| 9 | Huỷ bản ghi | Khai báo sai hoặc trùng, bỏ trước khi phê duyệt | LĐV | **Có** |

Cờ **Đến hạn rà soát**, **Quá hạn kiểm chứng phục hồi**, **Đến hạn huỷ**, **Tài sản vô chủ** không phải trạng thái hồ sơ mà là cảnh báo tính theo dữ liệu bản ghi.

**II.2. Các đối tượng khác**

| Đối tượng | Chuỗi trạng thái | Thẩm quyền kết thúc |
|---|---|---|
| Bảng quy tắc xử lý (F27.02) | Nháp → Chờ phê duyệt → Đã phê duyệt → Hết hiệu lực *(khi có phiên bản mới)* | **LĐV** |
| Phiếu đề nghị và biên bản huỷ (F27.03) | Nháp → Chờ phê duyệt → Đã phê duyệt → Đã thực hiện / Huỷ bỏ | **LĐV** (phê duyệt) · QLCL (xác nhận đã thực hiện) |

Mọi nhánh **Không phê duyệt**, **Không soát xét**, **Ngừng sử dụng**, **Đã huỷ**, **Huỷ bỏ** bắt buộc ghi lý do.

### Phụ lục III — Ranh giới với các thủ tục lân cận

*(Dẫn chiếu từ §2.2 và §2.3 — dùng khi có tranh luận "việc này thuộc thủ tục nào")*

| Câu hỏi | Thủ tục trả lời |
|---|---|
| Viện có những tài sản thông tin nào, ai chịu trách nhiệm, mức bảo vệ nào? | **ETV.P27** |
| Thang phân loại thông tin định nghĩa ở đâu? | **ETV.P27 §6.2** — các thủ tục khác dẫn chiếu |
| Dữ liệu có chính xác, đầy đủ, kịp thời không; ai được khai thác? | ETV.P34 |
| Rủi ro an toàn thông tin nào; bảo vệ bằng biện pháp gì; ai được cấp quyền? | ETV.P28 |
| Nghĩa vụ bảo mật với khách hàng; công bố thông tin khách hàng ra ngoài? | ETV.P02 |
| Thiết bị, máy chủ, hệ thống nào đang chứa dữ liệu? | ETV.P33 |
| Nền tảng phần mềm nào đang vận hành dữ liệu? | ETV.P35 |
| Hồ sơ lưu bao lâu, ở đâu, thanh lý thế nào? | ETV.P15 |
| Sao lưu phục hồi trong bao lâu khi gián đoạn (RTO/RPO), diễn tập ra sao? | ETV.P31 |
| Dữ liệu chảy giữa các hệ thống theo hợp đồng dữ liệu nào? | ETV.P37 |

---

*Thủ tục Quản trị dữ liệu và tài sản thông tin — ETV.P 27 — Lần BH: 01 — Trang tài liệu điện tử, không áp dụng đánh số trang thủ công (bản in xuất từ ManLab tự sinh header/footer theo ETV.P14 §6.4).*
