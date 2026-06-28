# M36 — Đặc tả yêu cầu

## 1. Phạm vi
Quản lý chứng chỉ đo lường số (DCC/DVC/DTC) từ khi tạo đến khi hết hiệu lực, phục vụ 3 bên:
tổ chức đo lường (ETV) — khách hàng — cơ quan quản lý.

## 2. Trường dữ liệu bắt buộc

| Nhóm | Trường | Ghi chú |
|---|---|---|
| Định danh | `cert_no` (số chứng chỉ, **duy nhất**) | sinh theo quy tắc của Viện |
| | `cert_type` | DCC / DVC / DTC |
| | `version` | phiên bản; tăng khi thay thế |
| Đối tượng | `instrument_id` | định danh phương tiện đo/đối tượng đo |
| | `customer_id` | khách hàng/chủ sở hữu |
| | `organization_id` | tổ chức thực hiện (ETV) |
| Kỹ thuật | `method_id` | phương pháp/quy trình áp dụng (← M08) |
| | `reference_standard_id[]` | chuẩn/chất chuẩn sử dụng (← M05) |
| | `results[]` | kết quả đo có cấu trúc: đại lượng, giá trị, đơn vị |
| | `uncertainty` | **độ không đảm bảo đo** (bắt buộc với kết quả định lượng) |
| | `decision_rule` | quy tắc quyết định & tuyên bố phù hợp (← M18) nếu có |
| Thời gian | `issued_date`, `valid_until` | ngày phát hành, hạn hiệu lực |
| Kiểm soát | `status`, `prepared_by`, `reviewed_by`, `approved_by`, `signature_id`, `qr_token` | |

## 3. Quy tắc nghiệp vụ (control rules)
1. `cert_no` duy nhất toàn hệ thống; không trùng kể cả với chứng chỉ đã hủy.
2. Không cho chuyển sang **Chờ phê duyệt** nếu thiếu `results` hoặc thiếu `uncertainty` (với phép định lượng).
3. **Không soát xét** / **Không phê duyệt** bắt buộc nhập `reason`.
4. Sau **Đã phát hành**, mọi thay đổi phải tạo **phiên bản mới** hoặc **chứng chỉ thay thế** (liên kết `replaces`).
5. **Cấp lại GCN**: thêm hậu tố `R` vào `cert_no`; chứng chỉ cũ mất hiệu lực pháp lý (đồng bộ MP11).
6. **Thu hồi/Hủy**: chỉ LĐP/LĐV; bắt buộc `reason`; chứng chỉ rời khỏi tra cứu công khai.
7. Chỉ trạng thái **Đã ký số/Đã phát hành** mới hiển thị qua `GET /public/verify`.
8. AI Agent (← M29) chỉ gắn cờ cảnh báo (bất thường, thiếu/không nhất quán dữ liệu); **không** đổi trạng thái phê duyệt.

## 4. Truy xuất nguồn gốc
Chuỗi truy xuất: nguyên liệu/chuẩn (M05) → phương pháp (M08) → kết quả (M11) → quyết định (M18)
→ chứng chỉ (M36) → phân phối (M20) → hồ sơ lưu (M15) → audit (M16).
