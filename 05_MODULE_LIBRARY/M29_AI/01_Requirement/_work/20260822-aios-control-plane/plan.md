# Implementation Plan — 20260822-aios-control-plane

## CLASSIFY

**Tier L.** Lý do (bất kỳ điều nào cũng đủ để lên Tier L, ở đây có ≥4):
- Đổi/ thêm **kiến trúc authorization** mới (RBAC AIOS: AI_VIEWER…SUPER_ADMIN) — chưa tồn tại.
- **Ranh giới đa nền tảng** (Platform isolation ManLab/VI-CONNECT) — tương đương tenant isolation.
- **Hạ tầng production mới, dùng chung** cho CAP-29 (không phải 1 nghiệp vụ đơn lẻ) — tác động
  tới cách toàn bộ hệ sinh thái AI (kể cả các Skill/Agent hiện có trong 07_AI_OPERATING_SYSTEM
  về mặt khái niệm) được nhìn nhận.
- Đây là **module mới hoàn toàn** (M29_AI + M35_NenTangSo hiện là khung rỗng) → theo mục 12 STOP
  Conditions của skill: "đổi hạ tầng production" và "đổi kiến trúc authentication/authorization"
  → **bắt buộc xin phê duyệt trước khi thực thi BUILD**, đúng như chính yêu cầu gốc của bạn
  (mục 43: "STOP và chờ duyệt trước BUILD nếu phát hiện thay đổi kiến trúc lớn...").

→ Plan này dừng ở SPEC/PLAN. **Không BUILD cho tới khi bạn duyệt.**

## Architecture Impact

```
Frontend:       Vanilla JS webapp mới (theo mẫu webapp/ của M10) tại M29_AI/08_Source/webapp —
                Platform selector ở header, áp filter toàn cục xuống mọi màn hình con.
Backend:        Node.js thuần (module http có sẵn, KHÔNG thêm npm dependency) tại
                M29_AI/08_Source/api — theo đúng tiền lệ M10 (server.js/rules.mjs/store.mjs).
Database:       JSON file store (api/data/data.json), tách theo entity/collection — KHÔNG
                đưa DB engine mới vào ở Phase 1 (đổi sau, cần duyệt riêng nếu vượt quy mô).
Authentication: KHÔNG có auth thật (giống M10). Giả lập vai trò qua header `X-Role`, ghi rõ
                đây là prototype giới hạn, không dùng cho production thật ngoài nội bộ ETV.
Authorization:  RBAC theo bảng ma trận trong spec.md — kiểm tra ở tầng API (middleware nhỏ
                trong server.js), không phải ở frontend.
API:            REST thuần, JSON, không framework — route dispatch thủ công như M10/server.js.
Domain:         Model hóa theo Nhóm 1 (Platform, thuộc M35) + Nhóm 2 (AI core, thuộc M29)
                trong spec.md mục D.
Data layer:      store.mjs riêng cho mỗi entity nhóm (platforms.mjs, agents.mjs, tools.mjs,
                traces.mjs, audit.mjs...) — tránh 1 file store khổng lồ.
Background jobs: 1 job polling nhẹ (setInterval) cho System Health (`AIHealthCheck`) — không
                cần queue/worker riêng ở Phase 1.
Testing:        Test tay qua script curl/node (giống cách M10 dùng POST /api/reset) — chưa
                đưa test framework mới vào (quyết định riêng nếu cần).
Deployment:      Chạy độc lập `node server.js` (cổng riêng, thêm entry vào .claude/launch.json,
                vd `aios-api`, `aios-webapp`), không đụng tiến trình M10/M21 hiện có.
```

## Database Impact

```
Tables added:    AIPlatform, AIProvider, AIModel, AIAgent, AISkill, AITool, AIAgentSkill,
                 AIAgentTool, AISkillTool, AIPrompt, AIPromptVersion, AIGuardrail, AIPolicy,
                 AIImpactAssessment, AIEvaluationSuite, AIEvaluationCase, AIEvaluationRun,
                 AIRequest, AIToolCall, AICostUsage, AISecret, AIAuditLog, AIHealthCheck
                 (tất cả là collection JSON mới — không có bảng nào tồn tại trước để "thêm").
Tables modified: Không có (không đụng M10/M21/module khác).
Columns:         N/A (schema mới hoàn toàn, xem spec.md mục D cho field chi tiết).
Indexes:         In-memory filter theo platform_id/agent_id (JSON store nhỏ, chưa cần index
                 engine thật ở Phase 1).
Constraints:     Áp ở tầng application (rules.mjs tương đương): AITool.permission_level=EXECUTE
                 bắt buộc require_confirmation||require_approval; AIAuditLog/AIRequest/
                 AIToolCall append-only (không route DELETE).
Migration:       Không có dữ liệu cũ để migrate — seed rỗng + 1 bộ seed mẫu (1 Platform=ManLab
                 thật trỏ M10 API, 1 Platform=VI-CONNECT placeholder, 1 Agent mẫu, 1 Tool mẫu
                 READ gọi GET /api/certificates hoặc endpoint READ có sẵn của M10 nếu phù hợp).
Data backfill:   Không áp dụng.
Backward compatibility: N/A (module mới).
Rollback:        Xoá thư mục `08_Source` mới tạo + revert Hub/spec — không ảnh hưởng module
                 khác vì tiến trình chạy độc lập, không chia sẻ DB/file với M10/M21.
```

