# Index sessions — Ambulance Manager

## Clarification de gouvernance (post-audit)

- Nouveau document de gouvernance : docs/2-SESSIONS/README_SESSIONS.md.
- L'audit documentaire a recommandé une clarification de gouvernance avant toute réorganisation physique.

## Rôle du dossier docs/2-SESSIONS

Le dossier `docs/2-SESSIONS` conserve l'historique des sessions, les preuves d'exécution, les notes, les résultats, les clôtures et les traces de patchs.
C'est une base de traçabilité, pas un plan de développement.

## Règles de lecture

- `docs/2-SESSIONS` = historique / preuves / traçabilité.
- `docs/2-SESSIONS` ne prime pas sur `docs/1-MASTER`.
- Les sessions historiques ne doivent pas être reprises comme source active sans contrôle documentaire.
- En cas de doute : `INFORMATION NON FOURNIE — À CONFIRMER`.

## Vue globale des stages

| Stage | Rôle | Contenu | Statut | Remarque |
|---|---|---|---|---|
| `docs/2-SESSIONS/1-ALPHA` | Historique principal de production Alpha | Blocs A1 à A25 validés + A26 récent + bloc docs + clôture Alpha | HISTORIQUE VALIDÉ / OPÉRATIONNEL RÉCENT | Zone la plus consultée pour preuves récentes |
| `docs/2-SESSIONS/2-TEST-ALPHA` | Zone de tests documentaires | Sessions de test local + patchs de test | TEST | Ne pas confondre avec production validée |
| `docs/2-SESSIONS/2-BETA` | Réservation phase Beta | `.gitkeep` uniquement | PLACEHOLDER | Aucune session exploitable à ce stade |
| `docs/2-SESSIONS/3-VERSION_OFFICIELLE` | Réservation version officielle | `.gitkeep` uniquement | PLACEHOLDER | Aucune session exploitable à ce stade |
| `docs/2-SESSIONS/SESSION-YYYYMMDD-XX` | Gabarit de structure session | Fichiers type `SESSION/NOTES/EVIDENCES/RESULTATS/FIN_SESSION` | OPÉRATIONNEL | Référence de format, pas session réelle |

## Vue par blocs

| Bloc / dossier | Rôle apparent | Nombre de sessions | Clôture apparente | Statut recommandé | Priorité de consultation | Risque de confusion | Remarque |
|---|---|---:|---|---|---|---|---|
| `docs/2-SESSIONS/1-ALPHA/1-VALIDE` | Historique Alpha validé blocs A1 à A25 | ~224 | Oui (sessions de clôture présentes dans les blocs) | HISTORIQUE VALIDÉ | Haute | Moyen | Base historique majeure, volume important |
| `docs/2-SESSIONS/1-ALPHA/BLOC_A26` | Série UI/UX A26 récente | 12 | Oui (`SESSION-20260513-12_A26_CLOTURE_A26`) | OPÉRATIONNEL RÉCENT | Très haute | Moyen | Bloc récent, encore utilisé comme référence de correction documentaire |
| `docs/2-SESSIONS/1-ALPHA/BLOC_DOCS` | Session dédiée réorganisation docs | 1 | Oui (FIN_SESSION présente) | OPÉRATIONNEL RÉCENT | Haute | Faible | Complément rebasage documentaire |
| `docs/2-SESSIONS/1-ALPHA/CLOTURE-ALPHA` | Clôture transversale Alpha | 1 dossier de clôture | Oui | CLOTURE | Haute | Moyen | Clôture globale à relire avant décisions de nettoyage |
| `docs/2-SESSIONS/2-TEST-ALPHA/1-DOCUMENTATION` | Sessions de tests documentaires | 2 | Oui (FIN_SESSION dans chaque session) | TEST | Moyenne | Élevé | Ne pas confondre avec sessions de production |
| `docs/2-SESSIONS/2-TEST-ALPHA/2-PATCHS` | Traces patchs tests | 2 lots | Partiel | TEST | Faible | Moyen | Conserver pour traçabilité technique test |
| `docs/2-SESSIONS/2-BETA` | Espace futur Beta | 0 | Non | PLACEHOLDER | Faible | Faible | Dossier de réservation |
| `docs/2-SESSIONS/3-VERSION_OFFICIELLE` | Espace futur version officielle | 0 | Non | PLACEHOLDER | Faible | Faible | Dossier de réservation |
| `docs/2-SESSIONS/SESSION-YYYYMMDD-XX` | Template de session | 0 session réelle | Non applicable | OPÉRATIONNEL | Moyenne | Faible | À conserver comme modèle |

## Sessions récentes / opérationnelles

- `docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-01_A26_A26-UI-01` à `...-11_A26_A26-UI-11`.
- `docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-12_A26_CLOTURE_A26` (clôture A26).
- `docs/2-SESSIONS/1-ALPHA/BLOC_DOCS/SESSION-DOCS-REORG-01`.
- `docs/2-SESSIONS/1-ALPHA/CLOTURE-ALPHA/`.

## Dossiers test / clôture / placeholders

- Test : `docs/2-SESSIONS/2-TEST-ALPHA/`.
- Clôtures explicites : nombreuses sessions `...CLOTURE...` dans `1-VALIDE`, plus `BLOC_A26` et `CLOTURE-ALPHA`.
- Placeholders : `docs/2-SESSIONS/2-BETA/`, `docs/2-SESSIONS/3-VERSION_OFFICIELLE/`.
- Template : `docs/2-SESSIONS/SESSION-YYYYMMDD-XX/`.

## Risques de confusion

- Ancienne structure cible décrite dans `docs/2-SESSIONS/README.md` (`docs/2-sessions`, A1-A13) partiellement différente de l'état réel actuel (A1-A26 et casse `2-SESSIONS`).
- Confusion possible entre historique validé (`1-ALPHA/1-VALIDE`) et flux récent rebasage/documentation (`BLOC_A26`, `BLOC_DOCS`).
- Confusion possible entre `2-TEST-ALPHA` (test) et sessions de production.
- Volume important des preuves/patchs dans `1-ALPHA` pouvant compliquer la lecture sans index.

## Actions futures recommandées

1. REBASAGE-12 : définir une règle de consultation minimale par type de besoin (preuve, clôture, historique, test).
2. REBASAGE-12 : proposer une séparation visuelle plus stricte entre historique validé, récent opérationnel et test (sans déplacement immédiat).
3. REBASAGE-12 : préparer une stratégie d'archivage ultérieure validée Nathan pour zones lourdes non actives.
4. REBASAGE-12 : vérifier cohérence de `docs/2-SESSIONS/README.md` avec la structure actuelle (écarts de casse et de blocs).

## Points à confirmer

- Statut final de conservation long terme de certains blocs très anciens : INFORMATION NON FOURNIE — À CONFIRMER.
- Critère exact de bascule `HISTORIQUE VALIDÉ` -> `ARCHIVE À PRÉPARER` : INFORMATION NON FOURNIE — À CONFIRMER.
- Politique future sur les dossiers `PATCH` historiques volumineux : INFORMATION NON FOURNIE — À CONFIRMER.
