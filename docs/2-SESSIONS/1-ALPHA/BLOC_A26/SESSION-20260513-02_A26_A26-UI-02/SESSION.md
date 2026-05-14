# SESSION

## ID SESSION

SESSION-20260513-02_A26_A26-UI-02

## Date

13/05/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A26  
Type : CORRECTION+COMPLÉTION  
Intitulé : Shell global connecté

## Objectif de la session

Aligner le Shell global connecté avec la référence officielle afin d'en faire le socle visuel commun des pages connectées, puis sécuriser la fluidité responsive multi-écrans (1920×1080 et 2560×1440).

## Périmètre exact traité

- Shell global connecté : `app/app-shell.tsx`, `app/layout.tsx`, `app/globals.css`.
- Rythme visuel transverse : topbar, sidebar, conteneur principal, largeur utile.
- Correctif complémentaire : visibilité verticale du bas de sidebar en 1920×1080 via overflow interne maîtrisé.
- Gouvernance patch et documentation de session.

## Résultat synthétique de session

- Shell global réaligné visuellement (sidebar, topbar, déconnexion non primaire, labels accentués).
- Fluidité responsive améliorée sans `zoom` ni `transform: scale()`.
- Écart détecté après premier correctif responsive (sidebar bas coupé en 1920×1080) documenté, corrigé, puis validé manuellement par Nathan.
- Validation manuelle Nathan confirmée :
  - rendu 1920×1080 validé ;
  - bas de sidebar visible ou atteignable ;
  - bloc Thème non coupé ;
  - carte utilisateur non coupée ;
  - navigation sidebar utilisable ;
  - rendu 2560×1440 validé ;
  - aucune régression visuelle constatée.

## Dossiers liés

- Session : `docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-02_A26_A26-UI-02`
- Patchs : `docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-02_A26_A26-UI-02/PATCH`