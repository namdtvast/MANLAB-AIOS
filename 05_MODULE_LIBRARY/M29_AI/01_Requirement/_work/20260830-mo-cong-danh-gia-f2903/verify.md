# VERIFY — 20260830-mo-cong-danh-gia-f2903

Ngày 30/08/2026. Tier **M**. Nguồn: người dùng hỏi "khởi động Trợ lý AI (M29) ở đâu, không thấy con
chat hiện lên?", rồi yêu cầu xử lý để Copilot không còn bị chặn.

## Chuỗi chẩn đoán

1. **"Trợ lý AI (M29)" không phải chatbot.** `AGENT_TROLY_M29` chỉ xuất hiện ở `prisma/seed.ts` và
   test — không dòng giao diện nào gọi tới. Con có khay chat là `AGENT_COPILOT_TRACUU`, hiện qua
   `CopilotDrawer` ở layout nền tảng khi và chỉ khi `COPILOT_ENABLED !== "false"`, người dùng đã
   đăng nhập, và `AIAgent.status === "ACTIVE"` (`copilot/availability.ts`).
2. Tác tử đang `SUSPENDED` vì đổi mô hình → bấm **Mở lại** (ghi lý do) là khay hiện lên ngay.
3. Nhưng mọi câu hỏi đều trả về câu từ chối. Tra `AIRequest`: `BLOCK:GR-NO-SOURCE` **có token**, tức
   bị chặn ở bước (8) `enforceOutput`, không phải bước (6) truy hồi rỗng. Truy hồi lấy đúng 6/6 đoạn
   của `ETV.P14_KiemSoatTaiLieu.md`; mô hình `manlab-ai` trả lời đúng nội dung nhưng **không chép
   đường dẫn**, nên `citedPassages()` đếm 0.

## Sai lầm đã mắc và đã hoàn tác

Lượt này ban đầu **sửa `gateway.ts`**, chèn một khối nhắc trích dẫn sau khối ngữ cảnh. Bốn câu thử
tay đều qua. Chạy đủ bộ 42 tình huống thì hỏng:

| Nhóm F29.03 | Ngưỡng | Lời nhắc v2 (đã có sẵn) | Chèn nhắc bằng mã |
|---|---|---|---|
| 1. Tính đúng đắn | 90% | 17/20 = 85,0% | 11/20 = **55,0%** |
| 3. Tiêm lệnh **(bắt buộc)** | 100% | 4/4 = 100% | 3/4 = **75,0%** ❌ |
| 6. Nhất quán | 90% | 2/2 = 100% | 1/2 = **50,0%** |
| **Tổng** | | **39/42** | **31/42** |

Khối nhắc nằm ngay sát câu hỏi người dùng nên làm thủng **một nhóm bắt buộc đạt**. Ngoài ra cách đó
đi vòng qua vòng đời phê duyệt lời nhắc: prompt thật gửi cho mô hình sẽ khác nội dung
`AIPromptVersion` đã phê duyệt, tức bằng chứng "lời nhắc nào đã được dùng" hết khớp bản ghi.
`git checkout` toàn bộ; xem [`../20260828-loi-nhac-trich-dan-cuoi/verify.md`](../20260828-loi-nhac-trich-dan-cuoi/verify.md)
— lượt 28/08 đã kết luận đúng việc này: *"Không phải thay đổi mã nguồn."*

**Tác dụng phụ để lại:** lượt chạy đo cấu hình sai đó đã ghi `AIEvaluationRun` (31/11, id
`cmtfwrisd00190rsciz9pydov`). Bảng chỉ-thêm nên không xoá; nó trở thành "lượt gần nhất" mà
`deploymentGate()` đọc, đẩy run 39/3 xuống dưới.

## Vấn đề thật: hai điều khoản khoá nhau

- `deploymentGate()` (ETV.P29 §5.3.1): chưa có lượt đánh giá **Đạt** thì không kích hoạt được
  `AIPromptVersion` mới.
- Kết luận Đạt chỉ đặt được bằng `ghiKetLuanDanhGia()` — **việc của người ký** (ETV.P29 §4.8).
- Trình chạy đánh giá dùng `activePromptVersionId`, nên muốn đo bản mới thì phải kích hoạt nó trước.

Ba điều đó tạo một vòng kín. Lượt 28/08 phá vòng bằng cách sửa thẳng `activePromptVersionId` trong
CSDL dev và **tự ghi cảnh báo** rằng đó là đường tắt. Vòng kín còn nguyên thì lần sau vẫn phải đi
đường tắt — và đường tắt nào lặp lại đủ nhiều cũng thành thói quen.

Vòng đó còn bị siết thêm bởi một khoảng trống: `ghiKetLuanDanhGia()` **không có nút bấm nào** trên
toàn bộ `src/app` (grep 0 kết quả). Trang tác tử chỉ *hiển thị* lượt gần nhất. Cổng kiểm soát mà
không ai mở được bằng giao diện thì không phải kiểm soát chặt, mà là kiểm soát hỏng.

## Thay đổi

**1. Màn hình ghi kết luận F29.03** — `EvaluationPanel.tsx` trên trang chi tiết tác tử. Bày 5 lượt
gần nhất (trộn mọi bộ rồi sắp theo thời gian, đúng cách `deploymentGate()` xét), đánh dấu rõ *lượt
quyết định cổng triển khai*, và với lượt `CHO_KET_LUAN` thì cho ghi kết luận kèm **số phiếu bắt
buộc**. Quyền `evaluations:write` = **AI_OPERATOR**, **SUPER_ADMIN** — cố ý *không* gồm AI_ADMIN:
người khai báo cấu hình không tự kết luận cấu hình của mình.

