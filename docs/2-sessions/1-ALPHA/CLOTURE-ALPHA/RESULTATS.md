# RESULTATS.md

## 1. Décision patch
`NO_PATCH`

## 2. Analyse rapide
La phase `1-ALPHA` n’est pas globalement validable en l’état du dépôt contrôlé. Le socle applicatif reste partiellement exploitable et testable localement sur certains axes : scripts qualité A13 présents et exécutables, `npm run test:smoke` et `npm run test:targeted` verts, `npm run lint` vert, serveur `npm run dev` démarré et route `/login` servie en `200`.

En revanche, la clôture globale ALPHA reste bloquée par des incohérences transverses réellement prouvées : absence de `CLOTURE_A1`, `ETAT_GLOBAL_PROJET.md` non réaligné sur l’avancement A3→A13, verdicts explicites encore `NON` pour `A2` et `A11`, `A4` non re-clôturé proprement malgré évolution partielle du code, support global toujours non opérable de bout en bout, et traçabilité support encore cassable par `SUPPORT_REASON_REQUIRED` sur plusieurs routes contrôlées.

## 3. Périmètre réellement traité
- documentation maîtresse / gouvernance : `README.md`, `docs/README.md`, `docs/1-master/*`, `docs/PROTOCOLE_SESSION.md`, `docs/SOURCES_AUTORISEES.md`, `docs/STRUCTURE_DOCS.md`, `docs/4-templates/*`
- documentation d’usage / qualité ALPHA : `docs/USAGE_USERS.md`, `docs/USAGE_VEHICLES.md`, `docs/USAGE_TEMPLATES.md`, `docs/USAGE_PLANNING_AUTOSCHEDULE.md`, `docs/SCENARIOS_MANUELS_ALPHA.md`, `docs/QUALITY_TESTS.md`
- sessions et patchs ALPHA : `docs/2-sessions/1-ALPHA/BLOC_A1` à `BLOC_A13`, `docs/3-patches/1-ALPHA/BLOC_A1` à `BLOC_A13`
- code réel ciblé : `package.json`, `prisma.config.ts`, routes `users`, `vehicles`, `audit`, `planning`, services planning / audit / véhicules / dépôts et scripts qualité

## 4. Validation point par point
### AXE 1 — Cohérence globale A1 → A13
1. **Les blocs A1 à A13 forment-ils un ensemble documentaire proprement clôturé ?**
   **Non.** `CLOTURE_A1` est absente, `A2` et `A11` restent documentés `NON`, `A4` reste `NON` sans réalignement documentaire final.

2. **Les clôtures partielles déjà actées se contredisent-elles ?**
   **Oui, partiellement.** Des clôtures tardives `A10` à `A13` existent, alors que `ETAT_GLOBAL_PROJET.md` reste encore centré sur une prochaine étape `CLOTURE_A2`.

3. **Les patchs réellement retenus restent-ils lisibles ?**
   **Partiellement oui.** Les `README_PATCH.md` permettent d’identifier les fixs de référence sur plusieurs sessions, mais la simple présence de nombreux anciens diff abandonnés ou corrompus impose une lecture prudente bloc par bloc.

4. **Un bloc clos repose-t-il sur un état courant contredit par le code ?**
   **Oui, au moins partiellement pour A4.** Le code courant n’expose plus de suppression standard véhicule, alors que la clôture A4 restée `NON` n’a pas été re-jouée avec ce nouvel état. Le résiduel de statut véhicule, lui, n’est toujours pas proprement levé pour l’affectation manuelle.

5. **Existe-t-il un résiduel transversal empêchant une vraie fin de phase ALPHA ?**
   **Oui.** Support global / supportReason / gouvernance de clôture / documentation maîtresse non réalignée.

### AXE 2 — Qualité et validations terminales globales
1. **Les suites documentées existent-elles réellement ?**
   **Oui.** `test:smoke`, `test:targeted`, `test:quality` existent dans `package.json` et les scripts correspondants sont présents.

