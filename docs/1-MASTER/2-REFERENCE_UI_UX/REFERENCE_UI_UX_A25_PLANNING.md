# Ambulance Manager â€” RÃ‰FÃ‰RENCE UI/UX A25 PLANNING

Version : V2.0.0 â€” RÃ‰Ã‰CRITURE COMPLÃˆTE MAQUETTE 99 %  
Date : 10/05/2026  
Bloc concernÃ© : `A25 â€” Planning UI/UX & ergonomie mÃ©tier`  
Document cible Ã  dÃ©poser dans le repo : `docs\1-MASTER\2-REFERENCE_UI_UX`

---

## 0. Statut du document

Ce document remplace intÃ©gralement la version prÃ©cÃ©dente de `REFERENCE_UI_UX_A25_PLANNING.md`.

Il a Ã©tÃ© rÃ©Ã©crit Ã  partir :

- des images de rÃ©fÃ©rence Planning fournies ;
- de la version existante du document `REFERENCE_UI_UX_A25_PLANNING.md` ;
- du cadrage A25 validÃ© oralement : le bloc A25 doit viser une refonte globale de la page Planning, proche Ã  environ 99 % de la maquette visible.

Ce document ne doit pas Ãªtre lu comme une inspiration gÃ©nÃ©rale. Il doit Ãªtre utilisÃ© comme une spÃ©cification visuelle et ergonomique de reproduction.

Objectif principal : permettre Ã  Codex de reconstruire ensuite la page Planning de maniÃ¨re fidÃ¨le, structurÃ©e et vÃ©rifiable.

---

## 1. RÃ¨gle d'autoritÃ© A25

### 1.1 RÃ©fÃ©rences visuelles officielles

Les rÃ©fÃ©rences officielles du Planning A25 sont les images situÃ©es dans :

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/4-Planning
```

Images principales analysÃ©es :

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/4-Planning/Planning_V1.2.png
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/4-Planning/Planning_V1.2_INFO_DETAIL.png
```

`Planning_V1.2.png` est la rÃ©fÃ©rence visuelle propre.

`Planning_V1.2_INFO_DETAIL.png` est la mÃªme rÃ©fÃ©rence avec encadrements d'analyse :

- rouge : zone globale de contenu Planning ;
- bleu : filtres, bascule de vue et exports ;
- orange : onglets internes de navigation ;
- violet : contenu principal pilotÃ© par l'onglet actif ;
- vert : panneau latÃ©ral droit contextuel, lui aussi pilotÃ© par l'onglet actif.

Point de cadrage majeur : l'encadrÃ© orange n'est pas un simple Ã©lÃ©ment dÃ©coratif ou une navigation secondaire passive. Il contrÃ´le le contenu affichÃ© dans l'encadrÃ© violet et les informations affichÃ©es dans l'encadrÃ© vert. Dans l'image fournie, l'onglet actif est `Planning manuel`, donc l'encadrÃ© violet montre la matrice planning et l'encadrÃ© vert montre le dÃ©tail de cellule correspondant. Les contenus des autres onglets ne sont pas visibles dans l'image.

### 1.2 RÃ¨gle d'autoritÃ© visuelle

```txt
Images Planning_V1.2 > anciennes captures > descriptions textuelles anciennes
```

Le document prÃ©sent doit guider l'intÃ©gration, mais en cas de contradiction visuelle, l'image de rÃ©fÃ©rence prÃ©vaut.

### 1.3 RÃ¨gle d'autoritÃ© fonctionnelle

```txt
CODE rÃ©el du repo > documentation produit > hypothÃ¨ses
```

La maquette fixe le rendu cible. Le code rÃ©el fixe ce qui existe fonctionnellement.

ConsÃ©quence :

- il faut reproduire la maquette visuellement ;
- il ne faut pas inventer une fonctionnalitÃ© mÃ©tier non prÃ©sente ;
- les donnÃ©es visibles dans la maquette peuvent Ãªtre remplacÃ©es par les donnÃ©es rÃ©elles du repo ;
- aucune API, Prisma, RBAC, autoschedule ou matching ne doit Ãªtre refondu sans nÃ©cessitÃ© explicite.

### 1.4 Phrase obligatoire en cas d'incertitude

Si une information n'est pas visible dans les images ou non confirmÃ©e dans le code, Ã©crire exactement :

```txt
INFORMATION NON FOURNIE â€” Ã€ CONFIRMER
```

---

## 2. Changement de cadrage important pour A25

La page Planning ne doit plus Ãªtre traitÃ©e comme une addition de zones corrigÃ©es sÃ©parÃ©ment.

La cible visible est une page complÃ¨te, unifiÃ©e, structurÃ©e autour de :

- un header Planning sobre ;
- une barre de filtres horizontale ;
- des actions d'export secondaires ;
- des onglets internes fins ;
- une grande zone de contenu centrale pilotÃ©e par l'onglet actif ;
- pour l'onglet `Planning manuel`, une matrice Planning centrale ;
- un panneau droit fixe contextuel pilotÃ© par l'onglet actif ;
- pour l'onglet `Planning manuel`, un dÃ©tail de cellule ;
- une barre basse d'actions groupÃ©es lorsqu'une sÃ©lection multiple existe dans l'onglet actif ;
- une hiÃ©rarchie mÃ©tier claire : lecture globale â†’ sÃ©lection â†’ dÃ©tail â†’ action.

Le Planning A25 doit donc Ãªtre Ã©valuÃ© sur la fidÃ©litÃ© globale Ã  la maquette, pas uniquement sur la qualitÃ© technique d'un patch isolÃ©.

---

## 3. Ce que l'ancien document contenait dÃ©jÃ  et ce qui est renforcÃ© ici

### 3.1 DÃ©jÃ  prÃ©sent dans la version prÃ©cÃ©dente

L'ancien document contenait dÃ©jÃ  :

- l'objectif gÃ©nÃ©ral A25 ;
- le pÃ©rimÃ¨tre UI/UX Planning ;
- les exclusions fonctionnelles ;
- la rÃ©fÃ©rence Ã  `MAQUETTES PNG OFFICIELLES` ;
- le principe `Visible / DÃ©duction raisonnable / Ã€ vÃ©rifier dans le repo` ;
- des sections sur header, filtres, toolbar, onglets, grille, panneaux, badges et actions ;
- une recommandation de dÃ©coupage A25.

### 3.2 Limite de la version prÃ©cÃ©dente

La version prÃ©cÃ©dente restait trop gÃ©nÃ©rale. Elle disait quoi regarder, mais pas assez prÃ©cisÃ©ment comment reproduire la page.

Elle ne donnait pas suffisamment :

- les coordonnÃ©es visuelles approximatives ;
- les proportions rÃ©elles ;
- les largeurs / hauteurs ;
- les espacements ;
- le rythme vertical ;
- les dÃ©tails prÃ©cis des cellules ;
- la logique de table salariÃ© Ã— semaines ;
- la structure complÃ¨te du panneau droit ;
- la forme exacte de la barre d'actions groupÃ©es ;
- les contraintes de reproduction proche Ã  99 %.

### 3.3 Renforcement apportÃ© par cette V2

Cette version rÃ©Ã©crit le document comme une spÃ©cification quasi exÃ©cutable :

- analyse pixel-level approximative ;
- description dÃ©taillÃ©e des zones ;
- dimensions et espacements approximatifs ;
- couleurs visibles ou dÃ©ductibles ;
- composants React recommandÃ©s ;
- classes CSS recommandÃ©es ;
- critÃ¨res de conformitÃ© visuelle ;
- dÃ©coupage Codex rÃ©aliste pour reconstruire la page.

---

## 4. Lecture gÃ©nÃ©rale de la maquette

### 4.1 Format de rÃ©fÃ©rence

Les images fournies ont une dimension d'environ :

```txt
Largeur : 1586 px
Hauteur : 992 px
```

La maquette est une vue desktop large. Aucune maquette mobile Ã©quivalente n'est visible.

Responsive mobile :

```txt
INFORMATION NON FOURNIE â€” Ã€ CONFIRMER
```

### 4.2 Nature exacte de la page Planning visible

La maquette ne reprÃ©sente pas une grille calendrier classique jour par jour.

Elle reprÃ©sente une matrice synthÃ©tique :

