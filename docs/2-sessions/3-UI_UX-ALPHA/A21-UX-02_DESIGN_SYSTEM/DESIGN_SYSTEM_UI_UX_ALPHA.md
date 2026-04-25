# A21-UX-02 — DESIGN SYSTEM UI/UX ALPHA

## 1. Identification de session

- **Bloc** : A21 — UI / UX / Navigation
- **Session** : A21-UX-02 — DESIGN SYSTEM
- **Type** : Documentation / cadrage UI/UX
- **Décision patch code** : `NO_PATCH`
- **Objectif** : définir le système visuel cible avant génération des maquettes V0.2 et avant intégration via VS Code / Codex.
- **Livrable principal** : `DESIGN_SYSTEM_UI_UX_ALPHA.md`

---

## 2. Sources utilisées

### Sources utilisateur / projet

- `docs/1-master/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md`
- Archive projet contrôlée : `AmbuManager-main.zip`

### Fichiers projet inspectés dans l’archive

- `package.json`
- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/globals.css`
- `app/dashboard/page.tsx`
- `app/planning/planning-client.tsx`
- `app/users/page.tsx`
- `app/users/users-list-client.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/templates/templates-client.tsx`
- `app/company/page.tsx`
- `app/depots/depots-client.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/audit/audit-client.tsx`

### Constat technique utile

Le projet dispose déjà :

- d’un shell global existant ;
- d’un switch thème `system / light / dark` ;
- de variables CSS dans `app/globals.css` ;
- d’un thème sombre via `:root[data-theme="dark"]` ;
- de classes globales réutilisées (`page-wrap`, `page-head`, `page-title`, `panel`, etc.) ;
- d’une stack compatible avec une refonte progressive :
  - Next.js ;
  - React ;
  - TypeScript ;
  - Tailwind CSS ;
  - Prisma ;
  - NextAuth.

Le design system doit donc **capitaliser sur l’existant** au lieu de le remplacer brutalement.

---

## 3. Positionnement du design system

Ambulance Manager doit être visuellement conçu comme :

```text
Une WebApp SaaS métier de gestion ambulancière, moderne, claire, professionnelle et réaliste à coder.
```

Le design system doit soutenir quatre priorités :

1. **Lisibilité métier**
2. **Densité contrôlée**
3. **Cohérence multi-pages**
4. **Intégration progressive sans casser l’existant**

---

## 4. Principes UI non négociables

### 4.1 Clarté avant effet visuel

L’interface doit rester lisible pour un usage métier quotidien.

Priorité :

1. compréhension rapide ;
2. hiérarchie claire ;
3. actions évidentes ;
4. esthétique premium légère.

### 4.2 Pas de sur-maquettage V1

Interdiction de transformer la V1 en :

- cockpit analytique avancé ;
- outil de dispatch temps réel ;
- outil de régulation médicale ;
- application mobile ;
- module reporting complet ;
- module maintenance avancée ;
- module billing ;
- module RGPD avancé.

### 4.3 Design codable

Les composants doivent être réalisables avec :

- React ;
- TypeScript ;
- CSS global / Tailwind ;
- composants simples ;
- pas de dépendance graphique lourde obligatoire ;
- pas de drag-and-drop obligatoire ;
- pas de carte complexe ;
- pas d’animation structurelle lourde.

### 4.4 Progressivité

La refonte doit pouvoir être appliquée par étapes :

1. variables CSS ;
2. shell global ;
3. composants communs ;
4. pages prioritaires ;
5. pages secondaires ;
6. finitions dark mode.

---

## 5. Architecture visuelle cible

## 5.1 Structure globale

Layout cible desktop :

```text
┌──────────────────────────────────────────────────────────────┐
│ Sidebar gauche │ Topbar + contenu principal                  │
│                │                                              │
│ Navigation     │ PageHeader                                   │
│ Logo           │ Filtres / actions                            │
│ Menu           │ Cards / tables / forms / drawers             │
│ Theme          │                                              │
└──────────────────────────────────────────────────────────────┘
```

### Dimensions recommandées

- largeur sidebar : `264px`
- largeur sidebar compacte future : `80px`
- largeur max contenu standard : `1440px`
- padding page desktop : `24px`
- gap standard page : `20px`
- rayon cards : `16px`
- rayon petits éléments : `10px`
- ombre légère uniquement sur cards principales.

### À éviter

- contenu centré trop étroit sur pages denses ;
- topbar horizontale chargée ;
- navigation métier dans plusieurs endroits ;
- pages avec formulaires empilés sans hiérarchie.

---

## 5.2 Shell global cible

### Objectif

Remplacer progressivement le shell actuel par un shell plus premium, avec sidebar gauche stable.

### Structure

#### Sidebar

Contenu recommandé :

1. Zone marque
   - emplacement logo ;
   - nom `Ambulance Manager` ;
   - badge `ALPHA`.

2. Navigation principale
   - Tableau de bord ;
   - Planning ;
   - Utilisateurs / RH ;
   - Véhicules ;
   - Templates ;
   - Société ;
   - Dépôts ;
   - Onboarding ;
   - Audit.

3. Bas de sidebar
   - switch thème ;
   - utilisateur ou société ;
   - statut système simple si pertinent.

#### Topbar

Contenu recommandé :

- titre court de la page ou fil d’Ariane ;
- action principale de page si pertinente ;
- profil utilisateur ;
- bouton déconnexion ;
- rappel société si utile.

### Règles de permissions

La navigation doit rester pilotée par les permissions existantes.

Règle UX :

```text
Un menu non autorisé ne doit pas être affiché.
```

Exception possible :

```text
Un menu futur peut être affiché désactivé uniquement en environnement de maquette, pas en production V1.
```

---

## 6. Palette cible

## 6.1 Palette claire

Palette recommandée, compatible avec l’identité santé / ambulancier.

| Usage | Token cible | Valeur recommandée | Notes |
|---|---:|---:|---|
| Fond app | `--ui-bg` | `#F3F7FB` | bleu-gris très clair |
| Surface principale | `--ui-surface` | `#FFFFFF` | cards / panels |
| Surface douce | `--ui-surface-soft` | `#F8FAFC` | filtres / blocs secondaires |
| Surface forte | `--ui-surface-strong` | `#EEF4F8` | headers de tables |
| Texte principal | `--ui-text` | `#0F172A` | slate très foncé |
| Texte secondaire | `--ui-text-muted` | `#64748B` | descriptions |
| Bordure | `--ui-border` | `#D8E1EA` | bordure douce |
| Bordure forte | `--ui-border-strong` | `#B7C5D5` | tableaux / séparateurs |
| Primaire | `--ui-primary` | `#2563EB` | bleu médical |
| Primaire hover | `--ui-primary-hover` | `#1D4ED8` | actions principales |
| Turquoise | `--ui-teal` | `#0D9488` | santé / disponibilité |
| Vert | `--ui-success` | `#16A34A` | OK / actif / conforme |
| Orange | `--ui-warning` | `#F59E0B` | bientôt expiré / attention |
| Rouge | `--ui-danger` | `#DC2626` | danger / archive / expiré |
| Violet discret | `--ui-purple` | `#7C3AED` | rôle / permission si besoin |

