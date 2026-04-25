# A21-UX-03 — Validation des maquettes fondatrices V1.0

## 1. Identification

- **Bloc** : A21 — UI / UX / Navigation
- **Session** : A21-UX-03 — Maquettes fondatrices
- **Type** : validation documentaire UI/UX
- **Décision code** : `NO_PATCH`
- **Archive source images** : `A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0.zip`
- **Règle de validation appliquée** : pour chaque écran, la version la plus haute présente dans le ZIP est considérée comme la version validée.

---

## 2. Objectif du document

Ce document trace la validation des quatre maquettes fondatrices réalisées pour Ambulance Manager.

Les maquettes fondatrices servent de base visuelle pour la suite du bloc UI/UX :

1. Dashboard portail ;
2. Planning compact ;
3. Utilisateurs / RH ;
4. Véhicules / flotte.

Elles définissent la direction graphique validée avant déclinaison vers les pages complémentaires.

---

## 3. Contenu de l’archive source

Archive analysée :

```text
A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0.zip
```

Images présentes :

### 1-Dashboard

- `Dashboard_V1.png`

### 2-Planning

- `Planning_V1.png`
- `Planning_V1(1).png`
- `Planning_V1.1.png`
- `Planning_V1.2.png`

### 3-Utilisateurs-RH

- `Utilisateurs-RH_V1.png`

### 4-Véhicules

- `Véhicules_V1.0.png`
- `Véhicules_V1.1.png`
- `Véhicules_V1.2.png`

---

## 4. Versions validées

La version validée correspond à la version la plus haute disponible pour chaque écran.

| Écran | Version validée | Fichier validé |
|---|---:|---|
| Dashboard portail | `1` | `Dashboard_V1.png` |
| Planning compact | `1.2` | `Planning_V1.2.png` |
| Utilisateurs / RH | `1` | `Utilisateurs-RH_V1.png` |
| Véhicules / flotte | `1.2` | `Véhicules_V1.2.png` |

---

## 5. Synthèse de validation par écran

### 5.1 Dashboard portail

**Fichier validé** : `Dashboard_V1.png`

Validation :

- direction artistique validée ;
- sidebar gauche validée ;
- topbar validée ;
- palette santé / ambulancier validée ;
- approche dashboard portail validée ;
- pas de cockpit analytique avancé ;
- pas de logique de régulation ou dispatch.

Statut :

```text
VALIDÉ VISUELLEMENT
```

---

### 5.2 Planning compact

**Fichier validé** : `Planning_V1.2.png`

Validation :

- direction graphique validée ;
- structure planning validée ;
- logique métier corrigée par rapport aux premières versions ;
- affichage orienté personnel validé ;
- indication du type de journée / activité validée ;
- correction validée : un seul choix métier par cellule, pas deux ;
- ajout d’une indication week-end / jour férié validé ;
- exemple validé : remplacer un second choix inutile par `Samedi` ou `JF JJ/MM`.

Statut :

```text
VALIDÉ VISUELLEMENT
```

---

### 5.3 Utilisateurs / RH

**Fichier validé** : `Utilisateurs-RH_V1.png`

Validation :

- direction artistique cohérente avec Dashboard et Planning ;
- structure table + panneau de détail validée ;
- logique fiche salarié validée ;
- page compatible avec les besoins RH actuels ;
- anticipation multi-rôle bêta sans refonte immédiate ;
- évolution prévue : badges multi-rôles ou affichage `+1` si nécessaire.

Statut :

```text
VALIDÉ VISUELLEMENT
```

Note bêta :

```text
Prévoir compatibilité future multi-rôle :
- colonne rôle compatible multi-badges ;
- drawer "Rôle & permissions" compatible sélection multiple.
```

---

### 5.4 Véhicules / flotte

**Fichier validé** : `Véhicules_V1.2.png`

Validation :

- version combinée validée ;
- haut de page / filtres / cards issus de la version V1.1 conservés ;
- tableau métier avec conformité documentaire issu de la version V1.0 conservé ;
- panneau détail latéral issu de la version V1.1 conservé ;
- conformité documentaire lisible ;
- statut véhicule lisible ;
- rattachement base lisible ;
- zone détail cohérente avec la DA validée.

Statut :

```text
VALIDÉ VISUELLEMENT
```

---

## 6. Direction artistique validée

La direction graphique validée pour A21-UX-03 est :

```text
SaaS métier moderne, santé / ambulancier, clair, professionnel, légèrement premium, faisable en code.
```

Éléments validés :

- sidebar gauche stable ;
- topbar sobre ;
- cards arrondies ;
- badges métier ;
- tableaux denses mais lisibles ;
- panneau détail latéral ;
- palette blanc / bleu médical / turquoise / vert santé ;
- rouge réservé aux alertes, expirations ou actions sensibles ;
- structure desktop ;
- cohérence entre les pages.

---

## 7. Règles confirmées pour la suite

Les futures maquettes doivent conserver :

- la même DA ;
- la même sidebar ;
- la même topbar ;
- la même logique de cards ;
- la même logique de tableaux ;
- les mêmes badges ;
- les mêmes panneaux de détail ;
- une densité métier contrôlée ;
- une faisabilité React / Next.js / Tailwind / Codex.

Les futures maquettes ne doivent pas introduire :

- dispatch temps réel ;
- régulation médicale ;
- cartes géographiques complexes ;
- reporting avancé non prioritaire ;
- maintenance flotte avancée ;
- billing ;
- mobile/tablette dans ce cycle.

---

## 8. Décision de session

```text
NO_PATCH
```

Aucun code n’est modifié par cette validation.

Cette session produit un livrable documentaire de traçabilité et s’appuie sur les PNG versionnés fournis par l’utilisateur.

---

## 9. Statut final A21-UX-03

```text
A21-UX-03 — MAQUETTES FONDATRICES : VALIDÉ VISUELLEMENT
```

Écrans validés :

1. Dashboard portail ;
2. Planning compact ;
3. Utilisateurs / RH ;
4. Véhicules / flotte.

---

## 10. Prochaine étape recommandée

Prochaine session :

```text
A21-UX-04 — MAQUETTES MÉTIER COMPLÉMENTAIRES
```

Écrans à traiter ensuite :

- Templates ;
- Société / paramètres métier ;
- Dépôts / bases ;
- Onboarding ;
- Audit ;
- Login ;
- Privacy.

Objectif :

```text
Décliner la DA validée sur les pages métier restantes sans rouvrir la direction graphique générale.
```
