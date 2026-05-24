# Ambulance Manager — RÉFÉRENCE UI/UX SHELL GLOBAL

Version : V0.2 — Chantier documentaire transversal UI/UX + héritage page  
Date : 13/05/2026  
Statut : Document de référence à valider  
Périmètre : Shell applicatif connecté, visuel uniquement, hors bloc applicatif  
Document cible à déposer dans le repo : `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md`

---

## 0. Statut du document

Ce document ouvre le chantier documentaire transversal UI/UX hors bloc applicatif.

Il définit la référence visuelle commune à toutes les pages connectées d’Ambulance Manager disposant d’une maquette officielle.

Il doit servir de socle commun aux futurs documents :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_<PAGE>.md
```

Il reprend la méthode validée sur `REFERENCE_UI_UX_A25_PLANNING.md` :

- partir des images officielles ;
- décrire précisément le rendu visible ;
- traduire la maquette en consignes codables pour Codex ;
- distinguer le visuel, le code réel et les sujets fonctionnels ultérieurs ;
- donner une DoD visuelle contrôlable manuellement.

Ce document ne doit pas être lu comme une inspiration générale. Il doit être utilisé comme une spécification visuelle transversale à reproduire au plus près.

Objectif principal : permettre aux futures sessions de production UI de rendre le shell global proche à environ 99 % des maquettes officielles, sans traiter le fonctionnel métier.

---

## Règle d’héritage par page

Toutes les pages connectées doivent hériter du Shell global.

Les documents page par page ne doivent pas redéfinir inutilement :

- sidebar ;
- topbar ;
- logo ;
- navigation ;
- état actif du menu ;
- fond général ;
- conteneur principal ;
- cartes ;
- boutons ;
- badges ;
- tableaux ;
- filtres ;
- drawers ;
- densité visuelle ;
- règles clair / sombre si applicables.

Chaque `REFERENCE_UI_UX_<PAGE>.md` doit seulement décrire les spécificités visuelles de la page concernée.

En cas de contradiction :

```txt
Image officielle de la page > REFERENCE_UI_UX_<PAGE>.md > REFERENCE_UI_UX_SHELL_GLOBAL.md > documentation MAQUETTE générale
```

Règle de priorité actuelle : le fonctionnel existant est non bloquant pour cette phase visuelle. Si un élément fonctionnel affiché gêne la fidélité à la maquette, il peut être masqué, déplacé, replié, simplifié ou supprimé visuellement, sans modifier la vérité fonctionnelle du code ni les API / Prisma / RBAC / services métier.

Règle de nomenclature UI visible :

- Les libellés affichés dans l'interface doivent suivre la nomenclature fonctionnelle V2.
- Les routes techniques ou historiques peuvent conserver leurs anciens noms si nécessaire.
- Libellés UI attendus : `Modèles horaires`, `Mise en route`, `Dépôts`, `Dépôts / Bases` selon le niveau de module affiché.

---

## 1. Définition du Shell global

Le `Shell global` correspond à toute la structure applicative commune visible autour des pages connectées.

Il ne s’agit pas d’une page métier.

Il regroupe :

- la sidebar gauche ;
- le logo et l’identité `Ambulance Manager` ;
- le badge `ALPHA` ;
- la navigation principale ;
- l’état actif de navigation ;
- le bloc thème en bas de sidebar ;
- le bloc utilisateur en bas de sidebar ;
- la topbar horizontale ;
- le sélecteur société ;
- le bouton thème de topbar ;
- le bloc utilisateur de topbar ;
- le bouton déconnexion ;
- le fond général de l’application ;
- le conteneur principal de page ;
- les marges globales ;
- les règles communes de cards, boutons, badges, filtres, tableaux, drawers et panneaux droits ;
- la densité générale SaaS métier santé / ambulancier.

Le Shell global est visible sur toutes les pages connectées :

```txt
/dashboard
/planning
/users
/vehicles
/templates
/company
/depots
/onboarding
/audit
/privacy
```

La page `/login` est exclue du shell connecté. Elle dispose de sa propre maquette et fera l’objet de son propre document.

---

## 2. Règle d’autorité du chantier UI/UX transversal

### 2.1 Autorité visuelle

Les images officielles sont la vérité visuelle prioritaire.

Source officielle :

```txt
docs/1-MASTER/1-MAQUETTE
```

Règle de priorité :

```txt
Images PNG officielles > REFERENCE_UI_UX_<PAGE>.md > documentation MAQUETTE générale > anciennes captures > récit de production
```

En cas de contradiction visuelle, l’image officielle prévaut.

### 2.2 Autorité codable

Les documents `REFERENCE_UI_UX_<PAGE>.md` sont la traduction codable des images officielles pour Codex.

Ils doivent compléter les maquettes avec :

- l’analyse détaillée des zones visibles ;
- les proportions approximatives ;
- les écarts entre code actuel et cible visuelle ;
- les règles de suppression, masquage ou simplification visuelle ;
- la checklist de contrôle manuel Nathan ;
- la DoD visuelle.

### 2.3 Autorité fonctionnelle

Le code réel reste la vérité fonctionnelle.

Mais ce chantier n’a pas pour objectif de préserver toute la surface fonctionnelle actuellement affichée.

Règle verrouillée pour cette phase :

```txt
PRIORITÉ ACTUELLE = FIDÉLITÉ VISUELLE À 99 % AUX MAQUETTES OFFICIELLES.
```

Conséquences :

- le fonctionnel existant ne doit pas bloquer la reproduction visuelle ;
- si un élément fonctionnel gêne la fidélité maquette, il peut être masqué, déplacé, replié, simplifié ou supprimé visuellement ;
- les arbitrages fonctionnels seront repris plus tard dans des sessions applicatives dédiées ;
- aucune API, Prisma, RBAC, moteur métier, autoschedule, matching ou logique serveur ne doit être modifié dans ce chantier documentaire ;
- le but immédiat est le rendu visible, pas l’exhaustivité fonctionnelle.

### 2.4 Dossier icônes supprimé / neutralisé

Le dossier d’icônes exportées est considéré comme supprimé ou inutile.

Conséquences :

- ne pas dépendre de `docs/1-MASTER/1-MAQUETTE/ICONES` ;
- ne pas recréer un dossier `ICONE` ou `ICONES` ;
- ne pas bloquer une production UI parce qu’un crop d’icône est absent ;
- utiliser les icônes visibles dans les maquettes comme repères visuels ;
- privilégier l’iconographie déjà disponible dans le code, notamment `lucide-react`, avec adaptation de taille, couleur et épaisseur ;
- pour le logo Ambulance Manager, reproduire le plus fidèlement possible le pictogramme ambulance visible avec les moyens du code existant ou un SVG inline simple si nécessaire, sans recréer de dépendance au dossier supprimé.

### 2.5 Phrase `INFORMATION NON FOURNIE — À CONFIRMER`

La formule exacte :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

est réservée aux documents, audits et contrôles qualité.

Elle ne doit jamais être affichée telle quelle dans l’interface utilisateur finale.

Si le code actuel affiche cette formule dans une page visible, c’est une non-conformité UI à traiter lors d’une session applicative ultérieure.

---

## 3. Références visuelles utilisées pour le Shell global

Le Shell global n’a pas une maquette isolée unique.

Il est présent transversalement dans les maquettes officielles suivantes :

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/2-Dashboard/Dashboard_V1.png

docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/4-Planning/Planning_V1.2.png

docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/5-Utilisateurs-RH/Utilisateurs-RH_V1.png

docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/6-Véhicules/Véhicules_V1.2.png

docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/3-Modèles-Horaire/Modèles_horaires_V1.1.png

docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/8-Société-paramètres-métier/Société_V1.0.png

docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/7-Dépôts-bases/Dépôts-bases_V1.0.png

docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/9-Onboarding société pilote/Onboarding_V1.2.png

docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/10-Audit/Audit_V1.0.png

docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/11-Privacy/Privacy_V1.0.png
```

