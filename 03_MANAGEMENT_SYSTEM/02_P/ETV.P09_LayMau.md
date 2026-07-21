---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát (xem §7)
id: ETV.P09
title: "Thủ tục Lấy mẫu, Xử lý và Bảo quản mẫu"
type: Thu-tuc
owner: "Lãnh đạo Viện (LĐV)"
department: "Trung tâm Quan trắc và Chứng nhận phù hợp"
process: MP09_LayMau
capability: [CAP-04_HienTruong, CAP-11_QuanTrac]
module: M09_LayMau
effective_date: "21/07/2026"
revision: "02"
status: Da-phe-duyet
keywords: [lấy mẫu, bảo quản mẫu, quan trắc môi trường, QA/QC hiện trường, truy xuất mẫu, ISO 17025 §7.4]
related_documents: [ETV.QM, ETV.P04, ETV.P14, ETV.P15]
iso_clause: ["ISO/IEC 17025:2017 §7.4 (Xử lý đối tượng thử nghiệm/hiệu chuẩn)", "ISO/IEC 17025:2017 §7.3 (Lấy mẫu)"]
legal_basis: ["Luật Bảo vệ môi trường 72/2020/QH14", "Nghị định 08/2022/NĐ-CP quy định chi tiết một số điều của Luật Bảo vệ môi trường", "Nghị định 05/2025/NĐ-CP sửa đổi, bổ sung Nghị định 08/2022/NĐ-CP", "Thông tư 02/2022/TT-BTNMT quy định chi tiết thi hành một số điều của Luật Bảo vệ môi trường", "Thông tư 10/2021/TT-BTNMT quy định kỹ thuật quan trắc môi trường"]
ai_tags: [sampling, sample-preservation, environmental-monitoring, chain-of-custody]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Vĩnh viễn (bản hiện hành) — xem chi tiết theo loại tại ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: "ETV.P 09 (Lần ban hành 01, ngày 22/04/2025)"
superseded_by: null
---
# THỦ TỤC LẤY MẪU, XỬ LÝ VÀ BẢO QUẢN MẪU

|                    |                                                     |
| ------------------ | --------------------------------------------------- |
| **Mã số**          | ETV.P 09                                             |
| **Lần ban hành**   | 02                                                    |
| **Ngày ban hành**  | 21/07/2026                                            |
| **Biên soạn**      | Dương Thành Nam — 21/07/2026                          |
| **Soát xét**       | Trần Thị Hoa — Lãnh đạo Phòng, ngày 21/07/2026        |
| **Phê duyệt**      | Nguyễn Hoàng Giang — Lãnh đạo Viện, ngày 21/07/2026   |

> **Chú ý:** Tài liệu nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện Kiểm định Công nghệ và Môi trường.

