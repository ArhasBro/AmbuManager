# RESULTATS

## 1. Analyse rapide

Le dashboard actuel est **un portail minimal partiel**.

Il remplit déjà une partie du rôle attendu :
- point d’entrée post-connexion par défaut ;
- présence d’une page dédiée `/dashboard` ;
- présence de liens modules ;
- présence d’une zone admin conditionnelle.

Il ne remplit pas encore complètement le cadrage A7 :
- la distribution des accès n’est pas totalement cohérente avec les permissions réelles ;
- la différenciation par rôle reste partielle ;
- aucun dashboard terrain distinct n’est livré ;
- aucun indicateur simple métier n’est réellement exposé.

## 2. Périmètre réellement contrôlé

- `app/page.tsx`
- `app/login/page.tsx`
- `app/dashboard/page.tsx`
- `proxy.ts`
- `lib/auth.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `app/planning/page.tsx`
- `app/company/page.tsx`
- `app/depots/page.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/templates/page.tsx`
- docs maîtres et documents de protocole listés dans `EVIDENCES.md`

## 3. État réel du dashboard existant

### 3.1 Ce qu’est réellement le dashboard actuel
Le dashboard réel est une page serveur simple qui :
- exige une session ;
- affiche un titre, un bouton de déconnexion et des liens de navigation ;
- affiche toujours un lien `Planning` ;
- affiche conditionnellement une zone `Dashboard admin` ;
- affiche en environnement non production un bloc `Session (debug)` avec le JSON de session.

### 3.2 Agit-il déjà comme portail d’accès / point d’entrée ?
**PARTIEL**

Oui, parce que :
- la connexion renvoie par défaut vers `/dashboard` ;
- le dashboard sert bien de hub d’accès à plusieurs modules.

Partiel, parce que :
- la racine `/` redirige d’abord vers `/login`, pas directement vers une entrée dashboard contextualisée ;
- surtout, le dashboard n’aligne pas encore correctement tous les liens affichés avec les permissions réellement nécessaires en aval.

### 3.3 Distribue-t-il correctement les accès selon permissions ?
**PARTIEL**

Présences conformes observées :
- zone admin conditionnée par `canAccessAdminDashboard`
- lien utilisateurs conditionné par `canManageUsers`
- lien véhicules conditionné par `canManageVehicles`
- lien templates conditionné par `canManageTemplates`

Non-conformité prouvée :
- le lien `Planning` est affiché sans vérification préalable de `PLANNING_VIEW_SELF` / `PLANNING_VIEW_GLOBAL`
- la page planning, elle, contrôle explicitement ces permissions

### 3.4 Oriente-t-il correctement les utilisateurs selon rôle ?
**PARTIEL**

Présence partielle :
- `Profil société` et `Bases / dépôts` sont réservés aux rôles natifs `ADMIN` / `GERANT`

Limites :
- aucune orientation dédiée n’est livrée pour `REGULATEUR`, `BUREAU`, `ADE`, `AA`, `TAXI`
- aucune vue terrain distincte n’existe malgré la permission catalogue `DASHBOARD_TERRAIN_ACCESS`
- la différenciation reste donc embryonnaire

### 3.5 Des indicateurs sont-ils déjà affichés ?
**NON**

Aucun indicateur métier simple n’a été trouvé sur `/dashboard`.
Le seul bloc dynamique hors production est un affichage brut de session de type debug.

## 4. Conformité au cadrage A7

### Conforme
- pas de cockpit analytique riche ;
- pas de dépendance démontrée à des données métier instables dans le dashboard lui-même ;
- base de portail existante ;
- une partie des accès admin est déjà conditionnée par permissions.

### Partiellement conforme
- vrai point d’entrée produit : partiel ;
- distribution des accès selon permissions : partielle ;
- orientation utilisateur selon rôle : partielle.

### Non conforme / manquant
- vue dashboard terrain distincte : non trouvée ;
- différenciation rôle complète conforme au cadrage 14.3 : non trouvée ;
- indicateurs simples métier : absents.

## 5. Écarts strictement prouvés

### Écart 1 — Lien planning affiché sans contrôle préalable des permissions de consultation
Preuve :
- `app/dashboard/page.tsx:40-42` affiche `Planning` sans condition
- `app/planning/page.tsx:34-40` refuse l’accès sans `PLANNING_VIEW_SELF` ou `PLANNING_VIEW_GLOBAL`

Conclusion :
- le dashboard ne distribue pas encore correctement ce module selon permissions.

### Écart 2 — Cas support global / session sans `companyId` : lien planning potentiellement mort
Preuve :
- `app/dashboard/page.tsx:14-16` n’exige qu’une session
- `app/planning/page.tsx:20` exige `user.companyId`
- `lib/permissions.ts:42-44` retire les accès à permissions aux comptes support globaux

Conclusion :
- un compte support global peut atteindre `/dashboard` mais ne dispose pas d’un portail réellement exploitable à partir du lien `Planning`.

### Écart 3 — Différenciation par rôle non livrée au niveau cadré
Preuve :
- le cadrage 14.3 attend une adaptation par rôle
- une seule page dashboard existe
- aucune consommation de `DASHBOARD_TERRAIN_ACCESS` n’a été trouvée

Conclusion :
- la différenciation par rôle est seulement partielle à ce stade.

### Écart 4 — Libellé `/users` trop étroit pour un portail d’orientation
Preuve :
- le dashboard affiche `Réinitialisation mot de passe`
- la page `/users` expose un module beaucoup plus large d’administration utilisateurs

Conclusion :
- l’orientation utilisateur reste ambiguë sur cette entrée.

## 6. Risques ou dépendances à des données instables

### Risque analytique
Aucun widget métier riche n’a été trouvé sur le dashboard.
Donc :
- **pas de dépendance métier fragile strictement prouvée** dans le dashboard actuel ;
- **pas de dérive analytique prématurée strictement prouvée**.

### Risque fonctionnel
Le risque principal n’est pas analytique mais d’orientation :
- affichage d’un accès planning sans vérification préalable de la consultation réelle ;
- expérience support global non alignée avec un portail exploitable ;
- différenciation rôles incomplète.

## 7. Décision pour la suite du bloc

### Décision
**`DASH-02` est nécessaire.**

### Motif
Une correction minimale du dashboard actuel est justifiée avant complétion plus large, au minimum pour :
- réaligner les liens visibles avec les permissions réellement nécessaires ;
- éliminer les accès affichés non réellement exploitables ;
- clarifier la fonction portail avant enrichissement.

## 8. Fichiers inspectés

### Documentation
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code
- `app/page.tsx`
- `app/login/page.tsx`
- `app/dashboard/page.tsx`
- `proxy.ts`
- `lib/auth.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `app/planning/page.tsx`
- `app/company/page.tsx`
- `app/depots/page.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/templates/page.tsx`

## 9. Validations réellement exécutées

- `npm run lint` : exécutée, **KO** (`eslint: not found`)
- `npm run build` : exécutée, **KO** (`next: not found`)

## 10. Décision patch

**`NO_PATCH`**

Motif :
- session de type `AUDIT`
- aucune correction autorisée dans `DASH-01`
- les écarts identifiés alimentent `DASH-02`

## 11. Synthèse des conclusions obligatoires

- Le dashboard actuel est-il déjà un vrai point d’entrée produit : **PARTIEL**
- La gestion d’accès par permissions est-elle déjà présente : **PARTIEL**
- La différenciation par rôle est-elle déjà présente : **PARTIEL**
- Des indicateurs sont-ils déjà affichés : **NON**
- Ces indicateurs sont-ils compatibles avec le cadrage ALPHA : **NON**  
  (aucun indicateur métier ; le bloc debug n’est pas un indicateur simple acceptable)
- Une correction est-elle nécessaire en `DASH-02` : **OUI**

## Documents modifiés

Aucun fichier du dépôt n’a été modifié dans le cadre de cette session d’audit.  
Un export documentaire à plat a été généré pour livraison.
