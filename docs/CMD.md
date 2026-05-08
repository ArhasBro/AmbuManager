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

Prépare exactement 2 prompts distincts, prêts à copier/coller :

1. PROMPT DE PRODUCTION
2. PROMPT DE CONTRÔLE

Ne prépare pas de troisième prompt.

============================================================
1. RÈGLES GÉNÉRALES
============================================================

La lecture documentaire doit être ciblée.

À lire obligatoirement :

- ./docs/1-master/DOCUMENT_MAITRE.md
- ./docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- ./docs/3-templates/TEMPLATE_DEBUT_SESSION.md s’il existe et s’il sert de base au prompt.

Lire ensuite uniquement les documents utiles à la session, par exemple :

- ./docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md
- ./docs/1-master/ETAT_GLOBAL_PROJET.md
- ./docs/1-master/REGISTRE_DECISIONS.md
- ./docs/1-master/RECAP_DISCUSSIONS.md
- ./docs/1-master/STRUCTURE_PROJET.md
- ./docs/1-master/REFERENCE_UI_UX_A24.md
- ./docs/1-master/MAQUETTE/README_MAQUETTES_A24.md
- la documentation de la session précédente seulement si elle sert réellement de base.

Interdictions :

- ne pas tout relire par réflexe ;
- ne pas élargir le périmètre ;
- ne pas inventer ;
- ne pas conclure sans preuve.

Toute information non prouvée doit être notée exactement :

INFORMATION NON FOURNIE — À CONFIRMER

============================================================
2. RÈGLES A24 UI/UX
============================================================

Pour le bloc A24, la référence principale est :

./docs/1-master/MAQUETTE/

Important :

- ne pas se limiter à MAQUETTE_DA ;
- MAQUETTE_DA reste une référence de direction artistique si elle couvre le sujet ;
- utiliser aussi les autres sous-dossiers, README, specs, mappings, icônes et maquettes utiles ;
- en cas de contradiction, ./docs/1-master/MAQUETTE/ prime sur les anciennes références ;
- en cas de contradiction interne non résolue, écrire :
  INFORMATION NON FOURNIE — À CONFIRMER

Les références A21/A22 peuvent servir d’historique, mais ne doivent pas primer sur les références A24 actuelles.

A24 vise :

- une UI proche des maquettes validées ;
- une structure plus simple ;
- une meilleure lisibilité ;
- des composants cohérents ;
- des tableaux, filtres, badges et formulaires plus propres ;
- une compatibilité mode clair / mode sombre ;
- aucune nouvelle direction artistique inventée.

Le mode clair reste le thème principal.

Le mode sombre doit être une déclinaison sobre, lisible et cohérente, pas une simple inversion noir/blanc.

A24 ne doit pas traiter :

- refonte profonde du planning ;
- nouveau moteur planning ;
- autoschedule complet ;
- matching complet ;
- refonte RBAC ;
- RH avancée ;
- rôle PSC1 réel ;
- paie, primes, heures travaillées ;
- RGPD complet ;
- sécurité avancée ;
- déploiement ;
- application mobile.

A24 peut réorganiser visuellement l’information, mais ne doit pas supprimer de donnée métier ni ajouter de fonctionnalité hors périmètre.

============================================================
3. CHOIX DE L’OUTIL
============================================================

Production = Codex si la session implique :

- dépôt réel ;
- code ;
- fichiers projet ;
- patchs ;
- commandes terminal ;
- tests ;
- validations techniques ;
- comparaison entre repo réel et maquettes.

Production = ChatGPT si la session est surtout :

- cadrage ;
- reformulation ;
- préparation ;
- contrôle ;
- analyse documentaire sans accès nécessaire au dépôt réel.

Pour A24 :

- audit UI/UX avec comparaison repo réel / maquettes → Codex ;
- correction UI/UX → Codex ;
- contrôle qualité → ChatGPT.

En cas de doute :

- repo réel ou patch → Codex ;
- contrôle, cadrage ou vérification → ChatGPT.

============================================================
4. RÈGLE PATCH-FIRST
============================================================

Si un patch code est nécessaire :

1. produire un patch principal unique au format .diff ;
2. l’appliquer au dépôt ;
3. relancer les validations utiles ;
4. produire un correctif séparé minimal si besoin ;
5. ne jamais rejouer tout le patch principal dans un correctif ;
6. ne jamais mélanger patch code et documentation finale.

Si aucun patch code n’est nécessaire, choisir clairement :

- NO_PATCH_CODE
- NO_PATCH
- PATCH DOCUMENTAIRE

La décision doit être justifiée.

============================================================
5. FORMAT DES PATCHS
============================================================

Tout patch .diff doit être directement compatible avec git apply.

Format obligatoire :

- UTF-8 sans BOM ou ASCII ;
- jamais UTF-16 ;
- pas de caractères nuls ;
- première ligne de type : diff --git ...

Preuves attendues :

- premiers octets du patch ;
- première ligne ;
- encodage ;
- résultat de git apply --check.

Un patch qui retourne :

No valid patches in input

est interdit.

============================================================
6. VALIDATIONS TERMINALES
============================================================

Les validations ne doivent pas être résumées par “OK”.

Pour chaque commande, fournir :

- commande exacte ;
- extrait terminal réel ;
- résultat ;
- code retour si disponible.

Pour un patch code, vérifier au minimum :

npm run lint
npm run build

Si Prisma est touché :

npx prisma validate
npx prisma generate

Si un patch .diff est livré :

git apply --check "chemin/du/patch.diff"

Les preuves doivent apparaître dans la réponse finale et dans EVIDENCES.md.

============================================================
7. DOCUMENTATION ET ZIP
============================================================

La production doit générer la documentation finale de session.

Fichiers attendus selon le cas :

