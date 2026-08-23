# M11_BaoCao — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P11_BaoCao.md` (Thủ tục ETV.P11, lần ban hành 03, **Đã
> phê duyệt** 21/07/2026, tên đầy đủ "Báo cáo Kết quả — Quản lý Nhãn, Tem, Giấy chứng nhận").
> 5/16 biểu mẫu có nguồn (F11.02/03/07/08/10).

## 1. Mục tiêu module

Số hóa MP11 — quản lý biên bản đo lường (BBĐL), giấy chứng nhận (GCN), tem kiểm định/hiệu chuẩn
và nhãn mẫu chuẩn, theo ISO/IEC 17025 §7.8 + Luật Đo lường 04/2011/QH13 + TT 24/2013/TT-BKHCN +
TT 54/2025/TT-BKHCN. Đây là module **phát hành sản phẩm cuối cùng** ra khách hàng — trực tiếp
nối tiếp M10 (đảm bảo hiệu lực) và cấu thành nội dung cho M36 (chứng chỉ số).

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `MeasurementRecord` (BBĐL) | Biên bản đo lường số hóa | theo từng quy trình kỹ thuật |
| `Certificate` (GCN/CCĐL) | Giấy chứng nhận kiểm định/hiệu chuẩn/thử nghiệm/pha chế | F11.02–F11.05, F11.10, F11.15, F11.16 |
| `Seal` (Tem) | Tem kiểm định/hiệu chuẩn/an toàn/pha chế | F11.09 |
| `SealBatch` | Lô tem đặt in/cấp phát | F11.06 |
| `ReferenceMaterialLabel` | Nhãn mẫu chuẩn (RM/CRM) | — |

### 2.1. `Certificate`

`code` — cú pháp `{Prefix}{YY}.{5 số}` theo loại: **V**=Kiểm định nhóm 2, **I**=nhóm 1,
**C**=Hiệu chuẩn, **T**=Thử nghiệm, **S**=Đánh giá hệ thống, **H**=Kiểm định an toàn,
**M**=Quan trắc MT, **P**=Pha chế/Chế tạo (vd `V20.11001`); `object_ref`, `result` (GCN kiểm
định: "Đạt yêu cầu kỹ thuật đo lường"; GCN hiệu chuẩn/thử nghiệm: bảng kết quả kèm theo),
`valid_until` (ngày cuối tháng), `signed_by` (LĐV — đại diện pháp luật), `reviewed_by`
(QLKT/QLCL tùy loại), `format` (Truyền thống/Điện tử/Số), `status` (Nháp/Đã phát hành/Đã cấp
lại/Đã thu hồi), `superseded_code` (khi cấp lại).

### 2.2. `Seal`

`code` — cú pháp `{Năm chế tạo}{Prefix}{5 số}` (vd `25V.00001`), `type` (V/I/C/H/M/P),
`status` (Chưa hoạt động/Đang hoạt động/Sắp hết/Hết hiệu lực/Hỏng), `assigned_to`,
`assigned_at`, `used_at`, `certificate_ref` (kích hoạt khi CCĐL tương ứng phát hành).

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Người phê duyệt/ký CCĐL và Báo cáo phát hành ra ngoài; chịu trách nhiệm pháp luật về tem; quyết định "hết hiệu lực" tem thủ công; cấp lại/thu hồi GCN phức tạp |
| LĐP (Lãnh đạo PTN) | Người soát xét, ký soát xét BBĐL/GCN; người giao tem; xử lý phản hồi sai sót GCN/tem |
| QLKT | Người gửi duyệt — kiểm soát kết quả kiểm định/hiệu chuẩn/thử nghiệm; ký BBĐL |
| QLCL | Soát xét BBĐL/GCN; kiểm tra định kỳ bảo quản/sử dụng tem |
| Người thực hiện | Tạo dữ liệu BBĐL; là "người được giao tem" — dán tem sau khi CCĐL phát hành |

## 4. Quy tắc nghiệp vụ

1. `Seal` **chỉ kích hoạt sau khi** `Certificate` tương ứng đã phát hành — nếu tem đã dán nhưng
   CCĐL không phát hành, tem đó **không có giá trị sử dụng**.
