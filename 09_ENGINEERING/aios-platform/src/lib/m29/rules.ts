// M29 — RBAC + vòng đời phê duyệt, port 1:1 từ
// 05_MODULE_LIBRARY/M29_AI/08_Source/api/rules.mjs (bản authoritative gốc).
// KHÔNG đổi hành vi so với bản gốc — chỉ đổi nhãn tiếng Việt trạng thái sang mã enum.
import type {
  AIApprovalStatus,
  AIAStatus,
  AIReviewCycle,
  AIIncidentSeverity,
  AIOpStatus,
  AIIncidentStatus,
  AIPermissionLevel,
  AIPromptStatus,
  AIUnregisteredStatus,
} from "@/generated/prisma/enums";
import { ROLE_RANK, TOOL_MIN_ROLE, type M29Role } from "./model";

export type TxResult =
  | { ok: true; status: string; action: string; reason: string | null; patch: Record<string, unknown> }
  | { ok: false; code: string; message: string; dependents?: DependentsDetail };

/** Một bản ghi đang hoạt động trỏ tới bản ghi sắp kết thúc vòng đời hoặc sắp bị vô hiệu hóa. */
export interface DependentRef {
  kind: "agent" | "tool" | "model";
  code: string;
  /** Khoá chính, để giao diện dựng liên kết tới đúng bản ghi. */
  id: string;
}

/**
 * Phần cấu trúc của câu chặn DEPENDENTS_ACTIVE: cùng một bản chữ với `message`, nhưng tách hai vế
 * để giao diện chèn liên kết vào giữa. Tách ở đây chứ không để giao diện cắt chuỗi `message` —
 * cắt chuỗi thì đổi một dấu phẩy trong câu là hỏng liên kết mà không ai biết.
 */
export interface DependentsDetail {
  truoc: string;
  sau: string;
  refs: DependentRef[];
}

/** Danh từ đứng trước mã, dùng chung cho câu thông báo và cho giao diện — chỉ có một bản. */
export const DEPENDENT_KIND_LABEL: Record<DependentRef["kind"], string> = {
  agent: "tác tử",
  tool: "công cụ",
  model: "mô hình",
};

const ok = (status: string, action: string, reason: string | null = null, patch: Record<string, unknown> = {}): TxResult => ({
  ok: true,
  status,
  action,
  reason,
  patch,
});
const err = (code: string, message: string, dependents?: DependentsDetail): TxResult => ({ ok: false, code, message, dependents });

// Các bước "chưa phê duyệt" của ETV.P35 Phụ lục II.1 (trạng thái 1–5) — tập trạng thái duy nhất
// mà nhánh Hủy mở ra.
const PRE_APPROVAL_STATUSES: AIApprovalStatus[] = ["DRAFT", "PENDING_REVIEW", "RETURNED", "PENDING_APPROVAL", "REJECTED"];

/** Lý do + danh sách đối tượng còn phụ thuộc, dùng chung cho hai nhánh kết thúc vòng đời. */
export interface EndOfLifeExtra {
  reason?: string;
  /** Từng tác tử/công cụ đang hoạt động trỏ tới bản ghi, do tầng hành động nạp từ CSDL. */
  activeDependents?: DependentRef[];
}

// ETV.P35 §6.5.3: không kết thúc vòng đời bản ghi khi còn tác tử/công cụ đang hoạt động trỏ tới —
// và thủ tục đòi hệ thống "chỉ ra danh sách đối tượng còn phụ thuộc", nên thông báo liệt kê tên
// thật chứ không chỉ đếm. Áp cho cả nhánh Hủy vì §6.7 cấm tác tử/công cụ trỏ tới nền tảng đã Hủy.
function dependentsBlock(activeDependents: DependentRef[] | undefined, action: string, doiTuong = "nền tảng này"): TxResult | null {
  if (!activeDependents?.length) return null;
  const truoc = `Không ${action} được khi còn ${activeDependents.length} đối tượng đang hoạt động trỏ tới ${doiTuong} (ETV.P35 §6.5.3): `;
  const sau = ". Hãy chuyển hướng hoặc dừng các đối tượng đó trước.";
  const nhan = activeDependents.map((d) => `${DEPENDENT_KIND_LABEL[d.kind]} ${d.code}`).join(", ");
  return err("DEPENDENTS_ACTIVE", `${truoc}${nhan}${sau}`, { truoc, sau, refs: activeDependents });
}

/**
 * Các loại bản ghi đi theo vòng đời phê duyệt chuẩn.
 *
 * Khai ở đây chứ không ở actions.ts vì file đó mang "use server" — chỉ nên xuất hàm async, và
 * giao diện cần chính kiểu này để gọi `approvalAction`.
 */
