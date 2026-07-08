---
title: "ĐLVN — Văn bản kỹ thuật Đo lường Việt Nam"
type: Wiki-Topic
status: Da-bien-soan
source_raw: "08_KNOWLEDGE_GRAPH/00_RAW_DATA/1. 2. ĐLVN (đã di chuyển)"
source_now: "08_KNOWLEDGE_GRAPH/03_DLVN/ĐLVN_QuyTrinh/"
file_count: 666
last_updated: "08/07/2026"
---

# ĐLVN — Văn bản kỹ thuật Đo lường Việt Nam

← [Wiki/index.md](index.md)

## Tóm tắt

ĐLVN (Văn bản kỹ thuật Đo lường Việt Nam) là bộ quy trình **kiểm định (QTKĐ), hiệu chuẩn (QTHC), thử nghiệm (QTTN)** chính thức cho từng loại phương tiện đo tại Việt Nam — nội dung đã xác nhận qua việc đọc trực tiếp `DLVN 76_2001` (Áp kế, chân không kế kiểu lò xo và hiện số — Quy trình hiệu chuẩn): mỗi văn bản quy định phạm vi áp dụng, các phép hiệu chuẩn/kiểm định phải tiến hành, phương tiện chuẩn dùng để đối chiếu, và trình tự thực hiện. Đây là **bộ tài liệu kỹ thuật cốt lõi** mà hoạt động kiểm định/hiệu chuẩn của ETV phải tuân theo — nền tảng kỹ thuật triển khai chi tiết từ [Luật Đo lường 2011](Phap-ly.md).

**666 file** đã được di chuyển nguyên trạng từ `00_RAW_DATA/1. 2. ĐLVN/` sang `03_DLVN/ĐLVN_QuyTrinh/`, gồm:
- 363 file rời cấp 1 (đa số là các văn bản DLVN riêng lẻ, có nhiều bản trùng — bản `.doc` + `.pdf`, bản cũ "lỗi thời" + bản thay thế)
- 4 thư mục con nhóm theo loại quy trình: `1. QTHC Chuan/`, `2. QTKD (lien quan)/`, `3. QTHC (lien quan)/`, `4. QTTN (lien quan)/`
- 8 thư mục con lưu trữ theo năm ban hành cũ: `1998/`–`2005/`
- 1 thư mục `khoi luong/` (nội dung chưa khảo sát)
- Các file danh mục tổng hợp: `Danh mục DLVN.docx`, `01-Danh muc DLVN_Hanh.xls`, `DM-DLVN-2008.doc`, `DM-DLVN-2008-Sxet.doc`

## Danh mục chính thức (trích từ `Danh mục DLVN.docx`)

File `Danh mục DLVN.docx` trong kho là **bảng tra cứu chính thức** (~200 mục, số hiệu : năm ban hành, tên, loại quy trình, số trang) — nguồn đáng tin cậy nhất trong cụm này vì lấy trực tiếp từ mục lục có cấu trúc, không suy đoán từ tên file. Danh mục này chủ yếu phủ các số hiệu ĐLVN từ 01 đến khoảng 214 (ban hành 1997–2009); các số hiệu cao hơn (215–359, ban hành 2010–2019) có trong thư mục nhưng **không nằm trong file danh mục này** — xem trực tiếp tên file tương ứng trong `03_DLVN/ĐLVN_QuyTrinh/`.

Phân theo lĩnh vực đo lường (số lượng mục tìm thấy trong danh mục, không tính trùng bản):

| Lĩnh vực | Số mục | Ví dụ tiêu biểu |
|---|---|---|
| Khối lượng (cân, quả cân) | 35 | ĐLVN 16 (cân phân tích/kỹ thuật), ĐLVN 32/33 (cân tàu hoả tĩnh/động), ĐLVN 47/50/98/99 (quả cân cấp E1–M2) |
| Điện (dòng/áp/công suất/tần số/điện trở) | 36 | ĐLVN 7/74 (công tơ điện), ĐLVN 24/201/202 (biến dòng/biến áp đo lường), ĐLVN 116/117 (máy hiện sóng/phân tích phổ) |
| Nhiệt độ / độ ẩm | 21 | ĐLVN 20 (nhiệt kế thuỷ tinh), ĐLVN 71 (nhiệt kế điện trở Platin chuẩn), ĐLVN 161 (cặp nhiệt điện công nghiệp) |
| Thể tích / dung tích / bể chứa | 13 | ĐLVN 28/29 (bể trụ đứng/nằm ngang), ĐLVN 172/173 (ống chuẩn dung tích), ĐLVN 194/196 (chuẩn dung tích khí) |
| Tốc độ / chiều dài / kích thước | 12 | ĐLVN 1/118 (tắc xi mét), ĐLVN 69 (máy đo tốc độ xe cơ giới), ĐLVN 148/149 (calip trụ trơn/vòng) |
| Áp suất / chân không | 10 | ĐLVN 8/76 (áp kế lò xo & hiện số), ĐLVN 211 (áp kế píttông), ĐLVN 134/135 (khí áp kế) |
| Lưu lượng / đồng hồ đo khí, nước, chất lỏng | 9 | ĐLVN 37/38 (lưu lượng kế), ĐLVN 155 (đồng hồ đo khí kiểu màng), ĐLVN 174–176 (đồng hồ đo dầu mỏ) |
| Hoá/môi trường (cồn kế, độ ẩm nông sản, khí thải) | 8 | ĐLVN 27 (độ ẩm thóc/gạo/ngô/cà phê), ĐLVN 199/200 (khí chuẩn hàm lượng cồn/khí thải xe) |
| Thử độ bền / cơ khí | 4 | ĐLVN 49/109 (máy thử độ bền kéo nén) |
| Âm học / độ ồn / rung / va đập | 3 | ĐLVN 89/206 (máy đo độ ồn), ĐLVN 151 (thử độ bền va đập) |
| Y tế (X-quang, điện tim, điện não...) | 3 | ĐLVN 41/42/65 (X-quang, CT, X-quang tăng sáng truyền hình) |
| **Khác** (lực, độ cứng, độ nhớt, pH, độ bụi, UV-Vis, vận tốc gió/dòng chảy, góc, tài liệu hành chính đo lường...) | 54 | ĐLVN 31 (máy đo pH), ĐLVN 90 (máy đo độ bụi), ĐLVN 92/93 (vận tốc gió/dòng chảy), ĐLVN 131 (hướng dẫn đánh giá độ không đảm bảo đo), ĐLVN 113 (yêu cầu trình bày VBKTĐLVN) |

