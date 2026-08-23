# Implementation Plan — 20260823-menu-phan-quyen-manlab

Kế hoạch hiện thực hóa [spec.md](spec.md). Tier **L** → bắt buộc có phân tích rủi ro và đường
lùi thật cho từng bước. **Chưa được thực thi** — chờ chốt 5 điểm ở spec §13 (đặc biệt Q1, Q3)
trước khi bắt đầu Increment 2 trở đi.

## Nguyên tắc xuyên suốt

1. **Expand → migrate → contract.** Mọi cột/bảng mới đều `nullable` hoặc có mặc định; không có
   bước nào vừa thêm vừa xóa trong cùng một lần phát hành.
2. **Cờ tính năng `PERMISSION_V2`.** Toàn bộ chuỗi kiểm soát mới chạy sau một cờ. Tắt cờ →
   nền tảng trở về hành vi hiện tại (sidebar đầy đủ, guard cũ của từng module vẫn nguyên).
3. **Không đụng `rules.ts` nghiệp vụ ở các increment đầu.** Quy tắc nghiệp vụ của 10 module
   đang chạy là bản authoritative; chỉ được rút gọn về hàm dùng chung khi lớp mới đã chạy
   song song và chứng minh cho cùng kết quả.
4. Mỗi increment revert được độc lập bằng một lần `git revert` + một migration lùi.

## Increment 1 — Khung menu theo nhóm (chưa đụng phân quyền)

- Thêm `menu_group` + thứ tự vào `manifest.yaml` của 38 MPxx (`schema` → `manlab-aios/process@1.1`),
  cập nhật `_meta/SCHEMA.md`.
- `PlatformModule` `+menuGroup`, `+menuOrder`; `seed.ts` đọc từ manifest (không hardcode).
- `Sidebar.tsx`: nhóm 38 module thành 8 nhóm, thêm mục "Việc của tôi" (rỗng ở bước này).
- **Chưa lọc gì theo quyền** — mọi người vẫn thấy đủ 38 module như hiện tại.
- Rủi ro: thấp. Đường lùi: revert commit; cột mới không ai đọc thì vô hại.
- Verify: `npm run build` sạch · `python3 _meta/validate_links.py` PASS · đăng nhập thật, đối
  chiếu đủ 38 module, mỗi module đúng một nhóm.

## Increment 2 — Danh mục vai trò và ma trận quyền (chỉ dữ liệu, chưa cưỡng chế)

- Thêm `RoleCatalog`, `PermissionGrant`; seed khuôn quyền chuẩn (spec §6) cho 10 module đang
  chạy, khai ngoại lệ của từng module.
- Thêm cột `+organizationId/+validFrom/+validTo/+grantedById/+reason` (nullable) vào
  `ModuleRoleAssignment`.
- Trang "Danh mục vai trò" và "Ma trận quyền" (chỉ đọc) trong nhóm `QUAN_TRI`.
- **Chưa** dùng ma trận này để chặn bất cứ điều gì — chạy ở chế độ đối chiếu: ghi nhật ký
  "quyết định cũ vs quyết định mới" mỗi lần một module thực hiện hành động, để phát hiện lệch
  trước khi cưỡng chế.
- Phụ thuộc: chốt Q1 (mã quản trị tối cao) — nếu không chốt, `RoleCatalog` sẽ phải sửa dữ liệu
  sau khi đã seed.
- Rủi ro: trung bình (thêm bảng, chưa đổi hành vi). Đường lùi: tắt trang quản trị + revert migration.
- Verify: đối chiếu 0 lệch trên toàn bộ luồng thật của 10 module trước khi sang Increment 3.

## Increment 3 — Cưỡng chế quyền và sinh menu theo quyền (sau cờ `PERMISSION_V2`)

- Hàm tính quyền một lần cho mỗi request; menu resolver lọc module theo quyền (spec §2.3).
- Cổng route (lớp 2) và cổng hành động (lớp 3) của spec §9.
- Hàm tách vai trò dùng chung (R-SoD-1); các module **gọi lại** thay vì chép — làm lần lượt,
  mỗi module một commit, đối chiếu hành vi trước/sau.
