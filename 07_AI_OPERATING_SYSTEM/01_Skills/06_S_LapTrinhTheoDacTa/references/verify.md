# VERIFY

Verify là bắt buộc. Build thành công không phải bằng chứng đủ.

## Verification Status — chỉ dùng đúng 5 giá trị

```
PASS
FAIL
NOT RUN
NOT APPLICABLE
BLOCKED
```

Mọi `PASS` phải có evidence, ví dụ:

```
Build: PASS
Evidence: `dotnet build` → exit code 0

Unit Tests: PASS
Evidence: `dotnet test Tests.Unit` → 148 passed, 0 failed
```

Không bao giờ suy luận `Build PASS → Tests PASS`. Nếu test chưa chạy: ghi `NOT RUN`, không ghi `PASS`.

## Main Flow

Verify luồng chính (primary user journey) của tính năng/thay đổi.

## Diff

Kiểm tra `git status` và `git diff`. Xác nhận: chỉ file dự kiến bị đổi; không có debug code; không có file tạm; không có secret; không có file generated ngoài ý muốn; không có thay đổi không liên quan.

## Access Control

Khi áp dụng, test: Unauthenticated, sai role, sai tenant, sai tổ chức, sai ownership, user bị disable, credential hết hạn.

Với hệ thống multi-tenant: Tenant A không được đọc/sửa/export/enqueue job/hay truy cập tài nguyên của Tenant B dưới bất kỳ hình thức nào.

## Data Integrity

Test khi áp dụng: Create, Read, Update, Delete, Duplicate, Null, Invalid input, Transaction, Rollback, Concurrency, Migration, Backward compatibility.

## Security

Xem checklist đầy đủ ở [security-checklist.md](security-checklist.md).

## Regression

Chạy khi áp dụng: Unit tests, Integration tests, Regression tests, Build, Lint, Type check.

**Riêng MANLAB-AIOS:** nếu thay đổi đụng Hub/module/capability, chạy thêm `python3 _meta/validate_links.py` và coi đây là một hạng mục Regression bắt buộc, không tùy chọn.

## Tier XS/S — VERIFY DIFF rút gọn

Với XS: chỉ cần Diff review + chạy lại chức năng vừa sửa 1 lần thủ công/test có sẵn, ghi PASS/FAIL kèm evidence.
Với S: thêm Regression liên quan trực tiếp (test của file/module vừa sửa), bỏ qua Access Control/Data Integrity nếu không liên quan.

## Evidence Rule

Không bao giờ bịa evidence verify. Evidence phải đến từ: lệnh đã thực thi, kết quả test thật, khảo sát repo, khảo sát diff, hoặc verify thủ công có thể tái lập.

Nếu môi trường/tooling không cho phép chạy: ghi `NOT RUN — <lý do>` hoặc `BLOCKED — <lý do>`. Không bao giờ thay evidence còn thiếu bằng ngôn ngữ khẳng định chắc chắn ("chắc chắn đã đúng", "chắc là pass").
