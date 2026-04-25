# A21-UX-04 — VALIDATION MAQUETTES MÉTIER COMPLÉMENTAIRES V1.0

## 1. Identification

- **Projet** : Ambulance Manager
- **Bloc** : A21 — UI / UX / Navigation
- **Session** : A21-UX-04 — Maquettes métier complémentaires
- **Type** : validation visuelle / documentation UI-UX
- **Décision patch code** : `NO_PATCH`
- **Archive images contrôlée** : `A21-UX-04_MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0.zip`
- **Statut final** : `A21-UX-04 — VALIDÉ VISUELLEMENT`

---

## 2. Rappel du périmètre A21-UX-04

La session A21-UX-04 avait pour objectif de décliner la direction artistique validée en A21-UX-03 sur les pages métier complémentaires suivantes :

1. Templates de shifts
2. Société / paramètres métier
3. Dépôts / bases
4. Onboarding société pilote
5. Audit / journal d’audit

Les pages simples `Login` et `Privacy` ne sont pas traitées dans cette validation et restent hors périmètre A21-UX-04.

---

## 3. Référence visuelle obligatoire

La direction artistique utilisée reste celle validée précédemment sur les maquettes fondatrices :

- Dashboard portail
- Planning compact
- Utilisateurs / RH
- Véhicules / flotte

Les maquettes complémentaires A21-UX-04 doivent conserver :

- même sidebar ;
- même topbar ;
- même palette santé / ambulancier ;
- mêmes cards ;
- mêmes arrondis ;
- même style de badges ;
- même style de tableaux ;
- même logique de drawer / panneau latéral ;
- même densité métier ;
- même faisabilité React / Next.js / Tailwind.

---

## 4. Images présentes dans l’archive fournie

Archive source :

```text
A21-UX-04_MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0.zip
```

Images détectées :

```text
Audit_V1.0.png
Dépôts-bases_V1.0.png
Onboarding_V1.0.png
Onboarding_V1.1.2.png
Onboarding_V1.1.png
Onboarding_V1.2.png
Société_V1.0.png
Templates_V1.0.png
Templates_V1.1.png
```

---

## 5. Validation par écran

### 5.1 Templates

```text
Templates_V1.1 — validée visuellement
```

#### Décision

La maquette `Templates_V1.1` est retenue comme version visuelle de référence pour la page Templates.

#### Motif

La maquette corrige la première approche trop générique et représente bien des templates de shifts / gardes :

- table métier adaptée ;
- type véhicule visible ;
- horaire visible ;
- indication traverse minuit ;
- nombre de personnes ;
- rôle obligatoire ;
- rôles autorisés ;
- colonne dernière modification conservée ;
- drawer de détail cohérent ;
- DA alignée avec les écrans fondatrices.

#### Statut

```text
VALIDÉ VISUELLEMENT
```

---

### 5.2 Société / paramètres métier

```text
Société_V1.0 — validée visuellement
Réserve : le bloc "Mode d’affichage planning" est conservé uniquement parce qu’il existe actuellement, mais son utilité métier est à réévaluer ultérieurement.
```

#### Décision

La maquette `Société_V1.0` est retenue comme version visuelle de référence provisoire pour la page Société / paramètres métier.

#### Motif

La maquette respecte le périmètre fonctionnel actuel :

- identité société ;
- gérants ;
- adresse ;
- téléphone ;
- SIRET ;
- paramètres métier ALPHA ;
- repos minimum entre deux shifts ;
- règles métier ALPHA ;
- mode OFF / ALERT / BLOCK / BOTH ;
- présentation sobre et non surchargée.

#### Réserve documentaire obligatoire

```text
Le bloc "Mode d’affichage planning" est conservé uniquement parce qu’il existe actuellement, mais son utilité métier est à réévaluer ultérieurement.
```

#### Statut

```text
VALIDÉ VISUELLEMENT AVEC RÉSERVE
```

---

### 5.3 Dépôts / bases

```text
Dépôts_V1.0 — validée visuellement
Note : page validée en l’état, car elle n’est pas prioritaire pour le moment.
```

#### Décision

La maquette `Dépôts_V1.0` est retenue comme version visuelle de référence pour la page Dépôts / bases.

#### Motif