Note chemin : dans certains ZIP, les caractères accentués peuvent apparaître encodés sous la forme `V#U00e9hicules`, `Soci#U00e9t#U00e9`, `D#U00e9p#U00f4ts-bases`. Codex devra lister le dossier réel si un chemin accentué échoue.

---

## 4. Fichiers code concernés

Fichiers principaux observés dans le repo :

```txt
app/layout.tsx
app/app-shell.tsx
app/globals.css
app/a24-vehicles-templates.css
app/a24-complementary-pages.css
app/a24-users-rh.css
app/ui/action-button.tsx
app/ui/data-table.tsx
app/ui/empty-state.tsx
app/ui/error-message.tsx
app/ui/filter-bar.tsx
app/ui/page-header.tsx
app/ui/stat-card.tsx
app/ui/status-badge.tsx
app/ui/index.ts
```

Le Shell global est principalement porté par :

```txt
app/app-shell.tsx
app/layout.tsx
app/globals.css
```

Les composants communs page sont portés par :

```txt
app/ui/*
```

Les fichiers CSS A24 spécialisés peuvent contenir des règles utiles, mais ils ne doivent pas devenir des sources concurrentes si le Shell global est repris proprement.

---

## 5. Lecture générale du Shell visible

### 5.1 Structure macro

Toutes les pages connectées suivent la structure :

