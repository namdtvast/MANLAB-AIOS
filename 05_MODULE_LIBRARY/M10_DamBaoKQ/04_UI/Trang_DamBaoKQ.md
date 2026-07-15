# M10_DamBaoKQ — Đặc tả trang (UI)

> Khung giao diện số hóa **MP10 — Đảm bảo hiệu lực của các kết quả** (`ETV.P10`, lần ban hành 04).
> Nguồn sự thật nghiệp vụ: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md). Mã nguồn triển khai: `../08_Source/`.

| Đặc tả | Giá trị |
|---|---|
| Module | M10_DamBaoKQ (số hóa 1–1 MP10) |
| Đối tượng dữ liệu | Hồ sơ bảo đảm hiệu lực (`assessment_id`) |
| Trạng thái | Nháp → Chờ soát xét → Chờ phê duyệt → Đã phê duyệt → (Đã công bố) → Hết hiệu lực/Hủy |
| Căn cứ | ISO/IEC 17025 §7.7 (và §7.10, §7.11) |

---

## 1. Bản đồ trang (page inventory)

| Mã trang | Tên trang | Vai trò dùng chính | Mục đích |
|---|---|---|---|
| `P10-L` | Danh sách hồ sơ P10 | Mọi tài khoản | Tra cứu, lọc theo `record_type`/`status`/`result`, mở tạo mới |
| `P10-F` | Biểu mẫu hồ sơ (tạo/sửa) | NTH | Nhập theo `record_type` (F10.01–F10.08), đính kèm dữ liệu thô/bằng chứng |
| `P10-D` | Chi tiết hồ sơ | Tất cả | Xem hồ sơ + audit trail + luồng phê duyệt |
| `P10-R` | Màn soát xét / phê duyệt | LĐP, LĐV | Soát xét (LĐP), phê duyệt/trả lại (LĐV) |
| `P10-PUB` | Công bố nội bộ (F10.09) | LĐV | Chốt trạng thái P10, khống chế phát hành (← F11.03) |
| `P10-DASH` | Dashboard KPI | QLCL, LĐV | z/En/Bias%/RSD, tỉ lệ Đạt–Cảnh báo–Không đạt, KPH mở |

> Chi tiết dashboard đặt riêng ở [`../06_Dashboard/`](../06_Dashboard); trang này chỉ mô tả liên kết điều hướng.

---

## 2. Trang biểu mẫu `P10-F` — bố cục theo nhóm trường

Ánh xạ 1–1 từ §2 của `DacTa.md`. Trường hiển thị **thay đổi theo `record_type`**.

| Khối UI | Trường | Ghi chú UI |
|---|---|---|
| Định danh | `assessment_id`, `record_type`, `version`, `status` | `assessment_id` tự sinh, chỉ đọc; `status` badge |
| Liên kết | `plan_id`, `procedure_id`, `object_id`, `equipment_id[]`, `reference_standard_id[]`, `personnel_id` | picker tra cứu chéo M08/M05/M03; `plan_id` bắt buộc trừ khi `record_type=PLAN` |
| Kỹ thuật | `criteria_id`, `raw_data[]`, `evidence[]`, `indicators` | `indicators` render động theo `record_type`; upload tệp |
| Kết quả | `result` = ĐẠT / CẢNH BÁO / KHÔNG ĐẠT | tính/gợi ý từ `indicators`, người dùng xác nhận |
| Công bố (chỉ F10.09) | `source_certificate_id`, `publication_status`, `release_allowed`, `expires_at`, `capa_id` | khối chỉ hiện khi `record_type=PUBLICATION` |
| Kiểm soát | `created_by`, `reviewed_by`, `approved_by`, `reason`, `source_snapshot_at` | chỉ đọc; `reason` bắt buộc khi trả lại/từ chối/không đạt |

**Hiển thị `indicators` theo `record_type`:**

| record_type | Chỉ số hiển thị |
|---|---|
| PT_ILC / PROFICIENCY | z-score, En, zeta |
| QC | Bias%, Recovery%, RSD-CV% |
| HOMOGENEITY / STABILITY | u_hom, u_stab |
| CHARACTERIZATION | U_CRM |
| TOOL_AI | (xác nhận công cụ số — F10.08) |

---

## 3. Vòng đời & nút hành động (state machine)

