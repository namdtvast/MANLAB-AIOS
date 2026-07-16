#!/usr/bin/env python3
from pathlib import Path
import sys
root=Path(__file__).resolve().parents[1]
required=['SKILL.md','README.md','ATTRIBUTION.md','LICENSE','docs/ARCHITECTURE.md','MODE_REGISTRY.md','quality-gates/GATES.md','shared/handoff_schemas.md','shared/material_passport.md','templates/MATERIAL_PASSPORT.md','templates/CLAIM_EVIDENCE_LEDGER.csv','templates/REPRO_LOCK.yaml']
missing=[x for x in required if not (root/x).exists()]
counts={d:len(list((root/d).glob('*.md'))) for d in ['agents','workflows','references','shared','document-types']}
print('Counts:',counts)
if missing:
    print('MISSING:')
    for x in missing:
        print('-',x)
    sys.exit(1)
if counts['agents']<20 or counts['workflows']<10:
    print('Repo chưa đạt quy mô tối thiểu')
    sys.exit(1)
print('PASS: repository structure is valid')
