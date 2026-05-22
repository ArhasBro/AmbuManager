# Ambulance Manager — RÉFÉRENCE UI/UX DASHBOARD

Version : V1.0.0 — SPÉCIFICATION VISUELLE MAQUETTE 99 %  
Date : 13/05/2026  
Chantier concerné : `Documentation transversale UI/UX — hors bloc applicatif`  
Document cible à déposer dans le repo : `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_DASHBOARD.md`

---

## 0. Statut du document

Ce document est une référence UI/UX codable pour la page `Dashboard` d’Ambulance Manager.

Il est rédigé dans le cadre du chantier documentaire transversal UI/UX, hors bloc applicatif.

Il ne crée pas de nouveau bloc de développement.

Il ne demande pas de refonte fonctionnelle.

Il sert à préparer une future production Codex dont l’objectif sera uniquement :

```txt
Reproduire visuellement la maquette officielle Dashboard à environ 99 %.
```

La page Dashboard doit donc être évaluée sur sa fidélité visuelle à la maquette, pas sur l’ajout, la conservation ou l’enrichissement de fonctionnalités non visibles.

Le Dashboard doit être compris comme un portail d’accueil connecté, sobre, lisible et professionnel.

Il ne doit pas être transformé en cockpit analytique complexe.

---

## 1. Règle d’autorité

### 1.1 Référence visuelle officielle

