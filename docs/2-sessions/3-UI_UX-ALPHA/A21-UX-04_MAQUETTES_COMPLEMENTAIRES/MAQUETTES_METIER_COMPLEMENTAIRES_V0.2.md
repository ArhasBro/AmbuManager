# A21-UX-04 — MAQUETTES MÉTIER COMPLÉMENTAIRES V0.2

## 1. Identification de session

- **Bloc** : A21 — UI / UX / Navigation
- **Session** : A21-UX-04 — Maquettes métier complémentaires
- **Type** : Conception UI/UX / cadrage de maquettes
- **Décision patch code** : `NO_PATCH`
- **Objectif** : cadrer les maquettes métier complémentaires à partir de la direction artistique validée en A21-UX-03.
- **Livrable principal** : `MAQUETTES_METIER_COMPLEMENTAIRES_V0.2.md`

---

## 2. Références utilisées

### Références documentaires

- `docs/1-master/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md`
- `docs/2-sessions/3-UI_UX-ALPHA/A21-UX-02_DESIGN_SYSTEM/DESIGN_SYSTEM_UI_UX_ALPHA.md`
- `docs/2-sessions/3-UI_UX-ALPHA/A21-UX-03_MAQUETTES_FONDATRICES/MAQUETTES_FONDATRICES_V0.2.md`
- `docs/2-sessions/3-UI_UX-ALPHA/A21-UX-03_MAQUETTES_FONDATRICES/VALIDATION_MAQUETTES_FONDATRICES_V1.0.md`

### Références visuelles

Archive source validée :

```text
A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0.zip
```

Versions fondatrices validées :

- `Dashboard_V1.png`
- `Planning_V1.2.png`
- `Utilisateurs-RH_V1.png`
- `Véhicules_V1.2.png`

---

## 3. Objectif de A21-UX-04

La session A21-UX-04 sert à décliner la direction graphique validée sur les autres écrans métier principaux.

Elle ne doit pas rouvrir la direction artistique générale.

La DA validée est considérée comme figée à ce stade :

```text
SaaS métier moderne, santé / ambulancier, clair, professionnel, légèrement premium, faisable en code.
```

---

## 4. Pages concernées

A21-UX-04 couvre les pages complémentaires suivantes :

1. Templates de shifts
2. Société / paramètres métier
3. Dépôts / bases
4. Onboarding société pilote
5. Audit

Les pages simples `Login` et `Privacy` seront plutôt traitées dans A21-UX-05 — Pages simples / finitions, sauf décision contraire.

---

## 5. Règles non négociables

Les maquettes A21-UX-04 doivent conserver :

- même sidebar ;
- même topbar ;
- même palette ;
- mêmes cards ;
- mêmes badges ;
- mêmes tableaux ;
- même logique de panneaux de détail ;
- même niveau de densité contrôlée ;
- même style santé / ambulancier ;
- même réalisme d’intégration React / Next.js / Tailwind / Codex.

Les maquettes ne doivent pas introduire :

- régulation médicale ;
- dispatch temps réel ;
- carte géographique complexe ;
- reporting avancé ;
- maintenance flotte avancée ;
- billing ;
- mobile / tablette ;
- fonctionnalités hors périmètre V1.

---

## 6. Ordre de génération recommandé

Pour rester cohérent avec la méthode UX03, les maquettes doivent être générées et validées une par une.

Ordre recommandé :

1. Templates
2. Société / paramètres métier
3. Dépôts / bases
4. Onboarding
5. Audit

Justification :

- Templates complète directement le trio Planning / RH / Véhicules.
- Société / paramètres pose les règles métier.
- Dépôts / bases est plus simple et doit rester sobre.
- Onboarding est une page de workflow.
- Audit est une page technique/admin, à traiter après les pages métier.

---

# 7. Maquette 1 — Templates de shifts

## 7.1 Objectif

Créer une page claire pour gérer les modèles de shifts utilisés par le planning et l’autoschedule.

La page doit permettre de comprendre rapidement :

