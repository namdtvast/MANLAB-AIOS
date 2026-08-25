# M34_DuLieuSo — Bảng trạng thái và thẩm quyền thao tác

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 6, theo `ETV.P34`
> Phụ lục II (dự thảo, Chờ soát xét). Cột **Người thao tác** là người *thực hiện thao tác chuyển
> sang trạng thái đó*, không phải người chờ xử lý tại đó.

## 1. Bản ghi tập dữ liệu (`DataSet` — F34.01, Phụ lục II.1)

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang khai báo | QTDL | Đủ R1 (CSHDL + QTDL), R2 (phân loại + cờ cá nhân), R5 (căn cứ thời hạn lưu); R3 (từ điển) nếu thuộc diện → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ xác nhận mức phân loại và kiểm tra trùng lặp | QTDL | QLCL + PT.ATTT: Đạt → Chờ phê duyệt; Không đạt → Không soát xét; trùng → **gộp vào tập đã có** (R7) | Không |
| 3 | Không soát xét | Bị trả lại để sửa | QLCL, PT.ATTT (**≠ người lập**) | QTDL sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ chủ sở hữu dữ liệu | QLCL | CSHDL: Đạt (đủ R4 chỉ số chất lượng) → Hiệu lực; Không đạt → Không phê duyệt | Không |
| 5 | Không phê duyệt | Bị trả lại để sửa | CSHDL | QTDL sửa → Chờ soát xét | **Có** |
| 6 | Hiệu lực | Đang sử dụng — giai đoạn **Hoạt động** | CSHDL | Hết nhu cầu thường xuyên → Lưu trữ; rà soát định kỳ 12/06 tháng (R8) | Không |
| 7 | Lưu trữ | Còn thời hạn lưu; **hạn chế quyền ghi**, giữ khả năng đọc – truy xuất | CSHDL, QLCL | Hết thời hạn lưu → Đề nghị hủy; cần dùng lại → Hiệu lực | **Có** |
| 8 | Đề nghị hủy | Hết thời hạn lưu, chờ kiểm tra ràng buộc và phê duyệt | QLCL | Đủ 4 điều kiện `ETV.P34` §6.7.2 + LĐV phê duyệt + PT.ATTT xác nhận phương pháp hủy + biên bản hủy ← M27 → Đã hủy (R21) | **Có** |
| 9 | Đã hủy | Đã hủy theo `ETV.P27`; **bản ghi danh mục vẫn giữ** để truy vết | **LĐV** | (kết thúc) | **Có** |
| 10 | Hủy bản ghi | Khai báo sai/trùng, bỏ trước khi phê duyệt | QLCL | (kết thúc) | **Có** |

Cờ **Đến hạn rà soát**, **Chất lượng dưới ngưỡng**, **Đến hạn chuyển giai đoạn vòng đời** (và hai
cờ bổ sung của đặc tả: **Đến hạn đo chất lượng**, **Chia sẻ quá hạn chưa thu hồi**) không phải
trạng thái hồ sơ — cảnh báo tính theo dữ liệu bản ghi, không lưu cột.

## 2. Các đối tượng khác (Phụ lục II.2)

| Đối tượng | Chuỗi trạng thái | Thẩm quyền kết thúc |
|---|---|---|
| Kỳ đo chất lượng (`QualityMeasurement` — F34.02 phần A) | Mới → Đang đo → Có kết quả → Đạt / Không đạt | QTDL (Đạt) · **QLCL** (Không đạt — quyết định mở KPH ← M13 khi 02 kỳ liên tiếp, R15) |
| Hiệu chỉnh dữ liệu (`DataCorrection` — F34.02 phần B) | Mới → Đang xem xét ảnh hưởng → **Chờ kết luận P10-P11** *(khi đã dùng phát hành, R12)* → Đã hiệu chỉnh / Từ chối | CSHDL · **LĐV** (khi ảnh hưởng kết quả đã phát hành) |
| Phiếu khai thác, chia sẻ (`DataSharingRequest` — F34.03) | Nháp → Chờ ý kiến ATTT → Chờ phê duyệt → Đã phê duyệt → Đã thực hiện → Đã thu hồi / Từ chối | **CSHDL** (nội bộ) · **LĐV** (ra ngoài Viện) |
| Từ điển dữ liệu (`DataDictionaryVersion`) | Nháp → Hiệu lực → Đã thay thế | QTDL kích hoạt (CSHDL xác nhận); phiên bản 02+ cần phiếu F30.02 ← M30 (R3) |
| Nguồn dữ liệu chủ (`MasterDataSource`) | Đề nghị → Đã công nhận → Thu hồi công nhận | **LĐV** — một loại chỉ một nguồn đang công nhận (R9) |
| Bảng tra song song (`ParallelLookupFinding`) | Mới → Đang xử lý → Đã xử lý | QLCL — `caused_error` bắt buộc có KPH trước khi đóng (R10) |
| Hồ sơ dữ liệu cho AI (`AIDataApproval`) | Đề nghị → Đã phê duyệt → Thu hồi | **LĐV** phê duyệt; LĐV/PT.ATTT thu hồi (R22) |

Mọi nhánh **Từ chối**, **Không phê duyệt**, **Không soát xét**, **Không đạt**, **Đã hủy**, **Thu
hồi** bắt buộc ghi lý do (`ETV.P34` Phụ lục II.2). Kỳ đo đã chốt và hiệu chỉnh đã thực hiện là hồ
sơ **bất biến** — đính chính bằng bản ghi mới, không sửa hồ sơ cũ (R11).

> Nguyên tắc chung: hồ sơ chưa phê duyệt không dùng làm căn cứ tiếp theo; bốn thẩm quyền LĐV không
> ủy quyền — công nhận dữ liệu chủ, chia sẻ ra ngoài Viện, hủy dữ liệu, dữ liệu cho AI (`ETV.P34`
> §5.1).
