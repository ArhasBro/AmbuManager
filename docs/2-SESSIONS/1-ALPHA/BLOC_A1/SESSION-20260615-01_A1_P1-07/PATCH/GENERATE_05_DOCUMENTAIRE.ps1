$ErrorActionPreference = "Stop"

$target = "docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md"

function New-DefaultSessions {
    param([string]$Id, [string]$AuditText = "Comparer le repo officiel, Base44 et la documentation de référence afin de confirmer l'existant, les écarts et les sessions de production nécessaires.", [string]$CadrageText = "Valider le découpage réel du bloc après audit ciblé.")

    return @"
* $Id-01 — AUDIT ciblé — $AuditText
* $Id-02 — CADRAGE — $CadrageText
* Sessions de production suivantes : INFORMATION NON FOURNIE — À CONFIRMER après audit ciblé.
* CLOTURE_$Id — VALIDATION — Clôture finale du bloc après réalisation et contrôle des sessions confirmées.
"@
}

function New-Block {
    param(
        [string]$Id,
        [string]$Name,
        [string]$Objective,
        [string]$Why,
        [string]$Scope,
        [string]$Exclusions,
        [string]$Deliverables,
        [string]$Controls,
        [string]$Validation,
        [string]$Docs,
        [string]$Status = "À faire",
        [string]$Sessions = ""
    )

    if ([string]::IsNullOrWhiteSpace($Sessions)) {
        $Sessions = New-DefaultSessions -Id $Id
    }

    return @"
### BLOC $Id — $Name

#### Objectif du bloc

$Objective

#### Pourquoi ce bloc existe

$Why

#### Périmètre

$Scope

#### Exclusions

$Exclusions

#### Sessions prévues

$Sessions

#### Livrables attendus

$Deliverables

#### Contrôles obligatoires

$Controls

#### Critère de validation du bloc

$Validation

#### Documentation à mettre à jour si nécessaire

$Docs

#### Statut

$Status
"@
}

