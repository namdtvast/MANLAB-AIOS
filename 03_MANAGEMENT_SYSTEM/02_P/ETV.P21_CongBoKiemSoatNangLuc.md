---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát
id: ETV.P21
title: "Thủ tục Công bố, Thông báo và Kiểm soát Năng lực Đo lường và Quan trắc Môi trường"
type: Thu-tuc
owner: "(cập nhật — chức danh LĐP phụ trách Năng lực)"
department: "Toàn Viện"
process: MP21_CongBoNangLuc
capability: CAP-10_CongBoNangLuc
module: M21_CongBoNangLuc
effective_date: "26/06/2026"
revision: "02"
status: Da-phe-duyet
keywords: [công bố năng lực, thông báo năng lực, kiểm soát năng lực, đo lường, quan trắc môi trường, ManLab, ISO 17025 §7.7]
related_documents: [ETV.P14, ETV.P15]
iso_clause: ["ISO/IEC 17025:2017 §7.7", "ISO 17034:2016 §7.7 (có điều kiện)"]
legal_basis: ["Nghị quyết 66.18/2026/NQ-CP", "Nghị quyết 66.19/2026/NQ-CP"]
ai_tags: [notification, competence-publication, metrological-monitoring]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Vĩnh viễn (bản hiện hành)"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: "ETV.P21 lần ban hành 02 (26/06/2026)"
superseded_by: null
---
# THỦ TỤC CÔNG BỐ, THÔNG BÁO VÀ KIỂM SOÁT NĂNG LỰC ĐO LƯỜNG VÀ QUAN TRẮC MÔI TRƯỜNG

|                           |                      |
| ------------------------- | -------------------- |
| **Mã số**         | ETV.P 21             |
| **Lần ban hành**  | 02                   |
| **Ngày ban hành** | 26/06/2026           |
| **Hiệu lực**      | 26/06/2026           |
| **Biên soạn**     | Trần Thị Hoa       |
| **Soát xét**      | Nguyễn Ngọc Tuấn  |
| **Phê duyệt**     | Nguyễn Hoàng Giang |

> **Tình trạng bản này: ĐÃ PHÊ DUYỆT** — chuẩn hóa thiết kế module P21 trên ManLab theo kiến trúc menu-trạng thái, hợp nhất phần bổ sung V4 (Danh mục Đối tượng, trường dữ liệu bắt buộc, luồng phê duyệt, điều kiện gate). Bản này có hiệu lực từ ngày 26/06/2026.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi                                                                                                                        | Lần ban hành |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| 25/05/2026 | Ban hành theo NQ 66.18/2026/NQ-CP và NQ 66.19/2026/NQ-CP về phân quyền, cắt giảm, đơn giản hóa TTHC                              | 01             |
| 26/06/2026 | Chuẩn hóa thiết kế module P21 trên ManLab theo kiến trúc menu-trạng thái; làm rõ ánh xạ ba lớp trạng thái                   | 02             |
| 28/06/2026 | Hợp nhất phần bổ sung V4 (Danh mục Đối tượng — PTĐ/chuẩn đo lường/mẫu/thông số, trường dữ liệu bắt buộc, luồng phê duyệt, điều kiện gate) | 02             |
| 05/07/2026 | Mở rộng khái niệm Đối tượng (PTĐ, chuẩn đo lường, mẫu/nền mẫu, thông số); bổ sung luồng Khôi phục, bảng điều kiện đánh giá, quy tắc kết luận năng lực, luồng không soát xét, cảnh báo tự động chi tiết và điều khoản kiểm soát cuối | 02             |
| 05/07/2026 | Bám sát module ManLab thực tế (namdtvast.github.io/manlab-p21-test): gộp QLCL vào LĐP (ManLab chỉ có 3 vai trò NTH/LĐP/LĐV + Super Admin); sửa luồng trạng thái, gate G1–G6, quy tắc nghiệp vụ BR1–BR11 khớp đúng hệ thống | 02             |

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

---

## I. MỤC ĐÍCH

Thủ tục này quy định trình tự, trách nhiệm và yêu cầu kỹ thuật để công bố, thông báo và kiểm soát năng lực đo lường và quan trắc môi trường nhằm đáp ứng yêu cầu Điều 7.7 của ISO/IEC 17025:2017, đảm bảo năng lực được công khai chính xác, cập nhật, kiểm soát chặt chẽ qua hệ thống ManLab, và tuân thủ các quy định pháp lý hiện hành (NQ 66.18, NQ 66.19).

## II. PHẠM VI ÁP DỤNG

Áp dụng cho toàn bộ vòng đời:

**Tạo hồ sơ → Liên kết Đối tượng (Gate G1–G6) → Đánh giá → Gửi soát xét → Soát xét → Phê duyệt nội bộ & ký số → Gửi cơ quan tiếp nhận → Công khai/Thông báo → Duy trì → Điều chỉnh → Tạm dừng → Khôi phục → Hủy bỏ/Hết hiệu lực → Lưu trữ**

