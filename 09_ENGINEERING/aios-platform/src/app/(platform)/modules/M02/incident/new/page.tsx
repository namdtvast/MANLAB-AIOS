import { NewIncidentForm } from "./NewIncidentForm";

export default function M02NewIncidentPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M02 · Báo cáo sự cố bảo mật</p>
        <h1 className="font-head text-2xl font-bold text-ink">Sự cố/nghi ngờ vi phạm bảo mật</h1>
      </div>
      <NewIncidentForm />
    </div>
  );
}
