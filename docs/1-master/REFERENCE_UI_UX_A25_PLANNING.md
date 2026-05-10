# Ambulance Manager — RÉFÉRENCE UI/UX A25 PLANNING

Version : V2.0.0 — RÉÉCRITURE COMPLÈTE MAQUETTE 99 %  
Date : 10/05/2026  
Bloc concerné : `A25 — Planning UI/UX & ergonomie métier`  
Document cible à déposer dans le repo : `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`

---

## 0. Statut du document

Ce document remplace intégralement la version précédente de `REFERENCE_UI_UX_A25_PLANNING.md`.

Il a été réécrit à partir :

- des images de référence Planning fournies ;
- de la version existante du document `REFERENCE_UI_UX_A25_PLANNING.md` ;
- du cadrage A25 validé oralement : le bloc A25 doit viser une refonte globale de la page Planning, proche à environ 99 % de la maquette visible.

Ce document ne doit pas être lu comme une inspiration générale. Il doit être utilisé comme une spécification visuelle et ergonomique de reproduction.

Objectif principal : permettre à Codex de reconstruire ensuite la page Planning de manière fidèle, structurée et vérifiable.

---

## 1. Règle d’autorité A25

### 1.1 Références visuelles officielles

Les références officielles du Planning A25 sont les images situées dans :

```txt
docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning
```

Images principales analysées :

```txt
Planning_V1.2.png
Planning_V1.2_INFO_DETAIL.png
```

`Planning_V1.2.png` est la référence visuelle propre.

`Planning_V1.2_INFO_DETAIL.png` est la même référence avec encadrements d’analyse :

- rouge : zone globale de contenu Planning ;
- bleu : filtres, bascule de vue et exports ;
- orange : onglets internes de navigation ;
- violet : contenu principal piloté par l’onglet actif ;
- vert : panneau latéral droit contextuel, lui aussi piloté par l’onglet actif.

Point de cadrage majeur : l’encadré orange n’est pas un simple élément décoratif ou une navigation secondaire passive. Il contrôle le contenu affiché dans l’encadré violet et les informations affichées dans l’encadré vert. Dans l’image fournie, l’onglet actif est `Planning manuel`, donc l’encadré violet montre la matrice planning et l’encadré vert montre le détail de cellule correspondant. Les contenus des autres onglets ne sont pas visibles dans l’image.

### 1.2 Règle d’autorité visuelle

```txt
Images Planning_V1.2 > anciennes captures > descriptions textuelles anciennes
```

Le document présent doit guider l’intégration, mais en cas de contradiction visuelle, l’image de référence prévaut.

### 1.3 Règle d’autorité fonctionnelle

```txt
CODE réel du repo > documentation produit > hypothèses
```

La maquette fixe le rendu cible. Le code réel fixe ce qui existe fonctionnellement.

Conséquence :

- il faut reproduire la maquette visuellement ;
- il ne faut pas inventer une fonctionnalité métier non présente ;
- les données visibles dans la maquette peuvent être remplacées par les données réelles du repo ;
- aucune API, Prisma, RBAC, autoschedule ou matching ne doit être refondu sans nécessité explicite.

### 1.4 Phrase obligatoire en cas d’incertitude

Si une information n’est pas visible dans les images ou non confirmée dans le code, écrire exactement :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

---

## 2. Changement de cadrage important pour A25

La page Planning ne doit plus être traitée comme une addition de zones corrigées séparément.

La cible visible est une page complète, unifiée, structurée autour de :

- un header Planning sobre ;
- une barre de filtres horizontale ;
- des actions d’export secondaires ;
- des onglets internes fins ;
- une grande zone de contenu centrale pilotée par l’onglet actif ;
- pour l’onglet `Planning manuel`, une matrice Planning centrale ;
- un panneau droit fixe contextuel piloté par l’onglet actif ;
- pour l’onglet `Planning manuel`, un détail de cellule ;
- une barre basse d’actions groupées lorsqu’une sélection multiple existe dans l’onglet actif ;
- une hiérarchie métier claire : lecture globale → sélection → détail → action.

Le Planning A25 doit donc être évalué sur la fidélité globale à la maquette, pas uniquement sur la qualité technique d’un patch isolé.

---

## 3. Ce que l’ancien document contenait déjà et ce qui est renforcé ici

### 3.1 Déjà présent dans la version précédente

L’ancien document contenait déjà :

- l’objectif général A25 ;
- le périmètre UI/UX Planning ;
- les exclusions fonctionnelles ;
- la référence à `MAQUETTE_DA` ;
- le principe `Visible / Déduction raisonnable / À vérifier dans le repo` ;
- des sections sur header, filtres, toolbar, onglets, grille, panneaux, badges et actions ;
- une recommandation de découpage A25.

### 3.2 Limite de la version précédente

La version précédente restait trop générale. Elle disait quoi regarder, mais pas assez précisément comment reproduire la page.

Elle ne donnait pas suffisamment :

- les coordonnées visuelles approximatives ;
- les proportions réelles ;
- les largeurs / hauteurs ;
- les espacements ;
- le rythme vertical ;
- les détails précis des cellules ;
- la logique de table salarié × semaines ;
- la structure complète du panneau droit ;
- la forme exacte de la barre d’actions groupées ;
- les contraintes de reproduction proche à 99 %.

### 3.3 Renforcement apporté par cette V2

Cette version réécrit le document comme une spécification quasi exécutable :

