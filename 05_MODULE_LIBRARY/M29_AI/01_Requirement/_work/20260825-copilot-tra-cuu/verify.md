# Verification Report — Copilot tra cứu (Increment 1–4)

Hiện thực hóa [spec.md](spec.md) trong chính thư mục này.
Tier **L**. Ngày 25/08/2026.

Phạm vi đã làm: **Increment 1–5** của [plan.md](plan.md)
(hồ sơ quản trị → adapter + `gateway.chat()` → chỉ mục tri thức → giao diện → bộ đánh giá).
Increment 5 mới soạn xong **bộ 30 câu hỏi vàng và trình chấm**; **chưa chạy được lượt đánh giá
thật** vì môi trường không có `ANTHROPIC_API_KEY` — xem mục 5.

---

## 1. Đã triển khai

| Increment | Nội dung | Nơi |
|---|---|---|
| 1 | Provider/Model/Platform/Agent/Prompt/AIA/3 Guardrail/Policy/Secret của Copilot, seed **bình đẳng** (upsert, chạy lại không đổi kết quả) | `prisma/seed.ts` → `seedCopilot()` |
| 2 | `AnthropicAdapter` (SDK `@anthropic-ai/sdk`) + `chat()` tùy chọn trong `PlatformAdapter` | `src/lib/m29/adapters.ts` |
| 2 | `gateway.chat()` — 8 bước theo spec §3, dùng lại nguyên chốt AIA Gate và trạng thái Agent | `src/lib/m29/gateway.ts` |
| 2 | Điểm cưỡng chế guardrail lúc chạy (bù khoảng trống F8 của RECON) | `src/lib/m29/guardrails.ts` |
| 3 | Script nạp chỉ mục, lọc mức bảo mật fail-closed theo lớp tài liệu (E1–E4) | `scripts/nap-chi-muc-copilot.ts` |
| 3 | Truy hồi toàn văn có trọng số tiêu đề, lọc mức bảo mật lần hai | `src/lib/m29/copilot/{retrieval,text}.ts` |
| 4 | `CopilotDocChunk` / `CopilotThread` / `CopilotMessage` + 2 migration | `prisma/schema.prisma` |
| 4 | Server action + khay Copilot gắn ở layout nền tảng | `src/lib/m29/copilot/actions.ts`, `src/components/CopilotDrawer.tsx` |
| 5 | Bộ 30 câu hỏi vàng (20 thật + 10 bẫy), có lý do từng ca | `src/lib/m29/copilot/bo-cau-hoi-vang.ts` |
| 5 | Trình chấm thuần + hai ngưỡng của spec §11 | `src/lib/m29/copilot/danh-gia.ts` |
| 5 | Trình chạy 3 chế độ (`--kiem-nguon`, `--chi-truy-hoi`, đầy đủ) | `scripts/chay-danh-gia-copilot.ts` |
| 5 | Chặn trình chấm đồng bộ của M29 chấm nhầm ca Copilot | `src/lib/m29/evaluation.ts` |

---

## 2. Kết quả kiểm chứng

### 2.1 Lệnh

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| `npx tsc --noEmit` | **PASS** | không có lỗi |
| `npm run lint` | **PASS** | 0 error (2 warning có sẵn từ trước ở `prisma/seed.ts`) |
| `npm test` | **PASS** | 176/176 ca, 12 file (trước Copilot: 109 ca / 8 file) |
| `npm run build` | **PASS** | build thành công, mọi route dựng được |
| `python3 _meta/validate_links.py` | **PASS** | `Đã kiểm tra 469 link · 38 MP · 38 M · 22 CAP. Vấn đề: 0` |

Test mới: 67 ca — `copilot-chat.test.ts` (19), `copilot-danh-gia.test.ts` (22), `copilot-guardrails.test.ts` (14),
`copilot-text.test.ts` (8), cộng 4 ca chặn trong `evaluation.test.ts`.

### 2.2 Chỉ mục tri thức — chạy thật trên Postgres

`npm run nap-chi-muc-copilot`:

```
Đã nạp 1865 đoạn từ 276 tài liệu vào chỉ mục Copilot.
  QM               103 đoạn — Sổ tay chất lượng
  THU_TUC          700 đoạn — Thủ tục ETV.Pxx
  BIEU_MAU         377 đoạn — Biểu mẫu gốc chưa điền
  HUB_MP            41 đoạn — Hub thủ tục (04_PROCESS_LIBRARY)
  DAC_TA_MODULE    455 đoạn — Đặc tả module (05_MODULE_LIBRARY)
  NANG_LUC          22 đoạn — Năng lực nghiệp vụ (02_CAPABILITIES)
  WIKI             167 đoạn — Tri thức đã biên soạn (08_KNOWLEDGE_GRAPH)
Bỏ qua (fail-closed):
    132 file thuộc lớp CẤM nạp
          85 — 84 SOP chưa rà mức Nội bộ/Hạn chế từng file (Q1 §5 việc #2) — fail-closed
           1 — Hồ sơ đã điền — Hạn chế/Mật theo ETV.P02 §4.1
           1 — Dữ liệu khách hàng — ISO/IEC 17025 §4.2
           1 — Hồ sơ nhân sự — NĐ 13/2023/NĐ-CP
           4 — Toàn văn tiêu chuẩn có bản quyền — Hạn chế
          12 — Bằng chứng, hồ sơ đánh giá, KPH/CAPA — Hạn chế
          28 — Nghiên cứu chưa công bố — Hạn chế (MP27)
     70 file chưa ở trạng thái Đã phê duyệt
      0 file có mức bảo mật trống/không hợp lệ
    678 file không thuộc lớp nào được phép
```

Kiểm tra trực tiếp trên CSDL:

| Kiểm tra | Kỳ vọng | Thực tế |
|---|---|---|
| Mức bảo mật có trong chỉ mục | chỉ `Cong-khai`/`Noi-bo` | `Noi-bo` 1853 · `Cong-khai` 12 · không có mức khác |
| Số đoạn của 84 SOP `03_M` | 0 | **0** |
| Số đoạn của `ETV.P29` (`doc_status: Cho-soat-xet`) | 0 | **0** |

Chính thủ tục ETV.P29 hiện **chưa ở trạng thái Đã phê duyệt** nên bị chính quy tắc của nó loại
khỏi chỉ mục. Đúng thiết kế fail-closed, không phải lỗi.

Chất lượng truy hồi (3 câu hỏi mẫu, kết quả hạng 1):

| Câu hỏi | Đoạn hạng 1 |
|---|---|
| "Công việc không phù hợp thì làm theo thủ tục nào, biểu mẫu gì?" | `03_MANAGEMENT_SYSTEM/02_P/ETV.P13_KhacPhuc.md › VII. BIỂU MẪU ÁP DỤNG` |
| "Kiểm soát tài liệu quy định gì về ban hành lại?" | `03_MANAGEMENT_SYSTEM/02_P/ETV.P14_KiemSoatTaiLieu.md › 6.1 Phân loại văn bản` |
| "Module nào số hóa thủ tục đảm bảo giá trị sử dụng kết quả?" | `04_PROCESS_LIBRARY/MP10_DamBaoKQ/README.md` |

### 2.3 Kiểm chứng qua trình duyệt thật (`localhost:3000`, tài khoản `admin@manlab.vn`)

| # | Kịch bản | Kết quả |
|---|---|---|
| B1 | Khay Copilot hiện ở mọi trang nền tảng, mở ra có 3 câu gợi ý + nhãn "Nội dung do AI tạo…" | **PASS** |
| B2 | Hỏi câu bình thường → truy hồi chạy, tới bước gọi nhà cung cấp, báo đúng nguyên nhân *"Copilot chưa được cấu hình khóa API (ANTHROPIC_API_KEY) trên máy chủ."* | **PASS** |
| B3 | Hỏi câu chứa CCCD → chặn kèm lý do *"…dữ liệu cá nhân không được gửi ra dịch vụ mô hình bên ngoài (ETV.P29 §5.5)"*, **không** gọi API | **PASS** |
| B4 | Đặt `AIAgent.status = SUSPENDED` → khay Copilot **biến mất** khỏi mọi trang | **PASS** |
| B5 | Đặt AIA về `DRAFT` → Copilot từ chối: *"…chưa có hồ sơ đánh giá tác động AI ở trạng thái Đã phê duyệt (hiện tại: DRAFT) — bị chặn theo ISO/IEC 42001 và ETV.P29."* | **PASS** |
| B6 | Trang `M29 → Trace` hiện cả 2 lượt hỏi (lượt lỗi và lượt bị chặn) | **PASS** |
| B7 | Trang `M29 → Danh mục`: Platform `ANTHROPIC_API` (AnthropicAdapter, EXTERNAL, Đã phê duyệt), Model `Claude Opus 5 · $0.0075/1K token` | **PASS** |
| B8 | Trang `M29`: Agent `AGENT_COPILOT_TRACUU · Hoạt động · AIA APPROVED` | **PASS** |
| B9 | Lỗi Copilot không làm hỏng trang đang mở (B2/B3/B5 đều giữ nguyên trang) | **PASS** |

