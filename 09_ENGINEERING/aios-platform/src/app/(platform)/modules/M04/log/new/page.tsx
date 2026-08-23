import { listAreaSpecs } from "@/lib/m04/actions";
import { NewLogForm } from "./NewLogForm";

export default async function M04NewLogPage() {
  const areas = await listAreaSpecs();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M04 · Ghi nhận điều kiện</p>
        <h1 className="font-head text-2xl font-bold text-ink">Điều kiện môi trường / tủ bảo quản</h1>
      </div>
      <NewLogForm
        areas={areas.map((a) => ({
          id: a.id,
          label: `${a.name} (${a.tempMin}–${a.tempMax}°C, ${a.humidityMin}–${a.humidityMax}%)`,
          tempMin: a.tempMin,
          tempMax: a.tempMax,
          humidityMin: a.humidityMin,
          humidityMax: a.humidityMax,
        }))}
      />
    </div>
  );
}
