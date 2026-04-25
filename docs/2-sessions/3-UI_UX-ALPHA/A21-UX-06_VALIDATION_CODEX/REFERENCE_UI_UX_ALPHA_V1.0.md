# REFERENCE_UI_UX_ALPHA_V1.0

## 1. Identification

- **Projet** : Ambulance Manager
- **Bloc** : A21 — UI / UX / Navigation
- **Session** : A21-UX-06 — Synthèse UI/UX ALPHA / référence exploitable Codex
- **Type de livrable** : documentation de référence UI/UX
- **Nom du fichier** : `REFERENCE_UI_UX_ALPHA_V1.0.md`
- **Objectif** : consolider la direction artistique validée et les règles UI/UX communes pour préparer l’intégration future dans React / Next.js / Tailwind via VS Code / Codex.
- **Décision attendue** : `NO_PATCH`
- **Modification code** : aucune
- **Patch code** : aucun

---

## 2. Contexte

Les étapes UI/UX précédentes du bloc A21 sont considérées comme intégrées :

```text
A21-UX-02 — cadrage UI/UX : intégré
A21-UX-03 — maquettes fondatrices : intégré
A21-UX-04 — maquettes métier complémentaires : intégré
A21-UX-05 — pages simples / finitions : intégré
```

La présente session `A21-UX-06` ne produit pas de nouvelle maquette.

Elle sert uniquement à figer une référence documentaire stable, exploitable pour l’intégration future de l’interface dans l’application Ambulance Manager.

Cette référence doit permettre à Codex / VS Code de comprendre :

- la direction artistique validée ;
- les écrans visuels de référence ;
- les règles de layout ;
- les composants communs à créer ou standardiser ;
- les règles de navigation ;
- les règles de tableaux ;
- les règles de formulaires ;
- les règles de drawers ;
- les réserves connues ;
- les exclusions à ne pas ouvrir.

---

## 3. Liste des maquettes validées

### 3.1 A21-UX-03 — Maquettes fondatrices

Les maquettes fondatrices validées sont :

```text
Dashboard portail      — validé visuellement
Planning compact       — validé visuellement
Utilisateurs / RH      — validé visuellement
Véhicules / flotte     — validé visuellement
```

Ces écrans constituent la base visuelle principale de l’application connectée.

Ils valident notamment :

- la sidebar gauche claire ;
- la topbar sobre ;
- la palette santé / ambulancier ;
- la logique de cards ;
- les tableaux compacts ;
- les badges métier ;
- les panneaux latéraux de détail ;
- la densité professionnelle adaptée à une web app métier.

---

### 3.2 A21-UX-04 — Maquettes métier complémentaires

Les maquettes métier complémentaires validées sont :

```text
Templates_V1.1         — validé visuellement
Société_V1.0           — validé visuellement avec réserve
Dépôts_V1.0            — validé visuellement
Onboarding_V1.2        — validé visuellement
Audit_V1.0             — validé visuellement
```

Ces écrans confirment que la direction artistique peut être déclinée sur des pages métier plus spécifiques :

- gestion de templates ;
- paramètres société ;
- bases / dépôts ;
- onboarding société pilote ;
- journal d’audit.

---

### 3.3 A21-UX-05 — Pages simples / finitions

Les pages simples validées sont :

```text
Login_V1.0             — validé visuellement
Privacy_V1.0           — validé visuellement avec correctifs textuels à prévoir
```

Ces écrans complètent le périmètre visuel ALPHA :

- page de connexion hors shell applicatif ;
- page d’information / mentions RGPD simple, lisible et professionnelle.

---

## 4. Direction artistique figée

La direction artistique validée pour Ambulance Manager est :

```text
SaaS métier moderne, santé / ambulancier, clair, professionnel, légèrement premium.
```

Elle doit rester stable pendant l’intégration UI/UX ALPHA.

### 4.1 Principes visuels

La DA repose sur :

- une interface claire ;
- une sidebar gauche fixe et lisible ;
- une topbar sobre ;
- un fond blanc ou très clair ;
- des cards blanches arrondies ;
- des bordures fines ;
- des ombres très légères si nécessaire ;
- un bleu profond pour les titres et zones structurantes ;
- un bleu primaire pour les actions principales ;
- des touches turquoise / vert santé pour les statuts positifs ;
- du rouge uniquement pour les alertes, expirations et zones danger ;
- des badges sobres ;
- des tableaux compacts mais lisibles ;
- des drawers / panneaux droits pour les détails ;
- une densité métier professionnelle ;
- un rendu réaliste à coder en React / Next.js / Tailwind.

