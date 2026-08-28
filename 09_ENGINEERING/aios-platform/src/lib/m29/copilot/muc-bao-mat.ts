// Trần mức bảo mật suy từ ranh giới dữ liệu của nền tảng — ETV.P29 §5.5.
//
// Tách khỏi retrieval.ts vì file đó import prisma: giao diện (client component) cần đúng phép ánh
// xạ này để nói cho người vận hành biết đặt ranh giới nào thì Copilot đọc được tới mức nào, mà
// import từ retrieval.ts sẽ kéo cả Prisma vào bundle trình duyệt. Nhân đôi phép ánh xạ thì sớm
// muộn hai bản lệch nhau, nên đặt một bản duy nhất ở đây.
import type { AIDataBoundary } from "@/generated/prisma/enums";

export const INDEXABLE_LEVELS = ["Cong-khai", "Noi-bo"] as const;

/**
 * TRẦN MỨC BẢO MẬT ĐƯỢC GỬI RA NGOÀI — suy từ RANH GIỚI DỮ LIỆU của chính nền tảng đang phục vụ
 * lượt hỏi, không phải từ một biến toàn cục.
 *
 * Vì sao theo từng nền tảng: một cấu hình có thể có nhiều nền tảng mô hình cùng lúc — mô hình tự
 * vận hành trong hạ tầng của Viện, và dịch vụ ngoài. Một trần toàn cục buộc phải chọn con số thấp
 * nhất cho tất cả (mô hình nội bộ mất tài liệu Nội bộ dù dữ liệu không hề rời Viện), hoặc nới cho
 * tất cả (tài liệu Nội bộ chảy ra dịch vụ ngoài). Cả hai đều sai.
 *
 * Ánh xạ thẳng từ §5.5, không suy diễn:
 *   không rời hạ tầng          → Nội bộ
 *   rời, CÓ cam kết (F29.02)   → Nội bộ
 *   rời, KHÔNG cam kết         → chỉ Công khai
 */
export function mucBaoMatToiDa(ranhGioi: AIDataBoundary): (typeof INDEXABLE_LEVELS)[number] {
  return ranhGioi === "NO_EXTERNAL_TRANSFER" || ranhGioi === "EXTERNAL_WITH_COMMITMENT" ? "Noi-bo" : "Cong-khai";
}