```txt
Lignes = salariÃ©s
Colonnes fixes = salariÃ© / rÃ´le / base / statut
Colonnes temporelles = semaine 1 / semaine 2 / semaine 3 / semaine 4
Panneau droit = dÃ©tail de la cellule sÃ©lectionnÃ©e
Barre basse = actions groupÃ©es sur une sÃ©lection multiple
```

C'est le point le plus important pour la suite du bloc A25.

Si le code reconstruit une page composÃ©e de grandes cards de shifts empilÃ©es ou d'un calendrier semaine classique, le rendu ne correspondra pas Ã  la maquette.

### 4.3 Organisation macro

La page complÃ¨te est organisÃ©e ainsi :

```txt
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Sidebar gauche          â”‚ Topbar globale                               â”‚
â”‚                         â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Navigation              â”‚ Zone Planning                                â”‚
â”‚                         â”‚                                              â”‚
â”‚                         â”‚ Header Planning                              â”‚
â”‚                         â”‚ Filtres / vue / exports                      â”‚
â”‚                         â”‚ Onglets internes                             â”‚
â”‚                         â”‚ Grille salariÃ©s Ã— semaines     Panneau droit â”‚
â”‚                         â”‚ Barre basse actions groupÃ©es                 â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## 5. CoordonnÃ©es et proportions gÃ©nÃ©rales

Les coordonnÃ©es ci-dessous sont approximatives, basÃ©es sur l'image 1586 Ã— 992.

Elles servent Ã  guider l'intÃ©gration, pas Ã  imposer une reproduction CSS au pixel strict.

### 5.1 Shell global

| Zone | X approx. | Y approx. | Largeur approx. | Hauteur approx. | Commentaire |
|---|---:|---:|---:|---:|---|
| Sidebar | 0 | 0 | 262 px | 992 px | Navigation gauche existante |
| Topbar | 262 px | 0 | 1324 px | 61â€“64 px | Barre supÃ©rieure globale |
| Contenu Planning | 262 px | 61 px | 1317 px | 927 px | EncadrÃ© rouge dans l'image annotÃ©e |

### 5.2 Zones internes Planning

| Zone | X approx. | Y approx. | Largeur approx. | Hauteur approx. | Couleur d'encadrement |
|---|---:|---:|---:|---:|---|
| Page Planning globale | 262 | 61 | 1317 | 927 | rouge |
| Filtres / vue / exports | 289 | 170 | 1255 | 79 | bleu |
| Onglets internes | 279 | 271 | 695 | 50 | orange |
| Grille + barre bulk | 276 | 322 | 971 | 658 | violet |
| Panneau dÃ©tail droit | 1248 | 267 | 320 | 713 | vert |

### 5.3 Marges principales

| Ã‰lÃ©ment | Valeur cible approximative |
|---|---:|
| Padding gauche de contenu aprÃ¨s sidebar | 32 px |
| Padding droit global | 24â€“32 px |
| Espace topbar â†’ titre | 24 px |
| Titre â†’ sous-titre | 8 px |
| Sous-titre â†’ toolbar | 24â€“28 px |
| Toolbar â†’ onglets | 20â€“24 px |
| Onglets â†’ grille | 8â€“12 px |
| Grille â†’ panneau droit | 16 px |

---

## 6. Direction artistique globale

### 6.1 Ambiance gÃ©nÃ©rale visible

La maquette est :

- blanche ;
- lÃ©gÃ¨re ;
- sobre ;
- trÃ¨s propre ;
- professionnelle ;
- dense mais respirante ;
- proche d'un SaaS mÃ©tier santÃ© / transport ;
- non dÃ©corative ;
- non "dashboard colorÃ©".

La page doit Ã©viter :

- les ombres lourdes ;
- les fonds gris marquÃ©s ;
- les bordures sombres ;
- les gros boutons partout ;
- les cartes Ã©paisses ;
- les contrastes agressifs ;
- les couleurs saturÃ©es hors bleu primaire.

### 6.2 Palette visible ou dÃ©ductible

Les couleurs ci-dessous sont approximatives. Elles doivent Ãªtre harmonisÃ©es avec les tokens existants A24 si prÃ©sents.

| Usage | Couleur approximative | Commentaire |
|---|---|---|
| Fond gÃ©nÃ©ral | `#FEFEFE` / `#F8FAFC` | Blanc trÃ¨s lÃ©gÃ¨rement froid |
| Surface carte | `#FFFFFF` | Table, toolbar, panneau droit |
| Texte principal | `#071F44` | Bleu nuit trÃ¨s foncÃ© |
| Texte secondaire | `#64748B` / `#6B7890` | Gris bleutÃ© |
| Texte tertiaire | `#94A3B8` | MÃ©tadonnÃ©es, dates |
| Bordure fine | `#E8EEF7` / `#EDF1F7` | TrÃ¨s discrÃ¨te |
| Bleu primaire | `#0A66FD` / `#1674FE` | Bouton principal, actif, sÃ©lection |
| Bleu doux | `#EAF3FF` / `#EDF6FF` | Badges Ambulance, nav active |
| Vert doux | `#EAF8F0` / `#EAF7F6` | Actif, VSL, absence OK |
| Orange doux | `#FFF0DE` / `#FCE6CC` | Taxi, CongÃ© |
| Violet doux | `#F1E8FB` / `#EDE1F7` | Garde, week-end |
| Gris doux | `#F3F5F8` | Repos |
| Rouge doux | `#FEECEC` / `#FFF1F1` | Vider / danger discret |
| Rouge texte | `#DC2626` / `#EF4444` | IcÃ´ne et libellÃ© danger |

### 6.3 Bordures

La maquette utilise presque uniquement des bordures fines :

```css
border: 1px solid #e8eef7;
```

Les bordures ne doivent pas crÃ©er un effet tableau Excel dur.

### 6.4 Arrondis

Arrondis observÃ©s :

| Ã‰lÃ©ment | Radius approximatif |
|---|---:|
| Bouton principal | 6â€“8 px |
| Filter card | 8 px |
| Export button | 8 px |
| Table container | 8â€“10 px |
| Cellule sÃ©lectionnÃ©e | 6 px |
| Panneau droit | 10â€“12 px |
| Pills / badges | 4â€“6 px |
| Avatar rond | 999 px |

### 6.5 Ombres

La maquette ne montre pas d'ombre forte.

Ombre acceptable :

```css
box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
```

Mais la plupart des surfaces peuvent se contenter de bordures fines.

### 6.6 Typographie apparente

Police exacte :

```txt
INFORMATION NON FOURNIE â€” Ã€ CONFIRMER
```

Style dÃ©ductible : police sans-serif moderne, proche Inter / system UI.

Ã‰chelle typographique cible :

| Usage | Taille approx. | Poids | Couleur |
|---|---:|---:|---|
| Titre page `Planning` | 30â€“32 px | 700â€“800 | Bleu nuit |
| Sous-titre page | 14 px | 400â€“500 | Gris bleutÃ© |
| Label filtre | 12 px | 500 | Gris bleutÃ© |
| Valeur filtre | 13â€“14 px | 500â€“600 | Bleu nuit |
| Onglet | 14 px | 500â€“600 | Gris / bleu actif |
| Header table | 12â€“13 px | 700 | Bleu nuit |
| Nom salariÃ© | 13â€“14 px | 700 | Bleu nuit |
| Cellule secondaire | 12â€“13 px | 500 | Gris bleutÃ© |
| Badge shift | 12 px | 600 | Couleur type |
| Panneau droit titre | 16 px | 700 | Bleu nuit |
| Section panneau | 14 px | 700 | Bleu nuit |
| Action bouton | 13â€“14 px | 600 | Variable |

---

## 7. Sidebar gauche visible

La sidebar appartient au shell global mais conditionne la cohÃ©rence visuelle.

### 7.1 Visible dans l'image

La sidebar contient :

- logo ambulance ;
- texte `Ambulance Manager` ;
- badge `ALPHA` ;
- navigation :
  - Tableau de bord ;
  - Planning ;
  - Utilisateurs / RH ;
  - VÃ©hicules ;
  - Templates ;
  - SociÃ©tÃ© ;
  - DÃ©pÃ´ts ;
  - Onboarding ;
  - Audit ;
- bloc `ThÃ¨me` ;
- bloc utilisateur `Nathan A. / Admin`.

