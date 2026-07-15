# Wireframe — Trang `P10-L` (Danh sách hồ sơ P10)

> Trang tra cứu/lọc hồ sơ bảo đảm hiệu lực, điểm vào tạo mới.
> Đặc tả trường: [`Trang_DamBaoKQ.md`](Trang_DamBaoKQ.md) §1, §2.

---

## 1. Bố cục (desktop ≥ 1280px)

```
┌───────────────────────────────────────────────────────────────────────────┐
│  ETV · ManLab        M10 — Đảm bảo hiệu lực kết quả            [NTH ▾]      │
├───────────┬───────────────────────────────────────────────────────────────┤
│  Điều     │  Danh sách hồ sơ P10                        [ + Tạo hồ sơ ]    │
│  hướng    │  ───────────────────────────────────────────────────────────  │
│  ▸ Danh   │  🔍 [ tìm assessment_id / object_id … ]                        │
│    sách◀  │  Lọc: record_type[▾] status[▾] result[▾] 📅[từ–đến] người[▾]   │
│  ▸ Tạo    │  ───────────────────────────────────────────────────────────  │
│    mới    │  ┌──────────┬────────┬────────┬────────┬────────┬───────────┐  │
│  ▸ Soát   │  │ Mã hồ sơ │ Loại   │ Đối    │ Kết    │ Trạng  │ Cập nhật  │  │
│    xét    │  │          │        │ tượng  │ quả    │ thái   │           │  │
│  ▸ Công   │  ├──────────┼────────┼────────┼────────┼────────┼───────────┤  │
│    bố     │  │P10-…0042 │PT_ILC  │Mẫu A   │🟡CB    │Chờ soát│2026-07-16 │  │
│  ▸ Dash   │  │P10-…0041 │QC      │Lô 12   │🟢Đạt   │Đã duyệt│2026-07-15 │  │
│           │  │P10-…0040 │STAB…   │CRM-3   │🔴KĐ    │Nháp    │2026-07-15 │  │
│           │  └──────────┴────────┴────────┴────────┴────────┴───────────┘  │
│           │  ◀ 1 2 3 … ▶            Hiển thị 20/▾   Tổng: 128 hồ sơ         │
└───────────┴───────────────────────────────────────────────────────────────┘
```

Bấm 1 dòng → mở trang chi tiết `P10-D`.

---

## 2. Bộ lọc

| Bộ lọc | Nguồn giá trị | Ghi chú |
|---|---|---|
| `record_type` | PLAN/QC/PROFICIENCY/PT_ILC/HOMOGENEITY/STABILITY/CHARACTERIZATION/TOOL_AI/PUBLICATION | đa chọn |
| `status` | Nháp/Chờ soát xét/Chờ phê duyệt/Đã phê duyệt/Đã công bố/Hết hiệu lực/Hủy | đa chọn |
| `result` | ĐẠT / CẢNH BÁO / KHÔNG ĐẠT | badge màu 🟢🟡🔴 |
| Khoảng ngày | theo `source_snapshot_at`/cập nhật | picker từ–đến |
| Người | `created_by` / `reviewed_by` / `approved_by` | ← M03 |

Bộ lọc lưu trên URL (chia sẻ được). Có preset nhanh: **"Chờ tôi soát xét"**, **"KHÔNG ĐẠT chưa có KPH"**.

---

## 3. Cột & sắp xếp

| Cột | Sắp xếp | Ghi chú |
|---|:--:|---|
| Mã hồ sơ (`assessment_id`) | ✅ | link chi tiết |
| Loại (`record_type`) | ✅ | badge |
| Đối tượng (`object_id`) | — | rút gọn, hover xem đầy đủ |
| Kết quả (`result`) | ✅ | 🟢🟡🔴 |
| Trạng thái (`status`) | ✅ | badge vòng đời |
| Cập nhật | ✅ (mặc định giảm dần) | |

---

## 4. Phân quyền hiển thị

- Mọi tài khoản thấy danh sách; nút hành động ở dòng theo vai trò (soát xét chỉ LĐP, phê duyệt chỉ LĐV — theo §4 đặc tả).
- Không lộ hồ sơ ngoài phạm vi phân quyền (QTHT/ATTT cấu hình).

---

## 5. Responsive (mobile < 768px)

- Bảng → thẻ (card) mỗi hồ sơ: mã + badge loại/kết quả/trạng thái + ngày.
- Bộ lọc gom vào nút **[ Lọc ]** mở drawer.
