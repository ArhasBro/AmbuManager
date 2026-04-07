# RESULTATS

## Résultat principal
Verdict d’audit :
**NO_PATCH — EXISTANT `ShiftTemplate` RÉEL MAIS MODULE PRODUIT TEMPLATES PARTIEL ET NON ADMINISTRABLE**

## 1. Analyse rapide
`ShiftTemplate` n’est pas théorique : le modèle, les migrations, le seed, l’autoschedule, le publish, l’assignation, le matching et l’affichage planning le consomment réellement.

En revanche, l’existant reste un **socle technique partiel** :
- la data existe ;
- le planning sait l’utiliser ;
- le produit ne fournit pas encore le vrai module templates attendu par le cadrage module 09.

## 2. Périmètre réellement contrôlé
Contrôlé dans le ZIP :
- `prisma/schema.prisma`
- `prisma/migrations/20260226173545_add_shift_templates/migration.sql`
- `prisma/migrations/20260226181203_autoschedule_planning_v4_1_1/migration.sql`
- `prisma/migrations/20260226193652_add_shift_model/migration.sql`
- `prisma/seed.ts`
- `scripts/create-shift-template.ts`
- `scripts/list-shift-templates.ts`
- `scripts/disable-corrupted-template-journee.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/matching.service.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- documents maîtres et documents méthodologiques requis

## 3. État réel actuel de `ShiftTemplate`
### Le modèle existe réellement
Champs réellement présents aujourd’hui :
- `id`
- `companyId`
- `name`
- `category`
- `requiredRole`
- `isActive`
- `startTime`
- `endTime`
- `crossesMidnight`
- `createdAt`
- `updatedAt`

Relations réellement présentes :
- `company`
- `draftShifts`
- `shifts`

Contraintes réellement présentes :
- unicité `(companyId, name)`
- index `(companyId)`
- index `(companyId, category)`

### Ce qui n’existe pas dans le modèle actuel
Non prouvés dans le schéma :
- type de véhicule requis
- nombre minimal de personnes requis
- composition minimale d’équipe configurable
- couleur libre
- rattachement template ↔ dépôt/base
- champ d’archivage distinct
- champ de récurrence hebdomadaire template

## 4. Usages réellement branchés
### Seed
Le seed crée réellement des templates A/B et les maintient via `upsertTemplate`.

### Outillage
Des scripts existent pour :
- créer un template ;
- lister les templates ;
- désactiver un template ciblé.

Mais ces scripts relèvent d’un **outillage ponctuel**, pas d’un vrai module produit :
- `companyId` en dur ;
- pas d’intégration package.json ;
- pas d’entrée UI ;
- un script vise explicitement un cas de template corrompu.

### Autoschedule
Usages réellement prouvés :
- lecture des templates **actifs** d’une société ;
- filtrage optionnel par `category` ;
- génération de `DraftShift` à partir des horaires du template ;
- gestion de `crossesMidnight`.

### Publish
Usage réellement prouvé :
- recopie de `templateId` depuis `DraftShift` vers `Shift`.

Aucun enrichissement métier template supplémentaire n’est effectué au publish.

### Planning
Usages réellement prouvés :
- exposition du template lié dans l’API planning ;
- affichage du nom de mission et de la catégorie dans l’UI planning.

### Assignation
Usages réellement prouvés :
- `template.category` pilote seulement le nombre de slots utilisateurs autorisés :
  - `AMBULANCE` / `GARDE` => 2
  - autres catégories => 1

### Matching
Usage réellement prouvé :
- `template.requiredRole` pilote un matching par rôle requis unique.

Ce qui n’est pas prouvé :
- matching sur composition d’équipe ;
- matching sur type véhicule requis ;
- matching sur nombre minimal de personnes requis.

## 5. Écarts prouvés avec le cadrage du module 09
### 09.1 CRUD templates administrable
**Écart réel prouvé**
- pas d’API dédiée templates ;
- pas de page dédiée templates ;
- pas de module produit d’administration.

### 09.2 Champs fonctionnels d’un template
**Partiel**
Présents :
- nom
- catégorie
- horaires début/fin
- passage minuit
- actif/inactif

Absents :
- couleur libre
- durée calculée stockée / exposée comme champ métier dédié
- shifts non horodatés

### 09.3 Composition minimale d’équipe
**Manquant**
Le produit dérive seulement 1 ou 2 slots depuis `category`.  
Il n’existe pas de composition minimale configurable du type :
- 1 ADE obligatoire + 1 ADE/AA
- VSL 1 personne
- Taxi 1 TAXI

### 09.4 Type de véhicule requis
**Manquant ou très partiel**
Aucun champ template dédié n’exprime un type de véhicule requis.

### 09.5 Nombre de personnes requis
**Manquant**
Aucun champ template dédié ne porte un minimum de personnes requis.

### 09.6 Couleurs libres
**Manquant**
Aucun champ couleur template ni UI de personnalisation.

### 09.7 Désactivation / archivage
**Partiel**
Réellement présent :
- `isActive`
- autoschedule filtré sur `isActive`
- script ponctuel de désactivation

Non prouvé :
- vraie route produit d’archivage template ;
- vrai service métier d’archivage ;
- UI dédiée d’archivage ;
- distinction claire désactivation / archivage.

### 09.8 Templates récurrents hebdomadaires
**Non prouvé comme capacité template**
Le système sait générer une semaine complète à partir des templates actifs, mais il n’existe pas de récurrence hebdomadaire configurée et stockée sur chaque template.

## 6. Gouvernance / permissions réelles
### Permission `TEMPLATES_MANAGE`
Constat exact :
- la permission existe dans `lib/permission-catalog.ts` ;
- elle n’est pas branchée dans `lib/permissions.ts` ;
- aucun contrôle runtime trouvé ne l’utilise ;
- aucune UI / API templates ne s’appuie dessus.

Conclusion :
**`TEMPLATES_MANAGE` est actuellement déclarée, mais pas réellement branchée au produit contrôlé.**

### Gouvernance réellement utilisée autour des templates existants
Les écrans et routes contrôlés autour du planning s’appuient sur :
- consultation planning ;
- édition planning ;
- autoschedule ;
- règles société.

Pas sur une permission de gestion templates réellement opérante.

## 7. Patch minimal appliqué ou `NO_PATCH`
### Décision retenue
**NO_PATCH**

### Justification
La session `TPL-01` est un audit d’existant.  
Les écarts constatés sont réels mais structurants :
- modèle incomplet par rapport au cadrage ;
- absence d’API dédiée ;
- absence d’UI dédiée ;
- absence de gouvernance runtime templates.

Les corriger dépasserait clairement le scope d’un audit et ouvrirait les sessions `TPL-02+`.

## 8. Fichiers modifiés
Aucun fichier code métier du dépôt n’a été modifié.

Documents de session finalisés :
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-01_A6_TPL-01/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-01_A6_TPL-01/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-01_A6_TPL-01/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-01_A6_TPL-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-01_A6_TPL-01/FIN_SESSION.md`
- `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-01_A6_TPL-01/NO_PATCH.md`
- `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-01_A6_TPL-01/README_PATCH.md`

