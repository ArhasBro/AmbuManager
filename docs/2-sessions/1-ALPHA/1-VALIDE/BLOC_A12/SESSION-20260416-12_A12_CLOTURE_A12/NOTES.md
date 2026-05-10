# NOTES

## Méthode / observations

### Méthode appliquée
1. Relecture des documents maîtres et du protocole imposés à l’ouverture.
2. Relecture ciblée du cadrage produit sur `MODULE 15` et `MODULE 16`.
3. Relecture des sessions `A12-01`, `A12-LOT-02-15` et `A12-16`.
4. Relecture des patchs réels `PATCH__SESSION-20260416-10_A12_A12-LOT-02-15.diff`, `FIX-01`, `FIX-02`.
5. Revérification ciblée du code réel sur les axes onboarding, import, export, impression et permissions.
6. Relance des validations terminales réellement pertinentes dans l’environnement fourni.

### Observations structurantes
- `A12-01` reste cohérent comme photographie de départ : onboarding manuel partiel, imports absents, exports / impression absents, `PLANNING_EXPORT` non branchée.
- `A12-LOT-02-15` reste cohérent comme lot réel de correction / complétion : les fichiers annoncés sont bien présents dans le dépôt et leur comportement est réellement branché.
- `A12-16` reste cohérente comme validation avant clôture : aucun écart fonctionnel A12 nouveau n’est apparu lors de la présente clôture.
- La présente session ne révèle pas de correctif final minimal unique à produire : la clôture peut rester en `NO_PATCH`.

### Points revérifiés sur le code réel
- l’entrée dashboard vers `/onboarding` existe réellement ;
- la page `/onboarding` charge un état réel de complétude et expose un parcours manuel recommandé ;
- l’import prend en charge `depots`, `users`, `vehicles`, `templates`, `user-absences` ;
- les formats réellement supportés sont `CSV` et `XLSX` ;
- la preview d’import et le commit sont bien séparés ;
- la logique d’import est explicitement en ajout uniquement, sans synchronisation continue ni import destructeur ;
- les exports planning `PDF`, `XLSX`, `CSV` sont branchés sur le planning réellement consulté ;
- les boutons d’export sont bien masqués sans `canExportPlanning` ;
- la route API recontrôle `PLANNING_EXPORT` ;
- l’impression simple est réellement branchée à `window.print()` ;
- aucune persistance d’exports générés n’existe ; le point `15.4` reste ouvert produit mais non bloquant en ALPHA.

### Observations sur la conservation des exports (`15.4`)
Constat retenu :
- aucune table `Export*` ou historique dédié d’exports n’existe dans `prisma/schema.prisma` ;
- aucun stockage serveur d’exports générés n’existe dans `app/api/planning/exports/route.ts` ;
- l’export est produit à la demande et servi avec `Cache-Control: no-store` ;
- le cadrage lui-même qualifie ce sujet comme `À CONFIRMER` et `non prioritaire en ALPHA`.

Conclusion méthodologique :
- le sujet n’est pas “traité” comme fonctionnalité complète de conservation ;
- en revanche, son absence n’empêche pas la clôture ALPHA du bloc A12 car le produit ne met pas en place de conservation serveur à ce stade.

### Observations sur les validations terminales
Relances exécutées dans la présente session :
- `npm run lint` → `KO` (`sh: 1: eslint: not found`)
- `npm run build` → `KO` (`sh: 1: next: not found`)

Interprétation retenue :
- l’environnement courant d’archive ne contient pas les exécutables attendus ;
- cela ne constitue pas, à lui seul, une preuve d’écart fonctionnel A12 ;
- les dernières validations positives prouvées du bloc restent celles documentées dans `A12-LOT-02-15` :
  - `git apply --check` : `OK`
  - `git apply` : `OK`
  - `npm run lint` : `OK`
  - `npm run build` : `OK`
