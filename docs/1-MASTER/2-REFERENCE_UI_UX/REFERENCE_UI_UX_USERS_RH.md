# Ambulance Manager — REFERENCE UI/UX UTILISATEURS / RH

Version : V1.1.0 — Spécification visuelle codable 99 %
Date : 15/05/2026
Statut : Référence UI/UX exploitable directement par Codex
Page : Utilisateurs / RH
Route : `/users`

---

## 1. Référence visuelle officielle

Maquette officielle prioritaire :

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTES_FONDATRICES_IMAGES_V1.0/3-Utilisateurs-RH/Utilisateurs-RH_V1.png
```

Règle d’autorité :

```txt
PNG officiel > REFERENCE_UI_UX_USERS_RH.md > autres documents textuels
```

En cas d’écart entre texte et image, le PNG officiel prévaut.

---

## 2. Périmètre et règles

Objectif : guider une reproduction visuelle à environ 99 %, sans refonte métier.

Interdictions de cette phase visuelle :

- ne pas modifier API, Prisma, RBAC, routes serveur, services métier, migrations, seed ;
- ne pas transformer la session en refonte fonctionnelle ;
- ne pas afficher `INFORMATION NON FOURNIE — À CONFIRMER` dans l’UI.

---

## 3. Structure globale attendue

La page doit être structurée comme suit :

```txt
[SIDEBAR] [ZONE CENTRALE] [PANNEAU RH DROIT]
```

Sous la topbar, la zone `/users` est composée de deux colonnes sœurs :

1. colonne centrale ;
2. panneau RH droit.

Contraintes structurelles obligatoires :

- le panneau RH ne doit pas être enfant de la carte Utilisateurs ;
- le panneau RH ne doit pas être en `position: absolute` ;
- le panneau RH ne doit pas être superposé à la colonne centrale ;
- la colonne centrale doit être `minmax(0, 1fr)` avec `min-width: 0` ;
- la colonne RH doit avoir une largeur stable autour de `430px` à `460px` ;
- l’écart central/panneau doit être réel (`gap` visuel, environ `20px` à `24px`) ;
- aucun enfant de la colonne centrale (filtres, tableau, pagination, opérations avancées) ne doit passer sous le panneau RH.

---

## 4. Zone centrale — ordre exact

Ordre de rendu attendu dans la colonne centrale :

1. header page ;
2. KPI ;
3. barre de filtres ;
4. tableau utilisateurs ;
5. pagination ;
6. opérations avancées RH (repliées ou ouvertes).

Le header doit contenir :

- titre : `Utilisateurs / RH` ;
- sous-titre : `Gérez les salariés, rôles, permissions, rattachements, horaires et absences.` ;
- CTA : `+ Créer un utilisateur`.

Le CTA reste aligné à droite de la colonne centrale, pas au bord droit de l’écran.

---

## 5. KPI — composition codable

Les 4 KPI doivent rester sur une ligne desktop dans la colonne centrale :

1. Utilisateurs actifs ;
2. Stagiaires ;
3. Absences en cours ;
4. Comptes archivés.

Composition interne obligatoire de chaque carte :

- fond blanc ;
- bordure fine ;
- arrondi harmonisé ;
- hauteur compacte ;
- icône à gauche, centrée verticalement ;
- bloc texte à droite de l’icône ;
- titre KPI centré ;
- chiffre centré ;
- libellé bas centré ;
- aucun texte doublonné.

Schéma attendu :

```txt
[icône]   titre KPI (centré)
          chiffre (centré)
          libellé bas (centré)
