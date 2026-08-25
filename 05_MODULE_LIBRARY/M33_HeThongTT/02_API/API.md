# M33_HeThongTT — Đặc tả API

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md). Bảng dưới là bản dẫn
> xuất; màn hình, tiêu chí chấp nhận và NFR ở [`../04_UI/Screens.md`](../04_UI/Screens.md). Điều kiện
> chặn cứng dẫn từ `ETV.P33` Phụ lục I (dự thảo, Chờ soát xét).

## Tài sản CNTT (`ITAsset`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/hethongtt` | Nội bộ | Danh mục hạ tầng — lọc theo lớp tài sản, vùng mạng, môi trường, mức trọng yếu, trạng thái |
| POST | `/hethongtt` | QTHT | Khai báo tài sản (Nháp) — **từ chối lưu** khi thiếu `custodian` hoặc `user_owner` (R1); từ chối mọi trường chứa bí mật xác thực (R7) |
| GET | `/hethongtt/{id}` | Nội bộ | Chi tiết: cấu hình an toàn, bảo trì, tài khoản, sự cố, nền tảng (M35), dữ liệu (M27), thiết bị đo (M05) liên quan |
| PUT | `/hethongtt/{id}` | QTHT | Sửa (chỉ khi chưa phê duyệt) |
| POST | `/hethongtt/{id}/submit-review` | QTHT | → Chờ soát xét — chỉ khi đã áp cấu hình an toàn cơ sở (R3) |
| POST | `/hethongtt/{id}/review` | PT.ATTT (≠ người lập) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét (**bắt buộc lý do**) |
| POST | `/hethongtt/{id}/approve` | **LĐV** | Đạt → Đang vận hành — **chặn** theo `ETV.P33` Phụ lục I.1: thiếu chủ quản trị (R1), thiếu cấu hình an toàn cơ sở hoặc mã hóa ổ đĩa (R3), `criticality = Cao` thiếu RTO/`failover_plan`/rủi ro, phần mềm thiếu giấy phép hợp lệ (R21), BYOD Hạn chế–Mật thiếu phê duyệt LĐV, gán dữ liệu khách hàng vào môi trường không phải Vận hành khi chưa duyệt (R5) |
| POST | `/hethongtt/{id}/handover` | QTHT, TP | Ghi nhận bàn giao thiết bị cho đơn vị sử dụng (`handover_record_ref`) |
| POST | `/hethongtt/{id}/suspend` · `/resume` | QTHT | Tạm ngừng khi bảo trì/sự cố (**bắt buộc lý do**) → quay lại Đang vận hành |
| POST | `/hethongtt/{id}/retire` | QTHT | → Ngừng vận hành (**bắt buộc lý do**); **chặn** khi còn đối tượng phụ thuộc: nền tảng Hiệu lực (M35), tài sản thông tin còn lưu (M27), **thiết bị đo còn được phục vụ (M05)** — `ETV.P33` §6.6.1 bước 2 |
| POST | `/hethongtt/{id}/dispose` | **LĐV** | → Đã thanh lý (**bắt buộc lý do**) — **chặn nếu thiếu bằng chứng xóa dữ liệu an toàn** (biên bản hủy ← M27, R10) hoặc chưa thu hồi hết tài khoản, quyền, chứng thư số gắn với tài sản (§6.6.1 bước 4) |
| POST | `/hethongtt/{id}/isolate` | QTHT, PT.ATTT | Ngắt tài sản khỏi mạng của Viện khi không đạt cấu hình an toàn cơ sở (`ETV.P33` §6.7 bước 3) |
| POST | `/hethongtt/{id}/mark-reviewed` | QTHT | Xác nhận rà soát định kỳ: bản ghi còn đúng và còn cần thiết (§6.1.4 bước 6) |
| POST | `/hethongtt/{id}/cancel` | LĐV | → Hủy bản ghi (chỉ khi chưa phê duyệt, **bắt buộc lý do**) |
| GET | `/hethongtt/due` | QTHT, VP, LĐV | 7 nhóm đến hạn: rà soát · bảo trì · vá lỗi quá hạn · bản quyền–bảo hành–EOL · quá hạn phản hồi sự cố · tài sản chưa kiểm kê quá 30 ngày · ngoài kế hoạch bảo trì năm |
| GET | `/hethongtt/undiscovered` | QTHT, PT.ATTT | Hàng chờ xử lý hạ tầng chưa kiểm kê (§6.7) |
| GET | `/hethongtt/inventory` | QLCL, PT.ATTT, LĐV | **Báo cáo kiểm kê hợp nhất M33 + M27** (ISO/IEC 27001 A.5.9, R2) |
| GET | `/hethongtt/{id}/audit` | Quản trị | Nhật ký thao tác |

