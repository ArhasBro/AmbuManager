# RESULTATS — SESSION-20260322-12_A4_VEH-12

## Résultat de session
VEH-12 conclut que l’affectation véhicule → planning existe réellement dans le dépôt, mais avec une couverture observable **partielle** sur le flux standard `/planning`.

## Résultat fonctionnel retenu
- le backend sait affecter un véhicule sur `DraftShift` et sur `Shift` via un endpoint unique ;
- le backend autorise également la modification et le retrait d’un véhicule (`vehicleId: null`) ;
- les garde-fous réels présents incluent : permission `PLANNING_EDIT`, bornage société, validation d’existence dans la société, conflits utilisateurs, conflits véhicules, absences et règle de repos minimum ;
- l’audit planning est réellement écrit lors d’une modification ;
- la page `/planning` permet bien d’affecter / modifier / retirer un véhicule sur les shifts **publiés affichés** ;
- la page standard ne prouve pas une édition manuelle directe des `DraftShift` ;
- la liste de travail visible reste centrée sur les `Shift` publiés d’un utilisateur ciblé ;
- le statut véhicule (`ACTIVE`, `MAINTENANCE`, `OUT_OF_SERVICE`) n’est pas utilisé comme garde-fou dans l’affectation contrôlée.

## Résiduels exacts à reporter vers VEH-13
- exposer ou clarifier une vraie surface d’édition manuelle véhicule sur `DraftShift` si c’est attendu dans le flux standard ;
- réaligner la source de liste véhicules avec les permissions d’édition planning, ou documenter explicitement la dépendance à `VEHICLES_MANAGE` ;
- empêcher ou au minimum signaler l’affectation d’un véhicule non disponible (`MAINTENANCE`, `OUT_OF_SERVICE`) ;
- réaligner les codes d’erreur UI avec les codes réellement renvoyés par l’API (`USER_OVERLAP_CONFLICT`, `VEHICLE_OVERLAP_CONFLICT`) ;
- clarifier le rôle du fichier `lib/validators/planning-assign.ts` ou l’aligner avec le body réellement accepté par la route.

## Résultat patch
- patch applicatif : NON ;
- mode retenu : `NO_PATCH` ;
- `PATCH__SESSION-20260322-12_A4_VEH-12.diff` : non produit ;
- `README_PATCH.md` : non applicable.

## Résultat technique retenu
- `npm run lint` : ÉCHEC d’environnement (`eslint: not found`) ;
- `npm run build` : ÉCHEC d’environnement (`next: not found`) ;
- validation patch : sans objet.

## Verdict de session
VEH-12 est clôturée en `NO_PATCH` avec verdict **PARTIELLEMENT CONFORME SUR LE PÉRIMÈTRE CONTRÔLÉ** : le noyau backend d’affectation véhicule → planning est réel et cohérent, mais l’exposition UI standard et certains garde-fous restent incomplets pour considérer la couverture pleinement aboutie.
