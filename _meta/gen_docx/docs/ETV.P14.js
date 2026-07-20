// ETV.P14.js — Nội dung thủ tục ETV.P14 để xuất Word. Chạy: node build.js ETV.P14
// Bản nguồn kiểm soát là file .md; file này chỉ để TÁI TẠO bản .docx phát hành theo đúng thể thức.
const L = require("../etv-docx-lib");
const { t, p, h1, bullet, table, headRow, row, AlignmentType, BorderStyle, Paragraph, TextRun } = L;

const cfg = {
  code: "ETV.P 14",
  title: "Kiểm soát tài liệu, dữ liệu, thông tin",
  docKind: "THỦ TỤC",
  revision: "03",
  effectiveDate: "",
  headerTitle: "Thủ tục Kiểm soát tài liệu, dữ liệu, thông tin",
  changeHistory: [
    ["22/04/2019", "Ban hành lần thứ nhất", "01"],
    ["21/05/2020", "Áp dụng chính thức phần mềm quản lý ManLab", "01"],
    ["22/04/2023", "Ban hành lần thứ hai", "02"],
    ["06/01/2024", "Bổ sung văn bản bên ngoài (đến), văn bản nội bộ (đi)", "02"],
    ["(chờ phê duyệt)", "Thiết kế lại toàn diện: RACI, metadata AI, đồng bộ trạng thái với ManLab, dẫn chiếu pháp luật/ISO cập nhật; thu hẹp phạm vi — hợp đồng chuyển về các thủ tục chuyên trách (P03 nhân sự, P07 dịch vụ...)", "03"],
  ],
};

const body = [];
const P = (...a) => body.push(p(...a));
const B = (x) => body.push(bullet(x));
const H = (n, x) => body.push(h1(n, x));
const TB = (x) => body.push(x);

body.push(new Paragraph({ children: [t("Chú ý: ", { bold: true }), t("Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.", { italics: true })], spacing: { before: 0, after: 120, line: 240 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "2E75B6", space: 2 } } }));

H(1, "I. MỤC ĐÍCH");
P("Thủ tục này quy định nội dung, trách nhiệm và trình tự kiểm soát tài liệu, dữ liệu và thông tin nhằm đáp ứng yêu cầu Điều 8.3 của ISO/IEC 17025:2017 và Mục 8.3 của Sổ tay chất lượng, bảo đảm mọi tài liệu được nhận diện, xem xét, phê duyệt, cập nhật, phân phối, lưu trữ và kiểm soát thay đổi trong suốt vòng đời của tài liệu. Áp dụng thống nhất trong toàn Viện Kiểm định Công nghệ và Môi trường (ETV), thực hiện qua phần mềm ManLab.");

H(1, "II. PHẠM VI ÁP DỤNG");
P("Áp dụng cho toàn bộ vòng đời:");
P([t("Đề xuất → Soạn thảo → Soát xét → Phê duyệt → Ban hành → Phân phối → Sử dụng → Sửa đổi → Thu hồi → Lưu trữ → Hủy bỏ → Lưu hồ sơ", { bold: true })], { align: AlignmentType.CENTER });
P("đối với mọi loại văn bản do ETV ban hành hoặc tiếp nhận:");
{ const w = [3000, 6355]; TB(table(w, [
  headRow(w, ["Nhóm", "Loại văn bản"]),
  row(w, ["Hệ thống quản lý", "Sổ tay chất lượng, Thủ tục, Quy trình, Hướng dẫn, Biểu mẫu"]),
  row(w, ["Hành chính", "Quyết định, Công văn, Thông báo, Biên bản, Báo cáo"]),
  row(w, ["Hồ sơ & chứng chỉ", "Hồ sơ (theo ETV.P15), Giấy chứng nhận, chứng chỉ đo lường"]),
  row(w, ["Văn bản điện tử", "Mọi văn bản trên do ETV số hóa/khởi tạo điện tử qua ManLab"]),
  row(w, ["Văn bản bên ngoài", "VBQPPL, QCVN/TCVN/ĐLVN, văn bản của cơ quan công nhận/chỉ định, chứng chỉ đào tạo..."]),
])); }
P([t("Không áp dụng cho:", { bold: true })]);
B("Hợp đồng (lao động, thử việc, dịch vụ chuyên môn, giao khoán, kinh tế và phụ lục) — vòng đời hợp đồng được quy định tại các thủ tục chuyên trách: ETV.P 03 (hợp đồng lao động, thử việc), ETV.P 07 (hợp đồng dịch vụ khoa học công nghệ, kinh tế với khách hàng). P14 chỉ áp dụng khi các thủ tục đó dẫn chiếu về nguyên tắc kiểm soát văn bản chung (mã hoá, ký số, lưu trữ).");
B("Dữ liệu đo/kết quả kỹ thuật thô (thuộc MP08–MP11) và hồ sơ nhân sự chi tiết (thuộc MP03).");
P("Các thủ tục nêu trên dẫn chiếu ngược lại P14 cho phần “kiểm soát văn bản” của chúng, tránh trùng lặp.");

