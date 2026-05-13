# EVIDENCES — SESSION-20260503_TEST-LOCAL-02

## Nature des preuves
Cette phase repose sur :
- un fichier de test manuel ADMIN rempli par l’utilisateur ;
- des captures fournies dans `SCREEN_TEST.zip` ;
- des constats exprimés dans la discussion ;
- la documentation de la phase précédente.

## Preuves de la phase précédente conservées
D’après la documentation fournie pour `SESSION-20260418_TEST-LOCAL-01` :
- `npx prisma validate` : `OK` ;
- `npx prisma generate` : `OK` ;
- `npm run lint` : `OK` ;
- `npm run build` : `OK` ;
- dépôt propre au moment du contrôle ;
- décision finale : `NO_PATCH`.

## Preuves issues du fichier de test manuel ADMIN

### Login / session
- Connexion ADMIN valide : `OK`.
- Mauvais mot de passe : message `Identifiants invalides.`.
- Email inexistant : message `Identifiants invalides.`.
- Champs vides : indication de remplir les champs.
- Après connexion : arrivée sur dashboard mais sidebar absente et état session incorrect.
- Après rafraîchissement : sidebar et informations topbar apparaissent.

Captures liées :
- `TEST_01`
- `TEST_02`

### Dashboard
- Ouverture `/dashboard` : `OK`.
- Cartes / raccourcis visibles : `OK`.
- Huit raccourcis testés : ouverture correcte.
- Affichage mobile : `KO` / à optimiser.

Capture liée :
- `TEST_03`

### Société / paramètres
- Ouverture `/company` : `OK`.
- Modification information société : `OK`.
- Certaines règles métier affichent un message indiquant qu’elles sont préparées uniquement et bloquées tant que la clé de stockage et le format métier réels ne sont pas prouvés.

Capture liée :
- `TEST_04`

### Utilisateurs
- Ouverture `/users` : `OK`.
- Liste utilisateurs : `KO`, aucun utilisateur visible malgré utilisateurs déjà créés.
- Recherche / filtre : `KO`.
- Création utilisateur : `KO`.
- Modification, rôle, base, archivage, connexion utilisateur archivé, persistance : `KO`.
- Conclusion utilisateur : module à revoir entièrement.

Captures liées :
- `TEST_05`
- `TEST_06`

### Absences / indisponibilités
- Non testable car les utilisateurs ne sont pas visibles.

### Véhicules / conformité
- Ouverture `/vehicles` : `OK`.
- Liste véhicules : `OK`.
- Création véhicule : `OK`.
- Immatriculation vide : `OK`.
- Immatriculation déjà utilisée : `OK`.
- Modification véhicule : `OK`.
- Statut véhicule : `OK`.
- Rattachement base : `OK`.
- Archivage véhicule : `OK`.
- Conformité : tests principaux `OK`.

### Templates
- Ouverture `/templates` : `OK`.
- Liste templates : `OK`.
- Création : `OK`.
- Horaire invalide : `OK`.
- Template sans horaire : `OK`.
- Modification : `OK`.
- Couleur : `OK`.
- Type véhicule requis : `OK`.
- Composition équipe : `OK`.
- Archivage : `OK`.

### Planning manuel
- Ouverture `/planning` : `OK`.
- Vue jour : `OK`.
- Vue semaine : `OK`.
- Vue mois : `OK`.
- Navigation période : `OK`.
- Création shift manuel : `KO` car le template choisi ne modifie pas les horaires.
- Affectation utilisateur : `KO`, aucun utilisateur disponible.
- Affectation véhicule : `OK`.
- Modification shift : `KO`.
- Annulation / suppression logique : `KO`.
- Conclusion utilisateur : planning à revoir complètement.

### Autoschedule / Matching
- Autoschedule : non testé dans le détail ; mention utilisateur : à revoir complètement.
- Matching : non testé.

### Audit
- Ouverture `/audit` : `OK`.
- Liste événements : `OK`.
- Modification véhicule puis audit : `OK`.
- Modification planning puis audit : `OK`.
- Informations acteur/date/action/cible : `OK`.
- Filtres : `OK`.

### UI/UX globale
- Cohérence sidebar/topbar : `OK`.
- Cohérence boutons/cartes/tableaux/badges : `OK` selon test utilisateur.
- Libellés français : `KO`, accents manquants.
- Page la moins propre ressentie : planning.
- Constat complémentaire majeur : UI réelle non alignée avec les maquettes visuelles validées.

## Points non testés ou à confirmer
- Onboarding société pilote.
- Imports.
- Exports.
- Privacy.
- Responsive détaillé par largeur.
- Stacktraces interface.
- Données sensibles inutiles.
- Plusieurs gérants.
- Suppression définitive gouvernée.
- Rôle `PSC1` : modèle exact à cadrer.
