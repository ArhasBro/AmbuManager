# REBASAGE-35 — Audit page Onboarding

## 1. Objet du document
Ce document audite l’état réel de la page Onboarding dans le cadre du rebasage global Alpha.

L’audit porte sur le rôle réel de l’onboarding dans la préparation ou l’installation d’une société pilote.

## 2. Règles de lecture
- Audit en lecture seule.
- En cas de contradiction, code réel > documentation.
- Aucune correction code pendant cette session.
- Toute information non prouvée reste `INFORMATION NON FOURNIE — À CONFIRMER`.
- Les accents français normaux sont conservés quand l’encodage est propre.

## 3. Sources lues
### Documents
- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-23_CARTOGRAPHIE_GLOBALE_PROJET.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-24_MATRICE_PAGE_FONCTIONNALITES_CODE_DOCUMENTATION_MAQUETTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-25_CLASSEMENT_DETTES_PRIORITES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-26_INVENTAIRE_PAGES_ROUTES_APPLICATIVES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-30_AUDIT_PAGE_UTILISATEURS_RH.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-31_AUDIT_PAGE_VEHICULES_FLOTTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-32_AUDIT_PAGE_TEMPLATES_MODELES_SHIFTS.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-33_AUDIT_PAGE_SOCIETE_PROFIL_BASES_DEPOTS.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-34_AUDIT_PAGE_DEPOTS_BASES.md`

### Code
- `app/onboarding/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/api/imports/route.ts`
- `app/api/company/profile/route.ts`
- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/dashboard/page.tsx`
- `lib/imports/import-engine.ts`
- `lib/permissions.ts`
- `lib/auth.ts`
- `prisma/schema.prisma`

## 4. Routes / pages identifiées
- `/onboarding` : écran de progression d’installation société pilote + import initial guidé ; statut : confirmé.
- `/api/imports` : prévisualisation et validation d’import initial (users/vehicles/templates/depots/user-absences) ; statut : confirmé.
- `/api/company/profile` : mise à jour profil société (utilisé indirectement via lien onboarding) ; statut : partiel.
- `/company` : page cible de l’étape profil société ; statut : partiel.
- `/depots` : page cible de l’étape dépôts/bases ; statut : partiel.
- `/users` : page cible de l’étape utilisateurs ; statut : partiel.
- `/vehicles` : page cible de l’étape véhicules ; statut : partiel.
- `/templates` : page cible de l’étape templates ; statut : partiel.

## 5. Fichiers principaux identifiés
- Page : `app/onboarding/page.tsx`
- Client component : `app/onboarding/onboarding-client.tsx`
- APIs directement utilisées :
  - `app/api/imports/route.ts`
- APIs liées par navigation onboarding :
  - `app/api/company/profile/route.ts`
- Services onboarding dédiés : `INFORMATION NON FOURNIE — À CONFIRMER`
- Validators onboarding dédiés : `INFORMATION NON FOURNIE — À CONFIRMER`
- Validators import (dans moteur import) : schémas Zod dans `lib/imports/import-engine.ts`
- Permissions/RBAC :
  - garde onboarding côté page : rôle `ADMIN|GERANT`
  - garde import côté API : rôle `ADMIN|GERANT`
  - liens utilisateurs/véhicules/templates conditionnés par `canManageUsers/canManageVehicles/canManageTemplates`
- Modèles Prisma concernés : `Company`, `Depot`, `User`, `Vehicle`, `ShiftTemplate`, `UserAbsence`.

## 6. Rôle réel de l’onboarding
Le code montre un onboarding de type checklist + import initial, pas un assistant transactionnel complet de provisioning.

Comportements prouvés :
- contrôle d’accès strict (`ADMIN|GERANT`, session avec `companyId`, sinon redirection `login/dashboard`) ;
- calcul d’avancement via compteurs réels (`company`, `depots`, `users`, `vehicles`, `templates`, `absences`) ;
- étapes de navigation vers modules métier ;
- import initial par domaines avec aperçu, validation manuelle et commit ;
- logique “ajout uniquement” dans le moteur d’import (pas de mise à jour destructive automatique).

