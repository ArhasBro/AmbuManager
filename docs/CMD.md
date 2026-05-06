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

Avant de préparer quoi que ce soit, applique les règles suivantes.

============================================================

RÈGLE DE LECTURE DOCUMENTAIRE
============================================================

Ne relis pas automatiquement tous les fichiers .md de ./docs/1-master si cela n’est pas nécessaire au périmètre de la session.

Relis obligatoirement le noyau documentaire minimal :

./docs/1-master/DOCUMENT_MAITRE.md
./docs/1-master/PLAN_DE_DEVELOPPEMENT.md

Relis également ./docs/3-templates/TEMPLATE_DEBUT_SESSION.md s’il existe et doit servir de base au prompt de production.

Relis ensuite uniquement les documents complémentaires réellement utiles à la session, par exemple selon le besoin :

./docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md
./docs/1-master/ETAT_GLOBAL_PROJET.md
./docs/1-master/REGISTRE_DECISIONS.md
./docs/1-master/RECAP_DISCUSSIONS.md
./docs/1-master/STRUCTURE_PROJET.md
./docs/1-master/REFERENCE_UI_UX_A24.md
./docs/README_DOCS.md
./docs/1-master/_INDEX_MASTER.md
./docs/1-master/MAQUETTE/README_MAQUETTES_A24.md
la documentation de la session précédente validée si elle sert réellement de base à la session en cours ;
les documents du bloc concerné dans ./docs/2-sessions/1-ALPHA/BLOC_XX/ si la session s’appuie dessus.

Pour une session liée au bloc A24 UI/UX, utiliser comme référence principale :

./docs/1-master/MAQUETTE/

Important :

le dossier ./docs/1-master/MAQUETTE/ doit être considéré comme la référence UI/UX globale du bloc A24 ;
ne pas limiter l’analyse uniquement à MAQUETTE_DA, car ce sous-dossier ne contient pas forcément toutes les références utiles ;
utiliser MAQUETTE_DA comme référence de direction artistique quand elle couvre le sujet traité ;
utiliser également les autres sous-dossiers, README, specs, mappings, icônes et maquettes disponibles dans ./docs/1-master/MAQUETTE/ lorsqu’ils sont utiles ;
en cas de contradiction entre une référence ancienne et le contenu validé de ./docs/1-master/MAQUETTE/, le dossier ./docs/1-master/MAQUETTE/ prime ;
en cas de contradiction interne entre plusieurs éléments de ./docs/1-master/MAQUETTE/, la production doit signaler clairement le conflit et écrire : INFORMATION NON FOURNIE — À CONFIRMER.

Les documents A21/A22 peuvent être consultés uniquement comme historique ou complément si nécessaire, mais ils ne doivent pas primer sur les références actuelles de ./docs/1-master/MAQUETTE/.

Ne pas utiliser comme source principale :

les anciens ZIP ;
les anciens prompts ;
les anciens brouillons ;
CMD.md sauf demande explicite ;
les documents historiques non utiles au périmètre ;
les anciennes références UI/UX si elles contredisent ./docs/1-master/MAQUETTE/.

La lecture documentaire doit rester ciblée, cohérente et strictement utile à la session.

Aucun élargissement documentaire inutile.
Aucun “tout relire” systématique sans nécessité réelle.

Toute information non prouvée doit être notée exactement :

INFORMATION NON FOURNIE — À CONFIRMER

============================================================
2. RÈGLE D’UTILISATION DES OUTILS

Production = Codex dès qu’une session implique :

le dépôt réel ;
le code ;
les fichiers du projet ;
les patchs ;
les commandes terminal ;
les tests ;
les validations techniques ;
l’inspection réelle du repo ;
la comparaison entre routes réelles, fichiers réels et maquettes ;
la vérification de captures ou assets présents dans le dépôt.

Production = ChatGPT si la session consiste surtout à :

cadrer ;
reformuler ;
préparer ;
contrôler ;
analyser une réponse ;
produire un prompt ;
produire de la documentation sans accès nécessaire au dépôt réel.

Pour le bloc A24 :

les sessions d’audit UI/UX qui demandent de comparer les maquettes au repo réel doivent être orientées Codex ;
les sessions de correction UI/UX doivent être orientées Codex ;
les sessions de contrôle qualité doivent être orientées ChatGPT.

Production = Codex ou ChatGPT produit également :

la documentation finale de session ;
le ZIP documentaire final.

Contrôle qualité = ChatGPT pour :

