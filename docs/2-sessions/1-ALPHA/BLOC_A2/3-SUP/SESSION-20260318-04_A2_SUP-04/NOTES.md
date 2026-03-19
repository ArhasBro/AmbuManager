# NOTES

## Méthode de travail retenue

- relecture stricte des références `docs/1-master/*` et `docs/4-templates/*` ;
- prise du dépôt réel comme source de vérité ;
- inspection prioritaire des surfaces `users` réellement présentes, sans création d’UI future ;
- correction minimale des flux exposant ou manipulant des utilisateurs de société ;
- absence totale de réouverture de `SUP-01`, `SUP-02`, `SUP-03` hors ce qui était nécessaire pour respecter leur cadrage côté visibilité.

## Arbitrages retenus

### 1. Concentrer `SUP-04` sur la chaîne `users`
Le dépôt ne contient pas d’UI complète d’attribution de rôles.  
La surface réellement structurante était donc la chaîne suivante :
- `app/api/users/route.ts`
- `app/users/*`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `lib/services/users/assign-user-depot.ts`

Cet arbitrage respecte l’instruction de ne traiter que les surfaces réellement présentes.

### 2. Durcir la source de liste plutôt que multiplier les filtres UI
`/api/users` est consommée par la page utilisateurs et par d’autres surfaces comme le planning.  
Le durcissement principal a donc été placé au niveau API :
- `companyId` seul ne suffit plus ;
- la liste est maintenant bornée à `platformRole: null` et `role: { not: null }`.

Ainsi, un compte support global ne remonte plus comme utilisateur de société “normal” sur les flux client existants.

### 3. Fermer aussi les opérations directes par identifiant
Le simple masquage en liste ne suffisait pas.  
Les routes de mutation ciblées ont été durcies pour refuser implicitement toute cible qui ne serait pas un utilisateur de société administrable :
- reset mot de passe ;
- rattachement dépôt.

Le service `assignUserDepot()` a été aligné sur la même règle afin d’éviter qu’une route amont moins stricte puisse contourner le bornage métier.

### 4. Réutiliser le garde-fou déjà prévu par `SUP-02`
`lib/permissions.ts` savait déjà refuser le support global quand `platformRole` est passé correctement à `canManageUsers(...)`.  
Le défaut observé sur les surfaces users était surtout un défaut d’appel : plusieurs flux ne transmettaient pas encore `platformRole`.

Le correctif retenu a donc consisté à transmettre explicitement `session.user.platformRole` / `user.platformRole` sur les flux concernés, sans élargir les permissions.

### 5. Aucun élargissement de droits
Aucun droit supplémentaire n’a été accordé au support.
Le patch ne crée :
- ni bypass cross-company ;
- ni back-office support ;
- ni exception RBAC globale ;
- ni audit renforcé `SUP-05`.

## Observation centrale

Le dépôt réel ne montrait pas un problème de “rôle support attribuable” via une UI de rôles, car cette UI n’existe pas encore.  
Le risque réel se situait sur les flux users existants, où un compte plateforme pouvait encore être mal interprété comme cible client si l’on ne durcissait pas explicitement :
- la source de liste ;
- les mutations directes ;
- le passage de `platformRole` aux contrôles d’accès.

## Blocage de validation rencontré dans ce conteneur

Les validations terminales obligatoires n’ont pas pu être terminées ici.
Constat factuel :
- plusieurs tentatives de `npm ci` ont été interrompues par `SIGTERM` pendant la phase `reify` ;
- journaux constatés dans :
  - `/home/oai/.npm/_logs/2026-03-19T13_12_25_972Z-debug-0.log`
  - `/home/oai/.npm/_logs/2026-03-19T13_14_25_205Z-debug-0.log`

Ce blocage empêche d’annoncer un `OK` réel sur `prisma validate`, `prisma generate`, `lint` et `build` dans ce conteneur.
