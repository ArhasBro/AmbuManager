# NOTES — SESSION-20260319-23_A3_USERS-15

## Méthode / observations
- Relecture préalable des documents maîtres, des templates, du protocole de session et des sources autorisées.
- Vérification du besoin fonctionnel USERS-15 : consultation du planning centrée utilisateur, avec ouverture collègues strictement conditionnée aux permissions.
- Correction ciblée sur la lecture planning, sans refonte globale du module.
- Ajustement UI minimal pour rester cohérent avec les garde-fous backend.

## Arbitrages retenus
- sans permission globale, le paramètre `userId` ne permet pas d’ouvrir le planning d’un collègue ;
- avec permission globale, la consultation reste limitée à un collègue ciblé, pas à une exposition libre du planning société ;
- la session reste strictement bornée à la consultation planning selon permissions.

## Validation terminale finale
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
