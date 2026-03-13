# EVIDENCES

## Preuves de défaut réellement visé

### 1. `app/api/health/prisma/route.ts`

Défaut initial retenu :
- la route comptait globalement les sociétés et les utilisateurs, sans borne tenant.

Correction appliquée :
- récupération de `session.user.companyId` ;
- comptage borné à la société courante ;
- comptage des utilisateurs borné à `companyId`.

Effet :
- suppression d’une lecture inter-tenant non justifiée sur cette route.

---

### 2. `app/api/vehicles/route.ts`

Défaut initial retenu :
- la suppression était précédée d’une vérification tenant, mais l’écriture finale restait portée par l’identifiant seul.

Correction appliquée :
- écriture finale remplacée par une suppression bornée par :
  - `id`
  - `companyId`

Effet :
- la contrainte tenant est portée aussi au niveau de l’opération finale.

---

### 3. `app/api/users/[id]/reset-password/route.ts`

Défaut initial retenu :
- le flux vérifiait bien l’utilisateur dans le tenant, mais la mise à jour finale n’était pas portée explicitement par la contrainte tenant.

Correction appliquée :
- mise à jour finale bornée par :
  - `id`
  - `companyId`
- relecture finale de l’utilisateur bornée au même tenant.

Effet :
- la mutation finale ne repose plus seulement sur une pré-vérification applicative.

---

### 4. `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`

Défaut initial retenu :
- la route vérifiait l’appartenance tenant, mais l’écriture finale pouvait rester insuffisamment bornée si elle ne portait que l’identifiant du run.

Correction appliquée :
- écriture finale remplacée par une mise à jour bornée par :
  - `id`
  - `companyId`

Effet :
- l’annulation finale porte explicitement la contrainte tenant.

## Zones inspectées mais non élargies

La session `TENANT-02` n’a pas ouvert :
- de refonte d’architecture multi-tenant ;
- de généralisation à d’autres routes non prouvées ;
- de travail RBAC global ;
- de modifications hors périmètre.

## Résultat des vérifications techniques réellement prouvées

Sur le dépôt cible après application contrôlée du patch code via le `.diff`, avec exclusion volontaire des fichiers de documentation :

- application du patch code via le `.diff` avec exclusion des fichiers de documentation : OK
- `npm run lint` : OK
- `npm run build` : OK

## Conclusion de preuve

Le correctif multi-tenant attendu par `TENANT-02` est :
- réellement appliqué ;
- strictement borné aux routes prouvées ;
- techniquement validé sur le dépôt cible ;
- sans modification hors périmètre.

## Verdict de preuve

conforme