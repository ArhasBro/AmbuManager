# Ambulance Manager — Prompts A25-06 à CLOTURE_A25

Version : V1.0 — recadrage Planning maquette
Date : 10/05/2026

## Note de cadrage

Ce document prépare exactement deux prompts par session :

1. `PROMPT DE PRODUCTION — Codex`
2. `PROMPT DE CONTRÔLE — ChatGPT`

Le dossier `ARCHIVE` du ZIP `BLOC_A25` est volontairement ignoré, car il contient les anciennes sessions A25 obsolètes.

Règle nouvelle importante : la production Codex se fait en deux phases. Codex travaille d’abord le code ou l’audit technique, puis attend l’autorisation explicite `AUTORISÉ : DOCUMENTATION` avant de rédiger les fichiers documentaires de session.

---

# 1. A25-PLAN-UI-06 — Cible visuelle globale Planning

- Session : `SESSION-20260510-06_A25_A25-PLAN-UI-06`
- Type : `AUDIT`
- Périmètre précis : Produire la cible d’intégration de la page Planning complète, en comparant la maquette officielle, la référence A25 et le code réel, sans patch code applicatif.

## 1.1 PROMPT DE PRODUCTION — Codex

```text
Tu es Codex en discussion de production.

============================================================
OUVERTURE OFFICIELLE DE SESSION
============================================================

Projet : Investissement
Sous-projet : Ambulance Manager

- Session : SESSION-20260510-06_A25_A25-PLAN-UI-06
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : AUDIT
- Intitulé : Cible visuelle globale Planning

Dossier de session :
`docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-06_A25_A25-PLAN-UI-06`

Objectif unique :
Produire la cible d’intégration de la page Planning complète, en comparant la maquette officielle, la référence A25 et le code réel, sans patch code applicatif.


============================================================
RÈGLES COMMUNES DE PRODUCTION — CODEX
============================================================

Tu dois travailler en deux phases strictes.

PHASE 1 — CODE / CONTRÔLE TECHNIQUE UNIQUEMENT
- Lire uniquement les fichiers nécessaires au périmètre.
- Ignorer totalement le dossier `docs/2-sessions/1-ALPHA/BLOC_A25/ARCHIVE`.
- Ne pas scanner tout le dépôt.
- Ne pas produire de captures.
- Ne pas générer de ZIP.
- Ne pas rédiger ni modifier les fichiers documentaires de session tant que Nathan n’a pas explicitement écrit : `AUTORISÉ : DOCUMENTATION`.
- Si la session produit un patch code, produire uniquement le patch code ciblé et les preuves techniques nécessaires.
- Répondre en fin de phase 1 avec le résumé du code, le patch, les preuves et la checklist visuelle manuelle.

PHASE 2 — DOCUMENTATION UNIQUEMENT APRÈS AUTORISATION
- Ne démarrer cette phase que si Nathan écrit explicitement : `AUTORISÉ : DOCUMENTATION`.
- Rédiger alors les fichiers de session : `SESSION.md`, `NOTES.md`, `EVIDENCES.md`, `RESULTATS.md`, `FIN_SESSION.md`, `PATCH/README_PATCH.md` ou `PATCH/NO_PATCH.md`.
- Ne pas recréer ni régénérer le patch code principal pendant la phase documentaire.
- Ne pas générer le ZIP sauf demande explicite. Confirmer seulement que les fichiers sont prêts pour ZIP manuel.

RÈGLES TECHNIQUES
- Tout patch doit être ciblé, applicable, UTF-8 sans BOM et commencer directement par `diff --git`.
- Fournir une preuve réelle `git apply --check` du patch principal.
- Fournir la sortie complète de `npm run lint` avec code retour.
- Fournir la sortie complète de `npm run build` avec code retour.
- Si une commande ne peut pas être exécutée, expliquer exactement pourquoi et écrire : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Ne pas modifier Prisma, API, RBAC, autoschedule, matching ou logique métier lourde sauf nécessité bloquante explicitement justifiée.
- La fidélité visuelle à la maquette prime sur les micro-corrections locales.

RÉFÉRENCES OBLIGATOIRES
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`
- `docs/1-master/MAQUETTE/MAQUETTE_DA`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2.png`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png`

RÈGLE D’AUTORITÉ
- `MAQUETTE_DA` et les images Planning officielles guident la cible visuelle.
- `CODE > DOCUMENTATION` pour la logique fonctionnelle réelle.
- Toute information manquante : `INFORMATION NON FOURNIE — À CONFIRMER`.


============================================================
PÉRIMÈTRE STRICT DE CETTE SESSION
============================================================

Inclure :
- lecture ciblée de `REFERENCE_UI_UX_A25_PLANNING.md` ;
- vérification que le document décrit bien la page cible à reproduire ;
- analyse du code Planning réel uniquement pour identifier les points d’intégration ;
- cartographie cible `PlanningHeader`, `PlanningToolbar`, `PlanningTabs`, `PlanningWorkspace`, `PlanningMatrix`, `PlanningCellDetailPanel`, `PlanningBulkActionBar` ;
- règle des onglets : l’encadré orange pilote l’encadré violet et l’encadré vert ;
- stratégie de découpage technique pour A25-PLAN-UI-07 à A25-PLAN-UI-09 ;
- checklist visuelle manuelle de référence.

Exclure systématiquement :
- `docs/2-sessions/1-ALPHA/BLOC_A25/ARCHIVE` ;
- nouveau moteur planning ;
- refonte autoschedule ;
- refonte matching ;
- refonte API / Prisma / RBAC lourde ;
- suppression physique généralisée ;
- RH avancée ;
- refonte mobile complète ;
- nouvelle direction artistique.

TRAVAIL SPÉCIFIQUE
- Ne pas modifier le code.
- Ne pas modifier la documentation en phase 1.
- En phase 1, produire uniquement un diagnostic dans la réponse Codex : cible visuelle, architecture de composants, risques, ordre d’intégration.
- La rédaction officielle dans `SESSION.md`, `RESULTATS.md`, etc. attendra l’autorisation documentaire.


PATCH ATTENDU
- Aucun patch code applicatif n’est attendu en phase 1.
- Si aucun code n’est modifié, ne pas créer de faux patch.
- Préparer uniquement la conclusion `NO_PATCH_CODE` en réponse, puis attendre `AUTORISÉ : DOCUMENTATION` avant de remplir `PATCH/NO_PATCH.md`.
- Si un écart impose un correctif code, arrêter et expliquer pourquoi avant de produire le patch.


============================================================
VALIDATIONS TERMINALES PHASE 1
============================================================

Exécuter réellement si l’environnement le permet :

```powershell
npm run lint
npm run build
```

Fournir pour chaque commande :
- commande exacte ;
- sortie complète ;
- code retour ;
- mention claire si non exécutée.

============================================================
RÉPONSE FINALE PHASE 1 ATTENDUE
============================================================

Répondre avec :

1. Résumé du travail code / audit technique
2. Fichiers lus
3. Fichiers modifiés, ou confirmation `aucun fichier code modifié`
4. Périmètre traité
5. Périmètre volontairement non traité
6. Patch produit ou `NO_PATCH_CODE`
7. Preuve UTF-8 sans BOM si patch produit
8. Preuve `git apply --check` si patch produit
9. Sortie complète `npm run lint` avec code retour
10. Sortie complète `npm run build` avec code retour
11. Checklist visuelle manuelle à faire par Nathan
12. Confirmation : aucune documentation de session rédigée sans autorisation
13. Confirmation : aucune capture produite
14. Confirmation : aucun ZIP généré
15. Verdict phase 1

Verdict attendu :
`PRODUCTION CODE SESSION-20260510-06_A25_A25-PLAN-UI-06 PRÊTE POUR CONTRÔLE : OUI`
ou
`PRODUCTION CODE SESSION-20260510-06_A25_A25-PLAN-UI-06 PRÊTE POUR CONTRÔLE : NON`

```

## 1.2 PROMPT DE CONTRÔLE — ChatGPT

```text
Tu es ChatGPT en discussion de contrôle qualité.

Je vais te transmettre la production phase 1 de la session suivante :

- Session : SESSION-20260510-06_A25_A25-PLAN-UI-06
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : AUDIT
- Intitulé : Cible visuelle globale Planning

Objectif :
Contrôler le travail phase 1 fourni par Codex sans rejouer la session et décider si Nathan peut autoriser la documentation.


============================================================
RÈGLES COMMUNES DE CONTRÔLE — CHATGPT
============================================================

Tu dois contrôler uniquement ce que Codex fournit.
Tu ne dois pas rejouer la session, refaire l’audit complet du dépôt, inventer des preuves ou combler les manques par hypothèse.