### 4.2 Ambiance attendue

L’interface doit donner une impression de :

- sérieux ;
- clarté ;
- fiabilité ;
- maîtrise métier ;
- modernité sobre ;
- environnement santé / ambulancier ;
- produit SaaS professionnel.

Elle ne doit pas donner une impression de :

- landing page marketing ;
- dashboard crypto / finance ;
- outil grand public ;
- logiciel trop coloré ;
- cockpit analytique avancé ;
- plateforme médicale hospitalière complexe ;
- outil de dispatch temps réel.

---

## 5. Règles de layout global

### 5.1 Pages connectées

Les pages connectées doivent utiliser une structure commune de type `AppShell`.

Structure cible :

```text
AppShell
├─ Sidebar gauche
├─ Topbar
└─ Main content
   ├─ PageHeader
   ├─ Zone de statistiques / cards si utile
   ├─ Zone de filtres si utile
   ├─ Tableau / contenu principal
   └─ Drawer droit si besoin
```

### 5.2 Fond général

Le fond global doit rester :

- blanc ;
- blanc cassé ;
- gris très clair ;
- jamais sombre par défaut ;
- jamais saturé.

Le fond doit valoriser les cards blanches, les tableaux et les panneaux de détail.

### 5.3 Contenu principal

Le contenu principal doit être :

- structuré ;
- aligné ;
- respirant mais pas vide ;
- dense sans devenir illisible ;
- organisé par blocs fonctionnels.

Les pages métier doivent éviter les grands espaces inutiles.

### 5.4 Cards

Les cards doivent être utilisées pour :

- statistiques simples ;
- blocs de synthèse ;
- sections de formulaire ;
- panneaux d’information ;
- blocs de configuration ;
- zones d’aide.

Règles :

- fond blanc ;
- bordure fine ;
- rayon d’arrondi cohérent ;
- padding confortable ;
- titre court ;
- contenu directement utile ;
- pas de décoration excessive.

### 5.5 Hiérarchie visuelle

La hiérarchie doit rester claire :

1. titre de page ;
2. sous-titre ou description courte ;
3. action principale ;
4. filtres ;
5. contenu métier ;
6. actions secondaires ;
7. informations d’aide ou notes.

---

## 6. Règles de navigation

### 6.1 Sidebar

La sidebar gauche est la navigation principale de l’application connectée.

Elle doit contenir les modules métier principaux :

```text
Dashboard
Planning
Utilisateurs / RH
Véhicules
Templates
Société
Dépôts
Onboarding
Audit
```

Les entrées visibles doivent dépendre des permissions et rôles utilisateur.

### 6.2 Topbar

La topbar doit rester sobre.

Elle peut afficher :

- le nom de la société courante ;
- l’utilisateur connecté ;
- le rôle ou profil si utile ;
- une action de déconnexion ;
- éventuellement une indication d’environnement si nécessaire.

Elle ne doit pas devenir une zone de navigation secondaire complexe.

### 6.3 Navigation hors shell

Les pages suivantes sont hors shell applicatif principal :

```text
/login
```

La page suivante peut être hors shell ou semi-intégrée selon l’implémentation retenue :

```text
/privacy
```

La décision visuelle validée pour `Privacy_V1.0` conserve une présentation structurée, claire, compatible avec le langage visuel global.

### 6.4 Navigation par permissions

La navigation doit respecter le modèle RBAC / permissions du produit.

Règles :

- ne pas afficher inutilement des entrées interdites ;
- éviter les liens vers des pages inaccessibles ;
- conserver une structure stable ;
- ne pas créer de navigation commerciale ou marketing ;
- ne pas introduire de modules non validés.

---

## 7. Composants communs à créer / standardiser

Les composants suivants doivent servir de base à l’intégration UI.

### 7.1 `AppShell`

Rôle :

- structure globale des pages connectées ;
- contient la sidebar, la topbar et la zone principale.

À standardiser :

- largeur sidebar ;
- fond général ;
- espacement du contenu ;
- comportement responsive desktop simple ;
- intégration des permissions de navigation si applicable.

---

### 7.2 `Sidebar`

Rôle :

- navigation principale ;
- accès aux modules métier.

À standardiser :

- logo / nom produit ;
- liens de navigation ;
- état actif ;
- icônes sobres ;
- séparation éventuelle entre modules principaux et administration ;
- comportement selon permissions.

