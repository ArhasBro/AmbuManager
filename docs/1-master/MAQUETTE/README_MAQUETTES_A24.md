# README — Maquettes officielles A24

Projet : Investissement  
Sous-projet : Ambulance Manager  
Bloc concerné : A24 — Réalignement UI/UX sur maquettes validées  
Statut : Référence visuelle officielle pour A24  
Version : V1.0  
Date : 04/05/2026  

---

# 1. Objet du dossier

Ce dossier contient les références visuelles officielles à utiliser pour le bloc :

`A24 — Réalignement UI/UX sur maquettes validées`

Le bloc A24 a pour objectif de réaligner l’application intégrée Ambulance Manager sur les maquettes validées.

Les maquettes ne sont pas une inspiration.

Elles constituent la cible visuelle officielle à reproduire au plus près, page par page, sans introduire de nouvelle direction artistique.

---

# 2. Règle prioritaire

Pour toute session A24, l’ordre de priorité des sources est le suivant :

1. Maquettes PNG validées présentes dans ce dossier ;
2. Spécification UI/UX codable ;
3. Mapping des icônes ;
4. Liste des icônes exportées ;
5. Captures réelles de l’application produites en session ;
6. Documentation A21/A22/A23 uniquement comme contexte ;
7. Récit ou commentaire de production uniquement en dernier niveau de priorité.

En cas de contradiction :

`MAQUETTE PNG > SPEC UI/UX > ICONES > CAPTURE RÉELLE > DOCUMENTATION > RÉCIT`

Toute information non prouvée doit être notée exactement :

`INFORMATION NON FOURNIE — À CONFIRMER`

---

# 3. Maquettes officielles attendues

Les maquettes suivantes constituent le socle visuel validé pour A24 :

| Page | Route probable | Maquette officielle |
|---|---|---|
| Login | `/login` | `Login_V1.1.png` |
| Dashboard | `/dashboard` | `Dashboard_V1.png` |
| Planning | `/planning` | `Planning_V1.2.png` |
| Utilisateurs / RH | `/users` | `Utilisateurs-RH_V1.png` |
| Véhicules | `/vehicles` | `Véhicules_V1.2.png` |
| Templates | `/templates` | `Templates_V1.1.png` |
| Société | `/company` | `Société_V1.0.png` |
| Dépôts / bases | `/depots` | `Dépôts-bases_V1.0.png` |
| Onboarding | `/onboarding` | `Onboarding_V1.2.png` |
| Audit | `/audit` | `Audit_V1.0.png` |
| Mentions d’information / Privacy | `/privacy` | `Privacy_V1.0.png` |

---

# 4. Fichiers de spécification associés

Le dossier doit également contenir :

```txt
SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md
```

Ce fichier décrit :

- la direction artistique globale ;
- le layout applicatif commun ;
- la palette approximative ;
- la typographie ;
- les composants transversaux ;
- l’analyse page par page ;
- les règles codables ;
- les limites du format PNG ;
- les recommandations d’intégration React ;
- le complément V1.1 sur les icônes.

Ce fichier doit être lu avant toute correction A24.

---

# 5. Dossier icônes

Les icônes extraites des maquettes sont stockées dans :

```txt
ICONES/
```

Structure recommandée :

```txt
ICONES/
├── CONTACT_SHEET_ICONES_V1_1.png
├── LISTE_ICONES_EXPORTEES_V1_1.md
├── TABLE_MAPPING_ICONES_V1_1.csv
└── ICONES_MAQUETTES_V1_1/
    ├── icon_login_brand_ambulance.png
    ├── icon_sidebar_dashboard.png
    ├── icon_kpi_users_active.png
    └── ...
```

## 5.1 Règle d’usage des icônes

Les PNG d’icônes servent principalement de référence visuelle.

Ils ne doivent pas tous être intégrés directement dans le code.

Règle d’intégration :

- utiliser Lucide React ou une librairie équivalente pour les icônes génériques ;
- conserver en asset PNG/SVG uniquement les logos ou pictogrammes réellement spécifiques à Ambulance Manager ;
- ne pas importer automatiquement tous les crops PNG dans `public/` ou dans le code ;
- ne pas inventer une nouvelle iconographie ;
- respecter les tailles, couleurs, épaisseurs et usages décrits dans la spec.

