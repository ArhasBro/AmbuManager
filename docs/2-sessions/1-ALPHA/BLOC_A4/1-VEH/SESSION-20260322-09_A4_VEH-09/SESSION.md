# SESSION

## ID SESSION

SESSION-20260322-09_A4_VEH-09

## Date

22/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A4  
Type : COMPLÉTION  
Intitulé : UI désactivation / archivage véhicule

## Objectif de la session

Ajouter l’UI réelle de désactivation / archivage logique d’un véhicule, minimale et traçable, sur le périmètre `07.4 Désactivation / archivage d’un véhicule`, en s’appuyant sur l’API existante de `VEH-08`, sans rouvrir le backend, sans toucher à Prisma et sans refondre le module véhicules.

## Périmètre exact traité

### Code modifié
- `app/vehicles/vehicles-client.tsx`

### Code lu seulement pour borne de preuve / alignement
- `app/vehicles/page.tsx`
- `app/api/vehicles/[id]/archive/route.ts`
- `lib/services/vehicles/archive-vehicle.ts`
- `app/api/vehicles/route.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`

### Documentation lue pour cadrage
- `docs/1-master/*`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-08_A4_VEH-08/*`

## Résultat synthétique de session

L’UI réelle d’archivage logique véhicule a été ajoutée dans la liste existante, sans refonte du module.

Ajouts réellement réalisés :
- action explicite `Archiver` sur chaque véhicule actif affiché ;
- confirmation utilisateur avant archivage ;
- appel réel `POST /api/vehicles/[id]/archive` ;
- gestion d’un état de chargement ciblé par véhicule pendant l’archivage ;
- retrait immédiat du véhicule archivé de la liste active affichée après succès ;
- nettoyage de l’état local associé (`selectedDepotIds`) ;
- fermeture de l’édition locale si le véhicule archivé était en cours d’édition ;
- affichage d’un message de succès ou d’erreur cohérent avec le style existant ;
- coexistence conservée avec les actions déjà présentes, sans réouverture de la suppression définitive.

## Validations finales retenues

Commandes terminales réelles consignées :

```bash
git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-09_A4_VEH-09\\PATCH__SESSION-20260322-09_A4_VEH-09.diff"
git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-09_A4_VEH-09\\PATCH__SESSION-20260322-09_A4_VEH-09.diff"
npm run lint
npm run build
```

Résultats réels finaux retenus pour la documentation finale :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-09_A4_VEH-09`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-09_A4_VEH-09`
