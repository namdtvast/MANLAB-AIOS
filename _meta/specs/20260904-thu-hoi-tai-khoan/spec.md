# Thu hồi và tạm khóa tài khoản đăng nhập ManLab

- **work-id:** `20260904-thu-hoi-tai-khoan`
- **Tier:** L (đổi authentication + security boundary + schema)
- **Ngày:** 04/09/2026
- **Phạm vi mã nguồn:** `09_ENGINEERING/aios-platform`
- **Căn cứ:** ETV.P28 §6.7.1 (thu hồi trong ngày làm việc; Phụ lục II điểm 6), ETV.P33 §6.4 (QTHT thực thi theo phiếu F28.04, §6.4.3 khóa tạm tài khoản không phiếu)

## 1. OUTCOME

**WHO** — Quản trị hệ thống (QTHT) và Quản trị viên nền tảng (`PlatformRole=ADMIN`).

**WHAT** — Khóa tạm hoặc thu hồi một tài khoản trong sổ F33.03 thì tài khoản đăng nhập ManLab tương ứng **mất hiệu lực ngay**: không đăng nhập mới được, và phiên đang mở bị cắt ở request kế tiếp.

**WHY** — Hiện `model User` không có trạng thái nào; ghi "đã thu hồi" trong sổ M33 mà người đó vẫn đăng nhập và ghi được dữ liệu. Đó là vi phạm ETV.P28 §6.7.1 và Phụ lục II điểm 6 (chưa thu hồi trong ngày → cảnh báo LĐV, không hoàn tất thủ tục thôi việc theo ETV.P03).

**SUCCESS CRITERIA**
1. Thu hồi bản ghi sổ có liên kết tài khoản nền tảng → người đó đăng nhập bị từ chối.
2. Người đó đang mở tab → request kế tiếp bị đẩy về `/login`, mọi server action ném "Chưa đăng nhập".
3. Thu hồi bản ghi **không** liên kết tài khoản nền tảng (email công vụ, tài khoản trên thiết bị) → không ảnh hưởng đăng nhập ManLab.
4. Khóa tạm mở lại được sau khi PT.ATTT xem xét (§6.4.3); thu hồi thì không.
5. Mọi lần đổi trạng thái có vết trong `M33AuditEntry` kèm lý do bắt buộc.

## 2. Quyết định thiết kế

### 2.1 Nối bằng khóa ngoại, không bằng `holderId`
`M33SystemAccount.holderId` là **người giữ** tài khoản trên một hệ thống bất kỳ. Khóa tài khoản email công vụ của một người không được phép khóa đăng nhập ManLab của họ. Vì vậy thêm cột riêng `platformUserId` (FK → `User`, `@unique`), chỉ đặt cho bản ghi mô tả **chính tài khoản đăng nhập ManLab**. Suy đoán từ `holderId` hoặc so khớp chuỗi `platformRef` đều sai — chuỗi gõ tay thì hoặc khóa nhầm người, hoặc lặng lẽ không khóa ai.

Ràng buộc khi ghi sổ (`validateAccountInput`): có `platformUserId` thì bắt buộc là tài khoản **trên nền tảng** (`platformRef`, không phải `assetId`), loại tài khoản ≠ `DICH_VU_HE_THONG`, và `holderId` phải trùng `platformUserId` — tài khoản đăng nhập của một người thì người giữ chính là người đó.

### 2.2 Thẩm quyền: QTHT **và** ADMIN nền tảng
ETV.P33 §6.4 giao QTHT thực thi. Nhưng vai trò QTHT nằm ở `ModuleRoleAssignment`, mà bảng đó **chỉ `prisma/seed.ts` ghi** — không giao diện, không script. Nếu chỉ chấp nhận QTHT thì trên môi trường thật không ai bấm được nút, kiểm soát P28 vẫn không thi hành được. Chấp nhận thêm `PlatformRole=ADMIN` là hiện thân kỹ thuật của QTHT trên nền tảng này; vai trò thật của người thực hiện được ghi vào `M33AuditEntry.role` nên vết vẫn phân biệt được. Khi có trang cấp vai trò module thì siết lại về đúng QTHT.

