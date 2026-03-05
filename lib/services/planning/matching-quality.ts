import type { MatchingPlanItem, MatchingReason } from "./matching.service";

export type PlanningQualityWeights = {
  coverage: number;
  stability: number;
  equity: number;
};

export type PlanningQuality = {
  overall: number;
  weights: PlanningQualityWeights;

  coverage: { score: number; covered: number; total: number; pct: number };
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

  countsByReason: Record<MatchingReason, number>;
  explanations: string[];
};

export const PLANNING_QUALITY_DEFAULT_WEIGHTS: PlanningQualityWeights = {
  coverage: 0.5,
  stability: 0.3,
  equity: 0.2,
};

const EMPTY_COUNTS: Record<MatchingReason, number> = {
  MATCHED: 0,
  ALREADY_ASSIGNED: 0,
  NO_REQUIRED_ROLE: 0,
  NO_USER_WITH_REQUIRED_ROLE: 0,
  USER_CONFLICT: 0,
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

/**
 * Score qualité planning (PROPOSITION à consigner dans REGISTRE_DECISIONS en clôture)
 * - Couverture : % des shifts avec requiredRole assignés (MATCHED ou ALREADY_ASSIGNED)
 * - Stabilité  : pénalité sur USER_CONFLICT (sur shifts avec requiredRole)
 * - Équité     : 1/(1+CV) sur la distribution des assignations par user (MATCHED/ALREADY_ASSIGNED)
 */
export function computePlanningQuality(
  plan: MatchingPlanItem[],
  weights: PlanningQualityWeights = PLANNING_QUALITY_DEFAULT_WEIGHTS
): PlanningQuality {
  const counts: Record<MatchingReason, number> = { ...EMPTY_COUNTS };

  for (const item of plan) {
    const r = item.reason;
    if (r in counts) counts[r as MatchingReason] = (counts[r as MatchingReason] ?? 0) + 1;
  }

  const withRole = plan.filter((i) => i.requiredRole !== null);
  const totalWithRole = withRole.length;

  const covered = withRole.filter((i) => i.reason === "MATCHED" || i.reason === "ALREADY_ASSIGNED").length;
  const coverageScore = totalWithRole === 0 ? 100 : pct(covered, totalWithRole);

  const conflicts = withRole.filter((i) => i.reason === "USER_CONFLICT").length;
  const stabilityScore = totalWithRole === 0 ? 100 : clampScore(100 - (conflicts / totalWithRole) * 100);
  const conflictPct = totalWithRole === 0 ? 0 : pct(conflicts, totalWithRole);

  // Équité (distribution des assignations par user)
  const byUser = new Map<string, number>();
  for (const i of plan) {
    const assignedUserId =
      i.reason === "MATCHED" || i.reason === "ALREADY_ASSIGNED"
        ? (i.proposedUserId ?? i.currentUserId)
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
    const variance = userCounts.reduce((acc, c) => acc + (c - meanRaw) ** 2, 0) / users;
    stdevRaw = Math.sqrt(variance);
  }

  const cvRaw = meanRaw > 0 ? stdevRaw / meanRaw : 0;

  const min = users > 0 ? Math.min(...userCounts) : 0;
  const max = users > 0 ? Math.max(...userCounts) : 0;

  const equityScore = users <= 1 ? 100 : clampScore(100 * (1 / (1 + cvRaw)));

  const sumWeights = weights.coverage + weights.stability + weights.equity;
  const norm = sumWeights > 0 ? sumWeights : 1;

  const overallRaw =
    coverageScore * (weights.coverage / norm) +
    stabilityScore * (weights.stability / norm) +
    equityScore * (weights.equity / norm);

  const overall = clampScore(overallRaw);

  const mean = Number(meanRaw.toFixed(2));
  const stdev = Number(stdevRaw.toFixed(2));
  const cv = Number(cvRaw.toFixed(2));

  const explanations: string[] = [
    `Couverture: ${covered}/${totalWithRole} shifts avec rôle assignés (MATCHED ou déjà assignés) → ${coverageScore}/100.`,
    `Stabilité: ${conflicts} conflit(s) utilisateur sur ${totalWithRole} shifts avec rôle (${conflictPct}%) → ${stabilityScore}/100.`,
    `Équité: ${users} utilisateur(s) assignés, min=${min}, max=${max}, moyenne=${mean}, CV=${cv} → ${equityScore}/100.`,
  ];

  const noRole = counts.NO_REQUIRED_ROLE ?? 0;
  const noUser = counts.NO_USER_WITH_REQUIRED_ROLE ?? 0;

  if (noRole > 0) explanations.push(`Données: ${noRole} shift(s) sans requiredRole → NO_REQUIRED_ROLE.`);
  if (noUser > 0) explanations.push(`Ressources: ${noUser} shift(s) sans utilisateur avec le rôle requis → NO_USER_WITH_REQUIRED_ROLE.`);
  if ((counts.USER_CONFLICT ?? 0) > 0) explanations.push(`Conflits: ${counts.USER_CONFLICT} shift(s) non assignés pour conflit utilisateur → USER_CONFLICT.`);

  return {
    overall,
    weights,
    coverage: { score: coverageScore, covered, total: totalWithRole, pct: totalWithRole === 0 ? 100 : pct(covered, totalWithRole) },
    stability: { score: stabilityScore, conflicts, total: totalWithRole, pct: conflictPct },
    equity: { score: equityScore, users, totalAssigned, mean, stdev, cv, min, max },
    countsByReason: counts,
    explanations,
  };
}