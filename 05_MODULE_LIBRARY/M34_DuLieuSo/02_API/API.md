# M34_DuLieuSo — Đặc tả API

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md). Bảng dưới là bản dẫn
> xuất; màn hình, tiêu chí chấp nhận và NFR ở [`../04_UI/Screens.md`](../04_UI/Screens.md). Điều
> kiện chặn cứng dẫn từ `ETV.P34` Phụ lục I (dự thảo, Chờ soát xét).

## Danh mục tập dữ liệu (`DataSet`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/dulieuso` | Nội bộ | Danh mục — lọc theo nhóm dữ liệu, mức phân loại, giai đoạn vòng đời, CSHDL, trạng thái + cờ cảnh báo |
| POST | `/dulieuso` | QTDL | Khai báo bản ghi (Nháp) — **từ chối lưu** khi thiếu `owner_ref` hoặc `steward_ref` (R1); từ chối khi thiếu `classification`, `has_personal_data`, `retention_basis` (R2, R5); cảnh báo khi trường mô tả khớp mẫu dữ liệu thật (R6) |
| GET | `/dulieuso/{id}` | Nội bộ | Chi tiết: tab Từ điển · Chất lượng · Hiệu chỉnh · Chia sẻ · Truy xuất nguồn gốc · AI |
| PUT | `/dulieuso/{id}` | QTDL | Sửa (chỉ khi chưa phê duyệt) |
| POST | `/dulieuso/{id}/submit-review` | QTDL | → Chờ soát xét — **chặn** khi `dictionary_required` mà chưa có từ điển Hiệu lực (R3) |
| POST | `/dulieuso/{id}/review` | QLCL + PT.ATTT (**≠ người lập**) | Xác nhận phân loại + kiểm trùng: Đạt → Chờ phê duyệt; Không đạt → Không soát xét (**bắt buộc lý do**); trùng tập đã có → trả về id tập cần **gộp**, không tạo mới (R7) |
| POST | `/dulieuso/{id}/approve` | **CSHDL** | → Hiệu lực — **chặn** khi thiếu `quality_metrics` (R4) hoặc vi phạm `ETV.P34` Phụ lục I.1 |
| POST | `/dulieuso/{id}/mark-reviewed` | QTDL, CSHDL | Xác nhận rà soát định kỳ: còn cần thiết, còn đúng phân loại, còn đúng thời hạn giữ (R8) |
| POST | `/dulieuso/{id}/archive` · `/reactivate` | CSHDL, QLCL | → Lưu trữ (**bắt buộc lý do**, hạn chế quyền ghi) / quay lại Hiệu lực |
| POST | `/dulieuso/{id}/propose-disposal` | QLCL | → Đề nghị hủy (**bắt buộc lý do**) — hệ thống trả về kết quả kiểm 4 điều kiện `ETV.P34` §6.7.2 |
| POST | `/dulieuso/{id}/dispose` | **LĐV** | → Đã hủy (**bắt buộc lý do**) — **chặn** khi chưa đủ 4 điều kiện §6.7.2, thiếu xác nhận phương pháp hủy của PT.ATTT hoặc thiếu biên bản hủy ← M27 (R21); bản ghi danh mục **vẫn giữ** |
| POST | `/dulieuso/{id}/cancel` | QLCL | → Hủy bản ghi (chỉ khi chưa phê duyệt, **bắt buộc lý do**) |
| GET | `/dulieuso/{id}/lineage` | Nội bộ | Truy xuất nguồn gốc: nguồn phát sinh → biến đổi (phiên bản quy tắc tính) → lần ghi nhận/hiệu chỉnh → kết quả, chứng chỉ đã dùng (R20) |
| GET | `/dulieuso/due` | QTDL, QLCL, LĐV | 5 nhóm đến hạn: rà soát · đo chất lượng · chuyển giai đoạn vòng đời · chia sẻ quá hạn chưa thu hồi · dữ liệu cá nhân quá 02 chu kỳ rà soát (kèm cờ báo cáo LĐV, R8) |
| GET | `/dulieuso/{id}/audit` | Quản trị | Nhật ký thao tác |

