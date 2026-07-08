---
title: "Wiki 08_KNOWLEDGE_GRAPH — Mục lục trung tâm"
type: Wiki-Index
status: Hoan-thanh-dot-1
last_updated: "08/07/2026"
---

# Wiki — Kho tri thức ETV (08_KNOWLEDGE_GRAPH)

Mục lục trung tâm của Wiki tri thức, tổng hợp từ dữ liệu thô từng nằm trong `00_RAW_DATA/`. Wiki chỉ tóm tắt và trỏ nguồn — không thay thế tài liệu gốc.

**Quy tắc:** mỗi trang chủ đề chỉ chứa nội dung suy ra được từ tài liệu Raw thực tế đã khảo sát; phần chưa khảo sát/chưa rõ được ghi là *"chưa đủ dữ liệu"* thay vì suy đoán. Xem quy tắc thư mục tại [08_KNOWLEDGE_GRAPH/README.md](../README.md).

---

## Trạng thái tổng thể

**Toàn bộ ~9.011 file trong `00_RAW_DATA` đã được khảo sát, phân loại và di chuyển** vào các thư mục đích (`01_Regulations`, `02_ISO`, `03_DLVN`, `04_TCVN`, `05_ILAC`, `12_International`, `14_Technical_References`, `15_HDSD_ThietBi`). `00_RAW_DATA` hiện chỉ còn 1 thư mục rác (`_files` sinh ra khi lưu Word dạng trang web, không có nội dung) — xem chi tiết đợt xử lý trong [change-log.md](../change-log.md).

**Lưu ý về độ sâu xử lý:** đây là lượt phân loại đầu tiên trên toàn bộ dữ liệu, ưu tiên tốc độ và độ bao phủ hơn đọc sâu từng file. Với các cụm nhỏ/vừa (dưới ~200 file), nhiều tài liệu nền tảng đã được đọc trực tiếp. Với các cụm rất lớn (ĐLVN, TCVN, Performance Test, TLTK Chuẩn Bụi, HDSD Thiết bị), Wiki dừng ở mức **catalog theo cấu trúc thư mục và tên file** — chưa đọc nội dung chi tiết từng tài liệu. Mỗi trang đều ghi rõ phần nào đã đọc, phần nào chỉ suy từ tên file.

| Cụm chủ đề | Số file | Thư mục đích | Trang Wiki |
|---|---|---|---|
| Đo lường & hiệu chuẩn không khí | 129 | `14_Technical_References/01_KhongKhi/` | [Do-luong-khong-khi/README.md](Do-luong-khong-khi/README.md) |
| Pháp lý (Luật, Nghị định, Thông tư, VB KHCN) | 355 | `01_Regulations/` | [Phap-ly.md](Phap-ly.md) |
| ĐLVN | 666 | `03_DLVN/` | [DLVN.md](DLVN.md) |
| TCVN | 231 | `04_TCVN/` | [TCVN.md](TCVN.md) |
| ISO mua/áp dụng | 40 | `02_ISO/` | [ISO-MuaApDung.md](ISO-MuaApDung.md) |
| Công nhận PTN (BoA, A2LA, ANAB, ILAC, EA) | 226 | `05_ILAC/` | [ILAC-CongNhan.md](ILAC-CongNhan.md) |
| Quốc tế khác (EPA, BS EN, OIML, VIM/GUM, APHA, ASTM, SMEWW, mCERTs, IUPAC) | 92 | `12_International/` | [Quoc-te-khac.md](Quoc-te-khac.md) |
| Chất chuẩn (RM/CRM), RMP, thử nghiệm thành thạo | 71 | `14_Technical_References/02_ChatChuan/` | [ChatChuan-PT.md](ChatChuan-PT.md) |
| Đo lường vật lý (pha loãng, thể tích, lưu lượng, gió, nhiệt, ồn, khối lượng, Hg) | 310 | `14_Technical_References/03_VatLy/` | [Do-luong-vat-ly.md](Do-luong-vat-ly.md) |
| Đo lường nước | 197 | `14_Technical_References/04_Nuoc/` | [Do-luong-nuoc.md](Do-luong-nuoc.md) |
| Lĩnh vực chuyên ngành (GTVT khí thải xe, Y tế) | 100 | `14_Technical_References/05_LinhVuc/` | [LinhVuc-ChuyenNganh.md](LinhVuc-ChuyenNganh.md) |
| Performance Test / RATA | 458 | `14_Technical_References/06_PerformanceTest/` | [Performance-Test.md](Performance-Test.md) |
| TLTK Chuẩn Bụi (R&D chuẩn bụi) | 788 | `14_Technical_References/07_TLTK_ChuanBui/` | [TLTK-ChuanBui.md](TLTK-ChuanBui.md) |
| Tài liệu chung (hiệu chuẩn tổng quát + 1 QĐ pháp lý) | 17 | `14_Technical_References/08_TaiLieuChung/`, `01_Regulations/` | [TaiLieuChung.md](TaiLieuChung.md) |
| HDSD thiết bị (đã xoá ~2.982 file phần mềm/log lẫn vào, giữ lại 2.328) | 2.328 | `15_HDSD_ThietBi/` | [HDSD-ThietBi.md](HDSD-ThietBi.md) |
| **Tổng (sau khi xoá phần mềm/log rác)** | **~6.028** | | |

