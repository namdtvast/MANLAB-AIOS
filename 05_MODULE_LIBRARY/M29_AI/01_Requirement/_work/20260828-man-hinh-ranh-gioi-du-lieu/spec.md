# 20260828-man-hinh-ranh-gioi-du-lieu — Đặt ranh giới dữ liệu của nền tảng trên giao diện

Tier **S** (một màn hình, không đổi lược đồ). Căn cứ: `ETV.P29` §5.5.

Khởi phát từ một phép đo: chạy `npm run danh-gia-copilot -- --chi-truy-hoi` trên bộ 20 câu hỏi
vàng ra **0/20 = 0,0%**. Mọi câu hỏi đều lấy về đúng hai tài liệu giống hệt nhau.

## RECON

| Loại | Nội dung |
|---|---|
| [FACT] | Chỉ mục KHÔNG rỗng: `CopilotDocChunk` có 1865 đoạn / 276 tài liệu — trong đó **1853 đoạn mức Nội bộ, chỉ 12 đoạn mức Công khai**. |
| [FACT] | `retrieve()` áp trần mức bảo mật suy từ `AIPlatform.dataBoundary` của chính nền tảng phục vụ lượt hỏi (`mucBaoMatToiDa`, ETV.P29 §5.5). `EXTERNAL_NO_COMMITMENT` → trần Công khai → chỉ chạm được 12/1865 đoạn. |
| [FACT] | Lược đồ đặt `dataBoundary` mặc định `EXTERNAL_NO_COMMITMENT` (fail-closed), nên **mọi nền tảng đăng ký mới đều nằm ở mức siết nhất**, kể cả máy chủ đặt trong hạ tầng của Viện. |
| [FACT] | `datRanhGioiDuLieu()` đã có ở `actions.ts` và quy tắc đã có ở `copilot/ranh-gioi.ts` (10 ca test), nhưng **không màn hình nào gọi** — giá trị này vừa không đặt được vừa không hiển thị ở đâu. |
| [FACT] | `mucBaoMatToiDa()` nằm trong `copilot/retrieval.ts`, file này import `prisma` nên client component không dùng lại được. |

Chuỗi hệ quả: đăng ký nền tảng nội bộ → mặc định siết nhất → Copilot chỉ đọc 12 đoạn Công khai →
trả lời không dẫn được nguồn → guardrail `GR-NO-SOURCE` chặn → **trông như model kém**. Không có
chỗ nào trên giao diện nói ra mắt xích thật.

## OUTCOME

**WHO** — Quản trị an ninh AI (AI_SECURITY_ADMIN) và SUPER_ADMIN.

**WHAT** — Xem và đặt được ranh giới dữ liệu của từng nền tảng trên trang Danh mục.

**WHY** — Đây là chốt quyết định Copilot đọc tới mức tài liệu nào; không đặt được thì máy chủ mô
hình nội bộ vô dụng dù đã đăng ký, dò sức khoẻ xanh và tác tử đã trỏ đúng.

**SUCCESS CRITERIA**

1. Cột **Ranh giới dữ liệu** hiện nhãn + **hệ quả thực tế** ("Copilot đọc tới mức Công khai/Nội bộ")
   + số hồ sơ nếu có, cho mọi vai trò xem được danh mục.
2. Chỉ `governance:write` mới thấy form đổi; đổi được và ghi `AIAuditLog`.
3. Chọn "Ra ngoài, có cam kết" thì bắt buộc số hồ sơ F29.02 (rule cũ, không sửa).
4. Truy hồi trên bộ câu hỏi vàng phục hồi sau khi đặt đúng ranh giới.

## SPEC

Không đổi lược đồ, không thêm hành động máy chủ — chỉ nối giao diện vào `datRanhGioiDuLieu()` đã có.

| Thành phần | Nội dung |
|---|---|
| `copilot/muc-bao-mat.ts` (mới) | Tách `mucBaoMatToiDa()` + `INDEXABLE_LEVELS` khỏi `retrieval.ts` để client component dùng được mà không kéo Prisma vào bundle. `retrieval.ts` re-export, nơi gọi cũ không đổi import. **Không** nhân đôi phép ánh xạ — hai bản sẽ lệch nhau. |
| `labels.ts` | `DATA_BOUNDARY_LABEL`, `DATA_BOUNDARY_TONE`, `SECURITY_LEVEL_LABEL`. Tông màu **không** xếp "tốt/xấu" theo cảm tính: mức siết nhất an toàn nhất về dữ liệu nhưng lại khiến Copilot đọc được ít nhất. |
| `DataBoundaryForm.tsx` (mới) | Select 3 ranh giới, mỗi lựa chọn nói luôn hệ quả ("→ trần Nội bộ"). Ô số hồ sơ **chỉ hiện** khi chọn `EXTERNAL_WITH_COMMITMENT` — hai trạng thái kia server tự xoá về null, hiện ô là mời gọi điền một giá trị sẽ bị bỏ. |
| `registry/page.tsx` | Cột mới, gác sau `can(role, "governance", "write")` — tách khỏi quyền đăng ký nền tảng. |

## KHÔNG LÀM

- Không sửa quy tắc `kiemTraDatRanhGioi` / `chuanHoaSoHoSo` — đã đúng và đã có test.
- Không cho người đăng ký nền tảng tự đặt ranh giới lúc đăng ký: mặc định fail-closed và chốt
  quyền riêng là chủ đích của ETV.P29 §5.5, không phải thiếu sót.
