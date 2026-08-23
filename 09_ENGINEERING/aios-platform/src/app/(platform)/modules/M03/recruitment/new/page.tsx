import { NewRecruitmentForm } from "./NewRecruitmentForm";

export default function M03NewRecruitmentPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M03 · Tạo đề xuất tuyển dụng</p>
        <h1 className="font-head text-2xl font-bold text-ink">Đề xuất tuyển dụng mới</h1>
      </div>
      <NewRecruitmentForm />
    </div>
  );
}