La référence officielle de la page Dashboard est l’image située dans :

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/2-Dashboard/Dashboard_V1.png
```

Image analysée :

```txt
Dashboard_V1.png
```

Cette image est la vérité visuelle de la page Dashboard.

### 1.2 Règle d’autorité visuelle

```txt
Image Dashboard_V1.png > REFERENCE_UI_UX_DASHBOARD.md > REFERENCE_UI_UX_SHELL_GLOBAL.md > documents généraux MAQUETTE > anciennes captures > code actuel
```

La page doit être reproduite en priorité selon l’image officielle.

Le document `REFERENCE_UI_UX_SHELL_GLOBAL.md` fixe la structure commune de l’application connectée.

Le présent document ne redéfinit pas tout le Shell. Il décrit les spécificités visibles de la page Dashboard.

Les documents généraux de maquette servent uniquement de contexte de direction artistique.

Les anciennes captures de sessions ne doivent pas servir de référence cible.

### 1.3 Règle d’autorité fonctionnelle

```txt
Code réel du repo > documentation produit > hypothèses
```

Le code réel fixe ce qui existe fonctionnellement.

Mais dans cette phase UI/UX, la priorité est exclusivement visuelle.

Conséquence :

- le chargement réel de session peut être conservé s’il ne gêne pas le rendu cible ;
- le calcul réel des compteurs peut être conservé s’il ne gêne pas le rendu cible ;
- les règles de permissions peuvent rester en place si elles ne bloquent pas la reproduction de l’état admin visible dans la maquette ;
- aucun RBAC, NextAuth, Prisma, API, moteur métier ou modèle de données ne doit être refondu pour cette phase ;
- si un élément fonctionnel visible dans le code actuel empêche de reproduire la maquette, il peut être masqué, déplacé, simplifié ou supprimé visuellement ;
- les arbitrages fonctionnels seront repris plus tard dans des sessions applicatives dédiées.

### 1.4 Règle sur `INFORMATION NON FOURNIE — À CONFIRMER`

La formule :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

est autorisée dans ce document de référence ou dans les contrôles QA.

Elle ne doit jamais être affichée dans l’interface utilisateur.

### 1.5 Dossier ICONE / ICONES

Le dossier historique `ICONE` / `ICONES` est neutralisé et ne doit pas être utilisé comme source de vérité.

Pour la page Dashboard, la référence visuelle reste uniquement :

```txt
Dashboard_V1.png
```

Si des icônes sont nécessaires côté code, Codex doit utiliser les icônes déjà disponibles dans le projet, notamment `lucide-react`, ou des composants existants.

L’objectif n’est pas de retrouver l’icône source exacte, mais de reproduire le rendu visible : taille, couleur, contraste, style, alignement et cohérence.

---

## 2. Périmètre de la page Dashboard

### 2.1 Route réelle concernée

Route :

```txt
/dashboard
```

### 2.2 Fichiers code probables

Fichiers principaux à lire avant production :

```txt
app/dashboard/page.tsx
app/app-shell.tsx
app/globals.css
app/layout.tsx
app/ui/page-header.tsx
app/ui/stat-card.tsx
app/ui/status-badge.tsx
app/ui/action-button.tsx
```

Fichiers secondaires à consulter seulement si nécessaire :

```txt
lib/auth.ts
lib/permissions.ts
lib/prisma.ts
types/next-auth.d.ts
```

Règle de sobriété pour Codex :

```txt
Lire uniquement les fichiers utiles au rendu visuel Dashboard et Shell.
Ne pas scanner largement le dépôt.
Ne pas auditer les routes API.
Ne pas reprendre le fonctionnel.
```

### 2.3 Limite stricte du périmètre

La future session Codex ne doit pas modifier volontairement :

```txt
NextAuth
session
RBAC
permissions métier
Prisma
API
migrations
seed
calculs métier
routage applicatif
```

Sauf si le code ne compile plus après correction visuelle, ces éléments ne doivent pas être touchés.

### 2.4 Nature de la page

La page Dashboard est une page connectée.

Elle hérite du Shell global.

Elle doit afficher :

- la sidebar gauche ;
- la topbar ;
- le titre de page ;
- un sous-titre d’intention ;
- une carte profil connecté ;
- une rangée de quatre indicateurs simples ;
- une grille de huit cartes modules ;
- des badges de disponibilité sobres ;
- des boutons `Ouvrir` discrets ;
- une hiérarchie visuelle claire et respirante.

Elle ne doit pas afficher :

- de graphiques avancés ;
- de tableaux lourds ;
- de logs ;
- de debug session ;
- de section technique ;
- de JSON ;
- de message documentaire `INFORMATION NON FOURNIE — À CONFIRMER` ;
- de blocs d’explication fonctionnelle longs ;
- d’en-tête supplémentaire non visible dans la maquette, par exemple `Modules d’accès`, si cela casse la fidélité visuelle.

---

## 3. Lecture générale de la maquette

### 3.1 Format de référence

L’image officielle `Dashboard_V1.png` mesure approximativement :

```txt
Largeur : 1586 px
Hauteur : 992 px
```

La maquette représente une vue desktop large.

Responsive mobile :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

Codex peut prévoir un responsive propre, mais il ne doit pas inventer une nouvelle expérience mobile au détriment de la fidélité desktop.

### 3.2 Organisation macro

La page est structurée ainsi :

```txt
┌──────────────────────────────┬──────────────────────────────────────────────────────┐
│ Sidebar gauche               │ Topbar horizontale                                   │
│                              ├──────────────────────────────────────────────────────┤
│ Logo + navigation            │ Contenu Dashboard                                    │
│                              │                                                      │
│ Thème                        │ Titre + sous-titre                                   │
│ Bloc utilisateur             │ Carte profil connecté                                │
│                              │ 4 cartes indicateurs                                 │
│                              │ 8 cartes modules                                     │
└──────────────────────────────┴──────────────────────────────────────────────────────┘
```

La page doit donner une impression de portail SaaS métier : propre, simple, premium, directement exploitable.

### 3.3 Répartition visuelle approximative

| Zone | X approx. | Y approx. | Largeur approx. | Hauteur approx. | Commentaire |
|---|---:|---:|---:|---:|---|
| Sidebar | 0 | 0 | 283 px | 992 px | Shell global |
| Topbar | 283 px | 0 | 1303 px | 72 px | Shell global |
| Contenu principal | 283 px | 72 px | 1303 px | 920 px | Fond très clair |
| Titre page | 320 px | 101 px | 600 px | 42 px | `Tableau de bord` |
| Sous-titre | 320 px | 153 px | 650 px | 22 px | Phrase descriptive |
| Carte profil | 320 px | 195 px | 1228 px | 125 px | Grande carte horizontale |
| Cartes KPI | 320 px | 344 px | 1228 px | 136 px | 4 colonnes |
| Cartes modules ligne 1 | 320 px | 506 px | 1228 px | 204 px | 4 colonnes |
| Cartes modules ligne 2 | 320 px | 733 px | 1228 px | 206 px | 4 colonnes |

Les valeurs sont approximatives. Elles servent à guider la reproduction, pas à imposer une grille CSS au pixel strict.

---

## 4. Héritage du Shell global

### 4.1 Règles héritées

La page Dashboard doit hériter des règles de `REFERENCE_UI_UX_SHELL_GLOBAL.md` pour :

- largeur de sidebar ;
- logo Ambulance Manager ;
- badge `ALPHA` ;
- navigation ;
- état actif `Tableau de bord` ;
- bloc thème en bas de sidebar ;
- bloc utilisateur en bas de sidebar ;
- topbar ;
- sélecteur société ;
- bouton thème topbar ;
- bloc utilisateur topbar ;
- bouton déconnexion ;
- fond général ;
- cards ;
- badges ;
- boutons ;
- typographie ;
- arrondis ;
- bordures ;
- ombres.

### 4.2 Spécificité Dashboard dans la sidebar

Dans la maquette Dashboard, l’item actif de navigation est :

```txt
Tableau de bord
```

Rendu attendu :

- fond bleu très clair ;
- texte bleu primaire ;
- icône bleue ;
- arrondi important ;
- padding horizontal confortable ;
- hauteur visuelle environ 56 px ;
- absence de bordure agressive ;
- effet sélection doux.

Les autres items restent gris/bleu ardoise, sans fond marqué.

### 4.3 Spécificité Dashboard dans la topbar

La topbar visible dans la maquette contient :

```txt
SC Ambulances
bouton thème
Nathan A. / Admin
Déconnexion
```

Ces éléments relèvent du Shell global.

Le Dashboard ne doit pas ajouter une deuxième barre, un deuxième profil utilisateur ou une navigation secondaire en haut de page.

---

## 5. Contenu visible exact de la page

### 5.1 Titre principal

Texte visible :

```txt
Tableau de bord
```

Rendu attendu :

- très grand titre ;
- graisse forte ;
- couleur bleu nuit ;
- aligné à gauche ;
- placé en haut du contenu, sous la topbar ;
- aucune icône à gauche du titre ;
- aucun bouton d’action à droite du titre.

Approximation visuelle :

```txt
font-size : 38-42 px
font-weight : 800
line-height : compacte
couleur : bleu nuit proche #0B1736
```

### 5.2 Sous-titre

Texte visible :

```txt
Portail d’accès aux modules de gestion de votre société ambulancière.
```

Rendu attendu :

- placé immédiatement sous le titre ;
- texte gris bleu ;
- taille moyenne ;
- pas de retour à la ligne sur desktop large ;
- pas de style badge ;
- pas de gras.

Approximation :

```txt
font-size : 15-16 px
couleur : #64708A environ
marge supérieure : 6-8 px
```

### 5.3 Éléments non visibles à ne pas ajouter autour du titre

La maquette ne montre pas :

- bouton `Créer` ;
- bouton `Actualiser` ;
- bouton `Exporter` ;
- fil d’Ariane ;
- onglets ;
- recherche ;
- sélecteur de période ;
- texte `Modules d’accès` entre le titre et les cartes ;
- explication longue sur les permissions.

Si ces éléments existent dans le code actuel ou dans un composant générique, ils doivent être masqués ou retirés visuellement pour cette page.

---

## 6. Carte profil connecté

### 6.1 Position et structure

La carte profil connecté est la première grande carte de contenu.

Elle est placée sous le titre et le sous-titre.

Rendu attendu :

- grande carte blanche horizontale ;
- largeur presque complète du contenu ;
- hauteur environ 125 px ;
- bordure très fine ;
- coins arrondis ;
- ombre très subtile ;
- contenu centré verticalement ;
- pas de fond bleu fort ;
- pas de gradient visible agressif.

### 6.2 Avatar

À gauche de la carte, la maquette affiche un avatar générique :

- cercle gris/bleu clair ;
- pictogramme utilisateur gris ;
- taille importante ;
- pastille verte de statut en bas à droite ;
- léger anneau blanc autour de la pastille.

Approximation :

```txt
avatar : 84 x 84 px
pastille statut : 16 x 16 px
couleur avatar fond : #EDF3FF / #E8EEF8
couleur pictogramme : #6B7895
couleur statut : vert #2BC06F
```

Important :

- ne pas afficher les initiales si cela éloigne du rendu de la maquette ;
- préférer un pictogramme utilisateur générique ;
- si l’image utilisateur réelle n’existe pas, l’avatar générique est conforme.

### 6.3 Bloc identité

Texte principal visible :

```txt
Connecté en tant que Nathan Archenoul
```

Rendu attendu :

- placé à droite de l’avatar ;
- en haut du bloc texte ;
- graisse forte ;
- couleur bleu nuit ;
- taille environ 16-17 px ;
- pas un titre H1 ;
- pas trop grand.

La valeur `Nathan Archenoul` peut rester dynamique si le code dispose de `session.user.name`.

Pour la fidélité visuelle, le format attendu est :

```txt
Connecté en tant que <Nom utilisateur>
```

### 6.4 Ligne email

Texte visible dans la maquette :

```txt
nathan.archenoul@sc-ambulances.fr
```

Rendu attendu :

- petite icône enveloppe à gauche ;
- couleur gris bleu ;
- taille environ 14 px ;
- alignement horizontal ;
- pas de badge arrondi autour de l’email ;
- pas de fond coloré.

Important :

Le code actuel peut conserver l’email réel de session.

Si l’email est absent, ne jamais afficher `INFORMATION NON FOURNIE — À CONFIRMER` dans l’UI.

Préférer un libellé utilisateur propre, par exemple :

```txt
Email non renseigné
```

uniquement si nécessaire.

### 6.5 Séparateurs verticaux

La maquette montre deux séparateurs verticaux fins entre :

```txt
email | rôle | société
```

Rendu attendu :

- trait vertical très clair ;
- hauteur environ 24 px ;
- couleur gris clair ;
- espacement horizontal généreux.

### 6.6 Bloc rôle

La maquette affiche :

```txt
Rôle    Administrateur
```

avec `Rôle` dans un petit badge bleu clair.

Rendu attendu :

- badge `Rôle` bleu très clair ;
- texte du badge bleu ;
- valeur `Administrateur` en texte normal à droite ;
- pas de formulation `Profil : ...` ;
- pas de badge global `Profil : Administrateur`.

Si le rôle réel est dynamique, garder le rendu :

```txt
[Rôle] <libellé du rôle>
```

### 6.7 Bloc société

La maquette affiche :

```txt
Société    SC Ambulances
```

avec `Société` dans un petit badge bleu clair.

Rendu attendu :

- badge `Société` bleu très clair ;
- valeur société en texte normal à droite ;
- pas de formulation `Société rattachée` ;
- pas de badge `Accès : normal` ;
- pas de badge `Modules visibles : X`.

Si le nom société est dynamique, garder le rendu :

```txt
[Société] <Nom société>
```

### 6.8 Éléments à supprimer ou masquer dans la carte profil

La maquette ne montre pas :

- badge `Profil : ...` ;
- badge `Accès : normal` ;
- badge `Modules visibles : ...` ;
- fond gradient bleu marqué ;
- avatar avec initiales ;
- icône bâtiment pour `Société rattachée` ;
- message d’alerte sous la carte si la session est normale ;
- texte technique sur les permissions.

Si ces éléments existent dans le code actuel, ils doivent être retirés ou masqués visuellement pour se rapprocher de la maquette.

---

## 7. Cartes indicateurs KPI

### 7.1 Organisation générale

La maquette affiche quatre cartes KPI alignées sur une seule ligne :

```txt
Utilisateurs actifs | Véhicules actifs | Dépôts actifs | Templates actifs
```

Rendu attendu :

- grille 4 colonnes sur desktop ;
- cartes blanches ;
- bordure fine ;
- coins arrondis ;
- ombre subtile ;
- hauteur environ 136 px ;
- icône carrée colorée à gauche ;
- texte à droite ;
- valeur numérique grande et colorée ;
- hint en dessous.

### 7.2 Dimensions approximatives

Sur desktop large :

```txt
largeur carte : 280-285 px
hauteur carte : 135-140 px
gap horizontal : 22-24 px
padding interne : 22-24 px
icône : 56 x 56 px
arrondi icône : 14-16 px
```

### 7.3 KPI 1 — Utilisateurs actifs

Texte visible :

```txt
Utilisateurs actifs
24
sur 32 utilisateurs
```

Rendu attendu :

- icône groupe utilisateurs ;
- carré icône bleu ;
- valeur `24` en bleu vif ;
- label en bleu nuit ;
- hint en gris bleu.

### 7.4 KPI 2 — Véhicules actifs

Texte visible :

```txt
Véhicules actifs
36
sur 48 véhicules
```

Rendu attendu :

- icône ambulance ;
- carré icône turquoise/vert d’eau ;
- valeur `36` en turquoise ;
- label en bleu nuit ;
- hint en gris bleu.

### 7.5 KPI 3 — Dépôts actifs

Texte visible :

```txt
Dépôts actifs
8
sur 10 dépôts
```

Rendu attendu :

- icône bâtiment/entrepôt ;
- carré icône violet ;
- valeur `8` en violet ;
- label en bleu nuit ;
- hint en gris bleu.

### 7.6 KPI 4 — Templates actifs

Texte visible :

```txt
Templates actifs
12
sur 15 templates
```

Rendu attendu :

- icône document ;
- carré icône orange ;
- valeur `12` en orange ;
- label en bleu nuit ;
- hint en gris bleu.

### 7.7 Données dynamiques

Le code actuel peut conserver les compteurs dynamiques si ceux-ci existent déjà.

Le format visuel doit rester strictement identique :

```txt
<valeur active>
sur <valeur totale> <nom pluriel>
```

Ne pas remplacer les cartes KPI par :

- graphiques ;
- progress bars ;
- pourcentages ;
- badges techniques ;
- tableaux ;
- cards plus hautes ;
- cartes en deux lignes sur desktop large.

### 7.8 Absence de données

Si une donnée réelle est absente ou vaut zéro, ne pas afficher de phrase documentaire.

Options acceptables visuellement :

```txt
0
sur 0 utilisateurs
```

ou masquer temporairement la carte si le rôle ne doit réellement pas la voir.

Mais pour la reproduction de la maquette admin, l’état cible affiche les quatre KPI.

---

## 8. Grille des cartes modules

### 8.1 Organisation générale

La maquette affiche huit cartes modules en deux lignes de quatre cartes :

```txt
Ligne 1 : Planning | Utilisateurs / RH | Véhicules | Templates
Ligne 2 : Société | Dépôts | Onboarding | Audit
```

Rendu attendu :

- grille 4 colonnes desktop ;
- cartes blanches ;
- bordure fine ;
- coins arrondis ;
- ombre subtile ;
- hauteur homogène ;
- icône en haut à gauche ;
- titre + description ;
- badge de statut ;
- bouton `Ouvrir` en bas ;
- flèche à droite dans le bouton.

### 8.2 Dimensions approximatives

Sur desktop large :

```txt
largeur carte : 280-285 px
hauteur carte : 200-206 px
gap horizontal : 22-24 px
gap vertical : 22-24 px
padding interne : 18-20 px
icône : 48-52 px
bouton bas : hauteur 38-40 px
```

### 8.3 Structure interne d’une carte module

Structure cible :

```txt
┌─────────────────────────────────┐
│ [icône]  Titre                  │
│          Description sur 2 lignes│
│                                 │
│ [● Disponible]                  │
│                                 │
│ ┌─────────────────────────────┐ │
│ │           Ouvrir          › │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