đối với **Đối tượng** — khái niệm chung cho:

- Phương tiện đo (PTĐ), chuẩn đo lường
- Mẫu, nền mẫu
- Thông số thử nghiệm hoặc quan trắc môi trường

và năng lực dịch vụ đo lường, quan trắc môi trường tương ứng; cùng Hồ sơ P21 (năng lực công bố/thông báo) trên hệ thống ManLab.

**Không áp dụng cho:**

- Đánh giá năng lực nội bộ (thuộc MP16 — Đánh giá nội bộ)
- Dữ liệu kết quả đo lường thô (thuộc MP08-MP11)

## III. PHÂN QUYỀN VAI TRÒ VÀ TRÁCH NHIỆM (RACI)

Hệ thống ManLab chỉ cấp 3 vai trò nghiệp vụ cho module P21 — **Người thực hiện (NTH), Lãnh đạo phòng (LĐP), Lãnh đạo Viện (LĐV)** — cộng vai trò kỹ thuật **Super Admin** (chỉ cấu hình hệ thống, phân quyền tài khoản, không phê duyệt nội dung chuyên môn). Chức năng Quản lý chất lượng (QLCL) — lập/ký/gửi bản công bố, kiểm soát tạm dừng/điều chỉnh/hủy bỏ — do **LĐP đảm nhiệm** trên cùng tài khoản LĐP, không tồn tại như một vai trò đăng nhập riêng.

| Bước trong vòng đời | Người thực hiện (NTH) | Lãnh đạo phòng (LĐP) | Lãnh đạo viện (LĐV) |
| --- | --- | --- | --- |
| Tạo hồ sơ, nhập danh mục/trường dữ liệu | R/A | I | I |
| Liên kết Đối tượng từ Danh mục PTĐ (Gate G) | R | I | I |
| Gửi soát xét | R | I | I |
| Soát xét · Đề nghị LĐV duyệt (hoặc trả lại bổ sung) | I | R/A | I |
| Phê duyệt nội bộ & ký số (hoặc trả lại soát xét) | I | I | R/A |
| Gửi cơ quan tiếp nhận | I | R/A | I |
| Ghi nhận biên nhận / xử lý yêu cầu bổ sung | R | C | I |
| Công khai & sinh QR | I | R/A | I |
| Điều chỉnh (mở khóa, tạo phiên bản mới) | R | R | I |
| Hoàn tất điều chỉnh & khóa phiên bản mới | I | R/A | I |
| Tạm dừng / Hủy bỏ / Hết hiệu lực | I | C | R/A |
| Khôi phục (từ Tạm dừng) | I | C | R/A |
| Lưu trữ hồ sơ | I | C | R/A |

## IV. TÀI LIỆU TRÍCH DẪN

> Nguyên tắc: **chỉ dẫn chiếu, không chép lại nội dung.**

- Nghị quyết 66.18/2026/NQ-CP — công bố năng lực kiểm định/hiệu chuẩn/thử nghiệm
- Nghị quyết 66.19/2026/NQ-CP — thông báo hoạt động dịch vụ quan trắc môi trường
- ISO/IEC 17025:2017 §7.7 — yêu cầu công khai năng lực
- ISO 17034:2016 §7.7 (áp dụng khi sản xuất chất chuẩn — CAP-09)
- Luật Giao dịch điện tử 20/2023/QH15 — chữ ký điện tử, giá trị pháp lý
- ETV.P14 — Kiểm soát tài liệu
- ETV.P15 — Quản lý hồ sơ

## V. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 5.1 Thuật ngữ và định nghĩa

**Năng lực của tổ chức (Competence):** Là khả năng của Viện ETV thực hiện các dịch vụ đo lường (kiểm định/hiệu chuẩn/thử nghiệm), quan trắc môi trường, đánh giá độ chính xác tương đối (RA), đánh giá chất lượng hệ thống trạm quan trắc hoặc sản xuất mẫu chuẩn theo đúng tiêu chuẩn quốc tế/quốc gia và các quy định pháp lý hiện hành.

**Đối tượng:** Khái niệm chung dùng để công bố/thông báo năng lực đo lường và quan trắc môi trường, bao gồm: phương tiện đo (PTĐ), chuẩn đo lường, mẫu, nền mẫu, hoặc thông số thử nghiệm/quan trắc môi trường mà ETV dự kiến hoặc đang thực hiện dịch vụ.

**Năng lực của Đối tượng:** Khả năng ETV thực hiện dịch vụ đối với một Đối tượng cụ thể, được chứng minh bằng nhân lực thực hiện, phương pháp, thiết bị, chuẩn đo lường, mẫu chuẩn, điều kiện kỹ thuật và hồ sơ bằng chứng.

**Công bố năng lực:** Hành động đưa ra công khai danh sách năng lực, Đối tượng, dịch vụ của ETV thông qua:

- Bản Công bố năng lực dịch vụ Đo lường (theo Mẫu 01, NQ 66.18)
- Bản Thông báo năng lực dịch vụ QTMT (theo Mẫu 9.01, NQ 66.19)

**Kiểm soát năng lực:** Giám sát, xác minh, cập nhật, điều chỉnh, tạm dừng, khôi phục hoặc hủy bỏ năng lực, Đối tượng để đảm bảo tính chính xác, đầy đủ, hiện hành trên hệ thống ManLab.

**Hồ sơ P21:** Tập hợp dữ liệu, tài liệu chứng minh năng lực (hồ sơ đánh giá, báo cáo kỹ thuật, bản công bố, thông báo) được lưu trữ trên ManLab. Là bảng cha, quản lý một lần công bố/thông báo mới, bổ sung, điều chỉnh, tạm dừng, khôi phục hoặc hủy bỏ năng lực.

**Danh mục năng lực của Đối tượng:** Bảng con thuộc Hồ sơ P21, liệt kê từng Đối tượng cần đánh giá năng lực, đặc tính kỹ thuật, bằng chứng năng lực, kết luận đánh giá và trạng thái áp dụng (tên đối tượng, phạm vi đo, cấp/độ chính xác, sai số, LOD/LOQ, độ không đảm bảo đo, QA/QC, thử nghiệm thành thạo).

**Tạm dừng:** Trạng thái áp dụng khi Đối tượng tạm thời không đủ điều kiện duy trì năng lực hoặc thiếu đặc tính/bằng chứng bắt buộc.

**Khôi phục:** Trạng thái áp dụng khi Đối tượng đã tạm dừng được đánh giá lại, khắc phục xong nguyên nhân tạm dừng và được phê duyệt sử dụng trở lại.

**Hủy bỏ:** Trạng thái áp dụng khi Đối tượng không đáp ứng, không thể khắc phục hoặc ETV dừng cung cấp dịch vụ.

**Trạng thái dữ liệu:** Mô tả tình trạng hiệu lực của dữ liệu năng lực, Đối tượng, công bố/thông báo trên ManLab (Chưa lập → Đang lập → Chờ soát xét → Đã soát xét · Chờ LĐV duyệt → Đã phê duyệt nội bộ → Đã gửi cơ quan tiếp nhận → Đã tiếp nhận/ghi nhận → Đã công khai · Còn hiệu lực → Tạm dừng ⇄ Khôi phục → Hủy bỏ/Hết hiệu lực), xem chi tiết tại 6.9.

### 5.2 Chữ viết tắt

| Ký hiệu    | Ý nghĩa                                   |
| ------------ | ------------------------------------------- |
| PTĐ         | Phương tiện đo (một loại Đối tượng)    |
| QTMT         | Quan trắc môi trường                    |
| NTH          | Người thực hiện                         |
| LĐP         | Lãnh đạo phòng                          |
| LĐV         | Lãnh đạo viện                           |
| NQ           | Nghị quyết                                |
| ManLab       | Nền tảng quản lý thông tin tập trung  |
| BR           | Business Rule — Quy tắc nghiệp vụ do ManLab tự động kiểm soát (BR1–BR11, xem 6.1) |
| Gate (G)     | Cổng điều kiện tự động kiểm tra trước khi liên kết Đối tượng (G1–G6, xem 6.4.1) |

## VI. NỘI DUNG

### 6.1 Nguyên tắc kiểm soát và Quy tắc nghiệp vụ (BR)

**Toàn bộ dữ liệu năng lực phải được lưu trữ điện tử trên ManLab** — không duy trì quản lý song song bằng giấy. Các quy tắc nghiệp vụ (Business Rules) sau được ManLab tự động kiểm soát xuyên suốt vòng đời hồ sơ P21:

| Mã | Quy tắc |
| --- | --- |
| BR1 | Sau khi Phê duyệt nội bộ & ký số, toàn bộ dữ liệu hồ sơ bị khóa (🔒). Muốn sửa phải qua thao tác Điều chỉnh — không được sửa trực tiếp. |
| BR2 | (Đo lường) Bản Công bố (Mẫu 01) gửi Trung tâm Phục vụ hành chính công cấp tỉnh; cơ quan ghi nhận trong 03 ngày làm việc kể từ ngày gửi. |
| BR3 | (QTMT) Bắt buộc gửi Bản Thông báo (Mẫu 9.01) tới Bộ Nông nghiệp và Môi trường **trước khi** cung cấp dịch vụ quan trắc môi trường. |
| BR4 | Khi Công khai, ManLab tự sinh mã QR tra cứu & xác thực bản gốc trên Trang công khai. |
| BR5 | Chỉ phạm vi ở trạng thái **Đã công khai · Còn hiệu lực** được phép dùng trong báo giá, hợp đồng, chứng chỉ, phiếu kết quả, báo cáo; các trạng thái Tạm dừng/Đang điều chỉnh/Hủy bỏ/Hết hiệu lực bị chặn sử dụng. |
| BR6 | (QTMT) Báo cáo hoạt động hằng năm (Mẫu 9.02) phải gửi Bộ Nông nghiệp và Môi trường trước ngày 30/01 năm kế tiếp. |
| BR7 | Mọi thao tác chuyển trạng thái được ghi Nhật ký (thời gian, tài khoản, lý do nếu có) để truy xuất nguồn gốc đầy đủ. |
| BR8 | Cơ chế tự công bố/thông báo theo NQ 66.18/66.19 có hiệu lực áp dụng đến 28/02/2027 (theo lộ trình thí điểm); ManLab cảnh báo khi gần hết hạn. |
| BR9 | Hồ sơ chỉ được gửi soát xét khi có ít nhất 01 dòng Đối tượng kết luận "Đáp ứng" hoặc "Điều chỉnh" (cho phép công bố phần đạt). |
| BR10 | Mỗi dòng Đối tượng kết luận "Không đáp ứng"/"Điều chỉnh" bắt buộc ghi Lý do + đính kèm Bằng chứng trước khi ký số; dòng "Không đáp ứng" không được đưa lên Trang công khai. |
| BR11 | Khi hồ sơ chuyển sang Công khai, ManLab tự ghi ngược năng lực vào Danh mục Phương tiện đo và chuyển trạng thái PTĐ liên quan sang "Đang sử dụng". |

### 6.2 Mục tiêu nghiệp vụ, actor, đầu vào, đầu ra

**Mục tiêu:**

- Công khai chính xác năng lực của ETV
- Kiểm soát chặt chẽ tính hiện hành, đầy đủ của dữ liệu công bố
- Đáp ứng yêu cầu ISO/IEC 17025 §7.7 và các quy định pháp lý

**Actor (Người tham gia):**

- **NTH:** Tạo hồ sơ, nhập thông tin hồ sơ cha, liên kết Đối tượng từ Danh mục Phương tiện đo, ghi kết luận từng dòng, gửi soát xét, ghi nhận biên nhận, xử lý yêu cầu bổ sung
- **LĐP:** Soát xét hồ sơ (duyệt hoặc trả lại bổ sung), gửi cơ quan tiếp nhận, công khai & sinh QR, hoàn tất điều chỉnh — bao gồm cả chức năng Quản lý chất lượng (lập/kiểm tra bản công bố)
- **LĐV:** Phê duyệt nội bộ & ký số (hoặc trả lại soát xét), quyết định Tạm dừng/Khôi phục/Hủy bỏ/Hết hiệu lực
- **Super Admin:** Chỉ cấu hình hệ thống, phân quyền tài khoản; không phê duyệt nội dung chuyên môn

**Đầu vào:**

- Phiếu đề xuất (F21.01)
- Dữ liệu Đối tượng đã duyệt trong Danh mục Phương tiện đo (liên kết 🔗, không nhập tay)
- Kết luận đánh giá từng dòng (Đáp ứng/Không đáp ứng/Điều chỉnh) kèm Lý do + Bằng chứng khi cần (BR10)

**Đầu ra:**

- Hồ sơ P21 hoàn chỉnh trên ManLab
- Bản Công bố năng lực dịch vụ Đo lường (Mẫu 01, NQ 66.18) — có chữ ký số
- Bản Thông báo năng lực dịch vụ QTMT (Mẫu 9.01, NQ 66.19) — có chữ ký số
- Báo cáo hoạt động hằng năm (Mẫu 9.02, NQ 66.19)
- Trang công khai tra cứu năng lực kèm mã QR xác thực (BR4)

### 6.3 Tạo hồ sơ và liên kết Đối tượng (Danh mục năng lực Đối tượng)

#### 6.3.1 Tạo hồ sơ và nhập thông tin hồ sơ cha

- NTH bấm "+ Đo lường (Mẫu 01)" hoặc "+ Quan trắc MT (Mẫu 9.01)" để tạo hồ sơ mới — trạng thái "Chưa lập" → "Đang lập".
- NTH điền thông tin hồ sơ cha: tên tổ chức, người đại diện pháp luật, địa chỉ, cơ quan tiếp nhận, (Đo lường) địa điểm thực hiện hoạt động, (QTMT) phạm vi nền mẫu và số hiệu công nhận ISO/IEC 17025.

#### 6.3.2 Liên kết Đối tượng — không nhập tay

**Đối tượng chỉ được thêm vào Danh mục năng lực bằng cách liên kết (🔗) từ Danh mục Phương tiện đo đã duyệt** — không được nhập tay tự do. Dữ liệu được chụp snapshot tại thời điểm liên kết; nếu người dùng sửa tay các trường kỹ thuật sau đó, dòng sẽ tự động tách khỏi liên kết gốc.

Hệ thống tự lọc Đối tượng đủ điều kiện liên kết theo **Gate G1–G6** (6.4.1). Với mỗi dòng đã thêm, NTH ghi:

- Kết luận: **Đáp ứng / Không đáp ứng / Điều chỉnh**
- Nếu Không đáp ứng hoặc Điều chỉnh: bắt buộc **Lý do** + **Bằng chứng** (ảnh chụp màn hình/tài liệu đính kèm) — BR10

#### 6.3.3 Trường dữ liệu bắt buộc (Mục 8.2)

| Loại hồ sơ | Trường bắt buộc theo dòng Đối tượng |
| --- | --- |
| Đo lường (Mẫu 01) | Tên đối tượng, Lĩnh vực, Phạm vi đo, Quy trình thực hiện, Cấp/độ chính xác·MPE·LOD |
| QTMT (Mẫu 9.01) | Thông số/loại mẫu, Phương pháp |

Trường bắt buộc của hồ sơ cha: Cơ quan tiếp nhận, Tên tổ chức, Địa chỉ, Người đại diện pháp luật; riêng Đo lường bắt buộc thêm Địa điểm thực hiện hoạt động.

### 6.4 Điều kiện Gate và đánh giá kỹ thuật

#### 6.4.1 Gate G1–G6 (kiểm tra tự động khi liên kết Đối tượng)

Đối tượng chỉ được liên kết vào hồ sơ P21 khi đạt toàn bộ các cổng sau:

| Gate | Nội dung kiểm tra |
| --- | --- |
| G1 | Phương tiện đo (PTĐ) đang ở trạng thái "Đã duyệt" hoặc "ĐN LĐV duyệt" trong Danh mục Phương tiện đo |
| G2 | (chỉ dịch vụ Hiệu chuẩn) Có CMC hợp lệ — CMC > 0 và có đơn vị tính — nếu không sẽ không lập được Bản công bố theo NQ 66.18 |
| G3 | Đã liên kết quy trình/phương pháp thực hiện |
| G5 | Có phạm vi áp dụng |
| G6 | Đã gán căn cứ năng lực pháp lý (ĐK105/ĐK107/N383/VILAS/Giấy chứng nhận KHCN) |

Đối tượng không đạt Gate bị loại khỏi danh sách liên kết và hiển thị lý do không đạt tương ứng.

#### 6.4.2 Đánh giá kỹ thuật bổ sung trước khi kết luận từng dòng

- **Kiểm tra hồ sơ/bên ngoài:** chứng chỉ đào tạo, bằng cấp, kinh nghiệm nhân sự thực hiện; kết quả kỹ thuật trước đó; yêu cầu khách hàng, điều kiện thực tế thực hiện dịch vụ.
- **Kiểm tra kỹ thuật:** quy trình/SOP, phương pháp đo, tiêu chuẩn áp dụng; tài liệu hỗ trợ; hệ thống quản lý (QA, kiểm soát chất lượng).
- **Kiểm tra đo lường:** đặc tính đối tượng (độ lặp lại, độ tuyến tính); so sánh chuẩn đơn vị; độ không đảm bảo của phương pháp; khả năng đo được các dải phạm vi công bố.
- **Kiểm tra năng lực dịch vụ QTMT:** hồ sơ nhân viên (đào tạo, kinh nghiệm); thiết bị đo môi trường, hiệu chuẩn, bảo dưỡng; địa điểm/phương pháp lấy mẫu, bảo quản mẫu; phòng thí nghiệm QTMT (nếu có).

### 6.5 Gửi soát xét, soát xét và phê duyệt nội bộ

#### 6.5.1 NTH: Kiểm tra và gửi soát xét

- Trước khi gửi, ManLab hiển thị các trường còn thiếu theo Mục 8.2.
- Điều kiện bắt buộc (BR9): hồ sơ phải có **ít nhất 01 dòng Đối tượng** kết luận Đáp ứng hoặc Điều chỉnh.
- NTH bấm "Gửi soát xét" → hồ sơ chuyển sang trạng thái **Chờ soát xét (Lãnh đạo phòng)**.

#### 6.5.2 LĐP: Soát xét

LĐP kiểm tra tính đầy đủ, chính xác của hồ sơ cha, Danh mục năng lực Đối tượng và kết luận từng dòng.

- **Duyệt soát xét · Đề nghị Lãnh đạo Viện duyệt** → hồ sơ chuyển sang **Đã soát xét · Chờ Lãnh đạo Viện duyệt**.
- **Trả lại bổ sung** → LĐP bắt buộc nhập lý do trên ManLab; hồ sơ quay về trạng thái **Đang lập** để NTH bổ sung.

#### 6.5.3 LĐV: Phê duyệt nội bộ & ký số

- **Phê duyệt nội bộ & ký số** → hồ sơ chuyển sang **Đã phê duyệt nội bộ**, dữ liệu bị khóa (BR1). Trước khi ký, nếu còn dòng Không đáp ứng/Điều chỉnh thiếu Lý do hoặc Bằng chứng, ManLab chặn ký số (BR10).
- **Trả lại soát xét** → LĐV bắt buộc nhập lý do trên ManLab; hồ sơ quay về trạng thái **Chờ soát xét** để LĐP xem lại.

