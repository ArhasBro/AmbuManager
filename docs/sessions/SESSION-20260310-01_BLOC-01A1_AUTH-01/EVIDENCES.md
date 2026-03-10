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

## 2. Cadrage auth — preuves documentaires

### 2.1 Cadrage produit officiel
Source : `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

- Module 02 — Authentification
- `02.1 Connexion par identifiants` : connexion par email + mot de passe
- `02.2 Session enrichie avec rôle principal et société`
- `02.3 Création de mot de passe initial`
- `02.4 Réinitialisation de mot de passe`

Constat factuel :
- le cadrage officiel ne se limite pas au seul login
- le périmètre auth officiel inclut aussi les opérations de mot de passe

### 2.2 Plan officiel de session
Source : `docs/master/PLAN_DE_DEVELOPPEMENT.md`

Preuves :
- bloc `A1 — Accès, Auth, Multi-tenant, Permissions, API`
- `AUTH-01 — AUDIT — Audit complet de l’authentification existante`
- `AUTH-04 — COMPLÉTION — Création/validation du mot de passe initial côté produit`
- `AUTH-05 — COMPLÉTION — Réinitialisation de mot de passe par admin/gérant`
- `AUTH-06 — COMPLÉTION — Réinitialisation de mot de passe par support propriétaire`

Constat factuel :
- `AUTH-01` est bien une session d’audit
- les sujets mot de passe initial / reset existent explicitement dans le plan, mais comme complétions distinctes

## 3. Références documentaires complémentaires

### 3.1 Document maître
Source : `docs/master/DOCUMENT_MAITRE.md`

Preuves :
- principe non négociable : `Authentification et session enrichie`
- stack mentionnée : `NextAuth`

### 3.2 Registre de décisions
Source : `docs/master/REGISTRE_DECISIONS.md`

Preuve :
- décision validée : `NextAuth (JWT) session enrichie (role, companyId) + RBAC/permissions`

## 4. Fichiers code réellement inspectés

- `lib/auth.ts`
- `types/next-auth.d.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `app/login/page.tsx`
- `app/providers.tsx`
- `app/layout.tsx`
- `proxy.ts`
- `app/dashboard/page.tsx`
- `app/dashboard/logout-button.tsx`
- `app/vehicles/page.tsx`
- `app/api/users/route.ts`
- `app/api/health/prisma/route.ts`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma/test-login.ts`

## 5. Preuves code — constats positifs

### 5.1 Flux de connexion présent
Source : `lib/auth.ts`

Preuves visibles :
- `CredentialsProvider`
- validation `email` + `password` via `zod`
- extraction des identifiants : `const { email, password } = parsed.data;`
- chargement utilisateur par email :
  - `const user = await prisma.user.findUnique({`
  - `where: { email },`
- vérification mot de passe via bcrypt :
  - `const ok = await bcrypt.compare(password, user.password);`

Constat précis :
- un flux de connexion par identifiants existe réellement dans le code
- le chargement utilisateur est bien effectué par email
- la vérification du mot de passe est bien effectuée par `bcrypt.compare`

### 5.2 Route auth présente
Source : `app/api/auth/[...nextauth]/route.ts`

Preuve visible :
- export du handler NextAuth en `GET` et `POST`

Constat précis :
- la route auth est réellement branchée

### 5.3 Protection de routes présente
Source : `proxy.ts`

Preuves visibles :
- import `withAuth` depuis `next-auth/middleware`
- export par défaut :
  - `export default withAuth({`
  - `pages: { signIn: "/login" }`
- routes protégées par matcher :
  - `matcher: ["/dashboard/:path*", "/vehicles/:path*", "/planning/:path*"]`

Constat précis :
- une protection de routes existe bien au niveau middleware
- les routes `/dashboard`, `/vehicles` et `/planning` sont explicitement couvertes

### 5.4 Provider de session présent
Source : `app/providers.tsx`

Preuves visibles :
- import `SessionProvider` depuis `next-auth/react`
- composant :
  - `return <SessionProvider>{children}</SessionProvider>;`

Constat précis :
- le provider de session NextAuth est bien présent côté client

### 5.5 Page de login présente
Source : `app/login/page.tsx`

Preuves visibles :
- formulaire `Email`
- champ `Mot de passe`
- appel `signIn("credentials")`
- redirection vers `/dashboard` en cas de succès

Constat précis :
- une UI de connexion est réellement présente

### 5.6 Session enrichie présente
Sources :
- `lib/auth.ts`
- `types/next-auth.d.ts`

Preuves visibles :
- stratégie `jwt`
- callback `jwt` alimentant `role` et `companyId`
- callback `session` alimentant `session.user.id`, `session.user.role`, `session.user.companyId`
- extension de types `Session`, `User`, `JWT`

Constat précis :
- la session enrichie demandée par le cadrage est visible dans le code

### 5.7 Consommation réelle de la session
Sources :
- `app/dashboard/page.tsx`
- `app/vehicles/page.tsx`
- `app/api/users/route.ts`
- `app/api/health/prisma/route.ts`

Preuves visibles :
- redirection vers `/login` si absence de session
- lecture de `session.user.role`
- lecture de `session.user.companyId`
- lecture de `session.user.id`

Constat précis :
- l’identité authentifiée est consommée dans plusieurs points du dépôt
- `app/api/users/route.ts` est utilisé ici uniquement comme **preuve de consommation de session**
- `app/api/users/route.ts` n’est **pas** retenu comme preuve d’implémentation auth, mais seulement comme preuve qu’une session authentifiée enrichie est lue côté serveur

### 5.8 Support données côté modèle
Source : `prisma/schema.prisma`

Preuves visibles :
- modèle `User`
- champs `email`, `password`, `role`, `companyId`

Constat précis :
- le modèle de données supporte le flux auth observé

### 5.9 Seed et test technique présents
Sources :
- `prisma/seed.ts`
- `prisma/test-login.ts`

Preuves visibles :
- hash bcrypt dans `upsertUser`
- test technique `bcrypt.compare`

Constat précis :
- le dépôt contient une preuve technique de génération de mot de passe hashé et de vérification de hash

## 6. Preuves code — constats d’absence ou de portée insuffisante

### 6.1 Création de mot de passe initial côté produit non prouvée
Sources inspectées :
- `app/api/users/route.ts`
- `app/login/page.tsx`
- `lib/auth.ts`
- `prisma/seed.ts`

Constat précis :
- aucune route UI/API dédiée à la création de mot de passe initial côté produit n’a été trouvée
- `prisma/seed.ts` prouve une alimentation technique de données, mais pas un flux produit visible autonome

### 6.2 Réinitialisation de mot de passe non prouvée
Sources inspectées :
- `app`
- `lib`
- `prisma`
- `types`

Constat précis :
- aucune page ou route dédiée de réinitialisation de mot de passe n’a été trouvée dans le périmètre inspecté

### 6.3 Preuve fonctionnelle complète non fournie
Sources inspectées :
- dépôt code
- documents officiels

Constat précis :
- aucune preuve d’exécution navigateur / E2E n’est fournie dans cette session
- le comportement runtime complet reste donc partiellement à confirmer

## 7. Limites explicites de preuve

- aucune variable d’environnement auditée
- aucune capture de session runtime fournie
- aucun test manuel utilisateur fourni dans cette session
- toute information absente de ces sources reste : **INFORMATION NON FOURNIE — À CONFIRMER**