analyser la réponse de production ;
vérifier la conformité méthodologique ;
identifier ce qui est conforme et non conforme ;
vérifier le patch si un patch existe ;
vérifier les validations réellement exécutées ;
vérifier la documentation finale ;
vérifier le ZIP documentaire ;
rédiger un éventuel prompt de retour si nécessaire.

En cas de doute :

si la session demande d’inspecter ou modifier le repo réel → Codex ;
si la session demande surtout d’évaluer, cadrer, reformuler, contrôler ou vérifier → ChatGPT ;
indique clairement l’outil recommandé.
============================================================
3. RÈGLE IMPÉRATIVE — PATCH-FIRST EN PRODUCTION

La discussion de production avec Codex doit travailler en mode patch-first uniquement si un patch est réellement nécessaire.

Si un patch est nécessaire :

Codex doit d’abord générer un patch principal unique au format .diff, cohérent avec la session ;
ce patch constitue le livrable technique de référence ;
une fois le patch généré, Codex peut l’appliquer au dépôt ;
les validations terminales pertinentes doivent être relancées après application du patch ;
si un correctif ultérieur est nécessaire, il doit être fourni sous forme de patch correctif minimal séparé ;
il est interdit de rejouer tout le patch principal dans un correctif.

Si la session n’exige pas réellement de modification code :

il ne faut pas forcer artificiellement un patch code ;
la décision doit être NO_PATCH_CODE, NO_PATCH ou PATCH DOCUMENTAIRE selon le type réel de session ;
la production doit documenter clairement pourquoi aucun patch code n’est nécessaire.

La production doit ensuite générer :

la documentation finale de session ;
le ZIP documentaire final.

La discussion de contrôle vérifie ensuite :

le patch principal réellement produit si applicable ;
les éventuels patchs correctifs minimaux ;
la réponse finale de production ;
les validations terminales réellement exécutées ;
la documentation finale ;
le ZIP documentaire.
============================================================
4. RÈGLE SUR LES SESSIONS MULTIPLES

Si une seule session est indiquée, préparer les prompts uniquement pour cette session.

Si plusieurs sessions sont indiquées explicitement, préparer les prompts pour l’ensemble demandé.

Dans le cas de plusieurs sessions traitées ensemble :

garder un périmètre unique et cohérent ;
produire un patch principal unique si un patch est réellement nécessaire ;
produire une documentation finale unique ;
produire un ZIP documentaire final unique ;
ne pas mélanger avec des blocs ou sujets non demandés.
============================================================
5. RÈGLES SPÉCIFIQUES AU BLOC A24 — UI/UX GLOBAL

Le bloc A24 est :

A24 — Réalignement UI/UX global sur MAQUETTE

Référence UI/UX principale :

./docs/1-master/MAQUETTE/

Le bloc A24 doit viser :

une interface très proche des maquettes validées ;
une structure plus pure et plus simple ;
une meilleure lisibilité ;
une densité maîtrisée ;
des composants cohérents ;
des icônes propres ;
une navigation claire ;
une compatibilité mode clair / mode sombre ;
des captures avant/après pour les sessions de correction ;
aucune direction artistique inventée hors des références présentes dans ./docs/1-master/MAQUETTE/.

Le mode sombre fait partie du périmètre A24.

Il doit être traité en français sous le nom :

mode sombre

Le mode sombre doit être une déclinaison sobre des références UI/UX de ./docs/1-master/MAQUETTE/, et non une inversion automatique noir/blanc.

Le mode sombre doit respecter :

fond général sombre ;
textes clairs ;
cartes et panneaux légèrement différenciés du fond ;
bordures sobres ;
boutons, badges, tableaux et états visuels lisibles ;
conservation de l’identité visuelle officielle.

Le mode clair reste le thème principal de référence.

Un bouton visible doit permettre de basculer entre mode clair et mode sombre quand la session le prévoit.

Les icônes doivent être auditées et classées.

Lucide React est autorisé pour les icônes génériques si cela améliore la propreté visuelle et évite les initiales ou pictogrammes approximatifs.

Les assets PNG/SVG doivent être conservés uniquement s’ils sont réellement spécifiques à Ambulance Manager, notamment :

logo ;
marque ;
pictogrammes ambulance spécifiques ;
éléments visuels impossibles ou non pertinents à recréer via Lucide.

Les icônes génériques doivent être remplacées par des composants propres lorsque c’est pertinent.

A24 ne doit pas traiter :