### 6.6 Gửi cơ quan tiếp nhận, ghi nhận và công khai

#### 6.6.1 LĐP: Gửi cơ quan tiếp nhận

- Đo lường: gửi Trung tâm Phục vụ hành chính công cấp tỉnh (BR2 — ghi nhận trong 03 ngày làm việc).
- QTMT: gửi Bộ Nông nghiệp và Môi trường **trước khi** cung cấp dịch vụ (BR3).
- Hồ sơ chuyển sang trạng thái **Đã gửi cơ quan tiếp nhận**.

#### 6.6.2 NTH: Ghi nhận biên nhận hoặc xử lý yêu cầu bổ sung

- **Ghi nhận biên nhận** → nhập mã biên nhận của cơ quan tiếp nhận → hồ sơ chuyển sang **Đã tiếp nhận/ghi nhận**.
- **Cơ quan yêu cầu bổ sung** → NTH bắt buộc nhập lý do; hồ sơ quay về trạng thái **Đang lập** để chỉnh sửa, bổ sung.

#### 6.6.3 LĐP: Công khai & sinh QR

- LĐP bấm "Công khai & sinh QR" → hồ sơ chuyển sang **Đã công khai · Còn hiệu lực**.
- ManLab tự sinh mã QR tra cứu & xác thực (BR4); chỉ từ thời điểm này phạm vi năng lực mới được dùng trong báo giá, hợp đồng, chứng chỉ, phiếu kết quả (BR5).
- ManLab ghi ngược năng lực vào Danh mục Phương tiện đo, chuyển PTĐ liên quan sang "Đang sử dụng" (BR11).

### 6.7 Trang công khai và kiểm soát áp dụng

- Trang công khai hiển thị: mã hồ sơ, số công bố/thông báo · lần, ngày công khai, cơ quan tiếp nhận, mã QR, và phạm vi năng lực còn hiệu lực (chỉ các dòng Đáp ứng/Điều chỉnh — dòng Không đáp ứng không được công bố).
- NTH/LĐP thực hiện kiểm soát định kỳ: đặc tính kỹ thuật của Đối tượng có thay đổi? có sai lệch so với bản đã công bố?

### 6.8 Duy trì, điều chỉnh, tạm dừng, khôi phục và hủy bỏ

Từ trạng thái **Đã công khai · Còn hiệu lực**, các thao tác sau được thực hiện:

#### 6.8.1 Điều chỉnh

- Bất kỳ vai trò nghiệp vụ nào (NTH/LĐP) có thể khởi tạo **Điều chỉnh** (bắt buộc nhập lý do) → hồ sơ mở khóa, chuyển sang **Đang điều chỉnh**; phiên bản cũ được lưu nguyên trạng vào tab "Phiên bản", không ghi đè (Mục 13.3).
- LĐP thực hiện **Hoàn tất điều chỉnh & khóa phiên bản mới** → tăng số lần ban hành, ký số lại, hồ sơ trở về **Đã công khai · Còn hiệu lực**.

#### 6.8.2 Tạm dừng

- LĐV quyết định **Tạm dừng** (bắt buộc nhập lý do) khi phát hiện sai lệch, thiết bị/chuẩn hết hiệu lực, hoặc không còn đáp ứng điều kiện công bố → hồ sơ và Đối tượng liên quan chuyển sang **Tạm dừng**, bị chặn sử dụng trong nghiệp vụ (BR5).

#### 6.8.3 Khôi phục

- Từ trạng thái **Tạm dừng**, LĐV thực hiện **Khôi phục** sau khi nguyên nhân tạm dừng đã được khắc phục và có bằng chứng phù hợp → hồ sơ trở về **Đã công khai · Còn hiệu lực**. Khôi phục không phải là một trạng thái nghỉ riêng mà là một thao tác chuyển tiếp.

#### 6.8.4 Hủy bỏ và Hết hiệu lực

- LĐV quyết định **Hủy bỏ** (bắt buộc nhập lý do, từ Đã công khai hoặc từ Tạm dừng) hoặc **Đánh dấu hết hiệu lực** (từ Đã công khai) khi ETV dừng cung cấp dịch vụ hoặc không thể khắc phục.
- Đối tượng ở trạng thái Hủy bỏ/Hết hiệu lực không được sử dụng trong hồ sơ mới; muốn cung cấp lại dịch vụ phải lập hồ sơ mới.

#### 6.8.5 Báo cáo hằng năm (QTMT)

- QTMT bắt buộc nộp Báo cáo hoạt động dịch vụ QTMT hằng năm (Mẫu 9.02) trước 30/01 năm kế tiếp (BR6).

### 6.9 Trạng thái hồ sơ P21 trên ManLab

Luồng trạng thái chuẩn (Mục 14.2):

