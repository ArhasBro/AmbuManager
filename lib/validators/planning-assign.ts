import { z } from "zod";

/**
 * Assignation manuelle sur un shift (DraftShift ou Shift selon service appelé).
 *
 * - Champs optionnels : on peut envoyer seulement ce qu’on veut modifier.
 * - Champs nullable : on peut explicitement retirer une assignation (ex: userId: null).
 *
 * IMPORTANT :
 * - Aucune logique métier ici (slots, conflits, repos minimum, etc.) -> gérée dans lib/services/planning/*
 * - Ici : uniquement validation de forme + garde-fous de base (pas d’objet vide).
 */

// IDs : le projet a eu des périodes UUID / CUID, donc on valide "string non vide"
// pour ne pas casser la prod selon le format effectif côté Prisma.
const IdSchema = z.string().min(1, "ID invalide");

const NullableIdSchema = z.union([IdSchema, z.null()]);

export const planningAssignInputSchema = z
  .object({
    userId: NullableIdSchema.optional(),
    user2Id: NullableIdSchema.optional(),
    vehicleId: NullableIdSchema.optional(),
  })
  .strict()
  .superRefine((val, ctx) => {
    // Interdit: body vide (aucune clé) => on force un payload intentionnel
    const hasAnyKey =
      Object.prototype.hasOwnProperty.call(val, "userId") ||
      Object.prototype.hasOwnProperty.call(val, "user2Id") ||
      Object.prototype.hasOwnProperty.call(val, "vehicleId");

    if (!hasAnyKey) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Aucune donnée fournie. Fournir au moins un champ parmi: userId, user2Id, vehicleId.",
        path: [],
      });
      return;
    }

    // Interdit: tout est undefined (ex: { userId: undefined }) après parsing JSON improbable,
    // mais utile si un client envoie mal.
    const allUndefined =
      val.userId === undefined &&
      val.user2Id === undefined &&
      val.vehicleId === undefined;

    if (allUndefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Payload invalide. Fournir au moins une valeur (string ou null) pour userId/user2Id/vehicleId.",
        path: [],
      });
    }
  });

export type PlanningAssignInput = z.infer<typeof planningAssignInputSchema>;