import { NewDisclosureForm } from "./NewDisclosureForm";

export default function M02NewDisclosurePage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M02 · Soạn hồ sơ công bố thông tin</p>
        <h1 className="font-head text-2xl font-bold text-ink">Công bố thông tin ra bên thứ ba</h1>
      </div>
      <NewDisclosureForm />
    </div>
  );
}
