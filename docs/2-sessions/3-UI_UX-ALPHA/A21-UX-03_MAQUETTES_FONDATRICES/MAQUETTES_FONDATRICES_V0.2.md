# A21-UX-03 — MAQUETTES FONDATRICES V0.2

## 1. Identification de session

- **Bloc** : A21 — UI / UX / Navigation
- **Session** : A21-UX-03 — MAQUETTES FONDATRICES
- **Type** : Conception UI/UX / cadrage de maquettes
- **Décision patch code** : `NO_PATCH`
- **Objectif** : cadrer les quatre écrans fondateurs de la maquette V0.2 avant génération visuelle et avant intégration future via VS Code / Codex.
- **Livrable principal** : `MAQUETTES_FONDATRICES_V0.2.md`

---

## 2. Références utilisées

- `docs/1-master/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md`
- `docs/2-sessions/3-UI_UX-ALPHA/A21-UX-02_DESIGN_SYSTEM/DESIGN_SYSTEM_UI_UX_ALPHA.md`
- Écrans actuels fournis dans `Screen WebApp.zip`
- Direction graphique initiale `ProtoV0.1`
- Retours utilisateur sur ProtoV0.1
- Liste fonctionnelle réelle transmise par l’utilisateur

---

## 3. Objectif de A21-UX-03

La session A21-UX-03 ne doit pas encore produire toute la WebApp.

Elle doit cadrer les **quatre écrans fondateurs** qui permettront de valider la direction graphique globale avant déclinaison complète :

1. **Shell global + Dashboard portail**
2. **Planning compact**
3. **Utilisateurs / RH**
4. **Véhicules / flotte**

Ces écrans couvrent les composants les plus importants :

- navigation ;
- sidebar ;
- topbar ;
- cards ;
- compteurs ;
- tableaux ;
- filtres ;
- badges ;
- drawers ;
- formulaires ;
- états métier ;
- densité de données ;
- actions sensibles ;
- dark mode prévu.

---

## 4. Règle générale de conception

La maquette V0.2 doit récupérer le niveau graphique de ProtoV0.1, mais corriger son fond.

### À conserver

- style SaaS moderne ;
- ambiance santé / ambulancier ;
- sidebar gauche ;
- cartes propres ;
- palette blanc / bleu / turquoise / vert santé ;
- badges statut ;
- hiérarchie visuelle ;
- impression premium légère ;
- lisibilité professionnelle.

### À corriger

- retirer les contenus de régulation temps réel ;
- retirer les cartes d’interventions urgentes ;
- retirer le dashboard analytique avancé ;
- retirer les cartes géographiques ;
- recentrer sur la gestion interne ambulancière.

### À éviter

- page dispatch ;
- temps de réponse ;
- interventions critiques ;
- carte d’urgence ;
- reporting avancé ;
- maintenance avancée ;
- animations complexes ;
- drag-and-drop obligatoire.

---

## 5. Format attendu des maquettes

Les maquettes doivent être pensées en **desktop web app**.

Format recommandé :

- ratio visuel principal : `16:10` ou `16:9` ;
- largeur cible : entre `1440px` et `1600px` ;
- navigation sidebar visible ;
- pas de cadrage mobile pour cette session ;
- dark mode prévu dans le design system, pas obligatoire à générer pour chaque écran V0.2.

Style visuel :

- clair ;
- moderne ;
- professionnel ;
- légèrement premium ;
- métier ;
- codable.

---

# 6. Maquette 1 — Shell global + Dashboard portail

## 6.1 Objectif

Créer l’écran de référence du produit.

Cet écran doit valider :

- le shell global ;
- la sidebar ;
- la topbar ;
- la zone logo ;
- la structure de page ;
- les cards ;
- les compteurs simples ;
- les accès rapides ;
- le niveau de densité général.

Le dashboard V1 doit rester un **portail d’accueil opérationnel**, pas un cockpit analytique.

## 6.2 Structure générale