Le bouton `Ouvrir` doit être sobre :

- fond blanc ;
- bordure grise claire ;
- texte bleu nuit ;
- flèche fine à droite ;
- pas de remplissage bleu plein.

### 8.4 Carte Planning

Texte visible :

```txt
Planning
Consultez le planning de la société selon vos droits.
Disponible
Ouvrir
```

Rendu attendu :

- icône calendrier ;
- bloc icône bleu clair ;
- badge `Disponible` vert ;
- bouton `Ouvrir` bas.

### 8.5 Carte Utilisateurs / RH

Texte visible :

```txt
Utilisateurs / RH
Gérez les équipes, rôles et affectations.
Disponible
Ouvrir
```

Rendu attendu :

- icône groupe utilisateurs ;
- bloc icône turquoise très clair ;
- badge `Disponible` vert ;
- bouton `Ouvrir` bas.

### 8.6 Carte Véhicules

Texte visible :

```txt
Véhicules
Consultez et gérez la flotte ambulancière.
Disponible
Ouvrir
```

Rendu attendu :

- icône ambulance ;
- bloc icône bleu clair ;
- badge `Disponible` vert ;
- bouton `Ouvrir` bas.

### 8.7 Carte Templates

Texte visible :

```txt
Templates
Gérez les modèles de shifts disponibles.
Disponible
Ouvrir
```

