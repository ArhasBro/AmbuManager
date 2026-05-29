# SESSION

## ID SESSION

SESSION-DEV-V2-01-06

## Date

2026-05-29

## Contexte

Bloc DEV-V2-01, session de correction frontend ciblee sur l'harmonisation des etats d'acces refuse pour utilisateur authentifie non autorise.

## Objectif de la session

Harmoniser un pattern frontend unique (message, rendu, comportement) pour les pages privees quand l'utilisateur est connecte mais sans permission.

## Perimetre exact traite

- Correction frontend ciblee des etats acces refuse dans `app/**`.
- Ajout d'un composant UI partage pour le pattern.
- Mise a jour des documents de session DEV-V2-01-06.
- Generation d'un patch code dedie dans `PATCH/`.

## Resultat synthetique de session

Pattern unifie applique:
- utilisateur non authentifie ou session invalide: redirection `/login` conservee;
- utilisateur authentifie non autorise: rendu `AccessDeniedState` dans la page, avec message harmonise et lien retour dashboard.
