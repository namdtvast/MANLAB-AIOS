# M27_TaiSanTT — Đặc tả API

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md). Bảng dưới là bản dẫn
> xuất; chi tiết gate xem `01_Requirement/_work/20260824-dac-ta-m27/spec.md` mục 3.

## Tài sản thông tin (`InfoAsset`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/taisantt` | Nội bộ (lọc theo mức phân loại) | Danh mục kiểm kê — lọc theo nhóm dữ liệu, phân loại, chủ sở hữu, hệ thống, trạng thái |
| POST | `/taisantt` | TP, QT hệ thống | Khai báo tài sản (Nháp) — bắt buộc `owner`; dạng điện tử bắt buộc `custodian` + `system_ref` |
| GET | `/taisantt/{id}` | Nội bộ (theo phân quyền) | Chi tiết + **quy tắc xử lý áp dụng** cho mức phân loại (quy tắc 5); mục Hạn chế/Mật ghi nhật ký lượt xem |
| PUT | `/taisantt/{id}` | TP (`owner`), QT hệ thống | Sửa (chỉ khi chưa phê duyệt) |
| POST | `/taisantt/{id}/reclassify` | TP (`owner`) + LĐV duyệt | Đổi mức phân loại — **chặn hạ mức** dữ liệu khách hàng nếu thiếu `disclosure_ref` (quy tắc 3) |
| POST | `/taisantt/{id}/submit-review` | Người lập | → Chờ soát xét |
| POST | `/taisantt/{id}/review` | Phụ trách ATTT (≠ người lập) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét (**bắt buộc lý do**) |
| POST | `/taisantt/{id}/approve` | **LĐV** | Đạt → Đang sử dụng (chặn khi thiếu `owner`, vi phạm quy tắc 3/4/7); Không đạt → Không phê duyệt (**bắt buộc lý do**) |
| POST | `/taisantt/{id}/mark-reviewed` | TP (`owner`) | Xác nhận rà soát định kỳ — cập nhật `last_reviewed_at` |
| POST | `/taisantt/{id}/restore-test` | QT hệ thống (`custodian`) | Ghi nhận kiểm tra khôi phục sao lưu + bằng chứng (F27.05) — cập nhật `last_restore_test_at` |
| POST | `/taisantt/{id}/retire` | TP (`owner`), QLCL | → Ngừng sử dụng (**bắt buộc lý do**) |
| POST | `/taisantt/{id}/ai-use` | QLCL + QT hệ thống | Bật/tắt `ai_use_allowed` — chỉ với tài sản Đang sử dụng và `classification ∈ {Công khai, Nội bộ}` (quy tắc 12, `ETV.P28` mục 5.7) |
| POST | `/taisantt/{id}/transfer-owner` | QLCL | Chuyển chủ sở hữu khi nhân sự thay đổi (← M03) |
| POST | `/taisantt/{id}/cancel` | LĐV | → Hủy bản ghi (chỉ khi chưa phê duyệt, **bắt buộc lý do**) |
| GET | `/taisantt/due-review` · `/taisantt/due-restore-test` · `/taisantt/due-disposal` | QLCL, QT hệ thống, LĐV | Ba bảng đến hạn (tính khi đọc) |
| GET | `/taisantt/personal-data` | QLCL, LĐV | Tài sản có dữ liệu cá nhân (NĐ 13/2023) |
| GET | `/taisantt/{id}/audit` | Quản trị | Nhật ký thao tác và lượt truy cập |

## Quy tắc xử lý theo mức phân loại (`ClassificationRule`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/taisantt/rules` | Nội bộ | Bảng luật đang hiệu lực (phiên bản hiện hành) |
| POST | `/taisantt/rules/draft` | QLCL, Phụ trách ATTT | Tạo phiên bản nháp mới của toàn bảng |
| POST | `/taisantt/rules/{version}/approve` | **LĐV** | Phê duyệt → phiên bản trước chuyển Hết hiệu lực; kích hoạt rà soát tài sản bị ảnh hưởng (quy tắc 2) |

## Chia sẻ dữ liệu (`DataSharing`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/taisantt/sharing` | TP, QLCL | Danh sách / lập đề nghị chia sẻ — chỉ tài sản Đang sử dụng |
| POST | `/taisantt/sharing/{id}/approve` | **LĐV** | Đã phê duyệt — **chặn nếu thiếu `disclosure_ref`** với dữ liệu khách hàng/dữ liệu cá nhân (quy tắc 6) |
| POST | `/taisantt/sharing/{id}/reject` | LĐV | → Từ chối (**bắt buộc lý do**) |
| POST | `/taisantt/sharing/{id}/revoke` | QT hệ thống, LĐV | → Đã thu hồi (hết `valid_until` hoặc theo yêu cầu, **bắt buộc lý do**) |

## Hủy dữ liệu (`DisposalRecord`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/taisantt/disposal` | QLCL, QT hệ thống | Danh sách / lập biên bản hủy — chỉ tài sản **Ngừng sử dụng** và đã hết thời hạn lưu (quy tắc 9) |
| POST | `/taisantt/disposal/{id}/approve` | **LĐV** | Phê duyệt **trước khi** thực hiện |
| POST | `/taisantt/disposal/{id}/execute` | QT hệ thống (≠ người chứng kiến) | Ghi nhận đã hủy — bắt buộc `evidence_ref` + `witness`; tài sản → Đã hủy |
| POST | `/taisantt/disposal/{id}/cancel` | LĐV | → Hủy bỏ (**bắt buộc lý do**) |

## Đầu ra

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/taisantt/export/{F27.01\|F27.02\|F27.03\|F27.04\|F27.05}` | QLCL | Xuất biểu mẫu (chỉ bản ghi đã phê duyệt/đã thực hiện) |
| GET | `/taisantt/report/m28` | QLCL, Phụ trách ATTT | Danh mục tài sản phục vụ đánh giá rủi ro ATTT |

> Mọi thao tác đổi trạng thái ghi AuditLog; vi phạm quy tắc → 409 kèm mã lỗi. Bản ghi kiểm kê
> **không có endpoint xóa** — tài sản đã hủy dữ liệu vẫn giữ bản ghi làm bằng chứng (quy tắc 9).