- SESSION.md
- NOTES.md
- EVIDENCES.md
- RESULTATS.md
- FIN_SESSION.md
- PATCH/README_PATCH.md
- patch principal .diff si applicable
- patchs correctifs _FIX-XX.diff si applicable
- patch documentaire .diff si applicable
- NO_PATCH.md si applicable

Le ZIP documentaire final doit être généré après les dernières modifications.

Avant la réponse finale, vérifier son contenu.

La réponse finale doit indiquer :

- le ZIP final joint ;
- son contenu vérifié ;
- les chemins relatifs au dépôt.

Ne pas utiliser un ancien ZIP.
Ne pas conclure avec un simple chemin local Windows.

============================================================
8. PROMPT DE PRODUCTION À PRODUIRE
============================================================

Le prompt de production doit être adapté à la session indiquée plus bas.

Il doit demander une réponse finale structurée avec :

1. rappel de la session ;
2. sources réellement lues ;
3. périmètre traité ;
4. fichiers inspectés ;
5. fichiers modifiés ;
6. décision patch ;
7. patch principal si applicable ;
8. correctifs éventuels ;
9. validations terminales avec preuves réelles ;
10. preuves d’encodage et d’applicabilité des patchs ;
11. documentation finale produite ;
12. contenu vérifié du ZIP final ;
13. ZIP documentaire final joint ;
14. risques résiduels ;
15. recommandation de passage à la suite.

Le prompt doit aussi rappeler :

- patchs .diff en UTF-8 sans BOM ou ASCII ;
- aucun patch UTF-16 ;
- git apply --check obligatoire si patch ;
- EVIDENCES.md doit contenir les preuves réelles ;
- ZIP final régénéré et joint ;
- chemins relatifs au dépôt autant que possible.

============================================================
9. PROMPT DE CONTRÔLE À PRODUIRE
============================================================

Le prompt de contrôle est destiné à ChatGPT.

Il doit demander d’attendre les éléments suivants avant contrôle :

- réponse finale de production ;
- patch principal si applicable ;
- patchs correctifs si applicable ;
- patch documentaire si applicable ;
- documentation finale ;
- ZIP documentaire joint au même message que la réponse finale ;
- preuves terminales.

Le contrôle ne doit pas :

- rejouer la session ;
- refaire l’audit complet ;
- inventer des validations ;
- combler les manques par hypothèse ;
- contrôler un ancien ZIP.

Si plusieurs ZIP portent le même nom, contrôler uniquement le ZIP joint au message de production concerné.

Le contrôle doit écrire :

Je contrôle uniquement le ZIP joint au message de production concerné.

Si aucun ZIP n’est joint :

INFORMATION NON FOURNIE — À CONFIRMER

En cas de contradiction :

RÉPONSE VALIDÉE DE PRODUCTION > BROUILLON / RÉCIT

Le contrôle doit vérifier :

- respect du périmètre ;
- sources utilisées ;
- décision patch ;
- absence de patch artificiel ;
- exploitabilité des patchs ;
- encodage ;
- git apply --check ;
- validations réellement prouvées ;
- contenu de EVIDENCES.md ;
- documentation finale ;
- ZIP final ;
- absence d’élargissement.

Pour A24, vérifier aussi :

- usage de ./docs/1-master/MAQUETTE/ comme référence principale ;
- analyse non limitée à MAQUETTE_DA ;
- respect du mode clair ;
- traitement cohérent du mode sombre si concerné ;
- icônes propres ;
- assets spécifiques conservés ;
- aucune fonctionnalité métier hors périmètre.

Le contrôle doit produire exactement ces sections :

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

Aucun prompt de retour nécessaire.

============================================================
10. SESSION À TRAITER
============================================================

Session :

- SESSION-20260506-06_A24_A24-UI-06

Stage :

- 1-ALPHA

Bloc :

- A24 — Réalignement UI/UX global sur MAQUETTE

Type :

- CORRECTION+COMPLÉTION

Intitulé :

- A24-UI-06 — Utilisateurs / RH visuel

Périmètre :

- page Utilisateurs ;
- liste utilisateurs ;
- filtres ;
- création utilisateur ;
- édition utilisateur ;
- fiche utilisateur ;
- badges rôles ;
- badges statuts ;
- cohérence RH visible ;
- états visuels ;
- actions principales et secondaires.

Livrable attendu :

- patch code ciblé Users / RH visuel ;
- documentation finale ;
- ZIP documentaire final.

DoD :

- la page Utilisateurs / RH est plus pure, plus lisible et alignée avec les références A24 ;
- MAQUETTE_DA est utilisée comme référence de direction artistique si elle couvre le sujet ;
- l’analyse ne doit pas se limiter à MAQUETTE_DA ;
- aucune RH avancée n’est ajoutée.

Exclusions :

- pas de RH avancée ;
- pas de paie ;
- pas de primes ;
- pas de saisie réelle des heures travaillées ;
- pas de modification RBAC profonde ;
- pas de rôle PSC1 réel ;
- pas de refonte planning ;
- pas d’autoschedule ;
- pas de matching ;
- pas de fonctionnalité hors périmètre.

============================================================
11. SORTIE ATTENDUE
============================================================

Réponds uniquement avec :

1. PROMPT DE PRODUCTION
2. PROMPT DE CONTRÔLE

Les deux prompts doivent être complets, clairs, courts, adaptés à cette session et directement copiables/collables.

------------------------------------

Fait moi la commande pour le script de création de sessions pour les sessions suivante.
Exemple de la commande : 
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
Unblock-File -Path .\create_session.ps1
.\create_session.ps1 -Stage "1-ALPHA" -Block "A1" -SessionCode "RBAC-02" -Type "CORRECTION" -Title "Remplacement méthodique de DEA par ADE"

#### Sessions

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