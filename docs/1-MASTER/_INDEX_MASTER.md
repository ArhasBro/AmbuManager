# Index master — Ambulance Manager

## Rôle du dossier docs/1-MASTER

Le dossier `docs/1-MASTER` regroupe les documents de référence prioritaires du projet (cadre, plan officiel, état global, décisions, cadrage, structure, RGPD, suivi documentaire), ainsi que les sous-dossiers de maquettes et de références UI/UX.

## Règle de priorité documentaire

Ordre de lecture recommandé (du plus prioritaire au moins prioritaire) :

1. Code réel du dépôt (état technique présent).
2. `DOCUMENT_CADRAGE_FONCTIONNEL.md` (périmètre produit validé).
3. `DOCUMENT_MAITRE.md` (principes globaux non négociables).
4. `PLAN_DE_DEVELOPPEMENT.md` (seul plan officiel).
5. `REGISTRE_DECISIONS.md` (décisions validées).
6. `ETAT_GLOBAL_PROJET.md` (état courant synthétique).
7. Références UI/UX (`2-REFERENCE_UI_UX/`).
8. Maquettes PNG officielles (`1-MAQUETTE/`).
9. Sessions historiques (`docs/2-SESSIONS/`) comme preuve, sans autorité supérieure aux documents master.
10. `RECAP_DISCUSSIONS.md` (contexte).
11. `docs/CMD.md` (brouillon personnel Nathan, non officiel).

## Documents officiels principaux

| Document | Rôle | Statut | Autorité | Usage recommandé | Précaution |
|---|---|---|---|---|---|
| `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md` | Cadrage produit cible validé | OFFICIEL | Très haute | Définir ce qui doit exister côté produit | Document figé sauf validation explicite |
| `docs/1-MASTER/DOCUMENT_MAITRE.md` | Cadre global et règles de pilotage | OFFICIEL | Très haute | Arbitrer les règles structurantes | Ne pas confondre avec un journal de session |
| `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md` | Ordonnancement officiel des blocs/sessions | OFFICIEL | Très haute | Piloter l’avancement officiel | Reste le seul plan officiel |
| `docs/1-MASTER/REGISTRE_DECISIONS.md` | Décisions validées et traçables | OFFICIEL | Haute | Vérifier les arbitrages actés | À lire avec le plan et le cadrage |
| `docs/1-MASTER/ETAT_GLOBAL_PROJET.md` | Vision synthétique de l’état projet | OFFICIEL | Haute | Situer la situation courante | Peut être en décalage temporel si non mis à jour |

## Documents opérationnels / suivi

| Document | Rôle | Statut | Usage recommandé | Précaution |
|---|---|---|---|---|
| `docs/1-MASTER/RECAP_DISCUSSIONS.md` | Trace de contexte et discussions | OPÉRATIONNEL | Comprendre le contexte des arbitrages | Ne prime pas sur les décisions officielles |
| `docs/1-MASTER/STRUCTURE_PROJET.md` | Référence principale de structure projet (niveau master) | GOUVERNANCE | Orienter la lecture de la structure documentaire | Peut recouvrir partiellement d’autres inventaires |
| `docs/1-MASTER/RGPD_BASE_MINIMALE.md` | Base RGPD minimale projet | OPÉRATIONNEL | Vérifier socle conformité | INFORMATION NON FOURNIE — À CONFIRMER pour le niveau d’actualité détaillé |
| `docs/1-MASTER/SUIVI_AUDIT_DOCUMENTAIRE_UI_UX_A26.md` | Suivi documentaire UI/UX A26 | SUIVI | Relire le contexte des corrections A26 | Historique de suivi, pas source de vérité unique |
| `docs/1-MASTER/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md` | Cadrage UI/UX Alpha lié maquettes | OPÉRATIONNEL | Comprendre le cadre visuel Alpha | À croiser avec références UI/UX par page |

## Références UI/UX

| Dossier / document | Rôle | Usage | Lien avec maquettes/routes |
|---|---|---|---|
| `docs/1-MASTER/2-REFERENCE_UI_UX/` | Références UI/UX détaillées par page/zone | Guider l’implémentation visuelle et fonctionnelle page par page | À relier via `MATRICE_CANONIQUE_UI_UX.md` |
| `docs/1-MASTER/2-REFERENCE_UI_UX/MATRICE_CANONIQUE_UI_UX.md` | Matrice unique de correspondance page -> PNG -> référence -> route -> fichier app | Lever les ambiguïtés de mapping UI/UX | Document pivot pour sessions UI/UX futures |

## Maquettes

| Dossier | Rôle | Statut | Remarque |
|---|---|---|---|
| `docs/1-MASTER/1-MAQUETTE/MAQUETTES_FONDATRICES_IMAGES_V1.0/` | Base visuelle fondatrice | MAQUETTE / VISUEL | Ne pas déplacer pendant rebasage |
| `docs/1-MASTER/1-MAQUETTE/MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0/` | Compléments visuels | MAQUETTE / VISUEL | À relier aux pages via matrice canonique |
| `docs/1-MASTER/1-MAQUETTE/PAGES_SIMPLES_FINITIONS_IMAGE_V1.0/` | Finitions de pages simples | MAQUETTE / VISUEL | Peut contenir variantes à clarifier plus tard |

## Documents à ne pas confondre

- `docs/README.md` : accueil simple de `docs/`.
- `docs/README_DOCS.md` : gouvernance documentaire globale.
- `docs/CMD.md` : brouillon personnel Nathan, non source officielle.
- `docs/STRUCTURE_DOCS.md` : inventaire technique / empreinte opérationnelle de `docs/`.
- `docs/1-MASTER/STRUCTURE_PROJET.md` : référence principale structure projet niveau master.
- `docs/2-SESSIONS/` : historique et preuves de sessions, sans autorité supérieure aux documents master.

## Points à confirmer

- Niveau d’actualisation détaillé de `RGPD_BASE_MINIMALE.md` : INFORMATION NON FOURNIE — À CONFIRMER.
- Couverture exhaustive de toutes pages/références UI/UX dans les futures sessions : INFORMATION NON FOURNIE — À CONFIRMER.
- Stratégie finale d’archivage des éléments historiques post-rebasage : INFORMATION NON FOURNIE — À CONFIRMER.

## Prochaine étape recommandée

REBASAGE-11 : clarification finale de gouvernance documentaire transverse (master, sessions, archives) puis préparation de la reprise contrôlée du cycle de production, sans refonte non autorisée des documents officiels.
