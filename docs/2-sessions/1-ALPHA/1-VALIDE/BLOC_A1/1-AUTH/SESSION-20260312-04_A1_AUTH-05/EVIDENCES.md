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
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-02_A1_AUTH-03/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-03_A1_AUTH-04/RESULTATS.md`

## 2. Preuves documentaires

### 2.1 Besoin produit officiel
Source : `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Preuves :
- `02.4 Réinitialisation de mot de passe`
- `Description : un mot de passe peut être réinitialisé par une personne autorisée.`
- `Utilisateur cible : gérant, admin, support`
- `Statut actuel : partiel`
- `Arbitrages éventuels : support validé ; UI admin métier à construire.`

Constat :
- la réinitialisation de mot de passe est bien un besoin produit officiel ;
- le cadrage distingue implicitement un sujet support et une UI admin à construire.

### 2.2 Position explicite dans le plan
Source : `docs/master/PLAN_DE_DEVELOPPEMENT.md`

Preuves :
- `AUTH-05 — COMPLÉTION — Réinitialisation de mot de passe par admin/gérant`
- `AUTH-06 — COMPLÉTION — Réinitialisation de mot de passe par support propriétaire`

Constat :
- le plan sépare explicitement la partie admin/gérant de la partie support ;
- `AUTH-05` peut donc être traité sans ouvrir `AUTH-06`.

### 2.3 Contexte auth validé avant session
Sources :
- `SESSION-20260310-01_A1_AUTH-01/RESULTATS.md`
- `SESSION-20260312-02_A1_AUTH-03/RESULTATS.md`
- `SESSION-20260312-03_A1_AUTH-04/RESULTATS.md`

Constats utiles repris :
- `AUTH-01` : socle login existant mais périmètre auth global incomplet ;
- `AUTH-03` : `role` et `companyId` bien portés dans la session ;
- `AUTH-04` : support technique du mot de passe existant, mais pas de flux produit autonome de mot de passe initial dans le périmètre inspecté.

## 3. Preuves de l’existant réel avant complétion

### 3.1 Support technique du mot de passe
Sources :
- `prisma/schema.prisma`
- `lib/auth.ts`
- `prisma/seed.ts`

Preuves :
- modèle `User` avec champ `password`
- chargement utilisateur par email dans `lib/auth.ts`
- comparaison `bcrypt.compare(password, user.password)` dans `lib/auth.ts`
- génération d’un hash dans `prisma/seed.ts`

Constat :
- le support technique du mot de passe existait déjà avant `AUTH-05`.

### 3.2 Support session utile au reset admin/gérant
Sources :
- `lib/auth.ts`
- `app/api/auth/[...nextauth]/route.ts`
- session validée par `AUTH-03`

Preuves :
- session enrichie contenant `id`, `role`, `companyId`
- usage serveur réel déjà prouvé avant session

Constat :
- le socle permettant de contrôler un reset admin/gérant existait déjà.

### 3.3 Liste users bornée à la société
Source : `app/api/users/route.ts`

Preuves :
- `getServerSession(authOptions)`
- refus si absence de `session?.user?.companyId`
- `requireRole(session.user.role, ["ADMIN", "GERANT"])`
- `findMany({ where: { companyId } ... })`

Constat :
- avant patch, le dépôt possédait déjà une lecture des utilisateurs de la société pour `ADMIN` / `GERANT`.

### 3.4 Absence d’API dédiée avant complétion dans le périmètre inspecté
Sources inspectées :
- `app/api/auth/[...nextauth]/route.ts`
- `app/api/users/route.ts`
- fichiers users/auth/admin pertinents présents dans le dépôt avant ajout

Constat borné :
- dans les fichiers inspectés pour cette session, aucun endpoint dédié au reset admin/gérant d’un autre utilisateur n’était présent avant ajout de `app/api/users/[id]/reset-password/route.ts`.

### 3.5 Absence d’UI dédiée avant complétion dans le périmètre inspecté
Sources inspectées :
- arborescence `app/`
- `app/dashboard/page.tsx`

Constat borné :
- dans le périmètre inspecté pour cette session, aucune page dédiée au reset admin/gérant n’était présente avant ajout de `app/users/page.tsx`.

## 4. Preuves de complétion produite dans cette session

### 4.1 Route API dédiée
Source : `app/api/users/[id]/reset-password/route.ts`

