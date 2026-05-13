# NOTES

## Nature de la session

Session de type **AUDIT**.
Aucune correction code n’est ouverte dans `ORG-01`.
Le travail consiste uniquement à constater l’état réellement livré du modèle société sur le périmètre ALPHA inspecté.

## Rappel du cadrage utile

Le cadrage fonctionnel officiel fixe pour `03.2 Profil société` un besoin minimal explicite :
- nom société ;
- nom des gérants ;
- adresse ;
- téléphone ;
- SIRET.

Le même cadrage marque ce point comme **`partiel`** à l’échelle produit.
Conséquence méthodologique :
- l’audit ne doit pas conclure `conforme` si seuls des éléments techniques de cloisonnement existent ;
- il doit distinguer la **présence d’une entité `Company`** de la **présence d’un vrai profil société exploitable**.

## Observations sur le code réel

### 1. Une entité société existe réellement, mais elle est minimale
Le schéma Prisma montre un modèle `Company` réel et central.
En revanche, ce modèle ne contient actuellement que :
- `id`
- `name`
- `createdAt`
- `updatedAt`

Les autres éléments visibles sont des **relations** vers `users`, `vehicles`, `rules`, `shiftTemplates`, `maintenanceTypes`, `autoScheduleRuns`, `draftShifts`, `shifts`, `planningAuditLogs`.

Conclusion :
- une société existe bien comme conteneur de données ;
- le profil société minimal ALPHA n’est pas matérialisé dans ce modèle.

### 2. Le besoin minimal du cadrage n’est couvert que sur le nom société
Le cadrage exige cinq informations minimales.
Le code n’en prouve actuellement qu’une seule de façon directe :
- `name` → oui
- nom des gérants → non visible
- adresse → non visible
- téléphone → non visible
- SIRET → non visible

Conclusion :
- le besoin minimal n’est pas couvert ;
- l’existant n’est pas nul, mais il est insuffisant.

### 3. L’usage principal actuel de la société est le multi-tenant
`User.companyId` relie chaque utilisateur à une société.
L’auth NextAuth sélectionne `companyId` au login, l’injecte dans le token JWT, puis dans `session.user.companyId`.

Conclusion :
- la société est aujourd’hui utilisée comme pivot de cloisonnement ;
- cet usage ne vaut pas validation du profil société.

### 4. L’API `company` visible ne gère pas la fiche société
Le seul périmètre `app/api/company/*` visible dans le dépôt inspecté est `app/api/company/rules/route.ts`.
Cette route lit/écrit des `CompanyRule` par `companyId` et par `key/value`.
Elle ne lit ni ne modifie les champs d’identité de la société.

Conclusion :
- il existe bien une API sous le namespace `company` ;
- mais ce n’est pas une API de profil société.

### 5. Aucune UI dédiée au profil société n’est visible
Aucune page `app/company/page.tsx`, `app/settings/company/*`, `app/admin/company/*` ou équivalent n’a été trouvée sur le périmètre inspecté.
Les seules traces “entreprise” visibles concernent les **règles métier** ou des libellés contextuels dans le planning.

Conclusion :
- aucune UI de consultation/édition du profil société n’est prouvée dans le dépôt.

### 6. Un seed société existe, mais il est purement technique et minimal
Le seed crée ou met à jour des sociétés par leur seul `name`.
Il rattache ensuite les utilisateurs, véhicules et templates via `companyId`.
Aucune donnée de profil société complémentaire n’est seedée.

Conclusion :
- il existe bien un bootstrap société utile pour le multi-tenant ;
- il n’existe pas de bootstrap prouvant un profil société complet.

## Classement explicite demandé par la session

### Ce qui existe réellement
- entité `Company` réelle en base ;
- champ `name` sur `Company` ;
- usage réel de `companyId` dans `User` ;
- hydration `companyId` dans auth / JWT / session ;
- usages multi-tenant sur plusieurs routes ;
- seed de sociétés de démonstration ;
- route `company/rules` réellement fonctionnelle pour des réglages société.

### Ce qui est seulement partiel
- couverture du besoin “profil société” : partielle, car seul le nom société est réellement visible ;
- bootstrap société : partiel, car il crée la société mais pas sa fiche minimale complète ;
- périmètre `company/*` : partiel, car il existe pour les règles mais pas pour le profil.

### Ce qui est manquant
- champs `nom des gérants`, `adresse`, `téléphone`, `SIRET` dans `Company` ;
- API dédiée de lecture/édition du profil société ;
- UI dédiée au profil société ;
- service métier spécifique au profil société ;
- preuve d’un onboarding société complet sur ce point.

## Conséquence logique pour la suite

Le verdict `incomplet` appelle logiquement la session suivante prévue au plan :
- `ORG-02 — COMPLÉTION — Ajout/correction des champs minimaux du profil société`

Cette suite est cohérente avec :
- la présence d’un socle `Company` déjà réel ;
- l’absence des champs minimaux attendus ;
- l’absence d’API/UI profil société.
