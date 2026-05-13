# Ambulance Manager — REFERENCE_UI_UX_INDEX_MAQUETTES

Version : V0.2 — Normalisation chemins + cadrage Codex UI/UX  
Date : 13/05/2026  
Statut : Document d’index transversal — à intégrer / valider  
Périmètre : UI/UX documentaire, hors bloc applicatif, sans modification de code

---

## 1. Objet du document

Ce document sert de **table de vérité documentaire transversale** pour les maquettes officielles UI/UX du projet Ambulance Manager.

Il prépare la rédaction progressive des documents :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_<PAGE>.md
```

Objectif : reproduire la méthode validée sur A25 Planning pour toutes les pages disposant d’une maquette officielle, sans créer de nouveau bloc applicatif.

Ce chantier sert uniquement à cadrer :

- les images officielles disponibles ;
- les pages réelles concernées dans le code ;
- les documents de référence UI/UX existants ou à créer ;
- les incohérences entre maquettes, documentation, plan et code ;
- l’ordre de traitement documentaire avant production code ultérieure.

---

## 2. Règles de vérité et de priorité

### 2.1 Vérité visuelle

Les images officielles sont la vérité visuelle prioritaire.

Source officielle :

```txt
docs/1-MASTER/MAQUETTE/MAQUETTE_DA
```

Les images `.png` présentes dans ce dossier sont la cible visuelle à reproduire au plus près.

### 2.2 Vérité codable

Les documents :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_<PAGE>.md
```

sont la traduction codable des images officielles pour Codex.

Ils doivent :

- décrire précisément la maquette ;
- séparer le visible, le déduit raisonnable et l’inconnu ;
- cadrer ce que Codex peut modifier plus tard ;
- empêcher l’invention de fonctionnalités non visibles ;
- indiquer les zones où le code réel contient plus de fonctionnalités que la maquette ;
- préciser comment conserver la vérité fonctionnelle du code tout en pouvant masquer, déplacer, replier, simplifier ou supprimer visuellement les éléments non conformes à la maquette.

### 2.3 Vérité fonctionnelle

Le code réel reste la vérité fonctionnelle.

Les maquettes ne suppriment pas la vérité fonctionnelle du code, mais la phase actuelle est visuelle : elles peuvent justifier de masquer, déplacer, replier, simplifier ou supprimer visuellement un élément fonctionnel si celui-ci empêche la fidélité maquette.

Si une fonctionnalité existe dans le code mais n’apparaît pas dans la maquette, le document de référence doit la classer dans l’une des catégories suivantes :

```txt
présent dans le code — à conserver visuellement
présent dans le code — à replier / déplacer / simplifier visuellement
présent dans le code — hors priorité visuelle immédiate
présent dans le code — à traiter dans un bloc fonctionnel ultérieur
```

### 2.4 Documentation MAQUETTE générale

Les documents généraux du dossier MAQUETTE servent de contexte DA uniquement.

Ils ne priment pas sur les images officielles.

### 2.5 Dossier icônes supprimé / neutralisé

Le dossier d’icônes exportées est considéré comme supprimé ou inutile pour ce chantier.

Conséquence :

- ne pas dépendre de `docs/1-MASTER/MAQUETTE/ICONES` ;
- ne pas recréer de dépendance vers un dossier `ICONE` ou `ICONES` ;
- ne pas bloquer une référence UI/UX à cause d’icônes exportées absentes ;
- utiliser les icônes visibles dans les maquettes comme repères visuels uniquement ;
- privilégier l’iconographie déjà intégrée dans le code, notamment Lucide React, sauf besoin spécifique documenté.

### 2.6 Formule `INFORMATION NON FOURNIE — À CONFIRMER`

La formule exacte :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

est réservée aux documents, aux audits et au contrôle qualité.

Elle ne doit jamais être affichée telle quelle dans l’interface utilisateur finale.


### 2.7 Règle officielle — casse des dossiers documentaires

La casse officielle des dossiers documentaires est :

```txt
docs/1-MASTER/
docs/2-SESSIONS/
docs/3-TEMPLATES/
docs/4-ARCHIVES/
```

Les anciennes variantes en minuscules ne doivent plus être utilisées dans les nouveaux documents, prompts, preuves ou références :

