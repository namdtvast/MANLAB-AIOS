const L = require('../etv-docx-lib');
const { t, p, h1, bullet, table, headRow, row } = L;

const cfg = {
  code: 'ETV.P21',
  title: 'Công bố, Thông báo và Kiểm soát Năng lực Đo lường và Quan trắc Môi trường',
  docKind: 'THỦ TỤC',
  revision: '02',
  effectiveDate: '26/06/2026',
  headerTitle: 'Công bố, Thông báo và Kiểm soát Năng lực Đo lường và Quan trắc Môi trường',
  changeHistory: [
    ['25/05/2026', 'Ban hành theo NQ 66.18 & 66.19', '01'],
    ['26/06/2026', 'Chuẩn hóa thiết kế module P21 theo kiến trúc menu-trạng thái', '02'],
    ['28/06/2026', 'Hợp nhất phần bổ sung V4', '02'],
  ]
};

const body = [];
const P = (...a) => body.push(p(...a));
const B = (x) => body.push(bullet(x));
const H = (n, x) => body.push(h1(n, x));
const TB = (x) => body.push(x);

H(1, 'I. MỤC ĐÍCH');
P('Thủ tục này quy định trình tự, trách nhiệm và yêu cầu kỹ thuật để công bố, thông báo và kiểm soát năng lực đo lường và quan trắc môi trường nhằm đáp ứng yêu cầu Điều 7.7 của ISO/IEC 17025:2017, đảm bảo năng lực được công khai chính xác, cập nhật, kiểm soát chặt chẽ qua hệ thống ManLab, và tuân thủ các quy định pháp lý (NQ 66.18, NQ 66.19).');

H(1, 'II. PHẠM VI ÁP DỤNG');
P('Áp dụng cho toàn bộ vòng đời: Tạo mới → Lập kế hoạch → Đánh giá → Phê duyệt → Công bố/Thông báo → Kiểm soát → Điều chỉnh → Tạm dừng → Hủy bỏ → Lưu trữ');
P('đối với: Danh mục phương tiện đo (PTĐ), năng lực dịch vụ đo lường, năng lực dịch vụ quan trắc môi trường, hồ sơ P21 trên ManLab');
P('Không áp dụng cho: Đánh giá năng lực nội bộ (MP16), dữ liệu kết quả đo lường thô (MP08-MP11)');

H(1, 'III. PHÂN QUYỀN VAI TRÒ VÀ TRÁCH NHIỆM (RACI)');
const w1 = [3000, 1500, 1500, 1500, 1500];
TB(table(w1, [
  headRow(w1, ['Bước', 'NVK', 'LĐP', 'LĐV', 'PPCO']),
  row(w1, ['Đề xuất tạo mới', 'R', 'I', 'I', 'I']),
  row(w1, ['Lập danh mục PTĐ', 'R/A', 'C', 'I', 'I']),
  row(w1, ['Lập kế hoạch', 'R', 'A', 'I', 'C']),
  row(w1, ['Tiến hành đánh giá', 'R', 'C', 'I', 'I']),
  row(w1, ['Phê duyệt nội bộ', 'C', 'R/A', 'I', 'I']),
  row(w1, ['Lập bản công bố', 'R', 'A', 'I', 'C']),
  row(w1, ['Ký số, gửi', 'I', 'I', 'R/A', 'A']),
  row(w1, ['Kiểm soát', 'R/A', 'C', 'I', 'C']),
  row(w1, ['Điều chỉnh/Tạm dừng', 'R', 'I', 'A', 'C']),
  row(w1, ['Hủy bỏ', 'C', 'I', 'R/A', 'A']),
  row(w1, ['Lưu trữ', 'I', 'I', 'I', 'R/A']),
]));

H(1, 'IV. TÀI LIỆU TRÍCH DẪN');
B('Nghị quyết 66.18/2026/NQ-CP — công bố năng lực kiểm định/hiệu chuẩn/thử nghiệm');
B('Nghị quyết 66.19/2026/NQ-CP — thông báo hoạt động dịch vụ quan trắc môi trường');
B('ISO/IEC 17025:2017 §7.7 — yêu cầu công khai năng lực');
B('ISO 17034:2016 §7.7 (áp dụng khi sản xuất chất chuẩn)');
B('Luật Giao dịch điện tử 20/2023/QH15');
B('ETV.P14 — Kiểm soát tài liệu');
B('ETV.P15 — Quản lý hồ sơ');