H(1, "IV. TÀI LIỆU TRÍCH DẪN");
P([t("Nguyên tắc: ", { italics: true }), t("chỉ dẫn chiếu, không chép lại nội dung.", { italics: true, bold: true })]);
B("Nghị định 30/2020/NĐ-CP — công tác văn thư (thể thức văn bản hành chính, Phụ lục I)");
B("Luật Giao dịch điện tử 20/2023/QH15 — chữ ký điện tử, giá trị pháp lý văn bản điện tử");
B("Văn bản hướng dẫn thi hành hiện hành về chữ ký số/dịch vụ tin cậy (thay thế dần Nghị định 130/2018/NĐ-CP)");
B("ISO 9000:2015, TCVN ISO 9001:2015 §7.5");
B("ISO/IEC 17025:2017 §8.3");
B("ISO 17034:2016 §8.3 (áp dụng khi vận hành năng lực sản xuất chất chuẩn — CAP-12)");
B("ISO/IEC 27001:2022 — kiểm soát A.5.9–A.5.18, A.5.37, A.8.13");
B("ISO/IEC 42001:2023 §7.5");
body.push(new Paragraph({ children: [t("Lưu ý phạm vi: ", { bold: true, italics: true }), t("Luật Ban hành văn bản quy phạm pháp luật điều chỉnh cơ quan nhà nước có thẩm quyền ban hành VBQPPL. ETV không ban hành VBQPPL, chỉ tiếp nhận và áp dụng (văn bản bên ngoài) — do đó luật này không phải căn cứ ban hành văn bản nội bộ của ETV.", { italics: true })], spacing: { before: 120, after: 0, line: 240 } }));

H(1, "V. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT");
P("Định nghĩa chung (“văn bản”, “chữ ký số”, “chữ ký điện tử”...) theo ISO 9000:2015 và Luật Giao dịch điện tử 20/2023/QH15 — không nhắc lại tại đây.");
{ const w = [2200, 7155]; TB(table(w, [
  headRow(w, ["Viết tắt", "Ý nghĩa"]),
  row(w, ["ETV", "Viện Kiểm định Công nghệ và Môi trường"]),
  row(w, ["LĐV", "Lãnh đạo Viện (cấp trưởng, cấp phó)"]),
  row(w, ["LĐP", "Lãnh đạo Phòng/bộ phận"]),
  row(w, ["NTH", "Người thực hiện (mọi nhân sự, không phân biệt chức vụ)"]),
  row(w, ["QLCL", "Quản lý chất lượng"]),
  row(w, ["P / F", "Thủ tục / Biểu mẫu"]),
  row(w, ["HTQL", "Hệ thống quản lý"]),
  row(w, ["ETV.QM", "Sổ tay chất lượng"]),
  row(w, ["RACI", "Responsible – Accountable – Consulted – Informed"]),
])); }

