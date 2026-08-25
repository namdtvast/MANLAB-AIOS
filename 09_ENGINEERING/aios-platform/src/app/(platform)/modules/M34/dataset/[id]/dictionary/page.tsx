import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DICT_STATUS_LABEL } from "@/lib/m34/labels";
import { ActivateDictButton, DictionaryEditor } from "./DictionaryEditor";

export default async function M34DictionaryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = await prisma.m34DataSet.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      dictionaryRequired: true,
      dictionaryVersions: { orderBy: { version: "desc" }, include: { fields: { orderBy: { fieldName: "asc" } } } },
    },
  });
  if (!d) notFound();

  const th = "border-b border-border px-2 py-1.5 text-left text-xs font-semibold text-ink-3";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-mono text-xs text-ink-3">{d.code}</p>
        <h1 className="font-head text-2xl font-bold text-ink">Từ điển dữ liệu — {d.name}</h1>
        <p className="mt-1 text-sm text-ink-2">
          F34.01 phần II (ETV.P34 §6.1.2). Thay đổi từ điển là <strong>thay đổi cấu trúc dữ liệu</strong> — từ phiên bản 02
          bắt buộc phiếu F30.02 theo ETV.P30 (R3). Phiên bản cũ giữ nguyên để truy vết.
        </p>
      </div>
      <Link href={`/modules/M34/dataset/${d.id}`} className="text-xs text-accent hover:underline">
        ← Chi tiết tập dữ liệu
      </Link>

      <DictionaryEditor dataSetId={d.id} nextVersion={(d.dictionaryVersions[0]?.version ?? 0) + 1} />

      {d.dictionaryVersions.map((v) => (
        <section key={v.id} className="rounded-xl border border-border bg-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-head text-sm font-bold text-ink">
              Phiên bản {v.version} — {DICT_STATUS_LABEL[v.status]}
              {v.effectiveDate && ` · hiệu lực ${v.effectiveDate.toLocaleDateString("vi-VN")}`}
              {v.changeRef && ` · phiếu ${v.changeRef}`}
            </h2>
            {v.status === "DRAFT" && <ActivateDictButton versionId={v.id} />}
          </div>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[52rem] text-sm">
              <thead>
                <tr>
                  <th className={th}>Tên trường</th>
                  <th className={th}>Ý nghĩa nghiệp vụ</th>
                  <th className={th}>Kiểu</th>
                  <th className={th}>Đơn vị</th>
                  <th className={th}>Miền giá trị</th>
                  <th className={th}>Bắt buộc</th>
                  <th className={th}>Quy tắc kiểm tra</th>
                  <th className={th}>Ví dụ</th>
                </tr>
              </thead>
              <tbody>
                {v.fields.map((f) => (
                  <tr key={f.id} className="border-b border-border last:border-0">
                    <td className="px-2 py-1.5 font-mono text-xs text-ink">{f.fieldName}</td>
                    <td className="px-2 py-1.5 text-xs text-ink-2">{f.meaning}</td>
                    <td className="px-2 py-1.5 text-xs text-ink-2">{f.dataType}</td>
                    <td className="px-2 py-1.5 text-xs text-ink-2">{f.unit ?? "—"}</td>
                    <td className="px-2 py-1.5 text-xs text-ink-2">{f.validDomain ?? "—"}</td>
                    <td className="px-2 py-1.5 text-xs text-ink-2">{f.required ? "Có" : "—"}</td>
                    <td className="px-2 py-1.5 text-xs text-ink-2">{f.validationRule ?? "—"}</td>
                    <td className="px-2 py-1.5 text-xs text-ink-2">{f.example ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
      {d.dictionaryVersions.length === 0 && (
        <p className="text-sm text-ink-3">
          Chưa có phiên bản từ điển nào.{d.dictionaryRequired && " Nhóm dữ liệu này bắt buộc có từ điển trước khi trình soát xét (R3)."}
        </p>
      )}
    </div>
  );
}
