# CMD — Mémo historique / brouillon opérationnel

> Document informatif uniquement.
>
> Ce fichier peut contenir des commandes, notes, prompts ou règles anciennes.
> Il ne constitue pas une source de vérité de gouvernance.
> Avant toute décision, se référer aux documents maîtres et au protocole de session.

---

tree .\docs /F /A | Out-File -FilePath .\docs\STRUCTURE_DOCS.md -Encoding utf8
tree /F /A | Out-File -FilePath .\docs\1-master\STRUCTURE_PROJET.md -Encoding utf8
git add .
git commit -m "update"
git push

git status

# GPT
--------------------------
Session validée, nous passons à la suite.

Avant de préparer quoi que ce soit, applique strictement les règles suivantes.

============================================================
1. RÈGLE DE LECTURE DOCUMENTAIRE
============================================================

Ne relis pas automatiquement tous les fichiers `.md` de `./docs/1-master` si cela n’est pas nécessaire au périmètre réel de la session.

Relis obligatoirement le noyau documentaire minimal :

- `./docs/1-master/DOCUMENT_MAITRE.md`
- `./docs/1-master/PLAN_DE_DEVELOPPEMENT.md`

Relis également :

- `./docs/3-templates/TEMPLATE_DEBUT_SESSION.md` s’il existe et doit servir de base au prompt de production.

Relis ensuite uniquement les documents complémentaires réellement utiles à la session, par exemple selon le besoin :

- `./docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `./docs/1-master/ETAT_GLOBAL_PROJET.md`
- `./docs/1-master/REGISTRE_DECISIONS.md`
- `./docs/1-master/RECAP_DISCUSSIONS.md`
- `./docs/1-master/STRUCTURE_PROJET.md`
- `./docs/1-master/REFERENCE_UI_UX_A24.md`
- `./docs/README_DOCS.md`
- `./docs/1-master/_INDEX_MASTER.md`
- `./docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- la documentation de la session précédente validée uniquement si elle sert réellement de base à la session en cours ;
- les documents du bloc concerné dans `./docs/2-sessions/1-ALPHA/BLOC_XX/` uniquement si la session s’appuie dessus.

Pour une session liée au bloc A24 UI/UX, utiliser comme référence principale :

`./docs/1-master/MAQUETTE/`

Règles importantes pour A24 :

- le dossier `./docs/1-master/MAQUETTE/` est la référence UI/UX globale du bloc A24 ;
- ne pas limiter l’analyse uniquement à `MAQUETTE_DA`, car ce sous-dossier ne contient pas forcément toutes les références utiles ;
- utiliser `MAQUETTE_DA` comme référence de direction artistique lorsqu’elle couvre le sujet traité ;
- utiliser aussi les autres sous-dossiers, README, specs, mappings, icônes et maquettes disponibles dans `./docs/1-master/MAQUETTE/` lorsqu’ils sont utiles ;
- en cas de contradiction entre une référence ancienne et le contenu validé de `./docs/1-master/MAQUETTE/`, le dossier `./docs/1-master/MAQUETTE/` prime ;
- en cas de contradiction interne entre plusieurs éléments de `./docs/1-master/MAQUETTE/`, la production doit signaler clairement le conflit et écrire exactement :
  `INFORMATION NON FOURNIE — À CONFIRMER`.

Les documents A21/A22 peuvent être consultés uniquement comme historique ou complément si nécessaire, mais ils ne doivent pas primer sur les références actuelles de `./docs/1-master/MAQUETTE/`.

Ne pas utiliser comme source principale :

- les anciens ZIP ;
- les anciens prompts ;
- les anciens brouillons ;
- `CMD.md` sauf demande explicite ;
- les documents historiques non utiles au périmètre ;
- les anciennes références UI/UX si elles contredisent `./docs/1-master/MAQUETTE/`.

La lecture documentaire doit rester ciblée, cohérente et strictement utile à la session.

Interdictions :

- aucun élargissement documentaire inutile ;
- aucun “tout relire” systématique sans nécessité réelle ;
- aucune conclusion fondée sur une information non prouvée.

