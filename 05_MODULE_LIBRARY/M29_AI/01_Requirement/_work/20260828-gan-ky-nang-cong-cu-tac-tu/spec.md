# 20260828-gan-ky-nang-cong-cu-tac-tu — Gán kỹ năng và công cụ cho tác tử trên giao diện

Tier **M** (thêm quy tắc nghiệp vụ + chuyển trạng thái tác tử/AIA, không đổi lược đồ).
Căn cứ: `ETV.P29` mục 5.4.1, mục 5.8, mục 5.1.3, mục 5.1.4.

Khởi phát từ câu hỏi của chủ sở hữu khi xem trang tác tử *Copilot tra cứu*: "Skills? Tools
(whitelist Tool Gateway)? Làm sao để biết Skills, Tools hoạt động?" — hai khối này hiện chỉ đọc,
và không màn hình nào cho phép đổi.

## RECON

| Loại | Nội dung |
|---|---|
| [FACT] | `updateAgentToolsSkills()` (`actions.ts:344`) đã có, gác `registry:write`, ghi `AIAuditLog` before/after — nhưng **không nơi nào gọi**. Muốn đổi whitelist hiện phải sửa thẳng CSDL. |
| [FACT] | `agent.toolIds` là chốt thật: `gateway.ts:58` bước (5) chặn công cụ ngoài danh sách. `agent.skillIds` **không có nơi tiêu thụ** trong toàn bộ đường chạy — chỉ hiển thị. |
| [FACT] | ETV.P29 mục 5.8 xếp "**nâng mức quyền hành động**" vào **thay đổi lớn**: lập lại AIA + đánh giá chất lượng, LĐV phê duyệt. Cùng ô với "đổi mô hình/nhà cung cấp". |
| [FACT] | Khuôn cho thay đổi lớn đã có sẵn và đã chạy: `kiemTraDoiMoHinh()` (rules.ts, thuần) + `doiMoHinhTacTu()` (actions.ts) → bắt lý do ≥10 ký tự, tạm dừng tác tử, đưa AIA `APPROVED` về `REVIEW_REQUIRED`, không tự mở lại. |
| [FACT] | ETV.P29 mục 5.1.3: tác tử có công cụ mức **Thực thi** ⇒ mức tác động **Cao** ⇒ bắt buộc AIA do LĐV phê duyệt. Mục 5.1.4 đã được chốt ở `validateTool()` lúc **đăng ký công cụ**, không phải lúc gán. |
| [FACT] | `PERMS`: `registry:rw` chỉ `AI_ADMIN` và `SUPER_ADMIN` — khớp vai trò PT.AI (mục 4.2) và ĐMKT "cấu hình … kỹ năng, công cụ **theo quyết định đã phê duyệt**" (mục 4.5). |
| [ASSUMPTION] | Bỏ bớt công cụ, hoặc thêm công cụ mức **không cao hơn** mức đang có, là **thay đổi nhỏ** (mục 5.8 hàng 1): ĐMKT làm, ghi nhật ký, không tạm dừng tác tử. Thủ tục không liệt kê ca này riêng nên suy theo tiêu chí "không ảnh hưởng quyền hành động". |

Mắt xích thật: whitelist là chốt kiểm soát mạnh nhất của M29, nhưng lại là thứ duy nhất **không
sửa được bằng giao diện** — nên trên thực tế nó bất động, và mọi tác tử phải sống với whitelist
lúc seed.

## OUTCOME

**WHO** — Quản trị AI (`AI_ADMIN`) và `SUPER_ADMIN` (`registry:write`).

**WHAT** — Gán/bỏ kỹ năng và công cụ cho một tác tử ngay trên trang chi tiết tác tử, với đúng
nghi thức mà ETV.P29 đòi cho từng loại thay đổi.

**WHY** — Không có màn hình này thì hoặc whitelist bất động, hoặc người ta sửa thẳng CSDL —
đường đó không sinh nhật ký thay đổi, tức là mất luôn mục 5.4.1.

