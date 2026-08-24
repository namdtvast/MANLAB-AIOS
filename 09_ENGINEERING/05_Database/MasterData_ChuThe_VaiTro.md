# Chuẩn dữ liệu chủ — Chủ thể và Vai trò (Party–Role)

| Thuộc tính | Giá trị |
|---|---|
| Mã tài liệu | `AIOS-MD-01` |
| Loại | Chuẩn kiến trúc dữ liệu (bắt buộc với mọi module) |
| Trạng thái | Baseline — lần 01, 24/08/2026 |
| Thủ tục sở hữu | [MP34_DuLieuSo](../../04_PROCESS_LIBRARY/MP34_DuLieuSo) — Quản lý dữ liệu số |
| Phạm vi | Toàn bộ module M01–M38 chạy trên `09_ENGINEERING/aios-platform` |
| Tài liệu liên quan | [01_ENTERPRISE/09_Architecture.md §9.2.1](../../01_ENTERPRISE/09_Architecture.md) · [06_SHARED_RESOURCES/04_Master_Data](../../06_SHARED_RESOURCES/04_Master_Data) |

---

## 0. Thuật ngữ và va chạm tên gọi

Trong ManLab-AIOS, **`CRM` luôn có nghĩa là Certified Reference Material (mẫu chuẩn được chứng nhận)** —
xem `CAP-12_CRM`, `MP19_SanXuatCRM`, `MP23_CongBoCRM`. Tuyệt đối **không** dùng chữ `CRM` theo nghĩa
Customer Relationship Management ở bất kỳ tầng nào.

| Khái niệm | Từ dùng thống nhất | Viết tắt |
|---|---|---|
| Quản lý quan hệ khách hàng | **Quản lý quan hệ khách hàng** | `QLKH` |
| Thực thể pháp lý hoặc cá nhân mà Viện có quan hệ | **Chủ thể** (tiếng Anh: *Party*) | — |
| Tư cách của một chủ thể trong một ngữ cảnh nghiệp vụ | **Vai trò** (*Party Role*) | — |
| Mẫu chuẩn được chứng nhận | **Mẫu chuẩn (CRM)** | `CRM` |

**Chủ thể** bao gồm: khách hàng, khách hàng tiềm năng, nhà cung cấp, bên ngoài cung cấp/thầu phụ,
cơ sở được đánh giá, đối tác, chuyên gia/đánh giá viên, nhân sự, cơ quan quản lý, tổ chức khoa học
công nghệ và các bên quan tâm khác.

---

## 1. Vấn đề cần giải quyết

Tại thời điểm ban hành, danh tính chủ thể đang bị nhân bản dưới nhiều dạng không nối được với nhau
trong `prisma/schema.prisma` của nền tảng:

| Nơi lưu | Cách lưu hiện nay | Hệ quả |
|---|---|---|
| `M21Record` | `toChuc`, `diaChi`, `daiDien`, `dienThoai`, `email` — text tự do | Cùng một tổ chức nhập lại mỗi lần công bố, không đối chiếu được |
| `M25InterestedParty` | `name` — text tự do + `impartialityFlag` | Bên quan tâm không nối được với khách hàng/NCC cùng pháp nhân |
| `M12Complaint` | không có trường bên khiếu nại | Không thống kê được khiếu nại theo khách hàng |
| `M03Employee` | thực thể người riêng | Nhân sự và người liên hệ là hai thế giới tách rời |

Việc này vi phạm nguyên tắc **một nguồn sự thật** của repo. Còn khoảng 25 module chưa số hóa; nếu
mỗi module tiếp tục tự tạo master riêng (`M07Customer`, `M06Supplier`, `M09Site`…), chi phí hợp nhất
về sau tăng theo cấp số.

---

## 2. Nguyên tắc bắt buộc

### 2.1. Bắt buộc áp dụng ngay (mọi module mới)

