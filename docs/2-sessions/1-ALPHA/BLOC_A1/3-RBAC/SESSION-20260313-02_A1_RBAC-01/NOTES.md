# NOTES

Notes de travail de la session.

---

## Méthode d’audit retenue

Session de type **AUDIT**.

Méthode appliquée :
1. relire le cadrage officiel pour borner ce qu’un audit RBAC doit constater ;
2. reprendre les sessions utiles déjà validées sur `role`, `companyId`, support propriétaire et multi-tenant ;
3. identifier les rôles réellement définis dans le schéma Prisma ;
4. vérifier leur présence réelle dans le seed ;
5. contrôler l’injection de `role` dans l’auth, le JWT, la session et le typage ;
6. recenser les consommations réelles côté pages serveur, routes/API, composants clients et proxy ;
7. distinguer les contrôles par rôle des contrôles par permission ;
8. classer chaque rôle en : défini / utilisé / partiel / seulement évoqué / non prouvé.

Règles appliquées :
- aucune invention ;
- `CODE > DOCUMENTATION` en cas de contradiction ;
- aucun mélange avec une session de correction ou de complétion ;
- aucune matrice RBAC globale inventée si elle n’existe pas réellement dans le dépôt.

## Rappel du rôle exact d’une session AUDIT

Une session `AUDIT` n’a pas pour rôle de corriger l’existant.
Elle doit :
- décrire l’état réel ;
- pointer les limites réellement prouvées ;
- distinguer le présent, le partiel et l’absent ;
- produire un verdict borné et exploitable pour les sessions suivantes.

Conséquence méthodologique ici :
- aucun patch code n’était autorisé ;
- le dossier patch devait rester en `NO_PATCH` ;
- les écarts constatés sont documentés, mais non corrigés.

## Référentiel de comparaison retenu

Le cadrage officiel indique notamment :
- session enrichie avec rôle principal et société : présent ;
- catalogue de rôles visés : `GERANT`, `ADMIN`, `REGULATEUR`, `BUREAU`, `ADE`, `AA`, `TAXI` ;
- rôle principal obligatoire : présent ;
- permissions fines ALPHA : état annoncé partiel ;
- accès audit prévu via rôle natif + permission dédiée ;
- dashboard différencié par rôle : attendu mais indicateurs exacts encore à préciser.

Le plan officiel place ensuite :
- `RBAC-01` comme audit des rôles existants ;
- `RBAC-02` comme correction du remplacement `DEA` → `ADE` ;
- `RBAC-03` et suivants comme audit/complétion des permissions fines.

## Rôles réellement définis dans le code

Rôles réellement prouvés dans `prisma/schema.prisma` :
- `ADMIN`
- `GERANT`
- `BUREAU`
- `DEA`
- `AA`
- `TAXI`
- `REGULATEUR`

Constats associés :
- le champ `User.role` est obligatoire ;
- le commentaire du schéma confirme qu’un seul rôle principal est géré pour l’instant ;
- `ShiftTemplate.requiredRole` permet aussi d’utiliser l’enum `Role` pour du matching planning.

## Présence réelle dans le seed

Présence réellement prouvée dans `prisma/seed.ts` :
- `ADMIN` : oui
- `BUREAU` : oui
- `GERANT` : non prouvé dans le seed
- `DEA` : non prouvé dans le seed
- `AA` : non prouvé dans le seed
- `TAXI` : non prouvé dans le seed
- `REGULATEUR` : non prouvé dans le seed

Constat important :
- le seed ne prouve donc pas une exploitation homogène du catalogue de rôles ;
- il prouve surtout un scénario `ADMIN` + `BUREAU`, avec permissions planning distinctes côté `BUREAU`.

## Injection auth / session / typage

État prouvé :
- `authorize()` charge `role` et `companyId` depuis Prisma ;
- le callback `jwt` hydrate `token.role` et sait le recharger depuis la base ;
- le callback `session` expose `session.user.role` ;
- `types/next-auth.d.ts` aligne `Session`, `User` et `JWT` sur cet enrichissement.

Conséquence :
- la présence du rôle dans la session n’est pas seulement déclarative ;
- elle est réellement disponible pour les contrôles applicatifs.

## Modèle RBAC réellement implémenté

