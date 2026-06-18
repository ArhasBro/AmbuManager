# 3 - Fin de session

## 1. Resume court

La session de cadrage T4 est complete.

Elle fige les arbitrages restants sur les permissions manquantes, dormantes ou reportees, sans modifier le catalogue, le code, les routes, l'API, Prisma, les MASTER ni le RBAC effectif.

Le seul ajustement hors dossier de session concerne `create_session.ps1`, corrige uniquement pour permettre l'ouverture officielle du bloc T4 demande.

## 2. Synthese des arbitrages

- `DEPOTS_MANAGE` doit devenir la permission T4 dediee pour les depots / bases si une correction RBAC est lancee.
- `COMPANY_MANAGE` n'est pas a creer maintenant : le profil societe reste gouverne par les roles natifs et `COMPANY_RULES_MANAGE`.
- Le reset password administratif reste couvert par `USERS_MANAGE`.
- La regle `archive-only` ne demande aucune restauration supplementaire dans T4.
- La disponibilite vehicule avancee est reportee hors T4.
- `ROLES_PERMISSIONS_MANAGE` reste dormant et ne doit pas etre active dans cette session.
- `ADE` existe dans le repo officiel ; `DEA` n'apparait que comme ancienne valeur historique dans la migration Prisma initiale.

## 3. Decisions T4 figees

### DEPOTS_MANAGE

La permission manque cote repo et doit etre traite comme la permission T4 dediee des depots / bases.

La correction est a rattacher a `CX_T4_CORRECTION-RBAC-REFERENTIELS`.

### COMPANY_MANAGE

Une permission dediee societe n'est pas necessaire maintenant.

Le profil societe reste en role natif `ADMIN` / `GERANT`, avec `COMPANY_RULES_MANAGE` pour les regles societe.

### Reset password administratif

L'action reste couverte par `USERS_MANAGE`.

Aucune nouvelle permission n'est creee et aucun endpoint n'est modifie dans cette session.

### Archive-only

La session confirme qu'aucune restauration n'est a introduire dans T4.

Les eventuelles evolutions de la politique archive / restauration restent hors T4.

### Disponibilite vehicule avancee

Le sujet est hors T4.

Il reste a traiter dans les blocs metier vehicule / suivi vehicules / planning, avec eventuel rattachement RBAC a `CX_T4_CORRECTION-RBAC-VEHICULES` si un point de gate est confirme plus tard.

### ROLES_PERMISSIONS_MANAGE

La permission est dormante.

La gestion dynamique complete des roles et permissions reste hors T4 Alpha et ne doit pas etre activee ici.

## 4. Tableau de decision par sujet