- analyse pixel-level approximative ;
- description détaillée des zones ;
- dimensions et espacements approximatifs ;
- couleurs visibles ou déductibles ;
- composants React recommandés ;
- classes CSS recommandées ;
- critères de conformité visuelle ;
- découpage Codex réaliste pour reconstruire la page.

---

## 4. Lecture générale de la maquette

### 4.1 Format de référence

Les images fournies ont une dimension d’environ :

```txt
Largeur : 1586 px
Hauteur : 992 px
```

La maquette est une vue desktop large. Aucune maquette mobile équivalente n’est visible.

Responsive mobile :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

### 4.2 Nature exacte de la page Planning visible

La maquette ne représente pas une grille calendrier classique jour par jour.

Elle représente une matrice synthétique :

```txt
Lignes = salariés
Colonnes fixes = salarié / rôle / base / statut
Colonnes temporelles = semaine 1 / semaine 2 / semaine 3 / semaine 4
Panneau droit = détail de la cellule sélectionnée
Barre basse = actions groupées sur une sélection multiple
```

C’est le point le plus important pour la suite du bloc A25.

Si le code reconstruit une page composée de grandes cards de shifts empilées ou d’un calendrier semaine classique, le rendu ne correspondra pas à la maquette.

### 4.3 Organisation macro

La page complète est organisée ainsi :

```txt
┌─────────────────────────┬──────────────────────────────────────────────┐
│ Sidebar gauche          │ Topbar globale                               │
│                         ├──────────────────────────────────────────────┤
│ Navigation              │ Zone Planning                                │
│                         │                                              │
│                         │ Header Planning                              │
│                         │ Filtres / vue / exports                      │
│                         │ Onglets internes                             │
│                         │ Grille salariés × semaines     Panneau droit │
│                         │ Barre basse actions groupées                 │
└─────────────────────────┴──────────────────────────────────────────────┘
```

---

## 5. Coordonnées et proportions générales

Les coordonnées ci-dessous sont approximatives, basées sur l’image 1586 × 992.

Elles servent à guider l’intégration, pas à imposer une reproduction CSS au pixel strict.

### 5.1 Shell global

| Zone | X approx. | Y approx. | Largeur approx. | Hauteur approx. | Commentaire |
|---|---:|---:|---:|---:|---|
| Sidebar | 0 | 0 | 262 px | 992 px | Navigation gauche existante |
| Topbar | 262 px | 0 | 1324 px | 61–64 px | Barre supérieure globale |
| Contenu Planning | 262 px | 61 px | 1317 px | 927 px | Encadré rouge dans l’image annotée |

### 5.2 Zones internes Planning

| Zone | X approx. | Y approx. | Largeur approx. | Hauteur approx. | Couleur d’encadrement |
|---|---:|---:|---:|---:|---|
| Page Planning globale | 262 | 61 | 1317 | 927 | rouge |
| Filtres / vue / exports | 289 | 170 | 1255 | 79 | bleu |
| Onglets internes | 279 | 271 | 695 | 50 | orange |
| Grille + barre bulk | 276 | 322 | 971 | 658 | violet |
| Panneau détail droit | 1248 | 267 | 320 | 713 | vert |

### 5.3 Marges principales

| Élément | Valeur cible approximative |
|---|---:|
| Padding gauche de contenu après sidebar | 32 px |
| Padding droit global | 24–32 px |
| Espace topbar → titre | 24 px |
| Titre → sous-titre | 8 px |
| Sous-titre → toolbar | 24–28 px |
| Toolbar → onglets | 20–24 px |
| Onglets → grille | 8–12 px |
| Grille → panneau droit | 16 px |

---

## 6. Direction artistique globale

### 6.1 Ambiance générale visible

La maquette est :

- blanche ;
- légère ;
- sobre ;
- très propre ;
- professionnelle ;
- dense mais respirante ;
- proche d’un SaaS métier santé / transport ;
- non décorative ;
- non “dashboard coloré”.

La page doit éviter :

- les ombres lourdes ;
- les fonds gris marqués ;
- les bordures sombres ;
- les gros boutons partout ;
- les cartes épaisses ;
- les contrastes agressifs ;
- les couleurs saturées hors bleu primaire.

### 6.2 Palette visible ou déductible

Les couleurs ci-dessous sont approximatives. Elles doivent être harmonisées avec les tokens existants A24 si présents.

| Usage | Couleur approximative | Commentaire |
|---|---|---|
| Fond général | `#FEFEFE` / `#F8FAFC` | Blanc très légèrement froid |
| Surface carte | `#FFFFFF` | Table, toolbar, panneau droit |
| Texte principal | `#071F44` | Bleu nuit très foncé |
| Texte secondaire | `#64748B` / `#6B7890` | Gris bleuté |
| Texte tertiaire | `#94A3B8` | Métadonnées, dates |
| Bordure fine | `#E8EEF7` / `#EDF1F7` | Très discrète |
| Bleu primaire | `#0A66FD` / `#1674FE` | Bouton principal, actif, sélection |
| Bleu doux | `#EAF3FF` / `#EDF6FF` | Badges Ambulance, nav active |
| Vert doux | `#EAF8F0` / `#EAF7F6` | Actif, VSL, absence OK |
| Orange doux | `#FFF0DE` / `#FCE6CC` | Taxi, Congé |
| Violet doux | `#F1E8FB` / `#EDE1F7` | Garde, week-end |
| Gris doux | `#F3F5F8` | Repos |
| Rouge doux | `#FEECEC` / `#FFF1F1` | Vider / danger discret |
| Rouge texte | `#DC2626` / `#EF4444` | Icône et libellé danger |

