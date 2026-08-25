# 20260825-form-dang-ky-nen-tang-cong-cu — Form đăng ký Nền tảng và Công cụ

Tier **S** (2 thành phần giao diện mới + 1 trang sửa; không đổi lược đồ, không đổi ranh giới an ninh).

## RECON

| Loại | Nội dung |
|---|---|
| [FACT] | `actions.ts` đã có `createPlatform`, `createTool`, `createProvider`, `createModel`, `createSkill`, `createAgent` — đủ kiểm quyền (`can(role, …, "write")`) và ghi `AIAuditLog`. |
| [FACT] | **Không thành phần giao diện nào gọi các action đó** (grep toàn `src/app`, `src/components`) — trang `registry` chỉ có nút chuyển trạng thái (`RegistryActions.tsx`). Muốn thêm một nền tảng/công cụ phải sửa `prisma/seed.ts` rồi seed lại. |
| [FACT] | `createTool` đã gọi `validateTool` — `permissionLevel = EXECUTE` bắt buộc `requireConfirmation` hoặc `requireApproval`. |
| [FACT] | `AIPlatform.dataBoundary` mặc định `EXTERNAL_NO_COMMITMENT` (siết nhất) và chỉ đổi được qua `datRanhGioiDuLieu()` dưới quyền `governance:rw`; `approvalStatus` mặc định `DRAFT`. |
| [FACT] | `getAdapter()` rơi về `PlaceholderPlatformAdapter` khi `adapterType` lạ — im lặng, không báo lỗi. |
| [FACT] | `AIPlatform.code` và `AITool.code` là `@unique`; vi phạm trả lỗi Prisma P2002 (thông báo tiếng Anh, dài). |
| [FACT] | Mẫu form đang dùng trong nền tảng: `NewIncidentForm.tsx` — client component, `action={(formData) => …}` + `useTransition` + hiển thị lỗi bằng `e.message`. |
| [FACT] | `AIPlatform.environment` là `String` tự do; ba giá trị đang có trong dữ liệu: `INTERNAL`, `EXTERNAL`, `STAGING`. |

## OUTCOME

**WHO** — AI_ADMIN (đăng ký công cụ), SUPER_ADMIN (đăng ký cả nền tảng lẫn công cụ).

**WHAT** — Đăng ký nền tảng và công cụ ngay trên trang danh mục M29, không phải sửa mã nguồn.

**WHY** — ETV.P29 giao trách nhiệm đăng ký hệ thống AI cho quản trị AI. Khi việc đó chỉ làm được bằng cách sửa `seed.ts`, trách nhiệm trên giấy không thực hiện được trên phần mềm; danh mục sẽ luôn trễ so với thực tế, và mục 5.1.7 (AI chưa đăng ký) trở thành chuyện đương nhiên chứ không phải ngoại lệ.

**SUCCESS CRITERIA**

1. SUPER_ADMIN thấy và dùng được cả hai form; AI_ADMIN chỉ thấy form Công cụ; AI_VIEWER không thấy form nào.
2. Nền tảng tạo ra ở `DRAFT` + `EXTERNAL_NO_COMMITMENT`; hai chốt (vòng đời phê duyệt, ranh giới dữ liệu) không bị đường vòng.
3. Mức Thực thi không có chốt người thì không gửi được form.
4. Trùng mã báo tiếng Việt, không tạo bản ghi.
5. Mỗi lần tạo ghi `AIAuditLog` kèm người và vai trò.
6. `npm run build`, `npx tsc --noEmit`, `npm test` PASS.

## SPEC

### Giao diện

Hai khối `<details>` gập sẵn, đặt ngay trên bảng tương ứng trong `/modules/M29/registry`:

- **`NewPlatformForm`** (hiện khi `platforms:write`) — mã, tên, bộ chuyển đổi (select đọc từ `ADAPTER_TYPES`), môi trường (INTERNAL/EXTERNAL/STAGING), `apiBaseUrl`, `baseUrl`, chủ sở hữu. **Không** phơi `dataBoundary` và `approvalStatus`.
- **`NewToolForm`** (hiện khi `registry:write`) — nền tảng, mã, tên, endpoint, phương thức HTTP, mức rủi ro, quyền tối thiểu, hai ô chốt người.

### Quy tắc nghiệp vụ

| # | Quy tắc | Cưỡng chế ở đâu |
|---|---|---|
| 1 | `EXECUTE` bắt buộc có `requireConfirmation` hoặc `requireApproval` | `rules.ts#validateTool` (**xác thực**) + khóa nút submit ở client (gương) |
| 2 | Mã không trùng | `@unique` ở DB (**xác thực**) + chặn trước ở client, không phân biệt hoa/thường |
| 3 | `adapterType` phải là bộ chuyển đổi có thật | **bổ sung** ở `createPlatform` (trước đây rơi âm thầm về Placeholder) |
| 4 | Nền tảng mới luôn `DRAFT` + ranh giới siết nhất | mặc định lược đồ; form cố ý không phơi hai trường này |
| 5 | Quyền tạo | `can(role, "platforms"/"registry", "write")` ở action; giao diện chỉ ẩn/hiện |

### Không làm trong phạm vi này

Form cho Provider/Model/Skill/Agent; sửa/xóa bản ghi đã có; `inputSchema`/`outputSchema` của Tool (giữ mặc định `{}`).
