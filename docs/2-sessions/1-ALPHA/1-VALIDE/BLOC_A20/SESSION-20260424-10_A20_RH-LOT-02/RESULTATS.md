# RESULTATS

## Decision patch

Patch reel requis : `OUI`.

Justification : RH-01 a etabli un etat incomplet sur le module RH avance. Le code reel ne couvrait pas les champs nom/prenom/initiales/telephone utilisateur, ne portait aucun marqueur stagiaire et ne contenait pas de premiers champs RH d'horaires journaliers utilisateur.

## Perimetre reellement traite

Fichiers applicatifs modifies :

- `prisma/schema.prisma`
- `prisma/migrations/20260424100000_a20_rh_lot02_user_rh_fields/migration.sql`
- `lib/validators/user.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/users/page.tsx`
- `app/users/user-creation-client.tsx`
- `app/users/users-client-shared.ts`
- `app/users/users-list-client.tsx`

## Changements realises

- Ajout de champs RH optionnels sur `User` : `firstName`, `lastName`, `initials`, `phone`, `isTrainee`, `dailyWorkStartTime`, `dailyWorkEndTime`.
- Ajout d'une migration Prisma dediee A20 RH-LOT-02.
- Extension de la validation API creation/modification utilisateur.
- Creation utilisateur enrichie : identite prenom/nom/initiales/telephone, role, permissions ALPHA, base, statut actif/inactif, stagiaire, horaires journaliers simples.
- Liste utilisateurs enrichie : recherche et affichage des initiales, telephone, statut stagiaire/titulaire et horaires journaliers simples.
- Route `GET /api/users` enrichie en selection et recherche.
- Route `POST /api/users` enrichie avec controle de base active dans la societe et controle de delegation des permissions sensibles.
- Route `GET/PATCH /api/users/[id]` enrichie pour exposer et modifier les nouveaux champs.

## Demandes d'absence

Aucun workflow complet de demande d'absence avec statut/validation/refus n'a ete ajoute.

Motif : RH-01 indique que la definition metier exacte de "demandes d'absence" est non fournie. Le code existant couvre deja les absences/indisponibilites saisies, avec API, UI minimale, audit, chevauchement et consommation planning. Etendre ce point vers un workflow de demande aurait necessite d'inventer des statuts et regles non sources.

Etat retenu : existant conserve, pas d'elargissement non source.

## Resultat session

Session terminee proprement sur le perimetre RH-LOT-02 patchable sans inventer de workflow non fourni.

Fix restant necessaire : `NON` sur le patch produit.  
Sujet restant a confirmer hors patch : definition metier exacte d'un workflow complet de demande d'absence.

## Correction de tracabilite post-controle qualite

L'archive source `AmbuManager-main.zip` controlee doit etre consideree comme une archive pre-patch.

Consequence :

- le patch principal `PATCH__SESSION-20260424-10_A20_RH-LOT-02.diff` s'applique sur `AmbuManager-main.zip` en sens normal ;
- le controle `git apply --check --reverse` mentionne dans les evidences provient du depot local post-patch de production ;
- ce controle reverse prouvait uniquement que le patch correspondait a l'etat deja applique localement, et ne devait pas etre lu comme une preuve reverse sur l'archive source pre-patch.