| Sujet | Constat audit T4 | Decision proposee | Statut | Impact UI | Impact API | Impact securite | Session future concernee | Bloc futur concerne si report | Informations manquantes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `DEPOTS_MANAGE` | Absente du repo effectif ; depots encore role-only | La traiter comme permission T4 dediee des depots / bases | `À TRAITER T4` | Afficher / masquer creer, modifier, archiver, restaurer selon gate | Gatage serveur des routes depots et archive | Supprime le role-only implicite ; controle serveur explicite | `CX_T4_CORRECTION-RBAC-REFERENTIELS` | `P-DEPOTS-BASES` | Granularite lecture vs gestion ; politique restore |
| `COMPANY_MANAGE` | Pas de permission dediee ; profil societe et regles societe melanges dans l'usage actuel | Conserver l'etat actuel ; ne pas creer la permission | `À CONSERVER EN L'ÉTAT` | Conserver le split UI existant profil / regles | Garder le gate role-only sur le profil et `COMPANY_RULES_MANAGE` sur les regles | Pas de nouvelle surface d'auto-escalade | `CX_T4_CORRECTION-RBAC-REFERENTIELS` si separation future | `P-SOCIETE` | Granularite future profil / regles / gouvernance |
| Reset password administratif | Action sensible couverte par `USERS_MANAGE` | Garder `USERS_MANAGE` comme gate | `À CONSERVER EN L'ÉTAT` | Bouton reste dans les actions utilisateurs, pas de permission separee | Endpoint reste sous le gate actuel | Action sensible ; audit obligatoire ; pas de self-escalation | `CX_T4_CORRECTION-RBAC-REFERENTIELS` si split futur | `P-UTILISATEURS-RH` | Regle de retention / rotation a confirmer |
| Archive-only | Le repo porte deja des mecanismes archive / restore sur plusieurs referentiels | Ne rien ajouter dans T4 ; pas de restauration nouvelle | `À CONSERVER EN L'ÉTAT` | Pas de nouveau toggle restore dans cette session | Aucun changement de route | Evite d'etendre le perimetre de restauration | Futur bloc metier si la politique doit etre durcie | `P-UTILISATEURS-RH` / `P-VEHICULES` / `P-DEPOTS-BASES` / `P-MODELES-HORAIRES` | Politique finale archive / restore hors T4 |
| Disponibilite vehicule avancee | Sujet documente comme avance et hors T4 ; la granularite n'est pas confirmee | Reporter hors T4 | `À REPORTER HORS T4` | Future UI dans vehicules / suivi / planning, pas ici | Eventuel endpoint ou gate futur | Ne pas etendre `VEHICLES_MANAGE` | `CX_T4_CORRECTION-RBAC-VEHICULES` si gate RBAC a ajouter | `P-VEHICULES` / `P-SUIVI-VEHICULES` / `P-PLANNING` | Regle fonctionnelle exacte ; niveau de gate |
| `ROLES_PERMISSIONS_MANAGE` | Present dans le catalogue / references mais dormant ; aucun endpoint serveur | Le laisser dormant | `DORMANT À CONSERVER` | Garder les controles de gestion dynamique caches ou inactifs | Aucun endpoint a creer | Eviter la gestion dynamique complete en Alpha | `CX_T4_CORRECTION-RBAC-REFERENTIELS` si activation plus tard | `P-UTILISATEURS-RH` | Perimetre final de gestion dynamique |
| Contacts societe | Report historique hors T4 | Reporter hors T4 | `À REPORTER HORS T4` | Future UI contacts societe | Future routes societe si besoin | Pas de changement T4 | `P-SOCIETE` | `P-SOCIETE` | Types de contacts et droits finaux |
| Suivi vehicules | Report historique hors T4 | Reporter hors T4 | `À REPORTER HORS T4` | Future onglets verification / desinfection / anomalies | Future API de suivi | Ne pas absorber dans `VEHICLES_MANAGE` | `P-SUIVI-VEHICULES` | `P-SUIVI-VEHICULES` | Regles ARS et detail des workflows |
| Dashboard preferences | Report historique hors T4 | Reporter hors T4 | `À REPORTER HORS T4` | Future preferences user dashboard | Future persistence user-level | Aucun impact RBAC direct | `P-DASHBOARD` | `P-DASHBOARD` | Modele de persistence ; reset |
| Refonte planning | Report historique hors T4 | Reporter hors T4 | `À REPORTER HORS T4` | Eventuelle refonte UI planning plus tard | Eventuelle evolution API planning | Pas de changement T4 | `P-PLANNING` | `P-PLANNING` | Niveau exact de granularite planning |
| Gestion dynamique complete des roles et permissions | Sujet hors T4 Alpha | Reporter hors T4 | `À REPORTER HORS T4` | Future ecran / panneau d'administration si validé | Future route d'administration si validée | Risque eleve d'auto-escalade si ouverte trop tot | `CX_T4_CORRECTION-RBAC-REFERENTIELS` | `P-UTILISATEURS-RH` | Frontiere exacte entre administration et gestion dynamique |

## 5. Reports hors T4

| Sujet reporte | Rattachement fonctionnel | Bloc futur principal | Session future conseillée |
| --- | --- | --- | --- |
| Contacts societe | Gestion des contacts et gouvernance societe | `P-SOCIETE` | `P-SOCIETE` |
| Suivi vehicules | Verification, desinfection, anomalies | `P-SUIVI-VEHICULES` | `P-SUIVI-VEHICULES` |
| Dashboard preferences | Preferences utilisateur du tableau de bord | `P-DASHBOARD` | `P-DASHBOARD` |
| Disponibilite vehicule avancee | Gestion avancee de la disponibilite flotte | `P-VEHICULES` / `P-SUIVI-VEHICULES` / `P-PLANNING` | `CX_T4_CORRECTION-RBAC-VEHICULES` si le gate RBAC doit etre precise |
| Refonte planning | Refonte du module planning | `P-PLANNING` | `P-PLANNING` |
| Gestion dynamique complete des roles et permissions | Administration RBAC complete | `P-UTILISATEURS-RH` | `CX_T4_CORRECTION-RBAC-REFERENTIELS` si la correction RBAC est ouverte |

## 6. Impacts UI

