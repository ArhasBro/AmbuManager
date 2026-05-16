# REBASAGE-32 — Audit page Templates / Modèles de shifts

## 1. Objet du document
Ce document audite l’état réel de la page Templates / Modèles de shifts dans le cadre du rebasage global Alpha.

## 2. Règles de lecture
- Audit en lecture seule.
- En cas de contradiction, le code réel prime sur la documentation.
- Aucune correction code pendant cette session.
- La correction documentaire est limitée au fichier central `REBASAGE_GLOBAL_ALPHA.md`.
- Toute information non prouvée reste : `INFORMATION NON FOURNIE — À CONFIRMER`.

## 3. Précondition REBASAGE-31
REBASAGE-31 était validable sur le fond mais bloqué par le mojibake du fichier central.
La correction du fichier central a été réalisée dans REBASAGE-32 avant l’audit Templates.

## 4. Sources lues
- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-23_CARTOGRAPHIE_GLOBALE_PROJET.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-24_MATRICE_PAGE_FONCTIONNALITES_CODE_DOCUMENTATION_MAQUETTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-25_CLASSEMENT_DETTES_PRIORITES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-26_INVENTAIRE_PAGES_ROUTES_APPLICATIVES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-29_AUDIT_PAGE_PLANNING.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-30_AUDIT_PAGE_UTILISATEURS_RH.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-31_AUDIT_PAGE_VEHICULES_FLOTTE.md`
- `app/templates/page.tsx`
- `app/templates/templates-client.tsx`
- `app/api/templates/route.ts`
- `app/api/templates/[id]/route.ts`
- `app/api/templates/[id]/archive/route.ts`
- `lib/templates/template-api.ts`
- `lib/templates/template-rules.ts`
- `lib/services/templates/archive-template.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `prisma/schema.prisma`

## 5. Routes / pages identifiées
- `/templates` : gestion des modèles de shifts (liste, filtres, création, édition, archivage) — statut : confirmé.
- `/api/templates` : lecture et création de templates — statut : confirmé.
- `/api/templates/[id]` : mise à jour de template — statut : confirmé.
- `/api/templates/[id]/archive` : archivage logique de template — statut : confirmé.
- Route dédiée autoschedule spécifique au module templates — statut : `INFORMATION NON FOURNIE — À CONFIRMER`.

## 6. Fichiers principaux identifiés
- Page : `app/templates/page.tsx`
- Client component : `app/templates/templates-client.tsx`
- API :
  - `app/api/templates/route.ts`
  - `app/api/templates/[id]/route.ts`
  - `app/api/templates/[id]/archive/route.ts`
- Services :
  - `lib/services/templates/archive-template.ts`
  - règles métier template : `lib/templates/template-rules.ts`
  - sérialisation/validation API : `lib/templates/template-api.ts`
- Validators : schémas Zod dans `lib/templates/template-api.ts`
- Permissions / RBAC : `lib/permissions.ts` (`canManageTemplates`), catalogue `TEMPLATES_MANAGE`
- Modèles Prisma concernés : `ShiftTemplate`, liens `DraftShift.templateId`, `Shift.templateId`, `Company`.

