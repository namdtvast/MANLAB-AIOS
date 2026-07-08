---
title: "TLTK Chuẩn Bụi — Nghiên cứu phát triển chuẩn/thiết bị đo bụi"
type: Wiki-Topic
status: Da-bien-soan-so-bo
source_raw: "08_KNOWLEDGE_GRAPH/00_RAW_DATA/TLTK_Chuan Bui (đã di chuyển)"
source_now: "08_KNOWLEDGE_GRAPH/14_Technical_References/07_TLTK_ChuanBui/"
file_count: 788
last_updated: "08/07/2026"
---

# TLTK Chuẩn Bụi — Nghiên cứu phát triển chuẩn/thiết bị đo bụi

← [Wiki/index.md](index.md)

## Tóm tắt

788 file — **thư viện nghiên cứu cá nhân/dự án lớn nhất trong toàn bộ 00_RAW_DATA sau HDSD**, chủ đề đo lường và hiệu chuẩn bụi/hạt (particulate matter, aerosol). Khác với các cụm khác (vốn là tài liệu tham khảo rời rạc), đây có dấu hiệu rõ ràng là **hồ sơ nghiên cứu & phát triển (R&D) của một dự án cụ thể**: chế tạo/đề xuất chuẩn bụi (dust standard) và/hoặc thiết bị tạo bụi chuẩn tại ETV, dựa trên 2 file mở đầu:
- `0. San pham tham khao_Chuan bui.docx` — khảo sát sản phẩm chuẩn bụi tham khảo trên thị trường
- `1. 2017. De xuat cau hinh_Chuan Bui_PKC.docx` — đề xuất cấu hình "Chuẩn Bụi" (2017, tác giả/dự án viết tắt "PKC")

Đây khả năng là nền tảng nghiên cứu đứng sau **ĐLVN 294:2016 "Chuẩn hàm lượng bụi tổng — Quy trình hiệu chuẩn"** đã ghi nhận trong [DLVN.md](DLVN.md).

## Cấu trúc (đã được tác giả gốc tổ chức theo mã số, giữ nguyên khi di chuyển)

Thư mục gốc dùng tiền tố số để phân nhóm (giữ nguyên, không đổi tên):

| Nhóm | Chủ đề |
|---|---|
| `0.1_ Bai Review/`, `0.2_Hien trang PM/`, `0.3_TCVN, ISO, EN/` | Tổng quan tài liệu, hiện trạng nghiên cứu bụi (PM), tiêu chuẩn liên quan |
| `1.1_Dust_Generator/`, `1.2_Dust_Hat bui Chuan (PSD)/`, `1.3_Dust_Chamber/` | Thiết bị tạo bụi chuẩn, hạt bụi chuẩn (phân bố cỡ hạt — PSD), buồng thử bụi |
| `1.10_Connector/`, `1.10_Giay loc bui (Membrane Filter)/`, `1.10_Impactor Inlet/`, `1.10_Nozzle/` | Linh kiện hệ thống lấy mẫu bụi |
| `1.11_HD_Cac hang/` | Hướng dẫn theo từng hãng thiết bị |
| `2.1_From Toan_Thermo/`, `2.2_From_PALAS/`, `4. From Grimm/`, `4. From OPSIS/`, `3. From 2H_Toa/`, `3. From Binh_Chuan Bui/`, `5. From Cau vang_SA/`, `From CEM NA_Bui/` | Tài liệu/trao đổi kỹ thuật theo từng nguồn cung cấp (Thermo, PALAS, Grimm, OPSIS...) — tên thư mục gồm cả tên người liên hệ nội bộ (Toàn, Bình, Tuấn...) |
| `4. May SMPS/` | Máy đo phân bố cỡ hạt (Scanning Mobility Particle Sizer) |
| `6. Mat phang Lo ra/`, `8. Cycle design/`, `9. Buong Bui cam bien/` | Thiết kế kỹ thuật: mặt phẳng lỗ ra, thiết kế chu trình, buồng cảm biến bụi |
| `12. Certificate PM/`, `12. So sanh KQ_Cac hang/` | Chứng chỉ PM, so sánh kết quả giữa các hãng |
| `13. Phuong phap hieu chuan bui OPC/`, `13. SOP_Xay dung phuong phap/` | Phương pháp hiệu chuẩn máy đếm hạt quang học (OPC), xây dựng SOP |
| `14. Machine Learning/` | Ứng dụng machine learning (khả năng cho hiệu chỉnh/dự đoán cảm biến bụi giá rẻ) |
| `CEMS/`, `Isokinetic/`, `Isokinetic_Image_A-2000/`, `Isokinetic_Image_C5000/` | Liên quan trực tiếp [Do-luong-khong-khi/CEMS.md](Do-luong-khong-khi/CEMS.md) — đo bụi tại nguồn thải |
| `MTLD_Dong Nai/` | Dự án/khách hàng cụ thể tại Đồng Nai (tương tự lưu ý ở [Performance-Test.md](Performance-Test.md) — có thể là dữ liệu dự án, không phải tham khảo chung) |
| `NI_Phan cung/`, `Phan mem_Software/` | Phần cứng National Instruments, phần mềm liên quan |
| `VMI_Chuan bui/` | Tài liệu liên quan Viện Đo lường Việt Nam (VMI) về chuẩn bụi — khả năng liên hệ trực tiếp tới việc công bố/thẩm định chuẩn |
| `Form_Tap chi/` | Mẫu biểu tạp chí (khả năng phục vụ viết bài báo khoa học từ kết quả nghiên cứu) |

