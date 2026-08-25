"use client";

import { useActionState, useId } from "react";
import { submitAccessRequest, type SubmitState } from "@/lib/access-request/actions";
import { FIELD_LIMITS, type AccessRequestField } from "@/lib/access-request/rules";

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
