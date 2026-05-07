# EVIDENCES — SESSION-20260506-06_A24_A24-UI-06

## Preuves disponibles dans la discussion

- Lecture GitHub des documents master et A24.
- Lecture GitHub des fichiers `/users` concernés.
- Production d'un patch texte UTF-8.
- Vérification syntaxique du patch par `git apply --stat` hors dépôt réel.

## Encodage patch

Sorties obtenues sur l'artefact produit :

```txt
bytes= 18175
first_line= diff --git a/app/users/page.tsx b/app/users/page.tsx
utf8_ok= True
has_bom= False
has_nul= False
endswith_lf= True
file -b --mime-encoding: utf-8
sha256: f07d5f90f97a8a89eebf4252bd8fef20538428492c1539634587dd3352bd8a50
```

## Stat patch

```txt
app/users/page.tsx                    |   45 ++++++++++++--
app/users/users-client-shared.ts      |    6 +-
app/users/users-list-client.tsx       |  105 ++++++++++++++++++++++++++-------
app/users/users-side-panel-client.tsx |   42 +++++++++----
app/globals.css                       |  100 +++++++++++++++++++++++++++++++
5 files changed, 253 insertions(+), 45 deletions(-)
```

## Validations non exécutées ici

`git apply --check`, `git apply`, `npm run lint`, `npm run build` n'ont pas été exécutés dans le dépôt réel.

INFORMATION NON FOURNIE — À CONFIRMER

## Captures non fournies

- `CAPTURES_AVANT/users_light_before.png`
- `CAPTURES_AVANT/users_dark_before.png`
- `CAPTURES_APRES/users_light_after.png`
- `CAPTURES_APRES/users_dark_after.png`

INFORMATION NON FOURNIE — À CONFIRMER
