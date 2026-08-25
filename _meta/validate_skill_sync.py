#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Kiểm ĐỒNG BỘ giữa bản skill trong repo và bản đang chạy ở `~/.claude/skills/`.

Vì sao cần: cùng một skill tồn tại ở HAI nơi — bản trong repo (`07_AI_OPERATING_SYSTEM/01_Skills/`)
là bản được kiểm soát và review qua PR; bản trong `~/.claude/skills/` mới là bản Claude Code thực sự
nạp khi chạy. Không có gì canh hai bản đó, nên chúng trôi xa nhau âm thầm.

Đo lần đầu (26/08/2026): bản `01-s-kiem-soat-tai-lieu-etv` ở `~/.claude` lệch bản repo **76 dòng ở
14 file** — trong đó có ba thứ đã sai thật: trích dẫn `ETV.P14 VI.5` (mục đó là Dấu hiệu kiểm soát,
không phải Vòng đời), mã năng lực `CAP-09` đã đổi thành `CAP-12`, và tên kích hoạt skill xuất file
`xu-ly-van-phong` không còn khớp skill nào. Sửa trong repo qua PR xong thì bản đang chạy vẫn nguyên
lỗi — nghĩa là review trong repo KHÔNG bảo vệ được hành vi thật của AI.

GIỚI HẠN PHẢI BIẾT — bộ kiểm này chỉ chạy được TRÊN MÁY LẬP TRÌNH VIÊN.
`~/.claude/skills/` nằm ngoài repo và không tồn tại trên runner của GitHub Actions, nên trên CI
script luôn báo "bỏ qua" và thoát 0. Đừng tưởng CI xanh là hai bản đã khớp. Muốn chắc thì chạy tay
trước khi mở PR đụng tới skill.

FRONTMATTER CỐ Ý KHÔNG SO SÁNH. Theo CLAUDE.md, `name:` phải là bản chuyển đổi cơ học của TÊN THƯ
MỤC; hai bản nằm ở hai thư mục khác tên nên `name:` khác nhau là ĐÚNG, không phải lỗi. Chỉ so phần
thân sau khối `---`.

Chạy:  python3 _meta/validate_skill_sync.py               # cảnh báo, luôn thoát 0
       python3 _meta/validate_skill_sync.py --chan        # thoát khác 0 nếu có lệch
       python3 _meta/validate_skill_sync.py <thư-mục>     # đối chiếu với thư mục skill khác
