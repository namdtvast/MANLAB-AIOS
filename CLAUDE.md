# CLAUDE.md

File này cung cấp hướng dẫn cho Claude Code (claude.ai/code) khi làm việc với mã nguồn trong repo này.

## Repo này là gì

MANLAB-AIOS **không phải là kho lưu tài liệu — đây là Hệ điều hành doanh nghiệp** cho Viện Kiểm định Công nghệ và Môi trường (ETV), một viện kiểm định/hiệu chuẩn/thử nghiệm vận hành theo ISO 9001, ISO 17025, ISO 17034, ISO 27001, ISO 42001. Repo mã hóa năng lực nghiệp vụ, thủ tục, module số hóa, hệ điều hành AI và bằng chứng tuân thủ của Viện thành cấu trúc thư mục — phần lớn nội dung là tài liệu quản trị/quy trình bằng tiếng Việt, kèm một lượng nhỏ mã nguồn ứng dụng thật.

Đơn vị gốc (bất biến) là **Năng lực nghiệp vụ** (CAP-xx), không phải tài liệu hay codebase.

## Kiến trúc 12 tầng

Các tầng đánh số `01_` … `12_` và đọc theo thứ tự — mỗi tầng trả lời một câu hỏi riêng. Đọc `ARCHITECTURE.md` và `README.md` để có bản đồ đầy đủ. Những tầng cần nắm chắc:

| Tầng | Trả lời câu hỏi | Chứa gì | Không bao giờ đặt ở đây |
|---|---|---|---|
| `02_CAPABILITIES` ⭐ | Viện làm được gì? | `CAP-xx_Slug/` = `capability.yaml` + `README.md`, link tới MP hiện thực năng lực đó | Chi tiết triển khai |
| `03_MANAGEMENT_SYSTEM` | Theo luật chơi nào? | Chuẩn mực kiểm soát ISO: `01_QM` (sổ tay chất lượng), `02_P` (thủ tục ETV.Pxx), `03_M` (quy trình kỹ thuật/SOP), `04_F` (biểu mẫu gốc), `05_R` (hồ sơ) | Nội dung thủ tục MP, biểu mẫu đã điền |
| `04_PROCESS_LIBRARY` ⭐ | Làm thế nào? | 38 thư mục `MPxx_Slug/` **Hub** — xem Mẫu Hub bên dưới | Nội dung thủ tục đầy đủ, bản copy biểu mẫu |
| `05_MODULE_LIBRARY` ⭐ | Số hóa bằng gì? | 38 đặc tả module `Mxx_Slug/`, ánh xạ 1–1 với MPxx — xem Mẫu Module bên dưới | Dữ liệu nghiệp vụ/sản xuất thật |
| `06_SHARED_RESOURCES` ⭐ | Tài nguyên dùng chung | Biểu mẫu gốc chưa điền, template, master data, branding — một nguồn sự thật | Hồ sơ đã điền/đã phát hành |
| `07_AI_OPERATING_SYSTEM` ⭐ | AI vận hành ra sao | Skill (`01_Skills`), Agent, Guardrail, Policy, cấu hình MCP | Dữ liệu mật trong prompt |
| `08_KNOWLEDGE_GRAPH` ⭐ | AI đọc ở đâu | Quy định pháp luật, tiêu chuẩn ISO/TCVN/QCVN, ontology, vector DB, `Wiki/` (tóm tắt có biên soạn từ `00_RAW_DATA/`) | Chuẩn mực kiểm soát nội bộ (thuộc tầng 03) |
| `09_ENGINEERING` | Mã nguồn | Backend/Frontend/API/DB/DevOps — hiện chủ yếu là khung sườn; mã thật nằm trong `08_Source/` của từng module (xem M10) hoặc trong submodule | Secrets, dữ liệu sản xuất |
| `11_COMPLIANCE` ⭐ | Bằng chứng tuân thủ | Bảng ánh xạ ISO/pháp luật, bằng chứng (EV-xxx), đánh giá, KPH/CAPA, công nhận BoA, đăng ký TDC (ND105/ND107) | Bản nháp thủ tục chưa ban hành |
| `12_RESEARCH` | Tương lai | KC4.0, DMC, OCR, bài báo — không phải hệ thống vận hành chính thức | — |

