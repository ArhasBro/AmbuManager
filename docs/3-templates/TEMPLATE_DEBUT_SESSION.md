# TEMPLATE_DEBUT_SESSION.md
⚠️ OUVERTURE OFFICIELLE DE SESSION — IA

Projet : Investissement  
Sous-projet : Ambulance Manager

RÈGLES DE SOURCE (NON NÉGOCIABLES)  
- Sources autorisées : documentation officielle du projet + CODE si fourni  
- Les documents fournis priment sur toute mémoire interne de l’IA  
- Si une info manque : "INFORMATION NON FOURNIE — À CONFIRMER"  
- En cas de contradiction : CODE > DOCUMENTATION (ordre d’autorité du protocole)  
- Aucune reconstruction de contexte non sourcée  
- Validation utilisateur uniquement via : "VALIDÉ :" ou "AUTORISÉ :"

PACK DOCUMENTAIRE FOURNI (OBLIGATOIRE À RENSEIGNER)  
- DOCUMENT_MAITRE.md : version à renseigner
- DOCUMENT_CADRAGE_FONCTIONNEL.md : base officielle produit
- PLAN_DE_DEVELOPPEMENT.md : version à renseigner
- ETAT_GLOBAL_PROJET.md : version à renseigner
- REGISTRE_DECISIONS.md : version à renseigner
- RECAP_DISCUSSIONS.md : version à renseigner
- STRUCTURE_PROJET.md : version à renseigner
- SOURCES_AUTORISEES.md : version à renseigner
- STRUCTURE_DOCS.md : version à renseigner
- PROTOCOLE_SESSION.md : version à renseigner

RAPPEL PRIORITAIRE  
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md` constitue la base officielle produit.
- Ne pas revenir sur ce cadrage sans demande explicite.
- Le plan de développement ne doit pas être considéré comme source autonome de périmètre produit s’il contredit le cadrage validé.

CONTEXTE DE SESSION  
- ID SESSION : à renseigner
- Version cible : à renseigner
- Phase / bloc : à renseigner
- Objectif unique de la session : à renseigner
- Session de clôture de bloc : Oui / Non
- Dossier de clôture dédié : à renseigner / Sans objet

RÈGLE DE TRAVAIL  
- 1 session = 1 point clair
- 1 fonctionnalité
- 1 patch
- 1 DoD
- 1 validation
- 1 ZIP documentaire
- en fin de bloc : 1 session dédiée de clôture explicite

RÈGLE IMPÉRATIVE — GOUVERNANCE DES PATCHS

Appliquer strictement les règles suivantes :

1. Le premier patch produit pour la session est le **patch principal de référence**.
2. Si ce patch principal a déjà été appliqué, il est **interdit** de régénérer un patch complet rejouant toute la session.
3. Toute correction ultérieure doit être fournie sous forme de **patch correctif minimal séparé**.
4. Un patch correctif ne doit contenir **que** les modifications restantes à apporter.
5. Les fichiers documentaires `.md` ne doivent **pas** être mélangés au patch principal code.
6. Les documents de session doivent être mis à jour **à la fin**, une fois le code validé, dans un **patch documentaire séparé**.

### Nommage attendu
- patch principal : `XXX.diff`
- correctif : `XXX_FIX-01.diff`
- documentation finale : `XXX_DOCS.diff`

Précision importante :
les fichiers documentaires de session (`SESSION.md`, `NOTES.md`, `EVIDENCES.md`, `RESULTATS.md`, `FIN_SESSION.md`) sont créés automatiquement lors de l’ouverture de session.
le fichier documentaire de patches (`README.md`) est créé automatiquement lors de l’ouverture de session.

### Interdictions
- ne pas rejouer tout le patch principal dans un correctif ;
- ne pas produire un patch global de remplacement si seul un fix est attendu ;
- ne pas mélanger inutilement code et documentation finale.

RÈGLE IMPÉRATIVE — CLÔTURE DE BLOC

Quand une session correspond à la fin d’un bloc, appliquer strictement les règles suivantes :

1. la clôture du bloc doit être traitée dans une **session dédiée** ;
2. cette session est de type **VALIDATION** ;
3. elle vérifie le code réel, les patchs réels, la documentation finale et les validations terminales ;
4. elle peut produire **un unique correctif final minimal** si un résiduel subsiste ;
5. elle doit rendre le verdict obligatoire :
   - `BLOC <ID> CLÔTURABLE DÉFINITIVEMENT : OUI`
   - ou `BLOC <ID> CLÔTURABLE DÉFINITIVEMENT : NON`
6. aucun passage au bloc suivant n’est autorisé sans ce verdict explicite.

### Convention de dossier
- dossier dédié de fin de bloc, par exemple : `4-CLOTURE_A2`
- session attendue dans le plan : `CLOTURE_<BLOC>`

CONTRAINTE  
- Ne traiter que le périmètre validé
- Ne pas élargir le scope
- Ne pas produire de code non demandé
- Si un doute existe : "INFORMATION NON FOURNIE — À CONFIRMER"