## Từ điển dữ liệu (`DataDictionaryVersion`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/dulieuso/{id}/dictionary` | Nội bộ / QTDL | Xem phiên bản hiệu lực; tạo phiên bản mới (Nháp) — **từ phiên bản 02 bắt buộc `change_ref`** (phiếu F30.02 ← M30, R3) |
| POST | `/dulieuso/{id}/dictionary/{ver}/activate` | QTDL (CSHDL xác nhận) | → Hiệu lực; phiên bản cũ → Đã thay thế, **giữ nguyên** để truy vết |
| GET | `/dulieuso/{id}/dictionary/{ver}/validate-rules` | Hệ thống nghiệp vụ | Trả bộ quy tắc kiểm tra hợp lệ (kiểu, miền giá trị, bắt buộc, tham chiếu dữ liệu chủ) cho module nghiệp vụ dùng khi nhập liệu (R13) |

## Dữ liệu chủ (`MasterDataSource`, `ParallelLookupFinding`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/dulieuso/master` | Nội bộ / CSHDL, QLCL | Danh mục dữ liệu chủ; đề nghị công nhận nguồn sự thật |
| POST | `/dulieuso/master/{id}/recognize` | **LĐV** | → Đã công nhận — **chặn** khi `master_type` đã có nguồn khác đang được công nhận (một loại một nguồn, R9) |
| POST | `/dulieuso/master/{id}/revoke` | **LĐV** | Thu hồi công nhận (**bắt buộc lý do**) |
| GET/POST | `/dulieuso/master/findings` | QLCL, QTDL | Ghi nhận bảng tra song song phát hiện trong kỳ — bắt buộc `diff_note`, `caused_error`; `caused_error = true` ⇒ bắt buộc `capa_ref` ← M13 (R10) |
| POST | `/dulieuso/master/findings/{id}/resolve` | QLCL | Đóng sau khi ngừng sử dụng + cập nhật phần đúng vào nguồn chính thức |
| POST | `/dulieuso/master/{id}/merge-map` | QTDL | Ghi ánh xạ hợp nhất bản ghi trùng (`old_ref` → `surviving_ref`) — **không có endpoint xóa cứng** bản ghi đã được tham chiếu (§6.4.4) |

## Đo chất lượng (`QualityMeasurement`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/dulieuso/{id}/quality` | Nội bộ / QTDL | Các kỳ đo; mở kỳ mới — hệ thống điền sẵn chiều bắt buộc theo nhóm dữ liệu (mục 4.3 DacTa) |
| PUT | `/dulieuso/{id}/quality/{period}` | QTDL | Ghi giá trị đo từng chiều — **chặn** khi `measured_by` là người nhập chính của tập trong kỳ (R16) |
| POST | `/dulieuso/{id}/quality/{period}/conclude` | QTDL (Đạt) · **QLCL** (Không đạt) | Chốt kỳ: Đạt/Không đạt — Không đạt bắt buộc `below_threshold_case` + `remediation_plan` (hạn 15 ngày làm việc); **dưới ngưỡng 02 kỳ liên tiếp ⇒ bắt buộc `capa_ref`** ← M13 (R15); dữ liệu đo/công bố dưới 100% hợp lệ–đầy đủ ⇒ hệ thống đặt cờ **dừng sử dụng** (R14); sau chốt hồ sơ **bất biến** |
| POST | `/dulieuso/{id}/quality/{period}/flag-validity` | QLCL | Ghi `validity_ref` ← M10/M11 khi có khả năng ảnh hưởng kết quả đã phát hành — kèm dừng sử dụng dữ liệu và báo cáo LĐV (R15) |

## Hiệu chỉnh dữ liệu (`DataCorrection`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/dulieuso/{id}/corrections` | Nội bộ / NTH | Đề nghị hiệu chỉnh — bắt buộc `old_value`, `new_value`, `reason`, `evidence_ref` (R11) |
| POST | `/dulieuso/corrections/{id}/assess` | QTDL, CSHDL | Xem xét ảnh hưởng: chưa dùng phát hành → Chờ phê duyệt thực hiện; **đã dùng phát hành → Chờ kết luận P10-P11** (R12) |
| POST | `/dulieuso/corrections/{id}/attach-validity` | QLCL | Ghi `validity_ref` + `validity_conclusion` từ M10/M11 — điều kiện mở khóa bước thực hiện |
| POST | `/dulieuso/corrections/{id}/perform` | QTDL | Thực hiện → Đã hiệu chỉnh — **chặn** khi `published_impact = Đã dùng phát hành` mà chưa có kết luận (R12); ghi `correction_record_id`, xác nhận giá trị cũ được giữ nguyên; nguyên nhân hệ thống/lặp lại ⇒ `capa_ref` ← M13 |
| POST | `/dulieuso/corrections/{id}/reject` | CSHDL · **LĐV** khi ảnh hưởng phát hành | → Từ chối (**bắt buộc lý do**) |

