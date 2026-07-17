# THUYẾT MINH ĐỀ TÀI NGHIÊN CỨU CƠ BẢN (NAFOSTED)

> **Trạng thái:** PROVISIONAL — bản nháp do AI đồng trợ lý dựng theo cấu trúc chuẩn.
> Mọi claim gắn `[CẦN NGUỒN]` phải được thay bằng tài liệu thật (không bịa DOI/số liệu).
> Loại hình: NCCB · Ngày lập: 2026-07-16

---

## A. THÔNG TIN CHUNG

| Mục | Nội dung |
|---|---|
| Tên đề tài (nháp) | Nghiên cứu xây dựng mô hình liên kết chuẩn đo lường giữa mạng cảm biến bụi PM2.5/PM10 chi phí thấp và thiết bị chuẩn tham chiếu (gravimetric/BAM), ứng dụng cho quan trắc chất lượng không khí đô thị |
| Loại hình | Nghiên cứu cơ bản (NCCB) định hướng ứng dụng |
| Chủ nhiệm | TS. Dương Thành Nam |
| Tổ chức chủ trì | Trung tâm Đổi mới sáng tạo công nghệ cao, Viện Hàn lâm Khoa học và Công nghệ Việt Nam (VAST) |
| Thời gian thực hiện | 24 tháng (PROVISIONAL) |
| Lĩnh vực | Khoa học đo lường / Khoa học môi trường / Trí tuệ nhân tạo ứng dụng |

---

## B. TÍNH CẤP THIẾT

1. Mạng cảm biến bụi chi phí thấp (low-cost sensor — LCS) phát triển nhanh nhờ giá rẻ, mật độ dày, đo thời gian thực; tuy nhiên dữ liệu chỉ có giá trị khoa học/quản lý khi **liên kết được về chuẩn đo lường (metrological traceability)**. `[CẦN NGUỒN: hiện trạng LCS + hạn chế độ chính xác]`
2. Sai số LCS phụ thuộc mạnh vào **độ ẩm tương đối (RH), nhiệt độ, phân bố kích thước và thành phần hạt**; hệ số hiệu chỉnh của một vùng khí hậu **không chuyển giao** sang vùng khác. `[CẦN NGUỒN]`
3. Việt Nam chưa có **khung liên kết chuẩn + đánh giá độ không đảm bảo đo (uncertainty)** thống nhất cho dữ liệu LCS trong điều kiện khí hậu nhiệt đới ẩm. `[CẦN NGUỒN — rà QCVN/TCVN & văn bản quản lý quan trắc]`

## C. TỔNG QUAN & KHOẢNG TRỐNG NGHIÊN CỨU

- Các nghiên cứu co-location hiện dùng hồi quy tuyến tính, MLR, Random Forest/GBM để hiệu chỉnh LCS về chuẩn tham chiếu — nhưng cho **hệ số tĩnh**, suy giảm khi điều kiện thay đổi theo mùa. `[CẦN NGUỒN — tổng hợp literature matrix]`
- Ít nghiên cứu tích hợp **chuỗi liên kết chuẩn đầy đủ theo GUM** (từ LCS → thiết bị chuẩn gravimetric → chuẩn quốc gia) kèm **uncertainty budget** định lượng cho toàn chuỗi. `[CẦN đối chiếu để khẳng định khoảng trống]`
- **Khoảng trống chính:** thiếu mô hình **hiệu chỉnh động, có liên kết chuẩn, kèm uncertainty budget** phù hợp khí hậu nhiệt đới ẩm.

> Ghi chú toàn vẹn: novelty chỉ được KHẲNG ĐỊNH sau khi hoàn thành `LITERATURE_MATRIX.csv`.

## D. MỤC TIÊU

**Mục tiêu tổng quát:** Thiết lập mô hình và quy trình liên kết chuẩn đo lường cho mạng cảm biến PM2.5/PM10 chi phí thấp, đạt độ tin cậy đủ dùng cho quan trắc bổ trợ chất lượng không khí đô thị.

**Mục tiêu cụ thể (định lượng — PROVISIONAL):**
1. Xây dựng hàm hiệu chỉnh động (theo RH/T/mùa) đạt **R² ≥ 0,8** và giảm sai số so với thiết bị chuẩn gravimetric.
2. Thiết lập **uncertainty budget** đầy đủ theo GUM cho chuỗi đo LCS → chuẩn tham chiếu.
3. Đề xuất **quy trình hiệu chuẩn hiện trường** có khả năng chuẩn hóa/nhân rộng.

