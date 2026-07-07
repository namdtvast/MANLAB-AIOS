# Tri thức — Mã hoá & thể thức văn bản

> Quy định gốc: `ETV.P14` VI.1 (Phân loại văn bản) và VI.3 (Thể thức trình bày). File này là tra cứu nhanh cho AI, không thay thế thủ tục.

## Bảng mã hoá

| Loại văn bản | Ký hiệu | Ví dụ |
|---|---|---|
| Sổ tay chất lượng | `ETV.QM` | ETV.QM |
| Thủ tục | `ETV.P xx` | ETV.P 14 |
| Biểu mẫu của thủ tục | `ETV.P.F xx.yy` | ETV.P.F 14.01 |
| Quy trình hiệu chuẩn | `ETV.MCa xx` | ETV.MCW 01 |
| Quy trình thử nghiệm | `ETV.MTa xx` | ETV.MTP 01 |
| Quy trình kiểm định | `ETV.MVa xx` | ETV.MVA 01 |
| Hướng dẫn | `ETV.Gb xx` | ETV.GI 01 |
| Biểu mẫu của quy trình/hướng dẫn | `ETV.MCa.F xx.yy` / `ETV.Gb.F xx.yy` | ETV.MTP.F 01.01 |

`a`/`b` = lĩnh vực/phân loại: A-Không khí, W-Nước, M-Khối lượng, F-Lưu lượng, O-Quang, S-Thời gian-Tần số, T-Nhiệt độ, P-Áp suất, E-Điện, H-Độ ẩm.

> Hợp đồng (mã `ETV.HĐ.*`) **không** thuộc P14 — quy tắc mã hoá hợp đồng do P03/P07 quy định. Nếu gặp hợp đồng, định tuyến về các thủ tục đó (xem `CLAUDE.md` bước 1).

## Thể thức — hai nhóm KHÔNG dùng chung quy tắc

### Nhóm 1 — Văn bản hành chính (Quyết định/Công văn/Thông báo/Biên bản/Báo cáo)
Bắt buộc theo Phụ lục I, Nghị định 30/2020/NĐ-CP: Quốc hiệu—Tiêu ngữ, tên cơ quan ban hành, số/ký hiệu, địa danh—ngày tháng, trích yếu, nơi nhận, chữ ký, nơi nhận cuối văn bản. Dùng `templates/quyet_dinh.md`, `cong_van.md`, `thong_bao.md`, `bien_ban.md`, `bao_cao.md`.

### Nhóm 2 — Tài liệu HTQL (Sổ tay/Thủ tục/Quy trình/Hướng dẫn/Biểu mẫu)
ETV tự quy định (không trái luật):
- Font Times New Roman, cỡ 12 (trừ trường hợp đặc biệt); tiêu đề in đậm.
- Line spacing: single; spacing before 6pt/after 0pt (bảng: before/after 3pt).
- Lề: trên 2cm, dưới 2cm, trái 2,5cm, phải 2cm; header/footer 1cm.
- Trang đầu: theo mẫu trang bìa chuẩn (xem `templates/thu_tuc.md`); không đánh số trang.
- Từ trang 2: header = tên đầy đủ tài liệu (Times New Roman 10, đậm, gạch chân, spacing after 3pt); footer = mã số | lần BH | ngày BH | soát xét | trang/tổng số (Times New Roman 10, đậm, gạch chân, spacing before 3pt).
- Ban hành lại → tăng lần ban hành +1. Biểu mẫu soát xét riêng (thủ tục chưa ban hành lại) → chỉ ghi ngày soát xét ở footer biểu mẫu.

## Dấu hiệu kiểm soát (bản giấy)
"TÀI LIỆU KIỂM SOÁT" (còn hiệu lực) / "TÀI LIỆU KHÔNG KIỂM SOÁT" hoặc cắt góc phải (hết hiệu lực). Bản photo của bản có dấu kiểm soát → tự động thành không kiểm soát.
