# SESSION

Projet : Investissement
Sous-projet : Ambulance Manager
Session : SESSION-20260401-06_A5_RULES-06
Bloc : A5 — Règles métier et paramètres société
Type : COMPLÉTION
Version cible : 1-ALPHA

## Objectif unique
Exposer une API paramètres métier ALPHA lisible au-dessus de la couche centrale existante validée en `RULES-05`, sans rejouer `RULES-05`, sans absorber `RULES-07`, `RULES-08` ni `RULES-09`, et sans élargissement abusif du moteur.

## Périmètre exact traité
### Code
- `app/api/company/rules/route.ts`
- `lib/company-rules/api.ts`
- `lib/company-rules/catalog.ts`
- `lib/company-rules/runtime.ts`
- `app/planning/planning-client.tsx`
- `app/planning/page.tsx`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`

### Documentation finale
- `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-06_A5_RULES-06/*`
- `docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-06_A5_RULES-06/README_PATCH.md`

## Résultat synthétique de session
Le scope `RULES-06` est validé au niveau code.

La session expose désormais une API paramètres métier ALPHA lisible au-dessus de la couche centrale introduite en `RULES-05`, tout en conservant :
- `CompanyRule` comme stockage réel ;
- `PLANNING_MIN_REST_HOURS` compatible avec le moteur réellement branché ;
- `PLANNING_VIEW_MODE` fonctionnel mais séparé du moteur comme réglage UI/exploitation ;
- l’absence de faux branchages moteur pour les règles non encore consommées.

La chaîne finale retenue pour la session est la suivante :
1. `PATCH__SESSION-20260401-06_A5_RULES-06.diff`
2. `PATCH__SESSION-20260401-06_A5_RULES-06_FIX-03.diff`
3. `PATCH__SESSION-20260401-06_A5_RULES-06_FIX-04.diff`

## Historique réel de validation retenu
### Patch principal
- `git apply --check` : OK
- `git apply` : OK

### Correctif retenu `FIX-03`
- `git apply --check` : OK
- `git apply` : OK

### Validation terminale finale sur repo équipé
- `npm run lint` : OK
- `npm run build` : OK

## Dossiers liés
- Session : `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-06_A5_RULES-06`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-06_A5_RULES-06`
