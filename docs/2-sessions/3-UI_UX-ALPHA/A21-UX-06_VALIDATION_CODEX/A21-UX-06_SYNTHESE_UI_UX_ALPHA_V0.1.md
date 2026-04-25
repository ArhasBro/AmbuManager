# A21-UX-06 — SYNTHÈSE UI/UX ALPHA / RÉFÉRENCE EXPLOITABLE CODEX V0.1

## 1. Identification

- **Projet** : Ambulance Manager
- **Bloc** : A21 — UI / UX / Navigation
- **Session** : A21-UX-06 — Synthèse UI/UX ALPHA / référence exploitable Codex
- **Type** : synthèse documentaire UI/UX
- **Décision patch code attendue** : `NO_PATCH`
- **Objectif** : consolider toutes les maquettes validées du bloc A21 dans une référence UI/UX exploitable pour l’intégration future via VS Code / Codex.

---

## 2. Contexte

Les étapes précédentes ont permis de cadrer, produire, corriger et valider visuellement la direction artistique cible d’Ambulance Manager.

### Sessions déjà intégrées

```text
A21-UX-02 — cadrage UI/UX : intégré
A21-UX-03 — maquettes fondatrices : intégré
A21-UX-04 — maquettes métier complémentaires : intégré
A21-UX-05 — pages simples / finitions : intégré
```

A21-UX-06 ne doit pas générer une nouvelle maquette.  
La session doit produire une synthèse claire, exploitable, et stable de la DA validée.

---

## 3. Objectif de A21-UX-06

Produire un document de référence UI/UX ALPHA qui servira de base à l’intégration future dans l’application.

Ce document doit :

- figer la direction artistique validée ;
- lister les maquettes de référence ;
- expliciter les composants visuels communs ;
- préciser les règles de navigation ;
- préciser les règles de densité métier ;
- identifier les réserves connues ;
- préparer l’usage par VS Code / Codex ;
- éviter toute réouverture graphique non validée.

---

## 4. Maquettes validées à consolider

### Maquettes fondatrices A21-UX-03

```text
Dashboard portail      — validé visuellement
Planning compact       — validé visuellement
Utilisateurs / RH      — validé visuellement
Véhicules / flotte     — validé visuellement
```

### Maquettes complémentaires A21-UX-04

```text
Templates_V1.1         — validé visuellement
Société_V1.0           — validé visuellement avec réserve
Dépôts_V1.0            — validé visuellement
Onboarding_V1.2        — validé visuellement
Audit_V1.0             — validé visuellement
```

### Pages simples / finitions A21-UX-05

```text
Login_V1.0             — validé visuellement
Privacy_V1.0           — validé visuellement avec correctifs textuels à prévoir
```

---

## 5. Direction artistique validée

La DA validée est :

```text
SaaS métier moderne, santé / ambulancier, clair, professionnel, légèrement premium.
```

Elle repose sur :

- fond très clair ;
- sidebar gauche claire ;
- topbar sobre ;
- cards blanches arrondies ;
- bordures fines ;
- bleu profond pour les titres ;
- bleu primaire pour les actions ;
- touches turquoise / vert santé pour les statuts positifs ;
- rouge réservé aux alertes, expirations et zones danger ;
- badges sobres ;
- tableaux compacts mais lisibles ;
- drawers / panneaux latéraux droits ;
- densité métier professionnelle ;
- absence d’effet “landing page marketing”.

---

## 6. Règles globales à figer

### 6.1 Layout général connecté

Pour les pages connectées :

- sidebar gauche stable ;
- logo / nom produit en haut de sidebar ;
- navigation par modules ;
- topbar avec société, utilisateur et action de déconnexion ;
- contenu principal sur fond très clair ;
- header de page avec titre, sous-titre et actions principales ;
- cartes et tableaux organisés en grille ;
- panneau détail / drawer à droite pour les actions complexes.

### 6.2 Navigation

La navigation cible doit rester cohérente avec les modules actuels :

- Dashboard ;
- Planning ;
- Utilisateurs / RH ;
- Véhicules ;
- Templates ;
- Société ;
- Dépôts ;
- Onboarding ;
- Audit ;
- Privacy hors shell ou accessible selon contexte ;
- Login hors shell connecté.

Les entrées visibles dépendent des permissions utilisateur.

### 6.3 Composants communs

À standardiser :