Toute information non prouvée doit être notée exactement :

`INFORMATION NON FOURNIE — À CONFIRMER`

============================================================
2. RÈGLE D’UTILISATION DES OUTILS
============================================================

Production = Codex dès qu’une session implique :

- le dépôt réel ;
- le code ;
- les fichiers du projet ;
- les patchs ;
- les commandes terminal ;
- les tests ;
- les validations techniques ;
- l’inspection réelle du repo ;
- la comparaison entre routes réelles, fichiers réels et maquettes ;
- la vérification de captures ou assets présents dans le dépôt.

Production = ChatGPT si la session consiste surtout à :

- cadrer ;
- reformuler ;
- préparer ;
- contrôler ;
- analyser une réponse ;
- produire un prompt ;
- produire de la documentation sans accès nécessaire au dépôt réel.

Pour le bloc A24 :

- les sessions d’audit UI/UX qui demandent de comparer les maquettes au repo réel doivent être orientées Codex ;
- les sessions de correction UI/UX doivent être orientées Codex ;
- les sessions de contrôle qualité doivent être orientées ChatGPT.

Production = Codex ou ChatGPT produit également :

- la documentation finale de session ;
- le ZIP documentaire final.

Contrôle qualité = ChatGPT pour :

- analyser la réponse de production ;
- vérifier la conformité méthodologique ;
- identifier ce qui est conforme et non conforme ;
- vérifier le patch si un patch existe ;
- vérifier les validations réellement exécutées ;
- vérifier la documentation finale ;
- vérifier le ZIP documentaire ;
- rédiger un éventuel prompt de retour si nécessaire.

En cas de doute :

- si la session demande d’inspecter ou modifier le repo réel → Codex ;
- si la session demande surtout d’évaluer, cadrer, reformuler, contrôler ou vérifier → ChatGPT ;
- indiquer clairement l’outil recommandé.

============================================================
3. RÈGLE IMPÉRATIVE — PATCH-FIRST EN PRODUCTION
============================================================

La discussion de production avec Codex doit travailler en mode patch-first uniquement si un patch est réellement nécessaire.

Si un patch code est nécessaire :

1. Codex doit générer un patch principal unique au format `.diff`, cohérent avec la session.
2. Ce patch constitue le livrable technique de référence.
3. Une fois le patch généré, Codex peut l’appliquer au dépôt.
4. Les validations terminales pertinentes doivent être relancées après application du patch.
5. Si un correctif ultérieur est nécessaire, il doit être fourni sous forme de patch correctif minimal séparé.
6. Il est interdit de rejouer tout le patch principal dans un correctif.
7. Il est interdit de mélanger un correctif code réel dans une réécriture globale du patch principal déjà appliqué.

Si la session n’exige pas réellement de modification code :

- ne pas forcer artificiellement un patch code ;
- la décision doit être `NO_PATCH_CODE`, `NO_PATCH` ou `PATCH DOCUMENTAIRE` selon le type réel de session ;
- la production doit documenter clairement pourquoi aucun patch code n’est nécessaire.

============================================================
4. RÈGLE CRITIQUE — FORMAT DES PATCHS `.diff`
============================================================

Tous les patchs `.diff` livrés doivent être directement exploitables par `git apply`.

Format obligatoire :

- texte standard ;
- UTF-8 sans BOM ou ASCII ;
- jamais UTF-16 ;
- jamais fichier encodé avec caractères nuls ;
- fins de ligne compatibles Git ;
- première ligne attendue généralement sous la forme `diff --git ...`.

Avant la réponse finale de production, Codex doit vérifier chaque patch `.diff`.

Contrôles obligatoires à documenter dans `EVIDENCES.md` :

- contrôle du début de fichier du patch principal ;
- contrôle du début de fichier du patch documentaire si applicable ;
- preuve que le fichier commence bien par `diff` ;
- absence de BOM UTF-16 ;
- résultat de `git apply --check`.

Exemple de preuve attendue :

Patch principal :
premiers octets : 100 105 102 102
première ligne : diff --git ...
encodage : texte standard / UTF-8 sans BOM ou ASCII
git apply --check : OK, exit code 0

