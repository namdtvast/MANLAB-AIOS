// Nhãn hiển thị tiếng Việt cho M21 — tách khỏi mã enum DB, port từ `var ST`/`KQ`/`ROLES`
// trong 08_Source/index.html.
import { STATUS_LABEL_INTERNAL } from "./rules";

export const STATUS_LABEL = STATUS_LABEL_INTERNAL;

export const STATUS_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  CHUALAP: "neutral",
  DANGLAP: "neutral",
  SOATXET: "neutral",
  DNLDV: "neutral",
  PHENOIBO: "neutral",
  DAGUI: "neutral",
  YEUCAUBOSUNG: "warn",
  TIEPNHAN: "neutral",
  CONGHIEU: "good",
  DIEUCHINH: "warn",
  TAMDUNG: "warn",
  HUYBO: "crit",
  HETHIEU: "crit",
};

export const RECORD_TYPE_LABEL: Record<string, string> = {
  DL: "Công bố năng lực Đo lường (Mẫu 01)",
  QTMT: "Thông báo QTMT (Mẫu 9.01)",
};

export const RECORD_TYPE_SHORT: Record<string, string> = {
  DL: "Đo lường",
  QTMT: "Quan trắc MT",
};

export const LINE_RESULT_LABEL: Record<string, string> = {
  DAPUNG: "Đáp ứng",
  KHONG: "Không đáp ứng",
  DIEUCHINH: "Điều chỉnh",
};

export const LINE_RESULT_TONE: Record<string, "good" | "warn" | "crit"> = {
  DAPUNG: "good",
  KHONG: "crit",
  DIEUCHINH: "warn",
};

export const M21_ROLE_LABEL: Record<string, string> = {
  NTH: "Người thực hiện",
  LDP: "Lãnh đạo phòng",
  LDV: "Lãnh đạo Viện",
};