La page reste volontairement simple, cohérente avec le périmètre actuel :

- liste / table de dépôts ;
- nom ;
- adresse ;
- statut ;
- actions modifier / archiver ;
- panneau détail ;
- zone danger ;
- pas de carte géographique ;
- pas de statistiques avancées ;
- pas de sur-maquettage inutile.

#### Statut

```text
VALIDÉ VISUELLEMENT
```

---

### 5.4 Onboarding société pilote

```text
Onboarding_V1.1 — proposition visuelle A
Onboarding_V1.1.2 — proposition visuelle B
Onboarding_V1.2 — version consolidée validée visuellement
```

#### Décision

La version `Onboarding_V1.2` est retenue comme version finale visuelle de référence pour la page Onboarding société pilote.

#### Motif

La version `Onboarding_V1.2` consolide les meilleurs éléments des deux propositions précédentes :

- structure guidée et pédagogique de `Onboarding_V1.1.2` ;
- progression claire de l’onboarding ;
- checklist : Profil société, Bases / dépôts, Utilisateurs, Véhicules, Templates ;
- statuts : À compléter, En cours, Terminé ;
- stepper horizontal du workflow d’import ;
- import initial plus lisible ;
- upload CSV / XLSX ;
- aperçu des données ;
- erreurs détectées ;
- résumé d’import prêt à valider ;
- panneau d’aide import conservé ;
- DA cohérente avec les pages déjà validées.

#### Statut

```text
VALIDÉ VISUELLEMENT
```

---

### 5.5 Audit / journal d’audit

```text
Audit_V1.0 — validée visuellement
```

#### Décision

La page `Audit_V1.0` est retenue comme version visuelle de référence pour le journal d’audit.

#### Motif

La maquette respecte la DA validée et propose une page admin / technique cohérente avec Ambulance Manager :

- sidebar et topbar alignées ;
- cards de synthèse simples ;
- filtres d’audit exploitables ;
- table dense mais lisible ;
- badges par type d’événement ;
- panneau détail / drawer à droite ;
- payload JSON repliable ;
- page sobre, métier, non orientée analytics avancé.

#### Statut

```text
VALIDÉ VISUELLEMENT
```

---

## 6. Points explicitement exclus

A21-UX-04 ne valide pas :

- Login ;
- Privacy ;
- version mobile ;
- version tablette ;
- reporting avancé ;
- billing ;
- onboarding self-service SaaS avancé ;
- IA / chatbot ;
- carte géographique ;
- SIEM ou cybersécurité avancée ;
- refonte de la DA globale.

---

## 7. Décision finale

```text
NO_PATCH
```

Aucun code applicatif n’est modifié.

Cette session produit uniquement une validation documentaire et visuelle des maquettes complémentaires.

---

## 8. Statut final

```text
A21-UX-04 — MAQUETTES MÉTIER COMPLÉMENTAIRES : VALIDÉ VISUELLEMENT
```

Pages validées :

```text
Templates_V1.1     — VALIDÉ VISUELLEMENT
Société_V1.0       — VALIDÉ VISUELLEMENT AVEC RÉSERVE
Dépôts_V1.0        — VALIDÉ VISUELLEMENT
Onboarding_V1.2    — VALIDÉ VISUELLEMENT
Audit_V1.0         — VALIDÉ VISUELLEMENT
```

---

## 9. Emplacement recommandé dans le dépôt

```text
C:\Users\arche\ambulance-manager\docs\2-sessions\3-UI_UX-ALPHA\A21-UX-04_MAQUETTES_METIER_COMPLEMENTAIRES\
```

Structure recommandée :

```text
A21-UX-04_MAQUETTES_METIER_COMPLEMENTAIRES\
├─ MAQUETTES_METIER_COMPLEMENTAIRES_V0.2.md
├─ VALIDATION_MAQUETTES_COMPLEMENTAIRES_V1.0.md
├─ README.md
└─ A21-UX-04_MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0.zip
```

---

## 10. Suite logique

La suite logique est :

```text
A21-UX-05 — Pages simples / finitions
```

Périmètre pressenti :

- Login ;
- Privacy ;
- éventuelles notes de cohérence globale ;
- préparation au gel de la référence visuelle UI/UX ALPHA.