export type ApprovalKind = "platform" | "guardrail" | "policy" | "agent";

// Vòng đời chuẩn (Nháp→Chờ soát xét→Chờ phê duyệt→Đã phê duyệt→Hết hiệu lực/Hủy) — dùng chung
// cho Platform/Guardrail/Policy, và cho bản ghi hệ thống AI theo ETV.P29 mục 6.1.
export const approvalTransitions = {
  submit(entity: { approvalStatus: AIApprovalStatus }): TxResult {
    if (!(["DRAFT", "RETURNED", "REJECTED"] as AIApprovalStatus[]).includes(entity.approvalStatus))
      return err("NOT_DRAFT", "Chỉ bản ghi Nháp/Không soát xét/Không phê duyệt mới gửi được.");
    return ok("PENDING_REVIEW", "Gửi soát xét");
  },

  review(entity: { approvalStatus: AIApprovalStatus }, extra: { decision?: "return" | "approve"; reason?: string } = {}): TxResult {
    if (entity.approvalStatus !== "PENDING_REVIEW") return err("BAD_STATE", "Không ở bước Chờ soát xét.");
    if (extra.decision === "return") {
      if (!extra.reason) return err("REASON_REQUIRED", "Trả lại bắt buộc nhập lý do.");
      return ok("RETURNED", "Trả lại khi soát xét", extra.reason);
    }
    return ok("PENDING_APPROVAL", "Soát xét đạt → chờ phê duyệt");
  },

  approve(
    entity: { approvalStatus: AIApprovalStatus },
    user: { id: string },
    extra: { decision?: "reject" | "approve"; reason?: string } = {}
  ): TxResult {
    if (entity.approvalStatus !== "PENDING_APPROVAL") return err("BAD_STATE", "Không ở bước Chờ phê duyệt.");
    if (extra.decision === "reject") {
      if (!extra.reason) return err("REASON_REQUIRED", "Từ chối bắt buộc nhập lý do.");
      return ok("REJECTED", "Từ chối phê duyệt", extra.reason);
    }
    return ok("APPROVED", "Phê duyệt", null, { approvedBy: user.id });
  },

  // ETV.P35 §6.1.7 bước 6: phê duyệt CHƯA phải là đưa vào vận hành. Còn một bước riêng — bật kiểm
  // tra sức khoẻ, kết nối bộ chuyển đổi — rồi bản ghi mới chuyển Hiệu lực (StateMachine.md trạng
  // thái 7). Tách khỏi approve() vì hai việc khác người và khác thời điểm: phê duyệt là quyết
  // định của người có thẩm quyền, đưa vào vận hành là thao tác kỹ thuật.
  activate(entity: { approvalStatus: AIApprovalStatus }): TxResult {
    if (entity.approvalStatus !== "APPROVED") return err("BAD_STATE", "Chỉ bản ghi Đã phê duyệt mới đưa vào vận hành được.");
    return ok("ACTIVE", "Đưa vào vận hành");
  },

  archive(entity: { approvalStatus: AIApprovalStatus }, extra: EndOfLifeExtra = {}): TxResult {
    // Nhận cả ACTIVE: nền tảng đang vận hành vẫn phải ngừng vận hành được (ETV.P35 §6.5). Giữ cả
    // APPROVED vì bản ghi đã duyệt nhưng chưa từng đưa vào vận hành cũng có thể bị bỏ.
    if (!(["APPROVED", "ACTIVE"] as AIApprovalStatus[]).includes(entity.approvalStatus))
      return err("BAD_STATE", "Chỉ bản ghi Đã phê duyệt hoặc Hiệu lực mới chuyển Hết hiệu lực được — bản ghi chưa phê duyệt đi nhánh Hủy.");
    if (!extra.reason?.trim()) return err("REASON_REQUIRED", "Hết hiệu lực bắt buộc nhập lý do.");
    const blocked = dependentsBlock(extra.activeDependents, "chuyển sang Hết hiệu lực");
    if (blocked) return blocked;
    return ok("ARCHIVED", "Hết hiệu lực", extra.reason);
  },

  // ETV.P35 Phụ lục II.1 trạng thái 9: "Hủy — bỏ bản ghi TRƯỚC KHI phê duyệt", thẩm quyền LĐV,
  // bắt buộc lý do. Tách hẳn khỏi archive() vì hai nhánh khác nhau ở tập trạng thái nguồn chứ
  // không phải hai tên gọi của một việc: gộp lại thì nhật ký mất phân biệt "chưa từng vận hành"
  // với "đã vận hành rồi dừng" — đúng chỗ đoàn đánh giá đọc. Đây cũng là nhánh nghiệp vụ THAY CHO
  // xóa bản ghi: §6.1.8 cấm cấp lại mã nền tảng đã Hủy/Hết hiệu lực để giữ giá trị truy vết, nên
  // bản ghi không bao giờ được xóa cứng.
  cancel(entity: { approvalStatus: AIApprovalStatus }, extra: EndOfLifeExtra = {}): TxResult {
    if (!PRE_APPROVAL_STATUSES.includes(entity.approvalStatus))
      return err("BAD_STATE", "Chỉ bản ghi chưa phê duyệt mới Hủy được — bản ghi Đã phê duyệt/Hiệu lực phải đi nhánh Hết hiệu lực (ETV.P35 §6.5).");
    if (!extra.reason?.trim()) return err("REASON_REQUIRED", "Hủy bản ghi bắt buộc nhập lý do.");
    const blocked = dependentsBlock(extra.activeDependents, "hủy bản ghi");
    if (blocked) return blocked;
    return ok("CANCELLED", "Hủy bản ghi", extra.reason);
  },
};