Preuves :
- `export async function POST(...)`
- chemin dédié `app/api/users/[id]/reset-password/route.ts`

Constat :
- une route produit dédiée au reset admin/gérant a bien été ajoutée.

### 4.2 Contrôle d’accès minimal
Source : `app/api/users/[id]/reset-password/route.ts`

Preuves :
- `const actorUserId = session?.user?.id;`
- `const companyId = session?.user?.companyId;`
- `const role = session?.user?.role;`
- `if (!actorUserId || !companyId) return unauthorized();`
- `if (!requireRole(role, ["ADMIN", "GERANT"])) return forbidden();`
- recherche cible via `where: { id: targetUserId, companyId }`

Constat :
- seuls `ADMIN` / `GERANT` connectés peuvent utiliser la route ;
- la cible est bornée à la société courante.

### 4.3 Distinction explicite avec le changement de son propre mot de passe
Source : `app/api/users/[id]/reset-password/route.ts`

Preuves :
- `if (targetUserId === actorUserId) { return badRequest("Self password change is out of scope for this route"); }`

Constat :
- la route traite bien le reset d’un autre utilisateur ;
- le changement de son propre mot de passe est explicitement hors périmètre.

### 4.4 Validation minimale du body
Source : `app/api/users/[id]/reset-password/route.ts`

Preuves :
- schéma `resetPasswordBodySchema`
- champs `newPassword` et `confirmPassword`
- comparaison `Passwords do not match`

Constat :
- un minimum de validation d’entrée est présent.

### 4.5 Persistance sécurisée du nouveau mot de passe
Source : `app/api/users/[id]/reset-password/route.ts`

Preuves :
- `const hashedPassword = await bcrypt.hash(parsed.data.newPassword, 10);`
- `data: { password: hashedPassword }`

Constat :
- le nouveau mot de passe est persisté sous forme hashée.

### 4.6 UI dédiée côté produit
Sources :
- `app/users/page.tsx`
- `app/users/reset-password-client.tsx`
- `app/dashboard/page.tsx`

Preuves :
- page `app/users/page.tsx`
- texte UI : `Utilisateurs — réinitialisation mot de passe`
- chargement users via `fetch("/api/users?limit=500")`
- action submit vers ``/api/users/${selectedUserId}/reset-password``
- lien dashboard : `Link href="/users"`

Constat :
- le reset admin/gérant n’est plus seulement technique ;
- un point d’entrée produit dédié existe désormais.

### 4.7 Protection UI supplémentaire
Source : `proxy.ts`

Preuves :
- ajout de `"/users/:path*"` dans `matcher`

Constat :
- la nouvelle route UI est alignée avec le périmètre protégé des pages produit authentifiées.

## 5. Démonstration de nécessité minimale du support UI ajouté

Chaîne de preuve :
1. le cadrage officiel mentionne une `UI admin métier à construire` ;
2. une simple route API n’aurait donc pas suffi à livrer `AUTH-05` côté produit ;
3. `app/users/page.tsx` matérialise cette UI métier minimale ;
4. le lien `dashboard -> /users` fournit le point d’entrée produit minimal vers cette action ;
5. l’ajout de `"/users/:path*"` dans `proxy.ts` maintient la cohérence de protection de cette nouvelle entrée produit.

Conclusion probatoire :
- l’ajout de `/users`, du lien dashboard et de la protection middleware reste un support minimal strictement nécessaire à `AUTH-05` ;
- il ne démontre pas l’ouverture d’un module users complet.

## 6. Validation technique désormais prouvée

Preuves externes confirmées par contrôle :
- patch appliqué sans erreur ;
- `npm run lint` : OK ;
- `npm run build` : OK ;
- routes `/api/users/[id]/reset-password` et `/users` présentes après application.

Constat :
- le support technique minimal `AUTH-05` est prouvé côté exécution ;
- la limite documentaire précédente sur l’absence de validation runtime ne tient plus.

## 7. Cohérence finale du dossier patch

État attendu et retenu :
- `README_PATCH.md` : présent
- `PATCH__SESSION-20260312-04_A1_AUTH-05.diff` : présent
- `NO_PATCH.md` : absent

Constat :
- le dossier patch final est cohérent avec une session de type `COMPLÉTION` ayant produit un patch recevable.
