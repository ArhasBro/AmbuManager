# EVIDENCES

## Sources utilisées

### Références produit / plan

- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:398-423`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:267-330`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`

### Schéma / auth / permissions

- `prisma/schema.prisma:149-189`
- `lib/auth.ts:26-149`
- `lib/permissions.ts:36-66`
- `lib/permission-catalog.ts:48-55`
- `lib/rbac.ts:3-17`

### API / UI / usages de la liste

- `app/api/users/route.ts:24-75`
- `app/users/page.tsx:12-46`
- `app/users/user-depot-assignment-client.tsx:47-126`
- `app/users/user-depot-assignment-client.tsx:199-303`
- `app/users/reset-password-client.tsx:35-100`
- `app/users/reset-password-client.tsx:143-220`
- `app/planning/planning-client.tsx:503-556`
- `app/dashboard/page.tsx:42-50`
- `app/api/users/[id]/depot/route.ts:24-49`
- `app/api/users/[id]/reset-password/route.ts:37-79`
- `lib/api/response.ts:1-31`

---

## Extraits factuels clés

### 1. Le bloc A3 attend un vrai module users administrable

Le plan de développement fixe explicitement :

- `USERS-02 — VALIDATION — Vérification de la liste utilisateurs existante`
- `USERS-03 — CORRECTION — Correction / stabilisation de la liste utilisateurs si nécessaire`

Il pose comme résultat attendu : **“vrai module users administrable”**.

### 2. Le cadrage produit dit bien “liste des utilisateurs”, avec réserve sur l’UI complète

Le cadrage indique pour `05.1 Liste des utilisateurs` :

- affichage des utilisateurs d’une société ;
- objectif métier : administrer l’équipe ;
- statut actuel : `présent` ;
- arbitrage : `UI d’admin complète non visible à ce stade`.

### 3. L’API de liste existe réellement et ne valide qu’un `limit`

Dans `app/api/users/route.ts:10-12`, la query ne contient que :

- `limit: z.coerce.number().int().min(1).max(500).optional().default(200)`

Dans `app/api/users/route.ts:30-33`, la route refuse l’accès sans :

- `companyId`
- `userId`
- permission `canManageUsers(...)`

Dans `app/api/users/route.ts:45-51`, la requête Prisma applique :

- `companyId`
- `platformRole: null`
- `role: { not: null }`
- `orderBy: { name: "asc" }`
- `take: limit`

### 4. Les comptes support globaux sont exclus de la liste

L’exclusion est visible à deux niveaux :

- côté schéma / auth : `platformRole` est distinct de `role` et la session porte `platformRole` / `companyId` (`prisma/schema.prisma:149-189`, `lib/auth.ts:130-140`) ;
- côté liste users : la requête impose `platformRole: null` (`app/api/users/route.ts:45-49`).

### 5. Les données exposées par la liste restent minimales

`app/api/users/route.ts:52-68` sélectionne uniquement :

- identité légère (`id`, `name`, `email`, `role`) ;
- rattachement société / dépôt (`companyId`, `depotId`, `depot`) ;
- timestamps (`createdAt`, `updatedAt`).

Aucun champ de statut utilisateur, archivage ou permissions individuelles n’est exposé dans cette liste.

### 6. La page `/users` ne contient pas une table de listing

`app/users/page.tsx:33-35` affiche explicitement :

- titre : `Utilisateurs`
- sous-texte : `Gestion minimale ALPHA des utilisateurs de société : réinitialisation de mot de passe et rattachement à une base.`

`app/users/page.tsx:42-43` ne rend que :

- `UserDepotAssignmentClient`
- `ResetPasswordClient`

### 7. Les composants UI consomment la liste comme une source de sélection

`app/users/user-depot-assignment-client.tsx:63-99` charge `/api/users?limit=500` puis transforme les résultats en structure `UserLite`.

`app/users/user-depot-assignment-client.tsx:208-299` affiche :

- sélection d’un utilisateur cible ;
- base actuelle ;
- choix d’une nouvelle base ;
- bouton d’enregistrement.

`app/users/reset-password-client.tsx:52-75` charge aussi `/api/users?limit=500`.

`app/users/reset-password-client.tsx:154-217` affiche :

- sélection d’un utilisateur ;
- mot de passe / confirmation ;
- bouton de reset.

### 8. Les états chargement / vide / erreur existent, mais au niveau widget

États observés :

- `Chargement des utilisateurs...`
- `Aucun utilisateur...`
- `Erreur : ...`

Ces états sont présents dans les widgets users, mais aucun état de table globale n’est présent.

### 9. La même source est aussi réutilisée par le planning

`app/planning/planning-client.tsx:503-556` recharge `/api/users?limit=500` pour constituer `usersAll`.

La liste users actuelle n’est donc pas seulement liée à `/users` ; elle sert aussi de référentiel léger partagé.

### 10. La navigation confirme le positionnement minimal actuel du module

Dans `app/dashboard/page.tsx:42-50`, le lien dashboard vers `/users` est libellé :

- `Réinitialisation mot de passe`

Cela confirme que l’entrée n’est pas encore présentée comme une vraie administration utilisateurs complète.

### 11. Cohérence API observée avec les conventions du projet

La route utilise les helpers standard observés ailleurs dans le dépôt :

- réponses `ok / badRequest / unauthorized / forbidden / serverError` (`lib/api/response.ts:1-31`) ;
- validation Zod ;
- sérialisation des dates.

Sur ce point, la route de liste est cohérente avec les conventions API observées dans le projet.
