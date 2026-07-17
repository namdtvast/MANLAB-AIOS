# RESEARCH QUESTION

> **Trạng thái:** PROVISIONAL — khung câu hỏi khoa học do AI đồng trợ lý dựng để định hướng NCCB.
> Chủ nhiệm cần xác nhận/điều chỉnh trước khi chốt. Không được coi giả thuyết là kết quả.
> Mục đích: đưa đề tài từ "quy trình hiệu chuẩn" (ứng dụng) sang **câu hỏi khoa học cơ bản tạo tri thức mới** (yêu cầu NCCB — xem `THONG_BAO_NAFOSTED_2026_NCCB.md` mục 5).

## Câu hỏi khoa học trung tâm

Cơ chế **tăng trưởng hút ẩm (hygroscopic growth)** của sol khí đô thị Việt Nam chi phối quan hệ giữa **tín hiệu tán xạ quang** của cảm biến bụi chi phí thấp (LCS) và **khối lượng thực** (chuẩn gravimetric) như thế nào, và có thể mô hình hóa cơ chế đó thành **hàm hiệu chỉnh động có liên kết chuẩn đo lường (metrological traceability) kèm ngân sách độ không đảm bảo đo (uncertainty budget) theo GUM** hay không?

## Khung PICO/PECO

- **Population/Object:** Sol khí PM2.5/PM10 trong không khí đô thị khu vực nhiệt đới ẩm (Việt Nam); tín hiệu của cảm biến quang (nephelometric) chi phí thấp.
- **Exposure/Yếu tố ảnh hưởng:** Độ ẩm tương đối (RH), nhiệt độ (T), phân bố kích thước hạt, thành phần/nguồn gốc sol khí (đặc trưng qua hệ số hút ẩm hiệu dụng κ).
- **Comparator:** Thiết bị chuẩn tham chiếu gravimetric (có sẵn — Thermo); tùy chọn đối chứng BAM.
- **Outcome:**
  - (chính) Sai số/độ chệch của LCS so với chuẩn; hàm hiệu chỉnh; độ không đảm bảo đo mở rộng U của giá trị PM đã hiệu chỉnh.
  - (cơ chế) Hàm tăng trưởng hút ẩm f(RH) và κ hiệu dụng theo mùa/nguồn.
- **Context/Time:** Đô thị Việt Nam, thu thập qua nhiều mùa (đủ dải RH/T); 24–36 tháng.

## Giả thuyết

- **H1 (chính):** Quan hệ tán xạ–khối lượng của LCS phụ thuộc **phi tuyến** vào RH theo cơ chế hygroscopic growth; một **mô hình lai** (vật lý dựa trên κ-Köhler + học máy) mô tả quan hệ này tốt hơn có ý nghĩa so với hồi quy tuyến tính/tĩnh, đồng thời cho phép thiết lập hàm hiệu chỉnh **có liên kết chuẩn** kèm uncertainty budget theo GUM.
- **H2 (phụ):** κ hiệu dụng của sol khí đô thị Việt Nam **khác biệt theo mùa/nguồn phát thải**; đưa κ (ước lượng từ dữ liệu đồng định vị) vào mô hình cải thiện độ chính xác và **tính chuyển giao** (transferability) giữa các địa điểm.
- **H3 (phụ):** Cấu phần học máy khai thác đặc trưng chuỗi thời gian (RH, T, biến thiên tín hiệu) giảm sai số dư sau khi đã hiệu chỉnh bằng mô hình vật lý, mà **không phá vỡ** khả năng truy vết/liên kết chuẩn.

## Giả thuyết không (H0)

RH, κ và các đặc trưng thành phần hạt **không** cải thiện có ý nghĩa thống kê chất lượng hiệu chỉnh LCS so với mô hình hồi quy tuyến tính cơ sở (baseline) chỉ dùng tín hiệu thô.

## Ngưỡng hiệu quả tối thiểu có ý nghĩa thực tiễn (PROVISIONAL — chủ nhiệm chốt)

- Giảm RMSE của PM đã hiệu chỉnh **≥ [X]%** so với baseline; và/hoặc
- Đạt độ không đảm bảo đo mở rộng **U (k=2) ≤ [giá trị mục tiêu]** trong dải RH vận hành; và
- Mô hình đạt **R² ≥ 0,8** trên tập kiểm định độc lập (theo mùa giữ ngoài — seasonal hold-out).

> `[X]`, ngưỡng U và tiêu chí sẽ được chốt sau khi rà tổng quan (`LITERATURE_MATRIX.csv`) và khảo sát dữ liệu sơ bộ. Không suy ra ngưỡng từ dữ liệu mô phỏng rồi coi là thực nghiệm.

## Đóng góp tri thức mới (định vị NCCB)

1. **Tri thức cơ chế:** đặc trưng định lượng hàm hút ẩm f(RH) và κ hiệu dụng của sol khí đô thị nhiệt đới ẩm Việt Nam — dữ liệu/tham số còn thiếu trong bối cảnh khí hậu này. `[CẦN tổng quan để khẳng định khoảng trống]`
2. **Tri thức phương pháp:** khung tích hợp **mô hình lai vật lý–học máy có ràng buộc liên kết chuẩn + uncertainty budget GUM** — vượt khỏi hiệu chỉnh hồi quy tĩnh phổ biến. `[CẦN literature để chốt novelty]`
