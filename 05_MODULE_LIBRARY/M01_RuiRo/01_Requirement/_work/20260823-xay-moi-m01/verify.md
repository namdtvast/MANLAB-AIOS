# M01_RuiRo — Báo cáo VERIFY (Increment 4)

## Build

- `npx tsc --noEmit` → **PASS** (không lỗi).
- `npx eslint src --max-warnings=0` → **PASS** (không lỗi/cảnh báo).
- `npx prisma migrate dev --name m01_risk_opportunity` → **PASS**, migration
  `20260823011649_m01_risk_opportunity` áp dụng thành công, additive (không sửa bảng
  M10/M21/M29/PlatformModule hiện có).
- `npx tsx prisma/seed.ts` → **PASS**, nạp 3 hồ sơ Rủi ro (Thấp/Cao/Rất cao) + 1 Cơ hội demo + vai
  trò M01 cho 3 tài khoản đã có (nth/ldp/ldv@manlab.vn).

## Sự cố gặp phải + cách xử lý

- **Prisma Client cũ trên dev server đang chạy sẵn** (giống lần M21): sau `prisma migrate dev` +
  `prisma generate`, server Next.js đang chạy vẫn giữ client cũ → lỗi
  `Cannot read properties of undefined (reading 'findMany')` khi mở `/modules/M01`. Xử lý: dừng
  (`preview_stop`) + khởi động lại (`preview_start`) server của chính phiên này — không cần hỏi
  quyền vì là process tự khởi tạo trong phiên.
- **`computer.left_click` với toạ độ từ screenshot đã scale không trúng nút**: `computer.zoom`
  trả về full screenshot 800×563 dù viewport thật 1280×900 → click theo toạ độ ảnh scale bị lệch,
  nút "Gửi soát xét" không kích hoạt (không thấy request POST nào trong `preview_logs`). Khắc
  phục: click theo `ref` từ `read_page` (toạ độ đúng viewport thật) hoặc gọi `.click()` trực tiếp
  qua `javascript_tool` — cả hai đều cho kết quả đúng (xác nhận qua `preview_logs`/`read_network_requests`
  thấy POST 200 thật). Đã dùng `javascript_tool` cho phần còn lại của VERIFY để tăng độ tin cậy.

## VERIFY qua Browser — bằng chứng thật (không suy luận)

Đăng nhập lần lượt 3 tài khoản demo (`nth@manlab.vn`=NV, `ldp@manlab.vn`=TP_QLCL,
`ldv@manlab.vn`=LDV, cùng mật khẩu tài khoản demo), thao tác qua UI thật (không gọi thẳng
Server Action), quan sát qua `get_page_text`/`read_network_requests`/`preview_logs`.

### 1. Luồng Cơ hội đầy đủ (CH-2026-0001) — PASS

