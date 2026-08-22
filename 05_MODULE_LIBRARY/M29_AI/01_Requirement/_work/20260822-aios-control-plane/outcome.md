# Outcome — 20260822-aios-control-plane

> Tier: **L** (hạ tầng production mới, mô hình RBAC/authorization mới, ranh giới đa nền tảng — xem CLASSIFY trong `plan.md`).
> Phạm vi: số hóa **CAP-29_AIOffice** qua hai module đã được reserve sẵn trong repo — **M29_AI** (lõi quản trị AI: Provider/Model/Agent/Skill/Tool/Prompt/Context/Guardrail/Policy/AIA/Evaluation/Trace/Usage/Cost/Secret/Audit) và **M35_NenTangSo** (Platform Registry: ManLab, VI-CONNECT, các nền tảng sau này). Không tạo capability/MP/module mới — cả hai đã tồn tại dưới dạng khung mẫu rỗng.

## RECON (trước khi đặc tả)

```
[FACT] CAP-29_AIOffice (02_CAPABILITIES/CAP-29_AIOffice/capability.yaml) đã liên kết
       MP29_AI, MP35_NenTangSo, MP38_DichVuSo — đúng 3 quy trình cấu thành năng lực này.
[FACT] MP29_AI/M29_AI, MP35_NenTangSo/M35_NenTangSo, MP38_DichVuSo/M38_DichVuSo hiện là
       khung mẫu rỗng ("(cập nhật)", "Khung mẫu — cập nhật nội dung cụ thể cho module"),
       chưa có trường dữ liệu/API/UI thật nào.
[FACT] 07_AI_OPERATING_SYSTEM là cấu hình Skill/Agent/Guardrail... cho CHÍNH Claude Code
       vận hành trên repo này (vd 01_Skills/04_S_ThietKeAI) — không phải phần mềm runtime
       quản trị AI của sản phẩm ManLab/VI-CONNECT. 10/12 thư mục con (02_Harness…12_Policies)
       chỉ có README mô tả "lưu file gì ở đây", không có entity/schema/API.
       → Không tái sử dụng nhầm hai khái niệm này khi BUILD.
[FACT] Mã nguồn thật duy nhất trong repo: M10_DamBaoKQ/08_Source (Node.js thuần dùng module
       `http` có sẵn, không phụ thuộc npm ngoài; webapp ES module thuần; lưu JSON file
       `api/data/data.json`; phân quyền mô phỏng qua header `X-Role`, KHÔNG phải auth thật)
       và M21_CongBoNangLuc/08_Source (git submodule, static site, không liên quan AI).
[FACT] Quy ước 9 thư mục con cố định cho mọi Mxx (01_Requirement…09_Release), không thêm
       README riêng từng thư mục con. Hub MPxx đúng 3 file (README/manifest/links.yaml).
       Module tham chiếu phong cách: M36_ChungChiSo (đặc tả) và M10 (chạy trọn vẹn).
[FACT] Không có mã nguồn/API thật của VI-CONNECT trong repo này để khảo sát.
[FACT] _meta/validate_links.py kiểm tra link + đủ file Hub/module — bắt buộc chạy lại sau
       khi sửa bất kỳ Hub/module/capability nào (VERIFY của repo).
[ASSUMPTION] VI-CONNECT được mô hình hóa như MỘT bản ghi trong Platform Registry (M35) qua
       Platform Adapter pattern, KHÔNG tích hợp API thật ở Phase 1 (không có quyền truy cập
       source/API thật của nó). Xác nhận lại khi có repo/API thật của VI-CONNECT.
[ASSUMPTION] Theo đúng tiền lệ M10 (module duy nhất chạy trọn vẹn trong repo), Phase 1 dùng
       Node.js thuần + JSON file store + vanilla JS webapp, KHÔNG đưa framework/DB engine
       mới vào production ở lần lập kế hoạch này — tránh quyết định kiến trúc lớn chưa duyệt.
[ASSUMPTION] RBAC Phase 1 mô phỏng vai trò qua header (giống mẫu M10 `X-Role`), ghi rõ đây
       là prototype có phạm vi giới hạn, KHÔNG phải hệ thống auth production thật — vì repo
       hiện không có hệ auth thật nào để tích hợp.
[ASSUMPTION] MP38_DichVuSo ("Dịch vụ số, cổng KH") KHÔNG thuộc phạm vi lần này — object dữ
       liệu của nó (cổng khách hàng số) khác bản chất với AI Tool/Agent Registry. Chỉ tham
       chiếu (link) từ M29 nếu sau này Tool Registry cần khai báo một dịch vụ số làm Tool.
[QUESTION] Ai là Platform Owner / Agent Owner thật cho ManLab và (khi có) VI-CONNECT?
       → Chưa trọng yếu để STOP; Phase 1 để trường `owner` dạng text tự do, gán mặc định
       "Dương Thành Nam" (đã ghi trong manifest MP29), sửa sau khi có phân công thật.
```