$blocksTransverse = @(
    @{Id="T0";Name="Gouvernance P1";Objective="Maintenir la gouvernance de reprise P1, le plan court et la déclinaison opérationnelle sans créer de plan parallèle.";Why="P1-02 à P1-06 ont posé la base de reprise. T0 vérifie que ces décisions restent cohérentes avant les sessions opérationnelles.";Scope="Cohérence documentaire P1, règles de session, preuves, statuts, ordre de reprise et maintenance des fichiers `04` et `05`.";Exclusions="Code applicatif, Base44 modifié, renommages, migrations, reprise fonctionnelle page par page.";Deliverables="Synthèse de cohérence P1, écarts éventuels, décisions restantes et statuts des documents de pilotage.";Controls="Git status initial/final, diff documentaire ciblé si modification, absence de modification code/Base44, UTF-8 sans BOM, absence de mojibake.";Validation="La gouvernance P1 est cohérente, lisible et exploitable pour lancer les blocs suivants.";Docs="`04-PLAN_DE_DEVELOPPEMENT.md`, `05-BLOCS_SESSIONS_PRODUCTION.md`, sessions P1 concernées."}
    @{Id="T2";Name="Nomenclature, routes et renommages futurs";Objective="Cadrer les routes techniques, les libellés UI et les renommages futurs sans les exécuter par défaut.";Why="P1-03 valide les routes techniques anglaises et les libellés UI français, tout en reportant certains renommages techniques.";Scope="Routes, libellés, conventions de nommage, impacts futurs de `templates` vers `modeles-horaires` et `onboarding` vers `mise-en-route`.";Exclusions="Renommage effectif, modification de code, migration de routes ou refonte navigation.";Deliverables="Matrice routes/libellés, liste des renommages possibles, impacts et arbitrages à confirmer.";Controls="Recherche routes repo, comparaison Base44 lecture seule, absence de renommage, absence modification code si session documentaire.";Validation="Chaque route ou libellé litigieux a un statut clair : conservé, à renommer plus tard ou à confirmer.";Docs="`04`, `05`, documentation de conventions, fiches de session du bloc."}
    @{Id="T1";Name="Shell global, navigation et contexte connecté";Objective="Stabiliser la structure connectée commune : sidebar, topbar, société courante, utilisateur courant, droits visibles et accès refusé.";Why="Le shell conditionne l'accès aux modules métier et doit être fiable avant les reprises page par page.";Scope="Navigation connectée, contexte société/utilisateur, filtrage visible par droits, états communs d'accès refusé.";Exclusions="Correction profonde des pages métier, RBAC complet, design system complet.";Deliverables="Cartographie shell/navigation, écarts priorisés, sessions de correction confirmées après audit.";Controls="Contrôle navigateur si UI modifiée, lint/build si code modifié, vérification liens, droits visibles et responsive.";Validation="Le shell permet d'accéder aux modules autorisés sans incohérence critique connue.";Docs="`05`, documentation UI/UX, preuves de session."}
    @{Id="T3";Name="Design system officiel et composants communs";Objective="Stabiliser les composants communs du repo officiel utiles aux pages Alpha.";Why="Les pages doivent partager des composants et états cohérents sans copier les composants Base44.";Scope="Boutons, cartes, badges, tableaux, filtres, formulaires, états vide/chargement/erreur, composants communs officiels.";Exclusions="Copie de code Base44, refonte visuelle globale, reprise fonctionnelle d'une page entière.";Deliverables="Inventaire composants/états, manques confirmés, sessions de complétion ou correction ciblées.";Controls="Lint/build si code modifié, contrôle visuel navigateur, contrôle responsive si composant UI touché.";Validation="Les composants nécessaires aux premières reprises sont identifiés, fiables ou reportés explicitement.";Docs="Référence UI/UX, `05`, sessions du bloc."}
    @{Id="T4";Name="RBAC UI/API et matrice permissions, en mode progressif";Objective="Poser une matrice RBAC progressive et vérifier les contrôles UI/API des actions sensibles.";Why="Le RBAC ne doit pas être traité comme un bloc monolithique finalisé d'un coup, mais aucun module sensible ne doit rester sans contrôle serveur/API.";Scope="Permissions minimales, filtrage UI, accès pages, endpoints, actions sensibles, tests de non-contournement.";Exclusions="Matrice V1 complète non arbitrée, permissions fines non décidées, refonte globale auth.";Deliverables="Matrice RBAC initiale, écarts UI/API, sessions ciblées par module ou action.";Controls="Tests rôles/endpoints si code modifié, lint/build, preuve de contrôle serveur/API, preuve multi-tenant si données société impliquées.";Validation="Le RBAC Alpha minimal est cadré et les écarts prioritaires sont traités ou reportés.";Docs="Matrice permissions, `05`, fiches de sessions concernées."}
    @{Id="T5";Name="Données, multi-tenant et mapping Base44 vers officiel";Objective="Comparer les entités Base44 utiles avec le modèle officiel et cadrer le multi-tenant avant toute modification de données.";Why="Le repo officiel reste la source technique finale. Les idées Base44 doivent être acceptées, adaptées ou refusées explicitement.";Scope="Entités, champs, `companyId`, cloisonnement société, écarts Prisma éventuels, besoins de sessions données futures.";Exclusions="Migration, génération Prisma, modification schema sans session dédiée, copie de modèle Base44.";Deliverables="Matrice entités/champs, décisions accepté/refusé/à confirmer, besoin éventuel de sessions Prisma.";Controls="Lecture Prisma si autorisée par session, Base44 lecture seule, absence migration, absence `prisma generate`, preuve multi-tenant.";Validation="Les données utiles au périmètre Alpha sont cadrées sans modification Prisma non autorisée.";Docs="`05`, documentation données, sessions futures Prisma si validées."}
    @{Id="T6";Name="Audit et traçabilité transverse";Objective="Définir les actions sensibles à tracer et le contrat minimal de traçabilité.";Why="Les actions sensibles doivent être traçables de manière cohérente sur les modules métier.";Scope="Acteur, société, cible, action, résultat, actions sensibles transverses, lien avec RBAC et modules métier.";Exclusions="Conformité RGPD complète, SIEM, politique de rétention finale non confirmée.";Deliverables="Cartographie actions/traces, contrat audit minimal, sessions de correction confirmées si nécessaire.";Controls="Tests ciblés si trace modifiée, preuve audit produite, lint/build si code modifié, cohérence RBAC.";Validation="Les actions sensibles prioritaires ont un contrat de trace ou un report explicite.";Docs="Documentation audit, `05`, fiches fonctionnelles concernées si nécessaire."}
    @{Id="T7";Name="Qualité, tests et contrôles de reprise";Objective="Définir les contrôles récurrents par type de session et les preuves minimales attendues.";Why="Les sessions futures doivent être contrôlables, comparables et clôturables sans validation implicite.";Scope="DoD par type de session, lint/build/tests, contrôle navigateur, encodage, périmètre Git, preuves.";Exclusions="Exécution de tous les tests hors contexte, refonte de la méthode globale sans décision.";Deliverables="Grille de contrôles par type de session, exceptions documentées, modèle de preuve réutilisable.";Controls="Git status, diff, encodage, absence mojibake, lint/build/tests selon type de modification.";Validation="Les futures sessions disposent d'un cadre de contrôle clair et applicable.";Docs="`03-METHODE_DE_TRAVAIL.md`, `05`, README sessions si changement validé."}
)