```txt
┌───────────────────────┬──────────────────────────────────────────────┐
│ Sidebar gauche fixe   │ Topbar horizontale                           │
│                       ├──────────────────────────────────────────────┤
│ Navigation modules    │ Contenu de page                              │
│                       │                                              │
│ Thème                 │ Header page                                  │
│ Utilisateur           │ Cards / filtres / table / panneau droit      │
└───────────────────────┴──────────────────────────────────────────────┘
```

### 5.2 Nature visuelle

Le Shell global est :

- clair ;
- blanc ;
- respirant ;
- professionnel ;
- stable d’une page à l’autre ;
- dense sans être tassé ;
- orienté SaaS métier santé / transport sanitaire ;
- sans décor superflu ;
- sans ombre lourde ;
- sans contraste agressif.

La maquette ne ressemble pas à :

- une interface CRUD brute ;
- une app Tailwind générique ;
- un dashboard coloré grand public ;
- une interface sombre ;
- une interface mobile.

---

## 6. Dimensions et proportions globales

Les images officielles observées sont principalement en :

```txt
1586 × 992 px
1536 × 1024 px
```

Les valeurs ci-dessous sont approximatives. Elles guident l’intégration, mais ne remplacent pas la comparaison visuelle avec les PNG.

### 6.1 Sidebar

| Élément | Cible approximative |
|---|---:|
| Largeur sidebar | 242 à 274 px selon la maquette |
| Largeur recommandée CSS | 248 à 264 px |
| Hauteur | 100vh |
| Position | gauche, fixe ou sticky |
| Bordure droite | 1 px gris bleuté très clair |
| Fond | blanc pur |
| Padding horizontal | 14 à 18 px |
| Padding vertical haut | 28 à 38 px selon page |
| Rayon externe | aucun, bord droit droit |

La sidebar ne doit pas être compacte type rail icônes uniquement.

### 6.2 Topbar

| Élément | Cible approximative |
|---|---:|
| Hauteur topbar | 64 à 72 px |
| Fond | blanc pur |
| Bordure basse | 1 px gris bleuté très clair |
| Alignement contenu | contrôles à droite |
| Padding horizontal | 24 à 32 px |
| Zone gauche | vide ou très discrète selon page |

La topbar ne doit pas afficher un gros bloc `Société courante` à gauche si ce bloc n’est pas visible dans les maquettes.

### 6.3 Contenu principal

| Élément | Cible approximative |
|---|---:|
| Padding haut après topbar | 26 à 34 px |
| Padding gauche | 28 à 36 px |
| Padding droit | 24 à 36 px |
| Largeur max | ne pas comprimer artificiellement les pages métiers |
| Fond | gris/blanc très légèrement froid |

Les pages avec panneau droit doivent pouvoir utiliser toute la largeur utile disponible.

### 6.4 Breakpoints

Les maquettes fournies sont desktop.

Responsive mobile :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

Pour la phase visuelle actuelle, la priorité est le rendu desktop proche des PNG officiels.

---

## 7. Palette transversale cible

Les couleurs sont approximatives, extraites visuellement des PNG.

| Usage | Cible approximative | Commentaire |
|---|---|---|
| Fond général app | `#F8FAFC` / `#F9FBFF` | Très clair, froid, presque blanc |
| Sidebar | `#FFFFFF` | Blanc pur |
| Topbar | `#FFFFFF` | Blanc pur |
| Surface carte | `#FFFFFF` | Cards, tables, drawers |
| Surface active douce | `#EAF2FF` / `#EEF5FF` | Navigation active, badges bleus |
| Bordure fine | `#E4EAF3` / `#E7ECF5` | Très discrète |
| Texte titre | `#071B49` / `#0B1B45` | Bleu nuit profond |
| Texte courant | `#34456B` / `#3E4D73` | Bleu-gris foncé |
| Texte secondaire | `#7080A0` / `#7A89A8` | Gris bleuté |
| Bleu primaire | `#1677FF` / `#1476F2` | Boutons principaux, actif |
| Bleu primaire hover | `#0F64D8` | Si nécessaire |
| Vert doux | `#E9F8EF` | Statuts OK/disponible/actif |
| Orange doux | `#FFF2E3` | Warning/permission/taxi |
| Rouge doux | `#FFF1F1` | Danger/archive/vider |
| Violet doux | `#F1EAFF` | Archive/garde |
| Icônes neutres | `#7B89A6` | Navigation inactive, méta |

Le code actuel peut avoir des tokens proches. Si les tokens existants sont éloignés du rendu PNG, ils devront être réalignés visuellement plus tard.

---

## 8. Typographie transversale

Police exacte :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

Style attendu : sans-serif moderne, proche Inter / system UI.

### 8.1 Hiérarchie cible