refonte planning profonde ;
nouveau moteur planning ;
autoschedule complet ;
matching complet ;
règles métier avancées ;
refonte RBAC ;
rôle PSC1 réel ;
RH avancée ;
saisie réelle des heures travaillées ;
paie ;
primes ;
suppression physique généralisée ;
RGPD complet ;
sécurité avancée ;
application mobile complète ;
préparation société pilote ;
déploiement.

A24 peut réorganiser visuellement l’information pour se rapprocher des références UI/UX, mais il ne doit pas :

supprimer silencieusement une donnée métier ;
casser un flux validé ;
ajouter une fonctionnalité métier ;
transformer un sujet UI/UX en refonte fonctionnelle.

Si une page réelle contient plus d’informations que la maquette ou la référence visuelle, la correction doit privilégier :

repli ;
panneau droit ;
drawer ;
onglets ;
section secondaire ;
hiérarchie visuelle plus claire.
============================================================
6. RÈGLES SPÉCIFIQUES À A24-UI-01

La session A24-UI-01 est une session d’AUDIT.

Elle doit être orientée vers Codex, car elle demande d’inspecter :

le repo réel ;
les fichiers app/ ;
les composants UI ;
les styles ;
les routes ;
les maquettes ;
les icônes ;
les assets ;
les documents UI/UX ;
les correspondances entre page, route et fichier code.

A24-UI-01 ne doit pas corriger le code applicatif.

A24-UI-01 ne doit pas produire de patch code.

Décision attendue :

NO_PATCH_CODE si aucune modification n’est nécessaire ;
ou PATCH DOCUMENTAIRE si la session complète uniquement la documentation d’audit.

Livrable attendu :

audit UI/UX global ;
matrice page → maquette/référence → route → fichier code ;
inventaire des références disponibles dans ./docs/1-master/MAQUETTE/ ;
classement des pages couvertes ;
classement des pages non couvertes ;
verdict visuel par page : conforme / non conforme / incomplet / à confirmer ;
audit des icônes ;
classement des icônes :
asset spécifique à conserver ;
icône générique à remplacer par Lucide React ;
icône à refaire ou à confirmer ;
cadrage du mode sombre ;
cadrage du responsive minimal ;
préparation de l’ordre de correction des sessions A24-UI-02 à A24-UI-09 ;
identification des risques de régression ;
exclusions explicites ;
recommandations de correction.

DoD attendu :

Chaque page couverte possède un verdict visuel :

conforme ;
non conforme ;
incomplet ;
à confirmer.

Aucune correction applicative ne doit être réalisée pendant A24-UI-01.

============================================================
7. RÈGLE IMPORTANTE POUR LES ZIP EN CONTRÔLE

Si plusieurs ZIP portant le même nom ont été fournis dans la conversation, le contrôle doit analyser exclusivement le ZIP joint au même message que la réponse finale de production à contrôler.

Ignorer tous les anciens ZIP, même s’ils ont exactement le même nom.

Ne jamais conclure sur un ZIP antérieur.

Le contrôle doit explicitement indiquer qu’il contrôle uniquement le ZIP joint au message de production concerné.

============================================================
8. PROMPTS À PRODUIRE

Pour les sessions indiquées ci-dessous, prépare 2 prompts distincts, prêts à copier/coller en texte :

PROMPT DE PRODUCTION

Ce prompt est destiné à l’outil de production adapté :

Codex si la session implique le dépôt réel, le code, les fichiers, les patchs, les commandes ou les validations techniques ;
ChatGPT si la session est documentaire, préparatoire, de cadrage ou de contrôle sans besoin d’accès au dépôt réel.

Pour A24-UI-01, l’outil recommandé est Codex.

Le prompt de production doit :

être rédigé avec ./docs/3-templates/TEMPLATE_DEBUT_SESSION.md si applicable ;
s’appuyer uniquement sur les documents réellement utiles à la session ;
contenir uniquement les informations concernant la session concernée ;
demander d’utiliser le dépôt réel ;
demander d’utiliser les références UI/UX de ./docs/1-master/MAQUETTE/ ;
rappeler que MAQUETTE_DA est une sous-référence importante mais que l’analyse ne doit pas s’y limiter ;
respecter strictement les règles du projet :
pas d’élargissement de périmètre ;
pas d’invention ;
pas de modification hors session ;
pas de mélange avec d’autres blocs non demandés ;
respect strict des sources autorisées ;
respect du type de session demandé.

Étapes attendues dans le prompt de production :

