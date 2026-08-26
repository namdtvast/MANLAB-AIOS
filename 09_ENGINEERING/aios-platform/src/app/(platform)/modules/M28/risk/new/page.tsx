import Link from "next/link";
import { listM27Assets, listM28Users } from "@/lib/m28/actions";
import { NewRiskForm } from "./NewRiskForm";

export default async function NewM28RiskPage() {
  const [users, assets] = await Promise.all([listM28Users(), listM27Assets()]);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M28 · Khai báo rủi ro — biểu mẫu ETV.P.F 28.01</p>
        <h1 className="font-head text-2xl font-bold text-ink">Khai báo rủi ro an toàn thông tin</h1>
        <p className="mt-1 text-sm text-ink-2">
          Mô tả theo cấu trúc <strong>Tài sản → Mối đe dọa → Điểm yếu → Hệ quả (C/I/A) → Kiểm soát hiện có</strong>{" "}
          (ETV.P28 mục 6.4.2). Điểm rủi ro do hệ thống tính, không nhập tay.
        </p>
      </div>

      <Link href="/modules/M28" className="text-xs text-accent hover:underline">
        ← Hồ sơ rủi ro an toàn thông tin
      </Link>

      {assets.length === 0 && (
        <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">
          Danh mục tài sản thông tin (M27) chưa có tài sản nào ở trạng thái Đang sử dụng. Mỗi rủi ro phải gắn với ít
          nhất một tài sản đã kiểm kê, nên phải khai báo tài sản trước (ETV.P28 mục 6.3).
        </p>
      )}

      <NewRiskForm users={users} assets={assets} />
    </div>
  );
}