| Usage | Taille cible | Graisse | Couleur |
|---|---:|---:|---|
| Logo `Ambulance Manager` | 20–24 px | 700–800 | Bleu nuit |
| Badge `ALPHA` | 11–12 px | 600–700 | Bleu primaire |
| Item navigation | 15–16 px | 500–600 | Bleu-gris |
| Item navigation actif | 15–16 px | 600–700 | Bleu primaire |
| H1 page | 30–38 px | 700–800 | Bleu nuit |
| Sous-titre page | 14–16 px | 400–500 | Gris bleuté |
| Titre card | 15–18 px | 600–700 | Bleu nuit |
| Texte card | 13–14 px | 400–500 | Bleu-gris |
| Table header | 11–13 px | 600–700 | Bleu nuit |
| Table cellule | 12–14 px | 400–600 | Bleu-gris |
| Badge | 11–12 px | 500–700 | selon statut |
| Bouton | 13–15 px | 600–700 | selon variante |

### 8.2 Règles

- Ne pas utiliser de titres gris ou noirs génériques.
- Les H1 doivent être grands, lisibles, bleu nuit, avec léger resserrement visuel.
- Les textes secondaires doivent rester discrets mais lisibles.
- Éviter les graisses trop lourdes sur tous les éléments à la fois.

---

## 9. Sidebar gauche

### 9.1 Structure visible

La sidebar contient de haut en bas :

```txt
Logo Ambulance Manager + badge ALPHA
Navigation principale
Espace vertical libre
Bloc Thème
Carte utilisateur Nathan A. / Admin
```

### 9.2 Logo / identité

Visible dans les maquettes :

- pictogramme ambulance bleu avec détail rouge ;
- texte `Ambulance` sur une ligne ;
- texte `Manager` sur la ligne suivante ;
- badge `ALPHA` à droite ou légèrement en dessous selon largeur ;
- ensemble aligné en haut à gauche ;
- zone haute assez aérée.

Cible approximative :

| Élément | Cible |
|---|---|
| Marque logo | 44 à 54 px de largeur visible |
| Texte marque | 22–24 px, graisse 700–800 |
| Badge ALPHA | petite pilule bleue très pâle, 11–12 px |
| Espace sous logo | 34 à 46 px avant navigation |

Règle icônes : ne pas dépendre du dossier `ICONES`. Le pictogramme peut être reproduit via composant existant, SVG inline ou Lucide adapté, mais il doit rester proche visuellement de l’ambulance bleue avec accent rouge.

### 9.3 Navigation principale

Items visibles dans les maquettes :

```txt
Tableau de bord
Planning
Utilisateurs / RH
Véhicules
Modèles horaires
Société
Dépôts / Bases
Mise en route
Audit
```

Libellés cible avec accents :

- `Véhicules`, pas `Vehicules` ;
- `Société`, pas `Societe` ;
- `Dépôts`, pas `Depots` ;
- `Déconnexion`, pas `Deconnexion`.
- `Modèles horaires`, pas `Templates` en libellé UI final ;
- `Mise en route`, pas `Onboarding` en libellé UI final ;
- `Dépôts / Bases` quand le libellé de module complet est attendu.

Si le code conserve des libellés sans accents, c’est un écart visuel et qualitatif à corriger lors de la production UI.

### 9.4 Style des items

Item inactif :

```txt
- hauteur 48 à 56 px ;
- icône à gauche, environ 22 à 26 px ;
- texte bleu-gris ;
- pas de bordure visible ;
- pas de fond marqué ;
- espacement vertical régulier.
```

Item actif :

```txt
- fond bleu très pâle ;
- texte bleu primaire ;
- icône bleue ;
- radius 10 à 14 px ;
- hauteur proche 54 px ;
- pas de bordure forte ;
- pas d’ombre.
```

La navigation ne doit pas avoir une icône dans une mini-card séparée pour chaque item si cela alourdit le rendu par rapport à la maquette.

### 9.5 Espacement navigation

Cible :

```txt
- navigation alignée à gauche ;
- gap vertical environ 8 à 14 px ;
- padding horizontal interne item environ 14 à 18 px ;
- icône et texte séparés par 14 à 18 px ;
- aucun séparateur entre items.
```

### 9.6 Bloc thème sidebar

Visible en bas de la sidebar :

```txt
Thème    [soleil] [toggle bleu] [lune]
```

Cible :

- carte blanche ;
- bordure très fine ;
- radius 12 à 16 px ;
- hauteur environ 64 px ;
- libellé `Thème` à gauche ;
- icône soleil en gris bleuté ;
- toggle bleu au centre/droite ;
- icône lune à droite ;
- pas de texte `Mode sombre` dans ce bloc.

Important : les maquettes montrent le contrôle de thème, mais pas une maquette complète en mode sombre.

Donc :

```txt
Le rendu clair est prioritaire. Le mode sombre ne doit pas modifier la cible visuelle claire.
```

### 9.7 Carte utilisateur sidebar

Visible en bas de sidebar sous le thème :