### 6.3 Bordures

La maquette utilise presque uniquement des bordures fines :

```css
border: 1px solid #e8eef7;
```

Les bordures ne doivent pas créer un effet tableau Excel dur.

### 6.4 Arrondis

Arrondis observés :

| Élément | Radius approximatif |
|---|---:|
| Bouton principal | 6–8 px |
| Filter card | 8 px |
| Export button | 8 px |
| Table container | 8–10 px |
| Cellule sélectionnée | 6 px |
| Panneau droit | 10–12 px |
| Pills / badges | 4–6 px |
| Avatar rond | 999 px |

### 6.5 Ombres

La maquette ne montre pas d’ombre forte.

Ombre acceptable :

```css
box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
```

Mais la plupart des surfaces peuvent se contenter de bordures fines.

### 6.6 Typographie apparente

Police exacte :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

Style déductible : police sans-serif moderne, proche Inter / system UI.

Échelle typographique cible :

| Usage | Taille approx. | Poids | Couleur |
|---|---:|---:|---|
| Titre page `Planning` | 30–32 px | 700–800 | Bleu nuit |
| Sous-titre page | 14 px | 400–500 | Gris bleuté |
| Label filtre | 12 px | 500 | Gris bleuté |
| Valeur filtre | 13–14 px | 500–600 | Bleu nuit |
| Onglet | 14 px | 500–600 | Gris / bleu actif |
| Header table | 12–13 px | 700 | Bleu nuit |
| Nom salarié | 13–14 px | 700 | Bleu nuit |
| Cellule secondaire | 12–13 px | 500 | Gris bleuté |
| Badge shift | 12 px | 600 | Couleur type |
| Panneau droit titre | 16 px | 700 | Bleu nuit |
| Section panneau | 14 px | 700 | Bleu nuit |
| Action bouton | 13–14 px | 600 | Variable |

---

## 7. Sidebar gauche visible

La sidebar appartient au shell global mais conditionne la cohérence visuelle.

### 7.1 Visible dans l’image

La sidebar contient :

- logo ambulance ;
- texte `Ambulance Manager` ;
- badge `ALPHA` ;
- navigation :
  - Tableau de bord ;
  - Planning ;
  - Utilisateurs / RH ;
  - Véhicules ;
  - Templates ;
  - Société ;
  - Dépôts ;
  - Onboarding ;
  - Audit ;
- bloc `Thème` ;
- bloc utilisateur `Nathan A. / Admin`.

L’item `Planning` est actif :

- fond bleu très pâle ;
- icône bleue ;
- texte bleu ;
- radius doux ;
- hauteur environ 48 px.

### 7.2 À reproduire côté page Planning

La page Planning ne doit pas recréer la sidebar.

Mais elle doit respecter la même direction :

- blancs propres ;
- bleu actif identique ;
- radius modérés ;
- pictogrammes fins ;
- aucune rupture de style.

---

## 8. Topbar visible

### 8.1 Visible dans l’image

Topbar horizontale, hauteur environ 60–64 px.

À droite :

- sélecteur société `SC Ambulances` ;
- bouton thème soleil ;
- bloc utilisateur `Nathan A. / Admin` ;
- action `Déconnexion`.

### 8.2 Interaction avec la page Planning

Le contenu Planning commence sous cette topbar, avec un espace blanc propre.

Le titre ne doit pas coller à la topbar.

---

## 9. Header Planning

### 9.1 Visible dans l’image

Le header contient :

```txt
Planning
Vue globale des shifts, absences et affectations du personnel
```

À droite ou légèrement centré horizontalement dans la zone haute :

```txt
+ Ajouter un shift
```

### 9.2 Coordonnées approximatives

| Élément | X approx. | Y approx. | Taille approx. |
|---|---:|---:|---:|
| Titre `Planning` | 296 px | 86 px | 32 px |
| Sous-titre | 296 px | 134 px | 14 px |
| Bouton `Ajouter un shift` | 1010 px | 121 px | 145 × 40 px |

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

Le bouton est visuellement très prioritaire.

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

Icône : `+`, fine, alignée verticalement.

### 9.6 À ne pas faire

- Ne pas placer plusieurs boutons principaux dans le header.
- Ne pas transformer le bouton en gros bloc pleine largeur.
- Ne pas mettre les exports au même niveau visuel que l’ajout de shift.

---

## 10. Barre filtres / vue / exports

### 10.1 Zone visible

Cette zone correspond à l’encadré bleu de l’image annotée.

Elle est horizontale et se décompose en trois sous-zones :

```txt
[Filtres métier] [Bascule Personnel / Vue dépôt]          [Exports]
```

Elle ne doit pas devenir une pile verticale en desktop.

### 10.2 Dimensions approximatives

| Sous-zone | X approx. | Y approx. | Largeur approx. | Hauteur approx. |
|---|---:|---:|---:|---:|
| Barre complète | 289 | 170 | 1255 | 79 |
| Filtres | 296 | 176 | 480 | 64 |
| Toggle vue | 790 | 176 | 168 | 48 |
| Exports | 1010 | 178 | 520 | 44 |

### 10.3 Filtres visibles

Filtres :

```txt
Période     Mai 2024
Dépôt       Tous
Rôle        Tous
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
[icône] Valeur [chevron]
```

Le label est en haut, plus petit.
La valeur est en bas, avec icône à gauche et chevron à droite.

### 10.4 Icônes filtres

Icônes visibles ou déductibles :

