"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

import { ActionButton, ErrorMessage, StatusBadge } from "@/app/ui";
import {
  COMPANY_RULES_MANAGE_PERMISSION,
  isCompanyRulesGovernorRole,
  permissionSetTouchesCompanyRulesGovernance,
  roleChangeTouchesCompanyRulesGovernance,
} from "@/lib/company-rules/governance";
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
  firstName: string | null;
  lastName: string | null;
  initials: string | null;
  phone: string | null;
  isTrainee: boolean;
  dailyWorkStartTime: string | null;
  dailyWorkEndTime: string | null;
  permissionCodes: AlphaPermissionCode[];
};

const permissionOrder = new Map(ALPHA_PERMISSION_CATALOG.map((permission, index) => [permission.code, index]));

function isApiOk<T>(value: unknown): value is ApiOk<T> {
  return typeof value === "object" && value !== null && "ok" in value && (value as { ok?: unknown }).ok === true;
}

function isApiErr(value: unknown): value is ApiErr {
  return typeof value === "object" && value !== null && "ok" in value && (value as { ok?: unknown }).ok === false;
}

function readValidationMessage(details: unknown): string | null {
  if (typeof details !== "object" || details === null) return null;

  const record = details as Record<string, unknown>;
  if (typeof record.message === "string" && record.message.trim()) {
    return record.message;
  }

  const formErrors = Array.isArray(record.formErrors) ? record.formErrors : [];
  const firstFormError = formErrors.find((item) => typeof item === "string" && item.trim());
  if (typeof firstFormError === "string") return firstFormError;

  const fieldErrors = typeof record.fieldErrors === "object" && record.fieldErrors !== null
    ? (record.fieldErrors as Record<string, unknown>)
    : null;

  if (fieldErrors) {
    for (const value of Object.values(fieldErrors)) {
      if (!Array.isArray(value)) continue;
      const firstFieldError = value.find((item) => typeof item === "string" && item.trim());
      if (typeof firstFieldError === "string") return firstFieldError;
    }
  }

  return null;
}

function readApiError(value: unknown, status: number) {
  if (!isApiErr(value)) return `HTTP_${status}`;

  const validationMessage = readValidationMessage(value.details);
  if (validationMessage) return validationMessage;

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
  const firstName = typeof record.firstName === "string" ? record.firstName : null;
  const lastName = typeof record.lastName === "string" ? record.lastName : null;
  const initials = typeof record.initials === "string" ? record.initials : null;
  const phone = typeof record.phone === "string" ? record.phone : null;
  const isTrainee = record.isTrainee === true;
  const dailyWorkStartTime = typeof record.dailyWorkStartTime === "string" ? record.dailyWorkStartTime : null;
  const dailyWorkEndTime = typeof record.dailyWorkEndTime === "string" ? record.dailyWorkEndTime : null;
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
  return {
    id,
    name,
    email,
    role,
    depotId,
    depot,
    firstName,
    lastName,
    initials,
    phone,
    isTrainee,
    dailyWorkStartTime,
    dailyWorkEndTime,
    permissionCodes: normalizePermissionCodes(permissionCodes),
  };
}

type UserEditClientProps = {
  canGovernCompanyRules: boolean;
};

function getAssignableRoleOptions(canGovernCompanyRules: boolean, currentRole?: string) {
  const baseOptions = canGovernCompanyRules
    ? [...USER_ROLE_OPTIONS]
    : USER_ROLE_OPTIONS.filter((option) => !isCompanyRulesGovernorRole(option));

  if (
    currentRole
    && USER_ROLE_OPTIONS.includes(currentRole as (typeof USER_ROLE_OPTIONS)[number])
    && !baseOptions.includes(currentRole as (typeof USER_ROLE_OPTIONS)[number])
  ) {
    return [currentRole as (typeof USER_ROLE_OPTIONS)[number], ...baseOptions];
  }

  return baseOptions;
}

function roleStatusVariant(role: string): "neutral" | "info" | "warning" {
  if (role === "ADMIN" || role === "GERANT") return "info";
  if (role === "BUREAU" || role === "REGULATEUR") return "warning";
  return "neutral";
}

