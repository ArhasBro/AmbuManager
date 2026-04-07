# README_PATCH.md

## Patch principal officiel de la session
- Nom : `PATCH__SESSION-20260407-06_A6_TPL-06.diff`
- Session : `SESSION-20260407-06_A6_TPL-06`
- Bloc : `A6 — Shift templates`
- Type : `COMPLÉTION`

## Périmètre du patch
Le patch principal officiel couvre uniquement l’ajout de l’API de modification template.

Route concernée :
- `PATCH /api/templates/[id]`

## Fichier touché
- `app/api/templates/[id]/route.ts`

## Objectif du patch
Exposer une API réelle de modification template, strictement bornée à la société courante, avec :
- authentification par session ;
- borne multi-tenant via `session.user.companyId` ;
- refus de tout `companyId` client ;
- gouvernance cohérente `ADMIN` / `GERANT` ou permission `TEMPLATES_MANAGE` ;
- validation minimale des champs réellement présents ;
- gestion cohérente des erreurs du périmètre ;
- respect du format de réponse projet.

## Commandes de validation réellement prouvées
- `git apply --check`
- `git apply`
- `npm run lint`
- `npm run build`

## Résultat attendu
Après application du patch principal officiel :
- la route `PATCH /api/templates/[id]` existe ;
- le périmètre TPL-06 est couvert sans élargissement ;
- la sortie de build fait apparaître la route `/api/templates/[id]`.

## Rappel méthodologique
Ce fichier documente uniquement le patch principal officiel de la session `TPL-06`. Il ne décrit ni nouveau diff, ni correctif complémentaire, ni extension de périmètre.
