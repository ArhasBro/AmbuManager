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
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-03_A1_AUTH-04/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-04_A1_AUTH-05/RESULTATS.md`

## 2. Preuves documentaires sur l’attendu officiel

### 2.1 Le support propriétaire est explicitement attendu et distinct
Source : `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Preuves :
- `01.1 Rôle support global distinct des rôles client`
- `Description : rôle hors hiérarchie client, distinct des rôles métier de société`
- `Statut actuel : manquant`
- `Arbitrages éventuels : le principe est validé ; le nom exact du rôle n’est pas figé`

Constat :
- le support propriétaire est un besoin officiel ;
- il est distinct des rôles métier client ;
- son implémentation n’est pas encore prouvée dans l’existant.

### 2.2 Le support propriétaire est prévu en accès global multi-sociétés
Source : `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Preuves :
- `01.2 Accès support global multi-sociétés`
- `Description : capacité à consulter et intervenir sur toutes les sociétés`
- `Statut actuel : manquant`

Constat :
- le support propriétaire attendu n’est pas borné à une seule société comme le flux admin/gérant actuel.

### 2.3 Le compte support doit être nominatif
Source : `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Preuves :
- `01.3 Compte support nominatif`
- `Description : le compte support doit être nominatif, non mutualisé, non attribuable aux clients`
- `Statut actuel : manquant`

Constat :
- un simple élargissement générique des droits ne suffit pas à satisfaire l’attendu produit.

### 2.4 Le reset de mot de passe inclut bien le support
Source : `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Preuves :
- `02.4 Réinitialisation de mot de passe`
- `Description : un mot de passe peut être réinitialisé par une personne autorisée.`
- `Utilisateur cible : gérant, admin, support`
- `Statut actuel : partiel`
- `Dépendances : users, rôle support`

Constat :
- le besoin officiel `AUTH-06` existe bien ;
- il dépend explicitement de l’existence du rôle support.

### 2.5 Le plan sépare AUTH-06 du bloc support propriétaire
Source : `docs/master/PLAN_DE_DEVELOPPEMENT.md`

Preuves :
- `AUTH-06 — COMPLÉTION — Réinitialisation de mot de passe par support propriétaire`
- `SUP-02 — COMPLÉTION — Modélisation du rôle support global distinct des rôles client`
- `SUP-03 — COMPLÉTION — Ajout du compte support nominatif`
- `SUP-04 — COMPLÉTION — Gestion de la visibilité support côté client`
- `SUP-05 — COMPLÉTION — Traçabilité renforcée des actions support`

Constat :
- le plan reconnaît `AUTH-06` ;
- mais il planifie aussi séparément les briques structurelles nécessaires au support propriétaire.

## 3. Preuves code réel : ce qui existe déjà

### 3.1 Support technique du mot de passe et reset AUTH-05
Sources :
- `prisma/schema.prisma`
- `lib/auth.ts`
- `app/api/users/[id]/reset-password/route.ts`

Preuves :
- modèle `User` avec champ `password`
- validation login via `bcrypt.compare(password, user.password)`
- route `POST /api/users/[id]/reset-password`
- hash du nouveau mot de passe via `bcrypt.hash(parsed.data.newPassword, 10)`

Constat :
- le dépôt supporte techniquement le mot de passe ;
- un flux produit de reset existe déjà pour `AUTH-05`.

### 3.2 UI produit déjà présente pour admin/gérant
Sources :
- `app/users/page.tsx`
- `app/users/reset-password-client.tsx`
- `app/dashboard/page.tsx`
- `proxy.ts`

Preuves :
- page `app/users/page.tsx`
- texte UI : `Action réservée à l'admin / gérant`
- lien dashboard : `Link href="/users"`
- protection middleware : `"/users/:path*"`

Constat :
- la réinitialisation de mot de passe existe côté produit ;
- mais elle est explicitement définie pour admin/gérant.

## 4. Preuves code réel : absence de support propriétaire exploitable

### 4.1 Aucun rôle support dans le modèle de rôles
Source : `prisma/schema.prisma`

Preuves :
- enum `Role` contient uniquement :
  - `ADMIN`
  - `GERANT`
  - `BUREAU`
  - `DEA`
  - `AA`
  - `TAXI`
  - `REGULATEUR`

Constat :
- aucun rôle `support propriétaire` n’est modélisé dans le dépôt inspecté.

### 4.2 Aucun compte support distinct prouvé dans le modèle utilisateur
Source : `prisma/schema.prisma`

Preuves :
- modèle `User` avec `role` obligatoire
- modèle `User` avec `companyId` obligatoire
- aucune colonne dédiée de type `isSupport`, `scope`, `isOwnerSupport` ou équivalent

