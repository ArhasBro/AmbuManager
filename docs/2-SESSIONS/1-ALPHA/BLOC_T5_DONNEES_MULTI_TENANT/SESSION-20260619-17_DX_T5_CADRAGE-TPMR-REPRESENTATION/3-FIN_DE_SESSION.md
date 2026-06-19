# 3 - Fin de session

## 1. Resume court

`TPMR` n est pas encore modele dans le schema ni dans le code, mais les fiches fonctionnelles montrent un besoin croise : la page Vehicules laisse entendre qu un type principal `TPMR` peut exister, tandis que le Planning demande explicitement de distinguer `TPMR VSL` et `TPMR TAXI`. Le modele actuel reste limite a `AMBULANCE`, `VSL` et `TAXI`, donc une decision Prisma unique et simpliste serait insuffisante.

## 2. Objectif traite

Oui. L objectif unique etait de cadrer la representation metier et technique de `TPMR` / `TPMR VSL` / `TPMR TAXI` avant toute creation Prisma, en comparant les options possibles, leurs impacts et les questions d arbitrage necessaires.

## 3. Livrable produit

- Cadrage comparatif des options A a E.
- Impacts separes sur `P-VEHICULES` et `P-PLANNING`.
- Impacts Prisma futurs, API futures, UI futures, regles metier, seed et imports.
- Risques, dependances, questions d arbitrage, informations non fournies et recommendation preparatoire non appliquee.

## 4. Options de representation TPMR

| Option | Lecture | Avantages | Limites / risques | Statut |
| --- | --- | --- | --- | --- |
| A | `TPMR` comme type de vehicule separe. | Lisibilite forte dans la flotte. | N exprime pas a lui seul la distinction `TPMR VSL` / `TPMR TAXI` et force de nombreux ajustements partout. | NON RETENUE SEULE |
| B | `TPMR` comme capacite ou attribut d un vehicule existant. | Peut limiter l extension des enums existants. | Peut cacher le sens metier principal si le type doit rester visible; risque de regler le sujet via un simple flag alors que le besoin est plus riche. | PARTIELLE |
| C | `TPMR VSL` et `TPMR TAXI` comme sous-types ou variantes metier. | Colle le mieux aux fiches fonctionnelles et au besoin de distinction planning. | Demande un vrai modele de variante et la propagation UI / API / matching / seed / import. | CANDIDAT PRINCIPAL |
| D | `TPMR` comme activite ou contrainte de planning independante du vehicule. | Bon fit si le besoin est d abord un besoin de planning. | Ne couvre pas proprement la page Vehicules ni le referentiel flotte; risque de dissocier trop fortement les regles. | NON RETENUE SEULE |
| E | Representation hybride. | Couvre vehicule, planning, compatibilites et regles sans surcharger un seul champ. | Plus couteux a cadrer; demande une decision humaine claire sur le role de chaque couche. | RECOMMANDATION PREPARATOIRE |

Lecture de synthese :

- A seul est trop pauvre si la distinction planning doit rester visible.
- B seul est trop abstrait si le type principal doit rester lisible en flotte.
- C est la forme la plus naturelle pour exprimer `TPMR VSL` et `TPMR TAXI`.
- D seul ne couvre pas la page Vehicules.
- E est le plus coherent pour un besoin qui touche a la fois referentiel vehicules, planning, matching et regles.

## 5. Impacts P-VEHICULES

- Les listes et formulaires actuels n exposent que `AMBULANCE`, `VSL`, `TAXI`.
- Les badges, filtres, labels, capacity hints et imports vehicules devront changer si `TPMR` entre dans le referentiel flotte.
- Si le type principal reste `TPMR`, la page Vehicules devra afficher la variante ou la compatibilite sans perdre le type principal.
- Si `TPMR` reste un attribut, il faudra un champ de compatibilite ou de capacite explicite, pas un simple libelle decoratif.
- Les seeds de vehicules devront suivre la representation retenue pour eviter un decalage entre demarrage et UI.

## 6. Impacts P-PLANNING

- Le Planning compare aujourd hui un `requiredVehicleType` a `vehicle.type` avec des enums fixes.
- Les vues, templates, autoschedule et validation de publication devront comprendre `TPMR VSL` et `TPMR TAXI` si la distinction doit etre preservee.
- Les options de creation / edition de templates et les regles de matching devront evoluer si `TPMR` devient un besoin de planning.
- Si `TPMR` est une activite ou une contrainte, le Planning aura besoin d un champ ou d une relation dediee au lieu de reutiliser seulement `requiredVehicleType`.
- Les compatibilites role / activite / vehicule ne peuvent pas rester implicites si `TPMR` doit etre filtre ou bloque correctement.