```txt
docs/1-master/
docs/2-sessions/
docs/3-templates/
docs/4-archives/
```

Exception : les anciens fichiers historiques, anciens patchs `.diff`, anciennes preuves terminales, anciens rapports de session et archives peuvent conserver les anciens chemins s’ils décrivent l’état réel du projet au moment où ils ont été produits.

### 2.8 Règle de priorité visuelle actuelle

Ce chantier documentaire UI/UX est strictement visuel.

L’objectif est de permettre une reproduction à environ 99 % des maquettes officielles.

La priorité actuelle n’est pas de préserver l’affichage de tout le fonctionnel existant.

Règle verrouillée :

```txt
IMAGE OFFICIELLE = VÉRITÉ VISUELLE
REFERENCE_UI_UX_<PAGE>.md = TRADUCTION CODABLE POUR CODEX
CODE RÉEL = VÉRITÉ FONCTIONNELLE
FONCTIONNEL EXISTANT = NON BLOQUANT POUR CETTE PHASE VISUELLE
```

Conséquences :

- si un élément fonctionnel réel empêche la fidélité visuelle à la maquette, il peut être masqué, déplacé, replié, simplifié ou supprimé visuellement ;
- les arbitrages fonctionnels seront traités plus tard dans des sessions applicatives dédiées ;
- aucune API, Prisma, RBAC, service métier, logique serveur ou moteur métier ne doit être modifié dans ce chantier documentaire ;
- les maquettes officielles ne sont pas une inspiration : elles sont la cible visuelle prioritaire.

### 2.9 Référence Codex UI/UX visuelle

Les futures productions Codex UI/UX visuelles doivent lire :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md
```

Puis uniquement le `REFERENCE_UI_UX_<PAGE>.md` de la page concernée et les fichiers code utiles.

---

## 3. Périmètre du chantier

### 3.1 Inclus

Le chantier inclut :

- inventaire des maquettes officielles ;
- association maquette ↔ page réelle ↔ fichiers code ;
- identification des documents existants ou à créer ;
- cadrage de la méthode de rédaction page par page ;
- relevé des incohérences initiales ;
- ordre recommandé de traitement documentaire.

### 3.2 Exclus

Le chantier exclut :

- création d’un nouveau bloc applicatif ;
- modification du code ;
- génération de patch applicatif ;
- correction UI directe ;
- refonte fonctionnelle ;
- nouvelle direction artistique ;
- réintroduction du dossier icônes supprimé.

---

## 4. Inventaire officiel des maquettes

### 4.1 Maquettes fondatrices

Racine :

```txt
docs/1-MASTER/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0
```

| Page | Maquette | Route concernée | Statut |
|---|---|---|---|
| Dashboard | `1-Dashboard/Dashboard_V1.png` | `/dashboard` | officielle |
| Planning | `2-Planning/Planning_V1.2.png` | `/planning` | officielle |
| Planning — détail annoté | `2-Planning/Planning_V1.2_INFO_DETAIL.png` | `/planning` | support d’analyse |
| Utilisateurs / RH | `3-Utilisateurs-RH/Utilisateurs-RH_V1.png` | `/users` | officielle |
| Véhicules | `4-Véhicules/Véhicules_V1.2.png` | `/vehicles` | officielle |

Note : selon le contexte ZIP ou système de fichiers, certains chemins peuvent apparaître sous forme encodée, par exemple `V#U00e9hicules`. Codex devra toujours lister le dossier réel avant lecture si le chemin accentué échoue.

### 4.2 Maquettes complémentaires

Racine :

```txt
docs/1-MASTER/MAQUETTE/MAQUETTE_DA/A21-UX-04_MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0
```

| Page | Maquette | Route concernée | Statut |
|---|---|---|---|
| Templates | `1-Templates/Templates_V1.1.png` | `/templates` | officielle |
| Société / paramètres métier | `2-Société-paramètres-métier/Société_V1.0.png` | `/company` | officielle |
| Dépôts / bases | `3-Dépôts-bases/Dépôts-bases_V1.0.png` | `/depots` | officielle |
| Onboarding société pilote | `4-Onboarding société pilote/Onboarding_V1.2.png` | `/onboarding` | officielle |
| Audit | `5-Audit/Audit_V1.0.png` | `/audit` | officielle |

