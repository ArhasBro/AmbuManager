# Ambulance Manager — RÉFÉRENCE UI/UX DÉPÔTS / BASES

Version : V1.0.0 — SPÉCIFICATION VISUELLE MAQUETTE 99 %  
Date : 13/05/2026  
Chantier concerné : `Documentation transversale UI/UX — hors bloc applicatif`  
Document cible à déposer dans le repo : `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_DEPOTS_BASES.md`

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
/depots
```

### 2.2 Fichiers code probables

```txt
app/depots/page.tsx
app/depots/depots-client.tsx
app/app-shell.tsx
app/globals.css
app/ui/*
```

### 2.3 Maquette officielle

Chemin logique attendu :

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_DA/A21-UX-04_MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0/3-Dépôts-bases/Dépôts-bases_V1.0.png
```

Le chemin doit rester en français avec accents. Codex ne doit pas utiliser de variante non accentuée.

## 3. Nature visuelle de la page

La page `Dépôts / bases` est une page de référentiel métier.

La maquette montre une structure en deux grandes zones :

- zone principale à gauche : header, KPI, filtres, tableau ;
- panneau droit fixe : détail du dépôt sélectionné.

Organisation macro :

```txt
Header + créer un dépôt
KPI de synthèse
Filtres
Tableau des dépôts
Panneau droit de détail + danger zone + actions
```

## 4. Structure visible à reproduire

### 4.1 Header

Éléments :

- titre `Dépôts / bases` ;
- sous-titre `Gérez les bases de rattachement de vos équipes et véhicules.` ;
- bouton primaire `Créer un dépôt` avec icône `+`.

Le bouton est aligné à droite, dans l'axe du header.

### 4.2 KPI de synthèse

Quatre cartes horizontales :

| KPI | Exemple visible | Couleur dominante |
|---|---|---|
| Dépôts actifs | `6 sur 8 dépôts` | violet |
| Archivés | `2 sur 8 dépôts` | orange |
| Véhicules rattachés | `58 au total` | turquoise |
| Utilisateurs rattachés | `72 au total` | bleu |

Règles :

- cartes blanches ;
- icône dans carré/rond coloré ;
- chiffre grand ;
- libellé sobre ;
- même hauteur pour les 4 cartes.

### 4.3 Barre de filtres

Éléments visibles :

- recherche `Rechercher un dépôt...` ;
- filtre `Statut` ;
- tri `Nom A → Z` ;
- bouton `Filtrer`.

Le bouton `Filtrer` est conservé visuellement même s'il n'a pas d'action fonctionnelle immédiate, car il est présent dans la maquette et sert de repère visuel.

### 4.4 Tableau des dépôts

Colonnes visibles :

```txt
[checkbox]
Nom
Adresse
Statut
Véhicules
Utilisateurs
Dernière modif.
Actions
```

Rendu attendu :

- tableau compact ;
- lignes hautes mais sobres ;
- première ligne sélectionnée avec fond bleu très pâle et bord gauche bleu ;
- checkbox sélectionnée ;
- badge `Actif` vert ;
- badge `Archivé` orange ;
- avatar initiales dans colonne actions ou dernière modification ;
- menu `...` à droite.

### 4.5 Pagination / bas de tableau

Éléments visibles :

- `1 - 8 sur 8 dépôts` ;
- pagination compacte ;
- `Lignes par page` ;
- select `10`.

### 4.6 Panneau droit détail

Le panneau droit est fixe, blanc, arrondi, bordé, occupant toute la hauteur utile.

Header du panneau :

- titre `Dépôt Nord` ;
- icône fermer `X` ;
- badge `Actif` aligné à droite sous ou près du titre.

Cartes internes :

1. `Identité du dépôt`
   - nom ;
   - statut.

2. `Adresse`
   - adresse multi-ligne ;
   - pays.

3. `Rattachements`
   - véhicules rattachés ;
   - utilisateurs rattachés ;
   - icônes colorées.

4. `Notes`
   - encart bleu pâle avec icône information ;
   - texte court.

5. `Zone danger`
   - fond rouge très pâle ;
   - icône warning ;
   - explication courte ;
   - bouton rouge contour `Archiver le dépôt`.

Actions bas de panneau :

- bouton secondaire `Modifier` ;
- bouton primaire `Enregistrer`.

## 5. Proportions et rythme visuel

| Zone | Cible |
|---|---|
| Zone principale | environ 70–75 % de la largeur après sidebar |
| Panneau droit | environ 330–370 px |
| KPI | 4 cartes sur une ligne |
| Filtres | une ligne unique |
| Tableau | occupe la majeure partie de la hauteur |
| Panneau droit | aligné haut/bas avec la zone de contenu |

Le panneau droit ne doit pas devenir un modal centré. Il doit rester un drawer/panneau latéral intégré.

## 6. Éléments à masquer, simplifier ou reporter si nécessaire

Autorisé pour fidélité maquette :

- formulaires de création inline trop longs ;
- champs d'édition avancés non visibles ;
- messages techniques ;
- confirmations multiples ;
- détails fonctionnels de rattachement trop longs ;
- actions de suppression physique ;
- tableaux secondaires ;
- debug de counts.

Le fonctionnel peut rester disponible plus tard, mais l'écran visible doit prioriser la structure de la maquette.

## 7. Interdictions

Ne pas :

- transformer le panneau droit en page d'édition complète ;
- ajouter des onglets dans le panneau ;
- supprimer visuellement le bouton `Filtrer` ;
- afficher une zone de suppression physique ;
- ajouter une carte non visible au-dessus du tableau ;
- modifier API, Prisma ou logique de rattachement.

## 8. DoD visuelle 99 %

La page est conforme si :

- le Shell global est respecté ;
- le header et le bouton `Créer un dépôt` correspondent ;
- les 4 KPI sont visibles dans le bon ordre ;
- la barre de filtres contient recherche, statut, tri et bouton filtrer ;
- le tableau contient les colonnes visibles de la maquette ;
- la première ligne sélectionnée est mise en valeur ;
- le panneau droit affiche le détail du dépôt sélectionné ;
- la zone danger est présente, rouge pâle, non agressive ;
- les actions bas de panneau sont alignées ;
- aucun élément fonctionnel parasite ne casse la composition.

## 9. Checklist de contrôle manuel Nathan

```txt
[ ] Le titre Dépôts / bases est conforme.
[ ] Le bouton Créer un dépôt est en haut à droite.
[ ] Les 4 cartes KPI sont alignées.
[ ] Le bouton Filtrer est visible.
[ ] Le tableau a une première ligne sélectionnée.
[ ] Les badges Actif / Archivé sont sobres.
[ ] Le panneau droit affiche Dépôt Nord ou le dépôt sélectionné.
[ ] Les sections Identité, Adresse, Rattachements, Notes et Zone danger sont visibles.
[ ] La zone danger est rouge pâle et non disproportionnée.
[ ] Les boutons Modifier / Enregistrer sont en bas du panneau.
[ ] Aucun formulaire avancé ne surcharge l'écran.
```

## 10. Écarts connus à contrôler dans le code

- le formulaire de création peut être présent inline alors que la maquette montre surtout un bouton ;
- les formulaires d'édition peuvent être trop détaillés ;
- les filtres peuvent être fonctionnellement incomplets mais doivent être visuellement présents ;
- le bouton `Filtrer` doit rester visible ;
- la zone danger doit être visuelle, pas une suppression physique non contrôlée.

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
- ce document REFERENCE_UI_UX_DEPOTS_BASES.md

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
