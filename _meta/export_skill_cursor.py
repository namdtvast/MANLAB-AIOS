#!/usr/bin/env python3
"""
Export MANLAB skills to Cursor format (.cursor/skills.json).

Usage:
  python3 _meta/export_skill_cursor.py S14_KiemSoatTaiLieu
  python3 _meta/export_skill_cursor.py --all --output .cursor/skills.json
"""

import json
import sys
import argparse
from pathlib import Path
import re

def parse_skill_markdown(skill_dir: Path) -> dict:
    """Parse SKILL.md and optional CLAUDE.md from a skill directory."""
    skill_file = skill_dir / "SKILL.md"
    claude_file = skill_dir / "CLAUDE.md"

    if not skill_file.exists():
        raise FileNotFoundError(f"{skill_file} not found")

    content = skill_file.read_text(encoding="utf-8")

    # Extract frontmatter
    frontmatter_match = re.match(r"^---\n(.*?)\n---\n", content, re.DOTALL)
    if not frontmatter_match:
        raise ValueError(f"No frontmatter in {skill_file}")

    frontmatter_text = frontmatter_match.group(1)
    body = content[frontmatter_match.end():]

    # Parse YAML frontmatter (simple parser)
    frontmatter = {}
    for line in frontmatter_text.split("\n"):
        if ":" in line:
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip()
            # Handle arrays
            if key == "scope" and value.startswith("["):
                value = json.loads(value)
            elif value.lower() == "true":
                value = True
            elif value.lower() == "false":
                value = False
            frontmatter[key] = value

    # Read CLAUDE.md if exists
    claude_content = ""
    if claude_file.exists():
        claude_content = claude_file.read_text(encoding="utf-8")

    return {
        "name": frontmatter.get("name", ""),
        "title": frontmatter.get("title", ""),
        "description": frontmatter.get("description", ""),
        "version": frontmatter.get("version", "1.0.0"),
        "procedure": frontmatter.get("procedure", ""),
        "tags": frontmatter.get("tags", []),
        "scope": frontmatter.get("scope", ["claude-code"]),
        "body": body.strip(),
        "claude_instructions": claude_content.strip(),
    }

def to_cursor_format(skill_data: dict) -> dict:
    """Convert skill data to Cursor format."""
    prompt = skill_data["body"]
    if skill_data["claude_instructions"]:
        prompt += f"\n\n---\n\n## Claude Code Instructions\n\n{skill_data['claude_instructions']}"

    return {
        "name": skill_data["name"],
        "title": skill_data["title"],
        "description": skill_data["description"],
        "prompt": prompt,
        "tags": skill_data["tags"],
        "version": skill_data["version"],
    }

def main():
    parser = argparse.ArgumentParser(description="Export MANLAB skills to Cursor format")
    parser.add_argument("skill_name", nargs="?", help="Skill directory name (e.g. S14_KiemSoatTaiLieu)")
    parser.add_argument("--all", action="store_true", help="Export all skills")
    parser.add_argument("--output", "-o", default=".cursor/skills.json", help="Output file path")

    args = parser.parse_args()

    skills_dir = Path("07_AI_OPERATING_SYSTEM/01_Skills")
    if not skills_dir.exists():
        print(f"Error: Skills directory not found at {skills_dir}", file=sys.stderr)
        sys.exit(1)

    skills_to_export = []

    if args.all:
        # Export all skills
        for skill_subdir in sorted(skills_dir.glob("S*_*")) + sorted(skills_dir.glob("*_S_*")):
            if skill_subdir.is_dir():
                try:
                    skill_data = parse_skill_markdown(skill_subdir)
                    # Only export if "cursor" is in scope
                    if "cursor" in skill_data.get("scope", []):
                        skills_to_export.append(to_cursor_format(skill_data))
                except Exception as e:
                    print(f"Warning: Failed to parse {skill_subdir}: {e}", file=sys.stderr)
    elif args.skill_name:
        # Export specific skill
        skill_dir = skills_dir / args.skill_name
        if not skill_dir.exists():
            print(f"Error: Skill directory not found at {skill_dir}", file=sys.stderr)
            sys.exit(1)
        skill_data = parse_skill_markdown(skill_dir)
        skills_to_export.append(to_cursor_format(skill_data))
    else:
        parser.print_help()
        sys.exit(1)

    # Write output
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(skills_to_export, f, ensure_ascii=False, indent=2)

    print(f"✓ Exported {len(skills_to_export)} skill(s) to {output_path}")

if __name__ == "__main__":
    main()
