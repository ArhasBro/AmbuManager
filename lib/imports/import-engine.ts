import bcrypt from "bcrypt";
import { PlanningTemplateCategory, Role, VehicleStatus, VehicleType } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { parseCsv } from "@/lib/imports/csv";
import { parseXlsxRows } from "@/lib/imports/xlsx";
import { resolveTemplateCreateInput, validateResolvedTemplateState } from "@/lib/templates/template-api";

export const IMPORT_DOMAINS = ["users", "vehicles", "templates", "depots", "user-absences"] as const;
export type ImportDomain = (typeof IMPORT_DOMAINS)[number];
export type ImportFormat = "csv" | "xlsx";

type PreviewError = {
  rowNumber: number;
  message: string;
  field?: string;
};

type PreviewRow<T> = {
  rowNumber: number;
  values: T;
};

type PreviewResult<T> = {
  domain: ImportDomain;
  format: ImportFormat;
  fileName: string;
  columns: string[];
  totalRows: number;
  validRows: number;
  invalidRows: number;
  previewRows: Array<PreviewRow<T>>;
  rows: Array<PreviewRow<T>>;
  errors: PreviewError[];
  notes: string[];
};

type CommitResult<T> = {
  domain: ImportDomain;
  insertedCount: number;
  errorCount: number;
  insertedPreview: Array<PreviewRow<T>>;
  errors: PreviewError[];
};

type UserImportRow = {
  email: string;
  name: string;
  role: Role;
  password: string;
  depotName: string | null;
};

type VehicleImportRow = {
  immatriculation: string;
  type: VehicleType;
  status: VehicleStatus;
  depotName: string | null;
  insuranceExpiresAt: string | null;
  technicalInspectionExpiresAt: string | null;
  registrationDocumentPresent: boolean;
  sanitaryApprovalExpiresAt: string | null;
};

type DepotImportRow = {
  name: string;
  address: string | null;
};

type TemplateImportRow = {
  name: string;
  category: PlanningTemplateCategory;
  requiredRole: Role | null;
  secondaryAllowedRoles: Role[];
  minStaffCount: number | null;
  requiredVehicleType: VehicleType | null;
  isActive: boolean;
  isTimeDefined: boolean;
  startTime: string | null;
  endTime: string | null;
  crossesMidnight: boolean;
  color: string | null;
};

type TemplateImportCreateInput = Omit<TemplateImportRow, "minStaffCount"> & {
  minStaffCount?: number;
};

type UserAbsenceImportRow = {
  userEmail: string;
  reason: string | null;
  startAt: string;
  endAt: string;
};

const MAX_IMPORT_ROWS = 500;

const userSchema = z.object({
  email: z.string().trim().email(),
  name: z.string().trim().min(1).max(160),
  role: z.nativeEnum(Role),
  password: z.string().trim().min(1).max(160),
  depotName: z.string().trim().min(1).max(160).nullable(),
});

const vehicleSchema = z.object({
  immatriculation: z.string().trim().min(1).max(64),
  type: z.nativeEnum(VehicleType),
  status: z.nativeEnum(VehicleStatus),
  depotName: z.string().trim().min(1).max(160).nullable(),
  insuranceExpiresAt: z.string().datetime({ offset: true }).nullable(),
  technicalInspectionExpiresAt: z.string().datetime({ offset: true }).nullable(),
  registrationDocumentPresent: z.boolean(),
  sanitaryApprovalExpiresAt: z.string().datetime({ offset: true }).nullable(),
});

const depotSchema = z.object({
  name: z.string().trim().min(1).max(160),
  address: z.string().trim().max(255).nullable(),
});

const templateSchema = z.object({
  name: z.string().trim().min(1).max(160),
  category: z.nativeEnum(PlanningTemplateCategory),
  requiredRole: z.nativeEnum(Role).nullable(),
  secondaryAllowedRoles: z.array(z.nativeEnum(Role)),
  minStaffCount: z.number().int().min(1).max(2).nullable(),
  requiredVehicleType: z.nativeEnum(VehicleType).nullable(),
  isActive: z.boolean(),
  isTimeDefined: z.boolean(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).nullable(),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).nullable(),
  crossesMidnight: z.boolean(),
  color: z.string().regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/).nullable(),
});