### 2.3 Cắt phiên đang mở
Kiểm trạng thái trong `session` callback của NextAuth: mọi `auth()` đều đi qua đó, nên bao phủ cả trang lẫn server action, không phải thêm gọi ở 20 file `actor.ts`. Giá: một truy vấn theo khóa chính mỗi lần `auth()`.

Tài khoản bị khóa → không gán `session.user.id`/`role`, gắn cờ `biKhoa`. Hệ quả dây chuyền có chủ đích: `getActor()` của mọi module ném "Chưa đăng nhập"; `proxy.ts` thấy cờ thì đẩy về `/login?loi=khoa`.

**Fail-open khi truy vấn lỗi.** DB không đọc được thì coi như tài khoản còn hiệu lực (kèm `console.error`), không đăng xuất toàn hệ thống vì một lần mất kết nối. Đánh đổi có ý thức: mất kết nối DB thì mọi trang cũng đã hỏng, còn fail-closed biến sự cố hạ tầng thành sự cố đăng nhập toàn Viện.

### 2.4 Bổ sung đường mở khóa
M33 hiện chỉ có một chiều `DANG_HOAT_DONG → TAM_KHOA → DA_THU_HOI`, không có đường quay lại. Khi trạng thái sổ chưa chạm tới đăng nhập thì đó là thiếu sót nhỏ; nối vào đăng nhập rồi thì khóa nhầm = mất truy cập vĩnh viễn, không sửa được bằng giao diện. Vì vậy bổ sung `txUnlockAccount` (`TAM_KHOA → DANG_HOAT_DONG`, bắt buộc lý do) — đúng tinh thần §6.4.3: khóa tạm là để **chờ PT.ATTT xem xét**, xem xét xong phải có lối ra. Thu hồi vẫn là một chiều.

## 3. SPEC

### 3.1 Dữ liệu

```prisma
enum UserAccountStatus { DANG_HOAT_DONG  TAM_KHOA  DA_THU_HOI }

model User {
  accountStatus       UserAccountStatus @default(DANG_HOAT_DONG)
  accountStatusAt     DateTime?
  accountStatusReason String?
  m33PlatformAccount  M33SystemAccount? @relation("M33PlatformLogin")
}

model M33SystemAccount {
  platformUserId String? @unique
  platformUser   User?   @relation("M33PlatformLogin", fields: [platformUserId], references: [id])
}
```

Không thêm cột "phiếu F28.04" vào `User`: `M33SystemAccount.accessRequestRef` đã giữ căn cứ và là NOT NULL — nhân bản sang `User` là phá quy ước một nguồn sự thật.

### 3.2 Quy tắc (thuần hàm, `src/lib/m33/rules.ts`)

| Rule | Nội dung |
|---|---|
| R-TK1 | `M33ActorUser` mang thêm `platformRole`; `laQuanTriTaiKhoan(u)` = `m33Role === "QTHT"` hoặc `platformRole === "ADMIN"` |
| R-TK2 | `txLockAccount`: `DANG_HOAT_DONG` → `TAM_KHOA`; QTHT/ATTT/ADMIN; bắt buộc lý do |
| R-TK3 | `txUnlockAccount`: `TAM_KHOA` → `DANG_HOAT_DONG`; QTHT/ATTT/ADMIN; bắt buộc lý do (dẫn kết luận PT.ATTT) |
| R-TK4 | `txRevokeAccount`: bất kỳ → `DA_THU_HOI`; QTHT/ADMIN; bắt buộc lý do; đặt `revokedAt` |
| R-TK5 | `TRANG_THAI_NGUOI_DUNG`: ánh xạ 1–1 trạng thái sổ → `UserAccountStatus` |
| R-TK6 | `validateAccountInput`: ràng buộc `platformUserId` nêu ở §2.1 |

### 3.3 Hành vi đăng nhập

| Trạng thái `User.accountStatus` | Đăng nhập mới | Phiên đang mở |
|---|---|---|
| `DANG_HOAT_DONG` | cho phép | giữ nguyên |
| `TAM_KHOA` | từ chối | cắt ở request kế tiếp |
| `DA_THU_HOI` | từ chối | cắt ở request kế tiếp |

