---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát (ETV.P14 §6.3)
id: ETV.P31
title: "Thủ tục Quản lý tính liên tục hoạt động"
type: Thu-tuc
owner: "Phụ trách Quản lý chất lượng (QLCL)"
department: "Toàn Viện"
process: MP31_LienTuc
capability: [CAP-28_ATTT]
module: M31_LienTuc
effective_date: ""
revision: "01"
status: Cho-soat-xet
keywords: [liên tục hoạt động, phân tích tác động nghiệp vụ, BIA, RTO, RPO, diễn tập, kiểm chứng phục hồi, ISO/IEC 27001 A.5.29, A.5.30]
related_documents: [ETV.QM, ETV.P01, ETV.P03, ETV.P05, ETV.P06, ETV.P07, ETV.P10, ETV.P11, ETV.P13, ETV.P14, ETV.P15, ETV.P26, ETV.P27, ETV.P28, ETV.P30, ETV.P34, ETV.P35]
iso_clause: ["ISO/IEC 27001:2022 A.5.29 (An toàn thông tin trong gián đoạn)", "ISO/IEC 27001:2022 A.5.30 (Sẵn sàng CNTT cho tính liên tục)", "ISO/IEC 27001:2022 A.8.13, A.8.14", "ISO 9001:2015 §6.1, §7.1.3, §8.1", "ISO/IEC 17025:2017 §6.3, §6.4, §7.10, §7.11, §8.5", "ISO 17034:2016 §7.4, §7.7", "ISO/IEC 42001:2023 §8.1"]
legal_basis: ["Luật An toàn thông tin mạng 86/2015/QH13", "Luật An ninh mạng 24/2018/QH14", "Nghị định 85/2016/NĐ-CP", "Nghị định 13/2023/NĐ-CP", "Luật Đo lường 04/2011/QH13", "Nghị định 105/2016/NĐ-CP", "Nghị định 154/2018/NĐ-CP", "Bộ luật Lao động 45/2019/QH14"]
ai_tags: [business-continuity, bia, disaster-recovery]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Vĩnh viễn (bản hiện hành) — xem chi tiết theo loại tại ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: null
superseded_by: null
---
# THỦ TỤC QUẢN LÝ TÍNH LIÊN TỤC HOẠT ĐỘNG

**Procedure For Business Continuity Management**

|                   |                                          |
| ----------------- | ---------------------------------------- |
| **Mã số**         | ETV.P 31                                 |
| **Lần ban hành**  | 01                                       |
| **Ngày ban hành** | ..../..../........                       |
| **Biên soạn**     | Dương Thành Nam — ..../..../........     |
| **Soát xét**      | Đỗ Văn Vinh — Lãnh đạo Phòng, ..../..../........ |
| **Phê duyệt**     | Nguyễn Hoàng Giang — Lãnh đạo Viện, ..../..../........ |

> **Tình trạng bản này: CHỜ SOÁT XÉT** — dự thảo lần đầu, chưa có hiệu lực. Bản này chỉ được áp dụng sau khi Lãnh đạo Viện phê duyệt và chuyển trạng thái **Đã phê duyệt** theo ETV.P14.

> **Chú ý:** Tài liệu nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện Kiểm định Công nghệ và Môi trường.

> **Ghi chú số hóa (AI).** Bản dự thảo do AI soạn theo khung mẫu chuẩn của skill `s14-kiem-soat-tai-lieu` (thể thức tài liệu HTQL tại ETV.P14), lấy ETV.P01 và ETV.P13 làm mẫu cấu trúc. Đây là **bản dự thảo/gợi ý**, cần Lãnh đạo Phòng soát xét và Lãnh đạo Viện phê duyệt trước khi có hiệu lực. Các giá trị định lượng (chu kỳ diễn tập, chu kỳ kiểm chứng phục hồi, ngưỡng thông báo) là **đề xuất**, cần Viện xác nhận cho khớp nguồn lực thực tế trước khi ban hành.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi | Lần ban hành |
| ---------- | ------------------- | -------------- |
| ..../..../........ | Ban hành lần thứ nhất. Thủ tục mới, hiện thực hoá yêu cầu tại Sổ tay chất lượng §9.8 và quy trình MP31 | 01 |

---

## I. MỤC ĐÍCH

Thủ tục này quy định nội dung, trách nhiệm và trình tự **phân tích tác động nghiệp vụ, lập kế hoạch, diễn tập, kích hoạt, khôi phục và rút kinh nghiệm** đối với các tình huống gián đoạn hoạt động của Viện ETV, nhằm đáp ứng yêu cầu kiểm soát A.5.29 và A.5.30 của ISO/IEC 27001:2022, Điều 6.1 và 7.1.3 của ISO 9001:2015, Điều 8.5 của ISO/IEC 17025:2017, và Mục 9.8 của Sổ tay chất lượng. Cụ thể để:

1. Bảo đảm Viện **duy trì hoặc khôi phục** các quá trình trọng yếu trong thời gian đã cam kết khi xảy ra gián đoạn về con người, mặt bằng, thiết bị, hạ tầng, hệ thống thông tin, dữ liệu hoặc nhà cung cấp.
2. Xác định rõ **quá trình trọng yếu**, **thời gian gián đoạn tối đa chấp nhận được (MTPD)**, **mục tiêu thời gian khôi phục (RTO)** và **mục tiêu điểm khôi phục dữ liệu (RPO)** cho từng quá trình — thay cho cách nói chung chung "phải khôi phục sớm nhất".
3. Bảo đảm **sẵn sàng công nghệ thông tin** cho tính liên tục và bảo đảm **an toàn thông tin được duy trì trong suốt thời gian gián đoạn**.
4. Bảo đảm gián đoạn **không dẫn tới việc phát hành kết quả không đủ độ tin cậy**; mọi công việc bị ảnh hưởng đều được rà soát về hiệu lực trước khi tiếp tục.
5. Bảo đảm năng lực khôi phục là **đã được kiểm chứng bằng diễn tập**, không phải chỉ tồn tại trên giấy — bản sao lưu chưa từng được thử phục hồi thì không được coi là phương án khôi phục.
6. Bảo đảm cam kết với khách hàng và nghĩa vụ thông báo tới cơ quan quản lý, tổ chức công nhận được thực hiện đúng trong tình huống gián đoạn.

Áp dụng thống nhất trong toàn Viện ETV, thực hiện qua phần mềm ManLab (Module M31 – Quản lý tính liên tục hoạt động).

---

## II. PHẠM VI ÁP DỤNG

### 2.1. Đối tượng áp dụng

Áp dụng cho toàn bộ đơn vị, phòng ban, cá nhân thuộc Viện ETV và cho **mọi tình huống gián đoạn** thuộc các nhóm sau:

| TT | Nhóm gián đoạn | Ví dụ |
|---|---|---|
| 1 | Con người | Mất nhân sự chủ chốt (người ký kết quả, người phụ trách kỹ thuật), dịch bệnh, nghỉ việc đồng loạt |
| 2 | Mặt bằng và cơ sở vật chất | Cháy nổ, ngập lụt, mất điện kéo dài, hỏng hệ thống điều hoà làm mất điều kiện môi trường phòng thí nghiệm, không tiếp cận được trụ sở |
| 3 | Thiết bị và chuẩn đo lường | Hỏng thiết bị chính không có dự phòng, mất/hỏng chuẩn tham chiếu, chuẩn quá hạn hiệu chuẩn mà chưa có phương án thay thế |
| 4 | Hệ thống thông tin và nền tảng số | Mất ManLab, mất máy chủ, mất kết nối mạng, sự cố mã hoá tống tiền, nhà cung cấp dịch vụ đám mây ngừng hoạt động |
| 5 | Dữ liệu | Mất, hỏng hoặc không truy cập được dữ liệu đo, hồ sơ kỹ thuật, dữ liệu khách hàng |
| 6 | Chuỗi cung ứng và dịch vụ bên ngoài | Nhà thầu phụ ngừng cung cấp phép thử, tổ chức hiệu chuẩn bên ngoài ngừng dịch vụ, đứt nguồn cung hoá chất/chất chuẩn |
| 7 | Bên ngoài, bất khả kháng | Thiên tai, sự kiện xã hội, quyết định hành chính làm gián đoạn hoạt động |