---

### 7.3 `Topbar`

Rôle :

- contexte utilisateur et société ;
- actions globales simples.

À standardiser :

- affichage société ;
- affichage utilisateur ;
- bouton déconnexion ;
- éventuel badge d’environnement ;
- style sobre et compact.

---

### 7.4 `PageHeader`

Rôle :

- titre et introduction de page ;
- action principale.

À standardiser :

- titre ;
- sous-titre court ;
- bouton principal à droite ;
- éventuels badges ou indicateurs contextuels ;
- alignement constant sur toutes les pages.

---

### 7.5 `StatCard`

Rôle :

- afficher une donnée synthétique simple.

Exemples :

- nombre de véhicules ;
- véhicules conformes ;
- utilisateurs actifs ;
- templates actifs ;
- imports à terminer ;
- événements d’audit récents.

À standardiser :

- titre court ;
- valeur principale ;
- détail secondaire ;
- icône discrète ;
- couleur uniquement si utile.

---

### 7.6 `DataTable`

Rôle :

- afficher les listes métier principales.

Utilisé pour :

- utilisateurs ;
- véhicules ;
- templates ;
- dépôts ;
- audit ;
- imports ;
- éléments planning si pertinent.

À standardiser :

- en-tête lisible ;
- lignes compactes ;
- colonnes alignées ;
- badges dans les colonnes de statut ;
- actions discrètes ;
- état vide ;
- état chargement ;
- état erreur.

---

### 7.7 `StatusBadge`

Rôle :

- afficher un état métier court.

Exemples :

```text
Actif
Inactif
Archivé
Conforme
Bientôt expiré
Expiré
Maintenance
Hors service
Terminé
En cours
À compléter
Bloquant
Alerte
Support
Sécurité
```

À standardiser :

- taille ;
- couleur ;
- libellé ;
- variante visuelle ;
- contraste ;
- usage cohérent par statut.

---

### 7.8 `ActionButton`

Rôle :

- standardiser les boutons d’action.

Types attendus :

```text
primary
secondary
ghost
danger
```

Règles :

- une seule action principale visible par zone ;
- actions secondaires plus discrètes ;
- actions destructives en rouge ;
- libellés courts et explicites ;
- pas de style marketing excessif.

---

### 7.9 `DangerZone`

Rôle :

- regrouper les actions sensibles.

Utilisé pour :

- archiver ;
- désactiver ;
- supprimer logiquement si applicable ;
- actions irréversibles ou sensibles.

Règles :

- rouge réservé ;
- message explicatif ;
- action clairement identifiable ;
- pas d’action dangereuse noyée dans le reste de l’interface.

---

### 7.10 `FilterBar`

Rôle :

- filtrage simple et métier.

Utilisé pour :

- recherche ;
- statut ;
- rôle ;
- base / dépôt ;
- type de véhicule ;
- période ;
- niveau d’audit.

Règles :

- compacte ;
- placée au-dessus des tableaux ;
- ne pas devenir un moteur de recherche avancé ;
- conserver les filtres utiles au métier.

---

### 7.11 `DetailDrawer`

Rôle :

- afficher ou modifier le détail d’un élément sans quitter la page.

Utilisé pour :

- fiche utilisateur ;
- détail véhicule ;
- détail template ;
- détail dépôt ;
- détail audit ;
- détail import.

Règles :

- panneau droit ;
- largeur confortable ;
- titre clair ;
- sections internes ;
- actions en bas ou en haut selon contexte ;
- fermeture évidente ;
- pas de surcharge.

---

### 7.12 `EmptyState`

Rôle :

- afficher un état vide clair.

Exemples :

```text
Aucun véhicule enregistré
Aucun utilisateur trouvé
Aucun template actif
Aucun événement d’audit
Aucun dépôt configuré
```

Règles :

- message simple ;
- action utile si applicable ;
- pas d’illustration excessive ;
- ton professionnel.

---

### 7.13 `ErrorMessage`

Rôle :

- afficher les erreurs utilisateur ou système.

Règles :

- message clair ;
- ton sobre ;
- rouge uniquement si nécessaire ;
- éviter les messages techniques bruts ;
- prévoir un détail secondaire si utile.

---

### 7.14 `FormSection`

Rôle :

- structurer les formulaires longs.

Utilisé pour :

- profil société ;
- utilisateur ;
- véhicule ;
- template ;
- dépôt ;
- paramètres métier.

Règles :