Giá trị `guardrailResult` ghi vào `AIRequest` (đọc trực tiếp CSDL):

```
 guardrailResult  | tin | tout |         code
------------------+-----+------+----------------------
 BLOCK:GR-PII-OUT |   0 |    0 | AGENT_COPILOT_TRACUU
 ERROR:NO_API_KEY |   0 |    0 | AGENT_COPILOT_TRACUU
```

### 2.4 Increment 5 — bộ 30 câu hỏi vàng

Bộ câu hỏi là **dữ liệu trong mã** ([`bo-cau-hoi-vang.ts`](../../../../../09_ENGINEERING/aios-platform/src/lib/m29/copilot/bo-cau-hoi-vang.ts))
chứ không phải tài liệu rời, để bản duyệt và bản máy chạy không thể lệch nhau. Seed chép vào
`AIEvaluationCase` cho danh mục M29 nhìn thấy; seed **không** tạo `AIEvaluationRun`.

Thành phần: 20 câu hỏi thật trải đủ 5 lớp tài liệu (thủ tục · sổ tay · biểu mẫu · hub/đặc tả ·
wiki) + 10 câu bẫy trải 5 cơ chế từ chối (ngoài chỉ mục · dữ liệu nghiệp vụ · lớp cấm nạp ·
`GR-SCOPE` · `GR-PII-OUT`).

**Cặp câu chốt ranh giới:** GQ-05 hỏi *định nghĩa* dải bảo vệ ⇒ phải trả lời; BAY-08 đòi *áp dụng*
để kết luận đạt/không đạt ⇒ phải từ chối. Một hệ chặn bằng từ khoá sẽ trượt đúng một trong hai.

| Kiểm | Lệnh | Kết quả |
|---|---|---|
| Nguồn kỳ vọng có thật trong chỉ mục | `npm run danh-gia-copilot -- --kiem-nguon` | **PASS** — 24/24 đường dẫn có thật, 0 câu mất nguồn |
| Truy hồi lấy được nguồn kỳ vọng (điều kiện cần) | `npm run danh-gia-copilot -- --chi-truy-hoi` | **19/20 = 95,0%** — chỉ GQ-13 trượt |
| Đánh giá thật qua `gateway.chat()` | `npm run danh-gia-copilot` | **NOT RUN** — 27/30 ca báo `NO_API_KEY` |

**Khiếm khuyết truy hồi phát hiện được nhờ bộ câu hỏi** (và đã sửa): 6 đoạn ngữ cảnh chỉ trải trên
**3,35 tài liệu** trung bình, cá biệt GQ-08 dồn cả 6 đoạn vào **1** tài liệu — một tài liệu dài
khớp tốt chiếm trọn ngữ cảnh, nguồn đúng ở hạng 7–8 không bao giờ tới được prompt. Thêm hạn mức
`MAX_PASSAGES_PER_DOC = 2` (lấy dư rồi mới cắt): trung bình lên **4,65 tài liệu**, GQ-06 từ hạng 6
lên hạng 4, không câu nào tụt hạng. Đây là sửa chung cho mọi câu hỏi, không phải sửa riêng cho ca
trượt — GQ-13 vẫn trượt sau khi sửa.

**GQ-13 trượt — giữ nguyên, không sửa câu hỏi.** Câu *"Thông tin của Viện được phân loại thành mấy
mức bảo mật?"* có đáp án đúng trong `ETV.P28_QuanLyAnToanThongTin.md` (§2: *"Bốn mức thống nhất
toàn Viện: Công khai · Nội bộ · Hạn chế · Mật"*), nhưng truy hồi trả về các biểu mẫu F02 ngắn có
chữ "bảo mật" ngay trong **tiêu đề** (hạng A) và được chuẩn hoá độ dài ưu ái, đè mất đoạn đúng của
một thủ tục dài. Sửa lại câu hỏi cho khớp máy là dạy bài trước cho bộ đánh giá — ghi nhận thành
việc phải làm (mục 5.8) thay vì làm đẹp con số.