## File Impact

```
CREATE:
  05_MODULE_LIBRARY/M29_AI/01_Requirement/DacTa.md         (hợp nhất spec cuối — thay nội dung
                                                             khung mẫu hiện tại)
  05_MODULE_LIBRARY/M29_AI/02_API/API.md                    (thay khung mẫu bằng API thật đủ)
  05_MODULE_LIBRARY/M29_AI/03_Database/DataModel.md         (thay khung mẫu bằng model thật đủ)
  05_MODULE_LIBRARY/M29_AI/04_UI/*                          (UI map + wireframe/mô tả màn hình)
  05_MODULE_LIBRARY/M29_AI/06_Dashboard/*                   (đặc tả Dashboard tổng quan)
  05_MODULE_LIBRARY/M29_AI/07_Workflow/StateMachine.md       (thay khung mẫu — áp cho Prompt/
                                                             Policy/Guardrail/AIA version lifecycle)
  05_MODULE_LIBRARY/M29_AI/08_Source/api/*.mjs, server.js, package.json
  05_MODULE_LIBRARY/M29_AI/08_Source/webapp/*
  05_MODULE_LIBRARY/M35_NenTangSo/01_Requirement/DacTa.md    (Platform Registry — object dữ liệu)
  05_MODULE_LIBRARY/M35_NenTangSo/02_API/API.md
  05_MODULE_LIBRARY/M35_NenTangSo/03_Database/DataModel.md
  .claude/launch.json                                        (THÊM entry aios-api/aios-webapp,
                                                             không xoá entry hiện có)
  05_MODULE_LIBRARY/M29_AI/01_Requirement/_work/20260822-aios-control-plane/*  (đã tạo — artifact
                                                             đặc tả này)
  05_MODULE_LIBRARY/M35_NenTangSo/01_Requirement/_work/20260822-aios-control-plane/README.md
                                                             (link-only, trỏ về spec M29 — không
                                                             copy nội dung, đúng bất biến #2)

MODIFY:
  02_CAPABILITIES/CAP-29_AIOffice/README.md    (mô tả năng lực đầy đủ hơn — vẫn KHÔNG đổi mã CAP-29)
  04_PROCESS_LIBRARY/MP29_AI/README.md, manifest.yaml  (điền owner/status thật nếu khác hiện tại)
  04_PROCESS_LIBRARY/MP35_NenTangSo/README.md, manifest.yaml (điền owner — hiện là "(cập nhật)")
  05_MODULE_LIBRARY/M29_AI/README.md, M35_NenTangSo/README.md (đã có, chỉ cập nhật nếu bảng đầu
                                                             mục sai lệch sau khi đặc tả xong)

DO NOT MODIFY:
  05_MODULE_LIBRARY/M10_DamBaoKQ/**            (module nghiệp vụ khác, không liên quan AIOS)
  05_MODULE_LIBRARY/M21_CongBoNangLuc/**       (submodule riêng, không đụng)
  07_AI_OPERATING_SYSTEM/**                    (đây là lớp cấu hình Claude Code, KHÔNG phải nơi
                                                 chứa AIOS Control Plane — tránh nhầm lẫn 2 khái
                                                 niệm; chỉ liên kết tham chiếu 1 chiều nếu cần)
  04_PROCESS_LIBRARY/MP38_DichVuSo/**, M38_DichVuSo/**  (ngoài phạm vi lần này — xem ASSUMPTION)
  docs/index.html, docs/data.json              (cổng GitHub Pages — chỉ tự sinh lại qua
                                                 _meta/build_site.py, không sửa tay)
  _meta/validate_links.py                      (không sửa; chỉ CHẠY để verify)
```

## Implementation Increments (dự kiến khi được duyệt sang BUILD — CHƯA thực thi)