| Filtre | Icône visible/déductible |
|---|---|
| Période | calendrier |
| Dépôt | bâtiment / dépôt |
| Rôle | utilisateur / personne |
| Utilisateur | utilisateur |

Les icônes sont fines, gris bleuté, taille environ 16 px.

### 10.5 Toggle Personnel / Vue dépôt

Visible :

```txt
[Personnel] [Vue dépôt]
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

Chaque action ressemble à un bouton blanc bordé :

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

Icônes :

| Action | Couleur icône visible |
|---|---|
| Export PDF | rouge |
| Excel | vert |
| CSV | gris/bleu |
| Imprimer | gris/bleu |

### 10.7 À ne pas faire

- Ne pas afficher les exports comme boutons bleus.
- Ne pas placer les exports sous la grille en desktop.
- Ne pas mélanger filtres et exports sans séparation visuelle.
- Ne pas rendre les filtres trop hauts.

---

## 11. Onglets internes Planning

### 11.1 Visible dans l’image

Onglets visibles :

```txt
Planning manuel
Affectations
Autoschedule
Matching
Historique
Exports
```

L’onglet actif est `Planning manuel`.

### 11.2 Dimensions et position

| Élément | X approx. | Y approx. | Largeur approx. | Hauteur approx. |
|---|---:|---:|---:|---:|
| Zone onglets | 279 | 271 | 695 | 50 |
| Ligne underline actif | 295 | 314 | 140 | 2–3 |

### 11.3 Style cible

La zone onglets est légère. Elle ne ressemble pas à des boutons cards.

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

Les autres onglets existent visuellement mais leur contenu n’est pas visible.

Point important ajouté après clarification utilisateur : la zone d’onglets orange pilote les deux zones situées sous elle.

Conséquence directe :

```txt
Onglet actif orange → contenu principal violet + panneau contextuel vert
```

Pour l’image visible :

```txt
Planning manuel actif → matrice salariés × semaines + détail de cellule sélectionnée
```

Les autres onglets doivent donc être compris comme des états de contenu différents, et non comme des sections empilées dans une même longue page verticale.

### 11.5 Synchronisation onglet / contenu / panneau

Règle UI/UX obligatoire :

- changer d’onglet doit modifier le contenu de l’encadré violet ;
- changer d’onglet doit aussi modifier, vider ou adapter le panneau vert ;
- le panneau vert ne doit pas afficher un détail de cellule `Planning manuel` si l’utilisateur consulte un autre onglet ;
- la sélection courante doit être propre à l’onglet ou explicitement réinitialisée au changement d’onglet ;
- il ne faut pas afficher simultanément les contenus de tous les onglets sous forme de sections verticales.

Comportement visible uniquement pour `Planning manuel` :

```txt
Onglet : Planning manuel
Zone violette : matrice planning salariés × semaines
Zone verte : détail de la cellule sélectionnée
Barre basse : actions groupées sur la sélection multiple
```

Comportement des autres onglets :

```txt
Affectations : INFORMATION NON FOURNIE — À CONFIRMER
Autoschedule : INFORMATION NON FOURNIE — À CONFIRMER
Matching : INFORMATION NON FOURNIE — À CONFIRMER
Historique : INFORMATION NON FOURNIE — À CONFIRMER
Exports : INFORMATION NON FOURNIE — À CONFIRMER
```

Ces contenus ne doivent pas être inventés à partir de la maquette. Codex doit seulement prévoir une architecture permettant au contenu violet et au panneau vert de changer selon l’onglet actif, sans créer de nouvelles fonctionnalités métier lourdes.

### 11.6 À vérifier dans le repo


- si les onglets affichent actuellement toutes les sections empilées ;
- si les onglets changent réellement de contenu ;
- si certains onglets doivent rester désactivés ;
- si les onglets doivent être masqués selon permission.

Toute logique non visible :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

---

## 12. Workspace principal

### 12.1 Organisation cible

Le workspace principal correspond aux zones violette et verte. Il est directement dépendant de l’onglet actif dans la zone orange.

Le cœur de la page est un layout à deux colonnes lorsque l’onglet `Planning manuel` est actif :

```txt
┌──────────────────────────────────────────────────┬──────────────────────┐
│ Grille planning salariés × semaines              │ Panneau détail droit │
│ + barre basse actions groupées                    │                      │
└──────────────────────────────────────────────────┴──────────────────────┘
```

La grille occupe la majorité de la largeur.
Le panneau droit est fixe, étroit, lisible.

### 12.2 Dimensions approximatives

| Zone | X approx. | Y approx. | Largeur approx. | Hauteur approx. |
|---|---:|---:|---:|---:|
| Grille + bulk | 276 | 322 | 971 | 658 |
| Panneau droit | 1248 | 267 | 320 | 713 |
| Gap grille / panneau | 12–16 | — | — | — |

Important : le panneau droit commence plus haut que la table, à peu près aligné avec les onglets, tandis que la table commence sous les onglets.

### 12.3 Implication de code

Structure recommandée :

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

La grille principale est une table métier.

Elle n’est pas :

- une liste de cards ;
- une grille horaire jour ;
- une vue calendrier 7 colonnes ;
- une succession verticale de sections.

Elle est :

```txt
une matrice salariés × semaines
```

### 13.2 Colonnes visibles

Colonnes dans l’ordre :

```txt
Sélection
Salarié
Rôle
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
| Sélection | 44–48 px | Checkbox |
| Salarié | 130–140 px | Avatar + nom |
| Rôle | 105–115 px | Libellé métier |
| Base | 95–105 px | Dépôt / siège |
| Statut | 80–90 px | Badge |
| Semaine 1 | 120–130 px | Badge planning |
| Semaine 2 | 120–130 px | Badge planning |
| Semaine 3 | 120–130 px | Badge planning |
| Semaine 4 | 120–130 px | Badge planning |

