# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## 1. Sources documentaires autorisées utilisées

- `docs/SOURCES_AUTORISEES.md`
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/master/ETAT_GLOBAL_PROJET.md`
- `docs/master/REGISTRE_DECISIONS.md`
- `docs/master/DOCUMENT_MAITRE.md`
- `docs/master/RECAP_DISCUSSIONS.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260310-01_A1_AUTH-01/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-01_A1_AUTH-02/RESULTATS.md`

## 2. Cadrage documentaire — preuves utiles

### 2.1 Cadrage produit officiel
Source : `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Preuves :
- `MODULE 02 — Authentification`
- `02.1 Connexion par identifiants`
- `02.2 Session enrichie avec rôle principal et société`
- description de `02.2` :
  - la session contient au minimum l’identité, le rôle principal et l’identifiant société

Constat factuel :
- le cadrage officiel exige bien une session enrichie portant au minimum le rôle principal et l’identifiant société

### 2.2 Plan officiel
Source : `docs/master/PLAN_DE_DEVELOPPEMENT.md`

Preuve :
- `AUTH-03 — VALIDATION — Vérification et validation de la session enrichie (role, companyId)`

Constat factuel :
- le rôle exact de cette session est une validation ciblée sur `role` et `companyId`

### 2.3 Décision produit déjà enregistrée
Source : `docs/master/REGISTRE_DECISIONS.md`

Preuve :
- `NextAuth (JWT) session enrichie (role, companyId) + RBAC/permissions`

Constat factuel :
- la décision officielle déjà enregistrée attend explicitement une session enrichie avec `role` et `companyId`

## 3. Fichiers code réellement inspectés

- `lib/auth.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `app/providers.tsx`
- `app/layout.tsx`
- `types/next-auth.d.ts`
- `app/vehicles/page.tsx`
- `app/api/users/route.ts`
- `app/api/health/prisma/route.ts`
- `app/planning/planning-client.tsx`
- `prisma/schema.prisma`

## 4. Preuves code — chaîne complète `role` + `companyId`

### 4.1 Chargement auth au login
Source : `lib/auth.ts`

Preuves visibles :
- `const user = await prisma.user.findUnique({`
- sélection explicite :
  - `role: true`
  - `companyId: true`
- objet retourné par `authorize()` :
  - `role: user.role`
  - `companyId: user.companyId ?? undefined`

Constat précis :
- `role` et `companyId` sont bien injectés côté auth au bon endroit
- ils proviennent de données réellement chargées en base
- il ne s’agit pas d’un simple typage

### 4.2 Hydratation du JWT
Source : `lib/auth.ts`

Preuves visibles :
- callback `async jwt({ token, user })`
- au login :
  - `if (isRole(u.role)) token.role = u.role;`
  - `if (isNonEmptyString(u.companyId)) token.companyId = u.companyId;`
- sur requêtes suivantes si données manquantes :
  - rechargement DB par `token.sub`
  - `select: { role: true, companyId: true }`
  - réhydratation de `t.role`
  - réhydratation de `t.companyId`

Constat précis :
- `role` et `companyId` sont bien présents dans le JWT
- la logique protège contre une session enrichie partielle si le token perd l’un des champs

### 4.3 Exposition dans la session finale
Source : `lib/auth.ts`

Preuves visibles :
- callback `async session({ session, token })`
- affectations :
  - `session.user.role = ...`
  - `session.user.companyId = ...`

Constat précis :
- `role` et `companyId` ne restent pas seulement dans le JWT
- ils sont bien présents dans la session finale exposée côté application

### 4.4 Route auth réellement branchée
Source : `app/api/auth/[...nextauth]/route.ts`

Preuves visibles :
- `const handler = NextAuth(authOptions);`
- `export { handler as GET, handler as POST };`

Constat précis :
- la configuration `authOptions` de `lib/auth.ts` est réellement utilisée par la route auth

### 4.5 Typage cohérent Session / User / JWT
Source : `types/next-auth.d.ts`

Preuves visibles :
- `Session.user.role?: Role`
- `Session.user.companyId?: string`
- `User.role?: Role`
- `User.companyId?: string`
- `JWT.role?: Role`
- `JWT.companyId?: string`

Constat précis :
- la cohérence entre callbacks auth, JWT, session et types éventuels est bien présente
- aucun écart visible n’est constaté sur ce périmètre

### 4.6 Support session côté client
Sources :
- `app/providers.tsx`
- `app/layout.tsx`

Preuves visibles :
- `SessionProvider` présent dans `app/providers.tsx`
- `Providers` monté dans `app/layout.tsx`

Constat précis :
- la session NextAuth est bien exposée côté client dans l’application

### 4.7 Consommation réelle côté serveur
Sources :
- `app/vehicles/page.tsx`
- `app/api/users/route.ts`
- `app/api/health/prisma/route.ts`

Preuves visibles :
- `app/vehicles/page.tsx`
  - lecture de `user.role`
  - lecture de `user.companyId`
- `app/api/users/route.ts`
  - lecture de `session.user.companyId`
  - lecture de `session.user.role`
- `app/api/health/prisma/route.ts`
  - lecture de `session.user.id`
  - lecture de `session.user.companyId`
  - lecture de `session.user.role`

Constat précis :
- la session enrichie finale est bien consommée côté serveur
- `role` et `companyId` sont donc réellement disponibles après passage par les callbacks auth

### 4.8 Consommation réelle côté client
Source : `app/planning/planning-client.tsx`

Preuves visibles :
- appel `fetchJson("/api/auth/session")`
- lecture de `json.user`
- extraction :
  - `const r = u && typeof u.role === "string" ? (u.role as Role) : null;`

Constat précis :
- la session exposée est réellement lue côté client
- `role` n’est pas seulement défini en types ou en JWT

### 4.9 Support modèle persistant
Source : `prisma/schema.prisma`

Preuves visibles :
- modèle `User`
- champ requis `role`
- champ requis `companyId`

Constat précis :
- le modèle de données supporte réellement les deux champs
- il ne s’agit pas d’un enrichissement purement fictif ou partiel côté schéma

## 5. Conclusion probatoire

Chaîne de preuve établie :
1. `role` et `companyId` sont chargés depuis la base dans `authorize()`
2. ils sont injectés dans le JWT
3. ils sont réexposés dans `session.user`
4. ils sont typés dans `Session`, `User` et `JWT`
5. ils sont consommés réellement dans le dépôt

Conclusion factuelle :
- la session enrichie est **conforme** sur le périmètre `role` + `companyId`

## 6. Limites explicites de preuve

- aucune capture runtime navigateur n’est fournie
- aucun test manuel utilisateur n’est fourni
- aucun build/lint relancé dans cette session
- toute information absente de ces sources reste : **INFORMATION NON FOURNIE — À CONFIRMER**