Contrôle uniquement après réception :
- de la réponse finale de production phase 1 ;
- du patch code si la session en produit un ;
- de la preuve réelle `git apply --check` si patch produit ;
- des sorties complètes `npm run lint` et `npm run build` avec codes retour ;
- de la checklist visuelle manuelle ;
- des fichiers documentaires uniquement si Nathan a déjà autorisé la documentation ;
- du ZIP documentaire final versionné uniquement après phase documentaire, si Nathan le fournit.

Avant autorisation documentaire, ton rôle est de décider :
- `CODE VALIDABLE : OUI / NON`
- `DOCUMENTATION AUTORISÉE : OUI / NON`
- `CORRECTIONS REQUISES : OUI / NON`

Tu dois vérifier que Codex :
- n’a pas modifié la documentation sans autorisation ;
- n’a pas produit de captures ;
- n’a pas scanné inutilement tout le dépôt ;
- n’a pas généré de ZIP sans demande ;
- n’a pas touché aux zones hors périmètre ;
- a respecté le périmètre A25 et la maquette officielle.

Si une information manque, écrire exactement :
`INFORMATION NON FOURNIE — À CONFIRMER`


============================================================
ÉLÉMENTS À ATTENDRE AVANT CONTRÔLE
============================================================

- réponse finale de production phase 1 ;

- confirmation qu’aucun patch code applicatif n’était attendu ;
- justification `NO_PATCH_CODE` si aucun code n’est produit ;
- sorties complètes `npm run lint` et `npm run build` avec codes retour ;
- checklist visuelle manuelle ;
- confirmation qu’aucune documentation de session n’a été rédigée sans autorisation ;
- confirmation qu’aucune capture ni ZIP n’a été produit.

============================================================
POINTS À CONTRÔLER
============================================================

Vérifier que la production couvre :
- cible visuelle globale ;
- structure maquette complète ;
- règle onglets orange → violet + vert ;
- compatibilité avec le code réel ;
- plan d’intégration pour A25-07, A25-08, A25-09 ;
- absence de patch code ;
- absence de documentation prématurée.

Vérifier aussi :
- respect de `REFERENCE_UI_UX_A25_PLANNING.md` ;
- fidélité à `Planning_V1.2.png` et `Planning_V1.2_INFO_DETAIL.png` ;
- absence d’action inutile ;
- absence de scan large ;
- absence de documentation prématurée ;
- absence de capture ;
- absence de ZIP non demandé ;
- absence de modification hors périmètre.



============================================================
FORMAT DE RÉPONSE ATTENDU
============================================================

Répondre avec :

1. Informations reçues
2. Informations manquantes
3. Contrôle du périmètre
4. Contrôle du patch / NO_PATCH_CODE
5. Contrôle des preuves terminales
6. Contrôle de la fidélité maquette
7. Contrôle de la checklist visuelle manuelle
8. Contrôle des actions inutiles / scans / captures / ZIP
9. Écarts ou réserves
10. Verdict final

Verdicts obligatoires :

- `CODE VALIDABLE : OUI` ou `CODE VALIDABLE : NON`
- `DOCUMENTATION AUTORISÉE : OUI` ou `DOCUMENTATION AUTORISÉE : NON`
- `CORRECTIONS REQUISES : OUI` ou `CORRECTIONS REQUISES : NON`

Si `DOCUMENTATION AUTORISÉE : OUI`, ajouter exactement :
`AUTORISÉ : DOCUMENTATION`

Si non validable, préciser exactement les corrections à demander à Codex.

```

---

# 2. A25-PLAN-UI-07 — Structure globale Planning alignée maquette

- Session : `SESSION-20260510-07_A25_A25-PLAN-UI-07`
- Type : `CORRECTION+COMPLÉTION`
- Périmètre précis : Refondre la structure globale visible de la page Planning pour se rapprocher fortement de la maquette : header, filtres, exports, onglets, workspace global, sans traiter en profondeur la grille ni le panneau droit.

## 2.1 PROMPT DE PRODUCTION — Codex

```text
Tu es Codex en discussion de production.

============================================================
OUVERTURE OFFICIELLE DE SESSION
============================================================

Projet : Investissement
Sous-projet : Ambulance Manager

- Session : SESSION-20260510-07_A25_A25-PLAN-UI-07
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : CORRECTION+COMPLÉTION
- Intitulé : Structure globale Planning alignée maquette

Dossier de session :
`docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-07_A25_A25-PLAN-UI-07`

Objectif unique :
Refondre la structure globale visible de la page Planning pour se rapprocher fortement de la maquette : header, filtres, exports, onglets, workspace global, sans traiter en profondeur la grille ni le panneau droit.


============================================================
RÈGLES COMMUNES DE PRODUCTION — CODEX
============================================================

Tu dois travailler en deux phases strictes.

PHASE 1 — CODE / CONTRÔLE TECHNIQUE UNIQUEMENT
- Lire uniquement les fichiers nécessaires au périmètre.
- Ignorer totalement le dossier `docs/2-sessions/1-ALPHA/BLOC_A25/ARCHIVE`.
- Ne pas scanner tout le dépôt.
- Ne pas produire de captures.
- Ne pas générer de ZIP.
- Ne pas rédiger ni modifier les fichiers documentaires de session tant que Nathan n’a pas explicitement écrit : `AUTORISÉ : DOCUMENTATION`.
- Si la session produit un patch code, produire uniquement le patch code ciblé et les preuves techniques nécessaires.
- Répondre en fin de phase 1 avec le résumé du code, le patch, les preuves et la checklist visuelle manuelle.

PHASE 2 — DOCUMENTATION UNIQUEMENT APRÈS AUTORISATION
- Ne démarrer cette phase que si Nathan écrit explicitement : `AUTORISÉ : DOCUMENTATION`.
- Rédiger alors les fichiers de session : `SESSION.md`, `NOTES.md`, `EVIDENCES.md`, `RESULTATS.md`, `FIN_SESSION.md`, `PATCH/README_PATCH.md` ou `PATCH/NO_PATCH.md`.
- Ne pas recréer ni régénérer le patch code principal pendant la phase documentaire.
- Ne pas générer le ZIP sauf demande explicite. Confirmer seulement que les fichiers sont prêts pour ZIP manuel.

RÈGLES TECHNIQUES
- Tout patch doit être ciblé, applicable, UTF-8 sans BOM et commencer directement par `diff --git`.
- Fournir une preuve réelle `git apply --check` du patch principal.
- Fournir la sortie complète de `npm run lint` avec code retour.
- Fournir la sortie complète de `npm run build` avec code retour.
- Si une commande ne peut pas être exécutée, expliquer exactement pourquoi et écrire : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Ne pas modifier Prisma, API, RBAC, autoschedule, matching ou logique métier lourde sauf nécessité bloquante explicitement justifiée.
- La fidélité visuelle à la maquette prime sur les micro-corrections locales.

