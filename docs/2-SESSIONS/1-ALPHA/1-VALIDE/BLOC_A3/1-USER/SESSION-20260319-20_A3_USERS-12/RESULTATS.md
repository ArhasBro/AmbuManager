# RESULTATS — SESSION-20260319-20_A3_USERS-12

## 1. Existence réelle d’une gestion absences / indisponibilités utilisateur
**Réponse : NON.**

Aucune gestion réelle n’a été prouvée dans le dépôt audité :
- pas de modèle Prisma dédié ;
- pas d’API dédiée ;
- pas d’UI dédiée ;
- pas de validation dédiée ;
- pas d’intégration des absences dans les services planning, matching ou publication.

## 2. Ce que le planning couvre déjà indirectement
Le socle planning couvre déjà plusieurs contraintes utiles, mais distinctes du besoin absences :
- chevauchements horaires utilisateur ;
- chevauchements horaires véhicule ;
- repos minimum selon `CompanyRule` ;
- matching par rôle requis avec évitement des créneaux déjà occupés.

Ces mécanismes réduisent des affectations incohérentes, mais ils ne permettent pas de déclarer qu’un salarié est indisponible indépendamment d’un shift déjà existant.

## 3. Écart réel vs cadrage produit
### 3.1 Cadrage demandé
Le cadrage exige au minimum :
- une gestion des indisponibilités utilisateur (`05.6`) ;
- une prise en compte dans les règles ALPHA (`08.2`) ;
- une prise en compte dans l’autoschedule (`11.5`) ;
- une base exploitable pour l’import initial (`16.2`).

### 3.2 Existant réel
L’existant réel ne fournit aujourd’hui qu’un socle planning partiel, sans source déclarative d’indisponibilités.

### 3.3 Qualification retenue
**Verdict de qualification : `incomplet`.**

Justification :
- le besoin métier complet n’est pas couvert ;
- le dépôt possède toutefois déjà un socle de contrôles planning réutilisable ;
- il ne s’agit donc ni d’un état `conforme`, ni d’un état `à confirmer`.

## 4. Périmètre minimal recommandé pour USERS-13
Sans implémenter ici la session, le périmètre minimal logique à couvrir ensuite est :
- introduire une source persistée d’indisponibilités utilisateur, bornée par société et utilisateur ;
- exposer une API minimale de lecture/écriture/suppression logique adaptée au module users ;
- brancher cette source dans les contrôles existants qui affectent des utilisateurs :
  - assignation de `DraftShift` ;
  - assignation de `Shift` ;
  - matching / autoschedule ;
  - publication des runs si nécessaire pour cohérence finale.

## 5. Périmètre minimal recommandé pour USERS-14
Sans implémenter ici la session, le périmètre minimal logique à couvrir ensuite est :
- exposer une UI users dédiée à la consultation et à la gestion des indisponibilités utilisateur ;
- permettre la création, modification et retrait d’une indisponibilité ;
- rester dans le module users sans ouvrir une refonte du planning complet ;
- s’appuyer sur l’API réellement créée en USERS-13.

## 6. Résultat patch
- patch applicatif : NON ;
- mode retenu : `NO_PATCH` ;
- `README_PATCH.md` fourni ;
- aucun `.diff` produit.

## 7. Résultat global de session
USERS-12 remplit son objectif d’audit : l’absence de gestion réelle des absences / indisponibilités utilisateur reste exacte après USERS-11. Le planning fournit seulement un socle indirect de cohérence. La suite logique est bien d’ouvrir USERS-13 puis USERS-14, sans refonte globale du planning.
