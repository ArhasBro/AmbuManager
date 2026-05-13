# SESSION

## ID SESSION

SESSION-20260322-06_A4_VEH-06

## Date

22/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A4  
Type : COMPLÉTION  
Intitulé : API modification véhicule

## Objectif de la session

Ajouter l’API réelle de modification véhicule, minimale et traçable, sur le périmètre `07.3 Édition d’un véhicule`, sans toucher à l’UI d’édition, sans ouvrir l’archivage, et sans intégrer `depotId` dans cette édition générale.

## Périmètre exact traité

### Code modifié
- `app/api/vehicles/[id]/route.ts`
- `lib/validators/vehicle.ts`

### Code lu seulement pour borne de preuve / alignement
- `app/api/vehicles/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/services/audit/support-action-trace.ts`
- `prisma/schema.prisma`

### Documentation lue pour cadrage
- `docs/1-master/*`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-05_A4_VEH-05/*`

## Résultat synthétique de session

Le socle API d’édition véhicule a été ajouté de manière minimale et traçable.

Ajouts réellement réalisés :
- nouvel endpoint `PATCH /api/vehicles/[id]` ;
- validation stricte d’un body partiel limité à `immatriculation`, `type`, `status` ;
- refus des corps vides via validation dédiée ;
- cloisonnement strict par `companyId` ;
- réponse homogène avec le reste du module (`ok`, `badRequest`, `forbidden`, `notFound`, `conflict`, `serverError`) ;
- exclusion explicite de `depotId` du périmètre d’édition générale ;
- traçabilité support cohérente avec le pattern existant quand un acteur support serait autorisé ultérieurement, sans élargir le scope actuel.

## Validations finales retenues

Commandes reproductibles attendues depuis la racine projet :

```bash
git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-06_A4_VEH-06\\PATCH__SESSION-20260322-06_A4_VEH-06.diff"
git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-06_A4_VEH-06\\PATCH__SESSION-20260322-06_A4_VEH-06.diff"
npm run lint
npm run build
```

Résultats réels à jour retenus pour la documentation finale :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-06_A4_VEH-06`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-06_A4_VEH-06`
