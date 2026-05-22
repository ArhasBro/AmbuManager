# Ambulance Manager â€” LISTE_FONCTIONNALITES_V1.1

> Statut : rÃ©fÃ©rence fonctionnelle cible â€” page non validÃ©e Ã  ce stade.
> Ce document est une synthÃ¨se fonctionnelle cible et ne vaut pas validation finale des pages.

Version : V1.1 (MASTER)  
Date : 18/05/2026

## SOMMAIRE

- [1. Vision du projet](#1-vision-du-projet)
- [2. Login](#2-login)
- [3. Tableau de bord](#3-tableau-de-bord)
- [4. Planning](#4-planning)
- [5. Utilisateurs](#5-utilisateurs)
- [6. VÃ©hicules](#6-vÃ©hicules)
- [7. Suivi des vÃ©hicules](#7-suivi-des-vÃ©hicules)
- [8. ModÃ¨les horaires](#8-modÃ¨les-horaires)
- [9. SociÃ©tÃ©](#9-sociÃ©tÃ©)
- [10. DÃ©pÃ´ts / Bases](#10-dÃ©pÃ´ts--bases)
- [11. Mise en route](#11-mise-en-route)
- [12. Audit](#12-audit)
- [13. Pages / modules futurs identifiÃ©s](#13-pages--modules-futurs-identifiÃ©s)
- [14. Points Ã  confirmer](#14-points-Ã  -confirmer)

---

## 1. Vision du projet

Ambulance Manager est un SaaS de gestion opÃ©rationnelle pour sociÃ©tÃ© de transport sanitaire.

Le produit vise un fonctionnement multi-tenant strict, avec cloisonnement par sociÃ©tÃ©.

Le pÃ©rimÃ¨tre V1 / Alpha est centrÃ© sur :

- authentification ;
- tableau de bord ;
- utilisateurs ;
- vÃ©hicules ;
- suivi des vÃ©hicules ;
- modÃ¨les horaires ;
- planning manuel mÃ©tier ;
- sociÃ©tÃ© ;
- dÃ©pÃ´ts / bases ;
- mise en route ;
- audit / traÃ§abilitÃ©.

Les modules avancÃ©s restent prÃ©vus plus tard lorsqu'ils sont explicitement indiquÃ©s comme Beta, version mobile, version finale ou trÃ¨s long terme.

RÃ´les fonctionnels Ã  prendre en compte :

- Admin ;
- GÃ©rant ;
- ADE ;
- AA ;
- PSC1 ;
- TAXI ;
- Bureau ;
- RÃ©gulateur si utile plus tard ;
- Support propriÃ©taire si cadrÃ© techniquement.

RÃ¨gle de prudence :

> Toute information non validÃ©e doit rester marquÃ©e : INFORMATION NON FOURNIE â€” Ã€ CONFIRMER.

---

## 2. Login

La page **Login** permet l'accÃ¨s sÃ©curisÃ© Ã  l'application.

PÃ©rimÃ¨tre V1 / Alpha :

- connexion email + mot de passe ;
- pas d'inscription libre ;
- pas de mot de passe oubliÃ© en V1 ;
- pas de choix manuel de rÃ´le, sociÃ©tÃ© ou dÃ©pÃ´t / base ;
- redirection vers Tableau de bord aprÃ¨s connexion ;
- chargement de la session, du rÃ´le principal, de la sociÃ©tÃ© et des permissions ;
- erreurs sobres et sÃ©curisÃ©es ;
- blocage si compte inactif, absence de sociÃ©tÃ© valide ou absence de rÃ´le valide ;
- bouton de connexion dÃ©sactivÃ© si email ou mot de passe vide ;
- champ mot de passe masquÃ© avec option afficher / masquer ;
- redirection vers Login si accÃ¨s sans session.

Ã‰volutions futures :

- mot de passe oubliÃ© ;
- premiÃ¨re connexion ;
- double authentification ;
- SSO ;
- accÃ¨s support renforcÃ© ;
- sÃ©curitÃ© avancÃ©e ;
- multi-sociÃ©tÃ© avancÃ©e ;
- expÃ©rience mobile.

---

## 3. Tableau de bord

La page **Tableau de bord** est la page d'accueil aprÃ¨s connexion.

PÃ©rimÃ¨tre V1 / Alpha :

- tableau de bord personnalisable simplement par utilisateur ;
- widgets prÃ©dÃ©finis selon rÃ´les et permissions ;
- raccourcis vers les pages principales ;
- KPI simples sous forme de tuiles ;
- informations planning simples ;
- widgets Planning personnel / terrain ;
- widgets Planning global Ã©quipes ;
- widgets informations / alertes simples ;
- possibilitÃ© de choisir les widgets visibles parmi une liste autorisÃ©e ;
- possibilitÃ© de choisir des raccourcis favoris ;
- retour Ã  une disposition par dÃ©faut selon profil ;
- prÃ©fÃ©rences enregistrÃ©es par utilisateur.

Exclusions Alpha :

- graphiques complexes ;
- reporting analytique avancÃ© ;
- centre de notifications avancÃ© ;
- moteur d'alertes complexe ;
- prÃ©dictions.

Pages accessibles en raccourci selon permissions :

- Planning ;
- Utilisateurs ;
- VÃ©hicules ;
- Suivi des vÃ©hicules si disponible ;
- ModÃ¨les horaires ;
- SociÃ©tÃ© ;
- DÃ©pÃ´ts / Bases ;
- Mise en route ;
- Audit.

---

## 4. Planning

La page **Planning** est un planning manuel mÃ©tier, centrÃ© sur les affectations synthÃ©tiques.

PÃ©rimÃ¨tre V1 / Alpha :

- aucune vue dÃ©taillÃ©e heure par heure ;
- fonctionnement par modÃ¨les horaires, types d'affectation, semaines et repÃ¨res synthÃ©tiques ;
- vue globale annuelle utilisateurs Ã— semaines ;
- affichage du modÃ¨le horaire ou type affectÃ© dans chaque case ;
- vue personnelle type agenda synthÃ©tique ;
- vue mois claire pour l'organisation personnelle ;
- vue semaine synthÃ©tique ;
- vue jour synthÃ©tique ;
- distinction lecture simple / gestion selon permissions ;
- annotations lÃ©gÃ¨res pour jour fÃ©riÃ©, samedi, dimanche et week-end complet ;
- case avec fond blanc et libellÃ© dans un badge colorÃ© ;
- Ã©tats simples : REPOS, ABSENT, INDISPONIBLE, NON PLANIFIÃ‰, Ã€ AFFECTER ;
- crÃ©ation par utilisateur + semaine + modÃ¨le / type / Ã©tat ;
- prÃ©paration hebdomadaire des besoins Ã  couvrir ;
- checklist des besoins : Ã€ couvrir, Couvert, Incomplet, Non affectÃ©, Ã€ vÃ©rifier ;
- affectation manuelle des utilisateurs ;
- affectation manuelle des vÃ©hicules ;
- publication principale par semaine ;
- modification aprÃ¨s publication avec traÃ§abilitÃ© obligatoire ;
- annulation logique sans suppression physique aprÃ¨s publication ;
- motif obligatoire pour annulation aprÃ¨s publication et modification sensible ;
- filtres, recherche rapide et panneau de dÃ©tail ;
- alertes simples et conflits Ã©vidents en mode gestion ;
- affichage du nombre d'utilisateurs terrain disponibles ;
- audit des actions importantes.

Termes franÃ§ais retenus :

- Autoschedule â†’ Planification automatique ;
- Matching automatique â†’ Affectation automatique optimisÃ©e.

Ces fonctions avancÃ©es sont prÃ©vues pour la Beta, pas comme cÅ“ur du Planning Alpha.

Points liÃ©s :

- distinction TPMR VSL / TPMR TAXI Ãƒ  prendre en compte ;
- gestion avancÃ©e des heures reportÃ©e Ã  une page Heures / Horaires, prÃ©vue pour l'Alpha mobile.

---

## 5. Utilisateurs

La page **Utilisateurs** permet de gÃ©rer les utilisateurs rattachÃ©s Ã  une sociÃ©tÃ©.

PÃ©rimÃ¨tre V1 / Alpha :

- crÃ©ation utilisateur ;
- modification utilisateur ;
- nom ;
- prÃ©nom ;
- initiales d'avatar choisies manuellement ;
- email ;
- tÃ©lÃ©phone ;
- rÃ´le principal obligatoire ;
- multi-rÃ´le avec maximum 3 rÃ´les ;
- permissions fines ;
- statut actif / inactif ;
- rattachement sociÃ©tÃ© automatique ;
- base / dÃ©pÃ´t si applicable ;
- mot de passe initial dÃ©fini manuellement par Admin / GÃ©rant ;
- action sÃ©parÃ©e de modification / rÃ©initialisation du mot de passe ;
- archivage logique ;
- consultation des utilisateurs archivÃ©s via filtre ;
- demandes d'absence / indisponibilitÃ© ;
- statuts de demande : en attente, validÃ©e, refusÃ©e, annulÃ©e ;
- validation / refus par Admin, GÃ©rant ou utilisateur autorisÃ© ;
- actions sensibles tracÃ©es dans l'audit.

RÃ¨gles importantes :

- une demande en attente ne modifie pas automatiquement l'Ã©tat opÃ©rationnel ;
- une demande validÃ©e peut rendre l'utilisateur absent ou indisponible ;
- un utilisateur standard voit uniquement sa propre fiche pour le moment ;
- Admin / GÃ©rant et utilisateurs autorisÃ©s voient les utilisateurs selon pÃ©rimÃ¨tre sociÃ©tÃ© ;
- les utilisateurs terrain peuvent avoir des types de vÃ©hicules affectables.

Types de vÃ©hicules affectables Alpha :

- Ambulance ;
- VSL ;
- TAXI ;
- TPMR.

Ã‰volutions futures :

- mot de passe temporaire avec premiÃ¨re connexion ;
- vÃ©hicules affectables + exceptions par vÃ©hicule ;
- formations / recyclage ;
- visite mÃ©dicale ;
- gestion avancÃ©e des heures dans page dÃ©diÃ©e ;
- expÃ©rience mobile.

---

## 6. VÃ©hicules

La page **VÃ©hicules** est le rÃ©fÃ©rentiel administratif de la flotte.

PÃ©rimÃ¨tre V1 / Alpha :

- liste des vÃ©hicules ;
- crÃ©ation vÃ©hicule ;
- modification vÃ©hicule ;
- fiche dÃ©tail vÃ©hicule ;
- nom interne personnalisable ;
- marque ;
- modÃ¨le ;
- type obligatoire ;
- immatriculation obligatoire ;
- statut administratif actif / inactif ;
- disponibilitÃ© gÃ©nÃ©rale disponible / indisponible ;
- base / dÃ©pÃ´t principal ;
- commentaire interne simple si utile ;
- dÃ©sactivation ;
- rÃ©activation ;
- archivage ;
- consultation des archivÃ©s ;
- dÃ©sarchivage / restauration ;
- aucune suppression physique ;
- lecture simple pour les utilisateurs terrain ;
- actions sensibles tracÃ©es dans l'audit.

Types principaux :

- AMBULANCE ;
- VSL ;
- TAXI ;
- TPMR.

Pour TPMR, une distinction mÃ©tier doit Ãªtre prÃ©vue lorsque nÃ©cessaire :

- TPMR VSL ;
- TPMR TAXI.

RÃ¨gles importantes :

- un vÃ©hicule inactif, indisponible ou archivÃ© n'est pas proposÃ© normalement au Planning ;
- la base / dÃ©pÃ´t du vÃ©hicule est une information de rÃ©fÃ©rence, pas une contrainte bloquante ;
- un vÃ©hicule peut ne pas rentrer Ã  sa base principale le soir ;
- les workflows de vÃ©rification, dÃ©sinfection, anomalies et entretiens relÃ¨vent de Suivi des vÃ©hicules.

---

## 7. Suivi des vÃ©hicules

La page **Suivi des vÃ©hicules** centralise le suivi opÃ©rationnel de la flotte.

Onglets V1 / Alpha :

- Vue d'ensemble ;
- VÃ©rifications ;
- DÃ©sinfections ;
- Anomalies des vÃ©hicules.

L'onglet **Entretiens des vÃ©hicules** est prÃ©vu au minimum pour la Beta, pas dans l'Alpha.

### VÃ©rifications

RÃ¨gles validÃ©es :

- ambulance : 2 vÃ©rificateurs ;
- autres vÃ©hicules : 1 vÃ©rificateur ;
- frÃ©quence quotidienne ;
- absence de vÃ©rification quotidienne â†’ anomalie majeure d'office ;
- rÃ©sultats : Conforme, Non conforme, Sous rÃ©serve, Ã€ vÃ©rifier ;
- Non conforme â†’ anomalie bloquante ;
- pas d'indisponibilitÃ© automatique ;
- passage indisponible uniquement par action explicite autorisÃ©e.

RÃ¨gles ARS exactes :

- INFORMATION NON FOURNIE â€” Ã€ CONFIRMER.

### DÃ©sinfections

RÃ¨gles validÃ©es :

- formulaire avec type de produit utilisÃ© ;
- rÃ©sultat "RÃ©alisÃ©e avec rÃ©serve" â†’ point Ã  surveiller ;
- rÃ©sultat "Non rÃ©alisÃ©e" ou "Ã€ refaire" â†’ motif obligatoire ;
- frÃ©quence / dÃ©clenchement : quotidienne, aprÃ¨s utilisation / transport, aprÃ¨s certains transports spÃ©cifiques, manuel selon besoin ;
- contre-vÃ©rification par un tiers autre que la personne ayant rÃ©alisÃ© la dÃ©sinfection ;
- pas d'indisponibilitÃ© automatique.

RÃ¨gles ARS exactes :

- INFORMATION NON FOURNIE â€” Ã€ CONFIRMER.

### Anomalies

RÃ¨gles validÃ©es :

- sources : dÃ©claration manuelle, vÃ©rification, dÃ©sinfection, vÃ©rification quotidienne non faite, autre ;
- statuts : ouverte, en cours de traitement, rÃ©solue, annulÃ©e / classÃ©e sans suite ;
- criticitÃ©s : non bloquante, bloquante, majeure ;
- utilisateurs terrain peuvent dÃ©clarer ;
- clÃ´ture / classement / changement disponibilitÃ© soumis Ã  permission ;
- motif obligatoire pour rendre un vÃ©hicule indisponible ou disponible ;
- aucune suppression physique d'anomalie en Alpha.

---

## 8. ModÃ¨les horaires

La page **ModÃ¨les horaires** remplace fonctionnellement l'ancien terme Templates.

PÃ©rimÃ¨tre V1 / Alpha :

- liste des modÃ¨les horaires ;
- crÃ©ation ;
- modification ;
- duplication ;
- dÃ©sactivation ;
- rÃ©activation ;
- archivage ;
- consultation des archivÃ©s ;
- dÃ©sarchivage / restauration ;
- aucune suppression physique ;
- nom complet de gestion ;
- libellÃ© court Planning ;
- type de vÃ©hicule ;
- horaires ;
- composition attendue ;
- base / dÃ©pÃ´t facultative ;
- statut ;
- compteur "Nb utilisÃ©" ;
- actions sensibles tracÃ©es dans l'audit.

RÃ¨gles Planning :

- un modÃ¨le sert de base de crÃ©ation pour une affectation Planning ;
- une affectation crÃ©Ã©e reste indÃ©pendante du modÃ¨le ;
- modifier un modÃ¨le ne modifie pas automatiquement les affectations dÃ©jÃ  crÃ©Ã©es ;
- seuls les modÃ¨les actifs et non archivÃ©s sont proposÃ©s normalement ;
- le compteur "Nb utilisÃ©" augmente quand une affectation est crÃ©Ã©e depuis le modÃ¨le.

Jours actifs et horaires par jour :

- un modÃ¨le peut dÃ©finir facultativement les jours oÃ¹ il est actif ;
- un modÃ¨le peut dÃ©finir des horaires diffÃ©rents selon les jours ;
- ces informations restent facultatives pour les modÃ¨les gÃ©nÃ©riques ;
- si un modÃ¨le avec jours actifs est appliquÃ© Ã  une semaine, les jours travaillÃ©s et repos peuvent Ãªtre dÃ©duits automatiquement dans la vue semaine.

Exemple :

- jeudi : 21h â†’ 7h J+1 ;
- vendredi : 21h â†’ 7h J+1 ;
- samedi : 19h â†’ 5h J+1 ;
- dimanche : 19h â†’ 5h J+1 ;
- lundi Ã  mercredi : repos automatiquement dÃ©duit.

Distinction TPMR Ã  prÃ©voir :

- TPMR VSL ;
- TPMR TAXI.

La couleur ne doit pas Ãªtre dÃ©finie rigidement par le modÃ¨le.  
La couleur sert de repÃ¨re visuel choisi par l'utilisateur qui fait le planning.

---

## 9. SociÃ©tÃ©

La page **SociÃ©tÃ©** est le profil permanent de la sociÃ©tÃ©.

PÃ©rimÃ¨tre V1 / Alpha :

- consultation du profil sociÃ©tÃ© ;
- mode consultation sÃ©parÃ© du mode modification ;
- informations gÃ©nÃ©rales ;
- adresse principale ;
- contacts sociÃ©tÃ© multiples ;
- paramÃ¨tres gÃ©nÃ©raux ;
- informations mÃ©tier confirmÃ©es ;
- rÃ©sumÃ© simple de configuration avec accÃ¨s "Continuer la mise en route" ;
- responsables applicatifs affichÃ©s automatiquement depuis les utilisateurs Admin / GÃ©rant ;
- contact administratif ou reprÃ©sentant lÃ©gal renseignÃ© manuellement ;
- plusieurs contacts sociÃ©tÃ© dÃ¨s l'Alpha ;
- types de contacts possibles : reprÃ©sentant lÃ©gal, contact administratif, contact facturation, responsable exploitation ou autre contact utile ;
- modifications sensibles tracÃ©es dans l'audit.

RÃ¨gles importantes :

- un contact sociÃ©tÃ© n'est pas automatiquement un utilisateur applicatif ;
- responsables applicatifs non modifiÃ©s depuis SociÃ©tÃ© ;
- dÃ©sactivation, suspension, archivage ou suppression d'une sociÃ©tÃ© exclus de l'Alpha ;
- utilisateurs terrain sans accÃ¨s par dÃ©faut Ã  SociÃ©tÃ©.

---

## 10. DÃ©pÃ´ts / Bases

La page **DÃ©pÃ´ts / Bases** gÃ¨re les lieux de rÃ©fÃ©rence de la sociÃ©tÃ©.

PÃ©rimÃ¨tre V1 / Alpha :

- notion simple base / dÃ©pÃ´t ;
- pas de distinction technique obligatoire entre Base, DÃ©pÃ´t, Point d'exploitation ou Autre ;
- liste principale ;
- crÃ©ation ;
- modification ;
- responsable local optionnel ;
- compteur utilisateurs rattachÃ©s ;
- compteur vÃ©hicules rattachÃ©s ;
- statut actif / inactif ;
- archivage ;
- consultation des archivÃ©s ;
- dÃ©sarchivage / restauration ;
- aucune suppression physique ;
- actions sensibles tracÃ©es dans l'audit.

RÃ¨gles importantes :

- nom obligatoire et unique dans la sociÃ©tÃ© ;
- adresse recommandÃ©e mais non obligatoire ;
- responsable local = utilisateur existant, sans permissions automatiques ;
- rattachements principalement gÃ©rÃ©s depuis Utilisateurs et VÃ©hicules ;
- modification d'un dÃ©pÃ´t / base ne dÃ©tache pas automatiquement les Ã©lÃ©ments rattachÃ©s ;
- base / dÃ©pÃ´t guide le Planning mais ne bloque pas automatiquement les affectations ;
- archivage ou dÃ©sactivation possible mÃªme avec rattachements, avec avertissement simple.

---

## 11. Mise en route

La page **Mise en route** remplace l'ancien nom Onboarding.

Elle reste sÃ©parÃ©e de la page SociÃ©tÃ©.

PÃ©rimÃ¨tre V1 / Alpha :

- assistant / checklist de configuration initiale ;
- suivi d'avancement ;
- accÃ¨s rapides vers les pages mÃ©tier ;
- profil sociÃ©tÃ© ;
- dÃ©pÃ´ts / bases ;
- utilisateurs ;
- vÃ©hicules ;
- modÃ¨les horaires ;
- planning initial ;
- import Ã©ventuel non bloquant ;
- vÃ©rification finale simple.

RÃ¨gles importantes :

- Mise en route ne remplace pas les pages mÃ©tier ;
- SociÃ©tÃ© reste le profil permanent ;
- Mise en route reste l'assistant de configuration initiale ;
- les formulaires complets restent dans les pages concernÃ©es ;
- Admin / GÃ©rant par dÃ©faut ;
- utilisateur autorisÃ© si permission dÃ©diÃ©e ;
- utilisateurs terrain sans accÃ¨s par dÃ©faut.

Statuts possibles :

- Ã€ faire ;
- En cours ;
- ComplÃ©tÃ© ;
- Ã€ vÃ©rifier ;
- IgnorÃ© / reportÃ© si utile.

---

## 12. Audit

La page **Audit** centralise la traÃ§abilitÃ© des actions importantes.

PÃ©rimÃ¨tre V1 / Alpha :

- consultation des Ã©vÃ©nements d'audit ;
- filtre par pÃ©riode ;
- filtre par module ;
- filtre par action ;
- filtre par auteur ;
- filtre par Ã©lÃ©ment concernÃ© ;
- recherche rapide ;
- dÃ©tail d'une entrÃ©e ;
- contrÃ´le d'accÃ¨s par rÃ´le et permission ;
- cloisonnement sociÃ©tÃ© ;
- audit des actions sensibles ;
- audit support renforcÃ© si rÃ´le support utilisÃ©.

Actions tracÃ©es selon modules :

- connexions et accÃ¨s si disponibles ;
- actions utilisateurs ;
- actions vÃ©hicules ;
- suivi des vÃ©hicules ;
- modÃ¨les horaires ;
- sociÃ©tÃ© ;
- dÃ©pÃ´ts / bases ;
- planning ;
- mise en route si applicable.

RÃ¨gles importantes :

- Audit ne modifie pas les donnÃ©es mÃ©tier ;
- les pages mÃ©tier peuvent afficher un historique minimal ;
- Audit centralise la consultation plus complÃ¨te ;
- informations sensibles masquÃ©es selon permissions ;
- accÃ¨s par dÃ©faut Admin / GÃ©rant ;
- permission dÃ©diÃ©e pour les autres profils.

---

## 13. Pages / modules futurs identifiÃ©s

Modules ou pages futurs Ã  garder en mÃ©moire :

- Heures / Horaires ;
- gestion avancÃ©e des heures pour Alpha mobile ;
- planification automatique en Beta ;
- affectation automatique optimisÃ©e en Beta ;
- scoring / Ã©quilibrage / optimisation plus tard ;
- missions / courses / transports patients en trÃ¨s long terme ;
- rÃ©gulation opÃ©rationnelle temps rÃ©el en trÃ¨s long terme ;
- facturation en trÃ¨s long terme ;
- paie / RH avancÃ©e en long terme ;
- notifications avancÃ©es ;
- confirmation de lecture ;
- version mobile ;
- signature Ã©lectronique ;
- preuve mobile ;
- maintenance avancÃ©e / entretiens vÃ©hicules.

---

## 14. Points Ã  confirmer

Points transverses restant Ã  confirmer :

- INFORMATION NON FOURNIE â€” Ã€ CONFIRMER : gestion exacte des annÃ©es avec semaine 53 et rÃ¨gle de numÃ©rotation des semaines.
- INFORMATION NON FOURNIE â€” Ã€ CONFIRMER : comportement exact lors de la publication d'une semaine contenant encore un besoin obligatoire non couvert.
- INFORMATION NON FOURNIE â€” Ã€ CONFIRMER : rÃ¨gles prÃ©cises de compatibilitÃ© entre rÃ´les utilisateurs, modÃ¨les horaires et types de vÃ©hicules.
- INFORMATION NON FOURNIE â€” Ã€ CONFIRMER : rÃ¨gles exactes de traitement, suivi ou Ã©quilibrage des samedis, dimanches, week-ends complets et jours fÃ©riÃ©s.
- INFORMATION NON FOURNIE â€” Ã€ CONFIRMER : dÃ©tail exact des informations sensibles visibles ou masquÃ©es dans chaque vue Planning selon permissions.
- INFORMATION NON FOURNIE â€” Ã€ CONFIRMER : rÃ¨gles ARS exactes pour vÃ©rifications et dÃ©sinfections.
- INFORMATION NON FOURNIE â€” Ã€ CONFIRMER : formalisation exacte du champ ou sous-type permettant de distinguer TPMR VSL et TPMR TAXI dans le rÃ©fÃ©rentiel VÃ©hicules.
- INFORMATION NON FOURNIE â€” Ã€ CONFIRMER : noms techniques dÃ©finitifs des permissions par module.
- INFORMATION NON FOURNIE â€” Ã€ CONFIRMER : durÃ©e de conservation des Ã©vÃ©nements d'audit.
- INFORMATION NON FOURNIE â€” Ã€ CONFIRMER : pÃ©rimÃ¨tre exact des imports en Alpha.