- le nom du template ;
- sa catégorie ;
- son horaire ;
- le véhicule requis ;
- la composition d’équipe ;
- son état ;
- sa couleur ;
- s’il est actif, désactivé ou archivé.

---

## 7.2 Structure cible

```text
AppShell
└─ PageHeader Templates
└─ StatCards simples
└─ FilterBar
└─ Liste/table templates
└─ Drawer détail template
```

---

## 7.3 PageHeader

Titre :

```text
Templates
```

Description :

```text
Gérez les modèles de shifts utilisés pour construire le planning.
```

Action principale :

```text
Créer un template
```

---

## 7.4 StatCards

Cards recommandées :

1. Templates actifs
2. Désactivés
3. Archivés
4. Traversent minuit

---

## 7.5 FilterBar

Filtres :

- recherche ;
- catégorie ;
- état ;
- véhicule requis ;
- afficher archivés.

Catégories :

- VSL ;
- Ambulance ;
- Taxi ;
- Garde.

États :

- actif ;
- désactivé ;
- archivé.

---

## 7.6 Table / liste templates

Colonnes recommandées :

- couleur ;
- nom ;
- catégorie ;
- horaire ;
- véhicule requis ;
- personnes requises ;
- rôle obligatoire ;
- rôles autorisés ;
- état ;
- actions.

### Affichage couleur

La couleur du template doit être visible dès la liste, car elle aide la lecture du planning.

Exemples :

- pastille colorée ;
- bordure gauche colorée ;
- mini bloc couleur.

---

## 7.7 Drawer template

Sections :

1. Identité
2. Équipe requise
3. Véhicule requis
4. Horaires
5. Affichage
6. Zone danger

### Identité

Champs :

- nom ;
- catégorie ;
- actif oui/non.

### Équipe requise

Champs :

- nombre de personnes requises ;
- rôle obligatoire slot 1 ;
- rôles autorisés autres slots.

### Véhicule requis

Champs :

- véhicule requis oui/non ;
- type requis si applicable.

### Horaires

Champs :

- horaire défini oui/non ;
- heure début ;
- heure fin ;
- traverse minuit oui/non.

### Affichage

Champs :

- couleur ;
- aperçu planning.

### Zone danger

Actions :

- désactiver ;
- réactiver ;
- archiver.

---

## 7.8 À ne pas afficher

- règles complexes d’autoschedule ;
- scoring matching ;
- historique complet ;
- planning détaillé dans la page template ;
- paramètres société globaux.

---

## 7.9 Prompt de génération visuelle — Templates

```text
Créer une maquette desktop 16:10 pour la page "Templates" d’Ambulance Manager.

Utiliser exactement la DA validée :
SaaS métier moderne, santé / ambulancier, clair, professionnel, légèrement premium.
Interface en français.
Même sidebar, même topbar, même palette, mêmes cards, badges et panneaux de détail que les maquettes Dashboard, Planning, Utilisateurs/RH et Véhicules déjà validées.

Page :
Titre "Templates".
Sous-titre : "Gérez les modèles de shifts utilisés pour construire le planning."
Bouton principal : "Créer un template".

En haut :
4 cards : Templates actifs, Désactivés, Archivés, Traversent minuit.

FilterBar :
recherche, catégorie, état, véhicule requis, afficher archivés.

Table principale :
colonnes couleur, nom, catégorie, horaire, véhicule requis, personnes requises, rôle obligatoire, rôles autorisés, état, actions.
Afficher clairement les couleurs des templates avec pastilles ou bordures colorées.
Badges : VSL, Ambulance, Taxi, Garde, Actif, Désactivé, Archivé.

À droite :
drawer détail template ouvert.
Sections : Identité, Équipe requise, Véhicule requis, Horaires, Affichage, Zone danger.
Champs visibles : nom, catégorie, actif, nombre de personnes, rôle obligatoire slot 1, rôles autorisés, véhicule requis, heure début, heure fin, traverse minuit, couleur, aperçu planning.
Zone danger : désactiver, réactiver ou archiver.

Ne pas afficher de règles complexes d’autoschedule, scoring matching, historique complet ou planning détaillé.
La maquette doit être réaliste à coder en React / Next.js / Tailwind.
```

