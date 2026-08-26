# M33 — Verify đợt BUILD nguyên mẫu lên aios-platform (26/08/2026)

Bối cảnh: chủ sở hữu repo ra lệnh BUILD trong khi `ETV.P33` còn **Chờ soát xét** — cùng cách tiếp
cận đã dùng và ghi nhận ở M34 (PR #143): quyết định có chủ đích, banner cảnh báo dự thảo hiển thị
ngay trên trang; giá trị định lượng trong gate bám dự thảo, đổi khi thủ tục được phê duyệt theo
MP14.

## Phạm vi đã xây

| Lớp | Nội dung | Nơi |
|---|---|---|
| Schema | 7 model `M33*` (ITAsset · MaintenancePlan · MaintenanceTask · SystemAccount · AccountReconciliation · ITIncident · AuditEntry) + 21 enum + 13 back-relation trên `User`; migration `m33_he_thong_tt`; **không có DELETE** trên ITAsset/SystemAccount; `serial` unique; schema không có cột bí mật xác thực (R7) | `prisma/schema.prisma` |
| Gate | R1–R22 thuần hàm: baseline R3, Phụ lục I.1 khi phê duyệt (Cao/BYOD/license), chặn ngừng-thanh lý theo phụ thuộc + bằng chứng xóa (R10), nghiệm thu ≠ người thực hiện (R15), máy tính điều khiển đo (R4), kế hoạch năm (R19), tài khoản theo phiếu (R6), kỳ đối chiếu bất biến (R20), đóng sự cố theo R9/R18, 7 nhóm cờ tính-khi-đọc | `src/lib/m33/rules.ts` |
| Action | Server action gọi rule, ghi `M33AuditEntry` append-only; sau nghiệm thu cập nhật `lastMaintainedAt` các tài sản | `src/lib/m33/actions.ts` |
| UI | **11 trang** đúng `04_UI/Screens.md`: danh mục + cờ · khai báo · chi tiết (tab bảo trì/tài khoản/sự cố) · kế hoạch năm (kèm đối chiếu phạm vi R19) · bảo trì – vá lỗi (hàng chờ nghiệm thu) · tài khoản (hàng chờ thu hồi R16) · kỳ đối chiếu · sự cố (định tuyến 5 đích) · bảng đến hạn 7 nhóm · chưa kiểm kê · kiểm kê hợp nhất M33+M27 · báo cáo 8 nội dung §6.9 | `src/app/(platform)/modules/M33/` |
| Seed | 5 tài sản + kế hoạch đã duyệt + 2 công việc + 2 tài khoản + 1 kỳ đối chiếu + 2 sự cố — phủ các nhánh gate và cờ; vai trò M33 cho 6 tài khoản (thêm VP=vanphong@, TP=ldp@); `ACTIVE_MODULE_CODES` += M33 | `prisma/seed.ts` |

## Kết quả verify (bằng chứng chạy thật)

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| `vitest run` toàn dự án | **PASS** | `Tests 331 passed (331)` — trong đó **32 test M33** ánh xạ AC1–AC24 phần rules |
| `next build` (type-check) | **PASS** | Build xong sau khi `prisma generate` lại; route table đủ 11 route `/modules/M33…` |
| `prisma migrate dev` + `db seed` | **PASS** | DB kiểm thử riêng `aios_platform_m33_build`; log seed M33 đầy đủ |
| Chạy thật trên trình duyệt | **PASS** | Đăng nhập `qtht@`, duyệt danh mục (5 tài sản, cờ: Đã ngắt mạng · Chưa kiểm kê quá 30 ngày · Đến hạn rà soát/bảo trì · Bản quyền) · bảng đến hạn 7 nhóm hiển thị đúng từng ca seed · báo cáo đủ 8 nội dung; console 0 lỗi; M33 chấm xanh ACTIVE trên sidebar |
| Gate end-to-end qua UI | **PASS** | QTHT (người thực hiện BT-2026-0002) bấm "Nghiệm thu" → server chặn và UI hiện đúng: *"Người nghiệm thu không được là người thực hiện chính công việc đó (R15 — ETV.P33 Phụ lục II.2)."* |
| `validate_links.py` / `validate_citations.py --chan` | xem commit | Chạy sau khi chốt tài liệu, kết quả ghi ở commit message |
| AC thao tác UI 2 chiều còn lại | **NOT RUN** | Phần rules đã phủ 32 test; nghiệm thu UI đầy đủ để dành kỳ nghiệm thu theo thủ tục sau khi `ETV.P33` được phê duyệt |

## Ghi chú triển khai (spec drift nhỏ, đã phản ánh ngược)

1. **`securityConcluded` (Boolean)** thêm vào `ITIncident`: DacTa yêu cầu "không đóng trước khi M28
   kết luận" — cần cờ xác nhận do PT.ATTT bấm (M28 chưa lên nền tảng, không đọc kết luận tự động
   được). PT.ATTT là người duy nhất bấm được.
2. **Chặn ngừng vận hành theo phụ thuộc** hiện kiểm trên các ref mềm (`platformRefs`,
   `infoAssetRefs`, `measuringDeviceRef` không rỗng ⇒ còn phụ thuộc): xử lý thực tế xong thì QTHT gỡ
   ref rồi thao tác — đúng tinh thần "không nới lỏng điều kiện chặn cứng vì module đích chưa có"
   (DacTa mục 10 điểm 5); chuyển thành kiểm FK thật khi M35/M27/M05 ACTIVE.
3. **Giờ/ngày làm việc** trong SLA sự cố xấp xỉ bằng giờ/ngày lịch (có chú thích trong `rules.ts`)
   — chốt cách tính chính thức khi thủ tục được phê duyệt (DacTa mục 10 điểm 3 — ánh xạ
   impact→priority cũng là diễn giải đặc tả, đã cài đúng đề xuất hiện tại).

## Rollback

Toàn bộ trong một nhánh/PR — revert PR là đủ; DB kiểm thử `aios_platform_m33_build` xóa sau merge.
