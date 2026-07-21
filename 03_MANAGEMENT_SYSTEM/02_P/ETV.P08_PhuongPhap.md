---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát (xem §7)
id: ETV.P08
title: "Thủ tục Lựa chọn Phương pháp, Kiểm tra Xác nhận, Xác nhận Giá trị Sử dụng và Đánh giá Độ không đảm bảo đo"
type: Thu-tuc
owner: "Lãnh đạo Viện (LĐV)"
department: "Phòng Đo lường Chất lượng (PTN)"
process: MP08_PhuongPhap
capability: [CAP-08_HieuChuan, CAP-09_KiemDinh, CAP-10_ThuNghiem]
module: M08_PhuongPhap
effective_date: "21/07/2026"
revision: "03"
status: Da-phe-duyet
keywords: [xác nhận giá trị sử dụng phương pháp, GTSD, độ không đảm bảo đo, ĐKĐBĐ, GUM, ISO 17025 §7.2, kiểm tra xác nhận]
related_documents: [ETV.QM, ETV.P14, ETV.P15]
iso_clause: ["ISO 9001:2015 §8.3 (Thiết kế và phát triển sản phẩm, dịch vụ)", "ISO/IEC 17025:2017 §7.2 (Lựa chọn, kiểm tra xác nhận và xác nhận giá trị sử dụng của phương pháp)"]
legal_basis: []
ai_tags: [method-validation, measurement-uncertainty, GUM, verification]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Vĩnh viễn (bản hiện hành) — xem chi tiết theo loại tại ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: "ETV.P 08 (Lần ban hành 02, ngày 22/04/2023)"
superseded_by: null
---
# THỦ TỤC LỰA CHỌN PHƯƠNG PHÁP, KIỂM TRA XÁC NHẬN, XÁC NHẬN GIÁ TRỊ SỬ DỤNG VÀ ĐÁNH GIÁ ĐỘ KHÔNG ĐẢM BẢO ĐO

|                    |                                                     |
| ------------------ | --------------------------------------------------- |
| **Mã số**          | ETV.P 08                                             |
| **Lần ban hành**   | 03                                                    |
| **Ngày ban hành**  | 21/07/2026                                            |
| **Biên soạn**      | Dương Thành Nam — 21/07/2026                          |
| **Soát xét**       | Trần Thị Hoa — Lãnh đạo Phòng, ngày 21/07/2026        |
| **Phê duyệt**      | Nguyễn Hoàng Giang — Lãnh đạo Viện, ngày 21/07/2026   |

> **Chú ý:** Tài liệu nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện Kiểm định Công nghệ và Môi trường.

> **Ghi chú số hóa (AI).** Bản lần 03 do AI tái cấu trúc từ bản Word lần 02 (22/4/2023, file `ETV.P 08_TT XN GTSDPP_L4_Chua sua_BS U.doc`), đối chiếu khung mẫu chuẩn tại skill `01-s-kiem-soat-tai-lieu-etv`. Lưu ý:
> 1. **2/4 biểu mẫu số hóa được từ nguồn thật** (`ETV.P.F 08.01`, `08.04` — file đọc được); **2/4 biểu mẫu còn lại** (`08.02`, `08.03`) tạm **chưa số hóa** vì file nguồn trên Dropbox rỗng 0 byte (placeholder online-only, chưa đồng bộ) — sẽ bổ sung khi có nguồn.
> 2. `ETV.P.F 08.04` có thể thức của một **Quyết định hành chính** (Quốc hiệu—Tiêu ngữ, số/ký hiệu, "QUYẾT ĐỊNH", các Điều) chứ không phải bảng biểu thông thường — giữ nguyên thể thức gốc khi số hóa, chỉ chuẩn hóa placeholder theo quy ước ManLab (`SoQuyetdinh`, `ngayPD`...).
> 3. Toàn bộ nội dung kỹ thuật về lựa chọn thông số đánh giá, xác nhận GTSD phương pháp tiêu chuẩn/không tiêu chuẩn, ước lượng độ không đảm bảo đo được **giữ nguyên bản chất** so với lần 02, chỉ sắp xếp lại theo khung Bước–Trách nhiệm–Biểu mẫu và tách phần lựa chọn thông số/hình thức đánh giá thành Phụ lục I để thân bài gọn hơn.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi | Lần ban hành |
| --------- | ------------------ | ------------ |
| 22/4/2019 | Ban hành lần thứ nhất | 01 |
| 29/12/2019 | Sửa lại theo ý kiến đoàn đánh giá Chỉ định kiểm định | 01 |
| 22/4/2023 | Ban hành lần thứ hai | 02 |
| 21/07/2026 | Rà soát toàn diện theo khung mẫu chuẩn ETV.P14: bổ sung RACI đầy đủ, tách Phụ lục I (bảng thông số/hình thức đánh giá); số hóa 2/4 biểu mẫu áp dụng có nguồn đọc được (`08.01`, `08.04`), 2 biểu mẫu còn lại chờ nguồn. | 03 |

