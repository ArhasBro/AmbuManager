# Ambulance Manager — RÉFÉRENCE UI/UX ONBOARDING

Version : V1.0.0 — SPÉCIFICATION VISUELLE MAQUETTE 99 %  
Date : 13/05/2026  
Chantier concerné : `Documentation transversale UI/UX — hors bloc applicatif`  
Document cible à déposer dans le repo : `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_ONBOARDING.md`

---

## 0. Statut du document

Ce document fait partie du chantier documentaire transversal UI/UX hors bloc applicatif.

Il reprend la méthode validée sur `REFERENCE_UI_UX_A25_PLANNING.md` : partir de l'image officielle, décrire le rendu visible, traduire la maquette en consignes codables pour Codex, puis fournir une DoD visuelle contrôlable manuellement.

Ce document ne doit pas être lu comme une inspiration générale. Il doit servir de spécification visuelle à reproduire au plus près.

Objectif principal : permettre une future production Codex orientée uniquement vers la fidélité visuelle à environ 99 % de la maquette officielle, sans traiter le fonctionnel métier.


## 1. Règle d'autorité

### 1.1 Autorité visuelle

La vérité visuelle prioritaire est le PNG officiel de la page, indiqué avec son chemin exact en section 2.2.

Règle de priorité :

```txt
Image PNG officielle > REFERENCE_UI_UX_<PAGE>.md > documentation MAQUETTE générale > anciennes captures > récit de production
```

En cas de contradiction visuelle, l'image officielle prévaut.

### 1.2 Autorité codable

Ce document est la traduction codable de la maquette pour Codex.

Il doit guider :

- la structure visible ;
- les proportions approximatives ;
- les alignements ;
- les espacements ;
- les composants communs ;
- les éléments à masquer, déplacer ou simplifier si le code réel affiche trop de fonctionnel ;
- la checklist de contrôle manuel.

### 1.3 Autorité fonctionnelle

Le code réel reste la vérité fonctionnelle.

Mais cette phase est strictement visuelle.

Règle verrouillée :

```txt
PRIORITÉ ACTUELLE = FIDÉLITÉ VISUELLE À 99 % AUX MAQUETTES OFFICIELLES.
```

Conséquences :

- le fonctionnel existant ne doit pas bloquer la reproduction visuelle ;
- si une action, un bouton, un formulaire, une donnée ou un bloc fonctionnel gêne la fidélité maquette, il peut être masqué, déplacé, replié, simplifié ou supprimé visuellement ;
- les arbitrages fonctionnels seront repris plus tard dans des sessions applicatives dédiées ;
- aucune API, Prisma, RBAC, moteur métier, logique serveur, autoschedule ou matching ne doit être modifié dans ce chantier documentaire ;
- les données visibles dans la maquette peuvent être remplacées par les données réelles, mais la structure visuelle doit rester la même.

### 1.4 Formule `INFORMATION NON FOURNIE — À CONFIRMER`

La formule exacte `INFORMATION NON FOURNIE — À CONFIRMER` est réservée aux documents, audits et contrôles QA.

Elle ne doit jamais être affichée telle quelle dans l'interface utilisateur finale.

## 2. Page concernée

### 2.1 Route réelle

```txt
/onboarding
```

### 2.2 Fichiers code probables

```txt
app/onboarding/page.tsx
app/onboarding/onboarding-client.tsx
app/a24-complementary-pages.css
app/app-shell.tsx
app/globals.css
app/ui/*
```

