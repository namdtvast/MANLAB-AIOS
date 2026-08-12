# Cài đặt skill `thiet-ke-ai`

## Cài cho Claude và Codex

Mở Terminal tại thư mục `04_S_ThietKeAI`, chạy:

```bash
bash scripts/install-all.sh
bash scripts/verify-install.sh
```

Vị trí cài mặc định:

```text
~/.claude/skills/04_S_ThietKeAI/
~/.codex/skills/04_S_ThietKeAI/
```

## Chỉ cài Claude

```bash
bash scripts/install-claude.sh
```

## Chỉ cài Codex

```bash
bash scripts/install-codex.sh
```

## Gỡ cài đặt

```bash
bash scripts/uninstall-all.sh
```

## Kiểm tra repo trước khi cài

```bash
python3 scripts/validate_repo.py
```

## Cách gọi

```text
Sử dụng skill thiet-ke-ai để thiết kế infographic A4 dọc theo nhận diện ETV và xuất PNG.
```
