# M28_ATTT — Đặc tả API

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md). Bảng dưới là bản dẫn
> xuất; mã quy tắc `R1`–`R21` trỏ tới mục 5 của đặc tả.

## Rủi ro ATTT (`SecurityRisk`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/attt/rui-ro` | Nội bộ (lọc theo `confidentiality`) | Hồ sơ rủi ro — lọc theo mức, chủ sở hữu, tài sản, trạng thái, cờ đến hạn rà soát |
| POST | `/attt/rui-ro` | PT.ATTT, TP, QTHT | Tạo rủi ro (Nháp) — chặn nếu thiếu `asset_refs` (R1) hoặc `risk_owner` là QTHT (R3) |
| GET | `/attt/rui-ro/{id}` | Theo phân quyền bảo mật | Chi tiết; bản ghi Hạn chế/Mật ghi nhật ký lượt xem |
| PUT | `/attt/rui-ro/{id}` | Người lập, PT.ATTT | Sửa (chỉ khi chưa phê duyệt); `impact` và `risk_score` do hệ thống tính (R2) |
| POST | `/attt/rui-ro/{id}/submit-review` | Người lập | → Chờ soát xét |
| POST | `/attt/rui-ro/{id}/review` | PT.ATTT/QLCL (≠ người lập) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét (**bắt buộc lý do**) |
| POST | `/attt/rui-ro/{id}/approve` | **LĐV** | Đạt → Đang xử lý (R ≥ 7, chặn nếu thiếu RTP hợp lệ — R4) hoặc Chấp nhận rủi ro tồn dư |
| POST | `/attt/rui-ro/{id}/accept-residual` | **LĐV** | Đóng với rủi ro tồn dư — chặn nếu `residual_score ≥ 7` mà thiếu phê duyệt + lý do (R5) |
| POST | `/attt/rui-ro/{id}/mark-reviewed` | PT.ATTT | Xác nhận rà soát định kỳ — cập nhật `last_assessed_at` (R13) |
| POST | `/attt/rui-ro/{id}/retire` | LĐV | → Hết hiệu lực (**bắt buộc lý do**) |

## Hạng mục xử lý rủi ro (`RiskTreatment`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/attt/rui-ro/{id}/xu-ly` | PT.ATTT, `risk_owner` | Thêm hạng mục RTP — chặn nếu `due_at` vượt hạn theo mức rủi ro (R4) |
| PUT | `/attt/xu-ly/{id}` | Người chịu trách nhiệm | Cập nhật tiến độ |
| POST | `/attt/xu-ly/{id}/verify` | **PT.ATTT** | Xác nhận hiệu lực → Hoàn thành — không xác nhận thì không được ghi hoàn thành (R6) |
| GET | `/attt/xu-ly?overdue=true` | PT.ATTT, LĐV | Hạng mục quá hạn — cảnh báo chủ sở hữu, quá 02 lần báo LĐV |

## Tuyên bố áp dụng (`SoAVersion`, `SoAControl`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/attt/soa` | Nội bộ | Danh sách phiên bản SoA |
| POST | `/attt/soa` | PT.ATTT | Tạo phiên bản mới — seed đủ **93** `SoAControl` (A.5.1–A.5.37, A.6.1–A.6.8, A.7.1–A.7.14, A.8.1–A.8.34) |
| GET | `/attt/soa/{version}` | Nội bộ | Phạm vi ISMS + 93 dòng kiểm soát + bảng tổng hợp |
| PUT | `/attt/soa/{version}/kiem-soat/{control_code}` | PT.ATTT | Cập nhật một dòng kiểm soát (chỉ khi SoA chưa phê duyệt — R8) |
| POST | `/attt/soa/{version}/submit-review` | PT.ATTT | → Chờ soát xét |
| POST | `/attt/soa/{version}/review` | QLCL | Đạt → Chờ phê duyệt; Không đạt → trả lại (**bắt buộc lý do**) |
| POST | `/attt/soa/{version}/approve` | **LĐV** | → Đã phê duyệt; chặn nếu còn dòng `applicable = false` thiếu `exclusion_reason` (R7); bản trước tự chuyển Hết hiệu lực |
| GET | `/attt/soa/{version}/thieu-bang-chung` | PT.ATTT, QLCL | Kiểm soát "Áp dụng" quá `evidence_due_at` mà chưa có bằng chứng — nguồn mở KPH (R9) |

