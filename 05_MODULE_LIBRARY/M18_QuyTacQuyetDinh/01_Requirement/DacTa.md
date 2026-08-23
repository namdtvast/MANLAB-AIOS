# M18_QuyTacQuyetDinh — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P18_QuyTacQuyetDinh.md` (Thủ tục ETV.P18, lần ban hành 02,
> **Đã phê duyệt** 21/07/2026, tên đầy đủ "Quy tắc Quyết định và Tuyên bố Sự phù hợp"). **Không
> có biểu mẫu áp dụng riêng** (mục VII bản gốc để trống) — quy tắc quyết định tích hợp trực tiếp
> vào Báo cáo kết quả/GCN theo `ETV.P11` (→ M11), không phải một quy trình độc lập có hồ sơ
> riêng. Mục V (RACI) của nguồn do AI suy luận từ nội dung kỹ thuật (bản gốc không có mục "Trách
> nhiệm" riêng) — nguồn tự ghi chú "cần LĐP xác nhận lại"; đặc tả dưới đây giữ nguyên tình trạng
> chưa xác nhận đó.

## 1. Mục tiêu module

Số hóa MP18 — cung cấp **công cụ tính toán và áp dụng quy tắc quyết định (decision rule)** khi
đưa ra tuyên bố sự phù hợp (Đạt/Không đạt) trong báo cáo hiệu chuẩn/kiểm định/thử nghiệm, theo
ISO/IEC 17025 §3.7, §7.1.3, §7.8.6 + ISO/IEC Guide 98-4 + ILAC-G8. **Không phải một quy trình
nghiệp vụ độc lập có vòng đời/trạng thái riêng** — là một thư viện quy tắc + phép tính dải bảo
vệ được **nhúng vào bước phát hành Báo cáo/GCN của M11**, tương tự cách M18 là "rule engine"
chứ không phải "workflow module".

## 2. Đối tượng dữ liệu chính

Không có entity CSDL độc lập với vòng đời trạng thái riêng (không có form, không có bảng lưu
trữ hồ sơ tách biệt) — hai khái niệm dữ liệu dưới đây được **nhúng làm trường/cấu hình của
`Certificate`/`MeasurementRecord` (← M11)**, không tạo bảng mới cấp module.

### 2.1. `DecisionRuleAgreement` (nhúng vào hồ sơ thỏa thuận dịch vụ, trước khi đo — ← M07/M11)

`customer_requested_conformity` (bool — khách hàng có yêu cầu tuyên bố phù hợp không),
`rule_type` (Nhị phân/Phi nhị phân), `acceptance_mode` (Chấp nhận đơn giản `w=0` / Dải bảo vệ
`w=U` / Dải bảo vệ `w=rU` theo hệ số tùy chỉnh / Theo tiêu chuẩn thử nghiệm quy định sẵn),
`agreed_risk` (mức PFA/PFR thỏa thuận, ví dụ "≤ 2,5%"), `written_agreement_ref` (bắt buộc bằng
văn bản trước khi bắt đầu công việc — §7.1.3).

### 2.2. `ConformityStatement` (nhúng vào `Certificate` khi phát hành — ← M11)

`measured_value`, `expanded_uncertainty` (U = k·uc(y), k=2, ≈95%), `tolerance_limit_upper/lower`
(TL), `guard_band` (w = TL − AL), `acceptance_limit` (AL = TL − w), `result`
(Đạt / Đạt có điều kiện / Không đạt có điều kiện / Không đạt — phi nhị phân; hoặc chỉ Đạt/Không
đạt — nhị phân), `applied_rule_ref` (→ 2.1), `specific_or_global_risk` (Cụ thể/Tổng thể).

### 2.3. Bảng quy tắc dải bảo vệ chuẩn (cấu hình tham chiếu, không phải dữ liệu nhập tay mỗi lần)

| Quy tắc | Dải bảo vệ w | Rủi ro cụ thể (PFA) |
|---|---|---|
| 6 sigma | 3U | 1 ppm |
| 3 sigma | 1,5U | 0,16% |
| ILAC G8:2009 | 1U | 2,5% |
| ISO 14253-1:2017 | 0,83U | 5% |
| Chấp nhận đơn giản | 0 | 50% |
| Chấp nhận dễ dãi | −U | Bác bỏ nếu giá trị đo vượt AL = TL + U |
| Khách hàng xác định | rU | Theo hệ số nhân r do khách hàng yêu cầu |

## 3. Vai trò (RACI — *suy luận từ nội dung, cần LĐP xác nhận, xem ghi chú nguồn*)

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Chủ sở hữu thủ tục; phê duyệt Báo cáo/GCN có kèm tuyên bố sự phù hợp trước khi phát hành |
| QLKT | Xây dựng/lựa chọn quy tắc quyết định theo phép đo/tiêu chuẩn áp dụng; tính ĐKĐB + dải bảo vệ; lập văn bản quy tắc khi cần |
| Nhân sự thực hiện | Thỏa thuận với khách hàng về quy tắc quyết định/mức rủi ro trước khi đo; áp dụng đúng quy tắc đã thỏa thuận khi đưa tuyên bố vào báo cáo |

## 4. Quy tắc nghiệp vụ

1. Chỉ tính/hiển thị `ConformityStatement` khi khách hàng **có yêu cầu** tuyên bố sự phù hợp
   (`customer_requested_conformity = true`) — mặc định chỉ báo cáo giá trị đo + ĐKĐB, không tự
   động suy ra Đạt/Không đạt.
2. Nếu quy tắc quyết định **không có sẵn** trong quy định kỹ thuật/tiêu chuẩn áp dụng, hệ thống
   phải chặn phát hành cho tới khi có `written_agreement_ref` (thỏa thuận bằng văn bản với khách
   hàng) — không tự chọn quy tắc mặc định thay khách hàng.
3. Ưu tiên áp dụng quy tắc quyết định theo thứ tự: (a) quy định pháp định/OIML nếu có, (b) quy
   tắc trong tiêu chuẩn thử nghiệm áp dụng nếu có, (c) thỏa thuận riêng với khách hàng khi không
   có (a)/(b) — không được nhảy thẳng tới (c) khi (a)/(b) đã có sẵn.
4. `guard_band` w = TL − AL; `acceptance_limit` AL = TL − w — công thức tính toán không được
   sửa tùy tiện theo từng báo cáo, phải theo đúng `applied_rule_ref` đã thỏa thuận.
5. Quy tắc **phi nhị phân có dải bảo vệ** (4 vùng: Đạt/Đạt có điều kiện/Không đạt có điều
   kiện/Không đạt) chỉ dùng khi `rule_type = Phi nhị phân` và `w > 0` — quy tắc nhị phân luôn
   chỉ trả về 2 giá trị kết quả.
6. Báo cáo/GCN có `ConformityStatement` bắt buộc ghi rõ 3 thông tin: kết quả áp dụng cho tham số
   nào, quy định kỹ thuật/tiêu chuẩn nào được/không đáp ứng, quy tắc quyết định áp dụng (trừ khi
   quy tắc đã nằm sẵn trong tiêu chuẩn viện dẫn) — thiếu 1 trong 3 chặn phát hành (liên kết gate
   phát hành của **M11**).
7. `specific_or_global_risk = Tổng thể` chỉ áp dụng khi khách hàng có "Hệ thống hiệu chuẩn" quản
   lý tích cực nhiều thiết bị và yêu cầu rõ ràng — mặc định dùng rủi ro cụ thể (đo đơn lẻ, không
   có dữ liệu lịch sử).
8. Hồ sơ thỏa thuận quy tắc quyết định + tài liệu tính ĐKĐB/rủi ro lưu theo **ETV.P15**, đính
   kèm cùng hồ sơ Báo cáo/GCN của **M11** — không tạo kho lưu trữ riêng cho M18.

## 5. Liên kết

Quy trình: MP18 · Năng lực: CAP-08_HieuChuan, CAP-09_KiemDinh, CAP-10_ThuNghiem · Thủ tục gốc:
`ETV.P18_QuyTacQuyetDinh.md` (Đã phê duyệt, lần 02) · Biểu mẫu: không có (tích hợp vào báo
cáo/GCN của M11) · Lưu hồ sơ: ETV.P15 (đính kèm hồ sơ M11) · Liên quan: **M11** (module chứa
thực thể `ConformityStatement`, nơi quy tắc M18 thực sự được áp dụng và phát hành), M08 (nguồn
ĐKĐB đã xác nhận theo GUM), M07 (thỏa thuận dịch vụ với khách hàng, nơi chốt quy tắc quyết định
trước khi đo) · Căn cứ: ISO/IEC 17025 §3.7/§7.1.3/§7.8.6, ISO/IEC Guide 98-4:2012, ILAC-G8:2019,
ASME B89.7.3.1-2001, UKAS Lab 49.