/**
 * Vòng đời VẬN HÀNH của Provider/Model/Skill — khác hẳn vòng đời phê duyệt ở trên.
 *
 * Ba sổ này không có bản ghi phê duyệt riêng trong ETV.P35/ETV.P29, nên chúng đi theo chuỗi ngắn
 * mà ETV.P29 mục 6.3 đặt cho Công cụ: **Đăng ký → Đang hiệu lực → Vô hiệu hóa**. Đây là nhánh
 * nghiệp vụ THAY CHO xóa bản ghi — ETV.P35 §6.1.8 cấm cấp lại mã đã kết thúc để giữ giá trị truy
 * vết, và `AIAuditLog`/`AIRequest`/`AIToolCall` là bảng chỉ-thêm (DacTa M29 quy tắc 2), nên xóa
 * cứng sẽ cắt đứt đúng chuỗi chứng cứ mà đoàn đánh giá đọc. Bản ghi ở lại danh mục, chỉ hết dùng.
 *
 * Lý do bắt buộc khi vô hiệu hóa, không bắt buộc khi kích hoạt lại — cùng cách approvalTransitions
 * xử hai nhánh kết thúc vòng đời (ETV.P29 mục 6.3 câu cuối: mọi nhánh kết thúc phải ghi lý do).
 */
export const opStatusTransitions = {
  disable(entity: { status: AIOpStatus }, extra: { reason?: string; activeDependents?: DependentRef[]; doiTuong?: string } = {}): TxResult {
    if (entity.status !== "ACTIVE") return err("BAD_STATE", "Chỉ bản ghi đang Hoạt động mới vô hiệu hóa được.");
    if (!extra.reason?.trim()) return err("REASON_REQUIRED", "Vô hiệu hóa bắt buộc nhập lý do.");
    // Cùng tinh thần chặn cứng ETV.P35 §6.5.3: không rút một mắt xích khi mắt sau còn đang chạy.
    // Vô hiệu hóa Provider mà Model của nó vẫn ACTIVE thì Model trỏ vào một nhà cung cấp đã chết
    // nhưng Agent vẫn gọi được — đúng thứ chặn cứng này ngăn.
    const blocked = dependentsBlock(extra.activeDependents, "vô hiệu hóa", extra.doiTuong);
    if (blocked) return blocked;
    return ok("DISABLED", "Vô hiệu hóa", extra.reason);
  },

  enable(entity: { status: AIOpStatus }): TxResult {
    if (entity.status === "ACTIVE") return err("BAD_STATE", "Bản ghi đang Hoạt động.");
    return ok("ACTIVE", "Kích hoạt lại");
  },
};

