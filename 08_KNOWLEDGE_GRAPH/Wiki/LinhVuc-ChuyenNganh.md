---
title: "Lĩnh vực chuyên ngành — GTVT (khí thải xe), Y tế"
type: Wiki-Topic
status: Da-bien-soan
source_raw: "08_KNOWLEDGE_GRAPH/00_RAW_DATA/0.0. Linh vuc_GTVT, 0.0. Linh vuc_Y te (đã di chuyển)"
source_now: "08_KNOWLEDGE_GRAPH/14_Technical_References/05_LinhVuc/"
file_count: 100
last_updated: "08/07/2026"
---

# Lĩnh vực chuyên ngành — GTVT (khí thải xe), Y tế

← [Wiki/index.md](index.md)

## Tóm tắt

100 file, hồ sơ pháp lý + kỹ thuật cho 2 lĩnh vực kiểm định/thử nghiệm chuyên ngành: khí thải xe cơ giới (GTVT) và thiết bị y tế. Cả hai đã được **tổ chức sẵn theo cấu trúc thư mục con rõ ràng** (VBQPPL/QCVN-TCVN/Kỹ thuật cho GTVT; Thủ tục/Pháp lý/QCVN/ISO/QTKĐ cho Y tế) — giữ nguyên khi di chuyển.

## GTVT — Khí thải xe cơ giới (17 file, `GTVT_KhiThaiXe/`)

| Thư mục | Nội dung |
|---|---|
| `1.  VBQPPL/` (7 file + 5 file trong `Du thao_Kinh doanh KD xe co gioi/`) | ND 139/2018 & ND 30/2023 (kinh doanh dịch vụ kiểm định xe cơ giới), TT 44/2023-BGTVT (hướng dẫn), và trọn bộ hồ sơ dự thảo Nghị định thay thế (tờ trình Chính phủ, báo cáo đánh giá tác động, bảng so sánh dự thảo, dự thảo Thông tư cấp/cấp lại GCN) — **đang trong quá trình sửa đổi chính sách, chưa ban hành chính thức** |
| `2. QCVN, TCVN/` (5 file) | TCVN 6211:2003, TCVN 6204:2008, TCVN 6208:2014, TCVN 7663:2007 (chưa xác định chủ đề cụ thể từng số hiệu — cần đọc), và `dtqcvn-khi-thai-o-to-dang-luu-hanh.doc` (dự thảo QCVN khí thải ô tô đang lưu hành) |
| `3. Ky thuat/` (1 file) | Slide kỹ thuật về nhiên liệu dầu mỏ và khí thải |

## Y tế (83 file, `YTe/`)

| Thư mục | Số file | Nội dung |
|---|---|---|
| `6. QTKD_ATYT/` | 24 | **Lớn nhất** — quy trình kiểm định an toàn thiết bị y tế theo các Quyết định riêng (QĐ 3237/3238, QĐ 4396/4397...): máy thở dùng điều trị, dao mổ điện cao tần, máy phá rung tim, máy thận nhân tạo — nhiều file có cả bản "Draft" và bản chính thức, kèm ảnh `0. Danh muc quy trinh.JPG` (danh mục tổng hợp) |
| `2. Phap ly/` | 23 | Thông tư Bộ Y tế: TT 14/2013 (khám chữa bệnh), TT 14/2018 (nhập khẩu thiết bị y tế), TT 19/2021 (mẫu văn bản báo cáo theo ND 98); danh mục xét nghiệm thiết yếu (WHO 2019); danh mục cơ sở vật chất/thiết bị y tế của cơ sở khám sức khoẻ |
| `5. QTKD/` | 17 | Quy trình kiểm định thiết bị y tế dùng **trực tiếp số hiệu ĐLVN** (DLVN 43 điện tim, DLVN 158 nhiệt kế thuỷ tinh rượu, DLVN 258 tiêu cự kính mắt, DLVN 09 huyết áp kế, DLVN 44 điện não...) — xác nhận nhóm Y tế của ĐLVN trong [DLVN.md](DLVN.md) áp dụng trực tiếp ở đây; cộng thêm quy trình kiểm tra máy siêu âm trị liệu (không thuộc ĐLVN chuẩn) |
| `1. Thu tuc/` | 6 | Danh sách đơn vị được cấp phép X-quang y tế, điều kiện kinh doanh kiểm định thiết bị y tế, hướng dẫn thủ tục cấp phép hoạt động kiểm xạ X-quang, danh sách đơn vị đào tạo an toàn bức xạ (ATBX) y tế |
| `3. QCVN/` | 6 | QCVN 02:2019-BYT (đo bụi đếm hạt), QCVN 15/16/17:2018-BKHCN (chưa xác định chủ đề cụ thể — số hiệu QCVN của Bộ KHCN, khả năng liên quan bức xạ/an toàn bức xạ do đặt cùng nhóm Y tế) |
| `4. ISO/` | 5 | ISO 13485:2017 (thiết bị y tế — hệ thống quản lý chất lượng), IEC 60601-1 (an toàn thiết bị điện y tế, 2 bản: gốc 2005 và phần 1-1:2000), IEC 62353:2014 (thử nghiệm định kỳ thiết bị điện y tế), BS EN ISO 14971:2012 (quản lý rủi ro cho thiết bị y tế) |
| `TLTK_Y te/` | 2 | Quyết định chỉ định kiểm định thiết bị y tế (Vinacontrol) — tài liệu tham khảo về đơn vị kiểm định khác |

## Vấn đề phát hiện, chưa xử lý

- GTVT: 4 số hiệu TCVN (6211, 6204, 6208, 7663) chưa xác định nội dung cụ thể — chỉ có số hiệu trong tên file, cần đọc hoặc đối chiếu [TCVN.md](TCVN.md).
- Y tế: QCVN 15/16/17:2018-BKHCN chưa xác định chủ đề — tên file dạng mã nội bộ (`m_917766` v.v.) không mô tả rõ.
- Nhiều file trong `6. QTKD_ATYT/` có cặp bản "Draft" + bản chính thức cùng nội dung — chưa xác nhận bản nào đang hiệu lực áp dụng thực tế tại ETV.
- Bộ hồ sơ dự thảo Nghị định GTVT (5 file) phản ánh chính sách **đang thay đổi, chưa có hiệu lực** — cần lưu ý khi tham chiếu.

## Nguồn dữ liệu

`00_RAW_DATA/0. 0. Linh vuc_GTVT_Khi thai xe/`, `0. 0. Linh vuc_Y te/` (cũ) → đã chuyển tới `14_Technical_References/05_LinhVuc/{GTVT_KhiThaiXe,YTe}/`.

## Chủ đề liên quan

- [DLVN.md](DLVN.md) — nhóm QTKĐ Y tế (DLVN 09/43/44/158/258...) dùng trực tiếp trong `YTe/5. QTKD/`.
- [Phap-ly.md](Phap-ly.md) — ND 63/2016 (đăng ký kiểm định khí thải xe cơ giới) là căn cứ pháp lý gốc cho cụm GTVT.
- [Do-luong-khong-khi/NOx-SO2.md](Do-luong-khong-khi/NOx-SO2.md) — ĐLVN 200/292 (khí chuẩn khí thải xe cơ giới) liên quan trực tiếp GTVT.