$followupSessions = @"
Sessions prévisionnelles à confirmer après audit ciblé.

* P-VEHICLE-FOLLOWUP-01 — AUDIT ciblé — Confirmer périmètre exact cible et existant réutilisable.
* P-VEHICLE-FOLLOWUP-02 — CADRAGE — Confirmer le statut hybride : route autonome, sous-module Véhicules ou intégration mixte.
* P-VEHICLE-FOLLOWUP-03 — COMPLÉTION prévisionnelle — Structurer la vue d'ensemble côté UI/navigation.
* P-VEHICLE-FOLLOWUP-04 — COMPLÉTION prévisionnelle — Structurer la vue d'ensemble côté données/API minimal validé.
* P-VEHICLE-FOLLOWUP-05 — COMPLÉTION prévisionnelle — Structurer le sous-flux Vérifications côté UI/états.
* P-VEHICLE-FOLLOWUP-06 — COMPLÉTION prévisionnelle — Structurer le sous-flux Vérifications côté API/permissions.
* P-VEHICLE-FOLLOWUP-07 — COMPLÉTION prévisionnelle — Structurer le sous-flux Désinfections côté UI/états.
* P-VEHICLE-FOLLOWUP-08 — COMPLÉTION prévisionnelle — Structurer le sous-flux Désinfections côté API/permissions.
* P-VEHICLE-FOLLOWUP-09 — COMPLÉTION prévisionnelle — Structurer le sous-flux Anomalies avec traçabilité minimale si action sensible.
* P-VEHICLE-FOLLOWUP-10 — VALIDATION — Vérifier cohérence permissions, données et navigation.
* CLOTURE_P-VEHICLE-FOLLOWUP — VALIDATION — Clôture finale du bloc.
"@

