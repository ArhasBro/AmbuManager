# NOTES

## Méthode / observations

### 1. Base documentaire relue avant validation
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### 2. Stratégie retenue
Validation conduite selon la règle `CODE > DOCUMENTATION`.

La session a été menée en trois temps :
1. relecture du cadrage maître et des documents de sessions `AUTO-01` puis `AUTO-LOT-02-14` ;
2. recontrôle direct du code autoschedule ciblé ;
3. exécution réelle des validations terminales demandées, avec report fidèle des résultats obtenus.

### 3. Observations structurantes issues du code réel

#### Générations JOUR / SEMAINE
Les routes `day` et `week` restent présentes, multi-tenant, protégées par session/permissions, et branchées sur la création réelle de runs de brouillon.

#### Choix gérant réellement exploitable
Le code expose bien un `assignmentMode` explicite avec deux modes réels :
- `SHIFTS_ONLY`
- `AUTO_ASSIGN`

Le mode `AUTO_ASSIGN` déclenche réellement l’auto-affectation après génération du run.

#### Templates actifs réellement pris en compte
Les générations filtrent les templates de la société sur les critères actifs / non archivés / horaires définis.

#### Indisponibilités utilisateurs
Le moteur de matching charge les absences utilisateurs déclarées, les conflits avec shifts publiés et les conflits internes au run. Le publish revalide aussi les absences avant publication.

#### Indisponibilités véhicules
Le moteur contrôle réellement l’occupation véhicule, l’état actif / inactif et le `status=ACTIVE`, ainsi que le type attendu. En revanche, aucun modèle déclaratif dédié d’indisponibilité véhicule n’existe. Le résiduel `PARTIEL` reste donc strictement prouvé.

#### Contraintes rôles / véhicules
Les restrictions rôles / véhicules sont réellement utilisées dans le matching et revalidées au publish.

#### Repos minimum
Le repos minimum reste réellement branché via la règle société `PLANNING_MIN_REST_HOURS` dans le matching et au publish.

#### Lisibilité métier / français
Les messages principaux du matching et la surface autoschedule sont en français exploitable. En revanche, l’historique d’audit affiché dans `/planning` montre encore les codes techniques bruts `action` et `entityType`, ce qui maintient la traduction globale à `PARTIEL`.

### 4. Pourquoi `NO_PATCH`
Aucun nouveau défaut A9 strictement prouvé n’a été trouvé entre l’état livré par `AUTO-LOT-02-14` et le code réel contrôlé. Les deux résiduels encore présents étaient déjà identifiés et restent réels sans imposer, dans cette session de validation, un nouveau correctif A9 minimal évident.

### 5. Validations terminales
Les validations terminales ont été rejouées dans la session et doivent être interprétées strictement comme suit :
- les commandes Prisma ont échoué sur téléchargement externe d’engine ;
- le lint a terminé correctement ;
- le build a échoué localement sur `app/api/company/rules/route.ts`.

Ces exécutions sont conservées comme faits de session, sans transformer `AUTO-15` en session de correction hors périmètre A9.
