// (aucun import nécessaire)

type HttpMapped = { status: number; message: string };

type PrismaKnownCode = "P2002" | "P2025";

function getKnownPrismaCode(e: unknown): PrismaKnownCode | null {
  if (typeof e !== "object" || e === null) return null;
  if (!("code" in e)) return null;

  const code = (e as { code?: unknown }).code;
  if (code === "P2002" || code === "P2025") return code;

  return null;
}

function getMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  if (typeof e === "object" && e !== null && "message" in e) {
    const msg = (e as { message?: unknown }).message;
    if (typeof msg === "string") return msg;
  }
  return "";
}

export function prismaToHttp(e: unknown): HttpMapped | null {
  const code = getKnownPrismaCode(e);

  if (code === "P2002") return { status: 409, message: "Duplicate" };
  if (code === "P2025") return { status: 404, message: "Not found" };

  const msg = getMessage(e);
  if (msg.includes("duplicate key")) return { status: 409, message: "Duplicate" };

  return null;
}