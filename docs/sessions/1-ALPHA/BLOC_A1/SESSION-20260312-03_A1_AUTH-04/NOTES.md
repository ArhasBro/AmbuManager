# NOTES

Notes de travail de la session.

---

## Méthode retenue

Session de type **COMPLÉTION** avec contrainte forte de périmètre.

Méthode appliquée :
1. relire le cadrage officiel sur le mot de passe initial ;
2. relire le plan pour situer précisément `AUTH-04` par rapport au bloc users ;
3. inspecter uniquement les fichiers réellement utiles au sujet ;
4. distinguer :
   - support technique existant,
   - flux produit réellement visible,
   - manque réel,
   - complétion minimale éventuellement faisable,
   - hors périmètre ;
5. conclure sur la possibilité ou non d’un patch strictement `AUTH-04`.

Règle méthodologique appliquée :
- une session `COMPLÉTION` ne peut se terminer en `NO_PATCH` que si l’absence de patch est démontrée proprement ;
- il faut donc établir soit :
  - qu’une complétion minimale autonome existe et doit être produite,
  - soit qu’aucune complétion minimale autonome n’existe sans ouvrir un autre périmètre.

## Cadrage officiel utile

### 1. Besoin produit
Dans `DOCUMENT_CADRAGE_FONCTIONNEL.md` :
- `02.3 Création de mot de passe initial`
- description : `chaque utilisateur créé reçoit un mot de passe initial`
- objectif métier : `permettre un onboarding autonome`
- statut actuel : `partiel`

Constat :
- le besoin produit officiel existe bien ;
- il est explicitement formulé comme un comportement côté produit.

### 2. Dépendance fonctionnelle directe
Dans `DOCUMENT_CADRAGE_FONCTIONNEL.md` :
- `05.2 Création d’un utilisateur`
- description : création utilisateur incluant `mot de passe initial`
- statut actuel : `manquant`

Constat :
- le mot de passe initial est fonctionnellement rattaché au flux de création utilisateur ;
- le cadrage officiel annonce ce flux comme manquant.

### 3. Position dans le plan
Dans `PLAN_DE_DEVELOPPEMENT.md` :
- `AUTH-04 — COMPLÉTION — Création/validation du mot de passe initial côté produit`
- `USERS-04 — COMPLÉTION — API création utilisateur`
- `USERS-05 — COMPLÉTION — UI création utilisateur`

Constat :
- `AUTH-04` doit traiter le sujet mot de passe initial ;
- mais l’ouverture complète de la création utilisateur a déjà son propre périmètre officiel plus loin.

## Constat code réel

### 1. Support technique du mot de passe
- `prisma/schema.prisma` : `User.password`
- `prisma/seed.ts` : hash bcrypt + création/mise à jour d’utilisateurs seedés
- `lib/auth.ts` : validation login via `bcrypt.compare`

Constat :
- le dépôt supporte techniquement un mot de passe utilisateur ;
- cela ne prouve pas à lui seul un flux produit de mot de passe initial.

### 2. Ce qui manque côté produit dans le périmètre inspecté
- `app/api/users/route.ts` expose un `GET` mais pas de `POST`
- dans `app/`, les pages visibles inspectées sont : `login`, `dashboard`, `planning`, `vehicles`, racine
- aucune page de type `/users`, `/users/new`, `/admin/users` n’a été trouvée dans les fichiers inspectés
- aucune logique explicite “mot de passe initial”, “première connexion”, “temporary password”, “force change password” n’a été trouvée dans les fichiers inspectés

## Test méthodologique : une complétion minimale autonome AUTH-04 existait-elle ?

Hypothèses examinées :

### Hypothèse A — ajouter seulement une règle technique ou un helper
Exemples :
- helper de hash dédié,
- validation locale,
- adaptation du seed.

Décision :
- insuffisant.

Raison :
- ne crée aucun comportement produit autonome pour attribuer un mot de passe initial à un utilisateur créé.

### Hypothèse B — ajouter un état technique “mot de passe initial”
Exemples :
- champ “temporaryPassword”,
- booléen “mustChangePassword”.

Décision :
- non recevable dans cette session.

Raison :
- sans création utilisateur côté produit, sans route d’affectation et sans UI d’exploitation, le comportement resterait inutilisable ;
- cela ouvrirait de fait un périmètre de création / mise à jour utilisateur ou de reset.

### Hypothèse C — créer un point d’entrée minimal d’attribution du mot de passe initial
Exemples :
- `POST /api/users`
- action admin de création avec mot de passe initial
- UI de création d’utilisateur

Décision :
- faisable techniquement, mais hors périmètre strict autonome `AUTH-04`.

Raison :
- cela ouvre la création utilisateur côté produit ;
- le plan officiel réserve déjà ce travail à `USERS-04` et `USERS-05`.

## Conclusion de travail

Conclusion méthodologique :
- aucune complétion minimale autonome strictement `AUTH-04` n’a été démontrée comme possible sans ouvrir la création utilisateur côté produit ;
- `NO_PATCH` est donc recevable, mais uniquement avec cette justification explicite.

Verdict de travail retenu :
- **partiellement conforme**