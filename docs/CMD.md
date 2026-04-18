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
   - Analyser la discusion de la production avec ce qui est conforme et non comforme.
   - Tu doit attendre que je t'ai transmis la réponse de la discussion de production.
   - Faire un prompt de réponse adapté clair et précis pour la discussion production.

Références des session :

- SESSION-20260416-16_A13_CLOTURE_A13
- **CLOTURE_A13 — VALIDATION+CORRECTION+COMPLÉTION** — Clôture finale du bloc A13
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

- **AUDIT-01 — AUDIT** — Audit complet du module audit existant : lecture d’audit du run courant, couverture des opérations critiques, traçabilité des modifications après publication, page dédiée audit, modèle d’accès audit et audit renforcé des actions support
- **AUDIT-LOT-02-09 — CORRECTION-COMPLÉTION** — Correction et/ou complétion de l’audit planning existant, de l’audit des connexions, de l’audit utilisateurs, de l’audit véhicules, de la traçabilité détaillée des modifications après publication, de la page dédiée audit, du modèle d’accès audit et de l’audit renforcé des actions support
- **AUDIT-10 — VALIDATION** — Validation complète du bloc audit / traçabilité : couverture réelle des opérations critiques, lisibilité et exploitabilité de la page audit, cohérence du modèle d’accès et transparence support / client
- **CLOTURE_A11 — VALIDATION+CORRECTION+COMPLÉTION** — Clôture finale du bloc A11

- **A12-01 — AUDIT** — Audit global du bloc onboarding / exports / imports : onboarding actuel réel, besoin import initial réel, existant réel côté exports et impression, et cohérence globale du bloc
- **A12-LOT-02-15 — CORRECTION-COMPLÉTION** — Correction et/ou complétion de l’onboarding manuel complet société pilote, des exports PDF / Excel-CSV / impression simple du planning, des imports utilisateurs / véhicules / templates / bases-dépôts / indisponibilités utilisateurs, de l’aperçu avant import, de la validation manuelle d’import et du rapport d’erreurs import
- **A12-16 — VALIDATION** — Validation complète du bloc onboarding / import / export : onboarding manuel sans import, disponibilité des exports ALPHA, cohérence de la logique d’import initial simple et exploitabilité réelle pour une société pilote
- **CLOTURE_A12 — VALIDATION+CORRECTION+COMPLÉTION** — Clôture finale du bloc A12

- **A13-01 — AUDIT** — Audit global du bloc qualité / documentation / gel ALPHA : tests existants, scénarios manuels documentés, documentation produit existante et cohérence finale ALPHA
- **A13-LOT-02-13 — CORRECTION-COMPLÉTION** — Correction et/ou complétion des scénarios manuels non conformes ou manquants, des smoke tests API critiques, des tests ciblés sur blocs sensibles, de la documentation d’usage users / véhicules / templates / planning-autoschedule, et corrections finales ALPHA si nécessaire
- **A13-14 — VALIDATION** — Validation complète du bloc qualité / documentation / gel ALPHA : cohérence finale ALPHA, niveau de test atteignable, documentation d’usage minimale disponible et décision Go / No-Go société pilote
- **CLOTURE_A13 — VALIDATION+CORRECTION+COMPLÉTION** — Clôture finale du bloc A13

------------------------------------

Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
Unblock-File -Path .\create_session.ps1
.\create_session.ps1 -Stage "1-ALPHA" -Block "A1" -SessionCode "RBAC-02" -Type "CORRECTION" -Title "Remplacement méthodique de DEA par ADE"

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

