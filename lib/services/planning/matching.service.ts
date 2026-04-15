import { Prisma, PrismaClient, Role, VehicleStatus, VehicleType } from "@prisma/client";

import { loadMinRestCompanyRule } from "@/lib/company-rules/runtime";
import { buildUserAbsenceMap, isUserAbsent, listUserAbsenceWindows } from "@/lib/services/planning/user-absence";
import {
  getAllowedRolesForFirstSlot,
  getAllowedRolesForSecondSlot,
  getAllowedRolesForVehicleType,
  isRoleAllowedForVehicleType,
  resolveTemplateMinStaffCount,
} from "@/lib/templates/template-rules";

export type MatchingReason =
  | "MATCHED"
  | "ALREADY_ASSIGNED"
  | "NO_REQUIRED_ROLE"
  | "NO_USER_WITH_REQUIRED_ROLE"
  | "USER_UNAVAILABLE"
  | "MIN_REST_CONFLICT"
  | "NO_VEHICLE_WITH_REQUIRED_TYPE"
  | "VEHICLE_UNAVAILABLE"
  | "ROLE_VEHICLE_RESTRICTION";

export type MatchingTarget = "USER_1" | "USER_2" | "VEHICLE";

export type MatchingPlanItem = {
  shiftId: string;
  startAt: string;
  endAt: string;
  target: MatchingTarget;
  requiredRole: string | null;
  requiredVehicleType: string | null;
  currentUserId: string | null;
  proposedUserId: string | null;
  currentVehicleId: string | null;
  proposedVehicleId: string | null;
  reason: MatchingReason;
  message: string;
};

export type MatchingApplyItem = MatchingPlanItem & {
  applied: boolean;
};

type DbClient = PrismaClient | Prisma.TransactionClient;

type ComputeOptions = {
  companyId: string;
  runId: string;
  includeAlreadyAssigned?: boolean;
};

type ApplyOptions = {
  companyId: string;
  runId: string;
  plan: MatchingPlanItem[];
};

type AutoMatchOptions = {
  companyId: string;
  runId: string;
  dryRun?: boolean;
};

type BusyWindow = { startAt: Date; endAt: Date };
type TimelineItem = { startAt: Date; endAt: Date };

type DraftShiftState = {
  id: string;
  startAt: Date;
  endAt: Date;
  userId: string | null;
  user2Id: string | null;
  vehicleId: string | null;
  template: {
    category: string | null;
    requiredRole: Role | null;
    secondaryAllowedRoles: Role[];
    minStaffCount: number | null;
    requiredVehicleType: VehicleType | null;
  } | null;
};

type ExistingShiftRow = {
  startAt: Date;
  endAt: Date;
  userId: string | null;
  user2Id: string | null;
  vehicleId: string | null;
};

type UserCandidate = { id: string; role: Role | null };
type VehicleCandidate = { id: string; type: VehicleType; immatriculation: string };

type AssignmentResources = {
  usersByRole: Map<Role, UserCandidate[]>;
  userRoles: Map<string, Role | null>;
  absencesByUser: Map<string, Awaited<ReturnType<typeof listUserAbsenceWindows>>[number][]>;
  minRestHours: number | null;
  vehiclesByType: Map<VehicleType, VehicleCandidate[]>;
  userBusy: Map<string, BusyWindow[]>;
  vehicleBusy: Map<string, BusyWindow[]>;
  existingShifts: ExistingShiftRow[];
  userAssignmentCounts: Map<string, number>;
  vehicleAssignmentCounts: Map<string, number>;
};

function toIso(d: Date): string {
  return d.toISOString();
}

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && aEnd > bStart;
}

function toRoleEnum(value: unknown): Role | null {
  if (typeof value !== "string") return null;
  const roles = Object.values(Role) as string[];
  return roles.includes(value) ? (value as Role) : null;
}

function toVehicleTypeEnum(value: unknown): VehicleType | null {
  if (typeof value !== "string") return null;
  const types = Object.values(VehicleType) as string[];
  return types.includes(value) ? (value as VehicleType) : null;
}

function addBusyWindow(busy: Map<string, BusyWindow[]>, key: string, startAt: Date, endAt: Date) {
  const arr = busy.get(key) ?? [];
  arr.push({ startAt, endAt });
  busy.set(key, arr);
}

