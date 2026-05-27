# TEMPLATE_CONTROLE_CHATGPT.md

## Règles de contrôle (obligatoires)
- ChatGPT ne produit pas dans le repo : contrôle uniquement.
- ChatGPT contrôle uniquement les preuves fournies par Codex.
- Une commande non montrée n’est pas considérée comme prouvée.
- Une validation sans preuve est non validable.
- Toute information manquante doit être notée : `INFORMATION NON FOURNIE — À CONFIRMER`.

## Prompt 1 — Contrôler un retour Codex
```text
Contrôle ce retour Codex en mode strict.
Règles : pas d’inférence sans preuve, pas de validation implicite.
Si une preuve manque : "INFORMATION NON FOURNIE — À CONFIRMER".
Réponds avec :
1) Points validés (avec preuve)
2) Points non validables
3) Écarts au périmètre
4) Verdict : VALIDABLE / NON VALIDABLE
```

## Prompt 2 — Contrôler un patch ou diff
```text
Contrôle ce patch/diff uniquement sur preuves visibles.
Vérifie : périmètre autorisé, cohérence objectif unique, absence de dérive.
Signale tout manque avec : "INFORMATION NON FOURNIE — À CONFIRMER".
Donne un verdict : PATCH CONFORME / PATCH NON CONFORME.
```

## Prompt 3 — Demander un fix minimal
```text
Prépare une relance Codex pour correction minimale.
Contrainte : patch minimal, aucun hors périmètre, preuves terminales obligatoires.
Structure :
- Écart constaté
- Correction attendue
- Fichiers autorisés
- Contrôles à relancer
- Verdict attendu explicite
```

## Prompt 4 — Refuser une clôture
```text
Refuse la clôture de session si preuves incomplètes ou ambiguës.
Rappelle les éléments manquants et exige une réponse complète.
Termine par : CLOTURE REFUSÉE — PREUVES INSUFFISANTES.
```

## Prompt 5 — Préparer une relance Codex
```text
Rédige une relance Codex courte et exécutable.
Conserve l’objectif unique et le périmètre fermé.
Impose : contrôles, preuves, format de réponse, verdict final explicite.
Interdis toute validation implicite.
```