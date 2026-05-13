# NOTES

## Méthode réellement suivie

La reprise a été menée comme une session de `COMPLÉTION` stricte :
- repartir du code réel ;
- relire `./docs/1-master` ;
- repartir du constat de `RBAC-05` ;
- vérifier si la séparation accès run / accès audit pouvait être réalisée sans créer un nouveau support ;
- corriger uniquement les 2 fichiers explicitement demandés ;
- produire un patch officiellement applicable ;
- mettre à jour la documentation finale en cohérence avec l’état réellement prouvé sur le dépôt cible.

## Constats de départ confirmés

Constats confirmés dans le dépôt avant correction :
- `RBAC-05` a bien ajouté `AUDIT_VIEW` et `canViewAudit()` ;
- le point d’exposition réel de l’audit minimal reste `GET /api/planning/autoschedule/runs/[id]` ;
- ce point d’entrée reste mixte : il renvoie à la fois des informations de run et les logs d’audit du run courant ;
- l’accès était encore contrôlé comme un bloc unique autour de `canViewAudit()` ;
- en conséquence, la permission d’audit ouvrait encore la lecture complète du support mixte.

## Stratégie de complétion retenue

La stratégie retenue pour rester strictement dans `RBAC-06` a été :
- conserver le support existant au lieu de créer une route dédiée ;
- conserver `RBAC-05` comme point de départ, sans recréer la permission ;
- calculer séparément :
  - `canViewRun` via `canAutoSchedule()`
  - `canViewAudit` via `canViewAudit()`
- autoriser la lecture du support seulement si au moins un de ces deux accès est vrai ;
- exposer dans la réponse un bloc `access` documentant l’état réel ;
- inclure `draftShifts` et `_count` seulement en cas d’accès run ;
- inclure `auditLogs` seulement en cas d’accès audit ;
- refléter côté UI l’état `Accès audit non autorisé sur ce run.` au lieu d’afficher à tort `Aucun log d’audit sur ce run.`

## Pourquoi ce correctif reste bien dans le périmètre

Ce correctif reste strictement dans `RBAC-06` parce que :
- il ne réajoute pas `AUDIT_VIEW` ;
- il ne crée ni page audit complète ni route dédiée ;
- il ne modifie ni Prisma, ni seed, ni session auth ;
- il ne crée aucun rôle support propriétaire ;
- il ne tente pas de résoudre le multi-rôle ;
- il borne uniquement le modèle d’accès réel du support mixte déjà existant.

## Limites explicitement conservées

Restent hors périmètre et non traités ici :
- la branche support propriétaire du cadrage `06.6`, faute d’implémentation réelle dans le dépôt ;
- une page audit dédiée ;
- une séparation produit complète entre consultation run et consultation audit ;
- une matrice globale d’attribution des permissions audit.

## État réel désormais prouvé sur le dépôt cible

L’état de preuve à retenir pour cette clôture est le suivant :
- `git apply --check` du patch officiel : `OK` ;
- application du patch officiel : `OK` ;
- `npm run lint` : `OK` ;
- `npm run build` : `OK`.

## Conséquence documentaire

Toute la documentation finale de `RBAC-06` doit désormais refléter strictement cet état réel prouvé :
- le patch est applicable ;
- le patch a bien été appliqué ;
- la version corrigée est validée par `lint` et `build` ;
- aucun avertissement prudent antérieur sur l’absence de preuve `lint/build` ne doit être conservé.
