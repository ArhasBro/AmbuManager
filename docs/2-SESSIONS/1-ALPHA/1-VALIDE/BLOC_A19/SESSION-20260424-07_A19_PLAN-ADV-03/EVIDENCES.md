# EVIDENCES

## Sources documentaires relues
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/2-sessions/1-ALPHA/BLOC_A19/SESSION-20260424-05_A19_PLAN-ADV-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A19/SESSION-20260424-05_A19_PLAN-ADV-01/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A19/SESSION-20260424-06_A19_PLAN-ADV-LOT-02/RESULTATS.md`

## Code réellement contrôlé
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- présence listée des routes `app/api/planning/**` dans l'archive fournie

## Preuves code principales
Dans `app/planning/planning-client.tsx` :
- ligne constatée `type VisibilityMode = "GLOBAL" | "PERSONAL" | "BINOME"` ;
- présence de `selectedShiftIds` ;
- présence de `bulkAssignForm` ;
- présence de `visibleItems` filtrant les modes global / personnel / binôme ;
- présence de `toggleVisibleSelection` ;
- présence de `toggleDaySelection` ;
- présence de `applyBulkAssign` ;
- libellés UI constatés : `Selection multiple`, `Affecter la selection`, `Visibilite binome active`.

## Validations terminales
Commandes demandées :
- `npm run lint`
- `npm run build`

Constat réel dans l'environnement de traitement :
- l'archive complète n'a pas pu être extraite de manière stable dans la limite d'exécution disponible ;
- une extraction ciblée a permis de contrôler les fichiers nécessaires au périmètre ;
- `package.json` a bien été extrait et contient les scripts `lint` et `build` ;
- `node_modules` n'était pas disponible dans l'extraction ciblée ;
- les tentatives d'appel `npm run lint` / `npm run build` ont provoqué un blocage / timeout de l'environnement, sans sortie exploitable ;
- aucun résultat `OK` n'est donc revendiqué pour ces commandes dans cette production.

## Documentation A19 antérieure utilisée
`PLAN-ADV-01` indiquait les manques suivants : sélection multiple absente, vue binôme absente, affectation de masse non démontrée, cohérence globale/personnelle partielle.

`PLAN-ADV-LOT-02` indique que ces écarts ont été corrigés / complétés dans `app/planning/planning-client.tsx`, avec `npm run lint` et `npm run build` déclarés OK dans sa documentation de session.

## Limite factuelle
La présente validation ne remplace pas une validation terminale locale dans le dépôt complet Windows de référence.
