// Truy hồi ngữ cảnh cho Copilot — spec §5.
//
// Chỉ đọc bảng CopilotDocChunk (tài liệu đã ban hành, mức Công khai/Nội bộ). KHÔNG truy vấn bất
// kỳ bảng nghiệp vụ nào (M01…M38): phạm vi Increment 1 cố ý không cho Copilot chạm dữ liệu
// khách hàng, kết quả đo hay nhân sự.
//
// Lọc securityLevel LẶP LẠI ở đây dù script nạp chỉ mục đã lọc: phòng thủ nhiều lớp cho E1/E4 —
// nếu một bản ghi sai mức lọt vào bảng thì truy hồi vẫn không lấy ra.
import { prisma } from "@/lib/prisma";
import { tsQuery } from "./text";

export const INDEXABLE_LEVELS = ["Cong-khai", "Noi-bo"] as const;

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

export async function retrieve(question: string, limit: number = MAX_PASSAGES): Promise<Passage[]> {
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
      AND c."securityLevel" IN ('Cong-khai', 'Noi-bo')
    ORDER BY rank DESC, c."path" ASC
    LIMIT ${limit}
  `;

  return rows.map((r) => ({
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
