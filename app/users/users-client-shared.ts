export const USER_ROLE_OPTIONS = ["ADMIN", "GERANT", "BUREAU", "ADE", "AA", "TAXI", "REGULATEUR"] as const;

export type DepotLite = {
  id: string;
  name: string;
  isActive: boolean;
};

export type UserListRow = {
  id: string;
  name: string;
  email: string | null;
  role: string;
  depotId: string | null;
  depot: DepotLite | null;
};

export function depotLabel(depot: DepotLite | null) {
  if (!depot) return "Aucune";
  return depot.isActive ? depot.name : `${depot.name} (archivé)`;
}
