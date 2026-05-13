# EVIDENCES.md

## Référentiel maître
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:59-107`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:360-388`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`

## Sessions et patchs contrôlés
- `docs/2-sessions/1-ALPHA/BLOC_A2/1-ORG/*`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/*`
- `docs/2-sessions/1-ALPHA/BLOC_A2/3-SUP/*`
- `docs/2-sessions/1-ALPHA/BLOC_A2/4-CLOTURE_A2/*`
- `docs/3-patches/1-ALPHA/BLOC_A2/*`

## Points de preuve code sur le blocage support
- `lib/permissions.ts:38-42` → le support global n’obtient pas les permissions métier attendues ;
- `app/api/users/[id]/reset-password/route.ts:42-45` → `actorUserId` + `companyId` requis, puis `canManageUsers(...)` ;
- `app/api/users/[id]/depot/route.ts:32-35` → mêmes garde-fous ;
- `app/api/vehicles/[id]/depot/route.ts:32-35` → mêmes garde-fous ;
- `app/api/depots/route.ts:24-31` → `companyId` requis + rôle tenant ;
- `app/api/depots/[id]/route.ts:33-36` → même bornage ;
- `app/api/depots/[id]/archive/route.ts:34-37` → même bornage ;
- `app/api/vehicles/route.ts:48-52`, `77-80`, `140-143` → `companyId` requis et permissions tenant ;
- `lib/services/audit/support-action-trace.ts:18-31` → la trace ne s’écrit que si l’acteur est `PlatformRole.SUPPORT`.

## Contrôle terminal retenu
Selon le constat de contrôle final transmis :
- `npm run lint` → **OK** ;
- `npm run build` → **OK**.

## Lecture de clôture
- le chemin patch de référence retenu pour la clôture est `4-CLOTURE_A2` ;
- la mise au propre documentaire finale est cohérente ;
- le blocage support `SUP-06` reste réel dans le code du dépôt contrôlé ;
- en l’état, `A2` n’autorise pas encore le passage propre à `A3`.
