# SUIVI AUDIT DOCUMENTAIRE UI/UX A26

Date : 15/05/2026  
Périmètre : `docs/1-MASTER/**` + `docs/2-SESSIONS/1-ALPHA/BLOC_A26/PROMPTS_A26_PRODUCTION_CONTROLE_V1_0.md`  
Type : chantier documentaire transversal (sans code applicatif)

## 1. Résumé du chantier documentaire
Audit transversal effectué sur les références UI/UX et les documents maîtres pour fiabiliser les chemins de maquettes, clarifier la hiérarchie d’autorité visuelle et supprimer les ambiguïtés de structure A26 (visuel 99 %, non fonctionnel). Les références obsolètes ont été corrigées ou explicitement marquées comme obsolètes. Les documents de référence page ont été renforcés pour pointer vers des PNG officiels vérifiables.

## 2. Liste complète des fichiers contrôlés
| Fichier | Section / ligne | Problème constaté | Correction appliquée | Statut |
|---|---|---|---|---|
| `docs/1-MASTER/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md` | Global | Priorités et chemin maquette partiellement ambigus | Hiérarchie clarifiée + dossiers maquettes officiels explicités | corrigé |
| `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md` | §20.3–20.5 | Chemins docs en minuscule (`docs/1-master`, `docs/2-sessions`) | Chemins normalisés (`docs/1-MASTER`, `docs/2-SESSIONS`) | corrigé |
| `docs/1-MASTER/DOCUMENT_MAITRE.md` | §10.1 | Référence maquette trop générique | Référence Planning précisée vers le dossier officiel | corrigé |
| `docs/1-MASTER/ETAT_GLOBAL_PROJET.md` | Global | Terminologie historique ambiguë | Normalisation terminologique vers maquettes PNG officielles | corrigé |
| `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md` | Bloc A24 | Référence visuelle ambiguë | Clarification de la source visuelle prioritaire | corrigé |
| `docs/1-MASTER/RECAP_DISCUSSIONS.md` | Entrées A24 | Référence historique non explicitée | Terminologie harmonisée | corrigé |
| `docs/1-MASTER/REGISTRE_DECISIONS.md` | Entrées A24/A25 | Ancien chemin Planning imbriqué A21 | Chemins PNG Planning corrigés vers arborescence officielle | corrigé |
| `docs/1-MASTER/RGPD_BASE_MINIMALE.md` | Global | Aucun écart relevant UI/UX A26 | Pas de changement nécessaire | conforme |
| `docs/1-MASTER/STRUCTURE_PROJET.md` | Arborescence historique | Présence de segments A21 historiques | Conservé comme photographie historique de structure | clarifié |
| `docs/1-MASTER/_INDEX_MASTER.md` | Références racine | Formulations historiques ambiguës | Références harmonisées sur maquettes PNG officielles | corrigé |
| `docs/1-MASTER/1-MAQUETTE/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md` | Références sessions | Ancien chemin `docs/2-sessions` | Chemins normalisés `docs/2-SESSIONS` | corrigé |
| `docs/1-MASTER/1-MAQUETTE/README_MAQUETTES_A24.md` | Règles de source | Références de chemin partiellement héritées | Chemins/règles alignés sur l’arborescence actuelle | corrigé |
| `docs/1-MASTER/1-MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md` | Global | Aucun chemin bloquant détecté pour A26 | Pas de changement nécessaire | conforme |
| `docs/1-MASTER/2-REFERENCE_UI_UX/README_PACK_REFERENCE_UI_UX.md` | Global | Pas d’écart bloquant détecté | Pas de changement nécessaire | conforme |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md` | §nomenclature chemins | Chemins obsolètes cités sans étiquette explicite | Marquage explicite `FORMES OBSOLÈTES` | clarifié |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A24.md` | §source officielle | Référence dossier trop générique | Dossiers maquettes officiels explicités | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A25_PLANNING.md` | §1.1 | Noms PNG sans chemins complets | Chemins absolus des 2 PNG ajoutés | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_AUDIT.md` | §1.1 | Formulation source visuelle ambiguë | Référence explicite au PNG de section 2.2 | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_COMPANY.md` | §1.1 | Formulation source visuelle ambiguë | Référence explicite au PNG de section 2.2 | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_DASHBOARD.md` | Règle icônes | Formulation héritée ambiguë | Mention du dossier historique `ICONE/ICONES` neutralisé | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_DEPOTS_BASES.md` | §1.1 | Formulation source visuelle ambiguë | Référence explicite au PNG de section 2.2 | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md` | Chemins de maquettes | Restes de segments A21 obsolètes + anciens chemins MAQUETTE | Chemins corrigés vers dossiers officiels actuels | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_LOGIN.md` | Règle icônes | Formulation héritée ambiguë | Mention du dossier historique `ICONE/ICONES` neutralisé | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_ONBOARDING.md` | §1.1 | Formulation source visuelle ambiguë | Référence explicite au PNG de section 2.2 | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_PRIVACY.md` | §1.1 | Formulation source visuelle ambiguë | Référence explicite au PNG de section 2.2 | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md` | Règle lecture PNG | Référence visuelle non explicite | Dossiers officiels listés explicitement | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_TEMPLATES.md` | §1.1 | Formulation source visuelle ambiguë | Référence explicite au PNG de section 2.2 | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_USERS_RH.md` | Global | Harmonisation générale post-corrections A26 | Alignement terminologique et chemins maintenus | clarifié |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_VEHICLES.md` | §1.1 | Formulation source visuelle ambiguë | Référence explicite au PNG de section 2.2 | corrigé |
| `docs/2-SESSIONS/1-ALPHA/BLOC_A26/PROMPTS_A26_PRODUCTION_CONTROLE_V1_0.md` | Global | Vérification de cohérence des consignes A26 | Conforme sur périmètre, interdictions, checklist et hiérarchie | conforme |

## 3. Liste des fichiers modifiés
| Fichier | Section / ligne | Problème constaté | Correction appliquée | Statut |
|---|---|---|---|---|
| `docs/1-MASTER/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md` | Hiérarchie | Source PNG trop générique | Dossiers officiels détaillés | corrigé |
| `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md` | §20 | Casse chemins incohérente | Normalisation chemins | corrigé |
| `docs/1-MASTER/DOCUMENT_MAITRE.md` | §10.1 | Référence Planning trop large | Référence dossier Planning officiel | corrigé |
| `docs/1-MASTER/ETAT_GLOBAL_PROJET.md` | Global | Terminologie historique | Harmonisation terminologique | corrigé |
| `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md` | A24 | Ambiguïté d’autorité visuelle | Clarification maquettes PNG officielles | corrigé |
| `docs/1-MASTER/RECAP_DISCUSSIONS.md` | A24 | Terme historique ambigu | Harmonisation terminologique | corrigé |
| `docs/1-MASTER/REGISTRE_DECISIONS.md` | A24/A25 | Chemins Planning obsolètes | Chemins PNG corrigés | corrigé |
| `docs/1-MASTER/_INDEX_MASTER.md` | Références | Ambiguïtés de priorité | Harmonisation | corrigé |
| `docs/1-MASTER/1-MAQUETTE/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md` | Références sessions | Ancienne casse chemins | Normalisation | corrigé |
| `docs/1-MASTER/1-MAQUETTE/README_MAQUETTES_A24.md` | Source A24 | Références héritées | Mise à jour des chemins et libellés | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md` | Chemins obsolètes | Exemples obsolètes non explicités | Ajout `FORMES OBSOLÈTES` | clarifié |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A24.md` | §2 | Référence source imprécise | Listing des 3 dossiers maquettes officiels | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A25_PLANNING.md` | §1.1 | PNG sans chemins complets | Ajout chemins complets | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_AUDIT.md` | §1.1 | Autorité visuelle vague | Renvoi explicite vers section 2.2 | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_COMPANY.md` | §1.1 | Autorité visuelle vague | Renvoi explicite vers section 2.2 | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_DASHBOARD.md` | Règle icônes | Formulation ambiguë | Clarification dossier historique neutralisé | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_DEPOTS_BASES.md` | §1.1 | Autorité visuelle vague | Renvoi explicite vers section 2.2 | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md` | Chemins maquettes | Segments A21 et références obsolètes | Chemins normalisés | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_LOGIN.md` | Règle icônes | Formulation ambiguë | Clarification dossier historique neutralisé | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_ONBOARDING.md` | §1.1 | Autorité visuelle vague | Renvoi explicite vers section 2.2 | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_PRIVACY.md` | §1.1 | Autorité visuelle vague | Renvoi explicite vers section 2.2 | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md` | §procédure | Source PNG non explicitée | Dossiers officiels listés | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_TEMPLATES.md` | §1.1 | Autorité visuelle vague | Renvoi explicite vers section 2.2 | corrigé |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_USERS_RH.md` | Global | Harmonisation après itérations | Clarifications mineures | clarifié |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_VEHICLES.md` | §1.1 | Autorité visuelle vague | Renvoi explicite vers section 2.2 | corrigé |

