import { listActiveCommitments } from "@/lib/m02/actions";
import { NewVisitorForm } from "./NewVisitorForm";

export default async function M02NewVisitorPage() {
  const commitments = await listActiveCommitments("KHACH");
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M02 · Ghi sổ khách</p>
        <h1 className="font-head text-2xl font-bold text-ink">Khách vào khu vực hạn chế</h1>
      </div>
      <NewVisitorForm commitments={commitments.map((c) => ({ id: c.id, label: `${c.code} — ${c.personName}` }))} />
    </div>
  );
}
