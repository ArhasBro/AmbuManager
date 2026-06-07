# Ambulance Manager — DOCUMENT_MAITRE_V2

Version : V2.0.1  
Date : 07/06/2026

## 1. Vision du projet

Ambulance Manager est un SaaS métier de gestion opérationnelle pour sociétés de transport sanitaire.

Le produit est en reprise méthodologique et n'est pas présenté comme terminé.

## 2. Statut actuel du projet

Le projet ne repart pas de zéro techniquement.  
Le projet repart de zéro méthodologiquement.

La base documentaire MASTER V2 constitue la base opérationnelle de lancement de la Phase 6.

## 3. Références actives du projet

Documents MASTER V2 actifs pour la reprise Phase 6 :
- `docs/1-MASTER/DOCUMENT_MAITRE_V2.md` ;
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL_V2.md` ;
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md` ;
- `docs/1-MASTER/ETAT_GLOBAL_PROJET_V2.md` ;
- `docs/1-MASTER/REGISTRE_DECISIONS_V2.md` ;
- `docs/1-MASTER/AUDIT_COMPARAISON_BASE44_OFFICIEL_V1.md` ;
- `docs/1-MASTER/3-FONCTIONNALITES/`.

Document contextuel / mémoriel (non normatif) :
- `docs/1-MASTER/RECAP_DISCUSSIONS_V2.md` ;
- utile pour le contexte ;
- non source de vérité principale en cas de contradiction.

Les versions sans suffixe V2 sont historiques, archivées et non prioritaires.

Référence Base44 :
- `docs/4-ARCHIVES/BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md` ;
- statut : prototype fonctionnel, visuel et métier clôturable côté Base44 ;
- usage : référence de comparaison et d'inspiration contrôlée ;
- limite : non source technique finale et non copiable directement.

## 4. Rôle des fiches fonctionnalités

Les fiches de `docs/1-MASTER/3-FONCTIONNALITES/` restent actives.

Elles constituent la référence détaillée de cadrage fonctionnel cible page par page.

Leur présence ne signifie pas que les pages correspondantes sont déjà validées, finalisées ou codées.

## 5. Statut des pages

- Login : non validée à ce stade, à auditer, cadrer, confirmer puis valider explicitement.
- Toutes les autres pages : à auditer, à cadrer, à confirmer ou à compléter, avec décisions partielles existantes.
- Planning : non validé, en cours de cadrage et à auditer.

## 6. Terminologie active

- `Modèles horaires` (au lieu de `Templates`).
- `Mise en route` (au lieu de `Onboarding`, hors mention historique/technique explicite).

## 7. Méthode de reprise

Ordre méthodologique :
1. Stabiliser la documentation V2.
2. Intégrer le cadrage Base44 dans les documents MASTER via le bloc `DEV-B44-00`.
3. Valider `DEV-B44-00-03` puis `CLOTURE_DEV-B44-00` avant toute reprise code inspirée de Base44.
4. Cadrer puis auditer les toutes les pages.
5. Finaliser les maquettes.
6. Produire des références UI/UX propres.
7. Reprendre le codage.

## 7.1 Rôle de Base44 dans la reprise

Base44 sert uniquement de prototype de référence fonctionnelle, visuelle et métier.

Le repo officiel reste la source technique finale : stack Next.js, Prisma, PostgreSQL, RBAC serveur, documentation V2 et validations humaines.

Toute idée issue de Base44 doit être adaptée au modèle officiel, reliée à l'audit validé et traitée dans une session Codex dédiée. Le code Base44 ne doit pas être copié directement.

## 8. Règles documentaires

- ne pas mélanger historique et actif ;
- conserver UTF-8 sans BOM ;
- préserver les accents français ;
- éviter les refontes massives non contrôlées ;
- marquer toute incertitude : `INFORMATION NON FOURNIE — À CONFIRMER`.