### 2.2. Nguyên tắc áp dụng

**Nguyên tắc 1 — Kế hoạch chưa diễn tập là kế hoạch chưa có.** Một phương án khôi phục chỉ được ghi nhận là **có hiệu lực** khi đã được kiểm chứng bằng diễn tập hoặc bằng một lần kích hoạt thật có ghi nhận kết quả, trong chu kỳ quy định tại mục 6.4.2. Phương án quá hạn diễn tập bị gắn cờ **Chưa kiểm chứng** và **không** được viện dẫn làm bằng chứng đáp ứng yêu cầu liên tục hoạt động cho bất kỳ thủ tục nào khác.

**Nguyên tắc 2 — Kế hoạch hành động, không phải kho tài liệu kỹ thuật.** Kế hoạch duy trì liên tục hoạt động chỉ ghi **ngưỡng kích hoạt, đội ứng phó, các bước, nguồn lực và đường dẫn** tới nội dung gốc: quy trình sao lưu kỹ thuật theo ETV.P27/ETV.P34, hồ sơ thiết bị theo ETV.P05, hồ sơ nhà cung cấp theo ETV.P06.

### 2.3. Ngoài phạm vi

Thủ tục này **không** thay thế và **không** trùng lặp với:

| Nội dung | Thuộc thủ tục |
|---|---|
| Cơ chế sao lưu, lưu trữ, vòng đời và phục hồi dữ liệu về mặt kỹ thuật | ETV.P27 – Quản trị dữ liệu và tài sản thông tin · ETV.P34 – Quản lý dữ liệu số |
| Phân loại, điều tra, xử lý và đóng **sự cố an toàn thông tin** | ETV.P28 – Quản lý an toàn thông tin |
| Hạ tầng công nghệ thông tin, máy chủ, mạng, thiết bị đầu cuối | ETV.P33 – Quản lý hệ thống thông tin |
| Đăng ký, giám sát tình trạng và ngừng vận hành nền tảng số | ETV.P35 – Quản lý nền tảng số |
| Thay đổi **có chủ đích** đối với hệ thống quản lý và hoạt động | ETV.P30 – Quản lý thay đổi |
| Sự không phù hợp và hành động khắc phục sau gián đoạn | ETV.P13 – Kiểm soát công việc không phù hợp |
| Kết luận về hiệu lực kết quả đo bị ảnh hưởng và xử lý kết quả đã phát hành | ETV.P10 – Đảm bảo giá trị sử dụng kết quả · ETV.P11 – Báo cáo kết quả |
| Đánh giá và xử lý rủi ro (bao gồm rủi ro gián đoạn) | ETV.P01 – Rủi ro và cơ hội |
| Điều kiện môi trường phòng thí nghiệm trong điều kiện bình thường | ETV.P04 – Quản lý điều kiện môi trường |
| Hồ sơ thiết bị, hiệu chuẩn, kiểm tra trung gian | ETV.P05 – Quản lý thiết bị |
| Đánh giá, lựa chọn và thay thế nhà cung cấp | ETV.P06 – Quản lý mua sắm |
| Thông báo và thương lượng lại với khách hàng về hợp đồng | ETV.P07 – Xem xét yêu cầu, đề nghị và hợp đồng |
| Bài học kinh nghiệm rút ra sau gián đoạn | ETV.P26 – Quản lý tri thức tổ chức |

> **Phân biệt cốt lõi:** ETV.P28 trả lời "chuyện gì đã xảy ra với an toàn thông tin và xử lý ra sao"; ETV.P31 trả lời "Viện có tiếp tục làm việc được không và khôi phục trong bao lâu". Một sự cố mã hoá tống tiền kích hoạt **cả hai** — ETV.P28 điều tra và xử lý sự cố, ETV.P31 quyết định chuyển sang phương thức làm việc dự phòng và khôi phục dịch vụ.

---

## III. TÀI LIỆU VIỆN DẪN

> Nguyên tắc: **chỉ dẫn chiếu, không chép lại nội dung.** Bản đầy đủ đặt tại `03_MANAGEMENT_SYSTEM/` (chuẩn mực) và `08_KNOWLEDGE_GRAPH/01_Regulations/` (pháp luật). QLCL rà soát hiệu lực và văn bản thay thế trước mỗi lần ban hành lại.

### 3.1. Tiêu chuẩn

- ISO/IEC 27001:2022 §6.1; §8.1; §9.1; A.5.29 (An toàn thông tin trong gián đoạn); A.5.30 (Sẵn sàng CNTT cho tính liên tục hoạt động); A.7.5; A.7.11; A.8.13 (Sao lưu thông tin); A.8.14 (Dự phòng phương tiện xử lý thông tin)
- ISO 22301:2019 — hệ thống quản lý tính liên tục hoạt động *(tham khảo về phương pháp BIA, RTO/RPO và diễn tập; **không** phải tiêu chuẩn Viện đăng ký chứng nhận)*
- ISO 9001:2015 §6.1; §7.1.3; §7.1.4; §8.1; §8.4; §9.3
- ISO/IEC 17025:2017 §6.3; §6.4; §6.6; §7.10 (Công việc không phù hợp); §7.11 (Kiểm soát dữ liệu — bao gồm bảo vệ và sao lưu); §8.5
- ISO 17034:2016 §7.4; §7.7; §8.5
- ISO/IEC 42001:2023 §6.1; §8.1 (bao gồm phương án khi hệ thống AI không khả dụng)
- `11_COMPLIANCE/01_ISO_Mapping/MP-ISO-mapping.md` — bảng ánh xạ đầy đủ MP ↔ điều khoản

### 3.2. Văn bản pháp luật

- Luật An toàn thông tin mạng số 86/2015/QH13 — bảo đảm an toàn hệ thống thông tin, ứng cứu sự cố
- Luật An ninh mạng số 24/2018/QH14 — ứng phó, khắc phục sự cố an ninh mạng
- Nghị định 85/2016/NĐ-CP — bảo đảm an toàn hệ thống thông tin theo cấp độ, bao gồm yêu cầu về phương án dự phòng và ứng cứu *(và văn bản hướng dẫn hiện hành)*
- Nghị định 13/2023/NĐ-CP — bảo vệ dữ liệu cá nhân, nghĩa vụ thông báo khi xảy ra vi phạm
- Luật Đo lường số 04/2011/QH13; Nghị định 105/2016/NĐ-CP; Nghị định 154/2018/NĐ-CP — nghĩa vụ duy trì điều kiện hoạt động và thông báo khi không còn đáp ứng điều kiện đã đăng ký, đã chỉ định
- Bộ luật Lao động số 45/2019/QH14 — bố trí lao động, làm việc từ xa, ngừng việc trong tình huống bất khả kháng

### 3.3. Văn bản nội bộ Viện ETV

