"use server";

// Yêu cầu cấp tài khoản — Server Actions. Quyết định nằm ở "@/lib/access-request/rules";
// action chỉ gọi rule rồi ghi DB (mirror src/lib/m12/actions.ts).
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  FIELD_LIMITS,
  reviewAccessRequest,
  validateAccessRequest,
  type AccessRequestField,
  type ReviewDecision,
} from "./rules";

export interface SubmitState {
  ok?: boolean;
  errors?: Partial<Record<AccessRequestField, string>>;
  // Dữ liệu người dùng đã nhập, trả lại nguyên văn để form dựng lại khi có lỗi —
  // người gửi chỉ phải sửa ô sai, không nhập lại từ đầu. Chỉ kèm khi ok = false.
  values?: Record<AccessRequestField, string>;
  message?: string;
}

// Cùng một câu trả lời cho cả ba trường hợp: đã ghi nhận, đã có yêu cầu đang chờ, và email
// đã có tài khoản. Trả lời khác nhau sẽ biến form công khai thành công cụ dò xem email nào
// đang tồn tại trong hệ thống (ISO/IEC 27001 — hạn chế lộ thông tin định danh).
const NEUTRAL_CONFIRMATION =
  "Đã tiếp nhận đề nghị. Quản trị hệ thống sẽ liên hệ lại qua email nếu được cấp tài khoản. Nếu email này đã có tài khoản, hãy đăng nhập bình thường.";

// Giá trị trả ngược về form để người gửi không phải nhập lại. Cắt theo giới hạn từng trường:
// form đã chặn bằng maxLength, đây là chặn cho trường hợp gửi thẳng lên server — không dội một
// payload lớn ngược về trình duyệt. Cắt sau khi validate nên vẫn giữ nguyên lỗi "quá N ký tự".
function keepForRetry(values: Record<AccessRequestField, string>): Record<AccessRequestField, string> {
  return {
    fullName: values.fullName.slice(0, FIELD_LIMITS.fullName),
    email: values.email.slice(0, FIELD_LIMITS.email),
    organization: values.organization.slice(0, FIELD_LIMITS.organization),
    phone: values.phone.slice(0, FIELD_LIMITS.phone),
    purpose: values.purpose.slice(0, FIELD_LIMITS.purpose),
  };
}

export async function submitAccessRequest(
  _prev: SubmitState | undefined,
  formData: FormData,
): Promise<SubmitState> {
  const submitted: Record<AccessRequestField, string> = {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    organization: String(formData.get("organization") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    purpose: String(formData.get("purpose") ?? ""),
  };

  const parsed = validateAccessRequest(submitted);
  if (!parsed.ok) return { ok: false, errors: parsed.errors, values: keepForRetry(submitted) };

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
  // Ghi chú đã gõ, trả lại để người duyệt không phải viết lại khi thao tác bị chặn.
  reviewNote?: string;
}

export async function reviewAccessRequestAction(
  _prev: ReviewState | undefined,
  formData: FormData,
): Promise<ReviewState> {
  const reviewNote = String(formData.get("reviewNote") ?? "");
  // Mọi lối thoát lỗi đều trả lại ghi chú đã gõ (cắt theo giới hạn khi trả về, không cắt
  // trước khi kiểm tra — rule vẫn là nơi quyết định ghi chú có quá dài hay không).
  const fail = (message: string): ReviewState => ({
    ok: false,
    message,
    reviewNote: reviewNote.slice(0, FIELD_LIMITS.reviewNote),
  });

  const session = await auth();
  const actorId = session?.user?.id;
  const role = session?.user?.role;
  // R6 — chặn ở server, không dựa vào việc trang có hiện nút hay không.
  if (!actorId || !role) return fail("Phiên đăng nhập không hợp lệ.");

  const id = String(formData.get("id") ?? "");
  const decision = String(formData.get("decision") ?? "") as ReviewDecision;
  if (decision !== "APPROVED" && decision !== "REJECTED") return fail("Quyết định không hợp lệ.");

  const request = await prisma.accessRequest.findUnique({
    where: { id },
    select: { status: true },
  });
  if (!request) return fail("Không tìm thấy yêu cầu.");

  const result = reviewAccessRequest(request, { role }, decision, reviewNote);
  if (!result.ok) return fail(result.message);

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
