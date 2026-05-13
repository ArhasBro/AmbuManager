# NOTES.md

## Notes de clôture documentaire
Cette documentation finale reprend uniquement l’état final validé par le contrôle qualité.

## Invariants retenus
- aucun nouveau changement code
- aucun nouveau patch code
- aucune reprise technique
- aucune modification Prisma
- aucune dépendance ajoutée
- aucune réanalyse fonctionnelle
- aucune relance de session

## Synthèse des livraisons
### Onboarding
Le lot A12 livre un onboarding manuel cohérent pour une société pilote via un point d’entrée dédié et une orientation claire vers les modules déjà réels.

### Imports
Le lot A12 livre un import initial simple ALPHA pour cinq domaines, avec :
- support CSV
- support XLSX
- aperçu avant import
- validation manuelle
- rapport d’erreurs
- logique d’ajout uniquement

### Exports / impression
Le lot A12 livre :
- export PDF
- export XLSX
- export CSV
- impression simple
- gouvernance réelle des actions d’export via `PLANNING_EXPORT`

## Notes sur les correctifs
### Fix 01
Le correctif traite la normalisation du champ `minStaffCount` dans le flux `templates` importé.

### Fix 02
Le correctif traite le narrowing de type local avant appel à `normalizeTemplateImportRowForCreateInput(...)` dans la branche preview `templates`.

## État documentaire final à retenir
Tout le contenu final doit être lu comme :
- patch principal appliqué
- FIX-01 appliqué
- FIX-02 appliqué
- validations terminales finales : OK / OK / OK / OK
