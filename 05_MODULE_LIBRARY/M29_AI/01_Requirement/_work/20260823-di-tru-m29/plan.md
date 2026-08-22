# M29_AI — Kế hoạch triển khai di trú (Increment 3)

Tham chiếu `spec.md` cùng thư mục. Khuôn mẫu bám `src/lib/m10/*` + `src/lib/m21/*` đã có.

## DB impact (additive, không sửa model M10/M21/PlatformModule)

7 enum + 16 model mới trong `prisma/schema.prisma` — xem "Data model" trong spec.md. Không FK
sang bảng M10/M21; `AIPlatform.baseUrl` trỏ HTTP ra ngoài (localhost:8010), không phải FK DB.

Migration: `npx prisma migrate dev --name m29_ai_control_plane`.

## File impact

```
prisma/schema.prisma                     (+ 7 enum, 16 model M29, additive)
prisma/seed.ts                           (+ seedM29(): 6 tài khoản demo vai trò M29 + dữ liệu mẫu
                                            port từ seed.mjs)
src/lib/m29/model.ts        (mới) ROLE_RANK/TOOL_MIN_ROLE/PERMS — port model.mjs phần hằng số
src/lib/m29/rules.ts        (mới) approvalTransitions/aiaTransitions/promptTransitions/
                                   validateTool/hasToolPermission/can — port rules.mjs AUTHORITATIVE
src/lib/m29/gateway.ts      (mới) callTool() — port gateway.mjs, gọi adapters.ts
src/lib/m29/adapters.ts     (mới) ManlabPlatformAdapter/PlaceholderPlatformAdapter — port adapters.mjs
src/lib/m29/evaluation.ts   (mới) runCases()/deploymentGate() — port evaluation.mjs + phần
                                   deploymentGate trong server.js
src/lib/m29/usage.ts        (mới) tính token/cost từ AIRequest qua Prisma groupBy — port usage.mjs
src/lib/m29/labels.ts       (mới) nhãn tiếng Việt cho mọi enum
src/lib/m29/actor.ts        (mới) mirror actor.ts M10/M21, moduleCode="M29"
src/lib/m29/actions.ts      (mới) Server Actions: CRUD Provider/Model/Skill/Agent/Tool,
                                   approvalAction (submit/review/approve/archive dùng chung),
                                   aiaAction, promptAction, callToolAction, checkHealthAction,
                                   secretsAction (create/rotate/disable — chỉ nhận rồi mask ngay,
                                   không lưu giá trị thật)

src/app/(platform)/modules/M29/page.tsx                    (mới) tổng quan: Platform + Agent list
src/app/(platform)/modules/M29/agents/[id]/page.tsx        (mới) chi tiết Agent (model/skill/tool/
                                                                   guardrail/AIA/eval gần nhất)
src/app/(platform)/modules/M29/agents/[id]/AiaPanel.tsx    (mới) vòng đời AIA
src/app/(platform)/modules/M29/agents/[id]/ToolGatewayPanel.tsx (mới) form gọi callTool + xem lỗi
src/app/(platform)/modules/M29/agents/[id]/PromptPanel.tsx (mới) vòng đời PromptVersion
src/app/(platform)/modules/M29/registry/page.tsx           (mới) danh sách Provider/Model/Skill/
                                                                   Tool/Platform (form dùng chung)
src/app/(platform)/modules/M29/traces/page.tsx             (mới) danh sách AIRequest + AIToolCall
src/app/(platform)/modules/M29/audit/page.tsx               (mới) AIAuditLog (chỉ đọc)
```

## Increment con (BUILD theo thứ tự)

1. Schema + migration + seed (Platform/Provider/Model/Skill/Tool/Agent/Prompt/PromptVersion/
   Guardrail/Policy/AIA/EvaluationSuite+Case+Run mẫu — 1 Agent đủ đường dây như seed.mjs gốc).
2. `model.ts` + `rules.ts` (thuần hàm, test độc lập trước khi nối DB).
3. `adapters.ts` + `gateway.ts` + `evaluation.ts` + `usage.ts`.
4. `actor.ts` + `actions.ts` (nối Prisma + session thật).
5. UI: registry list → agent detail (AIA/Prompt/ToolGateway panel) → traces → audit.
6. VERIFY qua Browser — đúng Acceptance Criteria trong spec.md, đặc biệt AIA Gate chặn thật.

## Rollout / Rollback

1 nhánh, 1 PR (schema+rules+UI phụ thuộc chặt, không tách nhỏ hơn — lý do giống M21 plan.md).
Rollback: additive, revert bằng xoá migration + `git revert`. KHÔNG tắt `08_Source` cũ (port
song song, port lần này còn PHỤ THUỘC server M10 cũ ở cổng 8010 đang chạy để Tool Gateway demo
gọi được thật — ghi rõ trong README dev nếu cần chạy thử).

## Risk

- Rủi ro chính: sai thứ tự chặn trong `callTool()` (7 bước) khi port — đã trích nguyên văn thứ tự
  từ `gateway.mjs` vào spec.md, port đúng thứ tự đó, không tự sắp xếp lại.
- Không phải Tier L (xem "Vì sao không giữ Tier L" trong spec.md) nên không cần rào chắn phê
  duyệt trước khi thực thi — vẫn dừng lại hỏi nếu phát hiện quy tắc ISO 42001 nào mâu thuẫn giữa
  DacTa.md và mã nguồn thật mà không tự suy luận an toàn được.
