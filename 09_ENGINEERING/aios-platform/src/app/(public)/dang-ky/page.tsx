import Link from "next/link";
import type { Metadata } from "next";
import { AccessRequestForm } from "./AccessRequestForm";

export const metadata: Metadata = {
  title: "Đăng ký — yêu cầu cấp tài khoản | MANLAB-AIOS",
};

export default function AccessRequestPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">Đăng ký</p>
        <h1 className="font-head text-2xl font-bold text-ink sm:text-3xl">Yêu cầu cấp tài khoản</h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-2">
          MANLAB-AIOS là hệ thống nội bộ của Viện Kiểm định Công nghệ và Môi trường. Tài khoản
          không mở tự do: gửi form này để Quản trị hệ thống xét theo phân công công việc, sau đó
          cấp tài khoản và gán vai trò theo từng module.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-sunk p-4 text-sm leading-relaxed text-ink-2">
        <p className="font-head font-bold text-ink">Trước khi gửi</p>
        <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5">
          <li>Đã được cấp tài khoản rồi thì{" "}
            <Link href="/login" className="font-semibold text-accent hover:underline">
              đăng nhập
            </Link>{" "}
            thay vì gửi lại yêu cầu.
          </li>
          <li>Form này chỉ ghi nhận đề nghị — gửi xong chưa có tài khoản để đăng nhập ngay.</li>
          <li>
            Mật khẩu bạn đặt ở đây là mật khẩu đăng nhập nếu được cấp tài khoản —{" "}
            <strong className="text-ink">tự nhớ lấy</strong>, hệ thống không gửi lại và không ai
            xem lại được.
          </li>
          <li>Thông tin gửi lên được dùng để xét cấp quyền, không dùng cho mục đích khác.</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
        <AccessRequestForm />
      </div>
    </div>
  );
}
