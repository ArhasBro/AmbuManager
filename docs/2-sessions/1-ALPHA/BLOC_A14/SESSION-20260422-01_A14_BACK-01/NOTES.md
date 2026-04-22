# NOTES.md

## Nature de la session
Session `AUDIT` strictement documentaire au stade de génération des livrables finaux.

La documentation est rédigée à partir de la réponse de production validée, sans rejouer l’audit, sans correction du code et sans réouverture du périmètre.

## Position de la session
- Décision patch : `NO_PATCH`
- Nature du constat : backend globalement structuré mais hétérogène
- Type de verdict documenté : validation du compte rendu d’audit, non validation corrective du dépôt

## Points de méthode retenus
- Aucun diff dépôt n’est produit
- Aucun fichier code n’est modifié
- Aucun lot suivant n’est préparé dans ces documents
- En l’absence d’élément explicitement contenu dans la réponse validée : `INFORMATION NON FOURNIE — À CONFIRMER`

## Synthèse des observations documentées
### Conformités observées
- socle auth/session enrichi côté serveur
- présence d’un socle RBAC dédié
- prise en compte du rôle support global dans le backend audité
- cloisonnement multi-tenant par `companyId` observé sur plusieurs domaines
- existence d’une couche de réponse homogène sur une partie du périmètre
- existence d’un mapping Prisma → HTTP utilisé sur plusieurs routes CRUD
- présence de validateurs Zod serveur centralisés sur une partie du périmètre
- présence d’une couche service métier sur plusieurs sujets
- traçabilité backend déjà branchée sur certaines actions du périmètre audité
- centralisation du client Prisma dans `lib/prisma.ts`

### Hétérogénéités / résiduels observés
- conventions de réponse non homogènes selon les routes
- validations serveur encore partiellement locales
- centralisation incomplète autour de l’assignation planning
- routes planning encore épaisses sur le périmètre audité
- accès Prisma encore dispersés côté routes
- contrôles RBAC non uniformes selon les domaines examinés
- transmission `platformRole` incomplète sur certaines routes planning observées
- lisibilité inégale de la couche service selon les fichiers examinés
- homogénéité de traçabilité support non constante selon les domaines
- conventions backend réparties entre plusieurs emplacements

## Réserve documentaire
Les présents documents n’ajoutent aucune preuve nouvelle.  
Ils reprennent uniquement le contenu validé de la réponse d’audit.
