#!/usr/bin/env bash
set -euo pipefail
CLAUDE_DIR="${CLAUDE_HOME:-$HOME/.claude}/skills/04_S_ThietKeAI"
CODEX_DIR="${CODEX_HOME:-$HOME/.codex}/skills/04_S_ThietKeAI"
status=0
for item in "Claude:$CLAUDE_DIR" "Codex:$CODEX_DIR"; do
  name="${item%%:*}"; dir="${item#*:}"
  if [[ -f "$dir/SKILL.md" ]] && grep -q '^name: thiet-ke-ai$' "$dir/SKILL.md"; then
    echo "OK $name: $dir"
  else
    echo "MISSING/INVALID $name: $dir" >&2
    status=1
  fi
done
exit "$status"