---

## 6.2 Palette sombre

| Usage | Token cible | Valeur recommandée | Notes |
|---|---:|---:|---|
| Fond app | `--ui-bg` | `#08111F` | bleu nuit |
| Surface principale | `--ui-surface` | `#0F1B2D` | cards |
| Surface douce | `--ui-surface-soft` | `#13233A` | filtres |
| Surface forte | `--ui-surface-strong` | `#1A2F4A` | headers |
| Texte principal | `--ui-text` | `#E5EEF8` | lisible |
| Texte secondaire | `--ui-text-muted` | `#A8B6C8` | descriptions |
| Bordure | `--ui-border` | `#2B405C` | douce |
| Primaire | `--ui-primary` | `#60A5FA` | bleu clair |
| Turquoise | `--ui-teal` | `#2DD4BF` | accent |
| Vert | `--ui-success` | `#4ADE80` | OK |
| Orange | `--ui-warning` | `#FBBF24` | attention |
| Rouge | `--ui-danger` | `#F87171` | danger |

---

## 6.3 Règles de couleur

### Primaire

Utiliser le bleu médical pour :

- bouton principal ;
- menu actif ;
- liens principaux ;
- focus ;
- sélection.

### Vert

Utiliser le vert pour :

- actif ;
- disponible ;
- conforme ;
- validé ;
- import réussi.

### Orange

Utiliser l’orange pour :

