export const ALPHA_PERMISSION_CATALOG = [
  {
    code: "PLANNING_VIEW_SELF",
    label: "Consulter son planning",
    description: "Permet de consulter uniquement son planning personnel.",
  },
  {
    code: "PLANNING_VIEW_GLOBAL",
    label: "Consulter le planning global",
    description: "Permet de consulter le planning global de la société.",
  },
  {
    code: "PLANNING_EDIT",
    label: "Modifier le planning",
    description: "Permet de modifier le planning lorsque le contrôle produit existe.",
  },
  {
    code: "PLANNING_SHIFT_CREATE_MANUAL",
    label: "Créer un shift manuel",
    description: "Permet de créer manuellement un shift lorsqu'une entrée produit dédiée existe.",
  },
  {
    code: "PLANNING_SHIFT_EDIT_PUBLISHED",
    label: "Modifier un shift publié",
    description: "Permet de modifier un shift déjà publié lorsqu'un contrôle distinct existe.",
  },
  {
    code: "PLANNING_SHIFT_CANCEL_PUBLISHED",
    label: "Supprimer / annuler un shift publié",
    description: "Permet d'annuler métier un shift publié lorsqu'une action dédiée existe.",
  },
  {
    code: "PLANNING_AUTOSCHEDULE",
    label: "Lancer autoschedule",
    description: "Permet de générer un planning en brouillon (jour / semaine).",
  },
  {
    code: "PLANNING_AUTOSCHEDULE_PUBLISH",
    label: "Publier un run",
    description: "Permet de publier un run autoschedule.",
  },
  {
    code: "PLANNING_AUTOSCHEDULE_CANCEL",
    label: "Annuler un run",
    description: "Permet d'annuler un run autoschedule lorsqu'il n'est pas publié.",
  },
  {
    code: "USERS_MANAGE",
    label: "Gérer utilisateurs",
    description: "Permet d'accéder aux fonctions de gestion utilisateurs déjà présentes.",
  },
  {
    code: "ROLES_PERMISSIONS_MANAGE",
    label: "Gérer rôles / permissions",
    description: "Permet de gérer rôles et permissions lorsqu'un module dédié existe.",
  },
  {
    code: "VEHICLES_MANAGE",
    label: "Gérer véhicules",
    description: "Permet d'accéder au module véhicules et à ses contrôles associés.",
  },
  {
    code: "TEMPLATES_MANAGE",
    label: "Gérer templates",
    description: "Permet de gérer les templates lorsqu'un module dédié existe.",
  },
  {
    code: "COMPANY_RULES_MANAGE",
    label: "Gérer règles métier",
    description: "Permet de modifier les règles métier de la société.",
  },
  {
    code: "AUDIT_VIEW",
    label: "Consulter audit",
    description: "Permet de consulter les entrées d'audit déjà exposées par le produit.",
  },
  {
    code: "PLANNING_EXPORT",
    label: "Exporter planning",
    description: "Permet d'exporter le planning lorsqu'une action dédiée existe.",
  },
  {
    code: "DASHBOARD_ADMIN_ACCESS",
    label: "Accéder au dashboard admin",
    description: "Permet d'accéder aux entrées du dashboard admin.",
  },
  {
    code: "DASHBOARD_TERRAIN_ACCESS",
    label: "Accéder au dashboard terrain",
    description: "Permet d'accéder au dashboard terrain lorsqu'il existe.",
  },
] as const;

export type AlphaPermissionCode = (typeof ALPHA_PERMISSION_CATALOG)[number]["code"];

export const ALPHA_PERMISSION_CODES = ALPHA_PERMISSION_CATALOG.map((permission) => permission.code) as readonly AlphaPermissionCode[];