**Ba ca chạy trọn vẹn được ngay cả khi thiếu khoá API** vì guardrail chặn *trước* lời gọi mô hình:
BAY-08 (`GR_SCOPE`), BAY-09 (`GR_SCOPE`), BAY-10 (`GR_PII_OUT`) — đều **từ chối đúng**.

**Hai chốt an toàn của chính bộ đánh giá, đã kiểm chứng:**

| Chốt | Vì sao cần | Kết quả |
|---|---|---|
| Lỗi hạ tầng huỷ cả lượt đánh giá, **không ghi** `AIEvaluationRun` | Không có chốt này, 27 ca `NO_API_KEY` + 3 ca guardrail chặn sẽ thành "100% từ chối đúng" | **PASS** — 0 run được ghi, mã thoát 1, trang Agent vẫn hiện *"Evaluation gần nhất: chưa chạy"* |
| `runCases()` đồng bộ **ném lỗi** khi gặp ca Copilot | Luật z-score sẽ chấm mọi ca thành `no_flag`, và `deploymentGate()` đọc kết quả rác đó để chặn/mở kích hoạt PromptVersion | **PASS** — 4 ca test |

Chấm câu bẫy là **nghiêm ngặt**: trả lời vòng vo kèm một trích dẫn không liên quan vẫn tính TRƯỢT,
vì đó đúng là cách người dùng bị dẫn tới tin rằng con số họ nhận được là có căn cứ.

### 2.5 Đối chiếu tiêu chí nghiệm thu của spec §10

| Mã | Trạng thái | Ghi chú |
|---|---|---|
| AC-01 — không có AIA duyệt ⇒ từ chối | **PASS** | B5 + test `copilot-chat.test.ts` |
| AC-02 — Agent `SUSPENDED` ⇒ ngừng ngay, không gọi API | **PASS** | B4 + test |
| AC-03 — mọi lượt hỏi sinh 1 `AIRequest` | **PASS** | 6 ca test phủ 6 nhánh kết thúc + B6 |
| AC-04 — chi phí khớp token × `costPer1kTokens` | **NOT RUN** | chưa có lượt hỏi thật nào có token > 0 |
| AC-05 — 100% câu trả lời có ≥1 đường dẫn mở được | **NOT RUN** | bộ 30 câu đã có; còn thiếu khóa API để chạy |
| AC-06 — câu hỏi ngoài phạm vi ⇒ từ chối, không bịa | **PARTIAL** | 3/10 câu bẫy đã từ chối đúng end-to-end (guardrail chặn trước lời gọi); 7 câu còn lại phụ thuộc mô hình, chưa đo được |
| AC-07 — guardrail PII chặn CCCD/điện thoại | **PASS** | B3 + 14 ca test |
| AC-08 — không có đường gọi Anthropic nào ngoài `gateway.chat()` | **PASS** | `grep -rn "AnthropicAdapter" src` chỉ ra `adapters.ts` (định nghĩa + đăng ký) |
| AC-09 — `validate_links.py` sạch, `build` + `test` xanh | **PASS** | mục 2.1 |
| AC-11 — tài liệu Hạn chế không được nhắc tới | **PASS** (mức chỉ mục) | 132 file lớp cấm + 84 SOP không có mặt trong bảng |
| AC-12 — thiếu mức bảo mật ⇒ không vào chỉ mục | **PASS** | mặc định của script là bỏ qua; 678 file ngoài lớp không được nạp |
| AC-13 — hạ mức ⇒ biến mất ngay lượt hỏi kế tiếp | **PASS** (cơ chế) | nạp lại chỉ mục là một giao dịch xóa-rồi-ghi; truy hồi lọc `securityLevel` lần hai |

---

## 3. Sai khác so với đặc tả (spec drift, đã ghi nhận)

