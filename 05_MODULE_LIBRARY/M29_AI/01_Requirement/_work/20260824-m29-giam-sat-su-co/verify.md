# VERIFY — M29 Increment 4

**Môi trường:** worktree riêng `m29-inc-wt`, DB riêng `aios_platform_m29inc`, dev server cổng 3129
(tách khỏi `aios_platform_dev`/cổng 3000 đang dùng chung với các phiên song song).
**Tài khoản kiểm thử:** `ai-admin@manlab.vn` (AI_ADMIN) — tài khoản mẫu trong `prisma/seed.ts`.

## 1. Kiểm tra tự động

| Hạng mục | Lệnh | Kết quả |
|---|---|---|
| Type check | `npx tsc --noEmit` | **PASS** (không lỗi ở `lib/m29`, `api/m29`, UI M29) |
| Lint | `npm run lint` | **PASS** (1 lỗi `react-hooks/purity` do `Date.now()` trong render đã sửa: chuyển việc xác định "quá hạn" sang truy vấn DB) |
| Build | `npm run build` | **PASS** — 3 route mới xuất hiện: `/modules/M29/incidents`, `/modules/M29/incidents/[id]`, `/modules/M29/incidents/new`, `/modules/M29/unregistered` |
| Migration | `npx prisma migrate dev` | **PASS** — `20260823214556_m29_inc4_giam_sat_su_co` áp dụng sạch |
| Toàn vẹn link repo | `python3 _meta/validate_links.py` | **PASS** — 412 link · 38 MP · 38 M · 22 CAP · 0 vấn đề |

## 2. Acceptance Criteria

| AC | Nội dung | Cách kiểm | Kết quả |
|---|---|---|---|
| AC-01 | AIA quá hạn → AIA `REVIEW_REQUIRED` + Agent `SUSPENDED`, audit `actor=SYSTEM` | Browser: vào `/modules/M29`, sweep tự chạy | **PASS** — `AGENT_TOMTAT_HOSO` hiện "Tạm dừng · Hồ sơ AIA quá hạn rà soát"; audit ghi 2 dòng `SYSTEM (SYSTEM)` |
| AC-02 | Agent `SUSPENDED` gọi Tool → Gateway từ chối | Kịch bản gọi `callTool()` thật trên DB verify | **PASS** — `AGENT_NOT_ACTIVE`, nêu rõ lý do `AIA_OVERDUE`, không forward tới nền tảng |
| AC-03 | Phê duyệt lại AIA → Agent trở lại `ACTIVE` | Browser: Khởi tạo lại → Gửi soát xét → Phê duyệt AIA | **PASS** — AIA "Đã phê duyệt", Agent "Hoạt động" |
| AC-04 | Lập phiếu `SEVERE` gắn Agent → Agent bị tạm dừng ngay | Browser: lập `SCAI-2026-0001` cho `AGENT_TROLY_M29` | **PASS** — Agent chuyển "Tạm dừng · Khống chế sự cố SCAI-2026-0001" dù AIA của nó vẫn `APPROVED` |
| AC-05 | Người phát hiện tự đóng phiếu → từ chối | Kịch bản logic | **PASS** — `SELF_CLOSE_FORBIDDEN` |
| AC-06 | Đóng thiếu `capRef` / thiếu `f28Ref` → từ chối | Kịch bản logic | **PASS** — `CAP_REQUIRED`, `F28_REQUIRED` |
| AC-07 | `AI_ADMIN` đóng phiếu `SEVERE` bị chặn, `SUPER_ADMIN` đóng được | Kịch bản logic | **PASS** — `APPROVER_ROLE_REQUIRED`; SUPER_ADMIN trả `ok:true` |
| AC-08 | Đóng "Đã đăng ký" không chọn Agent → từ chối | Browser: bấm "Đã đăng ký" khi chưa chọn | **PASS** — hiện `AGENT_REQUIRED` trên giao diện |
| AC-09 | Bản ghi có dữ liệu nhạy cảm chưa gắn phiếu sự cố → không đóng được | Kịch bản logic (cả 2 nhánh đóng) | **PASS** — `INCIDENT_REQUIRED` |
| AC-10 | `/api/m29/sweep`: không/sai token → 401, token đúng → 200 | `curl` 3 tình huống | **PASS** — 401 / 401 / `{"ok":true,...}` 200 |

**Đối chứng không phá hành vi cũ:** Agent `ACTIVE` gọi cùng Tool qua Gateway vẫn trả
`{"ok":true, traceId, requestId, toolCallId}` — 7 bước kiểm soát cũ giữ nguyên thứ tự, bước mới chỉ
chèn thêm.

**Bằng chứng idempotent (NFR):** gọi `/api/m29/sweep` lần thứ hai trả `aiaFlagged: 0,
agentsSuspended: 0` — AIA đã ở `REVIEW_REQUIRED` không bị quét lại, không sinh audit trùng.

**Phân biệt hai nguyên nhân tạm dừng:** sau khi phê duyệt lại AIA của `AGENT_TOMTAT_HOSO`, tác tử
đó trở lại "Hoạt động" trong khi `AGENT_TROLY_M29` **vẫn** "Tạm dừng · Khống chế sự cố" — đúng thiết
kế R2: phê duyệt một hồ sơ AIA không vô tình gỡ khống chế sự cố.

## 3. Phát hiện ngoài dự kiến trong lúc BUILD/VERIFY

1. **Lỗ hổng có thật ở bản trước** — 7 bước của Tool Gateway không hề xét `AIAgent.status`, nên
   Agent `DISABLED` vẫn gọi được Tool. Đã bịt bằng bước kiểm tra mới (quy tắc nghiệp vụ 12).
2. **`/api/m29/sweep` ban đầu bị `src/proxy.ts` chặn** (redirect 307 về `/login`), cron ngoài không
   gọi được. Đã thêm route này vào `PUBLIC_PATHS` — route tự xác thực bằng token và trả 503 khi
   chưa cấu hình `M29_SWEEP_TOKEN`, không bao giờ mở public.
3. **`audit/page.tsx` đọc `e.actor.name`** sẽ vỡ khi audit do SYSTEM ghi (actor null). Đã sửa
   thành `e.actor?.name ?? e.actorLabel ?? "SYSTEM"` — đúng rủi ro đã lường trước trong PLAN.

## 4. Chưa verify / giới hạn đã biết

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Nhánh 503 của `/api/m29/sweep` khi **chưa cấu hình** `M29_SWEEP_TOKEN` | **NOT RUN** | Chỉ đọc mã, chưa chạy thật (môi trường verify đã đặt token) |
| Lịch cron thật gọi `/api/m29/sweep` ở môi trường triển khai | **NOT APPLICABLE** | Ngoài phạm vi increment; repo chưa có hạ tầng cron |
| Sweep tự động khi **không ai truy cập** module suốt 15 phút | **NOT RUN** | Cơ chế `maybeSweep()` phụ thuộc lượt truy cập; đường cron mới là đường bảo đảm, đã kiểm ở AC-10 |
| Kiểm thử tự động (unit/integration) cho `rules.ts` mới | **NOT RUN** | Repo chưa có bộ test cho `aios-platform`; verify lần này bằng kịch bản chạy tay + Browser |
