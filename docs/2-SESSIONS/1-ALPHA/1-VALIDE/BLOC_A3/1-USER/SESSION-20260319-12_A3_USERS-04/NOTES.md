# NOTES — SESSION-20260319-12_A3_USERS-04

## Stratégie retenue
La session USERS-04 a été finalisée en conservant un périmètre strictement borné à l’API de création utilisateur, dans la continuité directe de USERS-03.

## Bornage
- API création utilisateur uniquement ;
- aucun changement UI ;
- aucune extension vers USERS-05, USERS-06, USERS-07 ou USERS-08 ;
- aucun changement Prisma structurel ;
- aucun patch applicatif supplémentaire au-delà du patch final retenu.

## Cohérence de mise en œuvre
La livraison finale retenue est alignée sur le dépôt réel :
- conventions API réellement présentes ;
- helpers et mécanismes existants réutilisés ;
- intégration bornée aux fichiers utiles au POST de création utilisateur.

## Absence de dérive
Aucune dérive hors périmètre USERS-04 n’est retenue dans la livraison finale documentée.
