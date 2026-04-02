# SESSION

Projet : Investissement  
Sous-projet : Ambulance Manager  
Session : SESSION-20260401-01_A5_RULES-01  
Bloc : A5 — Règles métier et paramètres société  
Type : AUDIT  
Version cible : 1-ALPHA

## Objectif unique
Audit complet du module `company rules` réellement présent dans le dépôt actuel.

## Périmètre prévu
- modèle `CompanyRule`
- enum `RuleMode`
- route `app/api/company/rules/route.ts`
- usages côté planning
- usages côté autoschedule
- permissions réelles utilisées
- écart réel vs cadrage du module 08

## Sources utilisées
- `docs/1-master/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- code réel du dépôt joint