> **Ghi chú số hóa (AI).** Bản lần 02 do AI tái cấu trúc từ bản Word lần 01 (22/4/2025, file `ETV.MP 09_TT Lay mau, xu ly, bao quan mau.doc`), đối chiếu khung mẫu chuẩn tại skill `01-s-kiem-soat-tai-lieu-etv`. Lưu ý quan trọng:
> 1. **Thư mục nguồn Dropbox có tên "_Xem Cty VEV"** (gợi ý thuê ngoài/tham chiếu công ty VEV) nhưng nội dung file thực tế là một thủ tục ETV hoàn chỉnh, mới ban hành 22/4/2025, có quy trình mã hóa mẫu QRCode và tích hợp ManLab riêng của ETV — AI xác nhận đây LÀ thủ tục chính thức của ETV, không phải chỉ ghi chú dẫn chiếu, và ban hành đầy đủ như các thủ tục khác. Đề nghị QLCL xác nhận lại tên thư mục nguồn cho khớp nội dung khi có dịp cập nhật.
> 2. **Chuẩn hóa mã biểu mẫu và mã thủ tục** — bản gốc dùng sai quy ước mã hóa của ETV.P14 tại một số chỗ: biểu mẫu ghi `ETV.F09.01`–`05` (thiếu ".P") và trang bìa/footer ghi mã thủ tục là `ETV.MP 09` (đây là mã Hub quy trình theo kiến trúc ManLab-AIOS, không phải mã văn bản thủ tục) thay vì `ETV.P 09`. AI chuẩn hóa lại theo đúng quy ước `ETV.P xx` (thủ tục) và `ETV.P.F xx.yy` (biểu mẫu) tại `knowledge/03_ma_hoa_van_ban.md` — cần LĐP xác nhận.
> 3. **5/5 biểu mẫu áp dụng (mục VII) hiện CHƯA số hóa được** — thư mục nguồn Dropbox chỉ có duy nhất file thủ tục, không có file biểu mẫu rời nào — **không tự suy diễn cấu trúc biểu mẫu khi chưa có bản gốc**.
> 4. Toàn bộ nội dung kỹ thuật về mã hóa mẫu QRCode, lấy mẫu hiện trường, bảo quản, vận chuyển, tiếp nhận tại PTN được **giữ nguyên bản chất** so với bản gốc, chỉ tái cấu trúc theo khung Bước–Trách nhiệm–Biểu mẫu.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi | Lần ban hành |
| --------- | ------------------ | ------------ |
| 22/4/2025 | Ban hành lần thứ 1 | 01 |
| 21/07/2026 | Rà soát toàn diện theo khung mẫu chuẩn ETV.P14: bổ sung RACI đầy đủ, căn cứ pháp luật đầy đủ số hiệu (đã có trong bản gốc, giữ nguyên), chuẩn hóa mã biểu mẫu/mã thủ tục theo đúng quy ước; 5 biểu mẫu áp dụng chờ số hóa do chưa có file nguồn. | 02 |

---

## I. MỤC ĐÍCH

Thủ tục này quy định quy trình lấy mẫu, xử lý và bảo quản mẫu môi trường (nước, đất, không khí, khí thải, chất thải…) nhằm đảm bảo tính đại diện, ổn định, truy xuất được của mẫu trong quá trình thực hiện dịch vụ quan trắc môi trường, bao gồm: quan trắc phân tích định kỳ; quan trắc đối chứng; đánh giá chất lượng hệ thống trạm quan trắc tự động, liên tục. Thủ tục được xây dựng phù hợp với Luật Bảo vệ môi trường và các văn bản hướng dẫn thi hành, đồng thời đáp ứng yêu cầu của ISO/IEC 17025:2017.

## II. PHẠM VI ÁP DỤNG

Áp dụng cho toàn bộ hoạt động lấy mẫu, xử lý và bảo quản mẫu môi trường phục vụ dịch vụ quan trắc do ETV thực hiện tại hiện trường hoặc tại phòng thí nghiệm, bao gồm các chương trình quan trắc do cơ quan quản lý nhà nước yêu cầu hoặc theo hợp đồng dịch vụ.

## III. TÀI LIỆU VIỆN DẪN

- ISO/IEC 17025:2017 §7.3 (Lấy mẫu), §7.4 (Xử lý đối tượng thử nghiệm/hiệu chuẩn).
- Luật Bảo vệ môi trường 72/2020/QH14.
- Nghị định 08/2022/NĐ-CP quy định chi tiết một số điều của Luật Bảo vệ môi trường.
- Nghị định 05/2025/NĐ-CP sửa đổi, bổ sung Nghị định 08/2022/NĐ-CP.
- Thông tư 02/2022/TT-BTNMT quy định chi tiết thi hành một số điều của Luật Bảo vệ môi trường.
- Thông tư 10/2021/TT-BTNMT quy định kỹ thuật quan trắc môi trường.
- TCVN 6663-1:2011 — Chất lượng nước, Lấy mẫu, Hướng dẫn lập chương trình lấy mẫu và kỹ thuật lấy mẫu.
- TCVN 6663-3:2016 — Chất lượng nước, Lấy mẫu, Bảo quản và xử lý mẫu nước.
- TCVN 5999:1995 — Hướng dẫn lấy mẫu nước thải.
- US EPA Method 5.
- ETV.QM — Sổ tay chất lượng.
- ETV.P 04 — Thủ tục Cơ sở vật chất và điều kiện môi trường (điều kiện bảo quản mẫu tại PTN).
- ETV.P 14 — Thủ tục Kiểm soát tài liệu.
- ETV.P 15 — Thủ tục Kiểm soát hồ sơ.

