# RESULTATS

## Résultats finaux de la session RBAC-01

La session `RBAC-01` aboutit à un **audit documentaire complet** des rôles réellement présents et de leur usage réel dans le dépôt, avec un état final retenu à **partiellement conforme** sur le périmètre inspecté.

---

## 1. Ce qui est réellement présent dans le code

### 1.1 Catalogue de rôles codé
Validation :
- présent dans le dépôt

Preuves :
- enum `Role` dans `prisma/schema.prisma`
- champ `User.role` obligatoire
- champ `ShiftTemplate.requiredRole`

Conclusion :
- le dépôt possède un vrai catalogue de rôles exploitable dans le modèle de données.

### 1.2 Session enrichie avec `role`
Validation :
- conforme sur le périmètre exact de présence technique

Preuves :
- chargement dans `authorize()`
- hydratation JWT
- exposition dans `session.user`
- typage `next-auth`

Conclusion :
- le rôle est réellement disponible pour les contrôles applicatifs.

### 1.3 Contrôles d’accès réellement branchés
Validation :
- présents mais partiels

Preuves :
- pages `/users` et `/vehicles`
- routes `/api/users`, `/api/users/[id]/reset-password`, `/api/vehicles`, `/api/health/prisma`, `/api/company/rules`, `/api/planning/shifts/[id]/assign`
- routes autoschedule contrôlées par rôle natif ou permission dédiée

Conclusion :
- le RBAC n’est pas théorique ;
- il est réellement consommé dans plusieurs zones produit et API.

---

## 2. Quels rôles sont réellement utilisés

### 2.1 `ADMIN`
État :
- **défini et réellement utilisé**

Usage prouvé :
- seed
- session/auth
- pages serveur
- routes API
- rôle exclusif pour certaines opérations sensibles

### 2.2 `GERANT`
État :
- **défini et réellement utilisé**

Usage prouvé :
- session/auth
- nombreuses autorisations conjointes avec `ADMIN`

Limite :
- aucun compte `GERANT` n’est prouvé dans le seed inspecté.

### 2.3 `BUREAU`
État :
- **défini et partiellement utilisé**

Usage prouvé :
- seed
- permissions autoschedule côté planning
- présence du rôle dans les données users renvoyées à l’UI

Limite :
- aucune branche produit forte spécifiquement dédiée à `BUREAU` n’est prouvée.

### 2.4 `DEA`, `AA`, `TAXI`, `REGULATEUR`
État :
- **définis mais usage distinct non prouvé**

Usage réellement constaté :
- présence dans l’enum et certains types
- usage potentiel via `requiredRole` dans le matching planning

Limites :
- aucun contrôle d’accès spécifique trouvé ;
- aucune donnée seed correspondante ;
- aucun écran ou flux produit différencié prouvé.

---

## 3. Permissions réellement présentes

Permissions réellement prouvées :
- `PLANNING_AUTOSCHEDULE`
- `PLANNING_AUTOSCHEDULE_PUBLISH`

Usage réel prouvé :
- génération jour/semaine
- liste de runs autoschedule
- cancel run
- simulation matching
- application matching
- publication de run

Conclusion :
- le dépôt utilise déjà une logique mixte `rôle + permission`, mais sur un périmètre encore limité.

---

## 4. Limites et incohérences réellement prouvées

### 4.1 Décalage `DEA` / `ADE`
Constat :
- le code porte `DEA`
- le cadrage valide `ADE` comme cible attendue

Conclusion :
- le catalogue de rôles est partiellement aligné, pas totalement.

### 4.2 Support propriétaire absent du code réel
Constat :
- aucun rôle support dans l’enum ;
- aucun branchement auth/session/support dédié prouvé.

Conclusion :
- le support propriétaire reste un sujet absent de l’implémentation auditée.

### 4.3 Dashboard différencié non pleinement livré
Constat :
- seul un lien `/users` dépend explicitement de `ADMIN` / `GERANT` sur le dashboard inspecté ;
- aucune déclinaison complète par `REGULATEUR`, `BUREAU`, `DEA/ADE`, `AA`, `TAXI` n’est prouvée.

### 4.4 Matrice RBAC globale absente
Constat :
- aucun moteur de politique global ou matrice centrale complète n’a été trouvé.

Conclusion :
- les règles existent, mais restent dispersées et partielles.

### 4.5 Matching par rôle seulement partiellement prouvé
Constat :
- l’infrastructure de matching par `requiredRole` existe ;
- les templates seedés restent à `requiredRole: null`.

Conclusion :
- la fonctionnalité est techniquement amorcée mais non pleinement démontrée par les données fournies.

---

## 5. Décision patch

Décision :
- **NO_PATCH**

Justification :
- `RBAC-01` est une session de type **AUDIT** ;
- aucune correction code n’était attendue ni autorisée ;
- la mission consistait à établir l’état réel, pas à le modifier.

Fichiers code modifiés :
- aucun

Fichiers documentaires produits / mis à jour :
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/SESSION.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/NOTES.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/EVIDENCES.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/FIN_SESSION.md`
- `docs/patches/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/README_PATCH.md`
- `docs/patches/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/NO_PATCH.md`

---

## 6. Vérifications techniques réellement exécutées

### 6.1 `npm run lint`
Résultat :
- non exécutable correctement dans cet environnement

Preuve :
- `eslint: not found`

### 6.2 `npm run build`
Résultat :
- non exécutable correctement dans cet environnement

Preuve :
- `next: not found`

### 6.3 Interprétation
Conséquence :
- aucun `lint OK` ni `build OK` ne peut être affirmé ;
- l’audit reste recevable comme audit de code/documentation, mais sans validation technique de compilation dans cet environnement.

---

## 7. Verdict final

**partiellement conforme**

### Justification du verdict
Le dépôt est **partiellement conforme** sur le périmètre `RBAC-01` parce que :
- les rôles existent réellement dans le schéma ;
- le rôle principal est obligatoire ;
- `role` est réellement injecté dans la session ;
- plusieurs contrôles d’accès réels existent dans le produit et les API ;
- `ADMIN` et `GERANT` sont effectivement exploités ;
- `BUREAU` est exploitable partiellement via permissions planning ;
- mais les autres rôles métier (`DEA`, `AA`, `TAXI`, `REGULATEUR`) ne disposent pas encore d’un usage produit distinct réellement prouvé ;
- le décalage `DEA` / `ADE` persiste ;
- aucun rôle support propriétaire n’est implémenté ;
- aucune matrice RBAC globale complète n’est prouvée.
