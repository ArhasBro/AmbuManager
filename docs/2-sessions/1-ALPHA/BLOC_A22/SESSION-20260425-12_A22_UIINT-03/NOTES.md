# NOTES

Notes de travail de la session.

---

## Methode / observations

- Lecture documentaire ciblee conforme a la consigne (noyau obligatoire + references A21 + clotures A22-01/A22-02 utiles au shell/navigation).
- Inspection du depot reel : absence de dossier UI mutualise dedie, styles partages essentiellement via `globals.css`.
- Choix d'architecture : `app/ui` pour rester coherent avec l'organisation App Router existante.
- Integration volontairement limitee a quelques ecrans pour verifier la reutilisation sans refactor massif.

## Exclusions respectees

- Aucun changement shell structurel A22-UIINT-01.
- Aucune modification navigation permissions A22-UIINT-02.
- Aucune route metier ajoutee.
- Aucune modification Prisma / migrations / seed / API / RBAC serveur.
- Aucune nouvelle direction artistique hors references A21.
