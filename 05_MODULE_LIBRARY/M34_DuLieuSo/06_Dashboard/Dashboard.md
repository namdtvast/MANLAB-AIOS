# M34_DuLieuSo — Bảng điều khiển

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 7. Bộ chỉ số bám
> đúng bảy nội dung báo cáo bắt buộc của `ETV.P34` §6.9 — bảng điều khiển là bản *xem liên tục* của
> chính báo cáo 06 tháng, không phải một bộ chỉ số song song.

## 1. Nguyên tắc

- Mọi chỉ số **tính khi đọc** từ bản ghi nghiệp vụ, không có bảng tổng hợp riêng — số trên bảng
  điều khiển và số trong báo cáo `ETV.P34` §6.9 **luôn là một**.
- Bảng điều khiển hiển thị **chất lượng và tình trạng quản trị của metadata**, không hiển thị nội
  dung dữ liệu thật (R6) — không có ô nào mở ra bản ghi nghiệp vụ của module khác.
- Mỗi ô chỉ số dẫn thẳng tới danh sách bản ghi phía sau; không có con số nào không mở ra được.

## 2. Bộ chỉ số

| # | Chỉ số | Cách tính | Ngưỡng cảnh báo | Nội dung §6.9 |
|---|---|---|---|---|
| 1 | Tổng tập dữ liệu theo **nhóm · phân loại · giai đoạn vòng đời** | Đếm `DataSet` trạng thái Hiệu lực/Lưu trữ, cắt theo 3 chiều | — | (1) |
| 2 | **Tập vô chủ tồn dư** | `owner_ref` hoặc `steward_ref` trỏ người đã nghỉ/chuyển (← M03) | > 0 ⇒ **đỏ** (R1 — vi phạm chặn cứng phát sinh sau phê duyệt) | (1) |
| 3 | **Tỷ lệ đạt ngưỡng theo chiều chất lượng** | Từ kỳ đo gần nhất của từng tập: % Đạt trên 6 chiều | Chiều nào < 100% ở nhóm đo/công bố ⇒ **đỏ** (R14) | (2) |
| 4 | **Đến hạn / quá hạn đo chất lượng** | Kỳ đo gần nhất + kỳ đo của nhóm (mục 4.3 DacTa) < hôm nay | Quá hạn > 0 ⇒ vàng | (2) |
| 5 | **Tập dưới ngưỡng và tiến độ khắc phục** | Kỳ đo `Không đạt` chưa có kỳ Đạt kế tiếp; đếm ngày so `remediation_due` (15 ngày làm việc) | Quá 15 ngày ⇒ đỏ; **02 kỳ liên tiếp thiếu KPH ⇒ đỏ** (R15) | (3) |
| 6 | **Tập đang cờ dừng sử dụng** | Cờ từ R14/R15 (ảnh hưởng kết quả đã phát hành) còn hiệu lực | > 0 ⇒ **đỏ**, ưu tiên hàng đầu | (3) |
| 7 | **Hiệu chỉnh trong kỳ** | Đếm `DataCorrection` theo trạng thái; tách riêng nhánh **ảnh hưởng kết quả đã phát hành** | Chờ kết luận P10-P11 tồn > 0 ⇒ vàng (R12) | (4) |
| 8 | **Chia sẻ ra ngoài và thu hồi** | Phiếu Đã phê duyệt/Đã thực hiện; so `revoke_due` | Quá hạn chưa thu hồi > 0 ⇒ **đỏ** (R18) | (5) |
| 9 | **Bảng tra song song trong kỳ** | Đếm `ParallelLookupFinding` theo trạng thái | Mới/Đang xử lý > 0 ⇒ vàng; `caused_error` ⇒ đỏ + KPH (R10) | (6) |
| 10 | **Vi phạm kênh chia sẻ phát hiện trong kỳ** | Bản ghi vi phạm §6.5.3 (nhập từ xử lý sự cố ← M28/M13) | > 0 ⇒ **đỏ** (R19 — cấm tuyệt đối) | (6) |
| 11 | **Đến hạn rà soát / chuyển giai đoạn vòng đời** | `last_reviewed_at + review_cycle`; `active_retention` | Dữ liệu cá nhân quá 02 chu kỳ ⇒ **đỏ + báo cáo LĐV** (R8) | (7) |
| 12 | **Dữ liệu chủ: nguồn công nhận và hệ thống đồng bộ** | Đếm `MasterDataSource` Đã công nhận; điểm đồng bộ ← M37 | Loại dữ liệu chủ dùng chung chưa có nguồn công nhận ⇒ vàng (R9) | (1) |
| 13 | **Tập đang cấp cho hệ thống AI** | `AIDataApproval` Đã phê duyệt | Tập có phê duyệt nhưng AIA ← M29 hết hiệu lực ⇒ đỏ (R22) | (1) |

## 3. Phân quyền hiển thị

| Vai trò | Thấy gì |
|---|---|
| **QLCL** | Toàn bộ 13 chỉ số — người quản trị danh mục và lập báo cáo |
| **CSHDL / QTDL** | Chỉ số 1, 3, 4, 5, 6, 7, 11 giới hạn trong tập dữ liệu mình sở hữu/quản trị |
| **PT.ATTT** | Chỉ số 8, 9, 10, 13 (chia sẻ, vi phạm kênh, AI) và cắt theo mức phân loại |
| **TP** | Chỉ số 1, 4, 11 giới hạn trong tập dữ liệu của đơn vị |
| **LĐV** | Toàn bộ ở mức tổng hợp, ưu tiên các ô đang **đỏ** (dừng sử dụng, vô chủ, quá hạn thu hồi, vi phạm kênh) |

## 4. Giới hạn

Bảng điều khiển **không** kết luận thay các thủ tục khác: hiệu lực kết quả đo vẫn do M10/M11 kết
luận, sự cố ATTT vẫn do M28 kết luận, chất lượng dữ liệu do con người chốt trên kỳ đo — AI và bảng
điều khiển chỉ **hiển thị trạng thái**, không tự suy ra kết luận (R22; `ETV.P34` §5.3).
