# SESSION

## ID SESSION

SESSION-20260312-06_A1_TENANT-01

## Date

12/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A1  
Type : AUDIT  
Intitulé : Audit complet du cloisonnement multi-tenant existant

Références officielles utilisées :
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/master/ETAT_GLOBAL_PROJET.md`
- `docs/master/REGISTRE_DECISIONS.md`
- `docs/master/DOCUMENT_MAITRE.md`
- `docs/master/RECAP_DISCUSSIONS.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260310-01_A1_AUTH-01/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-02_A1_AUTH-03/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-04_A1_AUTH-05/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-05_A1_AUTH-06/RESULTATS.md`
- code réel du dépôt

Contexte utile rappelé :
- `AUTH-01` a conclu à un socle auth existant mais incomplet ;
- `AUTH-02` a corrigé le flux de connexion ;
- `AUTH-03` a validé la session enrichie `role` + `companyId` ;
- le cadrage officiel et le registre des décisions attendent un multi-tenant strict via `companyId` ;
- le cadrage produit précise que le cloisonnement multi-tenant reste actuellement `partiel` et doit être prouvé uniformément.

## Objectif de la session

Auditer strictement, sans correction de code, le cloisonnement multi-tenant réellement présent dans le dépôt sur le périmètre ALPHA inspecté, afin d’établir factuellement :
1. comment le tenant est représenté ;
2. comment il est propagé ;
3. quelles routes / pages / services sont effectivement cloisonnés ;
4. où le cloisonnement est seulement implicite, partiel ou absent ;
5. quels risques réels inter-tenant subsistent dans le périmètre inspecté.

## Périmètre exact traité

### Documentation
- `docs/master/DOCUMENT_MAITRE.md`
- `docs/master/REGISTRE_DECISIONS.md`
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/master/ETAT_GLOBAL_PROJET.md`
- sessions précédentes utiles `AUTH-01`, `AUTH-03`, `AUTH-05`, `AUTH-06`

### Code inspecté
- `lib/auth.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `types/next-auth.d.ts`
- `proxy.ts`
- `prisma/schema.prisma`
- `lib/permissions.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/health/prisma/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/planning-audit.ts`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/planning/page.tsx`
- `app/dashboard/page.tsx`
- recherche textuelle ciblée sur `companyId`, `tenant`, `company`, `societ` dans `app/`, `lib/`, `prisma/`, `docs/master/`

### Hors périmètre explicitement respecté
- RBAC global complet hors lien strict avec l’isolation tenant
- auth au sens large hors portage / contrôle du tenant
- création utilisateur
- reset password hors preuve utile de cloisonnement
- refonte architecture
- optimisation technique
- migrations et patchs
- modules futurs non encore présents dans le dépôt
- validation E2E navigateur non fournie dans cette session

## Résultat synthétique de session

Constat principal :
- le tenant est bien représenté par `companyId` dans l’auth, le JWT, la session et la majorité des modèles métier Prisma ;
- les routes métier inspectées côté users, véhicules, règles société et planning portent globalement un cloisonnement réel par `companyId` en lecture et en création, avec consommation réelle de `session.user.companyId` ;
- les services planning réutilisent ce `companyId` pour empêcher lectures croisées et conflits inter-sociétés sur le périmètre inspecté ;
- le cloisonnement n’est toutefois pas uniforme partout : la route `app/api/health/prisma/route.ts` expose des compteurs globaux `company.count()` et `user.count()` sans filtre `companyId` ;
- plusieurs écritures finales restent protégées par une lecture préalable bornée au tenant, puis une mutation par `id` seul ; cette protection fonctionne en l’état, mais elle reste plus implicite qu’un bornage direct sur la mutation finale ;
- `Permission` et `UserPermission` ne portent pas `companyId` en persistance ; leur rattachement au tenant est indirect via `userId`.

## Décision de session

Décision retenue :
- **NO_PATCH**

Justification méthodologique spécifique au type `AUDIT` :
- la session devait uniquement constater l’état réel du dépôt sur le périmètre `TENANT-01` ;
- aucune correction n’était autorisée ;
- aucun fichier `.diff` ne doit être produit.

## Verdict retenu

**partiellement conforme**

## Fichiers principaux inspectés

### Documentation
- `docs/master/DOCUMENT_MAITRE.md`
- `docs/master/REGISTRE_DECISIONS.md`
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/master/ETAT_GLOBAL_PROJET.md`

### Code
- `lib/auth.ts`
- `types/next-auth.d.ts`
- `proxy.ts`
- `prisma/schema.prisma`
- `lib/permissions.ts`
- routes API users / vehicles / company rules / planning / health
- pages `/users`, `/vehicles`, `/planning`, `/dashboard`
- services planning utiles au filtrage tenant

## Limites de preuve

- audit réalisé uniquement sur documentation officielle + code réel du dépôt fourni ;
- aucun test E2E multi-comptes rejoué dans cette session ;
- aucune variable d’environnement ni politique base de données externe n’a été auditée ;
- toute information absente du dépôt ou des documents officiels reste : **INFORMATION NON FOURNIE — À CONFIRMER**

## État final attendu du dossier patch

Dossier patch attendu :
- `NO_PATCH.md` : présent
- `README_PATCH.md` : non applicable
- aucun fichier `.diff`

## Dossiers liés

- Session : `./docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-06_A1_TENANT-01`
- Patch : `./docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-06_A1_TENANT-01`
