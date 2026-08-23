import { NewPlanForm } from "./NewPlanForm";

export default function M16NewPlanPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M16 · Lập kế hoạch đánh giá</p>
        <h1 className="font-head text-2xl font-bold text-ink">Kế hoạch đánh giá nội bộ/bên ngoài</h1>
      </div>
      <NewPlanForm />
    </div>
  );
}
