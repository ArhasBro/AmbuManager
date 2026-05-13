# Ambulance Manager — RÉFÉRENCE UI/UX TEMPLATES

Version : V1.0.0 — SPÉCIFICATION VISUELLE MAQUETTE 99 %  
Date : 13/05/2026  
Chantier concerné : `Documentation transversale UI/UX — hors bloc applicatif`  
Document cible à déposer dans le repo : `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_TEMPLATES.md`

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
/templates
```

### 2.2 Fichiers code probables

```txt
app/templates/page.tsx
app/templates/templates-client.tsx
app/a24-vehicles-templates.css
app/app-shell.tsx
app/globals.css
app/ui/*
```

### 2.3 Maquette officielle

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_DA/A21-UX-04_MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0/1-Templates/Templates_V1.1.png
```

## 3. Nature visuelle de la page

La page `Templates de garde` est un référentiel de modèles de shifts.

La maquette montre une page de gestion structurée :

- header ;
- KPI ;
- filtres et actions secondaires ;
- tableau central ;
- panneau droit détail template avec onglets ;
- actions bas de panneau.

Le rendu doit être proche de la page Véhicules en densité et structure, mais avec un contenu métier template.

## 4. Structure visible à reproduire

### 4.1 Header

Éléments :

- titre `Templates de garde` ;
- sous-titre `Gérez vos modèles de garde et de shift pour organiser vos plannings.` ;
- bouton primaire `Nouveau template`.

### 4.2 KPI

Cinq cartes :

| KPI | Exemple visible |
|---|---|
| Total templates | 24 |
| Actifs | 18 |
| Désactivés | 3 |
| Archivés | 3 |
| Types de garde | 4 |

Règles :

- carte `Total` bleue ;
- carte `Actifs` verte ;
- carte `Désactivés` orange ;
- carte `Archivés` violette ;
- carte `Types de garde` turquoise.

### 4.3 Filtres et actions

Éléments visibles :

- recherche `Rechercher un template...` ;
- filtre `Type véhicule` ;
- filtre `Traverse minuit` ;
- bouton `Filtres avancés` ;
- bouton secondaire `Export` ;
- bouton secondaire `Vue`.

Les boutons `Export` et `Vue` doivent être discrets, pas des CTA principaux.

### 4.4 Tableau templates

Colonnes visibles :

```txt
[checkbox]
Nom du template
Type véhicule
Horaire
Traverse minuit
Nb personnes
Rôle slot 1
Rôles autorisés
Dernière modif.
Utilisé
Actions
```

Rendu :

- première ligne sélectionnée, fond bleu très pâle, bord gauche bleu ;
- nom du template en gras + code secondaire ;
- badges Type véhicule ;
- badge `Non` vert et `Oui` rouge/rose pour traverse minuit ;
- horaire au format `07:00 - 19:00` ;
- dernière modification sur deux lignes : date/heure + acteur ;
- utilisation en nombre de fois ;
- menu `...`.

### 4.5 Panneau droit template

Header :

- titre `Garde Ambulance Jour` ;
- code `GAJ-001` ;
- badge `Actif` ;
- icône fermer.

Onglets :

```txt
Détails
Équipe
Horaires
Historique
```

Onglet actif : `Détails`.

Cartes internes :

1. `Informations générales`
   - Nom ;
   - Code ;
   - Type véhicule ;
   - Couleur ;
   - Actif.

2. `Horaires`
   - Heure début ;
   - Heure fin ;
   - Traverse minuit.

3. `Équipe requise`
   - Nombre de personnes ;
   - Rôle obligatoire ;
   - Rôles autorisés.

4. `Utilisation`
   - Nombre d'utilisations ;
   - Dernière utilisation ;
   - Utilisé dans.

Actions bas :

- `Modifier` ;
- `Dupliquer` ;
- `Archiver` rouge.

## 5. Proportions et rythme visuel

| Zone | Cible |
|---|---|
| KPI | 5 cartes sur une ligne |
| Tableau | environ 65–70 % de la largeur après sidebar |
| Panneau droit | environ 380–420 px |
| Cartes internes panneau | empilées verticalement |
| Actions bas | 3 boutons alignés, `Archiver` rouge |

## 6. Éléments à masquer, simplifier ou reporter

Autorisé :

- formulaire complet de création/édition si ouvert par défaut ;
- options avancées de template non visibles ;
- couleurs libres complexes ;
- validations métier détaillées ;
- historique réel si onglet non actif ;
- détails d'équipe avancés non présents dans la carte `Équipe requise`.

La maquette visible est un état liste + détail, pas un état édition avancée.

## 7. Interdictions

Ne pas :

- remplacer la liste par des cards ;
- ouvrir un formulaire de création par défaut ;
- supprimer les KPI ;
- supprimer les onglets du panneau ;
- mélanger édition et détail dans le panneau actif ;
- modifier le modèle `ShiftTemplate` ;
- modifier API, Prisma ou logique planning.

## 8. DoD visuelle 99 %

La page est conforme si :

- le header et le CTA correspondent ;
- les 5 KPI sont visibles ;
- les filtres et boutons secondaires sont dans le bon ordre ;
- le tableau contient les colonnes maquette ;
- la ligne sélectionnée est visuellement claire ;
- le panneau droit affiche le template sélectionné ;
- les onglets `Détails / Équipe / Horaires / Historique` existent ;
- les 4 cartes internes du détail sont visibles ;
- les actions `Modifier / Dupliquer / Archiver` sont en bas ;
- aucun formulaire avancé ne surcharge l'écran.

## 9. Checklist de contrôle manuel Nathan

```txt
[ ] Le titre Templates de garde est conforme.
[ ] Le bouton Nouveau template est bleu et placé à droite.
[ ] Les 5 KPI sont alignés.
[ ] Les filtres Type véhicule et Traverse minuit sont visibles.
[ ] Les boutons Export et Vue sont secondaires.
[ ] La ligne Ambulance jour est sélectionnée visuellement.
[ ] Le panneau droit affiche Garde Ambulance Jour.
[ ] Les onglets Détails / Équipe / Horaires / Historique sont présents.
[ ] Les cartes Informations générales, Horaires, Équipe requise et Utilisation sont visibles.
[ ] Le bouton Archiver est rouge en bas à droite du panneau.
```

## 10. Écarts connus à contrôler dans le code

- `templates-client.tsx` peut contenir un état édition/création trop visible ;
- le modèle réel peut avoir des catégories différentes ;
- certains champs de composition d'équipe peuvent être plus fonctionnels que visuels ;
- il faut garder la page lisible même avec des données réelles plus longues.

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
- ce document REFERENCE_UI_UX_TEMPLATES.md

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
