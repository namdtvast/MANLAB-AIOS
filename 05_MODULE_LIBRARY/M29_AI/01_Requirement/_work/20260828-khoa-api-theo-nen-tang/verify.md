# VERIFY — 20260828-khoa-api-theo-nen-tang

Chạy 28/08/2026 trên `next dev` + Postgres `aios_platform_dev`, đăng nhập `admin@manlab.vn` (SUPER_ADMIN).

| # | Việc kiểm | Kết quả |
|---|---|---|
| 1 | `npm test` | **460 → 472 ca PASS** (thêm 3 ca adapter, 4 ca `healthErrorLabel`, 6 ca `kiemTraDoiMoHinh` — trừ 1 ca cũ viết lại) |
| 2 | `npx tsc --noEmit` | Sạch |
| 3 | Đăng ký nền tảng với `apiKeyEnv = AUTH_SECRET` | **Bị chặn**: “Tên biến môi trường "AUTH_SECRET" không hợp lệ…”, không tạo bản ghi |
| 4 | Đăng ký lại với `LOCAL_LLM_API_KEY_Q3` | Tạo được, trạng thái `DRAFT`, DB ghi đúng tên biến |
| 5 | Kiểm tra ngay khi **chưa** đặt biến | `lastError = NO_API_KEY:LOCAL_LLM_API_KEY_Q3`; giao diện hiện “Máy chủ AIOS chưa có biến môi trường LOCAL_LLM_API_KEY_Q3 — đặt khoá API vào .env rồi khởi động lại dịch vụ.” |
| 6 | Đặt biến bằng khoá thật của `ai.manlab.vn` rồi dò lại | `HEALTHY` — hai nền tảng cùng adapter, hai biến khác nhau, không giẫm chân nhau |
| 7 | `MANLAB` (máy chủ M10 không chạy) | “Không kết nối được tới máy chủ…”, khác hẳn ca thiếu khoá |
| 8 | Thêm Provider `MANLAB_Q3_DEMO` gắn nền tảng, thêm Model `manlab-ai` | Tạo được cả hai; `GET /v1/models` của máy chủ trả đúng id `manlab-ai` |
| 9 | Thêm lại Model trùng | Bị chặn: “Nhà cung cấp này đã có model "manlab-ai" trong danh mục.” |
| 10 | Đổi mô hình Copilot sang `MANLAB_AI_Q3 / manlab-ai` | Tác tử → **Tạm dừng** (lý do `MODEL_CHANGED`), AIA-2026-003 → **Cần rà soát lại**, audit ghi cả hai |
| 11 | Phê duyệt lại AIA | Tác tử **vẫn tạm dừng** — đúng thiết kế, khác nhánh AIA quá hạn |
| 12 | Bấm "Mở lại tác tử" kèm lý do | Tác tử → Hoạt động |
| 13 | Hỏi Copilot một câu (TC02) | Gọi **thật** máy chủ nội bộ: 1250 token vào / 14 token ra / 1,68 s, trace ghi model `manlab-ai`. Câu trả lời bị guardrail `GR-NO-SOURCE` chặn vì không dẫn được tài liệu nào — hai lượt trên Gemini trước đó **cũng** bị chặn y hệt, nên chưa quy được cho model nội bộ |
| 14 | Bảng Platform xếp theo thao tác mới nhất | `MANLAB_AI_Q3 → GEMINI_API → MANLAB → ANTHROPIC_API → MANLAB_LOCAL_LLM → VICONNECT` — bản ghi vừa đụng tới nằm dòng đầu |
| 15 | Áp cùng cách cho Agent, Provider, Model, Tool, Hạn mức | Bảng Agent: `AGENT_COPILOT_TRACUU` (vừa đổi mô hình) lên đầu. Ô chọn trong các form vẫn xếp theo mã |
| 16 | `python3 _meta/validate_links.py`, `validate_citations.py --chan`, `kiem-tra-hdsd.ts` | PASS |

**Chưa kiểm:** khoá sai (401) chỉ có ca test đơn vị, không dựng được trên máy chủ thật vì không có
khoá hỏng để thử; ca `INVALID_KEY_ENV` phát sinh từ dữ liệu cũ trong DB cũng chỉ có ca test.

**Chất lượng model — chưa kết luận được:** `manlab-ai` chỉ sinh 14 token và không trích dẫn nguồn ở
lượt thử duy nhất. Đó KHÔNG đủ để kết luận model không đạt, vì lượt trên Gemini cũng bị chặn cùng
mã. Kết luận Đạt/Không đạt là việc của người, theo phiếu F29.03 (ETV.P29 §4.8) — chạy bộ đánh giá
đầy đủ trước khi giao việc thật cho mô hình nội bộ.

**Dữ liệu demo đã dọn:** `LLM_Q3_DEMO`, `MANLAB_Q3_DEMO`; Copilot đã trả về nền tảng/model cũ
(GEMINI_API / Gemini 3.5 Flash bậc miễn phí). Bản ghi `MANLAB_AI_Q3` + provider + model `manlab-ai`
do người dùng tự tạo trên bản dev thì giữ nguyên.
