// Nhập danh sách nhân sự đang vận hành trên ManLab vào M03 của nền tảng AIOS.
//
// Vì sao cần script riêng: đường tạo hồ sơ nhân sự DUY NHẤT trên nền tảng là
// fulfillRecruitmentPlan() — sinh hồ sơ từ một đề xuất tuyển dụng đã được LĐV duyệt. 145 người
// đang làm việc thật thì không có đề xuất tuyển dụng nào cả; bịa ra 145 đề xuất để lách vào
// đường đó vừa sai lịch sử vừa làm bẩn số liệu tuyển dụng. Di trú là việc một lần, đi cửa riêng,
// và phải để lại báo cáo đọc được — đó là script này, không phải một câu SQL gõ tay.
//
// Nguồn: bản kết xuất view vw_tb_qlManLab_NhanSu (.xlsx, 53 cột). File KHÔNG được đưa vào repo —
// nó chứa CCCD, mã số thuế, mã BHXH, số tài khoản, lương, chỗ ở (Nghị định 13/2023/NĐ-CP, repo
// công khai). Script nhận đường dẫn tới file nằm ngoài repo qua --file.
//
// Chỉ 10/53 cột được nhập. 43 cột nhân thân còn lại CỐ Ý bỏ — xem DataModel.md §5: module vận
// hành theo thủ tục ISO cần biết người này thuộc phòng nào, ký hợp đồng loại nào, được ủy quyền
// lĩnh vực nào; không cần số CCCD để làm việc đó. Đừng "bổ sung cho đủ" ở lần sửa sau.
//
// Phạm vi đợt này: M03Employee + M03EmployeeField + M03InspectorCard. Hợp đồng lao động để đợt
// sau, vì M03ContractType còn thiếu giá trị "có xác định thời hạn <36 tháng" (DataModel.md K7).
//
// Cách chạy:
//
//   # 1. Xem trước — KHÔNG ghi gì vào database (mặc định):
//   npx tsx scripts/nhap-nhan-su-manlab.ts --file=~/Downloads/Danh_sach_nhan_su_view_11.xlsx
//
//   # 2. Ghi thật:
//   npx tsx scripts/nhap-nhan-su-manlab.ts --file=... --yes
//
// Chạy lại nhiều lần không nhân bản: khoá đối chiếu là legacyCode (mã ManLab), thao tác là upsert.
import "dotenv/config";
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import JSZip from "jszip";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import type {
  M03EmployeeStatus,
  M03EmployeeRecordStatus,
  M03EmploymentType,
  M03InspectionField,
} from "../src/generated/prisma/enums";
import { INSPECTION_FIELD_LABEL } from "../src/lib/m03/labels";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

// ---------------------------------------------------------------- đọc .xlsx

/** Giải mã thực thể XML trong chuỗi lấy từ .xlsx. */
function giaiMaXml(s: string): string {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

/** "A" → 0, "B" → 1, ... "BA" → 52. */
function chiSoCot(ref: string): number {
  let n = 0;
  for (const ch of ref) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

/**
 * Đọc sheet đầu tiên của .xlsx thành mảng ô dạng chuỗi thô.
 *
 * Tự bóc zip + đọc XML thay vì thêm một thư viện đọc bảng tính: dự án đã có jszip (dùng cho
 * /api/m03/export), và script này chỉ cần đọc một view phẳng — không công thức, không nhiều sheet.
 */
async function docBangTinh(duongDan: string): Promise<string[][]> {
  const zip = await JSZip.loadAsync(await readFile(duongDan));

  const sharedXml = (await zip.file("xl/sharedStrings.xml")?.async("string")) ?? "";
  const chuoiChung = [...sharedXml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) =>
    [...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => giaiMaXml(t[1])).join(""),
  );

  const tenSheet = Object.keys(zip.files)
    .filter((f) => /^xl\/worksheets\/sheet\d+\.xml$/.test(f))
    .sort()[0];
  if (!tenSheet) throw new Error("Không tìm thấy sheet nào trong file .xlsx");
  const sheetXml = await zip.file(tenSheet)!.async("string");

  const bang: string[][] = [];
  for (const dong of sheetXml.matchAll(/<row[^>]*\br="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)) {
    const cacO: string[] = [];
    for (const o of dong[2].matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const thuocTinh = o[1];
      const noiDung = o[2] ?? "";
      const ref = /r="([A-Z]+)\d+"/.exec(thuocTinh)?.[1];
      if (!ref) continue;
      const kieu = /t="([^"]+)"/.exec(thuocTinh)?.[1];
      const v = /<v>([\s\S]*?)<\/v>/.exec(noiDung)?.[1];

      let giaTri = "";
      if (kieu === "s") giaTri = chuoiChung[Number(v)] ?? "";
      else if (kieu === "inlineStr")
        giaTri = [...noiDung.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => giaiMaXml(t[1])).join("");
      else if (v !== undefined) giaTri = giaiMaXml(v);

      cacO[chiSoCot(ref)] = giaTri;
    }
    bang[Number(dong[1]) - 1] = cacO;
  }
  return bang;
}

