import { prisma } from "@/lib/prisma";

type AssignedUser = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  companyId: string | null;
  depotId: string | null;
  depot: {
    id: string;
    name: string;
    isActive: boolean;
  } | null;
  createdAt: Date;
  updatedAt: Date;
};

const userDepotSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  companyId: true,
  depotId: true,
  depot: {
    select: {
      id: true,
      name: true,
      isActive: true,
    },
  },
  createdAt: true,
  updatedAt: true,
} as const;

export type AssignUserDepotInput = {
  userId: string;
  companyId: string;
  depotId: string | null;
};

export type AssignUserDepotResult =
  | { status: "USER_NOT_FOUND" }
  | { status: "DEPOT_NOT_FOUND" }
  | { status: "OK"; user: AssignedUser };

async function findUserByTenant(userId: string, companyId: string) {
  return prisma.user.findFirst({
    where: {
      id: userId,
      companyId,
    },
    select: {
      id: true,
      companyId: true,
    },
  });
}

export async function assignUserDepot(input: AssignUserDepotInput): Promise<AssignUserDepotResult> {
  const existingUser = await findUserByTenant(input.userId, input.companyId);
  if (!existingUser) return { status: "USER_NOT_FOUND" };

  if (input.depotId !== null) {
    const depot = await prisma.depot.findFirst({
      where: {
        id: input.depotId,
        companyId: input.companyId,
        isActive: true,
      },
      select: {
        id: true,
        companyId: true,
      },
    });

    if (!depot) return { status: "DEPOT_NOT_FOUND" };
  }

  const user = await prisma.user.update({
    where: { id: existingUser.id },
    data: { depotId: input.depotId },
    select: userDepotSelect,
  });

  return { status: "OK", user };
}