```
Nháp ──gửi soát xét──▶ Chờ soát xét ──(LĐP) đạt──▶ Chờ phê duyệt ──(LĐV) duyệt──▶ Đã phê duyệt ──(F10.09)──▶ Đã công bố
  ▲                         │ trả lại (reason)          │ từ chối (reason)                                    │
  └─────────────────────────┴───────────────────────────┘                              Hết hiệu lực/Hủy ◀─────┘
```

| Từ trạng thái | Nút | Điều kiện hiện nút | Vai trò |
|---|---|---|---|
| Nháp | Lưu, Gửi soát xét | đủ trường bắt buộc theo `record_type` | NTH |
| Chờ soát xét | Đạt (chuyển duyệt), Trả lại | không tự soát hồ sơ mình tạo | LĐP |
| Chờ phê duyệt | Phê duyệt, Từ chối | đủ dữ liệu thô + bằng chứng | LĐV |
| Đã phê duyệt | Công bố (F10.09) | mở trang `P10-PUB` | LĐV |

---

## 4. Ma trận phân quyền (permission matrix)

| Hành động | NTH/Mọi TK | LĐP | LĐV | QLCL | QTHT/ATTT |
|---|:--:|:--:|:--:|:--:|:--:|
| Tạo nháp / gửi duyệt | ✅ | ✅ | ✅ | — | — |
| Soát xét | — | ✅ | — | — | — |
| Phê duyệt / công bố | — | — | ✅ | — | — |
| Theo dõi KPH-CAPA / KPI | — | — | ✅ | ✅ | — |
| Phân quyền, audit, sao lưu | — | — | — | — | ✅ |

> **Bất biến:** không ai tự soát xét/tự phê duyệt hồ sơ do mình tạo (DacTa §3.2).

---

## 5. Ràng buộc UI bắt buộc (map từ control rules)

| # | Ràng buộc trên giao diện | Nguồn |
|---|---|---|
| R1 | Khi lấy từ `F11.03`: khóa sửa dữ liệu nguồn, lưu `source_certificate_id` + `source_snapshot_at`; hiện cảnh báo nếu nguồn đổi sau thời điểm sao chép | §3.1 |
| R2 | Chặn nút **Chờ phê duyệt** nếu thiếu trường bắt buộc / dữ liệu thô / bằng chứng theo `record_type` | §3.3 |
| R3 | **Trả lại / Từ chối / Không đạt** bắt buộc modal nhập `reason`; hệ thống tạo phiên bản mới, giữ bản trước | §3.4 |
| R4 | `result=KHÔNG ĐẠT` hoặc `FAIL-BLOCKED` → khóa nút phát hành, bắt buộc mở/liên kết KPH-CAPA (→ M13) | §3.6 |
| R5 | Gợi ý AI (← M29) chỉ hiển thị dạng cờ cảnh báo; không có nút "AI tự phê duyệt"; đầu ra AI phải người đủ năng lực xác nhận | §3.8 |
| R6 | Panel audit trail append-only, chỉ đọc; bản đã phê duyệt không sửa trực tiếp — nút "Sửa" tạo phiên bản mới | §3.9 |

---

## 6. Điều hướng & liên kết chéo

- Picker dữ liệu: nhân sự (M03), thiết bị/chuẩn (M05), quy trình/phương pháp (M08).
- `P10-PUB` đọc chứng chỉ nguồn từ **F11.03 / M11**; đẩy trạng thái P10 sang khống chế nút phát hành.
- Nhánh không đạt → mở KPH/CAPA ở **M13**.
- KPI tổng hợp → đầu vào Xem xét lãnh đạo **M17**.

---

## 7. Việc còn mở (TODO)

- [x] Wireframe/mockup cho `P10-F` (bố cục động theo `record_type`) → [`Wireframe_P10-F.md`](Wireframe_P10-F.md).
- [x] Chốt component bảng danh sách + bộ lọc `P10-L` → [`Wireframe_P10-L.md`](Wireframe_P10-L.md).
- [x] Đặc tả trạng thái công bố `P10-PUB` khớp bảng trạng thái F10.09 (PASS/CONDITIONAL/WARNING/FAIL-BLOCKED/EXPIRED) → [`Wireframe_P10-PUB.md`](Wireframe_P10-PUB.md).
- [ ] Liên kết đặc tả API tương ứng ở [`../02_API/`](../02_API).