## 4. Liste des fichiers non modifiés avec justification
| Fichier | Section / ligne | Problème constaté | Correction appliquée | Statut |
|---|---|---|---|---|
| `docs/1-MASTER/RGPD_BASE_MINIMALE.md` | Global | Aucun écart relatif au cadrage UI/UX A26 | Aucune modification nécessaire | conforme |
| `docs/1-MASTER/STRUCTURE_PROJET.md` | Arborescence | Contient des traces historiques A21 dans un dump structurel | Conservé comme historique ; pas utilisé comme référence visuelle codable | clarifié |
| `docs/1-MASTER/1-MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md` | Global | Pas d’erreur de chemin bloquante pour A26 détectée | Aucune modification nécessaire | conforme |
| `docs/1-MASTER/2-REFERENCE_UI_UX/README_PACK_REFERENCE_UI_UX.md` | Global | Conforme au rôle de document de pack | Aucune modification nécessaire | conforme |
| `docs/2-SESSIONS/1-ALPHA/BLOC_A26/PROMPTS_A26_PRODUCTION_CONTROLE_V1_0.md` | Global | Contrôle effectué, pas d’erreur bloquante détectée | Aucune modification nécessaire | conforme |

## 5. Tableau des incohérences trouvées
| Fichier | Section / ligne | Problème constaté | Correction appliquée | Statut |
|---|---|---|---|---|
| Multiples docs `1-MASTER` | Références chemins | Casse de chemins incohérente (`docs/1-master`, `docs/2-sessions`) | Normalisation vers `docs/1-MASTER`, `docs/2-SESSIONS` | corrigé |
| Références UI/UX page | §1.1 Autorité visuelle | Mention dossier maquette trop générique | Renvoi explicite au PNG officiel en section 2.2 | corrigé |
| `REFERENCE_UI_UX_INDEX_MAQUETTES.md` | Inventaire chemins | Segments A21 obsolètes | Chemins remappés vers dossiers officiels actuels | corrigé |
| `REFERENCE_UI_UX_A25_PLANNING.md` | §1.1 | PNG listés sans chemin complet | Chemins absolus ajoutés | corrigé |
| `REFERENCE_CODEX_UI_UX_VISUEL_99.md` | Nomenclature | Exemples obsolètes potentiellement ambigus | Marquage explicite `FORMES OBSOLÈTES` | clarifié |
| `REFERENCE_UI_UX_DASHBOARD.md`, `REFERENCE_UI_UX_LOGIN.md` | Règles icônes | Formulation héritée pouvant induire en erreur | Clarification “dossier historique neutralisé” | corrigé |