L'item `Planning` est actif :

- fond bleu trÃ¨s pÃ¢le ;
- icÃ´ne bleue ;
- texte bleu ;
- radius doux ;
- hauteur environ 48 px.

### 7.2 Ã€ reproduire cÃ´tÃ© page Planning

La page Planning ne doit pas recrÃ©er la sidebar.

Mais elle doit respecter la mÃªme direction :

- blancs propres ;
- bleu actif identique ;
- radius modÃ©rÃ©s ;
- pictogrammes fins ;
- aucune rupture de style.

---

## 8. Topbar visible

### 8.1 Visible dans l'image

Topbar horizontale, hauteur environ 60â€“64 px.

Ã€ droite :

- sÃ©lecteur sociÃ©tÃ© `SC Ambulances` ;
- bouton thÃ¨me soleil ;
- bloc utilisateur `Nathan A. / Admin` ;
- action `DÃ©connexion`.

### 8.2 Interaction avec la page Planning

Le contenu Planning commence sous cette topbar, avec un espace blanc propre.

Le titre ne doit pas coller Ã  la topbar.

---

## 9. Header Planning

### 9.1 Visible dans l'image

Le header contient :

```txt
Planning
Vue globale des shifts, absences et affectations du personnel
```

Ã€ droite ou lÃ©gÃ¨rement centrÃ© horizontalement dans la zone haute :

```txt
+ Ajouter un shift
```

### 9.2 CoordonnÃ©es approximatives

| Ã‰lÃ©ment | X approx. | Y approx. | Taille approx. |
|---|---:|---:|---:|
| Titre `Planning` | 296 px | 86 px | 32 px |
| Sous-titre | 296 px | 134 px | 14 px |
| Bouton `Ajouter un shift` | 1010 px | 121 px | 145 Ã— 40 px |

### 9.3 Style du titre

```css
font-size: 32px;
line-height: 1.15;
font-weight: 700 / 800;
color: #071f44;
letter-spacing: -0.02em;
```

### 9.4 Style du sous-titre

```css
font-size: 14px;
line-height: 1.45;
font-weight: 400 / 500;
color: #65758e;
```

### 9.5 Bouton principal

Le bouton est visuellement trÃ¨s prioritaire.

Cible :

```css
height: 40px;
padding: 0 18px;
border-radius: 7px;
background: #0a66fd;
color: white;
font-size: 13px;
font-weight: 600;
display: inline-flex;
align-items: center;
gap: 10px;
```

IcÃ´ne : `+`, fine, alignÃ©e verticalement.

### 9.6 Ã€ ne pas faire

- Ne pas placer plusieurs boutons principaux dans le header.
- Ne pas transformer le bouton en gros bloc pleine largeur.
- Ne pas mettre les exports au mÃªme niveau visuel que l'ajout de shift.

---

## 10. Barre filtres / vue / exports

### 10.1 Zone visible

Cette zone correspond Ã  l'encadrÃ© bleu de l'image annotÃ©e.

Elle est horizontale et se dÃ©compose en trois sous-zones :

```txt
[Filtres mÃ©tier] [Bascule Personnel / Vue dÃ©pÃ´t]          [Exports]
```

Elle ne doit pas devenir une pile verticale en desktop.

### 10.2 Dimensions approximatives

| Sous-zone | X approx. | Y approx. | Largeur approx. | Hauteur approx. |
|---|---:|---:|---:|---:|
| Barre complÃ¨te | 289 | 170 | 1255 | 79 |
| Filtres | 296 | 176 | 480 | 64 |
| Toggle vue | 790 | 176 | 168 | 48 |
| Exports | 1010 | 178 | 520 | 44 |

### 10.3 Filtres visibles

Filtres :

```txt
PÃ©riode     Mai 2024
DÃ©pÃ´t       Tous
RÃ´le        Tous
Utilisateur Tous
```

Chaque filtre est une carte blanche compacte.

Cible approximative :

```css
height: 64px;
min-width: 120px;
padding: 12px 14px;
border: 1px solid #e8eef7;
border-radius: 8px;
background: #fff;
display: flex;
flex-direction: column;
justify-content: center;
gap: 8px;
```

Structure interne :

```txt
Label gris petit
[icÃ´ne] Valeur [chevron]
```

Le label est en haut, plus petit.
La valeur est en bas, avec icÃ´ne Ã  gauche et chevron Ã  droite.

### 10.4 IcÃ´nes filtres

IcÃ´nes visibles ou dÃ©ductibles :

| Filtre | IcÃ´ne visible/dÃ©ductible |
|---|---|
| PÃ©riode | calendrier |
| DÃ©pÃ´t | bÃ¢timent / dÃ©pÃ´t |
| RÃ´le | utilisateur / personne |
| Utilisateur | utilisateur |

Les icÃ´nes sont fines, gris bleutÃ©, taille environ 16 px.

### 10.5 Toggle Personnel / Vue dÃ©pÃ´t

Visible :

```txt
[Personnel] [Vue dÃ©pÃ´t]
```

`Personnel` est actif.

Cible :

```css
height: 48px;
padding: 6px;
border: 1px solid #e8eef7;
border-radius: 8px;
background: #f8fafc;
display: flex;
gap: 4px;
```

Option active :

```css
background: #ffffff;
color: #1674fe;
border: 1px solid #eaf3ff;
box-shadow: 0 2px 8px rgba(15,23,42,0.04);
```

Option inactive :

```css
background: transparent;
color: #65758e;
```

### 10.6 Exports

Actions visibles :

```txt
Export PDF
Excel
CSV
Imprimer
```

Elles sont secondaires. Elles ne doivent pas concurrencer `Ajouter un shift`.

Chaque action ressemble Ã  un bouton blanc bordÃ© :

```css
height: 44px;
padding: 0 16px;
border-radius: 7px;
border: 1px solid #e8eef7;
background: #fff;
font-size: 13px;
font-weight: 600;
color: #1e2b4a;
display: inline-flex;
align-items: center;
gap: 10px;
```

Largeurs approximatives :

| Bouton | Largeur approx. |
|---|---:|
| Export PDF | 130 px |
| Excel | 105 px |
| CSV | 95 px |
| Imprimer | 130 px |

IcÃ´nes :

| Action | Couleur icÃ´ne visible |
|---|---|
| Export PDF | rouge |
| Excel | vert |
| CSV | gris/bleu |
| Imprimer | gris/bleu |

### 10.7 Ã€ ne pas faire

- Ne pas afficher les exports comme boutons bleus.
- Ne pas placer les exports sous la grille en desktop.
- Ne pas mÃ©langer filtres et exports sans sÃ©paration visuelle.
- Ne pas rendre les filtres trop hauts.

---

## 11. Onglets internes Planning

### 11.1 Visible dans l'image

Onglets visibles :

```txt
Planning manuel
Affectations
Autoschedule
Matching
Historique
Exports
```

L'onglet actif est `Planning manuel`.

### 11.2 Dimensions et position

| Ã‰lÃ©ment | X approx. | Y approx. | Largeur approx. | Hauteur approx. |
|---|---:|---:|---:|---:|
| Zone onglets | 279 | 271 | 695 | 50 |
| Ligne underline actif | 295 | 314 | 140 | 2â€“3 |

### 11.3 Style cible

La zone onglets est lÃ©gÃ¨re. Elle ne ressemble pas Ã  des boutons cards.

```css
height: 48px;
display: flex;
align-items: flex-end;
gap: 34px;
border-bottom: 1px solid #edf1f7;
```

Onglet :

```css
height: 48px;
display: inline-flex;
align-items: center;
font-size: 14px;
font-weight: 500 / 600;
color: #65758e;
position: relative;
```

Onglet actif :

```css
color: #1674fe;
```

Underline actif :

```css
position: absolute;
left: 0;
right: 0;
bottom: 0;
height: 2px;
background: #1674fe;
border-radius: 999px;
```

### 11.4 Comportement attendu

La maquette montre un seul contenu principal : `Planning manuel`.

Les autres onglets existent visuellement mais leur contenu n'est pas visible.

Point important ajoutÃ© aprÃ¨s clarification utilisateur : la zone d'onglets orange pilote les deux zones situÃ©es sous elle.

ConsÃ©quence directe :

```txt
Onglet actif orange â†’ contenu principal violet + panneau contextuel vert
```

