# M33_HeThongTT — Đặc tả API

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md). Bảng dưới là bản dẫn
> xuất; chi tiết gate xem `01_Requirement/_work/20260824-dac-ta-m33/spec.md` mục 3.

## Tài sản CNTT (`ITAsset`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/hethongtt` | Nội bộ | Danh mục hạ tầng — lọc theo lớp tài sản, vùng mạng, môi trường, mức trọng yếu, trạng thái |
| POST | `/hethongtt` | QTHT | Khai báo tài sản (Nháp) — bắt buộc `custodian` + `user_owner` (R1) |
| GET | `/hethongtt/{id}` | Nội bộ | Chi tiết: cấu hình an toàn, bảo trì, tài khoản, sự cố, nền tảng và dữ liệu liên quan |
| PUT | `/hethongtt/{id}` | QTHT | Sửa (chỉ khi chưa phê duyệt) |
| POST | `/hethongtt/{id}/submit-review` | QTHT | → Chờ soát xét |
| POST | `/hethongtt/{id}/review` | PT.ATTT (≠ người lập) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét (**bắt buộc lý do**) |
| POST | `/hethongtt/{id}/approve` | **LĐV** | Đạt → Đang vận hành — **chặn** khi thiếu chủ quản trị (R1), thiếu cấu hình an toàn bắt buộc (R3), hoặc gán dữ liệu khách hàng vào môi trường không phải Vận hành khi chưa được duyệt (R5) |
| POST | `/hethongtt/{id}/suspend` · `/resume` | QTHT | Tạm ngừng khi bảo trì/sự cố (**bắt buộc lý do**) → quay lại Đang vận hành |
| POST | `/hethongtt/{id}/retire` | QTHT, LĐV | → Ngừng vận hành (**bắt buộc lý do**); chặn nếu còn nền tảng Hiệu lực phụ thuộc (← M35) |
| POST | `/hethongtt/{id}/dispose` | **LĐV** | → Đã thanh lý — **chặn nếu thiếu bằng chứng xóa dữ liệu an toàn** (biên bản hủy ← M27, quy tắc R10) |
| POST | `/hethongtt/{id}/mark-reviewed` | QTHT | Xác nhận rà soát định kỳ |
| POST | `/hethongtt/{id}/cancel` | LĐV | → Hủy bản ghi (chỉ khi chưa phê duyệt, **bắt buộc lý do**) |
| GET | `/hethongtt/due` | QTHT, LĐV | 4 nhóm đến hạn: rà soát · bảo trì · vá lỗi quá hạn · bản quyền–bảo hành–EOL |
| GET | `/hethongtt/inventory` | QLCL, PT.ATTT, LĐV | **Báo cáo kiểm kê hợp nhất M33 + M27** (ISO/IEC 27001 A.5.9) |
| GET | `/hethongtt/{id}/audit` | Quản trị | Nhật ký thao tác |

## Bảo trì và vá lỗi (`MaintenanceTask`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/hethongtt/maintenance` | QTHT | Kế hoạch/công việc bảo trì; `task_type = Vá lỗi bảo mật` bắt buộc `severity` |
| POST | `/hethongtt/maintenance/{id}/complete` | QTHT | Ghi nhận hoàn thành — bắt buộc `evidence_ref`; **chặn** khi thiếu `change_ref` → M30 (R5) hoặc thiếu `measurement_impact_ref` → M10 với máy tính điều khiển thiết bị đo (R4) |
| POST | `/hethongtt/maintenance/{id}/defer` | QTHT + LĐV khi vá lỗi Nghiêm trọng | Hoãn (**bắt buộc lý do**); quá hạn ⇒ cảnh báo LĐV, mở KPH ← M13 |

## Tài khoản hệ thống (`SystemAccount`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/hethongtt/accounts` | QTHT, PT.ATTT, LĐV | Danh mục tài khoản theo hệ thống/nền tảng |
| POST | `/hethongtt/accounts` | QTHT | Ghi nhận tài khoản đã tạo — **bắt buộc `access_request_ref` đã phê duyệt ở M28** (R6); từ chối mọi trường chứa bí mật xác thực (R7) |
| POST | `/hethongtt/accounts/{id}/lock` · `/revoke` | QTHT | Tạm khóa / thu hồi theo phiếu M28; thu hồi bắt buộc `revoked_at` |
| GET | `/hethongtt/accounts/reconcile` | PT.ATTT, LĐV | **Đối chiếu** tài khoản thực tế ↔ phiếu M28: tài khoản không phiếu, phiếu không tài khoản, quá `valid_until`, đặc quyền thiếu MFA |
| POST | `/hethongtt/accounts/{id}/flag-orphan` | QTHT, PT.ATTT | Đánh dấu tài khoản bất thường ⇒ khóa tạm + mở sự cố ở M28 (R6) |

## Sự cố và yêu cầu hỗ trợ (`ITIncident`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/hethongtt/incidents` | Nhân viên (báo) · QTHT (xử lý) | Ghi nhận sự cố/yêu cầu — bắt buộc `asset_refs`, `impact`, `security_flag` |
| POST | `/hethongtt/incidents/{id}/route` | QTHT | Định tuyến: `security_flag` ⇒ M28 · nền tảng ⇒ M35 · dữ liệu/kết quả đo ⇒ M10 (**quy tắc R9**) |
| POST | `/hethongtt/incidents/{id}/resolve` · `/close` | QTHT | Xử lý và đóng — bắt buộc `resolution`; lặp ≥ 3 lần/90 ngày ⇒ **chặn đóng nếu thiếu `capa_ref`** → M13 |
| POST | `/hethongtt/incidents/{id}/cancel` | QTHT | → Hủy (**bắt buộc lý do**) |

## Đầu ra

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/hethongtt/export/{F33.01\|F33.02\|F33.03\|F33.04}` | QLCL, QTHT | Xuất biểu mẫu (chỉ bản ghi đã phê duyệt/đã thực hiện) |
| GET | `/hethongtt/report/m31` · `/report/m17` | QLCL, LĐV | Hạ tầng trọng yếu + RTO cho kế hoạch liên tục; tình hình hạ tầng cho xem xét lãnh đạo |

> Mọi thao tác đổi trạng thái ghi AuditLog; vi phạm quy tắc → 409 kèm mã lỗi. **Không có endpoint
> xóa** bản ghi kiểm kê — tài sản đã thanh lý vẫn giữ bản ghi làm bằng chứng.
