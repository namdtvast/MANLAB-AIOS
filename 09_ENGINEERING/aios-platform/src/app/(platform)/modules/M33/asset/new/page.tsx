import Link from "next/link";
import { listM33Users } from "@/lib/m33/actions";
import { NewAssetForm } from "./NewAssetForm";

export default async function NewAssetPage() {
  const users = await listM33Users();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M33 · Khai báo tài sản — biểu mẫu ETV.P.F 33.01 (dự thảo)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Khai báo tài sản công nghệ thông tin</h1>
        <p className="mt-1 text-sm text-ink-2">
          Trình tự ETV.P33 §6.1.4: QTHT khai báo (Nháp) → PT.ATTT soát xét cấu hình an toàn → LĐV phê duyệt.
          Không có hạ tầng vô chủ (R1); bản ghi không chứa bí mật xác thực (R7).
        </p>
      </div>
      <Link href="/modules/M33" className="text-xs text-accent hover:underline">
        ← Danh mục hạ tầng
      </Link>
      <NewAssetForm users={users} />
    </div>
  );
}
