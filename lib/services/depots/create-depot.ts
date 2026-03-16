import { prisma } from "@/lib/prisma";

export type CreateDepotInput = {
  companyId: string;
  name: string;
  address: string | null;
};

export async function createDepot(input: CreateDepotInput) {
  return prisma.depot.create({
    data: {
      companyId: input.companyId,
      name: input.name,
      address: input.address,
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