$blocksPages = @(
    @{Id="P-LOGIN";Name="Connexion, incluant “Se souvenir de moi”";Objective="Stabiliser le parcours de connexion officiel, avec `Se souvenir de moi` à cadrer et prévoir.";Why="P1-03 valide `Se souvenir de moi` comme fonctionnalité à prévoir, tandis que Base44 indique que le login prototype n'est pas la référence finale.";Scope="Connexion, erreurs, redirections, session, lien Privacy, comportement `Se souvenir de moi` après cadrage.";Exclusions="Inscription libre Alpha, MFA, SSO, mot de passe oublié si non validé.";Deliverables="Écarts login, décision `Se souvenir de moi`, sessions de correction confirmées.";Controls="Tests auth/redirections si code modifié, contrôle navigateur, absence inscription libre, cohérence RGPD/Privacy.";Validation="Le login est utilisable, contrôlé et ses limites Alpha sont explicites.";Docs="Fiche Login, `05`, documentation RGPD/Privacy si impact.";Sessions=(New-DefaultSessions -Id "P-LOGIN" -CadrageText "Valider le découpage réel du bloc après audit ciblé, dont le comportement `Se souvenir de moi`.")}
    @{Id="P-COMPANY";Name="Société, incluant contacts société multiples";Objective="Stabiliser la société courante, son profil et les contacts société multiples.";Why="P1-03 valide les contacts société multiples et rappelle le multi-tenant strict par société.";Scope="Profil société, contacts, règles métier, `companyId`, droits, audit des actions sensibles.";Exclusions="Facturation, abonnement, multi-société non cadré, conformité juridique complète.";Deliverables="Écarts société/contacts, règles multi-tenant, sessions de correction ou complétion confirmées.";Controls="Preuve `companyId`, tests droits/API si code modifié, audit des actions sensibles, absence fuite inter-sociétés.";Validation="La société et ses contacts sont cohérents, cloisonnés et contrôlés.";Docs="Fiche Société, documentation données, `05`.";Sessions=(New-DefaultSessions -Id "P-COMPANY" -CadrageText "Valider le découpage réel du bloc après audit ciblé, dont les contacts société multiples.")}
    @{Id="P-DEPOTS";Name="Dépôts / Bases";Objective="Stabiliser le référentiel des dépôts/bases utilisé par RH, véhicules et planning.";Why="Les dépôts sont une donnée source pour plusieurs modules métier et doivent être fiables avant planning.";Scope="Création, modification, statut, archivage/restauration, rattachements, compteurs utiles, droits.";Exclusions="Géolocalisation avancée, contraintes planning non cadrées, automatisations futures.";Deliverables="Écarts dépôt/base, dépendances confirmées, sessions de correction ciblées si nécessaire.";Controls="Tests droits et multi-tenant si code modifié, contrôle audit pour archivage/restauration, lint/build.";Validation="Les dépôts/bases sont fiables comme référentiel pour les modules dépendants.";Docs="Fiche Dépôts, `05`, documentation données si impact."}
    @{Id="P-USERS-RH";Name="Utilisateurs / RH";Objective="Stabiliser les utilisateurs, fiches RH, rôles, accès applicatif et rattachements.";Why="Base44 a clarifié la séparation fiche RH / accès applicatif, mais le repo officiel doit rester la source finale.";Scope="Fiches RH, comptes applicatifs, rôles, permissions, dépôts, absences/indisponibilités, archivage et audit.";Exclusions="Paie, contrats, SIRH avancé, permissions fines non décidées.";Deliverables="Cartographie RH/accès, écarts RBAC, sessions de correction ou complétion confirmées.";Controls="Tests RBAC, audit actions sensibles, multi-tenant, lint/build si code modifié.";Validation="Les utilisateurs/RH sont exploitables sans confusion entre personne, rôle et accès applicatif.";Docs="Fiche Utilisateurs/RH, matrice RBAC, `05`."}
    @{Id="P-VEHICLES";Name="Véhicules";Objective="Stabiliser le référentiel administratif de flotte avant suivi véhicules et planning.";Why="Les véhicules sont une donnée source majeure et conditionnent disponibilité, suivi et planning.";Scope="Type, immatriculation, statut, disponibilité, dépôt principal, archivage/restauration, audit.";Exclusions="Vérifications, désinfections et anomalies si traitées dans le bloc suivi véhicules.";Deliverables="Écarts flotte/disponibilité, règles d'archivage, sessions de correction confirmées.";Controls="Tests API/RBAC, audit disponibilité/archivage, multi-tenant, lint/build si code modifié.";Validation="La flotte administrative est fiable pour les modules dépendants.";Docs="Fiche Véhicules, `05`, documentation audit si impact."}
    @{Id="P-VEHICLE-FOLLOWUP";Name="Suivi des véhicules en statut hybride";Objective="Cadrer puis reprendre le suivi opérationnel des véhicules comme module hybride rattaché à la flotte.";Why="P1-03 valide le statut hybride. Base44 montre des sous-flux connus, mais le statut technique officiel reste à confirmer.";Scope="Vue d'ensemble, vérifications, désinfections, anomalies, navigation, données, droits, audit minimal des actions sensibles.";Exclusions="Signature électronique, preuve mobile, maintenance prédictive, règles ARS complètes non confirmées.";Deliverables="Décision de statut hybride, découpage confirmé, sessions de production ajustées après audit, validations UI/API/RBAC.";Controls="Tests UI/API selon tranche, contrôle RBAC, audit actions sensibles, multi-tenant, navigateur, lint/build si code modifié.";Validation="Le suivi véhicules est situé clairement et fonctionne sans confusion avec le référentiel flotte.";Docs="Fiche Suivi véhicules, `05`, matrice RBAC, documentation audit.";Status="À confirmer";Sessions=$followupSessions}
    @{Id="P-TEMPLATES";Name="Modèles horaires";Objective="Aligner le référentiel des modèles horaires avec la terminologie produit officielle.";Why="P1-03 valide `Modèles horaires` comme nom produit, mais le renommage technique `templates` reste à confirmer.";Scope="Modèles horaires, horaires optionnels, statuts, archivage, dépendance planning, libellés français.";Exclusions="Renommage technique sans décision, reprise complète planning.";Deliverables="Écarts modèles horaires, décision renommage/report, sessions de correction confirmées.";Controls="Tests API/RBAC si code modifié, compatibilité planning, absence renommage non validé.";Validation="Les modèles horaires sont exploitables et nommés correctement côté produit.";Docs="Fiche Modèles horaires, `05`, conventions routes/libellés.";Sessions=(New-DefaultSessions -Id "P-TEMPLATES" -CadrageText "Valider le découpage réel du bloc après audit ciblé, dont le renommage technique futur.")}
    @{Id="P-PLANNING";Name="Planning";Objective="Reprendre le planning après stabilisation des référentiels et données sources.";Why="Le planning dépend de société, dépôts, utilisateurs/RH, véhicules, modèles horaires et éventuellement suivi véhicules.";Scope="Vues planning, affectations, publication, annulation logique, exports éventuels, droits, audit, données sources.";Exclusions="Planification automatique avancée, reporting analytique, agenda heure par heure si non validé.";Deliverables="Cartographie écarts planning, dépendances confirmées, sessions de production ajustées.";Controls="Tests fonctionnels ciblés, RBAC, audit, multi-tenant, navigateur, lint/build si code modifié.";Validation="Le planning manuel métier est fiable sur les parcours Alpha retenus.";Docs="Fiche Planning, `05`, matrice RBAC, documentation audit."}
    @{Id="P-AUDIT";Name="Audit / Traçabilité";Objective="Garantir la consultation des traces officielles autorisées.";Why="La page Audit doit refléter les traces serveur officielles et rester cohérente avec le bloc transverse T6.";Scope="Lecture audit, filtres, droits, traces produites par les modules, lecture seule.";Exclusions="SIEM, purge/rétention complète, conformité RGPD finale.";Deliverables="Écarts page Audit/traces, sessions de correction confirmées si nécessaire.";Controls="Tests droits lecture seule, API/RBAC, cohérence avec T6, absence modification non prévue.";Validation="Les traces officielles autorisées sont consultables sans action de modification non voulue.";Docs="Documentation audit, `05`, matrice RBAC."}
    @{Id="P-DASHBOARD";Name="Tableau de bord comme portail fiable";Objective="Fiabiliser le tableau de bord comme portail utile après stabilisation des données sources.";Why="P1-03 reporte les préférences Dashboard après fiabilisation du portail et des données sources.";Scope="KPI réels, widgets, raccourcis autorisés, informations utiles selon profil, préférences seulement après cadrage.";Exclusions="Reporting avancé, préférences complexes non confirmées, données fictives.";Deliverables="Écarts KPI/widgets/raccourcis, décisions sur préférences, sessions de correction confirmées.";Controls="Contrôle données réelles, RBAC raccourcis, navigateur, responsive, lint/build si code modifié.";Validation="Le dashboard affiche des données fiables et des accès autorisés.";Docs="Fiche Dashboard, `05`, documentation données si impact.";Sessions=(New-DefaultSessions -Id "P-DASHBOARD" -CadrageText "Valider le découpage réel du bloc après audit ciblé, dont le moment des préférences.")}
    @{Id="P-ONBOARDING";Name="Mise en route";Objective="Stabiliser l'assistant de configuration initiale après les référentiels métier.";Why="P1-03 valide `Mise en route` comme nom produit, avec renommage technique futur à confirmer.";Scope="Checklist société, dépôts, utilisateurs, véhicules, modèles horaires, planning, liens vers modules.";Exclusions="Onboarding marketing, tutoriels avancés, renommage technique sans décision.";Deliverables="Écarts Mise en route, dépendances référentiels, sessions de correction confirmées.";Controls="Tests liens, données sources, RBAC visible, navigateur, lint/build si code modifié.";Validation="La mise en route guide correctement la configuration Alpha avec les vrais modules sources.";Docs="Fiche Mise en route, `05`, conventions routes/libellés.";Sessions=(New-DefaultSessions -Id "P-ONBOARDING" -CadrageText "Valider le découpage réel du bloc après audit ciblé, dont le renommage technique futur.")}
)

