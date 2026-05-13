# NOTES — SESSION-20260503_TEST-LOCAL-02

## Synthèse courte
Cette phase 2 correspond à un test manuel ADMIN de l’ALPHA.  
Le test n’a pas couvert absolument toutes les lignes prévues, mais il a permis d’identifier les principaux points bloquants et les écarts majeurs avant présentation à une société pilote.

## Continuité avec la phase précédente
La session `SESSION-20260418_TEST-LOCAL-01` avait établi que le dépôt était localement testable et que les validations terminales rejouées étaient positives.  
Cette phase 2 ne remet pas en cause cette conclusion technique : elle ajoute une couche de test manuel produit / métier / UI.

## Points positifs observés
Les modules suivants semblent globalement utilisables ou conformes avec réserves côté ADMIN :
- login avec identifiants valides / invalides ;
- déconnexion ;
- accès direct aux pages privées après connexion ;
- dashboard après rafraîchissement ;
- navigation sidebar / topbar après hydratation correcte de session ;
- société / profil société ;
- dépôts / bases ;
- véhicules / flotte ;
- conformité véhicules ;
- templates ;
- audit ;
- sécurité interface de base.

## Points majeurs non conformes
Les principaux points non conformes sont :
1. session post-login instable ;
2. module utilisateurs non exploitable ;
3. absences non testables car dépendantes du module utilisateurs ;
4. planning manuel à reprendre ;
5. règles métier société partiellement préparées mais non éditables ;
6. UI réelle non alignée avec les maquettes validées ;
7. rôle `PSC1` manquant ou à cadrer ;
8. affectation du personnel au planning trop complexe ;
9. données RH salarié à compléter ;
10. besoin de plusieurs gérants à confirmer ;
11. gouvernance suppression / archivage à clarifier.

## Point central ajouté après le fichier de test
L’utilisateur a indiqué que l’UI réelle ne correspond pas aux maquettes visuelles validées et que c’est le point le plus gênant.

Ce constat est classé comme une anomalie majeure :
- catégorie : `C — INCOHÉRENCE UI/UX` ;
- gravité : forte ;
- décision : `SESSION DÉDIÉE À CRÉER`.

## Analyse produit
Le test montre que l’ALPHA n’est pas simplement en attente de petites corrections.  
Elle nécessite une reprise structurée autour de quatre axes :
- correction technique immédiate des accès/session et utilisateurs ;
- réalignement UI/UX sur les maquettes validées ;
- reprise métier du planning manuel ;
- compléments métier RH / rôles / règles.

## Risque principal
Présenter l’ALPHA à une société pilote en l’état risque de donner une impression d’instabilité, notamment à cause :
- du dashboard affichant un état non connecté juste après login ;
- du module utilisateurs inutilisable ;
- du planning insuffisamment exploitable ;
- de l’interface non conforme à la direction visuelle validée.

## Recommandation générale
Ne pas lancer une correction globale unique.  
Créer des sessions dédiées, courtes et fermées, en respectant la logique :
1. correction immédiate ;
2. retest ciblé ;
3. correction / complétion suivante ;
4. validation.