Pour l'image visible :

```txt
Planning manuel actif â†’ matrice salariÃ©s Ã— semaines + dÃ©tail de cellule sÃ©lectionnÃ©e
```

Les autres onglets doivent donc Ãªtre compris comme des Ã©tats de contenu diffÃ©rents, et non comme des sections empilÃ©es dans une mÃªme longue page verticale.

### 11.5 Synchronisation onglet / contenu / panneau

RÃ¨gle UI/UX obligatoire :

- changer d'onglet doit modifier le contenu de l'encadrÃ© violet ;
- changer d'onglet doit aussi modifier, vider ou adapter le panneau vert ;
- le panneau vert ne doit pas afficher un dÃ©tail de cellule `Planning manuel` si l'utilisateur consulte un autre onglet ;
- la sÃ©lection courante doit Ãªtre propre Ã  l'onglet ou explicitement rÃ©initialisÃ©e au changement d'onglet ;
- il ne faut pas afficher simultanÃ©ment les contenus de tous les onglets sous forme de sections verticales.

Comportement visible uniquement pour `Planning manuel` :

```txt
Onglet : Planning manuel
Zone violette : matrice planning salariÃ©s Ã— semaines
Zone verte : dÃ©tail de la cellule sÃ©lectionnÃ©e
Barre basse : actions groupÃ©es sur la sÃ©lection multiple
```

Comportement des autres onglets :

```txt
Affectations : INFORMATION NON FOURNIE â€” Ã€ CONFIRMER
Autoschedule : INFORMATION NON FOURNIE â€” Ã€ CONFIRMER
Matching : INFORMATION NON FOURNIE â€” Ã€ CONFIRMER
Historique : INFORMATION NON FOURNIE â€” Ã€ CONFIRMER
Exports : INFORMATION NON FOURNIE â€” Ã€ CONFIRMER
```

Ces contenus ne doivent pas Ãªtre inventÃ©s Ã  partir de la maquette. Codex doit seulement prÃ©voir une architecture permettant au contenu violet et au panneau vert de changer selon l'onglet actif, sans crÃ©er de nouvelles fonctionnalitÃ©s mÃ©tier lourdes.

### 11.6 Ã€ vÃ©rifier dans le repo


- si les onglets affichent actuellement toutes les sections empilÃ©es ;
- si les onglets changent rÃ©ellement de contenu ;
- si certains onglets doivent rester dÃ©sactivÃ©s ;
- si les onglets doivent Ãªtre masquÃ©s selon permission.

Toute logique non visible :

```txt
INFORMATION NON FOURNIE â€” Ã€ CONFIRMER
```

---

## 12. Workspace principal

### 12.1 Organisation cible

Le workspace principal correspond aux zones violette et verte. Il est directement dÃ©pendant de l'onglet actif dans la zone orange.

Le cÅ“ur de la page est un layout Ã  deux colonnes lorsque l'onglet `Planning manuel` est actif :

```txt
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Grille planning salariÃ©s Ã— semaines              â”‚ Panneau dÃ©tail droit â”‚
â”‚ + barre basse actions groupÃ©es                    â”‚                      â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

La grille occupe la majoritÃ© de la largeur.
Le panneau droit est fixe, Ã©troit, lisible.

### 12.2 Dimensions approximatives

| Zone | X approx. | Y approx. | Largeur approx. | Hauteur approx. |
|---|---:|---:|---:|---:|
| Grille + bulk | 276 | 322 | 971 | 658 |
| Panneau droit | 1248 | 267 | 320 | 713 |
| Gap grille / panneau | 12â€“16 | â€” | â€” | â€” |

Important : le panneau droit commence plus haut que la table, Ã  peu prÃ¨s alignÃ© avec les onglets, tandis que la table commence sous les onglets.

### 12.3 Implication de code

Structure recommandÃ©e :

```tsx
<section className="planning-workspace">
  <div className="planning-main-column">
    <PlanningMatrix />
    <PlanningBulkActionBar />
  </div>
  <PlanningCellDetailPanel />
</section>
```

CSS cible :

```css
.planning-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 16px;
  align-items: start;
}
```

---

## 13. Grille principale Planning

### 13.1 Nature exacte

La grille principale est une table mÃ©tier.

Elle n'est pas :

- une liste de cards ;
- une grille horaire jour ;
- une vue calendrier 7 colonnes ;
- une succession verticale de sections.

Elle est :

```txt
une matrice salariÃ©s Ã— semaines
```

### 13.2 Colonnes visibles

Colonnes dans l'ordre :

```txt
SÃ©lection
SalariÃ©
RÃ´le
Base
Statut
Semaine 1
Semaine 2
Semaine 3
Semaine 4
```

### 13.3 Largeurs approximatives

| Colonne | Largeur approx. | Commentaire |
|---|---:|---|
| SÃ©lection | 44â€“48 px | Checkbox |
| SalariÃ© | 130â€“140 px | Avatar + nom |
| RÃ´le | 105â€“115 px | LibellÃ© mÃ©tier |
| Base | 95â€“105 px | DÃ©pÃ´t / siÃ¨ge |
| Statut | 80â€“90 px | Badge |
| Semaine 1 | 120â€“130 px | Badge planning |
| Semaine 2 | 120â€“130 px | Badge planning |
| Semaine 3 | 120â€“130 px | Badge planning |
| Semaine 4 | 120â€“130 px | Badge planning |

### 13.4 Table container

Style :

```css
background: #ffffff;
border: 1px solid #edf1f7;
border-radius: 8px;
overflow: hidden;
```

La table n'a pas d'ombre forte.

### 13.5 Header table

Hauteur approximative : 60â€“64 px.

Style :

```css
background: #ffffff;
border-bottom: 1px solid #edf1f7;
font-size: 12px;
font-weight: 700;
color: #1e2b4a;
```

Les titres des semaines sont centrÃ©s.

Chaque semaine possÃ¨de deux lignes :

```txt
Semaine 1
(29 avr. - 5 mai)
```

La ligne de dates est plus petite et plus claire.

### 13.6 Lignes salariÃ©s

Hauteur approximative : 64â€“66 px.

Les lignes sont sÃ©parÃ©es par des bordures trÃ¨s fines.

```css
border-bottom: 1px solid #f0f3f8;
```

Les lignes alternÃ©es ne sont pas fortement colorÃ©es. Le fond reste blanc.

### 13.7 Vertical separators

Des sÃ©parateurs trÃ¨s lÃ©gers existent entre les colonnes.

Ils doivent rester subtils :

```css
border-left: 1px solid #f3f6fa;
```

Ã€ Ã©viter : un tableau avec bordures grises Ã©paisses.

---

## 14. Colonne sÃ©lection

### 14.1 Visible

La premiÃ¨re colonne contient :

- une checkbox dans le header ;
- une checkbox par ligne ;
- les deux premiÃ¨res lignes sont cochÃ©es ;
- les autres lignes sont dÃ©cochÃ©es.

### 14.2 Style checkbox cochÃ©e

```css
width: 16px;
height: 16px;
border-radius: 4px;
background: #1674fe;
color: white;
```

### 14.3 Style checkbox non cochÃ©e

```css
width: 16px;
height: 16px;
border-radius: 4px;
background: white;
border: 1px solid #e5eaf3;
```

### 14.4 Comportement visible

La sÃ©lection multiple est reliÃ©e Ã  la barre basse `3 shifts sÃ©lectionnÃ©s`.

Le nombre visible ne correspond pas seulement aux lignes cochÃ©es de l'image. Il indique le nombre de shifts sÃ©lectionnÃ©s, pas nÃ©cessairement le nombre de salariÃ©s.

Ã€ vÃ©rifier dans le repo :

- sÃ©lection par shift ;
- sÃ©lection par cellule ;
- sÃ©lection par ligne ;
- cohÃ©rence du compteur.

---

## 15. Colonne salariÃ©

### 15.1 Visible

Chaque salariÃ© affiche :

- avatar rond avec initiales ;
- nom sur deux lignes si besoin.

Exemples visibles :

```txt
NA Nathan Archenoul
MB Marie Bernard
LP Lucas Petit
SC Sophie Chevalier
AD Alexandre Dubois
LM Laura Moreau
JF Julien Faure
CH Camille Henry
```

### 15.2 Avatar

```css
width: 32px;
height: 32px;
border-radius: 999px;
background: #f1f5f9;
color: #64748b;
font-size: 12px;
font-weight: 700;
display: inline-flex;
align-items: center;
justify-content: center;
```

### 15.3 Nom salariÃ©

```css
font-size: 13px;
font-weight: 700;
line-height: 1.35;
color: #1e2b4a;
```

Le nom peut passer sur deux lignes. La ligne doit rester stable et ne pas casser la hauteur.

---

## 16. Colonne rÃ´le

### 16.1 Visible

RÃ´les visibles :

```txt
Ambulancier
AmbulanciÃ¨re
Assistante planification
```

### 16.2 Style

```css
font-size: 12px;
font-weight: 500;
line-height: 1.4;
color: #64748b;
```

Le rÃ´le peut passer sur deux lignes, exemple `Assistante planification`.

---

## 17. Colonne base

### 17.1 Visible

Bases visibles :

```txt
DÃ©pÃ´t Nord
DÃ©pÃ´t Centre
DÃ©pÃ´t Sud
SiÃ¨ge
```

### 17.2 Style

MÃªme style que rÃ´le :

```css
font-size: 12px;
font-weight: 500;
color: #64748b;
```

---

## 18. Colonne statut

### 18.1 Visible

Statuts visibles :

```txt
Actif
En congÃ©
```

### 18.2 Badge Actif

```css
display: inline-flex;
align-items: center;
gap: 6px;
height: 22px;
padding: 0 9px;
border-radius: 999px;
background: #eaf8f0;
color: #16804a;
font-size: 12px;
font-weight: 600;
```

Le badge contient un petit point vert.

### 18.3 Badge En congÃ©

```css
height: 22px;
padding: 0 9px;
border-radius: 999px;
background: #eaf3ff;
color: #1674fe;
font-size: 12px;
font-weight: 600;
```

---

## 19. Colonnes semaines

### 19.1 Semaines visibles

```txt
Semaine 1  (29 avr. - 5 mai)
Semaine 2  (6 - 12 mai)
Semaine 3  (13 - 19 mai)
Semaine 4  (20 - 26 mai)
```

### 19.2 Style header semaine

Titre :

```css
font-size: 12px;
font-weight: 700;
color: #1e2b4a;
text-align: center;
```

Dates :

```css
font-size: 12px;
font-weight: 500;
color: #7c8aa3;
text-align: center;
margin-top: 4px;
```

### 19.3 Cellule semaine

Chaque cellule est centrÃ©e horizontalement.

Elle peut contenir :

- un badge principal ;
- un sous-libellÃ© sous le badge ;
- une bordure de sÃ©lection.

Cellule normale :

```css
padding: 12px 14px;
vertical-align: middle;
text-align: center;
```

---

## 20. Badges / pills planning

### 20.1 Style commun

Les cellules n'affichent pas de grandes cards. Elles affichent des badges compacts.

```css
min-width: 94px;
height: 24px;
padding: 0 12px;
border-radius: 5px;
font-size: 12px;
font-weight: 700;
display: inline-flex;
align-items: center;
justify-content: center;
```

### 20.2 Variantes visibles

| Type visible | Fond approximatif | Texte approximatif | Commentaire |
|---|---|---|---|
| Ambulance | `#E8F2FF` | `#1674FE` | Bleu doux |
| VSL | `#EAF7F6` | `#0F8B8D` | Vert/bleu trÃ¨s doux |
| Taxi | `#FFF0DE` | `#D97706` | Orange doux |
| Garde A | `#F1E8FB` | `#7C3AED` | Violet doux |
| Garde Nord | `#F1E8FB` | `#7C3AED` | Violet doux |
| Garde Nuit | `#F1E8FB` | `#7C3AED` | Violet doux |
| Repos | `#F3F5F8` | `#475569` | Gris doux |
| CongÃ© | `#FFF0DE` | `#EA580C` | Orange doux |