- bientôt expiré ;
- attention ;
- brouillon ;
- partiel ;
- import avec erreurs non bloquantes.

### Rouge

Utiliser le rouge seulement pour :

- expiré ;
- hors service ;
- erreur bloquante ;
- archiver ;
- annuler ;
- action sensible.

### Gris

Utiliser le gris pour :

- désactivé ;
- archivé ;
- non renseigné ;
- secondaire.

---

## 7. Typographie

## 7.1 Police

Police cible :

```text
Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

Si Inter n’est pas ajoutée tout de suite, rester sur la police système.

## 7.2 Échelle typographique

| Élément | Taille | Graisse | Usage |
|---|---:|---:|---|
| Page title | `28px` | `800` | titre page desktop |
| Section title | `20px` | `700` | blocs importants |
| Card title | `16px` | `700` | cards |
| Body | `14px` | `400` | texte standard |
| Body strong | `14px` | `600` | valeurs |
| Table header | `12px` | `700` | en-têtes |
| Caption | `12px` | `500` | aide / dates |
| Badge | `12px` | `700` | statuts |

## 7.3 Règles

- éviter les textes trop petits sous `12px` ;
- éviter les titres tout en majuscules sauf petits labels ;
- préserver un contraste fort en dark mode ;
- les données métier importantes doivent être plus lisibles que les décorations.

---

## 8. Spacing, radius, ombres

## 8.1 Spacing

Échelle recommandée :

```text
4 / 6 / 8 / 10 / 12 / 16 / 20 / 24 / 32
```

Règles :

- padding page : `24px` ;
- padding card : `16px` à `20px` ;
- gap entre sections : `20px` ;
- gap dans formulaire : `12px` ;
- gap dans table actions : `8px`.

## 8.2 Radius

| Élément | Rayon |
|---|---:|
| App shell panels | `20px` |
| Cards principales | `16px` |
| Boutons | `10px` |
| Inputs | `10px` |
| Badges | `999px` |
| Table rows optionnelles | `12px` |

## 8.3 Ombres

Utiliser des ombres légères.

```css
--ui-shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
--ui-shadow-md: 0 8px 20px rgba(15, 23, 42, 0.08);
```

En dark mode :

```css
--ui-shadow-md: 0 8px 20px rgba(0, 0, 0, 0.24);
```

Ne pas mettre d’ombre forte sur chaque élément.

---

## 9. Composants cibles

## 9.1 `AppShell`

### Rôle

Encadrer toutes les pages connectées.

### Contenu

- sidebar ;
- topbar ;
- main content ;
- theme mode ;
- navigation selon permissions.

### États

- connecté ;
- non connecté ;
- sans permission ;
- thème clair ;
- thème sombre.

---

## 9.2 `Sidebar`

### Rôle

Navigation principale.

### Règles

- toujours visible en desktop ;
- active state fort mais élégant ;
- icône + label ;
- item masqué si non autorisé ;
- section basse pour thème / profil / statut.

### Items V1

- Tableau de bord
- Planning
- Utilisateurs / RH
- Véhicules
- Templates
- Société
- Dépôts
- Onboarding
- Audit

### Item bêta

- Rapports, à ne pas afficher en V1 sauf maquette future.

---

## 9.3 `Topbar`

### Rôle

Contexte de page et actions globales.

### Contenu

- titre court ou breadcrumb ;
- société active si utile ;
- profil utilisateur ;
- déconnexion ;
- action principale éventuelle.

### À éviter

- répéter toute la navigation ;
- multiplier les boutons secondaires ;
- afficher des indicateurs analytiques.

---

## 9.4 `PageHeader`

### Structure

- titre ;
- description courte ;
- action principale ;
- actions secondaires ;
- éventuellement filtres simples.

### Exemple

```text
Utilisateurs / RH
Gérez les salariés, rôles, permissions, bases, horaires et absences.
[Créer un utilisateur]
```

---

## 9.5 `StatCard`

### Usage

Afficher un compteur simple.

### Structure

- icône ;
- label ;
- valeur ;
- aide courte ;
- variation optionnelle.

### À utiliser sur

- Dashboard ;
- Véhicules ;
- Templates ;
- Onboarding ;
- éventuellement Utilisateurs.

### À éviter sur

- Privacy ;
- Login ;
- Audit si non pertinent.

---

## 9.6 `ActionCard`

### Usage

Carte d’accès rapide.

### Structure

- icône ;
- titre ;
- description ;
- badge permission ;
- action.

### Principalement pour

- Dashboard portail ;
- Onboarding checklist.

---

## 9.7 `DataTable`

### Usage

Tables métier denses.

### Pages concernées

- Utilisateurs ;
- Véhicules ;
- Templates ;
- Audit ;
- Dépôts si vue table retenue.

### Règles

- header sticky si table longue ;
- zébrage très léger possible ;
- actions alignées à droite ;
- badges dans colonnes statut ;
- colonne principale visuellement plus forte ;
- pagination propre ;
- recherche au-dessus.

### Densité

Deux tailles :

- `standard` : pages moins chargées ;
- `dense` : utilisateurs, audit, planning.

---

## 9.8 `FilterBar`

### Usage

Regrouper recherche et filtres.

### Structure

- recherche à gauche ;
- filtres au centre ;
- actions secondaires à droite ;
- pas plus de 4 filtres visibles avant repli.

### Pages concernées

- Utilisateurs ;
- Véhicules ;
- Templates ;
- Planning ;
- Audit.

---

## 9.9 `StatusBadge`

### États globaux

| État | Couleur |
|---|---|
| Actif | vert |
| Inactif | gris |
| Archivé | gris |
| Disponible | vert |
| Maintenance | orange |
| Hors service | rouge |
| Conforme | vert |
| Bientôt expiré | orange |
| Expiré | rouge |
| Brouillon | orange |
| Publié | vert |
| Annulé | gris / rouge doux |
| Absence | orange / violet discret |
| Conflit | rouge |
| Stagiaire | bleu / violet discret |

---

## 9.10 `DetailsDrawer`

### Usage

Afficher ou modifier un élément sélectionné sans quitter la page.

### Pages concernées

- Utilisateurs ;
- Véhicules ;
- Templates ;
- Planning détaillé ;
- Audit.

### Structure

- header ;
- résumé ;
- tabs ou sections ;
- actions principales ;
- zone danger en bas.

### Règle

Ne pas mettre toutes les actions sensibles dans la table principale. Les actions sensibles doivent être dans le drawer ou dans une modale de confirmation.

---

## 9.11 `Tabs`

### Usage

Séparer les sous-zones d’une page complexe.

### Pages concernées

- Planning ;
- Utilisateurs / RH ;
- Société ;
- Onboarding si nécessaire.

### Planning recommandé

- Planning manuel ;
- Affectations ;
- Autoschedule ;
- Matching ;
- Historique ;
- Exports.

### Utilisateurs recommandé

- Identité ;
- Rôle & permissions ;
- RH ;
- Absences ;
- Sécurité.

---

## 9.12 `FormSection`

### Usage

Structurer les grands formulaires.

### Règles

- titre de section ;
- description courte ;
- grille 2 colonnes si desktop ;
- messages d’aide courts ;
- validation visible ;
- actions en bas.

### Pages concernées

- Utilisateurs ;
- Véhicules ;
- Templates ;
- Société ;
- Dépôts ;
- Onboarding imports.

---

## 9.13 `DangerZone`

### Usage

Actions sensibles.

### Exemples

- archiver utilisateur ;
- archiver véhicule ;
- archiver template ;
- annuler shift ;
- réinitialiser mot de passe ;
- supprimer absence.

### Règles

- visuel rouge discret ;
- texte explicatif ;
- bouton danger ;
- confirmation obligatoire pour les actions destructrices ou sensibles.

---

## 9.14 `ConfirmModal`

### Usage

Confirmation d’action sensible.

### Structure

- titre clair ;
- description ;
- conséquence ;
- bouton annuler ;
- bouton confirmer.

### Exemples

```text
Archiver ce véhicule ?
Le véhicule sera retiré de la flotte active mais ne sera pas supprimé définitivement.
```

---

## 9.15 `EmptyState`

### Usage

Page ou section sans donnée.

### Structure

- icône ;
- titre ;
- aide ;
- action principale.

### Exemple

```text
Aucun dépôt créé
Créez votre première base pour rattacher vos véhicules et utilisateurs.
[Créer un dépôt]
```

---

## 9.16 `ErrorState`

### Usage

Erreur de chargement ou API.

### Règles

- message utilisateur simple ;
- détail technique masqué ou repliable ;
- action réessayer si pertinent.

---

## 9.17 `AuditJsonPanel`

### Usage

Afficher le payload JSON dans l’audit.

### Règles

- monospace ;
- bloc repliable ;
- bouton copier ;
- hauteur max avec scroll ;
- pas affiché ouvert par défaut dans une table dense.

---

## 9.18 `ThemeToggle`

### Usage

Changer le thème.

### États

- Auto ;
- Clair ;
- Sombre.

### Règle

Conserver la compatibilité avec la logique existante `system / light / dark`.

---

## 9.19 `PermissionGate`

### Usage

Masquer ou afficher selon permissions.

### Règle UX

- action non autorisée : ne pas afficher ;
- si nécessaire, afficher désactivé avec tooltip uniquement pour actions utiles à comprendre ;
- ne pas créer de frustration avec des boutons visibles mais inutilisables partout.

---

## 10. Patterns par page

## 10.1 Dashboard portail

### Layout

- PageHeader ;
- 4 StatCards ;
- grille d’ActionCards ;
- bloc profil utilisateur ;
- bloc société / rôle.

### À afficher

- utilisateurs actifs ;
- véhicules actifs ;
- dépôts actifs ;
- templates actifs.

### À ne pas afficher

- courbes ;
- carte ;
- interventions urgentes ;
- temps de réponse ;
- dispatch.

---

## 10.2 Planning

### Layout recommandé

- PageHeader ;
- tabs ;
- toolbar période / filtres / exports ;
- contenu principal ;
- drawer détail shift ;
- barre action groupée si sélection multiple.

### Vue compact

- employés en lignes ;
- semaines en colonnes ;
- cellules très résumées.

### Vue détaillée

- employés en lignes ;
- semaines en colonnes ;
- mini-pills de shifts ;
- détail au clic.

### Autoschedule

Doit être isolé dans son onglet ou panneau dédié.

Workflow :

1. choisir période ;
2. choisir mode ;
3. générer brouillon ;
4. vérifier ;
5. publier ou annuler.

### Matching

Workflow :

1. choisir variante ;
2. simuler ;
3. voir score qualité ;
4. appliquer.

---

## 10.3 Utilisateurs / RH

### Layout

- table utilisateurs ;
- drawer fiche salarié ;
- bouton créer utilisateur ;
- filtres.

### Table

Colonnes recommandées :

- identité ;
- initiales ;
- rôle ;
- base ;
- téléphone ;
- statut ;
- stagiaire ;
- dernière modification.

### Drawer

Tabs :

- Identité ;
- Rôle & permissions ;
- RH ;
- Absences ;
- Sécurité.

### Permissions

Afficher les permissions par groupes repliables :

- Planning ;
- Utilisateurs ;
- Véhicules ;
- Templates ;
- Société ;
- Audit ;
- Dashboard.

---

## 10.4 Véhicules

### Layout

- StatCards flotte ;
- FilterBar ;
- table véhicules ;
- drawer véhicule.

### Table

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
- actions.

### Drawer

Sections :

- identité véhicule ;
- statut ;
- base ;
- conformité documentaire ;
- danger zone archive.

---

## 10.5 Templates

### Layout

- StatCards simples ;
- FilterBar ;
- liste ou table templates ;
- preview / drawer template.

### États

- actif ;
- désactivé ;
- archivé.

### Spécificité visuelle

La couleur du template doit être visible dans la table, car elle aide la lecture du planning.

---

## 10.6 Société / paramètres métier

### Layout

- deux grands panels :
  1. Identité société ;
  2. Paramètres métier ALPHA.

### Champs identité

- nom ;
- gérants ;
- adresse ;
- téléphone ;
- SIRET.

### Paramètres

- repos minimum ;
- mode planning SIMPLE / AMBULANCE ;
- règles avec mode OFF / ALERT / BLOCK / BOTH.

---

## 10.7 Dépôts

### Layout

- PageHeader ;
- bouton créer ;
- formulaire court ou drawer ;
- table ou cards simples.

### Champs

- nom ;
- adresse ;
- statut ;
- actions.

### Interdictions V1

- pas de carte ;
- pas de statistiques de couverture ;
- pas de capacité si non gérée ;
- pas d’horaires si non gérés.

---

## 10.8 Onboarding

### Layout

Deux colonnes :

1. checklist ;
2. import.

### Checklist

- profil société ;
- dépôts ;
- utilisateurs ;
- véhicules ;
- templates.

### Import

Étapes :

1. type ;
2. fichier ;
3. aperçu ;
4. erreurs ;
5. validation.

---

## 10.9 Audit

### Layout

- filtres ;
- table ;
- détail repliable.

### Colonnes

- date ;
- action ;
- source ;
- entité ;
- acteur ;
- résumé ;
- détail.

### JSON

Jamais ouvert par défaut dans la table principale.

---

## 10.10 Login

### Layout

- carte centrée ;
- logo / nom produit ;
- email ;
- mot de passe ;
- connexion ;
- erreur ;
- lien privacy.

### Style

Simple, premium, sans illustration lourde.

---

## 10.11 Privacy

### Layout

- page texte structurée ;
- sections ;
- largeur de lecture contrôlée.

### Style

Institutionnel, sobre, clair.

---

## 11. Règles d’accessibilité et lisibilité

### Obligatoire

- contraste suffisant en clair et sombre ;
- focus visible ;
- boutons avec libellé explicite ;
- champs avec labels ;
- erreurs proches des champs concernés ;
- tables lisibles ;
- actions sensibles distinguées ;
- aucune information uniquement portée par la couleur.

### Recommandé

- icône + texte pour les statuts critiques ;
- aria-label sur boutons icônes ;
- titres hiérarchiques propres ;
- zones scrollables limitées.

---

## 12. Règles de densité

### Pages denses

- Planning ;
- Utilisateurs ;
- Audit.

Ces pages peuvent utiliser :

- tables denses ;
- filtres compacts ;
- drawers ;
- onglets ;
- barres d’action contextuelles.

### Pages moyennes

- Véhicules ;
- Templates ;
- Société ;
- Onboarding.

Ces pages doivent équilibrer :

- cards ;
- tables ;
- formulaires ;
- panneaux de détail.

### Pages simples

- Login ;
- Privacy ;
- Dépôts si CRUD minimal.

Ces pages doivent rester sobres et ne pas être surchargées.

---

## 13. Règles Codex / intégration future

Quand la maquette sera validée, l’intégration devra respecter ces règles :

1. ne pas modifier la logique métier sans demande explicite ;
2. ne pas changer les API ;
3. ne pas changer Prisma ;
4. ne pas changer les permissions ;
5. ne pas supprimer de fonctionnalités ;
6. refactoriser d’abord le shell et les composants communs ;
7. appliquer ensuite page par page ;
8. conserver le thème clair/sombre ;
9. vérifier `npm run lint` ;
10. vérifier `npm run build`.

---

## 14. Ordre d’implémentation recommandé plus tard

1. Variables CSS / tokens
2. AppShell sidebar
3. composants communs :
   - PageHeader ;
   - StatusBadge ;
   - StatCard ;
   - DataTable ;
   - FilterBar ;
   - DetailsDrawer ;
   - FormSection ;
   - ConfirmModal
4. Dashboard portail
5. Utilisateurs / RH
6. Véhicules
7. Templates
8. Planning
9. Société
10. Dépôts
11. Onboarding
12. Audit
13. Login
14. Privacy

---

## 15. Critères de validation de la session A21-UX-02

La session A21-UX-02 est validable si :

- le design system couvre le shell global ;
- la palette claire et sombre est définie ;
- les règles de typographie sont définies ;
- les règles de spacing / radius / ombre sont définies ;
- les composants réutilisables sont listés ;
- les patterns par page sont définis ;
- les règles de non-dérive sont respectées ;
- le design reste compatible avec l’existant ;
- aucun patch code n’est produit ;
- le livrable peut servir de base à A21-UX-03.

---

## 16. Décision finale

```text
NO_PATCH
```

Aucun patch code n’est produit dans cette session.

Le livrable principal est documentaire :

```text
DESIGN_SYSTEM_UI_UX_ALPHA.md
```

---

## 17. Prochaine étape

Prochaine session recommandée :

```text
A21-UX-03 — MAQUETTES FONDATRICES
```

Objectif :

Produire les premières maquettes V0.2 sur les écrans fondateurs :

1. Shell global + Dashboard portail ;
2. Planning compact ;
3. Utilisateurs / RH ;
4. Véhicules.

Ces quatre écrans permettront de valider le style avant déclinaison complète.
