#!/usr/bin/env python3
# Kiểm tra tính toàn vẹn link giữa các tầng. Chạy: python3 _meta/validate_links.py
import os,glob,re,sys
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
broken=checked=0
for pat in ("04_PROCESS_LIBRARY/MP*/links.yaml","02_CAPABILITIES/*/capability.yaml"):
    for f in glob.glob(os.path.join(root,pat)):
        base=os.path.dirname(f)
        for line in open(f,encoding="utf-8"):
            m=re.search(r'(\.\./[^\s]+)',line)
            if not m: continue
            checked+=1
            if not os.path.exists(os.path.normpath(os.path.join(base,m.group(1)))):
                broken+=1; print("BROKEN:",os.path.relpath(f,root),"->",m.group(1))
print(f"Checked {checked} links. Broken: {broken}")
sys.exit(1 if broken else 0)
