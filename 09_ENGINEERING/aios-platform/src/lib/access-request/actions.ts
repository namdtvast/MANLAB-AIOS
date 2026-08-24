"use server";

// Yêu cầu cấp tài khoản — Server Actions. Quyết định nằm ở "@/lib/access-request/rules";
// action chỉ gọi rule rồi ghi DB (mirror src/lib/m12/actions.ts).
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  reviewAccessRequest,
  validateAccessRequest,
  type AccessRequestField,
  type ReviewDecision,
} from "./rules";

export interface SubmitState {
  ok?: boolean;
  errors?: Partial<Record<AccessRequestField, string>>;
  message?: string;
}

// Cùng một câu trả lời cho cả ba trường hợp: đã ghi nhận, đã có yêu cầu đang chờ, và email
// đã có tài khoản. Trả lời khác nhau sẽ biến form công khai thành công cụ dò xem email nào
// đang tồn tại trong hệ thống (ISO/IEC 27001 — hạn chế lộ thông tin định danh).
const NEUTRAL_CONFIRMATION =
  "Đã tiếp nhận đề nghị. Quản trị hệ thống sẽ liên hệ lại qua email nếu được cấp tài khoản. Nếu email này đã có tài khoản, hãy đăng nhập bình thường.";

export async function submitAccessRequest(
  _prev: SubmitState | undefined,
  formData: FormData,
): Promise<SubmitState> {
  const parsed = validateAccessRequest({
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    organization: String(formData.get("organization") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    purpose: String(formData.get("purpose") ?? ""),
  });
  if (!parsed.ok) return { ok: false, errors: parsed.errors };

  const { value } = parsed;

  // R3 — email đã có tài khoản thì không nhận đề nghị. R2 — mỗi email chỉ một yêu cầu đang chờ.
  const [existingUser, pending] = await Promise.all([
    prisma.user.findUnique({ where: { email: value.email }, select: { id: true } }),
    prisma.accessRequest.findFirst({
      where: { email: value.email, status: "PENDING" },
      select: { id: true },
    }),
  ]);

  if (!existingUser && !pending) {
    await prisma.accessRequest.create({
      data: {
        fullName: value.fullName,
        email: value.email,
        organization: value.organization,
        phone: value.phone || null,
        purpose: value.purpose,
      },
    });
    revalidatePath("/admin/access-requests");
  }

  return { ok: true, message: NEUTRAL_CONFIRMATION };
}

export interface ReviewState {
  ok?: boolean;
  message?: string;
}

export async function reviewAccessRequestAction(
  _prev: ReviewState | undefined,
  formData: FormData,
): Promise<ReviewState> {
  const session = await auth();
  const actorId = session?.user?.id;
  const role = session?.user?.role;
  // R6 — chặn ở server, không dựa vào việc trang có hiện nút hay không.
  if (!actorId || !role) return { ok: false, message: "Phiên đăng nhập không hợp lệ." };

  const id = String(formData.get("id") ?? "");
  const decision = String(formData.get("decision") ?? "") as ReviewDecision;
  if (decision !== "APPROVED" && decision !== "REJECTED")
    return { ok: false, message: "Quyết định không hợp lệ." };

  const request = await prisma.accessRequest.findUnique({
    where: { id },
    select: { status: true },
  });
  if (!request) return { ok: false, message: "Không tìm thấy yêu cầu." };

  const result = reviewAccessRequest(request, { role }, decision, String(formData.get("reviewNote") ?? ""));
  if (!result.ok) return { ok: false, message: result.message };

  await prisma.accessRequest.update({
    where: { id },
    data: {
      status: result.status,
      reviewNote: result.reviewNote,
      reviewedAt: new Date(),
      reviewedById: actorId,
    },
  });
  revalidatePath("/admin/access-requests");

  return {
    ok: true,
    message:
      result.status === "APPROVED"
        ? "Đã ghi nhận đồng ý cấp tài khoản. Việc tạo tài khoản thực hiện theo quy trình cấp phát hiện hành."
        : "Đã từ chối yêu cầu.",
  };
}
