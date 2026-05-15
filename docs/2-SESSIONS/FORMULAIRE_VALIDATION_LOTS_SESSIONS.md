# Formulaire validation lots sessions — Ambulance Manager

## Rôle du document

Ce formulaire permet à Nathan de valider les lots A→F issus du rebasage documentaire.
Il sert à décider, pas à exécuter.

## Rappel important

- Formulaire uniquement.
- Aucune action physique effectuée.
- Aucun déplacement.
- Aucune suppression.
- Aucun renommage.
- Aucun archivage réel.
- Un GO ne déclenche pas une exécution automatique.
- Toute action future nécessitera une session dédiée.

## Mode d’emploi

1. Lire la ligne du lot dans la synthèse.
2. Ouvrir la fiche du lot correspondant.
3. Cocher un seul choix principal : GO / NO-GO / À CONFIRMER / DEMANDE DE PRÉCISION.
4. Compléter commentaire, blocage éventuel et note/date.
5. Valider la synthèse finale.

## Synthèse des lots A→F

| Lot | Contenu | Verdict proposé | Choix Nathan possibles | Décision Nathan retenue | Commentaire |
|---|---|---|---|---|---|
| Lot A | `BLOC_A26`, `BLOC_DOCS`, `CLOTURE-ALPHA`, `SESSION-YYYYMMDD-XX` | GO | GO / NO-GO / À CONFIRMER / DEMANDE DE PRÉCISION |  |  |
| Lot B | `docs/2-SESSIONS/1-ALPHA/1-VALIDE` (BLOC_A1→BLOC_A25, structures variables) | GO | GO / NO-GO / À CONFIRMER / DEMANDE DE PRÉCISION |  |  |
| Lot C | `docs/2-SESSIONS/2-TEST-ALPHA` | GO | GO / NO-GO / À CONFIRMER / DEMANDE DE PRÉCISION |  |  |
| Lot D | Patchs historiques volumineux de `1-VALIDE` | À CONFIRMER | GO / NO-GO / À CONFIRMER / DEMANDE DE PRÉCISION |  |  |
| Lot E | `docs/2-SESSIONS/2-BETA`, `docs/2-SESSIONS/3-VERSION_OFFICIELLE` | GO | GO / NO-GO / À CONFIRMER / DEMANDE DE PRÉCISION |  |  |
| Lot F | Chemins/conventions anciennes, `docs/2-sessions`, doublons potentiels, ambiguïtés | À CONFIRMER | GO / NO-GO / À CONFIRMER / DEMANDE DE PRÉCISION |  |  |

## Formulaire par lot

### Lot A — Conserver actif

- Périmètre : `BLOC_A26`, `BLOC_DOCS`, `CLOTURE-ALPHA`, `SESSION-YYYYMMDD-XX`
- Objectif : maintenir les zones actives et de référence récente.
- Verdict proposé : GO
- Choix Nathan :
  - [ ] VALIDÉ : GO LOT A
  - [ ] VALIDÉ : NO-GO LOT A
  - [ ] À CONFIRMER : LOT A
  - [ ] DEMANDE DE PRÉCISION : LOT A
- Décision Nathan retenue :
- Commentaire Nathan :
- Blocage éventuel :
- Prochaine action si GO : session dédiée de cadrage exécution Lot A (sans action immédiate dans ce formulaire).
- Prochaine action si NO-GO : maintien strict en l'état, réévaluation en fin de rebasage.
- Prochaine action si À CONFIRMER : compléter preuves d'usage actif et dépendances.
- Prochaine action si DEMANDE DE PRÉCISION : fournir note de précision ciblée sur zone concernée.

### Lot B — Historique validé A1→A25 à indexer

- Périmètre : `docs/2-SESSIONS/1-ALPHA/1-VALIDE` (BLOC_A1 à BLOC_A25, structures internes variables)
- Objectif : indexer/préparer proprement sans archivage brutal.
- Verdict proposé : GO
- Choix Nathan :
  - [ ] VALIDÉ : GO LOT B
  - [ ] VALIDÉ : NO-GO LOT B
  - [ ] À CONFIRMER : LOT B
  - [ ] DEMANDE DE PRÉCISION : LOT B
- Décision Nathan retenue :
- Commentaire Nathan :
- Blocage éventuel :
- Prochaine action si GO : session dédiée d'indexation progressive par bloc.
- Prochaine action si NO-GO : gel du lot B, conservation intégrale en l'état.
- Prochaine action si À CONFIRMER : préciser granularité attendue (bloc/sous-bloc/session).
- Prochaine action si DEMANDE DE PRÉCISION : produire une maquette d'index détaillé BLOC_A1→A25.

### Lot C — Test à isoler

- Périmètre : `docs/2-SESSIONS/2-TEST-ALPHA`
- Objectif : isoler logiquement les tests de la production.
- Verdict proposé : GO
- Choix Nathan :
  - [ ] VALIDÉ : GO LOT C
  - [ ] VALIDÉ : NO-GO LOT C
  - [ ] À CONFIRMER : LOT C
  - [ ] DEMANDE DE PRÉCISION : LOT C
