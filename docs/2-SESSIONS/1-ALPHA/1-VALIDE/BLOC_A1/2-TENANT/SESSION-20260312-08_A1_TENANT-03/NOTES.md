# NOTES

## Rappel méthodologique

Cette session est une session de **CORRECTION**.

Elle ne doit :
- corriger que les défauts UI multi-tenant réellement prouvés ;
- ne pas ouvrir de refonte ;
- ne pas traiter d’autres sujets ;
- ne pas modifier une UI déjà conforme sans nécessité prouvée.

Règle appliquée :
`CODE > DOCUMENTATION`

## Base de travail retenue

La vérification a été menée à partir :
- du constat formalisé par `TENANT-01` sur la UI planning ;
- du résultat `conforme` de `TENANT-02` sur les routes/API ;
- du code réel des pages et composants ciblés : `/vehicles`, `/users`, `/planning`, `/dashboard`.

## Défaut réellement retenu

Le défaut retenu n’est pas une fuite inter-tenant prouvée sur l’ensemble de la UI.

Le point réellement défendable dans le périmètre est plus précis :
- `app/planning/page.tsx` ne portait aucune garde serveur explicite sur `session.user.companyId` ;
- la page reposait surtout sur `proxy.ts` puis sur les APIs planning pour empêcher l’accès effectif ;
- cela correspond exactement au caractère « plus indirect » déjà retenu par `TENANT-01` sur la UI planning.

## Zones inspectées mais non modifiées

### `app/vehicles/page.tsx`
Déjà conforme sur le périmètre UI inspecté :
- session relue côté serveur ;
- contrôle rôle ;
- contrôle `companyId` ;
- chargement des données déjà borné par tenant.

### `app/users/page.tsx`
Déjà conforme sur le périmètre UI inspecté :
- session relue côté serveur ;
- contrôle rôle ;
- contrôle `companyId` ;
- client reset alimenté par une API déjà bornée par tenant.

### `app/dashboard/page.tsx`
Inspecté mais non modifié :
- aucune exposition inter-tenant de données métier n’y est prouvée ;
- aucun flux de lecture d’un autre tenant n’y a été identifié ;
- aucune correction minimale strictement `TENANT-03` n’y a été prouvée nécessaire.

### `app/planning/planning-client.tsx`
Inspecté mais non modifié :
- les lectures de données passent par des APIs planning déjà bornées à `companyId` ;
- l’édition fine des shifts est déjà conditionnée par `canAdminSave(role)` ;
- aucune correction minimale supplémentaire strictement liée au cloisonnement tenant n’a été prouvée ici sans ouvrir un sujet permissions/RBAC plus large.

## Principe de correction retenu

Le correctif appliqué est volontairement minimal :
- aucune abstraction nouvelle ;
- aucune refonte ;
- aucun changement produit non nécessaire ;
- ajout uniquement d’une garde serveur explicite sur la page `/planning` pour aligner cette UI sur le niveau de cloisonnement déjà présent sur `/vehicles` et `/users`.

## Vérifications techniques réellement exécutées

### Patch
Commande rejouée sur une copie propre du dépôt avant application dans le dépôt cible :

```bash
git apply --check docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-08_A1_TENANT-03/PATCH__SESSION-20260312-08_A1_TENANT-03.diff
```

Résultat :
- OK

### Lint / build
Commandes validées sur le dépôt cible :

```bash
npm run lint
npm run build
```

Résultats réellement prouvés :
- `npm run lint` : OK
- `npm run build` : OK

Conclusion :
- la validation technique finale est désormais prouvée ;
- la documentation finale doit refléter cet état réel sans rouvrir l’analyse de fond.