// AIA dùng bộ trạng thái riêng (NOT_ASSESSED/DRAFT/REVIEWED/APPROVED/REVIEW_REQUIRED).
export const aiaTransitions = {
  startDraft(a: { status: AIAStatus }): TxResult {
    if (!(["NOT_ASSESSED", "REVIEW_REQUIRED"] as AIAStatus[]).includes(a.status))
      return err("BAD_STATE", "Chỉ khởi tạo từ Chưa đánh giá/Cần rà soát lại.");
    return ok("DRAFT", "Khởi tạo AIA");
  },
  submitReview(a: { status: AIAStatus }): TxResult {
    if (a.status !== "DRAFT") return err("BAD_STATE", "Chỉ Nháp mới gửi soát xét được.");
    return ok("REVIEWED", "Đã soát xét");
  },
  approve(a: { status: AIAStatus }, user: { id: string }): TxResult {
    if (a.status !== "REVIEWED") return err("BAD_STATE", "Chỉ AIA Đã soát xét mới phê duyệt được.");
    return ok("APPROVED", "Phê duyệt AIA", null, { approvedBy: user.id });
  },
  flagReviewRequired(a: { status: AIAStatus }, extra: { reason?: string } = {}): TxResult {
    if (a.status !== "APPROVED") return err("BAD_STATE", "Chỉ AIA Đã phê duyệt mới gắn cờ cần rà soát lại.");
    if (!extra.reason) return err("REASON_REQUIRED", "Gắn cờ rà soát lại bắt buộc nhập lý do.");
    return ok("REVIEW_REQUIRED", "Gắn cờ cần rà soát lại", extra.reason);
  },
};

// Prompt version: chỉ 1 bản ACTIVE / agent; sửa nội dung luôn tạo bản mới.
export const promptTransitions = {
  submitReview(v: { status: AIPromptStatus }): TxResult {
    if (v.status !== "DRAFT") return err("BAD_STATE", "Chỉ version Nháp mới gửi soát xét được.");
    return ok("REVIEW", "Gửi soát xét");
  },
  approve(v: { status: AIPromptStatus }, user: { id: string }): TxResult {
    if (v.status !== "REVIEW") return err("BAD_STATE", "Chỉ version đang soát xét mới phê duyệt được.");
    return ok("APPROVED", "Phê duyệt version", null, { approvedBy: user.id });
  },
  // activate() KHÔNG tự kiểm tra deploymentGate — actions.ts gọi evaluation.ts#deploymentGate
  // riêng trước khi gọi transition này, giữ đúng tách lớp của bản gốc (deploymentGate nằm
  // trong server.js, không phải rules.mjs).
  activate(v: { status: AIPromptStatus }): TxResult {
    if (v.status !== "APPROVED") return err("BAD_STATE", "Chỉ version Đã phê duyệt mới kích hoạt được.");
    return ok("ACTIVE", "Kích hoạt version");
  },
};

// Ràng buộc dữ liệu Tool.
export function validateTool(t: { permissionLevel: AIPermissionLevel; requireConfirmation: boolean; requireApproval: boolean }): TxResult {
  if (t.permissionLevel === "EXECUTE" && !t.requireConfirmation && !t.requireApproval)
    return err("EXECUTE_REQUIRES_GUARD", "Tool permissionLevel=EXECUTE bắt buộc requireConfirmation hoặc requireApproval.");
  return { ok: true, status: "", action: "", reason: null, patch: {} };
}

// ---------- Đăng ký hệ thống AI vào danh mục (ETV.P29 mục 5.1.2, 5.1.3) ----------

/**
 * Chu kỳ rà soát tối đa cho từng mức tác động — ETV.P29 mục 5.1.3, cột "Kiểm soát bắt buộc":
 * Cao ≤ 06 tháng · Trung bình ≤ 01 năm · Thấp theo sự kiện.
 *
 * Xếp theo ĐỘ THƯA tăng dần để so sánh được bằng số. Không dùng chung thang với PERMISSION_RANK
 * hay ROLE_RANK: ba thang trả lời ba câu hỏi khác nhau, gộp lại là mời gọi so nhầm.
 */
const REVIEW_CYCLE_RANK: Record<AIReviewCycle, number> = {
  SIX_MONTHS: 1,
  ONE_YEAR: 2,
  BY_EVENT: 3,
};

const CHU_KY_TOI_DA: Record<string, AIReviewCycle> = {
  HIGH: "SIX_MONTHS",
  MEDIUM: "ONE_YEAR",
  LOW: "BY_EVENT",
};

export interface DangKyHeThongAI {
  riskLevel: string;
  personalData: boolean;
  reviewCycle: AIReviewCycle;
}

/**
 * Hai ràng buộc của mục 5.1.3 mà bản ghi danh mục phải thoả ngay từ lúc lập.
 *
 * Vì sao chặn ở đây chứ không để người soát xét bắt: PT.AI soát xét theo mục 5.1.6 bước 3 là chốt
 * NGƯỜI, đọc những thứ phần mềm không đọc được (mục đích sử dụng có thật không, cơ chế con người
 * trong vòng lặp có khả thi không). Hai điều dưới đây thì suy được thẳng từ bảng 5.1.3, để lọt
 * xuống chốt người chỉ làm chốt người bận với lỗi máy bắt được.
 *
 * KHÔNG tự sửa `riskLevel` cho khớp: mức tác động là kết luận của người lập hồ sơ, phần mềm chỉ
 * được từ chối bản khai mâu thuẫn, không được tự kết luận thay (mục 4.8).
 */
