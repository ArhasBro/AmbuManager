# NOTES

## Méthode / observations
Travail mené en correction factuelle stricte :
1. relecture des documents maîtres et méthodologiques requis ;
2. recontrôle du schéma `ShiftTemplate` et des modèles `DraftShift` / `Shift` ;
3. recontrôle des migrations ayant introduit `ShiftTemplate`, `DraftShift` puis `Shift` ;
4. recontrôle du seed et des usages runtime réellement branchés ;
5. distinction stricte entre :
   - manques produit connus mais hors `TPL-03` ;
   - défaut relationnel réellement prouvé au niveau base.

## Observation structurante retenue
### Défaut réellement laissé ouvert après `TPL-02`
Le modèle contient bien :
- `ShiftTemplate.companyId`
- `DraftShift.companyId`
- `Shift.companyId`

Mais les relations template existantes restent définies uniquement par `templateId -> ShiftTemplate.id`.

Conséquence technique prouvée :
- la base accepte théoriquement un `DraftShift.companyId = A` avec un `templateId` appartenant à une `ShiftTemplate.companyId = B` ;
- la base accepte théoriquement le même écart sur `Shift` ;
- les lectures runtime (`assign-*`, `matching`, `planning`) consomment ensuite `template.category`, `template.requiredRole` ou `template.name` sans garde structurelle côté base sur l’appartenance société du template lié.

### Pourquoi ce point relève bien de `TPL-03`
Ce n’est ni un ajout métier `TPL-09+`, ni une API/UI `TPL-04` à `TPL-08`.
Il s’agit d’une **incohérence relationnelle minimale** entre `ShiftTemplate`, `DraftShift` et `Shift`, exactement dans le périmètre annoncé par la session.

## Choix de correction minimale
Une correction par simple clé étrangère composite aurait imposé soit :
- un changement de sémantique `ON DELETE SET NULL`,
- soit l’ajout de nouveaux champs techniques sur `DraftShift` / `Shift`.

Pour rester minimal et ne pas élargir le modèle métier, la correction retenue est une migration SQL dédiée :
- nettoyage défensif d’éventuels liens déjà incohérents ;
- trigger `DraftShift` avant insert/update ;
- trigger `Shift` avant insert/update ;
- trigger `ShiftTemplate` pour empêcher le changement inter-sociétés d’un template déjà lié.

## Hors scope maintenu
Restent hors `TPL-03` :
- API templates ;
- UI templates ;
- branchement `TEMPLATES_MANAGE` ;
- composition minimale d’équipe ;
- type de véhicule requis ;
- nombre minimal de personnes ;
- couleurs libres ;
- support des shifts non horodatés ;
- récurrence hebdomadaire.