## 6. Tableau des chemins corrigés
| Fichier | Section / ligne | Problème constaté | Correction appliquée | Statut |
|---|---|---|---|---|
| Multiples docs | Chemins racine | `docs/1-master/` | `docs/1-MASTER/` | corrigé |
| Multiples docs | Chemins sessions | `docs/2-sessions/` | `docs/2-SESSIONS/` | corrigé |
| `REFERENCE_UI_UX_INDEX_MAQUETTES.md` | Inventaire | `.../A21-UX-03...` / `...A21-UX-04...` / `...A21-UX-05...` | Dossiers officiels V1.0 sans sous-segments obsolètes | corrigé |
| `REGISTRE_DECISIONS.md` | Réf Planning | Ancien chemin imbriqué A21 | `.../2-Planning/Planning_V1.2*.png` | corrigé |
| `REFERENCE_UI_UX_A25_PLANNING.md` | §1.1 | Noms PNG sans chemin complet | Chemins complets des deux PNG | corrigé |

## 7. Tableau des références UI/UX contrôlées
| Fichier | Section / ligne | Problème constaté | Correction appliquée | Statut |
|---|---|---|---|---|
| `REFERENCE_UI_UX_INDEX_MAQUETTES.md` | Global | Inventaire partiellement obsolète | Normalisation et clarification des références | corrigé |
| `REFERENCE_UI_UX_SHELL_GLOBAL.md` | Règles de lecture | Source PNG implicite | Dossiers officiels explicités | corrigé |
| `REFERENCE_CODEX_UI_UX_VISUEL_99.md` | Règles de production | Exemples obsolètes | Étiquetage obsolète explicite | clarifié |
| `REFERENCE_UI_UX_USERS_RH.md` | Global | Vérification structure/layout/autorité | Conforme et clarifié | clarifié |
| `REFERENCE_UI_UX_DASHBOARD.md` | Règles visuelles | Mention icônes ambiguë | Clarification du dossier historique | corrigé |
| `REFERENCE_UI_UX_LOGIN.md` | Règles visuelles | Mention icônes ambiguë | Clarification du dossier historique | corrigé |
| `REFERENCE_UI_UX_A24.md` | Source officielle | Référentiel trop global | Ajout des 3 dossiers maquettes officiels | corrigé |
| `REFERENCE_UI_UX_A25_PLANNING.md` | Références images | Chemins incomplets | Chemins complets ajoutés | corrigé |
| `REFERENCE_UI_UX_AUDIT.md` | §1.1 | Autorité visuelle trop générique | Renvoi explicite au PNG section 2.2 | corrigé |
| `REFERENCE_UI_UX_COMPANY.md` | §1.1 | Autorité visuelle trop générique | Renvoi explicite au PNG section 2.2 | corrigé |
| `REFERENCE_UI_UX_DEPOTS_BASES.md` | §1.1 | Autorité visuelle trop générique | Renvoi explicite au PNG section 2.2 | corrigé |
| `REFERENCE_UI_UX_ONBOARDING.md` | §1.1 | Autorité visuelle trop générique | Renvoi explicite au PNG section 2.2 | corrigé |
| `REFERENCE_UI_UX_PRIVACY.md` | §1.1 | Autorité visuelle trop générique | Renvoi explicite au PNG section 2.2 | corrigé |
| `REFERENCE_UI_UX_TEMPLATES.md` | §1.1 | Autorité visuelle trop générique | Renvoi explicite au PNG section 2.2 | corrigé |
| `REFERENCE_UI_UX_VEHICLES.md` | §1.1 | Autorité visuelle trop générique | Renvoi explicite au PNG section 2.2 | corrigé |

