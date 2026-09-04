import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoginForm } from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; loi?: string }>;
}) {
  const { callbackUrl, loi } = await searchParams;

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-6 bg-bg px-6">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent font-head text-base font-bold text-accent-ink">
            AI
          </span>
          <div>
            <h1 className="font-head text-lg font-bold text-ink">MANLAB-AIOS</h1>
            <p className="mt-1 text-sm text-ink-2">
              Nền tảng số hợp nhất — Viện Kiểm định Công nghệ và Môi trường (ETV)
            </p>
          </div>
        </div>
        {loi === "khoa" && (
          // Một câu duy nhất cho cả tạm khóa lẫn thu hồi, không nêu lý do: trang đăng nhập là bề
          // mặt công khai, nói rõ hơn là kể tình trạng nhân sự cho người chưa đăng nhập được.
          <p className="mb-4 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">
            Tài khoản này hiện không còn hiệu lực đăng nhập. Liên hệ Quản trị hệ thống để được xem xét.
          </p>
        )}
        <LoginForm callbackUrl={callbackUrl ?? "/dashboard"} />
      </div>
      <p className="max-w-sm text-center text-xs text-ink-3">
        Tài khoản do Quản trị hệ thống cấp theo phân công công việc. Chưa có tài khoản?{" "}
        <Link href="/dang-ky" className="font-semibold text-accent hover:underline">
          Gửi yêu cầu cấp tài khoản
        </Link>
        .
      </p>
    </div>
  );
}
