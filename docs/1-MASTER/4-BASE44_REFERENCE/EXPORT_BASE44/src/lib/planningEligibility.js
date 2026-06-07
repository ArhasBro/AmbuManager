/**
 * Filtre les utilisateurs éligibles pour le planning.
 * Règles :
 * - is_archived !== true
 * - status !== "Inactif" (null/vide/absent = compatible temporairement)
 * - operational_status !== "Absent"
 * - operational_status !== "Indisponible"
 * - full_name normalisé : full_name → prénom + nom → email
 */
export function getPlanningEligibleUsers(users = []) {
  return users
    .filter((u) => {
      if (u.is_archived === true) return false;
      if (u.status === "Inactif") return false;
      if (u.operational_status === "Absent") return false;
      if (u.operational_status === "Indisponible") return false;
      return true;
    })
    .map((u) => ({
      ...u,
      full_name:
        u.full_name ||
        [u.first_name, u.last_name].filter(Boolean).join(" ") ||
        u.email ||
        "—",
    }));
}