### 2.3 Maquette officielle

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/9-Onboarding société pilote/Onboarding_V1.2.png
```

### 2.4 Nomenclature fonctionnelle

- Ancien nom historique : `Onboarding`
- Nom fonctionnel actuel : `Mise en route`
- Nom de route conservé (historique technique) : `/onboarding`

## 3. Nature visuelle de la page

La page `Mise en route` (ancien nom historique : `Onboarding`) est un écran de préparation et d'import initial.

La maquette est structurée en trois colonnes :

- colonne gauche : progression de l'onboarding ;
- colonne centrale : import initial ;
- colonne droite : aide import.

L'objectif visuel est de montrer un workflow clair, guidé et rassurant, sans transformer la page en module d'import fonctionnel avancé.

## 4. Structure visible à reproduire

### 4.1 Header

Éléments :

- titre maquette `Onboarding société pilote` (libellé historique) ;
- sous-titre `Préparez les données nécessaires avant la première exploitation réelle.`.

Pas de bouton primaire dans le header ; l'action principale est dans la zone centrale et le panneau droit.

### 4.2 Colonne gauche — Progression de l'onboarding

Carte principale avec :

- titre `Progression de l'onboarding` ;
- barre de progression bleue ;
- pourcentage `56%` ;
- texte `7 étapes sur 12 complétées`.

Liste verticale/timeline de cards :

1. `Profil société`
   - badge `Terminé` vert ;
   - compteur `1 / 1` ;
   - bouton `Ouvrir`.

2. `Bases / dépôts`
   - badge `En cours` orange ;
   - compteur `2 / 4` ;
   - bouton `Configurer`.

3. `Utilisateurs`
   - badge `Terminé` vert ;
   - compteur `18` ;
   - bouton `Ouvrir`.

4. `Véhicules`
   - badge `Terminé` vert ;
   - compteur `7` ;
   - bouton `Ouvrir`.

5. `Templates`
   - badge `À compléter` rouge ;
   - compteur `12` ;
   - bouton `Configurer`.

Règles :

- ligne verticale discrète ;
- points d'état colorés ;
- cards blanches ;
- icônes larges dans pastilles.

### 4.3 Colonne centrale — Import initial

Carte centrale avec :

- titre `Import initial` ;
- stepper horizontal 1 à 5 :
  - Type d'import ;
  - Fichier ;
  - Aperçu ;
  - Erreurs ;
  - Validation.

Étape active visible : `1 Type d'import`.

Choix type d'import :

```txt
Utilisateurs
Véhicules
Templates
Dépôts
Absences utilisateurs
```

Zone dépôt fichier :

- bordure pointillée ;
- icône upload ;
- texte `Glissez-déposez votre fichier ici ou cliquez pour parcourir` ;
- formats acceptés : CSV, XLSX.

Fichier sélectionné :

- chip/card `utilisateurs_import.xlsx` ;
- taille et lignes détectées ;
- icône fichier Excel ;
- icône fermeture `X`.

Boutons :

- `Analyser le fichier` bleu ;
- `Télécharger un modèle` secondaire.

Aperçu import :

- tableau compact `Aperçu import` ;
- colonnes : Nom, Prénom, Email, Rôle, Base / Dépôt, Statut ;
- badges `Valide` / `À vérifier`.

Bas de carte :

- carte rouge pâle `Erreurs détectées` ;
- carte verte pâle `Prêt à importer` ;
- boutons `Annuler` et `Valider l'import`.

### 4.4 Colonne droite — Aide import

Panneau droit avec :

- titre `Aide import` ;
- icône fermer ;
- carte de progression circulaire `40%` ;
- texte `2 étapes terminées sur 5` ;
- section `Étape sélectionnée` avec badge `Utilisateurs` ;
- section `Conseils de préparation` ;
- tableau `Formats attendus` ;
- section `Ordre recommandé` avec étapes 1 à 5 ;
- bouton secondaire `Voir le guide` ;
- bouton primaire `Continuer`.

## 5. Proportions et rythme visuel

| Zone | Cible |
|---|---|
| Colonne gauche | environ 25 % |
| Colonne centrale | environ 50 % |
| Colonne droite | environ 25 % |
| Stepper | horizontal, visible en haut de la carte centrale |
| Dropzone | grande, respirante |
| Bas central | deux cartes erreurs/prêt côte à côte |

La page doit rester lisible sans scroll excessif sur desktop.

## 6. Éléments à masquer, simplifier ou reporter

Autorisé :

