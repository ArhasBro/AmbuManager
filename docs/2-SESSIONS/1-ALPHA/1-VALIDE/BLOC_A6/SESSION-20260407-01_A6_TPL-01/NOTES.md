# NOTES

Notes de travail de la session.

---

## Méthode / observations
- Lecture préalable des documents maîtres requis :
  - `docs/1-master/DOCUMENT_MAITRE.md`
  - `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
  - `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
  - `docs/1-master/ETAT_GLOBAL_PROJET.md`
  - `docs/1-master/REGISTRE_DECISIONS.md`
  - `docs/1-master/RECAP_DISCUSSIONS.md`
  - `docs/1-master/STRUCTURE_PROJET.md`
  - `docs/PROTOCOLE_SESSION.md`
  - `docs/SOURCES_AUTORISEES.md`
  - `docs/STRUCTURE_DOCS.md`
  - `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- Contrôle statique du dépôt joint uniquement.
- Aucune reconstruction non sourcée : constat fondé sur le code réellement présent dans le ZIP.
- Audit maintenu dans le scope `TPL-01` :
  - aucune correction de schéma ;
  - aucune création d’API templates ;
  - aucune création d’UI templates ;
  - aucune extension vers `TPL-02` à `TPL-13`.

## Observations techniques importantes
- Le modèle `ShiftTemplate` est réel et utilisé par le planning, mais il reste centré sur une logique horaire + catégorie + rôle requis unique.
- L’autoschedule consomme les templates actifs et les transforme en `DraftShift`.
- Le publish recopie seulement `templateId` vers `Shift` ; il ne réinterprète pas une logique template avancée.
- L’assignation manuelle exploite seulement `template.category` pour déterminer 1 ou 2 slots utilisateurs.
- Le matching exploite seulement `template.requiredRole`, et uniquement pour proposer `userId`.
- Le produit expose le template dans le planning comme information de mission, pas comme objet administrable.
- Les scripts `create/list/disable` sont de l’outillage ponctuel :
  - `companyId` codé en dur ;
  - aucune intégration package.json ;
  - aucune entrée UI ;
  - présence d’un script correctif ciblant un cas de template corrompu.

## Conclusion de travail
L’état de départ du bloc A6 est **réel mais partiel** :
- base technique exploitable ;
- absence de module métier autonome conforme au cadrage module 09.
