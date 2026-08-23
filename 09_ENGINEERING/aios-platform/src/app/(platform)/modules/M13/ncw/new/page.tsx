import { NewNcwForm } from "./NewNcwForm";

export default function M13NewNcwPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M13 · Ghi nhận công việc không phù hợp</p>
        <h1 className="font-head text-2xl font-bold text-ink">Không phù hợp mới</h1>
      </div>
      <NewNcwForm />
    </div>
  );
}
