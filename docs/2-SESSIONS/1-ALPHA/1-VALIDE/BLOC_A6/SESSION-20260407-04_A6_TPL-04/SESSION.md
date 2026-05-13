# SESSION

Projet : Investissement
Sous-projet : Ambulance Manager
Session : SESSION-20260407-04_A6_TPL-04
Bloc : A6 — Shift templates
Type : COMPLÉTION
Version cible : 1-ALPHA

## Objectif unique
Livrer une API réelle de liste des templates, strictement bornée à la société courante, sans rouvrir `TPL-01` à `TPL-03` ni anticiper `TPL-05+`.

## Périmètre exact traité
- `app/api/templates/route.ts`
- `lib/permissions.ts`
- documents maîtres, protocole, sources autorisées, structure docs, template d’ouverture

## Résultat synthétique de session
La session ajoute une route `GET /api/templates` :
- authentifiée via session ;
- bornée au `companyId` courant ;
- gouvernée par accès natif `ADMIN` / `GERANT` ou permission runtime `TEMPLATES_MANAGE` ;
- limitée aux champs templates déjà présents ;
- sans exposition inutile de `companyId` ;
- avec ordre stable `name asc`, puis `id asc`.

Un helper runtime minimal `canManageTemplates(...)` est ajouté dans `lib/permissions.ts` pour brancher proprement `TEMPLATES_MANAGE` sans élargir le scope.

Aucune logique create / update / archive / UI templates n’a été introduite.

## Validations réellement prouvées localement
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
- `/api/templates` apparaît bien dans le build

## Dossiers liés
- Session : `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-04_A6_TPL-04`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-04_A6_TPL-04`
