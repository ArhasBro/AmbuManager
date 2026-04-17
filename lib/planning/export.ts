import { Prisma } from "@prisma/client";

import { stringifyCsv } from "@/lib/imports/csv";
import { buildXlsxBuffer } from "@/lib/imports/xlsx";
import { prisma } from "@/lib/prisma";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatDate(value: Date) {
  return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;
}

function formatDateTime(value: Date) {
  return value.toLocaleString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function startOfDay(day: string) {
  const [year, month, date] = day.split("-").map(Number);
  return new Date(year, month - 1, date, 0, 0, 0, 0);
}

function addDays(date: Date, amount: number) {
  return new Date(date.getTime() + amount * 24 * 60 * 60 * 1000);
}

function mondayOf(day: string) {
  const start = startOfDay(day);
  const diff = (start.getDay() + 6) % 7;
  return addDays(start, -diff);
}

function startOfMonth(month: string) {
  const [year, monthIndex] = month.split("-").map(Number);
  return new Date(year, monthIndex - 1, 1, 0, 0, 0, 0);
}

export type PlanningExportFilters = {
  companyId: string;
  userId: string | null;
  day?: string;
  weekStart?: string;
  month?: string;
  limit?: number;
};

export async function listPlanningExportRows(filters: PlanningExportFilters) {
  let where: Prisma.ShiftWhereInput = { companyId: filters.companyId };

  if (filters.userId) where = { ...where, OR: [{ userId: filters.userId }, { user2Id: filters.userId }] };

  if (filters.day) {
    const start = startOfDay(filters.day);
    where = { ...where, startAt: { gte: start, lt: addDays(start, 1) } };
  } else if (filters.weekStart) {
    const start = mondayOf(filters.weekStart);
    where = { ...where, startAt: { gte: start, lt: addDays(start, 7) } };
  } else if (filters.month) {
    const start = startOfMonth(filters.month);
    where = { ...where, startAt: { gte: start, lt: new Date(start.getFullYear(), start.getMonth() + 1, 1, 0, 0, 0, 0) } };
  }

  return prisma.shift.findMany({
    where,
    orderBy: [{ startAt: "asc" }, { createdAt: "asc" }],
    take: filters.limit ?? 500,
    include: {
      user: { select: { name: true, email: true } },
      user2: { select: { name: true, email: true } },
      vehicle: { select: { immatriculation: true, type: true } },
      depot: { select: { name: true } },
      template: { select: { name: true, category: true } },
    },
  });
}

export function buildPlanningRows(shifts: Awaited<ReturnType<typeof listPlanningExportRows>>) {
  const header = [
    "Date",
    "Début",
    "Fin",
    "Template",
    "Catégorie",
    "Dépôt",
    "Agent 1",
    "Agent 2",
    "Véhicule",
    "Type véhicule",
    "Notes",
    "Annulé",
    "Motif annulation",
  ];

  const rows = shifts.map((shift) => [
    formatDate(shift.startAt),
    formatDateTime(shift.startAt),
    formatDateTime(shift.endAt),
    shift.template?.name ?? "",
    shift.template?.category ?? "",
    shift.depot?.name ?? "",
    shift.user?.name ?? shift.user?.email ?? "",
    shift.user2?.name ?? shift.user2?.email ?? "",
    shift.vehicle?.immatriculation ?? "",
    shift.vehicle?.type ?? "",
    shift.notes ?? "",
    shift.isCancelled ? "Oui" : "Non",
    shift.cancellationReason ?? "",
  ]);

  return [header, ...rows];
}

export function buildPlanningCsvBuffer(shifts: Awaited<ReturnType<typeof listPlanningExportRows>>) {
  return Buffer.from(stringifyCsv(buildPlanningRows(shifts), ";"), "utf8");
}

export function buildPlanningXlsxBuffer(shifts: Awaited<ReturnType<typeof listPlanningExportRows>>) {
  const rows = buildPlanningRows(shifts).map((row) => row.map((cell) => String(cell ?? "")));
  return buildXlsxBuffer("Planning", rows);
}

function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

export function buildPlanningPdfBuffer(shifts: Awaited<ReturnType<typeof listPlanningExportRows>>, title: string) {
  const contentLines = [title, "", ...shifts.map((shift) => {
    const parts = [
      `${formatDate(shift.startAt)} ${formatDateTime(shift.startAt).slice(11)}-${formatDateTime(shift.endAt).slice(11)}`,
      shift.template?.name ?? "Sans template",
      shift.depot?.name ? `Dépôt ${shift.depot.name}` : "Sans dépôt",
      shift.user?.name ?? "Agent 1 non affecté",
      shift.user2?.name ?? "",
      shift.vehicle?.immatriculation ?? "Sans véhicule",
      shift.isCancelled ? "ANNULÉ" : "",
    ].filter(Boolean);
    return parts.join(" • ");
  })];

  const linesPerPage = 40;
  const pages = [] as string[];
  for (let index = 0; index < contentLines.length; index += linesPerPage) {
    const pageLines = contentLines.slice(index, index + linesPerPage);
    const commands = ["BT", "/F1 10 Tf", "50 790 Td"];
    pageLines.forEach((line, lineIndex) => {
      if (lineIndex > 0) commands.push("0 -18 Td");
      commands.push(`(${escapePdfText(line)}) Tj`);
    });
    commands.push("ET");
    pages.push(commands.join("\n"));
  }

  const objects: string[] = [];
  const addObject = (value: string) => {
    objects.push(value);
    return objects.length;
  };

  const pageIds: number[] = [];
  const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const pagesId = addObject("<< /Type /Pages /Kids [] /Count 0 >>");

  for (const page of pages) {
    const stream = `<< /Length ${Buffer.byteLength(page, "utf8")} >>\nstream\n${page}\nendstream`;
    const contentId = addObject(stream);
    const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    pageIds.push(pageId);
  }

  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;
  const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return Buffer.from(pdf, "utf8");
}
