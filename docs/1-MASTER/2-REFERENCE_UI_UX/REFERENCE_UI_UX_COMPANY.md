# Ambulance Manager — RÉFÉRENCE UI/UX SOCIÉTÉ

Version : V1.0.0 — SPÉCIFICATION VISUELLE MAQUETTE 99 %  
Date : 13/05/2026  
Chantier concerné : `Documentation transversale UI/UX — hors bloc applicatif`  
Document cible à déposer dans le repo : `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_COMPANY.md`

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
/company
```

### 2.2 Fichiers code probables

```txt
app/company/page.tsx
app/company/company-profile-form.tsx
app/company/company-rules-panel.tsx
app/app-shell.tsx
app/globals.css
app/ui/*
```

### 2.3 Maquette officielle

Chemin logique attendu :

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_DA/A21-UX-04_MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0/2-Société-paramètres-métier/Société_V1.0.png
```

Le chemin doit rester en français avec accents. Codex ne doit pas utiliser de variante non accentuée.

## 3. Nature visuelle de la page

La page `Société` est une page de paramètres administratifs sobres.

Elle ne doit pas ressembler à un tableau de gestion dense ni à un formulaire long plein écran. La maquette montre une page très structurée en trois colonnes visuelles :

```txt
┌──────────────────── Shell global ────────────────────┐
│ Sidebar │ Topbar                                      │
│         ├─────────────────────────────────────────────┤
│         │ Header Société + bouton Enregistrer         │
│         │                                             │
│         │ Identité société │ Paramètres │ Résumé      │
│         │                                             │
│         │                            Annuler / Save   │
└───────────────────────────────────────────────────────┘
```

La lecture doit être immédiate : identité à gauche, règles métier au centre, résumé à droite.

## 4. Structure visible à reproduire

### 4.1 Header de page

Éléments visibles :

- titre principal `Société` ;
- sous-titre `Gérez l'identité de la société et les paramètres métier principaux.` ;
- bouton primaire `Enregistrer` en haut à droite de la zone de contenu ;
- icône de disquette dans le bouton.

Rendu attendu :

- titre bleu profond, très lisible ;
- sous-titre gris bleuté ;
- bouton bleu primaire, arrondi, hauteur importante ;
- pas de breadcrumb ;
- pas de barre de recherche ;
- pas de surcouche fonctionnelle supplémentaire.

### 4.2 Carte `Identité société`

Position : colonne gauche, grande carte blanche.

Structure visible :

- icône bâtiment dans un rond gris/bleu pâle ;
- titre `Identité société` ;
- badge/pastille `Profil société` à droite du titre ;
- formulaire vertical avec champs :
  - `Nom de la société` ;
  - `Gérants` ;
  - `Adresse` ;
  - `Téléphone` ;
  - `SIRET`.

Règles visuelles :

- carte arrondie avec bordure fine ;
- fond blanc ;
- labels sobres ;
- champs de saisie larges, blancs, bordure gris clair ;
- hauteur des champs confortable ;
- pas de messages techniques visibles ;
- pas de debug ;
- pas de validation fonctionnelle envahissante dans cette phase.

### 4.3 Carte `Paramètres métier`

Position : colonne centrale, carte la plus importante après l'identité.

Structure visible :

- titre `Paramètres métier` ;
- badge `ALPHA` ;
- champ `Repos minimum entre deux shifts` avec valeur `11` et suffixe `h` ;
- section `Mode d'affichage planning` avec un segment à deux options :
  - `SIMPLE` ;
  - `AMBULANCE` actif en bleu ;
- section `Règles métier ALPHA` avec tableau compact.

Tableau visible :

| Colonne | Exemple maquette |
|---|---|
| Paramètre | Repos minimum planning |
| Valeur | 11 h |
| Mode | BOTH / BLOCK / ALERT / OFF |

Règles visuelles :

- tableau compact, bordures fines ;
- badges de mode colorés mais sobres ;
- pas de formulaire avancé ;
- pas d'explication longue ;
- pas de paramètres non visibles dans la maquette si cela surcharge la page.

### 4.4 Carte `Résumé société`

Position : colonne droite.

Structure visible :

- titre `Résumé société` ;
- liste verticale de blocs récapitulatifs séparés par des lignes fines ;
- chaque bloc contient une icône dans un rond pâle, un libellé, puis une valeur.

Éléments visibles :

- `Société active` → `SC Ambulances` ;
- `Dépôts actifs` → `3 dépôts` ;
- `Utilisateurs actifs` → `27 utilisateurs` ;
- `Véhicules actifs` → `36 véhicules` ;
- `Dernière mise à jour` → date + heure.

Règles visuelles :

- colonne de résumé plus étroite ;
- valeurs importantes en bleu ou vert selon la maquette ;
- icônes larges dans des pastilles ;
- pas de graphique ;
- pas de détail fonctionnel supplémentaire.

### 4.5 Barre d'action basse

Visible en bas à droite de la page :

- bouton secondaire `Annuler` ;
- bouton primaire `Enregistrer les modifications`.

Règles :

- alignement à droite ;
- taille large ;
- espace net entre les boutons ;
- si le code actuel duplique les boutons haut/bas, la duplication peut être conservée uniquement si elle correspond visuellement à la maquette.

## 5. Proportions et rythme visuel

Repères approximatifs sur desktop large :

| Zone | Cible visuelle |
|---|---|
| Sidebar | largeur fixe héritée du Shell global |
| Topbar | hauteur héritée du Shell global |
| Padding contenu | environ 32–40 px |
| Grille principale | 3 colonnes |
| Colonne identité | environ 34 % |
| Colonne paramètres | environ 38 % |
| Colonne résumé | environ 25 % |
| Espacement cartes | 24–28 px |
| Hauteur des champs | environ 44–48 px |
| Rayon cartes | 14–18 px |

La page doit respirer. Elle ne doit pas être compressée.

## 6. Éléments à masquer, simplifier ou reporter si nécessaire

Pour respecter la maquette, il est autorisé de masquer ou simplifier visuellement :

- listes longues de paramètres métier non visibles ;
- blocs d'erreur techniques ;
- messages de succès trop envahissants ;
- champs société secondaires non présents dans la maquette ;
- aides textuelles longues ;
- tableaux de règles plus détaillés que la maquette ;
- boutons secondaires non visibles ;
- tout lien ou action technique qui casse la structure 3 colonnes.

Ne pas supprimer la logique fonctionnelle côté serveur dans cette phase. La suppression ici signifie uniquement suppression ou masquage visuel côté interface.

## 7. Interdictions pour cette page

Ne pas :

- transformer la page en module de configuration avancée ;
- ajouter un wizard ;
- ajouter des onglets non visibles ;
- ajouter des graphiques ;
- refaire les règles métier ;
- modifier les API `/api/company/profile` ou `/api/company/rules` ;
- modifier Prisma ;
- ajouter de nouvelles permissions ;
- afficher `INFORMATION NON FOURNIE — À CONFIRMER` dans l'interface.

## 8. DoD visuelle 99 %

La page est conforme si :

- le Shell global est respecté ;
- le titre, le sous-titre et le bouton `Enregistrer` sont positionnés comme la maquette ;
- les trois cartes principales existent et ont le bon ordre ;
- la carte identité ressemble à un formulaire sobre ;
- la carte paramètres contient le champ repos, le segment SIMPLE/AMBULANCE et le tableau des règles ;
- la carte résumé contient les 5 indicateurs visibles ;
- les espacements, bordures, arrondis et couleurs sont cohérents avec les autres pages ;
- la page ne déborde pas visuellement ;
- aucun bloc fonctionnel non visible ne surcharge la maquette ;
- la formule `INFORMATION NON FOURNIE — À CONFIRMER` n'apparaît pas dans l'UI.

## 9. Checklist de contrôle manuel Nathan

À vérifier visuellement après production :

```txt
[ ] Le titre Société correspond à la maquette.
[ ] Le bouton Enregistrer haut droit est visible et bleu.
[ ] La page est organisée en trois cartes principales.
[ ] La carte Identité société contient les 5 champs visibles.
[ ] La carte Paramètres métier contient le badge ALPHA.
[ ] Le segment SIMPLE / AMBULANCE est visible, avec AMBULANCE actif.
[ ] Le tableau des règles métier est compact.
[ ] La carte Résumé société est à droite.
[ ] Les boutons Annuler / Enregistrer les modifications sont alignés en bas à droite.
[ ] Aucun élément fonctionnel parasite ne casse la maquette.
[ ] Aucune formule documentaire n'apparaît dans l'interface.
```

## 10. Écarts connus à contrôler dans le code

À contrôler lors de la future production :

- le code peut afficher plus de paramètres métier que la maquette ;
- le code peut afficher des messages de chargement, erreur ou succès trop visibles ;
- le code peut avoir une hiérarchie de boutons différente ;
- le code peut séparer profil société et règles métier en deux composants avec un rendu non aligné ;
- le contenu réel peut être plus long que la maquette.

Ces écarts ne sont pas bloquants fonctionnellement, mais ils peuvent être masqués ou simplifiés visuellement.

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
- ce document REFERENCE_UI_UX_COMPANY.md

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
