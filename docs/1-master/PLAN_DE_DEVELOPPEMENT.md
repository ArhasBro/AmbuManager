# Ambulance Manager — PLAN_DE_DEVELOPPEMENT

Version : V2.1.1 (MASTER)  
Date : 19/03/2026

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
- [11. ALPHA V0.x — Plan refondu complet](#11-alpha-v0x--plan-refondu-complet)
- [12. BETA V1.x — Plan refondu](#12-beta-v1x--plan-refondu)
- [13. VERSION OFFICIELLE V2.x — Plan refondu](#13-version-officielle-v2x--plan-refondu)
- [14. Prochaine étape logique recommandée](#14-prochaine-étape-logique-recommandée)
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

## 2. Référence produit officielle
Le document suivant constitue la base officielle produit :

`docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

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

## 11. ALPHA V0.x — Plan refondu complet

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

## 12. BETA V1.x — Plan refondu

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


## 13. VERSION OFFICIELLE V2.x — Plan refondu

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


## 14. Prochaine étape logique recommandée
Le premier bloc recommandé pour démarrer cette refonte méthodique est :

**BLOC A1 — Accès, Auth, Multi-tenant, Permissions, API**

La première session recommandée est :

**AUTH-01 — AUDIT — Audit complet de l’authentification existante**

Pourquoi :
- elle ouvre la méthode de reprise propre
- elle ne mélange pas plusieurs sujets
- elle pose le principe : audit d’abord, confiance ensuite

## 15. Règle de maintenance du plan
- ce plan doit rester aligné sur `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
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