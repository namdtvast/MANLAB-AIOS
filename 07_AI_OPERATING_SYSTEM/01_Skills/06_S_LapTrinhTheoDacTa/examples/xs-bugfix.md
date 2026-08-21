# Ví dụ Tier XS — Bugfix 1 file

**Yêu cầu:** "Nút Reset ở webapp M10 không hoạt động trên Firefox."

## CLASSIFY
Tier XS — 1 file, không đổi schema/API/phân quyền.

## RECON
```
[FACT] webapp/src/... gọi POST /api/reset qua fetch(), Chrome chạy được, Firefox báo lỗi CORS/preflight trong console.
[FACT] api/server.js hiện chỉ set header CORS cho GET, không cho POST.
```

## MICRO OUTCOME
Người dùng bấm Reset trên Firefox thấy dữ liệu về trạng thái seed, giống hành vi trên Chrome.

## BUILD
- Sửa `api/server.js`: thêm `Access-Control-Allow-Methods: POST` (và xử lý `OPTIONS` preflight nếu thiếu).

## VERIFY DIFF
```
Diff: chỉ 1 file api/server.js, không có debug code.
Test: chạy `node server.js`, bấm Reset trên Firefox → PASS (kiểm tra thủ công, evidence: log server nhận POST /api/reset 200).
Result: PASS
```