## OUTCOME

```
Primary User:      Quản trị viên AI Office ETV (AI_ADMIN) — cần biết AI nào đang chạy, ở
                    đâu, làm gì, có an toàn/đúng ISO 42001 không, mà không cần đọc source.
Secondary User:     Chủ sở hữu từng nền tảng (ManLab, VI-CONNECT...) — khai báo Agent/Tool/
                    Prompt của nền tảng mình vào registry, xem log/chi phí AI của nền tảng đó.
Administrator:      AI_SECURITY_ADMIN (secret/guardrail/policy), AI_AUDITOR (read-only audit).
External System:    ManLab M10 API (thật, có thể đăng ký làm Tool mẫu READ); VI-CONNECT
                    (chưa có source thật — đăng ký dạng Platform placeholder).
Problem:            Không có nơi nào trong hệ sinh thái ETV cho biết: nền tảng nào đang dùng
                    AI, dùng model/provider gì, Agent được phép gọi Tool nào, Prompt nào đang
                    active, AI đã làm gì (trace), tốn bao nhiêu token/chi phí, ai đổi cấu hình
                    AI lúc nào. CAP-29/MP29/MP35 đã được đặt tên trong kiến trúc 12 tầng
                    nhưng chưa có nội dung/dữ liệu/API/UI thật.
Current Situation:  07_AI_OPERATING_SYSTEM chỉ cấu hình Claude Code; M29/M35/M38 là khung
                    rỗng; không có Platform Registry, Agent Registry, Tool Registry, Trace,
                    Token/Cost, RBAC, Audit nào tồn tại dưới dạng phần mềm chạy được.
Expected Improvement:
                    Có phần mềm thật (theo đúng khuôn 9 thư mục của M29_AI + M35_NenTangSo,
                    tiền lệ M10) cho phép: đăng ký Platform (ManLab/VI-CONNECT), đăng ký
                    Provider/Model/Agent/Skill/Tool/Prompt, xem AI Trace (ai hỏi gì → agent
                    nào → tool nào → kết quả gì → token/cost bao nhiêu), xem Token/Cost theo
                    Platform/Agent/ngày, xem Audit Log mọi thay đổi cấu hình, và Guardrail/
                    Policy cấp Agent/Tool với action BLOCK/WARN/REQUIRE_CONFIRMATION.
Success Criteria:   Đạt đúng "Definition of Done — Phase 1" của yêu cầu gốc (rút gọn còn phần
                    khả thi với hạ tầng hiện có, xem spec.md mục Acceptance Criteria):
                    - Chọn được Platform (ManLab / VI-CONNECT) và lọc Agent/Tool/Prompt theo
                      Platform đó.
                    - Mở 1 Agent thấy đủ: Model, Prompt version, Skills, Tools, Guardrails,
                      Evaluation gần nhất.
                    - 1 lượt gọi AI qua Tool Gateway sinh ra 1 Trace đầy đủ: User→Agent→
                      Skill→Tool→API→Result→Model→Tokens→Latency.
                    - Disable 1 Tool → Agent không gọi được Tool đó (chặn ở Tool Gateway).
                    - Prompt đổi nội dung → tạo version mới, không ghi đè bản cũ.
                    - Secret không xuất hiện đầy đủ ở UI/log/trace.
                    - Có Audit Log ghi Who/What/Before/After/When cho mọi thay đổi cấu hình.
                    - `_meta/validate_links.py` PASS sau khi hoàn tất Hub/module.
```

## Ghi chú phạm vi (đọc trước khi sang `spec.md`)

Bản SPEC/PLAN này lập cho **Phase 1 — Control & Visibility** (đúng phân kỳ trong yêu cầu gốc
của bạn, mục "MVP"). Guardrails nâng cao (AIA workflow đầy đủ, Deployment Gate tự động chặn
theo Evaluation, Harness/Workflow/Reasoning/Memory nâng cao) để ở Phase 2/3, chỉ mô tả ở mức
kiến trúc trong `plan.md` để không thiết kế bế tắc, KHÔNG lập kế hoạch chi tiết build ngay.