- Sổ tay quản lý chất lượng (ETV.QM) §9.8
- ETV.P01 – Quản lý rủi ro và cơ hội · ETV.P03 – Quản lý nhân sự · ETV.P04 – Quản lý điều kiện môi trường · ETV.P05 – Quản lý thiết bị
- ETV.P06 – Quản lý mua sắm · ETV.P07 – Xem xét yêu cầu, đề nghị và hợp đồng · ETV.P09 – Lấy mẫu · ETV.P10 – Đảm bảo giá trị sử dụng kết quả
- ETV.P11 – Báo cáo kết quả · ETV.P12 – Khiếu nại · ETV.P13 – Kiểm soát công việc không phù hợp · ETV.P14 – Kiểm soát tài liệu
- ETV.P15 – Kiểm soát hồ sơ · ETV.P16 – Đánh giá nội bộ · ETV.P17 – Xem xét của lãnh đạo · ETV.P19 – Sản xuất chất chuẩn
- ETV.P25 – Quản lý bối cảnh tổ chức · ETV.P26 – Quản lý tri thức tổ chức · ETV.P27 – Quản trị dữ liệu và tài sản thông tin
- ETV.P28 – Quản lý an toàn thông tin · ETV.P29 – Quản lý hệ thống trí tuệ nhân tạo · ETV.P30 – Quản lý thay đổi
- ETV.P33 – Quản lý hệ thống thông tin · ETV.P34 – Quản lý dữ liệu số · ETV.P35 – Quản lý nền tảng số

---

## IV. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 4.1. Thuật ngữ và định nghĩa

Định nghĩa chung ("quá trình", "rủi ro", "sự cố"...) theo ISO 9000:2015 và ISO/IEC 27000 — không nhắc lại tại đây. Các thuật ngữ riêng của thủ tục này:

| Thuật ngữ | Định nghĩa |
|---|---|
| **Gián đoạn** (Disruption) | Sự việc làm cho một hoặc nhiều quá trình của Viện không thể thực hiện được theo cách thông thường, không phụ thuộc nguyên nhân |
| **Quá trình trọng yếu** | Quá trình mà việc gián đoạn gây hậu quả không chấp nhận được đối với khách hàng, nghĩa vụ pháp lý, hiệu lực kết quả hoặc uy tín của Viện; được xác định qua Phân tích tác động nghiệp vụ |
| **Phân tích tác động nghiệp vụ** (BIA) | Việc xác định các quá trình của Viện, hậu quả nếu chúng bị gián đoạn theo thời gian, các nguồn lực tối thiểu cần thiết để duy trì chúng, và từ đó xác định MTPD, RTO, RPO |
| **MTPD** | Khoảng thời gian dài nhất mà một quá trình có thể ngừng trước khi hậu quả trở nên không thể chấp nhận được |
| **RTO** | Khoảng thời gian mục tiêu để khôi phục một quá trình về mức hoạt động tối thiểu chấp nhận được, tính từ thời điểm gián đoạn. RTO luôn **ngắn hơn** MTPD |
| **RPO** | Lượng dữ liệu tối đa (tính theo thời gian) mà Viện chấp nhận mất khi khôi phục — quyết định tần suất sao lưu tối thiểu |
| **Mức hoạt động tối thiểu chấp nhận được** | Mức năng lực mà quá trình phải đạt trong thời gian chưa khôi phục hoàn toàn, ghi rõ khối lượng, phạm vi phép thử và điều kiện chất lượng còn được bảo đảm |
| **Kế hoạch duy trì liên tục hoạt động** (BCP) | Tập hợp các phương án hành động cho từng kịch bản gián đoạn: ngưỡng kích hoạt, đội ứng phó, các bước xử lý, nguồn lực dự phòng, cách thức thông tin liên lạc và tiêu chí tuyên bố kết thúc |
| **Kịch bản gián đoạn** | Một tình huống gián đoạn giả định cụ thể, dùng làm cơ sở lập phương án và tổ chức diễn tập |
| **Ngưỡng kích hoạt** | Điều kiện định lượng hoặc định tính mà khi vượt qua thì kế hoạch được kích hoạt, ví dụ mất hệ thống thông tin quá 04 giờ trong giờ làm việc |
| **Đội ứng phó gián đoạn** (ĐUP) | Nhóm nhân sự được chỉ định trước, có người chỉ huy và người thay thế, chịu trách nhiệm xử lý gián đoạn khi kế hoạch được kích hoạt |
| **Diễn tập** | Hoạt động kiểm chứng kế hoạch, gồm ba hình thức: **diễn tập trên giấy** (rà soát theo kịch bản), **diễn tập mô phỏng** (thực hiện một phần thao tác thật), **diễn tập thực tế** (chuyển đổi thật sang phương án dự phòng) |
| **Kiểm chứng phục hồi** (Restore test) | Việc phục hồi thật một bản sao lưu vào môi trường kiểm thử và xác nhận dữ liệu đọc được, đúng và đủ. Kiểm tra "sao lưu chạy thành công" **không** phải kiểm chứng phục hồi |
| **Kích hoạt** | Quyết định chính thức chuyển sang vận hành theo kế hoạch duy trì liên tục hoạt động |
| **Trở lại bình thường** | Việc chấm dứt trạng thái vận hành dự phòng và quay lại phương thức hoạt động thông thường, sau khi đã rà soát hiệu lực của các công việc thực hiện trong thời gian gián đoạn |

### 4.2. Chữ viết tắt

| Viết tắt | Ý nghĩa |
|---|---|
| ETV | Viện Kiểm định Công nghệ và Môi trường |
| LĐV | Lãnh đạo Viện (cấp trưởng, cấp phó) |
| LĐP | Lãnh đạo Phòng/bộ phận, người phụ trách lĩnh vực |
| NTH | Người thực hiện (mọi nhân sự, không phân biệt chức vụ) |
| QLCL | Phụ trách Quản lý chất lượng |
| QTHT | Quản trị hệ thống |
| PT.ATTT | Người phụ trách an toàn thông tin |
| ĐUP | Đội ứng phó gián đoạn |
| CHUP | Người chỉ huy ứng phó |
| BIA | Phân tích tác động nghiệp vụ |
| BCP | Kế hoạch duy trì liên tục hoạt động |
| MTPD | Thời gian gián đoạn tối đa chấp nhận được |
| RTO | Mục tiêu thời gian khôi phục |
| RPO | Mục tiêu điểm khôi phục dữ liệu |
| KPH | Công việc không phù hợp |
| BoA | Văn phòng Công nhận Chất lượng |
| RACI | Responsible – Accountable – Consulted – Informed |

---

## V. VAI TRÒ VÀ TRÁCH NHIỆM (RACI)

### 5.1. Ma trận RACI