## Kế hoạch bảo trì năm (`MaintenancePlan`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/hethongtt/plans` | VP, QTHT | Lập kế hoạch bảo trì năm phủ toàn bộ tài sản có hệ điều hành/phần mềm nền (R19) |
| POST | `/hethongtt/plans/{id}/submit` | VP | → Chờ phê duyệt |
| POST | `/hethongtt/plans/{id}/approve` | **LĐV** | → Đã phê duyệt — **chặn** khi `created_by = approved_by`; cảnh báo nếu còn tài sản trong phạm vi chưa được phủ |
| GET | `/hethongtt/plans/{id}/coverage` | VP, LĐV | Đối chiếu phạm vi: tài sản thuộc diện mà chưa có trong kế hoạch |

## Bảo trì và vá lỗi (`MaintenanceTask`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/hethongtt/maintenance` | QTHT | Công việc bảo trì theo kế hoạch hoặc đột xuất; `task_type = Vá lỗi bảo mật` bắt buộc `severity` (quyết định mốc 07/30/90 ngày) |
| POST | `/hethongtt/maintenance/{id}/notify` | QTHT | Thông báo trước cho đơn vị sử dụng với công việc gây gián đoạn (§6.3.2 bước 3) |
| POST | `/hethongtt/maintenance/{id}/perform` | QTHT | Ghi nhận đã thực hiện + `evidence_ref` → **Chờ nghiệm thu**; **chặn** khi thiếu `change_ref` → M30 (R5) hoặc thiếu `measurement_impact_ref` → M10 với máy tính điều khiển thiết bị đo (R4) |
| POST | `/hethongtt/maintenance/{id}/accept` | **TP hoặc QTHT khác người thực hiện** | Nghiệm thu → Hoàn thành — **chặn khi `accepted_by = performed_by`** (R15); cập nhật `last_maintained_at` và hạn kế tiếp trên bản ghi tài sản |
| POST | `/hethongtt/maintenance/{id}/defer` | QTHT · **LĐV** khi vá lỗi Nghiêm trọng | Hoãn (**bắt buộc lý do**); quá hạn ⇒ cảnh báo LĐV, mở KPH ← M13 |

## Tài khoản hệ thống (`SystemAccount`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/hethongtt/accounts` | QTHT, PT.ATTT, LĐV | Danh mục tài khoản theo hệ thống/nền tảng |
| POST | `/hethongtt/accounts` | QTHT | Ghi nhận tài khoản đã tạo — **bắt buộc `access_request_ref` là phiếu F28.04 đã phê duyệt ở M28** (R6); từ chối mọi trường chứa bí mật xác thực, chỉ nhận `secret_location` và `secret_issuer` (R7) |
| POST | `/hethongtt/accounts/{id}/lock` · `/revoke` | QTHT | Tạm khóa / thu hồi theo phiếu M28; thu hồi bắt buộc `revoked_at` |
| GET | `/hethongtt/accounts/pending-revocation` | QTHT, PT.ATTT | Hàng chờ thu hồi theo biến động nhân sự (← M03), hạn **cuối ngày làm việc** (R16) |
| POST | `/hethongtt/accounts/{id}/flag-orphan` | QTHT, PT.ATTT | Đánh dấu tài khoản bất thường ⇒ **khóa tạm ngay** + mở sự cố ở M28; **không có đường xóa** trước khi PT.ATTT xem xét (§6.4.3) |