function isBusy(busy: Map<string, BusyWindow[]>, key: string, startAt: Date, endAt: Date): boolean {
  const arr = busy.get(key);
  if (!arr || arr.length === 0) return false;
  return arr.some((window) => overlaps(startAt, endAt, window.startAt, window.endAt));
}

function getTemplateRuleInput(shift: DraftShiftState) {
  const template = shift.template;
  return {
    category: template?.category ?? null,
    requiredRole: template?.requiredRole ?? null,
    secondaryAllowedRoles: template?.secondaryAllowedRoles ?? [],
    minStaffCount: template?.minStaffCount ?? null,
  };
}

function getRequiredSlots(shift: DraftShiftState): 1 | 2 {
  return resolveTemplateMinStaffCount(shift.template?.minStaffCount ?? null, shift.template?.category ?? null);
}

function getRolePoolForSlot(shift: DraftShiftState, slot: 1 | 2): Role[] {
  const templateInput = getTemplateRuleInput(shift);
  const roles = slot === 1 ? getAllowedRolesForFirstSlot(templateInput) : getAllowedRolesForSecondSlot(templateInput);
  return roles.map((role) => role as Role);
}

function getMissingSlots(shift: DraftShiftState): Array<1 | 2> {
  const slots: Array<1 | 2> = [];
  const requiredSlots = getRequiredSlots(shift);

  if (!shift.userId) slots.push(1);
  if (requiredSlots === 2 && !shift.user2Id) slots.push(2);

  return slots;
}

function getFilledSlots(shift: DraftShiftState): Array<1 | 2> {
  const slots: Array<1 | 2> = [];
  const requiredSlots = getRequiredSlots(shift);

  if (shift.userId) slots.push(1);
  if (requiredSlots === 2 && shift.user2Id) slots.push(2);

  return slots;
}

function rolePoolLabel(roles: readonly Role[]): string | null {
  if (roles.length === 0) return null;
  return Array.from(new Set(roles)).join("|");
}

function getNextAssignableField(shift: DraftShiftState, target: MatchingTarget): "userId" | "user2Id" | "vehicleId" | null {
  if (target === "USER_1") return shift.userId ? null : "userId";
  if (target === "USER_2") return shift.user2Id ? null : "user2Id";
  return shift.vehicleId ? null : "vehicleId";
}

function getAssignedUserIds(shift: DraftShiftState): string[] {
  return Array.from(new Set([shift.userId, shift.user2Id].filter((value): value is string => Boolean(value))));
}

function getUserRole(userRoles: Map<string, Role | null>, userId: string | null): Role | null {
  if (!userId) return null;
  return userRoles.get(userId) ?? null;
}

function getRoleVehicleRestrictionMessage(vehicleType: VehicleType, userRoles: Array<Role | null>): string {
  const allowed = getAllowedRolesForVehicleType(vehicleType);
  const current = userRoles.filter((role): role is Role => role !== null);
  return `Affectation véhicule impossible : les rôles ${current.join(", ") || "non définis"} ne sont pas autorisés sur un véhicule ${vehicleType}. Autorisés : ${allowed.join(", ") || "aucune restriction"}.`;
}

function describeMatchingReason(item: Pick<MatchingPlanItem, "target" | "reason" | "requiredRole" | "requiredVehicleType">): string {
  switch (item.reason) {
    case "MATCHED":
      return item.target === "VEHICLE"
        ? "Véhicule automatiquement proposé sur ce shift."
        : "Employé automatiquement proposé sur ce slot.";
    case "ALREADY_ASSIGNED":
      return item.target === "VEHICLE"
        ? "Véhicule déjà affecté sur ce shift."
        : "Employé déjà affecté sur ce slot.";
    case "NO_REQUIRED_ROLE":
      return "Le template ne définit pas de rôle exploitable pour ce slot.";
    case "NO_USER_WITH_REQUIRED_ROLE":
      return `Aucun employé actif ne porte le rôle requis (${item.requiredRole ?? "non défini"}).`;
    case "USER_UNAVAILABLE":
      return "Employés incompatibles ou indisponibles sur ce créneau (absence ou chevauchement).";
    case "MIN_REST_CONFLICT":
      return "Repos minimum non respecté pour tous les candidats compatibles.";
    case "NO_VEHICLE_WITH_REQUIRED_TYPE":
      return `Aucun véhicule actif disponible du type requis (${item.requiredVehicleType ?? "non défini"}).`;
    case "VEHICLE_UNAVAILABLE":
      return `Tous les véhicules compatibles sont déjà occupés ou indisponibles pour le type ${item.requiredVehicleType ?? "requis"}.`;
    case "ROLE_VEHICLE_RESTRICTION":
      return `Les rôles déjà affectés au shift ne sont pas autorisés sur le véhicule requis (${item.requiredVehicleType ?? "non défini"}).`;
    default:
      return "Signalement autoschedule.";
  }
}