| Bước trong vòng đời liên tục hoạt động | NTH | LĐP | CHUP | QLCL | QTHT/PT.ATTT | LĐV |
|---|---|---|---|---|---|---|
| Cung cấp dữ liệu đầu vào cho BIA | **R** | **R** | C | **A** | C | I |
| Lập Phân tích tác động nghiệp vụ (F31.01) | C | C | C | **R** | C | **A** |
| Phê duyệt BIA, giá trị MTPD/RTO/RPO | I | C | C | **R** | C | **R/A** |
| Lập Kế hoạch duy trì liên tục hoạt động (F31.02) | C | **R** | C | **R/A** | **R** | I |
| Phê duyệt Kế hoạch | I | C | C | **R** | C | **R/A** |
| Chỉ định CHUP, người thay thế và thành viên ĐUP | I | C | I | C | I | **R/A** |
| Lập kế hoạch diễn tập năm, tổ chức diễn tập (F31.03) | **R** | **R** | **R** | **R/A** | **R** | **A** |
| Bảo đảm sao lưu đúng tần suất đáp ứng RPO | I | I | I | **A** | **R** | I |
| Thực hiện kiểm chứng phục hồi | I | I | I | C | **R** | I |
| Xác nhận kết quả kiểm chứng phục hồi (**≠ người thực hiện**) | I | I | I | **R/A** | C | I |
| Phát hiện, báo cáo dấu hiệu gián đoạn | **R** | **R** | **A** | I | **R** | I |
| Phân mức gián đoạn, mở nhật ký gián đoạn (F31.04) | I | C | **R/A** | C | C | I |
| Quyết định kích hoạt (Mức A) | I | **R/A** | **R** | I | I | I |
| Quyết định kích hoạt (Mức B, Mức C) | I | C | **R** | C | C | **R/A** |
| Điều hành ứng phó, phân công thứ tự ưu tiên khôi phục | **R** | **R** | **R/A** | C | **R** | **A** |
| Phê duyệt nới lỏng kiểm soát an toàn thông tin trong gián đoạn | I | I | C | C | **R** | **R/A** |
| Thực hiện nghĩa vụ thông báo bên ngoài | I | I | C | **R** | I | **A** |
| Rà soát hiệu lực công việc trong thời gian gián đoạn | C | **R** | C | **R/A** | C | **A** |
| **Tuyên bố trở lại bình thường** | I | C | **R** | **R** | C | **R/A** |
| Tổ chức rút kinh nghiệm, lập KPH, ghi bài học (ETV.P26) | C | **R** | **R** | **R/A** | C | **A** |
| Lưu trữ hồ sơ liên tục hoạt động | I | I | C | **R/A** | C | I |

> LĐV luôn là **A** cuối cùng đối với BIA, Kế hoạch, quyết định kích hoạt Mức B/Mức C và tuyên bố trở lại bình thường — **không uỷ quyền**.

### 5.2. Trách nhiệm cụ thể

**Lãnh đạo Viện (LĐV):** Phê duyệt kết quả BIA, giá trị MTPD/RTO/RPO và Kế hoạch duy trì liên tục hoạt động; chỉ định CHUP, người thay thế và ĐUP; **quyết định kích hoạt** kế hoạch đối với gián đoạn Mức B, Mức C và **quyết định tuyên bố trở lại bình thường**; quyết định việc thông báo tới khách hàng, cơ quan quản lý nhà nước, tổ chức công nhận; bảo đảm nguồn lực cho phương án dự phòng và diễn tập; xem xét tình hình liên tục hoạt động trong cuộc họp xem xét của lãnh đạo (ETV.P17).

**Phụ trách Quản lý chất lượng (QLCL):** Chủ trì tổ chức BIA (F31.01) và duy trì Kế hoạch (F31.02); lập kế hoạch diễn tập năm, tổ chức diễn tập và lưu biên bản (F31.03); theo dõi phương án quá hạn diễn tập, quá hạn kiểm chứng phục hồi và báo cáo LĐV; **chủ trì rà soát hiệu lực công việc thực hiện trong thời gian gián đoạn** trước khi tuyên bố trở lại bình thường; lập KPH theo ETV.P13 khi RTO/RPO bị vượt; tổng hợp bài học kinh nghiệm theo ETV.P26; tổng hợp báo cáo và lưu trữ hồ sơ theo ETV.P15.

**Người chỉ huy ứng phó (CHUP):** Điều hành ĐUP khi kế hoạch được kích hoạt, phân công nhiệm vụ và quyết định thứ tự ưu tiên khôi phục; đề xuất LĐV kích hoạt, nâng mức hoặc kết thúc trạng thái ứng phó; bảo đảm **nhật ký gián đoạn (F31.04)** được ghi liên tục trong suốt thời gian ứng phó; là đầu mối thông tin nội bộ trong thời gian gián đoạn.

**Lãnh đạo Phòng (LĐP):** Cung cấp dữ liệu đầu vào cho BIA của các quá trình thuộc phạm vi phụ trách; xác định **mức hoạt động tối thiểu chấp nhận được** và nguồn lực tối thiểu; tổ chức thực hiện phương án dự phòng trong phòng và báo cáo tiến độ khôi phục cho CHUP; xác định danh sách công việc, mẫu, kết quả bị ảnh hưởng để rà soát theo mục 6.6.2.

**Quản trị hệ thống (QTHT) và Người phụ trách an toàn thông tin (PT.ATTT):** Bảo đảm sao lưu được thực hiện đúng tần suất đáp ứng RPO đã phê duyệt (cơ chế kỹ thuật theo ETV.P27/ETV.P34); thực hiện **kiểm chứng phục hồi** theo chu kỳ tại mục 6.4.3 và lưu bằng chứng; thực hiện chuyển đổi sang hệ thống dự phòng theo quyết định của CHUP/LĐV; bảo đảm **mức bảo vệ an toàn thông tin không bị hạ thấp** trong thời gian vận hành dự phòng — mọi nới lỏng kiểm soát phải có phê duyệt của LĐV, có thời hạn và được ghi nhật ký.

**Người thực hiện (NTH):** Nắm rõ phương án dự phòng áp dụng cho công việc của mình và đầu mối liên lạc khi gián đoạn; tham gia diễn tập theo kế hoạch; báo cáo ngay cho LĐP/CHUP khi phát hiện dấu hiệu gián đoạn; **không** tự ý dùng thiết bị, phần mềm hoặc kênh trao đổi ngoài phương án đã phê duyệt để "chữa cháy".

### 5.3. Nguyên tắc tách vai trò và giới hạn của AI

- Người lập BIA/BCP ≠ người phê duyệt. Người thực hiện kiểm chứng phục hồi ≠ người xác nhận kết quả kiểm chứng.
- Trợ lý AI **không** được quyết định kích hoạt, **không** kết luận về hiệu lực kết quả bị ảnh hưởng, **không** xác nhận kết quả kiểm chứng phục hồi và **không** tự thực hiện thao tác khôi phục trên hệ thống vận hành (ISO/IEC 42001; ETV.P29).
- Kế hoạch phải vận hành được **kể cả khi hệ thống AI và ManLab không khả dụng** — bắt buộc có bản in hoặc bản ngoại tuyến theo mục 6.3.4.

---

## VI. NỘI DUNG / QUY TRÌNH THỰC HIỆN

### 6.1. Phân tích tác động nghiệp vụ

#### 6.1.1. Chu kỳ thực hiện

BIA được lập lần đầu khi ban hành thủ tục này và rà soát lại **12 tháng/lần**, hoặc sớm hơn khi: thay đổi cơ cấu tổ chức; thay đổi địa điểm; bổ sung/rút phép thử khỏi phạm vi công nhận; thay đổi lớn về hệ thống thông tin (ETV.P30); hoặc sau mỗi lần kích hoạt kế hoạch thật.

#### 6.1.2. Nội dung phân tích

Với **từng quá trình** của Viện, xác định:

| Nội dung | Yêu cầu |
|---|---|
| Mô tả quá trình | Đầu vào, đầu ra, đơn vị chủ trì |
| Hậu quả theo thời gian gián đoạn | Đánh giá tại các mốc: 04 giờ · 24 giờ · 03 ngày · 07 ngày · 30 ngày |
| Loại hậu quả | Hợp đồng và tài chính · Nghĩa vụ pháp lý và điều kiện hoạt động · Hiệu lực kết quả và an toàn của bên sử dụng kết quả · Uy tín và phạm vi công nhận |
| MTPD | Thời điểm hậu quả trở nên không chấp nhận được |
| RTO | Mục tiêu khôi phục, **phải ngắn hơn MTPD** |
| RPO | Lượng dữ liệu tối đa chấp nhận mất |
| Mức hoạt động tối thiểu | Khối lượng, phạm vi phép thử và điều kiện chất lượng còn bảo đảm trong thời gian dự phòng |
| Nguồn lực tối thiểu | Nhân sự (vai trò, số người, người thay thế), thiết bị và chuẩn, mặt bằng, hệ thống thông tin, dữ liệu, nhà cung cấp |
| Phụ thuộc | Quá trình khác, nền tảng số (ETV.P35), nhà cung cấp (ETV.P06) mà quá trình này phụ thuộc |

