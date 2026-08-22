import { NewAssessmentForm } from "./NewAssessmentForm";

export default function NewM10AssessmentPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M10 · Tạo hồ sơ mới</p>
        <h1 className="font-head text-2xl font-bold text-ink">
          Tạo hồ sơ đảm bảo giá trị sử dụng kết quả
        </h1>
      </div>
      <NewAssessmentForm />
    </div>
  );
}
