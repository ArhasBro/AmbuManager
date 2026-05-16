# REBASAGE-25 - Classement des dettes et priorités

## 1. Résumé de la session

Objectif : qualifier et prioriser les dettes relevées dans REBASAGE-23 et REBASAGE-24, sans lancer de correction.

Résultat : classement documentaire produit par priorité, type d'action, périmètre et impact sur la suite.

## 2. Périmètre lu

- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-23_CARTOGRAPHIE_GLOBALE_PROJET.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-24_MATRICE_PAGE_FONCTIONNALITES_CODE_DOCUMENTATION_MAQUETTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-19_FONCTIONNALITES_PAR_PAGE.md`

## 3. Règles de classement

- Une dette ne déclenche pas de correction automatique.
- Chaque dette est classée par : priorité, type d'action, périmètre, justification.
- Les classes utilisées : `Bloquant`, `Important`, `Amélioration`, `À confirmer`, `Plus tard`.
- Si la preuve est incomplète : `INFORMATION NON FOURNIE — À CONFIRMER`.

## 4. Tableau structuré des dettes

| ID | Dette / fragilité | Périmètre | Priorité | Action recommandée | Justification courte |
|---|---|---|---|---|---|
| D-01 | Densité fonctionnelle élevée de `/planning` (UI, autoschedule, export, audit) | page + module métier + API | Important | auditer | Risque d'écart entre comportement réel et attente documentaire sans audit ciblé |
| D-02 | Densité RH et permissions de `/users` (RBAC fin, absences, archive, reset, depot) | page + module métier + API | Important | auditer | Zone à fort impact métier et sécurité, couverture documentaire partielle |
| D-03 | Relations API -> pages encore implicites pour `imports`, `health/prisma`, audit étendu | route API + sujet transversal | Important | documenter | Cartographie partielle, risque de lecture incomplète avant reprise fonctionnelle |
| D-04 | Héritage des chemins historiques `MAQUETTE_DA` dans sessions anciennes | documentation + maquettes/références UI | Important | clarifier avec Nathan | Risque de confusion de chemin actif pour futures sessions |
| D-05 | Absence de dossier `components/` (structuration UI partagée) | zone technique structurelle | Amélioration | à confirmer | Dette de maintenabilité potentielle, non bloquante immédiate |
| D-06 | Périmètre RGPD opérationnel incompletement relié à `/privacy` | page + documentation + module métier | À confirmer | clarifier avec Nathan | La page info existe, mais la couverture opérationnelle détaillée n'est pas prouvée |
| D-07 | Couverture exacte `matching` / `exports` / `imports` par parcours page non prouvée | module métier + API + pages | À confirmer | auditer | Preuve partielle dans REBASAGE-24 |
| D-08 | Statuts historiques dans `REBASAGE_GLOBAL_ALPHA.md` possiblement en retard sur la réalité (22-24) | fichier documentaire rebasage | Amélioration | documenter | Peut créer une confusion de pilotage si non réaligné progressivement |
| D-09 | Règles exactes de sécurité fonctionnelle (MFA, recovery, hardening login) non tracées dans matrice | page login + sécurité | À confirmer | clarifier avec Nathan | Information non suffisamment prouvée dans la lecture de cadrage utilisée |
| D-10 | Différence potentielle entre maquettes/références et implémentation visuelle effective | pages + UI/UX + maquettes | Plus tard | compléter plus tard | À traiter pendant audits page par page, pas en correction transversale immédiate |

## 5. Dettes bloquantes

- INFORMATION NON FOURNIE — À CONFIRMER

## 6. Dettes importantes

- D-01 : complexité fonctionnelle planning.
- D-02 : complexité RH et permissions users.
- D-03 : relations API/pages incomplètement explicitées.
- D-04 : héritage `MAQUETTE_DA` dans l'historique.

## 7. Améliorations

- D-05 : structuration UI partagée (`components/`) à confirmer.
- D-08 : réalignement progressif du suivi central pour éviter ambiguïtés de séquence.

## 8. Points à confirmer

- D-06 : couverture RGPD opérationnelle au-delà de la page privacy.
- D-07 : couverture fonctionnelle prouvée de matching/exports/imports.
- D-09 : exigences sécurité login au niveau produit.
- Toute zone avec preuve insuffisante reste marquée `INFORMATION NON FOURNIE — À CONFIRMER`.

## 9. Sujets à reporter

- D-10 : écarts visuels détaillés UI/UX à traiter après inventaire route/page complet.
- Nettoyage historique profond des sessions anciennes hors besoin immédiat de reprise.

## 10. Priorités avant audit page par page

1. Verrouiller l'inventaire réel pages/routes (REBASAGE-26).
2. Clarifier les dépendances API transverses (`imports`, `exports`, `health`, audit).
3. Valider la règle d'usage maquettes actives vs héritage `MAQUETTE_DA`.
4. Prioriser l'audit détaillé de `/planning` puis `/users`.

## 11. Limites du classement

- Classement construit à partir de REBASAGE-23/24, sans tests runtime.
- Certaines dettes restent au statut `À confirmer` faute de preuve exhaustive.
- Aucun correctif technique/documentaire de fond appliqué dans cette session.

## 12. Recommandations pour REBASAGE-26

- Produire l'inventaire réel consolidé des pages/routes applicatives et techniques.
- Fixer le niveau de confiance par route (prouvée / partielle / à confirmer).
- Préparer la séquence d'audits page par page à partir des priorités D-01 à D-04.

## 13. Verdicts de sortie

- REBASAGE-25 VALIDABLE : OUI
- CLASSEMENT DES DETTES CRÉÉ : OUI
- CODE MODIFIÉ : NON
- DOCUMENTS MAÎTRES MODIFIÉS : NON
- INVENTAIRE REBASAGE-26 PRÊT : OUI
