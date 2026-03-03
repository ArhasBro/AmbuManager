type JsonSafe =
  | string
  | number
  | boolean
  | null
  | JsonSafe[]
  | { [key: string]: JsonSafe };

type DateToString<T> =
  T extends Date ? string
    : T extends (infer U)[] ? DateToString<U>[]
      : T extends object ? { [K in keyof T]: DateToString<T[K]> }
        : T;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function serializeValue(value: unknown): JsonSafe {
  if (value instanceof Date) return value.toISOString();

  if (Array.isArray(value)) {
    return value.map((x) => serializeValue(x));
  }

  if (isPlainObject(value)) {
    const out: Record<string, JsonSafe> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = serializeValue(v);
    }
    return out;
  }

  if (value === null) return null;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;

  // Pour types non JSON (bigint, function, symbol, undefined), on stringify “safe”
  return String(value);
}

export function serializeDates<T>(obj: T): DateToString<T> {
  return serializeValue(obj) as DateToString<T>;
}