- titre de section ;
- description courte si nécessaire ;
- champs groupés logiquement ;
- espacement régulier ;
- messages d’erreur proches des champs.

---

## 8. Règles de tableaux

Les tableaux sont un élément central de la web app.

### 8.1 Densité

Les tableaux doivent être :

- compacts ;
- lisibles ;
- professionnels ;
- adaptés à un usage quotidien ;
- sans effet visuel inutile.

### 8.2 Colonnes

Les colonnes doivent afficher uniquement les données utiles.

Règles :

- éviter les colonnes décoratives ;
- privilégier les informations métier ;
- conserver des libellés courts ;
- aligner correctement les dates, statuts et actions ;
- ne pas surcharger la première version.

### 8.3 Actions de ligne

Les actions de ligne doivent être discrètes.

Exemples :

```text
Voir
Modifier
Archiver
Désactiver
Réinitialiser
Consulter
```

Les actions dangereuses doivent être visuellement distinguées ou déplacées dans une `DangerZone`.

### 8.4 Statuts en tableau

Les statuts doivent être affichés avec `StatusBadge`.

Exemples :

- actif / inactif ;
- conforme / bientôt expiré / expiré ;
- terminé / en cours / à compléter ;
- alerte / bloquant.

### 8.5 Filtres

Les filtres doivent être placés au-dessus du tableau.

Filtres fréquents :

- recherche texte ;
- statut ;
- rôle ;
- base ;
- type ;
- période.

### 8.6 États de tableau

Chaque tableau doit prévoir :

- état chargement ;
- état vide ;
- état erreur ;
- résultat filtré vide ;
- pagination ou limitation si nécessaire.

---

## 9. Règles de forms

### 9.1 Structure

Les formulaires doivent être structurés en sections.

Exemples :

```text
Informations générales
Coordonnées
Rôle & permissions
Base / dépôt
Paramètres métier
Conformité documentaire
Zone danger
```

### 9.2 Lisibilité

Les champs doivent être :

- alignés ;
- clairement nommés ;
- groupés par logique métier ;
- accompagnés d’aide courte si nécessaire.

### 9.3 Erreurs

Les erreurs doivent être :

- proches du champ concerné ;
- compréhensibles ;
- non techniques ;
- cohérentes avec les réponses API.

### 9.4 Actions

Les actions de formulaire doivent être claires :

```text
Enregistrer
Annuler
Créer
Modifier
Archiver
Désactiver
```

Règles :

- action principale en bleu ;
- action secondaire sobre ;
- action dangereuse en rouge ;
- éviter plusieurs boutons principaux concurrents.

### 9.5 Formulaires longs

Pour les formulaires longs :

- utiliser `FormSection` ;
- éviter les pages interminables ;
- utiliser un drawer si le contexte s’y prête ;
- conserver une hiérarchie claire.

---

## 10. Règles de drawers / panneaux droits

### 10.1 Usage attendu

Les drawers doivent être utilisés pour :

- consulter le détail d’une ligne ;
- modifier un élément ;
- afficher un historique ;
- afficher un payload JSON ;
- consulter une fiche ;
- limiter les changements de page.

### 10.2 Structure interne

Un drawer doit contenir :

```text
Titre
Sous-titre ou contexte
Sections de contenu
Actions principales
Zone danger si nécessaire
```

### 10.3 Cas d’usage validés

Drawers attendus sur :

- utilisateurs / RH ;
- véhicules / flotte ;
- templates ;
- dépôts ;
- audit ;
- onboarding / import.

### 10.4 Règles visuelles

Le drawer doit être :

- à droite ;
- clair ;
- lisible ;
- stable ;
- avec fond blanc ;
- bordure gauche fine ;
- largeur cohérente ;
- fermeture évidente.

### 10.5 Interdictions

Ne pas utiliser le drawer pour :

- remplacer toute navigation ;
- afficher des pages complètes trop longues ;
- cacher des actions critiques sans signalement ;
- créer une expérience trop complexe.

---

## 11. Règles de badges / statuts

### 11.1 Palette fonctionnelle

Les couleurs doivent rester sobres.

Usage recommandé :

```text
Bleu        : information, action, structure
Vert        : positif, conforme, terminé
Turquoise   : santé, état opérationnel positif
Orange      : attention, bientôt expiré, à compléter
Rouge       : danger, expiré, bloquant, alerte critique
Gris        : neutre, inactif, archivé
Violet      : support ou rôle spécifique si nécessaire
```

### 11.2 Statuts métier à prévoir

