/**
 * Helper centralisé pour écrire dans AuditLog.
 * Ne jamais appeler si l'action a échoué.
 *
 * @param {object}  opts
 * @param {string}  opts.action      - Libellé court de l'action (ex: "Création utilisateur")
 * @param {string}  [opts.actionType] - Type technique : create | update | login | logout | export | view (défaut : "update")
 * @param {string}  opts.module      - Module métier (ex: "Utilisateurs", "Véhicules"…)
 * @param {string}  opts.resource    - Ressource concernée (ex: "User: Jean Dupont")
 * @param {string}  [opts.details]   - Résumé libre des modifications (optionnel)
 * @param {object}  [opts.actor]     - Objet utilisateur courant (optionnel)
 * @param {string}  [opts.result]    - "Succès" | "Échec" | "Avertissement" (défaut : "Succès", optionnel)
 * @param {string}  [opts.companyId] - ID de la société (optionnel)
 */
import { base44 } from "@/api/base44Client";

export async function writeAuditLog({ action, actionType = "update", module, resource, details, actor, result = "Succès", companyId }) {
  const entry = {
    action,
    action_type: actionType,
    module,
    resource: resource || "",
    details: details || "",
    result,
    actor_name: actor?.full_name || actor?.email || "Système",
    actor_initials: actor
      ? (actor.initials || (actor.full_name || actor.email || "?").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase())
      : "SYS",
    actor_role: actor?.business_role || actor?.role || "",
    company_id: companyId || actor?.company_id || "",
  };

  // Fire-and-forget : on ne bloque pas l'UI si l'audit échoue.
  base44.entities.AuditLog.create(entry).catch((err) => {
    console.warn("[Audit] Échec écriture log :", err?.message || err);
  });
}