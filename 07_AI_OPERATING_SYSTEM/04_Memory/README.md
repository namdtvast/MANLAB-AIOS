# 04 — Memory

**Ý nghĩa:** Mô hình bộ nhớ ngữ cảnh bền vững của AI trong MANLAB-AIOS — định nghĩa **loại bộ nhớ nào lưu ở đâu**, không phải kho lưu trữ vật lý. Thư mục này chỉ chứa mô hình/đặc tả; dữ liệu thật nằm ở các tầng đã có theo đúng nguyên tắc "một nguồn sự thật" của repo.

**Vì sao cần tài liệu này:** LLM không tự lưu tri thức giữa các phiên làm việc — nó chỉ có context window và tham số đã huấn luyện. Mọi tri thức Viện muốn AI "nhớ" (khách hàng, dự án, quyết định, tiêu chuẩn áp dụng, bài học kinh nghiệm) phải được ngoại hóa (externalize) vào các tầng bền vững bên dưới, không phải phó thác cho lịch sử hội thoại.

---

## Mô hình bộ nhớ 3 lớp

| Lớp | Trả lời câu hỏi | Nơi lưu trong repo | Trạng thái hiện tại |
|---|---|---|---|
| **Wiki cache** | Tóm tắt nào dễ đọc nhất cho người và AI? | [`08_KNOWLEDGE_GRAPH/Wiki/`](../../08_KNOWLEDGE_GRAPH/Wiki/index.md) | Đã triển khai — ~6.028 tài liệu đã biên soạn thành các trang chủ đề, git-versioned, trỏ nguồn |
| **Vector Search** | Đoạn tài liệu nào giống ngữ nghĩa với câu hỏi? | [`08_KNOWLEDGE_GRAPH/09_Embedding/`](../../08_KNOWLEDGE_GRAPH/09_Embedding/README.md) + [`10_Vector_DB/`](../../08_KNOWLEDGE_GRAPH/10_Vector_DB/README.md) | Chưa triển khai — chỉ có khung thư mục |
| **Knowledge Graph** | Thực thể này liên quan/phụ thuộc/ảnh hưởng tới thực thể nào? | [`08_KNOWLEDGE_GRAPH/08_Ontology/`](../../08_KNOWLEDGE_GRAPH/08_Ontology/README.md) | Chưa triển khai — chỉ có khung thư mục, chưa có thực thể/quan hệ nào được mô hình hóa |
| **Metadata/hồ sơ có cấu trúc** | Bằng chứng/kiểm soát nào áp cho việc này? | [`03_MANAGEMENT_SYSTEM/`](../../03_MANAGEMENT_SYSTEM/) (chuẩn mực), [`11_COMPLIANCE/`](../../11_COMPLIANCE/) (bằng chứng, EV-xxx) | Đã có, dạng tài liệu/bảng ánh xạ chứ không phải CSDL truy vấn được |
| **Dữ liệu nghiệp vụ/sản xuất** | Trạng thái thật của hồ sơ/công việc hiện nay là gì? | `Mxx_Slug/08_Source/` của từng module (vd. `M10_DamBaoKQ/08_Source/api/data/`) | Theo từng module — **không bao giờ** coi là bộ nhớ AI dùng chung, chỉ agent được cấp quyền của module đó mới truy cập |

**Nguyên tắc:** 4 lớp đầu là tri thức tham chiếu dùng chung cho mọi agent (qua MCP, xem dưới). Lớp cuối là dữ liệu sản xuất riêng của từng module — biên giới quyền truy cập khác hẳn, không trộn lẫn.

---

## Wiki không phải là "bộ nhớ" — nó là một cách trình bày của bộ nhớ

Wiki (`08_KNOWLEDGE_GRAPH/Wiki/`) là lớp đọc nhanh, con người và AI đều đọc được, quản lý bằng Git. Nhưng bản thân Wiki không thay thế Vector Search hay Knowledge Graph:

- Wiki trả lời tốt câu "tổng quan chủ đề X là gì" (đọc tuyến tính).
- Vector Search trả lời tốt câu "đoạn nào giống ngữ nghĩa với câu hỏi này" (khi Wiki chưa tóm tắt đủ chi tiết hoặc câu hỏi rất cụ thể).
- Knowledge Graph trả lời tốt câu "cái này liên quan/phụ thuộc vào cái gì" (quan hệ nhiều bước mà tóm tắt tuyến tính không thể hiện được).

Ba lớp bổ sung cho nhau, không lớp nào thay thế lớp nào.

---

## Thứ tự đầu tư đề xuất

Không cần xây đủ cả 3 lớp cùng lúc. Đầu tư Knowledge Graph chỉ đáng giá khi số thực thể/quan hệ đủ lớn (nhiều khách hàng, dự án, thiết bị, quyết định liên kết chằng chịt) — với quy mô hiện tại của ETV, thứ tự hợp lý là:

1. **Wiki** (đã có) — giữ làm lớp tra cứu chính cho AI trong ngắn hạn.
2. **Vector Search** (`09_Embedding` + `10_Vector_DB`) — triển khai khi Wiki không đủ chi tiết để trả lời câu hỏi cụ thể (vd. tra cứu điều khoản chính xác trong văn bản dài).
3. **Knowledge Graph** (`08_Ontology`) — chỉ triển khai khi xuất hiện nhu cầu truy vấn quan hệ nhiều bước thật sự (vd. "dự án này dùng chuẩn nào, chuẩn đó hiệu chuẩn lần cuối khi nào, ai phê duyệt") mà Vector Search không trả lời được.

