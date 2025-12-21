import { z } from 'zod';
import { companySchema } from './company.schema';
import { roleSchema } from './role.schema';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  companyId: z.string(),
  company: companySchema.nullable().optional(),
  mobileNumber: z.string().optional().nullable(),
  telegramId: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  roleId: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional().nullable(),
  role: roleSchema.nullable().optional().nullable(),
});

export interface UserSchema {
  name: string;
  companyId: string;
  mobileNumber?: string;
  telegramId?: string;
  image?: string;
  roleId?: string;
  email?: string;
  emailVerified?: Date;
  password?: string;
}

export interface UpdateUserSchema {
  name?: string;
  companyId?: string;
  mobileNumber?: string;
  telegramId?: string;
  image?: string;
  roleId?: string;
  email?: string;
  emailVerified?: Date;
  password?: string;
}

export const userSearchSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  telegramId: z.string().optional(),
  companyId: z.string().optional(),
  roleId: z.string().optional(),
});

export interface UserSearchSchema {
  name?: string,
  email?: string,
  phone?: string,
  telegramId?: string,
  companyId?: string,
  roleId?: string,
}