| Mã | Nguyên tắc |
|---|---|
| **BR-01** | Một chủ thể chỉ có **một** bản ghi `party`, dù giữ bao nhiêu vai trò. |
| **BR-02** | `party` (chủ thể là ai) và `party_role` (chủ thể đóng vai gì) là hai khái niệm tách biệt, không gộp. |
| **BR-03** | Mọi `party_role` phải có `valid_from` / `valid_to`; hết vai trò là đóng hiệu lực, không xóa. |
| **BR-04** | Giao dịch nghiệp vụ xác định bên tham gia qua `party_role_id`, **không** qua `party_id` trần. |
| **BR-05** | Giao dịch có giá trị pháp lý (hợp đồng, báo giá đã gửi, chứng chỉ, công bố, biên bản) phải lưu `party_snapshot` bất biến tại thời điểm phát sinh. |
| **BR-06** | Không hard-delete `party`, `party_role`, `party_relationship` khi đã phát sinh giao dịch — chỉ đổi trạng thái. |
| **BR-07** | Module **không được tự tạo master khách hàng / NCC / cơ sở / đối tác / chuyên gia**; phải tham chiếu `party_role`. |
| **BR-08** | Dữ liệu của thể nhân (`party_type = PERSON`) mặc định là **dữ liệu cá nhân** theo Nghị định 13/2023/NĐ-CP. |
| **BR-09** | Gộp chủ thể (merge) phải được người có thẩm quyền phê duyệt và ghi `party_merge_log`; AI không được tự gộp. |
| **BR-10** | AI được phép phát hiện, tóm tắt, gợi ý; **không** được tự kết luận tính khách quan, tự phê duyệt NCC, tự quyết khiếu nại hay tự gộp/ẩn danh dữ liệu cá nhân (đồng bộ MP29). |

### 2.2. Định hướng — chưa bắt buộc

| Mã | Nội dung | Điều kiện kích hoạt |
|---|---|---|
| BR-11 | Global Party Registry dùng chung nhiều tenant, chống rò rỉ chéo tenant | Khi AIOS thực sự phục vụ tenant thứ hai |
| BR-12 | Row-Level Security ở tầng CSDL + Policy Engine ABAC | Cùng điều kiện BR-11 |
| BR-13 | COI Engine duyệt đồ thị quan hệ nhiều bậc | Khi ETV mở rộng sang ISO/IEC 17020 hoặc ISO/IEC 17065 |

---

## 3. Quyết định về đa tenant (24/08/2026)

ETV hiện là tenant duy nhất. Nền tảng hiện **không có cột `tenant_id` nào** trong toàn bộ schema.

**Quyết định:**

1. Các bảng chủ thể **mới** mang cột `tenant_id` ngay từ đầu (mặc định một giá trị `ETV`), vì thêm
   cột này về sau đắt hơn nhiều lần.
2. **Không hồi tố** `tenant_id` cho các module đã chạy (M01, M02, M03, M04, M10, M12, M13, M14,
   M16, M17, M21, M25, M26).
3. **Hoãn** Global Party Registry, Row-Level Security, cơ chế chống rò rỉ chéo tenant và API
   `duplicate-check` liên tenant. Ba hạng mục này chỉ mở khi có tenant thứ hai thật.

Hệ quả: `party.tenant_id` hiện chỉ là khóa dự phòng, không được dùng làm cơ chế bảo mật duy nhất.

---

## 4. Mô hình dữ liệu

### 4.1. Quy ước đặt tên

Đây là **nhóm bảng dùng chung đầu tiên không mang tiền tố `Mxx`**. Mọi bảng chủ thể dùng tiền tố
`party_` (Prisma model: `Party`, `PartyRole`, …). Bảng thuộc riêng một module vẫn giữ tiền tố `Mxx`
như hiện nay.

### 4.2. `party` — định danh gốc

```text
id              PK
tenant_id       mặc định "ETV"
party_type      ORGANIZATION | PERSON
legal_name      tên pháp lý đầy đủ
normalized_name tên đã chuẩn hóa (bỏ dấu, hạ chữ thường, bỏ hậu tố loại hình) — dùng để khử trùng
short_name
country_code    mặc định "VN"
legal_status    ACTIVE | INACTIVE | SUSPENDED | TERMINATED | ARCHIVED
created_at / updated_at / created_by
```

### 4.3. `party_identifier` — định danh chính thức

```text
id, party_id, identifier_type, value, value_normalized,
issued_by, valid_from, valid_to, verification_status
```

`identifier_type`: `TAX_CODE`, `BUSINESS_REGISTRATION`, `DECISION_NO`, `NATIONAL_ID`, `PASSPORT`,
`ORCID`, `INTERNAL_CODE`.