- `DEPOTS_MANAGE` : les actions de creation, edition et archivage des depots / bases doivent etre masquees ou affichees selon la permission dediee.
- `COMPANY_MANAGE` : aucune nouvelle UI ne doit apparaitre ; la page societe reste gouvernee par le mode actuel.
- Reset password administratif : le bouton reste dans les actions utilisateurs et ne doit pas etre extrait dans un nouvel ecran T4.
- Archive-only : pas de nouveau controle de restauration dans T4 ; on conserve le comportement existant sans etendre la surface UI.
- Disponibilite vehicule avancee : sujet reporte vers vehicules / suivi vehicules / planning ; aucune UI nouvelle dans cette session.
- `ROLES_PERMISSIONS_MANAGE` : les controles de gestion dynamique restent dormants ou caches.

## 7. Impacts API

- `DEPOTS_MANAGE` : les routes depots doivent etre garees par permission server-side si la correction est ouverte.
- `COMPANY_MANAGE` : le profil societe reste role-only, les regles societe restent sous `COMPANY_RULES_MANAGE`.
- Reset password administratif : l'endpoint reste sous `USERS_MANAGE`.
- Archive-only : aucune route supplementaire n'est introduite dans cette session.
- Disponibilite vehicule avancee : eventuelle route ou gate futur hors T4.
- `ROLES_PERMISSIONS_MANAGE` : aucun endpoint serveur ne doit etre cree.

## 8. Impacts securite

- La securite doit rester appliquee cote serveur, pas seulement via masquage UI.
- `DEPOTS_MANAGE` et les sujets de referentiels ne doivent plus reposer sur un gate role-only implicite si une correction est ouverte.
- Reset password administratif reste une action sensible ; l'audit doit rester obligatoire.
- La regle `archive-only` ne doit pas ouvrir une restauration non arbitree dans T4.
- `ROLES_PERMISSIONS_MANAGE` doit rester dormant pour eviter toute escalade dynamique des droits.
- `ADE` est bien present dans le repo ; `DEA` n'est qu'un historique Prisma et ne doit pas etre reintroduit comme role actif.

## 9. Corrections futures recommandees

- `CX_T4_CORRECTION-RBAC-REFERENTIELS` :
  - traiter `DEPOTS_MANAGE` ;
  - conserver ou clarifier le split `COMPANY_MANAGE` / `COMPANY_RULES_MANAGE` si une separation plus fine devient necessaire ;
  - cadrer, si besoin, le reset password administratif et la gestion RBAC des referentiels utilisateurs.
- `CX_T4_CORRECTION-RBAC-VEHICULES` :
  - traiter la disponibilite vehicule avancee ;
  - corriger les eventuelles asymetries entre gestion flotte, lecture planning et suivi vehicules ;
  - ne pas etendre `VEHICLES_MANAGE` au-dela du cadre confirme.

## 10. Informations non fournies

- `INFORMATION NON FOURNIE — À CONFIRMER` : granularite finale entre `COMPANY_MANAGE` et `COMPANY_RULES_MANAGE` si une separation plus fine est demandee plus tard.
- `INFORMATION NON FOURNIE — À CONFIRMER` : politique definitive de restauration si la regle `archive-only` doit etre durcie hors T4.
- `INFORMATION NON FOURNIE — À CONFIRMER` : niveau de granularite final pour la disponibilite vehicule avancee.
- `INFORMATION NON FOURNIE — À CONFIRMER` : perimetre exact d'une future gestion dynamique des roles et permissions.
- `INFORMATION NON FOURNIE — À CONFIRMER` : modalites de stockage et de remise a zero des preferences Dashboard.

## 11. Points de vigilance

- `ADE` existe dans le repo et dans les references fonctionnelles actives ; `DEA` n'est qu'une valeur historique de migration.
- `ROLES_PERMISSIONS_MANAGE` doit rester dormant tant que le bloc T4 Alpha n'ouvre pas la gestion dynamique.
- Aucun patch applicatif n'a ete produit.
- `create_session.ps1` a ete ajuste uniquement comme support de creation de session.
- Les corrections futures doivent rester rattachees aux blocs futurs identifies, sans rouvrir T4 hors perimetre.

## 12. Patch / NO_PATCH

- `PATCH/NO_PATCH.md` existe et justifie l'absence de patch applicatif.
- Aucun `.diff` applicatif n'a ete produit.

## 13. Git status final

```text
 M create_session.ps1
?? docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES/
```

## 14. Verdict final

`VALIDABLE SOUS RÉSERVE`

Reserve principale :

- plusieurs sujets restent explicitement reportes hors T4 ou `INFORMATION NON FOURNIE — À CONFIRMER` ;
- aucune correction applicative n'a ete ouverte dans cette session ;
- le support `create_session.ps1` a ete ajuste seulement pour permettre l'ouverture officielle du bloc demande.