Le dépôt ne contient pas de matrice RBAC globale centralisée.
Le modèle réellement prouvé est le suivant :
- helper minimal `requireRole(userRole, allowed)` ;
- contrôles directs ad hoc sur `ADMIN` / `GERANT` dans plusieurs pages/routes ;
- deux helpers de permissions DB :
  - `canAutoSchedule()`
  - `canPublishAutoSchedule()`
- absence de `session.user.permissions` réellement hydraté ;
- autorité principalement portée par les routes/API, pas par une couche unique de politique.

## Distinction rôle / permission réellement observée

Contrôles portés principalement par le rôle :
- accès page `/users`
- accès page `/vehicles`
- lecture `/api/users`
- reset `/api/users/[id]/reset-password`
- lecture `/api/vehicles`
- écriture/suppression `/api/vehicles`
- PATCH `/api/company/rules`
- détail de run `/api/planning/autoschedule/runs/[id]`
- assignation de shift `/api/planning/shifts/[id]/assign`
- route health Prisma

Contrôles portés par rôle **ou** permission :
- génération autoschedule jour/semaine
- liste des runs autoschedule
- annulation de run
- simulation matching
- application matching
- publication de run (permission distincte dédiée)

## Lecture par rôle réellement exploitable

### ADMIN
Rôle le plus fortement prouvé en usage réel :
- présent dans le schéma ;
- présent dans le seed ;
- présent dans la session ;
- utilisé dans les pages serveur ;
- utilisé dans les routes/API ;
- seul rôle explicitement autorisé pour certaines opérations (`/api/health/prisma`, POST/DELETE `/api/vehicles`).

### GERANT
Usage réel prouvé mais moins démontré par les données de seed :
- présent dans le schéma ;
- présent dans la session si l’utilisateur le porte ;
- utilisé dans de nombreux contrôles conjoints avec `ADMIN` ;
- aucun compte `GERANT` n’est toutefois fourni par le seed inspecté.

### BUREAU
Usage réel prouvé de façon partielle :
- présent dans le schéma ;
- présent dans le seed ;
- peut disposer de permissions autoschedule ;
- n’a pas de branche produit dédiée explicite ;
- n’est pas utilisé dans les contrôles directs `requireRole(...)` inspectés.

### DEA
Présence codée mais usage réel non prouvé :
- présent dans l’enum ;
- présent dans certains types côté client ;
- potentiellement utilisable comme `requiredRole` de matching ;
- aucun compte seed, aucune UI dédiée, aucun contrôle d’accès dédié, aucun flux produit distinct prouvé.

### AA
Présence codée mais usage réel non prouvé :
- présent dans l’enum ;
- présent dans certains types côté client ;
- aucun contrôle distinct prouvé ;
- aucun compte seed prouvé.

### TAXI
Présence codée mais usage réel de rôle non prouvé :
- présent dans l’enum des rôles ;
- omniprésent aussi comme type véhicule / catégorie planning, ce qui oblige à ne pas confondre rôle et métier véhicule ;
- aucun contrôle d’accès dédié au rôle `TAXI` n’est prouvé.

### REGULATEUR
Présence codée mais usage réel non prouvé :
- présent dans l’enum ;
- présent dans certains types côté client ;
- aucun usage de contrôle distinct trouvé dans les pages/routes inspectées ;
- aucune donnée seed correspondante.

## Écarts et limites prouvés

1. Le cadrage vise `ADE`, alors que le code contient encore `DEA`.
2. Aucun rôle support propriétaire n’est présent dans l’enum ni dans l’auth.
3. Aucun usage produit distinct n’est prouvé pour `REGULATEUR`, `DEA`, `AA`, `TAXI`.
4. Le seed ne prouve réellement que `ADMIN` et `BUREAU`.
5. Le dashboard n’est pas encore réellement différencié selon tout le catalogue cible de rôles.
6. Le planning mélange volontairement visibilité UI large et autorité API, ce qui confirme une distinction encore partielle côté produit.
7. Le matching par rôle existe techniquement, mais le seed inspecté laisse tous les `requiredRole` à `null`, donc aucun scénario concret de matching contraint par rôle n’est prouvé dans les données fournies.

## Conclusion de travail

État de synthèse retenu :
- socle réel présent ;
- usages `ADMIN` / `GERANT` réellement branchés ;
- `BUREAU` exploitable partiellement via permissions ;
- autres rôles majoritairement déclaratifs à ce stade ;
- verdict cohérent : **partiellement conforme**.
