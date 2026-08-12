# AGENTS.md — OpenAI Codex Instructions

This file governs OpenAI Codex and other agents that support `AGENTS.md`.

## Skill identity

- Skill name: `thiet-ke-ai`
- Skill directory: `04_S_ThietKeAI`
- Primary entry: `SKILL.md`
- Design contract: `DESIGN.md`
- ETV design system: `design-systems/etv/DESIGN.md`

## Startup sequence

Before creating or editing any design artifact:

1. Read `SKILL.md`.
2. Read `DESIGN.md`.
3. For ManLab-AIOS or ETV work, read `design-systems/etv/DESIGN.md` and `tokens.json`.
4. Read the relevant module under `skills/` and workflow under `workflows/`.
5. Apply `global/QUALITY-GATES.md` before delivery.

## Required behavior

- Preserve Vietnamese diacritics and technical terminology.
- Separate factual content from visual interpretation.
- Produce editable sources whenever practical.
- Never fabricate logos, certifications, measurements, citations, standards or regulatory claims.
- Do not approve certificates, measurement conclusions or regulated decisions.
- Store generated files under `outputs/` and include a manifest.
- State uncertainties and items requiring human confirmation.

## Codex execution guidance

- Inspect existing files before modifying them.
- Prefer minimal, reversible changes.
- Do not overwrite user assets without creating a backup or receiving explicit permission.
- Run `python3 scripts/validate_repo.py` after structural changes.
- When generating HTML, validate paths and open the result locally when tools permit.
- When generating scripts, include error handling and avoid destructive defaults.

## Default design system

For ManLab-AIOS and ETV, use:

- `design-systems/etv/DESIGN.md`
- `design-systems/etv/tokens.json`
- `design-systems/etv/components.md`