**3 quy ước bất biến (vi phạm là lỗi phổ biến nhất):**
1. **Thư mục MP/M là Hub** — chỉ chứa `README.md` + `manifest.yaml` + `links.yaml` (với MP) hoặc khung đặc tả đánh số (với M). **Chỉ link tới nội dung ở nơi khác, không bao giờ copy vào.**
2. **Một nguồn sự thật** — biểu mẫu ở `06`, chuẩn mực ở `03`, tri thức ở `08`. Nếu sắp nhân bản một trong ba loại này, hãy link thay vì copy.
3. **Digital Thread** — chuỗi truy vết xuyên suốt nằm ở `04_PROCESS_LIBRARY/_DIGITAL_THREADS/`.

## Định vị nội dung khi không chắc nằm ở tầng nào

Ba tầng `03`, `08`, `11` dễ nhầm nhất vì đều liên quan "tiêu chuẩn/quy định" — phân biệt theo câu hỏi:

| Câu hỏi | Tầng |
|---|---|
| Văn bản gốc của tiêu chuẩn/luật (toàn văn ISO, TCVN, QCVN, luật) là gì? | `08_KNOWLEDGE_GRAPH` |
| Viện **áp dụng** tiêu chuẩn đó nội bộ ra sao (chính sách QMS, thủ tục ETV.Pxx, quy trình kỹ thuật)? | `03_MANAGEMENT_SYSTEM` |
| Viện đã **chứng minh đáp ứng** tiêu chuẩn đó bằng gì (hồ sơ, audit, mapping điều khoản↔MP↔bằng chứng)? | `11_COMPLIANCE` |
| Quy trình đó được **số hóa** ra sao (đặc tả, API, UI, workflow)? | `05_MODULE_LIBRARY` |
| Mã nguồn thật chạy module đó nằm ở đâu? | `05_MODULE_LIBRARY/Mxx_Slug/08_Source` (không phải `09_ENGINEERING` — xem phần Mã nguồn ứng dụng thật) |

## Trình tự trước khi tạo hoặc sửa nội dung nghiệp vụ

Đi theo đúng chuỗi liên kết đã có sẵn giữa các tầng, không nhảy cóc:

**Capability** (`02`, việc gì) → theo `capability.yaml` tìm **MP** tương ứng (`04`, làm thế nào) → theo quy ước cùng số tìm **Module** số hóa (`05`, số hóa bằng gì) → theo `links.yaml`/cấu trúc module xác định **biểu mẫu** (`06`), **skill AI** (`07`), hoặc **mã nguồn** (`08_Source`).

Sửa thẳng một module mà chưa xác định nó số hóa MP nào (hoặc thêm skill mà chưa biết gắn với thủ tục ETV.Pxx nào) dễ tạo nội dung lệch khỏi thủ tục đã ban hành — kiểm tra `manifest.yaml`/`links.yaml` liên quan trước khi viết.

**Ràng buộc khi sửa:** không tự đổi mã/số của Capability, MP hay Module đã tồn tại (`CAP-xx`, `MPxx`, `Mxx`) — số này là khóa liên kết xuyên suốt 12 tầng; `_meta/validate_links.py` chỉ kiểm tra link còn trỏ đúng chỗ, không phát hiện được nếu đổi số làm sai ngữ nghĩa liên kết. Tài liệu có `doc_status: issued` trong `manifest.yaml` (đã ban hành) không sửa trực tiếp — tạo phiên bản/lần ban hành mới theo đúng quy trình MP14 (Kiểm soát tài liệu).