Comportements non prouvés dans ce périmètre :
- persistance d’un statut onboarding global “terminé/non terminé” ;
- workflow officiel de sortie d’onboarding au niveau société ;
- orchestration transversale (audit consolidé onboarding, post-conditions métier globales).

## 7. Fonctionnalités observées
| Fonctionnalité | Présence dans le code | Présence UI | Présence API | Dépendances | Statut | Commentaire |
| --- | --- | --- | --- | --- | --- | --- |
| Accès à la page onboarding | oui | oui | non | session NextAuth, rôle, companyId | incomplet | accès contrôlé mais sans statut persistant onboarding |
| Restriction par rôle/permission | oui | oui | oui | rôle `ADMIN|GERANT`, permissions modules | partiel | RBAC onboarding surtout basé rôle, pas permission dédiée |
| État d’avancement onboarding | oui | oui | non | compteurs Prisma | incomplet | progression calculée à la volée |
| Checklist initiale | oui | oui | non | liens vers `/company`, `/depots`, `/users`, `/vehicles`, `/templates` | partiel | checklist informative, pas preuve de verrouillage métier |
| Profil société | oui (indirect) | oui (lien) | oui (API profile) | `Company`, `/api/company/profile` | partiel | étape incluse via complétude des champs |
| Dépôts / bases | oui (indirect) | oui (lien) | oui (via module dépôts) | `Depot` | partiel | dépendance prouvée par compteur et lien |
| Utilisateurs | oui (indirect) | oui (lien) | oui (via modules users/import) | `User`, permissions | partiel | accès potentiellement redirigé dashboard selon droits |
| Véhicules | oui (indirect) | oui (lien) | oui (via modules vehicles/import) | `Vehicle`, permissions | partiel | dépendance prouvée mais non auditée e2e ici |
| Templates / modèles de shifts | oui (indirect) | oui (lien) | oui (via modules templates/import) | `ShiftTemplate`, permissions | partiel | dépendance prouvée mais non validée e2e ici |
| Imports initiaux | oui | oui | oui (`/api/imports`) | `lib/imports/import-engine.ts` | incomplet | preview + commit présents, UX “télécharger un modèle” non câblée |
| Validation manuelle/automatique | oui (manuelle) | oui | oui | action `commit` explicite | partiel | validation manuelle présente ; validation métier globale onboarding non prouvée |
| Redirection après onboarding | partiel | partiel | non | liens modules, bouton “Continuer” | à confirmer | post-flow global non démontré |
| Masquage/affichage conditionnel selon statut | partiel | oui | non | `done` par étape, pourcentage | incomplet | logique visuelle locale, pas statut persistant |
| Audit / traçabilité | partiel | non constaté | partiel | login audit + traces support/import | à confirmer | trace dédiée “onboarding completed” non trouvée |
| Cohérence multi-tenant / companyId | oui | partiel | oui | filtre `companyId` dans page/API/imports | partiel | isolation présente sur flux lus |
| Cohérence session / permissions | oui | partiel | oui | NextAuth + guards + `lib/permissions` | partiel | cohérence globale inter-modules à confirmer |

## 8. Impacts inter-modules
### 8.1 Société / profil société
- Onboarding dépend de la complétude de `Company` (`name`, `managerNames`, `address`, `phone`, `siret`) : confirmé.
- API profile dédiée existe (`PATCH /api/company/profile`) : confirmé.
- Statut global “profil validé pour sortie onboarding” : `INFORMATION NON FOURNIE — À CONFIRMER`.

### 8.2 Dépôts / bases
- Onboarding inclut une étape dépôts avec compteur `depotsCount` actifs : confirmé.
- Import domaine `depots` dans `/api/imports` : confirmé.
- Contraintes opérationnelles globales de dépôts pour finaliser onboarding : `INFORMATION NON FOURNIE — À CONFIRMER`.

