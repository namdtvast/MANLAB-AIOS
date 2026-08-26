# Implementation Plan — 20260825-copilot-tra-cuu

Kế hoạch hiện thực hóa [spec.md](spec.md). Mỗi increment phải **dùng được ngay** khi xong và
**tắt được ngay** nếu có vấn đề.

> **Trạng thái (cập nhật 25/08/2026):** Increment 1–4 đã hiện thực hóa và kiểm chứng —
> [verify.md](verify.md),
> trong đó có mục *Sai khác so với đặc tả* (4 điểm) và mục *Chưa verify được* (7 điểm).
> Increment 5 (bộ đánh giá 30 ca + mở cho toàn Viện) **chưa làm**.

## Nguyên tắc xuyên suốt

1. Hồ sơ quản trị đi **trước** tính năng: chưa có AIA duyệt thì không có lượt gọi API nào ra ngoài.
2. Mọi lượt gọi mô hình đi qua `gateway.chat()`. Không có ngoại lệ "tạm thời để test".
3. Không sửa 7 bước kiểm tra hiện có của `callTool()` — chỉ dùng lại.
4. Mỗi increment kết thúc bằng một `verify.md` có bằng chứng chạy thật, không phải mô tả suy đoán.

---

## Increment 1 — Hồ sơ quản trị Copilot (chưa có tính năng nào cho người dùng)

- Q2 và Q4 đã đóng bằng dẫn chiếu ETV.P29 §4.1/§9. Còn lại: **rà mức bảo mật 84 SOP `03_MANAGEMENT_SYSTEM/03_M`** (Q1) và **LĐV ấn định hạn mức chi phí** (Q3, khai trong F29.01).
- Cập nhật `05_MODULE_LIBRARY/M29_AI/01_Requirement/DacTa.md`: Copilot là AI system trong phạm vi M29.
- Khai dữ liệu trong registry M29 (qua seed, không nhập tay): `AIProvider` Anthropic → `AIModel` → `AIPrompt` + `AIPromptVersion` (nội dung prompt hệ thống, trạng thái duyệt) → `AIAgent` mã `COPILOT` (chưa `ACTIVE`).
- Lập `AIImpactAssessment` cho Copilot, đưa qua luồng soát xét → phê duyệt theo ETV.P29.
- Khai `AIPolicy` (hạn mức chi phí, đối tượng dùng) và 3 `AIGuardrail` của spec §6 ở trạng thái duyệt.

**Xong khi:** M29 → Danh mục hiện Copilot với AIA `APPROVED`; chưa ai gọi được vì chưa có adapter.

## Increment 2 — Adapter + `gateway.chat()` (chưa có UI)

- `AnthropicAdapter` trong `src/lib/m29/adapters.ts` (thêm `chat()` tùy chọn vào interface).
- `chat()` trong `src/lib/m29/gateway.ts`: kiểm tra Agent `ACTIVE` + AIA `APPROVED` + hạn mức, gọi adapter, ghi `AIRequest` đầy đủ token/latency.
- Biến môi trường `ANTHROPIC_API_KEY` + `.env.example`; bản ghi `AISecret` (masked) tương ứng.
- Kiểm thử `vitest` cho: thiếu AIA ⇒ chặn; Agent suspended ⇒ chặn; lượt lỗi vẫn ghi trace.

**Xong khi:** chạy được một lượt hỏi từ test/script và thấy nó xuất hiện ở trang Traces + Usage với chi phí đúng.

## Increment 3 — Chỉ mục tri thức và truy hồi có trích dẫn

- Script nạp chỉ mục full-text (tái dùng phép quét của `_meta/build_site.py`); chỉ nạp `mức ∈ {Công khai, Nội bộ}` **và** `doc_status = issued` theo ETV.P29 §5.5, thiếu mức ⇒ bỏ qua.
- Hàm truy hồi trả về trích đoạn **kèm đường dẫn repo**; prompt dựng theo spec §3 bước 6.
- Cưỡng chế `GR-NO-SOURCE`: đầu ra không có nguồn ⇒ thay bằng câu từ chối.

**Xong khi:** hỏi qua script, nhận câu trả lời kèm đường dẫn mở được.

## Increment 4 — Giao diện Copilot

- Khay Copilot gắn ở `src/app/(platform)/layout.tsx`, biết module đang mở qua route, có streaming.
- 2 bảng `CopilotThread`/`CopilotMessage` + migration.
- Nhãn "Nội dung do AI tạo…" và danh sách nguồn bấm được ở mỗi câu trả lời.
- Lỗi Copilot khu trú, không làm hỏng trang đang mở.

**Xong khi:** người dùng thật hỏi được từ bất kỳ trang nào; `AI_ADMIN` tắt Agent là khay ngừng trả lời ngay.

## Increment 5 — Đánh giá và mở cho người dùng

- `AIEvaluationSuite` ≥30 ca theo spec §11, chạy và lưu `AIEvaluationRun`.
- Đạt ngưỡng (≥90% dẫn đúng nguồn, 100% từ chối đúng ở câu bẫy) mới bật cờ cho toàn Viện.
- Tài liệu hướng dẫn ngắn cho người dùng + mục trong README nền tảng.

## Ma trận rủi ro

| Rủi ro | Mức | Giảm thiểu |
|---|---|---|
| Tài liệu Hạn chế/Mật lọt ra ngoài qua ngữ cảnh prompt | **Cao** | Lọc theo mức bảo mật **trước** khi dựng prompt (E1–E6); guardrail PII; Increment 3 không chạm bảng nghiệp vụ nào. Nếu xảy ra: gỡ ngay + sự cố theo ETV.P28 §6.8 + KPH theo ETV.P13 |
| Copilot bịa căn cứ, người dùng dùng nhầm vào hồ sơ ISO | **Cao** | Bắt buộc trích dẫn; `GR-NO-SOURCE`; 10 câu bẫy trong eval; nhãn cảnh báo cố định |
| Bỏ qua Gateway để "làm nhanh" | **Cao** | AC-08 kiểm bằng grep trong verify; review PR chặn |
| Chi phí API vượt dự toán | Trung bình | `AIPolicy` hạn mức + kiểm tra trước mỗi lượt + trang Usage |
| Khóa API rò qua commit | Trung bình | Chỉ ở env, `.gitignore` sẵn có, `AISecret` chỉ masked |
| Full-text không đủ tốt cho câu hỏi diễn đạt tự do | Trung bình | Eval đo được; nâng cấp truy hồi là Increment 6 tùy chọn, không chặn phần còn lại |

## Điều kiện dừng

Dừng và báo cáo nếu: AIA không được phê duyệt, mức bảo mật chưa được gán đủ cho lớp tài liệu định nạp, nhà cung cấp mô hình không bảo đảm điều khoản không huấn luyện lại (ETV.P29 §5.5), hoặc eval ở Increment 5 không đạt ngưỡng sau 2 vòng cải tiến prompt/truy hồi.
