import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { canEditItem } from "@/lib/m26/rules";
import { ItemForm } from "../../ItemForm";

export default async function EditItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.m26KnowledgeItem.findUnique({ where: { id }, include: { holders: true } });
  if (!item) notFound();

  const [users, documents] = await Promise.all([
    prisma.user.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, email: true } }),
    prisma.m14Document.findMany({
      where: { status: "DA_PHE_DUYET" },
      orderBy: { code: "asc" },
      select: { id: true, code: true, title: true },
      take: 100,
    }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href={`/modules/M26/item/${id}`} className="text-xs text-accent hover:underline">
          ← Quay lại mục tri thức
        </Link>
        <h1 className="mt-1 font-head text-2xl font-bold text-ink">Sửa mục tri thức {item.code}</h1>
      </div>

      {canEditItem(item.status) ? (
        <ItemForm
          users={users}
          documents={documents}
          defaults={{
            id: item.id,
            title: item.title,
            knowledgeForm: item.knowledgeForm,
            category: item.category,
            origin: item.origin,
            summary: item.summary,
            sourceRef: item.sourceRef ?? "",
            docId: item.docId ?? "",
            ownerId: item.ownerId,
            criticality: item.criticality,
            confidentiality: item.confidentiality,
            appliesTo: item.appliesTo,
            reviewCycle: item.reviewCycle,
            holderIds: item.holders.map((h) => h.userId),
          }}
        />
      ) : (
        <p className="rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-sm text-warn">
          Mục tri thức đã gửi soát xét/đã phê duyệt là hồ sơ chỉ đọc — muốn thay đổi nội dung phải tạo phiên bản mới (ETV.P26 mục 5.1.8).
        </p>
      )}
    </div>
  );
}