Statuts utilisateurs :

```text
Actif
Inactif
Archivé
Stagiaire
Support
```

Statuts véhicules :

```text
Disponible
Maintenance
Hors service
Conforme
Bientôt expiré
Expiré
Archivé
```

Statuts templates :

```text
Actif
Inactif
Archivé
```

Statuts onboarding :

```text
À compléter
En cours
Terminé
Erreur
```

Statuts audit :

```text
Info
Sécurité
Support
Modification
Erreur
Alerte
```

Statuts planning :

```text
Publié
Brouillon
À compléter
Conflit
Bloquant
```

### 11.3 Règles de rédaction

Les badges doivent être :

- courts ;
- lisibles ;
- compréhensibles ;
- cohérents entre les pages ;
- jamais utilisés pour de longues phrases.

---

## 12. Pages simples Login / Privacy

## 12.1 `Login_V1.0`

### Statut

```text
Login_V1.0 — validée visuellement
```

### Décision

La maquette `Login_V1.0` est retenue comme version visuelle de référence pour la page `/login`.

### Règles à conserver

La page Login doit rester :

- claire ;
- professionnelle ;
- identifiable ;
- alignée avec l’ambiance santé / ambulancier ;
- simple dans son parcours ;
- limitée à la connexion.

### Éléments attendus

La page doit contenir :

- champ email ;
- champ mot de passe ;
- bouton de connexion ;
- message d’erreur ;
- lien vers les mentions d’information / privacy ;
- identité visuelle Ambulance Manager.

### Exclusions Login

La page Login ne doit pas introduire :

- inscription ;
- essai gratuit ;
- abonnement ;
- paiement ;
- tunnel commercial ;
- chatbot ;
- IA ;
- multi-société avancée ;
- promesse fonctionnelle non présente dans le produit actuel.

---

## 12.2 `Privacy_V1.0`

### Statut

```text
Privacy_V1.0 — validée visuellement avec correctifs textuels à prévoir
```

### Décision

La maquette `Privacy_V1.0` est retenue comme version visuelle de référence pour la page `/privacy`.

### Règles à conserver

La page Privacy doit rester :

- structurée ;
- lisible ;
- professionnelle ;
- sobre ;
- compatible avec une mention d’information RGPD simple ;
- alignée avec la DA validée.

### Éléments attendus

La page peut contenir :

- titre clair ;
- introduction courte ;
- sommaire latéral ;
- sections d’information ;
- cards sobres ;
- icônes discrètes ;
- footer discret ;
- lien retour ou accès navigation selon contexte.

### Réserve

Quelques corrections de nomination des sociétés / libellés juridiques seront à prévoir avant intégration finale.

Ces correctifs textuels ne remettent pas en cause la validation visuelle de la page.

### Exclusions Privacy

La page Privacy ne doit pas introduire :

- gestion RGPD avancée ;
- module de consentement complexe ;
- bannière cookies avancée ;
- tableau de bord juridique ;
- chatbot ;
- IA ;
- reporting ;
- module hors scope.

---

## 13. Réserves connues

### 13.1 Société_V1.0

```text
Société_V1.0 — validée visuellement
Réserve : le bloc "Mode d’affichage planning" est conservé uniquement parce qu’il existe actuellement, mais son utilité métier est à réévaluer ultérieurement.
Statut : VALIDÉ VISUELLEMENT AVEC RÉSERVE
```

Cette réserve doit être conservée dans la documentation.

Elle ne remet pas en cause la validation visuelle de la page Société.

---

### 13.2 Dépôts_V1.0

```text
Dépôts_V1.0 — validée visuellement
Note : page validée en l’état, car elle n’est pas prioritaire pour le moment.
```

La page Dépôts est validée dans une version simple et suffisante pour le stade ALPHA.

Elle ne doit pas être sur-maquettée à ce stade.

---

### 13.3 Privacy_V1.0

```text
Privacy_V1.0 — validée visuellement avec correctifs textuels à prévoir
Réserve : quelques corrections de nomination des sociétés / libellés juridiques seront à prévoir avant intégration finale.
Ces correctifs ne remettent pas en cause la validation visuelle de la page.
```

Les correctifs attendus sont textuels / juridiques, pas graphiques.

---

## 14. Exclusions générales

La référence UI/UX ALPHA ne doit pas ouvrir les sujets suivants :

```text
billing
abonnement
essai gratuit
tunnel commercial
landing page marketing
IA
chatbot
reporting avancé
SIEM / cybersécurité avancée
mobile
tablette
multi-agences avancé
onboarding self-service SaaS avancé
carte géographique avancée
nouvelle direction artistique
```

