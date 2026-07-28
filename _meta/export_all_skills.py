#!/usr/bin/env python3
"""
Export all MANLAB skills to all supported IDE formats.

Chạy sau khi sửa bất kỳ SKILL.md nào để cập nhật export files.

Usage:
  python3 _meta/export_all_skills.py
"""

import subprocess
import sys
from pathlib import Path

def run_export(adapter_name: str, output_path: str, is_all: bool = True) -> bool:
    """Run a single adapter script."""
    script = Path("_meta") / f"export_skill_{adapter_name}.py"
    if not script.exists():
        print(f"⚠ Adapter not found: {script}")
        return False

    cmd = [sys.executable, str(script)]
    if is_all:
        cmd.extend(["--all", "--output", output_path])

    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        print(result.stdout.strip())
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ Export {adapter_name} failed:")
        print(e.stderr)
        return False

def main():
    exports = [
        ("cursor", ".cursor/skills.json"),
        # ("gemini", "~/.config/gemini-cli/skills.yaml"),  # Uncomment if implemented
        # ("vscode", ".vscode/copilot-skills.json"),        # Uncomment if implemented
        # ("openai", ".openai/skills.json"),                # Uncomment if implemented
    ]

    print("Exporting all skills to all IDE formats...\n")

    success_count = 0
    for adapter_name, output_path in exports:
        if run_export(adapter_name, output_path):
            success_count += 1

    print(f"\n✓ Exported {success_count}/{len(exports)} format(s)")

    if success_count < len(exports):
        sys.exit(1)

if __name__ == "__main__":
    main()