`Đang soạn` → (NV) Gửi soát xét → `Đang soát xét` → (TP_QLCL) Soát xét đạt + chọn assignee=NTH +
hạn 31/12/2026 → `Đang xử lý` (reviewedById+approvedById=TP_QLCL, đúng "Đã phê duyệt → Đang xử lý"
gộp 1 bước theo Quyết định phạm vi #1) → (NV=assignee) Nộp bằng chứng → (TP_QLCL≠assignee) Thẩm
xét Đạt → `Hoàn thành`. Nhật ký ghi đủ 5 bước, đúng timestamp/actor/role.

### 2. Luồng Rủi ro mức Rất cao (RR-2026-0003, R=5×4=20) — PASS

Seed sẵn ở `Chờ LĐV quyết định` (đã qua bước soát xét TP_QLCL). Thử **TP_QLCL bấm "LĐV phê
duyệt"** → bị chặn: *"Chỉ LĐV được quyết định ở mức Rủi ro Rất cao."* (đúng gate `canLeaderDecide`).
Đăng nhập LĐV, chọn assignee+hạn, bấm "LĐV phê duyệt" → chuyển `Đang xử lý`, `approvedById=LDV`
(không phải TP_QLCL) — xác nhận đúng nhánh RACI "LĐV chỉ quyết định ở mức Rất cao".

### 3. Gate "bắt buộc chọn người phụ trách" khi phê duyệt — PASS

TP_QLCL bấm "Soát xét đạt" cho CH-2026-0001 khi **chưa chọn** assignee/hạn → bị chặn: *"Phê duyệt
bắt buộc chọn người phụ trách + thời hạn."* — đúng `ASSIGNEE_REQUIRED` trong `txReviewOpp`.

### 4. Gate "Chưa đạt bắt buộc lý do" + không tự đóng hồ sơ (RR-2026-0002, mức Cao) — PASS

NTH nộp bằng chứng → TP_QLCL chọn "Chưa đạt", **không nhập lý do**, bấm "Ghi nhận thẩm xét" → bị
chặn: *"Chưa đạt bắt buộc nhập lý do yêu cầu bổ sung."* Nhập lý do, ghi nhận lại → trạng thái
**vẫn `Đang xử lý`** (không tự đóng), `verifyResult=CHUA_DAT`, lý do lưu vào nhật ký — đúng quy
tắc 6 (DacTa.md): "Chưa đạt → yêu cầu bổ sung, không tự đóng hồ sơ".

### 5. Gate "không tự thẩm xét chính mình" (self-verify forbidden) — PASS (quan sát UI)

Khi đăng nhập NTH (đúng là `assigneeId` của CH-2026-0001/RR-2026-0002) sau khi nộp bằng chứng,
`ActionPanel` **không hiển thị** khối "Thẩm xét kết quả thực hiện" (chỉ TP_QLCL — khác assignee —
mới thấy) — đúng `canVerify`/`canVerifyOpp` (`assigneeId !== u.id`).

### 6. Danh sách M01 hiển thị đúng — PASS

`/modules/M01` hiển thị đủ 3 Rủi ro (badge mức độ đúng màu: Thấp-xanh/Cao-đỏ/Rất cao-đỏ, badge
trạng thái đúng: Hoàn thành-xanh/Đang xử lý-vàng) + 1 Cơ hội (Hoàn thành-xanh), cột R=S×P hiển
thị đúng công thức (`20 (5×4)`, `9 (3×3)`, `2 (1×2)`).

## Regression

```
$ python3 _meta/validate_links.py
Đã kiểm tra 377 link · 38 MP · 38 M · 22 CAP. Vấn đề: 0
```
PASS — không phá vỡ liên kết Hub/Module/Capability nào.

## Điều CHƯA verify (báo cáo rõ, không quy tròn thành "hoàn tất")

- **Không test** trường hợp "Trả lại" (return) ở bước soát xét lẫn LĐV quyết định — logic đã có
  trong `rules.ts` (`REASON_REQUIRED` khi return/reject) nhưng chưa click qua UI thật.
- **Không test** trường hợp `submitRisk`/`submitOpportunity` bị chặn khi thiếu `cause`/
  `controlMeasure`/`severity`/`possibility` (Rủi ro) hay `proposedAction` (Cơ hội) — logic
  `validateRiskForSubmit`/`validateOppForSubmit` đã viết nhưng chưa click qua UI với dữ liệu thiếu.
- **Không test** self-review forbidden (người tạo tự soát xét hồ sơ của mình) qua UI — trong dữ
  liệu demo, TP_QLCL luôn khác NTH (người tạo) nên chưa có tình huống trùng vai để bấm thử.
- Menu **F01.03 Báo cáo** (biểu đồ, xuất PDF/Excel) — ngoài phạm vi Increment này (đã ghi rõ ở
  spec.md).
- 4 "Quyết định phạm vi" trong spec.md (trạng thái `Đã phê duyệt` không persist riêng, state mới
  `PENDING_LEADER_APPROVAL`, không mô hình hoá tranh chấp thẩm xét khác người, để dashboard Phụ
  lục B ngoài phạm vi) — **chưa được LĐP xác nhận chính thức**, chỉ là suy luận hợp lý từ đọc lại
  `ETV.P01` mục 6.1/Phụ lục A khi thiết kế state machine.

## Kết luận

Đủ bằng chứng thật (không suy luận "Build PASS → chức năng đúng") cho: state machine 2 loại
entity (Rủi ro có nhánh Rất cao/LĐV, Cơ hội rút gọn), 4 gate nghiệp vụ chính, UI hiển thị đúng.
Tier M — không thuộc Tier L, không đụng authentication/tenant isolation/hạ tầng production.