#### 6.1.3. Xếp hạng trọng yếu

| Hạng | Tiêu chí | Hệ quả bắt buộc |
|---|---|---|
| **Trọng yếu cao** | MTPD ≤ 24 giờ; hoặc gián đoạn ảnh hưởng hiệu lực kết quả đã/đang phát hành; hoặc ảnh hưởng điều kiện duy trì phạm vi công nhận/chỉ định | Bắt buộc có phương án dự phòng **đã kiểm chứng**; diễn tập ≤ 12 tháng/lần; ≥ 01 rủi ro mở tại ETV.P01 |
| **Trọng yếu trung bình** | MTPD từ trên 24 giờ đến 07 ngày | Bắt buộc có phương án dự phòng; diễn tập ≤ 24 tháng/lần |
| **Không trọng yếu** | MTPD > 07 ngày | Ghi nhận trong BIA; không bắt buộc phương án riêng |

Khi có nghi ngờ giữa hai hạng, **xếp vào hạng cao hơn**. Kết quả BIA do **LĐV phê duyệt** và là **đầu vào bắt buộc** cho ETV.P01.

#### 6.1.4. Liên kết với đánh giá rủi ro an toàn thông tin

Rủi ro an toàn thông tin có mức tác động tới **tính sẵn sàng ≥ 4** theo ETV.P28 là **đầu vào bắt buộc** cho BIA và cho kế hoạch tại mục 6.3. Ngược lại, quá trình xếp hạng **Trọng yếu cao** ở thủ tục này phải có tài sản thông tin tương ứng được nhận diện tại ETV.P27 và được xem xét trong đánh giá rủi ro của ETV.P28.

### 6.2. Kịch bản gián đoạn bắt buộc

Viện xây dựng phương án cho **tối thiểu** các kịch bản sau; mỗi kịch bản là một phần của F31.02:

| Mã | Kịch bản | Nội dung tối thiểu của phương án |
|---|---|---|
| KB-01 | Mất mặt bằng làm việc/phòng thí nghiệm (cháy, ngập, không tiếp cận được) | Địa điểm dự phòng, thứ tự di dời thiết bị và mẫu, điều kiện môi trường tối thiểu, xử lý mẫu đang lưu |
| KB-02 | Mất điện hoặc mất tiện ích hỗ trợ kéo dài | Nguồn dự phòng, thứ tự ưu tiên cấp điện cho tủ bảo quản mẫu/chất chuẩn và thiết bị đang đo, ngưỡng dừng phép đo |
| KB-03 | Mất hệ thống thông tin/ManLab | Phương thức làm việc ngoại tuyến, biểu mẫu giấy thay thế, cách nhập bù dữ liệu và bảo đảm truy vết khi hệ thống trở lại |
| KB-04 | Mất hoặc hỏng dữ liệu | Nguồn sao lưu sử dụng, trình tự phục hồi, cách xác định khoảng dữ liệu mất so với RPO, cách xử lý công việc trong khoảng đó |
| KB-05 | Sự cố mã hoá tống tiền hoặc xâm nhập trái phép | Cách ly hệ thống, phối hợp bắt buộc với ETV.P28, điều kiện phục hồi từ bản sao lưu sạch, **không** khôi phục vào hệ thống chưa được xác nhận sạch |
| KB-06 | Hỏng/mất thiết bị chính hoặc chuẩn tham chiếu | Thiết bị thay thế, thuê ngoài hoặc chuyển phép thử cho nhà thầu phụ đủ năng lực (ETV.P06), điều kiện tiếp tục phát hành kết quả |
| KB-07 | Mất nhân sự chủ chốt | Người thay thế đã được uỷ quyền và đánh giá năng lực trước (ETV.P03), giới hạn phép thử còn thực hiện được |
| KB-08 | Mất nhà cung cấp/nhà thầu phụ trọng yếu | Nhà cung cấp thay thế đã đánh giá sơ bộ, thời gian chuyển đổi, ảnh hưởng tới cam kết với khách hàng |
| KB-09 | Nhân sự không thể đến trụ sở diện rộng (dịch bệnh, sự kiện xã hội) | Công việc thực hiện từ xa, công việc bắt buộc tại chỗ, bố trí ca luân phiên, điều kiện an toàn thông tin khi làm việc từ xa |

QLCL bổ sung kịch bản khác khi BIA hoặc ETV.P01, ETV.P25 chỉ ra nguy cơ mới.

### 6.3. Kế hoạch duy trì liên tục hoạt động

#### 6.3.1. Nội dung bắt buộc của mỗi phương án

| Mục | Nội dung |
|---|---|
| Kịch bản áp dụng | Mã và mô tả kịch bản |
| Ngưỡng kích hoạt | Điều kiện định lượng để đề nghị kích hoạt |
| Đội ứng phó | Người chỉ huy, người thay thế, thành viên và vai trò; thông tin liên lạc (kể cả kênh ngoài hệ thống của Viện) |
| Các bước xử lý | Trình tự thao tác theo thứ tự thời gian, ghi rõ ai làm, trong bao lâu |
| Nguồn lực dự phòng | Địa điểm, thiết bị, dữ liệu, nhà cung cấp, kinh phí dự kiến |
| Thứ tự ưu tiên khôi phục | Danh sách quá trình theo hạng trọng yếu và RTO |
| Thông tin liên lạc | Nội bộ; khách hàng; cơ quan quản lý; tổ chức công nhận — ai soạn, ai duyệt, ai gửi |
| Tiêu chí kết thúc | Điều kiện tuyên bố trở lại bình thường |
| Điểm không thể phục hồi | Nội dung không có phương án khôi phục (nếu có) — phải nêu rõ và mở rủi ro tại ETV.P01 |

#### 6.3.2. Duy trì an toàn thông tin trong thời gian gián đoạn

Trong thời gian vận hành dự phòng, **mức bảo vệ an toàn thông tin không được hạ thấp**. Trường hợp buộc phải nới lỏng một kiểm soát để duy trì hoạt động, phải: có **phê duyệt của LĐV**; ghi rõ **kiểm soát bị nới lỏng và biện pháp bù đắp**; ấn định **thời hạn không quá thời gian gián đoạn**; ghi vào **nhật ký gián đoạn**; và **khôi phục nguyên trạng ngay khi trở lại bình thường**. Việc nới lỏng kiểm soát được ghi nhận và xử lý đồng thời theo **ETV.P28**.

#### 6.3.3. Phương án khi hệ thống trí tuệ nhân tạo không khả dụng

Mọi quá trình có sử dụng trợ lý AI phải có phương án thực hiện **không cần AI**. Việc AI không khả dụng **không** được viện dẫn làm lý do chậm trễ hoặc sai sót trong công việc chuyên môn, vì AI không bao giờ là mắt xích ra quyết định cuối cùng (ETV.P29).

#### 6.3.4. Bản ngoại tuyến của kế hoạch

Kế hoạch và danh sách liên lạc của ĐUP phải có **bản in hoặc bản lưu ngoại tuyến** đặt tại nơi ĐUP tiếp cận được **khi không có mạng và không có ManLab**. QLCL cập nhật bản ngoại tuyến trong **05 ngày làm việc** kể từ mỗi lần kế hoạch được phê duyệt lại. Bản ngoại tuyến chứa dữ liệu cá nhân liên lạc được bảo vệ theo ETV.P28.

