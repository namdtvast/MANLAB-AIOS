# M26_TriThuc — PLAN triển khai (work-id 20260823-dac-ta-m26)

> **Chưa thực thi.** Kế hoạch này dành cho lần BUILD sau, và **chỉ nên bắt đầu sau khi chốt 8 câu
> hỏi** ở [`../../DacTa.md`](../../DacTa.md) mục 10 (đặc biệt câu 1: có ban hành `ETV.P26` không,
> và câu 7: thang bảo mật của M27/M02).

## Kiến trúc đích

`09_ENGINEERING/aios-platform` — Prisma + Next.js App Router + server action, đúng khuôn M16/M17.
Không dựng nguyên mẫu riêng trong `08_Source/`.

## Ảnh hưởng file dự kiến

| Vùng | Thay đổi |
|---|---|
| `prisma/schema.prisma` | Thêm `M26KnowledgeItem`, `M26KnowledgeHolder`, `M26LessonLearned`, `M26KnowledgeNeed`, `M26SharingEvent`, `M26SharingParticipant`, `M26AuditLog` + enum `M26ItemStatus`, `M26KnowledgeForm`, `M26Category`, `M26Origin`, `M26Criticality`, `M26Confidentiality`, `M26ReviewCycle`, `M26LessonSource`, `M26LessonStatus`, `M26NeedTrigger`, `M26NeedMethod`, `M26NeedStatus`, `M26SharingForm`, `M26SharingStatus`; FK sang model M01 (rủi ro), M14 (tài liệu), M03 (hồ sơ đào tạo) |
| `prisma/migrations/` | 1 migration mới (chỉ thêm bảng — không phá hủy dữ liệu) |
| `prisma/seed.ts` | Thêm `M26` vào `ACTIVE_MODULE_CODES`; seed danh mục mẫu: 1 mục tri thức hiện, 1 mục tri thức ẩn trọng yếu (1 người giữ) để minh họa gate, 1 mục quá hạn rà soát, 1 bài học, 1 nhu cầu |
| `src/lib/m26/{rules,actions,labels}.ts` | Gate + server action + nhãn tiếng Việt |
| `src/app/(platform)/modules/M26/**` | 6 màn hình mục 2 của `spec.md` |
| `src/lib/m13/*` (và tương tự M12/M10/M16) | Hook mềm sinh `LessonLearned` khi đóng bản ghi nguồn (AC13) |

## Increment (mỗi increment revert độc lập được)

| # | Nội dung | Verify |
|---|---|---|
| 1 | Schema + migration + seed; module chuyển `ACTIVE` | `prisma migrate` chạy sạch; menu hiện M26 |
| 2 | Danh mục + tạo/sửa mục tri thức (Nháp) + `labels.ts` | AC1, AC2 |
| 3 | State machine: gửi soát xét → soát xét → phê duyệt/hủy + gate tách vai trò | AC3, AC4, AC5, AC14 |
| 4 | Phiên bản + tuyên bố hết hiệu lực (`new-version`, `retire`) | AC6 |
| 5 | Phân quyền theo mức bảo mật + nhật ký lượt truy cập | AC8 |
| 6 | Cờ `ai_indexed` + ràng buộc cùng giao dịch khi hết hiệu lực | AC7 |
| 7 | Rà soát định kỳ + bảng đến hạn (tính khi đọc) | AC9 |
| 8 | Bài học kinh nghiệm (CRUD + gắn mục tri thức + phê duyệt) | AC10 |
| 9 | Nhu cầu tri thức (CRUD + fulfill/waive) | AC11 |
| 10 | Chia sẻ tri thức + liên kết hồ sơ đào tạo M03 | AC12 |
| 11 | Bảng rủi ro mất tri thức + mở rủi ro sang M01 | Đối chiếu với danh sách seed |
| 12 | Hook mềm từ M13/M12/M10/M16 sinh bài học | AC13 |
| 13 | Xuất F26.01–F26.04 + trích xuất báo cáo cho M17 (dán nhãn nháp nếu biểu mẫu chưa ban hành) | Đối chiếu bản xuất |

## Rollout & rollback

- Chỉ thêm bảng mới, **không** đụng dữ liệu module khác ⇒ rollback = revert commit của increment
  tương ứng; increment 1 rollback bằng migration đảo (drop bảng M26).
- Increment 12 sửa file thuộc M13/M12/M10/M16 (đang chạy thật) ⇒ giữ riêng 1 commit cho mỗi module
  nguồn, revert được độc lập; hook là **cảnh báo mềm**, hỏng hook không được chặn luồng module nguồn.
- Increment 6 (chỉ mục AI) chỉ bật cờ trong DB; việc nạp/gỡ chỉ mục thật ở `08_KNOWLEDGE_GRAPH/09,10`
  do M29 thực hiện — **không** ghép chung PR với M26 để rollback độc lập.

## Việc ngoài phạm vi kỹ thuật (cần con người)

1. Soạn và ban hành `ETV.P26` + F26.01–F26.04 theo **MP14**.
2. Cập nhật `04_PROCESS_LIBRARY/MP26_TriThuc/manifest.yaml` — `owner` hiện còn `"(cập nhật)"`;
   `links.yaml` đang trỏ `procedure` về Sổ tay chất lượng (đúng ở thời điểm này vì chưa có ETV.P26;
   phải trỏ lại khi thủ tục được ban hành). Cân nhắc bổ sung `standards` ISO/IEC 27001, 42001 vì
   M26 chạm phân loại bảo mật và nguồn tri thức cho AI.
3. Kiểm kê danh mục tri thức kỳ đầu (đặc biệt **tri thức ẩn trọng yếu**: phép đo/thiết bị hiện chỉ
   một người làm được) — đây là việc phỏng vấn, không tự động hóa được.
4. Chốt với M27/M02 thang phân loại bảo mật để M26 kế thừa đúng tên gọi.
