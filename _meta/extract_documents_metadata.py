#!/usr/bin/env python3
"""
Extract document metadata from 03_MANAGEMENT_SYSTEM and 06_SHARED_RESOURCES/01_Forms
for the "Khám phá" (Explore) view on the website.
"""

import os
import json
import re
from pathlib import Path
from datetime import datetime

REPO_ROOT = Path(__file__).parent.parent
MANAGEMENT_SYSTEM_DIR = REPO_ROOT / "03_MANAGEMENT_SYSTEM"

# Biểu mẫu gốc nằm ở tầng 06 (một nguồn sự thật), KHÔNG ở 03_MANAGEMENT_SYSTEM/04_F — thư mục
# đó nay chỉ là mục lục điều hướng. Không quét thêm root này thì bảng danh mục ở tab "Khám phá"
# mất sạch biểu mẫu, vì trước 31/08/2026 nó chỉ thấy được các bản sao trong 04_F.
FORMS_DIR = REPO_ROOT / "06_SHARED_RESOURCES" / "01_Forms"
SCAN_DIRS = [MANAGEMENT_SYSTEM_DIR, FORMS_DIR]


def scan_root_of(path):
    """Thư mục quét chứa `path` — dùng cho relative_path; mặc định về gốc repo."""
    for base in SCAN_DIRS:
        if base in path.parents:
            return base
    return REPO_ROOT


def walk_scan_dirs():
    """os.walk qua mọi thư mục quét, bỏ qua thư mục không tồn tại."""
    for base in SCAN_DIRS:
        if base.exists():
            yield from os.walk(base)

def parse_yaml_value(value_str):
    """Simple YAML value parser."""
    value_str = value_str.strip()

    # Handle quoted strings
    if value_str.startswith('"') and value_str.endswith('"'):
        return value_str[1:-1]
    if value_str.startswith("'") and value_str.endswith("'"):
        return value_str[1:-1]

    # Handle lists
    if value_str.startswith('[') and value_str.endswith(']'):
        list_str = value_str[1:-1]
        # Parse list while respecting quotes
        items = []
        current_item = ""
        in_quotes = False
        quote_char = None

        escaped = False
        for char in list_str:
            # Dấu nháy đứng sau '\\' là ký tự literal bên trong chuỗi (vd \\"Nghị định 107\\"),
            # không phải dấu đóng chuỗi — bỏ qua nó khi xét trạng thái in_quotes.
            if escaped:
                escaped = False
                current_item += char
                continue
            if char == '\\' and in_quotes:
                escaped = True
                continue
            if char in ('"', "'") and (not in_quotes or char == quote_char):
                # Dấu nháy bao ngoài chỉ là ký tự phân giới: không đưa vào giá trị.
                # Nhờ vậy dấu nháy literal ở cuối chuỗi (…ghi tắt \\"Nghị định 107\\")
                # không bị .strip('"') cắt nhầm cùng dấu đóng chuỗi.
                if in_quotes and char == quote_char:
                    in_quotes = False
                    quote_char = None
                else:
                    in_quotes = True
                    quote_char = char
                continue
            elif char == ',' and not in_quotes:
                # End of item
                item = current_item.strip()
                if item:
                    items.append(item)
                current_item = ""
                continue

            current_item += char

        # Don't forget the last item
        item = current_item.strip()
        if item:
            items.append(item)

        return items

    # Handle boolean
    if value_str.lower() in ('true', 'false'):
        return value_str.lower() == 'true'

    # Handle null
    if value_str.lower() in ('null', 'none', ''):
        return None

    return value_str

def strip_inline_comment(value_str):
    """Cắt phần comment '# ...' ở cuối một giá trị YAML không nằm trong ngoặc kép."""
    in_quotes = False
    quote_char = None
    for i, char in enumerate(value_str):
        if char in ('"', "'"):
            if in_quotes and char == quote_char:
                in_quotes = False
                quote_char = None
            elif not in_quotes:
                in_quotes = True
                quote_char = char
        elif char == '#' and not in_quotes and (i == 0 or value_str[i - 1] in ' \t'):
            return value_str[:i]
    return value_str

def as_list(value):
    """Quy giá trị frontmatter về list.

    Một khoá để rỗng trong YAML ("iso_clause:") được parse_yaml_value trả về None,
    và một khoá chỉ có một giá trị không đóng ngoặc trả về str — cả hai đều không
    lặp được như list. Hàm này chuẩn hoá cả hai trường hợp.
    """
    if value is None:
        return []
    if isinstance(value, list):
        return value
    return [value]

