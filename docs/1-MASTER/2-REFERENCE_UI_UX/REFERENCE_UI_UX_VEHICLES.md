# Ambulance Manager — RÉFÉRENCE UI/UX VÉHICULES

Version : V1.0.0 — SPÉCIFICATION VISUELLE MAQUETTE 99 %  
Date : 13/05/2026  
Chantier concerné : `Documentation transversale UI/UX — hors bloc applicatif`  
Document cible à déposer dans le repo : `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_VEHICLES.md`

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
/vehicles
```

### 2.2 Fichiers code probables

```txt
app/vehicles/page.tsx
app/vehicles/vehicles-client.tsx
app/vehicles/add-vehicle-form.tsx
app/a24-vehicles-templates.css
app/app-shell.tsx
app/globals.css
app/ui/*
```

### 2.3 Maquette officielle

Chemin logique attendu :

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTES_FONDATRICES_IMAGES_V1.0/4-Véhicules/Véhicules_V1.2.png
```

Le chemin doit rester en français avec accents. Codex ne doit pas utiliser de variante non accentuée pour `Véhicules`.

## 3. Nature visuelle de la page

La page `Véhicules` est une page de gestion de flotte avec une densité métier forte mais lisible.

La maquette montre :

- un header simple ;
- une première barre de recherche/filtres ;
- une ligne de KPI ;
- un tableau très complet ;
- un panneau droit détaillé avec onglets.

La page doit ressembler à une console métier propre, pas à une suite de formulaires.

## 4. Structure visible à reproduire

### 4.1 Header

Éléments :

- titre `Véhicules` ;
- sous-titre `Gérez votre flotte de véhicules et leurs équipements` ;
- bouton primaire `Ajouter un véhicule`.

### 4.2 Barre de recherche et filtres

Éléments visibles :

- recherche `Rechercher un véhicule...` ;
- filtre `Statut` ;
- filtre `Type` ;
- filtre `Dépôt` ;
- bouton `Filtres avancés`.

Règles :

- filtres dans des cards/champs blancs ;
- icônes discrètes ;
- alignement horizontal ;
- pas de panneau de filtres avancés ouvert par défaut.

### 4.3 KPI de flotte

Cinq cartes :

| KPI | Exemple | Couleur |
|---|---|---|
| Total véhicules | 27 | bleu |
| En service | 18 | vert |
| En maintenance | 2 | orange |
| Hors service | 1 | rouge |
| Conformité à surveiller | 6 | jaune/orange |

Règles :

- même hauteur ;
- icône grande à gauche ;
- chiffre dominant ;
- libellé sous le chiffre ;
- pas de graphiques.

### 4.4 Tableau véhicules

Colonnes visibles :

```txt
[checkbox]
Véhicule
Immatriculation
Type
Dépôt
Statut
Assurance
Contrôle technique
Carte grise
Agrément sanitaire
Conformité
Dernière modif.
Actions
```

Rendu :

- table dense mais claire ;
- lignes avec petit pictogramme véhicule ;
- nom + modèle sur deux lignes ;
- badges type : Ambulance / VSL / Taxi ;
- badges statut : En service / Disponible / En maintenance / Hors service ;
- dates en rouge si critique ;
- icône check ou croix pour contrôle technique ;
- badge conformité : Conforme / Bientôt expiré / Expiré ;
- menu actions `...`.

### 4.5 Panneau droit véhicule

Le panneau droit est central pour la fidélité maquette.

Header :

- titre `Ambulance 01` ;
- immatriculation `FT-123-AB` ;
- badge `En service` ;
- icône fermer `X`.

Onglets :

```txt
Détails
Équipements
Maintenance
Docs
```

Onglet actif visible : `Détails`.

Contenu visible :

1. Carte détail général avec image du véhicule à gauche, infos à droite :
   - Type ;
   - Marque / Modèle ;
   - Année ;
   - Kilométrage.

2. Carte `Affectation` :
   - dépôt ;
   - équipe ;
   - conducteur principal avec avatar.

3. Carte `Contrôles & maintenance` :
   - dernier contrôle technique ;
   - prochain contrôle technique ;
   - dernière révision ;
   - prochaine révision ;
   - badges OK / J-xx.

4. Carte `Informations complémentaires` :
   - carburant ;
   - capacité ;
   - assurance ;
   - fin d'assurance.

Actions bas de panneau :

- `Modifier` ;
- `Voir l'historique`.

## 5. Proportions et rythme visuel

| Zone | Cible |
|---|---|
| Zone principale | environ 70 % de la largeur disponible |
| Panneau droit | environ 360–400 px |
| KPI | 5 cartes sur une ligne |
| Tableau | compact, lignes régulières |
| Drawer | haut aligné sous topbar, hauteur quasi complète |
| Image véhicule | rectangle arrondi, ratio paysage |

Le tableau peut être horizontalement dense, mais il doit rester lisible.

## 6. Éléments à masquer, simplifier ou reporter si nécessaire

Autorisé :

- formulaire d'ajout véhicule visible par défaut ;
- champs techniques absents de la maquette ;
- détails d'équipements si l'onglet actif n'est pas `Équipements` ;
- maintenance avancée si l'onglet actif est `Détails` ;
- actions destructrices trop visibles ;
- erreurs techniques ;
- panneaux modaux non visibles.

La maquette montre un état de consultation/détail, pas un écran de création ouvert.

## 7. Interdictions

Ne pas :

- remplacer le tableau par des cards véhicules ;
- ouvrir le formulaire `Ajouter un véhicule` par défaut ;
- transformer le panneau droit en modal ;
- supprimer les KPI ;
- supprimer les onglets du panneau ;
- changer la logique API véhicule ;
- ajouter une gestion de maintenance avancée non visible.

## 8. DoD visuelle 99 %

La page est conforme si :

- header, filtres, KPI, tableau et panneau droit sont dans le même ordre que la maquette ;
- les 5 KPI sont alignés ;
- le tableau a les colonnes de conformité visibles ;
- une ligne sélectionnée ou principale permet d'alimenter le panneau droit ;
- le panneau droit affiche `Détails / Équipements / Maintenance / Docs` ;
- l'onglet `Détails` reproduit les 4 cartes internes ;
- les badges sont sobres et lisibles ;
- les dates critiques sont visuellement différenciées ;
- aucun formulaire d'ajout ne surcharge la vue par défaut.

## 9. Checklist de contrôle manuel Nathan

```txt
[ ] Le titre Véhicules et le bouton Ajouter un véhicule sont conformes.
[ ] La barre de filtres contient Recherche, Statut, Type, Dépôt, Filtres avancés.
[ ] Les 5 KPI sont visibles.
[ ] Le tableau contient les colonnes assurance, contrôle technique, carte grise, agrément, conformité.
[ ] Les badges de statut et conformité sont lisibles.
[ ] Le panneau droit affiche Ambulance 01 ou le véhicule sélectionné.
[ ] Les onglets Détails / Équipements / Maintenance / Docs sont présents.
[ ] L'image véhicule est visible dans le panneau.
[ ] Les sections Affectation, Contrôles & maintenance et Informations complémentaires sont visibles.
[ ] Les boutons Modifier et Voir l'historique sont en bas du panneau.
[ ] Aucun formulaire d'ajout n'est ouvert par défaut.
```

## 10. Écarts connus à contrôler dans le code

- le composant `add-vehicle-form.tsx` peut afficher une création trop visible ;
- le code réel peut manquer d'image véhicule ; une image placeholder sobre est acceptable pour la fidélité visuelle ;
- les colonnes du tableau peuvent différer du modèle maquette ;
- certains statuts ou champs documentaires peuvent être incomplets ;
- le panneau droit peut nécessiter un état de sélection visuel même si la sélection fonctionnelle est simplifiée.

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
- ce document REFERENCE_UI_UX_VEHICLES.md

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
