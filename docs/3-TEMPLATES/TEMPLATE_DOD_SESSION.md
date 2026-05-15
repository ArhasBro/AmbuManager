# TEMPLATE_DOD_SESSION.md

## Identification

- Session : `SESSION-YYYYMMDD-XX`
- Type : `AUDIT | CORRECTION | COMPLÉTION | VALIDATION | CLOTURE | DOCUMENTAIRE | REBASAGE`
- Objectif annoncé : à renseigner

## Checklist DoD générique

- [ ] Objectif atteint
- [ ] Périmètre respecté
- [ ] Fichiers modifiés conformes au périmètre autorisé
- [ ] Fichiers interdits non modifiés
- [ ] Code applicatif non modifié si hors périmètre
- [ ] Plan officiel non modifié si hors périmètre
- [ ] Maquettes non déplacées si hors périmètre
- [ ] Preuves terminales fournies
- [ ] Sortie `git status --short` fournie
- [ ] Sortie `git diff -- <chemins concernés>` fournie si modification
- [ ] Patch / fichier `.diff` créé seulement si explicitement demandé
- [ ] ZIP versionné attendu uniquement si Nathan le fournit ensuite pour contrôle
- [ ] Points à confirmer listés avec `INFORMATION NON FOURNIE — À CONFIRMER`

## Validation finale

- Validation utilisateur explicite reçue : `VALIDÉ :` ou `AUTORISÉ :`
- Verdict final session : `OUI / NON`
- Prochaine étape recommandée : à renseigner

## Remarques

Ce template est générique et s'applique aux sessions : audit, correction, complétion, validation, clôture, rebasage, documentaire.
Il n'autorise jamais une action interdite par le prompt de session actif.
