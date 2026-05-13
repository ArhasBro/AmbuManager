# SESSION

## ID SESSION

`SESSION-20260316-02_A2_ORG-04`

## Date

`16/03/2026`

## Contexte

- Projet : `Investissement`
- Sous-projet : `Ambulance Manager`
- Stage : `1-ALPHA`
- Bloc : `A2`
- Type : `VALIDATION`
- Intitulé : `Validation du profil société`

## Objectif de session

Valider, à partir du code réel et du cadrage `03.2 Profil société`, que le profil société ALPHA est bien présent, consultable et modifiable sur son périmètre minimal :
- `name`
- `managerNames`
- `address`
- `phone`
- `siret`

## Périmètre final retenu

- inspection stricte de l’UI `/company` ;
- inspection stricte de la route `PATCH /api/company/profile` ;
- vérification du bornage à la société courante via `companyId` ;
- vérification du bornage d’accès aux rôles `ADMIN` / `GERANT` réellement prouvés ;
- tentative finale de `npm run lint` et `npm run build` ;
- aucun élargissement vers `BASE-*`, `SUP-*`, multi-sociétés, onboarding complexe ou refonte large.

## Résultat synthétique de session

Le périmètre fonctionnel minimal du profil société ALPHA est réellement visible dans le dépôt :
- UI dédiée présente ;
- 5 champs minimaux présents ;
- lecture bornée à la société courante ;
- écriture bornée à la société courante ;
- accès borné à `ADMIN` / `GERANT` ;
- contrat API conforme sur la route profil société inspectée.

Réserve de validation :
- `npm run lint` passe ;
- `npm run build` échoue dans l’état actuellement vérifié sur un point hors périmètre direct `ORG-04` (`app/api/company/rules/route.ts` avec `RuleMode` non exporté par `@prisma/client` dans cet environnement de contrôle).

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A2/1-ORG/SESSION-20260316-02_A2_ORG-04/`
