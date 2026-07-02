// etv-docx-lib.js — Thư viện dựng file Word theo thể thức tài liệu HTQL của ETV.
// Dùng chung cho mọi thủ tục/quy trình. Nội dung từng tài liệu để ở file riêng (vd. docs/ETV.P14.js).
// Thể thức tuân theo ETV.P14 §8: A4, Times New Roman 12, lề trên/dưới 2cm, trái 2,5cm, phải 2cm,
// header/footer 1cm; header từ trang 2 = tên tài liệu; footer = mã số | lần BH | ngày BH | trang/tổng.

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, VerticalAlign, PageNumber, TabStopType,
} = require("docx");

const FONT = "Times New Roman";
// A4; margins (DXA, 1cm≈567): trên 1134, dưới 1134, trái 1417, phải 1134, header/footer 567
const PAGE = { size: { width: 11906, height: 16838 },
  margin: { top: 1134, right: 1134, bottom: 1134, left: 1417, header: 567, footer: 567 } };
const CONTENT_W = 11906 - 1417 - 1134; // 9355
const HEAD_FILL = "D9E2F3";

const border = { style: BorderStyle.SINGLE, size: 4, color: "808080" };
const borders = { top: border, bottom: border, left: border, right: border,
  insideHorizontal: border, insideVertical: border };
const cellMargins = { top: 40, bottom: 40, left: 80, right: 80 };

function t(text, o = {}) {
  return new TextRun({ text, font: FONT, size: o.size || 24, bold: o.bold, italics: o.italics, color: o.color });
}
function p(text, o = {}) {
  const runs = Array.isArray(text) ? text : [t(text, o)];
  return new Paragraph({ children: runs, alignment: o.align,
    spacing: { before: o.before ?? 120, after: o.after ?? 0, line: 240 },
    heading: o.heading, pageBreakBefore: o.pageBreakBefore, numbering: o.numbering, border: o.border });
}
function h1(num, text) {
  return new Paragraph({ children: [t(`${num}. ${text}`, { bold: true, size: 26 })],
    spacing: { before: 240, after: 100, line: 240 }, heading: HeadingLevel.HEADING_1 });
}
function bullet(text) {
  return new Paragraph({ children: Array.isArray(text) ? text : [t(text)],
    numbering: { reference: "b", level: 0 }, spacing: { before: 40, after: 0, line: 240 } });
}
function cell(content, o = {}) {
  const paras = (Array.isArray(content) ? content : [content]).map(c =>
    typeof c === "string"
      ? new Paragraph({ children: [t(c, { bold: o.bold, size: o.size || 22 })], alignment: o.align, spacing: { before: 20, after: 20, line: 240 } })
      : c);
  return new TableCell({ borders, margins: cellMargins, width: { size: o.w, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER, columnSpan: o.span,
    shading: o.fill ? { fill: o.fill, type: ShadingType.CLEAR } : undefined, children: paras });
}
function table(colW, rows) {
  return new Table({ width: { size: colW.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: colW, borders, rows });
}
function headRow(colW, labels) {
  return new TableRow({ tableHeader: true,
    children: labels.map((l, i) => cell(l, { w: colW[i], bold: true, fill: HEAD_FILL, align: AlignmentType.CENTER })) });
}
function row(colW, cells) { return new TableRow({ children: cells.map((c, i) => cell(c, { w: colW[i] })) }); }

// Trang bìa chuẩn: org lines, tiêu đề loại văn bản, tên văn bản, bảng mã số, bảng ký, bảng lịch sử.
function buildCover(cfg) {
  const half = [Math.round(CONTENT_W / 2), CONTENT_W - Math.round(CONTENT_W / 2)];
  const third = [Math.round(CONTENT_W / 3), Math.round(CONTENT_W / 3), CONTENT_W - 2 * Math.round(CONTENT_W / 3)];
  const out = [
    p([t("LIÊN HIỆP CÁC HỘI KHOA HỌC VÀ KỸ THUẬT VIỆT NAM", { size: 22 })], { align: AlignmentType.CENTER, before: 0 }),
    p([t("VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG", { bold: true, size: 24 })], { align: AlignmentType.CENTER, before: 40 }),
    p([t("", {})], { before: 900 }),
    p([t(cfg.docKind || "THỦ TỤC", { bold: true, size: 44 })], { align: AlignmentType.CENTER, before: 400 }),
    p([t(cfg.title.toUpperCase(), { bold: true, size: 32 })], { align: AlignmentType.CENTER, before: 200 }),
    p([t("", {})], { before: 800 }),
    table(half, [
      row(half, ["Mã số", cfg.code]),
      row(half, ["Lần ban hành", cfg.revision]),
      row(half, ["Ngày ban hành", cfg.effectiveDate || "(điền khi LĐV phê duyệt)"]),
    ]),
    p([t("", {})], { before: 200 }),
    table(third, [
      headRow(third, ["BIÊN SOẠN", "SOÁT XÉT", "PHÊ DUYỆT"]),
      new TableRow({ children: third.map(w => cell([new Paragraph({ children: [t("")], spacing: { before: 400, after: 200 } })], { w })) }),
    ]),
    new Paragraph({ children: [t("NHỮNG THAY ĐỔI ĐÃ CÓ", { bold: true, size: 24 })], alignment: AlignmentType.CENTER, spacing: { before: 300, after: 120 } }),
  ];
  const chW = [2600, 4755, 2000];
  out.push(table(chW, [headRow(chW, ["Thời gian", "Nội dung thay đổi", "Lần ban hành"]),
    ...cfg.changeHistory.map(r => row(chW, r))]));
  return out;
}

function makeHeader(title) {
  return new Header({ children: [new Paragraph({ children: [t(title, { bold: true, size: 20 })],
    alignment: AlignmentType.RIGHT, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000", space: 1 } }, spacing: { after: 60 } })] });
}
function makeFooter(code, revision, effectiveDate) {
  return new Footer({ children: [new Paragraph({
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: "000000", space: 1 } },
    tabStops: [{ type: TabStopType.CENTER, position: Math.round(CONTENT_W / 2) }, { type: TabStopType.RIGHT, position: CONTENT_W }],
    spacing: { before: 60 },
    children: [
      t(`${code}  |  Lần BH: ${revision}`, { bold: true, size: 18 }),
      new TextRun({ text: "\t", font: FONT }), t(`Ngày BH: ${effectiveDate || "…/…/…"}`, { bold: true, size: 18 }),
      new TextRun({ children: ["\tTrang ", PageNumber.CURRENT, "/", PageNumber.TOTAL_PAGES], font: FONT, bold: true, size: 18 }),
    ] })] });
}

// buildDoc(cfg, body) → docx Buffer promise. cfg: {code,title,docKind,revision,effectiveDate,changeHistory,headerTitle}
function buildDoc(cfg, body) {
  const doc = new Document({
    styles: { default: { document: { run: { font: FONT, size: 24 } } } },
    numbering: { config: [{ reference: "b", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }] },
    sections: [
      { properties: { page: PAGE }, children: buildCover(cfg) },
      { properties: { page: PAGE }, headers: { default: makeHeader(cfg.headerTitle || cfg.title) },
        footers: { default: makeFooter(cfg.code, cfg.revision, cfg.effectiveDate) }, children: body },
    ],
  });
  return Packer.toBuffer(doc);
}

module.exports = {
  FONT, PAGE, CONTENT_W, HEAD_FILL, AlignmentType, BorderStyle,
  t, p, h1, bullet, cell, table, headRow, row, buildCover, makeHeader, makeFooter, buildDoc,
  Paragraph, TextRun,
};
