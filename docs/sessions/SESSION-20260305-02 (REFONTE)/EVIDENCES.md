# EVIDENCES

## Vérifications techniques post-patches

### 1. Lint
- Commande : `npm run lint`
- Résultat : VALIDÉ

### 2. Build
- Commande : `npm run build`
- Résultat : VALIDÉ

### 3. Validation Prisma
- Commande : `npx prisma validate`
- Résultat : VALIDÉ
- Détail : `The schema at prisma\schema.prisma is valid 🚀`

### 4. Test de login seedé
- Commande : `npx tsx prisma/test-login.ts`
- Résultat : VALIDÉ
- Sortie :
  - `DB email: admin@ambulance.local`
  - `Password is hashed: true`
  - `bcrypt.compare: true`

  Voir C:\Users\arche\ambulance-manager\docs\REFONTE\REFONTE.md
  C:\Users\arche\ambulance-manager\docs\patches\general\README.md