Rendu attendu :

- icône document ;
- bloc icône orange clair ;
- badge `Disponible` vert ;
- bouton `Ouvrir` bas.

### 8.8 Carte Société

Texte visible :

```txt
Société
Consultez le profil et les règles de la société courante.
Disponible
Ouvrir
```

Rendu attendu :

- icône bâtiment ;
- bloc icône bleu/gris clair ;
- badge `Disponible` vert ;
- bouton `Ouvrir` bas.

### 8.9 Carte Dépôts

Texte visible :

```txt
Dépôts
Gérez les dépôts et leurs informations opérationnelles.
Disponible
Ouvrir
```

Rendu attendu :

- icône bâtiment/dépôt ;
- bloc icône turquoise clair ;
- badge `Disponible` vert ;
- bouton `Ouvrir` bas.

### 8.10 Carte Onboarding

Texte visible :

```txt
Onboarding
Parcours et guides pour les nouveaux collaborateurs.
Selon permissions
Ouvrir
```

Rendu attendu :

- icône chapeau / graduation ;
- bloc icône violet clair ;
- badge `Selon permissions` orange ;
- bouton `Ouvrir` bas.

Important :

La maquette affiche `Selon permissions` uniquement pour Onboarding.

Ne pas généraliser ce statut à toutes les cartes.