### 6.4. Diễn tập và kiểm chứng

#### 6.4.1. Kế hoạch diễn tập năm

QLCL lập kế hoạch diễn tập cho năm kế tiếp trước **31/12** hằng năm, trình LĐV phê duyệt cùng kế hoạch đánh giá nội bộ (ETV.P16). Kế hoạch nêu rõ: kịch bản, hình thức diễn tập, thời điểm, thành phần tham gia, mục tiêu kiểm chứng (RTO/RPO nào được kiểm chứng).

#### 6.4.2. Tần suất tối thiểu

| Đối tượng | Tần suất | Hình thức tối thiểu |
|---|---|---|
| Kịch bản của quá trình **Trọng yếu cao** | ≤ 12 tháng/lần | Mô phỏng (ít nhất 01 kịch bản/năm phải là diễn tập thực tế) |
| Kịch bản của quá trình **Trọng yếu trung bình** | ≤ 24 tháng/lần | Trên giấy |
| Danh sách liên lạc ĐUP | ≤ 06 tháng/lần | Gọi kiểm tra thực tế |
| Kịch bản KB-03, KB-04, KB-05 (hệ thống thông tin và dữ liệu) | ≤ 12 tháng/lần | Mô phỏng có kiểm chứng phục hồi thật |

Một lần **kích hoạt thật** có ghi nhật ký đầy đủ và có biên bản rút kinh nghiệm được tính thay cho một lần diễn tập của kịch bản tương ứng.

#### 6.4.3. Kiểm chứng phục hồi dữ liệu

| Bước | Nội dung thực hiện | Trách nhiệm | Chu kỳ | Biểu mẫu |
|---|---|---|---|---|
| 1 | Phục hồi bản sao lưu **vào môi trường kiểm thử tách biệt** | QTHT | ≤ 06 tháng với dữ liệu của quá trình Trọng yếu cao · ≤ 12 tháng với dữ liệu còn lại | F31.03 |
| 2 | Xác nhận dữ liệu **đọc được, đúng và đủ**; đo **thời gian phục hồi thực tế** để đối chiếu RTO | QLCL hoặc PT.ATTT (**≠ người thực hiện**) | Cùng lần | F31.03 |
| 3 | Lập KPH theo **ETV.P13** và báo cáo LĐV nếu kết quả **Không đạt** | QLCL | **03 ngày làm việc** | F31.03 |

#### 6.4.4. Kết luận diễn tập

Mỗi diễn tập kết thúc bằng biên bản ghi: mục tiêu, diễn biến, **thời gian khôi phục thực tế so với RTO**, **lượng dữ liệu mất thực tế so với RPO**, điểm chưa đạt, hành động cải tiến kèm người chịu trách nhiệm và thời hạn.

Diễn tập cho kết quả **vượt RTO hoặc RPO** → bắt buộc lập KPH theo ETV.P13 và cập nhật lại kế hoạch, hoặc điều chỉnh giá trị RTO/RPO có phê duyệt của LĐV. **Nghiêm cấm** âm thầm nới lỏng mục tiêu để hợp thức hoá kết quả.

### 6.5. Kích hoạt và ứng phó

#### 6.5.1. Phân mức gián đoạn và thẩm quyền kích hoạt

| Mức | Tiêu chí | Thẩm quyền kích hoạt | Thời hạn thông báo |
|---|---|---|---|
| **Mức A** | Gián đoạn trong một phòng, dự kiến khắc phục trong RTO, không ảnh hưởng khách hàng | LĐP (báo cáo QLCL) | Trong ngày làm việc |
| **Mức B** | Gián đoạn ảnh hưởng ≥ 02 phòng, hoặc ảnh hưởng cam kết với khách hàng, hoặc dự kiến vượt RTO | **LĐV** theo đề nghị của CHUP | Ngay khi xác định, không quá **04 giờ** |
| **Mức C** | Gián đoạn ảnh hưởng quá trình Trọng yếu cao; hoặc ảnh hưởng hiệu lực kết quả đã/đang phát hành; hoặc ảnh hưởng điều kiện duy trì phạm vi công nhận/chỉ định; hoặc mất dữ liệu vượt RPO | **LĐV** | **Ngay lập tức** |

#### 6.5.2. Trình tự ứng phó

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | **Phát hiện, báo cáo** LĐP/CHUP ngay; mô tả hiện tượng, thời điểm, phạm vi ảnh hưởng | NTH | F31.04 |
| 2 | **Đánh giá sơ bộ**, phân mức theo mục 6.5.1, mở nhật ký gián đoạn | CHUP | F31.04 |
| 3 | **Quyết định kích hoạt** kế hoạch; chỉ định phương án áp dụng | LĐP (Mức A) · **LĐV** (Mức B, C) | F31.04 |
| 4 | **Thực hiện** các bước của phương án; ghi nhật ký liên tục theo mốc thời gian | ĐUP | F31.02 · F31.04 |
| 5 | **Cập nhật tình hình** cho LĐV: Mức C ≤ 04 giờ/lần, Mức B ≤ 01 ngày/lần | CHUP | F31.04 |
| 6 | **Thông báo bên ngoài** theo mục 6.5.4 | QLCL, LĐV | F31.04 |
| 7 | **Đề nghị trở lại bình thường** khi đạt tiêu chí kết thúc | CHUP | F31.04 |
| 8 | **Rà soát hiệu lực công việc** trong thời gian gián đoạn (mục 6.6.2) | QLCL, LĐP | F31.04 |
| 9 | **Tuyên bố trở lại bình thường** | **LĐV** | F31.04 |
| 10 | **Rút kinh nghiệm**, lập KPH (nếu có), ghi bài học theo ETV.P26, đóng nhật ký | QLCL | F31.04 |

#### 6.5.3. Nội dung bắt buộc của nhật ký gián đoạn

Thời điểm phát hiện · thời điểm kích hoạt · mức gián đoạn · quá trình bị ảnh hưởng · quyết định và người quyết định theo mốc thời gian · nguồn lực huy động · kiểm soát an toàn thông tin bị nới lỏng (nếu có) · thời điểm khôi phục từng quá trình · thời điểm tuyên bố trở lại bình thường.

Nhật ký được ghi **liên tục trong khi ứng phó**, không được lập lại sau khi sự việc kết thúc. Khi ManLab không khả dụng, ghi trên bản giấy và nhập bù trong **03 ngày làm việc** kể từ khi hệ thống trở lại, **giữ nguyên bản giấy làm hồ sơ gốc**.

#### 6.5.4. Nghĩa vụ thông báo trong thời gian gián đoạn

| Trường hợp | Đầu mối | Thời hạn |
|---|---|---|
| Gián đoạn ảnh hưởng tiến độ, phạm vi hoặc cách thức thực hiện dịch vụ đã ký kết | Khách hàng (ETV.P07) | Ngay khi xác định ảnh hưởng |
| Gián đoạn ảnh hưởng hiệu lực kết quả, chứng chỉ đã phát hành | Khách hàng và bên nhận kết quả (ETV.P10, ETV.P11) | Theo quyết định của LĐV, sau khi ETV.P10 kết luận |
| Viện tạm thời **không còn đáp ứng điều kiện** đã đăng ký, đã chỉ định | Cơ quan quản lý nhà nước có thẩm quyền | Theo quy định pháp luật hiện hành |
| Gián đoạn ảnh hưởng điều kiện duy trì phạm vi công nhận | Tổ chức công nhận (BoA) | Theo quy định của tổ chức công nhận |
| Gián đoạn là sự cố an toàn thông tin thuộc diện phải báo cáo | Theo ETV.P28 | Theo ETV.P28 |
| Gián đoạn gây vi phạm dữ liệu cá nhân | Theo NĐ 13/2023/NĐ-CP và ETV.P28 | Theo quy định pháp luật hiện hành |