## 7. Impacts Prisma futurs

- `VehicleType` et `PlanningTemplateCategory` ne contiennent pas `TPMR`.
- Le schema doit trancher entre extension d enum, ajout d un champ variante, table de compatibilite, ou stockage via une structure de regles.
- `Vehicle`, `ShiftTemplate`, `DraftShift`, `Shift` et possiblement `CompanyRule` sont les surfaces candidatees a verifier avant toute creation.
- Un schema purement enum ne suffira pas si le besoin est de separer type principal, variante et contrainte de planning.

## 8. Impacts API / UI futurs

- Les options hard-codees dans `app/vehicles/vehicles-client.tsx` et `app/templates/templates-client.tsx` devront etre alignees avec la nouvelle representation.
- Les routes planning qui publient ou assignent un shift comparent deja les types de vehicule de facon stricte; elles devront prendre en compte la variante ou la compatibilite choisie.
- Les validations de formulaire suivent le schema, mais les listes de valeurs visibles resteront a mettre a jour manuellement.
- Les imports et les seeds devront accepter la nouvelle forme de donnee pour eviter une incoherence entre donnees de demo et donnees reelles.

## 9. Risques et dependances

- Risque de changer un seul champ et de casser la coherence entre Vehicules, Templates et Planning.
- Risque de reduire `TPMR` a un simple label alors que les fiches fonctionnelles le font porter a plusieurs niveaux.
- Risque de dupliquer la logique de compatibilite entre UI, API et matching.
- Dependances : decision humaine sur la semantique de `TPMR`, lecture de `DX_T5_AUDIT-COMPANYID-SURFACES` pour le tenant, puis eventuellement blocs `P-VEHICULES` et `P-PLANNING` pour implementation.
- Dependances : seed et import a synchroniser avec le schema retenu.

## 10. Questions d arbitrage

### P0 - bloquant avant toute creation Prisma

- `TPMR` designe-t-il un type de vehicule, une capacite, une activite, une prestation ou une contrainte de planning ? `INFORMATION NON FOURNIE - A CONFIRMER`
- `TPMR VSL` et `TPMR TAXI` doivent-ils etre deux types distincts ou `TPMR` + categorie existante ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Le planning doit-il planifier une mission `TPMR` independamment du vehicule ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Les compatibilites role / activite / vehicule doivent-elles integrer `TPMR` ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Les regles societe doivent-elles autoriser ou bloquer les affectations `TPMR` ? `INFORMATION NON FOURNIE - A CONFIRMER`

### P1 - important avant implementation

- Les imports et les seeds doivent-ils porter la nouvelle representation des maintenant ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Une decision Prisma est-elle necessaire avant `P-VEHICULES` et `P-PLANNING` ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Quelles corrections futures relevent de T5, de `P-VEHICULES`, de `P-PLANNING` ou d un autre bloc ? `INFORMATION NON FOURNIE - A CONFIRMER`

## 11. Informations non fournies

- Semantique exacte de `TPMR`.
- Niveau d abstraction attendu entre type principal, variante et compatibilite.
- Choix entre type, attribut, activite ou hybride.
- Niveau de persistance attendu pour la representation dans les imports et les seeds.
- Besoin d une regle societe dediee pour TPMR.

## 12. Points de vigilance

- Aucun `TPMR` dans le schema ou le code lu.
- Les enums planning et vehicule actuels ne couvrent que les types existants.
- Les templates et les routes planning comparent les types de facon stricte.
- Les regles metier VSL / TAXI existent, mais aucune regle TPMR dediee n a ete trouvee.
- Un changement partiel dans une seule couche serait plus risquee qu une representation hybride bien arbitree.

## 13. Recommendation preparatoire

La direction preparatoire la plus robuste est `E`, avec une forme de variante explicite de type `C` si l humain confirme que `TPMR VSL` / `TPMR TAXI` doivent rester lisibles comme variantes a part entiere. Cette recommandation n est pas appliquee ici; elle sert seulement de base de decision.

## 14. Verdict final

VALIDABLE SOUS RESERVE

SESSION DX_T5_CADRAGE-TPMR-REPRESENTATION TERMINEE - EN ATTENTE CONTROLE GPT
