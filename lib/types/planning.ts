// lib/types/planning.ts

export type PlanningIssueCode =
  | "NOT_FOUND"
  | "FORBIDDEN_COMPANY"
  | "INVALID_SLOT_COUNT"
  | "DUPLICATE_USER_IN_SAME_SHIFT"
  | "RUN_NOT_DRAFT"
  | "USER_OVERLAP_CONFLICT"
  | "VEHICLE_OVERLAP_CONFLICT"
  | "MIN_REST_VIOLATION"
  | "RULE_BLOCKED"
  | "VALIDATION_ERROR";

export type PlanningIssue = {
  code: PlanningIssueCode;
  message: string;
  meta?: Record<string, unknown>;
};