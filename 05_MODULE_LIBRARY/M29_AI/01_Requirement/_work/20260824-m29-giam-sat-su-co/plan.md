# PLAN — M29 Increment 4

## Kiến trúc: đặt logic ở đâu

Giữ đúng tách lớp đang có của M29: **quyết định** ở `rules.ts` (thuần, không I/O) · **điều phối +
ghi DB + audit** ở `actions.ts` · **chặn vận hành** ở `gateway.ts` · **quét theo lịch** ở file mới
`sweep.ts` (module thường, không `"use server"`, để cả Server Action lẫn Route Handler gọi được).

## File impact

| File | Loại | Nội dung |
|---|---|---|
| `prisma/schema.prisma` | sửa | `AIOpStatus += SUSPENDED`; `AIAgent += suspendedReason/suspendedAt`; `AIAuditLog.actorId` nullable `+ actorLabel`; 3 enum mới + 2 model mới |
| `src/lib/m29/model.ts` | sửa | Thêm `PermCategory`: `incidents`, `unregistered`; cập nhật `PERMS` |
| `src/lib/m29/labels.ts` | sửa | Nhãn tiếng Việt cho trạng thái/mức độ/loại sự cố, trạng thái AI chưa đăng ký, `OP_STATUS_LABEL += SUSPENDED` |
| `src/lib/m29/rules.ts` | sửa | `incidentTransitions`, `unregisteredTransitions` (thuần, trả `TxResult`) |
| `src/lib/m29/sweep.ts` | **mới** | `sweepAiaReview()`, `maybeSweep()` (throttle 15 phút) |
| `src/lib/m29/gateway.ts` | sửa | Chèn bước kiểm tra `agent.status` |
| `src/lib/m29/actions.ts` | sửa | `logAudit` nhận actor `SYSTEM`; action sự cố + AI chưa đăng ký; `aiaAction` phục hồi Agent; `checkHealthAction` gọi `sweep.ts` |
| `src/app/api/m29/sweep/route.ts` | **mới** | Điểm gọi cho cron ngoài |
| `src/app/(platform)/modules/M29/page.tsx` | sửa | 2 ô số liệu, cột trạng thái Agent, link mới |
| `src/app/(platform)/modules/M29/incidents/**` | **mới** | list · new · [id] + form client |
| `src/app/(platform)/modules/M29/unregistered/**` | **mới** | list + form client |
| `prisma/seed.mjs` | sửa | Dữ liệu mẫu: 1 AIA quá hạn để demo sweep, 1 phiếu sự cố, 1 AI chưa đăng ký |
| `05_MODULE_LIBRARY/M29_AI/01_Requirement/DacTa.md` | sửa | Hợp nhất kết luận, cập nhật mục 7 trạng thái triển khai |
| `05_MODULE_LIBRARY/M29_AI/03_Database/DataModel.md`, `02_API/API.md`, `07_Workflow/StateMachine.md` | sửa | Bổ sung thực thể/trạng thái/điểm gọi mới |

## Increment (mỗi bước revert độc lập được)

| # | Nội dung | Ranh giới |
|---|---|---|
| **INC-1** | Schema + sweep + Gateway + tự phục hồi + route sweep | Chạy được, verify AC-01→AC-03, AC-10 |
| **INC-2** | Phiếu sự cố AI: rules → actions → UI | Verify AC-04→AC-07 |
| **INC-3** | AI chưa đăng ký: rules → actions → UI + số liệu trang tổng quan | Verify AC-08, AC-09 |
| **INC-4** | Cập nhật tài liệu đặc tả M29 (DacTa/DataModel/API/StateMachine) + verify.md | `validate_links.py` PASS |

## Migration & rollout

- Ba thay đổi schema đều **cộng thêm**, không phá dữ liệu: thêm giá trị enum, thêm cột nullable,
  nới `NOT NULL → NULL`. Không có backfill.
- Dùng `prisma migrate dev` trên **DB riêng `aios_platform_m29inc`** — không đụng `aios_platform_dev`
  đang dùng chung với các phiên khác.
- Rollback: `git revert` commit của increment tương ứng + `prisma migrate resolve --rolled-back`.
  Cột thêm mới để nguyên không gây lỗi cho bản cũ vì đều nullable/có default.

## Rủi ro

| Rủi ro | Xử lý |
|---|---|
| Sweep chạy trong lúc render trang gây side-effect lặp | `maybeSweep()` throttle in-memory 15 phút, không gọi `revalidatePath` khi chạy từ render |
| Nới `AIAuditLog.actorId` nullable làm hỏng chỗ đọc `audit.actor.name` | Rà toàn bộ nơi đọc quan hệ `actor`, hiển thị `actorLabel` khi `actor` null |
| Thêm giá trị enum `SUSPENDED` làm sót nhánh xử lý ở UI cũ | `OP_STATUS_LABEL` là `Record<string,string>` nên không vỡ; rà chỗ so sánh `=== "ACTIVE"` |
| DB dev dùng chung với 5 phiên song song | Đã tách DB riêng ngay từ đầu |

## STOP conditions

Không có thao tác phá hủy dữ liệu, không đổi authentication, không đổi tenant isolation → không cần
xin phê duyệt giữa chừng. Nếu phát sinh nhu cầu đổi ngữ nghĩa các bước Gateway đang có (thay vì chỉ
chèn thêm) thì dừng lại hỏi, vì đó là thay đổi security boundary.
