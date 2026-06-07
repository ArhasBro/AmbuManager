# Index master — Ambulance Manager

## Rôle du dossier `docs/1-MASTER`

Ce dossier regroupe les documents MASTER de référence pour piloter la reprise V2 avant et pendant la Phase 6.

## Hiérarchie documentaire (en cas de contradiction)

1. Code réel du dépôt.
2. Documents normatifs actifs.
3. Documents actifs temporaires (contexte / preuve).
4. Documents contextuels / mémoriels.
5. Archives (non actives).

Règle : en cas de contradiction, les documents normatifs actifs priment.

## Matrice de statut documentaire

| Catégorie | Document | Rôle |
|---|---|---|
| actif | `docs/1-MASTER/DOCUMENT_MAITRE_V2.md` | Référence structurante globale du projet |
| actif | `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL_V2.md` | Référence de cadrage produit/fonctionnel |
| actif | `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md` | Plan actif de développement |
| actif | `docs/1-MASTER/REGISTRE_DECISIONS_V2.md` | Registre normatif des décisions validées |
| actif temporaire | `docs/1-MASTER/ETAT_GLOBAL_PROJET_V2.md` | Statut courant du projet pendant la reprise |
| actif temporaire | `docs/1-MASTER/AUDIT_CODE_EXISTANT_ALPHA_V2.md` | Preuve d’état du code avant Phase 6 ; utile au démarrage |
| actif temporaire | `docs/1-MASTER/AUDIT_COMPARAISON_BASE44_OFFICIEL_V1.md` | Audit de cadrage Base44 → repo officiel ; obligatoire pour le bloc `DEV-B44-00` |
| actif (améliorable) | `docs/1-MASTER/RGPD_BASE_MINIMALE.md` | Base RGPD minimale active, non finale, à améliorer plus tard |
| contextuel / mémoriel | `docs/1-MASTER/RECAP_DISCUSSIONS_V2.md` | Mémoire narrative ; utile pour le contexte, non normative |
| archive de référence | `docs/4-ARCHIVES/BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md` | Synthèse finale Base44 ; référence prototype, non source technique finale |
| archive | `docs/4-ARCHIVES/1-MASTER_HISTORIQUE/` | Historique documentaire non actif |

## Rôle spécifique de `RECAP_DISCUSSIONS_V2.md`

- Sert à retrouver le contexte des échanges.
- Ne doit pas être utilisé comme source de vérité principale.
- Ne tranche pas une décision en cas de contradiction.

## Sous-dossiers utiles de `docs/1-MASTER`

- `docs/1-MASTER/3-FONCTIONNALITES/` : référence fonctionnelle cible détaillée ; utile pour cadrer les pages/modules ; ne vaut pas validation finale automatique ; ne prime pas sur les documents normatifs actifs.
- `docs/1-MASTER/2-REFERENCE_UI_UX/` : références UI/UX utiles pour la comparaison, les maquettes et la reprise frontend ; statut transitoire ou de travail selon les fichiers ; ne prime pas sur les documents normatifs actifs.
- `docs/1-MASTER/1-MAQUETTE/` : maquettes et références visuelles utiles pour la reprise UI/UX et le contrôle visuel ; ne prime pas sur les décisions validées ni sur les documents normatifs actifs.
- Ces sous-dossiers ne sont pas des archives.
- Ils ne doivent pas être supprimés ou déplacés sans décision explicite.
- Ils servent de supports de travail et de références complémentaires.
- En cas de contradiction, les documents normatifs actifs priment.

## Gouvernance des sessions

- Document actif unique de gouvernance des sessions : `docs/2-SESSIONS/README_SESSIONS.md`.
- Anciens documents concurrents archivés : `docs/4-ARCHIVES/2-SESSIONS_HISTORIQUE/`.
- Les archives ne sont pas des sources actives.

## Règles courtes de mise à jour

- `DOCUMENT_MAITRE_V2.md` : modifier uniquement si une règle structurante globale du projet change.
- `DOCUMENT_CADRAGE_FONCTIONNEL_V2.md` : modifier uniquement si un cadrage produit/fonctionnel validé change.
- `PLAN_DE_DEVELOPPEMENT_V2.md` : modifier si l’ordre des blocs, des sessions, des jalons ou la stratégie de développement change.
- `REGISTRE_DECISIONS_V2.md` : modifier lorsqu’une décision structurante est validée.
- `ETAT_GLOBAL_PROJET_V2.md` : modifier à chaque fin de phase importante.
- `AUDIT_CODE_EXISTANT_ALPHA_V2.md` : ne pas modifier sauf correction factuelle validée ; document de preuve temporaire.
- `AUDIT_COMPARAISON_BASE44_OFFICIEL_V1.md` : ne pas modifier sauf correction factuelle validée ; document de cadrage temporaire pour `DEV-B44-00`.
- `RGPD_BASE_MINIMALE.md` : modifier lors d’un travail RGPD dédié.
- `RECAP_DISCUSSIONS_V2.md` : modifier uniquement pour mémoire narrative, sans statut normatif.
- `README_SESSIONS.md` : modifier si la gouvernance des sessions change.

## Notes de cycle

- `AUDIT_CODE_EXISTANT_ALPHA_V2.md` pourra être archivé plus tard après stabilisation de la Phase 6 ou remplacement par des audits de blocs plus récents.
- `AUDIT_COMPARAISON_BASE44_OFFICIEL_V1.md` pourra être archivé plus tard après validation et clôture du bloc `DEV-B44-00`.
- `ETAT_GLOBAL_PROJET_V2.md` reste temporaire tant que le pilotage de la reprise l’exige.
