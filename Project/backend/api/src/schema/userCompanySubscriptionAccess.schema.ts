import { z } from 'zod';
import { subscriptionSchema } from './subscription.schema';
import { roleSchema } from './role.schema';

export const userCompanySubscriptionAccessSchema = z.object({
  id: z.string(),
  userId: z.string(),
  companyId: z.string(),
  subscriptionId: z.string().optional().nullable(),
  subscription: subscriptionSchema.nullable().optional(),
  roleId: z.string().optional().nullable(),
  role: roleSchema.nullable().optional(),
  email: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
});

export interface CreateUserCompanySubscriptionAccessData {
  userId: string;
  companyId: string;
  subscriptionId?: string;
  roleId?: string;
  email?: string;
  emailVerified?: Date;
  password?: string;
}

export interface UpdateUserCompanySubscriptionAccessData {
  userId?: string;
  companyId?: string;
  subscriptionId?: string;
  roleId?: string;
  email?: string;
  emailVerified?: Date;
  password?: string;
}