/**
 * Ô ngày trong .xlsx là số serial (số ngày kể từ 30/12/1899) — bản thân con số không nói nó là
 * ngày, chỉ định dạng ô mới nói. Script không đọc định dạng: cột nào là ngày đã biết trước, nên
 * cứ số thì hiểu là serial, cứ chuỗi thì thử parse ISO.
 */
function doiNgay(o: string | undefined): Date | null {
  const s = (o ?? "").trim();
  if (!s) return null;
  if (/^\d+(\.\d+)?$/.test(s)) {
    const ms = Date.UTC(1899, 11, 30) + Number(s) * 86_400_000;
    const d = new Date(ms);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

// ------------------------------------------------------------ quy tắc ánh xạ

const COT = {
  ma: "Mã nhân sự",
  hoTen: "Họ và tên (người lao động)",
  chucVu: "Chức vụ (vị trí)",
  boPhan: "Bộ phận (Phòng/ Ban)",
  trangThai: "Trạng thái (NS)",
  loaiHopDong: "Loại hợp đồng",
  nhomNhanSu: "Nhóm nhân sự",
  ngayBatDau: "Ngày bắt đầu (khởi tạo NS)",
  ngayKhoiTao: "Ngày khởi tạo (NS)",
  linhVuc: "Lĩnh vực kiểm định (M4-TT24)",
  soThe: "Số thẻ KĐV",
  soQD: "Số QĐ cấp thẻ KĐV",
  ngayQD: "Ngày QĐ cấp thẻ KĐV",
  ngayHetHan: "Ngày hết hạn thẻ KĐV",
} as const;

/**
 * Bản ghi trong danh sách nhân sự nhưng KHÔNG phải người lao động (DataModel.md K9): tài khoản
 * hệ thống, một pháp nhân, các bản ghi thử nghiệm, và hai bản ghi chỉ có một từ trong họ tên nên
 * chưa đủ định danh. Đối chiếu theo cặp (họ tên, mã) để không loại nhầm người trùng tên.
 * Danh sách này là quyết định của Văn phòng ngày 31/08/2026, không phải suy đoán của script.
 */
const KHONG_PHAI_NGUOI: { hoTen: string; ma: string; lyDo: string }[] = [
  { hoTen: "ETV", ma: "", lyDo: "tài khoản hệ thống" },
  { hoTen: "Admin", ma: "CTV110", lyDo: "tài khoản hệ thống" },
  { hoTen: "Viện Kiểm định Công nghệ và Môi trường", ma: "CTV110", lyDo: "pháp nhân, không phải người lao động" },
  { hoTen: "nhân sự gsot test", ma: "CTV111", lyDo: "bản ghi thử nghiệm" },
  { hoTen: "Nam Test", ma: "NCC01", lyDo: "bản ghi thử nghiệm" },
  { hoTen: "Nam Test 5", ma: "P. CGCN16", lyDo: "bản ghi thử nghiệm" },
  { hoTen: "Nam test", ma: "CTV112", lyDo: "bản ghi thử nghiệm" },
  { hoTen: "Mr Testing", ma: "CTV10", lyDo: "bản ghi thử nghiệm" },
  { hoTen: "Mr Testing Clone", ma: "CTV10", lyDo: "bản ghi thử nghiệm" },
  { hoTen: "Nam", ma: "CTV111", lyDo: "họ tên một từ, chưa đủ định danh" },
  { hoTen: "Lộc", ma: "", lyDo: "họ tên một từ, chưa đủ định danh" },
  { hoTen: "Chưa có người thực hiện KH", ma: "CTV59", lyDo: "bản ghi giữ chỗ, chưa gắn với người nào" },
];

/** Bỏ dấu tiếng Việt, gộp mọi loại gạch ngang và khoảng trắng — để so tên lĩnh vực giữa hai hệ. */
function chuanHoa(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * Nhãn lĩnh vực lấy thẳng từ src/lib/m03/labels.ts để không có bảng ánh xạ thứ hai trôi khỏi
 * bảng thứ nhất. Hai hệ viết khác nhau ở dấu gạch ("Dung tích – Lưu lượng" vs "Dung tích - Lưu
 * lượng") và ở "Hoá/Hóa" — chuanHoa() xoá đúng những khác biệt đó, không xoá gì thêm.
 */
const LINH_VUC_THEO_NHAN = new Map<string, M03InspectionField>(
  Object.entries(INSPECTION_FIELD_LABEL).map(([ma, nhan]) => [chuanHoa(nhan), ma as M03InspectionField]),
);

/** "Không áp dụng" và "Không lĩnh vực" không phải lĩnh vực — đó là cách ghi "người này không kiểm định". */
const KHONG_PHAI_LINH_VUC = new Set(["khong ap dung", "khong linh vuc"]);

type CanhBao = { ma: string; hoTen: string; loai: string; chiTiet: string };

type HoSo = {
  legacyCode: string | null;
  legacyCodeGoc: string;
  fullName: string;
  position: string;
  department: string;
  employmentType: M03EmploymentType;
  status: M03EmployeeStatus;
  recordStatus: M03EmployeeRecordStatus;
  hireDate: Date;
  linhVuc: M03InspectionField[];
  the: { cardNumber: string; decisionNumber: string | null; issuedAt: Date | null; expiresAt: Date | null } | null;
};

/**
 * Bộ phận: khi một người chấm dứt hợp đồng, ManLab ghi đè cột Bộ phận thành "CDHĐ" và phòng ban
 * gốc chỉ còn sót ở tiền tố mã nhân sự (DataModel.md K1). Khôi phục từ tiền tố chính là lý do
 * legacyCode phải giữ nguyên chuỗi gốc kể cả khoảng trắng.
 */
function suyBoPhan(boPhanGoc: string, maGoc: string): string {
  const tienTo = /^(.*?)\s*\d+$/.exec(maGoc.trim())?.[1]?.trim();
  if (boPhanGoc === "CDHĐ" || !boPhanGoc) return tienTo || boPhanGoc || "Chưa xác định";
  return boPhanGoc;
}

function suyLoaiHopDong(loai: string, nhom: string, boPhan: string): M03EmploymentType {
  if (/thử việc/i.test(loai)) return "THUVIEC";
  if (/thực tập/i.test(loai)) return "THUCTAP";
  if (/^hợp đồng (phổ thông|chuyên môn)/i.test(loai)) return "HDDV";
  if (/^hđlđ/i.test(loai)) return "CHINHTHUC";
  // Không ghi loại hợp đồng (12/145 bản ghi) — suy từ nhóm nhân sự, cuối cùng mới suy từ bộ phận.
  if (/thử việc/i.test(nhom)) return "THUVIEC";
  if (/chuyên gia|ctv|hưu trí/i.test(nhom)) return "HDDV";
  if (nhom === "ETV") return "CHINHTHUC";
  return /ctv/i.test(boPhan) ? "HDDV" : "CHINHTHUC";
}

const TRANG_THAI_DUYET: Record<string, M03EmployeeRecordStatus> = {
  "Nháp": "DRAFT",
  "Chờ duyệt": "PENDING_APPROVAL",
  "Đã duyệt": "APPROVED",
  "Không duyệt": "REJECTED",
  // Người đã nghỉ: ManLab gộp hai trục nên không còn biết bản ghi đã duyệt hay chưa (K3). Đặt
  // APPROVED vì họ đã từng làm việc thật và có hợp đồng — SUY ĐOÁN, Văn phòng đã duyệt 31/08/2026.
  "Chấm dứt HĐLĐ": "APPROVED",
};

// ------------------------------------------------------------------ chạy

function thamSo(ten: string): string | undefined {
  const found = process.argv.find((a) => a.startsWith(`--${ten}=`));
  return found?.slice(ten.length + 3);
}

async function main() {
  const duongDanThamSo = thamSo("file");
  const ghiThat = process.argv.includes("--yes");
  if (!duongDanThamSo) {
    console.error("Thiếu --file=<đường dẫn tới bản kết xuất .xlsx của ManLab>");
    process.exit(1);
  }
  const duongDan = duongDanThamSo.replace(/^~(?=$|\/)/, homedir());

  const bang = await docBangTinh(duongDan);
  const dongTieuDe = bang.findIndex((d) => d?.includes(COT.ma));
  if (dongTieuDe < 0) throw new Error(`Không tìm thấy dòng tiêu đề (không có cột "${COT.ma}")`);
  const tieuDe = bang[dongTieuDe];
  const cot = (ten: string) => {
    const i = tieuDe.indexOf(ten);
    if (i < 0) throw new Error(`Bản kết xuất thiếu cột "${ten}" — view đã đổi, kiểm tra lại trước khi nhập`);
    return i;
  };
  const idx = Object.fromEntries(Object.entries(COT).map(([k, v]) => [k, cot(v)])) as Record<keyof typeof COT, number>;

  const canhBao: CanhBao[] = [];
  const boQua: { hoTen: string; ma: string; lyDo: string }[] = [];
  const hoSo: HoSo[] = [];
  const demMa = new Map<string, number>();

  for (const dong of bang.slice(dongTieuDe + 1)) {
    if (!dong) continue;
    const o = (i: number) => (dong[i] ?? "").trim();
    const hoTen = o(idx.hoTen);
    if (!hoTen) continue;
    const maGoc = o(idx.ma);

    const rac = KHONG_PHAI_NGUOI.find((r) => r.hoTen === hoTen && r.ma === maGoc);
    if (rac) {
      boQua.push({ hoTen, ma: maGoc || "(không có mã)", lyDo: rac.lyDo });
      continue;
    }

    // Mã nhân sự trên ManLab KHÔNG duy nhất: 9 mã đang dùng cho nhiều người, 5 bản ghi không có
    // mã. legacyCode thì @unique. Thêm hậu tố để không mất người nào và để Văn phòng nhìn ra ngay
    // chỗ cần làm sạch — mã gốc luôn thuộc về bản ghi xuất hiện đầu tiên.
    let legacyCode: string;
    if (maGoc) {
      const lan = (demMa.get(maGoc) ?? 0) + 1;
      demMa.set(maGoc, lan);
      legacyCode = lan === 1 ? maGoc : `${maGoc}#${lan}`;
      if (lan > 1) canhBao.push({ ma: maGoc, hoTen, loai: "MÃ TRÙNG", chiTiet: `mã dùng chung, nhập thành "${legacyCode}"` });
    } else {
      const lan = (demMa.get("") ?? 0) + 1;
      demMa.set("", lan);
      legacyCode = `(chưa có mã)#${lan}`;
      canhBao.push({ ma: "(trống)", hoTen, loai: "THIẾU MÃ", chiTiet: `không có mã nhân sự, nhập thành "${legacyCode}"` });
    }

    let hireDate = doiNgay(dong[idx.ngayBatDau]);
    if (!hireDate) {
      hireDate = doiNgay(dong[idx.ngayKhoiTao]);
      canhBao.push({ ma: maGoc, hoTen, loai: "THIẾU NGÀY VÀO LÀM", chiTiet: "lấy tạm Ngày khởi tạo (NS)" });
    }
    if (!hireDate) {
      boQua.push({ hoTen, ma: maGoc || "(không có mã)", lyDo: "không có cả ngày vào làm lẫn ngày khởi tạo" });
      continue;
    }

    const department = suyBoPhan(o(idx.boPhan), maGoc);
    if (department === "CDHĐ") {
      // Tiền tố mã là chỗ duy nhất còn giữ phòng ban gốc (K1) — nhưng có người mã chính là
      // "CDHĐ01", và có người không có mã. Với họ thì phòng ban gốc đã mất hẳn trên ManLab.
      canhBao.push({ ma: maGoc || "(trống)", hoTen, loai: "MẤT BỘ PHẬN GỐC", chiTiet: "không suy được phòng ban từ mã — giữ CDHĐ" });
    }

    const trangThai = o(idx.trangThai);
    const employmentType = suyLoaiHopDong(o(idx.loaiHopDong), o(idx.nhomNhanSu), o(idx.boPhan));
    const recordStatus = TRANG_THAI_DUYET[trangThai];
    if (!recordStatus) {
      canhBao.push({ ma: maGoc, hoTen, loai: "TRẠNG THÁI LẠ", chiTiet: `"${trangThai}" — đặt DRAFT` });
    }
    if (!o(idx.loaiHopDong)) {
      canhBao.push({ ma: maGoc, hoTen, loai: "THIẾU LOẠI HĐ", chiTiet: `suy ra ${employmentType} từ nhóm/bộ phận` });
    }

    const status: M03EmployeeStatus =
      trangThai === "Chấm dứt HĐLĐ" ? "DANGHIVIEC" : employmentType === "THUVIEC" ? "THUVIEC" : "CHINHTHUC";

    // Lĩnh vực kiểm định: quan hệ nhiều–nhiều đang bị nén thành chuỗi ngăn bằng ";" (K4).
    const linhVuc: M03InspectionField[] = [];
    for (const phan of o(idx.linhVuc).split(";")) {
      const ten = phan.trim();
      if (!ten) continue;
      const khoa = chuanHoa(ten);
      if (KHONG_PHAI_LINH_VUC.has(khoa)) continue;
      const enumLinhVuc = LINH_VUC_THEO_NHAN.get(khoa);
      if (!enumLinhVuc) {
        canhBao.push({ ma: maGoc, hoTen, loai: "LĨNH VỰC LẠ", chiTiet: `"${ten}" không có trong 12 lĩnh vực — bỏ qua` });
        continue;
      }
      if (!linhVuc.includes(enumLinhVuc)) linhVuc.push(enumLinhVuc);
    }

    // Thẻ kiểm định viên: giữ NGUYÊN dữ liệu thật, kể cả sai — thẻ đảo ngày, thẻ trùng số, thẻ
    // thiếu hạn đều được nhập rồi báo cáo. Script di trú không phải chỗ sửa dữ liệu nghiệp vụ;
    // validateInspectorCard()/duplicateCardNumbers() trong rules.ts mới là nơi phát hiện.
    const soThe = o(idx.soThe);
    const soQD = o(idx.soQD);
    const ngayQD = doiNgay(dong[idx.ngayQD]);
    const ngayHetHan = doiNgay(dong[idx.ngayHetHan]);
    let the: HoSo["the"] = null;
    if (soThe) {
      the = { cardNumber: soThe, decisionNumber: soQD || null, issuedAt: ngayQD, expiresAt: ngayHetHan };
      if (ngayQD && ngayHetHan && ngayQD > ngayHetHan) {
        canhBao.push({ ma: maGoc, hoTen, loai: "THẺ ĐẢO NGÀY", chiTiet: `cấp ${ngayQD.toISOString().slice(0, 10)} > hết hạn ${ngayHetHan.toISOString().slice(0, 10)}` });
      }
      if (!ngayHetHan) canhBao.push({ ma: maGoc, hoTen, loai: "THẺ THIẾU HẠN", chiTiet: `thẻ ${soThe} không có ngày hết hạn` });
    } else if (soQD) {
      canhBao.push({ ma: maGoc, hoTen, loai: "THẺ THIẾU SỐ", chiTiet: `có QĐ ${soQD} nhưng không có số thẻ — không nhập thẻ` });
    }

    hoSo.push({
      legacyCode,
      legacyCodeGoc: maGoc,
      fullName: hoTen,
      position: o(idx.chucVu) || "Chưa xác định",
      department,
      employmentType,
      status,
      recordStatus: recordStatus ?? "DRAFT",
      hireDate,
      linhVuc,
      the,
    });
  }

  // Số thẻ trùng giữa hai người khác nhau: ràng buộc CSDL chỉ unique trong phạm vi một nhân sự
  // nên không chặn, nhưng phải nêu ra — một trong hai bên đang sai.
  const theTheoSo = new Map<string, string[]>();
  for (const h of hoSo) if (h.the) theTheoSo.set(h.the.cardNumber, [...(theTheoSo.get(h.the.cardNumber) ?? []), h.fullName]);
  for (const [so, nguoi] of theTheoSo) {
    if (nguoi.length > 1) canhBao.push({ ma: "—", hoTen: nguoi.join(" / "), loai: "SỐ THẺ TRÙNG", chiTiet: `số thẻ ${so} dùng chung ${nguoi.length} người` });
  }

  // Hai bản ghi cùng một người là chuyện có thật trên ManLab (nghỉ việc rồi quay lại làm cộng
  // tác viên qua đơn vị khác → hai bản ghi, hai mã). Script KHÔNG tự gộp — gộp sai thì mất một
  // giai đoạn quan hệ lao động. Chỉ nêu ra để Văn phòng đối chiếu ngày sinh/CCCD rồi tự quyết.
  const theoTen = new Map<string, string[]>();
  for (const h of hoSo) {
    const khoa = chuanHoa(h.fullName).replace(/\s*\([^)]*\)\s*/g, " ").trim();
    theoTen.set(khoa, [...(theoTen.get(khoa) ?? []), h.legacyCodeGoc || "(không có mã)"]);
  }
  for (const [ten, ma] of theoTen) {
    if (ma.length > 1) canhBao.push({ ma: ma.join(" / "), hoTen: ten, loai: "TÊN TRÙNG", chiTiet: `${ma.length} bản ghi cùng họ tên — kiểm tra có phải cùng một người` });
  }

  console.log(`\n=== NHẬP NHÂN SỰ MANLAB → M03 ${ghiThat ? "(GHI THẬT)" : "(XEM TRƯỚC — không ghi gì)"} ===`);
  console.log(`Nguồn      : ${duongDan}`);
  console.log(`Đọc được   : ${hoSo.length + boQua.length} bản ghi có họ tên`);
  console.log(`Sẽ nhập    : ${hoSo.length} hồ sơ · ${hoSo.reduce((s, h) => s + h.linhVuc.length, 0)} dòng lĩnh vực · ${hoSo.filter((h) => h.the).length} thẻ KĐV`);
  console.log(`Bỏ qua     : ${boQua.length} bản ghi không phải người lao động`);
  for (const b of boQua) console.log(`   - ${b.hoTen} (${b.ma}) — ${b.lyDo}`);

  console.log(`\nCảnh báo   : ${canhBao.length}`);
  const theoLoai = new Map<string, CanhBao[]>();
  for (const c of canhBao) theoLoai.set(c.loai, [...(theoLoai.get(c.loai) ?? []), c]);
  for (const [loai, ds] of [...theoLoai].sort()) {
    console.log(`\n   [${loai}] ${ds.length}`);
    for (const c of ds) console.log(`      ${c.hoTen} (${c.ma}): ${c.chiTiet}`);
  }

  if (!ghiThat) {
    console.log("\nChưa ghi gì vào database. Thêm --yes để nhập thật.\n");
    return;
  }

  // Sinh code NS-<năm vào làm>-<NNNN>: tiếp nối số lớn nhất đang có trong CSDL theo từng năm, để
  // không đụng hồ sơ đã tạo trên nền tảng (kể cả dữ liệu seed).
  const daCo = await prisma.m03Employee.findMany({ select: { code: true } });
  const soLonNhat = new Map<string, number>();
  for (const { code } of daCo) {
    const m = /^NS-(\d{4})-(\d+)$/.exec(code);
    if (m) soLonNhat.set(m[1], Math.max(soLonNhat.get(m[1]) ?? 0, Number(m[2])));
  }
  const sinhCode = (nam: string) => {
    const tiep = (soLonNhat.get(nam) ?? 0) + 1;
    soLonNhat.set(nam, tiep);
    return `NS-${nam}-${String(tiep).padStart(4, "0")}`;
  };

  let taoMoi = 0;
  let capNhat = 0;
  for (const h of hoSo.sort((a, b) => a.hireDate.getTime() - b.hireDate.getTime())) {
    const cu = await prisma.m03Employee.findUnique({ where: { legacyCode: h.legacyCode! } });
    const duLieu = {
      fullName: h.fullName,
      position: h.position,
      department: h.department,
      employmentType: h.employmentType,
      status: h.status,
      recordStatus: h.recordStatus,
      hireDate: h.hireDate,
    };
    const nhanSu = cu
      ? await prisma.m03Employee.update({ where: { id: cu.id }, data: duLieu })
      : await prisma.m03Employee.create({
          data: { ...duLieu, code: sinhCode(String(h.hireDate.getUTCFullYear())), legacyCode: h.legacyCode },
        });
    if (cu) capNhat++;
    else taoMoi++;

    // Thẻ trước, lĩnh vực sau: M03EmployeeField.cardId trỏ tới thẻ làm bằng chứng ủy quyền (K5).
    let theId: string | null = null;
    if (h.the) {
      const t = await prisma.m03InspectorCard.upsert({
        where: { employeeId_cardNumber: { employeeId: nhanSu.id, cardNumber: h.the.cardNumber } },
        create: { employeeId: nhanSu.id, ...h.the },
        update: { decisionNumber: h.the.decisionNumber, issuedAt: h.the.issuedAt, expiresAt: h.the.expiresAt },
      });
      theId = t.id;
    }
    for (const lv of h.linhVuc) {
      await prisma.m03EmployeeField.upsert({
        where: { employeeId_field: { employeeId: nhanSu.id, field: lv } },
        create: { employeeId: nhanSu.id, field: lv, cardId: theId },
        update: { cardId: theId },
      });
    }
  }

  console.log(`\nĐã ghi     : ${taoMoi} hồ sơ tạo mới · ${capNhat} hồ sơ cập nhật\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