Phần mềm không gợi ý nên kết luận gì. Cảnh báo đặt ngay trên ô nhập, không nhét xuống chân trang:
tổng số câu đạt **không** thay cho điều kiện bắt buộc — một trong bốn nhóm 3, 4, 5, 7 dưới ngưỡng
là kết luận chung Không đạt.

`ghiKetLuanDanhGia()` đổi từ `throw` sang trả `TxResult`: lỗi ném từ server action tới trình duyệt
chỉ còn một câu chung chung ở bản dựng production, mà mọi nhánh từ chối ở đây đều là thứ người ký
sửa được. Không nơi nào khác gọi hàm này nên đổi chữ ký không phá gì.

**2. Cờ `--loi-nhac <promptVersionId>`** cho `npm run danh-gia-copilot`, nối vào tham số
`promptVersionId` mới của `gateway.chat()`. Đo được bản sắp dùng mà **không** đụng
`activePromptVersionId` — vòng kín mở ra mà không cần đường tắt CSDL.

Hai rào giữ nguyên: bản được đo vẫn phải `APPROVED`/`ACTIVE` (đo bản Nháp chưa ai soát xét là vô
nghĩa), và `AIRequest.promptVersionId` ghi **đúng bản đã dùng** chứ không phải bản đang hiệu lực —
hồ sơ đánh giá chỉ có giá trị khi chỉ đúng cấu hình đã sinh ra câu trả lời. Đường này chỉ trình chạy
đánh giá gọi; người dùng thật không có lối nào chạm tới.

## Kiểm chứng

- `npx vitest run` — **498/498 đạt** (thêm 2 ca: đo được bản chưa kích hoạt và trace ghi đúng bản
  đã dùng; bản Nháp chỉ định để đo vẫn bị chặn `PROMPT_NOT_APPROVED`).
- `npm run kiem-tra-hdsd` — 18 file hợp lệ, M29 nay 12 bước.
- Màn hình mới verify qua trình duyệt: các lượt hiện đúng thứ tự thời gian, lượt đầu mang nhãn *lượt
  quyết định cổng triển khai*, nút ghi kết luận khoá khi ô số phiếu trống và mở khi có số phiếu.
  **Không bấm ghi kết luận** — đó là chữ ký của người có thẩm quyền, không phải thao tác kiểm thử.
- `npm run danh-gia-copilot -- --loi-nhac promptv2-do-thu-nghiem` chạy thật trên 42 tình huống:
  **39/42 · bốn nhóm bắt buộc đều đạt ngưỡng** (nhóm 1 đạt 85,0%, dưới ngưỡng 90% — ba ca trượt là
  GQ-10, GQ-13, GQ-20, cùng kiểu với lần đo 28/08). Tái lập đúng số đo của lượt 28/08 mà **không**
  đụng `activePromptVersionId`: tác tử vẫn đang chạy bản v1 suốt lúc đo.
- Bằng chứng trace không nói dối: 88 `AIRequest` của lượt chạy này mang
  `promptVersionId = promptv2-do-thu-nghiem`, tách bạch với 316 lượt cũ mang id bản v1.
- Lượt đánh giá mới (`cmtfxi6j500193psccsgmlinv`, 39/3) nay là **lượt gần nhất**, tức lượt mà cổng
  triển khai sẽ đọc — đã đẩy lượt 31/11 do lượt này lỡ tạo ra xuống dưới.

## Việc còn lại — cần người, không phải phần mềm

1. ~~Chạy đánh giá trên bản v2~~ — đã chạy: lượt `cmtfxi6j500193psccsgmlinv`, 39/42, bốn nhóm bắt
   buộc đạt, đang chờ kết luận.
2. Ký phiếu ETV.P.F29.03 cho lượt đó rồi ghi kết luận trên màn hình mới. **Nhóm 1 đạt 85,0% so với
   ngưỡng 90%** — người ký cân nhắc chấp nhận có điều kiện kèm hành động sửa chữa cho GQ-10/13/20,
   hay kết luận Không đạt. Phần mềm không thay được chỗ này.
3. Kích hoạt `promptv2-do-thu-nghiem` ở khối Lời nhắc — cổng mở ngay khi bước 2 ghi kết luận Đạt.

Ba việc trên **không** làm thay được: kết luận Đạt/Không đạt là thẩm quyền người ký (ETV.P29 §4.8),
và guardrail `NO_AUTO_APPROVE` tồn tại đúng để chặn việc AI tự phê duyệt.

## Vấn đề độc lập, chưa xử lý

`ETV.P29_QuanLyTriTueNhanTao.md` mang `doc_status: Cho-soat-xet` nên **không vào chỉ mục Copilot**
(script chỉ nạp `Da-phe-duyet | issued | Ban-hanh`). Mọi câu hỏi về chính thủ tục P29 vì thế đều
trả "không tìm thấy căn cứ" — trong khi giao diện M29 dẫn "Căn cứ: ETV.P29 · lần ban hành 01" ở đầu
mỗi trang. Đây là việc ban hành tài liệu theo MP14, không phải việc kỹ thuật; nạp lại chỉ mục sau
khi ban hành là đủ.