relire le noyau documentaire minimal ;
relire uniquement les documents complémentaires réellement nécessaires ;
inspecter ./docs/1-master/MAQUETTE/ ;
inspecter les routes et fichiers réels nécessaires pour établir la matrice page → maquette/référence → route → fichier code ;
analyser le périmètre exact de la session ;
produire l’audit UI/UX global ;
ne pas produire de patch code ;
produire éventuellement un patch documentaire si la documentation de session ou d’audit est créée/modifiée ;
produire la documentation finale de session ;
produire le ZIP documentaire final.

Contraintes de rédaction du prompt de production :

rappeler en ouverture l’obligation de relire le noyau documentaire minimal :
DOCUMENT_MAITRE.md
PLAN_DE_DEVELOPPEMENT.md
rappeler qu’il faut relire uniquement les documents complémentaires réellement nécessaires à la session ;
rappeler les règles de source non négociables ;
préciser clairement :
l’ID session ;
le stage ;
le bloc ;
le type ;
l’intitulé ;
le périmètre exact à traiter ;
les fichiers ou zones probablement concernés si connus ;
les exclusions explicites ;
interdire explicitement tout élargissement de périmètre ;
interdire explicitement tout patch code pour A24-UI-01 ;
demander une réponse de production structurée, rigoureuse et exploitable ;
produire NO_PATCH_CODE si aucune modification documentaire n’est nécessaire ;
produire PATCH DOCUMENTAIRE uniquement si des fichiers documentaires sont créés ou modifiés ;
produire un ZIP documentaire final.
PROMPT DE CONTRÔLE

Ce prompt est destiné à ChatGPT.

Il doit être rédigé pour la discussion de contrôle qualité.

Il doit servir à analyser et évaluer la réponse issue de la discussion de production uniquement.

Il doit attendre que je transmette la réponse de la discussion de production.

Il doit ensuite produire, si nécessaire, un prompt de retour clair et précis à destination de la discussion de production.

La discussion de contrôle doit vérifier la cohérence de l’ensemble produit :

réponse finale de production ;
décision NO_PATCH_CODE, PATCH DOCUMENTAIRE, PATCH ou NO_PATCH ;
patch documentaire si applicable ;
absence de patch code artificiel ;
validations réellement exécutées ;
documentation finale ;
ZIP documentaire ;
respect du périmètre ;
respect des sources autorisées ;
absence d’élargissement non demandé.

Contraintes de rédaction du prompt de contrôle :

rappeler que le contrôle ne doit pas rejouer la session ;
rappeler que le contrôle ne doit pas refaire l’analyse complète du dépôt ;
rappeler que le contrôle doit s’appuyer uniquement sur :
la réponse finale de production ;
le patch produit si applicable ;
les éventuels patchs correctifs minimaux ;
la documentation finale produite ;
le ZIP documentaire joint au message de production concerné ;
les preuves terminales fournies ;
la documentation officielle du projet réellement utile à la session ;
rappeler que si une information n’est pas démontrée, il faut écrire exactement :
INFORMATION NON FOURNIE — À CONFIRMER
rappeler qu’en cas de contradiction :
RÉPONSE VALIDÉE DE PRODUCTION > BROUILLON / RÉCIT
rappeler la règle ZIP :
si plusieurs ZIP portent le même nom, contrôler uniquement le ZIP joint au message de production à contrôler et ignorer les anciens ZIP.

Contrôle spécifique A24-UI-01 :

Le contrôle doit vérifier :

que ./docs/1-master/MAQUETTE/ a bien été utilisé comme référence principale ;
que l’analyse ne s’est pas limitée artificiellement à MAQUETTE_DA ;
que MAQUETTE_DA reste bien identifié comme référence de direction artistique lorsqu’elle couvre le sujet ;
que les anciennes références A21/A22 n’ont pas primé sur les références actuelles de ./docs/1-master/MAQUETTE/ ;
que la matrice page → maquette/référence → route → fichier code est fournie ;
que chaque page possède un verdict visuel ;
que les icônes sont auditées et classées ;
que le mode sombre est cadré ;
que le responsive minimal est cadré ;
que le planning est seulement audité pour préparer A25, sans correction profonde ;
qu’aucune fonctionnalité métier hors périmètre n’a été ajoutée ;
qu’aucun patch code n’a été produit artificiellement pour A24-UI-01 ;
que la documentation finale et le ZIP sont présents ;
que le ZIP contrôlé est bien celui joint au message de production concerné.

Demander une sortie structurée avec :

