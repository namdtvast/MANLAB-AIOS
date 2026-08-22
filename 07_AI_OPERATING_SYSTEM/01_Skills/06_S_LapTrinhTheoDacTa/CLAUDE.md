# CLAUDE.md — Claude Code Instructions

## Skill identity

- Skill name (frontmatter `name:`): `06-s-lap-trinh-theo-dac-ta`
- Skill directory: `06_S_LapTrinhTheoDacTa` (Mẫu B — không gắn Thủ tục `ETV.Pxx`)
- Skill ID tham chiếu: `DEV-SPEC-001`

## Trình tự nạp

1. Đọc `SKILL.md` của skill này để xác định Mode (ANALYZE/BUILD/REVIEW) và Tier (XS/S/M/L).
2. Đọc `CLAUDE.md` gốc của repo (root) — bắt buộc trước RECON, vì nó định nghĩa kiến trúc 12 tầng, quy ước đặt tên, và quy trình Git mà skill này tái sử dụng thay vì định nghĩa lại.
3. Theo Tier đã xác định, chỉ đọc các file `references/*.md` liên quan (progressive disclosure — không đọc hết mọi reference cho một việc Tier XS).
4. Thực hiện pipeline tương ứng Mode.
5. Trước khi báo cáo hoàn tất, chạy checklist ở `references/definition-of-done.md`.

## Giới hạn quyền theo Mode trong Claude Code

`allowed-tools` trong Claude Code chỉ pre-approve tool, **không khóa** được chế độ read-only. Để ANALYZE thực sự không sửa file trong Claude Code:

- Không chủ động gọi `Edit`/`Write`/`NotebookEdit` trong suốt ANALYZE, kể cả khi tool đó đã được allow — đây là kỷ luật tự giác của skill, không phải giới hạn hệ thống.
- Nếu người dùng cần khóa cứng bằng permission thật, dùng `disallowed-tools`/permission rules của Claude Code (cấu hình trong `.claude/settings.json`, xem skill `update-config` của repo) — đây là phần mở rộng riêng Claude Code, không thuộc lõi portable của `SKILL.md`.

## Quy tắc bắt buộc riêng cho MANLAB-AIOS

- Không tự đổi mã/số `CAP-xx`, `MPxx`, `Mxx` đã tồn tại — đây là khóa liên kết xuyên 12 tầng (xem `CLAUDE.md` gốc, mục "Ràng buộc khi sửa").
- Không sửa trực tiếp tài liệu có `doc_status: issued` — tạo phiên bản mới theo MP14.
- Khi thay đổi đụng tới Hub (`MPxx_Slug/`), module (`Mxx_Slug/`) hoặc capability (`CAP-xx_Slug/`), bước VERIFY bắt buộc chạy `python3 _meta/validate_links.py` và báo kết quả thật.
- Artifact đặc tả (outcome/spec/plan/verify) của Tier M/L lưu theo mục 10 của `SKILL.md` — **không** tạo `docs/specs/` ở root (xung đột với cổng GitHub Pages).
- Git flow tuân thủ nguyên văn `CLAUDE.md` gốc (nhánh → commit → PR → merge → sync), không tạo quy trình Git riêng.
- Chỉ tạo commit khi người dùng yêu cầu rõ ràng — kể cả khi BUILD đã hoàn tất và VERIFY đã PASS.

## Khi nào skill này không áp dụng

- Soạn thảo văn bản hành chính/quy trình thuần Markdown không kèm mã nguồn thật → dùng `s14-kiem-soat-tai-lieu` hoặc `02-s-xu-ly-van-phong`.
- Thiết kế UI/UX thuần hình ảnh chưa đụng code → dùng `04_S_ThietKeAI`.
- Vẽ sơ đồ Draw.io → dùng `05_S_DrawIO`.
- Thiết kế quy chế/RBAC/BPMN cấp tổ chức chưa đụng code → dùng `01_S_Governance`.

Nếu một yêu cầu vừa cần thiết kế UI vừa cần code chạy thật (ví dụ thêm màn hình vào `M10_DamBaoKQ/08_Source/webapp/`), phối hợp: dùng `04_S_ThietKeAI` cho phần thiết kế, `06-s-lap-trinh-theo-dac-ta` cho phần SPEC/PLAN/BUILD/VERIFY mã nguồn.
