# M27_TaiSanTT — PLAN triển khai (work-id 20260824-dac-ta-m27)

> **Chưa thực thi.** Kế hoạch này dành cho lần BUILD sau, và **chỉ nên bắt đầu sau khi chốt 8 câu
> hỏi** ở [`../../DacTa.md`](../../DacTa.md) mục 10 — đặc biệt câu 2 (thang phân loại, vì M26 đã
> tham chiếu) và câu 3 (ranh giới với M34_DuLieuSo).

## Kiến trúc đích

`09_ENGINEERING/aios-platform` — Prisma + Next.js App Router + server action, đúng khuôn M16/M17/M25.
Không dựng nguyên mẫu riêng trong `08_Source/`.

## Ảnh hưởng file dự kiến

| Vùng | Thay đổi |
|---|---|
| `prisma/schema.prisma` | Thêm `M27InfoAsset`, `M27ClassificationRule`, `M27DataSharing`, `M27DisposalRecord`, `M27AuditLog` + enum `M27AssetStatus`, `M27AssetType`, `M27DataDomain`, `Classification` (**dùng chung toàn nền tảng**), `M27CiaLevel`, `M27DisposalMethod`, `M27SharingStatus`, `M27DisposalStatus`, `M27RuleAction`; FK sang M02 (phê duyệt công bố), M14, M15, M33, M28 |
| `prisma/migrations/` | 1 migration mới (chỉ thêm bảng — không phá hủy dữ liệu) |
| `prisma/seed.ts` | Thêm `M27` vào `ACTIVE_MODULE_CODES`; thêm vai trò/tài khoản demo **QT hệ thống**, **Phụ trách ATTT**; seed bảng quy tắc xử lý phiên bản 1 + tài sản mẫu (1 Mật, 1 quá hạn khôi phục, 1 chờ hủy) |
| `src/lib/m27/{rules,actions,labels}.ts` | Gate + server action + nhãn tiếng Việt; **khai báo enum `Classification` dùng chung** |
| `src/app/(platform)/modules/M27/**` | 7 màn hình mục 2 của `spec.md` |
| `src/lib/auth.ts`, `src/lib/menu.ts` | Bổ sung 2 vai trò mới vào ma trận phân quyền và menu |
| `src/lib/m26/*` (sau) | Đổi sang import enum `Classification` từ M27 khi M26 được xây |

## Increment (mỗi increment revert độc lập được)

| # | Nội dung | Verify |
|---|---|---|
| 1 | Vai trò QT hệ thống + Phụ trách ATTT (auth, menu, seed tài khoản) | Đăng nhập 2 vai trò mới |
| 2 | Schema + migration + seed; module chuyển `ACTIVE` | `prisma migrate` chạy sạch; menu hiện M27 |
| 3 | Danh mục + khai báo/sửa tài sản (Nháp) + `labels.ts` | AC1, AC2 |
| 4 | Bảng quy tắc xử lý (soạn/phê duyệt/phiên bản) + hộp quy tắc trên chi tiết tài sản | AC6, AC7 |
| 5 | State machine: gửi soát xét → soát xét → phê duyệt + gate phân loại/dữ liệu cá nhân/sao lưu | AC3, AC4, AC5, AC16 |
| 6 | Phân quyền theo mức phân loại + nhật ký lượt truy cập | AC13 |
| 7 | Chia sẻ dữ liệu (đề nghị/phê duyệt/thu hồi) + liên kết M02 | AC8, AC9 |
| 8 | Hủy dữ liệu (biên bản, phê duyệt trước, thực hiện có bằng chứng) | AC10, AC11, AC12 |
| 9 | Ba bảng đến hạn + ghi nhận rà soát và kiểm tra khôi phục | AC14 |
| 10 | Cờ `ai_use_allowed` + ràng buộc với mức Mật | AC15 |
| 11 | Chuyển giao chủ sở hữu khi nhân sự thay đổi (← M03) | Thử luồng chuyển giao |
| 12 | Xuất F27.01–F27.05 + trích xuất danh mục cho M28 và báo cáo cho M17 | Đối chiếu bản xuất |

## Rollout & rollback

- Chỉ thêm bảng mới ⇒ rollback = revert commit của increment tương ứng; increment 2 rollback bằng
  migration đảo (drop bảng M27).
- Increment 1 sửa `auth.ts`/`menu.ts` (dùng chung toàn nền tảng) ⇒ giữ riêng 1 commit, revert độc lập.
- Enum `Classification` dùng chung: khi M26/M14/M15 chuyển sang import, giữ commit riêng cho mỗi
  module để không kéo theo nhau khi revert.

## Việc ngoài phạm vi kỹ thuật (cần con người)

1. Soạn và ban hành `ETV.P27` + F27.01–F27.05 theo **MP14** (như đã làm với `ETV.P25`, `ETV.P26`).
2. Cập nhật `04_PROCESS_LIBRARY/MP27_TaiSanTT/manifest.yaml` — `owner` còn `"(cập nhật)"`;
   `links.yaml` đang trỏ `procedure` về Sổ tay chất lượng, phải trỏ lại khi `ETV.P27` được ban hành.
   Cân nhắc bổ sung `legal: ['ND13/2023']` vì module chạm dữ liệu cá nhân.
3. **Kiểm kê kỳ đầu**: xác định tài sản thông tin hiện hữu và chủ sở hữu từng tài sản — việc phỏng
   vấn và đối chiếu thực địa, không tự động hóa được.
4. Chốt ranh giới M27 ↔ M34_DuLieuSo **trước khi** bắt đầu đặc tả/BUILD M34.
5. Xác định hồ sơ đánh giá tác động xử lý dữ liệu cá nhân theo NĐ 13/2023 đặt ở module nào.