def extract_frontmatter(md_file):
    """Extract YAML frontmatter from markdown file."""
    try:
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Match YAML frontmatter between --- delimiters
        match = re.match(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
        if not match:
            return None

        yaml_text = match.group(1)
        frontmatter = {}
        block_key = None  # khoá đang gom các mục của một list kiểu block

        for raw_line in yaml_text.split('\n'):
            # Mục của list kiểu block ("  - giá trị") phải được nhận diện TRƯỚC khi
            # strip, vì sau khi strip nó vẫn chứa dấu ':' (vd '- "ISO 9001:2015 §8.1"')
            # nên logic split(':') phía dưới sẽ hiểu nhầm thành một khoá mới.
            if block_key is not None and raw_line.startswith((' ', '\t')) and raw_line.strip().startswith('- '):
                item = strip_inline_comment(raw_line.strip()[2:])
                item = item.strip().strip('"\'')
                if item:
                    frontmatter[block_key].append(item)
                continue

            line = raw_line.strip()
            if not line or line.startswith('#'):
                continue

            if ':' not in line:
                block_key = None
                continue

            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip()

            # Khoá không có giá trị trên cùng dòng: có thể là list kiểu block ở
            # các dòng sau, cũng có thể chỉ là khoá bỏ trống.
            if value == '' or value.startswith('#'):
                frontmatter[key] = []
                block_key = key
                continue

            block_key = None
            frontmatter[key] = parse_yaml_value(strip_inline_comment(value))

        return frontmatter
    except Exception as e:
        print(f"Error parsing {md_file}: {e}")
        return None

def extract_author_info(md_file):
    """Extract author, reviewer, approver from markdown content."""
    try:
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()

        author = reviewer = approver = None

        # Look for pattern: | **Biên soạn** | Name | or | Biên soạn | Name |
        match = re.search(r'\|\s*\*?\*?Biên soạn\*?\*?\s*\|\s*([^|]+)\s*\|', content)
        if match:
            author = match.group(1).strip()

        match = re.search(r'\|\s*\*?\*?Soát xét\*?\*?\s*\|\s*([^|]+)\s*\|', content)
        if match:
            reviewer = match.group(1).strip()

        match = re.search(r'\|\s*\*?\*?Phê duyệt\*?\*?\s*\|\s*([^|]+)\s*\|', content)
        if match:
            approver = match.group(1).strip()

        return author, reviewer, approver
    except Exception as e:
        print(f"Error extracting author info from {md_file}: {e}")
        return None, None, None

def extract_code_from_filename(filename):
    """Extract code from filename (e.g., ETV.QM, ETV.P14, ETV.P.F14.01)."""
    # Remove extension
    name = filename.rsplit('.', 1)[0]

    # For ETV.QM_* files, append the variant for distinction
    # ETV.QM_ChinhSachChatLuong -> ETV.QM.ChinhSach
    if name.startswith('ETV.QM_'):
        parts = name.split('_')
        variant = parts[1][:3].upper() if len(parts) > 1 else ''  # ChinhSachChatLuong -> CHI, MucTieuChatLuong -> MUC
        return f"ETV.QM.{variant}"

    # Extract code pattern: ETV.* up to the next underscore or end
    match = re.match(r'^(ETV\.[^_]+)', name)
    if match:
        return match.group(1)
    return name

def scan_documents():
    """Quét 03_MANAGEMENT_SYSTEM và 06_SHARED_RESOURCES/01_Forms, rút metadata tài liệu."""
    documents = {}  # Use dict to avoid duplicates

    if not MANAGEMENT_SYSTEM_DIR.exists():
        print(f"Error: {MANAGEMENT_SYSTEM_DIR} not found")
        return []
    if not FORMS_DIR.exists():
        print(f"Error: {FORMS_DIR} not found")
        return []

    # First pass: process .md files (they have priority)
    for root, dirs, files in walk_scan_dirs():
        for file in files:
            if file.endswith('.md') and not file.startswith('_') and not file.startswith('README'):
                md_path = Path(root) / file

                # Extract frontmatter
                frontmatter = extract_frontmatter(md_path)

                code = extract_code_from_filename(file)

                # If has frontmatter, use it; otherwise infer from filename
                if frontmatter:
                    code = frontmatter.get('id') or code
                    # Extract author info from content
                    author, reviewer, approver = extract_author_info(md_path)

                    # Build document record
                    doc = {
                        'code': code,
                        'title': frontmatter.get('title') or file,
                        'type': frontmatter.get('type') or '',
                        'status': frontmatter.get('status') or '',
                        'effective_date': str(frontmatter.get('effective_date') or ''),
                        'revision': str(frontmatter.get('revision') or ''),
                        'author': author or frontmatter.get('owner') or '',
                        'reviewer': reviewer or '',
                        'approver': approver or '',
                        # Khoá có mặt nhưng để rỗng (vd "iso_clause:") được parser trả về None,
                        # không phải [] — phải quy về list trước khi lặp ở dưới.
                        'iso_clause': as_list(frontmatter.get('iso_clause')),
                        'legal_basis': as_list(frontmatter.get('legal_basis')),
                        'file_path': str(md_path.relative_to(REPO_ROOT)),
                        'relative_path': str(md_path.relative_to(scan_root_of(md_path))),
                    }

                    # Extract every distinct ISO standard mentioned across iso_clause (not just the first).
                    # Only the 5 standards of ETV's integrated management system count as "Chuẩn ISO" scope;
                    # other cross-references (vocab/guides like ISO 9000, ISO 19011, ISO/IEC 17043/17000)
                    # stay in iso_clause but are excluded from this summary column.
                    CORE_ISO_NUMBERS = {'9001', '17025', '17034', '27001', '42001'}
                    iso_standards = []
                    for clause in doc['iso_clause']:
                        # Extract ISO number (e.g., "ISO/IEC 17025:2017" from "ISO/IEC 17025:2017 §7.7")
                        match = re.search(r'(ISO[^\s]* (\d{4,5})(?::\d{4})?)', clause)
                        if match and match.group(2) in CORE_ISO_NUMBERS:
                            standard = match.group(1).strip()
                            if standard not in iso_standards:
                                iso_standards.append(standard)
                    iso_standard = ', '.join(iso_standards) if iso_standards else None

                    doc['iso_standard'] = iso_standard or ''
                else:
                    # No frontmatter - infer from filename
                    doc = {
                        'code': code,
                        'title': file.rsplit('.', 1)[0].replace('_', ' '),
                        'type': 'Biểu-mẫu' if '.F' in code else 'Thủ-tục',
                        'status': 'Da-phe-duyet',
                        'effective_date': '',
                        'revision': '',
                        'author': '',
                        'reviewer': '',
                        'approver': '',
                        'iso_clause': [],
                        'legal_basis': [],
                        'file_path': str(md_path.relative_to(REPO_ROOT)),
                        'relative_path': str(md_path.relative_to(scan_root_of(md_path))),
                        'iso_standard': '',
                    }

                documents[code] = doc

    # Second pass: add .docx and .doc files that don't have .md version
    md_codes = set(documents.keys())
    for root, dirs, files in walk_scan_dirs():
        for file in files:
            if file.endswith('.docx') or file.endswith('.doc'):
                # Extract code from filename
                code = extract_code_from_filename(file)

                # Skip if we already have a .md version
                if code in md_codes:
                    continue

                doc_path = Path(root) / file

                # For doc/docx files, infer metadata from filename
                doc = {
                    'code': code,
                    'title': file.rsplit('.', 1)[0].replace('_', ' '),  # Convert filename to title
                    'type': 'Biểu-mẫu' if 'F' in code else 'Sổ-tay' if 'QM' in code else 'Thủ-tục',
                    'status': '',
                    'effective_date': '',
                    'revision': '',
                    'author': '',
                    'reviewer': '',
                    'approver': '',
                    'iso_clause': [],
                    'legal_basis': [],
                    'file_path': str(doc_path.relative_to(REPO_ROOT)),
                    'relative_path': str(doc_path.relative_to(scan_root_of(doc_path))),
                    'iso_standard': '',
                }
                documents[code] = doc

    # Convert to sorted list
    doc_list = sorted(documents.values(), key=lambda x: x['code'])
    return doc_list

def main():
    """Extract and save documents metadata."""
    documents = scan_documents()

    print(f"Found {len(documents)} documents")
    for doc in documents:
        print(f"  - {doc['code']:15} {doc['title'][:50]:50}")

    # Save to JSON
    output_file = REPO_ROOT / 'docs' / 'documents.json'
    output_file.parent.mkdir(parents=True, exist_ok=True)

    output = {
        'generated_at': datetime.now().isoformat(),
        'total_documents': len(documents),
        'documents': documents
    }

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\nSaved to {output_file}")

if __name__ == '__main__':
    main()