### 8.11 Carte Audit

Texte visible :

```txt
Audit
Consultez les journaux d’audit et exports des droits.
Disponible
Ouvrir
```

Rendu attendu :

- icône bouclier ;
- bloc icône gris clair ;
- badge `Disponible` vert ;
- bouton `Ouvrir` bas.

---

## 9. Badges de statut

### 9.1 Badge Disponible

Rendu attendu :

- fond vert très clair ;
- texte vert ;
- pastille verte pleine à gauche ;
- arrondi pill ;
- petite taille ;
- padding horizontal modéré ;
- aligné sous la description.

Texte exact :

```txt
Disponible
```

### 9.2 Badge Selon permissions

Rendu attendu :

- fond orange très clair ;
- texte orange ;
- pastille orange pleine à gauche ;
- arrondi pill ;
- petite taille ;
- utilisé pour `Onboarding` dans la maquette.

Texte exact :

```txt
Selon permissions
```

### 9.3 Badges non visibles à éviter

La maquette ne montre pas :

```txt
Profil : Administrateur
Accès : normal
Modules visibles : 8
Société rattachée
Admin dashboard
Terrain dashboard
```

Ces libellés peuvent exister fonctionnellement, mais ils ne doivent pas être visibles sur la page cible.

---

## 10. Style visuel détaillé

