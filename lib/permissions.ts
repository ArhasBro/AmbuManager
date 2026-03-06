import { prisma } from "@/lib/prisma";

export async function hasPermission(userId: string, code: string): Promise<boolean> {
  const permission = await prisma.userPermission.findFirst({
    where: {
      userId,
      permission: { code },
    },
    select: { id: true },
  });

  return Boolean(permission);
}

export async function canAutoSchedule(userId: string, role?: string): Promise<boolean> {
  if (role === "ADMIN" || role === "GERANT") return true;
  return hasPermission(userId, "PLANNING_AUTOSCHEDULE");
}

export async function canPublishAutoSchedule(userId: string, role?: string): Promise<boolean> {
  if (role === "ADMIN" || role === "GERANT") return true;
  return hasPermission(userId, "PLANNING_AUTOSCHEDULE_PUBLISH");
}