- Trang "Bản đồ 38 module" giữ nguyên registry đầy đủ cho quản trị và đoàn đánh giá.
- Rủi ro: **cao** — sai một điều kiện là người dùng thật mất quyền giữa ca làm việc.
  Đường lùi: tắt cờ `PERMISSION_V2` (hiệu lực ngay, không cần phát hành lại).
- Verify: chạy đủ AC-01 → AC-06, AC-13, AC-14 trên trình duyệt thật với ít nhất 5 tài khoản
  khác vai trò; ghi lại lệnh/ảnh chụp làm bằng chứng.

## Increment 4 — Phạm vi dữ liệu và che trường

- Dịch phạm vi thành mệnh đề `where` (lớp 4); che trường nhạy cảm ở server (lớp 5).
- Phụ thuộc: chốt Q3 — `BO_PHAN` cần `OrgUnit` thật. Nếu Q3 chưa chốt thì **không** làm
  `BO_PHAN` trong increment này; các phạm vi còn lại vẫn triển khai được.
- Rủi ro: cao (di trú dữ liệu `department` chuỗi tự do → `OrgUnit`). Là bước có khả năng mất
  liên kết dữ liệu → **phải xin phê duyệt trước khi chạy**, không tự thực hiện.
- Verify: AC-10, AC-11.

## Increment 5 — Nhật ký nền tảng và vòng đời cấp quyền

- `PlatformAuditLog` + `RoleAssignmentRequest`; chặn gán vai trò tùy ý; vai trò hết hạn tự vô hiệu.
- Chặn cấp `APPROVE`/`PUBLISH`/`REVOKE` cho tài khoản dịch vụ AI ngay tại màn hình cấp quyền (R-SoD-3).
- Rủi ro: trung bình. Đường lùi: revert; nhật ký chỉ ghi thêm, không sửa dữ liệu cũ.
- Verify: AC-07, AC-08, AC-09, AC-12.

## Increment 6 (tùy chọn, phụ thuộc Q4) — Đa tổ chức

- `Organization`, `Membership`, phạm vi `LIEN_QUAN`/`NGANH`/`PLATFORM_CONG_KHAI` theo M36 §5.
- Chỉ làm khi Q2 và Q4 đã được chủ sở hữu nghiệp vụ chốt. Đây là thay đổi ranh giới cách ly
  dữ liệu giữa các tổ chức → thuộc diện STOP theo mục 12 của SKILL.md.

## Ma trận rủi ro

| Rủi ro | Mức | Giảm thiểu |
|---|---|---|
| Người dùng thật mất quyền sau khi bật cưỡng chế | Cao | Chế độ đối chiếu ở Increment 2 + cờ tắt được ngay |
| Ma trận quyền lệch so với `rules.ts` của module | Cao | Nhật ký đối chiếu "cũ vs mới", yêu cầu 0 lệch trước khi cưỡng chế |
| Di trú `department` → `OrgUnit` làm mất liên kết hồ sơ nhân sự | Cao | Tách riêng PR, xin phê duyệt, sao lưu trước, giữ cột cũ đến khi đối chiếu xong |
| Sửa `manifest.yaml` 38 MPxx làm hỏng link/CI | Trung bình | `validate_links.py` chạy trong CI mỗi push; chỉ thêm khóa, không đổi khóa cũ |
| Vocabulary vai trò chốt sai (Q1) rồi phải sửa dữ liệu đã seed | Trung bình | Chốt Q1 **trước** Increment 2 |
| Menu bị coi là biện pháp bảo vệ | Trung bình | AC-02/AC-03 kiểm tra bằng cách bỏ qua UI hoàn toàn |

## Điều kiện dừng

Dừng và hỏi lại nếu: Q1–Q5 chưa chốt mà công việc chạm đúng phần đó · phát hiện quy tắc nghiệp
vụ trong `rules.ts` mâu thuẫn với khuôn quyền chuẩn (spec §6) · bước di trú có khả năng mất dữ
liệu · yêu cầu mở quyền cho đối tượng ngoài ETV.