RÉFÉRENCES OBLIGATOIRES
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`
- `docs/1-master/MAQUETTE/MAQUETTE_DA`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2.png`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png`

RÈGLE D’AUTORITÉ
- `MAQUETTE_DA` et les images Planning officielles guident la cible visuelle.
- `CODE > DOCUMENTATION` pour la logique fonctionnelle réelle.
- Toute information manquante : `INFORMATION NON FOURNIE — À CONFIRMER`.


============================================================
PÉRIMÈTRE STRICT DE CETTE SESSION
============================================================

Inclure :
- conteneur global de `/planning` ;
- header `Planning` + sous-titre + bouton `+ Ajouter un shift` ;
- toolbar filtres : période, dépôt, rôle, utilisateur ;
- toggle `Personnel / Vue dépôt` ;
- exports PDF / Excel / CSV / Imprimer ;
- onglets internes : Planning manuel, Affectations, Autoschedule, Matching, Historique, Exports ;
- architecture d’onglets où l’onglet actif pilote la zone centrale et le panneau contextuel ;
- structure workspace grille + panneau droit, même si le contenu interne reste à affiner ;
- mode clair / mode sombre pour ces zones ;
- responsive minimal desktop/tablette.

Exclure systématiquement :
- `docs/2-sessions/1-ALPHA/BLOC_A25/ARCHIVE` ;
- nouveau moteur planning ;
- refonte autoschedule ;
- refonte matching ;
- refonte API / Prisma / RBAC lourde ;
- suppression physique généralisée ;
- RH avancée ;
- refonte mobile complète ;
- nouvelle direction artistique.

RÈGLE SPÉCIFIQUE ONGLET
L’encadré orange de la maquette est une vraie navigation contextuelle.
Quand un onglet change, le contenu de la zone violette ET le contenu du panneau vert doivent être conceptuellement pilotés par cet onglet.
Ne pas empiler tous les contenus verticalement.
Ne pas inventer les contenus non visibles : les onglets non détaillés dans la maquette peuvent afficher un état sobre `INFORMATION NON FOURNIE — À CONFIRMER` ou conserver le contenu existant si le code le prouve.


PATCH ATTENDU
- Produire le patch code principal : `PATCH/PATCH__SESSION-20260510-07_A25_A25-PLAN-UI-07.diff`.
- Le patch doit être limité au périmètre de cette session.
- Réexporter le patch en UTF-8 sans BOM.
- Fournir les premiers octets ou une preuve équivalente montrant l’absence de BOM.
- Fournir une preuve réelle `git apply --check` du patch.


============================================================
VALIDATIONS TERMINALES PHASE 1
============================================================

Exécuter réellement si l’environnement le permet :

```powershell
npm run lint
npm run build
```

Fournir pour chaque commande :
- commande exacte ;
- sortie complète ;
- code retour ;
- mention claire si non exécutée.

============================================================
RÉPONSE FINALE PHASE 1 ATTENDUE
============================================================

Répondre avec :

1. Résumé du travail code / audit technique
2. Fichiers lus
3. Fichiers modifiés, ou confirmation `aucun fichier code modifié`
4. Périmètre traité
5. Périmètre volontairement non traité
6. Patch produit ou `NO_PATCH_CODE`
7. Preuve UTF-8 sans BOM si patch produit
8. Preuve `git apply --check` si patch produit
9. Sortie complète `npm run lint` avec code retour
10. Sortie complète `npm run build` avec code retour
11. Checklist visuelle manuelle à faire par Nathan
12. Confirmation : aucune documentation de session rédigée sans autorisation
13. Confirmation : aucune capture produite
14. Confirmation : aucun ZIP généré
15. Verdict phase 1

Verdict attendu :
`PRODUCTION CODE SESSION-20260510-07_A25_A25-PLAN-UI-07 PRÊTE POUR CONTRÔLE : OUI`
ou
`PRODUCTION CODE SESSION-20260510-07_A25_A25-PLAN-UI-07 PRÊTE POUR CONTRÔLE : NON`

```

## 2.2 PROMPT DE CONTRÔLE — ChatGPT

```text
Tu es ChatGPT en discussion de contrôle qualité.

Je vais te transmettre la production phase 1 de la session suivante :

- Session : SESSION-20260510-07_A25_A25-PLAN-UI-07
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : CORRECTION+COMPLÉTION
- Intitulé : Structure globale Planning alignée maquette

Objectif :
Contrôler le travail phase 1 fourni par Codex sans rejouer la session et décider si Nathan peut autoriser la documentation.


============================================================
RÈGLES COMMUNES DE CONTRÔLE — CHATGPT
============================================================

Tu dois contrôler uniquement ce que Codex fournit.
Tu ne dois pas rejouer la session, refaire l’audit complet du dépôt, inventer des preuves ou combler les manques par hypothèse.

Contrôle uniquement après réception :
- de la réponse finale de production phase 1 ;
- du patch code si la session en produit un ;
- de la preuve réelle `git apply --check` si patch produit ;
- des sorties complètes `npm run lint` et `npm run build` avec codes retour ;
- de la checklist visuelle manuelle ;
- des fichiers documentaires uniquement si Nathan a déjà autorisé la documentation ;
- du ZIP documentaire final versionné uniquement après phase documentaire, si Nathan le fournit.

Avant autorisation documentaire, ton rôle est de décider :
- `CODE VALIDABLE : OUI / NON`
- `DOCUMENTATION AUTORISÉE : OUI / NON`
- `CORRECTIONS REQUISES : OUI / NON`

Tu dois vérifier que Codex :
- n’a pas modifié la documentation sans autorisation ;
- n’a pas produit de captures ;
- n’a pas scanné inutilement tout le dépôt ;
- n’a pas généré de ZIP sans demande ;
- n’a pas touché aux zones hors périmètre ;
- a respecté le périmètre A25 et la maquette officielle.

Si une information manque, écrire exactement :
`INFORMATION NON FOURNIE — À CONFIRMER`


============================================================
ÉLÉMENTS À ATTENDRE AVANT CONTRÔLE
============================================================

- réponse finale de production phase 1 ;

- patch principal code ;
- preuve réelle `git apply --check` ;
- confirmation UTF-8 sans BOM ;
- sorties complètes `npm run lint` et `npm run build` avec codes retour ;
- checklist visuelle manuelle ;
- confirmation qu’aucune documentation de session n’a été rédigée sans autorisation ;
- confirmation qu’aucune capture ni ZIP n’a été produit.

============================================================
POINTS À CONTRÔLER
============================================================

Vérifier que la production couvre :
- header ;
- toolbar filtres ;
- exports ;
- toggle personnel / vue dépôt ;
- onglets internes ;
- architecture onglet actif → zone centrale + panneau contextuel ;
- workspace général grille + panneau droit ;
- mode clair ;
- mode sombre ;
- absence de traitement profond grille/panneau/actions.

Vérifier aussi :
- respect de `REFERENCE_UI_UX_A25_PLANNING.md` ;
- fidélité à `Planning_V1.2.png` et `Planning_V1.2_INFO_DETAIL.png` ;
- absence d’action inutile ;
- absence de scan large ;
- absence de documentation prématurée ;
- absence de capture ;
- absence de ZIP non demandé ;
- absence de modification hors périmètre.



============================================================
FORMAT DE RÉPONSE ATTENDU
============================================================

Répondre avec :

1. Informations reçues
2. Informations manquantes
3. Contrôle du périmètre
4. Contrôle du patch / NO_PATCH_CODE
5. Contrôle des preuves terminales
6. Contrôle de la fidélité maquette
7. Contrôle de la checklist visuelle manuelle
8. Contrôle des actions inutiles / scans / captures / ZIP
9. Écarts ou réserves
10. Verdict final

Verdicts obligatoires :

- `CODE VALIDABLE : OUI` ou `CODE VALIDABLE : NON`
- `DOCUMENTATION AUTORISÉE : OUI` ou `DOCUMENTATION AUTORISÉE : NON`
- `CORRECTIONS REQUISES : OUI` ou `CORRECTIONS REQUISES : NON`

Si `DOCUMENTATION AUTORISÉE : OUI`, ajouter exactement :
`AUTORISÉ : DOCUMENTATION`

Si non validable, préciser exactement les corrections à demander à Codex.

```

---

# 3. A25-PLAN-UI-08 — Grille planning et cartes shift

- Session : `SESSION-20260510-08_A25_A25-PLAN-UI-08`
- Type : `CORRECTION+COMPLÉTION`
- Périmètre précis : Refondre la zone centrale de la maquette : matrice salariés × semaines, colonnes, lignes, cellules, badges et sélection, sans refaire le moteur planning.

## 3.1 PROMPT DE PRODUCTION — Codex

```text
Tu es Codex en discussion de production.

============================================================
OUVERTURE OFFICIELLE DE SESSION
============================================================

Projet : Investissement
Sous-projet : Ambulance Manager

- Session : SESSION-20260510-08_A25_A25-PLAN-UI-08
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : CORRECTION+COMPLÉTION
- Intitulé : Grille planning et cartes shift

Dossier de session :
`docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-08_A25_A25-PLAN-UI-08`

Objectif unique :
Refondre la zone centrale de la maquette : matrice salariés × semaines, colonnes, lignes, cellules, badges et sélection, sans refaire le moteur planning.


============================================================
RÈGLES COMMUNES DE PRODUCTION — CODEX
============================================================

Tu dois travailler en deux phases strictes.

PHASE 1 — CODE / CONTRÔLE TECHNIQUE UNIQUEMENT
- Lire uniquement les fichiers nécessaires au périmètre.
- Ignorer totalement le dossier `docs/2-sessions/1-ALPHA/BLOC_A25/ARCHIVE`.
- Ne pas scanner tout le dépôt.
- Ne pas produire de captures.
- Ne pas générer de ZIP.
- Ne pas rédiger ni modifier les fichiers documentaires de session tant que Nathan n’a pas explicitement écrit : `AUTORISÉ : DOCUMENTATION`.
- Si la session produit un patch code, produire uniquement le patch code ciblé et les preuves techniques nécessaires.
- Répondre en fin de phase 1 avec le résumé du code, le patch, les preuves et la checklist visuelle manuelle.

PHASE 2 — DOCUMENTATION UNIQUEMENT APRÈS AUTORISATION
- Ne démarrer cette phase que si Nathan écrit explicitement : `AUTORISÉ : DOCUMENTATION`.
- Rédiger alors les fichiers de session : `SESSION.md`, `NOTES.md`, `EVIDENCES.md`, `RESULTATS.md`, `FIN_SESSION.md`, `PATCH/README_PATCH.md` ou `PATCH/NO_PATCH.md`.
- Ne pas recréer ni régénérer le patch code principal pendant la phase documentaire.
- Ne pas générer le ZIP sauf demande explicite. Confirmer seulement que les fichiers sont prêts pour ZIP manuel.

RÈGLES TECHNIQUES
- Tout patch doit être ciblé, applicable, UTF-8 sans BOM et commencer directement par `diff --git`.
- Fournir une preuve réelle `git apply --check` du patch principal.
- Fournir la sortie complète de `npm run lint` avec code retour.
- Fournir la sortie complète de `npm run build` avec code retour.
- Si une commande ne peut pas être exécutée, expliquer exactement pourquoi et écrire : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Ne pas modifier Prisma, API, RBAC, autoschedule, matching ou logique métier lourde sauf nécessité bloquante explicitement justifiée.
- La fidélité visuelle à la maquette prime sur les micro-corrections locales.

RÉFÉRENCES OBLIGATOIRES
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`
- `docs/1-master/MAQUETTE/MAQUETTE_DA`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2.png`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png`

