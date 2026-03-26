# SESSION

## ID SESSION

SESSION-20260322-08_A4_VEH-08

## Date

22/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A4  
Type : COMPLÉTION  
Intitulé : API désactivation / archivage véhicule

## Objectif de la session

Ajouter l’API réelle de désactivation / archivage logique d’un véhicule, minimale et traçable, sur le périmètre `07.4 Désactivation / archivage d’un véhicule`, sans rouvrir l’UI, sans toucher à Prisma, et sans refondre le module véhicules.

## Périmètre exact traité

### Code modifié
- `app/api/vehicles/[id]/archive/route.ts`
- `lib/services/vehicles/archive-vehicle.ts`
- `app/api/vehicles/route.ts`
- `app/vehicles/page.tsx`

### Code lu seulement pour borne de preuve / alignement
- `app/api/vehicles/[id]/route.ts`
- `lib/validators/vehicle.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/services/audit/support-action-trace.ts`
- `prisma/schema.prisma`

### Documentation lue pour cadrage
- `docs/1-master/*`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-06_A4_VEH-06/*`
- `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-07_A4_VEH-07/*`

## Résultat synthétique de session

Le socle API d’archivage logique véhicule a été ajouté de manière minimale et traçable.

Ajouts réellement réalisés :
- nouvel endpoint `POST /api/vehicles/[id]/archive` ;
- validation stricte de l’identifiant véhicule ;
- contrôle d’accès cohérent avec le module via `canManageVehicles(...)` ;
- archivage logique via le champ existant `Vehicle.isActive` ;
- comportement idempotent : un véhicule déjà archivé est retourné tel quel sans réactivation ;
- retour homogène au format API projet avec dates sérialisées ;
- traçabilité support alignée sur le pattern existant ;
- alignement du flux standard de listing pour ne plus remonter les véhicules archivés après rafraîchissement.

## Validations finales retenues

Commandes reproductibles attendues depuis la racine projet :

```bash
git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-08_A4_VEH-08\\PATCH__SESSION-20260322-08_A4_VEH-08.diff"
git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-08_A4_VEH-08\\PATCH__SESSION-20260322-08_A4_VEH-08.diff"
npm run lint
npm run build
```

Résultats réels finaux retenus pour la documentation finale :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-08_A4_VEH-08`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-08_A4_VEH-08`