2. **Restent-elles cohérentes avec le code courant ?**
   **Oui, sur leur périmètre annoncé.** Les deux suites passent dans l’environnement courant.

3. **Les validations terminales utiles à une fin d’ALPHA ont-elles été réellement rejouées ici ?**
   **Partiellement.** `test:smoke`, `test:targeted`, `lint`, `dev` ont été rejoués ; `build` n’est pas revalidé en vert dans l’environnement courant ; `Prisma Studio` n’est pas testable ici sans `DATABASE_URL`.

4. **La qualité réellement atteignable est-elle compatible avec une ALPHA testable ?**
   **Partiellement.** Le serveur démarre et les scripts qualité passent, mais la clôture globale propre reste incomplète.

5. **La base peut-elle passer proprement aux tests locaux manuels sans récit artificiel ?**
   **Non, pas proprement sur le couple demandé `npm run dev / Prisma Studio`.** `npm run dev` démarre, mais `Prisma Studio` n’est pas exploitable dans l’archive courante faute de configuration DB prouvée.

### AXE 3 — Documentation et gouvernance globales
1. **La documentation maîtresse est-elle alignée avec l’état courant ?**
   **Non.** `ETAT_GLOBAL_PROJET.md` est en décalage manifeste.

2. **La documentation d’usage minimale ALPHA existe-t-elle ?**
   **Oui.** Les guides d’usage et scénarios manuels existent réellement.

3. **Les guides présents sont-ils globalement non mensongers ?**
   **Oui, sur le périmètre A13 contrôlé.** Rien n’impose ici de correctif global minimal unique sur ces guides.

4. **La gouvernance documentaire est-elle cohérente bloc à bloc ?**
   **Non.** L’absence de `CLOTURE_A1`, les statuts `NON` maintenus sur `A2` et `A11`, et le retard du master d’état global empêchent de conclure à une cohérence finale.

5. **La documentation de sessions raconte-t-elle des validations non prouvées ?**
   **Pas de mensonge global strictement prouvé sur A13**, mais l’ensemble ALPHA reste hétérogène et non réaligné dans un état final propre.

### AXE 4 — Écarts résiduels et correction minimale
1. **Écarts encore actifs et strictement prouvés**
   - absence de session `CLOTURE_A1`
   - `ETAT_GLOBAL_PROJET.md` non réaligné sur l’état A3→A13
   - `A2` encore `NON` en clôture explicite
   - `A11` encore `NON` en clôture explicite
   - `traceSupportAction(...)` incompatible avec plusieurs appels support réels faute de `supportReason`
   - support global nominal encore dépendant d’un `companyId` de session sur plusieurs routes métier
   - `A4` non re-clôturé et blocage de statut véhicule non prouvé sur affectation manuelle

2. **Ces écarts sont-ils bloquants pour la fin globale ALPHA ?**
   **Oui.** Ils touchent la cohérence de clôture, la gouvernance et un comportement métier transversal support.

3. **Les écarts non bloquants à seulement signaler**
   - warning Node `MODULE_TYPELESS_PACKAGE_JSON` sur tests ciblés
   - impossibilité locale de `prisma generate` dans cet environnement par absence de réseau Prisma

4. **Un correctif global unique est-il justifié ?**
   **Non.** Les résiduels sont multiples, de natures différentes, et dépassent un correctif final minimal unique honnête.

5. **Le choix `NO_PATCH` est-il conforme ?**
   **Oui.** Produire un patch global unique maintenant reviendrait à rouvrir artificiellement plusieurs blocs.

### AXE 5 — Autorisation de passage aux tests locaux
1. `PHASE ALPHA A1-A13 VALIDABLE GLOBALEMENT : NON`
2. `PASSAGE AUX TESTS LOCAUX npm run dev / Prisma Studio AUTORISÉ : NON`
3. `DÉCISION GO / NO-GO TEST ALPHA : NO-GO`
4. aucun blocage supplémentaire inventé : uniquement des écarts prouvés
5. aucune autorisation donnée au-delà du périmètre réellement observé

