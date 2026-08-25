#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Kiểm tra TRÍCH DẪN ĐIỀU KHOẢN nội bộ: "ETV.Pxx §y.z" có trỏ tới mục có thật không.

Vì sao cần, bên cạnh validate_links.py: validate_links kiểm ở mức ĐƯỜNG DẪN FILE, và ở mức đó repo
đang sạch. Nhưng lập luận tuân thủ không đứng trên tên tài liệu — không ai viết "theo ETV.P28" rồi
dừng; người ta viết "ETV.P28 §5.13" và xây kết luận trên đúng điều khoản đó. Mức chịu lực ấy trước
nay chưa có gì kiểm. Đo lần đầu (25/08/2026): 0/186 hỏng ở mức tên tài liệu, 11/186 hỏng ở mức điều
khoản — trong đó 2 nằm trong một phiếu trình Lãnh đạo Viện.

GIỚI HẠN PHẢI BIẾT — công cụ này KHÔNG kết luận được "trích dẫn đúng". Ba lớp lỗi:
  1. Dẫn tới thủ tục không tồn tại      → bắt được
  2. Dẫn tới mục không tồn tại          → bắt được
  3. Dẫn tới mục CÓ THẬT nhưng SAI mục  → KHÔNG bắt được
Lớp 3 nguy hơn lớp 2: lớp 2 gãy lộ liễu khi có người mở ra tra, còn lớp 3 thì người đọc mở ra thấy
một mục hợp lệ nên tin luôn. Ví dụ có thật: một knowledge của S14 dẫn "RACI tại ETV.P14 §5", mà RACI
của P14 nằm ở mục III, còn V là "Thuật ngữ". Bắt lớp 3 cần đối chiếu ngữ nghĩa — cố ý KHÔNG làm, vì
dựng một công cụ chống suy đoán chưa kiểm rồi cho chính nó suy đoán là tự mâu thuẫn.

Công cụ cũng KHÔNG gợi ý "ý bạn là mục nào" — chỉ liệt kê các mục CÓ THẬT để người sửa tự đối chiếu.

Chạy:  python3 _meta/validate_citations.py          # cảnh báo, luôn thoát 0
       python3 _meta/validate_citations.py --chan   # thoát khác 0 nếu có lỗi (dùng khi đã dọn sạch)
