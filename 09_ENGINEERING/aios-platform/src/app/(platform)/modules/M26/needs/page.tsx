import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getViewer } from "@/lib/m26/actor";
import { isNeedOverdue } from "@/lib/m26/rules";
import { NEED_METHOD_LABEL, NEED_STATUS_LABEL, NEED_STATUS_TONE, NEED_TRIGGER_LABEL } from "@/lib/m26/labels";
import { Badge, fmtDate, th } from "../_ui";
import { NeedActions, NewNeedForm } from "./NeedsClient";

export default async function NeedsPage() {
  const viewer = await getViewer();
  const [needs, users, items, allItems, trainings] = await Promise.all([
    prisma.m26KnowledgeNeed.findMany({
      include: {
        responsible: true,
        targetItem: { select: { id: true, code: true } },
        resultItem: { select: { id: true, code: true } },
        resultTraining: { select: { code: true } },
      },
      orderBy: [{ status: "asc" }, { requiredBy: "asc" }],
      take: 100,
    }),
    prisma.user.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, email: true } }),
    prisma.m26KnowledgeItem.findMany({ where: { status: "APPROVED" }, select: { id: true, code: true }, orderBy: { code: "asc" } }),
    prisma.m26KnowledgeItem.findMany({
      where: { status: { notIn: ["CANCELLED", "RETIRED"] } },
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

  const canAct = viewer.role === "QLCL" || viewer.role === "TP" || viewer.role === "LDV";
  const overdue = needs.filter((n) => isNeedOverdue(n)).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/modules/M26" className="text-xs text-accent hover:underline">
          ← Danh mục tri thức
        </Link>
        <h1 className="mt-1 font-head text-2xl font-bold text-ink">Nhu cầu tri thức</h1>
        <p className="mt-1 text-sm text-ink-2">
          Biểu mẫu ETV.P.F26.03. Chỉ đóng ở trạng thái <strong>Đã đáp ứng</strong> khi có kết quả thật: mục tri thức mới hoặc hồ sơ đào tạo bên M03
          (ETV.P26 mục 5.3.3). Quyết định <strong>Không thực hiện</strong> thuộc thẩm quyền Lãnh đạo Viện và bắt buộc có lý do.
        </p>
        {overdue > 0 && (
          <p className="mt-2 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">
            {overdue} nhu cầu đã quá hạn mà chưa đáp ứng — thuộc nội dung báo cáo gửi Lãnh đạo Viện (ETV.P26 mục 5.6).
          </p>
        )}
      </div>

      {canAct && <NewNeedForm users={users} allItems={allItems} />}

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[64rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Căn cứ phát sinh</th>
              <th className={th}>Mô tả</th>
              <th className={th}>Hình thức</th>
              <th className={th}>Phụ trách</th>
              <th className={th}>Hạn</th>
              <th className={th}>Mục liên quan</th>
              <th className={th}>Kết quả</th>
              <th className={th}>Trạng thái</th>
              {canAct && <th className={th}>Thao tác</th>}
            </tr>
          </thead>
          <tbody>
            {needs.map((n) => {
              const late = isNeedOverdue(n);
              return (
                <tr key={n.id} className="border-b border-border last:border-0 align-top hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M26/needs/${n.id}/print`} className="font-mono text-xs text-accent hover:underline">
                      {n.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-xs text-ink-2">
                    {NEED_TRIGGER_LABEL[n.trigger]}
                    <br />
                    <span className="text-ink-3">{n.triggerRef}</span>
                  </td>
                  <td className="max-w-sm px-3 py-2 text-sm text-ink-2">{n.description}</td>
                  <td className="px-3 py-2 text-xs text-ink-2">{NEED_METHOD_LABEL[n.method]}</td>
                  <td className="px-3 py-2 text-xs text-ink-2">{n.responsible.name}</td>
                  <td className={`px-3 py-2 text-xs ${late ? "text-crit" : "text-ink-2"}`}>
                    {fmtDate(n.requiredBy)}
                    {late && " · quá hạn"}
                  </td>
                  <td className="px-3 py-2 text-xs">
                    {n.targetItem ? (
                      <Link href={`/modules/M26/item/${n.targetItem.id}`} className="font-mono text-accent hover:underline">
                        {n.targetItem.code}
                      </Link>
                    ) : (
                      <span className="text-ink-3">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-xs">
                    {n.resultItem ? (
                      <Link href={`/modules/M26/item/${n.resultItem.id}`} className="font-mono text-accent hover:underline">
                        {n.resultItem.code}
                      </Link>
                    ) : n.resultTraining ? (
                      <span className="text-ink-2">Đào tạo {n.resultTraining.code}</span>
                    ) : (
                      <span className="text-ink-3">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <Badge label={NEED_STATUS_LABEL[n.status]} tone={NEED_STATUS_TONE[n.status]} />
                    {n.reason && <p className="mt-1 max-w-[12rem] text-xs text-ink-3">{n.reason}</p>}
                  </td>
                  {canAct && (
                    <td className="px-3 py-2">
                      <NeedActions
                        id={n.id}
                        status={n.status}
                        items={items}
                        trainings={trainings}
                        hasResult={Boolean(n.resultItemId || n.resultTrainingId)}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
            {needs.length === 0 && (
              <tr>
                <td colSpan={canAct ? 10 : 9} className="px-3 py-6 text-center text-sm text-ink-3">
                  Chưa có phiếu nhu cầu tri thức nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