### 13.4 Table container

Style :

```css
background: #ffffff;
border: 1px solid #edf1f7;
border-radius: 8px;
overflow: hidden;
```

La table n’a pas d’ombre forte.

### 13.5 Header table

Hauteur approximative : 60–64 px.

Style :

```css
background: #ffffff;
border-bottom: 1px solid #edf1f7;
font-size: 12px;
font-weight: 700;
color: #1e2b4a;
```

Les titres des semaines sont centrés.

Chaque semaine possède deux lignes :

```txt
Semaine 1
(29 avr. - 5 mai)
```

La ligne de dates est plus petite et plus claire.

### 13.6 Lignes salariés

Hauteur approximative : 64–66 px.

Les lignes sont séparées par des bordures très fines.

```css
border-bottom: 1px solid #f0f3f8;
```

Les lignes alternées ne sont pas fortement colorées. Le fond reste blanc.

### 13.7 Vertical separators

Des séparateurs très légers existent entre les colonnes.

Ils doivent rester subtils :

```css
border-left: 1px solid #f3f6fa;
```

À éviter : un tableau avec bordures grises épaisses.

---

## 14. Colonne sélection

### 14.1 Visible

La première colonne contient :

- une checkbox dans le header ;
- une checkbox par ligne ;
- les deux premières lignes sont cochées ;
- les autres lignes sont décochées.

### 14.2 Style checkbox cochée

```css
width: 16px;
height: 16px;
border-radius: 4px;
background: #1674fe;
color: white;
```

### 14.3 Style checkbox non cochée

```css
width: 16px;
height: 16px;
border-radius: 4px;
background: white;
border: 1px solid #e5eaf3;
```

### 14.4 Comportement visible

La sélection multiple est reliée à la barre basse `3 shifts sélectionnés`.

Le nombre visible ne correspond pas seulement aux lignes cochées de l’image. Il indique le nombre de shifts sélectionnés, pas nécessairement le nombre de salariés.

À vérifier dans le repo :

- sélection par shift ;
- sélection par cellule ;
- sélection par ligne ;
- cohérence du compteur.

---

## 15. Colonne salarié

### 15.1 Visible

Chaque salarié affiche :

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

### 15.3 Nom salarié

```css
font-size: 13px;
font-weight: 700;
line-height: 1.35;
color: #1e2b4a;
```

Le nom peut passer sur deux lignes. La ligne doit rester stable et ne pas casser la hauteur.

---

## 16. Colonne rôle

### 16.1 Visible

Rôles visibles :

```txt
Ambulancier
Ambulancière
Assistante planification
```

### 16.2 Style

```css
font-size: 12px;
font-weight: 500;
line-height: 1.4;
color: #64748b;
```

Le rôle peut passer sur deux lignes, exemple `Assistante planification`.

---

## 17. Colonne base

### 17.1 Visible

Bases visibles :

```txt
Dépôt Nord
Dépôt Centre
Dépôt Sud
Siège
```

### 17.2 Style

Même style que rôle :

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
En congé
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

### 18.3 Badge En congé

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

Chaque cellule est centrée horizontalement.

Elle peut contenir :

- un badge principal ;
- un sous-libellé sous le badge ;
- une bordure de sélection.

Cellule normale :

```css
padding: 12px 14px;
vertical-align: middle;
text-align: center;
```

---

## 20. Badges / pills planning

### 20.1 Style commun

Les cellules n’affichent pas de grandes cards. Elles affichent des badges compacts.

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
| VSL | `#EAF7F6` | `#0F8B8D` | Vert/bleu très doux |
| Taxi | `#FFF0DE` | `#D97706` | Orange doux |
| Garde A | `#F1E8FB` | `#7C3AED` | Violet doux |
| Garde Nord | `#F1E8FB` | `#7C3AED` | Violet doux |
| Garde Nuit | `#F1E8FB` | `#7C3AED` | Violet doux |
| Repos | `#F3F5F8` | `#475569` | Gris doux |
| Congé | `#FFF0DE` | `#EA580C` | Orange doux |

### 20.3 Sous-libellés visibles

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

### 20.4 Cellule sélectionnée

La cellule sélectionnée est :

```txt
Nathan Archenoul / Semaine 3 / Ambulance / Samedi
```

Elle est entourée par une bordure bleue.

Style cible :

```css
border: 1.5px solid #1674fe;
border-radius: 6px;
background: #ffffff;
box-shadow: 0 0 0 1px rgba(22, 116, 254, 0.04);
```

La sélection doit rester sobre.
Elle ne doit pas remplir toute la cellule en bleu.

---

## 21. Données visibles dans la grille

### 21.1 Lignes visibles

