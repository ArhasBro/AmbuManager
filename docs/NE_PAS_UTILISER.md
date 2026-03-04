1) Avant d’ouvrir une nouvelle discussion (préparation)
A. Créer l’ID de session

Format : SESSION-YYYYMMDD-XX
Exemple : SESSION-20260304-01

B. Créer le dossier de session

Créer : docs/sessions/SESSION-20260304-01/
Y mettre les 4 fichiers :

SESSION.md

NOTES.md

EVIDENCES.md

RESULTATS.md

Le plus simple : copier le dossier modèle existant docs/sessions/SESSION-YYYYMMDD-XX/ et renommer.

(Option PowerShell, si tu veux automatiser) :
$ID="SESSION-20260304-01"
Copy-Item -Recurse ".\docs\sessions\SESSION-YYYYMMDD-XX" ".\docs\sessions\$ID"
(Get-Content ".\docs\sessions\$ID\SESSION.md") -replace "SESSION-YYYYMMDD-XX",$ID | Set-Content -Encoding utf8 ".\docs\sessions\$ID\SESSION.md"

C. Préparer le “pack” pour la discussion

Attacher ton docs.zip (ou copier/coller les passages nécessaires).

Avoir sous la main : branche + commit actuel (si tu veux qu’on soit carré dès l’ouverture).

2) Début de session (1er message dans la nouvelle discussion)
A. Tu colles le contenu de :

docs/templates/TEMPLATE_DEBUT_SESSION.md

B. Tu remplis OBLIGATOIREMENT ces champs

PACK DOCUMENTAIRE FOURNI : mets les versions (ex: V1.5.7 (MASTER)).

CODE : branche + commit/tag + “extraits collés : Oui/Non”.

ID SESSION : ton ID du jour.

POINT EXACT DE REPRISE : module + bloc + dernière validation + condition pour valider le bloc.

OBJECTIF UNIQUE : une seule cible mesurable.

✅ Résultat : dès le message 1, on a le même cadrage à chaque fois, et on évite les dérives.

3) Pendant la session (règle simple)

Tu travailles en mode “trace” :

Ce qu’on fait / ce qu’on change → tu notes au fil de l’eau dans NOTES.md

Les preuves (extraits code, logs, erreurs, captures) → EVIDENCES.md

Les sorties concrètes (ce qui marche, ce qui a été modifié) → RESULTATS.md

Et si une décision est prise :

tu la mets en “à enregistrer” pour la clôture → REGISTRE_DECISIONS.md (sections Décisions validées / Décisions en attente, comme ton fichier le fait déjà).

4) Fin de session (dernier message)
A. Tu colles le contenu de :

docs/templates/TEMPLATE_FIN_SESSION.md

B. Tu remplis OBLIGATOIREMENT

Commit final

Validation matrice (cases)

Sorties minimales (RECAP mis à jour + docs modifiés/non modifiés + point exact de reprise)

Point exact de reprise (version/phase/module/bloc/condition)

C. Tu fais les MAJ docs après clôture

Minimum à chaque fin de session :

docs/master/RECAP_DISCUSSIONS.md : ajouter une entrée/section de session

docs/master/REGISTRE_DECISIONS.md : ajouter décisions (si besoin)

docs/master/ETAT_GLOBAL_PROJET.md + PLAN_DE_DEVELOPPEMENT.md : uniquement si statut/phase a changé

Le dossier docs/sessions/<ID>/ : remplir SESSION.md, NOTES.md, EVIDENCES.md, RESULTATS.md

Puis tu peux re-zipper et archiver : docs.zip.

5) Résumé “rituel” en 6 lignes

Crée SESSION-YYYYMMDD-XX cmd -> .\create_session.ps1

Duplique le dossier modèle dans docs/sessions/

Attache docs.zip

Colle + remplis TEMPLATE_DEBUT_SESSION.md

Travaille en alimentant NOTES/EVIDENCES/RESULTATS

Colle + remplis TEMPLATE_FIN_SESSION.md puis MAJ RECAP_DISCUSSIONS (+ décisions/statuts si besoin)




6) Ce que tu dois faire après chaque session :
Mettre à jour :

1️⃣ docs/master/RECAP_DISCUSSIONS.md
Ajouter une nouvelle entrée.

2️⃣ Si une décision est prise :
docs/master/REGISTRE_DECISIONS.md

3️⃣ Remplir le dossier session
docs/sessions/SESSION-YYYYMMDD-XX/

avec :

SESSION.md
NOTES.md
EVIDENCES.md
RESULTATS.md

Le workflow complet (très simple)

Pour chaque nouvelle session :

1️⃣ créer SESSION-YYYYMMDD-XX
2️⃣ ouvrir une nouvelle discussion
3️⃣ coller bloc début session
4️⃣ travailler
5️⃣ coller bloc fin session
6️⃣ mettre à jour la documentation