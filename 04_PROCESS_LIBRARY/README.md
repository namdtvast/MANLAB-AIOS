# 04 — PROCESS LIBRARY ⭐ (Quy trình — Hub)

**Ý nghĩa:** Tầng này là **trung tâm điều phối** của toàn bộ hệ thống. Bao gồm 38 quy trình (MP01–MP38), mỗi cái là một **Process Hub** — không chứa nội dung chi tiết mà chỉ trỏ tới các tầng khác qua liên kết có quản lý. Một Process Hub kết nối procedure, BPMN, biểu mẫu, module, AI skill, quy tắc, và bằng chứ tuân thủ thành một **chuỗi số hoàn chỉnh** (digital thread).

---

## Cấu Trúc Process Hub — 3 File Chuẩn

Mỗi `MPxx_Slug/` gồm đúng **3 file**:

| File | Mục đích | Nội dung |
|---|---|---|
| `README.md` | Metadata cơ bản | Mã MP, tên, tiêu chuẩn áp dụng, năng lực liên quan, module ánh xạ, chủ sở hữu |
| `manifest.yaml` | Định nghĩa quy trình | Định dạng chuẩn hóa: code, name, owner, status, standards, capabilities, module mapping |
| `links.yaml` | Điều hướng tới các tầng | Trỏ tới procedure (Tầng 03), ISO/Law (Tầng 08), module (Tầng 05), form (Tầng 06), skill (Tầng 07), evidence (Tầng 11), capabilities (Tầng 02) |

### Ví Dụ: MP01_RuiRo

```
MP01_RuiRo/
├── README.md
│   └─ Bảng: mã, tên, tiêu chuẩn (ISO9001 §6.1, ISO17025 §8.5), năng lực (CAP-16), module (M01)
├── manifest.yaml
│   └─ schema: manlab-aios/process@1.0
│      code: MP01
│      name: Giải quyết rủi ro và cơ hội
│      standards: [ISO9001, ISO17025]
│      module: M01
│      owner: Risk Officer
│      status: active
└── links.yaml
    └─ procedure:  ../../03_MANAGEMENT_SYSTEM/01_QM/ETV.QM_QuanlyChatluong.md
       iso:        ../../03_MANAGEMENT_SYSTEM
       module:     ../../05_MODULE_LIBRARY/M01_RuiRo
       forms:      ../../06_SHARED_RESOURCES/01_Forms
       skill:      ../../07_AI_OPERATING_SYSTEM/01_Skills
       law:        ../../08_KNOWLEDGE_GRAPH/01_Regulations
       evidence:   ../../11_COMPLIANCE/03_Evidence
       capabilities:
         - ../../02_CAPABILITIES/CAP-16_ChatLuong
```

---

## Nguyên Tắc Hub Pattern

### 1. "Hub, Không Nội Dung"

Tầng 04 **KHÔNG chứa**:
- ❌ Tệp thủ tục .docx đầy đủ
- ❌ Bản copy của biểu mẫu
- ❌ Mã nguồn module
- ❌ Hồ sơ hoàn thành/minh chứng
- ❌ Tiêu chuẩn/luật gốc

Thay vào đó, tất cả các tài liệu này **lưu ở tầng chuyên dụng** (03, 05, 06, 08, 11, v.v.) và **được link** từ `links.yaml`.

### 2. "Một Nguồn Sự Thật" (One Source of Truth)

Nếu biểu mẫu được cập nhật ở `06_SHARED_RESOURCES/01_Forms/F14.01_YeuCauHieuChuan.md`, tất cả các MP sử dụng biểu mẫu này chỉ cần link tới đó — không có sao chép.

```
06_SHARED_RESOURCES/01_Forms/F14.01_YeuCauHieuChuan.md
    ↑
    ├─ MP08_PhuongPhap/links.yaml
    ├─ MP09_LayMau/links.yaml
    └─ MP10_DamBaoKQ/links.yaml
```