## IV. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 4.1. Thuật ngữ và định nghĩa

| Thuật ngữ | Diễn giải |
|---|---|
| Quan trắc môi trường | Hoạt động lấy mẫu, đo các thông số ngay tại hiện trường hoặc bảo quản, vận chuyển về xử lý, phân tích các thông số trong phòng thí nghiệm theo kế hoạch lập sẵn về không gian và thời gian. |
| Mẫu môi trường | Nước mặt, nước ngầm, không khí, khí thải, nước thải, đất, trầm tích, chất thải rắn... |
| Bảo quản mẫu | Các biện pháp duy trì đặc tính mẫu trong giới hạn sai số cho phép từ thời điểm lấy mẫu đến khi phân tích. |

### 4.2. Chữ viết tắt

- ETV: Viện Kiểm định Công nghệ và Môi trường
- PTN: Phòng Thí nghiệm
- TNMT: Tài nguyên và Môi trường
- QA/QC: Quản lý chất lượng/Kiểm soát chất lượng (Quality Assurance/Quality Control)

## V. VAI TRÒ VÀ TRÁCH NHIỆM (RACI)

| Vai trò | Trách nhiệm chính |
|---|---|
| Lãnh đạo Viện (LĐV) | Chủ sở hữu thủ tục; phân công nhân sự, đảm bảo trang thiết bị, phương tiện đáp ứng điều kiện lấy mẫu theo quy định. |
| Trung tâm Quan trắc và Chứng nhận phù hợp | Thực hiện kế hoạch lấy mẫu, xử lý và bảo quản mẫu đúng kỹ thuật. |
| Cán bộ lấy mẫu | Thực hiện đầy đủ các bước lấy mẫu, ghi nhận và bảo quản đúng quy định pháp luật và tiêu chuẩn kỹ thuật. |
| Bộ phận chất lượng (QLCL) | Kiểm tra định kỳ quá trình lấy mẫu và lưu trữ hồ sơ liên quan. |

## VI. NỘI DUNG / QUY TRÌNH THỰC HIỆN

### 6.1. Mã hóa mẫu và chuẩn bị trước khi lấy mẫu

**6.1.1. Mã hóa mẫu tại hiện trường và tích hợp tem QRCode**

Mỗi mẫu tại hiện trường được định danh bằng mã tem dạng `25M-abcde`, trong đó `25M` là tiền tố hệ thống ETV phát hành theo năm (ví dụ năm 2025), `abcde` là số thứ tự từ 00001 đến 10000 (in sẵn hàng loạt 10.000–20.000 tem nhãn). Tem QRCode in sẵn, dán trực tiếp lên chai/lọ mẫu; mỗi mã QRCode liên kết tới `manlab.etv.org.vn`, cho phép truy xuất đầy đủ thông tin mẫu (vị trí lấy mẫu, loại mẫu, thông số, nhân sự lấy mẫu, phương pháp lấy mẫu, bảo quản...). Quét QRCode tại hiện trường hoặc trong PTN giúp đồng bộ hóa dữ liệu và giảm sai sót nhập liệu; mã QR cũng lưu trong nhật ký điện tử và biên bản lấy mẫu.

Mã định danh `25M-abcde` không thể hiện trực tiếp loại hình dịch vụ, loại mẫu môi trường hay danh sách chỉ tiêu phân tích — các thông tin này được ánh xạ và quản lý tập trung trên ManLab; khi quét mã QR hoặc nhập tay mã định danh, hệ thống hiển thị đầy đủ các trường thông tin kỹ thuật liên quan, đảm bảo khả năng truy xuất, đồng bộ và kiểm soát chất lượng.

**6.1.2. Mã hóa mẫu tại phòng thí nghiệm**

Mã định danh `25M-abcde` giữ nguyên từ hiện trường, là khóa truy xuất chính; hệ thống tự động ánh xạ mã này với toàn bộ quy trình phân tích, kết quả và báo cáo.

**6.1.3. Chuẩn bị dụng cụ lấy mẫu và bình chứa mẫu**