Provider `doi-tai-khoan` (chuyển tài khoản demo) áp cùng một điều kiện — nếu không thì nó thành đường vòng qua chính lớp chặn này.

Thông báo ở `/login` nói tài khoản đã bị khóa/thu hồi và liên hệ QTHT; **không** phân biệt tạm khóa với thu hồi và không nêu lý do — trang đăng nhập là bề mặt công khai.

### 3.4 Acceptance criteria

1. `authorize()` trả `null` cho tài khoản `TAM_KHOA`/`DA_THU_HOI`, cả hai provider.
2. `session` callback bỏ `id`/`role` và đặt `biKhoa` khi tài khoản mất hiệu lực.
3. `proxy.ts` đẩy request có `biKhoa` về `/login?loi=khoa` với mọi đường dẫn không công khai.
4. `revokeAccount` trên bản ghi có `platformUserId` cập nhật `User.accountStatus` **trong cùng transaction** — sổ và tài khoản không bao giờ lệch nhau.
5. `revokeAccount` trên bản ghi không có `platformUserId` không đụng bảng `User`.
6. Mở khóa đưa cả sổ lẫn `User` về `DANG_HOAT_DONG`.
7. Non-QTHT/non-ADMIN nhận `FORBIDDEN`.

### 3.5 NFR

- Thêm đúng một truy vấn `User` theo khóa chính mỗi lần `auth()`.
- Không ghi lý do khóa vào bất kỳ phản hồi nào của trang đăng nhập.

## 4. PLAN

### File impact

```
MODIFY  prisma/schema.prisma
CREATE  prisma/migrations/20260904090000_thu_hoi_tai_khoan/migration.sql
MODIFY  src/lib/m33/rules.ts, actor.ts, actions.ts
MODIFY  src/lib/m33/__tests__/rules.test.ts
MODIFY  src/lib/auth.ts, src/proxy.ts, src/types/next-auth.d.ts
MODIFY  src/app/login/page.tsx, src/app/login/LoginForm.tsx (nếu cần)
MODIFY  src/app/(platform)/modules/M33/accounts/page.tsx, AccountActions.tsx
MODIFY  05_MODULE_LIBRARY/M33_HeThongTT/04_UI/HDSD.yaml
DO NOT MODIFY  scripts/cap-tai-khoan.ts (cấp tài khoản là việc khác), src/lib/access-request/*
```

### Increment

| # | Nội dung |
|---|---|
| P1 | Schema + migration (toàn lệnh cộng thêm, không backfill) |
| P2 | `rules.ts` + unit test |
| P3 | `actor.ts` (mang `platformRole`) + `actions.ts` (transaction 2 bảng) |
| P4 | `auth.ts` + `proxy.ts` + type + trang login |
| P5 | UI sổ tài khoản: chọn tài khoản nền tảng, cột hiển thị, nút mở khóa |
| P6 | HDSD.yaml của M33 |
| P7 | Verify |

### Risk

| Rủi ro | Mức | Giảm thiểu |
|---|---|---|
| Khóa nhầm người do nối sai bản ghi | HIGH | FK `@unique` + ràng buộc `holderId === platformUserId`; không suy đoán từ chuỗi |
| Khóa nhầm không gỡ được | HIGH | `txUnlockAccount` (§2.4) |
| Lỗi DB làm đăng xuất toàn hệ thống | MEDIUM | fail-open có chủ đích (§2.3) |
| ADMIN vượt quyền QTHT | MEDIUM | ghi vai trò thật vào `M33AuditEntry.role`; siết lại khi có trang cấp vai trò module |
| Migration | LOW | chỉ ADD COLUMN + CREATE TYPE, mặc định `DANG_HOAT_DONG`, không backfill, không DROP |

### Rollback

`git revert` commit + migration nghịch (`DROP COLUMN`, `DROP TYPE`). Cột mới chưa có dữ liệu nghiệp vụ nào phụ thuộc, revert không mất gì ngoài chính trạng thái khóa.

**Lưu ý triển khai:** migration trên VPS do người dùng tự chạy — phiên Claude không truy cập được DB thật.
