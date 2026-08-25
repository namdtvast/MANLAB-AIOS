// M29 — ĐIỂM CƯỠNG CHẾ guardrail lúc chạy.
//
// Trước increment này, AIGuardrail chỉ là bản ghi khai báo: Tool Gateway gán cứng
// guardrailResult = "PASS" mà không đọc bảng nào (RECON F8 trong
// _meta/specs/20260825-ai-copilot-tra-cuu/spec.md). File này bổ sung phần còn thiếu: bản ghi
// AIGuardrail quyết định guardrail nào CÓ HIỆU LỰC và hành động ra sao; mã nguồn chỉ cung cấp
// phép phát hiện tương ứng với từng mã.
//
// Hệ quả cố ý: tắt một guardrail là việc quản trị (đổi approvalStatus trong M29), không phải
// việc sửa mã. Ngược lại, thêm bản ghi có mã lạ thì không có phép phát hiện nào chạy — bản ghi
// đó được báo là KHÔNG CƯỠNG CHẾ ĐƯỢC thay vì im lặng bỏ qua.
import { prisma } from "@/lib/prisma";
import type { AIGuardrailAction } from "@/generated/prisma/enums";

export type GuardrailStage = "input" | "output";

export interface ActiveGuardrail {
  code: string;
  description: string;
  severity: string;
  action: AIGuardrailAction;
}

export interface GuardrailHit {
  code: string;
  action: AIGuardrailAction;
  reason: string;
}

export interface GuardrailDecision {
  blocked: boolean;
  hits: GuardrailHit[];
  /** Giá trị ghi vào AIRequest.guardrailResult — "PASS" hoặc "BLOCK:MÃ" / "WARN:MÃ". */
  result: string;
}

export interface OutputContext {
  text: string;
  citationCount: number;
}

// ---- Phép phát hiện theo mã guardrail (spec §6) ----

const PII_PATTERNS: { label: string; re: RegExp }[] = [
  // Số CCCD 12 số / CMND 9 số đứng riêng. Không bắt chuỗi số dài hơn (mã hồ sơ, số máy).
  { label: "số CCCD/CMND", re: /(?<!\d)\d{9}(?!\d)|(?<!\d)\d{12}(?!\d)/ },
  { label: "số điện thoại", re: /(?<!\d)(?:\+84|0)(?:\d[ .-]?){8,9}\d(?!\d)/ },
  { label: "địa chỉ thư điện tử", re: /[\w.+-]+@[\w-]+\.[\w.-]+/ },
];

// Câu hỏi đòi AI TỰ kết luận đo lường hoặc TỰ phê duyệt — ranh giới ISO/IEC 42001 ở spec §2.2.
//
// Khó ở chỗ phân biệt "làm hộ tôi" với "tra giúp tôi quy định về việc đó": cả hai đều chứa cùng
// những động từ. Bốn dấu hiệu dưới đây là dấu hiệu của MỆNH LỆNH, không phải của câu hỏi tra cứu.
// Chặn nhầm câu tra cứu là hỏng đúng công dụng của Copilot, nên khi phân vân thì CHO QUA — lớp
// bảo vệ thật nằm ở prompt hệ thống (quy tắc 4) và ở chỗ Copilot không có quyền ghi gì cả.
//
// KHÔNG dùng \b trong các mẫu tiếng Việt: \b của JavaScript chỉ biết ký tự ASCII, nên "đạt" (bắt
// đầu bằng "đ") và "gì" (kết thúc bằng "ì") không bao giờ khớp được \b. Dùng lookaround theo
// \p{L}\p{N} với cờ `u` thay thế.
const W = "\\p{L}\\p{N}";
/** Bọc một nhánh chọn thành mẫu có ranh giới từ hiểu được chữ có dấu. */
const vi = (src: string, prefix = "", suffix = "") =>
  new RegExp(`${prefix}(?<![${W}])(?:${src})(?![${W}])${suffix}`, "iu");
/** Như trên nhưng neo ở đầu câu (mệnh lệnh). */
const viStart = (src: string) => new RegExp(`^\\s*(?:hãy\\s+|làm ơn\\s+)?(?:${src})(?![${W}])`, "iu");

/** Từ để hỏi tra cứu — có mặt thì câu đó là câu hỏi về quy định, không phải lệnh sai việc. */
const LOOKUP_INTERROGATIVE = vi("nào|gì|đâu|thế nào|ra sao|khi nào|ai|bao giờ|mấy|bao nhiêu");

const ACT_VERB = "kết luận|phán quyết|phê duyệt|ký duyệt|ký thay|duyệt|cấp|phát hành|ban hành";
const OBJECT = "kết quả|mẫu|thiết bị|lô|hồ sơ|phép đo|số liệu";

