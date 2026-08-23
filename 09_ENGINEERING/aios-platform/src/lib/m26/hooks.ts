// M26 — hook mềm: tự tạo phiếu bài học kinh nghiệm khi module nguồn đóng một bản ghi đáng rút
// kinh nghiệm (quy tắc 6 DacTa M26 / ETV.P26 mục 5.2.1).
//
// HAI RÀNG BUỘC BẮT BUỘC, đừng sửa mất:
//  1. **Cảnh báo mềm** — mọi lỗi ở đây đều bị nuốt, KHÔNG được ném ngược lên module nguồn.
//     Hỏng hook thì mất một phiếu bài học, còn ném lỗi thì chặn cả luồng đóng KPH/khiếu nại.
//  2. **Idempotent** — cùng (sourceType, sourceRef) chỉ sinh một phiếu; module nguồn gọi lại
//     nhiều lần (revalidate, thao tác lặp) vẫn không nhân bản hồ sơ.
//
// Đây KHÔNG phải "use server": là hàm nội bộ, gọi trực tiếp từ server action của module nguồn.
import { prisma } from "@/lib/prisma";
import type { M26LessonSource } from "@/generated/prisma/enums";

const PENDING_ANALYSIS = "(hệ thống tạo tự động — chờ QLCL phân tích)";

export interface LessonSeed {
  sourceType: M26LessonSource;
  sourceRef: string; // mã bản ghi gốc ở module nguồn
  title: string;
  context: string;
  createdById: string; // người vừa thao tác ở module nguồn
  m13NcId?: string | null; // khóa ngoại thật khi nguồn là KPH của M13
  rootCauseRef?: string | null;
}

export async function ensureLessonFromSource(seed: LessonSeed): Promise<{ created: boolean; code?: string }> {
  try {
    const existing = await prisma.m26LessonLearned.findFirst({
      where: { sourceType: seed.sourceType, sourceRef: seed.sourceRef },
      select: { id: true, code: true },
    });
    if (existing) return { created: false, code: existing.code };

    const created = await prisma.$transaction(async (tx) => {
      const l = await tx.m26LessonLearned.create({
        data: {
          code: "PENDING",
          title: seed.title.slice(0, 300),
          sourceType: seed.sourceType,
          sourceRef: seed.sourceRef,
          m13NcId: seed.m13NcId ?? null,
          context: seed.context,
          rootCauseRef: seed.rootCauseRef ?? null,
          lesson: PENDING_ANALYSIS,
          recommendedAction: PENDING_ANALYSIS,
          shareRequired: false,
          status: "MOI",
          createdById: seed.createdById,
        },
      });
      const withCode = await tx.m26LessonLearned.update({
        where: { id: l.id },
        data: { code: `BH-${new Date().getFullYear()}-${String(l.seq).padStart(4, "0")}` },
      });
      await tx.m26AuditEntry.create({
        data: {
          itemType: "LESSON",
          itemId: withCode.id,
          actorId: seed.createdById,
          role: "—",
          action: `Tự tạo phiếu bài học từ ${seed.sourceRef} (cảnh báo mềm, quy tắc 6 DacTa M26)`,
          after: "MOI",
        },
      });
      return withCode;
    });

    return { created: true, code: created.code };
  } catch (error) {
    // Nuốt lỗi có chủ đích: module nguồn không được hỏng vì M26.
    console.error("[M26] Không tạo được phiếu bài học tự động:", error);
    return { created: false };
  }
}