function buildPlanItem(input: Omit<MatchingPlanItem, "message">): MatchingPlanItem {
  return {
    ...input,
    message: describeMatchingReason(input),
  };
}

function buildAssignedIntervalsForUser(
  shiftId: string,
  draftState: Map<string, DraftShiftState>,
  existingShifts: ExistingShiftRow[],
  userId: string
): TimelineItem[] {
  const items: TimelineItem[] = [];

  for (const shift of existingShifts) {
    if (shift.userId === userId || shift.user2Id === userId) {
      items.push({ startAt: shift.startAt, endAt: shift.endAt });
    }
  }

  for (const shift of draftState.values()) {
    if (shift.id === shiftId) continue;
    if (shift.userId === userId || shift.user2Id === userId) {
      items.push({ startAt: shift.startAt, endAt: shift.endAt });
    }
  }

  return items;
}

function violatesMinRest(
  shiftId: string,
  shiftStartAt: Date,
  shiftEndAt: Date,
  userId: string,
  minRestHours: number | null,
  draftState: Map<string, DraftShiftState>,
  existingShifts: ExistingShiftRow[]
): boolean {
  if (!minRestHours || minRestHours <= 0) return false;

  const intervals = buildAssignedIntervalsForUser(shiftId, draftState, existingShifts, userId);
  if (intervals.length === 0) return false;

  const requiredGapMs = minRestHours * 60 * 60 * 1000;

  for (const item of intervals) {
    if (overlaps(item.startAt, item.endAt, shiftStartAt, shiftEndAt)) {
      return true;
    }

    const beforeGap = Math.abs(shiftStartAt.getTime() - item.endAt.getTime());
    const afterGap = Math.abs(item.startAt.getTime() - shiftEndAt.getTime());

    if (item.endAt <= shiftStartAt && beforeGap < requiredGapMs) return true;
    if (shiftEndAt <= item.startAt && afterGap < requiredGapMs) return true;
  }

  return false;
}

async function loadDraftState(db: DbClient, companyId: string, runId: string): Promise<DraftShiftState[]> {
  const rows = await db.draftShift.findMany({
    where: { runId, run: { companyId } },
    include: {
      template: {
        select: {
          category: true,
          requiredRole: true,
          secondaryAllowedRoles: true,
          minStaffCount: true,
          requiredVehicleType: true,
        },
      },
    },
  });

  return rows
    .map((row) => ({
      id: row.id,
      startAt: row.startAt,
      endAt: row.endAt,
      userId: row.userId ?? null,
      user2Id: row.user2Id ?? null,
      vehicleId: row.vehicleId ?? null,
      template: row.template
        ? {
            category: row.template.category,
            requiredRole: toRoleEnum(row.template.requiredRole),
            secondaryAllowedRoles: row.template.secondaryAllowedRoles
              .map((role) => toRoleEnum(role))
              .filter((role): role is Role => role !== null),
            minStaffCount: row.template.minStaffCount ?? null,
            requiredVehicleType: toVehicleTypeEnum(row.template.requiredVehicleType),
          }
        : null,
    }))
    .sort((a, b) => {
      const diff = a.startAt.getTime() - b.startAt.getTime();
      if (diff !== 0) return diff;
      return a.id.localeCompare(b.id);
    });
}

