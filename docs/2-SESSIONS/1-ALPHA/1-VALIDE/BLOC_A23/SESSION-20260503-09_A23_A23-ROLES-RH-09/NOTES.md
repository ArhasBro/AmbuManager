# NOTES

Notes de travail de la session.

---

## Methode / observations

### Sources documentaires
- Lecture obligatoire confirmee :
  - `docs/1-master/DOCUMENT_MAITRE.md`
  - `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- Template ouverture :
  - `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
- Sources complementaires utiles :
  - `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
  - `docs/1-master/ETAT_GLOBAL_PROJET.md`
  - `docs/1-master/REGISTRE_DECISIONS.md`
  - `docs/1-master/RECAP_DISCUSSIONS.md`
- Fichiers session lus :
  - `SESSION.md`, `NOTES.md`, `EVIDENCES.md`, `RESULTATS.md`, `FIN_SESSION.md`, `PATCH/NO_PATCH.md`

### Constat code reel (regle CODE > DOCUMENTATION)
- `PSC1` n'apparait ni dans `enum Role` ni dans le catalogue users/UI.
- Le role `GERANT` existe et aucune contrainte d'unicite `companyId + role` ne limite a un seul gerant.
- La fiche utilisateur ALPHA contient deja : `name/firstName/lastName/initials/phone`, `isTrainee`, `dailyWorkStartTime`, `dailyWorkEndTime`.
- Les champs RH demandes (`date d'entree`, `taux horaire`, `primes`) ne sont pas presents.
- Les entites principales utilisent un archivage logique (`isActive=false`, parfois `archivedAt`) avec traces audit/support.
- Aucune route `DELETE` generique users/depots/vehicles/templates n'a ete trouvee ; suppression physique constatee uniquement pour `userAbsence`.

### Analyse des 4 besoins
1. `PSC1`
- Interpretation retenue : qualification/competence RH et non role applicatif ALPHA.
- Justification : cadrage officiel des roles limites a `GERANT, ADMIN, REGULATEUR, BUREAU, ADE, AA, TAXI`.
- Risque d'ajout immediat : confusion RBAC + impacts planning/matching/permissions non cadres.
- Arbitrage : `BACKLOG`.

2. Plusieurs gerants
- Etat actuel : deja possible techniquement avec plusieurs comptes `User` role `GERANT` pour une meme `companyId`.
- Le profil societe expose `managerNames` (texte libre) pour representer les noms.
- Arbitrage : `ALPHA` (pas de patch necessaire, clarifier seulement la regle metier).

3. Fiche salarie enrichie
- Etat actuel : socle utilisateur ALPHA partiel, sans remuneration/contrat avances.
- Cadrage : RH avance = long terme / hors perimetre ALPHA immediat.
- Sensibilites : donnees personnelles et potentiellement sensibles, besoins RGPD/traçabilite accrues.
- Arbitrage : `BACKLOG`.

4. Suppression definitive controlee
- Etat actuel : doctrine code majoritaire = archivage logique ; suppression physique tres limitee.
- Cadrage : suppression definitive exceptionnelle et encadree, non prioritaire dans plusieurs modules.
- Arbitrage : `BETA` (specification garde-fous/permission/confirmation/criteres prealables avant implementation).

### Informations non tranchees
- Statut reglementaire exact de `PSC1` dans la nomenclature metier interne : INFORMATION NON FOURNIE — A CONFIRMER.
- Politique legale detaillee de retention/suppression RH par contexte d'exploitation : INFORMATION NON FOURNIE — A CONFIRMER.