H(1, "III. PHÂN QUYỀN VAI TRÒ VÀ TRÁCH NHIỆM (RACI)");
{ const w = [3355, 1500, 1500, 1500, 1500]; TB(table(w, [
  headRow(w, ["Bước trong vòng đời", "NTH", "LĐP", "LĐV", "Văn thư/QLCL"]),
  row(w, ["Đề xuất xây dựng/soát xét văn bản", "R", "C", "I", "I"]),
  row(w, ["Thẩm định sự cần thiết", "I", "R/A", "C", "I"]),
  row(w, ["Soạn thảo/sửa đổi", "R", "I", "I", "I"]),
  row(w, ["Soát xét kỹ thuật", "C", "R/A", "I", "I"]),
  row(w, ["Phê duyệt ban hành", "I", "C", "R/A", "I"]),
  row(w, ["Cấp mã số, cập nhật danh mục", "I", "I", "I", "R/A"]),
  row(w, ["Phân phối, thu hồi bản cũ", "C", "I", "I", "R/A"]),
  row(w, ["Phổ biến áp dụng", "R", "A", "I", "I"]),
  row(w, ["Soát xét định kỳ", "R", "A", "I", "I"]),
  row(w, ["Thanh lý, chuyển “Hết hiệu lực”", "I", "R/A", "I", "C"]),
  row(w, ["Hủy bỏ khỏi hệ thống kiểm soát", "I", "C", "R/A", "I"]),
  row(w, ["Lưu trữ bản gốc", "I", "I", "I", "R/A"]),
])); }
P([t("LĐV luôn là A cuối cùng đối với Sổ tay chất lượng, Thủ tục và phương pháp thử nội bộ (không ủy quyền).", { italics: true })]);

H(1, "VI. NỘI DUNG");
H(2, "6.1 Phân loại văn bản & quy tắc mã hoá");
P([t("6.1 Phân loại", { bold: true })]);
B("Văn bản nội bộ (đi): Sổ tay chất lượng, Thủ tục, Quy trình/Hướng dẫn, Biểu mẫu, Quyết định, Công văn, Thông báo, Biên bản, Báo cáo.");
B("Văn bản bên ngoài (đến): VBQPPL, QCVN/TCVN/ĐLVN, văn bản của cơ quan công nhận/chỉ định, chứng chỉ/quyết định cấp cho ETV, chứng chỉ đào tạo.");
B("Danh mục chi tiết từng loại: ETV.P.F 14.02 (nội bộ), ETV.P.F 14.03 (bên ngoài) — không lặp lại danh sách trong thủ tục này.");
P([t("6.2 Quy tắc mã hoá (giữ nguyên nguyên tắc đã áp dụng từ 2019)", { bold: true })]);
{ const w = [3500, 2600, 3255]; TB(table(w, [
  headRow(w, ["Loại văn bản", "Ký hiệu", "Ví dụ"]),
  row(w, ["Sổ tay chất lượng", "ETV.QM", "ETV.QM"]),
  row(w, ["Thủ tục", "ETV.P xx", "ETV.P 01"]),
  row(w, ["Biểu mẫu của thủ tục", "ETV.P.F xx.yy", "ETV.P.F 14.01"]),
  row(w, ["Quy trình HC/TN/KĐ", "ETV.MCa/MTa/MVa xx", "ETV.MCW 01"]),
  row(w, ["Hướng dẫn", "ETV.Gb xx", "ETV.GI 01"]),
  row(w, ["Biểu mẫu của quy trình/hướng dẫn", "ETV.MCa.F / ETV.Gb.F xx.yy", "ETV.MTP.F 01.01"]),
])); }