Không cá nhân nào được tự phát ngôn hoặc cung cấp thông tin về gián đoạn ra bên ngoài khi chưa được **LĐV** cho phép.

### 6.6. Trở lại bình thường

#### 6.6.1. Điều kiện

Chỉ tuyên bố trở lại bình thường khi **đồng thời**: nguyên nhân gián đoạn đã được xử lý hoặc kiểm soát; các quá trình đã khôi phục về mức hoạt động thông thường; kiểm soát an toàn thông tin bị nới lỏng đã được khôi phục nguyên trạng; dữ liệu phát sinh trong thời gian dự phòng đã được nhập đủ vào hệ thống chính thức và đối chiếu; và đã hoàn tất rà soát tại mục 6.6.2.

#### 6.6.2. Rà soát hiệu lực công việc thực hiện trong thời gian gián đoạn

Đây là **bước bắt buộc, không được bỏ qua**. QLCL chủ trì cùng LĐP liên quan rà soát:

| TT | Nội dung rà soát | Xử lý khi có nghi ngờ |
|---|---|---|
| 1 | Phép đo thực hiện trên thiết bị dự phòng hoặc trong điều kiện môi trường ngoài quy định | Kích hoạt **ETV.P10**; chưa kết luận thì **không phát hành** kết quả liên quan |
| 2 | Kết quả đã phát hành trong thời gian gián đoạn | Rà soát theo **ETV.P11**; thu hồi hoặc phát hành lại nếu cần, theo quyết định của LĐV |
| 3 | Phép thử chuyển cho nhà thầu phụ | Kiểm tra năng lực và phạm vi công nhận của nhà thầu phụ (ETV.P06); ghi rõ trên báo cáo kết quả theo ETV.P11 |
| 4 | Công việc do người thay thế thực hiện | Kiểm tra phạm vi uỷ quyền và hồ sơ năng lực (ETV.P03) |
| 5 | Dữ liệu nhập bù từ bản giấy | Đối chiếu **100%** với bản gốc đối với dữ liệu của quá trình Trọng yếu cao |
| 6 | Mẫu, chất chuẩn bảo quản trong điều kiện không đạt | Đánh giá theo ETV.P09, ETV.P19; hủy hoặc lấy lại mẫu nếu không bảo đảm |

Công việc không đủ độ tin cậy được xử lý theo **ETV.P13** và, nếu là công việc không phù hợp theo ISO/IEC 17025 §7.10, theo quy định tương ứng của **ETV.P11**.

#### 6.6.3. Rút kinh nghiệm

Trong **15 ngày làm việc** kể từ khi tuyên bố trở lại bình thường, QLCL tổ chức họp rút kinh nghiệm và lập biên bản gồm: diễn biến; thời gian khôi phục thực tế so với RTO/RPO; điều gì trong kế hoạch đã đúng, điều gì sai hoặc thiếu; hành động cải tiến kèm người chịu trách nhiệm và thời hạn.

Gián đoạn **Mức B, Mức C** bắt buộc lập **bài học kinh nghiệm** theo ETV.P26 và cập nhật lại kế hoạch (F31.02); việc cập nhật kế hoạch thuộc diện thay đổi tài liệu, thực hiện theo ETV.P14 và ETV.P30.

### 6.7. Hỗ trợ của trợ lý AI

Trợ lý AI trên ManLab được phép: nhắc phương án quá hạn diễn tập và quá hạn kiểm chứng phục hồi; đối chiếu danh sách quá trình trọng yếu với tài sản thông tin (ETV.P27) và nền tảng số (ETV.P35) để phát hiện phụ thuộc chưa có phương án; soạn dự thảo biên bản diễn tập và tổng hợp nhật ký theo mốc thời gian.

Giới hạn của AI xem mục 5.3 (ETV.P29).

### 6.8. Báo cáo và xem xét

QLCL tổng hợp **06 tháng/lần** và trước mỗi cuộc họp xem xét của lãnh đạo (ETV.P17): danh sách quá trình trọng yếu và giá trị MTPD/RTO/RPO hiện hành; số lần kích hoạt kế hoạch theo mức, thời gian khôi phục thực tế so với RTO; kết quả diễn tập trong kỳ và tỷ lệ đạt; kết quả kiểm chứng phục hồi; phương án đang ở cờ **Chưa kiểm chứng**; điểm không thể phục hồi còn tồn tại; hành động cải tiến sau gián đoạn và tình trạng thực hiện.

---

## VII. BIỂU MẪU ÁP DỤNG

| Mã biểu mẫu | Tên biểu mẫu | Nơi lưu bản gốc |
|---|---|---|
| **ETV.P.F 31.01** | Phân tích tác động nghiệp vụ (BIA) | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 31.02** | Kế hoạch duy trì liên tục hoạt động | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 31.03** | Kế hoạch, biên bản diễn tập và kiểm chứng phục hồi | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 31.04** | Phiếu kích hoạt và nhật ký gián đoạn | `06_SHARED_RESOURCES/01_Forms/` |

Hồ sơ đào tạo và uỷ quyền người thay thế sử dụng bộ biểu mẫu của ETV.P03; hồ sơ đánh giá nhà cung cấp thay thế sử dụng bộ biểu mẫu của ETV.P06; phiếu sự cố an toàn thông tin sử dụng biểu mẫu ETV.P.F 28.03; phiếu hành động khắc phục sử dụng biểu mẫu của ETV.P13 — **không** lập biểu mẫu mới ở thủ tục này (nguyên tắc một nơi duy nhất, ETV.P14).

---

## VIII. LƯU HỒ SƠ

Việc lập, lưu giữ, bảo quản, tra cứu, phân quyền truy cập và thanh lý hồ sơ thực hiện theo **ETV.P15 – Kiểm soát hồ sơ**; thời hạn lưu và phân quyền chi tiết theo **ETV.P.F 14.06 (Danh mục phân quyền và thời hạn lưu)**. Thủ tục này **không** quy định lại cơ chế lưu trữ, chỉ đăng ký các hồ sơ phát sinh và thời hạn đề xuất để cập nhật vào danh mục đó.

| Hồ sơ | Người lưu | Thời hạn lưu đề xuất |
|---|---|---|
| Phân tích tác động nghiệp vụ (F31.01) và các phiên bản | QLCL | Vĩnh viễn trên ManLab |
| Kế hoạch duy trì liên tục hoạt động (F31.02) và các phiên bản | QLCL | Vĩnh viễn trên ManLab |
| Bản ngoại tuyến của kế hoạch (bản in) | QLCL, CHUP | Thay thế khi có phiên bản mới; hủy bản cũ có kiểm soát theo ETV.P14 |
| Kế hoạch, biên bản diễn tập và kiểm chứng phục hồi (F31.03) | QLCL | 05 năm |
| Phiếu kích hoạt và nhật ký gián đoạn (F31.04), kể cả **bản giấy gốc** | QLCL | 10 năm |
| Biên bản rút kinh nghiệm sau gián đoạn | QLCL | 10 năm |
| Hồ sơ rà soát hiệu lực công việc trong thời gian gián đoạn | QLCL | Theo thời hạn lưu hồ sơ kỹ thuật tương ứng (ETV.P15) |
| Bằng chứng thông báo khách hàng, cơ quan quản lý, tổ chức công nhận | QLCL | 10 năm |
| Hồ sơ phê duyệt nới lỏng kiểm soát an toàn thông tin | PT.ATTT, sao gửi QLCL | Theo ETV.P28 |
| Báo cáo liên tục hoạt động phục vụ xem xét của lãnh đạo | QLCL | Theo ETV.P17 |

