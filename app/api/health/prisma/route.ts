import { prisma } from "@/lib/prisma";
import { ok, serverError } from "@/lib/api/response";

export async function GET() {
  try {
    const companies = await prisma.company.count();
    const users = await prisma.user.count();

    return ok({
      counts: { companies, users },
    });
  } catch (e) {
    return serverError(e);
  }
}