Constat :
- aucun compte support global distinct n’est prouvé dans la modélisation actuelle ;
- le modèle utilisateur inspecté est structuré autour d’un rattachement société obligatoire.

### 4.3 Aucune branche auth/session dédiée au support propriétaire
Sources :
- `lib/auth.ts`
- `types/next-auth.d.ts`
- `app/api/auth/[...nextauth]/route.ts`

Preuves :
- `lib/auth.ts` recharge et expose uniquement `role` et `companyId`
- `types/next-auth.d.ts` étend la session/JWT avec `role` et `companyId`
- aucune logique spécifique `support`, `owner support`, `super admin` ou équivalent

Constat :
- l’auth réelle ne contient aucune identité support propriétaire distincte exploitable.

### 4.4 La route de reset refuse implicitement AUTH-06
Source : `app/api/users/[id]/reset-password/route.ts`

Preuves :
- `if (!actorUserId || !companyId) return unauthorized();`
- `if (!requireRole(role, ["ADMIN", "GERANT"])) return forbidden();`
- recherche cible : `where: { id: targetUserId, companyId }`
- `if (targetUserId === actorUserId) { return badRequest("Self password change is out of scope for this route"); }`

Constat :
- la route actuelle :
  - exige un `companyId` de session,
  - exige `ADMIN` ou `GERANT`,
  - borne la cible à la même société,
  - ne traite pas le support propriétaire.

### 4.5 La liste des utilisateurs reste bornée au même périmètre client
Source : `app/api/users/route.ts`

Preuves :
- `if (!session?.user?.companyId) return unauthorized();`
- `if (!requireRole(session.user.role, ["ADMIN", "GERANT"])) return forbidden();`
- `const companyId = session.user.companyId;`
- `where: { companyId }`

Constat :
- le listing utilisateur disponible pour l’UI n’est pas un listing support global ;
- il reste borné à la société courante et à admin/gérant.

### 4.6 L’UI n’expose aucun accès support propriétaire
Sources :
- `app/users/page.tsx`
- `app/dashboard/page.tsx`

Preuves :
- `if (!requireRole(user.role, ["ADMIN", "GERANT"])) redirect("/login");`
- texte UI : `Action réservée à l'admin / gérant`
- dashboard : `(session.user.role === "ADMIN" || session.user.role === "GERANT") ? ...`

Constat :
- le point d’entrée produit de reset n’est pas accessible comme fonctionnalité support propriétaire.

### 4.7 Recherche textuelle négative dans le code inspecté
Sources :
- recherche ciblée dans `app/`, `lib/`, `prisma/`

Preuves d’absence dans le périmètre inspecté :
- aucun rôle ou branche logique `support propriétaire`
- aucun `owner support`
- aucun `superadmin` ou équivalent exploitable pour le reset

Constat :
- dans les fichiers inspectés pour cette session, aucun mécanisme support propriétaire réel n’a été trouvé.

## 5. Démonstration qu’une complétion minimale autonome AUTH-06 n’est pas prouvée possible

### 5.1 Invention de rôle interdite par le cadrage disponible
Sources :
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `prisma/schema.prisma`

Chaîne de preuve :
1. le cadrage dit que le nom exact du rôle support n’est pas figé ;
2. le code réel ne contient aucun rôle support ;
3. ajouter un rôle arbitraire dans cette session reviendrait à inventer une modélisation non encore confirmée.

Conclusion :
- une complétion `AUTH-06` ne peut pas se contenter d’inventer localement un enum ou une règle d’accès.

### 5.2 Le support propriétaire attendu n’est pas le flux admin/gérant existant
Sources :
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `app/api/users/[id]/reset-password/route.ts`
- `app/users/page.tsx`

Chaîne de preuve :
1. le cadrage distingue le support propriétaire des rôles client ;
2. la route actuelle autorise seulement `ADMIN` / `GERANT` ;
3. l’UI actuelle se déclare réservée à admin/gérant ;
4. la cible est bornée à la même société.

Conclusion :
- élargir sémantiquement le flux existant ne livrerait pas l’attendu exact `AUTH-06`.

### 5.3 Les briques nécessaires sont déjà identifiées ailleurs dans le plan
Source : `docs/master/PLAN_DE_DEVELOPPEMENT.md`

Preuves :
- `SUP-02`
- `SUP-03`
- `SUP-04`
- `SUP-05`

Constat :
- la modélisation du support propriétaire et ses règles d’exploitation relèvent déjà d’autres sessions officielles ;
- les ouvrir ici ferait déborder `AUTH-06`.

## 6. Cohérence finale du dossier patch

État attendu et retenu :
- `NO_PATCH.md` : présent
- `README_PATCH.md` : absent
- aucun fichier `.diff`

Constat :
- le dossier patch final est cohérent avec une session de type `COMPLÉTION` n’ayant pas démontré de patch autonome recevable.
