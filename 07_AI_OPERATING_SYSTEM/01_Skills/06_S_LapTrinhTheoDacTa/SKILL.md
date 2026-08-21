---
name: spec-driven-coding
title: Lập trình có kỷ luật theo đặc tả (Spec-Driven Coding)
description: Bắt buộc quy trình CLASSIFY → RECON → OUTCOME → SPEC → PLAN → BUILD → VERIFY khi thay đổi mã nguồn (tính năng, bug fix, refactor, đổi API/schema DB, tích hợp, AI agent/tool, phân quyền, đa tenant, kiến trúc); tự điều chỉnh mức độ nghi thức theo quy mô XS/S/M/L thay vì áp nghi thức cứng nhắc cho mọi việc.
version: "2.0.0"
scope: [claude-code, cursor, codex, gemini-cli, vscode-copilot]
tags: [spec-driven-development, software-engineering, code-review, quality-gate, verification, engineering-workflow]
---

# Spec-Driven Coding — DEV-SPEC-001

Skill kỹ thuật dùng chung (Mẫu B), không gắn với một Thủ tục `ETV.Pxx` cụ thể — áp dụng cho mọi thay đổi mã nguồn thật trong repo (`05_MODULE_LIBRARY/Mxx_Slug/08_Source/`, `_meta/*.py`, `docs/index.html`, `.github/workflows/`, hoặc bất kỳ submodule mã nguồn nào).

**Compatibility:** thiết kế cho coding agent có quyền đọc repo, và ở chế độ BUILD có thêm quyền sửa file + chạy lệnh build/test.

> Lưu ý cho Claude Code: `allowed-tools` trong Claude Code chỉ **pre-approve** tool (khỏi hỏi lại), **không** phải cơ chế khóa read-only. Muốn khóa ANALYZE ở chế độ chỉ-đọc thật sự trong Claude Code phải dùng `disallowed-tools`/permission rules — đây là phần mở rộng riêng của Claude Code, xem [CLAUDE.md](CLAUDE.md) của skill này, không đưa vào phần lõi portable ở file này.

## Ý nghĩa

Tối ưu cho:

```
UNDERSTAND → SPECIFY → PLAN → CHANGE MINIMALLY → TEST → VERIFY → TRACE → ROLLBACK
```

Không tối ưu chỉ để viết code nhanh. Code chạy được không phải là bằng chứng của đúng đắn.

## Khi nào dùng

Dùng cho việc triển khai tính năng, sửa bug, refactor, đổi API hoặc schema database, tích hợp, AI agent/tool, phân quyền, logic đa tenant, hoặc thay đổi kiến trúc. Dùng cả cho yêu cầu coding tưởng chừng đơn giản nếu nó đụng tới file trong repo — nhưng **right-size** quy trình theo Tier XS/S/M/L (mục 3), không áp full pipeline cho việc sửa 1 dòng.

## 1. Chế độ vận hành (Operating Modes)

Xác định mode từ yêu cầu người dùng.

### ANALYZE
Dùng khi người dùng yêu cầu: phân tích, thiết kế, khảo sát, đề xuất, viết đặc tả, lên kế hoạch triển khai.

```
CLASSIFY → RECON → OUTCOME → SPEC → PLAN
```
Không sửa file trong repo trừ khi được yêu cầu rõ ràng.

### BUILD
Dùng khi người dùng yêu cầu: triển khai, tạo mới, sửa lỗi, thay đổi, refactor, migrate, tích hợp.

```
CLASSIFY → RECON → OUTCOME → SPEC → PLAN → BUILD → VERIFY
```

### REVIEW
Dùng khi người dùng yêu cầu: review, kiểm tra, audit, đánh giá triển khai, so sánh implementation với requirement.

```
RECON → REQUIREMENT CHECK → DIFF REVIEW → TEST → SECURITY REVIEW → VERIFICATION REPORT
```
Không tự tiện triển khai cải tiến ngoài phạm vi được yêu cầu.

## 2. Pipeline tổng thể

```
REQUEST → CLASSIFY → RECON → OUTCOME → SPEC → PLAN → BUILD → VERIFY → ACCEPT / REVISE
```

`RECON` đứng trước `SPEC` vì phải hiểu repo, convention, hành vi hiện tại trước khi đặc tả giải pháp — xem [ARCHITECTURE.md](../../../ARCHITECTURE.md) và `CLAUDE.md` gốc của repo trước khi RECON trong MANLAB-AIOS.

## 3. Phân loại việc (Task Classification) — bắt buộc trước khi chọn độ sâu quy trình

