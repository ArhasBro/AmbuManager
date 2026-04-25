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

RÈGLE DE LECTURE DOCUMENTAIRE

- Ne relis pas automatiquement tous les fichiers `.md` de `./docs/1-master` si cela n’est pas nécessaire au périmètre de la session.

- Relis obligatoirement le noyau documentaire minimal :
  - `./docs/1-master/DOCUMENT_MAITRE.md`
  - `./docs/1-master/PLAN_DE_DEVELOPPEMENT.md`

- Relis également `./docs/3-templates/TEMPLATE_DEBUT_SESSION.md` s’il existe et doit servir de base au prompt de production.

- Relis ensuite uniquement les documents complémentaires réellement utiles à la session, par exemple selon le besoin :
  - `./docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
  - `./docs/1-master/ETAT_GLOBAL_PROJET.md`
  - `./docs/1-master/REGISTRE_DECISIONS.md`
  - `./docs/1-master/RECAP_DISCUSSIONS.md`
  - `./docs/1-master/STRUCTURE_PROJET.md`
  - la documentation de la session précédente validée si elle sert réellement de base à la session en cours ;
  - les documents du bloc concerné dans `./docs/2-sessions/1-ALPHA/BLOC_XX/` si la session s’appuie dessus.

- Pour une session liée à l’UI/UX, utiliser comme référence principale :
  - `./docs/2-sessions/1-ALPHA/BLOC_A21/SESSION-20260425-06_A21_UX-06/REFERENCE_UI_UX_ALPHA_V1.0.md`
  - `./docs/2-sessions/1-ALPHA/BLOC_A21/SESSION-20260425-07_A21_UX-07/A21-UX-07_CLOTURE_DOCUMENTAIRE_UI_UX.md`

- Ne pas utiliser comme référence principale :
  - les anciens ZIP ;
  - les anciens prompts ;
  - les anciens brouillons ;
  - `CMD.md` sauf demande explicite ;
  - `STRUCTURE_DOCS.md` sauf besoin d’arborescence ;
  - les documents historiques non utiles au périmètre.

- La lecture documentaire doit rester ciblée, cohérente et strictement utile à la session.
- Aucun élargissement documentaire inutile.
- Aucun “tout relire” systématique sans nécessité réelle.

RÈGLE D’UTILISATION DES OUTILS

- Production = Codex dès qu’une session implique :
  - le dépôt réel ;
  - le code ;
  - les fichiers du projet ;
  - les patchs ;
  - les commandes terminal ;
  - les tests ;
  - les validations techniques ;
  - l’inspection réelle du repo.

- Production = ChatGPT si la session consiste surtout à :
  - cadrer ;
  - reformuler ;
  - préparer ;
  - contrôler ;
  - analyser une réponse ;
  - produire un prompt ;
  - produire de la documentation sans accès nécessaire au dépôt réel.

- Production = Codex ou ChatGPT produit également :
  - la documentation finale de session ;
  - le ZIP documentaire final.

- Contrôle qualité = ChatGPT pour :
  - analyser la réponse de production ;
  - vérifier la conformité méthodologique ;
  - identifier ce qui est conforme et non conforme ;
  - vérifier le patch si un patch existe ;
  - vérifier les validations réellement exécutées ;
  - vérifier la documentation finale ;
  - vérifier le ZIP documentaire ;
  - rédiger un éventuel prompt de retour si nécessaire.

- En cas de doute :
  - si la session demande d’inspecter ou modifier le repo réel → Codex ;
  - si la session demande surtout d’évaluer, cadrer, reformuler, contrôler ou vérifier → ChatGPT ;
  - indique clairement l’outil recommandé.

RÈGLE IMPÉRATIVE — PATCH-FIRST EN PRODUCTION

- La discussion de production avec Codex doit travailler en mode patch-first uniquement si un patch est réellement nécessaire.
- Si un patch est nécessaire, Codex doit d’abord générer un patch principal unique au format `.diff`, cohérent avec la session.
- Ce patch constitue le livrable technique de référence.
- Une fois le patch généré, Codex peut l’appliquer au dépôt.
- Les validations terminales pertinentes doivent être relancées après application du patch.
- Si un correctif ultérieur est nécessaire, il doit être fourni sous forme de patch correctif minimal séparé.
- Il est interdit de rejouer tout le patch principal dans un correctif.
- Si la session n’exige pas réellement de modification code, il ne faut pas forcer artificiellement un patch.
- Dans ce cas, la décision doit être `NO_PATCH` ou équivalent selon le type réel de session.
- La production doit ensuite générer la documentation finale de session et le ZIP documentaire final.
- La discussion de contrôle vérifie ensuite :
  - le patch principal réellement produit si applicable ;
  - les éventuels patchs correctifs minimaux ;
  - la réponse finale de production ;
  - les validations terminales réellement exécutées ;
  - la documentation finale ;
  - le ZIP documentaire.

RÈGLE SUR LES SESSIONS MULTIPLES

- Si une seule session est indiquée, préparer les prompts uniquement pour cette session.
- Si plusieurs sessions sont indiquées explicitement, préparer les prompts pour l’ensemble demandé.
- Dans le cas de plusieurs sessions traitées ensemble :
  - garder un périmètre unique et cohérent ;
  - produire un patch principal unique si un patch est réellement nécessaire ;
  - produire une documentation finale unique ;
  - produire un ZIP documentaire final unique ;
  - ne pas mélanger avec des blocs ou sujets non demandés.

Pour les sessions indiquées ci-dessous, prépare ensuite 2 prompts distincts, prêts à copier/coller en texte :

1. PROMPT DE PRODUCTION

- Ce prompt est destiné à l’outil de production adapté :
  - Codex si la session implique le dépôt réel, le code, les fichiers, les patchs, les commandes ou les validations techniques ;
  - ChatGPT si la session est documentaire, préparatoire, de cadrage ou de contrôle sans besoin d’accès au dépôt réel.

- Le prompt doit être rédigé avec `./docs/3-templates/TEMPLATE_DEBUT_SESSION.md` si applicable.
- Il doit s’appuyer uniquement sur les documents réellement utiles à la session.
- Il doit contenir uniquement les informations concernant la ou les sessions concernées.
- Si besoin de ressources supplémentaires, il peut demander d’utiliser le ZIP joint.
- Il doit respecter strictement les règles du projet :
  - pas d’élargissement de périmètre ;
  - pas d’invention ;
  - pas de modification hors session ;
  - pas de mélange avec d’autres blocs non demandés ;
  - respect strict des sources autorisées ;
  - respect du type de session demandé.

Étapes attendues dans le prompt de production :

1. relire le noyau documentaire minimal ;
2. relire uniquement les documents complémentaires réellement nécessaires ;
3. analyser le périmètre exact de la session ;
4. si un patch est réellement nécessaire :
   - générer un patch principal unique au format `.diff` ;
   - appliquer ce patch au dépôt ;
   - lancer les validations terminales pertinentes ;
   - produire `README_PATCH.md` ;
5. si un patch n’est pas nécessaire :
   - produire une sortie cohérente avec `NO_PATCH` ;
   - ne pas forcer artificiellement de modification code ;
6. si un résiduel subsiste après patch :
   - produire un patch correctif minimal séparé ;
   - ne pas rejouer tout le patch principal ;
7. produire la documentation finale de session ;
8. produire le ZIP documentaire final.

Contraintes de rédaction du prompt de production :

- rappeler en ouverture l’obligation de relire le noyau documentaire minimal :
  - `DOCUMENT_MAITRE.md`
  - `PLAN_DE_DEVELOPPEMENT.md`

- rappeler qu’il faut relire uniquement les documents complémentaires réellement nécessaires à la session ;

- rappeler les règles de source non négociables ;

- préciser clairement :
  - l’ID session ;
  - le stage ;
  - le bloc ;
  - le type ;
  - l’intitulé ;
  - le périmètre exact à traiter ;
  - les fichiers ou zones probablement concernés si connus ;
  - les exclusions explicites ;

- interdire explicitement tout élargissement de périmètre ;

- imposer le mode patch-first uniquement si un patch est justifié ;

- demander une réponse de production structurée, rigoureuse et exploitable ;

- si la session est un AUDIT, une VALIDATION, un CADRAGE ou une PRÉPARATION :
  - ne pas forcer artificiellement un patch ;
  - produire `NO_PATCH` si aucune modification n’est nécessaire ;

- si la session est une CORRECTION, COMPLÉTION ou IMPLÉMENTATION :
  - exiger un patch réel, minimal et cohérent avec la session ;
  - exiger les validations terminales pertinentes ;

- si plusieurs sessions sont concernées :
  - rester compatible avec la règle d’un patch principal unique si un patch est nécessaire ;
  - produire une documentation unique ;
  - produire un ZIP documentaire unique.

2. PROMPT DE CONTRÔLE

- Ce prompt est destiné à ChatGPT.
- Il doit être rédigé pour la discussion de contrôle qualité.
- Il doit servir à analyser et évaluer la réponse issue de la discussion de production uniquement.
- Il doit distinguer clairement ce qui est conforme et ce qui est non conforme.
- Il doit attendre que je transmette la réponse de la discussion de production.
- Il doit ensuite produire, si nécessaire, un prompt de retour clair et précis à destination de la discussion de production.

Cette discussion de contrôle doit vérifier la cohérence de l’ensemble produit :

- réponse finale de production ;
- patch principal `.diff` si applicable ;
- éventuels patchs correctifs minimaux ;
- validations réellement exécutées ;
- documentation finale ;
- ZIP documentaire ;
- décision `PATCH` ou `NO_PATCH` ;
- respect du périmètre ;
- respect des sources autorisées ;
- absence d’élargissement non demandé.

Contraintes de rédaction du prompt de contrôle :

- rappeler que le contrôle ne doit pas rejouer la session ;
- rappeler que le contrôle ne doit pas refaire l’analyse complète du dépôt ;
- rappeler que le contrôle doit s’appuyer uniquement sur :
  - la réponse finale de production ;
  - le patch principal produit si applicable ;
  - les éventuels patchs correctifs minimaux ;
  - la documentation finale produite ;
  - le ZIP documentaire produit ;
  - les preuves terminales fournies ;
  - la documentation officielle du projet réellement utile à la session ;

- rappeler que si une information n’est pas démontrée, il faut écrire exactement :
  `INFORMATION NON FOURNIE — À CONFIRMER`

- rappeler qu’en cas de contradiction :
  `RÉPONSE VALIDÉE DE PRODUCTION > BROUILLON / RÉCIT`

- demander une sortie structurée avec :
  - verdict de conformité ;
  - décision patch ;
  - périmètre réellement contrôlé ;
  - points conformes ;
  - points non conformes ;
  - informations non démontrées ;
  - validations terminales réellement prouvées ;
  - conformité documentation finale ;
  - conformité ZIP documentaire ;
  - décision de contrôle ;
  - prompt de retour prêt à copier/coller pour la discussion de production si nécessaire.

IMPORTANT

- Ne prépare que les 2 prompts demandés :
  - 1 prompt de production ;
  - 1 prompt de contrôle.

- Ne fais pas de troisième prompt.
- Les prompts doivent être directement copiables/collables.
- Les prompts doivent être propres, complets, précis et strictement exploitables.
- Les prompts doivent être rédigés uniquement à partir des sessions indiquées ci-dessous.
- La lecture documentaire doit rester ciblée :
  - noyau minimal obligatoire ;
  - documents complémentaires uniquement si utiles à la session ;
  - aucun “tout relire” systématique sans nécessité réelle.
- La production doit travailler en patch-first uniquement si un patch est réellement nécessaire.
- La documentation finale et le ZIP doivent être produits dans la discussion de production.
- La discussion de contrôle avec ChatGPT doit vérifier l’ensemble produit, sans rejouer la session.

Références des sessions :

- SESSION-20260425-12_A22_UIINT-03
- **A22-UIINT-03 — CORRECTION+COMPLÉTION** — Socle composants UI communs : `PageHeader`, `ActionButton`, `StatusBadge`, `EmptyState`, `ErrorMessage`. Livrable attendu : socle UI mutualisé. DoD : composants réutilisables sans impact métier.

------------------------------------

Voici sa réponse ainsi que les documents généré :

Je vais intégrer le .diff et je te renvoi le retour terminal de (Si faut enlever ou rajouter des cmd fait moi un copier/coller de ce que tu veux que je fasse): 
git apply --check ".\"
git apply ".\"
npm run lint
npm run build
Attend le retour du terminal avant de me répondre. 
Si il y a Fix a faire rédige le prompt. (Il ne doit pas le refaire en entier, juste faire un fix sur les erreurs) 
Je n'ai pas intégré : 
-les fichiers documentaires de session (SESSION.md, NOTES.md, EVIDENCES.md, RESULTATS.md, FIN_SESSION.md) 
-le fichier documentaire de patches (README.md) Il seront à crée dans le patch docs en 1 ZIP téléchargeable sans sous dossier, quand la session sera validé pour qu'il soient complet.
 
------------------------------------

Fait moi la commande pour le script de création de sessions pour les sessions suivante.
Exemple de la commande : 
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
Unblock-File -Path .\create_session.ps1
.\create_session.ps1 -Stage "1-ALPHA" -Block "A1" -SessionCode "RBAC-02" -Type "CORRECTION" -Title "Remplacement méthodique de DEA par ADE"







- **A22-UIINT-04 — CORRECTION+COMPLÉTION** — Tables / filtres / cartes statistiques : `DataTable`, `FilterBar`, `StatCard`. Livrable attendu : surfaces data homogènes. DoD : états loading / empty / error couverts.

- **A22-UIINT-05 — CORRECTION+COMPLÉTION** — Dashboard : intégration de l’UI dashboard alignée sur la référence A21. Livrable attendu : dashboard harmonisé. DoD : parcours dashboard lisible et cohérent.

- **A22-UIINT-06 — CORRECTION+COMPLÉTION** — Planning : harmonisation UI du planning uniquement. Livrable attendu : planning harmonisé. DoD : lisibilité métier conservée, sans régression fonctionnelle.

- **A22-UIINT-07 — CORRECTION+COMPLÉTION** — Users : harmonisation UI du module utilisateurs / RH. Livrable attendu : écrans users harmonisés. DoD : formulaires et listes users cohérents.

- **A22-UIINT-08 — CORRECTION+COMPLÉTION** — Vehicles : harmonisation UI du module véhicules. Livrable attendu : écrans vehicles harmonisés. DoD : formulaires et listes vehicles cohérents.

- **A22-UIINT-09 — CORRECTION+COMPLÉTION** — Templates : harmonisation UI du module templates. Livrable attendu : écrans templates harmonisés. DoD : édition et listes templates cohérentes.

- **A22-UIINT-10 — CORRECTION+COMPLÉTION** — Company / Dépôts : harmonisation UI des pages société et dépôts. Livrable attendu : cohérence visuelle des modules structure. DoD : formulaires et listes alignés avec le socle UI.

- **A22-UIINT-11 — CORRECTION+COMPLÉTION** — Onboarding : harmonisation UI de l’onboarding. Livrable attendu : écran onboarding harmonisé. DoD : étapes lisibles et cohérentes.

- **A22-UIINT-12 — CORRECTION+COMPLÉTION** — Audit : harmonisation UI du journal d’audit. Livrable attendu : écran audit harmonisé. DoD : filtres et lecture audit lisibles.

- **A22-UIINT-13 — CORRECTION+COMPLÉTION** — Login / Privacy : intégration visuelle des pages simples. Livrable attendu : alignement visuel des pages login et privacy. DoD : cohérence avec les références `Login_V1.1` et `Privacy_V1.0`.

- **CLOTURE_A22 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION** — Clôture finale du bloc intégration code UI/UX / Navigation.
------------------------------------

Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
Unblock-File -Path .\create_session.ps1
.\create_session.ps1 -Stage "1-ALPHA" -Block "A1" -SessionCode "RBAC-02" -Type "CORRECTION" -Title "Remplacement méthodique de DEA par ADE"

- **BACK-01 — AUDIT** — Audit complet du backend existant : routes API, services métier, validations serveur, accès Prisma, cohérence des erreurs et séparation des responsabilités
- **BACK-LOT-02 — CORRECTION+COMPLÉTION** — Correction et/ou complétion de la structure backend : services métier, validations serveur, gestion homogène des erreurs, centralisation des traitements sensibles et cohérence des contrôles RBAC côté serveur
- **BACK-03 — VALIDATION** — Validation complète du backend : cohérence API / logique métier / Prisma / permissions
- **CLOTURE_A14 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION** — Clôture finale du bloc Backend

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


DOCUMENTS À PRODUIRE quand je te le demande (après que je valide le patch). 
SESSION.md 
NOTES.md 
EVIDENCES.md 
RESULTATS.md 
FIN_SESSION.md 
README_PATCH.md

