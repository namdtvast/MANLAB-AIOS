# Change Log — 08_KNOWLEDGE_GRAPH

Nhật ký các đợt xử lý dữ liệu thô (`00_RAW_DATA/`) → Wiki (`Wiki/`) và thư mục đích phân loại.

---

## 2026-07-08 — Thí điểm cụm "Đo lường & hiệu chuẩn không khí"

**Phạm vi:** 9 thư mục con của `00_RAW_DATA` thuộc nhóm mã số cũ 1.1–1.8 (Ozone, BTEX, CEMS, DOAS, NO, SO2, HC vòng quay, Khí cầm tay, Barometer) — 129 file.

**Thực hiện:**
1. Khảo sát toàn bộ tên file/cấu trúc thư mục của 9 cụm; đọc trực tiếp 6 tài liệu nền tảng để lấy nội dung thật (ASTM D5110, EPA Ozone UV method, TCVN 5976-1995, SO2 SOP Alaska, CEMS Regs Overview, JMA Barometer theory) và tài liệu OSHA về khí cầm tay.
2. Tạo thư mục đích mới **`14_Technical_References/01_KhongKhi/`** trong `08_KNOWLEDGE_GRAPH` (không dùng các thư mục 01_Regulations…13_QCVN có sẵn vì bản chất là tài liệu kỹ thuật/thông số đo, không phải văn bản pháp lý hay tiêu chuẩn quốc gia).
3. Di chuyển nguyên trạng 9 thư mục (giữ tên file gốc, giữ cấu trúc thư mục con như `CEMS/Dr. Fosdisch/`, `CEMS/From ABB (Bang)/`...) từ `00_RAW_DATA/` sang `14_Technical_References/01_KhongKhi/`.
4. Dựng `Wiki/index.md` làm mục lục trung tâm, `Wiki/Do-luong-khong-khi/README.md` làm trang tổng quan cụm, và 8 trang chủ đề con (Ozone, BTEX-VOC, CEMS, DOAS, NOx-SO2, HC-VongQuay, Khi-CamTay, Barometer), có liên kết chéo và ghi nguồn Raw cho từng mục.

**Vấn đề phát hiện, chưa xử lý (để lại cho lượt sau):**
- File `NOx_SO2/NO/2006-104_khi cam tay.pdf` nghi ngờ thuộc chủ đề "Khí cầm tay" hơn là "NO" — chưa xác nhận nội dung, chưa di chuyển lại.
- `CEMS/From ABB (Bang)/CGA/Application/` có nhiều file trùng tên giữa thư mục gốc và các thư mục con `Cement/`, `Power plant/` — nghi ngờ trùng lặp nội dung, chưa xác minh bằng checksum, chưa xoá.
- File `.doc` nhị phân (`HC_VongQuay/QTHC-Toc do vong quay_TAV.doc`, `Barometer/P2(03)partA_Milinkovic.doc`) và ảnh trong `HC_VongQuay/TT Group/` chưa đọc được nội dung bằng công cụ hiện có — Wiki chỉ ghi "chưa đủ dữ liệu".
- Nhiều file trong `CEMS/` (đặc biệt các thư mục hãng ABB/Dr. Fosdisch/CKY) chỉ được liệt kê theo tên, chưa mở đọc từng file — vì đây là catalogue thương mại số lượng lớn (33+11+6 file), ưu tiên thấp hơn tài liệu tiêu chuẩn/quy định.

**Trạng thái sau đợt này:** `00_RAW_DATA` còn lại khoảng 8.870 file / ~51 thư mục chưa xử lý. Xem bảng tiến độ đầy đủ tại [Wiki/index.md](Wiki/index.md).

---

## 2026-07-08 — Phân loại toàn bộ phần còn lại của `00_RAW_DATA` (~8.882 file)

Tiếp nối đợt thí điểm ở trên, xử lý hết toàn bộ ~51 thư mục còn lại theo yêu cầu "tiếp tục phân loại tất cả".

**Phạm vi và kết quả theo cụm:**