const userAbsenceSchema = z
  .object({
    userEmail: z.string().trim().email(),
    reason: z.string().trim().max(160).nullable(),
    startAt: z.string().datetime({ offset: true }),
    endAt: z.string().datetime({ offset: true }),
  })
  .superRefine((value, ctx) => {
    if (new Date(value.startAt) >= new Date(value.endAt)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["endAt"], message: "endAt doit être postérieur à startAt" });
    }
  });

function normalizeHeader(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function cleanCell(value: string | undefined) {
  const trimmed = (value ?? "").trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toNullableString(value: string | null) {
  return value && value.trim().length > 0 ? value.trim() : null;
}

function parseBoolean(value: string | null, defaultValue = false) {
  if (value === null) return defaultValue;
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "oui", "yes", "x"].includes(normalized)) return true;
  if (["0", "false", "non", "no"].includes(normalized)) return false;
  throw new Error(`booléen invalide: ${value}`);
}

function parseIsoDateTime(value: string | null) {
  if (value === null) return null;
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return `${trimmed}T00:00:00.000Z`;
  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) throw new Error(`date invalide: ${value}`);
  return date.toISOString();
}

function parseStringList(value: string | null) {
  if (value === null) return [] as string[];
  return value
    .split(/[|,;]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseImportRows(fileName: string, buffer: Buffer) {
  const lower = fileName.toLowerCase();
  const format: ImportFormat = lower.endsWith(".xlsx") ? "xlsx" : lower.endsWith(".csv") ? "csv" : (() => { throw new Error("Format non supporté. Utiliser uniquement CSV ou XLSX."); })();
  const rows = format === "xlsx" ? parseXlsxRows(buffer) : parseCsv(buffer.toString("utf8")).rows;
  if (rows.length === 0) throw new Error("Le fichier d'import est vide.");
  if (rows.length - 1 > MAX_IMPORT_ROWS) throw new Error(`Le fichier dépasse la limite ALPHA de ${MAX_IMPORT_ROWS} lignes de données.`);
  return { format, rows };
}

function buildRowObject(headers: string[], row: string[]) {
  const record: Record<string, string> = {};
  headers.forEach((header, index) => {
    record[header] = row[index] ?? "";
  });
  return record;
}

function collectZodIssues(error: z.ZodError, rowNumber: number): PreviewError[] {
  return error.issues.map((issue) => ({ rowNumber, field: issue.path.join("."), message: issue.message }));
}

function getValue(record: Record<string, string>, candidates: string[]) {
  for (const candidate of candidates) {
    const found = Object.entries(record).find(([key]) => key === candidate);
    if (found) return cleanCell(found[1]);
  }
  return null;
}

function toUserRow(record: Record<string, string>) {
  return userSchema.safeParse({
    email: getValue(record, ["email", "courriel"]),
    name: getValue(record, ["nom", "name"]),
    role: getValue(record, ["role", "profil"]),
    password: getValue(record, ["motdepasseinitial", "password", "motdepasse"]),
    depotName: toNullableString(getValue(record, ["depot", "depotnom", "base", "basedepot"])),
  });
}

function toVehicleRow(record: Record<string, string>) {
  try {
    return vehicleSchema.safeParse({
      immatriculation: getValue(record, ["immatriculation", "plaque", "plate"]),
      type: getValue(record, ["type", "typevehicule", "vehiculetype"]),
      status: getValue(record, ["status", "statut"]) ?? "ACTIVE",
      depotName: toNullableString(getValue(record, ["depot", "depotnom", "base", "basedepot"])),
      insuranceExpiresAt: parseIsoDateTime(getValue(record, ["insuranceexpiresat", "assuranceexpiration"])),
      technicalInspectionExpiresAt: parseIsoDateTime(getValue(record, ["technicalinspectionexpiresat", "controletechniqueexpiration"])),
      registrationDocumentPresent: parseBoolean(getValue(record, ["registrationdocumentpresent", "cartedgrisepresente", "cartegrisepresente"]), false),
      sanitaryApprovalExpiresAt: parseIsoDateTime(getValue(record, ["sanitaryapprovalexpiresat", "agrementsanitaireexpiration"])),
    });
  } catch (error) {
    return { success: false as const, error: new z.ZodError([{ code: "custom", path: [], message: error instanceof Error ? error.message : String(error) }]) };
  }
}

function toDepotRow(record: Record<string, string>) {
  return depotSchema.safeParse({
    name: getValue(record, ["nom", "name"]),
    address: toNullableString(getValue(record, ["adresse", "address"])),
  });
}

function normalizeTemplateImportRowForCreateInput(row: TemplateImportRow): TemplateImportCreateInput {
  return {
    ...row,
    minStaffCount: row.minStaffCount ?? undefined,
  };
}

function toTemplateRow(record: Record<string, string>) {
  try {
    return templateSchema.safeParse({
      name: getValue(record, ["nom", "name"]),
      category: getValue(record, ["categorie", "category"]),
      requiredRole: getValue(record, ["requiredrole", "rolerequis"]),
      secondaryAllowedRoles: parseStringList(getValue(record, ["secondaryallowedroles", "rolessecondaires"])).filter((value): value is Role => Object.values(Role).includes(value as Role)),
      minStaffCount: (() => {
        const value = getValue(record, ["minstaffcount", "effectifminimum"]);
        if (value === null) return null;
        const parsed = Number(value);
        if (!Number.isInteger(parsed)) throw new Error(`minStaffCount invalide: ${value}`);
        return parsed;
      })(),
      requiredVehicleType: getValue(record, ["requiredvehicletype", "typevehiculerequis"]),
      isActive: parseBoolean(getValue(record, ["isactive", "actif"]), true),
      isTimeDefined: parseBoolean(getValue(record, ["istimedefined", "horairesdefinis"]), true),
      startTime: toNullableString(getValue(record, ["starttime", "heuredebut"])),
      endTime: toNullableString(getValue(record, ["endtime", "heurefin"])),
      crossesMidnight: parseBoolean(getValue(record, ["crossesmidnight", "chevaucheminuit"]), false),
      color: toNullableString(getValue(record, ["color", "couleur"])),
    });
  } catch (error) {
    return { success: false as const, error: new z.ZodError([{ code: "custom", path: [], message: error instanceof Error ? error.message : String(error) }]) };
  }
}

function toUserAbsenceRow(record: Record<string, string>) {
  try {
    return userAbsenceSchema.safeParse({
      userEmail: getValue(record, ["useremail", "email", "utilisateuremail"]),
      reason: toNullableString(getValue(record, ["reason", "motif"])),
      startAt: parseIsoDateTime(getValue(record, ["startat", "debut"])),
      endAt: parseIsoDateTime(getValue(record, ["endat", "fin"])),
    });
  } catch (error) {
    return { success: false as const, error: new z.ZodError([{ code: "custom", path: [], message: error instanceof Error ? error.message : String(error) }]) };
  }
}

async function ensureNoExistingDuplicates(companyId: string, domain: ImportDomain, rows: Array<PreviewRow<unknown>>) {
  const duplicateRowNumbers = new Set<number>();

  if (domain === "depots") {
    const names = rows.map((row) => (row.values as DepotImportRow).name);
    const existing = await prisma.depot.findMany({ where: { companyId, name: { in: names } }, select: { name: true } });
    const existingSet = new Set(existing.map((item) => item.name.toLowerCase()));
    for (const row of rows) if (existingSet.has((row.values as DepotImportRow).name.toLowerCase())) duplicateRowNumbers.add(row.rowNumber);
  }

  if (domain === "users") {
    const emails = rows.map((row) => (row.values as UserImportRow).email);
    const existing = await prisma.user.findMany({ where: { email: { in: emails } }, select: { email: true } });
    const existingSet = new Set(existing.map((item) => item.email.toLowerCase()));
    for (const row of rows) if (existingSet.has((row.values as UserImportRow).email.toLowerCase())) duplicateRowNumbers.add(row.rowNumber);
  }

  if (domain === "vehicles") {
    const immats = rows.map((row) => (row.values as VehicleImportRow).immatriculation);
    const existing = await prisma.vehicle.findMany({ where: { companyId, immatriculation: { in: immats } }, select: { immatriculation: true } });
    const existingSet = new Set(existing.map((item) => item.immatriculation.toLowerCase()));
    for (const row of rows) if (existingSet.has((row.values as VehicleImportRow).immatriculation.toLowerCase())) duplicateRowNumbers.add(row.rowNumber);
  }

  if (domain === "templates") {
    const names = rows.map((row) => (row.values as TemplateImportRow).name);
    const existing = await prisma.shiftTemplate.findMany({ where: { companyId, name: { in: names } }, select: { name: true } });
    const existingSet = new Set(existing.map((item) => item.name.toLowerCase()));
    for (const row of rows) if (existingSet.has((row.values as TemplateImportRow).name.toLowerCase())) duplicateRowNumbers.add(row.rowNumber);
  }

  return duplicateRowNumbers;
}

function markInternalDuplicates<T>(rows: Array<PreviewRow<T>>, keyOf: (row: T) => string) {
  const seen = new Set<string>();
  const duplicates = new Set<number>();
  for (const row of rows) {
    const key = keyOf(row.values).toLowerCase();
    if (seen.has(key)) duplicates.add(row.rowNumber);
    seen.add(key);
  }
  return duplicates;
}

export async function previewImport(companyId: string, domain: ImportDomain, file: File): Promise<PreviewResult<unknown>> {
  const fileName = file.name || `import.${domain}`;
  const { format, rows } = parseImportRows(fileName, Buffer.from(await file.arrayBuffer()));
  const headerRow = rows[0] ?? [];
  const dataRows = rows.slice(1);
  const headers = headerRow.map(normalizeHeader);

  const validRows: Array<PreviewRow<unknown>> = [];
  const errors: PreviewError[] = [];

  dataRows.forEach((rawRow, index) => {
    const rowNumber = index + 2;
    const record = buildRowObject(headers, rawRow);

    const parsed =
      domain === "users"
        ? toUserRow(record)
        : domain === "vehicles"
          ? toVehicleRow(record)
          : domain === "templates"
            ? toTemplateRow(record)
            : domain === "depots"
              ? toDepotRow(record)
              : toUserAbsenceRow(record);

    if (!parsed.success) {
      errors.push(...collectZodIssues(parsed.error, rowNumber));
      return;
    }

    if (domain === "templates") {
      const templateRow: TemplateImportRow = parsed.data as TemplateImportRow;
      const resolved = resolveTemplateCreateInput(normalizeTemplateImportRowForCreateInput(templateRow));
      const issues = validateResolvedTemplateState(resolved);
      if (issues.length > 0) {
        errors.push(...issues.map((issue) => ({ rowNumber, field: issue.path.join("."), message: issue.message })));
        return;
      }
    }

    validRows.push({ rowNumber, values: parsed.data });
  });

  const internalDuplicates =
    domain === "users"
      ? markInternalDuplicates(validRows as Array<PreviewRow<UserImportRow>>, (row) => row.email)
      : domain === "vehicles"
        ? markInternalDuplicates(validRows as Array<PreviewRow<VehicleImportRow>>, (row) => row.immatriculation)
        : domain === "templates"
          ? markInternalDuplicates(validRows as Array<PreviewRow<TemplateImportRow>>, (row) => row.name)
          : domain === "depots"
            ? markInternalDuplicates(validRows as Array<PreviewRow<DepotImportRow>>, (row) => row.name)
            : new Set<number>();

  const existingDuplicates = await ensureNoExistingDuplicates(companyId, domain, validRows);

  const filteredRows = validRows.filter((row) => {
    if (internalDuplicates.has(row.rowNumber)) {
      errors.push({ rowNumber: row.rowNumber, message: "Doublon détecté dans le fichier d'import." });
      return false;
    }
    if (existingDuplicates.has(row.rowNumber)) {
      errors.push({ rowNumber: row.rowNumber, message: "Doublon détecté avec une donnée existante. Import ALPHA en ajout uniquement." });
      return false;
    }
    return true;
  });

  return {
    domain,
    format,
    fileName,
    columns: headerRow,
    totalRows: dataRows.length,
    validRows: filteredRows.length,
    invalidRows: errors.length > 0 ? new Set(errors.map((item) => item.rowNumber)).size : 0,
    previewRows: filteredRows.slice(0, 20),
    rows: filteredRows,
    errors: errors.sort((a, b) => a.rowNumber - b.rowNumber || a.message.localeCompare(b.message)),
    notes: [
      "Import ALPHA simple : ajout uniquement, aucune mise à jour automatique des existants.",
      "Validation manuelle requise après aperçu.",
      "Formats supportés : CSV et XLSX uniquement.",
    ],
  };
}

export async function commitImport(companyId: string, domain: ImportDomain, rows: Array<PreviewRow<unknown>>): Promise<CommitResult<unknown>> {
  const errors: PreviewError[] = [];
  const inserted: Array<PreviewRow<unknown>> = [];

  if (rows.length === 0) {
    return { domain, insertedCount: 0, errorCount: 0, insertedPreview: [], errors: [] };
  }

  if (domain === "depots") {
    for (const row of rows as Array<PreviewRow<DepotImportRow>>) {
      const parsed = depotSchema.safeParse(row.values);
      if (!parsed.success) {
        errors.push(...collectZodIssues(parsed.error, row.rowNumber));
        continue;
      }
      const exists = await prisma.depot.findFirst({ where: { companyId, name: parsed.data.name }, select: { id: true } });
      if (exists) {
        errors.push({ rowNumber: row.rowNumber, message: "Dépôt déjà existant. Import en ajout uniquement." });
        continue;
      }
      await prisma.depot.create({ data: { companyId, name: parsed.data.name, address: parsed.data.address } });
      inserted.push(row);
    }
  }

  if (domain === "users") {
    const depotMap = new Map((await prisma.depot.findMany({ where: { companyId }, select: { id: true, name: true } })).map((item) => [item.name.toLowerCase(), item.id]));
    for (const row of rows as Array<PreviewRow<UserImportRow>>) {
      const parsed = userSchema.safeParse(row.values);
      if (!parsed.success) {
        errors.push(...collectZodIssues(parsed.error, row.rowNumber));
        continue;
      }
      const exists = await prisma.user.findFirst({ where: { email: parsed.data.email }, select: { id: true } });
      if (exists) {
        errors.push({ rowNumber: row.rowNumber, message: "Utilisateur déjà existant. Import en ajout uniquement." });
        continue;
      }
      const depotId = parsed.data.depotName ? depotMap.get(parsed.data.depotName.toLowerCase()) : null;
      if (parsed.data.depotName && !depotId) {
        errors.push({ rowNumber: row.rowNumber, message: `Dépôt introuvable : ${parsed.data.depotName}` });
        continue;
      }
      const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
      await prisma.user.create({ data: { companyId, email: parsed.data.email, name: parsed.data.name, role: parsed.data.role, password: hashedPassword, depotId } });
      inserted.push({ rowNumber: row.rowNumber, values: { ...parsed.data, password: "***" } });
    }
  }

  if (domain === "vehicles") {
    const depotMap = new Map((await prisma.depot.findMany({ where: { companyId }, select: { id: true, name: true } })).map((item) => [item.name.toLowerCase(), item.id]));
    for (const row of rows as Array<PreviewRow<VehicleImportRow>>) {
      const parsed = vehicleSchema.safeParse(row.values);
      if (!parsed.success) {
        errors.push(...collectZodIssues(parsed.error, row.rowNumber));
        continue;
      }
      const exists = await prisma.vehicle.findFirst({ where: { companyId, immatriculation: parsed.data.immatriculation }, select: { id: true } });
      if (exists) {
        errors.push({ rowNumber: row.rowNumber, message: "Véhicule déjà existant. Import en ajout uniquement." });
        continue;
      }
      const depotId = parsed.data.depotName ? depotMap.get(parsed.data.depotName.toLowerCase()) : null;
      if (parsed.data.depotName && !depotId) {
        errors.push({ rowNumber: row.rowNumber, message: `Dépôt introuvable : ${parsed.data.depotName}` });
        continue;
      }
      await prisma.vehicle.create({
        data: {
          companyId,
          immatriculation: parsed.data.immatriculation,
          type: parsed.data.type,
          status: parsed.data.status,
          depotId,
          insuranceExpiresAt: parsed.data.insuranceExpiresAt ? new Date(parsed.data.insuranceExpiresAt) : null,
          technicalInspectionExpiresAt: parsed.data.technicalInspectionExpiresAt ? new Date(parsed.data.technicalInspectionExpiresAt) : null,
          registrationDocumentPresent: parsed.data.registrationDocumentPresent,
          sanitaryApprovalExpiresAt: parsed.data.sanitaryApprovalExpiresAt ? new Date(parsed.data.sanitaryApprovalExpiresAt) : null,
        },
      });
      inserted.push(row);
    }
  }

  if (domain === "templates") {
    for (const row of rows as Array<PreviewRow<TemplateImportRow>>) {
      const parsed = templateSchema.safeParse(row.values);
      if (!parsed.success) {
        errors.push(...collectZodIssues(parsed.error, row.rowNumber));
        continue;
      }
      const exists = await prisma.shiftTemplate.findFirst({ where: { companyId, name: parsed.data.name }, select: { id: true } });
      if (exists) {
        errors.push({ rowNumber: row.rowNumber, message: "Template déjà existant. Import en ajout uniquement." });
        continue;
      }
      const resolved = resolveTemplateCreateInput(normalizeTemplateImportRowForCreateInput(parsed.data));
      const issues = validateResolvedTemplateState(resolved);
      if (issues.length > 0) {
        errors.push(...issues.map((issue) => ({ rowNumber: row.rowNumber, field: issue.path.join("."), message: issue.message })));
        continue;
      }
      await prisma.shiftTemplate.create({
        data: {
          companyId,
          name: resolved.name,
          category: resolved.category,
          requiredRole: resolved.requiredRole,
          secondaryAllowedRoles: resolved.secondaryAllowedRoles,
          minStaffCount: resolved.minStaffCount,
          requiredVehicleType: resolved.requiredVehicleType,
          isActive: resolved.isActive,
          archivedAt: null,
          isTimeDefined: resolved.isTimeDefined,
          startTime: resolved.startTime,
          endTime: resolved.endTime,
          crossesMidnight: resolved.crossesMidnight,
          color: resolved.color,
        },
      });
      inserted.push(row);
    }
  }

  if (domain === "user-absences") {
    const userMap = new Map((await prisma.user.findMany({ where: { companyId, isActive: true, platformRole: null }, select: { id: true, email: true } })).map((item) => [item.email.toLowerCase(), item.id]));
    for (const row of rows as Array<PreviewRow<UserAbsenceImportRow>>) {
      const parsed = userAbsenceSchema.safeParse(row.values);
      if (!parsed.success) {
        errors.push(...collectZodIssues(parsed.error, row.rowNumber));
        continue;
      }
      const userId = userMap.get(parsed.data.userEmail.toLowerCase());
      if (!userId) {
        errors.push({ rowNumber: row.rowNumber, message: `Utilisateur introuvable : ${parsed.data.userEmail}` });
        continue;
      }
      const startAt = new Date(parsed.data.startAt);
      const endAt = new Date(parsed.data.endAt);
      const overlap = await prisma.userAbsence.findFirst({ where: { companyId, userId, startAt: { lt: endAt }, endAt: { gt: startAt } }, select: { id: true } });
      if (overlap) {
        errors.push({ rowNumber: row.rowNumber, message: "Chevauchement détecté avec une indisponibilité existante." });
        continue;
      }
      await prisma.userAbsence.create({ data: { companyId, userId, reason: parsed.data.reason, startAt, endAt } });
      inserted.push(row);
    }
  }

  return {
    domain,
    insertedCount: inserted.length,
    errorCount: errors.length > 0 ? new Set(errors.map((item) => item.rowNumber)).size : 0,
    insertedPreview: inserted.slice(0, 20),
    errors: errors.sort((a, b) => a.rowNumber - b.rowNumber || a.message.localeCompare(b.message)),
  };
}

export function sanitizePreviewRows(rows: Array<PreviewRow<unknown>>) {
  return rows.map((row) => {
    if (typeof row.values === "object" && row.values !== null && "password" in row.values) {
      const cloned = { ...(row.values as Record<string, unknown>) };
      cloned.password = "***";
      return { ...row, values: cloned };
    }
    return row;
  });
}