RÈGLE D’AUTORITÉ
- `MAQUETTE_DA` et les images Planning officielles guident la cible visuelle.
- `CODE > DOCUMENTATION` pour la logique fonctionnelle réelle.
- Toute information manquante : `INFORMATION NON FOURNIE — À CONFIRMER`.


============================================================
PÉRIMÈTRE STRICT DE CETTE SESSION
============================================================

Inclure :
- grille principale de l’onglet `Planning manuel` ;
- table / matrice salariés × semaines ;
- colonnes : sélection, salarié, rôle, base, statut, semaine 1, semaine 2, semaine 3, semaine 4 ;
- avatars initiales ;
- badges statut `Actif`, `En congé` si données disponibles ;
- badges planning : Ambulance, VSL, Taxi, Garde, Repos, Congé, etc. selon données réelles ;
- sous-libellés : Samedi, Dimanche, jour férié si données disponibles ;
- cellule sélectionnée avec bordure bleue ;
- densité, alignements, hauteurs de lignes, bordures fines ;
- états vide / erreur / chargement de la grille ;
- mode clair / mode sombre de la grille.

Exclure systématiquement :
- `docs/2-sessions/1-ALPHA/BLOC_A25/ARCHIVE` ;
- nouveau moteur planning ;
- refonte autoschedule ;
- refonte matching ;
- refonte API / Prisma / RBAC lourde ;
- suppression physique généralisée ;
- RH avancée ;
- refonte mobile complète ;
- nouvelle direction artistique.

RÈGLE SPÉCIFIQUE GRILLE
La cible n’est pas une grille calendrier classique jour par jour.
La cible visible est une matrice `salariés × semaines`.
Si le code actuel ne permet pas cette structure sans logique lourde, produire l’adaptation visuelle la plus fidèle possible avec les données existantes, et signaler précisément les limites.
Ne pas hardcoder les salariés ou les données de la maquette.


PATCH ATTENDU
- Produire le patch code principal : `PATCH/PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08.diff`.
- Le patch doit être limité au périmètre de cette session.
- Réexporter le patch en UTF-8 sans BOM.
- Fournir les premiers octets ou une preuve équivalente montrant l’absence de BOM.
- Fournir une preuve réelle `git apply --check` du patch.


============================================================
VALIDATIONS TERMINALES PHASE 1
============================================================

Exécuter réellement si l’environnement le permet :

```powershell
npm run lint
npm run build
```

Fournir pour chaque commande :
- commande exacte ;
- sortie complète ;
- code retour ;
- mention claire si non exécutée.

============================================================
RÉPONSE FINALE PHASE 1 ATTENDUE
============================================================

Répondre avec :

1. Résumé du travail code / audit technique
2. Fichiers lus
3. Fichiers modifiés, ou confirmation `aucun fichier code modifié`
4. Périmètre traité
5. Périmètre volontairement non traité
6. Patch produit ou `NO_PATCH_CODE`
7. Preuve UTF-8 sans BOM si patch produit
8. Preuve `git apply --check` si patch produit
9. Sortie complète `npm run lint` avec code retour
10. Sortie complète `npm run build` avec code retour
11. Checklist visuelle manuelle à faire par Nathan
12. Confirmation : aucune documentation de session rédigée sans autorisation
13. Confirmation : aucune capture produite
14. Confirmation : aucun ZIP généré
15. Verdict phase 1

Verdict attendu :
`PRODUCTION CODE SESSION-20260510-08_A25_A25-PLAN-UI-08 PRÊTE POUR CONTRÔLE : OUI`
ou
`PRODUCTION CODE SESSION-20260510-08_A25_A25-PLAN-UI-08 PRÊTE POUR CONTRÔLE : NON`

```

## 3.2 PROMPT DE CONTRÔLE — ChatGPT

```text
Tu es ChatGPT en discussion de contrôle qualité.

Je vais te transmettre la production phase 1 de la session suivante :

- Session : SESSION-20260510-08_A25_A25-PLAN-UI-08
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : CORRECTION+COMPLÉTION
- Intitulé : Grille planning et cartes shift

Objectif :
Contrôler le travail phase 1 fourni par Codex sans rejouer la session et décider si Nathan peut autoriser la documentation.


============================================================
RÈGLES COMMUNES DE CONTRÔLE — CHATGPT
============================================================

Tu dois contrôler uniquement ce que Codex fournit.
Tu ne dois pas rejouer la session, refaire l’audit complet du dépôt, inventer des preuves ou combler les manques par hypothèse.

Contrôle uniquement après réception :
- de la réponse finale de production phase 1 ;
- du patch code si la session en produit un ;
- de la preuve réelle `git apply --check` si patch produit ;
- des sorties complètes `npm run lint` et `npm run build` avec codes retour ;
- de la checklist visuelle manuelle ;
- des fichiers documentaires uniquement si Nathan a déjà autorisé la documentation ;
- du ZIP documentaire final versionné uniquement après phase documentaire, si Nathan le fournit.

Avant autorisation documentaire, ton rôle est de décider :
- `CODE VALIDABLE : OUI / NON`
- `DOCUMENTATION AUTORISÉE : OUI / NON`
- `CORRECTIONS REQUISES : OUI / NON`

Tu dois vérifier que Codex :
- n’a pas modifié la documentation sans autorisation ;
- n’a pas produit de captures ;
- n’a pas scanné inutilement tout le dépôt ;
- n’a pas généré de ZIP sans demande ;
- n’a pas touché aux zones hors périmètre ;
- a respecté le périmètre A25 et la maquette officielle.

Si une information manque, écrire exactement :
`INFORMATION NON FOURNIE — À CONFIRMER`


============================================================
ÉLÉMENTS À ATTENDRE AVANT CONTRÔLE
============================================================

- réponse finale de production phase 1 ;

- patch principal code ;
- preuve réelle `git apply --check` ;
- confirmation UTF-8 sans BOM ;
- sorties complètes `npm run lint` et `npm run build` avec codes retour ;
- checklist visuelle manuelle ;
- confirmation qu’aucune documentation de session n’a été rédigée sans autorisation ;
- confirmation qu’aucune capture ni ZIP n’a été produit.

============================================================
POINTS À CONTRÔLER
============================================================

Vérifier que la production couvre :
- matrice salariés × semaines ;
- colonnes fixes ;
- colonnes semaines ;
- avatars ;
- statuts ;
- badges planning ;
- cellule sélectionnée ;
- densité ;
- états visuels ;
- mode clair ;
- mode sombre ;
- aucune donnée fictive / hardcodée.

Vérifier aussi :
- respect de `REFERENCE_UI_UX_A25_PLANNING.md` ;
- fidélité à `Planning_V1.2.png` et `Planning_V1.2_INFO_DETAIL.png` ;
- absence d’action inutile ;
- absence de scan large ;
- absence de documentation prématurée ;
- absence de capture ;
- absence de ZIP non demandé ;
- absence de modification hors périmètre.



============================================================
FORMAT DE RÉPONSE ATTENDU
============================================================

Répondre avec :

1. Informations reçues
2. Informations manquantes
3. Contrôle du périmètre
4. Contrôle du patch / NO_PATCH_CODE
5. Contrôle des preuves terminales
6. Contrôle de la fidélité maquette
7. Contrôle de la checklist visuelle manuelle
8. Contrôle des actions inutiles / scans / captures / ZIP
9. Écarts ou réserves
10. Verdict final

