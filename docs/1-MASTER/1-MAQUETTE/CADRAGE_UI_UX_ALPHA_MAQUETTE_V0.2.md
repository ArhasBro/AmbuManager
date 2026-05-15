# BLOC UI/UX ALPHA — Cadrage Maquette V0.2

## 1. Objet du document

Ce document cadre le travail UI/UX à réaliser pour Ambulance Manager avant intégration dans le code.

Il sert de référence de conception pour préparer une maquette réaliste, cohérente avec l’application actuelle, la direction graphique ProtoV0.1, et les contraintes de développement via VS Code / Codex.

Le bloc doit permettre de passer d’une interface fonctionnelle mais encore brute à une WebApp métier plus claire, moderne, lisible et professionnelle.

---

## 2. Emplacement recommandé dans le dépôt

Emplacement proposé :

```text
docs/2-SESSIONS/1-ALPHA/BLOC_A21/
```

Nom de fichier recommandé :

```text
CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md
```

---

## 3. Contexte

La WebApp Ambulance Manager dispose déjà de plusieurs pages fonctionnelles :

- `/login` — Connexion
- `/dashboard` — Portail d’accueil
- `/company` — Société + règles métier
- `/depots` — Bases / dépôts
- `/users` — Utilisateurs / RH / absences
- `/vehicles` — Véhicules / flotte
- `/templates` — Templates de shifts
- `/planning` — Planning manuel + autoschedule + matching
- `/audit` — Journal d’audit
- `/onboarding` — Onboarding société pilote + imports
- `/privacy` — Mentions données personnelles
- Shell global — navigation, thème clair/sombre, accès selon permissions

Une première direction graphique, appelée ici `ProtoV0.1`, a été produite.  
Elle est visuellement satisfaisante, mais certains contenus proposés ne correspondent pas au périmètre réel du produit.

Le présent bloc vise donc à produire une `Maquette V0.2` alignée avec :

- l’état réel actuel de la WebApp ;
- le périmètre fonctionnel validé ;
- une direction graphique moderne, santé / ambulancier ;
- une intégration future réaliste dans le code existant.

---

## 4. Positionnement produit

Ambulance Manager doit être conçu comme :

```text
Une WebApp SaaS métier de gestion ambulancière.
```

Le produit n’est pas :

- une application de dispatch temps réel ;
- une application de régulation médicale ;
- une application de suivi d’interventions urgentes en direct ;
- un cockpit analytique avancé pour la V1.

Le cœur de la V1 doit rester centré sur :

- Planning ;
- Utilisateurs / RH ;
- Véhicules / flotte ;
- Templates de shifts ;
- Société / paramètres métier simples ;
- Dépôts / bases ;
- Onboarding ;
- Audit ;
- Dashboard portail.

---

## 5. Direction artistique validée

La direction graphique générale de `ProtoV0.1` est conservée.

### À conserver

- Sidebar gauche moderne ;
- interface claire et très lisible ;
- cards blanches avec ombres légères ;
- bordures douces ;
- arrondis modernes ;
- palette santé / ambulancier ;
- badges de statut ;
- tables propres ;
- panneaux latéraux de détail ;
- formulaires structurés ;
- style SaaS légèrement premium ;
- compatibilité future dark mode.

### Palette cible

Base claire :

- blanc ;
- gris très clair ;
- bleu médical ;
- turquoise ;
- vert santé ;
- rouge uniquement pour danger, expiration ou action sensible.

Base sombre :

- fond bleu nuit / gris anthracite ;
- cards sombres légèrement contrastées ;
- textes lisibles ;
- mêmes couleurs d’accent que le thème clair.

### Codes visuels métier

La maquette doit intégrer des codes ambulanciers / santé de manière professionnelle :

- pictogrammes ambulance ;
- croix médicale ;
- badges de statut ;
- indicateurs de conformité ;
- statuts RH ;
- états planning ;
- icônes véhicules ;
- icônes utilisateurs / équipes.

Un emplacement doit être prévu pour le futur logo officiel de l’application.

---

## 6. Contraintes techniques

La maquette doit rester faisable dans le code existant via VS Code / Codex.

### À privilégier