"""
import os, sys, glob, difflib

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHAN = "--chan" in sys.argv

REPO_SKILLS = os.path.join(root, "07_AI_OPERATING_SYSTEM", "01_Skills")
# Tham số vị trí (nếu có) thay cho ~/.claude/skills — dùng khi máy đặt skill ở chỗ khác,
# hoặc khi cần đối chiếu với một bản sao lưu để kiểm chính bộ kiểm này.
_tham_so = [a for a in sys.argv[1:] if not a.startswith("-")]
USER_SKILLS = os.path.expanduser(_tham_so[0]) if _tham_so else os.path.expanduser("~/.claude/skills")

# Ngưỡng nhận là "cùng một skill": tỉ lệ trùng ĐƯỜNG DẪN TƯƠNG ĐỐI của các file .md.
# Dò theo cấu trúc file thay vì theo tên thư mục, vì hai bản có thể mang tên khác nhau
# (S14_KiemSoatTaiLieu ↔ 01-s-kiem-soat-tai-lieu-etv) mà vẫn là một skill.
NGUONG_GIONG = 0.6


def tap_file(d):
    """Tập đường dẫn .md tương đối trong một thư mục skill."""
    ra = set()
    for dp, dn, fn in os.walk(d):
        dn[:] = [x for x in dn if not x.startswith(".")]
        for name in fn:
            if name.endswith(".md"):
                ra.add(os.path.relpath(os.path.join(dp, name), d))
    return ra


def bo_frontmatter(s):
    """Bỏ khối YAML mở đầu (nếu có) — phần này hai bản khác nhau là đúng."""
    if s.startswith("---"):
        cat = s.split("---", 2)
        if len(cat) == 3:
            return cat[2].lstrip("\n")
    return s


def do_giong(a, b):
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def main():
    if not os.path.isdir(USER_SKILLS):
        print("Bỏ qua: không có ~/.claude/skills/ trên máy này (bình thường khi chạy trên CI).")
        return 0

    repo_dirs = [d for d in sorted(glob.glob(os.path.join(REPO_SKILLS, "*")))
                 if os.path.isfile(os.path.join(d, "SKILL.md"))]
    user_dirs = [d for d in sorted(glob.glob(os.path.join(USER_SKILLS, "*")))
                 if os.path.isfile(os.path.join(d, "SKILL.md"))]

    repo_tap = {d: tap_file(d) for d in repo_dirs}
    user_tap = {d: tap_file(d) for d in user_dirs}

    cap, chua_ghep = [], []
    for rd in repo_dirs:
        tot, diem = None, 0.0
        for ud in user_dirs:
            g = do_giong(repo_tap[rd], user_tap[ud])
            if g > diem:
                tot, diem = ud, g
        if tot and diem >= NGUONG_GIONG:
            cap.append((rd, tot, diem))
        else:
            chua_ghep.append(rd)

    tong_lech = 0
    for rd, ud, _ in cap:
        ten_repo = os.path.basename(rd)
        ten_user = os.path.basename(ud)
        chung = repo_tap[rd] & user_tap[ud]
        chi_repo = sorted(repo_tap[rd] - user_tap[ud])
        chi_user = sorted(user_tap[ud] - repo_tap[rd])

        lech_file = []
        for rel in sorted(chung):
            a = bo_frontmatter(open(os.path.join(ud, rel), encoding="utf-8").read()).split("\n")
            b = bo_frontmatter(open(os.path.join(rd, rel), encoding="utf-8").read()).split("\n")
            if a == b:
                continue
            n = sum(1 for l in difflib.unified_diff(a, b, n=0)
                    if l[:1] in "+-" and l[:3] not in ("---", "+++"))
            lech_file.append((rel, n))

        if not lech_file and not chi_repo and not chi_user:
            continue

        # CHỈ ĐẾM file có mặt ở CẢ HAI bên mà nội dung khác nhau. File chỉ có một bên thường là
        # sản phẩm sinh ra lúc chạy skill (vd `outputs/<ngày>/...` của skill thiết kế) — nêu ra để
        # người đọc tự xét, nhưng không tính là lệch, nếu không `--chan` sẽ đỏ vĩnh viễn vì rác
        # sinh tự động và bộ kiểm mất tác dụng làm cổng chặn.
        tong_lech += len(lech_file)
        print(f"\nLỆCH: {ten_repo}  ↔  {os.path.join(USER_SKILLS, ten_user)}")
        for rel, n in lech_file:
            print(f"    {rel:52s} {n:3d} dòng khác")
        for rel in chi_repo:
            print(f"    {rel:52s} chỉ có trong repo (không tính)")
        for rel in chi_user:
            print(f"    {rel:52s} chỉ có ở bản đang chạy (không tính)")

    if chua_ghep:
        print(f"\nKhông tìm được bản tương ứng trong {USER_SKILLS} (chỉ nêu, không tính là lỗi):")
        for d in chua_ghep:
            print("   ", os.path.basename(d))

    print(f"\nĐã đối chiếu {len(cap)} cặp skill. Số chỗ lệch: {tong_lech}")
    if tong_lech:
        print("Bản trong ~/.claude mới là bản Claude Code thực sự nạp — lệch ở đây nghĩa là review")
        print("trong repo chưa bảo vệ được hành vi thật. Đồng bộ phần THÂN, giữ nguyên frontmatter.")
        return 1 if CHAN else 0
    return 0


if __name__ == "__main__":
    sys.exit(main())
