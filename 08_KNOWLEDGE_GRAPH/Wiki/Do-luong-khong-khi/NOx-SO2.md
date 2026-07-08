---
title: "NOx & SO2 — Đo lưu huỳnh dioxit và oxit nitơ"
type: Wiki-Page
parent: "Do-luong-khong-khi/README.md"
source_path: "08_KNOWLEDGE_GRAPH/14_Technical_References/01_KhongKhi/NOx_SO2/"
file_count: 11
last_updated: "08/07/2026"
---

# NOx & SO2 — Đo lưu huỳnh dioxit và oxit nitơ

← [Đo lường & hiệu chuẩn không khí](README.md)

## Tóm tắt

Gộp hai thư mục Raw gốc "1.5. NO" (1 file) và "1.5. SO2" (10 file) do cùng mã số phân loại 1.5 trong hệ thống cũ và cùng nhóm khí ô nhiễm thường đo chung (NOx/SO2 là cặp thông số kinh điển của quan trắc khí thải và khí xung quanh). Trọng tâm tài liệu là đo SO₂ theo nguyên lý **huỳnh quang tử ngoại (UV fluorescence)** và tiêu chuẩn Việt Nam TCVN 5976-1995 (tương đương ISO 7935:1992) về đặc tính của các phương pháp đo tự động SO₂ tại nguồn thải.

## SO2 (`NOx_SO2/SO2/`, 10 file)

**Đã đọc:**
- `TCVN_5976_95.pdf` — TCVN 5976-1995 (hoàn toàn tương đương ISO 7935:1992), tiêu đề: *"Khí thải nguồn tĩnh — Xác định nồng độ khối lượng của lưu huỳnh dioxit (SO₂) — Đặc tính của các phương pháp đo tự động"*. Do Ban kỹ thuật TCVN/TC 146 (Chất lượng không khí) biên soạn, Bộ Khoa học Công nghệ và Môi trường ban hành. Nội dung: dùng TCVN 5975-1995 (ISO 7934) làm phương pháp tham chiếu để đánh giá đặc tính các hệ đo tự động liên tục SO₂.
- `SO2_SOP_13feb12.pdf` — "Standard Operating Procedures for Sulfur Dioxide (SO₂) Monitoring by Ultraviolet Fluorescence", ban hành bởi Alaska Dept. of Environmental Conservation, Division of Air Quality (2/2012, Revision 2). SOP đầy đủ có phê duyệt chính thức (chữ ký Program Manager & QA Officer).

**Chưa đọc chi tiết (liệt kê theo tên):**
- `qa_manual_chap_03_hieu Chuan SO2.pdf` — chương 3 của một QA manual, về hiệu chuẩn SO₂.
- `HndBk0701_o-Wv-Std.pdf` — handbook, liên quan chuẩn (standard), chưa rõ nội dung đầy đủ.
- `Chapter 4.6 SO2.PDF` — chương sách/tài liệu về SO₂.
- `CFR-2012-title40-vol2-part50-appA_quy trinh HC SO2.pdf` — 40 CFR Part 50 Appendix A (2012), quy trình hiệu chuẩn SO₂ theo luật liên bang Mỹ.
- `sulfurDioxide_monitoring.pdf` — tài liệu quan trắc SO₂ (chung).
- `910141.pdf` — chưa đủ dữ liệu.
- `hgrefmethods.ppt` — slide, tên gợi ý "reference methods" (có thể liên quan cả Hg — cần xác minh, chưa đọc).
- `DO AN XL H2S BANG THAN HOAT TINH.pdf` — đồ án/luận văn về xử lý khí H₂S bằng than hoạt tính — chủ đề xử lý khí thải, không phải hiệu chuẩn đo lường; có thể không thuộc đúng chủ đề của cụm này, cần xem xét lại khi rà soát tiếp theo.

## NO (`NOx_SO2/NO/`, 1 file)

- `2006-104_khi cam tay.pdf` — tên file có "khí cầm tay" dù nằm trong thư mục NO gốc; nội dung thực tế nhiều khả năng trùng chủ đề với [Khi-CamTay.md](Khi-CamTay.md) hơn là riêng về NO. Chưa đọc để xác nhận — cần đối chiếu khi rà soát tiếp theo.

## Nguồn dữ liệu

`00_RAW_DATA/0. 1.5. NO/` + `00_RAW_DATA/0. 1.5. SO2/` (cũ) → đã chuyển tới `14_Technical_References/01_KhongKhi/NOx_SO2/NO/` và `.../SO2/`.

## Chủ đề liên quan

- [CEMS.md](CEMS.md) — SO₂/NOx là thông số CEMS phổ biến (xem PS-2 trong ghi chú CEMS).
- [Khi-CamTay.md](Khi-CamTay.md) — nghi ngờ trùng chủ đề với file `2006-104_khi cam tay.pdf` ở trên.