```
P1  Hub + đặc tả: hoàn thiện DacTa.md/API.md/DataModel.md/StateMachine.md cho M29_AI và
    M35_NenTangSo (merge từ spec.md này) → chạy validate_links.py.
P2  M35: AIPlatform registry (CRUD + seed ManLab + VI-CONNECT placeholder) + Platform selector
    API. Đây là nền cho mọi filter phía sau.
P3  M29: Provider/Model/Agent/Skill/Tool registry (CRUD, quan hệ N-N) + Agent Detail API.
P4  Tool Gateway: permission_level, whitelist theo Agent, chặn Tool DISABLED, forward tới
    ManlabPlatformAdapter (gọi 1 API READ thật của M10 làm ví dụ đầu-cuối).
P5  AIRequest/AIToolCall (Trace) — sinh TraceId, ghi đủ chain, API GET /traces/{id}.
P6  Prompt + version lifecycle, Guardrail, Policy, AIA (state machine chuẩn của repo).
P7  Token/Cost tổng hợp từ AIRequest, Secret (masked), Audit Log (ghi mọi write API).
P8  Evaluation Suite/Case/Run tối thiểu (smoke test), System Health polling.
P9  Webapp: Dashboard + toàn bộ UI map (mục F spec.md) đọc từ API trên.
P10 Verify: chạy toàn bộ Acceptance Criteria (AC-01..AC-09) + validate_links.py + báo cáo
    theo mục 44 yêu cầu gốc (Implemented/Files/API/UI/Tests PASS-FAIL/Security Review/Not
    Implemented/Git Commit).
```

## Rollout / Rollback

```
Feature flag:    Không cần — module mới, chạy tiến trình/cổng riêng, không ảnh hưởng module
                 khác cho tới khi người dùng chủ động mở webapp AIOS.
Migration order: P1 → P2 → … P10 tuần tự (mỗi P là 1 tăng trưởng độc lập, có thể dừng giữa chừng).
Deploy order:    api trước (server.js), webapp sau (đọc từ api đã chạy) — đúng thứ tự M10.
Compatibility window: N/A (không có consumer cũ).
Backfill:        Seed data mẫu ở P2/P3, không backfill dữ liệu thật.
Monitoring:      Log ra console (giống M10); AIHealthCheck tự poll, hiển thị ở Dashboard.
Rollback:        Dừng tiến trình + xoá `08_Source` mới tạo; Hub/spec revert qua git; không có
                 tác động ngoài phạm vi module này (không chia sẻ state với M10/M21).
```

## Risk Analysis

| Rủi ro | Mức độ | Biện pháp giảm thiểu |
|---|---|---|
| Nhầm lẫn 07_AI_OPERATING_SYSTEM (config Claude Code) với AIOS Control Plane (sản phẩm) khi BUILD | HIGH | Ghi rõ trong DacTa.md của M29; DO NOT MODIFY 07_AI_OPERATING_SYSTEM trong plan này |
| RBAC mô phỏng qua header bị hiểu nhầm là auth thật, dùng sai bối cảnh (vd public-facing) | HIGH | Ghi rõ "prototype, không phải production auth" ở README + API response header cảnh báo, giới hạn nội bộ |
| Thiết kế Platform Adapter cho VI-CONNECT sai vì không có source thật để khảo sát | MEDIUM | Chỉ làm placeholder trả 501, không suy đoán hành vi thật; xác nhận lại khi có quyền truy cập repo/API VI-CONNECT thật |
| JSON file store không chịu được tải thật nếu nhiều nền tảng ghi đồng thời | MEDIUM | Giới hạn phạm vi "nội bộ ETV, Phase 1"; ghi rõ NFR Scalability là ngoài phạm vi, cần quyết định DB engine riêng trước khi mở rộng |
| Secret vô tình lộ ra log/trace nếu Tool Gateway log input/output thô | HIGH | Masking bắt buộc ở tầng ghi log/trace, không chỉ ở API đọc AISecret — kiểm tra riêng ở VERIFY (AC-07) |
| Lấn phạm vi MP38_DichVuSo do ranh giới với M29/M35 không rõ tuyệt đối | LOW | Đã chốt loại trừ M38 khỏi phạm vi trong outcome.md (ASSUMPTION), chỉ link tham chiếu nếu cần sau này |

## BUILD PLAN

```
CHƯA THỰC THI — chờ phê duyệt SPEC/PLAN này trước.
Khi được duyệt: chạy tuần tự P1→P10 ở trên, mỗi P là 1 commit riêng theo Conventional Commits
(vd `feat(M29): thêm AIPlatform registry`), PR vào main theo đúng "Quy trình Git" CLAUDE.md gốc.
Sau mỗi P: chạy `_meta/validate_links.py`; sau P10: báo cáo đầy đủ theo mục 44 yêu cầu gốc.
```
