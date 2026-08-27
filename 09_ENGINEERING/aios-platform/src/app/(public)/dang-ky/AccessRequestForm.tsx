"use client";

import { useActionState, useId, useState } from "react";
import { submitAccessRequest, type SubmitState } from "@/lib/access-request/actions";
import {
  FIELD_LIMITS,
  PASSWORD_MAX,
  PASSWORD_MIN,
  type AccessRequestField,
} from "@/lib/access-request/rules";

const inputClass =
  "w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-[15px] text-ink outline-none transition-colors focus:border-accent-line";

function Field({
  name,
  label,
  hint,
  required,
  errors,
  children,
}: {
  name: AccessRequestField;
  label: string;
  hint?: string;
  required?: boolean;
  errors: Partial<Record<AccessRequestField, string>> | undefined;
  children: (props: { id: string; describedBy: string | undefined; invalid: boolean }) => React.ReactNode;
}) {
  const base = useId();
  const id = `${base}-${name}`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = errors?.[name] ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}{" "}
        <span className="font-normal text-ink-3">{required ? "(bắt buộc)" : "(không bắt buộc)"}</span>
      </label>
      {hint && (
        <p id={hintId} className="text-xs text-ink-3">
          {hint}
        </p>
      )}
      {children({ id, describedBy, invalid: Boolean(errors?.[name]) })}
      {errors?.[name] && (
        <p id={errorId} className="text-sm text-crit">
          {errors[name]}
        </p>
      )}
    </div>
  );
}

// Hai ô mật khẩu tách riêng khỏi <Field> vì có nút hiện/ẩn và không bao giờ có defaultValue:
// server không trả mật khẩu ngược về, form lỗi thì gõ lại (xem keepForRetry trong actions.ts).
function PasswordFields({
  errors,
}: {
  errors: Partial<Record<AccessRequestField, string>> | undefined;
}) {
  const base = useId();
  const [show, setShow] = useState(false);
  const pwId = `${base}-password`;
  const confirmId = `${base}-passwordConfirm`;

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-sunk p-4">
      <p className="text-sm leading-relaxed text-ink-2">
        <strong className="text-ink">Mật khẩu đăng nhập.</strong> Bạn tự đặt và{" "}
        <strong className="text-ink">phải tự nhớ</strong> — nếu được cấp tài khoản thì đăng nhập
        bằng chính email và mật khẩu này. Hệ thống không gửi lại mật khẩu cho bạn.
      </p>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={pwId} className="text-sm font-medium text-ink">
          Mật khẩu <span className="font-normal text-ink-3">(bắt buộc)</span>
        </label>
        <p id={`${pwId}-hint`} className="text-xs text-ink-3">
          Tối thiểu {PASSWORD_MIN} ký tự, tối đa {PASSWORD_MAX}, có cả chữ và số. Không dùng lại
          mật khẩu của email hay hệ thống khác.
        </p>
        <div className="relative">
          <input
            id={pwId}
            name="password"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            maxLength={PASSWORD_MAX}
            aria-invalid={Boolean(errors?.password) || undefined}
            aria-describedby={
              [`${pwId}-hint`, errors?.password ? `${pwId}-error` : undefined]
                .filter(Boolean)
                .join(" ") || undefined
            }
            className={`${inputClass} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            aria-pressed={show}
            title={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center rounded-r-lg text-ink-3 outline-none transition-colors hover:text-ink focus-visible:text-ink"
          >
            {show ? (
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
        {errors?.password && (
          <p id={`${pwId}-error`} className="text-sm text-crit">
            {errors.password}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={confirmId} className="text-sm font-medium text-ink">
          Nhập lại mật khẩu <span className="font-normal text-ink-3">(bắt buộc)</span>
        </label>
        <input
          id={confirmId}
          name="passwordConfirm"
          type={show ? "text" : "password"}
          autoComplete="new-password"
          maxLength={PASSWORD_MAX}
          aria-invalid={Boolean(errors?.passwordConfirm) || undefined}
          aria-describedby={errors?.passwordConfirm ? `${confirmId}-error` : undefined}
          className={inputClass}
        />
        {errors?.passwordConfirm && (
          <p id={`${confirmId}-error`} className="text-sm text-crit">
            {errors.passwordConfirm}
          </p>
        )}
      </div>
    </div>
  );
}

export function AccessRequestForm() {
  const [state, formAction, isPending] = useActionState<SubmitState | undefined, FormData>(
    submitAccessRequest,
    undefined,
  );

  if (state?.ok) {
    return (
      <div
        role="status"
        className="rounded-xl border border-good/30 bg-good-soft p-5 text-sm leading-relaxed text-ink-2"
      >
        <p className="font-head text-base font-bold text-good">Đã gửi yêu cầu</p>
        <p className="mt-2">{state.message}</p>
        <p className="mt-2">
          Yêu cầu được xét theo phân công công việc — gửi yêu cầu không đồng nghĩa với việc sẽ
          được cấp tài khoản.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <Field name="fullName" label="Họ và tên" required errors={state?.errors}>
        {({ id, describedBy, invalid }) => (
          <input
            id={id}
            name="fullName"
            defaultValue={state?.values?.fullName ?? ""}
            type="text"
            autoComplete="name"
            maxLength={FIELD_LIMITS.fullName}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={inputClass}
          />
        )}
      </Field>

      <Field
        name="email"
        label="Email công việc"
        hint="Dùng làm địa chỉ liên hệ và là email của tài khoản nếu được cấp."
        required
        errors={state?.errors}
      >
        {({ id, describedBy, invalid }) => (
          <input
            id={id}
            name="email"
            defaultValue={state?.values?.email ?? ""}
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={FIELD_LIMITS.email}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={inputClass}
          />
        )}
      </Field>

      <Field
        name="organization"
        label="Đơn vị / tổ chức"
        hint="Phòng ban trong Viện, hoặc tên tổ chức nếu là khách hàng, đối tác, đoàn đánh giá."
        required
        errors={state?.errors}
      >
        {({ id, describedBy, invalid }) => (
          <input
            id={id}
            name="organization"
            defaultValue={state?.values?.organization ?? ""}
            type="text"
            autoComplete="organization"
            maxLength={FIELD_LIMITS.organization}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={inputClass}
          />
        )}
      </Field>

      <Field name="phone" label="Điện thoại" errors={state?.errors}>
        {({ id, describedBy, invalid }) => (
          <input
            id={id}
            name="phone"
            defaultValue={state?.values?.phone ?? ""}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={FIELD_LIMITS.phone}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={inputClass}
          />
        )}
      </Field>

      <PasswordFields errors={state?.errors} />

      <Field
        name="purpose"
        label="Cần truy cập để làm gì"
        hint="Nêu rõ phần việc và module liên quan nếu biết — đây là căn cứ để Quản trị hệ thống gán vai trò."
        required
        errors={state?.errors}
      >
        {({ id, describedBy, invalid }) => (
          <textarea
            id={id}
            name="purpose"
            defaultValue={state?.values?.purpose ?? ""}
            rows={4}
            maxLength={FIELD_LIMITS.purpose}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={`${inputClass} resize-y`}
          />
        )}
      </Field>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg bg-accent px-5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang gửi…" : "Gửi yêu cầu"}
      </button>
    </form>
  );
}
