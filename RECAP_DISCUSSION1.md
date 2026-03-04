# RECAP_DISCUSSIONS

## Date

04/03/2026

---

## Contexte

Cette session de travail concerne le projet **Investissement**, sous-projet **Ambulance Manager**.  
La discussion était centrée sur la **définition et la stabilisation d’un protocole officiel de session IA** afin de structurer le travail, éviter la dérive, empêcher toute reconstruction de contexte, et verrouiller la cohérence documentaire.

Le contenu principal de la session a consisté à analyser des propositions de protocole, identifier incohérences et oublis, puis faire évoluer le document **PROTOCOLE_SESSION.md** jusqu’à une version considérée comme stable (**v1.0.2**).

---

## Objectif de la session

Obtenir un protocole de session **parfait, stable et reproductible** pour travailler avec l’IA sur Ambulance Manager, incluant :

- documents à fournir en début/fin de session
- documents à modifier en clôture
- règles de sources autorisées
- hiérarchie documentaire
- versionning par document
- gestion des décisions (DEC/PEND)
- stabilité / freeze
- templates d’ouverture et de clôture.

---

## Travail réalisé

- Analyse des réponses d’une autre IA concernant un protocole de session.
- Détection d’incohérences et d’oublis (notamment autour de la structure projet et des règles de sources).
- Décision de remplacer `structure.txt` par **`STRUCTURE_PROJET.md`**.
- Rédaction et amélioration progressive du protocole jusqu’à la version **v1.0.2**, incluant :
  - liste officielle des **sources autorisées** (7 documents) + CODE si fourni
  - définition stricte de “CODE si fourni”
  - définition stricte de la validation utilisateur (“VALIDÉ :” / “AUTORISÉ :”)
  - hiérarchie documentaire (ordre d’autorité) incluant `STRUCTURE_PROJET.md`
  - règles de versionning **MAJOR.MINOR.PATCH** définies par type de document
  - définition du format **ID SESSION** : `SESSION-YYYYMMDD-XX`
  - règles anti-duplication DEC/PEND + règle “ne jamais modifier un DEC/PEND existant”
  - définition des statuts de stabilité **GREEN / YELLOW / RED**
  - règles minimales de **Freeze** (activation, levée, comportement)
  - définition des packs documentaires :
    - pack d’ouverture (début de session)
    - pack de clôture (fin de session) + sorties minimales obligatoires
  - intégration de templates officiels (ouverture / clôture) directement dans le protocole.
- Création de prompts pour réafficher des fichiers `.md` validés à copier-coller (notamment pour les 3 templates demandés).

---

## Décisions prises

- Adoption du fichier **`STRUCTURE_PROJET.md`** comme référence officielle de la structure projet, en remplacement de `structure.txt`.
- Validation de **`PROTOCOLE_SESSION.md`** en version **v1.0.2** comme norme officielle stable.
- Adoption du format d’identification des sessions : **`SESSION-YYYYMMDD-XX`**.
- Adoption d’une validation utilisateur strictement explicite via : **"VALIDÉ :"** ou **"AUTORISÉ :"**.
- Adoption des règles :
  - **CODE > DOCUMENTATION** en cas de contradiction
  - anti-duplication DEC/PEND
  - “ne jamais modifier un DEC/PEND existant”
  - sorties minimales obligatoires en clôture.

---

## Documents modifiés

INFORMATION NON FOURNIE — À CONFIRMER

---

## Versions documentaires

- PROTOCOLE_SESSION.md → v1.0.2  
- STRUCTURE_PROJET.md → INFORMATION NON FOURNIE — À CONFIRMER  
- DOCUMENT_MAITRE.md → INFORMATION NON FOURNIE — À CONFIRMER  
- PLAN_DE_DEVELOPPEMENT.md → INFORMATION NON FOURNIE — À CONFIRMER  
- ETAT_GLOBAL_PROJET.md → INFORMATION NON FOURNIE — À CONFIRMER  
- REGISTRE_DECISIONS.md → INFORMATION NON FOURNIE — À CONFIRMER  
- RECAP_DISCUSSIONS.md → INFORMATION NON FOURNIE — À CONFIRMER  

---

## Prochaine étape logique

Appliquer ce protocole en conditions réelles :

- générer / maintenir les 7 documents de référence selon la norme
- utiliser les templates d’ouverture et de clôture à chaque session
- produire les fichiers `.md` validés (notamment les templates) pour intégration dans le dépôt du projet.

---

## Point exact de reprise

Version : v1.0.2 (PROTOCOLE_SESSION.md)  
Phase : INFORMATION NON FOURNIE — À CONFIRMER  
Module : Protocole de session IA / Gouvernance documentaire  
Bloc : Stabilisation protocole + extraction des templates `.md` validés  
Fichiers concernés :  
- PROTOCOLE_SESSION.md  
- STRUCTURE_PROJET.md  
- TEMPLATE_DEBUT_SESSION.md  
- TEMPLATE_DOD_4_4.md  
- TEMPLATE_FIN_SESSION.md  

---

## Statut global du projet

GREEN — Le protocole de session IA a été stabilisé (v1.0.2) et les règles structurantes sont en place, sans blocage identifié dans la discussion.