H(1, 'V. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT');
P('Năng lực: Khả năng thực hiện các dịch vụ đo lường, thử nghiệm, hiệu chuẩn, kiểm định hoặc sản xuất mẫu chuẩn theo đúng tiêu chuẩn quốc tế/quốc gia và các quy định pháp lý hiện hành.');
P('Phương tiện đo (PTĐ): Thiết bị, máy móc, dụng cụ được ETV sử dụng để thực hiện các dịch vụ đo lường/thử nghiệm/hiệu chuẩn.');
P('Công bố năng lực: Hành động đưa ra công khai danh sách năng lực, phương tiện đo, dịch vụ của ETV thông qua bản công bố hoặc thông báo hoạt động dịch vụ.');
P('Kiểm soát năng lực: Giám sát, xác minh, cập nhật, điều chỉnh, tạm dừng hoặc hủy bỏ năng lực để đảm bảo tính chính xác, đầy đủ, hiện hành trên ManLab.');
P('Hồ sơ P21: Tập hợp dữ liệu, tài liệu chứng minh năng lực được lưu trữ trên ManLab.');

const w2 = [2200, 7155];
TB(table(w2, [
  headRow(w2, ['Ký hiệu', 'Ý nghĩa']),
  row(w2, ['PTĐ', 'Phương tiện đo']),
  row(w2, ['QTMT', 'Quan trắc môi trường']),
  row(w2, ['NVK', 'Nhân viên kỹ thuật']),
  row(w2, ['LĐP', 'Lãnh đạo phòng']),
  row(w2, ['LĐV', 'Lãnh đạo viện']),
  row(w2, ['PPCO', 'Người phụ trách công bố']),
  row(w2, ['NQ', 'Nghị quyết']),
]));

H(1, 'VI. NỘI DUNG');
H(2, '6.1 Nguyên tắc kiểm soát và số hóa');
B('Toàn bộ dữ liệu năng lực phải được lưu trữ điện tử trên ManLab');
B('Năng lực chỉ được công khai khi đạt đủ điều kiện: Đánh giá xong, Phê duyệt nội bộ, Ký số bản công bố');
B('Mọi thay đổi năng lực phải được ghi nhận, kiểm soát, và tuân thủ quy trình điều chỉnh/tạm dừng/hủy bỏ');
B('Dữ liệu PTĐ, năng lực trên ManLab là dữ liệu nguồn duy nhất');

H(2, '6.2 Trường dữ liệu bắt buộc');
B('Tên thiết bị, Nhãn hiệu, Số seri, Năm sản xuất, Năm nhập khẩu');
B('Hiệu chuẩn: Loại, Chu kỳ, Ngày cuối cùng');
B('Phạm vi đo, Độ không đảm bảo, Vị trí lưu giữ, Người phụ trách, Trạng thái');

H(2, '6.3 Lập kế hoạch đánh giá');
P('Điều kiện gate: Hồ sơ P21 đã lập phiếu đề xuất, Danh mục PTĐ đã phê duyệt, Trường dữ liệu đầy đủ, Không xung đột với hồ sơ hiện hành');

H(2, '6.4 Tiến hành đánh giá');
B('Kiểm tra hồ sơ/bên ngoài: Chứng chỉ đào tạo, bằng cấp, kinh nghiệm');
B('Kiểm tra kỹ thuật: Quy trình, tiêu chuẩn, hệ thống QA');
B('Kiểm tra đo lường: Hiệu năng PTĐ, độ không đảm bảo');
B('Kiểm tra năng lực QTMT: Nhân viên, thiết bị, địa điểm lấy mẫu');

H(2, '6.5 Phê duyệt nội bộ, lập và gửi bản công bố');
B('LĐP xác nhận kết luận đánh giá (F21.08)');
B('LĐV phê duyệt cuối cùng');
B('PPCO lập bản công bố từ dữ liệu ManLab, ký số, gửi cơ quan công nhận');

H(2, '6.6 Công khai và kiểm soát');
P('Bản công bố được đưa lên website ETV và cơ sở dữ liệu cơ quan công nhận. Kiểm soát hàng ngày: PTĐ có hiệu chuẩn? Năng lực có thay đổi?');

