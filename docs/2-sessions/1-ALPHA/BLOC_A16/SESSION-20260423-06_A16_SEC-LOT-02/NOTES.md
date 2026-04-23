# NOTES - SESSION-20260423-06_A16_SEC-LOT-02

Notes de travail de la session.

---

## Methode / observations

- Lecture documentaire ciblee : noyau minimal, SEC-01 valide, fichiers de
  session courante.
- Aucun audit global rejoue.
- Patch-first respecte :
  - patch principal produit dans `PATCH/` ;
  - application du patch principal ;
  - validations ;
  - correctifs minimaux separes apres constats.

## Observations techniques

- Le durcissement mot de passe est centralise pour eviter trois politiques
  divergentes entre creation, reset et import.
- Le proxy complete la defense en profondeur des pages sensibles, sans retirer
  les gardes serveur deja presents.
- Les scripts backup/restore restent une base operatoire minimale : ils
  dependent de `pg_dump`, `pg_restore` et `DATABASE_URL`.
- Le restore exige `-Force` afin d'eviter une restauration destructive implicite.
- Les backups locaux sont exclus par `/backups/`.

## Limites volontaires

Non traites dans ce patch, car hors perimetre minimal SEC-LOT-02 traite ou sans
politique produit confirmee :
- verrouillage de compte / anti-bruteforce avance ;
- rotation applicative avancee des sessions ;
- CSRF applicatif hors mecanismes NextAuth ;
- audit metier exhaustif users/vehicles/templates/company/depots/imports ;
- strategie de rotation des secrets de production ;
- execution reelle d'une sauvegarde ou restauration.

Toute politique de production sur ces points reste : INFORMATION NON FOURNIE - A
CONFIRMER.
