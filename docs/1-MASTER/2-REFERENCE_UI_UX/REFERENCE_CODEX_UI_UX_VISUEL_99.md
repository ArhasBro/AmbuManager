# Ambulance Manager — RÉFÉRENCE CODEX UI/UX VISUEL 99 %

Version : V1.0 — Production visuelle ciblée  
Date : 13/05/2026  
Statut : Référence Codex à utiliser pour les futures sessions UI/UX visuelles  
Périmètre : visuel uniquement, hors bloc documentaire, hors refonte fonctionnelle

---

## 1. Objet du document

Ce document sert de référence courte et opérationnelle pour Codex lors des futures sessions de production visant à rapprocher une page d'Ambulance Manager de sa maquette officielle à environ 99 %.

Il ne remplace pas :

- les images officielles ;
- `REFERENCE_UI_UX_INDEX_MAQUETTES.md` ;
- `REFERENCE_UI_UX_SHELL_GLOBAL.md` ;
- le `REFERENCE_UI_UX_<PAGE>.md` de la page concernée ;
- le code réel comme vérité fonctionnelle.

Il sert à éviter les dérives classiques : audit trop large, scan inutile du dépôt, ajout fonctionnel non demandé, captures automatiques, ou blocage à cause d'un élément fonctionnel non visible dans la maquette.

---

## 2. Lecture obligatoire pour Codex

Pour une session UI/UX visuelle, Codex doit lire dans cet ordre :

```txt
docs/1-MASTER/DOCUMENT_MAITRE_V2.md
docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_<PAGE>.md
```

Puis uniquement les fichiers code utiles à la page traitée.

Codex ne doit pas scanner tout le dépôt.

---

## 3. Règle de vérité

```txt
IMAGE OFFICIELLE = VÉRITÉ VISUELLE
REFERENCE_UI_UX_<PAGE>.md = TRADUCTION CODABLE POUR CODEX
CODE RÉEL = VÉRITÉ FONCTIONNELLE
DOCUMENTATION MAQUETTE GÉNÉRALE = CONTEXTE DA UNIQUEMENT
```

En cas de contradiction visuelle :

```txt
Image officielle > REFERENCE_UI_UX_<PAGE>.md > REFERENCE_UI_UX_SHELL_GLOBAL.md > documentation MAQUETTE générale > anciennes captures > récit de production
```

En cas de contradiction fonctionnelle :

```txt
Code réel > documentation
```

Règle de nomenclature UI visible :

- Les libellés affichés dans l'interface doivent suivre la nomenclature fonctionnelle V2.
- Les routes techniques ou historiques peuvent conserver leurs anciens noms si nécessaire.
- Appliquer en priorité les libellés UI : `Modèles horaires`, `Mise en route`, `Dépôts`, `Dépôts / Bases` selon le niveau de module attendu.

---

## 4. Objectif de la phase

La phase actuelle est strictement visuelle.

Objectif : reproduire la maquette officielle à environ 99 %.

Ce n'est pas une phase de :

- refonte fonctionnelle ;
- ajout métier ;
- optimisation API ;
- modification Prisma ;
- changement RBAC ;
- moteur autoschedule ;
- matching ;
- refonte backend ;
- correction générale du dépôt.

---

## 5. Fonctionnel existant non bloquant

Le fonctionnel existant ne doit pas bloquer la reproduction visuelle.

Si un bouton, un formulaire, une donnée, une action, un onglet ou un bloc fonctionnel existe dans le code mais gêne la fidélité à la maquette, Codex peut :

- le masquer visuellement ;
- le déplacer ;
- le replier ;
- le simplifier ;
- le supprimer de l'affichage par défaut ;
- le reporter dans un panneau ou une zone secondaire si cohérent avec la maquette.

Codex ne doit pas supprimer la vérité fonctionnelle sous-jacente sans demande explicite.

Les arbitrages fonctionnels seront traités plus tard dans des sessions applicatives dédiées.

---

## 6. Interdictions

Codex ne doit pas :

