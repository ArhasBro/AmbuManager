# Ambulance Manager — RÉFÉRENCE UI/UX AUDIT

Version : V1.0.0 — SPÉCIFICATION VISUELLE MAQUETTE 99 %  
Date : 13/05/2026  
Chantier concerné : `Documentation transversale UI/UX — hors bloc applicatif`  
Document cible à déposer dans le repo : `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_AUDIT.md`

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
/audit
```

### 2.2 Fichiers code probables

```txt
app/audit/page.tsx
app/audit/audit-client.tsx
app/a24-complementary-pages.css
app/app-shell.tsx
app/globals.css
app/ui/*
```

### 2.3 Maquette officielle

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0/5-Audit/Audit_V1.0.png
```

## 3. Nature visuelle de la page

La page `Journal d'audit` est une page de traçabilité métier.

La maquette montre une page dense, mais très lisible :

- KPI d'audit ;
- filtres détaillés ;
- tableau d'événements ;
- panneau droit de détail ;
- payload JSON affiché dans un encart technique propre.

Point critique : la page ne doit pas afficher la formule documentaire `INFORMATION NON FOURNIE — À CONFIRMER` dans l'interface finale.

## 4. Structure visible à reproduire

### 4.1 Header

Éléments :

- titre `Journal d'audit` ;
- sous-titre `Consultez les actions sensibles et les événements tracés dans l'application.`.

Pas de CTA principal de création.

### 4.2 KPI

Cinq cartes :

| KPI | Exemple |
|---|---|
| Actions aujourd'hui | 148 |
| Connexions | 32 |
| Modifications sensibles | 14 |
| Actions support | 5 |
| Alertes à vérifier | 3 |

Couleurs : bleu, vert, orange, violet, jaune/orange.

### 4.3 Filtres

La maquette montre deux lignes de filtres dans une grande carte :

Ligne 1 :

```txt
Période
Société
Type d'entité
ID entité
```

Ligne 2 :

```txt
Action
Source
Acteur
Réinitialiser
Exporter
```

Règles :

- bouton `Réinitialiser` secondaire ;
- bouton `Exporter` bleu ;
- champs de même hauteur ;
- pas de recherche libre dominante si elle n'est pas visible.

### 4.4 Tableau d'audit

Colonnes visibles :

```txt
[checkbox]
Date
Résumé
Source
Action
Type entité
ID entité
Acteur
Détail
```

Rendu :

- première ligne sélectionnée ;
- fond bleu pâle + bord gauche bleu ;
- badges source/action/type colorés ;
- bouton `Voir` en dernière colonne ;
- pagination en bas ;
- table compacte.

### 4.5 Panneau droit détail

Header :

- titre `Connexion réussie de Nathan A.` ;
- identifiant `AUD-20260424-0912` ;
- badge `Succès` ;
- bouton `Copier l'ID` ;
- icône fermer.

Onglets :

```txt
Détails
Contexte
```

Onglet actif : `Détails`.

Cartes internes :

1. `Résumé de l'action`
   - Date et heure ;
   - Source ;
   - Action ;
   - Acteur ;
   - Entité concernée ;
   - ID entité ;
   - Société.

2. `Traçabilité`
   - Adresse IP ;
   - Navigateur.

3. `Payload`
   - bouton `Copier JSON` ;
   - bloc code JSON monospacé ;
   - fond gris très clair ;
   - bordure fine ;
   - hauteur contrôlée.

## 5. Proportions et rythme visuel

| Zone | Cible |
|---|---|
| KPI | 5 cartes horizontales |
| Filtres | carte large, deux lignes |
| Tableau | environ 65–70 % largeur |
| Panneau droit | environ 420 px |
| Payload | bloc code lisible, pas envahissant |

## 6. Éléments à masquer, simplifier ou reporter

Autorisé :

- colonnes non visibles ;
- filtres non visibles ;
- recherche brute ;
- messages techniques ;
- états vides avec texte documentaire ;
- payload trop long ;
- actions avancées d'export si elles surchargent.

La page doit privilégier la lisibilité de l'état audit visible.

## 7. Interdictions

Ne pas :

- afficher `INFORMATION NON FOURNIE — À CONFIRMER` dans l'interface ;
- remplacer le panneau droit par une modal ;
- supprimer le payload JSON ;
- supprimer les KPI ;
- ajouter une création/modification d'audit ;
- modifier la logique d'audit ou l'API ;
- exposer des données sensibles réelles non nécessaires dans une maquette.

## 8. DoD visuelle 99 %

La page est conforme si :

- le header correspond ;
- les 5 KPI sont alignés ;
- les filtres sont organisés en deux lignes ;
- le bouton `Exporter` est bleu ;
- le tableau contient les colonnes visibles ;
- une ligne est sélectionnée ;
- le panneau droit affiche le détail de l'événement sélectionné ;
- les onglets `Détails / Contexte` sont présents ;
- les cartes Résumé, Traçabilité et Payload sont visibles ;
- le bloc JSON est lisible ;
- aucune formule documentaire n'apparaît dans l'UI.

## 9. Checklist de contrôle manuel Nathan

```txt
[ ] Le titre Journal d'audit est conforme.
[ ] Les 5 KPI sont visibles.
[ ] Les filtres sont répartis en deux lignes.
[ ] Le bouton Exporter est bleu.
[ ] Le tableau contient Date, Résumé, Source, Action, Type entité, ID entité, Acteur, Détail.
[ ] La première ligne est sélectionnée visuellement.
[ ] Le panneau droit affiche Connexion réussie de Nathan A. ou un événement équivalent.
[ ] Le bouton Copier l'ID est visible.
[ ] Les onglets Détails / Contexte sont visibles.
[ ] Le bloc Payload JSON est présent.
[ ] La formule INFORMATION NON FOURNIE — À CONFIRMER n'apparaît pas dans l'interface.
```

## 10. Écarts connus à contrôler dans le code

Écart prioritaire déjà identifié :

```txt
app/audit/audit-client.tsx peut contenir / afficher la formule INFORMATION NON FOURNIE — À CONFIRMER.
```

Cette formule doit être remplacée côté interface par un libellé utilisateur normal, par exemple :

```txt
Non renseigné
Aucune donnée disponible
Non disponible
```

À contrôler aussi :

- le code réel peut avoir un champ recherche non visible dans la maquette ;
- certains filtres peuvent différer ;
- la sélection de ligne peut ne pas être assez visible ;
- le payload peut être trop long et doit rester contenu.

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
- ce document REFERENCE_UI_UX_AUDIT.md

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