### 20.3 Sous-libellÃ©s visibles

Sous certains badges :

```txt
Samedi
Dimanche
JF 08/05
```

Style :

```css
margin-top: 6px;
font-size: 11px;
font-weight: 500;
color: #7c8aa3;
line-height: 1.2;
```

### 20.4 Cellule sÃ©lectionnÃ©e

La cellule sÃ©lectionnÃ©e est :

```txt
Nathan Archenoul / Semaine 3 / Ambulance / Samedi
```

Elle est entourÃ©e par une bordure bleue.

Style cible :

```css
border: 1.5px solid #1674fe;
border-radius: 6px;
background: #ffffff;
box-shadow: 0 0 0 1px rgba(22, 116, 254, 0.04);
```

La sÃ©lection doit rester sobre.
Elle ne doit pas remplir toute la cellule en bleu.

---

## 21. DonnÃ©es visibles dans la grille

### 21.1 Lignes visibles

| SalariÃ© | RÃ´le | Base | Statut | S1 | S2 | S3 | S4 |
|---|---|---|---|---|---|---|---|
| Nathan Archenoul | Ambulancier | DÃ©pÃ´t Nord | Actif | Ambulance | Ambulance | Ambulance + Samedi | Garde Nord |
| Marie Bernard | AmbulanciÃ¨re | DÃ©pÃ´t Centre | Actif | Taxi | VSL | Garde A | VSL |
| Lucas Petit | Ambulancier | DÃ©pÃ´t Sud | Actif | VSL | Ambulance | VSL | Ambulance + Dimanche |
| Sophie Chevalier | AmbulanciÃ¨re | DÃ©pÃ´t Nord | Actif | Taxi | Repos + Dimanche | Taxi + Samedi | Repos |
| Alexandre Dubois | Ambulancier | DÃ©pÃ´t Centre | Actif | Ambulance | VSL | Ambulance + Samedi | Ambulance |
| Laura Moreau | Assistante planification | SiÃ¨ge | Actif | Repos | Repos | Repos | Repos |
| Julien Faure | Ambulancier | DÃ©pÃ´t Sud | En congÃ© | CongÃ© | CongÃ© + JF 08/05 | CongÃ© | CongÃ© |
| Camille Henry | AmbulanciÃ¨re | DÃ©pÃ´t Nord | Actif | VSL | Garde Nuit | VSL + Samedi | Taxi + Dimanche |

Ces donnÃ©es sont visibles dans la maquette, mais ne doivent pas Ãªtre hardcodÃ©es si le repo dispose de donnÃ©es rÃ©elles.

---

## 22. Panneau droit â€” DÃ©tail de la cellule

### 22.1 Position et dimensions

Le panneau droit correspond Ã  l'encadrÃ© vert.

| Ã‰lÃ©ment | Valeur approx. |
|---|---:|
| X | 1248 px |
| Y | 267 px |
| Largeur | 320 px |
| Hauteur | 713 px |

Style gÃ©nÃ©ral :

```css
background: #ffffff;
border: 1px solid #e8eef7;
border-radius: 10px / 12px;
padding: 18px 20px;
box-shadow: 0 12px 32px rgba(15, 23, 42, 0.04);
```

### 22.2 RÃ´le du panneau

Le panneau affiche le dÃ©tail de la cellule sÃ©lectionnÃ©e dans la grille uniquement lorsque l'onglet actif est `Planning manuel`.

Clarification importante : ce panneau est contextuel Ã  l'onglet actif. Il ne doit pas Ãªtre considÃ©rÃ© comme un panneau fixe affichant toujours un dÃ©tail de cellule quelle que soit la navigation. Si l'utilisateur change d'onglet, le panneau doit changer de contenu, se vider ou afficher un Ã©tat adaptÃ©.

Pour `Planning manuel`, il doit permettre de garder la grille compacte tout en montrant :

- salariÃ© ;
- rÃ´le ;
- statut ;
- semaine ;
- plage de dates ;
- affectations ;
- absences ;
- conflits / alertes ;
- actions.

### 22.3 Header panneau

Visible :

```txt
DÃ©tail de la cellule                       X
```

Style :

```css
font-size: 16px;
font-weight: 700;
color: #071f44;
```

Bouton fermer :

```css
width: 28px;
height: 28px;
color: #94a3b8;
background: transparent;
border: 0;
```

### 22.4 Bloc identitÃ© salariÃ©

Visible :

```txt
[NA] Nathan Archenoul        [â€¢ Actif]
     Ambulancier
```