export function validateDangKyHeThongAI(a: DangKyHeThongAI): TxResult {
  if (a.personalData && a.riskLevel !== "HIGH")
    return err(
      "PERSONAL_DATA_REQUIRES_HIGH",
      "Hệ thống AI có xử lý dữ liệu cá nhân bắt buộc ở mức tác động Cao (ETV.P29 mục 5.1.3) — sửa mức tác động, hoặc bỏ đánh dấu dữ liệu cá nhân nếu khai nhầm."
    );

  const toiDa = CHU_KY_TOI_DA[a.riskLevel];
  if (toiDa && REVIEW_CYCLE_RANK[a.reviewCycle] > REVIEW_CYCLE_RANK[toiDa])
    return err(
      "REVIEW_CYCLE_TOO_SPARSE",
      a.riskLevel === "HIGH"
        ? "Mức tác động Cao bắt buộc rà soát ≤ 06 tháng (ETV.P29 mục 5.1.3)."
        : "Mức tác động Trung bình bắt buộc rà soát ≤ 01 năm (ETV.P29 mục 5.1.3)."
    );

  return { ok: true, status: "", action: "", reason: null, patch: {} };
}

/**
 * Nền tảng có được phép nhận tác tử mới không — ETV.P29 mục 5.1.1: bản ghi phải trỏ tới một mã
 * nền tảng đã đăng ký **và đang hiệu lực** tại ETV.MP35.
 *
 * Dùng cho cả ô chọn trên giao diện và chốt phía máy chủ, để hai nơi không lệch nhau về định
 * nghĩa "đang hiệu lực".
 */
export function nenTangNhanDuocTacTu(p: { approvalStatus: AIApprovalStatus }): boolean {
  return p.approvalStatus === "APPROVED" || p.approvalStatus === "ACTIVE";
}

// Tool Gateway: user có đủ quyền tối thiểu theo permissionLevel của Tool không.
export function hasToolPermission(role: M29Role | null, tool: { permissionLevel: AIPermissionLevel }): boolean {
  if (!role) return false;
  const minRole = TOOL_MIN_ROLE[tool.permissionLevel];
  return (ROLE_RANK[role] ?? 0) >= (ROLE_RANK[minRole] ?? 99);
}

// ---------- Gán kỹ năng và công cụ cho tác tử (ETV.P29 mục 5.4.1, 5.8) ----------

/**
 * Thứ bậc 4 mức quyền hành động của ETV.P29 mục 5.1.4 (Đọc < Tính toán < Đề xuất < Thực thi).
 *
 * KHÔNG dùng lẫn với `ROLE_RANK`/`TOOL_MIN_ROLE`: hai bảng kia trả lời "vai trò nào được gọi công
 * cụ này" và cố ý xếp Đề xuất ngang Thực thi (cùng cần AI_ADMIN). Bảng này trả lời "công cụ này
 * cho tác tử làm được tới đâu" — Thực thi phải đứng trên Đề xuất, vì chỉ nó ghi được dữ liệu có
 * hiệu lực nghiệp vụ.
 */
export const PERMISSION_RANK: Record<AIPermissionLevel, number> = {
  READ: 1,
  COMPUTE: 2,
  PROPOSE: 3,
  EXECUTE: 4,
};

export interface ToolChoCap {
  id: string;
  name: string;
  status: AIOpStatus;
  permissionLevel: AIPermissionLevel;
}

/** Mức quyền hành động cao nhất một whitelist cho phép. Whitelist rỗng ⇒ 0, tác tử không làm gì được. */
export function mucQuyenCaoNhat(tools: { permissionLevel: AIPermissionLevel }[]): number {
  return tools.reduce((max, t) => Math.max(max, PERMISSION_RANK[t.permissionLevel] ?? 0), 0);
}

export interface GanCongCuInput {
  /** Lý do — chỉ bắt buộc ở nhánh nâng quyền (thay đổi lớn). */
  lyDo: string;
  /** Công cụ đang trong whitelist. */
  truoc: ToolChoCap[];
  /** Công cụ sau khi gán — danh sách ĐẦY ĐỦ, không phải phần thêm vào. */
  sau: ToolChoCap[];
}

