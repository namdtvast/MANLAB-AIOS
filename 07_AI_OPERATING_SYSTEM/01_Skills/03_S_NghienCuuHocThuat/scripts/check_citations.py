#!/usr/bin/env python3
"""Phát hiện định dạng DOI trong một file hoặc toàn bộ một thư mục.

Cách dùng:
    python scripts/check_citations.py <file_hoac_thu_muc>

Nếu là thư mục, script duyệt đệ quy các file văn bản (.md, .txt, .csv, .yaml,
.yml). Script chỉ kiểm tra ĐỊNH DẠNG DOI, không xác minh DOI có tồn tại thật.
"""
import re
import sys
from pathlib import Path

PATTERNS = [
    r"doi:\s*10\.\d{4,9}/[-._;()/:A-Za-z0-9]+",
    r"https?://doi\.org/10\.\d{4,9}/[-._;()/:A-Za-z0-9]+",
]
TEXT_SUFFIXES = {".md", ".txt", ".csv", ".yaml", ".yml"}


def iter_files(target: Path):
    if target.is_dir():
        for path in sorted(target.rglob("*")):
            if path.is_file() and path.suffix.lower() in TEXT_SUFFIXES:
                yield path
    else:
        yield target


def main() -> int:
    if len(sys.argv) != 2:
        print("Cách dùng: python scripts/check_citations.py <file_hoac_thu_muc>")
        return 2
    target = Path(sys.argv[1])
    if not target.exists():
        print(f"Không tìm thấy: {target}")
        return 2

    total = 0
    files = 0
    for path in iter_files(target):
        try:
            text = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        files += 1
        hits = []
        for pat in PATTERNS:
            hits += re.findall(pat, text, re.I)
        if hits:
            print(f"{path}: {len(hits)} DOI-like")
        total += len(hits)

    print(f"Đã quét {files} file. Tổng DOI-like: {total}")
    print("Lưu ý: script chỉ phát hiện định dạng, không xác minh DOI tồn tại.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
