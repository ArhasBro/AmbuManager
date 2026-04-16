# SESSION

## ID SESSION

`SESSION-20260416-09_A12_A12-01`

## Date

16/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : `1-ALPHA`  
Bloc : `A12 — Exports / onboarding / imports`  
Type : `AUDIT`  
Intitulé : audit global du bloc onboarding / exports / imports

## Objectif de la session

Auditer le bloc A12 sur le code réel et la documentation autorisée, sans correction technique :
- onboarding actuel réellement exploitable ;
- besoin import initial réellement justifié ;
- existant réel côté exports / impression ;
- cohérence globale du bloc entre cadrage, plan, permissions, docs et dépôt courant.

## Périmètre exact traité

### Documentation maître relue
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code contrôlé en priorité
- gouvernance / permissions :
  - `lib/permission-catalog.ts`
  - `lib/permissions.ts`
  - `lib/rbac.ts`
  - `lib/auth.ts`
  - `prisma/seed.ts`
- structure / modèles :
  - `prisma/schema.prisma`
- onboarding manuel :
  - `app/dashboard/page.tsx`
  - `app/company/*`
  - `app/users/*`
  - `app/api/users/*`
  - `app/vehicles/*`
  - `app/api/vehicles/*`
  - `app/depots/*`
  - `app/api/depots/*`
  - `app/templates/*`
  - `app/api/templates/*`
- planning / exports / impression :
  - `app/planning/page.tsx`
  - `app/planning/planning-client.tsx`
  - `app/planning/manual-planning-panel.tsx`
- documents A12 existants :
  - `docs/2-sessions/1-ALPHA/BLOC_A12/*`
  - `docs/3-patches/1-ALPHA/BLOC_A12/*`

## Résultat synthétique de session

Le bloc A12 est **partiellement présent** côté onboarding manuel, mais **absent** côté import initial et côté exports / impression.

Constat retenu sur le dépôt contrôlé :
- profil société : **OUI**
- bases / dépôts : **OUI**
- utilisateurs : **OUI**
- véhicules : **OUI**
- templates : **OUI**
- indisponibilités utilisateurs : **OUI**
- parcours onboarding dédié / guidé : **NON**
- import initial utilisateurs / véhicules / templates / dépôts / indisponibilités : **NON**
- formats `CSV` / `XLSX` : **NON**
- aperçu avant import : **NON**
- validation manuelle d’import : **NON**
- rapport d’erreurs d’import : **NON**
- export PDF planning : **NON**
- export Excel / CSV planning : **NON**
- impression simple depuis l’UI : **NON**
- permission export réellement branchée : **NON**
- cohérence globale du bloc A12 à ce stade : **NON**

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A12/SESSION-20260416-09_A12_A12-01`
- Patchs : `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-09_A12_A12-01`
