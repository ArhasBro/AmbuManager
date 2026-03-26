# NOTES — SESSION-20260322-18_A4_CLOTURE-A4

## 1. Méthode retenue
1. Relire les documents maîtres, le protocole et les templates de clôture.
2. Contrôler la chaîne documentaire `VEH-01` à `VEH-17` côté sessions et patchs réels.
3. Revalider dans le code actuel les points du cadrage `07.1` à `07.10` réellement touchés par le bloc `A4`.
4. Rejouer les validations terminales réellement possibles sur le ZIP contrôlé.
5. Statuer sans rouvrir `VEH-01` à `VEH-17` comme nouvelles sessions séparées.

## 2. Lecture consolidée du bloc A4
Les livraisons antérieures du bloc `A4` sont cohérentes sur le socle principal attendu :
- `VEH-03` a stabilisé le listing ;
- `VEH-05` a réaligné la création ;
- `VEH-06` et `VEH-07` ont ajouté l’édition API/UI ;
- `VEH-08` et `VEH-09` ont apporté l’archivage logique ;
- `VEH-11` a confirmé le rattachement véhicule → base ;
- `VEH-13` a remis à niveau l’affectation planning ;
- `VEH-14` à `VEH-16` ont ajouté la conformité documentaire minimale puis son état visuel simple.

## 3. Résiduels confirmés en clôture
### 3.1 Suppression physique encore exposée (`07.5`)
Le dépôt actuel expose toujours une suppression physique standard via `DELETE /api/vehicles?id=...`, et l’UI `/vehicles` affiche encore l’action `Supprimer`.

Le garde-fou attendu par le cadrage — suppression définitive uniquement si le véhicule n’a jamais été utilisé — n’est pas prouvé dans le code contrôlé.

### 3.2 Statut véhicule encore partiel côté usage planning (`07.7`)
Le statut véhicule existe bien dans Prisma et dans les formulaires (`ACTIVE`, `MAINTENANCE`, `OUT_OF_SERVICE`), mais la chaîne d’affectation planning ne s’en sert pas réellement :
- l’API d’assignation vérifie l’appartenance société du véhicule, pas sa disponibilité métier ;
- les services `assignShift` / `assignDraftShift` gèrent les conflits temporels, pas l’indisponibilité statutaire ;
- l’UI planning charge et propose les véhicules sans signal utile sur le statut.

## 4. Pourquoi `NO_PATCH` est la bonne livraison
La règle de clôture autorise un **unique correctif final minimal** seulement si un résiduel unique subsiste.

Ce n’est pas le cas ici :
- `07.5` relève du cycle de vie/suppression véhicule ;
- `07.7` relève du comportement planning et de la signalisation métier.

Les absorber ensemble dans cette clôture reviendrait à rouvrir le bloc au lieu de simplement le clôturer. La bonne livraison est donc `NO_PATCH` avec verdict explicite de non-clôture définitive.

## 5. Validation terminale réellement retenue
Pour rendre les validations possibles sur le ZIP contrôlé, `npm ci` a été exécuté avec succès.

Constat terminal retenu :
- `npx prisma validate` : KO dans cet environnement (`EAI_AGAIN` sur téléchargement moteur Prisma)
- `npx prisma generate` : KO dans cet environnement (`EAI_AGAIN` sur téléchargement moteur Prisma)
- `npm run lint` : OK
- `npm run build` : KO sur le dépôt actuel, hors périmètre flotte direct, dans `app/api/company/rules/route.ts`

Ce constat technique n’inverse pas l’analyse de fond : le bloc `A4` est déjà non clôturable définitivement à cause des résiduels `07.5` et `07.7`.
