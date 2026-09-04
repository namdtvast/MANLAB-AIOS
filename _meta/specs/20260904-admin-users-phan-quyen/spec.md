# Trang quản trị người dùng và phân quyền — /admin/users

- **work-id:** `20260904-admin-users-phan-quyen`
- **Tier:** L (đổi kiến trúc authorization)
- **Ngày:** 04/09/2026
- **Phạm vi mã nguồn:** `09_ENGINEERING/aios-platform`
- **Căn cứ:** ETV.P28 §6.7.1 (F28.04: TP đề nghị → PT.ATTT/LĐV phê duyệt → QTHT thực hiện; rà soát ≥ 06 tháng/lần; thu hồi trong ngày làm việc), P28 Phụ lục II điểm 5 (cấp quyền không phiếu là vi phạm nghiêm trọng), ETV.P33 §6.4 (QTHT thực thi, không phê duyệt)
- **Tiếp nối:** `_meta/specs/20260904-thu-hoi-tai-khoan/` (đã merge — hiệu lực đăng nhập)

## 1. OUTCOME

**WHO** — Quản trị viên nền tảng (`PlatformRole=ADMIN`).

**WHAT** — Xem danh sách người dùng và, **theo phiếu F28.04 đã phê duyệt trong M28**, gán hoặc thu hồi vai trò từng module, đổi vai trò nền tảng.

**WHY** — `ModuleRoleAssignment` là thứ quyết định ai làm được gì trong từng module (`src/lib/mXX/actor.ts` đọc bảng này), nhưng **chỉ `prisma/seed.ts` ghi được**: không giao diện, không script. Hệ quả: tài khoản người thật cấp bằng `scripts/cap-tai-khoan.ts` không có vai trò module nào, vào module nào cũng chỉ xem được. Muốn cấp quyền thì phải sửa `seed.ts` rồi chạy lại seed — tức là phân quyền thật đang nằm ngoài mọi thủ tục đã ban hành.

**SUCCESS CRITERIA**
1. Gán được vai trò module cho một người và người đó dùng được ngay module tương ứng.
2. Không gán được nếu không chọn phiếu F28.04 đã phê duyệt **của chính người đó**.
3. Thu hồi được vai trò, có vết, và người đó mất quyền ngay.
4. Mọi lần cấp/thu hồi/đổi vai trò nền tảng đều để lại bản ghi truy được: ai làm, cho ai, căn cứ phiếu nào, lúc nào.
5. Không có đường nào để hệ thống mất hết quản trị viên.

## 2. Quyết định thiết kế

### 2.1 Căn cứ là khóa ngoại tới phiếu M28, không phải chuỗi gõ tay
`M33SystemAccount.accessRequestRef` (sổ tài khoản) là chuỗi tự do — gõ mã không tồn tại vẫn ghi sổ được. Với **phân quyền** thì không chấp nhận được: P28 Phụ lục II điểm 5 xếp "cấp quyền không có phiếu đã phê duyệt" là vi phạm nghiêm trọng, và một ô văn bản không phân biệt được "có phiếu" với "gõ một chuỗi trông giống mã phiếu". Dùng FK `M28AccessRequest.id`, lọc theo `subjectId` của chính người được cấp và trạng thái `DA_PHE_DUYET`/`DA_THUC_HIEN`.

Hệ quả về quy trình, cố ý: muốn cấp quyền thì phải lập phiếu ở M28 trước. Đó đúng là trình tự P28 §6.7.1, không phải thủ tục thừa.

### 2.2 Cấp phải có phiếu; thu hồi thì làm ngay, ghi lý do
Bất đối xứng có chủ đích. Cấp quyền không phiếu là vi phạm (Phụ lục II điểm 5). Nhưng thu hồi thì P28 §6.7.1 đòi làm **trong ngày làm việc** khi chấm dứt hợp đồng hoặc chuyển công tác — bắt phải có phiếu trước mới thu hồi được là dựng rào chắn ngay giữa thứ thủ tục yêu cầu làm ngay. Nên: thu hồi bắt buộc **lý do**, được phép dẫn phiếu, không bắt buộc.

