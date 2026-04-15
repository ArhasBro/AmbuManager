# NOTES

## Méthode / observations

### 1. Sources relues avant audit
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### 2. Qualification des éléments réellement observés sur le dashboard

- Titre `Dashboard` + bouton de déconnexion  
  - Qualification : `PORTAIL D’ACCÈS`
  - Motif : élément d’entrée/navigation global, sans dépendance métier.

- Lien `Planning`
  - Qualification : `PORTAIL D’ACCÈS`
  - Motif : lien d’accès module.
  - Réserve : affiché sans contrôle préalable des permissions de consultation planning.

- Bloc `Dashboard admin`
  - Qualification : `PORTAIL D’ACCÈS`
  - Motif : zone de navigation conditionnelle vers des modules d’administration.

- Lien `Profil société`
  - Qualification : `PORTAIL D’ACCÈS`
  - Motif : accès module, réservé par rôle natif `ADMIN` / `GERANT`.

- Lien `Bases / dépôts`
  - Qualification : `PORTAIL D’ACCÈS`
  - Motif : accès module, réservé par rôle natif `ADMIN` / `GERANT`.

- Lien `Réinitialisation mot de passe` vers `/users`
  - Qualification : `PORTAIL D’ACCÈS`
  - Motif : accès module.
  - Réserve : le libellé est plus étroit que la réalité de la page `/users`, qui couvre une administration utilisateurs plus large.

- Lien `Véhicules`
  - Qualification : `PORTAIL D’ACCÈS`
  - Motif : accès module conditionné par permission.

- Lien `Templates`
  - Qualification : `PORTAIL D’ACCÈS`
  - Motif : accès module conditionné par permission.

- Bloc `Session (debug)` hors production
  - Qualification : `HORS PÉRIMÈTRE A7`
  - Motif : sortie technique de debug, ni portail métier, ni indicateur simple ALPHA.

### 3. Synthèse d’observation

Le dashboard réel reste un écran de navigation minimal, sans indicateurs métier. Cela évite toute dérive analytique prématurée, ce qui est cohérent avec la règle verrouillée du bloc A7. En revanche, la logique de distribution d’accès reste incomplète et la différenciation par rôle n’est pas encore livrée au niveau attendu par le cadrage officiel.
