tree .\docs /F /A | Out-File -FilePath .\docs\STRUCTURE_DOCS.md -Encoding utf8
tree /F /A | Out-File -FilePath .\docs\1-master\STRUCTURE_PROJET.md -Encoding utf8
git add .
git commit -m "update"
git push

git status

# GPT
--------------------------
Session validée, nous passons aux suivante.

Avant de préparer quoi que ce soit, relis attentivement tous les fichiers `.md` présents dans `./docs/master`. Ces documents sont les références à suivre pour garantir un travail correct, cohérent et méthodologiquement conforme.

Nous allons faire plusieurs sessions en même temps donc faut que se soit rigoureux. nous allons faire 1 patch unique pour toute ces session ainsi que 1 documentation.

Pour les sessions indiquée ci-dessous, prépare ensuite 2 prompts distincts :

1. **Prompt de production**
   - À rédiger avec le `TEMPLATE_DEBUT_SESSION.md` ainsi que sur les règles définies dans les fichiers de `./docs`.
   - Il s’agit du prompt principal.
   - Il doit permettre d’exécuter la session dans la discussion de production.
   - Uniquement les information concernant la session concerné.
   - Si besoin de ressources suplémentaire il s'aide du ZIP joint

   Etape :
   - 1 le patch
   - 2 Validation + génération des docs de la sessions en ZIP (pas de patch pour la documentation) et Readme patch.

2. **Prompt de contrôle**
   - À rédiger pour la discussion de contrôle qualité.
   - Il doit servir à analyser et évaluer la réponse issue de la discussion de production UNIQUEMENT.
   - Tu doit attendre que je t'ai transmis la réponse de la discussion de production.
   - Faire un prompt de réponse adapté pour la discussion production.
   - Le prompt doit être cours et concis.

Références des session :

- SESSION-20260414-04_A7_CLOTURE-A7
- CLOTURE_A7 — VALIDATION** — Clôture finale du bloc A7
------------------------------------
sortie propre + retour du terminal + aucune erreur = validé
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
-les fichiers documentaires de session (`SESSION.md`, `NOTES.md`, `EVIDENCES.md`, `RESULTATS.md`, `FIN_SESSION.md`)
-le fichier documentaire de patches (`README.md`)
Il seront à crée dans le patch docs en 1 ZIP téléchargeable sans sous dossier, quand la session sera validé pour qu'il soient complet.

------------------------------------

Fait moi la commande pour le script de création de sessions pour les sessions suivante.
Exemple de la commande : .\create_session.ps1 -Stage "1-ALPHA" -Block "A1" -SessionCode "RBAC-02" -Type "CORRECTION" -Title "Remplacement méthodique de DEA par ADE"

- **PLAN-01 — AUDIT** — Audit complet du planning manuel existant : vue semaine, vue jour, vue mois, navigation mensuelle, lisibilité métier, ajout/modification/annulation de shifts publiés, historique minimal et traçabilité après publication
- **PLAN-LOT-02-18 — CORRECTION-COMPLÉTION** — Correction et/ou complétion de la vue semaine, de la vue jour, de la vraie vue mois exploitable, de la navigation mensuelle, de la lisibilité métier globale, de l’API/UI d’ajout manuel de shift, de l’API/UI de modification d’un shift publié, de l’API/UI de suppression métier / annulation logique d’un shift publié, de l’historique minimal planning et de la traçabilité des modifications après publication
- **PLAN-19 — VALIDATION** — Validation complète du bloc planning manuel : cohérence des vues jour / semaine / mois, exploitabilité quotidienne, gestion correcte des modifications publiées, historique minimal et traçabilité
- **CLOTURE_A8 — VALIDATION+CORRECTION+COMPLÉTION** — Clôture finale du bloc A8

------------------------------------

Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
Unblock-File -Path .\create_session.ps1
.\create_session.ps1 -Stage "1-ALPHA" -Block "A1" -SessionCode "RBAC-02" -Type "CORRECTION" -Title "Remplacement méthodique de DEA par ADE"


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

