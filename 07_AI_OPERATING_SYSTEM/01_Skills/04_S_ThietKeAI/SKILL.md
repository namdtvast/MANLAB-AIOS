---
name: thiet-ke-ai
description: Thiết kế UI/UX, dashboard, infographic, slide, báo cáo, prototype web/mobile và kiểm tra chất lượng thiết kế cho ManLab-AIOS và ETV theo DESIGN.md. Dùng được với Claude Code và OpenAI Codex.
version: 2.1.0
language: vi
license: Apache-2.0
---

# 04_S_ThietKeAI

## Phạm vi

Kích hoạt khi người dùng yêu cầu thiết kế, vẽ, chuẩn hóa giao diện, tạo infographic, slide, dashboard, website, mobile UI, prototype, biểu đồ, báo cáo trực quan hoặc đánh giá UI/UX.

## Tương thích AI

- Claude Code: đọc `CLAUDE.md`, `SKILL.md` và `DESIGN.md`.
- OpenAI Codex: đọc `AGENTS.md`, `SKILL.md` và `DESIGN.md`.
- Agent khác: phải hỗ trợ đọc file Markdown và tuân thủ workflow trong repo.

## Trình tự bắt buộc

1. Đọc file hướng dẫn phù hợp với agent: `CLAUDE.md` hoặc `AGENTS.md`.
2. Đọc `DESIGN.md`; với ETV/ManLab đọc thêm `design-systems/etv/DESIGN.md`.
3. Chọn module theo `global/ROUTER.md`.
4. Tạo hoặc chuẩn hóa brief theo `templates/briefs/design-brief.md`.
5. Thực hiện workflow tương ứng.
6. Chạy `global/QUALITY-GATES.md`.
7. Lưu sản phẩm vào `outputs/<YYYY-MM-DD>/<ten-san-pham>/` khi có quyền ghi file.

## Quy tắc hỏi người dùng

Không hỏi lại thông tin có thể xác định chắc chắn từ tài liệu hoặc design system. Chỉ hỏi khi thiếu yếu tố làm thay đổi đáng kể đầu ra: loại sản phẩm, kích thước, đối tượng, nội dung bắt buộc, định dạng xuất hoặc nhận diện thương hiệu.

## Định tuyến nhanh

- Dashboard/UI web: `skills/ui-ux-dashboard/SKILL.md`
- Infographic: `skills/infographic-etv/SKILL.md`
- Slide: `skills/slide-deck-etv/SKILL.md`
- Báo cáo/tài liệu: `skills/report-document/SKILL.md`
- Prototype web: `skills/web-prototype/SKILL.md`
- Mobile: `skills/mobile-prototype/SKILL.md`
- Biểu đồ/dữ liệu: `skills/data-visualization/SKILL.md`
- Review tổng thể: `skills/design-review/SKILL.md`
- Accessibility: `skills/accessibility-review/SKILL.md`
- Kiểm tra thương hiệu: `skills/brand-compliance/SKILL.md`
- Đóng gói xuất bản: `skills/export-delivery/SKILL.md`

## Kiểm soát con người

- AI không tự phê duyệt thiết kế, chứng chỉ hoặc kết luận đo lường.
- AI không tự tạo số liệu, logo, chứng nhận, tiêu chuẩn hoặc trích dẫn.
- Mọi nội dung kỹ thuật quan trọng phải được người có thẩm quyền xác nhận.

## Đầu ra tối thiểu

- File nguồn hoặc file chỉnh sửa được khi công cụ cho phép.
- File xuất bản theo yêu cầu.
- `manifest.json` ghi loại sản phẩm, kích thước, design system, nguồn nội dung, ngày tạo và kiểm tra đã thực hiện.
- Danh sách nội dung chưa chắc chắn hoặc cần xác nhận.