### Tier XS
Đặc điểm: 1 file hoặc thay đổi biệt lập tương đương; sửa typo/label/validation nhỏ; không đổi schema DB, không đổi phân quyền, không đổi API contract, không đổi business workflow.

Yêu cầu: `RECON → MICRO OUTCOME → BUILD → VERIFY DIFF`

### Tier S
Đặc điểm: tối đa ~3 file liên quan; feature/bugfix cục bộ; không migration schema; không đổi API contract công khai; không đổi security boundary.

Yêu cầu: `RECON → OUTCOME → MINI SPEC → MINI PLAN → BUILD → VERIFY`

### Tier M
Áp dụng khi có bất kỳ điều nào: đổi schema DB; đổi API contract; nhiều file liên quan; business rule đáng kể; đổi state machine; background processing; tích hợp; UI+backend không tầm thường.

Yêu cầu: **FULL PIPELINE**, lưu artifact đặc tả (xem mục 8).

### Tier L
Áp dụng khi có bất kỳ điều nào: đổi authentication; đổi kiến trúc authorization; tenant isolation; migration phá hủy dữ liệu; breaking public API; hạ tầng dùng chung/lõi; security boundary; hạ tầng production; module dùng chung tác động lớn.

Yêu cầu: **FULL PIPELINE** + risk analysis rõ ràng + rollback strategy + **xin phê duyệt trước khi thực thi bước phá hủy/rủi ro cao**.

Khi phân vân giữa 2 tier, **chọn tier cao hơn**.

## 4–7. RECON → OUTCOME → SPEC → PLAN

Chi tiết đầy đủ từng pha nằm ở `references/` (progressive disclosure — chỉ đọc file cần dùng theo Tier đang xử lý):

| Pha | Nội dung | File |
|---|---|---|
| RECON | Khảo sát repo trước khi thiết kế; format `[FACT]/[ASSUMPTION]/[QUESTION]` | [references/recon.md](references/recon.md) |
| OUTCOME | WHO/WHAT/WHY/SUCCESS CRITERIA | [references/outcome.md](references/outcome.md) |
| SPEC | UI, Data, Business Rules, State, API, Acceptance Criteria, NFR | [references/spec.md](references/spec.md) |
| PLAN | Architecture/DB/File impact, increment, rollout, risk | [references/plan.md](references/plan.md) |
| Migration & Rollout | Expand-contract, feature flag, backfill, rollback | [references/migration-rollout.md](references/migration-rollout.md) |

Tier XS/S dùng bản rút gọn (MICRO/MINI) mô tả trong mỗi file — không copy nguyên form của Tier M/L.

## 8. BUILD

Triển khai theo increment: `IMPLEMENT → TEST → REVIEW → CONTINUE`. Chi tiết đầy đủ + quy tắc **Spec Drift** (khi BUILD phát hiện SPEC/PLAN đã duyệt sai/thiếu): [references/build.md](references/build.md).

Nguyên tắc cốt lõi (luôn áp dụng, không cần đọc file riêng):
- Ưu tiên thay đổi nhỏ nhất an toàn nhất; theo đúng convention đã có trong repo/module đang sửa.
- Không refactor code không liên quan, không xóa comment không liên quan, không đổi dependency khi không cần, không tự mở rộng phạm vi, không trộn cleanup không liên quan vào thay đổi được yêu cầu.
- Không tự đổi mã/số `CAP-xx`, `MPxx`, `Mxx` đã tồn tại (ràng buộc bất biến của repo — xem `CLAUDE.md` gốc).
- Không sửa trực tiếp tài liệu có `doc_status: issued` trong `manifest.yaml` — phải tạo phiên bản/lần ban hành mới theo MP14.

## 9. VERIFY

Verify là bắt buộc. Compile thành công **không** phải bằng chứng đủ. Chi tiết đầy đủ (Main Flow, Diff, Access Control, Data Integrity, Security, Regression) + **Evidence Rule**: [references/verify.md](references/verify.md). Checklist bảo mật riêng: [references/security-checklist.md](references/security-checklist.md).

Trạng thái verify chỉ được dùng một trong 5 giá trị: `PASS / FAIL / NOT RUN / NOT APPLICABLE / BLOCKED`. Mọi `PASS` phải kèm evidence là lệnh/log/kết quả thật — không bao giờ suy luận `Build PASS → Tests PASS`.

**Riêng trong MANLAB-AIOS:** nếu thay đổi đụng tới thư mục Hub (`MPxx_Slug/`), module (`Mxx_Slug/`), hoặc capability (`CAP-xx_Slug/`), VERIFY bắt buộc thêm bước chạy:
```bash
python3 _meta/validate_links.py
```
và báo PASS/FAIL kèm output thật — đây tương đương "Regression" của repo này, không được bỏ qua.