Lấy mẫu ở độ sâu không quá 1 m dùng bình chứa mẫu trực tiếp; sâu quá 1 m phải dùng dụng cụ cán dài rồi đổ sang bình chứa. Dụng cụ theo loại mẫu/chỉ tiêu: mẫu dầu mỡ/vi sinh dùng chai thủy tinh miệng rộng; mẫu nước thông thường dùng chai nhựa PE/PP sạch; mẫu kim loại nặng dùng chai nhựa đã xử lý HNO₃; mẫu vi sinh dùng chai thủy tinh tối màu vô trùng.

**6.1.4. Kiểm tra và làm sạch dụng cụ**

Dụng cụ chứa mẫu rửa bằng HNO₃ hoặc HCl tỷ lệ 1:1, tráng nước cất, sấy khô. Không sử dụng lại chai lọ đựng hóa chất chưa xử lý đúng quy trình làm sạch.

**6.1.5. Kiểm soát nhiễm bẩn**

Kiểm soát và phân định nguồn nhiễm bẩn: tối đa hóa mức độ cách ly bình mẫu khỏi nhiễm bẩn; tránh xáo trộn tại vị trí lấy mẫu; súc rửa kỹ dụng cụ, phễu, xi lanh, phương tiện lọc trước khi dùng; bảo quản nắp/nút chai cẩn thận; lau khô dây/xích/cán nối giữa các lần lấy mẫu; tránh chạm tay/găng tay vào mẫu (đặc biệt mẫu vi sinh); đảm bảo phương tiện ở dưới hướng gió; loại bỏ và lấy lại mẫu nếu quan sát thấy tạp chất (lá cây, mảnh vụn).

**6.1.6. Dán nhãn mẫu**

Dán tem QRCode `25M-abcde` in sẵn, chắc chắn trên mỗi chai/lọ mẫu, đảm bảo không phai/bong tróc trong điều kiện lạnh/ẩm; trường hợp không có thiết bị đọc QRCode, nhập tay mã để truy xuất thông tin.

### 6.2. Lấy mẫu tại hiện trường

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| Thực hiện lấy mẫu theo tiêu chuẩn kỹ thuật (TCVN 6663-1, 6663-3, 6663-6, 5999...); phân biệt mẫu điểm/mẫu tổ hợp (nước lặng và nước chảy), lấy mẫu theo chu kỳ/liên tục (nước chảy), lấy mẫu theo loạt (nước lặng). Ghi nhận thông tin hiện trường (nhiệt độ, thời tiết, dòng chảy, mùi, màu...); chụp ảnh hiện trường lưu hồ sơ. | Cán bộ lấy mẫu | `ETV.P.F 09.03` |
| Lấy mẫu kiểm soát chất lượng hiện trường (QA/QC): chương trình < 30 mẫu lấy 01 mẫu lặp và 01 mẫu trắng hiện trường; chương trình ≥ 30 mẫu, QA/QC ít nhất 10% tổng mẫu. | Cán bộ lấy mẫu | `ETV.P.F 09.03` |
| Đo nhanh tại hiện trường các chỉ tiêu pH, DO, TDS, EC, nhiệt độ ngay tại thời điểm lấy mẫu. | Cán bộ lấy mẫu | `ETV.P.F 09.03` |
| Lập biên bản kỹ thuật tại hiện trường (biên bản đo đạc/lấy mẫu, biên bản lấy mẫu hiện trường). | Cán bộ lấy mẫu | `ETV.P.F 09.03` |

**Kỹ thuật lấy mẫu theo đối tượng:**

