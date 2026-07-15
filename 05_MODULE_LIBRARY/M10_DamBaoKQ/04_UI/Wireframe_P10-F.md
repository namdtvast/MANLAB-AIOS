# Wireframe — Trang `P10-F` (Biểu mẫu hồ sơ P10)

> Bố cục low-fidelity cho trang tạo/sửa hồ sơ bảo đảm hiệu lực.
> Đặc tả trường & ràng buộc: [`Trang_DamBaoKQ.md`](Trang_DamBaoKQ.md) §2, §5.
> Nguyên tắc lõi: các khối trường **hiện/ẩn động theo `record_type`**.

---

## 1. Bố cục tổng thể (desktop ≥ 1280px)

```
┌───────────────────────────────────────────────────────────────────────────┐
│  ETV · ManLab            M10 — Đảm bảo hiệu lực kết quả        [NTH ▾]      │  Topbar
├───────────┬───────────────────────────────────────────────────────────────┤
│           │  ← Danh sách P10      Hồ sơ: P10-2026-0042    [ Nháp ]         │  Header hồ sơ
│  Điều     │  ───────────────────────────────────────────────────────────  │
│  hướng    │                                              [Lưu] [Gửi soát]  │  Thanh hành động
│           │  ┌─ 1. Định danh ──────────────────────────────────────────┐   │
│  ▸ Danh   │  │ assessment_id  [P10-2026-0042]  (tự sinh, chỉ đọc)      │   │
│    sách   │  │ record_type    [PT_ILC ▾]      version [1]  status[Nháp]│   │
│  ▸ Tạo    │  └─────────────────────────────────────────────────────────┘   │
│    mới ◀  │  ┌─ 2. Liên kết ───────────────────────────────────────────┐   │
│  ▸ Soát   │  │ plan_id*      [🔍 F10.01-… ]                            │   │
│    xét    │  │ procedure_id* [🔍 M08 ]   object_id* [🔍 mẫu/lô ]       │   │
│  ▸ Công   │  │ equipment_id[]   [🔍 M05  + thêm]                       │   │
│    bố     │  │ reference_std[]  [🔍 chuẩn + thêm]                      │   │
│  ▸ Dash   │  │ personnel_id* [🔍 M03 ]                                 │   │
│           │  └─────────────────────────────────────────────────────────┘   │
│           │  ┌─ 3. Kỹ thuật ───────────────────────────────────────────┐   │
│           │  │ criteria_id*  [🔍 tiêu chí v… ]  (ưu tiên: luật>CN>…)   │   │
│           │  │ raw_data[]*   [⬆ tải tệp / nhập bảng]                   │   │
│           │  │ evidence[]*   [⬆ tải bằng chứng]                        │   │
│           │  │ ┌ indicators (động theo record_type) ────────────────┐  │   │
│           │  │ │  z-score [ ]   En [ ]   zeta [ ]                    │  │   │
│           │  │ └────────────────────────────────────────────────────┘  │   │
│           │  └─────────────────────────────────────────────────────────┘   │
│           │  ┌─ 4. Kết quả ────────────────────────────────────────────┐   │
│           │  │ result  ( ) ĐẠT   ( ) CẢNH BÁO   ( ) KHÔNG ĐẠT          │   │
│           │  │ 🟡 AI gợi ý: z=2.4 → CẢNH BÁO (cần người xác nhận)     │   │
│           │  └─────────────────────────────────────────────────────────┘   │
│           │  ┌─ 6. Kiểm soát (chỉ đọc) ────────────────────────────────┐   │
│           │  │ created_by NTH·2026-07-16   reviewed_by —  approved_by —│   │
│           │  └─────────────────────────────────────────────────────────┘   │
│           │  ┌─ Audit trail (append-only) ─────────────────────────────┐   │
│           │  │ 2026-07-16 09:12 NTH tạo nháp                           │   │
│           │  └─────────────────────────────────────────────────────────┘   │
└───────────┴───────────────────────────────────────────────────────────────┘
```

`*` = bắt buộc. Khối **5. Công bố** không hiện ở đây (chỉ khi `record_type=PUBLICATION` → xem trang `P10-PUB`).

---

## 2. Khối `indicators` đổi theo `record_type`

| record_type | Trường hiện trong khối 3 |
|---|---|
| `PT_ILC` / `PROFICIENCY` | z-score · En · zeta |
| `QC` | Bias% · Recovery% · RSD-CV% |
| `HOMOGENEITY` | u_hom |
| `STABILITY` | u_stab |
| `CHARACTERIZATION` | U_CRM |
| `TOOL_AI` | checklist xác nhận công cụ số (F10.08) |
| `PLAN` | ẩn khối 3 kỹ thuật + khối 4 kết quả; chỉ nhập kế hoạch (F10.01) |

---

## 3. Trạng thái nút theo vòng đời

```
[Nháp]         → [ Lưu ]  [ Gửi soát xét ]           (chặn nếu thiếu trường* — R2)
[Chờ soát xét] → [ Đạt→duyệt ]  [ Trả lại ⚠reason ]  (chỉ LĐP; ẩn nếu người tạo=người xem)
[Chờ phê duyệt]→ [ Phê duyệt ]  [ Từ chối ⚠reason ]  (chỉ LĐV)
[Đã phê duyệt] → [ Công bố (F10.09) → P10-PUB ]      (chỉ LĐV)
```

- ⚠reason: bấm mở **modal bắt buộc nhập lý do** (R3) → tạo phiên bản mới, giữ bản trước.
- `result=KHÔNG ĐẠT` → hiện banner đỏ + nút **[ Mở KPH-CAPA → M13 ]**, khóa mọi lối phát hành (R4).

---

## 4. Trạng thái rỗng & lỗi

| Tình huống | Hiển thị |
|---|---|
| Thiếu trường bắt buộc khi gửi duyệt | viền đỏ từng field + toast "Thiếu: raw_data, evidence" (R2) |
| Lấy dữ liệu từ F11.03 | badge "Nguồn: F11.03-… · chốt 2026-07-16", khóa sửa; cảnh báo vàng nếu nguồn đổi sau chốt (R1) |
| Bản đã phê duyệt | toàn form chỉ đọc; nút "Sửa" → tạo phiên bản mới (R6) |

---

## 5. Responsive (mobile < 768px)

- Sidebar điều hướng thu vào menu ☰.
- 6 khối xếp dọc 1 cột; thanh hành động dính đáy màn hình (sticky bottom).
- Bảng `raw_data` cuộn ngang trong khung riêng.

---

## Ghi chú triển khai
- Mock high-fidelity (Figma/HTML) sẽ bổ sung sau, tham chiếu file này.
- Ràng buộc R1–R6 trong wireframe khớp 1–1 với [`Trang_DamBaoKQ.md`](Trang_DamBaoKQ.md) §5.
