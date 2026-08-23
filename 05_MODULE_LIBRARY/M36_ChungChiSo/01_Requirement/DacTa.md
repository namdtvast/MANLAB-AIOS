# M36 — Đặc tả yêu cầu

## 1. Phạm vi
Quản lý chứng chỉ đo lường số (DCC/DVC/DTC) từ khi tạo đến khi hết hiệu lực, phục vụ 3 bên:
tổ chức đo lường (ETV) — khách hàng — cơ quan quản lý.

## 2. Trường dữ liệu bắt buộc

| Nhóm | Trường | Ghi chú |
|---|---|---|
| Định danh | `cert_no` (số chứng chỉ, **duy nhất**) | sinh theo quy tắc của Viện |
| | `cert_type` | DCC / DVC / DTC |
| | `version` | phiên bản; tăng khi thay thế |
| Đối tượng | `instrument_id` | định danh phương tiện đo/đối tượng đo |
| | `customer_id` | khách hàng/chủ sở hữu |
| | `organization_id` | tổ chức thực hiện (ETV) |
| Kỹ thuật | `method_id` | phương pháp/quy trình áp dụng (← M08) |
| | `reference_standard_id[]` | chuẩn/chất chuẩn sử dụng (← M05) |
| | `results[]` | kết quả đo có cấu trúc: đại lượng, giá trị, đơn vị |
| | `uncertainty` | **độ không đảm bảo đo** (bắt buộc với kết quả định lượng) |
| | `decision_rule` | quy tắc quyết định & tuyên bố phù hợp (← M18) nếu có |
| Thời gian | `issued_date`, `valid_until` | ngày phát hành, hạn hiệu lực |
| Kiểm soát | `status`, `prepared_by`, `reviewed_by`, `approved_by`, `signature_id`, `qr_token` | |

## 3. Quy tắc nghiệp vụ (control rules)
1. `cert_no` duy nhất toàn hệ thống; không trùng kể cả với chứng chỉ đã hủy.
2. Không cho chuyển sang **Chờ phê duyệt** nếu thiếu `results` hoặc thiếu `uncertainty` (với phép định lượng).
3. **Không soát xét** / **Không phê duyệt** bắt buộc nhập `reason`.
4. Sau **Đã phát hành**, mọi thay đổi phải tạo **phiên bản mới** hoặc **chứng chỉ thay thế** (liên kết `replaces`).
5. **Cấp lại GCN**: thêm hậu tố `R` vào `cert_no`; chứng chỉ cũ mất hiệu lực pháp lý (đồng bộ MP11).
6. **Thu hồi/Hủy**: chỉ LĐP/LĐV; bắt buộc `reason`; chứng chỉ rời khỏi tra cứu công khai.
7. Chỉ trạng thái **Đã ký số/Đã phát hành** mới hiển thị qua `GET /public/verify`.
8. AI Agent (← M29) chỉ gắn cờ cảnh báo (bất thường, thiếu/không nhất quán dữ liệu); **không** đổi trạng thái phê duyệt.

## 4. Truy xuất nguồn gốc
Chuỗi truy xuất: nguyên liệu/chuẩn (M05) → phương pháp (M08) → kết quả (M11) → quyết định (M18)
→ chứng chỉ (M36) → phân phối (M20) → hồ sơ lưu (M15) → audit (M16).

## 5. Phân quyền đa tổ chức

Mục 1 đã xác định M36 phục vụ 3 bên (tổ chức đo lường — khách hàng — cơ quan quản lý). Mục
này đặc tả cơ chế phân quyền cụ thể để nền tảng vận hành được cho **nhiều Tổ chức đo lường
độc lập** (không riêng ETV), không chỉ 1 tổ chức như hiện trạng ngầm định ở Mục 2-4. Đây là
mô hình dùng chung cho `Certificate` của M36; các module khác (M03, M05, M07, M08, M10...) áp
dụng lại Role/DataScope ở mục này qua liên kết trong `links.yaml`, không định nghĩa lại.

