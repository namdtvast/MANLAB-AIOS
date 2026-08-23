# M04_MoiTruong — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P04_MoiTruong.md` (Thủ tục ETV.P04, lần ban hành 03,
> **Đã phê duyệt** 21/07/2026, 4 biểu mẫu đi kèm).

## 1. Mục tiêu module

Số hóa MP04 — kiểm soát tiện nghi/điều kiện môi trường (nhiệt độ, độ ẩm) tại PTN và bảo quản
chuẩn đo lường/thiết bị/hóa chất, lập kế hoạch công việc + an toàn tại hiện trường, theo ISO/IEC
17025 §6.3 + Luật ATVSLĐ 2015 + Luật Bảo vệ môi trường 2020.

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `EnvironmentLog` | Bảng theo dõi điều kiện môi trường theo khu vực (nhiệt độ/độ ẩm, ≥2 lần/ngày) | F04.01 |
| `ChemicalCabinetLog` | Theo dõi điều kiện tủ bảo quản hóa chất | F04.02 |
| `EquipmentCabinetLog` | Theo dõi điều kiện tủ bảo quản thiết bị | F04.04 |
| `FieldWorkPlan` | Kế hoạch công việc + an toàn tại hiện trường | F04.03 |

### 2.1. `EnvironmentLog` / `*CabinetLog` (cấu trúc chung)

`area_code` (ref Phụ lục II — khu vực/phòng), `measured_at`, `temperature`, `humidity`,
`device_ref` (thiết bị giám sát, vd ibeacon0x), `within_spec` (tự tính so với ngưỡng Phụ lục II),
`reported_by`, `abnormal_action` (bắt buộc nếu `within_spec = false`).

### 2.2. `FieldWorkPlan`

`site`, `customer` (Bên A), `personnel[]`, `schedule`, `work_items[]` (nội dung/yêu cầu kỹ
thuật/an toàn từng hạng mục), `risk_level` (thường/cao — làm việc trên cao, không gian hạn chế,
hóa chất/khí nguy hiểm), `approved_by` (TP, hoặc **LĐV nếu risk_level = cao**), `briefed` (đã phổ
biến cho nhân sự tham gia trước khi thi công).

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Phê duyệt phương án mặt bằng/ngân sách; phê duyệt `FieldWorkPlan` **rủi ro cao**; quyết định dừng hoạt động khi môi trường không đảm bảo diện rộng |
| TP | Giám sát kiểm soát tiện nghi/môi trường; phê duyệt `FieldWorkPlan` không thuộc thẩm quyền LĐV; xử lý số liệu bất thường |
| QLKT | Xác nhận điều kiện môi trường phù hợp yêu cầu từng quy trình đo trước khi thực hiện phép đo |
| QLCL | Kiểm soát hồ sơ theo dõi môi trường/tủ bảo quản theo ETV.P15 |
| Cán bộ quản lý thiết bị/mẫu chuẩn | Ghi chép định kỳ EnvironmentLog/CabinetLog; báo cáo ngay khi bất thường |
| Nhân sự chính phụ trách hiện trường | Lập `FieldWorkPlan`; điều phối, giám sát an toàn tại hiện trường |

## 4. Quy tắc nghiệp vụ

1. Điều kiện môi trường từng khu vực phải ghi nhận **tối thiểu 2 lần/ngày**, so sánh với ngưỡng
   quy định theo khu vực (Phụ lục II — vd phòng đo áp suất: 20±2°C hoặc 20±5°C tùy quy trình).
2. Phát hiện số liệu bất thường → báo ngay TP/QLKT; **dừng ngay** việc kiểm định/hiệu chuẩn/thử
   nghiệm nếu điều kiện xấu ảnh hưởng tới kết quả phép đo.
3. Thông số môi trường liên quan yêu cầu cụ thể của phép đo phải ghi vào biên bản đo lường (liên
   kết → M10/M11), không chỉ lưu riêng ở EnvironmentLog.
