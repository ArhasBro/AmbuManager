tree .\docs /F /A | Out-File -FilePath .\docs\STRUCTURE_DOCS.md -Encoding utf8
tree /F /A | Out-File -FilePath .\docs\1-master\STRUCTURE_PROJET.md -Encoding utf8
git add .
git commit -m "update"
git push

git status

# GPT
--------------------------
Session validée, nous passons aux suivantes.

Avant de préparer quoi que ce soit, relis attentivement tous les fichiers `.md` présents dans `./docs/1-master`. Ces documents sont les références à suivre pour garantir un travail correct, cohérent et méthodologiquement conforme.

Nous allons faire plusieurs sessions en même temps, donc il faut que ce soit rigoureux. Nous allons faire 1 patch unique pour toutes ces sessions ainsi que 1 documentation.

RÈGLE D’UTILISATION DES OUTILS
- **Production = Codex** dès qu’une session implique le dépôt, le code, les fichiers, les patchs, les commandes, les tests ou des validations techniques.
- **Contrôle qualité = ChatGPT** pour analyser la réponse de production, vérifier la conformité méthodologique, identifier ce qui est conforme / non conforme, et rédiger le prompt de retour si nécessaire.
- **Documentation finale = ChatGPT par défaut**, sauf si la documentation dépend d’une lecture technique directe du dépôt qui nécessite d’abord Codex.
- En cas de doute :
  - si la session demande d’inspecter ou modifier le repo réel → **Codex**
  - si la session demande surtout d’évaluer, cadrer, reformuler, contrôler ou documenter → **ChatGPT**

Pour les sessions indiquées ci-dessous, prépare ensuite **2 prompts distincts**, prêts à copier/coller en texte :

1. **Prompt de production**
   - Ce prompt est destiné à **Codex**.
   - Il doit être rédigé avec le `TEMPLATE_DEBUT_SESSION.md` ainsi qu’avec les règles définies dans les fichiers de `./docs`.
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
   - 1. le patch
   - 2. validation
   - 3. génération des documents de session en ZIP
   - 4. aucun patch pour la documentation
   - 5. `README_PATCH.md` si un patch réel existe
   - 6. si la session est une session sans modification code, produire la sortie documentaire adaptée (`NO_PATCH` ou équivalent selon le cadre réel de la session)

   Contraintes de rédaction du prompt de production :
   - rappeler en ouverture l’obligation de relire `./docs/1-master`
   - rappeler les règles de source non négociables
   - préciser clairement :
     - l’ID session
     - le stage
     - le bloc
     - le type
     - l’intitulé
   - rappeler le périmètre exact à traiter
   - interdire explicitement tout élargissement de périmètre
   - demander une réponse de production structurée, rigoureuse, exploitable
   - si la session est un AUDIT ou une VALIDATION, ne pas forcer artificiellement un patch
   - si la session est une CORRECTION ou COMPLÉTION, exiger un patch réel, minimal et cohérent avec la session
   - rester compatible avec la règle :
     - **1 patch unique pour toutes les sessions concernées**
     - **1 documentation unique pour toutes les sessions concernées**

2. **Prompt de contrôle**
   - Ce prompt est destiné à **ChatGPT**.
   - Il doit être rédigé pour la discussion de contrôle qualité.
   - Il doit servir à analyser et évaluer la réponse issue de la discussion de production **UNIQUEMENT**.
   - Il doit analyser la réponse de production en distinguant clairement ce qui est conforme et ce qui est non conforme.
   - Il doit attendre que je t’aie transmis la réponse de la discussion de production.
   - Il doit ensuite produire un prompt de retour adapté, clair et précis, à destination de la discussion de production.

   Contraintes de rédaction du prompt de contrôle :
   - rappeler que le contrôle ne doit pas rejouer la session
   - rappeler que le contrôle ne doit pas refaire l’analyse du dépôt
   - rappeler que le contrôle doit s’appuyer uniquement sur :
     - la réponse finale de production
     - la documentation officielle du projet
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

IMPORTANT
- Ne prépare que les **2 prompts** demandés :
  - **1 prompt de production pour Codex**
  - **1 prompt de contrôle pour ChatGPT**
- Ne fais pas de troisième prompt.
- N’ajoute pas de décision séparée sur l’outil à utiliser : la règle ci-dessus s’applique déjà.
- Les prompts doivent être directement copiables/collables.
- Les prompts doivent être propres, complets, précis et strictement exploitables.
- Les prompts doivent être rédigés uniquement à partir des sessions indiquées ci-dessous.

Références des sessions :

- SESSION-20260423-02_A15_FRONT-LOT-02
- **FRONT-LOT-02 — CORRECTION+COMPLÉTION** — Correction et/ou complétion du frontend : homogénéisation visuelle, amélioration des écrans critiques, lisibilité métier, gestion cohérente du thème, préparation d’une UX plus propre
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

