"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [error, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        Email
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="rounded-lg border border-border bg-bg px-3 py-2 text-ink outline-none transition-colors focus:border-accent-line"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        Mật khẩu
        <input
          type="password"
          name="password"
          required
          className="rounded-lg border border-border bg-bg px-3 py-2 text-ink outline-none transition-colors focus:border-accent-line"
        />
      </label>

      {error && (
        <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang đăng nhập…" : "Đăng nhập"}
      </button>
    </form>
  );
}
