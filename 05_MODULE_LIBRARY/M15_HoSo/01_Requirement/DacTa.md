# M15_HoSo — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P15_KiemSoatHoSo.md` (Thủ tục ETV.P15, lần ban hành 01,
> **Đã phê duyệt** 01/07/2026, tên đầy đủ "Kiểm soát hồ sơ, dữ liệu đo lường và chứng chỉ" — 1
> thủ tục dùng chung cho cả 5 chuẩn ISO 9001/17025/17034/27001/42001). 4 biểu mẫu áp dụng
> (F15.01–04), chưa xác nhận trạng thái số hóa nguồn.

## 1. Mục tiêu module

Số hóa MP15 — kiểm soát vòng đời **Lập tạo → Lưu trữ → Bảo vệ → Truy xuất → Bảo quản → Hủy bỏ**
của hồ sơ kỹ thuật/dữ liệu đo lường/chứng chỉ/hồ sơ quản lý toàn Viện, theo ISO/IEC 17025 §8.2 +
ISO 9001 §7.5 + ISO 17034 §8.2 + ISO/IEC 27001 A.5.9–A.5.18/A.8.13 + ISO/IEC 42001 §7.5.

**Đây là "kho lưu" mà mọi module khác dẫn chiếu** ("lưu theo ETV.P15") — không tự trùng lặp field
lưu trữ ở từng module khác, tất cả trỏ về đây.

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `RetrievalRequest` | Phiếu yêu cầu truy xuất hồ sơ | F15.01 |
| `DisposalTicket` | Phiếu hủy/lưu trữ hồ sơ | F15.02 |
| `PeriodicReviewReport` | Báo cáo soát xét hồ sơ định kỳ (hằng năm) | F15.03 |
| `LossDamageReport` | Báo cáo sự cố thất thoát/hư hỏng hồ sơ | F15.04 |

### 2.1. `RetrievalRequest`

`requester_type` (Khách hàng/Cơ quan công nhận-chỉ định/Cơ quan thanh tra), `record_ref`,
`purpose`, `verified_by` (LĐP/QLCL xác minh quyền truy cập), `delivered_format` (giấy/PDF),
`delivered_at`, `recipient`, `confidentiality_commitment` (bool, cho hồ sơ bên ngoài).

### 2.2. `DisposalTicket`

`record_ref`, `retention_expired_at`, `disposal_method` (Xé/đốt giấy — Xóa vĩnh viễn điện tử),
`confirmed_by` (LĐP), `disposal_log_ref`.

### 2.3. `LossDamageReport`

`record_ref`, `nature` (Thất thoát/Hư hỏng), `cause`, `impact_scope` (đã cấp chứng chỉ liên quan
khách hàng / dữ liệu hỗ trợ có thể tái lập), `recovery_action` (khôi phục từ backup / không khôi
phục được → thông báo khách hàng + cơ quan công nhận), `reported_by` (LĐP).

### 2.4. Thời hạn lưu theo loại hồ sơ (áp dụng khi tính `retention_expired_at`)

| Loại hồ sơ | Thời hạn |
|---|---|
| Kiểm định/Hiệu chuẩn/Thử nghiệm | 10 năm từ ngày cấp chứng chỉ |
| Quan trắc môi trường (QTMT) | 5 năm từ ngày cấp chứng chỉ/phiếu trả kết quả |
| Hồ sơ khách hàng | Tối thiểu 5 năm từ ngày kết thúc dịch vụ |
| Hồ sơ nhân sự | Theo ETV.P03, tối thiểu 3 năm sau khi kết thúc |
| Hồ sơ quản lý/năng lực | Vĩnh viễn (bản hiện hành) + 5 năm (bản cũ) |

Danh mục đầy đủ: `ETV.P.F 14.06` (nguồn duy nhất — không lặp bảng ở module khác).

## 3. Vai trò (RACI theo vòng đời)

