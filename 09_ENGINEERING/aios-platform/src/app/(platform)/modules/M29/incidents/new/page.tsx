import { prisma } from "@/lib/prisma";
import { getM29Role } from "@/lib/m29/actor";
import { can } from "@/lib/m29/model";
import { NewIncidentForm } from "./NewIncidentForm";

export default async function M29NewIncidentPage() {
  const role = await getM29Role();
  if (!can(role, "incidents", "write")) {
    return <div className="rounded-xl border border-crit/30 bg-crit-soft p-4 text-sm text-crit">Bạn không có quyền lập phiếu sự cố AI.</div>;
  }
  const agents = await prisma.aIAgent.findMany({ orderBy: { code: "asc" }, select: { id: true, code: true, name: true } });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M29 · ETV.P.F29.04</p>
        <h1 className="font-head text-2xl font-bold text-ink">Lập phiếu sự cố trí tuệ nhân tạo</h1>
      </div>
      <NewIncidentForm agents={agents} />
    </div>
  );
}