## E. NỘI DUNG & PHƯƠNG PHÁP (GÓI CÔNG VIỆC)

| WP | Nội dung | Phương pháp | Sản phẩm WP |
|---|---|---|---|
| WP1 | Thiết kế mạng co-location (LCS đặt cạnh thiết bị chuẩn Thermo gravimetric) | Bố trí thực nghiệm, thiết kế lấy mẫu | Sơ đồ & giao thức co-location |
| WP2 | Thu thập & kiểm soát chất lượng dữ liệu | QA/QC, tách raw/verified | Bộ dữ liệu chuẩn hóa |
| WP3 | Xây dựng & so sánh mô hình hiệu chỉnh động | Mô hình lai vật lý + học máy | Mô hình + mã nguồn |
| WP4 | Lập uncertainty budget | GUM / phân tích nguồn sai số | Báo cáo uncertainty |
| WP5 | Xây dựng & thử nghiệm quy trình hiệu chuẩn; công bố | Validation, viết bài | Dự thảo quy trình + bài ISI |

## F. TÍNH MỚI / SÁNG TẠO

- Kết hợp **liên kết chuẩn đo lường (GUM/traceability)** với **hiệu chỉnh động bằng học máy** cho LCS trong điều kiện nhiệt đới ẩm — hướng tiếp cận vượt khỏi hồi quy hiệu chỉnh tĩnh phổ biến. `[CẦN literature để chốt phát biểu novelty]`

## G. SẢN PHẨM & CHỈ TIÊU (KPI — PROVISIONAL)

- 02 bài báo ISI (Q1/Q2) — đáp ứng yêu cầu công bố NCCB của NAFOSTED. `[CẦN đối chiếu quy định công bố hiện hành]`
- 01 mô hình hiệu chỉnh + mã nguồn mở.
- 01 bộ dữ liệu co-location (có metadata/data dictionary).
- 01 dự thảo quy trình hiệu chuẩn hiện trường.
- Đào tạo: hỗ trợ 01–02 ThS/NCS.

## H. TIẾN ĐỘ (24 THÁNG — PROVISIONAL)

| Giai đoạn | Tháng | Nội dung chính |
|---|---|---|
| GĐ1 | 1–6 | Tổng quan, thiết kế co-location, lắp đặt |
| GĐ2 | 7–15 | Thu thập dữ liệu, xây mô hình hiệu chỉnh |
| GĐ3 | 16–21 | Uncertainty budget, validation, quy trình |
| GĐ4 | 22–24 | Công bố, tổng kết, nghiệm thu |

## I. NHÂN LỰC

- Chủ nhiệm: TS. Dương Thành Nam.
- Đơn vị chủ trì: Trung tâm Đổi mới sáng tạo công nghệ cao, VAST.
- Thành viên/đơn vị phối hợp: `[CẦN BỔ SUNG]`.

## K. KINH PHÍ (DỰ TOÁN — CHƯA LẬP)

- Trần kinh phí, định mức theo quy định NAFOSTED hiện hành. `[CẦN quy định định mức + xây dự toán gắn từng WP]`
- Thiết bị chuẩn tham chiếu Thermo (gravimetric): **đã có sẵn** → giảm chi phí đầu tư thiết bị.

## L. RỦI RO

| Rủi ro | Mức | Biện pháp |
|---|---|---|
| Thiếu dữ liệu mùa (đủ dải RH/T) | Trung bình | Kéo dài giai đoạn thu thập qua nhiều mùa |
| Trôi/hỏng cảm biến LCS | Trung bình | Dự phòng cảm biến, kiểm tra định kỳ |
| Novelty bị trùng lặp | Trung bình | Rà literature sớm (WP0/GĐ1) |

## M. MA TRẬN TUÂN THỦ BIỂU MẪU NAFOSTED

> ⚠️ Chưa có file mẫu chính thức. Sau khi có mẫu, ánh xạ từng mục A–M ở trên vào từng phần của biểu mẫu để bảo đảm không thiếu mục và đúng thứ tự chấm điểm.

---

### Danh mục điểm cần chốt trước khi nộp
- [ ] Rà tổng quan → chốt novelty & tên đề tài chính thức
- [ ] Mục tiêu định lượng & KPI cuối
- [ ] Thành viên nhóm & đơn vị phối hợp
- [ ] Dự toán kinh phí theo định mức NAFOSTED
- [ ] Nạp biểu mẫu NAFOSTED chính thức & lập ma trận tuân thủ
