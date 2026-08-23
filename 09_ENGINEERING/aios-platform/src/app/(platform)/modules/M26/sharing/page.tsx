import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getViewer } from "@/lib/m26/actor";
import { SHARING_FORM_LABEL, SHARING_STATUS_LABEL, SHARING_STATUS_TONE } from "@/lib/m26/labels";
import { Badge, fmtDate, th } from "../_ui";
import { NewSharingForm, SharingActions } from "./SharingClient";

export default async function SharingPage() {
  const viewer = await getViewer();
  const [events, users, items, trainings] = await Promise.all([
    prisma.m26SharingEvent.findMany({
      include: {
        presenter: true,
        evidenceTraining: { select: { code: true } },
        items: { include: { item: { select: { id: true, code: true } } } },
        _count: { select: { participants: true } },
      },
      orderBy: { heldAt: "desc" },
      take: 100,
    }),
    prisma.user.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, email: true } }),
    prisma.m26KnowledgeItem.findMany({
      where: { status: "APPROVED" },
      select: { id: true, code: true, title: true },
      orderBy: { code: "asc" },
    }),
    prisma.m03TrainingRecord.findMany({
      where: { result: "DAT", status: "APPROVED" },
      select: { id: true, code: true },
      orderBy: { code: "asc" },
      take: 50,
    }),
  ]);

  const canAct = viewer.role === "QLCL" || viewer.role === "TP";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/modules/M26" className="text-xs text-accent hover:underline">
          ← Danh mục tri thức
        </Link>
        <h1 className="mt-1 font-head text-2xl font-bold text-ink">Chia sẻ tri thức</h1>
        <p className="mt-1 text-sm text-ink-2">
          Biểu mẫu ETV.P.F26.04. Chỉ chia sẻ mục tri thức <strong>đã phê duyệt</strong>; nếu hình thức là đào tạo nội bộ thì hồ sơ chính thức lập
          theo ETV.MP03 (F03.05.x), M26 chỉ dẫn chiếu — không lập biểu mẫu trùng (ETV.P26 mục 5.4.2).
        </p>
      </div>

      {canAct && <NewSharingForm users={users} items={items} trainings={trainings} />}

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[60rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Hình thức</th>
              <th className={th}>Nội dung</th>
              <th className={th}>Thời gian</th>
              <th className={th}>Người trình bày</th>
              <th className={th}>Mục tri thức</th>
              <th className={th}>Tham dự</th>
              <th className={th}>Hồ sơ đào tạo</th>
              <th className={th}>Trạng thái</th>
              {canAct && <th className={th}>Thao tác</th>}
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-b border-border last:border-0 align-top hover:bg-sunk">
                <td className="px-3 py-2">
                  <Link href={`/modules/M26/sharing/${e.id}/print`} className="font-mono text-xs text-accent hover:underline">
                    {e.code}
                  </Link>
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">{SHARING_FORM_LABEL[e.form]}</td>
                <td className="max-w-sm px-3 py-2 text-sm text-ink">{e.topic}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{fmtDate(e.heldAt)}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{e.presenter.name}</td>
                <td className="px-3 py-2 text-xs">
                  {e.items.map((i) => (
                    <Link key={i.id} href={`/modules/M26/item/${i.item.id}`} className="mr-1 font-mono text-accent hover:underline">
                      {i.item.code}
                    </Link>
                  ))}
                  {e.items.length === 0 && <span className="text-ink-3">—</span>}
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">{e._count.participants}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{e.evidenceTraining?.code ?? e.evidenceRef ?? "—"}</td>
                <td className="px-3 py-2">
                  <Badge label={SHARING_STATUS_LABEL[e.status]} tone={SHARING_STATUS_TONE[e.status]} />
                  {e.reason && <p className="mt-1 max-w-[12rem] text-xs text-ink-3">{e.reason}</p>}
                </td>
                {canAct && (
                  <td className="px-3 py-2">
                    <SharingActions id={e.id} status={e.status} />
                  </td>
                )}
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={canAct ? 10 : 9} className="px-3 py-6 text-center text-sm text-ink-3">
                  Chưa có hoạt động chia sẻ tri thức nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
