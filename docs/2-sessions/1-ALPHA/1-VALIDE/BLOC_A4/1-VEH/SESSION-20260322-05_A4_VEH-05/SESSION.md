# SESSION

## ID SESSION

SESSION-20260322-05_A4_VEH-05

## Date

22/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A4  
Type : CORRECTION  
Intitulé : Correction de la création véhicule si nécessaire

## Objectif de la session

Corriger uniquement les deux résiduels prouvés par `VEH-04` sur la création véhicule existante, sans élargir le module flotte :
- rétablir la saisie réelle du `statut` dans le flux UI -> validation -> API -> persistance ;
- réaligner l’exposition UI du formulaire de création avec le droit réel de création déjà présent côté `POST /api/vehicles`, réservé à `ADMIN`.

## Périmètre exact traité

### Code modifié
- `app/api/vehicles/route.ts`
- `app/vehicles/add-vehicle-form.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/vehicles/page.tsx`
- `lib/validators/vehicle.ts`

### Code lu seulement pour borne de preuve
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `prisma/schema.prisma`

### Documentation lue pour cadrage
- `docs/1-master/*`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-04_A4_VEH-04/*`

## Résultat synthétique de session

Le résiduel `VEH-04` a été corrigé de manière minimale et traçable.

Correctifs réellement appliqués :
- le schéma de validation de création exige désormais `immatriculation`, `type` et `status` ;
- le `POST /api/vehicles` persiste désormais le `status` réellement reçu, sans le forcer à `ACTIVE` ;
- le formulaire de création véhicule expose désormais un sélecteur de `status` ;
- le flux de création existant conserve la mise à jour immédiate de la liste après succès ;
- la page `/vehicles` n’expose désormais le formulaire de création qu’au profil `ADMIN`, tout en conservant l’accès de consultation / gestion déjà existant pour les autres profils autorisés au module.

## Validations finales retenues

```bash
git apply --check ".\docs\3-patches\1-ALPHA\BLOC_A4\1-VEH\SESSION-20260322-05_A4_VEH-05\PATCH__SESSION-20260322-05_A4_VEH-05.diff"
git apply ".\docs\3-patches\1-ALPHA\BLOC_A4\1-VEH\SESSION-20260322-05_A4_VEH-05\PATCH__SESSION-20260322-05_A4_VEH-05.diff"
npm run lint
npm run build
```

Résultats réels à consigner :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-05_A4_VEH-05`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-05_A4_VEH-05`