Note : selon le contexte ZIP ou système de fichiers, certains chemins peuvent apparaître sous forme encodée, par exemple `Soci#U00e9t#U00e9` ou `D#U00e9p#U00f4ts-bases`.

### 4.3 Pages simples / finitions

Racine :

```txt
docs/1-MASTER/MAQUETTE/MAQUETTE_DA/PAGES_SIMPLES_FINITIONS_IMAGE_V1.0/A21-UX-05_PAGES_SIMPLES_FINITIONS_IMAGE_V1.0
```

| Page | Maquette | Route concernée | Statut |
|---|---|---|---|
| Login | `1-Login/Login_V1.1.png` | `/login` | officielle |
| Privacy / mentions d’information | `2-Privacy/Privacy_V1.0.png` | `/privacy` | officielle |

---

## 5. Association maquettes ↔ pages réelles ↔ fichiers code

| Priorité | Page | Route | Maquette officielle | Fichiers code principaux | Document UI/UX cible |
|---:|---|---|---|---|---|
| 0 | Shell global connecté | toutes hors `/login` | présent transversalement dans plusieurs maquettes | `app/app-shell.tsx`, `app/layout.tsx`, `app/globals.css`, `app/ui/*` | `REFERENCE_UI_UX_SHELL_GLOBAL.md` |
| 1 | Login | `/login` | `Login_V1.1.png` | `app/login/page.tsx` | `REFERENCE_UI_UX_LOGIN.md` |
| 2 | Dashboard | `/dashboard` | `Dashboard_V1.png` | `app/dashboard/page.tsx` | `REFERENCE_UI_UX_DASHBOARD.md` |
| 3 | Planning | `/planning` | `Planning_V1.2.png`, `Planning_V1.2_INFO_DETAIL.png` | `app/planning/page.tsx`, `app/planning/planning-client.tsx`, `app/planning/manual-planning-panel.tsx` | `REFERENCE_UI_UX_A25_PLANNING.md` |
| 4 | Société / paramètres métier | `/company` | `Société_V1.0.png` | `app/company/page.tsx`, `app/company/company-profile-form.tsx`, `app/company/company-rules-panel.tsx` | `REFERENCE_UI_UX_COMPANY.md` |
| 5 | Dépôts / bases | `/depots` | `Dépôts-bases_V1.0.png` | `app/depots/page.tsx`, `app/depots/depots-client.tsx` | `REFERENCE_UI_UX_DEPOTS_BASES.md` |
| 6 | Véhicules | `/vehicles` | `Véhicules_V1.2.png` | `app/vehicles/page.tsx`, `app/vehicles/vehicles-client.tsx`, `app/vehicles/add-vehicle-form.tsx` | `REFERENCE_UI_UX_VEHICLES.md` |
| 7 | Templates | `/templates` | `Templates_V1.1.png` | `app/templates/page.tsx`, `app/templates/templates-client.tsx` | `REFERENCE_UI_UX_TEMPLATES.md` |
| 8 | Utilisateurs / RH | `/users` | `Utilisateurs-RH_V1.png` | `app/users/page.tsx`, `app/users/*client*.tsx`, `app/a24-users-rh.css` | `REFERENCE_UI_UX_USERS_RH.md` |
| 9 | Onboarding société pilote | `/onboarding` | `Onboarding_V1.2.png` | `app/onboarding/page.tsx`, `app/onboarding/onboarding-client.tsx` | `REFERENCE_UI_UX_ONBOARDING.md` |
| 10 | Audit | `/audit` | `Audit_V1.0.png` | `app/audit/page.tsx`, `app/audit/audit-client.tsx` | `REFERENCE_UI_UX_AUDIT.md` |
| 11 | Privacy / mentions d’information | `/privacy` | `Privacy_V1.0.png` | `app/privacy/page.tsx` | `REFERENCE_UI_UX_PRIVACY.md` |

---

## 6. Documents de référence existants

| Document | Statut | Rôle |
|---|---|---|
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A24.md` | existant | Référence globale A24, utile comme contexte, mais trop large pour piloter Codex page par page. |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A25_PLANNING.md` | existant | Référence page Planning déjà détaillée selon la méthode validée A25. |
| `docs/1-MASTER/MAQUETTE/README_MAQUETTES_A24.md` | existant | Point d’entrée historique des maquettes A24. À lire comme contexte, avec neutralisation des références au dossier icônes supprimé. |
| `docs/1-MASTER/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md` | existant | Spécification générale utile, mais ne remplace pas les futures références page par page. |
| `docs/1-MASTER/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md` | existant | Contexte historique de conception. Ne prime pas sur les PNG officiels. |