Patch documentaire :
premiers octets : 100 105 102 102
première ligne : diff --git ...
encodage : texte standard / UTF-8 sans BOM ou ASCII
git apply --check : OK, exit code 0

Si le dépôt courant contient déjà les modifications appliquées et que `git apply --check` échoue avec `patch does not apply`, Codex doit vérifier l’applicabilité dans un état propre, par exemple :

- worktree propre ;
- branche temporaire propre ;
- clone propre ;
- reset temporaire maîtrisé si autorisé.

Dans ce cas, la production doit expliquer clairement :

- pourquoi `git apply --check` échoue dans l’arbre courant ;
- où l’applicabilité a été vérifiée ;
- avec quelles commandes exactes ;
- avec quels résultats réels.

Il est interdit de livrer un patch `.diff` qui retourne :

No valid patches in input

============================================================
5. RÈGLE CRITIQUE — PREUVES TERMINALES
============================================================

Les validations terminales ne doivent jamais être seulement résumées par “OK”.

Pour chaque commande exigée ou annoncée, la production doit fournir :

- la commande exacte ;
- un extrait terminal réel ;
- le résultat ;
- le code retour si disponible.

Pour une session avec patch code, vérifier au minimum :

npm run lint
npm run build

Si Prisma est touché, vérifier aussi :

npx prisma validate
npx prisma generate

Si un patch `.diff` est livré, vérifier aussi :

git apply --check "chemin/du/patch.diff"

Les preuves doivent être intégrées dans :

- la réponse finale de production ;
- et/ou `EVIDENCES.md`.

Mais `EVIDENCES.md` doit contenir les preuves utiles à la traçabilité finale.
Il ne suffit pas que les preuves soient uniquement dans le message de conversation.

Une preuve insuffisante doit être notée :

`INFORMATION NON FOURNIE — À CONFIRMER`

============================================================
6. RÈGLE CRITIQUE — DOCUMENTATION FINALE ET ZIP
============================================================

La production doit générer la documentation finale de session.

Fichiers attendus selon la structure habituelle :

- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`
- `PATCH/README_PATCH.md`
- patch principal `.diff` si applicable ;
- patchs correctifs `_FIX-XX.diff` si applicable ;
- patch documentaire `.diff` si applicable ;
- `NO_PATCH.md` si applicable.

Le ZIP documentaire final doit être généré après toutes les modifications finales de documentation et après la régénération éventuelle des patchs.

Le ZIP final doit contenir les versions réellement finales des fichiers.

Avant la réponse finale, Codex doit vérifier le contenu du ZIP et fournir une preuve du type :

ZIP final :
SESSION-YYYYMMDD-XX_BLOC_SESSION_DOCS.zip

Contenu vérifié :
- SESSION.md
- NOTES.md
- EVIDENCES.md
- RESULTATS.md
- FIN_SESSION.md
- PATCH/README_PATCH.md
- PATCH/...

Règles impératives :

- ne pas annoncer un ZIP régénéré sans le joindre ;
- ne pas conclure sur un ancien ZIP ;
- ne pas fournir un ZIP qui ne contient pas les patchs corrigés ;
- ne pas fournir un ZIP dont `EVIDENCES.md` ne contient pas les preuves finales ;
- ne pas utiliser uniquement des liens locaux Windows comme preuve finale.

Dans la réponse finale de production, utiliser de préférence des chemins relatifs au dépôt, par exemple :

`docs/2-sessions/1-ALPHA/BLOC_A24/...`

Éviter les liens locaux absolus du type :

`C:/Users/...`

car ils ne sont pas exploitables directement en contrôle qualité.

============================================================
7. RÈGLE SUR LES SESSIONS MULTIPLES
============================================================

Si une seule session est indiquée, préparer les prompts uniquement pour cette session.

Si plusieurs sessions sont indiquées explicitement, préparer les prompts pour l’ensemble demandé.

Dans le cas de plusieurs sessions traitées ensemble :

- garder un périmètre unique et cohérent ;
- produire un patch principal unique si un patch est réellement nécessaire ;
- produire une documentation finale unique ;
- produire un ZIP documentaire final unique ;
- ne pas mélanger avec des blocs ou sujets non demandés.

============================================================
8. RÈGLES SPÉCIFIQUES AU BLOC A24 — UI/UX GLOBAL
============================================================

Le bloc A24 est :

`A24 — Réalignement UI/UX global sur MAQUETTE`

Référence UI/UX principale :

`./docs/1-master/MAQUETTE/`

Le bloc A24 doit viser :

- une interface très proche des maquettes validées ;
- une structure plus pure et plus simple ;
- une meilleure lisibilité ;
- une densité maîtrisée ;
- des composants cohérents ;
- des icônes propres ;
- une navigation claire ;
- une compatibilité mode clair / mode sombre ;
- des captures avant/après pour les sessions de correction si techniquement possible ;
- aucune direction artistique inventée hors des références présentes dans `./docs/1-master/MAQUETTE/`.

Le mode sombre fait partie du périmètre A24.

Il doit être traité en français sous le nom :

`mode sombre`

Le mode sombre doit être une déclinaison sobre des références UI/UX de `./docs/1-master/MAQUETTE/`, et non une inversion automatique noir/blanc.

Le mode sombre doit respecter :

- fond général sombre ;
- textes clairs ;
- cartes et panneaux légèrement différenciés du fond ;
- bordures sobres ;
- boutons, badges, tableaux et états visuels lisibles ;
- conservation de l’identité visuelle officielle.

Le mode clair reste le thème principal de référence.

Un bouton visible doit permettre de basculer entre mode clair et mode sombre quand la session le prévoit.

Les icônes doivent être auditées et classées.

Lucide React est autorisé pour les icônes génériques si cela améliore la propreté visuelle et évite les initiales ou pictogrammes approximatifs.

Les assets PNG/SVG doivent être conservés uniquement s’ils sont réellement spécifiques à Ambulance Manager, notamment :

- logo ;
- marque ;
- pictogrammes ambulance spécifiques ;
- éléments visuels impossibles ou non pertinents à recréer via Lucide.

Les icônes génériques doivent être remplacées par des composants propres lorsque c’est pertinent.

A24 ne doit pas traiter :

- refonte planning profonde ;
- nouveau moteur planning ;
- autoschedule complet ;
- matching complet ;
- règles métier avancées ;
- refonte RBAC ;
- rôle PSC1 réel ;
- RH avancée ;
- saisie réelle des heures travaillées ;
- paie ;
- primes ;
- suppression physique généralisée ;
- RGPD complet ;
- sécurité avancée ;
- application mobile complète ;
- préparation société pilote ;
- déploiement.

A24 peut réorganiser visuellement l’information pour se rapprocher des références UI/UX, mais il ne doit pas :

- supprimer silencieusement une donnée métier ;
- casser un flux validé ;
- ajouter une fonctionnalité métier ;
- transformer un sujet UI/UX en refonte fonctionnelle.

Si une page réelle contient plus d’informations que la maquette ou la référence visuelle, la correction doit privilégier :

- repli ;
- panneau droit ;
- drawer ;
- onglets ;
- section secondaire ;
- hiérarchie visuelle plus claire.

============================================================
9. SECTION SPÉCIFIQUE À LA SESSION DEMANDÉE
============================================================

Important : cette section doit être adaptée à la session réellement indiquée dans la référence de session.

Ne pas conserver un cadrage spécifique à `A24-UI-01` si la session demandée est `A24-UI-02`, `A24-UI-03`, ou une autre session.

Pour chaque session, le prompt doit reprendre uniquement :

- l’ID exact de session ;
- le stage ;
- le bloc ;
- le type ;
- l’intitulé ;
- le périmètre exact ;
- le livrable attendu ;
- la DoD attendue ;
- les exclusions spécifiques ;
- les fichiers ou zones probablement concernés si connus.

Si la session est une session d’AUDIT :

- ne pas produire de patch code sauf demande explicite exceptionnelle ;
- produire un verdict formel ;
- produire une documentation finale ;
- produire un ZIP documentaire final ;
- produire `NO_PATCH_CODE` si aucun patch code n’est nécessaire ;
- produire un patch documentaire uniquement si la documentation est créée ou modifiée.

Si la session est une session de CORRECTION, COMPLÉTION ou CORRECTION+COMPLÉTION :

- produire un patch code uniquement si une modification code est nécessaire ;
- respecter la règle patch-first ;
- fournir les validations terminales réellement exécutées ;
- produire la documentation finale ;
- produire le ZIP documentaire final ;
- fournir des captures avant/après si techniquement possible ou noter :
  `INFORMATION NON FOURNIE — À CONFIRMER`.

Si la session est une session de VALIDATION ou CLOTURE :

- ne pas corriger hors périmètre ;
- vérifier uniquement ce qui est demandé ;
- produire un verdict clair ;
- produire un patch uniquement si un correctif minimal est explicitement nécessaire ;
- documenter toute absence de preuve.

============================================================
10. RÈGLE IMPORTANTE POUR LES ZIP EN CONTRÔLE
============================================================

Si plusieurs ZIP portant le même nom ont été fournis dans la conversation, le contrôle doit analyser exclusivement le ZIP joint au même message que la réponse finale de production à contrôler.

Ignorer tous les anciens ZIP, même s’ils ont exactement le même nom.

Ne jamais conclure sur un ZIP antérieur.

Le contrôle doit explicitement indiquer :

`Je contrôle uniquement le ZIP joint au message de production concerné.`

Si aucun ZIP n’est joint au message final de production, le contrôle doit écrire :

`INFORMATION NON FOURNIE — À CONFIRMER`

et ne doit pas valider le ZIP sur la base d’un ancien fichier.

============================================================
11. PROMPTS À PRODUIRE
============================================================

Pour la session indiquée ci-dessous, prépare exactement 2 prompts distincts, prêts à copier/coller en texte :

1. PROMPT DE PRODUCTION
2. PROMPT DE CONTRÔLE

Ne fais pas de troisième prompt.

Les prompts doivent être :

- propres ;
- complets ;
- précis ;
- directement copiables/collables ;
- strictement adaptés à la session indiquée ;
- sans éléments inutiles d’une autre session.

============================================================
12. PROMPT DE PRODUCTION — CONTRAINTES ATTENDUES
============================================================

Le prompt de production est destiné à l’outil adapté :

- Codex si la session implique le dépôt réel, le code, les fichiers, les patchs, les commandes ou les validations techniques ;
- ChatGPT si la session est documentaire, préparatoire, de cadrage ou de contrôle sans besoin d’accès au dépôt réel.

Le prompt de production doit :

- être rédigé avec `./docs/3-templates/TEMPLATE_DEBUT_SESSION.md` si applicable ;
- s’appuyer uniquement sur les documents réellement utiles à la session ;
- contenir uniquement les informations concernant la session concernée ;
- demander d’utiliser le dépôt réel si la session est orientée Codex ;
- demander d’utiliser les références UI/UX de `./docs/1-master/MAQUETTE/` pour A24 ;
- rappeler que `MAQUETTE_DA` est une sous-référence importante mais que l’analyse ne doit pas s’y limiter ;
- respecter strictement les règles du projet ;
- interdire l’élargissement de périmètre ;
- interdire l’invention ;
- interdire les modifications hors session ;
- interdire le mélange avec d’autres blocs non demandés ;
- respecter strictement les sources autorisées ;
- respecter le type de session demandé.

Le prompt de production doit demander une réponse finale structurée contenant au minimum :

1. rappel session ;
2. sources réellement lues ;
3. périmètre réellement traité ;
4. fichiers inspectés ;
5. fichiers modifiés ;
6. décision patch :
   - `PATCH CODE`
   - `PATCH DOCUMENTAIRE`
   - `NO_PATCH_CODE`
   - `NO_PATCH`
7. patch principal produit si applicable ;
8. correctifs éventuels ;
9. validations terminales exécutées avec sorties réelles ;
10. preuves d’encodage et d’applicabilité des patchs ;
11. documentation finale produite ;
12. contenu vérifié du ZIP final ;
13. ZIP documentaire final joint ;
14. risques résiduels ;
15. recommandation de passage à la suite.

Le prompt de production doit rappeler explicitement :

- tous les patchs `.diff` doivent être en UTF-8 sans BOM ou ASCII ;
- aucun patch UTF-16 n’est accepté ;
- `git apply --check` doit être prouvé ;
- `EVIDENCES.md` doit contenir les preuves terminales réelles ;
- le ZIP doit être régénéré après les dernières modifications ;
- le ZIP final doit être joint au message final ;
- les chemins doivent être relatifs au dépôt autant que possible.

============================================================
13. PROMPT DE CONTRÔLE — CONTRAINTES ATTENDUES
============================================================

Le prompt de contrôle est destiné à ChatGPT.

Il doit être rédigé pour la discussion de contrôle qualité.

Il doit servir à analyser et évaluer uniquement la réponse issue de la discussion de production.

Il doit attendre que je transmette la réponse finale de production.

Le contrôle ne doit pas :

- rejouer la session ;
- refaire l’audit complet du dépôt ;
- refaire l’analyse complète du code ;
- inventer de validations ;
- combler les manques par hypothèse ;
- conclure sur un ancien ZIP.

Le contrôle doit s’appuyer uniquement sur :

- la réponse finale de production ;
- le patch produit si applicable ;
- les éventuels patchs correctifs minimaux ;
- le patch documentaire si applicable ;
- la documentation finale produite ;
- le ZIP documentaire joint au message de production concerné ;
- les preuves terminales fournies ;
- la documentation officielle du projet réellement utile à la session.

Si une information n’est pas démontrée, écrire exactement :

`INFORMATION NON FOURNIE — À CONFIRMER`

En cas de contradiction :

`RÉPONSE VALIDÉE DE PRODUCTION > BROUILLON / RÉCIT`

Le contrôle doit vérifier notamment :

- respect du périmètre ;
- respect des sources autorisées ;
- décision patch correcte ;
- absence de patch code artificiel ;
- patch principal présent si attendu ;
- patchs `.diff` exploitables ;
- encodage correct des patchs ;
- absence de patch UTF-16 ;
- `git apply --check` prouvé ;
- validations terminales réellement exécutées ;
- `EVIDENCES.md` suffisamment détaillé ;
- documentation finale présente ;
- ZIP documentaire final joint ;
- contenu du ZIP cohérent ;
- absence d’élargissement non demandé.

Pour les sessions A24, le contrôle doit aussi vérifier :

- que `./docs/1-master/MAQUETTE/` a bien été utilisé comme référence principale ;
- que l’analyse ne s’est pas limitée artificiellement à `MAQUETTE_DA` ;
- que `MAQUETTE_DA` reste bien identifié comme référence de direction artistique lorsqu’elle couvre le sujet ;
- que les anciennes références A21/A22 n’ont pas primé sur les références actuelles de `./docs/1-master/MAQUETTE/` ;
- que le mode clair reste le thème principal ;
- que le mode sombre est cadré ou implémenté selon la session ;
- que les icônes génériques sont traitées proprement ;
- que les assets spécifiques Ambulance Manager sont conservés ;
- qu’aucune fonctionnalité métier hors périmètre n’a été ajoutée ;
- qu’aucune refonte profonde planning/autoschedule/matching/RBAC/RH n’a été introduite.

Le contrôle doit produire une sortie structurée avec exactement les sections suivantes :

1. Verdict de conformité
2. Décision patch contrôlée
3. Périmètre réellement contrôlé
4. Résultat du contrôle par sujet
5. Points conformes
6. Points non conformes
7. Informations non démontrées
8. Validations réellement prouvées
9. Conformité documentation finale
10. Conformité ZIP documentaire
11. Décision de contrôle
12. Passage à la suite recommandé
13. Prompt de retour à la production si nécessaire

Si aucun retour n’est nécessaire, écrire :

`Aucun prompt de retour nécessaire.`

============================================================
14. IMPORTANT FINAL
============================================================

Ne prépare que les 2 prompts demandés :

1. un prompt de production ;
2. un prompt de contrôle.

Ne fais pas de troisième prompt.

Les prompts doivent être directement copiables/collables.

Les prompts doivent être rédigés uniquement à partir de la session indiquée ci-dessous.

Ne pas conserver dans les prompts des consignes propres à une autre session.

La lecture documentaire doit rester ciblée :

- noyau minimal obligatoire ;
- documents complémentaires uniquement si utiles à la session ;
- aucun “tout relire” systématique sans nécessité réelle.

La production doit travailler en patch-first uniquement si un patch est réellement nécessaire.

La documentation finale et le ZIP doivent être produits dans la discussion de production.

La discussion de contrôle avec ChatGPT doit vérifier l’ensemble produit, sans rejouer la session.

============================================================
15. RÉFÉRENCE DE LA SESSION
============================================================

- SESSION-20260506-07_A24_A24-UI-07
- **A24-UI-07 — CORRECTION+COMPLÉTION** — Audit, Onboarding, Privacy et pages simples.  
  Périmètre : audit, onboarding, privacy, pages simples, sections, cards, tableaux, filtres, textes, états et finitions globales.  
  Livrable attendu : patch code ciblé pages complémentaires.  
  DoD : les pages complémentaires sont alignées avec la DA officielle et ne créent pas de rupture visuelle.

------------------------------------

Fait moi la commande pour le script de création de sessions pour les sessions suivante.
Exemple de la commande : 
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
Unblock-File -Path .\create_session.ps1
.\create_session.ps1 -Stage "1-ALPHA" -Block "A1" -SessionCode "RBAC-02" -Type "CORRECTION" -Title "Remplacement méthodique de DEA par ADE"

#### Sessions







- **A24-UI-08 — AUDIT** — Audit préparatoire Planning pour A25.  
  Objectif : auditer le planning après application du socle UI A24, sans correction profonde du planning, afin de préparer le bloc A25.  
  Livrable attendu : rapport préparatoire A25 avec captures avant, écarts planning, zones sensibles, risques fonctionnels et recommandations de découpage.  
  DoD : le planning possède une cartographie claire des écarts UI/UX à traiter en A25.

- **A24-UI-09 — VALIDATION** — Validation globale UI/UX post-réalignement.  
  À vérifier : cohérence visuelle globale, respect de `MAQUETTE_DA`, mode clair, mode sombre, navigation connectée, captures avant/après, absence de régression fonctionnelle et pages sœurs cohérentes.  
  Livrable attendu : rapport de validation UI/UX avec preuves terminales, captures et classement des résiduels.  
  DoD : toutes les pages A24 sont validées ou les résiduels sont classés explicitement bloquants / non bloquants.

- **CLOTURE_A24 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION** — Clôture finale du bloc A24.  
  Livrable attendu : contrôle final du bloc UI/UX global, vérification des patchs, preuves, captures, documentation finale et ZIP documentaire.  
  Verdict attendu :
  - `BLOC A24 CLÔTURABLE DÉFINITIVEMENT : OUI`
  - ou
  - `BLOC A24 CLÔTURABLE DÉFINITIVEMENT : NON`


------------------------------------

git apply --check ".\"
git apply ".\"
npx prisma generate
npx prisma validate
npm run lint
npm run build

# Git
git fetch --all --prune
git log --oneline -n 20
git apply --check ".\"
git apply ".\"
git apply -p1 --check docs/patches/general/PATCH_GLOBAL.diff
git apply -p1 docs/patches/general/PATCH_GLOBAL.diff
git apply -p1 --reject docs/patches/general/PATCH_GLOBAL.diff

# Node / Next
npm install
npm run dev
npm run lint
npm run build

# Prisma
npx prisma generate
npx prisma validate
npm run db:migrate
npm run db:seed
npm run db:reset
npm run db:studio

# Identifiants

Identifiants: 

Admin
admin@ambulance.local
adminPasswordA

Planner 
planner@ambulance.local
userPassword

Viewer
viewer@ambulance.local
userPassword