function stripBom(value: string) {
  return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value;
}

export function detectCsvDelimiter(text: string) {
  const sample = stripBom(text).split(/\r?\n/).find((line) => line.trim().length > 0) ?? "";
  const candidates = [";", ",", "\t"] as const;

  let best = ";" as ";" | "," | "\t";
  let bestScore = -1;

  for (const candidate of candidates) {
    const score = sample.split(candidate).length;
    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  }

  return best;
}

export function parseCsv(text: string) {
  const input = stripBom(text);
  const delimiter = detectCsvDelimiter(input);
  const rows: string[][] = [];

  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === delimiter) {
      row.push(cell.trim());
      cell = "";
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell.trim());
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim());
    if (row.some((value) => value.length > 0)) rows.push(row);
  }

  return { delimiter, rows };
}

function encodeCell(value: string, delimiter = ";") {
  const normalized = value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (!/["\n\r\t;,]/.test(normalized) && !normalized.includes(delimiter)) return normalized;
  return `"${normalized.replace(/"/g, '""')}"`;
}

export function stringifyCsv(rows: Array<Array<string | number | boolean | null | undefined>>, delimiter = ";") {
  return rows
    .map((row) => row.map((value) => encodeCell(value == null ? "" : String(value), delimiter)).join(delimiter))
    .join("\r\n");
}
