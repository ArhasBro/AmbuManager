# NOTES

## Notes de travail — RBAC-04

## 1. Point de départ retenu

Le constat de `RBAC-03` a été repris tel quel :
- seulement deux permissions distinctes étaient réellement persistées et exercées ;
- plusieurs accès existaient déjà, mais encore branchés surtout par rôle hardcodé ;
- une large partie de `06.5` restait absente, partielle ou non matérialisée.

`RBAC-04` ne devait donc pas rejouer l’audit, mais transformer ce constat en complétion bornée.

## 2. Catalogue ajouté / réaligné

Catalogue matérialisé hors audit :
- `PLANNING_VIEW_SELF`
- `PLANNING_VIEW_GLOBAL`
- `PLANNING_EDIT`
- `PLANNING_SHIFT_CREATE_MANUAL`
- `PLANNING_SHIFT_EDIT_PUBLISHED`
- `PLANNING_SHIFT_CANCEL_PUBLISHED`
- `PLANNING_AUTOSCHEDULE`
- `PLANNING_AUTOSCHEDULE_PUBLISH`
- `PLANNING_AUTOSCHEDULE_CANCEL`
- `USERS_MANAGE`
- `ROLES_PERMISSIONS_MANAGE`
- `VEHICLES_MANAGE`
- `TEMPLATES_MANAGE`
- `COMPANY_RULES_MANAGE`
- `PLANNING_EXPORT`
- `DASHBOARD_ADMIN_ACCESS`
- `DASHBOARD_TERRAIN_ACCESS`

Remarques importantes :
- la permission `consulter audit` n’est volontairement **pas** ajoutée ici ;
- les deux permissions déjà validées sont conservées sans renommage ;
- le seed garantit désormais le catalogue, sans imposer une nouvelle matrice d’attribution.

## 3. Permissions réellement consommées après patch

Permissions désormais effectivement branchées sur des contrôles existants :
- `PLANNING_AUTOSCHEDULE`
- `PLANNING_AUTOSCHEDULE_PUBLISH`
- `PLANNING_AUTOSCHEDULE_CANCEL`
- `PLANNING_EDIT`
- `USERS_MANAGE`
- `VEHICLES_MANAGE`
- `COMPANY_RULES_MANAGE`
- `DASHBOARD_ADMIN_ACCESS`

Précision utile :
- `PLANNING_AUTOSCHEDULE_CANCEL` est branchée avec un fallback de compatibilité sur `PLANNING_AUTOSCHEDULE`, pour ne pas casser l’existant validé ;
- `VEHICLES_MANAGE` réaligne l’accès module / lecture (`page` + `GET`) mais ne change pas le fait que `POST` / `DELETE` restent `ADMIN` only à ce stade ;
- `USERS_MANAGE` réaligne la page `/users`, la liste users et le reset password déjà existant ;
- `PLANNING_EDIT` réaligne l’assignation planning existante, sans prétendre couvrir à elle seule les besoins distincts `modifier un shift publié`.

## 4. Permissions seulement préparées / cataloguées

Permissions matérialisées dans le catalogue, mais non branchées à un contrôle distinct prouvé dans ce dépôt :
- `PLANNING_VIEW_SELF`
- `PLANNING_VIEW_GLOBAL`
- `PLANNING_SHIFT_CREATE_MANUAL`
- `PLANNING_SHIFT_EDIT_PUBLISHED`
- `PLANNING_SHIFT_CANCEL_PUBLISHED`
- `ROLES_PERMISSIONS_MANAGE`
- `TEMPLATES_MANAGE`
- `PLANNING_EXPORT`
- `DASHBOARD_TERRAIN_ACCESS`

Justification :
- aucun module distinct ou contrôle dédié suffisamment propre n’existe encore pour ces points ;
- les brancher ici aurait imposé soit une refonte produit, soit une hypothèse d’autorisation non prouvée.

## 5. Points volontairement laissés hors périmètre

Hors périmètre explicite de `RBAC-04` :
- permission dédiée `consulter audit`
- modèle d’accès audit complet rôle + permission
- page audit dédiée
- multi-rôle
- rôle principal obligatoire
- support propriétaire
- création utilisateur
- reset password self-service / forgot password
- création manuelle complète de shift
- suppression métier dédiée d’un shift publié
- module complet rôles / permissions
- module complet templates
- export planning
- dashboard terrain distinct

## 6. Précautions méthodologiques appliquées

- aucune permission hors `06.5` n’a été introduite ;
- aucune permission existante n’a été renommée ;
- l’existant autoschedule validé a été préservé ;
- aucun élargissement arbitraire de la matrice seed n’a été ajouté ;
- aucun contrôle multi-tenant n’a été confondu avec une permission métier ;
- aucune capacité audit n’a été ouverte dans cette session.
