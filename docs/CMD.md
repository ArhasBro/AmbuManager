tree .\docs /F /A | Out-File -FilePath .\docs\STRUCTURE_DOCS.md -Encoding utf8
tree /F /A | Out-File -FilePath .\docs\1-master\STRUCTURE_PROJET.md -Encoding utf8
git add .
git commit -m "update"
git push

git status

# GPT
--------------------------
Session validée, nous passons aux suivantes.

Avant de préparer quoi que ce soit, applique la règle documentaire suivante :

RÈGLE DE LECTURE DOCUMENTAIRE
- Ne relis pas automatiquement tous les fichiers `.md` de `./docs/1-master` si cela n’est pas nécessaire au périmètre de la session.
- Relis obligatoirement le noyau documentaire minimal suivant :
  - `./docs/1-master/DOCUMENT_MAITRE.md`
  - `./docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- Relis également `docs/4-templates/TEMPLATE_DEBUT_SESSION.md` si ce fichier existe et doit servir de base au prompt de production.
- Relis ensuite uniquement les documents supplémentaires réellement utiles à la session concernée, par exemple selon le besoin :
  - `./docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
  - `./docs/1-master/ETAT_GLOBAL_PROJET.md`
  - `./docs/1-master/REGISTRE_DECISIONS.md`
  - `./docs/1-master/RECAP_DISCUSSIONS.md`
  - `./docs/1-master/STRUCTURE_PROJET.md`
  - la documentation de la session précédente validée si elle sert de base à la session en cours
- Aucun élargissement documentaire inutile.
- La lecture documentaire doit rester ciblée, cohérente et strictement utile à la session.

Nous allons faire plusieurs sessions en même temps, donc il faut que ce soit rigoureux. Nous allons faire 1 patch unique pour toutes ces sessions ainsi que 1 documentation unique.

RÈGLE D’UTILISATION DES OUTILS
- **Production = Codex** dès qu’une session implique le dépôt, le code, les fichiers, les patchs, les commandes, les tests ou des validations techniques.
- **Contrôle qualité = ChatGPT** pour analyser la réponse de production, vérifier la conformité méthodologique, identifier ce qui est conforme / non conforme, rédiger le prompt de retour si nécessaire, puis produire la documentation finale de session et le ZIP documentaire.
- **Documentation finale + ZIP = discussion de contrôle avec ChatGPT**, et non discussion de production avec Codex.
- En cas de doute :
  - si la session demande d’inspecter ou modifier le repo réel → **Codex**
  - si la session demande surtout d’évaluer, cadrer, reformuler, contrôler ou documenter → **ChatGPT**

RÈGLE IMPÉRATIVE — PATCH-FIRST EN PRODUCTION
- La discussion de production avec Codex doit travailler en mode **patch-first**.
- Codex ne doit pas commencer par modifier les fichiers un par un de manière dispersée.
- Codex doit d’abord générer **un patch principal unique au format `.diff`**, cohérent avec la session.
- Ce patch principal constitue le livrable technique de référence de la session.
- Une fois ce patch généré, Codex peut l’appliquer au dépôt pour effectuer les modifications.
- Les validations terminales doivent être relancées **après application du patch**.
- Si un correctif ultérieur est nécessaire, il doit être produit sous forme de **patch correctif minimal séparé**.
- Il est interdit de rejouer tout le patch principal dans un correctif.
- La discussion de production ne doit pas générer la documentation finale.
- La discussion de contrôle s’appuie sur :
  - le patch principal réellement produit ;
  - les éventuels patchs correctifs minimaux ;
  - la réponse finale de production ;
  - les validations terminales réellement exécutées ;
  pour produire ensuite la documentation finale et le ZIP.

Pour les sessions indiquées ci-dessous, prépare ensuite **2 prompts distincts**, prêts à copier/coller en texte :

