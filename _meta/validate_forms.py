#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Kiểm tra BIỂU MẪU ÁP DỤNG: mục VII của ETV.Pxx có được khai vào MPxx/manifest.yaml không.

Vì sao cần, bên cạnh hai bộ kiểm đã có: validate_links.py hỏi "đường dẫn khai ra có tồn tại không",
validate_citations.py hỏi "điều khoản dẫn ra có tồn tại không". Cả hai đều chỉ soi thứ ĐÃ ĐƯỢC KHAI.
Không cái nào hỏi được câu ngược lại — "thủ tục có biểu mẫu mà manifest quên khai thì sao". Ở đó
repo im lặng tuyệt đối: MP nào không có khóa `forms:` thì khai 0 đường dẫn, nên validate_links xanh
tuyệt đối; còn banner "Căn cứ" ở aios-platform render khối biểu mẫu theo điều kiện `forms.length > 0`
(src/components/CanCuBanner.tsx) nên khi manifest rỗng thì cả dòng "Biểu mẫu áp dụng" BIẾN MẤT — không
có chỗ trống, không có dấu hỏi, không có gì để người dùng biết mà nghi.

Ca phát hiện ra lớp lỗi này (31/08/2026): người dùng mở trang M12, thấy thủ tục ETV.P12 mục VII liệt
kê đủ 3 biểu mẫu `ETV.P.F 12.01`–`12.03` mà banner không có dòng "Biểu mẫu áp dụng" nào. Truy ra:
ngày số hóa P12 (21/07/2026) ba file gốc trên Dropbox còn là placeholder 0 byte nên không tạo được
biểu mẫu ở 06_SHARED_RESOURCES → manifest không khai `forms:` → seed đọc rỗng → banner ẩn khối. Quyết
định lúc đó đúng (không bịa biểu mẫu khi chưa có bản gốc), nhưng "chờ Dropbox đồng bộ" là trạng thái
nằm NGOÀI repo, không có gì canh — file nay đã đồng bộ về mà không ai được báo. Đo lần đầu: 61 mã
biểu mẫu nằm trong thủ tục đã ban hành nhưng chưa từng được khai, trải trên 16 thủ tục.

NGUỒN CHUẨN là mục "BIỂU MẪU ÁP DỤNG" trong thân thủ tục, không phải manifest. Lý do: mục VII là thứ
đã qua soát xét và phê duyệt theo MP14; manifest là bản khai kỹ thuật phái sinh. Lệch nhau thì manifest
sai, trừ khi có bằng chứng ngược lại.

BIỂU MẪU SỞ HỮU KHÁC BIỂU MẪU VIỆN DẪN CHÉO — phân biệt này là phần khó nhất của bộ kiểm, đừng bỏ.
Mục VII của một thủ tục chứa hai loại mã: mã nó SỞ HỮU (số biểu mẫu trùng số thủ tục) và mã của thủ
tục khác mà nó DÙNG LẠI. ETV.P28 nói thẳng lối này: "Các hoạt động sau sử dụng lại biểu mẫu của thủ
tục chuyên trách — không lập biểu mẫu mới ở thủ tục này (nguyên tắc một nơi duy nhất, ETV.P14)", rồi
liệt kê F02.01, F03.05.x, F06.01, F14.06... Chỉ mã SỞ HỮU mới phải vào `forms:` của chính MP đó; bắt
MP28 khai F02.01 là ép nhân bản khai báo, đúng thứ quy ước "một nguồn sự thật" cấm. Bản đầu của bộ
kiểm không phân biệt và báo MP28 thiếu 9/13 mã — tố oan đúng thủ tục viện dẫn kỷ luật nhất.

GIỚI HẠN PHẢI BIẾT — công cụ này chỉ đối chiếu MÃ, không đối chiếu NỘI DUNG:
  1. Mục VII khai mã SỞ HỮU mà manifest quên       → bắt được
  2. manifest khai mã mà mục VII không có          → bắt được
  3. Cả danh mục mang số khác số thủ tục           → bắt được (di chứng đánh số lại)
  4. Viện dẫn chéo trỏ tới mã thủ tục chủ không có → bắt được
  5. Mã khai ĐÚNG nhưng file biểu mẫu SAI nội dung → KHÔNG bắt được
Lớp 5 cùng họ với lớp "dẫn đúng tên mục nhưng sai mục" của validate_citations: cần đối chiếu ngữ
nghĩa, cố ý không làm.

