# Repo 07 — ManLab Design AI

**Tên thư mục skill chuẩn:** `04_S_ThietKeAI`  
**Loại:** Skill dùng chung, không ánh xạ 1–1 với thủ tục ETV  
**Mẫu đặt tên:** Mẫu B — `{Số thứ tự}_S_{TênPascalCase}`  
**Frontmatter name:** `04-s-thiet-ke-ai`  
**Vị trí mapping chuẩn:** `07_AI_OPERATING_SYSTEM/01_Skills/04_S_ThietKeAI/`  
**AI hỗ trợ:** Claude Code, Claude Desktop có môi trường đọc skill, OpenAI Codex CLI/IDE và các agent đọc `SKILL.md`/`AGENTS.md`.

Bộ năng lực thiết kế dùng chung cho **ManLab-AIOS** và **Viện Kiểm định Công nghệ và Môi trường (ETV)**. Skill biến AI coding agent thành trợ lý thiết kế có quy trình, sử dụng `DESIGN.md` làm hợp đồng nhận diện thương hiệu.

## 1. Mục tiêu

- Chuẩn hóa UI/UX ManLab-AIOS, dashboard, website, mobile UI, infographic, slide và báo cáo.
- Tách rõ: yêu cầu thiết kế → design system → tạo sản phẩm → kiểm tra → xuất bản.
- Ưu tiên tiếng Việt, tính chính xác kỹ thuật, khả năng đọc và truy xuất nguồn.
- Dùng chung một design system cho nhiều loại sản phẩm.
- Không cho AI tự tạo số liệu, logo, chứng nhận, tiêu chuẩn hoặc kết luận kỹ thuật chưa được xác nhận.

## 2. Quy tắc đặt tên

Skill này không gắn với một thủ tục `ETV.P{N}`, nên áp dụng **Mẫu B**:

```text
04_S_ThietKeAI
```

Trong đó:

- `04`: số thứ tự tiếp theo của nhóm skill dùng chung; không tái sử dụng số đã bỏ.
- `S`: viết tắt của thư mục cha `01_Skills`.
- `ThietKeAI`: tên ngắn gọn, PascalCase liền và không dấu.
- Frontmatter trong `SKILL.md` dùng kebab-case: `04-s-thiet-ke-ai`.

## 3. Cài đặt và AI được hỗ trợ

Xem hướng dẫn nhanh tại [`INSTALL.md`](INSTALL.md).

### Claude Code

Claude Code đọc `SKILL.md`, `CLAUDE.md` và các tài liệu liên quan trong thư mục skill.

Cài global:

```bash
cd ~/Downloads
unzip Repo_07_ManLab_Design_AI_v2.1.0.zip
bash 04_S_ThietKeAI/scripts/install-claude.sh
```

Thư mục cài đặt:

```text
~/.claude/skills/04_S_ThietKeAI/
```

### OpenAI Codex

Codex sử dụng:

- `AGENTS.md` để nhận quy tắc làm việc của repo.
- `SKILL.md` để nhận diện và kích hoạt năng lực thiết kế.
- `DESIGN.md` để áp dụng design system.

Cài global:

```bash
cd ~/Downloads
unzip Repo_07_ManLab_Design_AI_v2.1.0.zip
bash 04_S_ThietKeAI/scripts/install-codex.sh
```

Thư mục cài đặt:

```text
~/.codex/skills/04_S_ThietKeAI/
```

Sau khi cài, mở Codex tại thư mục dự án và yêu cầu:

```text
Sử dụng skill 04-s-thiet-ke-ai để thiết kế dashboard quan trắc môi trường theo DESIGN.md của ETV.
```

Để tăng khả năng Codex tự nhận diện skill, có thể ghi trong `AGENTS.md` của dự án:

```text
- 04-s-thiet-ke-ai: Thiết kế UI/UX, dashboard, infographic, slide, báo cáo và prototype theo DESIGN.md. Skill: ~/.codex/skills/04_S_ThietKeAI/SKILL.md
```

### Cài cho cả Claude và Codex

```bash
bash 04_S_ThietKeAI/scripts/install-all.sh
```

## 4. Cách gọi skill

```text
Sử dụng skill 04-s-thiet-ke-ai để tạo infographic A4 dọc về quy trình hiệu chuẩn, theo nhận diện ETV, xuất PNG.
```

```text
Sử dụng skill 04-s-thiet-ke-ai để thiết kế dashboard quan trắc nước tự động. Lập brief, tạo prototype HTML và kiểm tra accessibility.
```

```text
Sử dụng skill 04-s-thiet-ke-ai để rà soát giao diện hiện có, chỉ ra lỗi về phân cấp thông tin, nhận diện ETV và khả năng sử dụng.
```

## 5. Quy trình mặc định

1. Phân loại sản phẩm và mục đích sử dụng.
2. Thu thập hoặc chuẩn hóa brief.
3. Đọc `DESIGN.md` và design tokens.
4. Chọn module chuyên môn theo `global/ROUTER.md`.
5. Tạo bản nháp có thể kiểm tra.
6. Review nội dung, thương hiệu, accessibility, responsive và dữ liệu.
7. Xuất file nguồn, file bàn giao và `manifest.json`.

## 6. Cấu trúc repo

```text
04_S_ThietKeAI/
├── SKILL.md                 # Điểm vào chung cho Claude và Codex
├── CLAUDE.md                # Quy tắc riêng cho Claude
├── AGENTS.md                # Quy tắc chuẩn cho Codex
├── DESIGN.md                # Hợp đồng thiết kế chung
├── design-systems/etv/      # Design system ETV
├── skills/                  # Các module thiết kế chuyên môn
├── templates/               # Brief, dashboard, slide, report, HTML
├── workflows/               # Quy trình thực hiện theo loại sản phẩm
├── references/              # Tài liệu tham chiếu
├── schemas/                 # Schema brief và manifest
├── scripts/                 # Cài đặt, gỡ cài đặt, kiểm tra
├── examples/                # Prompt mẫu
└── outputs/                 # Sản phẩm tạo ra
```

## 7. Gỡ cài đặt

Gỡ khỏi Claude:

```bash
bash 04_S_ThietKeAI/scripts/uninstall-claude.sh
```

Gỡ khỏi Codex:

```bash
bash 04_S_ThietKeAI/scripts/uninstall-codex.sh
```

Gỡ cả hai:

```bash
bash 04_S_ThietKeAI/scripts/uninstall-all.sh
```

## 8. Nguyên tắc bắt buộc

- Không tự tạo logo, số liệu, tiêu chuẩn, trích dẫn hoặc chứng nhận.
- Không làm đẹp bằng cách làm sai nội dung kỹ thuật.
- Infographic tiếng Việt phải kiểm tra dấu, font và chính tả.
- Dashboard phải thể hiện đơn vị đo, thời gian, trạng thái và nguồn dữ liệu.
- Sản phẩm ETV phải dùng `design-systems/etv/DESIGN.md`.
- AI không tự phê duyệt sản phẩm, chứng chỉ hay kết luận đo lường.
- Kết quả quan trọng phải có bước kiểm tra của con người.

## 9. Nguồn kế thừa

Repo kế thừa có chọn lọc các nguyên tắc từ `nexu-io/open-design`: local-first, agent-native design loop, `DESIGN.md`, kỹ năng có thể kết hợp, nhiều loại artifact và review trước khi giao. Repo không sao chép toàn bộ ứng dụng Open Design. Xem `NOTICE.md`.
