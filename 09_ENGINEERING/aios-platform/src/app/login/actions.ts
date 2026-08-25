"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

const EMAIL_MAX = 160;

export interface LoginState {
  error: string;
  // Email đã gõ, trả lại để lần nhập lại chỉ còn phải gõ mật khẩu. Cố ý KHÔNG trả lại
  // mật khẩu: không đưa mật khẩu ngược ra HTML của trang.
  email: string;
}

export async function loginAction(
  _prevState: LoginState | undefined,
  formData: FormData
): Promise<LoginState | undefined> {
  const email = String(formData.get("email") ?? "");
  try {
    await signIn("credentials", {
      email,
      password: formData.get("password"),
      redirectTo: (formData.get("callbackUrl") as string) || "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Sai email hoặc mật khẩu.", email: email.slice(0, EMAIL_MAX) };
    }
    throw error;
  }
}