- créer une nouvelle direction artistique ;
- transformer une session visuelle en refonte fonctionnelle ;
- modifier API, Prisma, RBAC, services métier ou logique serveur ;
- modifier autoschedule, matching ou moteurs métier ;
- générer des captures automatiquement ;
- faire un audit global du dépôt ;
- lire des fichiers non utiles à la page ;
- recréer le dossier `ICONE` ou `ICONES` ;
- afficher `INFORMATION NON FOURNIE — À CONFIRMER` dans l'interface utilisateur ;
- inventer des fonctionnalités absentes de la maquette.

Règle responsive transverse complémentaire :

- vérifier systématiquement le rendu au minimum en `1920×1080` et `2560×1440` ;
- ne pas utiliser `zoom` ;
- ne pas utiliser `transform: scale()` pour adapter globalement l'interface ;
- privilégier `clamp()`, grilles fluides, paddings adaptatifs et largeurs max raisonnables ;
- garantir un Shell lisible/exploitable avec sidebar entièrement visible ou accessible via scroll interne maîtrisé ;
- éviter un contenu principal trop centré/petit sur grands écrans comme un contenu trop compressé sur 1920×1080.

---

## 7. Règles de chemins documentaires

La casse officielle est :

```txt
docs/1-MASTER/
docs/2-SESSIONS/
docs/3-TEMPLATES/
docs/4-ARCHIVES/
```

Les nouveaux prompts, rapports, patchs et références ne doivent plus utiliser :

```txt
FORMES OBSOLÈTES :
docs/1-master/
docs/2-sessions/
docs/3-templates/
docs/4-archives/
```

Exception : anciens livrables historiques et anciens patchs qui décrivent l'état réel du projet au moment de leur production.

---

## 8. Règles de preuve si code modifié

Si un patch code est produit, Codex doit fournir :

```txt
- patch principal ciblé ;
- patch exporté en UTF-8 sans BOM ;
- preuve que le patch commence par diff --git ;
- preuve réelle git apply --check ;
- sortie complète npm run lint avec code retour ;
- sortie complète npm run build avec code retour ;
- checklist de contrôle visuel manuel Nathan.
```

Si aucun code n'est modifié :

```txt
NO_PATCH_CODE
```

et ne pas lancer artificiellement lint/build.

Note Privacy :

- La page Privacy reste à confirmer sur le plan de conformité.
- Ce point n'est pas bloquant pour les maquettes métier immédiates.

---

## 9. Checklist visuelle manuelle obligatoire

Toute production UI/UX visuelle doit finir par une checklist Nathan du type :

```txt
[ ] La page utilise le Shell global conforme.
[ ] La sidebar est alignée avec les maquettes.
[ ] La topbar est alignée avec les maquettes.
[ ] Le titre et le sous-titre de page sont conformes.
[ ] Les cartes / tableaux / filtres / badges respectent la maquette.
[ ] Les éléments fonctionnels non visibles dans la maquette ne surchargent pas l'écran.
[ ] Aucun texte documentaire n'est visible dans l'interface.
[ ] Les accents français sont présents dans les libellés visibles.
[ ] La page se rapproche à environ 99 % de la maquette officielle.
```

---

## 10. Prompt court réutilisable

```txt
Tu travailles sur Ambulance Manager.

Objectif : réaligner uniquement le visuel de la page concernée avec sa maquette officielle à environ 99 %, sans traiter le fonctionnel métier.

Lis d'abord :
- docs/1-MASTER/DOCUMENT_MAITRE_V2.md
- docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md
- docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md
- docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md
- docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md
- docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_<PAGE>.md

Puis lis uniquement les fichiers code utiles à cette page.

Règles :
- image officielle = vérité visuelle ;
- code réel = vérité fonctionnelle ;
- fonctionnel non bloquant pour cette phase ;
- masquer, déplacer, replier ou simplifier les éléments fonctionnels qui empêchent la fidélité maquette ;
- ne pas modifier API, Prisma, RBAC, services métier ou logique serveur ;
- ne pas générer de captures ;
- fournir une checklist de contrôle visuel manuel Nathan.
```

---

## 11. Verdict documentaire

```txt
REFERENCE_CODEX_UI_UX_VISUEL_99 : CRÉÉE
UTILISATION : FUTURES PRODUCTIONS CODEX UI/UX VISUELLES
PÉRIMÈTRE : VISUEL 99 % MAQUETTE
FONCTIONNEL : NON BLOQUANT POUR CETTE PHASE
```
