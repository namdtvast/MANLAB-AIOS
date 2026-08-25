# M34 — Verify đợt BUILD nguyên mẫu lên aios-platform (26/08/2026)

Bối cảnh: chủ sở hữu repo ra lệnh BUILD trong khi `ETV.P34` còn **Chờ soát xét** — quyết định có
chủ đích, ghi nhận tại DacTa mục 9; mọi giá trị định lượng trong gate bám dự thảo, đổi khi thủ tục
được phê duyệt theo MP14.

## Phạm vi đã xây

| Lớp | Nội dung | Nơi |
|---|---|---|
| Schema | 11 model `M34*` + 17 enum `M34*` + enum `Classification` dùng chung (thang ETV.P02/P27/P28, M27 dùng lại) + 10 back-relation trên `User`; migration `20260825231424_m34_du_lieu_so` | `prisma/schema.prisma` |
| Gate | R1–R22 thuần hàm, mã lỗi + thông báo dẫn đúng điều khoản `ETV.P34` | `src/lib/m34/rules.ts` |
| Action | Server action gọi rule, ghi `M34AuditEntry` append-only, không có DELETE `M34DataSet` | `src/lib/m34/actions.ts` |
| UI | **11 trang** đúng danh sách `04_UI/Screens.md` (danh mục · khai báo · chi tiết + 4 panel · từ điển · dữ liệu chủ · kỳ đo · hiệu chỉnh · chia sẻ · AI · đến hạn · báo cáo 7 nội dung §6.9) | `src/app/(platform)/modules/M34/` |
| Seed | 3 tập demo phủ nhánh gate + vai trò M34 (QLCL/ATTT/LDV/QTDL/QTHT), thêm tài khoản `attt@`, `qtdl@manlab.vn`; `ACTIVE_MODULE_CODES` += M34 | `prisma/seed.ts` |

## Kết quả verify (bằng chứng chạy thật)

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| `vitest run` toàn dự án | **PASS** | `Tests 284 passed (284)` — trong đó **47 test M34** (`src/lib/m34/__tests__/rules.test.ts`, ánh xạ AC1–AC23 phần rules) |
| `next build` (gồm type-check) | **PASS** | Build xong, route table liệt kê đủ 11 route `/modules/M34…` |
| `prisma migrate dev` | **PASS** | Migration tạo + áp lên DB kiểm thử riêng `aios_platform_m34_build` (không đụng DB dev đang dùng) |
| `prisma db seed` | **PASS** | Log: "Đã nạp M34: 3 tập dữ liệu … vai trò M34 cho 5 tài khoản" |
| Chạy thật trên trình duyệt | **PASS** | Đăng nhập `qlcl@`, duyệt `/modules/M34` (3 tập + cờ), chi tiết DS-2026-0001 (từ điển v1, kỳ đo Đạt bất biến, hiệu chỉnh Chờ P10/P11, phiếu ATTT, hồ sơ AI), `/due`, `/report` (đủ 7 nội dung, HC-2026-0001 hiện "đang chặn — R12"); console 0 lỗi |
| Gate end-to-end qua UI | **PASS** | Vai QLCL bấm "LĐV phê duyệt" hồ sơ AI → server trả và UI hiện đúng: *"Cho phép dùng dữ liệu cho hệ thống AI là thẩm quyền LĐV, không ủy quyền (ETV.P34 §5.1)."* |
| `validate_links.py` / `validate_citations.py --chan` | xem commit | Chạy sau khi chốt tài liệu, kết quả ghi ở commit message |
| AC cần thao tác UI 2 chiều còn lại (AC trong Screens.md chưa phủ bởi test rules) | **NOT RUN** | Phần rules đã phủ 47 test; AC thao tác trình duyệt đầy đủ để dành kỳ nghiệm thu theo thủ tục sau khi `ETV.P34` được phê duyệt |

## Spec drift ghi nhận (đã cập nhật ngược vào đặc tả)

1. **`primary_enterer_ref` thêm vào `DataSet`** — R16 ("người nhập không kết luận chất lượng chính
   dữ liệu mình nhập") không kiểm được từ module khác, nên khai người nhập liệu chính trên bản
   ghi làm căn cứ gate. Đã bổ sung DacTa mục 2.1.
2. **Màn hình 5–8 của Screens.md** (kỳ đo, hiệu chỉnh, chia sẻ, AI) vừa có **trang danh sách toàn
   module** vừa có **panel thao tác trong trang chi tiết tập** — thao tác đặt ở chi tiết vì mọi
   gate cần ngữ cảnh của tập; trang danh sách phục vụ giám sát QLCL. Không đổi số lượng URL.
3. **Hạn 15 ngày làm việc** (R15) hiện thực bằng 21 ngày lịch trong `rules.ts` (xấp xỉ, có chú
   thích) — chốt cách tính ngày làm việc chính thức khi thủ tục được phê duyệt.

## Rollback

Toàn bộ nằm trong một nhánh/PR: revert PR + `prisma migrate` xuống (`down.sql` chưa cần vì chưa
có môi trường nào ngoài DB kiểm thử tạm — DB `aios_platform_m34_build` xóa sau khi merge).
