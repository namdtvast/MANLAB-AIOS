---
title: "ISO — Tiêu chuẩn quốc tế mua/áp dụng"
type: Wiki-Topic
status: Da-bien-soan
source_raw: "08_KNOWLEDGE_GRAPH/00_RAW_DATA/2.2. ISO (đã di chuyển)"
source_now: "08_KNOWLEDGE_GRAPH/02_ISO/ISO_MuaApDung/"
file_count: 40
last_updated: "08/07/2026"
---

# ISO — Tiêu chuẩn quốc tế mua/áp dụng

← [Wiki/index.md](index.md)

## Tóm tắt

40 file, đã di chuyển từ `00_RAW_DATA/2.2. ISO/` sang `02_ISO/ISO_MuaApDung/`. Ba nhóm nội dung chính:

**Công nhận PTN / mẫu chuẩn / đánh giá hệ thống:**
- ISO/IEC 17025:2017 (+ bản 2005 "lỗi thời") — năng lực PTN, có thư mục con `ISO IEC 17025_2017/` kèm bản so sánh nội dung giữa các phiên bản và bản TCVN tương đương
- ISO 17034:2016/2017 (thư mục con) — năng lực nhà sản xuất mẫu chuẩn, kèm bản TCVN 17034:2017 song song
- ISO 19011 — hướng dẫn đánh giá hệ thống quản lý
- ISO/IEC Guide 43-1/43-2:1997 — thử nghiệm thành thạo (xây dựng & vận hành chương trình so sánh liên phòng)
- ISO/IEC Guide 99:2007 — VIM (từ vựng đo lường quốc tế, song ngữ Anh-Pháp)
- ISO 15189:2014 — yêu cầu năng lực PTN y tế
- ISO 33401/33403/33405/33406:2024 (thư mục `ISO 334_01 - 06/`) — bộ tiêu chuẩn mới 2024 (chưa xác định chủ đề cụ thể từ tên file, cần đọc để xác nhận — số hiệu 334xx thuộc lĩnh vực mẫu chuẩn)

**Đo/hiệu chuẩn khí (khối lớn nhất — cả bộ ISO 6145 chuẩn bị hỗn hợp khí chuẩn):**
- ISO 6145 phần 1, 2, 4–11 (thiếu phần 3) — các phương pháp chuẩn bị hỗn hợp khí chuẩn: bơm piston, tiêm liên tục bằng xy-lanh, thiết bị mao dẫn, lỗ tới hạn (critical orifice), khuếch tán, bão hoà, thẩm thấu (permeation), điện hoá
- ISO 6142 (lỗi thời, thay bằng 6142:2015) — chuẩn bị hỗn hợp khí bằng phương pháp khối lượng (gravimetric)
- EN ISO 6145-7:2010 — bộ điều khiển lưu lượng khối nhiệt (thermal mass-flow controllers)
- ISO 20988 — hướng dẫn ước lượng độ không đảm bảo đo chất lượng không khí
- ISO 6879:1995 — đặc tính tính năng phương pháp đo chất lượng không khí
- [BS EN ISO 16911-1/2:2013] — xác định vận tốc/lưu lượng khí trong ống dẫn (thủ công + hệ đo tự động) — trùng chủ đề với TCVN 11809 (xem [TCVN.md](TCVN.md))
- ISO 25597:2013 — xác định PM2.5/PM10 trong khí ống khói bằng cyclone/pha loãng mẫu
- ISO 21501 — phương pháp hiệu chuẩn quang học đếm hạt (particle counter)
- NewItem_196_NAAQMS — phương pháp phân tích Ozone (tài liệu chương trình quan trắc chất lượng không khí quốc gia, nguồn chưa xác định rõ — tên file gợi ý Ấn Độ/NAAQMS)

**Nước/môi trường khác:**
- ISO 5814 — xác định oxy hoà tan bằng đầu dò điện hoá
- ISO 8466-2:2001 — hiệu chuẩn & đánh giá phương pháp phân tích, ước lượng đặc trưng tính năng (chất lượng nước)
- ISO 1438:2008 — kênh hở (open channel, đo lưu lượng)
- ISO 14644-1:2015 — phòng sạch (cleanroom)

## Vấn đề phát hiện, chưa xử lý

- **Nghi trùng lặp:** `02_ISO/` (thư mục đích, đã có sẵn trước khi di chuyển) đã chứa `01. ISO 17034-2016 (BS EN)...pdf` và `01. TCVN 17034-2017. ISO 17034.pdf` — cùng tên/nội dung với 2 file trong `ISO_MuaApDung/ISO 17034_2017/` vừa chuyển tới. Chưa xoá bản nào, cần đối chiếu checksum ở lượt rà soát sau.
- Bộ `ISO 334_01 - 06/` (33401, 33403, 33405, 33406 — thiếu 33402, 33404) chưa xác định chủ đề, chỉ có số hiệu.

## Nguồn dữ liệu

`00_RAW_DATA/2.2. ISO/` (cũ) → đã chuyển tới `02_ISO/ISO_MuaApDung/`.

## Chủ đề liên quan

- [Do-luong-khong-khi/Ozone.md](Do-luong-khong-khi/Ozone.md), [Khi-CamTay.md](Do-luong-khong-khi/Khi-CamTay.md) — bộ ISO 6145 (chuẩn bị khí chuẩn) là nền tảng lý thuyết cho các quy trình hiệu chuẩn khí trong cụm đó.
- [TCVN.md](TCVN.md) — nhiều TCVN là bản dịch/tương đương trực tiếp các ISO trong cụm này (17025, 17034, 16911...).