- `AppShell` ;
- `Sidebar` ;
- `Topbar` ;
- `PageHeader` ;
- `StatCard` ;
- `DataTable` ;
- `StatusBadge` ;
- `ActionButton` ;
- `DangerZone` ;
- `FilterBar` ;
- `DetailDrawer` ;
- `EmptyState` ;
- `ErrorMessage` ;
- `FormSection`.

### 6.4 Tableaux

Les tableaux doivent être :

- denses ;
- lisibles ;
- alignés ;
- compatibles métier ;
- dotés de badges pour les statuts ;
- dotés d’actions discrètes ;
- accompagnés de filtres simples si nécessaire.

### 6.5 Drawers / panneaux droits

Les drawers doivent servir à :

- afficher le détail d’une ligne ;
- modifier un élément ;
- visualiser l’historique ;
- consulter un payload JSON ;
- éviter de surcharger la page principale.

### 6.6 Formulaires

Les formulaires doivent être :

- structurés par sections ;
- lisibles ;
- sobres ;
- compatibles avec une saisie métier ;
- accompagnés de messages d’erreur simples ;
- sans surcharge visuelle.

### 6.7 États et badges

Badges à prévoir :

- actif ;
- inactif ;
- archivé ;
- maintenance ;
- hors service ;
- conforme ;
- bientôt expiré ;
- expiré ;
- terminé ;
- en cours ;
- à compléter ;
- alerte ;
- bloquant ;
- support ;
- sécurité.

### 6.8 Dark mode

Le dark mode est souhaité, mais il ne doit pas être prioritaire dans l’intégration initiale si cela complexifie trop le chantier.  
La DA claire reste la référence principale.

---

## 7. Réserves connues à conserver

### Société_V1.0

```text
Société_V1.0 — validée visuellement
Réserve : le bloc "Mode d’affichage planning" est conservé uniquement parce qu’il existe actuellement, mais son utilité métier est à réévaluer ultérieurement.
Statut : VALIDÉ VISUELLEMENT AVEC RÉSERVE
```

### Dépôts_V1.0

```text
Dépôts_V1.0 — validée visuellement
Note : page validée en l’état, car elle n’est pas prioritaire pour le moment.
```

### Privacy_V1.0

```text
Privacy_V1.0 — validée visuellement avec correctifs textuels à prévoir
Réserve : quelques corrections de nomination des sociétés / libellés juridiques seront à prévoir avant intégration finale.
Ces correctifs ne remettent pas en cause la validation visuelle de la page.
```

---

## 8. Exclusions générales

La synthèse UI/UX ALPHA ne doit pas ouvrir :

- billing ;
- abonnement ;
- essai gratuit ;
- tunnel commercial ;
- landing page marketing ;
- IA ;
- chatbot ;
- reporting avancé ;
- SIEM / cybersécurité avancée ;
- mobile ;
- tablette ;
- multi-agences avancé ;
- onboarding self-service SaaS avancé ;
- carte géographique avancée ;
- refonte complète de la DA.

---

## 9. Livrable attendu

Le livrable principal attendu est un document :

```text
REFERENCE_UI_UX_ALPHA_V1.0.md
```

Il doit être exploitable par Codex / VS Code pour guider une future intégration UI.

Il doit contenir :

1. état des maquettes validées ;
2. principes de DA ;
3. composants communs ;
4. règles de layout ;
5. règles de navigation ;
6. règles de tableaux ;
7. règles de drawers ;
8. règles de formulaires ;
9. réserves connues ;
10. recommandations d’intégration future ;
11. décision finale `NO_PATCH`.

---

## 10. DoD — Definition of Done

A21-UX-06 sera considérée terminée si :

- toutes les maquettes validées A21 sont listées ;
- la DA est figée clairement ;
- les règles communes sont documentées ;
- les réserves connues sont reprises ;
- la synthèse est exploitable par Codex ;
- aucune nouvelle maquette n’est demandée ;
- aucun code applicatif n’est modifié ;
- la décision finale est `NO_PATCH`.

---

## 11. Décision initiale

```text
NO_PATCH
```

Aucune modification du code applicatif n’est attendue.

---

## 12. Suite logique après A21-UX-06

Après A21-UX-06, la suite logique sera :

```text
A21-UX-07 — Clôture documentaire du bloc UI/UX
```

ou directement :

```text
CLOTURE_A21 — Validation finale du bloc UI/UX / Navigation
```

Selon le niveau de détail souhaité avant reprise de l’intégration UI dans le code.