"""
import os, re, sys, glob, collections

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHAN = "--chan" in sys.argv

# Thư mục không quét: mã sinh, phụ thuộc, bản dựng, cổng tĩnh, thư mục làm việc tạm.
BO_QUA = {"node_modules", ".git", ".next", "src", "docs", "Output_Codex", ".venv"}

# Trích dẫn nội bộ: BẮT BUỘC có tiền tố ETV.Pxx/ETV.MPxx ngay trước dấu § hoặc chữ "mục".
# Nhờ tiền tố này, điều khoản ISO/TCVN (vd "ISO 9001 §10.1") không bị bắt nhầm — đã đo: "§10.1"
# xuất hiện 9 lượt trong repo, không lượt nào bị quy về một thủ tục ETV.
TRICH_DAN = re.compile(r"ETV\.(?:MP|P)(\d{2})\s*(?:§|mục)\s*(\d+(?:\.\d+)*)")
# Lối viết song song bằng số La Mã: "ETV.P14 VI.2". Ít dùng nhưng có thật, kiểm riêng.
TRICH_DAN_LAMA = re.compile(r"ETV\.(?:MP|P)(\d{2})\s+([IVXLC]{1,5})((?:\.\d+)*)\b")

MUC_SO = re.compile(r"^#{1,6}\s*(\d+(?:\.\d+)*)[.\s]", re.M)
MUC_LAMA = re.compile(r"^#{1,6}\s*([IVXLC]{1,5})\.\s", re.M)


def doc_thu_tuc():
    """Mọi thủ tục ETV.Pxx đã ban hành, kèm tập mục có thật (Ả Rập và La Mã tách riêng)."""
    ra = {}
    for f in glob.glob(os.path.join(root, "03_MANAGEMENT_SYSTEM/02_P/ETV.P*.md")):
        m = re.match(r"ETV\.P(\d{2})_", os.path.basename(f))
        if not m:
            continue
        t = open(f, encoding="utf-8").read()
        ra[m.group(1)] = {
            "file": os.path.relpath(f, root),
            "so": set(MUC_SO.findall(t)),
            "lama": set(MUC_LAMA.findall(t)),
        }
    return ra


def quet_md():
    for dp, dn, fn in os.walk(root):
        dn[:] = [d for d in dn if d not in BO_QUA and not d.startswith(".")]
        for name in fn:
            if name.endswith(".md"):
                yield os.path.join(dp, name)


LAMA_SANG_SO = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100}


def khoa_muc(s):
    """Sắp mục theo thứ tự số học: 5.10 đứng sau 5.9, không phải trước."""
    return tuple(int(x) for x in s.split("."))


def lama_thanh_so(s):
    tong, truoc = 0, 0
    for ch in reversed(s):
        v = LAMA_SANG_SO[ch]
        tong = tong - v if v < truoc else tong + v
        truoc = max(truoc, v)
    return tong


def main():
    thu_tuc = doc_thu_tuc()
    # Gom theo ĐIỀU KHOẢN bị dẫn sai, không theo file: một lỗi gốc trong biểu mẫu mẫu có thể nhân
    # bản ra hàng chục phiếu điền. Liệt kê theo file sẽ biến 1 lỗi thành N việc rời rạc.
    hong = collections.defaultdict(set)
    tong_trich_dan = 0
    trich_dan_lama = collections.defaultdict(set)

    for f in quet_md():
        rel = os.path.relpath(f, root)
        try:
            t = open(f, encoding="utf-8").read()
        except (OSError, UnicodeDecodeError):
            continue
        for num, sec in TRICH_DAN.findall(t):
            tong_trich_dan += 1
            tt = thu_tuc.get(num)
            if tt is None:
                hong[(num, sec, "khong-co-thu-tuc")].add(rel)
            elif sec not in tt["so"]:
                hong[(num, sec, "khong-co-muc")].add(rel)
        for num, lama, duoi in TRICH_DAN_LAMA.findall(t):
            trich_dan_lama[(num, lama + duoi)].add(rel)

    for (num, sec, ly_do), noi in sorted(hong.items()):
        tt = thu_tuc.get(num)
        print(f"\nTRÍCH DẪN HỎNG: ETV.P{num} §{sec} — "
              f"{'không có thủ tục này' if ly_do == 'khong-co-thu-tuc' else 'thủ tục không có mục đó'}"
              f" ({len(noi)} chỗ dẫn)")
        for n in sorted(noi):
            print(f"    ↳ {n}")
        if not tt:
            continue
        # Liệt kê mục CÙNG NHÁNH với mục bị dẫn sai (vd dẫn §5.2.3 thì nêu 5, 5.1, 5.2, 5.3),
        # rồi mới tới mục cấp trên. KHÔNG đoán "ý bạn là mục nào" — chỉ bày ra cái có thật.
        goc = sec.split(".")[0]
        cung_nhanh = sorted((x for x in tt["so"] if x == goc or x.startswith(goc + ".")), key=khoa_muc)
        cap_tren = sorted((x for x in tt["so"] if "." not in x), key=khoa_muc)
        if cung_nhanh:
            print(f"    Mục cùng nhánh {goc} có thật: {', '.join(cung_nhanh)}")
        print(f"    Mục cấp trên đánh số Ả Rập trong {tt['file']}: "
              f"{', '.join(cap_tren) or '(không có — xem lưu ý bên dưới)'}")
        if tt["lama"]:
            # Thủ tục đánh số mục bằng La Mã — nêu ra, KHÔNG tự suy "ý bạn là mục V".
            dung = sorted(tt["lama"], key=lama_thanh_so)
            print(f"    Lưu ý: thủ tục này đánh số mục cấp trên bằng số LA MÃ ({', '.join(dung)}) — đối chiếu lại số hiệu mục.")

    if trich_dan_lama:
        print(f"\nLối trích dẫn song song (số La Mã, không có dấu §): {sum(len(v) for v in trich_dan_lama.values())} chỗ")
        for (num, sec), noi in sorted(trich_dan_lama.items()):
            print(f"    ETV.P{num} {sec} — {', '.join(sorted(noi))}")
        print("    Repo đang dùng hai lối trích dẫn cho cùng một thủ tục. Chốt một lối thì bộ kiểm")
        print("    này không phải nuôi hai bộ quy tắc; số chỗ phải sửa hiện còn nhỏ.")

    rieng_biet = len({(a, b) for a, b, _ in hong})
    print(f"\nĐã kiểm {tong_trich_dan} trích dẫn điều khoản · {len(thu_tuc)} thủ tục. "
          f"Trích dẫn hỏng: {rieng_biet} điều khoản / {sum(len(v) for v in hong.values())} chỗ dẫn.")
    print("Công cụ này KHÔNG bắt được trích dẫn trỏ tới mục CÓ THẬT nhưng SAI mục — xem phần đầu file.")
    if hong and not CHAN:
        print("Chế độ cảnh báo: không chặn. Dùng --chan sau khi đã dọn sạch.")
    sys.exit(1 if (hong and CHAN) else 0)


if __name__ == "__main__":
    main()
