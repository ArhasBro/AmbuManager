# NOTES.md

## Rappel de méthode
- constats réels uniquement
- pas de réouverture artificielle des anciens blocs `A1` à `A13`
- correction minimale strictement liée au test local
- documentation séparée dans `2-TEST-ALPHA`

## Convention retenue
L’ID utilisé pour cette campagne est : `SESSION-20260418_TEST-LOCAL-01`.

## Notes d’environnement
1. L’archive fournie ne contenait pas de fichier `.env`.
2. Un essai `npm ci` standard a échoué pendant le `postinstall` Prisma (`@prisma/engines`, `SIGTERM`).
3. Un fallback `npm ci --ignore-scripts` a permis d’exécuter des contrôles partiels, mais avec un runtime Prisma incomplet pour certains parcours.
4. Les constats `/login`, `/dashboard`, `/` et Prisma Studio ont été faits avec des variables d’environnement locales de test non productives.

## Nature du correctif appliqué
Aucune correction “au cas où”.
Une seule anomalie code réellement prouvée a été corrigée : typage explicite des callbacks `map(...)` dans `app/api/audit/route.ts` pour lever le blocage TypeScript de `build`.
