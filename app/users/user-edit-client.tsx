"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

import { ALPHA_PERMISSION_CATALOG, type AlphaPermissionCode } from "@/lib/permission-catalog";

import { depotLabel, USER_ROLE_OPTIONS, type UserListRow } from "./users-client-shared";
import { USERS_SELECTION_EVENT, dispatchUsersRefresh, dispatchUsersSelection, type UsersSelectionEventDetail } from "./users-refresh";

type ApiOk<T> = {
  ok: true;
  data: T;
};

type ApiErr = {
  ok: false;
  error: string;
  details?: unknown;
};

type EditableUser = Pick<UserListRow, "id" | "name" | "email" | "role" | "depotId" | "depot"> & {
  permissionCodes: AlphaPermissionCode[];
};

const permissionOrder = new Map(ALPHA_PERMISSION_CATALOG.map((permission, index) => [permission.code, index]));

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

function normalizePermissionCodes(codes: readonly AlphaPermissionCode[]) {
  return [...new Set(codes)].sort((a, b) => (permissionOrder.get(a) ?? Number.MAX_SAFE_INTEGER) - (permissionOrder.get(b) ?? Number.MAX_SAFE_INTEGER));
}

function arePermissionSetsEqual(a: readonly AlphaPermissionCode[], b: readonly AlphaPermissionCode[]) {
  if (a.length !== b.length) return false;
  return a.every((code, index) => code === b[index]);
}

function toEditableUser(value: unknown): EditableUser | null {
  if (typeof value !== "object" || value === null) return null;

  const record = value as Record<string, unknown>;
  const id = typeof record.id === "string" ? record.id : null;
  const name = typeof record.name === "string" ? record.name : null;
  const email = typeof record.email === "string" ? record.email : null;
  const role = typeof record.role === "string" ? record.role : null;
  const depotId = typeof record.depotId === "string" ? record.depotId : null;
  const permissionCodesRaw = Array.isArray(record.permissionCodes) ? record.permissionCodes : null;
  const permissionCodes = permissionCodesRaw
    ?.filter((code): code is AlphaPermissionCode => typeof code === "string" && permissionOrder.has(code as AlphaPermissionCode));

  const depotRecord = typeof record.depot === "object" && record.depot !== null ? (record.depot as Record<string, unknown>) : null;
  const depot = depotRecord
    && typeof depotRecord.id === "string"
    && typeof depotRecord.name === "string"
    && typeof depotRecord.isActive === "boolean"
    ? {
        id: depotRecord.id,
        name: depotRecord.name,
        isActive: depotRecord.isActive,
      }
    : null;

  if (!id || !name || !role || !permissionCodes) return null;
  return { id, name, email, role, depotId, depot, permissionCodes: normalizePermissionCodes(permissionCodes) };
}