## Quy ước đặt tên

- Thư mục dùng **mã + tên gọi ngắn không dấu**: `MP01_RuiRo`, `M21_CongBoNangLuc`, `CAP-08_HieuChuan`.
- Thư mục con **đánh số** `01_, 02_, …` theo thứ tự logic/độ quan trọng — không bao giờ xếp theo ABC.
- `MPxx_Slug` = thủ tục, `Mxx_Slug` = module (số hóa MPxx, cùng số), `CAP-xx_Slug` = năng lực. **Mxx và MPxx luôn cùng một con số.**

### Mẫu Hub (`04_PROCESS_LIBRARY/MPxx_Slug/`)
Đúng 3 file, không hơn:
- `README.md` — tóm tắt cho người đọc (chủ sở hữu, căn cứ pháp luật, năng lực/module liên quan)
- `manifest.yaml` — schema: code, slug, name, owner, status, standards, legal, năng lực/module liên kết, metadata tài liệu kiểm soát, danh sách biểu mẫu
- `links.yaml` — **chỉ đường dẫn tương đối** tới tài liệu thủ tục, sổ tay chất lượng, module, biểu mẫu, skill, luật, bằng chứng, năng lực. Không bao giờ copy nội dung.

### Mẫu Module (`05_MODULE_LIBRARY/Mxx_Slug/`)
`README.md` + đúng 9 thư mục con đánh số, chuẩn hóa cho mọi module (không thêm README riêng cho từng thư mục con, đây là quy ước cố định):
`01_Requirement` (đặc tả/DacTa.md = nguồn sự thật) → `02_API` → `03_Database` → `04_UI` → `05_Report` → `06_Dashboard` → `07_Workflow` → `08_Source` (mã nguồn thật/nguyên mẫu) → `09_Release`.

Module chuẩn để tham chiếu phong cách/độ đầy đủ: **M36_ChungChiSo**. Module đã làm trọn từ đầu đến cuối (đặc tả → API → DB → UI → workflow → webapp chạy thật): **M10_DamBaoKQ**.

## Kiểm tra toàn vẹn

`_meta/validate_links.py` là công cụ kiểm tra cấu trúc — chạy sau khi chỉnh sửa bất kỳ thư mục Hub/module/năng lực nào:

```bash
python3 _meta/validate_links.py
```

Kiểm tra: (1) mọi link tương đối trong `links.yaml`/`capability.yaml` phải trỏ tới đường dẫn có thật, (2) mọi Hub `MPxx` phải đủ 3 file bắt buộc, (3) mọi module `Mxx` phải có `README.md`. Thoát với mã lỗi khác 0 nếu có vấn đề. Kiểm tra này cũng chạy trong CI (`.github/workflows/validate-links.yml`) ở mỗi lần push/PR.

## Cổng thông tin GitHub Pages (`docs/`)

Một trang duyệt tương tác gồm một file duy nhất (`docs/index.html`, không cần build, không phụ thuộc ngoài) giúp nhân sự và đoàn đánh giá duyệt toàn bộ repo và mở tài liệu qua liên kết sâu (`#/p/<đường-dẫn>`). Dữ liệu lấy từ `docs/data.json`, sinh ra bằng cách quét repo:

```bash
python3 _meta/build_site.py      # dựng lại docs/data.json sau khi thêm/sửa tài liệu
python3 -m http.server 8000      # xem thử tại local từ gốc repo, mở http://localhost:8000/docs/index.html
```

`.github/workflows/deploy-pages.yml` tự sinh lại `data.json` và deploy mỗi khi push lên `main` — chỉ cần tự chạy build khi xem thử ở local. Cổng thật: https://namdtvast.github.io/MANLAB-AIOS/

## Mã nguồn ứng dụng thật

Phần lớn các tầng chỉ là tài liệu/đặc tả thuần túy. Mã chạy thật tồn tại ở hai nơi:

