// Référentiel centralisé des rôles métiers — V1.1
// Identifiants techniques : sans accent, sans espace, majuscules
// Ne jamais utiliser : Admin, Gérant, Régulateur, Gerant, Regulateur

export const BUSINESS_ROLES = ["ADMIN", "GERANT", "BUREAU", "REGULATEUR", "ADE", "AA", "TAXI"];

// Libellés affichés en français dans l'interface
export const BUSINESS_ROLE_LABELS = {
  ADMIN:     "Administrateur",
  GERANT:    "Gérant",
  BUREAU:    "Bureau",
  REGULATEUR:"Régulateur",
  ADE:       "ADE — Ambulancier DE",
  AA:        "AA — Auxiliaire Ambulancier",
  TAXI:      "Taxi",
};

// Libellé court (pour les badges, tableaux)
export const BUSINESS_ROLE_SHORT = {
  ADMIN:     "Admin",
  GERANT:    "Gérant",
  BUREAU:    "Bureau",
  REGULATEUR:"Régulateur",
  ADE:       "ADE",
  AA:        "AA",
  TAXI:      "TAXI",
};

// Helper : retourne le libellé court d'un rôle technique
export const roleLabel = (role) => BUSINESS_ROLE_SHORT[role] || role || "—";

// Rôles qui ont accès à chaque module (identifiants techniques)
export const MODULE_ROLES = {
  planning:   ["ADMIN", "GERANT", "BUREAU", "REGULATEUR"],
  utilisateurs:["ADMIN", "GERANT", "BUREAU"],
  modeles:    ["ADMIN", "GERANT", "BUREAU"],
  societe:    ["ADMIN", "GERANT"],
  depots:     ["ADMIN", "GERANT", "BUREAU"],
  mise_en_route:["ADMIN", "GERANT"],
  audit:      ["ADMIN"],
};

// Catalogue de permissions fines (libellés FR)
export const PERMISSION_CATALOG = [
  { code: "PLANNING_VIEW_SELF",    label: "Consulter son planning" },
  { code: "PLANNING_VIEW_GLOBAL",  label: "Consulter le planning global" },
  { code: "PLANNING_EDIT",         label: "Modifier le planning" },
  { code: "PLANNING_PUBLISH",      label: "Publier le planning" },
  { code: "PLANNING_CANCEL",       label: "Annuler/restaurer une affectation" },
  { code: "USERS_MANAGE",          label: "Gérer les utilisateurs" },
  { code: "USERS_ROLES_EDIT",      label: "Modifier les rôles/permissions utilisateurs" },
  { code: "USERS_PASSWORD_RESET",  label: "Réinitialiser les mots de passe" },
  { code: "TEMPLATES_CREATE",      label: "Créer des modèles horaires" },
  { code: "TEMPLATES_EDIT",        label: "Modifier des modèles horaires" },
  { code: "TEMPLATES_ARCHIVE",     label: "Archiver des modèles horaires" },
  { code: "TEMPLATES_RESTORE",     label: "Restaurer des modèles horaires" },
  { code: "VEHICLES_MANAGE",       label: "Gérer les véhicules" },
  { code: "VEHICLES_AVAILABILITY", label: "Modifier la disponibilité véhicules" },
  { code: "VEHICLES_CHECK",        label: "Vérifier les véhicules" },
  { code: "COMPANY_MANAGE",        label: "Gérer la société" },
  { code: "DEPOTS_MANAGE",         label: "Gérer les dépôts" },
  { code: "AUDIT_VIEW",            label: "Consulter l'audit" },
];

export const ABSENCE_STATUSES = ["En attente", "Validée", "Refusée", "Annulée"];
export const ABSENCE_TYPES = ["Absence", "Indisponibilité", "Congé", "Maladie", "Autre"];

// ---------------------------------------------------------------------------
// getCurrentBusinessRole
// Source unique du rôle métier. N'utilise PAS user.role pour les permissions.
// Retourne null si l'utilisateur n'a pas de business_role valide.
// ---------------------------------------------------------------------------
export const getCurrentBusinessRole = (user) => {
  if (!user) return null;
  // Le business_role peut être dans user.data (SDK Base44) ou directement sur user
  const br = user.data?.business_role ?? user.business_role;
  if (br && BUSINESS_ROLES.includes(br)) return br;
  // Tenter de normaliser si la valeur est un ancien identifiant
  const normalized = ROLE_NORMALIZE_MAP[br] ?? null;
  if (normalized) return normalized;
  return null;
};

