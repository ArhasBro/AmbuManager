import { prisma } from "@/lib/prisma";

export type UpdateDepotInput = {
  id: string;
  companyId: string;
  name?: string;
  address?: string | null;
};

export async function updateDepot(input: UpdateDepotInput) {
  const existing = await prisma.depot.findFirst({
    where: {
      id: input.id,
      companyId: input.companyId,
    },
    select: { id: true },
  });

  if (!existing) return null;

  return prisma.depot.update({
    where: { id: existing.id },
    data: {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.address !== undefined ? { address: input.address } : {}),
    },
    select: {
      id: true,
      companyId: true,
      name: true,
      address: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
