# Audit comparaison Base44 → repo officiel

## 1. Rôle du document

Ce document cadre la reprise Codex à partir du prototype Base44 sans copier Base44.

Il sert à comparer le prototype fonctionnel Base44 avec le repo officiel AmbuManager, à identifier les apports utiles, les écarts, les risques et les prochaines sessions de reprise contrôlée. Base44 reste une référence visuelle, ergonomique et métier. Le repo officiel reste la source technique finale : Next.js, Prisma, PostgreSQL, RBAC serveur, documentation V2, contrôles Codex / ChatGPT / validation humaine.

Ce document ne valide ni le code officiel, ni Base44. Présent dans le code ne veut pas dire validé. Présent dans Base44 ne veut pas dire à reprendre.

## 2. Sources lues

### Repo officiel AmbuManager

- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md` : NON TROUVÉ / À CONFIRMER
- `docs/1-MASTER/DOCUMENT_MAITRE.md` : NON TROUVÉ / À CONFIRMER
- `docs/1-MASTER/DOCUMENT_MAITRE_V2.md`
- `docs/1-MASTER/AUDIT_CODE_EXISTANT_ALPHA_V2.md`
- `docs/1-MASTER/3-FONCTIONNALITES/`
- `docs/1-MASTER/2-REFERENCE_UI_UX/`
- `docs/1-MASTER/1-MAQUETTE/` : fichiers listés, maquettes PNG non analysées visuellement dans cette session.
- `prisma/schema.prisma`
- `app/`
- `app/api/`
- `lib/`
- `app/ui/`
- `components/` : NON TROUVÉ / À CONFIRMER

### Base44

- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `C:\Users\arche\ambulance-manager-Base44\src\pages\`
- `C:\Users\arche\ambulance-manager-Base44\src\components\`
- `C:\Users\arche\ambulance-manager-Base44\base44\entities\`
- `C:\Users\arche\ambulance-manager-Base44\src\lib\`

### Fichiers Base44 lus directement

- `C:\Users\arche\ambulance-manager-Base44\base44\entities\AbsenceRequest.jsonc`
- `C:\Users\arche\ambulance-manager-Base44\base44\entities\AuditLog.jsonc`
- `C:\Users\arche\ambulance-manager-Base44\base44\entities\Company.jsonc`
- `C:\Users\arche\ambulance-manager-Base44\base44\entities\CompanyContact.jsonc`
- `C:\Users\arche\ambulance-manager-Base44\base44\entities\DashboardPreference.jsonc`
- `C:\Users\arche\ambulance-manager-Base44\base44\entities\Depot.jsonc`
- `C:\Users\arche\ambulance-manager-Base44\base44\entities\Disinfection.jsonc`
- `C:\Users\arche\ambulance-manager-Base44\base44\entities\Employee.jsonc`
- `C:\Users\arche\ambulance-manager-Base44\base44\entities\OnboardingStep.jsonc`
- `C:\Users\arche\ambulance-manager-Base44\base44\entities\PlanningEntry.jsonc`
- `C:\Users\arche\ambulance-manager-Base44\base44\entities\ShiftTemplate.jsonc`
- `C:\Users\arche\ambulance-manager-Base44\base44\entities\User.jsonc`
- `C:\Users\arche\ambulance-manager-Base44\base44\entities\Vehicle.jsonc`
- `C:\Users\arche\ambulance-manager-Base44\base44\entities\VehicleAnomaly.jsonc`
- `C:\Users\arche\ambulance-manager-Base44\base44\entities\VehicleCheck.jsonc`
- `C:\Users\arche\ambulance-manager-Base44\src\pages\Audit.jsx`
- `C:\Users\arche\ambulance-manager-Base44\src\pages\Dashboard.jsx`
- `C:\Users\arche\ambulance-manager-Base44\src\pages\Depots.jsx`
- `C:\Users\arche\ambulance-manager-Base44\src\pages\Login.jsx`
- `C:\Users\arche\ambulance-manager-Base44\src\pages\MiseEnRoute.jsx`
- `C:\Users\arche\ambulance-manager-Base44\src\pages\ModelesHoraires.jsx`
- `C:\Users\arche\ambulance-manager-Base44\src\pages\Planning.jsx`
- `C:\Users\arche\ambulance-manager-Base44\src\pages\Societe.jsx`
- `C:\Users\arche\ambulance-manager-Base44\src\pages\SuiviVehicules.jsx`
- `C:\Users\arche\ambulance-manager-Base44\src\pages\Utilisateurs.jsx`
- `C:\Users\arche\ambulance-manager-Base44\src\pages\Vehicules.jsx`
- `C:\Users\arche\ambulance-manager-Base44\src\components\planning\`
- `C:\Users\arche\ambulance-manager-Base44\src\components\suivi\`
- `C:\Users\arche\ambulance-manager-Base44\src\lib\app-params.js`
- `C:\Users\arche\ambulance-manager-Base44\src\lib\auditLogger.js`
- `C:\Users\arche\ambulance-manager-Base44\src\lib\AuthContext.jsx`
- `C:\Users\arche\ambulance-manager-Base44\src\lib\planningEligibility.js`
- `C:\Users\arche\ambulance-manager-Base44\src\lib\planningUtils.js`
- `C:\Users\arche\ambulance-manager-Base44\src\lib\userPermissions.js`
- `C:\Users\arche\ambulance-manager-Base44\src\lib\vehicleUtils.js`

## 3. Règles de priorité

Hiérarchie de vérité appliquée :

1. Repo officiel AmbuManager
2. Documentation officielle V2
3. Maquettes V2 / références UI-UX
4. Audit code existant officiel
5. Prototype Base44
6. Synthèse Base44

Base44 ne prime jamais sur le repo officiel. Une idée Base44 ne peut être reprise qu'après adaptation à l'architecture officielle et validation dans une session Codex dédiée.

## 4. Synthèse globale

Verdict global : Base44 est un prototype utile pour visualiser des parcours métier et combler certaines zones d'inspiration UX, mais il ne peut pas devenir une source technique finale.

Apports principaux Base44 :

- couverture visuelle large des modules attendus ;
- module `Suivi des véhicules` matérialisé avec vue d'ensemble, vérifications, désinfections et anomalies ;
- ergonomie opérationnelle utile sur Planning, utilisateurs, véhicules, dépôts, modèles horaires ;
- idées concrètes de widgets dashboard et préférences utilisateur ;
- libellés métier souvent alignés V2 (`Modèles horaires`, `Mise en route`, `Utilisateurs / RH`).

Risques principaux Base44 :

- modèle de données Base44 denormalisé et incompatible tel quel avec Prisma officiel ;
- permissions largement portées côté front (`can(user, ...)`) et non prouvées côté API ;
- audit écrit depuis le client avec logique fire-and-forget, non recevable comme preuve serveur ;
- usage de `Company.list("created_date", 1)` ou équivalent, incompatible avec une gouvernance multi-tenant robuste ;
- statuts métier en libellés libres français et non en enums Prisma maîtrisés ;
- `PlanningEntry` ne respecte pas le découpage officiel `Shift`, `DraftShift`, `AutoScheduleRun`, audit planning ;
- prétention de conformité réglementaire à refuser sans cadrage réglementaire explicite.

Opportunités principales :

- reprendre l'ordre de modules Base44 comme support de validation visuelle, pas comme architecture ;
- utiliser les pages Base44 comme inventaire de micro-parcours à cadrer dans des sessions Codex ;
- renforcer le module officiel `Suivi des véhicules`, absent ou non prouvé côté repo officiel ;
- compléter certaines données officielles uniquement après arbitrage Prisma dédié ;
- construire une matrice RBAC officielle à partir des écarts Base44, sans reprendre sa logique front.

## 5. Tableau comparatif par module

| Module | Présent dans Base44 | Présent dans repo officiel | Conforme docs officielles | Apport Base44 | Risque Base44 | Décision | Reprise Codex |
|---|---|---|---|---|---|---|---|
| Shell global / navigation | OUI | OUI | PARTIEL | Navigation complète, libellés V2 visibles, accès refusé dédié. | Router React/Vite et rôles front non compatibles avec Next/RBAC officiel. | ADAPTER | OUI |
| Login | OUI | OUI | PARTIEL | Page simple, composant login séparé, UX claire. | Auth Base44 SDK, token URL/localStorage, non compatible avec NextAuth officiel. | ADAPTER | PLUS TARD |
| Dashboard | OUI | OUI | PARTIEL | Widgets, raccourcis, préférences dashboard. | `DashboardPreference` absent Prisma, requêtes client directes, droits front. | ADAPTER | OUI |
| Utilisateurs / RH | OUI | OUI | PARTIEL | Accès applicatif, absences, statuts opérationnels, actions RH. | `User` et `Employee` séparés/denormalisés, permissions front, statuts libres. | ADAPTER | OUI |
| Véhicules | OUI | OUI | PARTIEL | Disponibilité, archivage/restauration, champs documentaires, motif indisponibilité. | Type `TPMR` non présent Prisma, disponibilité séparée non modélisée officiellement. | ADAPTER | OUI |
| Suivi des véhicules | OUI | PARTIEL | PARTIEL | Module dédié complet : vue ensemble, vérifications, désinfections, anomalies. | Entités absentes Prisma officiel, permissions volontairement absentes dans certaines vues. | À REPRENDRE AVEC CODEX | OUI |
| Modèles horaires | OUI | OUI | PARTIEL | Création, édition, duplication, archive/restauration, rôles autorisés. | `usage_count`, `active_days`, `TPMR`, statuts libres et permissions front non alignés. | ADAPTER | OUI |
| Dépôts / Bases | OUI | OUI | PARTIEL | Champs code, ville, responsable local, compteurs, archivage/restauration. | `local_manager` texte et compteurs stockés/denormalisés, conflit avec relations Prisma. | ADAPTER | OUI |
| Société | OUI | OUI | PARTIEL | Contacts société, détails ARS, paramètres généraux, onglets. | `Company.list(..., 1)`, `CompanyContact` absent Prisma, risque multi-tenant. | ADAPTER | OUI |
| Mise en route | OUI | OUI | PARTIEL | Checklist concrète à partir des modules existants. | Lecture client globale, `OnboardingStep` absent Prisma officiel, risque doublon avec pages métier. | ADAPTER | PLUS TARD |
| Audit | OUI | OUI | PARTIEL | Tableau filtré et KPI audit. | Audit client-side non probant, pas d'écriture serveur garantie, typage faible. | REFUSER en l'état | OUI |
| Planning | OUI | OUI | PARTIEL | Vues global/personnel/mois/semaine/jour, publication, annulation, restauration. | `PlanningEntry` monolithique incompatible avec modèle officiel `Shift`/`DraftShift`/runs. | ADAPTER | OUI |

## 6. Matrice fonctionnalités

| Fonctionnalité | Prévue docs officielles | Présente repo officiel | Présente Base44 | Écart | Décision | Priorité |
|---|---|---|---|---|---|---|
| Connexion email/mot de passe | OUI | OUI | OUI | Auth Base44 SDK incompatible avec NextAuth. | ADAPTER | Haute |
| Se souvenir de moi | OUI | PARTIEL | À CONFIRMER | Comportement officiel non pleinement prouvé ; Base44 non applicable. | À CONFIRMER | Haute |
| Shell connecté | OUI | OUI | OUI | Base44 utile visuellement, architecture différente. | ADAPTER | Très haute |
| Accès refusé route directe | OUI | PARTIEL | OUI | Pattern officiel à uniformiser côté Next. | ADAPTER | Très haute |
| Navigation conditionnelle par permissions | OUI | PARTIEL | OUI | Base44 front-only ; repo officiel doit garantir API. | ADAPTER | Très haute |
| Dashboard widgets | OUI | PARTIEL | OUI | Préférences utilisateur absentes Prisma officiel. | À CONFIRMER | Haute |
| Dashboard raccourcis autorisés | OUI | PARTIEL | OUI | Mapping permissions à réaligner. | ADAPTER | Haute |
| Gestion utilisateurs | OUI | OUI | OUI | Base44 distingue accès applicatif et RH, mais modèle officiel différent. | ADAPTER | Très haute |
| Rôles techniques canoniques | OUI | OUI | OUI | Base44 ajoute `business_role`, repo utilise `Role` + `Permission`. | ADAPTER | Très haute |
| Permissions fines | OUI | OUI | OUI | Catalogues divergents. | À CONFIRMER | Très haute |
| Absences utilisateur | OUI | OUI | OUI | Base44 a workflow demande/statut ; Prisma a `UserAbsence` simple. | ADAPTER | Haute |
| Véhicules CRUD | OUI | OUI | OUI | Champs et statuts divergent. | ADAPTER | Très haute |
| Disponibilité véhicule avec motif | OUI | PARTIEL | OUI | Prisma officiel n'a pas `availability_reason` dédié. | À CONFIRMER | Très haute |
| Archivage/restauration véhicules | OUI | PARTIEL | OUI | Restauration officielle à confirmer selon routes. | ADAPTER | Haute |
| Vérifications véhicules | OUI | NON TROUVÉ | OUI | Entité absente Prisma officiel. | À REPRENDRE AVEC CODEX | Très haute |
| Désinfections véhicules | OUI | NON TROUVÉ | OUI | Entité absente Prisma officiel. | À REPRENDRE AVEC CODEX | Très haute |
| Anomalies véhicules | OUI | NON TROUVÉ | OUI | Entité absente Prisma officiel. | À REPRENDRE AVEC CODEX | Très haute |
| Modèles horaires CRUD | OUI | OUI | OUI | Base44 plus riche sur duplication/active_days ; Prisma plus strict. | ADAPTER | Haute |
| Dépôts / Bases CRUD | OUI | OUI | OUI | Responsable local et compteurs Base44 à revoir. | ADAPTER | Haute |
| Société profil | OUI | OUI | OUI | Base44 plus large que Prisma. | ADAPTER | Haute |
| Contacts société | OUI | NON TROUVÉ | OUI | Absent Prisma officiel. | À CONFIRMER | Moyenne |
| Mise en route checklist | OUI | PARTIEL | OUI | Base44 calcule par requêtes client globales. | ADAPTER | Moyenne |
| Audit centralisé | OUI | OUI | OUI | Base44 client-side à refuser comme preuve. | REFUSER | Très haute |
| Planning vues multiples | OUI | OUI | OUI | Base44 UX utile, modèle data incompatible. | ADAPTER | Très haute |
| Publication / annulation planning | OUI | OUI | OUI | Base44 met à jour des libellés ; officiel a runs/shifts/audit. | ADAPTER | Très haute |
| Autoschedule / matching | OUI | OUI | NON TROUVÉ | Base44 ne remplace pas moteur officiel. | GARDER officiel | Très haute |
| Exports planning | OUI | OUI | NON TROUVÉ | Base44 pas source utile. | GARDER officiel | Haute |

## 7. Matrice données Base44 → Prisma officiel

| Élément Base44 | Équivalent Prisma trouvé | Équivalent absent | Conflit | Décision | Risque migration |
|---|---|---|---|---|---|
| User | `User`, `Role`, `Permission`, `UserPermission`, `UserAbsence` | `secondary_roles`, `psc1`, `has_app_access`, `operational_status`, `is_archived` | Base44 mélange compte, RH, permissions et statut opérationnel. | ADAPTER | Élevé |
| Employee | `User` | Entité Employee dédiée | Doublon avec `User`; denormalisation nom/rôle/dépôt. | REFUSER comme entité séparée | Élevé |
| Vehicle | `Vehicle`, `VehicleType`, `VehicleStatus`, `Depot` | `name`, `availability`, `availability_reason`, `TPMR`, `seats`, `mileage`, `notes` | Statut administratif/disponibilité séparés vs enum officiel. | ADAPTER | Élevé |
| Depot | `Depot` | `code`, `postal_code`, `city`, `local_manager`, compteurs stockés, `is_archived` | Responsable local texte et compteurs denormalisés. | ADAPTER | Moyen |
| Company | `Company`, `CompanyRule` | email, website, logo, ARS, timezone, formats, langue détaillée | Base44 plus large, `Company.list(...,1)` non tenable. | ADAPTER | Élevé |
| CompanyContact | NON TROUVÉ | `CompanyContact` | Module attendu docs mais non modélisé officiel. | À CONFIRMER | Moyen |
| ShiftTemplate | `ShiftTemplate` | `short_label`, `allowed_roles`, `active_days`, `usage_count`, `TPMR` | Champs Base44 non alignés sur `PlanningTemplateCategory`, `requiredRole`, `secondaryAllowedRoles`. | ADAPTER | Élevé |
| PlanningEntry | `Shift`, `DraftShift`, `AutoScheduleRun`, `PlanningAuditLog` | Entité monolithique PlanningEntry | Remplacerait le modèle officiel plus structuré. | REFUSER comme remplacement direct | Très élevé |
| VehicleCheck | NON TROUVÉ | `VehicleCheck` | Besoin fonctionnel officiel, pas de Prisma officiel. | À REPRENDRE AVEC CODEX | Élevé |
| Disinfection | NON TROUVÉ | `Disinfection` | Besoin fonctionnel officiel, pas de Prisma officiel. | À REPRENDRE AVEC CODEX | Élevé |
| VehicleAnomaly | NON TROUVÉ | `VehicleAnomaly` | Besoin fonctionnel officiel, pas de Prisma officiel. | À REPRENDRE AVEC CODEX | Élevé |
| AuditLog | `PlanningAuditLog`, `LoginAuditLog` | Audit générique unifié | Base44 audit client-side générique vs logs serveur spécifiques. | ADAPTER uniquement côté serveur | Élevé |
| DashboardPreference | NON TROUVÉ | `DashboardPreference` | Préférences dashboard non persistées officiellement. | À CONFIRMER | Moyen |
| AbsenceRequest | `UserAbsence` | Workflow validation/refus/annulation, `decided_by` | Base44 demande d'absence plus riche que Prisma officiel. | ADAPTER | Moyen |
| UserAbsence | `UserAbsence` | Statut décisionnel | Prisma officiel couvre indisponibilité simple. | GARDER officiel, compléter si validé | Moyen |
| OnboardingStep | NON TROUVÉ | `OnboardingStep` | Mise en route peut être calculée sans table dédiée. | À CONFIRMER | Faible |

## 8. Matrice permissions Base44 → RBAC officiel

Base44 expose deux niveaux :

- rôles métier (`ADMIN`, `GERANT`, `BUREAU`, `REGULATEUR`, `ADE`, `AA`, `TAXI`) ;
- permissions fines dans `src/lib/userPermissions.js`.

Le repo officiel expose :

- enum Prisma `Role` : `ADMIN`, `GERANT`, `BUREAU`, `ADE`, `AA`, `TAXI`, `REGULATEUR` ;
- enum `PlatformRole.SUPPORT` ;
- table `Permission`, `UserPermission` ;
- catalogue officiel `ALPHA_PERMISSION_CATALOG` ;
- helpers serveur `canViewSelfPlanning`, `canViewGlobalPlanning`, `canAutoSchedule`, `canPublishAutoSchedule`, `canCancelAutoSchedule`, `canManageUsers`, `canManageVehicles`, `canManageTemplates`, `canManageCompanyRules`, `canViewAudit`, `canExportPlanning`, `canEditPlanning`, `canAccessAdminDashboard`, `canAccessTerrainDashboard`.

| Permission Base44 | Équivalent officiel | État | Décision |
|---|---|---|---|
| `PLANNING_VIEW_SELF` | `PLANNING_VIEW_SELF` | Équivalente | GARDER officiel |
| `PLANNING_VIEW_GLOBAL` | `PLANNING_VIEW_GLOBAL` | Équivalente | GARDER officiel |
| `PLANNING_EDIT` | `PLANNING_EDIT` | Équivalente partielle | GARDER officiel |
| `PLANNING_PUBLISH` | `PLANNING_AUTOSCHEDULE_PUBLISH` / publication shifts à confirmer | Divergente | ADAPTER |
| `PLANNING_CANCEL` | `PLANNING_AUTOSCHEDULE_CANCEL` + annulation shift à confirmer | Divergente | ADAPTER |
| `USERS_MANAGE` | `USERS_MANAGE` | Équivalente | GARDER officiel |
| `USERS_ROLES_EDIT` | `ROLES_PERMISSIONS_MANAGE` | Partielle | ADAPTER |
| `USERS_PASSWORD_RESET` | NON TROUVÉ dans catalogue officiel | Manquante | À CONFIRMER |
| `TEMPLATES_CREATE` | `TEMPLATES_MANAGE` | Trop fine côté Base44 | ADAPTER |
| `TEMPLATES_EDIT` | `TEMPLATES_MANAGE` | Trop fine côté Base44 | ADAPTER |
| `TEMPLATES_ARCHIVE` | `TEMPLATES_MANAGE` | Trop fine côté Base44 | ADAPTER |
| `TEMPLATES_RESTORE` | `TEMPLATES_MANAGE` | Trop fine côté Base44 | ADAPTER |
| `VEHICLES_MANAGE` | `VEHICLES_MANAGE` | Équivalente | GARDER officiel |
| `VEHICLES_AVAILABILITY` | NON TROUVÉ | Manquante | À CONFIRMER |
| `VEHICLES_CHECK` | NON TROUVÉ | Manquante | À REPRENDRE AVEC CODEX |
| `COMPANY_MANAGE` | `COMPANY_RULES_MANAGE` + profil société à confirmer | Divergente | ADAPTER |
| `DEPOTS_MANAGE` | NON TROUVÉ | Manquante | À CONFIRMER |
| `AUDIT_VIEW` | `AUDIT_VIEW` | Équivalente | GARDER officiel |
| `DASHBOARD_ADMIN_ACCESS` | NON TROUVÉ côté Base44, présent officiel | Divergence inverse | GARDER officiel |
| `DASHBOARD_TERRAIN_ACCESS` | NON TROUVÉ côté Base44, présent officiel | Divergence inverse | GARDER officiel |
| `PLANNING_EXPORT` | NON TROUVÉ côté Base44, présent officiel | Divergence inverse | GARDER officiel |
| `PLANNING_AUTOSCHEDULE` | NON TROUVÉ côté Base44, présent officiel | Divergence inverse | GARDER officiel |

Permissions manquantes ou à créer côté API si validées :

- gestion dépôts (`DEPOTS_MANAGE`) ;
- disponibilité véhicule (`VEHICLES_AVAILABILITY`) ;
- vérifications/désinfections/anomalies véhicules ;
- reset password RH ;
- contacts société ;
- préférences dashboard ;
- archive/restauration par module si granularité retenue.

Permissions trop larges :

- `TEMPLATES_MANAGE` officiel couvre création/édition/archive/restauration si aucune granularité supplémentaire n'est validée ;
- `USERS_MANAGE` couvre beaucoup d'actions RH sensibles ;
- Base44 `ADMIN`/`GERANT` ont tous les droits côté front.

Permissions front uniquement :

- tous les appels Base44 `can(user, "...")` restent front-only ;
- les commentaires Base44 indiquant volontairement l'absence de `can()` sur suivi véhicules doivent être refusés comme garantie d'accès.

Actions sensibles à auditer côté serveur :

- création/modification/archive/restauration utilisateur ;
- création d'accès applicatif et reset password ;
- changement rôle/permissions ;
- création/modification/archive/restauration véhicule ;
- changement disponibilité véhicule avec motif ;
- vérification, désinfection, anomalie véhicule ;
- création/modification/archive/restauration dépôt ;
- création/modification/duplication/archive/restauration modèle horaire ;
- publication, annulation, restauration planning ;
- modification société et contacts ;
- accès support ;
- export planning ;
- consultation/export audit si retenu.

## 9. Matrice UI/UX Base44 → références officielles

| Surface UI/UX | Utile | Conforme | Non conforme | À adapter | À refuser |
|---|---|---|---|---|---|
| Shell / sidebar | OUI | PARTIEL | Architecture différente | Structure, libellés, accès refusé | Code React Router/Vite |
| Login | OUI | PARTIEL | Auth SDK Base44 | Composition visuelle si cohérente V2 | Auth/token Base44 |
| Dashboard | OUI | PARTIEL | Préférences absentes officiel | Widgets et raccourcis | Requêtes client directes comme vérité |
| Utilisateurs / RH | OUI | PARTIEL | Statuts et permissions divergents | Ergonomie actions RH | Modèle User Base44 tel quel |
| Véhicules | OUI | PARTIEL | Statuts/champs divergents | Disponibilité/motif comme idée | Types/statuts libres |
| Suivi véhicules | OUI | PARTIEL | Permissions absentes, data absente Prisma | Onglets et parcours | Absence volontaire de contrôles |
| Modèles horaires | OUI | PARTIEL | Champs non alignés Prisma | Duplication/restore si validés | Statuts libres comme source |
| Dépôts | OUI | PARTIEL | Compteurs denormalisés | Ergonomie filtre/archive | Responsable texte comme vérité |
| Société | OUI | PARTIEL | Multi-tenant fragile | Onglets/contacts/idées ARS | `Company.list(..., 1)` |
| Mise en route | OUI | PARTIEL | Calcul client global | Checklist module par module | Table OnboardingStep sans décision |
| Audit | OUI | PARTIEL | Audit client-side | UI tableau/filtres | Preuve d'audit front |
| Planning | OUI | PARTIEL | `PlanningEntry` monolithique | Vues et micro-interactions | Remplacement modèle officiel |

## 10. Éléments à garder de Base44

- Les libellés utilisateur `Modèles horaires`, `Mise en route`, `Utilisateurs / RH`, `Dépôts / Bases`.
- L'idée d'un module `Suivi des véhicules` explicitement séparé avec onglets : vue d'ensemble, vérifications, désinfections, anomalies.
- Les parcours de déclaration d'anomalie depuis vérification/désinfection, à reprendre avec API serveur et audit officiel.
- Les vues Planning multiples comme inspiration UX : global, personnel, mois, semaine, jour.
- L'idée d'une barre de publication semaine et d'états de publication visibles, à mapper sur `Shift`/`AutoScheduleRun`.
- L'ergonomie d'archive/restauration visible sur utilisateurs, véhicules, dépôts et modèles horaires, si validée dans les modules officiels.
- Les widgets dashboard et raccourcis autorisés comme matière UX.
- Les contacts société comme besoin à confirmer.
- Les motifs obligatoires pour actions sensibles : indisponibilité véhicule, annulation planning, anomalie critique.

## 11. Éléments à adapter

- Les entités Base44 doivent être remappées vers Prisma officiel, jamais copiées.
- Les statuts Base44 en français doivent être convertis en enums/codes officiels ou tables cadrées.
- Les permissions Base44 doivent être rapprochées du catalogue officiel et contrôlées côté API.
- Les logs Base44 doivent devenir des écritures serveur transactionnelles ou contrôlées côté service.
- Le dashboard personnalisable nécessite un cadrage Prisma ou une décision de report.
- Les contacts société nécessitent un modèle officiel ou un report.
- Les champs ARS/réglementaires société doivent être qualifiés comme informations internes, pas comme conformité complète.
- La disponibilité véhicule doit être conciliée avec `VehicleStatus`, `isActive` et les besoins planning.
- Les absences Base44 doivent être conciliées avec `UserAbsence` officiel.
- La mise en route doit rester une checklist d'orientation, pas une duplication des pages métier.

## 12. Éléments à refuser

- Copie directe du code Base44.
- `Company.list(..., 1)` ou équivalent comme méthode d'accès société.
- Permissions uniquement front.
- Audit client-side comme preuve.
- Statuts métier en libellés libres.
- `PlanningEntry` comme remplacement direct du modèle planning officiel si non compatible.
- Toute prétention de conformité réglementaire complète.
- Reprise de l'architecture Base44/Vite/SDK comme architecture cible.
- Reprise de `Employee` comme entité séparée sans arbitrage, car le repo officiel porte déjà `User`.
- Reprise de compteurs stockés (`vehicle_count`, `user_count`, `usage_count`) sans justification de dénormalisation.
- Absence volontaire de contrôles permissions sur suivi véhicules.
- Écriture audit fire-and-forget depuis le client.
- Utilisation de localStorage/token URL Base44 comme modèle d'auth officiel.

## 13. Points à confirmer avant code

- Le module `Suivi des véhicules` doit-il être autonome, sous-module de `Véhicules`, ou hybride ?
- Modèles Prisma à créer ou non pour `VehicleCheck`, `Disinfection`, `VehicleAnomaly`.
- Granularité RBAC officielle pour dépôts, suivi véhicules, disponibilité véhicule, reset password, contacts société.
- Politique archive/restauration pour chaque module.
- Mapping final entre `VehicleStatus`, `isActive`, disponibilité opérationnelle et indisponibilité planning.
- Gestion officielle de `TPMR`, `TPMR VSL`, `TPMR TAXI`.
- Champs société ARS/réglementaires réellement requis en Alpha.
- Besoin de `CompanyContact` en Alpha.
- Besoin de `DashboardPreference` en Alpha.
- Comportement exact de `Se souvenir de moi`.
- Niveau de détail audit, export audit et accès support.
- Format officiel des statuts planning et des événements après publication.
- Compatibilité des vues Planning Base44 avec autoschedule/matching officiel.
- Validation visuelle réelle des maquettes PNG V2 non exécutée dans cette session.

## 14. Risques techniques

- Multi-tenant : Base44 utilise des accès client globaux et `Company.list(..., 1)` ; le repo officiel doit filtrer par `companyId` serveur.
- RBAC : Base44 s'appuie sur `can()` côté front ; risque de contournement sans API officielle.
- Audit : Base44 écrit des logs client-side, non probants en cas d'échec, contournement ou manipulation.
- Données : entités Base44 denormalisées, statuts texte, champs dupliqués, IDs sans contraintes Prisma.
- Prisma : plusieurs entités Base44 utiles sont absentes du schéma officiel ; toute reprise demande migration cadrée.
- Planning : `PlanningEntry` monolithique entre en conflit avec `Shift`, `DraftShift`, `AutoScheduleRun`, `PlanningAuditLog`.
- Migration : pas de copie directe possible ; nécessité de mapping, nettoyage et validations.
- Tests : forte dette potentielle sur RBAC, planning, audit et suivi véhicules.
- Dette UI : Base44 peut accélérer le cadrage mais pas garantir la fidélité 99 % aux maquettes V2.
- Gouvernance documentaire : risque de transformer Base44 en source de vérité si les décisions ne sont pas explicitement classées.

## 15. Ordre de reprise Codex conseillé

Le présent audit produit un cadrage exploitable, mais il ne déclenche pas une reprise code immédiate. La prochaine étape obligatoire est `DEV-B44-00-02 — DOCUMENTATION MASTER`, puis `DEV-B44-00-03 — VALIDATION`, puis `CLOTURE_DEV-B44-00 — VALIDATION`. Aucune reprise code ne doit commencer avant validation et clôture du bloc `DEV-B44-00`.

1. Shell global / navigation : stabiliser les libellés, routes visibles, accès refusé et cadre commun.
2. RBAC transverse : établir la matrice UI/API avant toute reprise d'action sensible.
3. Véhicules : corriger base de données et disponibilité, car le suivi et le planning en dépendent.
4. Suivi des véhicules : cadrer puis créer les modèles/API/UI officiels si validés.
5. Utilisateurs / RH : aligner rôles, permissions, absences, accès applicatif et statuts.
6. Dépôts / Bases : consolider rattachements avant planning et mise en route.
7. Modèles horaires : stabiliser la base utilisée par planning.
8. Société : compléter profil/contacts/règles sans fragiliser le tenant.
9. Planning : reprendre après stabilisation utilisateurs, véhicules, dépôts et modèles.
10. Dashboard : réaligner widgets avec les données stabilisées.
11. Login : finaliser session/remember me dans le cadre auth officiel.
12. Audit : normaliser traces après cartographie des actions sensibles.
13. Mise en route : reprendre en dernier comme synthèse des modules stabilisés.

## 16. Sessions Codex recommandées

Les sessions `DEV-B44-01-01` et suivantes restent proposées comme reprise ultérieure. Elles doivent venir après les sessions documentaires et de validation du bloc `DEV-B44-00`.

Note de gouvernance documentaire pour `DEV-B44-00-02` : le renommage de fichiers documentaires est autorisé s'il améliore la clarté. Conditions obligatoires : ne renommer que les fichiers documentaires concernés ; justifier chaque renommage ; ne supprimer aucun contenu utile ; mettre à jour les liens, index, sommaires et références ; tracer ancien nom → nouveau nom ; ne pas renommer les fichiers code, Prisma, package ou config.

| ID session | Type | Objectif unique | Fichiers potentiellement concernés | Livrable attendu | DoD | Contrôles attendus |
|---|---|---|---|---|---|---|
| DEV-B44-00-02 | DOCUMENTATION MASTER | Remettre `docs/1-MASTER` en cohérence avec l'audit Base44 → repo officiel | `PLAN_DE_DEVELOPPEMENT_V2.md`, index MASTER, registre décisions, état global, README docs si présents | Documentation MASTER cohérente avec l'audit | Documentation uniquement ; renommages documentaires justifiés si utiles ; liens/index/références mis à jour ; aucun code modifié | `git status --short`, diff documentaire ciblé, contrôle liens/index |
| DEV-B44-00-03 | VALIDATION | Valider le cadrage documentaire avant reprise code | Documents MASTER concernés par `DEV-B44-00-02` | Verdict GO / NO-GO reprise code | Contrôle uniquement ; aucun code modifié | `git status --short`, relecture cohérence docs, verdict explicite |
| CLOTURE_DEV-B44-00 | VALIDATION | Clôturer le bloc de cadrage Base44 → officiel | Documents du bloc `DEV-B44-00` | Verdict explicite : `BLOC DEV-B44-00 CLÔTURABLE DÉFINITIVEMENT : OUI / NON` | Bloc documentaire validé ou restes clairement listés | `git status --short`, contrôle final documentaire |
| DEV-B44-01-01 | AUDIT | Cartographier les écarts Shell Base44 vs officiel | `app/app-shell.tsx`, `app/ui/*`, docs UI shell | Matrice routes/libellés/accès refusé | Aucun code modifié, décisions classées | `git status --short` |
| DEV-B44-02-01 | AUDIT | Construire matrice RBAC UI/API officielle enrichie par Base44 | `lib/permissions.ts`, `lib/rbac.ts`, `lib/permission-catalog.ts`, `app/api/*` | Tableau rôle → action → route API | Actions sensibles identifiées | `git status --short` |
| DEV-B44-03-01 | AUDIT | Comparer Véhicules Base44 vs Prisma/officiel | `prisma/schema.prisma`, `app/vehicles/*`, `app/api/vehicles/*` | Décisions champs/statuts/disponibilité | Aucun Prisma modifié | `git status --short` |
| DEV-B44-04-01 | CADRAGE | Définir le modèle officiel Suivi véhicules | `prisma/schema.prisma`, docs 6.1, Base44 suivi | Proposition Prisma/API/UI sans patch code | Modèles et permissions listés | `npx prisma validate` NON requis tant que pas de code |
| DEV-B44-05-01 | AUDIT | Aligner Utilisateurs/RH et absences | `app/users/*`, `app/api/users/*`, `lib/services/users/*` | Écarts RH et RBAC | Points à confirmer listés | `git status --short` |
| DEV-B44-06-01 | AUDIT | Cadrer Dépôts/Bases et rattachements | `app/depots/*`, `app/api/depots/*`, `prisma/schema.prisma` | Décisions champs/cycle de vie | Aucune migration | `git status --short` |
| DEV-B44-07-01 | AUDIT | Cadrer Modèles horaires Base44 vs officiel | `app/templates/*`, `app/api/templates/*`, `lib/templates/*` | Mapping champs/permissions/planning | Duplication/archive/restauration tranchées | `git status --short` |
| DEV-B44-08-01 | AUDIT | Cadrer Société et contacts | `app/company/*`, `app/api/company/*`, `lib/services/company/*` | Décision `CompanyContact` et champs société | Multi-tenant explicitement contrôlé | `git status --short` |
| DEV-B44-09-01 | AUDIT | Comparer vues Planning Base44 vs moteur officiel | `app/planning/*`, `app/api/planning/*`, `lib/services/planning/*` | Cartographie vues/flux/legacy | `PlanningEntry` refusé comme remplacement | `git status --short` |
| DEV-B44-10-01 | AUDIT | Cadrer Dashboard et préférences | `app/dashboard/page.tsx`, docs dashboard | Décision widgets/préférences | `DashboardPreference` confirmé ou reporté | `git status --short` |
| DEV-B44-11-01 | AUDIT | Confirmer Login et remember me | `app/login/*`, `lib/auth.ts`, auth routes | Décision session | Aucun changement auth | `git status --short` |
| DEV-B44-12-01 | AUDIT | Cadrer audit serveur final | `app/audit/*`, `app/api/audit/*`, `lib/services/audit/*`, Prisma audit logs | Liste événements serveur | Audit client-side explicitement refusé | `git status --short` |
| DEV-B44-13-01 | AUDIT | Cadrer Mise en route après modules | `app/onboarding/*`, docs mise en route | Checklist officielle non dupliquante | Sources de progression validées | `git status --short` |

Conclusion de cadrage : le document est exploitable pour piloter la suite, mais la prochaine étape est `DEV-B44-00-02 — DOCUMENTATION MASTER`. Aucune reprise code ne doit commencer avant `DEV-B44-00-03 — VALIDATION` et `CLOTURE_DEV-B44-00 — VALIDATION`.
