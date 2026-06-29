#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_site.py — Quét toàn bộ repo MANLAB-AIOS và sinh ra docs/data.json
phục vụ cho cổng thông tin tương tác (docs/index.html).

Chạy:  python3 _meta/build_site.py
Không cần thư viện ngoài (tự parse YAML đơn giản).
"""

import json
import os
import re
import subprocess
from datetime import datetime, timezone

# ---------------------------------------------------------------------------
# Cấu hình
# ---------------------------------------------------------------------------
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "docs")
OUT_FILE = os.path.join(OUT_DIR, "data.json")

EXCLUDE_DIRS = {".git", "node_modules", ".github", "docs"}
EXCLUDE_FILES = {".DS_Store"}
# Phần mở rộng được coi là "tài liệu" có thể mở/xem
DOC_EXTS = {".docx", ".pdf", ".xlsx", ".pptx", ".doc", ".xls", ".ppt"}

# Mô tả 12 tầng (lấy từ README.md gốc)
TIERS = {
    "01_ENTERPRISE":        {"title": "Enterprise",        "answer": "Vì sao Viện tồn tại",        "store": "Chiến lược, tổ chức, lộ trình",            "star": False},
    "02_CAPABILITIES":      {"title": "Capabilities",      "answer": "Viện làm được gì",            "store": "Năng lực CAP-xx + link tới MP",            "star": True},
    "03_MANAGEMENT_SYSTEM": {"title": "Management System", "answer": "Theo luật chơi nào",          "store": "Chuẩn mực ISO + ETV.QM",                   "star": False},
    "04_PROCESS_LIBRARY":   {"title": "Process Library",   "answer": "Làm thế nào",                 "store": "38 Hub MP (README+manifest+links)",        "star": True},
    "05_MODULE_LIBRARY":    {"title": "Module Library",    "answer": "Số hóa bằng gì",              "store": "Đặc tả 38 module",                         "star": True},
    "06_SHARED_RESOURCES":  {"title": "Shared Resources",  "answer": "Tài nguyên dùng chung",       "store": "Biểu mẫu gốc, master data",                "star": True},
    "07_AI_OPERATING_SYSTEM": {"title": "AI Operating System", "answer": "AI vận hành",             "store": "Skill, Agent, Guardrail, Policy",          "star": True},
    "08_KNOWLEDGE_GRAPH":   {"title": "Knowledge Graph",   "answer": "AI đọc ở đâu",                "store": "QPPL, ISO, ontology, vector",              "star": True},
    "09_ENGINEERING":       {"title": "Engineering",       "answer": "Code",                        "store": "Backend/Frontend/API/DB",                  "star": False},
    "10_DEPLOYMENT":        {"title": "Deployment",        "answer": "Vận hành",                    "store": "Docker/K8s/Backup/DR",                     "star": False},
    "11_COMPLIANCE":        {"title": "Compliance",        "answer": "Chứng minh tuân thủ",         "store": "Mapping, bằng chứng, audit, CAPA",         "star": True},
    "12_RESEARCH":          {"title": "Research",          "answer": "Tương lai",                   "store": "KC4.0, DMC, OCR, paper",                   "star": False},
}


# ---------------------------------------------------------------------------
# Tiện ích
# ---------------------------------------------------------------------------
def get_repo_info():
    """Lấy owner/name/branch từ git; fallback về giá trị mặc định."""
    owner, name, branch = "namdtvast", "MANLAB-AIOS", "main"
    try:
        url = subprocess.check_output(
            ["git", "-C", ROOT, "remote", "get-url", "origin"],
            stderr=subprocess.DEVNULL,
        ).decode().strip()
        m = re.search(r"[:/]([^/]+)/([^/]+?)(?:\.git)?$", url)
        if m:
            owner, name = m.group(1), m.group(2)
    except Exception:
        pass
    try:
        branch = subprocess.check_output(
            ["git", "-C", ROOT, "rev-parse", "--abbrev-ref", "HEAD"],
            stderr=subprocess.DEVNULL,
        ).decode().strip() or branch
    except Exception:
        pass
    return {
        "owner": owner,
        "name": name,
        "branch": branch,
        "blob": f"https://github.com/{owner}/{name}/blob/{branch}",
        "raw": f"https://raw.githubusercontent.com/{owner}/{name}/{branch}",
        "tree": f"https://github.com/{owner}/{name}/tree/{branch}",
    }


def parse_simple_yaml(text):
    """Parser YAML tối giản đủ dùng cho manifest.yaml/links.yaml phẳng.
    Hỗ trợ: key: value | key: [a, b] | key: theo sau bởi block (- item / sub: val).
    """
    data = {}
    lines = text.splitlines()
    i = 0

    def strip_val(v):
        v = v.strip()
        if len(v) >= 2 and v[0] in "\"'" and v[-1] == v[0]:
            v = v[1:-1]
        return v

    while i < len(lines):
        raw = lines[i]
        line = raw.rstrip()
        if not line.strip() or line.strip().startswith("#"):
            i += 1
            continue
        indent = len(line) - len(line.lstrip())
        if indent == 0 and ":" in line:
            key, _, val = line.partition(":")
            key = key.strip()
            val = val.strip()
            if val.startswith("[") and val.endswith("]"):
                items = [strip_val(x) for x in val[1:-1].split(",") if x.strip()]
                data[key] = items
            elif val:
                data[key] = strip_val(val)
            else:
                # block con: list (- ) hoặc map (sub: val)
                block_items = []
                block_map = {}
                j = i + 1
                while j < len(lines):
                    nxt = lines[j]
                    if not nxt.strip() or nxt.strip().startswith("#"):
                        j += 1
                        continue
                    nind = len(nxt) - len(nxt.lstrip())
                    if nind == 0:
                        break
                    s = nxt.strip()
                    if s.startswith("- "):
                        block_items.append(strip_val(s[2:]))
                    elif ":" in s:
                        k2, _, v2 = s.partition(":")
                        block_map[k2.strip()] = strip_val(v2)
                    j += 1
                data[key] = block_map if block_map else block_items
                i = j - 1
        i += 1
    return data


def extract_md_summary(path):
    """Lấy tiêu đề (# ...) và đoạn mô tả đầu tiên từ file README.md."""
    title, desc = None, None
    try:
        with open(path, encoding="utf-8") as f:
            for line in f:
                s = line.strip()
                if not s:
                    continue
                if title is None and s.startswith("#"):
                    title = s.lstrip("#").strip()
                    continue
                if title is not None and desc is None:
                    if s.startswith(("#", "|", "-", ">", "```")):
                        if s.startswith(">"):
                            desc = s.lstrip(">").strip()
                            break
                        continue
                    desc = s
                    break
    except Exception:
        pass
    return title, desc


def load_names():
    """Đọc bảng mã→tên từ _meta/INDEX.md (CAP / MP / M)."""
    names = {}
    idx = os.path.join(ROOT, "_meta", "INDEX.md")
    try:
        with open(idx, encoding="utf-8") as f:
            for line in f:
                cells = [c.strip() for c in line.split("|") if c.strip()]
                # Bảng CAP: | CAP-xx_Slug | Tên |
                if len(cells) == 2 and cells[0].startswith("CAP-"):
                    names[cells[0]] = cells[1]
                # Bảng MP/M: | MPxx_Slug | Mxx_Slug | Tên |
                if len(cells) == 3 and cells[0].startswith("MP") and cells[1].startswith("M"):
                    names[cells[0]] = cells[2]
                    names[cells[1]] = cells[2]
    except Exception:
        pass
    return names


# ---------------------------------------------------------------------------
# Quét cây thư mục
# ---------------------------------------------------------------------------
counts = {"files": 0, "dirs": 0, "docs": 0, "by_ext": {}}


def build_node(abs_path, rel_path):
    name = os.path.basename(abs_path) or rel_path
    node = {"name": name, "path": rel_path, "type": "dir", "children": []}

    # Mô tả thư mục từ README.md (nếu có)
    readme = os.path.join(abs_path, "README.md")
    if os.path.isfile(readme):
        _, desc = extract_md_summary(readme)
        if desc:
            node["desc"] = desc
        node["readme"] = (rel_path + "/README.md").lstrip("/")

    # Manifest hub (MP/M) hoặc capability.yaml (CAP)
    for mf in ("manifest.yaml", "capability.yaml"):
        mp = os.path.join(abs_path, mf)
        if os.path.isfile(mp):
            try:
                with open(mp, encoding="utf-8") as f:
                    node["meta"] = parse_simple_yaml(f.read())
            except Exception:
                pass
            break

    entries = sorted(os.listdir(abs_path), key=lambda s: s.lower())
    dirs, files = [], []
    for entry in entries:
        if entry in EXCLUDE_FILES or entry in EXCLUDE_DIRS or entry.startswith("."):
            continue
        full = os.path.join(abs_path, entry)
        child_rel = (rel_path + "/" + entry).lstrip("/")
        if os.path.isdir(full):
            dirs.append(build_node(full, child_rel))
        else:
            if entry == ".gitkeep":
                continue  # placeholder, không hiển thị như tài liệu
            ext = os.path.splitext(entry)[1].lower()
            try:
                size = os.path.getsize(full)
            except OSError:
                size = 0
            fnode = {
                "name": entry,
                "path": child_rel,
                "type": "file",
                "ext": ext,
                "size": size,
            }
            files.append(fnode)
            counts["files"] += 1
            counts["by_ext"][ext] = counts["by_ext"].get(ext, 0) + 1
            if ext in DOC_EXTS:
                counts["docs"] += 1

    counts["dirs"] += len(dirs)
    # Thư mục trước, file sau
    node["children"] = dirs + files
    # Đếm nhanh để hiển thị badge
    node["n_dirs"] = len(dirs)
    node["n_files"] = len(files)
    return node


def collect_dir_map(prefix):
    """Map mã (MPxx / Mxx / CAP-xx) -> đường dẫn thư mục con của `prefix`."""
    m = {}
    base = os.path.join(ROOT, prefix)
    if not os.path.isdir(base):
        return m
    for e in os.listdir(base):
        if os.path.isdir(os.path.join(base, e)):
            code = e.split("_")[0]
            m[code] = prefix + "/" + e
    return m


def collect_processes(tree):
    """Tổng hợp 38 quy trình MP từ cây + metadata để dựng ma trận/Digital Thread."""
    procs = []
    pl = next((c for c in tree["children"] if c["name"] == "04_PROCESS_LIBRARY"), None)
    if not pl:
        return procs
    mod_map = collect_dir_map("05_MODULE_LIBRARY")
    cap_map = collect_dir_map("02_CAPABILITIES")
    for hub in pl.get("children", []):
        if hub["type"] != "dir":
            continue
        m = hub.get("meta")
        if not m or not str(m.get("code", "")).startswith("MP"):
            continue
        doc = m.get("document") if isinstance(m.get("document"), dict) else {}
        controlled = doc.get("controlled")
        has_doc = bool(controlled) and any(
            ch["name"] == controlled for ch in hub.get("children", [])
        )
        caps = m.get("capabilities") or []
        procs.append({
            "code": m.get("code"),
            "slug": m.get("slug"),
            "name": m.get("name") or hub["name"],
            "status": m.get("status"),
            "standards": m.get("standards") or [],
            "legal": m.get("legal") or [],
            "capabilities": caps,
            "cap_paths": {c: cap_map.get(c) for c in caps if cap_map.get(c)},
            "module": m.get("module"),
            "module_path": mod_map.get(m.get("module")),
            "path": hub["path"],
            "doc_controlled": controlled,
            "doc_edition": doc.get("edition"),
            "doc_issued": doc.get("issued"),
            "doc_status": doc.get("doc_status"),
            "has_doc": has_doc,
            "forms": m.get("forms") or [],
        })
    procs.sort(key=lambda p: int(re.sub(r"\D", "", p["code"] or "0") or 0))
    return procs


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    repo = get_repo_info()
    names = load_names()

    root_node = {"name": repo["name"], "path": "", "type": "dir", "children": []}
    top_entries = sorted(
        [e for e in os.listdir(ROOT)
         if e not in EXCLUDE_DIRS and e not in EXCLUDE_FILES and not e.startswith(".")],
        key=lambda s: s.lower(),
    )
    top_dirs, top_files = [], []
    for entry in top_entries:
        full = os.path.join(ROOT, entry)
        if entry.startswith(".") and os.path.isfile(full):
            continue
        if os.path.isdir(full):
            top_dirs.append(build_node(full, entry))
        elif os.path.isfile(full):
            ext = os.path.splitext(entry)[1].lower()
            if ext in {".png", ".jpg", ".jpeg"} or entry == ".gitignore":
                # vẫn liệt kê md/yaml/png ở gốc
                pass
            try:
                size = os.path.getsize(full)
            except OSError:
                size = 0
            top_files.append({
                "name": entry, "path": entry, "type": "file",
                "ext": ext, "size": size,
            })
            counts["files"] += 1
            counts["by_ext"][ext] = counts["by_ext"].get(ext, 0) + 1
            if ext in DOC_EXTS:
                counts["docs"] += 1

    counts["dirs"] += len(top_dirs)
    root_node["children"] = top_dirs + top_files

    processes = collect_processes(root_node)

    payload = {
        "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
        "repo": repo,
        "architecture_version": "4.1",
        "enterprise": "Viện Kiểm định Công nghệ và Môi trường (ETV)",
        "counts": {
            "files": counts["files"],
            "dirs": counts["dirs"],
            "docs": counts["docs"],
            "capabilities": 22,
            "processes": 38,
            "modules": 38,
            "by_ext": counts["by_ext"],
        },
        "standards": ["ISO9001", "ISO17025", "ISO17034", "ISO27001", "ISO42001"],
        "tiers": TIERS,
        "names": names,
        "processes": processes,
        "tree": root_node,
    }

    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=1)

    print(f"✓ Sinh {OUT_FILE}")
    print(f"  Thư mục: {counts['dirs']} · Tệp: {counts['files']} · Tài liệu: {counts['docs']}")
    print(f"  Repo: {repo['owner']}/{repo['name']}@{repo['branch']}")


if __name__ == "__main__":
    main()