H(2, "6.2 Metadata chuẩn của văn bản");
P("Mọi văn bản kiểm soát (bản điện tử) phải có đủ các trường sau trong ManLab. Đây là quy định gốc duy nhất về metadata — Skill AI, module M14 và mọi tài liệu khác chỉ được dẫn chiếu, không định nghĩa lại.");
{ const w = [2400, 1600, 1300, 4055]; TB(table(w, [
  headRow(w, ["Trường", "Kiểu", "Bắt buộc", "Mô tả"]),
  row(w, ["id", "string", "✓", "Mã số văn bản theo §6.2, duy nhất"]),
  row(w, ["title", "string", "✓", "Tên đầy đủ văn bản"]),
  row(w, ["type", "enum", "✓", "Sổ tay/Thủ tục/Quy trình/Hướng dẫn/Biểu mẫu/Quyết định/Công văn/Thông báo/Biên bản/Báo cáo/Giấy chứng nhận/Văn bản bên ngoài"]),
  row(w, ["owner", "string", "✓", "Chủ sở hữu nội dung (chức danh)"]),
  row(w, ["department", "string", "✓", "Phòng/bộ phận áp dụng"]),
  row(w, ["process", "ref MPxx", "✓", "Quy trình liên quan"]),
  row(w, ["effective_date", "date", "✓ (trừ Nháp)", "Ngày có hiệu lực"]),
  row(w, ["revision", "string", "✓", "Lần ban hành/soát xét"]),
  row(w, ["status", "enum", "✓", "Theo StateMachine M14 — không tự đặt tên khác"]),
  row(w, ["keywords", "string[]", "khuyến khích", "Từ khoá tra cứu"]),
  row(w, ["related_documents", "ref[]", "khuyến khích", "Văn bản liên quan"]),
  row(w, ["iso_clause", "string[]", "✓ (VB HTQL)", "Điều khoản ISO áp dụng"]),
  row(w, ["legal_basis", "string[]", "tuỳ", "Căn cứ pháp lý"]),
  row(w, ["ai_tags", "string[]", "tuỳ", "Nhãn phục vụ AI"]),
  row(w, ["embeddings", "vector", "hệ thống sinh", "Tìm kiếm ngữ nghĩa"]),
  row(w, ["knowledge_category", "enum", "✓", "Nội bộ/Công khai/Mật (ISO 27001 A.5.12)"]),
  row(w, ["permission", "ref", "✓", "Nhóm quyền — dẫn chiếu ETV.P.F 14.06"]),
  row(w, ["retention", "string", "✓", "Thời hạn lưu — dẫn chiếu ETV.P.F 14.06"]),
  row(w, ["digital_signature", "ref", "tuỳ", "Người ký số theo thẩm quyền (§11)"]),
  row(w, ["source", "string", "✓", "Nơi phát hành/tiếp nhận"]),
  row(w, ["supersedes", "ref", "tuỳ", "Văn bản mà bản này thay thế"]),
  row(w, ["superseded_by", "ref", "tuỳ", "Văn bản thay thế bản này"]),
])); }
P([t("Trường status dùng đúng 7 giá trị: Nháp · Chờ soát xét · Không soát xét · Chờ phê duyệt · Không phê duyệt · Đã phê duyệt · Hết hiệu lực/Hủy.", { italics: true })]);

H(2, "6.3 Thể thức trình bày");
P("Tách bạch theo đúng phạm vi điều chỉnh pháp luật:");
{ const w = [3055, 4300, 2000]; TB(table(w, [
  headRow(w, ["Nhóm văn bản", "Thể thức áp dụng", "Mẫu (template)"]),
  row(w, ["Văn bản hành chính (Quyết định, Công văn, Thông báo, Biên bản, Báo cáo)", "Bắt buộc theo Phụ lục I, Nghị định 30/2020/NĐ-CP: Quốc hiệu—Tiêu ngữ, tên cơ quan, số/ký hiệu, địa danh—ngày tháng, nơi nhận", "Skill etv-document-governance/templates/"]),
  row(w, ["Tài liệu HTQL (Sổ tay, Thủ tục, Quy trình, Hướng dẫn, Biểu mẫu)", "ETV tự quy định: Times New Roman 12, single, spacing before 6pt/after 0pt, lề trên/dưới 2cm, trái 2,5cm, phải 2cm, header/footer 1cm; header từ trang 2 = tên tài liệu; footer = mã số | lần BH | ngày BH | soát xét | trang/tổng", "templates/thu_tuc.md, quy_trinh.md, huong_dan.md"]),
])); }
P("Khi văn bản HTQL được ban hành lại, lần ban hành tăng thêm 01. Khi chỉ biểu mẫu được soát xét mà thủ tục/hướng dẫn chưa ban hành lại, footer biểu mẫu chỉ ghi ngày soát xét.");

H(2, "6.4 Dấu hiệu kiểm soát");
{ const w = [2600, 3400, 3355]; TB(table(w, [
  headRow(w, ["Hình thức", "Còn hiệu lực", "Hết hiệu lực"]),
  row(w, ["Bản giấy", "Đóng dấu “TÀI LIỆU KIỂM SOÁT” (hoặc dấu pháp nhân thay thế)", "Đóng dấu “TÀI LIỆU KHÔNG KIỂM SOÁT” hoặc cắt góc phải, lưu theo quy định hủy"]),
  row(w, ["Bản điện tử (ManLab)", "status = Đã phê duyệt (đã công bố)", "status = Hết hiệu lực/Hủy"]),
])); }
P("Bản giấy có dấu “TÀI LIỆU KIỂM SOÁT” khi được photo cho bất kỳ mục đích nào đều tự động trở thành văn bản không kiểm soát. Cung cấp văn bản cho bên liên quan bắt buộc có sự đồng ý của cấp phê duyệt.");

