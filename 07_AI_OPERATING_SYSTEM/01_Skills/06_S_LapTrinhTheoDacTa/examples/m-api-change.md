# Ví dụ Tier M — Đổi API contract + business rule

**Yêu cầu:** "Thêm bước phê duyệt 2 cấp (Kỹ thuật viên đề xuất → Trưởng phòng duyệt) cho việc chuyển trạng thái Đảm bảo kết quả (M10), thay vì 1 cấp như hiện tại."

## CLASSIFY
Tier M — đổi state machine (R1–R8 trong `api/rules.mjs`), đổi API contract (`POST /api/records/:id/approve` cần thêm field cấp phê duyệt), đổi business rule đáng kể (tách vai trò).

## RECON (trích)
```
[FACT] api/rules.mjs định nghĩa R1-R8, R5 hiện là rule "approve chuyển DRAFT → APPROVED" bởi 1 role bất kỳ có quyền approve.
[FACT] Phân quyền mô phỏng qua header X-Role, không phải xác thực thật (ghi rõ trong CLAUDE.md gốc).
[QUESTION] "Trưởng phòng" có phải role mới hay là alias của role đã có? → cần hỏi người dùng vì đây là business rule quan trọng chưa rõ (STOP condition).
```
→ STOP, hỏi người dùng trước khi sang SPEC vì ảnh hưởng trực tiếp state machine + authorization.

## Sau khi làm rõ → SPEC (trích)
```
BR-01: DRAFT → PENDING_TECH_REVIEW chỉ do role "technician" thực hiện.
BR-02: PENDING_TECH_REVIEW → APPROVED chỉ do role "lab_manager" thực hiện; không cho phép "technician" tự duyệt cấp 2 (tách vai trò — R5 cũ).
BR-03: Bất kỳ bước nào cũng có thể REJECT về DRAFT kèm lý do bắt buộc.

State:
  DRAFT → PENDING_TECH_REVIEW (technician)
  PENDING_TECH_REVIEW → APPROVED (lab_manager)
  PENDING_TECH_REVIEW → DRAFT (reject, mọi role có quyền review)

API:
  POST /api/records/:id/submit   (DRAFT → PENDING_TECH_REVIEW)
  POST /api/records/:id/approve  (PENDING_TECH_REVIEW → APPROVED)
  POST /api/records/:id/reject   (→ DRAFT, body: { reason: string, bắt buộc })
```

## PLAN (trích)
```
File Impact:
  MODIFY api/rules.mjs   (thêm state PENDING_TECH_REVIEW, sửa R5, thêm rule tách vai trò)
  MODIFY api/server.js   (route /submit, /approve, /reject)
  MODIFY webapp/src/rules.js (mirror phía client — server vẫn là nguồn đúng)
  MODIFY webapp/src/pages/Detail.js (UI 2 nút theo trạng thái/role)
  DO NOT MODIFY api/data/data.json (dữ liệu runtime, đã gitignore)

Risk:
  Permission bypass nếu webapp/src/rules.js không đồng bộ server → HIGH → mitigation: server luôn validate lại, không tin client.
  Regression dữ liệu seed cũ đang ở trạng thái APPROVED theo state machine cũ → MEDIUM → mitigation: thêm migration nhỏ map trạng thái cũ sang mới khi load seed.

Increments:
  P1 rules.mjs (state machine mới) + test
  P2 server.js routes + test
  P3 webapp mirror + UI
  P4 verify access control 2 role
```

Artifact đầy đủ lưu tại `05_MODULE_LIBRARY/M10_DamBaoKQ/01_Requirement/_work/20260822-approve-2-cap/` theo `SKILL.md` mục 10, sau đó hợp nhất vào `DacTa.md`.

## VERIFY (trích)
```
Access control: technician gọi /approve trực tiếp → 403 → PASS (evidence: curl -H "X-Role: technician" ... → 403)
Regression: seed cũ ở APPROVED vẫn load được sau migration → PASS
validate_links.py: NOT APPLICABLE (không đụng Hub/module manifest, chỉ đụng 08_Source)
Result: PASS
```
