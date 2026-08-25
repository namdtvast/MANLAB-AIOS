import Link from "next/link";
import { listM34Users } from "@/lib/m34/actions";
import { NewDataSetForm } from "./NewDataSetForm";

export default async function NewDataSetPage() {
  const users = await listM34Users();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M34 · Khai báo tập dữ liệu — biểu mẫu ETV.P.F 34.01 (dự thảo)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Khai báo tập dữ liệu vào danh mục</h1>
        <p className="mt-1 text-sm text-ink-2">
          Trình tự ETV.P34 §6.1.3: QTDL khai báo (Nháp) → QLCL + PT.ATTT soát xét → CSHDL phê duyệt. Bản ghi chỉ{" "}
          <strong>mô tả</strong>, không chứa dữ liệu thật.
        </p>
      </div>
      <Link href="/modules/M34" className="text-xs text-accent hover:underline">
        ← Danh mục dữ liệu số
      </Link>
      <NewDataSetForm users={users} />
    </div>
  );
}