verdict de conformité ;
décision patch ;
périmètre réellement contrôlé ;
résultat du contrôle par sujet ;
points conformes ;
points non conformes ;
informations non démontrées ;
validations réellement prouvées ;
conformité documentation finale ;
conformité ZIP documentaire ;
décision de contrôle ;
passage à la suite recommandé ou non ;
prompt de retour prêt à copier/coller pour la discussion de production si nécessaire.
============================================================
9. IMPORTANT

Ne prépare que les 2 prompts demandés :

1 prompt de production ;
1 prompt de contrôle.

Ne fais pas de troisième prompt.

Les prompts doivent être directement copiables/collables.

Les prompts doivent être propres, complets, précis et strictement exploitables.

Les prompts doivent être rédigés uniquement à partir de la session indiquée ci-dessous.

La lecture documentaire doit rester ciblée :

noyau minimal obligatoire ;
documents complémentaires uniquement si utiles à la session ;
aucun “tout relire” systématique sans nécessité réelle.

La production doit travailler en patch-first uniquement si un patch est réellement nécessaire.

A24-UI-01 ne doit pas produire de patch code.

La documentation finale et le ZIP doivent être produits dans la discussion de production.

La discussion de contrôle avec ChatGPT doit vérifier l’ensemble produit, sans rejouer la session.

============================================================
10. RÉFÉRENCE DE LA SESSION

- SESSION-20260506-03_A24_A24-UI-03
- **A24-UI-03 — CORRECTION+COMPLÉTION** — Login et Dashboard.  
  Périmètre : page login, dashboard, cartes d’accès, cards de synthèse, icônes, hiérarchie visuelle, fond, espacements, mode clair et mode sombre.  
  Livrable attendu : patch code ciblé Login + Dashboard.  
  DoD : Login et Dashboard sont proches de `MAQUETTE_DA`, simples, lisibles et fonctionnels.

------------------------------------

Fait moi la commande pour le script de création de sessions pour les sessions suivante.
Exemple de la commande : 
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
Unblock-File -Path .\create_session.ps1
.\create_session.ps1 -Stage "1-ALPHA" -Block "A1" -SessionCode "RBAC-02" -Type "CORRECTION" -Title "Remplacement méthodique de DEA par ADE"

#### Sessions

- **A24-UI-03 — CORRECTION+COMPLÉTION** — Login et Dashboard.  
  Périmètre : page login, dashboard, cartes d’accès, cards de synthèse, icônes, hiérarchie visuelle, fond, espacements, mode clair et mode sombre.  
  Livrable attendu : patch code ciblé Login + Dashboard.  
  DoD : Login et Dashboard sont proches de `MAQUETTE_DA`, simples, lisibles et fonctionnels.

- **A24-UI-04 — CORRECTION+COMPLÉTION** — Société et Dépôts.  
  Périmètre : page société, pages dépôts / bases, formulaires, cards, sections, tableaux, boutons, badges, panneaux et cohérence visuelle.  
  Livrable attendu : patch code ciblé Société + Dépôts.  
  DoD : les pages de structure société sont sobres, lisibles et alignées avec la DA officielle.

- **A24-UI-05 — CORRECTION+COMPLÉTION** — Véhicules et Templates.  
  Périmètre : pages véhicules, pages templates, tableaux, filtres, badges, formulaires, détails, états visuels, actions principales et secondaires.  
  Livrable attendu : patch code ciblé Véhicules + Templates.  
  DoD : les pages référentielles métier sont propres, cohérentes et visuellement proches de `MAQUETTE_DA`.

- **A24-UI-06 — CORRECTION+COMPLÉTION** — Utilisateurs / RH visuel.  
  Périmètre : page utilisateurs, liste, filtres, création, édition, fiche utilisateur, badges rôles/statuts et cohérence RH visible.  
  Livrable attendu : patch code ciblé Users / RH visuel.  
  DoD : la page Utilisateurs / RH est plus pure, plus lisible, alignée avec `MAQUETTE_DA`, sans ajout de RH avancée.

- **A24-UI-07 — CORRECTION+COMPLÉTION** — Audit, Onboarding, Privacy et pages simples.  
  Périmètre : audit, onboarding, privacy, pages simples, sections, cards, tableaux, filtres, textes, états et finitions globales.  
  Livrable attendu : patch code ciblé pages complémentaires.  
  DoD : les pages complémentaires sont alignées avec la DA officielle et ne créent pas de rupture visuelle.

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