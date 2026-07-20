---
id: ETV.P15
title: "Thủ tục Kiểm soát hồ sơ, dữ liệu đo lường và chứng chỉ"
type: Thu-tuc
owner: "(cập nhật — chức danh LĐP phụ trách Hệ thống quản lý)"
department: "Toàn Viện"
process: MP15_HoSo
capability: CAP-14_TaiLieuHoSo
module: M15_HoSo
effective_date: "01/07/2026"
revision: "01"
status: Da-phe-duyet
keywords: [kiểm soát hồ sơ, dữ liệu đo lường, chứng chỉ, lưu trữ hồ sơ, HTQL]
related_documents: [ETV.P14, ETV.P.F 14.06, ETV.QM]
iso_clause: ["ISO/IEC 17025:2017 §8.2", "ISO 9001:2015 §7.5", "ISO 17034:2016 §8.2", "ISO/IEC 27001:2022 A.5.9–A.5.18, A.8.13", "ISO/IEC 42001:2023 §7.5"]
legal_basis: ["Luật Giao dịch điện tử 20/2023/QH15", "Nghị định 30/2020/NĐ-CP"]
ai_tags: [record-management, data-retention, compliance]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo mục đích sử dụng, tối thiểu theo ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: null
superseded_by: null
---
# THỦ TỤC KIỂM SOÁT HỒ SƠ, DỮ LIỆU ĐO LƯỜNG VÀ CHỨNG CHỈ

|                           |                      |
| ------------------------- | -------------------- |
| **Mã số**         | ETV.P 15             |
| **Lần ban hành**  | 01                   |
| **Ngày ban hành** | 01/07/2026           |
| **Biên soạn**     | Dương Thành Nam   |
| **Soát xét**      | Trần Thị Hoa       |
| **Phê duyệt**     | Nguyễn Hoàng Giang |

> **Tình trạng bản này: ĐÃ PHÊ DUYỆT** — thủ tục chung áp dụng cho tất cả 5 chuẩn ISO (9001, 17025, 17034, 27001, 42001) để tránh phải sửa mỗi khi bổ sung tiêu chuẩn mới. Triển khai lần đầu tiên 01/07/2026 với nhấn mạo ISO/IEC 17025:2017 §8.2.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi                                    | Lần ban hành |
| ---------- | ------------------------------------------------------- | -------------- |
| 01/07/2026 | Ban hành lần thứ nhất theo ISO/IEC 17025:2017 §8.2 | 01             |

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

---

## I. MỤC ĐÍCH

Thủ tục này quy định nội dung, trách nhiệm và trình tự kiểm soát, lưu trữ và bảo quản hồ sơ, dữ liệu đo lường, dữ liệu kỹ thuật thô và các chứng chỉ của ETV nhằm đáp ứng các yêu cầu về kiểm soát hồ sơ và dữ liệu trong chuẩn ISO:

- **ISO/IEC 17025:2017 §8.2** — Kiểm soát hồ sơ
- **ISO 9001:2015 §7.5** — Kiểm soát thông tin được lưu trữ
- **ISO 17034:2016 §8.2** — Quản lý dữ liệu hồ sơ sản xuất chất chuẩn
- **ISO/IEC 27001:2022 A.5.9–A.5.18, A.8.13** — Bảo vệ dữ liệu & quản lý truy cập
- **ISO/IEC 42001:2023 §7.5** — Kiểm soát dữ liệu trong hệ thống AI

Bảo đảm toàn vẹn dữ liệu, tính chính xác, bảo mật, khả năng truy cập và lưu trữ lâu dài. Áp dụng thống nhất trong toàn Viện Kiểm định Công nghệ và Môi trường (ETV), thực hiện qua phần mềm ManLab.

## II. PHẠM VI ÁP DỤNG

Áp dụng cho toàn bộ vòng đời hồ sơ:

**Lập tạo → Lưu trữ → Bảo vệ → Truy xuất → Bảo quản → Hủy bỏ**

đối với:

| Nhóm                     | Loại hồ sơ                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------ |
| Hồ sơ kỹ thuật        | Hồ sơ kiểm định, hiệu chuẩn, thử nghiệm (kết quả, báo cáo, chứng chỉ) |
| Dữ liệu đo lường     | Dữ liệu thô từ thiết bị, kết quả tính toán, độ không đảm bảo         |
| Chứng chỉ & giấy phép | Giấy chứng nhận năng lực, chứng chỉ hiệu chuẩn, giấy phép hoạt động    |
| Hồ sơ quản lý         | Hồ sơ khách hàng, hợp đồng, quản lý năng lực, đánh giá                 |
| Hồ sơ nhân sự         | Sơ yếu lý lịch, hợp đồng lao động, chứng chỉ đào tạo (theo ETV.P03)    |

