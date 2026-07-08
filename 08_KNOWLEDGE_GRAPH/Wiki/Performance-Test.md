---
title: "Performance Test — RATA và kiểm tra hiệu năng CEMS"
type: Wiki-Topic
status: Da-bien-soan
source_raw: "08_KNOWLEDGE_GRAPH/00_RAW_DATA/3.12. Performance Test (đã di chuyển)"
source_now: "08_KNOWLEDGE_GRAPH/14_Technical_References/06_PerformanceTest/"
file_count: 458
last_updated: "08/07/2026"
---

# Performance Test — RATA và kiểm tra hiệu năng CEMS

← [Wiki/index.md](index.md)

## Tóm tắt

458 file, chủ đề chính là **RATA (Relative Accuracy Test Audit)** và các bài kiểm tra hiệu năng định kỳ cho hệ thống CEMS — nối tiếp trực tiếp chủ đề [Do-luong-khong-khi/CEMS.md](Do-luong-khong-khi/CEMS.md). Đã di chuyển nguyên trạng sang `14_Technical_References/06_PerformanceTest/`.

## Thư mục con

| Thư mục | Số file | Nội dung |
|---|---|---|
| `ChuGai techno/` | **337 (73% cụm)** | **Không phải tài liệu tham khảo kỹ thuật** — là dữ liệu công việc dự án thực tế với khách hàng cụ thể: thư mục con `Acecook/`, `Acecook new/`, `Acecook report/` (báo cáo hàng ngày, biểu đồ dạng `.xls` cho khách hàng Acecook — công ty thực phẩm), `CM Vinh Tan/` (dự án nhà máy nhiệt điện Vĩnh Tân), `Company Job/`, `Tài Liệu Training/`. Có vẻ đây là hồ sơ công việc của một đơn vị/cá nhân tên "ChuGai Techno" bị gộp lẫn vào kho tài liệu tham khảo |
| `1. RATA TEST/` | 64 | Tài liệu chuẩn kỹ thuật thực sự: **BS EN 14181:2014** (đảm bảo chất lượng hệ đo tự động — QAL1/2/3), BS EN 14790:2005 (xác định hơi nước/hàm ẩm trong ống khói), BS EN 14791:2005 (phương pháp tham chiếu xác định SO₂), BS EN ISO 14956:2002 (đánh giá sự phù hợp phương pháp đo — trùng bản với [Quoc-te-khac.md](Quoc-te-khac.md)), báo cáo RATA mẫu (`November_2015_CEMS_RATA_Report.pdf`), checklist RATA theo chương trình RECLAIM, thư mục con `SGS Report/` (báo cáo của tổ chức giám định SGS) |
| `Gasmet_DX 4000` | 15 | Tài liệu hãng Gasmet, dòng máy phân tích DX-4000 (FTIR đa khí) |
| `Mau_Certificate of Compliance/` | 10 | Mẫu chứng chỉ tuân thủ (Certificate of Compliance) |
| `ABB_Vietan 2017` | 6 | Tài liệu dự án/hãng ABB liên quan Việt Nam, 2017 |
| `Performance Test_Air Continues/`, `Performance Test_Water Continues/` | 5 + 5 | Kiểm tra hiệu năng hệ quan trắc khí và nước liên tục |
| `ESS report/` | 3 | Báo cáo (tổ chức/dự án "ESS" — chưa xác định) |
| `Thermal Power` | 2 | Tài liệu nhà máy nhiệt điện |
| File rời (11 file) | 11 | Gồm tiêu chuẩn hiệu năng cho hệ quan trắc phát thải di động (`performance_standard_for_portable_emission_monitoring_systems...pdf`, 2 bản), tài liệu NESCAUM, và vài file mã hãng (`geho0712bwst-e-e.pdf`, `LIT_7071.pdf`, `LIT_5125.pdf`) |

## Vấn đề phát hiện, chưa xử lý — quan trọng

- **`ChuGai techno/` (337 file, 73% cụm) là dữ liệu dự án/khách hàng thực tế (Acecook, Vĩnh Tân), không phải tài liệu tham khảo kỹ thuật chung.** Nên cân nhắc chuyển ra khỏi `08_KNOWLEDGE_GRAPH` (thư viện tham khảo) sang khu vực hồ sơ dự án/khách hàng phù hợp hơn (có thể `11_COMPLIANCE` hoặc khu lưu trữ dự án riêng) — **chưa di chuyển tiếp, cần quyết định của người phụ trách trước khi làm** vì có thể chứa thông tin khách hàng nhạy cảm.
- Không đọc chi tiết bất kỳ file nào — toàn bộ dựa trên khảo sát cấu trúc thư mục.

## Nguồn dữ liệu

`00_RAW_DATA/3.12. Performance Test/` (cũ) → đã chuyển tới `14_Technical_References/06_PerformanceTest/`.

## Chủ đề liên quan

- [Do-luong-khong-khi/CEMS.md](Do-luong-khong-khi/CEMS.md) — RATA/CGA là hoạt động QA/QC định kỳ trực tiếp cho các hệ CEMS đã catalog ở đó (ABB, Dr. Fosdisch...).
- [Quoc-te-khac.md](Quoc-te-khac.md) — BS EN ISO 14956 trùng bản.
