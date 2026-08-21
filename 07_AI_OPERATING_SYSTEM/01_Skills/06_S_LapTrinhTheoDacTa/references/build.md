# BUILD

Triển khai theo từng increment đã định nghĩa ở PLAN.

Với mỗi increment:

```
IMPLEMENT → TEST → REVIEW → CONTINUE
```

Ưu tiên thay đổi nhỏ nhất an toàn nhất.

## Quy tắc

- Theo đúng convention đã có trong repo/module đang sửa.
- Không refactor code không liên quan.
- Không xóa comment không liên quan.
- Không thay dependency khi không cần thiết.
- Không tự redesign kiến trúc khi chưa có lý do rõ ràng.
- Không tự mở rộng phạm vi ngầm.
- Không trộn cleanup không liên quan vào cùng thay đổi được yêu cầu.

## Ghi lại sau mỗi increment

```
Implemented:
Files changed:
Tests run:
Result:
Remaining:
```

Nếu test bắt buộc fail:

```
STOP CURRENT INCREMENT → diagnose → correct → rerun test
```

Không báo increment pass khi test liên quan đang fail.

## Spec Drift

Nếu BUILD phát hiện SPEC/PLAN đã duyệt sai hoặc thiếu:

1. Dừng phần implementation bị ảnh hưởng.
2. Ghi lại delta phát hiện được.
3. Xác định delta có làm thay đổi: business behavior, data, security, API, permissions, hay acceptance criteria không.
4. Cập nhật lại SPEC và PLAN (file artifact tương ứng — xem `SKILL.md` mục 10).
5. Chỉ tiếp tục khi thay đổi là an toàn.

Không bao giờ âm thầm implement hành vi khác với đặc tả đã có. Spec drift ở Tier L hoặc liên quan an toàn/bảo mật bắt buộc xin phê duyệt trước khi tiếp tục (xem STOP Conditions ở `SKILL.md` mục 12).