---

## I. MỤC ĐÍCH

Thủ tục này được xây dựng phù hợp với yêu cầu tại mục 7.2 của Sổ tay chất lượng (ETV.QM), quy định trách nhiệm, trình tự và cách thức lựa chọn, kiểm tra xác nhận và xác nhận giá trị sử dụng (GTSD) phương pháp trước khi áp dụng trong hoạt động đo lường, hiệu chuẩn, kiểm định, thử nghiệm/phân tích của Phòng Đo lường Chất lượng (PTN). Việc xác nhận GTSD phương pháp nhằm chứng minh phương pháp được lựa chọn hoặc xây dựng phù hợp với mục đích sử dụng, đáp ứng yêu cầu kỹ thuật, yêu cầu khách hàng và phạm vi năng lực đã công bố của PTN.

Kết quả xác nhận GTSD phương pháp là căn cứ để cấu hình biên bản đo lường trên ManLab, thiết lập công thức xử lý số liệu, đánh giá độ không đảm bảo đo (ĐKĐBĐ), kiểm tra sự phù hợp giữa U công bố trên Giấy chứng nhận và CMC đã được công nhận, đồng thời phục vụ soát xét, phê duyệt trước khi phát hành kết quả cho khách hàng.

## II. PHẠM VI ÁP DỤNG

Áp dụng cho toàn bộ quy trình, phương pháp của PTN — thực hiện trước khi đưa phương pháp vào sử dụng chính thức hoặc khi có thay đổi đáng kể (thiết bị mới, thay đổi ma trận mẫu, kỹ thuật viên mới, hoặc môi trường làm việc khác…).

## III. TÀI LIỆU VIỆN DẪN

- ISO 9001:2015 §8.3 (Thiết kế và phát triển sản phẩm, dịch vụ).
- ISO/IEC 17025:2017 §7.2 (Lựa chọn, kiểm tra xác nhận và xác nhận giá trị sử dụng của phương pháp).
- TCVN 9595-3:2013 (ISO/IEC Guide 98-3:2008) — Độ không đảm bảo đo, Phần 3: Hướng dẫn trình bày độ không đảm bảo đo (GUM 1995).
- TCVN 6910 (phần 1-6) (ISO 5725, phần 1-6) — Nguyên tắc sử dụng dữ liệu xác nhận GTSD phương pháp.
- TCVN 10861 (ISO 21748) — Hướng dẫn sử dụng ước lượng độ lặp lại, độ tái lập và độ đúng trong ước lượng độ không đảm bảo đo.
- ETV.QM — Sổ tay chất lượng.
- ETV.P 14 — Thủ tục Kiểm soát tài liệu.
- ETV.P 15 — Thủ tục Kiểm soát hồ sơ.

## IV. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 4.1. Thuật ngữ và định nghĩa

| Thuật ngữ | Diễn giải |
|---|---|
| Đo lường | Kiểm định, hiệu chuẩn, thử nghiệm, quan trắc. |
| Độ không đảm bảo đo (ĐKĐBĐ) | [TCVN 6165:2009] Thông số không âm đặc trưng cho sự phân tán của các giá trị đại lượng được quy cho đại lượng đo, trên cơ sở thông tin đã sử dụng. |

