import { prisma } from "@/lib/prisma";
import { NewReviewForm } from "./NewReviewForm";

export default async function M25NewReviewPage() {
  const previous = await prisma.m25ContextReview.findFirst({
    where: { status: "APPROVED" },
    orderBy: { approvedAt: "desc" },
    include: { _count: { select: { issues: true, parties: true } } },
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M25 · Lập kỳ xem xét bối cảnh</p>
        <h1 className="font-head text-2xl font-bold text-ink">Kỳ xem xét bối cảnh mới</h1>
      </div>
      <NewReviewForm
        previous={previous ? { code: previous.code, issues: previous._count.issues, parties: previous._count.parties } : null}
        defaultYear={new Date().getFullYear()}
      />
    </div>
  );
}
