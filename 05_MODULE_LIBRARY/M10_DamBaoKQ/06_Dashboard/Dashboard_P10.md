# Dashboard — `P10-DASH` (KPI Đảm bảo hiệu lực kết quả)

> Tổng hợp KPI module M10 cho QLCL/LĐV; đầu vào Xem xét lãnh đạo (M17).
> Nguồn số liệu: API [`../02_API/API.md`](../02_API/API.md) §4 (`/kpi/*`). Đặc tả trang: [`../04_UI/Trang_DamBaoKQ.md`](../04_UI/Trang_DamBaoKQ.md) §1.

---

## 1. Bố cục

```
┌───────────────────────────────────────────────────────────────────────────┐
│  M10 — Dashboard Đảm bảo hiệu lực     Kỳ:[Quý ▾] Phòng:[Tất cả ▾] 📅       │
├───────────────────────────────────────────────────────────────────────────┤
│  ┌── Tỉ lệ đạt ──┐ ┌── Cảnh báo ─┐ ┌── Không đạt ┐ ┌── KPH mở ──┐          │  KPI cards
│  │    92.4%     │ │    5.1%     │ │    2.5%     │ │     7      │          │
│  │  ▲ +1.2đ     │ │  ▼ -0.4đ    │ │  ▲ +0.3đ    │ │  3 trễ hạn │          │
│  └──────────────┘ └─────────────┘ └─────────────┘ └────────────┘          │
│  ┌── Kết quả theo thời gian ─────────┐ ┌── Phân bố theo record_type ────┐  │
│  │  [stacked bar Đạt/CB/KĐ theo kỳ]  │ │  [bar: QC/PT_ILC/STAB/…]       │  │
│  └───────────────────────────────────┘ └────────────────────────────────┘  │
│  ┌── Phân bố z-score (PT/ILC) ───────┐ ┌── Hồ sơ cần chú ý ──────────────┐  │
│  │  [histogram, ngưỡng |z|=2,3]      │ │ P10-…0040 KĐ · chưa CAPA (3d)   │  │
│  │                                   │ │ P10-…0037 EXPIRED               │  │
│  └───────────────────────────────────┘ └────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Chỉ số (KPI)

| KPI | Định nghĩa | Nguồn |
|---|---|---|
| Tỉ lệ ĐẠT | #ĐẠT / #hồ sơ đã đánh giá trong kỳ | `/kpi/summary` |
| Tỉ lệ CẢNH BÁO / KHÔNG ĐẠT | tương ứng theo `result` | `/kpi/summary` |
| KPH mở / trễ hạn | #CAPA chưa đóng (→ M13); đếm quá hạn | `/kpi/summary` |
| Phân bố chỉ số | z/En/zeta/bias/RSD theo `record_type` | `/kpi/indicators` |
| Hồ sơ EXPIRED | `publication_status=EXPIRED` còn hiệu lực khống chế | `/kpi/summary` |

## 3. Biểu đồ

| Khối | Loại | Trục/nhóm |
|---|---|---|
| Kết quả theo thời gian | stacked bar | X: kỳ · nhóm: ĐẠT/CẢNH BÁO/KHÔNG ĐẠT |
| Phân bố theo loại | bar | X: `record_type` · Y: số hồ sơ |
| Phân bố z-score | histogram | vạch ngưỡng |z|=2 (cảnh báo), =3 (hành động) |
| Hồ sơ cần chú ý | bảng | KHÔNG ĐẠT chưa CAPA, EXPIRED, quá hạn soát/duyệt |

## 4. Bộ lọc & phân quyền

- Lọc: kỳ (tháng/quý/năm), phòng, `record_type`, người thực hiện.
- QLCL/LĐV xem toàn phần; vai trò khác chỉ thấy phạm vi được phân quyền.
- Nút **Xuất báo cáo** → [`../05_Report/`](../05_Report) phục vụ M17 (Xem xét lãnh đạo).

## 5. Ghi chú
- Số liệu chỉ đọc, tính từ hồ sơ đã ghi nhận; không cho chỉnh sửa trên dashboard.
- AI (← M29) có thể gắn cờ xu hướng bất thường; chỉ cảnh báo, không kết luận (R5).