**Chưa lập → Đang lập → Chờ soát xét (LĐP) → Đã soát xét · Chờ LĐV duyệt → Đã phê duyệt nội bộ → Đã gửi cơ quan tiếp nhận → Đã tiếp nhận/ghi nhận → Đã công khai · Còn hiệu lực**

kèm các nhánh phụ: **Chờ soát xét ⇄ Đang lập** (Trả lại bổ sung), **Đã soát xét ⇄ Chờ soát xét** (Trả lại soát xét), **Đã gửi ⇄ Yêu cầu bổ sung ⇄ Đang lập** (cơ quan yêu cầu bổ sung), và từ **Đã công khai**: **Đang điều chỉnh** (⇄ quay lại Đã công khai), **Tạm dừng** (⇄ Khôi phục), **Hủy bỏ**, **Hết hiệu lực**.

| Trạng thái | Ý nghĩa |
| --- | --- |
| Chưa lập | Vừa khởi tạo, chưa nhập dữ liệu |
| Đang lập | NTH đang nhập hồ sơ cha và Danh mục năng lực Đối tượng |
| Chờ soát xét (LĐP) | Đã gửi soát xét, chờ LĐP xử lý |
| Đã soát xét · Chờ LĐV duyệt | LĐP đã duyệt soát xét, chờ LĐV phê duyệt nội bộ |
| Đã phê duyệt nội bộ | LĐV đã ký số; dữ liệu bị khóa (BR1) |
| Đã gửi cơ quan tiếp nhận | LĐP đã gửi hồ sơ tới cơ quan tiếp nhận |
| Yêu cầu bổ sung | Cơ quan tiếp nhận yêu cầu bổ sung; đang chờ NTH xử lý |
| Đã tiếp nhận/ghi nhận | Đã có mã biên nhận từ cơ quan tiếp nhận |
| Đã công khai · Còn hiệu lực | Đã công khai & sinh QR; được phép sử dụng trong nghiệp vụ (BR5) |
| Đang điều chỉnh | Đang mở khóa để sửa; phiên bản cũ đã lưu, không ghi đè |
| Tạm dừng | Bị chặn sử dụng, chờ khắc phục để Khôi phục |
| Hủy bỏ | Chấm dứt hiệu lực, không thể khôi phục |
| Hết hiệu lực | Hết hiệu lực do quyết định của LĐV |

### 6.10 Cấu hình Menu P21 trên ManLab

#### 6.10.1 Cấu trúc màn hình

- **Biên tập hồ sơ:** Hồ sơ cha + Danh mục năng lực Đối tượng (liên kết từ Danh mục Phương tiện đo/mẫu/thông số)
- **Bản công bố/thông báo:** Xem trước Mẫu 01 hoặc Mẫu 9.01, in/xuất PDF
- **Trang công khai:** Xem trước trang tra cứu năng lực kèm mã QR
- **Phiên bản:** Lịch sử các lần điều chỉnh, không ghi đè
- **Nhật ký:** Toàn bộ thao tác chuyển trạng thái, kèm lý do (nếu có)
- **Báo cáo hằng năm** (chỉ QTMT): Mẫu 9.02

#### 6.10.2 Phân quyền và cảnh báo tự động

**Phân quyền theo vai trò ManLab (không tự đổi vai trò, xác định theo tài khoản đăng nhập):**

- **NTH:** Tạo hồ sơ, nhập/sửa dữ liệu khi chưa ký số, liên kết Đối tượng, gửi soát xét, ghi nhận biên nhận; không được soát xét hoặc phê duyệt.
- **LĐP:** Soát xét & đề nghị LĐV duyệt hoặc trả lại bổ sung; gửi cơ quan tiếp nhận; công khai & sinh QR; hoàn tất điều chỉnh.
- **LĐV:** Phê duyệt nội bộ & ký số hoặc trả lại soát xét; quyết định Tạm dừng/Khôi phục/Hủy bỏ/Hết hiệu lực; duyệt xóa hồ sơ đã ký số/công khai (Mục 16).
- **Super Admin:** Chỉ cấu hình hệ thống, phân quyền tài khoản; không phê duyệt nội dung chuyên môn.

**Cảnh báo tự động:**

- Thiết bị, chuẩn đo lường, mẫu chuẩn sắp hết hạn hoặc đã hết hạn → Thông báo NTH + LĐP
- Nhân sự thực hiện theo P03 không còn phù hợp với Bản mô tả công việc → Thông báo LĐP
- Quy trình/phương pháp hết hiệu lực, bị thay thế hoặc chưa xác nhận → Thông báo NTH + LĐP
- Đối tượng bị điều chỉnh đặc tính so với bản đã công bố (phạm vi đo; cấp/độ chính xác; sai số; LOQ/LOD; độ không đảm bảo đo) → Thông báo NTH + LĐP
- Hồ sơ/hạn cơ quan ghi nhận (BR2) sắp quá hạn 03 ngày làm việc → Thông báo LĐP
- Cơ chế tự công bố/thông báo (BR8) sắp hết hiệu lực (28/02/2027) → Thông báo LĐP + LĐV
- Có công việc không phù hợp, khiếu nại hoặc kết quả QA/QC ảnh hưởng đến năng lực đã công bố → Thông báo LĐP + LĐV
- Báo cáo hằng năm QTMT (BR6) sắp đến hạn 30/01 → Thông báo LĐP