export default function UserEditClient({ canGovernCompanyRules }: UserEditClientProps) {
  const [selectedUser, setSelectedUser] = useState<UserListRow | null>(null);
  const [loadedUser, setLoadedUser] = useState<EditableUser | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [initials, setInitials] = useState("");
  const [phone, setPhone] = useState("");
  const [isTrainee, setIsTrainee] = useState(false);
  const [dailyWorkStartTime, setDailyWorkStartTime] = useState("");
  const [dailyWorkEndTime, setDailyWorkEndTime] = useState("");
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
      setFirstName(nextSelectedUser?.firstName ?? "");
      setLastName(nextSelectedUser?.lastName ?? "");
      setInitials(nextSelectedUser?.initials ?? "");
      setPhone(nextSelectedUser?.phone ?? "");
      setIsTrainee(nextSelectedUser?.isTrainee === true);
      setDailyWorkStartTime(nextSelectedUser?.dailyWorkStartTime ?? "");
      setDailyWorkEndTime(nextSelectedUser?.dailyWorkEndTime ?? "");
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
        if (!user) throw new Error("Reponse invalide de l'API d'edition utilisateur.");

        if (!cancelled) {
          setLoadedUser(user);
          setName(user.name);
          setEmail(user.email ?? "");
          setRole(user.role);
          setFirstName(user.firstName ?? "");
          setLastName(user.lastName ?? "");
          setInitials(user.initials ?? "");
          setPhone(user.phone ?? "");
          setIsTrainee(user.isTrainee);
          setDailyWorkStartTime(user.dailyWorkStartTime ?? "");
          setDailyWorkEndTime(user.dailyWorkEndTime ?? "");
          setPermissionCodes(user.permissionCodes);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setLoadedUser(null);
          setFirstName("");
          setLastName("");
          setInitials("");
          setPhone("");
          setIsTrainee(false);
          setDailyWorkStartTime("");
          setDailyWorkEndTime("");
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

  const assignableRoleOptions = useMemo(
    () => getAssignableRoleOptions(canGovernCompanyRules, role || loadedUser?.role || selectedUser?.role || undefined),
    [canGovernCompanyRules, loadedUser?.role, role, selectedUser?.role],
  );

  const selectedUserHasNativeCompanyRulesAccess = isCompanyRulesGovernorRole(loadedUser?.role ?? selectedUser?.role ?? null);
  const roleFieldLocked = !canGovernCompanyRules && selectedUserHasNativeCompanyRulesAccess;

  const hasPendingChange = useMemo(() => {
    if (!selectedUser || !loadedUser) return false;

    return name.trim() !== loadedUser.name
      || email.trim() !== (loadedUser.email ?? "")
      || role !== loadedUser.role
      || firstName.trim() !== (loadedUser.firstName ?? "")
      || lastName.trim() !== (loadedUser.lastName ?? "")
      || initials.trim() !== (loadedUser.initials ?? "")
      || phone.trim() !== (loadedUser.phone ?? "")
      || isTrainee !== loadedUser.isTrainee
      || (dailyWorkStartTime || null) !== loadedUser.dailyWorkStartTime
      || (dailyWorkEndTime || null) !== loadedUser.dailyWorkEndTime
      || !arePermissionSetsEqual(permissionCodes, loadedUser.permissionCodes);
  }, [dailyWorkEndTime, dailyWorkStartTime, email, firstName, initials, isTrainee, lastName, loadedUser, name, permissionCodes, phone, role, selectedUser]);

  function togglePermission(code: AlphaPermissionCode) {
    if (!canGovernCompanyRules && code === COMPANY_RULES_MANAGE_PERMISSION) return;

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
      setError("Selectionnez d'abord un utilisateur et attendez le chargement complet du formulaire.");
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedInitials = initials.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setError("Le nom est obligatoire.");
      return;
    }

    if (!trimmedEmail) {
      setError("L'email est obligatoire.");
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

    if (!hasPendingChange) {
      setError("Aucune modification detectee.");
      return;
    }

    if (!canGovernCompanyRules) {
      const roleChangeTouchesGovernance = roleChangeTouchesCompanyRulesGovernance(loadedUser.role, role);
      const permissionChangeTouchesGovernance = permissionSetTouchesCompanyRulesGovernance(loadedUser.permissionCodes, permissionCodes);

      if (roleChangeTouchesGovernance || permissionChangeTouchesGovernance) {
        setError("Seuls les comptes ADMIN ou GERANT peuvent attribuer, retirer ou conferer le droit de modification des regles metier.");
        return;
      }
    }

    setSubmitting(true);

    try {
      const res = await fetch(`/api/users/${encodeURIComponent(selectedUser.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          firstName: trimmedFirstName || null,
          lastName: trimmedLastName || null,
          initials: trimmedInitials || null,
          phone: trimmedPhone || null,
          email: trimmedEmail,
          role,
          isTrainee,
          dailyWorkStartTime: dailyWorkStartTime || null,
          dailyWorkEndTime: dailyWorkEndTime || null,
          permissionCodes,
        }),
      });

      const json: unknown = await res.json();

      if (!res.ok || !isApiOk<unknown>(json)) {
        throw new Error(readApiError(json, res.status));
      }

      const updatedUser = toEditableUser(json.data);
      if (!updatedUser) throw new Error("Reponse invalide de l'API d'edition utilisateur.");

      setSelectedUser(updatedUser);
      setLoadedUser(updatedUser);
      setName(updatedUser.name);
      setEmail(updatedUser.email ?? "");
      setRole(updatedUser.role);
      setFirstName(updatedUser.firstName ?? "");
      setLastName(updatedUser.lastName ?? "");
      setInitials(updatedUser.initials ?? "");
      setPhone(updatedUser.phone ?? "");
      setIsTrainee(updatedUser.isTrainee);
      setDailyWorkStartTime(updatedUser.dailyWorkStartTime ?? "");
      setDailyWorkEndTime(updatedUser.dailyWorkEndTime ?? "");
      setPermissionCodes(updatedUser.permissionCodes);
      setSuccess(`Utilisateur modifie : ${updatedUser.name}${updatedUser.email ? ` (${updatedUser.email})` : ""}.`);
      dispatchUsersSelection(updatedUser);
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
        <h2 className="users-card__title">Modifier un utilisateur</h2>
        <p className="users-card__description">
          Selectionnez d&apos;abord un utilisateur dans la liste ci-dessus pour modifier les champs couverts par USERS-06/07,
          puis ajuster ses permissions applicatives ALPHA.
        </p>
        {!canGovernCompanyRules ? (
          <p className="users-help-text">
            La delegation du droit de modification des regles metier reste reservee aux comptes <code>ADMIN</code> ou <code>GERANT</code>.
          </p>
        ) : null}
      </div>

      {!selectedUser ? (
        <div className="users-selection-card">
          Aucun utilisateur selectionne dans la liste.
        </div>
      ) : (
        <>
          <div className="users-selection-card">
            <span>
              <strong>{selectedUser.name}</strong>
              {selectedUser.email ? ` (${selectedUser.email})` : ""}
            </span>
            <div className="users-inline-status">
              <StatusBadge variant={roleStatusVariant(selectedUser.role)}>
                Role: {selectedUser.role}
              </StatusBadge>
              <StatusBadge variant={selectedUser.depot?.isActive ? "success" : "warning"}>
                Base: {depotLabel(selectedUser.depot)}
              </StatusBadge>
            </div>
          </div>

          {loadingDetails ? (
            <div className="users-selection-card">Chargement des permissions et du detail d&apos;edition...</div>
          ) : null}

          {detailsError ? (
            <ErrorMessage title="Erreur de chargement utilisateur" message={detailsError} />
          ) : null}

          <label className="users-field">
            <span className="users-field__label">Nom</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nom complet"
              disabled={submitting || loadingDetails || Boolean(detailsError)}
              maxLength={160}
            />
          </label>

          <div className="users-form-grid">
            <label className="users-field">
              <span className="users-field__label">Prenom</span>
              <input
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                disabled={submitting || loadingDetails || Boolean(detailsError)}
                maxLength={80}
              />
            </label>

            <label className="users-field">
              <span className="users-field__label">Nom de famille</span>
              <input
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                disabled={submitting || loadingDetails || Boolean(detailsError)}
                maxLength={80}
              />
            </label>
          </div>

          <div className="users-form-grid users-form-grid--compact">
            <label className="users-field">
              <span className="users-field__label">Initiales</span>
              <input
                type="text"
                value={initials}
                onChange={(event) => setInitials(event.target.value.toUpperCase())}
                disabled={submitting || loadingDetails || Boolean(detailsError)}
                maxLength={12}
              />
            </label>

            <label className="users-field">
              <span className="users-field__label">Telephone</span>
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                disabled={submitting || loadingDetails || Boolean(detailsError)}
                maxLength={50}
              />
            </label>
          </div>

          <label className="users-field">
            <span className="users-field__label">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="prenom.nom@entreprise.fr"
              disabled={submitting || loadingDetails || Boolean(detailsError)}
              autoComplete="email"
            />
          </label>

          <label className="users-field">
            <span className="users-field__label">Role principal</span>
            <select value={role} onChange={(event) => setRole(event.target.value)} disabled={submitting || loadingDetails || Boolean(detailsError) || roleFieldLocked}>
              <option value="">Selectionner un role</option>
              {assignableRoleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="users-checkbox-group">
            <label className="users-checkbox">
              <input
                type="checkbox"
                checked={isTrainee}
                onChange={(event) => setIsTrainee(event.target.checked)}
                disabled={submitting || loadingDetails || Boolean(detailsError)}
              />
              <span>Stagiaire</span>
            </label>
          </div>

          <div className="users-form-grid users-form-grid--short">
            <label className="users-field">
              <span className="users-field__label">Debut journalier</span>
              <input
                type="time"
                value={dailyWorkStartTime}
                onChange={(event) => setDailyWorkStartTime(event.target.value)}
                disabled={submitting || loadingDetails || Boolean(detailsError)}
              />
            </label>

            <label className="users-field">
              <span className="users-field__label">Fin journaliere</span>
              <input
                type="time"
                value={dailyWorkEndTime}
                onChange={(event) => setDailyWorkEndTime(event.target.value)}
                disabled={submitting || loadingDetails || Boolean(detailsError)}
              />
            </label>
          </div>

          <fieldset className="users-fieldset" disabled={submitting || loadingDetails || Boolean(detailsError)}>
            <legend>Permissions applicatives ALPHA</legend>
            <p className="users-help-text">
              Le role principal reste unique via le champ <code>role</code>. Les cases ci-dessous ajoutent ou retirent uniquement les permissions applicatives ALPHA.
              {!canGovernCompanyRules ? " La permission COMPANY_RULES_MANAGE reste verrouillee pour les comptes non natifs de gouvernance." : ""}
            </p>

            <div className="users-permission-grid">
              {ALPHA_PERMISSION_CATALOG.map((permission) => {
                const checked = permissionCodes.includes(permission.code);
                const isCompanyRulesPermission = permission.code === COMPANY_RULES_MANAGE_PERMISSION;
                const permissionLocked = isCompanyRulesPermission && !canGovernCompanyRules;

                return (
                  <label key={permission.code} className="users-permission-card">
                    <span className="users-permission-card__head">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => togglePermission(permission.code)}
                        disabled={permissionLocked}
                      />
                      <strong>{permission.label}</strong>
                    </span>
                    <span className="users-help-text">{permission.description}</span>
                    {permissionLocked ? (
                      <span className="users-help-text">
                        Delegation reservee a la gouvernance native <code>ADMIN</code> / <code>GERANT</code>.
                      </span>
                    ) : null}
                    <span className="users-help-text">{permission.code}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </>
      )}

      {error ? (
        <ErrorMessage title="Echec de modification utilisateur" message={error} />
      ) : null}

      {success ? (
        <div className="users-alert users-alert--success">{success}</div>
      ) : null}

      <div className="users-actions">
        <ActionButton
          type="submit"
          variant="primary"
          disabled={submitting || !selectedUser || !loadedUser || loadingDetails || Boolean(detailsError) || !hasPendingChange}
        >
          {submitting ? "Enregistrement..." : "Enregistrer les modifications"}
        </ActionButton>
      </div>
    </form>
  );
}
