import { z } from "zod";

export interface CompanyGroupSchema {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }
  
  export const companyGroupSchema = z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional().nullable(),
  });