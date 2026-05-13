# NOTES

## Méthode de clôture

Cette phase est une **clôture documentaire uniquement**.
Aucun fichier code, Prisma, migration, service, route API ou UI n’a été rouvert pendant cette étape.

## Rappel du déroulé réel

### 1. Patch principal
Le patch principal `BASE-07.diff` a introduit le rattachement minimal `Vehicle -> Depot`.

### 2. Incident détecté après application
Le build a révélé un point bloquant TypeScript dans :
- `app/vehicles/vehicles-client.tsx`

Erreur constatée :
- `'v.depot' is possibly 'null'`

### 3. Correctif minimal retenu
Le correctif `PATCH__SESSION-20260316-08_A2_BASE-07_FIX-01.diff` a été produit séparément.

Le choix retenu a été volontairement minimal :
- expliciter le guard nullable côté TypeScript ;
- ne pas modifier le comportement fonctionnel ;
- ne pas rouvrir le modèle Prisma ;
- ne pas rouvrir la route métier ;
- ne pas régénérer le patch principal.

### 4. Validation finale réelle
Après application du patch principal puis du fix minimal :
- `npx prisma validate` passe ;
- `npx prisma generate` passe ;
- `npm run lint` passe ;
- `npm run build` passe.

## Lecture produit de BASE-07

BASE-07 livre un rattachement simple et exploitable :
- un véhicule peut rester sans base ;
- un véhicule peut être affecté à une seule base ;
- la base doit appartenir à la société courante ;
- l’autorisation reste alignée sur la gestion véhicules déjà existante.

## Choix de bornage conservés

Restent explicitement hors périmètre :
- tout lien `User ↔ Depot` ;
- tout lien `Shift ↔ Depot` ;
- tout lien `Template ↔ Depot` ;
- tout mécanisme multi-base ;
- tout historique d’affectation ;
- toute réactivation de dépôt ;
- toute refonte large du module véhicules.

## Résultat de clôture

La documentation finale doit donc refléter un état réel simple :
- patch principal nécessaire ;
- fix minimal nécessaire ;
- validation finale obtenue seulement après `FIX-01` ;
- session code finalement validée.
