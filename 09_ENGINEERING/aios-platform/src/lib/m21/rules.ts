// M21 — State machine + business rules (BR2/BR3/BR5/BR6/BR8/BR9/BR10/BR11) và gate G1/G3/G6,
// port 1:1 từ `var TR`/`var ST`/gateCheck/lineGaps/recordGaps/hasGoodLine/doTransition trong
// 05_MODULE_LIBRARY/M21_CongBoNangLuc/08_Source/index.html (bản standalone gốc — xem
// 01_Requirement/_work/20260822-di-tru-m21/spec.md để đối chiếu nguyên văn từng hàm gốc).
// KHÔNG đổi hành vi so với bản gốc, chỉ đổi nhãn tiếng Việt trạng thái sang mã enum
// (khớp M21Status trong schema Prisma) — nhãn hiển thị giữ ở labels.ts.
//
// Khác biệt có chủ đích so với bản gốc (đã ghi trong spec.md, không phải thiếu sót):
// - Bản gốc chặn "Super Admin" (role số 0) khỏi mọi phê duyệt chuyên môn. Ở platform này,
//   quyền admin nền tảng (PlatformRole.ADMIN) tách biệt hoàn toàn khỏi vai trò M21
//   (ModuleRoleAssignment), nên không có khái niệm "role 0" cần chặn riêng — một actor chỉ
//   thao tác được nếu có ModuleRoleAssignment moduleCode="M21" hợp lệ.
// - Bản gốc KHÔNG chặn tự soát xét/phê duyệt hồ sơ do chính mình tạo (không có check
//   createdById như M10 R2) — port nguyên trạng, không tự thêm ràng buộc mới.
import type { M21LineResult, M21RecordType, M21Status } from "@/generated/prisma/enums";

export type M21Role = "NTH" | "LDP" | "LDV";
const ROLE_RANK: Record<M21Role, number> = { NTH: 1, LDP: 2, LDV: 3 };

export interface M21ActorUser {
  id: string;
  m21Role: M21Role | null;
}

export interface LineForRules {
  id?: string;
  dichVu: string;
  ten: string;
  linhVuc: string;
  phamVi: string;
  ccx: string;
  quyTrinh: string;
  nguoiTH: string;
  ghiChu: string;
  ketQua: M21LineResult;
  lyDo: string;
  bangChung: string;
  bcFileName: string;
  linked: boolean;
  catalogRef: string;
}

export interface RecordForRules {
  loai: M21RecordType;
  status: M21Status;
  lan: string;
  diaDiem: string;
  toChuc: string;
  diaChi: string;
  daiDien: string;
  coQuanTiepNhan: string;
  ngayGui: Date | null;
  phienBanCu: unknown[] | null;
  lines: LineForRules[];
}

// ---------- Nhãn trạng thái (ST) — chỉ dùng nội bộ rules.ts để log lý do lỗi, UI dùng labels.ts ----------
export const STATUS_LABEL_INTERNAL: Record<M21Status, string> = {
  CHUALAP: "Chưa lập",
  DANGLAP: "Đang lập",
  SOATXET: "Chờ soát xét (Lãnh đạo phòng)",
  DNLDV: "Đã soát xét · Chờ Lãnh đạo Viện duyệt",
  PHENOIBO: "Đã phê duyệt nội bộ",
  DAGUI: "Đã gửi cơ quan tiếp nhận",
  YEUCAUBOSUNG: "Yêu cầu bổ sung từ cơ quan tiếp nhận",
  TIEPNHAN: "Đã tiếp nhận / ghi nhận",
  CONGHIEU: "Đã công khai · Còn hiệu lực",
  DIEUCHINH: "Đang điều chỉnh (tạo phiên bản mới)",
  TAMDUNG: "Tạm dừng",
  HUYBO: "Hủy bỏ",
  HETHIEU: "Hết hiệu lực",
};

// ---------- Gate chọn đối tượng từ Danh mục PTĐ (gateCheck) — G1/G3/G6 ----------
export interface CatalogItemForGate {
  trangThaiPTD: string;
  quyTrinh: string;
  nangLucCode: string;
  dichVu: string;
  cmcMax: number | null;
  phamVi: string;
}

const APPROVED_PTD_STATES = new Set(["Đã duyệt", "ĐN LĐV duyệt"]);

export function gateCheck(item: CatalogItemForGate): { pass: boolean; reasons: string[] } {
  const reasons: string[] = [];
  const isHC = item.dichVu === "HC";
  const g1 = APPROVED_PTD_STATES.has(item.trangThaiPTD);
  if (!g1) reasons.push(`G1: PTĐ chưa được duyệt (hiện: ${item.trangThaiPTD || "—"})`);
  const g3 = !!item.quyTrinh;
  if (!g3) reasons.push("G3: Chưa liên kết quy trình thực hiện");
  const g6 = !!item.nangLucCode;
  if (!g6) reasons.push("G6: Chưa gán năng lực pháp lý (ĐK105/ĐK107/N383/VILAS/Giấy KHCN)");
  // G2 (CMC) và G5 (phạm vi đo): không chặn ở gate chọn đối tượng — bắt buộc lại ở lineGaps
  // khi "Gửi soát xét", đúng hành vi bản gốc (KHÔNG phải G4/G7 — 2 mã đó không tồn tại trong
  // code gốc dù README nói "G1–G7", xem spec.md).
  if (isHC && !String(item.cmcMax ?? "").trim()) reasons.push("Cần bổ sung CMC khi lập hồ sơ (NQ 66.18)");
  if (!item.phamVi) reasons.push("Cần bổ sung phạm vi đo khi lập hồ sơ");
  return { pass: g1 && g3 && g6, reasons };
}

