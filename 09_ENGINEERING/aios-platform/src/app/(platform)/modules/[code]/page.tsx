import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const mod = await prisma.platformModule.findUnique({ where: { code } });
  if (!mod) notFound();

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">
          {mod.code} · {mod.mpCode} · {mod.capabilityCode ?? "—"}
        </p>
        <h1 className="font-head text-2xl font-bold text-ink">{mod.name}</h1>
      </div>

      {mod.status === "ACTIVE" ? (
        <div className="rounded-xl border border-good/30 bg-good-soft p-4 text-sm">
          <p className="font-semibold text-good">
            Module này đã có ứng dụng chạy thật (prototype độc lập).
          </p>
          <p className="mt-1.5 text-ink-2">
            Việc di trú nghiệp vụ của {mod.code} vào nền tảng hợp nhất này (dùng chung DB/auth)
            là Increment tiếp theo sau khung 38-mục — hiện tại vẫn chạy như dịch vụ riêng, xem
            đường dẫn nguồn: <code className="rounded bg-surface px-1 py-0.5 text-xs">{mod.sourcePath}</code>.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-sunk p-4 text-sm">
          <p className="font-semibold text-ink">Sắp ra mắt.</p>
          <p className="mt-1.5 text-ink-2">
            Module này hiện mới có đặc tả nghiệp vụ, chưa xây trong nền tảng hợp nhất. Xem đặc
            tả tại{" "}
            <code className="rounded bg-surface px-1 py-0.5 text-xs">
              {mod.sourcePath}/01_Requirement/DacTa.md
            </code>
            .
          </p>
        </div>
      )}
    </div>
  );
}
