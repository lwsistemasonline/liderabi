import { z } from 'zod';
import { subscriptionSchema } from './subscription.schema';
import { roleSchema } from './role.schema';
import { companySchema } from './company.schema';

// Lazy import to handle circular dependency with userSchema
const getUserSchema = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require('./user.schema').userSchema;
};

export const userSubscriptionsSchema: z.ZodType<any> = z.object({
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
  user: z.lazy(() => getUserSchema()).nullable().optional(),
  company: companySchema.nullable().optional(),
});

export interface CreateUserSubscriptionsData {
  userId: string;
  companyId: string;
  subscriptionId?: string;
  roleId?: string;
  email?: string;
  emailVerified?: Date;
  password?: string;
}

export interface UpdateUserSubscriptionsData {
  userId?: string;
  companyId?: string;
  subscriptionId?: string;
  roleId?: string;
  email?: string;
  emailVerified?: Date;
  password?: string;
}

