# EVIDENCES.md

## Source documentaire utilisée
Source unique documentée : réponse de production validée de la session `SESSION-20260422-01_A14_BACK-01`.

## Décision patch
- `NO_PATCH`

## Éléments d’audit explicitement retenus
### État général constaté
- backend examiné : globalement structuré mais hétérogène
- ordre cible `Data → Services → API → UI` : application partielle sur le périmètre audité

### Périmètre audité repris
- routes API sous `app/api/**/route.ts`
- services métier sous `lib/services/**`
- validations sous `lib/validators/**`
- auth / session / RBAC :
  - `lib/auth.ts`
  - `lib/rbac.ts`
  - `lib/permissions.ts`
  - `lib/permission-catalog.ts`
- Prisma :
  - `lib/prisma.ts`
  - usages Prisma observés dans les routes et services examinés
- helpers réponse / erreurs :
  - `lib/api/response.ts`
  - `lib/api/prisma-error.ts`

### Conformités observées
- enrichissement de session NextAuth
- existence d’un socle RBAC dédié
- prise en compte du rôle support global
- cloisonnement multi-tenant par `companyId`
- présence d’une couche de réponse homogène sur une partie du backend
- présence d’un mapping Prisma → HTTP sur plusieurs routes CRUD
- existence de validateurs Zod centralisés sur une partie du périmètre
- existence d’une couche service métier
- traçabilité backend sur certaines actions
- centralisation du client Prisma

### Non-conformités / hétérogénéités / résiduels observés
- coexistence de `lib/api/response.ts` et de réponses locales `NextResponse.json` / `Response.json`
- validations serveur encore partiellement locales selon les routes
- route d’assignation planning avec schéma local malgré présence de `lib/validators/planning-assign.ts`
- routes planning encore chargées en responsabilités
- accès Prisma encore présents directement dans plusieurs routes
- RBAC non uniformisé sur l’ensemble du périmètre audité
- transmission `platformRole` non homogène sur certaines routes planning observées
- lisibilité inégale de la couche service
- traçabilité support non homogène selon les domaines
- conventions backend réparties entre services spécialisés, helpers de domaine et routes

## Limite de preuve
Toute information non explicitement reprise dans la réponse validée doit être considérée comme :
`INFORMATION NON FOURNIE — À CONFIRMER`
