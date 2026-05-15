# Checklist exécution lots sessions — Ambulance Manager

## Rôle du document

Ce document convertit la simulation REBASAGE-13 en checklist opérationnelle de décision.
Il prépare les actions futures lot par lot, sans exécuter de déplacement, suppression, renommage ni archivage réel.

## Rappel important

- Checklist uniquement.
- Aucune action physique effectuée.
- Aucun déplacement.
- Aucune suppression.
- Aucun archivage réel.
- Validation Nathan obligatoire avant toute action future.

## Synthèse des lots

| Lot | Contenu | Objectif | Statut simulé | Priorité | Validation Nathan requise |
|---|---|---|---|---|---|
| Lot A | `BLOC_A26`, `BLOC_DOCS`, `CLOTURE-ALPHA`, `SESSION-YYYYMMDD-XX` | Conserver actif | À CONSERVER ACTIF / OPÉRATIONNEL RÉCENT | Haute | Oui |
| Lot B | `1-ALPHA/1-VALIDE` (hors zones actives) | Historique à indexer | HISTORIQUE À INDEXER | Haute | Oui |
| Lot C | `2-TEST-ALPHA` | Test à isoler | TEST À ISOLER | Moyenne | Oui |
| Lot D | Patchs historiques volumineux (`1-VALIDE`) | Archive à préparer | ARCHIVE À PRÉPARER | Moyenne | Oui |
| Lot E | `2-BETA`, `3-VERSION_OFFICIELLE` | Placeholders à conserver | PLACEHOLDER À CONSERVER | Faible | Oui |
| Lot F | Zones ambiguës / chemins anciens | Arbitrage avant action | À CONFIRMER | Haute | Oui |

## Checklist par lot

| Lot | Prérequis | Preuves nécessaires | Critères GO | Critères NO-GO | Risques | Garde-fous | Statut recommandé |
|---|---|---|---|---|---|---|---|
| Lot A | Vérifier usage actif actuel | Chemins exacts + preuves de consultation récente + impact action/non-action | GO si zones encore utiles, sans conflit master | NO-GO si dépendance active non clarifiée | Déplacer trop tôt A26/BLOC_DOCS/CLOTURE | Interdire mouvement sans validation spécifique Nathan | Maintien actif |
| Lot B | Bloc clôturé + index partiel disponible | Inventaire par bloc + liens de clôture + preuve master prioritaire | GO si traçabilité conservée via index renforcé | NO-GO si perte de lisibilité des preuves | Historique noyé ou mal regroupé | Travailler par sous-blocs, jamais en masse | Historique à indexer |
| Lot C | Identifier clairement contenu test | Liste sessions test + justification non normative | GO si séparation documentaire claire test/production | NO-GO si un test est encore utilisé comme référence produit | Confusion test -> production | Marquage explicite "TEST" avant toute action | Test à isoler |
| Lot D | Disposer d'un index de preuves patch | Mapping patch -> session -> preuve + impact archivage | GO si patchs peu consultés et preuves indexées | NO-GO si patch requis en lecture opérationnelle actuelle | Perte de preuve technique | Préparer lot dédié, zéro suppression | Archive à préparer |
| Lot E | Vérifier rôle placeholder inchangé | Preuve `.gitkeep` + absence d'usage actif | GO si aucun usage opérationnel | NO-GO si changement de stratégie versioning | Supprimer structure attendue | Conserver en l'état sans action | Placeholders à conserver |
| Lot F | Lister toutes ambiguïtés restantes | Preuves d'incohérence (chemins, conventions, doublons) + options d'arbitrage | GO si arbitrage Nathan explicite | NO-GO si incertitude documentaire persistante | Décision prématurée | Ne rien déplacer avant arbitrage écrit | À confirmer |

## Grille GO / NO-GO générale

| Critère | GO si | NO-GO si | Preuve attendue | Validation Nathan requise |
|---|---|---|---|---|
| Périmètre clair | Chemins exacts listés | Chemins incomplets/ambigus | Tableau de périmètre | Oui |
| Preuves complètes | Justification + impacts + sources | Preuve manquante | Dossier de preuves documentaires | Oui |
| Priorité master respectée | Aucune contradiction avec `docs/1-MASTER` | Session historique contredit master | Référence croisée master/sessions | Oui |
| Dépendances actives vérifiées | Aucune source active cassée | Dépendance active non clarifiée | Check dépendances | Oui |
| Réversibilité documentée | Retour arrière possible/documenté | Action irréversible non cadrée | Procédure de rollback documentaire | Oui |
| Traçabilité conservée | Index/pointage des preuves maintenu | Perte de localisation des preuves | Mapping avant/après simulé | Oui |
| Validation explicite | Accord Nathan explicite | Accord absent | Confirmation écrite Nathan | Oui |
| Référence de contrôle disponible | ZIP/version de référence disponible | Référence absente | Trace de version de contrôle | Oui |

## Preuves minimales avant action future

- Chemin exact concerné.
- Justification de l'action proposée.
- Statut actuel.
- Statut cible proposé.
- Impact si action.
- Impact si non-action.
- Documents sources consultés.
- Preuve explicite que `docs/1-MASTER` reste prioritaire.
- Preuve qu'aucune source active ne dépend du chemin à déplacer.
- Confirmation Nathan explicite avant exécution.

## Garde-fous d’exécution

- Toujours travailler lot par lot.
- Ne jamais exécuter plusieurs lots simultanément sans validation Nathan.
- Toujours produire un diff ou une liste de mouvements avant exécution.
- Toujours valider sur ZIP versionné de référence.
- Ne jamais supprimer physiquement sans étape d'archive validée.
- Ne jamais déplacer `BLOC_A26`, `BLOC_DOCS`, `CLOTURE-ALPHA` sans décision spécifique.
- Ne jamais traiter les tests comme production.
- Conserver les placeholders `2-BETA` / `3-VERSION_OFFICIELLE` sauf décision contraire.

## Ordre recommandé futur

1. Lot A (stabilisation des zones actives).
2. Lot F (arbitrage ambiguïtés critiques).
3. Lot B (indexation historique structurée).
4. Lot C (isolement logique test).
5. Lot D (préparation archive patchs historiques).
6. Lot E (maintien placeholders).

## Points à confirmer

- Seuil exact pour "non utilisé depuis X sessions" : INFORMATION NON FOURNIE — À CONFIRMER.
- Format minimum du dossier de preuve avant GO : INFORMATION NON FOURNIE — À CONFIRMER.
- Niveau de granularité attendu pour lot B (bloc/sous-bloc/session) : INFORMATION NON FOURNIE — À CONFIRMER.

## Prochaine étape recommandée

REBASAGE-15 : préparer un dossier de validation Nathan par lot (sans action physique), avec check GO/NO-GO pré-remplis et demandes de décision explicites.
