# RESULTATS

## Résultats obtenus

### Correctif minimal effectivement réalisé
- ajout de `status` dans la validation de création véhicule ;
- persistance du `status` transmis par l’UI dans `POST /api/vehicles` au lieu d’un forçage systématique à `ACTIVE` ;
- ajout d’un champ UI réel de sélection du `status` à la création ;
- conservation du flux existant de mise à jour immédiate de la liste après création ;
- alignement de l’exposition UI de la création avec la restriction réelle côté API en réservant le formulaire au profil `ADMIN`.

### Impact exact sur la création véhicule

#### Corrigé
- la création couvre désormais réellement `immatriculation`, `type`, `statut` conformément à `07.2` ;
- le contrat UI -> API -> validation -> persistance est cohérent sur `status` ;
- le formulaire de création n’est plus visible aux profils non-admin alors que le module reste accessible selon les droits existants ;
- l’API n’a pas été élargie : la création reste réservée à `ADMIN`.

#### Volontairement non modifié
- listing véhicules hors impact strict du flux de création déjà existant ;
- édition véhicule ;
- archivage / désactivation véhicule ;
- suppression véhicule ;
- rattachement base hors comportement existant ;
- permissions métier globales du module ;
- architecture / refactor service.

### Validations finales

```bash
git apply --check ".\docs\3-patches\1-ALPHA\BLOC_A4\1-VEH\SESSION-20260322-05_A4_VEH-05\PATCH__SESSION-20260322-05_A4_VEH-05.diff"
git apply ".\docs\3-patches\1-ALPHA\BLOC_A4\1-VEH\SESSION-20260322-05_A4_VEH-05\PATCH__SESSION-20260322-05_A4_VEH-05.diff"
npm run lint
npm run build
```

Résultats réels :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

### Lecture de conformité sur le périmètre VEH-05

Le besoin `07.2 Création d’un véhicule` est couvert sur le périmètre corrigé :
- `immatriculation` : saisie et validation réelles ;
- `type` : saisie et validation réelles ;
- `statut` : désormais saisi, validé et persisté réellement ;
- surface de création : désormais alignée avec la cible `admin` du cadrage et la restriction API réelle.

---

## Documents finaux retenus

- `PATCH__SESSION-20260322-05_A4_VEH-05.diff`
- `README_PATCH.md`
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`