**Không áp dụng cho:** Dữ liệu cá nhân được xử lý theo Luật Bảo vệ dữ liệu cá nhân (ngoài phạm vi HTQL); tài liệu chứng chỉ đào tạo của cá nhân (thuộc ETV.P03).

## III. PHÂN QUYỀN VAI TRÒ VÀ TRÁCH NHIỆM (RACI)

| Bước trong vòng đời           | NTH         | LĐP          | LĐV | QLCL          |
| ---------------------------------- | ----------- | ------------- | ---- | ------------- |
| Lập tạo hồ sơ                  | **R** | I             | I    | I             |
| Xác nhận & ký duyệt kỹ thuật | C           | **R/A** | I    | I             |
| Lưu trữ bản gốc/điện tử     | I           | I             | I    | **R/A** |
| Bảo vệ & kiểm soát truy cập   | I           | I             | I    | **R/A** |
| Truy xuất theo yêu cầu          | **R** | C             | I    | **R/A** |
| Soát xét định kỳ              | **R** | A             | I    | I             |
| Hủy bỏ/lưu trữ lâu dài       | I           | **R/A** | I    | **R/A** |

> LĐV luôn là **A** cuối cùng đối với hồ sơ liên quan đến năng lực kiểm định, hiệu chuẩn, thử nghiệm.

## IV. TÀI LIỆU TRÍCH DẪN

### Chuẩn ISO áp dụng:

- **ISO/IEC 17025:2017 §8.2** — Kiểm soát hồ sơ
- **ISO 9001:2015 §7.5** — Kiểm soát thông tin được lưu trữ
- **ISO 17034:2016 §8.2** — Quản lý hồ sơ sản xuất chất chuẩn
- **ISO/IEC 27001:2022 A.5.9–A.5.18, A.8.13** — Bảo vệ dữ liệu, kiểm soát truy cập
- **ISO/IEC 42001:2023 §7.5** — Kiểm soát dữ liệu trong hệ thống AI
- `11_COMPLIANCE/01_ISO_Mapping/MP-ISO-mapping.md` — Bảng ánh xạ đầy đủ

### Cơ sở pháp lý:

- Luật Giao dịch điện tử 20/2023/QH15 — Dữ liệu điện tử, bảo vệ & xác thực
- Nghị định 30/2020/NĐ-CP — Công tác văn thư, lưu trữ

### Tài liệu liên quan nội bộ:

- ETV.P14 — Kiểm soát tài liệu (phần liên quan đến tài liệu nguồn)
- ETV.QM — Sổ tay chất lượng (yêu cầu chung về HTQL)
- ETV.P.F 14.06 — Danh mục phân quyền & thời hạn lưu giữ
- ETV.P03 — Kiểm soát hợp đồng lao động (hồ sơ nhân sự)

## V. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

| Viết tắt | Ý nghĩa                                                     |
| ---------- | ------------------------------------------------------------- |
| ETV        | Viện Kiểm định Công nghệ và Môi trường              |
| NTH        | Người thực hiện (mọi nhân sự)                          |
| LĐP       | Lãnh đạo Phòng/bộ phận                                  |
| LĐV       | Lãnh đạo Viện                                             |
| QLCL       | Quản lý chất lượng                                       |
| RACI       | Responsible – Accountable – Consulted – Informed           |
| ManLab     | Phần mềm quản lý thư viện, hồ sơ, năng lực của ETV |

**Định nghĩa chung:**

- **Hồ sơ:** Tập hợp dữ liệu, tài liệu, bằng chứng liên quan đến một hoạt động, sản phẩm hoặc dịch vụ.
- **Dữ liệu đo lường:** Giá trị số, kết quả tính toán, độ không đảm bảo, QA/QC, thử nghiệm thành thạo, so sánh liên phòng phát sinh từ hoạt động đo lường (kiểm định/ hiệu chuẩn/ thử nghiệm), sản xuất mẫu chuẩn, quan trắc môi trường, độ chính xác tương đối (RA), đánh giá chất lượng hệ thống trạm quan trắc.
- **Chứng chỉ:** Giấy xác nhận chính thức năng lực hoặc hoàn thành tiêu chuẩn.
- **Bảo vệ dữ liệu:** Biện pháp ngăn chặn thất thoát, sai lệch, truy cập trái phép.

