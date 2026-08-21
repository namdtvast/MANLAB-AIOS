#!/usr/bin/env bash
# Kiểm tra tính toàn vẹn của skill 06_S_LapTrinhTheoDacTa.
# Chạy từ gốc repo (nơi có thư mục _meta/):
#   bash 07_AI_OPERATING_SYSTEM/01_Skills/06_S_LapTrinhTheoDacTa/scripts/validate-skill.sh
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../" && pwd)"
SKILL_DIR="07_AI_OPERATING_SYSTEM/01_Skills/06_S_LapTrinhTheoDacTa"

cd "$REPO_ROOT"

echo "== 1. Frontmatter schema (_meta/validate_skill_schema.py) =="
python3 _meta/validate_skill_schema.py "$(basename "$SKILL_DIR")"

echo
echo "== 2. File bắt buộc =="
required_files=(
  "$SKILL_DIR/SKILL.md"
  "$SKILL_DIR/CLAUDE.md"
  "$SKILL_DIR/references/recon.md"
  "$SKILL_DIR/references/outcome.md"
  "$SKILL_DIR/references/spec.md"
  "$SKILL_DIR/references/plan.md"
  "$SKILL_DIR/references/build.md"
  "$SKILL_DIR/references/verify.md"
  "$SKILL_DIR/references/security-checklist.md"
  "$SKILL_DIR/references/migration-rollout.md"
  "$SKILL_DIR/references/definition-of-done.md"
  "$SKILL_DIR/assets/feature-spec.md"
  "$SKILL_DIR/assets/implementation-plan.md"
  "$SKILL_DIR/assets/verification-report.md"
  "$SKILL_DIR/assets/change-report.md"
)

missing=0
for f in "${required_files[@]}"; do
  if [ ! -f "$f" ]; then
    echo "  ✗ thiếu: $f"
    missing=1
  fi
done
if [ "$missing" -eq 0 ]; then
  echo "  ✓ đủ ${#required_files[@]} file bắt buộc"
fi

echo
echo "== 3. Link nội bộ trong SKILL.md trỏ tới file có thật =="
python3 - "$SKILL_DIR" <<'PY'
import re, sys, pathlib

skill_dir = pathlib.Path(sys.argv[1])
text = (skill_dir / "SKILL.md").read_text(encoding="utf-8")
links = re.findall(r"\]\(((?:references|assets|examples)/[^)]+)\)", text)

missing = [l for l in links if not (skill_dir / l).exists()]
if missing:
    print(f"  ✗ {len(missing)} link hỏng:")
    for l in missing:
        print(f"    - {l}")
    sys.exit(1)
else:
    print(f"  ✓ {len(links)} link nội bộ đều hợp lệ")
PY

echo
echo "== 4. (Tuỳ chọn) validate_links.py toàn repo =="
echo "  Chỉ cần chạy nếu skill này vừa được dùng để sửa Hub/module/capability:"
echo "  python3 _meta/validate_links.py"