## 8. Tableau des maquettes PNG vérifiées
| Fichier | Section / ligne | Problème constaté | Correction appliquée | Statut |
|---|---|---|---|---|
| `REFERENCE_UI_UX_DASHBOARD.md` | Réf image | Chemin à vérifier | `.../1-Dashboard/Dashboard_V1.png` vérifié | conforme |
| `REFERENCE_UI_UX_A25_PLANNING.md` | Réf images | Chemins incomplets avant correction | `.../2-Planning/Planning_V1.2*.png` vérifiés | corrigé |
| `REFERENCE_UI_UX_USERS_RH.md` | Réf image | Contrôle de chemin | `.../3-Utilisateurs-RH/Utilisateurs-RH_V1.png` vérifié | conforme |
| `REFERENCE_UI_UX_VEHICLES.md` | Réf image | Contrôle de chemin | `.../4-Véhicules/Véhicules_V1.2.png` vérifié | conforme |
| `REFERENCE_UI_UX_TEMPLATES.md` | Réf image | Contrôle de chemin | `.../1-Templates/Templates_V1.1.png` vérifié | conforme |
| `REFERENCE_UI_UX_COMPANY.md` | Réf image | Contrôle de chemin | `.../2-Société-paramètres-métier/Société_V1.0.png` vérifié | conforme |
| `REFERENCE_UI_UX_DEPOTS_BASES.md` | Réf image | Contrôle de chemin | `.../3-Dépôts-bases/Dépôts-bases_V1.0.png` vérifié | conforme |
| `REFERENCE_UI_UX_ONBOARDING.md` | Réf image | Contrôle de chemin | `.../4-Onboarding société pilote/Onboarding_V1.2.png` vérifié | conforme |
| `REFERENCE_UI_UX_AUDIT.md` | Réf image | Contrôle de chemin | `.../5-Audit/Audit_V1.0.png` vérifié | conforme |
| `REFERENCE_UI_UX_LOGIN.md` | Réf image | Contrôle de chemin | `.../1-Login/Login_V1.1.png` vérifié | conforme |
| `REFERENCE_UI_UX_PRIVACY.md` | Réf image | Contrôle de chemin | `.../2-Privacy/Privacy_V1.0.png` vérifié | conforme |