// ---------- Validation trường bắt buộc (lineGaps / recordGaps / hasGoodLine) ----------
export function lineGaps(l: LineForRules): string[] {
  const g: string[] = [];
  if (!l.ten.trim()) g.push("Tên đối tượng");
  if (!l.linhVuc.trim()) g.push("Lĩnh vực");
  if (!l.phamVi.trim()) g.push("Phạm vi đo");
  if (!l.quyTrinh.trim()) g.push("Quy trình thực hiện");
  if (!l.ccx.trim()) g.push("Cấp/ĐCX/MPE/LOD");
  const hasEvidence = !!(l.bangChung.trim() || l.bcFileName);
  const needsReasonEvidence = l.ketQua === "KHONG" || l.ketQua === "DIEUCHINH";
  if (needsReasonEvidence && !l.lyDo.trim()) g.push("Lý do (bắt buộc — BR10)");
  if (needsReasonEvidence && !hasEvidence) g.push("Bằng chứng: ảnh chụp màn hình / tài liệu (bắt buộc — BR10)");
  return g;
}

export function recordGaps(r: RecordForRules): string[] {
  const out: string[] = [];
  if (!r.coQuanTiepNhan.trim()) out.push("Cơ quan tiếp nhận");
  if (!r.toChuc.trim()) out.push("Tên tổ chức");
  if (!r.diaChi.trim()) out.push("Địa chỉ");
  if (!r.daiDien.trim()) out.push("Người đại diện pháp luật");
  if (r.loai === "DL" && !r.diaDiem.trim()) out.push("Địa điểm thực hiện hoạt động");
  r.lines.forEach((l, i) => {
    const g = lineGaps(l);
    if (g.length) out.push(`Dòng ${i + 1} (${l.ten || "chưa đặt tên"}): ${g.join(", ")}`);
  });
  return out;
}

export function hasGoodLine(r: RecordForRules): boolean {
  return r.lines.some((l) => l.ketQua === "DAPUNG" || l.ketQua === "DIEUCHINH");
}

// BR1 — hồ sơ đã ký số thì khóa dữ liệu (chỉ sửa được qua "Điều chỉnh" tạo phiên bản mới).
export function isEditable(kyso: boolean): boolean {
  return !kyso;
}

// Kiểm tra kép BR10 trước khi ký số (dnldv→phenoibo) — bản gốc chạy lại check này NGOÀI
// recordGaps vì dữ liệu có thể đổi giữa lúc "Gửi soát xét" và lúc ký số.
function lineEvidenceGaps(r: RecordForRules): string[] {
  return r.lines
    .filter((l) => (l.ketQua === "KHONG" || l.ketQua === "DIEUCHINH") && (!l.lyDo.trim() || !(l.bangChung.trim() || l.bcFileName)))
    .map((l, i) => `Dòng ${i + 1} (${l.ten || "chưa đặt tên"}): thiếu lý do/bằng chứng (BR10)`);
}

// ---------- State machine (TR) ----------
export interface TransitionDef {
  to: M21Status;
  label: string;
  minRole?: M21Role; // không có = mọi vai trò M21 đã gán (NTH trở lên) đều làm được
  reason?: boolean; // bắt buộc nhập lý do
  needReceipt?: boolean; // bắt buộc nhập mã biên nhận (dagui→tiepnhan)
  danger?: boolean;
  warn?: boolean;
  guard?: (r: RecordForRules) => boolean;
  check?: (r: RecordForRules) => string[];
}

