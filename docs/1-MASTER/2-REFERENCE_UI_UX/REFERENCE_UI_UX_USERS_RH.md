# Ambulance Manager — RÉFÉRENCE UI/UX UTILISATEURS / RH

Version : V1.0.0 — SPÉCIFICATION VISUELLE MAQUETTE 99 %  
Date : 13/05/2026  
Chantier concerné : `Documentation transversale UI/UX — hors bloc applicatif`  
Document cible à déposer dans le repo : `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_USERS_RH.md`

---

## 0. Statut du document

Ce document fait partie du chantier documentaire transversal UI/UX hors bloc applicatif.

Il reprend la méthode validée sur `REFERENCE_UI_UX_A25_PLANNING.md` : partir de l'image officielle, décrire le rendu visible, traduire la maquette en consignes codables pour Codex, puis fournir une DoD visuelle contrôlable manuellement.

Ce document ne doit pas être lu comme une inspiration générale. Il doit servir de spécification visuelle à reproduire au plus près.

Objectif principal : permettre une future production Codex orientée uniquement vers la fidélité visuelle à environ 99 % de la maquette officielle, sans traiter le fonctionnel métier.


## 1. Règle d'autorité

### 1.1 Autorité visuelle

La vérité visuelle prioritaire est l'image officielle située dans `docs/1-MASTER/1-MAQUETTE/MAQUETTE_DA`.

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
/users
```

### 2.2 Fichiers code probables

```txt
app/users/page.tsx
app/users/users-list-client.tsx
app/users/users-side-panel-client.tsx
app/users/user-creation-client.tsx
app/users/user-edit-client.tsx
app/users/user-absence-client.tsx
app/users/user-archive-client.tsx
app/users/reset-password-client.tsx
app/users/user-depot-assignment-client.tsx
app/a24-users-rh.css
app/app-shell.tsx
app/globals.css
app/ui/*
```

### 2.3 Maquette officielle

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/3-Utilisateurs-RH/Utilisateurs-RH_V1.png
```

## 3. Nature visuelle de la page

La page `Utilisateurs / RH` est une page dense mais très structurée.

La maquette montre :

- une liste utilisateurs principale ;
- des KPI RH ;
- des filtres ;
- un tableau de salariés ;
- un panneau droit détaillé avec onglets ;
- l'onglet actif `Absences` ;
- une zone de sécurité rouge en bas de panneau.

La page doit rester une console RH lisible, pas une accumulation de formulaires.

## 4. Structure visible à reproduire

### 4.1 Header

Éléments :

- titre `Utilisateurs / RH` ;
- sous-titre `Gérez les salariés, rôles, permissions, rattachements, horaires et absences.` ;
- bouton primaire `Créer un utilisateur`.

### 4.2 KPI

Quatre cartes :

| KPI | Exemple |
|---|---|
| Utilisateurs actifs | 28 sur 34 utilisateurs |
| Stagiaires | 4 sur 34 utilisateurs |
| Absences en cours | 6 utilisateurs |
| Comptes archivés | 3 inactifs |

Couleurs : bleu, turquoise, orange, gris/bleu foncé.

### 4.3 Filtres

Éléments visibles :

- recherche `Rechercher un nom, email, initiales...` ;
- filtre `Rôle` ;
- filtre `Base` ;
- filtre `Statut` ;
- filtre `Stagiaire` ;
- bouton `Réinitialiser`.

Règles : une seule ligne claire, sans filtres avancés ouverts.

### 4.4 Tableau utilisateurs

Colonnes visibles :

```txt
[checkbox]
Identité
Initiales
Email
Rôle
Base
Téléphone
Statut
Stagiaire
Horaires
Dernière modif.
Actions
```

Rendu attendu :

- première ligne sélectionnée ;
- fond bleu très pâle + contour/bord bleu ;
- avatar initiales ;
- identité sur deux lignes ;
- rôle en badge ;
- statut en badge ;
- horaires sur deux lignes ;
- actions icône crayon + menu `...` ;
- pagination en bas.

### 4.5 Panneau droit utilisateur

Header :

- avatar initiales `NA` ;
- nom `Nathan Archenoul` ;
- badges `Admin` et `Actif` ;
- base `Siège` ;
- téléphone ;
- bouton `Enregistrer` ;
- icône fermer.

Onglets :

```txt
Identité
Rôle & permissions
RH
Absences
Sécurité
```

Onglet actif visible : `Absences`.

Contenu de l'onglet Absences :

1. Carte `Absences enregistrées`
   - bouton `Ajouter une absence` ;
   - tableau avec colonnes : Motif, Début, Fin, Statut, Actions ;
   - exemples : Congé payé, Indisponibilité, Formation ;
   - badges `Validée`, `En attente` ;
   - icône corbeille discrète.

2. Carte `Récapitulatif`
   - absences à venir ;
   - jours d'absence validés ;
   - dernière absence.

3. `Zone de sécurité`
   - fond rouge pâle ;
   - action `Réinitialiser le mot de passe` ;
   - action `Archiver l'utilisateur` ;
   - boutons rouges contour.

## 5. Proportions et rythme visuel

| Zone | Cible |
|---|---|
| Tableau principal | largeur majoritaire, environ 65–70 % |
| Panneau droit | environ 430–460 px |
| KPI | 4 cartes alignées |
| Filtres | une ligne |
| Panneau | hauteur complète, scroll interne si nécessaire |

Le panneau droit est plus large que celui des dépôts, car il contient des onglets et des tables internes.

## 6. Éléments à masquer, simplifier ou reporter

Autorisé :

- formulaires de création utilisateur ouverts par défaut ;
- édition complète de permissions si l'onglet actif n'est pas concerné ;
- détails RH avancés ;
- blocs de reset password trop techniques ;
- détails de rattachement dépôt si non visibles ;
- messages d'erreur API ;
- contrôles fonctionnels qui cassent la mise en page.

La page visible cible l'état `liste + détail utilisateur + onglet Absences`.

## 7. Interdictions

Ne pas :

- remplacer le tableau par des cards ;
- ouvrir la création utilisateur par défaut ;
- supprimer le panneau droit ;
- supprimer les onglets ;
- transformer l'onglet Absences en page séparée ;
- modifier les permissions, RBAC, API users ou Prisma ;
- afficher la formule documentaire dans l'interface.

## 8. DoD visuelle 99 %

La page est conforme si :

- le header et le CTA correspondent ;
- les 4 KPI sont visibles ;
- la barre de filtres correspond ;
- le tableau contient les colonnes visibles ;
- la ligne sélectionnée est claire ;
- le panneau droit affiche les informations de l'utilisateur sélectionné ;
- les 5 onglets sont présents ;
- l'onglet `Absences` est actif ;
- les cartes Absences, Récapitulatif et Zone de sécurité sont visibles ;
- les actions rouges sont visuellement sobres ;
- aucun module fonctionnel parasite ne surcharge l'écran.

## 9. Checklist de contrôle manuel Nathan

```txt
[ ] Le titre Utilisateurs / RH est conforme.
[ ] Le bouton Créer un utilisateur est en haut à droite.
[ ] Les 4 KPI sont alignés.
[ ] Les filtres Rôle, Base, Statut et Stagiaire sont visibles.
[ ] Le tableau contient les colonnes visibles dans la maquette.
[ ] La ligne Nathan Archenoul est sélectionnée ou une ligne équivalente est sélectionnée.
[ ] Le panneau droit affiche l'utilisateur sélectionné.
[ ] Les onglets Identité, Rôle & permissions, RH, Absences, Sécurité sont présents.
[ ] L'onglet Absences est actif.
[ ] Le tableau des absences est visible.
[ ] La zone de sécurité rouge pâle est en bas du panneau.
[ ] Aucun formulaire de création utilisateur n'est ouvert par défaut.
```

## 10. Écarts connus à contrôler dans le code

- la page contient plusieurs clients fonctionnels séparés ;
- la création, l'édition, l'archive, les absences et le reset password peuvent être trop présents visuellement ;
- il faut préserver l'état liste + panneau droit sans transformer la page en workflow complet ;
- le code réel peut avoir plus ou moins de champs que la maquette.

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
- ce document REFERENCE_UI_UX_USERS_RH.md

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
