import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ReviewPanel } from "./ReviewPanel";

// Hàng chờ yêu cầu cấp tài khoản gửi từ form công khai /dang-ky.
// R1 — duyệt ở đây KHÔNG tạo tài khoản: chỉ ghi nhận "đồng ý cấp". Việc tạo User và
// gán vai trò vẫn theo quy trình cấp phát hiện hành của Quản trị hệ thống.
// R6 — chặn ở server bằng session, không dựa vào việc menu có hiện mục này hay không.

const STATUS: Record<string, { label: string; className: string }> = {
  PENDING: { label: "Chờ xử lý", className: "bg-warn-soft text-warn" },
  APPROVED: { label: "Đồng ý cấp", className: "bg-good-soft text-good" },
  REJECTED: { label: "Từ chối", className: "bg-crit-soft text-crit" },
};

function formatDateTime(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

const th =
  "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function AccessRequestsPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return (
      <div className="max-w-2xl rounded-xl border border-crit/30 bg-crit-soft p-5">
        <h1 className="font-head text-lg font-bold text-crit">Không có quyền truy cập</h1>
        <p className="mt-1.5 text-sm text-ink-2">
          Chỉ Quản trị hệ thống xem và xử lý được hàng chờ yêu cầu cấp tài khoản.
        </p>
      </div>
    );
  }

  const requests = await prisma.accessRequest.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: { reviewedBy: { select: { name: true, email: true } } },
  });
  const pending = requests.filter((r) => r.status === "PENDING");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">
          Quản trị hệ thống
        </p>
        <h1 className="font-head text-2xl font-bold text-ink">Yêu cầu cấp tài khoản</h1>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-ink-2">
          Đề nghị gửi từ form công khai. <strong className="text-ink">Đồng ý cấp</strong> chỉ ghi
          nhận quyết định — tài khoản và vai trò vẫn tạo theo quy trình cấp phát hiện hành, không
          sinh tự động từ trang này.
        </p>
      </div>

      <p className="text-sm text-ink-2">
        Đang chờ xử lý: <strong className="text-ink">{pending.length}</strong> / tổng{" "}
        {requests.length} yêu cầu.
      </p>

      {requests.length === 0 ? (
        <div className="rounded-xl border border-border bg-sunk p-6 text-center">
          <p className="font-head text-sm font-bold text-ink">Chưa có yêu cầu nào</p>
          <p className="mt-1.5 text-sm text-ink-2">
            Đề nghị gửi từ trang <code className="rounded bg-surface px-1 py-0.5 text-xs">/dang-ky</code>{" "}
            sẽ xuất hiện ở đây.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[52rem] text-sm">
            <thead>
              <tr>
                <th className={th}>Người đề nghị</th>
                <th className={th}>Đơn vị</th>
                <th className={th}>Lý do</th>
                <th className={th}>Gửi lúc</th>
                <th className={th}>Trạng thái</th>
                <th className={th}>Xử lý</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => {
                const s = STATUS[r.status];
                return (
                  <tr key={r.id} className="border-b border-border last:border-0 align-top">
                    <td className="px-3 py-3">
                      <p className="font-medium text-ink">{r.fullName}</p>
                      <p className="text-xs text-ink-2">{r.email}</p>
                      {r.phone && <p className="text-xs text-ink-3">{r.phone}</p>}
                    </td>
                    <td className="px-3 py-3 text-ink-2">{r.organization}</td>
                    <td className="max-w-sm px-3 py-3 text-ink-2">{r.purpose}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-xs text-ink-2">
                      {formatDateTime(r.createdAt)}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${s.className}`}
                      >
                        {s.label}
                      </span>
                      {r.reviewedAt && (
                        <p className="mt-1 text-xs text-ink-3">
                          {formatDateTime(r.reviewedAt)}
                          {r.reviewedBy && ` · ${r.reviewedBy.name ?? r.reviewedBy.email}`}
                        </p>
                      )}
                      {r.reviewNote && <p className="mt-1 text-xs text-ink-2">{r.reviewNote}</p>}
                    </td>
                    <td className="min-w-64 px-3 py-3">
                      {r.status === "PENDING" ? (
                        <ReviewPanel id={r.id} />
                      ) : (
                        <span className="text-xs text-ink-3">Đã xử lý</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
