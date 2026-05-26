# Simulation archivage sessions — Ambulance Manager

## Rôle du document

Ce document formalise une simulation de consultation et d'archivage futur de `docs/2-SESSIONS`.
Il sert à préparer les décisions Nathan, sans aucune action physique sur le dépôt.

## Rappel important

- Simulation uniquement.
- Aucun déplacement effectué.
- Aucune suppression effectuée.
- Aucun archivage réel effectué.
- Validation Nathan obligatoire avant toute action physique.

## Matrice opérationnelle de consultation

| Besoin | Source principale | Source secondaire | Sources à éviter | Niveau de confiance | Précaution | Exemple d'usage |
|---|---|---|---|---|---|---|
| Préparer une session Codex | `docs/1-MASTER/_INDEX_MASTER.md` | `docs/2-SESSIONS/_INDEX_SESSIONS.md` | Patchs historiques massifs | Élevé | Lire master avant sessions | Ouverture d'une session UI/UX |
| Contrôler une session récente | `docs/2-SESSIONS/1-ALPHA/BLOC_A26` | `docs/2-SESSIONS/1-ALPHA/CLOTURE-ALPHA` | `2-TEST-ALPHA` | Élevé | Vérifier date + FIN_SESSION | Contrôle A26-UI-10 |
| Vérifier une décision | `docs/1-MASTER/REGISTRE_DECISIONS.md` | Session liée en `docs/2-SESSIONS` | Sessions non liées | Élevé | La décision master prime | Vérifier arbitrage de gouvernance |
| Vérifier une preuve de patch | Dossier `PATCH` de la session cible | `EVIDENCES.md`, `RESULTATS.md` | Patchs d'autres blocs | Moyen | Ne pas rejouer le patch sans contrôle | Vérifier patch d'une session A24 |
| Vérifier une clôture | Session `...CLOTURE...` concernée | `docs/2-SESSIONS/1-ALPHA/CLOTURE-ALPHA` | Sessions intermédiaires | Élevé | Exiger verdict explicite | Vérifier clôture A26 |
| Comprendre un ancien bloc | `docs/2-SESSIONS/1-ALPHA/1-VALIDE/BLOC_Ax` | Clôture du bloc | `2-BETA`, `3-VERSION_OFFICIELLE` | Moyen | Isoler le bloc, éviter la lecture transversale | Relecture bloc A14 |
| Comprendre A26 | `docs/2-SESSIONS/1-ALPHA/BLOC_A26` | `docs/2-SESSIONS/1-ALPHA/BLOC_DOCS` | Blocs A1-A25 non liés | Élevé | Prioriser les sessions récentes | Reprendre contexte UI/UX récent |
| Chercher une ancienne règle | `docs/2-SESSIONS/README.md` | `docs/README_DOCS.md` | Réemploi direct de règle ancienne | Faible à moyen | Revalider contre gouvernance actuelle | Vérifier convention de nommage ancienne |
| Vérifier un test | `docs/2-SESSIONS/2-TEST-ALPHA/1-DOCUMENTATION` | `.../2-PATCHS` | `1-ALPHA/1-VALIDE` pour décisions produit | Moyen | Ne pas promouvoir test en norme | Contrôler test local documenté |
| Retrouver une maquette/référence ancienne | `docs/1-MASTER/2-REFERENCE_UI_UX/` | Sessions mentionnant la page | `2-TEST-ALPHA` | Élevé | Les sources visuelles sont en master | Vérifier rattachement d'une page |
| Préparer une future archive | `docs/2-SESSIONS/GOUVERNANCE_SESSIONS.md` | `_INDEX_SESSIONS.md` + structure dossiers | Lecture ligne à ligne des patchs | Moyen | Travailler par lot simulé | Préparer lot D sans exécution |

## Simulation d’archivage futur

| Chemin / zone | Statut simulé | Justification | Risque si laissé actif | Risque si archivé trop tôt | Action future possible | Validation Nathan requise |
|---|---|---|---|---|---|---|
| `docs/2-SESSIONS/1-ALPHA/BLOC_A26` | OPÉRATIONNEL RÉCENT | Bloc récent de référence | Confusion avec anciens blocs si non cadré | Perte de référence récente | Conserver actif à court terme | Oui |
| `docs/2-SESSIONS/1-ALPHA/BLOC_DOCS` | À CONSERVER ACTIF | Support documentaire de rebasage | Faible | Perte de contexte de migration docs | Maintien actif jusqu'à fin rebasage | Oui |
| `docs/2-SESSIONS/1-ALPHA/CLOTURE-ALPHA` | À CONSERVER ACTIF | Clôture transversale utile | Faible | Perte de point de synthèse | Garder visible en consultation prioritaire | Oui |
| `docs/2-SESSIONS/1-ALPHA/1-VALIDE` | HISTORIQUE À INDEXER | Volume historique majeur déjà clôturé | Surcharge de lecture | Perte de traçabilité historique | Indexation renforcée puis simulation d'archive par sous-lots | Oui |
| `docs/2-SESSIONS/2-TEST-ALPHA` | TEST À ISOLER | Sessions de test non normatives | Risque de confusion production/test | Perte d'évidences test utiles | Isoler logiquement, sans déplacer | Oui |
| `docs/2-SESSIONS/2-BETA` | PLACEHOLDER À CONSERVER | Réservation future | Aucun | Suppression de structure attendue | Conserver en l'état | Oui |
| `docs/2-SESSIONS/3-VERSION_OFFICIELLE` | PLACEHOLDER À CONSERVER | Réservation future | Aucun | Suppression de structure attendue | Conserver en l'état | Oui |
| `docs/2-SESSIONS/SESSION-YYYYMMDD-XX` | À CONSERVER ACTIF | Gabarit de session | Faible | Perte de standard de création | Maintien comme template | Oui |
| Dossiers `PATCH` historiques anciens (dans `1-VALIDE`) | ARCHIVE À PRÉPARER | Volume élevé, usage ponctuel | Bruit documentaire important | Perte de preuves techniques si mal référencées | Préparer lot dédié avec index de correspondance | Oui |
| Éléments ambigus / conventions anciennes (`docs/2-sessions` dans anciens textes) | À CONFIRMER | Incohérence de chemins historiques | Confusion de lecture | Correction prématurée de traçabilité | Marquer, documenter, valider avant action | Oui |

