---
title: "Đo lường & hiệu chuẩn thiết bị quan trắc không khí"
type: Wiki-Topic
status: Da-bien-soan
source_raw: "08_KNOWLEDGE_GRAPH/00_RAW_DATA (nhóm 1.1–1.8, đã di chuyển)"
source_now: "08_KNOWLEDGE_GRAPH/14_Technical_References/01_KhongKhi/"
last_updated: "08/07/2026"
---

# Đo lường & hiệu chuẩn thiết bị quan trắc không khí

Cụm chủ đề tổng hợp tài liệu kỹ thuật, tiêu chuẩn và SOP liên quan đến đo lường/hiệu chuẩn các thông số quan trắc chất lượng không khí (khí xung quanh và khí thải nguồn tĩnh). Đây là cụm thí điểm đầu tiên khi dựng Wiki từ `00_RAW_DATA`.

**Nguồn:** 129 file trên 9 thư mục con của `00_RAW_DATA` (đánh số 1.1–1.8 trong hệ thống phân loại cũ). Toàn bộ đã được di chuyển sang [`14_Technical_References/01_KhongKhi/`](../../14_Technical_References/01_KhongKhi/), giữ nguyên tên file gốc.

## Các thông số / chủ đề con

| Chủ đề | Trang Wiki | Số file | Nội dung chính |
|---|---|---|---|
| Ozone (O₃) | [Ozone.md](Ozone.md) | 9 | Hiệu chuẩn máy đo ozone bằng quang phổ UV (ASTM D5110, phương pháp EPA) |
| BTEX / VOC | [BTEX-VOC.md](BTEX-VOC.md) | 10 | Lấy mẫu & phân tích hợp chất hữu cơ bay hơi (ISO 16017, BS EN, BS ISO 16000-6) |
| CEMS (quan trắc khí thải liên tục) | [CEMS.md](CEMS.md) | 81 | Quy định CEMS (40 CFR Part 60/75), RATA, CGA, tài liệu hãng (ABB, Dr. Fosdisch...) |
| DOAS (quang phổ hấp thụ vi sai) | [DOAS.md](DOAS.md) | 2 | Nguyên lý DOAS — sách chuyên khảo + slide kỹ thuật |
| NOx & SO2 | [NOx-SO2.md](NOx-SO2.md) | 11 | Đo lưu huỳnh dioxit (TCVN 5976-1995/ISO 7935), SOP UV huỳnh quang |
| HC vòng quay (tốc độ vòng quay) | [HC-VongQuay.md](HC-VongQuay.md) | 8 | Quy trình hiệu chuẩn tốc độ vòng quay, tài liệu thiết bị 461895 |
| Khí cầm tay | [Khi-CamTay.md](Khi-CamTay.md) | 6 | Hiệu chuẩn máy đo khí cầm tay/máy phát khí chuẩn di động (OSHA) |
| Barometer (khí áp kế) | [Barometer.md](Barometer.md) | 2 | Lý thuyết & thực hành hiệu chuẩn khí áp kế (JMA/WMO) |

## Nhận xét chung (rút ra từ khảo sát)

- Phần lớn tài liệu là **tiêu chuẩn/SOP nước ngoài** (ASTM, EPA, ISO, BS EN, cơ quan bang của Mỹ, JMA/WMO) và **tài liệu hãng thiết bị** (catalogue, product information — đặc biệt nhóm CEMS có nhiều file từ ABB và "Dr. Fosdisch"). Chỉ một số ít là tiêu chuẩn Việt Nam (TCVN 5976-1995 trong nhóm SO2).
- Chủ đề CEMS là chủ đề lớn nhất (81/129 file — 63%) và có cấu trúc thư mục con phức tạp nhất (theo hãng/nguồn cung cấp: ABB, Dr. Fosdisch, CKY Đài Loan, Malaysia, RATA) — xem chi tiết tại [CEMS.md](CEMS.md).
- Chưa đủ dữ liệu để khẳng định các tài liệu này đã được ETV áp dụng chính thức trong SOP nội bộ nào (không có liên kết ngược tới `03_MANAGEMENT_SYSTEM/03_M` trong dữ liệu Raw).

## Chủ đề liên quan

- [03_MANAGEMENT_SYSTEM/03_M](../../../03_MANAGEMENT_SYSTEM/03_M/) — nơi lưu SOP/phương pháp hiệu chuẩn chính thức của ETV (nếu có SOP dựa trên các tài liệu này, nên trỏ liên kết ngược tại đây).
- Cụm "Đo lường khác" (nước, khối lượng, nhiệt, tiếng ồn...) trong `00_RAW_DATA` — chưa triển khai Wiki, xem [Wiki/index.md](../index.md).
