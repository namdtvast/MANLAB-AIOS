// HDSD — hướng dẫn sử dụng tuần tự của một module, hiển thị trong khung Căn cứ
// (<CanCuBanner>) ở đầu mọi trang module.
//
// Nguồn sự thật là file 05_MODULE_LIBRARY/Mxx_Slug/04_UI/HDSD.yaml của chính module —
// HDSD là hướng dẫn thao tác trên MÀN HÌNH nên thuộc tầng 05 (số hóa), không phải
// khối `document` của thủ tục ở tầng 04. prisma/seed.ts đọc file đó, kiểm tra bằng
// parseHdsd() rồi nạp vào PlatformModule.hdsd; lúc chạy UI chỉ đọc DB, KHÔNG đọc
// filesystem (đọc repo lúc chạy khiến Next đóng gói cả repo vào bundle deploy).
//
// File này CỐ Ý không import "node:fs": nó được cả seed (Node) lẫn React Server
// Component dùng chung, chỉ chứa kiểu dữ liệu + hàm thuần.

export const HDSD_SCHEMA = "manlab-aios/hdsd@1.0";

/** Một bước thao tác: ai làm — làm gì — ở màn hình nào — vướng gì thì tra đâu. */
export interface HdsdStep {
  /** Vai trò thực hiện, ghi bằng nhãn đọc được, vd "Quản lý chất lượng (QLCL)". */
  role: string;
  /** Việc phải làm, viết ở thể mệnh lệnh, vd "Lập kỳ xem xét bối cảnh". */
  action: string;
  /** Đường dẫn trong nền tảng để bấm thẳng tới màn hình đó (nếu có). */
  path: string | null;
  /** Ràng buộc/điều kiện chặn của bước — chắt từ rules.ts và thủ tục, không tự đặt. */
  note: string | null;
}

export interface Hdsd {
  /** Một câu: module này dùng khi nào. */
  summary: string | null;
  steps: HdsdStep[];
  /** Lưu ý chung không gắn với bước nào (vd tách vai trò, biểu mẫu xuất ra). */
  tips: string[];
}

function asRecord(value: unknown, what: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${what} phải là một khối YAML dạng khóa–giá trị.`);
  }
  return value as Record<string, unknown>;
}

function requireText(value: unknown, what: string): string {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${what} bắt buộc và không được để trống.`);
  return value.trim();
}

function optionalText(value: unknown, what: string): string | null {
  if (value === undefined || value === null) return null;
  if (typeof value !== "string") throw new Error(`${what} phải là chuỗi.`);
  return value.trim() || null;
}

/**
 * Đọc một khối HDSD.yaml đã parse sang object và chuẩn hóa về kiểu Hdsd.
 * Ném lỗi (không trả null) khi file sai lược đồ: HDSD hỏng là lỗi soạn thảo trong repo,
 * phải chặn ngay lúc seed thay vì để trang module hiển thị hướng dẫn cụt.
 */
export function parseHdsd(raw: unknown, moduleCode: string): Hdsd {
  const doc = asRecord(raw, "HDSD");

  if (doc.schema !== HDSD_SCHEMA) {
    throw new Error(`khóa \`schema\` phải là "${HDSD_SCHEMA}" (đang là ${JSON.stringify(doc.schema)}).`);
  }
  // Chặn lỗi phổ biến nhất khi soạn: chép HDSD của module khác rồi quên sửa mã.
  if (doc.module !== moduleCode) {
    throw new Error(`khóa \`module\` là ${JSON.stringify(doc.module)} nhưng file nằm trong thư mục ${moduleCode}.`);
  }

  if (!Array.isArray(doc.steps) || doc.steps.length === 0) {
    throw new Error("khóa `steps` bắt buộc và phải có ít nhất 1 bước.");
  }

  const steps: HdsdStep[] = doc.steps.map((s, i) => {
    const stt = i + 1;
    const step = asRecord(s, `bước ${stt}`);
    const path = optionalText(step.path, `\`path\` của bước ${stt}`);
    // path trỏ sang module khác nghĩa là chép nhầm hoặc gõ nhầm mã — bắt tại chỗ.
    if (path && !path.startsWith(`/modules/${moduleCode}`)) {
      throw new Error(`\`path\` của bước ${stt} ("${path}") phải bắt đầu bằng /modules/${moduleCode}.`);
    }
    return {
      role: requireText(step.role, `\`role\` của bước ${stt}`),
      action: requireText(step.action, `\`action\` của bước ${stt}`),
      path,
      note: optionalText(step.note, `\`note\` của bước ${stt}`),
    };
  });

  const rawTips = doc.tips ?? [];
  if (!Array.isArray(rawTips)) throw new Error("khóa `tips` phải là danh sách.");
  const tips = rawTips.map((t, i) => requireText(t, `lưu ý thứ ${i + 1}`));

  return { summary: optionalText(doc.summary, "khóa `summary`"), steps, tips };
}
