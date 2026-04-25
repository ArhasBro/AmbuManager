# RÉALIGNEMENT DOCUMENTAIRE GLOBAL — docs

## 1. Décision

```text
RÉALIGNEMENT DOCUMENTAIRE GLOBAL : APPLIQUÉ
PATCH CODE REQUIS : NON
```

Aucun code applicatif n’a été modifié.

---

## 2. Objectif

Clarifier le dossier `docs/` avant toute reprise technique ou future intégration UI/UX.

Le but est de rendre la documentation plus lisible pour :

- l’utilisateur ;
- ChatGPT ;
- Codex / VS Code ;
- les futures sessions de développement.

---

## 3. Corrections appliquées

### 3.1 Templates

Les références obsolètes :

```text
docs/4-templates/
```

ont été remplacées par :

```text
docs/3-templates/
```

dans les documents concernés.

### 3.2 Ancien chemin master

Les références obsolètes :

```text
docs/master/
```

ont été remplacées par :

```text
docs/1-master/
```

lorsqu’elles pointaient vers le cadrage fonctionnel.

### 3.3 README sessions

`docs/2-sessions/README.md` a été clarifié :

- correction de `docs/sessions/` vers `docs/2-sessions/` ;
- ajout d’une section dédiée au dossier UI/UX documentaire séparé.

### 3.4 Plan de développement

Une note prudente a été ajoutée au bloc A21 pour préciser :

```text
Référence UI/UX validée documentairement.
Intégration code UI/UX non réalisée.
Aucun patch code produit dans ce dossier UI/UX.
```

### 3.5 README UI/UX racine

Création / clarification du fichier :

```text
docs/2-sessions/3-UI_UX-ALPHA/README.md
```

Ce fichier indique :

- quoi lire en priorité ;
- le rôle du dossier UI/UX ;
- la référence principale `REFERENCE_UI_UX_ALPHA_V1.0.md` ;
- la clôture documentaire ;
- la décision `Login_V1.1`.

### 3.6 STRUCTURE_DOCS

Ajout d’un avertissement indiquant que `STRUCTURE_DOCS.md` est un export informatif, non une source de vérité décisionnelle.

### 3.7 CMD

Ajout d’un avertissement indiquant que `CMD.md` est un mémo historique / brouillon opérationnel, non une source de vérité de gouvernance.

### 3.8 Cadrage UI/UX initial

Ajout d’une note indiquant que `CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md` est un cadrage initial, et que la référence finale UI/UX est :

```text
docs/2-sessions/3-UI_UX-ALPHA/A21-UX-06_VALIDATION_CODEX/REFERENCE_UI_UX_ALPHA_V1.0.md
```

---

## 4. Fichiers modifiés / ajoutés

```text
1-master/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md
1-master/PLAN_DE_DEVELOPPEMENT.md
1-master/REGISTRE_DECISIONS.md
2-sessions/3-UI_UX-ALPHA/A21-UX-01_CADRAGE/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md
2-sessions/3-UI_UX-ALPHA/README.md
2-sessions/README.md
3-templates/TEMPLATE_FIN_SESSION.md
CMD.md
README.md
SOURCES_AUTORISEES.md
STRUCTURE_DOCS.md
```

---

## 5. Sources de vérité après réalignement

### Produit / pilotage

```text
docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md
docs/1-master/DOCUMENT_MAITRE.md
docs/1-master/PLAN_DE_DEVELOPPEMENT.md
docs/1-master/ETAT_GLOBAL_PROJET.md
docs/1-master/REGISTRE_DECISIONS.md
docs/1-master/RECAP_DISCUSSIONS.md
docs/1-master/STRUCTURE_PROJET.md
```

### UI/UX

```text
docs/2-sessions/3-UI_UX-ALPHA/A21-UX-06_VALIDATION_CODEX/REFERENCE_UI_UX_ALPHA_V1.0.md
docs/2-sessions/3-UI_UX-ALPHA/A21-UX-07_CLOTURE_DOCUMENTAIRE_UI_UX/A21-UX-07_CLOTURE_DOCUMENTAIRE_UI_UX.md
```

### Templates

```text
docs/3-templates/
```

---

## 6. Règles de reprise

Avant une future étape technique, lire uniquement les documents utiles au périmètre.

Ne pas relire automatiquement :

```text
docs/2-sessions/1-ALPHA/ entier
docs/STRUCTURE_DOCS.md entier
docs/CMD.md
anciens prompts
anciens ZIP
```

Avant une future intégration UI/UX, lire :

```text
docs/2-sessions/3-UI_UX-ALPHA/README.md
docs/2-sessions/3-UI_UX-ALPHA/A21-UX-06_VALIDATION_CODEX/REFERENCE_UI_UX_ALPHA_V1.0.md
docs/2-sessions/3-UI_UX-ALPHA/A21-UX-07_CLOTURE_DOCUMENTAIRE_UI_UX/A21-UX-07_CLOTURE_DOCUMENTAIRE_UI_UX.md
```

---

## 7. Verdict

```text
Documentation exploitable pour la suite : OUI AVEC RÉSERVES MINEURES
Patch code requis : NON
Corrections documentaires : APPLIQUÉES
```

Réserves mineures possibles :

- conserver les historiques sans les utiliser comme sources décisionnelles ;
- ne pas confondre validation UI/UX documentaire et intégration code ;
- ne pas relancer l’intégration UI/UX avant cadrage de la session code dédiée.
