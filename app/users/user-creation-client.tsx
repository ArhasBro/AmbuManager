"use client";

import { useMemo, useState, type FormEvent } from "react";

import { isCompanyRulesGovernorRole } from "@/lib/company-rules/governance";

import { USER_ROLE_OPTIONS } from "./users-client-shared";
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

type UserCreationClientProps = {
  canGovernCompanyRules: boolean;
};

export default function UserCreationClient({ canGovernCompanyRules }: UserCreationClientProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const assignableRoleOptions = useMemo(
    () => (canGovernCompanyRules ? USER_ROLE_OPTIONS : USER_ROLE_OPTIONS.filter((option) => !isCompanyRulesGovernorRole(option))),
    [canGovernCompanyRules],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("Le nom est obligatoire.");
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
      setError("Le rôle est obligatoire.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password,
          role,
        }),
      });

      const json: unknown = await res.json();

      if (!res.ok || !isApiOk<CreatedUser>(json)) {
        const msg = isApiErr(json)
          ? typeof json.details === "object" && json.details !== null && "message" in (json.details as Record<string, unknown>) && typeof (json.details as Record<string, unknown>).message === "string"
            ? (json.details as Record<string, string>).message
            : json.error
          : `HTTP_${res.status}`;
        throw new Error(msg);
      }

      const createdUser = json.data;
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setSuccess(`Utilisateur créé : ${createdUser.name}${createdUser.email ? ` (${createdUser.email})` : ""}.`);
      dispatchUsersRefresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, padding: 12, border: "1px solid #333", borderRadius: 8, maxWidth: 720 }}>
      <div>
        <h2 style={{ margin: 0 }}>Créer un utilisateur</h2>
        <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
          Création minimale alignée sur l&apos;API USERS-04. Les rôles support globaux ne sont pas attribuables depuis cette interface.
        </p>
        {!canGovernCompanyRules ? (
          <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
            Les rôles <code>ADMIN</code> et <code>GERANT</code>, qui donnent nativement accès à la gouvernance des règles métier, restent réservés aux comptes natifs de gouvernance.
          </p>
        ) : null}
      </div>

      <label style={{ display: "grid", gap: 6 }}>
        <span>Nom</span>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nom complet"
          disabled={submitting}
          maxLength={160}
        />
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        <span>Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="prenom.nom@entreprise.fr"
          disabled={submitting}
          autoComplete="email"
        />
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        <span>Rôle</span>
        <select value={role} onChange={(event) => setRole(event.target.value)} disabled={submitting}>
          <option value="">Sélectionner un rôle</option>
          {assignableRoleOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        <span>Mot de passe initial</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Mot de passe initial"
          disabled={submitting}
          autoComplete="new-password"
        />
      </label>

      {error ? (
        <div style={{ padding: 10, border: "1px solid #663333", borderRadius: 8 }}>
          Erreur : {error}
        </div>
      ) : null}

      {success ? (
        <div style={{ padding: 10, border: "1px solid #335533", borderRadius: 8 }}>
          {success}
        </div>
      ) : null}

      <button type="submit" disabled={submitting} style={{ justifySelf: "start", padding: "10px 14px" }}>
        {submitting ? "Création..." : "Créer l'utilisateur"}
      </button>
    </form>
  );
}
