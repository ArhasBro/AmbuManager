# SESSION

## Code session
SESSION-20260319-23_A3_USERS-15

## Type
COMPLÉTION — mini-fix ciblé

## Intitulé
Consultation du planning utilisateur / collègues selon permissions

## Correctif appliqué
Ajout de `availableUsers` dans les dépendances du `useCallback` `loadCompanyLists` de `app/planning/planning-client.tsx` pour supprimer le warning `react-hooks/exhaustive-deps`, sans changement de périmètre fonctionnel.
