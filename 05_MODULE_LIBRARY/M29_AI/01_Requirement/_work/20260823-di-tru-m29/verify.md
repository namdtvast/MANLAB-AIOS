# M29_AI — Increment 3: Verify

Tham chiếu `spec.md`/`plan.md` cùng thư mục. Mọi PASS dưới đây kèm thao tác thật qua Browser,
không suy luận từ code.

## Kết quả

| Hạng mục | Trạng thái | Evidence |
|---|---|---|
| `npx tsc --noEmit` | **PASS** | Không có output lỗi (chạy nhiều lần, lần cuối sau khi sửa bug archive prompt version) |
| `npx eslint . --max-warnings=0` | **PASS** | Không có output lỗi/cảnh báo |
| `npx prisma migrate dev` ×2 (`m29_ai_control_plane`, `m29_approved_by`) | **PASS** | Áp dụng thành công, additive |
| `npx prisma db seed` | **PASS** | Log thật: "Đã nạp dữ liệu mẫu M29 (1 Agent đủ đường dây...) + vai trò M29 cho 5 tài khoản." |
| `python3 _meta/validate_links.py` | **PASS** | `Đã kiểm tra 377 link · 38 MP · 38 M · 22 CAP. Vấn đề: 0` |
| RBAC: role chưa gán bị chặn xem module | **PASS** | Đăng nhập LĐV (không có vai trò M29) → `/modules/M29` báo "chưa được gán vai trò" |
| RBAC: AI_ADMIN thấy đủ menu, thao tác được | **PASS** | Đăng nhập ai-admin@manlab.vn → thấy Platform/Agent/registry/traces/audit |
| **AIA Gate chặn thật** | **PASS** | Gắn cờ AIA "Cần rà soát lại" → gọi Tool Gateway → lỗi đúng message gốc: `Agent "Trợ lý AI (M29)" chưa có hồ sơ AI Impact Assessment ở trạng thái Đã phê duyệt (hiện tại: REVIEW_REQUIRED) — Tool Gateway chặn theo ISO/IEC 42001.` |
| AIA Gate cho qua sau khi duyệt lại | **PASS** | start-draft→submit-review→approve → gọi lại Tool Gateway thành công, sinh AIRequest+AIToolCall thật (traceId `cmt4zua6b00008bscp4rdu2bv`, xem trang Trace) |
| Tool Gateway gọi Platform Adapter thật | **PASS** | `ManlabPlatformAdapter` gọi thật `http://localhost:8010/api/kpi/summary` (server M10 standalone cũ đang chạy song song), trả OK 6ms — xác nhận qua trang Trace |
| Disable Tool → chặn Agent gọi | **PASS** | Vô hiệu hóa Tool ở trang Registry → gọi lại → lỗi đúng bản gốc: "Tool đang bị vô hiệu hóa — Tool Gateway chặn, không forward tới nền tảng." |
| Prompt versioning: tạo version mới không ghi đè | **PASS** | Tạo version DRAFT trong khi bản ACTIVE cũ còn nguyên nội dung/trạng thái |
| Prompt lifecycle đầy đủ | **PASS** | DRAFT→(submit-review)REVIEW→(approve)APPROVED→(activate)ACTIVE — cả 4 bước chạy thật qua UI |
| Audit Log ghi đủ actor/entity/field/reason | **PASS** | Trang `/modules/M29/audit` hiển thị đúng chuỗi thao tác vừa làm, actor+role đúng người đang đăng nhập |
| Health check thủ công | **PASS** | Bấm "Kiểm tra ngay" → `AIPlatform(MANLAB).health` chuyển UNKNOWN→HEALTHY thật (gọi `adapter.health()` thật), VICONNECT giữ UNKNOWN (PlaceholderPlatformAdapter) |
| Console lỗi (browser) | **PASS** | `read_console_messages` rỗng trên tab mới hoàn toàn ở mọi bước |

## Bug phát hiện khi VERIFY (không chỉ đọc code) — đã sửa

**Thiếu bước archive PromptVersion cũ khi activate bản mới.** RECON ban đầu trích `promptTransitions.activate()`
từ `rules.mjs` nhưng bỏ sót logic archive nằm RIÊNG trong `server.js` (không phải trong `rules.mjs`):

```js
// server.js — bản gốc
if (r.status === PROMPT_STATUS.ACTIVE && agent) {
  const prevActiveId = agent.active_prompt_version_id;
  if (prevActiveId && prevActiveId !== v.id) { const prev = findById('promptVersions', prevActiveId); if (prev) prev.status = PROMPT_STATUS.ARCHIVED; }
  agent.active_prompt_version_id = v.id;
}
```

Phát hiện qua Browser thật: tạo version mới → activate → cả 2 version cùng hiển thị "Đang hiệu lực"
(bug rõ ràng, không phải chỉ đọc code mới thấy). Đã sửa `src/lib/m29/actions.ts#promptAction` — thêm
bước archive bản active cũ trước khi gán `activePromptVersionId` mới, verify lại bằng version thứ 3:
kết quả đúng — chỉ 1 bản "Đang hiệu lực", bản trước chuyển "Hết hiệu lực".