## Khai thác, chia sẻ (`DataSharingRequest`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/dulieuso/sharing` | Nội bộ / Người đề nghị | Lập phiếu — loại **Định kỳ – tự động** trả hướng dẫn thiết lập điểm tích hợp ← M37, không đi tiếp luồng phiếu (R18) |
| POST | `/dulieuso/sharing/{id}/attt-opinion` | **PT.ATTT** | Ý kiến căn cứ pháp lý + biện pháp giảm thiểu — bắt buộc với ra ngoài Viện và dữ liệu cá nhân; **không giới hạn trường/không ẩn danh khi khả thi ⇒ Không chấp nhận** (R18) |
| POST | `/dulieuso/sharing/{id}/approve` | **CSHDL** (nội bộ) · **LĐV** (ra ngoài) | → Đã phê duyệt / Từ chối (**bắt buộc lý do**) — **chặn** phê duyệt ra ngoài khi thiếu ý kiến PT.ATTT (`ETV.P34` Phụ lục I.1 điều kiện 6) |
| POST | `/dulieuso/sharing/{id}/execute` | QTDL, QTHT (**≠ người phê duyệt**) | Ghi nhận đã trích xuất, chuyển giao — đúng phạm vi, đúng kênh, kèm `log_ref` (R18); kênh cá nhân/dịch vụ chưa duyệt bị từ chối ở tầng nhập liệu (R19) |
| POST | `/dulieuso/sharing/{id}/revoke` | CSHDL | Hết hạn: yêu cầu bên nhận xóa/trả → Đã thu hồi — bắt buộc `revoke_evidence_ref` |

## Dữ liệu cho AI (`AIDataApproval`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/dulieuso/{id}/ai-approval` | Nội bộ / QTDL, CSHDL | Đề nghị dùng tập cho hệ thống AI — **từ chối tạo** khi `classification ∈ {Hạn chế, Mật}` (R22, cấm tuyệt đối); bắt buộc `aia_ref` ← M29 |
| POST | `/dulieuso/ai-approvals/{id}/approve` | **LĐV** | → Đã phê duyệt — **chặn** khi thiếu ý kiến PT.ATTT hoặc thiếu hồ sơ AIA (`ETV.P34` §6.8) |
| POST | `/dulieuso/ai-approvals/{id}/revoke` | LĐV, PT.ATTT | Thu hồi (**bắt buộc lý do**) — hệ thống AI phải ngừng truy xuất tập này |

## Đầu ra

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/dulieuso/export/{F34.01\|F34.02\|F34.03}` | QLCL, QTDL | Xuất biểu mẫu (chỉ bản ghi đã phê duyệt/đã chốt) |
| GET | `/dulieuso/report/semiannual` | QLCL, LĐV | Báo cáo tình hình dữ liệu số 06 tháng/lần — đủ 7 nội dung `ETV.P34` §6.9 |
| GET | `/dulieuso/report/m17` | QLCL, LĐV | Trích xuất cho xem xét của lãnh đạo (`ETV.P17`) |
| GET | `/dulieuso/ai-datasets` | M29, PT.ATTT | Danh sách tập đã được phê duyệt cấp cho hệ thống AI (kèm phạm vi giới hạn) |

> Mọi thao tác đổi trạng thái ghi `AuditLog`; vi phạm quy tắc → **409** kèm mã lỗi **và điều khoản
> `ETV.P34` tương ứng**. **Không có endpoint xóa** `DataSet` — bản ghi của tập đã hủy vẫn giữ để
> truy vết, mã không cấp lại. Trợ lý AI của module chỉ được gọi các endpoint đọc và soạn **dự
> thảo** (kỳ đo, từ điển, báo cáo) — mọi endpoint phê duyệt/kết luận/hủy từ chối định danh AI (R22).
