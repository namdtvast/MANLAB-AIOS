// M29 — hằng số RBAC, port 1:1 từ 05_MODULE_LIBRARY/M29_AI/08_Source/api/model.mjs.
import type { AIPermissionLevel } from "@/generated/prisma/enums";

export type M29Role = "AI_VIEWER" | "AI_OPERATOR" | "AI_ADMIN" | "AI_SECURITY_ADMIN" | "AI_AUDITOR" | "SUPER_ADMIN";

// Thứ tự vai trò dùng để so sánh "tối thiểu cần có" cho permission_level của Tool.
export const ROLE_RANK: Record<M29Role, number> = {
  AI_VIEWER: 1,
  AI_AUDITOR: 1,
  AI_OPERATOR: 2,
  AI_ADMIN: 3,
  AI_SECURITY_ADMIN: 3,
  SUPER_ADMIN: 9,
};

export const TOOL_MIN_ROLE: Record<AIPermissionLevel, M29Role> = {
  READ: "AI_VIEWER",
  COMPUTE: "AI_OPERATOR",
  PROPOSE: "AI_ADMIN",
  EXECUTE: "AI_ADMIN",
};

export type PermCategory =
  | "platforms"
  | "registry"
  | "aia"
  | "governance"
  | "evaluations"
  | "traces"
  | "usage"
  | "secrets"
  | "audit"
  | "health"
  | "incidents"
  | "unregistered";

// Ma trận RBAC — port nguyên `PERMS` trong rules.mjs (khớp mục 4 DacTa.md M29_AI).
export const PERMS: Record<M29Role, Partial<Record<PermCategory, "r" | "rw">>> = {
  AI_VIEWER: { platforms: "r", registry: "r", health: "r", incidents: "r" },
  AI_OPERATOR: { platforms: "r", registry: "r", evaluations: "rw", traces: "r", usage: "r", health: "r", incidents: "rw", unregistered: "r" },
  AI_ADMIN: { platforms: "r", registry: "rw", aia: "rw", governance: "r", evaluations: "r", health: "r", incidents: "rw", unregistered: "rw" },
  AI_SECURITY_ADMIN: { platforms: "r", registry: "r", governance: "rw", secrets: "rw", health: "r", incidents: "rw", unregistered: "rw" },
  AI_AUDITOR: { platforms: "r", registry: "r", governance: "r", aia: "r", audit: "r", traces: "r", health: "r", incidents: "r", unregistered: "r" },
  SUPER_ADMIN: {
    platforms: "rw",
    registry: "rw",
    governance: "rw",
    aia: "rw",
    evaluations: "rw",
    traces: "r",
    usage: "r",
    secrets: "rw",
    audit: "r",
    health: "r",
    incidents: "rw",
    unregistered: "rw",
  },
};

export function can(role: M29Role | null, category: PermCategory, action: "read" | "write" = "read"): boolean {
  if (!role) return false;
  const p = PERMS[role]?.[category] ?? "";
  return action === "write" ? p.includes("w") : p.length > 0;
}
