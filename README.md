# Ambulance Manager

Ambulance Manager est un SaaS ALPHA de gestion opérationnelle pour société de transport sanitaire.
Le dépôt courant couvre surtout les modules suivants :
- utilisateurs
- véhicules
- templates de shifts
- planning manuel
- autoschedule / matching
- audit et exports planning

## État du dépôt

- **maturité ciblée** : `1-ALPHA`
- **base produit officielle** : `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- **pilotage projet** : `docs/1-master/*`
- **historique des sessions** : `docs/2-sessions/*`
- **patchs officiels** : `docs/3-patches/*`

Le `README.md` racine sert d’entrée rapide au dépôt. La documentation d’usage produit est fournie séparément dans `docs/`.

## Documentation utile

### Guides d’usage ALPHA
- `docs/USAGE_USERS.md`
- `docs/USAGE_VEHICLES.md`
- `docs/USAGE_TEMPLATES.md`
- `docs/USAGE_PLANNING_AUTOSCHEDULE.md`
- `docs/SCENARIOS_MANUELS_ALPHA.md`
- `docs/QUALITY_TESTS.md`

### Gouvernance / référence
- `docs/README.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`

## Mise en route locale

```bash
npm install
npm run dev
```

L’application utilise Next.js, Prisma et NextAuth.
Selon le contexte local, une base PostgreSQL et des variables d’environnement peuvent être nécessaires pour les routes authentifiées et les flux Prisma.

## Commandes qualité utiles

```bash
npm run lint
npm run build
npm run test:smoke
npm run test:targeted
npm run test:quality
```

Les scripts `test:smoke` et `test:targeted` sont volontairement légers :
- smoke tests contractuels sur routes API critiques ;
- tests automatisés ciblés sur blocs stables et sensibles.

## Périmètre ALPHA important

- la documentation d’usage produit ne remplace pas la documentation de gouvernance ;
- les comptes support globaux ne doivent pas être exposés dans les flux client standards ;
- la gestion véhicule courante repose sur **l’archivage logique**, pas sur une suppression destructrice depuis l’UI standard.
