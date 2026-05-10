# NOTES — SESSION-20260319-16_A3_USERS-08

## Rappel méthodologique
Cette finalisation documentaire est strictement bornée à USERS-08.
Aucun élargissement vers USERS-09 ou vers d’autres sous-domaines du module users n’est retenu.

## Cadre fonctionnel retenu
Le mécanisme visé par USERS-08 est un archivage logique minimal et exploitable, sans suppression physique, cohérent avec le bornage défini dans le prompt de production.

## Points de vigilance conservés
- ne pas archiver un compte support global ;
- ne pas introduire de suppression physique ;
- ne pas transformer USERS-08 en refonte globale du module users ;
- conserver une séparation nette entre patch applicatif et documentation de session.

## Statut documentaire final
La présente version remplace la version documentaire provisoire et aligne les fichiers de session sur les preuves terminales retenues :
- `git apply --check` : OK ;
- `git apply` : OK ;
- `npx prisma validate` : OK ;
- `npx prisma generate` : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.
