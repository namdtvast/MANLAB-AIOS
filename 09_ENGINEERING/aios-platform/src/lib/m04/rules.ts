// M04 — gate/state machine thuần hàm, AUTHORITATIVE. Port từ ETV.P04_MoiTruong.md (Đã phê duyệt,
// lần 03) quy tắc 1, 2, 4, 5 — xem 01_Requirement/_work/20260823-xay-moi-m04/spec.md để đối
// chiếu "Quyết định phạm vi" (không có 08_Source nguyên mẫu, giống M01/M02/M03).
import type { M04PlanStatus, M04RiskLevel } from "@/generated/prisma/enums";

export type TxResult =
  | { ok: true; status: string; action: string; reason: string | null; patch: Record<string, unknown> }
  | { ok: false; code: string; message: string };

const ok = (status: string, action: string, reason: string | null = null, patch: Record<string, unknown> = {}): TxResult => ({
  ok: true,
  status,
  action,
  reason,
  patch,
});
const err = (code: string, message: string): TxResult => ({ ok: false, code, message });

export interface M04ActorUser {
  id: string;
  m04Role: string | null; // NV / TP / LDV / QLKT / QLCL
}

// ---------- M04ConditionLog — gate quy tắc 1–2 ----------

export interface AreaSpecForRules {
  tempMin: number;
  tempMax: number;
  humidityMin: number;
  humidityMax: number;
}

export function computeWithinSpec(area: AreaSpecForRules, temperature: number, humidity: number): boolean {
  return temperature >= area.tempMin && temperature <= area.tempMax && humidity >= area.humidityMin && humidity <= area.humidityMax;
}

export function validateConditionLog(withinSpec: boolean, abnormalAction: string | null | undefined): string | null {
  if (!withinSpec && !abnormalAction) {
    return "Vượt ngưỡng cho phép — bắt buộc ghi biện pháp xử lý (quy tắc 2 ETV.P04).";
  }
  return null;
}

// ---------- M04FieldWorkPlan — gate quy tắc 4–5 ----------

export interface PlanForRules {
  status: M04PlanStatus;
  riskLevel: M04RiskLevel;
  site: string;
  workItems: string[];
}

export const canApprovePlan = (p: PlanForRules, u: M04ActorUser) => {
  if (p.riskLevel === "CAO") return u.m04Role === "LDV";
  return u.m04Role === "TP" || u.m04Role === "LDV";
};

export function txSubmitPlan(p: PlanForRules): TxResult {
  if (p.status !== "DRAFT" && p.status !== "REJECTED") return err("NOT_DRAFT", "Chỉ kế hoạch Đang soạn/Từ chối mới gửi duyệt được.");
  if (p.workItems.length === 0) return err("WORK_ITEMS_REQUIRED", "Bắt buộc có ít nhất 1 hạng mục công việc.");
  return ok("PENDING_APPROVAL", "Gửi duyệt kế hoạch hiện trường");
}

export function txApprovePlan(
  p: PlanForRules,
  u: M04ActorUser,
  { decision, reason }: { decision?: "reject" | "approve"; reason?: string } = {}
): TxResult {
  if (p.status !== "PENDING_APPROVAL") return err("BAD_STATE", "Kế hoạch không ở bước Chờ duyệt.");
  if (decision === "reject") {
    if (!reason) return err("REASON_REQUIRED", "Từ chối bắt buộc nhập lý do.");
    return ok("REJECTED", "Từ chối kế hoạch hiện trường", reason, { approvedById: null });
  }
  if (!canApprovePlan(p, u)) {
    return err(
      "FORBIDDEN",
      p.riskLevel === "CAO"
        ? "Kế hoạch mức Rủi ro cao — chỉ LĐV được phê duyệt (quy tắc 5 ETV.P04)."
        : "Chỉ TP hoặc LĐV được phê duyệt kế hoạch hiện trường."
    );
  }
  return ok("APPROVED", "Phê duyệt kế hoạch hiện trường", null, { approvedById: u.id });
}

export function txMarkBriefed(p: PlanForRules): TxResult {
  if (p.status !== "APPROVED") return err("BAD_STATE", "Chỉ kế hoạch Đã duyệt mới đánh dấu đã phổ biến được.");
  return ok("APPROVED", "Đánh dấu đã phổ biến cho nhân sự tham gia", null, { briefed: true, briefedAt: new Date() });
}