| Cụm | Số file | Thư mục đích |
|---|---|---|
| Pháp lý (Luật, Nghị định, Thông tư, VB KHCN) | 355 | `01_Regulations/{Luat,Nghi_dinh,Thong_tu,VB_KHCN}/` |
| ĐLVN | 666 | `03_DLVN/ĐLVN_QuyTrinh/` |
| TCVN | 231 | `04_TCVN/TCVN_TieuChuan/` |
| ISO mua/áp dụng | 40 | `02_ISO/ISO_MuaApDung/` |
| Công nhận PTN (BoA, A2LA, ANAB, ILAC/APLAC, EA) | 226 | `05_ILAC/{BoA,A2LA_US,ANAB_TranscatScopes,ILAC_APLAC,EA}/` |
| Quốc tế khác (EPA, BS EN, OIML, VIM/GUM, APHA, ASTM, SMEWW, mCERTs, IUPAC) | 92 | `12_International/` (thư mục mới tạo) |
| Chất chuẩn/RMP/thử nghiệm thành thạo | 71 | `14_Technical_References/02_ChatChuan/` (mới) |
| Đo lường vật lý | 310 | `14_Technical_References/03_VatLy/` (mới) |
| Đo lường nước | 197 | `14_Technical_References/04_Nuoc/` (mới) |
| Lĩnh vực chuyên ngành (GTVT, Y tế) | 100 | `14_Technical_References/05_LinhVuc/` (mới) |
| Performance Test / RATA | 458 | `14_Technical_References/06_PerformanceTest/` (mới) |
| TLTK Chuẩn Bụi | 788 | `14_Technical_References/07_TLTK_ChuanBui/` (mới) |
| Tài liệu chung + 1 văn bản pháp lý mới (QĐ 33/2026/QĐ-TTg — Danh mục hệ thống AI rủi ro cao) | 17 | `14_Technical_References/08_TaiLieuChung/`, `01_Regulations/` |
| HDSD thiết bị | 5.310 | `15_HDSD_ThietBi/` (mới, top-level) |

**Thực hiện:** khảo sát cấu trúc thư mục/tên file cho từng cụm (đọc trực tiếp một số tài liệu nền tảng ở các cụm nhỏ: ĐLVN 76:2001, danh mục DLVN.docx ~208 mục, Quyết định 33/2026/QĐ-TTg); di chuyển nguyên trạng giữ cấu trúc thư mục con gốc; viết 12 trang Wiki chủ đề mới; cập nhật `Wiki/index.md` thành bảng tổng hợp đầy đủ; cập nhật `08_KNOWLEDGE_GRAPH/README.md` với các thư mục đích mới.

**Phát hiện quan trọng:**
- **`15_HDSD_ThietBi/`: ~3.292/5.310 file (62%) thực chất là gói cài đặt phần mềm và log dữ liệu thô của thiết bị** (`3. Luu luong_Khi/0. ISOKINETIC/ESC A-2000/A2000 phan men/` — 2.278 file cài đặt NI FieldPoint; `2. Khi/3. Tram khong khi xung quanh/Opsis/alibaba5/` — 1.014 file phần mềm/log Opsis), không phải tài liệu. Đã di chuyển nguyên trạng nhưng gắn cờ rõ trong Wiki, chưa xử lý tiếp (giữ/chuyển kho khác/xoá).
- Một số thư mục trong các cụm lớn là **dữ liệu dự án/khách hàng cụ thể** bị lẫn vào tài liệu tham khảo chung: `14_Technical_References/06_PerformanceTest/ChuGai techno/` (337 file — dự án Acecook, Vĩnh Tân), `TLTK_ChuanBui/MTLD_Dong Nai/`, vài thư mục trong HDSD (Formosa Hà Tĩnh, AIC Hưng Yên/Hải Dương, Vĩnh Phúc) — chưa tách ra do có thể chứa thông tin khách hàng nhạy cảm, cần quyết định của người phụ trách.
- Nhiều cặp trùng lặp phát hiện nhưng chưa xoá (ISO 17034, TCVN mẫu chuẩn giữa 2 thư mục con, `ps-8a`, `QAM-I-111rev7condmeter.pdf`) — xem chi tiết từng trang Wiki liên quan.
- Junk 1 thư mục `01_Regulations/Luat/2011. Luật Đo lường..._files/` (rác lưu Word dạng web) **cố ý để lại nguyên vị trí cũ trong `00_RAW_DATA/1. 4. Luat/`**, không di chuyển vì không có nội dung.

**Chưa xử lý (để lại cho lượt sau):** rà soát sâu nội dung các cụm lớn (ĐLVN, TCVN, Performance Test, TLTK Chuẩn Bụi, HDSD) vì lượt này ưu tiên tốc độ/độ bao phủ hơn đọc chi tiết; xử lý dữ liệu phần mềm/dự án đã gắn cờ ở trên; dọn trùng lặp; mở `Danh muc TCVN. QCVN 2014.pdf` để đối chiếu số hiệu TCVN như đã làm với `Danh mục DLVN.docx`.

