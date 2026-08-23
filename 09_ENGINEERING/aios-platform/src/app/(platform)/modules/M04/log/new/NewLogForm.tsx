"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { createConditionLog } from "@/lib/m04/actions";
import { LOG_TYPE_LABEL } from "@/lib/m04/labels";
import type { M04LogType } from "@/generated/prisma/enums";

const TYPES = Object.keys(LOG_TYPE_LABEL) as M04LogType[];

interface Area {
  id: string;
  label: string;
  tempMin: number;
  tempMax: number;
  humidityMin: number;
  humidityMax: number;
}

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewLogForm({ areas }: { areas: Area[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [logType, setLogType] = useState<M04LogType>("ENVIRONMENT");
  const [areaId, setAreaId] = useState(areas[0]?.id ?? "");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [abnormalAction, setAbnormalAction] = useState("");

  const selectedArea = areas.find((a) => a.id === areaId);
  const withinSpec = useMemo(() => {
    if (!selectedArea || temperature === "" || humidity === "") return null;
    const t = Number(temperature);
    const h = Number(humidity);
    return t >= selectedArea.tempMin && t <= selectedArea.tempMax && h >= selectedArea.humidityMin && h <= selectedArea.humidityMax;
  }, [selectedArea, temperature, humidity]);

  return (
    <form
      className="flex max-w-lg flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      action={() => {
        setError(null);
        startTransition(async () => {
          const r = await createConditionLog({
            logType,
            areaId,
            temperature: Number(temperature),
            humidity: Number(humidity),
            abnormalAction: abnormalAction || undefined,
          });
          if ("id" in r) router.push("/modules/M04");
          else setError(r.message);
        });
      }}
    >
      <label className={labelCls}>
        Loại nhật ký
        <select value={logType} onChange={(e) => setLogType(e.target.value as M04LogType)} className={fieldCls}>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {LOG_TYPE_LABEL[t]}
            </option>
          ))}
        </select>
      </label>
      <label className={labelCls}>
        Khu vực
        <select value={areaId} onChange={(e) => setAreaId(e.target.value)} className={fieldCls}>
          {areas.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className={labelCls}>
          Nhiệt độ (°C)
          <input type="number" step="0.1" value={temperature} onChange={(e) => setTemperature(e.target.value)} required className={fieldCls} />
        </label>
        <label className={labelCls}>
          Độ ẩm (%)
          <input type="number" step="0.1" value={humidity} onChange={(e) => setHumidity(e.target.value)} required className={fieldCls} />
        </label>
      </div>

      {withinSpec != null && (
        <p className={`text-xs ${withinSpec ? "text-good" : "text-crit"}`}>
          {withinSpec ? "Trong ngưỡng cho phép." : "Vượt ngưỡng cho phép — bắt buộc nhập biện pháp xử lý."}
        </p>
      )}

      {withinSpec === false && (
        <label className={labelCls}>
          Biện pháp xử lý
          <textarea value={abnormalAction} onChange={(e) => setAbnormalAction(e.target.value)} rows={2} className={fieldCls} />
        </label>
      )}

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang lưu…" : "Ghi nhận"}
      </button>
    </form>
  );
}
