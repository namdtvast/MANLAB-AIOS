import { listEmployeesForCommitment } from "@/lib/m02/actions";
import { NewCommitmentForm } from "./NewCommitmentForm";

export default async function M02NewCommitmentPage() {
  const employees = await listEmployeesForCommitment();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M02 · Ghi nhận cam kết bảo mật</p>
        <h1 className="font-head text-2xl font-bold text-ink">Cam kết bảo mật mới</h1>
      </div>
      <NewCommitmentForm employees={employees.map((e) => ({ id: e.id, label: `${e.code} — ${e.fullName}` }))} />
    </div>
  );
}
