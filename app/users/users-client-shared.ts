export const USER_ROLE_OPTIONS = ["ADMIN", "GERANT", "BUREAU", "ADE", "AA", "TAXI", "REGULATEUR"] as const;

export type DepotLite = {
  id: string;
  name: string;
  isActive: boolean;
};

export type UserListRow = {
  id: string;
  name: string;
  firstName?: string | null;
  lastName?: string | null;
  initials?: string | null;
  phone?: string | null;
  email: string | null;
  role: string;
  depotId: string | null;
  depot: DepotLite | null;
  isTrainee?: boolean;
  dailyWorkStartTime?: string | null;
  dailyWorkEndTime?: string | null;
};

export function dailyScheduleLabel(user: Pick<UserListRow, "dailyWorkStartTime" | "dailyWorkEndTime">) {
  if (!user.dailyWorkStartTime || !user.dailyWorkEndTime) return "Non renseigne";
  return `${user.dailyWorkStartTime} - ${user.dailyWorkEndTime}`;
}

export function depotLabel(depot: DepotLite | null) {
  if (!depot) return "Aucune";
  return depot.isActive ? depot.name : `${depot.name} (archive)`;
}