> `NATIONAL_ID` (CCCD) và `PASSPORT` chịu chính sách dữ liệu cá nhân nghiêm ngặt hơn mã số thuế
> doanh nghiệp — xem mục 8.

### 4.4. `party_role` — vai trò

```text
id, party_id, tenant_id, role_type,
status          DRAFT | ACTIVE | SUSPENDED | TERMINATED
valid_from, valid_to,
approval_state, approved_by, approved_at,
owner_unit, owner_user_id,
created_at, updated_at
```

`role_type` là **master data cấu hình được** (bảng `party_role_type`), không hard-code thành enum
cố định trong mã nguồn. Bộ giá trị khởi tạo:

```text
KHACH_HANG_TIEM_NANG   (LEAD)
KHACH_HANG             (CUSTOMER)
NHA_CUNG_CAP           (SUPPLIER)
BEN_NGOAI_CUNG_CAP     (EXTERNAL_PROVIDER — ISO/IEC 17025 §6.6)
CO_SO_DUOC_DANH_GIA    (AUDITEE)
CO_SO_SAN_XUAT
DOI_TAC                (PARTNER)
CO_QUAN_QUAN_LY        (REGULATOR)
CHUYEN_GIA             (EXPERT / ASSESSOR)
NHAN_SU                (EMPLOYEE — nối M03)
BEN_QUAN_TAM           (INTERESTED_PARTY — nối M25)
```

### 4.5. `party_relationship` — quan hệ

```text
id, parent_party_id, child_party_id, relationship_type,
valid_from, valid_to, ownership_percent, control_level,
source_document_ref, status
```

`relationship_type`: `CONG_TY_ME`, `CONG_TY_CON`, `CHI_NHANH`, `DON_VI_PHU_THUOC`, `SO_HUU`,
`KIEM_SOAT`, `DAI_DIEN_CHO`, `THANH_VIEN_CUA`, `TU_VAN_CHO`, `BEN_LIEN_QUAN`.

### 4.6. `party_site` — địa điểm

```text
id, party_id, site_type, site_name, address,
province_code, ward_code, latitude, longitude,
status, valid_from, valid_to
```

`site_type`: `TRU_SO`, `CHI_NHANH`, `NHA_MAY`, `PHONG_THI_NGHIEM`, `KHO`, `TRAM_QUAN_TRAC`,
`DIEM_LAY_MAU`, `DIA_DIEM_DICH_VU`, `KHAC`.

**Khi nào tạo Party riêng, khi nào chỉ là Site** — tạo `party` riêng nếu chi nhánh/đơn vị đó:
có mã số thuế hoặc mã đơn vị riêng · có thể đứng tên báo giá/hợp đồng · xuất hoặc nhận hóa đơn ·
là đối tượng kiểm định/đánh giá/chứng nhận độc lập · cần lịch sử nghiệp vụ riêng. Nếu chỉ là nhà
máy, kho, trạm, điểm lấy mẫu, nơi đặt thiết bị thì dùng `party_site`.

### 4.7. `party_contact` — người liên hệ

Người liên hệ **là một `party` loại `PERSON`**, không phải chuỗi text nhét trong hồ sơ khách hàng.

```text
id, person_party_id, organization_party_id, tenant_id,
position, department, contact_role,
email, phone,
valid_from, valid_to, is_primary,
privacy_classification, purpose_code, retention_until
```

### 4.8. `party_snapshot` — bản chụp bất biến

```text
id, party_role_id, transaction_type, transaction_ref,
legal_name, tax_code, address, representative, role_type,
captured_at, captured_by, payload_json
```

Hợp đồng ký năm 2025 phải hiển thị đúng tên pháp nhân, mã số thuế, địa chỉ, người đại diện **của
năm 2025**, kể cả khi chủ thể đổi thông tin năm 2027.

### 4.9. `party_merge_log`

```text
id, source_party_id, target_party_id, reason,
requested_by, approved_by, merged_at, snapshot_before_json
```

Mọi tham chiếu cũ tới `source_party_id` phải truy vết được — không viết đè lịch sử.

---

## 5. Mô hình thời gian

