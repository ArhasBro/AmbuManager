import {
  startOfWeek, endOfWeek, addDays, addWeeks, format, getISOWeek, getYear,
  startOfMonth, endOfMonth, eachDayOfInterval, isToday as dfnsIsToday, parseISO, isSameMonth,
} from "date-fns";
import { fr } from "date-fns/locale";

// --- Badge styling by type ---
export const BADGE_STYLE = {
  AMB: "bg-green-100 text-green-700 border border-green-200",
  AMBULANCE: "bg-green-100 text-green-700 border border-green-200",
  VSL: "bg-blue-100 text-blue-700 border border-blue-200",
  TAXI: "bg-orange-100 text-orange-700 border border-orange-200",
  TPMR: "bg-teal-100 text-teal-700 border border-teal-200",
  REPOS: "bg-gray-100 text-gray-500 border border-gray-200",
  ABSENT: "bg-red-100 text-red-600 border border-red-200",
  GARDE: "bg-purple-100 text-purple-600 border border-purple-200",
  "GARDE NUIT": "bg-purple-100 text-purple-600 border border-purple-200",
  "À AFFECTER": "bg-red-50 text-red-600 border border-dashed border-red-300",
};

export const TYPE_BADGES = ["AMB", "VSL", "TAXI", "TPMR", "GARDE", "REPOS", "ABSENT", "À AFFECTER"];

export const badgeClass = (type) => BADGE_STYLE[type] || "bg-gray-100 text-gray-500 border border-gray-200";

// --- Statuts V1 ---
export const COVERAGE_STATUSES = ["À couvrir", "Couvert", "Incomplet", "Non affecté", "À vérifier"];
export const PUBLICATION_STATUSES = ["Brouillon", "Publié", "Modifié après publication", "Annulé"];

export const COVERAGE_STYLE = {
  "À couvrir": "bg-amber-100 text-amber-700",
  "Couvert": "bg-green-100 text-green-700",
  "Incomplet": "bg-orange-100 text-orange-700",
  "Non affecté": "bg-red-100 text-red-600",
  "À vérifier": "bg-gray-100 text-gray-500",
};
export const PUBLICATION_STYLE = {
  "Brouillon": "bg-amber-50 text-amber-600",
  "Publié": "bg-green-100 text-green-700",
  "Modifié après publication": "bg-blue-100 text-blue-700",
  "Annulé": "bg-red-100 text-red-600",
};
export const coverageClass = (s) => COVERAGE_STYLE[s] || "bg-gray-100 text-gray-500";
export const publicationClass = (s) => PUBLICATION_STYLE[s] || "bg-gray-100 text-gray-500";

// --- Week helpers (ISO, Monday start) ---
export const weekStart = (date) => startOfWeek(date, { weekStartsOn: 1 });
export const weekEnd = (date) => endOfWeek(date, { weekStartsOn: 1 });

export const weekDays = (date) => {
  const start = weekStart(date);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

export const weekLabel = (date) => {
  const s = weekStart(date);
  const e = weekEnd(date);
  return `Semaine ${getISOWeek(date)} — du ${format(s, "d", { locale: fr })} au ${format(e, "d MMM yyyy", { locale: fr })}`;
};

export const shiftWeek = (date, delta) => addWeeks(date, delta);

// Generate a range of ISO weeks starting from a reference date.
// Returns [{ key:"S20", year, weekNumber, start (Date), label }]
export const weekRange = (refDate, count = 7) => {
  const start = weekStart(refDate);
  return Array.from({ length: count }, (_, i) => {
    const d = addWeeks(start, i);
    return { key: `S${getISOWeek(d)}`, year: getYear(d), weekNumber: getISOWeek(d), start: d, label: `S${getISOWeek(d)}` };
  });
};

export const isoDate = (date) => format(date, "yyyy-MM-dd");
export const dayHeaderLabel = (date) => format(date, "EEE d", { locale: fr });
export const dayLabel = (date) => format(date, "EEEE d MMMM yyyy", { locale: fr });
export const isTodayDate = (date) => dfnsIsToday(date);
export const shiftDay = (date, delta) => addDays(date, delta);

// "07:30" -> 7.5 ; returns null if invalid
export const timeToFloat = (t) => {
  if (!t || typeof t !== "string" || !t.includes(":")) return null;
  const [h, m] = t.split(":").map(Number);
  if (Number.isNaN(h)) return null;
  return h + (Number.isNaN(m) ? 0 : m) / 60;
};

// --- Month helpers ---
export const monthLabel = (date) => format(date, "MMMM yyyy", { locale: fr });
export const monthGrid = (date) => {
  const start = weekStart(startOfMonth(date));
  const end = weekEnd(endOfMonth(date));
  const days = eachDayOfInterval({ start, end });
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
};
export { isSameMonth, parseISO, getISOWeek, getYear, format, startOfMonth, endOfMonth };

// --- Group entries by employee_id for week views ---
export const groupByEmployee = (entries) => {
  const map = {};
  entries.forEach((e) => {
    const key = e.employee_id || "unassigned";
    if (!map[key]) map[key] = { employee_id: e.employee_id, name: e.employee_name, initials: e.employee_initials, role: e.employee_role, entries: [] };
    map[key].entries.push(e);
  });
  return Object.values(map);
};

// --- Find entry for a given employee + date ---
export const findEntry = (entries, employeeId, dateStr) =>
  entries.find((e) => e.employee_id === employeeId && e.shift_date === dateStr);