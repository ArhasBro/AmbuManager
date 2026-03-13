# EVIDENCES

## Preuves factuelles — RBAC-01

---

## 1. Cadrage officiel utile à l’audit

### 1.1 Session enrichie avec rôle principal et société
Preuves documentaires :
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md:122-129`

Constat :
- le cadrage exige explicitement une session contenant au minimum identité, rôle principal et société.

### 1.2 Catalogue cible de rôles métier
Preuves documentaires :
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md:345-352`
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md:354-365`
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md:367-374`

Constat :
- le cadrage vise `GERANT`, `ADMIN`, `REGULATEUR`, `BUREAU`, `ADE`, `AA`, `TAXI` ;
- il précise déjà que `DEA` doit devenir `ADE`.

### 1.3 Permissions fines ALPHA et accès audit
Preuves documentaires :
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md:385-420`
- `docs/master/PLAN_DE_DEVELOPPEMENT.md:247-255`

Constat :
- le cadrage annonce un état encore `partiel` des permissions fines ;
- le plan prévoit bien des sessions ultérieures dédiées à la correction `DEA` → `ADE` et à l’audit/complétion des permissions.

### 1.4 Dashboard différencié et zones encore à confirmer
Preuves documentaires :
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md:949-956`
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md:1269-1273`

Constat :
- le dashboard différencié par rôle est attendu ;
- son contenu exact n’est pas encore entièrement figé dans le cadrage.

### 1.5 Décisions déjà validées côté session/permissions
Preuves documentaires :
- `docs/master/REGISTRE_DECISIONS.md:24-34`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-02_A1_AUTH-03/RESULTATS.md:12-65`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-05_A1_AUTH-06/RESULTATS.md:39-59`

Constat :
- `role` et `companyId` sont déjà validés en session ;
- l’absence de rôle support propriétaire exploitable a déjà été prouvée ;
- deux permissions planning sont déjà confirmées dans le seed et les décisions.

---

## 2. Rôles réellement définis dans le code

### 2.1 Enum `Role`
Preuves code :
- `prisma/schema.prisma:12-20`
- `prisma/migrations/20260224175839_init/migration.sql:2`

Rôles réellement présents :
- `ADMIN`
- `GERANT`
- `BUREAU`
- `DEA`
- `AA`
- `TAXI`
- `REGULATEUR`

Conclusion :
- le catalogue de rôles existe réellement dans le modèle de données.

### 2.2 Rôle principal obligatoire sur `User`
Preuves code :
- `prisma/schema.prisma:116-121`

Conclusion :
- chaque utilisateur porte bien un rôle principal obligatoire ;
- le commentaire confirme qu’il n’y a qu’un seul rôle principal géré pour l’instant.

### 2.3 Usage de l’enum `Role` dans les templates planning
Preuves code :
- `prisma/schema.prisma:187-196`

Conclusion :
- l’enum `Role` est aussi relié au champ `ShiftTemplate.requiredRole` ;
- un usage planning par rôle est techniquement prévu.

---

## 3. Rôles réellement présents dans le seed

### 3.1 Permissions créées par le seed
Preuves code :
- `prisma/seed.ts:181-185`
- `prisma/seed.ts:271-284`

Permissions prouvées :
- `PLANNING_AUTOSCHEDULE`
- `PLANNING_AUTOSCHEDULE_PUBLISH`

### 3.2 Utilisateurs réellement seedés
Preuves code :
- `prisma/seed.ts:189-285`

Constat :
- `ADMIN` : oui, créé pour chaque société ;
- `BUREAU` : oui, `planner`, `viewer`, `planner-b` ;
- `GERANT` : non prouvé dans le seed ;
- `DEA` : non prouvé dans le seed ;
- `AA` : non prouvé dans le seed ;
- `TAXI` : non prouvé dans le seed ;
- `REGULATEUR` : non prouvé dans le seed.

Conclusion :
- le seed ne démontre pas un usage homogène de tout le catalogue ;
- il démontre surtout le couple `ADMIN` / `BUREAU` avec permissions planning différenciées.

### 3.3 `requiredRole` dans les templates seedés
Preuves code :
- `prisma/seed.ts:210-228`
- `prisma/seed.ts:244-253`

Constat :
- tous les templates seedés ont `requiredRole: null`.

Conclusion :
- la mécanique de matching par rôle n’est pas exercée par les données seedées fournies.

---

## 4. Injection réelle du rôle dans l’auth et la session

### 4.1 Chargement au login
Preuves code :
- `lib/auth.ts:43-66`

Conclusion :
- `role` est chargé depuis Prisma et renvoyé dans l’objet utilisateur authentifié.

### 4.2 Hydratation JWT et rechargement DB
Preuves code :
- `lib/auth.ts:71-105`

Conclusion :
- `token.role` est alimenté au login ;
- un rechargement DB du rôle est prévu si le token n’en dispose pas.

### 4.3 Exposition en session et typage
Preuves code :
- `lib/auth.ts:107-116`
- `types/next-auth.d.ts:1-28`

Conclusion :
- `session.user.role` est réellement exposé ;
- le typage `Session`, `User`, `JWT` est aligné avec ce comportement.

---

## 5. Garde-fous généraux d’accès

### 5.1 Proxy / protection d’auth globale
Preuves code :
- `proxy.ts:1-10`

Conclusion :
- `/dashboard`, `/vehicles`, `/planning` et `/users` exigent une session ;
- aucune différenciation par rôle n’est faite au niveau du proxy.

### 5.2 Helper minimal de rôle
Preuves code :
- `lib/rbac.ts:1-4`

Conclusion :
- le contrôle de rôle central réellement présent est minimal : inclusion du rôle courant dans une liste autorisée.

### 5.3 Helpers de permissions planning
Preuves code :
- `lib/permissions.ts:1-23`

Conclusion :
- l’autoschedule et la publication reposent sur :
  - accès natif `ADMIN` / `GERANT`,
  - ou permission DB dédiée.

---

## 6. Consommation réelle des rôles côté pages serveur

### 6.1 Dashboard
Preuves code :
- `app/dashboard/page.tsx:7-23`

Constat :
- page accessible à toute session ;
- lien vers `/users` affiché uniquement pour `ADMIN` / `GERANT`.

### 6.2 Page `/users`
Preuves code :
- `app/users/page.tsx:10-30`

Constat :
- session, `user.id`, `companyId` et rôle `ADMIN` / `GERANT` requis.

### 6.3 Page `/vehicles`
Preuves code :
- `app/vehicles/page.tsx:9-23`

Constat :
- accès réservé à `ADMIN` / `GERANT` ;
- lecture bornée au `companyId` de session.

### 6.4 Page `/planning`
Preuves code :
- `app/planning/page.tsx:8-18`

Constat :
- seule une session valide avec `user.id` et `companyId` est exigée ;
- aucun rôle spécifique n’est requis au niveau de la page.

Conclusion globale pages serveur :
- usage explicite fort de `ADMIN` / `GERANT` sur `/users` et `/vehicles` ;
- aucune branche spécifique prouvée pour `BUREAU`, `REGULATEUR`, `DEA`, `AA`, `TAXI`.

---

## 7. Consommation réelle des rôles côté API

### 7.1 Users
Preuves code :
- `app/api/users/route.ts:24-31`
- `app/api/users/[id]/reset-password/route.ts:36-43`

Constat :
- lecture users et reset password réservés à `ADMIN` / `GERANT`.

### 7.2 Vehicles
Preuves code :
- `app/api/vehicles/route.ts:24-31`
- `app/api/vehicles/route.ts:59-66`
- `app/api/vehicles/route.ts:99-105`

Constat :
- GET réservé à `ADMIN` / `GERANT` ;
- POST et DELETE réservés à `ADMIN` seul.

### 7.3 Health Prisma
Preuves code :
- `app/api/health/prisma/route.ts:8-29`

Constat :
- accès réservé à `ADMIN` seul.

### 7.4 Règles société
Preuves code :
- `app/api/company/rules/route.ts:20-23`
- `app/api/company/rules/route.ts:25-31`
- `app/api/company/rules/route.ts:80-91`

Constat :
- GET autorisé à tout utilisateur connecté de la société ;
- PATCH réservé à `ADMIN` / `GERANT`.

### 7.5 Planning publié et affectation
Preuves code :
- `app/api/planning/shifts/route.ts:40-47`
- `app/api/planning/shifts/[id]/assign/route.ts:31-45`

Constat :
- GET `/api/planning/shifts` n’exige pas de rôle spécifique ;
- PATCH assignation exige `ADMIN` / `GERANT`.

### 7.6 Autoschedule et matching
Preuves code :
- `app/api/planning/autoschedule/day/route.ts:68-84`
- `app/api/planning/autoschedule/week/route.ts:94-108`
- `app/api/planning/autoschedule/runs/route.ts:57-71`
- `app/api/planning/autoschedule/runs/[id]/route.ts:48-61`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts:44-58`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:308-323`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts:25-40`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts:54-69`

Constat :
- génération jour/semaine, liste runs, cancel, preview matching et apply matching : `ADMIN` / `GERANT` ou permission `PLANNING_AUTOSCHEDULE` ;
- publication : `ADMIN` / `GERANT` ou permission `PLANNING_AUTOSCHEDULE_PUBLISH` ;
- détail d’un run : `ADMIN` / `GERANT` uniquement.

Conclusion globale API :
- `ADMIN` et `GERANT` dominent l’autorisation ;
- l’ouverture réelle aux autres rôles passe uniquement par deux permissions planning ciblées ;
- aucun contrôle spécifique à `REGULATEUR`, `DEA`, `AA` ou `TAXI` n’est prouvé.

---

## 8. Consommation réelle côté client / UI

### 8.1 Planning client — chargement du rôle
Preuves code :
- `app/planning/planning-client.tsx:535-560`

Constat :
- le composant relit `/api/auth/session` et exploite `user.role` côté client.

### 8.2 Planning client — contrôles UI admin/gérant
Preuves code :
- `app/planning/planning-client.tsx:222-223`
- `app/planning/planning-client.tsx:1205-1255`
- `app/planning/planning-client.tsx:1496-1514`

Constat :
- `canAdminSave(role)` vaut uniquement pour `ADMIN` / `GERANT` ;
- sauvegarde du mode société et édition de certaines cartes de shift sont bornées à `ADMIN` / `GERANT`.

### 8.3 Planning client — boutons visibles plus largement
Preuves code :
- `app/planning/planning-client.tsx:1222-1294`
- `docs/master/REGISTRE_DECISIONS.md:33-34`

Constat :
- les boutons de simulation / génération / publication / annulation sont affichés côté UI sans matrice visuelle complète par rôle ;
- la décision documentée confirme que l’autorité finale reste l’API.

### 8.4 Reset password client
Preuves code :
- `app/users/reset-password-client.tsx:61-75`
- `app/users/reset-password-client.tsx:154-172`

Constat :
- l’UI affiche le rôle de la cible, mais ne met pas en place de logique RBAC propre supplémentaire ;
- l’autorité est portée par la page serveur et l’API.

Conclusion globale UI :
- la consommation client de `role` existe réellement ;
- la différenciation UI reste partielle et concentrée sur `ADMIN` / `GERANT` ;
- il n’existe pas de dashboard pleinement différencié par tout le catalogue cible de rôles.

---

## 9. Usage planning du rôle métier hors contrôle d’accès

### 9.1 Matching par `requiredRole`
Preuves code :
- `lib/services/planning/matching.service.ts:125-206`

Constat :
- le service charge les `requiredRole` des templates ;
- il cherche ensuite des utilisateurs de la société portant ces rôles ;
- si aucun utilisateur ne correspond, il produit `NO_USER_WITH_REQUIRED_ROLE`.

Conclusion :
- le rôle ne sert pas seulement au contrôle d’accès ;
- il existe aussi un usage métier potentiel dans le planning.

Limite probatoire :
- aucun template seedé avec `requiredRole` non nul n’est fourni ;
- aucun scénario runtime concret de matching contraint par rôle n’est donc prouvé ici.

---

## 10. Distinction finale par rôle

### 10.1 Rôles définis et réellement utilisés
- `ADMIN`
- `GERANT`

### 10.2 Rôle défini et partiellement utilisé
- `BUREAU`

### 10.3 Rôles définis mais usage distinct non prouvé
- `DEA`
- `AA`
- `TAXI`
- `REGULATEUR`

### 10.4 Rôle seulement documentaire / non prouvé dans le code réel inspecté
- support propriétaire global distinct des rôles client

### 10.5 Écart documenté entre cadrage et code
- le cadrage vise `ADE`, le code utilise encore `DEA`.

---

## 11. Vérifications techniques réellement exécutées

### 11.1 `npm run lint`
Résultat réel :
- échec d’exécution

Sortie constatée :
- `eslint: not found`

Conclusion :
- aucun résultat `lint OK` ne peut être affirmé dans cet environnement.

### 11.2 `npm run build`
Résultat réel :
- échec d’exécution

Sortie constatée :
- `next: not found`

Conclusion :
- aucun résultat `build OK` ne peut être affirmé dans cet environnement.

### 11.3 Patch
Résultat réel :
- non applicable

Conclusion :
- session d’audit documentaire en `NO_PATCH` ;
- aucun `.diff` produit ;
- aucun `git apply --check` pertinent à lancer.