| Bước vòng đời | NTH | LĐP | LĐV | QLCL |
|---|---|---|---|---|
| Lập tạo hồ sơ | R | I | I | I |
| Xác nhận & ký duyệt kỹ thuật | C | R/A | I | I |
| Lưu trữ bản gốc/điện tử | I | I | I | R/A |
| Bảo vệ & kiểm soát truy cập | I | I | I | R/A |
| Truy xuất theo yêu cầu | R | C | I | R/A |
| Soát xét định kỳ | R | A | I | I |
| Hủy bỏ/lưu trữ lâu dài | I | R/A | I | R/A |

LĐV luôn là **A** cuối cùng với hồ sơ liên quan năng lực kiểm định/hiệu chuẩn/thử nghiệm.

## 4. Quy tắc nghiệp vụ

1. Hồ sơ kỹ thuật bắt buộc có: mã nhận dạng duy nhất, ngày+người lập tạo, tham số đo/kết
   quả/ĐKĐBĐ, điều kiện môi trường (nếu liên quan), chữ ký duyệt kỹ thuật (LĐP/chuyên gia phân
   công) — thiếu bất kỳ trường nào chặn chuyển trạng thái `Đã duyệt`.
2. Bản điện tử trên ManLab là **nguồn sự thật** (không phải bản giấy) khi có cả hai; bản giấy chỉ
   là bản lưu theo thể thức, được ký duyệt/đóng dấu nếu là hồ sơ gốc.
3. `RetrievalRequest` bắt buộc LĐP/QLCL **xác minh quyền truy cập trước khi cấp bản copy** —
   không tự động cấp theo yêu cầu.
4. Hồ sơ nhạy cảm (dữ liệu cá nhân/bí mật thương mại) chỉ LĐP/LĐV/QLCL truy cập được — không mở
   theo phân quyền chung NTH.
5. `DisposalTicket` chỉ tạo được khi `retention_expired_at` đã qua; hủy hồ sơ giấy = xé/đốt hoặc
   dịch vụ hủy chứng chỉ, hủy điện tử = xóa vĩnh viễn khỏi ManLab + sao lưu, **đều bắt buộc ghi
   nhật ký hủy** — không xóa âm thầm.
6. Phát hiện hư hỏng khi soát xét định kỳ (ẩm/mối mọt/phai mờ/file lỗi) → tạo bản photo/quét lại,
   cập nhật ManLab — không được để hồ sơ hỏng tồn tại mà không xử lý.
7. Mất/hỏng hồ sơ đã cấp chứng chỉ liên quan khách hàng: nếu **không khôi phục được** từ backup →
   bắt buộc thông báo khách hàng và cơ quan công nhận (nếu liên quan năng lực) — không được im
   lặng.
8. Toàn vẹn dữ liệu điện tử kiểm tra checksum **6 tháng/lần**; sao lưu hàng tuần (NAS) + hàng
   tháng (cloud).
9. Không áp dụng thủ tục này cho dữ liệu cá nhân xử lý theo luật bảo vệ dữ liệu cá nhân riêng
   (ngoài phạm vi HTQL) và chứng chỉ đào tạo cá nhân (→ M03).

## 5. Liên kết

Quy trình: MP15 · Năng lực: CAP-14_TaiLieuHoSo · Thủ tục gốc: `ETV.P15_KiemSoatHoSo.md` (Đã phê
duyệt, lần 01) · Biểu mẫu: F15.01–F15.04 · Liên quan: M14 (tài liệu nguồn, phân quyền theo
`ETV.P.F 14.06`), M03 (hồ sơ nhân sự) · **Toàn bộ 37 module khác dẫn chiếu module này** khi ghi
"lưu hồ sơ theo ETV.P15" — không tự thêm field lưu trữ riêng ở module khác. Căn cứ: ISO/IEC 17025
§8.2, ISO 9001 §7.5, ISO 17034 §8.2, ISO/IEC 27001 A.5.9–A.5.18/A.8.13, ISO/IEC 42001 §7.5, Luật
GDĐT 20/2023/QH15, NĐ 30/2020/NĐ-CP.
