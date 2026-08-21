# SPEC

Bắt buộc đầy đủ cho Tier M/L. Chỉ điền phần áp dụng — không bịa business rule còn thiếu.

## UI

Với mỗi màn hình bị ảnh hưởng:

```
Purpose:
User:
Input:
Output:
Actions:
Validation:
Permission:
Loading state:
Empty state:
Error state:
```

## Data

```
Entities
Fields
Types
Relations
Constraints
Indexes
Audit fields
Version/concurrency fields
```

## Business Rules

Đánh số ID cho mọi rule quan trọng:

```
BR-01
BR-02
BR-03
```

Không tự bịa business rule còn thiếu — nếu thiếu, ghi `[QUESTION]` ở RECON và STOP nếu nó ảnh hưởng hành vi/dữ liệu/bảo mật (xem "STOP Conditions" ở `SKILL.md` mục 12).

## State

```
States
Allowed transitions
Forbidden transitions
Authorized roles
Triggers
Side effects
```

## API

Định nghĩa trước khi code:

```
Method
Path
Authorization
Request
Response
Validation
Status codes
Error codes
```

Nếu repo/module đã có OpenAPI, giữ đồng bộ implementation với OpenAPI (không để lệch).

## Acceptance Criteria

Dùng scenario kiểm chứng được:

```
GIVEN
WHEN
THEN
```

## Non-Functional Requirements

Đánh giá khi áp dụng: Performance, Scalability, Availability, Concurrency, Logging, Observability, Audit trail, Privacy, Retention, Backup, Timezone, Localization (ưu tiên tiếng Việt có dấu trong UI/thông báo lỗi hướng người dùng cuối ETV), Accessibility, Idempotency, Traceability, Electronic signature/version integrity (đặc biệt quan trọng với module liên quan hồ sơ/kết quả đo lường theo ISO 17025/17034).

## Tier XS/S — MINI SPEC

Không cần đủ mọi mục trên. Viết gọn 3–6 dòng: business rule chạm tới (nếu có ID), input/output thay đổi, và 1–2 acceptance criteria GIVEN/WHEN/THEN.