Verdicts obligatoires :

- `CODE VALIDABLE : OUI` ou `CODE VALIDABLE : NON`
- `DOCUMENTATION AUTORISÉE : OUI` ou `DOCUMENTATION AUTORISÉE : NON`
- `CORRECTIONS REQUISES : OUI` ou `CORRECTIONS REQUISES : NON`

Si `DOCUMENTATION AUTORISÉE : OUI`, ajouter exactement :
`AUTORISÉ : DOCUMENTATION`

Si non validable, préciser exactement les corrections à demander à Codex.

```

---

# 4. A25-PLAN-UI-09 — Panneau droit actions et affectations

- Session : `SESSION-20260510-09_A25_A25-PLAN-UI-09`
- Type : `CORRECTION+COMPLÉTION`
- Périmètre précis : Refondre le panneau vert de détail cellule et la barre basse d’actions groupées, en cohérence avec l’onglet actif et la cellule sélectionnée.

## 4.1 PROMPT DE PRODUCTION — Codex

```text
Tu es Codex en discussion de production.

============================================================
OUVERTURE OFFICIELLE DE SESSION
============================================================

Projet : Investissement
Sous-projet : Ambulance Manager

- Session : SESSION-20260510-09_A25_A25-PLAN-UI-09
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : CORRECTION+COMPLÉTION
- Intitulé : Panneau droit actions et affectations

Dossier de session :
`docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-09_A25_A25-PLAN-UI-09`

Objectif unique :
Refondre le panneau vert de détail cellule et la barre basse d’actions groupées, en cohérence avec l’onglet actif et la cellule sélectionnée.


============================================================
RÈGLES COMMUNES DE PRODUCTION — CODEX
============================================================

Tu dois travailler en deux phases strictes.

PHASE 1 — CODE / CONTRÔLE TECHNIQUE UNIQUEMENT
- Lire uniquement les fichiers nécessaires au périmètre.
- Ignorer totalement le dossier `docs/2-sessions/1-ALPHA/BLOC_A25/ARCHIVE`.
- Ne pas scanner tout le dépôt.
- Ne pas produire de captures.
- Ne pas générer de ZIP.
- Ne pas rédiger ni modifier les fichiers documentaires de session tant que Nathan n’a pas explicitement écrit : `AUTORISÉ : DOCUMENTATION`.
- Si la session produit un patch code, produire uniquement le patch code ciblé et les preuves techniques nécessaires.
- Répondre en fin de phase 1 avec le résumé du code, le patch, les preuves et la checklist visuelle manuelle.

PHASE 2 — DOCUMENTATION UNIQUEMENT APRÈS AUTORISATION
- Ne démarrer cette phase que si Nathan écrit explicitement : `AUTORISÉ : DOCUMENTATION`.
- Rédiger alors les fichiers de session : `SESSION.md`, `NOTES.md`, `EVIDENCES.md`, `RESULTATS.md`, `FIN_SESSION.md`, `PATCH/README_PATCH.md` ou `PATCH/NO_PATCH.md`.
- Ne pas recréer ni régénérer le patch code principal pendant la phase documentaire.
- Ne pas générer le ZIP sauf demande explicite. Confirmer seulement que les fichiers sont prêts pour ZIP manuel.

RÈGLES TECHNIQUES
- Tout patch doit être ciblé, applicable, UTF-8 sans BOM et commencer directement par `diff --git`.
- Fournir une preuve réelle `git apply --check` du patch principal.
- Fournir la sortie complète de `npm run lint` avec code retour.
- Fournir la sortie complète de `npm run build` avec code retour.
- Si une commande ne peut pas être exécutée, expliquer exactement pourquoi et écrire : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Ne pas modifier Prisma, API, RBAC, autoschedule, matching ou logique métier lourde sauf nécessité bloquante explicitement justifiée.
- La fidélité visuelle à la maquette prime sur les micro-corrections locales.

RÉFÉRENCES OBLIGATOIRES
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`
- `docs/1-master/MAQUETTE/MAQUETTE_DA`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2.png`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png`

RÈGLE D’AUTORITÉ
- `MAQUETTE_DA` et les images Planning officielles guident la cible visuelle.
- `CODE > DOCUMENTATION` pour la logique fonctionnelle réelle.
- Toute information manquante : `INFORMATION NON FOURNIE — À CONFIRMER`.


============================================================
PÉRIMÈTRE STRICT DE CETTE SESSION
============================================================

Inclure :
- panneau droit `Détail de la cellule` ;
- bouton fermeture ;
- bloc salarié : avatar, nom, rôle, statut ;
- bloc semaine : libellé + plage de dates ;
- bloc affectations avec liste compacte ;
- bloc absences ;
- bloc conflits / alertes ;
- actions secondaires : Voir détail, Modifier ;
- action principale : Ajouter shift ;
- barre basse : shifts sélectionnés, affecter employé 1, affecter employé 2, affecter véhicule, affecter base, vider ;
- hiérarchie action principale / secondaire / sensible ;
- clarification de `Vider` sans changement métier ;
- cohérence avec la règle onglet actif → panneau contextuel ;
- mode clair / mode sombre.

Exclure systématiquement :
- `docs/2-sessions/1-ALPHA/BLOC_A25/ARCHIVE` ;
- nouveau moteur planning ;
- refonte autoschedule ;
- refonte matching ;
- refonte API / Prisma / RBAC lourde ;
- suppression physique généralisée ;
- RH avancée ;
- refonte mobile complète ;
- nouvelle direction artistique.

RÈGLE SPÉCIFIQUE PANNEAU
Le panneau droit n’est pas un drawer plein écran.
Il doit être un aside fixe dans la page desktop, aligné avec la zone violette.
Si un autre onglet que `Planning manuel` est actif, le panneau ne doit pas conserver un détail de cellule incohérent : il doit afficher un état contextuel prouvé ou `INFORMATION NON FOURNIE — À CONFIRMER`.
Ne pas créer une nouvelle logique d’affectation.


PATCH ATTENDU
- Produire le patch code principal : `PATCH/PATCH__SESSION-20260510-09_A25_A25-PLAN-UI-09.diff`.
- Le patch doit être limité au périmètre de cette session.
- Réexporter le patch en UTF-8 sans BOM.
- Fournir les premiers octets ou une preuve équivalente montrant l’absence de BOM.
- Fournir une preuve réelle `git apply --check` du patch.


============================================================
VALIDATIONS TERMINALES PHASE 1
============================================================

Exécuter réellement si l’environnement le permet :

```powershell
npm run lint
npm run build
```

Fournir pour chaque commande :
- commande exacte ;
- sortie complète ;
- code retour ;
- mention claire si non exécutée.

============================================================
RÉPONSE FINALE PHASE 1 ATTENDUE
============================================================

Répondre avec :

1. Résumé du travail code / audit technique
2. Fichiers lus
3. Fichiers modifiés, ou confirmation `aucun fichier code modifié`
4. Périmètre traité
5. Périmètre volontairement non traité
6. Patch produit ou `NO_PATCH_CODE`
7. Preuve UTF-8 sans BOM si patch produit
8. Preuve `git apply --check` si patch produit
9. Sortie complète `npm run lint` avec code retour
10. Sortie complète `npm run build` avec code retour
11. Checklist visuelle manuelle à faire par Nathan
12. Confirmation : aucune documentation de session rédigée sans autorisation
13. Confirmation : aucune capture produite
14. Confirmation : aucun ZIP généré
15. Verdict phase 1

Verdict attendu :
`PRODUCTION CODE SESSION-20260510-09_A25_A25-PLAN-UI-09 PRÊTE POUR CONTRÔLE : OUI`
ou
`PRODUCTION CODE SESSION-20260510-09_A25_A25-PLAN-UI-09 PRÊTE POUR CONTRÔLE : NON`

```

## 4.2 PROMPT DE CONTRÔLE — ChatGPT