2. Chỉ dán tem kiểm định khi PTĐ **đạt** yêu cầu kỹ thuật đo lường; PTĐ không đạt → hủy tem (2
   gạch chéo), khai báo "tem hỏng", không dán.
3. `Certificate` chỉ phát hành sau khi ký đủ: người thực hiện (kiểm định viên đã chứng nhận, có
   thẻ — riêng GCN kiểm định) + người phê duyệt (LĐV/người ủy quyền) + đóng dấu.
4. Khách hàng phản hồi sai sót trên GCN → **Cấp lại**: GCN cũ hết giá trị pháp lý, mã mới thêm
   hậu tố `.R{n}` (vd `C23.25135.R1`); hoặc **Thu hồi/hủy** kèm lý do bắt buộc — không tự ý sửa
   trực tiếp GCN đã phát hành.
5. `Seal.status = Hết hiệu lực` khi (a) số lượng còn lại = 0, HOẶC (b) tem hỏng + tem còn lại =
   tổng đặt in, HOẶC (c) LĐV chọn thủ công — trường hợp (c) làm hết hiệu lực **toàn bộ** tem đã
   phân công cho người được giao đó.
6. Người thôi việc/thuyên chuyển: hủy toàn bộ tem chưa sử dụng còn lại — không mang theo/chuyển
   nhượng.
7. CCĐL do nhà thầu phụ phát hành: bản gốc (giấy/tem) trả trực tiếp khách hàng, ETV chỉ giữ bản
   photo/scan; GCN thử nghiệm liên quan phải đánh dấu (*) ghi chú nguồn thầu phụ.
8. Bản điện tử PDF ký số là **bản gốc có giá trị pháp lý**; bản giấy chỉ là bản in từ điện tử.
9. Nhãn mẫu chuẩn (RM/CRM): chỉ dán sau khi hoàn tất kiểm nghiệm + phê duyệt; mẫu hết hạn/không
   đạt → dán nhãn "ĐÃ HẾT HẠN"/"KHÔNG ĐẠT" + cách ly, không tiếp tục lưu hành như bình thường.
10. Hồ sơ điện tử (PNT, BBĐL, GCN, GCN thầu phụ) lưu theo **ETV.P15**; hồ sơ nhãn/tem/GCN pha
    chế lưu tối thiểu **5 năm**.

## 5. Chỉ tiêu theo dõi (Phụ lục I ETV.P11)

| Chỉ tiêu | Công thức | Ngưỡng tốt |
|---|---|---|
| Tỷ lệ CCĐL phát hành đúng hạn | Số CCĐL đúng hạn / Tổng số CCĐL cần phát hành × 100% | ≥ 95% |
| Tỷ lệ GCN thu hồi/hủy/cấp lại | Số GCN thu hồi/hủy/cấp lại / Tổng số GCN phê duyệt × 100% | ≤ 2% |

## 6. Liên kết

Quy trình: MP11 · Năng lực: CAP-08_HieuChuan, CAP-09_KiemDinh, CAP-10_ThuNghiem,
CAP-11_QuanTrac · Thủ tục gốc: `ETV.P11_BaoCao.md` (Đã phê duyệt, lần 03) · Biểu mẫu:
F11.01–F11.16 (5/16 đã số hóa) · Lưu hồ sơ: ETV.P15 · Liên quan: M07 (bàn giao sản phẩm sau
thanh toán), M10 (đảm bảo hiệu lực kết quả trước khi phát hành), M36 (chứng chỉ số — dùng chung
khái niệm `Certificate`) · Căn cứ: ISO 9001 §8.6, ISO/IEC 17025 §7.8, ISO 17034/ISO 33401 (nhãn
mẫu chuẩn), Luật Đo lường 04/2011/QH13, Luật GDĐT 20/2023/QH15, NĐ 105/2016, NĐ 107/2016, NĐ
154/2018, NĐ 23/2025/NĐ-CP (chữ ký điện tử), TT 54/2025/TT-BKHCN, TT 24/2013/TT-BKHCN.
