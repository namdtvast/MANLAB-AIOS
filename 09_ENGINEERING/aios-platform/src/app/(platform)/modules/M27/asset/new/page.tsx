import Link from "next/link";
import { listM27Users } from "@/lib/m27/actions";
import { NewAssetForm } from "./NewAssetForm";

export default async function NewM27AssetPage() {
  const users = await listM27Users();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M27 · Khai báo tài sản — biểu mẫu ETV.P.F 27.01</p>
        <h1 className="font-head text-2xl font-bold text-ink">Khai báo tài sản thông tin</h1>
        <p className="mt-1 text-sm text-ink-2">
          Trình tự ETV.P27 §6.1.5: TP/QTHT khai báo (Nháp) → PT.ATTT soát xét mức phân loại và C–I–A → QLCL kiểm
          tra trùng lặp và trình → <strong>LĐV phê duyệt</strong> → Đang sử dụng.
        </p>
      </div>

      <Link href="/modules/M27" className="text-xs text-accent hover:underline">
        ← Danh mục tài sản thông tin
      </Link>

      <NewAssetForm users={users} />
    </div>
  );
}