$rgpd = @{Id="RGPD-PRIVACY";Name="Privacy visible en Alpha et rattachée au bloc RGPD";Objective="Garantir une Privacy visible en Alpha et documenter les limites RGPD sans déclarer une conformité complète non prouvée.";Why="P1-03 rattache Privacy au bloc RGPD et non à un simple bloc page Base44.";Scope="Présence Privacy, accessibilité, lien avec Login, mentions minimales Alpha, limites de conformité, points RGPD à confirmer.";Exclusions="Conformité RGPD complète, politique légale exhaustive, DPO/base légale/rétention/purge non confirmés.";Deliverables="Écarts Privacy, limites RGPD Alpha, décisions restantes, sessions de correction confirmées.";Controls="Contrôle navigateur, lien login/privacy, absence déclaration de conformité complète, encodage si documentation modifiée.";Validation="Privacy est visible et cohérente avec les limites Alpha.";Docs="`RGPD_BASE_MINIMALE.md` si repris dans une session dédiée, `05`, Login, documentation Privacy."}

$finals = @(
    @{Id="F1";Name="Validation fonctionnelle croisée";Objective="Vérifier les parcours fonctionnels transverses après les blocs métier.";Why="Une page isolée ne valide pas l'application ; les parcours doivent être contrôlés entre modules.";Scope="Parcours admin/gérant, bureau/régulateur, terrain, navigation, droits, données et liens entre modules.";Exclusions="Correction code pendant validation sauf session séparée, nouvelles fonctionnalités.";Deliverables="Rapports de parcours, écarts bloquants, reports explicites.";Controls="Navigateur, RBAC, données de test, captures si UI, preuve des rôles utilisés.";Validation="Les parcours principaux sont validés ou les écarts bloquants sont listés et reportés.";Docs="Rapports de validation, `05`, fin de phase."}
    @{Id="F2";Name="Validation qualité technique";Objective="Vérifier la qualité technique globale après reprise.";Why="La reprise Alpha doit être contrôlée techniquement avant gel ou passage de phase.";Scope="Lint, build, tests disponibles, API/RBAC, multi-tenant, non-régression ciblée.";Exclusions="Correction dans la même session de validation, migration non prévue, couverture exhaustive non confirmée.";Deliverables="Rapport technique, sorties de commandes, écarts et exceptions documentées.";Controls="Lint, build, tests ciblés disponibles, contrôles API/RBAC, multi-tenant, Git status.";Validation="Les contrôles techniques Alpha sont exécutés et leurs résultats sont exploitables.";Docs="Rapports qualité, `05`, documentation de contrôle."}
    @{Id="F3";Name="Validation UX visuelle";Objective="Vérifier la cohérence visuelle, responsive et ergonomique des parcours critiques.";Why="Les reprises UI doivent être validées en rendu réel, pas seulement par présence de fichiers.";Scope="Shell, navigation, pages référentiels, login, dashboard, planning, états vide/erreur/chargement, desktop/mobile.";Exclusions="Refonte UI globale pendant validation, nouvelle maquette non validée.";Deliverables="Rapport visuel, captures, écarts UX bloquants ou reports.";Controls="Contrôle navigateur, responsive, états UI, absence chevauchements visibles, captures utiles.";Validation="Les écrans critiques ne présentent pas d'écart visuel bloquant connu.";Docs="Références UI/UX si décision validée, rapports F3, `05`."}
    @{Id="F4";Name="Clôture documentaire Alpha ou clôture de phase";Objective="Clôturer la phase Alpha ou acter explicitement les reports et la non-clôture.";Why="La fin de phase doit reposer sur des preuves, pas sur l'existence de fichiers ou de sessions.";Scope="Synthèse F1/F2/F3, reports, décisions humaines, documents MASTER, preuves finales, prochaine phase.";Exclusions="Nouvelle fonctionnalité, correction code non séparée, validation implicite.";Deliverables="Note de clôture ou non-clôture, reports acceptés, décision humaine, prochaine phase.";Controls="Vérification preuves F1/F2/F3, Git status, cohérence MASTER, absence validation implicite.";Validation="La phase est clôturée ou non clôturée explicitement, avec preuves et décisions visibles.";Docs="`04`, `05`, fin de session, synthèse de phase."}
)