## 5. Écarts résiduels
- `CLOTURE_A1` absente
- `ETAT_GLOBAL_PROJET.md` non réaligné sur l’état réel A3→A13
- `A2` non clôturé définitivement dans sa dernière clôture explicite
- `A11` non clôturé définitivement dans sa dernière clôture explicite
- `A4` non re-clôturé malgré disparition du flux destructif standard et maintien d’un doute réel sur le blocage statut véhicule en affectation manuelle
- support global non opérable de bout en bout sur plusieurs routes métier exigeant `session.user.companyId`
- `traceSupportAction(...)` encore susceptible d’échec pour un acteur support faute de `supportReason` transmis
- `Prisma Studio` non testable dans le ZIP courant sans configuration locale DB

## 6. Validations réellement exécutées
- `npm ci --ignore-scripts` → `OK`
- `npx prisma generate` → `KO ENVIRONNEMENT` (`EAI_AGAIN binaries.prisma.sh`)
- `npm run test:smoke` → `OK`
- `npm run test:targeted` → `OK`
- `npm run lint` → `OK`
- `npm run build` → `KO DANS L’ENVIRONNEMENT COURANT`
- `npm run dev` → `OK OBSERVÉ`
- `HEAD /login` sur le serveur local démarré → `HTTP 200`
- `npx prisma studio --browser none` → `KO CONFIG` (`No database URL found`)
- `git apply --check` → `NON EXÉCUTÉ — aucun patch code produit`
- `git apply` → `NON EXÉCUTÉ — aucun patch code produit`
- `npx prisma validate` → `NON EXÉCUTÉ — aucun patch Prisma produit dans cette session`

## 7. Verdict de session
- `SESSION CLOTURE-ALPHA TERMINÉE : OUI`
- `PHASE ALPHA A1-A13 COHÉRENTE : NON CONFORME`
- `NIVEAU DE QUALITÉ GLOBAL ALPHA : INCOMPLET`
- `DOCUMENTATION ALPHA GLOBALE : NON CONFORME`
- `CORRECTIONS RÉSIDUELLES BLOQUANTES : OUI`
- `PASSAGE AUX TESTS LOCAUX npm run dev / Prisma Studio AUTORISÉ : NON`
- `DÉCISION GO / NO-GO TEST ALPHA : NO-GO`
- `PHASE ALPHA A1-A13 VALIDABLE GLOBALEMENT : NON`
- `SESSION SUIVANTE LOGIQUE RECOMMANDÉE : À CONFIRMER`

## 8. Fichiers modifiés
### Créés dans la présente session
- `docs/2-sessions/1-ALPHA/BLOC_CLOTURE-ALPHA/SESSION-20260418-17_CLOTURE-ALPHA_CLOTURE-ALPHA/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_CLOTURE-ALPHA/SESSION-20260418-17_CLOTURE-ALPHA_CLOTURE-ALPHA/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_CLOTURE-ALPHA/SESSION-20260418-17_CLOTURE-ALPHA_CLOTURE-ALPHA/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_CLOTURE-ALPHA/SESSION-20260418-17_CLOTURE-ALPHA_CLOTURE-ALPHA/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_CLOTURE-ALPHA/SESSION-20260418-17_CLOTURE-ALPHA_CLOTURE-ALPHA/FIN_SESSION.md`
- `docs/3-patches/1-ALPHA/BLOC_CLOTURE-ALPHA/SESSION-20260418-17_CLOTURE-ALPHA_CLOTURE-ALPHA/README_PATCH.md`
- `docs/3-patches/1-ALPHA/BLOC_CLOTURE-ALPHA/SESSION-20260418-17_CLOTURE-ALPHA_CLOTURE-ALPHA/NO_PATCH.md`