### 5.1 Mô hình đối tượng
```
User → Membership (User↔Organization, mang Role riêng từng nơi)
     → Organization (org_type: PTD | TCDL | QLNN | BEN_LIEN_QUAN — trường mới, xem 5.7)
     → Role → Permission ("resource.action") → DataScope → Resource (Certificate là resource
       chính của M36; `customer_id` = tổ chức PTD liên quan, `organization_id` = tổ chức TCDL
       thực hiện — 2 trường này đã có sẵn ở Mục 2, chính là cơ sở của DataScope `LIEN_QUAN`).
```
Khác với thiết kế 1-tổ-chức hiện nay: **không được suy luận "tổ chức thực hiện = ETV"** trong
code — mọi kiểm tra quyền phải so `organization_id`/`customer_id` của `Certificate` với tổ
chức hiện tại của người dùng (lấy từ session/Membership, không tin giá trị client gửi).

### 5.2 Danh mục Role theo nhóm (áp dụng cho quyền trên `Certificate`)

| Nhóm tổ chức | Role | Quyền trên `Certificate` |
|---|---|---|
| **PTD** — chủ sở hữu phương tiện đo (`customer_id`) | `PTD_ADMIN` | Xem mọi `Certificate` có `customer_id` = tổ chức mình (mọi trạng thái đã phát hành trở lên) |
| | `PTD_NHANVIEN` | Chỉ xem `Certificate` **Đã phát hành** của tổ chức mình |
| **TCDL** — tổ chức đo lường (`organization_id`), giữ nguyên vai trò kỹ thuật đã có ở Mục 2-4 nhưng tách theo tổ chức | `TCDL_KYTHUATVIEN` (Người lập — `prepared_by`) | `certificate.create`/`.update` khi trạng thái Nháp/Không soát xét/Không phê duyệt, chỉ với `organization_id` = tổ chức mình |
| | `TCDL_SOATXET` (Người soát xét — `reviewed_by`) | `certificate.review` |
| | `TCDL_PHEDUYET` (Người phê duyệt — `approved_by`) | `certificate.approve` |
| | `TCDL_KY` (Người ký) | `certificate.sign` |
| | `TCDL_PHATHANH` (Người phát hành) | `certificate.publish` |
| | `TCDL_ADMIN` (gồm LĐP/LĐV — mã đã dùng ở Mục 3, quy tắc 6) | `certificate.revoke`/`.cancel` (bắt buộc `reason`, Mục 3 quy tắc 6), quản trị nhân sự/role nội bộ tổ chức mình |
| **QLNN** — cơ quan quản lý nhà nước | `QLNN_GIAMSAT` | Chỉ số liệu **tổng hợp** (đếm/tỷ lệ) `Certificate` theo phạm vi quản lý — **không** đọc `results`/`uncertainty` chi tiết của từng chứng chỉ |
| | `QLNN_THANHTRA` | Xem chi tiết 1 `Certificate` cụ thể — chỉ khi có quyết định thanh tra, cấp quyền tạm thời (`valid_from`/`valid_to`/`approved_by`/`reason`), ghi `AuditLog` riêng loại `INSPECTION_ACCESS` |
| **BEN_LIEN_QUAN / Cộng đồng** | `GUEST` (không cần đăng nhập) | `certificate.verify` qua `qr_token` — chỉ trạng thái **Đã ký số/Đã phát hành** (đã có ở Mục 3 quy tắc 7), chỉ trường công khai (không `results` thô, không `uncertainty` chi tiết, không thông tin liên hệ khách hàng) |
| **SYS** — quản trị nền tảng | `SUPERADMIN` | Toàn quyền — **MUST** tách biệt khỏi mọi role `TCDL_*` của ETV, kể cả khi ETV vừa là đơn vị vận hành nền tảng vừa là 1 TCDL tham gia (tránh xung đột lợi ích) |
| | `AI_AGENT` (← M29) | Chỉ `certificate.flag_anomaly` — giữ nguyên Mục 3 quy tắc 8, **MUST không** được cấp `.approve`/`.sign`/`.publish`/`.revoke` dưới bất kỳ hình thức nào (kể cả gián tiếp qua service account quyền cao) |