### 6.11 Điều khoản kiểm soát cuối

Mọi Đối tượng không có trạng thái **Đã công khai · Còn hiệu lực** trên ManLab thì không được sử dụng để lập hồ sơ dịch vụ, chứng chỉ, biên bản hoặc phiếu kết quả (BR5).

Theo Mục 16, hồ sơ đã công bố/thông báo không nên xóa mà chỉ lưu trữ có kiểm soát; thao tác xóa hồ sơ đã công khai/ký số chỉ dành cho Lãnh đạo Viện và luôn kèm cảnh báo xác nhận.

Trường hợp phát hiện ManLab cho phép sử dụng Đối tượng chưa đủ điều kiện, Đối tượng tạm dừng hoặc Đối tượng hết hiệu lực, sự việc phải được xử lý như công việc không phù hợp và phải đánh giá ảnh hưởng đến các hồ sơ đã phát hành.

Thủ tục này có hiệu lực kể từ ngày được phê duyệt và thay thế các hướng dẫn trước đây trái với nội dung kiểm soát năng lực Đối tượng trên ManLab.

## VII. BIỂU MẪU ÁP DỤNG

Toàn bộ biểu mẫu được lưu trữ tại `06_SHARED_RESOURCES/01_Forms/` với mã F21.xx:

| Mã    | Tên biểu mẫu                                                                      | Mục đích                                | Người dùng       |
| ------ | ------------------------------------------------------------------------------------ | ------------------------------------------ | ------------------- |
| F21.01 | Phiếu đề xuất tạo mới hồ sơ P21/Đối tượng/năng lực dự kiến | Đề xuất thêm năng lực mới           | NTH → LĐP → LĐV |
| F21.02 | Phiếu kiểm tra Gate G1–G6 và trường dữ liệu bắt buộc (Mục 8.2/9.1) | Kiểm tra trước khi liên kết Đối tượng | NTH                |
| F21.03 | Checklist đánh giá hồ sơ, kỹ thuật, đo lường, QTMT                         | Ghi nhận kết quả đánh giá            | NTH, LĐP           |
| F21.04 | Bản Công bố năng lực dịch vụ Đo lường (kiểm định/hiệu chuẩn/thử nghiệm) | Công bố chính thức (Mẫu 01, NQ 66.18) | LĐP → LĐV        |
| F21.05 | Phiếu rà soát năng lực hoạt động dịch vụ QTMT                              | Soát xét định kỳ                      | LĐP                |
| F21.06 | Bản Thông báo năng lực dịch vụ QTMT                                         | Công bố QTMT (Mẫu 9.01, NQ 66.19)       | LĐP → LĐV         |
| F21.07 | Báo cáo hoạt động dịch vụ QTMT hằng năm                                     | Báo cáo hàng năm (Mẫu 9.02, NQ 66.19) | LĐP → LĐV        |
| F21.08 | Phiếu phê duyệt nội bộ công bố/thông báo năng lực                         | Xác nhận LĐP/LĐV                       | LĐP, LĐV          |
| F21.09 | Phiếu điều chỉnh công bố/thông báo năng lực                                | Điều chỉnh, tạm dừng, hủy bỏ        | LĐP, LĐV           |
| F21.10 | Phiếu tạm dừng/khôi phục phạm vi năng lực                                    | Quản lý tạm dừng                       | LĐP → LĐV        |

## VIII. LƯU HỒ SƠ

Hồ sơ P21 được lưu trữ theo ETV.P15 (Quản lý hồ sơ):

- **Hồ sơ gốc (điện tử):** Lưu trên ManLab, thời hạn **Vĩnh viễn** (bản hiện hành) + 5 năm (bản cũ)
- **Bản giấy (nếu có):** Bản công bố/thông báo có chữ ký + con dấu gốc, lưu theo quy định của cơ quan công nhận
- **Thành phần hồ sơ bắt buộc:**
  - Phiếu đề xuất (F21.01)
  - Phiếu kiểm tra Gate G1–G6 (F21.02)
  - Kết quả đánh giá (F21.03, F21.05, F21.07)
  - Bản công bố/thông báo ký số (F21.04, F21.06)
  - Phiếu phê duyệt (F21.08)
  - Phiếu điều chỉnh/tạm dừng/hủy bỏ (nếu có — F21.09, F21.10)
  - Danh mục Đối tượng phê duyệt (bản in từ ManLab)

---

**Nộp lưu theo:** ETV.P15, tiêu chuẩn lưu giữ theo `ETV.P.F 14.06`