$content = @"
# Ambulance Manager — Blocs et sessions de production

## 1. Rôle du document

Ce fichier décline opérationnellement le plan court `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md` en fiches de blocs lisibles.

`04-PLAN_DE_DEVELOPPEMENT.md` reste le plan maître court. Le présent fichier sert à piloter les sessions Codex bloc par bloc, sans devenir un second plan concurrent, un audit détaillé ou une fiche fonctionnelle complète.

## 2. Règles de lecture

* `04-PLAN_DE_DEVELOPPEMENT.md` reste la référence de l'ordre global et du cadrage court.
* `05-BLOCS_SESSIONS_PRODUCTION.md` est une déclinaison opérationnelle lisible du plan `04`.
* Chaque bloc doit commencer par une session obligatoire d'audit ciblé.
* L'audit ciblé compare le repo officiel, Base44 et la documentation de référence.
* Les sessions détaillées sont confirmées après audit ciblé.
* Ne pas inventer de production non prouvée par l'existant réel du repo.
* Base44 est une référence prototype métier, visuelle et fonctionnelle, pas une source technique finale.
* Les incertitudes restent visibles avec la mention `INFORMATION NON FOURNIE — À CONFIRMER`.

## 3. Modèle de fiche de bloc

### BLOC [ID] — [Nom]