- *Nước sông, suối*: nhúng bình vào giữa dòng, cách bề mặt 30–40 cm, miệng bình ngược dòng chảy, tránh chất rắn kích thước lớn; khi đầy bình, thêm chất bảo quản và đậy nút kín.
- *Nước ngầm*: lấy tại giếng khoan (bằng máy bơm) hoặc giếng đào sẵn (bằng gầu múc/bơm tay); trút ngay sang bình đựng mẫu, đậy nút thật kín (thành phần dễ thay đổi khi tiếp xúc không khí).
- *Nước hồ*: nếu thông số phân bố đều, lấy tối thiểu 2 điểm giữa hồ (cách bề mặt 10–30 cm và cách đáy 100 cm).
- *Nước thải*: tại cống/rãnh/hố ga — dọn sạch địa điểm trước khi lấy mẫu (loại bỏ cặn, bùn, lớp vi khuẩn); tại trạm xử lý nước thải — xác định mục tiêu chương trình (kiểm tra hiệu quả tổng thể: lấy mẫu đầu vào/đầu ra chính; kiểm tra hiệu quả từng công đoạn: lấy mẫu đầu vào/đầu ra của bộ phận cần kiểm tra).

### 6.3. Bảo quản và vận chuyển mẫu

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| Bảo quản mẫu tại hiện trường: duy trì nhiệt độ 1–5°C bằng đá khô/tủ lạnh di động; thêm chất bảo quản (H₂SO₄, HNO₃, NaOH...) theo yêu cầu từng chỉ tiêu; mỗi chỉ tiêu riêng biệt bảo quản trong chai lọ riêng. | Cán bộ lấy mẫu | — |
| Vận chuyển mẫu về PTN càng sớm càng tốt, tối đa 24 giờ tùy chỉ tiêu; sử dụng thùng cách nhiệt chuyên dụng; có biên bản giao nhận mẫu đi kèm. | Cán bộ lấy mẫu | `ETV.P.F 09.02` |

### 6.4. Tiếp nhận, xử lý và lưu giữ mẫu tại PTN

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| Tiếp nhận và kiểm tra điều kiện mẫu: tình trạng, nhiệt độ, nhãn, số lượng lọ/chai; mẫu không đạt điều kiện (nhiệt độ > 10°C, vỡ chai, mất nhãn) phải lập biên bản xử lý. | Nhân sự PTN | `ETV.P.F 09.02` |
| Xử lý sơ bộ mẫu: lọc, ổn định, thêm hóa chất nếu cần; ghi chú rõ cách xử lý vào phiếu mã hóa mẫu. | Nhân sự PTN | `ETV.P.F 09.04` |
| Lưu giữ mẫu sau phân tích: thời gian lưu tối thiểu 7–30 ngày tùy loại mẫu; bảo quản đúng điều kiện ánh sáng, nhiệt độ, tránh nhiễm chéo. | Nhân sự PTN | — |

## VII. BIỂU MẪU ÁP DỤNG

| Mã | Tên biểu mẫu | Trạng thái số hóa |
|---|---|---|
| `ETV.P.F 09.01` | Kế hoạch lấy mẫu | Chưa số hóa — chưa có file nguồn trong thư mục Dropbox, cần Trung tâm Quan trắc bổ sung |
| `ETV.P.F 09.02` | Biên bản giao nhận mẫu | Chưa số hóa — chưa có file nguồn trong thư mục Dropbox, cần Trung tâm Quan trắc bổ sung |
| `ETV.P.F 09.03` | Nhật ký lấy mẫu | Chưa số hóa — chưa có file nguồn trong thư mục Dropbox, cần Trung tâm Quan trắc bổ sung |
| `ETV.P.F 09.04` | Phiếu đánh giá điều kiện bảo quản và xử lý mẫu | Chưa số hóa — chưa có file nguồn trong thư mục Dropbox, cần Trung tâm Quan trắc bổ sung |
| `ETV.P.F 09.05` | Phiếu yêu cầu phân tích | Chưa số hóa — chưa có file nguồn trong thư mục Dropbox, cần Trung tâm Quan trắc bổ sung |

> Mã biểu mẫu đã chuẩn hóa từ `ETV.F09.xx` (bản gốc) thành `ETV.P.F 09.xx` theo đúng quy ước mã hóa tại `knowledge/03_ma_hoa_van_ban.md` — xem ghi chú số hóa AI đầu văn bản.

## VIII. LƯU HỒ SƠ

Hồ sơ kế hoạch lấy mẫu, nhật ký lấy mẫu, phiếu yêu cầu phân tích, biên bản giao mẫu, báo cáo phân tích gốc được lưu tối thiểu 3 năm theo `ETV.P 15`.