Structure :

```txt
Avatar initiales + nom/rÃ´le + badge statut Ã  droite
```

Le bloc est sÃ©parÃ© du reste par une bordure basse fine.

Avatar : mÃªme style que dans la grille, taille environ 32 px.

Nom :

```css
font-size: 13px;
font-weight: 700;
color: #1e2b4a;
```

RÃ´le :

```css
font-size: 12px;
color: #64748b;
```

### 22.5 Bloc semaine

Visible :

```txt
Semaine 3
13 - 19 mai 2024
```

Style :

```css
.section-title {
  font-size: 15px;
  font-weight: 700;
  color: #071f44;
}
.section-subtitle {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}
```

### 22.6 Bloc affectations

Visible :

```txt
Affectations (5)
```

Puis une card interne listant plusieurs journÃ©es.

L'image affiche :

```txt
Lun. 13 mai    Ambulance      07h - 19h
Mar. 14 mai    Ambulance      07h - 19h
Mer. 15 mai    Ambulance      15h - 23h
Jeu. 16 mai    Ambulance      07h - 19h
Ven. 17 mai    Ambulance      07h - 19h
Sam. 18 mai    Ambulance      07h - 19h
               Samedi (travail week-end)
```

Remarque : le titre indique `Affectations (5)` alors que six lignes journaliÃ¨res semblent visibles. Ne pas corriger arbitrairement en code sans comprendre la donnÃ©e rÃ©elle.

Ã€ vÃ©rifier :

```txt
INFORMATION NON FOURNIE â€” Ã€ CONFIRMER
```

### 22.7 Style card affectations

```css
background: #ffffff;
border: 1px solid #edf1f7;
border-radius: 8px;
padding: 8px 10px;
```

Chaque ligne :

```css
display: grid;
grid-template-columns: 88px 1fr auto;
align-items: center;
gap: 8px;
min-height: 28px;
font-size: 12px;
```

Jour/date : gris.
Type : bleu, semi-bold.
Horaire : gris bleutÃ©, alignÃ© Ã  droite.

### 22.8 Tag week-end

Visible :

```txt
Samedi (travail week-end)
```

Style :

```css
background: #f1e8fb;
color: #7c3aed;
border-radius: 999px;
padding: 3px 8px;
font-size: 11px;
font-weight: 600;
```

### 22.9 Bloc absences

Visible :

```txt
Absences 0
Aucune absence
```

Le `0` est un petit badge vert pÃ¢le.

Style section :

```css
margin-top: 16px;
```

`Aucune absence` : texte petit, gris.

### 22.10 Bloc conflits / alertes

Visible :

```txt
Conflits / alertes 0
Aucun conflit dÃ©tectÃ©.
```

Le message est dans un bloc vert trÃ¨s pÃ¢le.

```css
background: #eaf8f0;
color: #16804a;
border: 1px solid rgba(22, 128, 74, 0.10);
border-radius: 6px;
padding: 10px 12px;
font-size: 12px;
font-weight: 500;
```

### 22.11 Bloc actions

Visible :

```txt
Actions
[ Voir dÃ©tail      > ]
[ Modifier         > ]
[ + Ajouter shift  ]
```

Les deux premiÃ¨res actions sont secondaires.
La derniÃ¨re est principale.

Action secondaire :

```css
height: 36px;
border: 1px solid #edf1f7;
border-radius: 7px;
background: #ffffff;
color: #475569;
font-size: 13px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 12px;
```

Action primaire :

```css
height: 40px;
border-radius: 7px;
background: #1674fe;
color: white;
font-size: 13px;
font-weight: 700;
display: flex;
align-items: center;
justify-content: center;
gap: 8px;
```

---

## 23. Barre basse de sÃ©lection multiple

### 23.1 Position

La barre basse est situÃ©e sous la table, dans la colonne principale, pas dans le panneau droit.

Dimensions approximatives :

| Ã‰lÃ©ment | X approx. | Y approx. | Largeur approx. | Hauteur approx. |
|---|---:|---:|---:|---:|
| Barre bulk | 276 | 923 | 971 | 57 |

### 23.2 Contenu visible

```txt
3 shifts sÃ©lectionnÃ©s
Affecter employÃ© 1
Affecter employÃ© 2
Affecter vÃ©hicule
Affecter base
Vider
```

### 23.3 Style gÃ©nÃ©ral

```css
height: 56px;
display: grid;
grid-template-columns: 160px repeat(4, 1fr) 96px;
gap: 0;
background: #ffffff;
border: 1px solid #edf1f7;
border-radius: 8px;
overflow: hidden;
```

Chaque segment :

```css
border-left: 1px solid #edf1f7;
display: flex;
align-items: center;
justify-content: center;
gap: 8px;
font-size: 13px;
font-weight: 600;
color: #65758e;
```

Le premier segment n'a pas de border-left.

### 23.4 RÃ©sumÃ© sÃ©lection

```txt
3 shifts sÃ©lectionnÃ©s
```

Style :

```css
font-size: 13px;
font-weight: 700;
color: #1e2b4a;
justify-content: flex-start;
padding-left: 16px;
```

Petit check visible Ã  droite du texte.

### 23.5 Actions d'affectation groupÃ©e

Actions visibles :

- affecter employÃ© 1 ;
- affecter employÃ© 2 ;
- affecter vÃ©hicule ;
- affecter base.

Elles sont secondaires : fond blanc, texte gris/bleutÃ©, icÃ´ne fine.

### 23.6 Action `Vider`

Visible :

```txt
Vider
```

Style :

```css
background: #fff1f1;
color: #ef4444;
```

IcÃ´ne corbeille rouge.

Attention : pour Ã©viter l'ambiguÃ¯tÃ© mÃ©tier, le code peut utiliser :

```txt
Texte visible : Vider
aria-label / title : Vider la sÃ©lection sans suppression
infobulle ou helper discret : sans suppression
```

Ne pas transformer visuellement `Vider` en grosse action destructive dominante.

---

## 24. Ã‰tats visuels visibles et non visibles

### 24.1 Ã‰tats visibles

Visibles dans la maquette :

- Ã©tat actif salariÃ© ;
- Ã©tat en congÃ© ;
- shifts typÃ©s ;
- repos ;
- congÃ© ;
- garde ;
- cellule sÃ©lectionnÃ©e ;
- sÃ©lection multiple ;
- absence vide ;
- conflit vide ;
- action principale ;
- actions secondaires ;
- action danger discrÃ¨te.

### 24.2 Ã‰tats non visibles

Non visibles dans les images :

- chargement initial ;
- erreur API ;
- aucun salariÃ© ;
- aucun shift ;
- aucun rÃ©sultat filtre ;
- permission refusÃ©e ;
- formulaire ajout shift ;
- formulaire modification ;
- drawer d'affectation ouvert ;
- modal annulation ;
- vue jour ;
- vue mois dÃ©taillÃ©e ;
- mode sombre ;
- responsive mobile.

Pour ces Ã©lÃ©ments :

```txt
INFORMATION NON FOURNIE â€” Ã€ CONFIRMER
```

A25 peut les harmoniser si le repo les contient, mais ne doit pas inventer une maquette absente.

---

## 25. Mode sombre

### 25.1 Visible dans les images

Le mode sombre n'est pas visible dans les deux images Planning fournies.

Donc :

```txt
INFORMATION NON FOURNIE â€” Ã€ CONFIRMER
```

### 25.2 DÃ©duction raisonnable

Le mode sombre doit rester cohÃ©rent avec le socle A24.

Il ne doit pas Ãªtre une inversion brutale.

DÃ©clinaison raisonnable :

```css
[data-theme="dark"] {
  --planning-bg: #0f172a;
  --planning-surface: #111827;
  --planning-surface-soft: #162033;
  --planning-border: #24324a;
  --planning-text: #e5edf8;
  --planning-muted: #94a3b8;
  --planning-primary: #3b82f6;
  --planning-primary-soft: rgba(59, 130, 246, 0.16);
}
```

Badges en dark mode : utiliser des fonds translucides plutÃ´t que des aplats clairs trop criards.

---

## 26. Tokens CSS recommandÃ©s

Codex doit Ã©viter de disperser les valeurs dans tout le fichier.

Tokens recommandÃ©s :