### 10.1 Fond général

Le fond principal est un blanc très légèrement bleuté.

Il ne doit pas être gris foncé, bleu saturé ou blanc pur sans nuance.

Approximation :

```txt
background : #F8FAFD / #F9FBFF
```

### 10.2 Cartes

Toutes les cartes Dashboard partagent le même langage :

- fond blanc ;
- bordure fine gris bleuté ;
- arrondi 14-16 px ;
- ombre très légère ;
- aucune ombre lourde ;
- aucune bordure noire ;
- aucune couleur de fond saturée hors icônes et badges.

### 10.3 Typographie

Hiérarchie attendue :

```txt
Titre page : très grand, très gras, bleu nuit
Sous-titre : moyen, gris bleu
Titre carte : gras, bleu nuit
Description : petit/moyen, gris bleu
Valeur KPI : grande, grasse, colorée
Bouton Ouvrir : moyen, bleu nuit, centré
```

### 10.4 Couleurs principales

Couleurs visuelles approximatives :

| Élément | Couleur cible approximative |
|---|---|
| Texte fort | bleu nuit `#0B1736` |
| Texte secondaire | gris bleu `#64708A` |
| Bordures | gris bleuté `#E1E7F0` |
| Fond page | blanc bleuté `#F8FAFD` |
| Bleu primaire | `#2563EB` |
| Turquoise | `#14B8A6` |
| Violet | `#6D4BDB` |
| Orange | `#F28C18` |
| Vert statut | `#20B26B` |

Les valeurs exactes peuvent être adaptées aux tokens existants si le rendu final reste fidèle à la maquette.

### 10.5 Icônes

Les icônes doivent être :

- simples ;
- lisibles ;
- cohérentes entre elles ;
- centrées dans des blocs carrés arrondis ;
- taille environ 22-26 px dans les modules ;
- taille environ 26-30 px dans les KPI ;
- trait semi-épais ;
- pas trop fines ;
- pas trop décoratives.

`lucide-react` est acceptable.

### 10.6 Espacements

La page doit respirer.

Espacements cibles :

```txt
marge gauche contenu : environ 36-38 px après sidebar
marge droite contenu : environ 36-38 px
gap titre -> sous-titre : 6-8 px
gap sous-titre -> carte profil : 28-32 px
gap carte profil -> KPI : 22-24 px
gap KPI -> modules : 24-26 px
gap modules vertical : 22-24 px
```

### 10.7 Densité

La densité doit être professionnelle :

- pas trop compacte ;
- pas trop aérée ;
- pas de cartes géantes ;
- pas de texte trop long ;
- pas de double hiérarchie ;
- pas de section inutile.

Le Dashboard doit tenir dans la hauteur desktop visible de la maquette sans scrolling majeur.

---

## 11. Écarts probables du code actuel à corriger visuellement

Cette section sert à guider une future production Codex. Elle ne constitue pas un contrôle définitif du code.

### 11.1 En-tête de section `Modules d’accès`

Le code actuel peut afficher une section intermédiaire de type :

```txt
Modules d’accès
Les cartes ci-dessous respectent les permissions de la session active.
```

Ce bloc n’est pas visible dans la maquette.

Action visuelle attendue :

```txt
Supprimer ou masquer ce header intermédiaire pour que les KPI arrivent directement après la carte profil.
```

### 11.2 Carte profil trop fonctionnelle

Le code actuel peut afficher :

```txt
Profil : ...
Accès : ...
Modules visibles : ...
```

Ces badges ne sont pas visibles dans la maquette.

Action visuelle attendue :

```txt
Remplacer par la structure visible : email | [Rôle] Administrateur | [Société] SC Ambulances.
```

### 11.3 Avatar à initiales

Le code actuel peut afficher les initiales de l’utilisateur.

La maquette affiche un avatar générique.

Action visuelle attendue :

```txt
Utiliser un avatar générique avec pictogramme utilisateur + pastille verte.
```

### 11.4 Descriptions de cartes trop longues ou différentes

Le code actuel peut contenir des descriptions plus techniques :

```txt
Créer, modifier, archiver et administrer les comptes de la société.
Consulter les événements de sécurité, support et modifications récentes.
Parcours manuel guidé et imports initiaux simples pour démarrer.
```