---

## Vấn đề cần rà soát tiếp (ưu tiên cao, tổng hợp từ các trang)

1. ~~`15_HDSD_ThietBi/` — ~2.982 file phần mềm/log dữ liệu thô~~ **Đã xử lý:** xoá khỏi ổ đĩa theo yêu cầu người dùng (bao gồm cả ~242 tài liệu thật lẫn trong đó, đã báo cáo trước khi xoá) — xem [HDSD-ThietBi.md](HDSD-ThietBi.md) và [change-log.md](../change-log.md).
2. **Dữ liệu dự án/khách hàng lẫn trong tài liệu tham khảo chung**: `14_Technical_References/06_PerformanceTest/ChuGai techno/` (337 file — dự án Acecook, Vĩnh Tân), `14_Technical_References/07_TLTK_ChuanBui/MTLD_Dong Nai/`, một số thư mục trong `15_HDSD_ThietBi/` (Formosa Hà Tĩnh, AIC Hưng Yên/Hải Dương, Vĩnh Phúc). Nên tách khỏi thư viện tham khảo chung nếu xác nhận đúng là hồ sơ khách hàng.
3. **Trùng lặp file chưa dọn:** ISO 17034 (giữa `02_ISO/` gốc và `ISO_MuaApDung/`), TCVN 7366/7962/8245/8890 (giữa `ChatChuan-PT.md` hai thư mục con), `ps-8a...` (giữa CEMS và Tài liệu chung), `QAM-I-111rev7condmeter.pdf` (giữa Độ đục và EC trong cụm Nước).
4. **BoA (`05_ILAC/BoA/`)** có nhiều tài liệu trùng mã số nhưng khác phiên bản (2020 vs 2025) chưa xác định bản hiệu lực — quan trọng vì đây là quy định công nhận trực tiếp áp dụng cho ETV.
5. Danh mục tra cứu chính thức chưa khai thác: `03_DLVN/ĐLVN_QuyTrinh/Danh mục DLVN.docx` (đã khai thác một phần), `04_TCVN/TCVN_TieuChuan/Danh muc TCVN. QCVN 2014.pdf` (**chưa mở**).

---

## Tất cả trang Wiki

- [Do-luong-khong-khi/README.md](Do-luong-khong-khi/README.md) — Ozone, BTEX/VOC, CEMS, DOAS, NOx/SO2, HC vòng quay, khí cầm tay, barometer
- [Phap-ly.md](Phap-ly.md) — Luật, Nghị định, Thông tư, VB KHCN
- [DLVN.md](DLVN.md) — Văn bản kỹ thuật Đo lường Việt Nam
- [TCVN.md](TCVN.md) — Tiêu chuẩn quốc gia Việt Nam
- [ISO-MuaApDung.md](ISO-MuaApDung.md) — ISO mua/áp dụng
- [ILAC-CongNhan.md](ILAC-CongNhan.md) — BoA, A2LA, ANAB, ILAC/APLAC, EA
- [Quoc-te-khac.md](Quoc-te-khac.md) — EPA, BS EN, OIML, VIM/GUM, APHA, ASTM, SMEWW, mCERTs, IUPAC
- [ChatChuan-PT.md](ChatChuan-PT.md) — RM/CRM, RMP, thử nghiệm thành thạo
- [Do-luong-vat-ly.md](Do-luong-vat-ly.md) — pha loãng, thể tích, lưu lượng, gió, nhiệt, ồn, khối lượng, Hg
- [Do-luong-nuoc.md](Do-luong-nuoc.md) — pH, DO, TSS, EC, TDS, NO3, TOC, UV, COD, AAS...
- [LinhVuc-ChuyenNganh.md](LinhVuc-ChuyenNganh.md) — GTVT khí thải xe, Y tế
- [Performance-Test.md](Performance-Test.md) — RATA, hiệu năng CEMS
- [TLTK-ChuanBui.md](TLTK-ChuanBui.md) — nghiên cứu phát triển chuẩn bụi
- [TaiLieuChung.md](TaiLieuChung.md) — sổ tay hiệu chuẩn tổng quát
- [HDSD-ThietBi.md](HDSD-ThietBi.md) — hướng dẫn sử dụng thiết bị

## Liên kết liên quan

- [08_KNOWLEDGE_GRAPH/README.md](../README.md) — quy tắc phân loại thư mục của kho tri thức.
- [change-log.md](../change-log.md) — nhật ký các đợt xử lý Raw → Wiki.
