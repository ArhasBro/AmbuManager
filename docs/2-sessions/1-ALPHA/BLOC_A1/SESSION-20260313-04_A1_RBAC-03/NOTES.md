# NOTES

Notes de travail de la session.

---

## Méthode retenue

Session de type **AUDIT** avec obligation de ne rien corriger.

Méthode appliquée :
1. relire d’abord le cadrage officiel dans `docs/1-master` ;
2. isoler l’attendu exact du module `06` sur les permissions fines ALPHA ;
3. reprendre `RBAC-01` et `RBAC-02` pour ne pas réouvrir ce qui a déjà été prouvé ;
4. identifier les contrôles d’accès réellement présents dans le code ;
5. distinguer ce qui relève :
   - d’un contrôle par rôle,
   - d’un contrôle par permission persistée,
   - d’un simple cloisonnement multi-tenant,
   - d’une capacité métier sans permission fine distincte,
   - d’une attente documentaire non encore codée ;
6. cartographier ensuite l’alignement avec les 18 permissions attendues par `06.5`.

## Règles de qualification appliquées

### 1. Permission prouvée
Retenue seulement si les trois éléments suivants sont réunis ou suffisamment prouvés sur le périmètre :
- existence d’un contrôle d’accès réellement exécuté ;
- consommation effective dans une route/page/service réellement utilisé ;
- lien clair avec une capacité métier du cadrage.

### 2. Permission partielle
Retenue quand :
- une capacité métier existe, mais sans permission fine distincte ;
- ou l’accès est seulement hardcodé par rôle ;
- ou le périmètre couvert est inférieur à ce qu’attend le cadrage ;
- ou une partie lecture existe sans le volet gestion complet.

### 3. Permission absente
Retenue quand :
- aucune route/page/service utile n’a été trouvée ;
- ou seule la documentation en parle ;
- ou seuls le schéma/seed existent sans capacité produit prouvée.

### 4. Contrôle multi-tenant non confondu avec RBAC
Règle importante retenue durant l’audit :
- `companyId` prouve un cloisonnement technique ;
- ce n’est pas, en soi, une permission RBAC métier ;
- il peut renforcer un contrôle d’accès, mais ne remplace pas une permission fine du cadrage.

## Cadrage officiel utile

### 1. Le cadrage attend une matrice de permissions fines ALPHA
Le point `06.5` du document de cadrage liste explicitement 18 permissions applicatives attendues.
Le statut officiel du point est déjà `partiel`, ce qui autorise un constat d’écart sans correction dans `RBAC-03`.

### 2. Le plan officiel confirme que l’alignement n’est pas censé être terminé à ce stade
Le plan place `RBAC-03` en audit avant :
- `RBAC-04` réalignement / ajout des permissions fines ;
- `RBAC-05` ajout de la permission `consulter audit` ;
- `RBAC-06` mise à niveau du modèle d’accès à l’audit.

Conséquence méthodologique :
- l’absence de plusieurs permissions n’est pas une invention ;
- c’est précisément le type d’écart attendu à constater dans cette session.

## Ce que `RBAC-01` apportait déjà utilement

`RBAC-01` avait déjà prouvé :
- la présence du catalogue de rôles dans Prisma ;
- le rôle principal obligatoire ;
- la présence d’un helper `requireRole()` minimal ;
- la forte concentration des contrôles réels sur `ADMIN` et `GERANT` ;
- l’existence de deux permissions planning seedées.

`RBAC-03` ne réouvre donc pas l’audit du catalogue de rôles.  
Il audite seulement l’état réel des permissions / accès par rapport au cadrage validé.

## Lecture de fond retenue sur le dépôt inspecté

### 1. Le dépôt possède un RBAC minimal mais pas encore une vraie matrice fine ALPHA
Le code montre surtout :
- du contrôle par rôle côté pages/API ;
- du contrôle par permission uniquement sur une partie du planning auto.

### 2. Le modèle `Permission` existe mais son usage produit est très restreint
La persistance `Permission` / `UserPermission` est réelle.  
En revanche, le code réellement consommateur se limite à :
- `PLANNING_AUTOSCHEDULE`
- `PLANNING_AUTOSCHEDULE_PUBLISH`

### 3. Plusieurs capacités métier existent sans permission distincte
Exemples retenus :
- gestion véhicules ;
- reset password d’un autre utilisateur ;
- modification d’un réglage entreprise ;
- affectation manuelle dans le planning.

Ces capacités ne doivent pas être surqualifiées en « permissions fines conformes » tant qu’aucun modèle d’autorisation distinct n’est prouvé.

### 4. La UI ne suffit pas comme preuve autonome
Le planning client affiche plusieurs actions même pour des rôles non-admin, conformément à une décision déjà tracée pour les tests DoD.  
L’autorité reste l’API.  
Donc :
- l’affichage d’un bouton n’est pas une permission prouvée ;
- seule la garde serveur réellement exécutée vaut preuve principale.

## Limites assumées de l’audit

- aucune matrice théorique supplémentaire n’a été inventée ;
- aucune interprétation produit BETA n’a été utilisée ;
- aucun module absent du dépôt n’a été supposé exister ;
- aucune capacité n’a été considérée conforme juste parce qu’un rôle ou un modèle Prisma existe ;
- l’audit reste borné au périmètre `1-ALPHA` réellement fourni.

## Résumé de travail retenu

État de travail retenu au terme de l’analyse :
- **permissions fines distinctes réellement prouvées** : 2
- **contrôles par rôle réellement prouvés** : plusieurs, surtout `ADMIN` / `GERANT`
- **capacités partielles sans permission fine distincte** : plusieurs
- **permissions du cadrage encore absentes ou non prouvées** : nombreuses

Conclusion de travail :
- `RBAC-03` ne justifie aucun patch ;
- il documente un état réel **partiellement conforme** ;
- il prépare logiquement les sessions `RBAC-04`, `RBAC-05` et `RBAC-06` sans les traiter.
