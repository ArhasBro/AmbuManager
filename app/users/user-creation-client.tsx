"use client";

import { useMemo, useState, type FormEvent } from "react";

import { ActionButton, ErrorMessage, StatusBadge } from "@/app/ui";
import {
  COMPANY_RULES_MANAGE_PERMISSION,
  isCompanyRulesGovernorRole,
} from "@/lib/company-rules/governance";
import { ALPHA_PERMISSION_CATALOG, type AlphaPermissionCode } from "@/lib/permission-catalog";

import { USER_ROLE_OPTIONS, type DepotLite } from "./users-client-shared";
import { dispatchUsersRefresh } from "./users-refresh";

type ApiOk<T> = {
  ok: true;
  data: T;
};

type ApiErr = {
  ok: false;
  error: string;
  details?: unknown;
};

type CreatedUser = {
  id: string;
  name: string;
  email: string | null;
  role: string;
};

function isApiOk<T>(value: unknown): value is ApiOk<T> {
  return typeof value === "object" && value !== null && "ok" in value && (value as { ok?: unknown }).ok === true;
}

function isApiErr(value: unknown): value is ApiErr {
  return typeof value === "object" && value !== null && "ok" in value && (value as { ok?: unknown }).ok === false;
}

function readApiError(value: unknown, status: number) {
  if (!isApiErr(value)) return `HTTP_${status}`;

  if (typeof value.details === "object" && value.details !== null && "message" in (value.details as Record<string, unknown>)) {
    const message = (value.details as Record<string, unknown>).message;
    if (typeof message === "string" && message.trim()) return message;
  }

  return value.error;
}

type UserCreationClientProps = {
  canGovernCompanyRules: boolean;
  availableDepots: DepotLite[];
};