### 8.3 Utilisateurs
- Étape utilisateurs présente, compteur `usersCount`, import domaine `users` : confirmé.
- Lien onboarding vers `/users` conditionné permissions (`canManageUsers`) : confirmé.
- Règle métier de minimum utilisateurs pour sortie onboarding : `INFORMATION NON FOURNIE — À CONFIRMER`.

### 8.4 Véhicules
- Étape véhicules présente, compteur `vehiclesCount`, import domaine `vehicles` : confirmé.
- Lien onboarding vers `/vehicles` conditionné permissions : confirmé.
- Critère métier “flotte minimale” pour finalisation : `INFORMATION NON FOURNIE — À CONFIRMER`.

### 8.5 Templates / modèles de shifts
- Étape templates présente, compteur `templatesCount`, import domaine `templates` : confirmé.
- Lien onboarding vers `/templates` conditionné permissions : confirmé.
- Condition métier de validation des templates pour go-live : `INFORMATION NON FOURNIE — À CONFIRMER`.

### 8.6 Imports
- Import directement lié à onboarding (UI + API `/api/imports`) : confirmé.
- Domaines import prouvés : users, vehicles, templates, depots, user-absences.
- Import non destructeur (ajout uniquement, aperçu avant commit, anti-doublons) : confirmé.
- Périmètre imports hors onboarding (exports/sync continue) : `INFORMATION NON FOURNIE — À CONFIRMER`.

### 8.7 Audit / traçabilité
- Audit dédié des connexions dans `lib/auth.ts` : confirmé.
- Trace explicite “action onboarding” (début, progression, fin) : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Traçabilité import métier détaillée centralisée au niveau onboarding : partiel.

## 9. Écarts et risques méthodologiques
- Onboarding fonctionnellement présent mais davantage orienté checklist/import que parcours métier verrouillé de bout en bout.
- Texte UI “Télécharger un modèle” sans preuve de branchement effectif.
- Présence de logique visuelle de progression sans statut persistant de completion société prouvé.
- Import initial solide sur validation ligne à ligne, mais pas de preuve de gouvernance de fin d’onboarding.
- Risque de surévaluer l’état “prêt société pilote” uniquement via compteurs non nuls.
- Risque de confusion entre “module import opérationnel” et “onboarding métier complet validé”.

## 10. Ce qui semble à conserver
- Garde d’accès onboarding (session + rôle + companyId) cohérente.
- Checklist multi-domaines et navigation vers modules cœur.
- Pipeline import initial avec aperçu, erreurs, commit manuel.
- Isolation multi-tenant par `companyId` dans les flux onboarding/import observés.

## 11. Ce qui semble à corriger plus tard
- Clarifier la logique de sortie d’onboarding (critères métier explicites et traçables).
- Harmoniser RBAC onboarding (rôle vs permissions fines) selon règles produit finales.
- Corriger/brancher les actions UI non prouvées (ex. téléchargement modèle) si confirmé.

## 12. Ce qui semble à compléter plus tard
- Statut onboarding persistant par société.
- Traçabilité dédiée aux événements onboarding (start/progress/completion).
- Critères de validation métier consolidés (profil, dépôts, users, véhicules, templates, absences).
- Documentation opératoire claire onboarding manuel vs import initial.

## 13. Ce qui pourrait être supprimé ou simplifié plus tard
- Éléments d’assistance redondants si non utilisés en production opérationnelle : `À VALIDER AVANT ACTION`.
- Indicateurs visuels doublons (barre/progress ring/listes) si surcharge UX confirmée : `À VALIDER AVANT ACTION`.
- Messages d’aide non alignés avec règles métier finales : `À VALIDER AVANT ACTION`.

## 14. Verdict d’audit page Onboarding
Verdict : **incomplet**.

Justification : la page Onboarding existe avec des garde-fous d’accès et un import initial réellement câblé (aperçu + validation manuelle + commit). En revanche, la preuve d’un parcours d’installation société pilote complet, traçable et méthodologiquement verrouillé (critères de fin, statut persistant, orchestration inter-modules) n’est pas établie dans ce périmètre de lecture seule.

## 15. Prochaine étape recommandée
REBASAGE-36 — audit page Audit / Traçabilité.