```text
Tu es ChatGPT en discussion de contrôle qualité.

Je vais te transmettre la production phase 1 de la session suivante :

- Session : SESSION-20260510-09_A25_A25-PLAN-UI-09
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : CORRECTION+COMPLÉTION
- Intitulé : Panneau droit actions et affectations

Objectif :
Contrôler le travail phase 1 fourni par Codex sans rejouer la session et décider si Nathan peut autoriser la documentation.


============================================================
RÈGLES COMMUNES DE CONTRÔLE — CHATGPT
============================================================

Tu dois contrôler uniquement ce que Codex fournit.
Tu ne dois pas rejouer la session, refaire l’audit complet du dépôt, inventer des preuves ou combler les manques par hypothèse.

Contrôle uniquement après réception :
- de la réponse finale de production phase 1 ;
- du patch code si la session en produit un ;
- de la preuve réelle `git apply --check` si patch produit ;
- des sorties complètes `npm run lint` et `npm run build` avec codes retour ;
- de la checklist visuelle manuelle ;
- des fichiers documentaires uniquement si Nathan a déjà autorisé la documentation ;
- du ZIP documentaire final versionné uniquement après phase documentaire, si Nathan le fournit.

Avant autorisation documentaire, ton rôle est de décider :
- `CODE VALIDABLE : OUI / NON`
- `DOCUMENTATION AUTORISÉE : OUI / NON`
- `CORRECTIONS REQUISES : OUI / NON`

Tu dois vérifier que Codex :
- n’a pas modifié la documentation sans autorisation ;
- n’a pas produit de captures ;
- n’a pas scanné inutilement tout le dépôt ;
- n’a pas généré de ZIP sans demande ;
- n’a pas touché aux zones hors périmètre ;
- a respecté le périmètre A25 et la maquette officielle.

Si une information manque, écrire exactement :
`INFORMATION NON FOURNIE — À CONFIRMER`


============================================================
ÉLÉMENTS À ATTENDRE AVANT CONTRÔLE
============================================================

- réponse finale de production phase 1 ;

- patch principal code ;
- preuve réelle `git apply --check` ;
- confirmation UTF-8 sans BOM ;
- sorties complètes `npm run lint` et `npm run build` avec codes retour ;
- checklist visuelle manuelle ;
- confirmation qu’aucune documentation de session n’a été rédigée sans autorisation ;
- confirmation qu’aucune capture ni ZIP n’a été produit.

============================================================
POINTS À CONTRÔLER
============================================================

Vérifier que la production couvre :
- panneau droit ;
- détail cellule ;
- relation cellule sélectionnée → panneau ;
- absences ;
- conflits / alertes ;
- actions secondaires ;
- action principale ;
- barre basse ;
- actions groupées ;
- action sensible `Vider` ;
- mode clair ;
- mode sombre ;
- aucune nouvelle logique d’affectation.

Vérifier aussi :
- respect de `REFERENCE_UI_UX_A25_PLANNING.md` ;
- fidélité à `Planning_V1.2.png` et `Planning_V1.2_INFO_DETAIL.png` ;
- absence d’action inutile ;
- absence de scan large ;
- absence de documentation prématurée ;
- absence de capture ;
- absence de ZIP non demandé ;
- absence de modification hors périmètre.



============================================================
FORMAT DE RÉPONSE ATTENDU
============================================================

Répondre avec :

1. Informations reçues
2. Informations manquantes
3. Contrôle du périmètre
4. Contrôle du patch / NO_PATCH_CODE
5. Contrôle des preuves terminales
6. Contrôle de la fidélité maquette
7. Contrôle de la checklist visuelle manuelle
8. Contrôle des actions inutiles / scans / captures / ZIP
9. Écarts ou réserves
10. Verdict final

Verdicts obligatoires :

- `CODE VALIDABLE : OUI` ou `CODE VALIDABLE : NON`
- `DOCUMENTATION AUTORISÉE : OUI` ou `DOCUMENTATION AUTORISÉE : NON`
- `CORRECTIONS REQUISES : OUI` ou `CORRECTIONS REQUISES : NON`

Si `DOCUMENTATION AUTORISÉE : OUI`, ajouter exactement :
`AUTORISÉ : DOCUMENTATION`

Si non validable, préciser exactement les corrections à demander à Codex.

```

---

# 5. A25-PLAN-UI-10 — Validation visuelle globale Planning

- Session : `SESSION-20260510-10_A25_A25-PLAN-UI-10`
- Type : `VALIDATION`
- Périmètre précis : Valider globalement la page Planning refondue après A25-07 à A25-09, sans patch code sauf correction bloquante explicitement demandée.

## 5.1 PROMPT DE PRODUCTION — Codex

```text
Tu es Codex en discussion de production.

============================================================
OUVERTURE OFFICIELLE DE SESSION
============================================================

Projet : Investissement
Sous-projet : Ambulance Manager

- Session : SESSION-20260510-10_A25_A25-PLAN-UI-10
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : VALIDATION
- Intitulé : Validation visuelle globale Planning

Dossier de session :
`docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-10_A25_A25-PLAN-UI-10`

Objectif unique :
Valider globalement la page Planning refondue après A25-07 à A25-09, sans patch code sauf correction bloquante explicitement demandée.


============================================================
RÈGLES COMMUNES DE PRODUCTION — CODEX
============================================================

Tu dois travailler en deux phases strictes.

PHASE 1 — CODE / CONTRÔLE TECHNIQUE UNIQUEMENT
- Lire uniquement les fichiers nécessaires au périmètre.
- Ignorer totalement le dossier `docs/2-sessions/1-ALPHA/BLOC_A25/ARCHIVE`.
- Ne pas scanner tout le dépôt.
- Ne pas produire de captures.
- Ne pas générer de ZIP.
- Ne pas rédiger ni modifier les fichiers documentaires de session tant que Nathan n’a pas explicitement écrit : `AUTORISÉ : DOCUMENTATION`.
- Si la session produit un patch code, produire uniquement le patch code ciblé et les preuves techniques nécessaires.
- Répondre en fin de phase 1 avec le résumé du code, le patch, les preuves et la checklist visuelle manuelle.

PHASE 2 — DOCUMENTATION UNIQUEMENT APRÈS AUTORISATION
- Ne démarrer cette phase que si Nathan écrit explicitement : `AUTORISÉ : DOCUMENTATION`.
- Rédiger alors les fichiers de session : `SESSION.md`, `NOTES.md`, `EVIDENCES.md`, `RESULTATS.md`, `FIN_SESSION.md`, `PATCH/README_PATCH.md` ou `PATCH/NO_PATCH.md`.
- Ne pas recréer ni régénérer le patch code principal pendant la phase documentaire.
- Ne pas générer le ZIP sauf demande explicite. Confirmer seulement que les fichiers sont prêts pour ZIP manuel.

RÈGLES TECHNIQUES
- Tout patch doit être ciblé, applicable, UTF-8 sans BOM et commencer directement par `diff --git`.
- Fournir une preuve réelle `git apply --check` du patch principal.
- Fournir la sortie complète de `npm run lint` avec code retour.
- Fournir la sortie complète de `npm run build` avec code retour.
- Si une commande ne peut pas être exécutée, expliquer exactement pourquoi et écrire : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Ne pas modifier Prisma, API, RBAC, autoschedule, matching ou logique métier lourde sauf nécessité bloquante explicitement justifiée.
- La fidélité visuelle à la maquette prime sur les micro-corrections locales.

RÉFÉRENCES OBLIGATOIRES
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`
- `docs/1-master/MAQUETTE/MAQUETTE_DA`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2.png`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png`

RÈGLE D’AUTORITÉ
- `MAQUETTE_DA` et les images Planning officielles guident la cible visuelle.
- `CODE > DOCUMENTATION` pour la logique fonctionnelle réelle.
- Toute information manquante : `INFORMATION NON FOURNIE — À CONFIRMER`.


============================================================
PÉRIMÈTRE STRICT DE CETTE SESSION
============================================================

Inclure :
- conformité globale à `Planning_V1.2.png` et `Planning_V1.2_INFO_DETAIL.png` ;
- header ;
- toolbar ;
- filtres ;
- exports ;
- onglets ;
- règle onglet actif → zone centrale + panneau droit ;
- matrice salariés × semaines ;
- panneau droit ;
- barre basse ;
- états vides / erreur / chargement ;
- mode clair ;
- mode sombre ;
- responsive minimal ;
- non-régression des actions planning principales.

Exclure systématiquement :
- `docs/2-sessions/1-ALPHA/BLOC_A25/ARCHIVE` ;
- nouveau moteur planning ;
- refonte autoschedule ;
- refonte matching ;
- refonte API / Prisma / RBAC lourde ;
- suppression physique généralisée ;
- RH avancée ;
- refonte mobile complète ;
- nouvelle direction artistique.

TRAVAIL SPÉCIFIQUE VALIDATION
- Ne pas corriger le code en phase 1.
- Contrôler les fichiers réellement modifiés lors des sessions A25-07 à A25-09.
- Produire un verdict technique et une checklist visuelle à faire par Nathan.
- La validation visuelle finale dépend du retour manuel de Nathan : ne jamais écrire que le rendu est validé visuellement par l’utilisateur sans confirmation explicite.


