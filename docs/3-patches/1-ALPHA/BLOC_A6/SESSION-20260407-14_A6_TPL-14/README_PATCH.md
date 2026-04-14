# README_PATCH

Session : `SESSION-20260407-14_A6_TPL-14`
Type : `VALIDATION`
Bloc : `A6 — Shift templates`

## Statut du livrable

Un correctif minimal unique a été produit pour `TPL-14`.

Nom du patch :
- `PATCH__SESSION-20260407-14_A6_TPL-14.diff`

## Raison du correctif

Le bloc templates est globalement présent et administrable dans le dépôt contrôlé :
- modèle Prisma enrichi pour les templates ;
- API templates list/create/update/archive ;
- UI `/templates` réellement exploitable ;
- prise en compte réelle dans le planning, l'assignation manuelle et l'autoschedule.

Résiduel strictement prouvé avant correctif :
- `lib/services/planning/matching.service.ts` ne tenait pas compte de la composition minimale d'équipe portée par les templates ;
- le matching restait centré sur un besoin mono-slot alors que le bloc A6 expose déjà `secondaryAllowedRoles` et `minStaffCount` ;
- la fondation matching n'était donc pas complètement alignée avec le module 09 de référence.

## Contenu du correctif

Fichiers applicatifs modifiés par le patch :
- `lib/services/planning/matching.service.ts`
- `app/planning/planning-client.tsx`

Effet du correctif :
- le matching lit désormais la composition d'équipe du template ;
- le calcul de matching traite les slots manquants en fonction de `minStaffCount` ;
- le pool de rôles autorisés est calculé par slot ;
- l'application du plan remplit le prochain slot libre (`userId`, puis `user2Id` si requis) ;
- le libellé UI d'auto-assign reflète désormais la réalité (`userId` ou `user2Id`).

## Validations réellement exécutées

Validations patch :
- `git apply --check PATCH__SESSION-20260407-14_A6_TPL-14.diff` → OK
- `git apply PATCH__SESSION-20260407-14_A6_TPL-14.diff` → OK

Validations terminales réelles communiquées pour la session :
- `npx prisma validate` → OK
- `npx prisma generate` → OK
- `npm run lint` → OK
- `npm run build` → OK

## Conclusion de session côté patch

Le résiduel A6 identifié dans le matching a été corrigé par un patch minimal. La validation terminale complète de la session est également acquise d'après les validations réelles communiquées pour `npx prisma validate`, `npx prisma generate`, `npm run lint` et `npm run build`.
