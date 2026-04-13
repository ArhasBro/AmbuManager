import { prisma } from "@/lib/prisma";

const archivedTemplateSelect = {
  id: true,
  name: true,
  category: true,
  requiredRole: true,
  secondaryAllowedRoles: true,
  minStaffCount: true,
  requiredVehicleType: true,
  isActive: true,
  archivedAt: true,
  isTimeDefined: true,
  startTime: true,
  endTime: true,
  crossesMidnight: true,
  color: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type ArchiveTemplateInput = {
  id: string;
  companyId: string;
};

export async function archiveTemplate(input: ArchiveTemplateInput) {
  const existing = await prisma.shiftTemplate.findFirst({
    where: {
      id: input.id,
      companyId: input.companyId,
    },
    select: archivedTemplateSelect,
  });

  if (!existing) return null;
  if (existing.archivedAt) return existing;

  return prisma.shiftTemplate.update({
    where: { id: existing.id },
    data: {
      isActive: false,
      archivedAt: new Date(),
    },
    select: archivedTemplateSelect,
  });
}
