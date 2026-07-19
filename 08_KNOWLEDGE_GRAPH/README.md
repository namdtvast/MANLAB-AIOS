# 08 — KNOWLEDGE GRAPH ⭐ (Kho tri thức & Tiêu chuẩn)

**Ý nghĩa:** Tri thức có cấu trúc để AI đọc: quy định, tiêu chuẩn kỹ thuật, ontology, vector. Đây là **thư viện tham chiếu** — phân biệt với `03_MANAGEMENT_SYSTEM` là chuẩn mực kiểm soát nội bộ.

**Wiki:** bản tóm tắt có cấu trúc, dễ đọc của dữ liệu thô nằm tại [`Wiki/index.md`](Wiki/index.md). Wiki được dựng dần theo từng cụm chủ đề từ `00_RAW_DATA/` — xem tiến độ tại [`change-log.md`](change-log.md).

---

## Cấu trúc thư mục

| Thư mục | Lưu gì | Nguồn Dropbox cũ |
|---------|--------|------------------|
| `00_RAW_DATA/` | Tài liệu thô chưa phân loại, chờ xử lý vào Wiki + thư mục đích | Đồng bộ trực tiếp từ Dropbox cũ |
| `01_Regulations/` | Văn bản QPPL: Luật, Nghị định, Thông tư, Quyết định | `TAI LIEU/1.4.*`, `TLTK/0.VBQPPL/` |
| `02_ISO/` | Tiêu chuẩn ISO (17025, 9001, 27001, 42001…) | `TAI LIEU/2.2.ISO/`, `TLTK/ISO/` |
| `03_DLVN/` | Văn bản kỹ thuật đo lường VN (ĐLVN) | `TAI LIEU/1.2.ĐLVN/`, `TLTK/7.DLVN/` |
| `04_TCVN/` | Tiêu chuẩn quốc gia Việt Nam | `TAI LIEU/1.3.TCVN/`, `TLTK/5.TCVN/` |
| `05_ILAC/` | Tài liệu ILAC, APAC, EA, A2LA, ANAB | `TAI LIEU/2.6.ILAC/`, `2.5.*`, `2.8.*` |
| `06_FAQ/` | Câu hỏi thường gặp từ khách hàng & đánh giá viên | Mới tạo |
| `07_Case_Study/` | Tình huống thực tế, bài học từ đánh giá | Mới tạo |
| `08_Ontology/` | Khái niệm và quan hệ trong lĩnh vực đo lường | Mới tạo |
| `09_Embedding/` | Vector nhúng cho tra cứu ngữ nghĩa | Mới tạo |
| `10_Vector_DB/` | CSDL vector (Chroma, Qdrant…) | Mới tạo |
| `11_Lessons_Learned/` | Bài học kinh nghiệm tổng hợp | Mới tạo |
| `12_International/` | EPA (US), OIML, BS EN, APHA, ASTM, SMEWW, VIM/GUM, mCERTs | `TAI LIEU/2.1.*`, `2.3–2.9.*` |
| `13_QCVN/` | Quy chuẩn kỹ thuật quốc gia | `TAI LIEU/1.3.QCVN/`, `TLTK/6.QCVN/` |
| `14_Technical_References/` | Tài liệu kỹ thuật theo thông số đo (không phải văn bản pháp lý/tiêu chuẩn quốc gia): nguyên lý, SOP hiệu chuẩn, catalogue hãng. 8 nhóm con: `01_KhongKhi` (Ozone/BTEX/CEMS/DOAS/NOx-SO2...), `02_ChatChuan` (RM/CRM, RMP, thử nghiệm thành thạo), `03_VatLy` (pha loãng, thể tích, lưu lượng, gió, nhiệt, ồn, khối lượng, Hg), `04_Nuoc` (pH, DO, TSS, EC, TDS, NO3, TOC, UV, COD, AAS...), `05_LinhVuc` (GTVT khí thải xe, Y tế), `06_PerformanceTest` (RATA), `07_TLTK_ChuanBui` (R&D chuẩn bụi), `08_TaiLieuChung` | Phân loại từ `00_RAW_DATA/`, xem [change-log.md](change-log.md) |
| `15_HDSD_ThietBi/` | Hướng dẫn sử dụng/catalogue thiết bị theo hãng — **lưu ý:** ~62% hiện là gói cài đặt phần mềm/log dữ liệu thô lẫn vào, chưa dọn (xem [Wiki/HDSD-ThietBi.md](Wiki/HDSD-ThietBi.md)) | Phân loại từ `00_RAW_DATA/4. HDSD`, xem [change-log.md](change-log.md) |
| `Wiki/` | Tóm tắt có cấu trúc, liên kết chéo, trỏ nguồn — không thay thế tài liệu gốc | Biên soạn từ `00_RAW_DATA/` |

---

## Phân loại nhanh — đặt vào thư mục nào?

| Tài liệu | Thư mục |
|----------|---------|
| Luật BVMT, Luật ĐLCL, Nghị định | `01_Regulations/` |
| ISO 17025:2017, ISO 9001, bản mua từ STAMEQ | `02_ISO/` |
| ĐLVN 117, ĐLVN 160... | `03_DLVN/` |
| TCVN 6000, TCVN 7876... | `04_TCVN/` |
| QCVN 05/MT, QCVN 08/MT... | `13_QCVN/` |
| ILAC-G8, P14, EA-4/02, A2LA R205... | `05_ILAC/` |
| EPA Method 18, ASTM D1067, SMEWW 4500... | `12_International/` |
| VIM (JCGM 200), GUM (JCGM 100), OIML | `12_International/` |
| Tài liệu kỹ thuật/SOP hiệu chuẩn theo thông số đo (không phải văn bản luật/tiêu chuẩn), catalogue hãng thiết bị | `14_Technical_References/` |

---

## KHÔNG lưu ở đây

| Loại tài liệu | Lưu đúng chỗ |
|---------------|-------------|
| Sổ tay chất lượng, thủ tục nội bộ ETV | → `03_MANAGEMENT_SYSTEM/` |
| Hồ sơ đăng ký BoA dựa trên tiêu chuẩn | → `11_COMPLIANCE/boa/` |
| Tài liệu vi phạm bản quyền (bản scan lậu) | Không lưu |
| Dữ liệu khách hàng/dự án/quyết định đang sống (hợp đồng, biên bản họp, tiến độ dự án cụ thể) | → dữ liệu nghiệp vụ của module tương ứng (`05_MODULE_LIBRARY/Mxx_Slug/08_Source/`) — không đưa vào Wiki/Ontology dùng chung, xem [`07_AI_OPERATING_SYSTEM/04_Memory/README.md`](../07_AI_OPERATING_SYSTEM/04_Memory/README.md) |

---

**Định dạng ưu tiên:** `.md`, `.txt`, `.json` (AI đọc được). File PDF lưu kèm summary `.md` cùng tên.  
**Lưu ý:** `03_MANAGEMENT_SYSTEM` = luật chơi ETV phải tuân theo; `08_KNOWLEDGE_GRAPH` = kho tra cứu để hiểu luật chơi đó. `00_RAW_DATA` = vùng đệm chờ phân loại — tính đến 08/07/2026 đã rỗng (chỉ còn 1 thư mục rác không nội dung), toàn bộ ~9.011 file đã có Wiki + vị trí đích; xem [Wiki/index.md](Wiki/index.md) để biết cụm nào cần rà soát sâu thêm.