### 4.2. Chữ viết tắt

- BoA: Văn phòng Công nhận Chất lượng
- ĐKĐBĐ: Độ không đảm bảo đo
- LĐV: Lãnh đạo Viện Kiểm định Công nghệ và Môi trường
- GTSD: Giá trị sử dụng
- HTQL: Hệ thống quản lý
- KH: Khách hàng
- PTN: Phòng Đo lường Chất lượng
- QLKT: Người quản lý kỹ thuật

## V. VAI TRÒ VÀ TRÁCH NHIỆM (RACI)

| Vai trò | Trách nhiệm chính |
|---|---|
| Lãnh đạo Viện (LĐV) | Chủ sở hữu thủ tục; ký quyết định phê duyệt áp dụng quy trình kiểm định, hiệu chuẩn, thử nghiệm (`ETV.P.F 08.04`); xem xét kết luận/đề xuất tại báo cáo tóm tắt kết quả xác nhận GTSD đối với phương pháp không tiêu chuẩn. |
| Người quản lý kỹ thuật (QLKT) | Lựa chọn các phép thử, thông số đánh giá; phân công nhân viên thực hiện; phê duyệt và tính toán ĐKĐBĐ của các phép thử; đánh giá kết quả xác nhận GTSD; phân công phổ biến, đào tạo phương pháp mới. |
| Nhân viên thực hiện | Lập kế hoạch xác nhận GTSD phương pháp (`ETV.P.F 08.01`); thực hiện đánh giá điều kiện cơ bản (`ETV.P.F 08.02`); thực hiện và lập báo cáo tóm tắt kết quả xác nhận GTSD (`ETV.P.F 08.03`). |

## VI. NỘI DUNG / QUY TRÌNH THỰC HIỆN

### 6.1. Nguyên tắc chung lựa chọn và xác nhận giá trị sử dụng phương pháp

Nhằm lựa chọn và xác nhận GTSD các phép đo/kiểm tra/phân tích có khả năng cho kết quả phù hợp yêu cầu kỹ thuật, PTN tiến hành lựa chọn thông số đánh giá và hình thức đánh giá phù hợp tùy điều kiện cụ thể (xem Phụ lục I). Các phương pháp kiểm định đối với phương tiện đo nhóm II phải thực hiện theo đúng ĐLVN hiện hành đã được chỉ định. Phương pháp thử tiêu chuẩn được ưu tiên lựa chọn theo thứ tự: tiêu chuẩn quốc tế, tiêu chuẩn quốc gia, tiêu chuẩn ngành, tiêu chuẩn của các hiệp hội khoa học có uy tín, đáp ứng yêu cầu về tính khách quan, khoa học và yêu cầu quản lý do Tổng cục Tiêu chuẩn Đo lường Chất lượng, Bộ Khoa học và Công nghệ và Bộ Tài nguyên và Môi trường ban hành tại Thông tư 24/2017/TT-BTNMT.

Khi không lựa chọn được phương pháp tiêu chuẩn, có thể nghiên cứu áp dụng phương pháp thử không tiêu chuẩn đã được công bố rộng rãi (phương pháp của nhà sản xuất thiết bị, phương pháp đăng trên tạp chí khoa học trong/ngoài nước, sổ tay nghiên cứu, hoặc phương pháp nội bộ tự xây dựng). ETV phê duyệt phương pháp qua một số cách: sử dụng chất chuẩn (dung dịch, khí chuẩn) hoặc chuẩn đo lường để đánh giá độ chụm; so sánh kết quả với phương pháp khác đã được xác nhận GTSD; so sánh liên phòng (thông qua Giấy chứng nhận); hiệu chuẩn/thử nghiệm/pha chế lặp lại (giữa 02 người ở 02 thời điểm khác nhau). PTN phải đảm bảo sử dụng phiên bản có hiệu lực mới nhất của phương pháp, trừ khi không thích hợp hoặc không thể thực hiện được.