## Kỳ đối chiếu tài khoản (`AccountReconciliation`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/hethongtt/accounts/reconcile` | PT.ATTT, LĐV | **Đối chiếu tức thời** tài khoản thực tế ↔ phiếu M28: tài khoản không phiếu, phiếu không tài khoản, quá `valid_until`, đặc quyền thiếu MFA |
| POST | `/hethongtt/reconciliations` | QTHT | Mở kỳ đối chiếu — `scope = Toàn bộ tài khoản` (06 tháng/lần) hoặc `Đặc quyền và dịch vụ` (≥ 02 lần/năm) — R20 |
| POST | `/hethongtt/reconciliations/{id}/close` | QTHT + PT.ATTT | Chốt kỳ ⇒ số liệu **bất biến**, lưu 05 năm; kỳ đặc quyền – dịch vụ bắt buộc `submitted_to_ldv_at` |

## Sự cố và yêu cầu hỗ trợ (`ITIncident`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/hethongtt/incidents` | NTH (báo) · QTHT (xử lý) | Ghi nhận sự cố/yêu cầu — bắt buộc `asset_refs`, `impact`, `security_flag`; hệ thống tự tính `priority`, `response_due_at`, `resolution_due_at` (mục 4.6) |
| POST | `/hethongtt/incidents/{id}/respond` | QTHT | Ghi nhận đã phản hồi; `priority = Cao` bắt buộc `escalated_to_ldv_at` **trong 01 giờ** (R18) |
| POST | `/hethongtt/incidents/{id}/route` | QTHT | Định tuyến 5 đích: `security_flag` ⇒ M28 · nền tảng ⇒ M35 · dữ liệu đo/kết quả đã phát hành ⇒ M10–M11 · gián đoạn vượt ngưỡng ⇒ M31 · lặp ≥ 3 lần/90 ngày ⇒ M13 (R9) |
| POST | `/hethongtt/incidents/{id}/resolve` · `/close` | QTHT · **PT.ATTT** khi có yếu tố ATTT | Đóng bắt buộc đủ `root_cause`, `resolution`, `asset_back_to_normal`, kết luận của thủ tục được định tuyến, và kết luận **có/không lập bài học kinh nghiệm** ← M26; **chặn đóng** khi `security_flag` chưa có kết luận M28 hoặc sự cố lặp thiếu `capa_ref` (R18) |
| POST | `/hethongtt/incidents/{id}/cancel` | **LĐV** | → Hủy (**bắt buộc lý do**) |

## Đầu ra

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/hethongtt/export/{F33.01\|F33.02\|F33.03\|F33.04}` | QLCL, QTHT | Xuất biểu mẫu (chỉ bản ghi đã phê duyệt/đã nghiệm thu) |
| GET | `/hethongtt/report/semiannual` | VP, QLCL, LĐV | Báo cáo tình hình hệ thống thông tin 06 tháng/lần — đủ 8 nội dung `ETV.P33` §6.9 |
| GET | `/hethongtt/report/m31` · `/report/m17` | QLCL, LĐV | Hạ tầng trọng yếu + RTO cho kế hoạch liên tục; tình hình hạ tầng cho xem xét lãnh đạo |

> Mọi thao tác đổi trạng thái ghi `AuditLog`; vi phạm quy tắc → **409** kèm mã lỗi **và điều khoản
> `ETV.P33` tương ứng**. **Không có endpoint xóa** bản ghi kiểm kê hay bản ghi tài khoản — tài sản đã
> thanh lý vẫn giữ bản ghi làm bằng chứng, mã tài sản không bao giờ được cấp lại (R22).
