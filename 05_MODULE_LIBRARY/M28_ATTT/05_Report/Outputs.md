# M28_ATTT — Đầu ra

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 7 và 8.

## Biểu mẫu module sinh ra

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| **F28.01** — Hồ sơ đánh giá và xử lý rủi ro ATTT | PDF/Excel | Bảng rủi ro (C-I-A, K, T, R) + Kế hoạch xử lý rủi ro + bảng chấp nhận rủi ro tồn dư |
| **F28.02** — Tuyên bố áp dụng (SoA) | PDF/Excel | Phạm vi ISMS 6 chiều + 93 dòng kiểm soát + bảng tổng hợp tỷ lệ thực hiện |
| **F28.03** — Phiếu sự cố an toàn thông tin | PDF | Ghi nhận, phân mức, khống chế, nghĩa vụ thông báo, khắc phục, kết luận, đóng |
| **F28.04** — Phiếu yêu cầu cấp/thay đổi/thu hồi quyền truy cập | PDF | Kèm phần thu hồi khi chấm dứt công việc và bảng rà soát định kỳ |

Bản xuất phải khớp bố cục và danh mục chuẩn của biểu mẫu gốc tại
`06_SHARED_RESOURCES/01_Forms/ETV.P.F28.0{1..4}_*.md` (ban hành lần 01, ngày 24/08/2026).

## Báo cáo và màn hình theo dõi

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| Báo cáo tình trạng ISMS | Dữ liệu/PDF | Sáu nhóm chỉ số: rủi ro · SoA · truy cập · sự cố · sao lưu (← M27) · nhận thức (← M03). Tối thiểu 06 tháng/lần; **đầu vào bắt buộc** của M17 |
| Bảng rủi ro và SoA đến hạn rà soát | Màn hình | Tính khi đọc (R13); quá hạn cảnh báo LĐV |
| Bảng hạng mục RTP quá hạn | Màn hình | Cảnh báo `risk_owner`; quá 02 lần cảnh báo báo LĐV |
| Bảng kiểm soát "Áp dụng" thiếu bằng chứng | Màn hình | Nguồn tự mở KPH sang M13 (R9) |
| Bảng quyền truy cập quá `valid_until` | Màn hình | Cảnh báo PT.ATTT |
| Bảng rủi ro là đầu vào liên tục hoạt động | Màn hình/dữ liệu | Rủi ro có `impact_a ≥ 4` → đẩy sang M31 (R12) |

## Đầu ra sang module khác

M01 (rủi ro mức Cao/Rất cao) · M31 (đầu vào BCP) · M13 (KPH từ sự cố và từ kiểm soát thiếu bằng
chứng) · M26 (bài học kinh nghiệm sau sự cố mức Cao trở lên) · M03 (chặn hoàn tất thôi việc khi chưa
thu hồi quyền) · M10/M11 (khi sự cố ảnh hưởng hiệu lực kết quả đo/chứng chỉ) · M17 (báo cáo ISMS) ·
M24 (chỉ tiêu ATTT hằng năm).

## Hỗ trợ AI (← M29, có kiểm soát)

Được phép: gợi ý rủi ro tương tự đã có trong hồ sơ · nhắc kiểm soát SoA chưa có bằng chứng · đề xuất
phân mức sự cố theo tiêu chí đã quy định · tóm tắt diễn biến sự cố cho báo cáo.

**Không được phép:** chấm điểm rủi ro chính thức · phê duyệt SoA · phân mức hoặc đóng sự cố · thay
đổi quyền truy cập · kết luận về hiệu lực kết quả đo. Dữ liệu mức **Hạn chế/Mật** không bao giờ được
đưa vào chỉ mục AI (R11).