const SCOPE_PATTERNS: { label: string; re: RegExp; skipWhenLookup?: boolean }[] = [
  {
    // Mệnh lệnh đầu câu: "Cấp chứng chỉ cho lô này", "Phê duyệt hồ sơ này".
    label: "câu lệnh yêu cầu AI tự kết luận hoặc tự phê duyệt",
    re: viStart(ACT_VERB),
    skipWhenLookup: true,
  },
  {
    // Nhờ làm hộ: "… phê duyệt hộ tôi", "kết luận giúp em".
    label: "yêu cầu AI làm thay việc kết luận/phê duyệt",
    re: new RegExp(`(?<![${W}])(?:${ACT_VERB}|đánh giá)(?![${W}])[^.?!]{0,30}?(?<![${W}])(?:giúp|hộ|thay)(?![${W}])`, "iu"),
  },
  {
    // "Hãy kết luận…" ở giữa câu.
    label: "yêu cầu AI tự kết luận",
    re: new RegExp(`(?<![${W}])hãy\\s+(?:${ACT_VERB}|quyết định)(?![${W}])`, "iu"),
  },
  {
    // Hỏi phán quyết trực tiếp trên một đối tượng cụ thể: "Kết quả này có đạt không?".
    label: "yêu cầu phán quyết đạt/không đạt trên một hồ sơ cụ thể",
    re: new RegExp(
      `(?<![${W}])(?:${OBJECT})\\s+(?:này|trên|đó)(?![${W}])[^.?!]{0,40}(?<![${W}])(?:đạt|không đạt|phù hợp|không phù hợp)(?![${W}])`,
      "iu"
    ),
  },
];

type Detector = (ctx: OutputContext) => string | null;

interface DetectorSpec {
  stage: GuardrailStage;
  detect: Detector;
}

const DETECTORS: Record<string, DetectorSpec> = {
  "GR-PII-OUT": {
    stage: "input",
    detect: ({ text }) => {
      const hit = PII_PATTERNS.find((p) => p.re.test(text));
      return hit ? `Câu hỏi chứa ${hit.label} — dữ liệu cá nhân không được gửi ra dịch vụ mô hình bên ngoài (ETV.P29 §5.5).` : null;
    },
  },
  "GR-SCOPE": {
    stage: "input",
    detect: ({ text }) => {
      const isLookup = LOOKUP_INTERROGATIVE.test(text);
      const hit = SCOPE_PATTERNS.find((p) => (p.skipWhenLookup && isLookup ? false : p.re.test(text)));
      return hit
        ? `Câu hỏi thuộc nhóm "${hit.label}" — AI không được ra kết luận đo lường hay phê duyệt hồ sơ/chứng chỉ (ISO/IEC 42001, ETV.P29).`
        : null;
    },
  },
  "GR-NO-SOURCE": {
    stage: "output",
    detect: ({ citationCount }) =>
      citationCount > 0 ? null : "Câu trả lời không dẫn được tài liệu nào trong hệ thống của Viện.",
  },
};

/** Mã guardrail có bản ghi trong CSDL nhưng không có phép phát hiện nào trong mã nguồn. */
export function unenforceableCodes(rails: ActiveGuardrail[]): string[] {
  return rails.filter((g) => !DETECTORS[g.code]).map((g) => g.code);
}

/**
 * Guardrail đang có hiệu lực với một Agent: phạm vi SYSTEM (áp cho mọi Agent) hoặc AGENT trỏ
 * đúng Agent đó, và phải ở trạng thái Đã phê duyệt — bản ghi nháp không cưỡng chế gì.
 */
export async function loadActiveGuardrails(agentId: string): Promise<ActiveGuardrail[]> {
  const rows = await prisma.aIGuardrail.findMany({
    where: {
      approvalStatus: { in: ["APPROVED", "ACTIVE"] },
      OR: [{ scope: "SYSTEM" }, { scope: "AGENT", scopeRef: agentId }],
    },
    select: { code: true, description: true, severity: true, action: true },
  });
  return rows;
}

function decide(rails: ActiveGuardrail[], stage: GuardrailStage, ctx: OutputContext): GuardrailDecision {
  const hits: GuardrailHit[] = [];
  for (const rail of rails) {
    const spec = DETECTORS[rail.code];
    if (!spec || spec.stage !== stage) continue;
    const reason = spec.detect(ctx);
    if (reason) hits.push({ code: rail.code, action: rail.action, reason });
  }
  // REQUIRE_CONFIRMATION/REQUIRE_APPROVAL không có nghĩa với một trợ lý chỉ-đọc: không có thao
  // tác nào để xác nhận. Xử như BLOCK để fail-closed thay vì lặng lẽ cho qua.
  const blocking = hits.filter((h) => h.action !== "WARN");
  const result = blocking.length ? `BLOCK:${blocking[0].code}` : hits.length ? `WARN:${hits[0].code}` : "PASS";
  return { blocked: blocking.length > 0, hits, result };
}

export function enforceInput(text: string, rails: ActiveGuardrail[]): GuardrailDecision {
  return decide(rails, "input", { text, citationCount: 0 });
}

export function enforceOutput(ctx: OutputContext, rails: ActiveGuardrail[]): GuardrailDecision {
  return decide(rails, "output", ctx);
}
