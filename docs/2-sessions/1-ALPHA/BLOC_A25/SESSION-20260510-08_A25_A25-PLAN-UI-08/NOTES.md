# NOTES

Notes de travail de la session.

---

## Méthode / observations

- Référence visuelle prioritaire utilisée : `Planning_V1.2.png` puis `Planning_V1.2_INFO_DETAIL.png`.
- Implémentation basée sur les données déjà chargées côté planning.
- Les données utilisateur enrichies (téléphone, rôle, dépôt, statut actif) sont récupérées via le chargement existant `/api/users?limit=500` déjà utilisé dans le composant.
- Les libellés UI de fallback restent sobres (`Téléphone non renseigné`, `Rôle non renseigné`, `Base non renseignée`, `Statut non renseigné`).
- INFORMATION NON FOURNIE — À CONFIRMER : indicateur jour férié exploitable dans les cellules semaine (non détecté dans les données chargées côté composant pour cette session).