### 3. "Số hóa ↔ Quy trình 1:1"

Mỗi Module Mxx (Tầng 05) ánh xạ **một và chỉ một** Quy trình MPxx (Tầng 04), trừ khi ngoại lệ được phê duyệt và ghi rõ trong `manifest.yaml`:

```yaml
# manifest.yaml
module: M08         # mặc định M08 = MP08
module_exceptions:  # (nếu có)
  - code: M08A      # module phụ hỗ trợ
    description: "Mở rộng quy trình đặc biệt"
    approval: "QA Director, 2025-01-15"
```

---

## Chuỗi Số Hoàn Chỉnh — Digital Thread

Mỗi Process Hub kết nối một **chuỗi dữ liệu xuyên suốt**:

```
Nhu cầu Khách hàng
    ↓ (MP07_HopDong)
Hợp Đồng + Biểu mẫu Yêu cầu (F07.01, F14.01)
    ↓ (MP07, MP09)
Kế Hoạch + Lấy Mẫu
    ↓ (MP08, MP10)
Hiệu Chuẩn / Kiểm Định / Thử Nghiệm + Kết Quả
    ↓ (MP11)
Báo Cáo + Chứng Chỉ Số
    ↓ (MP12, MP13)
Khiếu Nại (nếu có) → CAPA → Bài Học Kinh Nghiệm
    ↓ (MP16, MP25)
Cải Tiến Quy Trình
```

Mỗi bước:
- **Procedure** định rõ cách làm (Tầng 03)
- **Process Hub (MPxx)** điều hướng quy trình
- **Module (Mxx)** số hóa thực thi
- **Forms** thu thập dữ liệu (Tầng 06)
- **AI Skill** hỗ trợ (Tầng 07)
- **Evidence** ghi chép minh chứng (Tầng 11)

---

## Lưu Gì Ở Đây

### Bắt Buộc cho mỗi MP

| File | Nội dung | Tình trạng |
|---|---|---|
| `README.md` | Metadata: MP code, tên, tiêu chuẩn, năng lực, module | Bắt buộc |
| `manifest.yaml` | Định nghĩa chuẩn hóa MP | Bắt buộc |
| `links.yaml` | Liên kết tới các tầng khác | Bắt buộc |

### Tùy chọn (nếu cần mở rộng)

| File/Folder | Mục đích | Ghi chú |
|---|---|---|
| `01_Procedure/` | Tóm tắt thủ tục hoặc link chi tiết | Link từ `links.yaml` tốt hơn |
| `02_BPMN/` | Sơ đồ quy trình BPMN | Có thể lưu ở đây hoặc link từ `03_MANAGEMENT_SYSTEM` |
| `03_Forms_Links/` | Danh mục biểu mẫu sử dụng | Tốt hơn là liệt kê trong `links.yaml` |

> **Hiện tại (v4.0):** Tầng 04 chỉ dùng 3 file chuẩn. Các folder con (01, 02, 03...) là **kế hoạch tương lai** khi Process Hub cần lưu trữ nội dung ngắn gọn (BPMN, tóm tắt procedure) — chưa triển khai.

---

## KHÔNG Lưu Ở Đây

| Tài liệu | Lưu Đúng Chỗ | Ghi chú |
|---|---|---|
| Thủ tục Procedure (.docx, .md) | → `03_MANAGEMENT_SYSTEM/02_P/` | MP link tới từ `links.yaml` |
| Biểu mẫu F-xxx | → `06_SHARED_RESOURCES/01_Forms/` | MP trỏ đường dẫn từ `links.yaml` |
| Module/Code | → `05_MODULE_LIBRARY/Mxx/` | MP ghi module mapping ở `manifest.yaml` |
| Tiêu chuẩn/Luật | → `08_KNOWLEDGE_GRAPH/01-04/` | MP trỏ từ `links.yaml` |
| Hồ sơ/Bằng chứ | → `11_COMPLIANCE/` | MP trỏ từ `links.yaml` |
| AI Skill code | → `07_AI_OPERATING_SYSTEM/01_Skills/` | MP liên kết từ `links.yaml` |

