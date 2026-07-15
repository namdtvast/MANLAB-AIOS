# Wireframe — Trang `P10-PUB` (Công bố nội bộ F10.09)

> Điểm chốt nội bộ trạng thái P10, khống chế nút phát hành. **Không thay thế F11.03.**
> Đặc tả: [`Trang_DamBaoKQ.md`](Trang_DamBaoKQ.md) §1, §2 (khối Công bố), §5-R4. Chỉ **LĐV**.

---

## 1. Bố cục (desktop)

```
┌───────────────────────────────────────────────────────────────────────────┐
│  ETV · ManLab     M10 — Công bố nội bộ (F10.09)              [LĐV ▾]       │
├───────────┬───────────────────────────────────────────────────────────────┤
│  Điều     │  ← Chi tiết hồ sơ    P10-2026-0042    [ Đã phê duyệt ]         │
│  hướng    │  ───────────────────────────────────────────────────────────  │
│           │  ┌─ Nguồn chứng chỉ (← F11.03 / M11) ──────────────────────┐   │
│  ▸ Công   │  │ source_certificate_id [🔍 F11.03-2026-0210]            │   │
│    bố ◀   │  │ chốt lúc source_snapshot_at: 2026-07-16 09:40 (chỉ đọc)│   │
│           │  │ ⚠ nếu nguồn đổi sau thời điểm chốt → banner cảnh báo    │   │
│           │  └─────────────────────────────────────────────────────────┘   │
│           │  ┌─ Trạng thái công bố ────────────────────────────────────┐   │
│           │  │ publication_status  [ CONDITIONAL ▾ ]                   │   │
│           │  │ release_allowed     ● Cho phép  ○ Khóa                  │   │
│           │  │ expires_at          📅 [2027-07-16]                     │   │
│           │  │ capa_id             [🔍 M13 ]  (bắt buộc nếu FAIL)      │   │
│           │  └─────────────────────────────────────────────────────────┘   │
│           │  🟡 Xem trước khống chế phát hành → CONDITIONAL: cho phát   │   │
│           │     hành kèm cảnh báo, hết hạn 2027-07-16.                  │   │
│           │                              [ Hủy ] [ Công bố → F11.03 ]   │   │
└───────────┴───────────────────────────────────────────────────────────────┘
```

Chỉ mở được khi hồ sơ ở trạng thái **Đã phê duyệt**; nút cuối chuyển sang **Đã công bố**.

---

## 2. Bảng trạng thái công bố → khống chế phát hành

| `publication_status` | `release_allowed` | Nút phát hành (F11.03) | Điều kiện |
|---|:--:|---|---|
| `PASS` | Cho phép | ✅ Mở | result = ĐẠT |
| `CONDITIONAL` | Cho phép (kèm cảnh báo) | ⚠️ Mở + ghi chú | ĐẠT có điều kiện; cần `expires_at` |
| `WARNING` | Cho phép (gắn cờ) | ⚠️ Mở + cờ | result = CẢNH BÁO |
| `FAIL-BLOCKED` | Khóa | ⛔ Chặn | result = KHÔNG ĐẠT → **bắt buộc `capa_id`** (R4) |
| `EXPIRED` | Khóa | ⛔ Chặn | quá `expires_at` |

---

## 3. Ràng buộc UI

| # | Ràng buộc | Nguồn |
|---|---|---|
| R1 | Khóa sửa dữ liệu nguồn F11.03; hiện cảnh báo nếu nguồn đổi sau `source_snapshot_at` | §3.1 |
| R4 | `FAIL-BLOCKED` → khóa `release_allowed`, bắt buộc chọn/mở `capa_id` (→ M13) trước khi lưu | §3.6 |
| R7 | F10.09 là chốt nội bộ; sau công bố, trạng thái truyền sang F11.03 khống chế nút phát hành — **không** ghi đè F11.03 | §3.7 |
| R8 | Chỉ LĐV thao tác; không ai tự công bố hồ sơ do mình tạo | §3.2, §4 |

---

## 4. Sau khi công bố

- Ghi `AuditLog` append-only: ai công bố, trạng thái gì, khi nào.
- Đẩy `publication_status` + `release_allowed` + `expires_at` sang **F11.03 / M11**.
- Cập nhật KPI → đầu vào Xem xét lãnh đạo **M17**.
- Trạng thái `EXPIRED` tự kích hoạt khi quá `expires_at` (job nền), khóa phát hành.