La maquette est plus concise.

Action visuelle attendue :

```txt
Utiliser les libellés courts visibles dans la maquette, sauf contrainte fonctionnelle strictement nécessaire.
```

### 11.5 Ordre des cartes

L’ordre cible est :

```txt
Planning
Utilisateurs / RH
Véhicules
Templates
Société
Dépôts
Onboarding
Audit
```

Action visuelle attendue :

```txt
Stabiliser cet ordre pour l’état admin reproduit.
```

### 11.6 Couleur de Dépôts KPI

Dans la maquette, le KPI `Dépôts actifs` est violet.

Si le code utilise un ton neutre ou slate, le rendu doit être ajusté visuellement.

### 11.7 Densité des cartes

Si les cartes actuelles sont plus hautes, plus compactes ou organisées en auto-fit non stable, la maquette doit primer.

Action visuelle attendue :

```txt
Sur desktop large, forcer une grille 4 colonnes cohérente avec la maquette.
```

### 11.8 État sans société ou sans module

Les états d’erreur ou états vides peuvent rester fonctionnels, mais ils ne sont pas l’état cible de la maquette.

Action visuelle attendue :

```txt
Ne pas laisser ces états perturber la reproduction visuelle de l’état admin connecté.
```

---

## 12. Règles de masquage / suppression visuelle autorisées

Pour atteindre la fidélité 99 %, Codex peut masquer, déplacer, simplifier ou supprimer visuellement :

- les headers de section non visibles ;
- les badges fonctionnels non visibles ;
- les descriptions trop longues ;
- les messages d’aide non visibles ;
- les compteurs secondaires non visibles ;
- les états techniques ;
- les textes de permission explicatifs ;
- les éléments de debug ;
- les alertes non présentes dans l’état nominal de la maquette ;
- les variations de dashboard terrain si elles empêchent la reproduction de l’état admin maquette.

Codex ne doit pas supprimer :

- la route `/dashboard` ;
- la redirection login si session absente ;
- les liens principaux vers les modules ;
- la logique minimale de session ;
- le Shell global ;
- la capacité à naviguer vers les pages métier.

---

## 13. État cible prioritaire

La maquette représente un état connecté admin/gérant avec accès aux modules.

État cible de contrôle :

```txt
Utilisateur connecté : Nathan Archenoul / Nathan A.
Rôle : Administrateur
Société : SC Ambulances
Modules visibles : 8 cartes
KPI visibles : 4 cartes
```

Important :

Ces valeurs servent de référence visuelle.

En production réelle, les valeurs peuvent être dynamiques.

Mais le rendu doit rester identique dans l’état admin.

---

## 14. Responsive

La maquette officielle fournie est desktop.

Pour les écrans plus petits, Codex peut appliquer une adaptation simple :

- sidebar adaptée selon le Shell existant ;
- topbar non cassée ;
- KPI en 2 colonnes puis 1 colonne ;
- modules en 2 colonnes puis 1 colonne ;
- carte profil empilée proprement ;
- pas de débordement horizontal ;
- pas de texte coupé de manière illisible.

Mais le contrôle principal de ce document reste :

```txt
Desktop large fidèle à Dashboard_V1.png.
```

---

## 15. Accessibilité visuelle minimale

Même si la priorité est visuelle, la page doit conserver :

- contrastes lisibles ;
- textes non pixellisés ;
- boutons réellement visibles ;
- focus navigateur acceptable ;
- navigation clavier non volontairement cassée ;
- liens modules toujours utilisables ;
- hiérarchie H1/H2 raisonnable.

Aucune refonte accessibilité avancée n’est demandée dans cette phase.

---

## 16. DoD visuelle Dashboard

La page Dashboard est considérée conforme visuellement si :

```txt
[ ] Le Shell global correspond à la référence commune validée.
[ ] L’item sidebar actif est bien `Tableau de bord`.
[ ] Le titre `Tableau de bord` est placé, dimensionné et stylé comme la maquette.
[ ] Le sous-titre correspond au texte visible de la maquette.
[ ] La carte profil est une grande carte blanche horizontale.
[ ] L’avatar est générique, circulaire, avec pastille verte.
[ ] La ligne profil affiche email | rôle | société dans l’esprit de la maquette.
[ ] Les badges `Profil`, `Accès`, `Modules visibles` ne sont pas visibles.
[ ] Les quatre KPI sont alignés en une ligne sur desktop large.
[ ] Les KPI respectent les couleurs bleu, turquoise, violet, orange.
[ ] Les huit cartes modules sont organisées en deux lignes de quatre.
[ ] L’ordre des modules respecte la maquette.
[ ] Les cartes modules ont icône, titre, description, badge, bouton `Ouvrir`.
[ ] Le badge `Disponible` est vert avec pastille.
[ ] Le badge `Selon permissions` est orange et réservé à Onboarding dans l’état maquette.
[ ] Aucun header `Modules d’accès` ou équivalent ne casse la hiérarchie visuelle.
[ ] Aucun message technique ou documentaire n’apparaît dans l’interface.
[ ] La page reste sobre, claire, respirante et professionnelle.
[ ] La fidélité globale à `Dashboard_V1.png` est estimée à environ 99 %.
```

