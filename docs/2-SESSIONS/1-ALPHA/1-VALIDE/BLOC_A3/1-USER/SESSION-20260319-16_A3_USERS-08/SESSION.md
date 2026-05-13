# SESSION — SESSION-20260319-16_A3_USERS-08

## Date
20/03/2026

## Contexte
Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A3  
Type : COMPLETION  
Intitulé : Désactivation / archivage utilisateur

## Objet de la session
Finaliser la session USERS-08 sur le périmètre strict de la désactivation / de l’archivage logique d’un utilisateur, sans suppression physique, en continuité directe de USERS-01 à USERS-07.

## Périmètre retenu
- archivage logique utilisateur uniquement ;
- conservation de la ligne en base ;
- sortie du flux standard des comptes actifs ;
- retour UI de succès / erreur ;
- rafraîchissement de la liste après action ;
- cloisonnement société strict ;
- exclusion des comptes support globaux.

## Hors périmètre confirmé
- aucune suppression physique ;
- aucune route `DELETE` ;
- aucun traitement USERS-09 ;
- aucune extension vers permissions avancées ;
- aucune extension vers mot de passe hors périmètre existant ;
- aucune extension vers rattachement dépôt hors périmètre existant ;
- aucune extension vers absences, planning ou archivage global.

## Résultat synthétique
La session USERS-08 est considérée comme livrée dans son périmètre strict, avec une validation technique complète retenue sur les preuves terminales réelles fournies.

## Emplacements de référence
- session : `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-16_A3_USERS-08/`
- patch : `docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-16_A3_USERS-08/`
