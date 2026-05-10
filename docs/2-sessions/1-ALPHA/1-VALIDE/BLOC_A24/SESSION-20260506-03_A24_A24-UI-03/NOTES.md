# NOTES

## Methode de production

1. Lecture documentaire obligatoire : `DOCUMENT_MAITRE.md`, `PLAN_DE_DEVELOPPEMENT.md`.
2. Lecture ciblee A24 : `REFERENCE_UI_UX_A24.md`, `README_MAQUETTES_A24.md`, `SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`, mapping icones.
3. Relecture des sessions A24-UI-01 et A24-UI-02 (FIN_SESSION) pour respecter le socle.
4. Audit code existant Login/Dashboard/styles.
5. Captures AVANT sur etat pre-patch (retour temporaire des 3 fichiers a `HEAD`, captures puis restauration).
6. Corrections code ciblees sur Login + Dashboard + styles associes.
7. Captures APRES sur etat final.
8. Validations terminales (`npm run lint`, `npm run build`).
9. Generation patch principal code, controle encodage, controle applicabilite.
10. Finalisation documentaire + patch documentaire + ZIP final.

## Arbitrages

- Pas de refonte metier ; uniquement du realignement visuel.
- Conservation des assets generiques existants (pas d'introduction d'assets marque externes absents du depot).
- Utilisation de Lucide React pour les icones generiques Login/Dashboard.
- Theme clair conserve prioritaire ; mode sombre ajuste uniquement pour Login/Dashboard.
- La checkbox `Se souvenir de moi` est conservee dans l'UI. Son comportement complet n'est pas etendu dans ce correctif minimal et reste a traiter dans une session dediee si necessaire.
