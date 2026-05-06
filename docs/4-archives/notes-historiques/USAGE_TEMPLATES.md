# Guide d’usage ALPHA — Templates de shifts

## Objectif

Le module **Templates** sert à préparer des modèles de shifts réutilisables pour le planning :
- créer un template ;
- définir sa catégorie ;
- préciser le véhicule requis ;
- configurer les rôles attendus ;
- définir ou non des horaires ;
- activer, désactiver, modifier ou archiver le template.

## Pré-requis

- être connecté ;
- disposer d’un compte autorisé à gérer les templates.

## Accéder au module

1. Ouvrir `/templates`.
2. La page charge les templates de la société courante.

## Ce qui est réellement disponible

### 1. Créer un template

Le formulaire **Créer un template** permet de définir :
- `Nom` ;
- `Catégorie` ;
- `Véhicule requis` ou aucun ;
- `Personnes requises` (1 ou 2) ;
- `Couleur` ;
- `Rôle obligatoire slot 1` ;
- `Rôles autorisés pour les autres slots` ;
- `Statut` actif / inactif ;
- `Horaire défini` ou template non horodaté ;
- `Début`, `Fin`, `Crosses midnight` si l’horaire est défini.

Les presets de catégorie pré-remplissent une base courante, puis restent ajustables.

### 2. Modifier un template

La fiche d’un template existant permet :
- modification des champs métier ;
- activation / désactivation ;
- archivage logique.

### 3. Afficher les archivés

La case **Afficher les archivés** rend visibles les templates archivés pour contrôle.

## Règles métier réellement visibles

- la société du template vient de la session serveur ;
- les routes refusent une structure incohérente (`VALIDATION_ERROR`) ;
- `minStaffCount` est borné au périmètre ALPHA actuel (1 ou 2) ;
- si `isTimeDefined=false`, les horaires doivent rester nuls et `crossesMidnight=false` ;
- les couleurs attendues sont au format `#RGB` ou `#RRGGBB`.

## Lien avec le planning

- le planning manuel utilise les templates actifs pour créer un shift publié ;
- l’autoschedule exploite les templates disponibles pour générer des brouillons ;
- certaines contraintes de rôle ou de véhicule proviennent directement des templates.

## Points de contrôle utiles

- un template archivé ne doit plus apparaître dans l’affichage standard non archivé ;
- la création et l’édition doivent rester cloisonnées à la société courante ;
- un template non horodaté ne doit pas conserver d’horaires parasites.

## Limites honnêtes à connaître

- le module reste un socle ALPHA ;
- il n’existe pas encore de bibliothèque de templates multi-sociétés ;
- seules les règles réellement branchées dans le dépôt courant sont décrites ici.