- composants réutilisables ;
- layout stable ;
- sidebar ;
- topbar ;
- cards ;
- tables ;
- filtres ;
- onglets ;
- drawers latéraux ;
- accordéons ;
- badges ;
- modales de confirmation ;
- formulaires par sections ;
- zones danger ;
- switch thème clair / sombre.

### À éviter

- cartes géographiques complexes ;
- graphiques analytiques avancés ;
- animations lourdes ;
- drag and drop obligatoire ;
- dashboard type régulation ;
- écrans hors périmètre V1 ;
- refonte trop éloignée du code existant.

---

## 7. Pages prioritaires à maquetter

### Priorité haute

1. Shell global
2. Dashboard portail
3. Planning compact
4. Planning détaillé
5. Utilisateurs / RH
6. Véhicules
7. Templates

### Priorité moyenne

8. Société / paramètres métier
9. Dépôts / bases
10. Onboarding
11. Audit

### Priorité basse

12. Login
13. Privacy

### À repousser

- Rapports / analyses avancés ;
- alertes globales avancées ;
- maintenance flotte avancée ;
- billing ;
- mobile / tablette ;
- RGPD avancé avec formulaires de demande utilisateur.

---

## 8. Découpage proposé du bloc

## A21-UX-01 — AUDIT / CADRAGE

### Objectif

Analyser les écrans actuels, la direction ProtoV0.1 et le périmètre fonctionnel réel.

### Livrables attendus

- analyse de l’existant ;
- comparaison avec ProtoV0.1 ;
- liste des pages à conserver ;
- liste des éléments à modifier ;
- liste des éléments à supprimer ;
- priorités de maquettage ;
- verdict de direction UI/UX.

### Statut

Cette étape est considérée comme préparée dans l’échange de cadrage initial.

---

## A21-UX-02 — DESIGN SYSTEM

### Objectif

Définir les règles visuelles communes avant génération ou production des maquettes.

### Livrables attendus

- structure du shell global ;
- sidebar cible ;
- topbar cible ;
- palette claire ;
- palette sombre ;
- typographie ;
- règles de spacing ;
- cards ;
- tables ;
- badges ;
- formulaires ;
- drawers ;
- tabs ;
- accordéons ;
- états vides ;
- états erreur ;
- zones danger ;
- règles de dark mode.

### Résultat attendu

Une base graphique stable, réutilisable sur toutes les pages.

---

## A21-UX-03 — MAQUETTES FONDATRICES

### Objectif

Produire les premiers écrans structurants de la V0.2.

### Pages concernées

1. Shell global + Dashboard portail
2. Planning compact
3. Utilisateurs / RH
4. Véhicules

### Pourquoi ces pages

Ces écrans permettent de valider :

- le layout général ;
- la navigation ;
- les cards ;
- les tables ;
- les formulaires ;
- les badges ;
- les détails métier ;
- le niveau de densité de l’interface.

### Résultat attendu

Une base validée avant déclinaison des autres pages.

---

## A21-UX-04 — MAQUETTES MÉTIER COMPLÉMENTAIRES

### Objectif

Décliner la direction validée sur les autres écrans métier utiles.

### Pages concernées

1. Planning détaillé
2. Templates
3. Société / paramètres métier
4. Dépôts / bases
5. Onboarding
6. Audit

### Résultat attendu

Une couverture UI/UX complète des écrans principaux de la V1.

---

## A21-UX-05 — PAGES SIMPLES / FINITIONS

### Objectif

Finaliser les écrans secondaires et les états transverses.

### Pages / éléments concernés

- Login ;
- Privacy ;
- états vides ;
- états erreur ;
- confirmations ;
- modales sensibles ;
- zones danger ;
- messages de succès ;
- messages d’échec ;
- écrans sans permission ;
- éléments de dark mode.

### Résultat attendu

Une expérience cohérente même sur les pages secondaires.

---

## A21-UX-06 — VALIDATION / PRÉPARATION CODEX

### Objectif

Transformer la maquette validée en consignes d’intégration prêtes pour VS Code / Codex.

### Livrables attendus

