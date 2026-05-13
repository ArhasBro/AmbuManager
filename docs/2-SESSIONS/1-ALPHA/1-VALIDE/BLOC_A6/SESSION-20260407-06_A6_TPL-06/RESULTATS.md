# RESULTATS.md

## Verdict global
La session `SESSION-20260407-06_A6_TPL-06` est **CONFORME** sur le périmètre demandé.

## Conformités prouvées
Sont prouvés sur le scope `TPL-06` :
- ajout réel de la route `PATCH /api/templates/[id]` ;
- fichier code concerné : `app/api/templates/[id]/route.ts` ;
- authentification obligatoire via session ;
- borne multi-tenant stricte via `session.user.companyId` ;
- refus d’un `companyId` client ;
- gouvernance d’accès cohérente : `ADMIN` / `GERANT`, sinon `TEMPLATES_MANAGE` ;
- absence d’ouverture support global ;
- validation minimale cohérente des champs réellement présents ;
- gestion cohérente des erreurs `INVALID_JSON`, `VALIDATION_ERROR`, `NOT_FOUND` et conflit d’unicité ;
- respect du format de réponse projet.

## Non-conformité prouvée
Aucune non-conformité n’est prouvée sur le périmètre strict de `TPL-06`.

## Validations réellement prouvées
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
- présence de la route `/api/templates/[id]` dans la sortie de build : prouvée

## Verdict strict
**SESSION TPL-06 CONFORME**