async function loadResources(
  db: DbClient,
  companyId: string,
  draftShifts: DraftShiftState[]
): Promise<AssignmentResources> {
  const requiredRoles = Array.from(
    new Set(
      draftShifts
        .flatMap((shift) => getMissingSlots(shift).flatMap((slot) => getRolePoolForSlot(shift, slot)))
        .filter((role): role is Role => role !== null)
    )
  );

  const requiredVehicleTypes = Array.from(
    new Set(
      draftShifts
        .map((shift) => shift.template?.requiredVehicleType ?? null)
        .filter((vehicleType): vehicleType is VehicleType => vehicleType !== null)
    )
  );

  const minStart = draftShifts.reduce((min, shift) => (shift.startAt < min ? shift.startAt : min), draftShifts[0]!.startAt);
  const maxEnd = draftShifts.reduce((max, shift) => (shift.endAt > max ? shift.endAt : max), draftShifts[0]!.endAt);

  const users = requiredRoles.length > 0
    ? await db.user.findMany({
        where: {
          companyId,
          isActive: true,
          role: { in: requiredRoles },
        },
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
        select: { id: true, role: true },
      })
    : [];

  const vehicles = requiredVehicleTypes.length > 0
    ? await db.vehicle.findMany({
        where: {
          companyId,
          isActive: true,
          status: VehicleStatus.ACTIVE,
          type: { in: requiredVehicleTypes },
        },
        orderBy: [{ immatriculation: "asc" }, { id: "asc" }],
        select: { id: true, type: true, immatriculation: true },
      })
    : [];

  const involvedUserIds = Array.from(
    new Set([
      ...users.map((user) => user.id),
      ...draftShifts.flatMap((shift) => [shift.userId, shift.user2Id]).filter((value): value is string => Boolean(value)),
    ])
  );

  const absencesByUser = buildUserAbsenceMap(
    await listUserAbsenceWindows(db, {
      companyId,
      userIds: involvedUserIds,
      startAt: minStart,
      endAt: maxEnd,
    })
  );

  const existingShifts = await db.shift.findMany({
    where: {
      companyId,
      isCancelled: false,
      startAt: { lt: maxEnd },
      endAt: { gt: minStart },
    },
    select: {
      startAt: true,
      endAt: true,
      userId: true,
      user2Id: true,
      vehicleId: true,
    },
  });

  const minRest = await loadMinRestCompanyRule(db, companyId);
  const minRestHours = minRest.kind === "OK" ? minRest.rule.hours : null;

  const usersByRole = new Map<Role, UserCandidate[]>();
  const userRoles = new Map<string, Role | null>();
  for (const user of users) {
    const role = toRoleEnum(user.role);
    userRoles.set(user.id, role);
    if (!role) continue;
    const arr = usersByRole.get(role) ?? [];
    arr.push({ id: user.id, role });
    usersByRole.set(role, arr);
  }

  if (involvedUserIds.length > users.length) {
    const assignedUsers = await db.user.findMany({
      where: { companyId, id: { in: involvedUserIds } },
      select: { id: true, role: true },
    });
    for (const user of assignedUsers) {
      userRoles.set(user.id, toRoleEnum(user.role));
    }
  }

  const vehiclesByType = new Map<VehicleType, VehicleCandidate[]>();
  for (const vehicle of vehicles) {
    const arr = vehiclesByType.get(vehicle.type) ?? [];
    arr.push(vehicle);
    vehiclesByType.set(vehicle.type, arr);
  }

  const userBusy = new Map<string, BusyWindow[]>();
  const vehicleBusy = new Map<string, BusyWindow[]>();
  const userAssignmentCounts = new Map<string, number>();
  const vehicleAssignmentCounts = new Map<string, number>();

  for (const shift of existingShifts) {
    if (shift.userId) addBusyWindow(userBusy, shift.userId, shift.startAt, shift.endAt);
    if (shift.user2Id) addBusyWindow(userBusy, shift.user2Id, shift.startAt, shift.endAt);
    if (shift.vehicleId) addBusyWindow(vehicleBusy, shift.vehicleId, shift.startAt, shift.endAt);
  }

  for (const shift of draftShifts) {
    if (shift.userId) {
      addBusyWindow(userBusy, shift.userId, shift.startAt, shift.endAt);
      userAssignmentCounts.set(shift.userId, (userAssignmentCounts.get(shift.userId) ?? 0) + 1);
    }
    if (shift.user2Id) {
      addBusyWindow(userBusy, shift.user2Id, shift.startAt, shift.endAt);
      userAssignmentCounts.set(shift.user2Id, (userAssignmentCounts.get(shift.user2Id) ?? 0) + 1);
    }
    if (shift.vehicleId) {
      addBusyWindow(vehicleBusy, shift.vehicleId, shift.startAt, shift.endAt);
      vehicleAssignmentCounts.set(shift.vehicleId, (vehicleAssignmentCounts.get(shift.vehicleId) ?? 0) + 1);
    }
  }

  return {
    usersByRole,
    userRoles,
    absencesByUser,
    minRestHours,
    vehiclesByType,
    userBusy,
    vehicleBusy,
    existingShifts,
    userAssignmentCounts,
    vehicleAssignmentCounts,
  };
}