### 2.3 Thu hồi xóa dòng quyền, vết nằm ở bảng riêng
Hai cách: thêm `revokedAt` vào `ModuleRoleAssignment` (mọi nơi đọc phải nhớ lọc), hoặc xóa dòng và ghi vết ở bảng riêng. Chọn cách hai: hơn 20 file `actor.ts` và nhiều `actions.ts` đang đọc bảng này bằng `findFirst`/`findMany` **không có điều kiện lọc**; thêm cột trạng thái là đặt vào mỗi chỗ đó một lỗi chờ xảy ra — quên lọc một chỗ thì quyền đã thu hồi vẫn còn hiệu lực ở đúng chỗ đó, và không có gì báo.

`ModuleRoleAssignment` giữ nghĩa "quyền đang có hiệu lực"; `PlatformAccessAudit` giữ lịch sử.

### 2.4 Vai trò hợp lệ lấy từ bảng nhãn sẵn có của từng module
Mỗi module đã có `Mxx_ROLE_LABEL` (`src/lib/mXX/labels.ts`, 19 module) — đó chính là danh mục vai trò của module đó, đang dùng để hiển thị. Gom lại thành một tra cứu `moduleCode → {mã vai trò: nhãn}` thay vì viết một danh sách thứ hai: hai danh sách thì chúng sẽ lệch nhau, và bên lệch là bên không ai nhìn.

Gõ sai mã vai trò không báo lỗi ở đâu cả — người dùng chỉ thấy mình không có quyền. Nên vai trò phải chọn từ danh mục, không nhập tự do.

### 2.5 Không để hệ thống mất quản trị viên
Ba chốt: ADMIN không tự đổi vai trò nền tảng của chính mình; không hạ vai trò ADMIN cuối cùng còn hiệu lực; không thu hồi được vai trò module của chính mình. Đây không phải quy định của thủ tục mà là điều kiện để thủ tục còn thi hành được — mất hết ADMIN thì không ai thu hồi được tài khoản nữa, tức mất luôn kiểm soát P28 §6.7.1.

## 3. SPEC

### 3.1 Dữ liệu

```prisma
model ModuleRoleAssignment {
  // …giữ nguyên các cột hiện có
  accessRequestId String?           // FK → M28AccessRequest (phiếu F28.04). Nullable vì
  accessRequest   M28AccessRequest? // dữ liệu seed có trước cơ chế này — xem §3.5.
  grantedById     String?
  grantedBy       User?
}

enum PlatformAccessAction {
  CAP_VAI_TRO_MODULE
  THU_HOI_VAI_TRO_MODULE
  DOI_VAI_TRO_NEN_TANG
}

model PlatformAccessAudit {
  id, at, actorId, subjectId, action
  moduleCode      String?  // với vai trò module
  role            String?  // vai trò được cấp/thu hồi, hoặc vai trò nền tảng mới
  previousRole    String?  // vai trò nền tảng cũ
  accessRequestId String?  // phiếu M28 làm căn cứ
  note            String?  // lý do (bắt buộc khi thu hồi)
}
```

Bảng vết **không có** đường sửa hay xóa — chỉ ghi thêm.

### 3.2 Quy tắc (`src/lib/admin-users/rules.ts`, thuần hàm)

| Rule | Nội dung |
|---|---|
| R1 | Chỉ `PlatformRole=ADMIN` thao tác được |
| R2 | Phiếu làm căn cứ phải có `subjectId` đúng người được cấp và trạng thái `DA_PHE_DUYET`/`DA_THUC_HIEN` |
| R3 | Vai trò phải thuộc danh mục vai trò của module đó (§2.4) |
| R4 | Gán trùng (cùng người, module, vai trò) bị chặn |
| R5 | Thu hồi bắt buộc lý do; phiếu tùy chọn (§2.2) |
| R6 | ADMIN không đổi được vai trò nền tảng của chính mình |
| R7 | Không hạ được vai trò của ADMIN cuối cùng còn hiệu lực đăng nhập |
| R8 | Không thu hồi được vai trò module của chính mình |

### 3.3 Giao diện

