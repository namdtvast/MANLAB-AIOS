// Quy tắc đặt RANH GIỚI DỮ LIỆU của một nền tảng mô hình — ETV.P29 §5.5.
//
// Tách khỏi actions.ts để test được mà không phải giả lập phiên đăng nhập: đây là chốt an ninh,
// nó cần ca test chứ không cần chạy thử bằng tay.
import type { AIDataBoundary } from "@/generated/prisma/enums";

export interface KetQuaKiemTra {
  ok: boolean;
  loi?: string;
}

/**
 * Nới lên "rời hạ tầng, CÓ cam kết" là trạng thái DUY NHẤT đòi bằng chứng: §5.5 yêu cầu điều
 * khoản của nhà cung cấp phải được TRÍCH VÀO hồ sơ AIA (F29.02). Đặt được trạng thái đó mà không
 * dẫn hồ sơ thì cái nới trần không có gì chống lưng — enum chỉ còn là ô tích.
 *
 * Hai trạng thái còn lại không đòi hồ sơ: một cái không gửi gì ra ngoài, một cái là mức siết nhất.
 */
export function kiemTraDatRanhGioi(ranhGioi: AIDataBoundary, soHoSo: string | null | undefined): KetQuaKiemTra {
  if (ranhGioi !== "EXTERNAL_WITH_COMMITMENT") return { ok: true };
  if (!soHoSo?.trim())
    return {
      ok: false,
      loi:
        "Phải dẫn số hồ sơ AIA/ETV.P.F29.02 có trích điều khoản của nhà cung cấp về việc không dùng dữ liệu để huấn luyện lại — " +
        "ETV.P29 §5.5 đòi bằng chứng, không đòi niềm tin.",
    };
  return { ok: true };
}

/** Số hồ sơ chỉ có nghĩa với trạng thái có cam kết; hai trạng thái kia luôn xoá về null. */
export function chuanHoaSoHoSo(ranhGioi: AIDataBoundary, soHoSo: string | null | undefined): string | null {
  return ranhGioi === "EXTERNAL_WITH_COMMITMENT" ? (soHoSo?.trim() ?? null) : null;
}
