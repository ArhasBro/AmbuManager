# Gouvernance des sessions historiques — Ambulance Manager

## Rôle du document

Ce document définit la méthode officielle de consultation de `docs/2-SESSIONS` et le cadrage d'archivage futur.
Il ne déclenche aucune action de déplacement, suppression, renommage ou archivage réel.

## Principe général

- `docs/2-SESSIONS` sert de base de preuve, traçabilité et historique.
- La vérité documentaire active reste pilotée par `docs/1-MASTER`.
- Les sessions historiques complètent l'analyse, elles ne remplacent pas les documents maîtres.
- En cas de doute : `INFORMATION NON FOURNIE — À CONFIRMER`.

## Règles de priorité

- `docs/1-MASTER` prime sur `docs/2-SESSIONS`.
- `docs/2-SESSIONS` sert de preuve / historique / traçabilité.
- Les sessions ne doivent pas devenir un plan parallèle.
- Les anciennes sessions doivent être relues avec prudence.
- Une session ancienne ne doit jamais écraser une décision récente validée en master.

## Niveaux de consultation

| Niveau | Objectif | Dossiers à consulter | Dossiers à éviter | Précautions | Exemple d'usage |
|---|---|---|---|---|---|
| Consultation rapide | Vérifier le contexte global d'un bloc | `_INDEX_SESSIONS.md`, `1-ALPHA/BLOC_A26`, `1-ALPHA/CLOTURE-ALPHA` | Patchs historiques détaillés | Lire d'abord les index, puis une seule source de preuve récente | Préparer une session de contrôle A26 |
| Consultation ciblée bloc | Comprendre un bloc précis | `1-ALPHA/1-VALIDE/BLOC_Ax` concerné + session de clôture associée | Blocs non liés | Vérifier date, code session, clôture du bloc | Relecture du bloc A22 |
| Consultation preuve / patch | Vérifier une preuve d'exécution ou un delta | Dossier `PATCH` de la session cible + `EVIDENCES.md` + `RESULTATS.md` | Autres patchs hors périmètre | Ne pas rejouer un patch sans contrôle et validation | Contrôle d'un patch A26-UI-08 |
| Consultation clôture | Vérifier un verdict de fin de bloc/stage | Sessions `...CLOTURE...`, `CLOTURE-ALPHA` | Sessions intermédiaires non nécessaires | Confirmer le verdict final et sa date | Validation de clôture A26 |
| Consultation historique complète | Audit rétrospectif large | `1-ALPHA/1-VALIDE` + index + clôtures | `2-TEST-ALPHA` sauf besoin explicite | Segmenter par bloc pour éviter les erreurs de lecture | Pré-audit global avant reclassement |
| Consultation à éviter sauf besoin explicite | Éviter surcharge et confusion | `2-TEST-ALPHA`, placeholders `2-BETA`, `3-VERSION_OFFICIELLE` | N/A | Ne pas utiliser comme source de décision active | Recherche d'un exemple test uniquement |

## Consultation par besoin

| Besoin | Source à consulter en premier | Source secondaire | Source à éviter | Remarque |
|---|---|---|---|---|
| Vérifier une décision récente | `docs/1-MASTER/REGISTRE_DECISIONS.md` | `docs/2-SESSIONS/1-ALPHA/BLOC_A26` | `2-TEST-ALPHA` | Décision = master, preuve = sessions |
| Vérifier une preuve de patch | Session cible (`PATCH`, `EVIDENCES.md`) | `RESULTATS.md`, `FIN_SESSION.md` | Patchs d'autres sessions | Ne pas extrapoler un patch hors contexte |
| Vérifier une clôture de bloc | Session `...CLOTURE...` du bloc | `CLOTURE-ALPHA` | Sessions test | Priorité au verdict final explicite |
| Préparer une nouvelle session Codex | `docs/1-MASTER/_INDEX_MASTER.md` + `_INDEX_SESSIONS.md` | Bloc récent lié | Lecture exhaustive des anciens patchs | Économie de lecture obligatoire |
| Contrôler un ancien bloc | `1-ALPHA/1-VALIDE/BLOC_Ax` | Session de clôture associée | `2-BETA`, `3-VERSION_OFFICIELLE` | Isoler le bloc et sa clôture |
| Comprendre A26 | `1-ALPHA/BLOC_A26` | `1-ALPHA/BLOC_DOCS`, `CLOTURE-ALPHA` | Blocs non liés | A26 reste un repère opérationnel récent |
| Vérifier une ancienne maquette | `docs/1-MASTER/2-REFERENCE_UI_UX/` | Sessions qui citent la maquette | `2-TEST-ALPHA` | Maquette/référence ne se décide pas dans sessions |
| Vérifier un test | `2-TEST-ALPHA/1-DOCUMENTATION` | `2-TEST-ALPHA/2-PATCHS` | `1-ALPHA/1-VALIDE` pour décision produit | Zone test non normative |
| Rechercher une règle obsolète | `docs/2-SESSIONS/README.md` + sessions anciennes | `README_DOCS.md` pour cadrage actuel | Réutilisation directe sans validation | Toute règle ancienne doit être revalidée |