| Salarié | Rôle | Base | Statut | S1 | S2 | S3 | S4 |
|---|---|---|---|---|---|---|---|
| Nathan Archenoul | Ambulancier | Dépôt Nord | Actif | Ambulance | Ambulance | Ambulance + Samedi | Garde Nord |
| Marie Bernard | Ambulancière | Dépôt Centre | Actif | Taxi | VSL | Garde A | VSL |
| Lucas Petit | Ambulancier | Dépôt Sud | Actif | VSL | Ambulance | VSL | Ambulance + Dimanche |
| Sophie Chevalier | Ambulancière | Dépôt Nord | Actif | Taxi | Repos + Dimanche | Taxi + Samedi | Repos |
| Alexandre Dubois | Ambulancier | Dépôt Centre | Actif | Ambulance | VSL | Ambulance + Samedi | Ambulance |
| Laura Moreau | Assistante planification | Siège | Actif | Repos | Repos | Repos | Repos |
| Julien Faure | Ambulancier | Dépôt Sud | En congé | Congé | Congé + JF 08/05 | Congé | Congé |
| Camille Henry | Ambulancière | Dépôt Nord | Actif | VSL | Garde Nuit | VSL + Samedi | Taxi + Dimanche |

Ces données sont visibles dans la maquette, mais ne doivent pas être hardcodées si le repo dispose de données réelles.

---

## 22. Panneau droit — Détail de la cellule

### 22.1 Position et dimensions

Le panneau droit correspond à l’encadré vert.

| Élément | Valeur approx. |
|---|---:|
| X | 1248 px |
| Y | 267 px |
| Largeur | 320 px |
| Hauteur | 713 px |

Style général :

```css
background: #ffffff;
border: 1px solid #e8eef7;
border-radius: 10px / 12px;
padding: 18px 20px;
box-shadow: 0 12px 32px rgba(15, 23, 42, 0.04);
```

### 22.2 Rôle du panneau

Le panneau affiche le détail de la cellule sélectionnée dans la grille uniquement lorsque l’onglet actif est `Planning manuel`.

Clarification importante : ce panneau est contextuel à l’onglet actif. Il ne doit pas être considéré comme un panneau fixe affichant toujours un détail de cellule quelle que soit la navigation. Si l’utilisateur change d’onglet, le panneau doit changer de contenu, se vider ou afficher un état adapté.

Pour `Planning manuel`, il doit permettre de garder la grille compacte tout en montrant :

- salarié ;
- rôle ;
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
Détail de la cellule                       X
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

### 22.4 Bloc identité salarié

Visible :

```txt
[NA] Nathan Archenoul        [• Actif]
     Ambulancier
```

Structure :

```txt
Avatar initiales + nom/rôle + badge statut à droite
```

Le bloc est séparé du reste par une bordure basse fine.

Avatar : même style que dans la grille, taille environ 32 px.

Nom :

```css
font-size: 13px;
font-weight: 700;
color: #1e2b4a;
```

Rôle :

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

Puis une card interne listant plusieurs journées.

L’image affiche :

```txt
Lun. 13 mai    Ambulance      07h - 19h
Mar. 14 mai    Ambulance      07h - 19h
Mer. 15 mai    Ambulance      15h - 23h
Jeu. 16 mai    Ambulance      07h - 19h
Ven. 17 mai    Ambulance      07h - 19h
Sam. 18 mai    Ambulance      07h - 19h
               Samedi (travail week-end)
```

Remarque : le titre indique `Affectations (5)` alors que six lignes journalières semblent visibles. Ne pas corriger arbitrairement en code sans comprendre la donnée réelle.

À vérifier :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
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
Horaire : gris bleuté, aligné à droite.

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

Le `0` est un petit badge vert pâle.

Style section :

```css
margin-top: 16px;
```

`Aucune absence` : texte petit, gris.

### 22.10 Bloc conflits / alertes

Visible :

```txt
Conflits / alertes 0
Aucun conflit détecté.
```

