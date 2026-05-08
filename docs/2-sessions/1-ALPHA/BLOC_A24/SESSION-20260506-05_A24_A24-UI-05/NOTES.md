# NOTES - SESSION-20260506-05_A24_A24-UI-05

## Decisions UI appliquees

1. Vehicules
- passage a une structure principale `liste + panneau detail` proche maquette A24 ;
- ajout d'une selection de ligne et onglets visuels (`Details`, `Equipements`, `Maintenance`, `Docs`) ;
- densification du tableau avec colonnes documentaires (assurance, controle technique, carte grise, agrement, conformite).

2. Templates
- passage a une structure principale `liste + panneau detail` proche maquette A24 ;
- ajout d'onglets detail (`Details`, `Equipe`, `Horaires`, `Historique`) ;
- filters et actions visuelles alignees (filtres avances, export/vue en secondaire visuel, badges statut/traverse minuit).

3. Socle visuel
- extension de `app/a24-vehicles-templates.css` pour les layouts a deux colonnes, panneaux details sticky desktop, tabs, cartes de detail et comportement responsive/mobile ;
- coherence mode clair prioritaire et mode sombre maintenue via variables existantes.

## Hors perimetre explicitement respecte

- aucune modification backend/API/Prisma/RBAC ;
- aucune refonte planning ;
- aucune extension autoschedule/matching/RH avancee.

## Informations non prouvees

- Captures avant/apres de l'application pour cette execution : INFORMATION NON FOURNIE - A CONFIRMER.