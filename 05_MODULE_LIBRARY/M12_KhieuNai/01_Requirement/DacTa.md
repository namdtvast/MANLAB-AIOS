# M12_KhieuNai — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P12_KhieuNai.md` (Thủ tục ETV.P12, lần ban hành 03, **Đã
> phê duyệt** 21/07/2026). 0/3 biểu mẫu có nguồn — đặc tả dựa trên nội dung quy trình (đầy đủ).

## 1. Mục tiêu module

Số hóa MP12 — tiếp nhận, xử lý, trả lời khiếu nại và thu thập phàn nàn/góp ý (khách hàng + nội
bộ), theo ISO/IEC 17025 §7.9 + ISO 9001 §9.1.2/§10.2.

**Phân biệt 3 loại phản hồi (định nghĩa gốc, không được gộp chung khi số hóa):**
- **Khiếu nại**: yêu cầu xử lý chính thức, cần phản hồi bằng văn bản, đi qua state machine đầy đủ.
- **Phàn nàn**: không hài lòng nhưng không yêu cầu xử lý chính thức — chỉ ghi nhận, không bắt buộc phản hồi.
- **Góp ý**: mang tính xây dựng, không xuất phát từ không hài lòng, không yêu cầu phản hồi.

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `Complaint` | Khiếu nại (có thể nâng cấp từ Phàn nàn/Góp ý) | F12.01 |
| `Feedback` | Phàn nàn/góp ý khách hàng | F12.02 |
| `InternalFeedback` | Phàn nàn/góp ý nội bộ | F12.03 |
| `ExternalDocument` (F14.03) | Văn bản khiếu nại chính thức trên ManLab (← M14) | F14.03 |

### 2.1. `Complaint`

`channel` (Trực tiếp/Điện thoại/Email/Văn bản/Form online), `content`, `related_certificate_ref`
(nếu liên quan sai sót GCN → M11), `assigned_to`, `reviewed_by` (LĐP), `approved_by` (LĐV),
`status` (Nháp/Đang xử lý/Đã trả lời/Đóng hồ sơ/Không đạt thỏa thuận), `resolution`,
`customer_satisfied` (bool), `capa_ref` (→ M13, nếu xử lý phức tạp).

### 2.2. `Feedback` / `InternalFeedback`

`category` (quy trình/thái độ phục vụ/phối hợp nội bộ/điều hành/thời gian xử lý), `content`,
`source` (Form online `etv.org.vn/danh-gia-va-phan-nan` / khảo sát nội bộ định kỳ), `escalated_to_complaint`
(bool — chuyển thành Complaint nếu người gửi sau đó yêu cầu phản hồi chính thức hoặc có dấu hiệu
ảnh hưởng chất lượng/an toàn/đạo đức nghề nghiệp).

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Chủ sở hữu; phê duyệt văn bản khiếu nại (F14.03); phân công xử lý khiếu nại phức tạp; quyết định dừng giải quyết nếu khách không chấp nhận; báo cáo Hội đồng Quản lý khi ảnh hưởng lớn/sai sót hệ thống |
| QLCL | Kiểm soát thực hiện thủ tục; tổng hợp phàn nàn/góp ý phục vụ xem xét lãnh đạo |
| Người tiếp nhận | Tiếp nhận mọi hình thức; khởi tạo F14.03; ghi nhận vào F12.01/02/03 |
| Cán bộ phụ trách xử lý | Được LĐV phân công; cập nhật F14.03; thực hiện CAPA (→ M13) khi cần; trả lời khách hàng |

## 4. Quy tắc nghiệp vụ

1. Mọi khiếu nại tiếp nhận (bất kỳ kênh nào) phải khởi tạo bản ghi văn bản bên ngoài trên hệ
   thống kiểm soát tài liệu (← M14, F14.03) — không xử lý ngầm ngoài hệ thống.
2. Khiếu nại lời nói giải thích được ngay + khách hài lòng → chỉ cần ghi vào `Complaint`, không
   bắt buộc tạo F14.03; **không giải thích được hoặc khách chưa thỏa mãn** → bắt buộc F14.03 +
   báo LĐV phân công xử lý.
3. Sai sót thông tin hành chính trên GCN (← M11) qua văn bản khách hàng gửi → xử lý theo đúng
   quy trình khiếu nại này (không xử lý tắt qua M11 một mình).
4. Khiếu nại phức tạp/ảnh hưởng lớn/sai sót có hệ thống → LĐV báo cáo Hội đồng Quản lý; xử lý
   phức tạp bắt buộc đi qua **M13** (hành động khắc phục), không đóng hồ sơ khi chưa có CAPA.
5. Đóng hồ sơ (`status = Đóng hồ sơ`) chỉ khi đã thông báo kết quả cho khách hàng VÀ khách hàng
   xác nhận đồng ý phương án xử lý; nếu khách vẫn không chấp nhận, LĐV quyết định dừng giải
   quyết + thông báo rõ lý do bằng văn bản (không tự động đóng im lặng).
6. Phàn nàn/góp ý **không tự động thành khiếu nại** — chỉ chuyển đổi khi người gửi sau đó yêu
   cầu phản hồi chính thức, hoặc nội dung có dấu hiệu ảnh hưởng chất lượng kết quả/an toàn/đạo
   đức nghề nghiệp.
7. Hồ sơ khiếu nại/phàn nàn/góp ý + công văn liên quan + CAPA (nếu có) lưu theo **ETV.P15**.

## 5. Liên kết

Quy trình: MP12 · Năng lực: CAP-16_ChatLuong · Thủ tục gốc: `ETV.P12_KhieuNai.md` (Đã phê duyệt,
lần 03) · Biểu mẫu: F12.01–F12.03 (chưa có nguồn) · Lưu hồ sơ: ETV.P15 · Liên quan: M13 (hành
động khắc phục khi khiếu nại phức tạp), M14 (khởi tạo văn bản bên ngoài F14.03), M11 (khiếu nại
liên quan sai sót GCN) · Phụ lục I (kịch bản xử lý phản ánh tiêu cực công khai trên Google): quy
trình vận hành thực tế, không phải trường dữ liệu — tham khảo khi xây UI cảnh báo SLA phản hồi ·
Căn cứ: ISO 9001 §9.1.2/§10.2, ISO/IEC 17025 §7.9, ISO 17034 (khi liên quan mẫu chuẩn).