### 5.3 Data Scope

| Scope | Ý nghĩa |
|---|---|
| `OWN` | Bản ghi do chính user tạo |
| `ORGANIZATION` | Toàn bộ `Certificate` có `organization_id` (TCDL) hoặc `customer_id` (PTD) = tổ chức của user |
| `LIEN_QUAN` | Đúng 1 `Certificate` bắc cầu 2 tổ chức (`customer_id` + `organization_id`) — cả PTD lẫn TCDL liên quan đều thấy đúng bản ghi đó, không thấy bản ghi khác của nhau |
| `NGANH` | QLNN — tổng hợp xuyên toàn bộ TCDL trong phạm vi quản lý, chỉ số liệu đếm/thống kê |
| `NGANH_CHI_TIET` | QLNN thanh tra — chi tiết 1 `Certificate`, có thời hạn, có `AuditLog` riêng |
| `PLATFORM` | Toàn hệ thống — chỉ `SUPERADMIN` |
| `PLATFORM_CONG_KHAI` | Toàn hệ thống nhưng chỉ bản ghi **Đã ký số/Đã phát hành** — dùng cho `GUEST` |

### 5.4 Nguyên tắc tách vai trò (Segregation of Duties) — MUST
1. `prepared_by ≠ reviewed_by ≠ approved_by` trên cùng 1 `Certificate` — cùng tinh thần
   `canReview`/`canApprove` đã hiện thực ở `M10_DamBaoKQ/08_Source/api/rules.mjs`, áp dụng
   nguyên mẫu cho M36 khi hiện thực hóa.
2. Không TCDL nào được đọc `results`/`uncertainty`/thông tin liên hệ khách hàng của
   `Certificate` có `organization_id` khác tổ chức mình — kể cả `SUPERADMIN` chỉ đọc vì lý do
   vận hành nền tảng, và bắt buộc ghi `AuditLog` loại `CROSS_ORG_ACCESS`.
3. `SUPERADMIN` ⊗ `TCDL_*`: không gộp vai trò vận hành nền tảng với vai trò của một TCDL cụ
   thể trên cùng 1 tài khoản.

### 5.5 Action chuẩn (`resource.action`) cho `Certificate`
`certificate.create`, `.update`, `.review`, `.approve`, `.sign`, `.publish`, `.revoke`,
`.cancel`, `.supersede`, `.verify` (public, không cần Permission), `.flag_anomaly` (AI only) —
ánh xạ 1-1 vào 12 trạng thái đã có ở `07_Workflow/StateMachine.md`, không thêm trạng thái mới.

### 5.6 Điểm chưa chốt — cần bổ sung/xác nhận trước khi code hóa
1. `Organization` cần thêm trường `org_type` (`PTD`/`TCDL`/`QLNN`/`BEN_LIEN_QUAN`) — chưa có ở
   `03_Database/DataModel.md`, cần bổ sung khi hiện thực hóa (không tự sửa ở đặc tả này).
2. "Yêu cầu dịch vụ KĐ/HC/TN" (PTD gửi yêu cầu tới TCDL) nằm **trước** vòng đời `Certificate`
   (M36 bắt đầu từ khi có kết quả đo) — chưa có MPxx/Mxx nào phủ; đây là gap thật, cần Product
   Owner xác nhận mở capability mới hay gộp vào quy trình hiện có, không tự đặt số ở đây.
3. Nguồn dữ liệu tổng hợp cho `QLNN_GIAMSAT` (scope `NGANH`) đọc xuyên nhiều TCDL — hiện chưa
   có Mxx nào tổng hợp cross-organization; cần xác nhận trước khi thiết kế API thống kê.