---

## 17. Checklist de contrôle manuel Nathan

Après production Codex, Nathan doit vérifier visuellement :

### 17.1 Vue globale

```txt
[ ] La page ressemble immédiatement à Dashboard_V1.png.
[ ] Le contenu tient dans la même logique de hauteur que la maquette.
[ ] Le rendu n’a pas l’air d’un ancien dashboard technique.
[ ] Aucune zone ne paraît ajoutée sans raison visible.
```

### 17.2 Shell

```txt
[ ] La sidebar est identique à l’esprit des maquettes.
[ ] L’item `Tableau de bord` est actif.
[ ] La topbar est alignée avec la maquette.
[ ] Aucun double header n’est visible.
```

### 17.3 Header Dashboard

```txt
[ ] Le titre est grand, bleu nuit, à gauche.
[ ] Le sous-titre est gris bleu et sobre.
[ ] Aucun bouton ou filtre inutile n’est visible à droite du titre.
```

### 17.4 Carte profil

```txt
[ ] La carte profil est blanche, large et horizontale.
[ ] L’avatar ressemble à celui de la maquette.
[ ] La pastille verte est visible.
[ ] L’email, le rôle et la société sont alignés proprement.
[ ] Les badges fonctionnels parasites ont disparu.
```

### 17.5 KPI

```txt
[ ] Les 4 KPI sont sur une seule ligne en desktop large.
[ ] Les icônes sont bien colorées.
[ ] Les valeurs numériques sont grandes.
[ ] Les hints `sur X ...` sont visibles sous les valeurs.
[ ] Le KPI Dépôts est violet.
```

### 17.6 Modules

```txt
[ ] Les 8 modules sont visibles en deux lignes de quatre.
[ ] L’ordre des cartes est correct.
[ ] Les descriptions ne sont pas trop longues.
[ ] Les badges de disponibilité sont conformes.
[ ] Les boutons `Ouvrir` sont sobres, en bas de carte, avec flèche.
```

### 17.7 Écarts bloquants visuels

```txt
[ ] Aucun texte `INFORMATION NON FOURNIE — À CONFIRMER` n’est visible.
[ ] Aucun JSON, log, debug ou détail technique n’est visible.
[ ] Aucune section non présente sur la maquette ne prend de place importante.
[ ] La page ne ressemble pas à une page analytique ou métier avancée.
```

---

## 18. Prompt court futur pour Codex

Prompt de production visuelle recommandé :

```txt
Tu es Codex sur le projet Ambulance Manager.

Objectif : réaligner uniquement le visuel de la page Dashboard sur la maquette officielle `Dashboard_V1.png` à environ 99 %.

Références à lire obligatoirement :
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_DASHBOARD.md`
- image officielle : `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/2-Dashboard/Dashboard_V1.png`

Fichiers probables :
- `app/dashboard/page.tsx`
- `app/globals.css`
- `app/app-shell.tsx` uniquement si nécessaire
- composants UI partagés uniquement si nécessaire

Règles :
- priorité visuelle 99 % à la maquette ;
- ne pas refondre NextAuth, RBAC, Prisma, API, permissions ou logique métier ;
- le fonctionnel ne bloque pas cette phase ;
- tout élément fonctionnel non visible dans la maquette peut être masqué, simplifié ou supprimé visuellement ;
- ne pas utiliser le dossier ICONE / ICONES ;
- ne jamais afficher `INFORMATION NON FOURNIE — À CONFIRMER` dans l’UI ;
- ne pas générer de captures ;
- fournir une checklist de vérification visuelle manuelle.

Livrable attendu : patch visuel ciblé Dashboard / CSS, avec `npm run lint`, `npm run build`, preuve `git apply --check` et patch UTF-8 sans BOM.
```

---

## 19. Résumé opérationnel

```txt
Page : Dashboard
Route : /dashboard
Image officielle : Dashboard_V1.png
Shell : oui, hérite de REFERENCE_UI_UX_SHELL_GLOBAL.md
Priorité : visuel 99 %
Fonctionnel : non bloquant
État cible : dashboard admin connecté
Structure : titre + sous-titre + profil + 4 KPI + 8 modules
Éléments à éviter : header Modules d’accès, badges fonctionnels parasites, debug, texte technique
Prochaine production : correction visuelle uniquement
```