---

# 8. Maquette 2 — Société / paramètres métier

## 8.1 Objectif

Créer une page simple, lisible et professionnelle pour le profil société et les paramètres métier ALPHA.

La page ne doit pas ressembler à un centre de configuration avancé.

---

## 8.2 Structure cible

```text
AppShell
└─ PageHeader Société
└─ Deux colonnes ou deux grands panels
   ├─ Identité société
   └─ Paramètres métier ALPHA
```

---

## 8.3 PageHeader

Titre :

```text
Société
```

Description :

```text
Gérez l’identité de la société et les paramètres métier principaux.
```

Action principale :

```text
Enregistrer
```

---

## 8.4 Section identité société

Champs :

- nom de la société ;
- noms des gérants ;
- adresse ;
- téléphone ;
- SIRET.

---

## 8.5 Section paramètres métier ALPHA

Paramètres visibles :

- repos minimum entre deux shifts ;
- mode affichage planning :
  - SIMPLE ;
  - AMBULANCE.

Règles métier ALPHA :

- valeur ;
- mode :
  - OFF ;
  - ALERT ;
  - BLOCK ;
  - BOTH.

---

## 8.6 À ne pas afficher

- billing ;
- abonnement ;
- intégrations externes ;
- paramètres avancés non prévus ;
- gestion multi-agences ;
- branding complet ;
- configuration RGPD avancée.

---

## 8.7 Prompt de génération visuelle — Société

```text
Créer une maquette desktop 16:10 pour la page "Société" d’Ambulance Manager.

Utiliser la DA validée : SaaS métier moderne, santé / ambulancier, clair, professionnel, légèrement premium.
Même sidebar, topbar, cards, boutons et badges que les maquettes validées.

Page :
Titre "Société".
Sous-titre : "Gérez l’identité de la société et les paramètres métier principaux."
Bouton principal : "Enregistrer".

Contenu en deux grands panels :
1. Identité société
2. Paramètres métier ALPHA

Panel identité :
champs nom de la société, gérants, adresse, téléphone, SIRET.

Panel paramètres :
repos minimum entre deux shifts.
mode affichage planning : SIMPLE / AMBULANCE.
zone règles métier ALPHA avec valeur et mode OFF / ALERT / BLOCK / BOTH.

Style sobre, clair, peu chargé.
Ne pas afficher billing, abonnement, intégrations externes, branding avancé, multi-agences ou RGPD avancé.
La maquette doit être réaliste à coder en React / Next.js / Tailwind.
```

---

# 9. Maquette 3 — Dépôts / bases

## 9.1 Objectif

Créer une page CRUD simple pour les bases / dépôts.

La page doit rester volontairement simple, car le périmètre réel actuel est limité à :

- nom ;
- adresse ;
- création ;
- modification ;
- archivage.

---

## 9.2 Structure cible

```text
AppShell
└─ PageHeader Dépôts
└─ StatCards simples
└─ FilterBar légère
└─ Cards ou table dépôts
└─ Drawer création / modification
```

---

## 9.3 PageHeader

Titre :

```text
Dépôts / bases
```

Description :

```text
Gérez les bases de rattachement de vos équipes et véhicules.
```

Action principale :

```text
Créer un dépôt
```

---

## 9.4 StatCards

Cards recommandées :

1. Dépôts actifs
2. Archivés
3. Véhicules rattachés
4. Utilisateurs rattachés

Les deux dernières cards peuvent être indicatives si les données existent côté interface future. Sinon, rester sur actifs / archivés.

---

## 9.5 Liste dépôts

Deux options acceptables :

### Option A — cards

Plus visuelle, adaptée si peu de dépôts.

Chaque card :

- nom ;
- adresse ;
- statut ;
- actions modifier / archiver.

### Option B — table

