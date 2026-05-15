# NOTES

Notes de travail de la session.

---

## Methode / observations

1. Lecture cible et bornage
- references A26 et references UI/UX Templates chargees ;
- maquette image officielle `Templates_V1.1.png` relue ;
- travail strictement borne a `/templates`.

2. Strategie de correction
- corriger en priorite les libelles FR mal encodes ;
- ajuster seulement les styles necessaires KPI/table/detail/badges/selection/bouton danger ;
- conserver les formulaires avances hors vue principale par defaut ;
- ne pas toucher au fonctionnel metier.

3. Point technique patch
- le patch principal de session etait deja applique dans l'etat courant ;
- le patch FIX-01 a ete valide avec `git apply --check` sur un etat baseline "apres patch principal" (worktree temporaire), puis cette worktree a ete supprimee.

4. Contrainte environnement relevee apres livraison
- pendant verification de connexion utilisateur, la base locale etait indisponible (Docker PostgreSQL non demarre) ;
- correction operationnelle communiquee a Nathan, puis confirmation utilisateur : Docker etait eteint.