```txt
[avatar rond gris] Nathan A.
                  Admin       [chevron]
```

Cible :

- carte blanche ;
- bordure fine ;
- radius 12 à 16 px ;
- hauteur environ 72 à 88 px ;
- avatar rond gris très doux ;
- nom en bleu nuit, graisse 700 ;
- rôle en bleu-gris ;
- chevron à droite ;
- pas de texte technique ;
- pas de mention `Espace connecté` visible dans la maquette.

Si le code affiche `Espace connecte`, il faut le supprimer visuellement ou le remplacer par une structure conforme à la maquette.

---

## 10. Topbar horizontale

### 10.1 Structure visible

La topbar contient principalement des contrôles alignés à droite :

```txt
[SC Ambulances ▼] [bouton thème] [avatar Nathan A. / Admin ▼] [Déconnexion]
```

La partie gauche de la topbar est vide ou très discrète dans les maquettes.

### 10.2 Sélecteur société

Visible :

```txt
[icône bâtiment] SC Ambulances [chevron]
```

Cible :

- bouton/carte blanche ;
- hauteur environ 42 à 48 px ;
- largeur environ 205 à 230 px ;
- bordure fine ;
- radius 10 à 12 px ;
- icône bâtiment dans petit carré très pâle ;
- texte `SC Ambulances` en bleu nuit ;
- chevron à droite.

À éviter :

- afficher `Société courante` comme label vertical visible dans la topbar ;
- grossir le nom société comme un titre de page ;
- placer le sélecteur société à gauche du header page.

### 10.3 Bouton thème topbar

Visible :

```txt
[carré avec icône soleil]
```

Cible :

- bouton carré 42 à 48 px ;
- bordure fine ;
- radius 10 à 12 px ;
- icône soleil bleutée ;
- pas de texte visible ;
- pas de pilule `Mode sombre` en topbar.

### 10.4 Bloc utilisateur topbar

Visible :

```txt
[avatar rond] Nathan A.
              Admin       [chevron]
```

Cible :

- carte blanche ou zone intégrée ;
- hauteur environ 48 px ;
- avatar rond gris clair ;
- nom `Nathan A.` en graisse 700 ;
- rôle `Admin` en plus petit ;
- chevron à droite ;
- bordure verticale très discrète possible à droite.

### 10.5 Déconnexion

Visible :

```txt
[icône sortie] Déconnexion
```

Cible :

- action texte sobre ;
- icône sortie fine ;
- couleur bleu nuit / bleu-gris ;
- pas un bouton primaire bleu ;
- pas un bouton danger rouge ;
- hauteur alignée avec les autres contrôles.

Si le code actuel utilise un bouton bleu plein pour `Déconnexion`, c’est un écart visuel à corriger.

---

## 11. Fond général et conteneur de page

### 11.1 Fond global

La maquette montre un fond général très clair, presque blanc.

Cible :

```css
background: #f8fafc;
```

ou blanc très légèrement froid.

À éviter :

- gradients visibles forts ;
- arrière-plans bleutés trop présents ;
- grands effets radiaux décoratifs ;
- textures ou motifs.

Si un gradient existe dans le code, il doit être extrêmement discret ou supprimé si visible par rapport aux maquettes.

### 11.2 Conteneur principal

Le contenu commence sous la topbar avec un padding régulier.

Cible :

```txt
padding-top : 28 à 34 px
padding-left : 28 à 36 px
padding-right : 24 à 36 px
padding-bottom : 24 à 32 px
```

Les pages métiers ne doivent pas être limitées par un `max-width` trop faible.

Pour les pages avec panneau droit, le layout doit pouvoir utiliser toute la largeur disponible.

### 11.3 Règle responsive transverse multi-écrans

Une page visuellement proche en écran standard mais trop petite/centrée en 2560×1440, ou trop compressée en 1920×1080, n'est pas considérée comme pleinement conforme au 99 % visuel.

Contrôle minimal obligatoire :

```txt
1920×1080
2560×1440
```

Règles :

- ne pas utiliser `zoom` ;
- ne pas utiliser `transform: scale()` pour adapter globalement l'interface ;
- privilégier `clamp()`, grilles fluides, paddings adaptatifs et largeurs max raisonnables ;
- le Shell doit rester lisible et exploitable ;
- la sidebar doit rester entièrement visible ou accessible via scroll interne maîtrisé ;
- le contenu principal doit mieux exploiter les grands écrans sans devenir un mur de contenu.

---

## 12. Composants transversaux hérités du Shell

Le Shell global doit aussi fixer les règles communes suivantes, car elles apparaissent dans presque toutes les maquettes.

### 12.1 PageHeader

Structure cible :

```txt
Titre page
Sous-titre page
Action principale éventuelle à droite
```

Cible H1 :