- **`05_MODULE_LIBRARY/M10_DamBaoKQ/08_Source/`** — module duy nhất đã xây trọn vẹn. Node.js thuần (`api/`, không phụ thuộc npm, dùng `http` có sẵn) + webapp ES modules thuần (`webapp/`), một tiến trình phục vụ cả hai:
  ```bash
  cd "05_MODULE_LIBRARY/M10_DamBaoKQ/08_Source/api" && node server.js   # http://localhost:8010
  ```
  `api/rules.mjs` là bản triển khai **xác thực (authoritative)** của các control rule R1–R8 (validation, tách vai trò phê duyệt, chuyển trạng thái) — `webapp/src/rules.js` chỉ là bản mirror phía client để gating giao diện tức thời; server luôn là nguồn đúng. Dữ liệu lưu vào `api/data/data.json` (đã gitignore, khởi tạo từ seed khi chạy lần đầu); `POST /api/reset` để đặt lại dữ liệu seed. Phân quyền theo vai trò mô phỏng qua header `X-Role`, không phải xác thực thật — đây là nguyên mẫu có phạm vi rõ ràng, không phải hệ thống production.

- **`05_MODULE_LIBRARY/M21_CongBoNangLuc/08_Source/`** — một git **submodule** trỏ tới `https://github.com/namdtvast/manlab-p21.git`. Clone bằng `git submodule update --init --recursive` nếu thư mục đang trống.

Cấu hình dev-server đặt tên sẵn cho preview trong editor nằm ở `.claude/launch.json` (`docs-server`, `m10-webapp`, `m10-api`).

`09_ENGINEERING` hiện chỉ là khung sườn (README mô tả cấu trúc dự kiến cho Backend/Frontend/Mobile/API/Database/Testing/DevOps/CI-CD) — không phải nơi mã module thật sự nằm hiện nay; mã thật luôn ở trong `08_Source/` của từng module.

## Skill AI (`07_AI_OPERATING_SYSTEM/01_Skills/` và `.claude/skills/`)

Hai mẫu đặt tên skill — kiểm tra `07_AI_OPERATING_SYSTEM/01_Skills/README.md` trước khi thêm skill mới:
- **Mẫu A** (ưu tiên khi skill vận hành một thủ tục cụ thể): `S{số thủ tục}_{Slug}`, ví dụ `S14_KiemSoatTaiLieu` triển khai `ETV.P14`.
- **Mẫu B** (skill không gắn thủ tục nào): `{stt}_S_{Slug}` với `stt` là thứ tự tạo (không tái sử dụng số đã bỏ), ví dụ `02_S_XuLyVanPhong`.

Mỗi thư mục skill cần `SKILL.md` với frontmatter `name:` kebab-case (đây là định danh kích hoạt — không cần khớp chữ với tên thư mục PascalCase, nhưng bảng ánh xạ trong README skill phải luôn đồng bộ). Ràng buộc ISO 42001 áp cho tầng này: **AI không bao giờ được tự ra kết luận đo lường cuối cùng hoặc tự phê duyệt chứng chỉ/kết quả** — mọi agent triển khai phải có hồ sơ AIA theo MP29.

## Quy trình Git

- Commit message: theo phong cách Conventional Commits, gắn scope là tầng/module bị chỉnh sửa, viết tiếng Việt: `feat(M10): ...`, `docs(P01): ...`, `chore(M21): ...`, `refactor(P01): ...`.
- Luồng chuẩn: tạo nhánh mới → commit → PR vào `main` → merge (`--merge --delete-branch`) → đồng bộ `main` cục bộ. Có hook `post-commit` tự động push.
- File PDF lớn hơn giới hạn 100MB của GitHub bị loại trừ qua `.gitignore` và chỉ giữ ở local (xem hai dòng dưới `08_KNOWLEDGE_GRAPH/14_Technical_References/`) — không cố force-add các file này.