## 5.2 Assets PNG à conserver prioritairement

Les assets suivants peuvent être conservés comme références spécifiques ou assets de marque :

```txt
icon_login_brand_ambulance.png
icon_login_card_ambulance.png
icon_sidebar_logo_ambulance.png
```

Tous les autres pictogrammes doivent être analysés au cas par cas et, sauf justification, recréés avec Lucide React selon le mapping fourni.

---

# 6. Règles fondamentales A24

Chaque session A24 doit respecter les règles suivantes :

- les maquettes validées sont la référence visuelle officielle ;
- aucune nouvelle direction artistique n’est autorisée ;
- ne pas transformer l’application en UI générique Tailwind/shadcn ;
- ne pas modifier inutilement la logique métier ;
- ne pas toucher au backend, Prisma, migrations, RBAC ou API sauf nécessité strictement démontrée ;
- ne pas mélanger refonte UI et correction fonctionnelle métier ;
- ne pas traiter toutes les pages en une seule session si le périmètre est trop large ;
- travailler par page ou par lot cohérent ;
- produire des captures après correction ;
- comparer systématiquement les captures après correction aux maquettes ;
- ne jamais déclarer conforme une page qui reste visiblement éloignée de la maquette.

---

# 7. Critères de conformité visuelle

Une page peut être considérée comme conforme uniquement si elle respecte au minimum :

- la structure générale de la maquette ;
- la présence et la cohérence de la sidebar si applicable ;
- la présence et la cohérence de la topbar si applicable ;
- la hiérarchie des titres et sous-titres ;
- les cartes principales ;
- les tableaux ;
- les filtres ;
- les boutons ;
- les badges ;
- les panneaux droits / drawers quand ils existent dans la maquette ;
- la densité visuelle ;
- les espacements ;
- les couleurs ;
- la typographie ;
- les icônes ;
- l’ambiance globale SaaS métier santé / ambulancier ;
- l’absence de debug, placeholders techniques ou éléments non maquette visibles.

Le pixel-perfect absolu n’est pas obligatoire sauf demande explicite.

En revanche, une page ne peut pas être validée si :

- la structure principale est différente ;
- le panneau droit attendu est absent ;
- la page est beaucoup plus dense que la maquette ;
- les blocs principaux ne sont pas au bon endroit ;
- le rendu ressemble à une page CRUD brute ;
- la maquette semble seulement “inspirer” l’écran au lieu d’être réellement reproduite.

---

# 8. Statuts de contrôle visuel

Pour chaque page contrôlée, utiliser uniquement les statuts suivants :

```txt
CONFORME
PARTIEL
NON CONFORME
INFORMATION NON FOURNIE — À CONFIRMER
```

Définition :

- `CONFORME` : la page est visuellement proche de la maquette et respecte la structure principale.
- `PARTIEL` : la page reprend une partie de la direction artistique, mais conserve des écarts visibles.
- `NON CONFORME` : la page est fonctionnelle mais visuellement éloignée de la maquette.
- `INFORMATION NON FOURNIE — À CONFIRMER` : preuve absente, capture manquante ou comparaison impossible.

---

# 9. Captures réelles de l’application

Les captures réelles ne doivent pas être stockées directement dans ce dossier master sauf décision explicite.

Elles doivent être produites dans les dossiers de session, par exemple :

```txt
docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-.../CAPTURES_AVANT/
docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-.../CAPTURES_APRES/
```

Chaque session A24 doit produire les captures nécessaires à son périmètre.

Les captures après correction doivent être comparées aux maquettes officielles de ce dossier.

---

# 10. Organisation recommandée du bloc A24

Le bloc A24 doit être traité progressivement.

Découpage recommandé :

```txt
A24-01 — AUDIT global UI/UX
A24-LOT-02 — Shell + Dashboard
A24-LOT-03 — Pages référentielles simples
A24-LOT-04 — Users / RH
A24-LOT-05 — Planning
A24-LOT-06 — Audit / Onboarding / Privacy
A24-VALIDATION — Validation globale UI/UX
CLOTURE_A24 — Clôture finale du bloc UI/UX
```

Objectif :

- éviter une correction massive incontrôlable ;
- limiter les régressions ;
- comparer page par page ;
- obtenir progressivement une majorité de pages `CONFORME`.

---

# 11. Règles pour Codex

