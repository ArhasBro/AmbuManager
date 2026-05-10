# EVIDENCES

Ã‰lÃ©ments factuels utilisÃ©s pendant la session.

---

## Sources utilisÃ©es

INFORMATION NON FOURNIE â€” Ã€ CONFIRMER

a# EVIDENCES

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
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-02_A1_AUTH-03/RESULTATS.md`

## 2. Preuves documentaires

### 2.1 Besoin produit officiel
Source : `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Preuves :
- `02.3 Création de mot de passe initial`
- `Description : chaque utilisateur créé reçoit un mot de passe initial.`
- `Objectif métier : permettre un onboarding autonome.`
- `Statut actuel : partiel`

Constat :
- le mot de passe initial est bien un besoin produit officiel ;
- il n’est pas annoncé comme totalement implémenté.

### 2.2 Lien explicite avec la création utilisateur
Source : `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Preuves :
- `05.2 Création d’un utilisateur`
- la description inclut `mot de passe initial`
- `Statut actuel : manquant`

Constat :
- le mot de passe initial est explicitement lié à la création utilisateur ;
- la création utilisateur côté produit est officiellement manquante.

### 2.3 Position dans le plan officiel
Source : `docs/master/PLAN_DE_DEVELOPPEMENT.md`

Preuves :
- `AUTH-04 — COMPLÉTION — Création/validation du mot de passe initial côté produit`
- `USERS-04 — COMPLÉTION — API création utilisateur`
- `USERS-05 — COMPLÉTION — UI création utilisateur`

Constat :
- `AUTH-04` existe bien ;
- mais la création utilisateur côté produit possède déjà son périmètre propre dans le plan.

## 3. Sources code inspectées

- `lib/auth.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `app/api/users/route.ts`
- `app/login/page.tsx`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma/test-login.ts`
- arborescence `app/`
- routes `app/api/`

## 4. Preuves d’existant

### 4.1 Support persistant du mot de passe
Source : `prisma/schema.prisma`

Preuves :
- modèle `User`
- champ `password String`

Constat :
- le mot de passe existe réellement au niveau du modèle.

### 4.2 Création technique de mots de passe hashés
Source : `prisma/seed.ts`

Preuves :
- fonction `upsertUser(...)`
- `const hashedPassword = await bcrypt.hash(params.password, 10);`
- `password: hashedPassword` dans `update`
- `password: hashedPassword` dans `create`

Constat :
- le dépôt sait techniquement créer ou mettre à jour des utilisateurs avec mot de passe hashé ;
- cela reste une preuve technique de seed, pas une preuve suffisante de flux produit.

### 4.3 Validation du mot de passe au login
Source : `lib/auth.ts`

Preuves :
- schéma `zod` avec `email` + `password`
- Prisma `select` incluant `password`
- `const ok = await bcrypt.compare(password, user.password);`

Constat :
- le login valide bien un mot de passe utilisateur stocké en base.

### 4.4 Route auth réellement branchée
Source : `app/api/auth/[...nextauth]/route.ts`

Preuves :
- `const handler = NextAuth(authOptions);`
- `export { handler as GET, handler as POST };`

Constat :
- la logique login de `lib/auth.ts` est bien branchée à la route auth réelle.

### 4.5 Vérification technique complémentaire
Source : `prisma/test-login.ts`

Preuves :
- `user.password.startsWith("$2")`
- `bcrypt.compare(password, user.password)`

Constat :
- le dépôt contient une vérification technique cohérente du hash et de la comparaison.

## 5. Preuves d’absence bornées au périmètre inspecté

### 5.1 Aucune API de création utilisateur trouvée dans le périmètre inspecté
Sources :
- `app/api/users/route.ts`
- inventaire des routes `app/api/`

Preuves :
- `app/api/users/route.ts` contient `export async function GET(...)`
- aucun `export async function POST(...)` dans ce fichier
- dans les routes `app/api/` inspectées, les `POST` trouvés concernent :
  - `vehicles`
  - `planning/autoschedule/...`
- aucun `POST` users n’a été trouvé dans le périmètre inspecté

Constat :
- aucune API de création utilisateur n’a été trouvée dans le périmètre inspecté.

### 5.2 Aucune UI de création utilisateur trouvée dans les fichiers inspectés
Sources :
- arborescence `app/`
- `app/login/page.tsx`

Preuves :
- les pages inspectées dans `app/` sont notamment :
  - `app/login/page.tsx`
  - `app/dashboard/page.tsx`
  - `app/planning/page.tsx`
  - `app/vehicles/page.tsx`
- aucune page dédiée de type users / création utilisateur n’a été trouvée dans les fichiers inspectés

Constat :
- aucune UI de création utilisateur n’a été trouvée dans les fichiers inspectés.

### 5.3 Aucune logique explicite “mot de passe initial” trouvée dans les fichiers inspectés
Sources :
- `app/`
- `lib/`
- `prisma/`

Preuves :
- présence de la logique de mot de passe standard :
  - `password`
  - `bcrypt.hash`
  - `bcrypt.compare`
- absence trouvée, dans les fichiers inspectés, de logique explicite de type :
  - `temporary password`
  - `first login`
  - `must change password`
  - statut dédié “mot de passe initial”

Constat :
- les fichiers inspectés prouvent un mot de passe utilisateur standard ;
- ils ne prouvent pas un mécanisme produit explicite de mot de passe initial.

## 6. Preuve méthodologique spécifique au `NO_PATCH`

Chaîne de preuve :
1. le besoin officiel “mot de passe initial” existe ;
2. il est explicitement dépendant de la création utilisateur ;
3. le dépôt supporte techniquement un mot de passe ;
4. aucune API de création utilisateur n’a été trouvée dans le périmètre inspecté ;
5. aucune UI de création utilisateur n’a été trouvée dans les fichiers inspectés ;
6. aucune logique explicite “mot de passe initial” n’a été trouvée dans les fichiers inspectés.

Déduction contrôlée :
- une complétion purement technique sans point d’entrée produit ne satisferait pas l’exigence “côté produit” ;
- pour rendre le comportement exploitable, il faudrait ouvrir au moins un point d’entrée de création / affectation utilisateur côté produit ;
- ce travail recoupe directement le bloc users officiel.

Conclusion probatoire :
- aucune complétion minimale autonome strictement `AUTH-04` n’est démontrée dans le périmètre inspecté ;
- `NO_PATCH` est donc méthodologiquement recevable.

## 7. Limites de preuve

- la conclusion d’absence est bornée au périmètre inspecté ;
- aucune exécution runtime d’un onboarding utilisateur n’a été fournie ;
- aucune démonstration UI de création utilisateur n’a été fournie ;
- toute information absente de ces sources reste : **INFORMATION NON FOURNIE — À CONFIRMER**