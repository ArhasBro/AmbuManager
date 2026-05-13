# NOTES.md

## Observations structurantes
1. **Structure documentaire réelle présente**
   - les masters `docs/1-master/*` existent ;
   - les guides d’usage ALPHA existent ;
   - les blocs `A1` à `A13` existent côté `docs/2-sessions` et `docs/3-patches`.

2. **Chaîne de qualité A13 réellement présente**
   - `docs/QUALITY_TESTS.md` est présent ;
   - `scripts/quality/smoke-api-critical-contracts.test.mjs` existe ;
   - `scripts/quality/targeted-sensitive-blocks.test.mjs` existe ;
   - les commandes `npm run test:smoke` et `npm run test:targeted` existent réellement dans `package.json`.

3. **Écart documentaire majeur global**
   - `docs/1-master/ETAT_GLOBAL_PROJET.md` reste daté `19/03/2026` et conserve comme “prochaine étape logique unique” la clôture `CLOTURE_A2` ;
   - ce master n’est donc pas aligné avec l’existence documentaire réelle des blocs `A3` à `A13` et de leurs clôtures respectives.

4. **Écart de gouvernance A1**
   - aucune session dédiée `CLOTURE_A1` n’est présente dans l’arborescence réelle contrôlée ;
   - le plan et la structure documentaire attendent pourtant explicitement une clôture dédiée de bloc.

5. **A2 encore non clôturé définitivement dans la documentation réelle**
   - la dernière clôture explicite contrôlée pour `A2` reste `NON` ;
   - le support global nominal reste bloqué par des routes métier dépendant d’un `session.user.companyId`.

6. **A4 non réaligné proprement après évolutions ultérieures**
   - le flux destructif standard véhicule n’est plus exposé dans le code courant ;
   - en revanche, la sélection manuelle planning continue d’accepter des véhicules simplement `isActive`, sans blocage démontré de statut `MAINTENANCE` / `OUT_OF_SERVICE` côté affectation manuelle ;
   - la clôture documentaire `A4` demeure `NON` et n’a pas été rejouée proprement après évolution du code.

7. **A11 encore bloqué dans le code réel**
   - `traceSupportAction(...)` exige `supportReason` pour un acteur `SUPPORT` ;
   - plusieurs appels contrôlés (`users`, `vehicles`, `depots`) ne lui transmettent pas ce champ ;
   - la lecture audit existe, mais l’opérabilité support tracée de bout en bout n’est pas proprement prouvée.

8. **État local de test**
   - `npm run dev` démarre réellement dans l’environnement courant ;
   - `Prisma Studio` ne peut pas être ouvert ici faute de `DATABASE_URL` configurée ;
   - `npm run build` n’a pas été revalidé en vert dans l’environnement courant après installation sans scripts Prisma.
