#!/usr/bin/env python3
from pathlib import Path
from datetime import date
import argparse, json, re
p=argparse.ArgumentParser(); p.add_argument('name'); p.add_argument('--type',default='artifact'); p.add_argument('--design-system',default='ETV')
a=p.parse_args(); root=Path(__file__).resolve().parents[1]
slug=re.sub(r'[^a-zA-Z0-9_-]+','-',a.name).strip('-').lower()
out=root/'outputs'/str(date.today())/slug; out.mkdir(parents=True,exist_ok=True)
manifest={"name":a.name,"artifactType":a.type,"version":"0.1","designSystem":a.design_system,"createdAt":str(date.today()),"files":[],"qualityGates":{},"uncertainties":[]}
(out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print(out)