Dans chaque session A24, Codex doit recevoir au minimum :

- la maquette validée de la page ou du lot concerné ;
- la capture réelle actuelle ;
- la spec UI/UX ;
- le mapping des icônes si la session touche aux icônes ;
- les écarts déjà constatés ;
- les critères de validation visuelle.

Codex doit obligatoirement :

- lire la maquette concernée ;
- comparer l’écran réel à la maquette ;
- lister les écarts ;
- corriger uniquement le périmètre demandé ;
- produire un patch ;
- lancer les validations terminales demandées ;
- produire des captures après correction ;
- documenter les écarts corrigés et les écarts restants.

Codex ne doit pas :

- proposer une nouvelle DA ;
- remplacer la structure maquette par une structure personnelle ;
- modifier le backend sans nécessité ;
- déplacer le problème vers une future session sans justification ;
- déclarer conforme uniquement parce que la page est fonctionnelle.

---

# 12. Rappel A23 / A24

Le bloc A23 est dédié à la stabilisation post-test manuel ADMIN.

Il peut accepter des pages fonctionnelles mais visuellement seulement `PARTIEL` ou `NON CONFORME`, si ces écarts sont clairement reportés à A24.

Le bloc A24 est dédié au réalignement UI/UX strict.

Donc :

```txt
A23 = retestable / présentable / fonctionnel
A24 = conforme aux maquettes
```

Les écarts visuels constatés en A23 doivent alimenter A24.

---

# 13. Retour manuel utilisateur avant A24

Constat manuel utilisateur à conserver comme entrée A24 :

```txt
/login : OK
/dashboard : KO VISUEL — fonctionnel
/users : PARTIEL VISUEL — fonctionnel
/vehicles : PARTIEL VISUEL — fonctionnel
/templates : PARTIEL VISUEL — fonctionnel
/company : PARTIEL VISUEL — fonctionnel
/depots : PARTIEL VISUEL — fonctionnel
/planning : KO VISUEL — fonctionnel
/audit : PARTIEL VISUEL — fonctionnel
/onboarding : KO VISUEL — fonctionnel
/privacy : PARTIEL VISUEL — fonctionnel
```

Ce constat ne signifie pas que les pages sont cassées.

Il signifie que leur rendu ne correspond pas encore suffisamment aux maquettes validées.

---

# 14. Arborescence recommandée du dossier

Arborescence cible :

```txt
docs/1-master/MAQUETTE/
├── README_MAQUETTES_A24.md
├── SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md
├── Dashboard_V1.png
├── Planning_V1.2.png
├── Utilisateurs-RH_V1.png
├── Véhicules_V1.2.png
├── Templates_V1.1.png
├── Société_V1.0.png
├── Dépôts-bases_V1.0.png
├── Onboarding_V1.2.png
├── Audit_V1.0.png
├── Login_V1.1.png
├── Privacy_V1.0.png
└── ICONES/
    ├── CONTACT_SHEET_ICONES_V1_1.png
    ├── LISTE_ICONES_EXPORTEES_V1_1.md
    ├── TABLE_MAPPING_ICONES_V1_1.csv
    └── ICONES_MAQUETTES_V1_1/
        ├── icon_login_brand_ambulance.png
        ├── icon_login_card_ambulance.png
        ├── icon_sidebar_logo_ambulance.png
        └── ...
```

Si les maquettes sont réparties en sous-dossiers historiques, conserver les sous-dossiers existants, mais maintenir ce README comme point d’entrée officiel.

---

# 15. Règle de versioning

Si une nouvelle version de maquette est ajoutée, elle doit avoir un nom explicite :

```txt
NomPage_V1.0.png
NomPage_V1.1.png
NomPage_V1.2.png
```

La version la plus élevée est considérée comme la référence active, sauf décision contraire documentée.

Toute ancienne version doit rester archivée uniquement si elle est utile à l’historique.

Ne jamais remplacer silencieusement une maquette validée sans mettre à jour ce README.

---

# 16. Décision finale

Ce dossier devient la référence officielle pour préparer et exécuter le bloc A24.

Toute session A24 doit s’appuyer sur ce dossier avant de produire un audit, une correction, une validation ou une clôture.

Verdict documentaire :

```txt
RÉFÉRENCE UI/UX A24 INITIALISÉE : OUI
```