## 9. Tableau des prompts A26 contrôlés
| Fichier | Section / ligne | Problème constaté | Correction appliquée | Statut |
|---|---|---|---|---|
| `docs/2-SESSIONS/1-ALPHA/BLOC_A26/PROMPTS_A26_PRODUCTION_CONTROLE_V1_0.md` | Règles générales | Vérifier interdictions et hiérarchie | Contrôle effectué : consignes anti-capture, anti-ZIP, anti-scan large, checklist visuelle, mode visuel 99 % conformes | conforme |

## 10. Corrections appliquées
| Fichier | Section / ligne | Problème constaté | Correction appliquée | Statut |
|---|---|---|---|---|
| Références UI/UX page | §1.1 | Source visuelle trop générique | Renvoi systématique au PNG officiel de section 2.2 | corrigé |
| Documents maîtres A24 | Références historiques | Usage ambigu de terminologie historique | Harmonisation vers maquettes PNG officielles + clarification de priorité | clarifié |
| Index maquettes | Inventaire chemins | Segments obsolètes A21 | Mise à jour vers arborescence V1.0 actuelle | corrigé |
| Chemins docs | Casse et racine | Variantes minuscules/obsolètes | Normalisation sur chemins actuels | corrigé |
| Règles icônes | Login/Dashboard | Mention héritée imprécise | Clarification dossier historique neutralisé | corrigé |

## 11. Points restant à confirmer
| Fichier | Section / ligne | Problème constaté | Correction appliquée | Statut |
|---|---|---|---|---|
| `docs/1-MASTER/STRUCTURE_PROJET.md` | Dump arborescence | Présence de segments historiques A21 | Conservé volontairement comme historique | à confirmer |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A24.md` | Document de contexte | Document historique, pas une spec page unique | Conservé avec avertissement de statut contextuel | à confirmer |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md` | Exemples obsolètes | Contient volontairement des formes de chemins obsolètes | Explicitement marquées “FORMES OBSOLÈTES” | clarifié |

## 12. Suggestions d’amélioration non appliquées
| Fichier | Section / ligne | Problème constaté | Correction appliquée | Statut |
|---|---|---|---|---|
| Ensemble `docs/1-MASTER` | Qualité éditoriale | Plusieurs fichiers historiques présentent des encodages d’accents hétérogènes à l’affichage terminal | Suggestion : chantier dédié normalisation UTF-8 éditoriale globale | suggestion non appliquée |
| `PROMPTS_A26_PRODUCTION_CONTROLE_V1_0.md` | Volume | Forte répétition de blocs quasi identiques | Suggestion : factoriser les templates de prompts pour maintenance | suggestion non appliquée |
| Références UI/UX page | Rendu codable | Niveaux de granularité inégaux selon pages | Suggestion : gabarit unique obligatoire par page (layout, filtres, tableau, checklist) | suggestion non appliquée |

## 13. Confirmation qu’aucun code applicatif n’a été modifié
Aucun fichier applicatif n’a été modifié (`app/**`, `app/api/**`, `prisma/**`, `lib/**`, services métier, routes serveur, migrations, seed inchangés dans ce chantier documentaire).

## 14. Confirmation qu’aucun patch, ZIP, capture automatique ou documentation finale de session n’a été produit
Aucun patch `.diff` n’a été produit dans ce chantier. Aucun ZIP généré. Aucune capture automatique produite. Aucune documentation finale de session A26 n’a été rédigée.
