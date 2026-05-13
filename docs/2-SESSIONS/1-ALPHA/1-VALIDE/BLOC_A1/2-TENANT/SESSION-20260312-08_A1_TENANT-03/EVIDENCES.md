# EVIDENCES

## Sources utilisées

### Documentation utile
- `docs/master/DOCUMENT_MAITRE.md`
- `docs/master/REGISTRE_DECISIONS.md`
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/master/PLAN_DE_DEVELOPPEMENT.md`
- sessions précédentes utiles `AUTH-03`, `TENANT-01`, `TENANT-02`

### Code réel inspecté
- `proxy.ts`
- `app/vehicles/page.tsx`
- `app/users/page.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/api/planning/shifts/route.ts`
- `app/dashboard/page.tsx`

## 1. Défaut réellement visé

### 1.1 Constat hérité de `TENANT-01`
Source : `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-06_A1_TENANT-01/RESULTATS.md`

Preuve documentaire utile :
- section `2.2 UI planning` : `/planning` ne consomme pas directement `companyId` côté page ;
- la protection y est décrite comme réelle mais plus indirecte, car reposant sur `proxy.ts` et sur les APIs planning.

Constat :
- `TENANT-03` ne repart pas de zéro ;
- le défaut cible côté UI est bien la page planning et non les routes/API déjà corrigées en `TENANT-02`.

### 1.2 Protection initiale seulement indirecte sur `/planning`
Source : `proxy.ts` (lignes 1 à 10)

Preuves :
- middleware `withAuth` ;
- matcher incluant `"/planning/:path*"`.

Constat :
- l’accès à `/planning` était bien protégé à l’entrée ;
- mais ce contrôle était générique auth, pas une garde serveur explicite dans la page elle-même.

### 1.3 État initial de `app/planning/page.tsx`
Source inspectée avant correction : `app/planning/page.tsx`

Preuve factuelle :
- la page rendait directement `PlanningClient` sans relecture de session ni contrôle explicite de `companyId`.

Constat :
- la UI planning n’était pas alignée sur le niveau de garde serveur déjà présent sur `/vehicles` et `/users`.

## 2. Zones UI déjà conformes ou suffisantes sur le périmètre inspecté

### 2.1 `app/vehicles/page.tsx`
Source : `app/vehicles/page.tsx` (lignes 9 à 23)

Preuves :
- `getServerSession(authOptions)` ;
- redirection si absence de session ;
- redirection si rôle non `ADMIN` / `GERANT` ;
- redirection si `user.companyId` absent ;
- lecture des véhicules avec `where: { companyId }`.

Constat :
- la page véhicule était déjà explicitement bornée côté UI serveur.

### 2.2 `app/users/page.tsx`
Source : `app/users/page.tsx` (lignes 10 à 15)

Preuves :
- session relue côté serveur ;
- redirection si `user.id` ou `user.companyId` absent ;
- contrôle rôle via `requireRole(user.role, ["ADMIN", "GERANT"])`.

Constat :
- la page users était déjà explicitement bornée côté UI serveur.

### 2.3 APIs planning déjà bornées au tenant
Source : `app/api/planning/shifts/route.ts` (lignes 40 à 87)

Preuves :
- récupération de `session?.user?.companyId` et `session?.user?.id` ;
- refus si absent ;
- requête `prisma.shift.findMany({ where: { companyId, ... } })`.

Constat :
- l’exposition de données planning restait déjà bornée au tenant côté API ;
- le point à remettre à niveau était bien le niveau de garde UI sur la page elle-même.

### 2.4 `app/planning/planning-client.tsx`
Source : `app/planning/planning-client.tsx` (lignes 537 à 559, 1500 à 1517)

Preuves :
- lecture du rôle via `/api/auth/session` pour piloter certains comportements UI ;
- édition des cartes planning conditionnée par `editable={canAdminSave(role)}`.

Constat :
- le client planning ne prouve pas à lui seul une fuite inter-tenant ;
- aucune correction minimale supplémentaire strictement `TENANT-03` n’y a été retenue.

## 3. Correction réellement appliquée

### 3.1 `app/planning/page.tsx`
Source : `app/planning/page.tsx` (lignes 1 à 18)

Correction appliquée :
- ajout de `getServerSession(authOptions)` ;
- lecture de `session?.user` ;
- redirection vers `/login` si `user.id` ou `user.companyId` est absent ;
- rendu inchangé pour un utilisateur rattaché à un tenant.

Effet :
- la page `/planning` ne repose plus uniquement sur `proxy.ts` puis sur les APIs pour le cloisonnement initial ;
- le tenant est désormais contrôlé explicitement côté page serveur avant rendu de la UI.

## 4. Vérifications techniques réellement exécutées

### 4.1 Patch
Commande rejouée sur une copie propre du dépôt avant application dans le dépôt cible :

```bash
git apply --check docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-08_A1_TENANT-03/PATCH__SESSION-20260312-08_A1_TENANT-03.diff
```

Résultat :
- OK

### 4.2 Lint
Commande exécutée sur le dépôt cible :

```bash
npm run lint
```

Résultat observé :
- OK

### 4.3 Build
Commande exécutée sur le dépôt cible :

```bash
npm run build
```

Résultat observé :
- OK

## 5. Conclusion de preuve

Le défaut UI réellement hérité de `TENANT-01` sur `/planning` est corrigé par un patch minimal et borné.

La validation technique finale est désormais prouvée :
- patch appliqué dans le dépôt cible ;
- `git apply --check` : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.

## Verdict de preuve

conforme
