// Xuất biểu mẫu ETV.P.F 03.01 (Sơ yếu lý lịch) thành PDF có dữ liệu.
//
//   GET /api/m03/export/f03-01?ids=<id1>,<id2>,...
//     1 nhân sự  → một file .pdf
//     ≥2 nhân sự → một file .zip chứa mỗi người một .pdf riêng
//
// Quyền: yêu cầu phiên đăng nhập (src/proxy.ts đã chặn mọi request ẩn danh tới /api/*). KHÔNG
// siết thêm theo vai trò M03, vì trang /modules/M03 hiện cho mọi người đã đăng nhập xem chính
// những dữ liệu này — siết riêng ở đây chỉ tạo ra nút bấm-không-được. Khi hệ thống siết quyền
// xem theo module (ISO 27001 — nguyên tắc cần-mới-biết) thì siết đồng thời cả trang lẫn route
// này, không để lệch nhau.
import JSZip from "jszip";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getFormMeta } from "@/lib/forms/meta";
import { formDocument } from "@/lib/forms/layout";
import { htmlToPdf } from "@/lib/pdf/render";
import {
  F03_01_FORM_CODE,
  f0301FileName,
  renderF0301Sheet,
  type F0301Employee,
} from "@/lib/m03/forms/f03-01";

// Chặn yêu cầu quá lớn — mỗi tờ là một lượt render Chromium.
const MAX_IDS = 100;

function errorJson(code: string, message: string, status: number) {
  return NextResponse.json({ ok: false, code, message }, { status });
}

/** Tên file đặt trong Content-Disposition: giữ bản ASCII cho client cũ, kèm filename* UTF-8. */
function contentDisposition(fileName: string): string {
  const ascii = fileName.replace(/[^\x20-\x7e]/g, "_").replace(/"/g, "");
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return errorJson("UNAUTHENTICATED", "Phiên đăng nhập đã hết hạn — đăng nhập lại để xuất hồ sơ.", 401);
  }

  const ids = (new URL(request.url).searchParams.get("ids") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (ids.length === 0) return errorJson("NO_SELECTION", "Chưa chọn nhân sự nào để xuất.", 400);
  if (ids.length > MAX_IDS) {
    return errorJson("TOO_MANY", `Mỗi lần xuất tối đa ${MAX_IDS} nhân sự.`, 400);
  }

  const rows = await prisma.m03Employee.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      code: true,
      fullName: true,
      position: true,
      department: true,
      employmentType: true,
      status: true,
      hireDate: true,
      laborContracts: {
        select: { contractType: true, status: true, effectiveDate: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (rows.length === 0) return errorJson("NOT_FOUND", "Không tìm thấy nhân sự đã chọn.", 404);

  // Giữ đúng thứ tự người dùng đã chọn trên bảng, không theo thứ tự DB trả về.
  const byId = new Map(rows.map((r) => [r.id, r]));
  const employees = ids.map((id) => byId.get(id)).filter((r): r is (typeof rows)[number] => !!r);

  const meta = await getFormMeta("M03", F03_01_FORM_CODE);

  if (employees.length === 1) {
    const e = employees[0] as F0301Employee;
    const pdf = await htmlToPdf(formDocument(meta.title, [renderF0301Sheet(e, meta)]));
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": contentDisposition(f0301FileName(e, meta)),
      },
    });
  }

  // Nhiều nhân sự: mỗi người một file PDF riêng, gói .zip — mỗi tờ là một hồ sơ độc lập
  // theo ETV.MP15, không gộp chung thành một tài liệu.
  const zip = new JSZip();
  const used = new Set<string>();
  for (const row of employees) {
    const e = row as F0301Employee;
    const pdf = await htmlToPdf(formDocument(meta.title, [renderF0301Sheet(e, meta)]));
    let name = f0301FileName(e, meta);
    // Mã nhân sự là unique nên trùng tên gần như không xảy ra — vẫn chặn để zip không mất file.
    for (let i = 2; used.has(name); i++) name = f0301FileName(e, meta).replace(/\.pdf$/, `_${i}.pdf`);
    used.add(name);
    zip.file(name, pdf);
  }

  const zipBuffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  const zipName = `${meta.code.replace(/\s+/g, "").replace(/^ETV\.P\./, "")}_SoYeuLyLich_${employees.length}NhanSu.zip`;

  return new NextResponse(new Uint8Array(zipBuffer), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": contentDisposition(zipName),
    },
  });
}
