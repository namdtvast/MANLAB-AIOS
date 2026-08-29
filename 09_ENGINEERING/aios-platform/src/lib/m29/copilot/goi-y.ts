// Gợi ý câu hỏi cho khay Copilot — thuần, không I/O, có test.
//
// NGUYÊN TẮC: mọi gợi ý phải sinh từ DỮ LIỆU THẬT của module hoặc từ NGUỒN ĐÃ ĐƯỢC DẪN, không
// viết cứng 38 module × 3 câu ở giao diện. Viết cứng là nhân bản tri thức đã có trong
// PlatformModule (vốn seed từ 04_PROCESS_LIBRARY/MPxx/manifest.yaml) sang chỗ thứ hai, và chỗ
// thứ hai sẽ lệch ngay lần đổi tên module đầu tiên.

/** Phần dữ liệu module mà khay Copilot cần — giữ tối thiểu vì nó đi kèm mọi trang. */
export interface ModuleGoiY {
  code: string;
  name: string;
  /** Mã thủ tục ETV.Pxx; null khi MP đó chưa ban hành thủ tục. */
  docId: string | null;
}

/** Gợi ý mặc định khi người dùng không đứng ở trang module nào. */
export const GOI_Y_CHUNG = [
  "Phát hiện công việc không phù hợp thì làm theo thủ tục nào, biểu mẫu gì?",
  "Thủ tục kiểm soát tài liệu quy định gì về ban hành lại?",
  "Module nào số hóa thủ tục đảm bảo giá trị sử dụng kết quả?",
];

/** Rút mã module từ đường dẫn: "/modules/M13/incidents" → "M13". */
export function maModuleTuDuongDan(pathname: string | null): string | null {
  return /\/modules\/(M\d{2})(\/|$)/.exec(pathname ?? "")?.[1] ?? null;
}

/**
 * Gợi ý theo module đang mở. Ba câu bám ba thứ người dùng hay cần nhất khi đứng trong một module:
 * thủ tục gốc, biểu mẫu phải dùng, và ai chịu trách nhiệm.
 *
 * `maTraCuuDuoc` là các mã tài liệu CÓ THẬT trong chỉ mục Copilot (xem chi-muc.ts). Tham số này
 * BẮT BUỘC chứ không tùy chọn: chỉ cần một nơi gọi quên truyền là khay lại mời người dùng bấm
 * câu hỏi mà gateway chắc chắn từ chối — đúng lỗi mà hàm này đang sửa. Khai báo docId trong danh
 * mục module KHÔNG đồng nghĩa thủ tục đó tra cứu được: thủ tục chưa phê duyệt không vào chỉ mục.
 */
export function goiYTheoModule(mod: ModuleGoiY | null | undefined, maTraCuuDuoc: ReadonlySet<string>): string[] {
  if (!mod) return GOI_Y_CHUNG;
  const ten = mod.name.trim();
  // Không tra được thủ tục thì KHÔNG nhắc mã thủ tục trong gợi ý. Ba câu thay thế đều nhắm vào
  // Hub MP và đặc tả module — hai lớp không đòi trạng thái phê duyệt nên luôn có trong chỉ mục.
  if (!mod.docId || !maTraCuuDuoc.has(mod.docId))
    return [
      `Module ${mod.code} số hóa thủ tục nào?`,
      `${ten} gồm những nội dung gì?`,
      `${ten} liên quan tới những module nào khác?`,
    ];
  return [
    `Thủ tục ${mod.docId} quy định những gì?`,
    `${ten} dùng những biểu mẫu nào?`,
    `Ai chịu trách nhiệm phê duyệt trong ${mod.docId}?`,
  ];
}

/** Rút mã tài liệu từ đường dẫn repo: ".../ETV.P13_KhacPhuc.md" → "ETV.P13". */
export function maTaiLieuTuDuongDan(path: string): string | null {
  return /\/(ETV\.(?:P\d{2}|QM|P\.F\d{2}\.\d{2}))[._]/.exec(path)?.[1] ?? null;
}

/**
 * Gợi ý tiếp theo, sinh từ CHÍNH các nguồn mà câu trả lời vừa dẫn.
 *
 * Cố ý KHÔNG hỏi mô hình sinh gợi ý: tốn thêm một lượt gọi, và gợi ý do mô hình bịa ra sẽ dẫn
 * người dùng tới những tài liệu không tồn tại — đúng thứ cả hệ thống này đang chống. Sinh từ
 * nguồn đã dẫn thì gợi ý luôn trỏ tới tài liệu có thật.
 *
 * Không có trích dẫn nào (lượt bị từ chối) ⇒ không gợi ý gì: không có gì để đi tiếp.
 */
export function goiYTiepTheo(citations: { path: string }[], daHoi: string[] = []): string[] {
  const ma = [...new Set(citations.map((c) => maTaiLieuTuDuongDan(c.path)).filter((m): m is string => Boolean(m)))];
  if (!ma.length) return [];
  const daHoiChuan = new Set(daHoi.map((q) => q.trim().toLowerCase()));
  const ra: string[] = [];
  for (const m of ma) {
    for (const mau of [`${m} dùng những biểu mẫu nào?`, `Ai phê duyệt trong ${m}?`, `Hồ sơ theo ${m} lưu bao lâu?`]) {
      if (ra.length >= 3) break;
      if (!daHoiChuan.has(mau.toLowerCase())) ra.push(mau);
    }
    if (ra.length >= 3) break;
  }
  return ra;
}
