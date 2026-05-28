# NOTES

Notes de travail de la session.

---

## Methode / observations

Methode appliquee :

1. Lecture des documents obligatoires de session.
2. Comparaison structure reference vs structure session cible.
3. Inspection statique des fichiers shell/navigation/routes et pages module.
4. Extraction des preuves par lignes (`Select-String`, `rg`).
5. Synthese des ecarts legacy et non autorise UI.
6. Correction documentaire de la structure de session (sans patch code).

Observations synthetiques :

- La structure session cible etait incomplete (seul `SESSION.md`).
- La reference impose aussi `NOTES.md`, `EVIDENCES.md`, `RESULTATS.md`, `FIN_SESSION.md`, dossier `PATCH/`.
- Les libelles legacy principaux identifies sont `Templates` et `Onboarding`.
- Le comportement UI non autorise n'est pas uniforme entre modules.
- Correction appliquee strictement au dossier session autorise.
