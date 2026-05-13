# EVIDENCES

## Sources relues avant conclusion

### Références master
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`

### Sessions précédentes utiles
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-04_A1_RBAC-03/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-05_A1_RBAC-04/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-06_A1_RBAC-05/RESULTATS.md`

## Preuves documentaires de cadrage

### 1. Le cadrage porte bien une permission dédiée `consulter audit`
Source : `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:401-420`

Constat :
- `consulter audit` fait partie des permissions fines applicatives ALPHA ;
- `06.6` définit un modèle d’accès mixte : accès natif `GERANT` / `ADMIN` / support propriétaire, plus délégation par permission dédiée.

### 2. Le support audit minimal réel est bien le run courant dans `/planning`
Source : `docs/1-master/REGISTRE_DECISIONS.md:50-55`

Constat :
- l’audit minimal validé est lu via `GET /api/planning/autoschedule/runs/[id]` ;
- aucune route dédiée supplémentaire n’est requise au premier niveau ;
- l’affichage UI minimal read-only est dans `/planning`.

### 3. L’état global du projet identifie bien les 2 fichiers concernés
Source : `docs/1-master/ETAT_GLOBAL_PROJET.md:105-107`

Constat :
- la consultation minimale de l’audit run passe bien par :
  - `app/api/planning/autoschedule/runs/[id]/route.ts`
  - `app/planning/planning-client.tsx`

## Preuves issues des sessions précédentes

### 4. Le support propriétaire n’est pas implémenté dans le dépôt réel
Source : `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/RESULTATS.md:131-137`

Constat :
- aucun rôle support propriétaire n’est prouvé dans le code réel ;
- cette branche du cadrage ne peut donc pas être inventée dans `RBAC-06`.

### 5. `RBAC-05` a bien laissé un support mixte détail run + audit
Source : `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-06_A1_RBAC-05/RESULTATS.md:11-22` et `63-72`

Constat :
- `AUDIT_VIEW` et `canViewAudit()` existent déjà après `RBAC-05` ;
- le point de consommation reste `GET /api/planning/autoschedule/runs/[id]` ;
- la séparation fine entre lecture audit et lecture complète du run n’était pas encore finalisée.

## Preuves code après correction

### 6. L’API distingue désormais l’accès run et l’accès audit
Source : `app/api/planning/autoschedule/runs/[id]/route.ts`

Constat :
- `canViewRun` est calculé via `canAutoSchedule(userId, role)` ;
- `canReadAudit` est calculé via `canViewAudit(userId, role)` ;
- l’endpoint refuse seulement les profils n’ayant ni accès run ni accès audit.

### 7. Le filtre multi-tenant `companyId` est conservé
Source : `app/api/planning/autoschedule/runs/[id]/route.ts`

Constat :
- la lecture du run reste bornée par `findFirst({ where: { id: runId, companyId } })`.

### 8. Les données retournées sont désormais conditionnelles selon le droit
Source : `app/api/planning/autoschedule/runs/[id]/route.ts`

Constat :
- la réponse expose un bloc `access` avec `canViewRun` et `canViewAudit` ;
- `_count` et `draftShifts` ne sont renvoyés que si `canViewRun` est vrai ;
- `auditLogs` n’est renvoyé que si `canReadAudit` est vrai.

Conséquence prouvée :
- un profil avec accès run mais sans `AUDIT_VIEW` ne reçoit plus les logs d’audit ;
- un profil avec `AUDIT_VIEW` mais sans accès run ne reçoit plus les `draftShifts`.

### 9. L’UI interprète explicitement l’état d’accès audit
Source : `app/planning/planning-client.tsx`

Constat :
- l’UI mémorise séparément `runCanViewAudit` et `runCanViewRun` ;
- elle lit le bloc `access` renvoyé par l’API ;
- elle affiche `Accès audit non autorisé sur ce run.` quand l’audit n’est pas accessible ;
- elle affiche `Mode audit seul : détail complet du run masqué.` quand l’utilisateur est en lecture audit sans accès run complet.

## Preuves de validation technique réellement prouvées sur le dépôt cible

### 10. Validation du patch officiel
Constat prouvé :
- `git apply --check` du patch : `OK`
- application du patch : `OK`

### 11. Validation du dépôt après correction
Constat prouvé :
- `npm run lint` : `OK`
- `npm run build` : `OK`

## Ce qui reste explicitement hors périmètre

N’est pas traité par cette session :
- l’implémentation d’un support propriétaire ;
- l’existence d’une page audit dédiée ;
- une séparation produit complète hors support mixte existant ;
- le multi-rôle ;
- une matrice complète d’attribution des permissions audit.
