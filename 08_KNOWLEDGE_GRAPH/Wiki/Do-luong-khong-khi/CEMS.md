---
title: "CEMS — Hệ thống quan trắc khí thải liên tục"
type: Wiki-Page
parent: "Do-luong-khong-khi/README.md"
source_path: "08_KNOWLEDGE_GRAPH/14_Technical_References/01_KhongKhi/CEMS/"
file_count: 81
last_updated: "08/07/2026"
---

# CEMS — Hệ thống quan trắc khí thải liên tục (Continuous Emission Monitoring System)

← [Đo lường & hiệu chuẩn không khí](README.md)

## Tóm tắt

Đây là chủ đề lớn nhất trong cụm không khí (81/129 file, 63%). CEMS là hệ thống đo liên tục nồng độ khí thải (SO₂, NOx, CO₂, O₂, bụi, THC...) tại nguồn thải công nghiệp (nhà máy nhiệt điện, xi măng, thép...). Tài liệu Raw gồm hai mảng rõ rệt:

1. **Quy định/hướng dẫn kỹ thuật CEMS** (11 file gốc, không nằm trong thư mục hãng) — quy định Mỹ (40 CFR Part 60 & 75), hướng dẫn CEMS của Malaysia, và các "performance specification" (ps-6, ps-7, ps-8a, ps-10) cho từng loại khí.
2. **Tài liệu hãng thiết bị** (từ các thư mục con `Dr. Fosdisch/`, `From ABB (Bang)/`, `From CKY (Dai Loan)/`) — catalogue sản phẩm, slide bán hàng, tài liệu đào tạo — không phải tiêu chuẩn.

Đã đọc trực tiếp `CEMS Regs Overview.pdf` (slide ThermoFisher): phân biệt **40 CFR Part 60** (quy định CEMS đầu tiên, áp dụng mọi nguồn CEMS mới) và **40 CFR Part 75** (áp dụng nhà máy điện & một số cơ sở đốt nhiên liệu miền Đông Mỹ, yêu cầu QA/QC nghiêm ngặt hơn Part 60). Slide cũng liệt kê thuật ngữ: RATA (Relative Accuracy Test Audit), RA (Relative Accuracy), CGA (Cylinder Gas Audit), PS2 (đặc tính kỹ thuật cho máy đo SO₂ & NOx), PS3 (cho CO₂ & O₂).

## Tài liệu quy định / kỹ thuật chung (không thuộc thư mục hãng)

| File | Nội dung (suy từ tên/đã đọc) |
|---|---|
| `Guideline_on_CEMS_03-11-16.pdf` | Hướng dẫn CEMS, chưa đọc chi tiết |
| `CEMS Regs Overview.pdf` | Đã đọc — so sánh 40 CFR Part 60 vs Part 75 (slide ThermoFisher) |
| `UK technical guidance.pdf` | Hướng dẫn kỹ thuật CEMS của Anh — chưa đọc |
| `ATT11CalibProc.pdf` | Quy trình hiệu chuẩn (attachment 11) — chưa đọc |
| `C_SA_9_PA01_2015_en_Simen.pdf` | Chưa đủ dữ liệu |
| `ps-6.pdf`, `ps-7_H2S.pdf`, `ps-8a_HC THC tram CEMS.pdf`, `ps-10_Tai lieu.pdf` | Chuỗi "Performance Specification" của EPA cho từng thông số CEMS: PS-6 (chưa rõ thông số), PS-7 (H₂S), PS-8a (Hydrocarbon/THC), PS-10 (chưa rõ) |
| `cs2ch4.pdf` | Chưa đủ dữ liệu (khả năng liên quan CS₂/CH₄) |
| `sustainability-06-04287-v2_So sanh cac Phuong phap do Bui.pdf` | Bài báo khoa học so sánh các phương pháp đo bụi |
| `Product_catalog_Encoders_en_IM0038143.PDF` | Catalogue bộ mã hóa (encoder), nhà cung cấp chưa xác định |
| `PDS_E_CEMS.pdf` | Product data sheet CEMS, hãng chưa xác định |
| `DrDSaha_CEMS_2.ppsx` | Slide trình bày (tác giả "Dr D Saha") |

## Thư mục con theo nguồn/hãng

**`Malaysia/` (4 file)** — Bộ hướng dẫn lắp đặt & bảo trì CEMS của Malaysia, có cả bản gốc tiếng Anh và bản dịch tiếng Việt:
- `Volume-I-Guideline-for-the-Installation-Maintenance-of-Continuous-Emission-Monitoring-Systems-CEMS-Version-6.pdf` (+ bản `_VNese.doc`)
- `Volume-II-Guideline-CEMS-DIS-Version-7.0-Mac-2014_Malaysia.pdf` (+ bản dịch `.doc`)

**`RATA/` (2 file)** — tài liệu về Relative Accuracy Test Audit: `appendixf.pdf`, `craig_0.pdf` (chưa đọc chi tiết).

**`Dr. Fosdisch/` (11 file)** — catalogue/product information thiết bị phân tích khí (dòng GMD, PFM, MCA, MGA), kèm 1 file `.docx` liên hệ nhà cung cấp. Đây đều là tài liệu thương mại của hãng (chưa xác định tên hãng đầy đủ từ tên file), không phải tiêu chuẩn.

**`From CKY (Dai Loan)/` (6 file)** — tài liệu từ đối tác Đài Loan: slide hệ đo bụi/độ mờ khói (PCME), bảng so sánh quy cách TUV (tiếng Trung), tài liệu về nhà máy điện gần phát thải bằng 0 (tiếng Trung).

**`From ABB (Bang)/` (33 file)** — tài liệu hãng ABB do "Bang" cung cấp, chia theo:
- `CGA/` — trình bày Cylinder Gas Audit, dòng phân tích khí ACX/ACF5000/EL3060.
- `CGA/ACF5000/` (5 file), `CGA/Product view/` (3 file), `CGA/Application/` (7 file gốc + 5 file lặp trong `Cement/`, 5 file lặp trong `Power plant/`, 1 file trong `Steel/`) — ứng dụng theo ngành: xi măng, nhà máy điện, thép, DeNOx, DeSOx, lò hơi, máy phát tuabin làm mát bằng hydro, xử lý HCl.
- `CGA/Application/CEMS Sales Package/` (5 file) — tài liệu bán hàng.
- `CGA/E learning source/CGA I/`, `CGA II/` (10 file) — tài liệu đào tạo nội bộ hãng về nguyên tắc cơ bản, thuật ngữ, hiệu chuẩn bằng khí thử, quan trắc phát thải.

> **Lưu ý:** nhiều file trong `Application/` bị lặp giữa thư mục gốc và các thư mục con `Cement/`, `Power plant/` (cùng tên, cùng nội dung theo suy đoán từ tên — chưa xác minh bằng checksum). Có thể cân nhắc loại bỏ trùng lặp ở lần rà soát sau.

## Nguồn dữ liệu

`00_RAW_DATA/0. 1.3. CEMS/` (cũ) → đã chuyển tới `14_Technical_References/01_KhongKhi/CEMS/`, giữ nguyên toàn bộ cấu trúc thư mục con.

## Chủ đề liên quan

- [NOx-SO2.md](NOx-SO2.md) — SO₂/NOx là hai thông số CEMS phổ biến nhất.
- [BTEX-VOC.md](BTEX-VOC.md) — THC/VOC cũng được đo bởi một số hệ CEMS.
