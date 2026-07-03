#!/usr/bin/env python3
"""
Extract document metadata from 03_MANAGEMENT_SYSTEM files
for the "Khám phá" (Explore) view on the website.
"""

import os
import json
import re
from pathlib import Path
from datetime import datetime

MANAGEMENT_SYSTEM_DIR = Path(__file__).parent.parent / "03_MANAGEMENT_SYSTEM"

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

        for char in list_str:
            if char in ('"', "'") and (not in_quotes or char == quote_char):
                if in_quotes and char == quote_char:
                    in_quotes = False
                    quote_char = None
                else:
                    in_quotes = True
                    quote_char = char
            elif char == ',' and not in_quotes:
                # End of item
                item = current_item.strip().strip('"\'')
                if item:
                    items.append(item)
                current_item = ""
                continue

            current_item += char

        # Don't forget the last item
        item = current_item.strip().strip('"\'')
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

        for line in yaml_text.split('\n'):
            line = line.strip()
            if not line or line.startswith('#'):
                continue

            if ':' not in line:
                continue

            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip()

            frontmatter[key] = parse_yaml_value(value)

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
    """Scan 03_MANAGEMENT_SYSTEM and extract document metadata."""
    documents = {}  # Use dict to avoid duplicates

    if not MANAGEMENT_SYSTEM_DIR.exists():
        print(f"Error: {MANAGEMENT_SYSTEM_DIR} not found")
        return []

    # First pass: process .md files (they have priority)
    for root, dirs, files in os.walk(MANAGEMENT_SYSTEM_DIR):
        for file in files:
            if file.endswith('.md') and not file.startswith('_') and not file.startswith('README'):
                md_path = Path(root) / file

                # Extract frontmatter
                frontmatter = extract_frontmatter(md_path)

                code = extract_code_from_filename(file)

                # If has frontmatter, use it; otherwise infer from filename
                if frontmatter:
                    code = frontmatter.get('id', code)
                    # Extract author info from content
                    author, reviewer, approver = extract_author_info(md_path)

                    # Build document record
                    doc = {
                        'code': code,
                        'title': frontmatter.get('title', file),
                        'type': frontmatter.get('type', ''),
                        'status': frontmatter.get('status', ''),
                        'effective_date': frontmatter.get('effective_date', ''),
                        'revision': str(frontmatter.get('revision', '')),
                        'author': author or frontmatter.get('owner', ''),
                        'reviewer': reviewer or '',
                        'approver': approver or '',
                        'iso_clause': frontmatter.get('iso_clause', []),
                        'legal_basis': frontmatter.get('legal_basis', []),
                        'file_path': str(md_path.relative_to(MANAGEMENT_SYSTEM_DIR.parent)),
                        'relative_path': str(md_path.relative_to(MANAGEMENT_SYSTEM_DIR)),
                    }

                    # Extract first ISO standard from iso_clause
                    iso_standard = None
                    if doc['iso_clause']:
                        for clause in doc['iso_clause']:
                            # Extract ISO number (e.g., "ISO/IEC 17025:2017" from "ISO/IEC 17025:2017 §7.7")
                            match = re.search(r'(ISO[^\s]* \d{4,5}(?::\d{4})?)', clause)
                            if match:
                                iso_standard = match.group(1).strip()
                                break

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
                        'file_path': str(md_path.relative_to(MANAGEMENT_SYSTEM_DIR.parent)),
                        'relative_path': str(md_path.relative_to(MANAGEMENT_SYSTEM_DIR)),
                        'iso_standard': '',
                    }

                documents[code] = doc

    # Second pass: add .docx and .doc files that don't have .md version
    md_codes = set(documents.keys())
    for root, dirs, files in os.walk(MANAGEMENT_SYSTEM_DIR):
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
                    'file_path': str(doc_path.relative_to(MANAGEMENT_SYSTEM_DIR.parent)),
                    'relative_path': str(doc_path.relative_to(MANAGEMENT_SYSTEM_DIR)),
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
    output_file = MANAGEMENT_SYSTEM_DIR.parent / 'docs' / 'documents.json'
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
