# Ambulance Manager — PLAN_DE_DEVELOPPEMENT

Version : V2.4.2 (MASTER)  
Date : 13/05/2026

## Sommaire
- [1. Rôle du document](#1-rôle-du-document)
- [2. Référence produit officielle](#2-référence-produit-officielle)
- [3. Principes non négociables du plan](#3-principes-non-négociables-du-plan)
- [4. Doctrine de reprise méthodologique](#4-doctrine-de-reprise-méthodologique)
- [5. Règle de traitement de l’existant](#5-règle-de-traitement-de-lexistant)
- [6. Convention de lecture des sessions](#6-convention-de-lecture-des-sessions)
- [7. Règle de livrable par session](#7-règle-de-livrable-par-session)
- [7.1 Règle de gouvernance des patchs](#71-règle-de-gouvernance-des-patchs)
- [8. Verdict obligatoire de sortie pour toute session AUDIT](#8-verdict-obligatoire-de-sortie-pour-toute-session-audit)
- [9. Convention de structuration du plan](#9-convention-de-structuration-du-plan)
- [10. Ordre global de développement retenu](#10-ordre-global-de-développement-retenu)
- [11. ALPHA V1.0 — Socle et blocs historiques A1 à A13](#11-alpha-v10--socle-et-blocs-historiques-a1-à-a13)
- [12. ALPHA — Suite active / consolidation A14 à A27](#12-alpha--suite-active--consolidation-a14-à-a27)
- [13. BETA V1.x — Plan prévisionnel](#13-beta-v1x--plan-prévisionnel)
- [14. VERSION OFFICIELLE V2.x — Plan prévisionnel](#14-version-officielle-v2x--plan-prévisionnel)
- [15. Règle de maintenance du plan](#15-règle-de-maintenance-du-plan)

## 1. Rôle du document
Ce document constitue le **plan officiel de développement** du projet Ambulance Manager.

Il a pour rôle de :
- transformer le cadrage fonctionnel validé en plan d’exécution méthodique
- organiser le travail par blocs logiques
- découper le développement en sessions unitaires, fermées et validables
- éviter toute dérive de périmètre
- permettre une reprise propre du projet, y compris sur l’existant déjà codé

Ce document ne remplace pas le cadrage produit.  
Il doit s’y conformer.

### Note de lecture — ordre ALPHA / BETA

Le plan est volontairement ordonné ainsi :

1. ALPHA — socle et blocs historiques A1 à A13 ;
2. ALPHA — suite active / consolidation A14 à A26 ;
3. BETA — évolutions prévisionnelles après stabilisation ALPHA ;
4. VERSION OFFICIELLE / V2 — extensions long terme.

La BETA ne doit pas être lancée tant que l’ALPHA n’est pas stabilisée et validée selon les règles de clôture du plan.


## 2. Référence produit officielle
Le document suivant constitue la base officielle produit :

`docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Règles associées :
- ce document est figé
- il ne doit pas être modifié sans validation explicite
- le présent plan ne doit pas revenir sur son contenu
- toute évolution du plan doit rester cohérente avec ce cadrage

## 3. Principes non négociables du plan
- 1 session = 1 point clair
- 1 fonctionnalité
- 1 livrable principal
- 1 DoD
- 1 validation

Règles complémentaires :
- aucun mélange de plusieurs sujets dans une même session
- aucun “bloc fourre-tout”
- aucun statut “acquis” uniquement parce que le code existe déjà
- toute information non prouvée : **INFORMATION NON FOURNIE — À CONFIRMER**

## 4. Doctrine de reprise méthodologique
Le projet ne repart pas de zéro techniquement, mais il repart de zéro méthodologiquement.

Cela signifie :
- le code existant peut être conservé
- mais il doit être recontrôlé
- il peut être corrigé
- il peut être complété
- il peut être repris si nécessaire

Aucun élément déjà codé n’est considéré comme définitivement acquis par défaut.

Chaque bloc du produit suit désormais la logique :
1. audit de l’existant
2. verdict
3. traitement adapté
4. validation des sessions métier du bloc
5. clôture finale du bloc
6. passage explicite au bloc suivant uniquement si le bloc est clôturable définitivement

## 5. Règle de traitement de l’existant
Pour chaque fonctionnalité ou sous-module déjà présent dans le code :

- **si l’existant est conforme au cadrage validé**  
  → **validation**

- **si l’existant est non conforme au cadrage validé**  
  → **correction**

- **si l’existant est incomplet par rapport au cadrage validé**  
  → **complétion**

Conséquence :
- présent dans le code ≠ validé
- déjà fait ≠ sorti du plan
- déjà livré ≠ intouchable

## 6. Convention de lecture des sessions
Le plan utilise explicitement les types de sessions suivants :

### AUDIT
Vérifier l’existant, comparer au cadrage validé, constater l’état réel.

### CORRECTION
Corriger un existant non conforme, faux, incohérent ou mal découpé.

### COMPLÉTION
Terminer ou enrichir un existant incomplet par rapport au cadrage validé.

### VALIDATION
Vérifier formellement qu’un bloc ou une session répond bien :
- au cadrage validé
- à la DoD
- aux tests attendus

### Logique de lecture recommandée
Pour un même sous-sujet, l’enchaînement naturel devient :

- AUDIT
- CORRECTION ou COMPLÉTION si nécessaire
- VALIDATION
- CLOTURE_<BLOC> en fin de bloc

## 7. Règle de livrable par session
Chaque session doit produire **un seul livrable principal**.

Ce livrable principal peut être :
- un patch code + cmd 
- un patch documentaire
- un verdict formel sans correction nécessaire

Le livrable principal doit toujours être :
- unique pour la session
- cohérent avec le type de session
- explicitement justifié
- traçable
- documenté
- rattaché à une DoD
- rattaché à une validation

Conséquence :
- une session **AUDIT** peut conclure sans modification de code
- une session **VALIDATION** peut conclure sans modification de code
- mais dans tous les cas, la session doit produire un livrable formel, explicite, documenté et validable

## 7.1 Règle de gouvernance des patchs

Pour chaque session, la production des patchs suit obligatoirement l’ordre suivant :

### 1. Patch principal code
Le premier patch produit est le patch principal de référence de la session.
Il contient le code de la session et les fichiers strictement nécessaires à son implémentation.

Règle :
- un patch principal déjà appliqué ne doit jamais être régénéré intégralement.

### 2. Patch(s) correctif(s) minimal(aux)
Si un écart, une erreur ou un oubli est détecté après application du patch principal, la correction doit être fournie dans un patch séparé de type fix.

Règles :
- le correctif doit être minimal ;
- il ne doit contenir que les modifications restantes à apporter ;
- il ne doit jamais rejouer tout le patch principal.

### 3. Validation terminale finale
Avant clôture, la session doit être rejouée dans le vrai dépôt avec les vérifications terminales requises par le périmètre concerné.

### 4. Patch documentaire final
Les fichiers `.md` de session ne doivent pas être inclus dans le patch principal code.
Ils doivent être finalisés à la fin, une fois le code validé, dans un patch documentaire séparé.

Ce patch documentaire final regroupe uniquement les éléments documentaires attendus, par exemple :
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`
- `README_PATCH.md` si nécessaire

Précision importante :
les fichiers documentaires de session (`SESSION.md`, `NOTES.md`, `EVIDENCES.md`, `RESULTATS.md`, `FIN_SESSION.md`) sont créés automatiquement lors de l’ouverture de session.
le fichier documentaire de patches (`README.md`) est créé automatiquement lors de l’ouverture de session.

En conséquence, le patch documentaire final ne doit pas recréer ces fichiers.
Il doit uniquement contenir leurs modifications de contenu une fois le code validé.

### Convention attendue
Exemple :
- patch principal : `XXX.diff`
- correctif : `XXX_FIX-01.diff`
- correctif suivant : `XXX_FIX-02.diff`
- documentation finale : `XXX_DOCS.diff`

### Interdictions
Il est interdit de :
- régénérer un patch complet déjà appliqué ;
- mélanger documentation finale et correctif code si cela nuit à la lisibilité ;
- masquer un correctif réel dans une réécriture globale du patch principal.

## 8. Verdict obligatoire de sortie pour toute session AUDIT
Toute session **AUDIT** doit se conclure par un verdict formel parmi les suivants :

- **conforme**
- **non conforme**
- **incomplet**
- **à confirmer**

### Interprétation du verdict
- **conforme**  
  → l’existant est jugé compatible avec le cadrage validé  
  → sortie possible : validation ou conclusion formelle sans correction

- **non conforme**  
  → l’existant doit être corrigé  
  → session suivante attendue : **CORRECTION**

- **incomplet**  
  → l’existant doit être complété  
  → session suivante attendue : **COMPLÉTION**

- **à confirmer**  
  → l’information ou la preuve est insuffisante  
  → session suivante attendue : nouvel **AUDIT** ciblé ou clarification préalable

## 9. Convention de structuration du plan

### 9.1 Blocs
Un bloc regroupe plusieurs sessions liées autour d’un objectif logique.

Exemple :
- bloc users
- bloc véhicules
- bloc audit

### 9.2 Sessions
Chaque session doit être :
- unitaire
- fermée
- testable
- validable

### 9.3 Identifiants
Chaque session possède un identifiant stable et unique.

Exemples :
- AUTH-01
- RBAC-03
- USERS-08
- PLAN-12
- AUDIT-04

### 9.4 Forme cible d’une session
Chaque session future doit pouvoir être lue comme :

- identifiant
- type de session
- objectif unique
- livrable principal unique
- DoD unique
- validation unique

### 9.5 Convention obligatoire de clôture de bloc
Chaque bloc doit se terminer par une session dédiée de type **VALIDATION** nommée selon la convention :
- `CLOTURE_<BLOC>`

Exemples :
- `CLOTURE_A1`
- `CLOTURE_A2`
- `CLOTURE_B1`

Cette session de clôture doit obligatoirement :
- vérifier le code réel du bloc ;
- vérifier les patchs réels du bloc ;
- vérifier la documentation finale du bloc ;
- vérifier les validations terminales réellement rejouées ou constatées ;
- décider si le bloc est clôturable définitivement.

Si un résiduel subsiste, cette session peut produire **un unique correctif final minimal** avant verdict.

### 9.6 Dossier dédié de clôture
Chaque fin de bloc doit disposer d’un dossier dédié, par exemple :
- `4-CLOTURE_A2`

Le verdict final de clôture doit être formulé explicitement sous l’une des deux formes suivantes :
- `BLOC <ID> CLÔTURABLE DÉFINITIVEMENT : OUI`
- `BLOC <ID> CLÔTURABLE DÉFINITIVEMENT : NON`

Aucun passage au bloc suivant n’est autorisé sans ce verdict explicite.

## 10. Ordre global de développement retenu
Ordre global retenu pour l’ALPHA :

1. Accès / Auth / Multi-tenant / Permissions / API  
2. Structure société / bases / rôle support  
3. Users  
4. Véhicules / conformité flotte  
5. Règles métier / templates  
6. Dashboard  
7. Planning manuel  
8. Autoschedule  
9. Matching  
10. Audit / traçabilité  
11. Exports / onboarding / imports  
12. Qualité / documentation  
13. Gel ALPHA

Cet ordre vise à :
- stabiliser les fondations avant l’exploitation métier avancée
- éviter de bâtir des automatismes sur une structure instable
- ne pas construire un dashboard riche avant d’avoir des données fiables
- séparer clairement le socle, l’exploitation et les finitions

## 11. ALPHA V1.0 — Socle et blocs historiques A1 à A13

### BLOC A1 — Accès, Auth, Multi-tenant, Permissions, API
**Objectif du bloc**  
Reprendre tout le socle d’accès et de gouvernance technique pour vérifier l’existant, corriger les écarts, puis réaligner le produit sur le cadrage validé.

#### Sessions
- **AUTH-01 — AUDIT** — Audit complet de l’authentification existante
- **AUTH-02 — CORRECTION** — Correction/remise à niveau du flux de connexion si nécessaire
- **AUTH-03 — VALIDATION** — Vérification et validation de la session enrichie (`role`, `companyId`)
- **AUTH-04 — COMPLÉTION** — Création/validation du mot de passe initial côté produit
- **AUTH-05 — COMPLÉTION** — Réinitialisation de mot de passe par admin/gérant
- **AUTH-06 — COMPLÉTION** — Réinitialisation de mot de passe par support propriétaire

- **TENANT-01 — AUDIT** — Audit complet du cloisonnement multi-tenant existant
- **TENANT-02 — CORRECTION** — Correction des routes/API non correctement cloisonnées
- **TENANT-03 — CORRECTION** — Vérification et remise à niveau du cloisonnement UI si nécessaire
- **TENANT-04 — VALIDATION** — Validation multi-tenant sur périmètre ALPHA

- **RBAC-01 — AUDIT** — Audit complet des rôles existants et de leur usage réel
- **RBAC-02 — CORRECTION** — Remplacement méthodique de `DEA` par `ADE`
- **RBAC-03 — AUDIT** — Audit des permissions existantes par rapport au cadrage validé
- **RBAC-04 — COMPLÉTION** — Ajout / réalignement des permissions fines ALPHA validées
- **RBAC-05 — COMPLÉTION** — Ajout de la permission dédiée `consulter audit`
- **RBAC-06 — COMPLÉTION** — Mise à niveau du modèle d’accès à l’audit (rôle + permission)
- **RBAC-07 — VALIDATION** — Vérification du rôle principal obligatoire
- **RBAC-08 — CORRECTION** — Stabilisation de l’affectation rôle principal + permissions si nécessaire
- **RBAC-09 — VALIDATION** — Validation du bloc rôles/permissions ALPHA

- **API-01 — AUDIT** — Audit du format API existant
- **API-02 — CORRECTION** — Correction des routes non conformes au format API cible
- **API-03 — AUDIT** — Audit de cohérence des erreurs API
- **API-04 — CORRECTION** — Harmonisation minimale des erreurs critiques
- **API-05 — VALIDATION** — Vérification de cohérence API/UI sur les modules déjà présents
- **API-06 — VALIDATION** — Validation du socle API ALPHA
- **CLOTURE_A1 — VALIDATION** — Clôture finale du bloc A1


#### Résultat attendu
- authentification recontrôlée
- cloisonnement multi-tenant vérifié
- rôles et permissions alignés
- API plus cohérente
- base d’accès fiable avant le reste

---

### BLOC A2 — Structure société, profil société, bases / dépôts, rôle support
**Objectif du bloc**  
Mettre en place la structure d’exploitation réelle de la société pilote, y compris le rôle support propriétaire hors hiérarchie client.

#### Sessions
- **ORG-01 — AUDIT** — Audit du modèle société existant
- **ORG-02 — COMPLÉTION** — Ajout/correction des champs minimaux du profil société
- **ORG-03 — COMPLÉTION** — Édition UI du profil société
- **ORG-04 — VALIDATION** — Validation du profil société

- **BASE-01 — AUDIT** — Audit de l’absence / présence partielle des bases/dépôts
- **BASE-02 — COMPLÉTION** — Création du modèle base/dépôt
- **BASE-03 — COMPLÉTION** — API création base/dépôt
- **BASE-04 — COMPLÉTION** — API modification base/dépôt
- **BASE-05 — COMPLÉTION** — API désactivation/archivage base/dépôt
- **BASE-06 — COMPLÉTION** — UI gestion des bases/dépôts
- **BASE-07 — COMPLÉTION** — Rattachement d’un véhicule à une base
- **BASE-08 — COMPLÉTION** — Rattachement d’un utilisateur à une base
- **BASE-09 — COMPLÉTION** — Rattachement d’un shift à une base
- **BASE-10 — AUDIT** — Arbitrage technique et produit du lien template ↔ base
- **BASE-11 — VALIDATION** — Validation du bloc bases/dépôts

- **SUP-01 — AUDIT** — Audit du besoin réel support propriétaire dans l’existant
- **SUP-02 — COMPLÉTION** — Modélisation du rôle support global distinct des rôles client
- **SUP-03 — COMPLÉTION** — Ajout du compte support nominatif
- **SUP-04 — COMPLÉTION** — Gestion de la visibilité support côté client
- **SUP-05 — COMPLÉTION** — Traçabilité renforcée des actions support
- **SUP-06 — VALIDATION** — Validation du bloc support propriétaire
- **CLOTURE_A2 — VALIDATION** — Clôture finale du bloc A2


#### Résultat attendu
- profil société exploitable
- bases/dépôts administrables
- rôle support cadré et traçable

---

### BLOC A3 — Utilisateurs
**Objectif du bloc**  
Reprendre entièrement l’administration utilisateurs pour obtenir un module réellement exploitable.

#### Sessions
- **USERS-01 — AUDIT** — Audit complet du module users existant
- **USERS-02 — VALIDATION** — Vérification de la liste utilisateurs existante
- **USERS-03 — CORRECTION** — Correction / stabilisation de la liste utilisateurs si nécessaire
- **USERS-04 — COMPLÉTION** — API création utilisateur
- **USERS-05 — COMPLÉTION** — UI création utilisateur
- **USERS-06 — COMPLÉTION** — API modification utilisateur
- **USERS-07 — COMPLÉTION** — UI modification utilisateur
- **USERS-08 — COMPLÉTION** — Désactivation / archivage utilisateur
- **USERS-09 — VALIDATION** — Vérification de l’absence de suppression physique non souhaitée
- **USERS-10 — COMPLÉTION** — Affectation rôle principal + permissions lors de l’édition
- **USERS-11 — COMPLÉTION** — Rattachement utilisateur à une base
- **USERS-12 — AUDIT** — Audit du besoin absences / indisponibilités
- **USERS-13 — COMPLÉTION** — API indisponibilités / absences
- **USERS-14 — COMPLÉTION** — UI indisponibilités / absences
- **USERS-15 — COMPLÉTION** — Consultation du planning utilisateur / collègues selon permissions
- **USERS-16 — VALIDATION** — Validation complète du bloc users
- **CLOTURE_A3 — VALIDATION** — Clôture finale du bloc A3


#### Résultat attendu
- vrai module users administrable
- absences intégrées
- cohérence permissions / planning / base

---

### BLOC A4 — Véhicules et conformité documentaire minimale
**Objectif du bloc**  
Reprendre le module flotte pour le rendre réellement complet, correct et conforme au cadrage.

#### Sessions
- **VEH-01 — AUDIT** — Audit complet du module véhicules existant
- **VEH-02 — VALIDATION** — Vérification de la liste véhicules existante
- **VEH-03 — CORRECTION** — Correction / stabilisation du listing véhicules si nécessaire
- **VEH-04 — VALIDATION** — Vérification de la création véhicule existante
- **VEH-05 — CORRECTION** — Correction de la création véhicule si nécessaire
- **VEH-06 — COMPLÉTION** — API modification véhicule
- **VEH-07 — COMPLÉTION** — UI modification véhicule
- **VEH-08 — COMPLÉTION** — API désactivation / archivage véhicule
- **VEH-09 — COMPLÉTION** — UI désactivation / archivage véhicule
- **VEH-10 — VALIDATION** — Contrôle de la non-suppression physique non souhaitée
- **VEH-11 — COMPLÉTION** — Rattachement véhicule à une base
- **VEH-12 — AUDIT** — Audit de l’affectation véhicule au planning existant
- **VEH-13 — CORRECTION** — Correction/remise à niveau de l’affectation véhicule si nécessaire
- **VEH-14 — COMPLÉTION** — Ajout des champs de conformité documentaire minimale
- **VEH-15 — COMPLÉTION** — UI édition des données de conformité documentaire minimale
- **VEH-16 — COMPLÉTION** — État visuel simple `conforme / bientôt expiré / expiré`
- **VEH-17 — VALIDATION** — Validation du bloc flotte ALPHA
- **CLOTURE_A4 — VALIDATION** — Clôture finale du bloc A4


#### Résultat attendu
- flotte complète
- conformité documentaire minimale intégrée
- affectation planning vérifiée et stabilisée

---

### BLOC A5 — Règles métier et paramètres société
**Objectif du bloc**  
Reprendre les règles existantes et les transformer en paramètres réellement métier et administrables.

#### Sessions
- **RULES-01 — AUDIT** — Audit complet du module company rules existant
- **RULES-02 — VALIDATION** — Vérification du modèle de règles actuel
- **RULES-03 — AUDIT** — Audit de l’usage réel des règles existantes dans le moteur
- **RULES-04 — CORRECTION** — Correction/remise à niveau des règles déjà utilisées
- **RULES-05 — COMPLÉTION** — Passage vers une couche de paramètres métier compréhensible
- **RULES-06 — COMPLÉTION** — API paramètres métier ALPHA
- **RULES-07 — COMPLÉTION** — UI paramètres métier ALPHA
- **RULES-08 — COMPLÉTION** — Gestion des droits de modification des règles
- **RULES-09 — VALIDATION** — Validation du bloc règles métier
- **CLOTURE_A5 — VALIDATION** — Clôture finale du bloc A5


#### Résultat attendu
- règles utilisables côté produit
- cohérence moteur / UI / permissions
- base stable pour planning et autoschedule

---

### BLOC A6 — Shift templates
**Objectif du bloc**  
Reprendre totalement les templates existants pour les rendre autonomes, vérifiés et conformes au cadrage.

#### Sessions
- **TPL-01 — AUDIT** — Audit complet des `ShiftTemplate` existants
- **TPL-02 — VALIDATION** — Vérification du schéma actuel des templates
- **TPL-03 — CORRECTION** — Correction/remise à niveau du modèle template si nécessaire
- **TPL-04 — COMPLÉTION** — API liste templates
- **TPL-05 — COMPLÉTION** — API création template
- **TPL-06 — COMPLÉTION** — API modification template
- **TPL-07 — COMPLÉTION** — API désactivation / archivage template
- **TPL-08 — COMPLÉTION** — UI gestion des templates
- **TPL-09 — COMPLÉTION** — Ajout de la composition minimale d’équipe
- **TPL-10 — COMPLÉTION** — Ajout du type de véhicule requis
- **TPL-11 — COMPLÉTION** — Ajout du nombre de personnes requis
- **TPL-12 — COMPLÉTION** — Support des shifts non horodatés
- **TPL-13 — COMPLÉTION** — Couleurs libres et lisibilité visuelle
- **TPL-14 — VALIDATION** — Validation du bloc templates
- **CLOTURE_A6 — VALIDATION** — Clôture finale du bloc A6


#### Résultat attendu
- templates réellement administrables
- fondation correcte pour planning, autoschedule, matching

---

### BLOC A7 — Dashboard
**Objectif du bloc**  
Reprendre le dashboard existant pour en faire d’abord un portail d’accès stable, puis seulement un support d’indicateurs simples si les données sont fiables.

#### Règle verrouillée du bloc
Le **Dashboard ALPHA** commence comme :
- portail d’accès
- point d’entrée
- distribution des accès selon permissions
- orientation utilisateur selon rôle

Il ne commence pas comme :
- tableau de bord riche
- cockpit analytique
- écran dépendant de données encore instables

#### Sessions
- **DASH-01 — AUDIT** — Audit complet du dashboard existant
- **DASH-02 — CORRECTION** — Correction du dashboard actuel si nécessaire
- **DASH-03 — COMPLÉTION** — Dashboard portail d’accueil
- **DASH-04 — COMPLÉTION** — Gestion d’accès aux modules selon permissions
- **DASH-05 — COMPLÉTION** — Dashboard différencié par rôle
- **DASH-06 — COMPLÉTION** — Ajout des indicateurs simples admin/gérant si les données sont stabilisées
- **DASH-07 — COMPLÉTION** — Ajout de la vue dashboard terrain selon permissions
- **DASH-08 — VALIDATION** — Validation du bloc dashboard
- **CLOTURE_A7 — VALIDATION** — Clôture finale du bloc A7


#### Résultat attendu
- vrai point d’entrée produit
- dashboard utile sans dépendance excessive à des données encore instables
- base saine avant tout enrichissement analytique

---

### BLOC A8 — Planning manuel
**Objectif du bloc**  
Reprendre l’existant planning pour le vérifier de fond en comble et le rendre vraiment exploitable avant toute confiance dans l’automatisation.

#### Sessions
- **PLAN-01 — AUDIT** — Audit complet du planning existant
- **PLAN-02 — VALIDATION** — Vérification de la vue semaine actuelle
- **PLAN-03 — CORRECTION** — Correction/remise à niveau de la vue semaine si nécessaire
- **PLAN-04 — AUDIT** — Audit de la vue jour
- **PLAN-05 — AUDIT** — Audit de la vue mois existante
- **PLAN-06 — COMPLÉTION** — Création de la vraie vue mois exploitable
- **PLAN-07 — COMPLÉTION** — Navigation mensuelle
- **PLAN-08 — COMPLÉTION** — Lisibilité métier globale du planning
- **PLAN-09 — COMPLÉTION** — API ajout manuel de shift
- **PLAN-10 — COMPLÉTION** — UI ajout manuel de shift
- **PLAN-11 — COMPLÉTION** — API modification d’un shift publié
- **PLAN-12 — COMPLÉTION** — UI modification d’un shift publié
- **PLAN-13 — COMPLÉTION** — API suppression métier / annulation logique d’un shift publié
- **PLAN-14 — COMPLÉTION** — UI suppression métier / annulation logique d’un shift publié
- **PLAN-15 — VALIDATION** — Vérification complète de la traçabilité des modifications après publication
- **PLAN-16 — AUDIT** — Audit de l’historique minimal planning existant
- **PLAN-17 — CORRECTION** — Remise à niveau de l’historique minimal planning si non conforme
- **PLAN-18 — COMPLÉTION** — Compléter l’historique minimal planning si incomplet
- **PLAN-19 — VALIDATION** — Validation complète du bloc planning
- **CLOTURE_A8 — VALIDATION** — Clôture finale du bloc A8

#### Sessions VScode
- **PLAN-01 — AUDIT** — Audit complet du planning manuel existant : vue semaine, vue jour, vue mois, navigation mensuelle, lisibilité métier, ajout/modification/annulation de shifts publiés, historique minimal et traçabilité après publication
- **PLAN-LOT-02-18 — CORRECTION-COMPLÉTION** — Correction et/ou complétion de la vue semaine, de la vue jour, de la vraie vue mois exploitable, de la navigation mensuelle, de la lisibilité métier globale, de l’API/UI d’ajout manuel de shift, de l’API/UI de modification d’un shift publié, de l’API/UI de suppression métier / annulation logique d’un shift publié, de l’historique minimal planning et de la traçabilité des modifications après publication
- **PLAN-19 — VALIDATION** — Validation complète du bloc planning manuel : cohérence des vues jour / semaine / mois, exploitabilité quotidienne, gestion correcte des modifications publiées, historique minimal et traçabilité
- **CLOTURE_A8 — VALIDATION+CORRECTION+COMPLÉTION** — Clôture finale du bloc A8


#### Résultat attendu
- planning manuel solide
- modifications publiées correctement gérées
- vraie base d’exploitation quotidienne

---

### BLOC A9 — Autoschedule
**Objectif du bloc**  
Reprendre le moteur existant pour vérifier qu’il est réellement cohérent, complet et conforme au cadrage ALPHA.

#### Sessions
- **AUTO-01 — AUDIT** — Audit complet de l’autoschedule existant
- **AUTO-02 — VALIDATION** — Vérification de la génération JOUR
- **AUTO-03 — VALIDATION** — Vérification de la génération SEMAINE
- **AUTO-04 — CORRECTION** — Correction/remise à niveau des générations existantes si nécessaire
- **AUTO-05 — COMPLÉTION** — Choix gérant : génération shifts seuls
- **AUTO-06 — COMPLÉTION** — Choix gérant : génération avec affectation automatique
- **AUTO-07 — COMPLÉTION** — Intégration des indisponibilités utilisateurs
- **AUTO-08 — COMPLÉTION** — Intégration des indisponibilités véhicules
- **AUTO-09 — COMPLÉTION** — Intégration des contraintes de rôles sur véhicules
- **AUTO-10 — VALIDATION** — Vérification de la prise en compte du repos minimum
- **AUTO-11 — COMPLÉTION** — Formalisation des signalements métier du moteur
- **AUTO-12 — AUDIT** — Audit de la traduction française existante de l’autoschedule
- **AUTO-13 — CORRECTION** — Correction des libellés autoschedule non conformes en français
- **AUTO-14 — COMPLÉTION** — Compléter la traduction française des éléments autoschedule manquants
- **AUTO-15 — VALIDATION** — Validation du bloc autoschedule ALPHA
- **CLOTURE_A9 — VALIDATION** — Clôture finale du bloc A9

#### Sessions VScode
- **AUTO-01 — AUDIT** — Audit complet de l’autoschedule existant : génération JOUR, génération SEMAINE, prise en compte réelle des contraintes ALPHA, signalements métier du moteur et traduction française existante
- **AUTO-LOT-02-14 — CORRECTION-COMPLÉTION** — Correction et/ou complétion des générations existantes, du choix gérant entre génération de shifts seuls ou génération avec affectation automatique, de l’intégration des indisponibilités utilisateurs et véhicules, des contraintes de rôles sur véhicules, du repos minimum, des signalements métier et de la traduction française des éléments autoschedule
- **AUTO-15 — VALIDATION** — Validation complète du bloc autoschedule ALPHA : cohérence des générations JOUR / SEMAINE, prise en compte effective des contraintes ALPHA, compréhension des signalements métier et cohérence des libellés français
- **CLOTURE_A9 — VALIDATION+CORRECTION+COMPLÉTION** — Clôture finale du bloc A9


#### Résultat attendu
- moteur revérifié
- contraintes ALPHA effectivement intégrées
- signalements métier compréhensibles
- aucune confiance aveugle dans l’existant

---

### BLOC A10 — Matching
**Objectif du bloc**  
Reprendre le matching existant pour le réaligner sur le cadrage validé.

#### Sessions
- **MATCH-01 — AUDIT** — Audit complet du matching existant
- **MATCH-02 — VALIDATION** — Vérification du scoring qualité existant
- **MATCH-03 — CORRECTION** — Correction/remise à niveau du scoring si nécessaire
- **MATCH-04 — COMPLÉTION** — Alignement du matching sur la composition minimale d’équipe
- **MATCH-05 — COMPLÉTION** — Alignement du matching sur les véhicules requis
- **MATCH-06 — VALIDATION** — Vérification de la logique d’équilibre de charge
- **MATCH-07 — COMPLÉTION** — Score qualité visible au niveau run
- **MATCH-08 — COMPLÉTION** — Score qualité visible au niveau shift
- **MATCH-09 — COMPLÉTION** — Variante 1 / 2 / 3 simple
- **MATCH-10 — VALIDATION** — Validation du bloc matching ALPHA
- **CLOTURE_A10 — VALIDATION** — Clôture finale du bloc A10

#### Sessions VScode
- **MATCH-01 — AUDIT** — Audit complet du matching existant : scoring qualité, logique d’équilibre de charge, prise en compte de la composition minimale d’équipe, des véhicules requis, des variantes simples et de la visibilité du score qualité
- **MATCH-LOT-02-09 — CORRECTION-COMPLÉTION** — Correction et/ou complétion du scoring, de l’alignement du matching sur la composition minimale d’équipe, de l’alignement sur les véhicules requis, de la logique d’équilibre de charge, de la visibilité du score qualité au niveau run et shift, et des variantes 1 / 2 / 3 simples
- **MATCH-10 — VALIDATION** — Validation complète du bloc matching ALPHA : cohérence du scoring, prise en compte correcte des contraintes équipe / véhicule / charge, lisibilité du score qualité et disponibilité de variantes simples
- **CLOTURE_A10 — VALIDATION+CORRECTION+COMPLÉTION** — Clôture finale du bloc A10


#### Résultat attendu
- matching contrôlé et réaligné
- score qualité plus cohérent
- variantes simples disponibles

---

### BLOC A11 — Audit / traçabilité
**Objectif du bloc**  
Reprendre l’audit minimal existant et le transformer en vraie traçabilité exploitable.

#### Sessions
- **AUDIT-01 — AUDIT** — Audit complet du module audit existant
- **AUDIT-02 — VALIDATION** — Vérification de la lecture d’audit run courant
- **AUDIT-03 — CORRECTION** — Correction/remise à niveau de l’audit planning existant si nécessaire
- **AUDIT-04 — COMPLÉTION** — Ajout de l’audit des connexions
- **AUDIT-05 — COMPLÉTION** — Ajout de l’audit utilisateurs
- **AUDIT-06 — COMPLÉTION** — Ajout de l’audit véhicules
- **AUDIT-07 — COMPLÉTION** — Page dédiée audit
- **AUDIT-08 — COMPLÉTION** — Modèle d’accès audit : rôles natifs + permission dédiée
- **AUDIT-09 — COMPLÉTION** — Audit renforcé des actions support
- **AUDIT-10 — VALIDATION** — Validation complète du bloc audit
- **CLOTURE_A11 — VALIDATION** — Clôture finale du bloc A11

#### Sessions VScode
- **AUDIT-01 — AUDIT** — Audit complet du module audit existant : lecture d’audit du run courant, couverture des opérations critiques, traçabilité des modifications après publication, page dédiée audit, modèle d’accès audit et audit renforcé des actions support
- **AUDIT-LOT-02-09 — CORRECTION-COMPLÉTION** — Correction et/ou complétion de l’audit planning existant, de l’audit des connexions, de l’audit utilisateurs, de l’audit véhicules, de la traçabilité détaillée des modifications après publication, de la page dédiée audit, du modèle d’accès audit et de l’audit renforcé des actions support
- **AUDIT-10 — VALIDATION** — Validation complète du bloc audit / traçabilité : couverture réelle des opérations critiques, lisibilité et exploitabilité de la page audit, cohérence du modèle d’accès et transparence support / client
- **CLOTURE_A11 — VALIDATION+CORRECTION+COMPLÉTION** — Clôture finale du bloc A11


#### Résultat attendu
- audit réellement exploitable
- couverture des opérations critiques
- transparence support/client

---

### BLOC A12 — Exports, onboarding et imports
**Objectif du bloc**  
Rendre l’installation et l’exploitation d’une société pilote réalistes, tout en gardant les imports non bloquants.

#### Sessions
- **ONB-01 — AUDIT** — Audit de l’onboarding actuel réel
- **ONB-02 — COMPLÉTION** — Construction de l’onboarding manuel complet société pilote
- **ONB-03 — VALIDATION** — Validation de l’onboarding manuel sans import

- **EXPORT-01 — COMPLÉTION** — Export PDF planning
- **EXPORT-02 — COMPLÉTION** — Export Excel / CSV planning
- **EXPORT-03 — COMPLÉTION** — Impression simple planning

- **IMPORT-01 — AUDIT** — Audit du besoin import initial réel
- **IMPORT-02 — COMPLÉTION** — Import utilisateurs
- **IMPORT-03 — COMPLÉTION** — Import véhicules
- **IMPORT-04 — COMPLÉTION** — Import templates
- **IMPORT-05 — COMPLÉTION** — Import bases/dépôts
- **IMPORT-06 — COMPLÉTION** — Import indisponibilités utilisateurs
- **IMPORT-07 — COMPLÉTION** — Aperçu avant import
- **IMPORT-08 — COMPLÉTION** — Validation manuelle d’import
- **IMPORT-09 — COMPLÉTION** — Rapport d’erreurs import
- **IMPORT-10 — VALIDATION** — Validation du bloc onboarding/import/export
- **CLOTURE_A12 — VALIDATION** — Clôture finale du bloc A12

#### Sessions VScode
- **A12-01 — AUDIT** — Audit global du bloc onboarding / exports / imports : onboarding actuel réel, besoin import initial réel, existant réel côté exports et impression, et cohérence globale du bloc
- **A12-LOT-02-15 — CORRECTION-COMPLÉTION** — Correction et/ou complétion de l’onboarding manuel complet société pilote, des exports PDF / Excel-CSV / impression simple du planning, des imports utilisateurs / véhicules / templates / bases-dépôts / indisponibilités utilisateurs, de l’aperçu avant import, de la validation manuelle d’import et du rapport d’erreurs import
- **A12-16 — VALIDATION** — Validation complète du bloc onboarding / import / export : onboarding manuel sans import, disponibilité des exports ALPHA, cohérence de la logique d’import initial simple et exploitabilité réelle pour une société pilote
- **CLOTURE_A12 — VALIDATION+CORRECTION+COMPLÉTION** — Clôture finale du bloc A12

#### Résultat attendu
- société pilote installable
- onboarding manuel complet garanti
- imports utiles mais non bloquants
- exports ALPHA disponibles

---

### BLOC A13 — Qualité, documentation, gel ALPHA
**Objectif du bloc**  
Finaliser l’ALPHA avec une vraie logique de contrôle qualité et une documentation d’usage minimale.

#### Sessions
- **QA-01 — AUDIT** — Audit global des tests existants
- **QA-02 — AUDIT** — Audit des scénarios manuels documentés existants
- **QA-03 — CORRECTION** — Correction des scénarios manuels non conformes
- **QA-04 — COMPLÉTION** — Compléter les scénarios manuels manquants
- **QA-05 — COMPLÉTION** — Smoke tests API critiques
- **QA-06 — COMPLÉTION** — Tests ciblés sur blocs sensibles

- **DOC-01 — AUDIT** — Audit de la documentation produit existante
- **DOC-02 — COMPLÉTION** — Documentation d’usage users
- **DOC-03 — COMPLÉTION** — Documentation d’usage véhicules
- **DOC-04 — COMPLÉTION** — Documentation d’usage templates
- **DOC-05 — COMPLÉTION** — Documentation d’usage planning / autoschedule

- **ALPHA-01 — AUDIT** — Audit final de cohérence ALPHA
- **ALPHA-02 — CORRECTION** — Corrections finales ALPHA
- **ALPHA-03 — VALIDATION** — Go / No-Go société pilote
- **CLOTURE_A13 — VALIDATION** — Clôture finale du bloc A13

#### Sessions VScode
- **A13-01 — AUDIT** — Audit global du bloc qualité / documentation / gel ALPHA : tests existants, scénarios manuels documentés, documentation produit existante et cohérence finale ALPHA
- **A13-LOT-02-13 — CORRECTION-COMPLÉTION** — Correction et/ou complétion des scénarios manuels non conformes ou manquants, des smoke tests API critiques, des tests ciblés sur blocs sensibles, de la documentation d’usage users / véhicules / templates / planning-autoschedule, et corrections finales ALPHA si nécessaire
- **A13-14 — VALIDATION** — Validation complète du bloc qualité / documentation / gel ALPHA : cohérence finale ALPHA, niveau de test atteignable, documentation d’usage minimale disponible et décision Go / No-Go société pilote
- **CLOTURE_A13 — VALIDATION+CORRECTION+COMPLÉTION** — Clôture finale du bloc A13

#### Résultat attendu
- ALPHA testable
- documentation d’usage minimale
- décision propre d’entrée en test réel entreprise

## 12. ALPHA — Suite active / consolidation A14 à A27

L’ALPHA 1.0 est considérée comme clôturée sur son cycle de tests locaux et de validation du socle actuel.

En revanche, le produit ALPHA n’est pas terminé. La suite du projet se poursuit donc sous la forme de nouveaux blocs ALPHA, structurés selon la même logique méthodologique que les blocs A1 à A13 :
- 1ère session : **AUDIT**
- 2ème session : **CORRECTION+COMPLÉTION**
- 3ème session : **VALIDATION**
- 4ème session : **CLOTURE : AUDIT+CORRECTION+COMPLÉTION+VALIDATION**

### BLOC A14 — Backend
**Objectif du bloc**  
Structurer et renforcer le backend existant sans casser les routes ni les usages actuels.

#### Sessions
- **BACK-01 — AUDIT** — Audit complet du backend existant : routes API, services métier, validations serveur, accès Prisma, cohérence des erreurs et séparation des responsabilités
- **BACK-LOT-02 — CORRECTION+COMPLÉTION** — Correction et/ou complétion de la structure backend : services métier, validations serveur, gestion homogène des erreurs, centralisation des traitements sensibles et cohérence des contrôles RBAC côté serveur
- **BACK-03 — VALIDATION** — Validation complète du backend : cohérence API / logique métier / Prisma / permissions
- **CLOTURE_A14 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION** — Clôture finale du bloc Backend

#### Résultat attendu
- backend plus structuré
- logique métier plus claire
- routes plus homogènes
- socle serveur plus fiable

---

### BLOC A15 — Frontend
**Objectif du bloc**  
Améliorer la lisibilité, la cohérence et l’ergonomie générale des écrans existants.

#### Sessions
- **FRONT-01 — AUDIT** — Audit complet du frontend existant : cohérence visuelle, lisibilité, navigation, composants critiques, thème, dashboard, users, vehicles, templates, planning
- **FRONT-LOT-02 — CORRECTION+COMPLÉTION** — Correction et/ou complétion du frontend : homogénéisation visuelle, amélioration des écrans critiques, lisibilité métier, gestion cohérente du thème, préparation d’une UX plus propre
- **FRONT-03 — VALIDATION** — Validation complète du frontend : lisibilité, cohérence des parcours, stabilité des écrans critiques
- **CLOTURE_A15 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION** — Clôture finale du bloc Frontend

#### Résultat attendu
- UI plus cohérente
- meilleure lisibilité
- parcours plus propres
- base saine avant refonte graphique plus large

---

### BLOC A16 — Sécurité
**Objectif du bloc**  
Renforcer le socle sécurité minimal avant d’étendre davantage les fonctionnalités.

#### Sessions
- **SEC-01 — AUDIT** — Audit complet de la sécurité existante : auth, sessions, contrôles d’accès, routes sensibles, secrets, variables d’environnement, audit logs, protections de base
- **SEC-LOT-02 — CORRECTION+COMPLÉTION** — Correction et/ou complétion du socle sécurité : durcissement auth/session, validation des entrées, protection des routes sensibles, règles de mots de passe, gestion des secrets, base de sauvegarde/restauration
- **SEC-03 — VALIDATION** — Validation complète du bloc sécurité : cohérence des accès, robustesse minimale, non-régression sur les flux critiques
- **CLOTURE_A16 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION** — Clôture finale du bloc Sécurité

#### Résultat attendu
- sécurité minimale renforcée
- contrôles d’accès plus fiables
- meilleure protection des parcours critiques
- base sérieuse avant ouverture métier plus large

---

### BLOC A17 — RGPD
**Objectif du bloc**  
Mettre en place une base de conformité RGPD minimale et exploitable.

#### Sessions
- **RGPD-01 — AUDIT** — Audit complet des données personnelles manipulées : utilisateurs, absences, audit, accès, finalités, rôles d’accès, conservation, export/correction/suppression
- **RGPD-LOT-02 — CORRECTION+COMPLÉTION** — Correction et/ou complétion de la base RGPD : cartographie des données, finalités, accès, conservation, registre de traitement, besoins d’export/correction/suppression, mentions d’information
- **RGPD-03 — VALIDATION** — Validation complète du bloc RGPD : cohérence documentaire et base de conformité minimale
- **CLOTURE_A17 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION** — Clôture finale du bloc RGPD

#### Résultat attendu
- base RGPD claire
- données personnelles cartographiées
- premières règles de conservation et d’accès définies
- conformité minimale préparée proprement

---

### BLOC A18 — BDD / Prisma / migrations / environnements
**Objectif du bloc**  
Fiabiliser durablement la base de données et éviter les écarts entre schéma, migrations et base réelle.

#### Sessions
- **BDD-01 — AUDIT** — Audit complet de la chaîne BDD existante : Prisma schema, migrations, seed, base locale, environnements, drifts potentiels, cohérence schéma ↔ base
- **BDD-LOT-02 — CORRECTION+COMPLÉTION** — Correction et/ou complétion de la chaîne BDD : migrations, colonnes manquantes, contraintes, relations, seeds, clarification des environnements, documentation des opérations sensibles
- **BDD-03 — VALIDATION** — Validation complète du bloc BDD : Prisma / migrations / base / seed / environnements
- **CLOTURE_A18 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION** — Clôture finale du bloc BDD

#### Résultat attendu
- base plus fiable
- moins de drift
- migrations mieux gouvernées
- environnements plus clairs

---

### BLOC A19 — Planning avancé
**Objectif du bloc**  
Rendre le planning réellement plus exploitable au quotidien.

#### Sessions
- **PLAN-ADV-01 — AUDIT** — Audit complet des besoins planning avancé : affichages multiples, sélection multiple, affectation utilisateur, vue globale/personnelle/binôme, lisibilité opérationnelle
- **PLAN-ADV-LOT-02 — CORRECTION+COMPLÉTION** — Correction et/ou complétion du planning avancé : affectation à un shift, sélection multiple, modes de vue, visibilité globale/personnelle/binôme
- **PLAN-ADV-03 — VALIDATION** — Validation complète du bloc planning avancé : exploitabilité terrain, gain de temps, cohérence métier
- **CLOTURE_A19 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION** — Clôture finale du bloc Planning avancé

#### Résultat attendu
- planning plus exploitable
- affectations plus claires
- vues mieux adaptées
- usage quotidien facilité

---

### BLOC A20 — RH / Utilisateurs avancés
**Objectif du bloc**  
Compléter le module utilisateurs avec les besoins métier restants.

#### Sessions
- **RH-01 — AUDIT** — Audit complet des besoins RH restants : demandes d’absence, création utilisateur enrichie, stagiaires, horaires journaliers, contraintes métier associées
- **RH-LOT-02 — CORRECTION+COMPLÉTION** — Correction et/ou complétion du module RH : demandes d’absence, nom/prénom/initiales, gestion des stagiaires, premiers éléments d’horaires journaliers selon cadrage validé
- **RH-03 — VALIDATION** — Validation complète du bloc RH / utilisateurs avancés
- **CLOTURE_A20 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION** — Clôture finale du bloc RH

#### Résultat attendu
- module users plus complet
- absences mieux gérées
- création utilisateur enrichie
- base RH plus exploitable

---

### BLOC A21 — UI / UX / Navigation

**Objectif du bloc**  
Améliorer l’expérience produit, la navigation générale, la lisibilité des écrans et la cohérence visuelle de l’application avant poursuite des tests ALPHA et préparation de l’Alpha commerciale.

#### Sessions
- **UX-01 — CADRAGE** — Cadrage initial UI/UX, analyse des écrans existants, définition de la direction artistique cible et des priorités de maquettage.
- **UX-02 — DESIGN SYSTEM** — Formalisation du design system UI/UX ALPHA : shell, sidebar, topbar, couleurs, cards, badges, tableaux, drawers, formulaires et règles visuelles communes.
- **UX-03 — MAQUETTES FONDATRICES** — Production et validation des maquettes principales : Dashboard, Planning, Utilisateurs / RH, Véhicules.
- **UX-04 — MAQUETTES COMPLÉMENTAIRES** — Production et validation des maquettes métier complémentaires : Templates, Société, Dépôts, Onboarding, Audit.
- **UX-05 — PAGES SIMPLES / FINITIONS** — Production et validation des pages simples : Login et Privacy.
- **UX-06 — RÉFÉRENCE UI/UX CODEX** — Consolidation de la référence UI/UX ALPHA exploitable pour une future intégration React / Next.js / Tailwind.
- **UX-07 — CLÔTURE DOCUMENTAIRE UI/UX** — Clôture documentaire du chantier UI/UX, sans intégration code.
- **UX-08 — PRÉPARATION INTÉGRATION CODE** — Préparation de l’intégration progressive de la nouvelle UI/UX dans le code existant, sans modification applicative immédiate.
- **CLOTURE_A21 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION** — Validation finale du bloc UI/UX / Navigation avant lancement des sessions d’intégration code.

#### Résultat attendu
- direction artistique ALPHA validée
- design system UI/UX documenté
- maquettes de référence validées
- référence UI/UX exploitable par Codex produite
- distinction claire entre validation documentaire UI/UX et intégration code
- base propre pour intégrer progressivement la nouvelle UI/UX dans l’application
- application prête à poursuivre les tests ALPHA avec une UI/UX mieux cadrée

---

### BLOC A22 — Intégration code UI/UX / Navigation

**Objectif du bloc**  
Intégrer dans le code l’interface UI/UX validée lors du bloc A21, en respectant strictement la référence visuelle, les maquettes validées, la direction artistique figée, les règles UI documentées et les réserves actées.

#### Point de cadrage
Le bloc A22 est le bloc d’intégration code de l’UI/UX validée en A21.

A22 s’appuie obligatoirement sur :
- la référence UI/UX ALPHA validée ;
- les maquettes validées du bloc A21 ;
- le design system documentaire ;
- la direction artistique figée ;
- les décisions de clôture du bloc A21 ;
- les réserves documentées, notamment sur `Privacy_V1.0`.

A22 ne doit pas :
- rouvrir la direction artistique ;
- produire une nouvelle maquette ;
- modifier le cadrage produit ;
- modifier la logique métier hors nécessité strictement liée à l’intégration UI ;
- mélanger refonte visuelle et évolution fonctionnelle ;
- considérer A21 comme déjà intégré dans le code.

A22 doit transformer progressivement la référence UI/UX validée en composants, structures et écrans réellement intégrés dans l’application.

#### Sessions
- **A22-UIINT-01 — CORRECTION+COMPLÉTION** — Shell structurel : sidebar, topbar et zone main. Livrable attendu : shell appliqué sur les pages connectées. DoD : shell stable, responsive de base, navigation non régressive.
- **A22-UIINT-02 — CORRECTION+COMPLÉTION** — Navigation complète permissions : entrées de navigation, états actifs et affichage selon permissions. Livrable attendu : navigation complète et cohérente. DoD : aucun lien mort, affichage conforme aux permissions.
- **A22-UIINT-03 — CORRECTION+COMPLÉTION** — Socle composants UI communs : `PageHeader`, `ActionButton`, `StatusBadge`, `EmptyState`, `ErrorMessage`. Livrable attendu : socle UI mutualisé. DoD : composants réutilisables sans impact métier.
- **A22-UIINT-04 — CORRECTION+COMPLÉTION** — Tables / filtres / cartes statistiques : `DataTable`, `FilterBar`, `StatCard`. Livrable attendu : surfaces data homogènes. DoD : états loading / empty / error couverts.
- **A22-UIINT-05 — CORRECTION+COMPLÉTION** — Dashboard : intégration de l’UI dashboard alignée sur la référence A21. Livrable attendu : dashboard harmonisé. DoD : parcours dashboard lisible et cohérent.
- **A22-UIINT-06 — CORRECTION+COMPLÉTION** — Planning : harmonisation UI du planning uniquement. Livrable attendu : planning harmonisé. DoD : lisibilité métier conservée, sans régression fonctionnelle.
- **A22-UIINT-07 — CORRECTION+COMPLÉTION** — Users : harmonisation UI du module utilisateurs / RH. Livrable attendu : écrans users harmonisés. DoD : formulaires et listes users cohérents.
- **A22-UIINT-08 — CORRECTION+COMPLÉTION** — Vehicles : harmonisation UI du module véhicules. Livrable attendu : écrans vehicles harmonisés. DoD : formulaires et listes vehicles cohérents.
- **A22-UIINT-09 — CORRECTION+COMPLÉTION** — Templates : harmonisation UI du module templates. Livrable attendu : écrans templates harmonisés. DoD : édition et listes templates cohérentes.
- **A22-UIINT-10 — CORRECTION+COMPLÉTION** — Company / Dépôts : harmonisation UI des pages société et dépôts. Livrable attendu : cohérence visuelle des modules structure. DoD : formulaires et listes alignés avec le socle UI.
- **A22-UIINT-11 — CORRECTION+COMPLÉTION** — Onboarding : harmonisation UI de l’onboarding. Livrable attendu : écran onboarding harmonisé. DoD : étapes lisibles et cohérentes.
- **A22-UIINT-12 — CORRECTION+COMPLÉTION** — Audit : harmonisation UI du journal d’audit. Livrable attendu : écran audit harmonisé. DoD : filtres et lecture audit lisibles.
- **A22-UIINT-13 — CORRECTION+COMPLÉTION** — Login / Privacy : intégration visuelle des pages simples. Livrable attendu : alignement visuel des pages login et privacy. DoD : cohérence avec les références `Login_V1.1` et `Privacy_V1.0`.
- **CLOTURE_A22 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION** — Clôture finale du bloc intégration code UI/UX / Navigation. Vérification et correction (si besoin) complète de **A22-UIINT-01 à A22-UIINT-13**.

#### Résultat attendu
- shell applicatif intégré ;
- navigation complète et cohérente ;
- composants UI communs mutualisés ;
- surfaces data homogènes ;
- dashboard aligné sur la référence A21 ;
- planning harmonisé sans perte de lisibilité métier ;
- modules users, vehicles, templates, company, dépôts, onboarding et audit harmonisés ;
- pages login et privacy alignées avec les références validées ;
- cohérence visuelle globale réellement présente dans le code ;
- absence de nouvelle direction artistique ;
- absence de régression fonctionnelle ;
- bloc prêt à être clôturé par verdict explicite.


### BLOC A23 — Stabilisation post-test manuel ADMIN / Go-No-Go société pilote

**Objectif du bloc**  
Traiter les constats issus de `SESSION-20260503_TEST-LOCAL-02` avant toute présentation société pilote, sans mélanger corrections immédiates, réalignement UI/UX, reprise planning et backlog futur.

#### Point de cadrage
Le bloc A23 ne remplace pas les blocs A1 à A22.  
Il sert de bloc de stabilisation post-test manuel, fondé sur des constats utilisateur réels.

A23 doit respecter l’ordre suivant :
- corriger d’abord ce qui empêche de tester correctement ;
- retester ensuite les modules dépendants ;
- auditer les écarts UI/UX avant de lancer une reprise visuelle globale ;
- ne pas transformer les sujets BETA / backlog en corrections ALPHA immédiates.

#### Sessions
- **A23-TEST-01 — AUDIT** — Reproduction ciblée et qualification technique des anomalies consolidées de `SESSION-20260503_TEST-LOCAL-02`. Livrable attendu : liste confirmée / non confirmée des anomalies. DoD : aucune correction lancée sans reproduction ou justification explicite.
- **A23-LOGIN-02 — CORRECTION** — Correction de l’hydratation session / shell après connexion. Livrable attendu : dashboard, sidebar, topbar, utilisateur, rôle et société cohérents dès l’arrivée post-login. DoD : plus besoin de rafraîchir manuellement pour obtenir une session visuelle correcte.
- **A23-USERS-03 — CORRECTION** — Correction du module utilisateurs ADMIN. Livrable attendu : liste, création, validation, édition, rôle, base et archivage exploitables. DoD : les utilisateurs créés sont visibles et disponibles pour les modules dépendants.
- **A23-USERS-04 — VALIDATION** — Retest ciblé utilisateurs + absences / indisponibilités. Livrable attendu : verdict clair sur users et sur les absences. DoD : distinguer ce qui est corrigé, ce qui reste KO et ce qui est à confirmer.
- **A23-UI-05 — AUDIT** — Audit d’écart UI/UX réel entre application intégrée et maquettes validées A21 / référence A22. Livrable attendu : matrice par page des écarts visuels. DoD : ne pas conclure sur une refonte UI sans comparaison factuelle écran par écran.
- **A23-UI-06 — CORRECTION+COMPLÉTION** — Réalignement UI/UX prioritaire si l’audit A23-UI-05 confirme l’écart. Livrable attendu : corrections visuelles ciblées sur les pages critiques. DoD : respect démontré des maquettes validées et de la direction artistique.
- **A23-PLAN-07 — AUDIT** — Audit ciblé du planning manuel après correction utilisateurs. Livrable attendu : état réel sur template → horaires, affectation personnel, modification et annulation logique. DoD : distinguer bug fonctionnel, problème métier et amélioration UX.
- **A23-PLAN-08 — CORRECTION+COMPLÉTION** — Correction / complétion du planning manuel prioritaire. Livrable attendu : affectation utilisateur exploitable, modification et annulation logique fonctionnelles, application cohérente des horaires template. DoD : parcours planning manuel ADMIN testable sans blocage majeur.
- **A23-ROLES-RH-09 — AUDIT** — Audit des besoins métier complémentaires : `PSC1`, plusieurs gérants, fiche salarié enrichie, suppression définitive contrôlée. Livrable attendu : arbitrage entre ALPHA, BETA et backlog. DoD : aucun champ RH ou rôle métier ajouté sans décision claire.
- **A23-GONOGO-10 — VALIDATION** — Retest ADMIN ciblé et décision Go / No-Go société pilote. Livrable attendu : verdict final post-corrections. DoD : décision explicite `GO`, `GO AVEC RÉSERVES` ou `NO-GO TEMPORAIRE`.
- **CLOTURE_A23 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION** — Clôture finale du bloc de stabilisation post-test manuel ADMIN.

#### Résultat attendu
- session post-login stable ;
- module utilisateurs exploitable ;
- absences retestées ou clairement classées ;
- UI/UX réelle comparée aux maquettes validées ;
- planning manuel stabilisé sur les usages ADMIN essentiels ;
- sujets métier complémentaires cadrés sans dérive ;
- nouveau verdict société pilote fiable.

---------------------------------------------------------------------------------------------------


### BLOC A24 — Réalignement UI/UX global sur MAQUETTE_DA

**Objectif du bloc**  
Réaligner l’ensemble de l’interface intégrée sur la direction artistique officielle `MAQUETTE_DA`, afin d’obtenir une application plus pure, plus simple, plus lisible et visuellement cohérente avant de poursuivre les travaux métier avancés.

Le bloc A24 intervient après la clôture A23.  
A23 a stabilisé les anomalies post-test manuel ADMIN.  
A24 traite désormais le réalignement UI/UX global de l’application, sans transformer ce bloc en refonte fonctionnelle ni en préparation de déploiement société pilote.

**Référence UI/UX officielle**  
La direction artistique officielle est exclusivement :

`docs/1-MASTER/MAQUETTE/MAQUETTE_DA`

En cas de contradiction entre anciens documents, anciennes captures, anciens prompts, anciennes interprétations ou références partielles, la référence prioritaire est :

`docs/1-MASTER/MAQUETTE/MAQUETTE_DA`

Les autres éléments du dossier `docs/1-MASTER/MAQUETTE/` peuvent servir de support d’analyse, de documentation, de mapping ou de référence complémentaire, mais ils ne doivent pas contredire `MAQUETTE_DA`.

**Principe directeur**  
A24 doit appliquer la DA officielle définie par `MAQUETTE_DA`.  
Aucune autre direction artistique ne doit être inventée ou priorisée.

Le travail doit viser :
- une interface très proche des maquettes validées ;
- une structure plus pure et plus simple ;
- une meilleure lisibilité ;
- une densité maîtrisée ;
- des composants cohérents ;
- des icônes propres ;
- une navigation claire ;
- une compatibilité mode clair / mode sombre ;
- des captures avant/après pour éviter de reproduire les erreurs précédentes.

**Mode sombre**  
Le mode sombre fait partie du périmètre A24.

Il doit être traité en français sous le nom **mode sombre**.

Le mode sombre doit être une déclinaison sobre de `MAQUETTE_DA` :
- fond général sombre ;
- textes clairs ;
- cartes et panneaux légèrement différenciés du fond ;
- bordures sobres ;
- boutons, badges, tableaux et états visuels lisibles ;
- conservation de l’identité visuelle officielle.

Le mode sombre ne doit pas être une simple inversion automatique noir/blanc.  
Le mode clair reste le thème principal de référence, avec un bouton visible permettant de basculer en mode sombre.

**Icônes**  
Les icônes doivent être auditées et classées.

L’ajout de `lucide-react` est autorisé pour les icônes génériques si cela améliore la propreté visuelle et évite les initiales ou pictogrammes approximatifs.

Les assets PNG/SVG doivent être conservés uniquement s’ils sont réellement spécifiques à Ambulance Manager, notamment logo, marque ou pictogrammes ambulance spécifiques.  
Les icônes génériques doivent être remplacées par des composants propres lorsque c’est pertinent.

**Périmètre**  
Le bloc A24 peut traiter :
- shell applicatif ;
- sidebar ;
- topbar ;
- navigation ;
- tokens couleurs clair / sombre ;
- bouton mode clair / mode sombre ;
- dashboard ;
- login ;
- société ;
- dépôts ;
- véhicules ;
- templates ;
- utilisateurs / RH visuel ;
- audit ;
- onboarding ;
- privacy ;
- pages simples ;
- boutons ;
- badges ;
- cards ;
- tableaux ;
- filtres ;
- drawers / panneaux ;
- icônes ;
- responsive minimal sans refonte mobile complète ;
- audit préparatoire du planning pour A25.

**Exclusions**  
Le bloc A24 ne doit pas traiter :
- refonte planning profonde ;
- nouveau moteur planning ;
- autoschedule complet ;
- matching complet ;
- règles métier avancées ;
- refonte RBAC ;
- rôle `PSC1` réel ;
- RH avancée ;
- saisie réelle des heures travaillées ;
- paie ;
- primes ;
- suppression physique généralisée ;
- RGPD complet ;
- sécurité avancée ;
- application mobile complète ;
- préparation société pilote ;
- déploiement.

A24 peut réorganiser visuellement l’information pour se rapprocher de `MAQUETTE_DA`, mais il ne doit pas supprimer silencieusement une donnée métier, casser un flux validé ou ajouter une fonctionnalité métier.

Si une page réelle contient plus d’informations que la maquette, la correction doit privilégier :
- repli ;
- panneau droit ;
- drawer ;
- onglets ;
- section secondaire ;
- hiérarchie visuelle plus claire.

#### Sessions

- **A24-UI-01 — AUDIT** — Audit global UI/UX et cadrage des références `MAQUETTE_DA`.  
  Objectif : officialiser les références UI/UX, vérifier les maquettes disponibles, classer les pages couvertes, auditer les icônes, cadrer le mode sombre, cadrer le responsive minimal et préparer l’ordre de correction.  
  Livrable attendu : rapport d’audit UI/UX avec matrice page → maquette → route → fichier code, classement des écarts, statut des icônes et recommandations de correction.  
  DoD : chaque page couverte possède un verdict visuel : conforme / non conforme / incomplet / à confirmer.

- **A24-UI-02 — CORRECTION+COMPLÉTION** — Socle UI partagé, mode clair / mode sombre et icônes.  
  Périmètre : tokens CSS, fond global, AppShell, Sidebar, Topbar, PageHeader, boutons, cards, badges, tableaux, filtres, drawers, bouton mode clair / mode sombre et icônes génériques.  
  Livrable attendu : patch code ciblé du socle visuel partagé.  
  DoD : les pages applicatives partagent une base visuelle cohérente avec `MAQUETTE_DA`, avec mode clair et mode sombre exploitables, sans nouvelle DA.

- **A24-UI-03 — CORRECTION+COMPLÉTION** — Login et Dashboard.  
  Périmètre : page login, dashboard, cartes d’accès, cards de synthèse, icônes, hiérarchie visuelle, fond, espacements, mode clair et mode sombre.  
  Livrable attendu : patch code ciblé Login + Dashboard.  
  DoD : Login et Dashboard sont proches de `MAQUETTE_DA`, simples, lisibles et fonctionnels.

- **A24-UI-04 — CORRECTION+COMPLÉTION** — Société et Dépôts.  
  Périmètre : page société, pages dépôts / bases, formulaires, cards, sections, tableaux, boutons, badges, panneaux et cohérence visuelle.  
  Livrable attendu : patch code ciblé Société + Dépôts.  
  DoD : les pages de structure société sont sobres, lisibles et alignées avec la DA officielle.

- **A24-UI-05 — CORRECTION+COMPLÉTION** — Véhicules et Templates.  
  Périmètre : pages véhicules, pages templates, tableaux, filtres, badges, formulaires, détails, états visuels, actions principales et secondaires.  
  Livrable attendu : patch code ciblé Véhicules + Templates.  
  DoD : les pages référentielles métier sont propres, cohérentes et visuellement proches de `MAQUETTE_DA`.

- **A24-UI-06 — CORRECTION+COMPLÉTION** — Utilisateurs / RH visuel.  
  Périmètre : page utilisateurs, liste, filtres, création, édition, fiche utilisateur, badges rôles/statuts et cohérence RH visible.  
  Livrable attendu : patch code ciblé Users / RH visuel.  
  DoD : la page Utilisateurs / RH est plus pure, plus lisible, alignée avec `MAQUETTE_DA`, sans ajout de RH avancée.

- **A24-UI-07 — CORRECTION+COMPLÉTION** — Audit, Onboarding, Privacy et pages simples.  
  Périmètre : audit, onboarding, privacy, pages simples, sections, cards, tableaux, filtres, textes, états et finitions globales.  
  Livrable attendu : patch code ciblé pages complémentaires.  
  DoD : les pages complémentaires sont alignées avec la DA officielle et ne créent pas de rupture visuelle.

- **A24-UI-08 — AUDIT** — Audit préparatoire Planning pour A25.  
  Objectif : auditer le planning après application du socle UI A24, sans correction profonde du planning, afin de préparer le bloc A25.  
  Livrable attendu : rapport préparatoire A25 avec captures avant, écarts planning, zones sensibles, risques fonctionnels et recommandations de découpage.  
  DoD : le planning possède une cartographie claire des écarts UI/UX à traiter en A25.

- **A24-UI-09 — VALIDATION** — Validation globale UI/UX post-réalignement.  
  À vérifier : cohérence visuelle globale, respect de `MAQUETTE_DA`, mode clair, mode sombre, navigation connectée, captures avant/après, absence de régression fonctionnelle et pages sœurs cohérentes.  
  Livrable attendu : rapport de validation UI/UX avec preuves terminales, captures et classement des résiduels.  
  DoD : toutes les pages A24 sont validées ou les résiduels sont classés explicitement bloquants / non bloquants.

- **CLOTURE_A24 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION** — Clôture finale du bloc A24.  
  Livrable attendu : contrôle final du bloc UI/UX global, vérification des patchs, preuves, captures, documentation finale et ZIP documentaire.  
  Verdict attendu :
  - `BLOC A24 CLÔTURABLE DÉFINITIVEMENT : OUI`
  - ou
  - `BLOC A24 CLÔTURABLE DÉFINITIVEMENT : NON`

#### Résultat attendu
- application réalignée visuellement avec `MAQUETTE_DA` ;
- interface plus pure, simple et lisible ;
- shell commun cohérent ;
- composants UI harmonisés ;
- icônes propres ;
- mode clair et mode sombre disponibles ;
- pages principales rapprochées de la DA officielle ;
- planning audité et préparé pour A25 ;
- aucune refonte planning profonde ;
- aucune extension fonctionnelle hors périmètre UI/UX global.

---

### BLOC A25 — Planning UI/UX & ergonomie métier

**Objectif du bloc**  
Refondre la page Planning comme un écran central complet du produit, avec une priorité explicite de fidélité visuelle aux images officielles `Planning_V1.2.png` et `Planning_V1.2_INFO_DETAIL.png`.

Le bloc A25 ne vise plus de simples ajustements locaux du planning.  
Il doit produire une page Planning globalement cohérente, structurée et suffisamment proche de la maquette visible pour servir de base d'exploitation métier.

Objectif de fidélité visuelle : se rapprocher autant que possible de la maquette officielle, avec une cible d'environ **99 % de reproduction de ce qui est visible**, dans la limite du code réel, des données disponibles et sans création d'une logique métier lourde.

Le planning reste un écran central du produit Ambulance Manager.  
Il ne doit pas être traité comme une page secondaire ni comme une accumulation verticale de modules.

Le bloc A25 intervient après :
- le réalignement UI/UX global A24 ;
- l'application du socle visuel commun ;
- l'intégration de la direction artistique officielle `MAQUETTE_DA` ;
- le constat manuel que les corrections A25 partielles ne suffisent pas si l'écran final ne ressemble pas à la maquette.

**Références UI/UX officielles**  
La direction artistique officielle reste exclusivement :

`docs/1-MASTER/MAQUETTE/MAQUETTE_DA`

La référence Planning détaillée et prioritaire du bloc A25 est :

`docs/1-MASTER/REFERENCE_UI_UX_A25_PLANNING.md`

Les images Planning à reproduire sont situées dans :

`docs/1-MASTER/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning`

Images principales :
- `Planning_V1.2.png` ;
- `Planning_V1.2_INFO_DETAIL.png`.

Ces images ne sont pas de simples inspirations : elles constituent la cible visuelle concrète du bloc A25.

**Principe directeur**  
Le bloc A25 doit faire converger la page Planning vers une structure de type :
- shell A24 conservé ;
- header Planning sobre ;
- toolbar horizontale filtres / vue / exports ;
- onglets internes fins ;
- matrice principale `salariés × semaines` ;
- panneau droit `Détail de la cellule` ;
- barre basse d'actions groupées ;
- badges doux et compacts ;
- états visuels propres ;
- mode clair et mode sombre cohérents.

La logique de lecture attendue est :

```txt
lecture globale → sélection cellule → détail latéral → action contextuelle
```

**Périmètre**  
Le bloc A25 peut traiter, uniquement pour se rapprocher de la maquette Planning :
- structure globale de la page Planning ;
- header planning ;
- filtres période / dépôt / rôle / utilisateur ;
- toggle `Personnel / Vue dépôt` ;
- exports PDF / Excel / CSV / impression ;
- onglets internes `Planning manuel`, `Affectations`, `Autoschedule`, `Matching`, `Historique`, `Exports` ;
- matrice principale salariés / rôle / base / statut / semaines ;
- cellules sélectionnables ;
- badges de shift / repos / congé / garde ;
- informations secondaires visibles dans les cellules ;
- panneau droit de détail cellule ;
- absences et conflits visibles dans le panneau droit si les données existent ;
- actions `Voir détail`, `Modifier`, `Ajouter shift` si présentes ;
- barre basse de sélection multiple ;
- actions groupées d'affectation employé 1 / employé 2 / véhicule / base ;
- action `Vider` / `Vider la sélection sans suppression` selon signification réelle ;
- états vides, chargement et erreur ;
- compatibilité mode clair / mode sombre ;
- responsive minimal sans refonte mobile complète.

**Exclusions**  
Le bloc A25 ne doit pas traiter :
- nouveau moteur planning ;
- nouvelle logique métier d'affectation ;
- refonte autoschedule ;
- refonte matching ;
- refonte RBAC ;
- refonte permissions ;
- refonte Prisma lourde ;
- refonte API lourde ;
- RH avancée ;
- saisie réelle des heures travaillées ;
- paie ;
- primes ;
- suppression physique généralisée ;
- application mobile complète ;
- préparation société pilote ;
- nouvelle direction artistique.

Toute donnée non visible dans la maquette ou non prouvée dans le code doit être indiquée ainsi :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

**Règle de validation visuelle**  
Une session A25 ne doit pas être déclarée validée visuellement uniquement parce que le patch est propre, applicable, linté et buildé.

La validation A25 exige aussi une comparaison visuelle avec la maquette Planning et un retour manuel utilisateur favorable.

Si le rendu réel ne ressemble pas suffisamment à `Planning_V1.2`, la session doit rester techniquement propre mais visuellement non validée.

#### Sessions

Les sessions A25 déjà produites avant ce recadrage peuvent rester comme historique technique partiel, mais elles ne suffisent pas à clôturer A25 si la page finale ne correspond pas à la maquette.

La fin du bloc A25 est recadrée ainsi :

- **A25-PLAN-UI-06 — AUDIT+CADRAGE** — Cohérence et faisabilité maquette Planning.  
  Objectif : contrôler la cohérence entre le plan, le document maître, `REFERENCE_UI_UX_A25_PLANNING.md`, les images Planning officielles, les prompts A25 et le code réel, puis produire une matrice de faisabilité code.  
  Livrable attendu : rapport d’audit/cadrage, matrice de cohérence documentaire, matrice de faisabilité code, cartographie des écarts et checklist visuelle manuelle.  
  DoD : la cible visuelle complète est exploitable, les risques sont classés, et les corrections A25-07 à A25-10 peuvent être lancées sans contradiction majeure.

- **A25-PLAN-UI-07 — CORRECTION+COMPLÉTION** — Structure globale, header, filtres, exports et onglets.  
  Périmètre : layout global, header Planning, toolbar filtres/vue/exports, onglets internes, workspace principal, répartition matrice + panneau droit, suppression du risque de double header, pilotage conjoint encadré violet / encadré vert par l’onglet actif.  
  Livrable attendu : patch code ciblé structure globale Planning.  
  DoD : la page Planning ressemble structurellement à la maquette et les onglets pilotent bien le contenu principal et le panneau contextuel.

- **A25-PLAN-UI-08 — CORRECTION+COMPLÉTION** — Matrice salariés × semaines, cellules et badges.  
  Périmètre : table/matrice, colonnes salarié/rôle/base/statut/semaines, lignes salariés, avatars, cellules, sélection cellule, badges shift/repos/congé/garde, couleurs douces, densité et lisibilité.  
  Livrable attendu : patch code ciblé matrice planning.  
  DoD : la zone violette de la maquette est reproduite de manière fidèle et exploitable, sans hardcoder des données non disponibles.

- **A25-PLAN-UI-09 — CORRECTION+COMPLÉTION** — Panneau droit contextuel et actions groupées.  
  Périmètre : panneau droit `Détail de la cellule`, détail salarié, période, affectations, absences, conflits/alertes, actions, barre basse de sélection multiple et actions d'affectation.  
  Livrable attendu : patch code ciblé panneau droit et barre basse.  
  DoD : les zones verte et basse de la maquette sont reproduites fidèlement, avec actions hiérarchisées et sans nouvelle logique métier lourde.

- **A25-PLAN-UI-10 — CORRECTION+COMPLÉTION** — Finitions visuelles, états, mode sombre et responsive minimal.  
  Périmètre : tokens, espacements, bordures, arrondis, couleurs, contrastes, états vides/chargement/erreur, mode clair, mode sombre et responsive minimal, sans refonte mobile complète.  
  Livrable attendu : patch code ciblé finitions globales Planning.  
  DoD : la page Planning est homogène, lisible, cohérente en clair/sombre et prête pour validation visuelle globale.

- **A25-PLAN-UI-11 — VALIDATION** — Validation visuelle globale Planning.  
  À vérifier : fidélité à `Planning_V1.2.png`, fidélité à `Planning_V1.2_INFO_DETAIL.png`, couverture complète de `REFERENCE_UI_UX_A25_PLANNING.md`, mode clair, mode sombre, actions, non-régression fonctionnelle, retour visuel manuel Nathan, capture après manuelle si fournie.  
  Livrable attendu : rapport de validation visuelle et technique Planning.  
  DoD : Nathan valide manuellement que la page Planning est suffisamment fidèle à la maquette et exploitable métier, ou les écarts restants sont classés explicitement bloquants / non bloquants / à confirmer.

- **CLOTURE_A25 — VALIDATION** — Clôture finale du bloc A25.  
  Livrable attendu : contrôle final du bloc Planning UI/UX, vérification des patchs, preuves, documentation finale, conformité à la référence A25, retour visuel manuel et verdict de clôture.  
  Verdict attendu :
  - `BLOC A25 CLÔTURABLE DÉFINITIVEMENT : OUI`
  - ou
  - `BLOC A25 CLÔTURABLE DÉFINITIVEMENT : NON`

**Règle A25 — captures et vérification visuelle**  
Les captures ne sont pas obligatoires à chaque session A25. Pour A25 recadré, Codex ne doit pas produire de captures automatiquement. Une capture avant peut être réalisée manuellement par Nathan lors de A25-PLAN-UI-06, et une capture après peut être réalisée manuellement lors de A25-PLAN-UI-11 ou `CLOTURE_A25`. Pour les sessions de correction intermédiaires, une documentation structurée et une checklist de vérification visuelle manuelle suffisent.

**Règle A25 — phrase documentaire interdite dans l’UI**  
La formule `INFORMATION NON FOURNIE — À CONFIRMER` est réservée aux documents, prompts, rapports et contrôles qualité. Elle ne doit pas être affichée dans l’interface utilisateur finale.

#### Résultat attendu
- page Planning refondue comme écran central complet ;
- proximité visuelle forte avec `Planning_V1.2.png` et `Planning_V1.2_INFO_DETAIL.png` ;
- structure en matrice salariés × semaines si compatible avec les données réelles ;
- toolbar, onglets, matrice, panneau droit et barre basse cohérents ;
- densité métier maîtrisée ;
- actions hiérarchisées ;
- cohérence avec le socle UI A24 ;
- compatibilité mode clair / mode sombre ;
- documentation A25 suffisamment précise pour guider Codex sans interprétation libre excessive ;
- aucune refonte fonctionnelle lourde ;
- aucune extension hors périmètre planning UI/UX.

---

### BLOC A26 — Exécution UI/UX visuelle 99 % sur références officielles

**Objectif du bloc**  
Exécuter en code le chantier UI/UX transversal préparé dans `docs/1-MASTER/2-REFERENCE_UI_UX/`, afin de rapprocher les pages disposant d’une maquette officielle à environ 99 % de leur cible visuelle.

Le bloc A26 ne crée pas de nouvelle direction artistique.  
Il applique les références visuelles officielles déjà préparées.

A26 intervient après :
- A24 — Réalignement UI/UX global sur `MAQUETTE_DA` ;
- A25 — Planning UI/UX & ergonomie métier ;
- le chantier documentaire transversal UI/UX hors bloc applicatif.

**Références obligatoires du bloc**

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_<PAGE>.md
```

Pour le planning, la référence déjà validée est :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A25_PLANNING.md
```

**Principe directeur**

```txt
IMAGE OFFICIELLE = VÉRITÉ VISUELLE
REFERENCE_UI_UX_<PAGE>.md = TRADUCTION CODABLE POUR CODEX
CODE RÉEL = VÉRITÉ FONCTIONNELLE
FONCTIONNEL EXISTANT = NON BLOQUANT POUR LA PHASE VISUELLE 99 %
```

Le bloc A26 est strictement visuel.  
Il ne doit pas être transformé en refonte fonctionnelle.

**Périmètre inclus**

- Shell global connecté ;
- Login ;
- Dashboard ;
- Société / paramètres métier ;
- Dépôts / bases ;
- Véhicules ;
- Templates ;
- Utilisateurs / RH ;
- Onboarding ;
- Audit ;
- Privacy ;
- cohérence visuelle globale entre pages ;
- vérification visuelle manuelle Nathan après chaque session.

**Périmètre exclu**

- refonte fonctionnelle ;
- ajout métier ;
- API ;
- Prisma ;
- RBAC ;
- services métier ;
- logique serveur ;
- autoschedule ;
- matching ;
- moteur planning ;
- RGPD avancé ;
- génération automatique de captures ;
- audit global du dépôt.

**Règle de traitement du fonctionnel existant**

Si un élément fonctionnel existant empêche de reproduire la maquette officielle à environ 99 %, il peut être :

```txt
masqué visuellement
déplacé
replié
simplifié
supprimé de l’affichage par défaut
```

Les arbitrages fonctionnels seront traités plus tard dans des sessions applicatives dédiées.

**Règle d’économie Codex**

Codex doit :

- lire uniquement les références UI/UX utiles à la page traitée ;
- lire uniquement les fichiers code utiles ;
- ne pas scanner tout le dépôt ;
- ne pas relire tout l’historique documentaire ;
- ne pas générer de captures ;
- fournir une checklist de contrôle visuel manuel Nathan.

#### Sessions

- **A26-UI-01 — AUDIT+CADRAGE** — Audit d’exécution visuelle page par page.  
  Objectif : auditer l’existant réel après A24 et A25, comparer chaque page aux références UI/UX officielles, identifier les écarts visuels restants, puis proposer le découpage exact du bloc A26.  
  Périmètre : inventaire page par page, état réel du code, écart visuel avec chaque maquette, fichiers code réellement concernés, niveau d’effort estimé, risques, regroupements possibles, pages à traiter seules, pages à traiter après Shell global, éléments fonctionnels à masquer / déplacer / simplifier visuellement.  
  Livrable attendu : rapport d’audit/cadrage A26 avec matrice d’exécution page par page, ordre recommandé de production et proposition de sessions A26 restantes. Aucun patch code applicatif n’est attendu.  
  DoD : l’ordre de production A26 est proposé sur preuves, les risques sont identifiés, les fichiers utiles par page sont cadrés, et le reste du bloc A26 peut être créé sans hypothèse.

- **A26-UI-02 à A26-UI-XX — À DÉFINIR APRÈS A26-UI-01**.  
  Le découpage définitif des sessions de production visuelle A26 sera établi uniquement après l’audit `A26-UI-01`.  
  Les sessions ne doivent pas être créées à l’avance si l’audit démontre qu’un regroupement, un découpage plus fin ou une priorité différente est nécessaire.

- **CLOTURE_A26 — VALIDATION** — Clôture finale du bloc A26.  
  Périmètre : vérifier les sessions A26 réellement créées, les patchs, les validations terminales, les checklists visuelles manuelles, les résiduels et la documentation finale.  
  Livrable attendu : verdict de clôture final du bloc A26.  
  DoD : produire explicitement `BLOC A26 CLÔTURABLE DÉFINITIVEMENT : OUI` ou `BLOC A26 CLÔTURABLE DÉFINITIVEMENT : NON`.

#### Résultat attendu

- Shell global et pages officielles réalignés selon les références UI/UX ;
- exécution guidée par les maquettes et les documents `REFERENCE_UI_UX_<PAGE>.md` ;
- aucune nouvelle direction artistique ;
- aucun ajout fonctionnel non demandé ;
- fonctionnel réel préservé en profondeur mais non bloquant visuellement ;
- base UI/UX propre avant validation globale de non-régression A27.

---

### BLOC A27 — Stabilisation / non-régression post UI/UX A24-A25-A26

**Objectif du bloc**  
Vérifier que les réalignements UI/UX réalisés en A24, A25 et A26 n’ont pas introduit de régressions visuelles, fonctionnelles ou de navigation, puis corriger uniquement les régressions prouvées.

Le bloc A27 intervient après :
- A24 — Réalignement UI/UX global sur `MAQUETTE_DA` ;
- A25 — Planning UI/UX & ergonomie métier ;
- A26 — Exécution UI/UX visuelle 99 % sur références officielles.

A27 n’est pas un nouveau bloc de refonte.  
A27 est un bloc de sécurisation finale après réalignements UI/UX.

**Principe directeur**  
Le bloc A27 doit contrôler l’application dans son ensemble après les modifications UI/UX, afin de garantir que :
- les pages restent fonctionnelles ;
- la navigation reste cohérente ;
- le mode clair fonctionne ;
- le mode sombre fonctionne ;
- les pages principales restent alignées avec les références visuelles officielles ;
- aucune fonctionnalité stabilisée n’a été cassée ;
- aucune régression majeure n’est laissée avant la suite du développement.

**Périmètre**  
Le bloc A27 peut contrôler :
- login ;
- dashboard ;
- sidebar ;
- topbar ;
- navigation connectée ;
- société ;
- dépôts ;
- véhicules ;
- templates ;
- utilisateurs/RH ;
- planning ;
- audit ;
- onboarding ;
- privacy ;
- mode clair ;
- mode sombre ;
- responsive minimal ;
- permissions et accès visibles côté UI ;
- validations terminales.

**Exclusions**  
Le bloc A27 ne doit pas traiter :
- nouvelle refonte UI/UX ;
- nouvelle fonctionnalité métier ;
- nouveau module ;
- refonte planning avancée ;
- autoschedule complet ;
- matching complet ;
- RH avancée ;
- refonte RBAC ;
- RGPD complet ;
- sécurité avancée ;
- préparation société pilote ;
- déploiement.

A27 doit corriger uniquement les régressions réellement démontrées.

#### Sessions

- **A27-STAB-01 — AUDIT** — Audit global de non-régression post A24-A25-A26.  
  Objectif : vérifier l’état réel de l’application après les réalignements UI/UX global, planning et exécution visuelle 99 %.  
  Livrable attendu : rapport d’audit de non-régression avec routes contrôlées, anomalies visuelles, anomalies fonctionnelles, anomalies de navigation et classement bloquant / non bloquant.  
  DoD : chaque page principale possède un statut clair : OK / régression mineure / régression bloquante / à confirmer.

- **A27-STAB-02 — CORRECTION** — Correction ciblée des régressions bloquantes post UI/UX.  
  Objectif : corriger uniquement les régressions prouvées qui empêchent la navigation, l’usage ou la cohérence minimale de l’application.  
  Livrable attendu : patch code minimal de correction.  
  DoD : aucune correction ne sort du périmètre des régressions constatées en A27-STAB-01.

- **A27-STAB-03 — COMPLÉTION** — Complétion des preuves visuelles et documentaires post-correction.  
  Objectif : compléter les preuves, notes de non-régression et documentation finale.  
  Livrable attendu : documentation consolidée des contrôles post UI/UX.  
  DoD : les preuves permettent de comparer l’état final aux objectifs A24, A25 et A26.

- **A27-STAB-04 — VALIDATION** — Validation finale de non-régression post UI/UX.  
  À vérifier : navigation connectée, pages principales, mode clair, mode sombre, planning, absence de régression bloquante, validations terminales.  
  Livrable attendu : rapport de validation finale avec preuves terminales et checklist visuelle manuelle.  
  DoD : toutes les régressions bloquantes sont corrigées ou classées explicitement.

- **CLOTURE_A27 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION** — Clôture finale du bloc A27.  
  Livrable attendu : contrôle final de stabilisation post UI/UX, vérification des patchs, preuves, documentation finale et ZIP documentaire.  
  Verdict attendu :
  - `BLOC A27 CLÔTURABLE DÉFINITIVEMENT : OUI`
  - ou
  - `BLOC A27 CLÔTURABLE DÉFINITIVEMENT : NON`

#### Résultat attendu

- application stable après A24, A25 et A26 ;
- aucune régression bloquante post UI/UX ;
- navigation connectée validée ;
- pages principales contrôlées ;
- mode clair et mode sombre validés ;
- planning contrôlé après réalignements ;
- documentation finale complète ;
- base saine avant la suite du développement.


## 13. BETA V1.x — Plan prévisionnel

### BLOC B1 — Alertes applicatives
**Objectif du bloc**  
Traiter les alertes UI globales après stabilisation de l’ALPHA.

#### Sessions
- **ALERT-01 — AUDIT** — Audit du besoin réel après tests terrain
- **ALERT-02 — COMPLÉTION** — Modèle d’alertes UI globales
- **ALERT-03 — COMPLÉTION** — Alertes planning
- **ALERT-04 — COMPLÉTION** — Alertes véhicule / conformité
- **ALERT-05 — COMPLÉTION** — Alertes audit importantes
- **ALERT-06 — VALIDATION** — Validation du bloc alertes
- **CLOTURE_B1 — VALIDATION** — Clôture finale du bloc B1

### BLOC B2 — Autoschedule mensuel et règles avancées
**Objectif du bloc**  
Étendre l’automatisation et les règles au-delà du socle ALPHA.

#### Sessions
- **AUTO-M-01 — AUDIT** — Audit du besoin mensuel réel
- **AUTO-M-02 — COMPLÉTION** — Génération mensuelle par enchaînement semaine/jour
- **RULES-ADV-01 — AUDIT** — Audit du besoin OFF / ALERT / BLOCK / BOTH
- **RULES-ADV-02 — COMPLÉTION** — Implémentation des modes avancés
- **RULES-ADV-03 — VALIDATION** — Validation du bloc règles avancées
- **CLOTURE_B2 — VALIDATION** — Clôture finale du bloc B2

### BLOC B3 — RBAC enrichi et multi-rôle
**Objectif du bloc**  
Étendre la gouvernance d’accès au-delà du modèle ALPHA.

#### Sessions
- **RBAC-ADV-01 — AUDIT** — Audit du besoin multi-rôle réel
- **RBAC-ADV-02 — COMPLÉTION** — Modèle multi-rôle
- **RBAC-ADV-03 — COMPLÉTION** — UI multi-rôle
- **RBAC-ADV-04 — VALIDATION** — Validation du bloc RBAC avancé
- **CLOTURE_B3 — VALIDATION** — Clôture finale du bloc B3

### BLOC B4 — Historique enrichi
**Objectif du bloc**  
Rendre l’historique et la relecture métier plus riches après stabilisation du socle.

#### Sessions
- **HIST-01 — AUDIT** — Audit du besoin historique/versioning enrichi
- **HIST-02 — COMPLÉTION** — Historique de planning enrichi
- **HIST-03 — COMPLÉTION** — Ajout d’un audit métier plus lisible
- **HIST-04 — VALIDATION** — Validation du bloc historique
- **CLOTURE_B4 — VALIDATION** — Clôture finale du bloc B4

## 14. VERSION OFFICIELLE V2.x — Plan prévisionnel

### BLOC V2-1 — Produit analytique et extensions
**Objectif du bloc**  
Étendre le produit après validation terrain et stabilisation des versions précédentes.

#### Sessions
- **REPORT-01 — AUDIT** — Audit du besoin reporting avancé
- **REPORT-02 — COMPLÉTION** — Reporting avancé
- **INTEG-01 — AUDIT** — Audit du besoin intégrations externes
- **INTEG-02 — COMPLÉTION** — Intégrations externes priorisées
- **MOBILE-01 — AUDIT** — Audit du besoin mobile
- **MOBILE-02 — COMPLÉTION** — Stratégie mobile
- **CLOTURE_V2-1 — VALIDATION** — Clôture finale du bloc V2-1

### BLOC V2-2 — SaaS étendu
**Objectif du bloc**  
Faire passer Ambulance Manager vers une logique SaaS plus complète.

#### Sessions
- **TENANT-ADV-01 — COMPLÉTION** — Multi-agences
- **BILL-01 — COMPLÉTION** — Billing / abonnement
- **ONB-SELF-01 — COMPLÉTION** — Onboarding self-service avancé
- **VEH-ADV-01 — COMPLÉTION** — Maintenance flotte avancée
- **CLOTURE_V2-2 — VALIDATION** — Clôture finale du bloc V2-2

## 15. Règle de maintenance du plan

- ce plan doit rester aligné sur `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- il ne doit pas recontester le cadrage validé
- une session validée ne supprime pas la nécessité d’une validation explicite utilisateur
- aucun bloc ne peut être considéré comme terminé sans session dédiée de clôture
- toute évolution importante du plan doit être justifiée
- toute future refonte du plan doit rester compatible avec :
  - 1 session = 1 point clair
  - 1 fonctionnalité
  - 1 session de clôture explicite par bloc
  - 1 livrable principal
  - 1 DoD
  - 1 validation
