# SESSION

## ID SESSION

`SESSION-20260319-09_A3_USERS-01`

## Date

19/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : `1-ALPHA`  
Bloc : `A3`  
Code session : `USERS-01`  
Type : `AUDIT`  
Intitulé : `Audit complet du module users existant`

## Objectif de la session

Réaliser un audit strictement en lecture seule du module `users` réellement présent dans le dépôt afin de :

- qualifier ce qui existe vraiment aujourd’hui ;
- distinguer ce qui est exploitable immédiatement de ce qui est manquant ;
- identifier les incohérences bloquantes avant toute correction ou complétion du bloc A3 ;
- préparer les sessions `USERS-02` à `USERS-16` sans extrapolation.

## Sources de référence relues avant audit

- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`

## Périmètre exact traité

Audit en lecture seule des zones réellement impliquées par le module `users` et ses dépendances directes :

- `prisma/schema.prisma`
- `app/api/users/**`
- `app/users/**`
- `lib/services/users/**`
- `lib/auth.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `lib/validators/user.ts`
- `app/dashboard/page.tsx`
- `app/planning/page.tsx`
- `app/api/planning/shifts/route.ts`
- `prisma/seed.ts`

## Résultat synthétique de session

Le dépôt contient bien un module `users`, mais ce module est **partiel** et **non équivalent à une vraie administration utilisateurs complète**.

État réel confirmé par le code :

- une **API de liste** existe ;
- une **page UI `/users`** existe, mais elle n’est pas une vraie liste administrable : elle assemble uniquement un widget de rattachement dépôt et un widget de reset mot de passe ;
- le **rattachement utilisateur à une base** existe déjà côté schéma, API, service et UI ;
- le **reset de mot de passe** existe déjà côté API et UI ;
- la **création utilisateur** est absente ;
- la **modification utilisateur** générale est absente ;
- la **désactivation / archivage / suppression** est absente ;
- la **gestion des absences / indisponibilités** est absente ;
- la **consultation du planning utilisateur / collègues** existe seulement de manière partielle via le module planning générique, pas via un sous-module users dédié et sans branchement complet sur les permissions fines prévues.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-09_A3_USERS-01/`
- Patch : `docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-09_A3_USERS-01/`

## Règle de session respectée

- audit strictement en lecture seule ;
- aucun changement code ;
- aucun changement Prisma ;
- aucun changement RBAC ;
- aucun patch fonctionnel ;
- aucun démarrage de `USERS-02` dans cette session.
