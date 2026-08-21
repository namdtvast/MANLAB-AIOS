# Ví dụ Tier L — Đổi authorization architecture

**Yêu cầu (giả định):** "Chuyển M10 từ phân quyền mô phỏng qua header `X-Role` sang xác thực thật (JWT + RBAC) để chuẩn bị đưa vào production nhiều phòng thí nghiệm dùng chung."

## CLASSIFY
Tier L — đổi kiến trúc authentication/authorization của một module đang chạy thật, ảnh hưởng mọi endpoint hiện có, có khả năng phá hủy khả năng tương thích với mọi client hiện tại của `api/`.

## STOP trước khi PLAN
Đây thuộc đúng danh sách STOP bắt buộc ở `SKILL.md` mục 12 ("đổi kiến trúc authentication"). Không tự quyết định thiết kế JWT/RBAC — phải hỏi người dùng/chủ sở hữu module:
```
[QUESTION] Ai là nguồn xác thực (tự cấp JWT hay tích hợp SSO của Viện)?
[QUESTION] RBAC map role nào (technician/lab_manager/qa) — có bảng phân quyền chính thức chưa hay skill này phải đề xuất mới (nếu đề xuất mới → nên phối hợp với 01_S_Governance)?
[QUESTION] Có cần giữ tương thích ngược với `X-Role` header cho môi trường demo/dev không, hay cắt hẳn?
```

## Sau khi được phê duyệt hướng đi (ví dụ minh hoạ, không phải quyết định thật)

### Risk Analysis (trích, Tier L bắt buộc đầy đủ)
| Rủi ro | Mức độ | Biện pháp |
|---|---|---|
| Token giả mạo nếu secret yếu | CRITICAL | Dùng secret đủ mạnh, ký bằng thư viện JWT chuẩn, không tự viết |
| Client cũ dùng X-Role gãy hoàn toàn | HIGH | Compatibility window: chấp nhận cả 2 cơ chế trong 1 giai đoạn, có deprecation log |
| Permission bypass khi map role sai | CRITICAL | Test access control đủ ma trận role × endpoint trước khi tắt X-Role |

### Rollout
```
Feature flag: AUTH_MODE=legacy|jwt, mặc định legacy cho tới khi verify xong ở staging.
Migration order: deploy backend hỗ trợ cả 2 mode trước → chuyển client sang gửi JWT → verify → tắt legacy.
Rollback: set AUTH_MODE=legacy tức thời nếu phát hiện lỗi, không cần revert code.
```

### Approval gate
Trước khi thực thi bước "tắt legacy" (phá hủy khả năng quay lại `X-Role`), bắt buộc xin phê duyệt rõ ràng của người dùng — đúng yêu cầu "explicit permission required" cho hành động khó đảo ngược/ảnh hưởng hệ thống dùng chung.

## Kết quả mong đợi khi hoàn tất
Artifact đầy đủ (`outcome.md`, `spec.md`, `plan.md`, `verify.md`) lưu tại `05_MODULE_LIBRARY/M10_DamBaoKQ/01_Requirement/_work/<work-id>/`, hợp nhất vào `DacTa.md`, và ghi rõ trong `verify.md` ma trận test access-control đã chạy cho từng role × endpoint với evidence thật.