---

## IX. CÁC PHỤ LỤC

### Phụ lục I — Ma trận kiểm soát rủi ro và điều kiện chặn cứng

*(Dẫn chiếu từ mục 6.1.3, 6.3.2, 6.4.3 và 6.6.1. Hệ thống ManLab thực thi các điều kiện này bằng ràng buộc kỹ thuật.)*

| TT | Tình huống | Xử lý |
|---|---|---|
| 1 | Quá trình xếp hạng **Trọng yếu cao** không có phương án dự phòng trong F31.02 | **Chặn phê duyệt** kết quả BIA |
| 2 | Phương án dự phòng **không có RTO/RPO bằng số** hoặc **RTO ≥ MTPD** | **Không cho lưu** |
| 3 | Phương án **quá hạn diễn tập** | Gắn cờ **Chưa kiểm chứng**; **không** được viện dẫn làm bằng chứng liên tục hoạt động cho ETV.P28, ETV.P35 và cho đánh giá bên ngoài |
| 4 | **Sao lưu chưa từng kiểm chứng phục hồi** được ghi là phương án khôi phục | **Không chấp nhận** |
| 5 | Người thực hiện phục hồi đồng thời là người xác nhận kết quả kiểm chứng | **Chặn cứng** |
| 6 | Kiểm chứng phục hồi **Không đạt** mà không lập KPH theo ETV.P13 trong 03 ngày làm việc | Cảnh báo LĐV |
| 7 | Diễn tập **vượt RTO/RPO** mà xử lý bằng cách âm thầm nới lỏng RTO/RPO thay vì lập KPH | **Không chấp nhận**; mọi điều chỉnh RTO/RPO phải có phê duyệt của LĐV kèm lý do |
| 8 | **Nới lỏng kiểm soát an toàn thông tin** trong gián đoạn mà không có phê duyệt của LĐV, không có thời hạn, không ghi nhật ký | Vi phạm nghiêm trọng; xử lý theo ETV.P28 và ETV.P13 |
| 9 | Kiểm soát an toàn thông tin đã nới lỏng **không được khôi phục nguyên trạng** trước khi tuyên bố trở lại bình thường | **Chặn tuyên bố trở lại bình thường** |
| 10 | Khôi phục dữ liệu **vào hệ thống chưa được xác nhận sạch** sau sự cố xâm nhập (KB-05) | **Cấm tuyệt đối** (ETV.P28) |
| 11 | Tuyên bố **trở lại bình thường** khi chưa hoàn tất rà soát hiệu lực công việc theo mục 6.6.2 | **Chặn thao tác** |
| 12 | **Phát hành kết quả** thực hiện trong thời gian gián đoạn khi ETV.P10 chưa kết luận về độ tin cậy | **Không chấp nhận** |
| 13 | Nhật ký gián đoạn **lập lại sau khi sự việc kết thúc** thay vì ghi liên tục | **Không được chấp nhận làm bằng chứng** |
| 14 | Gián đoạn **Mức B, Mức C** đóng mà chưa lập bài học kinh nghiệm theo ETV.P26 | **Chặn thao tác đóng** |
| 15 | Gián đoạn làm Viện **tạm thời không đáp ứng điều kiện đã đăng ký, đã chỉ định** mà không báo cáo LĐV ngay để xử lý nghĩa vụ thông báo | Vi phạm nghiêm trọng |
| 16 | Kế hoạch **không có bản ngoại tuyến** hoặc bản ngoại tuyến cũ hơn phiên bản hiệu lực | Cảnh báo QLCL; quá 30 ngày → báo cáo LĐV |
| 17 | BIA **quá 12 tháng chưa rà soát** | Cảnh báo LĐV; đưa vào báo cáo xem xét của lãnh đạo |
| 18 | Trợ lý AI quyết định kích hoạt, kết luận hiệu lực kết quả, xác nhận kiểm chứng phục hồi hoặc tự thao tác khôi phục | **Cấm tuyệt đối** |

### Phụ lục II — Bảng trạng thái và thẩm quyền thao tác

*(Dẫn chiếu từ mục 6.3 và 6.5. Tên trạng thái hồ sơ tuân theo bộ trạng thái chuẩn tại ETV.P14 và `M14_TaiLieu/07_Workflow/StateMachine.md`.)*

**II.1. Kế hoạch duy trì liên tục hoạt động (F31.02)**

| TT | Trạng thái | Ý nghĩa | Người thao tác | Bắt buộc lý do |
|---|---|---|---|---|
| 1 | Nháp | Đang soạn | QLCL, LĐP | Không |
| 2 | Chờ soát xét | Chờ kiểm tra tính khả thi | QLCL | Không |
| 3 | Không soát xét | Bị trả lại để sửa | LĐP/PT.ATTT (≠ người lập) | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | QLCL | Không |
| 5 | Không phê duyệt | Bị trả lại để sửa | LĐV | **Có** |
| 6 | Đã phê duyệt | Đang áp dụng | LĐV | Không |
| 7 | Hết hiệu lực/Hủy | Bị thay thế bởi phiên bản mới | LĐV (tự động khi phiên bản mới có hiệu lực) | **Có** |

Cờ **Chưa kiểm chứng** (quá hạn diễn tập theo mục 6.4.2) và cờ **Quá hạn kiểm chứng phục hồi** (mục 6.4.3) không phải trạng thái hồ sơ, mà là cảnh báo. Phương án mang cờ **Chưa kiểm chứng** vẫn ở trạng thái Đã phê duyệt nhưng **không** được viện dẫn làm bằng chứng đáp ứng yêu cầu liên tục hoạt động.

**II.2. Trạng thái ứng phó (không phải trạng thái hồ sơ)**

| Trạng thái | Ý nghĩa | Người quyết định |
|---|---|---|
| Bình thường | Không có gián đoạn đang xử lý | — |
| Theo dõi | Có dấu hiệu gián đoạn, chưa vượt ngưỡng kích hoạt | CHUP |
| Đang ứng phó – Mức A | Gián đoạn cục bộ trong một phòng | LĐP |
| Đang ứng phó – Mức B | Gián đoạn liên phòng hoặc ảnh hưởng khách hàng | LĐV |
| Đang ứng phó – Mức C | Gián đoạn quá trình trọng yếu cao hoặc ảnh hưởng hiệu lực kết quả | LĐV |
| Đang khôi phục | Đã kiểm soát nguyên nhân, đang đưa về vận hành thông thường | CHUP |
| Trở lại bình thường | Đã hoàn tất rà soát theo mục 6.6.2 | **LĐV** |

**II.3. Các đối tượng khác**

| Đối tượng | Chuỗi trạng thái | Thẩm quyền kết thúc |
|---|---|---|
| Phân tích tác động nghiệp vụ (F31.01) | Nháp → Chờ soát xét → Chờ phê duyệt → Đã phê duyệt / Không phê duyệt | LĐV |
| Biên bản diễn tập và kiểm chứng (F31.03) | Nháp → Chờ kết luận → Đạt / Không đạt | QLCL (diễn tập) · LĐV (khi Không đạt ở quá trình Trọng yếu cao) |
| Nhật ký gián đoạn (F31.04) | Mới → Đang ứng phó → Đang khôi phục → Chờ rà soát hiệu lực → Đã đóng | **LĐV** |

Mọi nhánh **Không phê duyệt**, **Không soát xét**, **Không đạt**, **Hết hiệu lực/Hủy** bắt buộc ghi lý do.
