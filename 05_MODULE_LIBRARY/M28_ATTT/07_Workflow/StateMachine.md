# M28_ATTT — Bảng trạng thái

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 6. Mã `R{n}` trỏ tới
> quy tắc nghiệp vụ tại mục 5 của đặc tả.

## 1. `SecurityRisk` — Rủi ro ATTT

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang nhận diện, mô tả | PT.ATTT, TP, QTHT | Đủ trường bắt buộc (R1, R3) → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ kiểm tra cách chấm điểm | Người lập | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại để sửa | PT.ATTT/QLCL (≠ người lập) | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV duyệt mức rủi ro và phương án xử lý | PT.ATTT | Đạt → Đang xử lý (R ≥ 7, chặn nếu thiếu RTP hợp lệ — R4); R < 7 → Chấp nhận rủi ro tồn dư | — |
| 5 | Không phê duyệt | Bị trả lại để sửa | **LĐV** | Sửa → Chờ soát xét | **Có** |
| 6 | Đang xử lý | RTP đã phê duyệt, đang thực hiện | `risk_owner` | Mọi `RiskTreatment` Hoàn thành và đã xác nhận hiệu lực (R6) → Đã xử lý | — |
| 7 | Đã xử lý | Biện pháp xong, hiệu lực đã xác nhận | PT.ATTT | → Chấp nhận rủi ro tồn dư | — |
| 8 | Chấp nhận rủi ro tồn dư | Đóng với mức tồn dư còn lại | **LĐV** khi `residual_score ≥ 7` (R5) | (kết thúc — vẫn rà soát định kỳ theo R13) | **Có** |
| 9 | Hết hiệu lực | Rủi ro không còn (tài sản/hoạt động chấm dứt) | LĐV theo đề nghị PT.ATTT | (kết thúc) | **Có** |

Cờ **Đến hạn rà soát** không phải trạng thái — tính khi đọc từ `last_assessed_at` + 12 tháng (R13).

## 2. `RiskTreatment` — Hạng mục RTP

| Trạng thái | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|
| Mở | PT.ATTT, `risk_owner` | Bắt đầu thực hiện → Đang thực hiện | Không |
| Đang thực hiện | Người chịu trách nhiệm | Có `verified_by` + `verified_at` (R6) → Hoàn thành | — |
| Hoàn thành | PT.ATTT (xác nhận hiệu lực) | (kết thúc) | — |
| Quá hạn | — (tính khi đọc từ `due_at`) | Hoàn thành → thoát cờ quá hạn | — |

## 3. `SoAVersion` — Tuyên bố áp dụng

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang điền phạm vi ISMS và 93 dòng kiểm soát | PT.ATTT | Đủ 93 dòng có quyết định Áp dụng/Loại trừ → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ QLCL kiểm tra | PT.ATTT | Đạt → Chờ phê duyệt; Không đạt → trả lại Nháp | **Có** khi trả lại |
| 3 | Chờ phê duyệt | Chờ LĐV | QLCL | Đạt → Đã phê duyệt (chặn nếu còn dòng Loại trừ thiếu lý do — R7) | — |
| 4 | Đã phê duyệt | Có hiệu lực, **chỉ đọc** (R8) | **LĐV** | Phiên bản mới được phê duyệt → bản này tự chuyển Hết hiệu lực | — |
| 5 | Hết hiệu lực | Bị thay thế; vẫn tra cứu được làm bằng chứng | (tự động) | (kết thúc) | — |

Tại một thời điểm chỉ có **một** `SoAVersion` ở trạng thái Đã phê duyệt.

## 4. `SecurityIncident` — Sự cố ATTT

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Mới | Đã ghi nhận sự kiện | **Mọi nhân sự**, QTHT, hệ thống giám sát | PT.ATTT phân mức → Đang khống chế | Không |
| 2 | Đang khống chế | Ngăn chặn trong khả năng an toàn, bảo toàn bằng chứng | QTHT theo chỉ đạo PT.ATTT | Có `contained_at` + `evidence_preserved` → Đang điều tra | — |
| 3 | Đang điều tra | Xác định nguyên nhân, phạm vi, nghĩa vụ thông báo | PT.ATTT, QTHT | Có `direct_cause` + `scope_of_impact` → Đang khắc phục | — |
| 4 | Đang khắc phục | Khôi phục dịch vụ/dữ liệu, cập nhật rủi ro | Chủ sở hữu hệ thống, QTHT | Có `recovery_at` → Chờ kết luận | — |
| 5 | Chờ kết luận | Lập kết luận, mở KPH sang M13 nếu có | PT.ATTT | Đủ điều kiện đóng (R14, R15) → Đã đóng | — |
| 6 | Đã đóng | Kết thúc | **LĐV** (Cao, Rất cao) · PT.ATTT (Thấp, Trung bình); `closed_by` không liên quan trực tiếp tới sự cố (R20) | (kết thúc) | — |
| 7 | Hủy | Xác định là cảnh báo giả | PT.ATTT | (kết thúc) | **Có** |

**Điều kiện đóng (đồng thời):** đã khôi phục · đã hoàn tất nghĩa vụ thông báo phát sinh · có
`lesson_ref` → M26 khi mức Cao trở lên (R15) · có `m10_ref`/`m11_ref` khi ảnh hưởng hiệu lực kết quả
đo (R14).

## 5. `AccessRequest` — Yêu cầu quyền truy cập

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Đề nghị | TP lập phiếu | **TP** | Đủ `awareness_training_ref`, `nda_ref` (R16) → Chờ phê duyệt | Không |
| 2 | Chờ phê duyệt | Chờ thẩm quyền | PT.ATTT hoặc **LĐV** (R17) | Đồng ý → Đã phê duyệt; Không đồng ý → Từ chối | **Có** khi từ chối |
| 3 | Đã phê duyệt | Chờ thực hiện | — | QTHT thực hiện (R18) → Đã thực hiện | — |
| 4 | Đã thực hiện | Quyền đã có hiệu lực, đã ghi `system_log_ref` | **QTHT** | Hết `valid_until` hoặc chấm dứt công việc → Đã thu hồi | — |
| 5 | Từ chối | Không cấp quyền | PT.ATTT, LĐV | (kết thúc) | **Có** |
| 6 | Đã thu hồi | Quyền đã gỡ, tài sản đã thu | QTHT | (kết thúc) | — |

Thu hồi toàn bộ phải hoàn tất **trong ngày làm việc cuối cùng**; chưa hoàn tất ⇒ cảnh báo LĐV và
chặn hoàn tất thủ tục thôi việc ở M03 (R19).

> Nguyên tắc chung: ít trạng thái nhưng đủ kiểm soát; hồ sơ chưa phê duyệt không dùng làm căn cứ
> tiếp theo; mọi nhánh Hủy/Từ chối/Không phê duyệt bắt buộc ghi lý do; mọi chuyển trạng thái ghi
> `AuditLog` append-only.