**Bài học cho lần port tiếp theo**: khi 1 hành vi được cài trong route handler (`server.js`) thay vì
trong module rule thuần (`rules.mjs`), RECON phải đọc CẢ HAI, không dừng lại ở file "rules" có vẻ
authoritative nhất.

## Ngoài phạm vi Increment 3 (đã nêu trong spec.md, nhắc lại để không nhầm "đã xong")

- **AISecret**: `createSecret`/`rotateSecret`/`disableSecret` đã viết trong `actions.ts` (đúng
  logic mask), nhưng **CHƯA có trang UI** để gọi — chưa verify qua Browser, chỉ qua `tsc`/`eslint`.
- **Evaluation Suite/Case tùy biến**: `createEvaluationSuite`/`runEvaluationSuite` đã viết,
  **CHƯA có trang UI** — chỉ verify được đường `deploymentGate` ở nhánh PASS (evaluation mẫu từ
  seed), CHƯA verify được nhánh chặn `DEPLOYMENT_BLOCKED_BY_EVALUATION` qua Browser (cần 1
  Evaluation Run status=FAIL để thử, không có sẵn trong dữ liệu demo).
- Platform Registry M35 thật, tích hợp VI-CONNECT thật — không thuộc phạm vi (đã nêu từ RECON).
- Health polling nền tự động (chỉ có nút thủ công).

## File đã thay đổi

```
09_ENGINEERING/aios-platform/prisma/schema.prisma          (+ 7 enum, 16 model M29, additive)
09_ENGINEERING/aios-platform/prisma/migrations/20260822225223_m29_ai_control_plane/
09_ENGINEERING/aios-platform/prisma/migrations/20260822230102_m29_approved_by/
09_ENGINEERING/aios-platform/prisma/seed.ts                 (+ seedM29())
09_ENGINEERING/aios-platform/src/lib/m29/model.ts            (mới)
09_ENGINEERING/aios-platform/src/lib/m29/rules.ts             (mới — authoritative)
09_ENGINEERING/aios-platform/src/lib/m29/adapters.ts          (mới)
09_ENGINEERING/aios-platform/src/lib/m29/gateway.ts           (mới)
09_ENGINEERING/aios-platform/src/lib/m29/evaluation.ts        (mới)
09_ENGINEERING/aios-platform/src/lib/m29/usage.ts             (mới)
09_ENGINEERING/aios-platform/src/lib/m29/labels.ts            (mới)
09_ENGINEERING/aios-platform/src/lib/m29/actor.ts             (mới)
09_ENGINEERING/aios-platform/src/lib/m29/actions.ts           (mới)
09_ENGINEERING/aios-platform/src/app/(platform)/modules/M29/page.tsx                       (mới)
09_ENGINEERING/aios-platform/src/app/(platform)/modules/M29/CheckHealthButton.tsx          (mới)
09_ENGINEERING/aios-platform/src/app/(platform)/modules/M29/agents/[id]/page.tsx           (mới)
09_ENGINEERING/aios-platform/src/app/(platform)/modules/M29/agents/[id]/AiaPanel.tsx       (mới)
09_ENGINEERING/aios-platform/src/app/(platform)/modules/M29/agents/[id]/PromptPanel.tsx    (mới)
09_ENGINEERING/aios-platform/src/app/(platform)/modules/M29/agents/[id]/ToolGatewayPanel.tsx (mới)
09_ENGINEERING/aios-platform/src/app/(platform)/modules/M29/registry/page.tsx              (mới)
09_ENGINEERING/aios-platform/src/app/(platform)/modules/M29/registry/RegistryActions.tsx   (mới)
09_ENGINEERING/aios-platform/src/app/(platform)/modules/M29/traces/page.tsx                (mới)
09_ENGINEERING/aios-platform/src/app/(platform)/modules/M29/audit/page.tsx                 (mới)
```

Không sửa `src/lib/m10/*`, `src/lib/m21/*`, không sửa file M10/M21 nào trong UI.

## Ghi chú vận hành dev

Tool Gateway của Agent mẫu (`AGENT_TROLY_M29`) gọi thật `http://localhost:8010` — cần server M10
standalone cũ (`05_MODULE_LIBRARY/M10_DamBaoKQ/08_Source/api`, lệnh `node server.js`) đang chạy
thì demo Tool Gateway/health check mới thành công thật; nếu server đó tắt, Tool Gateway vẫn hoạt
động đúng (trả lỗi `CONNECTION_ERROR`/`TIMEOUT` thay vì OK) — không phải lỗi của M29.

## Kết luận

Increment 3 đạt Definition of Done theo phạm vi đã khoanh trong `spec.md`. Lõi kiểm soát có ý
nghĩa tuân thủ nhất — AIA Gate chặn Tool Gateway theo ISO/IEC 42001 — đã verify chặn THẬT và
mở THẬT qua Browser, không chỉ đọc code. Phát hiện và sửa 1 bug thật trong lúc verify (thiếu
archive PromptVersion cũ) — minh chứng giá trị của bước VERIFY qua Browser thay vì dừng ở
biên dịch/lint.