function chooseBestUser(
  shift: DraftShiftState,
  slot: 1 | 2,
  draftState: Map<string, DraftShiftState>,
  resources: AssignmentResources
): MatchingPlanItem {
  const requiredRolePool = getRolePoolForSlot(shift, slot);
  const requiredRole = rolePoolLabel(requiredRolePool);
  const currentUserId = slot === 1 ? shift.userId : shift.user2Id;

  if (requiredRolePool.length === 0) {
    return buildPlanItem({
      shiftId: shift.id,
      startAt: toIso(shift.startAt),
      endAt: toIso(shift.endAt),
      target: slot === 1 ? "USER_1" : "USER_2",
      requiredRole: null,
      requiredVehicleType: shift.template?.requiredVehicleType ?? null,
      currentUserId,
      proposedUserId: null,
      currentVehicleId: shift.vehicleId,
      proposedVehicleId: null,
      reason: "NO_REQUIRED_ROLE",
    });
  }

  const seenCandidateIds = new Set<string>();
  const candidates = requiredRolePool
    .flatMap((role) => resources.usersByRole.get(role) ?? [])
    .filter((candidate) => {
      if (seenCandidateIds.has(candidate.id)) return false;
      seenCandidateIds.add(candidate.id);
      return true;
    });

  if (candidates.length === 0) {
    return buildPlanItem({
      shiftId: shift.id,
      startAt: toIso(shift.startAt),
      endAt: toIso(shift.endAt),
      target: slot === 1 ? "USER_1" : "USER_2",
      requiredRole,
      requiredVehicleType: shift.template?.requiredVehicleType ?? null,
      currentUserId,
      proposedUserId: null,
      currentVehicleId: shift.vehicleId,
      proposedVehicleId: null,
      reason: "NO_USER_WITH_REQUIRED_ROLE",
    });
  }

  const occupiedUserIds = new Set(getAssignedUserIds(shift));
  const free = candidates.filter((candidate) => {
    if (occupiedUserIds.has(candidate.id)) return false;
    if (isBusy(resources.userBusy, candidate.id, shift.startAt, shift.endAt)) return false;
    if (isUserAbsent(resources.absencesByUser, candidate.id, shift.startAt, shift.endAt)) return false;
    if (violatesMinRest(shift.id, shift.startAt, shift.endAt, candidate.id, resources.minRestHours, draftState, resources.existingShifts)) {
      return false;
    }
    return true;
  });

  if (free.length === 0) {
    const reason = candidates.some((candidate) =>
      violatesMinRest(shift.id, shift.startAt, shift.endAt, candidate.id, resources.minRestHours, draftState, resources.existingShifts)
    )
      ? "MIN_REST_CONFLICT"
      : "USER_UNAVAILABLE";

    return buildPlanItem({
      shiftId: shift.id,
      startAt: toIso(shift.startAt),
      endAt: toIso(shift.endAt),
      target: slot === 1 ? "USER_1" : "USER_2",
      requiredRole,
      requiredVehicleType: shift.template?.requiredVehicleType ?? null,
      currentUserId,
      proposedUserId: null,
      currentVehicleId: shift.vehicleId,
      proposedVehicleId: null,
      reason,
    });
  }

  free.sort((a, b) => {
    const countDiff = (resources.userAssignmentCounts.get(a.id) ?? 0) - (resources.userAssignmentCounts.get(b.id) ?? 0);
    if (countDiff !== 0) return countDiff;
    return a.id.localeCompare(b.id);
  });

  const chosen = free[0]!;
  addBusyWindow(resources.userBusy, chosen.id, shift.startAt, shift.endAt);
  resources.userAssignmentCounts.set(chosen.id, (resources.userAssignmentCounts.get(chosen.id) ?? 0) + 1);
  if (slot === 1) shift.userId = chosen.id;
  else shift.user2Id = chosen.id;
  draftState.set(shift.id, shift);

  return buildPlanItem({
    shiftId: shift.id,
    startAt: toIso(shift.startAt),
    endAt: toIso(shift.endAt),
    target: slot === 1 ? "USER_1" : "USER_2",
    requiredRole,
    requiredVehicleType: shift.template?.requiredVehicleType ?? null,
    currentUserId,
    proposedUserId: chosen.id,
    currentVehicleId: shift.vehicleId,
    proposedVehicleId: null,
    reason: "MATCHED",
  });
}