PATCH ATTENDU
- Aucun patch code applicatif n’est attendu en phase 1.
- Si aucun code n’est modifié, ne pas créer de faux patch.
- Préparer uniquement la conclusion `NO_PATCH_CODE` en réponse, puis attendre `AUTORISÉ : DOCUMENTATION` avant de remplir `PATCH/NO_PATCH.md`.
- Si un écart impose un correctif code, arrêter et expliquer pourquoi avant de produire le patch.


============================================================
VALIDATIONS TERMINALES PHASE 1
============================================================

Exécuter réellement si l’environnement le permet :

```powershell
npm run lint
npm run build
```

Fournir pour chaque commande :
- commande exacte ;
- sortie complète ;
- code retour ;
- mention claire si non exécutée.

============================================================
RÉPONSE FINALE PHASE 1 ATTENDUE
============================================================

Répondre avec :

1. Résumé du travail code / audit technique
2. Fichiers lus
3. Fichiers modifiés, ou confirmation `aucun fichier code modifié`
4. Périmètre traité
5. Périmètre volontairement non traité
6. Patch produit ou `NO_PATCH_CODE`
7. Preuve UTF-8 sans BOM si patch produit
8. Preuve `git apply --check` si patch produit
9. Sortie complète `npm run lint` avec code retour
10. Sortie complète `npm run build` avec code retour
11. Checklist visuelle manuelle à faire par Nathan
12. Confirmation : aucune documentation de session rédigée sans autorisation
13. Confirmation : aucune capture produite
14. Confirmation : aucun ZIP généré
15. Verdict phase 1

Verdict attendu :
`PRODUCTION CODE SESSION-20260510-10_A25_A25-PLAN-UI-10 PRÊTE POUR CONTRÔLE : OUI`
ou
`PRODUCTION CODE SESSION-20260510-10_A25_A25-PLAN-UI-10 PRÊTE POUR CONTRÔLE : NON`

```

## 5.2 PROMPT DE CONTRÔLE — ChatGPT

```text
Tu es ChatGPT en discussion de contrôle qualité.

Je vais te transmettre la production phase 1 de la session suivante :

- Session : SESSION-20260510-10_A25_A25-PLAN-UI-10
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : VALIDATION
- Intitulé : Validation visuelle globale Planning

Objectif :
Contrôler le travail phase 1 fourni par Codex sans rejouer la session et décider si Nathan peut autoriser la documentation.


============================================================
RÈGLES COMMUNES DE CONTRÔLE — CHATGPT
============================================================

Tu dois contrôler uniquement ce que Codex fournit.
Tu ne dois pas rejouer la session, refaire l’audit complet du dépôt, inventer des preuves ou combler les manques par hypothèse.

Contrôle uniquement après réception :
- de la réponse finale de production phase 1 ;
- du patch code si la session en produit un ;
- de la preuve réelle `git apply --check` si patch produit ;
- des sorties complètes `npm run lint` et `npm run build` avec codes retour ;
- de la checklist visuelle manuelle ;
- des fichiers documentaires uniquement si Nathan a déjà autorisé la documentation ;
- du ZIP documentaire final versionné uniquement après phase documentaire, si Nathan le fournit.

Avant autorisation documentaire, ton rôle est de décider :
- `CODE VALIDABLE : OUI / NON`
- `DOCUMENTATION AUTORISÉE : OUI / NON`
- `CORRECTIONS REQUISES : OUI / NON`

Tu dois vérifier que Codex :
- n’a pas modifié la documentation sans autorisation ;
- n’a pas produit de captures ;
- n’a pas scanné inutilement tout le dépôt ;
- n’a pas généré de ZIP sans demande ;
- n’a pas touché aux zones hors périmètre ;
- a respecté le périmètre A25 et la maquette officielle.

Si une information manque, écrire exactement :
`INFORMATION NON FOURNIE — À CONFIRMER`


============================================================
ÉLÉMENTS À ATTENDRE AVANT CONTRÔLE
============================================================

- réponse finale de production phase 1 ;

- confirmation qu’aucun patch code applicatif n’était attendu ;
- justification `NO_PATCH_CODE` si aucun code n’est produit ;
- sorties complètes `npm run lint` et `npm run build` avec codes retour ;
- checklist visuelle manuelle ;
- confirmation qu’aucune documentation de session n’a été rédigée sans autorisation ;
- confirmation qu’aucune capture ni ZIP n’a été produit.

============================================================
POINTS À CONTRÔLER
============================================================

Vérifier que la production couvre :
- conformité globale maquette ;
- cohérence des sessions A25-07 à A25-09 ;
- absence de régression ;
- preuves terminales ;
- checklist visuelle manuelle ;
- absence de patch code non autorisé ;
- absence de documentation prématurée.

Vérifier aussi :
- respect de `REFERENCE_UI_UX_A25_PLANNING.md` ;
- fidélité à `Planning_V1.2.png` et `Planning_V1.2_INFO_DETAIL.png` ;
- absence d’action inutile ;
- absence de scan large ;
- absence de documentation prématurée ;
- absence de capture ;
- absence de ZIP non demandé ;
- absence de modification hors périmètre.



============================================================
FORMAT DE RÉPONSE ATTENDU
============================================================

Répondre avec :

1. Informations reçues
2. Informations manquantes
3. Contrôle du périmètre
4. Contrôle du patch / NO_PATCH_CODE
5. Contrôle des preuves terminales
6. Contrôle de la fidélité maquette
7. Contrôle de la checklist visuelle manuelle
8. Contrôle des actions inutiles / scans / captures / ZIP
9. Écarts ou réserves
10. Verdict final

Verdicts obligatoires :

- `CODE VALIDABLE : OUI` ou `CODE VALIDABLE : NON`
- `DOCUMENTATION AUTORISÉE : OUI` ou `DOCUMENTATION AUTORISÉE : NON`
- `CORRECTIONS REQUISES : OUI` ou `CORRECTIONS REQUISES : NON`

Si `DOCUMENTATION AUTORISÉE : OUI`, ajouter exactement :
`AUTORISÉ : DOCUMENTATION`

Si non validable, préciser exactement les corrections à demander à Codex.

```

---

# 6. CLOTURE_A25 — Clôture finale du bloc A25

- Session : `SESSION-20260510-11_A25_CLOTURE_A25`
- Type : `VALIDATION`
- Périmètre précis : Clôturer le bloc A25 uniquement si les sessions recadrées sont techniquement propres, documentées après autorisation, contrôlées et validées visuellement par Nathan.

## 6.1 PROMPT DE PRODUCTION — Codex

```text
Tu es Codex en discussion de production.

============================================================
OUVERTURE OFFICIELLE DE SESSION
============================================================

Projet : Investissement
Sous-projet : Ambulance Manager

- Session : SESSION-20260510-11_A25_CLOTURE_A25
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : VALIDATION
- Intitulé : Clôture finale du bloc A25

Dossier de session :
`docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-11_A25_CLOTURE_A25`

Objectif unique :
Clôturer le bloc A25 uniquement si les sessions recadrées sont techniquement propres, documentées après autorisation, contrôlées et validées visuellement par Nathan.


============================================================
RÈGLES COMMUNES DE PRODUCTION — CODEX
============================================================

Tu dois travailler en deux phases strictes.

PHASE 1 — CODE / CONTRÔLE TECHNIQUE UNIQUEMENT
- Lire uniquement les fichiers nécessaires au périmètre.
- Ignorer totalement le dossier `docs/2-sessions/1-ALPHA/BLOC_A25/ARCHIVE`.
- Ne pas scanner tout le dépôt.
- Ne pas produire de captures.
- Ne pas générer de ZIP.
- Ne pas rédiger ni modifier les fichiers documentaires de session tant que Nathan n’a pas explicitement écrit : `AUTORISÉ : DOCUMENTATION`.
- Si la session produit un patch code, produire uniquement le patch code ciblé et les preuves techniques nécessaires.
- Répondre en fin de phase 1 avec le résumé du code, le patch, les preuves et la checklist visuelle manuelle.

PHASE 2 — DOCUMENTATION UNIQUEMENT APRÈS AUTORISATION
- Ne démarrer cette phase que si Nathan écrit explicitement : `AUTORISÉ : DOCUMENTATION`.
- Rédiger alors les fichiers de session : `SESSION.md`, `NOTES.md`, `EVIDENCES.md`, `RESULTATS.md`, `FIN_SESSION.md`, `PATCH/README_PATCH.md` ou `PATCH/NO_PATCH.md`.
- Ne pas recréer ni régénérer le patch code principal pendant la phase documentaire.
- Ne pas générer le ZIP sauf demande explicite. Confirmer seulement que les fichiers sont prêts pour ZIP manuel.

