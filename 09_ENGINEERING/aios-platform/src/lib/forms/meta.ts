// Metadata của biểu mẫu gốc (mã số / tên / lần ban hành / ngày ban hành) để in lên đầu bản xuất.
//
// Nguồn sự thật là frontmatter của chính file biểu mẫu trong 06_SHARED_RESOURCES/01_Forms; nó
// được prisma/seed.ts đọc lên và nạp vào PlatformModule.forms (cùng đường với danh sách biểu mẫu
// mà <CanCuBanner> hiển thị). Ở đây CHỈ đọc lại từ DB — không đọc file lúc chạy, vì truy cập
// filesystem động khiến Next đóng gói toàn bộ repo vào bundle deploy.
//
// Biểu mẫu ban hành lại (revision 03 → 04) thì chạy lại seed, bản xuất tự đổi theo, không sửa code.
import { prisma } from "@/lib/prisma";

export interface FormMeta {
  /** Mã đầy đủ như trong frontmatter, vd "ETV.P.F03.01" */
  code: string;
  /** Tên biểu mẫu, vd "Sơ yếu lý lịch" */
  title: string;
  /** Lần ban hành, vd "03" */
  revision: string;
  /** Ngày ban hành dạng dd/mm/yyyy như trong file gốc */
  effectiveDate: string;
  /** Đường dẫn tương đối trong repo — để đối chiếu/deep-link cổng tài liệu */
  repoPath: string | null;
}

interface StoredFormRef {
  code: string;
  title: string;
  path: string | null;
  revision: string | null;
  effectiveDate: string | null;
}

/**
 * Tra metadata một biểu mẫu trong danh sách biểu mẫu áp dụng của module.
 *
 * @param moduleCode mã module, vd "M03"
 * @param formCode mã biểu mẫu như khai trong manifest/frontmatter, vd "ETV.P.F03.01"
 * @throws nếu module chưa nạp hoặc biểu mẫu không nằm trong danh sách áp dụng của module —
 *   im lặng trả về metadata rỗng sẽ in ra bản biểu mẫu thiếu mã số, tệ hơn là báo lỗi thẳng.
 */
export async function getFormMeta(moduleCode: string, formCode: string): Promise<FormMeta> {
  const mod = await prisma.platformModule.findUnique({
    where: { code: moduleCode },
    select: { forms: true },
  });
  if (!mod) throw new Error(`Chưa nạp module ${moduleCode} — chạy lại prisma/seed.ts.`);

  const forms = (mod.forms as unknown as StoredFormRef[] | null) ?? [];
  const found = forms.find((f) => f.code === formCode);
  if (!found) {
    throw new Error(
      `Biểu mẫu ${formCode} không nằm trong danh sách biểu mẫu áp dụng của ${moduleCode} ` +
        `(nguồn: manifest.yaml + links.yaml của MP tương ứng).`,
    );
  }

  return {
    code: found.code,
    title: found.title,
    revision: found.revision ?? "",
    effectiveDate: found.effectiveDate ?? "",
    repoPath: found.path,
  };
}
