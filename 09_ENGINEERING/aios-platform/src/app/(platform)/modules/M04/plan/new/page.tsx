import { NewPlanForm } from "./NewPlanForm";

export default function M04NewPlanPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M04 · Lập kế hoạch công việc hiện trường</p>
        <h1 className="font-head text-2xl font-bold text-ink">Kế hoạch hiện trường mới</h1>
      </div>
      <NewPlanForm />
    </div>
  );
}