H(2, "6.5 Vòng đời văn bản — quy trình thực hiện");
P([t("10.1 Văn bản nội bộ (đi)", { bold: true })]);
{ const w = [1300, 5255, 1400, 1400]; TB(table(w, [
  headRow(w, ["Bước", "Nội dung", "Trách nhiệm", "Biểu mẫu"]),
  row(w, ["1. Đề xuất", "Lập phiếu đề nghị xây dựng mới/soát xét", "NTH → LĐP", "ETV.P.F 14.01"]),
  row(w, ["2. Thẩm định", "LĐP xác định mức độ cần thiết; phân công người soạn thảo, soát xét, thời hạn", "LĐP", "ETV.P.F 14.01"]),
  row(w, ["3. Soạn thảo", "Biên soạn/sửa đổi theo phân công (status: Nháp)", "NTH", "—"]),
  row(w, ["4. Soát xét", "Chuyển Chờ soát xét; đạt → Chờ phê duyệt, không đạt → Không soát xét (bắt buộc lý do)", "LĐP", "Bản góp ý"]),
  row(w, ["5. Phê duyệt", "LĐV xem xét → Đã phê duyệt hoặc Không phê duyệt (bắt buộc lý do)", "LĐV", "ETV.P.F 14.01"]),
  row(w, ["6. Ban hành", "Cấp mã số, lưu bản gốc, cập nhật danh mục", "LĐP/QLCL", "ETV.P.F 14.02"]),
  row(w, ["7. Phân phối", "Photo, đóng dấu kiểm soát, giao nhận, thu hồi bản cũ", "NTH/QLCL", "ETV.P.F 14.04"]),
  row(w, ["8. Công bố", "Phổ biến áp dụng cho nhân sự liên quan", "NTH", "Biên bản phổ biến"]),
  row(w, ["9. Lưu bản gốc", "Bản in + bản điện tử", "QLCL", "Cặp công văn đi"]),
  row(w, ["10. Soát xét định kỳ", "Tối đa 36 tháng hoặc khi có thay đổi pháp luật/ISO/tổ chức", "LĐP", "—"]),
  row(w, ["11. Thanh lý", "Chuyển Đã phê duyệt → Hết hiệu lực; nếu giữ tham khảo, đóng dấu “TÀI LIỆU KHÔNG KIỂM SOÁT”", "NTH/QLCL", "ETV.P.F 14.05"]),
])); }
P([t("10.2 Văn bản bên ngoài (đến)", { bold: true })]);
{ const w = [1300, 5255, 1400, 1400]; TB(table(w, [
  headRow(w, ["Bước", "Nội dung", "Trách nhiệm", "Biểu mẫu"]),
  row(w, ["1. Tiếp nhận", "Đóng dấu đến, ghi sổ ngày giờ (NĐ 30/2020)", "Văn thư", "—"]),
  row(w, ["2. Xử lý", "Khởi tạo bản ghi, cập nhật metadata (§7), gửi soát xét LĐP, gửi phê duyệt LĐV (nếu cần)", "NTH/LĐP/LĐV", "ETV.P.F 14.03"]),
  row(w, ["3. Lưu bản gốc", "Bản in + bản điện tử", "NTH", "Cặp công văn đến"]),
  row(w, ["4. Công bố", "Phổ biến áp dụng", "NTH/LĐP/LĐV", "—"]),
  row(w, ["5. Hết hiệu lực", "Chuyển Hết hiệu lực; đóng dấu “TÀI LIỆU KHÔNG KIỂM SOÁT” nếu giữ tham khảo", "NTH", "ETV.P.F 14.05"]),
])); }
P([t("10.3 Văn bản điện tử trên ManLab", { bold: true })]);
P("Quản lý theo state machine chuẩn tại M14_TaiLieu/07_Workflow/StateMachine.md (không định nghĩa lại tại đây). Phân quyền theo tài khoản: xem ETV.P.F 14.06. Lưu trữ/sao lưu: cloud + NAS theo tài khoản được Ban Lãnh đạo phê duyệt.");

