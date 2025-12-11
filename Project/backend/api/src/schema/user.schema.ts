import { z } from 'zod';
import { companySchema } from './company.schema';
import { userSubscriptionsSchema } from './userSubscriptions.schema';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  companyId: z.string(),
  company: companySchema.nullable().optional(),
  mobileNumber: z.string().optional().nullable(),
  telegramId: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional().nullable(),
  userSubscriptions: z.array(userSubscriptionsSchema).optional(),
});

export interface CreateUserData {
  name: string;
  companyId: string;
  mobileNumber?: string;
  telegramId?: string;
  image?: string;
}

export interface UpdateUserData {
  name?: string;
  companyId?: string;
  mobileNumber?: string;
  telegramId?: string;
  image?: string;
}