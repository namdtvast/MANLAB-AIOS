import { NewDocForm } from "./NewDocForm";

export default function M14NewDocPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M14 · Soạn thảo văn bản</p>
        <h1 className="font-head text-2xl font-bold text-ink">Văn bản mới</h1>
      </div>
      <NewDocForm />
    </div>
  );
}
