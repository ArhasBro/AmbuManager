# SESSION

Projet : Investissement
Sous-projet : Ambulance Manager
Session : SESSION-20260407-05_A6_TPL-05
Bloc : A6 — Shift templates
Type : COMPLÉTION
Version cible : 1-ALPHA

## Objectif unique
Livrer une API réelle de création template, strictement bornée à la société courante, sans rouvrir `TPL-04` ni anticiper `TPL-06+`.

## Périmètre exact traité
- `app/api/templates/route.ts`
- documents maîtres, protocole, sources autorisées, structure docs, template d’ouverture

## Résultat synthétique de session
La session ajoute une route `POST /api/templates` sur la route templates existante, sans casser la liste `GET` déjà présente.

La création livrée est :
- authentifiée via session ;
- bornée au `companyId` courant ;
- gouvernée par accès natif `ADMIN` / `GERANT` ou permission runtime `TEMPLATES_MANAGE` déjà branchée ;
- limitée aux champs réellement présents sur `ShiftTemplate` ;
- protégée contre tout `companyId` client ;
- validée côté body JSON avec refus `INVALID_JSON` et `VALIDATION_ERROR` ;
- protégée contre le conflit d’unicité `companyId + name`.

Aucun champ métier hors scope n’a été ajouté. Aucun endpoint update / archive / UI templates n’a été introduit.

## Validations réellement prouvées localement
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Dossiers liés
- Session : `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-05_A6_TPL-05`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-05_A6_TPL-05`
