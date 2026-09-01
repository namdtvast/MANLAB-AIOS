# Verify — F29.01 phần 1 nhập được trên M29

Ngày 01/09/2026 · nhánh `claude/etvpf-29-01-data-update-5319ae` · Tier M

Môi trường đo: worktree riêng, CSDL riêng `aios_wt_f2901` (KHÔNG dùng `aios_platform_dev` để migration
thử nghiệm không đụng dữ liệu dev), `npx prisma migrate deploy` + `npx tsx prisma/seed.ts` chạy sạch từ
CSDL trắng, dev server Next 16 trên cổng 3000, đăng nhập thật bằng tài khoản demo.

## Kết quả

| # | Điều kiện nghiệm thu | Kết quả | Bằng chứng |
|---|---|---|---|
| AC-1 | `AI_ADMIN` đăng ký được hệ thống AI mới từ `/modules/M29/registry` | **PASS** | Đăng ký `AGENT_SOAT_HOSO` qua giao diện; `psql` trả `approvalStatus = DRAFT`, `systemGroup = DOCUMENT_PROCESSING`, `acquisition = SUBSCRIBED`, `technicalContact = "Nguyễn Văn A — Tổ CNTT"`, `reviewCycle = ONE_YEAR`; `AIAuditLog` có dòng `create` với actor `Dương Thành Nam (AI_ADMIN)` |
| AC-2 | Dữ liệu cá nhân + mức Trung bình bị chặn | **PASS** | Form hiện "Có xử lý dữ liệu cá nhân thì mức tác động bắt buộc là Cao (ETV.P29 mục 5.1.3)", nút gửi `disabled` |
| AC-3 | Mức Cao + chu kỳ 01 năm bị chặn | **PASS** | Form hiện "Mức tác động Cao bắt buộc rà soát ≤ 06 tháng (ETV.P29 mục 5.1.3)", nút gửi `disabled`; đổi về ≤ 06 tháng thì mở lại |
| AC-4 | Ô chọn nền tảng chỉ liệt kê nền tảng đang hiệu lực | **PASS** | 4/5 nền tảng hiện ra; `MANLAB_LOCAL_LLM` (Nháp) không có trong danh sách |
| AC-5 | Người lập không tự soát xét được | **PASS** | Cùng tài khoản `ai-admin` bấm "Soát xét đạt" → "Người lập bản ghi không tự soát xét được bản ghi của mình (ETV.P29 mục 4.8)…", trạng thái giữ nguyên Chờ soát xét |
| AC-6 | `npm test` · `lint` · `build` · `kiem-tra-hdsd` xanh | **PASS** | 532/532 test; lint 0 error (2 warning có sẵn ở `seed.ts:2683,2691`, ngoài vùng sửa); build `Compiled successfully`, 90/90 trang; HDSD M29 hợp lệ 14 bước |

## Kiểm thêm ngoài danh sách nghiệm thu

| Việc kiểm | Kết quả | Bằng chứng |
|---|---|---|
| Vòng đời đủ vòng (mục 6.1) | **PASS** | Nháp → Chờ soát xét (ai-admin) → Chờ phê duyệt (admin soát xét) → Đã phê duyệt (admin); `approvedBy` được ghi; 4 dòng `AIAuditLog` đúng thứ tự |
| Thẩm quyền phê duyệt | **PASS** | `AI_ADMIN` gọi `approve` → "Không đủ quyền truy cập tài nguyên này.", trạng thái giữ nguyên |
| Không hiện nút cho người không có thẩm quyền | **PASS sau khi sửa** | Lượt đo đầu: nút "Phê duyệt"/"Từ chối" vẫn hiện cho `AI_ADMIN` rồi mới bị máy chủ từ chối — mời gọi thao tác sai. Đã thêm chốt hiển thị; đo lại: `AI_ADMIN` thấy dòng chữ "Chờ Lãnh đạo Viện phê duyệt", không còn nút |
| Chặn đóng hồ sơ khi tác tử còn chạy | **PASS** | `admin` cho `AGENT_TROLY_M29` (Đã phê duyệt + Hoạt động) hết hiệu lực → "Tác tử còn đang Hoạt động — dừng vận hành (Vô hiệu hóa) trước…", trạng thái giữ nguyên |
| Migration cộng thêm, không phá dữ liệu | **PASS** | `migrate deploy` áp sạch; 3 tác tử seed sẵn có nhận `approvalStatus = APPROVED`, `reviewCycle = ONE_YEAR` đúng mức tác động Trung bình |
| Bộ kiểm toàn vẹn repo | **PASS** | `validate_links.py`: 617 link · 0 vấn đề. `validate_citations.py --chan`: 1051 trích dẫn · 0 hỏng. `validate_forms.py`: số liệu y nguyên trước/sau (không đụng `02_P/` hay `manifest.yaml` nào) |

## Điều chưa verify / giới hạn còn lại

1. **Tool Gateway vẫn chưa đọc `approvalStatus`** — NOT RUN vì chưa làm. Tác tử vừa đăng ký hiện ra ở
   cột Vận hành là "Hoạt động" (mặc định `AIOpStatus`) trong khi hồ sơ mới ở Nháp. Nó **không chạy được
   thật**: cổng AIA (`gateway.ts:65`) chặn mọi lời gọi thay mặt tác tử chưa có AIA `APPROVED`, và
   `AGENT_SOAT_HOSO` chưa có hồ sơ AIA nào. Nhưng nhãn "Hoạt động" ở đó vẫn dễ đọc nhầm — việc kế tiếp
   là gắn `approvalStatus` vào cổng, phải đo trên dữ liệu thật trước vì Copilot đang chạy qua đúng cổng đó.
2. **Chưa có test cho `actions.ts`** — hai chốt mới (`SELF_REVIEW`, `AGENT_STILL_ACTIVE`) và phân quyền
   theo bước chỉ được verify bằng thao tác thật trên trình duyệt, chưa có test tự động. Cùng khoảng trống
   đã ghi từ Increment 4: bộ test hiện chỉ phủ `rules.ts`/`gateway.ts`/`model.ts`, không phủ server action.
3. **Chưa migrate CSDL thật** — migration mới chỉ chạy trên CSDL dev của worktree. Bản triển khai do
   người dùng tự chạy trên VPS.
4. **Chưa có route xuất biểu mẫu F29.01** — dữ liệu đã đủ để xuất phần 1, nhưng việc sinh PDF theo khuôn
   `api/m03/export/f03-08` chưa làm.