- synthèse de la direction UI/UX validée ;
- liste des composants à créer ou refactoriser ;
- ordre d’implémentation recommandé ;
- règles pour ne pas casser l’existant ;
- règles de non-régression ;
- prompt de production Codex ;
- prompt de contrôle qualité ;
- critères de validation visuelle ;
- critères de validation fonctionnelle.

### Résultat attendu

Un passage clair de la conception UI/UX vers l’intégration technique.

---

## 9. Direction page par page

## 9.1 Shell global

### Objectif

Créer une navigation stable, moderne et adaptée aux permissions.

### Éléments attendus

- sidebar gauche ;
- emplacement logo ;
- nom produit ;
- badge ALPHA discret ;
- navigation selon droits ;
- topbar ;
- switch thème clair / sombre ;
- profil utilisateur ;
- déconnexion ;
- contenu principal bien cadré.

---

## 9.2 Dashboard

### Objectif

Créer un portail d’accueil opérationnel.

### À afficher

- identité utilisateur ;
- rôle ;
- société ;
- compteurs simples :
  - utilisateurs actifs ;
  - véhicules actifs ;
  - dépôts actifs ;
  - templates actifs ;
- cartes d’accès rapides aux modules autorisés.

### À éviter

- graphiques avancés ;
- cartes ;
- alertes d’intervention ;
- statistiques de régulation.

---

## 9.3 Planning compact

### Objectif

Donner une vue RH/planning globale par salarié et par semaine.

### Structure cible

- lignes : employés ;
- colonnes : Semaine 1, Semaine 2, Semaine 3, Semaine 4 ;
- cellules compactes.

### Contenu cellule

- nombre de shifts ;
- total heures ;
- absence éventuelle ;
- conflit éventuel ;
- badge état.

---

## 9.4 Planning détaillé

### Objectif

Permettre une lecture plus fine du planning par salarié.

### Structure cible

- mêmes lignes / colonnes que la version compacte ;
- contenu cellule enrichi.

### Contenu cellule

- mini-pills de shifts ;
- type de template ;
- horaires ;
- base ;
- véhicule ;
- absence ;
- repos ;
- conflit ;
- détail au clic dans drawer.

---

## 9.5 Utilisateurs / RH

### Objectif

Créer une vraie fiche salarié exploitable.

### Structure cible

- table utilisateurs à gauche ;
- panneau de détail à droite ;
- recherche ;
- filtres ;
- bouton créer utilisateur.

### Onglets fiche utilisateur

1. Identité
2. Rôle & permissions
3. RH
4. Absences
5. Sécurité

### Actions sensibles

- réinitialiser mot de passe ;
- archiver utilisateur ;
- désactiver compte.

---

## 9.6 Véhicules

### Objectif

Créer une page flotte riche métier.

### À afficher

- liste véhicules ;
- immatriculation ;
- type ;
- statut ;
- base ;
- conformité documentaire ;
- assurance ;
- contrôle technique ;
- carte grise ;
- agrément sanitaire ;
- dates de création / modification.

### États conformité

- conforme ;
- bientôt expiré ;
- expiré.

---

## 9.7 Templates

### Objectif

Créer une page de gestion des modèles de shifts claire et structurante.

### À afficher

- liste templates ;
- couleur ;
- nom ;
- catégorie ;
- véhicule requis ;
- personnes requises ;
- rôle obligatoire ;
- rôles autorisés ;
- horaires ;
- traverse minuit ;
- actif / désactivé / archivé.

### Actions

- créer ;
- modifier ;
- désactiver ;
- réactiver ;
- archiver ;
- afficher archivés.

---

## 9.8 Société / paramètres métier

### Objectif

Conserver une page simple, lisible et fidèle au périmètre réel.

### Sections

1. Identité société
2. Paramètres métier ALPHA

### Champs société

- nom ;
- gérants ;
- adresse ;
- téléphone ;
- SIRET.

### Paramètres métier

- repos minimum entre shifts ;
- mode affichage planning :
  - SIMPLE ;
  - AMBULANCE ;
- règles métier ALPHA :
  - valeur ;
  - mode OFF / ALERT / BLOCK / BOTH.

---

## 9.9 Dépôts / bases

### Objectif

Créer une page simple de CRUD dépôt.

### À afficher