## 10. Artifact đặc tả — thích nghi với MANLAB-AIOS

Bản gốc của pipeline này đề xuất lưu artifact ở `docs/specs/<work-id>/`. **Không áp dụng nguyên văn trong repo này** vì `docs/` đã là thư mục dành riêng cho cổng GitHub Pages (`docs/index.html`, `docs/data.json` — xem `CLAUDE.md` gốc). Quy tắc lưu artifact cho Tier M/L trong MANLAB-AIOS:

- **Thay đổi thuộc một module số hóa** (`05_MODULE_LIBRARY/Mxx_Slug/08_Source/...`): lưu `outcome.md`, `spec.md`, `plan.md`, `verify.md` tạm thời tại `05_MODULE_LIBRARY/Mxx_Slug/01_Requirement/_work/<work-id>/`; khi hoàn tất, **hợp nhất kết luận đặc tả cuối cùng vào `01_Requirement/DacTa.md`** (nguồn sự thật duy nhất của module theo quy ước repo) — không để nhiều file đặc tả cạnh tranh nhau.
- **Thay đổi hạ tầng dùng chung không gắn module cụ thể** (`_meta/*.py`, `.github/workflows/`, script gốc, cổng `docs/index.html`): lưu tại `_meta/specs/<work-id>/`.
- Không có issue/ticket thì đặt `work-id = YYYYMMDD-short-slug`.
- Các file này là một phần của digital thread — cập nhật lại khi có spec drift (mục "Spec Drift" trong [references/build.md](references/build.md)).

Tier XS/S không cần artifact riêng — nêu OUTCOME/MINI SPEC ngắn gọn ngay trong hội thoại/PR description là đủ.

## 11. Git Discipline

Không định nghĩa lại quy trình Git riêng cho skill này — **tuân thủ đúng "Quy trình Git" trong `CLAUDE.md` gốc của repo**: nhánh mới → commit → PR vào `main` → merge (`--merge --delete-branch`) → sync `main` cục bộ; commit message Conventional Commits **tiếng Việt**, gắn scope theo tầng/module bị sửa (`feat(M10): ...`, `fix(M21): ...`). Trong phạm vi skill này, bổ sung:
- Giữ mỗi increment ở mục PLAN có thể revert độc lập.
- Không gộp migration phá hủy dữ liệu (Tier L) chung với thay đổi feature không liên quan trong cùng 1 PR.
- Rollback phải khả thi thật, không chỉ lý thuyết — nêu rõ cách revert trong PLAN (mục Rollout/Rollback).

## 12. STOP Conditions

Không hỏi lại người dùng chỉ vì một điều gì đó chưa rõ — **khảo sát repo, test, tài liệu, hành vi hiện tại, API contract, lịch sử migration trước**. Chỉ STOP khi vấn đề chưa giải quyết là trọng yếu và không thể suy ra an toàn từ repo.

STOP bắt buộc khi gặp: yêu cầu mâu thuẫn nhau; business rule quan trọng chưa rõ; migration phá hủy dữ liệu; rủi ro mất dữ liệu đáng tin; đổi kiến trúc authentication; đổi tenant isolation; breaking public API; đổi security boundary đáng kể; đổi hạ tầng production. Không tự đoán các quyết định này.

## 13. Definition of Done

Xem checklist đầy đủ: [references/definition-of-done.md](references/definition-of-done.md). Điều chưa được verify phải được báo cáo rõ ràng là chưa verify — không quy tròn thành "hoàn tất".

## 14. Output trước/sau BUILD

Template đầy đủ (điền vào khi làm Tier M/L, rút gọn cho XS/S):
- Trước BUILD: [assets/feature-spec.md](assets/feature-spec.md) (OUTCOME + SPEC) và [assets/implementation-plan.md](assets/implementation-plan.md) (PLAN + BUILD PLAN).
- Sau BUILD: [assets/verification-report.md](assets/verification-report.md) (Implementation report + Verify + Diff review + Result) — Tier XS/S dùng bản rút gọn [assets/change-report.md](assets/change-report.md).

## 15. Ví dụ theo Tier

Xem [examples/](examples/) — mỗi file là một case đã làm mẫu đầy đủ theo đúng Tier tương ứng: [xs-bugfix.md](examples/xs-bugfix.md), [s-feature.md](examples/s-feature.md), [m-api-change.md](examples/m-api-change.md), [l-multitenant-change.md](examples/l-multitenant-change.md).

## 16. Kiểm tra skill

```bash
bash 07_AI_OPERATING_SYSTEM/01_Skills/06_S_LapTrinhTheoDacTa/scripts/validate-skill.sh
```
