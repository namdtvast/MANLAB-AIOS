# M33_HeThongTT — PLAN triển khai (work-id 20260824-dac-ta-m33)

> **Chưa thực thi.** Chỉ nên bắt đầu sau khi chốt 8 câu hỏi ở [`../../DacTa.md`](../../DacTa.md)
> mục 10 — đặc biệt câu 2 (ranh giới thiết bị đầu cuối M33 ↔ M27) và câu 3 (tài khoản M33 ↔ M28).

## Kiến trúc đích

`09_ENGINEERING/aios-platform` — Prisma + Next.js App Router + server action, khuôn M16/M17/M25.
Không dựng nguyên mẫu riêng trong `08_Source/`.

## Ảnh hưởng file dự kiến

| Vùng | Thay đổi |
|---|---|
| `prisma/schema.prisma` | Thêm `M33ITAsset`, `M33MaintenanceTask`, `M33SystemAccount`, `M33ITIncident`, `M33AuditLog` + enum `M33AssetClass`, `M33AssetStatus`, `M33NetworkZone`, `M33Environment`, `M33Criticality`, `M33TaskType`, `M33Severity`, `M33AccountType`, `M33IncidentImpact`, `M33IncidentStatus`; import enum `Classification` từ M27; FK sang M05, M07, M10, M13, M27, M28, M30, M35 |
| `prisma/migrations/` | 1 migration mới (chỉ thêm bảng) |
| `prisma/seed.ts` | Thêm `M33` vào `ACTIVE_MODULE_CODES`; vai trò/tài khoản demo **QTHT**, **PT.ATTT** (dùng chung với M27/M28); seed: 1 máy chủ trọng yếu, 1 máy tính điều khiển thiết bị đo, 1 laptop Hạn chế đã mã hóa, 1 thiết bị EOL, 1 vá lỗi quá hạn, 1 tài khoản không phiếu |
| `src/lib/m33/{rules,actions,labels}.ts` | Gate + server action + nhãn tiếng Việt |
| `src/app/(platform)/modules/M33/**` | 7 màn hình mục 2 của `spec.md` |
| `src/lib/auth.ts`, `src/lib/menu.ts` | Bổ sung 2 vai trò mới (nếu M27/M28 chưa làm trước) |

## Increment (mỗi increment revert độc lập được)

| # | Nội dung | Verify |
|---|---|---|
| 1 | Vai trò QTHT + PT.ATTT (auth, menu, seed) — bỏ qua nếu M27/M28 đã thêm | Đăng nhập 2 vai trò |
| 2 | Schema + migration + seed; module chuyển `ACTIVE` | `prisma migrate` chạy sạch; menu hiện M33 |
| 3 | Danh mục + khai báo/sửa tài sản + `labels.ts` | AC1 |
| 4 | Gate cấu hình an toàn thiết bị đầu cuối + BYOD | AC2, AC3 |
| 5 | State machine: soát xét → phê duyệt → tạm ngừng → ngừng vận hành | AC10, AC16 |
| 6 | Bảo trì – vá lỗi: kế hoạch, hoàn thành, hoãn; gate M30/M10 | AC4, AC13 |
| 7 | Tách môi trường và chặn dữ liệu thật ở Kiểm thử/Phát triển | AC5 |
| 8 | Tài khoản hệ thống + gate phiếu M28 + chặn bí mật xác thực | AC6, AC7 |
| 9 | Bảng đối chiếu tài khoản ↔ phiếu M28 | AC8 |
| 10 | Sự cố: ghi nhận, định tuyến M28/M35/M10, KPH khi lặp | AC11, AC12 |
| 11 | Thanh lý có bằng chứng xóa dữ liệu (← M27) | AC9, AC15 |
| 12 | Bốn bảng đến hạn (tính khi đọc) | AC13 |
| 13 | Báo cáo kiểm kê hợp nhất M33 + M27 | AC14 |
| 14 | Xuất F33.01–F33.04 + trích xuất cho M31 và M17 | Đối chiếu bản xuất |

## Rollout & rollback

- Chỉ thêm bảng mới ⇒ rollback = revert commit của increment tương ứng; increment 2 rollback bằng
  migration đảo (drop bảng M33).
- Increment 1 sửa `auth.ts`/`menu.ts` (dùng chung) ⇒ commit riêng, revert độc lập.
- Increment 13 đọc dữ liệu M27 ⇒ chỉ triển khai sau khi M27 lên nền tảng; nếu chưa, hiển thị phần
  M27 là "chưa có dữ liệu", không chặn phần còn lại.

## Việc ngoài phạm vi kỹ thuật (cần con người)

1. Soạn và ban hành `ETV.P33` + F33.01–F33.04 theo **MP14**.
2. **Chốt câu hỏi 2** (thiết bị đầu cuối thuộc danh mục nào) — nếu LĐV chọn phương án khác quy tắc
   R2 thì phải sửa đồng bộ đặc tả M27 và có thể phải hiệu đính `ETV.P28` mục 5.7.2 theo MP14.
3. Cập nhật `04_PROCESS_LIBRARY/MP33_HeThongTT/manifest.yaml` — `owner` còn `"(cập nhật)"`;
   `links.yaml` trỏ `procedure` về Sổ tay chất lượng, phải trỏ lại khi `ETV.P33` được ban hành.
4. **Kiểm kê hạ tầng kỳ đầu**: máy chủ, thiết bị mạng, máy tính điều khiển thiết bị đo, máy trạm,
   bản quyền phần mềm, dịch vụ đám mây đang dùng — việc kiểm đếm thực địa.
5. Chốt cấu hình an toàn cơ sở (baseline) cho từng lớp thiết bị — việc kỹ thuật của QTHT, làm căn cứ
   cho trường kiểm tra trong F33.01.
