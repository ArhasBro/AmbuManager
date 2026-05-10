# SESSION

Projet : Investissement
Sous-projet : Ambulance Manager
Session : SESSION-20260401-07_A5_RULES-07
Bloc : A5 — Règles métier et paramètres société
Type : COMPLÉTION
Version cible : 1-ALPHA

## Objectif unique
Produire une UI paramètres métier ALPHA lisible au-dessus de l’API `company rules` validée en `RULES-06`, sans rejouer `RULES-05` / `RULES-06`, sans absorber `RULES-08` / `RULES-09`, et sans ajouter de nouveau moteur.

## Périmètre exact traité
### Code modifié
- `app/company/page.tsx`
- `app/company/company-rules-panel.tsx`

### Code contrôlé
- `app/company/company-profile-form.tsx`
- `app/api/company/rules/route.ts`
- `lib/company-rules/api.ts`
- `lib/company-rules/catalog.ts`
- `lib/company-rules/runtime.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`

### Documentation finale
- `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-07_A5_RULES-07/*`
- `docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-07_A5_RULES-07/README_PATCH.md`

## Résultat synthétique de session
Le scope `RULES-07` est validé au niveau code.

La page société expose désormais une UI paramètres métier ALPHA réellement lisible au-dessus de l’API existante, avec séparation explicite entre :
- règles métier ALPHA réellement branchées ;
- règles métier ALPHA préparées mais non éditables faute de stockage prouvé ;
- réglage UI / exploitation `PLANNING_VIEW_MODE` conservé hors moteur.

La complétion retenue :
- n’ajoute aucun nouveau moteur ;
- ne modifie pas les permissions existantes ;
- ne casse pas `PLANNING_MIN_REST_HOURS` ni `PLANNING_VIEW_MODE` ;
- ne réintroduit pas une UX brute clé/valeur comme seule interface.

La chaîne finale retenue pour la session est la suivante :
1. `PATCH__SESSION-20260401-07_A5_RULES-07.diff`

## Historique réel de validation retenu
### Patch principal
- `git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A5\\1-RULES\\SESSION-20260401-07_A5_RULES-07\\PATCH__SESSION-20260401-07_A5_RULES-07.diff"` : OK
- `git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A5\\1-RULES\\SESSION-20260401-07_A5_RULES-07\\PATCH__SESSION-20260401-07_A5_RULES-07.diff"` : OK

### Validation terminale finale sur repo équipé
- `npm run lint` : OK
- `npm run build` : OK

## Dossiers liés
- Session : `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-07_A5_RULES-07`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-07_A5_RULES-07`