export const TRANSITIONS: Record<M21Status, TransitionDef[]> = {
  CHUALAP: [{ to: "DANGLAP", label: "Bắt đầu lập hồ sơ" }],
  DANGLAP: [{ to: "SOATXET", label: "Gửi soát xét", guard: hasGoodLine, check: recordGaps }],
  SOATXET: [
    { to: "DANGLAP", label: "Trả lại bổ sung", reason: true, minRole: "LDP" },
    { to: "DNLDV", label: "Duyệt soát xét · Đề nghị Lãnh đạo Viện duyệt", minRole: "LDP" },
  ],
  DNLDV: [
    { to: "SOATXET", label: "Trả lại soát xét", reason: true, minRole: "LDV" },
    { to: "PHENOIBO", label: "Phê duyệt nội bộ & ký số", minRole: "LDV", check: lineEvidenceGaps },
  ],
  PHENOIBO: [{ to: "DAGUI", label: "Gửi cơ quan tiếp nhận", minRole: "LDP" }],
  DAGUI: [
    { to: "TIEPNHAN", label: "Ghi nhận biên nhận", needReceipt: true },
    { to: "YEUCAUBOSUNG", label: "Cơ quan yêu cầu bổ sung", reason: true, warn: true },
  ],
  YEUCAUBOSUNG: [{ to: "DANGLAP", label: "Quay lại chỉnh sửa, bổ sung" }],
  TIEPNHAN: [{ to: "CONGHIEU", label: "Công khai & sinh QR", minRole: "LDP" }],
  CONGHIEU: [
    { to: "DIEUCHINH", label: "Điều chỉnh (mở khóa, tạo phiên bản mới)", reason: true, warn: true },
    { to: "TAMDUNG", label: "Tạm dừng", reason: true, minRole: "LDV", warn: true },
    { to: "HUYBO", label: "Hủy bỏ", reason: true, minRole: "LDV", danger: true },
    { to: "HETHIEU", label: "Đánh dấu hết hiệu lực", minRole: "LDV", danger: true },
  ],
  DIEUCHINH: [{ to: "CONGHIEU", label: "Hoàn tất điều chỉnh & khóa phiên bản mới", minRole: "LDP" }],
  TAMDUNG: [
    { to: "CONGHIEU", label: "Khôi phục", minRole: "LDV" },
    { to: "HUYBO", label: "Hủy bỏ", reason: true, minRole: "LDV", danger: true },
  ],
  HUYBO: [],
  HETHIEU: [],
};

export type TxResult =
  | { ok: true; label: string; patch: Record<string, unknown> }
  | { ok: false; code: string; message: string };

const ok = (label: string, patch: Record<string, unknown>): TxResult => ({ ok: true, label, patch });
const err = (code: string, message: string): TxResult => ({ ok: false, code, message });

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

// Áp dụng side-effect field patch riêng của từng transition đích (fn trong bản gốc).
function transitionPatch(r: RecordForRules, to: M21Status, extra: { reason?: string; receiptNo?: string }): Record<string, unknown> {
  const now = new Date();
  switch (to) {
    case "PHENOIBO":
      return { kyso: true, kysoAt: now };
    case "DAGUI":
      return { ngayGui: now };
    case "TIEPNHAN":
      return { maBienNhan: extra.receiptNo, ngayTiepNhan: now };
    case "YEUCAUBOSUNG":
      return { kyso: false };
    case "DANGLAP":
      return r.status === "YEUCAUBOSUNG" ? { ngayGui: null } : {};
    case "CONGHIEU":
      if (r.status === "DIEUCHINH") {
        const n = parseInt(r.lan, 10) || 1;
        return { lan: pad2(n + 1), ngayCongKhai: now, kyso: true, kysoAt: now };
      }
      return { ngayCongKhai: now };
    case "DIEUCHINH": {
      const snapshot = { lan: r.lan, ngayHieuLuc: null, luuLuc: now.toISOString(), lines: r.lines };
      return { phienBanCu: [...(r.phienBanCu ?? []), snapshot], kyso: false };
    }
    default:
      return {};
  }
}

/**
 * Thực hiện 1 transition. Đây là hàm authoritative — server action gọi hàm này rồi mới ghi DB,
 * KHÔNG tự suy luận lại điều kiện ở tầng UI/action.
 */
export function txTransition(
  r: RecordForRules,
  actor: M21ActorUser,
  to: M21Status,
  extra: { reason?: string; receiptNo?: string } = {}
): TxResult {
  const def = TRANSITIONS[r.status]?.find((t) => t.to === to);
  if (!def) return err("BAD_STATE", `Hồ sơ đang ở "${STATUS_LABEL_INTERNAL[r.status]}", không thể chuyển sang trạng thái này.`);

  if (!actor.m21Role) return err("NO_ROLE", "Chưa được gán vai trò M21.");
  if (def.minRole && ROLE_RANK[actor.m21Role] < ROLE_RANK[def.minRole])
    return err("ROLE_TOO_LOW", `Cần vai trò tối thiểu: ${def.minRole}`);

  if (def.guard && !def.guard(r))
    return err("GUARD_FAILED", "Hồ sơ phải có ít nhất một dòng đạt (Đáp ứng/Điều chỉnh) mới được tiếp tục — BR9.");

  if (def.check) {
    const gaps = def.check(r);
    if (gaps.length) return err("VALIDATION_FAILED", `Chưa thể thực hiện — còn thiếu (Mục 8.2):\n${gaps.slice(0, 8).join("\n")}`);
  }

  if (def.reason && !extra.reason?.trim()) return err("REASON_REQUIRED", `Thao tác "${def.label}" bắt buộc nhập lý do.`);
  if (def.needReceipt && !extra.receiptNo?.trim()) return err("RECEIPT_REQUIRED", "Bắt buộc nhập mã biên nhận của cơ quan tiếp nhận.");

  const patch = transitionPatch(r, to, extra);
  return ok(def.label, { status: to, ...patch });
}
