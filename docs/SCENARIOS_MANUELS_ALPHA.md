# Scénarios manuels ALPHA — Rejeu minimal

## Règle de lecture

Ces scénarios servent de base de rejeu manuel homogène pour l’ALPHA.
Ils couvrent uniquement des flux réellement visibles dans le dépôt courant.

Chaque scénario contient :
- prérequis ;
- étapes ;
- résultat attendu ;
- points de contrôle.

---

## SCÉNARIO 1 — Users : créer puis retrouver un utilisateur

### Prérequis
- être connecté avec un compte autorisé à gérer les utilisateurs ;
- disposer d’une société active.

### Étapes
1. Ouvrir `/users`.
2. Dans **Créer un utilisateur**, saisir nom, email, rôle et mot de passe.
3. Valider.
4. Utiliser la recherche du tableau avec le nom ou l’email créé.

### Résultat attendu
- message de succès de création ;
- l’utilisateur apparaît dans la liste ;
- le compte est rattaché à la société de la session.

### Points de contrôle
- aucun rôle support global ne doit être proposé ;
- si l’acteur ne gouverne pas les règles métier, `ADMIN` et `GERANT` ne doivent pas être assignables.

---

## SCÉNARIO 2 — Users : rattacher une base puis ajouter une absence

### Prérequis
- disposer d’au moins une base ;
- avoir un utilisateur actif dans la liste.

### Étapes
1. Dans `/users`, sélectionner l’utilisateur cible.
2. Dans **Rattachement à une base**, choisir une base puis enregistrer.
3. Dans **Indisponibilités / absences**, saisir début, fin et motif.
4. Enregistrer l’absence.

### Résultat attendu
- la base affichée est mise à jour ;
- l’absence apparaît dans la liste des absences de l’utilisateur.

### Points de contrôle
- l’utilisateur et la base doivent appartenir à la société courante ;
- l’absence doit ensuite pouvoir être réutilisée par les contrôles planning.

---

## SCÉNARIO 3 — Véhicules : créer puis archiver un véhicule

### Prérequis
- être connecté avec un profil `ADMIN` pour la création ;
- avoir accès au module `/vehicles`.

### Étapes
1. Ouvrir `/vehicles`.
2. Créer un véhicule avec immatriculation, type et statut.
3. Vérifier sa présence dans la liste.
4. Cliquer sur **Archiver**.

### Résultat attendu
- le véhicule est créé puis retiré de la liste active après archivage ;
- un message de confirmation est affiché.

### Points de contrôle
- la liste active ne doit exposer que les véhicules `isActive=true` ;
- le flux standard doit passer par l’archivage logique.

---

## SCÉNARIO 4 — Véhicules : mettre à jour le statut documentaire minimal

### Prérequis
- disposer d’un véhicule actif.

### Étapes
1. Cliquer sur **Modifier** sur un véhicule.
2. Renseigner au moins une date documentaire et l’état de la carte grise.
3. Enregistrer.

### Résultat attendu
- la ligne véhicule est mise à jour ;
- l’indicateur `Conformité` reflète le nouvel état calculé.

### Points de contrôle
- le changement doit persister côté liste active ;
- la base associée ne doit pas être perdue après modification.

---

## SCÉNARIO 5 — Templates : créer un template horaire

### Prérequis
- être connecté avec un compte autorisé à gérer les templates.

### Étapes
1. Ouvrir `/templates`.
2. Créer un template avec catégorie, véhicule requis éventuel, rôles, horaires et couleur.
3. Valider.

### Résultat attendu
- le template apparaît dans la liste ;
- la fiche affiche bien catégorie, horaire et couleur.

### Points de contrôle
- `isTimeDefined=true` doit imposer début et fin ;
- la couleur doit respecter le format hexadécimal attendu.

---

## SCÉNARIO 6 — Templates : désactiver puis archiver

### Prérequis
- disposer d’un template actif.

### Étapes
1. Dans la liste `/templates`, désactiver le template.
2. Vérifier le retour visuel.
3. Archiver le template.
4. Activer **Afficher les archivés**.

### Résultat attendu
- le template peut être désactivé puis archivé ;
- il n’apparaît dans la vue standard qu’une fois l’option archivés cochée.

### Points de contrôle
- le template archivé ne doit plus polluer l’usage standard ;
- l’archivage doit rester logique, pas destructif.

---

## SCÉNARIO 7 — Planning manuel : créer un shift publié

### Prérequis
- disposer du droit d’édition planning ;
- disposer d’au moins un template actif.

### Étapes
1. Ouvrir `/planning`.
2. Dans le panneau manuel, choisir le scope de vue.
3. Renseigner date, heures, template, base éventuelle et notes.
4. Cliquer sur **Créer**.

### Résultat attendu
- le shift publié apparaît dans la vue chargée ;
- un message de succès confirme la création.

### Points de contrôle
- le template et le dépôt doivent appartenir à la société courante ;
- la vue doit rester filtrée selon les droits de consultation réels.

---

## SCÉNARIO 8 — Planning manuel : modifier puis annuler un shift

### Prérequis
- disposer d’un shift publié dans le scope affiché.

### Étapes
1. Cliquer sur **Modifier** sur un shift.
2. Changer horaire, template ou dépôt.
3. Enregistrer.
4. Utiliser ensuite **Annuler** sur un shift publié.

### Résultat attendu
- la modification est visible ;
- le shift annulé n’est plus actif comme un shift standard.

### Points de contrôle
- les conflits absence / overlap / repos minimum doivent rester bloquants si applicables ;
- l’historique doit être visible pour un profil autorisé audit.

---

## SCÉNARIO 9 — Autoschedule : générer un brouillon et lire la prévisualisation

### Prérequis
- disposer du droit de lancement autoschedule ;
- avoir templates, utilisateurs et véhicules exploitables.

### Étapes
1. Dans `/planning`, lancer une génération jour ou semaine.
2. Vérifier la création du run courant.
3. Choisir une variante.
4. Lancer la prévisualisation d’auto-affectation.

### Résultat attendu
- un run est chargé ;
- la prévisualisation présente des propositions et un score qualité.

### Points de contrôle
- la variante choisie doit être reflétée dans la prévisualisation ;
- les explications qualité doivent être présentes.

---

## SCÉNARIO 10 — Autoschedule : appliquer, publier puis exporter

### Prérequis
- disposer d’un run avec brouillons ;
- disposer du droit d’export si export testé.

### Étapes
1. Appliquer l’auto-affectation sur le run courant.
2. Publier le brouillon.
3. Dans le panneau manuel, lancer un export `PDF`, `XLSX` ou `CSV` sur le scope courant.

### Résultat attendu
- les brouillons sont publiés ;
- le téléchargement du fichier d’export démarre si le droit est présent.

### Points de contrôle
- un seul scope d’export doit être utilisé à la fois ;
- sans droit export, l’API doit refuser l’opération.
