import Link from "next/link";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { KICH_THUOC_TRANG, PhanTrang, boQua, chotTrang } from "@/components/PhanTrang";
import { ASSET_CLASS_LABEL, ENVIRONMENT_LABEL, NETWORK_ZONE_LABEL } from "@/lib/m33/labels";
import { CLASSIFICATION_LABEL } from "@/lib/m34/labels";

const th = "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

// Báo cáo kiểm kê hợp nhất M33 + M27 — ISO/IEC 27001 A.5.9 (R2): thiết bị đăng ký tại P33,
// dữ liệu trên thiết bị đăng ký tại P27. M27 chưa lên nền tảng — phần dữ liệu hiển thị qua
// infoAssetRefs (ref mềm) cho tới khi M27 ACTIVE.
const TRONG_KIEM_KE: Prisma.M33ITAssetWhereInput = { status: { in: ["OPERATING", "SUSPENDED", "RETIRED"] } };

export default async function M33InventoryPage({ searchParams }: { searchParams: Promise<{ trang?: string }> }) {
  const { trang: trangRaw } = await searchParams;
  const tong = await prisma.m33ITAsset.count({ where: TRONG_KIEM_KE });
  const trang = chotTrang(trangRaw, tong);
  const assets = await prisma.m33ITAsset.findMany({
    where: TRONG_KIEM_KE,
    orderBy: { code: "asc" },
    include: { custodian: { select: { name: true } } },
    skip: boQua(trang),
    take: KICH_THUOC_TRANG,
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M33 · Kiểm kê hợp nhất M33 + M27 — ISO/IEC 27001 A.5.9 (R2)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Báo cáo kiểm kê hợp nhất</h1>
        <p className="mt-1 text-sm text-ink-2">
          {tong} tài sản trong kiểm kê. Cột “Dữ liệu trên thiết bị” lấy từ tham chiếu M27 (ref mềm — M27 chưa lên nền tảng,
          chuyển thành liên kết thật khi M27 ACTIVE; không lập hai danh mục song song).
        </p>
      </div>
      <Link href="/modules/M33" className="text-xs text-accent hover:underline">
        ← Danh mục hạ tầng
      </Link>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[60rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tên</th>
              <th className={th}>Lớp</th>
              <th className={th}>Vùng mạng / Môi trường</th>
              <th className={th}>Phân loại tối đa</th>
              <th className={th}>Chủ quản trị</th>
              <th className={th}>Dữ liệu trên thiết bị (M27)</th>
              <th className={th}>Nền tảng (M35)</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((a) => (
              <tr key={a.id} className="border-b border-border last:border-0 hover:bg-sunk">
                <td className="px-3 py-2">
                  <Link href={`/modules/M33/asset/${a.id}`} className="font-mono text-xs text-accent hover:underline">
                    {a.code}
                  </Link>
                </td>
                <td className="px-3 py-2 text-ink">{a.name}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{ASSET_CLASS_LABEL[a.assetClass]}</td>
                <td className="px-3 py-2 text-xs text-ink-2">
                  {a.networkZone ? NETWORK_ZONE_LABEL[a.networkZone] : "—"} · {ENVIRONMENT_LABEL[a.environment]}
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">{CLASSIFICATION_LABEL[a.maxClassification]}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{a.custodian.name}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{a.infoAssetRefs.join(", ") || "—"}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{a.platformRefs.join(", ") || "—"}</td>
              </tr>
            ))}
            {assets.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-sm text-ink-3">
                  Chưa có tài sản nào trong kiểm kê.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PhanTrang path="/modules/M33/inventory" trang={trang} tong={tong} donVi="tài sản" />
      </div>
    </div>
  );
}