Công cụ cũng KHÔNG kiểm biểu mẫu đã có file thật hay chưa — `buildForms()` trong prisma/seed.ts cho
phép khai mã không kèm file (banner hiện chip xám, không bấm mở được). Đó là trạng thái HỢP LỆ và có
chủ đích: biểu mẫu chưa số hóa vẫn phải hiện ra để người đọc biết nó tồn tại, thay vì im lặng.

Chạy:  python3 _meta/validate_forms.py          # cảnh báo, luôn thoát 0
       python3 _meta/validate_forms.py --chan   # thoát khác 0 nếu có lệch (dùng khi đã dọn sạch)
"""
import os, re, sys, glob

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHAN = "--chan" in sys.argv

# Mã biểu mẫu. Repo dùng SONG SONG bốn lối viết cho cùng một mã, đừng rút gọn mẫu này:
#   `ETV.P.F 12.01` (có dấu cách — 653 lượt)   `ETV.P.F10.01` (không dấu cách — 43 lượt)
#   `F19.01` (trần, không tiền tố)             `ETV.P.F 07.06.02` (mã ba cấp)
# Bản đầu của mẫu chỉ nhận dạng có tiền tố ETV.P.F, và ETV.P19 — vốn viết trần suốt từ đầu đến cuối —
# hiện ra thành "manifest khai 3 biểu mẫu mà thủ tục không nhắc mã nào", tức là TỐ OAN đúng thủ tục
# khai báo đầy đủ nhất. Cùng lớp lỗi với lỗ hổng thiếu tiền tố của validate_citations.
#
# `(?<![0-9A-Za-z.])` chặn khớp giữa chừng một mã dài hơn (vd `MF01.02`, `07.06.02` đã khớp ba cấp).
MA_BIEU_MAU = re.compile(r"(?<![0-9A-Za-z.])(?:ETV\.P\.)?[`*_]*F\s?(\d{2}\.\d{2}(?:\.\d{2})?)")

# Mục danh mục biểu mẫu. Ba lối đánh số cùng tồn tại: "## VII.", "## VIII." (P42), "## 8." (P24, P25,
# P26, P29 theo khung 9 mục thay vì I–IX). Bắt theo TÊN MỤC chứ không theo số hiệu.
# Không dùng `.*BIỂU MẪU` để tránh nuốt "PHỤ LỤC III — CẤU TRÚC 3 BIỂU MẪU CHÍNH" của P22: chỉ mục
# nào có đủ cụm "BIỂU MẪU ÁP DỤNG" mới là danh mục chính thức.
MUC_BIEU_MAU = re.compile(r"^(#{1,3})\s+[^\n]*BIỂU MẪU ÁP DỤNG[^\n]*$", re.M)


def chuan_hoa(ma):
    """'ETV.P.F 12.01' | 'F12.01' | 'ETV.P.F12.01' → 'F12.01'. Một mã, một cách viết."""
    return "F" + ma


def so_thu_tuc(ma):
    """'F12.01' → '12'. Số hiệu biểu mẫu, theo quy ước phải trùng số thủ tục ban hành nó."""
    return ma[1:3]


def doc_muc_bieu_mau(text):
    """Trả (danh sách mã trong mục BIỂU MẪU ÁP DỤNG, có tìm thấy mục đó không).

    Mục kết thúc ở tiêu đề CÙNG CẤP hoặc CAO HƠN kế tiếp — không cắt ở mọi '##' vì vài thủ tục dùng
    '###' cho ghi chú nguồn ngay trong danh mục.
    """
    m = MUC_BIEU_MAU.search(text)
    if not m:
        return [], False
    cap = len(m.group(1))
    sau = text[m.end():]
    ket = re.search(r"^#{1,%d}\s" % cap, sau, re.M)
    than = sau[: ket.start()] if ket else sau
    # BỎ DÒNG TRÍCH DẪN KHỐI (`>`) — đó là ghi chú của người soạn, không phải danh mục. Cần vì ghi
    # chú hay NHẮC TỚI mã để nói nó sai: ETV.P12 ghi "chân trang bản gốc ghi 12.02 và 12.04, không
    # trang nào ghi 12.03" — đọc cả blockquote thì bộ kiểm hiểu thành thủ tục có thêm biểu mẫu
    # F12.04 và đòi khai nó vào manifest, tức là biến một ghi chú cảnh báo lỗi thành lỗi mới.
    than = "\n".join(d for d in than.split("\n") if not d.lstrip().startswith(">"))
    # Giữ thứ tự xuất hiện, bỏ trùng — danh mục thường nhắc lại mã ở dòng ghi chú nguồn cuối mục.
    ra, da_co = [], set()
    for ma in MA_BIEU_MAU.findall(than):
        c = chuan_hoa(ma)
        if c not in da_co:
            da_co.add(c)
            ra.append(c)
    return ra, True


def doc_khoi_yaml(duong_dan, khoa):
    """Đọc danh sách dưới một khóa YAML dạng '- giá trị'. Không dùng PyYAML: repo cố ý không có
    phụ thuộc ngoài cho lớp công cụ kiểm tra (xem validate_links.py) để CI chạy được với python trần."""
    if not os.path.exists(duong_dan):
        return []
    ra, trong_khoi = [], False
    for dong in open(duong_dan, encoding="utf-8"):
        if re.match(r"^%s\s*:" % re.escape(khoa), dong):
            # HAI LỐI VIẾT YAML CÙNG TỒN TẠI, phải đọc được cả hai. MP21 viết gọn một dòng
            # `forms: [F21.01, F21.02, ...]` trong khi 30 MP còn lại viết khối `- mục`. Bản đầu chỉ
            # đọc khối và báo MP21 "khai thiếu 10 mã" — trong khi seed.ts dùng yaml.load nên vẫn
            # nạp đủ 12 mã và banner M21 vẫn hiện đúng. Tố oan đúng cái đang chạy tốt.
            trong_dong = dong.split(":", 1)[1].strip()
            if trong_dong.startswith("["):
                return [x.strip().strip("\"'") for x in trong_dong.strip("[]").split(",") if x.strip()]
            trong_khoi = True
            continue
        if trong_khoi:
            m = re.match(r"^\s+-\s*(.+?)\s*$", dong)
            if m:
                ra.append(m.group(1).strip("\"'"))
            elif dong.strip() and not dong.startswith((" ", "\t")):
                break
    return ra


def main():
    # Thủ tục theo số hiệu. ETV.P10_DamBaoHieuLucKetQua.md ↔ MP10_DamBaoKQ — tên gọi hai bên khác
    # nhau, chỉ có SỐ là khóa nối, đúng như quy ước 12 tầng.
    # MỘT SỐ THỦ TỤC CÓ NHIỀU FILE, gom hết chứ đừng ghi đè: ETV.P42 tách phụ lục ra
    # `ETV.P42_Phan_luc_I_Noi_quy_mau.md`, và bản đầu của bộ kiểm (dict gán đè) giữ đúng file phụ lục
    # rồi báo "P42 không có mục BIỂU MẪU ÁP DỤNG" — trong khi file thân thủ tục có đủ.
    thu_tuc = {}
    for f in sorted(glob.glob(os.path.join(root, "03_MANAGEMENT_SYSTEM/02_P/ETV.P*.md"))):
        m = re.match(r"ETV\.P(\d{2})_", os.path.basename(f))
        if m:
            thu_tuc.setdefault(m.group(1), []).append(f)

    mp_dir = {}
    for d in sorted(glob.glob(os.path.join(root, "04_PROCESS_LIBRARY/MP*"))):
        m = re.match(r"MP(\d{2})_", os.path.basename(d))
        if m and os.path.isdir(d):
            mp_dir[m.group(1)] = d

    thieu_khai = thua_khai = lech_so = ngoai_danh_muc = file_la = cheo_hong = 0
    tong_cheo = 0
    khong_co_muc = []
    tong_ma = 0

    # Lượt 1: lập chỉ mục danh mục biểu mẫu của MỌI thủ tục trước, vì kiểm viện dẫn chéo ở thủ tục
    # này cần biết danh mục của thủ tục kia — không lập trước thì phải đọc lại file theo vòng lặp.
    danh_muc, than_bai, duong_dan = {}, {}, {}
    for num, files in sorted(thu_tuc.items()):
        gop, co_muc, text_gop = [], False, ""
        for f in files:
            text = open(f, encoding="utf-8").read()
            text_gop += text
            ma, thay = doc_muc_bieu_mau(text)
            if thay:
                co_muc = True
                duong_dan[num] = os.path.relpath(f, root)
                gop += [c for c in ma if c not in gop]
        danh_muc[num] = gop if co_muc else None
        # Cùng lý do như trong doc_muc_bieu_mau: dòng `>` là ghi chú của người soạn. Ghi chú hay
        # nhắc mã ĐỂ NÓI RÕ VÌ SAO KHÔNG LẬP nó — ETV.P27 viết "đặc tả đề xuất 05 biểu mẫu
        # F27.01–F27.05, thủ tục này chỉ lập 03… tránh lập biểu mẫu trùng chức năng". Đọc cả
        # blockquote thì bộ kiểm báo P27 "dùng F27.05 mà danh mục không liệt kê", tức là bắt lỗi
        # đúng câu giải thích tại sao không có lỗi.
        than = "\n".join(d for d in text_gop.split("\n") if not d.lstrip().startswith(">"))
        than_bai[num] = {chuan_hoa(x) for x in MA_BIEU_MAU.findall(than)}
        duong_dan.setdefault(num, os.path.relpath(files[0], root))

    for num in sorted(thu_tuc):
        d = mp_dir.get(num)
        if d is None:
            continue  # thủ tục chưa có Hub MP — việc khác, validate_links lo
        rel_tt = duong_dan[num]
        muc = danh_muc[num]
        if muc is None:
            khong_co_muc.append((num, rel_tt))
            continue

        # Tách hai loại mã trong danh mục — xem phần đầu file, đây là chỗ dễ tố oan nhất.
        so_huu = [c for c in muc if so_thu_tuc(c) == num]
        cheo = [c for c in muc if so_thu_tuc(c) != num]
        tong_ma += len(so_huu)
        tong_cheo += len(cheo)

        khai = []
        for x in doc_khoi_yaml(os.path.join(d, "manifest.yaml"), "forms"):
            m = MA_BIEU_MAU.search(x)
            if m:
                khai.append(chuan_hoa(m.group(1)))
        tap_khai = set(khai)
        rel_mf = os.path.relpath(os.path.join(d, "manifest.yaml"), root)

        # 1. Lỗi chính: mục VII có mã sở hữu, manifest quên → banner nuốt cả khối "Biểu mẫu áp dụng".
        thieu = [c for c in so_huu if c not in tap_khai]
        if thieu:
            thieu_khai += len(thieu)
            print(f"\nKHAI THIẾU BIỂU MẪU: MP{num} — {len(thieu)}/{len(so_huu)} mã sở hữu trong mục "
                  f"BIỂU MẪU ÁP DỤNG chưa vào manifest")
            print(f"    Thủ tục   : {rel_tt}")
            print(f"    Cần thêm vào {rel_mf} khóa forms:")
            for c in thieu:
                print(f"        - ETV.P.{c}")
            if not tap_khai:
                print(f"    Hệ quả: manifest không có khóa `forms:` nào → banner Căn cứ của module "
                      f"M{num} ẨN HẲN dòng \"Biểu mẫu áp dụng\".")

        # 2. Chiều ngược: manifest khai mã danh mục chính thức không có.
        tap_so_huu = set(so_huu)
        thua = [c for c in khai if c not in tap_so_huu]
        if thua:
            thua_khai += len(thua)
            print(f"\nKHAI THỪA BIỂU MẪU: MP{num} — manifest khai {len(thua)} mã không nằm trong "
                  f"danh mục biểu mẫu sở hữu của {rel_tt}")
            print(f"    {', '.join(thua)}")
            print("    Banner đang hiện biểu mẫu không có căn cứ trong thủ tục đã ban hành — sửa "
                  "manifest, hoặc soát xét bổ sung thủ tục nếu biểu mẫu là thật.")

        # 3. CẢ danh mục mang số khác số thủ tục → không phải viện dẫn chéo mà là di chứng đánh số
        # lại. Bắt được nguyên khối kế toán: P44–P51 khai biểu mẫu mang số 40–47, lệch đều 4 số.
        # Nguy ở chỗ mã sinh ra vẫn "hợp lệ" và còn ĐỤNG số thủ tục khác — `ETV.P.F 44.01` nằm
        # trong ETV.P48, nên người tra F44.01 sẽ mở nhầm thủ tục.
        lech_toan_bo = bool(cheo) and not so_huu
        if lech_toan_bo:
            lech_so += len(cheo)
            print(f"\nLỆCH SỐ HIỆU TOÀN DANH MỤC: {rel_tt} khai {len(cheo)} biểu mẫu, KHÔNG mã nào "
                  f"mang số {num}")
            print(f"    {', '.join(cheo)}  → theo quy ước phải là F{num}.yy")
            print("    Không phải viện dẫn chéo: một thủ tục không thể chỉ dùng biểu mẫu của thủ tục "
                  "khác mà không sở hữu mã nào. Dấu hiệu đánh số lại thủ tục mà quên đánh số biểu mẫu.")

        # 4. Viện dẫn chéo trỏ tới mã mà thủ tục chủ không có trong danh mục của nó.
        # Bỏ qua khi kiểm 3 đã kêu: cả danh mục lệch số thì mọi mã đều "chéo hỏng", báo lại là nhân
        # một lỗi gốc thành hai việc — đúng thứ validate_citations tránh khi gom theo điều khoản.
        hong = []
        for c in ([] if lech_toan_bo else cheo):
            chu = so_thu_tuc(c)
            dm_chu = danh_muc.get(chu)
            if dm_chu is None:
                continue  # thủ tục chủ chưa ban hành hoặc chưa có mục — không kết luận
            # Mã ba cấp (F07.06.02) tính là có nếu thủ tục chủ khai mã cha.
            if c not in dm_chu and c.rsplit(".", 1)[0] not in dm_chu:
                hong.append((c, chu))
        if hong:
            cheo_hong += len(hong)
            print(f"\nVIỆN DẪN CHÉO HỎNG: {rel_tt} dùng lại {len(hong)} biểu mẫu mà thủ tục chủ "
                  f"không có trong danh mục của nó")
            for c, chu in hong:
                print(f"    {c} — ETV.P{chu} ({duong_dan.get(chu, 'chưa ban hành')}) không khai mã này")

        # 5. Mã sở hữu dùng trong thân bài mà danh mục chính thức bỏ sót.
        sot = sorted(c for c in than_bai[num] if so_thu_tuc(c) == num and c not in set(muc))
        if sot:
            ngoai_danh_muc += len(sot)
            print(f"\nDÙNG NGOÀI DANH MỤC: {rel_tt} dùng {len(sot)} mã trong quy trình nhưng mục "
                  f"BIỂU MẪU ÁP DỤNG không liệt kê")
            print(f"    {', '.join(sot)}")

        # 6. File biểu mẫu có thật nhưng manifest không khai mã tương ứng. seed.ts vẫn hiện file này
        # (nhánh byFile), nên lệch ở đây không làm mất biểu mẫu — nó làm manifest hết là bản khai đủ.
        for rel in doc_khoi_yaml(os.path.join(d, "links.yaml"), "form_files"):
            m = MA_BIEU_MAU.search(os.path.basename(rel))
            if m and chuan_hoa(m.group(1)) not in tap_khai:
                file_la += 1
                print(f"\nFILE NGOÀI KHAI BÁO: MP{num} — links.yaml trỏ tới {os.path.basename(rel)} "
                      f"nhưng manifest.forms không khai {chuan_hoa(m.group(1))}")

    if khong_co_muc:
        print(f"\nKHÔNG CÓ MỤC BIỂU MẪU ÁP DỤNG: {len(khong_co_muc)} thủ tục")
        for num, rel in khong_co_muc:
            print(f"    ETV.P{num} — {rel}")
        print("    Không kết luận được thủ tục có biểu mẫu hay không; khung chuẩn ETV.P14 đòi mục này.")

    tong = thieu_khai + thua_khai + lech_so + cheo_hong + ngoai_danh_muc + file_la
    print(f"\nĐã kiểm {tong_ma} mã biểu mẫu sở hữu + {tong_cheo} mã viện dẫn chéo "
          f"trong {len(thu_tuc)} thủ tục · {len(mp_dir)} Hub MP.")
    print(f"Khai thiếu: {thieu_khai} · khai thừa: {thua_khai} · lệch số hiệu: {lech_so} · "
          f"viện dẫn chéo hỏng: {cheo_hong} · dùng ngoài danh mục: {ngoai_danh_muc} · "
          f"file ngoài khai báo: {file_la}.")
    print("Công cụ này KHÔNG kiểm nội dung biểu mẫu, cũng KHÔNG đòi biểu mẫu phải có file — "
          "khai mã không kèm file là trạng thái hợp lệ (banner hiện chip xám). Xem phần đầu file.")
    if tong and not CHAN:
        print("Chế độ cảnh báo: không chặn. Dùng --chan sau khi đã dọn sạch.")
    sys.exit(1 if (tong and CHAN) else 0)


if __name__ == "__main__":
    main()