export default function UserEditClient() {
  const [selectedUser, setSelectedUser] = useState<UserListRow | null>(null);
  const [loadedUser, setLoadedUser] = useState<EditableUser | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [permissionCodes, setPermissionCodes] = useState<AlphaPermissionCode[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    function handleUsersSelection(event: Event) {
      const detail = (event as CustomEvent<UsersSelectionEventDetail>).detail;
      const nextSelectedUser = detail?.user ?? null;

      setSelectedUser(nextSelectedUser);
      setLoadedUser(null);
      setName(nextSelectedUser?.name ?? "");
      setEmail(nextSelectedUser?.email ?? "");
      setRole(nextSelectedUser?.role ?? "");
      setPermissionCodes([]);
      setError(null);
      setDetailsError(null);
      setSuccess(null);
    }

    window.addEventListener(USERS_SELECTION_EVENT, handleUsersSelection as EventListener);
    return () => window.removeEventListener(USERS_SELECTION_EVENT, handleUsersSelection as EventListener);
  }, []);

  useEffect(() => {
    if (!selectedUser?.id) return;

    const selectedUserId = selectedUser.id;
    let cancelled = false;

    async function loadUserDetails() {
      setLoadingDetails(true);
      setDetailsError(null);

      try {
        const res = await fetch(`/api/users/${encodeURIComponent(selectedUserId)}`, { cache: "no-store" });
        const json: unknown = await res.json();

        if (!res.ok || !isApiOk<unknown>(json)) {
          throw new Error(readApiError(json, res.status));
        }

        const user = toEditableUser(json.data);
        if (!user) throw new Error("Réponse invalide de l’API d’édition utilisateur.");

        if (!cancelled) {
          setLoadedUser(user);
          setName(user.name);
          setEmail(user.email ?? "");
          setRole(user.role);
          setPermissionCodes(user.permissionCodes);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setLoadedUser(null);
          setPermissionCodes([]);
          setDetailsError(e instanceof Error ? e.message : "Erreur inconnue");
        }
      } finally {
        if (!cancelled) setLoadingDetails(false);
      }
    }

    void loadUserDetails();

    return () => {
      cancelled = true;
    };
  }, [selectedUser?.id]);

  const hasPendingChange = useMemo(() => {
    if (!selectedUser || !loadedUser) return false;

    return name.trim() !== loadedUser.name
      || email.trim() !== (loadedUser.email ?? "")
      || role !== loadedUser.role
      || !arePermissionSetsEqual(permissionCodes, loadedUser.permissionCodes);
  }, [email, loadedUser, name, permissionCodes, role, selectedUser]);

  function togglePermission(code: AlphaPermissionCode) {
    setPermissionCodes((current) => {
      const next = current.includes(code)
        ? current.filter((value) => value !== code)
        : [...current, code];

      return normalizePermissionCodes(next);
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedUser || !loadedUser) {
      setError("Sélectionnez d'abord un utilisateur et attendez le chargement complet du formulaire.");
      return;
    }

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

    if (!USER_ROLE_OPTIONS.includes(role as (typeof USER_ROLE_OPTIONS)[number])) {
      setError("Le rôle est obligatoire.");
      return;
    }

    if (!hasPendingChange) {
      setError("Aucune modification détectée.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`/api/users/${encodeURIComponent(selectedUser.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          role,
          permissionCodes,
        }),
      });

      const json: unknown = await res.json();

      if (!res.ok || !isApiOk<unknown>(json)) {
        throw new Error(readApiError(json, res.status));
      }

      const updatedUser = toEditableUser(json.data);
      if (!updatedUser) throw new Error("Réponse invalide de l’API d’édition utilisateur.");

      setSelectedUser(updatedUser);
      setLoadedUser(updatedUser);
      setName(updatedUser.name);
      setEmail(updatedUser.email ?? "");
      setRole(updatedUser.role);
      setPermissionCodes(updatedUser.permissionCodes);
      setSuccess(`Utilisateur modifié : ${updatedUser.name}${updatedUser.email ? ` (${updatedUser.email})` : ""}.`);
      dispatchUsersSelection(updatedUser);
      dispatchUsersRefresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, padding: 12, border: "1px solid #333", borderRadius: 8, maxWidth: 920 }}>
      <div>
        <h2 style={{ margin: 0 }}>Modifier un utilisateur</h2>
        <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
          Sélectionnez d&apos;abord un utilisateur dans la liste ci-dessus pour modifier les champs déjà couverts par USERS-06/07,
          puis ajuster ici ses permissions applicatives ALPHA.
        </p>
      </div>

      {!selectedUser ? (
        <div style={{ padding: 10, border: "1px solid #555", borderRadius: 8 }}>
          Aucun utilisateur sélectionné dans la liste.
        </div>
      ) : (
        <>
          <div style={{ padding: 10, border: "1px solid #333", borderRadius: 8 }}>
            <div>
              <strong>{selectedUser.name}</strong>
              {selectedUser.email ? ` (${selectedUser.email})` : ""} — rôle {selectedUser.role}
            </div>
            <div style={{ marginTop: 6, opacity: 0.8 }}>
              Base actuelle : {depotLabel(selectedUser.depot)}
            </div>
          </div>

          {loadingDetails ? (
            <div style={{ padding: 10, border: "1px solid #444", borderRadius: 8 }}>
              Chargement des permissions et du détail d’édition...
            </div>
          ) : null}

          {detailsError ? (
            <div style={{ padding: 10, border: "1px solid #663333", borderRadius: 8 }}>
              Erreur de chargement du détail utilisateur : {detailsError}
            </div>
          ) : null}

          <label style={{ display: "grid", gap: 6 }}>
            <span>Nom</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nom complet"
              disabled={submitting || loadingDetails || Boolean(detailsError)}
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
              disabled={submitting || loadingDetails || Boolean(detailsError)}
              autoComplete="email"
            />
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span>Rôle principal</span>
            <select value={role} onChange={(event) => setRole(event.target.value)} disabled={submitting || loadingDetails || Boolean(detailsError)}>
              <option value="">Sélectionner un rôle</option>
              {USER_ROLE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <fieldset style={{ display: "grid", gap: 10, padding: 12, border: "1px solid #333", borderRadius: 8 }} disabled={submitting || loadingDetails || Boolean(detailsError)}>
            <legend>Permissions applicatives ALPHA</legend>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Le rôle principal reste unique via le champ <code>role</code>. Les cases ci-dessous ajoutent ou retirent uniquement les permissions applicatives ALPHA du compte sélectionné.
            </p>

            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              {ALPHA_PERMISSION_CATALOG.map((permission) => {
                const checked = permissionCodes.includes(permission.code);

                return (
                  <label key={permission.code} style={{ display: "grid", gap: 4, padding: 10, border: "1px solid #333", borderRadius: 8 }}>
                    <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => togglePermission(permission.code)}
                      />
                      <strong>{permission.label}</strong>
                    </span>
                    <span style={{ fontSize: 13, opacity: 0.8 }}>{permission.description}</span>
                    <span style={{ fontSize: 12, opacity: 0.65 }}>{permission.code}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </>
      )}

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

      <button
        type="submit"
        disabled={submitting || !selectedUser || !loadedUser || loadingDetails || Boolean(detailsError) || !hasPendingChange}
        style={{ justifySelf: "start", padding: "10px 14px" }}
      >
        {submitting ? "Enregistrement..." : "Enregistrer les modifications"}
      </button>
    </form>
  );
}
