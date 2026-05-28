# SESSION

## ID SESSION

DEV-V2-01-01

## Date

28/05/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturite : DEV-V2  
Bloc : DEV-V2-01  
Type : AUDIT  
Intitule : Cartographie shell/navigation, libelles legacy et cas non autorises UI

## Objectif de la session

Cartographier l'etat actuel du shell prive, des routes visibles, des libelles legacy et des comportements UI pour utilisateur authentifie non autorise, afin de preparer les sessions de correction du bloc DEV-V2-01.

## Perimetre exact traite

Perimetre reellement audite :

- documents de gouvernance session demands :
  - docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md
  - docs/2-SESSIONS/README_SESSIONS.md
  - docs/3-TEMPLATES/TEMPLATE_SESSION.md
  - docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-01/SESSION.md
- lecture frontend shell/navigation :
  - app/layout.tsx
  - app/app-shell.tsx
  - app/page.tsx
  - app/dashboard/page.tsx
  - app/planning/page.tsx
  - app/users/page.tsx
  - app/vehicles/page.tsx
  - app/templates/page.tsx
  - app/templates/templates-client.tsx
  - app/company/page.tsx
  - app/depots/page.tsx
  - app/onboarding/page.tsx
  - app/onboarding/onboarding-client.tsx
  - app/audit/page.tsx
  - app/login/page.tsx
  - app/privacy/page.tsx
  - app/planning/manual-planning-panel.tsx
  - app/ui/error-message.tsx
  - lib/permissions.ts

Hors perimetre volontaire :

- toute correction de code applicatif ;
- toute modification docs MASTER ;
- toute modification template ;
- toute modification hors dossier session DEV-V2-01-01.

## Resultat synthetique de session

Decision patch : NO_PATCH (code applicatif).

Verdict formel d'audit : incomplet.

Constat principal :

- shell prive en place (sidebar/topbar/navigation conditionnelle) ;
- nomenclature legacy encore exposee (Templates, Onboarding) au lieu de la cible V2 (Modeles horaires, Mise en route) ;
- gestion non autorisee non homogene (redirect /login, redirect /dashboard, message inline uniquement sur planning) ;
- matrice d'ecarts priorisee produite pour DEV-V2-01-05/06/07.

## Dossiers lies

- Session : docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-01
- PATCH   : docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-01/PATCH