### 6.2. Xác nhận giá trị sử dụng khi lựa chọn phương pháp tiêu chuẩn

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| Đánh giá điều kiện cơ bản | QLKT phân công nhân viên đánh giá điều kiện cơ bản (thiết bị, hóa chất, dụng cụ, nhân sự…). Trường hợp nguồn lực chưa đáp ứng, đề nghị bổ sung (đào tạo, mua hóa chất/dụng cụ/thiết bị, bố trí tiện nghi, môi trường). | QLKT / Nhân viên được phân công | `ETV.P.F 08.02` |
| Kiểm tra độ chính xác của phương pháp | QLKT chọn thông số đánh giá độ chính xác (xem Phụ lục I), cách thức thực hiện, phân công cán bộ, thời gian hoàn thành. Đối với phương pháp hiệu chuẩn, đánh giá ĐKĐBĐ cho toàn bộ chỉ tiêu cơ bản của quá trình hiệu chuẩn. | QLKT / Nhân viên được phân công | `ETV.P.F 08.01` |
| Kết thúc, báo cáo | Nhân viên thực hiện viết báo cáo tóm tắt kết quả chính thu được, kết luận, đề xuất để LĐV xem xét. Nếu được LĐV phê duyệt và ban hành chính thức, QLKT phân công cán bộ phổ biến, đào tạo cho nhân viên khác. | Nhân viên thực hiện / LĐV / QLKT | `ETV.P.F 08.03` |

### 6.3. Xác nhận giá trị sử dụng khi lựa chọn phương pháp không tiêu chuẩn

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| Đánh giá điều kiện cơ bản | Thực hiện như mục 6.2; đồng thời xây dựng hướng dẫn và xây dựng phương pháp kiểm định, hiệu chuẩn, thử nghiệm. | QLKT / Nhân viên được phân công | `ETV.P.F 08.02` |
| Nghiên cứu độ chính xác của phương pháp | QLKT chọn thông số nghiên cứu (xem Phụ lục I), cách thức thực hiện, phân công nhân viên, thời gian hoàn thành. Đối với phương pháp hiệu chuẩn, đánh giá ĐKĐBĐ cho toàn bộ chỉ tiêu cơ bản. | QLKT / Nhân viên được phân công | `ETV.P.F 08.01` |
| Kết thúc, báo cáo | Nhân viên thực hiện viết báo cáo tóm tắt kết quả, kết luận, đề xuất để QLKT và LĐV xem xét. Nếu được LĐV phê duyệt và ban hành chính thức, QLKT phân công cán bộ phổ biến, đào tạo cho nhân viên khác. | Nhân viên thực hiện / QLKT / LĐV | `ETV.P.F 08.03` |

### 6.4. Ước lượng độ không đảm bảo đo (ĐKĐBĐ)

**6.4.1. Kế hoạch thực hiện**

Đối với phương pháp đã áp dụng tại PTN, QLKT lập kế hoạch đánh giá lại (cách thức đánh giá, thời gian, phân công thực hiện). Đối với phương pháp mới áp dụng, kế hoạch xác nhận GTSD cần đề cập việc tính ĐKĐBĐ theo một trong 3 nguyên tắc: (1) ISO/GUM theo TCVN 9595-3:2013; (2) sử dụng dữ liệu xác nhận GTSD phương pháp theo TCVN 6910 (phần 1-6); (3) sử dụng dữ liệu độ chính xác theo TCVN 10861.

**6.4.2. Quá trình thực hiện**

Nhân viên được phân công xem xét kế hoạch để xác định nguyên tắc ước lượng ĐKĐBĐ áp dụng:

- **Nguyên tắc ISO/GUM:** xác định đại lượng đo → xác định các nguồn gây ra ĐKĐBĐ → ước lượng giá trị từng nguồn → tổng hợp các nguồn và tính ĐKĐBĐ mở rộng → viết báo cáo và hướng dẫn.
- **Nguyên tắc sử dụng dữ liệu xác nhận GTSD:** lựa chọn thông số cần nghiên cứu theo kế hoạch → thực hiện nghiên cứu → thu thập dữ liệu → ước lượng ĐKĐBĐ của phép thử → viết báo cáo và hướng dẫn.
- **Nguyên tắc sử dụng dữ liệu có sẵn:** tập hợp dữ liệu → kiểm tra việc thử nghiệm đạt được theo dữ liệu → lựa chọn thông số cần nghiên cứu theo kế hoạch → ước lượng ĐKĐBĐ → viết báo cáo và hướng dẫn.

## VII. BIỂU MẪU ÁP DỤNG

| Mã | Tên biểu mẫu | Trạng thái số hóa |
|---|---|---|
| `ETV.P.F 08.01` | Kế hoạch xác nhận giá trị sử dụng | Số hóa từ bản gốc đang dùng thực tế |
| `ETV.P.F 08.02` | Đánh giá điều kiện cơ bản | Chưa số hóa — nguồn Dropbox chưa đồng bộ (file rỗng), chờ bổ sung |
| `ETV.P.F 08.03` | Báo cáo tóm tắt kết quả xác nhận giá trị sử dụng của phương pháp | Chưa số hóa — nguồn Dropbox chưa đồng bộ (file rỗng), chờ bổ sung |
| `ETV.P.F 08.04` | Quyết định ban hành áp dụng quy trình hiệu chuẩn, thử nghiệm | Số hóa từ bản gốc đang dùng thực tế |

## VIII. LƯU HỒ SƠ

Toàn bộ hồ sơ xác nhận giá trị sử dụng của phương pháp phải được điền đầy đủ thông tin và lưu trữ theo `ETV.P 15`.

## PHỤ LỤC I — BẢNG THÔNG SỐ VÀ HÌNH THỨC ĐÁNH GIÁ

**Bảng thông số đề xuất đánh giá:**

| TT | Thông số | Giải thích ý nghĩa |
|---|---|---|
| 1 | Độ đúng (Accuracy) | Khả năng của phương pháp cho kết quả gần đúng với giá trị thực hoặc giá trị chuẩn đã biết. |
| 2 | Độ chụm (Precision) | Mức độ lặp lại được của phương pháp khi thực hiện nhiều phép đo trên cùng một mẫu dưới cùng điều kiện. |
| 3 | Tuyến tính (Linearity) | Khả năng của phương pháp tạo ra kết quả tỷ lệ thuận với nồng độ/khối lượng chất phân tích trong một khoảng nhất định. |
| 4 | Giới hạn phát hiện (LOD) | Giá trị thấp nhất của chất phân tích mà phương pháp có thể phát hiện được nhưng chưa cần định lượng chính xác. |
| 5 | Giới hạn định lượng (LOQ) | Giá trị thấp nhất của chất phân tích có thể định lượng với độ chính xác và độ chụm chấp nhận được. |
| 6 | Độ chọn lọc (Selectivity) | Khả năng của phương pháp phân biệt chất cần phân tích với các chất gây nhiễu khác có thể có trong mẫu. |
| 7 | Độ ổn định (Stability) | Mức độ mẫu hoặc tín hiệu đo giữ nguyên đặc tính ban đầu trong một khoảng thời gian nhất định. |
| 8 | Tác động ma trận (Matrix effect) | Ảnh hưởng của thành phần nền mẫu (ma trận) đến kết quả đo. |
| 9 | Tỷ số En (Error Normalized) | Chỉ số đánh giá độ phù hợp của kết quả đo trong chương trình so sánh liên phòng (PT/ILC) hoặc so sánh song phương, dựa trên sai số đo và ĐKĐBĐ. |

**Hình thức đánh giá có thể lựa chọn:** độ chụm bằng chất chuẩn (dung dịch/khí chuẩn); độ chụm bằng chuẩn đo lường; thử nghiệm thành thạo; so sánh liên phòng (thông qua Giấy chứng nhận); hiệu chuẩn/thử nghiệm/pha chế lặp lại (giữa 02 người ở 02 thời điểm khác nhau).
