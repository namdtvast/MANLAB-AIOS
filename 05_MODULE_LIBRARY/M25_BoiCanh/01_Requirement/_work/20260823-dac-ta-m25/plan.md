# M25_BoiCanh — PLAN triển khai (work-id 20260823-dac-ta-m25)

> **Chưa thực thi.** Kế hoạch này dành cho lần BUILD sau, và **chỉ nên bắt đầu sau khi chốt 6 câu
> hỏi** ở [`../../DacTa.md`](../../DacTa.md) mục 10 (đặc biệt câu 1: có ban hành `ETV.P25` không).

## Kiến trúc đích

`09_ENGINEERING/aios-platform` — Prisma + Next.js App Router + server action, đúng khuôn M16/M17.
Không dựng nguyên mẫu riêng trong `08_Source/` (M01/M02/M03/M04/M16/M17 đều bỏ bước này).

## Ảnh hưởng file dự kiến

| Vùng | Thay đổi |
|---|---|
| `prisma/schema.prisma` | Thêm `M25ContextReview`, `M25ContextIssue`, `M25InterestedParty`, `M25PartyExpectation`, `M25AuditLog` + enum `M25ReviewStatus`, `M25CycleType`, `M25IssueOrigin`, `M25IssueCategory`, `M25ImpactLevel`, `M25PartyGroup`, `M25MonitorFreq`, `M25EntryStatus`; FK `risk_refs` → model M01 |
| `prisma/migrations/` | 1 migration mới (chỉ thêm bảng — không phá hủy dữ liệu) |
| `prisma/seed.ts` | Bật `PlatformModule M25` sang `ACTIVE`; seed 1 kỳ mẫu đã phê duyệt + 1 kỳ nháp |
| `src/lib/m25/{rules,actions,labels}.ts` | Gate + server action + nhãn tiếng Việt |
| `src/app/(platform)/modules/M25/**` | 5 màn hình mục 2 của `spec.md` |
| `src/lib/m17/*` | Thêm cảnh báo mềm AC11 (đọc kỳ bối cảnh của năm) |

## Increment (mỗi increment revert độc lập được)

| # | Nội dung | Verify |
|---|---|---|
| 1 | Schema + migration + seed; module chuyển `ACTIVE` | `prisma migrate` chạy sạch; menu hiện M25 |
| 2 | Danh sách + tạo/sửa kỳ (Nháp), `labels.ts` | AC1 |
| 3 | Tab vấn đề bối cảnh (CRUD + đóng mục có lý do) | AC4 (phần vấn đề), AC10 |
| 4 | Tab bên quan tâm + mong đợi con | AC3, AC4 |
| 5 | State machine: gửi soát xét → soát xét → phê duyệt/hủy + gate tách vai trò | AC2, AC5, AC6, AC10 |
| 6 | Bất biến sau phê duyệt + kế thừa kỳ trước + `supersedes_ref` | AC7, AC8 |
| 7 | Bảng theo dõi đến hạn (tính khi đọc) | AC9 |
| 8 | Cảnh báo mềm sang M17 | AC11 |
| 9 | Xuất F25.01–F25.03 (dán nhãn nháp nếu biểu mẫu chưa ban hành) | Đối chiếu bản xuất |

## Rollout & rollback

- Chỉ thêm bảng mới, **không** đụng dữ liệu module khác ⇒ rollback = revert commit của increment
  tương ứng; increment 1 rollback bằng migration đảo (drop bảng M25), không ảnh hưởng M01/M17.
- Increment 8 sửa file thuộc M17 (đang chạy thật) ⇒ giữ riêng 1 commit, revert được độc lập.

## Việc ngoài phạm vi kỹ thuật (cần con người)

1. Soạn và ban hành `ETV.P25` + F25.01–F25.03 theo **MP14**.
2. Cập nhật `04_PROCESS_LIBRARY/MP25_BoiCanh/manifest.yaml` — `owner` hiện còn `"(cập nhật)"`, và
   `links.yaml` đang trỏ `procedure` về Sổ tay chất lượng (đúng ở thời điểm này vì chưa có ETV.P25;
   phải trỏ lại khi thủ tục được ban hành).
3. Chuẩn bị danh sách bên quan tâm hiện hành để nhập kỳ gốc.
