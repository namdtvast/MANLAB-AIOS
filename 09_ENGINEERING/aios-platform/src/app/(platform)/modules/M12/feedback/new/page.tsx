import { NewFeedbackForm } from "./NewFeedbackForm";

export default function M12NewFeedbackPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M12 · Ghi nhận phàn nàn/góp ý</p>
        <h1 className="font-head text-2xl font-bold text-ink">Phàn nàn / Góp ý mới</h1>
      </div>
      <NewFeedbackForm />
    </div>
  );
}
