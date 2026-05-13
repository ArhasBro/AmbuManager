# SESSION — SESSION-20260319-20_A3_USERS-12

## Date
20/03/2026

## Contexte
Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A3  
Type : AUDIT  
Intitulé : Audit du besoin absences / indisponibilités

## Objet de la session
Auditer l’état réel du besoin `absences / indisponibilités utilisateur` après USERS-11, vérifier si l’absence relevée en USERS-01 reste exacte, comparer l’existant au cadrage validé et conclure formellement sans implémenter USERS-13, USERS-14 ni USERS-15.

## Périmètre retenu
- `docs/1-master/*`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `prisma/schema.prisma`
- `app/api/users/**`
- `app/users/**`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/autoschedule/**`
- `lib/services/planning/**`
- `lib/types/planning.ts`
- `lib/validators/planning-assign.ts`
- `lib/permission-catalog.ts`
- sessions `USERS-01` à `USERS-11`

## Hors périmètre confirmé
- aucune implémentation de modèle Prisma absences ;
- aucune création d’API absences ;
- aucune création d’UI absences ;
- aucune refonte planning ;
- aucun traitement de `USERS-13`, `USERS-14` ou `USERS-15` ;
- aucune validation terminale fictive ;
- aucun patch code si aucun résiduel strictement inséparable n’est prouvé.

## Résultat synthétique
Aucune gestion réelle des absences / indisponibilités utilisateur n’est présente dans le dépôt audité : aucun modèle Prisma dédié, aucune route API dédiée, aucune UI dédiée, aucune permission dédiée et aucune consommation d’une source d’indisponibilités déclaratives dans les services planning/autoschedule/matching. En revanche, le planning implémente déjà des contrôles indirects sur les chevauchements horaires, le repos minimum et certains conflits de ressources. La qualification retenue pour l’existant est donc `incomplet`.

## Emplacements de référence
- session : `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-20_A3_USERS-12/`
- patch : `docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-20_A3_USERS-12/`