Mọi vai trò và quan hệ phải trả lời được câu hỏi: *"Ngày 15/3/2026, Công ty A đang giữ những vai trò
nào?"*

```text
2025: KHACH_HANG
2026: KHACH_HANG + NHA_CUNG_CAP
2027: NHA_CUNG_CAP chấm dứt
```

Truy vấn theo `valid_from <= :date AND (valid_to IS NULL OR valid_to >= :date)`. Không ghi đè bản
ghi cũ khi vai trò thay đổi — đóng bản cũ, mở bản mới.

---

## 6. Khử trùng và gộp chủ thể

Thứ tự ưu tiên khi đối sánh: (1) định danh chính thức → (2) quốc gia → (3) tên pháp lý chuẩn hóa →
(4) địa chỉ → (5) điện thoại/email → (6) quan hệ → (7) đối sánh mờ.

```text
Nhập liệu → Chuẩn hóa → Tra định danh → Khớp chính xác
        → Đối sánh mờ tên/địa chỉ → Nghi trùng → NGƯỜI xem xét
        → TẠO MỚI / LIÊN KẾT / GỘP
```

**Không bao giờ gộp tự động chỉ vì tên giống nhau.** Gộp là hành vi cần phê duyệt (BR-09).

---

## 7. Ánh xạ vào thư viện quy trình

Chuẩn này không thay thế thủ tục nào; nó là nền dữ liệu để các thủ tục dưới đây dùng chung một
danh tính chủ thể.

| Nghiệp vụ | Thủ tục sở hữu | Vai trò sử dụng |
|---|---|---|
| Xem xét yêu cầu, báo giá, hợp đồng, QLKH | [MP07_HopDong](../../04_PROCESS_LIBRARY/MP07_HopDong) — ISO/IEC 17025 §7.1 | `KHACH_HANG_TIEM_NANG`, `KHACH_HANG` |
| Mua sắm, đánh giá và phê duyệt bên ngoài cung cấp | [MP06_MuaSam](../../04_PROCESS_LIBRARY/MP06_MuaSam) — §6.6 | `NHA_CUNG_CAP`, `BEN_NGOAI_CUNG_CAP` |
| Nhân sự, chuyên gia, đánh giá viên | [MP03_NhanSu](../../04_PROCESS_LIBRARY/MP03_NhanSu) | `NHAN_SU`, `CHUYEN_GIA` |
| Khiếu nại, phàn nàn, góp ý | [MP12_KhieuNai](../../04_PROCESS_LIBRARY/MP12_KhieuNai) — §7.9 | bên khiếu nại là `party_role` |
| Bảo mật thông tin và quyền sở hữu khách hàng | [MP02_BaoMat](../../04_PROCESS_LIBRARY/MP02_BaoMat) — §4.2 | nghĩa vụ bảo mật gắn `party_role` |
| Bối cảnh và bên quan tâm, tính khách quan | [MP25_BoiCanh](../../04_PROCESS_LIBRARY/MP25_BoiCanh) — §4.1 | `BEN_QUAN_TAM` |
| Dữ liệu chủ, vòng đời, audit trail | **[MP34_DuLieuSo](../../04_PROCESS_LIBRARY/MP34_DuLieuSo)** | chủ sở hữu chuẩn này |
| Phân loại, bảo vệ dữ liệu cá nhân | [MP28_ATTT](../../04_PROCESS_LIBRARY/MP28_ATTT), [MP27_TaiSanTT](../../04_PROCESS_LIBRARY/MP27_TaiSanTT) | — |
| Nền tảng số, phân quyền | [MP35_NenTangSo](../../04_PROCESS_LIBRARY/MP35_NenTangSo), [MP33_HeThongTT](../../04_PROCESS_LIBRARY/MP33_HeThongTT) | — |
| Hợp đồng dữ liệu, API, sự kiện | [MP37_TichHopDuLieu](../../04_PROCESS_LIBRARY/MP37_TichHopDuLieu) | — |
| Ràng buộc AI | [MP29_AI](../../04_PROCESS_LIBRARY/MP29_AI) | BR-10 |

---

## 8. Dữ liệu cá nhân và phân loại

Căn cứ: **Nghị định 13/2023/NĐ-CP** về bảo vệ dữ liệu cá nhân (hiệu lực 01/7/2023).