- Décision Nathan retenue :
- Commentaire Nathan :
- Blocage éventuel :
- Prochaine action si GO : session dédiée de séparation documentaire test/production.
- Prochaine action si NO-GO : maintien du statut test inchangé sans action.
- Prochaine action si À CONFIRMER : vérifier dépendances éventuelles avec flux production.
- Prochaine action si DEMANDE DE PRÉCISION : documenter cas d'usage exacts de `2-TEST-ALPHA`.

### Lot D — Archives à préparer (patchs historiques)

- Périmètre : patchs historiques volumineux de `1-VALIDE`
- Objectif : préparer un futur archivage contrôlé sans suppression ni déplacement immédiat.
- Verdict proposé : À CONFIRMER
- Choix Nathan :
  - [ ] VALIDÉ : GO LOT D
  - [ ] VALIDÉ : NO-GO LOT D
  - [ ] À CONFIRMER : LOT D
  - [ ] DEMANDE DE PRÉCISION : LOT D
- Décision Nathan retenue :
- Commentaire Nathan :
- Blocage éventuel :
- Prochaine action si GO : session dédiée de cartographie patch -> preuve avant toute action.
- Prochaine action si NO-GO : conservation complète des patchs historiques en zone active.
- Prochaine action si À CONFIRMER : compléter preuve de non-dépendance active.
- Prochaine action si DEMANDE DE PRÉCISION : fournir échantillon de mapping de correspondance.

### Lot E — Placeholders à conserver

- Périmètre : `docs/2-SESSIONS/2-BETA`, `docs/2-SESSIONS/3-VERSION_OFFICIELLE`
- Objectif : conserver la structure placeholder.
- Verdict proposé : GO
- Choix Nathan :
  - [ ] VALIDÉ : GO LOT E
  - [ ] VALIDÉ : NO-GO LOT E
  - [ ] À CONFIRMER : LOT E
  - [ ] DEMANDE DE PRÉCISION : LOT E
- Décision Nathan retenue :
- Commentaire Nathan :
- Blocage éventuel :
- Prochaine action si GO : maintien simple sans mouvement.
- Prochaine action si NO-GO : décider explicitement de la stratégie alternative.
- Prochaine action si À CONFIRMER : vérifier dépendance roadmap/stages.
- Prochaine action si DEMANDE DE PRÉCISION : produire options de convention placeholder.

### Lot F — Zones à confirmer

- Périmètre : conventions anciennes, mentions `docs/2-sessions`, doublons potentiels, zones ambiguës
- Objectif : arbitrer les ambiguïtés avant tout nettoyage futur.
- Verdict proposé : À CONFIRMER
- Choix Nathan :
  - [ ] VALIDÉ : GO LOT F
  - [ ] VALIDÉ : NO-GO LOT F
  - [ ] À CONFIRMER : LOT F
  - [ ] DEMANDE DE PRÉCISION : LOT F
- Décision Nathan retenue :
- Commentaire Nathan :
- Blocage éventuel :
- Prochaine action si GO : session dédiée d'arbitrage cas par cas.
- Prochaine action si NO-GO : aucune correction des conventions anciennes.
- Prochaine action si À CONFIRMER : lister ambiguïtés prioritaires.
- Prochaine action si DEMANDE DE PRÉCISION : produire tableau ambiguïté -> impact -> option.

## Synthèse finale des décisions

| Lot | Verdict proposé | Décision Nathan | Statut final | Prochaine action | Date / note |
|---|---|---|---|---|---|
| A | GO |  |  |  |  |
| B | GO |  |  |  |  |
| C | GO |  |  |  |  |
| D | À CONFIRMER |  |  |  |  |
| E | GO |  |  |  |  |
| F | À CONFIRMER |  |  |  |  |

## Règles avant exécution future

- Ce formulaire ne déclenche aucune action physique.
- Une décision GO ne vaut pas exécution immédiate.
- Chaque GO doit donner lieu à une session dédiée avant action.
- Chaque action future doit fournir preuves, diff/liste de mouvements et ZIP de contrôle.
- Aucune suppression sans validation spécifique supplémentaire.
- Aucun déplacement sans validation spécifique supplémentaire.
- Aucun archivage réel sans validation spécifique supplémentaire.

## Points à confirmer

- Seuil exact "non utilisé depuis X sessions" : INFORMATION NON FOURNIE — À CONFIRMER.
- Niveau de preuve minimal avant lot D : INFORMATION NON FOURNIE — À CONFIRMER.
- Format de validation final Nathan (table simple ou signature) : INFORMATION NON FOURNIE — À CONFIRMER.

## Prochaine étape recommandée

REBASAGE-17 : préparer la session de consolidation des décisions Nathan (lecture du formulaire rempli + plan d'exécution détaillé par lot validé), sans action physique tant que validation explicite non confirmée.
