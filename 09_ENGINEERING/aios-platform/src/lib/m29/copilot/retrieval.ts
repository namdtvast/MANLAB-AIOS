// Truy hồi ngữ cảnh cho Copilot — spec §5.
//
// Chỉ đọc bảng CopilotDocChunk (tài liệu đã ban hành, mức Công khai/Nội bộ). KHÔNG truy vấn bất
// kỳ bảng nghiệp vụ nào (M01…M38): phạm vi Increment 1 cố ý không cho Copilot chạm dữ liệu
// khách hàng, kết quả đo hay nhân sự.
//
// Lọc securityLevel LẶP LẠI ở đây dù script nạp chỉ mục đã lọc: phòng thủ nhiều lớp cho E1/E4 —
// nếu một bản ghi sai mức lọt vào bảng thì truy hồi vẫn không lấy ra. Lớp lọc này còn áp thêm
// TRẦN theo nhà cung cấp mô hình đang dùng (§5.5) — xem mucBaoMatToiDa().
import { prisma } from "@/lib/prisma";
import { tsQuery } from "./text";
import type { AIDataBoundary } from "@/generated/prisma/enums";

export const INDEXABLE_LEVELS = ["Cong-khai", "Noi-bo"] as const;

/**
 * TRẦN MỨC BẢO MẬT ĐƯỢC GỬI RA NGOÀI — ETV.P29 §5.5, suy từ RANH GIỚI DỮ LIỆU của chính nền tảng
 * đang phục vụ lượt hỏi, không phải từ một biến toàn cục.
 *
 * Vì sao theo từng nền tảng: một cấu hình có thể có nhiều nền tảng mô hình cùng lúc — mô hình tự
 * vận hành trong hạ tầng của Viện, và dịch vụ ngoài. Một trần toàn cục buộc phải chọn con số thấp
 * nhất cho tất cả (mô hình nội bộ mất tài liệu Nội bộ dù dữ liệu không hề rời Viện), hoặc nới cho
 * tất cả (tài liệu Nội bộ chảy ra dịch vụ ngoài). Cả hai đều sai.
 *
 * Ánh xạ thẳng từ §5.5, không suy diễn:
 *   không rời hạ tầng          → Nội bộ
 *   rời, CÓ cam kết (F29.02)   → Nội bộ
 *   rời, KHÔNG cam kết         → chỉ Công khai
 */
export function mucBaoMatToiDa(ranhGioi: AIDataBoundary): (typeof INDEXABLE_LEVELS)[number] {
  return ranhGioi === "NO_EXTERNAL_TRANSFER" || ranhGioi === "EXTERNAL_WITH_COMMITMENT" ? "Noi-bo" : "Cong-khai";
}

/** Các mức được phép đưa vào ngữ cảnh, theo ranh giới dữ liệu của nền tảng. */
export function mucDuocGui(ranhGioi: AIDataBoundary): string[] {
  return mucBaoMatToiDa(ranhGioi) === "Noi-bo" ? ["Cong-khai", "Noi-bo"] : ["Cong-khai"];
}

export interface Passage {
  path: string;
  title: string;
  heading: string;
  content: string;
  rank: number;
}

/** Số đoạn tối đa đưa vào prompt và độ dài tối đa mỗi đoạn (spec §5 "trích đoạn giới hạn độ dài"). */
export const MAX_PASSAGES = 6;
export const MAX_PASSAGE_CHARS = 1800;

/**
 * Số đoạn tối đa lấy từ CÙNG MỘT tài liệu.
 *
 * Không có hạn mức này, một tài liệu dài khớp tốt sẽ chiếm trọn 6 chỗ và mô hình chỉ được nhìn
 * đúng một nguồn — đo trên bộ 30 câu hỏi vàng: 6 đoạn chỉ trải trên 3,35 tài liệu, cá biệt có câu
 * dồn cả 6 đoạn vào 1 tài liệu. Hệ quả là nguồn đúng nằm ở hạng 7-8 không bao giờ tới được prompt.
 */
export const MAX_PASSAGES_PER_DOC = 2;

/** Lấy dư rồi mới áp hạn mức — nếu chỉ lấy đúng MAX_PASSAGES thì cắt bớt xong sẽ hụt chỗ. */
const CANDIDATE_FACTOR = 4;

export async function retrieve(question: string, ranhGioi: AIDataBoundary, limit: number = MAX_PASSAGES): Promise<Passage[]> {
  const q = tsQuery(question);
  if (!q) return [];

  // Xếp hạng: trọng số {D, C, B, A} = {0.05, 0.2, 0.4, 1.0} — khớp tiêu đề (hạng A) ăn đứt khớp
  // thân bài (hạng D); cờ chuẩn hóa 1 chia điểm cho log độ dài để tài liệu dài không thắng chỉ
  // vì dài. Không có hai điều chỉnh này, truy vấn OR luôn trả về mấy tài liệu dài nhất repo.
  const rows = await prisma.$queryRaw<{ path: string; title: string; heading: string; content: string; rank: number }[]>`
    SELECT c."path", c."title", c."heading", c."content",
           ts_rank('{0.05, 0.2, 0.4, 1.0}'::float4[], c."tsv", query, 1) AS rank
    FROM "CopilotDocChunk" c, to_tsquery('simple', ${q}) query
    WHERE c."tsv" @@ query
      AND c."securityLevel" = ANY(${mucDuocGui(ranhGioi)})
    ORDER BY rank DESC, c."path" ASC
    LIMIT ${limit * CANDIDATE_FACTOR}
  `;

  // Áp hạn mức đoạn/tài liệu theo đúng thứ tự xếp hạng: đoạn tốt nhất của mỗi tài liệu luôn được
  // giữ, chỉ đoạn thứ ba trở đi của cùng tài liệu mới bị nhường chỗ cho tài liệu khác.
  const demTheoTaiLieu = new Map<string, number>();
  const chon: typeof rows = [];
  for (const r of rows) {
    const dem = demTheoTaiLieu.get(r.path) ?? 0;
    if (dem >= MAX_PASSAGES_PER_DOC) continue;
    demTheoTaiLieu.set(r.path, dem + 1);
    chon.push(r);
    if (chon.length >= limit) break;
  }

  return chon.map((r) => ({
    ...r,
    content: r.content.length > MAX_PASSAGE_CHARS ? `${r.content.slice(0, MAX_PASSAGE_CHARS)}…` : r.content,
    rank: Number(r.rank),
  }));
}

/** Khối ngữ cảnh chèn vào prompt hệ thống. Mỗi đoạn mang theo đường dẫn để mô hình trích dẫn được. */
export function buildContextBlock(passages: Passage[]): string {
  return passages
    .map((p, i) => {
      const heading = p.heading ? ` › ${p.heading}` : "";
      return `[${i + 1}] NGUỒN: ${p.path}\nTÀI LIỆU: ${p.title}${heading}\n---\n${p.content}`;
    })
    .join("\n\n");
}