Plus dense, adaptée si beaucoup de dépôts.

Colonnes :

- nom ;
- adresse ;
- statut ;
- dernière modification ;
- actions.

---

## 9.6 Drawer dépôt

Champs :

- nom ;
- adresse.

Zone danger :

- archiver dépôt.

---

## 9.7 À ne pas afficher

- carte géographique ;
- capacité dépôt ;
- horaires dépôt ;
- planning dépôt ;
- couverture territoriale ;
- statistiques avancées ;
- responsable si non géré actuellement.

---

## 9.8 Prompt de génération visuelle — Dépôts

```text
Créer une maquette desktop 16:10 pour la page "Dépôts / bases" d’Ambulance Manager.

Utiliser la DA validée : SaaS métier moderne, santé / ambulancier, clair, professionnel, légèrement premium.
Même sidebar, topbar, cards, badges, boutons et drawer que les maquettes validées.

Page :
Titre "Dépôts / bases".
Sous-titre : "Gérez les bases de rattachement de vos équipes et véhicules."
Bouton principal : "Créer un dépôt".

En haut :
cards simples : Dépôts actifs, Archivés, Véhicules rattachés, Utilisateurs rattachés.

Contenu :
liste de dépôts sous forme de cards ou table propre.
Chaque dépôt affiche nom, adresse, statut actif/archivé, actions modifier et archiver.

À droite :
drawer dépôt ouvert avec champs nom et adresse.
Zone danger : archiver dépôt.

Ne pas afficher carte géographique, capacité, horaires dépôt, planning dépôt, couverture territoriale, statistiques avancées ou responsable non prévu.
La maquette doit être réaliste à coder en React / Next.js / Tailwind.
```

---

# 10. Maquette 4 — Onboarding société pilote

## 10.1 Objectif

Créer une page guidée pour initialiser une société pilote.

La page doit être claire, rassurante et orientée workflow.

---

## 10.2 Structure cible

```text
AppShell
└─ PageHeader Onboarding
└─ Colonne checklist
└─ Colonne import initial
└─ Prévisualisation import / erreurs
```

---

## 10.3 PageHeader

Titre :

```text
Onboarding société pilote
```

Description :

```text
Préparez les données nécessaires avant la première exploitation réelle.
```

---

## 10.4 Checklist

Étapes :

1. Profil société
2. Bases / dépôts
3. Utilisateurs
4. Véhicules
5. Templates

Chaque étape affiche :

- statut ;
- compteur ;
- action rapide.

États :

- à compléter ;
- en cours ;
- terminé.

---

## 10.5 Import initial

Domaines importables :

- utilisateurs ;
- véhicules ;
- templates ;
- dépôts ;
- absences utilisateurs.

Workflow :

1. choisir type d’import ;
2. sélectionner fichier CSV/XLSX ;
3. prévisualiser ;
4. voir erreurs ;
5. valider import.

---

## 10.6 À ne pas afficher

- onboarding self-service SaaS complet ;
- paiement ;
- abonnement ;
- configuration multi-société avancée ;
- assistant IA ;
- import automatique externe.

---

## 10.7 Prompt de génération visuelle — Onboarding

```text
Créer une maquette desktop 16:10 pour la page "Onboarding société pilote" d’Ambulance Manager.

Utiliser la DA validée : SaaS métier moderne, santé / ambulancier, clair, professionnel, légèrement premium.
Même sidebar, topbar, cards, boutons, badges et panels que les maquettes validées.

Page :
Titre "Onboarding société pilote".
Sous-titre : "Préparez les données nécessaires avant la première exploitation réelle."

Structure en deux colonnes :
à gauche, checklist de démarrage.
à droite, import initial.

Checklist :
Profil société, Bases / dépôts, Utilisateurs, Véhicules, Templates.
Chaque étape affiche statut, compteur et bouton action.
États : À compléter, En cours, Terminé.

Import :
type d’import, fichier CSV/XLSX, aperçu, erreurs, validation.
Domaines importables : utilisateurs, véhicules, templates, dépôts, absences utilisateurs.

Prévoir une zone d’aperçu import avec quelques lignes et une zone erreurs repliable.
Ne pas afficher paiement, abonnement, self-service SaaS complet, IA, intégrations externes ou multi-société avancée.
La maquette doit être réaliste à coder en React / Next.js / Tailwind.
```