/**
 * Điều kiện được đổi whitelist công cụ của tác tử.
 *
 * Chốt nghiệp vụ duy nhất ở đây: ETV.P29 mục 5.8 xếp "nâng mức quyền hành động" vào **thay đổi
 * lớn** — phải lập lại AIA và đánh giá chất lượng, LĐV phê duyệt. Bỏ bớt công cụ hoặc thêm công
 * cụ mức không cao hơn thì không chạm tới trần quyền của tác tử nên đi nhánh thay đổi nhỏ (ghi
 * nhật ký là đủ, mục 5.4.1).
 *
 * Như `kiemTraDoiMoHinh`, hàm này KHÔNG quyết định hệ quả ghi CSDL (tạm dừng tác tử, gắn cờ AIA)
 * — đó là việc của actions.ts; ở đây chỉ trả lời được đổi hay không và đổi thuộc loại nào.
 */
export function kiemTraGanCongCu(input: GanCongCuInput): TxResult {
  const { lyDo, truoc, sau } = input;

  const idTruoc = new Set(truoc.map((t) => t.id));
  const idSau = new Set(sau.map((t) => t.id));
  if (idTruoc.size === idSau.size && [...idSau].every((id) => idTruoc.has(id)))
    return err("NO_CHANGE", "Danh sách công cụ không đổi.");

  // Công cụ đang Vô hiệu hóa: cổng chặn ở bước (4) nên gán vào chỉ tạo whitelist ảo — danh sách
  // trông như tác tử dùng được, thực tế mọi lời gọi đều hỏng. Chỉ chặn công cụ MỚI thêm: công cụ
  // đã nằm sẵn trong whitelist rồi bị vô hiệu hóa sau đó là chuyện của vòng đời công cụ, không
  // được biến thành lỗi khoá cứng màn hình này.
  const themMoiHong = sau.find((t) => !idTruoc.has(t.id) && t.status !== "ACTIVE");
  if (themMoiHong)
    return err("TOOL_NOT_ACTIVE", `Công cụ "${themMoiHong.name}" không ở trạng thái Hoạt động — Tool Gateway sẽ chặn ngay tại cổng, gán vào whitelist không làm nó chạy được.`);

  const mucTruoc = mucQuyenCaoNhat(truoc);
  const mucSau = mucQuyenCaoNhat(sau);
  const nangQuyen = mucSau > mucTruoc;

  if (nangQuyen && lyDo.trim().length < 10)
    return err(
      "REASON_REQUIRED",
      "Ghi lý do (tối thiểu 10 ký tự): thêm công cụ này nâng mức quyền hành động của tác tử — thay đổi lớn theo ETV.P29 mục 5.8, phải truy được về sau."
    );

  return ok(nangQuyen ? "SUSPENDED" : "UNCHANGED", nangQuyen ? "Nâng mức quyền công cụ" : "Đổi danh sách công cụ", lyDo.trim() || null, {
    toolIds: sau.map((t) => t.id),
    nangQuyen,
    mucTruoc,
    mucSau,
  });
}

// ---------- Increment 4 — Phiếu sự cố AI (ETV.P29 mục 5.7.3, 6.3) ----------

export interface IncidentForRules {
  status: AIIncidentStatus;
  severity: AIIncidentSeverity;
  detectedById: string;
  containmentAction: string;
  affectsIssuedResult: boolean;
  sensitiveDataExposed: boolean;
}