```text
Sidebar gauche
└─ Logo / nom produit / badge ALPHA
└─ Navigation
└─ Theme toggle / profil ou statut

Topbar
└─ Titre court / société
└─ profil utilisateur
└─ thème
└─ déconnexion

Main
└─ PageHeader
└─ bloc identité utilisateur
└─ compteurs simples
└─ cartes d’accès rapides
```

## 6.3 Sidebar cible

Zone marque :

- emplacement logo ;
- texte `Ambulance Manager` ;
- badge discret `ALPHA`.

Items visibles pour admin/gérant :

1. Tableau de bord
2. Planning
3. Utilisateurs / RH
4. Véhicules
5. Templates
6. Société
7. Dépôts
8. Onboarding
9. Audit

Items exclus de la V1 :

- Rapports / analyses dans le menu principal.

## 6.4 Topbar cible

Éléments :

- société active ;
- utilisateur connecté ;
- rôle ;
- bouton / menu déconnexion ;
- switch thème clair / sombre / auto.

Ne pas ajouter :

- notifications temps réel ;
- alertes intervention ;
- widgets analytiques.

## 6.5 Contenu Dashboard

PageHeader :

```text
Tableau de bord
```

Description :

```text
Portail d’accès aux modules de gestion de votre société ambulancière.
```

Bloc identité :

- nom utilisateur ;
- email ;
- rôle ;
- société ;
- permissions principales ou profil.

Compteurs simples :

1. Utilisateurs actifs
2. Véhicules actifs
3. Dépôts actifs
4. Templates actifs

Cartes d’accès rapides :

- Planning
- Utilisateurs / RH
- Véhicules
- Templates
- Société
- Dépôts
- Onboarding
- Audit

Chaque carte contient :

- icône ;
- titre ;
- description courte ;
- badge éventuel ;
- bouton `Ouvrir`.

## 6.6 À ne pas afficher

- courbes ;
- graphique d’activité ;
- carte géographique ;
- missions du jour ;
- temps moyen de réponse ;
- interventions urgentes ;
- alertes de régulation.

## 6.7 Composants utilisés

- `AppShell`
- `Sidebar`
- `Topbar`
- `PageHeader`
- `StatCard`
- `ActionCard`
- `StatusBadge`
- `ThemeToggle`
- `PermissionGate`

---

## 6.8 Prompt de génération visuelle — Dashboard

```text
Créer une maquette desktop 16:10 d’une WebApp SaaS métier nommée Ambulance Manager.

Thème : santé, ambulancier, moderne, clair, professionnel, légèrement premium.
Interface en français.

Créer l’écran "Tableau de bord" comme portail d’accueil, pas comme cockpit analytique.

Conserver :
- sidebar gauche moderne ;
- topbar légère ;
- emplacement logo en haut de sidebar ;
- badge ALPHA discret ;
- palette blanc, bleu médical, turquoise, vert santé ;
- cards blanches avec bordures douces ;
- badges statut ;
- typographie propre.

Sidebar :
Tableau de bord actif, Planning, Utilisateurs / RH, Véhicules, Templates, Société, Dépôts, Onboarding, Audit.

Main :
Titre "Tableau de bord".
Sous-titre : "Portail d’accès aux modules de gestion de votre société ambulancière."
Bloc identité utilisateur : nom, email, rôle, société.
4 compteurs simples : Utilisateurs actifs, Véhicules actifs, Dépôts actifs, Templates actifs.
Grille de cartes d’accès rapides : Planning, Utilisateurs / RH, Véhicules, Templates, Société, Dépôts, Onboarding, Audit.

Ne pas afficher de carte géographique, d’interventions urgentes, de temps de réponse, de dashboard régulation ou de graphiques avancés.
La maquette doit être réaliste à coder en React / Next.js / Tailwind.
```

---

# 7. Maquette 2 — Planning compact

## 7.1 Objectif

Créer une vue planning globale, très lisible, orientée gestion du personnel.

Cette vue doit répondre à la demande utilisateur :

```text
employés en lignes, semaines en colonnes
```

Elle sert à voir rapidement la charge, les absences et les conflits.

## 7.2 Structure générale

