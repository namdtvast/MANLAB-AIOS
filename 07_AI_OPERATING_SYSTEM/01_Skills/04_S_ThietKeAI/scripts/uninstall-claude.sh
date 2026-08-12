#!/usr/bin/env bash
set -euo pipefail
TARGET_DIR="${CLAUDE_HOME:-$HOME/.claude}/skills/04_S_ThietKeAI"
rm -rf "$TARGET_DIR"
echo "Đã gỡ Claude skill: $TARGET_DIR"