export default function UserCreationClient({ canGovernCompanyRules, availableDepots }: UserCreationClientProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [initials, setInitials] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [permissionCodes, setPermissionCodes] = useState<AlphaPermissionCode[]>([]);
  const [depotId, setDepotId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isTrainee, setIsTrainee] = useState(false);
  const [dailyWorkStartTime, setDailyWorkStartTime] = useState("");
  const [dailyWorkEndTime, setDailyWorkEndTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const assignableRoleOptions = useMemo(
    () => (canGovernCompanyRules ? USER_ROLE_OPTIONS : USER_ROLE_OPTIONS.filter((option) => !isCompanyRulesGovernorRole(option))),
    [canGovernCompanyRules],
  );

  function togglePermission(code: AlphaPermissionCode) {
    if (!canGovernCompanyRules && code === COMPANY_RULES_MANAGE_PERMISSION) return;

    setPermissionCodes((current) => (
      current.includes(code)
        ? current.filter((value) => value !== code)
        : [...current, code]
    ));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedInitials = initials.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedFirstName && !trimmedLastName) {
      setError("Le prenom ou le nom est obligatoire.");
      return;
    }

    if (!trimmedEmail) {
      setError("L'email est obligatoire.");
      return;
    }

    if (!password) {
      setError("Le mot de passe initial est obligatoire.");
      return;
    }

    if (!assignableRoleOptions.includes(role as (typeof assignableRoleOptions)[number])) {
      setError("Le role est obligatoire.");
      return;
    }

    if ((dailyWorkStartTime && !dailyWorkEndTime) || (!dailyWorkStartTime && dailyWorkEndTime)) {
      setError("Les horaires journaliers doivent contenir un debut et une fin, ou rester vides.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: trimmedFirstName || null,
          lastName: trimmedLastName || null,
          initials: trimmedInitials || null,
          phone: trimmedPhone || null,
          email: trimmedEmail,
          password,
          role,
          permissionCodes,
          depotId: depotId || null,
          isActive,
          isTrainee,
          dailyWorkStartTime: dailyWorkStartTime || null,
          dailyWorkEndTime: dailyWorkEndTime || null,
        }),
      });

      const json: unknown = await res.json();

      if (!res.ok || !isApiOk<CreatedUser>(json)) {
        throw new Error(readApiError(json, res.status));
      }

      const createdUser = json.data;
      setFirstName("");
      setLastName("");
      setInitials("");
      setPhone("");
      setEmail("");
      setPassword("");
      setRole("");
      setPermissionCodes([]);
      setDepotId("");
      setIsActive(true);
      setIsTrainee(false);
      setDailyWorkStartTime("");
      setDailyWorkEndTime("");
      setSuccess(`Utilisateur cree : ${createdUser.name}${createdUser.email ? ` (${createdUser.email})` : ""}.`);
      dispatchUsersRefresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="users-card users-form">
      <div className="users-card__head">
        <h2 className="users-card__title">Creer un utilisateur</h2>
        <p className="users-card__description">
          Creation enrichie : nom, prenom, initiales, telephone, role, permissions, base, statut, stagiaire et horaires journaliers simples.
        </p>
        <div className="users-inline-status">
          <StatusBadge variant={canGovernCompanyRules ? "success" : "warning"}>
            Gouvernance regles metier: {canGovernCompanyRules ? "autorisee" : "restreinte"}
          </StatusBadge>
        </div>
      </div>

      <div className="users-form-grid">
        <label className="users-field">
          <span className="users-field__label">Prenom</span>
          <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} disabled={submitting} maxLength={80} />
        </label>

        <label className="users-field">
          <span className="users-field__label">Nom</span>
          <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} disabled={submitting} maxLength={80} />
        </label>
      </div>

      <div className="users-form-grid users-form-grid--compact">
        <label className="users-field">
          <span className="users-field__label">Initiales</span>
          <input type="text" value={initials} onChange={(event) => setInitials(event.target.value.toUpperCase())} disabled={submitting} maxLength={12} />
        </label>

        <label className="users-field">
          <span className="users-field__label">Telephone</span>
          <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} disabled={submitting} maxLength={50} />
        </label>
      </div>

      <label className="users-field">
        <span className="users-field__label">Email</span>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="prenom.nom@entreprise.fr" disabled={submitting} autoComplete="email" />
      </label>

      <label className="users-field">
        <span className="users-field__label">Role principal</span>
        <select value={role} onChange={(event) => setRole(event.target.value)} disabled={submitting}>
          <option value="">Selectionner un role</option>
          {assignableRoleOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="users-fieldset" disabled={submitting}>
        <legend>Permissions applicatives ALPHA</legend>
        <div className="users-permission-grid">
          {ALPHA_PERMISSION_CATALOG.map((permission) => {
            const checked = permissionCodes.includes(permission.code);
            const locked = permission.code === COMPANY_RULES_MANAGE_PERMISSION && !canGovernCompanyRules;

            return (
              <label key={permission.code} className="users-permission-card">
                <span className="users-permission-card__head">
                  <input type="checkbox" checked={checked} onChange={() => togglePermission(permission.code)} disabled={locked} />
                  <strong>{permission.label}</strong>
                </span>
                <span className="users-help-text">{permission.description}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="users-field">
        <span className="users-field__label">Base</span>
        <select value={depotId} onChange={(event) => setDepotId(event.target.value)} disabled={submitting}>
          <option value="">Aucune base</option>
          {availableDepots.filter((depot) => depot.isActive).map((depot) => (
            <option key={depot.id} value={depot.id}>
              {depot.name}
            </option>
          ))}
        </select>
      </label>

      <div className="users-checkbox-group">
        <label className="users-checkbox">
          <input type="checkbox" checked={isActive} onChange={(event) => setIsActive(event.target.checked)} disabled={submitting} />
          <span>Compte actif</span>
        </label>

        <label className="users-checkbox">
          <input type="checkbox" checked={isTrainee} onChange={(event) => setIsTrainee(event.target.checked)} disabled={submitting} />
          <span>Stagiaire</span>
        </label>
      </div>

      <div className="users-form-grid users-form-grid--short">
        <label className="users-field">
          <span className="users-field__label">Debut journalier</span>
          <input type="time" value={dailyWorkStartTime} onChange={(event) => setDailyWorkStartTime(event.target.value)} disabled={submitting} />
        </label>

        <label className="users-field">
          <span className="users-field__label">Fin journaliere</span>
          <input type="time" value={dailyWorkEndTime} onChange={(event) => setDailyWorkEndTime(event.target.value)} disabled={submitting} />
        </label>
      </div>

      <label className="users-field">
        <span className="users-field__label">Mot de passe initial</span>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mot de passe initial" disabled={submitting} autoComplete="new-password" />
      </label>

      {error ? (
        <ErrorMessage title="Echec de creation utilisateur" message={error} />
      ) : null}

      {success ? (
        <div className="users-alert users-alert--success">{success}</div>
      ) : null}

      <div className="users-actions">
        <ActionButton type="submit" variant="primary" disabled={submitting}>
          {submitting ? "Creation..." : "Creer l'utilisateur"}
        </ActionButton>
      </div>
    </form>
  );
}