```

---

## 6. Barre de filtres — rendu attendu

La barre de filtres doit être :

- compacte ;
- blanche / sobre ;
- horizontale ;
- faible hauteur ;
- sans grands vides verticaux ;
- visuellement proche de la maquette (pas un grand formulaire).

Ordre obligatoire :

1. Recherche ;
2. Rôle ;
3. Base ;
4. Statut ;
5. Stagiaire ;
6. Réinitialiser.

Contraintes :

- champs alignés sur une même ligne en desktop ;
- labels discrets ;
- `input/select` compacts ;
- bouton `Réinitialiser` aligné à droite ;
- la barre reste dans la colonne centrale ;
- la barre ne passe jamais sous le panneau RH.

---

## 7. Tableau utilisateurs

Colonnes attendues (ordre) :

```txt
checkbox, Identité, Initiales, Email, Rôle, Base, Téléphone, Statut, Stagiaire, Horaires, Dernière modif., Actions
```

Alignements attendus :

- Identité : titre à gauche, cellules à gauche ;
- Initiales : titre centré, cellules centrées ;
- Email : titre centré, cellules à gauche ;
- Rôle : titre centré, cellules centrées ;
- Base : titre centré, cellules centrées ;
- Téléphone : titre centré, cellules centrées ;
- Statut : titre centré, cellules centrées.

Contraintes visuelles :

- badges `Rôle/Base/Statut` avec arrondi harmonisé (pas grosse pilule) ;
- tableau contenu dans la colonne centrale ;
- scroll horizontal uniquement dans le tableau si indispensable ;
- sélection de ligne sobre (fond bleu pâle) ;
- pas de séparateurs bleus verticaux agressifs.

---

## 8. Panneau RH droit

Le panneau RH doit être une vraie colonne droite intégrée :

- aligné en haut de la zone utile ;
- largeur stable ~430–460 px ;
- hauteur utile visible ;
- scroll interne possible ;
- jamais superposé ;
- jamais enfant du tableau.

Contenu visible à conserver :

- fiche utilisateur ;
- avatar, nom, email, badges ;
- onglets (`Identité`, `Rôle & permissions`, `RH`, `Absences`, `Sécurité`) ;
- onglet `Absences` actif ;
- bloc `Absences enregistrées` ;
- bloc `Récapitulatif` ;
- bloc `Zone de sécurité`.

---

## 9. Opérations avancées RH

Règles :

- repliées par défaut ;
- si ouvertes, elles restent dans la colonne centrale ;
- elles ne passent jamais sous le panneau RH ;
- elles ne chevauchent pas le panneau RH ;
- elles ne cassent pas la grille centrale/droite.

---

## 10. Règles d’encodage UI

Textes FR visibles à maintenir correctement :

- `Gérant`
- `Régulateur`
- `Sélectionner`
- `Identité`
- `Salarié`
- `Non renseigné`
- `Rôle`
- `Téléphone`
- `Dernière modif.`
- `Précédent`
- `Réinitialiser`
- `—`

Interdits en UI :

- `Ã`
- `Â`
- `â€”`

---

## 11. Fichiers code ciblés pour les futures corrections visuelles

```txt
app/users/page.tsx
app/users/users-list-client.tsx
app/users/users-side-panel-client.tsx
app/a24-users-rh.css
```

Optionnel et justifié uniquement : composant UI partagé strictement nécessaire sans régression globale.

---

## 12. Checklist de contrôle visuel Nathan

```txt
[ ] Le PNG officiel Users/RH a été utilisé comme vérité visuelle.
[ ] La page suit la structure [SIDEBAR] [ZONE CENTRALE] [PANNEAU RH DROIT].
[ ] Le panneau RH est une vraie colonne droite intégrée (non flottante, non superposée).
[ ] Le panneau RH ne chevauche ni filtres, ni tableau, ni pagination, ni opérations avancées.
[ ] Les KPI sont composés avec icône gauche centrée + texte centré.
[ ] La barre de filtres est compacte, horizontale, sobre et bien ordonnée.
[ ] Les colonnes du tableau et leurs alignements correspondent à la maquette.
[ ] Les opérations avancées RH restent dans la colonne centrale, même ouvertes.
[ ] Aucun texte FR corrompu n’est visible.
```

---

## 13. Verdict documentaire

```txt
REFERENCE_UI_UX_USERS_RH : EXPLOITABLE POUR CORRECTION VISUELLE 99 %
SOURCE PRIORITAIRE : Utilisateurs-RH_V1.png (chemin officiel current)
PÉRIMÈTRE : UI/UX VISUEL UNIQUEMENT
```