`party` loại `PERSON`, `party_contact`, số điện thoại, email, CCCD, chữ ký, tài khoản đều là vùng
dữ liệu cá nhân.

| Mức | Nội dung điển hình |
|---|---|
| `PUBLIC` | Tên tổ chức đã công khai, số công bố |
| `INTERNAL` | Mã nội bộ, phân loại khách hàng |
| `CONFIDENTIAL` | Hợp đồng, giá, kết quả đo của khách hàng |
| `PERSONAL` | Email, điện thoại, CCCD, chữ ký |
| `RESTRICTED` | Hồ sơ khiếu nại, xung đột lợi ích, điều tra |

Bản ghi đồng ý (`party_consent`) phải theo **từng mục đích**, không phải một cờ `true/false` chung:

```text
id, person_party_id, purpose_code, data_categories,
consent_status, consented_at, withdrawn_at,
evidence_document_ref, retention_until
```

> Trước khi triển khai, đối chiếu lại văn bản hiện hành về bảo vệ dữ liệu cá nhân trong
> [08_KNOWLEDGE_GRAPH/01_Regulations](../../08_KNOWLEDGE_GRAPH/01_Regulations).

---

## 9. Tính khách quan và xung đột lợi ích

ISO/IEC 17025 §4.1 hiện thuộc [MP25_BoiCanh](../../04_PROCESS_LIBRARY/MP25_BoiCanh); M25 đã có cờ
`impartialityFlag` ở mức **nhắc, không chặn**. Chuẩn này giữ nguyên mức đó và chỉ bổ sung nền dữ
liệu để sau này phát hiện được quan hệ gián tiếp:

```text
Chuyên gia X --NHAN_SU_CUA--> Công ty Y --CONG_TY_CON--> Công ty Z
```
Nếu X đánh giá Z ⇒ ứng viên xung đột lợi ích, cần người xem xét.

**Chưa triển khai trong đợt này:** engine luật COI đầy đủ, chấm điểm rủi ro tự động, hồ sơ
`impartiality_risk`. Lý do: [01_Strategy.md](../../01_ENTERPRISE/01_Strategy.md) xác định
ISO/IEC 17025 là nền tảng, ISO/IEC 17020 và ISO/IEC 17043 mới ở mức "chuẩn bị có chọn lọc", còn
ISO/IEC 17065 chưa thuộc phạm vi. Khi mở rộng phạm vi công nhận thì kích hoạt BR-13.

---

## 10. Lộ trình áp dụng

| Giai đoạn | Nội dung | Trạng thái |
|---|---|---|
| 1 | Ban hành chuẩn này; chốt thuật ngữ QLKH/Chủ thể | Đang thực hiện |
| 2 | Bổ sung nhóm bảng `party_*` vào `aios-platform`; màn hình Chủ thể 360° tối giản (định danh, vai trò, địa điểm, người liên hệ) | Chưa bắt đầu |
| 3 | Module mới (MP06, MP07, MP09, MP11…) tham chiếu `party_role` ngay từ đặc tả | Chưa bắt đầu |
| 4 | Nối các điểm cũ theo thứ tự giá trị: `M21Record` → `party_snapshot`; `M12Complaint` → bên khiếu nại; `M25InterestedParty` → `party_id` | Chưa bắt đầu |
| 5 | Consent theo mục đích, phân loại dữ liệu, engine hết hạn tài liệu | Chưa bắt đầu |
| 6 | Đa tenant, RLS, COI engine | Chỉ khi có điều kiện kích hoạt (mục 2.2) |

**Nguyên tắc chuyển tiếp:** module đang làm dở không bị chặn bởi chuẩn này; nhưng mọi đặc tả
**mới** trong `05_MODULE_LIBRARY` có khái niệm khách hàng / NCC / cơ sở / đối tác / chuyên gia đều
phải tham chiếu `party_role` thay vì định nghĩa master riêng.

---

## 11. Ngoài phạm vi

Chuẩn này **không** quy định: quy trình bán hàng và chỉ tiêu doanh thu · kế toán, hóa đơn, công nợ
(thuộc CAP-15) · nội dung thủ tục ISO của từng MP · lược đồ chi tiết của các module đã ban hành ·
kiến trúc hạ tầng và triển khai (MP33/MP35).