**Trạng thái sau đợt này:** `00_RAW_DATA` chỉ còn 1 thư mục rác không nội dung (`1. 4. Luat/2011. Luật Đo lường..._files/`) — toàn bộ ~9.011 file thực đã được phân loại. Xem bảng đầy đủ tại [Wiki/index.md](Wiki/index.md).

---

## 2026-07-08 — Xoá gói cài phần mềm .exe lẫn trong HDSD thiết bị

Xoá `15_HDSD_ThietBi/4. Bui/Phan mem Durag/gD-ESI_100_01.11R0018_DB_01.03R0018_setup.exe` (245MB, gói cài đặt phần mềm hãng Durag — không phải tài liệu hướng dẫn sử dụng) theo yêu cầu. Xoá khỏi ổ đĩa, không chỉ khỏi git — đã gỡ dòng tương ứng khỏi `.gitignore` gốc repo vì không còn cần thiết. Thư mục `Phan mem Durag/` rỗng sau khi xoá cũng đã được dọn.

**Còn lại chưa xử lý:** các gói phần mềm/log khác đã gắn cờ trong đợt trước (`ESC A-2000/A2000 phan men/` — 2.278 file cài đặt NI FieldPoint, `Opsis/alibaba5/` — 1.014 file phần mềm/log Opsis, và `Phan mem Dynoptic 3xx/` + `.rar` trong cùng thư mục `4. Bui/`) — chưa xoá, chờ quyết định riêng.

---

## 2026-07-08 — Xoá toàn bộ gói phần mềm/log còn lại trong HDSD thiết bị

Theo yêu cầu tiếp theo, xoá nốt 5 mục đã gắn cờ ở trên.

**Đính chính quan trọng:** trước khi xoá, kiểm tra lại kỹ hơn cho thấy 3 thư mục này **không phải thuần phần mềm/log** như đã ghi ở đợt trước — có lẫn tài liệu thật (đã khôi phục tạm từ git để kiểm tra, xác nhận rồi mới xoá lại theo xác nhận của người dùng "không cần dùng"):

| Đường dẫn | Tổng file | Trong đó là rác (cài đặt/log) | Trong đó là tài liệu thật (đã xoá theo yêu cầu) | Dung lượng |
|---|---|---|---|---|
| `3. Luu luong_Khi/0. ISOKINETIC/ESC A-2000/A2000 phan men/` | 1.958 | ~1.740 (.msi/.cab/.mst nội bộ trình cài) | **~216** (sổ tay NI FieldPoint đa ngôn ngữ, chứng chỉ hiệu chuẩn A2000/Venturi, dữ liệu hiệu chuẩn orifice) | 332MB |
| `2. Khi/3. Tram khong khi xung quanh/Opsis/alibaba5/` | 1.014 | 995 (.exe/.dll/.msi + log dữ liệu thô độc quyền .dta/.txt/.so2/.o3/.no2...) | **19** (quy trình hiệu chuẩn, lịch bảo trì, tài liệu khuyến cáo — trạm Lãng Bạc) | 64MB |
| `4. Bui/Phan mem Dynoptic 3xx/` | 7 | 2 (.exe cài đặt) | **5** (Installation/Commissioning/Operators Manual — gần như toàn bộ là tài liệu thật) | 12MB |
| `4. Bui/Phan mem Dynoptic 3xx.rar` | 1 | 1 (bản nén của gói trên) | 0 | 11MB |
| `2. Khi/2. Tram khi thai tu dong/1. Bui/Phan mem Dynoptic 3xx/` | 2 | 0 | **2** (2 manual trùng bản với bản trên) | 0.75MB |

Tổng cộng ~420MB / 2.982 file đã xoá khỏi ổ đĩa, trong đó **~242 file là tài liệu thật đã bị xoá theo yêu cầu tường minh của người dùng** ("Xoá 3 thư mục này, tôi không cần dùng") sau khi đã được báo cáo rõ về tỉ lệ tài liệu/rác trong từng thư mục — không phải xoá nhầm.

**Chưa rà soát:** phần "dữ liệu dự án/khách hàng cụ thể" (Formosa Hà Tĩnh, AIC Hưng Yên/Hải Dương, Vĩnh Phúc, Acecook, Vĩnh Tân, MTLD Đồng Nai — mục 2 trong "Vấn đề cần rà soát tiếp" của [Wiki/index.md](Wiki/index.md)) vẫn còn nguyên, chưa xử lý.

---

## Quy ước ghi log

Mỗi đợt xử lý ghi: ngày, phạm vi (thư mục/số file), các bước đã làm, vấn đề phát hiện nhưng chưa xử lý, và số liệu còn lại trong `00_RAW_DATA`.