---

## 7. Documents à créer

Documents transversaux :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md
```

Documents page par page :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_LOGIN.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_DASHBOARD.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_COMPANY.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_DEPOTS_BASES.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_VEHICLES.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_TEMPLATES.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_USERS_RH.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_ONBOARDING.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_AUDIT.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_PRIVACY.md
```

Document déjà existant à conserver :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A25_PLANNING.md
```

---

## 8. Gabarit obligatoire des futurs documents `REFERENCE_UI_UX_<PAGE>.md`

Chaque document page devra suivre la structure suivante.

```txt
# Ambulance Manager — REFERENCE_UI_UX_<PAGE>

Version : V0.1
Date : JJ/MM/AAAA
Statut : Référence UI/UX codable à valider
Page : <nom page>
Route : <route>
Maquette officielle : <chemin image>
Fichiers code concernés : <liste>

## 1. Objet du document
## 2. Sources autorisées
## 3. Règles de vérité applicables
## 4. Description visuelle globale de la maquette
## 5. Découpage précis par zones
## 6. Hiérarchie visuelle attendue
## 7. Composants visibles
## 8. Textes, libellés et microcopy visibles
## 9. États visuels visibles
## 10. Données fonctionnelles visibles dans la maquette
## 11. Fonctionnalités présentes dans le code mais non visibles dans la maquette
## 12. Règles de conservation du fonctionnel existant
## 13. Écarts connus entre code réel et maquette
## 14. Instructions codables futures pour Codex
## 15. Limites et informations à confirmer
## 16. Checklist de contrôle visuel manuel Nathan
## 17. Verdict documentaire
```

Chaque document doit permettre à Codex de produire plus tard une correction visuelle ciblée sans refaire l’audit global.

---

## 9. Règles de rédaction page par page

### 9.1 Ne pas inventer

Un document `REFERENCE_UI_UX_<PAGE>.md` ne doit pas inventer :

- une fonctionnalité absente de la maquette ;
- une action métier non visible ;
- une donnée métier non présente ;
- un comportement fonctionnel non prouvé ;
- un nouvel écran non demandé.

### 9.2 Séparer les niveaux d’information

Chaque élément doit être classé :

```txt
VISIBLE DANS LA MAQUETTE
DÉDUIT RAISONNABLEMENT
PRÉSENT DANS LE CODE RÉEL
NON VISIBLE / À CONFIRMER
HORS PÉRIMÈTRE VISUEL IMMÉDIAT
```

### 9.3 Préserver le fonctionnel

Le réalignement visuel ne doit pas casser :

- routes ;
- appels API ;
- RBAC ;
- multi-tenant ;
- formulaires existants ;
- logique de création / modification / archivage ;
- états métier ;
- historique ;
- audit ;
- exports ;
- imports.

### 9.4 Viser 99 % de fidélité visuelle

L’objectif visuel final est de se rapprocher à 99 % des images officielles, dans les limites raisonnables du code réel et des contraintes responsive.

Les écarts acceptables doivent être explicitement justifiés.

---

## 10. Incohérences initiales à suivre

| ID | Zone | Incohérence | Gravité documentaire | Suite attendue |
|---|---|---|---|---|
| UIX-IDX-001 | Icônes | Les anciens documents peuvent encore référencer `ICONES`, mais le dossier est supprimé / inutile pour ce chantier. | moyenne | Neutraliser dans les nouveaux documents, ne pas recréer de dépendance. |
| UIX-IDX-002 | Audit | La formule `INFORMATION NON FOURNIE — À CONFIRMER` a été repérée comme risque d’affichage interface dans le module Audit. | élevée | À documenter dans `REFERENCE_UI_UX_AUDIT.md`, puis correction code ultérieure. |
| UIX-IDX-003 | Chemins accentués | Certains chemins peuvent apparaître encodés dans le ZIP (`#U00e9`, `#U00f4`). | moyenne | Dans les prompts Codex, demander de lister les dossiers avant lecture si un chemin accentué échoue. |
| UIX-IDX-004 | Shell global | La sidebar/topbar/thème sont transversaux mais sans maquette dédiée unique. | moyenne | Créer `REFERENCE_UI_UX_SHELL_GLOBAL.md` avant les pages. |
| UIX-IDX-005 | Planning | Planning déjà cadré avec A25, mais doit être indexé dans le chantier transversal. | faible | Conserver `REFERENCE_UI_UX_A25_PLANNING.md`, ne pas le réécrire en priorité. |
| UIX-IDX-006 | Pages riches | Certaines pages réelles contiennent plus de fonctionnel que les maquettes. | élevée | Les futurs documents devront distinguer visible, code réel et hors priorité visuelle. |

