---
form_code: ETV.P.F24.02
form_name: Bảng Theo Dõi Lương/Thưởng
form_type: Salary & Bonus Tracking Form
procedure_ref: ETV.P24
issue_date: 2025-11-30
version: 01
applicable_to: Salary Calculation & Bonus Payment Processing
responsible_dept: Văn phòng & Kỹ thuật vụ
---

# ETV.P.F24.02 – BẢNG THEO DÕI LƯƠNG/THƯỞNG

**Kỳ tính lương:** Từ _______ đến _______  
**Tháng/Quý/Năm:** _________  
**Số phiếu:** ________

---

## I. THÔNG TIN CHUNG

### Bảng 1: Dữ liệu đầu vào

| Chỉ tiêu | Giá trị | Ghi chú |
|---|---|---|
| Tổng nhân viên | | |
| Nhân viên có dữ liệu KPI | | |
| Nhân viên có KPI không đạt | | |
| Mức lương bình quân | | |

---

## II. BẢNG TÍNH LƯƠNG 3P CHI TIẾT

### Bảng 2: Lương từng nhân viên

| TT | Tên nhân viên | Chức vụ | P1 (Vị trí) | P2 (Hiệu quả) | P3 (Năng lực) | Phụ cấp | Thưởng | **Tổng (3P)** | KPI % | Trạng thái |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | | |
| 2 | | | | | | | | | | |
| 3 | | | | | | | | | | |
| ... | | | | | | | | | | |

### Công thức tính toán

**P1 (Lương vị trí):**
$$
P1 = \text{Mức lương HĐ} \times \text{Hệ số ngạch/bậc}
$$

**P2 (Lương hiệu quả):**
$$P2 = \begin{cases} 
0 & \text{nếu HQ\% < 100\%} \\
P1 \times (HQ\% - 100\%) \times 0.5 & \text{nếu HQ\% ≥ 100\%}
\end{cases}$$

**P3 (Lương năng lực):**
$$P3 = \begin{cases} 
0 & \text{nếu NL\% < 100\%} \\
P1 \times (NL\% - 100\%) \times 0.3 & \text{nếu NL\% ≥ 100\%}
\end{cases}$$

**Tổng lương (3P):**
$$
\text{Tổng} = P1 + P2 + P3 + \text{Phụ cấp} + \text{Thưởng}
$$

---

## III. KPI VÀ ĐÁNH GIÁ HIỆU SUẤT

### Bảng 3: Kết quả KPI

| TT | Tên nhân viên | HQ (%) | NL (%) | Hệ số thời gian | Xếp loại | Ghi chú |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |

**Xếp loại:**
- **A (Xuất sắc):** HQ ≥ 120% + NL ≥ 120%
- **B (Đạt):** HQ ≥ 100% + NL ≥ 100%
- **C (Cơ bản):** HQ 80-99% hoặc NL 80-99%
- **D (Cần cải tiến):** HQ < 80% hoặc NL < 80%

---

## IV. TÍNH THUẾ TNCN & BẢO HIỂM

### Bảng 4: Tổng hợp thuế & bảo hiểm

| TT | Tên nhân viên | Thu nhập tính thuế | Bảo hiểm (BHXH) | Bảo hiểm (BHYT) | Bảo hiểm (BHTN) | Thuế TNCN | Thu nhập ròng |
|---|---|---|---|---|---|---|---|
| 1 | | | | | | | |
| 2 | | | | | | | |

**Công thức:**
- Thu nhập tính thuế = Tổng (3P) - Bảo hiểm cá nhân - Giảm trừ bản thân - Giảm trừ NPT
- Bảo hiểm cá nhân ≈ 10.5% mức lương ký HĐ
- Thuế TNCN: Lũy tiến theo bậc thuế (5% → 10% → 20% → 30% → 35%)

---

## V. THƯỞNG ĐẶC BIỆT (NẾU CÓ)

### Bảng 5: Các khoản thưởng bổ sung

| TT | Tên nhân viên | Thưởng Chuyên cần | Thưởng KPI | Thưởng Đặc biệt | Tổng thưởng | Căn cứ |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |

**Điều kiện nhận thưởng:**
- Chuyên cần (Hệ số thời gian ≥ 95%): 1-3 triệu/người
- KPI cao (HQ ≥ 120%): 2-5 triệu/người
- Đặc biệt (quyết định LĐV): Tùy từng trường hợp

---

## VI. QUY TRÌNH PHÊ DUYỆT

| Bước | Người thực hiện | Hành động | Ngày |
|---|---|---|---|
| 1 | Kế toán | Khởi tạo nháp (Nháp) | |
| 2 | Kế toán | Đề nghị LĐP duyệt | |
| 3 | LĐP | Soát xét & duyệt | |
| 4 | Nhân viên | Xác nhận lương (hoặc tự động sau 4h) | |
| 5 | LĐV | Phê duyệt chốt số | |

---

## VII. PHIẾU TÍNH LƯƠNG CÁ NHÂN

### Mẫu phiếu để gửi từng nhân viên xác nhận

```
╔════════════════════════════════════════════════════════════╗
║          PHIẾU TÍNH LƯƠNG/THƯỞNG CÁ NHÂN                  ║
╠════════════════════════════════════════════════════════════╣
║ Tên: _____________________  Chức vụ: _____________________║
║ Mã NV: __________  Kỳ: Tháng ___/Năm ______             ║
╠════════════════════════════════════════════════════════════╣
║ Chi tiết lương:                                           ║
║   P1 (Lương vị trí)       : ______________ đ              ║
║   P2 (Hiệu quả)          : ______________ đ              ║
║   P3 (Năng lực)          : ______________ đ              ║
║   Phụ cấp                : ______________ đ              ║
║   Thưởng                 : ______________ đ              ║
║ ─────────────────────────────────────────────────────     ║
║   TỔNG LƯƠNG (3P)        : ______________ đ              ║
╠════════════════════════════════════════════════════════════╣
║ Khấu trừ:                                                 ║
║   Bảo hiểm BHXH          : ______________ đ              ║
║   Bảo hiểm BHYT          : ______________ đ              ║
║   Bảo hiểm BHTN          : ______________ đ              ║
║   Giảm trừ bản thân      : ______________ đ              ║
║   Thuế TNCN              : ______________ đ              ║
║ ─────────────────────────────────────────────────────     ║
║   THU NHẬP RÒNG          : ______________ đ              ║
╠════════════════════════════════════════════════════════════╣
║ Xác nhận:     ☐ Đồng ý      ☐ Không đồng ý              ║
║ Lý do (nếu không đồng ý): _____________________________  ║
║                                                           ║
║ Ký: _______________  Ngày: _____________                ║
╚════════════════════════════════════════════════════════════╝
```

---

## VIII. LƯU TRỮ HỒ SƠ

Hồ sơ phải lưu:
- ☐ Bảng tổng hợp KPI tháng
- ☐ Bảng tính lương 3P chi tiết
- ☐ Phiếu tính lương từng nhân viên (đã ký)
- ☐ Bảng tổng hợp thuế & bảo hiểm
- ☐ Quyết định thưởng (nếu có)
- ☐ Hồ sơ dữ liệu gốc từ ManLab

**Thời hạn lưu:** Tối thiểu **3 năm** theo ETV.MP15

---

## IX. CHỮ KÝ & PHÊ DUYỆT

| Vị trí | Tên | Chữ ký | Ngày |
|---|---|---|---|
| **Kế toán trưởng** (Khởi tạo) | | | |
| **LĐP** (Soát xét & duyệt) | | | |
| **LĐV** (Phê duyệt cuối) | | | |

---

## X. GHI CHÚ QUAN TRỌNG

- Tất cả dữ liệu phải có bằng chứng hỗ trợ (KPI record, công nhật, v.v.)
- Không được tính lương 3P nếu không có KPI hợp lệ → P2, P3 = 0
- Sau khi LĐV phê duyệt → **không được chỉnh sửa** (chốt số liệu)
- Khiếu nại phải nộp trong vòng **5 ngày** kể từ ngày nhận phiếu
- Bất kỳ thay đổi sau phê duyệt → yêu cầu **bảng điều chỉnh** riêng
