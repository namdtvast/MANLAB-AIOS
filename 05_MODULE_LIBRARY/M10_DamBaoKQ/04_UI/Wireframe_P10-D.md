# Wireframe — Trang `P10-D` (Chi tiết hồ sơ P10)

> Xem hồ sơ (chỉ đọc) kèm luồng phê duyệt và audit trail.
> Đặc tả: [`Trang_DamBaoKQ.md`](Trang_DamBaoKQ.md) §1, §3, §5.

---

## 1. Bố cục (desktop)

```
┌───────────────────────────────────────────────────────────────────────────┐
│  ETV · ManLab      M10 — Chi tiết hồ sơ P10                   [ LĐP ▾]     │
├───────────┬───────────────────────────────────────────────────────────────┤
│  Điều     │  ← Danh sách   P10-2026-0042 · PT_ILC · v1   [ Chờ soát xét ] │
│  hướng    │  ───────────────────────────────────────────────────────────  │
│           │  [ Đạt → chuyển duyệt ]  [ Trả lại ⚠ ]   (chỉ LĐP, R3)        │
│           │  ┌── Tóm tắt ─────────────────┬── Luồng phê duyệt ──────────┐  │
│           │  │ Đối tượng: Mẫu A           │ ● Tạo    NTH   07-16 09:12  │  │
│           │  │ Quy trình: M08-PP-014      │ ◌ Soát   —                  │  │
│           │  │ Nhân sự:  NTH (M03)        │ ◌ Duyệt  —                  │  │
│           │  │ Kết quả:  🟡 CẢNH BÁO      │ ◌ Công bố —                 │  │
│           │  └────────────────────────────┴─────────────────────────────┘  │
│           │  ┌── Kỹ thuật ────────────────────────────────────────────┐    │
│           │  │ criteria_id: TC-ISO17043 v2   indicators: z=2.4 En=0.8 │    │
│           │  │ raw_data[3] 📎   evidence[2] 📎   (bấm để xem/tải)      │    │
│           │  └─────────────────────────────────────────────────────────┘    │
│           │  ┌── Nguồn (nếu ← F11.03) ────────────────────────────────┐    │
│           │  │ source_certificate_id: —   source_snapshot_at: —       │    │
│           │  └─────────────────────────────────────────────────────────┘    │
│           │  ┌── Audit trail (append-only) ───────────────────────────┐    │
│           │  │ 07-16 09:12 NTH tạo nháp                                │    │
│           │  │ 07-16 10:40 NTH gửi soát xét                            │    │
│           │  └─────────────────────────────────────────────────────────┘    │
│           │  ▸ Phiên bản: v1 (hiện) · so sánh với —                       │
└───────────┴───────────────────────────────────────────────────────────────┘
```

---

## 2. Hành động theo trạng thái & vai trò

| status hồ sơ | Nút hiện | Vai trò | Ghi chú |
|---|---|---|---|
| Nháp | Sửa (→ `P10-F`) | người tạo | |
| Chờ soát xét | Đạt→duyệt · Trả lại ⚠ | LĐP | ẩn nếu người xem = người tạo (R8) |
| Chờ phê duyệt | Phê duyệt · Từ chối ⚠ | LĐV | R2: chặn nếu thiếu dữ liệu/bằng chứng |
| Đã phê duyệt | Công bố (→ `P10-PUB`) | LĐV | |
| KHÔNG ĐẠT (bất kỳ) | Mở KPH-CAPA → M13 | LĐV/QLCL | banner đỏ, khóa phát hành (R4) |

⚠ = modal bắt buộc nhập `reason`, tạo phiên bản mới (R3, R6).

---

## 3. Thành phần

- **Panel phiên bản**: liệt kê v1..vn; chọn 2 bản để so sánh diff.
- **AI (← M29)**: hiển thị cờ cảnh báo dạng chip; không có nút "AI kết luận"/"AI duyệt" (R5).
- **Audit trail**: chỉ đọc, không xóa/sửa; bản đã phê duyệt không ghi đè (R6).

---

## 4. Responsive (mobile)

- 2 cột Tóm tắt/Luồng xếp dọc; thanh hành động sticky đáy.
- Audit trail & phiên bản gom vào tab.
