# M27_TaiSanTT — PLAN (work-id 20260826-build-m27-danh-muc)

> Kế thừa `../20260824-dac-ta-m27/plan.md`; file này chỉ ghi phần **thực thi lần này** và những chỗ
> lệch so với kế hoạch cũ sau khi `ETV.P27` ban hành.

## Lệch so với plan.md ngày 24/08/2026

| Kế hoạch cũ | Nay | Vì sao |
|---|---|---|
| Model `M27DataSharing` | **Bỏ** | P27 §6.6 giao luồng chia sẻ cho ETV.P34 §6.5 / F34.03 |
| Enum `M27SharingStatus` | **Bỏ** | theo trên |
| Increment 1: thêm vai trò QTHT + PT.ATTT | **Kiểm tra trước** | M33 đã lên nền tảng sau ngày lập kế hoạch, nhiều khả năng đã có sẵn hai vai trò này — dựng trùng sẽ hỏng ma trận phân quyền |
| `review_cycle` enum 3 mức | **2 mức** (6 / 12 tháng) | P27 §6.8 không có mức 2 năm |
| F27.05 phiếu kiểm tra khôi phục | **Bỏ**, dùng F31.03 | P27 §6.5.2 |

## Increment (mỗi increment revert độc lập được)

| # | Nội dung | Verify |
|---|---|---|
| **1** | `schema.prisma`: `M27InfoAsset`, `M27ClassificationRule`, `M27AuditEntry` + enum. Enum **`Classification` không mang tiền tố M27** (dùng chung toàn nền tảng, NFR spec.md mục 5) | `prisma validate` + migrate chạy sạch |
| **2** | `seed.ts`: M27 vào `ACTIVE_MODULE_CODES`; seed bảng quy tắc phiên bản 1 = **32 dòng** (8 hành động × 4 mức) lấy nguyên PHẦN B của `ETV.P.F27.02`; seed tài sản mẫu gồm 1 Mật, 1 quá hạn kiểm chứng phục hồi, 1 vô chủ | Menu hiện M27; `/modules/M27` mở được |
| **3** | `src/lib/m27/{labels,rules}.ts` — nhãn tiếng Việt + **8 điều kiện chặn** của P27 Phụ lục I.1, thuần hàm, không chạm DB | Unit test từng điều kiện |
| **4** | `src/lib/m27/{actor,actions}.ts` — server action theo bảng mục 3 `../20260824-dac-ta-m27/spec.md`, giới hạn phạm vi lần này; **không có** action xoá | Test + thử gọi trực tiếp (AC12) |
| **5** | Trang: danh mục `/modules/M27`, chi tiết `/asset/[id]` kèm **hộp quy tắc xử lý**, khai báo `/asset/new`, bảng đến hạn `/due`, dữ liệu cá nhân `/personal-data` | AC1–AC7, AC13, AC14, AC16 |

## Ánh xạ điều kiện chặn → nơi thực thi

Nguồn: `ETV.P27` Phụ lục I.1 (8 điều kiện) và I.2. Tất cả **phải nằm ở `rules.ts` và được server
action gọi** — UI chỉ phản ánh, không phải nơi chặn (NFR: "kiểm tra vai trò **và** mức phân loại ở
server action").

| # | Điều kiện P27 | Hàm rules | AC |
|---|---|---|---|
| 1 | Chủ sở hữu là cá nhân đang làm việc | `checkOwner` | AC1 |
| 2 | Tài sản điện tử phải có người quản lý kỹ thuật | `checkCustodian` | AC2 |
| 3 | Có mức phân loại và ba mức C–I–A | `checkClassificationAndCia` | — |
| 4 | Không thấp hơn mức tối thiểu của nhóm dữ liệu (§6.1.3) | `checkMinimumClassification` | AC3 |
| 5 | Có thời hạn lưu và căn cứ thời hạn | `checkRetention` | — |
| 6 | Dữ liệu cá nhân: căn cứ + mục đích + thời hạn hữu hạn | `checkPersonalData` | AC4 |
| 7 | Sẵn sàng = Cao ⇒ bắt buộc sao lưu và tần suất | `checkBackup` | AC5 |
| 8 | Bản ghi không chứa dữ liệu thật | `checkNoRealData` *(cảnh báo mềm — máy không kiểm được ngữ nghĩa, chỉ nhắc người soát xét)* | — |
| I.2 | Đưa Hạn chế/Mật vào chỉ mục AI | `checkAiUse` | AC15 |
| I.2 | Xoá bản ghi kiểm kê | *(không có action xoá)* | AC12 |

## Rollout & rollback

- Chỉ **thêm** bảng ⇒ rollback = revert commit của increment tương ứng; increment 1 rollback bằng
  migration đảo (drop 3 bảng M27 + enum).
- Increment 1 và 2 chạm file dùng chung (`schema.prisma`, `seed.ts`) ⇒ giữ commit riêng.
- Enum `Classification` dùng chung: khi M26/M14/M15/M34 chuyển sang import, mỗi module một commit
  riêng để revert không kéo theo nhau.

## STOP — dừng lại hỏi người dùng nếu gặp

1. Vai trò QTHT/PT.ATTT **chưa** tồn tại trên nền tảng ⇒ thêm vai trò là sửa ma trận phân quyền dùng
   chung (Tier L), phải hỏi trước.
2. Có sẵn model/enum tên `Classification` mang ngữ nghĩa khác ⇒ đổi tên là breaking change với module
   đang dùng.
3. Migration đòi reset cơ sở dữ liệu ⇒ mất dữ liệu demo của các module khác.
