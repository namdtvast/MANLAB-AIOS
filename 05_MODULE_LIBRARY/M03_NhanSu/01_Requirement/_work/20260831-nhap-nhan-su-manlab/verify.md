# Kiểm chứng đợt nhập — 31/08/2026, CSDL dev local

Đối tượng: [`scripts/nhap-nhan-su-manlab.ts`](../../../../../09_ENGINEERING/aios-platform/scripts/nhap-nhan-su-manlab.ts) chạy trên `aios_platform_dev` (localhost), nguồn là bản kết xuất `.xlsx` ngày 31/08/2026 nằm ngoài repo.

## 1. Kết quả nhập

| Hạng mục | Số lượng |
|---|---|
| Bản ghi đọc được từ bản kết xuất | 145 |
| Bỏ qua — không phải người lao động | 12 |
| Hồ sơ nhân sự đã nhập | 133 |
| Dòng lĩnh vực kiểm định | 63 (29 người) |
| Thẻ kiểm định viên | 28 |
| Cảnh báo phát ra | 31 |

`M03Employee` sau khi nhập: 136 (133 nhập + 3 hồ sơ có sẵn từ `prisma/seed.ts`).

## 2. Đối chiếu với số liệu đã ghi ở `DataModel.md` K5

Đây là phép kiểm quan trọng nhất: hai bên đếm độc lập trên cùng nguồn, lệch nhau là có bên sai.

| Chỉ số | `DataModel.md` K5 | Đếm trên CSDL sau khi nhập | |
|---|---|---|---|
| Thẻ đã hết hạn tính 31/08/2026 | 11/27 | 11 | PASS |
| Thẻ bị nhập đảo ngày | 5 | 5 | PASS |
| Số thẻ trùng chéo | `3961` | `['3961']` | PASS |
| Thẻ thiếu ngày hết hạn | 1 | 1 | PASS |
| Người có lĩnh vực nhưng chưa có thẻ | 3 | 3 | PASS |

Kiểm bằng chính `rules.ts` (không tính tay bằng SQL):

```
Trạng thái thẻ theo rules.ts: { 'KHÔNG CÓ THẺ': 108, VALID: 16, EXPIRED: 11, NO_EXPIRY: 1 }
Lỗi validateInspectorCard phát hiện: 6      (5 đảo ngày + 1 thiếu hạn)
Số thẻ trùng chéo: [ '3961' ]
Người có lĩnh vực: 29 — còn đủ điều kiện kiểm định ít nhất 1 lĩnh vực: 16
```

**Con số đáng chú ý nhất: 29 người được gán lĩnh vực kiểm định, chỉ 16 người còn thẻ hiệu lực.** 13 người đang mang lĩnh vực trên hồ sơ mà thẻ đã hết hạn hoặc thiếu hạn — theo `ETV.P05` §6.2 (khoản 2) và `ETV.P11` §6.3 (tiểu mục 6.3.1, đoạn "Ký GCN" — tiểu mục cấp ba không phải heading nên không trích dẫn thẳng được) thì họ không còn được ký kết quả kiểm định. Đây là dữ liệu vận hành thật, không phải lỗi nhập.

## 3. Các phép kiểm khác

| Phép kiểm | Kết quả | Bằng chứng |
|---|---|---|
| Chạy lại script lần hai | PASS | `Đã ghi: 0 hồ sơ tạo mới · 133 hồ sơ cập nhật` — không nhân bản |
| `code` không đụng hồ sơ có sẵn | PASS | Seed giữ `NS-2026-0001…0003`, dữ liệu nhập bắt đầu từ `NS-2026-0004` |
| Khôi phục phòng ban của người đã nghỉ (K1) | PASS một phần | 27/30 khôi phục được từ tiền tố mã; 3 người không (báo cáo `MẤT BỘ PHẬN GỐC`) |
| `npm test` | PASS | 26 file · 525 test |
| `npx eslint scripts/nhap-nhan-su-manlab.ts` | PASS | sạch |
| `npx tsc --noEmit` | FAIL — **có sẵn từ trước** | Lỗi duy nhất ở `src/app/layout.tsx(32,50)`, không liên quan đợt này; script không phát sinh lỗi kiểu nào |
| `python3 _meta/validate_links.py` | PASS | 567 link · 46 MP · 38 M · 22 CAP · 0 vấn đề |
| `python3 _meta/validate_citations.py --chan` | PASS | 1020 trích dẫn · 0 hỏng |
| Trang `/modules/M03` trên trình duyệt | NOT RUN | Trang yêu cầu đăng nhập; đã kiểm ở tầng dữ liệu bằng chính truy vấn và `rules.ts` mà trang dùng, mã giao diện không đổi trong đợt này |

## 4. Còn lại phải làm

1. **Chạy trên VPS production** — người dùng tự chạy, Claude không có quyền SSH. Trước đó phải `prisma migrate deploy` (VPS còn thiếu hai migration K2–K5, giống tình trạng DB local trước đợt này).
2. **Văn phòng rà 31 cảnh báo**, ưu tiên: 9 mã dùng chung, 3 bản ghi thiếu mã, 2 bản ghi cùng một người (`Hoàng Kim Tùng`), 1 lĩnh vực lạ (`Kế toán Nội bộ`), 5 thẻ đảo ngày.
3. **Cập nhật `DataModel.md` K5** — câu "số thẻ `3961` đang trùng ở hai người và chưa biết bên nào sai" không còn đúng: cùng một người, hai bản ghi; chỗ sai là hai ngày hết hạn khác nhau cho cùng một thẻ.
4. **Bổ sung K10 vào `DataModel.md`** — mã nhân sự ManLab không duy nhất (9 mã dùng chung, 5 bản ghi trống). K2 hiện ngầm coi mã là định danh.