```text
AppShell
└─ PageHeader Planning
└─ Toolbar période / vue / filtres / exports
└─ Tabs planning
└─ Barre résumé
└─ Tableau compact personnel x semaines
└─ Drawer détail au clic
```

## 7.3 PageHeader

Titre :

```text
Planning
```

Description :

```text
Vue globale des shifts, absences et affectations du personnel.
```

Actions principales :

- `Ajouter un shift`
- `Export PDF`
- `Export Excel`
- `CSV`
- `Imprimer`

## 7.4 Tabs planning

Tabs visibles :

1. Planning manuel
2. Affectations
3. Autoschedule
4. Matching
5. Historique
6. Exports

Onglet actif :

```text
Planning manuel
```

## 7.5 Filtres

Filtres en haut :

- période / mois ;
- dépôt ;
- rôle ;
- utilisateur ;
- vue : Jour / Semaine / Mois / Personnel.

Vue active :

```text
Personnel
```

## 7.6 Tableau compact

Lignes :

- chaque ligne représente un salarié.

Colonnes fixes à gauche :

- salarié ;
- rôle ;
- base ;
- statut ;
- total mensuel.

Colonnes principales :

- Semaine 1
- Semaine 2
- Semaine 3
- Semaine 4
- Semaine 5 si nécessaire

Cellule compacte :

- nombre de shifts ;
- total heures ;
- absence si présent ;
- conflit si présent ;
- badge état.

Exemples :

```text
5 shifts
38h
OK
```

```text
3 shifts
24h
1 absence
```

```text
6 shifts
46h
Conflit repos
```

Badges :

- `OK` : vert ;
- `Absence` : orange ;
- `Conflit` : rouge ;
- `Repos` : gris / bleu doux ;
- `Brouillon` : orange ;
- `Publié` : vert.

## 7.7 Barre de sélection multiple

À prévoir dans la maquette, même si non active par défaut.

État sélection active :

```text
3 shifts sélectionnés
[Affecter employé 1] [Affecter employé 2] [Affecter véhicule] [Affecter base] [Vider]
```

## 7.8 Drawer détail

Au clic sur une cellule :

- salarié ;
- semaine ;
- total shifts ;
- total heures ;
- liste courte des shifts ;
- absences ;
- conflits ;
- actions : voir détail, modifier, ajouter shift.

## 7.9 À ne pas afficher

- calendrier quotidien ultra détaillé ;
- interventions urgentes ;
- dispatch en temps réel ;
- carte ;
- graphiques.

## 7.10 Composants utilisés

- `AppShell`
- `PageHeader`
- `Tabs`
- `FilterBar`
- `DataTable`
- `StatusBadge`
- `DetailsDrawer`
- `ActionBar`
- `ButtonGroup`

---

## 7.11 Prompt de génération visuelle — Planning compact

```text
Créer une maquette desktop 16:10 pour la page "Planning" d’Ambulance Manager.

Thème : WebApp SaaS métier ambulancier, santé, moderne, clair, premium léger, français.
Utiliser le même shell global que le dashboard : sidebar gauche, topbar, cards blanches, bleu médical, turquoise, vert santé.

Objectif : planning compact du personnel.
Ne pas faire une vue dispatch ou interventions.

Page :
Titre "Planning".
Sous-titre : "Vue globale des shifts, absences et affectations du personnel."

Toolbar :
période, dépôt, rôle, utilisateur, vue "Personnel", boutons Ajouter un shift, Export PDF, Excel, CSV, Imprimer.

Tabs :
Planning manuel actif, Affectations, Autoschedule, Matching, Historique, Exports.

Tableau principal :
employés en lignes, semaines en colonnes.
Colonnes fixes : salarié, rôle, base, statut, total mensuel.
Colonnes : Semaine 1, Semaine 2, Semaine 3, Semaine 4.
Chaque cellule affiche : nombre de shifts, total heures, badge OK / Absence / Conflit / Repos.
Utiliser des badges verts, orange, rouges, gris.
Prévoir visuellement une barre d’action groupée discrète pour sélection multiple.
Prévoir un drawer de détail à droite ouvert sur une cellule sélectionnée.

Ne pas afficher de carte, interventions urgentes, temps de réponse ou graphiques avancés.
La maquette doit être réaliste à coder en React / Next.js / Tailwind.
```

