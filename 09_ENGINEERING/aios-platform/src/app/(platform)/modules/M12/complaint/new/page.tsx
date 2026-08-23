import { NewComplaintForm } from "./NewComplaintForm";

export default function M12NewComplaintPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M12 · Tiếp nhận khiếu nại</p>
        <h1 className="font-head text-2xl font-bold text-ink">Khiếu nại mới</h1>
      </div>
      <NewComplaintForm />
    </div>
  );
}