H(2, '6.7 Duy trì, giám sát, tạm dừng, điều chỉnh, hủy bỏ');
B('Duy trì sau công khai: Hàng tháng kiểm tra hiệu chuẩn, hàng quý xem xét kết quả, hàng năm soát xét toàn diện');
B('Tạm dừng: Khi phát hiện lỗi → Thông báo cơ quan công nhận');
B('Điều chỉnh: Thay đổi nhỏ → LĐP phê duyệt → PPCO lập bản mới');
B('Hủy bỏ: Thay đổi lớn → LĐV quyết định → PPCO gửi thông báo hủy bỏ');

H(2, '6.8 Trạng thái dữ liệu trên ManLab');
P('Hồ sơ P21: Tạo mới → Chờ duyệt → Soát xét → Chờ phê duyệt → Đã phê duyệt → Công khai → Tạm dừng → Hủy bỏ');
P('Công bố/Thông báo: Nháp → Chờ ký → Đã ký → Đã gửi → Công khai');
P('PTĐ: Tạo mới → Chờ duyệt → Đã phê duyệt → Công khai → Tạm dừng → Hủy bỏ');

H(2, '6.9 Cấu hình Menu P21 trên ManLab');
B('Danh mục PTĐ: Quản lý danh sách phương tiện đo');
B('Kế hoạch đánh giá: Lập và theo dõi kế hoạch');
B('Checklist đánh giá: Ghi nhận kết quả (F21.03)');
B('Bản công bố: Lập, xem, ký công bố/thông báo');
B('Kiểm soát: Giám sát tình trạng năng lực, PTĐ');
B('Báo cáo: Xuất báo cáo hoạt động, danh sách năng lực');
P('Phân quyền: NVK (nhập liệu), LĐP (soát xét), LĐV (phê duyệt), PPCO (lập bản công bố)');
P('Cảnh báo: PTĐ sắp hết hiệu chuẩn (30 ngày), Năng lực sắp rà soát (6 tháng), Bản công bố sắp hết hiệu lực');

H(1, 'VII. BIỂU MẪU ÁP DỤNG');
const w3 = [1500, 4355, 3600];
TB(table(w3, [
  headRow(w3, ['Mã', 'Tên', 'Mục đích']),
  row(w3, ['F21.01', 'Phiếu đề xuất', 'Đề xuất thêm năng lực mới']),
  row(w3, ['F21.02', 'Kế hoạch đánh giá', 'Lập kế hoạch kiểm tra']),
  row(w3, ['F21.03', 'Checklist đánh giá', 'Ghi nhận kết quả đánh giá']),
  row(w3, ['F21.04', 'Bản công bố năng lực', 'Công bố (Mẫu 01, NQ 66.18)']),
  row(w3, ['F21.05', 'Phiếu rà soát', 'Soát xét định kỳ']),
  row(w3, ['F21.06', 'Thông báo QTMT', 'Công bố (Mẫu 9.01, NQ 66.19)']),
  row(w3, ['F21.07', 'Báo cáo hằng năm', 'Báo cáo hoạt động QTMT']),
  row(w3, ['F21.08', 'Phiếu phê duyệt', 'Xác nhận LĐP/LĐV']),
  row(w3, ['F21.09', 'Phiếu điều chỉnh', 'Điều chỉnh, tạm dừng, hủy bỏ']),
  row(w3, ['F21.10', 'Phiếu tạm dừng', 'Quản lý tạm dừng']),
]));

H(1, 'VIII. LƯU HỒ SƠ');
P('Hồ sơ P21 được lưu trữ theo ETV.P15:');
B('Hồ sơ gốc (điện tử): Lưu trên ManLab, thời hạn Vĩnh viễn (bản hiện hành) + 5 năm (bản cũ)');
B('Bản giấy: Bản công bố/thông báo có chữ ký + con dấu gốc');
B('Thành phần bắt buộc: Phiếu đề xuất, Kế hoạch, Kết quả đánh giá, Bản công bố ký số, Phiếu phê duyệt, Danh mục PTĐ phê duyệt');
P('Tiêu chuẩn lưu giữ theo ETV.P.F 14.06');

module.exports = { cfg, body };