---

# 8. Maquette 3 — Utilisateurs / RH

## 8.1 Objectif

Créer une vraie page RH / salarié, claire et structurée.

Elle doit remplacer la logique actuelle de formulaire long par une interface :

```text
table utilisateurs + fiche salarié en drawer
```

## 8.2 Structure générale

```text
AppShell
└─ PageHeader Utilisateurs / RH
└─ StatCards simples
└─ FilterBar
└─ Table utilisateurs
└─ Drawer fiche salarié
```

## 8.3 PageHeader

Titre :

```text
Utilisateurs / RH
```

Description :

```text
Gérez les salariés, rôles, permissions, rattachements, horaires et absences.
```

Action principale :

```text
Créer un utilisateur
```

## 8.4 StatCards

Cards recommandées :

1. Utilisateurs actifs
2. Stagiaires
3. Absences en cours
4. Comptes archivés

## 8.5 FilterBar

Filtres :

- recherche ;
- rôle ;
- base ;
- statut ;
- stagiaire oui/non.

Recherche sur :

- nom ;
- email ;
- initiales ;
- téléphone.

## 8.6 Table utilisateurs

Colonnes recommandées :

- identité ;
- initiales ;
- email ;
- rôle ;
- base ;
- téléphone ;
- statut ;
- stagiaire ;
- horaires ;
- dernière modification ;
- actions.

Ligne utilisateur :

- avatar initiales ;
- nom complet ;
- email ;
- rôle badge ;
- base ;
- statut actif / inactif ;
- stagiaire si oui ;
- actions voir / modifier / plus.

## 8.7 Drawer fiche salarié

Header :

- avatar initiales ;
- nom complet ;
- rôle ;
- statut ;
- base ;
- action enregistrer.

Tabs :

1. Identité
2. Rôle & permissions
3. RH
4. Absences
5. Sécurité

## 8.8 Tab Identité

Champs :

- prénom ;
- nom ;
- nom complet ;
- initiales ;
- email ;
- téléphone.

## 8.9 Tab Rôle & permissions

Champs :

- rôle principal ;
- permissions groupées.

Groupes :

- Planning ;
- Utilisateurs ;
- Véhicules ;
- Templates ;
- Société ;
- Audit ;
- Dashboard.

Règle UI :

- utiliser des accordéons ;
- ne pas afficher toutes les permissions en grille énorme ouverte par défaut.

## 8.10 Tab RH

Champs :

- base / dépôt ;
- actif ;
- stagiaire ;
- horaires journaliers simples.

## 8.11 Tab Absences

Afficher :

- liste des absences ;
- motif ;
- début ;
- fin ;
- statut ;
- bouton créer absence ;
- actions modifier / supprimer.

Message de conflit :

```text
Chevauchement détecté avec une absence existante.
```

## 8.12 Tab Sécurité

Actions :

- réinitialiser mot de passe ;
- archiver utilisateur.

Cette zone doit utiliser `DangerZone`.

## 8.13 À ne pas afficher

- organigramme complexe ;
- planning salarié détaillé dans cette page ;
- statistiques RH avancées ;
- paie ;
- contrats ;
- documents RH non prévus.

## 8.14 Composants utilisés

- `AppShell`
- `PageHeader`
- `StatCard`
- `FilterBar`
- `DataTable`
- `StatusBadge`
- `DetailsDrawer`
- `Tabs`
- `FormSection`
- `DangerZone`
- `ConfirmModal`

## 8.15 Évolution bêta prévue :

- colonne rôle compatible multi-badges
- drawer "Rôle & permissions" compatible multi-rôle

---

## 8.15 Prompt de génération visuelle — Utilisateurs / RH

