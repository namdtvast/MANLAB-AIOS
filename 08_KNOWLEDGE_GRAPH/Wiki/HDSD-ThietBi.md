---
title: "HDSD Thiết bị — Hướng dẫn sử dụng, vận hành thiết bị quan trắc"
type: Wiki-Topic
status: Da-bien-soan-so-bo
source_raw: "08_KNOWLEDGE_GRAPH/00_RAW_DATA/4. HDSD (đã di chuyển)"
source_now: "08_KNOWLEDGE_GRAPH/15_HDSD_ThietBi/"
file_count: 2328
last_updated: "08/07/2026"
---

# HDSD Thiết bị — Hướng dẫn sử dụng, vận hành thiết bị quan trắc

← [Wiki/index.md](index.md)

## Đã xoá phần lớn gói phần mềm/log lẫn trong "5.310 file" ban đầu

Khi khảo sát cấu trúc, phát hiện **~2.982 file (56%) thực chất là gói cài đặt phần mềm và log dữ liệu thô của thiết bị, không phải tài liệu/hướng dẫn sử dụng**. Theo yêu cầu người dùng ("không cần dùng"), đã **xoá khỏi ổ đĩa** (không chỉ khỏi git) — xem chi tiết tại [change-log.md](../change-log.md):

- `3. Luu luong_Khi/0. ISOKINETIC/ESC A-2000/A2000 phan men/` — **1.958 file, đã xoá** (332MB): bộ cài đặt phần mềm driver National Instruments FieldPoint. Trước khi xoá đã kiểm tra kỹ: ~216 file trong đó thực ra là tài liệu thật (sổ tay FieldPoint đa ngôn ngữ, chứng chỉ hiệu chuẩn A2000/Venturi) — đã xoá cùng theo xác nhận tường minh của người dùng, không phải xoá nhầm.
- `2. Khi/3. Tram khong khi xung quanh/Opsis/alibaba5/` — **1.014 file, đã xoá** (64MB): phần mềm/log dữ liệu vận hành trạm quan trắc Opsis. Có lẫn 19 tài liệu thật (quy trình hiệu chuẩn, lịch bảo trì trạm Lãng Bạc) — cũng đã xoá theo yêu cầu.
- `4. Bui/Phan mem Dynoptic 3xx/` + `.rar` + bản trùng trong `2. Khi/2. Tram khi thai tu dong/1. Bui/` — **10 file, đã xoá** (23MB): phần lớn (7/10) thực ra là manual PDF thật (Installation/Commissioning/Operators Manual), chỉ 2 file `.exe` là cài đặt — cũng đã xoá cùng theo yêu cầu.

→ **Còn lại 2.328 file trong `15_HDSD_ThietBi/`**, toàn bộ là tài liệu/catalogue thật (không còn phần mềm/log đã gắn cờ).

## Danh mục theo nhóm thiết bị (chỉ nhóm có nội dung tài liệu thật)

