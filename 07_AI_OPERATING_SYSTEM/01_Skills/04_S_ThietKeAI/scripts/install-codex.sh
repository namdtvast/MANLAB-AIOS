#!/usr/bin/env bash
set -euo pipefail
SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="${CODEX_HOME:-$HOME/.codex}/skills/04_S_ThietKeAI"
mkdir -p "$(dirname "$TARGET_DIR")"
rm -rf "$TARGET_DIR"
cp -R "$SOURCE_DIR" "$TARGET_DIR"
echo "Đã cài Codex skill tại: $TARGET_DIR"
echo "Codex sẽ sử dụng SKILL.md và AGENTS.md trong thư mục này."
