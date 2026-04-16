# NOTES

Notes de travail de la session.

---

## Méthode / observations

1. Relecture des masters et du protocole pour verrouiller le scope A10 sur `MATCH-LOT-02-09` uniquement.
2. Relecture des constats prouvés de `MATCH-01` pour partir des écarts réels déjà établis.
3. Inspection ciblée du code matching, sans dérive vers A9, A11 ou clôture A10.
4. Implémentation d’un correctif minimal dans le service, les routes et la UI.
5. Génération d’un patch principal unique.
6. Production d’un correctif minimal séparé `FIX-01` pour corriger la cohérence de variante run et réaligner le libellé réel de `VARIANT_2`.
7. Validation terminale réelle du patch principal puis du correctif minimal sur environnement utilisateur validé.

## Observations factuelles principales

### 1) Variantes simples ajoutées sans refonte globale
Le moteur ne produisait auparavant qu’un seul plan.

Le service expose désormais 3 variantes simples déterministes :
- `VARIANT_1` : ordre chronologique + priorité à la charge la plus faible ;
- `VARIANT_2` : ordre chronologique + priorité à un ordre stable par identifiant des ressources compatibles ;
- `VARIANT_3` : ordre chronologique inversé + maintien de l’équilibre de charge.

Ces variantes sont portées :
- par `matching.service.ts` ;
- par la route preview ;
- par la route apply ;
- par la UI `/planning`.

### 2) Score qualité par shift matérialisé
`matching-quality.ts` calcule désormais une collection `shiftScores` avec, pour chaque shift :
- score global du shift ;
- couverture employés ;
- couverture véhicules ;
- stabilité locale ;
- `countsByReason` ;
- `blockingReasons` ;
- `explanations`.

### 3) Score matching du run rendu lisible hors preview immédiat
`GET /api/planning/autoschedule/runs/[id]` expose maintenant :
- `matching.variant`
- `matching.quality`

Après `FIX-01`, la variante du run n’est plus recalculée en dur avec `MATCHING_VARIANTS[0]`, mais relue depuis la dernière variante appliquée prouvable dans l’audit existant, avec fallback strict `VARIANT_1` si aucune preuve exploitable n’est disponible.

### 4) UI réalignée sans refonte
`planning-client.tsx` a été complété pour :
- choisir une variante de matching ;
- demander cette variante au preview ;
- imposer la même variante à l’apply ;
- afficher le score matching du run ;
- afficher le score qualité du preview avec la variante utilisée ;
- afficher un score par shift dans le tableau détaillé.

### 5) Contraintes métier conservées
La correction n’a pas retiré les contrôles déjà présents sur :
- la composition minimale d’équipe ;
- les rôles requis / autorisés ;
- les véhicules requis ;
- les indisponibilités ;
- le repos minimum ;
- l’équilibrage de charge ;
- le bornage `companyId`.

### 6) Aucune migration Prisma strictement nécessaire
Aucune donnée persistée supplémentaire n’a été imposée.

Le score run est recalculé à la lecture du run, ce qui permet de rester dans le périmètre minimal sans modification du schéma Prisma.

### 7) Validation finale prouvée
L’état final retenu pour la session est celui du patch principal complété par `FIX-01`, avec validations terminales réelles toutes en `OK`.
