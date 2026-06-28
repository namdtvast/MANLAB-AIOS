#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Kiểm tra toàn vẹn MANLAB-AIOS: link giữa các tầng + cấu trúc Hub/Module.
Chạy: python3 _meta/validate_links.py"""
import os, glob, re, sys
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
issues = 0; checked = 0

# 1) Link tương đối trong links.yaml + capability.yaml phải tồn tại
for pat in ("04_PROCESS_LIBRARY/MP*/links.yaml", "02_CAPABILITIES/*/capability.yaml"):
    for f in glob.glob(os.path.join(root, pat)):
        base = os.path.dirname(f)
        for line in open(f, encoding="utf-8"):
            m = re.search(r'(\.\./[^\s]+)', line)
            if not m: continue
            checked += 1
            if not os.path.exists(os.path.normpath(os.path.join(base, m.group(1)))):
                issues += 1; print("LINK ĐỨT:", os.path.relpath(f, root), "->", m.group(1))

# 2) Mỗi MP Hub phải đủ 3 file
for mp in glob.glob(os.path.join(root, "04_PROCESS_LIBRARY/MP*")):
    if not os.path.isdir(mp): continue
    for need in ("README.md", "manifest.yaml", "links.yaml"):
        if not os.path.exists(os.path.join(mp, need)):
            issues += 1; print("THIẾU FILE HUB:", os.path.basename(mp), "->", need)

# 3) Mỗi Module phải có README
for md in glob.glob(os.path.join(root, "05_MODULE_LIBRARY/M*")):
    if os.path.isdir(md) and not os.path.exists(os.path.join(md, "README.md")):
        issues += 1; print("MODULE THIẾU README:", os.path.basename(md))

n_mp = len(glob.glob(os.path.join(root, "04_PROCESS_LIBRARY/MP*")))
n_m  = len(glob.glob(os.path.join(root, "05_MODULE_LIBRARY/M*")))
n_cap = len(glob.glob(os.path.join(root, "02_CAPABILITIES/CAP-*")))
print(f"Đã kiểm tra {checked} link · {n_mp} MP · {n_m} M · {n_cap} CAP. Vấn đề: {issues}")
sys.exit(1 if issues else 0)
