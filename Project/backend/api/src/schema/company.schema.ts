import { z } from "zod";
import { companyGroupSchema } from "./companyGroup.schema";

export const companySchema = z.object({
    id: z.string(),
    name: z.string(),
    companyGroupId: z.string(),
    companyGroup: companyGroupSchema.nullable().optional(),
    parentCompanyId: z.string().optional().nullable(),
    typeCompanyId: z.string().optional().nullable(),
    contactData: z.any().optional().nullable(),
    addressData: z.any().optional().nullable(),
    credentialPowerBi: z.any().optional().nullable(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional().nullable(),
  });
  
  export interface CompanySchema {
    id: string;
    name: string;
    companyGroupId: string;
    companyGroup: typeof companyGroupSchema.type | null;
    parentCompanyId: string | null;
    typeCompanyId: string | null;
    contactData: any | null;
    addressData: any | null;
    credentialPowerBi: any | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null; 
  }