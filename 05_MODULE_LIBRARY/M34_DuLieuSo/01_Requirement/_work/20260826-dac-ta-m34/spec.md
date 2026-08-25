# M34 — Đợt đặc tả 26/08/2026 (OUTCOME + SPEC + PLAN rút gọn, Tier M)

## OUTCOME

- **WHO**: QLCL (quản trị danh mục dữ liệu số), CSHDL, QTDL, PT.ATTT, QTHT, TP, NTH, LĐV; đoàn đánh giá BoA/ISO.
- **WHAT**: dựng đủ 7 tầng đặc tả cho M34_DuLieuSo từ thủ tục `ETV.P34` (dự thảo lần BH 01, Chờ soát xét, 25/08/2026) và bộ biểu mẫu `ETV.P.F 34.01–34.03` — trước đợt này M34 chỉ là khung template 83 dòng, thiếu hẳn tầng UI và Dashboard.
- **WHY**: MP34/ETV.P34 đã có dự thảo đầy đủ nhưng module số hóa tương ứng trống — đứt chuỗi Capability → MP → Module của repo; M33 (cùng cụm Công nghệ) vừa hoàn thành đặc tả cùng khổ, M34 là bước kế tiếp theo mạch.
- **SUCCESS CRITERIA**:
  1. Đủ 8 file: DacTa, API, DataModel, Screens (mới), Outputs, Dashboard (mới), StateMachine, README — cùng khổ và cùng phong cách M33.
  2. Mọi quy tắc nghiệp vụ dẫn đúng điều khoản có thật của `ETV.P34` (đối chiếu tay trên toàn văn 525 dòng).
  3. `validate_links.py` PASS; `validate_citations.py --chan` PASS.
  4. Không copy nội dung thủ tục vào module — chỉ đặc tả cách số hóa và dẫn chiếu.

## SPEC (tóm tắt — chi tiết là chính các file đặc tả)

8 thực thể: `DataSet` (trục chính, 10 trạng thái Phụ lục II.1) · `DataDictionaryVersion` (từ điển theo phiên bản, đổi cấu trúc → M30) · `MasterDataSource` (LĐV công nhận nguồn sự thật) · `ParallelLookupFinding` (bảng tra song song §6.2.2) · `QualityMeasurement` (kỳ đo 6 chiều §6.4) · `DataCorrection` (hiệu chỉnh §6.3, gate P10/P11) · `DataSharingRequest` (khai thác, chia sẻ §6.5) · `AIDataApproval` (dữ liệu cho AI §6.8) + `AuditLog` append-only.

22 quy tắc R1–R22 ánh xạ Phụ lục I (7 điều kiện chặn cứng, 14 tình huống chặn/xử lý bắt buộc); trạng thái theo Phụ lục II; báo cáo 06 tháng đủ 7 nội dung §6.9; dashboard là bản xem liên tục của chính báo cáo đó.

## PLAN — increment

1. `_work/20260826-dac-ta-m34/spec.md` (file này)
2. `01_Requirement/DacTa.md` — nguồn sự thật, 10 mục theo khổ M33
3. `03_Database/DataModel.md` → 4. `02_API/API.md` → 5. `04_UI/Screens.md` → 6. `05_Report/Outputs.md` → 7. `06_Dashboard/Dashboard.md` → 8. `07_Workflow/StateMachine.md` → 9. `README.md`
10. `_work/20260826-dac-ta-m34/verify.md` + chạy 2 validator
11. Commit trên `feat/m34-du-lieu-so` → PR → merge → sync main

Rollback: toàn bộ là file tài liệu trong một nhánh — revert PR là đủ, không đụng dữ liệu.

## Ràng buộc kế thừa từ trạng thái thủ tục

`ETV.P34` **chưa được phê duyệt** — mọi giá trị định lượng (kỳ đo, 15 ngày làm việc, chu kỳ rà soát 12/06 tháng, thời hạn lưu) là đề xuất chờ Viện xác nhận. **BUILD mã chỉ bắt đầu sau khi thủ tục Đã phê duyệt theo MP14** — đợt này dừng ở tầng đặc tả, `08_Source/` giữ trống.