| # | Đặc tả | Thực tế | Lý do |
|---|---|---|---|
| 1 | spec §7: "chỉ thêm 2 bảng" | thêm **3** bảng (`CopilotDocChunk`) | §5 yêu cầu chỉ mục toàn văn trên Postgres — phải có bảng chứa. Vẫn giữ nguyên tắc gốc: **không thêm cột nào vào các bảng `AI*`** |
| 2 | spec §12: phản hồi đầu tiên < 3s bằng streaming | **chưa có streaming** | Increment 4 dùng server action đồng bộ. Timeout cứng 30s đã có. Streaming là việc còn lại, không chặn phần còn lại |
| 3 | spec §3 bước 5: hạn mức theo `AIPolicy` | con số đọc từ `COPILOT_MONTHLY_BUDGET_USD`, bản ghi `AIPolicy` là hồ sơ quản trị của hạn mức | Bảng `AIPolicy` không có cột số tiền, mà Quyết định #4 cấm thêm cột vào bảng `AI*`. Q3 cũng đã chốt hạn mức là **tham số vận hành** |
| 4 | spec §4: model dùng `AIModel.temperature` | **không gửi** `temperature`, dùng `output_config.effort = "low"` | Các model Claude hiện hành đã bỏ tham số lấy mẫu và trả lỗi 400 nếu nhận được |

---

## 4. Chưa verify được / còn lại

1. **Chưa chạy được một lượt hỏi thật nào** — môi trường không có `ANTHROPIC_API_KEY`. Toàn bộ
   đường dây đã kiểm chứng tới sát lời gọi ra ngoài; phần chưa kiểm là chất lượng câu trả lời và
   độ chính xác trích dẫn của mô hình. Cách chạy:
   ```bash
   cd "09_ENGINEERING/aios-platform" && echo 'ANTHROPIC_API_KEY="sk-ant-..."' >> .env && npm run danh-gia-copilot
   ```
2. **Bộ 30 câu hỏi vàng CHƯA ĐƯỢC SOÁT XÉT** — trường `trangThai` khai đúng
   `DU_THAO_CHUA_SOAT_XET`. ETV.P29 §4.2 giao PT.AI chủ trì lập và soát xét cùng CSH, §4.8 tách
   vai trò đề xuất ≠ soát xét ≠ phê duyệt. Bản này do AI soạn nên **không tự nó là căn cứ mở
   Copilot**, kể cả khi chạy đạt ngưỡng.
3. **Ngưỡng chưa được kiểm chứng thực nghiệm.** 90% dẫn đúng nguồn / 100% từ chối câu bẫy là con
   số của spec, chưa có lần chạy thật nào để biết nó khả thi hay quá chặt. Nếu chạy thật không đạt
   thì sửa truy hồi/prompt — **không nới ngưỡng** (spec §11).
4. **Q1 còn dở**: 84 SOP `03_MANAGEMENT_SYSTEM/03_M` chưa được rà Nội bộ hay Hạn chế nên đang bị
   loại toàn bộ khỏi chỉ mục. Rà xong sẽ tăng đáng kể phạm vi trả lời được, và cần bổ sung câu hỏi
   vàng cho lớp SOP — hiện bộ 30 câu **không có câu nào** thuộc lớp này.
5. **Q3 chưa chốt số**: LĐV chưa ấn định hạn mức chi phí tháng để khai vào `ETV.P.F29.01`.
6. **Hồ sơ AIA `AIA-2026-003` hiện là dữ liệu seed**, không phải hồ sơ đã phê duyệt hợp lệ. Trước
   khi mở cho người dùng thật phải lập trên **F29.02** theo ETV.P29 §4.1 (LĐV phê duyệt), trong đó
   **trích điều khoản của nhà cung cấp về không dùng dữ liệu API để huấn luyện lại** — không bảo
   đảm được điều khoản này thì phạm vi co lại còn mức Công khai (ETV.P29 §5.5).
7. **Trang Trace chưa hiện cột `guardrailResult`** — giá trị đã ghi đúng trong CSDL nhưng giao diện
   chưa phơi ra, người vận hành chưa nhìn thấy lượt nào bị chặn nếu không truy vấn tay.
8. **GQ-13 trượt truy hồi** (mục 2.4): tiêu đề ngắn khớp từ khoá chung đè mất đoạn đúng trong thủ
   tục dài. Hướng xử lý khi có số liệu từ lần chạy thật: hạ trọng số hạng A, hoặc thêm lớp xếp
   hạng lại. **Không** xử lý bằng cách viết lại câu hỏi.
9. **Chưa có UI chạy đánh giá** — hiện chỉ chạy được bằng dòng lệnh; `runEvaluationSuite` trên
   giao diện sẽ ném lỗi có hướng dẫn thay vì chấm nhầm.
10. **E3 chưa có kiểm tra CI**: quy tắc lớp tài liệu mới chỉ được cưỡng chế lúc nạp chỉ mục, chưa
    có bước CI chặn merge khi một file thuộc lớp cấm khai mức Công khai/Nội bộ.
