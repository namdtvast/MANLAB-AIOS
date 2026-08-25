# M34_DuLieuSo — Màn hình

> Nguồn sự thật nghiệp vụ: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md). Thủ tục
> nguồn: `ETV.P34` (dự thảo, Chờ soát xét). Nền tảng đích: `09_ENGINEERING/aios-platform` (Next.js
> App Router + Prisma + server action), khuôn M16/M17/M25 — **chưa xây**.

## 1. Danh sách màn hình

| # | Màn hình | Đường dẫn dự kiến | Vai trò | Nội dung chính |
|---|---|---|---|---|
| 1 | Danh mục dữ liệu số | `/modules/M34` | Nội bộ | Bảng `DataSet`: mã, tên, nhóm, CSHDL/QTDL, phân loại, cờ dữ liệu cá nhân, giai đoạn vòng đời, trạng thái + cờ cảnh báo |
| 2 | Chi tiết tập dữ liệu | `/modules/M34/dataset/[id]` | Nội bộ | Tám nhóm trường F34.01 · tab Từ điển · tab Chất lượng · tab Hiệu chỉnh · tab Chia sẻ · tab Truy xuất nguồn gốc · tab AI |
| 3 | Từ điển dữ liệu | `/modules/M34/dataset/[id]/dictionary` | QTDL, Nội bộ | Phiên bản hiệu lực + lịch sử; tạo phiên bản mới gắn phiếu F30.02 (R3); bảng 8 cột theo F34.01 phần II |
| 4 | Dữ liệu chủ và nguồn sự thật | `/modules/M34/master-data` | CSHDL, QLCL, LĐV | Danh mục loại dữ liệu chủ đã/chờ công nhận; hàng chờ LĐV; **bảng tra song song phát hiện trong kỳ** (R10) |
| 5 | Đo chất lượng | `/modules/M34/quality` | QTDL, QLCL | Kỳ đo theo tập: sáu chiều, ngưỡng, giá trị, xu hướng; hàng chờ chốt; tập dưới ngưỡng và tiến độ khắc phục 15 ngày (R15) |
| 6 | Hiệu chỉnh dữ liệu | `/modules/M34/corrections` | NTH (đề nghị) · QTDL, CSHDL (xử lý) | Hàng chờ xem xét ảnh hưởng; hàng **Chờ kết luận P10-P11** (R12); hồ sơ đã hiệu chỉnh với giá trị trước/sau |
| 7 | Khai thác và chia sẻ | `/modules/M34/sharing` | Người đề nghị · PT.ATTT · CSHDL · LĐV | Phiếu theo loại; hàng chờ ý kiến ATTT, chờ phê duyệt; bảng theo dõi **thời hạn sử dụng và thu hồi** (R18) |
| 8 | Dữ liệu cho AI | `/modules/M34/ai-data` | QTDL, PT.ATTT, LĐV | Hồ sơ `AIDataApproval`: mục đích, biện pháp giảm thiểu, AIA ← M29; danh sách tập đang cấp cho hệ thống AI (R22) |
| 9 | Bảng đến hạn | `/modules/M34/due` | QTDL, QLCL, LĐV | 5 tab: rà soát · đo chất lượng · chuyển giai đoạn vòng đời · chia sẻ quá hạn chưa thu hồi · dữ liệu cá nhân quá chu kỳ (R8) |
| 10 | Báo cáo 06 tháng | `/modules/M34/report` | QLCL, LĐV | Bảy nội dung bắt buộc của `ETV.P34` §6.9 |

## 2. Quy ước hiển thị

- Nhãn tiếng Việt tập trung ở `labels.ts`; enum lưu tiếng Anh trong DB theo khuôn M16/M17.
- **Không hiển thị nội dung dữ liệu thật ở bất kỳ đâu** — module chỉ hiển thị metadata; ô nhập mô
  tả có cảnh báo trực tiếp khi chuỗi khớp mẫu dữ liệu cá nhân (R6).
- Tập `has_personal_data = true` có nhãn nổi bật kèm chu kỳ rà soát 06 tháng và văn bản pháp luật
  áp dụng (R2, R8).
- Tập `classification ∈ {Hạn chế, Mật}` hiển thị nhãn cấm dùng cho AI ngay trên chi tiết (R22).
- Cờ cảnh báo **tính khi đọc**, hiển thị dạng chip trên hàng, đồng thời gom thành các tab của màn
  hình 9.