H(2, "6.6 Chữ ký số & chữ ký điện tử");
P("Áp dụng theo Luật Giao dịch điện tử 20/2023/QH15 và văn bản hướng dẫn hiện hành (§3) — không chép lại điều khoản luật tại đây. Nguyên tắc nội bộ:");
B("Ưu tiên phát hành văn bản điện tử có chữ ký số; chữ ký tay áp dụng khi chưa đủ điều kiện hạ tầng.");
B("Viện trưởng giao văn thư quản lý khóa bí mật con dấu tổ chức; mỗi cá nhân tự chịu trách nhiệm bảo mật khóa bí mật cá nhân, không chuyển giao khi chưa có ủy quyền bằng văn bản.");
B("Chỉ ký số vào văn bản sau khi đã có đủ chữ ký/phê duyệt theo đúng luồng RACI (§5).");
B("Thẩm quyền ký số theo từng loại văn bản cụ thể: xem ETV.P.F 14.06.");

H(2, "6.7 Phân quyền hệ thống");
P("Phân quyền truy cập theo menu và theo hành động cho từng nhóm tài khoản (Super Admin, LĐV, LĐP, Nhân viên, Khách hàng, Cộng tác viên, Viewer) được quy định đầy đủ và duy nhất tại ETV.P.F 14.06 — P14 không lặp lại bảng phân quyền, chỉ dẫn chiếu. Mọi thay đổi phân quyền phải cập nhật ETV.P.F 14.06 trước, sau đó mới cấu hình trên ManLab.");

H(2, "6.8 Vai trò của AI trong kiểm soát tài liệu");
P("ETV sử dụng Claude Skill etv-document-governance để hỗ trợ: nhận diện loại văn bản, gợi ý mã số, kiểm tra thể thức, kiểm tra căn cứ pháp lý/ISO, phát hiện xung đột, nhắc soát xét định kỳ, khởi tạo metadata.");
P([t("Nguyên tắc bất biến: ", { bold: true }), t("AI chỉ gợi ý và cảnh báo; không tự quyết định soát xét, phê duyệt, ký số, thu hồi hay hủy văn bản. Mọi triển khai agent AI liên quan phải có hồ sơ đánh giá tác động (AIA) theo MP29_AI, đúng ISO/IEC 42001 §7.5.")]);

H(2, "6.9 Soát xét định kỳ & xử lý xung đột");
B("Toàn bộ văn bản HTQL được soát xét định kỳ tối đa 36 tháng/lần, độc lập với soát xét phát sinh theo nhu cầu.");
B("Khi phát hiện hai văn bản trùng phạm vi hoặc mâu thuẫn, LĐP lập phiếu soát xét hợp nhất trong vòng 15 ngày làm việc.");
B("Khi văn bản bên ngoài dẫn chiếu được thay thế, LĐP rà soát và cập nhật legal_basis/iso_clause của văn bản nội bộ liên quan trong vòng 30 ngày.");

H(2, "6.10 Thanh lý, hủy bỏ, lưu trữ");
B("Thanh lý = chuyển trạng thái sang Hết hiệu lực (văn bản vẫn được lưu, có thể giữ tham khảo với dấu “TÀI LIỆU KHÔNG KIỂM SOÁT”).");
B("Hủy bỏ = loại văn bản khỏi phạm vi kiểm soát; chỉ LĐV quyết định, bắt buộc nêu lý do (ETV.P.F 14.05).");
B("Lưu trữ: bản gốc (in + điện tử) theo ETV.P 15; thời hạn theo ETV.P.F 14.06.");

H(1, "VII. BIỂU MẪU ÁP DỤNG");
{ const w = [2600, 6755]; TB(table(w, [
  headRow(w, ["Mã", "Tên"]),
  row(w, ["ETV.P.F 14.01", "Phiếu đề nghị soát xét, sửa đổi, ban hành văn bản"]),
  row(w, ["ETV.P.F 14.02", "Danh mục văn bản nội bộ"]),
  row(w, ["ETV.P.F 14.03", "Danh mục văn bản bên ngoài"]),
  row(w, ["ETV.P.F 14.04", "Phiếu giao nhận văn bản"]),
  row(w, ["ETV.P.F 14.05", "Phiếu đề nghị thanh lý/hủy văn bản, hồ sơ"]),
  row(w, ["ETV.P.F 14.06", "Danh mục phân quyền tài khoản & thời hạn lưu"]),
])); }

H(1, "VIII. LƯU HỒ SƠ");
P("Toàn bộ hồ sơ phát sinh từ thủ tục này được ghi chép đầy đủ và lưu trữ theo ETV.P 15 — Thủ tục kiểm soát hồ sơ.");

module.exports = { cfg, body };
