# TEMPLATE_DEBUT_SESSION.md

⚠️ OUVERTURE OFFICIELLE DE SESSION — IA

Projet : Investissement  
Sous-projet : Ambulance Manager

## 1. Lecture documentaire

Ne pas relire automatiquement toute la documentation de `./docs/1-master`.

### Lecture obligatoire
- `./docs/1-master/DOCUMENT_MAITRE.md`
- `./docs/1-master/PLAN_DE_DEVELOPPEMENT.md`

### Lecture complémentaire uniquement si utile à la session
- `./docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `./docs/1-master/ETAT_GLOBAL_PROJET.md`
- `./docs/1-master/REGISTRE_DECISIONS.md`
- `./docs/1-master/RECAP_DISCUSSIONS.md`
- `./docs/1-master/STRUCTURE_PROJET.md`
- documentation de la session précédente validée si elle sert de base
- tout document strictement nécessaire au périmètre traité

Règle :
- lecture ciblée uniquement ;
- aucun élargissement documentaire inutile.

---

## 2. Règles de source

- Sources autorisées : documentation officielle du projet + CODE si fourni
- Les documents fournis priment sur toute mémoire interne de l’IA
- Si une info manque : `INFORMATION NON FOURNIE — À CONFIRMER`
- En cas de contradiction : `CODE > DOCUMENTATION`
- Aucune reconstruction de contexte non sourcée
- Validation utilisateur uniquement via : `VALIDÉ :` ou `AUTORISÉ :`

---

## 3. Contexte de session

- ID SESSION : à renseigner
- Stage / version cible : à renseigner
- Bloc : à renseigner
- Type de session : à renseigner
- Intitulé exact : à renseigner
- Objectif unique de la session : à renseigner
- Session précédente validée servant de base : à renseigner / Sans objet
- Session de clôture de bloc : Oui / Non
- Dossier de clôture dédié : à renseigner / Sans objet

---

## 4. Utilisation des outils

- **Production = Codex**
- **Production = Codex** produit aussi la documentation finale et le ZIP documentaire
- **Contrôle qualité = ChatGPT**
- **Contrôle = vérification**, pas rejoue de production

Règle pratique :
- si la session touche au dépôt, au code, aux fichiers, aux patchs, aux commandes, aux tests ou aux validations techniques → **Codex**
- si la session consiste à contrôler, vérifier, cadrer ou demander des corrections → **ChatGPT**

---

## 5. Règle de travail

- 1 session = 1 point clair
- 1 fonctionnalité ou 1 périmètre clair
- 1 livrable principal
- 1 DoD
- 1 validation
- 1 documentation finale en ZIP
- en fin de bloc : 1 session dédiée de clôture selon le plan officiel

---

## 6. Règle patch-first en production

Si la session implique une modification du code :

1. produire d’abord un **patch principal unique `.diff`**
2. appliquer ensuite ce patch au dépôt
3. lancer ensuite les validations terminales
4. si nécessaire, produire un **patch correctif minimal séparé**
5. ne jamais rejouer tout le patch principal dans un correctif

Règles associées :
- ne pas commencer par modifier les fichiers un par un de manière dispersée ;
- ne pas produire de patch si la session n’en exige pas réellement ;
- pour un **AUDIT** ou une **VALIDATION**, ne pas forcer artificiellement un patch ;
- produire ensuite la documentation finale de session ;
- produire ensuite le ZIP documentaire final.

### Nommage attendu
- patch principal : `XXX.diff`
- correctif minimal : `XXX_FIX-01.diff`
- correctif minimal suivant : `XXX_FIX-02.diff`
- `README_PATCH.md` si un patch réel existe
- `NO_PATCH.md` si applicable
- documentation finale : ZIP de session

---

## 7. Validations terminales

- Les validations doivent être réellement lancées si le code est modifié
- Ne jamais inventer un résultat `OK`
- Si une commande ne peut pas être exécutée, l’indiquer avec justification factuelle
- Ne lancer que les commandes pertinentes pour la session

Exemples :
- `npm run lint`
- `npm run build`
- `npx prisma validate`
- `npx prisma generate`

---

## 8. Clôture de bloc

Si la session est une clôture de bloc :

- respecter le type prévu par le plan officiel ;
- vérifier le code réel, les patchs réels, la documentation finale et les validations réellement relancées ou constatées ;
- produire au maximum un unique correctif final minimal si nécessaire ;
- rendre obligatoirement l’un des verdicts suivants :
  - `BLOC <ID> CLÔTURABLE DÉFINITIVEMENT : OUI`
  - `BLOC <ID> CLÔTURABLE DÉFINITIVEMENT : NON`

Aucun passage au bloc suivant sans ce verdict explicite.

---

## 9. Sortie attendue selon l’outil

### Production avec Codex
- patch principal `.diff` si nécessaire
- application du patch
- validations terminales
- correctif minimal séparé si nécessaire
- `README_PATCH.md` si patch réel
- `NO_PATCH.md` si applicable
- documentation finale de session
- ZIP documentaire final

### Contrôle avec ChatGPT
- analyse de la réponse de production uniquement
- vérification méthodologique
- identification de ce qui est conforme / non conforme
- vérification du patch, des validations, de la documentation finale et du ZIP
- prompt de retour si nécessaire

---

## 10. Contraintes finales

- Ne traiter que le périmètre validé
- Ne pas élargir le scope
- Ne pas produire de code non demandé
- Ne pas mélanger plusieurs blocs non demandés
- Si un doute existe : `INFORMATION NON FOURNIE — À CONFIRMER`
- Toute réponse doit être claire, structurée, traçable et exploitable