function validateAssignedRolesForVehicle(shift: DraftShiftState, userRoles: Map<string, Role | null>): string | null {
  const vehicleType = shift.template?.requiredVehicleType;
  if (!vehicleType) return null;

  const assignedRoles = getAssignedUserIds(shift).map((userId) => getUserRole(userRoles, userId));
  if (assignedRoles.length === 0) return null;

  const hasInvalidRole = assignedRoles.some((role) => role !== null && !isRoleAllowedForVehicleType(vehicleType, role));
  if (!hasInvalidRole) return null;

  return getRoleVehicleRestrictionMessage(vehicleType, assignedRoles);
}

function chooseBestVehicle(
  shift: DraftShiftState,
  draftState: Map<string, DraftShiftState>,
  resources: AssignmentResources,
  includeAlreadyAssigned: boolean
): MatchingPlanItem | null {
  const requiredVehicleType = shift.template?.requiredVehicleType ?? null;
  if (!requiredVehicleType) return null;

  const roleRestrictionMessage = validateAssignedRolesForVehicle(shift, resources.userRoles);
  const currentVehicleId = shift.vehicleId;

  if (currentVehicleId) {
    if (roleRestrictionMessage) {
      return {
        ...buildPlanItem({
          shiftId: shift.id,
          startAt: toIso(shift.startAt),
          endAt: toIso(shift.endAt),
          target: "VEHICLE",
          requiredRole: rolePoolLabel(getRolePoolForSlot(shift, 1)),
          requiredVehicleType,
          currentUserId: shift.userId,
          proposedUserId: null,
          currentVehicleId,
          proposedVehicleId: null,
          reason: "ROLE_VEHICLE_RESTRICTION",
        }),
        message: roleRestrictionMessage,
      };
    }

    return includeAlreadyAssigned
      ? buildPlanItem({
          shiftId: shift.id,
          startAt: toIso(shift.startAt),
          endAt: toIso(shift.endAt),
          target: "VEHICLE",
          requiredRole: rolePoolLabel(getRolePoolForSlot(shift, 1)),
          requiredVehicleType,
          currentUserId: shift.userId,
          proposedUserId: null,
          currentVehicleId,
          proposedVehicleId: currentVehicleId,
          reason: "ALREADY_ASSIGNED",
        })
      : null;
  }

  if (roleRestrictionMessage) {
    return {
      ...buildPlanItem({
        shiftId: shift.id,
        startAt: toIso(shift.startAt),
        endAt: toIso(shift.endAt),
        target: "VEHICLE",
        requiredRole: rolePoolLabel(getRolePoolForSlot(shift, 1)),
        requiredVehicleType,
        currentUserId: shift.userId,
        proposedUserId: null,
        currentVehicleId: null,
        proposedVehicleId: null,
        reason: "ROLE_VEHICLE_RESTRICTION",
      }),
      message: roleRestrictionMessage,
    };
  }

  const candidates = resources.vehiclesByType.get(requiredVehicleType) ?? [];
  if (candidates.length === 0) {
    return buildPlanItem({
      shiftId: shift.id,
      startAt: toIso(shift.startAt),
      endAt: toIso(shift.endAt),
      target: "VEHICLE",
      requiredRole: rolePoolLabel(getRolePoolForSlot(shift, 1)),
      requiredVehicleType,
      currentUserId: shift.userId,
      proposedUserId: null,
      currentVehicleId: null,
      proposedVehicleId: null,
      reason: "NO_VEHICLE_WITH_REQUIRED_TYPE",
    });
  }

  const free = candidates.filter((vehicle) => !isBusy(resources.vehicleBusy, vehicle.id, shift.startAt, shift.endAt));
  if (free.length === 0) {
    return buildPlanItem({
      shiftId: shift.id,
      startAt: toIso(shift.startAt),
      endAt: toIso(shift.endAt),
      target: "VEHICLE",
      requiredRole: rolePoolLabel(getRolePoolForSlot(shift, 1)),
      requiredVehicleType,
      currentUserId: shift.userId,
      proposedUserId: null,
      currentVehicleId: null,
      proposedVehicleId: null,
      reason: "VEHICLE_UNAVAILABLE",
    });
  }

  free.sort((a, b) => {
    const countDiff = (resources.vehicleAssignmentCounts.get(a.id) ?? 0) - (resources.vehicleAssignmentCounts.get(b.id) ?? 0);
    if (countDiff !== 0) return countDiff;
    return a.immatriculation.localeCompare(b.immatriculation, "fr");
  });

  const chosen = free[0]!;
  addBusyWindow(resources.vehicleBusy, chosen.id, shift.startAt, shift.endAt);
  resources.vehicleAssignmentCounts.set(chosen.id, (resources.vehicleAssignmentCounts.get(chosen.id) ?? 0) + 1);
  shift.vehicleId = chosen.id;
  draftState.set(shift.id, shift);

  return buildPlanItem({
    shiftId: shift.id,
    startAt: toIso(shift.startAt),
    endAt: toIso(shift.endAt),
    target: "VEHICLE",
    requiredRole: rolePoolLabel(getRolePoolForSlot(shift, 1)),
    requiredVehicleType,
    currentUserId: shift.userId,
    proposedUserId: null,
    currentVehicleId: null,
    proposedVehicleId: chosen.id,
    reason: "MATCHED",
  });
}