## Critères d’archivage futur

| Type de contenu | Statut futur recommandé | Critère | Action future possible | Validation Nathan requise |
|---|---|---|---|---|
| Historique validé ancien (blocs stables) | HISTORIQUE À INDEXER | Bloc clôturé, non consulté en production récente | Préparer lot "ARCHIVE À PRÉPARER" | Oui |
| Session test | ARCHIVE À PRÉPARER | Contenu de test non utilisé opérationnellement | Marquage et regroupement futur | Oui |
| Session doublon | À CONFIRMER | Deux sessions couvrent le même objet sans valeur additionnelle claire | Analyse comparative avant décision | Oui |
| Patch historique lourd | ARCHIVE À PRÉPARER | Très volumineux et rarement consulté | Indexer puis déplacer en phase dédiée | Oui |
| Ancienne convention de nommage | HISTORIQUE À INDEXER | Convention non alignée avec gouvernance actuelle | Conserver avec note de compatibilité | Oui |
| Chemin obsolète documenté | À CONFIRMER | Référence `docs/2-sessions` ou structure périmée | Corriger en gouvernance, pas dans historique brut | Oui |
| Session remplacée par document master | ARCHIVE À PRÉPARER | Décision stabilisée et transcrite en master | Garder preuve, réduire exposition active | Oui |
| Session récente encore opérationnelle | OPÉRATIONNEL RÉCENT | Encore utilisée pour contrôles/corrections | Conserver en zone active | Oui |
| Session à conserver active | À CONSERVER | Sert encore de référence d'exécution actuelle | Maintien sans déplacement | Oui |

## Dossiers sensibles

- `docs/2-SESSIONS/1-ALPHA/1-VALIDE` : historique massif, risque de surcharge de lecture.
- `docs/2-SESSIONS/1-ALPHA/BLOC_A26` : bloc récent de référence opérationnelle.
- `docs/2-SESSIONS/1-ALPHA/BLOC_DOCS` : complément documentaire de rebasage.
- `docs/2-SESSIONS/1-ALPHA/CLOTURE-ALPHA` : clôture transversale Alpha.
- `docs/2-SESSIONS/2-TEST-ALPHA` : zone test, non normative.
- `docs/2-SESSIONS/2-BETA` : placeholder.
- `docs/2-SESSIONS/3-VERSION_OFFICIELLE` : placeholder.
- `docs/2-SESSIONS/SESSION-YYYYMMDD-XX` : template, pas historique réel.

## Interdictions

- Aucune suppression automatique.
- Aucun déplacement automatique.
- Aucun archivage sans validation Nathan.
- Aucun patch historique rejoué sans contrôle.
- Aucune ancienne règle reprise sans vérification.
- Aucune contradiction ignorée : elle doit être signalée.

## Actions futures recommandées

1. REBASAGE-13 : matrice opérationnelle "quand lire quoi" (master vs sessions vs tests) appliquée aux cas d'usage réels.
2. REBASAGE-13 : préparation d'un plan d'archivage simulé (sans exécution) avec lots `ARCHIVE À PRÉPARER`.
3. REBASAGE-13 : clarification de `docs/2-SESSIONS/README.md` pour alignement avec la structure réelle (`A26`, casse, placeholders).

## Points à confirmer

- Seuil exact qui fait passer un bloc de `HISTORIQUE VALIDÉ` à `ARCHIVE À PRÉPARER` : INFORMATION NON FOURNIE — À CONFIRMER.
- Politique de conservation longue durée des dossiers `PATCH` volumineux : INFORMATION NON FOURNIE — À CONFIRMER.
- Priorité de maintien actif entre `BLOC_A26` et futurs blocs post-rebasage : INFORMATION NON FOURNIE — À CONFIRMER.