| Nhóm | Số file | Ghi chú |
|---|---|---|
| `2. Khi/3. Tram khong khi xung quanh/` | 182 (sau khi xoá `Opsis/alibaba5`) | Ecotech (82), Teledyne (36), Horiba (18), "Tram khi Vinh Phuc" (16 — dữ liệu trạm cụ thể), Envea (9), Gamma, AQMS AIC Quảng Ninh, Aeroqual |
| `2. Khi/1. Khi thai cam tay/` | 412 | Lancom Series 2 (239 — lớn nhất), IMR (74), Testo (14), ENVEA (8), E Instrument (8), Wöhler (6), khí cháy LEL (5), Gasmet (5), Dräger (5) |
| `1. Nuoc/2. Huong dan su dung, van hanh/` | 448 | HDSD chung cho thiết bị đo nước |
| `1. Nuoc/3. Tram nuoc/` | 173 | Trạm quan trắc nước tự động |
| `1. Nuoc/4. PP phan tich chi tieu trong nuoc/` | 124 | Phương pháp phân tích các chỉ tiêu nước |
| `1. Nuoc/0. MSDS/` | 31 | Bảng chỉ dẫn an toàn hoá chất (Material Safety Data Sheet) |
| `4. Bui/` | 143 (sau khi xoá `Phan mem Dynoptic 3xx`) | Thermo (49), Grimm (45), Casella (19), DustTrak (15 + 3 "TSI-dustrack"), PCME (3), MetOne (2) |
| `Testo Catalogues/` | 83 | Catalogue hãng Testo (đa dạng thiết bị đo) |
| `Tai lieu_Formosa Ha Tinh/`, `AIC_Hung Yen, Hai Duong 2020/` | 9 + 9 | Tài liệu gắn với dự án/khách hàng cụ thể (tương tự lưu ý ở [Performance-Test.md](Performance-Test.md) — cần xác nhận có phải dữ liệu dự án riêng hay tài liệu tham khảo chung) |
| `18. May chuan do dien the/` | 31 | Máy chuẩn đo điện thế |
| `22. Datalogger/` | 39 | Thiết bị ghi dữ liệu tự động |
| `13. Nhiet am/` | 19 | Thiết bị đo nhiệt độ/độ ẩm |
| `9. UV-Vis/` | 18 | Máy quang phổ UV-Vis |
| `8. Do On/` | 16 | Thiết bị đo tiếng ồn |
| `6. Vi khi hau/`, `23. TB khi thai/` | 12 + 12 | Vi khí hậu; thiết bị khí thải |
| `20. Ap suat/`, `12. Toc do gio/` | 10 + 10 | Áp suất; tốc độ gió |
| `Tram KKXQ thermo/` | 9 | Trạm không khí xung quanh hãng Thermo |
| `0. From KH_Quy trinh Van hanh/` | 8 | Quy trình vận hành từ khách hàng (KH) — có thể là tài liệu do khách hàng cung cấp, không phải HDSD gốc của hãng |
| `14. Barometer/` | 7 | Khí áp kế — liên quan [Do-luong-khong-khi/Barometer.md](Do-luong-khong-khi/Barometer.md) |
| `GCMS/`, `5. Tu nhiet/`, `11. Khoi luong/` | 6 mỗi nhóm | Sắc ký khối phổ; tủ nhiệt; khối lượng |
| `24. TB Nhom 1_TTDK XCG/` | 4 | Thiết bị nhóm 1 — trung tâm đăng kiểm xe cơ giới |
| `16. Toc do vong quay/`, `15. Muc nuoc/`, `10. Bo pha loang/` | 3 mỗi nhóm | Tốc độ vòng quay (liên quan [HC-VongQuay.md](Do-luong-khong-khi/HC-VongQuay.md)); mực nước; bộ pha loãng |
| `Can/` | 2 | Cân |
| `Sac ky/`, `AIC Quang Ninh/`, `AAS/`, `7. TB tu ghi/`, `19. May do rung/` | 1 mỗi nhóm | Sắc ký; dự án AIC Quảng Ninh; AAS; thiết bị tự ghi; máy đo rung |

## Vấn đề phát hiện, chưa xử lý

- Phần mềm/log đã xử lý xong (xoá) — xem mục trên và [change-log.md](../change-log.md).
- `Tai lieu_Formosa Ha Tinh/`, `AIC_Hung Yen, Hai Duong 2020/`, `0. From KH_Quy trinh Van hanh/`, `Tram khi Vinh Phuc/` — nghi là tài liệu/dữ liệu gắn với khách hàng hoặc trạm cụ thể, không phải HDSD chung của hãng — cần tách khỏi phần "tài liệu tham khảo chung" nếu xác nhận đúng.
- Đây là cụm **duy nhất chưa đọc nội dung bất kỳ file nào kể cả để lấy mẫu** — với quy mô ban đầu 5.310 file, ưu tiên đã dồn vào việc phát hiện vấn đề cấu trúc (phần mềm lẫn vào tài liệu) hơn là đọc nội dung.

## Nguồn dữ liệu

`00_RAW_DATA/4. HDSD/` (cũ) → đã chuyển tới `15_HDSD_ThietBi/` (thư mục đích mới cấp cao nhất, không nằm trong `14_Technical_References` vì đây là loại tài liệu khác biệt: hướng dẫn vận hành/catalogue hãng, không phải tài liệu kỹ thuật tham khảo/tiêu chuẩn).

## Chủ đề liên quan

- [Do-luong-khong-khi/README.md](Do-luong-khong-khi/README.md), [Do-luong-nuoc.md](Do-luong-nuoc.md), [Do-luong-vat-ly.md](Do-luong-vat-ly.md) — HDSD của nhiều hãng thiết bị trong cụm này (Testo, Thermo, Grimm, Horiba, ENVEA...) trùng trực tiếp với các thông số đo đã catalog ở các cụm đó.
- [TLTK-ChuanBui.md](TLTK-ChuanBui.md) — nhóm `4. Bui/` (Grimm, Thermo, DustTrak) liên quan trực tiếp nghiên cứu chuẩn bụi.
