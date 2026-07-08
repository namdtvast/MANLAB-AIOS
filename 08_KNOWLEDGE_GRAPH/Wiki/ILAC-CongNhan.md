---
title: "Công nhận PTN — BoA, ILAC/APLAC, A2LA, ANAB, EA"
type: Wiki-Topic
status: Da-bien-soan
source_raw: "08_KNOWLEDGE_GRAPH/00_RAW_DATA (1.1 BoA, 2.5 A2LA US, 2.5 ANAB, 2.6 ILAC, 2.8 EA — đã di chuyển)"
source_now: "08_KNOWLEDGE_GRAPH/05_ILAC/{BoA,A2LA_US,ANAB_TranscatScopes,ILAC_APLAC,EA}/"
file_count: 226
last_updated: "08/07/2026"
---

# Công nhận PTN — BoA, ILAC/APLAC, A2LA, ANAB, EA

← [Wiki/index.md](index.md)

## Tóm tắt

226 file về công nhận phòng thí nghiệm (PTN), đã di chuyển sang `05_ILAC/`. Quan trọng nhất là **BoA** — cơ quan công nhận trực tiếp của ETV (VILAS) — chứa toàn bộ chính sách/thủ tục hiện hành mà ETV phải tuân thủ để duy trì công nhận. Các phần còn lại (A2LA, ANAB, ILAC/APLAC, EA) là tài liệu tham khảo quốc tế.

## BoA — Văn phòng Công nhận Chất lượng (89 file, `BoA/`)

Đây là **bộ tài liệu vận hành công nhận trực tiếp áp dụng cho ETV** (không phải tài liệu tham khảo xa) — cơ quan công nhận VILAS mà ETV đăng ký. Tổ chức theo mã hồ sơ BoA:

| Thư mục (mã BoA) | Số file | Nội dung |
|---|---|---|
| `AR/` (+ bản trong `VIRAS - Mau chuan/`) | 5+13 | Quy tắc chung về công nhận, sử dụng logo/biểu tượng công nhận, chính sách liên kết chuẩn đo lường, chính sách độ không đảm bảo đo trong hiệu chuẩn, chính sách tham gia thử nghiệm thành thạo (PT/so sánh liên phòng) — **văn bản nền tảng nhất** |
| `AGL/` | 21 | Yêu cầu/hướng dẫn đánh giá theo lĩnh vực: phân loại lĩnh vực hiệu chuẩn, cơ cấu tính phí đánh giá, yêu cầu riêng lĩnh vực Sinh học, hướng dẫn diễn đạt độ không đảm bảo đo (MU), hướng dẫn cho chuyên gia kỹ thuật |
| `ARL/` | 16 | Quy định phân loại lĩnh vực thử nghiệm/hiệu chuẩn, quy định tính phí đánh giá PTN, yêu cầu bổ sung theo lĩnh vực (Hoá, Sinh, An toàn sinh học cấp 3) |
| `AFL/` | 11 | Biểu mẫu đánh giá: danh mục phép thử được công nhận, phiếu hỏi, biên bản quan sát kỹ năng, mô tả phát hiện, đăng ký chuyên gia đánh giá |
| `APL/` | 8 | Thủ tục đánh giá PTN, thủ tục khiếu nại, thủ tục yêu cầu xem xét lại, kiểm soát kết quả thử nghiệm thành thạo, chính sách liên kết chuẩn |
| `ARLM - Y te/` | 6 | Yêu cầu bổ sung cho lĩnh vực xét nghiệm y tế, phân loại xét nghiệm y tế, cách tính phí đánh giá PTN y tế |
| `VIRAS - Mau chuan/` | 13 | Bộ AR (bản tiếng Anh, phiên bản mới v3.25–v5.25) áp dụng cho công nhận **nhà sản xuất mẫu chuẩn (RMP)** — gồm cả `APRM 01` (thủ tục đánh giá công nhận RMP) |
| `Van ban phap ly/` | 1 | Thông tư 21/2010 — Quản lý hoạt động công nhận (căn cứ pháp lý cho hoạt động của BoA) |
| Rời (`AGC 07`, `AGI 05`, `aGLM_01`) | 3 | Hướng dẫn đánh giá phi công nhận; yêu cầu bổ sung giám định theo ISO 17020; yêu cầu bổ sung xét nghiệm y tế |
| `AGI_Giam dinh/` | 0 (rỗng) | — |

> **Lưu ý:** nhiều mã AR/AGL/ARL xuất hiện ở 2 nơi với version khác nhau (ví dụ `AR_02_...` trong cả `ARL/` lẫn `VIRAS - Mau chuan/`) — đây có vẻ là các đợt cập nhật phiên bản khác nhau (v02.01.2020 vs v5.25) được lưu song song, chưa xác nhận bản nào đang hiệu lực.

## A2LA (Mỹ) — 93 file, `A2LA_US/`

