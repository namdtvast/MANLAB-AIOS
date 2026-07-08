---
title: "Đo lường vật lý — pha loãng, thể tích, lưu lượng, tốc độ gió, nhiệt, tiếng ồn, khối lượng, Hg"
type: Wiki-Topic
status: Da-bien-soan
source_raw: "08_KNOWLEDGE_GRAPH/00_RAW_DATA (0.2, 0.3, 0.3.1, 0.3.2, 0.3.3, 0.5, 0.6, 0.6b, 0.7, 0.8, 0.1.10 — đã di chuyển)"
source_now: "08_KNOWLEDGE_GRAPH/14_Technical_References/03_VatLy/"
file_count: 310
last_updated: "08/07/2026"
---

# Đo lường vật lý

← [Wiki/index.md](index.md)

## Tóm tắt

310 file trên 12 thư mục con, tập hợp tài liệu kỹ thuật/hiệu chuẩn cho các đại lượng vật lý cơ bản dùng trong đo lường môi trường: pha loãng khí, thể tích (dụng cụ thuỷ tinh/piston), lưu lượng (khí, nước, bơm), tốc độ gió, cường độ ánh sáng, nhiệt độ/độ ẩm, tiếng ồn, khối lượng, và thuỷ ngân (Hg). Tạo thư mục đích mới `14_Technical_References/03_VatLy/`. Đây là cụm **lớn nhất trong các nhóm kỹ thuật mới tạo** (310 file), chủ yếu là catalogue/tài liệu kỹ thuật hãng và bài báo khoa học — chưa đọc chi tiết từng file, chỉ khảo sát cấu trúc thư mục và tên file.

## Pha loãng (11 file, `PhaLoang/`)

`SOP_Thiet bi pha loang.pdf` (SOP thiết bị pha loãng), bài báo về độ không đảm bảo đo hệ hiệu chuẩn động (dynamic calibration system) — liên quan trực tiếp cách tạo khí chuẩn nồng độ thấp cho hiệu chuẩn máy phân tích khí (bổ sung cho bộ ISO 6145 trong [ISO-MuaApDung.md](ISO-MuaApDung.md)).

## Thể tích — Pipet, buret (22 file, `DungTich_Pipet_Buret/`)

2 thư mục con theo loại dụng cụ: `DỤNG CỤ THỦY TINH/` và `DỤNG CỤ PISTON/`, cộng file `CMC-THUYTINH.xls` (bảng CMC — Calibration and Measurement Capability, khả năng đo và hiệu chuẩn — cho dụng cụ thuỷ tinh).

## Lưu lượng khí (90 file — lớn thứ 2, `LuuLuong_Khi/`)

6 thư mục con: `Luu luong lon/` (lưu lượng lớn), `SKC/` và `Sensidyne/` (2 hãng sản xuất bơm lấy mẫu khí cá nhân phổ biến trong quan trắc môi trường lao động), `Isokinetic/` (lấy mẫu đẳng động lượng — kỹ thuật lấy mẫu bụi ống khói), `MFC/` (Mass Flow Controller), `Calibration/`. File rời gồm `I-CAL-GUI-019_Calibration_Guide_No._19` và tài liệu kỹ thuật chuẩn thể tích/lưu lượng (`GenPurp-Standard_vs_Volumetric.pdf`, `hb150-2g-1.pdf`, `50081-1.pdf`).

## Bơm (26 file, `Bom/`)

`EURAMET-cg-19` — hướng dẫn EURAMET về độ không đảm bảo đo thể tích (liên quan trực tiếp hiệu chuẩn bơm lấy mẫu), `Chapter 3 Pump Calibration Procedures.pdf`. Có thư mục con bất thường `0. 5. Khoi luong/` (tên trùng với cụm "Khối lượng" ở nơi khác trong Raw — có thể bị đặt nhầm vị trí khi lưu trữ gốc, **chưa xác minh nội dung**).

## Lưu lượng nước (10 file, `LuuLuong_Nuoc/`)

TCVN 8193-1:2009 (đo lưu lượng kênh hở — phương pháp đo mặt cắt tràn), TCVN 6816:2001 (đo lưu lượng ống dẫn kín — phương pháp siêu âm), ISO 1438:2008 (kênh hở, trùng bản với [ISO-MuaApDung.md](ISO-MuaApDung.md)), sổ tay hiệu chuẩn (`calibration_handbook.pdf`), thư mục con `Luu luong/`.

## Tốc độ gió (110 file — lớn nhất trong cụm, `TocDoGio/`)

