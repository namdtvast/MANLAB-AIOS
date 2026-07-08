---
title: "Đo lường & hiệu chuẩn thiết bị quan trắc nước"
type: Wiki-Topic
status: Da-bien-soan
source_raw: "08_KNOWLEDGE_GRAPH/00_RAW_DATA/0.9.x (đã di chuyển)"
source_now: "08_KNOWLEDGE_GRAPH/14_Technical_References/04_Nuoc/"
file_count: 197
last_updated: "08/07/2026"
---

# Đo lường & hiệu chuẩn thiết bị quan trắc nước

← [Wiki/index.md](index.md)

## Tóm tắt

197 file trên 14 thư mục con (đã bỏ 1 thư mục rỗng `Cuvet`), tài liệu kỹ thuật/SOP hiệu chuẩn cho các thông số đo nước phổ biến nhất tại PTN môi trường. Tạo thư mục đích mới `14_Technical_References/04_Nuoc/`. Đối xứng với cụm [Đo lường không khí](Do-luong-khong-khi/README.md) đã hoàn thiện — cùng kiểu tổ chức theo thông số đo.

## Danh sách theo thông số

| Thông số | Thư mục | Số file | Ghi chú |
|---|---|---|---|
| Chung/tổng hợp | `Nuoc_ChungTuNguoiDung/` | 59 | Lớn nhất — gồm 2 thư mục con `Form/`, `General/`; có SOP hiệu chuẩn máy đo độ dẫn (sension5), báo cáo tần suất hiệu chuẩn pipet, "Ketqua HC.pdf" (kết quả hiệu chuẩn thực tế) |
| UV-VIS | `UV_VIS/` | 33 | Thứ 2 lớn nhất — thư mục con `Tham khao/`; gồm bài báo khoa học thẩm định phương pháp quang phổ UV-Vis (assay paracetamol — ví dụ minh hoạ phương pháp, không phải môi trường), tài liệu tổng quan UV |
| NO3⁻ (nitrat) | `NO3/` | 22 | Chủ yếu tài liệu hãng: Hanna (HI 96728C), DOC316.53.01239 (Hach) — máy đo nitrat cầm tay/để bàn |
| COD | `COD/` | 17 | EPA Method COD, phương pháp Thermo (đun + đo hấp thụ quang của Crom), thiết bị UV-VIS đo COD/TSS trong nước thải |
| DO (oxy hoà tan) | `DO_OxyHoaTan/` | 15 | EPA Method 3601 (điện cực màng), so sánh liên phòng DO, bảng tính độ không đảm bảo đo (`DO_Uncertainty.xls`) |
| pH | `pH/` | 10 | QTHC_pH (quy trình hiệu chuẩn), hiệu chuẩn pH hiện trường, phương trình Nernst (điện cực điện hoá), thư mục con `Ly thuyet bu nhiet/` (lý thuyết bù nhiệt độ khi đo pH) |
| Pipet hút mẫu | `PipetHutMau/` | 10 | Trùng 1 file (`I-CAL-GUI-019`) với cụm [Đo lường vật lý](Do-luong-vat-ly.md); có bảng kiểm tra thực tế pipet 50/200/1000/5000ml |
| TOC | `TOC/` | 12 | SOP hiệu chuẩn máy 5000 TOCi, Standard Methods TOC, tầm quan trọng của hiệu chuẩn/xác minh hệ TOC |
| Độ đục | `DoDuc/` | 7 | So sánh thiết bị đo độ đục (turbidimeter), chương EPA về đo độ đục, `QAM-I-111rev7condmeter.pdf` (trùng tên file với thư mục EC — khả năng đặt nhầm, cần xác minh) |
| EC (độ dẫn điện) | `EC_DoDanDien/` | 6 | Lý thuyết đo EC, hướng dẫn kỹ thuật (`techwet_GuidelineTechnical.pdf`), cùng file `QAM-I-111rev7condmeter.pdf` nêu trên |
| TSS | `TSS/` | 2 | Phương pháp xác định cặn lơ lửng, giới thiệu hiệu chuẩn TSS |
| Trạm nước | `TramNuoc/` | 2 | Catalogue hãng WTW (trạm quan trắc nước tự động online) |
| TDS | `TDS/` | 1 | 1 file duy nhất, chưa đọc |
| AAS | `AAS/` | 1 | Quang phổ hấp thụ nguyên tử — 1 file tiếng Việt |

## Vấn đề phát hiện, chưa xử lý

- `QAM-I-111rev7condmeter.pdf` xuất hiện **trùng tên ở cả `DoDuc/` và `EC_DoDanDien/`** — tên file gợi ý về máy đo độ dẫn (condmeter), nên khả năng cao bị đặt nhầm trong `DoDuc/`, cần xác minh nội dung.
- Bài báo UV-Vis về "assay paracetamol tablet" trong `UV_VIS/` không thuộc lĩnh vực môi trường/nước — khả năng chỉ dùng minh hoạ phương pháp thẩm định, không phải tài liệu chuyên môn của ETV.
- Thư mục `TDS/` và `AAS/` chỉ có 1 file, chưa đọc nội dung để xác nhận.
- Toàn bộ cụm dựa trên khảo sát tên file/cấu trúc thư mục, chưa đọc sâu nội dung từng tài liệu.

## Nguồn dữ liệu

`00_RAW_DATA/0. 9. Nuoc/`, `0. 9.0. Do duc/`, `0. 9.0. pH/`, `0. 9.1. DO/`, `0. 9.1. TSS/`, `0. 9.10. EC/`, `0. 9.11. TDS/`, `0. 9.2. NO3-/`, `0. 9.3. TOC/`, `0. 9.4. UV/`, `0. 9.5. Pipet hut mau/`, `0. 9.7. COD/`, `0. 9.8. AAS/`, `0. 9.9 Tram nuoc/` (cũ) → đã chuyển tới `14_Technical_References/04_Nuoc/`. Thư mục `0. 9.6. Cuvet/` rỗng, đã xoá (không có nội dung để mất).

## Chủ đề liên quan

- [Do-luong-khong-khi/README.md](Do-luong-khong-khi/README.md) — cấu trúc song song, cùng kiểu tổ chức theo thông số đo.
- [Do-luong-vat-ly.md](Do-luong-vat-ly.md) — trùng 1 tài liệu hiệu chuẩn pipet (`I-CAL-GUI-019`).
- [TCVN.md](TCVN.md) — nhiều TCVN (BOD, COD, pH, DO, SS, nitrat, độ đục...) là căn cứ phương pháp chính thức cho các thông số trong cụm này.
