# Ambulance Manager

Ambulance Manager est une application SaaS métier pour société de transport sanitaire.
Le projet est en préparation de reprise du code en **Phase 6**.

## Point d'entrée documentaire

Documents actifs principaux :
- `docs/1-MASTER/_INDEX_MASTER.md`
- `docs/1-MASTER/DOCUMENT_MAITRE_V2.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL_V2.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md`
- `docs/1-MASTER/REGISTRE_DECISIONS_V2.md`

Documents actifs temporaires utiles avant Phase 6 :
- `docs/1-MASTER/ETAT_GLOBAL_PROJET_V2.md`
- `docs/1-MASTER/AUDIT_CODE_EXISTANT_ALPHA_V2.md`

## Gouvernance des sessions

- Document actif de gouvernance des sessions : `docs/2-SESSIONS/README_SESSIONS.md`.
- Modèle de session : `docs/2-SESSIONS/SESSION-YYYYMMDD-XX`.
- Les anciens documents concurrents de sessions sont archivés dans `docs/4-ARCHIVES/2-SESSIONS_HISTORIQUE/`.

## Règle courte de reprise

Avant toute session de code :
- lire au minimum les documents actifs nécessaires au lot traité ;
- suivre `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md` ;
- respecter `docs/2-SESSIONS/README_SESSIONS.md` pour l'ouverture et la clôture des sessions ;
- ne pas modifier la documentation MASTER sans décision explicite.

## Démarrage local

```bash
npm install
npm run dev
```

Stack principale : Next.js, React, Prisma, TypeScript.