8 thư mục con: `TCVN/`, `Thiet bi do van toc - Doppler laser/` (thiết bị đo vận tốc bằng laser Doppler — kỹ thuật đo tiên tiến), `2. Thiet ke/` (thiết kế, khả năng liên quan hầm gió — wind tunnel), `Hieu chuan/`, `Bai bao quoc te - VN/` (bài báo khoa học), `Dantec Dynamic/` và `Friedrichs/` (2 hãng thiết bị đo khí động học/tốc độ gió), `Thiet bi/`. File rời đáng chú ý: `Toan-van-LATS_NCS-Huy_full.pdf` (toàn văn luận án tiến sĩ — chủ đề chưa xác định từ tên, khả năng liên quan hiệu chuẩn tốc độ gió/hầm gió), `Calibration wind tunnber.pdf` (hiệu chuẩn hầm gió), `AF1125-Bench-Top-Subsonic-Wind-Tunnel-Datasheet.pdf` (datasheet hầm gió cận âm để bàn), `Ong Venturi.png`.

## Cường độ ánh sáng (3 file, `CuongDoAnhSang/`)

`handbook.pdf`, `Lighting.pdf`, datasheet máy phân tích ánh sáng môi trường (ambient light analyzer).

## Nhiệt (11 file, `Nhiet/`)

`Uncertainty_Budget_Table_Template...xlsx` (mẫu bảng ngân sách độ không đảm bảo đo, có tên "Nam revised" — khả năng do nhân sự ETV chỉnh sửa), `TemperatureCalibration.pdf`, `TS-calibration-final-sign-off-a.pdf`, `BS EN 60068-3-5-2002 Guidance.docx` (hướng dẫn thử nghiệm môi trường — nhiệt độ khô).

## Nhiệt ẩm (2 file, `NhietAm/`)

Cả 2 file đều là hướng dẫn EURAMET: `EURAMET_cg-20 v4.0` (hiệu chuẩn tủ vi khí hậu kiểm soát nhiệt độ/độ ẩm) và bản `v2` cũ hơn (hiệu chuẩn buồng khí hậu).

## Tiếng ồn (16 file, `TiengOn/`)

Thư mục con `ACO 6236/` (mã model thiết bị/microphone chuẩn?), file rời: khái niệm cơ bản về âm thanh (`P1_các khai niem co ban ve am thanh.pdf`), `MUB_SPL_Extrakt_eng_Spectra.pdf` (độ không đảm bảo đo mức áp suất âm — SPL), `PWC-2006-TC8-027u_TV.doc`.

## Khối lượng (1 file, `KhoiLuong/`)

Chỉ 1 file: slide về xác minh hiệu chuẩn khối lượng và cân (`Mass_and_Balance_Calibration_Verification_Slaid.pdf`) — nhóm nhỏ nhất trong toàn bộ 00_RAW_DATA gốc.

## Hg — Thuỷ ngân (8 file, `Hg_ThuyNgan/`)

Chủ đề thiết bị quan trắc thuỷ ngân trong khí: `PSA 10536 Mercury Vapour Generator` (máy phát hơi thuỷ ngân chuẩn — dùng hiệu chuẩn máy đo Hg), `Mercury Tracker-3000 XS` (thiết bị quan trắc Hg trong không khí), `MERCURY CEM CALIBRATION.pdf` (hiệu chuẩn CEM đo Hg — liên quan trực tiếp [Do-luong-khong-khi/CEMS.md](Do-luong-khong-khi/CEMS.md)), `PSAHginPetrochemicals.pdf` (Hg trong ngành hoá dầu).

## Vấn đề phát hiện, chưa xử lý

- Thư mục con `Bom/0. 5. Khoi luong/` có tên gợi ý bị đặt nhầm vị trí trong cấu trúc gốc — nội dung chưa khảo sát.
- Cụm này chưa đọc bất kỳ file nào trực tiếp — toàn bộ dựa trên tên file/thư mục, độ tin cậy thấp hơn các cụm đã đọc mẫu (Ozone, SO2, CEMS...).
- `Toan-van-LATS_NCS-Huy_full.pdf` (luận án tiến sĩ) — nội dung cụ thể chưa xác định, cần mở đọc để phân loại chính xác.

## Nguồn dữ liệu

`00_RAW_DATA/0. 2. Pha loang/`, `0. 3. Dung tich Pipet, buret/`, `0. 3. Luu luong/`, `0. 3.1. Bom/`, `0. 3.2. Luu luong nuoc/`, `0. 3.3. Toc do gio/`, `0. 5. Cuong do anh sang/`, `0. 6. Nhiet/`, `0. 6. Nhiet Am/`, `0. 7. Tieng On/`, `0. 8 Khoi luong/`, `0. 1.10. Hg/` (cũ) → đã chuyển tới `14_Technical_References/03_VatLy/`.

## Chủ đề liên quan

- [Do-luong-khong-khi/CEMS.md](Do-luong-khong-khi/CEMS.md) — thiết bị đo Hg trong nhóm này bổ sung cho các thông số CEMS đã có (SO2/NOx/bụi).
- [ChatChuan-PT.md](ChatChuan-PT.md) — pha loãng khí liên quan trực tiếp kỹ thuật chuẩn bị khí chuẩn.
- [DLVN.md](DLVN.md) — nhiều ĐLVN (92 tốc độ gió, 264 độ rung, khối lượng...) trùng chủ đề với cụm này.