**Đề xuất thực thể ban đầu cho Knowledge Graph (chưa triển khai, chỉ để tham khảo khi tới bước 3):** khách hàng, dự án/hợp đồng, thiết bị/chuẩn đo, phương pháp thử, quyết định/phê duyệt, KPH-CAPA. Cần xác nhận lại với chủ sở hữu nghiệp vụ trước khi mô hình hóa — không suy đoán quan hệ khi chưa khảo sát dữ liệu thật.

### Schema tối thiểu cho một Entity (đề xuất — áp dụng khi triển khai `08_Ontology`, chưa có hiệu lực hôm nay)

Để tránh mỗi module tự định nghĩa entity khác nhau khi tới lúc triển khai, mọi entity trong Knowledge Graph nên tối thiểu có các trường sau:

```yaml
id:             # định danh duy nhất, bất biến
type:           # vd. KhachHang, DuAn, ThietBi, PhuongPhapThu, QuyetDinh
title:
description:
aliases: []     # tên gọi khác đã gặp trong tài liệu nguồn
source:         # đường dẫn tới tài liệu/hồ sơ gốc sinh ra entity này
owner:          # chủ sở hữu nghiệp vụ xác nhận entity này đúng
created:
updated:
relationships: []   # {type, target_id} — quan hệ đã xác nhận, không suy đoán
```

Trường `source` bắt buộc phải trỏ được về tài liệu gốc trong `08_KNOWLEDGE_GRAPH/00_RAW_DATA` (đã phân loại) hoặc `03_MANAGEMENT_SYSTEM`/`11_COMPLIANCE` — một entity không truy được nguồn thì không đưa vào Graph, theo đúng quy tắc "chưa đủ dữ liệu" đã áp dụng cho Wiki ([Wiki/index.md](../../08_KNOWLEDGE_GRAPH/Wiki/index.md)).

---

## Vai trò của Harness và MCP trong việc truy xuất bộ nhớ

- **`02_Harness`**: nơi định nghĩa agent lấy ngữ cảnh từ 3 lớp bộ nhớ theo cách nào (vd. subgraph retrieval — lấy vài chục node liên quan thay vì hàng trăm tài liệu), nén ngữ cảnh, quản lý cache. Harness **dùng** bộ nhớ, không phải nơi lưu bộ nhớ. Pipeline lắp ráp ngữ cảnh chi tiết (intent → truy xuất → nén) thuộc phạm vi đặc tả `02_Harness`, sẽ viết khi Vector Search/Knowledge Graph thật sự tồn tại để tham chiếu — không suy đoán trước cho lớp chưa triển khai.
- **`07_MCP`**: cổng công cụ để agent gọi bộ nhớ (`search`, `read`, `get-context`…) — MCP chỉ là giao thức gọi công cụ, **không tự lưu trữ dữ liệu**. Nhầm MCP server với database là sai.

---

## Versioning & quyền ghi/sửa — dùng cơ chế đã có, không dựng mới

Hai nhu cầu tưởng như thiếu ("Memory phải theo dõi phiên bản", "AI không được tự ghi vào bộ nhớ") thực ra repo đã có sẵn cơ chế, không cần xây thêm hệ thống riêng cho `04_Memory`:

- **Versioning tài liệu đã ban hành**: theo `MP14_TaiLieu` (ETV.P14 — Kiểm soát tài liệu). Tài liệu có `doc_status: issued` trong `manifest.yaml` không sửa trực tiếp — tạo phiên bản/lần ban hành mới theo đúng quy trình MP14. Áp dụng cho mọi nội dung nguồn nạp vào Wiki/Ontology, không chỉ văn bản hành chính.
- **Ghi/sửa Wiki, Ontology, Vector DB**: đi qua Git — mọi thay đổi là một commit/PR, có review trước khi merge vào `main`. Đây chính là vòng "AI đề xuất (draft) → người xác nhận (review PR) → chấp nhận (merge)" mà không cần dựng quy trình duyệt riêng cho bộ nhớ.
- **AI không tự kết luận/ghi đè**: đã ràng buộc ở mức 42001/AIA (xem cuối trang) — áp dụng cho mọi ghi/sửa vào 3 lớp bộ nhớ, không chỉ kết luận đo lường.

---

## KHÔNG lưu ở đây

- Dữ liệu cá nhân/mật trong prompt
- Cấu hình cho AI tự phê duyệt kết quả/chứng chỉ
- Bản sao nội dung Wiki/Ontology/Vector DB — chỉ trỏ đường dẫn tới `08_KNOWLEDGE_GRAPH/`
- Dữ liệu nghiệp vụ/sản xuất thật của module (thuộc `Mxx_Slug/08_Source/`)

**Lưu ý:** 42001: AI KHÔNG tự ra kết luận đo lường; mọi agent triển khai phải có hồ sơ AIA theo MP29.

---

> **Nguyên tắc cốt lõi:** Memory không phải là nơi lưu mọi thông tin, mà là cơ chế lựa chọn đúng tri thức, đúng phiên bản, đúng thời điểm để hỗ trợ suy luận. `08_KNOWLEDGE_GRAPH` là toàn bộ tri thức Viện có; Memory là phần được chọn ra, có nguồn xác nhận, phục vụ đúng nhiệm vụ của agent tại một thời điểm — không phải bản sao của toàn bộ tri thức đó.
