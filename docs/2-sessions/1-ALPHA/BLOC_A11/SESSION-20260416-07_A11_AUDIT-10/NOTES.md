# NOTES

## Méthode retenue

Validation A11 effectuée en quatre temps :

1. relecture des documents maîtres et du protocole ;
2. relecture du constat `AUDIT-01` ;
3. relecture de l’état réellement livré par `AUDIT-LOT-02-09` ;
4. contrôle direct du code réel sur le périmètre demandé.

## Points structurants retenus

1. **Infrastructure persistante réelle** : `PlanningAuditLog` et `LoginAuditLog` existent réellement au schéma et en migration.
2. **Lecture audit dédiée réelle** : `/api/audit` unifie effectivement les entrées planning/support et connexions, avec page dédiée `/audit`.
3. **Lecture du run courant réelle** : la route `GET /api/planning/autoschedule/runs/[id]` expose réellement `auditLogs` lorsque `canViewAudit(...)` est vrai.
4. **Protection de l’historique shift réellement corrigée** : `includeHistory=1` n’est servi que si `canViewAudit(...)` est vrai et l’UI masque sinon l’historique.
5. **Audit des connexions réellement persistant** : `writeLoginAudit(...)` est bien appelé depuis `lib/auth.ts` pour succès, mot de passe invalide et utilisateur inactif ayant une société.
6. **Modèle d’accès audit encore partiel** : lecture audit native pour `ADMIN`, `GERANT` et support global via `AUDIT_VIEW`, mais pas de modèle explicite et cohérent de support propriétaire dans le code réel.
7. **Actions support non réellement opérables** : `traceSupportAction(...)` exige un `supportReason` obligatoire, mais aucun appel contrôlé ne fournit ce champ ; de plus, les routes utilisateurs / véhicules / dépôts refusent en pratique le support global.
8. **Audit utilisateurs / véhicules / dépôts non homogène** :
   - utilisateurs : création / modification non auditées ; seules certaines opérations support sont préparées ;
   - véhicules : structure de trace support présente sur plusieurs opérations, mais pas d’audit homogène pour les acteurs métier standards ;
   - dépôts : même logique, structurée côté support seulement.

## Décision méthodologique

`NO_PATCH` est retenu pour cette session de validation.

Motif : les écarts restants sont réels, transverses et dépassent le cadre d’un correctif final minimal de validation. Produire un patch code ici reviendrait à rouvrir une vraie session de correction-completion déguisée, contraire à l’ouverture officielle.

## Portée documentaire

- aucun changement applicatif ;
- aucun patch code produit ;
- aucune préparation de `CLOTURE_A11` ;
- documentation recalée uniquement sur l’état réel contrôlé.