Patch documentaire généré :
- `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-01_A6_TPL-01/PATCH__SESSION-20260407-01_A6_TPL-01_DOCS.diff`

## 9. Validations réellement exécutées / constatées
### Ce qui a été fait
- lecture des documents autorisés ;
- contrôle statique du code du ZIP ;
- recherche croisée des usages `ShiftTemplate` dans le dépôt.

### Ce qui n’a pas été exécuté
Aucune validation terminale de type :
- `git apply --check`
- `git apply`
- `npx prisma validate`
- `npx prisma generate`
- `npm run lint`
- `npm run build`

### Pourquoi
La session est retenue en **NO_PATCH**.  
Conformément à la consigne de session, il ne fallait ni simuler un patch ni simuler des validations terminales non nécessaires à un audit factuel.

## 10. Verdict de session
**PARTIELLEMENT CONFORME**

Sens précis :
- `ShiftTemplate` existe réellement ;
- des branchements planning réels existent ;
- le module produit templates attendu par le cadrage n’est pas encore présent comme module autonome et administrable.

## 11. Génération des docs de session
Docs de session complètes générées :
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`

## 12. `README_PATCH.md`
Un `README_PATCH.md` a été généré dans le dossier patch pour documenter :
- l’absence de patch code ;
- la présence du verdict `NO_PATCH` ;
- le patch documentaire final `PATCH__SESSION-20260407-01_A6_TPL-01_DOCS.diff`.

## 13. État de départ réel retenu pour le bloc A6
Le bloc A6 ne démarre pas de zéro.

État de départ réel :
- **socle technique existant** : oui
- **module produit administrable templates** : non
- **gouvernance permissionnelle templates réellement branchée** : non
- **conformité module 09 complète** : non

Formulation de départ bloc :
**base technique réutilisable, mais reprise A6 nécessaire pour rendre les templates autonomes, gouvernés et conformes au cadrage.**
