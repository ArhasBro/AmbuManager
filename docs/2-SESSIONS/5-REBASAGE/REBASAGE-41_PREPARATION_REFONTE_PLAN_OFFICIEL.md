# REBASAGE-41 — Préparation de la future refonte du plan officiel

## 1. Objet du document
Ce document prépare une future refonte éventuelle du plan officiel, sans modifier le plan officiel.

Précisions :
- `PLAN_DE_DEVELOPPEMENT.md` reste le seul plan officiel ;
- ce document n’est pas un nouveau plan ;
- ce document ne remplace pas le cadrage produit ;
- toute modification future du plan devra être explicitement validée par Nathan.

## 2. Règles de lecture
- Cadrage documentaire uniquement.
- Lecture seule.
- Aucune modification du plan officiel pendant cette session.
- Aucune correction code.
- Aucun nouveau plan parallèle.
- Toute information non prouvée reste `INFORMATION NON FOURNIE — À CONFIRMER`.
- Les accents français normaux sont conservés lorsque l’encodage est propre.

## 3. Sources lues
- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-23_CARTOGRAPHIE_GLOBALE_PROJET.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-24_MATRICE_PAGE_FONCTIONNALITES_CODE_DOCUMENTATION_MAQUETTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-25_CLASSEMENT_DETTES_PRIORITES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-26_INVENTAIRE_PAGES_ROUTES_APPLICATIVES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-39_CONSOLIDATION_INVENTAIRE_PAGES_STATUTS.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-40_CONSOLIDATION_FONCTIONNALITES_PAR_PAGE_APRES_AUDITS.md`

## 4. Pourquoi une future refonte du plan peut être utile
- Les audits montrent des modules présents mais majoritairement classés `incomplet`.
- La consolidation REBASAGE-40 confirme que plusieurs fonctionnalités existent en UI/API sans preuve e2e complète.
- L’ordre des futures corrections doit être réaligné avec l’état réel des preuves et des dépendances inter-modules.
- Les dettes transverses (RBAC, traçabilité, multi-tenant, archivage logique) nécessitent une priorisation plus explicite.
- Une reprise structurée évite d’empiler de nouvelles sessions sur une base méthodologique incertaine.

## 5. Éléments du plan actuel à conserver
- Logique de plan officiel unique.
- Découpage par blocs et sessions courtes, validables.
- Distinction audit / correction / complétion / validation.
- Règle de clôture de bloc avant passage au suivant.
- Doctrine de reprise méthodologique de l’existant.
- Règle “présent dans le code ≠ validé”.
- Alignement obligatoire avec `DOCUMENT_CADRAGE_FONCTIONNEL.md`.

## 6. Éléments du plan actuel à réaligner plus tard
| Sujet | Raison | Preuve ou source | Risque si non réaligné | Statut |
|---|---|---|---|---|
| Priorisation des reprises fonctionnelles | Les audits classent la majorité des modules en `incomplet` | REBASAGE-39, REBASAGE-40 | Séquencement de corrections non optimal | À VALIDER AVANT ACTION |
| Niveau de granularité des sessions futures | Certaines dettes transverses couvrent plusieurs pages/modules | REBASAGE-25, REBASAGE-40 | Sessions trop larges ou ambiguës | À VALIDER AVANT ACTION |
| Articulation audits complémentaires vs corrections | Besoin de preuves e2e supplémentaires avant correction | REBASAGE-29 à REBASAGE-38 | Corrections prématurées | À VALIDER AVANT ACTION |
| Prise en compte des dépendances inter-modules | Dépôts/Planning/Users/Véhicules/Templates fortement liés | REBASAGE-34, REBASAGE-40 | Régressions en chaîne | À VALIDER AVANT ACTION |
| Traitement des pages techniques/secondaires | Statut incomplet, accès/navigation partiels | REBASAGE-38, REBASAGE-40 | Zones hors radar dans la suite | À VALIDER AVANT ACTION |

## 7. Apports du rebasage à prendre en compte
- Cartographie globale du dépôt et des routes (REBASAGE-23).
- Matrice page / fonctionnalités / code / documentation / maquette (REBASAGE-24).
- Classement des dettes et priorités (REBASAGE-25).
- Inventaire réel des pages/routes applicatives (REBASAGE-26).
- Audits page par page (REBASAGE-27 à REBASAGE-38).
- Consolidation des pages et statuts (REBASAGE-39).
- Consolidation des fonctionnalités et dettes fonctionnelles (REBASAGE-40).

## 8. Risques à éviter lors de la future refonte du plan
- Créer un deuxième plan parallèle.
- Réécrire trop largement le plan officiel sans ciblage.
- Supprimer des sessions utiles trop tôt.
- Considérer une fonctionnalité comme validée parce qu’elle existe.
- Mélanger audit, correction et validation dans une même session.
- Lancer des sessions trop longues et difficilement contrôlables.
- Corriger avant d’avoir qualifié et priorisé la dette.
- Oublier les dépendances inter-modules dans le séquencement.

## 9. Règles proposées pour une future modification du plan officiel
- Modifier `PLAN_DE_DEVELOPPEMENT.md` uniquement dans une session dédiée.
- Exiger validation explicite Nathan avant toute modification du plan.
- Conserver l’historique, la logique et la traçabilité des changements.
- Ne jamais créer de plan concurrent.
- Appliquer des changements ciblés, justifiés et vérifiables.
- Maintenir la cohérence stricte avec `DOCUMENT_CADRAGE_FONCTIONNEL.md`.
- Documenter chaque changement important avec motif et impact.

## 10. Informations à valider par Nathan avant toute refonte
- Ordre des prochaines reprises prioritaires entre modules critiques. `À VALIDER PAR NATHAN`
- Niveau de détail attendu dans le plan officiel (macro vs micro-sessions). `À VALIDER PAR NATHAN`
- Traitement des blocs historiques encore utiles. `À VALIDER PAR NATHAN`
- Politique de gestion des dettes transverses dans le plan. `À VALIDER PAR NATHAN`
- Moment exact de la session autorisant la modification du plan officiel. `À VALIDER PAR NATHAN`

## 11. Proposition de méthode pour la future refonte
1. Cadrer les objectifs exacts de la refonte.
2. Identifier les sections du plan à ajuster.
3. Préparer une proposition de diff documentaire ciblée.
4. Soumettre la proposition à validation Nathan.
5. Modifier le plan officiel seulement après validation explicite.
6. Contrôler encodage, cohérence, absence de plan parallèle et traçabilité des changements.

## 12. Ce qui ne doit pas être fait maintenant
- Ne pas modifier `PLAN_DE_DEVELOPPEMENT.md`.
- Ne pas réécrire le plan officiel.
- Ne pas créer de roadmap concurrente.
- Ne pas supprimer d’anciens blocs.
- Ne pas lancer de correction code.
- Ne pas changer les priorités sans validation Nathan.

## 13. Verdict de préparation
Verdict global : **conforme**.

Justification :
- le cadrage de préparation est produit sans modifier le plan officiel ;
- les constats utiles issus des consolidations sont intégrés ;
- les décisions bloquantes sont explicitement renvoyées à Nathan avant toute refonte.

## 14. Prochaine étape recommandée
REBASAGE-42 — contrôle de cohérence entre plan officiel, audits et consolidations avant modification.