## Lots futurs proposés

| Lot | Contenu | Objectif | Action future possible | Priorité | Dépendance | Validation Nathan requise |
|---|---|---|---|---|---|---|
| Lot A | `BLOC_A26`, `BLOC_DOCS`, `CLOTURE-ALPHA`, `SESSION-YYYYMMDD-XX` | Conserver actif | Maintien en zone de consultation prioritaire | Haute | Validation finale fin rebasage | Oui |
| Lot B | `1-ALPHA/1-VALIDE` (hors zones actives) | Historique à indexer | Renforcer index par sous-blocs/sessions clés | Haute | Lot A stabilisé | Oui |
| Lot C | `2-TEST-ALPHA` | Test à isoler | Marquage documentaire explicite non normatif | Moyenne | Règles consultation validées | Oui |
| Lot D | Patchs historiques volumineux de `1-VALIDE` | Archive à préparer | Simulation d'archivage avec table de preuves | Moyenne | Lot B terminé | Oui |
| Lot E | `2-BETA`, `3-VERSION_OFFICIELLE` | Placeholders à conserver | Aucun changement physique | Faible | Aucun | Oui |
| Lot F | Chemins/conventions obsolètes et zones ambiguës | À confirmer | Liste d'arbitrage Nathan avant action | Haute | Constats consolidés lots B/C/D | Oui |

## Critères de passage en archive

| Critère | Description | Preuve nécessaire | Applicable à | Décision automatique | Validation Nathan requise |
|---|---|---|---|---|---|
| Bloc clôturé | Le bloc dispose d'une clôture explicite validée | `FIN_SESSION.md` + verdict de clôture | Blocs de `1-VALIDE` | Non | Oui |
| Non utilisé depuis X sessions | Plus consulté dans les sessions récentes | Trace de consultation / référence récente | Blocs historiques | Non (X = INFORMATION NON FOURNIE — À CONFIRMER) | Oui |
| Décision reprise en master | Le contenu est stabilisé dans `docs/1-MASTER` | Référence explicite master | Sessions anciennes de cadrage | Non | Oui |
| Patch lourd peu consulté | Patch volumineux sans usage quotidien | Index de patch + fréquence d'usage | Dossiers `PATCH` historiques | Non | Oui |
| Ancienne convention de chemin | Chemins historiques obsolètes (`docs/2-sessions`) | Preuve textuelle + mapping actuel | READMEs anciens / sessions anciennes | Non | Oui |
| Session test | Session identifiée comme test local | Emplacement `2-TEST-ALPHA` + contenu | Dossiers test | Non | Oui |
| Doublon documentaire | Deux sessions couvrent le même périmètre | Analyse comparative | Sessions proches/successives | Non | Oui |
| Preuve utile non opérationnelle | Doit rester consultable mais pas active | Index de preuve minimal | Historique ancien | Non | Oui |

## Risques avant archivage réel

- Risque de perdre une preuve utile si archivage sans index de correspondance.
- Risque de casser un chemin documentaire cité dans des sessions récentes.
- Risque de confusion Codex si `TEST` et `PRODUCTION` restent mêlés.
- Risque de masquer l'historique d'une décision si archive trop agressive.
- Risque de déplacer trop tôt `BLOC_A26` ou `BLOC_DOCS` alors qu'ils restent opérationnels.
- Risque de traiter des sessions test comme sources normatives.

## Interdictions

- Ne pas déplacer sans validation.
- Ne pas supprimer sans validation.
- Ne pas archiver sans validation.
- Ne pas modifier les sessions historiques.
- Ne pas rejouer les patchs historiques.
- Ne pas utiliser les sessions comme plan officiel.

## Points à confirmer

- Seuil exact "X sessions" pour classer un bloc en archive : INFORMATION NON FOURNIE — À CONFIRMER.
- Liste minimale des preuves à conserver actives avant archivage : INFORMATION NON FOURNIE — À CONFIRMER.
- Ordre prioritaire entre lot B et lot D : INFORMATION NON FOURNIE — À CONFIRMER.

## Prochaine étape recommandée

REBASAGE-14 : préparer un plan d'exécution contrôlé (toujours sans action physique) avec checklists de validation Nathan par lot, puis lancer uniquement après validation explicite.
