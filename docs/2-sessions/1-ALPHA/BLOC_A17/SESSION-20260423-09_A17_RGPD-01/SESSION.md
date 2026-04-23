# SESSION

## ID SESSION

SESSION-20260423-09_A17_RGPD-01

## Date

23/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturite : 1-ALPHA  
Bloc : A17  
Type : AUDIT  
Intitule : Audit complet des donnees personnelles manipulees : utilisateurs, absences, audit, acces, finalites, roles d'acces, conservation, export/correction/suppression

## Objectif de la session

Auditer l'existant reel des donnees personnelles manipulees par le depot sur le
perimetre strict A17 RGPD-01 :
utilisateurs, absences, audit, acces, finalites, roles d'acces, conservation,
export / correction / suppression.

Session de type AUDIT : aucun correctif code ne devait etre produit sauf
blocage materiel strictement demontre empechant l'audit.

## Perimetre exact traite

- Documentation noyau :
  - docs/1-master/DOCUMENT_MAITRE.md
  - docs/1-master/PLAN_DE_DEVELOPPEMENT.md
  - docs/3-templates/TEMPLATE_DEBUT_SESSION.md
- Documentation complementaire utile :
  - docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md
  - docs/1-master/ETAT_GLOBAL_PROJET.md
  - docs/1-master/REGISTRE_DECISIONS.md
- Code audite :
  - prisma/schema.prisma
  - prisma/seed.ts
  - lib/auth.ts
  - types/next-auth.d.ts
  - lib/permission-catalog.ts
  - lib/permissions.ts
  - lib/rbac.ts
  - app/api/users/route.ts
  - app/api/users/[id]/route.ts
  - app/api/users/[id]/archive/route.ts
  - app/api/users/[id]/depot/route.ts
  - app/api/users/[id]/reset-password/route.ts
  - app/api/users/[id]/absences/route.ts
  - app/api/users/[id]/absences/[absenceId]/route.ts
  - lib/services/users/archive-user.ts
  - lib/services/users/assign-user-depot.ts
  - lib/services/users/user-absence.ts
  - app/users/page.tsx
  - app/users/users-list-client.tsx
  - app/users/user-creation-client.tsx
  - app/users/user-edit-client.tsx
  - app/users/user-absence-client.tsx
  - app/users/reset-password-client.tsx
  - app/audit/page.tsx
  - app/audit/audit-client.tsx
  - app/api/audit/route.ts
  - lib/services/audit/audit-context.ts
  - lib/services/audit/login-audit.ts
  - lib/services/audit/support-action-trace.ts
  - lib/services/planning/planning-audit.ts
  - app/planning/page.tsx
  - app/api/planning/exports/route.ts
  - lib/planning/export.ts
  - app/api/imports/route.ts
  - lib/imports/import-engine.ts

Hors perimetre volontaire :
- correction du depot ;
- validation complete du bloc A17 ;
- execution de RGPD-LOT-02 ;
- audit BDD hors donnees personnelles effectivement manipulees ;
- audit A16, A18 ou autres blocs hors perimetre RGPD-01.

## Resultat synthetique de session

Decision patch : NO_PATCH.

Le depot manipule effectivement des donnees personnelles sur les flux users,
absences, audit, auth, imports et exports. Un socle existe deja :
multi-tenant par companyId, RBAC/permissions, login audit, page audit, archivage
logique des utilisateurs, export planning borne par permissions.

Le bloc RGPD reste toutefois non conforme au niveau attendu pour A17 :
finalites non explicitees dans un registre, audit partiel des changements sur
les donnees personnelles, conservation non definie, absence de mecanisme
documente pour export/correction/suppression RGPD hors operations metier
partielles.

Verdict formel d'audit : non conforme.

## Dossiers lies

- Session : docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-09_A17_RGPD-01
- PATCH   : docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-09_A17_RGPD-01/PATCH
