#!/usr/bin/env python3
from pathlib import Path
import json
import re
import sys

root = Path(__file__).resolve().parents[1]
required = [
    'SKILL.md', 'CLAUDE.md', 'AGENTS.md', 'DESIGN.md', 'README.md', 'INSTALL.md',
    '.claude-plugin/plugin.json', 'design-systems/etv/DESIGN.md',
    'design-systems/etv/tokens.json', 'global/ROUTER.md',
    'global/QUALITY-GATES.md', 'scripts/install-claude.sh',
    'scripts/install-codex.sh', 'scripts/install-all.sh', 'scripts/verify-install.sh'
]
errors = []

for rel in required:
    if not (root / rel).exists():
        errors.append(f'Thiếu {rel}')

for p in root.rglob('*.json'):
    try:
        json.loads(p.read_text(encoding='utf-8'))
    except Exception as exc:
        errors.append(f'JSON lỗi {p.relative_to(root)}: {exc}')

def parse_frontmatter(path: Path):
    text = path.read_text(encoding='utf-8')
    if not text.startswith('---\n'):
        errors.append(f'Thiếu frontmatter: {path.relative_to(root)}')
        return {}
    end = text.find('\n---', 4)
    if end < 0:
        errors.append(f'Frontmatter chưa đóng: {path.relative_to(root)}')
        return {}
    data = {}
    for line in text[4:end].splitlines():
        if ':' in line:
            key, value = line.split(':', 1)
            data[key.strip()] = value.strip()
    return data

def folder_name_to_kebab(folder_name: str) -> str:
    """Bản chuyển đổi cơ học tên thư mục -> kebab-case (xem CLAUDE.md gốc)."""
    parts = folder_name.split('_')
    spaced = [re.sub(r'(?<=[a-z0-9])(?=[A-Z])', '-', part).lower() for part in parts]
    return '-'.join(spaced)

if root.name != '04_S_ThietKeAI':
    errors.append(f'Tên thư mục gốc không đúng: {root.name}')

expected_name = folder_name_to_kebab(root.name)

root_fm = parse_frontmatter(root / 'SKILL.md')
if root_fm.get('name') != expected_name:
    errors.append(f"SKILL.md phải có frontmatter name: {expected_name} (đang là {root_fm.get('name')!r})")
if root_fm.get('version') != '2.1.0':
    errors.append('SKILL.md phải có version: 2.1.0')

kebab = re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')
for p in sorted(root.glob('skills/*/SKILL.md')):
    fm = parse_frontmatter(p)
    name = fm.get('name', '')
    if not kebab.fullmatch(name):
        errors.append(f'name không phải kebab-case: {p.relative_to(root)} -> {name!r}')

plugin = root / '.claude-plugin/plugin.json'
if plugin.exists():
    obj = json.loads(plugin.read_text(encoding='utf-8'))
    if obj.get('name') != expected_name:
        errors.append(f"plugin.json phải có name = {expected_name} (đang là {obj.get('name')!r})")
    if obj.get('version') != '2.1.0':
        errors.append('plugin.json phải có version = 2.1.0')

if errors:
    print('\n'.join(f'ERROR: {e}' for e in errors))
    sys.exit(1)
print(f'VALID: 04_S_ThietKeAI v2.1.0 | skill={expected_name} | Claude+Codex')