1. **Prompt de production**
   - Ce prompt est destiné à **Codex**.
   - Il doit être rédigé avec le `TEMPLATE_DEBUT_SESSION.md` si applicable, ainsi qu’avec les règles définies dans les documents réellement utiles à la session.
   - Il s’agit du prompt principal d’exécution de la session.
   - Il doit permettre de traiter la session dans la discussion de production avec Codex.
   - Il doit contenir uniquement les informations concernant la ou les sessions concernées.
   - Si besoin de ressources supplémentaires, il s’aide du ZIP joint.
   - Il doit respecter strictement les règles du projet :
     - pas d’élargissement de périmètre ;
     - pas d’invention ;
     - pas de modification hors session ;
     - pas de mélange avec d’autres blocs non demandés ;
     - respect strict des sources autorisées ;
     - respect du type de session demandé.

   Étapes attendues :
   - 1. générer le patch principal unique au format `.diff`
   - 2. appliquer ce patch au dépôt
   - 3. lancer les validations terminales pertinentes
   - 4. produire `README_PATCH.md` si un patch réel existe
   - 5. si un résiduel subsiste, produire un patch correctif minimal séparé
   - 6. si la session est une session sans modification code, produire une sortie de production cohérente avec ce cadre (`NO_PATCH` ou équivalent selon le type réel de session)
   - 7. ne pas produire la documentation finale de session
   - 8. ne pas produire le ZIP documentaire final
   - 9. laisser la documentation finale et le ZIP à la discussion de contrôle avec ChatGPT

   Contraintes de rédaction du prompt de production :
   - rappeler en ouverture l’obligation de relire le noyau documentaire minimal :
     - `DOCUMENT_MAITRE.md`
     - `PLAN_DE_DEVELOPPEMENT.md`
   - rappeler qu’il faut relire uniquement les documents complémentaires réellement nécessaires à la session
   - rappeler les règles de source non négociables
   - préciser clairement :
     - l’ID session
     - le stage
     - le bloc
     - le type
     - l’intitulé
   - rappeler le périmètre exact à traiter
   - interdire explicitement tout élargissement de périmètre
   - imposer explicitement le mode de travail **patch-first**
   - demander d’abord la génération du patch `.diff`, puis son application, puis les validations
   - demander une réponse de production structurée, rigoureuse, exploitable
   - si la session est un AUDIT ou une VALIDATION, ne pas forcer artificiellement un patch
   - si la session est une CORRECTION ou COMPLÉTION, exiger un patch réel, minimal et cohérent avec la session
   - rester compatible avec la règle :
     - **1 patch unique pour toutes les sessions concernées**
     - **1 documentation unique pour toutes les sessions concernées, produite ensuite par ChatGPT dans la discussion de contrôle**

2. **Prompt de contrôle**
   - Ce prompt est destiné à **ChatGPT**.
   - Il doit être rédigé pour la discussion de contrôle qualité.
   - Il doit servir à analyser et évaluer la réponse issue de la discussion de production **UNIQUEMENT**.
   - Il doit analyser la réponse de production en distinguant clairement ce qui est conforme et ce qui est non conforme.
   - Il doit attendre que je t’aie transmis la réponse de la discussion de production.
   - Il doit ensuite produire un prompt de retour adapté, clair et précis, à destination de la discussion de production si nécessaire.
   - Une fois la production jugée conforme ou suffisamment corrigée, c’est cette discussion de contrôle avec ChatGPT qui doit produire la documentation finale de session ainsi que le ZIP documentaire final.
   - Cette documentation finale doit être strictement cohérente avec :
     - le patch principal `.diff` réellement produit ;
     - les éventuels patchs correctifs minimaux ;
     - les validations réellement exécutées ;
     - la réponse finale validée de production.

   Contraintes de rédaction du prompt de contrôle :
   - rappeler que le contrôle ne doit pas rejouer la session
   - rappeler que le contrôle ne doit pas refaire l’analyse du dépôt
   - rappeler que le contrôle doit s’appuyer uniquement sur :
     - la réponse finale de production
     - le patch principal produit
     - les éventuels patchs correctifs minimaux
     - la documentation officielle du projet réellement utile à la session
   - rappeler que si une information n’est pas démontrée, il faut écrire exactement :
     - `INFORMATION NON FOURNIE — À CONFIRMER`
   - rappeler qu’en cas de contradiction :
     - `RÉPONSE VALIDÉE DE PRODUCTION > BROUILLON / RÉCIT`
   - demander une sortie structurée avec :
     - verdict de conformité
     - points conformes
     - points non conformes
     - informations non démontrées
     - décision de contrôle
     - prompt de retour prêt à copier/coller pour la discussion de production
   - préciser qu’après validation du contrôle, cette discussion doit aussi :
     - rédiger les documents finaux de session
     - préparer le contenu du ZIP documentaire final
     - rester strictement cohérente avec les preuves réelles de la production
     - ne pas inventer de validations ou de résultats non démontrés

IMPORTANT
- Ne prépare que les **2 prompts** demandés :
  - **1 prompt de production pour Codex**
  - **1 prompt de contrôle pour ChatGPT**
- Ne fais pas de troisième prompt.
- N’ajoute pas de décision séparée sur l’outil à utiliser : la règle ci-dessus s’applique déjà.
- Les prompts doivent être directement copiables/collables.
- Les prompts doivent être propres, complets, précis et strictement exploitables.
- Les prompts doivent être rédigés uniquement à partir des sessions indiquées ci-dessous.
- La lecture documentaire doit rester ciblée :
  - noyau minimal obligatoire
  - documents complémentaires uniquement si utiles à la session
  - aucun “tout relire” systématique sans nécessité réelle
- La production Codex doit travailler en **patch-first** :
  - générer le `.diff`
  - appliquer le `.diff`
  - lancer les validations
- La documentation finale et le ZIP ne doivent pas être demandés à la production Codex.
- La documentation finale et le ZIP doivent être produits dans la discussion de contrôle avec ChatGPT, à partir :
  - du patch principal réellement produit ;
  - des éventuels correctifs minimaux ;
  - de la réponse de production validée ;
  - des validations terminales réellement constatées.

Références des sessions :

- [À compléter ici]
- **[CODE SESSION] — [TYPE]** — [INTITULÉ SESSION]
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
Exemple de la commande : .\create_session.ps1 -Stage "1-ALPHA" -Block "A1" -SessionCode "RBAC-02" -Type "CORRECTION" -Title "Remplacement méthodique de DEA par ADE"

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

