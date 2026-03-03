import { z } from "zod";

type ApiOk<T> = { ok: true; data: T };
type ApiErr = {
  ok: false;
  error: string;
  message?: string;
  issues?: unknown;
};

const ApiResponseSchema = z.union([
  z.object({
    ok: z.literal(true),
    data: z.unknown(),
  }),
  z.object({
    ok: z.literal(false),
    error: z.string(),
    message: z.string().optional(),
    issues: z.unknown().optional(),
  }),
]);

function extractErrorMessage(payload: ApiErr): string {
  if (payload.message && payload.message.length > 0) {
    return payload.message;
  }
  return payload.error;
}

async function postJson<T>(
  url: string,
  body?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: body ? JSON.stringify(body) : "{}",
  });

  const json = (await res.json()) as unknown;

  const parsed = ApiResponseSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error("Réponse API invalide (format inattendu)");
  }

  if (!parsed.data.ok) {
    throw new Error(extractErrorMessage(parsed.data));
  }

  return (parsed.data as ApiOk<T>).data;
}

/**
 * PREVIEW
 * POST /api/planning/autoschedule/runs/:id/match/preview
 */
export async function previewAutoMatchRun<TPlan = unknown>(
  runId: string
): Promise<TPlan> {
  if (!runId || runId.length === 0) {
    throw new Error("runId manquant");
  }

  return postJson<TPlan>(
    `/api/planning/autoschedule/runs/${runId}/match/preview`
  );
}

/**
 * APPLY
 * POST /api/planning/autoschedule/runs/:id/match/apply
 */
export async function applyAutoMatchRun<TResult = unknown>(
  runId: string
): Promise<TResult> {
  if (!runId || runId.length === 0) {
    throw new Error("runId manquant");
  }

  return postJson<TResult>(
    `/api/planning/autoschedule/runs/${runId}/match/apply`
  );
}