```txt
30 à 38 px
font-weight 700 / 800
bleu nuit
line-height compacte
```

Action principale :

- bouton bleu plein ;
- hauteur 40 à 44 px ;
- radius 8 à 10 px ;
- icône plus si création ;
- une seule action primaire dominante par header.

### 12.2 Cards

Cible :

```txt
- fond blanc ;
- bordure 1 px gris bleuté clair ;
- radius 14 à 18 px ;
- ombre très faible ou absente ;
- padding 16 à 24 px ;
- structure propre ;
- jamais d’effet carte sombre ou épaisse.
```

### 12.3 StatCards

Cible :

```txt
- icône dans carré arrondi coloré ;
- valeur KPI grande ;
- label court ;
- fond blanc ;
- bordure fine ;
- radius large ;
- ombre douce très légère.
```

Les couleurs KPI doivent rester douces et cohérentes : bleu, vert, orange, violet, cyan.

### 12.4 Boutons

Variantes visibles :

- primaire bleu ;
- secondaire blanc bordé ;
- danger rouge uniquement pour actions destructrices ;
- ghost très discret pour actions secondaires.

Règles :

- éviter les boutons bleus partout ;
- ne pas mettre `Déconnexion` en bouton primaire ;
- éviter les boutons gris trop foncés ;
- les exports sont secondaires ;
- les actions destructrices sont rouges mais sobres.

### 12.5 Badges

Cible :

```txt
- pilule compacte ;
- hauteur 22 à 28 px ;
- radius 6 à 999 px selon usage ;
- fond coloré doux ;
- texte lisible ;
- petit point coloré possible pour statuts.
```

Badges récurrents visibles :

- `Disponible` vert ;
- `Actif` vert ;
- `Selon permissions` orange ;
- `Archivé` violet/gris ;
- `Désactivé` orange/gris ;
- types métier : Ambulance, VSL, Taxi, Garde.

### 12.6 Tableaux

Cible :

```txt
- conteneur blanc ;
- bordure fine ;
- radius 12 à 16 px ;
- header très clair ;
- lignes denses mais respirantes ;
- séparateurs fins ;
- sélection en bleu pâle ;
- checkbox discrète ;
- actions ligne sobres.
```

À éviter :

- tableau Excel dur ;
- bordures verticales trop noires ;
- hauteur de ligne trop grande ;
- contraste de header trop fort ;
- zebra striping marqué.

### 12.7 Filtres

Cible :

```txt
- barre horizontale desktop ;
- search input + selects + boutons secondaires ;
- hauteur 40 à 46 px ;
- bordures fines ;
- radius 8 à 12 px ;
- icônes discrètes ;
- labels courts.
```

Les filtres ne doivent pas devenir un grand formulaire vertical en desktop, sauf contrainte responsive hors maquette.

### 12.8 Panneaux droits / drawers

Plusieurs maquettes utilisent un panneau droit visible.

Cible :

```txt
- panneau blanc ;
- bordure fine ;
- radius 14 à 18 px ;
- largeur environ 360 à 430 px selon page ;
- hauteur alignée à la zone utile ;
- bouton fermer `X` en haut à droite ;
- sections internes en cards légères ;
- actions en bas si visible.
```

Le panneau droit ne doit pas ressembler à une modale flottante lourde si la maquette le montre intégré dans la page.

---

## 13. Écarts initiaux observés dans le code actuel

Cette section ne demande aucune correction immédiate. Elle sert à préparer les futures sessions Codex.

### 13.1 Topbar actuelle potentiellement trop textuelle

Dans `app/app-shell.tsx`, la topbar actuelle affiche une structure avec :

```txt
Societe courante
<nom société>
Mode sombre / Mode clair
Utilisateur
Profil
Deconnexion
```

Les maquettes montrent plutôt :

```txt
SC Ambulances
icône thème seule
Nathan A. / Admin
Déconnexion
```

Écart probable : topbar actuelle trop chargée et trop textuelle.

### 13.2 Bloc thème actuel mal placé

Les maquettes montrent un bloc `Thème` dans la sidebar basse, avec switch soleil/lune.

Le code actuel contient un bouton de thème dans la topbar avec texte `Mode sombre` ou `Mode clair`.

Écart probable : contrôle thème à déplacer/simplifier visuellement.

### 13.3 Carte utilisateur sidebar incomplète ou différente

Les maquettes montrent une carte utilisateur en bas de sidebar avec avatar, nom, rôle et chevron.

Le code actuel contient un bloc utilisateur, mais aussi un libellé `Espace connecte` non visible dans les maquettes.

Écart probable : retirer le libellé technique et réaligner la carte.

### 13.4 Libellés sans accents

Le code observé utilise plusieurs libellés sans accents :

```txt
Vehicules
Societe
Depots / bases
Deconnexion
Societe courante
Gerance
Regulation
Ambulancier diplome d'Etat
```