- nom ;
- adresse ;
- statut actif / archivé ;
- actions modifier / archiver.

### À éviter

- carte géographique ;
- statistiques avancées ;
- couverture moyenne ;
- capacité non disponible ;
- horaires non gérés.

---

## 9.10 Onboarding

### Objectif

Créer une page guidée pour initialiser une société pilote.

### Zones

1. Checklist de démarrage
2. Import initial

### Checklist

- profil société ;
- dépôts ;
- utilisateurs ;
- véhicules ;
- templates.

### Import

- type d’import ;
- fichier CSV/XLSX ;
- prévisualisation ;
- erreurs ;
- validation.

---

## 9.11 Audit

### Objectif

Créer une page admin/technique lisible.

### À afficher

- filtres ;
- table d’audit ;
- date ;
- action ;
- source ;
- entité ;
- acteur ;
- résumé ;
- détail JSON repliable.

---

## 9.12 Login

### Objectif

Créer une page de connexion simple et premium.

### À afficher

- logo / nom produit ;
- email ;
- mot de passe ;
- bouton connexion ;
- message erreur ;
- lien mentions d’information.

---

## 9.13 Privacy

### Objectif

Créer une page informative structurée.

### Sections

- catégories de données traitées ;
- finalités ;
- accès ;
- conservation ;
- droits RGPD ;
- mentions à confirmer.

---

## 10. Composants cibles

Les composants suivants doivent être prévus dans la maquette et pourront ensuite guider l’intégration :

- `AppShell`
- `Sidebar`
- `Topbar`
- `PageHeader`
- `StatCard`
- `ActionCard`
- `DataTable`
- `FilterBar`
- `StatusBadge`
- `DangerZone`
- `DetailsDrawer`
- `Tabs`
- `FormSection`
- `EmptyState`
- `ErrorState`
- `ConfirmModal`
- `AuditJsonPanel`
- `ThemeToggle`
- `PermissionGate`

---

## 11. Critères de validation UI/UX

Une maquette est considérée comme validable si :

- elle respecte le périmètre réel de la WebApp ;
- elle ne propose pas de fonctionnalité hors scope V1 ;
- elle reste réaliste à intégrer en code ;
- elle améliore la lisibilité ;
- elle clarifie la navigation ;
- elle conserve la cohérence métier ambulancier ;
- elle respecte la direction santé / ambulancier / moderne ;
- elle fonctionne visuellement en thème clair ;
- elle prévoit une logique dark mode ;
- elle ne surcharge pas inutilement les pages simples ;
- elle priorise Planning, RH, Véhicules et Templates.

---

## 12. Règles de non-dérive

Il est interdit dans ce bloc de transformer la V1 en :

- cockpit analytique avancé ;
- outil de dispatch temps réel ;
- outil de régulation médicale ;
- application mobile ;
- module billing ;
- module reporting avancé ;
- module RGPD avancé ;
- module maintenance flotte avancée.

Ces éléments pourront être réévalués plus tard, notamment en BETA ou V2.

---

## 13. Prochaine étape recommandée

Prochaine étape logique :

```text
A21-UX-02 — DESIGN SYSTEM
```

Objectif :

Définir précisément le système visuel avant génération des maquettes V0.2.

Livrables immédiats à produire :

- règles de layout ;
- structure sidebar ;
- structure topbar ;
- palette clair / sombre ;
- composants de base ;
- règles de badges ;
- règles de tables ;
- règles de formulaires ;
- niveau de densité par type de page.

---

## 14. Statut du cadrage

Statut :

```text
CADRAGE VALIDABLE PAR UTILISATEUR
```

Ce document peut être intégré dans le dépôt comme base de travail du bloc UI/UX ALPHA.

Validation utilisateur requise avant passage à la production du design system.

## Note de statut documentaire

Ce document constitue le cadrage initial UI/UX.

La référence finale UI/UX ALPHA validée pour une future intégration Codex est :

```text
docs/2-SESSIONS/1-ALPHA/BLOC_A21/SESSION-20260425-06_A21_UX-06/REFERENCE_UI_UX_ALPHA_V1.0.md
```

Ce document ne doit donc pas être utilisé seul comme référence finale d’intégration.