// ---------------------------------------------------------------------------
// Matrice de permissions par rôle métier (phase Alpha)
// ADMIN et GERANT ont tous les droits. Les autres rôles sont limités.
// ---------------------------------------------------------------------------
const ROLE_PERMISSIONS = {
  ADMIN: [
    "PLANNING_VIEW_SELF", "PLANNING_VIEW_GLOBAL", "PLANNING_EDIT", "PLANNING_PUBLISH",
    "PLANNING_CANCEL", "USERS_MANAGE", "USERS_ROLES_EDIT", "USERS_PASSWORD_RESET",
    "TEMPLATES_CREATE", "TEMPLATES_EDIT", "TEMPLATES_ARCHIVE", "TEMPLATES_RESTORE",
    "VEHICLES_MANAGE", "VEHICLES_AVAILABILITY", "VEHICLES_CHECK",
    "COMPANY_MANAGE", "DEPOTS_MANAGE", "AUDIT_VIEW",
  ],
  GERANT: [
    "PLANNING_VIEW_SELF", "PLANNING_VIEW_GLOBAL", "PLANNING_EDIT", "PLANNING_PUBLISH",
    "PLANNING_CANCEL", "USERS_MANAGE", "USERS_ROLES_EDIT", "USERS_PASSWORD_RESET",
    "TEMPLATES_CREATE", "TEMPLATES_EDIT", "TEMPLATES_ARCHIVE", "TEMPLATES_RESTORE",
    "VEHICLES_MANAGE", "VEHICLES_AVAILABILITY", "VEHICLES_CHECK",
    "COMPANY_MANAGE", "DEPOTS_MANAGE",
  ],
  BUREAU: [
    "PLANNING_VIEW_SELF", "PLANNING_VIEW_GLOBAL", "PLANNING_EDIT", "PLANNING_PUBLISH",
    "PLANNING_CANCEL", "USERS_MANAGE",
    "TEMPLATES_CREATE", "TEMPLATES_EDIT", "TEMPLATES_ARCHIVE",
    "VEHICLES_CHECK",
  ],
  REGULATEUR: [
    "PLANNING_VIEW_SELF", "PLANNING_VIEW_GLOBAL", "PLANNING_EDIT",
    "VEHICLES_CHECK",
  ],
  ADE: ["PLANNING_VIEW_SELF"],
  AA:  ["PLANNING_VIEW_SELF"],
  TAXI: ["PLANNING_VIEW_SELF"],
};

/**
 * Vérifie si un utilisateur a une permission donnée.
 * Se base uniquement sur business_role + permissions fines explicites.
 * Retourne false si l'utilisateur n'a pas de rôle métier valide.
 *
 * @param {object} user
 * @param {string} permission  code de ROLE_PERMISSIONS
 * @returns {boolean}
 */
export const can = (user, permission) => {
  if (!user) return false;
  const role = getCurrentBusinessRole(user);
  if (!role) return false;
  // Vérifier la matrice de base
  const roleCan = (ROLE_PERMISSIONS[role] || []).includes(permission);
  if (roleCan) return true;
  // Vérifier les permissions fines explicitement accordées sur le compte
  const fine = (user.data?.permissions || user.permissions || []).includes(permission);
  return fine;
};

// Normalisation rétrocompatible : convertit les anciens identifiants accentués/casse mixte
// vers les identifiants techniques canoniques. PSC1 n'est pas un rôle, jamais inclus ici.
const ROLE_NORMALIZE_MAP = {
  admin:       "ADMIN",
  Admin:       "ADMIN",
  ADMIN:       "ADMIN",
  gérant:      "GERANT",
  Gérant:      "GERANT",
  gerant:      "GERANT",
  Gerant:      "GERANT",
  GERANT:      "GERANT",
  bureau:      "BUREAU",
  Bureau:      "BUREAU",
  BUREAU:      "BUREAU",
  régulateur:  "REGULATEUR",
  Régulateur:  "REGULATEUR",
  regulateur:  "REGULATEUR",
  Regulateur:  "REGULATEUR",
  REGULATEUR:  "REGULATEUR",
  ade:         "ADE",
  Ade:         "ADE",
  ADE:         "ADE",
  aa:          "AA",
  Aa:          "AA",
  AA:          "AA",
  taxi:        "TAXI",
  Taxi:        "TAXI",
  TAXI:        "TAXI",
};

/**
 * Normalise un tableau de rôles (allowed_roles) vers les identifiants techniques canoniques.
 * Les valeurs inconnues sont silencieusement écartées.
 * @param {string[]} roles
 * @returns {string[]}
 */
export const normalizeRoles = (roles) => {
  if (!Array.isArray(roles)) return [];
  const seen = new Set();
  return roles.reduce((acc, r) => {
    const canonical = ROLE_NORMALIZE_MAP[r] ?? null;
    if (canonical && !seen.has(canonical)) {
      seen.add(canonical);
      acc.push(canonical);
    }
    return acc;
  }, []);
};