Les maquettes utilisent des libellés français accentués.

Écart probable : corriger les libellés visibles dans la phase UI.

### 13.5 Style navigation actuel potentiellement trop “icône dans capsule”

Le code actuel donne une petite capsule à l’icône de chaque item.

Les maquettes montrent plutôt des icônes plus intégrées, avec item actif sur fond bleu pâle et inactifs sobres.

Écart probable : alléger les icônes de navigation si elles paraissent trop cartonnées.

### 13.6 Fond actuel possiblement trop décoré

Le code actuel contient un fond avec gradient/radial.

Les maquettes montrent un fond très clair, quasiment plat.

Écart probable : supprimer ou réduire fortement les effets décoratifs.

### 13.7 Déconnexion actuelle potentiellement trop prioritaire

Le code actuel peut rendre `Déconnexion` comme un bouton bleu plein.

La maquette montre une action sobre en texte avec icône.

Écart probable : déprioriser visuellement `Déconnexion`.

---

## 14. Règles de production Codex ultérieure

Ce document ne déclenche pas encore de production code.

Quand une session Codex sera lancée pour le Shell global, elle devra respecter ces règles :

1. Lire ce document avant modification.
2. Lire les PNG officiels utiles dans `docs/1-MASTER/1-MAQUETTE/` (dossiers `MAQUETTE_PNG`, `MAQUETTE_PNG`, `MAQUETTE_PNG`).
3. Lire uniquement les fichiers code nécessaires au Shell.
4. Ne pas scanner inutilement tout le dépôt.
5. Ne pas générer de captures automatiquement.
6. Nathan fera les vérifications visuelles manuellement.
7. Ne pas modifier API, Prisma, RBAC, services, seed ou logique métier.
8. Produire un patch ciblé Shell/UI uniquement.
9. Fournir une preuve `git apply --check` réelle du patch principal.
10. Fournir les sorties complètes de `npm run lint` et `npm run build`, avec codes retour.
11. Réexporter le patch en UTF-8 sans BOM.

Si un élément fonctionnel empêche la fidélité visuelle, Codex peut :

```txt
masquer
supprimer visuellement
déplacer
replier
simplifier
remplacer par un état visuel maquette
```

sans traiter la fonctionnalité métier en profondeur.

---

## 15. DoD visuelle Shell global

Le Shell global pourra être considéré visuellement conforme seulement si les points suivants sont validés manuellement.

### 15.1 Sidebar

- [ ] largeur proche des maquettes ;
- [ ] fond blanc ;
- [ ] bordure droite fine ;
- [ ] logo Ambulance Manager visuellement proche ;
- [ ] badge `ALPHA` visible et sobre ;
- [ ] navigation complète ;
- [ ] libellés accentués ;
- [ ] item actif conforme : fond bleu pâle, texte bleu, radius doux ;
- [ ] items inactifs sobres, lisibles, non surchargés ;
- [ ] bloc `Thème` visible en bas ;
- [ ] carte utilisateur visible en bas ;
- [ ] aucun libellé technique type `Espace connecté` si absent de la maquette.

### 15.2 Topbar

- [ ] hauteur proche 64–72 px ;
- [ ] fond blanc ;
- [ ] bordure basse fine ;
- [ ] contrôles alignés à droite ;
- [ ] sélecteur `SC Ambulances` conforme ;
- [ ] bouton thème topbar compact, sans texte long ;
- [ ] bloc utilisateur `Nathan A. / Admin` conforme ;
- [ ] action `Déconnexion` sobre, non primaire ;
- [ ] pas de gros bloc `Société courante` visible à gauche.

### 15.3 Fond et conteneur

- [ ] fond général très clair et plat ;
- [ ] pas de gradient visible gênant ;
- [ ] padding de contenu proche des maquettes ;
- [ ] pages larges non comprimées ;
- [ ] continuité visuelle entre Dashboard, Planning, Modèles horaires, Audit et autres pages.

### 15.4 Composants communs

- [ ] titres H1 bleu nuit, taille proche maquettes ;
- [ ] sous-titres gris bleuté ;
- [ ] cards blanches avec bordure fine et radius cohérent ;
- [ ] boutons primaires bleus seulement pour actions principales ;
- [ ] boutons secondaires sobres ;
- [ ] badges doux et lisibles ;
- [ ] tableaux propres, non Excel brut ;
- [ ] panneaux droits sobres, intégrés, non modales lourdes.

### 15.5 Règle 99 %

- [ ] le rendu donne l’impression d’être une page sœur directe des PNG officiels ;
- [ ] la maquette n’est pas seulement “inspirante”, elle est réellement reproduite ;
- [ ] aucun élément fonctionnel non maquette ne surcharge le shell ;
- [ ] les éléments fonctionnels gênants ont été masqués, déplacés ou simplifiés visuellement ;
- [ ] aucun sujet fonctionnel ultérieur ne bloque la validation visuelle.