## Sự cố ATTT (`SecurityIncident`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/attt/su-co` | **Mọi nhân sự** | Báo sự cố (Mới) — không giới hạn vai trò, để không cản trở việc báo sớm |
| GET | `/attt/su-co` | PT.ATTT, LĐV, QLCL | Danh sách theo mức, trạng thái, thời gian phát hiện → khống chế |
| POST | `/attt/su-co/{id}/classify` | PT.ATTT | Phân mức theo tiêu chí (mục 4.3 đặc tả) |
| POST | `/attt/su-co/{id}/contain` | QTHT, PT.ATTT | Ghi biện pháp khống chế + `contained_at` + bằng chứng đã bảo toàn |
| POST | `/attt/su-co/{id}/investigate` | PT.ATTT | Nguyên nhân trực tiếp, phạm vi ảnh hưởng, `affects_result_validity` |
| POST | `/attt/su-co/{id}/notify` | **LĐV** quyết định | Ghi một bản ghi thông báo ra bên ngoài kèm căn cứ và bằng chứng gửi/nhận |
| POST | `/attt/su-co/{id}/recover` | QTHT, chủ sở hữu hệ thống | Ghi `recovery_at`, cập nhật `risk_refs` |
| POST | `/attt/su-co/{id}/conclude` | PT.ATTT | → Chờ kết luận; mở `capa_ref` sang M13 nếu có KPH |
| POST | `/attt/su-co/{id}/close` | **LĐV** (Cao, Rất cao) · PT.ATTT (Thấp, Trung bình) | → Đã đóng — chặn nếu thiếu `lesson_ref` (R15), thiếu `m10_ref`/`m11_ref` khi ảnh hưởng hiệu lực kết quả (R14), hoặc người đóng liên quan trực tiếp tới sự cố (R20) |
| POST | `/attt/su-co/{id}/cancel` | PT.ATTT | → Hủy (cảnh báo giả, **bắt buộc lý do**) |

Không có endpoint xóa sự cố, bản ghi thông báo hay nhật ký liên quan (R10) → mọi yêu cầu xóa trả
`403`.

## Quyền truy cập (`AccessRequest`, `AccessReview`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/attt/quyen-truy-cap` | **TP** | Đề nghị cấp/thay đổi/thu hồi — chặn nếu thiếu `awareness_training_ref` hoặc `nda_ref` với bên thứ ba (R16) |
| POST | `/attt/quyen-truy-cap/{id}/approve` | PT.ATTT hoặc **LĐV** | LĐV bắt buộc khi có quyền đặc quyền, mức Hạn chế/Mật hoặc nhà cung cấp CNTT (R17) |
| POST | `/attt/quyen-truy-cap/{id}/reject` | PT.ATTT, LĐV | → Từ chối (**bắt buộc lý do**) |
| POST | `/attt/quyen-truy-cap/{id}/execute` | **QTHT** | Thực hiện thao tác + ghi `system_log_ref` — chặn nếu trùng người đề nghị/phê duyệt (R18) |
| POST | `/attt/quyen-truy-cap/{id}/revoke` | QTHT | Thu hồi + `revoked_at` — quá cuối ngày làm việc cuối cùng ⇒ cảnh báo LĐV, chặn hoàn tất thôi việc ở M03 (R19) |
| GET | `/attt/quyen-truy-cap?expired=true` | PT.ATTT | Quyền quá `valid_until` chưa thu hồi |
| POST | `/attt/ra-soat-quyen` | TP (phòng) · **LĐV** (tài khoản đặc quyền) | Ghi đợt rà soát định kỳ; quyền thừa phải thu hồi bằng phiếu, không thu hồi ngầm |

## Báo cáo và nhật ký

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/attt/bao-cao/isms` | PT.ATTT, QLCL, LĐV | Sáu nhóm chỉ số (mục 8 đặc tả) — đầu vào bắt buộc của M17 |
| GET | `/attt/{entity}/{id}/audit` | QTHT, QLCL | Nhật ký thao tác append-only |
| GET | `/attt/xuat/{form}` | Theo phân quyền | Xuất F28.01 · F28.02 · F28.03 · F28.04 theo bố cục biểu mẫu gốc |

> Mọi thao tác đổi trạng thái ghi `AuditLog`; vi phạm quy tắc chặn cứng → `409` kèm mã lỗi dạng
> `R{n}_{TEN_QUY_TAC}` (vd. `R5_RESIDUAL_NEEDS_LDV`). Bản ghi có `confidentiality ∈ {Hạn chế, Mật}`
> chỉ trả về cho vai trò được phép và ghi nhật ký lượt xem.