export async function computeDraftShiftMatchingByRole(
  db: DbClient,
  options: ComputeOptions
): Promise<MatchingPlanItem[]> {
  const { companyId, runId, includeAlreadyAssigned = false } = options;

  const draftShifts = await loadDraftState(db, companyId, runId);
  if (draftShifts.length === 0) return [];

  const draftState = new Map(draftShifts.map((shift) => [shift.id, { ...shift }]));
  const resources = await loadResources(db, companyId, draftShifts);

  const plan: MatchingPlanItem[] = [];

  for (const originalShift of draftShifts) {
    const shift = draftState.get(originalShift.id)!;
    const missingSlots = getMissingSlots(shift);

    if (missingSlots.length === 0 && includeAlreadyAssigned) {
      for (const slot of getFilledSlots(shift)) {
        const currentUserId = slot === 1 ? shift.userId : shift.user2Id;
        plan.push(
          buildPlanItem({
            shiftId: shift.id,
            startAt: toIso(shift.startAt),
            endAt: toIso(shift.endAt),
            target: slot === 1 ? "USER_1" : "USER_2",
            requiredRole: rolePoolLabel(getRolePoolForSlot(shift, slot)),
            requiredVehicleType: shift.template?.requiredVehicleType ?? null,
            currentUserId,
            proposedUserId: currentUserId,
            currentVehicleId: shift.vehicleId,
            proposedVehicleId: null,
            reason: "ALREADY_ASSIGNED",
          })
        );
      }
    }

    for (const slot of missingSlots) {
      plan.push(chooseBestUser(shift, slot, draftState, resources));
    }

    const vehicleItem = chooseBestVehicle(shift, draftState, resources, includeAlreadyAssigned);
    if (vehicleItem) plan.push(vehicleItem);
  }

  return plan;
}

