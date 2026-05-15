# Dossier de décision lots sessions — Ambulance Manager

## Rôle du document

Ce document fournit à Nathan un dossier de décision prêt à valider pour les lots A→F.
Il consolide les éléments de simulation (REBASAGE-13) et de checklist (REBASAGE-14) sans exécuter d'action physique.

## Rappel important

- Dossier de décision uniquement.
- Aucune action physique effectuée.
- Aucun déplacement.
- Aucune suppression.
- Aucun renommage.
- Aucun archivage réel.
- Validation Nathan obligatoire avant toute action future.

## Synthèse des lots A→F

| Lot | Contenu | Statut actuel | Statut cible proposé | Décision attendue | Verdict proposé |
|---|---|---|---|---|---|
| Lot A | `BLOC_A26`, `BLOC_DOCS`, `CLOTURE-ALPHA`, `SESSION-YYYYMMDD-XX` | OPÉRATIONNEL RÉCENT / ACTIF | À CONSERVER ACTIF | VALIDÉ: GO / NO-GO / À CONFIRMER | GO |
| Lot B | `1-ALPHA/1-VALIDE` (A1→A25) | HISTORIQUE VALIDÉ PRINCIPAL | HISTORIQUE À INDEXER (préparation contrôlée) | VALIDÉ: GO / NO-GO / À CONFIRMER | GO |
| Lot C | `2-TEST-ALPHA` | TEST | TEST À ISOLER | VALIDÉ: GO / NO-GO / À CONFIRMER | GO |
| Lot D | Patchs historiques volumineux de `1-VALIDE` | HISTORIQUE TECHNIQUE | ARCHIVE À PRÉPARER (sans exécution) | VALIDÉ: GO / NO-GO / À CONFIRMER | À CONFIRMER |
| Lot E | `2-BETA`, `3-VERSION_OFFICIELLE` | PLACEHOLDER | PLACEHOLDER À CONSERVER | VALIDÉ: GO / NO-GO / À CONFIRMER | GO |
| Lot F | Chemins/conventions anciennes, ambiguïtés, doublons potentiels | À CONFIRMER | À CONFIRMER (arbitrage préalable) | VALIDÉ: GO / NO-GO / À CONFIRMER | À CONFIRMER |

## Fiches de décision par lot

### Lot A — Conserver actif

- Périmètre : `docs/2-SESSIONS/1-ALPHA/BLOC_A26`, `docs/2-SESSIONS/1-ALPHA/BLOC_DOCS`, `docs/2-SESSIONS/1-ALPHA/CLOTURE-ALPHA`, `docs/2-SESSIONS/SESSION-YYYYMMDD-XX`.
- Objectif : maintenir les repères actifs récents et le template de session.
- Action future possible : conserver visible/prioritaire dans les index.
- Action interdite maintenant : déplacement/archivage de ces zones.
- Preuves nécessaires : usage récent, dépendances de consultation, absence de conflit avec master.
- Critères GO : utilité opérationnelle confirmée, aucune contradiction master.
- Critères NO-GO : dépendance active non clarifiée, risque de perte de contexte.
- Risques : déplacer trop tôt A26/BLOC_DOCS/CLOTURE-ALPHA.
- Garde-fous : décision spécifique Nathan obligatoire pour toute action sur ces zones.
- Décision Nathan attendue : `VALIDÉ : GO LOT A` ou `VALIDÉ : NO-GO LOT A`.
- Verdict proposé : GO.

### Lot B — Historique validé A1→A25 à indexer

- Périmètre : `docs/2-SESSIONS/1-ALPHA/1-VALIDE` (BLOC_A1 à BLOC_A25, structures internes variables).
- Objectif : préparer une indexation/clarification par bloc sans archivage brutal.
- Action future possible : indexation contrôlée, regroupement documentaire logique (sans déplacement initial).
- Action interdite maintenant : archivage massif ou déplacement global de `1-VALIDE`.
- Preuves nécessaires : cartographie bloc par bloc, clôtures disponibles, impact sur traçabilité.
- Critères GO : traçabilité maintenue, découpage par sous-lots clair.
- Critères NO-GO : risque de perte de preuves historiques ou de lecture.
- Risques : dégrader l'historique validé principal Alpha.
- Garde-fous : traitement progressif par blocs, jamais en opération massive.
- Décision Nathan attendue : `VALIDÉ : GO LOT B` ou `VALIDÉ : NO-GO LOT B`.
- Verdict proposé : GO.

### Lot C — Test à isoler

- Périmètre : `docs/2-SESSIONS/2-TEST-ALPHA`.
- Objectif : séparer clairement le test du flux production.
- Action future possible : marquage documentaire explicite test/non normatif.
- Action interdite maintenant : assimilation des tests comme référence produit.
- Preuves nécessaires : inventaire test, justification du statut non normatif.
- Critères GO : séparation documentaire compréhensible et non destructive.
- Critères NO-GO : dépendance production détectée sur ces sessions test.
- Risques : confusion Codex entre test et production.
- Garde-fous : conserver traçabilité test, ne rien supprimer.
- Décision Nathan attendue : `VALIDÉ : GO LOT C` ou `VALIDÉ : NO-GO LOT C`.
- Verdict proposé : GO.

