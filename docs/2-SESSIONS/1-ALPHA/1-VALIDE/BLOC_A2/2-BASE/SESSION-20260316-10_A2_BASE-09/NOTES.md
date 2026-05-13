# NOTES

## Méthode de travail retenue

- relecture préalable du pack documentaire réel `docs/1-master`, `docs/SOURCES_AUTORISEES.md`, `docs/STRUCTURE_DOCS.md`, `docs/PROTOCOLE_SESSION.md` et `docs/4-templates/TEMPLATE_DEBUT_SESSION.md` ;
- bornage strict sur `BASE-09` uniquement ;
- prise d’appui sur le module planning existant : `GET /api/planning/shifts`, `PATCH /api/planning/shifts/[id]/assign`, `assignShift`, `/planning` ;
- refus explicite d’ouvrir `DraftShift` au rattachement dépôt ;
- production du patch principal code avant clôture documentaire ;
- mise à jour finale des documents après validation terminale complète du patch code.

## Arbitrages retenus

### 1. Aucun champ dépôt sur `DraftShift`
Le besoin utilisateur porte sur `Shift -> Depot` publié.
Le rattachement dépôt n’a donc pas été ajouté à `DraftShift`.

### 2. Réutilisation de la route d’assignation existante
La route `PATCH /api/planning/shifts/[id]/assign` a été étendue au champ `depotId` plutôt que d’ouvrir une nouvelle route dédiée.

### 3. Lecture des dépôts côté page planning
Aucun nouveau `GET /api/depots` n’a été ouvert.
Les dépôts actifs sont lus côté `app/planning/page.tsx` avec `companyId` issu de la session, puis injectés dans le client planning.

### 4. Vérification tenant explicite côté route
Le dépôt cible doit appartenir à `session.user.companyId` et être actif.
Aucun `companyId` client n’est accepté.

## Observations techniques

- le patch ajoute `Shift.depotId` nullable pour conserver la compatibilité de l’existant ;
- le service `assignShift` audite maintenant aussi la modification de `depotId` ;
- la route d’assignation renvoie `400 DEPOT_ASSIGNMENT_NOT_SUPPORTED_ON_DRAFT` si un brouillon est ciblé avec un `depotId` ;
- la page `/planning` expose uniquement une intégration UI minimale : affichage de la base courante, sélecteur `Base`, désaffectation possible ;
- la clôture documentaire finale reflète les validations réellement obtenues sur le patch code validé.
