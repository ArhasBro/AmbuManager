import { prisma } from "@/lib/prisma";

type ArchivedDepot = {
  id: string;
  companyId: string;
  name: string;
  address: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ArchiveDepotInput = {
  id: string;
  companyId: string;
};

const depotSelect = {
  id: true,
  companyId: true,
  name: true,
  address: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

export async function archiveDepot(input: ArchiveDepotInput): Promise<ArchivedDepot | null> {
  const existing = await prisma.depot.findFirst({
    where: {
      id: input.id,
      companyId: input.companyId,
    },
    select: depotSelect,
  });

  if (!existing) return null;
  if (!existing.isActive) return existing;

  return prisma.depot.update({
    where: { id: existing.id },
    data: { isActive: false },
    select: depotSelect,
  });
}