- Nút thao tác bị chặn nêu **lý do chặn dẫn đúng điều khoản** (vd "Chặn: hiệu chỉnh dữ liệu đã dùng
  phát hành khi chưa có kết luận — `ETV.P34` §6.3.2 bước 3"), không hiện thông báo chung chung.
- Kỳ đo và hồ sơ hiệu chỉnh sau khi chốt hiển thị ở chế độ **chỉ đọc có niêm phong** (băng "Đã
  chốt" + thời điểm), làm rõ tính bất biến của hồ sơ.

## 3. Tiêu chí chấp nhận (AC)

| # | Tiêu chí | Cách verify |
|---|---|---|
| AC1 | Tạo `DataSet` thiếu `owner_ref` hoặc `steward_ref` ⇒ **không lưu được** (R1) | Thao tác UI 2 chiều |
| AC2 | Thiếu `classification` / `has_personal_data` / `retention_basis` ⇒ không lưu được (R2, R5) | Thao tác UI 2 chiều |
| AC3 | Tập thuộc nhóm đo – kỹ thuật/chủ/công bố chưa có từ điển Hiệu lực ⇒ chặn gửi soát xét (R3) | Thao tác UI 2 chiều |
| AC4 | Tạo từ điển phiên bản 02 mà không có `change_ref` ⇒ bị chặn (R3) | Thao tác UI 2 chiều |
| AC5 | Phê duyệt khi `quality_metrics` rỗng ⇒ bị chặn (R4) | Thao tác UI 2 chiều |
| AC6 | Soát xét viên trùng người lập ⇒ bị chặn (mục 3 DacTa) | Đăng nhập 2 vai |
| AC7 | Công nhận nguồn thứ hai cho cùng `master_type` đang có nguồn hiệu lực ⇒ bị chặn (R9) | Seed 1 nguồn đã công nhận |
| AC8 | Ghi nhận bảng tra song song `caused_error = true` mà thiếu `capa_ref` ⇒ không đóng được (R10) | Thao tác UI 2 chiều |
| AC9 | Kỳ đo có `measured_by` = người nhập chính của tập ⇒ bị chặn (R16) | Seed phân công nhập liệu |
| AC10 | Kỳ đo Không đạt thiếu `below_threshold_case` hoặc `remediation_plan` ⇒ không chốt được (R15) | Thao tác UI 2 chiều |
| AC11 | Dưới ngưỡng kỳ thứ 2 liên tiếp mà thiếu `capa_ref` ⇒ không chốt được (R15) | Seed 1 kỳ Không đạt trước đó |
| AC12 | Dữ liệu nhóm đo/công bố dưới 100% hợp lệ–đầy đủ ⇒ chốt kỳ tự đặt cờ dừng sử dụng, hiện trên chi tiết tập (R14) | Seed giá trị 99% |
| AC13 | Kỳ đo đã chốt không sửa được nữa (bất biến) | Thử PUT sau chốt |
| AC14 | Hiệu chỉnh `published_impact = Đã dùng phát hành` chưa có `validity_ref` ⇒ nút thực hiện bị chặn (R12) | Thao tác UI 2 chiều |
| AC15 | Hiệu chỉnh hiển thị đủ giá trị trước/sau, giá trị cũ không biến mất khỏi hồ sơ (R11) | Xem hồ sơ sau thực hiện |
| AC16 | Phiếu chia sẻ ra ngoài thiếu ý kiến PT.ATTT ⇒ LĐV không phê duyệt được (R18) | Thao tác UI 2 chiều |
| AC17 | Người thực hiện trích xuất = người phê duyệt ⇒ bị chặn (§5.3) | Đăng nhập 2 vai |
| AC18 | Phiếu quá `revoke_due` chưa thu hồi ⇒ hiện ở tab chia sẻ quá hạn; thu hồi bắt buộc `revoke_evidence_ref` (R18) | Seed 1 phiếu quá hạn |
| AC19 | Tạo `AIDataApproval` cho tập Hạn chế/Mật ⇒ **bị từ chối ngay** (R22) | Thử 2 mức phân loại |
| AC20 | Phê duyệt AI thiếu `aia_ref` hoặc thiếu ý kiến PT.ATTT ⇒ bị chặn (R22) | Thao tác UI 2 chiều |
| AC21 | Đề nghị hủy khi còn ≥ 1 trong 4 ràng buộc §6.7.2 ⇒ màn hình nêu rõ ràng buộc chưa thỏa, nút hủy bị chặn (R21) | Seed 4 trường hợp |
| AC22 | Hủy thiếu xác nhận phương pháp hủy của PT.ATTT ⇒ bị chặn; sau hủy bản ghi vẫn xem được ở chế độ chỉ đọc (R21) | Thao tác UI 2 chiều |
| AC23 | Tập chứa dữ liệu cá nhân quá 06 tháng chưa rà soát ⇒ chip cảnh báo; quá 02 chu kỳ ⇒ xuất hiện ở tab báo cáo LĐV (R8) | Seed 2 mốc thời gian |
| AC24 | Không có bất kỳ đường nào xóa bản ghi `DataSet` | Rà soát server action + thử gọi |
| AC25 | Mọi chuyển trạng thái ghi `AuditLog` đủ ai/khi nào/trước→sau/lý do | Xem nhật ký sau chuỗi thao tác |

## 4. NFR

- **Ghi vết**: `AuditLog` append-only; nhật ký thao tác không sửa được, lưu theo `ETV.P28` mục
  5.7.5 (`ETV.P34` §6.6).
- **Không chứa dữ liệu thật**: schema và UI chỉ làm việc với metadata; kiểm tra mẫu trên trường tự
  do trước khi lưu (R6).
- **Không xóa**: tầng dữ liệu không có thao tác xóa `DataSet`; dữ liệu chủ trùng hợp nhất qua bảng
  ánh xạ, không xóa cứng (R15).
- **Phân quyền**: kiểm tra vai trò ở server action; CSHDL/QTDL là vai trò *theo tập dữ liệu* (phân
  công trên bản ghi), QLCL/PT.ATTT/LĐV là vai trò toàn cục; kiểm tra chéo bốn cặp tách vai trò của
  `ETV.P34` §5.3.
- **Thang phân loại dùng chung**: import enum `Classification` từ M27, không khai báo lại.
- **Truy vết chéo**: FK thật với module đã ACTIVE; tham chiếu mềm + cảnh báo với module chưa xây
  (M27, M30, M35, M37, M29) — **không nới lỏng điều kiện chặn cứng** vì module đích chưa có.
- **Ngôn ngữ**: nhãn và thông báo tiếng Việt; thông báo chặn dẫn điều khoản `ETV.P34`.
- **Hiệu năng**: danh mục phân trang ≥ 50 dòng/trang; cờ đến hạn tính khi đọc — cần chỉ mục theo
  [`../03_Database/DataModel.md`](../03_Database/DataModel.md).
