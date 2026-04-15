import type { MatchingPlanItem, MatchingReason } from "./matching.service";

export type PlanningQualityWeights = {
  coverage: number;
  stability: number;
  equity: number;
  vehicleCoverage: number;
};

export type PlanningQuality = {
  overall: number;
  weights: PlanningQualityWeights;
  coverage: { score: number; covered: number; total: number; pct: number };
  vehicleCoverage: { score: number; covered: number; total: number; pct: number };
  stability: { score: number; conflicts: number; total: number; pct: number };
  equity: {
    score: number;
    users: number;
    totalAssigned: number;
    mean: number;
    stdev: number;
    cv: number;
    min: number;
    max: number;
  };
  countsByReason: Partial<Record<MatchingReason, number>>;
  explanations: string[];
};

export const PLANNING_QUALITY_DEFAULT_WEIGHTS: PlanningQualityWeights = {
  coverage: 0.4,
  vehicleCoverage: 0.2,
  stability: 0.25,
  equity: 0.15,
};

function clampScore(n: number): number {
  if (!Number.isFinite(n)) return 0;
  if (n < 0) return 0;
  if (n > 100) return 100;
  return Math.round(n);
}

function pct(part: number, total: number): number {
  if (total <= 0) return 100;
  return Math.round((part / total) * 100);
}

export function computePlanningQuality(
  plan: MatchingPlanItem[],
  weights: PlanningQualityWeights = PLANNING_QUALITY_DEFAULT_WEIGHTS
): PlanningQuality {
  const counts = plan.reduce<Partial<Record<MatchingReason, number>>>((acc, item) => {
    acc[item.reason] = (acc[item.reason] ?? 0) + 1;
    return acc;
  }, {});

  const userTargets = plan.filter((item) => item.target === "USER_1" || item.target === "USER_2");
  const vehicleTargets = plan.filter((item) => item.target === "VEHICLE");

  const usersWithRole = userTargets.filter((item) => item.requiredRole !== null);
  const totalWithRole = usersWithRole.length;
  const covered = usersWithRole.filter((item) => item.reason === "MATCHED" || item.reason === "ALREADY_ASSIGNED").length;
  const coverageScore = totalWithRole === 0 ? 100 : pct(covered, totalWithRole);

  const totalVehicles = vehicleTargets.length;
  const coveredVehicles = vehicleTargets.filter((item) => item.reason === "MATCHED" || item.reason === "ALREADY_ASSIGNED").length;
  const vehicleCoverageScore = totalVehicles === 0 ? 100 : pct(coveredVehicles, totalVehicles);

  const conflictReasons: MatchingReason[] = ["USER_UNAVAILABLE", "MIN_REST_CONFLICT", "VEHICLE_UNAVAILABLE", "ROLE_VEHICLE_RESTRICTION"];
  const conflicts = plan.filter((item) => conflictReasons.includes(item.reason)).length;
  const stabilityBase = userTargets.length + vehicleTargets.length;
  const stabilityScore = stabilityBase === 0 ? 100 : clampScore(100 - (conflicts / stabilityBase) * 100);
  const conflictPct = stabilityBase === 0 ? 0 : pct(conflicts, stabilityBase);

  const byUser = new Map<string, number>();
  for (const item of userTargets) {
    const assignedUserId =
      item.reason === "MATCHED" || item.reason === "ALREADY_ASSIGNED"
        ? (item.proposedUserId ?? item.currentUserId)
        : null;

    if (typeof assignedUserId === "string" && assignedUserId.length > 0) {
      byUser.set(assignedUserId, (byUser.get(assignedUserId) ?? 0) + 1);
    }
  }

  const userCounts = Array.from(byUser.values());
  const users = userCounts.length;
  const totalAssigned = userCounts.reduce((a, b) => a + b, 0);
  const meanRaw = users > 0 ? totalAssigned / users : 0;

  let stdevRaw = 0;
  if (users > 0 && meanRaw > 0) {
    const variance = userCounts.reduce((acc, count) => acc + (count - meanRaw) ** 2, 0) / users;
    stdevRaw = Math.sqrt(variance);
  }

  const cvRaw = meanRaw > 0 ? stdevRaw / meanRaw : 0;
  const min = users > 0 ? Math.min(...userCounts) : 0;
  const max = users > 0 ? Math.max(...userCounts) : 0;
  const equityScore = users <= 1 ? 100 : clampScore(100 * (1 / (1 + cvRaw)));

  const sumWeights = weights.coverage + weights.vehicleCoverage + weights.stability + weights.equity;
  const norm = sumWeights > 0 ? sumWeights : 1;

  const overall = clampScore(
    coverageScore * (weights.coverage / norm) +
      vehicleCoverageScore * (weights.vehicleCoverage / norm) +
      stabilityScore * (weights.stability / norm) +
      equityScore * (weights.equity / norm)
  );

  const explanations: string[] = [
    `Couverture employés : ${covered}/${totalWithRole} besoins couverts → ${coverageScore}/100.`,
    `Couverture véhicules : ${coveredVehicles}/${totalVehicles} besoins couverts → ${vehicleCoverageScore}/100.`,
    `Stabilité : ${conflicts} signalement(s) bloquants ou indisponibilités sur ${stabilityBase} affectations analysées (${conflictPct}%) → ${stabilityScore}/100.`,
    `Équité employés : ${users} employé(s) affectés, min=${min}, max=${max}, moyenne=${Number(meanRaw.toFixed(2))}, CV=${Number(cvRaw.toFixed(2))} → ${equityScore}/100.`,
  ];

  if ((counts.NO_REQUIRED_ROLE ?? 0) > 0) {
    explanations.push(`Templates incomplets : ${counts.NO_REQUIRED_ROLE} slot(s) sans rôle exploitable.`);
  }
  if ((counts.NO_USER_WITH_REQUIRED_ROLE ?? 0) > 0) {
    explanations.push(`Ressources humaines : ${counts.NO_USER_WITH_REQUIRED_ROLE} slot(s) sans employé au rôle requis.`);
  }
  if ((counts.NO_VEHICLE_WITH_REQUIRED_TYPE ?? 0) > 0) {
    explanations.push(`Flotte : ${counts.NO_VEHICLE_WITH_REQUIRED_TYPE} shift(s) sans véhicule actif du type requis.`);
  }

  return {
    overall,
    weights,
    coverage: { score: coverageScore, covered, total: totalWithRole, pct: totalWithRole === 0 ? 100 : pct(covered, totalWithRole) },
    vehicleCoverage: {
      score: vehicleCoverageScore,
      covered: coveredVehicles,
      total: totalVehicles,
      pct: totalVehicles === 0 ? 100 : pct(coveredVehicles, totalVehicles),
    },
    stability: { score: stabilityScore, conflicts, total: stabilityBase, pct: conflictPct },
    equity: {
      score: equityScore,
      users,
      totalAssigned,
      mean: Number(meanRaw.toFixed(2)),
      stdev: Number(stdevRaw.toFixed(2)),
      cv: Number(cvRaw.toFixed(2)),
      min,
      max,
    },
    countsByReason: counts,
    explanations,
  };
}