- `17025_SITE_REQ.pdf` — yêu cầu tại chỗ theo ISO/IEC 17025 của A2LA (American Association for Laboratory Accreditation).
- `outputSearchResultsPDF.pdf` — kết quả tra cứu (danh sách PTN được công nhận?), chưa đọc.
- Thư mục `Certification Calibration A2LA/` (phần lớn số file) — tập hợp **chứng chỉ công nhận hiệu chuẩn** của nhiều PTN Mỹ, đặt tên theo mã hồ sơ (vd. `2789-01.pdf`, `3410-01.pdf`) — có vẻ là bộ sưu tập tham khảo/đối chiếu (benchmarking), không phải tài liệu quy định.

## ANAB (Mỹ) — 26 file, `ANAB_TranscatScopes/`

Toàn bộ là **chứng chỉ công nhận + phạm vi công nhận (scope)** của chuỗi phòng hiệu chuẩn thương mại **Transcat** tại nhiều chi nhánh Mỹ/Canada (Dayton, Houston, New England, Philadelphia, Phoenix, Portland, Rochester, San Diego, St Louis, Toronto, Ottawa, Charlotte, Chesapeake, Denver, Pittsburgh, Indianapolis, Los Angeles, Palm Beach Gardens...) cùng vài công ty khác (Alliance Calibration, BioTek, Montreal Dispersion/Ulrich, New Berlin, Pipettes.com, United Scale). **Đây là tài liệu tham khảo/đối chiếu về phạm vi công nhận của một chuỗi PTN thương mại nước ngoài**, không phải tiêu chuẩn hay quy định — có giá trị tham khảo cách trình bày scope of accreditation.

## ILAC / APLAC — 9 file, `ILAC_APLAC/`

- `ILAC_G17_2002` — hướng dẫn khái niệm độ không đảm bảo đo (introduction to uncertainty concept)
- `ILAC_P10_01_2013`, `ILAC_P14_01_2013` — chính sách ILAC về liên kết chuẩn đo lường và độ không đảm bảo đo trong hiệu chuẩn
- `JCGM_100_2008` (GUM) — đánh giá dữ liệu đo, hướng dẫn trình bày độ không đảm bảo đo
- `JCGM_200_2012` (VIM) — từ vựng quốc tế về đo lường
- `aplac_pt_001/002`, `aplac_tc_008`, `Aplac PT_004` — tài liệu APLAC (Asia Pacific Laboratory Accreditation Cooperation) về so sánh liên phòng (hiệu chuẩn & thử nghiệm) và kỹ thuật đo

## EA (Châu Âu) — 9 file, `EA/`

Bộ hướng dẫn hiệu chuẩn thiết bị cụ thể của European co-operation for Accreditation:
- EA-4-02, EA-3-02 — hướng dẫn về độ không đảm bảo đo (hiệu chuẩn)
- EA-4-07 — liên kết chuẩn (traceability)
- EA-10-03 — hiệu chuẩn cân bằng áp suất (pressure balance)
- EA-10-07 — hiệu chuẩn dao động ký (oscilloscope)
- EA-10-08 — hiệu chuẩn cặp nhiệt điện (thermocouple)
- EA-10-09 — đo lường và tạo (measurement and generation — chưa rõ đại lượng cụ thể)
- EA-10-11 — hiệu chuẩn chỉ thị/mô phỏng nhiệt độ bằng điện
- EA-10-13 — hiệu chuẩn bộ hiệu chuẩn khối nhiệt (temperature block calibrator)

## Vấn đề phát hiện, chưa xử lý

- BoA có nhiều cặp tài liệu trùng mã nhưng khác phiên bản/định dạng (VN/EN, năm khác nhau) chưa xác định bản hiệu lực hiện hành — **quan trọng vì đây là tài liệu vận hành công nhận trực tiếp của ETV**, nên rà soát sớm hơn các cụm khác.
- Thư mục `AGI_Giam dinh/` rỗng — có thể là chỗ trống chờ bổ sung, không phải lỗi di chuyển (đã kiểm tra, đúng là 0 file từ nguồn).
- A2LA/ANAB chưa xác định rõ mục đích thu thập (đối chiếu cạnh tranh? tham khảo cách trình bày hồ sơ?) — cần hỏi người phụ trách gốc nếu cần biết bối cảnh.

## Nguồn dữ liệu

`00_RAW_DATA/1. 1. BoA/`, `2.5. A2LA US/`, `2.5. ANAB/`, `2.6. ILAC/`, `2.8. EA/` (cũ) → đã chuyển tới `05_ILAC/{BoA,A2LA_US,ANAB_TranscatScopes,ILAC_APLAC,EA}/`.

## Chủ đề liên quan

- [Phap-ly.md](Phap-ly.md) — Thông tư 21/2010 (quản lý hoạt động công nhận) là căn cứ pháp lý cho BoA.
- [DLVN.md](DLVN.md) — ĐLVN 131/154 (độ không đảm bảo đo, so sánh liên phòng) cùng chủ đề với AR_07/ILAC_P14/EA-4-02.