### 14.1 Exclusions fonctionnelles

Ne pas introduire :

- module de facturation ;
- gestion d’abonnement ;
- paiement ;
- compte client self-service avancé ;
- assistant IA ;
- chatbot support ;
- reporting analytique avancé ;
- carte temps réel ;
- dispatch opérationnel avancé ;
- SIEM ;
- console cybersécurité ;
- gestion multi-agences avancée.

### 14.2 Exclusions UI

Ne pas introduire :

- nouvelle palette ;
- nouvelle sidebar ;
- nouveau style global ;
- thème marketing ;
- design mobile prioritaire ;
- design tablette prioritaire ;
- dark mode prioritaire s’il complexifie l’intégration ;
- refonte graphique non validée.

---

## 15. Recommandations pour intégration React / Next.js / Tailwind

### 15.1 Principe d’intégration

L’intégration doit privilégier une approche progressive :

1. créer ou stabiliser les composants communs ;
2. intégrer le layout global ;
3. appliquer la sidebar / topbar ;
4. reprendre les pages une par une ;
5. éviter les refontes simultanées trop larges ;
6. contrôler la cohérence visuelle à chaque page.

### 15.2 Priorité des composants

Ordre recommandé :

```text
1. AppShell
2. Sidebar
3. Topbar
4. PageHeader
5. ActionButton
6. StatusBadge
7. StatCard
8. DataTable
9. FilterBar
10. DetailDrawer
11. FormSection
12. EmptyState
13. ErrorMessage
14. DangerZone
```

### 15.3 Tailwind

L’intégration Tailwind doit viser :

- des classes simples ;
- des tokens ou constantes si le projet le permet ;
- une cohérence des espacements ;
- une cohérence des arrondis ;
- une cohérence des couleurs ;
- une hiérarchie typographique stable.

Éviter :

- classes trop dispersées ;
- styles inline inutiles ;
- couleurs inventées page par page ;
- composants visuellement différents pour le même usage.

### 15.4 React / Next.js

Recommandations :

- isoler les composants communs ;
- éviter la duplication de layout ;
- garder les pages lisibles ;
- séparer les composants UI purs des composants métier quand cela aide ;
- ne pas modifier la logique métier pendant l’intégration UI ;
- ne pas mélanger refonte UI et évolution fonctionnelle.

### 15.5 Accessibilité minimale

Prévoir :

- contrastes lisibles ;
- boutons identifiables ;
- labels de champs ;
- messages d’erreur compréhensibles ;
- focus visible ;
- textes suffisamment lisibles ;
- icônes jamais seules sans contexte si l’action n’est pas évidente.

### 15.6 Cohérence métier

Chaque écran doit rester adapté à un usage professionnel quotidien.

Priorités :

- rapidité de lecture ;
- compréhension immédiate ;
- actions visibles ;
- informations métier utiles ;
- pas d’effet esthétique au détriment de l’usage.

---

## 16. Décision finale NO_PATCH

### Décision

```text
NO_PATCH
```

### Justification

La session `A21-UX-06` est une session documentaire de synthèse UI/UX.

Elle ne nécessite :

- aucune modification du code applicatif ;
- aucun patch code ;
- aucune nouvelle maquette ;
- aucune nouvelle direction artistique ;
- aucune réouverture des validations visuelles précédentes.

### Statut final

```text
A21-UX-06 — Synthèse UI/UX ALPHA / référence exploitable Codex : VALIDÉE DOCUMENTAIREMENT
```

---

## 17. Suite logique recommandée

La suite logique recommandée est :

```text
A21-UX-07 — Clôture documentaire du bloc UI/UX
```

ou directement :

```text
CLOTURE_A21 — Validation finale du bloc UI/UX / Navigation
```

La clôture devra vérifier que :

- les maquettes validées sont bien tracées ;
- les réserves connues sont conservées ;
- la référence UI/UX ALPHA est exploitable ;
- aucune nouvelle DA n’a été ouverte ;
- le bloc A21 peut être considéré comme clôturable ou non selon les preuves documentaires disponibles.

### Suite après clôture A21

Après clôture du bloc UI/UX, l’intégration future pourra s’appuyer sur cette référence pour préparer une session de production dédiée à l’implémentation progressive des composants communs et du layout applicatif.

Cette future intégration devra rester séparée de la présente session documentaire.
