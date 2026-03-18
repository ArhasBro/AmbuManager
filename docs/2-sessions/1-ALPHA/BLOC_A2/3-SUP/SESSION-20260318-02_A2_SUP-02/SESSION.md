# SESSION

## ID SESSION

`SESSION-20260318-02_A2_SUP-02`

## Date

`2026-03-18`

## Contexte

Projet : `Investissement`  
Sous-projet : `Ambulance Manager`  
Stage : `1-ALPHA`  
Bloc : `A2`  
Type : `COMPLETION`  
Intitulé : `Modélisation du rôle support global distinct des rôles client`

## Objectif exact de la session

Introduire une notion de support global propriétaire, distincte des rôles société, compatible avec le multi-tenant et non intrusive pour l’existant, afin de permettre l’existence d’un utilisateur support global clairement identifié côté session sans accorder de droits globaux implicites.

## Périmètre exact traité

Périmètre autorisé et effectivement traité :
- évolution Prisma centrée sur `User` pour porter le rôle plateforme global ;
- évolution du typage rôle ;
- adaptation NextAuth pour exposer explicitement le rôle plateforme en session ;
- adaptation minimale RBAC / permissions pour intégrer le nouveau rôle sans ouvrir d’accès globaux ;
- maintien strict de la cohérence multi-tenant.

Hors périmètre et non traités :
- aucune UI ;
- aucune nouvelle route API métier ;
- aucune logique support de type `SUP-03+` ;
- aucun bypass massif cross-company ;
- aucune logique métier support hors modélisation.

## Fichiers code réellement touchés par la session

- `prisma/schema.prisma`
- `prisma/migrations/20260318203000_sup02_platform_support_role/migration.sql`
- `lib/auth.ts`
- `types/next-auth.d.ts`
- `lib/rbac.ts`
- `lib/permissions.ts`
- `app/dashboard/page.tsx`
- `lib/services/planning/matching.service.ts`
- `lib/services/users/assign-user-depot.ts`

## Résumé exact de la modélisation réalisée

La session a introduit une séparation explicite entre rôle tenant et rôle plateforme :
- ajout de `PlatformRole.SUPPORT` ;
- ajout de `User.platformRole` ;
- `User.role` rendu optionnel pour les comptes plateforme globaux ;
- `User.companyId` rendu optionnel pour les comptes plateforme globaux ;
- enrichissement NextAuth avec `session.user.platformRole` ;
- enrichissement NextAuth avec `session.user.isGlobalSupport` ;
- adaptation minimale du RBAC et des permissions pour reconnaître le support global sans lui attribuer de droits globaux implicites ;
- conservation du bornage multi-tenant, sans ouverture cross-company implicite.

## Incident intermédiaire corrigé avant clôture

Un index erroné `@@index([platformRole])` avait été introduit dans `model Vehicle` pendant la session. Ce point a été corrigé avant validation finale via le correctif d’application `SUP-02-FIX-APPLY`, sans modification de l’intention métier de la session.

## Validations terminales finales

État terminal validé :
- `git apply` du patch `SUP-02` : **OK**
- `git apply` du correctif `SUP-02-FIX-APPLY` : **OK**
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## État de clôture

Session clôturée **`conforme`**.
Le rôle support global est modélisé proprement, distinct des rôles client, sans régression fonctionnelle ni ouverture du multi-tenant.