---

## 11. Ordre recommandé de traitement documentaire

| Ordre | Document | Objectif |
|---:|---|---|
| 0 | `REFERENCE_UI_UX_INDEX_MAQUETTES.md` | Poser la table de vérité transversale. |
| 1 | `REFERENCE_UI_UX_SHELL_GLOBAL.md` | Cadrer sidebar, topbar, layout connecté, thème clair/sombre, composants transversaux. |
| 2 | `REFERENCE_UI_UX_LOGIN.md` | Traiter la page publique isolée. |
| 3 | `REFERENCE_UI_UX_DASHBOARD.md` | Cadrer le point d’entrée produit connecté. |
| 4 | `REFERENCE_UI_UX_COMPANY.md` | Cadrer société et paramètres métier. |
| 5 | `REFERENCE_UI_UX_DEPOTS_BASES.md` | Cadrer les bases/dépôts après société. |
| 6 | `REFERENCE_UI_UX_VEHICLES.md` | Cadrer flotte et conformité visuelle. |
| 7 | `REFERENCE_UI_UX_TEMPLATES.md` | Cadrer les templates liés au planning. |
| 8 | `REFERENCE_UI_UX_USERS_RH.md` | Cadrer la page dense users/RH après les référentiels. |
| 9 | `REFERENCE_UI_UX_ONBOARDING.md` | Cadrer le workflow transverse d’installation société pilote. |
| 10 | `REFERENCE_UI_UX_AUDIT.md` | Cadrer audit, détail, filtres, payload, et nettoyer la formule documentaire côté UI plus tard. |
| 11 | `REFERENCE_UI_UX_PRIVACY.md` | Cadrer page simple mais sensible RGPD / information. |
| hors ordre | `REFERENCE_UI_UX_A25_PLANNING.md` | Déjà existant ; seulement maintenir sa cohérence avec l’index. |

---

## 12. Règles pour les futurs prompts Codex

Les prompts de production futurs devront rappeler :

```txt
Ne pas faire d’audit global du repo.
Ne lire que les fichiers utiles à la page traitée.
Ne pas générer de captures.
Ne pas modifier le fonctionnel hors objectif visuel.
Ne pas réintroduire le dossier ICONE / ICONES.
Ne pas afficher INFORMATION NON FOURNIE — À CONFIRMER dans l’interface utilisateur.
Préserver les routes, API, RBAC, multi-tenant et comportements existants.
Fournir une checklist de contrôle visuel manuel Nathan.
```

Les prompts de contrôle futurs devront vérifier :

```txt
respect de la maquette officielle ;
respect du document REFERENCE_UI_UX_<PAGE>.md ;
absence de dérive fonctionnelle ;
absence de dépendance au dossier icônes supprimé ;
absence d’affichage utilisateur de formules documentaires ;
preuve du patch si code modifié ;
preuve lint/build si applicable ;
checklist visuelle manuelle claire.
```

---

## 13. Verdict de préparation

```txt
CHANTIER DOCUMENTAIRE TRANSVERSAL UI/UX : CADRÉ
NOUVEAU BLOC APPLICATIF : NON
FICHIERS CODE À MODIFIER À CE STADE : NON
DOSSIER ICONE / ICONES À UTILISER : NON
MAQUETTE_DA = VÉRITÉ VISUELLE : OUI
REFERENCE_UI_UX_<PAGE>.md = TRADUCTION CODABLE : OUI
CODE RÉEL = VÉRITÉ FONCTIONNELLE : OUI
ORDRE DE TRAITEMENT DOCUMENTAIRE PROPOSÉ : OUI
```