4. `FieldWorkPlan` **bắt buộc lập trước khi triển khai** đợt công tác hiện trường; phổ biến cho
   toàn bộ nhân sự tham gia trước khi thi công.
5. `FieldWorkPlan` có `risk_level = cao` (làm việc trên cao/không gian hạn chế/hóa chất-khí nguy
   hiểm) → bắt buộc **LĐV phê duyệt**, không chỉ TP.
6. Hóa chất không tương thích phải cách ly vật lý; hóa chất ăn mòn/độc hại có quy định vị trí đặt
   riêng (không dưới bồn rửa, không cao hơn tầm vai) — ràng buộc mô tả (validation), không phải
   trường dữ liệu tự động kiểm tra được.
7. Thiết bị/vật tư có yêu cầu nghiêm ngặt về an toàn lao động phải có giấy phép sử dụng + kiểm
   định trước khi đưa vào hiện trường.
8. Hồ sơ theo dõi môi trường/tủ bảo quản/kế hoạch hiện trường lưu theo **ETV.P15**.

## 5. Liên kết

Quy trình: MP04 · Năng lực: CAP-08_HieuChuan, CAP-09_KiemDinh, CAP-10_ThuNghiem · Thủ tục gốc:
`ETV.P04_MoiTruong.md` (Đã phê duyệt, lần 03) · Biểu mẫu: F04.01–F04.04 · Lưu hồ sơ: ETV.P15 ·
Liên quan: M03 (đào tạo an toàn ban đầu), M05 (thiết bị/chuẩn đo lường được bảo quản), M10/M11
(thông số môi trường ghi vào biên bản đo lường) · Căn cứ: ISO 9001 §7.1.3/§7.1.4, ISO/IEC 17025
§6.3, Luật ATVSLĐ 84/2015/QH13, Luật Bảo vệ môi trường 72/2020/QH14, QCVN 03:2011/BLĐTBXH, QCVN
18:2004/BXD.

## 6. Triển khai thật (Increment 7, aios-platform)

Đã xây thành CRUD + 2 gate nghiệp vụ thật trong `09_ENGINEERING/aios-platform` (Prisma +
Next.js), không có `08_Source` nguyên mẫu (giống M01/M02/M03). Chi tiết đầy đủ + bằng chứng
VERIFY: `01_Requirement/_work/20260823-xay-moi-m04/{spec.md, plan.md, verify.md}`.

**Quyết định phạm vi cần LĐP xác nhận lại**:
1. Gộp `EnvironmentLog`/`ChemicalCabinetLog`/`EquipmentCabinetLog` thành **1 model
   `M04ConditionLog`** với field `logType` — đúng theo gợi ý "cấu trúc chung" đã có sẵn ở mục 2.1
   phía trên, không phải cắt giảm phạm vi.
2. Bảng cấu hình ngưỡng `M04AreaSpec` chỉ seed **4 khu vực mẫu minh họa** (Phòng đo áp suất, Kho
   hóa chất, Kho thiết bị, Phòng hiệu chuẩn chung) — **không phải danh mục đầy đủ Phụ lục II
   thật**; DacTa.md chưa transcribe chi tiết toàn bộ Phụ lục II nên chưa thể seed đủ.

Gate chính đã verify thật qua Browser: `M04ConditionLog.withinSpec` tự tính hoàn toàn ở server
(không nhận từ client), bắt buộc biện pháp xử lý khi vượt ngưỡng (quy tắc 2); `M04FieldWorkPlan`
mức Rủi ro cao chỉ LĐV được phê duyệt, TP bị chặn đúng thông báo (quy tắc 5).

Vai trò module: `NV`, `TP`, `LDV` — dùng lại 3 tài khoản demo M01/M02/M03, không tạo tài khoản
mới. `QLKT`/`QLCL` chưa có action riêng trong Increment 7.
