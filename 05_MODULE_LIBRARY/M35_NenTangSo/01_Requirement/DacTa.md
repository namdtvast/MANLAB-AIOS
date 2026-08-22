# M35_NenTangSo — Đặc tả yêu cầu

## 1. Phạm vi

Số hóa MP35 — **Platform Registry**: nơi khai báo mọi nền tảng số có sử dụng AI trong hệ sinh
thái ETV (ManLab, VI-CONNECT, các nền tảng sau này). Đây là **nền cho mọi filter** của trang
quản trị AI [M29_AI](../../M29_AI/01_Requirement/DacTa.md) — chọn Platform ở đây sẽ lọc toàn bộ
Agent/Tool/Prompt/Trace/Usage hiển thị bên M29.

M35 chỉ quản lý *định danh và tình trạng kết nối* của nền tảng (Platform Registry + Adapter);
không quản lý Agent/Tool/Prompt của nền tảng đó — các entity đó thuộc M29_AI và tham chiếu
ngược về `platform_id` của M35.

## 2. Đối tượng dữ liệu chính

`AIPlatform` — 1 bản ghi cho mỗi nền tảng số được đăng ký vào AIOS Control Plane.

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `id` | string | Có | Khóa chính |
| `code` | string | Có | Duy nhất, vd `MANLAB`, `VICONNECT` |
| `name` | string | Có | Tên hiển thị |
| `base_url` | string | Không | URL giao diện người dùng của nền tảng |
| `api_base_url` | string | Không | Gốc API dùng cho Tool Gateway forward tới |
| `environment` | enum | Có | `PRODUCTION` / `STAGING` / `INTERNAL` |
| `status` | enum | Có | `HEALTHY` / `DEGRADED` / `DOWN` / `UNKNOWN` — cập nhật bởi health check |
| `owner` | string | Có | Chủ sở hữu nền tảng (người/đơn vị chịu trách nhiệm) |
| `adapter_type` | string | Có | Định danh `IAIPlatformAdapter` xử lý nền tảng này (vd `ManlabPlatformAdapter`, `PlaceholderPlatformAdapter`) |

## 3. Nguyên tắc kiến trúc

- Mỗi nền tảng có đúng 1 `IAIPlatformAdapter` tương ứng `adapter_type` — logic riêng của từng
  nền tảng (cách gọi API, format response) nằm trong adapter, **không** rải điều kiện theo tên
  nền tảng ở tầng registry/API chung.
- Nền tảng chưa có API thật để tích hợp (vd VI-CONNECT ở thời điểm đặc tả này) đăng ký với
  `adapter_type = PlaceholderPlatformAdapter` — adapter trả lỗi `501` rõ ràng thay vì suy đoán
  hành vi, xác nhận lại khi có quyền truy cập API thật.
- Đăng ký một `AIAgent`/`AITool` (bên M29_AI) cho một `platform_id` chưa tồn tại ở đây là lỗi
  ràng buộc — validate ở tầng application.

## 4. Vai trò

Người lập · Người soát xét · Người phê duyệt · Người công bố (đăng ký nền tảng mới đi qua vòng
đời phê duyệt chuẩn của repo — xem [StateMachine.md](../07_Workflow/StateMachine.md)); sau khi
`ACTIVE`, `status` vận hành (HEALTHY/DEGRADED/DOWN) do health check tự động cập nhật, không qua
phê duyệt.

## 5. Quy tắc nghiệp vụ

1. `code` duy nhất toàn hệ thống, không tái sử dụng `code` của nền tảng đã Hủy.
2. Không thể đăng ký `AIAgent`/`AITool` (M29_AI) trỏ tới `platform_id` không tồn tại hoặc đã
   Hết hiệu lực/Hủy.
3. `adapter_type` bắt buộc phải khớp một adapter đã triển khai — không cho phép giá trị tự do
   không tương ứng implementation thật.
4. Đổi `api_base_url` của một Platform đang có Agent/Tool hoạt động phải ghi `AIAuditLog`
   (dùng schema audit chung của M29_AI) vì ảnh hưởng trực tiếp tới Tool Gateway.

## 6. Liên kết

Quy trình: MP35 · Năng lực: CAP-29_AIOffice · Lõi quản trị AI:
[M29_AI](../../M29_AI/01_Requirement/DacTa.md) · API: [API.md](../02_API/API.md).

> Đặc tả làm việc chi tiết hơn (RECON/OUTCOME/SPEC/PLAN đầy đủ) của sáng kiến AIOS Control
> Plane nằm ở module chủ M29_AI:
> [`M29_AI/01_Requirement/_work/20260822-aios-control-plane/`](../../M29_AI/01_Requirement/_work/20260822-aios-control-plane/) —
> không lặp lại toàn văn ở đây, đúng bất biến "một nguồn sự thật".