```css
:root {
  --planning-bg: #f8fafc;
  --planning-surface: #ffffff;
  --planning-surface-soft: #f9fbfe;
  --planning-border: #e8eef7;
  --planning-border-soft: #f0f3f8;
  --planning-text: #071f44;
  --planning-text-soft: #1e2b4a;
  --planning-muted: #64748b;
  --planning-muted-soft: #94a3b8;
  --planning-primary: #1674fe;
  --planning-primary-strong: #0a66fd;
  --planning-primary-soft: #eaf3ff;
  --planning-success-soft: #eaf8f0;
  --planning-success-text: #16804a;
  --planning-warning-soft: #fff0de;
  --planning-warning-text: #d97706;
  --planning-purple-soft: #f1e8fb;
  --planning-purple-text: #7c3aed;
  --planning-neutral-soft: #f3f5f8;
  --planning-danger-soft: #fff1f1;
  --planning-danger-text: #ef4444;
  --planning-radius-sm: 5px;
  --planning-radius-md: 8px;
  --planning-radius-lg: 12px;
}
```

---

## 27. Structure React recommandÃ©e

Pour atteindre la maquette, Ã©viter un composant gÃ©ant difficile Ã  maintenir.

Structure cible :

```tsx
<PlanningPage>
  <PlanningPageHeader />
  <PlanningToolbar />
  <PlanningTabs />
  <PlanningWorkspace>
    <PlanningMainColumn>
      <PlanningMatrix />
      <PlanningBulkActionBar />
    </PlanningMainColumn>
    <PlanningCellDetailPanel />
  </PlanningWorkspace>
</PlanningPage>
```

Sous-composants recommandÃ©s :

```txt
PlanningPageHeader
PlanningToolbar
PlanningFilterCard
PlanningViewToggle
PlanningExportActions
PlanningTabs
PlanningMatrix
PlanningMatrixHeader
PlanningEmployeeRow
PlanningEmployeeCell
PlanningStatusBadge
PlanningShiftPill
PlanningCellDetailPanel
PlanningDetailAssignments
PlanningDetailEmptyState
PlanningDetailActions
PlanningBulkActionBar
PlanningBulkActionButton
```

Si le code rÃ©el impose une structure diffÃ©rente, adapter sans perdre le rendu.

---

## 28. Classes CSS recommandÃ©es

```txt
planning-page
planning-page__header
planning-page__title
planning-page__subtitle
planning-page__primary-action

planning-toolbar
planning-toolbar__filters
planning-filter-card
planning-filter-card__label
planning-filter-card__value
planning-view-toggle
planning-view-toggle__option
planning-view-toggle__option--active
planning-export-actions
planning-export-button

planning-tabs
planning-tab
planning-tab--active

planning-workspace
planning-main-column
planning-matrix-card
planning-matrix
planning-matrix__head
planning-matrix__row
planning-matrix__cell
planning-matrix__cell--selected
planning-matrix__week-label
planning-matrix__week-dates

planning-person
planning-person__avatar
planning-person__name
planning-person__meta
planning-status-badge
planning-status-badge--active
planning-status-badge--leave

planning-shift-pill
planning-shift-pill--ambulance
planning-shift-pill--vsl
planning-shift-pill--taxi
planning-shift-pill--garde
planning-shift-pill--repos
planning-shift-pill--conge
planning-shift-subtext

planning-detail-panel
planning-detail-panel__header
planning-detail-panel__close
planning-detail-panel__person
planning-detail-panel__section
planning-detail-panel__section-title
planning-detail-panel__assignments
planning-detail-panel__assignment-row
planning-detail-panel__empty
planning-detail-panel__success
planning-detail-panel__actions
planning-detail-action
planning-detail-action--secondary
planning-detail-action--primary

planning-bulk-bar
planning-bulk-bar__summary
planning-bulk-bar__action
planning-bulk-bar__action--danger
```

---

## 29. Ce que Codex doit absolument Ã©viter

### 29.1 Ã‰viter une fausse refonte

Ne pas se contenter de :

- changer quelques couleurs ;
- arrondir deux boutons ;
- ajouter des borders ;
- modifier seulement les panneaux ;
- dÃ©placer une action sans refaire la structure.

A25 vise une page entiÃ¨re proche de la maquette.

### 29.2 Ã‰viter une mauvaise structure

Ne pas produire :

- une page verticale trop longue ;
- toutes les sections affichÃ©es les unes sous les autres ;
- une grille jour/semaine si la maquette demande une matrice personnel Ã— semaines ;
- des cards de shifts trop grosses dans la grille ;
- un panneau droit transformÃ© en modal plein Ã©cran ;
- une barre d'actions groupÃ©es intÃ©grÃ©e dans le panneau droit.

### 29.3 Ã‰viter les inventions mÃ©tier

Ne pas crÃ©er :

- nouveau moteur planning ;
- nouveau modÃ¨le d'affectation ;
- nouvelle API lourde ;
- nouveau RBAC ;
- nouveau Prisma ;
- nouvelles rÃ¨gles autoschedule ;
- nouvelles rÃ¨gles matching ;
- suppression physique gÃ©nÃ©ralisÃ©e.

---

## 30. CritÃ¨res de conformitÃ© visuelle 99 %

Une correction A25 est conforme visuellement si :

1. Le header ressemble Ã  l'image : titre, sous-titre, bouton principal bleu.
2. Les filtres sont alignÃ©s horizontalement en petites cartes blanches.
3. Le toggle `Personnel / Vue dÃ©pÃ´t` est compact et intÃ©grÃ©.
4. Les exports sont des boutons secondaires blancs, Ãƒ  droite.
5. Les onglets sont fins, avec underline bleu pour l'actif.
6. La grille principale est une matrice salariÃ©s Ã— semaines.
7. Les colonnes visibles correspondent Ã  la maquette.
8. Les lignes salariÃ©s utilisent avatar + nom + rÃ´le + base + statut.
9. Les cellules semaines affichent des pills compactes, pas des grandes cards.
10. Les couleurs de pills restent douces.
11. La cellule sÃ©lectionnÃ©e a une bordure bleue sobre.
12. Le panneau droit est fixe, blanc, arrondi, Ã©troit.
13. Le panneau droit affiche l'identitÃ©, la semaine, les affectations, absences, conflits et actions.
14. Les actions du panneau respectent la hiÃ©rarchie secondaire / primaire.
15. La barre basse d'actions groupÃ©es est horizontale, sous la grille.
16. L'action `Vider` est rouge douce, non dominante.
17. Les espacements sont proches de la maquette.
18. Les bordures sont fines.
19. Les ombres sont absentes ou trÃ¨s discrÃ¨tes.
20. La page n'introduit pas de nouvelle direction artistique.

---

## 31. CritÃ¨res fonctionnels Ã  ne pas casser

MÃªme si la prioritÃ© est visuelle, les sessions A25 ne doivent pas casser :

- auth ;
- session utilisateur ;
- multi-tenant ;
- permissions planning ;
- ajout shift ;
- modification shift ;
- annulation mÃ©tier ;
- affectation employÃ© 1 ;
- affectation employÃ© 2 ;
- affectation vÃ©hicule ;
- affectation base ;
- sÃ©lection multiple si prÃ©sente ;
- exports PDF / Excel / CSV / impression si prÃ©sents ;
- autoschedule existant ;
- matching existant ;
- historique existant ;
- audit existant.

Toute action non disponible dans le repo mais visible dans la maquette doit Ãªtre classÃ©e :

```txt
INFORMATION NON FOURNIE â€” Ã€ CONFIRMER
```

---

## 32. Plan Codex recommandÃ© pour la suite A25

Le bloc A25 ne doit pas repartir en micro-corrections.

Les sessions restantes doivent couvrir l'intÃ©gralitÃ© de ce document, pas uniquement quelques zones isolÃ©es. Si un point de ce document n'est pas traitÃ© dans une session de correction, il doit Ãªtre contrÃ´lÃ© en validation et classÃ© explicitement.

### 32.1 RÃ¨gle d'autoritÃ© du dÃ©coupage

```txt
REFERENCE_UI_UX_A25_PLANNING.md dÃ©finit la cible Ã  couvrir.
Le dÃ©coupage des sessions doit permettre de rÃ©aliser cette cible.
Si le dÃ©coupage ne couvre pas la rÃ©fÃ©rence A25, le dÃ©coupage doit Ãªtre ajustÃ©.
```

