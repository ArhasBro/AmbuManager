# RESULTATS — SESSION-20260319-16_A3_USERS-08

## Résultat de session
USERS-08 est livrée sur son périmètre strict : désactivation / archivage logique utilisateur, sans suppression physique.

## Résultat fonctionnel retenu
À l’issue de la session :
- un utilisateur autorisé peut archiver logiquement un utilisateur de sa société ;
- l’opération ne supprime pas la ligne en base ;
- l’utilisateur archivé n’est plus exposé comme compte actif dans le flux standard `/users` ;
- l’interface fournit un retour succès / erreur lisible ;
- la liste est rafraîchie proprement après archivage ;
- un compte support global n’est pas archivable via ce périmètre.

## Résultat technique retenu
- patch applicatif : OUI ;
- `git apply --check` : OK ;
- `git apply` : OK ;
- `npx prisma validate` : OK ;
- `npx prisma generate` : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.

## Verdict de session
USERS-08 est validée fonctionnellement et techniquement dans le bornage demandé.
