# RESULTATS

## Résultats finaux de la session RBAC-03

La session `RBAC-03` aboutit à un audit borné et factuel de l’état réel des permissions / contrôles d’accès existants sur le périmètre `1-ALPHA`, sans production de patch.

---

## 1. Résultat global retenu

Le dépôt inspecté contient bien un **socle RBAC minimal réel**, mais il n’est pas encore aligné sur la matrice de permissions fines ALPHA attendue par le cadrage.

État réellement prouvé :
- session enrichie avec `role` et `companyId` : oui ;
- helper central de rôle : oui ;
- modèle `Permission` / `UserPermission` : oui ;
- permissions distinctes réellement persistées et exercées : **2 seulement** ;
- contrôles d’accès supplémentaires : surtout par rôles hardcodés (`ADMIN` / `GERANT`) ;
- plusieurs permissions du cadrage : seulement partielles ou absentes.

---

## 2. Cartographie finale par permission attendue

### Permissions prouvées
- `lancer autoschedule`
  - prouvée via `PLANNING_AUTOSCHEDULE`
  - réellement consommée dans day/week/runs/cancel/match
- `publier un run`
  - prouvée via `PLANNING_AUTOSCHEDULE_PUBLISH`
  - réellement consommée dans publish

### Permissions partielles
- `consulter son planning`
  - capacité indirectement couverte par l’accès global au planning ;
  - aucune permission distincte propre à la vue individuelle
- `consulter le planning global`
  - capacité réellement accessible à toute session authentifiée ;
  - pas de permission fine distincte
- `modifier le planning`
  - assignation manuelle prouvée ;
  - pas de permission fine dédiée
- `modifier un shift publié`
  - partiellement couvert via l’assignation ;
  - pas de permission fine dédiée
- `annuler un run`
  - capacité prouvée ;
  - pas de permission distincte, réutilisation de `PLANNING_AUTOSCHEDULE`
- `gérer utilisateurs`
  - liste + reset password prouvés ;
  - pas de gestion complète ni permission fine dédiée
- `gérer véhicules`
  - module existant et protégé ;
  - contrôle par rôle, asymétrique entre `ADMIN` et `GERANT`
- `gérer règles métier`
  - lecture/écriture de `company rules` prouvée ;
  - pas de permission fine dédiée
- `consulter audit`
  - lecture partielle de logs planning via détail d’un run ;
  - permission dédiée absente, page audit absente
- `accéder au dashboard admin`
  - existence d’une zone dashboard et d’un lien admin/gérant ;
  - pas de dashboard admin structuré ni permission distincte

### Permissions absentes ou non prouvées
- `créer un shift manuel`
- `supprimer / annuler métier un shift publié`
- `gérer rôles/permissions`
- `gérer templates`
- `exporter planning`
- `accéder au dashboard terrain` comme permission distincte réellement matérialisée

---

## 3. Lecture de fond sur l’alignement réel

### 3.1 Ce qui est aligné
- le dépôt n’est pas vide côté RBAC ;
- l’autorité serveur existe réellement ;
- le modèle permissions est déjà amorcé ;
- deux permissions fines planning sont déjà correctement matérialisées.

### 3.2 Ce qui reste en écart
- le cadrage attend 18 permissions fines ;
- seules 2 sont réellement matérialisées comme permissions distinctes prouvées ;
- une large partie des contrôles repose encore sur des rôles codés en dur ;
- certaines capacités produit existent mais sans permission dédiée ;
- le modèle d’accès à l’audit du cadrage n’est pas encore en place.

### 3.3 Ce qu’il ne fallait pas surqualifier
- les contrôles `companyId` ne sont pas comptés comme permissions RBAC métier ;
- l’existence d’un modèle Prisma ou d’un bouton UI n’est pas suffisante à elle seule ;
- l’existence d’un rôle ne vaut pas preuve d’une permission fine effectivement exercée.

---

## 4. Fichiers code inspectés utiles

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

---

## 5. Vérifications techniques réellement exécutées

### 5.1 `npm run lint`
Résultat :
- OK

### 5.2 `npm run build`
Résultat :
- OK

Conclusion :
- la validation technique `lint/build` est désormais prouvée sur le dépôt cible ;
- cette validation technique ne change pas le fond de l’audit ni le verdict fonctionnel retenu.

---

## 6. Décision patch

- `NO_PATCH`

Justification :
- session `AUDIT` ;
- aucun patch autorisé ;
- aucun correctif produit dans cette session.

---

## 7. Verdict final

**partiellement conforme**

### Justification du verdict

`RBAC-03` est `partiellement conforme` parce que :
- le dépôt prouve déjà des contrôles d’accès réels ;
- le modèle permissions existe et n’est pas seulement documentaire ;
- deux permissions fines planning sont réellement matérialisées ;
- mais la majorité des permissions fines ALPHA attendues par le cadrage n’est pas encore prouvée ;
- plusieurs zones restent en contrôle par rôle hardcodé, en couverture partielle ou totalement absentes ;
- le modèle d’accès audit prévu par le cadrage n’est pas encore atteint.