export const incidentTransitions = {
  /** Mới → Đang xử lý. Bắt buộc đã ghi biện pháp khống chế ("khống chế trước" — P29 5.7.3 bước 1). */
  start(inc: IncidentForRules, extra: { containmentAction?: string } = {}): TxResult {
    if (inc.status !== "NEW") return err("BAD_STATE", "Chỉ phiếu Mới mới chuyển sang Đang xử lý được.");
    const containment = extra.containmentAction ?? inc.containmentAction;
    if (!containment.trim()) return err("CONTAINMENT_REQUIRED", "Bắt buộc ghi biện pháp khống chế đã thực hiện trước khi chuyển sang Đang xử lý.");
    return ok("IN_PROGRESS", "Bắt đầu xử lý", null, { containmentAction: containment });
  },

  submit(inc: IncidentForRules): TxResult {
    if (inc.status !== "IN_PROGRESS") return err("BAD_STATE", "Chỉ phiếu Đang xử lý mới trình xác nhận được.");
    return ok("PENDING_CONFIRMATION", "Trình xác nhận");
  },

  /**
   * Chờ xác nhận → Đã đóng. Gom đủ 5 ràng buộc của P29 mục 5.7.3:
   * (1) người phát hiện không tự đóng · (2) sự cố Nghiêm trọng chỉ LĐV (SUPER_ADMIN) đóng ·
   * (3) Nghiêm trọng/Đáng kể bắt buộc mã KPH · (4) lộ dữ liệu nhạy cảm bắt buộc số phiếu F28.03 ·
   * (5) ảnh hưởng kết quả đã phát hành bắt buộc mã hồ sơ MP10/MP11.
   */
  close(
    inc: IncidentForRules,
    user: { id: string; role: M29Role | null },
    extra: { capRef?: string; f28Ref?: string; issuedResultRef?: string; closureNote?: string } = {}
  ): TxResult {
    if (inc.status !== "PENDING_CONFIRMATION") return err("BAD_STATE", "Chỉ phiếu Chờ xác nhận mới đóng được.");
    if (user.id === inc.detectedById)
      return err("SELF_CLOSE_FORBIDDEN", "Người phát hiện hoặc liên quan trực tiếp tới sự cố không được kết luận và đóng chính sự cố đó (ETV.P29 mục 5.7.3).");
    if (inc.severity === "SEVERE" && user.role !== "SUPER_ADMIN")
      return err("APPROVER_ROLE_REQUIRED", "Sự cố mức Nghiêm trọng chỉ Lãnh đạo Viện (SUPER_ADMIN) được kết luận và đóng.");
    if ((["SEVERE", "SIGNIFICANT"] as AIIncidentSeverity[]).includes(inc.severity) && !extra.capRef?.trim())
      return err("CAP_REQUIRED", "Sự cố mức Nghiêm trọng/Đáng kể bắt buộc lập KPH theo ETV.MP13 — nhập mã phiếu KPH.");
    if (inc.sensitiveDataExposed && !extra.f28Ref?.trim())
      return err("F28_REQUIRED", "Sự cố có lộ dữ liệu Hạn chế/Mật hoặc dữ liệu cá nhân bắt buộc có số phiếu ETV.P.F28.03 (xử lý đồng thời theo ETV.MP28).");
    if (inc.affectsIssuedResult && !extra.issuedResultRef?.trim())
      return err("ISSUED_RESULT_REF_REQUIRED", "Sự cố ảnh hưởng kết quả/chứng chỉ đã phát hành bắt buộc ghi mã hồ sơ đã xử lý theo ETV.MP10/MP11.");
    return ok("CLOSED", "Đóng sự cố", extra.closureNote ?? null, {
      capRef: extra.capRef ?? null,
      f28Ref: extra.f28Ref ?? null,
      issuedResultRef: extra.issuedResultRef ?? null,
      closureNote: extra.closureNote ?? null,
      closedById: user.id,
    });
  },

  cancel(inc: IncidentForRules, user: { role: M29Role | null }, extra: { reason?: string } = {}): TxResult {
    if (inc.status === "CLOSED" || inc.status === "CANCELLED") return err("BAD_STATE", "Phiếu đã kết thúc, không hủy được.");
    if (user.role !== "SUPER_ADMIN") return err("APPROVER_ROLE_REQUIRED", "Chỉ Lãnh đạo Viện (SUPER_ADMIN) được hủy phiếu sự cố.");
    if (!extra.reason?.trim()) return err("REASON_REQUIRED", "Hủy phiếu bắt buộc ghi lý do.");
    return ok("CANCELLED", "Hủy phiếu", extra.reason, { cancelReason: extra.reason });
  },
};

// ---------- Increment 4 — Hệ thống AI chưa đăng ký (ETV.P29 mục 5.1.7) ----------

export interface SightingForRules {
  status: AIUnregisteredStatus;
  sensitiveData: boolean;
  incidentId: string | null;
}

export const unregisteredTransitions = {
  startRegistering(s: SightingForRules): TxResult {
    if (s.status !== "OPEN") return err("BAD_STATE", "Chỉ bản ghi Mới phát hiện mới chuyển sang Đang hoàn thiện đăng ký được.");
    return ok("REGISTERING", "Bắt đầu hoàn thiện hồ sơ đăng ký");
  },

  /** Đóng bằng "Đã đăng ký" — bắt buộc trỏ tới Agent đã đăng ký thật trong danh mục. */
  markRegistered(s: SightingForRules, extra: { registeredAgentId?: string } = {}): TxResult {
    if (s.status === "REGISTERED" || s.status === "DISCONTINUED") return err("BAD_STATE", "Bản ghi đã kết thúc.");
    if (!extra.registeredAgentId) return err("AGENT_REQUIRED", "Đóng bằng Đã đăng ký bắt buộc chọn Agent tương ứng đã có trong danh mục hệ thống AI.");
    if (s.sensitiveData && !s.incidentId)
      return err("INCIDENT_REQUIRED", "Hệ thống AI này đã xử lý dữ liệu Hạn chế/Mật hoặc dữ liệu cá nhân — bắt buộc mở phiếu sự cố (ETV.P29 mục 5.1.7) trước khi đóng bản ghi.");
    return ok("REGISTERED", "Đã hoàn thiện đăng ký", null, { registeredAgentId: extra.registeredAgentId });
  },

  discontinue(s: SightingForRules, extra: { reason?: string } = {}): TxResult {
    if (s.status === "REGISTERED" || s.status === "DISCONTINUED") return err("BAD_STATE", "Bản ghi đã kết thúc.");
    if (!extra.reason?.trim()) return err("REASON_REQUIRED", "Chấm dứt sử dụng bắt buộc ghi lý do.");
    if (s.sensitiveData && !s.incidentId)
      return err("INCIDENT_REQUIRED", "Hệ thống AI này đã xử lý dữ liệu Hạn chế/Mật hoặc dữ liệu cá nhân — bắt buộc mở phiếu sự cố trước khi đóng bản ghi.");
    return ok("DISCONTINUED", "Chấm dứt sử dụng", extra.reason, { closeReason: extra.reason });
  },
};

