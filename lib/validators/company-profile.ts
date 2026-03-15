import { z } from "zod";

const profileField = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} required`)
    .max(max, `${label} too long`);

export const updateCompanyProfileBodySchema = z.object({
  name: profileField("name", 160),
  managerNames: profileField("managerNames", 255),
  address: profileField("address", 255),
  phone: profileField("phone", 50),
  siret: profileField("siret", 50),
});