**SUCCESS CRITERIA**

1. Chỉ `registry:write` thấy và dùng được form; vai trò khác vẫn xem được danh sách.
2. Mọi lần đổi sinh `AIAuditLog` ghi **giá trị trước – sau** (mục 5.4.1).
3. Thêm công cụ làm **nâng mức quyền hành động cao nhất** của tác tử ⇒ bắt buộc lý do ≥10 ký tự,
   tác tử chuyển **Tạm dừng**, AIA đang `APPROVED` chuyển **Cần rà soát lại** (mục 5.8).
4. Bỏ công cụ / thêm công cụ mức không cao hơn ⇒ đổi ngay, không tạm dừng, vẫn ghi nhật ký.
5. Không gán được công cụ đang **Vô hiệu hóa** — cổng vốn chặn ở bước (4), gán vào chỉ tạo
   whitelist ảo.
6. Đổi kỹ năng không đụng trạng thái tác tử (kỹ năng không cấp quyền hành động).

## SPEC

Không đổi lược đồ. Không đổi Tool Gateway.

| Thành phần | Nội dung |
|---|---|
| `rules.ts` — `PERMISSION_RANK` | Thứ bậc 4 mức của mục 5.1.4: Đọc 1 < Tính toán 2 < Đề xuất 3 < Thực thi 4. Đây là **thứ bậc nghiệp vụ**, khác `ROLE_RANK`/`TOOL_MIN_ROLE` (ai được gọi) — không dùng lẫn. |
| `rules.ts` — `kiemTraGanCongCu()` | Hàm thuần: nhận whitelist trước/sau, trả lời được đổi hay không và **có phải nâng quyền không**. Không quyết định hệ quả ghi CSDL — đúng ranh giới "rules quyết định, actions ghi". |
| `actions.ts` — `ganCongCuTacTu()` | Gọi rules; nâng quyền thì tạm dừng tác tử (`suspendedReason = TOOL_PERMISSION_RAISED`) + gắn cờ AIA, y hệt nhánh đổi mô hình. **Không** tự mở lại tác tử. |
| `actions.ts` — `ganKyNangTacTu()` | Chỉ cập nhật + ghi nhật ký. |
| `actions.ts` — bỏ `updateAgentToolsSkills()` | Hàm cũ ghi thẳng cả hai trường, **không** qua chốt mục 5.8. Giữ lại là để hở một đường vòng: nâng quyền mà không tạm dừng tác tử. Hàm đang không có nơi gọi nên bỏ hẳn thay vì bọc lại. |
| `labels.ts` — `suspendReasonLabel` | Thêm nhãn cho `TOOL_PERMISSION_RAISED`. |
| `SkillToolPanel.tsx` (mới) | Hai form gập, mở bằng nút "Sửa" như `ModelPanel`. Form công cụ tự tính mức quyền cao nhất của lựa chọn hiện tại và **hiện cảnh báo thay đổi lớn ngay khi người dùng tick**, trước khi bấm lưu; ô lý do chỉ bắt buộc ở nhánh đó. Công cụ Vô hiệu hóa hiện mờ, không tick được. |
| `agents/[id]/page.tsx` | Nạp thêm toàn bộ Skill/Tool khi `registry:write`; giữ nguyên phần hiển thị chỉ-đọc đã có. |

## KHÔNG LÀM

- Không cho gán công cụ ở màn hình Danh mục: whitelist thuộc về **tác tử**, không thuộc công cụ.
- Không tự mở lại tác tử sau khi nâng quyền — mở lại là hành động riêng, có ô lý do để dẫn số
  phiếu F29.03 (giữ nguyên `resumeAgent`).
- Không làm cho `skillIds` có tác dụng lúc chạy (nối kỹ năng vào prompt hoặc vào bộ chọn công cụ).
  Đó là thay đổi hành vi tác tử, phải đi qua AIA — ngoài phạm vi việc này.