---

## 16. Checklist de contrôle manuel Nathan

Après production future du Shell global, Nathan devra vérifier manuellement :

```txt
1. Ouvrir /dashboard.
2. Comparer sidebar + topbar avec Dashboard_V1.png.
3. Ouvrir /planning.
4. Comparer sidebar + topbar avec Planning_V1.2.png.
5. Ouvrir /templates.
6. Vérifier que le panneau droit et le contenu utilisent le même shell.
7. Ouvrir /audit.
8. Vérifier que le shell reste identique malgré la page dense.
9. Ouvrir /privacy.
10. Vérifier que la page simple conserve la topbar/sidebar cohérente si elle est connectée.
11. Contrôler les accents : Société, Dépôts, Véhicules, Déconnexion.
12. Contrôler que `INFORMATION NON FOURNIE — À CONFIRMER` n’apparaît jamais dans l’interface.
13. Contrôler que le bouton thème n’alourdit pas la topbar.
14. Contrôler que Déconnexion n’est pas un bouton primaire bleu.
15. Contrôler que les pages semblent appartenir au même produit.
```

Verdict manuel attendu :

```txt
SHELL GLOBAL VISUEL 99 % : OUI / NON
ÉCARTS VISUELS RESTANTS : liste courte
FONCTIONNEL À REPRENDRE PLUS TARD : liste séparée, non bloquante pour cette phase
```

---

## 17. Matrice de conformité attendue

| Zone | Attendu | Verdict futur |
|---|---|---|
| Sidebar largeur / fond / bordure | conforme aux PNG | À contrôler |
| Logo Ambulance Manager | proche visuellement | À contrôler |
| Badge ALPHA | visible, sobre, bleu pâle | À contrôler |
| Navigation | complète, accentuée, active cohérente | À contrôler |
| Bloc thème sidebar | présent et conforme | À contrôler |
| Carte utilisateur sidebar | avatar + nom + rôle + chevron | À contrôler |
| Topbar | contrôles à droite, fond blanc | À contrôler |
| Sélecteur société | `SC Ambulances`, icône, chevron | À contrôler |
| Bouton thème topbar | carré, icône seule | À contrôler |
| User topbar | avatar + Nathan A. + Admin | À contrôler |
| Déconnexion | sobre, non primaire | À contrôler |
| Fond app | clair, plat, non décoratif | À contrôler |
| Conteneur page | padding et largeur cohérents | À contrôler |
| Composants communs | cards, boutons, badges, tables homogènes | À contrôler |
| Absence formule QA dans UI | obligatoire | À contrôler |

---

## 18. Exclusions explicites

Ce document ne demande pas :

- de créer un nouveau bloc applicatif ;
- de modifier le backend ;
- de modifier Prisma ;
- de modifier les permissions ;
- de modifier les routes API ;
- de traiter le responsive mobile ;
- de traiter le mode sombre complet ;
- de recréer le dossier icônes supprimé ;
- de conserver toute fonctionnalité visible si elle gêne la fidélité maquette ;
- de produire des captures automatiquement par Codex.

---

## 19. Ordre de suite recommandé

Après validation de ce document, les références page par page peuvent être rédigées dans cet ordre :

```txt
1. REFERENCE_UI_UX_LOGIN.md
2. REFERENCE_UI_UX_DASHBOARD.md
3. REFERENCE_UI_UX_COMPANY.md
4. REFERENCE_UI_UX_DEPOTS_BASES.md
5. REFERENCE_UI_UX_VEHICLES.md
6. REFERENCE_UI_UX_TEMPLATES.md
7. REFERENCE_UI_UX_USERS_RH.md
8. REFERENCE_UI_UX_ONBOARDING.md
9. REFERENCE_UI_UX_AUDIT.md
10. REFERENCE_UI_UX_PRIVACY.md
```

`REFERENCE_UI_UX_A25_PLANNING.md` est déjà rédigé selon la méthode A25 et sera ajouté manuellement dans le dossier :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/
```

---

## 20. Verdict documentaire initial

```txt
Document Shell global exploitable comme référence UI/UX transitoire, non validé fonctionnellement à ce stade.
PÉRIMÈTRE VISUEL UNIQUEMENT : OUI
NOUVEAU BLOC APPLICATIF CRÉÉ : NON
MODIFICATION CODE DEMANDÉE MAINTENANT : NON
FIDÉLITÉ MAQUETTE 99 % PRIORITAIRE : OUI
FONCTIONNEL NON BLOQUANT POUR CETTE PHASE : OUI
DOSSIER ICÔNES SUPPRIMÉ / NEUTRALISÉ : OUI
```