---

## Quy Tắc Nhanh — Tự Hỏi Trước Khi Thêm

> **Tôi có muốn thêm 1 thư mục con vào MPxx không?**

1. **Là tóm tắt thủ tục hoặc BPMN ngắn gọn?** → Để ngoài, link từ `links.yaml` tới tệp gốc ở Tầng 03
2. **Là danh mục biểu mẫu?** → Liệt kê trong `links.yaml` hoặc `README.md`, không cần folder
3. **Là hướng dẫn triển khai module Mxx?** → Lưu ở `05_MODULE_LIBRARY/Mxx/README.md`, không ở MP
4. **Là bằng chứ tuân thủ?** → Lưu ở `11_COMPLIANCE/`, MP trỏ từ `links.yaml`

**Đáp án:** Nếu không chắc, để ở tầng chuyên dụng rồi link.

---

## Liên Kết Và Phụ Thuộc

### Tầng 02 (Capabilities) → Tầng 04 (Process)

Mỗi CAP định rõ quy trình MP thực hiện nó:

```yaml
# 02_CAPABILITIES/CAP-08_HieuChuan/capability.yaml
processes:
  - MP04_MoiTruong
  - MP05_ThietBi
  - MP08_PhuongPhap
  - MP10_DamBaoKQ
  - MP11_BaoCao
```

### Tầng 03 (Management) → Tầng 04 (Process)

Mỗi Procedure ở Tầng 03 được triển khai qua 1+ quy trình MP:

```
03_MANAGEMENT_SYSTEM/02_P/ETV.P04_HieuChuan.md
    ↓
04_PROCESS_LIBRARY/MP04_MoiTruong/links.yaml (trỏ lại)
                   MP05_ThietBi/links.yaml
                   MP08_PhuongPhap/links.yaml
```

### Tầng 04 (Process) → Tầng 05 (Module)

Mỗi Process Hub tham chiếu Module:

```yaml
# 04_PROCESS_LIBRARY/MP08_PhuongPhap/manifest.yaml
module: M08  # Module M08 hiện thực hóa MP08
```

Module quay lại liên kết qua:

```yaml
# 05_MODULE_LIBRARY/M08_PhuongPhap/manifest.yaml
process: MP08
```

---

## Tần Suất Cập Nhật

| Hoạt động | Tần suất | Cách quản lý |
|---|---|---|
| Thêm/sửa MP | Khi thay đổi quy trình | Cập nhật `manifest.yaml`, kiểm tra `links.yaml` khớp với các tầng |
| Cập nhật `links.yaml` | Khi các tầng khác thay đổi | Xác minh đường dẫn tương đối vẫn đúng |
| Thêm ngoại lệ module | Hiếm, phải phê duyệt | Ghi rõ reason + approval + ngày ở `manifest.yaml` |
| Cập nhật README | Cùng lúc cập nhật procedure | Đảm bảo metadata khớp với `manifest.yaml` |

---

## Tản Mạn

- **Hub là điểm tham chiếu trung tâm**, không phải kho lưu trữ. Nếu MP04 trở nên quá nặng (chứa nhiều file), đó là dấu hiệu cần tách thành các tầng chuyên dụng.
- **`links.yaml` là "cáp tủ điện" của quy trình** — mọi kết nối khác đều đi qua đây. Không có `links.yaml` chính xác → AI không thể tìm được tài liệu cần thiết.
- **Mỗi MP phải có ít nhất một liên kết tới Module (Tầng 05)**. Nếu chưa số hóa → `status: inactive` ở `manifest.yaml`.
- **Tầng 04 là "bảng điều khiển" của doanh nghiệp** — muốn thêm dịch vụ mới? Trước tiên tạo MP mới, rồi mới thiết kế Module.