- `/admin/users` — danh sách: họ tên, email, vai trò nền tảng, trạng thái tài khoản (từ đợt trước), số vai trò module, số quyền **chưa truy được về phiếu**. Phân trang theo `PhanTrang` như trang hàng chờ.
- `/admin/users/[id]` — chi tiết một người: đổi vai trò nền tảng (chọn phiếu), bảng vai trò module (thêm theo module + vai trò + phiếu; thu hồi kèm lý do), lịch sử thao tác quyền.
- Vai trò cấp trước khi có cơ chế này (không có `accessRequestId`) hiển thị nhãn cảnh báo — đúng thứ mà kỳ rà soát 06 tháng của P28 §6.7.1 cần nhìn thấy.
- Mục "Người dùng" trong thanh bên, chỉ hiện với ADMIN. Gate thật nằm ở server, không dựa vào menu.

### 3.4 Acceptance criteria

1. ADMIN gán vai trò `QTHT` cho một người kèm phiếu đã phê duyệt của người đó → `getActor()` của module trả đúng vai trò đó.
2. Chọn phiếu của người khác, hoặc phiếu chưa phê duyệt → `INVALID_TICKET`, không ghi gì.
3. Vai trò ngoài danh mục module → `INVALID_ROLE`.
4. Thu hồi không lý do → `REASON_REQUIRED`; thu hồi có lý do → dòng quyền biến mất, `PlatformAccessAudit` có bản ghi.
5. ADMIN tự đổi vai trò nền tảng của mình → `SELF_CHANGE`; hạ ADMIN cuối → `LAST_ADMIN`.
6. Không phải ADMIN mở `/admin/users` → trang từ chối; gọi thẳng server action → `FORBIDDEN`.
7. Mọi thao tác thành công đều sinh đúng một bản ghi vết với căn cứ kèm theo.

### 3.5 Điểm phải biết

`accessRequestId` nullable ở database. Không thể để `NOT NULL`: dữ liệu seed tạo hàng trăm assignment demo trước khi cơ chế này tồn tại, và lập phiếu M28 giả cho từng dòng chỉ để thỏa ràng buộc là bịa bằng chứng tuân thủ. Ràng buộc "không cấp quyền ngoài phiếu" vì vậy do **tầng ứng dụng** giữ, không phải database — nghĩa là một lần ghi thẳng vào database vẫn lách được. Bù lại bằng cách phơi số quyền không phiếu ra chính trang này thay vì giấu đi.

## 4. PLAN

```
CREATE  src/lib/vai-tro-module.ts, src/lib/admin-users/{rules.ts,actions.ts}
CREATE  src/lib/admin-users/__tests__/rules.test.ts
CREATE  src/app/(platform)/admin/users/{page.tsx,[id]/page.tsx,[id]/UserRolePanel.tsx}
CREATE  prisma/migrations/20260904150000_admin_users_phan_quyen/migration.sql
MODIFY  prisma/schema.prisma, src/components/Sidebar.tsx, src/app/(platform)/layout.tsx
DO NOT MODIFY  src/lib/mXX/actor.ts (không đổi cách đọc quyền — xem §2.3)
```

| # | Increment |
|---|---|
| P1 | Schema + migration |
| P2 | Danh mục vai trò module + rules + test |
| P3 | Server actions |
| P4 | Trang danh sách + trang chi tiết + thanh bên |
| P5 | Verify |

### Risk

| Rủi ro | Mức | Giảm thiểu |
|---|---|---|
| Mất hết ADMIN | HIGH | R6/R7, có test |
| Cấp quyền ngoài phiếu | HIGH | FK + R2; phơi số quyền không phiếu ra giao diện |
| Quên lọc quyền đã thu hồi ở 20 file actor | HIGH | không thêm cột trạng thái — xóa dòng, vết ở bảng riêng (§2.3) |
| Gõ sai mã vai trò ⇒ quyền im lặng không hiệu lực | MEDIUM | chọn từ danh mục sẵn có (§2.4), R3 |
| Migration | LOW | chỉ ADD COLUMN nullable + CREATE TABLE |

### Rollback

`git revert` + migration nghịch (`DROP TABLE PlatformAccessAudit`, `DROP COLUMN`). Quyền đã cấp vẫn còn hiệu lực sau revert vì `ModuleRoleAssignment` không đổi ngữ nghĩa — chỉ mất phần căn cứ và lịch sử.

**Migration trên VPS do người dùng tự chạy** — phiên Claude không truy cập được máy chủ đó.