## 7. Fonctionnalités observées
| Fonctionnalité | Présence dans le code | Présence UI | Présence API | Dépendances | Statut | Commentaire court |
|---|---|---|---|---|---|---|
| Liste templates | oui | oui | oui (`GET /api/templates`) | session, companyId, Prisma | incomplet | tri actif/archivé, preuve e2e non fournie |
| Création template | oui | oui | oui (`POST /api/templates`) | Zod + `resolveTemplateCreateInput` | incomplet | règles de cohérence présentes côté API |
| Modification template | oui | oui | oui (`PATCH /api/templates/[id]`) | merge état + validation | incomplet | pas de preuve de recette complète |
| Désactivation / archivage template | oui | oui | oui (`POST /api/templates/[id]/archive`) | service `archiveTemplate` | incomplet | archivage logique confirmé (`archivedAt`) |
| Suppression physique éventuelle | non constaté | non constaté | non constaté | N/A | à confirmer | `INFORMATION NON FOURNIE — À CONFIRMER` |
| Nom / libellé template | oui | oui | oui | contrainte unicité (companyId+name) | incomplet | conflit 409 géré |
| Horaires début / fin | oui | oui | oui | `isTimeDefined`, `startTime`, `endTime` | incomplet | gestion templates horodatés/sans horaire |
| Support shifts non horodatés | oui | oui | oui | `isTimeDefined=false` | incomplet | mention UI “non utilisable autoschedule” |
| Durée / amplitude | partiel | partiel | partiel | début/fin/crossesMidnight | à confirmer | pas de calcul dédié d’amplitude observé |
| Couleur / lisibilité visuelle | oui | oui | oui | `normalizeTemplateColor` | incomplet | couleur normalisée côté règles |
| Composition minimale d’équipe | oui | oui | oui | `minStaffCount`, rôles slots | incomplet | preset par catégorie présent |
| Type de véhicule requis | oui | oui | oui | `requiredVehicleType` | incomplet | cohérence métier véhicule à confirmer en usage réel |
| Nombre de personnes requis | oui | oui | oui | `minStaffCount` | incomplet | borné à 1 ou 2 dans scope actuel |
| Rattachement éventuel base/dépôt | non constaté | non constaté | non constaté | N/A | à confirmer | `INFORMATION NON FOURNIE — À CONFIRMER` |
| Lien avec planning manuel | partiel | partiel | partiel | `Shift.templateId`, `DraftShift.templateId` | à confirmer | lien modèle prouvé, flux métier non prouvé ici |
| Lien avec autoschedule | partiel | partiel | partiel | mention UI + services planning | à confirmer | dépendance implicite, pas d’audit autoschedule ici |
| Lien avec matching | partiel | partiel | partiel | services planning matching | à confirmer | relation indirecte à confirmer |
| Cohérence avec véhicules | partiel | partiel | partiel | `requiredVehicleType` + flotte | à confirmer | cohérence inter-module non validée e2e |
| Cohérence audit / traçabilité | partiel | partiel | partiel | pas de trace support explicite sur archive template | à confirmer | `INFORMATION NON FOURNIE — À CONFIRMER` |
| Cohérence multi-tenant / companyId | oui | partiel | oui | filtres `companyId` partout | incomplet | pattern correct, couverture exhaustive à confirmer |
| Cohérence session / permissions | oui | partiel | oui | `canManageTemplates` | incomplet | accès restreint mais tests de rôles non prouvés |

## 8. Écarts et risques méthodologiques
- Le module est riche en règles de composition mais la preuve d’exploitabilité métier complète n’est pas fournie dans ce scope.
- Lien templates ↔ autoschedule/matching visible indirectement mais pas validé de bout en bout.
- La mention UI “template sans horaire non utilisable autoschedule” indique une dépendance forte qui doit être vérifiée fonctionnellement.
- Traçabilité audit des actions templates moins explicite que sur d’autres modules (véhicules/users).
- Risque de sur-interpréter les presets de règles comme validation métier finale.

## 9. Ce qui semble à conserver
- Structure claire `page.tsx` + `templates-client.tsx`.
- API dédiée avec validations Zod solides.
- Règles métier centralisées dans `lib/templates/template-rules.ts`.
- Archivage logique (`isActive` + `archivedAt`) plutôt que suppression immédiate.
- Filtrage multi-tenant par `companyId`.

## 10. Ce qui semble à corriger plus tard
- Clarifier et harmoniser la traçabilité/audit des opérations templates.
- Vérifier l’alignement exact des règles templates avec le cadrage fonctionnel détaillé.
- Réduire les zones implicites entre templates, autoschedule et matching.

## 11. Ce qui semble à compléter plus tard
- Audit e2e Templates ↔ Planning manuel.
- Audit e2e Templates ↔ Autoschedule/Matching.
- Vérification explicite des comportements de permissions par rôle sur toutes les actions.
- Validation de cohérence Templates ↔ Véhicules ↔ Dépôts selon cas métier réels.

## 12. Ce qui pourrait être supprimé ou simplifié plus tard
- Éléments UI redondants autour des états de template si non justifiés métier — `À VALIDER AVANT ACTION`.
- Règles implicites non utilisées en production réelle — `À VALIDER AVANT ACTION`.

## 13. Verdict d’audit page Templates / Modèles de shifts
Verdict : **incomplet**.

Justification : la page, les API et les règles de base existent clairement, avec un socle multi-tenant et RBAC cohérent. En revanche, les preuves fonctionnelles complètes sur les liaisons templates/planning/autoschedule/matching restent partielles dans cette session de lecture seule.

## 14. Prochaine étape recommandée
REBASAGE-33 — audit page Société / Profil société / Bases-dépôts.