> Bảng trên tổng ~208 mục trích thẳng từ danh mục gốc; một số mục bị lặp do có cả bản `:1998/1999` và bản thay thế cùng số hiệu ở năm sau (ví dụ ĐLVN 47:1999 và 47:2009 — cùng "Quả cân cấp chính xác F2, M1, M2" nhưng khác năm/phiên bản).

## Số hiệu mới hơn (215–359, không có trong danh mục docx)

Quan sát trực tiếp tên file trong thư mục cho thấy các đợt bổ sung sau 2010, ví dụ (không đầy đủ, cần đối chiếu danh mục cập nhật nếu có):
- **283–326 (ban hành 2014–2016)**: loạt lớn quy trình hiệu chuẩn/kiểm định mới — cân phân tích, áp kế điện tử, độ đục, độ dẫn điện, oxy hoà tan, pH, TDS, hàm lượng bụi tổng trong không khí, máy phân tích phổ, máy tạo sóng, thiết bị đo tốc độ chuẩn... (nhiều mục trùng chủ đề với cụm [Do-luong-khong-khi](Do-luong-khong-khi/README.md), ví dụ ĐLVN 294 "Chuẩn hàm lượng bụi tổng").
- **359 (2019)**: PTĐ nhiệt ẩm.
- **255–279 (2014–2015)**: mức xăng dầu tự động, đo rơi, tiêu cự kính mắt, cân treo móc cẩu, áp kế điện tử, đo rung, thiết bị đo khí CO₂/CO/NO/SO₂, dung dịch chuẩn (độ dẫn điện, độ đục, oxy tan, pH, TDS).

## Vấn đề phát hiện, chưa xử lý

- Khối lượng trùng lặp lớn: rất nhiều số hiệu có 2–3 bản (`.doc`, `.pdf`, bản "incomplete", bản "lỗi thời" + bản thay thế) — chưa rà soát để giữ 1 bản chính thức duy nhất mỗi số hiệu.
- Thư mục `khoi luong/`, và 4 thư mục `1. QTHC Chuan/`, `2. QTKD (lien quan)/`, `3. QTHC (lien quan)/`, `4. QTTN (lien quan)/`, cùng 8 thư mục lưu trữ theo năm (`1998/`–`2005/`) — **chưa mở khảo sát nội dung**, chỉ biết tên.
- File `Danh mục DLVN.docx` bị lỗi định dạng khi trích xuất tự động (một số mục dính liền nhau qua ký tự `._ Số trang:`) — bảng trên đã được làm sạch thủ công phần lớn nhưng có thể còn sai sót ở ranh giới mục; nên đối chiếu lại bằng cách mở trực tiếp file gốc khi cần độ chính xác cao.
- Chưa đối chiếu ĐLVN với TCVN/QCVN tương ứng (nhiều ĐLVN có ghi "hoàn toàn tương đương ISO/OIML" tương tự cách TCVN 5976-1995 tương đương ISO 7935 — xem [Do-luong-khong-khi/NOx-SO2.md](Do-luong-khong-khi/NOx-SO2.md)) — cần đọc từng file để xác nhận.

## Nguồn dữ liệu

`00_RAW_DATA/1. 2. ĐLVN/` (cũ) → đã chuyển tới `03_DLVN/ĐLVN_QuyTrinh/`.

## Chủ đề liên quan

- [Phap-ly.md](Phap-ly.md) — Luật Đo lường 2011 và các Nghị định/Thông tư hướng dẫn (ND 86/2012, ND 105/2016, TT 54/2025...) là căn cứ pháp lý cho việc áp dụng ĐLVN.
- [Do-luong-khong-khi/README.md](Do-luong-khong-khi/README.md) — nhiều ĐLVN nhóm 283–326 trùng chủ đề đo khí/bụi với cụm này.
- TCVN (chưa triển khai Wiki) — nhiều ĐLVN dẫn chiếu hoặc tương đương TCVN/ISO tương ứng.
