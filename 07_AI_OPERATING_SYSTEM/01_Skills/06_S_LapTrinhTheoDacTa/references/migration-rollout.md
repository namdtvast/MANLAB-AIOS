# Migration & Rollout

Áp dụng khi PLAN có Database Impact hoặc Rollout (thường là Tier M/L).

## Expand-Contract cho migration schema

Ưu tiên khi cần zero/low downtime:

1. **Expand** — thêm cột/bảng mới, giữ nguyên schema cũ song song.
2. **Migrate/backfill** — ghi dữ liệu vào cả cũ và mới (dual-write) hoặc backfill theo batch, không khóa bảng lớn trong 1 transaction.
3. **Switch** — chuyển code đọc/ghi sang schema mới, schema cũ vẫn còn để rollback nhanh.
4. **Contract** — sau khi đã ổn định (đã qua ít nhất 1 chu kỳ release xác nhận không cần rollback), mới xóa schema cũ.

Không gộp bước Contract chung PR với bước Expand/Switch.

## Feature flag

Khi thay đổi hành vi có rủi ro hoặc cần rollout dần: bọc logic mới trong feature flag, mặc định tắt ở production cho tới khi verify xong ở staging/canary.

## Thứ tự deploy

Xác định rõ trong PLAN: backend deploy trước hay frontend trước, có cần compatibility window (backend mới phải tương thích ngược với frontend cũ trong khoảng thời gian nào) hay không.

## Rollback

Mỗi migration/rollout phải có đường rollback thật, không chỉ lý thuyết:

- Migration schema: script rollback ngược lại hoặc chiến lược expand-contract (giữ schema cũ đủ lâu).
- Code: increment nhỏ, mỗi commit revert độc lập được — theo "Git Discipline" ở `SKILL.md` mục 11.
- Feature flag: tắt flag = rollback tức thời không cần deploy lại.

## Monitoring

Nêu rõ chỉ số/log nào cần theo dõi sau khi rollout để phát hiện sớm regression (error rate, latency, tỷ lệ job fail, v.v.) — nếu repo/module chưa có observability cho khu vực này, ghi rõ đây là gap cần biết trước khi rollout Tier L.
