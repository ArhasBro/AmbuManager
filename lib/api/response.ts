export type ApiOk<T> = { ok: true; data: T };
export type ApiErr = { ok: false; error: string; details?: unknown };

export function json<T>(body: ApiOk<T> | ApiErr, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function ok<T>(data: T, status = 200) {
  return json({ ok: true, data }, status);
}

export function badRequest(error = "BAD_REQUEST", details?: unknown) {
  return json({ ok: false, error, details }, 400);
}

export function unauthorized() {
  return json({ ok: false, error: "UNAUTHORIZED" }, 401);
}

export function forbidden() {
  return json({ ok: false, error: "FORBIDDEN" }, 403);
}

export function notFound() {
  return json({ ok: false, error: "NOT_FOUND" }, 404);
}

export function conflict(error = "CONFLICT", details?: unknown) {
  return json({ ok: false, error, details }, 409);
}

export function serverError(details?: unknown) {
  const safeDetails = process.env.NODE_ENV === "production" ? undefined : details;
  return json({ ok: false, error: "SERVER_ERROR", details: safeDetails }, 500);
}
