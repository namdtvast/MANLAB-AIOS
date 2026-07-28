#!/usr/bin/env python3
"""
Validate SKILL.md files against skills_schema.json.

Usage:
  python3 _meta/validate_skill_schema.py
  python3 _meta/validate_skill_schema.py S14_KiemSoatTaiLieu
"""

import json
import sys
import re
from pathlib import Path
import argparse

try:
    from jsonschema import validate, ValidationError
except ImportError:
    print("Error: jsonschema not installed. Run: pip install jsonschema")
    sys.exit(1)


def parse_yaml_frontmatter(text: str) -> dict:
    """Parse YAML frontmatter from markdown. Simple parser, not full YAML."""
    frontmatter_match = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not frontmatter_match:
        raise ValueError("No frontmatter found (should start with ---)")

    frontmatter_text = frontmatter_match.group(1)
    data = {}

    # Simple line-by-line parser
    for line in frontmatter_text.strip().split("\n"):
        if not line.strip() or line.startswith("#"):
            continue

        if ":" not in line:
            continue

        key, value = line.split(":", 1)
        key = key.strip()
        value = value.strip()

        # Handle arrays: "scope: [claude-code, cursor]"
        if value.startswith("[") and value.endswith("]"):
            items = [item.strip() for item in value[1:-1].split(",")]
            data[key] = items
        # Handle booleans
        elif value.lower() in ("true", "yes"):
            data[key] = True
        elif value.lower() in ("false", "no"):
            data[key] = False
        # Handle quoted strings
        elif (value.startswith('"') and value.endswith('"')) or \
             (value.startswith("'") and value.endswith("'")):
            data[key] = value[1:-1]
        # Handle nested objects (e.g., security)
        elif value == "{}":
            data[key] = {}
        else:
            data[key] = value

    return data


def validate_skill(skill_dir: Path, schema: dict) -> bool:
    """Validate a single skill directory. Returns True if valid."""
    skill_file = skill_dir / "SKILL.md"

    if not skill_file.exists():
        print(f"  ✗ {skill_dir.name}: SKILL.md not found")
        return False

    try:
        content = skill_file.read_text(encoding="utf-8")
        frontmatter = parse_yaml_frontmatter(content)

        # Validate against schema
        validate(instance=frontmatter, schema=schema)
        print(f"  ✓ {skill_dir.name}: valid")
        return True

    except ValidationError as e:
        print(f"  ✗ {skill_dir.name}: validation error")
        print(f"    Field: {e.path[0] if e.path else 'root'}")
        print(f"    Error: {e.message}")
        return False
    except ValueError as e:
        print(f"  ✗ {skill_dir.name}: {e}")
        return False
    except Exception as e:
        print(f"  ✗ {skill_dir.name}: unexpected error: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(
        description="Validate SKILL.md files against schema"
    )
    parser.add_argument(
        "skill_name", nargs="?", help="Specific skill directory to validate"
    )

    args = parser.parse_args()

    # Load schema
    schema_file = Path("_meta/skills_schema.json")
    if not schema_file.exists():
        print(f"Error: Schema file not found at {schema_file}")
        sys.exit(1)

    schema = json.loads(schema_file.read_text(encoding="utf-8"))

    # Find skills to validate
    skills_dir = Path("07_AI_OPERATING_SYSTEM/01_Skills")
    if not skills_dir.exists():
        print(f"Error: Skills directory not found at {skills_dir}")
        sys.exit(1)

    skills_to_validate = []

    if args.skill_name:
        skill_path = skills_dir / args.skill_name
        if not skill_path.exists():
            print(f"Error: Skill not found at {skill_path}")
            sys.exit(1)
        skills_to_validate = [skill_path]
    else:
        # Validate all skills
        skills_to_validate = sorted(
            list(skills_dir.glob("S*_*")) + list(skills_dir.glob("*_S_*"))
        )
        skills_to_validate = [d for d in skills_to_validate if d.is_dir()]

    if not skills_to_validate:
        print("No skills found to validate")
        return

    print(f"Validating {len(skills_to_validate)} skill(s)...\n")

    valid_count = 0
    for skill_dir in skills_to_validate:
        if validate_skill(skill_dir, schema):
            valid_count += 1

    print(f"\n{valid_count}/{len(skills_to_validate)} skill(s) valid")

    if valid_count < len(skills_to_validate):
        sys.exit(1)


if __name__ == "__main__":
    main()