### 32.2 RÃ¨gle captures / vÃ©rification visuelle

Les captures ne sont pas obligatoires Ã  chaque session A25.

RÃ¨gle retenue :

```txt
- A25-PLAN-UI-06 : capture avant recommandÃ©e, rÃ©alisÃ©e manuellement par Nathan si utile.
- A25-PLAN-UI-07 Ã  A25-PLAN-UI-10 : pas de capture Codex obligatoire ; documentation structurÃ©e + checklist visuelle manuelle.
- A25-PLAN-UI-11 ou CLOTURE_A25 : capture aprÃ¨s recommandÃ©e, rÃ©alisÃ©e manuellement par Nathan si utile.
```

Codex ne doit pas produire de captures automatiquement. Les vÃ©rifications visuelles sont rÃ©alisÃ©es manuellement par Nathan, sauf demande explicite contraire.

### 32.3 RÃ¨gle `INFORMATION NON FOURNIE` cÃ´tÃ© UI

La formule suivante est rÃ©servÃ©e Ã  la documentation, aux rapports, aux prompts et aux contrÃ´les qualitÃ© :

```txt
INFORMATION NON FOURNIE â€” Ã€ CONFIRMER
```

Elle ne doit jamais Ãªtre affichÃ©e telle quelle dans l'interface utilisateur finale.

CÃ´tÃ© interface, si un contenu n'est pas disponible, utiliser un libellÃ© mÃ©tier sobre, par exemple :

```txt
Aucun Ã©lÃ©ment Ã  afficher
Contenu non disponible
DonnÃ©e non renseignÃ©e
Configuration Ã  complÃ©ter
```

### A25-PLAN-UI-06 â€” AUDIT+CADRAGE â€” CohÃ©rence et faisabilitÃ© maquette Planning

Type : `AUDIT+CADRAGE`

Objectif :

- vÃ©rifier la cohÃ©rence entre `PLAN_DE_DEVELOPPEMENT_V2.md`, `DOCUMENT_MAITRE_V2.md`, ce document, les images Planning officielles, les prompts A25 et le code rÃ©el ;
- confirmer que les images `Planning_V1.2.png` et `Planning_V1.2_INFO_DETAIL.png` sont bien les rÃ©fÃ©rences visuelles prioritaires ;
- produire une matrice de faisabilitÃ© code pour la reproduction de la maquette ;
- identifier les Ã©carts entre le code actuel et la cible maquette ;
- prÃ©parer les corrections A25-PLAN-UI-07 Ã  A25-PLAN-UI-10.

Livrable :

```txt
Rapport d'audit/cadrage A25-PLAN-UI-06 + matrice de faisabilitÃ© code + checklist visuelle manuelle.
```

DoD :

```txt
La cible Planning 99 % maquette est cohÃ©rente, les risques d'intÃ©gration sont identifiÃ©s, et Codex dispose d'un plan clair pour les corrections suivantes.
```

### A25-PLAN-UI-07 â€” STRUCTURE GLOBALE, HEADER, FILTRES, EXPORTS ET ONGLETS

Type : `CORRECTION+COMPLÃ‰TION`

Objectif :

- reconstruire le layout global visible dans la maquette ;
- traiter le header Planning ;
- traiter la toolbar filtres / vue / exports ;
- traiter l'encadrÃ© orange comme une vraie navigation d'onglets ;
- prÃ©parer le workspace deux colonnes : encadrÃ© violet + encadrÃ© vert ;
- Ã©viter le double header Planning ;
- faire en sorte que l'onglet actif pilote ensemble le contenu principal et le panneau contextuel.

DoD :

```txt
La page possÃ¨de la structure globale visible dans Planning_V1.2 et les onglets pilotent correctement les zones violet/vert sans empilement vertical incohÃ©rent.
```

### A25-PLAN-UI-08 â€” MATRICE SALARIÃ‰S Ã— SEMAINES, CELLULES ET BADGES

Type : `CORRECTION+COMPLÃ‰TION`

Objectif :

- reconstruire la grille principale ;
- traiter les colonnes salariÃ© / rÃ´le / base / statut / semaines ;
- traiter les lignes salariÃ©s ;
- traiter les avatars ;
- traiter les badges statuts ;
- traiter les pills shifts / repos / congÃ© / garde ;
- traiter la sÃ©lection cellule ;
- respecter les donnÃ©es rÃ©ellement disponibles dans le code.

DoD :

```txt
La zone violette de la maquette ressemble Ã  une matrice salariÃ©s Ã— semaines fidÃ¨le, exploitable et non fictive.
```

### A25-PLAN-UI-09 â€” PANNEAU DROIT CONTEXTUEL ET ACTIONS GROUPÃ‰ES

Type : `CORRECTION+COMPLÃ‰TION`

Objectif :

- reproduire le panneau droit `DÃ©tail de la cellule` ;
- traiter les sections salariÃ©, pÃ©riode, affectations, absences, conflits/alertes et actions ;
- reproduire la barre basse de sÃ©lection multiple ;
- traiter les actions d'affectation employÃ© 1 / employÃ© 2 / vÃ©hicule / base ;
- clarifier l'action `Vider` sans crÃ©er une nouvelle logique mÃ©tier ;
- garantir que le panneau vert reste cohÃ©rent avec l'onglet actif.

DoD :

```txt
Le panneau droit et la barre basse ressemblent Ã  la maquette, avec actions hiÃ©rarchisÃ©es et sans nouvelle logique mÃ©tier lourde.
```

### A25-PLAN-UI-10 â€” FINITIONS VISUELLES, Ã‰TATS, MODE SOMBRE ET RESPONSIVE MINIMAL

Type : `CORRECTION+COMPLÃ‰TION`

Objectif :

- harmoniser les tokens ;
- corriger les espacements, bordures, arrondis, couleurs et contrastes ;
- traiter les Ã©tats vides, chargement et erreur ;
- vÃ©rifier le mode clair ;
- traiter le mode sombre dans la limite du socle existant ;
- traiter le responsive minimal sans refonte mobile complÃ¨te ;
- corriger les incohÃ©rences visuelles restantes aprÃ¨s A25-07 Ã  A25-09.

DoD :

```txt
La page Planning est visuellement homogÃ¨ne, lisible, cohÃ©rente en clair/sombre, et suffisamment finie pour entrer en validation globale.
```

### A25-PLAN-UI-11 â€” VALIDATION VISUELLE GLOBALE PLANNING

Type : `VALIDATION`

Objectif :

- contrÃ´ler la fidÃ©litÃ© Ã  `Planning_V1.2.png` ;
- contrÃ´ler la fidÃ©litÃ© Ã  `Planning_V1.2_INFO_DETAIL.png` ;
- vÃ©rifier que tout le contenu de `REFERENCE_UI_UX_A25_PLANNING.md` a Ã©tÃ© couvert ou classÃ© ;
- vÃ©rifier le retour visuel manuel de Nathan ;
- vÃ©rifier lint/build ;
- vÃ©rifier l'absence de dÃ©rive mÃ©tier ;
- classer les rÃ©siduels bloquants / non bloquants / Ã  confirmer.

La capture aprÃ¨s peut Ãªtre fournie manuellement par Nathan si utile. Elle n'est pas produite automatiquement par Codex.

DoD :

```txt
La page Planning est validÃ©e visuellement comme suffisamment fidÃ¨le Ã  la maquette, ou les Ã©carts restants sont classÃ©s et empÃªchent explicitement la clÃ´ture.
```

### CLOTURE_A25 â€” CLÃ”TURE FINALE DU BLOC A25

Type : `VALIDATION`

Objectif :

- vÃ©rifier les sessions A25-PLAN-UI-06 Ã  A25-PLAN-UI-11 ;
- vÃ©rifier patchs ;
- vÃ©rifier docs ;
- vÃ©rifier preuves ;
- vÃ©rifier retour visuel manuel ;
- vÃ©rifier absence de contradiction documentaire restante ;
- rendre le verdict final.

Verdict obligatoire :

```txt
BLOC A25 CLÃ”TURABLE DÃ‰FINITIVEMENT : OUI
```

ou

```txt
BLOC A25 CLÃ”TURABLE DÃ‰FINITIVEMENT : NON
```
