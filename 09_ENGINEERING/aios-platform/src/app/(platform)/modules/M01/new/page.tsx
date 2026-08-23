import { NewRiskForm } from "./NewRiskForm";
import { NewOpportunityForm } from "./NewOpportunityForm";

export default async function M01NewPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const isOpportunity = type === "opportunity";

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M01 · Tạo hồ sơ mới</p>
        <h1 className="font-head text-2xl font-bold text-ink">{isOpportunity ? "Tạo cơ hội" : "Tạo rủi ro"}</h1>
      </div>
      {isOpportunity ? <NewOpportunityForm /> : <NewRiskForm />}
    </div>
  );
}