```text
Créer une maquette desktop 16:10 pour la page "Utilisateurs / RH" d’Ambulance Manager.

Thème : santé, ambulancier, SaaS moderne, clair, professionnel, légèrement premium.
Interface en français.
Utiliser le shell global avec sidebar gauche et topbar.

Page :
Titre "Utilisateurs / RH".
Sous-titre : "Gérez les salariés, rôles, permissions, rattachements, horaires et absences."
Bouton principal : "Créer un utilisateur".

En haut :
4 cards simples : Utilisateurs actifs, Stagiaires, Absences en cours, Comptes archivés.

FilterBar :
recherche, rôle, base, statut, stagiaire.

Table utilisateurs :
colonnes identité, initiales, email, rôle, base, téléphone, statut, stagiaire, horaires, dernière modification, actions.
Design dense mais lisible.

À droite :
drawer fiche salarié ouvert sur un utilisateur.
Header avec avatar initiales, nom complet, rôle, statut, base.
Tabs : Identité, Rôle & permissions, RH, Absences, Sécurité.

Dans le drawer, montrer surtout :
Identité : prénom, nom, initiales, email, téléphone.
Rôle & permissions : groupes repliables Planning, Utilisateurs, Véhicules, Templates, Société, Audit, Dashboard.
RH : base, actif, stagiaire, horaires journaliers.
Absences : liste motif, début, fin, créer absence.
Sécurité : réinitialiser mot de passe et archiver en zone danger.

Ne pas afficher paie, contrat, statistiques RH avancées ou organigramme.
La maquette doit être réaliste à coder en React / Next.js / Tailwind.
```

---

# 9. Maquette 4 — Véhicules / flotte

## 9.1 Objectif

Créer une page flotte métier, claire, riche mais réaliste.

La page doit mettre en avant :

- statut opérationnel ;
- base ;
- conformité documentaire ;
- actions d’édition ;
- archivage discret.

## 9.2 Structure générale

```text
AppShell
└─ PageHeader Véhicules
└─ StatCards flotte
└─ FilterBar
└─ Table véhicules
└─ Drawer véhicule sélectionné
```

## 9.3 PageHeader

Titre :

```text
Véhicules
```

Description :

```text
Gérez la flotte, les bases de rattachement et la conformité documentaire.
```

Action principale :

```text
Ajouter un véhicule
```

Note :

La création véhicule est réservée au rôle admin dans l’état actuel. Le bouton peut donc être visible seulement pour admin.

## 9.4 StatCards

Cards recommandées :

1. Véhicules actifs
2. Disponibles
3. En maintenance
4. Hors service
5. Conformité à surveiller

Si 5 cards sont trop larges, afficher 4 cards et placer conformité dans un panneau secondaire.

## 9.5 FilterBar

Filtres :

- recherche immatriculation ;
- type ;
- statut ;
- base ;
- conformité.

## 9.6 Table véhicules

Colonnes recommandées :

- immatriculation ;
- type ;
- statut ;
- base ;
- assurance ;
- contrôle technique ;
- carte grise ;
- agrément sanitaire ;
- conformité ;
- dernière modification ;
- actions.

Types :

- Ambulance ;
- VSL ;
- Taxi.

Statuts :

- Active ;
- Maintenance ;
- Hors service.

Conformité :

- Conforme ;
- Bientôt expiré ;
- Expiré ;
- Incomplet.

## 9.7 Drawer véhicule

Header :

- immatriculation ;
- type ;
- statut ;
- base ;
- conformité globale.

Sections :

1. Identité véhicule
2. Rattachement base
3. Conformité documentaire
4. Zone danger

Identité véhicule :

- immatriculation ;
- type ;
- statut.

Rattachement base :

- base ;
- option aucune base.

Conformité documentaire :

- date expiration assurance ;
- date expiration contrôle technique ;
- présence carte grise ;
- date expiration agrément sanitaire.

Zone danger :

```text
Archiver véhicule
Le véhicule sera retiré de la flotte active sans suppression physique.
```

## 9.8 À ne pas afficher

- maintenance avancée ;
- calendrier d’entretien complet ;
- kilométrage si non géré ;
- géolocalisation ;
- carte ;
- planning véhicule détaillé ;
- coûts ;
- facturation.

