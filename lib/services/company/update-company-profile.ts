import { prisma } from "@/lib/prisma";

export type UpdateCompanyProfileInput = {
  companyId: string;
  name: string;
  managerNames: string;
  address: string;
  phone: string;
  siret: string;
};

export type UpdateCompanyProfileResult = {
  id: string;
  name: string;
  managerNames: string;
  address: string;
  phone: string;
  siret: string;
  updatedAt: string;
} | null;

export async function updateCompanyProfile(
  input: UpdateCompanyProfileInput
): Promise<UpdateCompanyProfileResult> {
  const company = await prisma.company.updateMany({
    where: { id: input.companyId },
    data: {
      name: input.name,
      managerNames: input.managerNames,
      address: input.address,
      phone: input.phone,
      siret: input.siret,
    },
  });

  if (company.count === 0) return null;

  const updated = await prisma.company.findUnique({
    where: { id: input.companyId },
    select: {
      id: true,
      name: true,
      managerNames: true,
      address: true,
      phone: true,
      siret: true,
      updatedAt: true,
    },
  });

  if (!updated) return null;

  return {
    id: updated.id,
    name: updated.name,
    managerNames: updated.managerNames ?? "",
    address: updated.address ?? "",
    phone: updated.phone ?? "",
    siret: updated.siret ?? "",
    updatedAt: updated.updatedAt.toISOString(),
  };
}
