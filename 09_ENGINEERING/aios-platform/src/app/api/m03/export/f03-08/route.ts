// Xuất biểu mẫu ETV.P.F 03.08 (Danh sách nhân sự) thành PDF có dữ liệu.
//
//   GET /api/m03/export/f03-08              → toàn bộ danh sách nhân sự
//   GET /api/m03/export/f03-08?ids=<a>,<b>  → chỉ những nhân sự đã chọn
//
// Khác F03.01 (mỗi người một tờ, nhiều người thì đóng .zip): đây là biểu mẫu TỔNG HỢP nên luôn
// ra ĐÚNG MỘT file PDF khổ ngang, bao nhiêu người cũng nằm trong một bảng — gói .zip ở đây là sai
// bản chất biểu mẫu.
//
// Quyền: yêu cầu phiên đăng nhập (src/proxy.ts đã chặn mọi request ẩn danh tới /api/*), cùng mức
// với trang /modules/M03 — xem ghi chú ở route f03-01.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getFormMeta } from "@/lib/forms/meta";
import { formDocument } from "@/lib/forms/layout";
import { htmlToPdf } from "@/lib/pdf/render";
import {
  F03_08_FORM_CODE,
  f0308FileName,
  renderF0308Sheet,
  type F0308Employee,
} from "@/lib/m03/forms/f03-08";

function errorJson(code: string, message: string, status: number) {
  return NextResponse.json({ ok: false, code, message }, { status });
}

/** Tên file đặt trong Content-Disposition: giữ bản ASCII cho client cũ, kèm filename* UTF-8. */
function contentDisposition(fileName: string): string {
  const ascii = fileName.replace(/[^\x20-\x7e]/g, "_").replace(/"/g, "");
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

const SELECT = {
  id: true,
  code: true,
  fullName: true,
  position: true,
  department: true,
  status: true,
  laborContracts: {
    select: { contractType: true, status: true, effectiveDate: true, expiryDate: true },
    orderBy: { createdAt: "desc" },
  },
} as const;

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return errorJson("UNAUTHENTICATED", "Phiên đăng nhập đã hết hạn — đăng nhập lại để xuất hồ sơ.", 401);
  }

  const ids = (new URL(request.url).searchParams.get("ids") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Không chọn dòng nào = xuất toàn bộ danh sách: đó là ý nghĩa mặc định của "Danh sách nhân sự",
  // và cũng là bản mà Văn phòng nộp cho đoàn đánh giá.
  const rows = await prisma.m03Employee.findMany({
    where: ids.length > 0 ? { id: { in: ids } } : undefined,
    select: SELECT,
    orderBy: { createdAt: "desc" },
  });

  if (ids.length > 0 && rows.length === 0) {
    return errorJson("NOT_FOUND", "Không tìm thấy nhân sự đã chọn.", 404);
  }

  // Chọn dòng thì giữ đúng thứ tự người dùng đã chọn trên bảng; xuất toàn bộ thì theo thứ tự DB.
  const employees: F0308Employee[] =
    ids.length > 0
      ? (() => {
          const byId = new Map(rows.map((r) => [r.id, r]));
          return ids.map((id) => byId.get(id)).filter((r): r is (typeof rows)[number] => !!r);
        })()
      : rows;

  const meta = await getFormMeta("M03", F03_08_FORM_CODE);
  const pdf = await htmlToPdf(
    formDocument(meta.title, [renderF0308Sheet(employees, meta)], { landscape: true }),
  );

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": contentDisposition(f0308FileName(employees.length, meta)),
    },
  });
}
