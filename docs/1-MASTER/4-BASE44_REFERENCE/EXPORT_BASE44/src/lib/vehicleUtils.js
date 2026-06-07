// Règle métier : un véhicule inactif, indisponible ou archivé
// ne doit pas être proposé normalement au planning.
export function isVehiclePlanningEligible(v) {
  if (!v) return false;
  if (v.is_archived) return false;
  if (v.admin_status === "Inactif") return false;
  if (v.availability === "Indisponible") return false;
  return true;
}

// Liste filtrée des véhicules éligibles au planning.
export function getPlanningEligibleVehicles(vehicles = []) {
  return vehicles.filter(isVehiclePlanningEligible);
}