---

# 11. Maquette 5 — Audit

## 11.1 Objectif

Créer une page technique / admin lisible pour consulter le journal d’audit.

Cette page doit rester sobre, dense et exploitable.

---

## 11.2 Structure cible

```text
AppShell
└─ PageHeader Audit
└─ FilterBar
└─ Table audit
└─ Drawer détail audit
└─ JSON repliable
```

---

## 11.3 PageHeader

Titre :

```text
Journal d’audit
```

Description :

```text
Consultez les actions sensibles et les événements tracés dans l’application.
```

---

## 11.4 FilterBar

Filtres :

- société, pour support global ;
- type d’entité ;
- id d’entité ;
- action ;
- source ;
- période.

---

## 11.5 Table audit

Colonnes :

- date ;
- résumé ;
- source ;
- action ;
- type entité ;
- id entité ;
- acteur ;
- détail.

Badges :

- connexion ;
- utilisateur ;
- absence ;
- véhicule ;
- planning ;
- autoschedule ;
- support ;
- sécurité.

---

## 11.6 Drawer détail audit

Contenu :

- résumé ;
- date ;
- action ;
- source ;
- acteur ;
- entité ;
- payload JSON repliable ;
- bouton copier JSON.

---

## 11.7 À ne pas afficher

- graphiques d’audit ;
- analytics ;
- reporting sécurité avancé ;
- SIEM ;
- alertes avancées ;
- suppression d’audit.

---

## 11.8 Prompt de génération visuelle — Audit

```text
Créer une maquette desktop 16:10 pour la page "Journal d’audit" d’Ambulance Manager.

Utiliser la DA validée : SaaS métier moderne, santé / ambulancier, clair, professionnel, légèrement premium.
Même sidebar, topbar, tables, badges, drawers et panels que les maquettes validées.

Page :
Titre "Journal d’audit".
Sous-titre : "Consultez les actions sensibles et les événements tracés dans l’application."

FilterBar :
société, type d’entité, id d’entité, action, source, période.

Table audit dense :
colonnes date, résumé, source, action, type entité, id entité, acteur, détail.
Badges : Connexion, Utilisateur, Absence, Véhicule, Planning, Autoschedule, Support, Sécurité.

À droite :
drawer détail audit ouvert.
Contenu : résumé, date, action, source, acteur, entité, payload JSON repliable, bouton copier JSON.
Style admin/technique mais propre et lisible.

Ne pas afficher graphiques, analytics, SIEM, reporting sécurité avancé, alertes avancées ou suppression d’audit.
La maquette doit être réaliste à coder en React / Next.js / Tailwind.
```

---

# 12. Critères de validation A21-UX-04

La session A21-UX-04 sera validable si :

- les 5 pages complémentaires sont cadrées ;
- les prompts de génération sont prêts ;
- la DA validée en UX03 est respectée ;
- aucune fonctionnalité hors périmètre V1 n’est introduite ;
- chaque page reste réaliste à intégrer ;
- les pages simples Login / Privacy sont laissées pour A21-UX-05 ;
- chaque image générée ensuite est versionnée.

---

# 13. Décision finale de session documentaire

```text
NO_PATCH
```

Aucun code n’est modifié.

Le livrable principal est documentaire :

```text
MAQUETTES_METIER_COMPLEMENTAIRES_V0.2.md
```

---

# 14. Prochaine étape

Prochaine étape après validation de ce document :

```text
Génération visuelle contrôlée — écran 1 : Templates
```

Puis validation utilisateur avant de passer à :

1. Société / paramètres métier ;
2. Dépôts / bases ;
3. Onboarding ;
4. Audit.