- logique d'import complète si elle surcharge ;
- validations détaillées non visibles ;
- logs techniques ;
- erreurs brutes ;
- actions de commit trop complexes ;
- états non représentés par la maquette ;
- modules import avancés.

La maquette peut être reproduite avec des données réelles ou de démonstration si nécessaire pour l'état visuel.

## 7. Interdictions

Ne pas :

- transformer l'écran en simple formulaire upload ;
- supprimer la colonne gauche de progression ;
- supprimer le panneau droit d'aide ;
- remplacer le stepper par une liste verticale ;
- afficher des erreurs techniques brutes ;
- modifier API imports, Prisma ou logique d'import ;
- rendre l'import réellement bloquant pour cette phase visuelle.

## 8. DoD visuelle 99 %

La page est conforme si :

- les trois colonnes sont présentes ;
- la progression onboarding ressemble à la maquette ;
- la carte import contient le stepper 1–5 ;
- les types d'import sont visibles ;
- la dropzone est visible ;
- le fichier sélectionné est affiché ;
- l'aperçu import est visible ;
- les cartes erreurs/prêt sont en bas ;
- le panneau Aide import contient progression, conseils, formats, ordre recommandé et CTA ;
- aucun état fonctionnel avancé ne casse la structure.

## 9. Checklist de contrôle manuel Nathan

```txt
[ ] Le titre Onboarding société pilote est conforme.
[ ] La page est en trois colonnes.
[ ] La colonne gauche affiche la progression 56 % ou une progression équivalente.
[ ] Les cards Profil société, Bases / dépôts, Utilisateurs, Véhicules, Templates sont visibles.
[ ] Le stepper Import initial affiche 5 étapes.
[ ] Les boutons Utilisateurs, Véhicules, Templates, Dépôts, Absences utilisateurs sont visibles.
[ ] La dropzone fichier est visible.
[ ] Le fichier utilisateurs_import.xlsx ou un fichier équivalent est affiché.
[ ] L'aperçu import est visible.
[ ] Les cartes Erreurs détectées et Prêt à importer sont visibles.
[ ] Le panneau Aide import est visible à droite.
[ ] Le bouton Continuer est en bas du panneau droit.
```

## 10. Écarts connus à contrôler dans le code

- le code réel peut être plus fonctionnel que la maquette ;
- les imports peuvent dépendre d'un fichier réel ;
- les états preview/commit peuvent ne pas être simultanément visibles ;
- pour la fidélité visuelle, un état de démonstration ou un état sélectionné peut être utilisé sans modifier le backend.

## 11. Règles futures pour Codex

Lors d'une future session de production UI :

- lire d'abord `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md` ;
- lire ensuite `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md` ;
- lire ce document de page ;
- lire uniquement les fichiers code utiles à cette page ;
- ne pas scanner inutilement tout le dépôt ;
- ne pas produire de capture automatique ;
- fournir une checklist claire pour la vérification visuelle manuelle par Nathan ;
- ne pas transformer la session UI en session fonctionnelle ;
- ne pas modifier Prisma, API, RBAC, services métier ou logique serveur sauf nécessité explicitement demandée dans une session ultérieure.

Livrable attendu lors d'une future production code : un patch visuel ciblé, sobre, contrôlable, aligné sur la maquette.

## 12. Prompt court futur pour Codex

```txt
Tu travailles sur Ambulance Manager.

Objectif : réaligner uniquement le visuel de la page concernée avec sa maquette officielle à 99 %, sans traiter le fonctionnel métier.

Lis d'abord :
- docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md
- docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md
- ce document REFERENCE_UI_UX_ONBOARDING.md

Puis lis uniquement les fichiers code utiles à cette page.

Règles :
- image officielle = vérité visuelle ;
- code réel = vérité fonctionnelle ;
- fonctionnel non bloquant pour cette phase ;
- masquer, déplacer, replier ou simplifier les éléments fonctionnels qui empêchent la fidélité maquette ;
- ne pas modifier API, Prisma, RBAC, services métier ou logique serveur ;
- ne pas produire de captures ;
- fournir une checklist de contrôle visuel manuel.
```
