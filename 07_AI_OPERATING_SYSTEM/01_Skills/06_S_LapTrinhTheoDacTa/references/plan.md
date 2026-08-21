# PLAN

Không sửa code trong pha PLAN.

## Architecture Impact

```
Frontend:
Backend:
Database:
Authentication:
Authorization:
API:
Domain:
Data layer:
Background jobs:
Testing:
Deployment:
```

## Database Impact

```
Tables added:
Tables modified:
Columns:
Indexes:
Constraints:
Migration:
Data backfill:
Backward compatibility:
Rollback:
```

Ưu tiên migration kiểu expand-contract khi cần zero/low downtime — chi tiết ở [migration-rollout.md](migration-rollout.md).

## File Impact

Liệt kê rõ:

```
CREATE
MODIFY
DO NOT MODIFY
```

Không sửa file ngoài phạm vi đã liệt kê mà không cập nhật lại PLAN trước.

## Implementation Increments

Ví dụ:

```
P1  Data/model + tests
P2  Domain logic + tests
P3  API + tests
P4  Authorization + tests
P5  UI + tests
P6  Documentation/OpenAPI
P7  Final verification
```

Test thuộc về mọi increment — không dồn hết test vào cuối.

## Rollout

Khi liên quan, định nghĩa: Feature flag, thứ tự migration, thứ tự deploy backend/frontend, compatibility window, backfill, monitoring, rollback, chiến lược git revert. Chi tiết: [migration-rollout.md](migration-rollout.md).

## Risk Analysis

Đánh giá: Data loss, Permission bypass, Tenant leakage, Breaking API, Migration failure, Concurrency, Performance, Security, Regression, Dependency impact.

Xếp hạng mỗi rủi ro liên quan: `LOW / MEDIUM / HIGH / CRITICAL`. Rủi ro `HIGH`/`CRITICAL` phải có biện pháp giảm thiểu **trước khi** implement.

## Tier XS/S — MINI PLAN

Không cần đủ mọi mục. Nêu: file sẽ CREATE/MODIFY, 1–3 increment (thường gộp làm 1), và rủi ro nếu có (thường là không có với XS).