## Tài liệu học thuật nổi bật (rời, cấp 1)

- Sách chuyên khảo *Aerosol Measurement: Principles, Techniques, and Applications* (3rd ed., 2011) — đầy đủ + chương 21 dịch tiếng Việt riêng
- 3 luận án/luận văn đầy đủ: `Toan-van-LATS_NCS-Huy_full` (tiến sĩ, trùng file với [Do-luong-vat-ly.md](Do-luong-vat-ly.md) nhóm Tốc độ gió — cần xác minh luận án này về chủ đề gì), `Luan an_Bui nano_Thuy`, `Luan van Tan_Bui Vetinh`
- Bài báo review lớn: Kumar et al. 2010 (Atmospheric Environment), Cho 2007 (có bản dịch VN)
- Tiêu chuẩn: ISO 21501-4 (hiệu chuẩn máy đếm hạt quang học — xuất hiện nhiều lần dưới các tên khác nhau), ISO 14644-1:2015 (phòng sạch, trùng bản với [Do-luong-vat-ly.md](Do-luong-vat-ly.md))
- Tài liệu hãng thiết bị đo bụi tiêu biểu: TSI DustTrak DRX, TEOM 1400, ENVEA MP101M, Durag

## Vấn đề phát hiện, chưa xử lý

- **Đây là cụm phức tạp nhất, cần một lượt rà soát chuyên sâu riêng** — 788 file với nhiều tài liệu học thuật/kỹ thuật sâu, Wiki này mới dừng ở mức phân loại theo cấu trúc thư mục, chưa đọc nội dung bất kỳ file nào.
- `MTLD_Dong Nai/` nghi là dữ liệu dự án/khách hàng cụ thể — tương tự vấn đề đã nêu ở [Performance-Test.md](Performance-Test.md), cần xác nhận trước khi coi là tài liệu tham khảo chung.
- Chưa xác nhận được "PKC" trong tên file đề xuất 2017 là viết tắt của ai/đơn vị nào.
- Cần đối chiếu trực tiếp với ĐLVN 294:2016 để xác nhận giả thuyết đây là hồ sơ R&D đứng sau văn bản đó.

## Nguồn dữ liệu

`00_RAW_DATA/TLTK_Chuan Bui/` (cũ) → đã chuyển tới `14_Technical_References/07_TLTK_ChuanBui/`, giữ nguyên toàn bộ cấu trúc thư mục con gốc.

## Chủ đề liên quan

- [DLVN.md](DLVN.md) — ĐLVN 294:2016 "Chuẩn hàm lượng bụi tổng" là kết quả nghiệp vụ khả năng liên quan trực tiếp tới nghiên cứu trong cụm này.
- [Do-luong-khong-khi/CEMS.md](Do-luong-khong-khi/CEMS.md) — đo bụi tại nguồn thải (`sustainability-06-04287-v2` xuất hiện ở cả hai cụm).
- [Performance-Test.md](Performance-Test.md) — cùng dạng dữ liệu dự án khách hàng lẫn trong tài liệu tham khảo, cần rà soát tách bạch.
