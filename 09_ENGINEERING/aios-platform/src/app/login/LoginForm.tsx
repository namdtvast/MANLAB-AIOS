"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { loginAction } from "./actions";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction, isPending] = useActionState(loginAction, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Đăng nhập sai thì email vẫn còn (defaultValue bên dưới) — đưa con trỏ về ngay ô mật khẩu.
  useEffect(() => {
    if (state?.error) passwordRef.current?.focus();
  }, [state]);

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        Email
        <input
          type="email"
          name="email"
          required
          defaultValue={state?.email ?? ""}
          autoComplete="email"
          className="rounded-lg border border-border bg-bg px-3 py-2 text-ink outline-none transition-colors focus:border-accent-line"
        />
      </label>

      <div className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        <label htmlFor="password">Mật khẩu</label>
        <div className="relative">
          <input
            id="password"
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            name="password"
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-border bg-bg py-2 pl-3 pr-11 text-ink outline-none transition-colors focus:border-accent-line"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            aria-pressed={showPassword}
            title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center rounded-r-lg text-ink-3 transition-colors hover:text-ink outline-none focus-visible:text-ink"
          >
            {showPassword ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c7 0 10 7 10 7a18.4 18.4 0 0 1-2.6 3.7" />
                <path d="M6.6 6.6A18.4 18.4 0 0 0 2 12s3 7 10 7a10.7 10.7 0 0 0 5.4-1.4" />
                <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                <path d="M3 3l18 18" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {state?.error && (
        <p role="alert" className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">
          {state.error}
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
