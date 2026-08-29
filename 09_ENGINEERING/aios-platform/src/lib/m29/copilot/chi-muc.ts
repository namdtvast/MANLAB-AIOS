// Danh sách mã tài liệu THẬT SỰ tra cứu được — dùng để lọc gợi ý câu hỏi của khay Copilot.
//
// VÌ SAO CẦN: gợi ý sinh từ PlatformModule.docId (khai trong danh mục module), còn câu trả lời
// lại lấy từ chỉ mục CopilotDocChunk. Hai nguồn này KHÔNG trùng nhau — script nạp chỉ mục bỏ qua
// mọi thủ tục chưa ở trạng thái Đã phê duyệt (fail-closed theo ETV.P26 §5.5), nên một module
// hoàn toàn có thể khai docId trỏ tới thủ tục đang soát xét. Đo ngày 29/08/2026: 9 trong 24
// module có docId rơi vào trường hợp này (M29–M35, M37, M38), trong đó M29, M33, M34 đang bật.
// Không lọc thì khay mời người dùng bấm đúng một câu mà gateway chắc chắn từ chối bằng
// "Không tìm thấy căn cứ trong hệ thống tài liệu của Viện." — mất niềm tin vô cớ, và mỗi lượt
// còn để lại một trace từ chối vô nghĩa trong M29.
//
// LỌC THEO ĐÚNG MỨC BẢO MẬT mà nền tảng của chính agent Copilot được nhận (mucDuocGui), không
// phải chỉ so đường dẫn: một nền tảng "rời hạ tầng, KHÔNG cam kết" chỉ đọc tới mức Công khai, nên
// gợi ý cũng không được hứa những tài liệu Nội bộ mà nó không bao giờ với tới.
import { prisma } from "@/lib/prisma";
import { COPILOT_AGENT_CODE } from "./hang-so";
import { mucDuocGui } from "./retrieval";
import { maTaiLieuTuDuongDan } from "./goi-y";

/**
 * Mã tài liệu (ETV.Pxx / ETV.QM / ETV.P.Fxx.xx) có mặt trong chỉ mục và nằm trong tầm đọc của
 * Copilot. Chỉ mục rỗng hoặc chưa khai agent ⇒ mảng rỗng ⇒ mọi gợi ý bám mã thủ tục đều bị lọc
 * đi: đúng, vì lúc đó Copilot thật sự không tra cứu được gì.
 */
export async function maTaiLieuTraCuuDuoc(): Promise<string[]> {
  const agent = await prisma.aIAgent.findUnique({
    where: { code: COPILOT_AGENT_CODE },
    select: { platform: { select: { dataBoundary: true } } },
  });
  if (!agent) return [];

  const rows = await prisma.copilotDocChunk.findMany({
    where: { securityLevel: { in: mucDuocGui(agent.platform.dataBoundary) } },
    distinct: ["path"],
    select: { path: true },
  });

  return [...new Set(rows.map((r) => maTaiLieuTuDuongDan(r.path)).filter((m): m is string => Boolean(m)))];
}