### Lot D — Archives à préparer (patchs historiques)

- Périmètre : dossiers patchs historiques volumineux de `1-VALIDE`.
- Objectif : préparer un futur archivage contrôlé, avec index de correspondance.
- Action future possible : simulation détaillée de lot d'archive + mapping patch -> session -> preuve.
- Action interdite maintenant : suppression ou déplacement sans index de preuves.
- Preuves nécessaires : fréquence d'usage, criticité de preuve, cartographie complète.
- Critères GO : preuve qu'aucun patch critique n'est perdu, réversibilité documentée.
- Critères NO-GO : preuve incomplète, dépendance active non clarifiée.
- Risques : perte de preuves techniques ou rupture de lecture historique.
- Garde-fous : lot dédié, zéro suppression, validation Nathan explicite.
- Décision Nathan attendue : `VALIDÉ : GO LOT D` ou `VALIDÉ : NO-GO LOT D`.
- Verdict proposé : À CONFIRMER.

### Lot E — Placeholders à conserver

- Périmètre : `docs/2-SESSIONS/2-BETA`, `docs/2-SESSIONS/3-VERSION_OFFICIELLE`.
- Objectif : conserver la structure de réservation.
- Action future possible : maintien en l'état.
- Action interdite maintenant : suppression/renommage des placeholders.
- Preuves nécessaires : absence d'usage opérationnel, rôle de réservation confirmé.
- Critères GO : placeholders utiles pour structure cible.
- Critères NO-GO : changement stratégique documenté contraire.
- Risques : casser la lisibilité roadmap stages.
- Garde-fous : aucune action physique par défaut.
- Décision Nathan attendue : `VALIDÉ : GO LOT E` ou `VALIDÉ : NO-GO LOT E`.
- Verdict proposé : GO.

### Lot F — Zones à confirmer

- Périmètre : conventions anciennes, mentions `docs/2-sessions`, doublons potentiels, zones ambiguës.
- Objectif : arbitrer avant toute action de nettoyage.
- Action future possible : table d'arbitrage Nathan par cas.
- Action interdite maintenant : correction massive rétroactive de l'historique.
- Preuves nécessaires : liste précise des ambiguïtés + impact de chaque option.
- Critères GO : arbitrage explicite Nathan sur chaque ambiguïté.
- Critères NO-GO : ambiguïtés non qualifiées ou contradictoires.
- Risques : décisions prématurées et incohérences de gouvernance.
- Garde-fous : aucun déplacement/suppression avant arbitrage écrit.
- Décision Nathan attendue : `VALIDÉ : GO LOT F` ou `VALIDÉ : NO-GO LOT F`.
- Verdict proposé : À CONFIRMER.

## Décisions Nathan à obtenir avant action future

| Lot | Décision demandée | Impact | Validation minimale requise | Action interdite sans validation |
|---|---|---|---|---|
| A | GO / NO-GO maintien actif | Conserve ou modifie zone active récente | Accord explicite Nathan | Déplacer A26/BLOC_DOCS/CLOTURE |
| B | GO / NO-GO indexation A1→A25 | Conditionne lisibilité historique majeur | Accord explicite + méthode par bloc | Archivage brutal de `1-VALIDE` |
| C | GO / NO-GO isolement test | Réduit confusion test/production | Accord explicite Nathan | Reclasser test comme production |
| D | GO / NO-GO préparation archive patchs | Impacte traçabilité technique historique | Accord explicite + index de correspondance | Déplacer/supprimer patchs historiques |
| E | GO / NO-GO maintien placeholders | Préserve structure stages future | Accord explicite Nathan | Supprimer/renommer placeholders |
| F | GO / NO-GO arbitrage ambiguïtés | Débloque nettoyage futur fiable | Accord explicite par ambiguïté | Correction massive de conventions anciennes |

## Risques globaux

- Perdre des preuves utiles si lot D est engagé sans index de correspondance.
- Dégrader la lecture de l'historique validé A1→A25 en traitant lot B trop vite.
- Confondre test et production sans isolement clair du lot C.
- Casser des chemins documentaires historiques cités par des sessions récentes.
- Créer une gouvernance contradictoire si lot F n'est pas arbitré explicitement.

## Garde-fous généraux

- Toujours appliquer `docs/1-MASTER` comme autorité prioritaire.
- Travailler un lot à la fois.
- Exiger preuves complètes avant proposition GO exécutable.
- Produire un diff/liste des mouvements avant toute action future.
- Interdire toute suppression physique sans archive validée et traçable.
- Conserver `BLOC_A26`, `BLOC_DOCS`, `CLOTURE-ALPHA` tant qu'aucune décision spécifique n'est validée.

## Points à confirmer

- Seuil exact "non utilisé depuis X sessions" : INFORMATION NON FOURNIE — À CONFIRMER.
- Granularité attendue pour lot B (bloc, sous-bloc, session) : INFORMATION NON FOURNIE — À CONFIRMER.
- Niveau de preuve minimal pour engager lot D : INFORMATION NON FOURNIE — À CONFIRMER.

## Prochaine étape recommandée

REBASAGE-16 : produire un formulaire de validation Nathan prêt à signer (par lot et par décision GO/NO-GO/À CONFIRMER), sans exécution physique.
