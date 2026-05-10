# SESSION

## ID SESSION

SESSION-20260313-04_A1_RBAC-03

## Date

13/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A1  
Type : AUDIT

## Intitulé

RBAC-03 — AUDIT — Audit des permissions existantes par rapport au cadrage validé

## Objectif

Auditer strictement, sans correction de code, les permissions et contrôles d’accès réellement présents dans le dépôt sur le périmètre `1-ALPHA`, puis mesurer leur alignement avec le cadrage fonctionnel validé.

La session doit distinguer explicitement :
- les permissions / contrôles d’accès réellement prouvés dans le code ;
- les permissions seulement documentées ;
- les permissions absentes ;
- les permissions partielles ;
- ce qui relève du multi-tenant et non d’une permission RBAC métier.

## Références réellement utilisées

### Documentation officielle
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/STRUCTURE_PROJET.md`

### Sessions précédentes utiles
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-03_A1_RBAC-02/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-03_A1_RBAC-02/RESULTATS.md`

### Code réel inspecté
- `lib/auth.ts`
- `types/next-auth.d.ts`
- `lib/rbac.ts`
- `lib/permissions.ts`
- `proxy.ts`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma/migrations/20260226173250_add_permissions/migration.sql`
- `app/dashboard/page.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/planning-audit.ts`

## Rappel du rôle exact d’une session AUDIT

Une session de type `AUDIT` :
- décrit l’état réel du dépôt ;
- compare cet état au cadrage officiel ;
- borne les écarts ;
- ne corrige rien ;
- ne crée aucune matrice théorique qui ne serait pas prouvée par le code.

Conséquence pour `RBAC-03` :
- aucun patch code ;
- aucun fichier `.diff` ;
- aucun `README_PATCH.md` ;
- dossier patch en mode `NO_PATCH` uniquement.

## Cadrage utile retenu pour l’audit

À partir du document de cadrage et du plan officiel, le cadrage utile retenu est le suivant :
- le module `06` valide un catalogue de rôles métier et un rôle principal unique ;
- le point `06.5` attend **18 permissions fines applicatives ALPHA** ;
- le point `06.6` attend un modèle d’accès à l’audit fondé à la fois sur des rôles natifs et sur la permission dédiée `consulter audit` ;
- le plan prévoit explicitement la séquence `RBAC-03` audit, puis `RBAC-04` à `RBAC-06` pour les complétions/corrections ;
- le registre des décisions confirme seulement deux permissions seedées à ce stade : `PLANNING_AUTOSCHEDULE` et `PLANNING_AUTOSCHEDULE_PUBLISH`.

## Constat de départ réellement retenu

À l’ouverture de `RBAC-03`, les éléments déjà prouvés utiles sont :
- `AUTH-03` a validé la session enrichie avec `role` et `companyId` ;
- `TENANT-04` a validé le cloisonnement multi-tenant ALPHA sur le périmètre inspecté ;
- `RBAC-01` a prouvé que les contrôles réels sont surtout concentrés sur `ADMIN` et `GERANT`, avec un usage partiel de `BUREAU` via le planning ;
- `RBAC-02` a réaligné `DEA` vers `ADE` ;
- le dépôt contient bien un modèle `Permission` / `UserPermission`, mais l’audit doit vérifier combien de permissions fines sont réellement persistées, consommées et exercées.

## Cartographie synthétique des permissions / contrôles d’accès réellement prouvés

### 1. Socle technique RBAC réellement présent
- `session.user.role` et `session.user.companyId` sont bien exposés et typés.
- un helper minimal `requireRole()` existe pour les contrôles par rôles autorisés.
- un helper `hasPermission()` existe, mais il n’est consommé que par :
  - `canAutoSchedule()`
  - `canPublishAutoSchedule()`
- le modèle RBAC réellement exercé dans le dépôt actuel est donc mixte :
  - contrôles **hardcodés par rôle** sur plusieurs zones ;
  - contrôles **par permission persistée** seulement pour une partie du planning auto.

### 2. Permissions / contrôles prouvés sur le planning
- consultation du planning : **partielle**
  - page `/planning` accessible à toute session avec `id` + `companyId` ;
  - API `GET /api/planning/shifts` bornée au tenant ;
  - aucune permission fine distincte entre `consulter son planning` et `consulter le planning global` n’est prouvée.
- modification du planning : **partielle**
  - affectation manuelle prouvée via `POST /api/planning/shifts/[id]/assign` ;
  - accès réservé à `ADMIN` / `GERANT` ;
  - aucune permission fine dédiée `modifier le planning` n’est prouvée.
- créer un shift manuel : **absente**
  - aucune route/UI de création manuelle de shift n’est prouvée.
- modifier un shift publié : **partielle**
  - l’assignation manuelle prouvée sait modifier aussi un shift publié ;
  - aucune permission fine dédiée n’est prouvée.
- supprimer / annuler métier un shift publié : **absente**
  - aucune route/UI dédiée n’a été trouvée.
- lancer autoschedule : **prouvée**
  - permission persistée `PLANNING_AUTOSCHEDULE` ;
  - helper `canAutoSchedule()` ;
  - contrôles réellement appliqués sur les routes day/week/runs/match/cancel.
- publier un run : **prouvée**
  - permission persistée `PLANNING_AUTOSCHEDULE_PUBLISH` ;
  - helper `canPublishAutoSchedule()` ;
  - contrôle réellement appliqué sur la route publish.
- annuler un run : **partielle**
  - capacité prouvée sur la route cancel ;
  - mais elle réutilise `canAutoSchedule()` et non une permission fine distincte `annuler un run`.
- exporter planning : **absente**
  - aucune route/UI/export explicite prouvé.

### 3. Permissions / contrôles prouvés sur les modules hors planning
- gérer utilisateurs : **partielle**
  - liste utilisateurs et reset password d’un autre utilisateur de la même société sont prouvés ;
  - contrôle réservé à `ADMIN` / `GERANT` ;
  - pas de permission fine dédiée ni de gestion complète des utilisateurs prouvée dans cette session.
- gérer rôles / permissions : **absente**
  - aucun écran ni endpoint de gestion des rôles/permissions n’est prouvé.
- gérer véhicules : **partielle**
  - lecture page + API pour `ADMIN` / `GERANT` ;
  - création/suppression API réservées à `ADMIN` ;
  - aucune permission fine dédiée `gérer véhicules` n’est prouvée.
- gérer templates : **absente**
  - le schéma et le seed existent, mais aucun module de gestion n’est prouvé.
- gérer règles métier : **partielle**
  - `GET /api/company/rules` lisible par tout utilisateur authentifié ;
  - `PATCH /api/company/rules` réservé à `ADMIN` / `GERANT` ;
  - usage prouvé au moins pour `PLANNING_VIEW_MODE` et la règle `PLANNING_MIN_REST_HOURS` consommée au publish ;
  - aucune permission fine dédiée n’est prouvée.

### 4. Audit et dashboard
- consulter audit : **partielle**
  - des logs d’audit planning sont bien écrits ;
  - ils sont relus dans `GET /api/planning/autoschedule/runs/[id]` pour `ADMIN` / `GERANT` ;
  - aucune permission dédiée `consulter audit`, aucune page audit dédiée et aucun modèle d’accès complet conforme à `06.6` ne sont prouvés.
- accéder au dashboard admin : **partielle**
  - une page `/dashboard` existe et affiche au moins un lien admin/gérant vers `/users` ;
  - il ne s’agit pas d’une permission fine distincte ni d’un dashboard admin structuré.
- accéder au dashboard terrain : **absente / non prouvée comme permission distincte**
  - une page `/dashboard` existe pour toute session ;
  - aucun dashboard terrain différencié ni permission dédiée n’est prouvé.

### 5. Distinction importante retenue pendant l’audit
- les contrôles `companyId` relèvent d’abord du **multi-tenant** ;
- ils participent au contrôle d’accès technique ;
- mais ils ne valent pas, à eux seuls, comme permissions RBAC métier distinctes.

## Niveau d’alignement retenu

État réellement prouvé :
- le dépôt possède bien un socle RBAC minimal exploitable ;
- ce socle repose majoritairement sur des contrôles par rôle codés en dur (`ADMIN` / `GERANT`) ;
- seules deux permissions persistées et réellement exercées sont prouvées :
  - `PLANNING_AUTOSCHEDULE`
  - `PLANNING_AUTOSCHEDULE_PUBLISH`
- plusieurs accès du cadrage existent seulement de façon partielle ou implicite ;
- une part importante des permissions fines ALPHA validées par le cadrage n’est pas encore prouvée dans le code réel.

Conclusion de session :
- le produit est **partiellement aligné** sur le cadrage RBAC ALPHA ;
- il existe déjà des contrôles d’accès réels ;
- mais la matrice de permissions fines attendue par `06.5` et le modèle d’accès audit attendu par `06.6` ne sont pas encore atteints dans le code inspecté.

## Vérifications techniques réellement exécutées

Commandes réellement lancées dans le dépôt cible :
- `npm run lint`
- `npm run build`

Résultat réel désormais prouvé :
- `npm run lint` : OK
- `npm run build` : OK

Conclusion :
- les vérifications techniques `lint` et `build` sont validées sur le dépôt cible ;
- cette validation technique ne modifie pas le fond de l’audit RBAC, qui reste `partiellement conforme` au regard de l’alignement fonctionnel réellement prouvé.

## Décision patch

- `NO_PATCH`

Justification :
- session de type `AUDIT` ;
- aucune correction autorisée ;
- aucun patch code produit.

## Verdict session

**partiellement conforme**

### Justification du verdict

Le verdict `partiellement conforme` est retenu parce que :
- des contrôles d’accès réels existent bien dans le code ;
- le socle session + rôles + permissions persistées est présent ;
- deux permissions fines sont réellement seedées et effectivement consommées ;
- mais la majorité des permissions fines ALPHA du cadrage n’est pas encore matérialisée comme permissions distinctes prouvées ;
- plusieurs accès restent hardcodés par rôle, partiels ou absents ;
- le modèle d’accès à l’audit prévu par le cadrage n’est pas encore atteint.

## État final attendu du dossier patch

Dossier patch attendu :
- `NO_PATCH.md` : présent
- `README_PATCH.md` : non applicable
- aucun fichier `.diff`

## Dossiers liés

- Session : `./docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-04_A1_RBAC-03`
- Patch : `./docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-04_A1_RBAC-03`
