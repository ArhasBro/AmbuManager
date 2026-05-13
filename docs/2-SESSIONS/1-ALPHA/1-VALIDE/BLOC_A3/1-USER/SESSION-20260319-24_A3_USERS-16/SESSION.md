# SESSION — SESSION-20260319-24_A3_USERS-16

## Date
22/03/2026

## Contexte
Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A3  
Type : VALIDATION  
Intitulé : Validation complète du bloc users

## Objectif de la session
Valider l’état réel du bloc `users` après `USERS-01` à `USERS-15`, en contrôlant le code réellement présent, les patchs réellement produits, la documentation réellement présente, les validations terminales réellement constatées et la cohérence fonctionnelle avec rôles/permissions, base, absences et consultation planning selon permissions.

## Périmètre exact traité
- `docs/1-master/*`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- sessions `USERS-01` à `USERS-15`
- patchs `USERS-01` à `USERS-15`
- `app/api/users/**`
- `app/users/**`
- `lib/services/users/**`
- `lib/validators/user*.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `app/api/planning/shifts/route.ts`
- `app/planning/**`
- `lib/services/planning/**`
- `prisma/schema.prisma`

## Résultat synthétique de session
Le bloc `users` est globalement présent et administrable sur un socle réel : liste utilisateurs, création, modification, archivage logique, rattachement à une base, CRUD absences côté module `users`, et consultation planning bornée par permissions. En revanche, un résiduel fonctionnel structurant subsiste : les absences `UserAbsence` ne sont toujours pas consommées par les services `planning` / `autoschedule` / `matching`. Le bloc ne peut donc pas être validé complètement au regard du résultat attendu `absences intégrées` et de la cohérence métier attendue avec le planning.

## Emplacements de référence
- session : `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-24_A3_USERS-16/`
- patch : `docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-24_A3_USERS-16/`