## 9.9 Composants utilisés

- `AppShell`
- `PageHeader`
- `StatCard`
- `FilterBar`
- `DataTable`
- `StatusBadge`
- `DetailsDrawer`
- `FormSection`
- `DangerZone`
- `ConfirmModal`

---

## 9.10 Prompt de génération visuelle — Véhicules

```text
Créer une maquette desktop 16:10 pour la page "Véhicules" d’Ambulance Manager.

Thème : santé, ambulancier, SaaS moderne, clair, professionnel, légèrement premium.
Interface en français.
Utiliser le shell global avec sidebar gauche et topbar.

Page :
Titre "Véhicules".
Sous-titre : "Gérez la flotte, les bases de rattachement et la conformité documentaire."
Bouton principal : "Ajouter un véhicule".

En haut :
cards : Véhicules actifs, Disponibles, En maintenance, Hors service, Conformité à surveiller.

FilterBar :
recherche immatriculation, type, statut, base, conformité.

Table véhicules :
colonnes immatriculation, type, statut, base, assurance, contrôle technique, carte grise, agrément sanitaire, conformité, dernière modification, actions.
Badges : Active, Maintenance, Hors service, Conforme, Bientôt expiré, Expiré, Incomplet.

À droite :
drawer véhicule ouvert sur une ambulance sélectionnée.
Sections : Identité véhicule, Rattachement base, Conformité documentaire, Zone danger.
Champs visibles : immatriculation, type, statut, base, date expiration assurance, date expiration contrôle technique, carte grise présente, date expiration agrément sanitaire.
Zone danger : Archiver véhicule avec texte indiquant qu’il n’y a pas de suppression physique.

Ne pas afficher carte, géolocalisation, coûts, maintenance avancée ou calendrier d’entretien complet.
La maquette doit être réaliste à coder en React / Next.js / Tailwind.
```

---

# 10. Cohérence entre les 4 maquettes

Les quatre écrans doivent partager :

- même sidebar ;
- même topbar ;
- même palette ;
- mêmes badges ;
- mêmes cards ;
- mêmes boutons ;
- mêmes tables ;
- mêmes drawers ;
- mêmes règles d’espacement ;
- même niveau de professionnalisme.

---

# 11. Ordre de génération recommandé

Pour limiter les retours et éviter de générer trop d’images d’un coup :

## Étape 1

Générer uniquement :

```text
Shell global + Dashboard portail
```

Valider :

- style général ;
- sidebar ;
- topbar ;
- palette ;
- densité ;
- niveau premium.

## Étape 2

Générer :

```text
Planning compact
```

Valider :

- logique employés en lignes ;
- semaines en colonnes ;
- lisibilité des cellules ;
- badges.

## Étape 3

Générer :

```text
Utilisateurs / RH
```

Valider :

- table + drawer ;
- onglets fiche salarié ;
- permissions ;
- absences ;
- zone sécurité.

## Étape 4

Générer :

```text
Véhicules
```

Valider :

- conformité documentaire ;
- badges ;
- drawer ;
- action archive.

---

# 12. Critères de validation A21-UX-03

La session A21-UX-03 sera validable si :

- les quatre écrans fondateurs sont cadrés ;
- les contenus hors périmètre sont exclus ;
- les prompts de génération sont prêts ;
- les maquettes restent réalistes à coder ;
- le design system A21-UX-02 est respecté ;
- aucune génération ne mélange dispatch et gestion métier ;
- la suite A21-UX-04 pourra décliner le style validé.

---

# 13. Décision finale de session

```text
NO_PATCH
```

Aucun code n’est modifié dans cette session.

Le livrable principal est documentaire :

```text
MAQUETTES_FONDATRICES_V0.2.md
```

---

# 14. Prochaine étape après validation utilisateur

Prochaine étape recommandée :

```text
Génération visuelle contrôlée — écran 1 : Shell global + Dashboard portail
```

Puis validation utilisateur avant de générer les trois autres écrans.