// ---------- Đổi mô hình của tác tử (ETV.P29 §5.8 — thay đổi lớn) ----------

export interface DoiMoHinhInput {
  /** Lý do đổi — bắt buộc, vì đây là thay đổi phải truy được về sau. */
  lyDo: string;
  agent: { platformId: string; modelId: string | null };
  platform: { id: string; code: string; approvalStatus: AIApprovalStatus };
  model: { id: string; modelId: string; status: AIOpStatus; providerCode: string; providerPlatformId: string | null };
}

/**
 * Điều kiện được đổi mô hình. Tách khỏi actions.ts để kiểm được bằng test thuần, không cần DB —
 * đúng ranh giới "rules quyết định, actions ghi DB" của module này.
 *
 * KHÔNG quyết định hệ quả (tạm dừng tác tử, đưa AIA về Cần rà soát lại) — đó là việc ghi dữ liệu,
 * nằm ở actions.ts; ở đây chỉ trả lời được phép đổi hay không.
 */
export function kiemTraDoiMoHinh(input: DoiMoHinhInput): TxResult {
  const { lyDo, agent, platform, model } = input;

  if (lyDo.trim().length < 10)
    return err("REASON_REQUIRED", "Ghi lý do đổi mô hình (tối thiểu 10 ký tự) — đây là thay đổi lớn theo ETV.P29 §5.8, phải truy được về sau.");

  // Cùng điều kiện như khi đăng ký công cụ (ETV.P35 §6.7): chỉ nền tảng đã phê duyệt hoặc đang
  // vận hành mới được nhận lưu lượng thật.
  if (platform.approvalStatus !== "APPROVED" && platform.approvalStatus !== "ACTIVE")
    return err("PLATFORM_NOT_APPROVED", `Nền tảng "${platform.code}" chưa được phê duyệt hoặc đã dừng — chỉ nền tảng Đã phê duyệt hoặc Hiệu lực mới nhận được lưu lượng.`);

  if (model.status !== "ACTIVE") return err("MODEL_DISABLED", `Model "${model.modelId}" không ở trạng thái Hoạt động — không dùng cho vận hành được.`);

  // Model phải thuộc nhà cung cấp gắn ĐÚNG nền tảng đang chọn. Không kiểm thì tạo được cặp "gọi
  // máy chủ A bằng tên model của máy chủ B" — lỗi đó chỉ lộ ra ở lượt gọi thật.
  if (!model.providerPlatformId)
    return err("PROVIDER_NO_PLATFORM", `Nhà cung cấp "${model.providerCode}" chưa gắn nền tảng nào — gắn ở trang Danh mục trước.`);
  if (model.providerPlatformId !== platform.id)
    return err("MODEL_PLATFORM_MISMATCH", `Model "${model.modelId}" thuộc nhà cung cấp "${model.providerCode}", nhà cung cấp đó gắn với nền tảng khác — chọn model của đúng nền tảng "${platform.code}".`);

  if (agent.platformId === platform.id && agent.modelId === model.id) return err("NO_CHANGE", "Tác tử đang chạy đúng nền tảng và model này rồi.");

  // Tạm dừng ngay là một phần của quy tắc, không phải tùy chọn của người bấm: AIA hiện có mô tả
  // hệ thống AI cũ, nên từ giây phút đổi mô hình nó không còn chống lưng cho tác tử nữa.
  return ok("SUSPENDED", "Đổi mô hình", lyDo.trim(), { platformId: platform.id, modelId: model.id });
}
