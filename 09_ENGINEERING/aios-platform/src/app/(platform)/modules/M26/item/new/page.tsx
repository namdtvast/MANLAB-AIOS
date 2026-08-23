import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ItemForm } from "../ItemForm";

export default async function NewItemPage() {
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
        <Link href="/modules/M26" className="text-xs text-accent hover:underline">
          ← Danh mục tri thức
        </Link>
        <h1 className="mt-1 font-head text-2xl font-bold text-ink">Thêm mục tri thức</h1>
        <p className="mt-1 text-sm text-ink-2">Mục mới được lập ở trạng thái Nháp, sau đó gửi soát xét (TP) và trình Lãnh đạo Viện phê duyệt.</p>
      </div>
      <ItemForm users={users} documents={documents} />
    </div>
  );
}
