# Ví dụ Tier S — Feature cục bộ (~3 file)

**Yêu cầu:** "Thêm bộ lọc theo trạng thái (Pending/Approved/Rejected) vào danh sách phiếu ở webapp M10."

## CLASSIFY
Tier S — 3 file liên quan (component list, state, có thể thêm 1 helper filter), không đổi schema DB, không đổi API contract (lọc phía client trên dữ liệu đã fetch).

## RECON
```
[FACT] webapp/src/pages/List.js render toàn bộ record trả về từ GET /api/records.
[FACT] Mỗi record có field `status` ∈ {pending, approved, rejected} theo api/rules.mjs.
[ASSUMPTION] Lọc phía client là đủ vì số lượng record hiện tại nhỏ (seed data), không cần lọc server-side.
```

## OUTCOME
Người quản lý có thể lọc nhanh danh sách phiếu theo trạng thái để chỉ xem việc cần xử lý, không phải kéo qua toàn bộ danh sách.

## MINI SPEC
```
BR-01: Bộ lọc mặc định = "Tất cả" (không lọc).
GIVEN danh sách có record ở cả 3 trạng thái
WHEN chọn "Pending"
THEN chỉ hiển thị record có status = pending, đếm số lượng hiển thị đúng.
```

## MINI PLAN
```
MODIFY: webapp/src/pages/List.js (thêm dropdown filter + state)
MODIFY: webapp/src/rules.js (nếu cần helper filter dùng chung)
CREATE: (không cần file mới)
P1: thêm state + dropdown UI
P2: áp filter vào render + test thủ công 3 trạng thái
```

## BUILD → VERIFY
```
Build: không có bước build riêng (ES modules thuần) → NOT APPLICABLE
Test thủ công: chọn từng trạng thái, đối chiếu số lượng hiển thị với data.json → PASS
Diff: chỉ 2 file trong webapp/src, không đụng api/ → PASS
Result: PASS
```