RÈGLES TECHNIQUES
- Tout patch doit être ciblé, applicable, UTF-8 sans BOM et commencer directement par `diff --git`.
- Fournir une preuve réelle `git apply --check` du patch principal.
- Fournir la sortie complète de `npm run lint` avec code retour.
- Fournir la sortie complète de `npm run build` avec code retour.
- Si une commande ne peut pas être exécutée, expliquer exactement pourquoi et écrire : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Ne pas modifier Prisma, API, RBAC, autoschedule, matching ou logique métier lourde sauf nécessité bloquante explicitement justifiée.
- La fidélité visuelle à la maquette prime sur les micro-corrections locales.

RÉFÉRENCES OBLIGATOIRES
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`
- `docs/1-master/MAQUETTE/MAQUETTE_DA`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2.png`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png`

RÈGLE D’AUTORITÉ
- `MAQUETTE_DA` et les images Planning officielles guident la cible visuelle.
- `CODE > DOCUMENTATION` pour la logique fonctionnelle réelle.
- Toute information manquante : `INFORMATION NON FOURNIE — À CONFIRMER`.


============================================================
PÉRIMÈTRE STRICT DE CETTE SESSION
============================================================

Inclure :
- sessions A25-PLAN-UI-06 à A25-PLAN-UI-10 ;
- patchs code A25-07, A25-08, A25-09 ;
- preuves `git apply --check` ;
- encodage UTF-8 sans BOM ;
- sorties lint/build ;
- documentations de session ;
- checklists visuelles manuelles ;
- confirmation utilisateur de validation visuelle ;
- résiduels bloquants / non bloquants ;
- décision de clôture.

Exclure systématiquement :
- `docs/2-sessions/1-ALPHA/BLOC_A25/ARCHIVE` ;
- nouveau moteur planning ;
- refonte autoschedule ;
- refonte matching ;
- refonte API / Prisma / RBAC lourde ;
- suppression physique généralisée ;
- RH avancée ;
- refonte mobile complète ;
- nouvelle direction artistique.

TRAVAIL SPÉCIFIQUE CLÔTURE
- Ne pas produire de correctif code sauf instruction explicite.
- La clôture ne peut pas être positive sans retour visuel manuel favorable de Nathan.
- Si le retour visuel utilisateur manque, écrire `BLOC A25 CLÔTURABLE DÉFINITIVEMENT : NON` ou `INFORMATION NON FOURNIE — À CONFIRMER` selon le niveau de preuve.
- Ne pas tenir compte des anciennes sessions dans `ARCHIVE`, sauf pour signaler explicitement qu’elles sont obsolètes et ignorées.


PATCH ATTENDU
- Aucun patch code applicatif n’est attendu en phase 1.
- Si aucun code n’est modifié, ne pas créer de faux patch.
- Préparer uniquement la conclusion `NO_PATCH_CODE` en réponse, puis attendre `AUTORISÉ : DOCUMENTATION` avant de remplir `PATCH/NO_PATCH.md`.
- Si un écart impose un correctif code, arrêter et expliquer pourquoi avant de produire le patch.


============================================================
VALIDATIONS TERMINALES PHASE 1
============================================================

Exécuter réellement si l’environnement le permet :

```powershell
npm run lint
npm run build
```

Fournir pour chaque commande :
- commande exacte ;
- sortie complète ;
- code retour ;
- mention claire si non exécutée.

============================================================
RÉPONSE FINALE PHASE 1 ATTENDUE
============================================================

Répondre avec :

1. Résumé du travail code / audit technique
2. Fichiers lus
3. Fichiers modifiés, ou confirmation `aucun fichier code modifié`
4. Périmètre traité
5. Périmètre volontairement non traité
6. Patch produit ou `NO_PATCH_CODE`
7. Preuve UTF-8 sans BOM si patch produit
8. Preuve `git apply --check` si patch produit
9. Sortie complète `npm run lint` avec code retour
10. Sortie complète `npm run build` avec code retour
11. Checklist visuelle manuelle à faire par Nathan
12. Confirmation : aucune documentation de session rédigée sans autorisation
13. Confirmation : aucune capture produite
14. Confirmation : aucun ZIP généré
15. Verdict phase 1

Verdict attendu :
`PRODUCTION CODE SESSION-20260510-11_A25_CLOTURE_A25 PRÊTE POUR CONTRÔLE : OUI`
ou
`PRODUCTION CODE SESSION-20260510-11_A25_CLOTURE_A25 PRÊTE POUR CONTRÔLE : NON`

```

## 6.2 PROMPT DE CONTRÔLE — ChatGPT

```text
Tu es ChatGPT en discussion de contrôle qualité.

Je vais te transmettre la production phase 1 de la session suivante :

- Session : SESSION-20260510-11_A25_CLOTURE_A25
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : VALIDATION
- Intitulé : Clôture finale du bloc A25

Objectif :
Contrôler le travail phase 1 fourni par Codex sans rejouer la session et décider si Nathan peut autoriser la documentation.


============================================================
RÈGLES COMMUNES DE CONTRÔLE — CHATGPT
============================================================

Tu dois contrôler uniquement ce que Codex fournit.
Tu ne dois pas rejouer la session, refaire l’audit complet du dépôt, inventer des preuves ou combler les manques par hypothèse.

Contrôle uniquement après réception :
- de la réponse finale de production phase 1 ;
- du patch code si la session en produit un ;
- de la preuve réelle `git apply --check` si patch produit ;
- des sorties complètes `npm run lint` et `npm run build` avec codes retour ;
- de la checklist visuelle manuelle ;
- des fichiers documentaires uniquement si Nathan a déjà autorisé la documentation ;
- du ZIP documentaire final versionné uniquement après phase documentaire, si Nathan le fournit.

Avant autorisation documentaire, ton rôle est de décider :
- `CODE VALIDABLE : OUI / NON`
- `DOCUMENTATION AUTORISÉE : OUI / NON`
- `CORRECTIONS REQUISES : OUI / NON`

Tu dois vérifier que Codex :
- n’a pas modifié la documentation sans autorisation ;
- n’a pas produit de captures ;
- n’a pas scanné inutilement tout le dépôt ;
- n’a pas généré de ZIP sans demande ;
- n’a pas touché aux zones hors périmètre ;
- a respecté le périmètre A25 et la maquette officielle.

Si une information manque, écrire exactement :
`INFORMATION NON FOURNIE — À CONFIRMER`


============================================================
ÉLÉMENTS À ATTENDRE AVANT CONTRÔLE
============================================================

- réponse finale de production phase 1 ;

- confirmation qu’aucun patch code applicatif n’était attendu ;
- justification `NO_PATCH_CODE` si aucun code n’est produit ;
- sorties complètes `npm run lint` et `npm run build` avec codes retour ;
- checklist visuelle manuelle ;
- confirmation qu’aucune documentation de session n’a été rédigée sans autorisation ;
- confirmation qu’aucune capture ni ZIP n’a été produit.

============================================================
POINTS À CONTRÔLER
============================================================

Vérifier que la production couvre :
- couverture A25-06 à A25-10 ;
- patchs produits ;
- preuves terminales ;
- docs autorisées ;
- ZIP documentaire final versionné ;
- retour visuel manuel Nathan ;
- résiduels ;
- verdict de clôture ;
- ignorance du dossier ARCHIVE.

Vérifier aussi :
- respect de `REFERENCE_UI_UX_A25_PLANNING.md` ;
- fidélité à `Planning_V1.2.png` et `Planning_V1.2_INFO_DETAIL.png` ;
- absence d’action inutile ;
- absence de scan large ;
- absence de documentation prématurée ;
- absence de capture ;
- absence de ZIP non demandé ;
- absence de modification hors périmètre.



============================================================
FORMAT DE RÉPONSE ATTENDU
============================================================

Répondre avec :

1. Informations reçues
2. Informations manquantes
3. Contrôle du périmètre
4. Contrôle du patch / NO_PATCH_CODE
5. Contrôle des preuves terminales
6. Contrôle de la fidélité maquette
7. Contrôle de la checklist visuelle manuelle
8. Contrôle des actions inutiles / scans / captures / ZIP
9. Écarts ou réserves
10. Verdict final

Verdicts obligatoires :

- `CODE VALIDABLE : OUI` ou `CODE VALIDABLE : NON`
- `DOCUMENTATION AUTORISÉE : OUI` ou `DOCUMENTATION AUTORISÉE : NON`
- `CORRECTIONS REQUISES : OUI` ou `CORRECTIONS REQUISES : NON`

Si `DOCUMENTATION AUTORISÉE : OUI`, ajouter exactement :
`AUTORISÉ : DOCUMENTATION`

Si non validable, préciser exactement les corrections à demander à Codex.

```