Le message est dans un bloc vert très pâle.

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
[ Voir détail      > ]
[ Modifier         > ]
[ + Ajouter shift  ]
```

Les deux premières actions sont secondaires.
La dernière est principale.

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

## 23. Barre basse de sélection multiple

### 23.1 Position

La barre basse est située sous la table, dans la colonne principale, pas dans le panneau droit.

Dimensions approximatives :

| Élément | X approx. | Y approx. | Largeur approx. | Hauteur approx. |
|---|---:|---:|---:|---:|
| Barre bulk | 276 | 923 | 971 | 57 |

### 23.2 Contenu visible

```txt
3 shifts sélectionnés
Affecter employé 1
Affecter employé 2
Affecter véhicule
Affecter base
Vider
```

### 23.3 Style général

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

Le premier segment n’a pas de border-left.

### 23.4 Résumé sélection

```txt
3 shifts sélectionnés
```

Style :

```css
font-size: 13px;
font-weight: 700;
color: #1e2b4a;
justify-content: flex-start;
padding-left: 16px;
```

Petit check visible à droite du texte.

### 23.5 Actions d’affectation groupée

Actions visibles :

- affecter employé 1 ;
- affecter employé 2 ;
- affecter véhicule ;
- affecter base.

Elles sont secondaires : fond blanc, texte gris/bleuté, icône fine.

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

Icône corbeille rouge.

Attention : pour éviter l’ambiguïté métier, le code peut utiliser :

```txt
Texte visible : Vider
aria-label / title : Vider la sélection sans suppression
infobulle ou helper discret : sans suppression
```

Ne pas transformer visuellement `Vider` en grosse action destructive dominante.

---

## 24. États visuels visibles et non visibles

### 24.1 États visibles

Visibles dans la maquette :

- état actif salarié ;
- état en congé ;
- shifts typés ;
- repos ;
- congé ;
- garde ;
- cellule sélectionnée ;
- sélection multiple ;
- absence vide ;
- conflit vide ;
- action principale ;
- actions secondaires ;
- action danger discrète.

### 24.2 États non visibles

Non visibles dans les images :

- chargement initial ;
- erreur API ;
- aucun salarié ;
- aucun shift ;
- aucun résultat filtre ;
- permission refusée ;
- formulaire ajout shift ;
- formulaire modification ;
- drawer d’affectation ouvert ;
- modal annulation ;
- vue jour ;
- vue mois détaillée ;
- mode sombre ;
- responsive mobile.

Pour ces éléments :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

A25 peut les harmoniser si le repo les contient, mais ne doit pas inventer une maquette absente.

---

## 25. Mode sombre

### 25.1 Visible dans les images

Le mode sombre n’est pas visible dans les deux images Planning fournies.

Donc :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

### 25.2 Déduction raisonnable

Le mode sombre doit rester cohérent avec le socle A24.

Il ne doit pas être une inversion brutale.

Déclinaison raisonnable :

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

Badges en dark mode : utiliser des fonds translucides plutôt que des aplats clairs trop criards.

---

## 26. Tokens CSS recommandés

Codex doit éviter de disperser les valeurs dans tout le fichier.

Tokens recommandés :

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

## 27. Structure React recommandée

Pour atteindre la maquette, éviter un composant géant difficile à maintenir.

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

Sous-composants recommandés :

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

Si le code réel impose une structure différente, adapter sans perdre le rendu.

---

## 28. Classes CSS recommandées

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

## 29. Ce que Codex doit absolument éviter

### 29.1 Éviter une fausse refonte

Ne pas se contenter de :

- changer quelques couleurs ;
- arrondir deux boutons ;
- ajouter des borders ;
- modifier seulement les panneaux ;
- déplacer une action sans refaire la structure.

A25 vise une page entière proche de la maquette.

### 29.2 Éviter une mauvaise structure

Ne pas produire :

- une page verticale trop longue ;
- toutes les sections affichées les unes sous les autres ;
- une grille jour/semaine si la maquette demande une matrice personnel × semaines ;
- des cards de shifts trop grosses dans la grille ;
- un panneau droit transformé en modal plein écran ;
- une barre d’actions groupées intégrée dans le panneau droit.

### 29.3 Éviter les inventions métier

Ne pas créer :

- nouveau moteur planning ;
- nouveau modèle d’affectation ;
- nouvelle API lourde ;
- nouveau RBAC ;
- nouveau Prisma ;
- nouvelles règles autoschedule ;
- nouvelles règles matching ;
- suppression physique généralisée.

---

## 30. Critères de conformité visuelle 99 %

Une correction A25 est conforme visuellement si :

1. Le header ressemble à l’image : titre, sous-titre, bouton principal bleu.
2. Les filtres sont alignés horizontalement en petites cartes blanches.
3. Le toggle `Personnel / Vue dépôt` est compact et intégré.
4. Les exports sont des boutons secondaires blancs, à droite.
5. Les onglets sont fins, avec underline bleu pour l’actif.
6. La grille principale est une matrice salariés × semaines.
7. Les colonnes visibles correspondent à la maquette.
8. Les lignes salariés utilisent avatar + nom + rôle + base + statut.
9. Les cellules semaines affichent des pills compactes, pas des grandes cards.
10. Les couleurs de pills restent douces.
11. La cellule sélectionnée a une bordure bleue sobre.
12. Le panneau droit est fixe, blanc, arrondi, étroit.
13. Le panneau droit affiche l’identité, la semaine, les affectations, absences, conflits et actions.
14. Les actions du panneau respectent la hiérarchie secondaire / primaire.
15. La barre basse d’actions groupées est horizontale, sous la grille.
16. L’action `Vider` est rouge douce, non dominante.
17. Les espacements sont proches de la maquette.
18. Les bordures sont fines.
19. Les ombres sont absentes ou très discrètes.
20. La page n’introduit pas de nouvelle direction artistique.

---

## 31. Critères fonctionnels à ne pas casser

Même si la priorité est visuelle, les sessions A25 ne doivent pas casser :

- auth ;
- session utilisateur ;
- multi-tenant ;
- permissions planning ;
- ajout shift ;
- modification shift ;
- annulation métier ;
- affectation employé 1 ;
- affectation employé 2 ;
- affectation véhicule ;
- affectation base ;
- sélection multiple si présente ;
- exports PDF / Excel / CSV / impression si présents ;
- autoschedule existant ;
- matching existant ;
- historique existant ;
- audit existant.

Toute action non disponible dans le repo mais visible dans la maquette doit être classée :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

---

## 32. Plan Codex recommandé pour la suite A25

Le bloc A25 ne doit pas repartir en micro-corrections.

La suite doit être découpée en sessions centrées sur la reproduction complète.

### A25-PLAN-UI-06 — CADRAGE DOCUMENTAIRE GLOBAL

Type : `AUDIT+CADRAGE`

Objectif :

- intégrer ce document comme référence officielle ;
- vérifier que les images sont bien présentes dans `MAQUETTE_DA` ;
- lister les écarts majeurs du repo actuel avec cette cible ;
- produire aucun patch UI lourd.

Livrable :

```txt
docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md
```

DoD :

```txt
La cible Planning 99 % maquette est documentée et exploitable par Codex.
```

### A25-PLAN-UI-07 — STRUCTURE GLOBALE PAGE PLANNING

Type : `CORRECTION+COMPLÉTION`

Objectif :

- reconstruire le layout global ;
- header ;
- toolbar filtres / vue / exports ;
- onglets ;
- workspace deux colonnes ;
- préparation table + panneau.

DoD :

```txt
La page possède la structure globale visible dans Planning_V1.2.
```

### A25-PLAN-UI-08 — MATRICE SALARIÉS × SEMAINES

Type : `CORRECTION+COMPLÉTION`

Objectif :

- reconstruire la grille principale ;
- colonnes ;
- lignes ;
- avatars ;
- badges statuts ;
- pills shifts ;
- sélection cellule.

DoD :

```txt
La grille centrale ressemble à la matrice de la maquette.
```

### A25-PLAN-UI-09 — PANNEAU DROIT ET BARRE BULK

Type : `CORRECTION+COMPLÉTION`

Objectif :

- reproduire le panneau détail cellule ;
- reproduire les sections affectations / absences / alertes / actions ;
- reproduire la barre basse de sélection multiple.

DoD :

```txt
Le panneau droit et la barre bulk ressemblent à la maquette.
```

### A25-PLAN-UI-10 — FINITIONS VISUELLES ET MODE SOMBRE

Type : `CORRECTION+COMPLÉTION`

Objectif :

- harmoniser les tokens ;
- régler les espacements ;
- vérifier contrastes ;
- traiter mode sombre dans la limite de ce qui existe ;
- éviter les régressions.

DoD :

```txt
La page est visuellement homogène, lisible, et cohérente en clair/sombre.
```

### A25-PLAN-UI-11 — VALIDATION VISUELLE GLOBALE

Type : `VALIDATION`

Objectif :

- comparer capture après avec Planning_V1.2 ;
- vérifier la fidélité visuelle ;
- vérifier que Nathan valide le rendu ;
- vérifier lint/build ;
- vérifier absence de dérive métier.

DoD :

```txt
La page Planning est validée visuellement comme suffisamment fidèle à la maquette.
```

### CLOTURE_A25

Type : `VALIDATION`

Objectif :

- vérifier patchs ;
- vérifier docs ;
- vérifier preuves ;
- vérifier validation visuelle ;
- rendre le verdict final.

Verdict obligatoire :

```txt
BLOC A25 CLÔTURABLE DÉFINITIVEMENT : OUI
```

ou

```txt
BLOC A25 CLÔTURABLE DÉFINITIVEMENT : NON
```

---

## 33. Checklist de contrôle visuel manuel final

À utiliser après intégration code.

### Header

- [ ] Le titre `Planning` a la bonne taille et le bon poids.
- [ ] Le sous-titre est gris bleuté, discret.
- [ ] `Ajouter un shift` est le seul bouton principal du header.
- [ ] Le bouton est bleu, compact, aligné comme la maquette.

### Filtres / exports

- [ ] Les filtres sont en ligne.
- [ ] Chaque filtre est une petite carte blanche.
- [ ] Les labels et valeurs sont hiérarchisés.
- [ ] Le toggle `Personnel / Vue dépôt` ressemble à la maquette.
- [ ] Les exports sont à droite.
- [ ] Les exports sont secondaires, blancs, bordés.

### Onglets

- [ ] Les onglets pilotent réellement la zone principale violette.
- [ ] Les onglets pilotent aussi le panneau contextuel vert.
- [ ] Les contenus des onglets ne sont pas empilés verticalement.
- [ ] Le panneau droit ne conserve pas un détail de cellule obsolète après changement d’onglet.
- [ ] Les onglets sont fins, horizontaux.
- [ ] `Planning manuel` est actif avec underline bleu.
- [ ] Les onglets ne sont pas de gros boutons.

### Grille

- [ ] La grille est une matrice salariés × semaines.
- [ ] Les colonnes correspondent à la maquette.
- [ ] Les lignes ont une hauteur proche.
- [ ] Les bordures sont fines.
- [ ] Les avatars sont ronds et sobres.
- [ ] Les statuts sont en badges doux.
- [ ] Les pills de shifts sont compactes.
- [ ] Les couleurs des pills sont douces.
- [ ] La cellule sélectionnée a une bordure bleue sobre.

### Panneau droit

- [ ] Le panneau est à droite, blanc, arrondi.
- [ ] Le panneau n’est pas une modale.
- [ ] Le header `Détail de la cellule` est propre.
- [ ] L’identité salarié est claire.
- [ ] La semaine sélectionnée est visible.
- [ ] Les affectations sont dans une card interne.
- [ ] Les absences et conflits sont lisibles.
- [ ] Les actions sont hiérarchisées.

### Barre bulk

- [ ] La barre est sous la grille.
- [ ] Elle est horizontale.
- [ ] `3 shifts sélectionnés` est à gauche.
- [ ] Les affectations groupées sont secondaires.
- [ ] `Vider` est rouge doux, non dominant.

### Fidélité globale

- [ ] La page ressemble clairement à `Planning_V1.2.png`.
- [ ] La page ne ressemble plus à une ancienne page corrigée par morceaux.
- [ ] La densité est professionnelle.
- [ ] Les espacements sont réguliers.
- [ ] Les bordures et arrondis sont cohérents.
- [ ] Le rendu est aligné avec `MAQUETTE_DA`.

---

## 34. Verdict d’usage du document

Ce document est la référence visuelle officielle du bloc A25 pour la page Planning.

Il doit être utilisé avant toute nouvelle session de correction UI du Planning.

Toute session A25 restante doit pouvoir répondre à cette question :

```txt
Le patch rapproche-t-il réellement la page Planning de Planning_V1.2.png ?
```

Si la réponse est non, la session ne doit pas être validée visuellement.