export async function applyDraftShiftMatchingPlan(
  db: PrismaClient,
  options: ApplyOptions
): Promise<MatchingApplyItem[]> {
  const { companyId, runId, plan } = options;
  if (plan.length === 0) return [];

  return db.$transaction(async (tx) => {
    const draftShifts = await loadDraftState(tx, companyId, runId);
    const draftState = new Map(draftShifts.map((shift) => [shift.id, { ...shift }]));
    const resources = await loadResources(tx, companyId, draftShifts);
    const appliedResults: MatchingApplyItem[] = [];

    for (const item of plan) {
      const shift = draftState.get(item.shiftId);
      if (!shift) {
        appliedResults.push({ ...item, applied: false });
        continue;
      }

      if (item.reason !== "MATCHED") {
        appliedResults.push({ ...item, applied: false });
        continue;
      }

      if (item.target === "VEHICLE") {
        const proposedVehicleId = item.proposedVehicleId;
        if (!proposedVehicleId) {
          appliedResults.push({ ...item, applied: false });
          continue;
        }

        if (getNextAssignableField(shift, "VEHICLE") !== "vehicleId") {
          appliedResults.push({ ...item, applied: false });
          continue;
        }

        const requiredVehicleType = shift.template?.requiredVehicleType;
        if (!requiredVehicleType) {
          appliedResults.push({
            ...item,
            applied: false,
            reason: "NO_VEHICLE_WITH_REQUIRED_TYPE",
            message: "Le template du shift ne requiert pas de véhicule exploitable.",
          });
          continue;
        }

        if (validateAssignedRolesForVehicle(shift, resources.userRoles)) {
          appliedResults.push({
            ...item,
            applied: false,
            reason: "ROLE_VEHICLE_RESTRICTION",
            message: validateAssignedRolesForVehicle(shift, resources.userRoles) ?? item.message,
          });
          continue;
        }

        if (isBusy(resources.vehicleBusy, proposedVehicleId, shift.startAt, shift.endAt)) {
          appliedResults.push({
            ...item,
            applied: false,
            reason: "VEHICLE_UNAVAILABLE",
            message: describeMatchingReason({ ...item, reason: "VEHICLE_UNAVAILABLE" }),
          });
          continue;
        }

        const res = await tx.draftShift.updateMany({
          where: {
            id: item.shiftId,
            runId,
            run: { companyId },
            vehicleId: null,
          },
          data: { vehicleId: proposedVehicleId },
        });

        const applied = res.count === 1;
        appliedResults.push({ ...item, applied });

        if (applied) {
          shift.vehicleId = proposedVehicleId;
          draftState.set(shift.id, shift);
          addBusyWindow(resources.vehicleBusy, proposedVehicleId, shift.startAt, shift.endAt);
          resources.vehicleAssignmentCounts.set(proposedVehicleId, (resources.vehicleAssignmentCounts.get(proposedVehicleId) ?? 0) + 1);
        }

        continue;
      }

      const proposedUserId = item.proposedUserId;
      if (!proposedUserId) {
        appliedResults.push({ ...item, applied: false });
        continue;
      }

      const targetField = getNextAssignableField(shift, item.target);
      if (!targetField || (targetField !== "userId" && targetField !== "user2Id")) {
        appliedResults.push({ ...item, applied: false });
        continue;
      }

      if (isBusy(resources.userBusy, proposedUserId, shift.startAt, shift.endAt)) {
        appliedResults.push({
          ...item,
          applied: false,
          reason: "USER_UNAVAILABLE",
          message: describeMatchingReason({ ...item, reason: "USER_UNAVAILABLE" }),
        });
        continue;
      }

      if (isUserAbsent(resources.absencesByUser, proposedUserId, shift.startAt, shift.endAt)) {
        appliedResults.push({
          ...item,
          applied: false,
          reason: "USER_UNAVAILABLE",
          message: describeMatchingReason({ ...item, reason: "USER_UNAVAILABLE" }),
        });
        continue;
      }

      if (violatesMinRest(shift.id, shift.startAt, shift.endAt, proposedUserId, resources.minRestHours, draftState, resources.existingShifts)) {
        appliedResults.push({
          ...item,
          applied: false,
          reason: "MIN_REST_CONFLICT",
          message: describeMatchingReason({ ...item, reason: "MIN_REST_CONFLICT" }),
        });
        continue;
      }

      const res = await tx.draftShift.updateMany({
        where: {
          id: item.shiftId,
          runId,
          run: { companyId },
          [targetField]: null,
        },
        data: { [targetField]: proposedUserId },
      });

      const applied = res.count === 1;
      appliedResults.push({ ...item, applied });

      if (applied) {
        if (targetField === "userId") {
          shift.userId = proposedUserId;
        } else {
          shift.user2Id = proposedUserId;
        }
        draftState.set(shift.id, shift);
        addBusyWindow(resources.userBusy, proposedUserId, shift.startAt, shift.endAt);
        resources.userAssignmentCounts.set(proposedUserId, (resources.userAssignmentCounts.get(proposedUserId) ?? 0) + 1);
      }
    }

    return appliedResults;
  });
}

export async function autoMatchRunDraftShifts(
  db: PrismaClient,
  options: AutoMatchOptions
): Promise<MatchingPlanItem[] | MatchingApplyItem[]> {
  const { companyId, runId, dryRun = false } = options;

  const plan = await computeDraftShiftMatchingByRole(db, { companyId, runId });
  if (dryRun) return plan;

  return applyDraftShiftMatchingPlan(db, { companyId, runId, plan });
}
