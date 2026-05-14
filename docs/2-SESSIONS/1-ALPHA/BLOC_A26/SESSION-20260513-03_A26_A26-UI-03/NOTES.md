# NOTES

Notes de travail de la session.

---

## Methode / observations

- Reference visuelle cible : `Login_V1.1.png` + `REFERENCE_UI_UX_LOGIN.md`.
- Travail en phase code d'abord, documentation apres autorisation explicite.
- Ajustements realises par etapes pour conserver la logique auth intacte.

### Chronologie synthese

1. Patch principal A26-UI-03
- Refonte visuelle Login (split, carte, microcopies, badge bas, ordre formulaire, etat erreur).

2. FIX-01
- Suppression import image depuis `docs/1-MASTER`.
- Bascule vers URL publique `/assets/login/ambulance-login-bg.webp`.

3. FIX-02
- Correction integration visuelle image (visibilite de la zone immersive).

4. FIX-03
- Passage a un fond pleine zone sur la colonne gauche.

5. FIX-04
- Verrouillage du placement image a gauche (`background-position: left center`).

6. FIX-05
- Reduction du voile global et amelioration du rendu couleur/contraste.

7. FIX-06
- Image definie comme fond principal visible, suppression du filter applique au conteneur,
  overlays legers deplaces dans pseudo-elements.

### Contraintes respectees

- Aucun changement de logique auth.
- Aucun changement API/RBAC/Prisma.
- Aucun ZIP.
- Aucune capture automatique.
- Aucun retour a une dependance `docs/1-MASTER`.