#!/usr/bin/env python3
from pathlib import Path
import argparse, shutil, datetime

TEMPLATES = [
    "00_DOCUMENT_TYPE_CONFIRMATION.md","00_PROJECT_INTAKE_GUIDED.md","00_PROJECT_CHARTER.md",
    "01_RESEARCH_QUESTION.md","LITERATURE_MATRIX.csv","03_PROTOCOL.md","04_DATA_DICTIONARY.md",
    "05_ANALYSIS_PLAN.md","07_MANUSCRIPT.md","08_REVIEW_LOG.md","09_REPRODUCIBILITY.md",
    "MATERIAL_PASSPORT.md","CLAIM_EVIDENCE_LEDGER.csv","EXPERIMENT_PROVENANCE.md",
    "REVISION_TRACEABILITY_MATRIX.csv","SCORE_TRAJECTORY.csv","REPRO_LOCK.yaml",
    "AI_USE_DISCLOSURE.md","RESEARCH_RISK_REGISTER.csv","RESPONSE_TO_REVIEWERS.md"
]

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('target')
    ap.add_argument('--type',default='UNCONFIRMED')
    args=ap.parse_args()
    root=Path(__file__).resolve().parents[1]
    target=Path(args.target).expanduser().resolve()
    target.mkdir(parents=True,exist_ok=True)
    for d in ['sources','data/raw','data/processed','analysis','figures','reviews','outputs','archive']:
        (target/d).mkdir(parents=True,exist_ok=True)
    for name in TEMPLATES:
        src=root/'templates'/name
        if src.exists():
            shutil.copy2(src,target/name)
    profile = (
        "# PROJECT PROFILE\n\n"
        f"- Document type: {args.type}\n"
        "- Status: NOT_READY\n"
        f"- Created: {datetime.date.today()}\n"
        "- Current mode: guided\n"
    )
    (target/'PROJECT_PROFILE.md').write_text(profile,encoding='utf-8')
    decision = "# DECISION LOG\n\n| Date | Decision | Status | Owner | Basis |\n|---|---|---|---|---|\n"
    (target/'DECISION_LOG.md').write_text(decision,encoding='utf-8')
    print(f'Created project at {target}')

if __name__=='__main__':
    main()
