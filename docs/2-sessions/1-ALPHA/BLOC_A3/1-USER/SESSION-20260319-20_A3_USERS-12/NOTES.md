# NOTES — SESSION-20260319-20_A3_USERS-12

## Notes de travail

### 1. Le cadrage produit demande bien une vraie gestion d’indisponibilités utilisateur
Le cadrage officiel ne parle pas seulement de conflits horaires génériques :
- `05.6` demande de **gérer les indisponibilités utilisateurs** ;
- `08.2` cite explicitement l’`indisponibilité salarié` dans les règles métier ALPHA ;
- `11.5` demande que l’autoschedule en tienne compte ;
- `16.2` mentionne l’import initial des indisponibilités utilisateurs.

### 2. L’état constaté en USERS-01 reste exact après USERS-11
Le dépôt courant ne montre toujours :
- aucun modèle Prisma dédié aux absences utilisateur ;
- aucune route `app/api/users/...` dédiée aux absences ;
- aucune UI `app/users/...` dédiée aux absences ;
- aucune lecture d’une table/source d’indisponibilités dans le planning.

### 3. Le planning couvre seulement des contraintes indirectes
Les services planning actuels couvrent déjà :
- conflits de chevauchement utilisateur ;
- conflits de chevauchement véhicule ;
- repos minimum via `PLANNING_MIN_REST_HOURS` ;
- matching par rôle requis avec évitement de conflits de créneaux.

Ces mécanismes améliorent la cohérence du planning, mais ils ne remplacent pas une absence déclarative (congé, arrêt, indisponibilité exceptionnelle, plage bloquée, etc.).

### 4. Présence de dossiers USERS-13 / USERS-14 non probants
Des dossiers documentaires `USERS-13` et `USERS-14` existent déjà dans `docs/2-sessions` et `docs/3-patches`, mais leur contenu est essentiellement initialisé avec `INFORMATION NON FOURNIE - A CONFIRMER` et sans patch `.diff` applicable. Ils ne constituent donc pas une preuve d’implémentation réelle.

### 5. Conséquence de planification
Le socle planning est déjà suffisant pour éviter une refonte globale dans la suite. La prochaine étape minimale n’est pas de refaire le planning, mais d’ajouter une vraie source d’indisponibilités utilisateur puis de l’injecter dans les contrôles déjà existants.