## VI. NỘI DUNG

### 6.1 Phân loại hồ sơ

- **Hồ sơ nội bộ:** Lập tạo bởi ETV, quản lý trọn vẹn vòng đời
  - Kỹ thuật: Biên bản kiểm định, hiệu chuẩn, thử nghiệm, dữ liệu thô, kết quả quan trắc, phân tích
  - Quản lý: Hồ sơ khách hàng, hợp đồng, năng lực, đánh giá
  - Nhân sự: Sơ yếu lý lịch, bản mô tả công việc, hợp đồng lao động (theo ETV.P03)
- **Hồ sơ bên ngoài:** Tiếp nhận từ cơ quan, khách hàng, đối tác
  - Giấy phép, chứng chỉ đào tạo, chứng chỉ ISO

### 6.2 Yêu cầu dữ liệu bắt buộc

Hồ sơ kỹ thuật phải chứa đầy đủ:

- Mã nhận dạng duy nhất (từ ManLab)
- Ngày lập tạo, người lập tạo
- Tham số đo, kết quả, độ không đảm bảo
- Điều kiện môi trường (nếu liên quan)
- Ký duyệt kỹ thuật (LĐP hoặc chuyên gia được phân công)
- Kế tiếp & biên tập lịch sử nếu có

### 6.3 Lưu trữ hồ sơ

**Hình thức:**

- Bản giấy: Theo thể thức quy định, được ký duyệt, đóng dấu (nếu là hồ sơ gốc)
- Bản điện tử: Trên ManLab (bản này là nguồn sự thật), sao lưu trên NAS/cloud

**Vị trí lưu giữ:**

- Hồ sơ kỹ thuật: Phòng Kiểm định/Hiệu chuẩn/Thử nghiệm/QTMT (bản giấy), ManLab (điện tử)
- Hồ sơ quản lý: Phòng QLCL (bản giấy), ManLab (điện tử)
- Hồ sơ nhân sự: Phòng Hành chính (bản giấy), theo ETV.P03

**Thời hạn lưu:**

- Kiểm định/Hiệu chuẩn/Thử nghiệm: 10 năm từ ngày cấp chứng chỉ (theo chuẩn hoặc pháp lý)
- Quan trắc môi trường (QTMT): 05 năm từ ngày cấp chứng chỉ/phiếu trả kết quả
- Hồ sơ khách hàng: Tối thiểu 5 năm kể từ ngày kết thúc dịch vụ
- Hồ sơ nhân sự: Theo ETV.P03 & quy định pháp lý (tối thiểu 3 năm sau khi kết thúc)
- Hồ sơ quản lý/năng lực: Vĩnh viễn (bản hiện hành) + 5 năm (bản cũ)

Danh mục đầy đủ thời hạn lưu: xem `ETV.P.F 14.06`.

### 6.4 Bảo vệ & kiểm soát truy cập

**Bảo vệ vật lý:**

- Hồ sơ giấy: Tủ khóa hoặc phòng riêng với quyền truy cập hạn chế
- Sao lưu điện tử: Mã hóa, backup định kỳ trên NAS/cloud

**Kiểm soát truy cập:**

- Phân quyền theo chức vụ (Super Admin, LĐV, LĐP, NTH, Khách hàng, Viewer)
- Ghi nhận mọi truy cập hồ sơ nhạy cảm (audit log trên ManLab)
- Hạn chế hồ sơ nhạy cảm (chứa dữ liệu cá nhân, bí mật thương mại): chỉ LĐP, LĐV, QLCL

**Bảo vệ dữ liệu:**

- Kiểm soát phiên bản: ManLab tự động lưu mọi thay đổi
- Toàn vẹn dữ liệu: Kiểm tra checksum định kỳ (6 tháng/lần)
- Dự phòng: Sao lưu hàng tuần trên NAS, hàng tháng trên cloud

### 6.5 Truy xuất & cấp hồ sơ

**Yêu cầu truy xuất:**

- Khách hàng: Hồ sơ của dịch vụ của họ (báo cáo chính thức, chứng chỉ)
- Cơ quan công nhận/chỉ định: Hồ sơ năng lực, dữ liệu hỗ trợ khi yêu cầu
- Cơ quan thanh tra: Hồ sơ liên quan theo yêu cầu pháp lý

**Quy trình:**

- Lập phiếu yêu cầu (từ ManLab hoặc email)
- LĐP/QLCL xác minh quyền truy cập
- Cung cấp bản copy (giấy hoặc PDF), ghi nhận ngày cấp & người nhận
- Hồ sơ bên ngoài (cơ quan công nhận): Có thể yêu cầu cam kết bảo mật