#### Objectif du bloc

...

#### Pourquoi ce bloc existe

...

#### Périmètre

...

#### Exclusions

...

#### Sessions prévues

...

#### Livrables attendus

...

#### Contrôles obligatoires

...

#### Critère de validation du bloc

...

#### Documentation à mettre à jour si nécessaire

...

#### Statut

...

## 4. Blocs transversaux

$(
($blocksTransverse | ForEach-Object { New-Block @_ }) -join "`n"
)

## 5. Blocs pages / modules

$(
($blocksPages | ForEach-Object { New-Block @_ }) -join "`n"
)

## 6. Bloc RGPD / Privacy

$(New-Block @rgpd)

## 7. Validations finales / gel Alpha

$(
($finals | ForEach-Object { New-Block @_ }) -join "`n"
)

## 8. Règles de maintenance

Mettre à jour ce fichier uniquement dans les cas suivants :

* après audit ciblé d'un bloc ;
* après décision humaine ;
* après changement d'ordre ;
* après ajout, retrait ou fusion de session ;
* après clôture d'un bloc.

Règles à conserver :

* ne pas transformer `05` en copie de `04` ;
* ne pas transformer `05` en copie de P1-02 ;
* ne pas créer de gros tableaux administratifs par bloc ;
* ne pas inventer de sessions de production non prouvées ;
* garder les incertitudes visibles ;
* conserver un audit ciblé obligatoire au début de chaque bloc ;
* mettre à jour les fiches après preuve, pas avant.
"@

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText((Resolve-Path $target), $content, $utf8NoBom)
