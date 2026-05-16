# REBASAGE-29 - Audit page Planning

## 1. Resume de la session

Objectif : auditer la page Planning reelle (lecture seule) pour verifier role, fonctionnalites, dependances API/services et dettes.

Resultat : page Planning et client associe identifies ; nombreuses fonctionnalites presentes ; verification metier complete encore partielle.

## 2. Perimetre lu

- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-19_FONCTIONNALITES_PAR_PAGE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-23_CARTOGRAPHIE_GLOBALE_PROJET.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-24_MATRICE_PAGE_FONCTIONNALITES_CODE_DOCUMENTATION_MAQUETTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-25_CLASSEMENT_DETTES_PRIORITES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-26_INVENTAIRE_PAGES_ROUTES_APPLICATIVES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-27_AUDIT_PAGE_LOGIN.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-28_AUDIT_PAGE_DASHBOARD.md`
- Code lu : `app/planning/page.tsx`, `app/planning/planning-client.tsx`, `app/api/planning/**/route.ts`, `lib/permissions.ts`, `lib/planning/export.ts`, `lib/services/planning/*`, `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A25_PLANNING.md`.

## 3. Route et fichiers Planning identifiés

- Route applicative : `/planning`
- Fichier principal : `app/planning/page.tsx`
- Client principal : `app/planning/planning-client.tsx`
- Fichiers/services associes :
  - APIs : `app/api/planning/**`
  - permissions : `lib/permissions.ts`
  - export : `lib/planning/export.ts`
  - services planning : `lib/services/planning/*`

## 4. Role reel de la page Planning

- Portail operationnel de planification.
- Charge depots/utilisateurs accessibles selon droits.
- Donne acces aux fonctions : consultation shifts, edition, autoschedule, matching, publication/annulation runs, export, audit.

## 5. Fonctionnalites attendues

Attendus prouvables (docs + cartographie + matrice) :
- consultation planning : OUI
- vues semaine/jour/mois : partiellement prouvable (navigation multi-vues mentionnee en UI/UX A25, verification exhaustive runtime INFORMATION NON FOURNIE — À CONFIRMER)
- navigation temporelle : OUI (attendue)
- lisibilite metier : OUI (attendue)
- ajout/modification/annulation shift : OUI (attendu)
- affectation utilisateur/vehicule : OUI (attendu)
- tracabilite/audit : OUI (attendu)
- permissions par role : OUI (attendu)
- coherence users/vehicles/templates/depots : OUI (attendue)
- coherence UI/UX A25 : OUI (attendue)

Points non prouves totalement :
- definition exacte du comportement vue mois/jour en toutes conditions : INFORMATION NON FOURNIE — À CONFIRMER
- regles metier detaillees de suppression versus annulation : INFORMATION NON FOURNIE — À CONFIRMER

## 6. Fonctionnalites presentes dans le code

Dans `app/planning/page.tsx` :
- session obligatoire + `companyId` obligatoire.
- controle permissions : view self/global, edit, autoschedule, audit, export.
- chargement depots et users accessibles selon droits.
- rendu `PlanningClient` avec flags de capacites.

Dans `app/planning/planning-client.tsx` (lecture rapide) :
- etats internes riches (tabs manual/affectations/autoschedule/matching/history/exports).
- appels API planning multiples.
- gestion assignation manuelle et bulk.
- workflows autoschedule + matching preview/apply + publish/cancel.
- gestion d'erreurs structurée (`fetchJson`, erreurs API).
- dependances aux users/vehicles/company rules.
- logique qualite matching (types/raisons/score) presente.

## 7. APIs / services / modules liés

Routes API detectees/appelees :
- `/api/planning/shifts`
- `/api/planning/shifts/[id]/assign`
- `/api/planning/autoschedule/week`
- `/api/planning/autoschedule/day`
- `/api/planning/autoschedule/runs/[id]/match/preview`
- `/api/planning/autoschedule/runs/[id]/match/apply`
- `/api/planning/autoschedule/runs/[id]/publish`
- `/api/planning/autoschedule/runs/[id]/cancel`
- `/api/planning/exports`
- connexes : `/api/users`, `/api/vehicles`, `/api/company/rules`

Services/helpers lies :
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/autoschedule-match.ts`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`
- `lib/services/planning/planning-audit.ts`
- `lib/services/planning/user-absence.ts`
- `lib/planning/export.ts`
- permissions dans `lib/permissions.ts`

## 8. Comparaison avec REBASAGE-23 / 24 / 25 / 26 / 27 / 28

- REBASAGE-23 confirme la centralite du module planning.
- REBASAGE-24 confirme statut `partiel` pertinent vu la complexite reelle.
- REBASAGE-25 confirme dette prioritaire Planning (toujours validee).
- REBASAGE-26 confirme inventaire routes planning/API exact.
- REBASAGE-27 (Login) et REBASAGE-28 (Dashboard) confirment chaine d'acces jusqu'au planning via permissions.

Ecart nouveau : la profondeur fonctionnelle de `planning-client.tsx` est plus large que la synthese initiale, ce qui renforce le besoin d'audits sous-zones.

## 9. Ecarts, dettes et points a confirmer

| Priorite | Perimetre | Constat | Risque | Action recommandee |
|---|---|---|---|---|
| Important | Planning | Complexite fonctionnelle tres elevee concentree dans `planning-client.tsx` | Regressions silencieuses et difficulte de validation globale | auditer |
| Important | Planning/API | Multiples endpoints critiques avec etats interdependants (runs/matching/publish/cancel) | Incoherence de flux metier si un maillon diverge | auditer |
| Important | Planning/Permissions | Forte dependance aux permissions pour afficher/autoriser actions | Experience differente par role, risque de cas non couverts | clarifier avec Nathan |
| Amelioration | UI/UX Planning | Reference A25 orientee reproduction visuelle 99 %, articulation fonctionnelle parfois implicite | Mauvaise priorisation entre fidelity UI et logique metier | documenter |
| À confirmer | Vue mois/jour | Presence/portee exacte des vues en execution reelle | Audit incomplet sur parcours visuels complets | a confirmer |
| Plus tard | Refactor technique | Taille du client planning suggere possible dette de maintenabilite | Cout futur de modification eleve | corriger plus tard |

## 10. Verdict d'audit de la page Planning

- Statut d'audit page Planning : **incomplet**

Justification : les briques majeures sont presentes et coherentes avec la cartographie, mais la couverture metier exhaustive (scenarios/roles/vues) n'est pas encore prouvee integralement.

## 11. Recommandations pour la suite

- Page Planning : a reauditer par sous-domaines (manual, affectations, autoschedule, matching, history, exports) avant validation finale.
- Correction immediate : NON (session audit uniquement).
- Prochaine page recommandee : **REBASAGE-30 - Audit page Utilisateurs / RH**.

## 12. Verdicts de sortie

- REBASAGE-29 VALIDABLE : OUI
- AUDIT PAGE PLANNING CRÉÉ : OUI
- CODE MODIFIÉ : NON
- DOCUMENTS MAÎTRES MODIFIÉS : NON
- PAGE PLANNING STATUT AUDIT : incomplet
- SUITE RECOMMANDÉE : REBASAGE-30