### 6.6 Soát xét định kỳ & bảo quản

**Soát xét định kỳ:**

- Hàng năm: Kiểm tra toàn bộ hồ sơ đang giữ (tồn tại, đầy đủ, không hư hỏng)
- Nếu phát hiện hư hỏng (ẩm, mối mọt, phai mờ, file bị lỗi): Tạo bản photo/quét lại, cập nhật trên ManLab

**Bảo quản:**

- Hồ sơ giấy: Bảo quản trong môi trường khô ráo (18-25°C, độ ẩm 40-60%), tránh ánh sáng trực tiếp
- Hồ sơ điện tử: Kiểm tra backup qua 6 tháng, migrasi dữ liệu khi định dạng file bị lỗi thời

### 6.7 Hủy bỏ & lưu trữ lâu dài

**Hủy bỏ:**

- Khi hết thời hạn lưu: Lập phiếu hủy, LĐP xác nhận
- Hồ sơ giấy: Xé nhỏ, đốt (hoặc dùng dịch vụ hủy chứng chỉ)
- Hồ sơ điện tử: Xóa vĩnh viễn khỏi ManLab & sao lưu; ghi nhận trong nhật ký hủy

**Lưu trữ lâu dài (bản gốc):**

- Hồ sơ kiểm định/hiệu chuẩn: Lưu giữ vĩnh viễn (copy trên NAS + cloud)
- Hồ sơ năng lực: Lưu giữ vĩnh viễn (bản hiện hành), 5 năm (bản cũ)

### 6.8 Quản lý hồ sơ trên ManLab

- Tạo hồ sơ: NTH khởi tạo, nhập dữ liệu bắt buộc
- Xác nhận: LĐP soát xét & ký duyệt (`status: Đã duyệt`)
- Công khai: LĐV phê duyệt cuối cùng (`status: Công khai`) hoặc giữ nội bộ (`status: Nội bộ`)
- Truy cập: Theo phân quyền; ghi audit log
- Lưu: Tự động backup, sao lưu định kỳ

### 6.9 Xử lý hồ sơ bị hư hỏng hoặc thất thoát

- **Phát hiện thất thoát/hư hỏng:** LĐP lập báo cáo ngay (nguyên nhân, phạm vi ảnh hưởng)
- **Đánh giá tác động:**
  - Nếu là hồ sơ kỹ thuật đã cấp chứng chỉ: Đánh giá nếu khách hàng bị ảnh hưởng
  - Nếu là dữ liệu hỗ trợ: Kiểm tra xem có thể tái lập từ máy đo/tài liệu gốc không
- **Khắc phục:**
  - Khôi phục từ backup nếu có
  - Nếu không khôi phục được: Thông báo khách hàng & cơ quan công nhận (nếu liên quan đến năng lực)
- **Ghi nhận:** Cập nhật ManLab, lập biên bản xử lý sự cố

### 6.10 Huấn luyện & nhận thức

- Tất cả NTH phải được huấn luyện về quy trình xử lý hồ sơ (tối thiểu hàng năm)
- LĐP chịu trách nhiệm giám sát & cập nhật hướng dẫn khi có thay đổi

## VII. BIỂU MẪU ÁP DỤNG

| Mã               | Tên                                             |
| ----------------- | ------------------------------------------------ |
| `ETV.P.F 15.01` | Phiếu yêu cầu truy xuất hồ sơ              |
| `ETV.P.F 15.02` | Phiếu hủy/lưu trữ hồ sơ                    |
| `ETV.P.F 15.03` | Báo cáo soát xét hồ sơ định kỳ          |
| `ETV.P.F 15.04` | Báo cáo sự cố thất thoát/hư hỏng hồ sơ |

Bản trắng: `06_SHARED_RESOURCES/01_Forms/`

## VIII. LƯU HỒ SƠ

Hồ sơ phát sinh từ thủ tục này (yêu cầu truy xuất, báo cáo soát xét, v.v.) được lưu trữ theo **ETV.P15** (thủ tục này) và **ETV.P.F 14.06** (danh mục thời hạn lưu). Bản gốc: bản giấy (ký duyệt) + bản điện tử (ManLab).

---

*Thủ tục Kiểm soát hồ sơ, dữ liệu đo lường và chứng chỉ — ETV.P 15 — Lần BH: 01 — Trang tài liệu điện tử, không áp dụng đánh số trang thủ công (bản in xuất từ ManLab tự sinh header/footer).*
